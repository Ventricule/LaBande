


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
				onInit: function(){
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
				loopedSlides: listLength*2,
				slideActiveClass: 'active',
				onSlideChangeStart: function(swiper){
					clicked = swiper.clickedIndex;
				},
				onSetTranslate: function(swiper, translate){
					// check direction on translate
					if (swiper.translate < oldVal){ direction = 'right'; } else if (swiper.translate > oldVal) { direction = 'left'; } 
					oldVal = swiper.translate;
				},
				onClick: function(swiper){
				},
				onSlideChangeEnd: function(swiper){
					var hash = $(swiper.wrapper).find('.active').attr('data-hash');
					var parentHash = $(swiper.wrapper).find('.active').attr('data-p-hash');
					slideMenu(swiper, hash, parentHash);  
					updateSlide(swiper)
				} 
			});

			function updateSlide(swiper) {
				// permet de mettre le menu en boucle infinie
				if (direction == 'right'){
					console.log('update right');
					var toMove = swiper.clickedIndex-listLength;
					parent.find('li').slice(0, toMove).appendTo(parent);
					swiper.slideTo(listLength, 0, false);
					swiper.update();
				} else if (direction == 'left'){
					console.log('update left');
					var toMove = swiper.clickedIndex-listLength;
					var total = parent.find('li').length;
					parent.find('li:last-child').prependTo(parent);
					swiper.slideTo(listLength, 0, false);
					swiper.update();
				}
			}
			function slideMenu(swiper, hash, parentHash) {
				// ici je voudrais faire en sorte que la fonction slideMenu appelle la fonction updateSlide sur l'élément qui a été slidé en deuxième, mais ça foire
				if(parentHash && menu) {
					var parent = menu.container.find('li[data-hash='+parentHash+']');
					menu.swiper.slideTo(parent.index(), 1000, false);
					//setTimeout(function() {updateSlide(menu.swiper)}, 1000);	
				} else if (submenu) {
					var firstChild = submenu.container.find('li[data-p-hash='+hash+']').first();
					submenu.swiper.slideTo(firstChild.index(), 1000, false);
					//setTimeout(function() {updateSlide(submenu.swiper)}, 1000);	
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

