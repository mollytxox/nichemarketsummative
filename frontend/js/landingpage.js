const goBtn = document.getElementById("go-button");

// declare all our inputs
// const nameInput = document.getElementById("name-input");
// const priceInput = document.getElementById("price-input");
// const descriptionInput = document.getElementById("description-input");
// const imageURLInput = document.getElementById("image-url-input");

const gallery = document.getElementById(`gallery0`);
const gallery1 = document.getElementById(`gallery1`);
const gallery2 = document.getElementById(`gallery2`);

// =================================
//        NAV BAR FUNCTIONS
// =================================

const navBar = document.getElementById('nav-bar');
const navSearch = document.getElementById('nav-search');

navSearch.onclick = function () {
    navExpand();
}

function navExpand() {
    navBar.classList.toggle("nav-expand");
}



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
            // console.log(products);
            renderLandingpageGallery(products);
        },
        error: (error) => {
            console.log(error);
        },
    });
};


const addNewProductDiv = document.getElementById('add-product-div');

// =================================
//        RENDER PRODUCTS
// =================================


// =================================
//           JOJI'S CODE
// =================================

// render landingpage gallery

let renderLandingpageGallery = (products) => {


    // trending items 
    let startTrendingItems
    let endTrendingItems = 4;
    let trendingItems = products.slice(startTrendingItems, endTrendingItems).map((item, i) => {
        return item;
    });

    trendingItems.forEach((item) => {


        let renderComments = () => {
            if (item.comments.length > 0) {
                let allComments = "";
                item.comments.forEach((comment) => {
                    allComments += `<li>${comment.text}</li>`
                });
                return allComments;
            } else {
                return "<p>Be the first to place a comment!</p>"
            }
        }

        if (item.createdby == sessionStorage.userID) {
            gallery.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>${item.username}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
            <i class="bi bi-trash trash-button" id="delete" data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
            <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <h4>Reviews</h4>
        <ul class="review-box">${renderComments()}</ul>
        <button class="comment-button" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
        </div>
        `;
        } else {
            gallery.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
        <h4>Reviews</h4>
        <ul class="review-box">${renderComments()}</ul>
        <button class="comment-button" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
        </div>
        `;
        }
    });

    // new items 
    let startNewItems = 5
    let endNewItems = 7;
    let newItems = products.slice(startNewItems, endNewItems).map((item, i) => {
        return item;
    });

    newItems.forEach((item) => {


        let renderComments = () => {
            if (item.comments.length > 0) {
                let allComments = "";
                item.comments.forEach((comment) => {
                    allComments += `<li>${comment.text}</li>`
                });
                return allComments;
            } else {
                return "<p>Be the first to place a comment!</p>"
            }
        }

        if (item.createdby == sessionStorage.userID) {
            gallery1.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>${item.username}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
            <i class="bi bi-trash trash-button" id="delete" data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
            <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <h4>Reviews</h4>
        <ul class="review-box">${renderComments()}</ul>
        <button class="comment-button" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
        </div>
        `;
        } else {
            gallery1.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
        <h4>Reviews</h4>
        <ul class="review-box">${renderComments()}</ul>
        <button class="comment-button" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
        </div>
        `;
        }
    });

    // top sellers 
    let startTopSellers = 8;
    let endTopSellers = 11;
    let topSellerItems = products.slice(startTopSellers, endTopSellers).map((item, i) => {
        return item;
    });

    topSellerItems.forEach((item) => {


        let renderComments = () => {
            if (item.comments.length > 0) {
                let allComments = "";
                item.comments.forEach((comment) => {
                    allComments += `<li>${comment.text}</li>`
                });
                return allComments;
            } else {
                return "<p>Be the first to place a comment!</p>"
            }
        }

        if (item.createdby == sessionStorage.userID) {
            gallery2.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>${item.username}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
            <i class="bi bi-trash trash-button" id="delete" data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
            <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <h4>Reviews</h4>
        <ul class="review-box">${renderComments()}</ul>
        <button class="comment-button" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
        </div>
        `;
        } else {
            gallery2.innerHTML += `
        <div class="product-container" id="${item._id}">
            <h3>${item.name}</h3>
            <h3>$${item.price}</h3>
            <h3>${item.description}</h3>
            <img src="${item.img_url}"> 
        <h4>Reviews</h4>
        <ul class="review-box">${renderComments()}</ul>
        <button class="comment-button" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
        </div>
        `;
        }
    });
}



// =================================
//      ADD COMMENT FUNCTION
// =================================
// This function will send the id to the onclick listener of the submit button 
let addComment = (productId) => {
    const commentBtn = document.getElementById("submitComment");
    // add a listener for the add comment button
    commentBtn.onclick = () => {
        console.log(productId);
        $.ajax({
            url: 'http://localhost:3400/postComment',
            type: 'POST',
            data: {
                text: document.getElementById("productComment").value,
                product_id: productId
            },
            success: () => {
                console.log("Comment placed successfully");
                showAllProduct();
                $('#commentModal').modal('hide');
            }, error: () => {
                console.log("error, can't post comment");
            }
        })
    }
}

// ==============================================
//   RUNNING THE FUNCTION TO SHOW ALL PRODUCTS
// ==============================================
showAllProduct();

const postProductBtnDiv = document.getElementById('add-product-button');
// ==============================================
//      CHECK IF USER IS LOGGED IN OR NOT
// ==============================================
// this function checks if the users logged in
// if they are, show the username and their profile image

let checkLogin = () => {
    const userDetails = document.getElementById("user-details");
    let navContent;
    if (sessionStorage.userID) {
        navContent = `
        <div class="account-button" id="nav-img-acc">
      <span id="username">${sessionStorage.userName.toUpperCase()}</span>
      <span id="dp" style="background-image: url('${sessionStorage.profileImg}')"></span>
      </div>
      `
        //   <a id="sign-out-button" href="#">Sign Out</a>
        addNewProductDiv.innerHTML = `
      <form id="add-project-form" action="javascript:void(0)">
      <label for="name-input">Product Name: </label>
      <input id="name-input" name="name-input" type="text">
      <label for="price-input">Product Price: </label>
      <input id="price-input" name="price-input" type="text">
      <label for="description-input">Product Description: </label>
      <input id="description-input" name="description-input" type="text">
      <label for="image-url-input">Product Image URL:</label>
      <input id="image-url-input" name="image-url-input" type="text">
  </form>
      `
    }
    else {
        postProductBtnDiv.innerHTML = `
        <a href="login.html"><button id="go-button">Post New Product</button></a>
        `
        navContent = `<div id="nav-btn-acc">
        <a id="account-symbol" href="signup.html"><span class="material-symbols-outlined"> account_circle </span></a>
        <button id="account-button">ACCOUNT</button>
        </div>
        <div id="nav-img-acc" style="display: none;"></div>
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

// const accountBtn = document.getElementById('nav-btn-acc');
const accountImg = document.getElementById('nav-img-acc');
const accountDetails = document.getElementById('account-details');



accountImg.onclick = function () {
    accountExpand();
}

function accountExpand() {
    accountDetails.classList.toggle("account-expand");
}