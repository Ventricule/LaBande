


//----------------------------------------------
//                FUNCTIONS
//----------------------------------------------

	$(document).ready(function(){

		function colors() { 
			var color = '#'; 
			var letters = ['422222','FF0000','16C038','0000FF','FF82A2','FFFF00']; //Set your colors here
			color += letters[Math.floor(Math.random() * letters.length)];
			return color
		};



		function Bande(container, item) {
			this.container = container;
			var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
			var oldVal, clicked, direction, mySpeed = 500;

			this.item = new Swiper(container, {
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
				onSlideChangeStart: function(){
					if (item.activeIndex == item.clickedIndex){
						clicked = true;
					} else {
						clicked = false;
					}
				},
				onSetTranslate: function(item, translate){
					clicked = item.clickedIndex;
					if (item.translate % 320 == 0){
						if (item.translate < oldVal){
							direction = 'right';
						} else if (item.translate > oldVal) {
							direction = 'left';
						} 
						console.log(direction);
						oldVal = item.translate;
					}
				},
				onClick: function(item){
					if (clicked = true) {
						setTimeout(function() {
							if (direction == 'right'){
								var toMove = item.clickedIndex-listLength;
								parent.find('li').slice(0, toMove).appendTo(parent);
								item.slideTo(listLength, 0, false);
							} else if (direction == 'left'){
								var toMove = item.clickedIndex-listLength;
								var total = parent.find('li').length;
								parent.find('li:last-child').prependTo(parent);
								item.slideTo(listLength, 0, false);
							}
						}, mySpeed-300);
					}
				},
				onSlideChangeEnd: function(){
					clicked = false;
				}
			});
		};
	
		var menu = new Bande($('#bande1'), 'menu' );
		var submenu = new Bande($('#bande2'), 'submenu' );

		menu.item.on("slideChangeStart",function(){
			var clicked = menu.item.clickedSlide.getAttribute("data-id")
			console.log(clicked);
			submenu.item.slideTo($('#submenu').find('li').index($('[data-parent='+clicked+']').first()), 1000, true);
		}); 


	$('nav').find('li').each(function(){
		if ($(this).css('background-color') === 'rgb(66, 34, 34)' || $(this).css('background-color') === 'rgb(0, 0, 255)' ){
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

