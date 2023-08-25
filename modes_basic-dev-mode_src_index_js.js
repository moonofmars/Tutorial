"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_basic-dev-mode_src_index_js"],{

/***/ "../../../modes/basic-dev-mode/src/id.js":
/*!***********************************************!*\
  !*** ../../../modes/basic-dev-mode/src/id.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/basic-dev-mode/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-dev-mode/src/index.js":
/*!**************************************************!*\
  !*** ../../../modes/basic-dev-mode/src/index.js ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toolbarButtons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbarButtons.js */ "../../../modes/basic-dev-mode/src/toolbarButtons.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id */ "../../../modes/basic-dev-mode/src/id.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const configs = {
  Length: {}
  //
};

const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  measurements: '@ohif/extension-default.panelModule.measure',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
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
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1'
};
function modeFactory(_ref) {
  let {
    modeConfiguration
  } = _ref;
  return {
    id: _id__WEBPACK_IMPORTED_MODULE_2__.id,
    routeName: 'dev',
    displayName: 'Basic Dev Viewer',
    /**
     * Lifecycle hooks
     */
    onModeEnter: _ref2 => {
      let {
        servicesManager,
        extensionManager
      } = _ref2;
      const {
        toolbarService,
        toolGroupService
      } = servicesManager.services;
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
          toolName: toolNames.Bidirectional
        }, {
          toolName: toolNames.Probe
        }, {
          toolName: toolNames.EllipticalROI
        }, {
          toolName: toolNames.CircleROI
        }, {
          toolName: toolNames.RectangleROI
        }, {
          toolName: toolNames.StackScroll
        }, {
          toolName: toolNames.CalibrationLine
        }]
        // enabled
        // disabled
      };

      const toolGroupId = 'default';
      toolGroupService.createToolGroupAndAddTools(toolGroupId, tools, configs);
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
      toolbarService.addButtons(_toolbarButtons_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
      toolbarService.createButtonSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Pan', 'Layout', 'MoreTools']);
    },
    onModeExit: _ref3 => {
      let {
        servicesManager
      } = _ref3;
      const {
        toolGroupService,
        measurementService,
        toolbarService
      } = servicesManager.services;
      toolGroupService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: _ref4 => {
      let {
        modalities
      } = _ref4;
      const modalities_list = modalities.split('\\');

      // Slide Microscopy modality not supported by basic mode yet
      return !modalities_list.includes('SM');
    },
    routes: [{
      path: 'viewer-cs3d',
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
            // TODO: Should be optional, or required to pass empty array for slots?
            leftPanels: [ohif.thumbnailList],
            rightPanels: [ohif.measurements],
            viewports: [{
              namespace: cs3d.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler]
            }, {
              namespace: dicomvideo.viewport,
              displaySetsToDisplay: [dicomvideo.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    hangingProtocol: 'default',
    sopClassHandlers: [dicomvideo.sopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler],
    hotkeys: [..._ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.defaults.hotkeyBindings]
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_2__.id,
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
  reactHotLoader.register(configs, "configs", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(ohif, "ohif", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(cs3d, "cs3d", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(dicomsr, "dicomsr", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(dicomvideo, "dicomvideo", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(dicompdf, "dicompdf", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(extensionDependencies, "extensionDependencies", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(modeFactory, "modeFactory", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(mode, "mode", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-dev-mode/src/toolbarButtons.js":
/*!***********************************************************!*\
  !*** ../../../modes/basic-dev-mode/src/toolbarButtons.js ***!
  \***********************************************************/
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
    }], 'Length Tool'), _createToolButton('Bidirectional', 'tool-bidirectional', 'Bidirectional', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'Bidirectional'
      },
      context: 'CORNERSTONE'
    }], 'Bidirectional Tool'), _createToolButton('EllipticalROI', 'tool-elipse', 'Ellipse', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'EllipticalROI'
      },
      context: 'CORNERSTONE'
    }], 'Ellipse Tool'), _createToolButton('CircleROI', 'tool-circle', 'Circle', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'CircleROI'
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
  type: 'ohif.layoutSelector'
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
    }], 'Flip Horizontal'), _createToolButton('StackScroll', 'tool-stack-scroll', 'Stack Scroll', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'StackScroll'
      },
      context: 'CORNERSTONE'
    }], 'Stack Scroll'), _createActionButton('invert', 'tool-invert', 'Invert', [{
      commandName: 'invertViewport',
      commandOptions: {},
      context: 'CORNERSTONE'
    }], 'Invert Colors'), _createToolButton('CalibrationLine', 'tool-calibration', 'Calibration', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'CalibrationLine'
      },
      context: 'CORNERSTONE'
    }], 'Calibration Line')]
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
  reactHotLoader.register(windowLevelPresets, "windowLevelPresets", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createButton, "_createButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createActionButton, "_createActionButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createToggleButton, "_createToggleButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createToolButton, "_createToolButton", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(_createWwwcPreset, "_createWwwcPreset", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(toolbarButtons, "toolbarButtons", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/basic-dev-mode/src/toolbarButtons.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/basic-dev-mode/package.json":
/*!**************************************************!*\
  !*** ../../../modes/basic-dev-mode/package.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/mode-basic-dev-mode","version":"3.6.0","description":"Basic OHIF Viewer Using Cornerstone","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-basic-dev-mode.umd.js","module":"src/index.js","engines":{"node":">=10","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-cornerstone":"3.6.0","@ohif/extension-cornerstone-dicom-sr":"3.6.0","@ohif/extension-default":"3.6.0","@ohif/extension-dicom-pdf":"3.6.0","@ohif/extension-dicom-video":"3.6.0"},"dependencies":{"@babel/runtime":"^7.20.13"},"devDependencies":{"webpack":"^5.50.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_basic-dev-mode_src_index_js.js.map