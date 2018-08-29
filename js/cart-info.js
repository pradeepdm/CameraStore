
/*
Mallikarjun, Pradeep Account:jadrn020
CS0645 Spring 2018
Project #2
*/


var categories = ["DSLR", "Point and Shoot", "Advanced Amateur", "Underwater", "Film", "mirrorless", "superzoom"];
var manufacturers = ["Nikon", "Canon", "Olympus", "Lumix", "Pentax", "Leica", "Sony", "Fuji"];
var item = new cart_item();
var cart = new shopping_cart("jadrn020");

function cart_item() {
    // 0 1 2 4 5 7 8
    var sku;
    var category;
    var vendor;
    var description;
    var cost;
    var quantity;
    var features;
    var imageName;
}

$(document).ready(function () {

    $('#cart-count').text(cart.size());
    $('#prod-added').hide();
    selectedItem = localStorage.getItem("sku");
    query = "SELECT * FROM product WHERE sku='"+ selectedItem + "';";
    $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayCartInfo);

});


function addToCart(){
    cart.add(item);
    size = cart.size();
    localStorage.setItem("cartCount", size);
    $("#cart-count").text(size);

    $('#prod-added').show();
    $('#prod-added').fadeOut(2000);
}

function displayCartInfo(response) {

    var tempString = "";
    var responseRes = response.split(";");
    var res = responseRes[0].split("|");
    item.sku = res[0];
    item.category = categories[res[1]];
    item.vendor = parseInt(res[2]) - 1;
    item.description = res[4];
    item.features = res[5];
    item.cost = res[7];
    item.quantity = res[8];
    item.imageName = res[9];

    qty = "";
    if (item.quantity == 0) {
        qty = "Coming Soon"
    } else {
        qty = "In Stock";
    }

    tempString += "<div id='detail-info'>\n";
    tempString += "<div id='full-scale-img'>\n";
    tempString += "<img width=\"300px\" height='300px' src=/~jadrn020/file_upload/_uploadDIR_/" + item.imageName + ">\n";
    tempString += "</div>\n";
    tempString += "<div id='product-data'>\n" +
        "                    <div> Manufacturer ID: <strong>" + res[3] + "</strong></div>\n" +
        "                    <div> Vendor: <strong>" + manufacturers[item.vendor] + "</strong></div>\n" +
        "                    <div> Product Features: <strong>" + item.features + "</strong></div>\n" +
        "                    <div> Product Details: <strong>" + item.description + "</strong> </div>\n" +
        "                    <div> Category: <strong>" + item.category + "</strong> </div>\n" +
        "                    <div> Price: <strong> &dollar; " + item.cost + "</strong> </div>\n" +
        "                    <div> Quantity: <strong>" + qty + " </strong></div>\n" +
        "                    <div>\n" +
        "                        <button id=\"add-to-cart\" onclick='addToCart()' class=\"set-size flex-c-m bg1 bo-rad-23 hov1 s-text1 trans-0-4\">\n" +
        "                            Add to cart\n" +
        "                        </button>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "\n" +
        "            </div>";

    $('#product-info').html(tempString);

    if(qty == "Coming Soon"){
        $('#add-to-cart').prop("disabled",true);
        $("#add-to-cart").css("color", "#dddddd");

    }
    else
        $('#add-to-cart').prop("disabled",false);
}
