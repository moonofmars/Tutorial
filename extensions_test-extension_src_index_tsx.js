"use strict";
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_test-extension_src_index_tsx"],{

/***/ "../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts ***!
  \************************************************************************************/
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
const _default = (study, extraData) => Math.max(...(extraData?.displaySets?.map?.(ds => ds.numImageFrames ?? 0) || [0]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts":
/*!**************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts ***!
  \**************************************************************************************/
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
const _default = (study, extraData) => extraData?.displaySets?.length;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/custom-attribute/sameAs.ts":
/*!*************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-attribute/sameAs.ts ***!
  \*************************************************************************/
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
const _default = function (displaySet, options) {
  const {
    sameAttribute,
    sameDisplaySetId
  } = this;
  if (!sameAttribute) {
    console.log("sameAttribute not defined in", this);
    return `sameAttribute not defined in ${this.id}`;
  }
  if (!sameDisplaySetId) {
    console.log("sameDisplaySetId not defined in", this);
    return `sameDisplaySetId not defined in ${this.id}`;
  }
  const {
    displaySetMatchDetails,
    displaySets
  } = options;
  const match = displaySetMatchDetails.get(sameDisplaySetId);
  if (!match) {
    console.log("No match for display set", sameDisplaySetId);
    return false;
  }
  const {
    displaySetInstanceUID
  } = match;
  const altDisplaySet = displaySets.find(it => it.displaySetInstanceUID == displaySetInstanceUID);
  if (!altDisplaySet) {
    console.log("No display set found with", displaySetInstanceUID, "in", displaySets);
    return false;
  }
  const testValue = altDisplaySet[sameAttribute];
  return testValue === displaySet[sameAttribute];
};
/**
 * This function extracts an attribute from the already matched display sets, and
 * compares it to the attribute in the current display set, and indicates if they match.
 * From 'this', it uses:
 *    `sameAttribute` as the attribute name to look for
 *    `sameDisplaySetId` as the display set id to look for
 * From `options`, it looks for 
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-attribute/sameAs.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/custom-context-menu/codingValues.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/codingValues.ts ***!
  \**********************************************************************************/
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
 * Coding values is a map of simple string coding values to a set of
 * attributes associated with the coding value.
 *
 * The simple string is in the format `<codingSchemeDesignator>:<codingValue>`
 * That allows extracting the DICOM attributes from the designator/value, and
 * allows for passing around the simple string.
 * The additional attributes contained in the object include:
 *       * text - this is the coding scheme text display value, and may be language specific
 *       * type - this defines a named type, typically 'site'.  Different names can be used
 *                to allow setting different findingSites values in order to define a hierarchy.
 *       * color - used to apply annotation color
 * It is also possible to define additional attributes here, used by custom
 * extensions.
 *
 * See https://dicom.nema.org/medical/dicom/current/output/html/part16.html
 * for definitions of SCT and other code values.
 */
const codingValues = {
  id: 'codingValues',
  // Sites
  'SCT:69536005': {
    text: 'Head',
    type: 'site'
  },
  'SCT:45048000': {
    text: 'Neck',
    type: 'site'
  },
  'SCT:818981001': {
    text: 'Abdomen',
    type: 'site'
  },
  'SCT:816092008': {
    text: 'Pelvis',
    type: 'site'
  },
  // Findings
  'SCT:371861004': {
    text: 'Mild intimal coronary irregularities',
    color: 'green'
  },
  'SCT:194983005': {
    text: 'Aortic insufficiency',
    color: 'darkred'
  },
  'SCT:399232001': {
    text: '2-chamber'
  },
  'SCT:103340004': {
    text: 'SAX'
  },
  'SCT:91134007': {
    text: 'MV'
  },
  'SCT:122972007': {
    text: 'PV'
  },
  // Orientations
  'SCT:24422004': {
    text: 'Axial',
    color: '#000000',
    type: 'orientation'
  },
  'SCT:81654009': {
    text: 'Coronal',
    color: '#000000',
    type: 'orientation'
  },
  'SCT:30730003': {
    text: 'Sagittal',
    color: '#000000',
    type: 'orientation'
  }
};
const _default = codingValues;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(codingValues, "codingValues", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-context-menu/codingValues.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-context-menu/codingValues.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts ***!
  \*****************************************************************************************/
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
const codeMenuItem = {
  id: '@ohif/contextMenuAnnotationCode',
  /** Applies the code value setup for this item */
  transform: function (customizationService) {
    const {
      code: codeRef
    } = this;
    if (!codeRef) throw new Error(`item ${this} has no code ref`);
    const codingValues = customizationService.get('codingValues');
    const code = codingValues[codeRef];
    return {
      ...this,
      codeRef,
      code: {
        ref: codeRef,
        ...code
      },
      label: code.text,
      commands: [{
        commandName: 'updateMeasurement'
      }]
    };
  }
};
const _default = codeMenuItem;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(codeMenuItem, "codeMenuItem", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts ***!
  \*****************************************************************************************/
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
const findingsContextMenu = {
  id: 'measurementsContextMenu',
  customizationType: 'ohif.contextMenu',
  menus: [{
    id: 'forExistingMeasurement',
    // selector restricts context menu to when there is nearbyToolData
    selector: _ref => {
      let {
        nearbyToolData
      } = _ref;
      return !!nearbyToolData;
    },
    items: [{
      customizationType: 'ohif.contextSubMenu',
      label: 'Site',
      actionType: 'ShowSubMenu',
      subMenu: 'siteSelectionSubMenu'
    }, {
      customizationType: 'ohif.contextSubMenu',
      label: 'Finding',
      actionType: 'ShowSubMenu',
      subMenu: 'findingSelectionSubMenu'
    }, {
      // customizationType is implicit here in the configuration setup
      label: 'Delete Measurement',
      commands: [{
        commandName: 'deleteMeasurement'
      }]
    }, {
      label: 'Add Label',
      commands: [{
        commandName: 'setMeasurementLabel'
      }]
    },
    // The example below shows how to include a delegating sub-menu,
    // Only available on the @ohif/mnGrid hanging protocol
    // To demonstrate, select the 3x1 layout from the protocol menu
    // and right click on a measurement.
    {
      label: 'IncludeSubMenu',
      selector: _ref2 => {
        let {
          protocol
        } = _ref2;
        return protocol?.id === '@ohif/mnGrid';
      },
      delegating: true,
      subMenu: 'orientationSelectionSubMenu'
    }]
  }, {
    id: 'orientationSelectionSubMenu',
    selector: _ref3 => {
      let {
        nearbyToolData
      } = _ref3;
      return false;
    },
    items: [{
      customizationType: '@ohif/contextMenuAnnotationCode',
      code: 'SCT:24422004'
    }, {
      customizationType: '@ohif/contextMenuAnnotationCode',
      code: 'SCT:81654009'
    }]
  }, {
    id: 'findingSelectionSubMenu',
    selector: _ref4 => {
      let {
        nearbyToolData
      } = _ref4;
      return false;
    },
    items: [{
      customizationType: '@ohif/contextMenuAnnotationCode',
      code: 'SCT:371861004'
    }, {
      customizationType: '@ohif/contextMenuAnnotationCode',
      code: 'SCT:194983005'
    }]
  }, {
    id: 'siteSelectionSubMenu',
    selector: _ref5 => {
      let {
        nearbyToolData
      } = _ref5;
      return !!nearbyToolData;
    },
    items: [{
      customizationType: '@ohif/contextMenuAnnotationCode',
      code: 'SCT:69536005'
    }, {
      customizationType: '@ohif/contextMenuAnnotationCode',
      code: 'SCT:45048000'
    }]
  }]
};
const _default = findingsContextMenu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(findingsContextMenu, "findingsContextMenu", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/custom-context-menu/index.ts":
/*!***************************************************************************!*\
  !*** ../../../extensions/test-extension/src/custom-context-menu/index.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   codingValues: () => (/* reexport safe */ _codingValues__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   contextMenuCodeItem: () => (/* reexport safe */ _contextMenuCodeItem__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   findingsContextMenu: () => (/* reexport safe */ _findingsContextMenu__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _codingValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./codingValues */ "../../../extensions/test-extension/src/custom-context-menu/codingValues.ts");
/* harmony import */ var _contextMenuCodeItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contextMenuCodeItem */ "../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts");
/* harmony import */ var _findingsContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./findingsContextMenu */ "../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





/***/ }),

/***/ "../../../extensions/test-extension/src/getCustomizationModule.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/test-extension/src/getCustomizationModule.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* harmony import */ var _custom_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-context-menu */ "../../../extensions/test-extension/src/custom-context-menu/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function getCustomizationModule() {
  return [{
    name: 'custom-context-menu',
    value: [_custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.codingValues, _custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.contextMenuCodeItem, _custom_context_menu__WEBPACK_IMPORTED_MODULE_0__.findingsContextMenu]
  }];
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getCustomizationModule, "getCustomizationModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/getCustomizationModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/id.js":
/*!****************************************************!*\
  !*** ../../../extensions/test-extension/src/id.js ***!
  \****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/test-extension/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/src/index.tsx":
/*!********************************************************!*\
  !*** ../../../extensions/test-extension/src/index.tsx ***!
  \********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/test-extension/src/id.js");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/test-extension/src/getCustomizationModule.ts");
/* harmony import */ var _custom_attribute_sameAs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-attribute/sameAs */ "../../../extensions/test-extension/src/custom-attribute/sameAs.ts");
/* harmony import */ var _custom_attribute_numberOfDisplaySets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-attribute/numberOfDisplaySets */ "../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts");
/* harmony import */ var _custom_attribute_maxNumImageFrames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom-attribute/maxNumImageFrames */ "../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


// import {setViewportZoomPan, storeViewportZoomPan } from './custom-viewport/setViewportZoomPan';




/**
 * The test extension provides additional behaviour for testing various
 * customizations and settings for OHIF.
 */
const testExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  /** Register additional behaviour:
   *   * HP custom attribute seriesDescriptions to retrieve an array of all series descriptions
   *   * HP custom attribute numberOfDisplaySets to retrieve the number of display sets
   *   * HP custom attribute numberOfDisplaySetsWithImages to retrieve the number of display sets containing images
   *   * HP custom attribute to return a boolean true, when the attribute sameAttribute has the same
   *     value as another series description in an already matched display set selector named with the value
   *     in `sameDisplaySetId`
   */
  preRegistration: _ref => {
    let {
      servicesManager
    } = _ref;
    const {
      hangingProtocolService
    } = servicesManager.services;
    hangingProtocolService.addCustomAttribute('numberOfDisplaySets', 'Number of displays sets', _custom_attribute_numberOfDisplaySets__WEBPACK_IMPORTED_MODULE_3__["default"]);
    hangingProtocolService.addCustomAttribute('maxNumImageFrames', 'Maximum of number of image frames', _custom_attribute_maxNumImageFrames__WEBPACK_IMPORTED_MODULE_4__["default"]);
    hangingProtocolService.addCustomAttribute('sameAs', 'Match an attribute in an existing display set', _custom_attribute_sameAs__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  /** Registers some customizations */
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_1__["default"]
};
const _default = testExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(testExtension, "testExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/test-extension/src/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/test-extension/package.json":
/*!*******************************************************!*\
  !*** ../../../extensions/test-extension/package.json ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@ohif/extension-test","version":"3.6.0","description":"OHIF extension used inside e2e testing","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-test.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/ui":"3.6.0","dcmjs":"0.29.4","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^17.0.2"},"dependencies":{"@babel/runtime":"^7.20.13","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_test-extension_src_index_tsx.js.map