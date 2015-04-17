


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
    
		var menu = new Bande($('#bande1') );
		var submenu = new Bande($('#bande2'));
    
    

		function Bande(container) {
			this.container = container;
			var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
			var oldVal, clicked, direction, mySpeed = 500;

			this.swiper = new Swiper(container, {
				onInit: function(swiper){
          var etiquetteOriginale = swiper.container.find('li[data-swiper-slide-index="0"]');
          console.log(etiquetteOriginale);
          $('nav').css('background-color', colors);
					$('nav').find('li').each(function(){
						$(this).css('background-color', colors);
					});
				},
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				mousewheelControl: true,
				hashnav: true,
				speed: mySpeed,
				resistanceRatio : 0.9,
				loop: true,
				loopedSlides: listLength,
        centeredSlides: true,
				slideActiveClass: 'active',
				onSlideChangeStart: function(swiper){
					clicked = swiper.clickedIndex;
				},
				onSetTranslate: function(swiper, translate){
					// check direction on translate
					if (swiper.translate < oldVal){ direction = 'right'; } else if (swiper.translate > oldVal) { direction = 'left'; } 
					oldVal = swiper.translate;
				},
				onSetTransition: function(swiper){

				},
				onSlideChangeEnd: function(swiper){
          var activeSlide = $(swiper.wrapper).find('.active');
          swiper.slideTo( parseInt(activeSlide.attr('data-swiper-slide-index'))+listLength, 0, false);
					var hash = activeSlide.attr('data-hash');
					var parentHash = activeSlide.attr('data-p-hash');
					slideMenu(swiper, hash, parentHash);  
				} 
			});

			function slideMenu(swiper, hash, parentHash) {
				if(parentHash && menu) {
					var parent = menu.container.find('li[data-hash='+parentHash+']');
					menu.swiper.slideTo(parent.index(), 1000, false);
				} else if (submenu) {
					var firstChild = submenu.container.find('li[data-p-hash='+hash+']').first();
					submenu.swiper.slideTo(firstChild.index(), 1000, false);
				}
			}
		};


		$('nav').find('li').each(function(){
			if ($(this).css('background-color') === 'rgb(66, 34, 34)' || $(this).css('background-color') === 'rgb(0, 0, 255)' ){
				$(this).css('color', '#FFFFFF');
			}
		});





		/* Map
		---------------------------------------------- */
		L.mapbox.accessToken = 'pk.eyJ1IjoicGllcnJlcGllcnJlcGllcnJlIiwiYSI6IkdXdE5CRFEifQ.3zLbKVYfHituW8BVU-bl5g';
		var map = L.mapbox.map('map', 'pierrepierrepierre.301b5f73');

		map.featureLayer.on('click', function(e) {
		  map.panTo(e.layer.getLatLng());
		});

		map.featureLayer.loadURL('/LaBande/api');


	});

