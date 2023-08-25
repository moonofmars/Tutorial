"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-video_src_index_tsx"],{

/***/ "../../../extensions/dicom-video/src/getSopClassHandlerModule.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-video/src/getSopClassHandlerModule.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSopClassHandlerModule)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/dicom-video/src/id.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const SOP_CLASS_UIDS = {
  VIDEO_MICROSCOPIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.2.1',
  VIDEO_PHOTOGRAPHIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.4.1',
  VIDEO_ENDOSCOPIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.1.1',
  /** Need to use fallback, could be video or image */
  SECONDARY_CAPTURE_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.7',
  MULTIFRAME_TRUE_COLOR_SECONDARY_CAPTURE_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.7.4'
};
const sopClassUids = Object.values(SOP_CLASS_UIDS);
const secondaryCaptureSopClassUids = [SOP_CLASS_UIDS.SECONDARY_CAPTURE_IMAGE_STORAGE, SOP_CLASS_UIDS.MULTIFRAME_TRUE_COLOR_SECONDARY_CAPTURE_IMAGE_STORAGE];
const SupportedTransferSyntaxes = {
  MPEG4_AVC_264_HIGH_PROFILE: '1.2.840.10008.1.2.4.102',
  MPEG4_AVC_264_BD_COMPATIBLE_HIGH_PROFILE: '1.2.840.10008.1.2.4.103',
  MPEG4_AVC_264_HIGH_PROFILE_FOR_2D_VIDEO: '1.2.840.10008.1.2.4.104',
  MPEG4_AVC_264_HIGH_PROFILE_FOR_3D_VIDEO: '1.2.840.10008.1.2.4.105',
  MPEG4_AVC_264_STEREO_HIGH_PROFILE: '1.2.840.10008.1.2.4.106',
  HEVC_265_MAIN_PROFILE: '1.2.840.10008.1.2.4.107',
  HEVC_265_MAIN_10_PROFILE: '1.2.840.10008.1.2.4.108'
};
const supportedTransferSyntaxUIDs = Object.values(SupportedTransferSyntaxes);
const _getDisplaySetsFromSeries = (instances, servicesManager, extensionManager) => {
  const dataSource = extensionManager.getActiveDataSource()[0];
  return instances.filter(metadata => {
    const tsuid = metadata.AvailableTransferSyntaxUID || metadata.TransferSyntaxUID || metadata['00083002'];
    if (supportedTransferSyntaxUIDs.includes(tsuid)) {
      return true;
    }
    if (metadata.SOPClassUID === SOP_CLASS_UIDS.VIDEO_PHOTOGRAPHIC_IMAGE_STORAGE) {
      return true;
    }

    // Assume that an instance with one of the secondary capture SOPClassUIDs and
    // with at least 90 frames (i.e. typically 3 seconds of video) is indeed a video.
    return secondaryCaptureSopClassUids.includes(metadata.SOPClassUID) && metadata.NumberOfFrames >= 90;
  }).map(instance => {
    const {
      Modality,
      SOPInstanceUID,
      SeriesDescription = 'VIDEO'
    } = instance;
    const {
      SeriesNumber,
      SeriesDate,
      SeriesInstanceUID,
      StudyInstanceUID,
      NumberOfFrames
    } = instance;
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
      referencedImages: null,
      measurements: null,
      videoUrl: dataSource.retrieve.directURL({
        instance,
        singlepart: 'video',
        tag: 'PixelData'
      }),
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
      numImageFrames: NumberOfFrames,
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
    name: 'dicom-video',
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
  reactHotLoader.register(SOP_CLASS_UIDS, "SOP_CLASS_UIDS", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
  reactHotLoader.register(sopClassUids, "sopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
  reactHotLoader.register(secondaryCaptureSopClassUids, "secondaryCaptureSopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
  reactHotLoader.register(SupportedTransferSyntaxes, "SupportedTransferSyntaxes", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
  reactHotLoader.register(supportedTransferSyntaxUIDs, "supportedTransferSyntaxUIDs", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_getDisplaySetsFromSeries, "_getDisplaySetsFromSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getSopClassHandlerModule, "getSopClassHandlerModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/getSopClassHandlerModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-video/src/id.js":
/*!*************************************************!*\
  !*** ../../../extensions/dicom-video/src/id.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/dicom-video/package.json");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerId = `${id}.sopClassHandlerModule.dicom-video`;

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/id.js");
  reactHotLoader.register(SOPClassHandlerId, "SOPClassHandlerId", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-video/src/index.tsx":
/*!*****************************************************!*\
  !*** ../../../extensions/dicom-video/src/index.tsx ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/dicom-video/src/getSopClassHandlerModule.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id */ "../../../extensions/dicom-video/src/id.js");
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
  return __webpack_require__.e(/*! import() */ "extensions_dicom-video_src_viewports_OHIFCornerstoneVideoViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstoneVideoViewport */ "../../../extensions/dicom-video/src/viewports/OHIFCornerstoneVideoViewport.tsx"));
});
const OHIFCornerstoneVideoViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, props));
};

/**
 *
 */
const dicomVideoExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_2__.id,
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
    const ExtendedOHIFCornerstoneVideoViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OHIFCornerstoneVideoViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-video',
      component: ExtendedOHIFCornerstoneVideoViewport
    }];
  },
  // getCommandsModule({ servicesManager }) {
  //   return {
  //     definitions: {
  //       setToolActive: {
  //         commandFn: ({ toolName, element }) => {
  //         },
  //         storeContexts: [],
  //         options: {},
  //       },
  //     },
  //     defaultContext: 'ACTIVE_VIEWPORT::VIDEO',
  //   };
  // },
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function _getToolAlias(toolName) {
  let toolAlias = toolName;
  switch (toolName) {
    case 'EllipticalRoi':
      toolAlias = 'SREllipticalRoi';
      break;
  }
  return toolAlias;
}
const _default = dicomVideoExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/index.tsx");
  reactHotLoader.register(OHIFCornerstoneVideoViewport, "OHIFCornerstoneVideoViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/index.tsx");
  reactHotLoader.register(dicomVideoExtension, "dicomVideoExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/index.tsx");
  reactHotLoader.register(_getToolAlias, "_getToolAlias", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-video/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-video/package.json":
/*!****************************************************!*\
  !*** ../../../extensions/dicom-video/package.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/extension-dicom-video","version":"3.6.0","description":"OHIF extension for video display","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-dicom-video.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/ui":"3.6.0","dcmjs":"^0.29.5","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^17.0.2"},"dependencies":{"@babel/runtime":"^7.20.13","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-video_src_index_tsx.js.map