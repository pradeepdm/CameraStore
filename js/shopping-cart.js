/*
     Mallikarjun, Pradeep
     Jadran Id: jadrn020
     Project #2
     Spring 2018

*/

function shopping_cart(owner) {
    this.owner = $.trim(owner);

    this.skuArray = [];
    this.categoryArray = [];
    this.vendorArray = [];
    this.descriptionArray = [];
    this.itemCost = [];
    this.quantityArray = [];
    this.currentItemStockArray = [];
    this.featuresArray = [];
    this.imageNameArray = [];

    this.getCookieValues = function() {

        var raw_string = document.cookie;
        var arr = [];
        if (raw_string == undefined || raw_string == "")
            return;

        var tmp = raw_string.split(";");
        var myValue = null;

        for (i = 0; i < tmp.length; i++)
            if (tmp[i].indexOf(owner) != -1)
                myValue = tmp[i].split("=");
        if (!myValue)
            return;

        arr = myValue[1].split("||");
        for (i = 0; i < arr.length; i++) {

            if(arr[i] != ""){

                var pair = arr[i].split("|");
                this.skuArray[i] = pair[0];
                this.categoryArray[i] = pair[1];
                this.vendorArray[i] = pair[2];
                this.descriptionArray[i] = pair[3];
                this.itemCost[i] = pair[4];
                this.quantityArray[i] = pair[5];
                this.featuresArray[i] = pair[6];
                this.imageNameArray[i] = pair[7];
                this.currentItemStockArray[pair[0]] = pair[8];
            }

        }
    };
        
    this.writeCookie = function() {

        var toWrite = this.owner + "=";

        for (i = 0; i < this.skuArray.length; i++)

            toWrite += this.skuArray[i] + "|" +
                this.categoryArray[i] + "|" +
                this.vendorArray[i] + "|" +
                this.descriptionArray[i] + "|" +
                this.itemCost[i] + "|" +
                this.quantityArray[i] + "|" +
                this.featuresArray[i] + "|" +
                this.imageNameArray[i]+ "|" +
                this.currentItemStockArray[this.skuArray[i]] + "||";

        toWrite = toWrite.substring(0, toWrite.length - 2);
        toWrite += ";";
        document.cookie = toWrite;

    };

    this.add = function(item) {

       sku = $.trim(item.sku);
       category = $.trim(item.category);
       vendor = $.trim(item.vendor);
       description = $.trim(item.description);
       cost = $.trim(item.cost);
       quantity = "1";
       features = $.trim(item.features);
       imageName = $.trim(item.imageName);
       currentItemStock = $.trim(item.quantity);

       this.getCookieValues();
       var found = false;
       for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {
                newQuantity =  (parseInt(quantity, 10) + parseInt(this.quantityArray[i], 10));
                this.quantityArray[i] = newQuantity;
                this.itemCost[i] = parseFloat(parseInt(this.quantityArray[i], 10) * cost);
                found = true;
       }
        if(!found) {
            this.skuArray.push(sku);
            this.categoryArray.push(category);
            this.vendorArray.push(vendor);
            this.descriptionArray.push(description);
            this.itemCost.push(parseFloat(parseInt(quantity, 10) * cost));
            this.quantityArray.push(quantity);
            this.featuresArray.push(features);
            this.imageNameArray.push(imageName);
            this.currentItemStockArray[sku] = currentItemStock;
        }
        this.writeCookie();
    };
    
    this.setQuantity = function(item, qty, price) {

        sku = $.trim(item);
        quantity = qty;

        this.getCookieValues();

        for (i = 0; i < this.skuArray.length; i++)
            if (this.skuArray[i] == sku) {
                this.quantityArray[i] = parseInt(quantity, 10);
                this.itemCost[i] = parseFloat(parseInt(this.quantityArray[i], 10) * price);
                found = true;
            }
        if (found)
            this.writeCookie();
    };
    
    this.delete = function(sku) {

        sku = $.trim(sku);
        var index = -1;
        this.getCookieValues();       
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku)  
            index = i;               
        if(index != -1) {
            this.skuArray.splice(index, 1);
            this.categoryArray.splice(index, 1);
            this.vendorArray.splice(index, 1);
            this.descriptionArray.splice(index, 1);
            this.itemCost.splice(index, 1);
            this.quantityArray.splice(index, 1);
            this.featuresArray.splice(index, 1);
            this.imageNameArray.splice(index, 1);
            delete this.currentItemStockArray[sku];
        }
        if(this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1";
        }
        else
            this.writeCookie();
        };
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.quantityArray.length; i++){
            res = this.quantityArray[i];
            if(res != undefined )
            count += parseInt(this.quantityArray[i],10);
        }
        return count;
    };
        
    this.getCartArray = function() {

        this.getCookieValues();
        var returnArray = [];
        for (i = 0; i < this.skuArray.length; i++) {
            returnArray[i] = [];
            returnArray[i].push(this.skuArray[i]);
            returnArray[i].push(this.categoryArray[i]);
            returnArray[i].push(this.vendorArray[i]);
            returnArray[i].push(this.descriptionArray[i]);
            returnArray[i].push(this.itemCost[i]);
            returnArray[i].push(this.quantityArray[i]);
            returnArray[i].push(this.featuresArray[i]);
            returnArray[i].push(this.imageNameArray[i]);
            returnArray[i].push(this.currentItemStockArray[this.skuArray[i]]);
        }
        return returnArray;
    };
        
    this.deleteall = function() {

        this.getCookieValues();
        this.currentItemStockArray = [];
        if (this.skuArray.length > 0) {
            this.skuArray.splice(0, this.skuArray.length);
        }
        if (this.categoryArray.length > 0) {
            this.categoryArray.splice(0, this.categoryArray.length);
        }
        if (this.vendorArray.length > 0) {
            this.vendorArray.splice(0, this.vendorArray.length);
        }
        if (this.descriptionArray.length > 0) {
            this.descriptionArray.splice(0, this.descriptionArray.length);
        }
        if (this.itemCost.length > 0) {
            this.itemCost.splice(0, this.itemCost.length);
        }
        if (this.quantityArray.length > 0) {
            this.quantityArray.splice(0, this.quantityArray.length);
        }
        if (this.featuresArray.length > 0) {
            this.featuresArray.splice(0, this.featuresArray.length);
        }
        if (this.imageNameArray.length > 0) {
            this.imageNameArray.splice(0, this.imageNameArray.length);
        }
        if (this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1";
        }
        else
            this.writeCookie();

    }
}    