(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-seg_src_index_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   segProtocol: () => (/* binding */ segProtocol)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const segProtocol = {
  id: '@ohif/seg',
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  hasUpdatedPriorsInformation: false,
  name: 'Segmentations',
  // Just apply this one when specifically listed
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'segDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    segDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'SEG'
        }
      }]
    }
  },
  stages: [{
    name: 'Segmentations',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'segDisplaySetId'
      }]
    }]
  }]
};
function getHangingProtocolModule() {
  return [{
    name: segProtocol.id,
    protocol: segProtocol
  }];
}
const _default = getHangingProtocolModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(segProtocol, "segProtocol", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts");
  reactHotLoader.register(getHangingProtocolModule, "getHangingProtocolModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js":
/*!*********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _kitware_vtk_js_Common_Core_Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @kitware/vtk.js/Common/Core/Math */ "../../../node_modules/@kitware/vtk.js/Common/Core/Math.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-seg/src/id.js");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const {
  DicomMessage,
  DicomMetaDictionary
} = dcmjs__WEBPACK_IMPORTED_MODULE_3__["default"].data;
const sopClassUids = ['1.2.840.10008.5.1.4.1.1.66.4'];
let loadPromises = {};
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  const instance = instances[0];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID,
    wadoRoot,
    wadoUri,
    wadoUriRoot
  } = instance;
  const displaySet = {
    Modality: 'SEG',
    loading: false,
    isReconstructable: true,
    // by default for now since it is a volumetric SEG currently
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_2__.SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    isHydrated: false,
    segments: {},
    sopClassUids,
    instance,
    instances: [instance],
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    isOverlayDisplaySet: true
  };
  const referencedSeriesSequence = instance.ReferencedSeriesSequence;
  if (!referencedSeriesSequence) {
    throw new Error('ReferencedSeriesSequence is missing for the SEG');
  }
  const referencedSeries = referencedSeriesSequence[0];
  displaySet.referencedImages = instance.ReferencedSeriesSequence.ReferencedInstanceSequence;
  displaySet.referencedSeriesInstanceUID = referencedSeries.SeriesInstanceUID;
  displaySet.getReferenceDisplaySet = () => {
    const {
      displaySetService
    } = servicesManager.services;
    const referencedDisplaySets = displaySetService.getDisplaySetsForSeries(displaySet.referencedSeriesInstanceUID);
    if (!referencedDisplaySets || referencedDisplaySets.length === 0) {
      throw new Error('Referenced DisplaySet is missing for the SEG');
    }
    const referencedDisplaySet = referencedDisplaySets[0];
    displaySet.referencedDisplaySetInstanceUID = referencedDisplaySet.displaySetInstanceUID;

    // Todo: this needs to be able to work with other reference volumes (other than streaming) such as nifti, etc.
    displaySet.referencedVolumeURI = referencedDisplaySet.displaySetInstanceUID;
    const referencedVolumeId = `cornerstoneStreamingImageVolume:${displaySet.referencedVolumeURI}`;
    displaySet.referencedVolumeId = referencedVolumeId;
    return referencedDisplaySet;
  };
  displaySet.load = async _ref => {
    let {
      headers
    } = _ref;
    return await _load(displaySet, servicesManager, extensionManager, headers);
  };
  return [displaySet];
}
function _load(segDisplaySet, servicesManager, extensionManager, headers) {
  const {
    SOPInstanceUID
  } = segDisplaySet;
  const {
    segmentationService
  } = servicesManager.services;
  if ((segDisplaySet.loading || segDisplaySet.isLoaded) && loadPromises[SOPInstanceUID] && _segmentationExists(segDisplaySet, segmentationService)) {
    return loadPromises[SOPInstanceUID];
  }
  segDisplaySet.loading = true;

  // We don't want to fire multiple loads, so we'll wait for the first to finish
  // and also return the same promise to any other callers.
  loadPromises[SOPInstanceUID] = new Promise(async (resolve, reject) => {
    if (!segDisplaySet.segments || Object.keys(segDisplaySet.segments).length === 0) {
      const segments = await _loadSegments(extensionManager, segDisplaySet, headers);
      segDisplaySet.segments = segments;
    }
    const suppressEvents = true;
    segmentationService.createSegmentationForSEGDisplaySet(segDisplaySet, null, suppressEvents).then(() => {
      segDisplaySet.loading = false;
      resolve();
    }).catch(error => {
      segDisplaySet.loading = false;
      reject(error);
    });
  });
  return loadPromises[SOPInstanceUID];
}
async function _loadSegments(extensionManager, segDisplaySet, headers) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  const {
    dicomLoaderService
  } = utilityModule.exports;
  const segArrayBuffer = await dicomLoaderService.findDicomDataPromise(segDisplaySet, null, headers);
  const dicomData = DicomMessage.readFile(segArrayBuffer);
  const dataset = DicomMetaDictionary.naturalizeDataset(dicomData.dict);
  dataset._meta = DicomMetaDictionary.namifyDataset(dicomData.meta);
  if (!Array.isArray(dataset.SegmentSequence)) {
    dataset.SegmentSequence = [dataset.SegmentSequence];
  }
  const segments = _getSegments(dataset);
  return segments;
}
function _segmentationExists(segDisplaySet, segmentationService) {
  // This should be abstracted with the CornerstoneCacheService
  return segmentationService.getSegmentation(segDisplaySet.displaySetInstanceUID);
}
function _getPixelData(dataset, segments) {
  let frameSize = Math.ceil(dataset.Rows * dataset.Columns / 8);
  let nextOffset = 0;
  Object.keys(segments).forEach(segmentKey => {
    const segment = segments[segmentKey];
    segment.numberOfFrames = segment.functionalGroups.length;
    segment.size = segment.numberOfFrames * frameSize;
    segment.offset = nextOffset;
    nextOffset = segment.offset + segment.size;
    const packedSegment = dataset.PixelData[0].slice(segment.offset, nextOffset);
    segment.pixelData = dcmjs__WEBPACK_IMPORTED_MODULE_3__["default"].data.BitArray.unpack(packedSegment);
    segment.geometry = geometryFromFunctionalGroups(dataset, segment.functionalGroups);
  });
  return segments;
}
function geometryFromFunctionalGroups(dataset, perFrame) {
  let pixelMeasures = dataset.SharedFunctionalGroupsSequence.PixelMeasuresSequence;
  let planeOrientation = dataset.SharedFunctionalGroupsSequence.PlaneOrientationSequence;
  let planePosition = perFrame[0].PlanePositionSequence; // TODO: assume sorted frames!

  const geometry = {};

  // NB: DICOM PixelSpacing is defined as Row then Column,
  // unlike ImageOrientationPatient
  let spacingBetweenSlices = pixelMeasures.SpacingBetweenSlices;
  if (!spacingBetweenSlices) {
    if (pixelMeasures.SliceThickness) {
      console.log('Using SliceThickness as SpacingBetweenSlices');
      spacingBetweenSlices = pixelMeasures.SliceThickness;
    }
  }
  geometry.spacing = [pixelMeasures.PixelSpacing[1], pixelMeasures.PixelSpacing[0], spacingBetweenSlices].map(Number);
  geometry.dimensions = [dataset.Columns, dataset.Rows, perFrame.length].map(Number);
  let orientation = planeOrientation.ImageOrientationPatient.map(Number);
  const columnStepToPatient = orientation.slice(0, 3);
  const rowStepToPatient = orientation.slice(3, 6);
  geometry.planeNormal = [];
  _kitware_vtk_js_Common_Core_Math__WEBPACK_IMPORTED_MODULE_0__["default"].cross(columnStepToPatient, rowStepToPatient, geometry.planeNormal);
  let firstPosition = perFrame[0].PlanePositionSequence.ImagePositionPatient.map(Number);
  let lastPosition = perFrame[perFrame.length - 1].PlanePositionSequence.ImagePositionPatient.map(Number);
  geometry.sliceStep = [];
  _kitware_vtk_js_Common_Core_Math__WEBPACK_IMPORTED_MODULE_0__["default"].subtract(lastPosition, firstPosition, geometry.sliceStep);
  _kitware_vtk_js_Common_Core_Math__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(geometry.sliceStep);
  geometry.direction = columnStepToPatient.concat(rowStepToPatient).concat(geometry.sliceStep);
  geometry.origin = planePosition.ImagePositionPatient.map(Number);
  return geometry;
}
function _getSegments(dataset) {
  const segments = {};
  dataset.SegmentSequence.forEach(segment => {
    const cielab = segment.RecommendedDisplayCIELabValue;
    const rgba = dcmjs__WEBPACK_IMPORTED_MODULE_3__["default"].data.Colors.dicomlab2RGB(cielab).map(x => Math.round(x * 255));
    rgba.push(255);
    const segmentNumber = segment.SegmentNumber;
    segments[segmentNumber] = {
      color: rgba,
      functionalGroups: [],
      offset: null,
      size: null,
      pixelData: null,
      label: segment.SegmentLabel
    };
  });

  // make a list of functional groups per segment
  dataset.PerFrameFunctionalGroupsSequence.forEach(functionalGroup => {
    const segmentNumber = functionalGroup.SegmentIdentificationSequence.ReferencedSegmentNumber;
    segments[segmentNumber].functionalGroups.push(functionalGroup);
  });
  return _getPixelData(dataset, segments);
}
function getSopClassHandlerModule(_ref2) {
  let {
    servicesManager,
    extensionManager
  } = _ref2;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-seg',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
const _default = getSopClassHandlerModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DicomMessage, "DicomMessage", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(DicomMetaDictionary, "DicomMetaDictionary", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(sopClassUids, "sopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(loadPromises, "loadPromises", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_getDisplaySetsFromSeries, "_getDisplaySetsFromSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_load, "_load", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_loadSegments, "_loadSegments", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_segmentationExists, "_segmentationExists", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_getPixelData, "_getPixelData", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(geometryFromFunctionalGroups, "geometryFromFunctionalGroups", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_getSegments, "_getSegments", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getSopClassHandlerModule, "getSopClassHandlerModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-seg/src/id.js":
/*!***********************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/id.js ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dicom-seg/package.json");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dicom-seg';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/id.js");
  reactHotLoader.register(SOPClassHandlerName, "SOPClassHandlerName", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/id.js");
  reactHotLoader.register(SOPClassHandlerId, "SOPClassHandlerId", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-seg/src/index.tsx":
/*!***************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/index.tsx ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-seg/src/id.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.js");
/* harmony import */ var _panels_PanelSegmentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panels/PanelSegmentation */ "../../../extensions/cornerstone-dicom-seg/src/panels/PanelSegmentation.tsx");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const Component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.lazy(() => {
  return __webpack_require__.e(/*! import() */ "extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstoneSEGViewport */ "../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx"));
});
const OHIFCornerstoneSEGViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Component, props));
};

/**
 * You can remove any of the following modules if you don't need them.
 */
const extension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  /**
   * PanelModule should provide a list of panels that will be available in OHIF
   * for Modes to consume and render. Each panel is defined by a {name,
   * iconName, iconLabel, label, component} object. Example of a panel module
   * is the StudyBrowserPanel that is provided by the default extension in OHIF.
   */
  getPanelModule: _ref => {
    let {
      servicesManager,
      commandsManager,
      extensionManager
    } = _ref;
    const wrappedPanelSegmentation = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_panels_PanelSegmentation__WEBPACK_IMPORTED_MODULE_3__["default"], {
        commandsManager: commandsManager,
        servicesManager: servicesManager,
        extensionManager: extensionManager
      });
    };
    return [{
      name: 'panelSegmentation',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedPanelSegmentation
    }];
  },
  getViewportModule(_ref2) {
    let {
      servicesManager,
      extensionManager
    } = _ref2;
    const ExtendedOHIFCornerstoneSEGViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(OHIFCornerstoneSEGViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-seg',
      component: ExtendedOHIFCornerstoneSEGViewport
    }];
  },
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const _default = extension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/index.tsx");
  reactHotLoader.register(OHIFCornerstoneSEGViewport, "OHIFCornerstoneSEGViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/index.tsx");
  reactHotLoader.register(extension, "extension", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-seg/src/panels/PanelSegmentation.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/panels/PanelSegmentation.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelSegmentation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _callInputDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./callInputDialog */ "../../../extensions/cornerstone-dicom-seg/src/panels/callInputDialog.tsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





function PanelSegmentation(_ref) {
  let {
    servicesManager,
    commandsManager
  } = _ref;
  const {
    segmentationService,
    uiDialogService
  } = servicesManager.services;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)('PanelSegmentation');
  const [selectedSegmentationId, setSelectedSegmentationId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [segmentationConfiguration, setSegmentationConfiguration] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(segmentationService.getConfiguration());
  const [segmentations, setSegmentations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => segmentationService.getSegmentations());
  const [isMinimized, setIsMinimized] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const onToggleMinimizeSegmentation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(id => {
    setIsMinimized(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }, [setIsMinimized]);

  // Only expand the last segmentation added to the list and collapse the rest
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const lastSegmentationId = segmentations[segmentations.length - 1]?.id;
    if (lastSegmentationId) {
      setIsMinimized(prevState => ({
        ...prevState,
        [lastSegmentationId]: false
      }));
    }
  }, [segmentations, setIsMinimized]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // ~~ Subscription
    const added = segmentationService.EVENTS.SEGMENTATION_ADDED;
    const updated = segmentationService.EVENTS.SEGMENTATION_UPDATED;
    const removed = segmentationService.EVENTS.SEGMENTATION_REMOVED;
    const subscriptions = [];
    [added, updated, removed].forEach(evt => {
      const {
        unsubscribe
      } = segmentationService.subscribe(evt, () => {
        const segmentations = segmentationService.getSegmentations();
        setSegmentations(segmentations);
        setSegmentationConfiguration(segmentationService.getConfiguration());
      });
      subscriptions.push(unsubscribe);
    });
    return () => {
      subscriptions.forEach(unsub => {
        unsub();
      });
    };
  }, []);
  const onSegmentationClick = segmentationId => {
    segmentationService.setActiveSegmentationForToolGroup(segmentationId);
  };
  const onSegmentationDelete = segmentationId => {
    segmentationService.remove(segmentationId);
  };
  const getToolGroupIds = segmentationId => {
    const toolGroupIds = segmentationService.getToolGroupIdsWithSegmentation(segmentationId);
    return toolGroupIds;
  };
  const onSegmentClick = (segmentationId, segmentIndex) => {
    segmentationService.setActiveSegmentForSegmentation(segmentationId, segmentIndex);
    const toolGroupIds = getToolGroupIds(segmentationId);
    toolGroupIds.forEach(toolGroupId => {
      // const toolGroupId =
      segmentationService.setActiveSegmentationForToolGroup(segmentationId, toolGroupId);
      segmentationService.jumpToSegmentCenter(segmentationId, segmentIndex, toolGroupId);
    });
  };
  const onSegmentEdit = (segmentationId, segmentIndex) => {
    const segmentation = segmentationService.getSegmentation(segmentationId);
    const segment = segmentation.segments[segmentIndex];
    const {
      label
    } = segment;
    (0,_callInputDialog__WEBPACK_IMPORTED_MODULE_3__["default"])(uiDialogService, label, (label, actionId) => {
      if (label === '') {
        return;
      }
      segmentationService.setSegmentLabelForSegmentation(segmentationId, segmentIndex, label);
    });
  };
  const onSegmentationEdit = segmentationId => {
    const segmentation = segmentationService.getSegmentation(segmentationId);
    const {
      label
    } = segmentation;
    (0,_callInputDialog__WEBPACK_IMPORTED_MODULE_3__["default"])(uiDialogService, label, (label, actionId) => {
      if (label === '') {
        return;
      }
      segmentationService.addOrUpdateSegmentation({
        id: segmentationId,
        label
      }, false,
      // suppress event
      true // notYetUpdatedAtSource
      );
    });
  };

  const onSegmentColorClick = (segmentationId, segmentIndex) => {
    // Todo: Implement color picker later
    return;
  };
  const onSegmentDelete = (segmentationId, segmentIndex) => {
    // segmentationService.removeSegmentFromSegmentation(
    //   segmentationId,
    //   segmentIndex
    // );
    console.warn('not implemented yet');
  };
  const onToggleSegmentVisibility = (segmentationId, segmentIndex) => {
    const segmentation = segmentationService.getSegmentation(segmentationId);
    const segmentInfo = segmentation.segments[segmentIndex];
    const isVisible = !segmentInfo.isVisible;
    const toolGroupIds = getToolGroupIds(segmentationId);

    // Todo: right now we apply the visibility to all tool groups
    toolGroupIds.forEach(toolGroupId => {
      segmentationService.setSegmentVisibility(segmentationId, segmentIndex, isVisible, toolGroupId);
    });
  };
  const onToggleSegmentationVisibility = segmentationId => {
    segmentationService.toggleSegmentationVisibility(segmentationId);
  };
  const _setSegmentationConfiguration = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((segmentationId, key, value) => {
    segmentationService.setConfiguration({
      segmentationId,
      [key]: value
    });
  }, [segmentationService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-col flex-auto min-h-0 justify-between mt-1"
  }, segmentations?.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.SegmentationGroupTable, {
    title: t('Segmentations'),
    showAddSegmentation: false,
    segmentations: segmentations,
    isMinimized: isMinimized,
    activeSegmentationId: selectedSegmentationId || '',
    onSegmentationClick: onSegmentationClick,
    onSegmentationDelete: onSegmentationDelete,
    onSegmentationEdit: onSegmentationEdit,
    onSegmentClick: onSegmentClick,
    onSegmentEdit: onSegmentEdit,
    onSegmentColorClick: onSegmentColorClick,
    onSegmentDelete: onSegmentDelete,
    onToggleSegmentVisibility: onToggleSegmentVisibility,
    onToggleSegmentationVisibility: onToggleSegmentationVisibility,
    onToggleMinimizeSegmentation: onToggleMinimizeSegmentation,
    segmentationConfig: {
      initialConfig: segmentationConfiguration
    },
    setRenderOutline: value => _setSegmentationConfiguration(selectedSegmentationId, 'renderOutline', value),
    setOutlineOpacityActive: value => _setSegmentationConfiguration(selectedSegmentationId, 'outlineOpacity', value),
    setRenderFill: value => _setSegmentationConfiguration(selectedSegmentationId, 'renderFill', value),
    setRenderInactiveSegmentations: value => _setSegmentationConfiguration(selectedSegmentationId, 'renderInactiveSegmentations', value),
    setOutlineWidthActive: value => _setSegmentationConfiguration(selectedSegmentationId, 'outlineWidthActive', value),
    setFillAlpha: value => _setSegmentationConfiguration(selectedSegmentationId, 'fillAlpha', value),
    setFillAlphaInactive: value => _setSegmentationConfiguration(selectedSegmentationId, 'fillAlphaInactive', value)
  }) : null);
}
__signature__(PanelSegmentation, "useTranslation{{ t }}\nuseState{[selectedSegmentationId, setSelectedSegmentationId](null)}\nuseState{[segmentationConfiguration, setSegmentationConfiguration](segmentationService.getConfiguration())}\nuseState{[segmentations, setSegmentations](() =>\n    segmentationService.getSegmentations())}\nuseState{[isMinimized, setIsMinimized]({})}\nuseCallback{onToggleMinimizeSegmentation}\nuseEffect{}\nuseEffect{}\nuseCallback{_setSegmentationConfiguration}", () => [react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation]);
PanelSegmentation.propTypes = {
  commandsManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    runCommand: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }),
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    services: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
      segmentationService: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
        getSegmentation: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        getSegmentations: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        toggleSegmentationVisibility: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        subscribe: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        EVENTS: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(PanelSegmentation, "PanelSegmentation", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/panels/PanelSegmentation.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-seg/src/panels/callInputDialog.tsx":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/panels/callInputDialog.tsx ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function callInputDialog(uiDialogService, label, callback) {
  const dialogId = 'enter-segment-label';
  const onSubmitHandler = _ref => {
    let {
      action,
      value
    } = _ref;
    switch (action.id) {
      case 'save':
        callback(value.label, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({
      id: dialogId
    });
  };
  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Dialog,
      contentProps: {
        title: 'Segment',
        value: {
          label
        },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({
          id: dialogId
        }),
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: 'primary'
        }, {
          id: 'save',
          text: 'Confirm',
          type: 'secondary'
        }],
        onSubmit: onSubmitHandler,
        body: _ref2 => {
          let {
            value,
            setValue
          } = _ref2;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
            label: "Enter the segment label",
            labelClassName: "text-white text-[14px] leading-[1.2]",
            autoFocus: true,
            className: "bg-black border-primary-main",
            type: "text",
            value: value.label,
            onChange: event => {
              event.persist();
              setValue(value => ({
                ...value,
                label: event.target.value
              }));
            },
            onKeyPress: event => {
              if (event.key === 'Enter') {
                onSubmitHandler({
                  value,
                  action: {
                    id: 'save'
                  }
                });
              }
            }
          });
        }
      }
    });
  }
}
const _default = callInputDialog;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(callInputDialog, "callInputDialog", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/panels/callInputDialog.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-seg/src/panels/callInputDialog.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "?0c00":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-seg/package.json":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/package.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-seg","version":"3.6.0","description":"DICOM SEG read workflow","author":"OHIF","license":"MIT","main":"dist/ohif-extension-cornerstone-dicom-seg.umd.js","module":"src/index.tsx","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-seg":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-cornerstone":"3.6.0","@ohif/extension-default":"3.6.0","@ohif/i18n":"3.6.0","prop-types":"^15.6.2","react":"^17.0.2","react-dom":"^17.0.2","react-i18next":"^12.2.2","react-router":"^6.8.1","react-router-dom":"^6.8.1"},"dependencies":{"@babel/runtime":"^7.20.13","react-color":"^2.19.3"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-seg_src_index_tsx.js.map