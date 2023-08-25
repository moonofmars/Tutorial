"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_basic-test-mode_src_index_js"],{

/***/ "../../../modes/basic-test-mode/src/id.js":
/*!************************************************!*\
  !*** ../../../modes/basic-test-mode/src/id.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/basic-test-mode/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-test-mode/src/index.js":
/*!***************************************************!*\
  !*** ../../../modes/basic-test-mode/src/index.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _toolbarButtons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbarButtons.js */ "../../../modes/basic-test-mode/src/toolbarButtons.js");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id.js */ "../../../modes/basic-test-mode/src/id.js");
/* harmony import */ var _initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initToolGroups.js */ "../../../modes/basic-test-mode/src/initToolGroups.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





// Allow this mode by excluding non-imaging modalities such as SR, SEG
// Also, SM is not a simple imaging modalities, so exclude it.
const NON_IMAGE_MODALITIES = ['SM', 'ECG', 'SR', 'SEG'];
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video',
  viewport: '@ohif/extension-dicom-video.viewportModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const dicomSeg = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg',
  panel: '@ohif/extension-cornerstone-dicom-seg.panelModule.panelSegmentation'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-measurement-tracking': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-test': '^0.0.1'
};
function modeFactory() {
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: _id_js__WEBPACK_IMPORTED_MODULE_2__.id,
    routeName: 'basic-test',
    displayName: 'Basic Test Mode',
    /**
     * Lifecycle hooks
     */
    onModeEnter: _ref => {
      let {
        servicesManager,
        extensionManager,
        commandsManager
      } = _ref;
      const {
        measurementService,
        toolbarService,
        toolGroupService,
        customizationService
      } = servicesManager.services;
      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      (0,_initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__["default"])(extensionManager, toolGroupService, commandsManager);

      // init customizations
      customizationService.addModeCustomizations(['@ohif/extension-test.customizationModule.custom-context-menu']);
      let unsubscribe;
      const activateTool = () => {
        toolbarService.recordInteraction({
          groupId: 'WindowLevel',
          itemId: 'WindowLevel',
          interactionType: 'tool',
          commands: [{
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'WindowLevel'
            },
            context: 'CORNERSTONE'
          }]
        });

        // We don't need to reset the active tool whenever a viewport is getting
        // added to the toolGroup.
        unsubscribe();
      };

      // Since we only have one viewport for the basic cs3d mode and it has
      // only one hanging protocol, we can just use the first viewport
      ({
        unsubscribe
      } = toolGroupService.subscribe(toolGroupService.EVENTS.VIEWPORT_ADDED, activateTool));
      toolbarService.init(extensionManager);
      toolbarService.addButtons(_toolbarButtons_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
      toolbarService.createButtonSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Pan', 'Capture', 'Layout', 'MPR', 'Crosshairs', 'MoreTools']);
    },
    onModeExit: _ref2 => {
      let {
        servicesManager
      } = _ref2;
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService
      } = servicesManager.services;
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: function (_ref3) {
      let {
        modalities
      } = _ref3;
      const modalities_list = modalities.split('\\');

      // Exclude non-image modalities
      return !!modalities_list.filter(modality => NON_IMAGE_MODALITIES.indexOf(modality) === -1).length;
    },
    routes: [{
      path: 'basic-test',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: () => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [tracked.thumbnailList],
            rightPanels: [dicomSeg.panel, tracked.measurements],
            // rightPanelDefaultClosed: true, // optional prop to start with collapse panels
            viewports: [{
              namespace: tracked.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler]
            }, {
              namespace: dicomsr.viewport,
              displaySetsToDisplay: [dicomsr.sopClassHandler]
            }, {
              namespace: dicomvideo.viewport,
              displaySetsToDisplay: [dicomvideo.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }, {
              namespace: dicomSeg.viewport,
              displaySetsToDisplay: [dicomSeg.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    // Default protocol gets self-registered by default in the init
    hangingProtocol: 'default',
    // Order is important in sop class handlers when two handlers both use
    // the same sop class under different situations.  In that case, the more
    // general handler needs to come last.  For this case, the dicomvideo must
    // come first to remove video transfer syntax before ohif uses images
    sopClassHandlers: [dicomvideo.sopClassHandler, dicomSeg.sopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler],
    hotkeys: {
      // Don't store the hotkeys for basic-test-mode under the same key
      // because they get customized by tests
      name: 'basic-test-hotkeys',
      hotkeys: [..._ohif_core__WEBPACK_IMPORTED_MODULE_0__.hotkeys.defaults.hotkeyBindings]
    }
  };
}
const mode = {
  id: _id_js__WEBPACK_IMPORTED_MODULE_2__.id,
  modeFactory,
  extensionDependencies
};
const _default = mode;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(NON_IMAGE_MODALITIES, "NON_IMAGE_MODALITIES", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(ohif, "ohif", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(tracked, "tracked", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(dicomsr, "dicomsr", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(dicomvideo, "dicomvideo", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(dicompdf, "dicompdf", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(dicomSeg, "dicomSeg", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(extensionDependencies, "extensionDependencies", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(modeFactory, "modeFactory", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(mode, "mode", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-test-mode/src/initToolGroups.js":
/*!************************************************************!*\
  !*** ../../../modes/basic-test-mode/src/initToolGroups.js ***!
  \************************************************************/
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
function initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, toolGroupId) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.StackScrollMouseWheel,
      bindings: []
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: toolNames.SegmentationDisplay
    }],
    // enabled
    // disabled
    disabled: [{
      toolName: toolNames.ReferenceLines
    }]
  };
  const toolsConfig = {
    [toolNames.ArrowAnnotate]: {
      getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        eventDetails
      }),
      changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        data,
        eventDetails
      })
    }
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools, toolsConfig);
}
function initSRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const SRUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone-dicom-sr.utilityModule.tools');
  const CS3DUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames: SRToolNames
  } = SRUtilityModule.exports;
  const {
    toolNames,
    Enums
  } = CS3DUtilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.StackScrollMouseWheel,
      bindings: []
    }],
    passive: [{
      toolName: SRToolNames.SRLength
    }, {
      toolName: SRToolNames.SRArrowAnnotate
    }, {
      toolName: SRToolNames.SRBidirectional
    }, {
      toolName: SRToolNames.SREllipticalROI
    }, {
      toolName: SRToolNames.SRCircleROI
    }],
    enabled: [{
      toolName: SRToolNames.DICOMSRDisplay,
      bindings: []
    }]
    // disabled
  };

  const toolsConfig = {
    [toolNames.ArrowAnnotate]: {
      getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        eventDetails
      }),
      changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        data,
        eventDetails
      })
    }
  };
  const toolGroupId = 'SRToolGroup';
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools, toolsConfig);
}
function initMPRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.StackScrollMouseWheel,
      bindings: []
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.SegmentationDisplay
    }],
    disabled: [{
      toolName: toolNames.Crosshairs
    }, {
      toolName: toolNames.ReferenceLines
    }]

    // enabled
    // disabled
  };

  const toolsConfig = {
    [toolNames.Crosshairs]: {
      viewportIndicators: false,
      autoPan: {
        enabled: false,
        panSize: 10
      }
    },
    [toolNames.ArrowAnnotate]: {
      getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        eventDetails
      }),
      changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        data,
        eventDetails
      })
    }
  };
  toolGroupService.createToolGroupAndAddTools('mpr', tools, toolsConfig);
}
function initToolGroups(extensionManager, toolGroupService, commandsManager) {
  initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, 'default');
  initSRToolGroup(extensionManager, toolGroupService, commandsManager);
  initMPRToolGroup(extensionManager, toolGroupService, commandsManager);
}
const _default = initToolGroups;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(initDefaultToolGroup, "initDefaultToolGroup", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/initToolGroups.js");
  reactHotLoader.register(initSRToolGroup, "initSRToolGroup", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/initToolGroups.js");
  reactHotLoader.register(initMPRToolGroup, "initMPRToolGroup", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/initToolGroups.js");
  reactHotLoader.register(initToolGroups, "initToolGroups", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/initToolGroups.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/initToolGroups.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-test-mode/src/toolbarButtons.js":
/*!************************************************************!*\
  !*** ../../../modes/basic-test-mode/src/toolbarButtons.js ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l


const {
  windowLevelPresets
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.defaults;
/**
 *
 * @param {*} type - 'tool' | 'action' | 'toggle'
 * @param {*} id
 * @param {*} icon
 * @param {*} label
 */
function _createButton(type, id, icon, label, commands, tooltip, uiType) {
  return {
    id,
    icon,
    label,
    type,
    commands,
    tooltip,
    uiType
  };
}
function _createCommands(commandName, toolName, toolGroupIds) {
  return toolGroupIds.map(toolGroupId => ({
    /* It's a command that is being run when the button is clicked. */
    commandName,
    commandOptions: {
      toolName,
      toolGroupId
    },
    context: 'CORNERSTONE'
  }));
}
const _createActionButton = _createButton.bind(null, 'action');
const _createToggleButton = _createButton.bind(null, 'toggle');
const _createToolButton = _createButton.bind(null, 'tool');

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    type: 'action',
    commands: [{
      commandName: 'setWindowLevel',
      commandOptions: {
        ...windowLevelPresets[preset]
      },
      context: 'CORNERSTONE'
    }]
  };
}
const toolbarButtons = [
// Measurement
{
  id: 'MeasurementTools',
  type: 'ohif.splitButton',
  props: {
    groupId: 'MeasurementTools',
    isRadio: true,
    // ?
    // Switch?
    primary: _createToolButton('Length', 'tool-length', 'Length', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Length'
      },
      context: 'CORNERSTONE'
    }, {
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'SRLength',
        toolGroupId: 'SRToolGroup'
      },
      // we can use the setToolActive command for this from Cornerstone commandsModule
      context: 'CORNERSTONE'
    }], 'Length'),
    secondary: {
      icon: 'chevron-down',
      label: '',
      isActive: true,
      tooltip: 'More Measure Tools'
    },
    items: [_createToolButton('Length', 'tool-length', 'Length', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Length'
      },
      context: 'CORNERSTONE'
    }, {
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'SRLength',
        toolGroupId: 'SRToolGroup'
      },
      // we can use the setToolActive command for this from Cornerstone commandsModule
      context: 'CORNERSTONE'
    }], 'Length Tool'), _createToolButton('Bidirectional', 'tool-bidirectional', 'Bidirectional', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Bidirectional'
      },
      context: 'CORNERSTONE'
    }, {
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'SRBidirectional',
        toolGroupId: 'SRToolGroup'
      },
      context: 'CORNERSTONE'
    }], 'Bidirectional Tool'), _createToolButton('ArrowAnnotate', 'tool-annotate', 'Annotation', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'ArrowAnnotate'
      },
      context: 'CORNERSTONE'
    }, {
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'SRArrowAnnotate',
        toolGroupId: 'SRToolGroup'
      },
      context: 'CORNERSTONE'
    }], 'Arrow Annotate'), _createToolButton('EllipticalROI', 'tool-elipse', 'Ellipse', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'EllipticalROI'
      },
      context: 'CORNERSTONE'
    }, {
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'SREllipticalROI',
        toolGroupId: 'SRToolGroup'
      },
      context: 'CORNERSTONE'
    }], 'Ellipse Tool'), _createToolButton('CircleROI', 'tool-circle', 'Circle', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'CircleROI'
      },
      context: 'CORNERSTONE'
    }, {
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'SRCircleROI',
        toolGroupId: 'SRToolGroup'
      },
      context: 'CORNERSTONE'
    }], 'Circle Tool')]
  }
},
// Zoom..
{
  id: 'Zoom',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-zoom',
    label: 'Zoom',
    commands: [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Zoom'
      },
      context: 'CORNERSTONE'
    }]
  }
},
// Window Level + Presets...
{
  id: 'WindowLevel',
  type: 'ohif.splitButton',
  props: {
    groupId: 'WindowLevel',
    primary: _createToolButton('WindowLevel', 'tool-window-level', 'Window Level', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'WindowLevel'
      },
      context: 'CORNERSTONE'
    }], 'Window Level'),
    secondary: {
      icon: 'chevron-down',
      label: 'W/L Manual',
      isActive: true,
      tooltip: 'W/L Presets'
    },
    isAction: true,
    // ?
    renderer: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.WindowLevelMenuItem,
    items: [_createWwwcPreset(1, 'Soft tissue', '400 / 40'), _createWwwcPreset(2, 'Lung', '1500 / -600'), _createWwwcPreset(3, 'Liver', '150 / 90'), _createWwwcPreset(4, 'Bone', '2500 / 480'), _createWwwcPreset(5, 'Brain', '80 / 40')]
  }
},
// Pan...
{
  id: 'Pan',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: 'Pan',
    commands: [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Pan'
      },
      context: 'CORNERSTONE'
    }]
  }
}, {
  id: 'Capture',
  type: 'ohif.action',
  props: {
    icon: 'tool-capture',
    label: 'Capture',
    type: 'action',
    commands: [{
      commandName: 'showDownloadViewportModal',
      commandOptions: {},
      context: 'CORNERSTONE'
    }]
  }
}, {
  id: 'Layout',
  type: 'ohif.splitButton',
  props: {
    groupId: 'LayoutTools',
    isRadio: false,
    primary: {
      id: 'Layout',
      type: 'action',
      uiType: 'ohif.layoutSelector',
      icon: 'tool-layout',
      label: 'Grid Layout',
      props: {
        rows: 4,
        columns: 4,
        commands: [{
          commandName: 'setLayout',
          commandOptions: {},
          context: 'CORNERSTONE'
        }]
      }
    },
    secondary: {
      icon: 'chevron-down',
      label: '',
      isActive: true,
      tooltip: 'Hanging Protocols'
    },
    items: [{
      id: '2x2',
      type: 'action',
      label: '2x2',
      commands: [{
        commandName: 'setHangingProtocol',
        commandOptions: {
          protocolId: '@ohif/mnGrid',
          stageId: '2x2'
        },
        context: 'DEFAULT'
      }]
    }, {
      id: '3x1',
      type: 'action',
      label: '3x1',
      commands: [{
        commandName: 'setHangingProtocol',
        commandOptions: {
          protocolId: '@ohif/mnGrid',
          stageId: '3x1'
        },
        context: 'DEFAULT'
      }]
    }, {
      id: '2x1',
      type: 'action',
      label: '2x1',
      commands: [{
        commandName: 'setHangingProtocol',
        commandOptions: {
          protocolId: '@ohif/mnGrid',
          stageId: '2x1'
        },
        context: 'DEFAULT'
      }]
    }, {
      id: '1x1',
      type: 'action',
      label: '1x1',
      commands: [{
        commandName: 'setHangingProtocol',
        commandOptions: {
          protocolId: '@ohif/mnGrid',
          stageId: '1x1'
        },
        context: 'DEFAULT'
      }]
    }]
  }
}, {
  id: 'MPR',
  type: 'ohif.action',
  props: {
    type: 'toggle',
    icon: 'icon-mpr',
    label: 'MPR',
    commands: [{
      commandName: 'toggleHangingProtocol',
      commandOptions: {
        protocolId: 'mpr'
      },
      context: 'DEFAULT'
    }]
  }
}, {
  id: 'Crosshairs',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: 'Crosshairs',
    commands: [{
      commandName: 'setToolActive',
      commandOptions: {
        toolGroupId: 'mpr',
        toolName: 'Crosshairs'
      },
      context: 'CORNERSTONE'
    }]
  }
},
// More...
{
  id: 'MoreTools',
  type: 'ohif.splitButton',
  props: {
    isRadio: true,
    // ?
    groupId: 'MoreTools',
    primary: _createActionButton('Reset', 'tool-reset', 'Reset View', [{
      commandName: 'resetViewport',
      commandOptions: {},
      context: 'CORNERSTONE'
    }], 'Reset'),
    secondary: {
      icon: 'chevron-down',
      label: '',
      isActive: true,
      tooltip: 'More Tools'
    },
    items: [_createActionButton('Reset', 'tool-reset', 'Reset View', [{
      commandName: 'resetViewport',
      commandOptions: {},
      context: 'CORNERSTONE'
    }], 'Reset'), _createActionButton('rotate-right', 'tool-rotate-right', 'Rotate Right', [{
      commandName: 'rotateViewportCW',
      commandOptions: {},
      context: 'CORNERSTONE'
    }], 'Rotate +90'), _createActionButton('flip-horizontal', 'tool-flip-horizontal', 'Flip Horizontally', [{
      commandName: 'flipViewportHorizontal',
      commandOptions: {},
      context: 'CORNERSTONE'
    }], 'Flip Horizontal'), _createToggleButton('StackImageSync', 'link', 'Stack Image Sync', [{
      commandName: 'toggleStackImageSync',
      commandOptions: {},
      context: 'CORNERSTONE'
    }]), _createToggleButton('ReferenceLines', 'tool-referenceLines',
    // change this with the new icon
    'Reference Lines', [{
      commandName: 'toggleReferenceLines',
      commandOptions: {},
      context: 'CORNERSTONE'
    }]), _createToolButton('StackScroll', 'tool-stack-scroll', 'Stack Scroll', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'StackScroll'
      },
      context: 'CORNERSTONE'
    }], 'Stack Scroll'), _createActionButton('invert', 'tool-invert', 'Invert', [{
      commandName: 'invertViewport',
      commandOptions: {},
      context: 'CORNERSTONE'
    }], 'Invert Colors'), _createToolButton('Probe', 'tool-probe', 'Probe', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'DragProbe'
      },
      context: 'CORNERSTONE'
    }], 'Probe'), _createToggleButton('cine', 'tool-cine', 'Cine', [{
      commandName: 'toggleCine',
      context: 'CORNERSTONE'
    }], 'Cine'), _createToolButton('Angle', 'tool-angle', 'Angle', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Angle'
      },
      context: 'CORNERSTONE'
    }], 'Angle'), _createToolButton('Magnify', 'tool-magnify', 'Magnify', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Magnify'
      },
      context: 'CORNERSTONE'
    }], 'Magnify'), _createToolButton('Rectangle', 'tool-rectangle', 'Rectangle', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'RectangleROI'
      },
      context: 'CORNERSTONE'
    }], 'Rectangle'), _createActionButton('TagBrowser', 'list-bullets', 'Dicom Tag Browser', [{
      commandName: 'openDICOMTagViewer',
      commandOptions: {},
      context: 'DEFAULT'
    }], 'Dicom Tag Browser')]
  }
}];
const _default = toolbarButtons;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(windowLevelPresets, "windowLevelPresets", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createButton, "_createButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createCommands, "_createCommands", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createActionButton, "_createActionButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createToggleButton, "_createToggleButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createToolButton, "_createToolButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createWwwcPreset, "_createWwwcPreset", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(toolbarButtons, "toolbarButtons", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-test-mode/src/toolbarButtons.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-test-mode/package.json":
/*!***************************************************!*\
  !*** ../../../modes/basic-test-mode/package.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/mode-test","version":"3.6.0","description":"Basic mode for testing","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-test.umd.js","module":"src/index.js","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"keywords":["ohif-mode"],"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-cornerstone":"3.6.0","@ohif/extension-cornerstone-dicom-sr":"3.6.0","@ohif/extension-default":"3.6.0","@ohif/extension-dicom-pdf":"3.6.0","@ohif/extension-dicom-video":"3.6.0","@ohif/extension-measurement-tracking":"3.6.0","@ohif/extension-test":"3.6.0"},"dependencies":{"@babel/runtime":"^7.20.13"},"devDependencies":{"webpack":"^5.50.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_basic-test-mode_src_index_js.js.map