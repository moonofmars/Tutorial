"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx"],{

/***/ "../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function OHIFCornerstonePdfViewport(_ref) {
  let {
    displaySets
  } = _ref;
  const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  if (displaySets && displaySets.length > 1) {
    throw new Error('OHIFCornerstonePdfViewport: only one display set is supported for dicom pdf right now');
  }
  const {
    pdfUrl
  } = displaySets[0];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const load = async () => {
      setUrl(await pdfUrl);
    };
    load();
  }, [pdfUrl]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-primary-black w-full h-full text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("object", {
    data: url,
    type: "application/pdf",
    className: "w-full h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "No online PDF viewer installed")));
}
__signature__(OHIFCornerstonePdfViewport, "useState{[url, setUrl](null)}\nuseEffect{}");
OHIFCornerstonePdfViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)).isRequired
};
const _default = OHIFCornerstonePdfViewport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(OHIFCornerstonePdfViewport, "OHIFCornerstonePdfViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx.js.map