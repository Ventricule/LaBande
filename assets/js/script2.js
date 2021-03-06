


//----------------------------------------------
//                FUNCTIONS
//----------------------------------------------

$(document).ready(function(){
	
	var winH = $(window).height(), menuL = $("#menu>li").length, oldH = 0;

	var swiping = false, scrolling = false, lastScrollTop = 0, topId = $('main .item').first().attr('id'), oldId = topId;
	var menu = new Bande($('#bande1'));
	var submenu = new Bande($('#bande2'));
	var activebox = new Bande($('#bande3'));
	
	var direction, activeSlide, activeChild;

	function Bande(container) {
		this.container = container;
		var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;
		var mySpeed = 500;

		this.listLength = listLength;
		this.swiper = new Swiper(container, {
			onInit: function(swiper){

				// set #menu elements heights (padding) if elements.height is less than windows.height
				$('#menu').find('li:not(.duplicate)').each( function(){
					oldH += $(this).height();
				});
				var pad = Math.ceil((winH - oldH)/(menuL*2));
				if (pad > 0){
					$("#menu>li").css('padding-top', pad+1).css('padding-bottom', pad+1)
				};

				if (listLength <= 5){
					childs.clone().appendTo(parent);
				};
				direction = 'next';
				setTimeout(function(){ swiper.update(true);}, 300);
				$('main .item').first().addClass('top');
			},
			slidesPerView: 'auto',
			slideToClickedSlide: true,
			mousewheelControl: true,
			//hashnav: true,
			direction: 'vertical',
			speed: mySpeed,
			resistanceRatio : 0.8,
			loop: true,
			loopedSlides: listLength,
			slideActiveClass: 'active',
			slideDuplicateClass: 'duplicate',
			prevButton: '.swiper-button-prev',
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
				//slideMenu(activeSlide.attr('data-hash'), activeSlide.attr('data-p-hash'));
			},
			onTransitionEnd: function(swiper){
				var activeSlide = $(swiper.wrapper).find('.active');
				swiper.slideTo( parseInt(activeSlide.attr('data-swiper-slide-index'))+listLength, 0, false);
				swiper.update();
			} 
		});
		
	};

	function slideMenu(hash, parentHash) {
		var oldParent = $('#menu').find('li.active');	
		var oldChild = $('#submenu').find('li.active');
		if( direction == 'next' ){
			var newParent = oldParent.nextAll('li[data-hash='+parentHash+']').first()
			var newChild = oldChild.nextAll('li[data-p-hash='+hash+']').first();
		} else if (direction == 'prev'){	
			var newParent = oldParent.prevAll('li[data-hash='+parentHash+']').first()
			var newChild = oldChild.prevAll('li[data-p-hash='+hash+'][data-num=1]').first();
		};
		if( ! parentHash ){ 
			activeChild = activeSlide, activeSlide = oldChild;
			var hash = newChild.attr('data-hash');
		} else { 
			activeChild = activeSlide, activeSlide = oldParent;
			var hash = activeChild.attr('data-hash');
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
				submenu.swiper.update();
			}
		}
		if (scrolling === false ){ 
			slideColumn(hash);
		};
	};

	function slideColumn(hash) {
		anchor = $("#"+hash);
		if(anchor.length){
			swiping = true;
			$('html,body').animate({scrollTop: anchor.offset().top + 1},750, function() {
				swiping = false;
			});
		};
	};

	$(document).scroll(function(e) {	
		if (swiping === false ){
			scrolling = true; // scrolling the column
			clearTimeout($.data(this, 'scrollTimer'));
			$.data(this, 'scrollTimer', setTimeout(function() {
				scrolling = false;
			}, 750));

			var cutoff = $(window).scrollTop();
			topId = $('.top').attr('id');
			$('.item').removeClass('top').each(function() {
				if ( $(this).offset().top > cutoff - parseInt($(this).height() - 50 ) ) {
					$(this).addClass('top');
					return false; // stops the iteration after the first one on screen
				}
			});
			var st = $(this).scrollTop();
			var menuId = $('#submenu').find('.active').attr('data-hash');
			if (st > lastScrollTop){
				direction = "next";
			} else {
				direction = "prev";
			}
			if (topId != menuId && topId != oldId){
				activeSlide = $('#submenu').find('li[data-hash='+topId+']:not(.duplicate)');
				oldId = topId;
				submenu.swiper.slideTo(activeSlide.index(), 1000, false);
				// loop mode : update !
				slideMenu(activeSlide.attr('data-hash'), activeSlide.attr('data-p-hash'));
				lastScrollTop = st;

			}
		}
	});
	$('#prev').click(function() {
		submenu.swiper.slidePrev(true, 600);
	});



	/* Manifestations
	---------------------------------------------- */
	$('.manifestations-summary .full-text').slideUp(0);
	$('.manifestations-summary .synth').click(function() {
		var $this = $(this);
		if ($(this).hasClass('open')){
			$(this).removeClass('open').siblings('.full-text').slideUp('fast');
            setTimeout(function () {
                $('html,body').stop(false, false).animate({
                    'scrollTop': $this.closest('ul').offset().top - 20
                }, {
                    duration: 310,
                    queue: false
                });
            }, 240);
		} else {
			$('.manifestations-summary .synth.open').removeClass('open').siblings('.full-text').slideUp('fast');
			$this.addClass('open').siblings('.full-text').slideDown('fast');
            setTimeout(function () {
                $('html,body').stop(false, false).animate({
                    'scrollTop': $this.offset().top - 20
                }, {
                    duration: 310,
                    queue: false
                });
            }, 240);
		}
	});


	/* Lieux
	---------------------------------------------- */
	$('.foldable').click(function() {
		$(this).siblings().children().hide();
		$(this).children().show();
	});


	/* Map
	---------------------------------------------- */
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2FtdWVscm0iLCJhIjoicVJuNV9YMCJ9.7Bol-cHVhp6d_l-lVhPpew';
	var map = L.mapbox.map('map', 'samuelrm.3e35d3f6', { zoomControl: false, attributionControl: false });
	new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
	map.setView([48.8707,2.3130], 12);

	map.featureLayer.on('click', function(e) {
		map.panTo(e.layer.getLatLng());
	});

	var labande = [[2.356138229370117,48.89832705920586],[2.37030029296875,48.89866560720992],[2.3703861236572266,48.89762174349946],[2.374334335327148,48.89756531781301],[2.375063896179199,48.89863739496384],[2.381715774536133,48.898750243852646],[2.3833465576171875,48.89615465495109],[2.384033203125,48.89612644128778],[2.3854494094848633,48.89745246624902],[2.3894834518432617,48.897424253318206],[2.3909854888916016,48.897283188425355],[2.3924875259399414,48.89691641784082],[2.3932600021362305,48.89731140143576],[2.3957920074462886,48.89748067916391],[2.397465705871582,48.894602879823296],[2.3986244201660156,48.89053982224059],[2.395534515380859,48.88969331034916],[2.396392822265625,48.88749231235858],[2.3967790603637695,48.88512189848095],[2.3969936370849605,48.8838237670766],[2.3977231979370113,48.883033583636895],[2.3993539810180664,48.88275137223991],[2.4005126953125,48.882553823314474],[2.4007701873779297,48.881735398025],[2.4002981185913086,48.8812838473048],[2.4001264572143555,48.880775847871554],[2.4018430709838867,48.87874379854197],[2.402658462524414,48.87840511562753],[2.405233383178711,48.87792531090653],[2.4060916900634766,48.877755966965],[2.4065637588500977,48.87741727736203],[2.4079370498657227,48.874792355184326],[2.4085378646850586,48.87312701056584],[2.4090957641601562,48.8678201189718],[2.40875244140625,48.86448891012796],[2.4102115631103516,48.855849318434906],[2.4114561080932617,48.84918508531922],[2.411069869995117,48.847067028875536],[2.409052848815918,48.847236476688]] ;
	labande.forEach(function(point){
		point.reverse(); 
	});

	var colors = ['#FFE138', '#45FF7A', '#FF6A45', '#8ABBFF', '#3C1E1E'];

	var polyline = [];
	/*var stroke = L.polyline(labande, {
		color: '#ddd',
		lineCap: 'butt',
		opacity: 1,
		weight:18
	}).addTo(map);
	polyline.push(stroke);*/
	colors.forEach(function(color, index) {
		dashSize = 20;
		iteration = index;
		dash = iteration*dashSize;
		space = colors.length * dashSize - dash ;
		var dashArray = [space, dash];
		var line = L.polyline(labande, {
			color: color,
			dashArray: dashArray,
			lineCap: 'butt',
			opacity: 1,
			weight:15
		}).addTo(map);
		polyline.push(line);
	});

	// MARKERS
	
	var markers = new L.MarkerClusterGroup({zoomToBoundsOnClick:false,showCoverageOnHover:false,animateAddingMarkers:true,maxClusterRadius:10});
	
	var featureLayer = L.mapbox.featureLayer()
    .loadURL('/LaBande/api')
		.on('ready', initMarkers);
	
	function initMarkers() {
		featureLayer.eachLayer(function(marker) {
			marker.off('click');
			marker.on('click', function() {
				//slideToUid(marker.feature.properties.uid);
				//location.hash = "#" + marker.feature.properties.hash;
				History.pushState({uid:marker.feature.properties.uid, hash:marker.feature.properties.hash}, marker.feature.properties.title , marker.feature.properties.uid);
			});
			marker.setIcon(L.icon(marker.feature.properties.icon));
			marker.bindLabel(marker.feature.properties.title, {className:'map-etiquette'})
			marker.addTo(markers);
		});
	}
	
	History.Adapter.bind(window,'statechange',function(){
		var State = History.getState();
		slideToUid(State.data.uid)
		//submenu.slideMenu(State.data.hash);
	});
	
	
	function slideToUid(uid) {
		var slide = $('.swiper-slide:not(".duplicate")[data-uid="'+uid+'"]');
		//submenu.swiper.slideTo(slide.index(), 1000, false);
	}
	
	markers.on('clusterclick', function (a) {
		a.layer.spiderfy();
	});
	
	map.addLayer(markers);
		
});


/* Brigthness
---------------------------------------------- */
jQuery.fn.brightness = function() {
  var bg_color, rgba, y;
  bg_color = this.css('background-color');
  if ((bg_color != null) && bg_color.length) {
    rgba = bg_color.match(/^rgb(?:a)?\(([0-9]{1,3}),\s([0-9]{1,3}),\s([0-9]{1,3})(?:,\s)?([0-9]{1,3})?\)$/);
    if (rgba != null) {
      if (rgba[4] === '0') {
        if (this.parent().length) return this.parent().brightness();
      } else {
        y = 2.99 * rgba[1] + 5.87 * rgba[2] + 1.14 * rgba[3];
        if (y >= 1275) {
          return 'light';
        } else {
          return 'dark';
        }
      }
    }
  } else {
    if (this.parent().length) return this.parent().brightness();
  }
};