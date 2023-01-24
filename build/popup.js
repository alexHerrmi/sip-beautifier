/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup.scss":
/*!************************!*\
  !*** ./src/popup.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_popup_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/popup.scss */ "./src/popup.scss");


document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('main-form__beautify')
    .addEventListener('click', () => {
      const orderedObject = {};

      const iframe = document.getElementById('sandbox');
      window.addEventListener('message', (event) => {
        console.log(event.data);
        let arrOfLines = event.data.split('\r\n').filter((e) => e.length > 0);
        arrOfLines.map((e) => {
          let key = e.substring(0, e.indexOf(':'))
            ? e.substring(0, e.indexOf(':'))
            : '<no-key>';
          orderedObject[key] = e.substring(e.indexOf(':') + 1, e.length);
        });
        if (Object.keys(orderedObject).length > 1) {
          const existingChild = document.getElementsByClassName('text-box')[0];
          if (existingChild)
            document.getElementById('render').removeChild(existingChild);

          const contentDiv = document.getElementById('render');
          const wholeTextDiv = document.createElement('div');
          wholeTextDiv.classList.add('text-box');
          contentDiv.style.display = 'block';

          Object.keys(orderedObject).forEach((e) => {
            const newFieldDiv = document.createElement('div');
            newFieldDiv.classList.add('newFieldDiv');
            const keySpan = document.createElement('span');
            keySpan.classList.add('keySpan');

            const valueSpan = document.createElement('span');
            valueSpan.classList.add('valueSpan');

            keySpan.innerText = e + ':';
            valueSpan.innerText = orderedObject[e];

            newFieldDiv.appendChild(keySpan);
            newFieldDiv.appendChild(valueSpan);
            wholeTextDiv.appendChild(newFieldDiv);
          });

          contentDiv.appendChild(wholeTextDiv);
        }
      });

      const sipInvite = document.getElementById('main-form__input').value;
      iframe.contentWindow.postMessage("'" + sipInvite + "'", '*');
    });

  document.getElementById('copyToClipboard').addEventListener('click', () => {
    document.getElementById('copiedSpan').classList.add('clipboardFade');
    setTimeout(() => {
      document.getElementById('copiedSpan').classList.remove('clipboardFade');
    }, 1000);

    let textToCopy = '';
    document.querySelectorAll('.newFieldDiv').forEach((e) => {
      textToCopy += e.textContent + '\n';
    });
    let result = navigator.clipboard.writeText(textToCopy);
  });
});

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map