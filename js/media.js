let k =1;
$('.mobile__menu').click(function() {
  if (k==1) {
      $('.mobile__menu-list').css('display', 'flex');
      k=2;
      console.log('1');
  }
  else if (k==2) {
    $('.mobile__menu-list').css('display', 'none');
    k=1;
    console.log('2');
  }
});
