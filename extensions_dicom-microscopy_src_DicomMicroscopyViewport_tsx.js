(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx"],{

/***/ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx":
/*!****************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx ***!
  \****************************************************************************/
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
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _DicomMicroscopyViewport_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DicomMicroscopyViewport.css */ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");
/* harmony import */ var _DicomMicroscopyViewport_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_DicomMicroscopyViewport_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_ViewportOverlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/ViewportOverlay */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx");
/* harmony import */ var _utils_dicomWebClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/dicomWebClient */ "../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _utils_cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/cleanDenaturalizedDataset */ "../../../extensions/dicom-microscopy/src/utils/cleanDenaturalizedDataset.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










function transformImageTypeUnnaturalized(entry) {
  if (entry.vr === 'CS') {
    return {
      vr: 'US',
      Value: entry.Value[0].split('\\')
    };
  }
  return entry;
}
class DicomMicroscopyViewport extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
    this.microscopyService = void 0;
    this.viewer = null;
    // dicom-microscopy-viewer instance
    this.managedViewer = null;
    // managed wrapper of microscopy-dicom extension
    this.container = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    this.overlayElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    this.debouncedResize = void 0;
    this.setViewportActiveHandler = () => {
      const {
        setViewportActive,
        viewportIndex,
        activeViewportIndex
      } = this.props;
      if (viewportIndex !== activeViewportIndex) {
        setViewportActive(viewportIndex);
      }
    };
    this.onWindowResize = () => {
      this.debouncedResize();
    };
    const {
      microscopyService
    } = this.props.servicesManager.services;
    this.microscopyService = microscopyService;
    this.debouncedResize = lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(() => {
      if (this.viewer) this.viewer.resize();
    }, 100);
  }
  /**
   * Get the nearest ROI from the mouse click point
   *
   * @param event
   * @param autoselect
   * @returns
   */
  getNearbyROI(event) {
    let autoselect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const symbols = Object.getOwnPropertySymbols(this.viewer);
    const _drawingSource = symbols.find(p => p.description === 'drawingSource');
    const _pyramid = symbols.find(p => p.description === 'pyramid');
    const _map = symbols.find(p => p.description === 'map');
    const _affine = symbols.find(p => p.description === 'affine');
    const feature = this.viewer[_drawingSource].getClosestFeatureToCoordinate(this.viewer[_map].getEventCoordinate(event));
    if (!feature) {
      return null;
    }
    const roiAnnotation = this.viewer._getROIFromFeature(feature, this.viewer[_pyramid].metadata, this.viewer[_affine]);
    if (roiAnnotation && autoselect) {
      this.microscopyService.selectAnnotation(roiAnnotation);
    }
    return roiAnnotation;
  }

  // install the microscopy renderer into the web page.
  // you should only do this once.
  async installOpenLayersRenderer(container, displaySet) {
    const loadViewer = async metadata => {
      const {
        viewer: DicomMicroscopyViewer,
        metadata: metadataUtils
      } = await __webpack_require__.e(/*! import() | dicom-microscopy-viewer */ "dicom-microscopy-viewer").then(__webpack_require__.t.bind(__webpack_require__, /*! dicom-microscopy-viewer */ "../../../node_modules/dicom-microscopy-viewer/dist/dynamic-import/dicomMicroscopyViewer.min.js", 23));
      const microscopyViewer = DicomMicroscopyViewer.VolumeImageViewer;
      const client = (0,_utils_dicomWebClient__WEBPACK_IMPORTED_MODULE_7__["default"])({
        extensionManager: this.props.extensionManager,
        servicesManager: this.props.servicesManager
      });

      // Parse, format, and filter metadata
      const volumeImages = [];

      /**
       * This block of code is the original way of loading DICOM into dicom-microscopy-viewer
       * as in their documentation.
       * But we have the metadata already loaded by our loaders.
       * As the metadata for microscopy DIOM files tends to be big and we don't
       * want to double load it, below we have the mechanism to reconstruct the
       * DICOM JSON structure (denaturalized) from naturalized metadata.
       * (NOTE: Our loaders cache only naturalized metadata, not the denaturalized.)
       */
      // {
      //   const retrieveOptions = {
      //     studyInstanceUID: metadata[0].StudyInstanceUID,
      //     seriesInstanceUID: metadata[0].SeriesInstanceUID,
      //   };
      //   metadata = await client.retrieveSeriesMetadata(retrieveOptions);
      //   // Parse, format, and filter metadata
      //   metadata.forEach(m => {
      //     if (
      //       volumeImages.length > 0 &&
      //       m['00200052'].Value[0] != volumeImages[0].FrameOfReferenceUID
      //     ) {
      //       console.warn(
      //         'Expected FrameOfReferenceUID of difference instances within a series to be the same, found multiple different values',
      //         m['00200052'].Value[0]
      //       );
      //       m['00200052'].Value[0] = volumeImages[0].FrameOfReferenceUID;
      //     }
      //     NOTE: depending on different data source, image.ImageType sometimes
      //     is a string, not a string array.
      //     m['00080008'] = transformImageTypeUnnaturalized(m['00080008']);

      //     const image = new metadataUtils.VLWholeSlideMicroscopyImage({
      //       metadata: m,
      //     });
      //     const imageFlavor = image.ImageType[2];
      //     if (imageFlavor === 'VOLUME' || imageFlavor === 'THUMBNAIL') {
      //       volumeImages.push(image);
      //     }
      //   });
      // }

      metadata.forEach(m => {
        // NOTE: depending on different data source, image.ImageType sometimes
        //    is a string, not a string array.
        m.ImageType = typeof m.ImageType === 'string' ? m.ImageType.split('\\') : m.ImageType;
        const inst = (0,_utils_cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_9__["default"])(dcmjs__WEBPACK_IMPORTED_MODULE_8__["default"].data.DicomMetaDictionary.denaturalizeDataset(m), {
          StudyInstanceUID: m.StudyInstanceUID,
          SeriesInstanceUID: m.SeriesInstanceUID,
          dataSourceConfig: this.props.dataSource.getConfig()
        });
        if (!inst['00480105']) {
          // Optical Path Sequence, no OpticalPathIdentifier?
          // NOTE: this is actually a not-well formatted DICOM VL Whole Slide Microscopy Image.
          inst['00480105'] = {
            vr: 'SQ',
            Value: [{
              '00480106': {
                vr: 'SH',
                Value: ['1']
              }
            }]
          };
        }
        const image = new metadataUtils.VLWholeSlideMicroscopyImage({
          metadata: inst
        });
        const imageFlavor = image.ImageType[2];
        if (imageFlavor === 'VOLUME' || imageFlavor === 'THUMBNAIL') {
          volumeImages.push(image);
        }
      });

      // format metadata for microscopy-viewer
      const options = {
        client,
        metadata: volumeImages,
        retrieveRendered: false,
        controls: ['overview', 'position']
      };
      this.viewer = new microscopyViewer(options);
      if (this.overlayElement && this.overlayElement.current && this.viewer.addViewportOverlay) {
        this.viewer.addViewportOverlay({
          element: this.overlayElement.current,
          coordinates: [0, 0],
          // TODO: dicom-microscopy-viewer documentation says this can be false to be automatically, but it is not.
          navigate: true,
          className: 'OpenLayersOverlay'
        });
      }
      this.viewer.render({
        container
      });
      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = displaySet;
      this.managedViewer = this.microscopyService.addViewer(this.viewer, this.props.viewportIndex, container, StudyInstanceUID, SeriesInstanceUID);
      this.managedViewer.addContextMenuCallback(event => {
        // TODO: refactor this after Bill's changes on ContextMenu feature get merged
        // const roiAnnotationNearBy = this.getNearbyROI(event);
      });
    };
    this.microscopyService.clearAnnotations();
    let smDisplaySet = displaySet;
    if (displaySet.Modality === 'SR') {
      // for SR displaySet, let's load the actual image displaySet
      smDisplaySet = displaySet.getSourceDisplaySet();
    }
    console.log('Loading viewer metadata', smDisplaySet);
    await loadViewer(smDisplaySet.others);
    if (displaySet.Modality === 'SR') {
      displaySet.load(smDisplaySet);
    }
  }
  componentDidMount() {
    const {
      displaySets,
      viewportIndex
    } = this.props;
    const displaySet = displaySets[viewportIndex];
    this.installOpenLayersRenderer(this.container.current, displaySet).then(() => {
      this.setState({
        isLoaded: true
      });
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.managedViewer && prevProps.displaySets !== this.props.displaySets) {
      const {
        displaySets
      } = this.props;
      const displaySet = displaySets[0];
      this.microscopyService.clearAnnotations();

      // loading SR
      if (displaySet.Modality === 'SR') {
        const referencedDisplaySet = displaySet.getSourceDisplaySet();
        displaySet.load(referencedDisplaySet);
      }
    }
  }
  componentWillUnmount() {
    this.microscopyService.removeViewer(this.viewer);
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    };
    const displaySet = this.props.displaySets[0];
    const firstInstance = displaySet.firstInstance || displaySet.instance;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: 'DicomMicroscopyViewer',
      style: style,
      onClick: this.setViewportActiveHandler
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        ...style,
        display: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        ...style
      },
      ref: this.overlayElement
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        position: 'relative',
        height: '100%',
        width: '100%'
      }
    }, displaySet && firstInstance.imageId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ViewportOverlay__WEBPACK_IMPORTED_MODULE_6__["default"], {
      displaySet: displaySet,
      instance: displaySet.instance,
      metadata: displaySet.metadata
    })))), react_resize_detector__WEBPACK_IMPORTED_MODULE_1__["default"] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_resize_detector__WEBPACK_IMPORTED_MODULE_1__["default"], {
      handleWidth: true,
      handleHeight: true,
      onResize: this.onWindowResize
    }), this.state.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, JSON.stringify(this.state.error)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: style,
      ref: this.container
    }), this.state.isLoaded ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.LoadingIndicatorProgress, {
      className: 'w-full h-full bg-black'
    }));
  }
  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }
}
DicomMicroscopyViewport.propTypes = {
  viewportData: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  activeViewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  setViewportActive: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  // props from OHIF Viewport Grid
  displaySets: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array),
  viewportIndex: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  viewportLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  dataSource: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  viewportOptions: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  displaySetOptions: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array),
  // other props from wrapping component
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  extensionManager: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  commandsManager: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)
};
const _default = DicomMicroscopyViewport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(transformImageTypeUnnaturalized, "transformImageTypeUnnaturalized", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx");
  reactHotLoader.register(DicomMicroscopyViewport, "DicomMicroscopyViewport", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx":
/*!*************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx ***!
  \*************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   generateFromConfig: () => (/* binding */ generateFromConfig)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listComponentGenerator */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx");
/* harmony import */ var _ViewportOverlay_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewportOverlay.css */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");
/* harmony import */ var _ViewportOverlay_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ViewportOverlay_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
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
 * @param {*} config is a configuration object that defines four lists of elements,
 * one topLeft, topRight, bottomLeft, bottomRight contents.
 * @param {*} extensionManager is used to load the image data.
 * @returns
 */
const generateFromConfig = _ref => {
  let {
    topLeft = [],
    topRight = [],
    bottomLeft = [],
    bottomRight = [],
    itemGenerator = () => {}
  } = _ref;
  return props => {
    const topLeftClass = 'top-viewport left-viewport text-primary-light';
    const topRightClass = 'top-viewport right-viewport-scrollbar text-primary-light';
    const bottomRightClass = 'bottom-viewport right-viewport-scrollbar text-primary-light';
    const bottomLeftClass = 'bottom-viewport left-viewport text-primary-light';
    const overlay = 'absolute pointer-events-none microscopy-viewport-overlay';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, topLeft && topLeft.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      "data-cy": 'viewport-overlay-top-left',
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, topLeftClass)
    }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
      ...props,
      list: topLeft,
      itemGenerator
    })), topRight && topRight.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      "data-cy": 'viewport-overlay-top-right',
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, topRightClass)
    }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
      ...props,
      list: topRight,
      itemGenerator
    })), bottomRight && bottomRight.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      "data-cy": 'viewport-overlay-bottom-right',
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, bottomRightClass)
    }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
      ...props,
      list: bottomRight,
      itemGenerator
    })), bottomLeft && bottomLeft.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      "data-cy": 'viewport-overlay-bottom-left',
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(overlay, bottomLeftClass)
    }, (0,_listComponentGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])({
      ...props,
      list: bottomLeft,
      itemGenerator
    })));
  };
};
const itemGenerator = props => {
  const {
    item
  } = props;
  const {
    title,
    value: valueFunc,
    condition,
    contents
  } = item;
  props.image = {
    ...props.image,
    ...props.metadata
  };
  props.formatDate = _utils__WEBPACK_IMPORTED_MODULE_4__.formatDICOMDate;
  props.formatTime = _utils__WEBPACK_IMPORTED_MODULE_4__.formatDICOMTime;
  props.formatPN = _utils__WEBPACK_IMPORTED_MODULE_4__.formatPN;
  props.formatNumberPrecision = _utils__WEBPACK_IMPORTED_MODULE_4__.formatNumberPrecision;
  if (condition && !condition(props)) return null;
  if (!contents && !valueFunc) return null;
  const value = valueFunc && valueFunc(props);
  const contentsValue = contents && contents(props) || [{
    className: 'mr-1',
    value: title
  }, {
    classname: 'mr-1 font-light',
    value
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: item.id,
    className: "flex flex-row"
  }, contentsValue.map((content, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    key: idx,
    className: content.className
  }, content.value)));
};
const _default = generateFromConfig({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(generateFromConfig, "generateFromConfig", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx");
  reactHotLoader.register(itemGenerator, "itemGenerator", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx":
/*!******************************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx ***!
  \******************************************************************************************************/
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
const listComponentGenerator = props => {
  const {
    list,
    itemGenerator
  } = props;
  if (!list) return;
  return list.map(item => {
    if (!item) return;
    const generator = item.generator || itemGenerator;
    if (!generator) throw new Error(`No generator for ${item}`);
    return generator({
      ...props,
      item
    });
  });
};
const _default = listComponentGenerator;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(listComponentGenerator, "listComponentGenerator", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx");
  reactHotLoader.register(_default, "default", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts ***!
  \************************************************************************************/
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
function formatNumberPrecision(number, precision) {
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
    return;
  }

  // Convert the first ^ to a ', '. String.replace() only affects
  // the first appearance of the character.
  const commaBetweenFirstAndLast = name.replace('^', ', ');

  // Replace any remaining '^' characters with spaces
  const cleaned = commaBetweenFirstAndLast.replace(/\^/g, ' ');

  // Trim any extraneous whitespace
  return cleaned.trim();
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
  reactHotLoader.register(isValidNumber, "isValidNumber", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
  reactHotLoader.register(formatNumberPrecision, "formatNumberPrecision", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
  reactHotLoader.register(formatDICOMDate, "formatDICOMDate", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
  reactHotLoader.register(formatDICOMTime, "formatDICOMTime", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
  reactHotLoader.register(formatPN, "formatPN", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
  reactHotLoader.register(getCompression, "getCompression", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/cleanDenaturalizedDataset.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/cleanDenaturalizedDataset.ts ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cleanDenaturalizedDataset)
/* harmony export */ });
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

function isPrimitive(v) {
  return !(typeof v == 'object' || Array.isArray(v));
}
const vrNumerics = ['DS', 'FL', 'FD', 'IS', 'OD', 'OF', 'OL', 'OV', 'SL', 'SS', 'SV', 'UL', 'US', 'UV'];

/**
 * Specialized for DICOM JSON format dataset cleaning.
 * @param obj
 * @returns
 */
function cleanDenaturalizedDataset(obj, options) {
  if (Array.isArray(obj)) {
    const newAry = obj.map(o => isPrimitive(o) ? o : cleanDenaturalizedDataset(o, options));
    return newAry;
  } else if (isPrimitive(obj)) {
    return obj;
  } else {
    Object.keys(obj).forEach(key => {
      if (obj[key].Value === null && obj[key].vr) {
        delete obj[key].Value;
      } else if (Array.isArray(obj[key].Value) && obj[key].vr) {
        if (obj[key].Value.length === 1 && obj[key].Value[0].BulkDataURI) {
          _ohif_extension_default__WEBPACK_IMPORTED_MODULE_0__.dicomWebUtils.fixBulkDataURI(obj[key].Value[0], options, options.dataSourceConfig);
          obj[key].BulkDataURI = obj[key].Value[0].BulkDataURI;

          // prevent mixed-content blockage
          if (window.location.protocol === 'https:' && obj[key].BulkDataURI.startsWith('http:')) {
            obj[key].BulkDataURI = obj[key].BulkDataURI.replace('http:', 'https:');
          }
          delete obj[key].Value;
        } else if (vrNumerics.includes(obj[key].vr)) {
          obj[key].Value = obj[key].Value.map(v => +v);
        } else {
          obj[key].Value = obj[key].Value.map(entry => cleanDenaturalizedDataset(entry, options));
        }
      }
    });
    return obj;
  }
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(isPrimitive, "isPrimitive", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/utils/cleanDenaturalizedDataset.ts");
  reactHotLoader.register(vrNumerics, "vrNumerics", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/utils/cleanDenaturalizedDataset.ts");
  reactHotLoader.register(cleanDenaturalizedDataset, "cleanDenaturalizedDataset", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/utils/cleanDenaturalizedDataset.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDicomWebClient)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


const {
  DICOMwebClient
} = dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api;
DICOMwebClient._buildMultipartAcceptHeaderFieldValue = () => {
  return '*/*';
};

/**
 * create a DICOMwebClient object to be used by Dicom Microscopy Viewer
 *
 * Referenced the code from `/extensions/default/src/DicomWebDataSource/index.js`
 *
 * @param param0
 * @returns
 */
function getDicomWebClient(_ref) {
  let {
    extensionManager,
    servicesManager
  } = _ref;
  const dataSourceConfig = window.config.dataSources.find(ds => ds.sourceName === extensionManager.activeDataSource);
  const {
    userAuthenticationService
  } = servicesManager.services;
  const {
    wadoRoot,
    staticWado,
    singlepart
  } = dataSourceConfig.configuration;
  const wadoConfig = {
    url: wadoRoot || '/dicomlocal',
    staticWado,
    singlepart,
    headers: userAuthenticationService.getAuthorizationHeader(),
    errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler()
  };
  const client = new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(wadoConfig);
  client.wadoURL = wadoConfig.url;
  if (extensionManager.activeDataSource === 'dicomlocal') {
    /**
     * For local data source, override the retrieveInstanceFrames() method of the
     * dicomweb-client to retrieve image data from memory cached metadata.
     * Other methods of the client doesn't matter, as we are feeding the DMV
     * with the series metadata already.
     *
     * @param {Object} options
     * @param {String} options.studyInstanceUID - Study Instance UID
     * @param {String} options.seriesInstanceUID - Series Instance UID
     * @param {String} options.sopInstanceUID - SOP Instance UID
     * @param {String} options.frameNumbers - One-based indices of Frame Items
     * @param {Object} [options.queryParams] - HTTP query parameters
     * @returns {ArrayBuffer[]} Rendered Frame Items as byte arrays
     */
    //
    client.retrieveInstanceFrames = async options => {
      if (!('studyInstanceUID' in options)) {
        throw new Error('Study Instance UID is required for retrieval of instance frames');
      }
      if (!('seriesInstanceUID' in options)) {
        throw new Error('Series Instance UID is required for retrieval of instance frames');
      }
      if (!('sopInstanceUID' in options)) {
        throw new Error('SOP Instance UID is required for retrieval of instance frames');
      }
      if (!('frameNumbers' in options)) {
        throw new Error('frame numbers are required for retrieval of instance frames');
      }
      console.log(`retrieve frames ${options.frameNumbers.toString()} of instance ${options.sopInstanceUID}`);
      const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.getInstance(options.studyInstanceUID, options.seriesInstanceUID, options.sopInstanceUID);
      const frameNumbers = Array.isArray(options.frameNumbers) ? options.frameNumbers : options.frameNumbers.split(',');
      return frameNumbers.map(fr => Array.isArray(instance.PixelData) ? instance.PixelData[+fr - 1] : instance.PixelData);
    };
  }
  return client;
}
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(DICOMwebClient, "DICOMwebClient", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/utils/dicomWebClient.ts");
  reactHotLoader.register(getDicomWebClient, "getDicomWebClient", "/Users/smartxx/xV/DICOM/Viewers/extensions/dicom-microscopy/src/utils/dicomWebClient.ts");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".DicomMicroscopyViewer {\n  --ol-partial-background-color: rgba(127, 127, 127, 0.7);\n  --ol-foreground-color: #000000;\n  --ol-subtle-foreground-color: #000;\n  --ol-subtle-background-color: rgba(78, 78, 78, 0.5);\n}\n\n.DicomMicroscopyViewer .ol-box {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  -webkit-transition: all 0.25s;\n  transition: all 0.25s;\n}\n\n.DicomMicroscopyViewer .ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.DicomMicroscopyViewer .ol-scale-bar-inner {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.DicomMicroscopyViewer .ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.DicomMicroscopyViewer .ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color),\n    0 1.5px var(--ol-partial-background-color),\n    1.5px 0 var(--ol-partial-background-color),\n    0 -1.5px var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color),\n    0 1.5px var(--ol-partial-background-color),\n    1.5px 0 var(--ol-partial-background-color),\n    0 -1.5px var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.DicomMicroscopyViewer .ol-unsupported {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-viewport,\n.DicomMicroscopyViewer .ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n   -ms-user-select: none;\n       user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.DicomMicroscopyViewer .ol-viewport canvas {\n  all: unset;\n}\n\n.DicomMicroscopyViewer .ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text;\n}\n\n.DicomMicroscopyViewer .ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n\n.DicomMicroscopyViewer .ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n\n.DicomMicroscopyViewer .ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.DicomMicroscopyViewer .ol-zoom {\n  top: 0.5em;\n  left: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-rotate {\n  top: 0.5em;\n  right: 0.5em;\n  -webkit-transition: opacity 0.25s linear, visibility 0s linear;\n  transition: opacity 0.25s linear, visibility 0s linear;\n}\n\n.DicomMicroscopyViewer .ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: opacity 0.25s linear, visibility 0s linear 0.25s;\n  transition: opacity 0.25s linear, visibility 0s linear 0.25s;\n}\n\n.DicomMicroscopyViewer .ol-zoom-extent {\n  top: 4.643em;\n  left: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-full-screen {\n  right: 0.5em;\n  top: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: 0.4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.DicomMicroscopyViewer .ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.DicomMicroscopyViewer .ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.DicomMicroscopyViewer .ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.DicomMicroscopyViewer .ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.DicomMicroscopyViewer .ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.DicomMicroscopyViewer .ol-control button:hover,\n.DicomMicroscopyViewer .ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.DicomMicroscopyViewer .ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.DicomMicroscopyViewer .ol-attribution {\n  text-align: right;\n  bottom: 0.5em;\n  right: 0.5em;\n  max-width: calc(100% - 1.3em);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n      -ms-flex-flow: row-reverse;\n          flex-flow: row-reverse;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.DicomMicroscopyViewer .ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.DicomMicroscopyViewer .ol-attribution ul {\n  margin: 0;\n  padding: 1px 0.5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.DicomMicroscopyViewer .ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.DicomMicroscopyViewer .ol-attribution li:not(:last-child):after {\n  content: ' ';\n}\n\n.DicomMicroscopyViewer .ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.DicomMicroscopyViewer .ol-attribution button {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible img {\n  margin-top: -0.2em;\n  max-height: 1.6em;\n}\n\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-zoomslider {\n  top: 4.5em;\n  left: 0.5em;\n  height: 200px;\n}\n\n.DicomMicroscopyViewer .ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.DicomMicroscopyViewer .ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map,\n.DicomMicroscopyViewer .ol-overviewmap button {\n  display: block;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.DicomMicroscopyViewer .ol-overviewmap-box {\n  border: 0.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n@layout-header-background: #007ea3;\n\n@primary-color: #007ea3;\n\n@processing-color: #8cb8c6;\n\n@success-color: #3f9c35;\n\n@warning-color: #eeaf30;\n\n@error-color: #96172e;\n\n@font-size-base: 14px;\n\n.DicomMicroscopyViewer .ol-tooltip {\n  font-size: 16px !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".DicomMicroscopyViewer .OpenLayersOverlay {\n  height: 100%;\n  width: 100%;\n  display: block !important;\n  pointer-events: none !important;\n}\n\n.DicomMicroscopyViewer .text-primary-light {\n  font-size: 14px;\n  color: yellow;\n  font-weight: normal;\n}\n\n.DicomMicroscopyViewer .text-primary-light span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  max-width: 300px;\n  /* text-shadow: 0px 1px 1px rgba(225, 225, 225, 0.6),\n              0px 1px 1px rgba(225, 225, 225, 0.6),\n              1px 1px 3px rgba(225, 225, 225, 0.9),\n              1px 1px 3px rgba(225, 225, 225, 0.9),\n              1px 1px 3px rgba(225, 225, 225, 0.9),\n              1px 1px 3px rgba(225, 225, 225, 0.9); */\n}\n\n.DicomMicroscopyViewer .absolute {\n  position: absolute;\n}\n\n.DicomMicroscopyViewer .flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.DicomMicroscopyViewer .flex-row {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n\n.DicomMicroscopyViewer .flex-col {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.DicomMicroscopyViewer .pointer-events-none {\n  pointer-events: none;\n}\n\n.DicomMicroscopyViewer .left-viewport-scrollbar {\n  left: 0.5rem;\n}\n\n.DicomMicroscopyViewer .right-viewport-scrollbar {\n  right: 1.3rem;\n}\n\n.DicomMicroscopyViewer .top-viewport {\n  top: 0.5rem;\n}\n\n.DicomMicroscopyViewer .bottom-viewport {\n  bottom: 0.5rem;\n}\n\n.DicomMicroscopyViewer .bottom-viewport.left-viewport {\n  bottom: 0.5rem;\n  left: calc(0.5rem + 250px);\n}\n\n.DicomMicroscopyViewer .right-viewport-scrollbar .flex {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: end;\n}\n\n.DicomMicroscopyViewer .microscopy-viewport-overlay {\n  padding: 0.5rem 1rem;\n  background: rgba(0, 0, 0, 0.5);\n  max-width: 40%;\n}\n\n.DicomMicroscopyViewer .microscopy-viewport-overlay .flex {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.DicomMicroscopyViewer .top-viewport .flex span:not(.font-light) {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css":
/*!****************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomMicroscopyViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");

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
      /*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomMicroscopyViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css",
      function () {
        content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./DicomMicroscopyViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");

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

/***/ "../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./ViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");

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
      /*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./ViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css",
      function () {
        content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./ViewportOverlay.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");

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
//# sourceMappingURL=extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx.js.map