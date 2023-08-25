"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_tmtv_src_index_js"],{

/***/ "../../../modes/tmtv/src/id.js":
/*!*************************************!*\
  !*** ../../../modes/tmtv/src/id.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/tmtv/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/tmtv/src/index.js":
/*!****************************************!*\
  !*** ../../../modes/tmtv/src/index.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _toolbarButtons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbarButtons.js */ "../../../modes/tmtv/src/toolbarButtons.js");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id.js */ "../../../modes/tmtv/src/id.js");
/* harmony import */ var _initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initToolGroups.js */ "../../../modes/tmtv/src/initToolGroups.js");
/* harmony import */ var _utils_setCrosshairsConfiguration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/setCrosshairsConfiguration.js */ "../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js");
/* harmony import */ var _utils_setFusionActiveVolume_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/setFusionActiveVolume.js */ "../../../modes/tmtv/src/utils/setFusionActiveVolume.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const {
  MetadataProvider
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes;
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  measurements: '@ohif/extension-default.panelModule.measure',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
};
const tmtv = {
  hangingProtocol: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  petSUV: '@ohif/extension-tmtv.panelModule.petSUV',
  ROIThresholdPanel: '@ohif/extension-tmtv.panelModule.ROIThresholdSeg'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-tmtv': '^3.0.0'
};
let unsubscriptions = [];
function modeFactory(_ref) {
  let {
    modeConfiguration
  } = _ref;
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: _id_js__WEBPACK_IMPORTED_MODULE_2__.id,
    routeName: 'tmtv',
    displayName: 'Total Metabolic Tumor Volume',
    /**
     * Lifecycle hooks
     */
    onModeEnter: _ref2 => {
      let {
        servicesManager,
        extensionManager,
        commandsManager
      } = _ref2;
      const {
        toolbarService,
        toolGroupService,
        hangingProtocolService,
        displaySetService
      } = servicesManager.services;
      const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
      const {
        toolNames,
        Enums
      } = utilityModule.exports;

      // Init Default and SR ToolGroups
      (0,_initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__["default"])(toolNames, Enums, toolGroupService, commandsManager);
      const setWindowLevelActive = () => {
        toolbarService.recordInteraction({
          groupId: 'WindowLevel',
          itemId: 'WindowLevel',
          interactionType: 'tool',
          commands: [{
            commandName: 'setToolActive',
            commandOptions: {
              toolName: toolNames.WindowLevel,
              toolGroupId: _initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__.toolGroupIds.CT
            },
            context: 'CORNERSTONE'
          }, {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: toolNames.WindowLevel,
              toolGroupId: _initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__.toolGroupIds.PT
            },
            context: 'CORNERSTONE'
          }, {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: toolNames.WindowLevel,
              toolGroupId: _initToolGroups_js__WEBPACK_IMPORTED_MODULE_3__.toolGroupIds.Fusion
            },
            context: 'CORNERSTONE'
          }]
        });
      };
      const {
        unsubscribe
      } = toolGroupService.subscribe(toolGroupService.EVENTS.VIEWPORT_ADDED, () => {
        // For fusion toolGroup we need to add the volumeIds for the crosshairs
        // since in the fusion viewport we don't want both PT and CT to render MIP
        // when slabThickness is modified
        const {
          displaySetMatchDetails
        } = hangingProtocolService.getMatchDetails();
        (0,_utils_setCrosshairsConfiguration_js__WEBPACK_IMPORTED_MODULE_4__["default"])(displaySetMatchDetails, toolNames, toolGroupService, displaySetService);
        (0,_utils_setFusionActiveVolume_js__WEBPACK_IMPORTED_MODULE_5__["default"])(displaySetMatchDetails, toolNames, toolGroupService, displaySetService);
        setWindowLevelActive();
      });
      unsubscriptions.push(unsubscribe);
      toolbarService.init(extensionManager);
      toolbarService.addButtons(_toolbarButtons_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
      toolbarService.createButtonSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Crosshairs', 'Pan', 'RectangleROIStartEndThreshold', 'fusionPTColormap']);

      // For the hanging protocol we need to decide on the window level
      // based on whether the SUV is corrected or not, hence we can't hard
      // code the window level in the hanging protocol but we add a custom
      // attribute to the hanging protocol that will be used to get the
      // window level based on the metadata
      hangingProtocolService.addCustomAttribute('getPTVOIRange', 'get PT VOI based on corrected or not', props => {
        const ptDisplaySet = props.find(imageSet => imageSet.Modality === 'PT');
        if (!ptDisplaySet) {
          return;
        }
        const {
          imageId
        } = ptDisplaySet.images[0];
        const imageIdScalingFactor = MetadataProvider.get('scalingModule', imageId);
        const isSUVAvailable = imageIdScalingFactor && imageIdScalingFactor.suvbw;
        if (isSUVAvailable) {
          return {
            windowWidth: 5,
            windowCenter: 2.5
          };
        }
        return;
      });
    },
    onModeExit: _ref3 => {
      let {
        servicesManager
      } = _ref3;
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService
      } = servicesManager.services;
      unsubscriptions.forEach(unsubscribe => unsubscribe());
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: _ref4 => {
      let {
        modalities,
        study
      } = _ref4;
      const modalities_list = modalities.split('\\');
      const invalidModalities = ['SM'];
      const isValid = modalities_list.includes('CT') && modalities_list.includes('PT') && !invalidModalities.some(modality => modalities_list.includes(modality)) &&
      // This is study is a 4D study with PT and CT and not a 3D study for the tmtv
      // mode, until we have a better way to identify 4D studies we will use the
      // StudyInstanceUID to identify the study
      // Todo: when we add the 4D mode which comes with a mechanism to identify
      // 4D studies we can use that
      study.studyInstanceUid !== '1.3.6.1.4.1.12842.1.1.14.3.20220915.105557.468.2963630849';

      // there should be both CT and PT modalities and the modality should not be SM
      return isValid;
    },
    routes: [{
      path: 'tmtv',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: _ref5 => {
        let {
          location,
          servicesManager
        } = _ref5;
        return {
          id: ohif.layout,
          props: {
            // leftPanels: [ohif.thumbnailList],
            rightPanels: [tmtv.ROIThresholdPanel, tmtv.petSUV],
            viewports: [{
              namespace: cs3d.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    hangingProtocol: tmtv.hangingProtocol,
    sopClassHandlers: [ohif.sopClassHandler],
    hotkeys: [..._ohif_core__WEBPACK_IMPORTED_MODULE_0__.hotkeys.defaults.hotkeyBindings]
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
  reactHotLoader.register(MetadataProvider, "MetadataProvider", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(ohif, "ohif", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(cs3d, "cs3d", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(tmtv, "tmtv", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(extensionDependencies, "extensionDependencies", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(unsubscriptions, "unsubscriptions", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(modeFactory, "modeFactory", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(mode, "mode", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/tmtv/src/initToolGroups.js":
/*!*************************************************!*\
  !*** ../../../modes/tmtv/src/initToolGroups.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toolGroupIds: () => (/* binding */ toolGroupIds)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
const toolGroupIds = {
  CT: 'ctToolGroup',
  PT: 'ptToolGroup',
  Fusion: 'fusionToolGroup',
  MIP: 'mipToolGroup',
  default: 'default'
  // MPR: 'mpr',
};

function _initToolGroups(toolNames, Enums, toolGroupService, commandsManager) {
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
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.Magnify
    }],
    enabled: [{
      toolName: toolNames.SegmentationDisplay
    }],
    disabled: [{
      toolName: toolNames.Crosshairs
    }]
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
      getTextCallback: (callback, eventDetails) => {
        commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails
        });
      },
      changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
        callback,
        data,
        eventDetails
      })
    }
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.CT, tools, toolsConfig);
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.PT, {
    active: tools.active,
    passive: [...tools.passive, {
      toolName: 'RectangleROIStartEndThreshold'
    }],
    enabled: tools.enabled,
    disabled: tools.disabled
  }, toolsConfig);
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.Fusion, tools, toolsConfig);
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.default, tools, toolsConfig);
  const mipTools = {
    active: [{
      toolName: toolNames.VolumeRotateMouseWheel
    }, {
      toolName: toolNames.MipJumpToClick,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }],
    enabled: [{
      toolName: toolNames.SegmentationDisplay
    }]
  };
  const mipToolsConfig = {
    [toolNames.VolumeRotateMouseWheel]: {
      rotateIncrementDegrees: 0.1
    },
    [toolNames.MipJumpToClick]: {
      targetViewportIds: ['ptAXIAL', 'ptCORONAL', 'ptSAGITTAL']
    }
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.MIP, mipTools, mipToolsConfig);
}
function initMPRToolGroup(toolNames, Enums, toolGroupService, commandsManager) {
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
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.SegmentationDisplay
    }],
    disabled: [{
      toolName: toolNames.Crosshairs
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
function initToolGroups(toolNames, Enums, toolGroupService, commandsManager) {
  _initToolGroups(toolNames, Enums, toolGroupService, commandsManager);
  // initMPRToolGroup(toolNames, Enums, toolGroupService, commandsManager);
}
const _default = initToolGroups;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(toolGroupIds, "toolGroupIds", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/initToolGroups.js");
  reactHotLoader.register(_initToolGroups, "_initToolGroups", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/initToolGroups.js");
  reactHotLoader.register(initMPRToolGroup, "initMPRToolGroup", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/initToolGroups.js");
  reactHotLoader.register(initToolGroups, "initToolGroups", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/initToolGroups.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/initToolGroups.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/tmtv/src/toolbarButtons.js":
/*!*************************************************!*\
  !*** ../../../modes/tmtv/src/toolbarButtons.js ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initToolGroups */ "../../../modes/tmtv/src/initToolGroups.js");
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
function _createButton(type, id, icon, label, commands, tooltip) {
  return {
    id,
    icon,
    label,
    type,
    commands,
    tooltip
  };
}
function _createColormap(label, colormap) {
  return {
    id: label.toString(),
    title: label,
    subtitle: label,
    type: 'action',
    commands: [{
      commandName: 'setFusionPTColormap',
      commandOptions: {
        toolGroupId: _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion,
        colormap
      }
    }, {
      commandName: 'setFusionPTColormap',
      commandOptions: {
        toolGroupId: _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion,
        colormap
      }
    }]
  };
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
    primary: _createToolButton('Length', 'tool-length', 'Length', [..._createCommands('setToolActive', 'Length', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Length'),
    secondary: {
      icon: 'chevron-down',
      label: '',
      isActive: true,
      tooltip: 'More Measure Tools'
    },
    items: [_createToolButton('Length', 'tool-length', 'Length', [..._createCommands('setToolActive', 'Length', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Length Tool'), _createToolButton('Bidirectional', 'tool-bidirectional', 'Bidirectional', [..._createCommands('setToolActive', 'Bidirectional', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Bidirectional Tool'), _createToolButton('ArrowAnnotate', 'tool-annotate', 'Annotation', [..._createCommands('setToolActive', 'ArrowAnnotate', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Arrow Annotate'), _createToolButton('EllipticalROI', 'tool-elipse', 'Ellipse', [..._createCommands('setToolActive', 'EllipticalROI', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Ellipse Tool'), _createToolButton('CircleROI', 'tool-circle', 'Circle', [..._createCommands('setToolActive', 'CircleROI', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Circle Tool')]
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
    commands: [..._createCommands('setToolActive', 'Zoom', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])]
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
},
// Window Level + Presets...
{
  id: 'WindowLevel',
  type: 'ohif.splitButton',
  props: {
    groupId: 'WindowLevel',
    primary: _createToolButton('WindowLevel', 'tool-window-level', 'Window Level', [..._createCommands('setToolActive', 'WindowLevel', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])], 'Window Level'),
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
}, {
  id: 'Crosshairs',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: 'Crosshairs',
    commands: [..._createCommands('setToolActive', 'Crosshairs', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])]
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
    commands: [..._createCommands('setToolActive', 'Pan', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.Fusion
    // toolGroupIds.MPR,
    ])]
  }
}, {
  id: 'RectangleROIStartEndThreshold',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-create-threshold',
    label: 'Rectangle ROI Threshold',
    commands: [..._createCommands('setToolActive', 'RectangleROIStartEndThreshold', [_initToolGroups__WEBPACK_IMPORTED_MODULE_2__.toolGroupIds.PT]), {
      commandName: 'displayNotification',
      commandOptions: {
        title: 'RectangleROI Threshold Tip',
        text: 'RectangleROI Threshold tool should be used on PT Axial Viewport',
        type: 'info'
      }
    }, {
      commandName: 'setViewportActive',
      commandOptions: {
        viewportId: 'ptAXIAL'
      }
    }]
  }
}, {
  id: 'fusionPTColormap',
  type: 'ohif.splitButton',
  props: {
    groupId: 'fusionPTColormap',
    primary: _createToolButton('fusionPTColormap', 'tool-fusion-color', 'Fusion PT Colormap', [], 'Fusion PT Colormap'),
    secondary: {
      icon: 'chevron-down',
      label: 'PT Colormap',
      isActive: true,
      tooltip: 'PET Image Colormap'
    },
    isAction: true,
    // ?
    renderer: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.WindowLevelMenuItem,
    items: [_createColormap('HSV', 'hsv'), _createColormap('Hot Iron', 'hot_iron'), _createColormap('S PET', 's_pet'), _createColormap('Red Hot', 'red_hot'), _createColormap('Perfusion', 'perfusion'), _createColormap('Rainbow', 'rainbow_2'), _createColormap('SUV', 'suv'), _createColormap('GE 256', 'ge_256'), _createColormap('GE', 'ge'), _createColormap('Siemens', 'siemens')]
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
  reactHotLoader.register(windowLevelPresets, "windowLevelPresets", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createButton, "_createButton", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createColormap, "_createColormap", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createActionButton, "_createActionButton", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createToggleButton, "_createToggleButton", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createToolButton, "_createToolButton", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createWwwcPreset, "_createWwwcPreset", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_createCommands, "_createCommands", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(toolbarButtons, "toolbarButtons", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/toolbarButtons.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js":
/*!*******************************************************************!*\
  !*** ../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setCrosshairsConfiguration)
/* harmony export */ });
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initToolGroups */ "../../../modes/tmtv/src/initToolGroups.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function setCrosshairsConfiguration(matches, toolNames, toolGroupService, displaySetService) {
  const matchDetails = matches.get('ctDisplaySet');
  if (!matchDetails) {
    return;
  }
  const {
    SeriesInstanceUID
  } = matchDetails;
  const displaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
  const toolConfig = toolGroupService.getToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.Crosshairs);
  const crosshairsConfig = {
    ...toolConfig,
    filterActorUIDsToSetSlabThickness: [displaySets[0].displaySetInstanceUID]
  };
  toolGroupService.setToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.Crosshairs, crosshairsConfig);
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(setCrosshairsConfiguration, "setCrosshairsConfiguration", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/utils/setCrosshairsConfiguration.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/tmtv/src/utils/setFusionActiveVolume.js":
/*!**************************************************************!*\
  !*** ../../../modes/tmtv/src/utils/setFusionActiveVolume.js ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setFusionActiveVolume)
/* harmony export */ });
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initToolGroups */ "../../../modes/tmtv/src/initToolGroups.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function setFusionActiveVolume(matches, toolNames, toolGroupService, displaySetService) {
  const matchDetails = matches.get('ptDisplaySet');
  if (!matchDetails) {
    return;
  }
  const {
    SeriesInstanceUID
  } = matchDetails;
  const displaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
  if (!displaySets || displaySets.length === 0) {
    return;
  }
  const wlToolConfig = toolGroupService.getToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.WindowLevel);
  const ellipticalToolConfig = toolGroupService.getToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.EllipticalROI);

  // Todo: this should not take into account the loader id
  const volumeId = `cornerstoneStreamingImageVolume:${displaySets[0].displaySetInstanceUID}`;
  const windowLevelConfig = {
    ...wlToolConfig,
    volumeId
  };
  const ellipticalROIConfig = {
    ...ellipticalToolConfig,
    volumeId
  };
  toolGroupService.setToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.WindowLevel, windowLevelConfig);
  toolGroupService.setToolConfiguration(_initToolGroups__WEBPACK_IMPORTED_MODULE_0__.toolGroupIds.Fusion, toolNames.EllipticalROI, ellipticalROIConfig);
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(setFusionActiveVolume, "setFusionActiveVolume", "/Users/smartxx/xV/DICOM/Viewers/modes/tmtv/src/utils/setFusionActiveVolume.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/tmtv/package.json":
/*!****************************************!*\
  !*** ../../../modes/tmtv/package.json ***!
  \****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/mode-tmtv","version":"3.6.0","description":"Total Metabolic Tumor Volume Workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-tmtv.umd.js","module":"src/index.js","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"keywords":["ohif-mode"],"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-cornerstone":"3.6.0","@ohif/extension-cornerstone-dicom-sr":"3.6.0","@ohif/extension-default":"3.6.0","@ohif/extension-dicom-pdf":"3.6.0","@ohif/extension-dicom-video":"3.6.0","@ohif/extension-measurement-tracking":"3.6.0"},"dependencies":{"@babel/runtime":"^7.20.13"},"devDependencies":{"webpack":"^5.50.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_tmtv_src_index_js.js.map