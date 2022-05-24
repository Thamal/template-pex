function menuFunction(x) {
	x.classList.toggle("change");
}

function updateNav() {
	if ($(document).width() < 992) {
		return;
	}
	let scrollTop = $(document).scrollTop();
	let carouselHeight = $('header .carousel').height() - $('header .navbar').height();
	let alpha = 0;
	if (scrollTop > 0 && scrollTop <= carouselHeight) {
		alpha = scrollTop / carouselHeight;
	}
	if (scrollTop > carouselHeight) {
		alpha = 1;
	}
	$('header .navbar > .container').css('background-color', 'rgba(46, 59, 78,' + alpha + ')');
}

$().ready(function () {
	updateNav();
})

$(window).scroll(function() {
	updateNav();
});
