/*
 ---------------------------------------------------------------
    Библиотеки/плагины используемые в проекте:

    - jQuery 2.2.4;
    - jquery.fitvids (http://fitvidsjs.com/);
    - scrollreveal - для анимации;
    - jquery-mask-plugin - маски для формы;
    - jquery-animateNumber - анимация цифр;
    - jquery.easing - плагин для плавной аниации цифр;

 ---------------------------------------------------------------
*/



var myModule = (function() {

	// cache DOM




	var init = function() {
		_fitVids(); // flex video
		_reviewsSlider();
		_buyClickBrn(); // scroll
		_psychTest(); 
		_finalTest();
		_formValidation();
		_maskForm();
		_animationScrollReveal(); // page animation
		_preloader();
	};



	// Адаптивное видео
	//-------------------------------------
	function _fitVids() {
		$('.video-container').fitVids();
	};
	//-------------------------------------


	// Слайдер в отзывах
	//-------------------------------------
	function _reviewsSlider() {
		var $dots    		= $('.js-reviews-dots').find('span'),
			$fotos   		= $('.js-reviews-fotos').find('li'),
			$descr   		= $('.js-reviews-descr-list').find('li'),
			destroyInterval;

		// var trigger = false;

		$dots.on('click', function() {
			var $this     = $(this),
				$siblings = $this.siblings(),
				index     = $this.index();

			// добавляем / убираем активный класс у Дота
			$siblings.removeClass('is-active');
			$this.addClass('is-active');

			// добавляем / убираем активный класс у Фото
			$fotos.removeClass('is-active')
				  .eq(index)
				  .addClass('is-active');

			// добавляем / убираем активный класс у Описания
			$descr.removeClass('is-active')
				  .eq(index)
				  .addClass('is-active');

		});


		// Авто переключение
		destroyInterval = setInterval(_autoSlide, 4000);

		function _autoSlide() {

			var $activeDot  = $dots.siblings('.is-active'), // ищем активный дот
                $nextDot    = $activeDot.next(), // элемент который следует за ним
                indexActive = $activeDot.index(), // для проверки

                $nextFoto   = $fotos.siblings('.is-active').next(),

                $nextDescr  = $descr.siblings('.is-active').next();
                


            $dots.removeClass('is-active');
            $nextDot.addClass('is-active');

            $fotos.removeClass('is-active');
            $nextFoto.addClass('is-active');

            $descr.removeClass('is-active');
            $nextDescr.addClass('is-active');

            // делаем проверку и начинаем слайдить сначала
            if(indexActive == ($dots.length - 1)) {
            	$dots.eq(0).addClass('is-active')
            	$fotos.eq(0).addClass('is-active')
            	$descr.eq(0).addClass('is-active')
            };
		};


		// останавливаем/запускаем слайдер
		$('.riviews__reviews-list').hover(_desctoySlider, _createSlider);

		function _desctoySlider() {
			clearInterval(destroyInterval);
		}

		function _createSlider() {
			destroyInterval = setInterval(_autoSlide, 4000);
		}

		
	};
	//-----------------------------------------------------------------------


	// Психологический тест
	//-----------------------------------------------------------------------
	function _psychTest() {

		var $buttons       = $('.js-psych-question-btn'),
			$list          = $('.psych-question-list'),
			$psychListItem = $list.find('li'),

			counter      = 1,
			$questionNum = $('.question-number__what'),
			$howMuch     = $('.question-number__how-much'),

			// блоки
			$blockQuestion = $('.psych-test__psych-question'),
			$blockResult   = $('.psych-test__result'),
			$tryAgain      = $('.js-psych-test-btn'),

			// подстчет теста и стили для процентов
			$resultTitle    = $('.test-result__title-list').children(), // список заголовков Результата
			$resultText     = $('.test-result__text-list').children(), // список вариантов текста к Результату
			// $resultTitle    = $('.js-result-title'), // заголовок Результата(старый)
			$testPercentage = $('.js-test-percentage'),


			countPercentage = 0, // проценты правильных ответов
			countAnswer     = 0; // счетчик правильных ответов


		// показываем кол-во вопросов
		if($psychListItem.length < 10) {
			$howMuch.text('0' + $psychListItem.length);
		} else {
			$howMuch.text($psychListItem.length);
		}


		// по умолчанию активен первый вопрос
		$psychListItem.eq(0).addClass('is-active');



		// вешаем клик на кнопки
		$buttons.on('click', 'button', _checkQuestion);
		function _checkQuestion() {

			var $this = $(this);

			if($this.hasClass('js-psych-button-Yes')) {
				countAnswer++;
				countPercentage += (100 / $psychListItem.length); // 100% делим на кол-во вопросов
			}

			counter++;

			// плюс к пройденному вопросу
			if(counter < 10) {
				$questionNum.text('0' + counter);
			} else {
				$questionNum.text(counter);
			}

			// переключаем вопрос
			$psychListItem.removeClass('is-active')
					 .eq(counter - 1)
					 .addClass('is-active');


			
			// Выводим результат теста при соответствующем условии
			if(counter > $psychListItem.length ) {
				counter = 1;


				// сбрасываем счетчик пройденныйх вопросов и 
				// делаем активным первый вопрос
				$questionNum.text('0' + counter);
				$psychListItem.eq(0).addClass('is-active');

				// выводим результат теста
				$blockQuestion.hide();
				$blockResult.show();

				// вызываем фунткцию которая задает цвет процентам и текст в заголовке
				_testResultData();
				_psychNumbersColor(countAnswer, $resultTitle, $testPercentage);
				$testPercentage.text(Math.ceil(countPercentage)); // округляем число и выводим его

				// анимация для Процентов
				$testPercentage.animateNumber({
					number: Math.ceil(countPercentage),

					easing: 'easeInQuad'
				}, 3000);

			


				countAnswer = 0; // сбрасываем 
				countPercentage = 0; 
				
			} 
		};

		// В зависимости от количества "Да" на вопросы
		// выводим необходимый заголовок и текст
		function _testResultData() {
			if(countAnswer == 0 ) {
				$resultTitle.eq(0).show();
				$resultText.eq(0).show();
			} else if(0 < countAnswer && countAnswer < 8) {
				$resultTitle.eq(1).show();
				$resultText.eq(1).show();
			} else if(7 < countAnswer && countAnswer < 12) {
				$resultTitle.eq(2).show();
				$resultText.eq(2).show();
			} else if(countAnswer == 12){
				$resultTitle.eq(3).show();
				$resultText.eq(3).show();
			}
		};

		function _psychNumbersColor(countAnswer, resultTitle, testPercentage) {
			if(countAnswer >= 0 && countAnswer <= 4 ) {
				testPercentage.removeClass('average-result good-result')
							   .addClass('bad-result');
			} else if(countAnswer >= 5 && countAnswer <= 8 ) {
				testPercentage.removeClass('bad-result good-result')
							   .addClass('average-result');
			} else if(countAnswer >= 9 && countAnswer <= 12 ) {
				testPercentage.removeClass('average-result bad-result')
							   .addClass('good-result');
			}
		};


		// кнопка "Try Again"
		//---------------------------------------
		$tryAgain.on('click', _tryAgain);
		function _tryAgain(e) {
			e.preventDefault;

			// $blockResult.hide();
			// $blockQuestion.show();
			// $resultTitle.hide();
			// $resultText.hide();
			// // по умолчанию активен первый вопрос
			// $psychListItem.eq(0).addClass('is-active');
		};



	};
	//-----------------------------------------------------------------------


	// Final test
	// Да, код дублируется в обоих тестах. Но разделил потому что второй тест чем то 
	//должен отличаться от первого(который на Главной). 
	//-----------------------------------------------------------------------
	function _finalTest() {

		var $buttons  = $('.js-final-question-btn'),
			$list     = $('.final-question-list'),
			$listItem = $list.find('li'),

			counter      = 1,
			$questionNum = $('.question-number__what'),
			$howMuch     = $('.final-question-number__how-much'),

			$finalP        = $('.final-test__paragraph'), 
			$blockQuestion = $('.final-test__final-question'),
			$blockResult   = $('.final-test__result'),
			$tryAgain      = $('.js-test-result-btn'),


			// подстчет теста и стили для процентов
			$resultTitle    = $('.js-result-title'),
			$testPercentage = $('.js-test-percentage'),
			countPercentage = 0, // проценты правильных ответов
			countAnswer     = 0; // счетчик правильных ответов

			$watchAgain    = $('.js-watch-again'); // блок с видео "Watch again"



		// показываем кол-во вопросов
		if($listItem.length < 10) {
			$howMuch.text('0' + $listItem.length);
		} else {
			$howMuch.text($listItem.length);
		}

		// по умолчанию активен первый вопрос
		$listItem.eq(0).addClass('is-active');

		// вешаем клик на кнопки
		$buttons.on('click', 'button', _checkQuestion);
		$tryAgain.on('click', _tryAgain);


		function _checkQuestion() {

			var $this = $(this);

			if($this.hasClass('js-psych-button-Yes')) {
				countAnswer++;
				countPercentage += (100 / $listItem.length); // 100% делим на кол-во вопросов
			}

			counter++;

			// плюс к пройденному вопросу
			if(counter < 10) {
				$questionNum.text('0' + counter);
			} else {
				$questionNum.text(counter);
			}

			// переключаем вопрос
			$listItem.removeClass('is-active')
					 .eq(counter - 1)
					 .addClass('is-active');

			// если счетчик больше чем кол-во вопросов 
			// сбрасываем его
			if(counter > $listItem.length ) {
				counter = 1;

				// сбрасываем счетчик пройденныйх вопросов и 
				// делаем активным первый вопрос
				$questionNum.text('0' + counter);
				$listItem.eq(0).addClass('is-active');

				// выводим результат теста
				$blockQuestion.hide();
				$blockResult.show();
				$watchAgain.show(); // показываем блок "Watch again"
				$finalP.fadeTo(0, 0); // скрываем параграф под заголовком "Final Test"

				// вызываем фунткцию которая задает цвет процентам и текст в заголовке
				_numbersColor(countAnswer, $resultTitle, $testPercentage);
				$testPercentage.text(Math.ceil(countPercentage)); // округляем число и выводим его

				// анимация для Процентов
				$testPercentage.animateNumber({
					number: Math.ceil(countPercentage),

					easing: 'easeInQuad'
				}, 3000);

				countAnswer = 0; // сбрасываем 
				countPercentage = 0; 
			} 
		};


		function _tryAgain() {
			$blockResult.hide();
			$watchAgain.hide(); // скрываем блок "Watch again"
			$blockQuestion.show();
			$finalP.fadeTo(0, 1);
		};
	};
	//-----------------------------------------------------------------------

	// Эта функция относится к Тестам!
	// В зависимости от результатов теста, задаем необходимый цвет
	// процентам и меняем текст в Заголовке результата
	//--------------------------------------------------------------------
	function _numbersColor(countAnswer, resultTitle, testPercentage) {
		if(countAnswer >= 0 && countAnswer <= 4 ) {
			resultTitle.text('So baaad');
			testPercentage.removeClass('average-result good-result')
						   .addClass('bad-result');
		} else if(countAnswer >= 5 && countAnswer <= 8 ) {
			resultTitle.text('Good for you');
			testPercentage.removeClass('bad-result good-result')
						   .addClass('average-result');
		} else if(countAnswer >= 9 && countAnswer <= 12 ) {
			resultTitle.text('You did it great!');
			testPercentage.removeClass('average-result bad-result')
						   .addClass('good-result');
		}
	};



	// ПО ВОЗМОЖНОСТИ ОПТИМИЗИРОВАТЬ ДАННЫЙ КОД !!!!!!!!!!!!!!!!!!!!
	// Проверка формы
	//-----------------------------------------------------------------------
	function _formValidation() {
		var $form         = $('.main-form'); // формы на всех страницах
			$inputs 	  = $form.find('input'), // и все инпуты на странице!!!
			$errorMsg     = $form.find('.error-message'), // сообщения об ошибках

			$formMainpage = $('.main-page-form'), // форма на Главной
			$loginForm1   = $('#loginForm1'), // форма 1 на странице Login
			$loginForm2   = $('#loginForm2'), // форма 2 на странице Login

			$formSuccess  = $('.js-form-success'), 
			$successClose = $formSuccess.find('.js-success-close'),

			$textTitle    = $('.login-popup__warning-text'); // заголовок на странице Login


		// для загоовков страницы Login
		var txt1 = 'If you have already purchased this course,  please enter the password which we have sent you on the e-mail.';
		var txt2 = 'Please enter the email you used for payment of  course and we\'ll send you a new password!';

		// отправка формы на Главной
		//------------------------------------------
		$formMainpage.on('submit', function(e) {
			e.preventDefault();

			var $this       = $(this),
				$formInputs = $this.find('input');

			var formValidation = _checkInput($formInputs);


			if(formValidation) {
				$formSuccess.show()
				$form.hide();
			}
			
		});

		// и закрытие Окна об успешной отправки
		_closeSuccess();
		function _closeSuccess() {
			$successClose.on('click', function() {
				$formSuccess.hide();
				$formMainpage.show();
				$inputs.val('')
					   .removeClass('success error'); // очищаем поля

			});
		};
		//-----------------------------------------------


		// Форма на странице "Login" для входа
		//---------------------------------------------------------
		$loginForm1.on('submit', function(e) {
			e.preventDefault();

			var $this       = $(this),
				$formInputs = $this.find('input');

			var formValidation = _checkInput($formInputs);

			if(formValidation) {
				// $formSuccess.show()
				// $form.hide();
				console.log('Отправляемся на страницу с курсом!!!');

				// window.open("course.html"); // Просто тест
			} 

		});

		// Форма на странице "Login" для отправки Нового пароля
		//---------------------------------------------------------
		$loginForm2.on('submit', function(e) {
			e.preventDefault();

			var $this             = $(this),
				$formInputs       = $this.find('input'),
				$sendPassSuccsess = $('.login-new-passsuccess'),
				$warningIcon      = $('.login-popup__warning-icon-wrap');

			var formValidation = _checkInput($formInputs);

			if(formValidation) {
				$this.hide();
				$sendPassSuccsess.show()
				$textTitle.text('');
				$warningIcon.hide();
			} 

		});


		// проверка на Странице с вводом Логина
		//----------------------------------------
		_checkLogin();

		function _checkLogin() {
			var $forgotPass      = $('#loginLinkForgot'), // ссылка "Forgot password?"
				$sendLink        = $('#loginLinkSend'), // ссылка 'sign in' в ОКНЕ "Forgot password?"
				$signInlink      = $('.js-login-new-pass-btn'), // кнопка об успешной отправки нового Пароля
				$formLoginForgot = $('#formLoginForgot'),
				$formEmail       = $formLoginForgot.find('form'),
				$formLogin       = $('#formLogin');


			// по клику на ссылку "Forgot password?" показываем окно
			// с возможность востановить пароль
			//---------------------------------------------------------
			$forgotPass.on('click', function(e) {
				e.preventDefault();
				
				$formLogin.hide();
				$loginForm2.show();
				$formLoginForgot.show();
				$inputs.val('')
					   .removeClass('success error'); // очищаем поля
				$errorMsg.removeClass('is-active');

				$textTitle.text(txt2);
			});


			// по клику на ссылку и кнопку "Sign In"  показываем окно авторизации
			//------------------------------------------------------------
			$sendLink.on('click', function(e) {
				e.preventDefault();
				
				$formLoginForgot.hide();
				$formLogin.show();
				$inputs.val('')
					   .removeClass('success error'); // очищаем поля
				$errorMsg.removeClass('is-active');
				$textTitle.text(txt1);
			});


			// по клику на ссылку и кнопку "Sign In"  показываем окно авторизации
			//------------------------------------------------------------
			$signInlink.on('click', function(e) {
				e.preventDefault();

				var $sendPassSuccsess = $('.login-new-passsuccess'),
					$warningIcon      = $('.login-popup__warning-icon-wrap');

				$sendPassSuccsess.hide();
				$formLoginForgot.hide();
				$formLogin.show();
				$textTitle.text(txt1);
				$warningIcon.show();
			});

			
		};
		//------------------------------------------------------------


		// проверяем наши поля
		//-------------------------------------
		function _checkInput(input) {
			var valid = true;

			input.each(function(index, elem) {
				var $this    = $(this),
					value 	 = $this.val(),
					pattern  = $this.data('val'),
					$msg     = $this.siblings('.error-message');

				var res = value.search(pattern);

				if(res == -1) {
					$this.addClass('error')
						 .removeClass('success');
					$msg.addClass('is-active');
					valid = false;
				} else {
					$this.addClass('success');
					$msg.removeClass('is-active');
				}
			});

			return valid;
		};


		// при Фокусе на поле убираем сообщения об ошибках
		//-----------------------------------------------------
		_focusInput();
		function _focusInput() {
			$inputs.on('focus', function() {
				var $this = $(this),
					$msg  = $this.siblings('.error-message');

				if($msg.hasClass('is-active')) {
					$msg.removeClass('is-active');
				}
			});
		};


		// проверка при изменении поля и выходе из него
		//-----------------------------------------------
		_changeInput();
		function _changeInput() {
			$inputs.on('blur change', function() {

				var $this   = $(this),
					value   = $this.val(),
					pattern = $this.data('val'),
					$msg    = $this.siblings('.error-message');

				var res = value.search(pattern);

				if(res == -1) {
					$this.addClass('error');
					$this.removeClass('success');
					$msg.addClass('is-active');
				} else {
					$this.removeClass('error');
					$this.addClass('success');
					$msg.removeClass('is-active');
				}

			});
		};



	};
	//-----------------------------------------------------------------------


	// Mаски для формы
	//-----------------------------------------------------------------------
	function _maskForm() {
		var $card = $('#inputCard'),
			$date = $('#inputDate'),
			$CVC = $('#inputCVC');

		$card.mask('0000 0000 0000 0000');
		$date.mask('00/00');
		$CVC.mask('000');
	}
	//-----------------------------------------------------------------------

	// Анимация для старницы
	//-----------------------------------------------------------------------
	function _animationScrollReveal() {


		window.sr = ScrollReveal().reveal(
			'.js-is-animation', 
			{
				origin: 'bottom',
				distance: '0px',
				duration: 700,
				delay: 400,
				opacity: 0,
				scale: 0.7,
				easing: 'ease-in-out',
				mobile: true,
				reset: false,
				useDelay: 'always',
				viewFactor: 0.5
			}
		);


	};
	//-----------------------------------------------------------------------


	// Скролл до формы
	//-----------------------------------------------------------------------
	function _buyClickBrn() {

		$("body").on('click', '[href*="#"]', function(e){
		  e.preventDefault();
		  var fixed_offset = 140;
		  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1300);
		});

	};
	//-----------------------------------------------------------------------


	// Preloader
	//-----------------------------------------------------------------------
	function _preloader() {

		var $preloader = $('.preloader'),
		    $spinner   = $('.spinner'),
		    $body 	   = $('body');


		// загрузка прелоадера
		$(window).on('load', function() {
		  $spinner.delay(1500).fadeOut();
		  $preloader.delay(2000).fadeOut();
		});

		// при загрузке Preloadera убираем скролл
		// и потом показываем его
		// setTimeout(_removeHiddeBody, 2150);
		// function _removeHiddeBody() {
		// 	$body.css({
		// 		'overflow': 'auto'
		// 	});
		// };

	};
	//-----------------------------------------------------------------------



	return {
		init: init
	}

})();

myModule.init();


