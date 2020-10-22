var shopCart = (function() {

    //***********************************
    //** Constructor
    //***********************************
    cart = [];
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save with Json
    function saveCart() {
        sessionStorage.setItem('shopCart', JSON.stringify(cart));
    }

    // Load with Json
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shopCart'));
    }
    if (sessionStorage.getItem("shopCart") != null) {
        loadCart();
    }


    //***********************************
    //** CRUD & Methods
    //***********************************
    var obj = {};

    obj.addItemToCart = function(name, price, count) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart[item].count ++;
                saveCart();
                return;
            }
        }
        var  item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }

    obj.setCountForItem = function(name, count) {
        for(var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };

    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart[item].count --;
                if(cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }


    obj.removeItemFromCartAll = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();


//***********************************
//** Cart
//***********************************
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shopCart.addItemToCart(name, price, 1);
    displayCart();
});

$('.clear-cart').click(function() {
    shopCart.clearCart();
    displayCart();
});

function displayCart() {
    var cartArray = shopCart.listCart();
    var output = "";
    for(var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-dark' data-name=" + cartArray[i].name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-dark input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shopCart.totalCart());
    $('.total-count').html(shopCart.totalCount());
}

// Remove item
$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shopCart.removeItemFromCartAll(name);
    displayCart();
})


// - 1 item
$('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shopCart.removeItemFromCart(name);
    displayCart();
})
// +1 item
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shopCart.addItemToCart(name);
    displayCart();
})

// Item global addition
$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shopCart.setCountForItem(name, count);
    displayCart();
});

displayCart();
