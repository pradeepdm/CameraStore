var taxRate = 0.0775;
var shippingRate = 5.00;
var fadeTime = 300;
var cartData;
var currentItemStockArray = [];

/*
Mallikarjun, Pradeep Account:jadrn020
CS0645 Spring 2018
Project #2
*/


function checkout() {

    res = false;
    for (i = 0; i < Object.keys(currentItemStockArray).length; i++) {
        sku = Object.keys(currentItemStockArray)[i];
        if ($('#' + sku).val() > currentItemStockArray[sku]){
            $('#show-alert').show();
            $("#checkout-click").prop("disabled",true);
            return;
        }
    }

    $('#show-alert').hide();
    $("#checkout-click").prop("disabled",false);

    window.location.href = "/jadrn020/place-order.html"
}

$(document).ready(function () {

    displayCartCheckoutDetails();
    $('#show-alert').hide();

    $('.product-quantity input').change( function() {
        updateQuantity(this);
    });

    $('.product-removal button').click( function() {
        removeItem(this);
    });

    $('#checkout-click').on('click', function () {
       checkout();

    });

    cartCount = cart.size();
    $('#cart-count').text(cartCount);

});

/* Assign actions */

function displayCartCheckoutDetails(){

    cartData = cart.getCartArray();
    tempString = "";

    for(i =0; i< cartData.length; i++){
        item = cartData[i];
        var ven = parseInt(item[2])-1;
        currentItemStockArray[item[0]] = item[8];

        tempString += "<div  class=\"product\">";
        tempString += "<div class=\"product-image\">";
        tempString += "<img width=\"100px\" height='auto' src=/~jadrn020/file_upload/_uploadDIR_/" + item[7] + ">";
        tempString += "</div>";
        tempString += "<div class=\"product-details\">";
        tempString += "<div class=\"product-title\">" + manufacturers[ven] +  "</div>";
        tempString += "<p class=\"product-description\">"+ item[3] +"</p>";
        tempString += "</div>";
        tempString += " <div class=\"product-price\">"+ item[4] +"</div>\n" +
            "            <div class=\"product-quantity\">\n" +
            "                <input class=\"qty-val\" id='"+ item[0] + "' type=\"number\" value=" + item[5] + " min=\"1\">\n" +
            "            </div>\n" +
            "            <div class=\"product-removal\">\n" +
            "                <button id='"+ item[0] + "' class=\"remove-product\">\n" +
            "                    Remove\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"product-line-price\">"+ item[4] + "</div>";
        tempString += "</div>";
    }

    $("#product-checkout-details").html(tempString);
    recalculateCart();
}


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


/* Update quantity */
function updateQuantity(quantityInput)
{
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    var sku = quantityInput.id;
    for(i =0; i< cartData.length; i++){
        item = cartData[i];
        if(item[0] == sku){

            if(item[8] < quantity){
                $('#show-alert').show();
                $("#checkout-click").prop("disabled",true);
                return;
            }
            else{
                $('#show-alert').hide();
                $("#checkout-click").prop("disabled",false);
            }

        }
    }
    cart.setQuantity(sku, quantity, price);

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton)
{
    cart.delete(removeButton.id);
    delete currentItemStockArray[removeButton.id];
    if(Object.keys(currentItemStockArray).length == 0){

        $("#show-alert").html("Cart is empty. Please select products from the list");
        $("#show-alert").show();
    } else {
        $("#show-alert").html("The current item is running out of stock !! Please reduce the quantity.");
        $("#show-alert").hide();
    }


    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}
