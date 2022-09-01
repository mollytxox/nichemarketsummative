console.log('script connected');
const result = document.getElementById('result');

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


// Running the show product function
showAllProduct();


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
        </div>
        `;
    });

    //collect edit buttons 
    // collectEditButtons();
    // collectDeleteButtons();

};