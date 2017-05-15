/*
 ---------------------------------------------------------------
    Библиотеки/плагины используемые в проекте:

    - Remodal (https://github.com/VodkaBears/Remodal)

 ---------------------------------------------------------------
*/

var myModule = (function() {



	// Инициализируем запуск всех необходимых фукций
	var init = function() {


		// svg4everybody({}); // Плагин для работы svg иконок в разных браузерах

		//-----------------------
		_activeFormField();
		_counterPizza();
		_stickOrderLine();

	};
	//-------------------------------------------------------------------


	// При активном состоянии поля формы
  //-------------------------------------------------------------------
	function _activeFormField() {

		var $form = $('#modalOrderForm'),
				$field = $form.find('.js-modal-order-field');

		$field.on('focus', function() {
			$(this).addClass('is-active');
		});

		$field.on('blur', function() {
			$(this).removeClass('is-active');
		});

	};
  //-------------------------------------------------------------------
	
	
	// Счетчики
  //-------------------------------------------------------------------
	function _counterPizza() {

		var $pizzaItem = $('.js-pizza-item'),
				$minus = $pizzaItem.find('.js-item-count-minus'),
				$plus = $pizzaItem.find('.js-item-count-plus');


		// Для элементов на странице
		//------------------------------------------------
		$minus.on('click', function() {
			var $input = $(this).parent().find('input');
		  var count = parseInt($input.val()) - 1;
		  count = count < 1 ? 0 : count;
		  $input.val(count);
		  $input.change();
		  return false;
		});

		$plus.on('click', function() {
			var $input = $(this).parent().find('input');
		  $input.val(parseInt($input.val()) + 1);
		  $input.change();
		  return false;
		});
	};
  //-------------------------------------------------------------------


	// Линия заказа прилипает к верху
  //-------------------------------------------------------------------
	function _stickOrderLine() {

		$(".js-order-line").stick_in_parent();

	};
  //-------------------------------------------------------------------



	return {
		init: init
	}

})();

myModule.init();