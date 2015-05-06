
var siteFolder = "/LaBande";

$(document).ready(function(){

	var winH = $(window).height(), menuL = $("#menu>li").length, oldH = 0;

	var swiping = false, scrolling = false, lastScrollTop = 0, topId = $('main .item').first().attr('data-uid'), oldId = topId;
	var menu = new Bande($('#bande1'));
	var submenu = new Bande($('#bande2'));
	var activebox = new Bande($('#bande3'));

	var activeRubrique = $('#menu>li:first-child').attr('data-uid'), activeItem = $('#submenu>li:first-child').attr('data-uid');
	var nextRubrique = activeRubrique, nextItem = activeItem, oldItem, direction = 'next';
	
	var slideShouldUpdateView = { menu:true, submenu:true, content:true };
	
	$('main .item').first().addClass('active');
	
	//----------------------------------------------
	//                GRAND ORDONATEUR
	//----------------------------------------------
	function updateView(part, uid, direction, stateChange) {
		direction = typeof direction !== 'undefined' ?  direction : 'next';
		stateChange = typeof stateChange !== 'undefined' ?  stateChange : false;
		switch(part) {
	case 'menu':
		//slideMenuTo(uid, direction);
				itemUid = $('.swiper-slide:not(".duplicate")[data-parent-uid="'+uid+'"]').attr('data-uid'); 
				slideSubMenuTo(itemUid, direction);
				slideColumnTo(itemUid);
				slideMapTo(itemUid);
		break;
	case 'submenu':
		//slideSubMenuTo(uid, direction);
				rubriqueUid = submenu.container.find('.swiper-slide[data-uid="'+uid+'"]').attr('data-parent-uid');
				slideMenuTo(rubriqueUid, direction);
				slideColumnTo(uid);
				slideMapTo(uid);
		break;
		case 'content':
		slideSubMenuTo(uid, direction);
				rubriqueUid = submenu.container.find('.swiper-slide[data-uid="'+uid+'"]').attr('data-parent-uid');
				slideMenuTo(rubriqueUid, direction);
				slideMapTo(uid);
		break;
		case 'map':
		slideSubMenuTo(uid, direction);
				rubriqueUid = submenu.container.find('.swiper-slide[data-uid="'+uid+'"]').attr('data-parent-uid');
				slideMenuTo(rubriqueUid, direction);
				slideColumnTo(uid);
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
	function slideSubMenuTo(uid, direction) {
		var activeTitle = submenu.container.find('.swiper-slide.active').attr('data-uid');
		if ( uid != activeTitle ) {
			if(direction=='prev') {
				var slide = submenu.container.find('.swiper-slide.active').prevAll('li[data-uid="'+uid+'"]').first();
			} else {
				var slide = submenu.container.find('.swiper-slide.active').nextAll('li[data-uid="'+uid+'"]').first();
			}
			slideShouldUpdateView["submenu"]=false;
			submenu.swiper.slideTo( slide.index(), 1000 );
		}
	}
	function slideColumnTo(uid) {
		var item = $("main li.item[data-uid='"+uid+"']");
		if(item.length && slideShouldUpdateView["content"]){
			slideShouldUpdateView["content"]=false;
			$('html,body').animate({scrollTop: item.offset().top + 1},750, function() { 
				setTimeout(function() { slideShouldUpdateView["content"]=true;  },1000);
			});
		};
	}
	function slideMapTo(uid, zoom){
		zoom = typeof zoom !== 'undefined' ?  zoom : true;
		var rubrique = submenu.container.find('.swiper-slide[data-uid="'+uid+'"]').attr('data-parent-uid');
		selectMarkers(rubrique, uid, zoom);
	}
	
	// Catch url changement
	History.Adapter.bind(window,'statechange',function(){
		var State = History.getState();
		//slideView(State.data.rubrique, State.data.item, State.data.slideDirection, true);
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
			},
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
			if ( $(this).offset().top > $(window).scrollTop() - parseInt($(this).height() - 10 ) ) {
				$(this).addClass('active');
				var $this = $(this);
				itemAtTop = $this;
				return false; // stops the iteration after the first one on screen
			}
		});
		return itemAtTop;
	}
	
	

	
	
	
	
	
	/* -------------------------------------------- */
	/*			Map
	/* -------------------------------------------- */

	/* Init
	---------------------------------------------- */
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2FtdWVscm0iLCJhIjoicVJuNV9YMCJ9.7Bol-cHVhp6d_l-lVhPpew';
	var map = L.mapbox.map('map', 'samuelrm.3e35d3f6', { zoomControl: false, attributionControl: false });
	new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
	map.setView([48.87,2.4], 12);
	
	// Ver de terre
	var labande = [[2.356138229370117,48.89832705920586],[2.37030029296875,48.89866560720992],[2.3703861236572266,48.89762174349946],[2.374334335327148,48.89756531781301],[2.375063896179199,48.89863739496384],[2.381715774536133,48.898750243852646],[2.3833465576171875,48.89615465495109],[2.384033203125,48.89612644128778],[2.3854494094848633,48.89745246624902],[2.3894834518432617,48.897424253318206],[2.3909854888916016,48.897283188425355],[2.3924875259399414,48.89691641784082],[2.3932600021362305,48.89731140143576],[2.3957920074462886,48.89748067916391],[2.397465705871582,48.894602879823296],[2.3986244201660156,48.89053982224059],[2.395534515380859,48.88969331034916],[2.396392822265625,48.88749231235858],[2.3967790603637695,48.88512189848095],[2.3969936370849605,48.8838237670766],[2.3977231979370113,48.883033583636895],[2.3993539810180664,48.88275137223991],[2.4005126953125,48.882553823314474],[2.4007701873779297,48.881735398025],[2.4002981185913086,48.8812838473048],[2.4001264572143555,48.880775847871554],[2.4018430709838867,48.87874379854197],[2.402658462524414,48.87840511562753],[2.405233383178711,48.87792531090653],[2.4060916900634766,48.877755966965],[2.4065637588500977,48.87741727736203],[2.4079370498657227,48.874792355184326],[2.4085378646850586,48.87312701056584],[2.4090957641601562,48.8678201189718],[2.40875244140625,48.86448891012796],[2.4102115631103516,48.855849318434906],[2.4114561080932617,48.84918508531922],[2.411069869995117,48.847067028875536],[2.409052848815918,48.847236476688]] ;
	labande.forEach(function(point){
		point.reverse(); 
	});
	
	/* Appearance
	---------------------------------------------- */
	
	// Couleurs du ver
	var colors = ['#FFE138', '#45FF7A', '#FF6A45', '#8ABBFF', '#3C1E1E'];
	
	// Dessin du ver
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
		var line = new L.polyline(labande, {
			color: color,
			dashArray: dashArray,
			lineCap: 'butt',
			opacity: 1,
			weight:15
		}).addTo(map);
		polyline.push(line);
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
				updateView('map', marker.feature.properties.uid, 'next');
				slideMapTo(marker.feature.properties.uid, false);
			});
			marker.setIcon(L.divIcon(marker.feature.properties.divIcon));
			marker.bindLabel(marker.feature.properties.title, {className:'map-etiquette'})
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
		var arrayOfLatLngs = [];
		markers.eachLayer(function(layer) {
			if(''+property+'' in layer.feature.properties) {
				var key = layer.feature.properties[property];
				if (key.constructor === Array) {
					if (layer.feature.properties[property].indexOf(value)!== -1) {
						arrayOfLatLngs.push(layer.getLatLng());
						spiderfyCluster(layer)
						selectMarker(layer);
					} else {
						deselectMarker(layer);
					}
				} else {
					if (layer.feature.properties[property] == value) {
						arrayOfLatLngs.push(layer.getLatLng());
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
			map.setView([48.87,2.4], 12);
		}
	}
	
	// Select/Deselect a marker
	function selectMarker(marker) {
		icon = marker.feature.properties.divIcon;
		icon.className = "div-icon selected";
		marker.setIcon(L.divIcon(icon));
	}
	function deselectMarker(marker) {
		icon = marker.feature.properties.divIcon;
		icon.className = "div-icon";
		marker.setIcon(L.divIcon(icon));
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
		position: 'bottomright',
		//follow: true,
		setView: false,
		keepCurrentZoomLevel: true,
		onLocationOutsideMapBounds:  function(context) { // called when outside map boundaries
			//var bounds = markers;
			//bounds.push(lc);
			console.log(context);
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
	var directions = L.Routing.control({
		waypoints: [],
		fitSelectedRoutes: false,
		router: L.Routing.graphHopper('2dfa30e1-ef46-454f-872c-b1c7f7c30bdc', { urlParameters: {locale:'fr', vehicle:'foot'}})
	}).addTo(map);
	
	directions.setWaypoints([ L.latLng([48.8755312,2.414216300000021]), L.latLng([48.847067028875536,2.411069869995117]) ])
	
	/*var directionsLayer = L.mapbox.directions.layer(directions)
		.addTo(map);

	var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
		.addTo(map);
	
	
	directions
				.setOrigin(L.latLng([48.8755312,2.414216300000021]))
				.setDestination(L.latLng([48.847067028875536,2.411069869995117]))
				//.setDestination(toLatLng( destination ))
				//.setWaypoints(L.latLng(''))
				.query();

	function toLatLng(waypoint) {
		return L.latLng(waypoint.split(','));
	}

	$('.button-gps').click(function() {
		lc.start();
		var destination = $(this).attr('data-coordinates');
		map.on('locationfound', function(e) { 
			console.log('from : '+[e.latitude, e.longitude]);
			console.log('to : '+destination);
			
			directions
				.setOrigin(L.latLng([e.latitude, e.longitude]))
				.setDestination(toLatLng( destination ))
				//.setWaypoints(L.latLng(''))
				.query();
		}, lc);
	});*/
	
	
	
	
	/* -------------------------------------------- */
	/*			Panneau
	/* -------------------------------------------- */
	
	/* Shortcuts
	---------------------------------------------- */
	$('#prev').click(function() {
		submenu.swiper.slidePrev(true, 600);
	});
	
	/* Image and slideshow
	---------------------------------------------- */



	var gallery = [];
	$('main').find('section.gallery').each(function(index){
		var $el = $(this), imgIndex = 0, total = $el.find('img').length;
		$el.find('.pagination .total').text(total)
		$el.find('figure').each(function(){
			imgIndex += 1;
			$(this).attr('data-index', imgIndex);
		});
		gallery[index] = $el.swiper({
			mode:'horizontal',
			loop: true,
			speed: 500,
			slideActiveClass: 'activeImg',
			slideDuplicateClass: 'duplicateImg',
		});
		gallery[index].on('slideChangeStart', function(){
			gallery[index].update();
			var imgNumber = $el.find('figure.activeImg').attr('data-index')
			$el.find('.pagination .number').text(imgNumber);
		});
		$el.find('.prev-slide').on('click', function(){
			gallery[index].slidePrev();
		});
		$el.find('.next-slide').on('click', function(){
			gallery[index].slideNext();
		});
	})
	

	$('.nav.icon-search').on("click", function(e){
		e.preventDefault();
		var s_total = $(this).parent().find('.pagination .total').text();
		$('#splashWrapper').html('');
		$(this).parent().find('figure').each(function(){
			var img_src = $(this).find('img').attr('data-src');
			$(this).clone().attr('src', img_src).appendTo($('#splashWrapper'));
		});
		$('#splash').find('img').each(function(){
			var img_src = $(this).attr('data-src');
			$(this).attr('src', img_src);
		});
		var rgbaCol = $(this).closest('.item').css('background-color').replace(')', ', 0.95)').replace('rgb', 'rgba');;
		$('#splash').css('background-color', rgbaCol ).addClass('shown');
		$('#splash figcaption').css('background-color', $(this).closest('.item').css('background-color') );
		$('#splash').find('.pagination .total').text(s_total)

		var splash = new Swiper('#splashContainer', {
			mode:'horizontal',
			loop: true,
			speed: 500,
			slideActiveClass: 'activeImg',
			slideDuplicateClass: 'duplicateImg',
			slideToClickedSlide: true,
			resistanceRatio : 0.9,
			keyboardControl: true,
			lazyLoading: true,
		});
		splash.update();		
		splash.on('slideChangeStart', function(){
			splash.update();
			var s_number = $('#splashContainer').find('figure.activeImg').attr('data-index')
			$('#splashContainer').find('.pagination .number').text(s_number);
		});
		$('#splashContainer').find('.prev-slide').on('click', function(){
			splash.slidePrev();
		});
		$('#splashContainer').find('.next-slide').on('click', function(){
			splash.slideNext();
		});
		$('#splash, #splashCross').on("click", function(e){
			$('#splash').removeClass('shown');
		});
		$('#splash *:not(#splashCross)').on("click", function(e){
			e.stopPropagation();
		});
		$(document).keydown(function(e) {
			if (e.keyCode == 27) { $('#splash').removeClass('shown'); }   // escape key maps to keycode `27`
		});
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
	
	/* Parcours
	---------------------------------------------- */
	$('.parcoursSelect').click(function(){
		selectMarkers('parcours', $(this).attr('data-parcours'));
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