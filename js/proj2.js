
/*
Mallikarjun, Pradeep Account:jadrn020
CS0645 Spring 2018
Project #2
*/


var categories = ["DSLR", "Point and Shoot", "Advanced Amateur", "Underwater", "Film", "mirrorless", "superzoom"];
var manufacturers = ["Nikon", "Canon", "Olympus", "Lumix", "Pentax", "Leica", "Sony", "Fuji"];
venID = 0;


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

function cartInfo(val){
    localStorage.setItem("sku", val);
    window.location.href = "/jadrn020/cart-info.html";
}


function displayProducts(response) {

    if(response == ""){
        $('#products-list').html("<h2 id=\"stock-message\">Sorry we are out of Stock!</h2>");
        return;
    }


    var tempString = "";
    var responseRes = response.split(";");

    for (k = 0; k < responseRes.length; k++) {

        res = responseRes[k].split("|");
        if(res == ""){
            continue;
        }

        var item = new cart_item();
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

        tempString += "<div class=\"row\">";
        tempString += "<div class=\"block span3 float\">";
        tempString += "<div class=\"product\">";
        tempString += "<img class='img-card' src=/~jadrn020/file_upload/_uploadDIR_/" + item.imageName + ">";
        tempString += "</div>\n" +
            "<div class=\"info\">\n" +
            "<h4>" + res[3] + "</h4>\n" +
            "<span class=\"description\">\n" + manufacturers[item.vendor] + "\n" + "</span>" +
            "<span class=\"price\"> &dollar;" + item.cost + "</span>" +
            "<span class=\"price pull-right\">" + qty + "</span>";
        tempString += "<div>\n" +
            "<button onclick='cartInfo(\""+ item.sku + "\")'  class=\"set-size flex-c-m bg1 bo-rad-23 hov1 s-text1 trans-0-4\">\n" +
            "View Item \n" + "</button>\n" +
            "</div>";
        tempString+= "</div>" +
            "</div>" +
            "</div>";

    }

    $('#products-list').html(tempString);
}

$(document).ready(function () {

    $.get("/jadrn020/servlet/AjaxDB", displayProducts);

    categoryValue = $('select[name="category"]').val();

    $('#nikon').on('click', function () {
        venID = "1";
        query = "SELECT * FROM product WHERE venID=1;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#canon').on('click', function () {
        venID = "2";
        query = "SELECT * FROM product WHERE venID=2;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#olympus').on('click', function () {
        venID = "3";
        query = "SELECT * FROM product WHERE venID=3;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#lumix').on('click', function () {
        venID = "4";
        query = "SELECT * FROM product WHERE venID=4;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#pentax').on('click', function () {
        venID = "5";
        query = "SELECT * FROM product WHERE venID=5;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#leica').on('click', function () {
        venID = "6";
        query = "SELECT * FROM product WHERE venID=6;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#sony').on('click', function () {
        venID = "7";
        query = "SELECT * FROM product WHERE venID=7;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#fuji').on('click', function () {
        venID = "8";
        query = "SELECT * FROM product WHERE venID=8;";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#cart-image').on('click', function () {
        window.location.href = "/jadrn020/product-checkout.html"
    });

    $( "#category" ).change(function() {
        val = $( "#category" ).val() - 1;
        query = "SELECT * FROM product WHERE catID='"+ val + "' AND venID='"+ venID +"';";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);
    });

    $('#cart-count').text(cart.size());

    $('#search-icon').on('click', function () {

        query = "SELECT * FROM product where description like '%25"+$('#search-box').val()+"%25' or features like '%25"+$('#search-box').val()+"%25';";
        $.get("/jadrn020/servlet/DisplayDB?queryInput=" + query, displayProducts);

    });


});
