/* -----------------------------------------------------------------
PC & MOBILE Class JAVASCRIPT
----------------------------------------------------------------- */
// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$("body").addClass("mobile");

	if(navigator.userAgent.match(/Mobile|iP(hone|od)|iPad/)) $("body").addClass("ios");
}
else{$("body").addClass("pc");}


/* -----------------------------------------------------------------
OPTION PLUG-IN FUNCTION
----------------------------------------------------------------- */
var gbgs = {
	// GNB
	gnbEvent : function(){
		moEvent();
		pcEvent();

		// pc gnb
		function pcEvent(){
			var header=$("#header"), gnb = $("#gnb"), gnbbtn = gnb.find("h2 a"), depth = gnb.find(".depth"),
			spd = 200, _temp = false;

			//default
			$('#m-gnb').hide();

			// resize
			$(window).on("resize", function(){
				if($(window).width() > 1020) $('#m-gnb').hide();
			})

			// mouse
			gnbbtn.on("mouseenter", function(){
				$(this).closest("li").addClass("on").siblings().removeClass("on");
				if(_temp == true) return false;
				header.stop().css({"padding-bottom": "225px"},spd).addClass("open");
				depth.stop().show();
				_temp = true;
			});

			depth.find("a").on("mouseenter", function(){
				console.log("hdd")
				$(this).closest(".depth").closest("li").addClass("on").siblings().removeClass("on");
			})


			gnb.on("mouseleave", function(){
				depth.hide(0, function(){
					gnbbtn.closest("li").removeClass("on");
				});
				header.css({"padding-bottom": "0"}).removeClass("open");
				_temp = false;
			});
		}

		// mobile gnb
		function moEvent(){
			var openbtn = $(".m-gnb"), gnb = $("#m-gnb"), closebtn = gnb.find(".btn-close"), spd=300;

			// default
			if($(".menu > li",gnb).hasClass("on")){
				$(".menu > li.on",gnb).find(".depth").show();
			}


			// open btn
			openbtn.on("click", function(){
				$("html, body").css({"overflow": "hidden"});
				gnb.show(0, function(){
					gnb.animate({"opacity": 1}, spd);
					gnb.find("a").focus();
				});
			})
			// close btn
			closebtn.on("click", function(){
				gnb.hide(0, function(){
					gnb.css({"opacity": 0});
					openbtn.focus();
					$("html, body").css({"overflow": "auto"});
				})
			})
			// menu click
			$("h2 a", gnb).on("click", function(){
				var p = $(this).closest("li"), spd=300;
				if(p.find(".depth").length > 0) {
					if(p.hasClass('on')){
						p.find(".depth").slideUp(spd);
					} else{
						p.find(".depth").slideDown(spd);
						p.siblings().find(".depth").slideUp(spd);
					}
					p.toggleClass("on").siblings().removeClass("on");
					return false;
				}
			})
		}
	},

	//footer
	footerEvent : function(){
		// Slick
		$('.footer-banner-zone .slider').slick({
			autoplay: true,
			autoplaySpeed: 3000,
			infinite: true,
			speed: 400,
			arrows: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			cssEase: 'linear',
			accessibility: true,
			prevArrow: $(".footer-banner-zone .btn-prev"),
			nextArrow: $(".footer-banner-zone .btn-next"),
			responsive: [
			   {
			      breakpoint: 1320,
			      settings: {
			        slidesToShow: 4,
			        slidesToScroll: 1,
			        infinite: true,
			        dots: false
			      }
			   },
			   {
			      breakpoint: 768,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 1
			      }
			   },
			   {
			      breakpoint: 500,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 1
			      }
			   }
			]
		});

		// Slick stop btn
		$('.footer-banner-zone .btn-stop').on('click', function(){
			var pauseBtn = $(this);
			if (pauseBtn.hasClass('paused')){
				$(".footer-banner-zone .slider").slick('slickPause');
				pauseBtn.removeClass('paused');
				pauseBtn.html('재생');
			} else {
				$(".footer-banner-zone .slider").slick('slickPlay');
				pauseBtn.addClass('paused');
				pauseBtn.html('정지');
			}
		});
	},

	// TAB SHOW / HIDE
	tabEvent : function(tabName, hasClassName, contName, liName){
		if($(tabName).length < 1) return false;
		liName == undefined ? liName = "li" : liName;

		var curr = 0;

		// default
		$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).hide();

		// click
		$(tabName).find(liName).on("click", function(){
			if($(this).hasClass(hasClassName)) return false;

			curr = $(this).index();
			$(this).addClass(hasClassName).siblings().removeClass(hasClassName);
			$(contName).eq(curr).show().siblings(contName).hide();
			$('.slider').slick('setPosition');
			return false;
		});
	},

	// ACCORDION
	accordionEvent: function(accordionName, qName, aName, openClass, allGroupName){
		if($(accordionName).length < 1) return false;
		var spd = 300;

		//default
		if($(accordionName).hasClass(openClass)) $(accordionName).find(aName).show();

		// click 
		$(accordionName).find(qName).on("click", function(){
			var _this = $(this).closest(accordionName);
			if(_this.hasClass(openClass)){ _this.find(aName).slideUp(spd); }
			else{
				_this.find(aName).slideDown(spd);
				_this.closest(allGroupName).siblings().find(aName).slideUp(spd);
			}
			_this.toggleClass(openClass).closest(allGroupName).siblings().find(accordionName).removeClass(openClass);
			return false;
		});
	},

	// SHOW HIDE MOUSE
	showhideEvent: function(groupName, btnName, showArea){
		var $group = $(groupName);
		$(btnName ,$group).on("mouseenter", function(){
			if($(this).parent().hasClass("over")) return false;
			$(this).parent().addClass("over").siblings().removeClass("over");

		})
		$group.on("mouseleave", function(){
			$group.find(".over").removeClass("over");

		})
	},

	// LAYER LOAD
	layerEvent: function(layerName){
		$.ajax({
			url:layerName,
			success: function(e){
				$("#wrap").append("<article></article>");
				$("article").html(e);
			}
		})
	},
	layerCloseEvent: function(e){
		$(e).closest("article").remove();
	},

	// on Toggle class
	onToggleEvent: function(){
		if($(".js-ontoggle").length < 1) return false;

		var box = $('.js-ontoggle');
		box.each(function(){
			var btn = $(this).find(".js-btn");

			btn.on("click", function(e){
				e.preventDefault;
				$(this).parent().addClass("on").siblings().removeClass("on");
			})
		})
	}
};


/* -----------------------------------------------------------------
MAIN JAVASCRIPT
----------------------------------------------------------------- */
var main_Js = (function(){
	if($("#container").hasClass("main") == false ) return false;

	// main to visual
	$('.main-visual-zone .slider').slick({
		autoplay:true,
		dots: false,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		ltr: true,
		cssEase: 'linear'
	});

	// main banner
	$('.main-banner-zone .slider').slick({
		autoplay:true,
		dots: false,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		ltr: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: $(".main-banner-zone .btn-prev"),
		nextArrow: $(".main-banner-zone .btn-next")
	});

	// main guide1 zone
	$('.main-gruid-zone .guide1 .slider').slick({
		autoplay:true,
		dots: true,
		infinite: true,
		speed: 400,
		autoplaySpeed:4000,
		cssEase: 'linear',
		ltr: true
	});
})();


/* -----------------------------------------------------------------
FIXED PLUG-IN FUNCTION
----------------------------------------------------------------- */
// TAB FUNCTION
var plugin_tab = (function(){
	// TAB SHOW / HIDE
	var tabName = '.js-tab', hasClassName = 'current', contName = '.tab-contents', liName = 'li', curr = 0;

	if($(tabName).length < 1) return false;

	// default
	$(contName).eq($(tabName).find("."+hasClassName).index()).show().siblings(contName).hide();
	$(tabName).find("."+hasClassName).append("<span class='hidden'>현재 선택 탭</span>");

	// click
	$(tabName).find(liName).on("click", function(){
		if($(this).hasClass(hasClassName)) return false;

		curr = $(this).index();
		$(this).addClass(hasClassName).append("<span class='hidden'>현재 선택 탭</span>").siblings().removeClass(hasClassName).find(".hidden").remove();
		$(contName).eq(curr).show().siblings(contName).hide();
		$('.slider').slick('setPosition');

		return false;
	});
})();

// ACCORDION FUNCTION
$(document).on("click", ".js-acco .btn-question", function(){
  var parentBox=$(this).closest("li"),
  qName = $(this), openClass = "open", aName = ".answer", spd=300;

	if(parentBox.hasClass(openClass)){ parentBox.find(aName).slideUp(spd); }
	else{
		parentBox.find(aName).slideDown(spd);
		parentBox.siblings().find(aName).slideUp(spd);
	}
	parentBox.toggleClass(openClass).siblings().removeClass(openClass);
	return false;
})

// GALLERY TAB FUNCTION
var gallery_tab = function(){
	$(".gallery-info .tab li a").on("click", function(){
		var index = $(this).parent().index(),
			slider = $(".gallery-info .tab-con .tab-contents");
		$(".gallery-info .tab li").removeClass("on");
		$(this).parent().addClass("on");
		slider.removeClass("on")
		slider.eq(index).addClass("on");
		$('.slider').slick('setPosition');
		return false;
	});
	$('.slider.room').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  dotsClass: 'custom-paging',
		customPaging: function (slider, i) {
		return  (i + 1) + '/' + slider.slideCount;
		}
	});
}();

// LNB FUNCTION
var plugin_lnb = (function(){
	if($("#lnb .more").length < 1) return false;

	//default
	$("#lnb .more.on").find(".depth").show();

	// click
	var snb = $("#lnb .more h3 a"), spd = 200;

	snb.on("click", function(){
		var _this = $(this).closest("li");
		if(_this.hasClass("on")) {
			_this.removeClass("on").find(".depth").stop().slideUp(spd);
		} else{
			_this.addClass("on").find(".depth").stop().slideDown(spd);
			_this.siblings(".more").removeClass("on").find(".depth").stop().slideUp(spd);
		}

		return false;
	})
})();


// ADD FILE
$(document).on("click", ".form--addfile .fileadd", function(){
	$(this).next("input:file").trigger("click");
});
// File change
$(document).on("change", ".form--addfile input:file", function(){
	var path = $(this).val();
	$(this).closest(".form--addfile").find("input:text").val(path);
})

// DATE PICKER
$( ".ipt-datepicker input" ).datepicker({
	showOn: "button",
	buttonImage: "/aml_sangju/images/button/btn-datepicker.png",
	buttonImageOnly: true,
	buttonText: "Select date"
});

// ALL CHECKED
$(".js--allcheck input").on("change", function(){
	var v = $(this).attr("data-group");

	if($(this).prop("checked")==true){
		$("input:checkbox").each(function(){
			if($(this).attr("data-group") == v) $(this).prop("checked", true);
		})
	}else{
		$("input:checkbox").each(function(){
			if($(this).attr("data-group") == v) $(this).prop("checked", false);
		})
	}
})


/* -----------------------------------------------------------------
DOCUMENT READY
----------------------------------------------------------------- */
$(document).ready(function(){
})


/* -----------------------------------------------------------------
LOAD
----------------------------------------------------------------- */
$(window).load(function(){
	//-------------------------------------------개발시 삭제
	$("header").load('/aml_sangju/html/include/header.html', function(){
		gbgs.gnbEvent(); // gnb animation js
	});
	$("footer").load('/aml_sangju/html/include/footer.html', function(){
		gbgs.footerEvent();
	});
	// ------------------------------------------개발시 삭제


	// 개발시 위 코드 삭제 후, 아래 코드 활성화 하시기 바랍니다.
	// gbgs.gnbEvent(); // gnb animation js
	// gbgs.footerEvent(); // footer js

})