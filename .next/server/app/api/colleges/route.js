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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/db */ \"(rsc)/./lib/db.js\");\n\nasync function GET(req) {\n    try {\n        const { searchParams } = new URL(req.url);\n        const rank = parseInt(searchParams.get(\"rank\"));\n        const gender = searchParams.get(\"gender\");\n        const category = searchParams.get(\"category\");\n        const stateId = parseInt(searchParams.get(\"state_id\"));\n        if (isNaN(rank) || isNaN(stateId) || !gender || !category) {\n            return new Response(JSON.stringify({\n                error: \"Missing or invalid input\"\n            }), {\n                status: 400\n            });\n        }\n        // Fetch all matching rows from `institute_cutoffs` joined with `institutes`\n        const { data: cutoffs, error } = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.supabase.from('institute_cutoffs').select(`\n        closing_rank,\n        program_name,\n        category,\n        gender,\n        institute_id,\n        sub_category,\n        round,\n        institutes (\n          display_name,\n          state_id\n        )\n      `).gte('closing_rank', rank).eq('gender', gender).eq('category', category).eq('round', 5);\n        if (error) throw error;\n        // Filter and sort the results manually (since Supabase SQL JOINs have limits)\n        const filtered = cutoffs.filter((ic)=>{\n            const instituteState = ic.institutes?.state_id;\n            const isHS = instituteState === stateId && ic.sub_category === 'HS';\n            const isOS = instituteState !== stateId && ic.sub_category === 'OS';\n            return isHS || isOS;\n        });\n        // Sort by min rank per institute\n        filtered.sort((a, b)=>{\n            const aRank = a.closing_rank;\n            const bRank = b.closing_rank;\n            return aRank - bRank;\n        });\n        // Format with `institute_name` field\n        const result = filtered.map((ic)=>({\n                closing_rank: ic.closing_rank,\n                program_name: ic.program_name,\n                category: ic.category,\n                gender: ic.gender,\n                institute_id: ic.institute_id,\n                sub_category: ic.sub_category,\n                round: ic.round,\n                institute_name: ic.institutes?.display_name || 'Unknown'\n            }));\n        return new Response(JSON.stringify(result), {\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (error) {\n        console.error(\"❌ Supabase API ERROR:\", error.message || error);\n        return new Response(JSON.stringify({\n            error: \"Internal Server Error\"\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvbGxlZ2VzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTJDO0FBRXBDLGVBQWVDLElBQUlDLEdBQUc7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsSUFBSUcsR0FBRztRQUN4QyxNQUFNQyxPQUFPQyxTQUFTSixhQUFhSyxHQUFHLENBQUM7UUFDdkMsTUFBTUMsU0FBU04sYUFBYUssR0FBRyxDQUFDO1FBQ2hDLE1BQU1FLFdBQVdQLGFBQWFLLEdBQUcsQ0FBQztRQUNsQyxNQUFNRyxVQUFVSixTQUFTSixhQUFhSyxHQUFHLENBQUM7UUFFMUMsSUFBSUksTUFBTU4sU0FBU00sTUFBTUQsWUFBWSxDQUFDRixVQUFVLENBQUNDLFVBQVU7WUFDekQsT0FBTyxJQUFJRyxTQUNUQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVDLE9BQU87WUFBMkIsSUFDbkQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDRFQUE0RTtRQUM1RSxNQUFNLEVBQUVDLE1BQU1DLE9BQU8sRUFBRUgsS0FBSyxFQUFFLEdBQUcsTUFBTWhCLDZDQUFRQSxDQUM1Q29CLElBQUksQ0FBQyxxQkFDTEMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztNQVlULENBQUMsRUFDQUMsR0FBRyxDQUFDLGdCQUFnQmhCLE1BQ3BCaUIsRUFBRSxDQUFDLFVBQVVkLFFBQ2JjLEVBQUUsQ0FBQyxZQUFZYixVQUNmYSxFQUFFLENBQUMsU0FBUztRQUVmLElBQUlQLE9BQU8sTUFBTUE7UUFFakIsOEVBQThFO1FBQzlFLE1BQU1RLFdBQVdMLFFBQVFNLE1BQU0sQ0FBQ0MsQ0FBQUE7WUFDOUIsTUFBTUMsaUJBQWlCRCxHQUFHRSxVQUFVLEVBQUVDO1lBQ3RDLE1BQU1DLE9BQU9ILG1CQUFtQmhCLFdBQVdlLEdBQUdLLFlBQVksS0FBSztZQUMvRCxNQUFNQyxPQUFPTCxtQkFBbUJoQixXQUFXZSxHQUFHSyxZQUFZLEtBQUs7WUFDL0QsT0FBT0QsUUFBUUU7UUFDakI7UUFFQSxpQ0FBaUM7UUFDakNSLFNBQVNTLElBQUksQ0FBQyxDQUFDQyxHQUFHQztZQUNoQixNQUFNQyxRQUFRRixFQUFFRyxZQUFZO1lBQzVCLE1BQU1DLFFBQVFILEVBQUVFLFlBQVk7WUFDNUIsT0FBT0QsUUFBUUU7UUFDakI7UUFFQSxxQ0FBcUM7UUFDckMsTUFBTUMsU0FBU2YsU0FBU2dCLEdBQUcsQ0FBQ2QsQ0FBQUEsS0FBTztnQkFDakNXLGNBQWNYLEdBQUdXLFlBQVk7Z0JBQzdCSSxjQUFjZixHQUFHZSxZQUFZO2dCQUM3Qi9CLFVBQVVnQixHQUFHaEIsUUFBUTtnQkFDckJELFFBQVFpQixHQUFHakIsTUFBTTtnQkFDakJpQyxjQUFjaEIsR0FBR2dCLFlBQVk7Z0JBQzdCWCxjQUFjTCxHQUFHSyxZQUFZO2dCQUM3QlksT0FBT2pCLEdBQUdpQixLQUFLO2dCQUNmQyxnQkFBZ0JsQixHQUFHRSxVQUFVLEVBQUVpQixnQkFBZ0I7WUFDakQ7UUFFQSxPQUFPLElBQUloQyxTQUFTQyxLQUFLQyxTQUFTLENBQUN3QixTQUFTO1lBQzFDTyxTQUFTO2dCQUFFLGdCQUFnQjtZQUFtQjtRQUNoRDtJQUVGLEVBQUUsT0FBTzlCLE9BQU87UUFDZCtCLFFBQVEvQixLQUFLLENBQUMseUJBQXlCQSxNQUFNZ0MsT0FBTyxJQUFJaEM7UUFDeEQsT0FBTyxJQUFJSCxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsT0FBTztRQUF3QixJQUFJO1lBQ3RFQyxRQUFRO1FBQ1Y7SUFDRjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2FwcC9hcGkvY29sbGVnZXMvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tICcuLi8uLi8uLi9saWIvZGInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpO1xuICAgIGNvbnN0IHJhbmsgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuZ2V0KFwicmFua1wiKSk7XG4gICAgY29uc3QgZ2VuZGVyID0gc2VhcmNoUGFyYW1zLmdldChcImdlbmRlclwiKTtcbiAgICBjb25zdCBjYXRlZ29yeSA9IHNlYXJjaFBhcmFtcy5nZXQoXCJjYXRlZ29yeVwiKTtcbiAgICBjb25zdCBzdGF0ZUlkID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldChcInN0YXRlX2lkXCIpKTtcblxuICAgIGlmIChpc05hTihyYW5rKSB8fCBpc05hTihzdGF0ZUlkKSB8fCAhZ2VuZGVyIHx8ICFjYXRlZ29yeSkge1xuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJNaXNzaW5nIG9yIGludmFsaWQgaW5wdXRcIiB9KSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEZldGNoIGFsbCBtYXRjaGluZyByb3dzIGZyb20gYGluc3RpdHV0ZV9jdXRvZmZzYCBqb2luZWQgd2l0aCBgaW5zdGl0dXRlc2BcbiAgICBjb25zdCB7IGRhdGE6IGN1dG9mZnMsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oJ2luc3RpdHV0ZV9jdXRvZmZzJylcbiAgICAgIC5zZWxlY3QoYFxuICAgICAgICBjbG9zaW5nX3JhbmssXG4gICAgICAgIHByb2dyYW1fbmFtZSxcbiAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgIGdlbmRlcixcbiAgICAgICAgaW5zdGl0dXRlX2lkLFxuICAgICAgICBzdWJfY2F0ZWdvcnksXG4gICAgICAgIHJvdW5kLFxuICAgICAgICBpbnN0aXR1dGVzIChcbiAgICAgICAgICBkaXNwbGF5X25hbWUsXG4gICAgICAgICAgc3RhdGVfaWRcbiAgICAgICAgKVxuICAgICAgYClcbiAgICAgIC5ndGUoJ2Nsb3NpbmdfcmFuaycsIHJhbmspXG4gICAgICAuZXEoJ2dlbmRlcicsIGdlbmRlcilcbiAgICAgIC5lcSgnY2F0ZWdvcnknLCBjYXRlZ29yeSlcbiAgICAgIC5lcSgncm91bmQnLCA1KTtcblxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAvLyBGaWx0ZXIgYW5kIHNvcnQgdGhlIHJlc3VsdHMgbWFudWFsbHkgKHNpbmNlIFN1cGFiYXNlIFNRTCBKT0lOcyBoYXZlIGxpbWl0cylcbiAgICBjb25zdCBmaWx0ZXJlZCA9IGN1dG9mZnMuZmlsdGVyKGljID0+IHtcbiAgICAgIGNvbnN0IGluc3RpdHV0ZVN0YXRlID0gaWMuaW5zdGl0dXRlcz8uc3RhdGVfaWQ7XG4gICAgICBjb25zdCBpc0hTID0gaW5zdGl0dXRlU3RhdGUgPT09IHN0YXRlSWQgJiYgaWMuc3ViX2NhdGVnb3J5ID09PSAnSFMnO1xuICAgICAgY29uc3QgaXNPUyA9IGluc3RpdHV0ZVN0YXRlICE9PSBzdGF0ZUlkICYmIGljLnN1Yl9jYXRlZ29yeSA9PT0gJ09TJztcbiAgICAgIHJldHVybiBpc0hTIHx8IGlzT1M7XG4gICAgfSk7XG5cbiAgICAvLyBTb3J0IGJ5IG1pbiByYW5rIHBlciBpbnN0aXR1dGVcbiAgICBmaWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBhUmFuayA9IGEuY2xvc2luZ19yYW5rO1xuICAgICAgY29uc3QgYlJhbmsgPSBiLmNsb3NpbmdfcmFuaztcbiAgICAgIHJldHVybiBhUmFuayAtIGJSYW5rO1xuICAgIH0pO1xuXG4gICAgLy8gRm9ybWF0IHdpdGggYGluc3RpdHV0ZV9uYW1lYCBmaWVsZFxuICAgIGNvbnN0IHJlc3VsdCA9IGZpbHRlcmVkLm1hcChpYyA9PiAoe1xuICAgICAgY2xvc2luZ19yYW5rOiBpYy5jbG9zaW5nX3JhbmssXG4gICAgICBwcm9ncmFtX25hbWU6IGljLnByb2dyYW1fbmFtZSxcbiAgICAgIGNhdGVnb3J5OiBpYy5jYXRlZ29yeSxcbiAgICAgIGdlbmRlcjogaWMuZ2VuZGVyLFxuICAgICAgaW5zdGl0dXRlX2lkOiBpYy5pbnN0aXR1dGVfaWQsXG4gICAgICBzdWJfY2F0ZWdvcnk6IGljLnN1Yl9jYXRlZ29yeSxcbiAgICAgIHJvdW5kOiBpYy5yb3VuZCxcbiAgICAgIGluc3RpdHV0ZV9uYW1lOiBpYy5pbnN0aXR1dGVzPy5kaXNwbGF5X25hbWUgfHwgJ1Vua25vd24nLFxuICAgIH0pKTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSwge1xuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIH0pO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBTdXBhYmFzZSBBUEkgRVJST1I6XCIsIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KSwge1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJzdXBhYmFzZSIsIkdFVCIsInJlcSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInJhbmsiLCJwYXJzZUludCIsImdldCIsImdlbmRlciIsImNhdGVnb3J5Iiwic3RhdGVJZCIsImlzTmFOIiwiUmVzcG9uc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJzdGF0dXMiLCJkYXRhIiwiY3V0b2ZmcyIsImZyb20iLCJzZWxlY3QiLCJndGUiLCJlcSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiaWMiLCJpbnN0aXR1dGVTdGF0ZSIsImluc3RpdHV0ZXMiLCJzdGF0ZV9pZCIsImlzSFMiLCJzdWJfY2F0ZWdvcnkiLCJpc09TIiwic29ydCIsImEiLCJiIiwiYVJhbmsiLCJjbG9zaW5nX3JhbmsiLCJiUmFuayIsInJlc3VsdCIsIm1hcCIsInByb2dyYW1fbmFtZSIsImluc3RpdHV0ZV9pZCIsInJvdW5kIiwiaW5zdGl0dXRlX25hbWUiLCJkaXNwbGF5X25hbWUiLCJoZWFkZXJzIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/colleges/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n\nconst db = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool({\n    host: process.env.MYSQL_HOST,\n    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,\n    user: process.env.MYSQL_USER,\n    password: process.env.MYSQL_PASSWORD,\n    database: process.env.MYSQL_DATABASE\n});\n// Supabase Client\nconst supabaseUrl = \"https://fttnzekfbyidxbhqcmak.supabase.co\";\nconst supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dG56ZWtmYnlpZHhiaHFjbWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjg1OTMsImV4cCI6MjA1OTgwNDU5M30.69zNwZjaIw4qQjxA7v7KwlJg3K1FpSSVowwauzIRxRc\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_1__.createClient)(supabaseUrl, supabaseKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFtQztBQUNrQjtBQUU5QyxNQUFNRSxLQUFLRixzREFBZ0IsQ0FBQztJQUNqQ0ksTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBQzVCQyxNQUFNSCxRQUFRQyxHQUFHLENBQUNHLFVBQVUsR0FBR0MsT0FBT0wsUUFBUUMsR0FBRyxDQUFDRyxVQUFVLElBQUk7SUFDaEVFLE1BQU1OLFFBQVFDLEdBQUcsQ0FBQ00sVUFBVTtJQUM1QkMsVUFBVVIsUUFBUUMsR0FBRyxDQUFDUSxjQUFjO0lBQ3BDQyxVQUFVVixRQUFRQyxHQUFHLENBQUNVLGNBQWM7QUFDdEMsR0FBRztBQUVILGtCQUFrQjtBQUNsQixNQUFNQyxjQUFjWiwwQ0FBb0M7QUFDeEQsTUFBTWMsY0FBY2Qsa05BQXlDO0FBRXRELE1BQU1nQixXQUFXcEIsbUVBQVlBLENBQUNnQixhQUFhRSxhQUFhIiwic291cmNlcyI6WyIvVXNlcnMvUHJhei9Eb2N1bWVudHMvdmVkYW1fbGl2ZS9Db2xsZWdlUHJlZGljdG9yL2xpYi9kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbXlzcWwgZnJvbSAnbXlzcWwyL3Byb21pc2UnO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxuZXhwb3J0IGNvbnN0IGRiID0gbXlzcWwuY3JlYXRlUG9vbCh7XG4gIGhvc3Q6IHByb2Nlc3MuZW52Lk1ZU1FMX0hPU1QsXG4gIHBvcnQ6IHByb2Nlc3MuZW52Lk1ZU1FMX1BPUlQgPyBOdW1iZXIocHJvY2Vzcy5lbnYuTVlTUUxfUE9SVCkgOiAzMzA2LFxuICB1c2VyOiBwcm9jZXNzLmVudi5NWVNRTF9VU0VSLFxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuTVlTUUxfUEFTU1dPUkQsXG4gIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5NWVNRTF9EQVRBQkFTRSxcbn0pO1xuXG4vLyBTdXBhYmFzZSBDbGllbnRcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMO1xuY29uc3Qgc3VwYWJhc2VLZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWTtcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSk7XG4iXSwibmFtZXMiOlsibXlzcWwiLCJjcmVhdGVDbGllbnQiLCJkYiIsImNyZWF0ZVBvb2wiLCJob3N0IiwicHJvY2VzcyIsImVudiIsIk1ZU1FMX0hPU1QiLCJwb3J0IiwiTVlTUUxfUE9SVCIsIk51bWJlciIsInVzZXIiLCJNWVNRTF9VU0VSIiwicGFzc3dvcmQiLCJNWVNRTF9QQVNTV09SRCIsImRhdGFiYXNlIiwiTVlTUUxfREFUQUJBU0UiLCJzdXBhYmFzZVVybCIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJzdXBhYmFzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

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

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/whatwg-url","vendor-chunks/named-placeholders","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/webidl-conversions","vendor-chunks/seq-queue","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcolleges%2Froute&page=%2Fapi%2Fcolleges%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcolleges%2Froute.js&appDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FPraz%2FDocuments%2Fvedam_live%2FCollegePredictor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();