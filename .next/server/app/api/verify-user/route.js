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
exports.id = "app/api/verify-user/route";
exports.ids = ["app/api/verify-user/route"];
exports.modules = {

/***/ "(rsc)/./app/api/verify-user/route.js":
/*!**************************************!*\
  !*** ./app/api/verify-user/route.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var twilio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! twilio */ \"(rsc)/./node_modules/twilio/lib/index.js\");\n/* harmony import */ var twilio__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(twilio__WEBPACK_IMPORTED_MODULE_2__);\n// /app/api/verify-user/route.js\n\n\n\nconst client = twilio__WEBPACK_IMPORTED_MODULE_2___default()(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);\nconst serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;\nasync function POST(req) {\n    const { phone, name, email, step, otp } = await req.json();\n    if (!phone) return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n        error: \"Phone is required\"\n    }, {\n        status: 400\n    });\n    try {\n        // Step 1: Check if user already exists\n        const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.query(\"SELECT * FROM verified_users WHERE phone_number = ?\", [\n            phone\n        ]);\n        if (rows.length > 0) {\n            // Already verified, skip OTP\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                success: true,\n                skipVerification: true\n            });\n        }\n        if (step === \"send\") {\n            await client.verify.v2.services(serviceSid).verifications.create({\n                to: `+91${phone}`,\n                channel: \"sms\"\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                success: true,\n                skipVerification: false\n            });\n        }\n        if (step === \"verify\") {\n            const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({\n                to: `+91${phone}`,\n                code: otp\n            });\n            if (verificationCheck.status === \"approved\") {\n                await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.query(\"INSERT INTO verified_users (name, email, phone_number) VALUES (?, ?, ?)\", [\n                    name,\n                    email,\n                    phone\n                ]);\n                return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                    success: true\n                });\n            } else {\n                return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                    error: \"Invalid OTP\"\n                }, {\n                    status: 400\n                });\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Invalid step\"\n        }, {\n            status: 400\n        });\n    } catch (error) {\n        console.error(\"OTP Verification Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ZlcmlmeS11c2VyL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsZ0NBQWdDO0FBQ0Y7QUFDYTtBQUNmO0FBRTVCLE1BQU1HLFNBQVNELDZDQUFNQSxDQUFDRSxRQUFRQyxHQUFHLENBQUNDLGtCQUFrQixFQUFFRixRQUFRQyxHQUFHLENBQUNFLGlCQUFpQjtBQUNuRixNQUFNQyxhQUFhSixRQUFRQyxHQUFHLENBQUNJLHlCQUF5QjtBQUVqRCxlQUFlQyxLQUFLQyxHQUFHO0lBQzVCLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxHQUFHLEVBQUUsR0FBRyxNQUFNTCxJQUFJTSxJQUFJO0lBRXhELElBQUksQ0FBQ0wsT0FBTyxPQUFPWCxxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQW9CLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBRW5GLElBQUk7UUFDRix1Q0FBdUM7UUFDdkMsTUFBTSxDQUFDQyxLQUFLLEdBQUcsTUFBTXBCLHVDQUFFQSxDQUFDcUIsS0FBSyxDQUFDLHVEQUF1RDtZQUFDVDtTQUFNO1FBRTVGLElBQUlRLEtBQUtFLE1BQU0sR0FBRyxHQUFHO1lBQ25CLDZCQUE2QjtZQUM3QixPQUFPckIscURBQVlBLENBQUNnQixJQUFJLENBQUM7Z0JBQUVNLFNBQVM7Z0JBQU1DLGtCQUFrQjtZQUFLO1FBQ25FO1FBRUEsSUFBSVQsU0FBUyxRQUFRO1lBQ25CLE1BQU1aLE9BQU9zQixNQUFNLENBQUNDLEVBQUUsQ0FBQ0MsUUFBUSxDQUFDbkIsWUFBWW9CLGFBQWEsQ0FBQ0MsTUFBTSxDQUFDO2dCQUFFQyxJQUFJLENBQUMsR0FBRyxFQUFFbEIsT0FBTztnQkFBRW1CLFNBQVM7WUFBTTtZQUNyRyxPQUFPOUIscURBQVlBLENBQUNnQixJQUFJLENBQUM7Z0JBQUVNLFNBQVM7Z0JBQU1DLGtCQUFrQjtZQUFNO1FBQ3BFO1FBRUEsSUFBSVQsU0FBUyxVQUFVO1lBQ3JCLE1BQU1pQixvQkFBb0IsTUFBTTdCLE9BQU9zQixNQUFNLENBQUNDLEVBQUUsQ0FBQ0MsUUFBUSxDQUFDbkIsWUFBWXlCLGtCQUFrQixDQUFDSixNQUFNLENBQUM7Z0JBQzlGQyxJQUFJLENBQUMsR0FBRyxFQUFFbEIsT0FBTztnQkFDakJzQixNQUFNbEI7WUFDUjtZQUVBLElBQUlnQixrQkFBa0JiLE1BQU0sS0FBSyxZQUFZO2dCQUMzQyxNQUFNbkIsdUNBQUVBLENBQUNxQixLQUFLLENBQ1osMkVBQ0E7b0JBQUNSO29CQUFNQztvQkFBT0Y7aUJBQU07Z0JBRXRCLE9BQU9YLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO29CQUFFTSxTQUFTO2dCQUFLO1lBQzNDLE9BQU87Z0JBQ0wsT0FBT3RCLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO29CQUFFQyxPQUFPO2dCQUFjLEdBQUc7b0JBQUVDLFFBQVE7Z0JBQUk7WUFDbkU7UUFDRjtRQUVBLE9BQU9sQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEUsRUFBRSxPQUFPRCxPQUFPO1FBQ2RpQixRQUFRakIsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT2pCLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL1ByYXovRG9jdW1lbnRzL3ZlZGFtX2xpdmUvQ29sbGVnZVByZWRpY3Rvci9hcHAvYXBpL3ZlcmlmeS11c2VyL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC9hcHAvYXBpL3ZlcmlmeS11c2VyL3JvdXRlLmpzXG5pbXBvcnQgeyBkYiB9IGZyb20gXCJAL2xpYi9kYlwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgdHdpbGlvIGZyb20gXCJ0d2lsaW9cIjtcblxuY29uc3QgY2xpZW50ID0gdHdpbGlvKHByb2Nlc3MuZW52LlRXSUxJT19BQ0NPVU5UX1NJRCwgcHJvY2Vzcy5lbnYuVFdJTElPX0FVVEhfVE9LRU4pO1xuY29uc3Qgc2VydmljZVNpZCA9IHByb2Nlc3MuZW52LlRXSUxJT19WRVJJRllfU0VSVklDRV9TSUQ7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICBjb25zdCB7IHBob25lLCBuYW1lLCBlbWFpbCwgc3RlcCwgb3RwIH0gPSBhd2FpdCByZXEuanNvbigpO1xuXG4gIGlmICghcGhvbmUpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlBob25lIGlzIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcblxuICB0cnkge1xuICAgIC8vIFN0ZXAgMTogQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0c1xuICAgIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGRiLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSB2ZXJpZmllZF91c2VycyBXSEVSRSBwaG9uZV9udW1iZXIgPSA/XCIsIFtwaG9uZV0pO1xuXG4gICAgaWYgKHJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgLy8gQWxyZWFkeSB2ZXJpZmllZCwgc2tpcCBPVFBcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHNraXBWZXJpZmljYXRpb246IHRydWUgfSk7XG4gICAgfVxuXG4gICAgaWYgKHN0ZXAgPT09IFwic2VuZFwiKSB7XG4gICAgICBhd2FpdCBjbGllbnQudmVyaWZ5LnYyLnNlcnZpY2VzKHNlcnZpY2VTaWQpLnZlcmlmaWNhdGlvbnMuY3JlYXRlKHsgdG86IGArOTEke3Bob25lfWAsIGNoYW5uZWw6IFwic21zXCIgfSk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBza2lwVmVyaWZpY2F0aW9uOiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICBpZiAoc3RlcCA9PT0gXCJ2ZXJpZnlcIikge1xuICAgICAgY29uc3QgdmVyaWZpY2F0aW9uQ2hlY2sgPSBhd2FpdCBjbGllbnQudmVyaWZ5LnYyLnNlcnZpY2VzKHNlcnZpY2VTaWQpLnZlcmlmaWNhdGlvbkNoZWNrcy5jcmVhdGUoe1xuICAgICAgICB0bzogYCs5MSR7cGhvbmV9YCxcbiAgICAgICAgY29kZTogb3RwLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICh2ZXJpZmljYXRpb25DaGVjay5zdGF0dXMgPT09IFwiYXBwcm92ZWRcIikge1xuICAgICAgICBhd2FpdCBkYi5xdWVyeShcbiAgICAgICAgICBcIklOU0VSVCBJTlRPIHZlcmlmaWVkX3VzZXJzIChuYW1lLCBlbWFpbCwgcGhvbmVfbnVtYmVyKSBWQUxVRVMgKD8sID8sID8pXCIsXG4gICAgICAgICAgW25hbWUsIGVtYWlsLCBwaG9uZV1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkludmFsaWQgT1RQXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIHN0ZXBcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJPVFAgVmVyaWZpY2F0aW9uIEVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImRiIiwiTmV4dFJlc3BvbnNlIiwidHdpbGlvIiwiY2xpZW50IiwicHJvY2VzcyIsImVudiIsIlRXSUxJT19BQ0NPVU5UX1NJRCIsIlRXSUxJT19BVVRIX1RPS0VOIiwic2VydmljZVNpZCIsIlRXSUxJT19WRVJJRllfU0VSVklDRV9TSUQiLCJQT1NUIiwicmVxIiwicGhvbmUiLCJuYW1lIiwiZW1haWwiLCJzdGVwIiwib3RwIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwicm93cyIsInF1ZXJ5IiwibGVuZ3RoIiwic3VjY2VzcyIsInNraXBWZXJpZmljYXRpb24iLCJ2ZXJpZnkiLCJ2MiIsInNlcnZpY2VzIiwidmVyaWZpY2F0aW9ucyIsImNyZWF0ZSIsInRvIiwiY2hhbm5lbCIsInZlcmlmaWNhdGlvbkNoZWNrIiwidmVyaWZpY2F0aW9uQ2hlY2tzIiwiY29kZSIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/verify-user/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-user%2Froute&page=%2Fapi%2Fverify-user%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-user%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-user%2Froute&page=%2Fapi%2Fverify-user%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-user%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_Praz_Documents_vedam_live_CollegePredictor_app_api_verify_user_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/verify-user/route.js */ \"(rsc)/./app/api/verify-user/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/verify-user/route\",\n        pathname: \"/api/verify-user\",\n        filename: \"route\",\n        bundlePath: \"app/api/verify-user/route\"\n    },\n    resolvedPagePath: \"/Users/Praz/Documents/vedam_live/CollegePredictor/app/api/verify-user/route.js\",\n    nextConfigOutput,\n    userland: _Users_Praz_Documents_vedam_live_CollegePredictor_app_api_verify_user_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ2ZXJpZnktdXNlciUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdmVyaWZ5LXVzZXIlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ2ZXJpZnktdXNlciUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRlByYXolMkZEb2N1bWVudHMlMkZ2ZWRhbV9saXZlJTJGQ29sbGVnZVByZWRpY3RvciUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZQcmF6JTJGRG9jdW1lbnRzJTJGdmVkYW1fbGl2ZSUyRkNvbGxlZ2VQcmVkaWN0b3ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzhCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2FwcC9hcGkvdmVyaWZ5LXVzZXIvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3ZlcmlmeS11c2VyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdmVyaWZ5LXVzZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3ZlcmlmeS11c2VyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL1ByYXovRG9jdW1lbnRzL3ZlZGFtX2xpdmUvQ29sbGVnZVByZWRpY3Rvci9hcHAvYXBpL3ZlcmlmeS11c2VyL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-user%2Froute&page=%2Fapi%2Fverify-user%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-user%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/named-placeholders","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/generate-function","vendor-chunks/safer-buffer","vendor-chunks/twilio","vendor-chunks/semver","vendor-chunks/xmlbuilder","vendor-chunks/jsonwebtoken","vendor-chunks/asynckit","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/qs","vendor-chunks/jws","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/https-proxy-agent","vendor-chunks/get-proto","vendor-chunks/scmp","vendor-chunks/object-inspect","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/dayjs","vendor-chunks/agent-base","vendor-chunks/axios","vendor-chunks/supports-color","vendor-chunks/side-channel","vendor-chunks/side-channel-weakmap","vendor-chunks/side-channel-map","vendor-chunks/side-channel-list","vendor-chunks/safe-buffer","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/mime-types","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream","vendor-chunks/call-bound","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fverify-user%2Froute&page=%2Fapi%2Fverify-user%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fverify-user%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();