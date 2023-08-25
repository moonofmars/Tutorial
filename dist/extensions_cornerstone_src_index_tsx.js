(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_cornerstone_src_index_tsx"],{

/***/ "../../../extensions/cornerstone/src/commandsModule.ts":
/*!*************************************************************!*\
  !*** ../../../extensions/cornerstone/src/commandsModule.ts ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _utils_CornerstoneViewportDownloadForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/CornerstoneViewportDownloadForm */ "../../../extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
/* harmony import */ var _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/callInputDialog */ "../../../extensions/cornerstone/src/utils/callInputDialog.tsx");
/* harmony import */ var _utils_stackSync_toggleStackImageSync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/stackSync/toggleStackImageSync */ "../../../extensions/cornerstone/src/utils/stackSync/toggleStackImageSync.ts");
/* harmony import */ var _utils_measurementServiceMappings_utils_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/measurementServiceMappings/utils/selection */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts");
/* harmony import */ var _utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getActiveViewportEnabledElement */ "../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







function commandsModule(_ref) {
  let {
    servicesManager,
    commandsManager
  } = _ref;
  const {
    viewportGridService,
    toolGroupService,
    cineService,
    toolbarService,
    uiDialogService,
    cornerstoneViewportService,
    uiNotificationService,
    measurementService
  } = servicesManager.services;
  const {
    measurementServiceSource
  } = this;
  function _getActiveViewportEnabledElement() {
    return (0,_utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_6__["default"])(viewportGridService);
  }
  const actions = {
    /**
     * Generates the selector props for the context menu, specific to
     * the cornerstone viewport, and then runs the context menu.
     */
    showCornerstoneContextMenu: options => {
      const element = _getActiveViewportEnabledElement()?.viewport?.element;
      const optionsToUse = {
        ...options,
        element
      };
      const {
        useSelectedAnnotation,
        nearbyToolData,
        event
      } = optionsToUse;

      // This code is used to invoke the context menu via keyboard shortcuts
      if (useSelectedAnnotation && !nearbyToolData) {
        const firstAnnotationSelected = (0,_utils_measurementServiceMappings_utils_selection__WEBPACK_IMPORTED_MODULE_5__.getFirstAnnotationSelected)(element);
        // filter by allowed selected tools from config property (if there is any)
        const isToolAllowed = !optionsToUse.allowedSelectedTools || optionsToUse.allowedSelectedTools.includes(firstAnnotationSelected?.metadata?.toolName);
        if (isToolAllowed) {
          optionsToUse.nearbyToolData = firstAnnotationSelected;
        } else {
          return;
        }
      }
      optionsToUse.defaultPointsPosition = [];
      // if (optionsToUse.nearbyToolData) {
      //   optionsToUse.defaultPointsPosition = commandsManager.runCommand(
      //     'getToolDataActiveCanvasPoints',
      //     { toolData: optionsToUse.nearbyToolData }
      //   );
      // }

      // TODO - make the selectorProps richer by including the study metadata and display set.
      optionsToUse.selectorProps = {
        toolName: optionsToUse.nearbyToolData?.metadata?.toolName,
        value: optionsToUse.nearbyToolData,
        uid: optionsToUse.nearbyToolData?.annotationUID,
        nearbyToolData: optionsToUse.nearbyToolData,
        event,
        ...optionsToUse.selectorProps
      };
      commandsManager.run(options, optionsToUse);
    },
    getNearbyToolData(_ref2) {
      let {
        nearbyToolData,
        element,
        canvasCoordinates
      } = _ref2;
      return nearbyToolData ?? _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.getAnnotationNearPoint(element, canvasCoordinates);
    },
    getNearbyAnnotation(_ref3) {
      let {
        element,
        canvasCoordinates
      } = _ref3;
      const nearbyToolData = actions.getNearbyToolData({
        nearbyToolData: null,
        element,
        canvasCoordinates
      });
      const isAnnotation = toolName => {
        const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
        if (!enabledElement) {
          return;
        }
        const {
          renderingEngineId,
          viewportId
        } = enabledElement;
        const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
        const toolInstance = toolGroup.getToolInstance(toolName);
        return toolInstance?.constructor?.isAnnotation ?? true;
      };
      return nearbyToolData?.metadata?.toolName && isAnnotation(nearbyToolData.metadata.toolName) ? nearbyToolData : null;
    },
    // Measurement tool commands:

    /** Delete the given measurement */
    deleteMeasurement: _ref4 => {
      let {
        uid
      } = _ref4;
      if (uid) {
        measurementServiceSource.remove(uid);
      }
    },
    /**
     * Show the measurement labelling input dialog and update the label
     * on the measurement with a response if not cancelled.
     */
    setMeasurementLabel: _ref5 => {
      let {
        uid
      } = _ref5;
      const measurement = measurementService.getMeasurement(uid);
      (0,_utils_callInputDialog__WEBPACK_IMPORTED_MODULE_3__["default"])(uiDialogService, measurement, (label, actionId) => {
        if (actionId === 'cancel') {
          return;
        }
        const updatedMeasurement = Object.assign({}, measurement, {
          label
        });
        measurementService.update(updatedMeasurement.uid, updatedMeasurement, true);
      }, false);
    },
    /**
     *
     * @param props - containing the updates to apply
     * @param props.measurementKey - chooses the measurement key to apply the
     *        code to.  This will typically be finding or site to apply a
     *        finind code or a findingSites code.
     * @param props.code - A coding scheme value from DICOM, including:
     *       * CodeValue - the language independent code, for example '1234'
     *       * CodingSchemeDesignator - the issue of the code value
     *       * CodeMeaning - the text value shown to the user
     *       * ref - a string reference in the form `<designator>:<codeValue>`
     *       * Other fields
     *     Note it is a valid option to remove the finding or site values by
     *     supplying null for the code.
     * @param props.uid - the measurement UID to find it with
     * @param props.label - the text value for the code.  Has NOTHING to do with
     *        the measurement label, which can be set with textLabel
     * @param props.textLabel is the measurement label to apply.  Set to null to
     *            delete.
     *
     * If the measurementKey is `site`, then the code will also be added/replace
     * the 0 element of findingSites.  This behaviour is expected to be enhanced
     * in the future with ability to set other site information.
     */
    updateMeasurement: props => {
      const {
        code,
        uid,
        textLabel,
        label
      } = props;
      const measurement = measurementService.getMeasurement(uid);
      const updatedMeasurement = {
        ...measurement
      };
      // Call it textLabel as the label value
      // TODO - remove the label setting when direct rendering of findingSites is enabled
      if (textLabel !== undefined) {
        updatedMeasurement.label = textLabel;
      }
      if (code !== undefined) {
        const measurementKey = code.type || 'finding';
        if (code.ref && !code.CodeValue) {
          const split = code.ref.indexOf(':');
          code.CodeValue = code.ref.substring(split + 1);
          code.CodeMeaning = code.text || label;
          code.CodingSchemeDesignator = code.ref.substring(0, split);
        }
        updatedMeasurement[measurementKey] = code;
        // TODO - remove this line once the measurements table customizations are in
        if (measurementKey !== 'finding') {
          if (updatedMeasurement.findingSites) {
            updatedMeasurement.findingSites = updatedMeasurement.findingSites.filter(it => it.type !== measurementKey);
            updatedMeasurement.findingSites.push(code);
          } else {
            updatedMeasurement.findingSites = [code];
          }
        }
      }
      measurementService.update(updatedMeasurement.uid, updatedMeasurement, true);
    },
    // Retrieve value commands
    getActiveViewportEnabledElement: _getActiveViewportEnabledElement,
    setViewportActive: _ref6 => {
      let {
        viewportId
      } = _ref6;
      const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
      if (!viewportInfo) {
        console.warn('No viewport found for viewportId:', viewportId);
        return;
      }
      const viewportIndex = viewportInfo.getViewportIndex();
      viewportGridService.setActiveViewportIndex(viewportIndex);
    },
    arrowTextCallback: _ref7 => {
      let {
        callback,
        data
      } = _ref7;
      (0,_utils_callInputDialog__WEBPACK_IMPORTED_MODULE_3__["default"])(uiDialogService, data, callback);
    },
    toggleCine: () => {
      const {
        viewports
      } = viewportGridService.getState();
      const {
        isCineEnabled
      } = cineService.getState();
      cineService.setIsCineEnabled(!isCineEnabled);
      toolbarService.setButton('Cine', {
        props: {
          isActive: !isCineEnabled
        }
      });
      viewports.forEach((_, index) => cineService.setCine({
        id: index,
        isPlaying: false
      }));
    },
    setWindowLevel(_ref8) {
      let {
        window,
        level,
        toolGroupId
      } = _ref8;
      // convert to numbers
      const windowWidthNum = Number(window);
      const windowCenterNum = Number(level);
      const {
        viewportId
      } = _getActiveViewportEnabledElement();
      const viewportToolGroupId = toolGroupService.getToolGroupForViewport(viewportId);
      if (toolGroupId && toolGroupId !== viewportToolGroupId) {
        return;
      }

      // get actor from the viewport
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      const viewport = renderingEngine.getViewport(viewportId);
      const {
        lower,
        upper
      } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.windowLevel.toLowHighRange(windowWidthNum, windowCenterNum);
      viewport.setProperties({
        voiRange: {
          upper,
          lower
        }
      });
      viewport.render();
    },
    // Just call the toolbar service record interaction - allows
    // executing a toolbar command as a full toolbar command with side affects
    // coming from the ToolbarService itself.
    toolbarServiceRecordInteraction: props => {
      toolbarService.recordInteraction(props);
    },
    setToolActive: _ref9 => {
      let {
        toolName,
        toolGroupId = null
      } = _ref9;
      if (toolName === 'Crosshairs') {
        const activeViewportToolGroup = toolGroupService.getToolGroup(null);
        if (!activeViewportToolGroup._toolInstances.Crosshairs) {
          uiNotificationService.show({
            title: 'Crosshairs',
            message: 'You need to be in a MPR view to use Crosshairs. Click on MPR button in the toolbar to activate it.',
            type: 'info',
            duration: 3000
          });
          throw new Error('Crosshairs tool is not available in this viewport');
        }
      }
      const {
        viewports
      } = viewportGridService.getState() || {
        viewports: []
      };
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      const toolGroupViewportIds = toolGroup?.getViewportIds?.();

      // if toolGroup has been destroyed, or its viewports have been removed
      if (!toolGroupViewportIds || !toolGroupViewportIds.length) {
        return;
      }
      const filteredViewports = viewports.filter(viewport => {
        if (!viewport.viewportOptions) {
          return false;
        }
        return toolGroupViewportIds.includes(viewport.viewportOptions.viewportId);
      });
      if (!filteredViewports.length) {
        return;
      }
      if (!toolGroup.getToolInstance(toolName)) {
        uiNotificationService.show({
          title: `${toolName} tool`,
          message: `The ${toolName} tool is not available in this viewport.`,
          type: 'info',
          duration: 3000
        });
        throw new Error(`ToolGroup ${toolGroup.id} does not have this tool.`);
      }
      const activeToolName = toolGroup.getActivePrimaryMouseButtonTool();
      if (activeToolName) {
        // Todo: this is a hack to prevent the crosshairs to stick around
        // after another tool is selected. We should find a better way to do this
        if (activeToolName === 'Crosshairs') {
          toolGroup.setToolDisabled(activeToolName);
        } else {
          toolGroup.setToolPassive(activeToolName);
        }
      }
      // Set the new toolName to be active
      toolGroup.setToolActive(toolName, {
        bindings: [{
          mouseButton: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.MouseBindings.Primary
        }]
      });
    },
    showDownloadViewportModal: () => {
      const {
        activeViewportIndex
      } = viewportGridService.getState();
      if (!cornerstoneViewportService.getCornerstoneViewportByIndex(activeViewportIndex)) {
        // Cannot download a non-cornerstone viewport (image).
        uiNotificationService.show({
          title: 'Download Image',
          message: 'Image cannot be downloaded',
          type: 'error'
        });
        return;
      }
      const {
        uiModalService
      } = servicesManager.services;
      if (uiModalService) {
        uiModalService.show({
          content: _utils_CornerstoneViewportDownloadForm__WEBPACK_IMPORTED_MODULE_2__["default"],
          title: 'Download High Quality Image',
          contentProps: {
            activeViewportIndex,
            onClose: uiModalService.hide,
            cornerstoneViewportService
          }
        });
      }
    },
    rotateViewport: _ref10 => {
      let {
        rotation
      } = _ref10;
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        const {
          rotation: currentRotation
        } = viewport.getProperties();
        const newRotation = (currentRotation + rotation) % 360;
        viewport.setProperties({
          rotation: newRotation
        });
        viewport.render();
      }
    },
    flipViewportHorizontal: () => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        const {
          flipHorizontal
        } = viewport.getCamera();
        viewport.setCamera({
          flipHorizontal: !flipHorizontal
        });
        viewport.render();
      }
    },
    flipViewportVertical: () => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        const {
          flipVertical
        } = viewport.getCamera();
        viewport.setCamera({
          flipVertical: !flipVertical
        });
        viewport.render();
      }
    },
    invertViewport: _ref11 => {
      let {
        element
      } = _ref11;
      let enabledElement;
      if (element === undefined) {
        enabledElement = _getActiveViewportEnabledElement();
      } else {
        enabledElement = element;
      }
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        const {
          invert
        } = viewport.getProperties();
        viewport.setProperties({
          invert: !invert
        });
        viewport.render();
      }
    },
    resetViewport: () => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        viewport.resetProperties();
        viewport.resetCamera();
      } else {
        // Todo: add reset properties for volume viewport
        viewport.resetCamera();
      }
      viewport.render();
    },
    scaleViewport: _ref12 => {
      let {
        direction
      } = _ref12;
      const enabledElement = _getActiveViewportEnabledElement();
      const scaleFactor = direction > 0 ? 0.9 : 1.1;
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        if (direction) {
          const {
            parallelScale
          } = viewport.getCamera();
          viewport.setCamera({
            parallelScale: parallelScale * scaleFactor
          });
          viewport.render();
        } else {
          viewport.resetCamera();
          viewport.render();
        }
      }
    },
    /** Jumps the active viewport or the specified one to the given slice index */
    jumpToImage: _ref13 => {
      let {
        imageIndex,
        viewport: gridViewport
      } = _ref13;
      // Get current active viewport (return if none active)
      let viewport;
      if (!gridViewport) {
        const enabledElement = _getActiveViewportEnabledElement();
        if (!enabledElement) {
          return;
        }
        viewport = enabledElement.viewport;
      } else {
        viewport = cornerstoneViewportService.getCornerstoneViewport(gridViewport.id);
      }

      // Get number of slices
      // -> Copied from cornerstone3D jumpToSlice\_getImageSliceData()
      let numberOfSlices = 0;
      if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.StackViewport) {
        numberOfSlices = viewport.getImageIds().length;
      } else if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.VolumeViewport) {
        numberOfSlices = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.getImageSliceDataForVolumeViewport(viewport).numberOfSlices;
      } else {
        throw new Error('Unsupported viewport type');
      }
      const jumpIndex = imageIndex < 0 ? numberOfSlices + imageIndex : imageIndex;
      if (jumpIndex >= numberOfSlices || jumpIndex < 0) {
        throw new Error(`Can't jump to ${imageIndex}`);
      }

      // Set slice to last slice
      const options = {
        imageIndex: jumpIndex
      };
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.jumpToSlice(viewport.element, options);
    },
    scroll: _ref14 => {
      let {
        direction
      } = _ref14;
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      const options = {
        delta: direction
      };
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.scroll(viewport, options);
    },
    setViewportColormap: _ref15 => {
      let {
        viewportIndex,
        displaySetInstanceUID,
        colormap,
        immediate = false
      } = _ref15;
      const viewport = cornerstoneViewportService.getCornerstoneViewportByIndex(viewportIndex);
      const actorEntries = viewport.getActors();
      const actorEntry = actorEntries.find(actorEntry => {
        return actorEntry.uid.includes(displaySetInstanceUID);
      });
      const {
        actor: volumeActor,
        uid: volumeId
      } = actorEntry;
      viewport.setProperties({
        colormap,
        volumeActor
      }, volumeId);
      if (immediate) {
        viewport.render();
      }
    },
    incrementActiveViewport: () => {
      const {
        activeViewportIndex,
        viewports
      } = viewportGridService.getState();
      const nextViewportIndex = (activeViewportIndex + 1) % viewports.length;
      viewportGridService.setActiveViewportIndex(nextViewportIndex);
    },
    decrementActiveViewport: () => {
      const {
        activeViewportIndex,
        viewports
      } = viewportGridService.getState();
      const nextViewportIndex = (activeViewportIndex - 1 + viewports.length) % viewports.length;
      viewportGridService.setActiveViewportIndex(nextViewportIndex);
    },
    toggleStackImageSync: _ref16 => {
      let {
        toggledState
      } = _ref16;
      (0,_utils_stackSync_toggleStackImageSync__WEBPACK_IMPORTED_MODULE_4__["default"])({
        getEnabledElement: _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement,
        servicesManager,
        toggledState
      });
    },
    toggleReferenceLines: _ref17 => {
      let {
        toggledState
      } = _ref17;
      const {
        activeViewportIndex
      } = viewportGridService.getState();
      const viewportInfo = cornerstoneViewportService.getViewportInfoByIndex(activeViewportIndex);
      const viewportId = viewportInfo.getViewportId();
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      if (!toggledState) {
        toolGroup.setToolDisabled(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.ReferenceLinesTool.toolName);
      }
      toolGroup.setToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.ReferenceLinesTool.toolName, {
        sourceViewportId: viewportId
      }, true // overwrite
      );

      toolGroup.setToolEnabled(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.ReferenceLinesTool.toolName);
    }
  };
  const definitions = {
    // The command here is to show the viewer context menu, as being the
    // context menu
    showCornerstoneContextMenu: {
      commandFn: actions.showCornerstoneContextMenu,
      storeContexts: [],
      options: {
        menuCustomizationId: 'measurementsContextMenu',
        commands: [{
          commandName: 'showContextMenu'
        }]
      }
    },
    getNearbyToolData: {
      commandFn: actions.getNearbyToolData
    },
    getNearbyAnnotation: {
      commandFn: actions.getNearbyAnnotation,
      storeContexts: [],
      options: {}
    },
    deleteMeasurement: {
      commandFn: actions.deleteMeasurement
    },
    setMeasurementLabel: {
      commandFn: actions.setMeasurementLabel
    },
    updateMeasurement: {
      commandFn: actions.updateMeasurement
    },
    setWindowLevel: {
      commandFn: actions.setWindowLevel
    },
    toolbarServiceRecordInteraction: {
      commandFn: actions.toolbarServiceRecordInteraction
    },
    setToolActive: {
      commandFn: actions.setToolActive
    },
    rotateViewportCW: {
      commandFn: actions.rotateViewport,
      options: {
        rotation: 90
      }
    },
    rotateViewportCCW: {
      commandFn: actions.rotateViewport,
      options: {
        rotation: -90
      }
    },
    incrementActiveViewport: {
      commandFn: actions.incrementActiveViewport
    },
    decrementActiveViewport: {
      commandFn: actions.decrementActiveViewport
    },
    flipViewportHorizontal: {
      commandFn: actions.flipViewportHorizontal
    },
    flipViewportVertical: {
      commandFn: actions.flipViewportVertical
    },
    invertViewport: {
      commandFn: actions.invertViewport
    },
    resetViewport: {
      commandFn: actions.resetViewport
    },
    scaleUpViewport: {
      commandFn: actions.scaleViewport,
      options: {
        direction: 1
      }
    },
    scaleDownViewport: {
      commandFn: actions.scaleViewport,
      options: {
        direction: -1
      }
    },
    fitViewportToWindow: {
      commandFn: actions.scaleViewport,
      options: {
        direction: 0
      }
    },
    nextImage: {
      commandFn: actions.scroll,
      options: {
        direction: 1
      }
    },
    previousImage: {
      commandFn: actions.scroll,
      options: {
        direction: -1
      }
    },
    firstImage: {
      commandFn: actions.jumpToImage,
      options: {
        imageIndex: 0
      }
    },
    lastImage: {
      commandFn: actions.jumpToImage,
      options: {
        imageIndex: -1
      }
    },
    jumpToImage: {
      commandFn: actions.jumpToImage
    },
    showDownloadViewportModal: {
      commandFn: actions.showDownloadViewportModal
    },
    toggleCine: {
      commandFn: actions.toggleCine
    },
    arrowTextCallback: {
      commandFn: actions.arrowTextCallback
    },
    setViewportActive: {
      commandFn: actions.setViewportActive
    },
    setViewportColormap: {
      commandFn: actions.setViewportColormap
    },
    toggleStackImageSync: {
      commandFn: actions.toggleStackImageSync
    },
    toggleReferenceLines: {
      commandFn: actions.toggleReferenceLines
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE'
  };
}
const _default = commandsModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(commandsModule, "commandsModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/commandsModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/commandsModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.tsx ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dropzone */ "../../../node_modules/react-dropzone/dist/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/DicomFileUploader */ "../../../extensions/cornerstone/src/utils/DicomFileUploader.ts");
/* harmony import */ var _DicomUploadProgress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DicomUploadProgress */ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _DicomUpload_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DicomUpload.css */ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css");
/* harmony import */ var _DicomUpload_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_DicomUpload_css__WEBPACK_IMPORTED_MODULE_7__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








function DicomUpload(_ref) {
  let {
    dataSource,
    onComplete,
    onStarted
  } = _ref;
  const baseClassNames = 'min-h-[480px] flex flex-col bg-black select-none';
  const [dicomFileUploaderArr, setDicomFileUploaderArr] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const onDrop = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async acceptedFiles => {
    onStarted();
    setDicomFileUploaderArr(acceptedFiles.map(file => new _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_4__["default"](file, dataSource)));
  }, []);
  const getDropZoneComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_dropzone__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onDrop: acceptedFiles => {
        onDrop(acceptedFiles);
      },
      noClick: true
    }, _ref2 => {
      let {
        getRootProps
      } = _ref2;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", _extends({}, getRootProps(), {
        className: "m-5 dicom-upload-drop-area-border-dash flex flex-col items-center justify-center h-full"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "flex gap-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_dropzone__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onDrop: onDrop,
        noDrag: true
      }, _ref3 => {
        let {
          getRootProps,
          getInputProps
        } = _ref3;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", getRootProps(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.Button, {
          variant: "contained",
          color: "primary",
          disabled: false,
          onClick: () => {}
        }, 'Add files', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", getInputProps())));
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_dropzone__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onDrop: onDrop,
        noDrag: true
      }, _ref4 => {
        let {
          getRootProps,
          getInputProps
        } = _ref4;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", getRootProps(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_6__.Button, {
          variant: "contained",
          color: "primaryDark",
          border: "primaryActive",
          disabled: false,
          onClick: () => {}
        }, 'Add folder', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", _extends({}, getInputProps(), {
          webkitdirectory: "true",
          mozdirectory: "true"
        }))));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "pt-5"
      }, "or drag images or folders here"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "pt-3 text-aqua-pale text-lg"
      }, "(DICOM files supported)"));
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dicomFileUploaderArr.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('h-[calc(100vh-300px)]', baseClassNames)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DicomUploadProgress__WEBPACK_IMPORTED_MODULE_5__["default"], {
    dicomFileUploaderArr: Array.from(dicomFileUploaderArr),
    onComplete: onComplete
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('h-[480px]', baseClassNames)
  }, getDropZoneComponent()));
}
__signature__(DicomUpload, "useState{[dicomFileUploaderArr, setDicomFileUploaderArr]([])}\nuseCallback{onDrop}");
DicomUpload.propTypes = {
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired,
  onComplete: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  onStarted: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired
};
const _default = DicomUpload;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DicomUpload, "DicomUpload", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUpload.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUpload.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx":
/*!******************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/DicomFileUploader */ "../../../extensions/cornerstone/src/utils/DicomFileUploader.ts");
/* harmony import */ var _DicomUploadProgressItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DicomUploadProgressItem */ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgressItem.tsx");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

// The base/initial interval time length used to calculate the
// rate of the upload and in turn estimate the
// the amount of time remaining for the upload. This is the length
// of the very first interval to get a reasonable estimate on screen in
// a reasonable amount of time. The length of each interval after the first
// is based on the upload rate calculated. Faster rates use this base interval
// length. Slower rates below UPLOAD_RATE_THRESHOLD get longer interval times
// to obtain more accurate upload rates.
const BASE_INTERVAL_TIME = 15000;

// The upload rate threshold to determine the length of the interval to
// calculate the upload rate.
const UPLOAD_RATE_THRESHOLD = 75;
const NO_WRAP_ELLIPSIS_CLASS_NAMES = 'text-ellipsis whitespace-nowrap overflow-hidden';
function DicomUploadProgress(_ref) {
  let {
    dicomFileUploaderArr,
    onComplete
  } = _ref;
  const [totalUploadSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dicomFileUploaderArr.reduce((acc, fileUploader) => acc + fileUploader.getFileSize(), 0));
  const currentUploadSizeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const uploadRateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const [timeRemaining, setTimeRemaining] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [percentComplete, setPercentComplete] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [numFilesCompleted, setNumFilesCompleted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [numFails, setNumFails] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [showFailedOnly, setShowFailedOnly] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const progressBarContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  /**
   * The effect for measuring and setting the current upload rate. This is
   * done by measuring the amount of data uploaded in a set interval time.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let timeoutId;

    // The amount of data already uploaded at the start of the interval.
    let intervalStartUploadSize = 0;

    // The starting time of the interval.
    let intervalStartTime = Date.now();
    const setUploadRateRef = () => {
      const uploadSizeFromStartOfInterval = currentUploadSizeRef.current - intervalStartUploadSize;
      const now = Date.now();
      const timeSinceStartOfInterval = now - intervalStartTime;

      // Calculate and set the upload rate (ref)
      uploadRateRef.current = uploadSizeFromStartOfInterval / timeSinceStartOfInterval;

      // Reset the interval starting values.
      intervalStartUploadSize = currentUploadSizeRef.current;
      intervalStartTime = now;

      // Only start a new interval if there is more to upload.
      if (totalUploadSize - currentUploadSizeRef.current > 0) {
        if (uploadRateRef.current >= UPLOAD_RATE_THRESHOLD) {
          timeoutId = setTimeout(setUploadRateRef, BASE_INTERVAL_TIME);
        } else {
          // The current upload rate is relatively slow, so use a larger
          // time interval to get a better upload rate estimate.
          timeoutId = setTimeout(setUploadRateRef, BASE_INTERVAL_TIME * 2);
        }
      }
    };

    // The very first interval is just the base time interval length.
    timeoutId = setTimeout(setUploadRateRef, BASE_INTERVAL_TIME);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  /**
   * The effect for: updating the overall percentage complete; setting the
   * estimated time remaining; updating the number of files uploaded; and
   * detecting if any error has occurred.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let currentTimeRemaining = null;

    // For each uploader, listen for the progress percentage complete and
    // add promise catch/finally callbacks to detect errors and count number
    // of uploads complete.
    const subscriptions = dicomFileUploaderArr.map(fileUploader => {
      let currentFileUploadSize = 0;
      const updateProgress = percentComplete => {
        const previousFileUploadSize = currentFileUploadSize;
        currentFileUploadSize = Math.round(percentComplete / 100 * fileUploader.getFileSize());
        currentUploadSizeRef.current = Math.min(totalUploadSize, currentUploadSizeRef.current - previousFileUploadSize + currentFileUploadSize);
        setPercentComplete(currentUploadSizeRef.current / totalUploadSize * 100);
        if (uploadRateRef.current !== 0) {
          const uploadSizeRemaining = totalUploadSize - currentUploadSizeRef.current;
          const timeRemaining = Math.round(uploadSizeRemaining / uploadRateRef.current);
          if (currentTimeRemaining === null) {
            currentTimeRemaining = timeRemaining;
            setTimeRemaining(currentTimeRemaining);
            return;
          }

          // Do not show an increase in the time remaining by two seconds or minutes
          // so as to prevent jumping the time remaining up and down constantly
          // due to rounding, inaccuracies in the estimate and slight variations
          // in upload rates over time.
          if (timeRemaining < ONE_MINUTE) {
            const currentSecondsRemaining = Math.ceil(currentTimeRemaining / ONE_SECOND);
            const secondsRemaining = Math.ceil(timeRemaining / ONE_SECOND);
            const delta = secondsRemaining - currentSecondsRemaining;
            if (delta < 0 || delta > 2) {
              currentTimeRemaining = timeRemaining;
              setTimeRemaining(currentTimeRemaining);
            }
            return;
          }
          if (timeRemaining < ONE_HOUR) {
            const currentMinutesRemaining = Math.ceil(currentTimeRemaining / ONE_MINUTE);
            const minutesRemaining = Math.ceil(timeRemaining / ONE_MINUTE);
            const delta = minutesRemaining - currentMinutesRemaining;
            if (delta < 0 || delta > 2) {
              currentTimeRemaining = timeRemaining;
              setTimeRemaining(currentTimeRemaining);
            }
            return;
          }

          // Hours remaining...
          currentTimeRemaining = timeRemaining;
          setTimeRemaining(currentTimeRemaining);
        }
      };
      const progressCallback = progressEvent => {
        updateProgress(progressEvent.percentComplete);
      };

      // Use the uploader promise to flag any error and count the number of
      // uploads completed.
      fileUploader.load().catch(rejection => {
        if (rejection.status === _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_3__.UploadStatus.Failed) {
          setNumFails(numFails => numFails + 1);
        }
      }).finally(() => {
        // If any error occurred, the percent complete progress stops firing
        // but this call to updateProgress nicely puts all finished uploads at 100%.
        updateProgress(100);
        setNumFilesCompleted(numCompleted => numCompleted + 1);
      });
      return fileUploader.subscribe(_utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_3__.EVENTS.PROGRESS, progressCallback);
    });
    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    };
  }, []);
  const cancelAllUploads = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    for (const dicomFileUploader of dicomFileUploaderArr) {
      // Important: we need a non-blocking way to cancel every upload,
      // otherwise the UI will freeze and the user will not be able
      // to interact with the app and progress will not be updated.
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          dicomFileUploader.cancel();
          resolve();
        }, 0);
      });
    }
  }, []);
  const getFormattedTimeRemaining = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (timeRemaining == null) {
      return '';
    }
    if (timeRemaining < ONE_MINUTE) {
      const secondsRemaining = Math.ceil(timeRemaining / ONE_SECOND);
      return `${secondsRemaining} ${secondsRemaining === 1 ? 'second' : 'seconds'}`;
    }
    if (timeRemaining < ONE_HOUR) {
      const minutesRemaining = Math.ceil(timeRemaining / ONE_MINUTE);
      return `${minutesRemaining} ${minutesRemaining === 1 ? 'minute' : 'minutes'}`;
    }
    const hoursRemaining = Math.ceil(timeRemaining / ONE_HOUR);
    return `${hoursRemaining} ${hoursRemaining === 1 ? 'hour' : 'hours'}`;
  }, [timeRemaining]);
  const getPercentCompleteRounded = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => Math.min(100, Math.round(percentComplete)), [percentComplete]);

  /**
   * Determines if the progress bar should show the infinite animation or not.
   * Show the infinite animation for progress less than 1% AND if less than
   * one pixel of the progress bar would be displayed.
   */
  const showInfiniteProgressBar = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    return getPercentCompleteRounded() < 1 && (progressBarContainerRef?.current?.offsetWidth ?? 0) * (percentComplete / 100) < 1;
  }, [getPercentCompleteRounded, percentComplete]);

  /**
   * Gets the css style for the 'n of m' (files completed) text. The only css attribute
   * of the style is width such that the 'n of m' is always a fixed width and thus
   * as each file completes uploading the text on screen does not constantly shift
   * left and right.
   */
  const getNofMFilesStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    // the number of digits accounts for the digits being on each side of the ' of '
    const numDigits = 2 * dicomFileUploaderArr.length.toString().length;
    // the number of digits + 2 spaces and 2 characters for ' of '
    const numChars = numDigits + 4;
    return {
      width: `${numChars}ch`
    };
  }, []);
  const getNumCompletedAndTimeRemainingComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "text-lg px-1 pb-4 h-14 flex bg-primary-dark items-center"
    }, numFilesCompleted === dicomFileUploaderArr.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: NO_WRAP_ELLIPSIS_CLASS_NAMES
    }, `${dicomFileUploaderArr.length} ${dicomFileUploaderArr.length > 1 ? 'files' : 'file'} completed.`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "contained",
      color: "primary",
      disabled: false,
      className: "ml-auto",
      onClick: onComplete
    }, 'Close')) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      style: getNofMFilesStyle(),
      className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(NO_WRAP_ELLIPSIS_CLASS_NAMES, 'text-end')
    }, `${numFilesCompleted} of ${dicomFileUploaderArr.length}`, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: NO_WRAP_ELLIPSIS_CLASS_NAMES
    }, ' files completed.', "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: NO_WRAP_ELLIPSIS_CLASS_NAMES
    }, timeRemaining ? `Less than ${getFormattedTimeRemaining()} remaining. ` : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(NO_WRAP_ELLIPSIS_CLASS_NAMES, 'cursor-pointer text-primary-active hover:text-primary-light active:text-aqua-pale ml-auto'),
      onClick: cancelAllUploads
    }, "Cancel All Uploads")));
  };
  const getShowFailedOnlyIconComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "ml-auto flex justify-center w-6"
    }, numFails > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      onClick: () => setShowFailedOnly(currentShowFailedOnly => !currentShowFailedOnly)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      className: "cursor-pointer",
      name: "icon-status-alert"
    })));
  };
  const getPercentCompleteComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "overflow-y-scroll ohif-scrollbar px-2 border-b border-secondary-light"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "flex w-full p-2.5 items-center min-h-14"
    }, numFilesCompleted === dicomFileUploaderArr.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "text-xl text-primary-light"
    }, numFails > 0 ? `Completed with ${numFails} ${numFails > 1 ? 'errors' : 'error'}!` : 'Completed!'), getShowFailedOnlyIconComponent()) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      ref: progressBarContainerRef,
      className: "flex-grow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.ProgressLoadingBar, {
      progress: showInfiniteProgressBar() ? undefined : Math.min(100, percentComplete)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "w-24 ml-1 flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "w-10 text-right"
    }, `${getPercentCompleteRounded()}%`), getShowFailedOnlyIconComponent()))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-col grow"
  }, getNumCompletedAndTimeRemainingComponent(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-col bg-black text-lg overflow-hidden grow"
  }, getPercentCompleteComponent(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overflow-y-scroll ohif-scrollbar px-2 grow h-1"
  }, dicomFileUploaderArr.filter(dicomFileUploader => !showFailedOnly || dicomFileUploader.getStatus() === _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_3__.UploadStatus.Failed).map(dicomFileUploader => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DicomUploadProgressItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: dicomFileUploader.getFileId(),
    dicomFileUploader: dicomFileUploader
  })))));
}
__signature__(DicomUploadProgress, "useState{[totalUploadSize](dicomFileUploaderArr.reduce(\n      (acc, fileUploader) => acc + fileUploader.getFileSize(),\n      0\n    ))}\nuseRef{currentUploadSizeRef}\nuseRef{uploadRateRef}\nuseState{[timeRemaining, setTimeRemaining](null)}\nuseState{[percentComplete, setPercentComplete](0)}\nuseState{[numFilesCompleted, setNumFilesCompleted](0)}\nuseState{[numFails, setNumFails](0)}\nuseState{[showFailedOnly, setShowFailedOnly](false)}\nuseRef{progressBarContainerRef}\nuseEffect{}\nuseEffect{}\nuseCallback{cancelAllUploads}\nuseCallback{getFormattedTimeRemaining}\nuseCallback{getPercentCompleteRounded}\nuseCallback{showInfiniteProgressBar}\nuseCallback{getNofMFilesStyle}");
DicomUploadProgress.propTypes = {
  dicomFileUploaderArr: prop_types__WEBPACK_IMPORTED_MODULE_1___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_3__["default"])).isRequired,
  onComplete: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
const _default = DicomUploadProgress;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ONE_SECOND, "ONE_SECOND", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(ONE_MINUTE, "ONE_MINUTE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(ONE_HOUR, "ONE_HOUR", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(BASE_INTERVAL_TIME, "BASE_INTERVAL_TIME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(UPLOAD_RATE_THRESHOLD, "UPLOAD_RATE_THRESHOLD", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(NO_WRAP_ELLIPSIS_CLASS_NAMES, "NO_WRAP_ELLIPSIS_CLASS_NAMES", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(DicomUploadProgress, "DicomUploadProgress", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgressItem.tsx":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgressItem.tsx ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/DicomFileUploader */ "../../../extensions/cornerstone/src/utils/DicomFileUploader.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




// eslint-disable-next-line react/display-name
const DicomUploadProgressItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(__signature__(_ref => {
  let {
    dicomFileUploader
  } = _ref;
  const [percentComplete, setPercentComplete] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dicomFileUploader.getPercentComplete());
  const [failedReason, setFailedReason] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dicomFileUploader.getStatus());
  console.info(`${dicomFileUploader.getFileId()}`);
  const isComplete = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    return status === _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.Failed || status === _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.Cancelled || status === _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.Success;
  }, [status]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const progressSubscription = dicomFileUploader.subscribe(_utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.EVENTS.PROGRESS, dicomFileUploaderProgressEvent => {
      setPercentComplete(dicomFileUploaderProgressEvent.percentComplete);
    });
    dicomFileUploader.load().catch(reason => {
      setStatus(reason.status);
      setFailedReason(reason.message ?? '');
    }).finally(() => setStatus(dicomFileUploader.getStatus()));
    return () => progressSubscription.unsubscribe();
  }, []);
  const cancelUpload = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dicomFileUploader.cancel();
  }, []);
  const getStatusIcon = () => {
    switch (dicomFileUploader.getStatus()) {
      case _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.Success:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
          name: "status-tracked",
          className: "text-primary-light"
        });
      case _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.InProgress:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
          name: "icon-transferring"
        });
      case _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.Failed:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
          name: "icon-alert-small"
        });
      case _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.Cancelled:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
          name: "icon-alert-outline"
        });
      default:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex w-full p-2.5 text-lg min-h-14 items-center border-b border-secondary-light overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-col gap-1 self-top w-0 grow shrink"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex w-6 justify-center items-center shrink-0"
  }, getStatusIcon()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-ellipsis whitespace-nowrap overflow-hidden"
  }, dicomFileUploader.getFileName())), failedReason && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "pl-10"
  }, failedReason)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "w-24 flex items-center"
  }, !isComplete() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dicomFileUploader.getStatus() === _utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__.UploadStatus.InProgress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "w-10 text-right"
  }, percentComplete, "%"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex cursor-pointer ml-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
    className: "self-center text-primary-active",
    name: "close",
    onClick: cancelUpload
  })))));
}, "useState{[percentComplete, setPercentComplete](dicomFileUploader.getPercentComplete())}\nuseState{[failedReason, setFailedReason]('')}\nuseState{[status, setStatus](dicomFileUploader.getStatus())}\nuseCallback{isComplete}\nuseEffect{}\nuseCallback{cancelUpload}"));
DicomUploadProgressItem.propTypes = {
  dicomFileUploader: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_utils_DicomFileUploader__WEBPACK_IMPORTED_MODULE_2__["default"]).isRequired
};
const _default = DicomUploadProgressItem;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DicomUploadProgressItem, "DicomUploadProgressItem", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgressItem.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/components/DicomUpload/DicomUploadProgressItem.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/getCustomizationModule.ts":
/*!*********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/getCustomizationModule.ts ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initCornerstoneTools */ "../../../extensions/cornerstone/src/initCornerstoneTools.js");
/* harmony import */ var _components_DicomUpload_DicomUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/DicomUpload/DicomUpload */ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const tools = {
  active: [{
    toolName: _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_1__.toolNames.WindowLevel,
    bindings: [{
      mouseButton: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.Enums.MouseBindings.Primary
    }]
  }, {
    toolName: _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_1__.toolNames.Pan,
    bindings: [{
      mouseButton: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.Enums.MouseBindings.Auxiliary
    }]
  }, {
    toolName: _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_1__.toolNames.Zoom,
    bindings: [{
      mouseButton: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.Enums.MouseBindings.Secondary
    }]
  }, {
    toolName: _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_1__.toolNames.StackScrollMouseWheel,
    bindings: []
  }],
  enabled: [{
    toolName: _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_1__.toolNames.SegmentationDisplay
  }]
};
function getCustomizationModule() {
  return [{
    name: 'cornerstoneDicomUploadComponent',
    value: {
      id: 'dicomUploadComponent',
      component: _components_DicomUpload_DicomUpload__WEBPACK_IMPORTED_MODULE_2__["default"]
    }
  }, {
    name: 'default',
    value: [{
      id: 'cornerstone.overlayViewportTools',
      tools
    }]
  }];
}
const _default = getCustomizationModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(tools, "tools", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getCustomizationModule.ts");
  reactHotLoader.register(getCustomizationModule, "getCustomizationModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getCustomizationModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getCustomizationModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/getHangingProtocolModule.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/getHangingProtocolModule.ts ***!
  \***********************************************************************/
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
const mpr = {
  id: 'mpr',
  name: 'Multi-Planar Reconstruction',
  locked: true,
  hasUpdatedPriorsInformation: false,
  createdDate: '2021-02-23',
  modifiedDate: '2023-04-03',
  availableTo: {},
  editableBy: {},
  // Unknown number of priors referenced - so just match any study
  numberOfPriorsReferenced: 0,
  protocolMatchingRules: [],
  imageLoadStrategy: 'nth',
  callbacks: {
    // Switches out of MPR mode when the layout change button is used
    onLayoutChange: [{
      commandName: 'toggleHangingProtocol',
      commandOptions: {
        protocolId: 'mpr'
      },
      context: 'DEFAULT'
    }],
    // Turns off crosshairs when switching out of MPR mode
    onProtocolExit: [{
      commandName: 'toolbarServiceRecordInteraction',
      commandOptions: {
        interactionType: 'tool',
        commands: [{
          commandOptions: {
            toolName: 'WindowLevel'
          },
          context: 'CORNERSTONE'
        }]
      }
    }]
  },
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    name: 'MPR 1x3',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3,
        layoutOptions: [{
          x: 0,
          y: 0,
          width: 1 / 3,
          height: 1
        }, {
          x: 1 / 3,
          y: 0,
          width: 1 / 3,
          height: 1
        }, {
          x: 2 / 3,
          y: 0,
          width: 1 / 3,
          height: 1
        }]
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
const mprAnd3DVolumeViewport = {
  id: 'mprAnd3DVolumeViewport',
  locked: true,
  hasUpdatedPriorsInformation: false,
  name: 'mpr',
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    mprDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'Modality',
        constraint: {
          equals: {
            value: 'CT'
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'mpr3Stage',
    name: 'mpr',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true
        }]
      },
      displaySets: [{
        id: 'mprDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'volume3d',
        viewportType: 'volume3d',
        orientation: 'coronal',
        customViewportProps: {
          hideOverlays: true
        }
      },
      displaySets: [{
        id: 'mprDisplaySet',
        options: {
          displayPreset: 'CT-Bone'
        }
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true
        }]
      },
      displaySets: [{
        id: 'mprDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true
        }]
      },
      displaySets: [{
        id: 'mprDisplaySet'
      }]
    }]
  }]
};
function getHangingProtocolModule() {
  return [{
    name: mpr.id,
    protocol: mpr
  }, {
    name: mprAnd3DVolumeViewport.id,
    protocol: mprAnd3DVolumeViewport
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
  reactHotLoader.register(mpr, "mpr", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getHangingProtocolModule.ts");
  reactHotLoader.register(mprAnd3DVolumeViewport, "mprAnd3DVolumeViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getHangingProtocolModule.ts");
  reactHotLoader.register(getHangingProtocolModule, "getHangingProtocolModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getHangingProtocolModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/getHangingProtocolModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/id.js":
/*!*************************************************!*\
  !*** ../../../extensions/cornerstone/src/id.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/index.tsx":
/*!*****************************************************!*\
  !*** ../../../extensions/cornerstone/src/index.tsx ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CornerstoneExtensionTypes: () => (/* reexport module object */ _types__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getActiveViewportEnabledElement: () => (/* reexport safe */ _utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   measurementMappingUtils: () => (/* reexport safe */ _utils_measurementServiceMappings__WEBPACK_IMPORTED_MODULE_19__.measurementMappingUtils),
/* harmony export */   toolNames: () => (/* reexport safe */ _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_13__.toolNames)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./init */ "../../../extensions/cornerstone/src/init.tsx");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/cornerstone/src/getCustomizationModule.ts");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/cornerstone/src/commandsModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/cornerstone/src/getHangingProtocolModule.ts");
/* harmony import */ var _services_ToolGroupService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/ToolGroupService */ "../../../extensions/cornerstone/src/services/ToolGroupService/index.js");
/* harmony import */ var _services_SyncGroupService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/SyncGroupService */ "../../../extensions/cornerstone/src/services/SyncGroupService/index.js");
/* harmony import */ var _services_SegmentationService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/SegmentationService */ "../../../extensions/cornerstone/src/services/SegmentationService/index.js");
/* harmony import */ var _services_CornerstoneCacheService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/CornerstoneCacheService */ "../../../extensions/cornerstone/src/services/CornerstoneCacheService/index.js");
/* harmony import */ var _services_ViewportService_CornerstoneViewportService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/ViewportService/CornerstoneViewportService */ "../../../extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./types */ "../../../extensions/cornerstone/src/types/index.ts");
/* harmony import */ var _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./initCornerstoneTools */ "../../../extensions/cornerstone/src/initCornerstoneTools.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./state */ "../../../extensions/cornerstone/src/state.ts");
/* harmony import */ var _utils_dicomLoaderService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/dicomLoaderService */ "../../../extensions/cornerstone/src/utils/dicomLoaderService.js");
/* harmony import */ var _utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/getActiveViewportEnabledElement */ "../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone/src/id.js");
/* harmony import */ var _initWADOImageLoader_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./initWADOImageLoader.js */ "../../../extensions/cornerstone/src/initWADOImageLoader.js");
/* harmony import */ var _utils_measurementServiceMappings__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/measurementServiceMappings */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/index.ts");
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
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-resize-detector_build_index_esm_js"), __webpack_require__.e("extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Viewport/OHIFCornerstoneViewport */ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx"));
});
const OHIFCornerstoneViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, props));
};

/**
 *
 */
const cornerstoneExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_17__.id,
  onModeExit: () => {
    // Empty out the image load and retrieval pools to prevent memory leaks
    // on the mode exits
    Object.values(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.Enums.RequestType).forEach(type => {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.imageLoadPoolManager.clearRequestStack(type);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.imageRetrievalPoolManager.clearRequestStack(type);
    });
    _initWADOImageLoader_js__WEBPACK_IMPORTED_MODULE_18__.destroy();
    (0,_state__WEBPACK_IMPORTED_MODULE_14__.reset)();
  },
  /**
   * Register the Cornerstone 3D services and set them up for use.
   *
   * @param configuration.csToolsConfig - Passed directly to `initCornerstoneTools`
   */
  preRegistration: function (props) {
    const {
      servicesManager
    } = props;
    servicesManager.registerService(_services_ViewportService_CornerstoneViewportService__WEBPACK_IMPORTED_MODULE_11__["default"].REGISTRATION);
    servicesManager.registerService(_services_ToolGroupService__WEBPACK_IMPORTED_MODULE_7__["default"].REGISTRATION);
    servicesManager.registerService(_services_SyncGroupService__WEBPACK_IMPORTED_MODULE_8__["default"].REGISTRATION);
    servicesManager.registerService(_services_SegmentationService__WEBPACK_IMPORTED_MODULE_9__["default"].REGISTRATION);
    servicesManager.registerService(_services_CornerstoneCacheService__WEBPACK_IMPORTED_MODULE_10__["default"].REGISTRATION);
    return _init__WEBPACK_IMPORTED_MODULE_3__["default"].call(this, props);
  },
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__["default"],
  getViewportModule(_ref) {
    let {
      servicesManager,
      commandsManager
    } = _ref;
    const ExtendedOHIFCornerstoneViewport = props => {
      // const onNewImageHandler = jumpData => {
      //   commandsManager.runCommand('jumpToImage', jumpData);
      // };
      const {
        toolbarService
      } = servicesManager.services;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OHIFCornerstoneViewport, _extends({}, props, {
        toolbarService: toolbarService,
        servicesManager: servicesManager,
        commandsManager: commandsManager
      }));
    };
    return [{
      name: 'cornerstone',
      component: ExtendedOHIFCornerstoneViewport
    }];
  },
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_5__["default"],
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getUtilityModule(_ref2) {
    let {
      servicesManager
    } = _ref2;
    return [{
      name: 'common',
      exports: {
        getCornerstoneLibraries: () => {
          return {
            cornerstone: _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__,
            cornerstoneTools: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__
          };
        },
        getEnabledElement: _state__WEBPACK_IMPORTED_MODULE_14__.getEnabledElement,
        dicomLoaderService: _utils_dicomLoaderService__WEBPACK_IMPORTED_MODULE_15__["default"]
      }
    }, {
      name: 'core',
      exports: {
        Enums: _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.Enums
      }
    }, {
      name: 'tools',
      exports: {
        toolNames: _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_13__.toolNames,
        Enums: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.Enums
      }
    }];
  }
};

const _default = cornerstoneExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Component, "Component", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/index.tsx");
  reactHotLoader.register(OHIFCornerstoneViewport, "OHIFCornerstoneViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/index.tsx");
  reactHotLoader.register(cornerstoneExtension, "cornerstoneExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/init.tsx":
/*!****************************************************!*\
  !*** ../../../extensions/cornerstone/src/init.tsx ***!
  \****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_streaming_image_volume_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/streaming-image-volume-loader */ "../../../node_modules/@cornerstonejs/streaming-image-volume-loader/dist/esm/index.js");
/* harmony import */ var _initWADOImageLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./initWADOImageLoader */ "../../../extensions/cornerstone/src/initWADOImageLoader.js");
/* harmony import */ var _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./initCornerstoneTools */ "../../../extensions/cornerstone/src/initCornerstoneTools.js");
/* harmony import */ var _initMeasurementService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./initMeasurementService */ "../../../extensions/cornerstone/src/initMeasurementService.js");
/* harmony import */ var _initCineService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./initCineService */ "../../../extensions/cornerstone/src/initCineService.ts");
/* harmony import */ var _utils_interleaveCenterLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/interleaveCenterLoader */ "../../../extensions/cornerstone/src/utils/interleaveCenterLoader.ts");
/* harmony import */ var _utils_nthLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/nthLoader */ "../../../extensions/cornerstone/src/utils/nthLoader.ts");
/* harmony import */ var _utils_interleaveTopToBottom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/interleaveTopToBottom */ "../../../extensions/cornerstone/src/utils/interleaveTopToBottom.ts");
/* harmony import */ var _initContextMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./initContextMenu */ "../../../extensions/cornerstone/src/initContextMenu.ts");
/* harmony import */ var _initDoubleClick__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./initDoubleClick */ "../../../extensions/cornerstone/src/initDoubleClick.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

















// TODO: Cypress tests are currently grabbing this from the window?
window.cornerstone = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__;
window.cornerstoneTools = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__;
/**
 *
 */
async function init(_ref) {
  let {
    servicesManager,
    commandsManager,
    extensionManager,
    configuration,
    appConfig
  } = _ref;
  await (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.init)();

  // For debugging e2e tests that are failing on CI
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.setUseCPURendering(Boolean(appConfig.useCPURendering));
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.setConfiguration({
    ..._cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getConfiguration(),
    rendering: {
      ..._cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getConfiguration().rendering,
      strictZSpacingForVolumeViewport: appConfig.strictZSpacingForVolumeViewport
    }
  });

  // For debugging large datasets
  const MAX_CACHE_SIZE_1GB = 1073741824;
  const maxCacheSize = appConfig.maxCacheSize;
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.setMaxCacheSize(maxCacheSize ? maxCacheSize : MAX_CACHE_SIZE_1GB);
  (0,_initCornerstoneTools__WEBPACK_IMPORTED_MODULE_6__["default"])();
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Settings.getRuntimeSettings().set('useCursors', Boolean(appConfig.useCursors));
  const {
    userAuthenticationService,
    measurementService,
    customizationService,
    displaySetService,
    uiDialogService,
    uiModalService,
    uiNotificationService,
    cineService,
    cornerstoneViewportService,
    hangingProtocolService,
    toolGroupService,
    viewportGridService,
    stateSyncService
  } = servicesManager.services;
  window.services = servicesManager.services;
  window.extensionManager = extensionManager;
  window.commandsManager = commandsManager;
  if (appConfig.showWarningMessageForCrossOrigin && !window.crossOriginIsolated) {
    uiNotificationService.show({
      title: 'Cross Origin Isolation',
      message: 'Cross Origin Isolation is not enabled, volume rendering will not work (e.g., MPR)',
      type: 'warning'
    });
  }
  if (appConfig.showCPUFallbackMessage && _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getShouldUseCPURendering()) {
    _showCPURenderingModal(uiModalService, hangingProtocolService);
  }

  // Stores a map from `lutPresentationId` to a Presentation object so that
  // an OHIFCornerstoneViewport can be redisplayed with the same LUT
  stateSyncService.register('lutPresentationStore', {
    clearOnModeExit: true
  });

  // Stores a map from `positionPresentationId` to a Presentation object so that
  // an OHIFCornerstoneViewport can be redisplayed with the same position
  stateSyncService.register('positionPresentationStore', {
    clearOnModeExit: true
  });

  // Stores the entire ViewportGridService getState when toggling to one up
  // (e.g. via a double click) so that it can be restored when toggling back.
  stateSyncService.register('toggleOneUpViewportGridStore', {
    clearOnModeExit: true
  });
  const labelmapRepresentation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.SegmentationRepresentations.Labelmap;
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setGlobalRepresentationConfig(labelmapRepresentation, {
    fillAlpha: 0.3,
    fillAlphaInactive: 0.2,
    outlineOpacity: 1,
    outlineOpacityInactive: 0.65
  });
  const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.volumeLoader.registerVolumeLoader('cornerstoneStreamingImageVolume', _cornerstonejs_streaming_image_volume_loader__WEBPACK_IMPORTED_MODULE_4__.cornerstoneStreamingImageVolumeLoader);
  hangingProtocolService.registerImageLoadStrategy('interleaveCenter', _utils_interleaveCenterLoader__WEBPACK_IMPORTED_MODULE_9__["default"]);
  hangingProtocolService.registerImageLoadStrategy('interleaveTopToBottom', _utils_interleaveTopToBottom__WEBPACK_IMPORTED_MODULE_11__["default"]);
  hangingProtocolService.registerImageLoadStrategy('nth', _utils_nthLoader__WEBPACK_IMPORTED_MODULE_10__["default"]);

  // add metadata providers
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.addProvider(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.calibratedPixelSpacingMetadataProvider.get.bind(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.calibratedPixelSpacingMetadataProvider)); // this provider is required for Calibration tool
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.addProvider(metadataProvider.get.bind(metadataProvider), 9999);
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.imageLoadPoolManager.maxNumRequests = {
    interaction: appConfig?.maxNumRequests?.interaction || 100,
    thumbnail: appConfig?.maxNumRequests?.thumbnail || 75,
    prefetch: appConfig?.maxNumRequests?.prefetch || 10
  };
  (0,_initWADOImageLoader__WEBPACK_IMPORTED_MODULE_5__["default"])(userAuthenticationService, appConfig);

  /* Measurement Service */
  this.measurementServiceSource = (0,_initMeasurementService__WEBPACK_IMPORTED_MODULE_7__.connectToolsToMeasurementService)(servicesManager);
  (0,_initCineService__WEBPACK_IMPORTED_MODULE_8__["default"])(cineService);

  // When a custom image load is performed, update the relevant viewports
  hangingProtocolService.subscribe(hangingProtocolService.EVENTS.CUSTOM_IMAGE_LOAD_PERFORMED, volumeInputArrayMap => {
    for (const entry of volumeInputArrayMap.entries()) {
      const [viewportId, volumeInputArray] = entry;
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const ohifViewport = cornerstoneViewportService.getViewportInfo(viewportId);
      const {
        lutPresentationStore,
        positionPresentationStore
      } = stateSyncService.getState();
      const {
        presentationIds
      } = ohifViewport.getViewportOptions();
      const presentations = {
        positionPresentation: positionPresentationStore[presentationIds?.positionPresentationId],
        lutPresentation: lutPresentationStore[presentationIds?.lutPresentationId]
      };
      cornerstoneViewportService.setVolumesForViewport(viewport, volumeInputArray, presentations);
    }
  });
  (0,_initContextMenu__WEBPACK_IMPORTED_MODULE_12__["default"])({
    cornerstoneViewportService,
    customizationService,
    commandsManager
  });
  (0,_initDoubleClick__WEBPACK_IMPORTED_MODULE_13__["default"])({
    customizationService,
    commandsManager
  });
  const newStackCallback = evt => {
    const {
      element
    } = evt.detail;
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.stackPrefetch.enable(element);
  };
  const resetCrosshairs = evt => {
    const {
      element
    } = evt.detail;
    const {
      viewportId,
      renderingEngineId
    } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement(element);
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
    if (!toolGroup || !toolGroup._toolInstances?.['Crosshairs']) {
      return;
    }
    const mode = toolGroup._toolInstances['Crosshairs'].mode;
    if (mode === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.ToolModes.Active) {
      toolGroup.setToolActive('Crosshairs');
    } else if (mode === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.ToolModes.Passive) {
      toolGroup.setToolPassive('Crosshairs');
    } else if (mode === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.ToolModes.Enabled) {
      toolGroup.setToolEnabled('Crosshairs');
    }
  };
  function elementEnabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.EVENTS.CAMERA_RESET, resetCrosshairs);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.EVENTS.STACK_VIEWPORT_NEW_STACK, newStackCallback);
  }
  function elementDisabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.EVENTS.CAMERA_RESET, resetCrosshairs);

    // TODO - consider removing the callback when all elements are gone
    // eventTarget.removeEventListener(
    //   EVENTS.STACK_VIEWPORT_NEW_STACK,
    //   newStackCallback
    // );
  }

  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.EVENTS.ELEMENT_ENABLED, elementEnabledHandler.bind(null));
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.EVENTS.ELEMENT_DISABLED, elementDisabledHandler.bind(null));
  viewportGridService.subscribe(viewportGridService.EVENTS.ACTIVE_VIEWPORT_INDEX_CHANGED, _ref2 => {
    let {
      viewportIndex,
      viewportId
    } = _ref2;
    viewportId = viewportId || `viewport-${viewportIndex}`;
    const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
    if (!toolGroup || !toolGroup._toolInstances?.['ReferenceLines']) {
      return;
    }

    // check if reference lines are active
    const referenceLinesEnabled = toolGroup._toolInstances['ReferenceLines'].mode === _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.ToolModes.Enabled;
    if (!referenceLinesEnabled) {
      return;
    }
    toolGroup.setToolConfiguration(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.ReferenceLinesTool.toolName, {
      sourceViewportId: viewportId
    }, true // overwrite
    );

    // make sure to set it to enabled again since we want to recalculate
    // the source-target lines
    toolGroup.setToolEnabled(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.ReferenceLinesTool.toolName);
  });
}
function CPUModal() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Your computer does not have enough GPU power to support the default GPU rendering mode. OHIF has switched to CPU rendering mode. Please note that CPU rendering does not support all features such as Volume Rendering, Multiplanar Reconstruction, and Segmentation Overlays."));
}
function _showCPURenderingModal(uiModalService, hangingProtocolService) {
  const callback = progress => {
    if (progress === 100) {
      uiModalService.show({
        content: CPUModal,
        title: 'OHIF Fell Back to CPU Rendering'
      });
      return true;
    }
  };
  const {
    unsubscribe
  } = hangingProtocolService.subscribe(hangingProtocolService.EVENTS.PROTOCOL_CHANGED, () => {
    const done = callback(100);
    if (done) {
      unsubscribe();
    }
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(init, "init", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/init.tsx");
  reactHotLoader.register(CPUModal, "CPUModal", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/init.tsx");
  reactHotLoader.register(_showCPURenderingModal, "_showCPURenderingModal", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/init.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/initCineService.ts":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone/src/initCineService.ts ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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

function initCineService(cineService) {
  const playClip = (element, playClipOptions) => {
    return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.utilities.cine.playClip(element, playClipOptions);
  };
  const stopClip = element => {
    return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.utilities.cine.stopClip(element);
  };
  cineService.setServiceImplementation({
    playClip,
    stopClip
  });
}
const _default = initCineService;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(initCineService, "initCineService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initCineService.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initCineService.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/initContextMenu.ts":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone/src/initContextMenu.ts ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "../../../extensions/cornerstone/src/state.ts");
/* harmony import */ var _utils_findNearbyToolData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/findNearbyToolData */ "../../../extensions/cornerstone/src/utils/findNearbyToolData.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const cs3DToolsEvents = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.Events;
const DEFAULT_CONTEXT_MENU_CLICKS = {
  button1: {
    commands: [{
      commandName: 'closeContextMenu'
    }]
  },
  button3: {
    commands: [{
      commandName: 'showCornerstoneContextMenu',
      commandOptions: {
        menuId: 'measurementsContextMenu'
      }
    }]
  }
};

/**
 * Generates a name, consisting of:
 *    * alt when the alt key is down
 *    * ctrl when the cctrl key is down
 *    * shift when the shift key is down
 *    * 'button' followed by the button number (1 left, 3 right etc)
 */
function getEventName(evt) {
  const button = evt.detail.event.which;
  const nameArr = [];
  if (evt.detail.event.altKey) nameArr.push('alt');
  if (evt.detail.event.ctrlKey) nameArr.push('ctrl');
  if (evt.detail.event.shiftKey) nameArr.push('shift');
  nameArr.push('button');
  nameArr.push(button);
  return nameArr.join('');
}
function initContextMenu(_ref) {
  let {
    cornerstoneViewportService,
    customizationService,
    commandsManager
  } = _ref;
  /*
   * Run the commands associated with the given button press,
   * defaults on button1 and button2
   */
  const cornerstoneViewportHandleEvent = (name, evt) => {
    const customizations = customizationService.get('cornerstoneViewportClickCommands') || DEFAULT_CONTEXT_MENU_CLICKS;
    const toRun = customizations[name];
    console.log('initContextMenu::cornerstoneViewportHandleEvent', name, toRun);
    const options = {
      nearbyToolData: (0,_utils_findNearbyToolData__WEBPACK_IMPORTED_MODULE_3__.findNearbyToolData)(commandsManager, evt),
      event: evt
    };
    commandsManager.run(toRun, options);
  };
  const cornerstoneViewportHandleClick = evt => {
    const name = getEventName(evt);
    cornerstoneViewportHandleEvent(name, evt);
  };
  function elementEnabledHandler(evt) {
    const {
      viewportId,
      element
    } = evt.detail;
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    if (!viewportInfo) return;
    const viewportIndex = viewportInfo.getViewportIndex();
    // TODO check update upstream
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setEnabledElement)(viewportIndex, element);
    element.addEventListener(cs3DToolsEvents.MOUSE_CLICK, cornerstoneViewportHandleClick);
  }
  function elementDisabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.removeEventListener(cs3DToolsEvents.MOUSE_CLICK, cornerstoneViewportHandleClick);
  }
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.EVENTS.ELEMENT_ENABLED, elementEnabledHandler.bind(null));
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.EVENTS.ELEMENT_DISABLED, elementDisabledHandler.bind(null));
}
const _default = initContextMenu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(cs3DToolsEvents, "cs3DToolsEvents", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initContextMenu.ts");
  reactHotLoader.register(DEFAULT_CONTEXT_MENU_CLICKS, "DEFAULT_CONTEXT_MENU_CLICKS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initContextMenu.ts");
  reactHotLoader.register(getEventName, "getEventName", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initContextMenu.ts");
  reactHotLoader.register(initContextMenu, "initContextMenu", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initContextMenu.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initContextMenu.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/initCornerstoneTools.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/cornerstone/src/initCornerstoneTools.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initCornerstoneTools),
/* harmony export */   toolNames: () => (/* binding */ toolNames)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _tools_CalibrationLineTool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/CalibrationLineTool */ "../../../extensions/cornerstone/src/tools/CalibrationLineTool.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function initCornerstoneTools() {
  let configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CrosshairsTool.isAnnotation = false;
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ReferenceLinesTool.isAnnotation = false;
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.init)(configuration);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.PanTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.WindowLevelTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.StackScrollMouseWheelTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.StackScrollTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ZoomTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ProbeTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.VolumeRotateMouseWheelTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.MIPJumpToClickTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.LengthTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.RectangleROITool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.EllipticalROITool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CircleROITool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.BidirectionalTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ArrowAnnotateTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.DragProbeTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.AngleTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CobbAngleTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.PlanarFreehandROITool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.MagnifyTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CrosshairsTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.SegmentationDisplayTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ReferenceLinesTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_tools_CalibrationLineTool__WEBPACK_IMPORTED_MODULE_1__["default"]);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.TrackballRotateTool);

  // Modify annotation tools to use dashed lines on SR
  const annotationStyle = {
    textBoxFontSize: '15px',
    lineWidth: '1.5'
  };
  const defaultStyles = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.config.style.getDefaultToolStyles();
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.config.style.setDefaultToolStyles({
    global: {
      ...defaultStyles.global,
      ...annotationStyle
    }
  });
}
const toolNames = {
  Pan: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.PanTool.toolName,
  ArrowAnnotate: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ArrowAnnotateTool.toolName,
  WindowLevel: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.WindowLevelTool.toolName,
  StackScroll: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.StackScrollTool.toolName,
  StackScrollMouseWheel: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.StackScrollMouseWheelTool.toolName,
  Zoom: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ZoomTool.toolName,
  VolumeRotateMouseWheel: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.VolumeRotateMouseWheelTool.toolName,
  MipJumpToClick: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.MIPJumpToClickTool.toolName,
  Length: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.LengthTool.toolName,
  DragProbe: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.DragProbeTool.toolName,
  Probe: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ProbeTool.toolName,
  RectangleROI: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.RectangleROITool.toolName,
  EllipticalROI: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.EllipticalROITool.toolName,
  CircleROI: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CircleROITool.toolName,
  Bidirectional: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.BidirectionalTool.toolName,
  Angle: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.AngleTool.toolName,
  CobbAngle: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CobbAngleTool.toolName,
  PlanarFreehandROI: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.PlanarFreehandROITool.toolName,
  Magnify: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.MagnifyTool.toolName,
  Crosshairs: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CrosshairsTool.toolName,
  SegmentationDisplay: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.SegmentationDisplayTool.toolName,
  ReferenceLines: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ReferenceLinesTool.toolName,
  CalibrationLine: _tools_CalibrationLineTool__WEBPACK_IMPORTED_MODULE_1__["default"].toolName,
  TrackballRotateTool: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.TrackballRotateTool.toolName
};

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(initCornerstoneTools, "initCornerstoneTools", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initCornerstoneTools.js");
  reactHotLoader.register(toolNames, "toolNames", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initCornerstoneTools.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/initDoubleClick.ts":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone/src/initDoubleClick.ts ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _utils_findNearbyToolData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/findNearbyToolData */ "../../../extensions/cornerstone/src/utils/findNearbyToolData.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const cs3DToolsEvents = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.Events;
const DEFAULT_DOUBLE_CLICK = {
  doubleClick: {
    commandName: 'toggleOneUp',
    commandOptions: {}
  }
};

/**
 * Generates a double click event name, consisting of:
 *    * alt when the alt key is down
 *    * ctrl when the cctrl key is down
 *    * shift when the shift key is down
 *    * 'doubleClick'
 */
function getDoubleClickEventName(evt) {
  const nameArr = [];
  if (evt.detail.event.altKey) nameArr.push('alt');
  if (evt.detail.event.ctrlKey) nameArr.push('ctrl');
  if (evt.detail.event.shiftKey) nameArr.push('shift');
  nameArr.push('doubleClick');
  return nameArr.join('');
}
function initDoubleClick(_ref) {
  let {
    customizationService,
    commandsManager
  } = _ref;
  const cornerstoneViewportHandleDoubleClick = evt => {
    // Do not allow double click on a tool.
    const nearbyToolData = (0,_utils_findNearbyToolData__WEBPACK_IMPORTED_MODULE_2__.findNearbyToolData)(commandsManager, evt);
    if (nearbyToolData) {
      return;
    }
    const eventName = getDoubleClickEventName(evt);

    // Allows for the customization of the double click on a viewport.
    const customizations = customizationService.get('cornerstoneViewportClickCommands') || DEFAULT_DOUBLE_CLICK;
    const toRun = customizations[eventName];
    if (!toRun) {
      return;
    }
    commandsManager.run(toRun);
  };
  function elementEnabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.addEventListener(cs3DToolsEvents.MOUSE_DOUBLE_CLICK, cornerstoneViewportHandleDoubleClick);
  }
  function elementDisabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.removeEventListener(cs3DToolsEvents.MOUSE_DOUBLE_CLICK, cornerstoneViewportHandleDoubleClick);
  }
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.EVENTS.ELEMENT_ENABLED, elementEnabledHandler.bind(null));
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.EVENTS.ELEMENT_DISABLED, elementDisabledHandler.bind(null));
}
const _default = initDoubleClick;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(cs3DToolsEvents, "cs3DToolsEvents", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initDoubleClick.ts");
  reactHotLoader.register(DEFAULT_DOUBLE_CLICK, "DEFAULT_DOUBLE_CLICK", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initDoubleClick.ts");
  reactHotLoader.register(getDoubleClickEventName, "getDoubleClickEventName", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initDoubleClick.ts");
  reactHotLoader.register(initDoubleClick, "initDoubleClick", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initDoubleClick.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initDoubleClick.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/initMeasurementService.js":
/*!*********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/initMeasurementService.js ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connectMeasurementServiceToTools: () => (/* binding */ connectMeasurementServiceToTools),
/* harmony export */   connectToolsToMeasurementService: () => (/* binding */ connectToolsToMeasurementService),
/* harmony export */   initMeasurementService: () => (/* binding */ initMeasurementService)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initCornerstoneTools */ "../../../extensions/cornerstone/src/initCornerstoneTools.js");
/* harmony import */ var _tools_CalibrationLineTool__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools/CalibrationLineTool */ "../../../extensions/cornerstone/src/tools/CalibrationLineTool.ts");
/* harmony import */ var _utils_measurementServiceMappings_measurementServiceMappingsFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/measurementServiceMappings/measurementServiceMappingsFactory */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.ts");
/* harmony import */ var _utils_measurementServiceMappings_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/measurementServiceMappings/utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const {
  removeAnnotation
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state;
const csToolsEvents = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.Events;
const CORNERSTONE_3D_TOOLS_SOURCE_NAME = 'Cornerstone3DTools';
const CORNERSTONE_3D_TOOLS_SOURCE_VERSION = '0.1';
const initMeasurementService = (measurementService, displaySetService, cornerstoneViewportService) => {
  /* Initialization */
  const {
    Length,
    Bidirectional,
    EllipticalROI,
    CircleROI,
    ArrowAnnotate,
    Angle,
    CobbAngle,
    RectangleROI,
    PlanarFreehandROI
  } = (0,_utils_measurementServiceMappings_measurementServiceMappingsFactory__WEBPACK_IMPORTED_MODULE_5__["default"])(measurementService, displaySetService, cornerstoneViewportService);
  const csTools3DVer1MeasurementSource = measurementService.createSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);

  /* Mappings */
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Length', Length.matchingCriteria, Length.toAnnotation, Length.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Bidirectional', Bidirectional.matchingCriteria, Bidirectional.toAnnotation, Bidirectional.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'EllipticalROI', EllipticalROI.matchingCriteria, EllipticalROI.toAnnotation, EllipticalROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CircleROI', CircleROI.matchingCriteria, CircleROI.toAnnotation, CircleROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'ArrowAnnotate', ArrowAnnotate.matchingCriteria, ArrowAnnotate.toAnnotation, ArrowAnnotate.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CobbAngle', CobbAngle.matchingCriteria, CobbAngle.toAnnotation, CobbAngle.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Angle', Angle.matchingCriteria, Angle.toAnnotation, Angle.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'RectangleROI', RectangleROI.matchingCriteria, RectangleROI.toAnnotation, RectangleROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'PlanarFreehandROI', PlanarFreehandROI.matchingCriteria, PlanarFreehandROI.toAnnotation, PlanarFreehandROI.toMeasurement);

  // On the UI side, the Calibration Line tool will work almost the same as the
  // Length tool
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CalibrationLine', Length.matchingCriteria, Length.toAnnotation, Length.toMeasurement);
  return csTools3DVer1MeasurementSource;
};
const connectToolsToMeasurementService = servicesManager => {
  const {
    measurementService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  const csTools3DVer1MeasurementSource = initMeasurementService(measurementService, displaySetService, cornerstoneViewportService);
  connectMeasurementServiceToTools(measurementService, cornerstoneViewportService, csTools3DVer1MeasurementSource);
  const {
    annotationToMeasurement,
    remove
  } = csTools3DVer1MeasurementSource;

  //
  function addMeasurement(csToolsEvent) {
    try {
      const annotationAddedEventDetail = csToolsEvent.detail;
      const {
        annotation: {
          metadata,
          annotationUID
        }
      } = annotationAddedEventDetail;
      const {
        toolName
      } = metadata;
      if (csToolsEvent.type === completedEvt && toolName === _initCornerstoneTools__WEBPACK_IMPORTED_MODULE_3__.toolNames.CalibrationLine) {
        // show modal to input the measurement (mm)
        (0,_tools_CalibrationLineTool__WEBPACK_IMPORTED_MODULE_4__.onCompletedCalibrationLine)(servicesManager, csToolsEvent).then(() => {
          console.log('calibration applied');
        }, () => true).finally(() => {
          // we don't need the calibration line lingering around, remove the
          // annotation from the display
          removeAnnotation(annotationUID);
          removeMeasurement(csToolsEvent);
          // this will ensure redrawing of annotations
          cornerstoneViewportService.resize();
        });
      } else {
        // To force the measurementUID be the same as the annotationUID
        // Todo: this should be changed when a measurement can include multiple annotations
        // in the future
        annotationAddedEventDetail.uid = annotationUID;
        annotationToMeasurement(toolName, annotationAddedEventDetail);
      }
    } catch (error) {
      console.warn('Failed to update measurement:', error);
    }
  }
  function updateMeasurement(csToolsEvent) {
    try {
      const annotationModifiedEventDetail = csToolsEvent.detail;
      const {
        annotation: {
          metadata,
          annotationUID
        }
      } = annotationModifiedEventDetail;

      // If the measurement hasn't been added, don't modify it
      const measurement = measurementService.getMeasurement(annotationUID);
      if (!measurement) {
        return;
      }
      const {
        toolName
      } = metadata;
      annotationModifiedEventDetail.uid = annotationUID;
      // Passing true to indicate this is an update and NOT a annotation (start) completion.
      annotationToMeasurement(toolName, annotationModifiedEventDetail, true);
    } catch (error) {
      console.warn('Failed to update measurement:', error);
    }
  }
  function selectMeasurement(csToolsEvent) {
    try {
      const annotationSelectionEventDetail = csToolsEvent.detail;
      const {
        added: addedSelectedAnnotationUIDs,
        removed: removedSelectedAnnotationUIDs
      } = annotationSelectionEventDetail;
      if (removedSelectedAnnotationUIDs) {
        removedSelectedAnnotationUIDs.forEach(annotationUID => measurementService.setMeasurementSelected(annotationUID, false));
      }
      if (addedSelectedAnnotationUIDs) {
        addedSelectedAnnotationUIDs.forEach(annotationUID => measurementService.setMeasurementSelected(annotationUID, true));
      }
    } catch (error) {
      console.warn('Failed to select and unselect measurements:', error);
    }
  }

  /**
   * When csTools fires a removed event, remove the same measurement
   * from the measurement service
   *
   * @param {*} csToolsEvent
   */
  function removeMeasurement(csToolsEvent) {
    try {
      try {
        const annotationRemovedEventDetail = csToolsEvent.detail;
        const {
          annotation: {
            annotationUID
          }
        } = annotationRemovedEventDetail;
        const measurement = measurementService.getMeasurement(annotationUID);
        if (measurement) {
          console.log('~~ removeEvt', csToolsEvent);
          remove(annotationUID, annotationRemovedEventDetail);
        }
      } catch (error) {
        console.warn('Failed to update measurement:', error);
      }
    } catch (error) {
      console.warn('Failed to remove measurement:', error);
    }
  }

  // on display sets added, check if there are any measurements in measurement service that need to be
  // put into cornerstone tools
  const addedEvt = csToolsEvents.ANNOTATION_ADDED;
  const completedEvt = csToolsEvents.ANNOTATION_COMPLETED;
  const updatedEvt = csToolsEvents.ANNOTATION_MODIFIED;
  const removedEvt = csToolsEvents.ANNOTATION_REMOVED;
  const selectionEvt = csToolsEvents.ANNOTATION_SELECTION_CHANGE;
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(addedEvt, addMeasurement);
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(completedEvt, addMeasurement);
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(updatedEvt, updateMeasurement);
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(removedEvt, removeMeasurement);
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget.addEventListener(selectionEvt, selectMeasurement);
  return csTools3DVer1MeasurementSource;
};
const connectMeasurementServiceToTools = (measurementService, cornerstoneViewportService, measurementSource) => {
  const {
    MEASUREMENT_REMOVED,
    MEASUREMENTS_CLEARED,
    MEASUREMENT_UPDATED,
    RAW_MEASUREMENT_ADDED
  } = measurementService.EVENTS;
  const csTools3DVer1MeasurementSource = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  measurementService.subscribe(MEASUREMENTS_CLEARED, _ref => {
    let {
      measurements
    } = _ref;
    if (!Object.keys(measurements).length) {
      return;
    }
    for (const measurement of Object.values(measurements)) {
      const {
        uid,
        source
      } = measurement;
      if (source.name !== CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
        continue;
      }
      removeAnnotation(uid);
    }
  });
  measurementService.subscribe(MEASUREMENT_UPDATED, _ref2 => {
    let {
      source,
      measurement,
      notYetUpdatedAtSource
    } = _ref2;
    if (source.name !== CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
      return;
    }
    if (notYetUpdatedAtSource === false) {
      // This event was fired by cornerstone telling the measurement service to sync.
      // Already in sync.
      return;
    }
    const {
      uid,
      label
    } = measurement;
    const sourceAnnotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotation(uid);
    const {
      data,
      metadata
    } = sourceAnnotation;
    if (!data) {
      return;
    }
    if (data.label !== label) {
      data.label = label;
    }
    if (metadata.toolName === 'ArrowAnnotate') {
      data.text = label;
    }

    // Todo: trigger render for annotation
  });

  measurementService.subscribe(RAW_MEASUREMENT_ADDED, _ref3 => {
    let {
      source,
      measurement,
      data,
      dataSource
    } = _ref3;
    if (source.name !== CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
      return;
    }
    const {
      referenceSeriesUID,
      referenceStudyUID,
      SOPInstanceUID
    } = measurement;
    const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.DicomMetadataStore.getInstance(referenceStudyUID, referenceSeriesUID, SOPInstanceUID);
    let imageId;
    let frameNumber = 1;
    if (measurement?.metadata?.referencedImageId) {
      imageId = measurement.metadata.referencedImageId;
      frameNumber = (0,_utils_measurementServiceMappings_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_6__["default"])(measurement.metadata.referencedImageId).frameNumber;
    } else {
      imageId = dataSource.getImageIdsForInstance({
        instance
      });
    }
    const annotationManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.annotation.state.getAnnotationManager();
    annotationManager.addAnnotation({
      annotationUID: measurement.uid,
      highlighted: false,
      isLocked: false,
      invalidated: false,
      metadata: {
        toolName: measurement.toolName,
        FrameOfReferenceUID: measurement.FrameOfReferenceUID,
        referencedImageId: imageId
      },
      data: {
        text: data.annotation.data.text,
        handles: {
          ...data.annotation.data.handles
        },
        cachedStats: {
          ...data.annotation.data.cachedStats
        },
        label: data.annotation.data.label,
        frameNumber: frameNumber
      }
    });
  });
  measurementService.subscribe(MEASUREMENT_REMOVED, _ref4 => {
    let {
      source,
      measurement: removedMeasurementId
    } = _ref4;
    if (source?.name && source.name !== CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
      return;
    }
    removeAnnotation(removedMeasurementId);
    const renderingEngine = cornerstoneViewportService.getRenderingEngine();
    // Note: We could do a better job by triggering the render on the
    // viewport itself, but the removeAnnotation does not include that info...
    renderingEngine.render();
  });
};

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(removeAnnotation, "removeAnnotation", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
  reactHotLoader.register(csToolsEvents, "csToolsEvents", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
  reactHotLoader.register(CORNERSTONE_3D_TOOLS_SOURCE_NAME, "CORNERSTONE_3D_TOOLS_SOURCE_NAME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
  reactHotLoader.register(CORNERSTONE_3D_TOOLS_SOURCE_VERSION, "CORNERSTONE_3D_TOOLS_SOURCE_VERSION", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
  reactHotLoader.register(initMeasurementService, "initMeasurementService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
  reactHotLoader.register(connectToolsToMeasurementService, "connectToolsToMeasurementService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
  reactHotLoader.register(connectMeasurementServiceToTools, "connectMeasurementServiceToTools", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initMeasurementService.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/initWADOImageLoader.js":
/*!******************************************************************!*\
  !*** ../../../extensions/cornerstone/src/initWADOImageLoader.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initWADOImageLoader),
/* harmony export */   destroy: () => (/* binding */ destroy)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_streaming_image_volume_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/streaming-image-volume-loader */ "../../../node_modules/@cornerstonejs/streaming-image-volume-loader/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/dicom-image-loader */ "../../../node_modules/@cornerstonejs/dicom-image-loader/dist/dynamic-import/cornerstoneDICOMImageLoader.min.js");
/* harmony import */ var _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dicom_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dicom-parser */ "../../../node_modules/dicom-parser/dist/dicomParser.min.js");
/* harmony import */ var dicom_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dicom_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const {
  registerVolumeLoader
} = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.volumeLoader;
let initialized = false;
function initWebWorkers(appConfig) {
  const config = {
    maxWebWorkers: Math.min(Math.max(navigator.hardwareConcurrency - 1, 1), appConfig.maxNumberOfWebWorkers),
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false
      }
    }
  };
  if (!initialized) {
    _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2___default().webWorkerManager.initialize(config);
    initialized = true;
  }
}
function initWADOImageLoader(userAuthenticationService, appConfig) {
  (_cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2___default().external).cornerstone = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__;
  (_cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2___default().external).dicomParser = (dicom_parser__WEBPACK_IMPORTED_MODULE_3___default());
  registerVolumeLoader('cornerstoneStreamingImageVolume', _cornerstonejs_streaming_image_volume_loader__WEBPACK_IMPORTED_MODULE_1__.cornerstoneStreamingImageVolumeLoader);
  _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2___default().configure({
    decodeConfig: {
      // !! IMPORTANT !!
      // We should set this flag to false, since, by default @cornerstonejs/dicom-image-loader
      // will convert everything to integers (to be able to work with cornerstone-2d).
      // Until the default is set to true (which is the case for cornerstone3D),
      // we should set this flag to false.
      convertFloatPixelDataToInt: false
    },
    beforeSend: function (xhr) {
      const headers = userAuthenticationService.getAuthorizationHeader();

      // Request:
      // JPEG-LS Lossless (1.2.840.10008.1.2.4.80) if available, otherwise accept
      // whatever transfer-syntax the origin server provides.
      // For now we use image/jls and image/x-jls because some servers still use the old type
      // http://dicom.nema.org/medical/dicom/current/output/html/part18.html
      const xhrRequestHeaders = {
        Accept: appConfig.omitQuotationForMultipartRequest ? 'multipart/related; type=application/octet-stream' : 'multipart/related; type="application/octet-stream"'
        // 'multipart/related; type="image/x-jls", multipart/related; type="image/jls"; transfer-syntax="1.2.840.10008.1.2.4.80", multipart/related; type="image/x-jls", multipart/related; type="application/octet-stream"; transfer-syntax=*',
      };

      if (headers) {
        Object.assign(xhrRequestHeaders, headers);
      }
      return xhrRequestHeaders;
    },
    errorInterceptor: error => {
      _ohif_core__WEBPACK_IMPORTED_MODULE_4__.errorHandler.getHTTPErrorHandler(error);
    }
  });
  initWebWorkers(appConfig);
}
function destroy() {
  // Note: we don't want to call .terminate on the webWorkerManager since
  // that resets the config
  const webWorkers = _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_2__.webWorkerManager.webWorkers;
  for (let i = 0; i < webWorkers.length; i++) {
    webWorkers[i].worker.terminate();
  }
  webWorkers.length = 0;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(registerVolumeLoader, "registerVolumeLoader", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initWADOImageLoader.js");
  reactHotLoader.register(initialized, "initialized", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initWADOImageLoader.js");
  reactHotLoader.register(initWebWorkers, "initWebWorkers", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initWADOImageLoader.js");
  reactHotLoader.register(initWADOImageLoader, "initWADOImageLoader", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initWADOImageLoader.js");
  reactHotLoader.register(destroy, "destroy", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/initWADOImageLoader.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts":
/*!*******************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _utils_getCornerstoneViewportType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/getCornerstoneViewportType */ "../../../extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
class CornerstoneCacheService {
  constructor(servicesManager) {
    this.stackImageIds = new Map();
    this.volumeImageIds = new Map();
    this.servicesManager = void 0;
    this.servicesManager = servicesManager;
  }
  getCacheSize() {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getCacheSize();
  }
  getCacheFreeSpace() {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getBytesAvailable();
  }
  async createViewportData(displaySets, viewportOptions, dataSource, initialImageIndex) {
    let viewportType = viewportOptions.viewportType;

    // Todo: Since Cornerstone 3D currently doesn't support segmentation
    // on stack viewport, we should check if whether the the displaySets
    // that are about to be displayed are referenced in a segmentation
    // as a reference volume, if so, we should hang a volume viewport
    // instead of a stack viewport
    if (this._shouldRenderSegmentation(displaySets)) {
      viewportType = 'volume';

      // update viewportOptions to reflect the new viewport type
      viewportOptions.viewportType = viewportType;
    }
    const cs3DViewportType = (0,_utils_getCornerstoneViewportType__WEBPACK_IMPORTED_MODULE_1__["default"])(viewportType);
    let viewportData;
    if (cs3DViewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.STACK) {
      viewportData = await this._getStackViewportData(dataSource, displaySets, initialImageIndex, cs3DViewportType);
    }
    if (cs3DViewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.ORTHOGRAPHIC || cs3DViewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.VOLUME_3D) {
      viewportData = await this._getVolumeViewportData(dataSource, displaySets, cs3DViewportType);
    }
    viewportData.viewportType = cs3DViewportType;
    return viewportData;
  }
  async invalidateViewportData(viewportData, invalidatedDisplaySetInstanceUID, dataSource, displaySetService) {
    if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.STACK) {
      return this._getCornerstoneStackImageIds(displaySetService.getDisplaySetByUID(invalidatedDisplaySetInstanceUID), dataSource);
    }

    // Todo: grab the volume and get the id from the viewport itself
    const volumeId = `${VOLUME_LOADER_SCHEME}:${invalidatedDisplaySetInstanceUID}`;
    const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
    if (volume) {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.removeVolumeLoadObject(volumeId);
      this.volumeImageIds.delete(volumeId);
    }
    const displaySets = viewportData.data.map(_ref => {
      let {
        displaySetInstanceUID
      } = _ref;
      return displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    });
    const newViewportData = await this._getVolumeViewportData(dataSource, displaySets, viewportData.viewportType);
    return newViewportData;
  }
  _getStackViewportData(dataSource, displaySets, initialImageIndex, viewportType) {
    // For Stack Viewport we don't have fusion currently
    const displaySet = displaySets[0];
    let stackImageIds = this.stackImageIds.get(displaySet.displaySetInstanceUID);
    if (!stackImageIds) {
      stackImageIds = this._getCornerstoneStackImageIds(displaySet, dataSource);
      this.stackImageIds.set(displaySet.displaySetInstanceUID, stackImageIds);
    }
    const {
      displaySetInstanceUID,
      StudyInstanceUID,
      isCompositeStack
    } = displaySet;
    const StackViewportData = {
      viewportType,
      data: {
        StudyInstanceUID,
        displaySetInstanceUID,
        isCompositeStack,
        imageIds: stackImageIds
      }
    };
    if (typeof initialImageIndex === 'number') {
      StackViewportData.data.initialImageIndex = initialImageIndex;
    }
    return StackViewportData;
  }
  async _getVolumeViewportData(dataSource, displaySets, viewportType) {
    // Todo: Check the cache for multiple scenarios to see if we need to
    // decache the volume data from other viewports or not

    const volumeData = [];
    for (const displaySet of displaySets) {
      // Don't create volumes for the displaySets that have custom load
      // function (e.g., SEG, RT, since they rely on the reference volumes
      // and they take care of their own loading after they are created in their
      // getSOPClassHandler method

      if (displaySet.load && displaySet.load instanceof Function) {
        const {
          userAuthenticationService
        } = this.servicesManager.services;
        const headers = userAuthenticationService.getAuthorizationHeader();
        await displaySet.load({
          headers
        });
        volumeData.push({
          studyInstanceUID: displaySet.StudyInstanceUID,
          displaySetInstanceUID: displaySet.displaySetInstanceUID
        });

        // Todo: do some cache check and empty the cache if needed
        continue;
      }
      const volumeLoaderSchema = displaySet.volumeLoaderSchema ?? VOLUME_LOADER_SCHEME;
      const volumeId = `${volumeLoaderSchema}:${displaySet.displaySetInstanceUID}`;
      let volumeImageIds = this.volumeImageIds.get(displaySet.displaySetInstanceUID);
      let volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
      if (!volumeImageIds || !volume) {
        volumeImageIds = this._getCornerstoneVolumeImageIds(displaySet, dataSource);
        volume = await _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.volumeLoader.createAndCacheVolume(volumeId, {
          imageIds: volumeImageIds
        });
        this.volumeImageIds.set(displaySet.displaySetInstanceUID, volumeImageIds);
      }
      volumeData.push({
        StudyInstanceUID: displaySet.StudyInstanceUID,
        displaySetInstanceUID: displaySet.displaySetInstanceUID,
        volume,
        volumeId,
        imageIds: volumeImageIds
      });
    }
    return {
      viewportType,
      data: volumeData
    };
  }
  _shouldRenderSegmentation(displaySets) {
    const {
      segmentationService
    } = this.servicesManager.services;
    const viewportDisplaySetInstanceUIDs = displaySets.map(_ref2 => {
      let {
        displaySetInstanceUID
      } = _ref2;
      return displaySetInstanceUID;
    });

    // check inside segmentations if any of them are referencing the displaySets
    // that are about to be displayed
    const segmentations = segmentationService.getSegmentations();
    for (const segmentation of segmentations) {
      const segDisplaySetInstanceUID = segmentation.displaySetInstanceUID;
      const shouldDisplaySeg = segmentationService.shouldRenderSegmentation(viewportDisplaySetInstanceUIDs, segDisplaySetInstanceUID);
      if (shouldDisplaySeg) {
        return true;
      }
    }
  }
  _getCornerstoneStackImageIds(displaySet, dataSource) {
    return dataSource.getImageIdsForDisplaySet(displaySet);
  }
  _getCornerstoneVolumeImageIds(displaySet, dataSource) {
    const stackImageIds = this._getCornerstoneStackImageIds(displaySet, dataSource);
    return stackImageIds;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
CornerstoneCacheService.REGISTRATION = {
  name: 'cornerstoneCacheService',
  altName: 'CornerstoneCacheService',
  create: _ref3 => {
    let {
      servicesManager
    } = _ref3;
    return new CornerstoneCacheService(servicesManager);
  }
};
const _default = CornerstoneCacheService;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(VOLUME_LOADER_SCHEME, "VOLUME_LOADER_SCHEME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts");
  reactHotLoader.register(CornerstoneCacheService, "CornerstoneCacheService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/CornerstoneCacheService/index.js":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/CornerstoneCacheService/index.js ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CornerstoneCacheService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CornerstoneCacheService */ "../../../extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = _CornerstoneCacheService__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/CornerstoneCacheService/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/SegmentationService/RTSTRUCT/mapROIContoursToRTStructData.ts":
/*!*****************************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/SegmentationService/RTSTRUCT/mapROIContoursToRTStructData.ts ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapROIContoursToRTStructData: () => (/* binding */ mapROIContoursToRTStructData)
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
 * Maps a DICOM RT Struct ROI Contour to a RTStruct data that can be used
 * in Segmentation Service
 *
 * @param structureSet - A DICOM RT Struct ROI Contour
 * @param rtDisplaySetUID - A CornerstoneTools DisplaySet UID
 * @returns An array of object that includes data, id, segmentIndex, color
 * and geometry Id
 */
function mapROIContoursToRTStructData(structureSet, rtDisplaySetUID) {
  return structureSet.ROIContours.map(_ref => {
    let {
      contourPoints,
      ROINumber,
      ROIName,
      colorArray
    } = _ref;
    const data = contourPoints.map(_ref2 => {
      let {
        points,
        ...rest
      } = _ref2;
      const newPoints = points.map(_ref3 => {
        let {
          x,
          y,
          z
        } = _ref3;
        return [x, y, z];
      });
      return {
        ...rest,
        points: newPoints
      };
    });
    const id = ROIName || ROINumber;
    return {
      data,
      id,
      segmentIndex: ROINumber,
      color: colorArray,
      geometryId: `${rtDisplaySetUID}:${id}:segmentIndex-${ROINumber}`
    };
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(mapROIContoursToRTStructData, "mapROIContoursToRTStructData", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/RTSTRUCT/mapROIContoursToRTStructData.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTS: () => (/* binding */ EVENTS),
/* harmony export */   VALUE_TYPES: () => (/* binding */ VALUE_TYPES),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.clonedeep */ "../../../node_modules/lodash.clonedeep/index.js");
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash.isequal */ "../../../node_modules/lodash.isequal/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_transitions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/transitions */ "../../../extensions/cornerstone/src/utils/transitions.ts");
/* harmony import */ var _RTSTRUCT_mapROIContoursToRTStructData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RTSTRUCT/mapROIContoursToRTStructData */ "../../../extensions/cornerstone/src/services/SegmentationService/RTSTRUCT/mapROIContoursToRTStructData.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const {
  COLOR_LUT
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS;
const LABELMAP = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.SegmentationRepresentations.Labelmap;
const CONTOUR = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.SegmentationRepresentations.Contour;
const EVENTS = {
  // fired when the segmentation is updated (e.g. when a segment is added, removed, or modified, locked, visibility changed etc.)
  SEGMENTATION_UPDATED: 'event::segmentation_updated',
  // fired when the segmentation data (e.g., labelmap pixels) is modified
  SEGMENTATION_DATA_MODIFIED: 'event::segmentation_data_modified',
  // fired when the segmentation is added to the cornerstone
  SEGMENTATION_ADDED: 'event::segmentation_added',
  // fired when the segmentation is removed
  SEGMENTATION_REMOVED: 'event::segmentation_removed',
  // fired when the configuration for the segmentation is changed (e.g., brush size, render fill, outline thickness, etc.)
  SEGMENTATION_CONFIGURATION_CHANGED: 'event::segmentation_configuration_changed',
  // fired when the active segment is loaded in SEG or RTSTRUCT
  SEGMENT_LOADING_COMPLETE: 'event::segment_loading_complete',
  // for all segments
  SEGMENTATION_LOADING_COMPLETE: 'event::segmentation_loading_complete'
};
const VALUE_TYPES = {};
const SEGMENT_CONSTANT = {
  opacity: 255,
  isVisible: true,
  isLocked: false
};
const VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
class SegmentationService extends _ohif_core__WEBPACK_IMPORTED_MODULE_1__.PubSubService {
  constructor(_ref) {
    var _this;
    let {
      servicesManager
    } = _ref;
    super(EVENTS);
    _this = this;
    this.segmentations = void 0;
    this.servicesManager = void 0;
    this.highlightIntervalId = null;
    this.EVENTS = EVENTS;
    this.destroy = () => {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.SEGMENTATION_MODIFIED, this._onSegmentationModifiedFromSource);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.SEGMENTATION_DATA_MODIFIED, this._onSegmentationDataModified);

      // remove the segmentations from the cornerstone
      Object.keys(this.segmentations).forEach(segmentationId => {
        this._removeSegmentationFromCornerstone(segmentationId);
      });
      this.segmentations = {};
      this.listeners = {};
    };
    this.setSegmentRGBA = (segmentationId, segmentIndex, rgbaColor, toolGroupId) => {
      const segmentation = this.getSegmentation(segmentationId);
      if (segmentation === undefined) {
        throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
      }
      const suppressEvents = true;
      this._setSegmentOpacity(segmentationId, segmentIndex, rgbaColor[3], toolGroupId, suppressEvents);
      this._setSegmentColor(segmentationId, segmentIndex, [rgbaColor[0], rgbaColor[1], rgbaColor[2]], toolGroupId, suppressEvents);
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    };
    this.createSegmentationForDisplaySet = async (displaySetInstanceUID, options) => {
      const {
        displaySetService
      } = this.servicesManager.services;
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

      // Todo: we currently only support labelmap for segmentation for a displaySet
      const representationType = LABELMAP;
      const volumeId = this._getVolumeIdForDisplaySet(displaySet);
      const segmentationId = options?.segmentationId ?? `${_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.uuidv4()}`;

      // Force use of a Uint8Array SharedArrayBuffer for the segmentation to save space and so
      // it is easily compressible in worker thread.
      await _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.volumeLoader.createAndCacheDerivedVolume(volumeId, {
        volumeId: segmentationId,
        targetBuffer: {
          type: 'Uint8Array',
          sharedArrayBuffer: true
        }
      });
      const defaultScheme = this._getDefaultSegmentationScheme();
      const segmentation = {
        ...defaultScheme,
        id: segmentationId,
        displaySetInstanceUID,
        label: options?.label,
        // We should set it as active by default, as it created for display
        isActive: true,
        type: representationType,
        representationData: {
          LABELMAP: {
            volumeId: segmentationId,
            referencedVolumeId: volumeId // Todo: this is so ugly
          }
        }
      };

      this.addOrUpdateSegmentation(segmentation);
      return segmentationId;
    };
    /**
     * Toggles the visibility of a segmentation in the state, and broadcasts the event.
     * Note: this method does not update the segmentation state in the source. It only
     * updates the state, and there should be separate listeners for that.
     * @param ids segmentation ids
     */
    this.toggleSegmentationVisibility = segmentationId => {
      this._toggleSegmentationVisibility(segmentationId, false);
    };
    this.addSegmentationRepresentationToToolGroup = async function (toolGroupId, segmentationId) {
      let hydrateSegmentation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      let representationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.SegmentationRepresentations.Labelmap;
      const segmentation = _this.getSegmentation(segmentationId);
      if (!segmentation) {
        throw new Error(`Segmentation with segmentationId ${segmentationId} not found.`);
      }
      if (hydrateSegmentation) {
        // hydrate the segmentation if it's not hydrated yet
        segmentation.hydrated = true;
      }
      const {
        colorLUTIndex
      } = segmentation;

      // Based on the segmentationId, set the colorLUTIndex.
      const segmentationRepresentationUIDs = await _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.addSegmentationRepresentations(toolGroupId, [{
        segmentationId,
        type: representationType
      }]);

      // set the latest segmentation representation as active one
      _this._setActiveSegmentationForToolGroup(segmentationId, toolGroupId, segmentationRepresentationUIDs[0]);
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.setColorLUT(toolGroupId, segmentationRepresentationUIDs[0], colorLUTIndex);

      // add the segmentation segments properly
      for (const segment of segmentation.segments) {
        if (segment === null || segment === undefined) {
          continue;
        }
        const {
          segmentIndex,
          color,
          isLocked,
          isVisible: visibility,
          opacity
        } = segment;
        const suppressEvents = true;
        if (color !== undefined) {
          _this._setSegmentColor(segmentationId, segmentIndex, color, toolGroupId, suppressEvents);
        }
        if (opacity !== undefined) {
          _this._setSegmentOpacity(segmentationId, segmentIndex, opacity, toolGroupId, suppressEvents);
        }
        if (visibility !== undefined) {
          _this._setSegmentVisibility(segmentationId, segmentIndex, visibility, toolGroupId, suppressEvents);
        }
        if (isLocked !== undefined) {
          _this._setSegmentLocked(segmentationId, segmentIndex, isLocked, suppressEvents);
        }
      }
    };
    this.setSegmentRGBAColorForSegmentation = (segmentationId, segmentIndex, rgbaColor, toolGroupId) => {
      const segmentation = this.getSegmentation(segmentationId);
      if (segmentation === undefined) {
        throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
      }
      this._setSegmentOpacity(segmentationId, segmentIndex, rgbaColor[3], toolGroupId,
      // toolGroupId
      true);
      this._setSegmentColor(segmentationId, segmentIndex, [rgbaColor[0], rgbaColor[1], rgbaColor[2]], toolGroupId,
      // toolGroupId
      true);
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    };
    this.getToolGroupIdsWithSegmentation = segmentationId => {
      const toolGroupIds = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getToolGroupIdsWithSegmentation(segmentationId);
      return toolGroupIds;
    };
    this.hydrateSegmentation = function (segmentationId) {
      let suppressEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const segmentation = _this.getSegmentation(segmentationId);
      if (!segmentation) {
        throw new Error(`Segmentation with segmentationId ${segmentationId} not found.`);
      }
      segmentation.hydrated = true;
      if (!suppressEvents) {
        _this._broadcastEvent(_this.EVENTS.SEGMENTATION_UPDATED, {
          segmentation
        });
      }
    };
    this.getConfiguration = toolGroupId => {
      toolGroupId = toolGroupId ?? this._getFirstToolGroupId();
      const brushSize = 1;
      // const brushSize = cstUtils.segmentation.getBrushSizeForToolGroup(
      //   toolGroupId
      // );

      const brushThresholdGate = 1;
      // const brushThresholdGate = cstUtils.segmentation.getBrushThresholdForToolGroup(
      //   toolGroupId
      // );

      const segmentationRepresentations = this.getSegmentationRepresentationsForToolGroup(toolGroupId);
      const typeToUse = segmentationRepresentations?.[0]?.type || LABELMAP;
      const config = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.getGlobalConfig();
      const {
        renderInactiveSegmentations
      } = config;
      const representation = config.representations[typeToUse];
      const {
        renderOutline,
        outlineWidthActive,
        renderFill,
        fillAlpha,
        fillAlphaInactive,
        outlineOpacity,
        outlineOpacityInactive
      } = representation;
      return {
        brushSize,
        brushThresholdGate,
        fillAlpha,
        fillAlphaInactive,
        outlineWidthActive,
        renderFill,
        renderInactiveSegmentations,
        renderOutline,
        outlineOpacity,
        outlineOpacityInactive
      };
    };
    this.setConfiguration = configuration => {
      const {
        brushSize,
        brushThresholdGate,
        fillAlpha,
        fillAlphaInactive,
        outlineWidthActive,
        outlineOpacity,
        renderFill,
        renderInactiveSegmentations,
        renderOutline
      } = configuration;
      const setConfigValueIfDefined = function (key, value) {
        let transformFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        if (value !== undefined) {
          const transformedValue = transformFn ? transformFn(value) : value;
          _this._setSegmentationConfig(key, transformedValue);
        }
      };
      setConfigValueIfDefined('renderOutline', renderOutline);
      setConfigValueIfDefined('outlineWidthActive', outlineWidthActive);
      setConfigValueIfDefined('outlineOpacity', outlineOpacity, v => v / 100);
      setConfigValueIfDefined('fillAlpha', fillAlpha, v => v / 100);
      setConfigValueIfDefined('renderFill', renderFill);
      setConfigValueIfDefined('fillAlphaInactive', fillAlphaInactive, v => v / 100);
      setConfigValueIfDefined('outlineOpacityInactive', fillAlphaInactive, v => Math.max(0.75, v / 100));
      if (renderInactiveSegmentations !== undefined) {
        const config = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.getGlobalConfig();
        config.renderInactiveSegmentations = renderInactiveSegmentations;
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setGlobalConfig(config);
      }

      // if (brushSize !== undefined) {
      //   const { toolGroupService } = this.servicesManager.services;

      //   const toolGroupIds = toolGroupService.getToolGroupIds();

      //   toolGroupIds.forEach(toolGroupId => {
      //     cstUtils.segmentation.setBrushSizeForToolGroup(toolGroupId, brushSize);
      //   });
      // }

      // if (brushThresholdGate !== undefined) {
      //   const { toolGroupService } = this.servicesManager.services;

      //   const toolGroupIds = toolGroupService.getFirstToolGroupIds();

      //   toolGroupIds.forEach(toolGroupId => {
      //     cstUtils.segmentation.setBrushThresholdForToolGroup(
      //       toolGroupId,
      //       brushThresholdGate
      //     );
      //   });
      // }

      this._broadcastEvent(this.EVENTS.SEGMENTATION_CONFIGURATION_CHANGED, this.getConfiguration());
    };
    this.getLabelmapVolume = segmentationId => {
      return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(segmentationId);
    };
    this.getSegmentationRepresentationsForToolGroup = toolGroupId => {
      return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getSegmentationRepresentations(toolGroupId);
    };
    this._toggleSegmentationVisibility = function (segmentationId) {
      let suppressEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const segmentation = _this.segmentations[segmentationId];
      if (!segmentation) {
        throw new Error(`Segmentation with segmentationId ${segmentationId} not found.`);
      }
      segmentation.isVisible = !segmentation.isVisible;
      _this._updateCornerstoneSegmentationVisibility(segmentationId);
      if (suppressEvents === false) {
        _this._broadcastEvent(_this.EVENTS.SEGMENTATION_UPDATED, {
          segmentation
        });
      }
    };
    this._setSegmentColor = function (segmentationId, segmentIndex, color, toolGroupId) {
      let suppressEvents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      const segmentation = _this.getSegmentation(segmentationId);
      if (segmentation === undefined) {
        throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
      }
      const segmentInfo = _this._getSegmentInfo(segmentation, segmentIndex);
      if (segmentInfo === undefined) {
        throw new Error(`Segment ${segmentIndex} not yet added to segmentation: ${segmentationId}`);
      }
      toolGroupId = toolGroupId ?? _this._getFirstToolGroupId();
      const segmentationRepresentation = _this._getSegmentationRepresentation(segmentationId, toolGroupId);
      if (!segmentationRepresentation) {
        throw new Error('Must add representation to toolgroup before setting segments');
      }
      const {
        segmentationRepresentationUID
      } = segmentationRepresentation;
      const rgbaColor = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.getColorForSegmentIndex(toolGroupId, segmentationRepresentationUID, segmentIndex);
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.setColorForSegmentIndex(toolGroupId, segmentationRepresentationUID, segmentIndex, [...color, rgbaColor[3]]);
      segmentInfo.color = color;
      if (suppressEvents === false) {
        _this._broadcastEvent(_this.EVENTS.SEGMENTATION_UPDATED, {
          segmentation
        });
      }
    };
    this._setSegmentOpacity = function (segmentationId, segmentIndex, opacity, toolGroupId) {
      let suppressEvents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      const segmentation = _this.getSegmentation(segmentationId);
      if (segmentation === undefined) {
        throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
      }
      const segmentInfo = _this._getSegmentInfo(segmentation, segmentIndex);
      if (segmentInfo === undefined) {
        throw new Error(`Segment ${segmentIndex} not yet added to segmentation: ${segmentationId}`);
      }
      toolGroupId = toolGroupId ?? _this._getFirstToolGroupId();
      const segmentationRepresentation = _this._getSegmentationRepresentation(segmentationId, toolGroupId);
      if (!segmentationRepresentation) {
        throw new Error('Must add representation to toolgroup before setting segments');
      }
      const {
        segmentationRepresentationUID
      } = segmentationRepresentation;
      const rgbaColor = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.getColorForSegmentIndex(toolGroupId, segmentationRepresentationUID, segmentIndex);
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.setColorForSegmentIndex(toolGroupId, segmentationRepresentationUID, segmentIndex, [rgbaColor[0], rgbaColor[1], rgbaColor[2], opacity]);
      segmentInfo.opacity = opacity;
      if (suppressEvents === false) {
        _this._broadcastEvent(_this.EVENTS.SEGMENTATION_UPDATED, {
          segmentation
        });
      }
    };
    this._setSegmentationConfig = (property, value) => {
      // Todo: currently we only support global config, and we get the type
      // from the first segmentation
      const typeToUse = this.getSegmentations()[0].type;
      const {
        cornerstoneViewportService
      } = this.servicesManager.services;
      const config = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.getGlobalConfig();
      config.representations[typeToUse][property] = value;

      // Todo: add non global (representation specific config as well)
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setGlobalConfig(config);
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      const viewportIds = cornerstoneViewportService.getViewportIds();
      renderingEngine.renderViewports(viewportIds);
    };
    this._onSegmentationDataModified = evt => {
      const {
        segmentationId
      } = evt.detail;
      const segmentation = this.getSegmentation(segmentationId);
      if (segmentation === undefined) {
        // Part of add operation, not update operation, exit early.
        return;
      }
      this._broadcastEvent(this.EVENTS.SEGMENTATION_DATA_MODIFIED, {
        segmentation
      });
    };
    this._onSegmentationModifiedFromSource = evt => {
      const {
        segmentationId
      } = evt.detail;
      const segmentation = this.segmentations[segmentationId];
      if (segmentation === undefined) {
        // Part of add operation, not update operation, exit early.
        return;
      }
      const segmentationState = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getSegmentation(segmentationId);
      if (!segmentationState) {
        return;
      }
      const {
        activeSegmentIndex,
        cachedStats,
        segmentsLocked,
        label,
        type
      } = segmentationState;
      if (![LABELMAP, CONTOUR].includes(type)) {
        throw new Error(`Unsupported segmentation type: ${type}. Only ${LABELMAP} and ${CONTOUR} are supported.`);
      }
      const representationData = segmentationState.representationData[type];

      // TODO: handle other representations when available in cornerstone3D
      const segmentationSchema = {
        ...segmentation,
        activeSegmentIndex,
        cachedStats,
        displayText: [],
        id: segmentationId,
        label,
        segmentsLocked,
        type,
        representationData: {
          [type]: {
            ...representationData
          }
        }
      };
      try {
        this.addOrUpdateSegmentation(segmentationSchema);
      } catch (error) {
        console.warn(`Failed to add/update segmentation ${segmentationId}`, error);
      }
    };
    this._updateCornerstoneSegmentationVisibility = segmentationId => {
      const segmentationState = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state;
      const toolGroupIds = segmentationState.getToolGroupIdsWithSegmentation(segmentationId);
      toolGroupIds.forEach(toolGroupId => {
        const segmentationRepresentations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getSegmentationRepresentations(toolGroupId);
        if (segmentationRepresentations.length === 0) {
          return;
        }

        // Todo: this finds the first segmentation representation that matches the segmentationId
        // If there are two labelmap representations from the same segmentation, this will not work
        const representation = segmentationRepresentations.find(representation => representation.segmentationId === segmentationId);
        const {
          segmentsHidden
        } = representation;
        const currentVisibility = segmentsHidden.size === 0 ? true : false;
        const newVisibility = !currentVisibility;
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.visibility.setSegmentationVisibility(toolGroupId, representation.segmentationRepresentationUID, newVisibility);

        // update segments visibility
        const {
          segmentation
        } = this._getSegmentationInfo(segmentationId, toolGroupId);
        const segments = segmentation.segments.filter(Boolean);
        segments.forEach(segment => {
          segment.isVisible = newVisibility;
        });
      });
    };
    this._getFirstToolGroupId = () => {
      const {
        toolGroupService
      } = this.servicesManager.services;
      const toolGroupIds = toolGroupService.getToolGroupIds();
      return toolGroupIds[0];
    };
    this.getNextColorLUTIndex = () => {
      let i = 0;
      while (true) {
        if (_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getColorLUT(i) === undefined) {
          return i;
        }
        i++;
      }
    };
    /**
     * Converts object of objects to array.
     *
     * @return {Array} Array of objects
     */
    this.arrayOfObjects = obj => {
      return Object.entries(obj).map(e => ({
        [e[0]]: e[1]
      }));
    };
    this.segmentations = {};
    this.servicesManager = servicesManager;
    this._initSegmentationService();
  }
  /**
   * It adds a segment to a segmentation, basically just setting the properties for
   * the segment.
   * @param segmentationId - The ID of the segmentation you want to add a
   * segment to.
   * @param segmentIndex - The index of the segment to add.
   * @param properties - The properties of the segment to add including
   * -- label: the label of the segment
   * -- color: the color of the segment
   * -- opacity: the opacity of the segment
   * -- visibility: the visibility of the segment (boolean)
   * -- isLocked: whether the segment is locked for editing
   * -- active: whether the segment is currently the active segment to be edited or not
   */
  addSegment(segmentationId, segmentIndex, toolGroupId, properties) {
    if (segmentIndex === 0) {
      throw new Error('Segment index 0 is reserved for "no label"');
    }
    toolGroupId = toolGroupId ?? this._getFirstToolGroupId();
    const {
      segmentationRepresentationUID,
      segmentation
    } = this._getSegmentationInfo(segmentationId, toolGroupId);
    if (this._getSegmentInfo(segmentation, segmentIndex)) {
      throw new Error(`Segment ${segmentIndex} already exists`);
    }
    const rgbaColor = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.getColorForSegmentIndex(toolGroupId, segmentationRepresentationUID, segmentIndex);
    segmentation.segments[segmentIndex] = {
      label: properties.label,
      segmentIndex: segmentIndex,
      color: [rgbaColor[0], rgbaColor[1], rgbaColor[2]],
      opacity: rgbaColor[3],
      isVisible: true,
      isLocked: false
    };
    segmentation.segmentCount++;
    const suppressEvents = true;
    if (properties !== undefined) {
      const {
        color: newColor,
        opacity,
        isLocked,
        visibility,
        active
      } = properties;
      if (newColor !== undefined) {
        this._setSegmentColor(segmentationId, segmentIndex, newColor, toolGroupId, suppressEvents);
      }
      if (opacity !== undefined) {
        this._setSegmentOpacity(segmentationId, segmentIndex, opacity, toolGroupId, suppressEvents);
      }
      if (visibility !== undefined) {
        this._setSegmentVisibility(segmentationId, segmentIndex, visibility, toolGroupId, suppressEvents);
      }
      if (active !== undefined) {
        this._setActiveSegment(segmentationId, segmentIndex, suppressEvents);
      }
      if (isLocked !== undefined) {
        this._setSegmentLocked(segmentationId, segmentIndex, isLocked, suppressEvents);
      }
    }
    if (segmentation.activeSegmentIndex === null) {
      this._setActiveSegment(segmentationId, segmentIndex, suppressEvents);
    }

    // Todo: this includes non-hydrated segmentations which might not be
    // persisted in the store
    this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
      segmentation
    });
  }
  removeSegment(segmentationId, segmentIndex) {
    const segmentation = this.getSegmentation(segmentationId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    if (segmentIndex === 0) {
      throw new Error('Segment index 0 is reserved for "no label"');
    }
    if (!this._getSegmentInfo(segmentation, segmentIndex)) {
      return;
    }
    segmentation.segmentCount--;
    segmentation.segments[segmentIndex] = null;

    // Get volume and delete the labels
    // Todo: handle other segmentations other than labelmap
    const labelmapVolume = this.getLabelmapVolume(segmentationId);
    const {
      dimensions
    } = labelmapVolume;
    const scalarData = labelmapVolume.getScalarData();

    // Set all values of this segment to zero and get which frames have been edited.
    const frameLength = dimensions[0] * dimensions[1];
    const numFrames = dimensions[2];
    let voxelIndex = 0;
    const modifiedFrames = new Set();
    for (let frame = 0; frame < numFrames; frame++) {
      for (let p = 0; p < frameLength; p++) {
        if (scalarData[voxelIndex] === segmentIndex) {
          scalarData[voxelIndex] = 0;
          modifiedFrames.add(frame);
        }
        voxelIndex++;
      }
    }
    const modifiedFramesArray = Array.from(modifiedFrames);

    // Trigger texture update of modified segmentation frames.
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.triggerSegmentationEvents.triggerSegmentationDataModified(segmentationId, modifiedFramesArray);
    if (segmentation.activeSegmentIndex === segmentIndex) {
      const segmentIndices = Object.keys(segmentation.segments);
      const newActiveSegmentIndex = segmentIndices.length ? Number(segmentIndices[0]) : 1;
      this._setActiveSegment(segmentationId, newActiveSegmentIndex, true);
    }
    this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
      segmentation
    });
  }
  setSegmentVisibility(segmentationId, segmentIndex, isVisible, toolGroupId) {
    let suppressEvents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    this._setSegmentVisibility(segmentationId, segmentIndex, isVisible, toolGroupId, suppressEvents);
  }
  setSegmentLockedForSegmentation(segmentationId, segmentIndex, isLocked) {
    const suppressEvents = false;
    this._setSegmentLocked(segmentationId, segmentIndex, isLocked, suppressEvents);
  }
  setSegmentLabel(segmentationId, segmentIndex, segmentLabel) {
    this._setSegmentLabel(segmentationId, segmentIndex, segmentLabel);
  }
  setSegmentColor(segmentationId, segmentIndex, color, toolGroupId) {
    this._setSegmentColor(segmentationId, segmentIndex, color, toolGroupId);
  }
  setSegmentOpacity(segmentationId, segmentIndex, opacity, toolGroupId) {
    this._setSegmentOpacity(segmentationId, segmentIndex, opacity, toolGroupId);
  }
  setActiveSegmentationForToolGroup(segmentationId, toolGroupId) {
    toolGroupId = toolGroupId ?? this._getFirstToolGroupId();
    const suppressEvents = false;
    this._setActiveSegmentationForToolGroup(segmentationId, toolGroupId, suppressEvents);
  }
  setActiveSegmentForSegmentation(segmentationId, segmentIndex) {
    this._setActiveSegment(segmentationId, segmentIndex, false);
  }

  /**
   * Get all segmentations.
   *
   * * @param filterNonHydratedSegmentations - If true, only return hydrated segmentations
   * hydrated segmentations are those that have been loaded and persisted
   * in the state, but non hydrated segmentations are those that are
   * only created for the SEG displayset (SEG viewport) and the user might not
   * have loaded them yet fully.
   *
    * @return Array of segmentations
   */
  getSegmentations() {
    let filterNonHydratedSegmentations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const segmentations = this._getSegmentations();
    return segmentations && segmentations.filter(segmentation => {
      return !filterNonHydratedSegmentations || segmentation.hydrated;
    });
  }
  _getSegmentations() {
    const segmentations = this.arrayOfObjects(this.segmentations);
    return segmentations && segmentations.map(m => this.segmentations[Object.keys(m)[0]]);
  }

  /**
   * Get specific segmentation by its id.
   *
   * @param segmentationId If of the segmentation
   * @return segmentation instance
   */
  getSegmentation(segmentationId) {
    return this.segmentations[segmentationId];
  }
  addOrUpdateSegmentation(segmentation) {
    let suppressEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let notYetUpdatedAtSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const {
      id: segmentationId
    } = segmentation;
    let cachedSegmentation = this.segmentations[segmentationId];
    if (cachedSegmentation) {
      // Update the segmentation (mostly for assigning metadata/labels)
      Object.assign(cachedSegmentation, segmentation);
      this._updateCornerstoneSegmentations({
        segmentationId,
        notYetUpdatedAtSource
      });
      if (!suppressEvents) {
        this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
          segmentation: cachedSegmentation
        });
      }
      return segmentationId;
    }
    const representationType = segmentation.type;
    const representationData = segmentation.representationData[representationType];
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.addSegmentations([{
      segmentationId,
      representation: {
        type: representationType,
        data: {
          ...representationData
        }
      }
    }]);

    // Define a new color LUT and associate it with this segmentation.
    // Todo: need to be generalized to accept custom color LUTs
    const newColorLUT = this.generateNewColorLUT();
    const newColorLUTIndex = this.getNextColorLUTIndex();
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.color.addColorLUT(newColorLUT, newColorLUTIndex);
    this.segmentations[segmentationId] = {
      ...segmentation,
      label: segmentation.label || '',
      segments: segmentation.segments || [null],
      activeSegmentIndex: segmentation.activeSegmentIndex ?? null,
      segmentCount: segmentation.segmentCount ?? 0,
      isActive: false,
      colorLUTIndex: newColorLUTIndex,
      isVisible: true
    };
    cachedSegmentation = this.segmentations[segmentationId];
    this._updateCornerstoneSegmentations({
      segmentationId,
      notYetUpdatedAtSource: true
    });
    if (!suppressEvents) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_ADDED, {
        segmentation: cachedSegmentation
      });
    }
    return cachedSegmentation.id;
  }
  async createSegmentationForSEGDisplaySet(segDisplaySet, segmentationId) {
    let suppressEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // Todo: we only support creating labelmap for SEG displaySets for now
    const representationType = LABELMAP;
    segmentationId = segmentationId ?? segDisplaySet.displaySetInstanceUID;
    const defaultScheme = this._getDefaultSegmentationScheme();
    const segmentation = {
      ...defaultScheme,
      id: segmentationId,
      displaySetInstanceUID: segDisplaySet.displaySetInstanceUID,
      type: representationType,
      representationData: {
        [LABELMAP]: {
          volumeId: segmentationId,
          referencedVolumeId: segDisplaySet.referencedVolumeId
        }
      }
    };
    const labelmap = this.getLabelmapVolume(segmentationId);
    const cachedSegmentation = this.getSegmentation(segmentationId);
    if (labelmap && cachedSegmentation) {
      // if the labelmap with the same segmentationId already exists, we can
      // just assume that the segmentation is already created and move on with
      // updating the state
      return this.addOrUpdateSegmentation(Object.assign(segmentation, cachedSegmentation), suppressEvents);
    }
    const {
      segments,
      referencedVolumeId
    } = segDisplaySet;
    if (!segments || !referencedVolumeId) {
      throw new Error('To create the segmentation from SEG displaySet, the displaySet should be loaded first, you can perform segDisplaySet.load() before calling this method.');
    }

    // if the labelmap doesn't exist, we need to create it first from the
    // DICOM SEG displaySet data
    const referencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(referencedVolumeId);
    if (!referencedVolume) {
      throw new Error(`No volume found for referencedVolumeId: ${referencedVolumeId}`);
    }

    // Force use of a Uint8Array SharedArrayBuffer for the segmentation to save space and so
    // it is easily compressible in worker thread.
    const derivedVolume = await _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.volumeLoader.createAndCacheDerivedVolume(referencedVolumeId, {
      volumeId: segmentationId,
      targetBuffer: {
        type: 'Uint8Array',
        sharedArrayBuffer: true
      }
    });
    const [rows, columns] = derivedVolume.dimensions;
    const derivedVolumeScalarData = derivedVolume.getScalarData();
    const {
      imageIds
    } = referencedVolume;
    const sopUIDImageIdIndexMap = imageIds.reduce((acc, imageId, index) => {
      const {
        sopInstanceUid
      } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.get('generalImageModule', imageId);
      acc[sopInstanceUid] = index;
      return acc;
    }, {});
    const numSegments = Object.keys(segments).length;
    // Note: ideally we could use the TypedArray set method, but since each
    // slice can have multiple segments, we need to loop over each slice and
    // set the segment value for each segment.
    let overlappingSegments = false;
    const _segmentInfoUpdate = (segmentInfo, segmentIndex) => {
      const {
        pixelData: segPixelData
      } = segmentInfo;
      let segmentX = 0;
      let segmentY = 0;
      let segmentZ = 0;
      let count = 0;
      for (const [functionalGroupIndex, functionalGroup] of segmentInfo.functionalGroups.entries()) {
        const {
          ReferencedSOPInstanceUID
        } = functionalGroup.DerivationImageSequence.SourceImageSequence;
        const imageIdIndex = sopUIDImageIdIndexMap[ReferencedSOPInstanceUID];
        if (imageIdIndex === -1) {
          return;
        }
        const step = rows * columns;

        // we need a faster way to get the pixel data for the current
        // functional group, which we use typed array view

        const functionGroupPixelData = new Uint8Array(segPixelData.buffer, functionalGroupIndex * step, step);
        const functionalGroupStartIndex = imageIdIndex * step;
        const functionalGroupEndIndex = (imageIdIndex + 1) * step;

        // Note: this for loop is not optimized, since DICOM SEG stores
        // each segment as a separate labelmap so if there is a slice
        // that has multiple segments, we will have to loop over each
        // segment and we cannot use the TypedArray set method.
        for (let i = functionalGroupStartIndex, j = 0; i < functionalGroupEndIndex; i++, j++) {
          if (functionGroupPixelData[j] !== 0) {
            if (derivedVolumeScalarData[i] !== 0) {
              overlappingSegments = true;
            }
            derivedVolumeScalarData[i] = segmentIndex;

            // centroid calculations
            segmentX += i % columns;
            segmentY += Math.floor(i / columns) % rows;
            segmentZ += Math.floor(i / (columns * rows));
            count++;
          }
        }
      }

      // centroid calculations
      const x = Math.floor(segmentX / count);
      const y = Math.floor(segmentY / count);
      const z = Math.floor(segmentZ / count);
      const centerWorld = derivedVolume.imageData.indexToWorld([x, y, z]);
      segmentation.cachedStats = {
        ...segmentation.cachedStats,
        segmentCenter: {
          ...segmentation.cachedStats.segmentCenter,
          [segmentIndex]: {
            center: {
              image: [x, y, z],
              world: centerWorld
            },
            modifiedTime: segDisplaySet.SeriesDate
          }
        }
      };
      const numInitialized = Object.keys(segmentation.cachedStats.segmentCenter).length;

      // Calculate percentage completed
      const percentComplete = Math.round(numInitialized / numSegments * 100);
      this._broadcastEvent(EVENTS.SEGMENT_LOADING_COMPLETE, {
        percentComplete,
        numSegments: numSegments
      });
    };
    const promiseArray = [];
    for (const segmentIndex in segments) {
      const segmentInfo = segments[segmentIndex];

      // Important: we need a non-blocking way to update the segmentation
      // state, otherwise the UI will freeze and the user will not be able
      // to interact with the app or progress bars will not be updated.
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          _segmentInfoUpdate(segmentInfo, segmentIndex);
          resolve();
        }, 0);
      });
      promiseArray.push(promise);
    }
    await Promise.all(promiseArray);
    segmentation.segmentCount = Object.keys(segments).length;
    segmentation.segments = [null]; // segment 0

    Object.keys(segments).forEach(segmentIndex => {
      const segmentInfo = segments[segmentIndex];
      const segIndex = Number(segmentIndex);
      segmentation.segments[segIndex] = {
        label: segmentInfo.label || `Segment ${segIndex}`,
        segmentIndex: Number(segmentIndex),
        color: [segmentInfo.color[0], segmentInfo.color[1], segmentInfo.color[2]],
        opacity: segmentInfo.color[3],
        isVisible: true,
        isLocked: false
      };
    });
    segDisplaySet.isLoaded = true;
    this._broadcastEvent(EVENTS.SEGMENTATION_LOADING_COMPLETE, {
      segmentationId,
      segDisplaySet,
      overlappingSegments
    });
    return this.addOrUpdateSegmentation(segmentation, suppressEvents);
  }
  async createSegmentationForRTDisplaySet(rtDisplaySet, segmentationId) {
    let suppressEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // Todo: we currently only have support for contour representation for initial
    // RT display
    const representationType = CONTOUR;
    segmentationId = segmentationId ?? rtDisplaySet.displaySetInstanceUID;
    const {
      structureSet
    } = rtDisplaySet;
    if (!structureSet) {
      throw new Error('To create the contours from RT displaySet, the displaySet should be loaded first, you can perform rtDisplaySet.load() before calling this method.');
    }
    const defaultScheme = this._getDefaultSegmentationScheme();
    const rtDisplaySetUID = rtDisplaySet.displaySetInstanceUID;
    const allRTStructData = (0,_RTSTRUCT_mapROIContoursToRTStructData__WEBPACK_IMPORTED_MODULE_6__.mapROIContoursToRTStructData)(structureSet, rtDisplaySetUID);

    // sort by segmentIndex
    allRTStructData.sort((a, b) => a.segmentIndex - b.segmentIndex);
    const geometryIds = allRTStructData.map(_ref2 => {
      let {
        geometryId
      } = _ref2;
      return geometryId;
    });
    const segmentation = {
      ...defaultScheme,
      id: segmentationId,
      displaySetInstanceUID: rtDisplaySetUID,
      type: representationType,
      representationData: {
        [CONTOUR]: {
          geometryIds
        }
      }
    };
    const cachedSegmentation = this.getSegmentation(segmentationId);
    if (cachedSegmentation) {
      // if the labelmap with the same segmentationId already exists, we can
      // just assume that the segmentation is already created and move on with
      // updating the state
      return this.addOrUpdateSegmentation(Object.assign(segmentation, cachedSegmentation), suppressEvents);
    }
    if (!structureSet.ROIContours?.length) {
      throw new Error('The structureSet does not contain any ROIContours. Please ensure the structureSet is loaded first.');
    }
    const segmentsCachedStats = {};
    const initializeContour = async rtStructData => {
      const {
        data,
        id,
        color,
        segmentIndex,
        geometryId
      } = rtStructData;
      const geometry = await _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.geometryLoader.createAndCacheGeometry(geometryId, {
        geometryData: {
          data,
          id,
          color,
          frameOfReferenceUID: structureSet.frameOfReferenceUID,
          segmentIndex
        },
        type: _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.GeometryType.CONTOUR
      });
      const contourSet = geometry.data;
      const centroid = contourSet.getCentroid();
      segmentsCachedStats[segmentIndex] = {
        center: {
          world: centroid
        },
        modifiedTime: rtDisplaySet.SeriesDate // we use the SeriesDate as the modifiedTime since this is the first time we are creating the segmentation
      };

      segmentation.segments[segmentIndex] = {
        label: id,
        segmentIndex,
        color,
        ...SEGMENT_CONSTANT
      };
      const numInitialized = Object.keys(segmentsCachedStats).length;

      // Calculate percentage completed
      const percentComplete = Math.round(numInitialized / allRTStructData.length * 100);
      this._broadcastEvent(EVENTS.SEGMENT_LOADING_COMPLETE, {
        percentComplete,
        // Note: this is not the geometryIds length since there might be
        // some missing ROINumbers
        numSegments: allRTStructData.length
      });
    };
    const promiseArray = [];
    for (let i = 0; i < allRTStructData.length; i++) {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          initializeContour(allRTStructData[i]).then(() => {
            resolve();
          });
        }, 0);
      });
      promiseArray.push(promise);
    }
    await Promise.all(promiseArray);
    segmentation.segmentCount = allRTStructData.length;
    rtDisplaySet.isLoaded = true;
    segmentation.cachedStats = {
      ...segmentation.cachedStats,
      segmentCenter: {
        ...segmentation.cachedStats.segmentCenter,
        ...segmentsCachedStats
      }
    };
    this._broadcastEvent(EVENTS.SEGMENTATION_LOADING_COMPLETE, {
      segmentationId,
      rtDisplaySet
    });
    return this.addOrUpdateSegmentation(segmentation, suppressEvents);
  }
  jumpToSegmentCenter(segmentationId, segmentIndex, toolGroupId) {
    let highlightAlpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.9;
    let highlightSegment = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    let animationLength = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 750;
    let highlightHideOthers = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    let highlightFunctionType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'ease-in-out';
    const {
      toolGroupService
    } = this.servicesManager.services;
    const center = this._getSegmentCenter(segmentationId, segmentIndex);
    const {
      world
    } = center;

    // todo: generalize
    toolGroupId = toolGroupId || this._getToolGroupIdsWithSegmentation(segmentationId);
    const toolGroups = [];
    if (Array.isArray(toolGroupId)) {
      toolGroupId.forEach(toolGroup => {
        toolGroups.push(toolGroupService.getToolGroup(toolGroup));
      });
    } else {
      toolGroups.push(toolGroupService.getToolGroup(toolGroupId));
    }
    toolGroups.forEach(toolGroup => {
      const viewportsInfo = toolGroup.getViewportsInfo();

      // @ts-ignore
      for (const {
        viewportId,
        renderingEngineId
      } of viewportsInfo) {
        const {
          viewport
        } = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElementByIds)(viewportId, renderingEngineId);
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.viewport.jumpToWorld(viewport, world);
      }
      if (highlightSegment) {
        this.highlightSegment(segmentationId, segmentIndex, toolGroup.id, highlightAlpha, animationLength, highlightHideOthers, highlightFunctionType);
      }
    });
  }
  highlightSegment(segmentationId, segmentIndex, toolGroupId) {
    let alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.9;
    let animationLength = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 750;
    let hideOthers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    let highlightFunctionType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'ease-in-out';
    if (this.highlightIntervalId) {
      clearInterval(this.highlightIntervalId);
    }
    const segmentation = this.getSegmentation(segmentationId);
    toolGroupId = toolGroupId ?? this._getFirstToolGroupId();
    const segmentationRepresentation = this._getSegmentationRepresentation(segmentationId, toolGroupId);
    const {
      type
    } = segmentationRepresentation;
    const {
      segments
    } = segmentation;
    const highlightFn = type === LABELMAP ? this._highlightLabelmap.bind(this) : this._highlightContour.bind(this);
    const adjustedAlpha = type === LABELMAP ? alpha : 1 - alpha;
    highlightFn(segmentIndex, adjustedAlpha, hideOthers, segments, toolGroupId, animationLength, segmentationRepresentation);
  }
  _highlightLabelmap(segmentIndex, alpha, hideOthers, segments, toolGroupId, animationLength, segmentationRepresentation) {
    const newSegmentSpecificConfig = {
      [segmentIndex]: {
        LABELMAP: {
          fillAlpha: alpha
        }
      }
    };
    if (hideOthers) {
      for (let i = 0; i < segments.length; i++) {
        if (i !== segmentIndex) {
          newSegmentSpecificConfig[i] = {
            LABELMAP: {
              fillAlpha: 0
            }
          };
        }
      }
    }
    const {
      fillAlpha
    } = this.getConfiguration(toolGroupId);
    let startTime = null;
    const animation = timestamp => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationLength, 1);
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setSegmentSpecificConfig(toolGroupId, segmentationRepresentation.segmentationRepresentationUID, {
        [segmentIndex]: {
          LABELMAP: {
            fillAlpha: (0,_utils_transitions__WEBPACK_IMPORTED_MODULE_5__.easeInOutBell)(progress, fillAlpha)
          }
        }
      });
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setSegmentSpecificConfig(toolGroupId, segmentationRepresentation.segmentationRepresentationUID, {});
      }
    };
    requestAnimationFrame(animation);
  }
  _highlightContour(segmentIndex, alpha, hideOthers, segments, toolGroupId, animationLength, segmentationRepresentation) {
    const startTime = performance.now();
    const animate = currentTime => {
      const progress = (currentTime - startTime) / animationLength;
      if (progress >= 1) {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setSegmentSpecificConfig(toolGroupId, segmentationRepresentation.segmentationRepresentationUID, {});
        return;
      }
      const reversedProgress = (0,_utils_transitions__WEBPACK_IMPORTED_MODULE_5__.reverseEaseInOutBell)(progress, 0.1);
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.setSegmentSpecificConfig(toolGroupId, segmentationRepresentation.segmentationRepresentationUID, {
        [segmentIndex]: {
          CONTOUR: {
            fillAlpha: reversedProgress
          }
        }
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
  removeSegmentationRepresentationFromToolGroup(toolGroupId, segmentationRepresentationUIDsIds) {
    const uids = segmentationRepresentationUIDsIds || [];
    if (!uids.length) {
      const representations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.getSegmentationRepresentations(toolGroupId);
      if (!representations || !representations.length) {
        return;
      }
      uids.push(...representations.map(rep => rep.segmentationRepresentationUID));
    }
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.removeSegmentationsFromToolGroup(toolGroupId, uids);
  }

  /**
   * Removes a segmentation and broadcasts the removed event.
   *
   * @param {string} segmentationId The segmentation id
   */
  remove(segmentationId) {
    const segmentation = this.segmentations[segmentationId];
    const wasActive = segmentation.isActive;
    if (!segmentationId || !segmentation) {
      console.warn(`No segmentationId provided, or unable to find segmentation by id.`);
      return;
    }
    const {
      colorLUTIndex
    } = segmentation;
    this._removeSegmentationFromCornerstone(segmentationId);

    // Delete associated colormap
    // Todo: bring this back
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state.removeColorLUT(colorLUTIndex);
    delete this.segmentations[segmentationId];

    // If this segmentation was active, and there is another segmentation, set another one active.

    if (wasActive) {
      const remainingSegmentations = this._getSegmentations();
      if (remainingSegmentations.length) {
        const {
          id
        } = remainingSegmentations[0];
        this._setActiveSegmentationForToolGroup(id, this._getFirstToolGroupId(), false);
      }
    }
    this._broadcastEvent(this.EVENTS.SEGMENTATION_REMOVED, {
      segmentationId
    });
  }
  setSegmentLabelForSegmentation(segmentationId, segmentIndex, label) {
    this._setSegmentLabelForSegmentation(segmentationId, segmentIndex, label);
  }
  _setSegmentLabelForSegmentation(segmentationId, segmentIndex, label) {
    let suppressEvents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const segmentation = this.getSegmentation(segmentationId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    const segmentInfo = segmentation.segments[segmentIndex];
    if (segmentInfo === undefined) {
      throw new Error(`Segment ${segmentIndex} not yet added to segmentation: ${segmentationId}`);
    }
    segmentInfo.label = label;
    if (suppressEvents === false) {
      // this._setSegmentationModified(segmentationId);
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    }
  }
  shouldRenderSegmentation(viewportDisplaySetInstanceUIDs, segDisplaySetInstanceUID) {
    if (!viewportDisplaySetInstanceUIDs || !viewportDisplaySetInstanceUIDs.length) {
      return false;
    }
    const {
      displaySetService
    } = this.servicesManager.services;
    let shouldDisplaySeg = false;
    const segDisplaySet = displaySetService.getDisplaySetByUID(segDisplaySetInstanceUID);
    const segFrameOfReferenceUID = this._getFrameOfReferenceUIDForSeg(segDisplaySet);

    // check if the displaySet is sharing the same frameOfReferenceUID
    // with the new segmentation
    for (const displaySetInstanceUID of viewportDisplaySetInstanceUIDs) {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

      // Todo: this might not be ideal for use cases such as 4D, since we
      // don't want to show the segmentation for all the frames
      if (displaySet.isReconstructable && displaySet?.images?.[0]?.FrameOfReferenceUID === segFrameOfReferenceUID) {
        shouldDisplaySeg = true;
        break;
      }
    }
    return shouldDisplaySeg;
  }
  _getDefaultSegmentationScheme() {
    return {
      activeSegmentIndex: 1,
      cachedStats: {},
      label: '',
      segmentsLocked: [],
      displayText: [],
      hydrated: false,
      // by default we don't hydrate the segmentation for SEG displaySets
      segmentCount: 0,
      segments: [],
      isVisible: true,
      isActive: false,
      colorLUTIndex: 0
    };
  }
  _setActiveSegmentationForToolGroup(segmentationId, toolGroupId) {
    let suppressEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const segmentations = this._getSegmentations();
    const targetSegmentation = this.getSegmentation(segmentationId);
    if (targetSegmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    segmentations.forEach(segmentation => {
      segmentation.isActive = segmentation.id === segmentationId;
    });
    const representation = this._getSegmentationRepresentation(segmentationId, toolGroupId);
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.activeSegmentation.setActiveSegmentationRepresentation(toolGroupId, representation.segmentationRepresentationUID);
    if (suppressEvents === false) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation: targetSegmentation
      });
    }
  }
  _setActiveSegment(segmentationId, segmentIndex) {
    let suppressEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const segmentation = this.getSegmentation(segmentationId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.segmentIndex.setActiveSegmentIndex(segmentationId, segmentIndex);
    segmentation.activeSegmentIndex = segmentIndex;
    if (suppressEvents === false) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    }
  }
  _getSegmentInfo(segmentation, segmentIndex) {
    const segments = segmentation.segments;
    if (!segments) {
      return;
    }
    if (segments && segments.length > 0) {
      return segments[segmentIndex];
    }
  }
  _getVolumeIdForDisplaySet(displaySet) {
    const volumeLoaderSchema = displaySet.volumeLoaderSchema ?? VOLUME_LOADER_SCHEME;
    return `${volumeLoaderSchema}:${displaySet.displaySetInstanceUID}`;
  }
  _getSegmentCenter(segmentationId, segmentIndex) {
    const segmentation = this.getSegmentation(segmentationId);
    if (!segmentation) {
      return;
    }
    const {
      cachedStats
    } = segmentation;
    if (!cachedStats) {
      return;
    }
    const {
      segmentCenter
    } = cachedStats;
    if (!segmentCenter) {
      return;
    }
    const {
      center
    } = segmentCenter[segmentIndex];
    return center;
  }
  _setSegmentLocked(segmentationId, segmentIndex, isLocked) {
    let suppressEvents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const segmentation = this.getSegmentation(segmentationId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    const segmentInfo = this._getSegmentInfo(segmentation, segmentIndex);
    if (segmentInfo === undefined) {
      throw new Error(`Segment ${segmentIndex} not yet added to segmentation: ${segmentationId}`);
    }
    segmentInfo.isLocked = isLocked;
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.segmentLocking.setSegmentIndexLocked(segmentationId, segmentIndex, isLocked);
    if (suppressEvents === false) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    }
  }
  _setSegmentVisibility(segmentationId, segmentIndex, isVisible, toolGroupId) {
    let suppressEvents = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    toolGroupId = toolGroupId ?? this._getFirstToolGroupId();
    const {
      segmentationRepresentationUID,
      segmentation
    } = this._getSegmentationInfo(segmentationId, toolGroupId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    const segmentInfo = this._getSegmentInfo(segmentation, segmentIndex);
    if (segmentInfo === undefined) {
      throw new Error(`Segment ${segmentIndex} not yet added to segmentation: ${segmentationId}`);
    }
    segmentInfo.isVisible = isVisible;
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.config.visibility.setSegmentVisibility(toolGroupId, segmentationRepresentationUID, segmentIndex, isVisible);

    // make sure to update the isVisible flag on the segmentation
    // if a segment becomes invisible then the segmentation should be invisible
    // in the status as well, and show correct icon
    segmentation.isVisible = segmentation.segments.filter(Boolean).every(segment => segment.isVisible);
    if (suppressEvents === false) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    }
  }
  _setSegmentLabel(segmentationId, segmentIndex, segmentLabel) {
    let suppressEvents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const segmentation = this.getSegmentation(segmentationId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    const segmentInfo = this._getSegmentInfo(segmentation, segmentIndex);
    if (segmentInfo === undefined) {
      throw new Error(`Segment ${segmentIndex} not yet added to segmentation: ${segmentationId}`);
    }
    segmentInfo.label = segmentLabel;
    if (suppressEvents === false) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_UPDATED, {
        segmentation
      });
    }
  }
  _getSegmentationRepresentation(segmentationId, toolGroupId) {
    const segmentationRepresentations = this.getSegmentationRepresentationsForToolGroup(toolGroupId);
    if (segmentationRepresentations.length === 0) {
      return;
    }

    // Todo: this finds the first segmentation representation that matches the segmentationId
    // If there are two labelmap representations from the same segmentation, this will not work
    const representation = segmentationRepresentations.find(representation => representation.segmentationId === segmentationId);
    return representation;
  }
  _initSegmentationService() {
    // Connect Segmentation Service to Cornerstone3D.
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.SEGMENTATION_MODIFIED, this._onSegmentationModifiedFromSource);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.SEGMENTATION_DATA_MODIFIED, this._onSegmentationDataModified);
  }
  _getSegmentationInfo(segmentationId, toolGroupId) {
    const segmentation = this.getSegmentation(segmentationId);
    if (segmentation === undefined) {
      throw new Error(`no segmentation for segmentationId: ${segmentationId}`);
    }
    const segmentationRepresentation = this._getSegmentationRepresentation(segmentationId, toolGroupId);
    if (!segmentationRepresentation) {
      throw new Error('Must add representation to toolgroup before setting segments');
    }
    const {
      segmentationRepresentationUID
    } = segmentationRepresentation;
    return {
      segmentationRepresentationUID,
      segmentation
    };
  }
  _removeSegmentationFromCornerstone(segmentationId) {
    // TODO: This should be from the configuration
    const removeFromCache = true;
    const segmentationState = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state;
    const sourceSegState = segmentationState.getSegmentation(segmentationId);
    if (!sourceSegState) {
      return;
    }
    const toolGroupIds = segmentationState.getToolGroupIdsWithSegmentation(segmentationId);
    toolGroupIds.forEach(toolGroupId => {
      const segmentationRepresentations = segmentationState.getSegmentationRepresentations(toolGroupId);
      const UIDsToRemove = [];
      segmentationRepresentations.forEach(representation => {
        if (representation.segmentationId === segmentationId) {
          UIDsToRemove.push(representation.segmentationRepresentationUID);
        }
      });

      // remove segmentation representations
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.removeSegmentationsFromToolGroup(toolGroupId, UIDsToRemove, true // immediate
      );
    });

    // cleanup the segmentation state too
    segmentationState.removeSegmentation(segmentationId);
    if (removeFromCache && _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolumeLoadObject(segmentationId)) {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.removeVolumeLoadObject(segmentationId);
    }
  }
  _updateCornerstoneSegmentations(_ref3) {
    let {
      segmentationId,
      notYetUpdatedAtSource
    } = _ref3;
    if (notYetUpdatedAtSource === false) {
      return;
    }
    const segmentationState = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state;
    const sourceSegmentation = segmentationState.getSegmentation(segmentationId);
    const segmentation = this.segmentations[segmentationId];
    const {
      label,
      cachedStats
    } = segmentation;

    // Update the label in the source if necessary
    if (sourceSegmentation.label !== label) {
      sourceSegmentation.label = label;
    }
    if (!lodash_isequal__WEBPACK_IMPORTED_MODULE_4___default()(sourceSegmentation.cachedStats, cachedStats)) {
      sourceSegmentation.cachedStats = cachedStats;
    }
  }
  _getToolGroupIdsWithSegmentation(segmentationId) {
    const segmentationState = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.state;
    const toolGroupIds = segmentationState.getToolGroupIdsWithSegmentation(segmentationId);
    return toolGroupIds;
  }
  _getFrameOfReferenceUIDForSeg(displaySet) {
    const frameOfReferenceUID = displaySet.instance?.FrameOfReferenceUID;
    if (frameOfReferenceUID) {
      return frameOfReferenceUID;
    }

    // if not found we should try the ReferencedFrameOfReferenceSequence
    const referencedFrameOfReferenceSequence = displaySet.instance?.ReferencedFrameOfReferenceSequence;
    if (referencedFrameOfReferenceSequence) {
      return referencedFrameOfReferenceSequence.FrameOfReferenceUID;
    }
  }
  generateNewColorLUT() {
    const newColorLUT = lodash_clonedeep__WEBPACK_IMPORTED_MODULE_0___default()(COLOR_LUT);
    return newColorLUT;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
SegmentationService.REGISTRATION = {
  name: 'segmentationService',
  altName: 'SegmentationService',
  create: _ref4 => {
    let {
      servicesManager
    } = _ref4;
    return new SegmentationService({
      servicesManager
    });
  }
};
const _default = SegmentationService;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(COLOR_LUT, "COLOR_LUT", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(LABELMAP, "LABELMAP", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(CONTOUR, "CONTOUR", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(EVENTS, "EVENTS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(VALUE_TYPES, "VALUE_TYPES", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(SEGMENT_CONSTANT, "SEGMENT_CONSTANT", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(VOLUME_LOADER_SCHEME, "VOLUME_LOADER_SCHEME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(SegmentationService, "SegmentationService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/SegmentationService/index.js":
/*!*********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/SegmentationService/index.js ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SegmentationService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SegmentationService */ "../../../extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = _SegmentationService__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SegmentationService/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SyncGroupService)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const EVENTS = {
  TOOL_GROUP_CREATED: 'event::cornerstone::syncgroupservice:toolgroupcreated'
};

/**
 * @params options - are an optional set of options associated with the first
 * sync group declared.
 */

const POSITION = 'cameraposition';
const VOI = 'voi';
const ZOOMPAN = 'zoompan';
const STACKIMAGE = 'stackimage';
const asSyncGroup = syncGroup => typeof syncGroup === 'string' ? {
  type: syncGroup
} : syncGroup;
class SyncGroupService {
  constructor(serviceManager) {
    this.servicesManager = void 0;
    this.listeners = {};
    this.EVENTS = void 0;
    this.synchronizerCreators = {
      [POSITION]: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.synchronizers.createCameraPositionSynchronizer,
      [VOI]: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.synchronizers.createVOISynchronizer,
      [ZOOMPAN]: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.synchronizers.createZoomPanSynchronizer,
      [STACKIMAGE]: _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.synchronizers.createStackImageSynchronizer
    };
    this.servicesManager = serviceManager;
    this.listeners = {};
    this.EVENTS = EVENTS;
    //
    Object.assign(this, _ohif_core__WEBPACK_IMPORTED_MODULE_1__.pubSubServiceInterface);
  }
  _createSynchronizer(type, id, options) {
    const syncCreator = this.synchronizerCreators[type.toLowerCase()];
    if (syncCreator) {
      return syncCreator(id, options);
    } else {
      console.warn('Unknown synchronizer type', type, id);
    }
  }

  /**
   * Creates a synchronizer type.
   * @param type is the type of the synchronizer to create
   * @param creator
   */
  setSynchronizer(type, creator) {
    this.synchronizerCreators[type.toLowerCase()] = creator;
  }
  _getOrCreateSynchronizer(type, id, options) {
    let synchronizer = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.SynchronizerManager.getSynchronizer(id);
    if (!synchronizer) {
      synchronizer = this._createSynchronizer(type, id, options);
    }
    return synchronizer;
  }
  addViewportToSyncGroup(viewportId, renderingEngineId, syncGroups) {
    if (!syncGroups) {
      return;
    }
    const syncGroupsArray = Array.isArray(syncGroups) ? syncGroups : [syncGroups];
    syncGroupsArray.forEach(syncGroup => {
      const syncGroupObj = asSyncGroup(syncGroup);
      const {
        type,
        target = true,
        source = true,
        options = {},
        id = type
      } = syncGroupObj;
      const synchronizer = this._getOrCreateSynchronizer(type, id, options);
      synchronizer.setOptions(viewportId, options);
      const viewportInfo = {
        viewportId,
        renderingEngineId
      };
      if (target && source) {
        synchronizer.add(viewportInfo);
        return;
      } else if (source) {
        synchronizer.addSource(viewportInfo);
      } else if (target) {
        synchronizer.addTarget(viewportInfo);
      }
    });
  }
  destroy() {
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.SynchronizerManager.destroy();
  }
  removeViewportFromSyncGroup(viewportId, renderingEngineId, syncGroupId) {
    const synchronizers = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.SynchronizerManager.getAllSynchronizers();
    const filteredSynchronizers = syncGroupId ? synchronizers.filter(s => s.id === syncGroupId) : synchronizers;
    filteredSynchronizers.forEach(synchronizer => {
      if (!synchronizer) {
        return;
      }
      synchronizer.remove({
        viewportId,
        renderingEngineId
      });

      // check if any viewport is left in any of the sync groups, if not, delete that sync group
      const sourceViewports = synchronizer.getSourceViewports();
      const targetViewports = synchronizer.getTargetViewports();
      if (!sourceViewports.length && !targetViewports.length) {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.SynchronizerManager.destroySynchronizer(synchronizer.id);
      }
    });
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
SyncGroupService.REGISTRATION = {
  name: 'syncGroupService',
  altName: 'SyncGroupService',
  create: _ref => {
    let {
      servicesManager
    } = _ref;
    return new SyncGroupService(servicesManager);
  }
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EVENTS, "EVENTS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
  reactHotLoader.register(POSITION, "POSITION", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
  reactHotLoader.register(VOI, "VOI", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
  reactHotLoader.register(ZOOMPAN, "ZOOMPAN", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
  reactHotLoader.register(STACKIMAGE, "STACKIMAGE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
  reactHotLoader.register(asSyncGroup, "asSyncGroup", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
  reactHotLoader.register(SyncGroupService, "SyncGroupService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/SyncGroupService/index.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/SyncGroupService/index.js ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SyncGroupService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SyncGroupService */ "../../../extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = _SyncGroupService__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/SyncGroupService/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/ToolGroupService/ToolGroupService.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/ToolGroupService/ToolGroupService.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToolGroupService)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/getActiveViewportEnabledElement */ "../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const EVENTS = {
  VIEWPORT_ADDED: 'event::cornerstone::toolgroupservice:viewportadded',
  TOOLGROUP_CREATED: 'event::cornerstone::toolgroupservice:toolgroupcreated'
};
class ToolGroupService {
  constructor(serviceManager) {
    this.serviceManager = void 0;
    this.toolGroupIds = new Set();
    /**
     * Service-specific
     */
    this.listeners = void 0;
    this.EVENTS = void 0;
    const {
      cornerstoneViewportService,
      viewportGridService
    } = serviceManager.services;
    this.cornerstoneViewportService = cornerstoneViewportService;
    this.viewportGridService = viewportGridService;
    this.listeners = {};
    this.EVENTS = EVENTS;
    Object.assign(this, _ohif_core__WEBPACK_IMPORTED_MODULE_1__.pubSubServiceInterface);
  }
  onModeExit() {
    this.destroy();
  }

  /**
   * Retrieves a tool group from the ToolGroupManager by tool group ID.
   * If no tool group ID is provided, it retrieves the tool group of the active viewport.
   * @param toolGroupId - Optional ID of the tool group to retrieve.
   * @returns The tool group or undefined if it is not found.
   */
  getToolGroup(toolGroupId) {
    let toolGroupIdToUse = toolGroupId;
    if (!toolGroupIdToUse) {
      // Use the active viewport's tool group if no tool group id is provided
      const enabledElement = (0,_utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_2__["default"])(this.viewportGridService);
      if (!enabledElement) {
        return;
      }
      const {
        renderingEngineId,
        viewportId
      } = enabledElement;
      const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
      if (!toolGroup) {
        console.warn('No tool group found for viewportId:', viewportId, 'and renderingEngineId:', renderingEngineId);
        return;
      }
      toolGroupIdToUse = toolGroup.id;
    }
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroup(toolGroupIdToUse);
    return toolGroup;
  }
  getToolGroupIds() {
    return Array.from(this.toolGroupIds);
  }
  getToolGroupForViewport(viewportId) {
    const renderingEngine = this.cornerstoneViewportService.getRenderingEngine();
    return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngine.id);
  }
  getActiveToolForViewport(viewportId) {
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroupForViewport(viewportId);
    if (!toolGroup) {
      return null;
    }
    return toolGroup.getActivePrimaryMouseButtonTool();
  }
  destroy() {
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.destroy();
    this.toolGroupIds = new Set();
  }
  destroyToolGroup(toolGroupId) {
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.destroyToolGroup(toolGroupId);
    this.toolGroupIds.delete(toolGroupId);
  }
  removeViewportFromToolGroup(viewportId, renderingEngineId, deleteToolGroupIfEmpty) {
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
    if (!toolGroup) {
      return;
    }
    toolGroup.removeViewports(renderingEngineId, viewportId);
    const viewportIds = toolGroup.getViewportIds();
    if (viewportIds.length === 0 && deleteToolGroupIfEmpty) {
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.destroyToolGroup(toolGroup.id);
    }
  }
  addViewportToToolGroup(viewportId, renderingEngineId, toolGroupId) {
    if (!toolGroupId) {
      // If toolGroupId is not provided, add the viewport to all toolGroups
      const toolGroups = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getAllToolGroups();
      toolGroups.forEach(toolGroup => {
        toolGroup.addViewport(viewportId, renderingEngineId);
      });
    } else {
      let toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroup(toolGroupId);
      if (!toolGroup) {
        toolGroup = this.createToolGroup(toolGroupId);
      }
      toolGroup.addViewport(viewportId, renderingEngineId);
    }
    this._broadcastEvent(EVENTS.VIEWPORT_ADDED, {
      viewportId,
      toolGroupId
    });
  }
  createToolGroup(toolGroupId) {
    if (this.getToolGroup(toolGroupId)) {
      throw new Error(`ToolGroup ${toolGroupId} already exists`);
    }

    // if the toolGroup doesn't exist, create it
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.createToolGroup(toolGroupId);
    this.toolGroupIds.add(toolGroupId);
    this._broadcastEvent(EVENTS.TOOLGROUP_CREATED, {
      toolGroupId
    });
    return toolGroup;
  }
  addToolsToToolGroup(toolGroupId, tools) {
    let configs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroup(toolGroupId);
    // this.changeConfigurationIfNecessary(toolGroup, volumeId);
    this._addTools(toolGroup, tools, configs);
    this._setToolsMode(toolGroup, tools);
  }
  createToolGroupAndAddTools(toolGroupId, tools) {
    let configs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const toolGroup = this.createToolGroup(toolGroupId);
    this.addToolsToToolGroup(toolGroupId, tools, configs);
    return toolGroup;
  }

  /**
  private changeConfigurationIfNecessary(toolGroup, volumeUID) {
    // handle specific assignment for volumeUID (e.g., fusion)
    const toolInstances = toolGroup._toolInstances;
    // Object.values(toolInstances).forEach(toolInstance => {
    //   if (toolInstance.configuration) {
    //     toolInstance.configuration.volumeUID = volumeUID;
    //   }
    // });
  }
  */

  /**
   * Get the tool's configuration based on the tool name and tool group id
   * @param toolGroupId - The id of the tool group that the tool instance belongs to.
   * @param toolName - The name of the tool
   * @returns The configuration of the tool.
   */
  getToolConfiguration(toolGroupId, toolName) {
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroup(toolGroupId);
    if (!toolGroup) {
      return null;
    }
    const tool = toolGroup.getToolInstance(toolName);
    if (!tool) {
      return null;
    }
    return tool.configuration;
  }

  /**
   * Set the tool instance configuration. This will update the tool instance configuration
   * on the toolGroup
   * @param toolGroupId - The id of the tool group that the tool instance belongs to.
   * @param toolName - The name of the tool
   * @param config - The configuration object that you want to set.
   */
  setToolConfiguration(toolGroupId, toolName, config) {
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.ToolGroupManager.getToolGroup(toolGroupId);
    const toolInstance = toolGroup.getToolInstance(toolName);
    toolInstance.configuration = config;
  }
  _getToolNames(toolGroupTools) {
    const toolNames = [];
    if (toolGroupTools.active) {
      toolGroupTools.active.forEach(tool => {
        toolNames.push(tool.toolName);
      });
    }
    if (toolGroupTools.passive) {
      toolGroupTools.passive.forEach(tool => {
        toolNames.push(tool.toolName);
      });
    }
    if (toolGroupTools.enabled) {
      toolGroupTools.enabled.forEach(tool => {
        toolNames.push(tool.toolName);
      });
    }
    if (toolGroupTools.disabled) {
      toolGroupTools.disabled.forEach(tool => {
        toolNames.push(tool.toolName);
      });
    }
    return toolNames;
  }
  _setToolsMode(toolGroup, tools) {
    const {
      active,
      passive,
      enabled,
      disabled
    } = tools;
    if (active) {
      active.forEach(_ref => {
        let {
          toolName,
          bindings
        } = _ref;
        toolGroup.setToolActive(toolName, {
          bindings
        });
      });
    }
    if (passive) {
      passive.forEach(_ref2 => {
        let {
          toolName
        } = _ref2;
        toolGroup.setToolPassive(toolName);
      });
    }
    if (enabled) {
      enabled.forEach(_ref3 => {
        let {
          toolName
        } = _ref3;
        toolGroup.setToolEnabled(toolName);
      });
    }
    if (disabled) {
      disabled.forEach(_ref4 => {
        let {
          toolName
        } = _ref4;
        toolGroup.setToolDisabled(toolName);
      });
    }
  }
  _addTools(toolGroup, tools, configs) {
    const toolNames = this._getToolNames(tools);
    toolNames.forEach(toolName => {
      // Initialize the toolConfig if no configuration is provided
      const toolConfig = configs[toolName] ?? {};

      // if (volumeUID) {
      //   toolConfig.volumeUID = volumeUID;
      // }

      toolGroup.addTool(toolName, {
        ...toolConfig
      });
    });
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
ToolGroupService.REGISTRATION = {
  name: 'toolGroupService',
  altName: 'ToolGroupService',
  create: _ref5 => {
    let {
      servicesManager
    } = _ref5;
    return new ToolGroupService(servicesManager);
  }
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EVENTS, "EVENTS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ToolGroupService/ToolGroupService.ts");
  reactHotLoader.register(ToolGroupService, "ToolGroupService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ToolGroupService/ToolGroupService.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/ToolGroupService/index.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/ToolGroupService/index.js ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ToolGroupService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToolGroupService */ "../../../extensions/cornerstone/src/services/ToolGroupService/ToolGroupService.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = _ToolGroupService__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ToolGroupService/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts":
/*!**************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts ***!
  \**************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../../extensions/cornerstone/src/services/ViewportService/constants.ts");
/* harmony import */ var _Viewport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Viewport */ "../../../extensions/cornerstone/src/services/ViewportService/Viewport.ts");
/* harmony import */ var _utils_JumpPresets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/JumpPresets */ "../../../extensions/cornerstone/src/utils/JumpPresets.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const EVENTS = {
  VIEWPORT_DATA_CHANGED: 'event::cornerstoneViewportService:viewportDataChanged'
};

/**
 * Handles cornerstone viewport logic including enabling, disabling, and
 * updating the viewport.
 */
class CornerstoneViewportService extends _ohif_core__WEBPACK_IMPORTED_MODULE_0__.PubSubService {
  constructor(servicesManager) {
    super(EVENTS);
    this.renderingEngine = void 0;
    this.viewportsInfo = new Map();
    this.viewportsById = new Map();
    this.viewportGridResizeObserver = void 0;
    this.viewportsDisplaySets = new Map();
    // Some configs
    this.enableResizeDetector = void 0;
    this.resizeRefreshRateMs = void 0;
    this.resizeRefreshMode = void 0;
    this.servicesManager = null;
    this.renderingEngine = null;
    this.viewportGridResizeObserver = null;
    this.servicesManager = servicesManager;
  }

  /**
   * Adds the HTML element to the viewportService
   * @param {*} viewportIndex
   * @param {*} elementRef
   */
  enableViewport(viewportIndex, viewportOptions, elementRef) {
    // Use the provided viewportId
    // Not providing a viewportId is frowned upon because it does weird things
    // on moving them around, but it does mostly work.
    if (!viewportOptions.viewportId) {
      console.warn('Should provide viewport id externally', viewportOptions);
      viewportOptions.viewportId = this.getViewportId(viewportIndex) || `viewport-${viewportIndex}`;
    }
    const {
      viewportId
    } = viewportOptions;
    const viewportInfo = new _Viewport__WEBPACK_IMPORTED_MODULE_4__["default"](viewportIndex, viewportId);
    if (!viewportInfo.viewportId) {
      throw new Error('Should have viewport ID afterwards');
    }
    viewportInfo.setElement(elementRef);
    this.viewportsInfo.set(viewportIndex, viewportInfo);
    this.viewportsById.set(viewportId, viewportInfo);
  }
  getViewportIds() {
    const viewportIds = [];
    this.viewportsInfo.forEach(viewportInfo => {
      viewportIds.push(viewportInfo.getViewportId());
    });
    return viewportIds;
  }
  getViewportId(viewportIndex) {
    return this.viewportsInfo[viewportIndex]?.viewportId;
  }

  /**
   * It retrieves the renderingEngine if it does exist, or creates one otherwise
   * @returns {RenderingEngine} rendering engine
   */
  getRenderingEngine() {
    // get renderingEngine from cache if it exists
    const renderingEngine = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.getRenderingEngine)(_constants__WEBPACK_IMPORTED_MODULE_3__.RENDERING_ENGINE_ID);
    if (renderingEngine) {
      this.renderingEngine = renderingEngine;
      return this.renderingEngine;
    }
    if (!renderingEngine || renderingEngine.hasBeenDestroyed) {
      this.renderingEngine = new _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.RenderingEngine(_constants__WEBPACK_IMPORTED_MODULE_3__.RENDERING_ENGINE_ID);
    }
    return this.renderingEngine;
  }

  /**
   * It triggers the resize on the rendering engine.
   */
  resize() {
    const immediate = true;
    const keepCamera = true;
    this.renderingEngine.resize(immediate, keepCamera);
    this.renderingEngine.render();
  }

  /**
   * Removes the viewport from cornerstone, and destroys the rendering engine
   */
  destroy() {
    this._removeResizeObserver();
    this.viewportGridResizeObserver = null;
    try {
      this.renderingEngine?.destroy?.();
    } catch (e) {
      console.warn('Rendering engine not destroyed', e);
    }
    this.viewportsDisplaySets.clear();
    this.renderingEngine = null;
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.purgeCache();
  }

  /**
   * Disables the viewport inside the renderingEngine, if no viewport is left
   * it destroys the renderingEngine.
   *
   * This is called when the element goes away entirely - with new viewportId's
   * created for every new viewport, this will be called whenever the set of
   * viewports is changed, but NOT when the viewport position changes only.
   *
   * @param viewportIndex
   */
  disableElement(viewportIndex) {
    const viewportInfo = this.viewportsInfo.get(viewportIndex);
    if (!viewportInfo) {
      return;
    }
    const viewportId = viewportInfo.getViewportId();
    this.renderingEngine && this.renderingEngine.disableElement(viewportId);
    this.viewportsInfo.get(viewportIndex).destroy();
    this.viewportsInfo.delete(viewportIndex);
    this.viewportsById.delete(viewportId);
  }
  setPresentations(viewport, presentations) {
    const properties = presentations?.lutPresentation?.properties;
    if (properties) viewport.setProperties(properties);
    const camera = presentations?.positionPresentation?.camera;
    if (camera) viewport.setCamera(camera);
  }
  getPresentation(viewportIndex) {
    const viewportInfo = this.viewportsInfo.get(viewportIndex);
    if (!viewportInfo) return;
    const {
      viewportType,
      presentationIds
    } = viewportInfo.getViewportOptions();
    const csViewport = this.getCornerstoneViewportByIndex(viewportIndex);
    if (!csViewport) return;
    const properties = csViewport.getProperties();
    if (properties.isComputedVOI) {
      delete properties.voiRange;
      delete properties.VOILUTFunction;
    }
    const initialImageIndex = csViewport.getCurrentImageIdIndex();
    const camera = csViewport.getCamera();
    return {
      presentationIds,
      viewportType: !viewportType || viewportType === 'stack' ? 'stack' : 'volume',
      properties,
      initialImageIndex,
      camera
    };
  }

  /**
   * Uses the renderingEngine to enable the element for the given viewport index
   * and sets the displaySet data to the viewport
   * @param {*} viewportIndex
   * @param {*} displaySet
   * @param {*} dataSource
   * @returns
   */
  setViewportData(viewportIndex, viewportData, publicViewportOptions, publicDisplaySetOptions, presentations) {
    const renderingEngine = this.getRenderingEngine();
    const viewportId = publicViewportOptions.viewportId || this.getViewportId(viewportIndex);
    if (!viewportId) {
      throw new Error('Must define viewportId externally');
    }
    const viewportInfo = this.viewportsById.get(viewportId);
    if (!viewportInfo) {
      throw new Error('Viewport info not defined');
    }

    // If the viewport has moved index, then record the new index
    if (viewportInfo.viewportIndex !== viewportIndex) {
      this.viewportsInfo.delete(viewportInfo.viewportIndex);
      this.viewportsInfo.set(viewportIndex, viewportInfo);
      viewportInfo.viewportIndex = viewportIndex;
    }
    viewportInfo.setRenderingEngineId(renderingEngine.id);
    const {
      viewportOptions,
      displaySetOptions
    } = this._getViewportAndDisplaySetOptions(publicViewportOptions, publicDisplaySetOptions, viewportInfo);
    viewportInfo.setViewportOptions(viewportOptions);
    viewportInfo.setDisplaySetOptions(displaySetOptions);
    viewportInfo.setViewportData(viewportData);
    const element = viewportInfo.getElement();
    const type = viewportInfo.getViewportType();
    const background = viewportInfo.getBackground();
    const orientation = viewportInfo.getOrientation();
    const viewportInput = {
      viewportId,
      element,
      type,
      defaultOptions: {
        background,
        orientation
      }
    };

    // Todo: this is not optimal at all, we are re-enabling the already enabled
    // element which is not what we want. But enabledElement as part of the
    // renderingEngine is designed to be used like this. This will trigger
    // ENABLED_ELEMENT again and again, which will run onEnableElement callbacks
    renderingEngine.enableElement(viewportInput);
    const viewport = renderingEngine.getViewport(viewportId);
    this._setDisplaySets(viewport, viewportData, viewportInfo, presentations);

    // The broadcast event here ensures that listeners have a valid, up to date
    // viewport to access.  Doing it too early can result in exceptions or
    // invalid data.
    this._broadcastEvent(this.EVENTS.VIEWPORT_DATA_CHANGED, {
      viewportData,
      viewportIndex,
      viewportId
    });
  }
  getCornerstoneViewport(viewportId) {
    const viewportInfo = this.getViewportInfo(viewportId);
    if (!viewportInfo || !this.renderingEngine || this.renderingEngine.hasBeenDestroyed) {
      return null;
    }
    const viewport = this.renderingEngine.getViewport(viewportId);
    return viewport;
  }
  getCornerstoneViewportByIndex(viewportIndex) {
    const viewportInfo = this.getViewportInfoByIndex(viewportIndex);
    if (!viewportInfo || !this.renderingEngine || this.renderingEngine.hasBeenDestroyed) {
      return null;
    }
    const viewport = this.renderingEngine.getViewport(viewportInfo.getViewportId());
    return viewport;
  }

  /**
   * Returns the viewportIndex for the provided viewportId
   * @param {string} viewportId - the viewportId
   * @returns {number} - the viewportIndex
   */
  getViewportInfoByIndex(viewportIndex) {
    return this.viewportsInfo.get(viewportIndex);
  }
  getViewportInfo(viewportId) {
    // @ts-ignore
    for (const [index, viewport] of this.viewportsInfo.entries()) {
      if (viewport.getViewportId() === viewportId) {
        return viewport;
      }
    }
    return null;
  }
  _setStackViewport(viewport, viewportData, viewportInfo, presentations) {
    const displaySetOptions = viewportInfo.getDisplaySetOptions();
    const {
      imageIds,
      initialImageIndex,
      displaySetInstanceUID
    } = viewportData.data;
    this.viewportsDisplaySets.set(viewport.id, [displaySetInstanceUID]);
    let initialImageIndexToUse = presentations?.positionPresentation?.initialImageIndex ?? initialImageIndex;
    if (initialImageIndexToUse === undefined || initialImageIndexToUse === null) {
      initialImageIndexToUse = this._getInitialImageIndexForViewport(viewportInfo, imageIds) || 0;
    }
    const properties = {
      ...presentations.lutPresentation?.properties
    };
    if (!presentations.lutPresentation?.properties) {
      const {
        voi,
        voiInverted
      } = displaySetOptions[0];
      if (voi && (voi.windowWidth || voi.windowCenter)) {
        const {
          lower,
          upper
        } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.windowLevel.toLowHighRange(voi.windowWidth, voi.windowCenter);
        properties.voiRange = {
          lower,
          upper
        };
      }
      if (voiInverted !== undefined) {
        properties.invert = voiInverted;
      }
    }
    viewport.setStack(imageIds, initialImageIndexToUse).then(() => {
      viewport.setProperties(properties);
      const camera = presentations.positionPresentation?.camera;
      if (camera) viewport.setCamera(camera);
    });
  }
  _getInitialImageIndexForViewport(viewportInfo, imageIds) {
    const initialImageOptions = viewportInfo.getInitialImageOptions();
    if (!initialImageOptions) {
      return;
    }
    const {
      index,
      preset
    } = initialImageOptions;
    const viewportType = viewportInfo.getViewportType();
    let numberOfSlices;
    if (viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.Enums.ViewportType.STACK) {
      numberOfSlices = imageIds.length;
    } else if (viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.Enums.ViewportType.ORTHOGRAPHIC) {
      const viewport = this.getCornerstoneViewport(viewportInfo.getViewportId());
      const imageSliceData = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.getImageSliceDataForVolumeViewport(viewport);
      if (!imageSliceData) {
        return;
      }
      ({
        numberOfSlices
      } = imageSliceData);
    } else {
      return;
    }
    return this._getInitialImageIndex(numberOfSlices, index, preset);
  }
  _getInitialImageIndex(numberOfSlices, imageIndex, preset) {
    const lastSliceIndex = numberOfSlices - 1;
    if (imageIndex !== undefined) {
      return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.clip(imageIndex, 0, lastSliceIndex);
    }
    if (preset === _utils_JumpPresets__WEBPACK_IMPORTED_MODULE_5__["default"].First) {
      return 0;
    }
    if (preset === _utils_JumpPresets__WEBPACK_IMPORTED_MODULE_5__["default"].Last) {
      return lastSliceIndex;
    }
    if (preset === _utils_JumpPresets__WEBPACK_IMPORTED_MODULE_5__["default"].Middle) {
      // Note: this is a simple but yet very important formula.
      // since viewport reset works with the middle slice
      // if the below formula is not correct, on a viewport reset
      // it will jump to a different slice than the middle one which
      // was the initial slice, and we have some tools such as Crosshairs
      // which rely on a relative camera modifications and those will break.
      return lastSliceIndex % 2 === 0 ? lastSliceIndex / 2 : (lastSliceIndex + 1) / 2;
    }
    return 0;
  }
  async _setVolumeViewport(viewport, viewportData, viewportInfo, presentations) {
    // TODO: We need to overhaul the way data sources work so requests can be made
    // async. I think we should follow the image loader pattern which is async and
    // has a cache behind it.
    // The problem is that to set this volume, we need the metadata, but the request is
    // already in-flight, and the promise is not cached, so we have no way to wait for
    // it and know when it has fully arrived.
    // loadStudyMetadata(StudyInstanceUID) => Promise([instances for study])
    // loadSeriesMetadata(StudyInstanceUID, SeriesInstanceUID) => Promise([instances for series])
    // If you call loadStudyMetadata and it's not in the DicomMetadataStore cache, it should fire
    // a request through the data source?
    // (This call may or may not create sub-requests for series metadata)
    const volumeInputArray = [];
    const displaySetOptionsArray = viewportInfo.getDisplaySetOptions();
    const {
      hangingProtocolService
    } = this.servicesManager.services;
    const volumeToLoad = [];
    const displaySetInstanceUIDs = [];
    for (const [index, data] of viewportData.data.entries()) {
      const {
        volume,
        imageIds,
        displaySetInstanceUID
      } = data;
      displaySetInstanceUIDs.push(displaySetInstanceUID);
      if (!volume) {
        console.log('Volume display set not found');
        continue;
      }
      volumeToLoad.push(volume);
      const displaySetOptions = displaySetOptionsArray[index];
      const {
        volumeId
      } = volume;
      volumeInputArray.push({
        imageIds,
        volumeId,
        blendMode: displaySetOptions.blendMode,
        slabThickness: this._getSlabThickness(displaySetOptions, volumeId)
      });
    }
    this.viewportsDisplaySets.set(viewport.id, displaySetInstanceUIDs);
    if (hangingProtocolService.hasCustomImageLoadStrategy() && !hangingProtocolService.customImageLoadPerformed) {
      // delegate the volume loading to the hanging protocol service if it has a custom image load strategy
      return hangingProtocolService.runImageLoadStrategy({
        viewportId: viewport.id,
        volumeInputArray
      });
    }
    volumeToLoad.forEach(volume => {
      if (!volume.loadStatus.loaded && !volume.loadStatus.loading) {
        volume.load();
      }
    });

    // This returns the async continuation only
    return this.setVolumesForViewport(viewport, volumeInputArray, presentations);
  }
  async setVolumesForViewport(viewport, volumeInputArray, presentations) {
    const {
      displaySetService,
      toolGroupService
    } = this.servicesManager.services;
    const viewportInfo = this.getViewportInfo(viewport.id);
    const displaySetOptions = viewportInfo.getDisplaySetOptions();

    // Todo: use presentations states
    const volumesProperties = volumeInputArray.map((volumeInput, index) => {
      const {
        volumeId
      } = volumeInput;
      const displaySetOption = displaySetOptions[index];
      const {
        voi,
        voiInverted,
        colormap,
        displayPreset
      } = displaySetOption;
      const properties = {};
      if (voi && (voi.windowWidth || voi.windowCenter)) {
        const {
          lower,
          upper
        } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.windowLevel.toLowHighRange(voi.windowWidth, voi.windowCenter);
        properties.voiRange = {
          lower,
          upper
        };
      }
      if (voiInverted !== undefined) {
        properties.invert = voiInverted;
      }
      if (colormap !== undefined) {
        properties.colormap = colormap;
      }
      if (displayPreset !== undefined) {
        properties.preset = displayPreset;
      }
      return {
        properties,
        volumeId
      };
    });
    await viewport.setVolumes(volumeInputArray);
    volumesProperties.forEach(_ref => {
      let {
        properties,
        volumeId
      } = _ref;
      viewport.setProperties(properties, volumeId);
    });
    this.setPresentations(viewport, presentations);

    // load any secondary displaySets
    const displaySetInstanceUIDs = this.viewportsDisplaySets.get(viewport.id);

    // can be SEG or RTSTRUCT for now
    const overlayDisplaySet = displaySetInstanceUIDs.map(displaySetService.getDisplaySetByUID).find(displaySet => displaySet?.isOverlayDisplaySet);
    if (overlayDisplaySet) {
      this.addOverlayRepresentationForDisplaySet(overlayDisplaySet, viewport);
    } else {
      // If the displaySet is not a SEG displaySet we assume it is a primary displaySet
      // and we can look into hydrated segmentations to check if any of them are
      // associated with the primary displaySet

      // get segmentations only returns the hydrated segmentations
      this._addSegmentationRepresentationToToolGroupIfNecessary(displaySetInstanceUIDs, viewport);
    }
    const toolGroup = toolGroupService.getToolGroupForViewport(viewport.id);
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.segmentation.triggerSegmentationRender(toolGroup.id);
    const imageIndex = this._getInitialImageIndexForViewport(viewportInfo);
    if (imageIndex !== undefined) {
      _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.jumpToSlice(viewport.element, {
        imageIndex
      });
    }
    viewport.render();
  }
  _addSegmentationRepresentationToToolGroupIfNecessary(displaySetInstanceUIDs, viewport) {
    const {
      segmentationService,
      toolGroupService
    } = this.servicesManager.services;
    const toolGroup = toolGroupService.getToolGroupForViewport(viewport.id);

    // this only returns hydrated segmentations
    const segmentations = segmentationService.getSegmentations();
    for (const segmentation of segmentations) {
      const toolGroupSegmentationRepresentations = segmentationService.getSegmentationRepresentationsForToolGroup(toolGroup.id) || [];

      // if there is already a segmentation representation for this segmentation
      // for this toolGroup, don't bother at all
      const isSegmentationInToolGroup = toolGroupSegmentationRepresentations.find(representation => representation.segmentationId === segmentation.id);
      if (isSegmentationInToolGroup) {
        continue;
      }

      // otherwise, check if the hydrated segmentations are in the same FOR
      // as the primary displaySet, if so add the representation (since it was not there)
      const {
        id: segDisplaySetInstanceUID,
        type
      } = segmentation;
      const segFrameOfReferenceUID = this._getFrameOfReferenceUID(segDisplaySetInstanceUID);
      let shouldDisplaySeg = false;
      for (const displaySetInstanceUID of displaySetInstanceUIDs) {
        const primaryFrameOfReferenceUID = this._getFrameOfReferenceUID(displaySetInstanceUID);
        if (segFrameOfReferenceUID === primaryFrameOfReferenceUID) {
          shouldDisplaySeg = true;
          break;
        }
      }
      if (!shouldDisplaySeg) {
        return;
      }
      segmentationService.addSegmentationRepresentationToToolGroup(toolGroup.id, segmentation.id, false,
      // already hydrated,
      segmentation.type);
    }
  }
  addOverlayRepresentationForDisplaySet(displaySet, viewport) {
    const {
      segmentationService,
      toolGroupService
    } = this.servicesManager.services;
    const {
      referencedVolumeId
    } = displaySet;
    const segmentationId = displaySet.displaySetInstanceUID;
    const toolGroup = toolGroupService.getToolGroupForViewport(viewport.id);
    const representationType = referencedVolumeId && _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(referencedVolumeId) !== undefined ? _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.Enums.SegmentationRepresentations.Labelmap : _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.Enums.SegmentationRepresentations.Contour;
    segmentationService.addSegmentationRepresentationToToolGroup(toolGroup.id, segmentationId, false, representationType);
  }

  // Todo: keepCamera is an interim solution until we have a better solution for
  // keeping the camera position when the viewport data is changed
  updateViewport(viewportIndex, viewportData) {
    let keepCamera = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const viewportInfo = this.getViewportInfoByIndex(viewportIndex);
    const viewportId = viewportInfo.getViewportId();
    const viewport = this.getCornerstoneViewport(viewportId);
    const viewportCamera = viewport.getCamera();
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.VolumeViewport) {
      this._setVolumeViewport(viewport, viewportData, viewportInfo).then(() => {
        if (keepCamera) {
          viewport.setCamera(viewportCamera);
          viewport.render();
        }
      });
      return;
    }
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.StackViewport) {
      this._setStackViewport(viewport, viewportData, viewportInfo);
      return;
    }
  }
  _setDisplaySets(viewport, viewportData, viewportInfo) {
    let presentations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.StackViewport) {
      this._setStackViewport(viewport, viewportData, viewportInfo, presentations);
    } else if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.VolumeViewport || viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.VolumeViewport3D) {
      this._setVolumeViewport(viewport, viewportData, viewportInfo, presentations);
    } else {
      throw new Error('Unknown viewport type');
    }
  }

  /**
   * Removes the resize observer from the viewport element
   */
  _removeResizeObserver() {
    if (this.viewportGridResizeObserver) {
      this.viewportGridResizeObserver.disconnect();
    }
  }
  _getSlabThickness(displaySetOptions, volumeId) {
    const {
      blendMode
    } = displaySetOptions;
    if (blendMode === undefined || displaySetOptions.slabThickness === undefined) {
      return;
    }

    // if there is a slabThickness set as a number then use it
    if (typeof displaySetOptions.slabThickness === 'number') {
      return displaySetOptions.slabThickness;
    }
    if (displaySetOptions.slabThickness.toLowerCase() === 'fullvolume') {
      // calculate the slab thickness based on the volume dimensions
      const imageVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(volumeId);
      const {
        dimensions
      } = imageVolume;
      const slabThickness = Math.sqrt(dimensions[0] * dimensions[0] + dimensions[1] * dimensions[1] + dimensions[2] * dimensions[2]);
      return slabThickness;
    }
  }
  _getViewportAndDisplaySetOptions(publicViewportOptions, publicDisplaySetOptions, viewportInfo) {
    const viewportIndex = viewportInfo.getViewportIndex();

    // Creating a temporary viewportInfo to handle defaults
    const newViewportInfo = new _Viewport__WEBPACK_IMPORTED_MODULE_4__["default"](viewportIndex, viewportInfo.getViewportId());

    // To handle setting the default values if missing for the viewportOptions and
    // displaySetOptions
    newViewportInfo.setPublicViewportOptions(publicViewportOptions);
    newViewportInfo.setPublicDisplaySetOptions(publicDisplaySetOptions);
    const newViewportOptions = newViewportInfo.getViewportOptions();
    const newDisplaySetOptions = newViewportInfo.getDisplaySetOptions();
    return {
      viewportOptions: newViewportOptions,
      displaySetOptions: newDisplaySetOptions
    };
  }
  _getFrameOfReferenceUID(displaySetInstanceUID) {
    const {
      displaySetService
    } = this.servicesManager.services;
    const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    if (!displaySet) {
      return;
    }
    if (displaySet.frameOfReferenceUID) {
      return displaySet.frameOfReferenceUID;
    }
    if (displaySet.Modality === 'SEG') {
      const {
        instance
      } = displaySet;
      return instance.FrameOfReferenceUID;
    }
    if (displaySet.Modality === 'RTSTRUCT') {
      const {
        instance
      } = displaySet;
      return instance.ReferencedFrameOfReferenceSequence.FrameOfReferenceUID;
    }
    const {
      images
    } = displaySet;
    if (images && images.length) {
      return images[0].FrameOfReferenceUID;
    }
  }

  /**
   * Looks through the viewports to see if the specified measurement can be
   * displayed in one of the viewports.
   *
   * @param measurement
   *          The measurement that is desired to view.
   * @param activeViewportIndex - the index that was active at the time the jump
   *          was initiated.
   * @return the viewportIndex to display the given measurement
   */
  getViewportIndexToJump(activeViewportIndex, displaySetInstanceUID, cameraProps) {
    const viewportInfo = this.viewportsInfo.get(activeViewportIndex);
    const {
      referencedImageId
    } = cameraProps;
    if (viewportInfo?.contains(displaySetInstanceUID, referencedImageId)) {
      return activeViewportIndex;
    }
    return [...this.viewportsById.values()].find(viewportInfo => viewportInfo.contains(displaySetInstanceUID, referencedImageId))?.viewportIndex ?? -1;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
CornerstoneViewportService.REGISTRATION = {
  name: 'cornerstoneViewportService',
  altName: 'CornerstoneViewportService',
  create: _ref2 => {
    let {
      servicesManager
    } = _ref2;
    return new CornerstoneViewportService(servicesManager);
  }
};
const _default = CornerstoneViewportService;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EVENTS, "EVENTS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts");
  reactHotLoader.register(CornerstoneViewportService, "CornerstoneViewportService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/ViewportService/Viewport.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/ViewportService/Viewport.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _utils_getCornerstoneBlendMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/getCornerstoneBlendMode */ "../../../extensions/cornerstone/src/utils/getCornerstoneBlendMode.ts");
/* harmony import */ var _utils_getCornerstoneOrientation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/getCornerstoneOrientation */ "../../../extensions/cornerstone/src/utils/getCornerstoneOrientation.ts");
/* harmony import */ var _utils_getCornerstoneViewportType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/getCornerstoneViewportType */ "../../../extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const STACK = 'stack';
const DEFAULT_TOOLGROUP_ID = 'default';

// Return true if the data contains the given display set UID OR the imageId
// if it is a composite object.
const dataContains = (data, displaySetUID, imageId) => {
  if (data.displaySetInstanceUID === displaySetUID) return true;
  if (imageId && data.isCompositeStack && data.imageIds) {
    return !!data.imageIds.find(dataId => dataId === imageId);
  }
  return false;
};
class ViewportInfo {
  constructor(viewportIndex, viewportId) {
    this.viewportId = '';
    this.viewportIndex = void 0;
    this.element = void 0;
    this.viewportOptions = void 0;
    this.displaySetOptions = void 0;
    this.viewportData = void 0;
    this.renderingEngineId = void 0;
    this.destroy = () => {
      this.element = null;
      this.viewportData = null;
      this.viewportOptions = null;
      this.displaySetOptions = null;
    };
    this.viewportIndex = viewportIndex;
    this.viewportId = viewportId;
    this.setPublicViewportOptions({});
    this.setPublicDisplaySetOptions([{}]);
  }

  /**
   * Return true if the viewport contains the given display set UID,
   * OR if it is a composite stack and contains the given imageId
   */
  contains(displaySetUID, imageId) {
    if (!this.viewportData?.data) return false;
    if (this.viewportData.data.length) {
      return !!this.viewportData.data.find(data => dataContains(data, displaySetUID, imageId));
    }
    return dataContains(this.viewportData.data, displaySetUID, imageId);
  }
  setRenderingEngineId(renderingEngineId) {
    this.renderingEngineId = renderingEngineId;
  }
  getRenderingEngineId() {
    return this.renderingEngineId;
  }
  setViewportId(viewportId) {
    this.viewportId = viewportId;
  }
  setViewportIndex(viewportIndex) {
    this.viewportIndex = viewportIndex;
  }
  setElement(element) {
    this.element = element;
  }
  setViewportData(viewportData) {
    this.viewportData = viewportData;
  }
  getViewportData() {
    return this.viewportData;
  }
  getViewportIndex() {
    return this.viewportIndex;
  }
  getElement() {
    return this.element;
  }
  getViewportId() {
    return this.viewportId;
  }
  setPublicDisplaySetOptions(publicDisplaySetOptions) {
    // map the displaySetOptions and check if they are undefined then set them to default values
    const displaySetOptions = this.mapDisplaySetOptions(publicDisplaySetOptions);
    this.setDisplaySetOptions(displaySetOptions);
  }
  hasDisplaySet(displaySetInstanceUID) {
    // Todo: currently this does not work for non image & referenceImage displaySets.
    // Since SEG and other derived displaySets are loaded in a different way, and not
    // via cornerstoneViewportService
    let viewportData = this.getViewportData();
    if (viewportData.viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.ORTHOGRAPHIC) {
      viewportData = viewportData;
      return viewportData.data.some(_ref => {
        let {
          displaySetInstanceUID: dsUID
        } = _ref;
        return dsUID === displaySetInstanceUID;
      });
    }
    viewportData = viewportData;
    return viewportData.data.displaySetInstanceUID === displaySetInstanceUID;
  }
  setPublicViewportOptions(viewportOptionsEntry) {
    let viewportType = viewportOptionsEntry.viewportType;
    const {
      toolGroupId = DEFAULT_TOOLGROUP_ID,
      presentationIds
    } = viewportOptionsEntry;
    let orientation;
    if (!viewportType) {
      viewportType = (0,_utils_getCornerstoneViewportType__WEBPACK_IMPORTED_MODULE_3__["default"])(STACK);
    } else {
      viewportType = (0,_utils_getCornerstoneViewportType__WEBPACK_IMPORTED_MODULE_3__["default"])(viewportOptionsEntry.viewportType);
    }

    // map SAGITTAL, AXIAL, CORONAL orientation to be used by cornerstone
    if (viewportOptionsEntry.viewportType?.toLowerCase() !== STACK) {
      orientation = (0,_utils_getCornerstoneOrientation__WEBPACK_IMPORTED_MODULE_2__["default"])(viewportOptionsEntry.orientation);
    }
    if (!toolGroupId) {
      toolGroupId = DEFAULT_TOOLGROUP_ID;
    }
    this.setViewportOptions({
      ...viewportOptionsEntry,
      viewportId: this.viewportId,
      viewportType: viewportType,
      orientation,
      toolGroupId,
      presentationIds
    });
  }
  setViewportOptions(viewportOptions) {
    this.viewportOptions = viewportOptions;
  }
  getViewportOptions() {
    return this.viewportOptions;
  }
  setDisplaySetOptions(displaySetOptions) {
    this.displaySetOptions = displaySetOptions;
  }
  getSyncGroups() {
    this.viewportOptions.syncGroups ||= [];
    return this.viewportOptions.syncGroups;
  }
  getDisplaySetOptions() {
    return this.displaySetOptions;
  }
  getViewportType() {
    return this.viewportOptions.viewportType || _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.STACK;
  }
  getToolGroupId() {
    return this.viewportOptions.toolGroupId;
  }
  getBackground() {
    return this.viewportOptions.background || [0, 0, 0];
  }
  getOrientation() {
    return this.viewportOptions.orientation;
  }
  getInitialImageOptions() {
    return this.viewportOptions.initialImageOptions;
  }

  // Handle incoming public display set options or a display set select
  // with a contained options.
  mapDisplaySetOptions() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
    const displaySetOptions = [];
    options.forEach(item => {
      let option = item?.options || item;
      if (!option) {
        option = {
          blendMode: undefined,
          slabThickness: undefined,
          colormap: undefined,
          voi: {},
          voiInverted: false
        };
      }
      const blendMode = (0,_utils_getCornerstoneBlendMode__WEBPACK_IMPORTED_MODULE_1__["default"])(option.blendMode);
      displaySetOptions.push({
        voi: option.voi,
        voiInverted: option.voiInverted,
        colormap: option.colormap,
        slabThickness: option.slabThickness,
        blendMode,
        displayPreset: option.displayPreset
      });
    });
    return displaySetOptions;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
const _default = ViewportInfo;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(STACK, "STACK", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/Viewport.ts");
  reactHotLoader.register(DEFAULT_TOOLGROUP_ID, "DEFAULT_TOOLGROUP_ID", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/Viewport.ts");
  reactHotLoader.register(dataContains, "dataContains", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/Viewport.ts");
  reactHotLoader.register(ViewportInfo, "ViewportInfo", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/Viewport.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/Viewport.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/services/ViewportService/constants.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/services/ViewportService/constants.ts ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RENDERING_ENGINE_ID: () => (/* binding */ RENDERING_ENGINE_ID)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const RENDERING_ENGINE_ID = 'OHIFCornerstoneRenderingEngine';

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RENDERING_ENGINE_ID, "RENDERING_ENGINE_ID", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/services/ViewportService/constants.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/state.ts":
/*!****************************************************!*\
  !*** ../../../extensions/cornerstone/src/state.ts ***!
  \****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEnabledElement: () => (/* binding */ getEnabledElement),
/* harmony export */   reset: () => (/* binding */ reset),
/* harmony export */   setEnabledElement: () => (/* binding */ setEnabledElement)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const state = {
  // The `defaultContext` of an extension's commandsModule
  DEFAULT_CONTEXT: 'CORNERSTONE',
  enabledElements: {}
};

/**
 * Sets the enabled element `dom` reference for an active viewport.
 * @param {HTMLElement} dom Active viewport element.
 * @return void
 */
const setEnabledElement = (viewportIndex, element, context) => {
  const targetContext = context || state.DEFAULT_CONTEXT;
  state.enabledElements[viewportIndex] = {
    element,
    context: targetContext
  };
};

/**
 * Grabs the enabled element `dom` reference of an ative viewport.
 *
 * @return {HTMLElement} Active viewport element.
 */
const getEnabledElement = viewportIndex => {
  return state.enabledElements[viewportIndex];
};
const reset = () => {
  state.enabledElements = {};
};

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(state, "state", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/state.ts");
  reactHotLoader.register(setEnabledElement, "setEnabledElement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/state.ts");
  reactHotLoader.register(getEnabledElement, "getEnabledElement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/state.ts");
  reactHotLoader.register(reset, "reset", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/state.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/tools/CalibrationLineTool.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/tools/CalibrationLineTool.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   onCompletedCalibrationLine: () => (/* binding */ onCompletedCalibrationLine)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/callInputDialog */ "../../../extensions/cornerstone/src/utils/callInputDialog.tsx");
/* harmony import */ var _utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getActiveViewportEnabledElement */ "../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const {
  calibrateImageSpacing
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities;

/**
 * Calibration Line tool works almost the same as the
 */
class CalibrationLineTool extends _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.LengthTool {
  constructor() {
    super(...arguments);
    this._renderingViewport = void 0;
    this._lengthToolRenderAnnotation = this.renderAnnotation;
    this.renderAnnotation = (enabledElement, svgDrawingHelper) => {
      const {
        viewport
      } = enabledElement;
      this._renderingViewport = viewport;
      return this._lengthToolRenderAnnotation(enabledElement, svgDrawingHelper);
    };
  }
  _getTextLines(data, targetId) {
    const [canvasPoint1, canvasPoint2] = data.handles.points.map(p => this._renderingViewport.worldToCanvas(p));
    // for display, round to 2 decimal points
    const lengthPx = Math.round(calculateLength2(canvasPoint1, canvasPoint2) * 100) / 100;
    const textLines = [`${lengthPx}px`];
    return textLines;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
CalibrationLineTool.toolName = 'CalibrationLine';
function calculateLength2(point1, point2) {
  const dx = point1[0] - point2[0];
  const dy = point1[1] - point2[1];
  return Math.sqrt(dx * dx + dy * dy);
}
function calculateLength3(pos1, pos2) {
  const dx = pos1[0] - pos2[0];
  const dy = pos1[1] - pos2[1];
  const dz = pos1[2] - pos2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
const _default = CalibrationLineTool;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
function onCompletedCalibrationLine(servicesManager, csToolsEvent) {
  const {
    uiDialogService,
    viewportGridService
  } = servicesManager.services;

  // calculate length (mm) with the current Pixel Spacing
  const annotationAddedEventDetail = csToolsEvent.detail;
  const {
    annotation: {
      metadata,
      data: annotationData
    }
  } = annotationAddedEventDetail;
  const {
    referencedImageId: imageId
  } = metadata;
  const enabledElement = (0,_utils_getActiveViewportEnabledElement__WEBPACK_IMPORTED_MODULE_3__["default"])(viewportGridService);
  const {
    viewport
  } = enabledElement;
  const length = Math.round(calculateLength3(annotationData.handles.points[0], annotationData.handles.points[1]) * 100) / 100;

  // calculate the currently applied pixel spacing on the viewport
  const calibratedPixelSpacing = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('calibratedPixelSpacing', imageId);
  const imagePlaneModule = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('imagePlaneModule', imageId);
  const currentRowPixelSpacing = calibratedPixelSpacing?.[0] || imagePlaneModule?.rowPixelSpacing || 1;
  const currentColumnPixelSpacing = calibratedPixelSpacing?.[1] || imagePlaneModule?.columnPixelSpacing || 1;
  const adjustCalibration = newLength => {
    const spacingScale = newLength / length;
    const rowSpacing = spacingScale * currentRowPixelSpacing;
    const colSpacing = spacingScale * currentColumnPixelSpacing;

    // trigger resize of the viewport to adjust the world/pixel mapping
    calibrateImageSpacing(imageId, viewport.getRenderingEngine(), rowSpacing, colSpacing);
  };
  return new Promise((resolve, reject) => {
    if (!uiDialogService) {
      reject('UIDialogService is not initiated');
      return;
    }
    (0,_utils_callInputDialog__WEBPACK_IMPORTED_MODULE_2__["default"])(uiDialogService, {
      text: '',
      label: `${length}`
    }, (value, id) => {
      if (id === 'save') {
        adjustCalibration(Number.parseFloat(value));
        resolve(true);
      } else {
        reject('cancel');
      }
    }, false, {
      dialogTitle: 'Calibration',
      inputLabel: 'Actual Physical distance (mm)',
      // the input value must be a number
      validateFunc: val => {
        try {
          const v = Number.parseFloat(val);
          return !isNaN(v) && v !== 0.0;
        } catch {
          return false;
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
  reactHotLoader.register(calibrateImageSpacing, "calibrateImageSpacing", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/tools/CalibrationLineTool.ts");
  reactHotLoader.register(CalibrationLineTool, "CalibrationLineTool", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/tools/CalibrationLineTool.ts");
  reactHotLoader.register(calculateLength2, "calculateLength2", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/tools/CalibrationLineTool.ts");
  reactHotLoader.register(calculateLength3, "calculateLength3", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/tools/CalibrationLineTool.ts");
  reactHotLoader.register(onCompletedCalibrationLine, "onCompletedCalibrationLine", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/tools/CalibrationLineTool.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/tools/CalibrationLineTool.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/types/index.ts":
/*!**********************************************************!*\
  !*** ../../../extensions/cornerstone/src/types/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html2canvas */ "../../../node_modules/html2canvas/dist/html2canvas.esm.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state */ "../../../extensions/cornerstone/src/state.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const MINIMUM_SIZE = 100;
const DEFAULT_SIZE = 512;
const MAX_TEXTURE_SIZE = 10000;
const VIEWPORT_ID = 'cornerstone-viewport-download-form';
const CornerstoneViewportDownloadForm = _ref => {
  let {
    onClose,
    activeViewportIndex,
    cornerstoneViewportService
  } = _ref;
  const enabledElement = (0,_state__WEBPACK_IMPORTED_MODULE_6__.getEnabledElement)(activeViewportIndex);
  const activeViewportElement = enabledElement?.element;
  const activeViewportEnabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(activeViewportElement);
  const {
    viewportId: activeViewportId,
    renderingEngineId
  } = activeViewportEnabledElement;
  const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.ToolGroupManager.getToolGroupForViewport(activeViewportId, renderingEngineId);
  const toolModeAndBindings = Object.keys(toolGroup.toolOptions).reduce((acc, toolName) => {
    const tool = toolGroup.toolOptions[toolName];
    const {
      mode,
      bindings
    } = tool;
    return {
      ...acc,
      [toolName]: {
        mode,
        bindings
      }
    };
  }, {});
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      Object.keys(toolModeAndBindings).forEach(toolName => {
        const {
          mode,
          bindings
        } = toolModeAndBindings[toolName];
        toolGroup.setToolMode(toolName, mode, {
          bindings
        });
      });
    };
  }, []);
  const enableViewport = viewportElement => {
    if (viewportElement) {
      const {
        renderingEngine,
        viewport
      } = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(activeViewportElement);
      const viewportInput = {
        viewportId: VIEWPORT_ID,
        element: viewportElement,
        type: viewport.type,
        defaultOptions: {
          background: viewport.defaultOptions.background,
          orientation: viewport.defaultOptions.orientation
        }
      };
      renderingEngine.enableElement(viewportInput);
    }
  };
  const disableViewport = viewportElement => {
    if (viewportElement) {
      const {
        renderingEngine
      } = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(viewportElement);
      return new Promise(resolve => {
        renderingEngine.disableElement(VIEWPORT_ID);
      });
    }
  };
  const updateViewportPreview = (downloadViewportElement, internalCanvas, fileType) => new Promise(resolve => {
    const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(downloadViewportElement);
    const {
      viewport: downloadViewport,
      renderingEngine
    } = enabledElement;

    // Note: Since any trigger of dimensions will update the viewport,
    // we need to resize the offScreenCanvas to accommodate for the new
    // dimensions, this is due to the reason that we are using the GPU offScreenCanvas
    // to render the viewport for the downloadViewport.
    renderingEngine.resize();

    // Trigger the render on the viewport to update the on screen
    downloadViewport.render();
    downloadViewportElement.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_RENDERED, function updateViewport(event) {
      const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(event.target);
      const {
        viewport
      } = enabledElement;
      const {
        element
      } = viewport;
      const downloadCanvas = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getOrCreateCanvas)(element);
      const type = 'image/' + fileType;
      const dataUrl = downloadCanvas.toDataURL(type, 1);
      let newWidth = element.offsetHeight;
      let newHeight = element.offsetWidth;
      if (newWidth > DEFAULT_SIZE || newHeight > DEFAULT_SIZE) {
        const multiplier = DEFAULT_SIZE / Math.max(newWidth, newHeight);
        newHeight *= multiplier;
        newWidth *= multiplier;
      }
      resolve({
        dataUrl,
        width: newWidth,
        height: newHeight
      });
      downloadViewportElement.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_RENDERED, updateViewport);
    });
  });
  const loadImage = (activeViewportElement, viewportElement, width, height) => new Promise(resolve => {
    if (activeViewportElement && viewportElement) {
      const activeViewportEnabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(activeViewportElement);
      if (!activeViewportEnabledElement) {
        return;
      }
      const {
        viewport
      } = activeViewportEnabledElement;
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      const downloadViewport = renderingEngine.getViewport(VIEWPORT_ID);
      if (downloadViewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.StackViewport) {
        const imageId = viewport.getCurrentImageId();
        const properties = viewport.getProperties();
        downloadViewport.setStack([imageId]).then(() => {
          downloadViewport.setProperties(properties);
          const newWidth = Math.min(width || image.width, MAX_TEXTURE_SIZE);
          const newHeight = Math.min(height || image.height, MAX_TEXTURE_SIZE);
          resolve({
            width: newWidth,
            height: newHeight
          });
        });
      } else if (downloadViewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.VolumeViewport) {
        const actors = viewport.getActors();
        // downloadViewport.setActors(actors);
        actors.forEach(actor => {
          downloadViewport.addActor(actor);
        });
        downloadViewport.setCamera(viewport.getCamera());
        downloadViewport.render();
        const newWidth = Math.min(width || image.width, MAX_TEXTURE_SIZE);
        const newHeight = Math.min(height || image.height, MAX_TEXTURE_SIZE);
        resolve({
          width: newWidth,
          height: newHeight
        });
      }
    }
  });
  const toggleAnnotations = (toggle, viewportElement, activeViewportElement) => {
    const activeViewportEnabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(activeViewportElement);
    const downloadViewportElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(viewportElement);
    const {
      viewportId: activeViewportId,
      renderingEngineId
    } = activeViewportEnabledElement;
    const {
      viewportId: downloadViewportId
    } = downloadViewportElement;
    if (!activeViewportEnabledElement || !downloadViewportElement) {
      return;
    }
    const toolGroup = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.ToolGroupManager.getToolGroupForViewport(activeViewportId, renderingEngineId);

    // add the viewport to the toolGroup
    toolGroup.addViewport(downloadViewportId, renderingEngineId);
    Object.keys(toolGroup._toolInstances).forEach(toolName => {
      // make all tools Enabled so that they can not be interacted with
      // in the download viewport
      if (toggle && toolName !== 'Crosshairs') {
        try {
          toolGroup.setToolEnabled(toolName);
        } catch (e) {
          console.log(e);
        }
      } else {
        toolGroup.setToolDisabled(toolName);
      }
    });
  };
  const downloadBlob = (filename, fileType) => {
    const file = `${filename}.${fileType}`;
    const divForDownloadViewport = document.querySelector(`div[data-viewport-uid="${VIEWPORT_ID}"]`);
    (0,html2canvas__WEBPACK_IMPORTED_MODULE_1__["default"])(divForDownloadViewport).then(canvas => {
      const link = document.createElement('a');
      link.download = file;
      link.href = canvas.toDataURL(fileType, 1.0);
      link.click();
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.ViewportDownloadForm, {
    onClose: onClose,
    minimumSize: MINIMUM_SIZE,
    maximumSize: MAX_TEXTURE_SIZE,
    defaultSize: DEFAULT_SIZE,
    canvasClass: 'cornerstone-canvas',
    activeViewportElement: activeViewportElement,
    enableViewport: enableViewport,
    disableViewport: disableViewport,
    updateViewportPreview: updateViewportPreview,
    loadImage: loadImage,
    toggleAnnotations: toggleAnnotations,
    downloadBlob: downloadBlob
  });
};
__signature__(CornerstoneViewportDownloadForm, "useEffect{}");
CornerstoneViewportDownloadForm.propTypes = {
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  activeViewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number).isRequired
};
const _default = CornerstoneViewportDownloadForm;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(MINIMUM_SIZE, "MINIMUM_SIZE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
  reactHotLoader.register(DEFAULT_SIZE, "DEFAULT_SIZE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
  reactHotLoader.register(MAX_TEXTURE_SIZE, "MAX_TEXTURE_SIZE", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
  reactHotLoader.register(VIEWPORT_ID, "VIEWPORT_ID", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
  reactHotLoader.register(CornerstoneViewportDownloadForm, "CornerstoneViewportDownloadForm", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/DicomFileUploader.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/DicomFileUploader.ts ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTS: () => (/* binding */ EVENTS),
/* harmony export */   UploadRejection: () => (/* binding */ UploadRejection),
/* harmony export */   UploadStatus: () => (/* binding */ UploadStatus),
/* harmony export */   "default": () => (/* binding */ DicomFileUploader)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/dicom-image-loader */ "../../../node_modules/@cornerstonejs/dicom-image-loader/dist/dynamic-import/cornerstoneDICOMImageLoader.min.js");
/* harmony import */ var _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const EVENTS = {
  PROGRESS: 'event:DicomFileUploader:progress'
};
let UploadStatus = /*#__PURE__*/function (UploadStatus) {
  UploadStatus[UploadStatus["NotStarted"] = 0] = "NotStarted";
  UploadStatus[UploadStatus["InProgress"] = 1] = "InProgress";
  UploadStatus[UploadStatus["Success"] = 2] = "Success";
  UploadStatus[UploadStatus["Failed"] = 3] = "Failed";
  UploadStatus[UploadStatus["Cancelled"] = 4] = "Cancelled";
  return UploadStatus;
}({});
class UploadRejection {
  constructor(status, message) {
    this.message = void 0;
    this.status = void 0;
    this.message = message;
    this.status = status;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
class DicomFileUploader extends _ohif_core__WEBPACK_IMPORTED_MODULE_1__.PubSubService {
  constructor(file, dataSource) {
    super(EVENTS);
    this._file = void 0;
    this._fileId = void 0;
    this._dataSource = void 0;
    this._loadPromise = void 0;
    this._abortController = new AbortController();
    this._status = UploadStatus.NotStarted;
    this._percentComplete = 0;
    this._file = file;
    this._fileId = _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_0___default().wadouri.fileManager.add(file);
    this._dataSource = dataSource;
  }
  getFileId() {
    return this._fileId;
  }
  getFileName() {
    return this._file.name;
  }
  getFileSize() {
    return this._file.size;
  }
  cancel() {
    this._abortController.abort();
  }
  getStatus() {
    return this._status;
  }
  getPercentComplete() {
    return this._percentComplete;
  }
  async load() {
    if (this._loadPromise) {
      // Already started loading, return the load promise.
      return this._loadPromise;
    }
    this._loadPromise = new Promise((resolve, reject) => {
      // The upload listeners: fire progress events and/or settle the promise.
      const uploadCallbacks = {
        progress: evt => {
          if (!evt.lengthComputable) {
            // Progress computation is not possible.
            return;
          }
          this._status = UploadStatus.InProgress;
          this._percentComplete = Math.round(100 * evt.loaded / evt.total);
          this._broadcastEvent(EVENTS.PROGRESS, {
            fileId: this._fileId,
            percentComplete: this._percentComplete
          });
        },
        timeout: () => {
          this._reject(reject, new UploadRejection(UploadStatus.Failed, 'The request timed out.'));
        },
        abort: () => {
          this._reject(reject, new UploadRejection(UploadStatus.Cancelled, 'Cancelled'));
        },
        error: () => {
          this._reject(reject, new UploadRejection(UploadStatus.Failed, 'The request failed.'));
        }
      };

      // First try to load the file.
      _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_0___default().wadouri.loadFileRequest(this._fileId).then(dicomFile => {
        if (this._abortController.signal.aborted) {
          this._reject(reject, new UploadRejection(UploadStatus.Cancelled, 'Cancelled'));
          return;
        }
        if (!this._checkDicomFile(dicomFile)) {
          // The file is not DICOM
          this._reject(reject, new UploadRejection(UploadStatus.Failed, 'Not a valid DICOM file.'));
          return;
        }
        const request = new XMLHttpRequest();
        this._addRequestCallbacks(request, uploadCallbacks);

        // Do the actual upload by supplying the DICOM file and upload callbacks/listeners.
        return this._dataSource.store.dicom(dicomFile, request).then(() => {
          this._status = UploadStatus.Success;
          resolve();
        }).catch(reason => {
          this._reject(reject, reason);
        });
      }).catch(reason => {
        this._reject(reject, reason);
      });
    });
    return this._loadPromise;
  }
  _isRejected() {
    return this._status === UploadStatus.Failed || this._status === UploadStatus.Cancelled;
  }
  _reject(reject, reason) {
    if (this._isRejected()) {
      return;
    }
    if (reason instanceof UploadRejection) {
      this._status = reason.status;
      reject(reason);
      return;
    }
    this._status = UploadStatus.Failed;
    if (reason.message) {
      reject(new UploadRejection(UploadStatus.Failed, reason.message));
      return;
    }
    reject(new UploadRejection(UploadStatus.Failed, reason));
  }
  _addRequestCallbacks(request, uploadCallbacks) {
    const abortCallback = () => request.abort();
    this._abortController.signal.addEventListener('abort', abortCallback);
    for (const [eventName, callback] of Object.entries(uploadCallbacks)) {
      request.upload.addEventListener(eventName, callback);
    }
    const cleanUpCallback = () => {
      this._abortController.signal.removeEventListener('abort', abortCallback);
      for (const [eventName, callback] of Object.entries(uploadCallbacks)) {
        request.upload.removeEventListener(eventName, callback);
      }
      request.removeEventListener('loadend', cleanUpCallback);
    };
    request.addEventListener('loadend', cleanUpCallback);
  }
  _checkDicomFile(arrayBuffer) {
    if (arrayBuffer.length <= 132) return false;
    const arr = new Uint8Array(arrayBuffer.slice(128, 132));
    // bytes from 128 to 132 must be "DICM"
    return Array.from('DICM').every((char, i) => char.charCodeAt(0) === arr[i]);
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EVENTS, "EVENTS", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/DicomFileUploader.ts");
  reactHotLoader.register(UploadRejection, "UploadRejection", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/DicomFileUploader.ts");
  reactHotLoader.register(DicomFileUploader, "DicomFileUploader", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/DicomFileUploader.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/JumpPresets.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/JumpPresets.ts ***!
  \****************************************************************/
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
/**
 * Jump Presets - This enum defines the 3 jump states which are available
 * to be used with the jumpToSlice utility function.
 */
var JumpPresets = /*#__PURE__*/function (JumpPresets) {
  JumpPresets["First"] = "first";
  JumpPresets["Last"] = "last";
  JumpPresets["Middle"] = "middle";
  return JumpPresets;
}(JumpPresets || {});
const _default = JumpPresets;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/JumpPresets.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/callInputDialog.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/callInputDialog.tsx ***!
  \*********************************************************************/
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



/**
 *
 * @param {*} data
 * @param {*} data.text
 * @param {*} data.label
 * @param {*} event
 * @param {*} callback
 * @param {*} isArrowAnnotateInputDialog
 * @param {*} dialogConfig
 * @param {string?} dialogConfig.dialogTitle - title of the input dialog
 * @param {string?} dialogConfig.inputLabel - show label above the input
 */
function callInputDialog(uiDialogService, data, callback) {
  let isArrowAnnotateInputDialog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  let dialogConfig = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  const dialogId = 'dialog-enter-annotation';
  const label = data ? isArrowAnnotateInputDialog ? data.text : data.label : '';
  const {
    dialogTitle = 'Annotation',
    inputLabel = 'Enter your annotation',
    validateFunc = value => true
  } = dialogConfig;
  const onSubmitHandler = _ref => {
    let {
      action,
      value
    } = _ref;
    switch (action.id) {
      case 'save':
        if (typeof validateFunc === 'function' && !validateFunc(value.label)) return;
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
        title: dialogTitle,
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
          text: 'Save',
          type: 'secondary'
        }],
        onSubmit: onSubmitHandler,
        body: _ref2 => {
          let {
            value,
            setValue
          } = _ref2;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
            autoFocus: true,
            className: "bg-black border-primary-main",
            type: "text",
            id: "annotation",
            label: inputLabel,
            labelClassName: "text-white text-[14px] leading-[1.2]",
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
  reactHotLoader.register(callInputDialog, "callInputDialog", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/callInputDialog.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/callInputDialog.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/dicomLoaderService.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/dicomLoaderService.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/dicom-image-loader */ "../../../node_modules/@cornerstonejs/dicom-image-loader/dist/dynamic-import/cornerstoneDICOMImageLoader.min.js");
/* harmony import */ var _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const getImageId = imageObj => {
  if (!imageObj) {
    return;
  }
  return typeof imageObj.getImageId === 'function' ? imageObj.getImageId() : imageObj.url;
};
const findImageIdOnStudies = (studies, displaySetInstanceUID) => {
  const study = studies.find(study => {
    const displaySet = study.displaySets.some(displaySet => displaySet.displaySetInstanceUID === displaySetInstanceUID);
    return displaySet;
  });
  const {
    series = []
  } = study;
  const {
    instances = []
  } = series[0] || {};
  const instance = instances[0];
  return getImageId(instance);
};
const someInvalidStrings = strings => {
  const stringsArray = Array.isArray(strings) ? strings : [strings];
  const emptyString = string => !string;
  let invalid = stringsArray.some(emptyString);
  return invalid;
};
const getImageInstance = dataset => {
  return dataset && dataset.images && dataset.images[0];
};
const getNonImageInstance = dataset => {
  return dataset && dataset.instance;
};
const getImageInstanceId = imageInstance => {
  return getImageId(imageInstance);
};
const fetchIt = function (url) {
  let headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ohif_core__WEBPACK_IMPORTED_MODULE_3__.DICOMWeb.getAuthorizationHeader();
  return fetch(url, headers).then(response => response.arrayBuffer());
};
const cornerstoneRetriever = imageId => {
  return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.imageLoader.loadAndCacheImage(imageId).then(image => {
    return image && image.data && image.data.byteArray.buffer;
  });
};
const wadorsRetriever = function (url, studyInstanceUID, seriesInstanceUID, sopInstanceUID) {
  let headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _ohif_core__WEBPACK_IMPORTED_MODULE_3__.DICOMWeb.getAuthorizationHeader();
  let errorInterceptor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _ohif_core__WEBPACK_IMPORTED_MODULE_3__.errorHandler.getHTTPErrorHandler();
  const config = {
    url,
    headers,
    errorInterceptor
  };
  const dicomWeb = new dicomweb_client__WEBPACK_IMPORTED_MODULE_2__.api.DICOMwebClient(config);
  return dicomWeb.retrieveInstance({
    studyInstanceUID,
    seriesInstanceUID,
    sopInstanceUID
  });
};
const getImageLoaderType = imageId => {
  const loaderRegExp = /^\w+\:/;
  const loaderType = loaderRegExp.exec(imageId);
  return loaderRegExp.lastIndex === 0 && loaderType && loaderType[0] && loaderType[0].replace(':', '') || '';
};
class DicomLoaderService {
  getLocalData(dataset, studies) {
    // Use referenced imageInstance
    const imageInstance = getImageInstance(dataset);
    const nonImageInstance = getNonImageInstance(dataset);
    if (!imageInstance && !nonImageInstance || !nonImageInstance.imageId.startsWith('dicomfile')) {
      return;
    }
    const instance = imageInstance || nonImageInstance;
    let imageId = getImageInstanceId(instance);

    // or Try to get it from studies
    if (someInvalidStrings(imageId)) {
      imageId = findImageIdOnStudies(studies, dataset.displaySetInstanceUID);
    }
    if (!someInvalidStrings(imageId)) {
      return _cornerstonejs_dicom_image_loader__WEBPACK_IMPORTED_MODULE_1___default().wadouri.loadFileRequest(imageId);
    }
  }
  getDataByImageType(dataset) {
    const imageInstance = getImageInstance(dataset);
    if (imageInstance) {
      const imageId = getImageInstanceId(imageInstance);
      let getDicomDataMethod = fetchIt;
      const loaderType = getImageLoaderType(imageId);
      switch (loaderType) {
        case 'dicomfile':
          getDicomDataMethod = cornerstoneRetriever.bind(this, imageId);
          break;
        case 'wadors':
          const url = imageInstance.getData().wadoRoot;
          const studyInstanceUID = imageInstance.getStudyInstanceUID();
          const seriesInstanceUID = imageInstance.getSeriesInstanceUID();
          const sopInstanceUID = imageInstance.getSOPInstanceUID();
          const invalidParams = someInvalidStrings([url, studyInstanceUID, seriesInstanceUID, sopInstanceUID]);
          if (invalidParams) {
            return;
          }
          getDicomDataMethod = wadorsRetriever.bind(this, url, studyInstanceUID, seriesInstanceUID, sopInstanceUID);
          break;
        case 'wadouri':
          // Strip out the image loader specifier
          imageId = imageId.substring(imageId.indexOf(':') + 1);
          if (someInvalidStrings(imageId)) {
            return;
          }
          getDicomDataMethod = fetchIt.bind(this, imageId);
          break;
        default:
          throw new Error(`Unsupported image type: ${loaderType} for imageId: ${imageId}`);
      }
      return getDicomDataMethod();
    }
  }
  getDataByDatasetType(dataset) {
    const {
      StudyInstanceUID,
      SeriesInstanceUID,
      SOPInstanceUID,
      authorizationHeaders,
      wadoRoot,
      wadoUri
    } = dataset;
    // Retrieve wadors or just try to fetch wadouri
    if (!someInvalidStrings(wadoRoot)) {
      return wadorsRetriever(wadoRoot, StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, authorizationHeaders);
    } else if (!someInvalidStrings(wadoUri)) {
      return fetchIt(wadoUri, {
        headers: authorizationHeaders
      });
    }
  }
  *getLoaderIterator(dataset, studies, headers) {
    yield this.getLocalData(dataset, studies);
    yield this.getDataByImageType(dataset);
    yield this.getDataByDatasetType(dataset);
  }
  findDicomDataPromise(dataset, studies, headers) {
    dataset.authorizationHeaders = headers;
    const loaderIterator = this.getLoaderIterator(dataset, studies);
    // it returns first valid retriever method.
    for (const loader of loaderIterator) {
      if (loader) {
        return loader;
      }
    }

    // in case of no valid loader
    throw new Error('Invalid dicom data loader');
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
const dicomLoaderService = new DicomLoaderService();
const _default = dicomLoaderService;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getImageId, "getImageId", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(findImageIdOnStudies, "findImageIdOnStudies", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(someInvalidStrings, "someInvalidStrings", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(getImageInstance, "getImageInstance", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(getNonImageInstance, "getNonImageInstance", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(getImageInstanceId, "getImageInstanceId", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(fetchIt, "fetchIt", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(cornerstoneRetriever, "cornerstoneRetriever", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(wadorsRetriever, "wadorsRetriever", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(getImageLoaderType, "getImageLoaderType", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(DicomLoaderService, "DicomLoaderService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(dicomLoaderService, "dicomLoaderService", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/dicomLoaderService.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/findNearbyToolData.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/findNearbyToolData.ts ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findNearbyToolData: () => (/* binding */ findNearbyToolData)
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
 * Finds tool nearby event position triggered.
 *
 * @param {Object} commandsManager mannager of commands
 * @param {Object} event that has being triggered
 * @returns cs toolData or undefined if not found.
 */
const findNearbyToolData = (commandsManager, evt) => {
  if (!evt?.detail) {
    return;
  }
  const {
    element,
    currentPoints
  } = evt.detail;
  return commandsManager.runCommand('getNearbyAnnotation', {
    element,
    canvasCoordinates: currentPoints?.canvas
  }, 'CORNERSTONE');
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(findNearbyToolData, "findNearbyToolData", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/findNearbyToolData.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getActiveViewportEnabledElement)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state */ "../../../extensions/cornerstone/src/state.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function getActiveViewportEnabledElement(viewportGridService) {
  const {
    activeViewportIndex
  } = viewportGridService.getState();
  const {
    element
  } = (0,_state__WEBPACK_IMPORTED_MODULE_1__.getEnabledElement)(activeViewportIndex) || {};
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getEnabledElement)(element);
  return enabledElement;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getActiveViewportEnabledElement, "getActiveViewportEnabledElement", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/getCornerstoneBlendMode.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/getCornerstoneBlendMode.ts ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCornerstoneBlendMode)
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

const MIP = 'mip';
function getCornerstoneBlendMode(blendMode) {
  if (!blendMode) {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.BlendModes.COMPOSITE;
  }
  if (blendMode.toLowerCase() === MIP) {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.BlendModes.MAXIMUM_INTENSITY_BLEND;
  }
  throw new Error();
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(MIP, "MIP", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneBlendMode.ts");
  reactHotLoader.register(getCornerstoneBlendMode, "getCornerstoneBlendMode", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneBlendMode.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/getCornerstoneOrientation.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/getCornerstoneOrientation.ts ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCornerstoneOrientation)
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

const AXIAL = 'axial';
const SAGITTAL = 'sagittal';
const CORONAL = 'coronal';
function getCornerstoneOrientation(orientation) {
  if (orientation) {
    switch (orientation.toLowerCase()) {
      case AXIAL:
        return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.OrientationAxis.AXIAL;
      case SAGITTAL:
        return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.OrientationAxis.SAGITTAL;
      case CORONAL:
        return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.OrientationAxis.CORONAL;
      default:
        return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.OrientationAxis.ACQUISITION;
    }
  }
  return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.OrientationAxis.ACQUISITION;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(AXIAL, "AXIAL", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneOrientation.ts");
  reactHotLoader.register(SAGITTAL, "SAGITTAL", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneOrientation.ts");
  reactHotLoader.register(CORONAL, "CORONAL", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneOrientation.ts");
  reactHotLoader.register(getCornerstoneOrientation, "getCornerstoneOrientation", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneOrientation.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/getCornerstoneViewportType.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/getCornerstoneViewportType.ts ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCornerstoneViewportType)
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

const STACK = 'stack';
const VOLUME = 'volume';
const ORTHOGRAPHIC = 'orthographic';
const VOLUME_3D = 'volume3d';
function getCornerstoneViewportType(viewportType) {
  const lowerViewportType = viewportType.toLowerCase();
  if (lowerViewportType === STACK) {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.STACK;
  }
  if (lowerViewportType === VOLUME || lowerViewportType === ORTHOGRAPHIC) {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.ORTHOGRAPHIC;
  }
  if (lowerViewportType === VOLUME_3D) {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.ViewportType.VOLUME_3D;
  }
  throw new Error(`Invalid viewport type: ${viewportType}. Valid types are: stack, volume`);
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(STACK, "STACK", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
  reactHotLoader.register(VOLUME, "VOLUME", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
  reactHotLoader.register(ORTHOGRAPHIC, "ORTHOGRAPHIC", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
  reactHotLoader.register(VOLUME_3D, "VOLUME_3D", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
  reactHotLoader.register(getCornerstoneViewportType, "getCornerstoneViewportType", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getCornerstoneViewportType.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/getInterleavedFrames.js":
/*!*************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/getInterleavedFrames.js ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getInterleavedFrames)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
function getInterleavedFrames(imageIds) {
  const minImageIdIndex = 0;
  const maxImageIdIndex = imageIds.length - 1;
  const middleImageIdIndex = Math.floor(imageIds.length / 2);
  let lowerImageIdIndex = middleImageIdIndex;
  let upperImageIdIndex = middleImageIdIndex;

  // Build up an array of images to prefetch, starting with the current image.
  const imageIdsToPrefetch = [{
    imageId: imageIds[middleImageIdIndex],
    imageIdIndex: middleImageIdIndex
  }];
  const prefetchQueuedFilled = {
    currentPositionDownToMinimum: false,
    currentPositionUpToMaximum: false
  };

  // Check if on edges and some criteria is already fulfilled

  if (middleImageIdIndex === minImageIdIndex) {
    prefetchQueuedFilled.currentPositionDownToMinimum = true;
  } else if (middleImageIdIndex === maxImageIdIndex) {
    prefetchQueuedFilled.currentPositionUpToMaximum = true;
  }
  while (!prefetchQueuedFilled.currentPositionDownToMinimum || !prefetchQueuedFilled.currentPositionUpToMaximum) {
    if (!prefetchQueuedFilled.currentPositionDownToMinimum) {
      // Add imageId bellow
      lowerImageIdIndex--;
      imageIdsToPrefetch.push({
        imageId: imageIds[lowerImageIdIndex],
        imageIdIndex: lowerImageIdIndex
      });
      if (lowerImageIdIndex === minImageIdIndex) {
        prefetchQueuedFilled.currentPositionDownToMinimum = true;
      }
    }
    if (!prefetchQueuedFilled.currentPositionUpToMaximum) {
      // Add imageId above
      upperImageIdIndex++;
      imageIdsToPrefetch.push({
        imageId: imageIds[upperImageIdIndex],
        imageIdIndex: upperImageIdIndex
      });
      if (upperImageIdIndex === maxImageIdIndex) {
        prefetchQueuedFilled.currentPositionUpToMaximum = true;
      }
    }
  }
  return imageIdsToPrefetch;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getInterleavedFrames, "getInterleavedFrames", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getInterleavedFrames.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/getNthFrames.js":
/*!*****************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/getNthFrames.js ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNthFrames)
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
 * Returns a re-ordered array consisting of, in order:
 *    1. First few objects
 *    2. Center objects
 *    3. Last few objects
 *    4. nth Objects (n=7), set 2
 *    5. nth Objects set 5,
 *    6. Remaining objects
 * What this does is return the first/center/start objects, as those
 * are often used first, then a selection of objects scattered over the
 * instances in order to allow making requests over a set of image instances.
 *
 * @param {[]} imageIds
 * @returns [] reordered to be an nth selection
 */
function getNthFrames(imageIds) {
  const frames = [[], [], [], [], []];
  const centerStart = imageIds.length / 2 - 3;
  const centerEnd = centerStart + 6;
  for (let i = 0; i < imageIds.length; i++) {
    if (i < 2 || i > imageIds.length - 4 || i > centerStart && i < centerEnd) {
      frames[0].push(imageIds[i]);
    } else if (i % 7 === 2) {
      frames[1].push(imageIds[i]);
    } else if (i % 7 === 5) {
      frames[2].push(imageIds[i]);
    } else {
      frames[i % 2 + 3].push(imageIds[i]);
    }
  }
  const ret = [...frames[0], ...frames[1], ...frames[2], ...frames[3], ...frames[4]];
  return ret;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getNthFrames, "getNthFrames", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/getNthFrames.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/interleave.js":
/*!***************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/interleave.js ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ interleave)
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
 * Interleave the items from all the lists so that the first items are first
 * in the returned list, the second items are next etc.
 * Does this in a O(n) fashion, and return lists[0] if there is only one list.
 *
 * @param {[]} lists
 * @returns [] reordered to be breadth first traversal of lists
 */
function interleave(lists) {
  if (!lists || !lists.length) return [];
  if (lists.length === 1) return lists[0];
  console.time('interleave');
  const useLists = [...lists];
  const ret = [];
  for (let i = 0; useLists.length > 0; i++) {
    for (const list of useLists) {
      if (i >= list.length) {
        useLists.splice(useLists.indexOf(list), 1);
        continue;
      }
      ret.push(list[i]);
    }
  }
  console.timeEnd('interleave');
  return ret;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(interleave, "interleave", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleave.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/interleaveCenterLoader.ts":
/*!***************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/interleaveCenterLoader.ts ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ interleaveCenterLoader)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _getInterleavedFrames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getInterleavedFrames */ "../../../extensions/cornerstone/src/utils/getInterleavedFrames.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




// Map of volumeId and SeriesInstanceId
const volumeIdMapsToLoad = new Map();
const viewportIdVolumeInputArrayMap = new Map();

/**
 * This function caches the volumeUIDs until all the volumes inside the
 * hanging protocol are initialized. Then it goes through the imageIds
 * of the volumes, and interleave them, in order for the volumes to be loaded
 * together from middle to the start and the end.
 * @param {Object} props image loading properties from Cornerstone ViewportService
 * @returns
 */
function interleaveCenterLoader(_ref) {
  let {
    data: {
      viewportId,
      volumeInputArray
    },
    displaySetsMatchDetails,
    viewportMatchDetails: matchDetails
  } = _ref;
  viewportIdVolumeInputArrayMap.set(viewportId, volumeInputArray);

  // Based on the volumeInputs store the volumeIds and SeriesInstanceIds
  // to keep track of the volumes being loaded
  for (const volumeInput of volumeInputArray) {
    const {
      volumeId
    } = volumeInput;
    const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
    if (!volume) {
      return;
    }

    // if the volumeUID is not in the volumeUIDs array, add it
    if (!volumeIdMapsToLoad.has(volumeId)) {
      const {
        metadata
      } = volume;
      volumeIdMapsToLoad.set(volumeId, metadata.SeriesInstanceUID);
    }
  }

  /**
   * The following is checking if all the viewports that were matched in the HP has been
   * successfully created their cornerstone viewport or not. Todo: This can be
   * improved by not checking it, and as soon as the matched DisplaySets have their
   * volume loaded, we start the loading, but that comes at the cost of viewports
   * not being created yet (e.g., in a 10 viewport ptCT fusion, when one ct viewport and one
   * pt viewport are created we have a guarantee that the volumes are created in the cache
   * but the rest of the viewports (fusion, mip etc.) are not created yet. So
   * we can't initiate setting the volumes for those viewports. One solution can be
   * to add an event when a viewport is created (not enabled element event) and then
   * listen to it and as the other viewports are created we can set the volumes for them
   * since volumes are already started loading.
   */
  if (matchDetails.size !== viewportIdVolumeInputArrayMap.size) {
    return;
  }

  // Check if all the matched volumes are loaded
  for (const [_, details] of displaySetsMatchDetails.entries()) {
    const {
      SeriesInstanceUID
    } = details;

    // HangingProtocol has matched, but don't have all the volumes created yet, so return
    if (!Array.from(volumeIdMapsToLoad.values()).includes(SeriesInstanceUID)) {
      return;
    }
  }
  const volumeIds = Array.from(volumeIdMapsToLoad.keys()).slice();
  // get volumes from cache
  const volumes = volumeIds.map(volumeId => {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
  });

  // iterate over all volumes, and get their imageIds, and interleave
  // the imageIds and save them in AllRequests for later use
  const AllRequests = [];
  volumes.forEach(volume => {
    const requests = volume.getImageLoadRequests();
    if (!requests.length || !requests[0] || !requests[0].imageId) {
      return;
    }
    const requestImageIds = requests.map(request => {
      return request.imageId;
    });
    const imageIds = (0,_getInterleavedFrames__WEBPACK_IMPORTED_MODULE_1__["default"])(requestImageIds);
    const reOrderedRequests = imageIds.map(_ref2 => {
      let {
        imageId
      } = _ref2;
      const request = requests.find(req => req.imageId === imageId);
      return request;
    });
    AllRequests.push(reOrderedRequests);
  });

  // flatten the AllRequests array, which will result in a list of all the
  // imageIds for all the volumes but interleaved
  const interleavedRequests = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.compact)((0,lodash__WEBPACK_IMPORTED_MODULE_2__.flatten)((0,lodash__WEBPACK_IMPORTED_MODULE_2__.zip)(...AllRequests)));

  // set the finalRequests to the imageLoadPoolManager
  const finalRequests = [];
  interleavedRequests.forEach(request => {
    const {
      imageId
    } = request;
    AllRequests.forEach(volumeRequests => {
      const volumeImageIdRequest = volumeRequests.find(req => req.imageId === imageId);
      if (volumeImageIdRequest) {
        finalRequests.push(volumeImageIdRequest);
      }
    });
  });
  const requestType = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.RequestType.Prefetch;
  const priority = 0;
  finalRequests.forEach(_ref3 => {
    let {
      callLoadImage,
      additionalDetails,
      imageId,
      imageIdIndex,
      options
    } = _ref3;
    const callLoadImageBound = callLoadImage.bind(null, imageId, imageIdIndex, options);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.imageLoadPoolManager.addRequest(callLoadImageBound, requestType, additionalDetails, priority);
  });

  // clear the volumeIdMapsToLoad
  volumeIdMapsToLoad.clear();

  // copy the viewportIdVolumeInputArrayMap
  const viewportIdVolumeInputArrayMapCopy = new Map(viewportIdVolumeInputArrayMap);

  // reset the viewportIdVolumeInputArrayMap
  viewportIdVolumeInputArrayMap.clear();
  return viewportIdVolumeInputArrayMapCopy;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(volumeIdMapsToLoad, "volumeIdMapsToLoad", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleaveCenterLoader.ts");
  reactHotLoader.register(viewportIdVolumeInputArrayMap, "viewportIdVolumeInputArrayMap", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleaveCenterLoader.ts");
  reactHotLoader.register(interleaveCenterLoader, "interleaveCenterLoader", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleaveCenterLoader.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/interleaveTopToBottom.ts":
/*!**************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/interleaveTopToBottom.ts ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ interleaveTopToBottom)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



// Map of volumeId and SeriesInstanceId
const volumeIdMapsToLoad = new Map();
const viewportIdVolumeInputArrayMap = new Map();

/**
 * This function caches the volumeIds until all the volumes inside the
 * hanging protocol are initialized. Then it goes through the imageIds
 * of the volumes, and interleave them, in order for the volumes to be loaded
 * together from middle to the start and the end.
 * @param {Object} {viewportData, displaySetMatchDetails}
 * @returns
 */
function interleaveTopToBottom(_ref) {
  let {
    data: {
      viewportId,
      volumeInputArray
    },
    displaySetsMatchDetails,
    viewportMatchDetails: matchDetails
  } = _ref;
  viewportIdVolumeInputArrayMap.set(viewportId, volumeInputArray);

  // Based on the volumeInputs store the volumeIds and SeriesInstanceIds
  // to keep track of the volumes being loaded
  for (const volumeInput of volumeInputArray) {
    const {
      volumeId
    } = volumeInput;
    const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
    if (!volume) {
      return;
    }

    // if the volumeUID is not in the volumeUIDs array, add it
    if (!volumeIdMapsToLoad.has(volumeId)) {
      const {
        metadata
      } = volume;
      volumeIdMapsToLoad.set(volumeId, metadata.SeriesInstanceUID);
    }
  }

  /**
   * The following is checking if all the viewports that were matched in the HP has been
   * successfully created their cornerstone viewport or not. Todo: This can be
   * improved by not checking it, and as soon as the matched DisplaySets have their
   * volume loaded, we start the loading, but that comes at the cost of viewports
   * not being created yet (e.g., in a 10 viewport ptCT fusion, when one ct viewport and one
   * pt viewport are created we have a guarantee that the volumes are created in the cache
   * but the rest of the viewports (fusion, mip etc.) are not created yet. So
   * we can't initiate setting the volumes for those viewports. One solution can be
   * to add an event when a viewport is created (not enabled element event) and then
   * listen to it and as the other viewports are created we can set the volumes for them
   * since volumes are already started loading.
   */
  if (matchDetails.size !== viewportIdVolumeInputArrayMap.size) {
    return;
  }

  // Check if all the matched volumes are loaded
  for (const [_, details] of displaySetsMatchDetails.entries()) {
    const {
      SeriesInstanceUID
    } = details;

    // HangingProtocol has matched, but don't have all the volumes created yet, so return
    if (!Array.from(volumeIdMapsToLoad.values()).includes(SeriesInstanceUID)) {
      return;
    }
  }
  const volumeIds = Array.from(volumeIdMapsToLoad.keys()).slice();
  // get volumes from cache
  const volumes = volumeIds.map(volumeId => {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
  });

  // iterate over all volumes, and get their imageIds, and interleave
  // the imageIds and save them in AllRequests for later use
  const AllRequests = [];
  volumes.forEach(volume => {
    const requests = volume.getImageLoadRequests();
    if (!requests.length || !requests[0] || !requests[0].imageId) {
      return;
    }

    // reverse the requests
    AllRequests.push(requests.reverse());
  });

  // flatten the AllRequests array, which will result in a list of all the
  // imageIds for all the volumes but interleaved
  const interleavedRequests = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.compact)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.flatten)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.zip)(...AllRequests)));

  // set the finalRequests to the imageLoadPoolManager
  const finalRequests = [];
  interleavedRequests.forEach(request => {
    const {
      imageId
    } = request;
    AllRequests.forEach(volumeRequests => {
      const volumeImageIdRequest = volumeRequests.find(req => req.imageId === imageId);
      if (volumeImageIdRequest) {
        finalRequests.push(volumeImageIdRequest);
      }
    });
  });
  const requestType = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.RequestType.Prefetch;
  const priority = 0;
  finalRequests.forEach(_ref2 => {
    let {
      callLoadImage,
      additionalDetails,
      imageId,
      imageIdIndex,
      options
    } = _ref2;
    const callLoadImageBound = callLoadImage.bind(null, imageId, imageIdIndex, options);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.imageLoadPoolManager.addRequest(callLoadImageBound, requestType, additionalDetails, priority);
  });

  // clear the volumeIdMapsToLoad
  volumeIdMapsToLoad.clear();

  // copy the viewportIdVolumeInputArrayMap
  const viewportIdVolumeInputArrayMapCopy = new Map(viewportIdVolumeInputArrayMap);

  // reset the viewportIdVolumeInputArrayMap
  viewportIdVolumeInputArrayMap.clear();
  return viewportIdVolumeInputArrayMapCopy;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(volumeIdMapsToLoad, "volumeIdMapsToLoad", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleaveTopToBottom.ts");
  reactHotLoader.register(viewportIdVolumeInputArrayMap, "viewportIdVolumeInputArrayMap", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleaveTopToBottom.ts");
  reactHotLoader.register(interleaveTopToBottom, "interleaveTopToBottom", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/interleaveTopToBottom.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const Angle = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, CornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations?.[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, DisplaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return;
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      angle
    } = targetStats;
    const unit = '\u00B0';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      angle
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Angle');
  mappedAnnotations.forEach(annotation => {
    const {
      angle,
      unit
    } = annotation;
    columns.push(`Angle (${unit})`);
    values.push(angle);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    angle,
    unit,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (angle === undefined) return displayText;
  const roundedAngle = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils.roundNumber(angle, 2);
  displayText.push(`${roundedAngle} ${unit} (S: ${SeriesNumber}${instanceText}${frameText})`);
  return displayText;
}
const _default = Angle;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Angle, "Angle", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const Length = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.text,
      text: data.text,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport: () => {
        throw new Error('Not implemented');
      }
    };
  }
};
function getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    text
  } = data;
  const {
    referencedImageId
  } = metadata;
  const annotations = [];
  const {
    SOPInstanceUID,
    SeriesInstanceUID,
    frameNumber
  } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
  const displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
  const {
    SeriesNumber
  } = displaySet;
  annotations.push({
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesNumber,
    frameNumber,
    text
  });
  return annotations;
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  displayText.push(`(S: ${SeriesNumber}${instanceText}${frameText})`);
  return displayText;
}
const _default = Length;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Length, "Length", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const Bidirectional = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId,
    referencedSeriesInstanceUID
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      length,
      width
    } = targetStats;
    const unit = 'mm';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      length,
      width
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Bidirectional');
  mappedAnnotations.forEach(annotation => {
    const {
      length,
      width
    } = annotation;
    columns.push(`Length (mm)`, `Width (mm)`);
    values.push(length, width);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    length,
    width,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const roundedLength = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils.roundNumber(length, 2);
  const roundedWidth = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils.roundNumber(width, 2);
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  displayText.push(`L: ${roundedLength} mm (S: ${SeriesNumber}${instanceText}${frameText})`);
  displayText.push(`W: ${roundedWidth} mm`);
  return displayText;
}
const _default = Bidirectional;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Bidirectional, "Bidirectional", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _utils_getModalityUnit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getModalityUnit */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const CircleROI = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, DisplaySetService, CornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, CornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = DisplaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, DisplaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, DisplaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      // Todo: Non-acquisition plane measurement mapping not supported yet
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality
    } = targetStats;
    const unit = (0,_utils_getModalityUnit__WEBPACK_IMPORTED_MODULE_2__["default"])(Modality);
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit,
      mean,
      stdDev,
      max,
      area
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:CircleROI');
  mappedAnnotations.forEach(annotation => {
    const {
      mean,
      stdDev,
      max,
      area,
      unit
    } = annotation;
    if (!mean || !unit || !max || !area) {
      return;
    }
    columns.push(`max (${unit})`, `mean (${unit})`, `std (${unit})`, `area (mm2)`);
    values.push(max, mean, stdDev, area);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';

  // Area sometimes becomes undefined if `preventHandleOutsideImage` is off.
  const roundedArea = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils.roundNumber(area || 0, 2);
  displayText.push(`${roundedArea} mm<sup>2</sup>`);

  // Todo: we need a better UI for displaying all these information
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    let maxStr = '';
    if (max) {
      const roundedMax = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils.roundNumber(max, 2);
      maxStr = `Max: ${roundedMax} <small>${unit}</small> `;
    }
    const str = `${maxStr}(S:${SeriesNumber}${instanceText}${frameText})`;
    if (!displayText.includes(str)) {
      displayText.push(str);
    }
  });
  return displayText;
}
const _default = CircleROI;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(CircleROI, "CircleROI", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const CobbAngle = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Cobb Angle tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, CornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations?.[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, DisplaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return;
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      angle
    } = targetStats;
    const unit = '\u00B0';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      angle
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:CobbAngle');
  mappedAnnotations.forEach(annotation => {
    const {
      angle,
      unit
    } = annotation;
    columns.push(`Angle (${unit})`);
    values.push(angle);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    angle,
    unit,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (angle === undefined) return displayText;
  const roundedAngle = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils.roundNumber(angle, 2);
  displayText.push(`${roundedAngle} ${unit} (S: ${SeriesNumber}${instanceText}${frameText})`);
  return displayText;
}
const _default = CobbAngle;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(CobbAngle, "CobbAngle", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _utils_getModalityUnit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getModalityUnit */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const EllipticalROI = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      // Todo: Non-acquisition plane measurement mapping not supported yet
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality
    } = targetStats;
    const unit = (0,_utils_getModalityUnit__WEBPACK_IMPORTED_MODULE_2__["default"])(Modality);
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit,
      mean,
      stdDev,
      max,
      area
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:EllipticalROI');
  mappedAnnotations.forEach(annotation => {
    const {
      mean,
      stdDev,
      max,
      area,
      unit
    } = annotation;
    if (!mean || !unit || !max || !area) {
      return;
    }
    columns.push(`max (${unit})`, `mean (${unit})`, `std (${unit})`, `area (mm2)`);
    values.push(max, mean, stdDev, area);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';

  // Area sometimes becomes undefined if `preventHandleOutsideImage` is off.
  const roundedArea = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils.roundNumber(area || 0, 2);
  displayText.push(`${roundedArea} mm<sup>2</sup>`);

  // Todo: we need a better UI for displaying all these information
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    let maxStr = '';
    if (max) {
      const roundedMax = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils.roundNumber(max, 2);
      maxStr = `Max: ${roundedMax} <small>${unit}</small> `;
    }
    const str = `${maxStr}(S:${SeriesNumber}${instanceText}${frameText})`;
    if (!displayText.includes(str)) {
      displayText.push(str);
    }
  });
  return displayText;
}
const _default = EllipticalROI;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(EllipticalROI, "EllipticalROI", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts":
/*!**************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const Length = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      length
    } = targetStats;
    const unit = 'mm';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      length
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Length');
  mappedAnnotations.forEach(annotation => {
    const {
      length
    } = annotation;
    columns.push(`Length (mm)`);
    values.push(length);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    length,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (length === null || length === undefined) return displayText;
  const roundedLength = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils.roundNumber(length, 2);
  displayText.push(`${roundedLength} mm (S: ${SeriesNumber}${instanceText}${frameText})`);
  return displayText;
}
const _default = Length;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Length, "Length", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const PlanarFreehandROI = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, DisplaySetService, CornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('PlanarFreehandROI tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, CornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = DisplaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, DisplaySetService);
    const displayText = getDisplayText(mappedAnnotations);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: {
        ...data,
        ...data.cachedStats
      },
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};

/**
 * It maps an imaging library annotation to a list of simplified annotation properties.
 *
 * @param {Object} annotationData
 * @param {Object} DisplaySetService
 * @returns
 */
function getMappedAnnotations(annotationData, DisplaySetService) {
  const {
    metadata,
    data
  } = annotationData;
  const {
    label
  } = data;
  const {
    referencedImageId
  } = metadata;
  const annotations = [];
  const {
    SOPInstanceUID: _SOPInstanceUID,
    SeriesInstanceUID: _SeriesInstanceUID
  } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId) || {};
  if (!_SOPInstanceUID || !_SeriesInstanceUID) {
    return annotations;
  }
  const displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(_SOPInstanceUID, _SeriesInstanceUID);
  const {
    SeriesNumber,
    SeriesInstanceUID
  } = displaySet;
  annotations.push({
    SeriesInstanceUID,
    SeriesNumber,
    label,
    data
  });
  return annotations;
}

/**
 * TBD
 * This function is used to convert the measurement data to a format that is suitable for the report generation (e.g. for the csv report).
 * The report returns a list of columns and corresponding values.
 * @param {*} mappedAnnotations
 * @param {*} points
 * @param {*} FrameOfReferenceUID
 * @returns Object representing the report's content for this tool.
 */
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations) {
  return '';
}
const _default = PlanarFreehandROI;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(PlanarFreehandROI, "PlanarFreehandROI", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
/* harmony import */ var _utils_getModalityUnit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getModalityUnit */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const RectangleROI = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, DisplaySetService, CornerstoneViewportService, getValueTypeFromToolType) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Rectangle ROI tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId, CornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = DisplaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, DisplaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, DisplaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      // Todo: Non-acquisition plane measurement mapping not supported yet
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = (0,_utils_getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_1__["default"])(referencedImageId);
    const displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality
    } = targetStats;
    const unit = (0,_utils_getModalityUnit__WEBPACK_IMPORTED_MODULE_2__["default"])(Modality);
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit,
      mean,
      stdDev,
      max,
      area
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:RectangleROI');
  mappedAnnotations.forEach(annotation => {
    const {
      mean,
      stdDev,
      max,
      area,
      unit
    } = annotation;
    if (!mean || !unit || !max || !area) {
      return;
    }
    columns.push(`max (${unit})`, `mean (${unit})`, `std (${unit})`, `area (mm2)`);
    values.push(max, mean, stdDev, area);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return '';
  }
  const displayText = [];

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.images.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';

  // Area sometimes becomes undefined if `preventHandleOutsideImage` is off.
  const roundedArea = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils.roundNumber(area || 0, 2);
  displayText.push(`${roundedArea} mm<sup>2</sup>`);

  // Todo: we need a better UI for displaying all these information
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    let maxStr = '';
    if (max) {
      const roundedMax = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils.roundNumber(max, 2);
      maxStr = `Max: ${roundedMax} <small>${unit}</small> `;
    }
    const str = `${maxStr}(S:${SeriesNumber}${instanceText}${frameText})`;
    if (!displayText.includes(str)) {
      displayText.push(str);
    }
  });
  return displayText;
}
const _default = RectangleROI;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RectangleROI, "RectangleROI", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts");
  reactHotLoader.register(getMappedAnnotations, "getMappedAnnotations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts");
  reactHotLoader.register(_getReport, "_getReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts");
  reactHotLoader.register(getDisplayText, "getDisplayText", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js":
/*!********************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js ***!
  \********************************************************************************************************/
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
const _default = ['Length', 'EllipticalROI', 'CircleROI', 'Bidirectional', 'ArrowAnnotate', 'Angle', 'CobbAngle', 'Probe', 'RectangleROI', 'PlanarFreehandROI'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/index.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/index.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   measurementMappingUtils: () => (/* reexport module object */ _utils__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/index.ts");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.ts":
/*!*****************************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.ts ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _Length__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Length */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts");
/* harmony import */ var _Bidirectional__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bidirectional */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts");
/* harmony import */ var _EllipticalROI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EllipticalROI */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts");
/* harmony import */ var _CircleROI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CircleROI */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts");
/* harmony import */ var _ArrowAnnotate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ArrowAnnotate */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts");
/* harmony import */ var _CobbAngle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CobbAngle */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts");
/* harmony import */ var _Angle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Angle */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts");
/* harmony import */ var _PlanarFreehandROI__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PlanarFreehandROI */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts");
/* harmony import */ var _RectangleROI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./RectangleROI */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










const measurementServiceMappingsFactory = (measurementService, displaySetService, cornerstoneViewportService) => {
  /**
   * Maps measurement service format object to cornerstone annotation object.
   *
   * @param measurement The measurement instance
   * @param definition The source definition
   * @return Cornerstone annotation data
   */

  const _getValueTypeFromToolType = toolType => {
    const {
      POLYLINE,
      ELLIPSE,
      CIRCLE,
      RECTANGLE,
      BIDIRECTIONAL,
      POINT,
      ANGLE
    } = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES;

    // TODO -> I get why this was attempted, but its not nearly flexible enough.
    // A single measurement may have an ellipse + a bidirectional measurement, for instances.
    // You can't define a bidirectional tool as a single type..
    const TOOL_TYPE_TO_VALUE_TYPE = {
      Length: POLYLINE,
      EllipticalROI: ELLIPSE,
      CircleROI: CIRCLE,
      RectangleROI: RECTANGLE,
      PlanarFreehandROI: POLYLINE,
      Bidirectional: BIDIRECTIONAL,
      ArrowAnnotate: POINT,
      CobbAngle: ANGLE,
      Angle: ANGLE
    };
    return TOOL_TYPE_TO_VALUE_TYPE[toolType];
  };
  const factories = {
    Length: {
      toAnnotation: _Length__WEBPACK_IMPORTED_MODULE_1__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _Length__WEBPACK_IMPORTED_MODULE_1__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.POLYLINE,
        points: 2
      }]
    },
    Bidirectional: {
      toAnnotation: _Bidirectional__WEBPACK_IMPORTED_MODULE_2__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _Bidirectional__WEBPACK_IMPORTED_MODULE_2__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [
      // TODO -> We should eventually do something like shortAxis + longAxis,
      // But its still a little unclear how these automatic interpretations will work.
      {
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.POLYLINE,
        points: 2
      }, {
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.POLYLINE,
        points: 2
      }]
    },
    EllipticalROI: {
      toAnnotation: _EllipticalROI__WEBPACK_IMPORTED_MODULE_3__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _EllipticalROI__WEBPACK_IMPORTED_MODULE_3__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.ELLIPSE
      }]
    },
    CircleROI: {
      toAnnotation: _CircleROI__WEBPACK_IMPORTED_MODULE_4__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _CircleROI__WEBPACK_IMPORTED_MODULE_4__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.CIRCLE
      }]
    },
    RectangleROI: {
      toAnnotation: _RectangleROI__WEBPACK_IMPORTED_MODULE_9__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _RectangleROI__WEBPACK_IMPORTED_MODULE_9__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.POLYLINE
      }]
    },
    PlanarFreehandROI: {
      toAnnotation: _PlanarFreehandROI__WEBPACK_IMPORTED_MODULE_8__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _PlanarFreehandROI__WEBPACK_IMPORTED_MODULE_8__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.POLYLINE
      }]
    },
    ArrowAnnotate: {
      toAnnotation: _ArrowAnnotate__WEBPACK_IMPORTED_MODULE_5__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _ArrowAnnotate__WEBPACK_IMPORTED_MODULE_5__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.POINT,
        points: 1
      }]
    },
    CobbAngle: {
      toAnnotation: _CobbAngle__WEBPACK_IMPORTED_MODULE_6__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _CobbAngle__WEBPACK_IMPORTED_MODULE_6__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.ANGLE
      }]
    },
    Angle: {
      toAnnotation: _Angle__WEBPACK_IMPORTED_MODULE_7__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _Angle__WEBPACK_IMPORTED_MODULE_7__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType),
      matchingCriteria: [{
        valueType: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.MeasurementService.VALUE_TYPES.ANGLE
      }]
    }
  };
  return factories;
};
const _default = measurementServiceMappingsFactory;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(measurementServiceMappingsFactory, "measurementServiceMappingsFactory", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getHandlesFromPoints.js":
/*!**********************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getHandlesFromPoints.js ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHandlesFromPoints)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
function getHandlesFromPoints(points) {
  if (points.longAxis && points.shortAxis) {
    const handles = {};
    handles.start = points.longAxis[0];
    handles.end = points.longAxis[1];
    handles.perpendicularStart = points.longAxis[0];
    handles.perpendicularEnd = points.longAxis[1];
    return handles;
  }
  return points.map((p, i) => i % 10 === 0 ? {
    start: p
  } : {
    end: p
  }).reduce((obj, item) => Object.assign(obj, {
    ...item
  }), {});
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getHandlesFromPoints, "getHandlesFromPoints", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/getHandlesFromPoints.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js":
/*!*****************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js ***!
  \*****************************************************************************************************/
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
function getModalityUnit(modality) {
  if (modality === 'CT') {
    return 'HU';
  } else if (modality === 'PT') {
    return 'SUV';
  } else {
    return '';
  }
}
const _default = getModalityUnit;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getModalityUnit, "getModalityUnit", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js":
/*!**************************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js ***!
  \**************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSOPInstanceAttributes)
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


/**
 * It checks if the imageId is provided then it uses it to query
 * the metadata and get the SOPInstanceUID, SeriesInstanceUID and StudyInstanceUID.
 * If the imageId is not provided then undefined is returned.
 * @param {string} imageId The image id of the referenced image
 * @returns
 */
function getSOPInstanceAttributes(imageId) {
  if (imageId) {
    return _getUIDFromImageID(imageId);
  }

  // Todo: implement for volume viewports and use the referencedSeriesInstanceUID
}

function _getUIDFromImageID(imageId) {
  const instance = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.metaData.get('instance', imageId);
  return {
    SOPInstanceUID: instance.SOPInstanceUID,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    frameNumber: instance.frameNumber || 1
  };
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getSOPInstanceAttributes, "getSOPInstanceAttributes", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
  reactHotLoader.register(_getUIDFromImageID, "_getUIDFromImageID", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/index.ts":
/*!*******************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/index.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFirstAnnotationSelected: () => (/* reexport safe */ _selection__WEBPACK_IMPORTED_MODULE_1__.getFirstAnnotationSelected),
/* harmony export */   getHandlesFromPoints: () => (/* reexport safe */ _getHandlesFromPoints__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   getModalityUnit: () => (/* reexport safe */ _getModalityUnit__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   getSOPInstanceAttributes: () => (/* reexport safe */ _getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   isAnnotationSelected: () => (/* reexport safe */ _selection__WEBPACK_IMPORTED_MODULE_1__.isAnnotationSelected),
/* harmony export */   setAnnotationSelected: () => (/* reexport safe */ _selection__WEBPACK_IMPORTED_MODULE_1__.setAnnotationSelected)
/* harmony export */ });
/* harmony import */ var _getHandlesFromPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getHandlesFromPoints */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getHandlesFromPoints.js");
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selection */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts");
/* harmony import */ var _getModalityUnit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getModalityUnit */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getModalityUnit.js");
/* harmony import */ var _getSOPInstanceAttributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSOPInstanceAttributes */ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFirstAnnotationSelected: () => (/* binding */ getFirstAnnotationSelected),
/* harmony export */   isAnnotationSelected: () => (/* binding */ isAnnotationSelected),
/* harmony export */   setAnnotationSelected: () => (/* binding */ setAnnotationSelected)
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


/**
 * Check whether an annotation from imaging library is selected or not.
 * @param {string} annotationUID uid of imaging library annotation
 * @returns boolean
 */
function isAnnotationSelected(annotationUID) {
  return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.selection.isAnnotationSelected(annotationUID);
}

/**
 * Change an annotation from imaging library's selected property.
 * @param annotationUID - uid of imaging library annotation
 * @param selected - new value for selected
 */
function setAnnotationSelected(annotationUID, selected) {
  const isCurrentSelected = isAnnotationSelected(annotationUID);
  // branch cut, avoid invoking imaging library unnecessarily.
  if (isCurrentSelected !== selected) {
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.selection.setAnnotationSelected(annotationUID, selected);
  }
}
function getFirstAnnotationSelected(element) {
  const [selectedAnnotationUID] = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.selection.getAnnotationsSelected() || [];
  if (selectedAnnotationUID) {
    return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.state.getAnnotation(selectedAnnotationUID);
  }
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(isAnnotationSelected, "isAnnotationSelected", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts");
  reactHotLoader.register(setAnnotationSelected, "setAnnotationSelected", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts");
  reactHotLoader.register(getFirstAnnotationSelected, "getFirstAnnotationSelected", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/nthLoader.ts":
/*!**************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/nthLoader.ts ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ interleaveNthLoader)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _getNthFrames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNthFrames */ "../../../extensions/cornerstone/src/utils/getNthFrames.js");
/* harmony import */ var _interleave__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interleave */ "../../../extensions/cornerstone/src/utils/interleave.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




// Map of volumeId and SeriesInstanceId
const volumeIdMapsToLoad = new Map();
const viewportIdVolumeInputArrayMap = new Map();

/**
 * This function caches the volumeUIDs until all the volumes inside the
 * hanging protocol are initialized. Then it goes through the requests and
 * chooses a sub-selection starting the the first few objects, center objects
 * and last objects, and then the remaining nth images until all instances are
 * retrieved.  This causes the image to have a progressive load order and looks
 * visually much better.
 * @param {Object} props image loading properties from Cornerstone ViewportService
 */
function interleaveNthLoader(_ref) {
  let {
    data: {
      viewportId,
      volumeInputArray
    },
    displaySetsMatchDetails
  } = _ref;
  viewportIdVolumeInputArrayMap.set(viewportId, volumeInputArray);

  // Based on the volumeInputs store the volumeIds and SeriesInstanceIds
  // to keep track of the volumes being loaded
  for (const volumeInput of volumeInputArray) {
    const {
      volumeId
    } = volumeInput;
    const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
    if (!volume) {
      console.log("interleaveNthLoader::No volume, can't load it");
      return;
    }

    // if the volumeUID is not in the volumeUIDs array, add it
    if (!volumeIdMapsToLoad.has(volumeId)) {
      const {
        metadata
      } = volume;
      volumeIdMapsToLoad.set(volumeId, metadata.SeriesInstanceUID);
    }
  }
  const volumeIds = Array.from(volumeIdMapsToLoad.keys()).slice();
  // get volumes from cache
  const volumes = volumeIds.map(volumeId => {
    return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.cache.getVolume(volumeId);
  });

  // iterate over all volumes, and get their imageIds, and interleave
  // the imageIds and save them in AllRequests for later use
  const originalRequests = volumes.map(volume => volume.getImageLoadRequests()).filter(requests => requests?.[0]?.imageId);
  const orderedRequests = originalRequests.map(request => (0,_getNthFrames__WEBPACK_IMPORTED_MODULE_1__["default"])(request));

  // set the finalRequests to the imageLoadPoolManager
  const finalRequests = (0,_interleave__WEBPACK_IMPORTED_MODULE_2__["default"])(orderedRequests);
  const requestType = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.RequestType.Prefetch;
  const priority = 0;
  finalRequests.forEach(_ref2 => {
    let {
      callLoadImage,
      additionalDetails,
      imageId,
      imageIdIndex,
      options
    } = _ref2;
    const callLoadImageBound = callLoadImage.bind(null, imageId, imageIdIndex, options);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.imageLoadPoolManager.addRequest(callLoadImageBound, requestType, additionalDetails, priority);
  });

  // clear the volumeIdMapsToLoad
  volumeIdMapsToLoad.clear();

  // copy the viewportIdVolumeInputArrayMap
  const viewportIdVolumeInputArrayMapCopy = new Map(viewportIdVolumeInputArrayMap);

  // reset the viewportIdVolumeInputArrayMap
  viewportIdVolumeInputArrayMap.clear();
  return viewportIdVolumeInputArrayMapCopy;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(volumeIdMapsToLoad, "volumeIdMapsToLoad", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/nthLoader.ts");
  reactHotLoader.register(viewportIdVolumeInputArrayMap, "viewportIdVolumeInputArrayMap", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/nthLoader.ts");
  reactHotLoader.register(interleaveNthLoader, "interleaveNthLoader", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/nthLoader.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/stackSync/calculateViewportRegistrations.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/stackSync/calculateViewportRegistrations.ts ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculateViewportRegistrations)
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

function calculateViewportRegistrations(viewports) {
  const viewportPairs = _getViewportPairs(viewports);
  for (const [viewport, nextViewport] of viewportPairs) {
    // check if they are in the same Frame of Reference
    const renderingEngine1 = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getRenderingEngine)(viewport.renderingEngineId);
    const renderingEngine2 = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.getRenderingEngine)(nextViewport.renderingEngineId);
    const csViewport1 = renderingEngine1.getViewport(viewport.viewportId);
    const csViewport2 = renderingEngine2.getViewport(nextViewport.viewportId);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.calculateViewportsSpatialRegistration(csViewport1, csViewport2);
  }
}
const _getViewportPairs = viewports => {
  const viewportPairs = [];
  for (let i = 0; i < viewports.length; i++) {
    for (let j = i + 1; j < viewports.length; j++) {
      viewportPairs.push([viewports[i], viewports[j]]);
    }
  }
  return viewportPairs;
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(calculateViewportRegistrations, "calculateViewportRegistrations", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/stackSync/calculateViewportRegistrations.ts");
  reactHotLoader.register(_getViewportPairs, "_getViewportPairs", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/stackSync/calculateViewportRegistrations.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/stackSync/toggleStackImageSync.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/stackSync/toggleStackImageSync.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggleStackImageSync)
/* harmony export */ });
/* harmony import */ var _calculateViewportRegistrations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculateViewportRegistrations */ "../../../extensions/cornerstone/src/utils/stackSync/calculateViewportRegistrations.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


// [ {
//   synchronizerId: string,
//   viewports: [ { viewportId: number, renderingEngineId: string, index: number } , ...]
// ]}
let STACK_IMAGE_SYNC_GROUPS_INFO = [];
function toggleStackImageSync(_ref) {
  let {
    toggledState,
    servicesManager,
    getEnabledElement
  } = _ref;
  const {
    syncGroupService,
    viewportGridService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  if (!toggledState) {
    STACK_IMAGE_SYNC_GROUPS_INFO.forEach(syncGroupInfo => {
      const {
        viewports,
        synchronizerId
      } = syncGroupInfo;
      viewports.forEach(_ref2 => {
        let {
          viewportId,
          renderingEngineId
        } = _ref2;
        syncGroupService.removeViewportFromSyncGroup(viewportId, renderingEngineId, synchronizerId);
      });
    });
    return;
  }
  STACK_IMAGE_SYNC_GROUPS_INFO = [];

  // create synchronization groups and add viewports
  let {
    viewports
  } = viewportGridService.getState();

  // filter empty viewports
  viewports = viewports.filter(viewport => viewport.displaySetInstanceUIDs && viewport.displaySetInstanceUIDs.length);

  // filter reconstructable viewports
  viewports = viewports.filter(viewport => {
    const {
      displaySetInstanceUIDs
    } = viewport;
    for (const displaySetInstanceUID of displaySetInstanceUIDs) {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      if (displaySet && displaySet.isReconstructable) {
        return true;
      }
      return false;
    }
  });
  const viewportsByOrientation = viewports.reduce((acc, viewport) => {
    const {
      viewportId,
      viewportType
    } = viewport.viewportOptions;
    if (viewportType !== 'stack') {
      console.warn('Viewport is not a stack, cannot sync images yet');
      return acc;
    }
    const {
      element
    } = cornerstoneViewportService.getViewportInfo(viewportId);
    const {
      viewport: csViewport,
      renderingEngineId
    } = getEnabledElement(element);
    const {
      viewPlaneNormal
    } = csViewport.getCamera();

    // Should we round here? I guess so, but not sure how much precision we need
    const orientation = viewPlaneNormal.map(v => Math.round(v)).join(',');
    if (!acc[orientation]) {
      acc[orientation] = [];
    }
    acc[orientation].push({
      viewportId,
      renderingEngineId
    });
    return acc;
  }, {});

  // create synchronizer for each group
  Object.values(viewportsByOrientation).map(viewports => {
    let synchronizerId = viewports.map(_ref3 => {
      let {
        viewportId
      } = _ref3;
      return viewportId;
    }).join(',');
    synchronizerId = `imageSync_${synchronizerId}`;
    (0,_calculateViewportRegistrations__WEBPACK_IMPORTED_MODULE_0__["default"])(viewports);
    viewports.forEach(_ref4 => {
      let {
        viewportId,
        renderingEngineId
      } = _ref4;
      syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, {
        type: 'stackimage',
        id: synchronizerId,
        source: true,
        target: true
      });
    });
    STACK_IMAGE_SYNC_GROUPS_INFO.push({
      synchronizerId,
      viewports
    });
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(STACK_IMAGE_SYNC_GROUPS_INFO, "STACK_IMAGE_SYNC_GROUPS_INFO", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/stackSync/toggleStackImageSync.ts");
  reactHotLoader.register(toggleStackImageSync, "toggleStackImageSync", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/stackSync/toggleStackImageSync.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/cornerstone/src/utils/transitions.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/transitions.ts ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easeInOutBell: () => (/* binding */ easeInOutBell),
/* harmony export */   reverseEaseInOutBell: () => (/* binding */ reverseEaseInOutBell)
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
 * It is a bell curved function that uses ease in out quadratic for css
 * transition timing function for each side of the curve.
 *
 * @param {number} x - The current time, in the range [0, 1].
 * @param {number} baseline - The baseline value to start from and return to.
 * @returns the value of the transition at time x.
 */
function easeInOutBell(x, baseline) {
  const alpha = 1 - baseline;

  // prettier-ignore
  if (x < 1 / 4) {
    return 4 * Math.pow(2 * x, 3) * alpha + baseline;
  } else if (x < 1 / 2) {
    return (1 - Math.pow(-4 * x + 2, 3) / 2) * alpha + baseline;
  } else if (x < 3 / 4) {
    return (1 - Math.pow(4 * x - 2, 3) / 2) * alpha + baseline;
  } else {
    return -4 * Math.pow(2 * x - 2, 3) * alpha + baseline;
  }
}

/**
 * A reversed bell curved function that starts from 1 and goes to baseline and
 * come back to 1 again. It uses ease in out quadratic for css transition
 * timing function for each side of the curve.
 *
 * @param {number} x - The current time, in the range [0, 1].
 * @param {number} baseline - The baseline value to start from and return to.
 * @returns the value of the transition at time x.
 */
function reverseEaseInOutBell(x, baseline) {
  const y = easeInOutBell(x, baseline);
  return -y + 1 + baseline;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(easeInOutBell, "easeInOutBell", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/transitions.ts");
  reactHotLoader.register(reverseEaseInOutBell, "reverseEaseInOutBell", "/Users/smartxx/xV/DICOM/Viewers/extensions/cornerstone/src/utils/transitions.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".dicom-upload-drop-area-border-dash {\n  background-image: repeating-linear-gradient(to right, #7BB2CE 0%, #7BB2CE 50%, transparent 50%, transparent 100%), repeating-linear-gradient(to right, #7BB2CE 0%, #7BB2CE 50%, transparent 50%, transparent 100%), repeating-linear-gradient(to bottom, #7BB2CE 0%, #7BB2CE 50%, transparent 50%, transparent 100%), repeating-linear-gradient(to bottom, #7BB2CE 0%, #7BB2CE 50%, transparent 50%, transparent 100%);\n  background-position: left top, left bottom, left top, right top;\n  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;\n  background-size: 20px 3px, 20px 3px, 3px 20px, 3px 20px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css":
/*!**********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomUpload.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css");

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
      /*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomUpload.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css",
      function () {
        content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomUpload.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css");

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

/***/ "?0c00":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "../../../extensions/cornerstone/package.json":
/*!****************************************************!*\
  !*** ../../../extensions/cornerstone/package.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@ohif/extension-cornerstone","version":"3.6.0","description":"OHIF extension for Cornerstone","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-cornerstone.umd.js","module":"src/index.tsx","types":"src/types/index.ts","exports":{".":"./src/index.tsx","./types":"./src/types/index.ts"},"engines":{"node":">=10","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --progress --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@cornerstonejs/codec-charls":"^1.2.3","@cornerstonejs/codec-libjpeg-turbo-8bit":"^1.2.2","@cornerstonejs/codec-openjpeg":"^1.2.2","@cornerstonejs/codec-openjph":"^2.4.2","@cornerstonejs/dicom-image-loader":"^0.6.8","@ohif/core":"3.6.0","@ohif/ui":"3.6.0","dcmjs":"^0.29.6","dicom-parser":"^1.8.21","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^17.0.2","react-dom":"^17.0.2","react-resize-detector":"^6.7.6"},"devDependencies":{"lodash":"^4.17.21"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/adapters":"^1.1.0","@cornerstonejs/core":"^1.1.0","@cornerstonejs/streaming-image-volume-loader":"^1.1.0","@cornerstonejs/tools":"^1.1.0","@kitware/vtk.js":"27.3.1","html2canvas":"^1.4.1","lodash.debounce":"4.0.8","lodash.merge":"^4.6.2","shader-loader":"^1.3.1","worker-loader":"^3.0.8"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone_src_index_tsx.js.map