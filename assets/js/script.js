


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

		$('nav').find('li').each(function(){
			$(this).css('background-color', colors);
			if ($(this).css('background-color') === 'rgb(66, 34, 34)' || $(this).css('background-color') === 'rgb(0, 0, 255)' ){
				$(this).css('color', '#FFFFFF');
			}
		});

		var menu = new Bande($('#bande1'));
		var submenu = new Bande($('#bande2'));
    

		function Bande(container) {
			this.container = container;
			var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
			var oldVal, direction, mySpeed = 500;

			this.swiper = new Swiper(container, {
				onInit: function(){
					if (listLength <= 5){
						childs.clone().appendTo(parent);
					};
				},
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				mousewheelControl: true,
				hashnav: true,
				speed: mySpeed,
				resistanceRatio : 0.9,
				loop: true,
				loopedSlides: listLength,
				slideActiveClass: 'active',
				slideDuplicateClass: 'duplicate',
				runCallbacksOnInit: false,
				onSlideChangeStart: function(swiper){
					swiper.update();
					var activeSlide = $(swiper.wrapper).find('.active');
					slideMenu(swiper, activeSlide.attr('data-hash'), activeSlide.attr('data-p-hash'));  
				},
				onSetTranslate: function(swiper, translate){
					// check direction on translate
					if (swiper.translate < oldVal){ direction = 'right'; } else if (swiper.translate > oldVal) { direction = 'left'; } 
					oldVal = swiper.translate;
				},
				onTransitionEnd: function(swiper){
					var activeSlide = $(swiper.wrapper).find('.active');
					swiper.slideTo( parseInt(activeSlide.attr('data-swiper-slide-index'))+listLength, 0, false);
					swiper.update();
				} 
			});

			function slideMenu(swiper, hash, parentHash) {
				if(parentHash && menu) {
					var parent = menu.container.find('li[data-hash='+parentHash+']:not(.duplicate)');
					menu.swiper.slideTo(parent.index(), 1000, false);
				} else if (submenu) {
					var firstChild = submenu.container.find('li[data-p-hash='+hash+']:not(.duplicate)').first();
					submenu.swiper.slideTo(firstChild.index(), 1000, false);
				}
			}
		};



		/* Map
		---------------------------------------------- */
		L.mapbox.accessToken = 'pk.eyJ1IjoicGllcnJlcGllcnJlcGllcnJlIiwiYSI6IkdXdE5CRFEifQ.3zLbKVYfHituW8BVU-bl5g';
		var map = L.mapbox.map('map', 'pierrepierrepierre.301b5f73');

		map.featureLayer.on('click', function(e) {
		  map.panTo(e.layer.getLatLng());
		});

		map.featureLayer.loadURL('/LaBande/api');


	});

