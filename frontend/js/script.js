const result = document.getElementById('result');
const goBtn = document.getElementById("go-button");

// declare all our inputs
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const descriptionInput = document.getElementById("description-input");
const imageURLInput = document.getElementById("image-url-input");


// =================================
//        DISPLAY PRODUCTS
// =================================

// This function allows us to display our products from the MongoDB on our app
let showAllProduct = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:3400/allProduct",
        // your success function contains a object which can be named anything
        success: (products) => {
            console.log(products);
            renderProducts(products);
        },
        error: (error) => {
            console.log(error);
        },
    });
};


// =================================
//        ADD NEW PRODUCTS
// =================================
goBtn.onclick = () => {
    $.ajax({
        url: "http://localhost:3400/addProduct",
        // use the post type to create data somewhere
        // requesting to POST our data
        type: "POST",
        // we can send objects through to the backend, using the data argument
        data: {
            // the first property (i.e. the one on the left) called name has to be spelt exactly as the schema
            name: nameInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            img_url: imageURLInput.value,
        },
        success: () => {
            console.log("A new product was added.");
            showAllProduct();
        },
        error: () => {
            console.log("Error: cannot reach the backend");
        },
    });
};



// =================================
//        RENDER PRODUCTS
// =================================

// This function renders our products
let renderProducts = (products) => {
    console.log("the render products function is working");
    result.innerHTML = "";
    products.forEach((item) => {
        result.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
            <i class="bi bi-trash delete-button"></i>
            <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
        </div>
        `;
    });

    // running collect edit buttons function
    collectEditButtons();
    // running collect delete buttons function
    collectDeleteButtons();
};



// =================================
//COLLECT EDIT BUTTONS & EDIT FUNCTION
// =================================

//this function will ask the backend for data relating to the product we clicked on to edit 
populateEditModal = (productId) => {
    console.log(productId)
    $.ajax({
        url: `http://localhost:3400/product/${productId}`,
        type: 'GET',
        success: (productData) => {
            console.log("Product was found!")
            console.log(productData);
            fillEditInputs(productData, productId);

        },
        error: () => {
            console.log(error)
        }
    })
};

//this function will handle all our edits and add a click listener 
//if we click on an edit button it will get the id from the parent node (the div around around our prodcuts)
let collectEditButtons = () => {
    // this will return an Array, but it's a slightly different one
    // it returns HTML "nodes" instead
    // Well have to use a regular loop over these 
    let editButtonsArray = document.getElementsByClassName("edit-button");
    //this will loop over every edit button 
    for (let i = 0; i < editButtonsArray.length; i++) {
        editButtonsArray[i].onclick = () => {
            console.log(editButtonsArray[i].id);
            console.log("edit button clicked");
            let currentId = editButtonsArray[i].parentNode.id;
            //edit products based on the id 
            populateEditModal(currentId);
        };
    }
};

fillEditInputs = (product, id) => {
    let productName = document.getElementById("productName");
    let productPrice = document.getElementById("productPrice");
    let productDescription = document.getElementById("productDescription");
    let imageUrl = document.getElementById("imgUrl");

    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;
    imageUrl.value = product.img_url;

    let imagePreview = document.getElementById('image-preview');

    imagePreview.innerHTML = `
    <img src="${product.img_url}" alt="${productName}">
    `;

    //=================================
    //      EDIT CLICK LISTENER
    //=================================
    $('#updateProduct').click(function () {
        event.preventDefault();
        let productId = id;
        let productName = document.getElementById("productName").value;
        let productPrice = document.getElementById("productPrice").value;
        let productDescription = document.getElementById("productDescription").value;
        let imageUrl = document.getElementById("imgUrl").value;

        console.log(productId, productName, productPrice, productDescription, imageUrl)

        $.ajax({
            url: `http://localhost:3400/updateProduct/${productId}`,
            type: 'PATCH',
            data: {
                name: productName,
                price: productPrice,
                description: productDescription,
                img_url: imageUrl,
            },
            success: (data) => {
                console.log(data);
                console.log("Success - product was updated")
                showAllProduct();
                $("#updateProduct").off('click');

            },
            error: () => {
                console.log("Error not updated");
            }
        })
    });
}

// =================================
//COLLECT DELETE BUTTONS & DELETE FUNCTION
// =================================

// // this function gets run when we click on a delete button
let deleteProduct = (productId) => {
    // use ajax and go to the delete route
    $.ajax({
        // Let's go to our route
        url: `http://localhost:3400/deleteProduct/${productId}`,
        type: "DELETE",
        success: () => {
            // at this point, we can assume that the delete was successful
            showAllProduct();
        },
        error: () => {
            console.log("Cannot call API");
        },
    });
};


// this function will handle all our deletes
let collectDeleteButtons = () => {
    // this will return an Array, but it's a slightly different one
    // it returns HTML "nodes" instead
    // we'll have use a regular loop to loop over these
    let deleteButtonsArray = document.getElementsByClassName("delete-button");
    // this will loop over every delete button
    for (let i = 0; i < deleteButtonsArray.length; i++) {
        deleteButtonsArray[i].onclick = () => {
            let currentId = deleteButtonsArray[i].parentNode.id;
            // delete product based on the id
            deleteProduct(currentId);
        };
    }
};


// ==============================================
//   RUNNING THE FUNCTION TO SHOW ALL PRODUCTS
// ==============================================
showAllProduct();



// ==============================================
//      CHECK IF USER IS LOGGED IN OR NOT
// ==============================================
// this function checks if the users logged in
// if they are, show the username and their profile image

let checkLogin = () => {
    const userDetails = document.getElementById("user-details");
    let navContent;
    if (sessionStorage.userID) {
        // console.log("You're logged in")
        // console.log(sessionStorage.userName)
        navContent = `
      <span id="username">${sessionStorage.userName}</span>
      <span id="dp" style="background-image: url('${sessionStorage.profileImg}')"></span>
      <a id="sign-out-button" href="#">Sign Out</a>
      `
    }
    else {
        navContent = `
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
      `;
    }
    // render our logged in elements
    userDetails.innerHTML = navContent;
}

checkLogin();

const signoutBtn = document.getElementById('sign-out-button');

let logOut = () => {
    console.log("log out");
    sessionStorage.clear();
    window.location.reload();
}

if (sessionStorage.userID) {
    signoutBtn.onclick = () => {
        logOut();
    }
};