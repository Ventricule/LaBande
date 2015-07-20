
var siteFolder = "/LaBande";

$(document).ready(function(){

	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


	var winH = $(window).height(), menuL = $("#menu>li:not(#search-slide)").length, oldH = 0;
	var swiping = false, splash, scrolling = false, lastScrollTop = 0, topId = $('main .item').first().attr('data-uid'), oldId = topId, autoUpdateMap=false, scrollTimer, searching = false, fullscreen	 = false;

	var menu = new Bande($('#bande1'));

	var activeRubrique = $('#menu>li:first-child').attr('data-uid'), activeItem = $('main#column #content').find('li.item.active').attr('data-uid');
	var nextRubrique = activeRubrique, nextItem = activeItem, oldItem, direction = 'next';
	var slideShouldUpdateView = { menu:true, content:true };

	$('.cacheTop').css('background-color', $('main li.item:first-child').css('background-color'));
	$('.cacheBottom').css('background-color', $('main li.item:last-child').css('background-color'));

	
	if (location.search) {
		uid = location.search.substr(1);
		setTimeout(function() {
			slideColumnTo(uid);
			updateView("content", uid, 'next');
			History.pushState({}, "", "?"+uid);
			console.log(uid);
		}, 500);
	}
  
	//----------------------------------------------
	//                GRAND ORDONATEUR
	//----------------------------------------------
	function updateView(part, uid, direction, stateChange) {
		direction = typeof direction !== 'undefined' ?  direction : 'next';
		stateChange = typeof stateChange !== 'undefined' ?  stateChange : false;

		

		switch(part) {
			case 'menu':
					itemUid = $('.swiper-slide:not(".duplicate")[data-parent-uid="'+uid+'"]').attr('data-uid'); 
					slideColumnTo("titre-"+uid);
					slideMapTo(itemUid);
					History.pushState({}, "La Bande", "?titre-"+uid);
				break;
			case 'content':
					rubriqueUid = $('#content .item[data-uid="'+uid+'"]').attr('data-parent-uid');
					slideMenuTo(rubriqueUid, direction);
					slideMapTo(uid, autoUpdateMap);
					History.pushState({}, "La Bande", "?"+uid);
				break;
			case 'map':
					rubriqueUid = $('#content .item[data-uid="'+uid+'"]').attr('data-parent-uid');
					slideMenuTo(rubriqueUid, direction);
					slideColumnTo(uid);
					History.pushState({}, "La Bande", "?"+uid);
				break;
		} 
	}
	
	function slideMenuTo(uid, direction) {
		var activeRubrique = menu.container.find('.swiper-slide.active').attr('data-uid');
		if ( uid != activeRubrique ) {
			if(direction=='prev') {
				var slide = menu.container.find('.swiper-slide.active').prevAll('.swiper-slide[data-uid="'+uid+'"]').first();
			} else {
				var slide = menu.container.find('.swiper-slide.active').nextAll('.swiper-slide[data-uid="'+uid+'"]').first();
			}
			slideShouldUpdateView["menu"]=false;
			menu.swiper.slideTo( slide.index(), 1000 );
		}
	}
	function slideColumnTo(uid) {
		var item = $("main li.item[data-uid='"+uid+"']");
		if(item.length && slideShouldUpdateView["content"]){
			slideShouldUpdateView["content"]=false;
			$('html,body').animate({scrollTop: item.offset().top + 1},1200, function() { 
				slideShouldUpdateView["content"]=true;
			});
		} else if (item.length && slideShouldUpdateView["content"] == false){
			slideShouldUpdateView["content"]=false;
			$('html,body').stop().animate({scrollTop: item.offset().top + 1},1200, function() { 
				slideShouldUpdateView["content"]=true;
			});
		};
	}
	function slideMapTo(uid, zoom){
		zoom = typeof zoom !== 'undefined' ?  zoom : false;
		var rubrique = $('main#column #content').find('li.item.active').attr('data-parent-uid');
		selectMarkers(rubrique, uid, zoom);
	}
	

	// Catch url changement
	History.Adapter.bind(window,'statechange',function(){

	});
	
	
	//----------------------------------------------
	//                Menu
	//----------------------------------------------

	function Bande(container, type) {
		this.container = container;
		var parent = container.find('ul'), childs = container.find('ul > li'), listLength = childs.length;

		this.listLength = listLength;
		this.swiper = new Swiper(container, {
			onInit: function(swiper){

				// set #menu elements heights (padding) if elements.height is less than windows.height
				$('#menu').find('li:not(.duplicate):not(#search-slide)').each( function(){
					oldH += $(this).height();
				});
				var pad = Math.ceil((winH - 45 - oldH)/(menuL*2));
				if (pad > 0){
					$("#menu>li:not(#search-slide)").css('padding-top', pad+1).css('padding-bottom', pad+1)
				};

				if (listLength <= 5){
					childs.clone().appendTo(parent);
				};
				direction = 'next';
				setTimeout(function(){ swiper.update(true);}, 300);
			},
			initialSlide: 1,
			slidesPerView: 'auto',
			slideToClickedSlide: true,
			mousewheelControl: true,
			direction: 'vertical',
			speed: 500,
			resistanceRatio : 0.8,
			loop: true,
			loopedSlides: listLength,
			slideActiveClass: 'active',
			slideDuplicateClass: 'duplicate',
			prevButton: '.swiper-button-prev',
			runCallbacksOnInit: false,	
			onSlideChangeStart: function(swiper){
				var direction, prevSlide, nextSlide;
				
				prevSlide = $(swiper.wrapper).find('.active');
				swiper.update();
				nextSlide = $(swiper.wrapper).find('.active');
				nextSlideUid = nextSlide.attr('data-uid');

				if (nextSlide.hasClass('search')){
					$('#searchbox').addClass('shown').find('input').focus();
					$('#content').addClass('searching');
					searching = true;
				};
				
				var direction = prevSlide.index() > nextSlide.index() ? 'prev' : 'next' ;
				
				var part = swiper.container.children('ul').attr('id');
				
				// check if it should update view
				if (slideShouldUpdateView[part]) {
					updateView(part, nextSlideUid, direction);
				}
				slideShouldUpdateView[part] = true;
			},
			onTransitionEnd: function(swiper){
				var activeSlide = swiper.container.find('.active');
				swiper.slideTo( parseInt(activeSlide.attr('data-swiper-slide-index'))+listLength, 0, false);
				swiper.update();
			}
		});
		
	};


	/*	Content scroll
	-------------------------------------------- */
	$(document).scroll(function(e) {
		//scroll direction
		var scrollTop = getItemAtTop().offset().top;
		var direction = scrollTop > lastScrollTop ? "next" : "prev";
		lastScrollTop = scrollTop;
		// updateView if it should
		var activeItem = getItemAtTop().attr('data-uid');
		if (activeItem != oldItem) {
			if(slideShouldUpdateView["content"]){
				updateView("content", getItemAtTop().attr('data-uid'), direction);
			}
		}
		oldItem = activeItem;
	});
	
	// Get first element visible
	var getItemAtTop = function () {
		var itemAtTop;
		$('main .item').removeClass('active').each(function() {
			if ( $(this).offset().top > $(window).scrollTop() - parseInt($(this).height() - 50 ) ) {
				$(this).addClass('active');
				var $this = $(this);
				itemAtTop = $this;
				return false; // stops the iteration after the first one on screen
			}
		});
		return itemAtTop;
	}
	getItemAtTop();
		
	

	
	
	
	
	
	/* -------------------------------------------- */
	/*			Map
	/* -------------------------------------------- */

	/* Init
	---------------------------------------------- */
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2FtdWVscm0iLCJhIjoicVJuNV9YMCJ9.7Bol-cHVhp6d_l-lVhPpew';
	var map = L.mapbox.map('map', 'samuelrm.3e35d3f6', { zoomControl: false, attributionControl: false });
	new L.Control.Zoom({ position: 'topright' }).addTo(map);
	map.setView([48.87,2.4], 13);
	
	// Ver de terre
	var labande = [[2.356138229370117,48.89832705920586],[2.37030029296875,48.89866560720992],[2.3703861236572266,48.89762174349946],[2.374334335327148,48.89756531781301],[2.375063896179199,48.89863739496384],[2.381715774536133,48.898750243852646],[2.3833465576171875,48.89615465495109],[2.384033203125,48.89612644128778],[2.3854494094848633,48.89745246624902],[2.3894834518432617,48.897424253318206],[2.3909854888916016,48.897283188425355],[2.3924875259399414,48.89691641784082],[2.3932600021362305,48.89731140143576],[2.3957920074462886,48.89748067916391],[2.397465705871582,48.894602879823296],[2.3986244201660156,48.89053982224059],[2.395534515380859,48.88969331034916],[2.396392822265625,48.88749231235858],[2.3967790603637695,48.88512189848095],[2.3969936370849605,48.8838237670766],[2.3977231979370113,48.883033583636895],[2.3993539810180664,48.88275137223991],[2.4005126953125,48.882553823314474],[2.4007701873779297,48.881735398025],[2.4002981185913086,48.8812838473048],[2.4001264572143555,48.880775847871554],[2.4018430709838867,48.87874379854197],[2.402658462524414,48.87840511562753],[2.405233383178711,48.87792531090653],[2.4060916900634766,48.877755966965],[2.4065637588500977,48.87741727736203],[2.4079370498657227,48.874792355184326],[2.4085378646850586,48.87312701056584],[2.4090957641601562,48.8678201189718],[2.40875244140625,48.86448891012796],[2.4102115631103516,48.855849318434906],[2.4114561080932617,48.84918508531922],[2.411069869995117,48.847067028875536],[2.409052848815918,48.847236476688]] ;
	labande.forEach(function(point){
		point.reverse(); 
	});
	
	/* Appearance
	---------------------------------------------- */
	
	// Couleurs du ver
	var colors = ['#FFE138', '#45FF7A', '#FF6A45', '#8ABBFF', '#3C1E1E'];
	
	var ver = new L.FeatureGroup();
	map.addLayer(ver);
	
	// Dessin du ver
	/*var stroke = L.polyline(labande, {
		color: '#ddd',
		lineCap: 'butt',
		opacity: 1,
		weight:18
	}).addTo(ver);*/
	colors.forEach(function(color, index) {
		dashSize = 20;
		iteration = index;
		dash = iteration*dashSize;
		space = colors.length * dashSize - dash ;
		var dashArray = [space, dash];
		var line = new L.polyline(labande, {
			color: color,
			dashArray: dashArray,
			lineCap: 'butt',
			opacity: 1,
			weight:15
		}).addTo(ver);
	});
	
	// Hide/Show place name depending on zoom
	map.on('zoomend', function() {
		$("#map").removeClass('showPlaceName');
		if(map.getZoom()>=14){
			$("#map").addClass('showPlaceName');
		}
	});

	/* Markers
	---------------------------------------------- */
	// Load markers from GeoJSON
	var featureLayer = L.mapbox.featureLayer()
	.loadURL('/LaBande/api')
		.on('ready', initMarkers);
	
	// Init Markers
	function initMarkers() {
		featureLayer.eachLayer(function(marker) {
			marker.off('click');
			marker.on('click', function() {
				if ( $('main').hasClass('fullWidth') ) {
					fullWidth();
					setTimeout(function() { updateView('map', marker.feature.properties.uid, 'next'); }, 400);
				} else {
					updateView('map', marker.feature.properties.uid, 'next');
				}
				slideMapTo(marker.feature.properties.uid, false);
			});
			marker.setIcon(L.divIcon(marker.feature.properties.divIcon));
			marker.bindLabel('<span class="map-etiquette-date">'+marker.feature.properties.date+'</span> '+marker.feature.properties.title, {className:'map-etiquette', clickable:1});
			marker.addTo(markers);
		});
	}
	
	// Create clusters
	var markers = new L.MarkerClusterGroup({ 
		iconCreateFunction: function(cluster) {
			var markers = cluster.getAllChildMarkers();
			var lieux = [];
			for (var i = 0; i < markers.length; i++) {
				lieux.push( markers[i].feature.properties.lieuName );
			}
			var lieu = mode(lieux);
			return new L.DivIcon({ 
				className:"clusterIcon", 
				html: '<b>' + cluster.getChildCount() + '</b><div class="cluster-icon-lieu"><span>'+lieu+'</span></div>' 
			})
		},
		zoomToBoundsOnClick:false,
		showCoverageOnHover:false,
		animateAddingMarkers:true,
		maxClusterRadius:10,
		title:'titre'
	});
	map.addLayer(markers);
	
	/* Markers animations
	---------------------------------------------- */
	
	// Clusters click
	markers.on('clusterclick', function (a) {
		a.layer.spiderfy();
	});
	
	// Select markers by property=>value and fitBounds
	function selectMarkers(property, value, zoom) {
		var arrayOfLatLngs = [], color;
		markers.eachLayer(function(layer) {
			if(''+property+'' in layer.feature.properties) {
				var key = layer.feature.properties[property];
				if (key.constructor === Array) {
					if (layer.feature.properties[property].indexOf(value)!== -1) {
						var coordinates = layer.feature.properties.location	 ;
						arrayOfLatLngs.push(toLatLng(coordinates));
						spiderfyCluster(layer)
						selectMarker(layer);
						color = "#"+layer.feature.properties.color;
					} else {
						deselectMarker(layer);
					}
				} else {
					if (layer.feature.properties[property] == value) {
						var coordinates = layer.feature.properties.location	 ;
						arrayOfLatLngs.push(toLatLng(coordinates));
						spiderfyCluster(layer)
						selectMarker(layer);
					} else {
						deselectMarker(layer);
					}
				}
			}
		});
		if(arrayOfLatLngs.length && zoom) {
			//var maxZoom = zoom ? 15 : map.getZoom();
			var bounds = new L.LatLngBounds(arrayOfLatLngs);
			map.fitBounds(bounds, {padding:[50,50], maxZoom:15});
		} else if (zoom) {
			map.setView([48.87,2.4], 13);
		}
		if(property=='parcours'){
			path = uniqBy(arrayOfLatLngs, JSON.stringify);
	  color = $('#bande1 li[data-uid="parcours"]').css('background-color');
			if (path.length>1) {
				drawRoute( arrayOfLatLngs, color );
			} else {
				removeRoute();
			}
		} else {
			removeRoute();
		}
	}
	
	// Select/Deselect a marker
	function selectMarker(marker) {
		icon = marker.feature.properties.divIcon;
		icon.className = "div-icon selected";
		marker.setIcon(L.divIcon(icon));
	marker.showLabel();
	}
	function deselectMarker(marker) {
		icon = marker.feature.properties.divIcon;
		icon.className = "div-icon";
		marker.setIcon(L.divIcon(icon));
	marker.hideLabel();
	}
	
	// Spiderfy a markerCluster
	function spiderfyCluster(marker) {
		var markerCluster = markers.getVisibleParent(marker);
		if (markerCluster instanceof L.MarkerCluster){
			markerCluster.spiderfy();
		}
	}
	
	/* Locate
	----------------------------------------------- */
  var lc = L.control.locate({
	position: 'topright',
	follow: true,
	setView: false,
	keepCurrentZoomLevel: true,
	onLocationOutsideMapBounds:  function(context) { // called when outside map boundaries
	//var bounds = markers;
	//bounds.push(lc);
	//map.fitBounds(bounds, {padding:[50,50], maxZoom:15});
  },
	icon: 'locate-button icon-target',
	iconLoading: 'locate-button animate-spin icon-target',
  }).addTo(map);
	
	/*map.on('startfollowing', function(e) { 
		var bounds = labande;
		var markerLocation = [e.latitude, e.longitude];
		bounds.push(markerLocation);
		map.fitBounds(bounds, {padding:[20,20], maxZoom:15});
	}, lc);*/
	
	
	/* Direction
	----------------------------------------------- */
	var routeColor = "#000000";
	
	var directions = L.Routing.control({
		waypoints: [],
		createMarker: function(waypointIndex, waypoint, numberOfWaypoints) {
		},
		routeLine: function(route, options) { 
			return L.Routing.line(route, {
				styles:
					[
						{color: 'black', opacity: 0.1, weight: 9}, //sombra
						{color: 'white', opacity: 0.9, weight: 6}, // Contorno
						{color: routeColor, opacity: 1, weight: 4} // Centro
					] 
				});
		},
		autoroute: false,
		show: false,
		router: L.Routing.graphHopper('2dfa30e1-ef46-454f-872c-b1c7f7c30bdc', { urlParameters: {locale:'fr', vehicle:'foot'}})
	}).addTo(map);
	
	function drawRoute(waypoints, color) {
		routeColor = color;
		waypoints.length>1 ? directions.setWaypoints(waypoints) : false;
	}
	function removeRoute() {
		directions._clearLine();
	}

	function toLatLng(waypoint) {
		return L.latLng(waypoint.split(','));
	}

	$('.mapGPS').click(function() {
		var $this = $(this);
		$this.addClass('icon-cog animate-spin');
		lc.start();
		var destination = $(this).attr('data-coordinates');
		map.once('locationfound', function(e) { 
			drawRoute([ L.latLng([e.latitude, e.longitude]), toLatLng( destination ) ], '#FF6A45')
			$this.removeClass('icon-cog animate-spin');
		}, lc);
	});
	
	
	
	
	/* -------------------------------------------- */
	/*			Panneau
	/* -------------------------------------------- */
	
	/* Shortcuts
	---------------------------------------------- */

	function fullWidth() {
		if (isMobile || $(window).width() <= 800){
			$('#map, nav, main, .shadow, .cache').toggleClass('fullWidth');
		}
	}
	$('.mapLink, #fwButton').click(function() {
		if($(this).hasClass('mapLink')){
			$('#fwButton').css('background-color', $(this).css('color'));
		}
		fullWidth();
	});
	
	$('span.scroll-button').click(function(){
		uid = $(this).attr('data-uid');
		slideColumnTo(uid);
		updateView("content", uid, 'next');
	})
	/* Image and slideshow
	---------------------------------------------- */
	var gallery = [];
	$('main section.gallery').each(function(){
		initSwiper($(this));
	});
	
	function initSwiper(gallery) {
		var $el = gallery, imgIndex = 0, total = $el.find('img').length;
		$el.find('.pagination .total').text(total)
		$el.find('figure').each(function(){
			imgIndex += 1;
			$(this).attr('data-index', imgIndex);
		});
		var thisSwiper = $el.swiper({
			mode:'horizontal',
			loop: true,
			speed: 500,
			slideActiveClass: 'activeImg',
			slideDuplicateClass: 'duplicateImg',
			nextButton: '.gallery img'
		});
		thisSwiper.on('slideChangeStart', function(){
			thisSwiper.update();
			var imgNumber = $el.find('figure.activeImg').attr('data-index')
			$el.find('.pagination .number').text(imgNumber);
		});
		$el.find('.prev-slide').on('click', function(){
			thisSwiper.slidePrev();
		});
		$el.find('.next-slide').on('click', function(){
			thisSwiper.slideNext();
		});
	}
	
	$('.nav.fullscreen').on("click", function(e){
		fullscreen = true;
		e.preventDefault();
		var s_total = $(this).parent().find('.pagination .total').text(), count = 0;
		$('#splashWrapper').html('');

		$(this).closest('li').find('figure').each(function(){
			$(this).clone().appendTo($('#splashWrapper'));
			count += 1;
		});
		$('#splash').find('img').each(function(){
			var img_src = $(this).attr('data-src');
			$(this).attr('src', img_src);
		});
		var rgbaCol = $(this).closest('.item').css('background-color').replace(')', ', 0.95)').replace('rgb', 'rgba');;
		$('#splash').css('background-color', rgbaCol ).addClass('shown');
		$('#splash figcaption, #splash .nav, #splashCross').css('text-shadow', '-1px -1px 10px '+rgbaCol+', 1px -1px 10px '+rgbaCol+', 1px 1px 10px '+rgbaCol+', -1px 1px 10px '+rgbaCol);
		$('#splash').find('.pagination .total').text(s_total)
		var s_number = $('#splashContainer').find('figure.activeImg').attr('data-index')
		$('#splashContainer').find('.pagination .number').text(s_number);
		if (count <= 1){
			$('#splash .nav').hide()
		} else {
			$('#splash figure').addClass('swipable')
			$('#splash .nav').show()
			splash = new Swiper('#splashContainer', {
				mode:'horizontal',
				loop: true,
				speed: 500,
				slideActiveClass: 'activeImg',
				slideDuplicateClass: 'duplicateImg',
				resistanceRatio : 0.9,
				keyboardControl: true,
				lazyLoading: true,
				initialSlide: parseInt(s_number, 10)-1,
				nextButton: '#splash .next-slide, #splash img',
				prevButton: '#splash .prev-slide',
			});
			splash.update();		
			splash.on('slideChangeStart', function(){
				splash.update();
				var s_number = $('#splashContainer').find('figure.activeImg').attr('data-index')
				$('#splashContainer').find('.pagination .number').text(s_number);
			});
		};
	});
	$('#splashCross').on("click", function(){
		$('#splash').removeClass('shown');
		setTimeout(function() {
			splash.destroy(true, true);
			splash=null;			
		}, 500);
		fullscreen = false;
	});


	/* keyboard
	---------------------------------------------- */
	$(document).keydown(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			if (fullscreen){
				$('#splashCross').click();
				fullscreen = false;
			}
			if (searching){
				$('#searchbox').removeClass('shown').find('input').blur();
				$('#content').removeClass('searching');
				searching = false;
			}
		}
	});



	/* Manifestations
	---------------------------------------------- */
	$('.manifestations-summary').each(function() {
		initManifestationsSummary( $(this) );
	});
	function initManifestationsSummary(summary) {
		summary.find('.full-text').slideUp(0);
		summary.find('.synth').click(function() {
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
				summary.find('.synth.open').removeClass('open').siblings('.full-text').slideUp('fast');
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
	}

	/* Lieux
	---------------------------------------------- */
	$('.foldable').click(function() {
		$(this).siblings().children().hide();
		$(this).children().show();
	});
	
	/* ShowOnMap
	---------------------------------------------- */
	$('.mapFit').click(function(){
		var type = $(this).attr('data-type');
		var uid = $(this).attr('data-uid');
		if(type && uid){
			selectMarkers(type, uid, true);
		}
	});
  
  /* Search
  ---------------------------------------------- */
	
	$('#search-slide>.icon-search').click(function(){
		if ($(this).parent().hasClass('active') && !searching){
			$('#searchbox').addClass('shown').find('input').focus();
			$('#content').addClass('searching');
			searching = true;
		};
	});

  var count = -1;
  $(".navbar-search").on('keyup change', function(ev) {
	
	// pull in the new value
	var searchTerm = $(this).val();
	
	if (ev.keyCode == 13 && searchTerm) {
	  $('.search-nav a.search-next').click();
	} else {
	  count = -1;
	  $('#content').unhighlight();
	  // disable highlighting if empty
	  if ( searchTerm ) {
		// highlight the new term
		$('#content p:visible, #content h1:visible, #content h2:visible, #content h3:visible, #content h4:visible').highlight( searchTerm );
		var total = $('.highlight').length;
		if(total == 0) {
		  $('.search-compteur').hide();
		  $('#searchbox .search-next').hide();
		  $('#searchbox .search-prev').hide();
		  $('#searchbox .search-infos').html('Pas de résultats').show();
		}
		if(total>0) {
		  $('.search-nav a.search-next').click();
		  $('#searchbox .search-infos').hide();
		}
		if(total>1) {
		  $('.search-compteur').show();
		  $('#searchbox .search-next').show();
		  $('#searchbox .search-prev').show();
		}
	  } else {
		$('.search-compteur').hide();
	  }
	}
  });

  $('.search-nav a').click(function(e) {
	e.preventDefault();
	
	var total = $('.highlight').length;
	
	if ($(this).hasClass('search-prev')) {    
	  count = count - 1;
	  if(count<0) { count = total-1 }
	} else {
	  count = ( count + 1 ) % total;
	}
	
	$('.search-compteur .current').html(count + 1);
	$('.search-compteur .total').html(total);
	$('.highlight').removeClass('highlight-more');
	$('.highlight').eq(count).addClass('highlight-more');
	if( total>0 ) {
	  scrollToElement( $('.highlight').eq(count), 200, -150);
	}
	
  });
  
	function scrollToElement(selector, time, verticalOffset) {
		time = typeof (time) != 'undefined' ? time : 500;
		verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
		element = $(selector);
		offset = element.offset();
		offsetTop = offset.top + verticalOffset;
		$('html, body').animate({
			scrollTop: offsetTop
		}, time);
	}
	$(document).click(function(event) { 
		if(!$(event.target).closest('#searchbox, #search-slide').length) {
			if(searching) {
				$('#searchbox').removeClass('shown').find('input').blur();
				$('#content').removeClass('searching');
				searching = false;
			}
		}
	})
	
	/* Archives
  ---------------------------------------------- */
	$('.load-archives').click(function() {
		var section = $(this).attr('data-parent-uid');
		var $this = $(this);
		if ($this.hasClass('open')) {
			$this.removeClass('open');
			$('li.archive-title[data-parent-uid="'+section+'"]').hide();
			$('li.item.past[data-parent-uid="'+section+'"]').remove();
			$this.siblings('.text').slideUp(300);
		} else {
			$this.addClass('open');
			$('li.archive-title[data-parent-uid="'+section+'"]').show();
			$('li.item.past[data-parent-uid="'+section+'"]').remove();
			$this.siblings('.text').slideDown(300, function() {
				$('html,body').stop(false, false).animate({
					'scrollTop': $this.offset().top - 20
				}, {
					duration: 310,
					queue: false
				});
			});
		}
		
	});

	$(document).on('click', '#content .archive-title', function(e) {
		e.preventDefault();
		var $this = $(this);
		var uri = $(this).attr('data-uri');
		var section = $(this).attr('data-parent-uid');
		$.ajax({
			url: 'ajax/' + uri ,
			success : function(response) { 
				$('li.item.past[data-parent-uid="'+section+'"]').slideUp(300, function() { $(this).remove() });
				$('li.archive-title[data-parent-uid="'+section+'"]').slideDown(0);
				$this.hide(0);
				var newItem = $(response).hide().insertAfter($this).slideDown(300, function() {
					$('html,body').stop(false, false).animate({
						'scrollTop': newItem.offset().top
					}, {
						duration: 500,
						queue: false
					});
				});
				
				initSwiper( newItem.find('section.gallery') );
				initManifestationsSummary( newItem.find('.manifestations-summary') )
			}
		});
	});
	
	
	
}); // END OF JQUERY







/* -------------------------------------------- */
/*			UTILITIES
/* -------------------------------------------- */

/* Mode
/* value that appears most often in a set of data
/* usefull to choose a title for a marker cluster
---------------------------------------------- */
function mode(array)
{
	if(array.length == 0)
		return null;
	var modeMap = {};
	var maxEl = array[0], maxCount = 1;
	for(var i = 0; i < array.length; i++)
	{
		var el = array[i];
		if(modeMap[el] == null)
			modeMap[el] = 1;
		else
			modeMap[el]++;	
		if(modeMap[el] > maxCount)
		{
			maxEl = el;
			maxCount = modeMap[el];
		}
	}
	return maxEl;
}


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

/* Scroll end
---------------------------------------------- */
$.fn.scrollEnd = function(callback, timeout) {          
  $(this).scroll(function(){
	var $this = $(this);
	if ($this.data('scrollTimeout')) {
	  clearTimeout($this.data('scrollTimeout'));
	}
	$this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

/* Uniq
---------------------------------------------- */
function uniqBy(a, key) {
	var seen = {};
	return a.filter(function(item) {
		var k = key(item);
		return seen.hasOwnProperty(k) ? false : (seen[k] = true);
	})
}