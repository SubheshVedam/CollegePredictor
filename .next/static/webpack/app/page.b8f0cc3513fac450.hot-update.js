"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/components/CollegeTable.js":
/*!****************************************!*\
  !*** ./app/components/CollegeTable.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CollegeTable)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nfunction CollegeTable(param) {\n    let { results } = param;\n    _s();\n    const [selectedRow, setSelectedRow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [details, setDetails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const handleViewDetails = async (row)=>{\n        setSelectedRow(row);\n        setShowModal(true);\n        setLoading(true);\n        setError(\"\");\n        setDetails(null);\n        try {\n            const params = new URLSearchParams({\n                institute_id: row.institute_id,\n                program_name: row.program_name,\n                gender: row.gender,\n                category: row.category,\n                sub_category: row.sub_category\n            });\n            const res = await fetch(\"/api/program-details?\".concat(params.toString()));\n            const data = await res.json();\n            if (!res.ok) throw new Error(data.error || \"Failed to fetch details\");\n            setDetails(data);\n        } catch (err) {\n            setError(err.message);\n        } finally{\n            setLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"college-table-container\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                    className: \"college-table\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        children: \"Institute\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                        lineNumber: 47,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        children: \"Program\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                        lineNumber: 48,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        children: \"Closing Rank\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                        lineNumber: 49,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        children: \"Quota\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                        lineNumber: 50,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                        children: \"Details\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                        lineNumber: 51,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                lineNumber: 46,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                            lineNumber: 45,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                            children: results.map((row, idx)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                    children: [\n                                        row.showInstituteName && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            rowSpan: row.rowspan,\n                                            children: row.institute_name\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 58,\n                                            columnNumber: 19\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            children: row.program_name\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 60,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            children: row.closing_rank\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 61,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            children: row.sub_category\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 62,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                                className: \"college-table-button\",\n                                                onClick: ()=>handleViewDetails(row),\n                                                children: \"View Details\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                lineNumber: 64,\n                                                columnNumber: 19\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 63,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, idx, true, {\n                                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                    lineNumber: 56,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                            lineNumber: 54,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                    lineNumber: 44,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, this),\n            showModal && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"college-table-modal-overlay\",\n                onClick: ()=>setShowModal(false),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"college-table-modal-content\",\n                    onClick: (e)=>e.stopPropagation(),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"college-table-modal-title\",\n                            children: \"Program Details\"\n                        }, void 0, false, {\n                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                            lineNumber: 77,\n                            columnNumber: 13\n                        }, this),\n                        loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: \"Loading...\"\n                        }, void 0, false, {\n                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                            lineNumber: 79,\n                            columnNumber: 25\n                        }, this),\n                        error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"college-table-error\",\n                            children: error\n                        }, void 0, false, {\n                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                            lineNumber: 80,\n                            columnNumber: 23\n                        }, this),\n                        details && Array.isArray(details) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                            children: \"Institute:\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 84,\n                                            columnNumber: 20\n                                        }, this),\n                                        \" \",\n                                        selectedRow.institute_name\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                    lineNumber: 84,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                            children: \"Program:\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                            lineNumber: 85,\n                                            columnNumber: 20\n                                        }, this),\n                                        \" \",\n                                        selectedRow.program_name\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                    lineNumber: 85,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"college-table-inner-table-wrapper\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                                        className: \"college-table-inner-table\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                                    children: [\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                            children: \"Round\"\n                                                        }, void 0, false, {\n                                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                            lineNumber: 91,\n                                                            columnNumber: 25\n                                                        }, this),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                            children: \"Opening Rank\"\n                                                        }, void 0, false, {\n                                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                            lineNumber: 92,\n                                                            columnNumber: 25\n                                                        }, this),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                            children: \"Closing Rank\"\n                                                        }, void 0, false, {\n                                                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                            lineNumber: 93,\n                                                            columnNumber: 25\n                                                        }, this)\n                                                    ]\n                                                }, void 0, true, {\n                                                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                    lineNumber: 90,\n                                                    columnNumber: 23\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                lineNumber: 89,\n                                                columnNumber: 21\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                                                children: details.map((d, i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                                        className: \"\",\n                                                        children: [\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                                children: d.round\n                                                            }, void 0, false, {\n                                                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                                lineNumber: 99,\n                                                                columnNumber: 27\n                                                            }, this),\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                                children: d.opening_rank\n                                                            }, void 0, false, {\n                                                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                                lineNumber: 100,\n                                                                columnNumber: 27\n                                                            }, this),\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                                children: d.closing_rank\n                                                            }, void 0, false, {\n                                                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                                lineNumber: 101,\n                                                                columnNumber: 27\n                                                            }, this)\n                                                        ]\n                                                    }, i, true, {\n                                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                        lineNumber: 98,\n                                                        columnNumber: 25\n                                                    }, this))\n                                            }, void 0, false, {\n                                                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                                lineNumber: 96,\n                                                columnNumber: 21\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                        lineNumber: 88,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                                    lineNumber: 87,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"college-table-close-button\",\n                            onClick: ()=>setShowModal(false),\n                            children: \"Close\"\n                        }, void 0, false, {\n                            fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                            lineNumber: 110,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                    lineNumber: 76,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/components/CollegeTable.js\",\n                lineNumber: 75,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(CollegeTable, \"KfZi4MGsqJlNZImj5fZqrGv/Mj4=\");\n_c = CollegeTable;\nvar _c;\n$RefreshReg$(_c, \"CollegeTable\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL0NvbGxlZ2VUYWJsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFaUM7QUFFbEIsU0FBU0MsYUFBYSxLQUFXO1FBQVgsRUFBRUMsT0FBTyxFQUFFLEdBQVg7O0lBQ25DLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHSiwrQ0FBUUEsQ0FBQztJQUMvQyxNQUFNLENBQUNLLFNBQVNDLFdBQVcsR0FBR04sK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDTyxXQUFXQyxhQUFhLEdBQUdSLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ1MsU0FBU0MsV0FBVyxHQUFHViwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNXLE9BQU9DLFNBQVMsR0FBR1osK0NBQVFBLENBQUM7SUFFbkMsTUFBTWEsb0JBQW9CLE9BQU9DO1FBQy9CVixlQUFlVTtRQUNmTixhQUFhO1FBQ2JFLFdBQVc7UUFDWEUsU0FBUztRQUNUTixXQUFXO1FBRVgsSUFBSTtZQUNGLE1BQU1TLFNBQVMsSUFBSUMsZ0JBQWdCO2dCQUNqQ0MsY0FBY0gsSUFBSUcsWUFBWTtnQkFDOUJDLGNBQWNKLElBQUlJLFlBQVk7Z0JBQzlCQyxRQUFRTCxJQUFJSyxNQUFNO2dCQUNsQkMsVUFBVU4sSUFBSU0sUUFBUTtnQkFDdEJDLGNBQWNQLElBQUlPLFlBQVk7WUFDaEM7WUFFQSxNQUFNQyxNQUFNLE1BQU1DLE1BQU0sd0JBQTBDLE9BQWxCUixPQUFPUyxRQUFRO1lBQy9ELE1BQU1DLE9BQU8sTUFBTUgsSUFBSUksSUFBSTtZQUUzQixJQUFJLENBQUNKLElBQUlLLEVBQUUsRUFBRSxNQUFNLElBQUlDLE1BQU1ILEtBQUtkLEtBQUssSUFBSTtZQUUzQ0wsV0FBV21CO1FBQ2IsRUFBRSxPQUFPSSxLQUFLO1lBQ1pqQixTQUFTaUIsSUFBSUMsT0FBTztRQUN0QixTQUFVO1lBQ1JwQixXQUFXO1FBQ2I7SUFDRjtJQUVBLHFCQUNFOzswQkFDRSw4REFBQ3FCO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDQztvQkFBTUQsV0FBVTs7c0NBQ2YsOERBQUNFO3NDQUNDLDRFQUFDQzs7a0RBQ0MsOERBQUNDO2tEQUFHOzs7Ozs7a0RBQ0osOERBQUNBO2tEQUFHOzs7Ozs7a0RBQ0osOERBQUNBO2tEQUFHOzs7Ozs7a0RBQ0osOERBQUNBO2tEQUFHOzs7Ozs7a0RBQ0osOERBQUNBO2tEQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztzQ0FHUiw4REFBQ0M7c0NBQ0VuQyxRQUFRb0MsR0FBRyxDQUFDLENBQUN4QixLQUFLeUIsb0JBQ2pCLDhEQUFDSjs7d0NBQ0VyQixJQUFJMEIsaUJBQWlCLGtCQUNwQiw4REFBQ0M7NENBQUdDLFNBQVM1QixJQUFJNkIsT0FBTztzREFBRzdCLElBQUk4QixjQUFjOzs7Ozs7c0RBRS9DLDhEQUFDSDtzREFBSTNCLElBQUlJLFlBQVk7Ozs7OztzREFDckIsOERBQUN1QjtzREFBSTNCLElBQUkrQixZQUFZOzs7Ozs7c0RBQ3JCLDhEQUFDSjtzREFBSTNCLElBQUlPLFlBQVk7Ozs7OztzREFDckIsOERBQUNvQjtzREFDQyw0RUFBQ0s7Z0RBQU9kLFdBQVU7Z0RBQXVCZSxTQUFTLElBQU1sQyxrQkFBa0JDOzBEQUFNOzs7Ozs7Ozs7Ozs7bUNBUjNFeUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWtCaEJoQywyQkFDQyw4REFBQ3dCO2dCQUFJQyxXQUFVO2dCQUE4QmUsU0FBUyxJQUFNdkMsYUFBYTswQkFDdkUsNEVBQUN1QjtvQkFBSUMsV0FBVTtvQkFBOEJlLFNBQVMsQ0FBQ0MsSUFBTUEsRUFBRUMsZUFBZTs7c0NBQzVFLDhEQUFDQzs0QkFBR2xCLFdBQVU7c0NBQTRCOzs7Ozs7d0JBRXpDdkIseUJBQVcsOERBQUMwQztzQ0FBRTs7Ozs7O3dCQUNkeEMsdUJBQVMsOERBQUN3Qzs0QkFBRW5CLFdBQVU7c0NBQXVCckI7Ozs7Ozt3QkFFN0NOLFdBQVcrQyxNQUFNQyxPQUFPLENBQUNoRCwwQkFDeEI7OzhDQUNFLDhEQUFDOEM7O3NEQUFFLDhEQUFDRztzREFBTzs7Ozs7O3dDQUFtQjt3Q0FBRW5ELFlBQVl5QyxjQUFjOzs7Ozs7OzhDQUMxRCw4REFBQ087O3NEQUFFLDhEQUFDRztzREFBTzs7Ozs7O3dDQUFpQjt3Q0FBRW5ELFlBQVllLFlBQVk7Ozs7Ozs7OENBRXRELDhEQUFDYTtvQ0FBSUMsV0FBVTs4Q0FDYiw0RUFBQ0M7d0NBQU1ELFdBQVU7OzBEQUNmLDhEQUFDRTswREFDQyw0RUFBQ0M7O3NFQUNDLDhEQUFDQztzRUFBRzs7Ozs7O3NFQUNKLDhEQUFDQTtzRUFBRzs7Ozs7O3NFQUNKLDhEQUFDQTtzRUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7MERBR1IsOERBQUNDOzBEQUNFaEMsUUFBUWlDLEdBQUcsQ0FBQyxDQUFDaUIsR0FBR0Msa0JBQ2YsOERBQUNyQjt3REFBR0gsV0FBVTs7MEVBQ1osOERBQUNTOzBFQUFJYyxFQUFFRSxLQUFLOzs7Ozs7MEVBQ1osOERBQUNoQjswRUFBSWMsRUFBRUcsWUFBWTs7Ozs7OzBFQUNuQiw4REFBQ2pCOzBFQUFJYyxFQUFFVixZQUFZOzs7Ozs7O3VEQUhDVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBWWxDLDhEQUFDVjs0QkFBT2QsV0FBVTs0QkFBNkJlLFNBQVMsSUFBTXZDLGFBQWE7c0NBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRL0Y7R0FqSHdCUDtLQUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL1ByYXovRG9jdW1lbnRzL3ZlZGFtX2xpdmUvQ29sbGVnZVByZWRpY3Rvci9hcHAvY29tcG9uZW50cy9Db2xsZWdlVGFibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbGxlZ2VUYWJsZSh7IHJlc3VsdHMgfSkge1xuICBjb25zdCBbc2VsZWN0ZWRSb3csIHNldFNlbGVjdGVkUm93XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbZGV0YWlscywgc2V0RGV0YWlsc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3Nob3dNb2RhbCwgc2V0U2hvd01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IGhhbmRsZVZpZXdEZXRhaWxzID0gYXN5bmMgKHJvdykgPT4ge1xuICAgIHNldFNlbGVjdGVkUm93KHJvdyk7XG4gICAgc2V0U2hvd01vZGFsKHRydWUpO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IoXCJcIik7XG4gICAgc2V0RGV0YWlscyhudWxsKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgaW5zdGl0dXRlX2lkOiByb3cuaW5zdGl0dXRlX2lkLFxuICAgICAgICBwcm9ncmFtX25hbWU6IHJvdy5wcm9ncmFtX25hbWUsXG4gICAgICAgIGdlbmRlcjogcm93LmdlbmRlcixcbiAgICAgICAgY2F0ZWdvcnk6IHJvdy5jYXRlZ29yeSxcbiAgICAgICAgc3ViX2NhdGVnb3J5OiByb3cuc3ViX2NhdGVnb3J5LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvYXBpL3Byb2dyYW0tZGV0YWlscz8ke3BhcmFtcy50b1N0cmluZygpfWApO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCBcIkZhaWxlZCB0byBmZXRjaCBkZXRhaWxzXCIpO1xuXG4gICAgICBzZXREZXRhaWxzKGRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsZWdlLXRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiY29sbGVnZS10YWJsZVwiPlxuICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRoPkluc3RpdHV0ZTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Qcm9ncmFtPC90aD5cbiAgICAgICAgICAgICAgPHRoPkNsb3NpbmcgUmFuazwvdGg+XG4gICAgICAgICAgICAgIDx0aD5RdW90YTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5EZXRhaWxzPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICB7cmVzdWx0cy5tYXAoKHJvdywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e2lkeH0+XG4gICAgICAgICAgICAgICAge3Jvdy5zaG93SW5zdGl0dXRlTmFtZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8dGQgcm93U3Bhbj17cm93LnJvd3NwYW59Pntyb3cuaW5zdGl0dXRlX25hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDx0ZD57cm93LnByb2dyYW1fbmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57cm93LmNsb3NpbmdfcmFua308L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57cm93LnN1Yl9jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY29sbGVnZS10YWJsZS1idXR0b25cIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVWaWV3RGV0YWlscyhyb3cpfT5cbiAgICAgICAgICAgICAgICAgICAgVmlldyBEZXRhaWxzXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7c2hvd01vZGFsICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsZWdlLXRhYmxlLW1vZGFsLW92ZXJsYXlcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TW9kYWwoZmFsc2UpfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxlZ2UtdGFibGUtbW9kYWwtY29udGVudFwiIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJjb2xsZWdlLXRhYmxlLW1vZGFsLXRpdGxlXCI+UHJvZ3JhbSBEZXRhaWxzPC9oMj5cblxuICAgICAgICAgICAge2xvYWRpbmcgJiYgPHA+TG9hZGluZy4uLjwvcD59XG4gICAgICAgICAgICB7ZXJyb3IgJiYgPHAgY2xhc3NOYW1lPVwiY29sbGVnZS10YWJsZS1lcnJvclwiPntlcnJvcn08L3A+fVxuXG4gICAgICAgICAgICB7ZGV0YWlscyAmJiBBcnJheS5pc0FycmF5KGRldGFpbHMpICYmIChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkluc3RpdHV0ZTo8L3N0cm9uZz4ge3NlbGVjdGVkUm93Lmluc3RpdHV0ZV9uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlByb2dyYW06PC9zdHJvbmc+IHtzZWxlY3RlZFJvdy5wcm9ncmFtX25hbWV9PC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsZWdlLXRhYmxlLWlubmVyLXRhYmxlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJjb2xsZWdlLXRhYmxlLWlubmVyLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+Um91bmQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk9wZW5pbmcgUmFuazwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2xvc2luZyBSYW5rPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge2RldGFpbHMubWFwKChkLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiXCIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntkLnJvdW5kfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57ZC5vcGVuaW5nX3Jhbmt9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntkLmNsb3NpbmdfcmFua308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjb2xsZWdlLXRhYmxlLWNsb3NlLWJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dNb2RhbChmYWxzZSl9PlxuICAgICAgICAgICAgICBDbG9zZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkNvbGxlZ2VUYWJsZSIsInJlc3VsdHMiLCJzZWxlY3RlZFJvdyIsInNldFNlbGVjdGVkUm93IiwiZGV0YWlscyIsInNldERldGFpbHMiLCJzaG93TW9kYWwiLCJzZXRTaG93TW9kYWwiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJoYW5kbGVWaWV3RGV0YWlscyIsInJvdyIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImluc3RpdHV0ZV9pZCIsInByb2dyYW1fbmFtZSIsImdlbmRlciIsImNhdGVnb3J5Iiwic3ViX2NhdGVnb3J5IiwicmVzIiwiZmV0Y2giLCJ0b1N0cmluZyIsImRhdGEiLCJqc29uIiwib2siLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJ0YWJsZSIsInRoZWFkIiwidHIiLCJ0aCIsInRib2R5IiwibWFwIiwiaWR4Iiwic2hvd0luc3RpdHV0ZU5hbWUiLCJ0ZCIsInJvd1NwYW4iLCJyb3dzcGFuIiwiaW5zdGl0dXRlX25hbWUiLCJjbG9zaW5nX3JhbmsiLCJidXR0b24iLCJvbkNsaWNrIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImgyIiwicCIsIkFycmF5IiwiaXNBcnJheSIsInN0cm9uZyIsImQiLCJpIiwicm91bmQiLCJvcGVuaW5nX3JhbmsiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/CollegeTable.js\n"));

/***/ })

});