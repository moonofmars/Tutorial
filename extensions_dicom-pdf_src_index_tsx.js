"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-pdf_src_index_tsx"],{

/***/ "../../../extensions/dicom-pdf/src/getSopClassHandlerModule.js":
/*!*********************************************************************!*\
  !*** ../../../extensions/dicom-pdf/src/getSopClassHandlerModule.js ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSopClassHandlerModule)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/dicom-pdf/src/id.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const {
  ImageSet
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes;
const SOP_CLASS_UIDS = {
  ENCAPSULATED_PDF: '1.2.840.10008.5.1.4.1.1.104.1'
};
const sopClassUids = Object.values(SOP_CLASS_UIDS);
const _getDisplaySetsFromSeries = (instances, servicesManager, extensionManager) => {
  const dataSource = extensionManager.getActiveDataSource()[0];
  return instances.map(instance => {
    const {
      Modality,
      SOPInstanceUID,
      EncapsulatedDocument
    } = instance;
    const {
      SeriesDescription = 'PDF',
      MIMETypeOfEncapsulatedDocument
    } = instance;
    const {
      SeriesNumber,
      SeriesDate,
      SeriesInstanceUID,
      StudyInstanceUID,
      SOPClassUID
    } = instance;
    const pdfUrl = dataSource.retrieve.directURL({
      instance,
      tag: 'EncapsulatedDocument',
      defaultType: MIMETypeOfEncapsulatedDocument || 'application/pdf',
      singlepart: 'pdf'
    });
    const displaySet = {
      //plugin: id,
      Modality,
      displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.guid(),
      SeriesDescription,
      SeriesNumber,
      SeriesDate,
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID,
      SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerId,
      SOPClassUID,
      referencedImages: null,
      measurements: null,
      pdfUrl,
      instances: [instance],
      thumbnailSrc: dataSource.retrieve.directURL({
        instance,
        defaultPath: '/thumbnail',
        defaultType: 'image/jpeg',
        tag: 'Absent'
      }),
      isDerivedDisplaySet: true,
      isLoaded: false,
      sopClassUids,
      numImageFrames: 0,
      numInstances: 1,
      instance
    };
    return displaySet;
  });
};
function getSopClassHandlerModule(_ref) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-pdf',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ImageSet, "ImageSet", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/getSopClassHandlerModule.js");
  reactHotLoader.register(SOP_CLASS_UIDS, "SOP_CLASS_UIDS", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/getSopClassHandlerModule.js");
  reactHotLoader.register(sopClassUids, "sopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_getDisplaySetsFromSeries, "_getDisplaySetsFromSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getSopClassHandlerModule, "getSopClassHandlerModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/getSopClassHandlerModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-pdf/src/id.js":
/*!***********************************************!*\
  !*** ../../../extensions/dicom-pdf/src/id.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/dicom-pdf/package.json");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerId = `${id}.sopClassHandlerModule.dicom-pdf`;

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/id.js");
  reactHotLoader.register(SOPClassHandlerId, "SOPClassHandlerId", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-pdf/src/index.tsx":
/*!***************************************************!*\
  !*** ../../../extensions/dicom-pdf/src/index.tsx ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/dicom-pdf/src/getSopClassHandlerModule.js");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id.js */ "../../../extensions/dicom-pdf/src/id.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const Component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.lazy(() => {
  return __webpack_require__.e(/*! import() */ "extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstonePdfViewport */ "../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx"));
});
const OHIFCornerstonePdfViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, props));
};

/**
 *
 */
const dicomPDFExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_2__.id,
  /**
   *
   *
   * @param {object} [configuration={}]
   * @param {object|array} [configuration.csToolsConfig] - Passed directly to `initCornerstoneTools`
   */
  getViewportModule(_ref) {
    let {
      servicesManager,
      extensionManager
    } = _ref;
    const ExtendedOHIFCornerstonePdfViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OHIFCornerstonePdfViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-pdf',
      component: ExtendedOHIFCornerstonePdfViewport
    }];
  },
  // getCommandsModule({ servicesManager }) {
  //   return {
  //     definitions: {
  //       setToolActive: {
  //         commandFn: () => null,
  //         storeContexts: [],
  //         options: {},
  //       },
  //     },
  //     defaultContext: 'ACTIVE_VIEWPORT::PDF',
  // };
  // },
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__["default"]
};
const _default = dicomPDFExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/index.tsx");
  reactHotLoader.register(OHIFCornerstonePdfViewport, "OHIFCornerstonePdfViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/index.tsx");
  reactHotLoader.register(dicomPDFExtension, "dicomPDFExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-pdf/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-pdf/package.json":
/*!**************************************************!*\
  !*** ../../../extensions/dicom-pdf/package.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/extension-dicom-pdf","version":"3.6.0","description":"OHIF extension for PDF display","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-dicom-pdf.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/ui":"3.6.0","dcmjs":"^0.29.5","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^17.0.2"},"dependencies":{"@babel/runtime":"^7.20.13","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-pdf_src_index_tsx.js.map