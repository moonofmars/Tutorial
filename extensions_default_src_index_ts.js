(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_default_src_index_ts"],{

/***/ "../../../extensions/default/src/Actions/createReportAsync.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Actions/createReportAsync.tsx ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
  reactHotLoader.register(createReportAsync, "createReportAsync", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Actions/createReportAsync.tsx");
  reactHotLoader.register(Loading, "Loading", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Actions/createReportAsync.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Actions/createReportAsync.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContextMenuController)
/* harmony export */ });
/* harmony import */ var _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuItemsBuilder */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
/* harmony import */ var _platform_ui_src_components_ContextMenu_ContextMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../platform/ui/src/components/ContextMenu/ContextMenu */ "../../ui/src/components/ContextMenu/ContextMenu.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


/**
 * The context menu controller is a helper class that knows how
 * to manage context menus based on the UI Customization Service.
 * There are a few parts to this:
 *    1. Basic controls to manage displaying and hiding context menus
 *    2. Menu selection services, which use the UI customization service
 *       to choose which menu to display
 *    3. Menu item adapter services to convert menu items into displayable and actionable items.
 *
 * The format for a menu is defined in the exported type MenuItem
 */
class ContextMenuController {
  constructor(servicesManager, commandsManager) {
    this.commandsManager = void 0;
    this.services = void 0;
    this.menuItems = void 0;
    this.services = servicesManager.services;
    this.commandsManager = commandsManager;
  }
  closeContextMenu() {
    this.services.uiDialogService.dismiss({
      id: 'context-menu'
    });
  }

  /**
   * Figures out which context menu is appropriate to display and shows it.
   *
   * @param contextMenuProps - the context menu properties, see ./types.ts
   * @param viewportElement - the DOM element this context menu is related to
   * @param defaultPointsPosition - a default position to show the context menu
   */
  showContextMenu(contextMenuProps, viewportElement, defaultPointsPosition) {
    if (!this.services.uiDialogService) {
      console.warn('Unable to show dialog; no UI Dialog Service available.');
      return;
    }
    const {
      event,
      subMenu,
      menuId,
      menus,
      selectorProps
    } = contextMenuProps;
    console.log('Getting items from', menus);
    const items = _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_0__.getMenuItems(selectorProps || contextMenuProps, event, menus, menuId);
    this.services.uiDialogService.dismiss({
      id: 'context-menu'
    });
    this.services.uiDialogService.create({
      id: 'context-menu',
      isDraggable: false,
      preservePosition: false,
      preventCutOf: true,
      defaultPosition: ContextMenuController._getDefaultPosition(defaultPointsPosition, event?.detail, viewportElement),
      event,
      content: _platform_ui_src_components_ContextMenu_ContextMenu__WEBPACK_IMPORTED_MODULE_1__["default"],
      // This naming is part of hte uiDialogService convention
      // Clicking outside simpy closes the dialog box.
      onClickOutside: () => this.services.uiDialogService.dismiss({
        id: 'context-menu'
      }),
      contentProps: {
        items,
        selectorProps,
        menus,
        event,
        subMenu,
        eventData: event?.detail,
        onClose: () => {
          this.services.uiDialogService.dismiss({
            id: 'context-menu'
          });
        },
        /**
         * Displays a sub-menu, removing this menu
         * @param {*} item
         * @param {*} itemRef
         * @param {*} subProps
         */
        onShowSubMenu: (item, itemRef, subProps) => {
          if (!itemRef.subMenu) {
            console.warn('No submenu defined for', item, itemRef, subProps);
            return;
          }
          this.showContextMenu({
            ...contextMenuProps,
            menuId: itemRef.subMenu
          }, viewportElement, defaultPointsPosition);
        },
        // Default is to run the specified commands.
        onDefault: (item, itemRef, subProps) => {
          this.commandsManager.run(item, {
            ...selectorProps,
            ...itemRef,
            subProps
          });
        }
      }
    });
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
ContextMenuController.getDefaultPosition = () => {
  return {
    x: 0,
    y: 0
  };
};
ContextMenuController._getEventDefaultPosition = eventDetail => ({
  x: eventDetail && eventDetail.currentPoints.client[0],
  y: eventDetail && eventDetail.currentPoints.client[1]
});
ContextMenuController._getElementDefaultPosition = element => {
  if (element) {
    const boundingClientRect = element.getBoundingClientRect();
    return {
      x: boundingClientRect.x,
      y: boundingClientRect.y
    };
  }
  return {
    x: undefined,
    y: undefined
  };
};
ContextMenuController._getCanvasPointsPosition = function () {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let element = arguments.length > 1 ? arguments[1] : undefined;
  const viewerPos = ContextMenuController._getElementDefaultPosition(element);
  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const point = {
      x: points[pointIndex][0] || points[pointIndex]['x'],
      y: points[pointIndex][1] || points[pointIndex]['y']
    };
    if (ContextMenuController._isValidPosition(point) && ContextMenuController._isValidPosition(viewerPos)) {
      return {
        x: point.x + viewerPos.x,
        y: point.y + viewerPos.y
      };
    }
  }
};
ContextMenuController._isValidPosition = source => {
  return source && typeof source.x === 'number' && typeof source.y === 'number';
};
/**
 * Returns the context menu default position. It look for the positions of: canvasPoints (got from selected), event that triggers it, current viewport element
 */
ContextMenuController._getDefaultPosition = (canvasPoints, eventDetail, viewerElement) => {
  function* getPositionIterator() {
    yield ContextMenuController._getCanvasPointsPosition(canvasPoints, viewerElement);
    yield ContextMenuController._getEventDefaultPosition(eventDetail);
    yield ContextMenuController._getElementDefaultPosition(viewerElement);
    yield ContextMenuController.getDefaultPosition();
  }
  const positionIterator = getPositionIterator();
  let current = positionIterator.next();
  let position = current.value;
  while (!current.done) {
    position = current.value;
    if (ContextMenuController._isValidPosition(position)) {
      positionIterator.return();
    }
    current = positionIterator.next();
  }
  return position;
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ContextMenuController, "ContextMenuController", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts":
/*!******************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adaptItem: () => (/* binding */ adaptItem),
/* harmony export */   findMenu: () => (/* binding */ findMenu),
/* harmony export */   findMenuById: () => (/* binding */ findMenuById),
/* harmony export */   findMenuDefault: () => (/* binding */ findMenuDefault),
/* harmony export */   getMenuItems: () => (/* binding */ getMenuItems)
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
 * Finds menu by menu id
 *
 * @returns Menu having the menuId
 */
function findMenuById(menus, menuId) {
  if (!menuId) {
    return;
  }
  return menus.find(menu => menu.id === menuId);
}

/**
 * Default finding menu method.  This method will go through
 * the list of menus until it finds the first one which
 * has no selector, OR has the selector, when applied to the
 * check props, return true.
 * The selectorProps are a set of provided properties which can be
 * passed into the selector function to determine when to display a menu.
 * For example, a selector function of:
 * `({displayset}) => displaySet?.SeriesDescription?.indexOf?.('Left')!==-1
 * would match series descriptions containing 'Left'.
 *
 * @param {Object[]} menus List of menus
 * @param {*} subProps
 * @returns
 */
function findMenuDefault(menus, subProps) {
  if (!menus) {
    return null;
  }
  return menus.find(menu => !menu.selector || menu.selector(subProps.selectorProps));
}

/**
 * Finds the menu to be used for different scenarios:
 * This will first look for a subMenu with the specified subMenuId
 * Next it will look for the first menu whose selector returns true.
 *
 * @param menus - List of menus
 * @param props - root props
 * @param menuIdFilter - menu id identifier (to be considered on selection)
 *      This is intended to support other types of filtering in the future.
 */
function findMenu(menus, props, menuIdFilter) {
  const {
    subMenu
  } = props;
  function* findMenuIterator() {
    yield findMenuById(menus, menuIdFilter || subMenu);
    yield findMenuDefault(menus, props);
  }
  const findIt = findMenuIterator();
  let current = findIt.next();
  let menu = current.value;
  while (!current.done) {
    menu = current.value;
    if (menu) {
      findIt.return();
    }
    current = findIt.next();
  }
  console.log('Menu chosen', menu?.id || 'NONE');
  return menu;
}

/**
 * Returns the menu from a list of possible menus, based on the actual state of component props and tool data nearby.
 * This uses the findMenu command above to first find the appropriate
 * menu, and then it chooses the actual contents of that menu.
 * A menu item can be optional by implementing the 'selector',
 * which will be called with the selectorProps, and if it does not return true,
 * then the item is excluded.
 *
 * Other menus can be delegated to by setting the delegating value to
 * a string id for another menu.  That menu's content will replace the
 * current menu item (only if the item would be included).
 *
 * This allows single id menus to be chosen by id, but have varying contents
 * based on the delegated menus.
 *
 * Finally, for each item, the adaptItem call is made.  This allows
 * items to modify themselves before being displayed, such as
 * incorporating additional information from translation sources.
 * See the `test-mode` examples for details.
 *
 * @param selectorProps
 * @param {*} event event that originates the context menu
 * @param {*} menus List of menus
 * @param {*} menuIdFilter
 * @returns
 */
function getMenuItems(selectorProps, event, menus, menuIdFilter) {
  // Include both the check props and the ...check props as one is used
  // by the child menu and the other used by the selector function
  const subProps = {
    selectorProps,
    event
  };
  const menu = findMenu(menus, subProps, menuIdFilter);
  if (!menu) {
    return undefined;
  }
  if (!menu.items) {
    console.warn('Must define items in menu', menu);
    return [];
  }
  let menuItems = [];
  menu.items.forEach(item => {
    const {
      delegating,
      selector,
      subMenu
    } = item;
    if (!selector || selector(selectorProps)) {
      if (delegating) {
        menuItems = [...menuItems, ...getMenuItems(selectorProps, event, menus, subMenu)];
      } else {
        const toAdd = adaptItem(item, subProps);
        menuItems.push(toAdd);
      }
    }
  });
  return menuItems;
}

/**
 * Returns item adapted to be consumed by ContextMenu component
 * and then goes through the item to add action behaviour for clicking the item,
 * making it compatible with the default ContextMenu display.
 *
 * @param {Object} item
 * @param {Object} subProps
 * @returns a MenuItem that is compatible with the base ContextMenu
 *    This requires having a label and set of actions to be called.
 */
function adaptItem(item, subProps) {
  const newItem = {
    ...item,
    value: subProps.selectorProps?.value
  };
  if (item.actionType === 'ShowSubMenu' && !newItem.iconRight) {
    newItem.iconRight = 'chevron-menu';
  }
  if (!item.action) {
    newItem.action = (itemRef, componentProps) => {
      const {
        event = {}
      } = componentProps;
      const {
        detail = {}
      } = event;
      newItem.element = detail.element;
      componentProps.onClose();
      const action = componentProps[`on${itemRef.actionType || 'Default'}`];
      if (action) {
        action.call(componentProps, newItem, itemRef, subProps);
      } else {
        console.warn('No action defined for', itemRef);
      }
    };
  }
  return newItem;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(findMenuById, "findMenuById", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
  reactHotLoader.register(findMenuDefault, "findMenuDefault", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
  reactHotLoader.register(findMenu, "findMenu", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
  reactHotLoader.register(getMenuItems, "getMenuItems", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
  reactHotLoader.register(adaptItem, "adaptItem", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts ***!
  \*************************************************************************************/
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
const defaultContextMenu = {
  id: 'measurementsContextMenu',
  customizationType: 'ohif.contextMenu',
  menus: [
  // Get the items from the UI Customization for the menu name (and have a custom name)
  {
    id: 'forExistingMeasurement',
    selector: _ref => {
      let {
        nearbyToolData
      } = _ref;
      return !!nearbyToolData;
    },
    items: [{
      label: 'Delete measurement',
      commands: [{
        commandName: 'deleteMeasurement'
      }]
    }, {
      label: 'Add Label',
      commands: [{
        commandName: 'setMeasurementLabel'
      }]
    }]
  }]
};
const _default = defaultContextMenu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(defaultContextMenu, "defaultContextMenu", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/CustomizableContextMenu/index.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/index.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuController: () => (/* reexport safe */ _ContextMenuController__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ContextMenuItemsBuilder: () => (/* reexport module object */ _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   CustomizableContextMenuTypes: () => (/* reexport module object */ _types__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   defaultContextMenu: () => (/* reexport safe */ _defaultContextMenu__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _ContextMenuController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuController */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx");
/* harmony import */ var _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextMenuItemsBuilder */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
/* harmony import */ var _defaultContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "../../../extensions/default/src/CustomizableContextMenu/types.ts");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






/***/ }),

/***/ "../../../extensions/default/src/CustomizableContextMenu/types.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/types.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
/**
 * SelectorProps are properties used to decide whether to select a menu or
 * menu item for display.
 * An instance of SelectorProps is provided to the selector functions, which
 * return true to include the item or false to exclude it.
 * The point of this is to allow more specific conext menus which hide
 * non-relevant menu options, optimizing the speed of selection of menus
 */
/**
 * The type of item actually required for the ContextMenu UI display
 */
/**
 * A MenuItem is a single line item within a menu, and specifies a selectable
 * value for the menu.
 */
/**
 * A menu is a list of menu items, plus a selector.
 * The selector is used to determine whether the menu should be displayed
 * in a given context.  The parameters passed to the selector come from
 * the 'selectorProps' value in the options, and are intended to be context
 * specific values containing things like the selected object, the currently
 * displayed study etc so that the context menu can dynamically choose which
 * view to show.
 */
/**
 * ContextMenuProps is the top level argument used to invoke the context menu
 * itself.  It contains the menus available for display, as well as the event
 * and selector props used to decide the menu.
 */



/***/ }),

/***/ "../../../extensions/default/src/DicomJSONDataSource/index.js":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/DicomJSONDataSource/index.js ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomJSONApi: () => (/* binding */ createDicomJSONApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DicomWebDataSource/utils/getImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js");
/* harmony import */ var _utils_getDirectURL__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getDirectURL */ "../../../extensions/default/src/utils/getDirectURL.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
const mappings = {
  studyInstanceUid: 'StudyInstanceUID',
  patientId: 'PatientID'
};
let _store = {
  urls: []
  // {
  //   url: url1
  //   studies: [Study1, Study2], // if multiple studies
  // }
  // {
  //   url: url2
  //   studies: [Study1],
  // }
  // }
};

const getMetaDataByURL = url => {
  return _store.urls.find(metaData => metaData.url === url);
};
const findStudies = (key, value) => {
  let studies = [];
  _store.urls.map(metaData => {
    metaData.studies.map(aStudy => {
      if (aStudy[key] === value) {
        studies.push(aStudy);
      }
    });
  });
  return studies;
};
function createDicomJSONApi(dicomJsonConfig) {
  const {
    name,
    wadoRoot
  } = dicomJsonConfig;
  const implementation = {
    initialize: async _ref => {
      let {
        params,
        query,
        url
      } = _ref;
      if (!url) url = query.get('url');
      let metaData = getMetaDataByURL(url);

      // if we have already cached the data from this specific url
      // We are only handling one StudyInstanceUID to run; however,
      // all studies for patientID will be put in the correct tab
      if (metaData) {
        return metaData.studies.map(aStudy => {
          return aStudy.StudyInstanceUID;
        });
      }
      const response = await fetch(url);
      let data = await response.json();
      const studyInstanceUIDs = data.studies.map(study => study.StudyInstanceUID);
      let StudyInstanceUID;
      let SeriesInstanceUID;
      data.studies.forEach(study => {
        StudyInstanceUID = study.StudyInstanceUID;
        study.series.forEach(series => {
          SeriesInstanceUID = series.SeriesInstanceUID;
          series.instances.forEach(instance => {
            const {
              url: imageId,
              metadata: naturalizedDicom
            } = instance;

            // Add imageId specific mapping to this data as the URL isn't necessarliy WADO-URI.
            metadataProvider.addImageIdToUIDs(imageId, {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID: naturalizedDicom.SOPInstanceUID
            });
          });
        });
      });
      _store.urls.push({
        url,
        studies: [...data.studies]
      });
      return studyInstanceUIDs;
    },
    query: {
      studies: {
        mapParams: () => {},
        search: async param => {
          const [key, value] = Object.entries(param)[0];
          const mappedParam = mappings[key];

          // todo: should fetch from dicomMetadataStore
          const studies = findStudies(mappedParam, value);
          return studies.map(aStudy => {
            return {
              accession: aStudy.AccessionNumber,
              date: aStudy.StudyDate,
              description: aStudy.StudyDescription,
              instances: aStudy.NumInstances,
              modalities: aStudy.Modalities,
              mrn: aStudy.PatientID,
              patientName: aStudy.PatientName,
              studyInstanceUid: aStudy.StudyInstanceUID,
              NumInstances: aStudy.NumInstances,
              time: aStudy.StudyTime
            };
          });
        },
        processResults: () => {
          console.debug(' DICOMJson QUERY processResults');
        }
      },
      series: {
        // mapParams: mapParams.bind(),
        search: () => {
          console.debug(' DICOMJson QUERY SERIES SEARCH');
        }
      },
      instances: {
        search: () => {
          console.debug(' DICOMJson QUERY instances SEARCH');
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {string} params.defaultPath path for the pixel data url
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @param {string} params.fetchPart unknown?
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return (0,_utils_getDirectURL__WEBPACK_IMPORTED_MODULE_2__["default"])(wadoRoot, params);
      },
      series: {
        metadata: function () {
          let {
            StudyInstanceUID,
            madeInClient = false,
            customSort
          } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
          let series;
          if (customSort) {
            series = customSort(study.series);
          } else {
            series = study.series;
          }
          const seriesSummaryMetadata = series.map(series => {
            const seriesSummary = {
              StudyInstanceUID: study.StudyInstanceUID,
              ...series
            };
            delete seriesSummary.instances;
            return seriesSummary;
          });

          // Async load series, store as retrieved
          function storeInstances(naturalizedInstances) {
            _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
          }
          _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
          function setSuccessFlag() {
            const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);
            study.isLoaded = true;
          }
          const numberOfSeries = series.length;
          series.forEach((series, index) => {
            const instances = series.instances.map(instance => {
              const obj = {
                ...instance.metadata,
                url: instance.url,
                imageId: instance.url,
                ...series,
                ...study
              };
              delete obj.instances;
              delete obj.series;
              return obj;
            });
            storeInstances(instances);
            if (index === numberOfSeries - 1) setSuccessFlag();
          });
        }
      }
    },
    store: {
      dicom: () => {
        console.debug(' DICOMJson store dicom');
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          for (let i = 0; i < NumberOfFrames; i++) {
            const imageId = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_1__["default"])({
              instance,
              frame: i,
              config: dicomJsonConfig
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_1__["default"])({
            instance,
            config: dicomJsonConfig
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance(_ref2) {
      let {
        instance,
        frame
      } = _ref2;
      const imageIds = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_1__["default"])({
        instance,
        frame
      });
      return imageIds;
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(metadataProvider, "metadataProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomJSONDataSource/index.js");
  reactHotLoader.register(mappings, "mappings", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomJSONDataSource/index.js");
  reactHotLoader.register(_store, "_store", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomJSONDataSource/index.js");
  reactHotLoader.register(getMetaDataByURL, "getMetaDataByURL", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomJSONDataSource/index.js");
  reactHotLoader.register(findStudies, "findStudies", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomJSONDataSource/index.js");
  reactHotLoader.register(createDicomJSONApi, "createDicomJSONApi", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomJSONDataSource/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomLocalDataSource/index.js":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/DicomLocalDataSource/index.js ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomLocalApi: () => (/* binding */ createDicomLocalApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
const {
  EVENTS
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore;
const END_MODALITIES = {
  SR: true,
  SEG: true,
  DOC: true
};
const compareValue = function (v1, v2) {
  let def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (v1 === v2) return def;
  if (v1 < v2) return -1;
  return 1;
};

// Sorting SR modalities to be at the end of series list
const customSort = (seriesA, seriesB) => {
  const instanceA = seriesA.instances[0];
  const instanceB = seriesB.instances[0];
  const modalityA = instanceA.Modality;
  const modalityB = instanceB.Modality;
  const isEndA = END_MODALITIES[modalityA];
  const isEndB = END_MODALITIES[modalityB];
  if (isEndA && isEndB) {
    // Compare by series date
    return compareValue(instanceA.SeriesNumber, instanceB.SeriesNumber);
  }
  if (!isEndA && !isEndB) {
    return compareValue(instanceB.SeriesNumber, instanceA.SeriesNumber);
  }
  return isEndA ? -1 : 1;
};
function createDicomLocalApi(dicomLocalConfig) {
  const {
    name
  } = dicomLocalConfig;
  const implementation = {
    initialize: _ref => {
      let {
        params,
        query
      } = _ref;
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = query.getAll('StudyInstanceUIDs');
      const StudyInstanceUIDs = queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];

      // Put SRs at the end of series list to make sure images are loaded first
      StudyInstanceUIDsAsArray.forEach(StudyInstanceUID => {
        const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
        study.series = study.series.sort(customSort);
      });
      return StudyInstanceUIDsAsArray;
    },
    query: {
      studies: {
        mapParams: () => {},
        search: params => {
          const studyUIDs = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudyInstanceUIDs();
          return studyUIDs.map(StudyInstanceUID => {
            let numInstances = 0;
            const modalities = new Set();

            // Calculating the number of instances in the study and modalities
            // present in the study
            const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
            study.series.forEach(aSeries => {
              numInstances += aSeries.instances.length;
              modalities.add(aSeries.instances[0].Modality);
            });

            // first instance in the first series
            const firstInstance = study?.series[0]?.instances[0];
            if (firstInstance) {
              return {
                accession: firstInstance.AccessionNumber,
                date: firstInstance.StudyDate,
                description: firstInstance.StudyDescription,
                mrn: firstInstance.PatientID,
                patientName: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(firstInstance.PatientName),
                studyInstanceUid: firstInstance.StudyInstanceUID,
                time: firstInstance.StudyTime,
                //
                instances: numInstances,
                modalities: Array.from(modalities).join('/'),
                NumInstances: numInstances
              };
            }
          });
        },
        processResults: () => {
          console.debug(' DICOMLocal QUERY processResults');
        }
      },
      series: {
        search: studyInstanceUID => {
          const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(studyInstanceUID);
          return study.series.map(aSeries => {
            const firstInstance = aSeries?.instances[0];
            return {
              studyInstanceUid: studyInstanceUID,
              seriesInstanceUid: firstInstance.SeriesInstanceUID,
              modality: firstInstance.Modality,
              seriesNumber: firstInstance.SeriesNumber,
              seriesDate: firstInstance.SeriesDate,
              numSeriesInstances: aSeries.instances.length,
              description: firstInstance.SeriesDescription
            };
          });
        }
      },
      instances: {
        search: () => {
          console.debug(' DICOMLocal QUERY instances SEARCH');
        }
      }
    },
    retrieve: {
      directURL: params => {
        const {
          instance,
          tag,
          defaultType
        } = params;
        const value = instance[tag];
        if (value instanceof Array && value[0] instanceof ArrayBuffer) {
          return URL.createObjectURL(new Blob([value[0]], {
            type: defaultType
          }));
        }
      },
      series: {
        metadata: async function () {
          let {
            StudyInstanceUID,
            madeInClient = false
          } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }

          // Instances metadata already added via local upload
          const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);

          // Series metadata already added via local upload
          _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore._broadcastEvent(EVENTS.SERIES_ADDED, {
            StudyInstanceUID,
            madeInClient
          });
          study.series.forEach(aSeries => {
            const {
              SeriesInstanceUID
            } = aSeries;
            const isMultiframe = aSeries.instances[0].NumberOfFrames > 1;
            aSeries.instances.forEach((instance, index) => {
              const {
                url: imageId,
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID
              } = instance;
              instance.imageId = imageId;

              // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
              metadataProvider.addImageIdToUIDs(imageId, {
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID,
                frameIndex: isMultiframe ? index : 1
              });
            });
            _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore._broadcastEvent(EVENTS.INSTANCES_ADDED, {
              StudyInstanceUID,
              SeriesInstanceUID,
              madeInClient
            });
          });
        }
      }
    },
    store: {
      dicom: naturalizedReport => {
        const reportBlob = dcmjs__WEBPACK_IMPORTED_MODULE_1__["default"].data.datasetToBlob(naturalizedReport);

        //Create a URL for the binary.
        var objectUrl = URL.createObjectURL(reportBlob);
        window.location.assign(objectUrl);
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          // in multiframe we start at frame 1
          for (let i = 1; i <= NumberOfFrames; i++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame: i
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance(_ref2) {
      let {
        instance,
        frame
      } = _ref2;
      const {
        StudyInstanceUID,
        SeriesInstanceUID,
        SOPInstanceUID
      } = instance;
      const storedInstance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getInstance(StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID);
      let imageId = storedInstance.url;
      if (frame !== undefined) {
        imageId += `&frame=${frame}`;
      }
      return imageId;
    },
    deleteStudyMetadataPromise() {
      console.log('deleteStudyMetadataPromise not implemented');
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(metadataProvider, "metadataProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomLocalDataSource/index.js");
  reactHotLoader.register(EVENTS, "EVENTS", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomLocalDataSource/index.js");
  reactHotLoader.register(END_MODALITIES, "END_MODALITIES", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomLocalDataSource/index.js");
  reactHotLoader.register(compareValue, "compareValue", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomLocalDataSource/index.js");
  reactHotLoader.register(customSort, "customSort", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomLocalDataSource/index.js");
  reactHotLoader.register(createDicomLocalApi, "createDicomLocalApi", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomLocalDataSource/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "../../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _DicomTagTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DicomTagTable */ "../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
/* harmony import */ var _DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DicomTagBrowser.css */ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");
/* harmony import */ var _DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_8__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};









const {
  ImageSet
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.classes;
const {
  DicomMetaDictionary
} = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data;
const {
  nameMap
} = DicomMetaDictionary;
const DicomTagBrowser = _ref => {
  let {
    displaySets,
    displaySetInstanceUID
  } = _ref;
  // The column indices that are to be excluded during a filter of the table.
  // At present the column indices are:
  // 0: DICOM tag
  // 1: VR
  // 2: Keyword
  // 3: Value
  const excludedColumnIndicesForFilter = new Set([1]);
  const [selectedDisplaySetInstanceUID, setSelectedDisplaySetInstanceUID] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(displaySetInstanceUID);
  const [instanceNumber, setInstanceNumber] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
  const [filterValue, setFilterValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const onSelectChange = value => {
    setSelectedDisplaySetInstanceUID(value.value);
    setInstanceNumber(1);
  };
  const searchInputRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const activeDisplaySet = displaySets.find(ds => ds.displaySetInstanceUID === selectedDisplaySetInstanceUID);
  const isImageStack = _isImageStack(activeDisplaySet);
  const showInstanceList = isImageStack && activeDisplaySet.images.length > 1;
  const displaySetList = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    displaySets.sort((a, b) => a.SeriesNumber - b.SeriesNumber);
    return displaySets.map(displaySet => {
      const {
        displaySetInstanceUID,
        SeriesDate,
        SeriesTime,
        SeriesNumber,
        SeriesDescription,
        Modality
      } = displaySet;

      /* Map to display representation */
      const dateStr = `${SeriesDate}:${SeriesTime}`.split('.')[0];
      const date = moment__WEBPACK_IMPORTED_MODULE_1___default()(dateStr, 'YYYYMMDD:HHmmss');
      const displayDate = date.format('ddd, MMM Do YYYY');
      return {
        value: displaySetInstanceUID,
        label: `${SeriesNumber} (${Modality}): ${SeriesDescription}`,
        description: displayDate
      };
    });
  }, [displaySets]);
  const rows = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    let metadata;
    if (isImageStack) {
      metadata = activeDisplaySet.images[instanceNumber - 1];
    } else {
      metadata = activeDisplaySet.instance || activeDisplaySet;
    }
    const tags = getSortedTags(metadata);
    return getFormattedRowsFromTags(tags, metadata);
  }, [instanceNumber, selectedDisplaySetInstanceUID]);
  const filteredRows = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    if (!filterValue) {
      return rows;
    }
    const filterValueLowerCase = filterValue.toLowerCase();
    return rows.filter(row => {
      return row.reduce((keepRow, col, colIndex) => {
        if (keepRow) {
          // We are already keeping the row, why do more work so return now.
          return keepRow;
        }
        if (excludedColumnIndicesForFilter.has(colIndex)) {
          return keepRow;
        }
        return keepRow || col.toLowerCase().includes(filterValueLowerCase);
      }, false);
    });
  }, [rows, filterValue]);
  const debouncedSetFilterValue = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()(setFilterValue, 200);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    return () => {
      debouncedSetFilterValue?.cancel();
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "dicom-tag-browser-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "flex flex-row mb-6 items-center pl-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "flex flex-row items-center w-1/2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Typography, {
    variant: "subtitle",
    className: "mr-4"
  }, "Series"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "grow mr-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Select, {
    id: "display-set-selector",
    isClearable: false,
    onChange: onSelectChange,
    options: displaySetList,
    value: displaySetList.find(ds => ds.value === selectedDisplaySetInstanceUID),
    className: "text-white"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "flex flex-row items-center w-1/2"
  }, showInstanceList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Typography, {
    variant: "subtitle",
    className: "mr-4"
  }, "Instance Number"), showInstanceList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "grow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.InputRange, {
    value: instanceNumber,
    key: selectedDisplaySetInstanceUID,
    onChange: value => {
      setInstanceNumber(parseInt(value));
    },
    minValue: 1,
    maxValue: activeDisplaySet.images.length,
    step: 1,
    inputClassName: "w-full",
    labelPosition: "left",
    trackColor: '#3a3f99'
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "w-full h-1 bg-black"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "flex flex-row my-3 w-1/2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("label", {
    className: "relative block w-full mr-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
    className: "absolute inset-y-0 left-0 flex items-center pl-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    name: "icon-search"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("input", {
    ref: searchInputRef,
    type: "text",
    className: "block bg-black w-full shadow transition duration-300 appearance-none border border-inputfield-main focus:border-inputfield-focus focus:outline-none disabled:border-inputfield-disabled rounded w-full py-2 px-9 text-base leading-tight placeholder:text-inputfield-placeholder",
    placeholder: "Search metadata...",
    onChange: event => debouncedSetFilterValue(event.target.value),
    autoComplete: "off"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
    className: "absolute inset-y-0 right-0 flex items-center pr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    name: "icon-clear-field",
    className: classnames__WEBPACK_IMPORTED_MODULE_6___default()('cursor-pointer', filterValue ? '' : 'hidden'),
    onClick: () => {
      searchInputRef.current.value = '';
      debouncedSetFilterValue('');
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_DicomTagTable__WEBPACK_IMPORTED_MODULE_7__["default"], {
    rows: filteredRows
  }));
};
__signature__(DicomTagBrowser, "useState{[\n    selectedDisplaySetInstanceUID,\n    setSelectedDisplaySetInstanceUID,\n  ](displaySetInstanceUID)}\nuseState{[instanceNumber, setInstanceNumber](1)}\nuseState{[filterValue, setFilterValue]('')}\nuseRef{searchInputRef}\nuseMemo{displaySetList}\nuseMemo{rows}\nuseMemo{filteredRows}\nuseMemo{debouncedSetFilterValue}\nuseEffect{}");
function getFormattedRowsFromTags(tags, metadata) {
  const rows = [];
  tags.forEach(tagInfo => {
    if (tagInfo.vr === 'SQ') {
      rows.push([`${tagInfo.tagIndent}${tagInfo.tag}`, tagInfo.vr, tagInfo.keyword, '']);
      const {
        values
      } = tagInfo;
      values.forEach((item, index) => {
        const formatedRowsFromTags = getFormattedRowsFromTags(item, metadata);
        rows.push([`${item[0].tagIndent}(FFFE,E000)`, '', `Item #${index}`, '']);
        rows.push(...formatedRowsFromTags);
      });
    } else {
      if (tagInfo.vr === 'xs') {
        try {
          const tag = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.Tag.fromPString(tagInfo.tag).toCleanString();
          const originalTagInfo = metadata[tag];
          tagInfo.vr = originalTagInfo.vr;
        } catch (error) {
          console.error(`Failed to parse value representation for tag '${tagInfo.keyword}'`);
        }
      }
      rows.push([`${tagInfo.tagIndent}${tagInfo.tag}`, tagInfo.vr, tagInfo.keyword, tagInfo.value]);
    }
  });
  return rows;
}
function getSortedTags(metadata) {
  const tagList = getRows(metadata);

  // Sort top level tags, sequence groups are sorted when created.
  _sortTagList(tagList);
  return tagList;
}
function getRows(metadata) {
  let depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Tag, Type, Value, Keyword

  const keywords = Object.keys(metadata);
  let tagIndent = '';
  for (let i = 0; i < depth; i++) {
    tagIndent += '>';
  }
  if (depth > 0) {
    tagIndent += ' '; // If indented, add a space after the indents.
  }

  const rows = [];
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    if (keyword === '_vrMap') {
      continue;
    }
    const tagInfo = nameMap[keyword];
    let value = metadata[keyword];
    if (tagInfo && tagInfo.vr === 'SQ') {
      const sequenceAsArray = toArray(value);

      // Push line defining the sequence

      const sequence = {
        tag: tagInfo.tag,
        tagIndent,
        vr: tagInfo.vr,
        keyword,
        values: []
      };
      rows.push(sequence);
      if (value === null) {
        // Type 2 Sequence
        continue;
      }
      sequenceAsArray.forEach(item => {
        const sequenceRows = getRows(item, depth + 1);
        if (sequenceRows.length) {
          // Sort the sequence group.
          _sortTagList(sequenceRows);
          sequence.values.push(sequenceRows);
        }
      });
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] != 'object') {
        value = value.join('\\');
      }
    }
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof value !== 'string') {
      if (value === null) {
        value = ' ';
      } else {
        if (typeof value === 'object') {
          if (value.InlineBinary) {
            value = 'Inline Binary';
          } else if (value.BulkDataURI) {
            value = `Bulk Data URI`; //: ${value.BulkDataURI}`;
          } else if (value.Alphabetic) {
            value = value.Alphabetic;
          } else {
            console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
            console.warn(value);
            value = ' ';
          }
        } else {
          console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
          value = ' ';
        }
      }
    }

    // tag / vr/ keyword/ value

    // Remove retired tags
    keyword = keyword.replace('RETIRED_', '');
    if (tagInfo) {
      rows.push({
        tag: tagInfo.tag,
        tagIndent,
        vr: tagInfo.vr,
        keyword,
        value
      });
    } else {
      // skip properties without hex tag numbers
      const regex = /[0-9A-Fa-f]{6}/g;
      if (keyword.match(regex)) {
        const tag = `(${keyword.substring(0, 4)},${keyword.substring(4, 8)})`;
        rows.push({
          tag,
          tagIndent,
          vr: '',
          keyword: 'Private Tag',
          value
        });
      }
    }
  }
  return rows;
}
function _isImageStack(displaySet) {
  return displaySet instanceof ImageSet;
}
function toArray(objectOrArray) {
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}
function _sortTagList(tagList) {
  tagList.sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    }
    return 1;
  });
}
const _default = DicomTagBrowser;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ImageSet, "ImageSet", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(DicomMetaDictionary, "DicomMetaDictionary", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(nameMap, "nameMap", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(DicomTagBrowser, "DicomTagBrowser", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(getFormattedRowsFromTags, "getFormattedRowsFromTags", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(getSortedTags, "getSortedTags", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(getRows, "getRows", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(_isImageStack, "_isImageStack", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(toArray, "toArray", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(_sortTagList, "_sortTagList", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-window */ "../../../node_modules/react-window/dist/index.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const lineHeightPx = 20;
const lineHeightClassName = `leading-[${lineHeightPx}px]`;
const rowVerticalPaddingPx = 10;
const rowBottomBorderPx = 1;
const rowVerticalPaddingStyle = {
  padding: `${rowVerticalPaddingPx}px 0`
};
const rowStyle = {
  borderBottomWidth: `${rowBottomBorderPx}px`,
  ...rowVerticalPaddingStyle
};
function ColumnHeaders(_ref) {
  let {
    tagRef,
    vrRef,
    keywordRef,
    valueRef
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('flex flex-row w-full bg-secondary-dark ohif-scrollbar overflow-y-scroll'),
    style: rowVerticalPaddingStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "px-3 w-4/24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    ref: tagRef,
    className: "flex flex-col flex-1 text-white text-lg pl-1 select-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Tag"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "px-3 w-2/24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    ref: vrRef,
    className: "flex flex-col flex-1 text-white text-lg pl-1 select-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "VR"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "px-3 w-6/24"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    ref: keywordRef,
    className: "flex flex-col flex-1 text-white text-lg pl-1 select-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Keyword"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "px-3 w-5/24 grow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    ref: valueRef,
    className: "flex flex-col flex-1 text-white text-lg pl-1 select-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Value"))));
}
function DicomTagTable(_ref2) {
  let {
    rows
  } = _ref2;
  const listRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [tagHeaderElem, setTagHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [vrHeaderElem, setVrHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [keywordHeaderElem, setKeywordHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [valueHeaderElem, setValueHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Here the refs are inturn stored in state to trigger a render of the table.
  // This virtualized table does NOT render until the header is rendered because the header column widths are used to determine the row heights in the table.
  // Therefore whenever the refs change (in particular the first time the refs are set), we want to trigger a render of the table.
  const tagRef = elem => {
    if (elem) {
      setTagHeaderElem(elem);
    }
  };
  const vrRef = elem => {
    if (elem) {
      setVrHeaderElem(elem);
    }
  };
  const keywordRef = elem => {
    if (elem) {
      setKeywordHeaderElem(elem);
    }
  };
  const valueRef = elem => {
    if (elem) {
      setValueHeaderElem(elem);
    }
  };

  /**
   * When new rows are set, scroll to the top and reset the virtualization.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!listRef?.current) {
      return;
    }
    listRef.current.scrollTo(0);
    listRef.current.resetAfterIndex(0);
  }, [rows]);

  /**
   * When the browser window resizes, update the row virtualization (i.e. row heights)
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const debouncedResize = lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(() => listRef.current.resetAfterIndex(0), 100);
    window.addEventListener('resize', debouncedResize);
    return () => {
      debouncedResize.cancel();
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);
  const Row = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_ref3 => {
    let {
      index,
      style
    } = _ref3;
    const row = rows[index];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        ...style,
        ...rowStyle
      },
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('hover:bg-secondary-main transition duration-300 bg-black flex flex-row w-full border-secondary-light items-center text-base break-all', lineHeightClassName),
      key: `DICOMTagRow-${index}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "px-3 w-4/24"
    }, row[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "px-3 w-2/24"
    }, row[1]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "px-3 w-6/24"
    }, row[2]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "px-3 w-5/24 grow"
    }, row[3]));
  }, [rows]);

  /**
   * Whenever any one of the column headers is set, then the header is rendered.
   * Here we chose the tag header.
   */
  const isHeaderRendered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => tagHeaderElem !== null, [tagHeaderElem]);

  /**
   * Get the item/row size. We use the header column widths to calculate the various row heights.
   * @param index the row index
   * @returns the row height
   */
  const getItemSize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(index => {
    const headerWidths = [tagHeaderElem.offsetWidth, vrHeaderElem.offsetWidth, keywordHeaderElem.offsetWidth, valueHeaderElem.offsetWidth];
    const context = canvasRef.current.getContext('2d');
    context.font = getComputedStyle(canvasRef.current).font;
    return rows[index].map((colText, index) => {
      const colOneLineWidth = context.measureText(colText).width;
      const numLines = Math.ceil(colOneLineWidth / headerWidths[index]);
      return numLines * lineHeightPx + 2 * rowVerticalPaddingPx + rowBottomBorderPx;
    }).reduce((maxHeight, colHeight) => Math.max(maxHeight, colHeight));
  }, [rows, keywordHeaderElem, tagHeaderElem, valueHeaderElem, vrHeaderElem]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("canvas", {
    style: {
      visibility: 'hidden',
      position: 'absolute'
    },
    className: "text-base",
    ref: canvasRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ColumnHeaders, {
    tagRef: tagRef,
    vrRef: vrRef,
    keywordRef: keywordRef,
    valueRef: valueRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "m-auto relative border-2 border-black bg-black",
    style: {
      height: '32rem'
    }
  }, isHeaderRendered() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_window__WEBPACK_IMPORTED_MODULE_1__.VariableSizeList, {
    ref: listRef,
    height: 500,
    itemCount: rows.length,
    itemSize: getItemSize,
    width: '100%',
    className: "ohif-scrollbar"
  }, Row)));
}
__signature__(DicomTagTable, "useRef{listRef}\nuseRef{canvasRef}\nuseState{[tagHeaderElem, setTagHeaderElem](null)}\nuseState{[vrHeaderElem, setVrHeaderElem](null)}\nuseState{[keywordHeaderElem, setKeywordHeaderElem](null)}\nuseState{[valueHeaderElem, setValueHeaderElem](null)}\nuseEffect{}\nuseEffect{}\nuseCallback{Row}\nuseCallback{isHeaderRendered}\nuseCallback{getItemSize}");
const _default = DicomTagTable;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(lineHeightPx, "lineHeightPx", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(lineHeightClassName, "lineHeightClassName", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(rowVerticalPaddingPx, "rowVerticalPaddingPx", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(rowBottomBorderPx, "rowBottomBorderPx", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(rowVerticalPaddingStyle, "rowVerticalPaddingStyle", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(rowStyle, "rowStyle", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(ColumnHeaders, "ColumnHeaders", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(DicomTagTable, "DicomTagTable", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js ***!
  \****************************************************************************/
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
const _default = function (wadoRoot) {
  return {
    series: (StudyInstanceUID, SeriesInstanceUID) => {
      return new Promise((resolve, reject) => {
        // Reject because of Quality. (Seems the most sensible out of the options)
        const CodeValueAndCodeSchemeDesignator = `113001%5EDCM`;
        const url = `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/reject/${CodeValueAndCodeSchemeDesignator}`;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        //Send the proper header information along with the request
        // TODO -> Auth when we re-add authorization.

        console.log(xhr);
        xhr.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr.readyState == 4) {
            switch (xhr.status) {
              case 204:
                resolve(xhr.responseText);
                break;
              case 404:
                reject('Your dataSource does not support reject functionality');
            }
          }
        };
        xhr.send();
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/dcm4cheeReject.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/index.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/index.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomWebApi: () => (/* binding */ createDicomWebApi)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _qido_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qido.js */ "../../../extensions/default/src/DicomWebDataSource/qido.js");
/* harmony import */ var _dcm4cheeReject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dcm4cheeReject */ "../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js");
/* harmony import */ var _utils_getImageId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./retrieveStudyMetadata.js */ "../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
/* harmony import */ var _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/StaticWadoClient */ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts");
/* harmony import */ var _utils_getDirectURL__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/getDirectURL */ "../../../extensions/default/src/utils/getDirectURL.js");
/* harmony import */ var _utils_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










const {
  DicomMetaDictionary,
  DicomDict
} = dcmjs__WEBPACK_IMPORTED_MODULE_5__["default"].data;
const {
  naturalizeDataset,
  denaturalizeDataset
} = DicomMetaDictionary;
const ImplementationClassUID = '2.25.270695996825855179949881587723571202391.2.0.0';
const ImplementationVersionName = 'OHIF-VIEWER-2.0.0';
const EXPLICIT_VR_LITTLE_ENDIAN = '1.2.840.10008.1.2.1';
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes.MetadataProvider;

/**
 *
 * @param {string} name - Data source name
 * @param {string} wadoUriRoot - Legacy? (potentially unused/replaced)
 * @param {string} qidoRoot - Base URL to use for QIDO requests
 * @param {string} wadoRoot - Base URL to use for WADO requests
 * @param {boolean} qidoSupportsIncludeField - Whether QIDO supports the "Include" option to request additional fields in response
 * @param {string} imageRengering - wadors | ? (unsure of where/how this is used)
 * @param {string} thumbnailRendering - wadors | ? (unsure of where/how this is used)
 * @param {bool} supportsReject - Whether the server supports reject calls (i.e. DCM4CHEE)
 * @param {bool} lazyLoadStudy - "enableStudyLazyLoad"; Request series meta async instead of blocking
 * @param {string|bool} singlepart - indicates of the retrieves can fetch singlepart.  Options are bulkdata, video, image or boolean true
 */
function createDicomWebApi(dicomWebConfig, userAuthenticationService) {
  const {
    qidoRoot,
    wadoRoot,
    enableStudyLazyLoad,
    supportsFuzzyMatching,
    supportsWildcard,
    supportsReject,
    staticWado,
    singlepart
  } = dicomWebConfig;
  const dicomWebConfigCopy = JSON.parse(JSON.stringify(dicomWebConfig));
  const qidoConfig = {
    url: qidoRoot,
    staticWado,
    singlepart,
    headers: userAuthenticationService.getAuthorizationHeader(),
    errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler()
  };
  const wadoConfig = {
    url: wadoRoot,
    staticWado,
    singlepart,
    headers: userAuthenticationService.getAuthorizationHeader(),
    errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler()
  };

  // TODO -> Two clients sucks, but its better than 1000.
  // TODO -> We'll need to merge auth later.
  const qidoDicomWebClient = staticWado ? new _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__["default"](qidoConfig) : new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(qidoConfig);
  const wadoDicomWebClient = staticWado ? new _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__["default"](wadoConfig) : new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(wadoConfig);
  const implementation = {
    initialize: _ref => {
      let {
        params,
        query
      } = _ref;
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.splitComma(query.getAll('StudyInstanceUIDs'));
      const StudyInstanceUIDs = queryStudyInstanceUIDs.length && queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];
      return StudyInstanceUIDsAsArray;
    },
    query: {
      studies: {
        mapParams: _qido_js__WEBPACK_IMPORTED_MODULE_2__.mapParams.bind(),
        search: async function (origParams) {
          const headers = userAuthenticationService.getAuthorizationHeader();
          if (headers) {
            qidoDicomWebClient.headers = headers;
          }
          const {
            studyInstanceUid,
            seriesInstanceUid,
            ...mappedParams
          } = (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.mapParams)(origParams, {
            supportsFuzzyMatching,
            supportsWildcard
          }) || {};
          const results = await (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.search)(qidoDicomWebClient, undefined, undefined, mappedParams);
          return (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.processResults)(results);
        },
        processResults: _qido_js__WEBPACK_IMPORTED_MODULE_2__.processResults.bind()
      },
      series: {
        // mapParams: mapParams.bind(),
        search: async function (studyInstanceUid) {
          const headers = userAuthenticationService.getAuthorizationHeader();
          if (headers) {
            qidoDicomWebClient.headers = headers;
          }
          const results = await (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.seriesInStudy)(qidoDicomWebClient, studyInstanceUid);
          return (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.processSeriesResults)(results);
        }
        // processResults: processResults.bind(),
      },

      instances: {
        search: (studyInstanceUid, queryParameters) => {
          const headers = userAuthenticationService.getAuthorizationHeader();
          if (headers) {
            qidoDicomWebClient.headers = headers;
          }
          _qido_js__WEBPACK_IMPORTED_MODULE_2__.search.call(undefined, qidoDicomWebClient, studyInstanceUid, null, queryParameters);
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return (0,_utils_getDirectURL__WEBPACK_IMPORTED_MODULE_8__["default"])({
          wadoRoot,
          singlepart
        }, params);
      },
      bulkDataURI: async _ref2 => {
        let {
          StudyInstanceUID,
          BulkDataURI
        } = _ref2;
        const options = {
          multipart: false,
          BulkDataURI,
          StudyInstanceUID
        };
        return qidoDicomWebClient.retrieveBulkData(options).then(val => {
          const ret = val && val[0] || undefined;
          return ret;
        });
      },
      series: {
        metadata: async function () {
          let {
            StudyInstanceUID,
            filters,
            sortCriteria,
            sortFunction,
            madeInClient = false
          } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          const headers = userAuthenticationService.getAuthorizationHeader();
          if (headers) {
            wadoDicomWebClient.headers = headers;
          }
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          if (enableStudyLazyLoad) {
            return implementation._retrieveSeriesMetadataAsync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient);
          }
          return implementation._retrieveSeriesMetadataSync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient);
        }
      }
    },
    store: {
      dicom: async (dataset, request) => {
        const headers = userAuthenticationService.getAuthorizationHeader();
        if (headers) {
          wadoDicomWebClient.headers = headers;
        }
        if (dataset instanceof ArrayBuffer) {
          const options = {
            datasets: [dataset],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        } else {
          const meta = {
            FileMetaInformationVersion: dataset._meta.FileMetaInformationVersion.Value,
            MediaStorageSOPClassUID: dataset.SOPClassUID,
            MediaStorageSOPInstanceUID: dataset.SOPInstanceUID,
            TransferSyntaxUID: EXPLICIT_VR_LITTLE_ENDIAN,
            ImplementationClassUID,
            ImplementationVersionName
          };
          const denaturalized = denaturalizeDataset(meta);
          const dicomDict = new DicomDict(denaturalized);
          dicomDict.dict = denaturalizeDataset(dataset);
          const part10Buffer = dicomDict.write();
          const options = {
            datasets: [part10Buffer],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        }
      }
    },
    _retrieveSeriesMetadataSync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient) => {
      const enableStudyLazyLoad = false;

      // data is all SOPInstanceUIDs
      const data = await (0,_retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.retrieveStudyMetadata)(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction);

      // first naturalize the data
      const naturalizedInstancesMetadata = data.map(naturalizeDataset);
      const seriesSummaryMetadata = {};
      const instancesPerSeries = {};
      naturalizedInstancesMetadata.forEach(instance => {
        if (!seriesSummaryMetadata[instance.SeriesInstanceUID]) {
          seriesSummaryMetadata[instance.SeriesInstanceUID] = {
            StudyInstanceUID: instance.StudyInstanceUID,
            StudyDescription: instance.StudyDescription,
            SeriesInstanceUID: instance.SeriesInstanceUID,
            SeriesDescription: instance.SeriesDescription,
            SeriesNumber: instance.SeriesNumber,
            SeriesTime: instance.SeriesTime,
            SOPClassUID: instance.SOPClassUID,
            ProtocolName: instance.ProtocolName,
            Modality: instance.Modality
          };
        }
        if (!instancesPerSeries[instance.SeriesInstanceUID]) {
          instancesPerSeries[instance.SeriesInstanceUID] = [];
        }
        const imageId = implementation.getImageIdsForInstance({
          instance
        });
        instance.imageId = imageId;
        metadataProvider.addImageIdToUIDs(imageId, {
          StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          SOPInstanceUID: instance.SOPInstanceUID
        });
        instancesPerSeries[instance.SeriesInstanceUID].push(instance);
      });

      // grab all the series metadata
      const seriesMetadata = Object.values(seriesSummaryMetadata);
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addSeriesMetadata(seriesMetadata, madeInClient);
      Object.keys(instancesPerSeries).forEach(seriesInstanceUID => _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances(instancesPerSeries[seriesInstanceUID], madeInClient));
    },
    _retrieveSeriesMetadataAsync: async function (StudyInstanceUID, filters, sortCriteria, sortFunction) {
      let madeInClient = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      const enableStudyLazyLoad = true;
      // Get Series
      const {
        preLoadData: seriesSummaryMetadata,
        promises: seriesPromises
      } = await (0,_retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.retrieveStudyMetadata)(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction);

      /**
       * naturalizes the dataset, and adds a retrieve bulkdata method
       * to any values containing BulkDataURI.
       * @param {*} instance
       * @returns naturalized dataset, with retrieveBulkData methods
       */
      const addRetrieveBulkData = instance => {
        const naturalized = naturalizeDataset(instance);

        // if we konw the server doesn't use bulkDataURI, then don't
        if (!dicomWebConfig.bulkDataURI?.enabled) {
          return naturalized;
        }
        Object.keys(naturalized).forEach(key => {
          const value = naturalized[key];

          // The value.Value will be set with the bulkdata read value
          // in which case it isn't necessary to re-read this.
          if (value && value.BulkDataURI && !value.Value) {
            // Provide a method to fetch bulkdata
            value.retrieveBulkData = () => {
              // handle the scenarios where bulkDataURI is relative path
              (0,_utils_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_9__.fixBulkDataURI)(value, naturalized, dicomWebConfig);
              const options = {
                // The bulkdata fetches work with either multipart or
                // singlepart, so set multipart to false to let the server
                // decide which type to respond with.
                multipart: false,
                BulkDataURI: value.BulkDataURI,
                // The study instance UID is required if the bulkdata uri
                // is relative - that isn't disallowed by DICOMweb, but
                // isn't well specified in the standard, but is needed in
                // any implementation that stores static copies of the metadata
                StudyInstanceUID: naturalized.StudyInstanceUID
              };
              // Todo: this needs to be from wado dicom web client
              return qidoDicomWebClient.retrieveBulkData(options).then(val => {
                // There are DICOM PDF cases where the first ArrayBuffer in the array is
                // the bulk data and DICOM video cases where the second ArrayBuffer is
                // the bulk data. Here we play it safe and do a find.
                const ret = val instanceof Array && val.find(arrayBuffer => arrayBuffer?.byteLength) || undefined;
                value.Value = ret;
                return ret;
              });
            };
          }
        });
        return naturalized;
      };

      // Async load series, store as retrieved
      function storeInstances(instances) {
        const naturalizedInstances = instances.map(addRetrieveBulkData);

        // Adding instanceMetadata to OHIF MetadataProvider
        naturalizedInstances.forEach((instance, index) => {
          instance.wadoRoot = dicomWebConfig.wadoRoot;
          instance.wadoUri = dicomWebConfig.wadoUri;
          const imageId = implementation.getImageIdsForInstance({
            instance
          });

          // Adding imageId to each instance
          // Todo: This is not the best way I can think of to let external
          // metadata handlers know about the imageId that is stored in the store
          instance.imageId = imageId;

          // Adding UIDs to metadataProvider
          // Note: storing imageURI in metadataProvider since stack viewports
          // will use the same imageURI
          metadataProvider.addImageIdToUIDs(imageId, {
            StudyInstanceUID,
            SeriesInstanceUID: instance.SeriesInstanceUID,
            SOPInstanceUID: instance.SOPInstanceUID
          });
        });
        _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
      }
      function setSuccessFlag() {
        const study = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);
        study.isLoaded = true;
      }

      // Google Cloud Healthcare doesn't return StudyInstanceUID, so we need to add
      // it manually here
      seriesSummaryMetadata.forEach(aSeries => {
        aSeries.StudyInstanceUID = StudyInstanceUID;
      });
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
      const seriesDeliveredPromises = seriesPromises.map(promise => promise.then(instances => {
        storeInstances(instances);
      }));
      await Promise.all(seriesDeliveredPromises);
      setSuccessFlag();
    },
    deleteStudyMetadataPromise: _retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.deleteStudyMetadataPromise,
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          for (let frame = 1; frame <= NumberOfFrames; frame++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance(_ref3) {
      let {
        instance,
        frame
      } = _ref3;
      const imageIds = (0,_utils_getImageId__WEBPACK_IMPORTED_MODULE_4__["default"])({
        instance,
        frame,
        config: dicomWebConfig
      });
      return imageIds;
    },
    getConfig() {
      return dicomWebConfigCopy;
    }
  };
  if (supportsReject) {
    implementation.reject = (0,_dcm4cheeReject__WEBPACK_IMPORTED_MODULE_3__["default"])(wadoRoot);
  }
  return _ohif_core__WEBPACK_IMPORTED_MODULE_1__.IWebApiDataSource.create(implementation);
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DicomMetaDictionary, "DicomMetaDictionary", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(DicomDict, "DicomDict", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(naturalizeDataset, "naturalizeDataset", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(denaturalizeDataset, "denaturalizeDataset", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(ImplementationClassUID, "ImplementationClassUID", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(ImplementationVersionName, "ImplementationVersionName", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(EXPLICIT_VR_LITTLE_ENDIAN, "EXPLICIT_VR_LITTLE_ENDIAN", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(metadataProvider, "metadataProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
  reactHotLoader.register(createDicomWebApi, "createDicomWebApi", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/qido.js":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/qido.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ searchStudies),
/* harmony export */   mapParams: () => (/* binding */ mapParams),
/* harmony export */   processResults: () => (/* binding */ processResults),
/* harmony export */   processSeriesResults: () => (/* binding */ processSeriesResults),
/* harmony export */   search: () => (/* binding */ search),
/* harmony export */   seriesInStudy: () => (/* binding */ seriesInStudy)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sortStudy */ "../../core/src/utils/sortStudy.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
/**
 * QIDO - Query based on ID for DICOM Objects
 * search for studies, series and instances by patient ID, and receive their
 * unique identifiers for further usage.
 *
 * Quick: https://www.dicomstandard.org/dicomweb/query-qido-rs/
 * Standard: http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6
 *
 * Routes:
 * ==========
 * /studies?
 * /studies/{studyInstanceUid}/series?
 * /studies/{studyInstanceUid}/series/{seriesInstanceUid}/instances?
 *
 * Query Parameters:
 * ================
 * | KEY              | VALUE              |
 * |------------------|--------------------|
 * | {attributeId}    | {value}            |
 * | includeField     | {attribute} or all |
 * | fuzzymatching    | true OR false      |
 * | limit            | {number}           |
 * | offset           | {number}           |
 */


const {
  getString,
  getName,
  getModalities
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DICOMWeb;

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoStudies - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoStudies[0].qidoStudy - An object where each key is the DICOM Tag group+element
 * @param {object} qidoStudies[0].qidoStudy[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoStudies[0].qidoStudy[dicomTag].vr - Value Representation
 * @param {string[]} qidoStudies[0].qidoStudy[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processResults(qidoStudies) {
  if (!qidoStudies || !qidoStudies.length) {
    return [];
  }
  const studies = [];
  qidoStudies.forEach(qidoStudy => studies.push({
    studyInstanceUid: getString(qidoStudy['0020000D']),
    date: getString(qidoStudy['00080020']),
    // YYYYMMDD
    time: getString(qidoStudy['00080030']),
    // HHmmss.SSS (24-hour, minutes, seconds, fractional seconds)
    accession: getString(qidoStudy['00080050']) || '',
    // short string, probably a number?
    mrn: getString(qidoStudy['00100020']) || '',
    // medicalRecordNumber
    patientName: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(getName(qidoStudy['00100010'])) || '',
    instances: Number(getString(qidoStudy['00201208'])) || 0,
    // number
    description: getString(qidoStudy['00081030']) || '',
    modalities: getString(getModalities(qidoStudy['00080060'], qidoStudy['00080061'])) || ''
  }));
  return studies;
}

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoSeries - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoSeries[0].qidoSeries - An object where each key is the DICOM Tag group+element
 * @param {object} qidoSeries[0].qidoSeries[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoSeries[0].qidoSeries[dicomTag].vr - Value Representation
 * @param {string[]} qidoSeries[0].qidoSeries[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processSeriesResults(qidoSeries) {
  const series = [];
  if (qidoSeries && qidoSeries.length) {
    qidoSeries.forEach(qidoSeries => series.push({
      studyInstanceUid: getString(qidoSeries['0020000D']),
      seriesInstanceUid: getString(qidoSeries['0020000E']),
      modality: getString(qidoSeries['00080060']),
      seriesNumber: getString(qidoSeries['00200011']),
      seriesDate: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatDate(getString(qidoSeries['00080021'])),
      numSeriesInstances: Number(getString(qidoSeries['00201209'])),
      description: getString(qidoSeries['0008103E'])
    }));
  }
  (0,_ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortStudySeries)(series);
  return series;
}

/**
 *
 * @param {object} dicomWebClient - Client similar to what's provided by `dicomweb-client` library
 * @param {function} dicomWebClient.searchForStudies -
 * @param {string} [studyInstanceUid]
 * @param {string} [seriesInstanceUid]
 * @param {string} [queryParamaters]
 * @returns {Promise<results>} - Promise that resolves results
 */
async function search(dicomWebClient, studyInstanceUid, seriesInstanceUid, queryParameters) {
  let searchResult = await dicomWebClient.searchForStudies({
    studyInstanceUid: undefined,
    queryParams: queryParameters
  });
  return searchResult;
}

/**
 *
 * @param {string} studyInstanceUID - ID of study to return a list of series for
 * @returns {Promise} - Resolves SeriesMetadata[] in study
 */
function seriesInStudy(dicomWebClient, studyInstanceUID) {
  // Series Description
  // Already included?
  const commaSeparatedFields = ['0008103E', '00080021'].join(',');
  const queryParams = {
    includefield: commaSeparatedFields
  };
  return dicomWebClient.searchForSeries({
    studyInstanceUID,
    queryParams
  });
}
function searchStudies(server, filter) {
  const queryParams = getQIDOQueryParams(filter, server.qidoSupportsIncludeField);
  const options = {
    queryParams
  };
  return dicomWeb.searchForStudies(options).then(resultDataToStudies);
}

/**
 * Produces a QIDO URL given server details and a set of specified search filter
 * items
 *
 * @param filter
 * @param serverSupportsQIDOIncludeField
 * @returns {string} The URL with encoded filter query data
 */
function mapParams(params) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!params) {
    return;
  }
  const commaSeparatedFields = ['00081030',
  // Study Description
  '00080060' // Modality
  // Add more fields here if you want them in the result
  ].join(',');
  const {
    supportsWildcard
  } = options;
  const withWildcard = value => {
    return supportsWildcard && value ? `*${value}*` : value;
  };
  const parameters = {
    // Named
    PatientName: withWildcard(params.patientName),
    //PatientID: withWildcard(params.patientId),
    '00100020': withWildcard(params.patientId),
    // Temporarily to make the tests pass with dicomweb-server.. Apparently it's broken?
    AccessionNumber: withWildcard(params.accessionNumber),
    StudyDescription: withWildcard(params.studyDescription),
    ModalitiesInStudy: params.modalitiesInStudy,
    // Other
    limit: params.limit || 101,
    offset: params.offset || 0,
    fuzzymatching: options.supportsFuzzyMatching === true,
    includefield: commaSeparatedFields // serverSupportsQIDOIncludeField ? commaSeparatedFields : 'all',
  };

  // build the StudyDate range parameter
  if (params.startDate && params.endDate) {
    parameters.StudyDate = `${params.startDate}-${params.endDate}`;
  } else if (params.startDate) {
    const today = new Date();
    const DD = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const YYYY = today.getFullYear();
    const todayStr = `${YYYY}${MM}${DD}`;
    parameters.StudyDate = `${params.startDate}-${todayStr}`;
  } else if (params.endDate) {
    const oldDateStr = `19700102`;
    parameters.StudyDate = `${oldDateStr}-${params.endDate}`;
  }

  // Build the StudyInstanceUID parameter
  if (params.studyInstanceUid) {
    let studyUids = params.studyInstanceUid;
    studyUids = Array.isArray(studyUids) ? studyUids.join() : studyUids;
    studyUids = studyUids.replace(/[^0-9.]+/g, '\\');
    parameters.StudyInstanceUID = studyUids;
  }

  // Clean query params of undefined values.
  const final = {};
  Object.keys(parameters).forEach(key => {
    if (parameters[key] !== undefined && parameters[key] !== '') {
      final[key] = parameters[key];
    }
  });
  return final;
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getString, "getString", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(getName, "getName", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(getModalities, "getModalities", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(processResults, "processResults", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(processSeriesResults, "processSeriesResults", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(search, "search", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(seriesInStudy, "seriesInStudy", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(searchStudies, "searchStudies", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
  reactHotLoader.register(mapParams, "mapParams", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/qido.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteStudyMetadataPromise: () => (/* binding */ deleteStudyMetadataPromise),
/* harmony export */   retrieveStudyMetadata: () => (/* binding */ retrieveStudyMetadata)
/* harmony export */ });
/* harmony import */ var _wado_retrieveMetadata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wado/retrieveMetadata.js */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const moduleName = 'RetrieveStudyMetadata';
// Cache for promises. Prevents unnecessary subsequent calls to the server
const StudyMetaDataPromises = new Map();

/**
 * Retrieves study metadata
 *
 * @param {Object} server Object with server configuration parameters
 * @param {string} StudyInstanceUID The UID of the Study to be retrieved
 * @param {boolean} enabledStudyLazyLoad Whether the study metadata should be loaded asynchronusly.
 * @param {function} storeInstancesCallback A callback used to store the retrieved instance metadata.
 * @param {Object} [filters] - Object containing filters to be applied on retrieve metadata process
 * @param {string} [filter.seriesInstanceUID] - series instance uid to filter results against
 * @returns {Promise} that will be resolved with the metadata or rejected with the error
 */
function retrieveStudyMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction) {
  // @TODO: Whenever a study metadata request has failed, its related promise will be rejected once and for all
  // and further requests for that metadata will always fail. On failure, we probably need to remove the
  // corresponding promise from the "StudyMetaDataPromises" map...

  if (!dicomWebClient) {
    throw new Error(`${moduleName}: Required 'dicomWebClient' parameter not provided.`);
  }
  if (!StudyInstanceUID) {
    throw new Error(`${moduleName}: Required 'StudyInstanceUID' parameter not provided.`);
  }

  // Already waiting on result? Return cached promise
  if (StudyMetaDataPromises.has(StudyInstanceUID)) {
    return StudyMetaDataPromises.get(StudyInstanceUID);
  }

  // Create a promise to handle the data retrieval
  const promise = new Promise((resolve, reject) => {
    (0,_wado_retrieveMetadata_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction).then(function (data) {
      resolve(data);
    }, reject);
  });

  // Store the promise in cache
  StudyMetaDataPromises.set(StudyInstanceUID, promise);
  return promise;
}

/**
 * Delete the cached study metadata retrieval promise to ensure that the browser will
 * re-retrieve the study metadata when it is next requested
 *
 * @param {String} StudyInstanceUID The UID of the Study to be removed from cache
 *
 */
function deleteStudyMetadataPromise(StudyInstanceUID) {
  if (StudyMetaDataPromises.has(StudyInstanceUID)) {
    StudyMetaDataPromises.delete(StudyInstanceUID);
  }
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(moduleName, "moduleName", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
  reactHotLoader.register(StudyMetaDataPromises, "StudyMetaDataPromises", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
  reactHotLoader.register(retrieveStudyMetadata, "retrieveStudyMetadata", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
  reactHotLoader.register(deleteStudyMetadataPromise, "deleteStudyMetadataPromise", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticWadoClient)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


/**
 * An implementation of the static wado client, that fetches data from
 * a static response rather than actually doing real queries.  This allows
 * fast encoding of test data, but because it is static, anything actually
 * performing searches doesn't work.  This version fixes the query issue
 * by manually implementing a query option.
 */
class StaticWadoClient extends dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient {
  constructor(qidoConfig) {
    super(qidoConfig);
    this.staticWado = qidoConfig.staticWado;
  }

  /**
   * Replace the search for studies remote query with a local version which
   * retrieves a complete query list and then sub-selects from it locally.
   * @param {*} options
   * @returns
   */
  async searchForStudies(options) {
    if (!this.staticWado) return super.searchForStudies(options);
    const searchResult = await super.searchForStudies(options);
    const {
      queryParams
    } = options;
    if (!queryParams) return searchResult;
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(study => {
      for (const key of Object.keys(StaticWadoClient.studyFilterKeys)) {
        if (!this.filterItem(key, lowerParams, study, StaticWadoClient.studyFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }
  async searchForSeries(options) {
    if (!this.staticWado) return super.searchForSeries(options);
    const searchResult = await super.searchForSeries(options);
    const {
      queryParams
    } = options;
    if (!queryParams) return searchResult;
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(series => {
      for (const key of Object.keys(StaticWadoClient.seriesFilterKeys)) {
        if (!this.filterItem(key, lowerParams, series, StaticWadoClient.seriesFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }

  /**
   * Compares values, matching any instance of desired to any instance of
   * actual by recursively go through the paired set of values.  That is,
   * this is O(m*n) where m is how many items in desired and n is the length of actual
   * Then, at the individual item node, compares the Alphabetic name if present,
   * and does a sub-string matching on string values, and otherwise does an
   * exact match comparison.
   *
   * @param {*} desired
   * @param {*} actual
   * @returns true if the values match
   */
  compareValues(desired, actual) {
    if (Array.isArray(desired)) {
      return desired.find(item => this.compareValues(item, actual));
    }
    if (Array.isArray(actual)) {
      return actual.find(actualItem => this.compareValues(desired, actualItem));
    }
    if (actual?.Alphabetic) {
      actual = actual.Alphabetic;
    }
    if (typeof actual == 'string') {
      if (actual.length === 0) return true;
      if (desired.length === 0 || desired === '*') return true;
      if (desired[0] === '*' && desired[desired.length - 1] === '*') {
        // console.log(`Comparing ${actual} to ${desired.substring(1, desired.length - 1)}`)
        return actual.indexOf(desired.substring(1, desired.length - 1)) != -1;
      } else if (desired[desired.length - 1] === '*') {
        return actual.indexOf(desired.substring(0, desired.length - 1)) != -1;
      } else if (desired[0] === '*') {
        return actual.indexOf(desired.substring(1)) === actual.length - desired.length + 1;
      }
    }
    return desired === actual;
  }

  /** Compares a pair of dates to see if the value is within the range */
  compareDateRange(range, value) {
    if (!value) return true;
    const dash = range.indexOf('-');
    if (dash === -1) return this.compareValues(range, value);
    const start = range.substring(0, dash);
    const end = range.substring(dash + 1);
    return (!start || value >= start) && (!end || value <= end);
  }

  /**
   * Filters the return list by the query parameters.
   *
   * @param anyCaseKey - a possible search key
   * @param queryParams -
   * @param {*} study
   * @param {*} sourceFilterMap
   * @returns
   */
  filterItem(key, queryParams, study, sourceFilterMap) {
    const altKey = sourceFilterMap[key] || key;
    if (!queryParams) return true;
    const testValue = queryParams[key] || queryParams[altKey];
    if (!testValue) return true;
    const valueElem = study[key] || study[altKey];
    if (!valueElem) return false;
    if (valueElem.vr == 'DA') {
      return this.compareDateRange(testValue, valueElem.Value[0]);
    }
    const value = valueElem.Value;
    return this.compareValues(testValue, value);
  }

  /** Converts the query parameters to lower case query parameters */
  toLowerParams(queryParams) {
    const lowerParams = {};
    Object.entries(queryParams).forEach(_ref => {
      let [key, value] = _ref;
      lowerParams[key.toLowerCase()] = value;
    });
    return lowerParams;
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
StaticWadoClient.studyFilterKeys = {
  studyinstanceuid: '0020000D',
  patientname: '00100010',
  '00100020': 'mrn',
  studydescription: '00081030',
  studydate: '00080020',
  modalitiesinstudy: '00080061',
  accessionnumber: '00080050'
};
StaticWadoClient.seriesFilterKeys = {
  seriesinstanceuid: '0020000E',
  seriesnumber: '00200011',
  modality: '00080060'
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(StaticWadoClient, "StaticWadoClient", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts ***!
  \**********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixBulkDataURI: () => (/* binding */ fixBulkDataURI)
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
 * Modifies a bulkDataURI to ensure it is absolute based on the DICOMWeb configuration and
 * instance data. The modification is in-place.
 *
 * If the bulkDataURI is relative to the series or study (according to the DICOM standard),
 * it is made absolute by prepending the relevant paths.
 *
 * In scenarios where the bulkDataURI is a server-relative path (starting with '/'), the function
 * handles two cases:
 *
 * 1. If the wado root is absolute (starts with 'http'), it prepends the wado root to the bulkDataURI.
 * 2. If the wado root is relative, no changes are needed as the bulkDataURI is already correctly relative to the server root.
 *
 * @param value - The object containing BulkDataURI to be fixed.
 * @param instance - The object (DICOM instance data) containing StudyInstanceUID and SeriesInstanceUID.
 * @param dicomWebConfig - The DICOMWeb configuration object, containing wadoRoot and potentially bulkDataURI.relativeResolution.
 * @returns The function modifies `value` in-place, it does not return a value.
 */
function fixBulkDataURI(value, instance, dicomWebConfig) {
  // in case of the relative path, make it absolute. The current DICOM standard says
  // the bulkdataURI is relative to the series. However, there are situations where
  // it can be relative to the study too
  if (!value.BulkDataURI.startsWith('http') && !value.BulkDataURI.startsWith('/')) {
    if (dicomWebConfig.bulkDataURI?.relativeResolution === 'studies') {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${instance.StudyInstanceUID}/${value.BulkDataURI}`;
    } else if (dicomWebConfig.bulkDataURI?.relativeResolution === 'series' || !dicomWebConfig.bulkDataURI?.relativeResolution) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${instance.StudyInstanceUID}/series/${instance.SeriesInstanceUID}/${value.BulkDataURI}`;
    }
    return;
  }

  // in case it is relative path but starts at the server (e.g., /bulk/1e, note the missing http
  // in the beginning and the first character is /) There are two scenarios, whether the wado root
  // is absolute or relative. In case of absolute, we need to prepend the wado root to the bulkdata
  // uri (e.g., bulkData: /bulk/1e, wado root: http://myserver.com/dicomweb, output: http://myserver.com/bulk/1e)
  // and in case of relative wado root, we need to prepend the bulkdata uri to the wado root (e.g,. bulkData: /bulk/1e
  // wado root: /dicomweb, output: /bulk/1e)
  if (value.BulkDataURI[0] === '/') {
    if (dicomWebConfig.wadoRoot.startsWith('http')) {
      // Absolute wado root
      const url = new URL(dicomWebConfig.wadoRoot);
      value.BulkDataURI = `${url.origin}${value.BulkDataURI}`;
    } else {
      // Relative wado root, we don't need to do anything, bulkdata uri is already correct
    }
  }
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(fixBulkDataURI, "fixBulkDataURI", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getImageId)
/* harmony export */ });
/* harmony import */ var _getWADORSImageId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWADORSImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function buildInstanceWadoUrl(config, instance) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const params = [];
  params.push('requestType=WADO');
  params.push(`studyUID=${StudyInstanceUID}`);
  params.push(`seriesUID=${SeriesInstanceUID}`);
  params.push(`objectUID=${SOPInstanceUID}`);
  params.push('contentType=application/dicom');
  params.push('transferSyntax=*');
  const paramString = params.join('&');
  return `${config.wadoUriRoot}?${paramString}`;
}

/**
 * Obtain an imageId for Cornerstone from an image instance
 *
 * @param instance
 * @param frame
 * @param thumbnail
 * @returns {string} The imageId to be used by Cornerstone
 */
function getImageId(_ref) {
  let {
    instance,
    frame,
    config,
    thumbnail = false
  } = _ref;
  if (!instance) {
    return;
  }
  if (instance.url) {
    return instance.url;
  }
  const renderingAttr = thumbnail ? 'thumbnailRendering' : 'imageRendering';
  if (!config[renderingAttr] || config[renderingAttr] === 'wadouri') {
    const wadouri = buildInstanceWadoUrl(config, instance);
    let imageId = 'dicomweb:' + wadouri;
    if (frame !== undefined) {
      imageId += '&frame=' + frame;
    }
    return imageId;
  } else {
    return (0,_getWADORSImageId__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, config, frame); // WADO-RS Retrieve Frame
  }
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(buildInstanceWadoUrl, "buildInstanceWadoUrl", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/getImageId.js");
  reactHotLoader.register(getImageId, "getImageId", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/getImageId.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWADORSImageId)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
function buildInstanceWadoRsUri(instance, config) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  return `${config.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}`;
}
function buildInstanceFrameWadoRsUri(instance, config, frame) {
  const baseWadoRsUri = buildInstanceWadoRsUri(instance, config);
  frame = frame || 1;
  return `${baseWadoRsUri}/frames/${frame}`;
}

// function getWADORSImageUrl(instance, frame) {
//   const wadorsuri = buildInstanceFrameWadoRsUri(instance, config, frame);

//   if (!wadorsuri) {
//     return;
//   }

//   // Use null to obtain an imageId which represents the instance
//   if (frame === null) {
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, '');
//   } else {
//     // We need to sum 1 because WADO-RS frame number is 1-based
//     frame = frame ? parseInt(frame) + 1 : 1;

//     // Replaces /frame/1 by /frame/{frame}
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, `frames/${frame}`);
//   }

//   return wadorsuri;
// }

/**
 * Obtain an imageId for Cornerstone based on the WADO-RS scheme
 *
 * @param {object} instanceMetada metadata object (InstanceMetadata)
 * @param {(string\|number)} [frame] the frame number
 * @returns {string} The imageId to be used by Cornerstone
 */
function getWADORSImageId(instance, config, frame) {
  //const uri = getWADORSImageUrl(instance, frame);
  const uri = buildInstanceFrameWadoRsUri(instance, config, frame);
  if (!uri) {
    return;
  }
  return `wadors:${uri}`;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(buildInstanceWadoRsUri, "buildInstanceWadoRsUri", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js");
  reactHotLoader.register(buildInstanceFrameWadoRsUri, "buildInstanceFrameWadoRsUri", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js");
  reactHotLoader.register(getWADORSImageId, "getWADORSImageId", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/index.ts":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/index.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixBulkDataURI: () => (/* reexport safe */ _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__.fixBulkDataURI)
/* harmony export */ });
/* harmony import */ var _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retrieveMetadataLoaderSync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retrieveMetadataLoaderSync */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js");
/* harmony import */ var _retrieveMetadataLoaderAsync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retrieveMetadataLoaderAsync */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/**
 * Retrieve Study metadata from a DICOM server. If the server is configured to use lazy load, only the first series
 * will be loaded and the property "studyLoader" will be set to let consumer load remaining series as needed.
 *
 * @param {Object} dicomWebClient The dicomweb-client.
 * @param {string} studyInstanceUid The Study Instance UID of the study which needs to be loaded
 * @param {Object} [filters] - Object containing filters to be applied on retrieve metadata process
 * @param {string} [filter.seriesInstanceUID] - series instance uid to filter results against
 * @returns {Object} A study descriptor object
 */
async function RetrieveMetadata(dicomWebClient, studyInstanceUid, enableStudyLazyLoad) {
  let filters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let sortCriteria = arguments.length > 4 ? arguments[4] : undefined;
  let sortFunction = arguments.length > 5 ? arguments[5] : undefined;
  const RetrieveMetadataLoader = enableStudyLazyLoad !== false ? _retrieveMetadataLoaderAsync__WEBPACK_IMPORTED_MODULE_1__["default"] : _retrieveMetadataLoaderSync__WEBPACK_IMPORTED_MODULE_0__["default"];
  const retrieveMetadataLoader = new RetrieveMetadataLoader(dicomWebClient, studyInstanceUid, filters, sortCriteria, sortFunction);
  const data = await retrieveMetadataLoader.execLoad();
  return data;
}
const _default = RetrieveMetadata;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(RetrieveMetadata, "RetrieveMetadata", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoader)
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
 * Class to define inheritance of load retrieve strategy.
 * The process can be async load (lazy) or sync load
 *
 * There are methods that must be implemented at consumer level
 * To retrieve study call execLoad
 */
class RetrieveMetadataLoader {
  /**
   * @constructor
   * @param {Object} client The dicomweb-client.
   * @param {Array} studyInstanceUID Study instance ui to be retrieved
   * @param {Object} [filters] - Object containing filters to be applied on retrieve metadata process
   * @param {string} [filter.seriesInstanceUID] - series instance uid to filter results against
   * @param {Function} [sortSeries] - Custom sort function for series
   */
  constructor(client, studyInstanceUID) {
    let filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let sortCriteria = arguments.length > 3 ? arguments[3] : undefined;
    let sortFunction = arguments.length > 4 ? arguments[4] : undefined;
    this.client = client;
    this.studyInstanceUID = studyInstanceUID;
    this.filters = filters;
    this.sortCriteria = sortCriteria;
    this.sortFunction = sortFunction;
  }
  async execLoad() {
    const preLoadData = await this.preLoad();
    const loadData = await this.load(preLoadData);
    const postLoadData = await this.posLoad(loadData);
    return postLoadData;
  }

  /**
   * It iterates over given loaders running each one. Loaders parameters must be bind when getting it.
   * @param {Array} loaders - array of loader to retrieve data.
   */
  async runLoaders(loaders) {
    let result;
    for (const loader of loaders) {
      try {
        result = await loader();
        if (result && result.length) {
          break; // closes iterator in case data is retrieved successfully
        }
      } catch (e) {
        throw e;
      }
    }
    if (loaders.next().done && !result) {
      throw new Error('RetrieveMetadataLoader failed');
    }
    return result;
  }

  // Methods to be overwrite
  async configLoad() {}
  async preLoad() {}
  async load(preLoadData) {}
  async posLoad(loadData) {}
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
  reactHotLoader.register(RetrieveMetadataLoader, "RetrieveMetadataLoader", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoaderAsync)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sortStudy */ "../../core/src/utils/sortStudy.ts");
/* harmony import */ var _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retrieveMetadataLoader */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




/**
 * Creates an immutable series loader object which loads each series sequentially using the iterator interface
 * @param {DICOMWebClient} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} studyInstanceUID The Study Instance UID from which series will be loaded
 * @param {Array} seriesInstanceUIDList A list of Series Instance UIDs
 * @returns {Object} Returns an object which supports loading of instances from each of given Series Instance UID
 */
function makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDList) {
  return Object.freeze({
    hasNext() {
      return seriesInstanceUIDList.length > 0;
    },
    async next() {
      const seriesInstanceUID = seriesInstanceUIDList.shift();
      return client.retrieveSeriesMetadata({
        studyInstanceUID,
        seriesInstanceUID
      });
    }
  });
}

/**
 * Class for async load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * It loads the one series and then append to seriesLoader the others to be consumed/loaded
 */
class RetrieveMetadataLoaderAsync extends _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * @returns {Array} Array of preLoaders. To be consumed as queue
   */
  *getPreLoaders() {
    const preLoaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;
    if (seriesInstanceUID) {
      const options = {
        studyInstanceUID,
        queryParams: {
          SeriesInstanceUID: seriesInstanceUID
        }
      };
      preLoaders.push(client.searchForSeries.bind(client, options));
    }
    // Fallback preloader
    preLoaders.push(client.searchForSeries.bind(client, {
      studyInstanceUID
    }));
    yield* preLoaders;
  }
  async preLoad() {
    const preLoaders = this.getPreLoaders();
    const result = await this.runLoaders(preLoaders);
    const sortCriteria = this.sortCriteria;
    const sortFunction = this.sortFunction;
    const {
      naturalizeDataset
    } = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.DicomMetaDictionary;
    const naturalized = result.map(naturalizeDataset);
    return (0,_ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortStudySeries)(naturalized, sortCriteria || _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortingCriteria.seriesSortCriteria.seriesInfoSortingCriteria, sortFunction);
  }
  async load(preLoadData) {
    const {
      client,
      studyInstanceUID
    } = this;
    const seriesInstanceUIDs = preLoadData.map(s => s.SeriesInstanceUID);
    const seriesAsyncLoader = makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDs);
    const promises = [];
    while (seriesAsyncLoader.hasNext()) {
      promises.push(seriesAsyncLoader.next());
    }
    return {
      preLoadData,
      promises
    };
  }
  async posLoad(_ref) {
    let {
      preLoadData,
      promises
    } = _ref;
    return {
      preLoadData,
      promises
    };
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
  reactHotLoader.register(makeSeriesAsyncLoader, "makeSeriesAsyncLoader", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js");
  reactHotLoader.register(RetrieveMetadataLoaderAsync, "RetrieveMetadataLoaderAsync", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoaderSync)
/* harmony export */ });
/* harmony import */ var _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retrieveMetadataLoader */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
// import { api } from 'dicomweb-client';
// import DICOMWeb from '../../../DICOMWeb/';



/**
 * Class for sync load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * A list of loaders (getLoaders) can be created so, it will be applied a fallback load strategy.
 * I.e Retrieve metadata using all loaders possibilities.
 */
class RetrieveMetadataLoaderSync extends _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getOptions() {
    const {
      studyInstanceUID,
      filters
    } = this;
    const options = {
      studyInstanceUID
    };
    const {
      seriesInstanceUID
    } = filters;
    if (seriesInstanceUID) {
      options['seriesInstanceUID'] = seriesInstanceUID;
    }
    return options;
  }

  /**
   * @returns {Array} Array of loaders. To be consumed as queue
   */
  *getLoaders() {
    const loaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;
    if (seriesInstanceUID) {
      loaders.push(client.retrieveSeriesMetadata.bind(client, {
        studyInstanceUID,
        seriesInstanceUID
      }));
    }
    loaders.push(client.retrieveStudyMetadata.bind(client, {
      studyInstanceUID
    }));
    yield* loaders;
  }
  async load(preLoadData) {
    const loaders = this.getLoaders();
    const result = this.runLoaders(loaders);
    return result;
  }
  async posLoad(loadData) {
    return loadData;
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
  reactHotLoader.register(RetrieveMetadataLoaderSync, "RetrieveMetadataLoaderSync", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/DicomWebProxyDataSource/index.js":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebProxyDataSource/index.js ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomWebProxyApi: () => (/* binding */ createDicomWebProxyApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DicomWebDataSource/index */ "../../../extensions/default/src/DicomWebDataSource/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



/**
 * This datasource is initialized with a url that returns a JSON object with a
 * dicomWeb datasource configuration array present in a "servers" object.
 *
 * Only the first array item is parsed, if there are multiple items in the
 * dicomWeb configuration array
 *
 */
function createDicomWebProxyApi(dicomWebProxyConfig, UserAuthenticationService) {
  const {
    name
  } = dicomWebProxyConfig;
  let dicomWebDelegate = undefined;
  const implementation = {
    initialize: async _ref => {
      let {
        params,
        query
      } = _ref;
      let studyInstanceUIDs = [];

      // there seem to be a couple of variations of the case for this parameter
      const queryStudyInstanceUIDs = query.get('studyInstanceUIDs') || query.get('studyInstanceUids');
      if (!queryStudyInstanceUIDs) {
        throw new Error(`No studyInstanceUids in request for '${name}'`);
      }
      const url = query.get('url');
      if (!url) {
        throw new Error(`No url for '${name}'`);
      } else {
        const response = await fetch(url);
        let data = await response.json();
        if (!data.servers?.dicomWeb?.[0]) {
          throw new Error('Invalid configuration returned by url');
        }
        dicomWebDelegate = (0,_DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_1__.createDicomWebApi)(data.servers.dicomWeb[0], UserAuthenticationService);
        studyInstanceUIDs = queryStudyInstanceUIDs.split(';');
      }
      return studyInstanceUIDs;
    },
    query: {
      studies: {
        search: params => dicomWebDelegate.query.studies.search(params)
      },
      series: {
        search: function () {
          return dicomWebDelegate.query.series.search(...arguments);
        }
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => dicomWebDelegate.query.instances.search(studyInstanceUid, queryParameters)
      }
    },
    retrieve: {
      directURL: function () {
        return dicomWebDelegate.retrieve.directURL(...arguments);
      },
      series: {
        metadata: function () {
          return dicomWebDelegate.retrieve.series.metadata(...arguments);
        }
      }
    },
    store: {
      dicom: function () {
        return dicomWebDelegate.store(...arguments);
      }
    },
    deleteStudyMetadataPromise: function () {
      return dicomWebDelegate.deleteStudyMetadataPromise(...arguments);
    },
    getImageIdsForDisplaySet: function () {
      return dicomWebDelegate.getImageIdsForDisplaySet(...arguments);
    },
    getImageIdsForInstance: function () {
      return dicomWebDelegate.getImageIdsForInstance(...arguments);
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(createDicomWebProxyApi, "createDicomWebProxyApi", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/DicomWebProxyDataSource/index.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/ActionButtons.tsx":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/Panels/ActionButtons.tsx ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    onCreateReportClick
  } = _ref;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('MeasurementTable');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    color: "black",
    size: "inherit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "px-2 py-2 text-base",
    onClick: onExportClick
  }, t('Export CSV')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "px-2 py-2 text-base",
    onClick: onCreateReportClick
  }, t('Create Report'))));
}
__signature__(ActionButtons, "useTranslation{{ t }}", () => [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation]);
ActionButtons.propTypes = {
  onExportClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  onCreateReportClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)
};
ActionButtons.defaultProps = {
  onExportClick: () => alert('Export'),
  onCreateReportClick: () => alert('Create Report')
};
const _default = ActionButtons;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ActionButtons, "ActionButtons", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/ActionButtons.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/ActionButtons.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/DataSourceSelector.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Panels/DataSourceSelector.tsx ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





function DataSourceSelector() {
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();

  // This is frowned upon, but the raw config is needed here to provide
  // the selector
  const dsConfigs = appConfig.dataSources;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "h-screen w-screen flex justify-center items-center "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "py-8 px-8 mx-auto bg-secondary-dark drop-shadow-md space-y-2 rounded-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "block mx-auto h-14",
    src: "./ohif-logo.svg",
    alt: "OHIF"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center space-y-2 pt-4"
  }, dsConfigs.filter(it => it.sourceName !== 'dicomjson' && it.sourceName !== 'dicomlocal').map(ds => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: ds.sourceName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
    className: "text-white"
  }, ds.friendlyName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('font-bold', 'ml-2'),
    onClick: () => {
      navigate({
        pathname: '/',
        search: `datasources=${ds.sourceName}`
      });
    }
  }, ds.sourceName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null)))))));
}
__signature__(DataSourceSelector, "useAppConfig{[appConfig]}\nuseNavigate{navigate}", () => [_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig, react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate]);
const _default = DataSourceSelector;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DataSourceSelector, "DataSourceSelector", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/DataSourceSelector.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/DataSourceSelector.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/PanelMeasurementTable.tsx":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/PanelMeasurementTable.tsx ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelMeasurementTable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ActionButtons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ActionButtons */ "../../../extensions/default/src/Panels/ActionButtons.tsx");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createReportDialogPrompt */ "../../../extensions/default/src/Panels/createReportDialogPrompt.tsx");
/* harmony import */ var _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Actions/createReportAsync */ "../../../extensions/default/src/Actions/createReportAsync.tsx");
/* harmony import */ var _utils_findSRWithSameSeriesDescription__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/findSRWithSameSeriesDescription */ "../../../extensions/default/src/utils/findSRWithSameSeriesDescription.ts");
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
} = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.utils;
function PanelMeasurementTable(_ref) {
  let {
    servicesManager,
    commandsManager,
    extensionManager
  } = _ref;
  const [viewportGrid, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid)();
  const {
    activeViewportIndex,
    viewports
  } = viewportGrid;
  const {
    measurementService,
    uiDialogService,
    uiNotificationService,
    displaySetService
  } = servicesManager.services;
  const [displayMeasurements, setDisplayMeasurements] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const debouncedSetDisplayMeasurements = lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()(setDisplayMeasurements, 100);
    // ~~ Initial
    setDisplayMeasurements(_getMappedMeasurements(measurementService));

    // ~~ Subscription
    const added = measurementService.EVENTS.MEASUREMENT_ADDED;
    const addedRaw = measurementService.EVENTS.RAW_MEASUREMENT_ADDED;
    const updated = measurementService.EVENTS.MEASUREMENT_UPDATED;
    const removed = measurementService.EVENTS.MEASUREMENT_REMOVED;
    const cleared = measurementService.EVENTS.MEASUREMENTS_CLEARED;
    const subscriptions = [];
    [added, addedRaw, updated, removed, cleared].forEach(evt => {
      subscriptions.push(measurementService.subscribe(evt, () => {
        debouncedSetDisplayMeasurements(_getMappedMeasurements(measurementService));
      }).unsubscribe);
    });
    return () => {
      subscriptions.forEach(unsub => {
        unsub();
      });
      debouncedSetDisplayMeasurements.cancel();
    };
  }, []);
  async function exportReport() {
    const measurements = measurementService.getMeasurements();
    downloadCSVReport(measurements, measurementService);
  }
  async function clearMeasurements() {
    measurementService.clearMeasurements();
  }
  async function createReport() {
    // filter measurements that are added to the active study
    const activeViewport = viewports[activeViewportIndex];
    const measurements = measurementService.getMeasurements();
    const displaySet = displaySetService.getDisplaySetByUID(activeViewport.displaySetInstanceUIDs[0]);
    const trackedMeasurements = measurements.filter(m => displaySet.StudyInstanceUID === m.referenceStudyUID);
    if (trackedMeasurements.length <= 0) {
      uiNotificationService.show({
        title: 'No Measurements',
        message: 'No Measurements are added to the current Study.',
        type: 'info',
        duration: 3000
      });
      return;
    }
    const promptResult = await (0,_createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_6__["default"])(uiDialogService, {
      extensionManager
    });
    if (promptResult.action === _createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_6__.CREATE_REPORT_DIALOG_RESPONSE.CREATE_REPORT) {
      const dataSources = extensionManager.getDataSources(promptResult.dataSourceName);
      const dataSource = dataSources[0];
      const SeriesDescription =
      // isUndefinedOrEmpty
      promptResult.value === undefined || promptResult.value === '' ? 'Research Derived Series' // default
      : promptResult.value; // provided value

      // Re-use an existing series having the same series description to avoid
      // creating too many series instances.
      const options = (0,_utils_findSRWithSameSeriesDescription__WEBPACK_IMPORTED_MODULE_8__["default"])(SeriesDescription, displaySetService);
      return (0,_Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_7__["default"])(servicesManager, commandsManager, dataSource, trackedMeasurements, options);
    }
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
    //Todo: why we are jumping to image?
    // jumpToImage({ id, isActive });

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
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Dialog,
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
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Input, {
            label: "Enter your annotation",
            labelClassName: "text-white text-[14px] leading-[1.2]",
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "overflow-x-hidden overflow-y-auto ohif-scrollbar",
    "data-cy": 'measurements-panel'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.MeasurementTable, {
    title: "Measurements",
    servicesManager: servicesManager,
    data: displayMeasurements,
    onClick: jumpToImage,
    onEdit: onMeasurementItemEditHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex justify-center p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActionButtons__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onExportClick: exportReport,
    onClearMeasurementsClick: clearMeasurements,
    onCreateReportClick: createReport
  })));
}
__signature__(PanelMeasurementTable, "useViewportGrid{[viewportGrid, viewportGridService]}\nuseState{[displayMeasurements, setDisplayMeasurements]([])}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid]);
PanelMeasurementTable.propTypes = {
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.ServicesManager).isRequired
};
function _getMappedMeasurements(measurementService) {
  const measurements = measurementService.getMeasurements();
  const mappedMeasurements = measurements.map((m, index) => _mapMeasurementToDisplay(m, index, measurementService.VALUE_TYPES));
  return mappedMeasurements;
}

/**
 * Map the measurements to the display text.
 * Adds finding and site inforamtion to the displayText and/or label,
 * and provides as 'displayText' and 'label', while providing the original
 * values as baseDisplayText and baseLabel
 */
function _mapMeasurementToDisplay(measurement, index, types) {
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
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(downloadCSVReport, "downloadCSVReport", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelMeasurementTable.tsx");
  reactHotLoader.register(PanelMeasurementTable, "PanelMeasurementTable", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelMeasurementTable.tsx");
  reactHotLoader.register(_getMappedMeasurements, "_getMappedMeasurements", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelMeasurementTable.tsx");
  reactHotLoader.register(_mapMeasurementToDisplay, "_mapMeasurementToDisplay", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelMeasurementTable.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/PanelStudyBrowser.tsx":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/Panels/PanelStudyBrowser.tsx ***!
  \********************************************************************/
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
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const {
  sortStudyInstances,
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils;

/**
 *
 * @param {*} param0
 */
function PanelStudyBrowser(_ref) {
  let {
    servicesManager,
    getImageSrc,
    getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy,
    dataSource
  } = _ref;
  const {
    hangingProtocolService,
    displaySetService,
    uiNotificationService
  } = servicesManager.services;
  // Normally you nest the components so the tree isn't so deep, and the data
  // doesn't have to have such an intense shape. This works well enough for now.
  // Tabs --> Studies --> DisplaySets --> Thumbnails
  const {
    StudyInstanceUIDs
  } = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useImageViewer)();
  const [{
    activeViewportIndex,
    viewports
  }, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid)();
  const [activeTabName, setActiveTabName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('primary');
  const [expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([...StudyInstanceUIDs]);
  const [studyDisplayList, setStudyDisplayList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [displaySets, setDisplaySets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [thumbnailImageSrcMap, setThumbnailImageSrcMap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  const onDoubleClickThumbnailHandler = displaySetInstanceUID => {
    let updatedViewports = [];
    const viewportIndex = activeViewportIndex;
    try {
      updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportIndex, displaySetInstanceUID);
    } catch (error) {
      console.warn(error);
      uiNotificationService.show({
        title: 'Thumbnail Double Click',
        message: 'The selected display sets could not be added to the viewport.',
        type: 'info',
        duration: 3000
      });
    }
    viewportGridService.setDisplaySetsForViewports(updatedViewports);
  };

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

  // // ~~ Initial Thumbnails
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const currentDisplaySets = displaySetService.activeDisplaySets;
    currentDisplaySets.forEach(async dSet => {
      const newImageSrcEntry = {};
      const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
      const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
      const imageId = imageIds[Math.floor(imageIds.length / 2)];

      // TODO: Is it okay that imageIds are not returned here for SR displaySets?
      if (imageId) {
        // When the image arrives, render it and store the result in the thumbnailImgSrcMap
        newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId);
        if (isMounted.current) {
          setThumbnailImageSrcMap(prevState => {
            return {
              ...prevState,
              ...newImageSrcEntry
            };
          });
        }
      }
    });
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ~~ displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // TODO: Are we sure `activeDisplaySets` will always be accurate?
    const currentDisplaySets = displaySetService.activeDisplaySets;
    const mappedDisplaySets = _mapDisplaySets(currentDisplaySets, thumbnailImageSrcMap);
    sortStudyInstances(mappedDisplaySets);
    setDisplaySets(mappedDisplaySets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnailImageSrcMap]);

  // ~~ subscriptions --> displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // DISPLAY_SETS_ADDED returns an array of DisplaySets that were added
    const SubscriptionDisplaySetsAdded = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
      const {
        displaySetsAdded
      } = data;
      displaySetsAdded.forEach(async dSet => {
        const newImageSrcEntry = {};
        const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
        const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
        const imageId = imageIds[Math.floor(imageIds.length / 2)];

        // TODO: Is it okay that imageIds are not returned here for SR displaysets?
        if (imageId) {
          // When the image arrives, render it and store the result in the thumbnailImgSrcMap
          newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId, dSet.initialViewport);
          if (isMounted.current) {
            setThumbnailImageSrcMap(prevState => {
              return {
                ...prevState,
                ...newImageSrcEntry
              };
            });
          }
        }
      });
    });

    // TODO: Will this always hold _all_ the displaySets we care about?
    // DISPLAY_SETS_CHANGED returns `DisplaySerService.activeDisplaySets`
    const SubscriptionDisplaySetsChanged = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_CHANGED, changedDisplaySets => {
      const mappedDisplaySets = _mapDisplaySets(changedDisplaySets, thumbnailImageSrcMap);
      setDisplaySets(mappedDisplaySets);
    });
    return () => {
      SubscriptionDisplaySetsAdded.unsubscribe();
      SubscriptionDisplaySetsChanged.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tabs = _createStudyBrowserTabs(StudyInstanceUIDs, studyDisplayList, displaySets);

  // TODO: Should not fire this on "close"
  function _handleStudyClick(StudyInstanceUID) {
    const shouldCollapseStudy = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    const updatedExpandedStudyInstanceUIDs = shouldCollapseStudy ?
    // eslint-disable-next-line prettier/prettier
    [...expandedStudyInstanceUIDs.filter(stdyUid => stdyUid !== StudyInstanceUID)] : [...expandedStudyInstanceUIDs, StudyInstanceUID];
    setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    if (!shouldCollapseStudy) {
      const madeInClient = true;
      requestDisplaySetCreationForStudy(displaySetService, StudyInstanceUID, madeInClient);
    }
  }
  const activeDisplaySetInstanceUIDs = viewports[activeViewportIndex]?.displaySetInstanceUIDs;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.StudyBrowser, {
    tabs: tabs,
    servicesManager: servicesManager,
    activeTabName: activeTabName,
    onDoubleClickThumbnail: onDoubleClickThumbnailHandler,
    activeDisplaySetInstanceUIDs: activeDisplaySetInstanceUIDs,
    expandedStudyInstanceUIDs: expandedStudyInstanceUIDs,
    onClickStudy: _handleStudyClick,
    onClickTab: clickedTabName => {
      setActiveTabName(clickedTabName);
    }
  });
}
__signature__(PanelStudyBrowser, "useImageViewer{{ StudyInstanceUIDs }}\nuseViewportGrid{[\n    { activeViewportIndex, viewports },\n    viewportGridService,\n  ]}\nuseState{[activeTabName, setActiveTabName]('primary')}\nuseState{[expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs]([\n    ...StudyInstanceUIDs,\n  ])}\nuseState{[studyDisplayList, setStudyDisplayList]([])}\nuseState{[displaySets, setDisplaySets]([])}\nuseState{[thumbnailImageSrcMap, setThumbnailImageSrcMap]({})}\nuseRef{isMounted}\nuseEffect{}\nuseEffect{}\nuseEffect{}\nuseEffect{}", () => [_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useImageViewer, _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid]);
PanelStudyBrowser.propTypes = {
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    getImageIdsForDisplaySet: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }).isRequired,
  getImageSrc: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  getStudiesForPatientByMRN: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  requestDisplaySetCreationForStudy: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};
const _default = PanelStudyBrowser;
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
function _mapDisplaySets(displaySets, thumbnailImageSrcMap) {
  const thumbnailDisplaySets = [];
  const thumbnailNoImageDisplaySets = [];
  displaySets.filter(ds => !ds.excludeFromThumbnailBrowser).forEach(ds => {
    const imageSrc = thumbnailImageSrcMap[ds.displaySetInstanceUID];
    const componentType = _getComponentType(ds.Modality);
    const array = componentType === 'thumbnail' ? thumbnailDisplaySets : thumbnailNoImageDisplaySets;
    array.push({
      displaySetInstanceUID: ds.displaySetInstanceUID,
      description: ds.SeriesDescription || '',
      seriesNumber: ds.SeriesNumber,
      modality: ds.Modality,
      seriesDate: ds.SeriesDate,
      seriesTime: ds.SeriesTime,
      numInstances: ds.numImageFrames,
      countIcon: ds.countIcon,
      StudyInstanceUID: ds.StudyInstanceUID,
      componentType,
      imageSrc,
      dragData: {
        type: 'displayset',
        displaySetInstanceUID: ds.displaySetInstanceUID
        // .. Any other data to pass
      }
    });
  });

  return [...thumbnailDisplaySets, ...thumbnailNoImageDisplaySets];
}
const thumbnailNoImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
function _getComponentType(Modality) {
  if (thumbnailNoImageModalities.includes(Modality)) {
    // TODO probably others.
    return 'thumbnailNoImage';
  }
  return 'thumbnail';
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
function _createStudyBrowserTabs(primaryStudyInstanceUIDs, studyDisplayList, displaySets) {
  const primaryStudies = [];
  const recentStudies = [];
  const allStudies = [];
  studyDisplayList.forEach(study => {
    const displaySetsForStudy = displaySets.filter(ds => ds.StudyInstanceUID === study.studyInstanceUid);
    const tabStudy = Object.assign({}, study, {
      displaySets: displaySetsForStudy
    });
    if (primaryStudyInstanceUIDs.includes(study.studyInstanceUid)) {
      primaryStudies.push(tabStudy);
    } else {
      // TODO: Filter allStudies to dates within one year of current date
      recentStudies.push(tabStudy);
      allStudies.push(tabStudy);
    }
  });
  const tabs = [{
    name: 'primary',
    label: 'Primary',
    studies: primaryStudies
  }, {
    name: 'recent',
    label: 'Recent',
    studies: recentStudies
  }, {
    name: 'all',
    label: 'All',
    studies: allStudies
  }];
  return tabs;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(sortStudyInstances, "sortStudyInstances", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(formatDate, "formatDate", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(PanelStudyBrowser, "PanelStudyBrowser", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(_mapDataSourceStudies, "_mapDataSourceStudies", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(_mapDisplaySets, "_mapDisplaySets", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(thumbnailNoImageModalities, "thumbnailNoImageModalities", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(_getComponentType, "_getComponentType", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(_createStudyBrowserTabs, "_createStudyBrowserTabs", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/PanelStudyBrowser.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelStudyBrowser */ "../../../extensions/default/src/Panels/PanelStudyBrowser.tsx");
/* harmony import */ var _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getImageSrcFromImageId */ "../../../extensions/default/src/Panels/getImageSrcFromImageId.js");
/* harmony import */ var _getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getStudiesForPatientByMRN */ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js");
/* harmony import */ var _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requestDisplaySetCreationForStudy */ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


//





/**
 * Wraps the PanelStudyBrowser and provides features afforded by managers/services
 *
 * @param {object} params
 * @param {object} commandsManager
 * @param {object} extensionManager
 */
function WrappedPanelStudyBrowser(_ref) {
  let {
    commandsManager,
    extensionManager,
    servicesManager
  } = _ref;
  // TODO: This should be made available a different way; route should have
  // already determined our datasource
  const dataSource = extensionManager.getDataSources()[0];
  const _getStudiesForPatientByMRN = _getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_4__["default"].bind(null, dataSource);
  const _getImageSrcFromImageId = _createGetImageSrcFromImageIdFn(extensionManager);
  const _requestDisplaySetCreationForStudy = _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_5__["default"].bind(null, dataSource);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
WrappedPanelStudyBrowser.propTypes = {
  commandsManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  extensionManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
const _default = WrappedPanelStudyBrowser;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(WrappedPanelStudyBrowser, "WrappedPanelStudyBrowser", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx");
  reactHotLoader.register(_createGetImageSrcFromImageIdFn, "_createGetImageSrcFromImageIdFn", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/createReportDialogPrompt.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/createReportDialogPrompt.tsx ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CREATE_REPORT_DIALOG_RESPONSE: () => (/* binding */ CREATE_REPORT_DIALOG_RESPONSE),
/* harmony export */   "default": () => (/* binding */ createReportDialogPrompt)
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
/* eslint-disable react/display-name */


const CREATE_REPORT_DIALOG_RESPONSE = {
  CANCEL: 0,
  CREATE_REPORT: 1
};
function createReportDialogPrompt(uiDialogService, _ref) {
  let {
    extensionManager
  } = _ref;
  return new Promise(function (resolve, reject) {
    let dialogId = undefined;
    const _handleClose = () => {
      // Dismiss dialog
      uiDialogService.dismiss({
        id: dialogId
      });
      // Notify of cancel action
      resolve({
        action: CREATE_REPORT_DIALOG_RESPONSE.CANCEL,
        value: undefined,
        dataSourceName: undefined
      });
    };

    /**
     *
     * @param {string} param0.action - value of action performed
     * @param {string} param0.value - value from input field
     */
    const _handleFormSubmit = _ref2 => {
      let {
        action,
        value
      } = _ref2;
      uiDialogService.dismiss({
        id: dialogId
      });
      switch (action.id) {
        case 'save':
          resolve({
            action: CREATE_REPORT_DIALOG_RESPONSE.CREATE_REPORT,
            value: value.label,
            dataSourceName: value.dataSourceName
          });
          break;
        case 'cancel':
          resolve({
            action: CREATE_REPORT_DIALOG_RESPONSE.CANCEL,
            value: undefined,
            dataSourceName: undefined
          });
          break;
      }
    };
    const dataSourcesOpts = Object.keys(extensionManager.dataSourceMap).filter(ds => {
      const configuration = extensionManager.dataSourceDefs[ds]?.configuration;
      const supportsStow = configuration?.supportsStow ?? configuration?.wadoRoot;
      return supportsStow;
    }).map(ds => {
      return {
        value: ds,
        label: ds,
        placeHolder: ds
      };
    });
    dialogId = uiDialogService.create({
      centralize: true,
      isDraggable: false,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Dialog,
      useLastPosition: false,
      showOverlay: true,
      contentProps: {
        title: 'Create Report',
        value: {
          label: '',
          dataSourceName: extensionManager.activeDataSource
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
        body: _ref3 => {
          let {
            value,
            setValue
          } = _ref3;
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
                action: CREATE_REPORT_DIALOG_RESPONSE.CREATE_REPORT,
                value: value.label
              });
            }
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dataSourcesOpts.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
            closeMenuOnSelect: true,
            className: "mr-2 bg-black border-primary-main",
            options: dataSourcesOpts,
            placeholder: dataSourcesOpts.find(option => option.value === value.dataSourceName).placeHolder,
            value: value.dataSourceName,
            onChange: evt => {
              setValue(v => ({
                ...v,
                dataSourceName: evt.value
              }));
            },
            isClearable: false
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
            autoFocus: true,
            label: "Enter the report name",
            labelClassName: "text-white text-[14px] leading-[1.2]",
            className: "bg-black border-primary-main",
            type: "text",
            value: value.label,
            onChange: onChangeHandler,
            onKeyPress: onKeyPressHandler,
            required: true
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
  reactHotLoader.register(CREATE_REPORT_DIALOG_RESPONSE, "CREATE_REPORT_DIALOG_RESPONSE", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/createReportDialogPrompt.tsx");
  reactHotLoader.register(createReportDialogPrompt, "createReportDialogPrompt", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/createReportDialogPrompt.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/getImageSrcFromImageId.js":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/getImageSrcFromImageId.js ***!
  \************************************************************************/
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
  reactHotLoader.register(getImageSrcFromImageId, "getImageSrcFromImageId", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/getImageSrcFromImageId.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/getImageSrcFromImageId.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js ***!
  \***************************************************************************/
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
async function getStudiesForPatientByMRN(dataSource, qidoForStudyUID) {
  if (qidoForStudyUID && qidoForStudyUID.length && qidoForStudyUID[0].mrn) {
    return dataSource.query.studies.search({
      patientId: qidoForStudyUID[0].mrn
    });
  }
  console.log('No mrn found for', qidoForStudyUID);
  return qidoForStudyUID;
}
const _default = getStudiesForPatientByMRN;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getStudiesForPatientByMRN, "getStudiesForPatientByMRN", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/getStudiesForPatientByMRN.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/getStudiesForPatientByMRN.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Panels/index.js":
/*!*******************************************************!*\
  !*** ../../../extensions/default/src/Panels/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelMeasurementTable: () => (/* reexport safe */ _PanelMeasurementTable__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   PanelStudyBrowser: () => (/* reexport safe */ _PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   WrappedPanelStudyBrowser: () => (/* reexport safe */ _WrappedPanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelStudyBrowser */ "../../../extensions/default/src/Panels/PanelStudyBrowser.tsx");
/* harmony import */ var _WrappedPanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WrappedPanelStudyBrowser */ "../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx");
/* harmony import */ var _PanelMeasurementTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelMeasurementTable */ "../../../extensions/default/src/Panels/PanelMeasurementTable.tsx");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





/***/ }),

/***/ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js ***!
  \***********************************************************************************/
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
function requestDisplaySetCreationForStudy(dataSource, displaySetService, StudyInstanceUID, madeInClient) {
  // TODO: is this already short-circuited by the map of Retrieve promises?
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
  reactHotLoader.register(requestDisplaySetCreationForStudy, "requestDisplaySetCreationForStudy", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Toolbar/Toolbar.tsx":
/*!***********************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/Toolbar.tsx ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Toolbar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


function Toolbar(_ref) {
  let {
    servicesManager
  } = _ref;
  const {
    toolbarService
  } = servicesManager.services;
  const [toolbarButtons, setToolbarButtons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [buttonState, setButtonState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    primaryToolId: '',
    toggles: {},
    groups: {}
  });

  // Could track buttons and state separately...?
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe: unsub1
    } = toolbarService.subscribe(toolbarService.EVENTS.TOOL_BAR_MODIFIED, () => setToolbarButtons(toolbarService.getButtonSection('primary')));
    const {
      unsubscribe: unsub2
    } = toolbarService.subscribe(toolbarService.EVENTS.TOOL_BAR_STATE_MODIFIED, () => setButtonState({
      ...toolbarService.state
    }));
    return () => {
      unsub1();
      unsub2();
    };
  }, [toolbarService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toolbarButtons.map((toolDef, index) => {
    const {
      id,
      Component,
      componentProps
    } = toolDef;
    // TODO: ...

    // isActive if:
    // - id is primary?
    // - id is in list of "toggled on"?
    let isActive;
    if (componentProps.type === 'toggle') {
      isActive = buttonState.toggles[id];
    }
    // Also need... to filter list for splitButton, and set primary based on most recently clicked
    // Also need to kill the radioGroup button's magic logic
    // Everything should be reactive off these props, so commands can inform ToolbarService

    // These can... Trigger toolbar events based on updates?
    // Then sync using useEffect, or simply modify the state here?
    return (
      /*#__PURE__*/
      // The margin for separating the tools on the toolbar should go here and NOT in each individual component (button) item.
      // This allows for the individual items to be included in other UI components where perhaps alternative margins are desired.
      react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        key: id,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('mr-1')
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, _extends({
        id: id
      }, componentProps, {
        bState: buttonState,
        isActive: isActive,
        onInteraction: args => toolbarService.recordInteraction(args),
        servicesManager: servicesManager
      })))
    );
  }));
}
__signature__(Toolbar, "useState{[toolbarButtons, setToolbarButtons]([])}\nuseState{[buttonState, setButtonState]({\n    primaryToolId: '',\n    toggles: {},\n    groups: {},\n  })}\nuseEffect{}");
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Toolbar, "Toolbar", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Toolbar/Toolbar.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Toolbar/ToolbarDivider.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarDivider.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToolbarDivider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function ToolbarDivider() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "self-center w-4 h-8 mx-2 border-l border-common-dark"
  });
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ToolbarDivider, "ToolbarDivider", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Toolbar/ToolbarDivider.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx ***!
  \*************************************************************************/
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
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




function LayoutSelector(_ref) {
  let {
    rows,
    columns,
    className,
    servicesManager,
    ...rest
  } = _ref;
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    hangingProtocolService,
    toolbarService
  } = servicesManager.services;
  const closeOnOutsideClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(hangingProtocolService.EVENTS.PROTOCOL_CHANGED, evt => {
      const {
        protocol
      } = evt;
    });
    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.addEventListener('click', closeOnOutsideClick);
    return () => {
      window.removeEventListener('click', closeOnOutsideClick);
    };
  }, [isOpen]);
  const onInteractionHandler = () => setIsOpen(!isOpen);
  const DropdownContent = isOpen ? _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.LayoutSelector : null;
  const onSelectionHandler = props => {
    toolbarService.recordInteraction({
      interactionType: 'action',
      commands: [{
        commandName: 'setViewportGridLayout',
        commandOptions: {
          ...props
        },
        context: 'DEFAULT'
      }]
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    id: "Layout",
    label: "Grid Layout",
    icon: "tool-layout",
    onInteraction: onInteractionHandler,
    className: className,
    rounded: rest.rounded,
    dropdownContent: DropdownContent !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DropdownContent, {
      rows: rows,
      columns: columns,
      onSelection: onSelectionHandler
    }),
    isActive: isOpen,
    type: "toggle"
  });
}
__signature__(LayoutSelector, "useState{[isOpen, setIsOpen](false)}\nuseEffect{}\nuseEffect{}");
LayoutSelector.propTypes = {
  rows: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  columns: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  onLayoutChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_3__.ServicesManager)
};
LayoutSelector.defaultProps = {
  rows: 3,
  columns: 3,
  onLayoutChange: () => {}
};
const _default = LayoutSelector;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(LayoutSelector, "LayoutSelector", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/Toolbar/ToolbarSplitButton.tsx":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarSplitButton.tsx ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.SplitButton;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/Toolbar/ToolbarSplitButton.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/ViewerLayout/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/index.tsx ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "../node_modules/react-router/dist/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Toolbar/Toolbar */ "../../../extensions/default/src/Toolbar/Toolbar.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










const {
  availableLanguages,
  defaultLanguage,
  currentLanguage
} = _ohif_i18n__WEBPACK_IMPORTED_MODULE_6__["default"];
function ViewerLayout(_ref) {
  let {
    // From Extension Module Params
    extensionManager,
    servicesManager,
    hotkeysManager,
    commandsManager,
    // From Modes
    viewports,
    ViewportGridComp,
    leftPanels = [],
    rightPanels = [],
    leftPanelDefaultClosed = false,
    rightPanelDefaultClosed = false
  } = _ref;
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_8__.useAppConfig)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  const location = (0,react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation)();
  const onClickReturnButton = () => {
    const {
      pathname
    } = location;
    const dataSourceIdx = pathname.indexOf('/', 1);
    // const search =
    //   dataSourceIdx === -1
    //     ? undefined
    //     : `datasources=${pathname.substring(dataSourceIdx + 1)}`;

    // Todo: Handle parameters in a better way.
    const query = new URLSearchParams(window.location.search);
    const configUrl = query.get('configUrl');
    const searchQuery = new URLSearchParams();
    if (dataSourceIdx !== -1) {
      searchQuery.append('datasources', pathname.substring(dataSourceIdx + 1));
    }
    if (configUrl) {
      searchQuery.append('configUrl', configUrl);
    }
    navigate({
      pathname: '/',
      search: decodeURIComponent(searchQuery.toString())
    });
  };
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
  const {
    show,
    hide
  } = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useModal)();
  const [showLoadingIndicator, setShowLoadingIndicator] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(appConfig.showLoadingIndicator);
  const {
    hangingProtocolService
  } = servicesManager.services;
  const {
    hotkeyDefinitions,
    hotkeyDefaults
  } = hotkeysManager;
  const versionNumber = "3.6.0";
  const commitHash = "1d38fe30a490010c7de487c7a0b1a5bfe3bc75a4";
  const menuOptions = [{
    title: t('Header:About'),
    icon: 'info',
    onClick: () => show({
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.AboutModal,
      title: 'About OHIF Viewer',
      contentProps: {
        versionNumber,
        commitHash
      }
    })
  }, {
    title: t('Header:Preferences'),
    icon: 'settings',
    onClick: () => show({
      title: t('UserPreferencesModal:User Preferences'),
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.UserPreferences,
      contentProps: {
        hotkeyDefaults: hotkeysManager.getValidHotkeyDefinitions(hotkeyDefaults),
        hotkeyDefinitions,
        currentLanguage: currentLanguage(),
        availableLanguages,
        defaultLanguage,
        onCancel: () => {
          _ohif_core__WEBPACK_IMPORTED_MODULE_7__.hotkeys.stopRecord();
          _ohif_core__WEBPACK_IMPORTED_MODULE_7__.hotkeys.unpause();
          hide();
        },
        onSubmit: _ref2 => {
          let {
            hotkeyDefinitions,
            language
          } = _ref2;
          _ohif_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].changeLanguage(language.value);
          hotkeysManager.setHotkeys(hotkeyDefinitions);
          hide();
        },
        onReset: () => hotkeysManager.restoreDefaultBindings(),
        hotkeysModule: _ohif_core__WEBPACK_IMPORTED_MODULE_7__.hotkeys
      }
    })
  }];
  if (appConfig.oidc) {
    menuOptions.push({
      title: t('Header:Logout'),
      icon: 'power-off',
      onClick: async () => {
        navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
      }
    });
  }

  /**
   * Set body classes (tailwindcss) that don't allow vertical
   * or horizontal overflow (no scrolling). Also guarantee window
   * is sized to our viewport.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.classList.add('bg-black');
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  const getComponent = id => {
    const entry = extensionManager.getModuleEntry(id);
    if (!entry) {
      throw new Error(`${id} is not a valid entry for an extension module, please check your configuration or make sure the extension is registered.`);
    }
    let content;
    if (entry && entry.component) {
      content = entry.component;
    } else {
      throw new Error(`No component found from extension ${id}. Check the reference string to the extension in your Mode configuration`);
    }
    return {
      entry,
      content
    };
  };
  const getPanelData = id => {
    const {
      content,
      entry
    } = getComponent(id);
    return {
      id: entry.id,
      iconName: entry.iconName,
      iconLabel: entry.iconLabel,
      label: entry.label,
      name: entry.name,
      content
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_7__.HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
    // Todo: right now to set the loading indicator to false, we need to wait for the
    // hangingProtocolService to finish applying the viewport matching to each viewport,
    // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
    () => {
      setShowLoadingIndicator(false);
    });
    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);
  const getViewportComponentData = viewportComponent => {
    const {
      entry
    } = getComponent(viewportComponent.namespace);
    return {
      component: entry.component,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay
    };
  };
  const leftPanelComponents = leftPanels.map(getPanelData);
  const rightPanelComponents = rightPanels.map(getPanelData);
  const viewportComponents = viewports.map(getViewportComponentData);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.Header, {
    menuOptions: menuOptions,
    isReturnEnabled: !!appConfig.showStudyList,
    onClickReturnButton: onClickReturnButton,
    WhiteLabeling: appConfig.whiteLabeling
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.ErrorBoundary, {
    context: "Primary Toolbar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "relative flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_9__["default"], {
    servicesManager: servicesManager
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bg-black flex flex-row items-stretch w-full overflow-hidden flex-nowrap relative",
    style: {
      height: 'calc(100vh - 52px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showLoadingIndicator && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.LoadingIndicatorProgress, {
    className: "h-full w-full bg-black"
  }), leftPanelComponents.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.ErrorBoundary, {
    context: "Left Panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.SidePanel, {
    side: "left",
    activeTabIndex: leftPanelDefaultClosed ? null : 0,
    tabs: leftPanelComponents,
    servicesManager: servicesManager
  })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-col flex-1 h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex items-center justify-center flex-1 h-full overflow-hidden bg-black relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.ErrorBoundary, {
    context: "Grid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewportGridComp, {
    servicesManager: servicesManager,
    viewportComponents: viewportComponents,
    commandsManager: commandsManager
  })))), rightPanelComponents.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.ErrorBoundary, {
    context: "Right Panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.SidePanel, {
    side: "right",
    activeTabIndex: rightPanelDefaultClosed ? null : 0,
    tabs: rightPanelComponents,
    servicesManager: servicesManager
  })) : null)));
}
__signature__(ViewerLayout, "useAppConfig{[appConfig]}\nuseNavigate{navigate}\nuseLocation{location}\nuseTranslation{{ t }}\nuseModal{{ show, hide }}\nuseState{[showLoadingIndicator, setShowLoadingIndicator](appConfig.showLoadingIndicator)}\nuseEffect{}\nuseEffect{}", () => [_state__WEBPACK_IMPORTED_MODULE_8__.useAppConfig, react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate, react_router__WEBPACK_IMPORTED_MODULE_4__.useLocation, react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useModal]);
ViewerLayout.propTypes = {
  // From extension module params
  extensionManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    getModuleEntry: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }).isRequired,
  commandsManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_7__.CommandsManager),
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_7__.ServicesManager),
  // From modes
  leftPanels: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  rightPanels: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  leftPanelDefaultClosed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  rightPanelDefaultClosed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  /** Responsible for rendering our grid of viewports; provided by consuming application */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().node), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)]).isRequired
};
const _default = ViewerLayout;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(availableLanguages, "availableLanguages", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/ViewerLayout/index.tsx");
  reactHotLoader.register(defaultLanguage, "defaultLanguage", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/ViewerLayout/index.tsx");
  reactHotLoader.register(currentLanguage, "currentLanguage", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/ViewerLayout/index.tsx");
  reactHotLoader.register(ViewerLayout, "ViewerLayout", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/ViewerLayout/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/ViewerLayout/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/commandsModule.ts":
/*!*********************************************************!*\
  !*** ../../../extensions/default/src/commandsModule.ts ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomizableContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/index.ts");
/* harmony import */ var _DicomTagBrowser_DicomTagBrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DicomTagBrowser/DicomTagBrowser */ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
/* harmony import */ var _utils_reuseCachedLayouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/reuseCachedLayouts */ "../../../extensions/default/src/utils/reuseCachedLayouts.ts");
/* harmony import */ var _findViewportsByPosition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findViewportsByPosition */ "../../../extensions/default/src/findViewportsByPosition.ts");
/* harmony import */ var _ohif_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/app */ "./index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const {
  subscribeToNextViewportGridChange
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
/**
 * Determine if a command is a hanging protocol one.
 * For now, just use the two hanging protocol commands that are in this
 * commands module, but if others get added elsewhere this may need enhancing.
 */
const isHangingProtocolCommand = command => command && (command.commandName === 'setHangingProtocol' || command.commandName === 'toggleHangingProtocol');
const commandsModule = _ref => {
  let {
    servicesManager,
    commandsManager
  } = _ref;
  const {
    customizationService,
    measurementService,
    hangingProtocolService,
    uiNotificationService,
    viewportGridService,
    displaySetService,
    stateSyncService,
    toolbarService
  } = servicesManager.services;

  // Define a context menu controller for use with any context menus
  const contextMenuController = new _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_1__.ContextMenuController(servicesManager, commandsManager);
  const actions = {
    /**
     * Show the context menu.
     * @param options.menuId defines the menu name to lookup, from customizationService
     * @param options.defaultMenu contains the default menu set to use
     * @param options.element is the element to show the menu within
     * @param options.event is the event that caused the context menu
     * @param options.selectorProps is the set of selection properties to use
     */
    showContextMenu: options => {
      const {
        menuCustomizationId,
        element,
        event,
        selectorProps,
        defaultPointsPosition = []
      } = options;
      const optionsToUse = {
        ...options
      };
      if (menuCustomizationId) {
        Object.assign(optionsToUse, customizationService.get(menuCustomizationId, _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_1__.defaultContextMenu));
      }

      // TODO - make the selectorProps richer by including the study metadata and display set.
      const {
        protocol,
        stage
      } = hangingProtocolService.getActiveProtocol();
      optionsToUse.selectorProps = {
        event,
        protocol,
        stage,
        ...selectorProps
      };
      contextMenuController.showContextMenu(optionsToUse, element, defaultPointsPosition);
    },
    /** Close a context menu currently displayed */
    closeContextMenu: () => {
      contextMenuController.closeContextMenu();
    },
    displayNotification: _ref2 => {
      let {
        text,
        title,
        type
      } = _ref2;
      uiNotificationService.show({
        title: title,
        message: text,
        type: type
      });
    },
    clearMeasurements: () => {
      measurementService.clear();
    },
    /**
     * Toggles off all tools which contain a commandName of setHangingProtocol
     * or toggleHangingProtocol, and which match/don't match the protocol id/stage
     */
    toggleHpTools: () => {
      const {
        protocol,
        stageIndex: toggleStageIndex,
        stage
      } = hangingProtocolService.getActiveProtocol();
      const enableListener = button => {
        if (!button.id) return;
        const {
          commands,
          items
        } = button.props || button;
        if (items) {
          items.forEach(enableListener);
        }
        const hpCommand = commands?.find?.(isHangingProtocolCommand);
        if (!hpCommand) return;
        const {
          protocolId,
          stageIndex,
          stageId
        } = hpCommand.commandOptions;
        const isActive = (!protocolId || protocolId === protocol.id) && (stageIndex === undefined || stageIndex === toggleStageIndex) && (!stageId || stageId === stage.id);
        toolbarService.setActive(button.id, isActive);
      };
      Object.values(toolbarService.getButtons()).forEach(enableListener);
    },
    /**
     *  Sets the specified protocol
     *    1. Records any existing state using the viewport grid service
     *    2. Finds the destination state - this can be one of:
     *       a. The specified protocol stage
     *       b. An alternate (toggled or restored) protocol stage
     *       c. A restored custom layout
     *    3. Finds the parameters for the specified state
     *       a. Gets the displaySetSelectorMap
     *       b. Gets the map by position
     *       c. Gets any toggle mapping to map position to/from current view
     *    4. If restore, then sets layout
     *       a. Maps viewport position by currently displayed viewport map id
     *       b. Uses toggle information to map display set id
     *    5. Else applies the hanging protocol
     *       a. HP Service is provided displaySetSelectorMap
     *       b. HP Service will throw an exception if it isn't applicable
     * @param options - contains information on the HP to apply
     * @param options.activeStudyUID - the updated study to apply the HP to
     * @param options.protocolId - the protocol ID to change to
     * @param options.stageId - the stageId to apply
     * @param options.stageIndex - the index of the stage to go to.
     * @param options.reset - flag to indicate if the HP should be reset to its original and not restored to a previous state
     */
    setHangingProtocol: _ref3 => {
      let {
        activeStudyUID = '',
        protocolId,
        stageId,
        stageIndex,
        reset = false
      } = _ref3;
      try {
        // Stores in the state the display set selector id to displaySetUID mapping
        // Pass in viewportId for the active viewport.  This item will get set as
        // the activeViewportId
        const state = viewportGridService.getState();
        const hpInfo = hangingProtocolService.getState();
        const {
          protocol: oldProtocol
        } = hangingProtocolService.getActiveProtocol();
        const stateSyncReduce = (0,_utils_reuseCachedLayouts__WEBPACK_IMPORTED_MODULE_3__["default"])(state, hangingProtocolService, stateSyncService);
        const {
          hangingProtocolStageIndexMap,
          viewportGridStore,
          displaySetSelectorMap
        } = stateSyncReduce;
        if (!protocolId) {
          // Re-use the previous protocol id, and optionally stage
          protocolId = hpInfo.protocolId;
          if (stageId === undefined && stageIndex === undefined) {
            stageIndex = hpInfo.stageIndex;
          }
        } else if (stageIndex === undefined && stageId === undefined) {
          // Re-set the same stage as was previously used
          const hangingId = `${activeStudyUID || hpInfo.activeStudyUID}:${protocolId}`;
          stageIndex = hangingProtocolStageIndexMap[hangingId]?.stageIndex;
        }
        const useStageIdx = stageIndex ?? hangingProtocolService.getStageIndex(protocolId, {
          stageId,
          stageIndex
        });
        if (activeStudyUID) {
          hangingProtocolService.setActiveStudyUID(activeStudyUID);
        }
        const storedHanging = `${hangingProtocolService.getState().activeStudyUID}:${protocolId}:${useStageIdx || 0}`;
        const restoreProtocol = !reset && viewportGridStore[storedHanging];
        if (protocolId === hpInfo.protocolId && useStageIdx === hpInfo.stageIndex && !activeStudyUID) {
          // Clear the HP setting to reset them
          hangingProtocolService.setProtocol(protocolId, {
            stageId,
            stageIndex: useStageIdx
          });
        } else {
          hangingProtocolService.setProtocol(protocolId, {
            displaySetSelectorMap,
            stageId,
            stageIndex: useStageIdx,
            restoreProtocol
          });
          if (restoreProtocol) {
            viewportGridService.set(viewportGridStore[storedHanging]);
          }
        }
        // Do this after successfully applying the update
        // Note, don't store the active display set - it is only needed while
        // changing display sets.  This causes jump to measurement to fail on
        // multi-study display.
        delete displaySetSelectorMap[`${activeStudyUID || hpInfo.activeStudyUID}:activeDisplaySet:0`];
        stateSyncService.store(stateSyncReduce);
        // This is a default action applied
        actions.toggleHpTools(hangingProtocolService.getActiveProtocol());
        // Send the notification about updating the state
        if (protocolId !== hpInfo.protocolId) {
          const {
            protocol
          } = hangingProtocolService.getActiveProtocol();
          // The old protocol callbacks are used for turning off things
          // like crosshairs when moving to the new HP
          commandsManager.run(oldProtocol.callbacks?.onProtocolExit);
          // The new protocol callback is used for things like
          // activating modes etc.
          commandsManager.run(protocol.callbacks?.onProtocolEnter);
        }
        return true;
      } catch (e) {
        actions.toggleHpTools(hangingProtocolService.getActiveProtocol());
        uiNotificationService.show({
          title: 'Apply Hanging Protocol',
          message: 'The hanging protocol could not be applied.',
          type: 'error',
          duration: 3000
        });
        return false;
      }
    },
    toggleHangingProtocol: _ref4 => {
      let {
        protocolId,
        stageIndex
      } = _ref4;
      const {
        protocol,
        stageIndex: desiredStageIndex,
        activeStudy
      } = hangingProtocolService.getActiveProtocol();
      const {
        toggleHangingProtocol
      } = stateSyncService.getState();
      const storedHanging = `${activeStudy.StudyInstanceUID}:${protocolId}:${stageIndex | 0}`;
      if (protocol.id === protocolId && (stageIndex === undefined || stageIndex === desiredStageIndex)) {
        // Toggling off - restore to previous state
        const previousState = toggleHangingProtocol[storedHanging] || {
          protocolId: 'default'
        };
        return actions.setHangingProtocol(previousState);
      } else {
        stateSyncService.store({
          toggleHangingProtocol: {
            ...toggleHangingProtocol,
            [storedHanging]: {
              protocolId: protocol.id,
              stageIndex: desiredStageIndex
            }
          }
        });
        return actions.setHangingProtocol({
          protocolId,
          stageIndex,
          reset: true
        });
      }
    },
    deltaStage: _ref5 => {
      let {
        direction
      } = _ref5;
      const {
        protocolId,
        stageIndex: oldStageIndex
      } = hangingProtocolService.getState();
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      for (let stageIndex = oldStageIndex + direction; stageIndex >= 0 && stageIndex < protocol.stages.length; stageIndex += direction) {
        if (protocol.stages[stageIndex].status !== 'disabled') {
          return actions.setHangingProtocol({
            protocolId,
            stageIndex
          });
        }
      }
      uiNotificationService.show({
        title: 'Change Stage',
        message: 'The hanging protocol has no more applicable stages',
        type: 'info',
        duration: 3000
      });
    },
    /**
     * Changes the viewport grid layout in terms of the MxN layout.
     */
    setViewportGridLayout: _ref6 => {
      let {
        numRows,
        numCols
      } = _ref6;
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      const onLayoutChange = protocol.callbacks?.onLayoutChange;
      if (commandsManager.run(onLayoutChange, {
        numRows,
        numCols
      }) === false) {
        console.log('setViewportGridLayout running', onLayoutChange, numRows, numCols);
        // Don't apply the layout if the run command returns false
        return;
      }
      const completeLayout = () => {
        const state = viewportGridService.getState();
        const stateReduce = (0,_findViewportsByPosition__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
          numRows,
          numCols
        }, stateSyncService);
        const findOrCreateViewport = _findViewportsByPosition__WEBPACK_IMPORTED_MODULE_4__.findOrCreateViewport.bind(null, hangingProtocolService, stateReduce.viewportsByPosition);
        viewportGridService.setLayout({
          numRows,
          numCols,
          findOrCreateViewport
        });
        stateSyncService.store(stateReduce);
      };
      // Need to finish any work in the callback
      window.setTimeout(completeLayout, 0);
    },
    toggleOneUp() {
      const viewportGridState = viewportGridService.getState();
      const {
        activeViewportIndex,
        viewports,
        layout
      } = viewportGridState;
      const {
        displaySetInstanceUIDs,
        displaySetOptions,
        viewportOptions
      } = viewports[activeViewportIndex];
      if (layout.numCols === 1 && layout.numRows === 1) {
        // The viewer is in one-up. Check if there is a state to restore/toggle back to.
        const {
          toggleOneUpViewportGridStore
        } = stateSyncService.getState();
        if (!toggleOneUpViewportGridStore.layout) {
          return;
        }
        // There is a state to toggle back to. The viewport that was
        // originally toggled to one up was the former active viewport.
        const viewportIndexToUpdate = toggleOneUpViewportGridStore.activeViewportIndex;

        // Determine which viewports need to be updated. This is particularly
        // important when MPR is toggled to one up and a different reconstructable
        // is swapped in. Note that currently HangingProtocolService.getViewportsRequireUpdate
        // does not support viewport with multiple display sets.
        const updatedViewports = displaySetInstanceUIDs.length > 1 ? [] : displaySetInstanceUIDs.map(displaySetInstanceUID => hangingProtocolService.getViewportsRequireUpdate(viewportIndexToUpdate, displaySetInstanceUID)).flat();

        // This findOrCreateViewport returns either one of the updatedViewports
        // returned from the HP service OR if there is not one from the HP service then
        // simply returns what was in the previous state.
        const findOrCreateViewport = viewportIndex => {
          const viewport = updatedViewports.find(viewport => viewport.viewportIndex === viewportIndex);
          return viewport ? {
            viewportOptions,
            displaySetOptions,
            ...viewport
          } : toggleOneUpViewportGridStore.viewports[viewportIndex];
        };
        const layoutOptions = viewportGridService.getLayoutOptionsFromState(toggleOneUpViewportGridStore);

        // Restore the previous layout including the active viewport.
        viewportGridService.setLayout({
          numRows: toggleOneUpViewportGridStore.layout.numRows,
          numCols: toggleOneUpViewportGridStore.layout.numCols,
          activeViewportIndex: viewportIndexToUpdate,
          layoutOptions,
          findOrCreateViewport
        });
      } else {
        // We are not in one-up, so toggle to one up.

        // Store the current viewport grid state so we can toggle it back later.
        stateSyncService.store({
          toggleOneUpViewportGridStore: viewportGridState
        });

        // This findOrCreateViewport only return one viewport - the active
        // one being toggled to one up.
        const findOrCreateViewport = () => {
          return {
            displaySetInstanceUIDs,
            displaySetOptions,
            viewportOptions
          };
        };

        // Set the layout to be 1x1/one-up.
        viewportGridService.setLayout({
          numRows: 1,
          numCols: 1,
          findOrCreateViewport
        });

        // Subscribe to ANY (i.e. manual and hanging protocol) layout changes so that
        // any grid layout state to toggle to from one up is cleared. This is performed on
        // a timeout to avoid clearing the state for the actual to one up change.
        // Whenever the next layout change event is fired, the subscriptions are unsubscribed.
        const clearToggleOneUpViewportGridStore = () => {
          const toggleOneUpViewportGridStore = {};
          stateSyncService.store({
            toggleOneUpViewportGridStore
          });
        };
        subscribeToNextViewportGridChange(viewportGridService, clearToggleOneUpViewportGridStore);
      }
    },
    /**
     * Exposes the browser history navigation used by OHIF. This command can be used to either replace or
     * push a new entry into the browser history. For example, the following will replace the current
     * browser history entry with the specified relative URL which changes the study displayed to the
     * study with study instance UID 1.2.3. Note that as a result of using `options.replace = true`, the
     * page prior to invoking this command cannot be returned to via the browser back button.
     *
     * navigateHistory({
     *   to: 'viewer?StudyInstanceUIDs=1.2.3',
     *   options: { replace: true },
     * });
     *
     * @param historyArgs - arguments for the history function;
     *                      the `to` property is the URL;
     *                      the `options.replace` is a boolean indicating if the current browser history entry
     *                      should be replaced or a new entry pushed onto the history (stack); the default value
     *                      for `replace` is false
     */
    navigateHistory(historyArgs) {
      _ohif_app__WEBPACK_IMPORTED_MODULE_5__.history.navigate(historyArgs.to, historyArgs.options);
    },
    openDICOMTagViewer() {
      const {
        activeViewportIndex,
        viewports
      } = viewportGridService.getState();
      const activeViewportSpecificData = viewports[activeViewportIndex];
      const {
        displaySetInstanceUIDs
      } = activeViewportSpecificData;
      const displaySets = displaySetService.activeDisplaySets;
      const {
        UIModalService
      } = servicesManager.services;
      const displaySetInstanceUID = displaySetInstanceUIDs[0];
      UIModalService.show({
        content: _DicomTagBrowser_DicomTagBrowser__WEBPACK_IMPORTED_MODULE_2__["default"],
        contentProps: {
          displaySets,
          displaySetInstanceUID,
          onClose: UIModalService.hide
        },
        title: 'DICOM Tag Browser'
      });
    },
    /**
     * Toggle viewport overlay (the information panel shown on the four corners
     * of the viewport)
     * @see ViewportOverlay and CustomizableViewportOverlay components
     */
    toggleOverlays: () => {
      const overlays = document.getElementsByClassName('viewport-overlay');
      for (let i = 0; i < overlays.length; i++) {
        overlays.item(i).classList.toggle('hidden');
      }
    },
    scrollActiveThumbnailIntoView: () => {
      const {
        activeViewportIndex,
        viewports
      } = viewportGridService.getState();
      if (!viewports || activeViewportIndex < 0 || activeViewportIndex > viewports.length - 1) {
        return;
      }
      const activeViewport = viewports[activeViewportIndex];
      const activeDisplaySetInstanceUID = activeViewport.displaySetInstanceUIDs[0];
      const thumbnailList = document.querySelector('#ohif-thumbnail-list');
      if (!thumbnailList) {
        return;
      }
      const thumbnailListBounds = thumbnailList.getBoundingClientRect();
      const thumbnail = document.querySelector(`#thumbnail-${activeDisplaySetInstanceUID}`);
      if (!thumbnail) {
        return;
      }
      const thumbnailBounds = thumbnail.getBoundingClientRect();

      // This only handles a vertical thumbnail list.
      if (thumbnailBounds.top >= thumbnailListBounds.top && thumbnailBounds.top <= thumbnailListBounds.bottom) {
        return;
      }
      thumbnail.scrollIntoView({
        behavior: 'smooth'
      });
    },
    updateViewportDisplaySet: _ref7 => {
      let {
        direction,
        excludeNonImageModalities
      } = _ref7;
      const nonImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];

      // Sort the display sets as per the hanging protocol service viewport/display set scoring system.
      // The thumbnail list uses the same sorting.
      const dsSortFn = hangingProtocolService.getDisplaySetSortFunction();
      const currentDisplaySets = [...displaySetService.activeDisplaySets];
      currentDisplaySets.sort(dsSortFn);
      const {
        activeViewportIndex,
        viewports
      } = viewportGridService.getState();
      const {
        displaySetInstanceUIDs
      } = viewports[activeViewportIndex];
      const activeDisplaySetIndex = currentDisplaySets.findIndex(displaySet => displaySetInstanceUIDs.includes(displaySet.displaySetInstanceUID));
      let displaySetIndexToShow;
      for (displaySetIndexToShow = activeDisplaySetIndex + direction; displaySetIndexToShow > -1 && displaySetIndexToShow < currentDisplaySets.length; displaySetIndexToShow += direction) {
        if (!excludeNonImageModalities || !nonImageModalities.includes(currentDisplaySets[displaySetIndexToShow].Modality)) {
          break;
        }
      }
      if (displaySetIndexToShow < 0 || displaySetIndexToShow >= currentDisplaySets.length) {
        return;
      }
      const {
        displaySetInstanceUID
      } = currentDisplaySets[displaySetIndexToShow];
      let updatedViewports = [];
      try {
        updatedViewports = hangingProtocolService.getViewportsRequireUpdate(activeViewportIndex, displaySetInstanceUID);
      } catch (error) {
        console.warn(error);
        uiNotificationService.show({
          title: 'Navigate Viewport Display Set',
          message: 'The requested display sets could not be added to the viewport due to a mismatch in the Hanging Protocol rules.',
          type: 'info',
          duration: 3000
        });
      }
      viewportGridService.setDisplaySetsForViewports(updatedViewports);
      setTimeout(() => actions.scrollActiveThumbnailIntoView(), 0);
    }
  };
  const definitions = {
    showContextMenu: {
      commandFn: actions.showContextMenu
    },
    closeContextMenu: {
      commandFn: actions.closeContextMenu
    },
    clearMeasurements: {
      commandFn: actions.clearMeasurements,
      storeContexts: [],
      options: {}
    },
    displayNotification: {
      commandFn: actions.displayNotification,
      storeContexts: [],
      options: {}
    },
    setHangingProtocol: {
      commandFn: actions.setHangingProtocol,
      storeContexts: [],
      options: {}
    },
    toggleHangingProtocol: {
      commandFn: actions.toggleHangingProtocol,
      storeContexts: [],
      options: {}
    },
    navigateHistory: {
      commandFn: actions.navigateHistory,
      storeContexts: [],
      options: {}
    },
    nextStage: {
      commandFn: actions.deltaStage,
      storeContexts: [],
      options: {
        direction: 1
      }
    },
    previousStage: {
      commandFn: actions.deltaStage,
      storeContexts: [],
      options: {
        direction: -1
      }
    },
    setViewportGridLayout: {
      commandFn: actions.setViewportGridLayout,
      storeContexts: [],
      options: {}
    },
    toggleOneUp: {
      commandFn: actions.toggleOneUp,
      storeContexts: [],
      options: {}
    },
    openDICOMTagViewer: {
      commandFn: actions.openDICOMTagViewer
    },
    updateViewportDisplaySet: {
      commandFn: actions.updateViewportDisplaySet,
      storeContexts: [],
      options: {}
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT'
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
  reactHotLoader.register(subscribeToNextViewportGridChange, "subscribeToNextViewportGridChange", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/commandsModule.ts");
  reactHotLoader.register(isHangingProtocolCommand, "isHangingProtocolCommand", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/commandsModule.ts");
  reactHotLoader.register(commandsModule, "commandsModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/commandsModule.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/commandsModule.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/findViewportsByPosition.ts":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/findViewportsByPosition.ts ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findOrCreateViewport: () => (/* binding */ findOrCreateViewport)
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
 * This find or create viewport is paired with the reduce results from
 * below, and the action of this viewport is to look for previously filled
 * viewports, and to re-use by position id.  If there is no filled viewport,
 * then one can be re-used from the display set if it isn't going to be displayed.
 * @param hangingProtocolService - bound parameter supplied before using this
 * @param viewportsByPosition - bound parameter supplied before using this
 * @param viewportIndex - the index to retrieve
 * @param positionId - the current position on screen to retrieve
 * @param options - the set of options used, so that subsequent calls can
 *                  store state that is reset by the setLayout.
 *                  This class uses the options to store the already viewed
 *                  display sets, filling it initially with the pre-existing viewports.
 */
const findOrCreateViewport = (hangingProtocolService, viewportsByPosition, viewportIndex, positionId, options) => {
  const byPositionViewport = viewportsByPosition?.[positionId];
  if (byPositionViewport) return {
    ...byPositionViewport
  };
  const {
    protocolId,
    stageIndex
  } = hangingProtocolService.getState();

  // Setup the initial in display correctly for initial view/select
  if (!options.inDisplay) {
    options.inDisplay = [...viewportsByPosition.initialInDisplay];
  }
  // See if there is a default viewport for new views.
  const missing = hangingProtocolService.getMissingViewport(protocolId, stageIndex, options);
  if (missing) {
    const displaySetInstanceUIDs = missing.displaySetsInfo.map(it => it.displaySetInstanceUID);
    options.inDisplay.push(...displaySetInstanceUIDs);
    return {
      displaySetInstanceUIDs,
      displaySetOptions: missing.displaySetsInfo.map(it => it.displaySetOptions),
      viewportOptions: {
        ...missing.viewportOptions
      }
    };
  }
  return {};
};

/**
 * Records the information on what viewports are displayed in which position.
 * Also records what instances from the existing positions are going to be in
 * view initially.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const findViewportsByPosition = (state, _ref, syncService) => {
  let {
    numRows,
    numCols
  } = _ref;
  const {
    viewports
  } = state;
  const syncState = syncService.getState();
  const viewportsByPosition = {
    ...syncState.viewportsByPosition
  };
  const initialInDisplay = [];
  for (const viewport of viewports) {
    if (viewport.positionId) {
      const storedViewport = {
        ...viewport,
        viewportOptions: {
          ...viewport.viewportOptions
        }
      };
      viewportsByPosition[viewport.positionId] = storedViewport;
      // The cache doesn't store the viewport options - it is only useful
      // for remembering the type of viewport and UIDs
      delete storedViewport.viewportId;
      delete storedViewport.viewportOptions.viewportId;
    }
  }
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const pos = col + row * numCols;
      const positionId = viewports?.[pos]?.positionId || `${col}-${row}`;
      const viewport = viewportsByPosition[positionId];
      if (viewport?.displaySetInstanceUIDs) {
        initialInDisplay.push(...viewport.displaySetInstanceUIDs);
      }
    }
  }

  // Store the initially displayed elements
  viewportsByPosition.initialInDisplay = initialInDisplay;
  return {
    viewportsByPosition
  };
};
const _default = findViewportsByPosition;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(findOrCreateViewport, "findOrCreateViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/findViewportsByPosition.ts");
  reactHotLoader.register(findViewportsByPosition, "findViewportsByPosition", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/findViewportsByPosition.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/findViewportsByPosition.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getCustomizationModule.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/getCustomizationModule.tsx ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _Panels_DataSourceSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels/DataSourceSelector */ "../../../extensions/default/src/Panels/DataSourceSelector.tsx");
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
 * Note: this is an example of how the customization module can be used
 * using the customization module. Below, we are adding a new custom route
 * to the application at the path /custom and rendering a custom component
 * Real world use cases of the having a custom route would be to add a
 * custom page for the user to view their profile, or to add a custom
 * page for login etc.
 */
function getCustomizationModule() {
  return [{
    name: 'helloPage',
    value: {
      id: 'customRoutes',
      routes: [{
        path: '/custom',
        children: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {
          style: {
            color: 'white'
          }
        }, "Hello Custom Route")
      }]
    }
  },
  // Example customization to list a set of datasources
  {
    name: 'datasources',
    value: {
      id: 'customRoutes',
      routes: [{
        path: '/datasources',
        children: _Panels_DataSourceSelector__WEBPACK_IMPORTED_MODULE_1__["default"]
      }]
    }
  }, {
    name: 'default',
    value: [
    /**
     * Customization Component Type definition for overlay items.
     * Overlay items are texts (or other components) that will be displayed
     * on a Viewport Overlay, which contains the information panels on the
     * four corners of a viewport.
     *
     * @definition of a overlay item using this type
     * The value to be displayed is defined by
     *  - setting DICOM image instance's property to this field,
     *  - or defining contentF()
     *
     * {
     *   id: string - unique id for the overlay item
     *   customizationType: string - indicates customization type definition to this
     *   label: string - Label, to be displayed for the item
     *   title: string - Tooltip, for the item
     *   color: string - Color of the text
     *   condition: ({ instance }) => boolean - decides whether to display the overlay item or not
     *   attribute: string - property name of the DICOM image instance
     *   contentF: ({ instance, formatters }) => string | component,
     * }
     *
     * @example
     *  {
     *    id: 'PatientNameOverlay',
     *    customizationType: 'ohif.overlayItem',
     *    label: 'PN:',
     *    title: 'Patient Name',
     *    color: 'yellow',
     *    condition: ({ instance }) => instance && instance.PatientName && instance.PatientName.Alphabetic,
     *    attribute: 'PatientName',
     *    contentF: ({ instance, formatters: { formatPN } }) => `${formatPN(instance.PatientName.Alphabetic)} ${(instance.PatientSex ? '(' + instance.PatientSex + ')' : '')}`,
     *  },
     *
     * @see CustomizableViewportOverlay
     */
    {
      id: 'ohif.overlayItem',
      content: function (props) {
        if (this.condition && !this.condition(props)) return null;
        const {
          instance
        } = props;
        const value = instance && this.attribute ? instance[this.attribute] : this.contentF && typeof this.contentF === 'function' ? this.contentF(props) : null;
        if (!value) return null;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "overlay-item flex flex-row",
          style: {
            color: this.color || undefined
          },
          title: this.title || ''
        }, this.label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "mr-1 shrink-0"
        }, this.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "font-light"
        }, value));
      }
    }, {
      id: 'ohif.contextMenu',
      /** Applies the customizationType to all the menu items.
       * This function clones the object and child objects to prevent
       * changes to the original customization object.
       */
      transform: function (customizationService) {
        // Don't modify the children, as those are copied by reference
        const clonedObject = {
          ...this
        };
        clonedObject.menus = this.menus.map(menu => ({
          ...menu
        }));
        for (const menu of clonedObject.menus) {
          const {
            items: originalItems
          } = menu;
          menu.items = [];
          for (const item of originalItems) {
            menu.items.push(customizationService.transform(item));
          }
        }
        return clonedObject;
      }
    }]
  }];
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getCustomizationModule, "getCustomizationModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getCustomizationModule.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getDataSourcesModule.js":
/*!***************************************************************!*\
  !*** ../../../extensions/default/src/getDataSourcesModule.js ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DicomWebDataSource_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DicomWebDataSource/index.js */ "../../../extensions/default/src/DicomWebDataSource/index.js");
/* harmony import */ var _DicomJSONDataSource_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DicomJSONDataSource/index.js */ "../../../extensions/default/src/DicomJSONDataSource/index.js");
/* harmony import */ var _DicomLocalDataSource_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DicomLocalDataSource/index.js */ "../../../extensions/default/src/DicomLocalDataSource/index.js");
/* harmony import */ var _DicomWebProxyDataSource_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DicomWebProxyDataSource/index.js */ "../../../extensions/default/src/DicomWebProxyDataSource/index.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
// TODO: Pull in IWebClientApi from @ohif/core
// TODO: Use constructor to create an instance of IWebClientApi
// TODO: Use existing DICOMWeb configuration (previously, appConfig, to configure instance)






/**
 *
 */
function getDataSourcesModule() {
  return [{
    name: 'dicomweb',
    type: 'webApi',
    createDataSource: _DicomWebDataSource_index_js__WEBPACK_IMPORTED_MODULE_0__.createDicomWebApi
  }, {
    name: 'dicomwebproxy',
    type: 'webApi',
    createDataSource: _DicomWebProxyDataSource_index_js__WEBPACK_IMPORTED_MODULE_3__.createDicomWebProxyApi
  }, {
    name: 'dicomjson',
    type: 'jsonApi',
    createDataSource: _DicomJSONDataSource_index_js__WEBPACK_IMPORTED_MODULE_1__.createDicomJSONApi
  }, {
    name: 'dicomlocal',
    type: 'localApi',
    createDataSource: _DicomLocalDataSource_index_js__WEBPACK_IMPORTED_MODULE_2__.createDicomLocalApi
  }];
}
const _default = getDataSourcesModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getDataSourcesModule, "getDataSourcesModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getDataSourcesModule.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getDataSourcesModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getHangingProtocolModule.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/getHangingProtocolModule.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hpMNGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hpMNGrid */ "../../../extensions/default/src/hpMNGrid.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const defaultProtocol = {
  id: 'default',
  locked: true,
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  hasUpdatedPriorsInformation: false,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
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
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    defaultDisplaySetId: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
      // Try to match series with images by default, to prevent weird display
      // on SEG/SR containing studies
      {
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
      // Can be used to select matching studies
      // studyMatchingRules: [],
    }
  },

  stages: [{
    name: 'default',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        viewportType: 'stack',
        toolGroupId: 'default',
        // This will specify the initial image options index if it matches in the URL
        // and will otherwise not specify anything.
        initialImageOptions: {
          custom: 'sopInstanceLocation'
        }
        // Other options for initialImageOptions, which can be included in the default
        // custom attribute, or can be provided directly.
        //   index: 180,
        //   preset: 'middle', // 'first', 'last', 'middle'
        // },
      },

      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }],
    createdDate: '2021-02-23T18:32:42.850Z'
  }]
};
function getHangingProtocolModule() {
  return [{
    name: defaultProtocol.id,
    protocol: defaultProtocol
  },
  // Create a MxN hanging protocol available by default
  {
    name: _hpMNGrid__WEBPACK_IMPORTED_MODULE_0__["default"].id,
    protocol: _hpMNGrid__WEBPACK_IMPORTED_MODULE_0__["default"]
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
  reactHotLoader.register(defaultProtocol, "defaultProtocol", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getHangingProtocolModule.js");
  reactHotLoader.register(getHangingProtocolModule, "getHangingProtocolModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getHangingProtocolModule.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getHangingProtocolModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getLayoutTemplateModule.js":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/getLayoutTemplateModule.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewerLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerLayout */ "../../../extensions/default/src/ViewerLayout/index.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/*
- Define layout for the viewer in mode configuration.
- Pass in the viewport types that can populate the viewer.
- Init layout based on the displaySets and the objects.
*/
const _default = function (_ref) {
  let {
    servicesManager,
    extensionManager,
    commandsManager,
    hotkeysManager
  } = _ref;
  function ViewerLayoutWithServices(props) {
    return (0,_ViewerLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props
    });
  }
  return [
  // Layout Template Definition
  // TODO: this is weird naming
  {
    name: 'viewerLayout',
    id: 'viewerLayout',
    component: ViewerLayoutWithServices
  }];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getLayoutTemplateModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getPTImageIdInstanceMetadata.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/default/src/getPTImageIdInstanceMetadata.ts ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPTImageIdInstanceMetadata),
/* harmony export */   getPTImageIdInstanceMetadata: () => (/* binding */ getPTImageIdInstanceMetadata)
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

const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
function getPTImageIdInstanceMetadata(imageId) {
  const dicomMetaData = metadataProvider.get('instance', imageId);
  if (!dicomMetaData) {
    throw new Error('dicom metadata are required');
  }
  if (dicomMetaData.SeriesDate === undefined || dicomMetaData.SeriesTime === undefined || dicomMetaData.PatientWeight === undefined || dicomMetaData.CorrectedImage === undefined || dicomMetaData.Units === undefined || !dicomMetaData.RadiopharmaceuticalInformationSequence || dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadionuclideHalfLife === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadionuclideTotalDose === undefined || dicomMetaData.DecayCorrection === undefined || dicomMetaData.AcquisitionDate === undefined || dicomMetaData.AcquisitionTime === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartDateTime === undefined && dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartTime === undefined) {
    throw new Error('required metadata are missing');
  }
  const instanceMetadata = {
    CorrectedImage: dicomMetaData.CorrectedImage,
    Units: dicomMetaData.Units,
    RadionuclideHalfLife: dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadionuclideHalfLife,
    RadionuclideTotalDose: dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadionuclideTotalDose,
    RadiopharmaceuticalStartDateTime: dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartDateTime,
    RadiopharmaceuticalStartTime: dicomMetaData.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartTime,
    DecayCorrection: dicomMetaData.DecayCorrection,
    PatientWeight: dicomMetaData.PatientWeight,
    SeriesDate: dicomMetaData.SeriesDate,
    SeriesTime: dicomMetaData.SeriesTime,
    AcquisitionDate: dicomMetaData.AcquisitionDate,
    AcquisitionTime: dicomMetaData.AcquisitionTime
  };
  if (dicomMetaData['70531000'] || dicomMetaData['70531000'] !== undefined || dicomMetaData['70531009'] || dicomMetaData['70531009'] !== undefined) {
    const philipsPETPrivateGroup = {
      SUVScaleFactor: dicomMetaData['70531000'],
      ActivityConcentrationScaleFactor: dicomMetaData['70531009']
    };
    instanceMetadata.PhilipsPETPrivateGroup = philipsPETPrivateGroup;
  }
  if (dicomMetaData['0009100d'] && dicomMetaData['0009100d'] !== undefined) {
    instanceMetadata.GEPrivatePostInjectionDateTime = dicomMetaData['0009100d'];
  }
  if (dicomMetaData.FrameReferenceTime && dicomMetaData.FrameReferenceTime !== undefined) {
    instanceMetadata.FrameReferenceTime = dicomMetaData.FrameReferenceTime;
  }
  if (dicomMetaData.ActualFrameDuration && dicomMetaData.ActualFrameDuration !== undefined) {
    instanceMetadata.ActualFrameDuration = dicomMetaData.ActualFrameDuration;
  }
  if (dicomMetaData.PatientSex && dicomMetaData.PatientSex !== undefined) {
    instanceMetadata.PatientSex = dicomMetaData.PatientSex;
  }
  if (dicomMetaData.PatientSize && dicomMetaData.PatientSize !== undefined) {
    instanceMetadata.PatientSize = dicomMetaData.PatientSize;
  }
  return instanceMetadata;
}
function convertInterfaceTimeToString(time) {
  const hours = `${time.hours || '00'}`.padStart(2, '0');
  const minutes = `${time.minutes || '00'}`.padStart(2, '0');
  const seconds = `${time.seconds || '00'}`.padStart(2, '0');
  const fractionalSeconds = `${time.fractionalSeconds || '000000'}`.padEnd(6, '0');
  const timeString = `${hours}${minutes}${seconds}.${fractionalSeconds}`;
  return timeString;
}
function convertInterfaceDateToString(date) {
  const month = `${date.month}`.padStart(2, '0');
  const day = `${date.day}`.padStart(2, '0');
  const dateString = `${date.year}${month}${day}`;
  return dateString;
}

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(metadataProvider, "metadataProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getPTImageIdInstanceMetadata.ts");
  reactHotLoader.register(getPTImageIdInstanceMetadata, "getPTImageIdInstanceMetadata", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getPTImageIdInstanceMetadata.ts");
  reactHotLoader.register(convertInterfaceTimeToString, "convertInterfaceTimeToString", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getPTImageIdInstanceMetadata.ts");
  reactHotLoader.register(convertInterfaceDateToString, "convertInterfaceDateToString", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getPTImageIdInstanceMetadata.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getPanelModule.tsx":
/*!**********************************************************!*\
  !*** ../../../extensions/default/src/getPanelModule.tsx ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels */ "../../../extensions/default/src/Panels/index.js");
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
  const wrappedMeasurementPanel = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.PanelMeasurementTable, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager
    });
  };
  return [{
    name: 'seriesList',
    iconName: 'group-layers',
    iconLabel: 'Studies',
    label: 'Studies',
    component: _Panels__WEBPACK_IMPORTED_MODULE_1__.WrappedPanelStudyBrowser.bind(null, {
      commandsManager,
      extensionManager,
      servicesManager
    })
  }, {
    name: 'measure',
    iconName: 'tab-linear',
    iconLabel: 'Measure',
    label: 'Measurements',
    secondaryLabel: 'Measurements',
    component: wrappedMeasurementPanel
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
  reactHotLoader.register(getPanelModule, "getPanelModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getPanelModule.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getPanelModule.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getSopClassHandlerModule.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/getSopClassHandlerModule.js ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_isImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/isImage */ "../../core/src/utils/isImage.js");
/* harmony import */ var _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sopClassDictionary */ "../../core/src/utils/sopClassDictionary.js");
/* harmony import */ var _ohif_core_src_classes_ImageSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src/classes/ImageSet */ "../../core/src/classes/ImageSet.ts");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./id */ "../../../extensions/default/src/id.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};





const sopClassHandlerName = 'stack';
const isMultiFrame = instance => {
  return instance.NumberOfFrames > 1;
};
const makeDisplaySet = instances => {
  const instance = instances[0];
  const imageSet = new _ohif_core_src_classes_ImageSet__WEBPACK_IMPORTED_MODULE_2__["default"](instances);
  const {
    value: isReconstructable,
    averageSpacingBetweenFrames
  } = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_3__["default"])(instances);

  // set appropriate attributes to image set...
  imageSet.setAttributes({
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    isMultiFrame: isMultiFrame(instance),
    countIcon: isReconstructable ? 'icon-mpr' : undefined,
    numImageFrames: instances.length,
    SOPClassHandlerId: `${_id__WEBPACK_IMPORTED_MODULE_4__.id}.sopClassHandlerModule.${sopClassHandlerName}`,
    isReconstructable,
    averageSpacingBetweenFrames: averageSpacingBetweenFrames || null
  });

  // Sort the images in this series if needed
  const shallSort = true; //!OHIF.utils.ObjectPath.get(Meteor, 'settings.public.ui.sortSeriesByIncomingOrder');
  if (shallSort) {
    imageSet.sortBy((a, b) => {
      // Sort by InstanceNumber (0020,0013)
      return (parseInt(a.InstanceNumber) || 0) - (parseInt(b.InstanceNumber) || 0);
    });
  }

  // Include the first image instance number (after sorted)
  /*imageSet.setAttribute(
    'instanceNumber',
    imageSet.getImage(0).InstanceNumber
  );*/

  /*const isReconstructable = isDisplaySetReconstructable(series, instances);
   imageSet.isReconstructable = isReconstructable.value;
   if (isReconstructable.missingFrames) {
    // TODO -> This is currently unused, but may be used for reconstructing
    // Volumes with gaps later on.
    imageSet.missingFrames = isReconstructable.missingFrames;
  }*/

  return imageSet;
};
const isSingleImageModality = modality => {
  return modality === 'CR' || modality === 'MG' || modality === 'DX';
};
function getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}

/**
 * Basic SOPClassHandler:
 * - For all Image types that are stackable, create
 *   a displaySet with a stack of images
 *
 * @param {Array} sopClassHandlerModules List of SOP Class Modules
 * @param {SeriesMetadata} series The series metadata object from which the display sets will be created
 * @returns {Array} The list of display sets created for the given series object
 */
function getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const displaySets = [];
  const sopClassUids = getSopClassUids(instances);

  // Search through the instances (InstanceMetadata object) of this series
  // Split Multi-frame instances and Single-image modalities
  // into their own specific display sets. Place the rest of each
  // series into another display set.
  const stackableInstances = [];
  instances.forEach(instance => {
    // All imaging modalities must have a valid value for sopClassUid (x00080016) or rows (x00280010)
    if (!(0,_ohif_core_src_utils_isImage__WEBPACK_IMPORTED_MODULE_0__.isImage)(instance.SOPClassUID) && !instance.Rows) {
      return;
    }
    let displaySet;
    if (isMultiFrame(instance)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        isClip: true,
        numImageFrames: instance.NumberOfFrames,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else if (isSingleImageModality(instance.Modality)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else {
      stackableInstances.push(instance);
    }
  });
  if (stackableInstances.length) {
    const displaySet = makeDisplaySet(stackableInstances);
    displaySet.setAttribute('studyInstanceUid', instances[0].StudyInstanceUID);
    displaySet.setAttributes({
      sopClassUids
    });
    displaySets.push(displaySet);
  }
  return displaySets;
}
const sopClassUids = [_ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].ComputedRadiographyImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].DigitalXRayImageStorageForPresentation, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].DigitalXRayImageStorageForProcessing, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].DigitalMammographyXRayImageStorageForPresentation, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].DigitalMammographyXRayImageStorageForProcessing, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].DigitalIntraOralXRayImageStorageForPresentation, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].DigitalIntraOralXRayImageStorageForProcessing, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].CTImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedCTImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].LegacyConvertedEnhancedCTImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].UltrasoundMultiframeImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].MRImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedMRImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedMRColorImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].LegacyConvertedEnhancedMRImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].UltrasoundImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].UltrasoundImageStorageRET, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].SecondaryCaptureImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].MultiframeSingleBitSecondaryCaptureImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].MultiframeGrayscaleByteSecondaryCaptureImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].MultiframeGrayscaleWordSecondaryCaptureImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].MultiframeTrueColorSecondaryCaptureImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].XRayAngiographicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedXAImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].XRayRadiofluoroscopicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedXRFImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].XRay3DAngiographicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].XRay3DCraniofacialImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].BreastTomosynthesisImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].BreastProjectionXRayImageStorageForPresentation, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].BreastProjectionXRayImageStorageForProcessing, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].IntravascularOpticalCoherenceTomographyImageStorageForPresentation, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].IntravascularOpticalCoherenceTomographyImageStorageForProcessing, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].NuclearMedicineImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VLEndoscopicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VideoEndoscopicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VLMicroscopicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VideoMicroscopicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VLSlideCoordinatesMicroscopicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VLPhotographicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VideoPhotographicImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].OphthalmicPhotography8BitImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].OphthalmicPhotography16BitImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].OphthalmicTomographyImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].VLWholeSlideMicroscopyImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].PositronEmissionTomographyImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedPETImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].LegacyConvertedEnhancedPETImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].RTImageStorage, _ohif_core_src_utils_sopClassDictionary__WEBPACK_IMPORTED_MODULE_1__["default"].EnhancedUSVolumeStorage];
function getSopClassHandlerModule() {
  return [{
    name: sopClassHandlerName,
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
const _default = getSopClassHandlerModule;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(sopClassHandlerName, "sopClassHandlerName", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(isMultiFrame, "isMultiFrame", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(makeDisplaySet, "makeDisplaySet", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(isSingleImageModality, "isSingleImageModality", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getSopClassUids, "getSopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getDisplaySetsFromSeries, "getDisplaySetsFromSeries", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(sopClassUids, "sopClassUids", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(getSopClassHandlerModule, "getSopClassHandlerModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getSopClassHandlerModule.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/getToolbarModule.tsx":
/*!************************************************************!*\
  !*** ../../../extensions/default/src/getToolbarModule.tsx ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getToolbarModule)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _Toolbar_ToolbarDivider_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar/ToolbarDivider.tsx */ "../../../extensions/default/src/Toolbar/ToolbarDivider.tsx");
/* harmony import */ var _Toolbar_ToolbarLayoutSelector_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Toolbar/ToolbarLayoutSelector.tsx */ "../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx");
/* harmony import */ var _Toolbar_ToolbarSplitButton_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toolbar/ToolbarSplitButton.tsx */ "../../../extensions/default/src/Toolbar/ToolbarSplitButton.tsx");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




function getToolbarModule(_ref) {
  let {
    commandsManager,
    servicesManager
  } = _ref;
  return [{
    name: 'ohif.divider',
    defaultComponent: _Toolbar_ToolbarDivider_tsx__WEBPACK_IMPORTED_MODULE_1__["default"],
    clickHandler: () => {}
  }, {
    name: 'ohif.action',
    defaultComponent: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton,
    clickHandler: () => {}
  }, {
    name: 'ohif.radioGroup',
    defaultComponent: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton,
    clickHandler: () => {}
  }, {
    name: 'ohif.splitButton',
    defaultComponent: _Toolbar_ToolbarSplitButton_tsx__WEBPACK_IMPORTED_MODULE_3__["default"],
    clickHandler: () => {}
  }, {
    name: 'ohif.layoutSelector',
    defaultComponent: _Toolbar_ToolbarLayoutSelector_tsx__WEBPACK_IMPORTED_MODULE_2__["default"],
    clickHandler: (evt, clickedBtn, btnSectionName) => {}
  }, {
    name: 'ohif.toggle',
    defaultComponent: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton,
    clickHandler: () => {}
  }];
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getToolbarModule, "getToolbarModule", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/getToolbarModule.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/hpMNGrid.ts":
/*!***************************************************!*\
  !*** ../../../extensions/default/src/hpMNGrid.ts ***!
  \***************************************************/
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
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMN = {
  hasUpdatedPriorsInformation: false,
  id: '@ohif/mnGrid',
  description: 'Has various hanging protocol grid layouts',
  name: '2x2',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    id: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 2,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 3,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // 3x1 stage
  {
    id: '3x1',
    // Obsolete settings:
    requiredViewports: 1,
    preferredViewports: 3,
    // New equivalent:
    stageActivation: {
      enabled: {
        minViewportsMatched: 3
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 1
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 2
      }]
    }]
  },
  // A 2x1 stage
  {
    id: '2x1',
    requiredViewports: 1,
    preferredViewports: 2,
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    id: '1x1',
    requiredViewports: 1,
    preferredViewports: 1,
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};
const _default = hpMN;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(hpMN, "hpMN", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/hpMNGrid.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/hpMNGrid.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/id.js":
/*!*********************************************!*\
  !*** ../../../extensions/default/src/id.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/default/package.json");
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
  reactHotLoader.register(id, "id", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/id.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/index.ts":
/*!************************************************!*\
  !*** ../../../extensions/default/src/index.ts ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuController: () => (/* reexport safe */ _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_11__.ContextMenuController),
/* harmony export */   CustomizableContextMenuTypes: () => (/* reexport safe */ _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_11__.CustomizableContextMenuTypes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dicomWebUtils: () => (/* reexport module object */ _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   getStudiesForPatientByMRN: () => (/* reexport safe */ _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__["default"])
/* harmony export */ });
/* harmony import */ var _getDataSourcesModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataSourcesModule.js */ "../../../extensions/default/src/getDataSourcesModule.js");
/* harmony import */ var _getLayoutTemplateModule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getLayoutTemplateModule.js */ "../../../extensions/default/src/getLayoutTemplateModule.js");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/default/src/getPanelModule.tsx");
/* harmony import */ var _getSopClassHandlerModule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSopClassHandlerModule.js */ "../../../extensions/default/src/getSopClassHandlerModule.js");
/* harmony import */ var _getToolbarModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getToolbarModule */ "../../../extensions/default/src/getToolbarModule.tsx");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/default/src/commandsModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/default/src/getHangingProtocolModule.js");
/* harmony import */ var _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Panels/getStudiesForPatientByMRN */ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/default/src/getCustomizationModule.tsx");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./id.js */ "../../../extensions/default/src/id.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./init */ "../../../extensions/default/src/init.ts");
/* harmony import */ var _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CustomizableContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/index.ts");
/* harmony import */ var _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DicomWebDataSource/utils */ "../../../extensions/default/src/DicomWebDataSource/utils/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};













const defaultExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_9__.id,
  preRegistration: _init__WEBPACK_IMPORTED_MODULE_10__["default"],
  getDataSourcesModule: _getDataSourcesModule_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  getLayoutTemplateModule: _getLayoutTemplateModule_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__["default"],
  getSopClassHandlerModule: _getSopClassHandlerModule_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  getToolbarModule: _getToolbarModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_5__["default"],
  getUtilityModule(_ref) {
    let {
      servicesManager
    } = _ref;
    return [{
      name: 'common',
      exports: {
        getStudiesForPatientByMRN: _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__["default"]
      }
    }];
  },
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_8__["default"]
};
const _default = defaultExtension;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);

;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(defaultExtension, "defaultExtension", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/index.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/index.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/init.ts":
/*!***********************************************!*\
  !*** ../../../extensions/default/src/init.ts ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_calculate_suv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/calculate-suv */ "../../../node_modules/@cornerstonejs/calculate-suv/dist/calculate-suv.esm.js");
/* harmony import */ var _getPTImageIdInstanceMetadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPTImageIdInstanceMetadata */ "../../../extensions/default/src/getPTImageIdInstanceMetadata.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.MetadataProvider;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 */
function init(_ref) {
  let {
    servicesManager,
    configuration = {}
  } = _ref;
  const {
    stateSyncService
  } = servicesManager.services;
  // Add
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.EVENTS.INSTANCES_ADDED, handlePETImageMetadata);

  // If the metadata for PET has changed by the user (e.g. manually changing the PatientWeight)
  // we need to recalculate the SUV Scaling Factors
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.EVENTS.SERIES_UPDATED, handlePETImageMetadata);

  // viewportGridStore is a sync state which stores the entire
  // ViewportGridService getState, by the keys `<activeStudyUID>:<protocolId>:<stageIndex>`
  // Used to recover manual changes to the layout of a stage.
  stateSyncService.register('viewportGridStore', {
    clearOnModeExit: true
  });

  // displaySetSelectorMap stores a map from
  // `<activeStudyUID>:<displaySetSelectorId>:<matchOffset>` to
  // a displaySetInstanceUID, used to display named display sets in
  // specific spots within a hanging protocol and be able to remember what the
  // user did with those named spots between stages and protocols.
  stateSyncService.register('displaySetSelectorMap', {
    clearOnModeExit: true
  });

  // Stores a map from `<activeStudyUID>:${protocolId}` to the getHPInfo results
  // in order to recover the correct stage when returning to a Hanging Protocol.
  stateSyncService.register('hangingProtocolStageIndexMap', {
    clearOnModeExit: true
  });

  // Stores a map from the to be applied hanging protocols `<activeStudyUID>:<protocolId>`
  // to the previously applied hanging protolStageIndexMap key, in order to toggle
  // off the applied protocol and remember the old state.
  stateSyncService.register('toggleHangingProtocol', {
    clearOnModeExit: true
  });

  // Stores the viewports by `rows-cols` position so that when the layout
  // changes numRows and numCols, the viewports can be remembers and then replaced
  // afterwards.
  stateSyncService.register('viewportsByPosition', {
    clearOnModeExit: true
  });
}
const handlePETImageMetadata = _ref2 => {
  let {
    SeriesInstanceUID,
    StudyInstanceUID
  } = _ref2;
  const {
    instances
  } = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getSeries(StudyInstanceUID, SeriesInstanceUID);
  const modality = instances[0].Modality;
  if (modality !== 'PT') {
    return;
  }
  const imageIds = instances.map(instance => instance.imageId);
  const instanceMetadataArray = [];
  imageIds.forEach(imageId => {
    const instanceMetadata = (0,_getPTImageIdInstanceMetadata__WEBPACK_IMPORTED_MODULE_2__["default"])(imageId);
    if (instanceMetadata) {
      instanceMetadataArray.push(instanceMetadata);
    }
  });
  if (!instanceMetadataArray.length) {
    return;
  }

  // try except block to prevent errors when the metadata is not correct
  let suvScalingFactors;
  try {
    suvScalingFactors = (0,_cornerstonejs_calculate_suv__WEBPACK_IMPORTED_MODULE_1__.calculateSUVScalingFactors)(instanceMetadataArray);
  } catch (error) {
    console.log(error);
  }
  if (!suvScalingFactors) {
    return;
  }
  instanceMetadataArray.forEach((instanceMetadata, index) => {
    metadataProvider.addCustomMetadata(imageIds[index], 'scalingModule', suvScalingFactors[index]);
  });
};
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(metadataProvider, "metadataProvider", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/init.ts");
  reactHotLoader.register(init, "init", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/init.ts");
  reactHotLoader.register(handlePETImageMetadata, "handlePETImageMetadata", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/init.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/utils/findSRWithSameSeriesDescription.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/default/src/utils/findSRWithSameSeriesDescription.ts ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findSRWithSameSeriesDescription)
/* harmony export */ });
/* harmony import */ var _getNextSRSeriesNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNextSRSeriesNumber */ "../../../extensions/default/src/utils/getNextSRSeriesNumber.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


/**
 * Find an SR having the same series description.
 * This is used by the store service in order to store DICOM SR's having the
 * same Series Description into a single series under consecutive instance numbers
 * That way, they are all organized as a set and could have tools to view
 * "prior" SR instances.
 *
 * @param SeriesDescription - is the description to look for
 * @param displaySetService - the display sets to search for DICOM SR in
 * @returns SeriesMetadata from a DICOM SR having the same series description
 */
function findSRWithSameSeriesDescription(SeriesDescription, displaySetService) {
  const activeDisplaySets = displaySetService.getActiveDisplaySets();
  const srDisplaySets = activeDisplaySets.filter(ds => ds.Modality === 'SR');
  const sameSeries = srDisplaySets.find(ds => ds.SeriesDescription === SeriesDescription);
  if (sameSeries) {
    console.log('Storing to same series', sameSeries);
    const {
      instance
    } = sameSeries;
    const {
      SeriesInstanceUID,
      SeriesDescription,
      SeriesDate,
      SeriesTime,
      SeriesNumber,
      Modality
    } = instance;
    return {
      SeriesInstanceUID,
      SeriesDescription,
      SeriesDate,
      SeriesTime,
      SeriesNumber,
      Modality,
      InstanceNumber: sameSeries.instances.length + 1
    };
  }
  const SeriesNumber = (0,_getNextSRSeriesNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(displaySetService);
  return {
    SeriesDescription,
    SeriesNumber
  };
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(findSRWithSameSeriesDescription, "findSRWithSameSeriesDescription", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/findSRWithSameSeriesDescription.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/utils/getDirectURL.js":
/*!*************************************************************!*\
  !*** ../../../extensions/default/src/utils/getDirectURL.js ***!
  \*************************************************************/
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


/**
 * Generates a URL that can be used for direct retrieve of the bulkdata
 *
 * @param {object} params
 * @param {string} params.tag is the tag name of the URL to retrieve
 * @param {string} params.defaultPath path for the pixel data url
 * @param {object} params.instance is the instance object that the tag is in
 * @param {string} params.defaultType is the mime type of the response
 * @param {string} params.singlepart is the type of the part to retrieve
 * @param {string} params.fetchPart unknown?
 * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
 */
const getDirectURL = (config, params) => {
  const {
    wadoRoot,
    singlepart
  } = config;
  const {
    instance,
    tag = 'PixelData',
    defaultPath = '/pixeldata',
    defaultType = 'video/mp4',
    singlepart: fetchPart = 'video'
  } = params;
  const value = instance[tag];
  if (!value) return undefined;
  if (value.DirectRetrieveURL) return value.DirectRetrieveURL;
  if (value.InlineBinary) {
    const blob = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.b64toBlob(value.InlineBinary, defaultType);
    value.DirectRetrieveURL = URL.createObjectURL(blob);
    return value.DirectRetrieveURL;
  }
  if (!singlepart || singlepart !== true && singlepart.indexOf(fetchPart) === -1) {
    if (value.retrieveBulkData) {
      return value.retrieveBulkData().then(arr => {
        value.DirectRetrieveURL = URL.createObjectURL(new Blob([arr], {
          type: defaultType
        }));
        return value.DirectRetrieveURL;
      });
    }
    console.warn('Unable to retrieve', tag, 'from', instance);
    return undefined;
  }
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const BulkDataURI = value && value.BulkDataURI || `series/${SeriesInstanceUID}/instances/${SOPInstanceUID}${defaultPath}`;
  const hasQuery = BulkDataURI.indexOf('?') !== -1;
  const hasAccept = BulkDataURI.indexOf('accept=') !== -1;
  const acceptUri = BulkDataURI + (hasAccept ? '' : (hasQuery ? '&' : '?') + `accept=${defaultType}`);
  if (tag === 'PixelData' || tag === 'EncapsulatedDocument') {
    return `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}/rendered`;
  }

  // The DICOMweb standard states that the default is multipart related, and then
  // separately states that the accept parameter is the URL parameter equivalent of the accept header.
  return acceptUri;
};
const _default = getDirectURL;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(getDirectURL, "getDirectURL", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/getDirectURL.js");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/getDirectURL.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/utils/getNextSRSeriesNumber.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/utils/getNextSRSeriesNumber.js ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
  reactHotLoader.register(MIN_SR_SERIES_NUMBER, "MIN_SR_SERIES_NUMBER", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/getNextSRSeriesNumber.js");
  reactHotLoader.register(getNextSRSeriesNumber, "getNextSRSeriesNumber", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/getNextSRSeriesNumber.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/default/src/utils/reuseCachedLayouts.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/reuseCachedLayouts.ts ***!
  \*******************************************************************/
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
 * Calculates a set of state information for hanging protocols and viewport grid
 * which defines the currently applied hanging protocol state.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const reuseCachedLayout = (state, hangingProtocolService, syncService) => {
  const {
    activeViewportIndex,
    viewports,
    layout
  } = state;
  const hpInfo = hangingProtocolService.getState();
  const {
    protocolId,
    stageIndex,
    activeStudyUID
  } = hpInfo;
  const {
    protocol
  } = hangingProtocolService.getActiveProtocol();
  const stage = protocol.stages[stageIndex];
  const storeId = `${activeStudyUID}:${protocolId}:${stageIndex}`;
  const syncState = syncService.getState();
  const cacheId = `${activeStudyUID}:${protocolId}`;
  const viewportGridStore = {
    ...syncState.viewportGridStore
  };
  const hangingProtocolStageIndexMap = {
    ...syncState.hangingProtocolStageIndexMap
  };
  const displaySetSelectorMap = {
    ...syncState.displaySetSelectorMap
  };
  const {
    rows,
    columns
  } = stage.viewportStructure.properties;
  const custom = stage.viewports.length !== state.viewports.length || state.layout.numRows !== rows || state.layout.numCols !== columns;
  hangingProtocolStageIndexMap[cacheId] = hpInfo;
  if (storeId && custom) {
    viewportGridStore[storeId] = {
      ...state
    };
  }
  for (let idx = 0; idx < state.viewports.length; idx++) {
    const viewport = state.viewports[idx];
    const {
      displaySetOptions,
      displaySetInstanceUIDs
    } = viewport;
    if (!displaySetOptions) continue;
    for (let i = 0; i < displaySetOptions.length; i++) {
      const displaySetUID = displaySetInstanceUIDs[i];
      if (!displaySetUID) continue;
      if (idx === activeViewportIndex && i === 0) {
        displaySetSelectorMap[`${activeStudyUID}:activeDisplaySet:0`] = displaySetUID;
      }
      if (displaySetOptions[i]?.id) {
        displaySetSelectorMap[`${activeStudyUID}:${displaySetOptions[i].id}:${displaySetOptions[i].matchedDisplaySetsIndex || 0}`] = displaySetUID;
      }
    }
  }
  return {
    hangingProtocolStageIndexMap,
    viewportGridStore,
    displaySetSelectorMap
  };
};
const _default = reuseCachedLayout;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(reuseCachedLayout, "reuseCachedLayout", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/reuseCachedLayouts.ts");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/default/src/utils/reuseCachedLayouts.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".dicom-tag-browser-table {\n  margin-right: auto;\n  margin-left: auto;\n}\n\n.dicom-tag-browser-table-wrapper {\n/*  height: 500px;*/\n  /*overflow-y: scroll;*/\n  overflow-x: scroll;\n}\n\n.dicom-tag-browser-table tr {\n  padding-left: 10px;\n  padding-right: 10px;\n  color: #ffffff;\n  border-top: 1px solid #ddd;\n  white-space: nowrap;\n}\n\n.stick {\n  position: sticky;\n  overflow: clip;\n}\n\n.dicom-tag-browser-content {\n  overflow: hidden;\n  width: 100%;\n  padding-bottom: 50px;\n  /*height: 500px;*/\n}\n\n.dicom-tag-browser-instance-range .range {\n  height: 20px;\n}\n\n.dicom-tag-browser-instance-range {\n  padding: 20px 0 20px 0;\n}\n\n.dicom-tag-browser-table td.dicom-tag-browser-table-center {\n  text-align: center;\n}\n\n.dicom-tag-browser-table th {\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: center;\n  color: \"#20A5D6\";\n}\n\n.dicom-tag-browser-table th.dicom-tag-browser-table-left {\n  text-align: left;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");

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
      /*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css",
      function () {
        content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");

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

/***/ "../../../extensions/default/package.json":
/*!************************************************!*\
  !*** ../../../extensions/default/package.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@ohif/extension-default","version":"3.6.0","description":"Common/default features and functionality for basic image viewing","author":"OHIF Core Team","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-default.umd.js","module":"src/index.ts","publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"files":["dist","README.md"],"keywords":["ohif-extension"],"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.6.0","@ohif/i18n":"3.6.0","dcmjs":"^0.29.5","dicomweb-client":"^0.10.2","prop-types":"^15.6.2","react":"^17.0.2","react-dom":"^17.0.2","react-i18next":"^12.2.2","react-window":"^1.8.9","webpack":"^5.50.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/calculate-suv":"^1.0.3"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_default_src_index_ts.js.map