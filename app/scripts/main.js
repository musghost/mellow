'use strict';
(function($) {
  $(function() {

    var setMessage = function(index) {
      switch(index) {
        case 1:
          changeTarget('Mellow Holding');
          $('#menu').addClass('hidden');
          break;
        case 2:
          changeTarget('Our structure');
          break;
        case 3:
          changeTarget('Our services');
          break;
        case 4:
          changeTarget('Portfolio');
          $('#menu').addClass('hidden');
          break;
        case 5:
          changeTarget('Our team');
          break;
        case 6:
          changeTarget("Let's talk");
          break;
      }

      if (index != 1 && index != 4) {
        $('#menu').removeClass('hidden');
      }
    }

    var changeTarget = function(msg) {
      $('#target').html(msg);
    };

    $("#show-menu").click(function(e) {
      $(".menu").fadeIn();
    });
    $("#close-menu").click(function(e) {
      $(".menu").fadeOut();
    });

    $('#toggle-contact').click(function() {
      $('.contact-carousel').toggleClass('active');
      $(this).toggleClass('active');
    });

    $('#fullpage').fullpage({
      anchors: ['secmain', 'secstructure', 'secservices', 'secprojects', 'secteam', 'seccontact'],
      menu: '#menu',
      scrollingSpeed: 700,
      onSlideLeave: function (anchorLink, index, slideIndex, direction) {
        console.log(anchorLink, index, slideIndex, direction);
      },
      onLeave: function(index, nextIndex, direction) {
        $(".menu").fadeOut();

        if (nextIndex == 2) {
          if (index == 3){
            setTimeout(function() {
              $('#our-structure').show();
            }, 300);
          } else {
            $('#our-structure').show();
          }
        }

        if (index == 2) {
          $('#our-structure').hide();
        }

        setMessage(nextIndex);
      }
    });

    var jcarousel = $('.jcarousel');

    jcarousel
      .on('jcarousel:reload jcarousel:create', function () {
        var carousel = $(this),
          width = carousel.innerWidth();

        if (width >= 600) {
            width = width / 4;
        } else if (width >= 350) {
            width = width / 3;
        }

        carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
      })
      .jcarousel({
        wrap: 'circular'
      });

    $('.jcarousel-control-prev')
      .jcarouselControl({
        target: '-=1'
      });

    $('.jcarousel-control-next')
      .jcarouselControl({
        target: '+=1'
      });

    $('.jcarousel-pagination')
      .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
      })
      .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
      })
      .on('click', function(e) {
        e.preventDefault();
      })
      .jcarouselPagination({
        perPage: 1,
        item: function(page) {
          return '<a href="#' + page + '">' + page + '</a>';
        }
      });
  });
  console.log($('#main').outerHeight(true));
  console.log($('#our-structure').outerHeight(true));
  $('.first').affix({
    offset: {
      top: function() {
        return $('#main').outerHeight(true);
      },
      bottom: function() {
        return $('#main').outerHeight(true) + $('#our-structure').outerHeight(true);
      }
    }
  });
})(jQuery);
