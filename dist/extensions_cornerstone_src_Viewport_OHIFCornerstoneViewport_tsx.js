(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx"],{

/***/ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-resize-detector */ "../../../node_modules/react-resize-detector/build/index.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../state */ "../../../extensions/cornerstone/src/state.ts");
/* harmony import */ var _OHIFCornerstoneViewport_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OHIFCornerstoneViewport.css */ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");
/* harmony import */ var _OHIFCornerstoneViewport_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_OHIFCornerstoneViewport_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Overlays_CornerstoneOverlays__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Overlays/CornerstoneOverlays */ "../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx");
/* harmony import */ var _utils_measurementServiceMappings_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/measurementServiceMappings/utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};











const STACK = 'stack';

/**
 * Caches the jump to measurement operation, so that if display set is shown,
 * it can jump to the measurement.
 */
let cacheJumpToMeasurementEvent;
function areEqual(prevProps, nextProps) {
  if (nextProps.needsRerendering) {
    return false;
  }
  if (prevProps.displaySets.length !== nextProps.displaySets.length) {
    return false;
  }
  if (prevProps.viewportOptions.orientation !== nextProps.viewportOptions.orientation) {
    return false;
  }
  if (prevProps.viewportOptions.toolGroupId !== nextProps.viewportOptions.toolGroupId) {
    return false;
  }
  if (prevProps.viewportOptions.viewportType !== nextProps.viewportOptions.viewportType) {
    return false;
  }
  const prevDisplaySets = prevProps.displaySets;
  const nextDisplaySets = nextProps.displaySets;
  if (prevDisplaySets.length !== nextDisplaySets.length) {
    return false;
  }
  for (let i = 0; i < prevDisplaySets.length; i++) {
    const prevDisplaySet = prevDisplaySets[i];
    const foundDisplaySet = nextDisplaySets.find(nextDisplaySet => nextDisplaySet.displaySetInstanceUID === prevDisplaySet.displaySetInstanceUID);
    if (!foundDisplaySet) {
      return false;
    }

    // check they contain the same image
    if (foundDisplaySet.images?.length !== prevDisplaySet.images?.length) {
      return false;
    }

    // check if their imageIds are the same
    if (foundDisplaySet.images?.length) {
      for (let j = 0; j < foundDisplaySet.images.length; j++) {
        if (foundDisplaySet.images[j].imageId !== prevDisplaySet.images[j].imageId) {
          return false;
        }
      }
    }
  }
  return true;
}

// Todo: This should be done with expose of internal API similar to react-vtkjs-viewport
// Then we don't need to worry about the re-renders if the props change.
const OHIFCornerstoneViewport = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(__signature__(props => {
  const {
    viewportIndex,
    displaySets,
    dataSource,
    viewportOptions,
    displaySetOptions,
    servicesManager,
    onElementEnabled,
    onElementDisabled,
    // Note: you SHOULD NOT use the initialImageIdOrIndex for manipulation
    // of the imageData in the OHIFCornerstoneViewport. This prop is used
    // to set the initial state of the viewport's first image to render
    initialImageIndex
  } = props;
  const [scrollbarHeight, setScrollbarHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('100px');
  const [{
    isCineEnabled,
    cines
  }, cineService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.useCine)();
  const [{
    activeViewportIndex
  }] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.useViewportGrid)();
  const [enabledVPElement, setEnabledVPElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    measurementService,
    displaySetService,
    toolbarService,
    toolGroupService,
    syncGroupService,
    cornerstoneViewportService,
    cornerstoneCacheService,
    viewportGridService,
    stateSyncService
  } = servicesManager.services;
  const [viewportDialogState] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.useViewportDialog)();
  const cineHandler = () => {
    if (!cines || !cines[viewportIndex] || !enabledVPElement) {
      return;
    }
    const cine = cines[viewportIndex];
    const isPlaying = cine.isPlaying || false;
    const frameRate = cine.frameRate || 24;
    const validFrameRate = Math.max(frameRate, 1);
    if (isPlaying) {
      cineService.playClip(enabledVPElement, {
        framesPerSecond: validFrameRate
      });
    } else {
      cineService.stopClip(enabledVPElement);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.Enums.Events.STACK_VIEWPORT_NEW_STACK, cineHandler);
    return () => {
      cineService.setCine({
        id: viewportIndex,
        isPlaying: false
      });
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.Enums.Events.STACK_VIEWPORT_NEW_STACK, cineHandler);
    };
  }, [enabledVPElement]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!cines || !cines[viewportIndex] || !enabledVPElement) {
      return;
    }
    cineHandler();
    return () => {
      if (enabledVPElement && cines?.[viewportIndex]?.isPlaying) {
        cineService.stopClip(enabledVPElement);
      }
    };
  }, [cines, viewportIndex, cineService, enabledVPElement, cineHandler]);
  const cine = cines[viewportIndex];
  const isPlaying = cine && cine.isPlaying || false;
  const handleCineClose = () => {
    toolbarService.recordInteraction({
      groupId: 'MoreTools',
      itemId: 'cine',
      interactionType: 'toggle',
      commands: [{
        commandName: 'toggleCine',
        commandOptions: {},
        context: 'CORNERSTONE'
      }]
    });
  };

  // useCallback for scroll bar height calculation
  const setImageScrollBarHeight = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const scrollbarHeight = `${elementRef.current.clientHeight - 20}px`;
    setScrollbarHeight(scrollbarHeight);
  }, [elementRef]);

  // useCallback for onResize
  const onResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (elementRef.current) {
      cornerstoneViewportService.resize();
      setImageScrollBarHeight();
    }
  }, [elementRef]);
  const storePresentation = () => {
    const currentPresentation = cornerstoneViewportService.getPresentation(viewportIndex);
    if (!currentPresentation || !currentPresentation.presentationIds) return;
    const {
      lutPresentationStore,
      positionPresentationStore
    } = stateSyncService.getState();
    const {
      presentationIds
    } = currentPresentation;
    const {
      lutPresentationId,
      positionPresentationId
    } = presentationIds || {};
    const storeState = {};
    if (lutPresentationId) {
      storeState.lutPresentationStore = {
        ...lutPresentationStore,
        [lutPresentationId]: currentPresentation
      };
    }
    if (positionPresentationId) {
      storeState.positionPresentationStore = {
        ...positionPresentationStore,
        [positionPresentationId]: currentPresentation
      };
    }
    stateSyncService.store(storeState);
  };
  const cleanUpServices = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
    if (!viewportInfo) {
      return;
    }
    const viewportId = viewportInfo.getViewportId();
    const renderingEngineId = viewportInfo.getRenderingEngineId();
    const syncGroups = viewportInfo.getSyncGroups();
    toolGroupService.removeViewportFromToolGroup(viewportId, renderingEngineId);
    syncGroupService.removeViewportFromSyncGroup(viewportId, renderingEngineId, syncGroups);
  }, [viewportIndex, viewportOptions.viewportId]);
  const elementEnabledHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(evt => {
    // check this is this element reference and return early if doesn't match
    if (evt.detail.element !== elementRef.current) {
      return;
    }
    const {
      viewportId,
      element
    } = evt.detail;
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    const viewportIndex = viewportInfo.getViewportIndex();
    (0,_state__WEBPACK_IMPORTED_MODULE_7__.setEnabledElement)(viewportIndex, element);
    setEnabledVPElement(element);
    const renderingEngineId = viewportInfo.getRenderingEngineId();
    const toolGroupId = viewportInfo.getToolGroupId();
    const syncGroups = viewportInfo.getSyncGroups();
    toolGroupService.addViewportToToolGroup(viewportId, renderingEngineId, toolGroupId);
    syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, syncGroups);
    if (onElementEnabled) {
      onElementEnabled(evt);
    }
  }, [viewportIndex, onElementEnabled, toolGroupService]);

  // disable the element upon unmounting
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    cornerstoneViewportService.enableViewport(viewportIndex, viewportOptions, elementRef.current);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.Enums.Events.ELEMENT_ENABLED, elementEnabledHandler);
    setImageScrollBarHeight();
    return () => {
      storePresentation();
      cleanUpServices();
      const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
      cornerstoneViewportService.disableElement(viewportIndex);
      if (onElementDisabled) {
        onElementDisabled(viewportInfo);
      }
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.Enums.Events.ELEMENT_ENABLED, elementEnabledHandler);
    };
  }, []);

  // subscribe to displaySet metadata invalidation (updates)
  // Currently, if the metadata changes we need to re-render the display set
  // for it to take effect in the viewport. As we deal with scaling in the loading,
  // we need to remove the old volume from the cache, and let the
  // viewport to re-add it which will use the new metadata. Otherwise, the
  // viewport will use the cached volume and the new metadata will not be used.
  // Note: this approach does not actually end of sending network requests
  // and it uses the network cache
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SET_SERIES_METADATA_INVALIDATED, async invalidatedDisplaySetInstanceUID => {
      const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
      if (viewportInfo.hasDisplaySet(invalidatedDisplaySetInstanceUID)) {
        const viewportData = viewportInfo.getViewportData();
        const newViewportData = await cornerstoneCacheService.invalidateViewportData(viewportData, invalidatedDisplaySetInstanceUID, dataSource, displaySetService);
        const keepCamera = true;
        cornerstoneViewportService.updateViewport(viewportIndex, newViewportData, keepCamera);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [viewportIndex]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // handle the default viewportType to be stack
    if (!viewportOptions.viewportType) {
      viewportOptions.viewportType = STACK;
    }
    const loadViewportData = async () => {
      const viewportData = await cornerstoneCacheService.createViewportData(displaySets, viewportOptions, dataSource, initialImageIndex);

      // The presentation state will have been stored previously by closing
      // a viewport.  Otherwise, this viewport will be unchanged and the
      // presentation information will be directly carried over.
      const {
        lutPresentationStore,
        positionPresentationStore
      } = stateSyncService.getState();
      const {
        presentationIds
      } = viewportOptions;
      const presentations = {
        positionPresentation: positionPresentationStore[presentationIds?.positionPresentationId],
        lutPresentation: lutPresentationStore[presentationIds?.lutPresentationId]
      };
      let measurement;
      if (cacheJumpToMeasurementEvent?.viewportIndex === viewportIndex) {
        measurement = cacheJumpToMeasurementEvent.measurement;
        // Delete the position presentation so that viewport navigates direct
        presentations.positionPresentation = null;
        cacheJumpToMeasurementEvent = null;
      }
      cornerstoneViewportService.setViewportData(viewportIndex, viewportData, viewportOptions, displaySetOptions, presentations);
      if (measurement) {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.annotation.selection.setAnnotationSelected(measurement.uid);
      }
    };
    loadViewportData();
  }, [viewportOptions, displaySets, dataSource]);

  /**
   * There are two scenarios for jump to click
   * 1. Current viewports contain the displaySet that the annotation was drawn on
   * 2. Current viewports don't contain the displaySet that the annotation was drawn on
   * and we need to change the viewports displaySet for jumping.
   * Since measurement_jump happens via events and listeners, the former case is handled
   * by the measurement_jump direct callback, but the latter case is handled first by
   * the viewportGrid to set the correct displaySet on the viewport, AND THEN we check
   * the cache for jumping to see if there is any jump queued, then we jump to the correct slice.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsubscribeFromJumpToMeasurementEvents = _subscribeToJumpToMeasurementEvents(measurementService, displaySetService, elementRef, viewportIndex, displaySets, viewportGridService, cornerstoneViewportService);
    _checkForCachedJumpToMeasurementEvents(measurementService, displaySetService, elementRef, viewportIndex, displaySets, viewportGridService, cornerstoneViewportService);
    return () => {
      unsubscribeFromJumpToMeasurementEvents();
    };
  }, [displaySets, elementRef, viewportIndex]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "viewport-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_resize_detector__WEBPACK_IMPORTED_MODULE_1__["default"], {
    handleWidth: true,
    handleHeight: true,
    skipOnMount: true // Todo: make these configurable
    ,
    refreshMode: 'debounce',
    refreshRate: 200 // transition amount in side panel
    ,
    onResize: onResize,
    targetRef: elementRef.current
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "cornerstone-viewport-element",
    style: {
      height: '100%',
      width: '100%'
    },
    onContextMenu: e => e.preventDefault(),
    onMouseDown: e => e.preventDefault(),
    ref: elementRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Overlays_CornerstoneOverlays__WEBPACK_IMPORTED_MODULE_9__["default"], {
    viewportIndex: viewportIndex,
    toolBarService: toolbarService,
    element: elementRef.current,
    scrollbarHeight: scrollbarHeight,
    servicesManager: servicesManager
  }), isCineEnabled && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.CinePlayer, {
    className: "absolute left-1/2 -translate-x-1/2 bottom-3",
    isPlaying: isPlaying,
    onClose: handleCineClose,
    onPlayPauseChange: isPlaying => cineService.setCine({
      id: activeViewportIndex,
      isPlaying
    }),
    onFrameRateChange: frameRate => cineService.setCine({
      id: activeViewportIndex,
      frameRate
    })
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "absolute w-full"
  }, viewportDialogState.viewportIndex === viewportIndex && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.Notification, {
    id: "viewport-notification",
    message: viewportDialogState.message,
    type: viewportDialogState.type,
    actions: viewportDialogState.actions,
    onSubmit: viewportDialogState.onSubmit,
    onOutsideClick: viewportDialogState.onOutsideClick
  })));
}, "useState{[scrollbarHeight, setScrollbarHeight]('100px')}\nuseCine{[{ isCineEnabled, cines }, cineService]}\nuseViewportGrid{[{ activeViewportIndex }]}\nuseState{[enabledVPElement, setEnabledVPElement](null)}\nuseRef{elementRef}\nuseViewportDialog{[viewportDialogState]}\nuseEffect{}\nuseEffect{}\nuseCallback{setImageScrollBarHeight}\nuseCallback{onResize}\nuseCallback{cleanUpServices}\nuseCallback{elementEnabledHandler}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.useCine, _ohif_ui__WEBPACK_IMPORTED_MODULE_6__.useViewportGrid, _ohif_ui__WEBPACK_IMPORTED_MODULE_6__.useViewportDialog]), areEqual);
function _subscribeToJumpToMeasurementEvents(measurementService, displaySetService, elementRef, viewportIndex, displaySets, viewportGridService, cornerstoneViewportService) {
  const displaysUIDs = displaySets.map(displaySet => displaySet.displaySetInstanceUID);
  const {
    unsubscribe
  } = measurementService.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.MeasurementService.EVENTS.JUMP_TO_MEASUREMENT_VIEWPORT, props => {
    cacheJumpToMeasurementEvent = props;
    const {
      viewportIndex: jumpIndex,
      measurement,
      isConsumed
    } = props;
    if (!measurement || isConsumed) return;
    if (cacheJumpToMeasurementEvent.cornerstoneViewport === undefined) {
      // Decide on which viewport should handle this
      cacheJumpToMeasurementEvent.cornerstoneViewport = cornerstoneViewportService.getViewportIndexToJump(jumpIndex, measurement.displaySetInstanceUID, {
        referencedImageId: measurement.referencedImageId
      });
    }
    if (cacheJumpToMeasurementEvent.cornerstoneViewport !== viewportIndex) {
      return;
    }
    _jumpToMeasurement(measurement, elementRef, viewportIndex, measurementService, displaySetService, viewportGridService, cornerstoneViewportService);
  });
  return unsubscribe;
}

// Check if there is a queued jumpToMeasurement event
function _checkForCachedJumpToMeasurementEvents(measurementService, displaySetService, elementRef, viewportIndex, displaySets, viewportGridService, cornerstoneViewportService) {
  if (!cacheJumpToMeasurementEvent) return;
  if (cacheJumpToMeasurementEvent.isConsumed) {
    cacheJumpToMeasurementEvent = null;
    return;
  }
  const displaysUIDs = displaySets.map(displaySet => displaySet.displaySetInstanceUID);
  if (!displaysUIDs?.length) return;

  // Jump to measurement if the measurement exists
  const {
    measurement
  } = cacheJumpToMeasurementEvent;
  if (measurement && elementRef) {
    if (displaysUIDs.includes(measurement?.displaySetInstanceUID)) {
      _jumpToMeasurement(measurement, elementRef, viewportIndex, measurementService, displaySetService, viewportGridService, cornerstoneViewportService);
    }
  }
}
function _jumpToMeasurement(measurement, targetElementRef, viewportIndex, measurementService, displaySetService, viewportGridService, cornerstoneViewportService) {
  const targetElement = targetElementRef.current;
  const {
    displaySetInstanceUID,
    SOPInstanceUID,
    frameNumber
  } = measurement;
  if (!SOPInstanceUID) {
    console.warn('cannot jump in a non-acquisition plane measurements yet');
    return;
  }
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

  // Todo: setCornerstoneMeasurementActive should be handled by the toolGroupManager
  //  to set it properly
  // setCornerstoneMeasurementActive(measurement);

  viewportGridService.setActiveViewportIndex(viewportIndex);
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.getEnabledElement)(targetElement);
  const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
  if (enabledElement) {
    // See how the jumpToSlice() of Cornerstone3D deals with imageIdx param.
    const viewport = enabledElement.viewport;
    let imageIdIndex = 0;
    let viewportCameraDirectionMatch = true;
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.StackViewport) {
      const imageIds = viewport.getImageIds();
      imageIdIndex = imageIds.findIndex(imageId => {
        const {
          SOPInstanceUID: aSOPInstanceUID,
          frameNumber: aFrameNumber
        } = (0,_utils_measurementServiceMappings_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_10__["default"])(imageId);
        return aSOPInstanceUID === SOPInstanceUID && (!frameNumber || frameNumber === aFrameNumber);
      });
    } else {
      // for volume viewport we can't rely on the imageIdIndex since it can be
      // a reconstructed view that doesn't match the original slice numbers etc.
      const {
        viewPlaneNormal: measurementViewPlane
      } = measurement.metadata;
      imageIdIndex = referencedDisplaySet.images.findIndex(i => i.SOPInstanceUID === SOPInstanceUID);
      const {
        viewPlaneNormal: viewportViewPlane
      } = viewport.getCamera();

      // should compare abs for both planes since the direction can be flipped
      if (measurementViewPlane && !_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.utilities.isEqual(measurementViewPlane.map(Math.abs), viewportViewPlane.map(Math.abs))) {
        viewportCameraDirectionMatch = false;
      }
    }
    if (!viewportCameraDirectionMatch || imageIdIndex === -1) {
      return;
    }
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.jumpToSlice(targetElement, {
      imageIndex: imageIdIndex
    });
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.annotation.selection.setAnnotationSelected(measurement.uid);
    // Jump to measurement consumed, remove.
    cacheJumpToMeasurementEvent?.consume?.();
    cacheJumpToMeasurementEvent = null;
  }
}

// Component displayName
OHIFCornerstoneViewport.displayName = 'OHIFCornerstoneViewport';
OHIFCornerstoneViewport.propTypes = {
  viewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number).isRequired,
  displaySets: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array).isRequired,
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired,
  viewportOptions: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  displaySetOptions: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_2___default().any)),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired,
  onElementEnabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  // Note: you SHOULD NOT use the initialImageIdOrIndex for manipulation
  // of the imageData in the OHIFCornerstoneViewport. This prop is used
  // to set the initial state of the viewport's first image to render
  initialImageIdOrIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)])
};
const _default = OHIFCornerstoneViewport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(STACK, "STACK", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(cacheJumpToMeasurementEvent, "cacheJumpToMeasurementEvent", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(areEqual, "areEqual", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(OHIFCornerstoneViewport, "OHIFCornerstoneViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(_subscribeToJumpToMeasurementEvents, "_subscribeToJumpToMeasurementEvents", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(_checkForCachedJumpToMeasurementEvents, "_checkForCachedJumpToMeasurementEvents", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(_jumpToMeasurement, "_jumpToMeasurement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _ViewportImageScrollbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewportImageScrollbar */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx");
/* harmony import */ var _CustomizableViewportOverlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomizableViewportOverlay */ "../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
/* harmony import */ var _ViewportOrientationMarkers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewportOrientationMarkers */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
/* harmony import */ var _ViewportImageSliceLoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewportImageSliceLoadingIndicator */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





function CornerstoneOverlays(props) {
  const {
    viewportIndex,
    element,
    scrollbarHeight,
    servicesManager
  } = props;
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [imageSliceData, setImageSliceData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    imageIndex: 0,
    numberOfSlices: 0
  });
  const [viewportData, setViewportData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED, props => {
      if (props.viewportIndex !== viewportIndex) {
        return;
      }
      setViewportData(props.viewportData);
    });
    return () => {
      unsubscribe();
    };
  }, [viewportIndex]);
  if (!element) {
    return null;
  }
  if (viewportData) {
    const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
    if (viewportInfo?.viewportOptions?.customViewportProps?.hideOverlays) {
      return null;
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "noselect"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ViewportImageScrollbar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    viewportIndex: viewportIndex,
    viewportData: viewportData,
    element: element,
    imageSliceData: imageSliceData,
    setImageSliceData: setImageSliceData,
    scrollbarHeight: scrollbarHeight,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CustomizableViewportOverlay__WEBPACK_IMPORTED_MODULE_2__["default"], {
    imageSliceData: imageSliceData,
    viewportData: viewportData,
    viewportIndex: viewportIndex,
    servicesManager: servicesManager,
    element: element
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ViewportImageSliceLoadingIndicator__WEBPACK_IMPORTED_MODULE_4__["default"], {
    viewportData: viewportData,
    element: element
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ViewportOrientationMarkers__WEBPACK_IMPORTED_MODULE_3__["default"], {
    imageSliceData: imageSliceData,
    element: element,
    viewportData: viewportData,
    servicesManager: servicesManager,
    viewportIndex: viewportIndex
  }));
}
__signature__(CornerstoneOverlays, "useState{[imageSliceData, setImageSliceData]({\n    imageIndex: 0,\n    numberOfSlices: 0,\n  })}\nuseState{[viewportData, setViewportData](null)}\nuseEffect{}");
const _default = CornerstoneOverlays;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(CornerstoneOverlays, "CornerstoneOverlays", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "../../../extensions/cornerstone/src/Viewport/Overlays/utils.ts");
/* harmony import */ var _CustomizableViewportOverlay_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomizableViewportOverlay.css */ "../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css");
/* harmony import */ var _CustomizableViewportOverlay_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CustomizableViewportOverlay_css__WEBPACK_IMPORTED_MODULE_6__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const EPSILON = 1e-4;
/**
 * Window Level / Center Overlay item
 */
function VOIOverlayItem(_ref) {
  let {
    voi,
    customization
  } = _ref;
  const {
    windowWidth,
    windowCenter
  } = voi;
  if (typeof windowCenter !== 'number' || typeof windowWidth !== 'number') {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "mr-1 shrink-0"
  }, "W:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "ml-1 mr-2 font-light shrink-0"
  }, windowWidth.toFixed(0)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "mr-1 shrink-0"
  }, "L:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "ml-1 font-light shrink-0"
  }, windowCenter.toFixed(0)));
}

/**
 * Zoom Level Overlay item
 */
function ZoomOverlayItem(_ref2) {
  let {
    scale,
    customization
  } = _ref2;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "mr-1 shrink-0"
  }, "Zoom:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "font-light"
  }, scale.toFixed(2), "x"));
}

/**
 * Instance Number Overlay Item
 */
function InstanceNumberOverlayItem(_ref3) {
  let {
    instanceNumber,
    imageSliceData,
    customization
  } = _ref3;
  const {
    imageIndex,
    numberOfSlices
  } = imageSliceData;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "mr-1 shrink-0"
  }, "I:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "font-light"
  }, instanceNumber !== undefined && instanceNumber !== null ? `${instanceNumber} (${imageIndex + 1}/${numberOfSlices})` : `${imageIndex + 1}/${numberOfSlices}`));
}

/**
 * Customizable Viewport Overlay
 */
function CustomizableViewportOverlay(_ref4) {
  let {
    element,
    viewportData,
    imageSliceData,
    viewportIndex,
    servicesManager
  } = _ref4;
  const {
    toolbarService,
    cornerstoneViewportService,
    customizationService
  } = servicesManager.services;
  const [voi, setVOI] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    windowCenter: null,
    windowWidth: null
  });
  const [scale, setScale] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [activeTools, setActiveTools] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    imageIndex
  } = imageSliceData;
  const topLeftCustomization = customizationService.getModeCustomization('cornerstoneOverlayTopLeft');
  const topRightCustomization = customizationService.getModeCustomization('cornerstoneOverlayTopRight');
  const bottomLeftCustomization = customizationService.getModeCustomization('cornerstoneOverlayBottomLeft');
  const bottomRightCustomization = customizationService.getModeCustomization('cornerstoneOverlayBottomRight');
  const instance = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (viewportData != null) {
      return _getViewportInstance(viewportData, imageIndex);
    } else {
      return null;
    }
  }, [viewportData, imageIndex]);
  const instanceNumber = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (viewportData != null) {
      return _getInstanceNumber(viewportData, viewportIndex, imageIndex, cornerstoneViewportService);
    }
    return null;
  }, [viewportData, viewportIndex, imageIndex, cornerstoneViewportService]);

  /**
   * Initial toolbar state
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setActiveTools(toolbarService.getActiveTools());
  }, []);

  /**
   * Updating the VOI when the viewport changes its voi
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateVOI = eventDetail => {
      const {
        range
      } = eventDetail.detail;
      if (!range) {
        return;
      }
      const {
        lower,
        upper
      } = range;
      const {
        windowWidth,
        windowCenter
      } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.utilities.windowLevel.toWindowLevel(lower, upper);
      setVOI({
        windowCenter,
        windowWidth
      });
    };
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.VOI_MODIFIED, updateVOI);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.VOI_MODIFIED, updateVOI);
    };
  }, [viewportIndex, viewportData, voi, element]);

  /**
   * Updating the scale when the viewport changes its zoom
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateScale = eventDetail => {
      const {
        previousCamera,
        camera
      } = eventDetail.detail;
      if (previousCamera.parallelScale !== camera.parallelScale || previousCamera.scale !== camera.scale) {
        const viewport = cornerstoneViewportService.getCornerstoneViewportByIndex(viewportIndex);
        if (!viewport) {
          return;
        }
        const imageData = viewport.getImageData();
        if (!imageData) {
          return;
        }
        if (camera.scale) {
          setScale(camera.scale);
          return;
        }
        const {
          spacing
        } = imageData;
        // convert parallel scale to scale
        const scale = element.clientHeight * spacing[0] * 0.5 / camera.parallelScale;
        setScale(scale);
      }
    };
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.CAMERA_MODIFIED, updateScale);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.CAMERA_MODIFIED, updateScale);
    };
  }, [viewportIndex, viewportData, cornerstoneViewportService, element]);

  /**
   * Updating the active tools when the toolbar changes
   */
  // Todo: this should act on the toolGroups instead of the toolbar state
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = toolbarService.subscribe(toolbarService.EVENTS.TOOL_BAR_STATE_MODIFIED, () => {
      setActiveTools(toolbarService.getActiveTools());
    });
    return () => {
      unsubscribe();
    };
  }, [toolbarService]);
  const _renderOverlayItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(item => {
    const overlayItemProps = {
      element,
      viewportData,
      imageSliceData,
      viewportIndex,
      servicesManager,
      customization: item,
      formatters: {
        formatPN: _utils__WEBPACK_IMPORTED_MODULE_5__.formatPN,
        formatDate: _utils__WEBPACK_IMPORTED_MODULE_5__.formatDICOMDate,
        formatTime: _utils__WEBPACK_IMPORTED_MODULE_5__.formatDICOMTime,
        formatNumberPrecision: _utils__WEBPACK_IMPORTED_MODULE_5__.formatNumberPrecision
      },
      instance,
      // calculated
      voi,
      scale,
      instanceNumber
    };
    if (item.customizationType === 'ohif.overlayItem.windowLevel') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(VOIOverlayItem, overlayItemProps);
    } else if (item.customizationType === 'ohif.overlayItem.zoomLevel') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ZoomOverlayItem, overlayItemProps);
    } else if (item.customizationType === 'ohif.overlayItem.instanceNumber') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(InstanceNumberOverlayItem, overlayItemProps);
    } else {
      const renderItem = customizationService.transform(item);
      if (typeof renderItem.content === 'function') {
        return renderItem.content(overlayItemProps);
      }
    }
  }, [element, viewportData, imageSliceData, viewportIndex, servicesManager, customizationService, instance, voi, scale, instanceNumber]);
  const getTopLeftContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const items = topLeftCustomization?.items || [{
      id: 'WindowLevel',
      customizationType: 'ohif.overlayItem.windowLevel'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      key: `topLeftOverlayItem_${i}`
    }, _renderOverlayItem(item))));
  }, [topLeftCustomization, _renderOverlayItem]);
  const getTopRightContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const items = topRightCustomization?.items || [{
      id: 'InstanceNmber',
      customizationType: 'ohif.overlayItem.instanceNumber'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      key: `topRightOverlayItem_${i}`
    }, _renderOverlayItem(item))));
  }, [topRightCustomization, _renderOverlayItem]);
  const getBottomLeftContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const items = bottomLeftCustomization?.items || [];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      key: `bottomLeftOverlayItem_${i}`
    }, _renderOverlayItem(item))));
  }, [bottomLeftCustomization, _renderOverlayItem]);
  const getBottomRightContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const items = bottomRightCustomization?.items || [];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      key: `bottomRightOverlayItem_${i}`
    }, _renderOverlayItem(item))));
  }, [bottomRightCustomization, _renderOverlayItem]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.ViewportOverlay, {
    topLeft: getTopLeftContent(),
    topRight: getTopRightContent(),
    bottomLeft: getBottomLeftContent(),
    bottomRight: getBottomRightContent()
  });
}
__signature__(CustomizableViewportOverlay, "useState{[voi, setVOI]({ windowCenter: null, windowWidth: null })}\nuseState{[scale, setScale](1)}\nuseState{[activeTools, setActiveTools]([])}\nuseMemo{instance}\nuseMemo{instanceNumber}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseCallback{_renderOverlayItem}\nuseCallback{getTopLeftContent}\nuseCallback{getTopRightContent}\nuseCallback{getBottomLeftContent}\nuseCallback{getBottomRightContent}");
function _getViewportInstance(viewportData, imageIndex) {
  let imageId = null;
  if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.ViewportType.STACK) {
    imageId = viewportData.data.imageIds[imageIndex];
  } else if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.ViewportType.ORTHOGRAPHIC) {
    const volumes = viewportData.volumes;
    if (volumes && volumes.length == 1) {
      const volume = volumes[0];
      imageId = volume.imageIds[imageIndex];
    }
  }
  return imageId ? _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.metaData.get('instance', imageId) || {} : {};
}
function _getInstanceNumber(viewportData, viewportIndex, imageIndex, cornerstoneViewportService) {
  let instanceNumber;
  if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.ViewportType.STACK) {
    instanceNumber = _getInstanceNumberFromStack(viewportData, imageIndex);
    if (!instanceNumber && instanceNumber !== 0) {
      return null;
    }
  } else if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.ViewportType.ORTHOGRAPHIC) {
    instanceNumber = _getInstanceNumberFromVolume(viewportData, imageIndex, viewportIndex, cornerstoneViewportService);
  }
  return instanceNumber;
}
function _getInstanceNumberFromStack(viewportData, imageIndex) {
  const imageIds = viewportData.data.imageIds;
  const imageId = imageIds[imageIndex];
  if (!imageId) {
    return;
  }
  const generalImageModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.metaData.get('generalImageModule', imageId) || {};
  const {
    instanceNumber
  } = generalImageModule;
  const stackSize = imageIds.length;
  if (stackSize <= 1) {
    return;
  }
  return parseInt(instanceNumber);
}

// Since volume viewports can be in any view direction, they can render
// a reconstructed image which don't have imageIds; therefore, no instance and instanceNumber
// Here we check if viewport is in the acquisition direction and if so, we get the instanceNumber
function _getInstanceNumberFromVolume(viewportData, imageIndex, viewportIndex, cornerstoneViewportService) {
  const volumes = viewportData.volumes;

  // Todo: support fusion of acquisition plane which has instanceNumber
  if (!volumes || volumes.length > 1) {
    return;
  }
  const volume = volumes[0];
  const {
    direction,
    imageIds
  } = volume;
  const cornerstoneViewport = cornerstoneViewportService.getCornerstoneViewportByIndex(viewportIndex);
  if (!cornerstoneViewport) {
    return;
  }
  const camera = cornerstoneViewport.getCamera();
  const {
    viewPlaneNormal
  } = camera;
  // checking if camera is looking at the acquisition plane (defined by the direction on the volume)

  const scanAxisNormal = direction.slice(6, 9);

  // check if viewPlaneNormal is parallel to scanAxisNormal
  const cross = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.cross(gl_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.create(), viewPlaneNormal, scanAxisNormal);
  const isAcquisitionPlane = gl_matrix__WEBPACK_IMPORTED_MODULE_1__.vec3.length(cross) < EPSILON;
  if (isAcquisitionPlane) {
    const imageId = imageIds[imageIndex];
    if (!imageId) {
      return {};
    }
    const {
      instanceNumber
    } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.metaData.get('generalImageModule', imageId) || {};
    return parseInt(instanceNumber);
  }
}
CustomizableViewportOverlay.propTypes = {
  viewportData: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  imageIndex: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  viewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)
};
const _default = CustomizableViewportOverlay;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EPSILON, "EPSILON", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(VOIOverlayItem, "VOIOverlayItem", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(ZoomOverlayItem, "ZoomOverlayItem", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(InstanceNumberOverlayItem, "InstanceNumberOverlayItem", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(CustomizableViewportOverlay, "CustomizableViewportOverlay", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(_getViewportInstance, "_getViewportInstance", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(_getInstanceNumber, "_getInstanceNumber", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(_getInstanceNumberFromStack, "_getInstanceNumberFromStack", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(_getInstanceNumberFromVolume, "_getInstanceNumberFromVolume", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx":
/*!****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





function CornerstoneImageScrollbar(_ref) {
  let {
    viewportData,
    viewportIndex,
    element,
    imageSliceData,
    setImageSliceData,
    scrollbarHeight,
    servicesManager
  } = _ref;
  const {
    cineService,
    cornerstoneViewportService
  } = servicesManager.services;
  const onImageScrollbarChange = (imageIndex, viewportIndex) => {
    const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
    const viewportId = viewportInfo.getViewportId();
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const {
      isCineEnabled
    } = cineService.getState();
    if (isCineEnabled) {
      // on image scrollbar change, stop the CINE if it is playing
      cineService.stopClip(element);
      cineService.setCine({
        id: viewportIndex,
        isPlaying: false
      });
    }
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.jumpToSlice(viewport.element, {
      imageIndex,
      debounceLoading: true
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!viewportData) {
      return;
    }
    const viewport = cornerstoneViewportService.getCornerstoneViewportByIndex(viewportIndex);
    if (!viewport) {
      return;
    }
    if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.ViewportType.STACK) {
      const imageIndex = viewport.getCurrentImageIdIndex();
      setImageSliceData({
        imageIndex: imageIndex,
        numberOfSlices: viewportData.data.imageIds.length
      });
      return;
    }
    if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.ViewportType.ORTHOGRAPHIC) {
      const sliceData = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.getImageSliceDataForVolumeViewport(viewport);
      if (!sliceData) {
        return;
      }
      const {
        imageIndex,
        numberOfSlices
      } = sliceData;
      setImageSliceData({
        imageIndex,
        numberOfSlices
      });
    }
  }, [viewportIndex, viewportData]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (viewportData?.viewportType !== _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.ViewportType.STACK) {
      return;
    }
    const updateStackIndex = event => {
      const {
        newImageIdIndex
      } = event.detail;
      // find the index of imageId in the imageIds
      setImageSliceData({
        imageIndex: newImageIdIndex,
        numberOfSlices: viewportData.data.imageIds.length
      });
    };
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL, updateStackIndex);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL, updateStackIndex);
    };
  }, [viewportData, element]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (viewportData?.viewportType !== _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.ViewportType.ORTHOGRAPHIC) {
      return;
    }
    const updateVolumeIndex = event => {
      const {
        imageIndex,
        numberOfSlices
      } = event.detail;
      // find the index of imageId in the imageIds
      setImageSliceData({
        imageIndex,
        numberOfSlices
      });
    };
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VOLUME_NEW_IMAGE, updateVolumeIndex);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VOLUME_NEW_IMAGE, updateVolumeIndex);
    };
  }, [viewportData, element]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.ImageScrollbar, {
    onChange: evt => onImageScrollbarChange(evt, viewportIndex),
    max: imageSliceData.numberOfSlices ? imageSliceData.numberOfSlices - 1 : 0,
    height: scrollbarHeight,
    value: imageSliceData.imageIndex
  });
}
__signature__(CornerstoneImageScrollbar, "useEffect{}\nuseEffect{}\nuseEffect{}");
CornerstoneImageScrollbar.propTypes = {
  viewportData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  viewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number).isRequired,
  element: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(Element),
  scrollbarHeight: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  imageSliceData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  setImageSliceData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
const _default = CornerstoneImageScrollbar;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(CornerstoneImageScrollbar, "CornerstoneImageScrollbar", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx":
/*!****************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



function ViewportImageSliceLoadingIndicator(_ref) {
  let {
    viewportData,
    element
  } = _ref;
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const loadIndicatorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const imageIdToBeLoaded = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setLoadingState = evt => {
    clearTimeout(loadIndicatorRef.current);
    loadIndicatorRef.current = setTimeout(() => {
      setLoading(true);
    }, 50);
  };
  const setFinishLoadingState = evt => {
    clearTimeout(loadIndicatorRef.current);
    setLoading(false);
  };
  const setErrorState = evt => {
    clearTimeout(loadIndicatorRef.current);
    if (imageIdToBeLoaded.current === evt.detail.imageId) {
      setError(evt.detail.error);
      imageIdToBeLoaded.current = null;
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL, setLoadingState);
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_LOAD_ERROR, setErrorState);
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_NEW_IMAGE, setFinishLoadingState);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL, setLoadingState);
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_NEW_IMAGE, setFinishLoadingState);
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_LOAD_ERROR, setErrorState);
    };
  }, [element, viewportData]);
  if (error) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "bg-black opacity-50 absolute h-full w-full top-0 left-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "flex transparent items-center justify-center w-full h-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "text-primary-light text-xl font-light"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", null, "Error Loading Image"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "An error has occurred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, error)))));
  }
  if (loading) {
    return (
      /*#__PURE__*/
      // IMPORTANT: we need to use the pointer-events-none class to prevent the loading indicator from
      // interacting with the mouse, since scrolling should propagate to the viewport underneath
      react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "pointer-events-none bg-black opacity-50 absolute h-full w-full top-0 left-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "flex transparent items-center justify-center w-full h-full"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        className: "text-primary-light text-xl font-light"
      }, "Loading...")))
    );
  }
  return null;
}
__signature__(ViewportImageSliceLoadingIndicator, "useState{[loading, setLoading](false)}\nuseState{[error, setError](false)}\nuseRef{loadIndicatorRef}\nuseRef{imageIdToBeLoaded}\nuseEffect{}");
ViewportImageSliceLoadingIndicator.propTypes = {
  percentComplete: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  error: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  element: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};
ViewportImageSliceLoadingIndicator.defaultProps = {
  percentComplete: 0,
  error: null
};
const _default = ViewportImageSliceLoadingIndicator;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ViewportImageSliceLoadingIndicator, "ViewportImageSliceLoadingIndicator", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _ViewportOrientationMarkers_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ViewportOrientationMarkers.css */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");
/* harmony import */ var _ViewportOrientationMarkers_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ViewportOrientationMarkers_css__WEBPACK_IMPORTED_MODULE_6__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const {
  getOrientationStringLPS,
  invertOrientationStringLPS
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.orientation;
function ViewportOrientationMarkers(_ref) {
  let {
    element,
    viewportData,
    imageSliceData,
    viewportIndex,
    servicesManager,
    orientationMarkers = ['top', 'left']
  } = _ref;
  // Rotation is in degrees
  const [rotation, setRotation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [flipHorizontal, setFlipHorizontal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [flipVertical, setFlipVertical] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const cameraModifiedListener = evt => {
      const {
        rotation,
        previousCamera,
        camera
      } = evt.detail;
      if (rotation !== undefined) {
        setRotation(rotation);
      }
      if (camera.flipHorizontal !== undefined && previousCamera.flipHorizontal !== camera.flipHorizontal) {
        setFlipHorizontal(camera.flipHorizontal);
      }
      if (camera.flipVertical !== undefined && previousCamera.flipVertical !== camera.flipVertical) {
        setFlipVertical(camera.flipVertical);
      }
    };
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.CAMERA_MODIFIED, cameraModifiedListener);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.CAMERA_MODIFIED, cameraModifiedListener);
    };
  }, []);
  const markers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!viewportData) {
      return '';
    }
    let rowCosines, columnCosines;
    if (viewportData.viewportType === 'stack') {
      const imageIndex = imageSliceData.imageIndex;
      const imageId = viewportData.data.imageIds?.[imageIndex];

      // Workaround for below TODO stub
      if (!imageId) {
        return false;
      }
      ({
        rowCosines,
        columnCosines
      } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.get('imagePlaneModule', imageId) || {});
    } else {
      if (!element || !(0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(element)) {
        return '';
      }
      const {
        viewport
      } = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(element);
      const {
        viewUp,
        viewPlaneNormal
      } = viewport.getCamera();
      const viewRight = gl_matrix__WEBPACK_IMPORTED_MODULE_5__.vec3.create();
      gl_matrix__WEBPACK_IMPORTED_MODULE_5__.vec3.cross(viewRight, viewUp, viewPlaneNormal);
      columnCosines = [-viewUp[0], -viewUp[1], -viewUp[2]];
      rowCosines = viewRight;
    }
    if (!rowCosines || !columnCosines || rotation === undefined) {
      return '';
    }
    const markers = _getOrientationMarkers(rowCosines, columnCosines, rotation, flipVertical, flipHorizontal);
    const ohifViewport = cornerstoneViewportService.getViewportInfoByIndex(viewportIndex);
    if (!ohifViewport) {
      console.log('ViewportOrientationMarkers::No viewport');
      return null;
    }
    const backgroundColor = ohifViewport.getViewportOptions().background;

    // Todo: probably this can be done in a better way in which we identify bright
    // background
    const isLight = backgroundColor ? _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.isEqual(backgroundColor, [1, 1, 1]) : false;
    return orientationMarkers.map((m, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(`${m}-mid orientation-marker`, isLight ? 'text-[#726F7E]' : 'text-[#ccc]'),
      key: `${m}-mid orientation-marker`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "orientation-marker-value"
    }, markers[m])));
  }, [viewportData, imageSliceData, rotation, flipVertical, flipHorizontal, orientationMarkers, element]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "ViewportOrientationMarkers noselect"
  }, markers);
}
__signature__(ViewportOrientationMarkers, "useState{[rotation, setRotation](0)}\nuseState{[flipHorizontal, setFlipHorizontal](false)}\nuseState{[flipVertical, setFlipVertical](false)}\nuseEffect{}\nuseMemo{markers}");
ViewportOrientationMarkers.propTypes = {
  percentComplete: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
  error: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)
};
ViewportOrientationMarkers.defaultProps = {
  percentComplete: 0,
  error: null
};

/**
 *
 * Computes the orientation labels on a Cornerstone-enabled Viewport element
 * when the viewport settings change (e.g. when a horizontal flip or a rotation occurs)
 *
 * @param {*} rowCosines
 * @param {*} columnCosines
 * @param {*} rotation in degrees
 * @returns
 */
function _getOrientationMarkers(rowCosines, columnCosines, rotation, flipVertical, flipHorizontal) {
  const rowString = getOrientationStringLPS(rowCosines);
  const columnString = getOrientationStringLPS(columnCosines);
  const oppositeRowString = invertOrientationStringLPS(rowString);
  const oppositeColumnString = invertOrientationStringLPS(columnString);
  const markers = {
    top: oppositeColumnString,
    left: oppositeRowString,
    right: rowString,
    bottom: columnString
  };

  // If any vertical or horizontal flips are applied, change the orientation strings ahead of
  // the rotation applications
  if (flipVertical) {
    markers.top = invertOrientationStringLPS(markers.top);
    markers.bottom = invertOrientationStringLPS(markers.bottom);
  }
  if (flipHorizontal) {
    markers.left = invertOrientationStringLPS(markers.left);
    markers.right = invertOrientationStringLPS(markers.right);
  }

  // Swap the labels accordingly if the viewport has been rotated
  // This could be done in a more complex way for intermediate rotation values (e.g. 45 degrees)
  if (rotation === 90 || rotation === -270) {
    return {
      top: markers.left,
      left: invertOrientationStringLPS(markers.top),
      right: invertOrientationStringLPS(markers.bottom),
      bottom: markers.right // left
    };
  } else if (rotation === -90 || rotation === 270) {
    return {
      top: invertOrientationStringLPS(markers.left),
      left: markers.top,
      bottom: markers.left,
      right: markers.bottom
    };
  } else if (rotation === 180 || rotation === -180) {
    return {
      top: invertOrientationStringLPS(markers.top),
      left: invertOrientationStringLPS(markers.left),
      bottom: invertOrientationStringLPS(markers.bottom),
      right: invertOrientationStringLPS(markers.right)
    };
  }
  return markers;
}
const _default = ViewportOrientationMarkers;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getOrientationStringLPS, "getOrientationStringLPS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
  reactHotLoader.register(invertOrientationStringLPS, "invertOrientationStringLPS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
  reactHotLoader.register(ViewportOrientationMarkers, "ViewportOrientationMarkers", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
  reactHotLoader.register(_getOrientationMarkers, "_getOrientationMarkers", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/utils.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/utils.ts ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDICOMDate: () => (/* binding */ formatDICOMDate),
/* harmony export */   formatDICOMTime: () => (/* binding */ formatDICOMTime),
/* harmony export */   formatNumberPrecision: () => (/* binding */ formatNumberPrecision),
/* harmony export */   formatPN: () => (/* binding */ formatPN),
/* harmony export */   getCompression: () => (/* binding */ getCompression),
/* harmony export */   isValidNumber: () => (/* binding */ isValidNumber)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "../../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/**
 * Checks if value is valid.
 *
 * @param {number} value
 * @returns {boolean} is valid.
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Formats number precision.
 *
 * @param {number} number
 * @param {number} precision
 * @returns {number} formatted number.
 */
function formatNumberPrecision(number) {
  let precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (number !== null) {
    return parseFloat(number).toFixed(precision);
  }
}

/**
 * Formats DICOM date.
 *
 * @param {string} date
 * @param {string} strFormat
 * @returns {string} formatted date.
 */
function formatDICOMDate(date) {
  let strFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MMM D, YYYY';
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date, 'YYYYMMDD').format(strFormat);
}

/**
 *    DICOM Time is stored as HHmmss.SSS, where:
 *      HH 24 hour time:
 *        m mm        0..59   Minutes
 *        s ss        0..59   Seconds
 *        S SS SSS    0..999  Fractional seconds
 *
 *        Goal: '24:12:12'
 *
 * @param {*} time
 * @param {string} strFormat
 * @returns {string} formatted name.
 */
function formatDICOMTime(time) {
  let strFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HH:mm:ss';
  return moment__WEBPACK_IMPORTED_MODULE_0___default()(time, 'HH:mm:ss').format(strFormat);
}

/**
 * Formats a patient name for display purposes
 *
 * @param {string} name
 * @returns {string} formatted name.
 */
function formatPN(name) {
  if (!name) {
    return '';
  }
  const cleaned = name.split('^').filter(s => !!s).join(', ').trim();
  return cleaned === ',' || cleaned === '' ? '' : cleaned;
}

/**
 * Gets compression type
 *
 * @param {number} imageId
 * @returns {string} comrpession type.
 */
function getCompression(imageId) {
  const generalImageModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.metaData.get('generalImageModule', imageId) || {};
  const {
    lossyImageCompression,
    lossyImageCompressionRatio,
    lossyImageCompressionMethod
  } = generalImageModule;
  if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
    const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
    const compressionRatio = formatNumberPrecision(lossyImageCompressionRatio, 2);
    return compressionMethod + compressionRatio + ' : 1';
  }
  return 'Lossless / Uncompressed';
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(isValidNumber, "isValidNumber", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/utils.ts");
  reactHotLoader.register(formatNumberPrecision, "formatNumberPrecision", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/utils.ts");
  reactHotLoader.register(formatDICOMDate, "formatDICOMDate", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/utils.ts");
  reactHotLoader.register(formatDICOMTime, "formatDICOMTime", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/utils.ts");
  reactHotLoader.register(formatPN, "formatPN", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/utils.ts");
  reactHotLoader.register(getCompression, "getCompression", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/Viewport/Overlays/utils.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".viewport-wrapper {\n  width: 100%;\n  height: 100%; /* MUST have `height` to prevent resize infinite loop */\n  position: relative;\n}\n\n.cornerstone-viewport-element {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  background-color: black;\n\n  /* Prevent the blue outline in Chrome when a viewport is selected */\n  outline: 0 !important;\n\n  /* Prevents the entire page from getting larger\n     when the magnify tool is near the sides/corners of the page */\n  overflow: hidden;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "/*\ncustom overlay panels: top-left, top-right, bottom-left and bottom-right\nIf any text to be displayed on the overlay is too long to hold on a single\nline, it will be truncated with ellipsis in the end.\n*/\n.viewport-overlay {\n  max-width: 40%;\n}\n.viewport-overlay span {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.viewport-overlay.left-viewport {\n  text-align: left;\n}\n.viewport-overlay.right-viewport-scrollbar {\n  text-align: right;\n}\n.viewport-overlay.right-viewport-scrollbar .flex.flex-row {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".ViewportOrientationMarkers {\n  --marker-width: 100px;\n  --marker-height: 100px;\n  --scrollbar-width: 20px;\n  pointer-events: none;\n  font-size: 15px;\n  line-height: 18px;\n}\n.ViewportOrientationMarkers .orientation-marker {\n  position: absolute;\n}\n.ViewportOrientationMarkers .top-mid {\n  top: 0.6rem;\n  left: 50%;\n}\n.ViewportOrientationMarkers .left-mid {\n  top: 47%;\n  left: 5px;\n}\n.ViewportOrientationMarkers .right-mid {\n  top: 47%;\n  left: calc(100% - var(--marker-width) - var(--scrollbar-width));\n}\n.ViewportOrientationMarkers .bottom-mid {\n  top: calc(100% - var(--marker-height) - 0.6rem);\n  left: 47%;\n}\n.ViewportOrientationMarkers .right-mid .orientation-marker-value {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  min-width: var(--marker-width);\n}\n.ViewportOrientationMarkers .bottom-mid .orientation-marker-value {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  min-height: var(--marker-height);\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./OHIFCornerstoneViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./OHIFCornerstoneViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css",
      function () {
        content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./OHIFCornerstoneViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./CustomizableViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./CustomizableViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css",
      function () {
        content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./CustomizableViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./ViewportOrientationMarkers.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./ViewportOrientationMarkers.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css",
      function () {
        content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./ViewportOrientationMarkers.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx.js.map