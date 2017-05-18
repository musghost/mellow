'use strict';

var projects = [
  {
    twitter: 'https://twitter.com/',
    facebook: 'https://facebook.com',
    instagram: 'https://www.instagram.com/',
    url: 'allgo.mx',
    title: 'Allgo',
    subTitle: 'A mellow company',
    image: 'images/projects/screen/allgo.png',
    text: [
      "At Mellow we invest in ideas, we consult and advise early stage companies, develop software and create brand identities. We take your business seriously, and ourselves not to seriously."
    ],
    list: [
      "Brand identity",
      "Website design",
      "iOS / Android app",
      "Development",
      "Social Media"
    ]
  }
];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

(function($) {
  $(function() {

    if(getParameterByName('jobs') === 'true') {
      $('#curtain, #jobs').addClass('show');
      $('#fullpage').css('opacity', 0);
      $('body').css('overflow', 'hidden');
    }

    var setMessage = function(index) {
      switch(index) {
        case 1:
          changeTarget('Mellow Consulting');
          $('#menu').addClass('hidden');
          $('header').addClass('colored');
           $('#made').removeClass('hidden');
          break;
        //case 2:
          //changeTarget('Our structure');
          //break;
        case 2:
          changeTarget('Our services');
           $('#made').removeClass('hidden');
          break;
        case 3:
          changeTarget('Portfolio');
          $('#menu').addClass('hidden');
          $('#made').addClass('hidden');
          break;
        //case 5:
          //changeTarget('Our team');
        case 4:
          changeTarget("Let's talk");
           $('#made').removeClass('hidden');
          break;
      }

      if (index != 1 && index != 3) {
        $('#menu').removeClass('hidden');
        $('header').removeClass('colored');
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

    if (window.innerWidth >= 769){
      $('#fullpage').fullpage({
        anchors: ['secmain', 'secservices', 'secprojects', //'secteam', 
        'seccontact'],
        menu: '#menu',
        scrollingSpeed: 700,
        onSlideLeave: function (anchorLink, index, slideIndex, direction) {
          console.log(anchorLink, index, slideIndex, direction);
        },
        onLeave: function(index, nextIndex, direction) {
          $(".menu").fadeOut();

          setMessage(nextIndex);
        }
      });
    } else {
      $('#main + .section').remove();
      $('#our-structure').removeClass('static-content').addClass('section').insertAfter('#main');
    }

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

    $('.control-prev')
      .jcarouselControl({
        target: '-=1'
      });

    $('.control-next')
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

  $('.first').affix({
    offset: {
      top: function() {
        return $('#main').outerHeight(true);
      },
      bottom: function() {
        return $('#main').outerHeight(true) + $('#our-services').outerHeight(true);
      }
    }
  });

  var descriptions = $('.job-description');
  var applications = $('.job-application');

  $('.job').each(function(i, job) {
    $(job).click(function(e) {
      descriptions.removeClass('show');
      applications.removeClass('show');
      descriptions.eq(i).addClass('show');
    });
  });

  /*$('.apply').each(function(i, apply) {
    $(apply).click(function(e) {
      descriptions.removeClass('show');
      applications.addClass('show');
    });
  });*/

  $('.close-jobs').click(function(){
    $('#curtain, #jobs').removeClass('show');
    $('#fullpage').css('opacity', 1);
    $('body').css('overflow', 'inherit');
  });

  $('.work').click(function(){
    $(".menu").fadeOut(function() {
      $('#curtain, #jobs').addClass('show');
    });
  });

  $('.open-project').click(function(e) {
    e.preventDefault();
    var projectId = $(this).data('project');
    var template = $('#modal').html();
    console.log(template);
    Mustache.parse(template);

    var rendered = Mustache.render(template, projects[projectId]);
    $('#target-modal').html(rendered);
    $('#curtain').addClass('show');
    $('#project').show();

    $('#project').find('.close-button').click(function(e) {
      e.preventDefault();
      $('#curtain').removeClass('show');
      $('#project').hide();
    });
  });

})(jQuery);
