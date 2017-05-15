/*
 ---------------------------------------------------------------
    Библиотеки/плагины используемые в проекте:

    - plugin

 ---------------------------------------------------------------
*/

var myModule = (function() {

	// кешируем элементы
	var $list = $('.js-select-list');


	// Инициализируем запуск всех необходимых фукций
	var init = function() {


		// svg4everybody({}); // Плагин для работы svg иконок в разных браузерах

		//-----------------------
		_scrollPage();
		// _maxHeightBlockMobile();

	};
	//-------------------------------------------------------------------

	// Показываем/Скрываем селект
  //-------------------------------------------------------------------
	function _scrollPage() {
		$("body").on('click', '[href*="#"]', function(e){
      var fixed_offset = 0;
      $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 600);
      e.preventDefault();
    });
	};
  //-------------------------------------------------------------------

  function _maxHeightBlockMobile() {

  	setHeight($('.style-tip'));

  	function setHeight(block) {
	    $(block).css({
	        height: $(window).height() + 'px'
	    });
		}

  }
	


	return {
		init: init
	}

})();

myModule.init();