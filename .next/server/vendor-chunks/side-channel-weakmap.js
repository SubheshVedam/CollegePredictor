"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/side-channel-weakmap";
exports.ids = ["vendor-chunks/side-channel-weakmap"];
exports.modules = {

/***/ "(rsc)/./node_modules/side-channel-weakmap/index.js":
/*!****************************************************!*\
  !*** ./node_modules/side-channel-weakmap/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar GetIntrinsic = __webpack_require__(/*! get-intrinsic */ \"(rsc)/./node_modules/get-intrinsic/index.js\");\nvar callBound = __webpack_require__(/*! call-bound */ \"(rsc)/./node_modules/call-bound/index.js\");\nvar inspect = __webpack_require__(/*! object-inspect */ \"(rsc)/./node_modules/object-inspect/index.js\");\nvar getSideChannelMap = __webpack_require__(/*! side-channel-map */ \"(rsc)/./node_modules/side-channel-map/index.js\");\n\nvar $TypeError = __webpack_require__(/*! es-errors/type */ \"(rsc)/./node_modules/es-errors/type.js\");\nvar $WeakMap = GetIntrinsic('%WeakMap%', true);\n\n/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => V} */\nvar $weakMapGet = callBound('WeakMap.prototype.get', true);\n/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K, value: V) => void} */\nvar $weakMapSet = callBound('WeakMap.prototype.set', true);\n/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */\nvar $weakMapHas = callBound('WeakMap.prototype.has', true);\n/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */\nvar $weakMapDelete = callBound('WeakMap.prototype.delete', true);\n\n/** @type {import('.')} */\nmodule.exports = $WeakMap\n\t? /** @type {Exclude<import('.'), false>} */ function getSideChannelWeakMap() {\n\t\t/** @typedef {ReturnType<typeof getSideChannelWeakMap>} Channel */\n\t\t/** @typedef {Parameters<Channel['get']>[0]} K */\n\t\t/** @typedef {Parameters<Channel['set']>[1]} V */\n\n\t\t/** @type {WeakMap<K & object, V> | undefined} */ var $wm;\n\t\t/** @type {Channel | undefined} */ var $m;\n\n\t\t/** @type {Channel} */\n\t\tvar channel = {\n\t\t\tassert: function (key) {\n\t\t\t\tif (!channel.has(key)) {\n\t\t\t\t\tthrow new $TypeError('Side channel does not contain ' + inspect(key));\n\t\t\t\t}\n\t\t\t},\n\t\t\t'delete': function (key) {\n\t\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\t\tif ($wm) {\n\t\t\t\t\t\treturn $weakMapDelete($wm, key);\n\t\t\t\t\t}\n\t\t\t\t} else if (getSideChannelMap) {\n\t\t\t\t\tif ($m) {\n\t\t\t\t\t\treturn $m['delete'](key);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn false;\n\t\t\t},\n\t\t\tget: function (key) {\n\t\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\t\tif ($wm) {\n\t\t\t\t\t\treturn $weakMapGet($wm, key);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn $m && $m.get(key);\n\t\t\t},\n\t\t\thas: function (key) {\n\t\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\t\tif ($wm) {\n\t\t\t\t\t\treturn $weakMapHas($wm, key);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn !!$m && $m.has(key);\n\t\t\t},\n\t\t\tset: function (key, value) {\n\t\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\t\tif (!$wm) {\n\t\t\t\t\t\t$wm = new $WeakMap();\n\t\t\t\t\t}\n\t\t\t\t\t$weakMapSet($wm, key, value);\n\t\t\t\t} else if (getSideChannelMap) {\n\t\t\t\t\tif (!$m) {\n\t\t\t\t\t\t$m = getSideChannelMap();\n\t\t\t\t\t}\n\t\t\t\t\t// eslint-disable-next-line no-extra-parens\n\t\t\t\t\t/** @type {NonNullable<typeof $m>} */ ($m).set(key, value);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\t// @ts-expect-error TODO: figure out why this is erroring\n\t\treturn channel;\n\t}\n\t: getSideChannelMap;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc2lkZS1jaGFubmVsLXdlYWttYXAvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsa0VBQWU7QUFDMUMsZ0JBQWdCLG1CQUFPLENBQUMsNERBQVk7QUFDcEMsY0FBYyxtQkFBTyxDQUFDLG9FQUFnQjtBQUN0Qyx3QkFBd0IsbUJBQU8sQ0FBQyx3RUFBa0I7O0FBRWxELGlCQUFpQixtQkFBTyxDQUFDLDhEQUFnQjtBQUN6Qzs7QUFFQSxXQUFXLDREQUE0RDtBQUN2RTtBQUNBLFdBQVcseUVBQXlFO0FBQ3BGO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLGtFQUFrRTtBQUM3RTs7QUFFQSxXQUFXLGFBQWE7QUFDeEI7QUFDQSxjQUFjLDZCQUE2QjtBQUMzQyxnQkFBZ0IsMENBQTBDO0FBQzFELGdCQUFnQiwrQkFBK0I7QUFDL0MsZ0JBQWdCLCtCQUErQjs7QUFFL0MsYUFBYSxvQ0FBb0M7QUFDakQsYUFBYSxxQkFBcUI7O0FBRWxDLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isd0JBQXdCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL1ByYXovRG9jdW1lbnRzL3ZlZGFtX2xpdmUvQ29sbGVnZVByZWRpY3Rvci9ub2RlX21vZHVsZXMvc2lkZS1jaGFubmVsLXdlYWttYXAvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYm91bmQnKTtcbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnb2JqZWN0LWluc3BlY3QnKTtcbnZhciBnZXRTaWRlQ2hhbm5lbE1hcCA9IHJlcXVpcmUoJ3NpZGUtY2hhbm5lbC1tYXAnKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRXZWFrTWFwID0gR2V0SW50cmluc2ljKCclV2Vha01hcCUnLCB0cnVlKTtcblxuLyoqIEB0eXBlIHs8SyBleHRlbmRzIG9iamVjdCwgVj4odGhpc0FyZzogV2Vha01hcDxLLCBWPiwga2V5OiBLKSA9PiBWfSAqL1xudmFyICR3ZWFrTWFwR2V0ID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5nZXQnLCB0cnVlKTtcbi8qKiBAdHlwZSB7PEsgZXh0ZW5kcyBvYmplY3QsIFY+KHRoaXNBcmc6IFdlYWtNYXA8SywgVj4sIGtleTogSywgdmFsdWU6IFYpID0+IHZvaWR9ICovXG52YXIgJHdlYWtNYXBTZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLnNldCcsIHRydWUpO1xuLyoqIEB0eXBlIHs8SyBleHRlbmRzIG9iamVjdCwgVj4odGhpc0FyZzogV2Vha01hcDxLLCBWPiwga2V5OiBLKSA9PiBib29sZWFufSAqL1xudmFyICR3ZWFrTWFwSGFzID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5oYXMnLCB0cnVlKTtcbi8qKiBAdHlwZSB7PEsgZXh0ZW5kcyBvYmplY3QsIFY+KHRoaXNBcmc6IFdlYWtNYXA8SywgVj4sIGtleTogSykgPT4gYm9vbGVhbn0gKi9cbnZhciAkd2Vha01hcERlbGV0ZSA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlJywgdHJ1ZSk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9ICRXZWFrTWFwXG5cdD8gLyoqIEB0eXBlIHtFeGNsdWRlPGltcG9ydCgnLicpLCBmYWxzZT59ICovIGZ1bmN0aW9uIGdldFNpZGVDaGFubmVsV2Vha01hcCgpIHtcblx0XHQvKiogQHR5cGVkZWYge1JldHVyblR5cGU8dHlwZW9mIGdldFNpZGVDaGFubmVsV2Vha01hcD59IENoYW5uZWwgKi9cblx0XHQvKiogQHR5cGVkZWYge1BhcmFtZXRlcnM8Q2hhbm5lbFsnZ2V0J10+WzBdfSBLICovXG5cdFx0LyoqIEB0eXBlZGVmIHtQYXJhbWV0ZXJzPENoYW5uZWxbJ3NldCddPlsxXX0gViAqL1xuXG5cdFx0LyoqIEB0eXBlIHtXZWFrTWFwPEsgJiBvYmplY3QsIFY+IHwgdW5kZWZpbmVkfSAqLyB2YXIgJHdtO1xuXHRcdC8qKiBAdHlwZSB7Q2hhbm5lbCB8IHVuZGVmaW5lZH0gKi8gdmFyICRtO1xuXG5cdFx0LyoqIEB0eXBlIHtDaGFubmVsfSAqL1xuXHRcdHZhciBjaGFubmVsID0ge1xuXHRcdFx0YXNzZXJ0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdGlmICghY2hhbm5lbC5oYXMoa2V5KSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdTaWRlIGNoYW5uZWwgZG9lcyBub3QgY29udGFpbiAnICsgaW5zcGVjdChrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICR3ZWFrTWFwRGVsZXRlKCR3bSwga2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoZ2V0U2lkZUNoYW5uZWxNYXApIHtcblx0XHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRcdHJldHVybiAkbVsnZGVsZXRlJ10oa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRpZiAoJFdlYWtNYXAgJiYga2V5ICYmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyB8fCB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEdldCgkd20sIGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAkbSAmJiAkbS5nZXQoa2V5KTtcblx0XHRcdH0sXG5cdFx0XHRoYXM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0XHRpZiAoJHdtKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBIYXMoJHdtLCBrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gISEkbSAmJiAkbS5oYXMoa2V5KTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdFx0aWYgKCEkd20pIHtcblx0XHRcdFx0XHRcdCR3bSA9IG5ldyAkV2Vha01hcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkd2Vha01hcFNldCgkd20sIGtleSwgdmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGdldFNpZGVDaGFubmVsTWFwKSB7XG5cdFx0XHRcdFx0aWYgKCEkbSkge1xuXHRcdFx0XHRcdFx0JG0gPSBnZXRTaWRlQ2hhbm5lbE1hcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG5cdFx0XHRcdFx0LyoqIEB0eXBlIHtOb25OdWxsYWJsZTx0eXBlb2YgJG0+fSAqLyAoJG0pLnNldChrZXksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRPRE86IGZpZ3VyZSBvdXQgd2h5IHRoaXMgaXMgZXJyb3Jpbmdcblx0XHRyZXR1cm4gY2hhbm5lbDtcblx0fVxuXHQ6IGdldFNpZGVDaGFubmVsTWFwO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/side-channel-weakmap/index.js\n");

/***/ })

};
;