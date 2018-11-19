(function ($) {

	if(!$){
		console.warn('jQuery not found');
		return;
		}



	$(document).ready(function(){

		$("#preloader").delay(100).fadeOut("slow");
		$("#load").delay(100).fadeOut("slow");


		//jQuery for page scrolling feature - requires jQuery Easing plugin
		$('.navbar-nav li a:not([href="#languages"],.btn_login)').on('click', function(event) {
			var $anchor = $(this);
		
			if(!($(event.target).is('.btn_login'))){
		
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		
			$('.navbar-custom .navbar-collapse.in').removeClass('in');
		
			}
		
		});
		
		if(location.pathname === '/' || location.pathname === '/index.html' ) {
			// scroll to top when click on navbar logo icon
			$('.page-scroll a').on('click', function(event) {
				$('html, body').stop().animate({
				scrollTop: 0
			}, 1500, 'easeInOutExpo');
				event.preventDefault();
			});
		}

		var $navbar = $(".navbar").first(),
		$fixed = $(".navbar-fixed-top");
		//jQuery to collapse the navbar on scroll
		$(window).scroll(function() {
			if ($navbar.offset().top > 50) {
				$fixed.addClass("top-nav-collapse");
			} else {
				$fixed.removeClass("top-nav-collapse");
			}
		});

		function is_email(email){      
			var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			return emailReg.test(email); 
			};

		$('#joinMailingList').click(function(){
			var email = $('#email_text').val();

			if(!is_email(email)){
				$('#message_body').html('<p>이메일 형식이 잘못되었습니다.<br> 다시 입력해 주세요.&hellip;</p>');
				$('#message_notice').modal('show');
				}
			else{
				joinMailingList(email);
				}
			});

		function joinMailingList(email){
			var response = '';

			var urlStr = "/mailingList/add/" + email;

			var urlEncoded = encodeURI(urlStr);
			$.ajax({ type: "POST",   
				url: urlEncoded,   
				async: true,
				success : function(text){
					response = text;
					$('#message_body').html('<p>귀하의 이메일 주소가 잘 전달되었습니다.<br> 유익한 소식으로 연락드리겠습니다.&hellip;</p>');
					$('#message_notice').modal('show');
					}
				});
			};
		// lazy load feature images
		$('.section_feature .visu img[data-src]').each(function(){
			this.setAttribute('src', this.getAttribute('data-src'));
			this.removeAttribute('data-src');
			});
		
		
		// carousel wipe function
		// needs jquery.swipeTouch plugin
		$(".carousel-inner").swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('next'); 
				},
			swipeRight: function() {
				$(this).parent().carousel('prev'); 
				},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
			});
		
		});


// https://raw.githubusercontent.com/taylorhakes/promise-polyfill
// MIT
(function() {
if(!window.Promise)
	!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Promise=t()}(this,function(){"use strict";function e(){}function t(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,f._immediateFn(function(){var i=1===e._state?t.onFulfilled:t.onRejected;if(null!==i){var r;try{r=i(e._value)}catch(e){return void o(t.promise,e)}n(t.promise,r)}else(1===e._state?n:o)(t.promise,e._value)})):e._deferreds.push(t)}function n(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof f)return e._state=3,e._value=t,void i(e);if("function"==typeof n)return void r(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,i(e)}catch(t){o(e,t)}}function o(e,t){e._state=2,e._value=t,i(e)}function i(e){2===e._state&&0===e._deferreds.length&&f._immediateFn(function(){e._handled||f._unhandledRejectionFn(e._value)});for(var n=0,o=e._deferreds.length;o>n;n++)t(e,e._deferreds[n]);e._deferreds=null}function r(e,t){var i=!1;try{e(function(e){i||(i=!0,n(t,e))},function(e){i||(i=!0,o(t,e))})}catch(e){if(i)return;i=!0,o(t,e)}}function f(e){if(!(this instanceof f))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],r(e,this)}var u=setTimeout,c=f.prototype;return c.catch=function(e){return this.then(null,e)},c.then=function(n,o){var i=new this.constructor(e);return t(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(n,o,i)),i},f.all=function(e){return new f(function(t,n){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(t){o(e,t)},n)}i[e]=f,0==--r&&t(i)}catch(e){n(e)}}if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var r=i.length,f=0;i.length>f;f++)o(f,i[f])})},f.resolve=function(e){return e&&"object"==typeof e&&e.constructor===f?e:new f(function(t){t(e)})},f.reject=function(e){return new f(function(t,n){n(e)})},f.race=function(e){return new f(function(t,n){for(var o=0,i=e.length;i>o;o++)e[o].then(t,n)})},f._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){u(e,0)},f._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},f});
})();

	/* 
		FontTester
		Tests if Google Font 'Noto Sans KR' is correctly loaded
		Internet Explorer seems to be unable to render latests early-access version
		©IDK2 All rights reserved
    */
	function FontTester() {
		this.iframe = document.createElement('iframe');
		this.iframe.style = this.invisible;
	}
	FontTester.prototype = {
		knownFamilies: ['Noto Sans KR'],
		invisible: 'position:absolute; z-index:-10; border: 0px; opacity:0;',
		test: function testFont(fontFamily, loadOnFailure) {
			var frame = this.iframe,
				invisible = this.invisible;
			var after = loadOnFailure ? checkShouldLoad.bind(this) : noop;
			if(document.fonts && document.fonts.ready) {
				return document.fonts.ready
					.then(function() {
						return new Promise(test);
					})
					.then(after);
			}
			else {
				return new Promise(test)
					.then(after);
			}
		
			function test(resolve, reject) {
				var span = document.createElement('span');
				span.textContent = '레';

				var clone = span.cloneNode(true);
				clone.style = invisible;
				frame.onload = wait;

				document.body.appendChild(frame);
				function wait() { // need to wait a bit for Safari...
					setTimeout(asyncTest, 100);
				}
				function asyncTest() {
					var doc = frame.contentDocument ||
						(frame.contentWindow && frame.contentWindow.document);
					if(!doc || !doc.body) {
						reject("can't access clean document");
						clean();
						return;
					}

					doc.body.appendChild(clone);
					document.body.appendChild(span);
				
					var defaultStyle = getComputedStyle(clone),
						fontRule = ' font: ' + 
						defaultStyle.fontWeight + ' ' +
						defaultStyle.fontSize + ' "' +
						(fontFamily || defaultStyle.fontFamily) + '";';

					span.style.cssText = invisible + fontRule;
				
					var indoc = span.getBoundingClientRect().width,
						inframe = clone.getBoundingClientRect().width;

					clean();				

					if(!inframe) reject("element in frame has no width");

					resolve(inframe && (indoc !== inframe));

				};

				function clean() {
					if(span.parentNode) span.parentNode.removeChild(span);
					if(frame.parentNode) frame.parentNode.removeChild(frame);
				}
			}
			
			function checkShouldLoad(support) {
				if(support === false) {
					return this.load(fontFamily)
						.then(function onload() {
							$(document.body).addClass('local-font');
							return {fontFamily: "success"};
						})
						.catch(function onerror(cause) {
							throw cause;
						});
				}
				return support;
			};
			function noop(val) {
				return val;
			}
		},
		load: function loadFont(fontFamily) {
			if(this.knownFamilies.indexOf(fontFamily) < 0) {
				console.error('unknown font family', fontFamily);
				throw new TypeError('unknown font family');
			}
			this.cleanRemote(fontFamily);
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = '/fonts/' + fontFamily.replace(/\s/g, '') + '/local.css';
			if(window.HTMLLinkElement && 'onload' in HTMLLinkElement.prototype) {
				return new Promise(promisified);
			}
			else {
				document.head.appendChild(link);
			}
			function promisified(resolve, reject) {
				link.onload = resolve;
				link.onerror = reject;
				document.head.appendChild(link);
			}
		},
		cleanRemote: function cleanRemoteFont(fontFamily) {	
			arr(document.styleSheets)
				.forEach(iterateThroughImports);
				
			function iterateThroughImports(sheet) {
				var imports = (sheet.imports && sheet.imports.length && arr(sheet.imports)) ||
						arr(sheet.cssRules);
				imports.forEach(removeRules, sheet);

				var del = (sheet.deleteImport && 'deleteImport') || 'deleteRule';
				if(typeof sheet[del] !== "function") return;
				for(var i=imports.length-1; i>=0; i--) {
					if(!isRemote(imports[i])) continue;
					sheet[del](i);
				}
			}
			function removeRules(importRule, index) {

				if(!isRemote(importRule)) return;

				var rules = arr(importRule.cssRules);
				
				if(typeof importRule.deleteRule === 'function') {
					for(var i=rules.length-1; i>=0; i--) {
						importRule.deleteRule(i);
					}
				}
				importRule.disabled = true;
				
			}

			function arr(iterable) {
				return Array.prototype.slice.call(iterable);
			}
			function isRemote(importRule) {
				try { // FF doesn't allow accessing this deep in remote sheets
					importRule.href;
				}
				catch(e) { return false; }
				return typeof importRule.href === 'string' &&
					importRule.href.indexOf('local.css') < 0 &&
					importRule.cssText.indexOf(fontFamily) > -1;
			}
			function isImport(rule) {
				return rule && rule instanceof CSSImportRule;
			}
			
		}
	};
	new FontTester()
		.test('Noto Sans KR', true)
		
		

})(jQuery);
