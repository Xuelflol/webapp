$(document).ready(function() {
    var signInButton = document.getElementById("sign_in");
    var appetizers = document.getElementById("appetizers");
    var desserts = document.getElementById("desserts");
    var drinks = document.getElementById("drinks");
    var meals = document.getElementById("meals");
    var mealsDiv = document.getElementById("meals_div");
    var appetizersDiv = document.getElementById("appetizers_div");
    var dessertsDiv = document.getElementById("desserts_div");
    var drinksDiv = document.getElementById("drinks_div");
    var items = document.getElementById("items");
    
    signInButton.addEventListener("click", function() {
        location.href = "/signin";
    });
    
    var app_digit = 0;
    var bev_digit = 0;
    var meals_digit = 0;
    var des_digit = 0;
    
    function addToCart(item_name, price, qty, item_code) {
        var cart_item = document.getElementById("item_" + item_code);
        
        if (cart_item == null) {
            var idiv = document.createElement("div");
            idiv.id = "item_" + item_code;
            idiv.className = "container-fluid item";

            var del = document.createElement("div");
            del.id = "del_" + item_code;
            del.className = "delete";

            var ndiv = document.createElement("div");
            ndiv.className = "text";
            ndiv.innerHTML = item_name;

            var pdiv = document.createElement("div");
            pdiv.className = "price2";
            pdiv.id = "price_" + item_code;
            pdiv.innerHTML = "$" + price + " X " + qty;

            var qinput = document.createElement("input");
            qinput.type = "number";
            qinput.id = "uqty_" + item_code;
            qinput.min = "1";
            qinput.max = "5";
            qinput.className = "qty2";

            var sbutton = document.createElement("button");
            sbutton.innerHTML = "Update";
            sbutton.id = "update_" + item_code;
            sbutton.className = "add2";

            idiv.appendChild(del);
            idiv.appendChild(ndiv);
            idiv.appendChild(pdiv);
            idiv.appendChild(qinput);
            idiv.appendChild(sbutton);
            items.appendChild(idiv);

            var del_button = document.getElementById("del_" + item_code);
            var update_button = document.getElementById("update_" + item_code);
            var uqtyinput = document.getElementById("uqty_" + item_code);
            var item_price = document.getElementById("price_" + item_code);

            update_button.addEventListener("click", function() {
                item_price.innerHTML = "$" + price + " X " + uqtyinput.value;
            });
        } else {
            var del_button = document.getElementById("del_" + item_code);
            var update_button = document.getElementById("update_" + item_code);
            var qtyinput = document.getElementById("qty_" + item_code);
            var item_price = document.getElementById("price_" + item_code);
            
            item_price.innerHTML = "$" + price + " X " + qtyinput.value;

            del_button.addEventListener("click", function() {
                cart_item.parentNode.removeChild(cart_item);
            });
        }
    }
    
    function populateMenu(divid, div_name, item_name, description, price, item_code) {
        divid.style.display = "inline";
                    
        ndiv = document.createElement("div");
        var menuImg = document.createElement("img");
        menuImg.src = "/images/Rebel-50.png";
        ndiv.appendChild(menuImg);
        ndiv.id = item_code;
        ndiv.className = "col-lg-12 col-md-12 col-sm-12 col-xs-12 inside";

        tdiv = document.createElement("div");
        tdiv.innerHTML = "<h4>" + item_name + "</h4>";

        ddiv = document.createElement("div");
        ddiv.innerHTML = "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 desc'>" + description + "</div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 price'>$" + price + "</div>";

        cdiv = document.createElement("div");

        qinput = document.createElement("input");
        qinput.type = "number";
        qinput.id = "qty_" + item_code;
        qinput.min = "1";
        qinput.max = "5";
        qinput.className = "qty";

        sbutton = document.createElement("button");
        sbutton.id = "button_" + item_code;
        sbutton.innerHTML = "Add";
        
        cdiv.appendChild(qinput);
        cdiv.appendChild(sbutton);
        ndiv.appendChild(tdiv);
        ndiv.appendChild(ddiv);
        ndiv.appendChild(cdiv);

        divid.appendChild(ndiv);
        
        var addTo = document.getElementById("button_" + item_code);
        var qtyinput = document.getElementById("qty_" + item_code);
        addTo.addEventListener("click", function() {
            addToCart(item_name, price, qtyinput.value, item_code);
        });
    }
    
    appetizers.addEventListener("click", function() {
        if (app_digit == 0) {
            $.ajax({
                url:"/appetizer",
                type:"post",
                success:function(resp) {
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(appetizersDiv, "appetizers_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                        
                        app_digit = 1;
                    }
                }
            });
        }
        
        $("#appetizers_div").show()
        $("#appetizers_div").siblings().hide();
    });
    
    drinks.addEventListener("click", function() {
        if (bev_digit == 0) {
            $.ajax({
                url:"/drinks",
                type:"post",
                success:function(resp) {
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(drinksDiv, "drinks_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                        
                        bev_digit = 1;
                    }
                }
            });
        }
        
        $("#drinks_div").show()
        $("#drinks_div").siblings().hide();
            
    });
    
    desserts.addEventListener("click", function() {
        if (des_digit == 0) {
            $.ajax({
                url:"/desserts",
                type:"post",
                success:function(resp) {
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(dessertsDiv, "desserts_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                    }
                
                    des_digit = 1;
                }
            });
        }
        
        $("#desserts_div").show()
        $("#desserts_div").siblings().hide();
    });
    
    meals.addEventListener("click", function() {
        if (meals_digit == 0) {
            $.ajax({
                url:"/meals",
                type:"post",
                success:function(resp) {
                
                    for (var i = 0; i < resp.length; i++) {
                        populateMenu(mealsDiv, "meals_div", resp[i].item_name, resp[i].description, resp[i].price, resp[i].item_code);
                    }
                
                    meals_digit = 1;
                } 
            });
        }
        
        $("#meals_div").show()
        $("#meals_div").siblings().hide();
    });
});