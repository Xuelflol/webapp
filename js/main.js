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
    
    var orders = {};
    var total_price = 0;
    
    function updateQuantity(item, qty, price) {
        if (!(item in orders)) {
            orders[item] = parseInt(qty);
        } else if (item in orders) {
            orders[item] = orders[item] + parseInt(qty);
        }     
        
        var qtyupdate = document.getElementById("qcount_" + item);
        
        if (qtyupdate != null) {
            qtyupdate.innerHTML = orders[item];
        }
        
        total_price = total_price + qty * price;
        console.log(total_price);
    }
    
    function addToCart(item_name, price, qty, item_code) {
        //var cart_item = document.getElementById("item_" + item_code);
        
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
        pdiv.innerHTML = "$" + price + " X <span id='qcount_" + item_code + "'>" + qty + "</span>";

        var form = document.createElement("form");
        form.setAttribute("method","post");
        form.setAttribute("action","javascript:console.log('updated');");
        form.name = "iform_" + item_code;

        var qinput = document.createElement("input");
        qinput.type = "number";
        qinput.name = "uqty_" + item_code;
        qinput.id = "uqty_id_" + item_code;
        qinput.min = "1";
        qinput.max = "5";
        qinput.className = "qty2";

        var abutton = document.createElement("input");
        abutton.value = "Add";
        abutton.type = "Submit";
        abutton.id = "add_" + item_code;
        abutton.className = "add2";

        var sbutton = document.createElement("input");
        sbutton.value = "Update";
        sbutton.type = "Submit";
        sbutton.id = "update_" + item_code;
        sbutton.className = "add2";
        form.appendChild(qinput);
        form.appendChild(abutton);
        form.appendChild(sbutton);

        idiv.appendChild(del);
        idiv.appendChild(ndiv);
        idiv.appendChild(pdiv);
        idiv.appendChild(form);
        items.appendChild(idiv);

        var del_button = document.getElementById("del_" + item_code);
        var update_button = document.getElementById("update_" + item_code);
        var add_button = document.getElementById("add_" + item_code);
        var quform = document.forms["iform_" + item_code].elements["uqty_" + item_code];
        var item_price = document.getElementById("price_" + item_code);
        var cart_i = document.getElementById("item_" + item_code);

        add_button.addEventListener("click", function() {
            if (quform.value > 0 && quform.value <= 5) {

                updateQuantity(item_code, quform.value, price);
            }
        });

        update_button.addEventListener("click", function() {
            if (quform.value > 0 && quform.value <= 5) {
                orders[item_code] = parseInt(quform.value);

                item_price.innerHTML = "$" + price + " X <span id='qcount_" + item_code + "'>" + orders[item_code] + "</span>";
                
                total_price = parseInt(quform.value) * price;
                console.log(total_price);
            }
        });

        del_button.addEventListener("click", function() {
            total_price = total_price - orders[item_code] * price;
            console.log(total_price);
            delete orders[item_code];
            
            cart_i.parentNode.removeChild(cart_i);
        });
        /*} else if (cart_item != null) {
            var add_button = document.getElementById("add_" + item_code);
            var del_button = document.getElementById("del_" + item_code);
            var update_button = document.getElementById("update_" + item_code);
            var qform = document.forms["iform_" + item_code].elements["uqty_" + item_code];
            var item_price = document.getElementById("price_" + item_code);
            
            add_button.addEventListener("click", function() {
                if (qform.value > 0 && qform.value <= 5) {
                    item_price.innerHTML = "$" + price + " X <span id='qcount_" + item_code + "'>" + orders[item_code] + "</span>";

                    updateQuantity(item_code, qform.value);
                    console.log(orders);
                    console.log(cart_item);
                }
            });
            
            update_button.addEventListener("click", function() {
                if (qform.value > 0 && qform.value <= 5) {

                    orders[item_code] = parseInt(qform.value);
                    
                    item_price.innerHTML = "$" + price + " X <span id='qcount_" + item_code + "'>" + orders[item_code] + "</span>";
                    console.log(orders);
                }
            });
            
            var c_item = document.getElementById("item_" + item_code);

            del_button.addEventListener("click", function() {
                c_item.parentNode.removeChild(c_item);
            });
        }*/
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
        tdiv.className = "title-div";
        tdiv.innerHTML = "<h4>" + item_name + "</h4>";

        ddiv = document.createElement("div");
        ddiv.className = "desc-div";
        ddiv.innerHTML = "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 desc'>" + description + "</div><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 price'>$" + price + "</div>";

        cdiv = document.createElement("div");
        cdiv.className = "control-div";

        var form = document.createElement("form");
        //form.setAttribute("method", "post");
        form.name = "form_" + item_code;
        form.id = "form_id_" + item_code;
        qinput = document.createElement("input");
        qinput.type = "number";
        qinput.name = "qty_" + item_code;
        qinput.min = "1";
        qinput.max = "5";
        qinput.className = "qty";

        sbutton = document.createElement("input");
        sbutton.id = "button_" + item_code;
        sbutton.type = "Submit";
        sbutton.value = "Add";
        form.appendChild(qinput);
        form.appendChild(sbutton);
        
        cdiv.appendChild(form);

        ndiv.appendChild(tdiv);
        ndiv.appendChild(ddiv);
        ndiv.appendChild(cdiv);

        divid.appendChild(ndiv);
        
        var item_form = document.getElementById("form_id_" + item_code);
        var submit_item = document.getElementById("button_" + item_code);
        
        var qform = document.forms["form_" + item_code].elements["qty_" + item_code];
        
        item_form.setAttribute("action","javascript:console.log('added')");
        //item_form.setAttribute("onclick","addToCart(" + item_name + ", " + price + ", " + qform.value + ", " + item_code + ");")
        
        //submit_item.setAttribute("formaction","javascript:addToCart(" + item_name + ", " + price + ", " + qform.value + ", " + item_code + ");");
        //console.log(qform);
        
        //item_form.setAttribute("action","javascript:addToCart(" + item_name + ", " + price + ", " + qform.value + ", " + item_code + ");");
        
        //var addTo = document.getElementById("button_" + item_code);
        submit_item.addEventListener("click", function() {
            var cart_item = document.getElementById("item_" + item_code);
            
            if (cart_item == null) {
                if (qform.value > 0 && qform.value <= 5) {
                    addToCart(item_name, price, qform.value, item_code);
                    
                    updateQuantity(item_code, qform.value, price);
                }
            } else if (cart_item != null) {
                updateQuantity(item_code, qform.value);
            }
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