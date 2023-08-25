(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-sr_src_index_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-sr/src/commandsModule.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/commandsModule.js ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/@cornerstonejs/adapters.es.js");
/* harmony import */ var _utils_getFilteredCornerstoneToolState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getFilteredCornerstoneToolState */ "../../../extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const {
  MeasurementReport
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersSR.Cornerstone3D;
const {
  log
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__["default"];

/**
 *
 * @param measurementData An array of measurements from the measurements service
 * that you wish to serialize.
 * @param additionalFindingTypes toolTypes that should be stored with labels as Findings
 * @param options Naturalized DICOM JSON headers to merge into the displaySet.
 *
 */
const _generateReport = function (measurementData, additionalFindingTypes) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const filteredToolState = (0,_utils_getFilteredCornerstoneToolState__WEBPACK_IMPORTED_MODULE_4__["default"])(measurementData, additionalFindingTypes);
  const report = MeasurementReport.generateReport(filteredToolState, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.worldToImageCoords, options);
  const {
    dataset
  } = report;

  // Set the default character set as UTF-8
  // https://dicom.innolitics.com/ciods/nm-image/sop-common/00080005
  if (typeof dataset.SpecificCharacterSet === 'undefined') {
    dataset.SpecificCharacterSet = 'ISO_IR 192';
  }
  return dataset;
};
const commandsModule = _ref => {
  let {} = _ref;
  const actions = {
    /**
     *
     * @param measurementData An array of measurements from the measurements service
     * @param additionalFindingTypes toolTypes that should be stored with labels as Findings
     * @param options Naturalized DICOM JSON headers to merge into the displaySet.
     * as opposed to Finding Sites.
     * that you wish to serialize.
     */
    downloadReport: _ref2 => {
      let {
        measurementData,
        additionalFindingTypes,
        options = {}
      } = _ref2;
      const srDataset = actions.generateReport(measurementData, additionalFindingTypes, options);
      const reportBlob = dcmjs__WEBPACK_IMPORTED_MODULE_2__["default"].data.datasetToBlob(srDataset);

      //Create a URL for the binary.
      var objectUrl = URL.createObjectURL(reportBlob);
      window.location.assign(objectUrl);
    },
    /**
     *
     * @param measurementData An array of measurements from the measurements service
     * that you wish to serialize.
     * @param dataSource The dataSource that you wish to use to persist the data.
     * @param additionalFindingTypes toolTypes that should be stored with labels as Findings
     * @param options Naturalized DICOM JSON headers to merge into the displaySet.
     * @return The naturalized report
     */
    storeMeasurements: async _ref3 => {
      let {
        measurementData,
        dataSource,
        additionalFindingTypes,
        options = {}
      } = _ref3;
      // Use the @cornerstonejs adapter for converting to/from DICOM
      // But it is good enough for now whilst we only have cornerstone as a datasource.
      log.info('[DICOMSR] storeMeasurements');
      if (!dataSource || !dataSource.store || !dataSource.store.dicom) {
        log.error('[DICOMSR] datasource has no dataSource.store.dicom endpoint!');
        return Promise.reject({});
      }
      try {
        const naturalizedReport = _generateReport(measurementData, additionalFindingTypes, options);
        const {
          StudyInstanceUID,
          ContentSequence
        } = naturalizedReport;
        // The content sequence has 5 or more elements, of which
        // the `[4]` element contains the annotation data, so this is
        // checking that there is some annotation data present.
        if (!ContentSequence?.[4].ContentSequence?.length) {
          console.log('naturalizedReport missing imaging content', naturalizedReport);
          throw new Error('Invalid report, no content');
        }
        await dataSource.store.dicom(naturalizedReport);
        if (StudyInstanceUID) {
          dataSource.deleteStudyMetadataPromise(StudyInstanceUID);
        }

        // The "Mode" route listens for DicomMetadataStore changes
        // When a new instance is added, it listens and
        // automatically calls makeDisplaySets
        _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances([naturalizedReport], true);
        return naturalizedReport;
      } catch (error) {
        console.warn(error);
        log.error(`[DICOMSR] Error while saving the measurements: ${error.message}`);
        throw new Error(error.message || 'Error while saving the measurements.');
      }
    }
  };
  const definitions = {
    downloadReport: {
      commandFn: actions.downloadReport,
      storeContexts: [],
      options: {}
    },
    storeMeasurements: {
      commandFn: actions.storeMeasurements,
      storeContexts: [],
      options: {}
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE_STRUCTURED_REPORT'
  };
};
const _default = commandsModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(MeasurementReport, "MeasurementReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/commandsModule.js");
  reactHotLoader.register(log, "log", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/commandsModule.js");
  reactHotLoader.register(_generateReport, "_generateReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/commandsModule.js");
  reactHotLoader.register(commandsModule, "commandsModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/commandsModule.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/commandsModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/constants/scoordTypes.js":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/constants/scoordTypes.js ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const _default = {
  POINT: 'POINT',
  MULTIPOINT: 'MULTIPOINT',
  POLYLINE: 'POLYLINE',
  CIRCLE: 'CIRCLE',
  ELLIPSE: 'ELLIPSE'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/constants/scoordTypes.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   srProtocol: () => (/* binding */ srProtocol)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const srProtocol = {
  id: '@ohif/sr',
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  hasUpdatedPriorsInformation: false,
  name: 'SR Key Images',
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
      id: 'srDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    srDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'SR'
        }
      }]
    }
  },
  stages: [{
    name: 'SR Key Images',
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
        id: 'srDisplaySetId'
      }]
    }]
  }]
};
function getHangingProtocolModule() {
  return [{
    name: srProtocol.id,
    protocol: srProtocol
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
  reactHotLoader.register(srProtocol, "srProtocol", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts");
  reactHotLoader.register(getHangingProtocolModule, "getHangingProtocolModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-sr/src/id.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _utils_addMeasurement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/addMeasurement */ "../../../extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts");
/* harmony import */ var _utils_isRehydratable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/isRehydratable */ "../../../extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/@cornerstonejs/adapters.es.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const {
  CodeScheme: Cornerstone3DCodeScheme
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_4__.adaptersSR.Cornerstone3D;
const {
  ImageSet,
  MetadataProvider: metadataProvider
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes;

// TODO ->
// Add SR thumbnail
// Make viewport
// Get stacks from referenced displayInstanceUID and load into wrapped CornerStone viewport.

const sopClassUids = ['1.2.840.10008.5.1.4.1.1.88.11',
//BASIC_TEXT_SR:
'1.2.840.10008.5.1.4.1.1.88.22',
//ENHANCED_SR:
'1.2.840.10008.5.1.4.1.1.88.33',
//COMPREHENSIVE_SR:
'1.2.840.10008.5.1.4.1.1.88.34' //COMPREHENSIVE_3D_SR:
];

const CORNERSTONE_3D_TOOLS_SOURCE_NAME = 'Cornerstone3DTools';
const CORNERSTONE_3D_TOOLS_SOURCE_VERSION = '0.1';
const validateSameStudyUID = (uid, instances) => {
  instances.forEach(it => {
    if (it.StudyInstanceUID !== uid) {
      console.warn('Not all instances have the same UID', uid, it);
      throw new Error(`Instances ${it.SOPInstanceUID} does not belong to ${uid}`);
    }
  });
};
const CodeNameCodeSequenceValues = {
  ImagingMeasurementReport: '126000',
  ImageLibrary: '111028',
  ImagingMeasurements: '126010',
  MeasurementGroup: '125007',
  ImageLibraryGroup: '126200',
  TrackingUniqueIdentifier: '112040',
  TrackingIdentifier: '112039',
  Finding: '121071',
  FindingSite: 'G-C0E3',
  // SRT
  CornerstoneFreeText: Cornerstone3DCodeScheme.codeValues.CORNERSTONEFREETEXT //
};

const CodingSchemeDesignators = {
  SRT: 'SRT',
  CornerstoneCodeSchemes: [Cornerstone3DCodeScheme.CodingSchemeDesignator, 'CST4']
};
const RELATIONSHIP_TYPE = {
  INFERRED_FROM: 'INFERRED FROM',
  CONTAINS: 'CONTAINS'
};
const CORNERSTONE_FREETEXT_CODE_VALUE = 'CORNERSTONEFREETEXT';

/**
 * Adds instances to the DICOM SR series, rather than creating a new
 * series, so that as SR's are saved, they append to the series, and the
 * key image display set gets updated as well, containing just the new series.
 * @param instances is a list of instances from THIS series that are not
 *     in this DICOM SR Display Set already.
 */
function addInstances(instances, displaySetService) {
  this.instances.push(...instances);
  _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.sortStudyInstances(this.instances);
  // The last instance is the newest one, so is the one most interesting.
  // Eventually, the SR viewer should have the ability to choose which SR
  // gets loaded, and to navigate among them.
  this.instance = this.instances[this.instances.length - 1];
  this.isLoaded = false;
  return this;
}

/**
 * DICOM SR SOP Class Handler
 * For all referenced images in the TID 1500/300 sections, add an image to the
 * display.
 * @param instances is a set of instances all from the same series
 * @param servicesManager is the services that can be used for creating
 * @returns The list of display sets created for the given instances object
 */
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.sortStudyInstances(instances);
  // The last instance is the newest one, so is the one most interesting.
  // Eventually, the SR viewer should have the ability to choose which SR
  // gets loaded, and to navigate among them.
  const instance = instances[instances.length - 1];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    ConceptNameCodeSequence,
    SOPClassUID
  } = instance;
  validateSameStudyUID(instance.StudyInstanceUID, instances);
  if (!ConceptNameCodeSequence || ConceptNameCodeSequence.CodeValue !== CodeNameCodeSequenceValues.ImagingMeasurementReport) {
    servicesManager.services.uiNotificationService.show({
      title: 'DICOM SR',
      message: 'OHIF only supports TID1500 Imaging Measurement Report Structured Reports. The SR you’re trying to view is not supported.',
      type: 'warning',
      duration: 6000
    });
    return [];
  }
  const displaySet = {
    //plugin: id,
    Modality: 'SR',
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerId,
    SOPClassUID,
    instances,
    referencedImages: null,
    measurements: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    sopClassUids,
    instance,
    addInstances
  };
  displaySet.load = () => _load(displaySet, servicesManager, extensionManager);
  return [displaySet];
}
function _load(displaySet, servicesManager, extensionManager) {
  const {
    displaySetService,
    measurementService
  } = servicesManager.services;
  const dataSources = extensionManager.getDataSources();
  const dataSource = dataSources[0];
  const {
    ContentSequence
  } = displaySet.instance;
  displaySet.referencedImages = _getReferencedImagesList(ContentSequence);
  displaySet.measurements = _getMeasurements(ContentSequence);
  const mappings = measurementService.getSourceMappings(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  displaySet.isHydrated = false;
  displaySet.isRehydratable = (0,_utils_isRehydratable__WEBPACK_IMPORTED_MODULE_3__["default"])(displaySet, mappings);
  displaySet.isLoaded = true;

  // Check currently added displaySets and add measurements if the sources exist.
  displaySetService.activeDisplaySets.forEach(activeDisplaySet => {
    _checkIfCanAddMeasurementsToDisplaySet(displaySet, activeDisplaySet, dataSource);
  });

  // Subscribe to new displaySets as the source may come in after.
  displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
    const {
      displaySetsAdded
    } = data;
    // If there are still some measurements that have not yet been loaded into cornerstone,
    // See if we can load them onto any of the new displaySets.
    displaySetsAdded.forEach(newDisplaySet => {
      _checkIfCanAddMeasurementsToDisplaySet(displaySet, newDisplaySet, dataSource);
    });
  });
}
function _checkIfCanAddMeasurementsToDisplaySet(srDisplaySet, newDisplaySet, dataSource) {
  let unloadedMeasurements = srDisplaySet.measurements.filter(measurement => measurement.loaded === false);
  if (unloadedMeasurements.length === 0) {
    // All already loaded!
    return;
  }
  if (!newDisplaySet instanceof ImageSet) {
    // This also filters out _this_ displaySet, as it is not an ImageSet.
    return;
  }
  const {
    sopClassUids,
    images
  } = newDisplaySet;

  // Check if any have the newDisplaySet is the correct SOPClass.
  unloadedMeasurements = unloadedMeasurements.filter(measurement => measurement.coords.some(coord => sopClassUids.includes(coord.ReferencedSOPSequence.ReferencedSOPClassUID)));
  if (unloadedMeasurements.length === 0) {
    // New displaySet isn't the correct SOPClass, so can't contain the referenced images.
    return;
  }
  const SOPInstanceUIDs = [];
  unloadedMeasurements.forEach(measurement => {
    const {
      coords
    } = measurement;
    coords.forEach(coord => {
      const SOPInstanceUID = coord.ReferencedSOPSequence.ReferencedSOPInstanceUID;
      if (!SOPInstanceUIDs.includes(SOPInstanceUID)) {
        SOPInstanceUIDs.push(SOPInstanceUID);
      }
    });
  });
  const imageIdsForDisplaySet = dataSource.getImageIdsForDisplaySet(newDisplaySet);
  for (const imageId of imageIdsForDisplaySet) {
    if (!unloadedMeasurements.length) {
      // All measurements loaded.
      return;
    }
    const {
      SOPInstanceUID,
      frameNumber
    } = metadataProvider.getUIDsFromImageID(imageId);
    if (SOPInstanceUIDs.includes(SOPInstanceUID)) {
      for (let j = unloadedMeasurements.length - 1; j >= 0; j--) {
        const measurement = unloadedMeasurements[j];
        if (_measurementReferencesSOPInstanceUID(measurement, SOPInstanceUID, frameNumber)) {
          (0,_utils_addMeasurement__WEBPACK_IMPORTED_MODULE_2__["default"])(measurement, imageId, newDisplaySet.displaySetInstanceUID);
          unloadedMeasurements.splice(j, 1);
        }
      }
    }
  }
}
function _measurementReferencesSOPInstanceUID(measurement, SOPInstanceUID, frameNumber) {
  const {
    coords
  } = measurement;

  // NOTE: The ReferencedFrameNumber can be multiple values according to the DICOM
  //  Standard. But for now, we will support only one ReferenceFrameNumber.
  const ReferencedFrameNumber = measurement.coords[0].ReferencedSOPSequence && measurement.coords[0].ReferencedSOPSequence[0]?.ReferencedFrameNumber || 1;
  if (frameNumber && Number(frameNumber) !== Number(ReferencedFrameNumber)) return false;
  for (let j = 0; j < coords.length; j++) {
    const coord = coords[j];
    const {
      ReferencedSOPInstanceUID
    } = coord.ReferencedSOPSequence;
    if (ReferencedSOPInstanceUID === SOPInstanceUID) {
      return true;
    }
  }
}
function getSopClassHandlerModule(_ref) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerName,
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
function _getMeasurements(ImagingMeasurementReportContentSequence) {
  const ImagingMeasurements = ImagingMeasurementReportContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.ImagingMeasurements);
  const MeasurementGroups = _getSequenceAsArray(ImagingMeasurements.ContentSequence).filter(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.MeasurementGroup);
  const mergedContentSequencesByTrackingUniqueIdentifiers = _getMergedContentSequencesByTrackingUniqueIdentifiers(MeasurementGroups);
  const measurements = [];
  Object.keys(mergedContentSequencesByTrackingUniqueIdentifiers).forEach(trackingUniqueIdentifier => {
    const mergedContentSequence = mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier];
    const measurement = _processMeasurement(mergedContentSequence);
    if (measurement) {
      measurements.push(measurement);
    }
  });
  return measurements;
}
function _getMergedContentSequencesByTrackingUniqueIdentifiers(MeasurementGroups) {
  const mergedContentSequencesByTrackingUniqueIdentifiers = {};
  MeasurementGroups.forEach(MeasurementGroup => {
    const ContentSequence = _getSequenceAsArray(MeasurementGroup.ContentSequence);
    const TrackingUniqueIdentifierItem = ContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.TrackingUniqueIdentifier);
    if (!TrackingUniqueIdentifierItem) {
      console.warn('No Tracking Unique Identifier, skipping ambiguous measurement.');
    }
    const trackingUniqueIdentifier = TrackingUniqueIdentifierItem.UID;
    if (mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier] === undefined) {
      // Add the full ContentSequence
      mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier] = [...ContentSequence];
    } else {
      // Add the ContentSequence minus the tracking identifier, as we have this
      // Information in the merged ContentSequence anyway.
      ContentSequence.forEach(item => {
        if (item.ConceptNameCodeSequence.CodeValue !== CodeNameCodeSequenceValues.TrackingUniqueIdentifier) {
          mergedContentSequencesByTrackingUniqueIdentifiers[trackingUniqueIdentifier].push(item);
        }
      });
    }
  });
  return mergedContentSequencesByTrackingUniqueIdentifiers;
}
function _processMeasurement(mergedContentSequence) {
  if (mergedContentSequence.some(group => group.ValueType === 'SCOORD' || group.ValueType === 'SCOORD3D')) {
    return _processTID1410Measurement(mergedContentSequence);
  }
  return _processNonGeometricallyDefinedMeasurement(mergedContentSequence);
}
function _processTID1410Measurement(mergedContentSequence) {
  // Need to deal with TID 1410 style measurements, which will have a SCOORD or SCOORD3D at the top level,
  // And non-geometric representations where each NUM has "INFERRED FROM" SCOORD/SCOORD3D

  const graphicItem = mergedContentSequence.find(group => group.ValueType === 'SCOORD');
  const UIDREFContentItem = mergedContentSequence.find(group => group.ValueType === 'UIDREF');
  const TrackingIdentifierContentItem = mergedContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.TrackingIdentifier);
  if (!graphicItem) {
    console.warn(`graphic ValueType ${graphicItem.ValueType} not currently supported, skipping annotation.`);
    return;
  }
  const NUMContentItems = mergedContentSequence.filter(group => group.ValueType === 'NUM');
  const measurement = {
    loaded: false,
    labels: [],
    coords: [_getCoordsFromSCOORDOrSCOORD3D(graphicItem)],
    TrackingUniqueIdentifier: UIDREFContentItem.UID,
    TrackingIdentifier: TrackingIdentifierContentItem.TextValue
  };
  NUMContentItems.forEach(item => {
    const {
      ConceptNameCodeSequence,
      MeasuredValueSequence
    } = item;
    if (MeasuredValueSequence) {
      measurement.labels.push(_getLabelFromMeasuredValueSequence(ConceptNameCodeSequence, MeasuredValueSequence));
    }
  });
  return measurement;
}
function _processNonGeometricallyDefinedMeasurement(mergedContentSequence) {
  const NUMContentItems = mergedContentSequence.filter(group => group.ValueType === 'NUM');
  const UIDREFContentItem = mergedContentSequence.find(group => group.ValueType === 'UIDREF');
  const TrackingIdentifierContentItem = mergedContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.TrackingIdentifier);
  const finding = mergedContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.Finding);
  const findingSites = mergedContentSequence.filter(item => item.ConceptNameCodeSequence.CodingSchemeDesignator === CodingSchemeDesignators.SRT && item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.FindingSite);
  const measurement = {
    loaded: false,
    labels: [],
    coords: [],
    TrackingUniqueIdentifier: UIDREFContentItem.UID,
    TrackingIdentifier: TrackingIdentifierContentItem.TextValue
  };
  if (finding && CodingSchemeDesignators.CornerstoneCodeSchemes.includes(finding.ConceptCodeSequence.CodingSchemeDesignator) && finding.ConceptCodeSequence.CodeValue === CodeNameCodeSequenceValues.CornerstoneFreeText) {
    measurement.labels.push({
      label: CORNERSTONE_FREETEXT_CODE_VALUE,
      value: finding.ConceptCodeSequence.CodeMeaning
    });
  }

  // TODO -> Eventually hopefully support SNOMED or some proper code library, just free text for now.
  if (findingSites.length) {
    const cornerstoneFreeTextFindingSite = findingSites.find(FindingSite => CodingSchemeDesignators.CornerstoneCodeSchemes.includes(FindingSite.ConceptCodeSequence.CodingSchemeDesignator) && FindingSite.ConceptCodeSequence.CodeValue === CodeNameCodeSequenceValues.CornerstoneFreeText);
    if (cornerstoneFreeTextFindingSite) {
      measurement.labels.push({
        label: CORNERSTONE_FREETEXT_CODE_VALUE,
        value: cornerstoneFreeTextFindingSite.ConceptCodeSequence.CodeMeaning
      });
    }
  }
  NUMContentItems.forEach(item => {
    const {
      ConceptNameCodeSequence,
      ContentSequence,
      MeasuredValueSequence
    } = item;
    const {
      ValueType
    } = ContentSequence;
    if (!ValueType === 'SCOORD') {
      console.warn(`Graphic ${ValueType} not currently supported, skipping annotation.`);
      return;
    }
    const coords = _getCoordsFromSCOORDOrSCOORD3D(ContentSequence);
    if (coords) {
      measurement.coords.push(coords);
    }
    if (MeasuredValueSequence) {
      measurement.labels.push(_getLabelFromMeasuredValueSequence(ConceptNameCodeSequence, MeasuredValueSequence));
    }
  });
  return measurement;
}
function _getCoordsFromSCOORDOrSCOORD3D(item) {
  const {
    ValueType,
    RelationshipType,
    GraphicType,
    GraphicData
  } = item;
  if (!(RelationshipType == RELATIONSHIP_TYPE.INFERRED_FROM || RelationshipType == RELATIONSHIP_TYPE.CONTAINS)) {
    console.warn(`Relationshiptype === ${RelationshipType}. Cannot deal with NON TID-1400 SCOORD group with RelationshipType !== "INFERRED FROM" or "CONTAINS"`);
    return;
  }
  const coords = {
    ValueType,
    GraphicType,
    GraphicData
  };

  // ContentSequence has length of 1 as RelationshipType === 'INFERRED FROM'
  if (ValueType === 'SCOORD') {
    const {
      ReferencedSOPSequence
    } = item.ContentSequence;
    coords.ReferencedSOPSequence = ReferencedSOPSequence;
  } else if (ValueType === 'SCOORD3D') {
    const {
      ReferencedFrameOfReferenceSequence
    } = item.ContentSequence;
    coords.ReferencedFrameOfReferenceSequence = ReferencedFrameOfReferenceSequence;
  }
  return coords;
}
function _getLabelFromMeasuredValueSequence(ConceptNameCodeSequence, MeasuredValueSequence) {
  const {
    CodeMeaning
  } = ConceptNameCodeSequence;
  const {
    NumericValue,
    MeasurementUnitsCodeSequence
  } = MeasuredValueSequence;
  const {
    CodeValue
  } = MeasurementUnitsCodeSequence;
  const formatedNumericValue = NumericValue ? Number(NumericValue).toFixed(2) : '';
  return {
    label: CodeMeaning,
    value: `${formatedNumericValue} ${CodeValue}`
  }; // E.g. Long Axis: 31.0 mm
}

function _getReferencedImagesList(ImagingMeasurementReportContentSequence) {
  const ImageLibrary = ImagingMeasurementReportContentSequence.find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.ImageLibrary);
  const ImageLibraryGroup = _getSequenceAsArray(ImageLibrary.ContentSequence).find(item => item.ConceptNameCodeSequence.CodeValue === CodeNameCodeSequenceValues.ImageLibraryGroup);
  const referencedImages = [];
  _getSequenceAsArray(ImageLibraryGroup.ContentSequence).forEach(item => {
    const {
      ReferencedSOPSequence
    } = item;
    if (!ReferencedSOPSequence) return;
    for (const ref of _getSequenceAsArray(ReferencedSOPSequence)) {
      if (ref.ReferencedSOPClassUID) {
        const {
          ReferencedSOPClassUID,
          ReferencedSOPInstanceUID
        } = ref;
        referencedImages.push({
          ReferencedSOPClassUID,
          ReferencedSOPInstanceUID
        });
      }
    }
  });
  return referencedImages;
}
function _getSequenceAsArray(sequence) {
  if (!sequence) return [];
  return Array.isArray(sequence) ? sequence : [sequence];
}
const _default = getSopClassHandlerModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Cornerstone3DCodeScheme, "Cornerstone3DCodeScheme", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(ImageSet, "ImageSet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(metadataProvider, "metadataProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(sopClassUids, "sopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(CORNERSTONE_3D_TOOLS_SOURCE_NAME, "CORNERSTONE_3D_TOOLS_SOURCE_NAME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(CORNERSTONE_3D_TOOLS_SOURCE_VERSION, "CORNERSTONE_3D_TOOLS_SOURCE_VERSION", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(validateSameStudyUID, "validateSameStudyUID", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(CodeNameCodeSequenceValues, "CodeNameCodeSequenceValues", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(CodingSchemeDesignators, "CodingSchemeDesignators", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(RELATIONSHIP_TYPE, "RELATIONSHIP_TYPE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(CORNERSTONE_FREETEXT_CODE_VALUE, "CORNERSTONE_FREETEXT_CODE_VALUE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(addInstances, "addInstances", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getDisplaySetsFromSeries, "_getDisplaySetsFromSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_load, "_load", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_checkIfCanAddMeasurementsToDisplaySet, "_checkIfCanAddMeasurementsToDisplaySet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_measurementReferencesSOPInstanceUID, "_measurementReferencesSOPInstanceUID", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(getSopClassHandlerModule, "getSopClassHandlerModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getMeasurements, "_getMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getMergedContentSequencesByTrackingUniqueIdentifiers, "_getMergedContentSequencesByTrackingUniqueIdentifiers", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_processMeasurement, "_processMeasurement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_processTID1410Measurement, "_processTID1410Measurement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_processNonGeometricallyDefinedMeasurement, "_processNonGeometricallyDefinedMeasurement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getCoordsFromSCOORDOrSCOORD3D, "_getCoordsFromSCOORDOrSCOORD3D", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getLabelFromMeasuredValueSequence, "_getLabelFromMeasuredValueSequence", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getReferencedImagesList, "_getReferencedImagesList", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_getSequenceAsArray, "_getSequenceAsArray", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/id.js":
/*!**********************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/id.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerId: () => (/* binding */ SOPClassHandlerId),
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dicom-sr/package.json");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dicom-sr';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/id.js");
  reactHotLoader.register(SOPClassHandlerName, "SOPClassHandlerName", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/id.js");
  reactHotLoader.register(SOPClassHandlerId, "SOPClassHandlerId", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createReferencedImageDisplaySet: () => (/* reexport safe */ _utils_createReferencedImageDisplaySet__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hydrateStructuredReport: () => (/* reexport safe */ _utils_hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   srProtocol: () => (/* reexport safe */ _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_2__.srProtocol)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getSopClassHandlerModule */ "../../../extensions/cornerstone-dicom-sr/src/getSopClassHandlerModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/cornerstone-dicom-sr/src/getHangingProtocolModule.ts");
/* harmony import */ var _onModeEnter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onModeEnter */ "../../../extensions/cornerstone-dicom-sr/src/onModeEnter.js");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/cornerstone-dicom-sr/src/commandsModule.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./init */ "../../../extensions/cornerstone-dicom-sr/src/init.ts");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./id.js */ "../../../extensions/cornerstone-dicom-sr/src/id.js");
/* harmony import */ var _tools_toolNames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tools/toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* harmony import */ var _utils_hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/hydrateStructuredReport */ "../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
/* harmony import */ var _utils_createReferencedImageDisplaySet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/createReferencedImageDisplaySet */ "../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
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
  return __webpack_require__.e(/*! import() */ "extensions_cornerstone-dicom-sr_src_viewports_OHIFCornerstoneSRViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/OHIFCornerstoneSRViewport */ "../../../extensions/cornerstone-dicom-sr/src/viewports/OHIFCornerstoneSRViewport.tsx"));
});
const OHIFCornerstoneSRViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, props));
};

/**
 *
 */
const dicomSRExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_6__.id,
  onModeEnter: _onModeEnter__WEBPACK_IMPORTED_MODULE_3__["default"],
  preRegistration: _init__WEBPACK_IMPORTED_MODULE_5__["default"],
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
    const ExtendedOHIFCornerstoneSRViewport = props => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OHIFCornerstoneSRViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager
      }, props));
    };
    return [{
      name: 'dicom-sr',
      component: ExtendedOHIFCornerstoneSRViewport
    }];
  },
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getSopClassHandlerModule: _getSopClassHandlerModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  // Include dynmically computed values such as toolNames not known till instantiation
  getUtilityModule(_ref2) {
    let {
      servicesManager
    } = _ref2;
    return [{
      name: 'tools',
      exports: {
        toolNames: _tools_toolNames__WEBPACK_IMPORTED_MODULE_7__["default"]
      }
    }];
  }
};
const _default = dicomSRExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

// Put static exports here so they can be type checked

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/index.tsx");
  reactHotLoader.register(OHIFCornerstoneSRViewport, "OHIFCornerstoneSRViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/index.tsx");
  reactHotLoader.register(dicomSRExtension, "dicomSRExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/init.ts":
/*!************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/init.ts ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _tools_DICOMSRDisplayTool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/DICOMSRDisplayTool */ "../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts");
/* harmony import */ var _utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/addToolInstance */ "../../../extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts");
/* harmony import */ var _tools_toolNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





/**
 * @param {object} configuration
 */
function init(_ref) {
  let {
    configuration = {}
  } = _ref;
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_tools_DICOMSRDisplayTool__WEBPACK_IMPORTED_MODULE_1__["default"]);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRLength, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.LengthTool, {});
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRBidirectional, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.BidirectionalTool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SREllipticalROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.EllipticalROITool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRCircleROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CircleROITool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRArrowAnnotate, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ArrowAnnotateTool);
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRAngle, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.AngleTool);
  // TODO - fix the SR display of Cobb Angle, as it joins the two lines
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRCobbAngle, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CobbAngleTool);
  // TODO - fix the rehydration of Freehand, as it throws an exception
  // on a missing polyline. The fix is probably in CS3D
  (0,_utils_addToolInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(_tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].SRPlanarFreehandROI, _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.PlanarFreehandROITool);

  // Modify annotation tools to use dashed lines on SR
  const dashedLine = {
    lineDash: '4,4'
  };
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.config.style.setToolGroupToolStyles('SRToolGroup', {
    SRLength: dashedLine,
    SRBidirectional: dashedLine,
    SREllipticalROI: dashedLine,
    SRCircleROI: dashedLine,
    SRArrowAnnotate: dashedLine,
    SRCobbAngle: dashedLine,
    SRAngle: dashedLine,
    SRPlanarFreehandROI: dashedLine,
    global: {}
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(init, "init", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/init.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/onModeEnter.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/onModeEnter.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onModeEnter)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dicom-sr/src/id.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function onModeEnter(_ref) {
  let {
    servicesManager
  } = _ref;
  const {
    displaySetService
  } = servicesManager.services;
  const displaySetCache = displaySetService.getDisplaySetCache();
  const srDisplaySets = [...displaySetCache.values()].filter(ds => ds.SOPClassHandlerId === _id__WEBPACK_IMPORTED_MODULE_0__.SOPClassHandlerId);
  srDisplaySets.forEach(ds => {
    // New mode route, allow SRs to be hydrated again
    ds.isHydrated = false;
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(onModeEnter, "onModeEnter", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/onModeEnter.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DICOMSRDisplayTool)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _modules_dicomSRModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/dicomSRModule */ "../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
/* harmony import */ var _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/scoordTypes */ "../../../extensions/cornerstone-dicom-sr/src/constants/scoordTypes.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




class DICOMSRDisplayTool extends _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.AnnotationTool {
  constructor() {
    let toolProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let defaultToolProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      configuration: {}
    };
    super(toolProps, defaultToolProps);
    // This tool should not inherit from AnnotationTool and we should not need
    // to add the following lines.
    this.isPointNearTool = () => null;
    this.getHandleNearImagePoint = () => null;
    this.renderAnnotation = (enabledElement, svgDrawingHelper) => {
      const {
        viewport
      } = enabledElement;
      const {
        element
      } = viewport;
      let annotations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotations(this.getToolName(), element);

      // Todo: We don't need this anymore, filtering happens in triggerAnnotationRender
      if (!annotations?.length) {
        return;
      }
      annotations = this.filterInteractableAnnotationsForElement(element, annotations);
      if (!annotations?.length) {
        return;
      }
      const trackingUniqueIdentifiersForElement = (0,_modules_dicomSRModule__WEBPACK_IMPORTED_MODULE_2__.getTrackingUniqueIdentifiersForElement)(element);
      const {
        activeIndex,
        trackingUniqueIdentifiers
      } = trackingUniqueIdentifiersForElement;
      const activeTrackingUniqueIdentifier = trackingUniqueIdentifiers[activeIndex];

      // Filter toolData to only render the data for the active SR.
      const filteredAnnotations = annotations.filter(annotation => trackingUniqueIdentifiers.includes(annotation.data?.cachedStats?.TrackingUniqueIdentifier));
      if (!viewport._actors?.size) {
        return;
      }
      const styleSpecifier = {
        toolGroupId: this.toolGroupId,
        toolName: this.getToolName(),
        viewportId: enabledElement.viewport.id
      };
      for (let i = 0; i < filteredAnnotations.length; i++) {
        const annotation = filteredAnnotations[i];
        const annotationUID = annotation.annotationUID;
        const {
          renderableData
        } = annotation.data.cachedStats;
        const {
          cachedStats
        } = annotation.data;
        const {
          referencedImageId
        } = annotation.metadata;
        styleSpecifier.annotationUID = annotationUID;
        const lineWidth = this.getStyle('lineWidth', styleSpecifier, annotation);
        const lineDash = this.getStyle('lineDash', styleSpecifier, annotation);
        const color = cachedStats.TrackingUniqueIdentifier === activeTrackingUniqueIdentifier ? 'rgb(0, 255, 0)' : this.getStyle('color', styleSpecifier, annotation);
        const options = {
          color,
          lineDash,
          lineWidth
        };
        Object.keys(renderableData).forEach(GraphicType => {
          const renderableDataForGraphicType = renderableData[GraphicType];
          let renderMethod;
          let canvasCoordinatesAdapter;
          switch (GraphicType) {
            case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_3__["default"].POINT:
              renderMethod = this.renderPoint;
              break;
            case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_3__["default"].MULTIPOINT:
              renderMethod = this.renderMultipoint;
              break;
            case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_3__["default"].POLYLINE:
              renderMethod = this.renderPolyLine;
              break;
            case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_3__["default"].CIRCLE:
              renderMethod = this.renderEllipse;
              break;
            case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_3__["default"].ELLIPSE:
              renderMethod = this.renderEllipse;
              canvasCoordinatesAdapter = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.math.ellipse.getCanvasEllipseCorners;
              break;
            default:
              throw new Error(`Unsupported GraphicType: ${GraphicType}`);
          }
          const canvasCoordinates = renderMethod(svgDrawingHelper, viewport, renderableDataForGraphicType, annotationUID, referencedImageId, options);
          this.renderTextBox(svgDrawingHelper, viewport, canvasCoordinates, canvasCoordinatesAdapter, annotation, styleSpecifier, options);
        });
      }
    };
  }
  _getTextBoxLinesFromLabels(labels) {
    // TODO -> max 3 for now (label + shortAxis + longAxis), need a generic solution for this!

    const labelLength = Math.min(labels.length, 3);
    const lines = [];
    for (let i = 0; i < labelLength; i++) {
      const labelEntry = labels[i];
      lines.push(`${_labelToShorthand(labelEntry.label)}${labelEntry.value}`);
    }
    return lines;
  }
  renderPolyLine(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    const drawingOptions = {
      color: options.color,
      width: options.lineWidth
    };
    let allCanvasCoordinates = [];
    renderableData.map((data, index) => {
      const canvasCoordinates = data.map(p => viewport.worldToCanvas(p));
      const lineUID = `${index}`;
      if (canvasCoordinates.length === 2) {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawLine(svgDrawingHelper, annotationUID, lineUID, canvasCoordinates[0], canvasCoordinates[1], drawingOptions);
      } else {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawPolyline(svgDrawingHelper, annotationUID, lineUID, canvasCoordinates, drawingOptions);
      }
      allCanvasCoordinates = allCanvasCoordinates.concat(canvasCoordinates);
    });
    return allCanvasCoordinates; // used for drawing textBox
  }

  renderMultipoint(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    let canvasCoordinates;
    renderableData.map((data, index) => {
      canvasCoordinates = data.map(p => viewport.worldToCanvas(p));
      const handleGroupUID = '0';
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawHandles(svgDrawingHelper, annotationUID, handleGroupUID, canvasCoordinates, {
        color: options.color
      });
    });
  }
  renderPoint(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    const canvasCoordinates = [];
    renderableData.map((data, index) => {
      const point = data[0];
      // This gives us one point for arrow
      canvasCoordinates.push(viewport.worldToCanvas(point));

      // We get the other point for the arrow by using the image size
      const imagePixelModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('imagePixelModule', referencedImageId);
      let xOffset = 10;
      let yOffset = 10;
      if (imagePixelModule) {
        const {
          columns,
          rows
        } = imagePixelModule;
        xOffset = columns / 10;
        yOffset = rows / 10;
      }
      const imagePoint = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.worldToImageCoords(referencedImageId, point);
      const arrowEnd = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.imageToWorldCoords(referencedImageId, [imagePoint[0] + xOffset, imagePoint[1] + yOffset]);
      canvasCoordinates.push(viewport.worldToCanvas(arrowEnd));
      const arrowUID = `${index}`;

      // Todo: handle drawing probe as probe, currently we are drawing it as an arrow
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawArrow(svgDrawingHelper, annotationUID, arrowUID, canvasCoordinates[1], canvasCoordinates[0], {
        color: options.color,
        width: options.lineWidth
      });
    });
    return canvasCoordinates; // used for drawing textBox
  }

  renderEllipse(svgDrawingHelper, viewport, renderableData, annotationUID, referencedImageId, options) {
    let canvasCoordinates;
    renderableData.map((data, index) => {
      if (data.length === 0) {
        // since oblique ellipse is not supported for hydration right now
        // we just return
        return;
      }
      const ellipsePointsWorld = data;
      const rotation = viewport.getRotation();
      canvasCoordinates = ellipsePointsWorld.map(p => viewport.worldToCanvas(p));
      let canvasCorners;
      if (rotation == 90 || rotation == 270) {
        canvasCorners = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.math.ellipse.getCanvasEllipseCorners([canvasCoordinates[2], canvasCoordinates[3], canvasCoordinates[0], canvasCoordinates[1]]);
      } else {
        canvasCorners = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.math.ellipse.getCanvasEllipseCorners(canvasCoordinates);
      }
      const lineUID = `${index}`;
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawEllipse(svgDrawingHelper, annotationUID, lineUID, canvasCorners[0], canvasCorners[1], {
        color: options.color,
        width: options.lineWidth
      });
    });
    return canvasCoordinates;
  }
  renderTextBox(svgDrawingHelper, viewport, canvasCoordinates, canvasCoordinatesAdapter, annotation, styleSpecifier) {
    let options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
    if (!canvasCoordinates || !annotation) {
      return;
    }
    const {
      annotationUID,
      data = {}
    } = annotation;
    const {
      label
    } = data;
    const {
      color
    } = options;
    let adaptedCanvasCoordinates = canvasCoordinates;
    // adapt coordinates if there is an adapter
    if (typeof canvasCoordinatesAdapter === 'function') {
      adaptedCanvasCoordinates = canvasCoordinatesAdapter(canvasCoordinates);
    }
    const textLines = this._getTextBoxLinesFromLabels(label);
    const canvasTextBoxCoords = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.drawing.getTextBoxCoordsCanvas(adaptedCanvasCoordinates);
    annotation.data.handles.textBox.worldPosition = viewport.canvasToWorld(canvasTextBoxCoords);
    const textBoxPosition = viewport.worldToCanvas(annotation.data.handles.textBox.worldPosition);
    const textBoxUID = '1';
    const textBoxOptions = this.getLinkedTextBoxStyle(styleSpecifier, annotation);
    const boundingBox = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.drawing.drawLinkedTextBox(svgDrawingHelper, annotationUID, textBoxUID, textLines, textBoxPosition, canvasCoordinates, {}, {
      ...textBoxOptions,
      color
    });
    const {
      x: left,
      y: top,
      width,
      height
    } = boundingBox;
    annotation.data.handles.textBox.worldBoundingBox = {
      topLeft: viewport.canvasToWorld([left, top]),
      topRight: viewport.canvasToWorld([left + width, top]),
      bottomLeft: viewport.canvasToWorld([left, top + height]),
      bottomRight: viewport.canvasToWorld([left + width, top + height])
    };
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
DICOMSRDisplayTool.toolName = 'DICOMSRDisplay';
const SHORT_HAND_MAP = {
  'Short Axis': 'W: ',
  'Long Axis': 'L: ',
  AREA: 'Area: ',
  Length: '',
  CORNERSTONEFREETEXT: ''
};
function _labelToShorthand(label) {
  const shortHand = SHORT_HAND_MAP[label];
  if (shortHand !== undefined) {
    return shortHand;
  }
  return label;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DICOMSRDisplayTool, "DICOMSRDisplayTool", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts");
  reactHotLoader.register(SHORT_HAND_MAP, "SHORT_HAND_MAP", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts");
  reactHotLoader.register(_labelToShorthand, "_labelToShorthand", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTrackingUniqueIdentifiersForElement: () => (/* binding */ getTrackingUniqueIdentifiersForElement),
/* harmony export */   setActiveTrackingUniqueIdentifierForElement: () => (/* binding */ setActiveTrackingUniqueIdentifierForElement),
/* harmony export */   setTrackingUniqueIdentifiersForElement: () => (/* binding */ setTrackingUniqueIdentifiersForElement)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const state = {
  TrackingUniqueIdentifier: null,
  trackingIdentifiersByViewportId: {}
};

/**
 * This file is being used to store the per-viewport state of the SR tools,
 * Since, all the toolStates are added to the cornerstoneTools, when displaying the SRTools,
 * if there are two viewports rendering the same imageId, we don't want to show
 * the same SR annotation twice on irrelevant viewport, hence, we are storing the state
 * of the SR tools in state here, so that we can filter them later.
 */

function setTrackingUniqueIdentifiersForElement(element, trackingUniqueIdentifiers) {
  let activeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  const {
    viewport
  } = enabledElement;
  state.trackingIdentifiersByViewportId[viewport.id] = {
    trackingUniqueIdentifiers,
    activeIndex
  };
}
function setActiveTrackingUniqueIdentifierForElement(element, TrackingUniqueIdentifier) {
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  const {
    viewport
  } = enabledElement;
  const trackingIdentifiersForElement = state.trackingIdentifiersByViewportId[viewport.id];
  if (trackingIdentifiersForElement) {
    const activeIndex = trackingIdentifiersForElement.trackingUniqueIdentifiers.findIndex(tuid => tuid === TrackingUniqueIdentifier);
    trackingIdentifiersForElement.activeIndex = activeIndex;
  }
}
function getTrackingUniqueIdentifiersForElement(element) {
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  const {
    viewport
  } = enabledElement;
  if (state.trackingIdentifiersByViewportId[viewport.id]) {
    return state.trackingIdentifiersByViewportId[viewport.id];
  }
  return {
    trackingUniqueIdentifiers: []
  };
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(state, "state", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
  reactHotLoader.register(setTrackingUniqueIdentifiersForElement, "setTrackingUniqueIdentifiersForElement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
  reactHotLoader.register(setActiveTrackingUniqueIdentifierForElement, "setActiveTrackingUniqueIdentifierForElement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
  reactHotLoader.register(getTrackingUniqueIdentifiersForElement, "getTrackingUniqueIdentifiersForElement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/modules/dicomSRModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DICOMSRDisplayTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DICOMSRDisplayTool */ "../../../extensions/cornerstone-dicom-sr/src/tools/DICOMSRDisplayTool.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const toolNames = {
  DICOMSRDisplay: _DICOMSRDisplayTool__WEBPACK_IMPORTED_MODULE_0__["default"].toolName,
  SRLength: 'SRLength',
  SRBidirectional: 'SRBidirectional',
  SREllipticalROI: 'SREllipticalROI',
  SRCircleROI: 'SRCircleROI',
  SRArrowAnnotate: 'SRArrowAnnotate',
  SRAngle: 'SRAngle',
  SRCobbAngle: 'SRCobbAngle',
  SRRectangleROI: 'SRRectangleROI',
  SRPlanarFreehandROI: 'SRPlanarFreehandROI'
};
const _default = toolNames;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(toolNames, "toolNames", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addMeasurement)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _tools_toolNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/toolNames */ "../../../extensions/cornerstone-dicom-sr/src/tools/toolNames.ts");
/* harmony import */ var _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/scoordTypes */ "../../../extensions/cornerstone-dicom-sr/src/constants/scoordTypes.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const EPSILON = 1e-4;
const supportedLegacyCornerstoneTags = ['cornerstoneTools@^4.0.0'];
function addMeasurement(measurement, imageId, displaySetInstanceUID) {
  // TODO -> Render rotated ellipse .
  const toolName = _tools_toolNames__WEBPACK_IMPORTED_MODULE_3__["default"].DICOMSRDisplay;
  const measurementData = {
    TrackingUniqueIdentifier: measurement.TrackingUniqueIdentifier,
    renderableData: {},
    labels: measurement.labels,
    imageId
  };
  measurement.coords.forEach(coord => {
    const {
      GraphicType,
      GraphicData
    } = coord;
    if (measurementData.renderableData[GraphicType] === undefined) {
      measurementData.renderableData[GraphicType] = [];
    }
    measurementData.renderableData[GraphicType].push(_getRenderableData(GraphicType, GraphicData, imageId, measurement.TrackingIdentifier));
  });

  // Use the metadata provider to grab its imagePlaneModule metadata
  const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.get('imagePlaneModule', imageId);
  const annotationManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotationManager();

  // Create Cornerstone3D Annotation from measurement
  const frameNumber = measurement.coords[0].ReferencedSOPSequence && measurement.coords[0].ReferencedSOPSequence[0]?.ReferencedFrameNumber || 1;
  const SRAnnotation = {
    annotationUID: measurement.TrackingUniqueIdentifier,
    metadata: {
      FrameOfReferenceUID: imagePlaneModule.frameOfReferenceUID,
      toolName: toolName,
      referencedImageId: imageId
    },
    data: {
      label: measurement.labels,
      handles: {
        textBox: {}
      },
      cachedStats: {
        TrackingUniqueIdentifier: measurementData.TrackingUniqueIdentifier,
        renderableData: measurementData.renderableData
      },
      frameNumber: frameNumber
    }
  };
  annotationManager.addAnnotation(SRAnnotation);
  measurement.loaded = true;
  measurement.imageId = imageId;
  measurement.displaySetInstanceUID = displaySetInstanceUID;

  // Remove the unneeded coord now its processed, but keep the SOPInstanceUID.
  // NOTE: We assume that each SCOORD in the MeasurementGroup maps onto one frame,
  // It'd be super weird if it didn't anyway as a SCOORD.
  measurement.ReferencedSOPInstanceUID = measurement.coords[0].ReferencedSOPSequence.ReferencedSOPInstanceUID;
  measurement.frameNumber = frameNumber;
  delete measurement.coords;
}
function _getRenderableData(GraphicType, GraphicData, imageId, TrackingIdentifier) {
  const [cornerstoneTag, toolName] = TrackingIdentifier.split(':');
  let renderableData;
  switch (GraphicType) {
    case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_4__["default"].POINT:
    case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_4__["default"].MULTIPOINT:
    case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_4__["default"].POLYLINE:
      renderableData = [];
      for (let i = 0; i < GraphicData.length; i += 2) {
        const worldPos = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.imageToWorldCoords(imageId, [GraphicData[i], GraphicData[i + 1]]);
        renderableData.push(worldPos);
      }
      break;
    case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_4__["default"].CIRCLE:
      {
        const pointsWorld = [];
        for (let i = 0; i < GraphicData.length; i += 2) {
          const worldPos = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.imageToWorldCoords(imageId, [GraphicData[i], GraphicData[i + 1]]);
          pointsWorld.push(worldPos);
        }

        // We do not have an explicit draw circle svg helper in Cornerstone3D at
        // this time, but we can use the ellipse svg helper to draw a circle, so
        // here we reshape the data for that purpose.
        const center = pointsWorld[0];
        const onPerimeter = pointsWorld[1];
        const radius = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.distance(center, onPerimeter);
        const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.get('imagePlaneModule', imageId);
        if (!imagePlaneModule) {
          throw new Error('No imagePlaneModule found');
        }
        const {
          columnCosines,
          rowCosines
        } = imagePlaneModule;

        // we need to get major/minor axis (which are both the same size major = minor)

        // first axisStart
        const firstAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(firstAxisStart, center, columnCosines, radius);
        const firstAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(firstAxisEnd, center, columnCosines, -radius);

        // second axisStart
        const secondAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(secondAxisStart, center, rowCosines, radius);
        const secondAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(secondAxisEnd, center, rowCosines, -radius);
        renderableData = [firstAxisStart, firstAxisEnd, secondAxisStart, secondAxisEnd];
        break;
      }
    case _constants_scoordTypes__WEBPACK_IMPORTED_MODULE_4__["default"].ELLIPSE:
      {
        // GraphicData is ordered as [majorAxisStartX, majorAxisStartY, majorAxisEndX, majorAxisEndY, minorAxisStartX, minorAxisStartY, minorAxisEndX, minorAxisEndY]
        // But Cornerstone3D points are ordered as top, bottom, left, right for the
        // ellipse so we need to identify if the majorAxis is horizontal or vertical
        // and then choose the correct points to use for the ellipse.

        const pointsWorld = [];
        for (let i = 0; i < GraphicData.length; i += 2) {
          const worldPos = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.imageToWorldCoords(imageId, [GraphicData[i], GraphicData[i + 1]]);
          pointsWorld.push(worldPos);
        }
        const majorAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[0]);
        const majorAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[1]);
        const minorAxisStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[2]);
        const minorAxisEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...pointsWorld[3]);
        const majorAxisVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.sub(majorAxisVec, majorAxisEnd, majorAxisStart);

        // normalize majorAxisVec to avoid scaling issues
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.normalize(majorAxisVec, majorAxisVec);
        const minorAxisVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.sub(minorAxisVec, minorAxisEnd, minorAxisStart);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.normalize(minorAxisVec, minorAxisVec);
        const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.get('imagePlaneModule', imageId);
        if (!imagePlaneModule) {
          throw new Error('imageId does not have imagePlaneModule metadata');
        }
        const {
          columnCosines
        } = imagePlaneModule;

        // find which axis is parallel to the columnCosines
        const columnCosinesVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(...columnCosines);
        const projectedMajorAxisOnColVec = Math.abs(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.dot(columnCosinesVec, majorAxisVec));
        const projectedMinorAxisOnColVec = Math.abs(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.dot(columnCosinesVec, minorAxisVec));
        const absoluteOfMajorDotProduct = Math.abs(projectedMajorAxisOnColVec);
        const absoluteOfMinorDotProduct = Math.abs(projectedMinorAxisOnColVec);
        renderableData = [];
        if (Math.abs(absoluteOfMajorDotProduct - 1) < EPSILON) {
          renderableData = [pointsWorld[0], pointsWorld[1], pointsWorld[2], pointsWorld[3]];
        } else if (Math.abs(absoluteOfMinorDotProduct - 1) < EPSILON) {
          renderableData = [pointsWorld[2], pointsWorld[3], pointsWorld[0], pointsWorld[1]];
        } else {
          console.warn('OBLIQUE ELLIPSE NOT YET SUPPORTED');
        }
        break;
      }
    default:
      console.warn('Unsupported GraphicType:', GraphicType);
  }
  return renderableData;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EPSILON, "EPSILON", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts");
  reactHotLoader.register(supportedLegacyCornerstoneTags, "supportedLegacyCornerstoneTags", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts");
  reactHotLoader.register(addMeasurement, "addMeasurement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts");
  reactHotLoader.register(_getRenderableData, "_getRenderableData", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/addMeasurement.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addToolInstance)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function addToolInstance(name, toolClass, configuration) {
  class InstanceClass extends toolClass {}
  InstanceClass.toolName = name;
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(InstanceClass);
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(addToolInstance, "addToolInstance", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/addToolInstance.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const ImageSet = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.ImageSet;
const findInstance = (measurement, displaySetService) => {
  const {
    displaySetInstanceUID,
    ReferencedSOPInstanceUID: sopUid
  } = measurement;
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  if (!referencedDisplaySet.images) return;
  return referencedDisplaySet.images.find(it => it.SOPInstanceUID === sopUid);
};

/** Finds references to display sets inside the measurements
 * contained within the provided display set.
 * @return an array of instances referenced.
 */
const findReferencedInstances = (displaySetService, displaySet) => {
  const instances = [];
  const instanceById = {};
  for (const measurement of displaySet.measurements) {
    const {
      imageId
    } = measurement;
    if (!imageId) continue;
    if (instanceById[imageId]) continue;
    const instance = findInstance(measurement, displaySetService);
    if (!instance) {
      console.log('Measurement', measurement, 'had no instances found');
      continue;
    }
    instanceById[imageId] = instance;
    instances.push(instance);
  }
  return instances;
};

/**
 * Creates a new display set containing a single image instance for each
 * referenced image.
 *
 * @param displaySetService
 * @param displaySet - containing measurements referencing images.
 * @returns A new (registered/active) display set containing the referenced images
 */
const createReferencedImageDisplaySet = (displaySetService, displaySet) => {
  const instances = findReferencedInstances(displaySetService, displaySet);
  // This will be a  member function of the created image set
  const updateInstances = function () {
    this.images.splice(0, this.images.length, ...findReferencedInstances(displaySetService, displaySet));
    this.numImageFrames = this.images.length;
  };
  const imageSet = new ImageSet(instances);
  const instance = instances[0];
  imageSet.setAttributes({
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: imageSet.uid,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: `${displaySet.SeriesDescription} KO ${displaySet.instance.SeriesNumber}`,
    Modality: 'KO',
    isMultiFrame: false,
    numImageFrames: instances.length,
    SOPClassHandlerId: `@ohif/extension-default.sopClassHandlerModule.stack`,
    isReconstructable: false,
    // This object is made of multiple instances from other series
    isCompositeStack: true,
    madeInClient: true,
    excludeFromThumbnailBrowser: true,
    updateInstances
  });
  displaySetService.addDisplaySets(imageSet);
  return imageSet;
};
const _default = createReferencedImageDisplaySet;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ImageSet, "ImageSet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
  reactHotLoader.register(findInstance, "findInstance", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
  reactHotLoader.register(findReferencedInstances, "findReferencedInstances", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
  reactHotLoader.register(createReferencedImageDisplaySet, "createReferencedImageDisplaySet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/createReferencedImageDisplaySet.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const {
  log
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"];
function getFilteredCornerstoneToolState(measurementData, additionalFindingTypes) {
  const filteredToolState = {};
  function addToFilteredToolState(annotation, toolType) {
    if (!annotation.metadata?.referencedImageId) {
      log.warn(`[DICOMSR] No referencedImageId found for ${toolType} ${annotation.id}`);
      return;
    }
    const imageId = annotation.metadata.referencedImageId;
    if (!filteredToolState[imageId]) {
      filteredToolState[imageId] = {};
    }
    const imageIdSpecificToolState = filteredToolState[imageId];
    if (!imageIdSpecificToolState[toolType]) {
      imageIdSpecificToolState[toolType] = {
        data: []
      };
    }
    const measurementDataI = measurementData.find(md => md.uid === annotation.annotationUID);
    const toolData = imageIdSpecificToolState[toolType].data;
    let {
      finding
    } = measurementDataI;
    const findingSites = [];

    // NOTE -> We use the CORNERSTONEJS coding schemeDesignator which we have
    // defined in the @cornerstonejs/adapters
    if (measurementDataI.label) {
      if (additionalFindingTypes.includes(toolType)) {
        finding = {
          CodeValue: 'CORNERSTONEFREETEXT',
          CodingSchemeDesignator: 'CORNERSTONEJS',
          CodeMeaning: measurementDataI.label
        };
      } else {
        findingSites.push({
          CodeValue: 'CORNERSTONEFREETEXT',
          CodingSchemeDesignator: 'CORNERSTONEJS',
          CodeMeaning: measurementDataI.label
        });
      }
    }
    if (measurementDataI.findingSites) {
      findingSites.push(...measurementDataI.findingSites);
    }
    const measurement = Object.assign({}, annotation, {
      finding,
      findingSites
    });
    toolData.push(measurement);
  }
  const uidFilter = measurementData.map(md => md.uid);
  const uids = uidFilter.slice();
  const annotationManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotationManager();
  const framesOfReference = annotationManager.getFramesOfReference();
  for (let i = 0; i < framesOfReference.length; i++) {
    const frameOfReference = framesOfReference[i];
    const frameOfReferenceAnnotations = annotationManager.getAnnotations(frameOfReference);
    const toolTypes = Object.keys(frameOfReferenceAnnotations);
    for (let j = 0; j < toolTypes.length; j++) {
      const toolType = toolTypes[j];
      const annotations = frameOfReferenceAnnotations[toolType];
      if (annotations) {
        for (let k = 0; k < annotations.length; k++) {
          const annotation = annotations[k];
          const uidIndex = uids.findIndex(uid => uid === annotation.annotationUID);
          if (uidIndex !== -1) {
            addToFilteredToolState(annotation, toolType);
            uids.splice(uidIndex, 1);
            if (!uids.length) {
              return filteredToolState;
            }
          }
        }
      }
    }
  }
  return filteredToolState;
}
const _default = getFilteredCornerstoneToolState;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(log, "log", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts");
  reactHotLoader.register(getFilteredCornerstoneToolState, "getFilteredCornerstoneToolState", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/getFilteredCornerstoneToolState.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLabelFromDCMJSImportedToolData)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
/**
 * Extracts the label from the toolData imported from dcmjs. We need to do this
 * as dcmjs does not depeend on OHIF/the measurementService, it just produces data for cornestoneTools.
 * This optional data is available for the consumer to process if they wish to.
 * @param {object} toolData The tooldata relating to the
 *
 * @returns {string} The extracted label.
 */
function getLabelFromDCMJSImportedToolData(toolData) {
  const {
    findingSites = [],
    finding
  } = toolData;
  let freeTextLabel = findingSites.find(fs => fs.CodeValue === 'CORNERSTONEFREETEXT');
  if (freeTextLabel) {
    return freeTextLabel.CodeMeaning;
  }
  if (finding && finding.CodeValue === 'CORNERSTONEFREETEXT') {
    return finding.CodeMeaning;
  }
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getLabelFromDCMJSImportedToolData, "getLabelFromDCMJSImportedToolData", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hydrateStructuredReport)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _getLabelFromDCMJSImportedToolData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getLabelFromDCMJSImportedToolData */ "../../../extensions/cornerstone-dicom-sr/src/utils/getLabelFromDCMJSImportedToolData.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/@cornerstonejs/adapters.es.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const {
  guid
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__["default"].utils;
const {
  MeasurementReport,
  CORNERSTONE_3D_TAG
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_3__.adaptersSR.Cornerstone3D;
const CORNERSTONE_3D_TOOLS_SOURCE_NAME = 'Cornerstone3DTools';
const CORNERSTONE_3D_TOOLS_SOURCE_VERSION = '0.1';
const supportedLegacyCornerstoneTags = ['cornerstoneTools@^4.0.0'];
const convertCode = (codingValues, code) => {
  if (!code || code.CodingSchemeDesignator === 'CORNERSTONEJS') return;
  const ref = `${code.CodingSchemeDesignator}:${code.CodeValue}`;
  const ret = {
    ...codingValues[ref],
    ref,
    ...code,
    text: code.CodeMeaning
  };
  return ret;
};
const convertSites = (codingValues, sites) => {
  if (!sites || !sites.length) return;
  const ret = [];
  // Do as a loop to convert away from Proxy instances
  for (let i = 0; i < sites.length; i++) {
    // Deal with irregular conversion from dcmjs
    const site = convertCode(codingValues, sites[i][0] || sites[i]);
    if (site) ret.push(site);
  }
  return ret.length && ret || undefined;
};

/**
 * Hydrates a structured report, for default viewports.
 *
 */
function hydrateStructuredReport(_ref, displaySetInstanceUID) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const dataSource = extensionManager.getActiveDataSource()[0];
  const {
    measurementService,
    displaySetService,
    customizationService
  } = servicesManager.services;
  const codingValues = customizationService.getCustomization('codingValues', {});
  const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

  // TODO -> We should define a strict versioning somewhere.
  const mappings = measurementService.getSourceMappings(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  if (!mappings || !mappings.length) {
    throw new Error(`Attempting to hydrate measurements service when no mappings present. This shouldn't be reached.`);
  }
  const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.getInstance(displaySet.StudyInstanceUID, displaySet.SeriesInstanceUID, displaySet.SOPInstanceUID);
  const sopInstanceUIDToImageId = {};
  const imageIdsForToolState = {};
  displaySet.measurements.forEach(measurement => {
    const {
      ReferencedSOPInstanceUID,
      imageId,
      frameNumber
    } = measurement;
    if (!sopInstanceUIDToImageId[ReferencedSOPInstanceUID]) {
      sopInstanceUIDToImageId[ReferencedSOPInstanceUID] = imageId;
      imageIdsForToolState[ReferencedSOPInstanceUID] = [];
    }
    if (!imageIdsForToolState[ReferencedSOPInstanceUID][frameNumber]) {
      imageIdsForToolState[ReferencedSOPInstanceUID][frameNumber] = imageId;
    }
  });
  const datasetToUse = _mapLegacyDataSet(instance);

  // Use dcmjs to generate toolState.
  const storedMeasurementByAnnotationType = MeasurementReport.generateToolState(datasetToUse,
  // NOTE: we need to pass in the imageIds to dcmjs since the we use them
  // for the imageToWorld transformation. The following assumes that the order
  // that measurements were added to the display set are the same order as
  // the measurementGroups in the instance.
  sopInstanceUIDToImageId, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.imageToWorldCoords, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData);

  // Filter what is found by DICOM SR to measurements we support.
  const mappingDefinitions = mappings.map(m => m.annotationType);
  const hydratableMeasurementsInSR = {};
  Object.keys(storedMeasurementByAnnotationType).forEach(key => {
    if (mappingDefinitions.includes(key)) {
      hydratableMeasurementsInSR[key] = storedMeasurementByAnnotationType[key];
    }
  });

  // Set the series touched as tracked.
  const imageIds = [];

  // TODO: notification if no hydratable?
  Object.keys(hydratableMeasurementsInSR).forEach(annotationType => {
    const toolDataForAnnotationType = hydratableMeasurementsInSR[annotationType];
    toolDataForAnnotationType.forEach(toolData => {
      // Add the measurement to toolState
      // dcmjs and Cornerstone3D has structural defect in supporting multi-frame
      // files, and looking up the imageId from sopInstanceUIDToImageId results
      // in the wrong value.
      const frameNumber = toolData.annotation.data && toolData.annotation.data.frameNumber || 1;
      const imageId = imageIdsForToolState[toolData.sopInstanceUid][frameNumber] || sopInstanceUIDToImageId[toolData.sopInstanceUid];
      if (!imageIds.includes(imageId)) {
        imageIds.push(imageId);
      }
    });
  });
  let targetStudyInstanceUID;
  const SeriesInstanceUIDs = [];
  for (let i = 0; i < imageIds.length; i++) {
    const imageId = imageIds[i];
    const {
      SeriesInstanceUID,
      StudyInstanceUID
    } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('instance', imageId);
    if (!SeriesInstanceUIDs.includes(SeriesInstanceUID)) {
      SeriesInstanceUIDs.push(SeriesInstanceUID);
    }
    if (!targetStudyInstanceUID) {
      targetStudyInstanceUID = StudyInstanceUID;
    } else if (targetStudyInstanceUID !== StudyInstanceUID) {
      console.warn('NO SUPPORT FOR SRs THAT HAVE MEASUREMENTS FROM MULTIPLE STUDIES.');
    }
  }
  Object.keys(hydratableMeasurementsInSR).forEach(annotationType => {
    const toolDataForAnnotationType = hydratableMeasurementsInSR[annotationType];
    toolDataForAnnotationType.forEach(toolData => {
      // Add the measurement to toolState
      // dcmjs and Cornerstone3D has structural defect in supporting multi-frame
      // files, and looking up the imageId from sopInstanceUIDToImageId results
      // in the wrong value.
      const frameNumber = toolData.annotation.data && toolData.annotation.data.frameNumber || 1;
      const imageId = imageIdsForToolState[toolData.sopInstanceUid][frameNumber] || sopInstanceUIDToImageId[toolData.sopInstanceUid];
      toolData.uid = guid();
      const instance = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('instance', imageId);
      const {
        FrameOfReferenceUID
        // SOPInstanceUID,
        // SeriesInstanceUID,
        // StudyInstanceUID,
      } = instance;
      const annotation = {
        annotationUID: toolData.annotation.annotationUID,
        data: toolData.annotation.data,
        metadata: {
          toolName: annotationType,
          referencedImageId: imageId,
          FrameOfReferenceUID
        }
      };
      const source = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
      annotation.data.label = (0,_getLabelFromDCMJSImportedToolData__WEBPACK_IMPORTED_MODULE_2__["default"])(toolData);
      annotation.data.finding = convertCode(codingValues, toolData.finding?.[0]);
      annotation.data.findingSites = convertSites(codingValues, toolData.findingSites);
      annotation.data.site = annotation.data.findingSites?.[0];
      const matchingMapping = mappings.find(m => m.annotationType === annotationType);
      measurementService.addRawMeasurement(source, annotationType, {
        annotation
      }, matchingMapping.toMeasurementSchema, dataSource);
      if (!imageIds.includes(imageId)) {
        imageIds.push(imageId);
      }
    });
  });
  displaySet.isHydrated = true;
  return {
    StudyInstanceUID: targetStudyInstanceUID,
    SeriesInstanceUIDs
  };
}
function _mapLegacyDataSet(dataset) {
  const REPORT = 'Imaging Measurements';
  const GROUP = 'Measurement Group';
  const TRACKING_IDENTIFIER = 'Tracking Identifier';

  // Identify the Imaging Measurements
  const imagingMeasurementContent = toArray(dataset.ContentSequence).find(codeMeaningEquals(REPORT));

  // Retrieve the Measurements themselves
  const measurementGroups = toArray(imagingMeasurementContent.ContentSequence).filter(codeMeaningEquals(GROUP));

  // For each of the supported measurement types, compute the measurement data
  const measurementData = {};
  const cornerstoneToolClasses = MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE;
  const registeredToolClasses = [];
  Object.keys(cornerstoneToolClasses).forEach(key => {
    registeredToolClasses.push(cornerstoneToolClasses[key]);
    measurementData[key] = [];
  });
  measurementGroups.forEach((measurementGroup, index) => {
    const measurementGroupContentSequence = toArray(measurementGroup.ContentSequence);
    const TrackingIdentifierGroup = measurementGroupContentSequence.find(contentItem => contentItem.ConceptNameCodeSequence.CodeMeaning === TRACKING_IDENTIFIER);
    const TrackingIdentifier = TrackingIdentifierGroup.TextValue;
    let [cornerstoneTag, toolName] = TrackingIdentifier.split(':');
    if (supportedLegacyCornerstoneTags.includes(cornerstoneTag)) {
      cornerstoneTag = CORNERSTONE_3D_TAG;
    }
    const mappedTrackingIdentifier = `${cornerstoneTag}:${toolName}`;
    TrackingIdentifierGroup.TextValue = mappedTrackingIdentifier;
  });
  return dataset;
}
const toArray = function (x) {
  return Array.isArray(x) ? x : [x];
};
const codeMeaningEquals = codeMeaningName => {
  return contentItem => {
    return contentItem.ConceptNameCodeSequence.CodeMeaning === codeMeaningName;
  };
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(guid, "guid", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(MeasurementReport, "MeasurementReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(CORNERSTONE_3D_TAG, "CORNERSTONE_3D_TAG", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(CORNERSTONE_3D_TOOLS_SOURCE_NAME, "CORNERSTONE_3D_TOOLS_SOURCE_NAME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(CORNERSTONE_3D_TOOLS_SOURCE_VERSION, "CORNERSTONE_3D_TOOLS_SOURCE_VERSION", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(supportedLegacyCornerstoneTags, "supportedLegacyCornerstoneTags", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(convertCode, "convertCode", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(convertSites, "convertSites", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(hydrateStructuredReport, "hydrateStructuredReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(_mapLegacyDataSet, "_mapLegacyDataSet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(toArray, "toArray", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
  reactHotLoader.register(codeMeaningEquals, "codeMeaningEquals", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/hydrateStructuredReport.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js":
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isRehydratable)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/@cornerstonejs/adapters.es.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const cornerstoneAdapters = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_0__.adaptersSR.Cornerstone3D.MeasurementReport.CORNERSTONE_TOOL_CLASSES_BY_UTILITY_TYPE;
const supportedLegacyCornerstoneTags = ['cornerstoneTools@^4.0.0'];
const CORNERSTONE_3D_TAG = cornerstoneAdapters.CORNERSTONE_3D_TAG;

/**
 * Checks if the given `displaySet`can be rehydrated into the `measurementService`.
 *
 * @param {object} displaySet The SR `displaySet` to check.
 * @param {object[]} mappings The CornerstoneTools 4 mappings to the `measurementService`.
 * @returns {boolean} True if the SR can be rehydrated into the `measurementService`.
 */
function isRehydratable(displaySet, mappings) {
  if (!mappings || !mappings.length) {
    return false;
  }
  const mappingDefinitions = mappings.map(m => m.annotationType);
  const {
    measurements
  } = displaySet;
  const adapterKeys = Object.keys(cornerstoneAdapters).filter(adapterKey => typeof cornerstoneAdapters[adapterKey].isValidCornerstoneTrackingIdentifier === 'function');
  const adapters = [];
  adapterKeys.forEach(key => {
    if (mappingDefinitions.includes(key)) {
      // Must have both a dcmjs adapter and a measurementService
      // Definition in order to be a candidate for import.
      adapters.push(cornerstoneAdapters[key]);
    }
  });
  for (let i = 0; i < measurements.length; i++) {
    const {
      TrackingIdentifier
    } = measurements[i] || {};
    const hydratable = adapters.some(adapter => {
      let [cornerstoneTag, toolName] = TrackingIdentifier.split(':');
      if (supportedLegacyCornerstoneTags.includes(cornerstoneTag)) {
        cornerstoneTag = CORNERSTONE_3D_TAG;
      }
      const mappedTrackingIdentifier = `${cornerstoneTag}:${toolName}`;
      return adapter.isValidCornerstoneTrackingIdentifier(mappedTrackingIdentifier);
    });
    if (hydratable) {
      return true;
    }
    console.log('Measurement is not rehydratable', TrackingIdentifier, measurements[i]);
  }
  console.log('No measurements found which were rehydratable');
  return false;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(cornerstoneAdapters, "cornerstoneAdapters", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js");
  reactHotLoader.register(supportedLegacyCornerstoneTags, "supportedLegacyCornerstoneTags", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js");
  reactHotLoader.register(CORNERSTONE_3D_TAG, "CORNERSTONE_3D_TAG", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js");
  reactHotLoader.register(isRehydratable, "isRehydratable", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-sr/src/utils/isRehydratable.js");
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

/***/ "../../../extensions/cornerstone-dicom-sr/package.json":
/*!*************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-sr/package.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-sr","version":"3.6.0","description":"OHIF extension for an SR Cornerstone Viewport","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-cornerstone-dicom-sr.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"keywords":["ohif-extension"],"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-cornerstone":"3.6.0","@ohif/extension-measurement-tracking":"3.6.0","@ohif/ui":"3.6.0","dcmjs":"^0.29.5","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^17.0.2"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/adapters":"^1.1.0","@cornerstonejs/core":"^1.1.0","@cornerstonejs/tools":"^1.1.0","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-sr_src_index_tsx.js.map