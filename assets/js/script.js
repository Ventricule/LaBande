


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
			var activeSlide, activeChild, direction, mySpeed = 500;

			this.listLength = listLength;
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
				resistanceRatio : 0.85,
				loop: true,
				loopedSlides: listLength,
				slideActiveClass: 'active',
				slideDuplicateClass: 'duplicate',
				runCallbacksOnInit: false,
				onSlideChangeStart: function(swiper){
					var old = $(swiper.wrapper).find('.active');
					swiper.update();
					activeSlide = $(swiper.wrapper).find('.active');

					if (old.index() < activeSlide.index() ) { 
						direction = 'next';
					} else if (old.index() > activeSlide.index() ) { 
						direction = 'prev';
					} else { 
						direction = 'null';
					};

					swiper.update();
					slideMenu(swiper, activeSlide.attr('data-hash'), activeSlide.attr('data-p-hash'));  
				},
				onTransitionEnd: function(swiper){
					var activeSlide = $(swiper.wrapper).find('.active');
					swiper.slideTo( parseInt(activeSlide.attr('data-swiper-slide-index'))+listLength, 0, false);
					swiper.update();
				} 
			});

			function slideMenu(swiper, hash, parentHash) {
				var oldParent = $('#menu').find('li.active');	
				var oldChild = $('#submenu').find('li.active');
				if( direction == 'next' ){
					var newParent = $('#menu').find('li.active').nextAll('li[data-hash='+parentHash+']').first()
					var newChild = $('#submenu').find('li.active').nextAll('li[data-p-hash='+hash+']').first();
				} else if (direction == 'prev'){	
					var newParent = oldParent.prevAll('li[data-hash='+parentHash+']').first()
					var newChild = oldChild.prevAll('li[data-p-hash='+hash+'][data-num=1]').first();
				};

				if( ! parentHash ){ 
					activeChild = activeSlide, activeSlide = oldChild;
				} else { 
					activeChild = activeSlide, activeSlide = oldParent;
				};

				if( activeSlide.attr('data-id') !== activeChild.attr('data-id') ){
					if (parentHash && menu) {
						if(newParent.hasClass('duplicate')){
							menu.swiper.slideTo(newParent.index(), 1000, false);
							menu.swiper.update();
							setTimeout(function() {
								menu.swiper.slideTo(parseInt($(menu.swiper.wrapper).find('.active').attr('data-swiper-slide-index'))+menu.listLength, 0, false);
						}, 1000);
						} else {
							menu.swiper.slideTo(newParent.index(), 1000, false);
						}
						menu.swiper.update();
					} else if (submenu) {
						if(newChild.hasClass('duplicate')){
							submenu.swiper.slideTo(newChild.index(), 1000, false);
							submenu.swiper.update();
							setTimeout(function() {
								submenu.swiper.slideTo(parseInt($(submenu.swiper.wrapper).find('.active').attr('data-swiper-slide-index'))+submenu.listLength, 0, false);
							}, 1000);
						} else {
							submenu.swiper.slideTo(newChild.index(), 1000, false);
						}
					}
					submenu.swiper.update();
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

