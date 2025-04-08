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
exports.id = "app/api/verify-otp/route";
exports.ids = ["app/api/verify-otp/route"];
exports.modules = {

/***/ "(rsc)/./app/api/verify-otp/route.js":
/*!*************************************!*\
  !*** ./app/api/verify-otp/route.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var twilio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! twilio */ \"(rsc)/./node_modules/twilio/lib/index.js\");\n/* harmony import */ var twilio__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(twilio__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst accountSid = process.env.TWILIO_ACCOUNT_SID;\nconst authToken = process.env.TWILIO_AUTH_TOKEN;\nconst verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;\nconst client = twilio__WEBPACK_IMPORTED_MODULE_1___default()(accountSid, authToken);\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { phone, otp } = body;\n        if (!phone || !otp) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Phone and OTP are required\"\n            }, {\n                status: 400\n            });\n        }\n        const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({\n            to: '+91' + phone,\n            code: otp\n        });\n        if (verification_check.status === \"approved\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true\n            });\n        } else {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid OTP\"\n            }, {\n                status: 400\n            });\n        }\n    } catch (error) {\n        console.error(\"Error verifying OTP:\", error.message);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ZlcmlmeS1vdHAvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUNmO0FBRTVCLE1BQU1FLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0Msa0JBQWtCO0FBQ2pELE1BQU1DLFlBQVlILFFBQVFDLEdBQUcsQ0FBQ0csaUJBQWlCO0FBQy9DLE1BQU1DLFlBQVlMLFFBQVFDLEdBQUcsQ0FBQ0sseUJBQXlCO0FBRXZELE1BQU1DLFNBQVNULDZDQUFNQSxDQUFDQyxZQUFZSTtBQUUzQixlQUFlSyxLQUFLQyxHQUFHO0lBQzVCLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ELElBQUlFLElBQUk7UUFDM0IsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLEdBQUcsRUFBRSxHQUFHSDtRQUV2QixJQUFJLENBQUNFLFNBQVMsQ0FBQ0MsS0FBSztZQUNsQixPQUFPaEIscURBQVlBLENBQUNjLElBQUksQ0FBQztnQkFBRUcsT0FBTztZQUE2QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbEY7UUFFQSxNQUFNQyxxQkFBcUIsTUFBTVQsT0FBT1UsTUFBTSxDQUFDQyxFQUFFLENBQzlDQyxRQUFRLENBQUNkLFdBQ1RlLGtCQUFrQixDQUFDQyxNQUFNLENBQUM7WUFBRUMsSUFBSSxRQUFRVjtZQUFPVyxNQUFNVjtRQUFJO1FBRTVELElBQUlHLG1CQUFtQkQsTUFBTSxLQUFLLFlBQVk7WUFDNUMsT0FBT2xCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7Z0JBQUVhLFNBQVM7WUFBSztRQUMzQyxPQUFPO1lBQ0wsT0FBTzNCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7Z0JBQUVHLE9BQU87WUFBYyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbkU7SUFDRixFQUFFLE9BQU9ELE9BQU87UUFDZFcsUUFBUVgsS0FBSyxDQUFDLHdCQUF3QkEsTUFBTVksT0FBTztRQUNuRCxPQUFPN0IscURBQVlBLENBQUNjLElBQUksQ0FBQztZQUFFRyxPQUFPQSxNQUFNWSxPQUFPO1FBQUMsR0FBRztZQUFFWCxRQUFRO1FBQUk7SUFDbkU7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL1ByYXovRG9jdW1lbnRzL3ZlZGFtX2xpdmUvQ29sbGVnZVByZWRpY3Rvci9hcHAvYXBpL3ZlcmlmeS1vdHAvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgdHdpbGlvIGZyb20gXCJ0d2lsaW9cIjtcblxuY29uc3QgYWNjb3VudFNpZCA9IHByb2Nlc3MuZW52LlRXSUxJT19BQ0NPVU5UX1NJRDtcbmNvbnN0IGF1dGhUb2tlbiA9IHByb2Nlc3MuZW52LlRXSUxJT19BVVRIX1RPS0VOO1xuY29uc3QgdmVyaWZ5U2lkID0gcHJvY2Vzcy5lbnYuVFdJTElPX1ZFUklGWV9TRVJWSUNFX1NJRDtcblxuY29uc3QgY2xpZW50ID0gdHdpbGlvKGFjY291bnRTaWQsIGF1dGhUb2tlbik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHsgcGhvbmUsIG90cCB9ID0gYm9keTtcblxuICAgIGlmICghcGhvbmUgfHwgIW90cCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUGhvbmUgYW5kIE9UUCBhcmUgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcmlmaWNhdGlvbl9jaGVjayA9IGF3YWl0IGNsaWVudC52ZXJpZnkudjJcbiAgICAgIC5zZXJ2aWNlcyh2ZXJpZnlTaWQpXG4gICAgICAudmVyaWZpY2F0aW9uQ2hlY2tzLmNyZWF0ZSh7IHRvOiAnKzkxJyArIHBob25lLCBjb2RlOiBvdHAgfSk7XG5cbiAgICBpZiAodmVyaWZpY2F0aW9uX2NoZWNrLnN0YXR1cyA9PT0gXCJhcHByb3ZlZFwiKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIE9UUFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB2ZXJpZnlpbmcgT1RQOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwidHdpbGlvIiwiYWNjb3VudFNpZCIsInByb2Nlc3MiLCJlbnYiLCJUV0lMSU9fQUNDT1VOVF9TSUQiLCJhdXRoVG9rZW4iLCJUV0lMSU9fQVVUSF9UT0tFTiIsInZlcmlmeVNpZCIsIlRXSUxJT19WRVJJRllfU0VSVklDRV9TSUQiLCJjbGllbnQiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJwaG9uZSIsIm90cCIsImVycm9yIiwic3RhdHVzIiwidmVyaWZpY2F0aW9uX2NoZWNrIiwidmVyaWZ5IiwidjIiLCJzZXJ2aWNlcyIsInZlcmlmaWNhdGlvbkNoZWNrcyIsImNyZWF0ZSIsInRvIiwiY29kZSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/verify-otp/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-otp%2Froute&page=%2Fapi%2Fverify-otp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-otp%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-otp%2Froute&page=%2Fapi%2Fverify-otp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-otp%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_Praz_Documents_vedam_live_CollegePredictor_app_api_verify_otp_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/verify-otp/route.js */ \"(rsc)/./app/api/verify-otp/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/verify-otp/route\",\n        pathname: \"/api/verify-otp\",\n        filename: \"route\",\n        bundlePath: \"app/api/verify-otp/route\"\n    },\n    resolvedPagePath: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/api/verify-otp/route.js\",\n    nextConfigOutput,\n    userland: _Users_Praz_Documents_vedam_live_CollegePredictor_app_api_verify_otp_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ2ZXJpZnktb3RwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ2ZXJpZnktb3RwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdmVyaWZ5LW90cCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRlByYXolMkZEb2N1bWVudHMlMkZ2ZWRhbV9saXZlJTJGQ29sbGVnZVByZWRpY3RvciUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZQcmF6JTJGRG9jdW1lbnRzJTJGdmVkYW1fbGl2ZSUyRkNvbGxlZ2VQcmVkaWN0b3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzZCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2FwcC9hcGkvdmVyaWZ5LW90cC9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdmVyaWZ5LW90cC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3ZlcmlmeS1vdHBcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3ZlcmlmeS1vdHAvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2FwcC9hcGkvdmVyaWZ5LW90cC9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-otp%2Froute&page=%2Fapi%2Fverify-otp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-otp%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/twilio","vendor-chunks/xmlbuilder","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/semver","vendor-chunks/qs","vendor-chunks/jsonwebtoken","vendor-chunks/follow-redirects","vendor-chunks/object-inspect","vendor-chunks/lodash.includes","vendor-chunks/debug","vendor-chunks/get-intrinsic","vendor-chunks/form-data","vendor-chunks/https-proxy-agent","vendor-chunks/dayjs","vendor-chunks/agent-base","vendor-chunks/asynckit","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/combined-stream","vendor-chunks/lodash.isplainobject","vendor-chunks/mime-types","vendor-chunks/side-channel-list","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/side-channel-weakmap","vendor-chunks/has-symbols","vendor-chunks/delayed-stream","vendor-chunks/lodash.isstring","vendor-chunks/function-bind","vendor-chunks/lodash.isnumber","vendor-chunks/side-channel-map","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/es-set-tostringtag","vendor-chunks/side-channel","vendor-chunks/scmp","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/buffer-equal-constant-time","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/call-bound","vendor-chunks/es-errors","vendor-chunks/has-flag","vendor-chunks/gopd","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/es-object-atoms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-otp%2Froute&page=%2Fapi%2Fverify-otp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-otp%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();