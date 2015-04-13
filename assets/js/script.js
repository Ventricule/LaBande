


//----------------------------------------------
//                FUNCTIONS
//----------------------------------------------

	$(document).ready(function(){

		var listLength = $('#menu').find('li').length;
		$( "#menu > li").clone().appendTo('#menu');
		$( "#menu > li").clone().prependTo('#menu');
		var transVal, direction;

		var mySpeed = 500;

		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 'auto',
			slideToClickedSlide: true,
			speed: mySpeed,
			resistanceRatio : 1,
			loop: true,
			loopedSlides: listLength*2,
		});
		swiper.on("onSlideChangeStart", function(swiper, translate){
			transVal = 0;
		});	
		swiper.on("onSetTranslate", function(swiper, translate){
			if (swiper.translate % 320 === 0){
				var absVal = Math.abs(swiper.translate / 320);
				if (absVal > transVal){ 
					transVal = absVal;
				};
				if (swiper.translate < 0){
					direction = 'right';
				} else if (swiper.translate > 0) {
					direction = 'left';
				}
			}
		});
		swiper.on("onSlideChangeEnd", function(swiper, translate){
			if (transVal > 0){
				if (direction == 'right'){
					$( "#menu").find('li').slice(0, transVal).appendTo('#menu');
					console.log(transVal);
					swiper.slideTo(0, 0, false);
				}
			}
		});	






	$( "#submenu > li").clone().appendTo('#submenu');
	var swiper2 = new Swiper('.swiper-container2', {
		slidesPerView: 'auto',
		loop: true,
		loopedSlides: 3,
		slideToClickedSlide: true,
		speed: 500,
		//nextButton: "#bande2"
	});
/*
		$( "#menu, #submenu" ).on( "click", function(){
			var first = $(this).find('li:first-child');
			var last = $(this).find('li:last-child');

			first.animate({marginLeft: -320}, 300);
			setTimeout(function() {first.css('margin-left', 0).appendTo(first.parent())}, 330);
			if (first.offset().left < -320){
				first.appendTo('#menu');
			} else if (first.offset().left > -320){
				last.prependTo('#menu');
			} 
		} );
*/
		//$('#menu').find('li').clone().appendTo('#menu');





/*		(function($) {
			$.fn.drags = function(opt) {

				opt = $.extend({handle:"",cursor:"move"}, opt);

				if(opt.handle === "") {
					var $el = this;
				} else {
					var $el = this.find(opt.handle);
				}

				return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
					if(opt.handle === "") {
						var $drag = $(this).addClass('draggable');
					} else {
						var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
					}
					var z_idx = $drag.css('z-index'),
						drg_w = $drag.outerWidth(),
						pos_x = $drag.offset().left + drg_w - e.pageX;
					$drag.css('z-index', 1000).parents().on("mousemove", function(e) {
						$('.draggable').offset({
							left:e.pageX + pos_x - drg_w
						}).on("mouseup", function() {
							$(this).removeClass('draggable').css('z-index', z_idx);
						});
					});
					e.preventDefault(); // disable selection
				}).on("mouseup", function() {
					if(opt.handle === "") {
						$(this).removeClass('draggable');
					} else {
						$(this).removeClass('draggable').removeClass('active-handle').parent().removeClass('draggable');
					}
				});

			}
		})(jQuery);

		//$('#menu, #submenu').drags();
		//$('#menu, #submenu').draggable({ axis: "x" });
*/
/*		
		$('#menu').pep({

			axis: 'x',
			useCSSTranslation: false,
			shouldPreventDefault: false,
		  
		});
		$('#submenu').pep({

			axis: 'x',
			useCSSTranslation: false,
			shouldPreventDefault: false,
			startPos: {left: null, top: 40}
		  
		});

*/

	});

