let cart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();

    }
    else {
      // $('.main-cart').html('Корзина пуста');
      // $('.main-cart').html('Ваші замовлення');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        // $('.main-cart__empty').html('');
        $('.main-cart__status').hide();
        $('.main-cart__list').hide();
        $('.main-cart__empty').show();
    }
    else {
      $('.main-cart__empty').hide();
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            for (var id in cart) {
              out += '<div class="main-cart__item">';

                out += '<div class="left__content">';
                out += '<div><button data-id="'+id+'" class="del-goods">x</button></div>';
                out += '<div class="item-goods"><img src="img/'+goods[id].img+'"></div>';
                out += '</div>';

                out += '<div class="center__content">';
                out += '<div><button data-id="'+id+'" class="minus-goods">-</button></div>';
                out += '<div class="num-goods">'+cart[id]+'</div>';
                out += '<div><button data-id="'+id+'" class="plus-goods">+</button></div>';
                out += '</div>';

                out += '<div class="right__content">';
                out += '<span class="cart-equal">=</span>';
                out += '<div class="price-goods">'+cart[id]*goods[id].cost+'</div>';
                out += '</div>';

             out += '</div>';
            }
            $('.main-cart__status').html('Ваше замовлення');
            $('.main-cart__list').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
    showMiniCart();
}

function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
    showMiniCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
    showMiniCart();
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
// функція міні картки


function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

// function getMiniCart() {
//   out = JSON.parse(localStorage.getItem('out'));
//   $('.mini-cart__circle').html('<p>'+out+'</p>');
// }

function ownAlert(text, kind) {

    $('.alert').removeClass("hide");
    $('.alert').addClass("show");
    $('.alert').addClass("showAlert");
    $('.msg').text(text);

    if (kind==1) {
      $('.kind').addClass('fa-check-circle');

          $('.alert').css({
            background: "#63C867",
            "border-color": "#429846"
          });
          $('.msg').css({
            color: "#326234"
          });
          $('.close-btn').css({
            background: "#5BAF5E"
          })
          $('.close-btn').mouseover(function(){
            $(this).css({
                background: "#509E54"
            }).mouseout(function(){
              $(this).css({
                background: "#5BAF5E"
              })
            });
          })
          $('.fa-times').css({
            color: "#326234"
          })
}
    else if (kind==2) {
      $('.kind').addClass('fa-question-circle');

      $('.alert').css({
        background: "#ffdb9b",
        "border-color": "#ffa502"
      });
      $('.msg').css({
        color: "#ce8500"
      });
      $('.close-btn').css({
        background: "#ffd080"
      })
      $('.close-btn').mouseover(function(){
        $(this).css({
            background: "#ffc766"
        }).mouseout(function(){
          $(this).css({
            background: "#ffd080"
          })
        });
      })
      $('.fa-times').css({
        color: "#ce8500"
      })

    }
    else if (kind==3) {
          $('.kind').addClass('fa-exclamation-circle');

          $('.alert').css({
            background: "#D14A4A",
            "border-color": "#A53131"
          });
          $('.msg').css({
            color: "#672121"
          });
          $('.close-btn').css({
            background: "#B95050"
          })
          $('.close-btn').mouseover(function(){
            $(this).css({
                background: "#A74949"
            }).mouseout(function(){
              $(this).css({
                background: "#B95050"
              })
            });
          })
          $('.fa-times').css({
            color: "#672121"
          })
    }

    $('.close-btn').click(function(){
      $('.alert').addClass("hide");
      $('.alert').removeClass("show");
    });
}

function sendEmail() {
  let name = $('#name').val();
  let surname = $('#surname').val();
  let fathername = $('#fathername').val();
  let phone = $('#phone').val();
  let mail = $('#mail').val();
  let location = $('#location').val();
  let index = $('#index').val();
  let way = $('#way').val();
  let number = $('#number').val();
  let textarea = $('#textarea').val();
  if (name!='' && surname!='' && fathername!='' && phone!='' && mail!='' && location!='' && index!='' && way!='' && number!='' && textarea!='') {

    if (isEmpty(cart)) {
      $.post(
        "core/mail.php",
        {
          "name" : name,
          "surname" : surname,
          "fathername" : fathername,
          "phone" : phone,
          "mail" : mail,
          "location" : location,
          "index" : index,
          "way" : way,
          "number" : number,
          "textarea" : textarea
        },
        function(data){
          if (data == 1) {
            ownAlert('Замовлення відправлено!',1);
          }
          else ownAlert('Повторіть замолення!',2);
        }
      )
    }
    else{
      ownAlert('У кошику нічого немає!',3);
    }

  }
  else{
    // alert('Fullfill!');
    ownAlert('Заповніть форму!', 3);
  }
}


$(document).ready(function (){
  loadCart();
  showMiniCart();//перемістив міні карту
  // getMiniCart();
  $('.send__email').on('click', sendEmail);
});
