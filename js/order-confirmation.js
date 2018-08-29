/*
Mallikarjun, Pradeep Account:jadrn020
CS0645 Spring 2018
Project #2
*/



var taxRate = 0.0775;
var shippingRate = 5.00;
var fadeTime = 300;


function displayCustomerDetails() {

    var street = localStorage.getItem("street");
    var city = localStorage.getItem("city");
    var state = localStorage.getItem("state");
    var zip = localStorage.getItem("zip");
    var cardNo = localStorage.getItem("cardNo");

    tempString = "";
    tempString += "<div id=\"shipping-details\">\n" +
        "            <div class=\"sh-address\">Shipping Address</div>";
    tempString += "<p>Street: " + street + "</p>\n" +
        "            <p>City: " + city + " </p>\n" +
        "            <p>State: " + state + " </p>\n" +
        "            <p>Zip Code: " + zip + " </p>\n" +
        "        </div>";

    $('#customer-details').html(tempString);
}

function displayCartDetails() {

    displayCustomerDetails();

    var cartData = cart.getCartArray();
    tempString = "";


    for(i =0; i< cartData.length; i++){
        item = cartData[i];
        var ven = parseInt(item[2])-1;
        tempString += "<div  class=\"product\">";
        tempString += "<div class=\"product-image\">";
        tempString += "<img width=\"150px\" height='auto' src=/~jadrn020/file_upload/_uploadDIR_/" + item[7] + ">";
        tempString += "</div>";
        tempString += "<div class=\"product-details\">";
        tempString += "<div class=\"product-title\">" + manufacturers[ven] +  "</div>";
        tempString += "<p class=\"product-description\">"+ item[3] +"</p>";
        tempString += "</div>";
        tempString += " <div class=\"product-price\">"+ item[4] +"</div>\n" +
            "            <div class=\"product-quantity-1\">\n" + item[5] +
            "            </div>\n" +
            "            <div class=\"product-line-price\">"+ item[4] + "</div>";
        tempString += "</div>";
    }

    $("#product-checkout-details").html(tempString);
    recalculateCart();
    cart.deleteall();
}

$(document).ready(function () {
    displayCartDetails();
});

/* Recalculate cart */
function recalculateCart()
{
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if(total == 0){
            $('.checkout').fadeOut(fadeTime);
        }else{
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}
