


//----------------------------------------------
//                FUNCTIONS
//----------------------------------------------

$(document).ready(function(){


  /* MENUS
  -------------------------------------------- */

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
        //childs.clone().appendTo(parent).clone().prependTo(parent);
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
            if (direction == 'right'){
              var toMove = item.clickedIndex-listLength;
              parent.find('li').slice(0, toMove).appendTo(parent);
              item.slideTo(listLength, 0, false);
              item.update();
            } else if (direction == 'left'){
              var toMove = item.clickedIndex-listLength;
              var total = parent.find('li').length;
              parent.find('li:last-child').prependTo(parent);
              item.slideTo(listLength, 0, false);
              item.update();
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

  // bonne direction et sens inverse + lien avec la colonne

  menu.item.on("slideChangeStart",function(){
    slideMenu(menu.item, submenu.item);
  }); 
  submenu.item.on("slideChangeStart",function(){
    slideMenu(submenu.item, menu.item);
  }); 

  var slideMenu = function($this, $that){
    if($this == menu.item) { var data1 = "data-id", data2 = "data-parent", otherElem = $('#submenu') };
    if ($this == submenu.item) { var data1 = "data-parent", data2 = "data-id", otherElem = $('#menu') };

    var clicked = $this.slides[$this.activeIndex].getAttribute(data1);
    console.log(clicked);
    if (otherElem.find('.active').attr(data2) != clicked){
      nextEl = otherElem.find('.active').nextAll('['+data2+'='+clicked+']').index();
      if (nextEl == -1){
        if($this == menu.item){ 
          nextEl = otherElem.find('.active').prevAll('['+data2+'='+clicked+'][data-num=1]').index();
        } else {
          nextEl = otherElem.find('.active').prevAll('['+data2+'='+clicked+']').index();
        }
      }
      console.log(nextEl);
      $that.slideTo(nextEl, 1000, false); 
      $this.update();
      $that.update();
    };
  };

  var slideContent = function(argument) {

  }

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
  
  /* Map
  ---------------------------------------------- */
  L.mapbox.accessToken = 'pk.eyJ1IjoicGllcnJlcGllcnJlcGllcnJlIiwiYSI6IkdXdE5CRFEifQ.3zLbKVYfHituW8BVU-bl5g';
  var map = L.mapbox.map('map', 'pierrepierrepierre.301b5f73');

  map.featureLayer.on('click', function(e) {
      map.panTo(e.layer.getLatLng());
  });

});

