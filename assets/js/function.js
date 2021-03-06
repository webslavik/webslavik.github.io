/*
 ---------------------------------------------------------------
    Библиотеки/плагины используемые в проекте:

    - plugin

 ---------------------------------------------------------------
*/

var myModule = (function() {

	// кешируем элементы
	var $window = $(window),
			$pageWrap = $('.page-wrap'),
			$content = $('.js-content'),
			$navigation = $('.js-navigation'),
			$hamburger = $('.js-hamburger');


	// Инициализируем запуск всех необходимых фукций
	var init = function() {


		svg4everybody({}); 
		//-----------------------
		_showMenu();
		_actionHamburger();
		// _preloader();
	};
	//-------------------------------------------------------------------

	// Show|Hide Menu
  //-------------------------------------------------------------------
	function _showMenu() {
		$hamburger.on('click', function() {
			$(this).toggleClass('is-active');
			$content.toggleClass('is-move');
			$navigation.toggleClass('is-move');
		});

		$content.on('click', function() {
			$(this).removeClass('is-move');
			$navigation.removeClass('is-move');
			$hamburger.removeClass('is-active');
		});

		// $('.js-hamburger-section').on('mouseover', function() {
		// 	if(!($content.hasClass('is-move')))
		// 			$hamburger.addClass('is-hide');
				
		// 	// $hamburger.removeClass('is-hide');
		// });

		// $('.js-hamburger-section').on('mouseout', function() {
		// 	$hamburger.addClass('is-hide');
		// });
	}
  //-------------------------------------------------------------------

  // Show|Hide Hamburger when scroll page
  //-------------------------------------------------------------------
	function _actionHamburger() {

		var i = $(this).scrollTop();
		$pageWrap.scroll(function() {

			var wScroll = $(this).scrollTop();

			if ( wScroll > i ) {
				i = wScroll;

				if(!($content.hasClass('is-move')))
					$hamburger.addClass('is-hide');
		
			} else if ( wScroll < i ){
				i = wScroll;
				$hamburger.removeClass('is-hide');
			}
			
		});
		
	}
  //-------------------------------------------------------------------

	// Preloader
  //-------------------------------------------------------------------
	function _preloader() {
		var $preloader = $('.js-preloader');

		$window.on('load', function() {
			$preloader.fadeOut();
		});
		
	}
  //-------------------------------------------------------------------



	return {
		init: init
	};

})();

myModule.init();