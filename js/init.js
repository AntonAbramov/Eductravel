$(document).ready(function () {
	$("#nav").addClass("js").before('<div id="menu">☰</div>');
	$("#menu").click(function(){
		$("#nav").toggle();
	});
	$("#slides").slidesjs({
//		width: 940,
		height: 263
	});
	tabs();
});

$(window).resize(function(){
	if(window.innerWidth > 768) {
		$("#nav").removeAttr("style");
		$(".tab-nav").find("a").first().click();
	}
	else {
		$(".tab").show();
	}
});

$(window).load(function () {
	if(window.innerWidth > 768) {
		$(".tab-nav").find("a").first().click();
	}
	postFunc();
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
		var that = $(this);
		if (that.hasClass("disabled")) {
			return false;
		}
		else {
			var position = that.parents(".post-list").find("ul").css("top");
			var top = parseInt(position.substr(0, position.length-2));
			if (!(top == 0)) {
				var firstVisible = parseInt(that.parents(".post-list").find(".first-visible-page").text());
				var lastVisible = parseInt(that.parents(".post-list").find(".last-visible-page").text());
				that.parents(".post-list").find(".first-visible-page").text(--firstVisible)
				that.parents(".post-list").find(".last-visible-page").text(--lastVisible)
				that.parents(".post-list").find("ul").css("top", top+32 +"px");
			}
		}
		that.addClass("disabled");
		setTimeout(function(){
			that.removeClass("disabled")
		}, 500);
	});
	$(".btn-next").on("click", function(){
		var that = $(this);

		if (that.hasClass("disabled")) {
			return false;
		}
		else {
			var position = that.parents(".post-list").find("ul").css("top");

			var top = parseInt(position.substr(0, position.length-2));
			var x = that.parents(".post-list").find("ul").outerHeight()-160;
			if (!(top == -x)) {
				var firstVisible = parseInt(that.parents(".post-list").find(".first-visible-page").text());
				var lastVisible = parseInt(that.parents(".post-list").find(".last-visible-page").text());
				that.parents(".post-list").find(".first-visible-page").text(++firstVisible)
				that.parents(".post-list").find(".last-visible-page").text(++lastVisible)
				that.parents(".post-list").find("ul").css("top", top-32 +"px");
			}
		}
		that.addClass("disabled");
		setTimeout(function(){
			that.removeClass("disabled")
		}, 500);


	});
}