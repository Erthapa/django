var updateBtns = document.getElementsByClassName('update-cart')


for(var i = 0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        console.log('Button clicked')
        var productId=this.dataset.productId
        var action =this.dataset.action
        console.log('productId:',productId,'Action:', action)

        console.log('USER:',user)
        if(user == 'AnonymousUser'){
            addCookieItem(productId, action)
        }else{
            updateUserOrder(productId, action)
        }
    })
}
function addCookieItem(productId, action){
    console.log("user is not logged in")
    var cart = JSON.parse(getCookie('cart') || '{}');
    
    console.log('Cart before update:', cart);

    if(action == 'add'){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity': 1}

        }else{
            cart[productId]['quantity'] += 1;
        }
    }
    if(action == "remove"){
        cart[productId]['quantity'] -= 1;

        if(cart[productId]['quantity'] <=0){
            console.log('remove item')
            delete cart[productId]
        }
    }
    console.log('Cart:',cart)

    document.cookie ='cart=' + JSON.stringify(cart) + ";path=/"
    location.reload()

}

function updateUserOrder(productId, action){
    console.log("user is logged in, sending data...")
   
    var url = '/update_item/'
    var csrftoken = getToken('csrftoken');
    

    
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type' :'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'productId':productId,'action':action})
    })

    
     .then((response) =>{
        return response.json();
    })

     .then((data) =>{    
        console.log('data:',data)  
        location.reload()
    })

    
}