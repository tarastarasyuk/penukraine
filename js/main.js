let cart = {};

function init() {


  $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
  // console.log(data);
  let out = '';
  for(let key in data) {
    out+='<div class="grid__item">';
    out+='<img src="img/'+data[key].img+'">';
    out+='<div class="price">'+data[key].cost+'$</div>';
    out+='<button class="buy" data-id="'+key+'">+</button>';
    out+='</div>';
  }
  $('.grid').html(out);
  $('.buy ').on('click', addToCart);
  }


function addToCart() {
      //добавляем товар в корзину
      var id = $(this).attr('data-id');
      // console.log(id);
      if (cart[id]==undefined) {
          cart[id] = 1; //если в корзине нет товара - делаем равным 1
      }
      else {
          cart[id]++; //если такой товар есть - увеличиваю на единицу
      }
      showMiniCart();
      saveCart();
// window.location.reload(false);
// alert('Товар занесено до кошика!');

  }


function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}


function showMiniCart() {
    //показываю мини корзину
    let out=0;
    for (var key in cart) {
        // out += key +' --- '+ cart[key]+'<br>';
        out += cart[key];
    }
    localStorage.setItem('out', JSON.stringify(out));
    $('.mini-cart__circle').html('<p>'+out+'</p>');
}

// function checkingMiniCart() {
//
//   if (isEmpty(cart)) {
//     $('.mini-cart').show();
//
//   }
//   else{
//     console.log('fefe');
//     $('.mini-cart').hide();
//   }
// }

function loadCart() {
          $('.mini-cart__circle').html('<p>0</p>');
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

$(document).ready(function (){
  init();
  loadCart();
  // console.log(cart)
  // checkingMiniCart();
});
