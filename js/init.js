$(document).ready(function () {
	$("#nav").addClass("js").before('<div id="menu">☰</div>');
	$("#menu").click(function(){
		$("#nav").toggle();
	});
	$("#slides").slidesjs({
//		width: 940,
		height: 263
	});
	if ($(window).width() <801) {
		$(".slider-page").slidesjs({
			height: '1500'
		});
	}
	else if ($(window).width() <998) {
		$(".slider-page").slidesjs({
			height: '1200'
		});
	}
	else if ($(window).width() <1100) {
		$(".slider-page").slidesjs({
			height: '1040'
		});
	}
	else if ($(window).width() <1200) {
		$(".slider-page").slidesjs({
			height: '940'
		});
	}
	else {
		$(".slider-page").slidesjs({
			height: '860'
		});
	}
	//tabs();
	showAll();
	popup();
	customSelect();
	customSelect2();
	
	if($(".carusel").length) {
		$(".carusel").jCarouselLite({
	        btnNext: ".next",
	        btnPrev: ".prev",
			circular: false,
			scroll: 1,
			visible: 1
	    });
	}
	if($(".carusel-video").length) {
		$(".carusel-video").jCarouselLite({
	        btnNext: ".next-video",
	        btnPrev: ".prev-video",
			circular: false,
			scroll: 1,
			visible: 1
	    });
	}



});

$(window).resize(function(){
	/*if(window.innerWidth > 768) {
		$("#nav").removeAttr("style");
		$(".tab-nav").find("a").first().click();
	}
	else {
		$(".tab").show();
	}*/
});

$(window).load(function () {
	if(window.innerWidth > 768) {
		$(".tab-nav").find("a").first().click();
	}
	postFunc();
	if ($(".scroll-section").length) {
		$(".scroll-section").mCustomScrollbar({
					scrollButtons:{
						enable:false
					}
				});
	}
});


var tabs = function(){
	var tabNavigation = $(".tab-nav").find("a");

	tabNavigation.on("click", function(event){
		event.preventDefault();
		var that = $(this);
		var tabSection = that.parents(".tabs").find(".tab-content .tab");
		if (!that.hasClass("current")) {
			that.parents(".tabs").find(".tab-nav a").removeClass("current");
			tabSection.hide();
			tabSection.eq(that.index()).show();
			$(this).addClass("current");
		}
 	});
}


var postFunc = function(){

	$(".post-list").each(function(){
		var total = $(this).find("ul li").length;
		if (total > 5) {
			$(this).find(".first-visible-page").text(1);
			$(this).find(".last-visible-page").text(5);
			$(this).find(".visible-page-amount").text(total);
		}
		else {
			$(this).find(".page-amount-info").remove();
		}
	});

	$(".btn-prev").on("click", function(){
		var totalLi = parseInt($(this).parent().find(".visible-page-amount").text());
		var that = $(this);
		if (that.hasClass("disabled")) {
			return false;
		}
		else {
			var position = that.parents(".post-list").find("ul").css("top");
			var top = parseInt(position.substr(0, position.length-2));
			if (!(top >= 0)) {
				var firstVisible = parseInt(that.parents(".post-list").find(".first-visible-page").text());
				var lastVisible = parseInt(that.parents(".post-list").find(".last-visible-page").text());
				var firstVisible=firstVisible-5;
				var lastVisible=lastVisible-5
				if (firstVisible <= 1) {
					that.parents(".post-list").find(".first-visible-page").text(1);
					that.parents(".post-list").find(".last-visible-page").text(5)
				}
				else {
					that.parents(".post-list").find(".first-visible-page").text(firstVisible)
					that.parents(".post-list").find(".last-visible-page").text(lastVisible )
				}

				that.parents(".post-list").find("ul").css("top", top+32*5 +"px");
			}
		}
		that.addClass("disabled");
		setTimeout(function(){
			that.removeClass("disabled")
		}, 500);
	});
	$(".btn-next").on("click", function(){
		var totalLi = parseInt($(this).parent().find(".visible-page-amount").text());
		var that = $(this);
		if (that.hasClass("disabled")) {
			return false;
		}
		else {
			var position = that.parents(".post-list").find("ul").css("top");
			var top = parseInt(position.substr(0, position.length-2));
			var x = that.parents(".post-list").find("ul").outerHeight()-160;
			if (!(top <= -x)) {
				var firstVisible = parseInt(that.parents(".post-list").find(".first-visible-page").text());
				var lastVisible = parseInt(that.parents(".post-list").find(".last-visible-page").text());
				that.parents(".post-list").find(".first-visible-page").text(firstVisible=firstVisible+5)
				var lastVisible=lastVisible+5
				if (lastVisible > totalLi) {
					that.parents(".post-list").find(".last-visible-page").text(totalLi)
				}
				else {
					that.parents(".post-list").find(".last-visible-page").text(lastVisible)
				}
				that.parents(".post-list").find("ul").css("top", top-32*5 +"px");
			}
		}
		that.addClass("disabled");
		setTimeout(function(){
			that.removeClass("disabled")
		}, 500);


	});
}

var showAll = function(){
	$(".show-all-js").on("click", function(event){
		event.preventDefault();
		if ($(this).hasClass("is-open")) {
			$(this).text("Показать все").parents(".show-all-block").find(".show-all-container").css("height", "48px");
		}
		else {
			$(this).text("Скрыть детали");
			$(this).parents(".show-all-block").find(".show-all-container").css("height", "auto");
		}
		$(this).toggleClass("is-open");


	})
}

var popup = function(){
	$(".close-popup-js, .overlay-popup").on("click", function(event){
		event.preventDefault();
		$(".overlay-popup").fadeOut();
	});
	$(".make-order-js").on("click", function(){
		$(".overlay-popup").fadeIn();
	});
	$(".popup").on("click", function(event){
		event.stopPropagation();
	})
}

customSelect = function(){
	$(".custom-select-box").each(function(){
		var currentValue = $(this).find("select").find("option:checked").text();
		$(this).find(".select-value").text(currentValue);
	});
	$(".custom-select-box").find("select").on("change", function(){
		$(this).parent().find(".select-value").text($(this).find("option:checked").text());
	})

}
customSelect2 = function(){
	$(".custom-select-item").each(function(){
		var currentValue = $(this).find("select").find("option:checked").text();
		$(this).find(".select-value").text(currentValue);
	});
	$(".custom-select-item").find("select").on("change", function(){
		$(this).parent().find(".select-value").text($(this).find("option:checked").text());
	})

}