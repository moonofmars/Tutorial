"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-rt_src_index_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-rt/src/id.js");
/* harmony import */ var _loadRTStruct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadRTStruct */ "../../../extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const sopClassUids = ['1.2.840.10008.5.1.4.1.1.481.3'];
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
    Modality: 'RTSTRUCT',
    loading: false,
    isReconstructable: false,
    // by default for now since it is a volumetric SEG currently
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_1__.SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    isHydrated: false,
    structureSet: null,
    sopClassUids,
    instance,
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    isOverlayDisplaySet: true
  };
  let referencedSeriesSequence = instance.ReferencedSeriesSequence;
  if (instance.ReferencedFrameOfReferenceSequence && !instance.ReferencedSeriesSequence) {
    instance.ReferencedSeriesSequence = _deriveReferencedSeriesSequenceFromFrameOfReferenceSequence(instance.ReferencedFrameOfReferenceSequence);
    referencedSeriesSequence = instance.ReferencedSeriesSequence;
  }
  if (!referencedSeriesSequence) {
    throw new Error('ReferencedSeriesSequence is missing for the RTSTRUCT');
  }
  const referencedSeries = referencedSeriesSequence[0];
  displaySet.referencedImages = instance.ReferencedSeriesSequence.ReferencedInstanceSequence;
  displaySet.referencedSeriesInstanceUID = referencedSeries.SeriesInstanceUID;
  displaySet.getReferenceDisplaySet = () => {
    const {
      DisplaySetService
    } = servicesManager.services;
    const referencedDisplaySets = DisplaySetService.getDisplaySetsForSeries(displaySet.referencedSeriesInstanceUID);
    if (!referencedDisplaySets || referencedDisplaySets.length === 0) {
      throw new Error('Referenced DisplaySet is missing for the RT');
    }
    const referencedDisplaySet = referencedDisplaySets[0];
    displaySet.referencedDisplaySetInstanceUID = referencedDisplaySet.displaySetInstanceUID;
    return referencedDisplaySet;
  };
  displaySet.load = _ref => {
    let {
      headers
    } = _ref;
    return _load(displaySet, servicesManager, extensionManager, headers);
  };
  return [displaySet];
}
function _load(rtDisplaySet, servicesManager, extensionManager, headers) {
  const {
    SOPInstanceUID
  } = rtDisplaySet;
  const {
    segmentationService
  } = servicesManager.services;
  if ((rtDisplaySet.loading || rtDisplaySet.isLoaded) && loadPromises[SOPInstanceUID] && _segmentationExistsInCache(rtDisplaySet, segmentationService)) {
    return loadPromises[SOPInstanceUID];
  }
  rtDisplaySet.loading = true;

  // We don't want to fire multiple loads, so we'll wait for the first to finish
  // and also return the same promise to any other callers.
  loadPromises[SOPInstanceUID] = new Promise(async (resolve, reject) => {
    if (!rtDisplaySet.structureSet) {
      const structureSet = await (0,_loadRTStruct__WEBPACK_IMPORTED_MODULE_2__["default"])(extensionManager, rtDisplaySet, rtDisplaySet.getReferenceDisplaySet(), headers);
      rtDisplaySet.structureSet = structureSet;
    }
    const suppressEvents = true;
    segmentationService.createSegmentationForRTDisplaySet(rtDisplaySet, null, suppressEvents).then(() => {
      rtDisplaySet.loading = false;
      resolve();
    }).catch(error => {
      rtDisplaySet.loading = false;
      reject(error);
    });
  });
  return loadPromises[SOPInstanceUID];
}
function _deriveReferencedSeriesSequenceFromFrameOfReferenceSequence(ReferencedFrameOfReferenceSequence) {
  const ReferencedSeriesSequence = [];
  ReferencedFrameOfReferenceSequence.forEach(referencedFrameOfReference => {
    const {
      RTReferencedStudySequence
    } = referencedFrameOfReference;
    RTReferencedStudySequence.forEach(rtReferencedStudy => {
      const {
        RTReferencedSeriesSequence
      } = rtReferencedStudy;
      RTReferencedSeriesSequence.forEach(rtReferencedSeries => {
        const ReferencedInstanceSequence = [];
        const {
          ContourImageSequence,
          SeriesInstanceUID
        } = rtReferencedSeries;
        ContourImageSequence.forEach(contourImage => {
          ReferencedInstanceSequence.push({
            ReferencedSOPInstanceUID: contourImage.ReferencedSOPInstanceUID,
            ReferencedSOPClassUID: contourImage.ReferencedSOPClassUID
          });
        });
        const referencedSeries = {
          SeriesInstanceUID,
          ReferencedInstanceSequence
        };
        ReferencedSeriesSequence.push(referencedSeries);
      });
    });
  });
  return ReferencedSeriesSequence;
}
function _segmentationExistsInCache(rtDisplaySet, segmentationService) {
  // Todo: fix this
  return false;
  // This should be abstracted with the CornerstoneCacheService
  const rtContourId = rtDisplaySet.displaySetInstanceUID;
  const contour = segmentationService.getContour(rtContourId);
  return contour !== undefined;
}
function getSopClassHandlerModule(_ref2) {
  let {
    servicesManager,
    extensionManager
  } = _ref2;
  return [{
    name: 'dicom-rt',
    sopClassUids,
    getDisplaySetsFromSeries: instances => {
      return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
    }
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
  reactHotLoader.register(sopClassUids, "sopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(loadPromises, "loadPromises", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_getDisplaySetsFromSeries, "_getDisplaySetsFromSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_load, "_load", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_deriveReferencedSeriesSequenceFromFrameOfReferenceSequence, "_deriveReferencedSeriesSequenceFromFrameOfReferenceSequence", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_segmentationExistsInCache, "_segmentationExistsInCache", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getSopClassHandlerModule, "getSopClassHandlerModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/id.js":
/*!**********************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/id.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dicom-rt/package.json");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dicom-rt';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/id.js");
  reactHotLoader.register(SOPClassHandlerName, "SOPClassHandlerName", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/id.js");
  reactHotLoader.register(SOPClassHandlerId, "SOPClassHandlerId", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-rt/src/id.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/cornerstone-dicom-rt/src/getSopClassHandlerModule.js");
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
  return __webpack_require__.e(/*! import() */ "extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstoneRTViewport */ "../../../extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx"));
});
const OHIFCornerstoneRTViewport = props => {
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
  getViewportModule(_ref) {
    let {
      servicesManager,
      extensionManager
    } = _ref;
    const ExtendedOHIFCornerstoneRTViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(OHIFCornerstoneRTViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-rt',
      component: ExtendedOHIFCornerstoneRTViewport
    }];
  },
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_2__["default"]
};
const _default = extension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/index.tsx");
  reactHotLoader.register(OHIFCornerstoneRTViewport, "OHIFCornerstoneRTViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/index.tsx");
  reactHotLoader.register(extension, "extension", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/loadRTStruct.js":
/*!********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/loadRTStruct.js ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadRTStruct)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
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
} = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data;
const dicomlab2RGB = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.Colors.dicomlab2RGB;
async function checkAndLoadContourData(instance, datasource) {
  if (!instance || !instance.ROIContourSequence) {
    return Promise.reject('Invalid instance object or ROIContourSequence');
  }
  const promisesMap = new Map();
  for (const ROIContour of instance.ROIContourSequence) {
    const referencedROINumber = ROIContour.ReferencedROINumber;
    if (!ROIContour || !ROIContour.ContourSequence) {
      promisesMap.set(referencedROINumber, [Promise.resolve([])]);
      continue;
    }
    for (const Contour of ROIContour.ContourSequence) {
      if (!Contour || !Contour.ContourData) {
        return Promise.reject('Invalid Contour or ContourData');
      }
      const contourData = Contour.ContourData;
      if (Array.isArray(contourData)) {
        promisesMap.has(referencedROINumber) ? promisesMap.get(referencedROINumber).push(Promise.resolve(contourData)) : promisesMap.set(referencedROINumber, [Promise.resolve(contourData)]);
      } else if (contourData && contourData.BulkDataURI) {
        const bulkDataURI = contourData.BulkDataURI;
        if (!datasource || !datasource.retrieve || !datasource.retrieve.bulkDataURI) {
          return Promise.reject('Invalid datasource object or retrieve function');
        }
        const bulkDataPromise = datasource.retrieve.bulkDataURI({
          BulkDataURI: bulkDataURI,
          StudyInstanceUID: instance.StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          SOPInstanceUID: instance.SOPInstanceUID
        });
        promisesMap.has(referencedROINumber) ? promisesMap.get(referencedROINumber).push(bulkDataPromise) : promisesMap.set(referencedROINumber, [bulkDataPromise]);
      } else {
        return Promise.reject(`Invalid ContourData: ${contourData}`);
      }
    }
  }
  const resolvedPromisesMap = new Map();
  for (const [key, promiseArray] of promisesMap.entries()) {
    resolvedPromisesMap.set(key, await Promise.allSettled(promiseArray));
  }
  instance.ROIContourSequence.forEach(ROIContour => {
    try {
      const referencedROINumber = ROIContour.ReferencedROINumber;
      const resolvedPromises = resolvedPromisesMap.get(referencedROINumber);
      if (ROIContour.ContourSequence) {
        ROIContour.ContourSequence.forEach((Contour, index) => {
          const promise = resolvedPromises[index];
          if (promise.status === 'fulfilled') {
            if (Array.isArray(promise.value) && promise.value.every(Number.isFinite)) {
              // If promise.value is already an array of numbers, use it directly
              Contour.ContourData = promise.value;
            } else {
              // If the resolved promise value is a byte array (Blob), it needs to be decoded
              const uint8Array = new Uint8Array(promise.value);
              const textDecoder = new TextDecoder();
              const dataUint8Array = textDecoder.decode(uint8Array);
              if (typeof dataUint8Array === 'string' && dataUint8Array.includes('\\')) {
                Contour.ContourData = dataUint8Array.split('\\').map(parseFloat);
              } else {
                Contour.ContourData = [];
              }
            }
          } else {
            console.error(promise.reason);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
}
async function loadRTStruct(extensionManager, rtStructDisplaySet, referencedDisplaySet, headers) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  const dataSource = extensionManager.getActiveDataSource()[0];
  const {
    bulkDataURI
  } = dataSource.getConfig?.() || {};
  const {
    dicomLoaderService
  } = utilityModule.exports;
  const imageIdSopInstanceUidPairs = _getImageIdSopInstanceUidPairsForDisplaySet(referencedDisplaySet);

  // Set here is loading is asynchronous.
  // If this function throws its set back to false.
  rtStructDisplaySet.isLoaded = true;
  let instance = rtStructDisplaySet.instance;
  if (!bulkDataURI || !bulkDataURI.enabled) {
    const segArrayBuffer = await dicomLoaderService.findDicomDataPromise(rtStructDisplaySet, null, headers);
    const dicomData = DicomMessage.readFile(segArrayBuffer);
    const rtStructDataset = DicomMetaDictionary.naturalizeDataset(dicomData.dict);
    rtStructDataset._meta = DicomMetaDictionary.namifyDataset(dicomData.meta);
    instance = rtStructDataset;
  } else {
    await checkAndLoadContourData(instance, dataSource);
  }
  const {
    StructureSetROISequence,
    ROIContourSequence,
    RTROIObservationsSequence
  } = instance;

  // Define our structure set entry and add it to the rtstruct module state.
  const structureSet = {
    StructureSetLabel: instance.StructureSetLabel,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    ROIContours: [],
    visible: true
  };
  for (let i = 0; i < ROIContourSequence.length; i++) {
    const ROIContour = ROIContourSequence[i];
    const {
      ContourSequence
    } = ROIContour;
    if (!ContourSequence) {
      continue;
    }
    const isSupported = false;
    const ContourSequenceArray = _toArray(ContourSequence);
    const contourPoints = [];
    for (let c = 0; c < ContourSequenceArray.length; c++) {
      const {
        ContourImageSequence,
        ContourData,
        NumberOfContourPoints,
        ContourGeometricType
      } = ContourSequenceArray[c];
      const sopInstanceUID = ContourImageSequence.ReferencedSOPInstanceUID;
      const imageId = _getImageId(imageIdSopInstanceUidPairs, sopInstanceUID);
      if (!imageId) {
        continue;
      }
      let isSupported = false;
      const points = [];
      for (let p = 0; p < NumberOfContourPoints * 3; p += 3) {
        points.push({
          x: ContourData[p],
          y: ContourData[p + 1],
          z: ContourData[p + 2]
        });
      }
      switch (ContourGeometricType) {
        case 'CLOSED_PLANAR':
        case 'OPEN_PLANAR':
        case 'POINT':
          isSupported = true;
          break;
        default:
          continue;
      }
      contourPoints.push({
        numberOfPoints: NumberOfContourPoints,
        points,
        type: ContourGeometricType,
        isSupported
      });
    }
    _setROIContourMetadata(structureSet, StructureSetROISequence, RTROIObservationsSequence, ROIContour, contourPoints, isSupported);
  }
  return structureSet;
}
const _getImageId = (imageIdSopInstanceUidPairs, sopInstanceUID) => {
  const imageIdSopInstanceUidPairsEntry = imageIdSopInstanceUidPairs.find(imageIdSopInstanceUidPairsEntry => imageIdSopInstanceUidPairsEntry.sopInstanceUID === sopInstanceUID);
  return imageIdSopInstanceUidPairsEntry ? imageIdSopInstanceUidPairsEntry.imageId : null;
};
function _getImageIdSopInstanceUidPairsForDisplaySet(referencedDisplaySet) {
  return referencedDisplaySet.images.map(image => {
    return {
      imageId: image.imageId,
      sopInstanceUID: image.SOPInstanceUID
    };
  });
}
function _setROIContourMetadata(structureSet, StructureSetROISequence, RTROIObservationsSequence, ROIContour, contourPoints, isSupported) {
  const StructureSetROI = StructureSetROISequence.find(structureSetROI => structureSetROI.ROINumber === ROIContour.ReferencedROINumber);
  const ROIContourData = {
    ROINumber: StructureSetROI.ROINumber,
    ROIName: StructureSetROI.ROIName,
    ROIGenerationAlgorithm: StructureSetROI.ROIGenerationAlgorithm,
    ROIDescription: StructureSetROI.ROIDescription,
    isSupported,
    contourPoints,
    visible: true
  };
  _setROIContourDataColor(ROIContour, ROIContourData);
  if (RTROIObservationsSequence) {
    // If present, add additional RTROIObservations metadata.
    _setROIContourRTROIObservations(ROIContourData, RTROIObservationsSequence, ROIContour.ReferencedROINumber);
  }
  structureSet.ROIContours.push(ROIContourData);
}
function _setROIContourDataColor(ROIContour, ROIContourData) {
  let {
    ROIDisplayColor,
    RecommendedDisplayCIELabValue
  } = ROIContour;
  if (!ROIDisplayColor && RecommendedDisplayCIELabValue) {
    // If ROIDisplayColor is absent, try using the RecommendedDisplayCIELabValue color.
    ROIDisplayColor = dicomlab2RGB(RecommendedDisplayCIELabValue);
  }
  if (ROIDisplayColor) {
    ROIContourData.colorArray = [...ROIDisplayColor];
  }
}
function _setROIContourRTROIObservations(ROIContourData, RTROIObservationsSequence, ROINumber) {
  const RTROIObservations = RTROIObservationsSequence.find(RTROIObservations => RTROIObservations.ReferencedROINumber === ROINumber);
  if (RTROIObservations) {
    // Deep copy so we don't keep the reference to the dcmjs dataset entry.
    const {
      ObservationNumber,
      ROIObservationDescription,
      RTROIInterpretedType,
      ROIInterpreter
    } = RTROIObservations;
    ROIContourData.RTROIObservations = {
      ObservationNumber,
      ROIObservationDescription,
      RTROIInterpretedType,
      ROIInterpreter
    };
  }
}
function _toArray(objOrArray) {
  return Array.isArray(objOrArray) ? objOrArray : [objOrArray];
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DicomMessage, "DicomMessage", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(DicomMetaDictionary, "DicomMetaDictionary", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(dicomlab2RGB, "dicomlab2RGB", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(checkAndLoadContourData, "checkAndLoadContourData", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(loadRTStruct, "loadRTStruct", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(_getImageId, "_getImageId", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(_getImageIdSopInstanceUidPairsForDisplaySet, "_getImageIdSopInstanceUidPairsForDisplaySet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(_setROIContourMetadata, "_setROIContourMetadata", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(_setROIContourDataColor, "_setROIContourDataColor", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(_setROIContourRTROIObservations, "_setROIContourRTROIObservations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
  reactHotLoader.register(_toArray, "_toArray", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/loadRTStruct.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/package.json":
/*!*************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/package.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-rt","version":"3.6.0","description":"DICOM RT read workflow","author":"OHIF","license":"MIT","main":"dist/ohif-extension-cornerstone-dicom-rt.umd.js","module":"src/index.tsx","files":["dist/**","public/**","README.md"],"publishConfig":{"access":"public"},"repository":"OHIF/Viewers","keywords":["ohif-extension"],"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-seg":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-cornerstone":"3.6.0","@ohif/extension-default":"3.6.0","@ohif/i18n":"3.6.0","prop-types":"^15.6.2","react":"^17.0.2","react-dom":"^17.0.2","react-i18next":"^10.11.0","react-router":"^6.3.0","react-router-dom":"^6.3.0"},"dependencies":{"@babel/runtime":"^7.20.13","react-color":"^2.19.3"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-rt_src_index_tsx.js.map