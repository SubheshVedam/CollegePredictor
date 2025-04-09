/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/colleges/route";
exports.ids = ["app/api/colleges/route"];
exports.modules = {

/***/ "(rsc)/./app/api/colleges/route.js":
/*!***********************************!*\
  !*** ./app/api/colleges/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n\nasync function GET(req) {\n    try {\n        const { searchParams } = new URL(req.url);\n        const rank = parseInt(searchParams.get(\"rank\"));\n        const gender = searchParams.get(\"gender\");\n        const category = searchParams.get(\"category\");\n        const stateId = parseInt(searchParams.get(\"state_id\"));\n        if (isNaN(rank) || isNaN(stateId) || !gender || !category) {\n            return new Response(JSON.stringify({\n                error: \"Missing or invalid input\"\n            }), {\n                status: 400\n            });\n        }\n        const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.query(`\n      SELECT \n        ic.closing_rank,\n        ic.program_name,\n        ic.category,\n        ic.gender,\n        ic.institute_id,\n        ic.sub_category,\n        ic.round,\n        i.display_name AS institute_name\n      FROM institute_cutoffs ic\n      JOIN institutes i ON ic.institute_id = i.id\n      WHERE ic.closing_rank >= ?\n        AND ic.gender = ?\n        AND ic.category = ?\n        AND ic.round = 5\n        AND (\n          (i.state_id = ? AND ic.sub_category = 'HS') OR\n          (i.state_id != ? AND ic.sub_category = 'OS')\n        )\n      ORDER BY \n        (\n          SELECT MIN(ic2.closing_rank)\n          FROM institute_cutoffs ic2\n          WHERE ic2.institute_id = ic.institute_id\n            AND ic2.gender = ic.gender\n            AND ic2.category = ic.category\n            AND ic2.round = 5\n            AND (\n              (ic2.sub_category = 'HS' AND i.state_id = ?) OR\n              (ic2.sub_category = 'OS' AND i.state_id != ?)\n            )\n        ) ASC,\n        ic.closing_rank ASC;\n      `, [\n            rank,\n            gender,\n            category,\n            stateId,\n            stateId,\n            stateId,\n            stateId\n        ]);\n        return new Response(JSON.stringify(rows), {\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (error) {\n        console.error(\"❌ API ERROR:\", error);\n        return new Response(JSON.stringify({\n            error: \"Internal Server Error\"\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbGxlZ2VzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQThCO0FBRXZCLGVBQWVDLElBQUlDLEdBQUc7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsSUFBSUcsR0FBRztRQUN4QyxNQUFNQyxPQUFPQyxTQUFTSixhQUFhSyxHQUFHLENBQUM7UUFDdkMsTUFBTUMsU0FBU04sYUFBYUssR0FBRyxDQUFDO1FBQ2hDLE1BQU1FLFdBQVdQLGFBQWFLLEdBQUcsQ0FBQztRQUNsQyxNQUFNRyxVQUFVSixTQUFTSixhQUFhSyxHQUFHLENBQUM7UUFFMUMsSUFBSUksTUFBTU4sU0FBU00sTUFBTUQsWUFBWSxDQUFDRixVQUFVLENBQUNDLFVBQVU7WUFDekQsT0FBTyxJQUFJRyxTQUNUQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVDLE9BQU87WUFBMkIsSUFDbkQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLE1BQU1sQix1Q0FBRUEsQ0FBQ21CLEtBQUssQ0FDM0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQWtDRCxDQUFDLEVBQ0Q7WUFBQ2I7WUFBTUc7WUFBUUM7WUFBVUM7WUFBU0E7WUFBU0E7WUFBU0E7U0FBUTtRQUc5RCxPQUFPLElBQUlFLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQ0csT0FBTztZQUN4Q0UsU0FBUztnQkFBRSxnQkFBZ0I7WUFBbUI7UUFDaEQ7SUFDRixFQUFFLE9BQU9KLE9BQU87UUFDZEssUUFBUUwsS0FBSyxDQUFDLGdCQUFnQkE7UUFDOUIsT0FBTyxJQUFJSCxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsT0FBTztRQUF3QixJQUFJO1lBQ3RFQyxRQUFRO1FBQ1Y7SUFDRjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2FwcC9hcGkvY29sbGVnZXMvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9saWIvZGJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXEpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXEudXJsKTtcbiAgICBjb25zdCByYW5rID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldChcInJhbmtcIikpO1xuICAgIGNvbnN0IGdlbmRlciA9IHNlYXJjaFBhcmFtcy5nZXQoXCJnZW5kZXJcIik7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiY2F0ZWdvcnlcIik7XG4gICAgY29uc3Qgc3RhdGVJZCA9IHBhcnNlSW50KHNlYXJjaFBhcmFtcy5nZXQoXCJzdGF0ZV9pZFwiKSk7XG5cbiAgICBpZiAoaXNOYU4ocmFuaykgfHwgaXNOYU4oc3RhdGVJZCkgfHwgIWdlbmRlciB8fCAhY2F0ZWdvcnkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTWlzc2luZyBvciBpbnZhbGlkIGlucHV0XCIgfSksXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBbcm93c10gPSBhd2FpdCBkYi5xdWVyeShcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBcbiAgICAgICAgaWMuY2xvc2luZ19yYW5rLFxuICAgICAgICBpYy5wcm9ncmFtX25hbWUsXG4gICAgICAgIGljLmNhdGVnb3J5LFxuICAgICAgICBpYy5nZW5kZXIsXG4gICAgICAgIGljLmluc3RpdHV0ZV9pZCxcbiAgICAgICAgaWMuc3ViX2NhdGVnb3J5LFxuICAgICAgICBpYy5yb3VuZCxcbiAgICAgICAgaS5kaXNwbGF5X25hbWUgQVMgaW5zdGl0dXRlX25hbWVcbiAgICAgIEZST00gaW5zdGl0dXRlX2N1dG9mZnMgaWNcbiAgICAgIEpPSU4gaW5zdGl0dXRlcyBpIE9OIGljLmluc3RpdHV0ZV9pZCA9IGkuaWRcbiAgICAgIFdIRVJFIGljLmNsb3NpbmdfcmFuayA+PSA/XG4gICAgICAgIEFORCBpYy5nZW5kZXIgPSA/XG4gICAgICAgIEFORCBpYy5jYXRlZ29yeSA9ID9cbiAgICAgICAgQU5EIGljLnJvdW5kID0gNVxuICAgICAgICBBTkQgKFxuICAgICAgICAgIChpLnN0YXRlX2lkID0gPyBBTkQgaWMuc3ViX2NhdGVnb3J5ID0gJ0hTJykgT1JcbiAgICAgICAgICAoaS5zdGF0ZV9pZCAhPSA/IEFORCBpYy5zdWJfY2F0ZWdvcnkgPSAnT1MnKVxuICAgICAgICApXG4gICAgICBPUkRFUiBCWSBcbiAgICAgICAgKFxuICAgICAgICAgIFNFTEVDVCBNSU4oaWMyLmNsb3NpbmdfcmFuaylcbiAgICAgICAgICBGUk9NIGluc3RpdHV0ZV9jdXRvZmZzIGljMlxuICAgICAgICAgIFdIRVJFIGljMi5pbnN0aXR1dGVfaWQgPSBpYy5pbnN0aXR1dGVfaWRcbiAgICAgICAgICAgIEFORCBpYzIuZ2VuZGVyID0gaWMuZ2VuZGVyXG4gICAgICAgICAgICBBTkQgaWMyLmNhdGVnb3J5ID0gaWMuY2F0ZWdvcnlcbiAgICAgICAgICAgIEFORCBpYzIucm91bmQgPSA1XG4gICAgICAgICAgICBBTkQgKFxuICAgICAgICAgICAgICAoaWMyLnN1Yl9jYXRlZ29yeSA9ICdIUycgQU5EIGkuc3RhdGVfaWQgPSA/KSBPUlxuICAgICAgICAgICAgICAoaWMyLnN1Yl9jYXRlZ29yeSA9ICdPUycgQU5EIGkuc3RhdGVfaWQgIT0gPylcbiAgICAgICAgICAgIClcbiAgICAgICAgKSBBU0MsXG4gICAgICAgIGljLmNsb3NpbmdfcmFuayBBU0M7XG4gICAgICBgLFxuICAgICAgW3JhbmssIGdlbmRlciwgY2F0ZWdvcnksIHN0YXRlSWQsIHN0YXRlSWQsIHN0YXRlSWQsIHN0YXRlSWRdXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkocm93cyksIHtcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MIEFQSSBFUlJPUjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KSwge1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJkYiIsIkdFVCIsInJlcSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInJhbmsiLCJwYXJzZUludCIsImdldCIsImdlbmRlciIsImNhdGVnb3J5Iiwic3RhdGVJZCIsImlzTmFOIiwiUmVzcG9uc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJzdGF0dXMiLCJyb3dzIiwicXVlcnkiLCJoZWFkZXJzIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/colleges/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n\nconst db = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool({\n    host: process.env.MYSQL_HOST,\n    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,\n    user: process.env.MYSQL_USER,\n    password: process.env.MYSQL_PASSWORD,\n    database: process.env.MYSQL_DATABASE\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBbUM7QUFFNUIsTUFBTUMsS0FBS0Qsc0RBQWdCLENBQUM7SUFDakNHLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtJQUM1QkMsTUFBTUgsUUFBUUMsR0FBRyxDQUFDRyxVQUFVLEdBQUdDLE9BQU9MLFFBQVFDLEdBQUcsQ0FBQ0csVUFBVSxJQUFJO0lBQ2hFRSxNQUFNTixRQUFRQyxHQUFHLENBQUNNLFVBQVU7SUFDNUJDLFVBQVVSLFFBQVFDLEdBQUcsQ0FBQ1EsY0FBYztJQUNwQ0MsVUFBVVYsUUFBUUMsR0FBRyxDQUFDVSxjQUFjO0FBQ3RDLEdBQUciLCJzb3VyY2VzIjpbIi9Vc2Vycy9QcmF6L0RvY3VtZW50cy92ZWRhbV9saXZlL0NvbGxlZ2VQcmVkaWN0b3IvbGliL2RiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBteXNxbCBmcm9tICdteXNxbDIvcHJvbWlzZSc7XG5cbmV4cG9ydCBjb25zdCBkYiA9IG15c3FsLmNyZWF0ZVBvb2woe1xuICBob3N0OiBwcm9jZXNzLmVudi5NWVNRTF9IT1NULFxuICBwb3J0OiBwcm9jZXNzLmVudi5NWVNRTF9QT1JUID8gTnVtYmVyKHByb2Nlc3MuZW52Lk1ZU1FMX1BPUlQpIDogMzMwNixcbiAgdXNlcjogcHJvY2Vzcy5lbnYuTVlTUUxfVVNFUixcbiAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52Lk1ZU1FMX1BBU1NXT1JELFxuICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuTVlTUUxfREFUQUJBU0UsXG59KTtcbiJdLCJuYW1lcyI6WyJteXNxbCIsImRiIiwiY3JlYXRlUG9vbCIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiTVlTUUxfSE9TVCIsInBvcnQiLCJNWVNRTF9QT1JUIiwiTnVtYmVyIiwidXNlciIsIk1ZU1FMX1VTRVIiLCJwYXNzd29yZCIsIk1ZU1FMX1BBU1NXT1JEIiwiZGF0YWJhc2UiLCJNWVNRTF9EQVRBQkFTRSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcolleges%2Froute&page=%2Fapi%2Fcolleges%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcolleges%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcolleges%2Froute&page=%2Fapi%2Fcolleges%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcolleges%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_Praz_Documents_vedam_live_CollegePredictor_app_api_colleges_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/colleges/route.js */ \"(rsc)/./app/api/colleges/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/colleges/route\",\n        pathname: \"/api/colleges\",\n        filename: \"route\",\n        bundlePath: \"app/api/colleges/route\"\n    },\n    resolvedPagePath: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/api/colleges/route.js\",\n    nextConfigOutput,\n    userland: _Users_Praz_Documents_vedam_live_CollegePredictor_app_api_colleges_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb2xsZWdlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY29sbGVnZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjb2xsZWdlcyUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRlByYXolMkZEb2N1bWVudHMlMkZ2ZWRhbV9saXZlJTJGQ29sbGVnZVByZWRpY3RvciUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZQcmF6JTJGRG9jdW1lbnRzJTJGdmVkYW1fbGl2ZSUyRkNvbGxlZ2VQcmVkaWN0b3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJCO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2FwcC9hcGkvY29sbGVnZXMvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NvbGxlZ2VzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY29sbGVnZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NvbGxlZ2VzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL1ByYXovRG9jdW1lbnRzL3ZlZGFtX2xpdmUvQ29sbGVnZVByZWRpY3Rvci9hcHAvYXBpL2NvbGxlZ2VzL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcolleges%2Froute&page=%2Fapi%2Fcolleges%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcolleges%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/named-placeholders","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcolleges%2Froute&page=%2Fapi%2Fcolleges%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcolleges%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();