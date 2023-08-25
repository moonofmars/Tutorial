"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-rt/src/utils/_hydrateRT.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/utils/_hydrateRT.ts ***!
  \************************************************************************/
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
async function _hydrateRTDisplaySet(_ref) {
  let {
    rtDisplaySet,
    viewportIndex,
    servicesManager
  } = _ref;
  const {
    segmentationService,
    hangingProtocolService,
    viewportGridService
  } = servicesManager.services;
  const displaySetInstanceUID = rtDisplaySet.referencedDisplaySetInstanceUID;
  let segmentationId = null;

  // We need the hydration to notify panels about the new segmentation added
  const suppressEvents = false;
  segmentationId = await segmentationService.createSegmentationForRTDisplaySet(rtDisplaySet, segmentationId, suppressEvents);
  segmentationService.hydrateSegmentation(rtDisplaySet.displaySetInstanceUID);
  const {
    viewports
  } = viewportGridService.getState();
  const updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportIndex, displaySetInstanceUID);
  viewportGridService.setDisplaySetsForViewports(updatedViewports);

  // Todo: fix this after we have a better way for stack viewport segmentations

  // check every viewport in the viewports to see if the displaySetInstanceUID
  // is being displayed, if so we need to update the viewport to use volume viewport
  // (if already is not using it) since Cornerstone3D currently only supports
  // volume viewport for segmentation
  viewports.forEach((viewport, index) => {
    if (index === viewportIndex) {
      return;
    }
    const shouldDisplaySeg = segmentationService.shouldRenderSegmentation(viewport.displaySetInstanceUIDs, rtDisplaySet.displaySetInstanceUID);
    if (shouldDisplaySeg) {
      updatedViewports.push({
        viewportIndex: index,
        displaySetInstanceUIDs: viewport.displaySetInstanceUIDs,
        viewportOptions: {
          initialImageOptions: {
            preset: 'middle'
          }
        }
      });
    }
  });

  // Do the entire update at once
  viewportGridService.setDisplaySetsForViewports(updatedViewports);
  return true;
}
const _default = _hydrateRTDisplaySet;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_hydrateRTDisplaySet, "_hydrateRTDisplaySet", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/_hydrateRT.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/_hydrateRT.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts ***!
  \*****************************************************************************/
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
function createRTToolGroupAndAddTools(ToolGroupService, customizationService, toolGroupId) {
  const {
    tools
  } = customizationService.get('cornerstone.overlayViewportTools') ?? {};
  return ToolGroupService.createToolGroupAndAddTools(toolGroupId, tools, {});
}
const _default = createRTToolGroupAndAddTools;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(createRTToolGroupAndAddTools, "createRTToolGroupAndAddTools", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hydrateRT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_hydrateRT */ "../../../extensions/cornerstone-dicom-rt/src/utils/_hydrateRT.ts");
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
  HYDRATE_SEG: 5
};
function promptHydrateRT(_ref) {
  let {
    servicesManager,
    rtDisplaySet,
    viewportIndex,
    toolGroupId = 'default'
  } = _ref;
  const {
    uiViewportDialogService
  } = servicesManager.services;
  return new Promise(async function (resolve, reject) {
    const promptResult = await _askHydrate(uiViewportDialogService, viewportIndex);
    if (promptResult === RESPONSE.HYDRATE_SEG) {
      const isHydrated = await (0,_hydrateRT__WEBPACK_IMPORTED_MODULE_0__["default"])({
        rtDisplaySet,
        viewportIndex,
        toolGroupId,
        servicesManager
      });
      resolve(isHydrated);
    }
  });
}
function _askHydrate(uiViewportDialogService, viewportIndex) {
  return new Promise(function (resolve, reject) {
    const message = 'Do you want to open this Segmentation?';
    const actions = [{
      type: 'secondary',
      text: 'No',
      value: RESPONSE.CANCEL
    }, {
      type: 'primary',
      text: 'Yes',
      value: RESPONSE.HYDRATE_SEG
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
const _default = promptHydrateRT;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RESPONSE, "RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
  reactHotLoader.register(promptHydrateRT, "promptHydrateRT", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
  reactHotLoader.register(_askHydrate, "_askHydrate", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx ***!
  \********************************************************************************************/
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
/* harmony import */ var _utils_promptHydrateRT__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/promptHydrateRT */ "../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
/* harmony import */ var _getStatusComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_getStatusComponent */ "../../../extensions/cornerstone-dicom-rt/src/viewports/_getStatusComponent.tsx");
/* harmony import */ var _utils_initRTToolGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/initRTToolGroup */ "../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts");
/* harmony import */ var _utils_hydrateRT__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/_hydrateRT */ "../../../extensions/cornerstone-dicom-rt/src/utils/_hydrateRT.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const {
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils;
const RT_TOOLGROUP_BASE_NAME = 'RTToolGroup';
function OHIFCornerstoneRTViewport(props) {
  const {
    children,
    displaySets,
    viewportOptions,
    viewportIndex,
    viewportLabel,
    servicesManager,
    extensionManager
  } = props;
  const {
    displaySetService,
    toolGroupService,
    segmentationService,
    uiNotificationService,
    customizationService
  } = servicesManager.services;
  const toolGroupId = `${RT_TOOLGROUP_BASE_NAME}-${viewportIndex}`;

  // RT viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('RT viewport should only have a single display set');
  }
  const rtDisplaySet = displaySets[0];
  const [viewportGrid, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid)();

  // States
  const [isToolGroupCreated, setToolGroupCreated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedSegment, setSelectedSegment] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);

  // Hydration means that the RT is opened and segments are loaded into the
  // segmentation panel, and RT is also rendered on any viewport that is in the
  // same frameOfReferenceUID as the referencedSeriesUID of the RT. However,
  // loading basically means RT loading over network and bit unpacking of the
  // RT data.
  const [isHydrated, setIsHydrated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(rtDisplaySet.isHydrated);
  const [rtIsLoading, setRtIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!rtDisplaySet.isLoaded);
  const [element, setElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [processingProgress, setProcessingProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    percentComplete: null,
    totalSegments: null
  });

  // refs
  const referencedDisplaySetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    viewports,
    activeViewportIndex
  } = viewportGrid;
  const referencedDisplaySet = rtDisplaySet.getReferenceDisplaySet();
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  /**
   * OnElementEnabled callback which is called after the cornerstoneExtension
   * has enabled the element. Note: we delegate all the image rendering to
   * cornerstoneExtension, so we don't need to do anything here regarding
   * the image rendering, element enabling etc.
   */
  const onElementEnabled = evt => {
    setElement(evt.detail.element);
  };
  const onElementDisabled = () => {
    setElement(null);
  };
  const getCornerstoneViewport = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const {
      component: Component
    } = extensionManager.getModuleEntry('@ohif/extension-cornerstone.viewportModule.cornerstone');
    const {
      displaySet: referencedDisplaySet
    } = referencedDisplaySetRef.current;

    // Todo: jump to the center of the first segment
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, _extends({}, props, {
      displaySets: [referencedDisplaySet, rtDisplaySet],
      viewportOptions: {
        viewportType: 'volume',
        toolGroupId: toolGroupId,
        orientation: viewportOptions.orientation,
        viewportId: viewportOptions.viewportId
      },
      onElementEnabled: onElementEnabled,
      onElementDisabled: onElementDisabled
    }));
  }, [viewportIndex, rtDisplaySet, toolGroupId]);
  const onSegmentChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(direction => {
    direction = direction === 'left' ? -1 : 1;
    const segmentationId = rtDisplaySet.displaySetInstanceUID;
    const segmentation = segmentationService.getSegmentation(segmentationId);
    const {
      segments
    } = segmentation;
    const numberOfSegments = Object.keys(segments).length;
    let newSelectedSegmentIndex = selectedSegment + direction;

    // Segment 0 is always background
    if (newSelectedSegmentIndex >= numberOfSegments - 1) {
      newSelectedSegmentIndex = 1;
    } else if (newSelectedSegmentIndex === 0) {
      newSelectedSegmentIndex = numberOfSegments - 1;
    }
    segmentationService.jumpToSegmentCenter(segmentationId, newSelectedSegmentIndex, toolGroupId);
    setSelectedSegment(newSelectedSegmentIndex);
  }, [selectedSegment]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (rtIsLoading) {
      return;
    }
    (0,_utils_promptHydrateRT__WEBPACK_IMPORTED_MODULE_4__["default"])({
      servicesManager,
      viewportIndex,
      rtDisplaySet
    }).then(isHydrated => {
      if (isHydrated) {
        setIsHydrated(true);
      }
    });
  }, [servicesManager, viewportIndex, rtDisplaySet, rtIsLoading]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.rtDisplaySet.displaySetInstanceUID === rtDisplaySet.displaySetInstanceUID) {
        setRtIsLoading(false);
      }
      if (evt.overlappingSegments) {
        uiNotificationService.show({
          title: 'Overlapping Segments',
          message: 'Overlapping segments detected which is not currently supported',
          type: 'warning'
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [rtDisplaySet]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, _ref => {
      let {
        percentComplete,
        numSegments
      } = _ref;
      setProcessingProgress({
        percentComplete,
        totalSegments: numSegments
      });
    });
    return () => {
      unsubscribe();
    };
  }, [rtDisplaySet]);

  /**
   Cleanup the SEG viewport when the viewport is destroyed
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onDisplaySetsRemovedSubscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_REMOVED, _ref2 => {
      let {
        displaySetInstanceUIDs
      } = _ref2;
      const activeViewport = viewports[activeViewportIndex];
      if (displaySetInstanceUIDs.includes(activeViewport.displaySetInstanceUID)) {
        viewportGridService.setDisplaySetsForViewport({
          viewportIndex: activeViewportIndex,
          displaySetInstanceUIDs: []
        });
      }
    });
    return () => {
      onDisplaySetsRemovedSubscription.unsubscribe();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let toolGroup = toolGroupService.getToolGroup(toolGroupId);
    if (toolGroup) {
      return;
    }
    toolGroup = (0,_utils_initRTToolGroup__WEBPACK_IMPORTED_MODULE_6__["default"])(toolGroupService, customizationService, toolGroupId);
    setToolGroupCreated(true);
    return () => {
      // remove the segmentation representations if seg displayset changed
      segmentationService.removeSegmentationRepresentationFromToolGroup(toolGroupId);
      toolGroupService.destroyToolGroup(toolGroupId);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsHydrated(rtDisplaySet.isHydrated);
    return () => {
      // remove the segmentation representations if seg displayset changed
      segmentationService.removeSegmentationRepresentationFromToolGroup(toolGroupId);
      referencedDisplaySetRef.current = null;
    };
  }, [rtDisplaySet]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let childrenWithProps = null;
  if (!referencedDisplaySetRef.current || referencedDisplaySet.displaySetInstanceUID !== referencedDisplaySetRef.current.displaySet.displaySetInstanceUID) {
    return null;
  }
  if (children && children.length) {
    childrenWithProps = children.map((child, index) => {
      return child && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
        viewportIndex,
        key: index
      });
    });
  }
  const {
    PatientID,
    PatientName,
    PatientSex,
    PatientAge,
    SliceThickness,
    ManufacturerModelName,
    StudyDate,
    SeriesDescription,
    SpacingBetweenSlices,
    SeriesNumber
  } = referencedDisplaySetRef.current.metadata;
  const onStatusClick = async () => {
    const isHydrated = await (0,_utils_hydrateRT__WEBPACK_IMPORTED_MODULE_7__["default"])({
      rtDisplaySet,
      viewportIndex,
      servicesManager
    });
    setIsHydrated(isHydrated);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.ViewportActionBar, {
    onDoubleClick: evt => {
      evt.stopPropagation();
      evt.preventDefault();
    },
    onArrowsClick: onSegmentChange,
    getStatusComponent: () => {
      return (0,_getStatusComponent__WEBPACK_IMPORTED_MODULE_5__["default"])({
        isHydrated,
        onStatusClick
      });
    },
    studyData: {
      label: viewportLabel,
      useAltStyling: true,
      studyDate: formatDate(StudyDate),
      currentSeries: SeriesNumber,
      seriesDescription: `RT Viewport ${SeriesDescription}`,
      patientInformation: {
        patientName: PatientName ? _ohif_core__WEBPACK_IMPORTED_MODULE_2__["default"].utils.formatPN(PatientName.Alphabetic) : '',
        patientSex: PatientSex || '',
        patientAge: PatientAge || '',
        MRN: PatientID || '',
        thickness: SliceThickness ? `${SliceThickness.toFixed(2)}mm` : '',
        spacing: SpacingBetweenSlices !== undefined ? `${SpacingBetweenSlices.toFixed(2)}mm` : '',
        scanner: ManufacturerModelName || ''
      }
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "relative flex flex-row w-full h-full overflow-hidden"
  }, rtIsLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.LoadingIndicatorTotalPercent, {
    className: "w-full h-full",
    totalNumbers: processingProgress.totalSegments,
    percentComplete: processingProgress.percentComplete,
    loadingText: "Loading RTSTRUCT..."
  }), getCornerstoneViewport(), childrenWithProps));
}
__signature__(OHIFCornerstoneRTViewport, "useViewportGrid{[viewportGrid, viewportGridService]}\nuseState{[isToolGroupCreated, setToolGroupCreated](false)}\nuseState{[selectedSegment, setSelectedSegment](1)}\nuseState{[isHydrated, setIsHydrated](rtDisplaySet.isHydrated)}\nuseState{[rtIsLoading, setRtIsLoading](!rtDisplaySet.isLoaded)}\nuseState{[element, setElement](null)}\nuseState{[processingProgress, setProcessingProgress]({\n    percentComplete: null,\n    totalSegments: null,\n  })}\nuseRef{referencedDisplaySetRef}\nuseCallback{getCornerstoneViewport}\nuseCallback{onSegmentChange}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid]);
OHIFCornerstoneRTViewport.propTypes = {
  displaySets: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)),
  viewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node),
  customProps: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};
OHIFCornerstoneRTViewport.defaultProps = {
  customProps: {}
};
function _getReferencedDisplaySetMetadata(referencedDisplaySet) {
  const image0 = referencedDisplaySet.images[0];
  const referencedDisplaySetMetadata = {
    PatientID: image0.PatientID,
    PatientName: image0.PatientName,
    PatientSex: image0.PatientSex,
    PatientAge: image0.PatientAge,
    SliceThickness: image0.SliceThickness,
    StudyDate: image0.StudyDate,
    SeriesDescription: image0.SeriesDescription,
    SeriesInstanceUID: image0.SeriesInstanceUID,
    SeriesNumber: image0.SeriesNumber,
    ManufacturerModelName: image0.ManufacturerModelName,
    SpacingBetweenSlices: image0.SpacingBetweenSlices
  };
  return referencedDisplaySetMetadata;
}
const _default = OHIFCornerstoneRTViewport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(formatDate, "formatDate", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx");
  reactHotLoader.register(RT_TOOLGROUP_BASE_NAME, "RT_TOOLGROUP_BASE_NAME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx");
  reactHotLoader.register(OHIFCornerstoneRTViewport, "OHIFCornerstoneRTViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx");
  reactHotLoader.register(_getReferencedDisplaySetMetadata, "_getReferencedDisplaySetMetadata", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone-dicom-rt/src/viewports/_getStatusComponent.tsx":
/*!**************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-rt/src/viewports/_getStatusComponent.tsx ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getStatusComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



function _getStatusComponent(_ref) {
  let {
    isHydrated,
    onStatusClick
  } = _ref;
  let ToolTipMessage = null;
  let StatusIcon = null;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('Common');
  const loadStr = t('LOAD');
  switch (isHydrated) {
    case true:
      StatusIcon = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        name: "status-alert"
      });
      ToolTipMessage = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "This Segmentation is loaded in the segmentation panel");
      break;
    case false:
      StatusIcon = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        name: "status-untracked"
      });
      ToolTipMessage = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Click LOAD to load RTSTRUCT.");
  }
  const StatusArea = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex h-6 leading-6 cursor-default text-sm text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "min-w-[45px] flex items-center p-1 rounded-l-xl rounded-r bg-customgray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StatusIcon, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "ml-1"
  }, "RTSTRUCT")), !isHydrated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "ml-1 px-1.5 rounded cursor-pointer hover:text-black bg-primary-main hover:bg-primary-light"
    // Using onMouseUp here because onClick is not working when the viewport is not active and is styled with pointer-events:none
    ,
    onMouseUp: onStatusClick
  }, loadStr));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, ToolTipMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ToolTipMessage, null),
    position: "bottom-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StatusArea, null)), !ToolTipMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StatusArea, null));
}
__signature__(_getStatusComponent, "useTranslation{{ t }}", () => [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation]);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_getStatusComponent, "_getStatusComponent", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone-dicom-rt/src/viewports/_getStatusComponent.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx.js.map