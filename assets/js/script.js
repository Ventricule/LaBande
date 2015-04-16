


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

			var updateSlide = function(item){
				if (direction == 'right'){
					console.log('update right');
					var toMove = item.clickedIndex-listLength;
					parent.find('li').slice(0, toMove).appendTo(parent);
					item.slideTo(listLength, 0, false);
					item.update();
				} else if (direction == 'left'){
					console.log('update left');
					var toMove = item.clickedIndex-listLength;
					var total = parent.find('li').length;
					parent.find('li:last-child').prependTo(parent);
					item.slideTo(listLength, 0, false);
					item.update();
				}
			}

			this.updateSlide = updateSlide()

			this.item = new Swiper(container, {
				onInit: function(){
					$('nav').find('li').each(function(){
						$(this).css('background-color', colors);
					});
					//childs.clone().appendTo(parent).clone().prependTo(parent);
				},
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				mousewheelControl: true,
				//hashnav: true,
				speed: mySpeed,
				resistanceRatio : 0.9,
				loop: true,
				loopedSlides: listLength*2,
				slideActiveClass: 'active',
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
						oldVal = item.translate;
					}
				},
				onClick: function(item){
					if (clicked = true) {
						setTimeout(function() {
							updateSlide(item);
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

		// bonne direction et sens inverse + lien avec la colonne

		menu.item.on("slideChangeStart",function(){
			slideMenu(menu.item, submenu.item, anchor);
		}); 
		submenu.item.on("slideChangeStart",function(){
			slideMenu(submenu.item, menu.item, anchor);
		}); 

		var slideMenu = function($this, $that, anchor){
			if($this == menu.item) { var data1 = "data-id", data2 = "data-parent", otherElem = $('#submenu') };
			if ($this == submenu.item) { var data1 = "data-parent", data2 = "data-id", otherElem = $('#menu') };

			var clicked = $this.slides[$this.activeIndex].getAttribute(data1), nextEl;
			console.log(clicked);
			hashtag = $('#submenu').find('.active').nextAll('[data-parent='+clicked+']');
			if (otherElem.find('.active').attr(data2) != clicked){
				nextEl = otherElem.find('.active').nextAll('['+data2+'='+clicked+']');
				if (nextEl == -1){
					if($this == menu.item){ 
						nextEl = otherElem.find('.active').prevAll('['+data2+'='+clicked+'][data-num=1]');
					} else {
						nextEl = otherElem.find('.active').prevAll('['+data2+'='+clicked+']');
					}
				}
				console.log(nextEl.index());
				$that.slideTo(nextEl.index(), 1000, false); 
			};
			var hash = hashtag.attr('data-hash');
			console.log(hash);
			scrollContent(hash);
			$that.update();
			$that.updateSlide;

		};

		var anchor;
		var scrollContent = function(hash) {	
			anchor = $("#"+hash);
			if(hash !== "undefined" ){
				$('html,body').animate({scrollTop: anchor.offset().top -140},800);
			};
		};
		var oldId = $('#submenu').find('.active').attr('data-hash');
		$(document).scroll(function() {
			var cutoff = $(window).scrollTop();
			topId = $('.top').attr('id');
			$('.item').removeClass('top').each(function() {
				if ($(this).offset().top > cutoff) {
					$(this).addClass('top');
					return false; // stops the iteration after the first one on screen
				}
			});
			if (topId != oldId){
				console.log(topId+ " old : "+ oldId)
				oldId = topId;
				anchor2 = topId;
				//slideMenu(submenu.item, menu.item, anchor2);
			}
		});



/*		$(document).scroll(function(){
			// Get container scroll position
			var fromTop = $(this).scrollTop();

			// Get id of current scroll item
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop){
					console.log($(this));
					return $(this);
				};
			});
			console.log(cur);
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
		});
*/


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

