


//----------------------------------------------
//                FUNCTIONS
//----------------------------------------------

	$(document).ready(function(){

		function colors() { 
			var color = '#'; 
			var letters = ['000000','FF0000','16C038','0000FF','FF82A2','FFFF00']; //Set your colors here
			color += letters[Math.floor(Math.random() * letters.length)];
			return color
		};

		var newSwiper = function(name, container){

			var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
			var oldVal, clicked, direction;
			var mySpeed = 500;

			var name = new Swiper(container, {
				onInit: function(){
					$('nav').find('li').each(function(){
						$(this).css('background-color', colors);
					});
					childs.clone().appendTo(parent).clone().prependTo(parent);
				},
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				mousewheelControl: true,
				hashnav: true,
				speed: mySpeed,
				resistanceRatio : 0.9,
				loop: true,
				loopedSlides: listLength*2,
				// nextButton: container,
				onSlideChangeStart: function(){
					if (name.activeIndex == name.clickedIndex){
						clicked = true;
					} else {
						clicked = false;
					}
				},
				onSetTranslate: function(name, translate){
					clicked = name.clickedIndex;
					if (name.translate % 320 == 0){
						if (name.translate < oldVal){
							direction = 'right';
						} else if (name.translate > oldVal) {
							direction = 'left';
						} 
						oldVal = name.translate;
					}
				},
				onClick: function(){$
					if (clicked = true) {
						setTimeout(function() {
							if (direction == 'right'){
								var toMove = name.clickedIndex-listLength;
								parent.find('li').slice(0, toMove).appendTo(parent);
								name.slideTo(listLength, 0, false);
							} else if (direction == 'left'){
								var toMove = name.clickedIndex-listLength;
								var total = parent.find('li').length;
								parent.find('li:last-child').prependTo(parent);
								name.slideTo(listLength, 0, false);
							}
						}, mySpeed-300);
					}
				},
				onSlideChangeEnd: function(){
					clicked = false;
				}
			});	
		}

	newSwiper('S1', $('#bande1') );
	newSwiper('S2', $('#bande2') );


	$('nav').find('li').each(function(){
		$(this).css('background-color', colors);
		if ($(this).css('background-color') === 'rgb(0, 0, 0)' || $(this).css('background-color') === 'rgb(0, 0, 255)' ){
			$(this).css('color', '#FFFFFF');
		}
	});

	$(document).scroll(function(){
		if (document.documentElement.clientHeight + $(window).scrollTop() >= $(document).height()) {
			$(document).scrollTop(0)
		} else if ($(window).scrollTop() < 0) {
			$(document).scrollTop($(document).height())
		}
	});

});

