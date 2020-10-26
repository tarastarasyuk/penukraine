let a;
if($(window).width() < 520) {
a=1;
} else {
a=3
}

$('.open__slider').slick({
  slidesToShow: a,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  prevArrow: '<button type="button" class="slick-prev"></button>',
  nextArrow: '<button type="button" class="slick-next"></button>',
});
