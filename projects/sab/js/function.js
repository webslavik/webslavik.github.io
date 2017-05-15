/*
 ---------------------------------------------------------------
    Библиотеки/плагины используемые в проекте:

    - jQuery 2.2.4;
    - Slick Slider (http://kenwheeler.github.io/slick/);
    - Remodal (https://github.com/VodkaBears/Remodal) - модальное окно
    - jQuery Validation(https://jqueryvalidation.org/) - валидация форм
    - malihu scrollbar(https://github.com/malihu/malihu-custom-scrollbar-plugin)

 ---------------------------------------------------------------
*/



var myModule = (function() {

	// кешируем элементы
	var $window   = $(window),
      $pageWrap = $('.page-wrap');



  // Инициализируем запуск всех необходимых фукций
	function init() {

    _sliderNews();            // слайдер на Главной "Новости"
    _sliderParners();         // слайдер на Главной "Партнеры"
		_sliderProductsTop();     // верхний слайдер на ст. о Продукте
    _sliderProductsBottom();  // нижний слайдер на ст. о Продукте 

    //----------------------------------------------------
		_searchSite();            // "Поиск" по сайту

    _tabsOrderPage();         // Табы на страние "Как заказать"
    _tabsPersonalAccount();    // Табы на страние "Личный кабинет"
    _tabsIPandOOO();          // Табы для ИП и ООО

    //----------------------------------------------------


    //----------------------------------------------------
    _showMoreOrderDetails();  // кнопка "Показать параметры" для Элемента -  страница "Личный кабинет" - история заказов
    _showItemDetailBasket();  // кнопка "Показать параметры" для Элемента страница "Коризина"

    //----------------------------------------------------
    _openCatalog();           // pop-up Каталога
    _activeCatologFilter();   // фильтр на странице "Каталог"

    //------------------------------------------------------------
    _counterBasket();    // счетчик на страницах "Корзина"
    _counterProduct();   // счетчик на странице об Описании продукта
    _removeBasketItem(); // удаляем Элемент из списка на странице "Корзина"


    //-----------------------------------------------------------------
    _customSelect();     // стилизация Select с использованием плагина Selectric

    //-----------------------------------------------------------------
    _closeLoginModal();   // закрываем модальное окно
    _stepLoginModal();    // модальное окно "Логин"

    //---------------------------------------------------------------------
    _addMethodInValidator();      // добавляем новые методы в плагин валидации
    _customSettingsValidator();   // кастомные настройки для плагина
    _checkFormValid();            // валидация форм на страницах
    _checkEnterForm();            // вход в Аккаунт через модальное окно
    _checkLoginModalChangePass(); // валидация формы Логин Модальное окно -  "Изменить пароль" (ссылка "Забыли пароль?")
    _checkFormFirstStep()         // валидация формы Логин Модальное окно - "Шаг 1"
    _checkFormSecondStep();       // валидация формы Логин Модальное окно - "Шаг 2"
    _checkFooterForm();           // валидация формы в Футере(подписка)

    //--------------------------------------------------------------------
    _playVideo();  // видео 

    //--------------------------------------------------------------------
    _customScrollbarModal();  // кастомизируем скроллбар в модальных окнах страница О продукте


    //----------------------------------------------------
    _selectZipperItem();   // выбираем тим Молнии
    _selectProductItem();  // выбор Item на странице о Продукте

	};
	//-------------------------------------------------------------------

	// Слайдер "Новости" на Главной
  //-------------------------------------------------------------------
  function _sliderNews() {

  	// Функция подставляет ноль, есть число меньше 10.
  	// иначе дублируется много кода
  	//-----------------------------------
  	function _correctNumber(el, num) {
	  	if(num < 10) {
					el.text('0' + num + ' ');
				} else {
					el.text(num);
				}
		}

  	var $picList   = $('.js-slider-news-pic'),
  			$picLi     = $picList.children(),
  			$activePic = $picList.find('is-active'),
  			
  			$textList   = $('.js-slider-news-text'),
  			$textLi     = $textList.children(),
  			$activeText = $textList.find('is-active'),

  			// навигация, счетчик элементов
  			$nav   = $('.js-slider-nav'),
  			$prev  = $nav.children('.js-nav-left'),
  			$next  = $nav.children('.js-nav-right'),
  			$countWrap = $nav.children('.slider-nav__count-wrap'),
  			$numEl   = $countWrap.children('.slider-nav__how-much'),
  			$whichEl  = $countWrap.children('.slider-nav__what');

  	// узнаем кол-во элементов Изображений
  	// P.S. По хорошему необходимо проверять и ко-во элементов текста
  	var itemLength = $picList.children().length;

  	// показываем кол-во слайдов
  	_correctNumber($numEl, itemLength);


  	// по умолчанию отображаем первый элемент Изображения и Текста
  	$picList.children()
  					.first()
  					.addClass('is-active');
  	$textList.children()
  					.first()
  					.addClass('is-active');


  	$next.on('click', function() {
  		var $activePic = $picList.find('.is-active'),
  			  $nextPic	 = $activePic.next(),
  			  index      = $nextPic.index(),

  			  $activeText = $textList.find('.is-active'),
  			  $nextText   = $activeText.next();

  		$activePic.removeClass('is-active');
  		$nextPic.addClass('is-active');

  		$activeText.removeClass('is-active');
  		$nextText.addClass('is-active');


  		// отображаем в счетчике номер слайда
  		var num = index + 1; 
  		_correctNumber($whichEl, num);

			// когда долшли до последнего элемента
  		if(index == -1) {
  			$picLi.eq(0).addClass('is-active');
  			$textLi.eq(0).addClass('is-active');
  			_correctNumber($whichEl, 1);
  		}

  	});


  	$prev.on('click', function() {
  		var $activePic = $picList.find('.is-active'),
  			  $prevPic	= $activePic.prev(),
  			  index      = $prevPic.index(),

  			  $activeText = $textList.find('.is-active'),
  			  $prevText   = $activeText.prev();

  		$activePic.removeClass('is-active');
  		$prevPic.addClass('is-active');

  		$activeText.removeClass('is-active');
  		$prevText.addClass('is-active');


  		// отображаем в счетчике номер слайда
  		var num = index + 1; 
  		_correctNumber($whichEl, num);

  		// когда долшли до последнего элемента
  		if(index == -1) {
  			$picLi.eq(itemLength-1).addClass('is-active');
  			$textLi.eq(itemLength-1).addClass('is-active');
  			_correctNumber($whichEl, itemLength);
  		}
  	});
  };
  //-------------------------------------------------------------------


	// Слайдер "Партнеры" на главной
  //-------------------------------------------------------------------
  function _sliderParners() {

  	$('.js-partners-carousel-top').slick({
  		slidesToShow: 4,
		  slidesToScroll: 1,
      swipe: false,
		  prevArrow: '.js-partners-left',
		  nextArrow: '.js-partners-right'
  	});

  	$('.js-partners-carousel-bottom').slick({
  		slidesToShow: 4,
		  slidesToScroll: 1,
      swipe: false,
		  prevArrow: '.js-partners-left',
		  nextArrow: '.js-partners-right',
		  asNavFor: '.js-partners-carousel-top' // 
  	});
  };
	//-------------------------------------------------------------------


  // Верхний Слайдер "Партнеры" на главной
  //-------------------------------------------------------------------
  function _sliderProductsTop() {

    // Функция подставляет ноль, есть число меньше 10.
    //-----------------------------------
    function _correctNumber(el, num) {
      if(num < 10) {
          el.text('0' + num + ' ');
        } else {
          el.text(num);
      }
    }

    var $list      = $('.js-product-slider-list'),
        $li        = $list.children(),
        $activePic = $list.find('is-active'),
        
        // навигация, счетчик элементов
        $nav       = $('.js-product-slider-nav'),
        $prev      = $nav.children('.js-p-nav-left'),
        $next      = $nav.children('.js-p-nav-right'),
        $countWrap = $nav.children('.p-s__nav__count-wrap'),
        $numEl     = $countWrap.children('.p-s__nav__how-much'),
        $whichEl   = $countWrap.children('.p-s__nav__what');

    // узнаем кол-во элементов Изображений
    // P.S. По хорошему необходимо проверять и ко-во элементов текста
    var itemLength = $list.children().length;

    // показываем кол-во слайдов
    _correctNumber($numEl, itemLength);

    // по умолчанию отображаем первый элемент Изображения и Текста
    // $list.children()
    //         .first()
    //         .addClass('is-active');


    $next.on('click', function() {
      var $activePic = $list.find('.is-active'),
          $nextPic   = $activePic.next(),
          index      = $nextPic.index();

      $activePic.removeClass('is-active');
      $nextPic.addClass('is-active');
      // отображаем в счетчике номер слайда
      var num = index + 1; 
      _correctNumber($whichEl, num);
      // когда долшли до последнего элемента
      if(index == -1) {
        $li.eq(0).addClass('is-active');
        _correctNumber($whichEl, 1);
      }
    });


    $prev.on('click', function() {
      var $activePic = $list.find('.is-active'),
          $prevPic   = $activePic.prev(),
          index      = $prevPic.index();

      $activePic.removeClass('is-active');
      $prevPic.addClass('is-active');

      // отображаем в счетчике номер слайда
      var num = index + 1; 
      _correctNumber($whichEl, num);

      // когда долшли до последнего элемента
      if(index == -1) {
        $li.eq(itemLength-1).addClass('is-active');
        _correctNumber($whichEl, itemLength);
      }
      console.log('prev');
    });
  }
  //-------------------------------------------------------------------


  // нижний слайдер на ст. о Продукте 
  //-------------------------------------------------------------------
  function _sliderProductsBottom()  {

    $('.js-product-another-list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      swipe: false,
      prevArrow: '.js-product-another-left',
      nextArrow: '.js-product-another-right'
    });
  };
  //-------------------------------------------------------------------


	// "Поиск" по сайту
  //-------------------------------------------------------------------
  function _searchSite() {
  	var $searchBtn   = $('.js-seach-website'),
  			$search      = $('.js-search'),
  			$searchClose = $('.js-search-close'),
        $searchInput = $search.find('.search-input'),
        $searchHint  = $('.js-search-hint'),

        $content     = $('.content'),
        $footer      = $('.main-footer'),

        $catalog     = $('.js-catalog-popup');

  	$searchBtn.on('click', function(e) {
  		e.preventDefault();

  		$search.toggleClass('is-show');
      $searchInput.focus()
                  .val('');
      $searchHint.show();

      // хак: чтобы скрыть контент страницы
      $content.toggleClass('is-hide'); 
      $footer.toggleClass('is-hide');
      // if(!($content.hasClass('is-hide'))) {
      //   // continue;
      //   $content.addClass('is-hide');
      //   $footer.addClass('is-hide');
      // }

      $catalog.removeClass('is-show'); // скрываем "Каталог"

  	});

  	$searchClose.on('click', function() {
  		$search.removeClass('is-show');

      // хак: чтобы скрыть контент страницы
      $content.toggleClass('is-hide');
      $footer.toggleClass('is-hide');

  	});

    $searchInput.on('keyup', function() {
      if($(this).val() == 0) {
        $searchHint.show();
      } else {
        $searchHint.hide();
      }
    });

  };
  //-------------------------------------------------------------------


  // Каталог pop-up
  //-------------------------------------------------------------------
  function _openCatalog() {
    var $catalogBtn = $('.js-catalog-popup-btn'),
        $catalog    = $('.js-catalog-popup'),

        $content = $('.content'),
        $footer  = $('.main-footer');

        $search = $('.js-search');

    $catalogBtn .on('click', function(e) {
      e.preventDefault();
      $catalog.toggleClass('is-show');

      $content.toggleClass('is-hide');
      $footer.toggleClass('is-hide');

      $search.removeClass('is-show'); // скрываем "Поиск"

      // if(!($content.hasClass('is-hide'))) {
      //   // continue;
      //   $content.addClass('is-hide');
      //   $footer.addClass('is-hide');
      // }

    });

  };
  //-------------------------------------------------------------------


  // Табы на странице "Как заказать"
  //-------------------------------------------------------------------
  function _tabsOrderPage() {
    var $ul = $('.js-order-tabs'),
        $li = $ul.children(),
        $orderContent = $('.order-tab-content');


    $li.on('click', function() {

      var $this = $(this),
          tabId = $this.data('tab');

      $li.removeClass('is-active');
      $this.addClass('is-active');

      $orderContent.removeClass('is-show');
      $('#'+tabId).addClass('is-show');

    });

  };
  //-------------------------------------------------------------------


  // Табы "Личный кабинет" - "личные данные" и "история заказов"
  //-------------------------------------------------------------------
  function _tabsPersonalAccount() {
    var $tabsParent  = $('.js-persona-account-tabs');
        $tabs        = $tabsParent.children('.p-a__top-tabs-item'),
        $tabsContent = $('.p-a__section');

    $tabs.on('click', function() {
      var $this = $(this),
          tabId = $this.data('personal-account');

      $tabs.removeClass('is-active');
      $this.addClass('is-active');

      $tabsContent.removeClass('is-show');
      $(tabId).addClass('is-show');
    });
  };
  //-------------------------------------------------------------------


  // Табы  для ИП и ООО
  //-------------------------------------------------------------------
  function _tabsIPandOOO() {
    var $tabsDataWrap    = $('.js-io-ooo-tabs');
        $tabsData        = $tabsDataWrap.children('.ip-ooo-tabs-item'),
        $tabsDataContent = $('.form-content-wrap');

    $tabsData.on('click', function() {

      var $this = $(this),
          tabId = $this.data('personal-data');

      $tabsData.removeClass('is-active');
      $this.addClass('is-active');

      $tabsDataContent.removeClass('is-show');
      $(tabId).addClass('is-show');
    });
  };
  //-------------------------------------------------------------------


  // кнопка "Показать параметры"
  //-------------------------------------------------------------------
  function _showMoreOrderDetails() {
    var $li  = $('.p-a__p-h__o-i-d__item'),
        $btn = $li.find('.js-item-detail-btn');

    $btn.on('click', function() {

      var $this   = $(this);
          $parent = $this.parents('.p-a__p-h__o-i-d__item'),
          $more   = $parent.find('.js-p-a__o-i-t-more');

      $more.toggle(400);
    });
  };
  //-------------------------------------------------------------------

  // кнопка "Показать параметры" для Элемента на странице "Корзина"
  //-------------------------------------------------------------------
  function _showItemDetailBasket() {

    var $li  = $('.js-basket-item-in-list'),
        $btn = $li.find('.js-basket-item-detail-btn');

    $btn.on('click', function() {

      var $this   = $(this);
          $parent = $this.parents('.js-basket-item-in-list'),
          $more   = $parent.find('.js-basket-item-more');

      $more.toggle(400);

    });
  };
  //-------------------------------------------------------------------



  // фильтр на странице "Каталог"
  //-------------------------------------------------------------------
  function _activeCatologFilter() {
    var $filterItem = $('.js-c-f__item');

    // var test = $('.js-c-filter-list');

    // test.on('click', function(e) {
    //   e.stopPropagation();
    // });



    $filterItem.on('click', function(e) {
      e.stopPropagation();

      var $this          = $(this),
          $siblings      = $this.siblings(),
          $siblingsChild = $siblings.children('.js-c-filter-list'),
          $child         = $this.children('.js-c-filter-list');

      $siblings.removeClass('is-active');
      $siblingsChild.removeClass('is-show');

      if($this.hasClass('is-active')) {
        $this.removeClass('is-active');
        $child.removeClass('is-show');
      } else {
        $this.addClass('is-active');
        $child.addClass('is-show');
      }
      
    });
    
  };
  //-------------------------------------------------------------------


  // счетчик на странице "Корзина"
  //-------------------------------------------------------------------
  function _counterBasket() {

    // На странице "Корзина"
    //----------------------------------------------------
    $('.js-basket-count-minus').on('click', function() {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 5;
      count = count < 1 ? 0 : count;
      $input.val(count);
      $input.change();
      return false;
    });

    $('.js-basket-count-plus').on('click', function() {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 5);
      $input.change();
      return false;
    })


  
  };
  //-------------------------------------------------------------------


  // счетчик на странице об Описании продукта
  //-------------------------------------------------------------------
  function _counterProduct() {
    $('.js-product-count-minus').on('click', function() {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 5;
      count = count < 1 ? 0 : count;
      $input.val(count);
      $input.change();
      return false;
    });

    $('.js-product-count-plus').on('click', function() {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 5);
      $input.change();
      return false;
    })
  }
  //-------------------------------------------------------------------



  // удаляем Элемент из списка в "Корзине"
  //-------------------------------------------------------------------
  function _removeBasketItem() {
    var $ul        = $('.js-basket-item-list'),
        $removeBtn = $('.js-basket-cross');

    $removeBtn.on('click', function() {
      var $this           = $(this),
          $parent         = $this.parents('.b-i-l__item');
      $parent.remove();
    });
  };
  //-------------------------------------------------------------------


  // стилизация Select с использованием плагина Selectric
  //-------------------------------------------------------------------
  function _customSelect() {
    $('.js-select-login').selectric();
  };
  //-------------------------------------------------------------------



  // #####################################################################
  //  Модальное окно "Логин"
  // #####################################################################

  // закрытие модального окна
  //-------------------------------------------------------------------
  function _closeLoginModal() {
    $(document).on('closed', '.remodal', function (e) {
      var $modal = $('.login-modal');
      $modal.removeClass('is-show')
            .eq(0)
            .addClass('is-show');
    });
  };
  //-------------------------------------------------------------------


  // модальное окно в "Логин"
  // !!! Необходимо оптимизировать код
  //-------------------------------------------------------------------
  function _stepLoginModal()  {
    var $modal          = $('.login-modal'),
        $forgotPass     = $modal.find('.js-login-modal-forgot'), // ссылка "Забыли пароль?"
        $regBtn         = $modal.find('.js-login-modal-reg-btn'), // кнопка "Регистрация"
        $forwardBtn     = $modal.find('.js-login-modal-forward'), // кнопка "Далее"
        $regEndBtn      = $modal.find('.js-ligin-modal-regEnd'), // кнопка "Зарегистрироваться"

        $formFirstStep  = $('#formFirstStep'); // форма Первый шаг в регистрации
        $formSecondStep = $('#formSecondStep'); // форма Второй шаг в регистрации

    $forgotPass.on('click', function(e) {
      e.preventDefault();
      var $this        = $(this),
          $parent      = $this.closest($modal),
          $parentIndex = $parent.index();

      $parent.removeClass('is-show');
      $modal.eq(1).addClass('is-show');

    });

    $regBtn.on('click', function(e) {
      e.preventDefault();
      var $this        = $(this),
          $parent      = $this.closest($modal),
          $parentIndex = $parent.index();

      $parent.removeClass('is-show');
      $modal.eq(2).addClass('is-show');

    });

    $forwardBtn.on('click', function(e) {
      e.preventDefault();
      var $this        = $(this),
          $parent      = $this.closest($modal),
          $parentIndex = $parent.index();

      if($formFirstStep.valid()) {
        $parent.removeClass('is-show');
        $modal.eq(3).addClass('is-show');
      } 
    });

    $regEndBtn.on('click', function(e) {
      e.preventDefault();
      var $this        = $(this),
          $parent      = $this.closest($modal),
          $parentIndex = $parent.index();

      if($formSecondStep.valid()) {
        $parent.removeClass('is-show');
        $modal.eq(4).addClass('is-show');
      } 
    });

  }; 
  //-------------------------------------------------------------------



  // #####################################################################
  //  ФОРМЫ 
  // #####################################################################

  // кастомные методы для плагина валидации
  //-------------------------------------------------------------------
  function _addMethodInValidator() {
    // только буквы
    $.validator.addMethod( "lettersonly", function( value, element ) {
      return this.optional( element ) || /^[а-яА-Я\s]+$/i.test( value );
    }, "Letters only please" );

    // только цифры
    $.validator.addMethod( "integer", function( value, element ) {
      // return this.optional( element ) || /^-?\d+$/.test( value );
      return this.optional( element ) || /^[\d\s\-]+$/.test( value );
    }, "A positive or negative non-decimal number please" );

    // кастомная почта
    $.validator.addMethod( "customEmail", function( value, element ) {
      // return this.optional( element ) || /^-?\d+$/.test( value );
      return this.optional( element ) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test( value );
    }, "Email error" );
  }
  //-------------------------------------------------------------------


  // сообщения об ошибках в валидации
  //-------------------------------------------------------------------
  function _customSettingsValidator() {
     $.validator.setDefaults({
      // errorClass: 'input-error-message',
      highlight: function(element) {
        $(element)
          .closest('.form-field')
          .addClass('is-error');
        $(element)
          .parents('.js-form-page')
          .find('.f-b__error-message')
          .addClass('is-show');
      },
      unhighlight: function(element) {
        $(element)
          .closest('.form-field')
          .removeClass('is-error');
        // $(element)
        //   .parents('#mainForm')
        //   .find('.f-b__error-message')
        //   .removeClass('is-show');
      }
    });
  };
  //-------------------------------------------------------------------

  // валидация форм на Страницах
  //-------------------------------------------------------------------
  function _checkFormValid() {
    var $form = $('.js-form-page');

    $form.validate({

      // ignore: '.ignore',

      rules: {

        // Имя
        name: {
          required: true,
          lettersonly: true
        },

        // ИНН
        identification: {
          required: true,
          minlength: 10,
          maxlength: 12,
          digits: true
        },

         // Корреспондентский счёт
        correspondent: {
          required: true,
          minlength: 20,
          maxlength: 20,
          digits: true
        },

        // Телефон
        phone: {
          required: true,
          digits: true
        },

        // Свидетельство регистрации
        registration: {
          required: true,
        },

        // БИК
        bankIdentification: {
          required: true,
          minlength: 9,
          maxlength: 9,
          digits: true
        },

        // Почта
        email: {
          required: true,
          customEmail: true
        },

        // Наим. обслуживающего банка
        bank: {
          required: true,
        },
        
        // Расчётный счёт
        settlementAccount: {
          required: true,
          minlength: 20,
          maxlength: 20,
          digits: true
        },


        // Название организации
        nameOrganization: {
          required: true,
        },

        // КПП
        kpp: {
          // required: true,
        },


        //-------------------------------------
        // Пароль
        password: "required",
        repeatPassword: {
          required: true,
          equalTo: '#password'
        },

      }
    });

  }
  //-------------------------------------------------------------------


  //  вход в Аккаунт через модальное окно
  //-------------------------------------------------------------------
  function _checkEnterForm() {
    var $enterForm = $('#formEnter');

    $enterForm.validate({
      rules: {
        // Почта
        email: {
          required: true,
          customEmail: true
        },
        // Пароль
        password: 'required'
      }
    });
  };
  //-------------------------------------------------------------------


  // валидация формы Логин Модальное окно -  "Изменить пароль" (ссылка "Забыли пароль?")
  //----------------------------------------------------------------------------------------
  function _checkLoginModalChangePass() {
    var $formChangePass = $('#formModalChangePass');
    $formChangePass.validate({
      rules: {
        // Почта
        emailTest: {
          required: true,
          customEmail: true
        }
      }
    });
  };
  //-------------------------------------------------------------------


  // валидация формы Логин Модальное окно - "Шаг 1"
  //-------------------------------------------------------------------
  function _checkFormFirstStep() {
    var $formChangePass = $('#formFirstStep');

    $formChangePass.validate({
      rules: {
         // Имя
        name: {
          required: true,
          lettersonly: true
        },
        // Почта
        email: {
          required: true,
          customEmail: true
        },
        // Пароль
        password: "required",
        password2: {
          required: true,
          equalTo: '#passwordFirsStep'
        }
      }
    });

  };
  //-------------------------------------------------------------------

  // валидация формы Логин Модальное окно - "Шаг 2"
  //-------------------------------------------------------------------
  function _checkFormSecondStep() {
    var validator = $('#formSecondStep').validate();

    // validator.element('#fname');
    
  };
  //-------------------------------------------------------------------


  // валидация формы в Футере(подписка)
  //-------------------------------------------------------------------
  function _checkFooterForm() {
    var $footerForm = $('#footerForm'),
        $input      = $footerForm.find('.footer-form__input'),
        $btn        = $footerForm.find('.js-footer-form-btn'),
        // $formWrap   = $('.js-footer-form'),

        $fieldWrap  = $('.footer-form__field-wrap'),
        $formSubscr = $('.js-complete-subscr');

    $input.on('focus', function() {
      $(this).addClass('is-active');
      $btn.addClass('is-active');
    });

    $input.on('blur', function() {
      if($(this).val() == 0) {
        $(this).removeClass('is-active');
        $btn.removeClass('is-active');
      }
    });

    // вилидация
    $footerForm.validate({

      // onkeyup: function() {
      //   $input.addClass('is-invalid');
      // },

      rules: {
        email: {
          required: true,
          customEmail: true
        }
      }
    });

    // при успешной валидации скрываем форму и 
    // показываем другой блок
    $btn.on('click', function() {
      if($footerForm.valid()) {

        
        // $footerForm.on('submit', function(e) {
        //   e.preventDefault();
        // });
        $fieldWrap.hide();
        $formSubscr.show();
      } 
    });    
  };
  //-------------------------------------------------------------------
  



  // #####################################################################
  //  ВИДЕО
  // #####################################################################

  // Воспроизведение видео на странице "Глареея - Видео" 
  //-------------------------------------------------------------
  function _playVideo() {

    var $mainVideo      = $('.js-main-video'),
        $mainVideoThumb = $('.js-main-video-thumb'),

        // страница "О компании"
        $aboutVideo1      = $('.js-about-video-1'),
        $aboutVideoThumb1 = $('.js-about-video-thumb-1'),
        $aboutVideo2      = $('.js-about-video-2'),
        $aboutVideoThumb2 = $('.js-about-video-thumb-2');


    _play($mainVideo, $mainVideoThumb);

    _play($aboutVideo1, $aboutVideoThumb1);
    _play($aboutVideo2, $aboutVideoThumb2);



    function _play(video, thumb) {
      var $videoThumb = thumb,
          $video      = video,
          $flexVideo  = $video.children('.flex-video');

      $videoThumb.on('click', function(e) {
        e.preventDefault();
        
        var $this = $(this),
            videoURL = $this.data('video');
        
        $this.toggleClass('is-hidden');
        
        $flexVideo.html('<iframe width="100%" height="100%" src="//www.youtube.com/embed/'+videoURL+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
        
        $video.toggleClass('is-visible');
      });
    }
  };
  //-------------------------------------------------------------



  // #####################################################################
  //  СКРОЛЛБАР
  // #####################################################################

  // кастомизируем скроллбар в модальных окнах страница О продукте
  //-------------------------------------------------------------
  function _customScrollbarModal() {
    var $scrollbar = $('.js-custom-scrollbar');

    $scrollbar.mCustomScrollbar({
      theme:"light",
      scrollEasing:"linear",
      timeout: 0,
      scrollInertia: 300
    });

  }
  //-------------------------------------------------------------



  // #####################################################################
  //  Выбор элементов на странице о Продукте
  // #####################################################################

  // выбор Item в модальном окне на странице о Продукте
  //-------------------------------------------------------------  
  function _selectZipperItem() {

    var $zipperList = $('.js-zipper-list'),
        $checkbox   = $zipperList.find('.z-c__ziper-input');

        $zipperBtn = $('.z-p__button-wrap').children('.p-m__form-button');

    $checkbox.on('click', function(e) {
      var $this = $(this),
          // родитель
          $parent = $this.closest('.z-c__zipper-item'),
          $parentSiblingsCheckbox = $parent.siblings().find('.z-c__ziper-input');
    
      // убираем checked у остальных
      $parentSiblingsCheckbox.attr('checked', false);

      // отображение кнопки "Выбрать"
      if($this.is(':checked')) {
        $zipperBtn.addClass('is-active');
      } else {
        $zipperBtn.removeClass('is-active');
      }
    });
  };
  //-------------------------------------------------------------


 
  // выбираем Item на странице о Продукте
  //-------------------------------------------------------------
  function _selectProductItem() {

    var objBraid = {
      list: '.js-braid-type-list',
      item: '.c-b__b-t-l__item',
      checkbox: '.c-b__b-t-l__item-input',
      siblingImg: '.c-b__b-t-l__item-pic',
      select: '.js-selected-braid',
      textSel: 'Выберите цвет тесьмы'
    };

    var objButton = {
      list: '.js-metal-color-list',
      item: '.m-c__m-c-l__item',
      checkbox: '.m-c__m-c-l__item-input',
      siblingImg: '.m-c__m-c-l__item-pic',
      select: '.js-selected-button-color',
      textSel: 'Выберите цвет'
    };

    _showSelectedItem(objBraid);
    _showSelectedItem(objButton);


    // показывает выбранный Item, его артикль и кнопку
    //---------------------------------------------------
    function _showSelectedItem(obj) {

      var $list = $(obj.list), // список всех item
          $li        = $list.children(obj.item), // item
          $checkbox  = $list.find(obj.checkbox), // чекбокс

          // куда всталять изображение и текст
          $selected     = $(obj.select), // поле для вставки изобр. и артикля
          $selectedImg  = $selected.find('img'),
          $selectedText = $selected.children('.t-l__select-text'), // текст
          $selectedTextArticle = $selected.children('.t-l__article'), // артикль

          // кнопка(появляется при выбранном элементе)
          $btn = $selected.siblings('.p-m__button-wrap').children('.p-m__form-button');

      var textSelect = obj.textSel;
      var textFind   = 'Вы выбрали';
      var noSelectImg = 'not-selected.svg';
      var defaultImg = '';

      $checkbox.on('click', function(e) {
        var $this = $(this),
            // родитель
            $parent = $this.closest(obj.item),
            $parentSiblingsCheckbox = $parent.siblings().find(obj.checkbox),
            // братья
            $siblingsImg = $this.siblings(obj.siblingImg).find('img');

        var imgSrc = $siblingsImg.attr('src');

        // находим артикль 
        var dot = imgSrc.lastIndexOf('.'); // точка в конце строки
        var slash = imgSrc.lastIndexOf('/'); // последний слэш
        var article = imgSrc.substring(slash+1, dot); // вырезаем из строки артикль

        // иконка "По умолчанию"
        defaultImg = imgSrc.substring(0, slash+1) + noSelectImg;

        // убираем checked у остальных
        $parentSiblingsCheckbox.attr('checked', false);

        // поле для выбранного
        $selectedImg.attr('src', imgSrc);
        $selectedText.text(textFind);
        $selectedTextArticle.text(article);

        // делаем кнопку активной

        if($this.is(':checked')) {
          $btn.addClass('is-active');
          $selectedImg.attr('src', imgSrc);
          $selectedText.text(textFind);
          $selectedTextArticle.text(article);
        } else {
          $btn.removeClass('is-active');
          $selectedImg.attr('src', defaultImg);
          $selectedText.text(textSelect);
          $selectedTextArticle.text('');
        }
      });
    };

  };
  //-------------------------------------------------------------

 


  // Точка выхода
  //-------------------------------------------------------------------
	return {
		init: init
	}

})();

myModule.init();




// Инициализируем Google Maps
//-------------------------------------------------------------------
function initMap() {

  var map;

  var coordinates = new google.maps.LatLng(55.778525, 37.672250);


  var mapOptions = {
    center: coordinates,
    zoom: 17,
    // disableDefaultUI: true // отключить интерфейс полностью
  };

  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  var marker = new google.maps.Marker({
    position: coordinates,
    icon: 'http://voxweb.ru/projects/sab/img/png/na-kartu.png'
  });

  marker.setMap(map);
} 