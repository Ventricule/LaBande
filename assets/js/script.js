


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
				resistanceRatio : 1,
				loop: true,
				loopedSlides: listLength*2,
				onSlideChangeStart: function(name){
					transVal = 0;		
				},
				onSetTranslate: function(name, translate){
					if (name.translate % 320 == 0){
						if (name.translate < oldVal){
							direction = 'right';
						} else if (name.translate > oldVal) {
							direction = 'left';
						}
						oldVal = name.translate;
					}
				},
				onSlideChangeEnd: function(name, translate){
						if (direction == 'right'){
							var toMove = name.clickedIndex-listLength;
							console.log(toMove);
							parent.find('li').slice(0, toMove).appendTo(parent);
							name.slideTo(listLength, 0, false);
						} else if (direction == 'left'){
							// pass
						}
				}
			});	
		}

		newSwiper('S1', $('#bande1') );
		newSwiper('S2', $('#bande2') );

	});

