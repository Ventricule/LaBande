


//----------------------------------------------
//                FUNCTIONS
//----------------------------------------------

	$(document).ready(function(){

		var newSwiper = function(name, container){

			var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
			childs.clone().appendTo(parent).clone().prependTo(parent);
			var oldVal, direction;

			var mySpeed = 500;

			var name = new Swiper(container, {
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				mousewheelControl: true,
				hashnav: true,
				speed: mySpeed,
				resistanceRatio : 0.85,
				loop: true,
				loopedSlides: listLength*2,
				// nextButton: container,
				onSetTranslate: function(name, translate){
					if (name.translate % 320 == 0){
						if (name.translate < oldVal){
							direction = 'right';
						} else if (name.translate > oldVal) {
							direction = 'left';
						} 
						console.log(direction);
						oldVal = name.translate;
					}
				},
				onClick: function(){
					if (name.clickedIndex !== name.activeIndex) {
						console.log('not equal '+name.clickedIndex);
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
				}

			});	
		}

		newSwiper('S1', $('#bande1') );
		newSwiper('S2', $('#bande2') );

	});

