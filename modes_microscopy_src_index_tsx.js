"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["modes_microscopy_src_index_tsx"],{

/***/ "../../../modes/microscopy/src/id.js":
/*!*******************************************!*\
  !*** ../../../modes/microscopy/src/id.js ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/microscopy/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/microscopy/src/index.tsx":
/*!***********************************************!*\
  !*** ../../../modes/microscopy/src/index.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cornerstone: () => (/* binding */ cornerstone),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../modes/microscopy/src/id.js");
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/microscopy/src/toolbarButtons.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocols: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-default.panelModule.measure'
};
const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
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
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-dicom-microscopy': '^3.0.0'
};
function modeFactory() {
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
    routeName: 'microscopy',
    displayName: 'Microscopy',
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
        toolbarService
      } = servicesManager.services;
      toolbarService.init(extensionManager);
      toolbarService.addButtons(_toolbarButtons__WEBPACK_IMPORTED_MODULE_2__["default"]);
      toolbarService.createButtonSection('primary', ['MeasurementTools', 'dragPan']);
    },
    onModeExit: _ref2 => {
      let {
        servicesManager
      } = _ref2;
      const {
        toolbarService
      } = servicesManager.services;
      toolbarService.reset();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: _ref3 => {
      let {
        modalities
      } = _ref3;
      const modalities_list = modalities.split('\\');

      // Slide Microscopy and ECG modality not supported by basic mode yet
      return modalities_list.includes('SM');
    },
    routes: [{
      path: 'microscopy',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: _ref4 => {
        let {
          location,
          servicesManager
        } = _ref4;
        return {
          id: ohif.layout,
          props: {
            leftPanels: [ohif.leftPanel],
            leftPanelDefaultClosed: true,
            // we have problem with rendering thumbnails for microscopy images
            rightPanelDefaultClosed: true,
            // we do not have the save microscopy measurements yet
            rightPanels: ['@ohif/extension-dicom-microscopy.panelModule.measure'],
            viewports: [{
              namespace: '@ohif/extension-dicom-microscopy.viewportModule.microscopy-dicom',
              displaySetsToDisplay: ['@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler']
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
    hangingProtocols: [ohif.hangingProtocols],
    hangingProtocol: ['default'],
    // Order is important in sop class handlers when two handlers both use
    // the same sop class under different situations.  In that case, the more
    // general handler needs to come last.  For this case, the dicomvideo must
    // come first to remove video transfer syntax before ohif uses images
    sopClassHandlers: ['@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler', dicomvideo.sopClassHandler, dicompdf.sopClassHandler],
    hotkeys: [..._ohif_core__WEBPACK_IMPORTED_MODULE_0__.hotkeys.defaults.hotkeyBindings]
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_1__.id,
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
  reactHotLoader.register(ohif, "ohif", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(cornerstone, "cornerstone", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(dicomvideo, "dicomvideo", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(dicompdf, "dicompdf", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(extensionDependencies, "extensionDependencies", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(modeFactory, "modeFactory", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(mode, "mode", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/microscopy/src/toolbarButtons.js":
/*!*******************************************************!*\
  !*** ../../../modes/microscopy/src/toolbarButtons.js ***!
  \*******************************************************/
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
// TODO: torn, can either bake this here; or have to create a whole new button type
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
    primary: _createToolButton('line', 'tool-length', 'Line', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'line'
      },
      context: 'MICROSCOPY'
    }], 'Line'),
    secondary: {
      icon: 'chevron-down',
      label: '',
      isActive: true,
      tooltip: 'More Measure Tools'
    },
    items: [_createToolButton('line', 'tool-length', 'Line', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'line'
      },
      context: 'MICROSCOPY'
    }], 'Line Tool'), _createToolButton('point', 'tool-point', 'Point', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'point'
      },
      context: 'MICROSCOPY'
    }], 'Point Tool'), _createToolButton('polygon', 'tool-polygon', 'Polygon', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'polygon'
      },
      context: 'MICROSCOPY'
    }], 'Polygon Tool'), _createToolButton('circle', 'tool-circle', 'Circle', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'circle'
      },
      context: 'MICROSCOPY'
    }], 'Circle Tool'), _createToolButton('box', 'tool-rectangle', 'Box', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'box'
      },
      context: 'MICROSCOPY'
    }], 'Box Tool'), _createToolButton('freehandpolygon', 'tool-freehand-polygon', 'Freehand Polygon', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'freehandpolygon'
      },
      context: 'MICROSCOPY'
    }], 'Freehand Polygon Tool'), _createToolButton('freehandline', 'tool-freehand-line', 'Freehand Line', [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'freehandline'
      },
      context: 'MICROSCOPY'
    }], 'Freehand Line Tool')]
  }
},
// Pan...
{
  id: 'dragPan',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: 'Pan',
    commands: [{
      commandName: 'setToolActive',
      commandOptions: {
        toolName: 'dragPan'
      },
      context: 'MICROSCOPY'
    }]
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
  reactHotLoader.register(_createButton, "_createButton", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/toolbarButtons.js");
  reactHotLoader.register(_createActionButton, "_createActionButton", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/toolbarButtons.js");
  reactHotLoader.register(_createToggleButton, "_createToggleButton", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/toolbarButtons.js");
  reactHotLoader.register(_createToolButton, "_createToolButton", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/toolbarButtons.js");
  reactHotLoader.register(toolbarButtons, "toolbarButtons", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/toolbarButtons.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/modes/microscopy/src/toolbarButtons.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../modes/microscopy/package.json":
/*!**********************************************!*\
  !*** ../../../modes/microscopy/package.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/mode-microscopy","version":"3.6.0","description":"OHIF mode for DICOM microscopy","author":"OHIF","license":"MIT","main":"dist/ohif-mode-microscopy.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-mode"],"publishConfig":{"access":"public"},"module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/extension-dicom-microscopy":"3.6.0"},"dependencies":{"@babel/runtime":"^7.20.13"}}');

/***/ })

}]);
//# sourceMappingURL=modes_microscopy_src_index_tsx.js.map