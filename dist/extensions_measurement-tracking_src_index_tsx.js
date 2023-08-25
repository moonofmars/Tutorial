"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_measurement-tracking_src_index_tsx"],{

/***/ "../../../extensions/measurement-tracking/src/_shared/PROMPT_RESPONSES.js":
/*!********************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/_shared/PROMPT_RESPONSES.js ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
const _default = RESPONSE;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/PROMPT_RESPONSES.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/PROMPT_RESPONSES.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/_shared/createReportAsync.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/_shared/createReportAsync.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/**
 *
 * @param {*} servicesManager
 * @param {*} dataSource
 * @param {*} measurements
 * @param {*} options
 * @returns {string[]} displaySetInstanceUIDs
 */
async function createReportAsync(servicesManager, commandsManager, dataSource, measurements, options) {
  const {
    displaySetService,
    uiNotificationService,
    uiDialogService
  } = servicesManager.services;
  const loadingDialogId = uiDialogService.create({
    showOverlay: true,
    isDraggable: false,
    centralize: true,
    // TODO: Create a loading indicator component + zeplin design?
    content: Loading
  });
  try {
    const naturalizedReport = await commandsManager.runCommand('storeMeasurements', {
      measurementData: measurements,
      dataSource,
      additionalFindingTypes: ['ArrowAnnotate'],
      options
    }, 'CORNERSTONE_STRUCTURED_REPORT');

    // The "Mode" route listens for DicomMetadataStore changes
    // When a new instance is added, it listens and
    // automatically calls makeDisplaySets
    _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances([naturalizedReport], true);
    const displaySetInstanceUID = displaySetService.getMostRecentDisplaySet();
    uiNotificationService.show({
      title: 'Create Report',
      message: 'Measurements saved successfully',
      type: 'success'
    });
    return [displaySetInstanceUID];
  } catch (error) {
    uiNotificationService.show({
      title: 'Create Report',
      message: error.message || 'Failed to store measurements',
      type: 'error'
    });
  } finally {
    uiDialogService.dismiss({
      id: loadingDialogId
    });
  }
}
function Loading() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-primary-active"
  }, "Loading...");
}
const _default = createReportAsync;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(createReportAsync, "createReportAsync", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/createReportAsync.tsx");
  reactHotLoader.register(Loading, "Loading", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/createReportAsync.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/createReportAsync.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/_shared/createReportDialogPrompt.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/_shared/createReportDialogPrompt.tsx ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createReportDialogPrompt)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PROMPT_RESPONSES */ "../../../extensions/measurement-tracking/src/_shared/PROMPT_RESPONSES.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
/* eslint-disable react/display-name */



function createReportDialogPrompt(uiDialogService) {
  return new Promise(function (resolve, reject) {
    let dialogId = undefined;
    const _handleClose = () => {
      // Dismiss dialog
      uiDialogService.dismiss({
        id: dialogId
      });
      // Notify of cancel action
      resolve({
        action: _PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CANCEL,
        value: undefined
      });
    };

    /**
     *
     * @param {string} param0.action - value of action performed
     * @param {string} param0.value - value from input field
     */
    const _handleFormSubmit = _ref => {
      let {
        action,
        value
      } = _ref;
      uiDialogService.dismiss({
        id: dialogId
      });
      switch (action.id) {
        case 'save':
          resolve({
            action: _PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CREATE_REPORT,
            value: value.label
          });
          break;
        case 'cancel':
          resolve({
            action: _PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CANCEL,
            value: undefined
          });
          break;
      }
    };
    dialogId = uiDialogService.create({
      centralize: true,
      isDraggable: false,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Dialog,
      useLastPosition: false,
      showOverlay: true,
      contentProps: {
        title: 'Create Report',
        value: {
          label: ''
        },
        noCloseButton: true,
        onClose: _handleClose,
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: 'primary'
        }, {
          id: 'save',
          text: 'Save',
          type: 'secondary'
        }],
        // TODO: Should be on button press...
        onSubmit: _handleFormSubmit,
        body: _ref2 => {
          let {
            value,
            setValue
          } = _ref2;
          const onChangeHandler = event => {
            event.persist();
            setValue(value => ({
              ...value,
              label: event.target.value
            }));
          };
          const onKeyPressHandler = event => {
            if (event.key === 'Enter') {
              uiDialogService.dismiss({
                id: dialogId
              });
              resolve({
                action: _PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CREATE_REPORT,
                value: value.label
              });
            }
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: ""
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
            label: "Enter the report name",
            labelClassName: "text-white grow leading-[1.2] text-[14px]",
            autoFocus: true,
            className: "bg-black border-primary-main grow",
            type: "text",
            value: value.label,
            onChange: onChangeHandler,
            onKeyPress: onKeyPressHandler
          }));
        }
      }
    });
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(createReportDialogPrompt, "createReportDialogPrompt", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/createReportDialogPrompt.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/_shared/getNextSRSeriesNumber.js":
/*!*************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/_shared/getNextSRSeriesNumber.js ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNextSRSeriesNumber)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const MIN_SR_SERIES_NUMBER = 4700;
function getNextSRSeriesNumber(displaySetService) {
  const activeDisplaySets = displaySetService.getActiveDisplaySets();
  const srDisplaySets = activeDisplaySets.filter(ds => ds.Modality === 'SR');
  const srSeriesNumbers = srDisplaySets.map(ds => ds.SeriesNumber);
  const maxSeriesNumber = Math.max(...srSeriesNumbers, MIN_SR_SERIES_NUMBER);
  return maxSeriesNumber + 1;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(MIN_SR_SERIES_NUMBER, "MIN_SR_SERIES_NUMBER", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/getNextSRSeriesNumber.js");
  reactHotLoader.register(getNextSRSeriesNumber, "getNextSRSeriesNumber", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/_shared/getNextSRSeriesNumber.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx":
/*!***********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx ***!
  \***********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsContext: () => (/* binding */ TrackedMeasurementsContext),
/* harmony export */   TrackedMeasurementsContextProvider: () => (/* binding */ TrackedMeasurementsContextProvider),
/* harmony export */   useTrackedMeasurements: () => (/* binding */ useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xstate */ "../../../node_modules/xstate/es/index.js");
/* harmony import */ var _xstate_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @xstate/react */ "../../../node_modules/@xstate/react/lib/index.js");
/* harmony import */ var _xstate_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_xstate_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./measurementTrackingMachine */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js");
/* harmony import */ var _promptBeginTracking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./promptBeginTracking */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
/* harmony import */ var _promptTrackNewSeries__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./promptTrackNewSeries */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
/* harmony import */ var _promptTrackNewStudy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./promptTrackNewStudy */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js");
/* harmony import */ var _promptSaveReport__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./promptSaveReport */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptSaveReport.js");
/* harmony import */ var _promptHydrateStructuredReport__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./promptHydrateStructuredReport */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js");
/* harmony import */ var _hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hydrateStructuredReport */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};












const TrackedMeasurementsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext();
TrackedMeasurementsContext.displayName = 'TrackedMeasurementsContext';
const useTrackedMeasurements = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TrackedMeasurementsContext);
__signature__(useTrackedMeasurements, "useContext{}");
const SR_SOPCLASSHANDLERID = '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr';

/**
 *
 * @param {*} param0
 */
function TrackedMeasurementsContextProvider(_ref, // Bound by consumer
_ref2 // Component props
) {
  let {
    servicesManager,
    commandsManager,
    extensionManager
  } = _ref;
  let {
    children
  } = _ref2;
  const [viewportGrid, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.useViewportGrid)();
  const {
    activeViewportIndex,
    viewports
  } = viewportGrid;
  const {
    measurementService,
    displaySetService
  } = servicesManager.services;
  const machineOptions = Object.assign({}, _measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__.defaultOptions);
  machineOptions.actions = Object.assign({}, machineOptions.actions, {
    jumpToFirstMeasurementInActiveViewport: (ctx, evt) => {
      const {
        trackedStudy,
        trackedSeries
      } = ctx;
      const measurements = measurementService.getMeasurements();
      const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID));
      console.log('jumping to measurement reset viewport', viewportGrid.activeViewportIndex, trackedMeasurements[0]);
      const referencedDisplaySetUID = trackedMeasurements[0].displaySetInstanceUID;
      const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetUID);
      const referencedImages = referencedDisplaySet.images;
      const isVolumeIdReferenced = referencedImages[0].imageId.startsWith('volumeId');
      const measurementData = trackedMeasurements[0].data;
      let imageIndex = 0;
      if (!isVolumeIdReferenced && measurementData) {
        // if it is imageId referenced find the index of the imageId, we don't have
        // support for volumeId referenced images yet
        imageIndex = referencedImages.findIndex(image => {
          const imageIdToUse = Object.keys(measurementData)[0].substring(8);
          return image.imageId === imageIdToUse;
        });
        if (imageIndex === -1) {
          console.warn('Could not find image index for tracked measurement, using 0');
          imageIndex = 0;
        }
      }
      viewportGridService.setDisplaySetsForViewport({
        viewportIndex: viewportGrid.activeViewportIndex,
        displaySetInstanceUIDs: [referencedDisplaySetUID],
        viewportOptions: {
          initialImageOptions: {
            index: imageIndex
          }
        }
      });
    },
    showStructuredReportDisplaySetInActiveViewport: (ctx, evt) => {
      if (evt.data.createdDisplaySetInstanceUIDs.length > 0) {
        const StructuredReportDisplaySetInstanceUID = evt.data.createdDisplaySetInstanceUIDs[0].displaySetInstanceUID;
        viewportGridService.setDisplaySetsForViewport({
          viewportIndex: evt.data.viewportIndex,
          displaySetInstanceUIDs: [StructuredReportDisplaySetInstanceUID]
        });
      }
    },
    discardPreviouslyTrackedMeasurements: (ctx, evt) => {
      const measurements = measurementService.getMeasurements();
      const filteredMeasurements = measurements.filter(ms => ctx.prevTrackedSeries.includes(ms.referenceSeriesUID));
      const measurementIds = filteredMeasurements.map(fm => fm.id);
      for (let i = 0; i < measurementIds.length; i++) {
        measurementService.remove(measurementIds[i]);
      }
    },
    clearAllMeasurements: (ctx, evt) => {
      const measurements = measurementService.getMeasurements();
      const measurementIds = measurements.map(fm => fm.uid);
      for (let i = 0; i < measurementIds.length; i++) {
        measurementService.remove(measurementIds[i]);
      }
    }
  });
  machineOptions.services = Object.assign({}, machineOptions.services, {
    promptBeginTracking: _promptBeginTracking__WEBPACK_IMPORTED_MODULE_6__["default"].bind(null, {
      servicesManager,
      extensionManager
    }),
    promptTrackNewSeries: _promptTrackNewSeries__WEBPACK_IMPORTED_MODULE_7__["default"].bind(null, {
      servicesManager,
      extensionManager
    }),
    promptTrackNewStudy: _promptTrackNewStudy__WEBPACK_IMPORTED_MODULE_8__["default"].bind(null, {
      servicesManager,
      extensionManager
    }),
    promptSaveReport: _promptSaveReport__WEBPACK_IMPORTED_MODULE_9__["default"].bind(null, {
      servicesManager,
      commandsManager,
      extensionManager
    }),
    promptHydrateStructuredReport: _promptHydrateStructuredReport__WEBPACK_IMPORTED_MODULE_10__["default"].bind(null, {
      servicesManager,
      extensionManager
    }),
    hydrateStructuredReport: _hydrateStructuredReport__WEBPACK_IMPORTED_MODULE_11__["default"].bind(null, {
      servicesManager,
      extensionManager
    })
  });

  // TODO: IMPROVE
  // - Add measurement_updated to cornerstone; debounced? (ext side, or consumption?)
  // - Friendlier transition/api in front of measurementTracking machine?
  // - Blocked: viewport overlay shouldn't clip when resized
  // TODO: PRIORITY
  // - Fix "ellipses" series description dynamic truncate length
  // - Fix viewport border resize
  // - created/destroyed hooks for extensions (cornerstone measurement subscriptions in it's `init`)

  const measurementTrackingMachine = (0,xstate__WEBPACK_IMPORTED_MODULE_2__.Machine)(_measurementTrackingMachine__WEBPACK_IMPORTED_MODULE_5__.machineConfiguration, machineOptions);
  const [trackedMeasurements, sendTrackedMeasurementsEvent, trackedMeasurementsService] = (0,_xstate_react__WEBPACK_IMPORTED_MODULE_3__.useMachine)(measurementTrackingMachine);

  // ~~ Listen for changes to ViewportGrid for potential SRs hung in panes when idle
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (viewports.length > 0) {
      const activeViewport = viewports[activeViewportIndex];
      if (!activeViewport || !activeViewport?.displaySetInstanceUIDs?.length) {
        return;
      }

      // Todo: Getting the first displaySetInstanceUID is wrong, but we don't have
      // tracking fusion viewports yet. This should change when we do.
      const {
        displaySetService
      } = servicesManager.services;
      const displaySet = displaySetService.getDisplaySetByUID(activeViewport.displaySetInstanceUIDs[0]);
      if (!displaySet) {
        return;
      }

      // If this is an SR produced by our SR SOPClassHandler,
      // and it hasn't been loaded yet, do that now so we
      // can check if it can be rehydrated or not.
      //
      // Note: This happens:
      // - If the viewport is not currently an OHIFCornerstoneSRViewport
      // - If the displaySet has never been hung
      //
      // Otherwise, the displaySet will be loaded by the useEffect handler
      // listening to displaySet changes inside OHIFCornerstoneSRViewport.
      // The issue here is that this handler in TrackedMeasurementsContext
      // ends up occurring before the Viewport is created, so the displaySet
      // is not loaded yet, and isRehydratable is undefined unless we call load().
      if (displaySet.SOPClassHandlerId === SR_SOPCLASSHANDLERID && !displaySet.isLoaded && displaySet.load) {
        displaySet.load();
      }

      // Magic string
      // load function added by our sopClassHandler module
      if (displaySet.SOPClassHandlerId === SR_SOPCLASSHANDLERID && displaySet.isRehydratable === true) {
        console.log('sending event...', trackedMeasurements);
        sendTrackedMeasurementsEvent('PROMPT_HYDRATE_SR', {
          displaySetInstanceUID: displaySet.displaySetInstanceUID,
          SeriesInstanceUID: displaySet.SeriesInstanceUID,
          viewportIndex: activeViewportIndex
        });
      }
    }
  }, [activeViewportIndex, sendTrackedMeasurementsEvent, servicesManager.services, viewports]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TrackedMeasurementsContext.Provider, {
    value: [trackedMeasurements, sendTrackedMeasurementsEvent]
  }, children);
}
__signature__(TrackedMeasurementsContextProvider, "useViewportGrid{[viewportGrid, viewportGridService]}\nuseMachine{[\n    trackedMeasurements,\n    sendTrackedMeasurementsEvent,\n    trackedMeasurementsService,\n  ]}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.useViewportGrid, _xstate_react__WEBPACK_IMPORTED_MODULE_3__.useMachine]);
TrackedMeasurementsContextProvider.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node)]),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  commandsManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  extensionManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(TrackedMeasurementsContext, "TrackedMeasurementsContext", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx");
  reactHotLoader.register(useTrackedMeasurements, "useTrackedMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx");
  reactHotLoader.register(SR_SOPCLASSHANDLERID, "SR_SOPCLASSHANDLERID", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx");
  reactHotLoader.register(TrackedMeasurementsContextProvider, "TrackedMeasurementsContextProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx":
/*!********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx ***!
  \********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_extension_cornerstone_dicom_sr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-cornerstone-dicom-sr */ "../../../extensions/cornerstone-dicom-sr/src/index.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function hydrateStructuredReport(_ref, ctx, evt) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const {
    displaySetService
  } = servicesManager.services;
  const {
    viewportIndex,
    displaySetInstanceUID
  } = evt;
  const srDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  return new Promise((resolve, reject) => {
    const hydrationResult = (0,_ohif_extension_cornerstone_dicom_sr__WEBPACK_IMPORTED_MODULE_0__.hydrateStructuredReport)({
      servicesManager,
      extensionManager
    }, displaySetInstanceUID);
    const StudyInstanceUID = hydrationResult.StudyInstanceUID;
    const SeriesInstanceUIDs = hydrationResult.SeriesInstanceUIDs;
    resolve({
      displaySetInstanceUID: evt.displaySetInstanceUID,
      srSeriesInstanceUID: srDisplaySet.SeriesInstanceUID,
      viewportIndex,
      StudyInstanceUID,
      SeriesInstanceUIDs
    });
  });
}
const _default = hydrateStructuredReport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(hydrateStructuredReport, "hydrateStructuredReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/hydrateStructuredReport.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/index.js":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/index.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsContext: () => (/* reexport safe */ _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContext),
/* harmony export */   TrackedMeasurementsContextProvider: () => (/* reexport safe */ _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContextProvider),
/* harmony export */   useTrackedMeasurements: () => (/* reexport safe */ _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__.useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var _TrackedMeasurementsContext_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackedMeasurementsContext.tsx */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/TrackedMeasurementsContext.tsx");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultOptions: () => (/* binding */ defaultOptions),
/* harmony export */   machineConfiguration: () => (/* binding */ machineConfiguration)
/* harmony export */ });
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xstate */ "../../../node_modules/xstate/es/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4,
  HYDRATE_REPORT: 5
};
const machineConfiguration = {
  id: 'measurementTracking',
  initial: 'idle',
  context: {
    trackedStudy: '',
    trackedSeries: [],
    ignoredSeries: [],
    //
    prevTrackedStudy: '',
    prevTrackedSeries: [],
    prevIgnoredSeries: [],
    //
    ignoredSRSeriesForHydration: [],
    isDirty: false
  },
  states: {
    off: {
      type: 'final'
    },
    idle: {
      entry: 'clearContext',
      on: {
        TRACK_SERIES: 'promptBeginTracking',
        // Unused? We may only do PROMPT_HYDRATE_SR now?
        SET_TRACKED_SERIES: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries', 'setIsDirtyToClean']
        }],
        PROMPT_HYDRATE_SR: {
          target: 'promptHydrateStructuredReport',
          cond: 'hasNotIgnoredSRSeriesForHydration'
        },
        RESTORE_PROMPT_HYDRATE_SR: 'promptHydrateStructuredReport',
        HYDRATE_SR: 'hydrateStructuredReport'
      }
    },
    promptBeginTracking: {
      invoke: {
        src: 'promptBeginTracking',
        onDone: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndSeries', 'setIsDirty'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'off',
          cond: 'shouldKillMachine'
        }, {
          target: 'idle'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    tracking: {
      on: {
        TRACK_SERIES: [{
          target: 'promptTrackNewStudy',
          cond: 'isNewStudy'
        }, {
          target: 'promptTrackNewSeries',
          cond: 'isNewSeries'
        }],
        UNTRACK_SERIES: [{
          target: 'tracking',
          actions: ['removeTrackedSeries', 'setIsDirty'],
          cond: 'hasRemainingTrackedSeries'
        }, {
          target: 'idle'
        }],
        SET_TRACKED_SERIES: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries']
        }],
        SAVE_REPORT: 'promptSaveReport',
        SET_DIRTY: [{
          target: 'tracking',
          actions: ['setIsDirty'],
          cond: 'shouldSetDirty'
        }, {
          target: 'tracking'
        }]
      }
    },
    promptTrackNewSeries: {
      invoke: {
        src: 'promptTrackNewSeries',
        onDone: [{
          target: 'tracking',
          actions: ['addTrackedSeries', 'setIsDirty'],
          cond: 'shouldAddSeries'
        }, {
          target: 'tracking',
          actions: ['discardPreviouslyTrackedMeasurements', 'setTrackedStudyAndSeries', 'setIsDirty'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'promptSaveReport',
          cond: 'shouldPromptSaveReport'
        }, {
          target: 'tracking'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptTrackNewStudy: {
      invoke: {
        src: 'promptTrackNewStudy',
        onDone: [{
          target: 'tracking',
          actions: ['discardPreviouslyTrackedMeasurements', 'setTrackedStudyAndSeries', 'setIsDirty'],
          cond: 'shouldSetStudyAndSeries'
        }, {
          target: 'tracking',
          actions: ['ignoreSeries'],
          cond: 'shouldAddIgnoredSeries'
        }, {
          target: 'promptSaveReport',
          cond: 'shouldPromptSaveReport'
        }, {
          target: 'tracking'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptSaveReport: {
      invoke: {
        src: 'promptSaveReport',
        onDone: [
        // "clicked the save button"
        // - should clear all measurements
        // - show DICOM SR
        {
          target: 'idle',
          actions: ['clearAllMeasurements', 'showStructuredReportDisplaySetInActiveViewport'],
          cond: 'shouldSaveAndContinueWithSameReport'
        },
        // "starting a new report"
        // - remove "just saved" measurements
        // - start tracking a new study + report
        {
          target: 'tracking',
          actions: ['discardPreviouslyTrackedMeasurements', 'setTrackedStudyAndSeries'],
          cond: 'shouldSaveAndStartNewReport'
        },
        // Cancel, back to tracking
        {
          target: 'tracking'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    promptHydrateStructuredReport: {
      invoke: {
        src: 'promptHydrateStructuredReport',
        onDone: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries', 'jumpToFirstMeasurementInActiveViewport', 'setIsDirtyToClean'],
          cond: 'shouldHydrateStructuredReport'
        }, {
          target: 'idle',
          actions: ['ignoreHydrationForSRSeries'],
          cond: 'shouldIgnoreHydrationForSR'
        }],
        onError: {
          target: 'idle'
        }
      }
    },
    hydrateStructuredReport: {
      invoke: {
        src: 'hydrateStructuredReport',
        onDone: [{
          target: 'tracking',
          actions: ['setTrackedStudyAndMultipleSeries', 'jumpToFirstMeasurementInActiveViewport', 'setIsDirtyToClean']
        }],
        onError: {
          target: 'idle'
        }
      }
    }
  },
  strict: true
};
const defaultOptions = {
  services: {
    promptBeginTracking: (ctx, evt) => {
      // return { userResponse, StudyInstanceUID, SeriesInstanceUID }
    },
    promptTrackNewStudy: (ctx, evt) => {
      // return { userResponse, StudyInstanceUID, SeriesInstanceUID }
    },
    promptTrackNewSeries: (ctx, evt) => {
      // return { userResponse, StudyInstanceUID, SeriesInstanceUID }
    }
  },
  actions: {
    discardPreviouslyTrackedMeasurements: (ctx, evt) => {
      console.log('discardPreviouslyTrackedMeasurements: not implemented');
    },
    clearAllMeasurements: (ctx, evt) => {
      console.log('clearAllMeasurements: not implemented');
    },
    jumpToFirstMeasurementInActiveViewport: (ctx, evt) => {
      console.warn('jumpToFirstMeasurementInActiveViewport: not implemented');
    },
    showStructuredReportDisplaySetInActiveViewport: (ctx, evt) => {
      console.warn('showStructuredReportDisplaySetInActiveViewport: not implemented');
    },
    clearContext: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)({
      trackedStudy: '',
      trackedSeries: [],
      ignoredSeries: [],
      prevTrackedStudy: '',
      prevTrackedSeries: [],
      prevIgnoredSeries: []
    }),
    // Promise resolves w/ `evt.data.*`
    setTrackedStudyAndSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevTrackedStudy: ctx.trackedStudy,
      prevTrackedSeries: ctx.trackedSeries.slice(),
      prevIgnoredSeries: ctx.ignoredSeries.slice(),
      //
      trackedStudy: evt.data.StudyInstanceUID,
      trackedSeries: [evt.data.SeriesInstanceUID],
      ignoredSeries: []
    })),
    setTrackedStudyAndMultipleSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => {
      const studyInstanceUID = evt.StudyInstanceUID || evt.data.StudyInstanceUID;
      const seriesInstanceUIDs = evt.SeriesInstanceUIDs || evt.data.SeriesInstanceUIDs;
      return {
        prevTrackedStudy: ctx.trackedStudy,
        prevTrackedSeries: ctx.trackedSeries.slice(),
        prevIgnoredSeries: ctx.ignoredSeries.slice(),
        //
        trackedStudy: studyInstanceUID,
        trackedSeries: [...ctx.trackedSeries, ...seriesInstanceUIDs],
        ignoredSeries: []
      };
    }),
    setIsDirtyToClean: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      isDirty: false
    })),
    setIsDirty: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      isDirty: true
    })),
    ignoreSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevIgnoredSeries: [...ctx.ignoredSeries],
      ignoredSeries: [...ctx.ignoredSeries, evt.data.SeriesInstanceUID]
    })),
    ignoreHydrationForSRSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      ignoredSRSeriesForHydration: [...ctx.ignoredSRSeriesForHydration, evt.data.srSeriesInstanceUID]
    })),
    addTrackedSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevTrackedSeries: [...ctx.trackedSeries],
      trackedSeries: [...ctx.trackedSeries, evt.data.SeriesInstanceUID]
    })),
    removeTrackedSeries: (0,xstate__WEBPACK_IMPORTED_MODULE_0__.assign)((ctx, evt) => ({
      prevTrackedSeries: ctx.trackedSeries.slice().filter(ser => ser !== evt.SeriesInstanceUID),
      trackedSeries: ctx.trackedSeries.slice().filter(ser => ser !== evt.SeriesInstanceUID)
    }))
  },
  guards: {
    // We set dirty any time we performan an action that:
    // - Tracks a new study
    // - Tracks a new series
    // - Adds a measurement to an already tracked study/series
    //
    // We set clean any time we restore from an SR
    //
    // This guard/condition is specific to "new measurements"
    // to make sure we only track dirty when the new measurement is specific
    // to a series we're already tracking
    //
    // tl;dr
    // Any report change, that is not a hydration of an existing report, should
    // result in a "dirty" report
    //
    // Where dirty means there would be "loss of data" if we blew away measurements
    // without creating a new SR.
    shouldSetDirty: (ctx, evt) => {
      return (
        // When would this happen?
        evt.SeriesInstanceUID === undefined || ctx.trackedSeries.includes(evt.SeriesInstanceUID)
      );
    },
    shouldKillMachine: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.NO_NEVER,
    shouldAddSeries: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.ADD_SERIES,
    shouldSetStudyAndSeries: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.SET_STUDY_AND_SERIES,
    shouldAddIgnoredSeries: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.NO_NOT_FOR_SERIES,
    shouldPromptSaveReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CREATE_REPORT,
    shouldIgnoreHydrationForSR: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CANCEL,
    shouldSaveAndContinueWithSameReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CREATE_REPORT && evt.data.isBackupSave === true,
    shouldSaveAndStartNewReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.CREATE_REPORT && evt.data.isBackupSave === false,
    shouldHydrateStructuredReport: (ctx, evt) => evt.data && evt.data.userResponse === RESPONSE.HYDRATE_REPORT,
    // Has more than 1, or SeriesInstanceUID is not in list
    // --> Post removal would have non-empty trackedSeries array
    hasRemainingTrackedSeries: (ctx, evt) => ctx.trackedSeries.length > 1 || !ctx.trackedSeries.includes(evt.SeriesInstanceUID),
    hasNotIgnoredSRSeriesForHydration: (ctx, evt) => {
      return !ctx.ignoredSRSeriesForHydration.includes(evt.SeriesInstanceUID);
    },
    isNewStudy: (ctx, evt) => !ctx.ignoredSeries.includes(evt.SeriesInstanceUID) && ctx.trackedStudy !== evt.StudyInstanceUID,
    isNewSeries: (ctx, evt) => !ctx.ignoredSeries.includes(evt.SeriesInstanceUID) && !ctx.trackedSeries.includes(evt.SeriesInstanceUID)
  }
};

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js");
  reactHotLoader.register(machineConfiguration, "machineConfiguration", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js");
  reactHotLoader.register(defaultOptions, "defaultOptions", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/measurementTrackingMachine.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js":
/*!***************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3
};
function promptBeginTracking(_ref, ctx, evt) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const {
    uiViewportDialogService
  } = servicesManager.services;
  const {
    viewportIndex,
    StudyInstanceUID,
    SeriesInstanceUID
  } = evt;
  return new Promise(async function (resolve, reject) {
    let promptResult = await _askTrackMeasurements(uiViewportDialogService, viewportIndex);
    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportIndex
    });
  });
}
function _askTrackMeasurements(uiViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'Track measurements for this series?';
    const actions = [{
      id: 'prompt-begin-tracking-cancel',
      type: 'cancel',
      text: 'No',
      value: RESPONSE.CANCEL
    }, {
      id: 'prompt-begin-tracking-no-do-not-ask-again',
      type: 'secondary',
      text: 'No, do not ask again',
      value: RESPONSE.NO_NEVER
    }, {
      id: 'prompt-begin-tracking-yes',
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };
    uiViewportDialogService.show({
      viewportIndex,
      id: 'measurement-tracking-prompt-begin-tracking',
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
const _default = promptBeginTracking;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
  reactHotLoader.register(promptBeginTracking, "promptBeginTracking", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
  reactHotLoader.register(_askTrackMeasurements, "_askTrackMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptBeginTracking.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js":
/*!*************************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js ***!
  \*************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_extension_cornerstone_dicom_sr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-cornerstone-dicom-sr */ "../../../extensions/cornerstone-dicom-sr/src/index.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4,
  HYDRATE_REPORT: 5
};
function promptHydrateStructuredReport(_ref, ctx, evt) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const {
    uiViewportDialogService,
    displaySetService
  } = servicesManager.services;
  const {
    viewportIndex,
    displaySetInstanceUID
  } = evt;
  const srDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
  return new Promise(async function (resolve, reject) {
    const promptResult = await _askTrackMeasurements(uiViewportDialogService, viewportIndex);

    // Need to do action here... So we can set state...
    let StudyInstanceUID, SeriesInstanceUIDs;
    if (promptResult === RESPONSE.HYDRATE_REPORT) {
      console.warn('!! HYDRATING STRUCTURED REPORT');
      const hydrationResult = (0,_ohif_extension_cornerstone_dicom_sr__WEBPACK_IMPORTED_MODULE_0__.hydrateStructuredReport)({
        servicesManager,
        extensionManager
      }, displaySetInstanceUID);
      StudyInstanceUID = hydrationResult.StudyInstanceUID;
      SeriesInstanceUIDs = hydrationResult.SeriesInstanceUIDs;
    }
    resolve({
      userResponse: promptResult,
      displaySetInstanceUID: evt.displaySetInstanceUID,
      srSeriesInstanceUID: srDisplaySet.SeriesInstanceUID,
      viewportIndex,
      StudyInstanceUID,
      SeriesInstanceUIDs
    });
  });
}
function _askTrackMeasurements(uiViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'Do you want to continue tracking measurements for this study?';
    const actions = [{
      type: 'secondary',
      text: 'No',
      value: RESPONSE.CANCEL
    }, {
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.HYDRATE_REPORT
    }];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };
    uiViewportDialogService.show({
      viewportIndex,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
const _default = promptHydrateStructuredReport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js");
  reactHotLoader.register(promptHydrateStructuredReport, "promptHydrateStructuredReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js");
  reactHotLoader.register(_askTrackMeasurements, "_askTrackMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptHydrateStructuredReport.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptSaveReport.js":
/*!************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptSaveReport.js ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_createReportAsync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../_shared/createReportAsync */ "../../../extensions/measurement-tracking/src/_shared/createReportAsync.tsx");
/* harmony import */ var _shared_createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/createReportDialogPrompt */ "../../../extensions/measurement-tracking/src/_shared/createReportDialogPrompt.tsx");
/* harmony import */ var _shared_getNextSRSeriesNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/getNextSRSeriesNumber */ "../../../extensions/measurement-tracking/src/_shared/getNextSRSeriesNumber.js");
/* harmony import */ var _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/PROMPT_RESPONSES */ "../../../extensions/measurement-tracking/src/_shared/PROMPT_RESPONSES.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




function promptSaveReport(_ref, ctx, evt) {
  let {
    servicesManager,
    commandsManager,
    extensionManager
  } = _ref;
  const {
    uiDialogService,
    measurementService,
    displaySetService
  } = servicesManager.services;
  const viewportIndex = evt.viewportIndex === undefined ? evt.data.viewportIndex : evt.viewportIndex;
  const isBackupSave = evt.isBackupSave === undefined ? evt.data.isBackupSave : evt.isBackupSave;
  const StudyInstanceUID = evt?.data?.StudyInstanceUID;
  const SeriesInstanceUID = evt?.data?.SeriesInstanceUID;
  const {
    trackedStudy,
    trackedSeries
  } = ctx;
  let displaySetInstanceUIDs;
  return new Promise(async function (resolve, reject) {
    // TODO: Fallback if (uiDialogService) {
    const promptResult = await (0,_shared_createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_1__["default"])(uiDialogService);
    if (promptResult.action === _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__["default"].CREATE_REPORT) {
      const dataSources = extensionManager.getDataSources();
      const dataSource = dataSources[0];
      const measurements = measurementService.getMeasurements();
      const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID));
      const SeriesDescription =
      // isUndefinedOrEmpty
      promptResult.value === undefined || promptResult.value === '' ? 'Research Derived Series' // default
      : promptResult.value; // provided value

      const SeriesNumber = (0,_shared_getNextSRSeriesNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(displaySetService);
      displaySetInstanceUIDs = await (0,_shared_createReportAsync__WEBPACK_IMPORTED_MODULE_0__["default"])(servicesManager, commandsManager, dataSource, trackedMeasurements, {
        SeriesDescription,
        SeriesNumber
      });
    } else if (promptResult.action === _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__["default"].CANCEL) {
      // Do nothing
    }
    resolve({
      userResponse: promptResult.action,
      createdDisplaySetInstanceUIDs: displaySetInstanceUIDs,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportIndex,
      isBackupSave
    });
  });
}
const _default = promptSaveReport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(promptSaveReport, "promptSaveReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptSaveReport.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptSaveReport.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js":
/*!****************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js ***!
  \****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
function promptTrackNewSeries(_ref, ctx, evt) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const {
    UIViewportDialogService
  } = servicesManager.services;
  const {
    viewportIndex,
    StudyInstanceUID,
    SeriesInstanceUID
  } = evt;
  return new Promise(async function (resolve, reject) {
    let promptResult = await _askShouldAddMeasurements(UIViewportDialogService, viewportIndex);
    if (promptResult === RESPONSE.CREATE_REPORT) {
      promptResult = ctx.isDirty ? await _askSaveDiscardOrCancel(UIViewportDialogService, viewportIndex) : RESPONSE.SET_STUDY_AND_SERIES;
    }
    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportIndex,
      isBackupSave: false
    });
  });
}
function _askShouldAddMeasurements(uiViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'Do you want to add this measurement to the existing report?';
    const actions = [{
      type: 'cancel',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: 'Create new report',
      value: RESPONSE.CREATE_REPORT
    }, {
      type: 'primary',
      text: 'Add to existing report',
      value: RESPONSE.ADD_SERIES
    }];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };
    uiViewportDialogService.show({
      viewportIndex,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
function _askSaveDiscardOrCancel(UIViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'You have existing tracked measurements. What would you like to do with your existing tracked measurements?';
    const actions = [{
      type: 'cancel',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: 'Save',
      value: RESPONSE.CREATE_REPORT
    }, {
      type: 'primary',
      text: 'Discard',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportIndex,
      type: 'warning',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
const _default = promptTrackNewSeries;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
  reactHotLoader.register(promptTrackNewSeries, "promptTrackNewSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
  reactHotLoader.register(_askShouldAddMeasurements, "_askShouldAddMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
  reactHotLoader.register(_askSaveDiscardOrCancel, "_askSaveDiscardOrCancel", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewSeries.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js":
/*!***************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
function promptTrackNewStudy(_ref, ctx, evt) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const {
    UIViewportDialogService
  } = servicesManager.services;
  const {
    viewportIndex,
    StudyInstanceUID,
    SeriesInstanceUID
  } = evt;
  return new Promise(async function (resolve, reject) {
    let promptResult = await _askTrackMeasurements(UIViewportDialogService, viewportIndex);
    if (promptResult === RESPONSE.SET_STUDY_AND_SERIES) {
      promptResult = ctx.isDirty ? await _askSaveDiscardOrCancel(UIViewportDialogService, viewportIndex) : RESPONSE.SET_STUDY_AND_SERIES;
    }
    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportIndex,
      isBackupSave: false
    });
  });
}
function _askTrackMeasurements(UIViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'Track measurements for this series?';
    const actions = [{
      type: 'cancel',
      text: 'No',
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: 'No, do not ask again for this series',
      value: RESPONSE.NO_NOT_FOR_SERIES
    }, {
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportIndex,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
function _askSaveDiscardOrCancel(UIViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'Measurements cannot span across multiple studies. Do you want to save your tracked measurements?';
    const actions = [{
      type: 'cancel',
      text: 'Cancel',
      value: RESPONSE.CANCEL
    }, {
      type: 'secondary',
      text: 'No, discard previously tracked series & measurements',
      value: RESPONSE.SET_STUDY_AND_SERIES
    }, {
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.CREATE_REPORT
    }];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };
    UIViewportDialogService.show({
      viewportIndex,
      type: 'warning',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      }
    });
  });
}
const _default = promptTrackNewStudy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js");
  reactHotLoader.register(promptTrackNewStudy, "promptTrackNewStudy", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js");
  reactHotLoader.register(_askTrackMeasurements, "_askTrackMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js");
  reactHotLoader.register(_askSaveDiscardOrCancel, "_askSaveDiscardOrCancel", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/contexts/index.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/contexts/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackedMeasurementsContext: () => (/* reexport safe */ _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContext),
/* harmony export */   TrackedMeasurementsContextProvider: () => (/* reexport safe */ _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContextProvider),
/* harmony export */   useTrackedMeasurements: () => (/* reexport safe */ _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__.useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var _TrackedMeasurementsContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackedMeasurementsContext */ "../../../extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/index.js");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


/***/ }),

/***/ "../../../extensions/measurement-tracking/src/getContextModule.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getContextModule.tsx ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useTrackedMeasurements: () => (/* reexport safe */ _contexts__WEBPACK_IMPORTED_MODULE_0__.useTrackedMeasurements)
/* harmony export */ });
/* harmony import */ var _contexts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contexts */ "../../../extensions/measurement-tracking/src/contexts/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function getContextModule(_ref) {
  let {
    servicesManager,
    extensionManager,
    commandsManager
  } = _ref;
  const BoundTrackedMeasurementsContextProvider = _contexts__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContextProvider.bind(null, {
    servicesManager,
    extensionManager,
    commandsManager
  });
  return [{
    name: 'TrackedMeasurementsContext',
    context: _contexts__WEBPACK_IMPORTED_MODULE_0__.TrackedMeasurementsContext,
    provider: BoundTrackedMeasurementsContextProvider
  }];
}

const _default = getContextModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getContextModule, "getContextModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getContextModule.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getContextModule.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/getPanelModule.tsx":
/*!***********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getPanelModule.tsx ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _panels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panels */ "../../../extensions/measurement-tracking/src/panels/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails
function getPanelModule(_ref) {
  let {
    commandsManager,
    extensionManager,
    servicesManager
  } = _ref;
  return [{
    name: 'seriesList',
    iconName: 'group-layers',
    iconLabel: 'Studies',
    label: 'Studies',
    component: _panels__WEBPACK_IMPORTED_MODULE_0__.PanelStudyBrowserTracking.bind(null, {
      commandsManager,
      extensionManager,
      servicesManager
    })
  }, {
    name: 'trackedMeasurements',
    iconName: 'tab-linear',
    iconLabel: 'Measure',
    label: 'Measurements',
    component: _panels__WEBPACK_IMPORTED_MODULE_0__.PanelMeasurementTableTracking.bind(null, {
      commandsManager,
      extensionManager,
      servicesManager
    })
  }];
}
const _default = getPanelModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getPanelModule, "getPanelModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getPanelModule.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getPanelModule.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/getViewportModule.tsx":
/*!**************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/getViewportModule.tsx ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
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
  return __webpack_require__.e(/*! import() */ "extensions_measurement-tracking_src_viewports_TrackedCornerstoneViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./viewports/TrackedCornerstoneViewport */ "../../../extensions/measurement-tracking/src/viewports/TrackedCornerstoneViewport.tsx"));
});
const OHIFCornerstoneViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, props));
};
function getViewportModule(_ref) {
  let {
    servicesManager,
    commandsManager,
    extensionManager
  } = _ref;
  const ExtendedOHIFCornerstoneTrackingViewport = props => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OHIFCornerstoneViewport, _extends({
      servicesManager: servicesManager,
      commandsManager: commandsManager,
      extensionManager: extensionManager
    }, props));
  };
  return [{
    name: 'cornerstone-tracked',
    component: ExtendedOHIFCornerstoneTrackingViewport
  }];
}
const _default = getViewportModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getViewportModule.tsx");
  reactHotLoader.register(OHIFCornerstoneViewport, "OHIFCornerstoneViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getViewportModule.tsx");
  reactHotLoader.register(getViewportModule, "getViewportModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getViewportModule.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/getViewportModule.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/id.js":
/*!**********************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/id.js ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/measurement-tracking/package.json");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/measurement-tracking/src/getPanelModule.tsx");
/* harmony import */ var _getViewportModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getViewportModule */ "../../../extensions/measurement-tracking/src/getViewportModule.tsx");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./id.js */ "../../../extensions/measurement-tracking/src/id.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const measurementTrackingExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_3__.id,
  getContextModule: _getContextModule__WEBPACK_IMPORTED_MODULE_0__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  getViewportModule: _getViewportModule__WEBPACK_IMPORTED_MODULE_2__["default"]
};
const _default = measurementTrackingExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(measurementTrackingExtension, "measurementTrackingExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/ActionButtons.tsx":
/*!***********************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/ActionButtons.tsx ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




function ActionButtons(_ref) {
  let {
    onExportClick,
    onCreateReportClick,
    disabled
  } = _ref;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('MeasurementTable');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "text-base px-2 py-2",
    size: "initial",
    variant: disabled ? 'disabled' : 'outlined',
    color: "black",
    border: "primaryActive",
    onClick: onExportClick,
    disabled: disabled
  }, t('Export')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "ml-2 px-2 text-base",
    variant: disabled ? 'disabled' : 'outlined',
    size: "initial",
    color: "black",
    border: "primaryActive",
    onClick: onCreateReportClick,
    disabled: disabled
  }, t('Create Report')));
}
__signature__(ActionButtons, "useTranslation{{ t }}", () => [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation]);
ActionButtons.propTypes = {
  onExportClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  onCreateReportClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)
};
ActionButtons.defaultProps = {
  onExportClick: () => alert('Export'),
  onCreateReportClick: () => alert('Create Report'),
  disabled: false
};
const _default = ActionButtons;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ActionButtons, "ActionButtons", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/ActionButtons.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/ActionButtons.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx":
/*!***************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @hooks */ "./hooks/index.js");
/* harmony import */ var _ActionButtons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ActionButtons */ "../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/ActionButtons.tsx");
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_7__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const {
  downloadCSVReport
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils;
const {
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils;
const DISPLAY_STUDY_SUMMARY_INITIAL_VALUE = {
  key: undefined,
  //
  date: '',
  // '07-Sep-2010',
  modality: '',
  // 'CT',
  description: '' // 'CHEST/ABD/PELVIS W CONTRAST',
};

function PanelMeasurementTableTracking(_ref) {
  let {
    servicesManager,
    extensionManager
  } = _ref;
  const [viewportGrid, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid)();
  const [measurementChangeTimestamp, setMeasurementsUpdated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Date.now().toString());
  const debouncedMeasurementChangeTimestamp = (0,_hooks__WEBPACK_IMPORTED_MODULE_4__.useDebounce)(measurementChangeTimestamp, 200);
  const {
    measurementService,
    uiDialogService,
    displaySetService
  } = servicesManager.services;
  const [trackedMeasurements, sendTrackedMeasurementsEvent] = (0,_getContextModule__WEBPACK_IMPORTED_MODULE_6__.useTrackedMeasurements)();
  const {
    trackedStudy,
    trackedSeries
  } = trackedMeasurements.context;
  const [displayStudySummary, setDisplayStudySummary] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(DISPLAY_STUDY_SUMMARY_INITIAL_VALUE);
  const [displayMeasurements, setDisplayMeasurements] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const measurementsPanelRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const measurements = measurementService.getMeasurements();
    const filteredMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID));
    const mappedMeasurements = filteredMeasurements.map(m => _mapMeasurementToDisplay(m, measurementService.VALUE_TYPES, displaySetService));
    setDisplayMeasurements(mappedMeasurements);
    // eslint-ignore-next-line
  }, [measurementService, trackedStudy, trackedSeries, debouncedMeasurementChangeTimestamp]);
  const updateDisplayStudySummary = async () => {
    if (trackedMeasurements.matches('tracking')) {
      const StudyInstanceUID = trackedStudy;
      const studyMeta = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.DicomMetadataStore.getStudy(StudyInstanceUID);
      const instanceMeta = studyMeta.series[0].instances[0];
      const {
        StudyDate,
        StudyDescription
      } = instanceMeta;
      const modalities = new Set();
      studyMeta.series.forEach(series => {
        if (trackedSeries.includes(series.SeriesInstanceUID)) {
          modalities.add(series.instances[0].Modality);
        }
      });
      const modality = Array.from(modalities).join('/');
      if (displayStudySummary.key !== StudyInstanceUID) {
        setDisplayStudySummary({
          key: StudyInstanceUID,
          date: StudyDate,
          // TODO: Format: '07-Sep-2010'
          modality,
          description: StudyDescription
        });
      }
    } else if (trackedStudy === '' || trackedStudy === undefined) {
      setDisplayStudySummary(DISPLAY_STUDY_SUMMARY_INITIAL_VALUE);
    }
  };

  // ~~ DisplayStudySummary
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    updateDisplayStudySummary();
  }, [displayStudySummary.key, trackedMeasurements, trackedStudy, updateDisplayStudySummary]);

  // TODO: Better way to consolidated, debounce, check on change?
  // Are we exposing the right API for measurementService?
  // This watches for ALL measurementService changes. It updates a timestamp,
  // which is debounced. After a brief period of inactivity, this triggers
  // a re-render where we grab up-to-date measurements
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const added = measurementService.EVENTS.MEASUREMENT_ADDED;
    const addedRaw = measurementService.EVENTS.RAW_MEASUREMENT_ADDED;
    const updated = measurementService.EVENTS.MEASUREMENT_UPDATED;
    const removed = measurementService.EVENTS.MEASUREMENT_REMOVED;
    const cleared = measurementService.EVENTS.MEASUREMENTS_CLEARED;
    const subscriptions = [];
    [added, addedRaw, updated, removed, cleared].forEach(evt => {
      subscriptions.push(measurementService.subscribe(evt, () => {
        setMeasurementsUpdated(Date.now().toString());
        if (evt === added) {
          lodash_debounce__WEBPACK_IMPORTED_MODULE_7___default()(() => {
            measurementsPanelRef.current.scrollTop = measurementsPanelRef.current.scrollHeight;
          }, 300)();
        }
      }).unsubscribe);
    });
    return () => {
      subscriptions.forEach(unsub => {
        unsub();
      });
    };
  }, [measurementService, sendTrackedMeasurementsEvent]);
  async function exportReport() {
    const measurements = measurementService.getMeasurements();
    const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID));
    downloadCSVReport(trackedMeasurements, measurementService);
  }
  const jumpToImage = _ref2 => {
    let {
      uid,
      isActive
    } = _ref2;
    measurementService.jumpToMeasurement(viewportGrid.activeViewportIndex, uid);
    onMeasurementItemClickHandler({
      uid,
      isActive
    });
  };
  const onMeasurementItemEditHandler = _ref3 => {
    let {
      uid,
      isActive
    } = _ref3;
    const measurement = measurementService.getMeasurement(uid);
    jumpToImage({
      uid,
      isActive
    });
    const onSubmitHandler = _ref4 => {
      let {
        action,
        value
      } = _ref4;
      switch (action.id) {
        case 'save':
          {
            measurementService.update(uid, {
              ...measurement,
              ...value
            }, true);
          }
      }
      uiDialogService.dismiss({
        id: 'enter-annotation'
      });
    };
    uiDialogService.create({
      id: 'enter-annotation',
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Dialog,
      contentProps: {
        title: 'Annotation',
        noCloseButton: true,
        value: {
          label: measurement.label || ''
        },
        body: _ref5 => {
          let {
            value,
            setValue
          } = _ref5;
          const onChangeHandler = event => {
            event.persist();
            setValue(value => ({
              ...value,
              label: event.target.value
            }));
          };
          const onKeyPressHandler = event => {
            if (event.key === 'Enter') {
              onSubmitHandler({
                value,
                action: {
                  id: 'save'
                }
              });
            }
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
            label: "Enter your annotation",
            labelClassName: "text-white grow text-[14px] leading-[1.2]",
            autoFocus: true,
            id: "annotation",
            className: "bg-black border-primary-main",
            type: "text",
            value: value.label,
            onChange: onChangeHandler,
            onKeyPress: onKeyPressHandler
          });
        },
        actions: [
        // temp: swap button types until colors are updated
        {
          id: 'cancel',
          text: 'Cancel',
          type: 'primary'
        }, {
          id: 'save',
          text: 'Save',
          type: 'secondary'
        }],
        onSubmit: onSubmitHandler
      }
    });
  };
  const onMeasurementItemClickHandler = _ref6 => {
    let {
      uid,
      isActive
    } = _ref6;
    if (!isActive) {
      const measurements = [...displayMeasurements];
      const measurement = measurements.find(m => m.uid === uid);
      measurements.forEach(m => m.isActive = m.uid !== uid ? false : true);
      measurement.isActive = true;
      setDisplayMeasurements(measurements);
    }
  };
  const displayMeasurementsWithoutFindings = displayMeasurements.filter(dm => dm.measurementType !== measurementService.VALUE_TYPES.POINT);
  const additionalFindings = displayMeasurements.filter(dm => dm.measurementType === measurementService.VALUE_TYPES.POINT);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overflow-x-hidden overflow-y-auto invisible-scrollbar",
    ref: measurementsPanelRef,
    "data-cy": 'trackedMeasurements-panel'
  }, displayStudySummary.key && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.StudySummary, {
    date: formatDate(displayStudySummary.date),
    modality: displayStudySummary.modality,
    description: displayStudySummary.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.MeasurementTable, {
    title: "Measurements",
    data: displayMeasurementsWithoutFindings,
    servicesManager: servicesManager,
    onClick: jumpToImage,
    onEdit: onMeasurementItemEditHandler
  }), additionalFindings.length !== 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.MeasurementTable, {
    title: "Additional Findings",
    data: additionalFindings,
    servicesManager: servicesManager,
    onClick: jumpToImage,
    onEdit: onMeasurementItemEditHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-center p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActionButtons__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onExportClick: exportReport,
    onCreateReportClick: () => {
      sendTrackedMeasurementsEvent('SAVE_REPORT', {
        viewportIndex: viewportGrid.activeViewportIndex,
        isBackupSave: true
      });
    },
    disabled: additionalFindings.length === 0 && displayMeasurementsWithoutFindings.length === 0
  })));
}
__signature__(PanelMeasurementTableTracking, "useViewportGrid{[viewportGrid, viewportGridService]}\nuseState{[measurementChangeTimestamp, setMeasurementsUpdated](Date.now().toString())}\nuseDebounce{debouncedMeasurementChangeTimestamp}\nuseTrackedMeasurements{[\n    trackedMeasurements,\n    sendTrackedMeasurementsEvent,\n  ]}\nuseState{[displayStudySummary, setDisplayStudySummary](DISPLAY_STUDY_SUMMARY_INITIAL_VALUE)}\nuseState{[displayMeasurements, setDisplayMeasurements]([])}\nuseRef{measurementsPanelRef}\nuseEffect{}\nuseEffect{}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid, _hooks__WEBPACK_IMPORTED_MODULE_4__.useDebounce, _getContextModule__WEBPACK_IMPORTED_MODULE_6__.useTrackedMeasurements]);
PanelMeasurementTableTracking.propTypes = {
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    services: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
      measurementService: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
        getMeasurements: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        VALUE_TYPES: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

// TODO: This could be a measurementService mapper
function _mapMeasurementToDisplay(measurement, types, displaySetService) {
  const {
    referenceStudyUID,
    referenceSeriesUID,
    SOPInstanceUID
  } = measurement;

  // TODO: We don't deal with multiframe well yet, would need to update
  // This in OHIF-312 when we add FrameIndex to measurements.

  const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.DicomMetadataStore.getInstance(referenceStudyUID, referenceSeriesUID, SOPInstanceUID);
  const displaySets = displaySetService.getDisplaySetsForSeries(referenceSeriesUID);
  if (!displaySets[0] || !displaySets[0].images) {
    throw new Error('The tracked measurements panel should only be tracking "stack" displaySets.');
  }
  const {
    displayText: baseDisplayText,
    uid,
    label: baseLabel,
    type,
    selected,
    findingSites,
    finding
  } = measurement;
  const firstSite = findingSites?.[0];
  const label = baseLabel || finding?.text || firstSite?.text || '(empty)';
  let displayText = baseDisplayText || [];
  if (findingSites) {
    const siteText = [];
    findingSites.forEach(site => {
      if (site?.text !== label) siteText.push(site.text);
    });
    displayText = [...siteText, ...displayText];
  }
  if (finding && finding?.text !== label) {
    displayText = [finding.text, ...displayText];
  }
  return {
    uid,
    label,
    baseLabel,
    measurementType: type,
    displayText,
    baseDisplayText,
    isActive: selected,
    finding,
    findingSites
  };
}
const _default = PanelMeasurementTableTracking;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(downloadCSVReport, "downloadCSVReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
  reactHotLoader.register(formatDate, "formatDate", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
  reactHotLoader.register(DISPLAY_STUDY_SUMMARY_INITIAL_VALUE, "DISPLAY_STUDY_SUMMARY_INITIAL_VALUE", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
  reactHotLoader.register(PanelMeasurementTableTracking, "PanelMeasurementTableTracking", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
  reactHotLoader.register(_mapMeasurementToDisplay, "_mapMeasurementToDisplay", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx":
/*!*******************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx ***!
  \*******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _getContextModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../getContextModule */ "../../../extensions/measurement-tracking/src/getContextModule.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const {
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils;

/**
 *
 * @param {*} param0
 */
function PanelStudyBrowserTracking(_ref) {
  let {
    servicesManager,
    getImageSrc,
    getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy,
    dataSource
  } = _ref;
  const {
    measurementService,
    displaySetService,
    uiDialogService,
    hangingProtocolService,
    uiNotificationService
  } = servicesManager.services;

  // Normally you nest the components so the tree isn't so deep, and the data
  // doesn't have to have such an intense shape. This works well enough for now.
  // Tabs --> Studies --> DisplaySets --> Thumbnails
  const {
    StudyInstanceUIDs
  } = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useImageViewer)();
  const [{
    activeViewportIndex,
    viewports,
    numCols,
    numRows
  }, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid)();
  const [trackedMeasurements, sendTrackedMeasurementsEvent] = (0,_getContextModule__WEBPACK_IMPORTED_MODULE_4__.useTrackedMeasurements)();
  const [activeTabName, setActiveTabName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('primary');
  const [expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([...StudyInstanceUIDs]);
  const [studyDisplayList, setStudyDisplayList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [displaySets, setDisplaySets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [thumbnailImageSrcMap, setThumbnailImageSrcMap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [jumpToDisplaySet, setJumpToDisplaySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const onDoubleClickThumbnailHandler = displaySetInstanceUID => {
    let updatedViewports = [];
    const viewportIndex = activeViewportIndex;
    try {
      updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportIndex, displaySetInstanceUID);
    } catch (error) {
      console.warn(error);
      uiNotificationService.show({
        title: 'Thumbnail Double Click',
        message: 'The selected display sets could not be added to the viewport due to a mismatch in the Hanging Protocol rules.',
        type: 'info',
        duration: 3000
      });
    }
    viewportGridService.setDisplaySetsForViewports(updatedViewports);
  };
  const activeViewportDisplaySetInstanceUIDs = viewports[activeViewportIndex]?.displaySetInstanceUIDs;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const added = measurementService.EVENTS.MEASUREMENT_ADDED;
    const addedRaw = measurementService.EVENTS.RAW_MEASUREMENT_ADDED;
    const subscriptions = [];
    [added, addedRaw].forEach(evt => {
      subscriptions.push(measurementService.subscribe(evt, _ref2 => {
        let {
          source,
          measurement
        } = _ref2;
        const {
          referenceSeriesUID: SeriesInstanceUID,
          referenceStudyUID: StudyInstanceUID
        } = measurement;
        sendTrackedMeasurementsEvent('SET_DIRTY', {
          SeriesInstanceUID
        });
        sendTrackedMeasurementsEvent('TRACK_SERIES', {
          viewportIndex: activeViewportIndex,
          StudyInstanceUID,
          SeriesInstanceUID
        });
      }).unsubscribe);
    });
    return () => {
      subscriptions.forEach(unsub => {
        unsub();
      });
    };
  }, [measurementService, activeViewportIndex, sendTrackedMeasurementsEvent]);
  const {
    trackedSeries
  } = trackedMeasurements.context;

  // ~~ studyDisplayList
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Fetch all studies for the patient in each primary study
    async function fetchStudiesForPatient(StudyInstanceUID) {
      // current study qido
      const qidoForStudyUID = await dataSource.query.studies.search({
        studyInstanceUid: StudyInstanceUID
      });
      let qidoStudiesForPatient = qidoForStudyUID;

      // try to fetch the prior studies based on the patientID if the
      // server can respond.
      try {
        qidoStudiesForPatient = await getStudiesForPatientByMRN(qidoForStudyUID);
      } catch (error) {
        console.warn(error);
      }
      const mappedStudies = _mapDataSourceStudies(qidoStudiesForPatient);
      const actuallyMappedStudies = mappedStudies.map(qidoStudy => {
        return {
          studyInstanceUid: qidoStudy.StudyInstanceUID,
          date: formatDate(qidoStudy.StudyDate),
          description: qidoStudy.StudyDescription,
          modalities: qidoStudy.ModalitiesInStudy,
          numInstances: qidoStudy.NumInstances
        };
      });
      setStudyDisplayList(prevArray => {
        const ret = [...prevArray];
        for (const study of actuallyMappedStudies) {
          if (!prevArray.find(it => it.studyInstanceUid === study.studyInstanceUid)) {
            ret.push(study);
          }
        }
        return ret;
      });
    }
    StudyInstanceUIDs.forEach(sid => fetchStudiesForPatient(sid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StudyInstanceUIDs, getStudiesForPatientByMRN]);

  // ~~ Initial Thumbnails
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const currentDisplaySets = displaySetService.activeDisplaySets;
    if (!currentDisplaySets.length) {
      return;
    }
    currentDisplaySets.forEach(async dSet => {
      const newImageSrcEntry = {};
      const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
      const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
      const imageId = imageIds[Math.floor(imageIds.length / 2)];

      // TODO: Is it okay that imageIds are not returned here for SR displaysets?
      if (imageId) {
        // When the image arrives, render it and store the result in the thumbnailImgSrcMap
        newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId);
        setThumbnailImageSrcMap(prevState => {
          return {
            ...prevState,
            ...newImageSrcEntry
          };
        });
      }
    });
  }, [displaySetService, dataSource, getImageSrc]);

  // ~~ displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const currentDisplaySets = displaySetService.activeDisplaySets;
    if (!currentDisplaySets.length) {
      return;
    }
    const mappedDisplaySets = _mapDisplaySets(currentDisplaySets, thumbnailImageSrcMap, trackedSeries, viewports, viewportGridService, dataSource, displaySetService, uiDialogService, uiNotificationService);
    setDisplaySets(mappedDisplaySets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySetService.activeDisplaySets, trackedSeries, viewports, dataSource, thumbnailImageSrcMap]);

  // ~~ subscriptions --> displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // DISPLAY_SETS_ADDED returns an array of DisplaySets that were added
    const SubscriptionDisplaySetsAdded = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
      const {
        displaySetsAdded,
        options
      } = data;
      displaySetsAdded.forEach(async dSet => {
        const displaySetInstanceUID = dSet.displaySetInstanceUID;
        const newImageSrcEntry = {};
        const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
        if (options.madeInClient) {
          setJumpToDisplaySet(displaySetInstanceUID);
        }
        const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
        const imageId = imageIds[Math.floor(imageIds.length / 2)];

        // TODO: Is it okay that imageIds are not returned here for SR displaysets?
        if (imageId) {
          // When the image arrives, render it and store the result in the thumbnailImgSrcMap
          newImageSrcEntry[displaySetInstanceUID] = await getImageSrc(imageId);
          setThumbnailImageSrcMap(prevState => {
            return {
              ...prevState,
              ...newImageSrcEntry
            };
          });
        }
      });
    });

    // TODO: Will this always hold _all_ the displaySets we care about?
    // DISPLAY_SETS_CHANGED returns `DisplaySerService.activeDisplaySets`
    const SubscriptionDisplaySetsChanged = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_CHANGED, changedDisplaySets => {
      const mappedDisplaySets = _mapDisplaySets(changedDisplaySets, thumbnailImageSrcMap, trackedSeries, viewports, viewportGridService, dataSource, displaySetService, uiDialogService, uiNotificationService);
      setDisplaySets(mappedDisplaySets);
    });
    return () => {
      SubscriptionDisplaySetsAdded.unsubscribe();
      SubscriptionDisplaySetsChanged.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySetService, dataSource, getImageSrc, thumbnailImageSrcMap, trackedSeries, viewports]);
  const tabs = _createStudyBrowserTabs(StudyInstanceUIDs, studyDisplayList, displaySets, hangingProtocolService);

  // TODO: Should not fire this on "close"
  function _handleStudyClick(StudyInstanceUID) {
    const shouldCollapseStudy = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    const updatedExpandedStudyInstanceUIDs = shouldCollapseStudy ? [...expandedStudyInstanceUIDs.filter(stdyUid => stdyUid !== StudyInstanceUID)] : [...expandedStudyInstanceUIDs, StudyInstanceUID];
    setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    if (!shouldCollapseStudy) {
      const madeInClient = true;
      requestDisplaySetCreationForStudy(displaySetService, StudyInstanceUID, madeInClient);
    }
  }
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (jumpToDisplaySet) {
      // Get element by displaySetInstanceUID
      const displaySetInstanceUID = jumpToDisplaySet;
      const element = document.getElementById(`thumbnail-${displaySetInstanceUID}`);
      if (element && typeof element.scrollIntoView === 'function') {
        // TODO: Any way to support IE here?
        element.scrollIntoView({
          behavior: 'smooth'
        });
        setJumpToDisplaySet(null);
      }
    }
  }, [jumpToDisplaySet, expandedStudyInstanceUIDs, activeTabName]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!jumpToDisplaySet) {
      return;
    }
    const displaySetInstanceUID = jumpToDisplaySet;
    // Set the activeTabName and expand the study
    const thumbnailLocation = _findTabAndStudyOfDisplaySet(displaySetInstanceUID, tabs);
    if (!thumbnailLocation) {
      console.warn('jumpToThumbnail: displaySet thumbnail not found.');
      return;
    }
    const {
      tabName,
      StudyInstanceUID
    } = thumbnailLocation;
    setActiveTabName(tabName);
    const studyExpanded = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    if (!studyExpanded) {
      const updatedExpandedStudyInstanceUIDs = [...expandedStudyInstanceUIDs, StudyInstanceUID];
      setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    }
  }, [expandedStudyInstanceUIDs, jumpToDisplaySet, tabs]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.StudyBrowser, {
    tabs: tabs,
    servicesManager: servicesManager,
    activeTabName: activeTabName,
    expandedStudyInstanceUIDs: expandedStudyInstanceUIDs,
    onClickStudy: _handleStudyClick,
    onClickTab: clickedTabName => {
      setActiveTabName(clickedTabName);
    },
    onClickUntrack: displaySetInstanceUID => {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      // TODO: shift this somewhere else where we're centralizing this logic?
      // Potentially a helper from displaySetInstanceUID to this
      sendTrackedMeasurementsEvent('UNTRACK_SERIES', {
        SeriesInstanceUID: displaySet.SeriesInstanceUID
      });
    },
    onClickThumbnail: () => {},
    onDoubleClickThumbnail: onDoubleClickThumbnailHandler,
    activeDisplaySetInstanceUIDs: activeViewportDisplaySetInstanceUIDs
  });
}
__signature__(PanelStudyBrowserTracking, "useImageViewer{{ StudyInstanceUIDs }}\nuseViewportGrid{[\n    { activeViewportIndex, viewports, numCols, numRows },\n    viewportGridService,\n  ]}\nuseTrackedMeasurements{[\n    trackedMeasurements,\n    sendTrackedMeasurementsEvent,\n  ]}\nuseState{[activeTabName, setActiveTabName]('primary')}\nuseState{[expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs]([\n    ...StudyInstanceUIDs,\n  ])}\nuseState{[studyDisplayList, setStudyDisplayList]([])}\nuseState{[displaySets, setDisplaySets]([])}\nuseState{[thumbnailImageSrcMap, setThumbnailImageSrcMap]({})}\nuseState{[jumpToDisplaySet, setJumpToDisplaySet](null)}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useImageViewer, _ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid, _getContextModule__WEBPACK_IMPORTED_MODULE_4__.useTrackedMeasurements]);
PanelStudyBrowserTracking.propTypes = {
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    getImageIdsForDisplaySet: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }).isRequired,
  getImageSrc: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  getStudiesForPatientByMRN: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  requestDisplaySetCreationForStudy: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
const _default = PanelStudyBrowserTracking;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

/**
 * Maps from the DataSource's format to a naturalized object
 *
 * @param {*} studies
 */
function _mapDataSourceStudies(studies) {
  return studies.map(study => {
    // TODO: Why does the data source return in this format?
    return {
      AccessionNumber: study.accession,
      StudyDate: study.date,
      StudyDescription: study.description,
      NumInstances: study.instances,
      ModalitiesInStudy: study.modalities,
      PatientID: study.mrn,
      PatientName: study.patientName,
      StudyInstanceUID: study.studyInstanceUid,
      StudyTime: study.time
    };
  });
}
function _mapDisplaySets(displaySets, thumbnailImageSrcMap, trackedSeriesInstanceUIDs, viewports,
// TODO: make array of `displaySetInstanceUIDs`?
viewportGridService, dataSource, displaySetService, uiDialogService, uiNotificationService) {
  const thumbnailDisplaySets = [];
  const thumbnailNoImageDisplaySets = [];
  displaySets.filter(ds => !ds.excludeFromThumbnailBrowser).forEach(ds => {
    const imageSrc = thumbnailImageSrcMap[ds.displaySetInstanceUID];
    const componentType = _getComponentType(ds.Modality);
    const numPanes = viewportGridService.getNumViewportPanes();
    const viewportIdentificator = numPanes === 1 ? [] : viewports.reduce((acc, viewportData, index) => {
      if (index < numPanes && viewportData?.displaySetInstanceUIDs?.includes(ds.displaySetInstanceUID)) {
        acc.push(viewportData.viewportLabel);
      }
      return acc;
    }, []);
    const array = componentType === 'thumbnailTracked' ? thumbnailDisplaySets : thumbnailNoImageDisplaySets;
    const {
      displaySetInstanceUID
    } = ds;
    const thumbnailProps = {
      displaySetInstanceUID,
      description: ds.SeriesDescription,
      seriesNumber: ds.SeriesNumber,
      modality: ds.Modality,
      seriesDate: formatDate(ds.SeriesDate),
      numInstances: ds.numImageFrames,
      countIcon: ds.countIcon,
      StudyInstanceUID: ds.StudyInstanceUID,
      componentType,
      imageSrc,
      dragData: {
        type: 'displayset',
        displaySetInstanceUID
        // .. Any other data to pass
      },

      isTracked: trackedSeriesInstanceUIDs.includes(ds.SeriesInstanceUID),
      viewportIdentificator
    };
    if (componentType === 'thumbnailNoImage') {
      if (dataSource.reject && dataSource.reject.series) {
        thumbnailProps.canReject = true;
        thumbnailProps.onReject = () => {
          uiDialogService.create({
            id: 'ds-reject-sr',
            centralize: true,
            isDraggable: false,
            showOverlay: true,
            content: _ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Dialog,
            contentProps: {
              title: 'Delete Report',
              body: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
                className: "p-4 text-white bg-primary-dark"
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Are you sure you want to delete this report?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "This action cannot be undone.")),
              actions: [{
                id: 'cancel',
                text: 'Cancel',
                type: 'secondary'
              }, {
                id: 'yes',
                text: 'Yes',
                type: 'primary',
                classes: ['reject-yes-button']
              }],
              onClose: () => uiDialogService.dismiss({
                id: 'ds-reject-sr'
              }),
              onShow: () => {
                const yesButton = document.querySelector('.reject-yes-button');
                yesButton.focus();
              },
              onSubmit: async _ref3 => {
                let {
                  action
                } = _ref3;
                switch (action.id) {
                  case 'yes':
                    try {
                      await dataSource.reject.series(ds.StudyInstanceUID, ds.SeriesInstanceUID);
                      displaySetService.deleteDisplaySet(displaySetInstanceUID);
                      uiDialogService.dismiss({
                        id: 'ds-reject-sr'
                      });
                      uiNotificationService.show({
                        title: 'Delete Report',
                        message: 'Report deleted successfully',
                        type: 'success'
                      });
                    } catch (error) {
                      uiDialogService.dismiss({
                        id: 'ds-reject-sr'
                      });
                      uiNotificationService.show({
                        title: 'Delete Report',
                        message: 'Failed to delete report',
                        type: 'error'
                      });
                    }
                    break;
                  case 'cancel':
                    uiDialogService.dismiss({
                      id: 'ds-reject-sr'
                    });
                    break;
                }
              }
            }
          });
        };
      } else {
        thumbnailProps.canReject = false;
      }
    }
    array.push(thumbnailProps);
  });
  return [...thumbnailDisplaySets, ...thumbnailNoImageDisplaySets];
}
const thumbnailNoImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE', 'DOC', 'OT'];
function _getComponentType(Modality) {
  if (thumbnailNoImageModalities.includes(Modality)) {
    return 'thumbnailNoImage';
  }
  return 'thumbnailTracked';
}

/**
 *
 * @param {string[]} primaryStudyInstanceUIDs
 * @param {object[]} studyDisplayList
 * @param {string} studyDisplayList.studyInstanceUid
 * @param {string} studyDisplayList.date
 * @param {string} studyDisplayList.description
 * @param {string} studyDisplayList.modalities
 * @param {number} studyDisplayList.numInstances
 * @param {object[]} displaySets
 * @returns tabs - The prop object expected by the StudyBrowser component
 */
function _createStudyBrowserTabs(primaryStudyInstanceUIDs, studyDisplayList, displaySets, hangingProtocolService) {
  const primaryStudies = [];
  const recentStudies = [];
  const allStudies = [];

  // Iterate over each study...
  studyDisplayList.forEach(study => {
    // Find it's display sets
    const displaySetsForStudy = displaySets.filter(ds => ds.StudyInstanceUID === study.studyInstanceUid);

    // Sort them
    const dsSortFn = hangingProtocolService.getDisplaySetSortFunction();
    displaySetsForStudy.sort(dsSortFn);

    /* Sort by series number, then by series date
      displaySetsForStudy.sort((a, b) => {
        if (a.seriesNumber !== b.seriesNumber) {
          return a.seriesNumber - b.seriesNumber;
        }
         const seriesDateA = Date.parse(a.seriesDate);
        const seriesDateB = Date.parse(b.seriesDate);
         return seriesDateA - seriesDateB;
      });
    */

    // Map the study to it's tab/view representation
    const tabStudy = Object.assign({}, study, {
      displaySets: displaySetsForStudy
    });

    // Add the "tab study" to the 'primary', 'recent', and/or 'all' tab group(s)
    if (primaryStudyInstanceUIDs.includes(study.studyInstanceUid)) {
      primaryStudies.push(tabStudy);
      allStudies.push(tabStudy);
    } else {
      // TODO: Filter allStudies to dates within one year of current date
      recentStudies.push(tabStudy);
      allStudies.push(tabStudy);
    }
  });

  // Newest first
  const _byDate = (a, b) => {
    const dateA = Date.parse(a);
    const dateB = Date.parse(b);
    return dateB - dateA;
  };
  const tabs = [{
    name: 'primary',
    label: 'Primary',
    studies: primaryStudies.sort((studyA, studyB) => _byDate(studyA.date, studyB.date))
  }, {
    name: 'recent',
    label: 'Recent',
    studies: recentStudies.sort((studyA, studyB) => _byDate(studyA.date, studyB.date))
  }, {
    name: 'all',
    label: 'All',
    studies: allStudies.sort((studyA, studyB) => _byDate(studyA.date, studyB.date))
  }];
  return tabs;
}
function _findTabAndStudyOfDisplaySet(displaySetInstanceUID, tabs) {
  for (let t = 0; t < tabs.length; t++) {
    const {
      studies
    } = tabs[t];
    for (let s = 0; s < studies.length; s++) {
      const {
        displaySets
      } = studies[s];
      for (let d = 0; d < displaySets.length; d++) {
        const displaySet = displaySets[d];
        if (displaySet.displaySetInstanceUID === displaySetInstanceUID) {
          return {
            tabName: tabs[t].name,
            StudyInstanceUID: studies[s].studyInstanceUid
          };
        }
      }
    }
  }
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(formatDate, "formatDate", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(PanelStudyBrowserTracking, "PanelStudyBrowserTracking", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(_mapDataSourceStudies, "_mapDataSourceStudies", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(_mapDisplaySets, "_mapDisplaySets", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(thumbnailNoImageModalities, "thumbnailNoImageModalities", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(_getComponentType, "_getComponentType", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(_createStudyBrowserTabs, "_createStudyBrowserTabs", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(_findTabAndStudyOfDisplaySet, "_findTabAndStudyOfDisplaySet", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js":
/*!***************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
/**
 * @param {*} cornerstone
 * @param {*} imageId
 */
function getImageSrcFromImageId(cornerstone, imageId) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    cornerstone.utilities.loadImageToCanvas({
      canvas,
      imageId
    }).then(imageId => {
      resolve(canvas.toDataURL());
    }).catch(reject);
  });
}
const _default = getImageSrcFromImageId;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getImageSrcFromImageId, "getImageSrcFromImageId", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelStudyBrowserTracking */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/PanelStudyBrowserTracking.tsx");
/* harmony import */ var _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getImageSrcFromImageId */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/getImageSrcFromImageId.js");
/* harmony import */ var _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./requestDisplaySetCreationForStudy */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/requestDisplaySetCreationForStudy.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


//



function _getStudyForPatientUtility(extensionManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-default.utilityModule.common');
  const {
    getStudiesForPatientByMRN
  } = utilityModule.exports;
  return getStudiesForPatientByMRN;
}

/**
 * Wraps the PanelStudyBrowser and provides features afforded by managers/services
 *
 * @param {object} params
 * @param {object} commandsManager
 * @param {object} extensionManager
 */
function WrappedPanelStudyBrowserTracking(_ref) {
  let {
    commandsManager,
    extensionManager,
    servicesManager
  } = _ref;
  const dataSource = extensionManager.getActiveDataSource()[0];
  const getStudiesForPatientByMRN = _getStudyForPatientUtility(extensionManager);
  const _getStudiesForPatientByMRN = getStudiesForPatientByMRN.bind(null, dataSource);
  const _getImageSrcFromImageId = _createGetImageSrcFromImageIdFn(extensionManager);
  const _requestDisplaySetCreationForStudy = _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_4__["default"].bind(null, dataSource);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_2__["default"], {
    servicesManager: servicesManager,
    dataSource: dataSource,
    getImageSrc: _getImageSrcFromImageId,
    getStudiesForPatientByMRN: _getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy: _requestDisplaySetCreationForStudy
  });
}

/**
 * Grabs cornerstone library reference using a dependent command from
 * the @ohif/extension-cornerstone extension. Then creates a helper function
 * that can take an imageId and return an image src.
 *
 * @param {func} getCommand - CommandManager's getCommand method
 * @returns {func} getImageSrcFromImageId - A utility function powered by
 * cornerstone
 */
function _createGetImageSrcFromImageIdFn(extensionManager) {
  const utilities = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  try {
    const {
      cornerstone
    } = utilities.exports.getCornerstoneLibraries();
    return _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_3__["default"].bind(null, cornerstone);
  } catch (ex) {
    throw new Error('Required command not found');
  }
}
WrappedPanelStudyBrowserTracking.propTypes = {
  commandsManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  extensionManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
const _default = WrappedPanelStudyBrowserTracking;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_getStudyForPatientUtility, "_getStudyForPatientUtility", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx");
  reactHotLoader.register(WrappedPanelStudyBrowserTracking, "WrappedPanelStudyBrowserTracking", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx");
  reactHotLoader.register(_createGetImageSrcFromImageIdFn, "_createGetImageSrcFromImageIdFn", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/requestDisplaySetCreationForStudy.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/requestDisplaySetCreationForStudy.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
function requestDisplaySetCreationForStudy(dataSource, displaySetService, StudyInstanceUID, madeInClient) {
  if (displaySetService.activeDisplaySets.some(displaySet => displaySet.StudyInstanceUID === StudyInstanceUID)) {
    return;
  }
  dataSource.retrieve.series.metadata({
    StudyInstanceUID,
    madeInClient
  });
}
const _default = requestDisplaySetCreationForStudy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(requestDisplaySetCreationForStudy, "requestDisplaySetCreationForStudy", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/requestDisplaySetCreationForStudy.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/requestDisplaySetCreationForStudy.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/measurement-tracking/src/panels/index.js":
/*!********************************************************************!*\
  !*** ../../../extensions/measurement-tracking/src/panels/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelMeasurementTableTracking: () => (/* reexport safe */ _PanelMeasurementTableTracking__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   PanelStudyBrowserTracking: () => (/* reexport safe */ _PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PanelStudyBrowserTracking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelStudyBrowserTracking */ "../../../extensions/measurement-tracking/src/panels/PanelStudyBrowserTracking/index.tsx");
/* harmony import */ var _PanelMeasurementTableTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelMeasurementTableTracking */ "../../../extensions/measurement-tracking/src/panels/PanelMeasurementTableTracking/index.tsx");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




/***/ }),

/***/ "../../../extensions/measurement-tracking/package.json":
/*!*************************************************************!*\
  !*** ../../../extensions/measurement-tracking/package.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/extension-measurement-tracking","version":"3.6.0","description":"Tracking features and functionality for basic image viewing","author":"OHIF Core Team","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-measurement-tracking.umd.js","module":"src/index.tsx","publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"files":["dist","README.md"],"keywords":["ohif-extension"],"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@cornerstonejs/core":"^1.1.0","@cornerstonejs/tools":"^1.1.0","@ohif/core":"3.6.0","@ohif/extension-cornerstone-dicom-sr":"3.6.0","@ohif/ui":"3.6.0","classnames":"^2.3.2","dcmjs":"^0.29.5","lodash.debounce":"^4.17.21","prop-types":"^15.6.2","react":"^17.0.2","react-dom":"^17.0.2","webpack":"^5.50.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","@ohif/ui":"3.6.0","@xstate/react":"^0.8.1","xstate":"^4.10.0"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_measurement-tracking_src_index_tsx.js.map