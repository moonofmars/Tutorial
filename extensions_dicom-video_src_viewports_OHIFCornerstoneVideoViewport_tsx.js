"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-video_src_viewports_OHIFCornerstoneVideoViewport_tsx"],{

/***/ "../../../extensions/dicom-video/src/viewports/OHIFCornerstoneVideoViewport.tsx":
/*!**************************************************************************************!*\
  !*** ../../../extensions/dicom-video/src/viewports/OHIFCornerstoneVideoViewport.tsx ***!
  \**************************************************************************************/
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


function OHIFCornerstoneVideoViewport(_ref) {
  let {
    displaySets
  } = _ref;
  if (displaySets && displaySets.length > 1) {
    throw new Error('OHIFCornerstoneVideoViewport: only one display set is supported for dicom video right now');
  }
  const {
    videoUrl
  } = displaySets[0];
  const mimeType = 'video/mp4';
  const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const load = async () => {
      setUrl(await videoUrl);
    };
    load();
  }, [videoUrl]);

  // Need to copies of the source to fix a firefox bug
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-primary-black w-full h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("video", {
    src: url,
    controls: true,
    controlsList: "nodownload",
    preload: "auto",
    className: "w-full h-full",
    crossOrigin: "anonymous"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("source", {
    src: url,
    type: mimeType
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("source", {
    src: url,
    type: mimeType
  }), "Video src/type not supported:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: url
  }, url, " of type ", mimeType)));
}
__signature__(OHIFCornerstoneVideoViewport, "useState{[url, setUrl](null)}\nuseEffect{}");
OHIFCornerstoneVideoViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)).isRequired
};
const _default = OHIFCornerstoneVideoViewport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(OHIFCornerstoneVideoViewport, "OHIFCornerstoneVideoViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/viewports/OHIFCornerstoneVideoViewport.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/viewports/OHIFCornerstoneVideoViewport.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-video_src_viewports_OHIFCornerstoneVideoViewport_tsx.js.map