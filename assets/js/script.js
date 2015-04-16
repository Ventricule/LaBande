


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
    
    
    function slideMenu(hash, parentHash) {
      if(parentHash && menu) {
        var parent = menu.container.find('li[data-hash='+parentHash+']');
        menu.item.slideTo(parent.index(), 1000, false);
      } else if (submenu) {
        var firstChild = submenu.container.find('li[data-p-hash='+hash+']').first();
        submenu.item.slideTo(firstChild.index(), 1000, false);
      }
    }

		function Bande(container) {
			this.container = container;
			var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
			var oldVal, clicked, direction, mySpeed = 500;
        
			this.item = new Swiper(container, {
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
				onSlideChangeEnd: function(swiper){
          
          var hash = $(swiper.wrapper).find('.active').attr('data-hash');
          var parentHash = $(swiper.wrapper).find('.active').attr('data-p-hash');

          slideMenu(hash, parentHash);  
          
				} 
			});
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

