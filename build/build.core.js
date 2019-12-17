(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.__karte_tracker = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @license
 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash include="indexOf,isObject,isString,isNumber,isDate,isFunction,isEqual,keys,extend,clone,cloneDeep,assign,remove,throttle,debounce,filter,omit,some,every,rest,pick,each,map,compact,includes,uniq,isNaN,reduce" -o external/lodash.custom.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
;
(function () {
  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;
  /** Used as the semantic version number. */

  var VERSION = '3.10.1';
  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE = 200;
  /** Used as the `TypeError` message for "Functions" methods. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /** `Object#toString` result references. */

  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  /** Used to match property names within property paths. */

  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
  /** Used to match backslashes in property paths. */

  var reEscapeChar = /\\(\\)?/g;
  /** Used to match `RegExp` flags from their coerced string values. */

  var reFlags = /\w*$/;
  /** Used to detect host constructors (Safari > 5). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used to detect unsigned integer values. */

  var reIsUint = /^\d+$/;
  /** Used to fix the JScript `[[DontEnum]]` bug. */

  var shadowProps = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  /** Used to identify `toStringTag` values supported by `_.clone`. */

  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
  /** Used to determine if values are of the language type `Object`. */

  var objectTypes = {
    'function': true,
    'object': true
  };
  /** Detect free variable `exports`. */

  var freeExports = objectTypes[typeof exports === "undefined" ? "undefined" : _typeof(exports)] && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = objectTypes[typeof module === "undefined" ? "undefined" : _typeof(module)] && module && !module.nodeType && module;
  /** Detect free variable `global` from Node.js. */

  var freeGlobal = freeExports && freeModule && (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object && global;
  /** Detect free variable `self`. */

  var freeSelf = objectTypes[typeof self === "undefined" ? "undefined" : _typeof(self)] && self && self.Object && self;
  /** Detect free variable `window`. */

  var freeWindow = objectTypes[typeof window === "undefined" ? "undefined" : _typeof(window)] && window && window.Object && window;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */

  var root = freeGlobal || freeWindow !== (this && this.window) && freeWindow || freeSelf || this;
  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }

    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }

    return -1;
  }
  /**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */


  function baseToString(value) {
    return value == null ? '' : value + '';
  }
  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */


  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while (fromRight ? index-- : ++index < length) {
      var other = array[index];

      if (other !== other) {
        return index;
      }
    }

    return -1;
  }
  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */


  var isHostObject = function () {
    try {
      Object({
        'toString': 0
      } + '');
    } catch (e) {
      return function () {
        return false;
      };
    }

    return function (value) {
      // IE < 9 presents many host objects as `Object` objects that can coerce
      // to strings despite having improperly defined `toString` methods.
      return typeof value.toString != 'function' && typeof (value + '') == 'string';
    };
  }();
  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */


  function isObjectLike(value) {
    return !!value && _typeof(value) == 'object';
  }
  /**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate free array.
   */


  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }

    return result;
  }
  /*--------------------------------------------------------------------------*/

  /** Used for native method references. */


  var arrayProto = Array.prototype,
      errorProto = Error.prototype,
      objectProto = Object.prototype,
      stringProto = String.prototype;
  /** Used to resolve the decompiled source of functions. */

  var fnToString = Function.prototype.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objToString = objectProto.toString;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /** Native method references. */

  var ArrayBuffer = root.ArrayBuffer,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      Set = getNative(root, 'Set'),
      splice = arrayProto.splice,
      Uint8Array = root.Uint8Array;
  /* Native method references for those with the same name as other `lodash` methods. */

  var nativeCreate = getNative(Object, 'create'),
      nativeFloor = Math.floor,
      nativeIsArray = getNative(Array, 'isArray'),
      nativeKeys = getNative(Object, 'keys'),
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeNow = getNative(Date, 'now');
  /** Used as references for the maximum length and index of an array. */

  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
  /**
   * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
   * of an array-like value.
   */

  var MAX_SAFE_INTEGER = 9007199254740991;
  /** Used to lookup a type array constructors by `toStringTag`. */

  var ctorByTag = {};
  ctorByTag[float32Tag] = root.Float32Array;
  ctorByTag[float64Tag] = root.Float64Array;
  ctorByTag[int8Tag] = root.Int8Array;
  ctorByTag[int16Tag] = root.Int16Array;
  ctorByTag[int32Tag] = root.Int32Array;
  ctorByTag[uint8Tag] = Uint8Array;
  ctorByTag[uint8ClampedTag] = root.Uint8ClampedArray;
  ctorByTag[uint16Tag] = root.Uint16Array;
  ctorByTag[uint32Tag] = root.Uint32Array;
  /** Used to avoid iterating over non-enumerable properties in IE < 9. */

  var nonEnumProps = {};
  nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = {
    'constructor': true,
    'toLocaleString': true,
    'toString': true,
    'valueOf': true
  };
  nonEnumProps[boolTag] = nonEnumProps[stringTag] = {
    'constructor': true,
    'toString': true,
    'valueOf': true
  };
  nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = {
    'constructor': true,
    'toString': true
  };
  nonEnumProps[objectTag] = {
    'constructor': true
  };
  arrayEach(shadowProps, function (key) {
    for (var tag in nonEnumProps) {
      if (hasOwnProperty.call(nonEnumProps, tag)) {
        var props = nonEnumProps[tag];
        props[key] = hasOwnProperty.call(props, key);
      }
    }
  });
  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit chaining.
   * Methods that operate on and return arrays, collections, and functions can
   * be chained together. Methods that retrieve a single value or may return a
   * primitive value will automatically end the chain returning the unwrapped
   * value. Explicit chaining may be enabled using `_.chain`. The execution of
   * chained methods is lazy, that is, execution is deferred until `_#value`
   * is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
   * fusion is an optimization strategy which merge iteratee calls; this can help
   * to avoid the creation of intermediate data structures and greatly reduce the
   * number of iteratee executions.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
   * `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
   * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
   * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
   * and `where`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
   * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
   * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
   * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
   * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
   * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
   * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
   * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
   * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
   * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
   * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
   * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
   * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
   * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
   * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
   * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
   * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
   * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
   * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
   * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
   * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
   * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
   * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
   * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
   * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
   * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
   * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
   * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
   * `unescape`, `uniqueId`, `value`, and `words`
   *
   * The wrapper method `sample` will return a wrapped value when `n` is provided,
   * otherwise an unwrapped value is returned.
   *
   * @name _
   * @constructor
   * @category Chain
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // returns an unwrapped value
   * wrapped.reduce(function(total, n) {
   *   return total + n;
   * });
   * // => 6
   *
   * // returns a wrapped value
   * var squares = wrapped.map(function(n) {
   *   return n * n;
   * });
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */

  function lodash() {} // No operation performed.

  /**
   * An object environment feature flags.
   *
   * @static
   * @memberOf _
   * @type Object
   */


  var support = lodash.support = {};

  (function (x) {
    var Ctor = function Ctor() {
      this.x = x;
    },
        object = {
      '0': x,
      'length': x
    },
        props = [];

    Ctor.prototype = {
      'valueOf': x,
      'y': x
    };

    for (var key in new Ctor()) {
      props.push(key);
    }
    /**
     * Detect if `name` or `message` properties of `Error.prototype` are
     * enumerable by default (IE < 9, Safari < 5.1).
     *
     * @memberOf _.support
     * @type boolean
     */


    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
    /**
     * Detect if `prototype` properties are enumerable by default.
     *
     * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
     * (if the prototype or a property on the prototype has been set)
     * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
     * property to `true`.
     *
     * @memberOf _.support
     * @type boolean
     */

    support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');
    /**
     * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
     *
     * In IE < 9 an object's own properties, shadowing non-enumerable ones,
     * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
     *
     * @memberOf _.support
     * @type boolean
     */

    support.nonEnumShadows = !/valueOf/.test(props);
    /**
     * Detect if `Array#shift` and `Array#splice` augment array-like objects
     * correctly.
     *
     * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
     * `shift()` and `splice()` functions that fail to remove the last element,
     * `value[0]`, of array-like objects even though the "length" property is
     * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
     * while `splice()` is buggy regardless of mode in IE < 9.
     *
     * @memberOf _.support
     * @type boolean
     */

    support.spliceObjects = (splice.call(object, 0, 1), !object[0]);
    /**
     * Detect lack of support for accessing string characters by index.
     *
     * IE < 8 can't access characters by index. IE 8 can only access characters
     * by index on string literals, not string objects.
     *
     * @memberOf _.support
     * @type boolean
     */

    support.unindexedChars = 'x'[0] + Object('x')[0] != 'xx';
  })(1, 0);
  /*------------------------------------------------------------------------*/

  /**
   *
   * Creates a cache object to store unique values.
   *
   * @private
   * @param {Array} [values] The values to cache.
   */


  function SetCache(values) {
    var length = values ? values.length : 0;
    this.data = {
      'hash': nativeCreate(null),
      'set': new Set()
    };

    while (length--) {
      this.push(values[length]);
    }
  }
  /**
   * Checks if `value` is in `cache` mimicking the return signature of
   * `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache to search.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */


  function cacheIndexOf(cache, value) {
    var data = cache.data,
        result = typeof value == 'string' || isObject(value) ? data.set.has(value) : data.hash[value];
    return result ? 0 : -1;
  }
  /**
   * Adds `value` to the cache.
   *
   * @private
   * @name push
   * @memberOf SetCache
   * @param {*} value The value to cache.
   */


  function cachePush(value) {
    var data = this.data;

    if (typeof value == 'string' || isObject(value)) {
      data.set.add(value);
    } else {
      data.hash[value] = true;
    }
  }
  /*------------------------------------------------------------------------*/

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */


  function arrayCopy(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));

    while (++index < length) {
      array[index] = source[index];
    }

    return array;
  }
  /**
   * A specialized version of `_.forEach` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */


  function arrayEach(array, iteratee) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }

    return array;
  }
  /**
   * A specialized version of `_.every` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */


  function arrayEvery(array, predicate) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }

    return true;
  }
  /**
   * A specialized version of `_.filter` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */


  function arrayFilter(array, predicate) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result[++resIndex] = value;
      }
    }

    return result;
  }
  /**
   * A specialized version of `_.map` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */


  function arrayMap(array, iteratee) {
    var index = -1,
        length = array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }
  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */


  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }
  /**
   * A specialized version of `_.reduce` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initFromArray] Specify using the first element of `array`
   *  as the initial value.
   * @returns {*} Returns the accumulated value.
   */


  function arrayReduce(array, iteratee, accumulator, initFromArray) {
    var index = -1,
        length = array.length;

    if (initFromArray && length) {
      accumulator = array[++index];
    }

    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }

    return accumulator;
  }
  /**
   * A specialized version of `_.some` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */


  function arraySome(array, predicate) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }

    return false;
  }
  /**
   * A specialized version of `_.assign` for customizing assigned values without
   * support for argument juggling, multiple sources, and `this` binding `customizer`
   * functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   */


  function assignWith(object, source, customizer) {
    var index = -1,
        props = keys(source),
        length = props.length;

    while (++index < length) {
      var key = props[index],
          value = object[key],
          result = customizer(value, source[key], key, object, source);

      if ((result === result ? result !== value : value === value) || value === undefined && !(key in object)) {
        object[key] = result;
      }
    }

    return object;
  }
  /**
   * The base implementation of `_.assign` without support for argument juggling,
   * multiple sources, and `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */


  function baseAssign(object, source) {
    return source == null ? object : baseCopy(source, keys(source), object);
  }
  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property names to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @returns {Object} Returns `object`.
   */


  function baseCopy(source, props, object) {
    object || (object = {});
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      object[key] = source[key];
    }

    return object;
  }
  /**
   * The base implementation of `_.callback` which supports specifying the
   * number of arguments to provide to `func`.
   *
   * @private
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {number} [argCount] The number of arguments to provide to `func`.
   * @returns {Function} Returns the callback.
   */


  function baseCallback(func, thisArg, argCount) {
    var type = _typeof(func);

    if (type == 'function') {
      return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
    }

    if (func == null) {
      return identity;
    }

    if (type == 'object') {
      return baseMatches(func);
    }

    return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
  }
  /**
   * The base implementation of `_.clone` without support for argument juggling
   * and `this` binding `customizer` functions.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {Function} [customizer] The function to customize cloning values.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The object `value` belongs to.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates clones with source counterparts.
   * @returns {*} Returns the cloned value.
   */


  function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
    var result;

    if (customizer) {
      result = object ? customizer(value, key, object) : customizer(value);
    }

    if (result !== undefined) {
      return result;
    }

    if (!isObject(value)) {
      return value;
    }

    var isArr = isArray(value);

    if (isArr) {
      result = initCloneArray(value);

      if (!isDeep) {
        return arrayCopy(value, result);
      }
    } else {
      var tag = objToString.call(value),
          isFunc = tag == funcTag;

      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }

        result = initCloneObject(isFunc ? {} : value);

        if (!isDeep) {
          return baseAssign(result, value);
        }
      } else {
        return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
      }
    } // Check for circular references and return its corresponding clone.


    stackA || (stackA = []);
    stackB || (stackB = []);
    var length = stackA.length;

    while (length--) {
      if (stackA[length] == value) {
        return stackB[length];
      }
    } // Add the source value to the stack of traversed objects and associate it with its clone.


    stackA.push(value);
    stackB.push(result); // Recursively populate clone (susceptible to call stack limits).

    (isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
      result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
    });
    return result;
  }
  /**
   * The base implementation of `_.difference` which accepts a single array
   * of values to exclude.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   */


  function baseDifference(array, values) {
    var length = array ? array.length : 0,
        result = [];

    if (!length) {
      return result;
    }

    var index = -1,
        indexOf = getIndexOf(),
        isCommon = indexOf === baseIndexOf,
        cache = isCommon && values.length >= LARGE_ARRAY_SIZE ? createCache(values) : null,
        valuesLength = values.length;

    if (cache) {
      indexOf = cacheIndexOf;
      isCommon = false;
      values = cache;
    }

    outer: while (++index < length) {
      var value = array[index];

      if (isCommon && value === value) {
        var valuesIndex = valuesLength;

        while (valuesIndex--) {
          if (values[valuesIndex] === value) {
            continue outer;
          }
        }

        result.push(value);
      } else if (indexOf(values, value, 0) < 0) {
        result.push(value);
      }
    }

    return result;
  }
  /**
   * The base implementation of `_.forEach` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object|string} Returns `collection`.
   */


  var baseEach = createBaseEach(baseForOwn);
  /**
   * The base implementation of `_.every` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */

  function baseEvery(collection, predicate) {
    var result = true;
    baseEach(collection, function (value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }
  /**
   * The base implementation of `_.filter` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */


  function baseFilter(collection, predicate) {
    var result = [];
    baseEach(collection, function (value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }
  /**
   * The base implementation of `_.flatten` with added support for restricting
   * flattening and specifying the start index.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {boolean} [isDeep] Specify a deep flatten.
   * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */


  function baseFlatten(array, isDeep, isStrict, result) {
    result || (result = []);
    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index];

      if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
        if (isDeep) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, isDeep, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }

    return result;
  }
  /**
   * The base implementation of `baseForIn` and `baseForOwn` which iterates
   * over `object` properties returned by `keysFunc` invoking `iteratee` for
   * each property. Iteratee functions may exit iteration early by explicitly
   * returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */


  var baseFor = createBaseFor();
  /**
   * The base implementation of `_.forIn` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */

  function baseForIn(object, iteratee) {
    return baseFor(object, iteratee, keysIn);
  }
  /**
   * The base implementation of `_.forOwn` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */


  function baseForOwn(object, iteratee) {
    return baseFor(object, iteratee, keys);
  }
  /**
   * The base implementation of `get` without support for string paths
   * and default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path of the property to get.
   * @param {string} [pathKey] The key representation of path.
   * @returns {*} Returns the resolved value.
   */


  function baseGet(object, path, pathKey) {
    if (object == null) {
      return;
    }

    object = toObject(object);

    if (pathKey !== undefined && pathKey in object) {
      path = [pathKey];
    }

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = toObject(object)[path[index++]];
    }

    return index && index == length ? object : undefined;
  }
  /**
   * The base implementation of `_.isEqual` without support for `this` binding
   * `customizer` functions.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */


  function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
    if (value === other) {
      return true;
    }

    if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }

    return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
  }
  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing objects.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `value` objects.
   * @param {Array} [stackB=[]] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */


  function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = arrayTag,
        othTag = arrayTag;

    if (!objIsArr) {
      objTag = objToString.call(object);

      if (objTag == argsTag) {
        objTag = objectTag;
      } else if (objTag != objectTag) {
        objIsArr = isTypedArray(object);
      }
    }

    if (!othIsArr) {
      othTag = objToString.call(other);

      if (othTag == argsTag) {
        othTag = objectTag;
      } else if (othTag != objectTag) {
        othIsArr = isTypedArray(other);
      }
    }

    var objIsObj = objTag == objectTag && !isHostObject(object),
        othIsObj = othTag == objectTag && !isHostObject(other),
        isSameTag = objTag == othTag;

    if (isSameTag && !(objIsArr || objIsObj)) {
      return equalByTag(object, other, objTag);
    }

    if (!isLoose) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
      }
    }

    if (!isSameTag) {
      return false;
    } // Assume cyclic values are equal.
    // For more information on detecting circular references see https://es5.github.io/#JO.


    stackA || (stackA = []);
    stackB || (stackB = []);
    var length = stackA.length;

    while (length--) {
      if (stackA[length] == object) {
        return stackB[length] == other;
      }
    } // Add `object` and `other` to the stack of traversed objects.


    stackA.push(object);
    stackB.push(other);
    var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
    stackA.pop();
    stackB.pop();
    return result;
  }
  /**
   * The base implementation of `_.isMatch` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Array} matchData The propery names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparing objects.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */


  function baseIsMatch(object, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }

    object = toObject(object);

    while (index--) {
      var data = matchData[index];

      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }

    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var result = customizer ? customizer(objValue, srcValue, key) : undefined;

        if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
          return false;
        }
      }
    }

    return true;
  }
  /**
   * The base implementation of `_.map` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */


  function baseMap(collection, iteratee) {
    var index = -1,
        result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }
  /**
   * The base implementation of `_.matches` which does not clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   */


  function baseMatches(source) {
    var matchData = getMatchData(source);

    if (matchData.length == 1 && matchData[0][2]) {
      var key = matchData[0][0],
          value = matchData[0][1];
      return function (object) {
        if (object == null) {
          return false;
        }

        object = toObject(object);
        return object[key] === value && (value !== undefined || key in object);
      };
    }

    return function (object) {
      return baseIsMatch(object, matchData);
    };
  }
  /**
   * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to compare.
   * @returns {Function} Returns the new function.
   */


  function baseMatchesProperty(path, srcValue) {
    var isArr = isArray(path),
        isCommon = isKey(path) && isStrictComparable(srcValue),
        pathKey = path + '';
    path = toPath(path);
    return function (object) {
      if (object == null) {
        return false;
      }

      var key = pathKey;
      object = toObject(object);

      if ((isArr || !isCommon) && !(key in object)) {
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));

        if (object == null) {
          return false;
        }

        key = last(path);
        object = toObject(object);
      }

      return object[key] === srcValue ? srcValue !== undefined || key in object : baseIsEqual(srcValue, object[key], undefined, true);
    };
  }
  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new function.
   */


  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : toObject(object)[key];
    };
  }
  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new function.
   */


  function basePropertyDeep(path) {
    var pathKey = path + '';
    path = toPath(path);
    return function (object) {
      return baseGet(object, path, pathKey);
    };
  }
  /**
   * The base implementation of `_.pullAt` without support for individual
   * index arguments and capturing the removed elements.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {number[]} indexes The indexes of elements to remove.
   * @returns {Array} Returns `array`.
   */


  function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0;

    while (length--) {
      var index = indexes[length];

      if (index != previous && isIndex(index)) {
        var previous = index;
        splice.call(array, index, 1);
      }
    }

    return array;
  }
  /**
   * The base implementation of `_.reduce` and `_.reduceRight` without support
   * for callback shorthands and `this` binding, which iterates over `collection`
   * using the provided `eachFunc`.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initFromCollection Specify using the first or last element
   *  of `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */


  function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
    eachFunc(collection, function (value, index, collection) {
      accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }
  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */


  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;
    start = start == null ? 0 : +start || 0;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }

    end = end === undefined || end > length ? length : +end || 0;

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
  /**
   * The base implementation of `_.some` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */


  function baseSome(collection, predicate) {
    var result;
    baseEach(collection, function (value, index, collection) {
      result = predicate(value, index, collection);
      return !result;
    });
    return !!result;
  }
  /**
   * The base implementation of `_.uniq` without support for callback shorthands
   * and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate free array.
   */


  function baseUniq(array, iteratee) {
    var index = -1,
        indexOf = getIndexOf(),
        length = array.length,
        isCommon = indexOf === baseIndexOf,
        isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
        seen = isLarge ? createCache() : null,
        result = [];

    if (seen) {
      indexOf = cacheIndexOf;
      isCommon = false;
    } else {
      isLarge = false;
      seen = iteratee ? [] : result;
    }

    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (isCommon && value === value) {
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
      } else if (indexOf(seen, computed, 0) < 0) {
        if (iteratee || isLarge) {
          seen.push(computed);
        }

        result.push(value);
      }
    }

    return result;
  }
  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */


  function baseValues(object, props) {
    var index = -1,
        length = props.length,
        result = Array(length);

    while (++index < length) {
      result[index] = object[props[index]];
    }

    return result;
  }
  /**
   * Performs a binary search of `array` to determine the index at which `value`
   * should be inserted into `array` in order to maintain its sort order.
   *
   * @private
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {boolean} [retHighest] Specify returning the highest qualified index.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   */


  function binaryIndex(array, value, retHighest) {
    var low = 0,
        high = array ? array.length : low;

    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
      while (low < high) {
        var mid = low + high >>> 1,
            computed = array[mid];

        if ((retHighest ? computed <= value : computed < value) && computed !== null) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }

      return high;
    }

    return binaryIndexBy(array, value, identity, retHighest);
  }
  /**
   * This function is like `binaryIndex` except that it invokes `iteratee` for
   * `value` and each element of `array` to compute their sort ranking. The
   * iteratee is invoked with one argument; (value).
   *
   * @private
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {boolean} [retHighest] Specify returning the highest qualified index.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   */


  function binaryIndexBy(array, value, iteratee, retHighest) {
    value = iteratee(value);
    var low = 0,
        high = array ? array.length : 0,
        valIsNaN = value !== value,
        valIsNull = value === null,
        valIsUndef = value === undefined;

    while (low < high) {
      var mid = nativeFloor((low + high) / 2),
          computed = iteratee(array[mid]),
          isDef = computed !== undefined,
          isReflexive = computed === computed;

      if (valIsNaN) {
        var setLow = isReflexive || retHighest;
      } else if (valIsNull) {
        setLow = isReflexive && isDef && (retHighest || computed != null);
      } else if (valIsUndef) {
        setLow = isReflexive && (retHighest || isDef);
      } else if (computed == null) {
        setLow = false;
      } else {
        setLow = retHighest ? computed <= value : computed < value;
      }

      if (setLow) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return nativeMin(high, MAX_ARRAY_INDEX);
  }
  /**
   * A specialized version of `baseCallback` which only supports `this` binding
   * and specifying the number of arguments to provide to `func`.
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {number} [argCount] The number of arguments to provide to `func`.
   * @returns {Function} Returns the callback.
   */


  function bindCallback(func, thisArg, argCount) {
    if (typeof func != 'function') {
      return identity;
    }

    if (thisArg === undefined) {
      return func;
    }

    switch (argCount) {
      case 1:
        return function (value) {
          return func.call(thisArg, value);
        };

      case 3:
        return function (value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };

      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };

      case 5:
        return function (value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
    }

    return function () {
      return func.apply(thisArg, arguments);
    };
  }
  /**
   * Creates a clone of the given array buffer.
   *
   * @private
   * @param {ArrayBuffer} buffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */


  function bufferClone(buffer) {
    var result = new ArrayBuffer(buffer.byteLength),
        view = new Uint8Array(result);
    view.set(new Uint8Array(buffer));
    return result;
  }
  /**
   * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */


  function createAssigner(assigner) {
    return restParam(function (object, sources) {
      var index = -1,
          length = object == null ? 0 : sources.length,
          customizer = length > 2 ? sources[length - 2] : undefined,
          guard = length > 2 ? sources[2] : undefined,
          thisArg = length > 1 ? sources[length - 1] : undefined;

      if (typeof customizer == 'function') {
        customizer = bindCallback(customizer, thisArg, 5);
        length -= 2;
      } else {
        customizer = typeof thisArg == 'function' ? thisArg : undefined;
        length -= customizer ? 1 : 0;
      }

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];

        if (source) {
          assigner(object, source, customizer);
        }
      }

      return object;
    });
  }
  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */


  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      var length = collection ? getLength(collection) : 0;

      if (!isLength(length)) {
        return eachFunc(collection, iteratee);
      }

      var index = fromRight ? length : -1,
          iterable = toObject(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }

      return collection;
    };
  }
  /**
   * Creates a base function for `_.forIn` or `_.forInRight`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */


  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var iterable = toObject(object),
          props = keysFunc(object),
          length = props.length,
          index = fromRight ? length : -1;

      while (fromRight ? index-- : ++index < length) {
        var key = props[index];

        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }

      return object;
    };
  }
  /**
   * Creates a `Set` cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [values] The values to cache.
   * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
   */


  function createCache(values) {
    return nativeCreate && Set ? new SetCache(values) : null;
  }
  /**
   * Creates a function for `_.forEach` or `_.forEachRight`.
   *
   * @private
   * @param {Function} arrayFunc The function to iterate over an array.
   * @param {Function} eachFunc The function to iterate over a collection.
   * @returns {Function} Returns the new each function.
   */


  function createForEach(arrayFunc, eachFunc) {
    return function (collection, iteratee, thisArg) {
      return typeof iteratee == 'function' && thisArg === undefined && isArray(collection) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
    };
  }
  /**
   * Creates a function for `_.reduce` or `_.reduceRight`.
   *
   * @private
   * @param {Function} arrayFunc The function to iterate over an array.
   * @param {Function} eachFunc The function to iterate over a collection.
   * @returns {Function} Returns the new each function.
   */


  function createReduce(arrayFunc, eachFunc) {
    return function (collection, iteratee, accumulator, thisArg) {
      var initFromArray = arguments.length < 3;
      return typeof iteratee == 'function' && thisArg === undefined && isArray(collection) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
    };
  }
  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing arrays.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */


  function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
    var index = -1,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
      return false;
    } // Ignore non-index properties.


    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index],
          result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

      if (result !== undefined) {
        if (result) {
          continue;
        }

        return false;
      } // Recursively compare arrays (susceptible to call stack limits).


      if (isLoose) {
        if (!arraySome(other, function (othValue) {
          return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
        })) {
          return false;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
        return false;
      }
    }

    return true;
  }
  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */


  function equalByTag(object, other, tag) {
    switch (tag) {
      case boolTag:
      case dateTag:
        // Coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
        return +object == +other;

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case numberTag:
        // Treat `NaN` vs. `NaN` as equal.
        return object != +object ? other != +other : object == +other;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings primitives and string
        // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
        return object == other + '';
    }

    return false;
  }
  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */


  function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
    var objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isLoose) {
      return false;
    }

    var index = objLength;

    while (index--) {
      var key = objProps[index];

      if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }

    var skipCtor = isLoose;

    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key],
          result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined; // Recursively compare objects (susceptible to call stack limits).

      if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
        return false;
      }

      skipCtor || (skipCtor = key == 'constructor');
    }

    if (!skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        return false;
      }
    }

    return true;
  }
  /**
   * Gets the appropriate "callback" function. If the `_.callback` method is
   * customized this function returns the custom method, otherwise it returns
   * the `baseCallback` function. If arguments are provided the chosen function
   * is invoked with them and its result is returned.
   *
   * @private
   * @returns {Function} Returns the chosen function or its result.
   */


  function getCallback(func, thisArg, argCount) {
    var result = lodash.callback || callback;
    result = result === callback ? baseCallback : result;
    return argCount ? result(func, thisArg, argCount) : result;
  }
  /**
   * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
   * customized this function returns the custom method, otherwise it returns
   * the `baseIndexOf` function. If arguments are provided the chosen function
   * is invoked with them and its result is returned.
   *
   * @private
   * @returns {Function|number} Returns the chosen function or its result.
   */


  function getIndexOf(collection, target, fromIndex) {
    var result = lodash.indexOf || indexOf;
    result = result === indexOf ? baseIndexOf : result;
    return collection ? result(collection, target, fromIndex) : result;
  }
  /**
   * Gets the "length" property value of `object`.
   *
   * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
   * that affects Safari on at least iOS 8.1-8.3 ARM64.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {*} Returns the "length" value.
   */


  var getLength = baseProperty('length');
  /**
   * Gets the propery names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */

  function getMatchData(object) {
    var result = pairs(object),
        length = result.length;

    while (length--) {
      result[length][2] = isStrictComparable(result[length][1]);
    }

    return result;
  }
  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */


  function getNative(object, key) {
    var value = object == null ? undefined : object[key];
    return isNative(value) ? value : undefined;
  }
  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */


  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length); // Add array properties assigned by `RegExp#exec`.

    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }

    return result;
  }
  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */


  function initCloneObject(object) {
    var Ctor = object.constructor;

    if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
      Ctor = Object;
    }

    return new Ctor();
  }
  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */


  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;

    switch (tag) {
      case arrayBufferTag:
        return bufferClone(object);

      case boolTag:
      case dateTag:
        return new Ctor(+object);

      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        // Safari 5 mobile incorrectly has `Object` as the constructor of typed arrays.
        if (Ctor instanceof Ctor) {
          Ctor = ctorByTag[tag];
        }

        var buffer = object.buffer;
        return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

      case numberTag:
      case stringTag:
        return new Ctor(object);

      case regexpTag:
        var result = new Ctor(object.source, reFlags.exec(object));
        result.lastIndex = object.lastIndex;
    }

    return result;
  }
  /**
   * Checks if `value` is array-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   */


  function isArrayLike(value) {
    return value != null && isLength(getLength(value));
  }
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */


  function isIndex(value, length) {
    value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return value > -1 && value % 1 == 0 && value < length;
  }
  /**
   * Checks if the provided arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
   */


  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }

    var type = _typeof(index);

    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
      var other = object[index];
      return value === value ? value === other : other !== other;
    }

    return false;
  }
  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */


  function isKey(value, object) {
    var type = _typeof(value);

    if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
      return true;
    }

    if (isArray(value)) {
      return false;
    }

    var result = !reIsDeepProp.test(value);
    return result || object != null && value in toObject(object);
  }
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   */


  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */


  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }
  /**
   * A specialized version of `_.pick` which picks `object` properties specified
   * by `props`.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} props The property names to pick.
   * @returns {Object} Returns the new object.
   */


  function pickByArray(object, props) {
    object = toObject(object);
    var index = -1,
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index];

      if (key in object) {
        result[key] = object[key];
      }
    }

    return result;
  }
  /**
   * A specialized version of `_.pick` which picks `object` properties `predicate`
   * returns truthy for.
   *
   * @private
   * @param {Object} object The source object.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Object} Returns the new object.
   */


  function pickByCallback(object, predicate) {
    var result = {};
    baseForIn(object, function (value, key, object) {
      if (predicate(value, key, object)) {
        result[key] = value;
      }
    });
    return result;
  }
  /**
   * A fallback implementation of `Object.keys` which creates an array of the
   * own enumerable property names of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */


  function shimKeys(object) {
    var props = keysIn(object),
        propsLength = props.length,
        length = propsLength && object.length;
    var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object) || isString(object));
    var index = -1,
        result = [];

    while (++index < propsLength) {
      var key = props[index];

      if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
        result.push(key);
      }
    }

    return result;
  }
  /**
   * Converts `value` to an object if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Object} Returns the object.
   */


  function toObject(value) {
    if (lodash.support.unindexedChars && isString(value)) {
      var index = -1,
          length = value.length,
          result = Object(value);

      while (++index < length) {
        result[index] = value.charAt(index);
      }

      return result;
    }

    return isObject(value) ? value : Object(value);
  }
  /**
   * Converts `value` to property path array if it's not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Array} Returns the property path array.
   */


  function toPath(value) {
    if (isArray(value)) {
      return value;
    }

    var result = [];
    baseToString(value).replace(rePropName, function (match, number, quote, string) {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  }
  /*------------------------------------------------------------------------*/

  /**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are falsey.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to compact.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */


  function compact(array) {
    var index = -1,
        length = array ? array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (value) {
        result[++resIndex] = value;
      }
    }

    return result;
  }
  /**
   * Creates a slice of `array` with `n` elements dropped from the beginning.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to drop.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.drop([1, 2, 3]);
   * // => [2, 3]
   *
   * _.drop([1, 2, 3], 2);
   * // => [3]
   *
   * _.drop([1, 2, 3], 5);
   * // => []
   *
   * _.drop([1, 2, 3], 0);
   * // => [1, 2, 3]
   */


  function drop(array, n, guard) {
    var length = array ? array.length : 0;

    if (!length) {
      return [];
    }

    if (guard ? isIterateeCall(array, n, guard) : n == null) {
      n = 1;
    }

    return baseSlice(array, n < 0 ? 0 : n);
  }
  /**
   * Gets the index at which the first occurrence of `value` is found in `array`
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons. If `fromIndex` is negative, it's used as the offset
   * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
   * performs a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 1, 2], 2);
   * // => 1
   *
   * // using `fromIndex`
   * _.indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   *
   * // performing a binary search
   * _.indexOf([1, 1, 2, 2], 2, true);
   * // => 2
   */


  function indexOf(array, value, fromIndex) {
    var length = array ? array.length : 0;

    if (!length) {
      return -1;
    }

    if (typeof fromIndex == 'number') {
      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
    } else if (fromIndex) {
      var index = binaryIndex(array, value);

      if (index < length && (value === value ? value === array[index] : array[index] !== array[index])) {
        return index;
      }

      return -1;
    }

    return baseIndexOf(array, value, fromIndex || 0);
  }
  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */


  function last(array) {
    var length = array ? array.length : 0;
    return length ? array[length - 1] : undefined;
  }
  /**
   * Removes all elements from `array` that `predicate` returns truthy for
   * and returns an array of the removed elements. The predicate is bound to
   * `thisArg` and invoked with three arguments: (value, index, array).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * **Note:** Unlike `_.filter`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to modify.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = [1, 2, 3, 4];
   * var evens = _.remove(array, function(n) {
   *   return n % 2 == 0;
   * });
   *
   * console.log(array);
   * // => [1, 3]
   *
   * console.log(evens);
   * // => [2, 4]
   */


  function remove(array, predicate, thisArg) {
    var result = [];

    if (!(array && array.length)) {
      return result;
    }

    var index = -1,
        indexes = [],
        length = array.length;
    predicate = getCallback(predicate, thisArg, 3);

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result.push(value);
        indexes.push(index);
      }
    }

    basePullAt(array, indexes);
    return result;
  }
  /**
   * Gets all but the first element of `array`.
   *
   * @static
   * @memberOf _
   * @alias tail
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.rest([1, 2, 3]);
   * // => [2, 3]
   */


  function rest(array) {
    return drop(array, 1);
  }
  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurence of each element
   * is kept. Providing `true` for `isSorted` performs a faster search algorithm
   * for sorted arrays. If an iteratee function is provided it's invoked for
   * each element in the array to generate the criterion by which uniqueness
   * is computed. The `iteratee` is bound to `thisArg` and invoked with three
   * arguments: (value, index, array).
   *
   * If a property name is provided for `iteratee` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `iteratee` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {boolean} [isSorted] Specify the array is sorted.
   * @param {Function|Object|string} [iteratee] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array} Returns the new duplicate-value-free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   *
   * // using `isSorted`
   * _.uniq([1, 1, 2], true);
   * // => [1, 2]
   *
   * // using an iteratee function
   * _.uniq([1, 2.5, 1.5, 2], function(n) {
   *   return this.floor(n);
   * }, Math);
   * // => [1, 2.5]
   *
   * // using the `_.property` callback shorthand
   * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */


  function uniq(array, isSorted, iteratee, thisArg) {
    var length = array ? array.length : 0;

    if (!length) {
      return [];
    }

    if (isSorted != null && typeof isSorted != 'boolean') {
      thisArg = iteratee;
      iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
      isSorted = false;
    }

    var callback = getCallback();

    if (!(iteratee == null && callback === baseCallback)) {
      iteratee = callback(iteratee, thisArg, 3);
    }

    return isSorted && getIndexOf() === baseIndexOf ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
  }
  /*------------------------------------------------------------------------*/

  /**
   * Checks if `predicate` returns truthy for **all** elements of `collection`.
   * The predicate is bound to `thisArg` and invoked with three arguments:
   * (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'active': false },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // using the `_.matches` callback shorthand
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // using the `_.matchesProperty` callback shorthand
   * _.every(users, 'active', false);
   * // => true
   *
   * // using the `_.property` callback shorthand
   * _.every(users, 'active');
   * // => false
   */


  function every(collection, predicate, thisArg) {
    var func = isArray(collection) ? arrayEvery : baseEvery;

    if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
      predicate = undefined;
    }

    if (typeof predicate != 'function' || thisArg !== undefined) {
      predicate = getCallback(predicate, thisArg, 3);
    }

    return func(collection, predicate);
  }
  /**
   * Iterates over elements of `collection`, returning an array of all elements
   * `predicate` returns truthy for. The predicate is bound to `thisArg` and
   * invoked with three arguments: (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Array} Returns the new filtered array.
   * @example
   *
   * _.filter([4, 5, 6], function(n) {
   *   return n % 2 == 0;
   * });
   * // => [4, 6]
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // using the `_.matches` callback shorthand
   * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
   * // => ['barney']
   *
   * // using the `_.matchesProperty` callback shorthand
   * _.pluck(_.filter(users, 'active', false), 'user');
   * // => ['fred']
   *
   * // using the `_.property` callback shorthand
   * _.pluck(_.filter(users, 'active'), 'user');
   * // => ['barney']
   */


  function filter(collection, predicate, thisArg) {
    var func = isArray(collection) ? arrayFilter : baseFilter;
    predicate = getCallback(predicate, thisArg, 3);
    return func(collection, predicate);
  }
  /**
   * Iterates over elements of `collection` invoking `iteratee` for each element.
   * The `iteratee` is bound to `thisArg` and invoked with three arguments:
   * (value, index|key, collection). Iteratee functions may exit iteration early
   * by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length" property
   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
   * may be used for object iteration.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2]).forEach(function(n) {
   *   console.log(n);
   * }).value();
   * // => logs each value from left to right and returns the array
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
   *   console.log(n, key);
   * });
   * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
   */


  var forEach = createForEach(arrayEach, baseEach);
  /**
   * Checks if `target` is in `collection` using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons. If `fromIndex` is negative, it's used as the offset
   * from the end of `collection`.
   *
   * @static
   * @memberOf _
   * @alias contains, include
   * @category Collection
   * @param {Array|Object|string} collection The collection to search.
   * @param {*} target The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
   * @returns {boolean} Returns `true` if a matching element is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
   * // => true
   *
   * _.includes('pebbles', 'eb');
   * // => true
   */

  function includes(collection, target, fromIndex, guard) {
    var length = collection ? getLength(collection) : 0;

    if (!isLength(length)) {
      collection = values(collection);
      length = collection.length;
    }

    if (typeof fromIndex != 'number' || guard && isIterateeCall(target, fromIndex, guard)) {
      fromIndex = 0;
    } else {
      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex || 0;
    }

    return typeof collection == 'string' || !isArray(collection) && isString(collection) ? fromIndex <= length && collection.indexOf(target, fromIndex) > -1 : !!length && getIndexOf(collection, target, fromIndex) > -1;
  }
  /**
   * Creates an array of values by running each element in `collection` through
   * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
   * arguments: (value, index|key, collection).
   *
   * If a property name is provided for `iteratee` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `iteratee` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
   * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
   * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
   * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
   * `sum`, `uniq`, and `words`
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [iteratee=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function timesThree(n) {
   *   return n * 3;
   * }
   *
   * _.map([1, 2], timesThree);
   * // => [3, 6]
   *
   * _.map({ 'a': 1, 'b': 2 }, timesThree);
   * // => [3, 6] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // using the `_.property` callback shorthand
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */


  function map(collection, iteratee, thisArg) {
    var func = isArray(collection) ? arrayMap : baseMap;
    iteratee = getCallback(iteratee, thisArg, 3);
    return func(collection, iteratee);
  }
  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` through `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not provided the first element of `collection` is used as the initial
   * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
   * and `sortByOrder`
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * _.reduce([1, 2], function(total, n) {
   *   return total + n;
   * });
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
   *   result[key] = n * 3;
   *   return result;
   * }, {});
   * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
   */


  var reduce = createReduce(arrayReduce, baseEach);
  /**
   * Checks if `predicate` returns truthy for **any** element of `collection`.
   * The function returns as soon as it finds a passing value and does not iterate
   * over the entire collection. The predicate is bound to `thisArg` and invoked
   * with three arguments: (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // using the `_.matches` callback shorthand
   * _.some(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // using the `_.matchesProperty` callback shorthand
   * _.some(users, 'active', false);
   * // => true
   *
   * // using the `_.property` callback shorthand
   * _.some(users, 'active');
   * // => true
   */

  function some(collection, predicate, thisArg) {
    var func = isArray(collection) ? arraySome : baseSome;

    if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
      predicate = undefined;
    }

    if (typeof predicate != 'function' || thisArg !== undefined) {
      predicate = getCallback(predicate, thisArg, 3);
    }

    return func(collection, predicate);
  }
  /*------------------------------------------------------------------------*/

  /**
   * Gets the number of milliseconds that have elapsed since the Unix epoch
   * (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @category Date
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => logs the number of milliseconds it took for the deferred function to be invoked
   */


  var now = nativeNow || function () {
    return new Date().getTime();
  };
  /*------------------------------------------------------------------------*/

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed invocations. Provide an options object to indicate that `func`
   * should be invoked on the leading and/or trailing edge of the `wait` timeout.
   * Subsequent calls to the debounced function return the result of the last
   * `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
   * on the trailing edge of the timeout only if the the debounced function is
   * invoked more than once during the `wait` timeout.
   *
   * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=false] Specify invoking on the leading
   *  edge of the timeout.
   * @param {number} [options.maxWait] The maximum time `func` is allowed to be
   *  delayed before it's invoked.
   * @param {boolean} [options.trailing=true] Specify invoking on the trailing
   *  edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // avoid costly calculations while the window size is in flux
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
   * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // ensure `batchLog` is invoked once after 1 second of debounced calls
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', _.debounce(batchLog, 250, {
   *   'maxWait': 1000
   * }));
   *
   * // cancel a debounced call
   * var todoChanges = _.debounce(batchLog, 1000);
   * Object.observe(models.todo, todoChanges);
   *
   * Object.observe(models, function(changes) {
   *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
   *     todoChanges.cancel();
   *   }
   * }, ['delete']);
   *
   * // ...at some point `models.todo` is changed
   * models.todo.completed = true;
   *
   * // ...before 1 second has passed `models.todo` is deleted
   * // which cancels the debounced `todoChanges` call
   * delete models.todo;
   */


  function debounce(func, wait, options) {
    var args,
        maxTimeoutId,
        result,
        stamp,
        thisArg,
        timeoutId,
        trailingCall,
        lastCalled = 0,
        maxWait = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    wait = wait < 0 ? 0 : +wait || 0;

    if (options === true) {
      var leading = true;
      trailing = false;
    } else if (isObject(options)) {
      leading = !!options.leading;
      maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }

      lastCalled = 0;
      maxTimeoutId = timeoutId = trailingCall = undefined;
    }

    function complete(isCalled, id) {
      if (id) {
        clearTimeout(id);
      }

      maxTimeoutId = timeoutId = trailingCall = undefined;

      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);

        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = undefined;
        }
      }
    }

    function delayed() {
      var remaining = wait - (now() - stamp);

      if (remaining <= 0 || remaining > wait) {
        complete(trailingCall, maxTimeoutId);
      } else {
        timeoutId = setTimeout(delayed, remaining);
      }
    }

    function maxDelayed() {
      complete(trailing, timeoutId);
    }

    function debounced() {
      args = arguments;
      stamp = now();
      thisArg = this;
      trailingCall = trailing && (timeoutId || !leading);

      if (maxWait === false) {
        var leadingCall = leading && !timeoutId;
      } else {
        if (!maxTimeoutId && !leading) {
          lastCalled = stamp;
        }

        var remaining = maxWait - (stamp - lastCalled),
            isCalled = remaining <= 0 || remaining > maxWait;

        if (isCalled) {
          if (maxTimeoutId) {
            maxTimeoutId = clearTimeout(maxTimeoutId);
          }

          lastCalled = stamp;
          result = func.apply(thisArg, args);
        } else if (!maxTimeoutId) {
          maxTimeoutId = setTimeout(maxDelayed, remaining);
        }
      }

      if (isCalled && timeoutId) {
        timeoutId = clearTimeout(timeoutId);
      } else if (!timeoutId && wait !== maxWait) {
        timeoutId = setTimeout(delayed, wait);
      }

      if (leadingCall) {
        isCalled = true;
        result = func.apply(thisArg, args);
      }

      if (isCalled && !timeoutId && !maxTimeoutId) {
        args = thisArg = undefined;
      }

      return result;
    }

    debounced.cancel = cancel;
    return debounced;
  }
  /**
   * Creates a function that invokes `func` with the `this` binding of the
   * created function and arguments from `start` and beyond provided as an array.
   *
   * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.restParam(function(what, names) {
   *   return what + ' ' + _.initial(names).join(', ') +
   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
   * });
   *
   * say('hello', 'fred', 'barney', 'pebbles');
   * // => 'hello fred, barney, & pebbles'
   */


  function restParam(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          rest = Array(length);

      while (++index < length) {
        rest[index] = args[start + index];
      }

      switch (start) {
        case 0:
          return func.call(this, rest);

        case 1:
          return func.call(this, args[0], rest);

        case 2:
          return func.call(this, args[0], args[1], rest);
      }

      var otherArgs = Array(start + 1);
      index = -1;

      while (++index < start) {
        otherArgs[index] = args[index];
      }

      otherArgs[start] = rest;
      return func.apply(this, otherArgs);
    };
  }
  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed invocations. Provide an options object to indicate
   * that `func` should be invoked on the leading and/or trailing edge of the
   * `wait` timeout. Subsequent calls to the throttled function return the
   * result of the last `func` call.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
   * on the trailing edge of the timeout only if the the throttled function is
   * invoked more than once during the `wait` timeout.
   *
   * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=true] Specify invoking on the leading
   *  edge of the timeout.
   * @param {boolean} [options.trailing=true] Specify invoking on the trailing
   *  edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // avoid excessively updating the position while scrolling
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
   * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
   *   'trailing': false
   * }));
   *
   * // cancel a trailing throttled call
   * jQuery(window).on('popstate', throttled.cancel);
   */


  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    if (options === false) {
      leading = false;
    } else if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    return debounce(func, wait, {
      'leading': leading,
      'maxWait': +wait,
      'trailing': trailing
    });
  }
  /*------------------------------------------------------------------------*/

  /**
   * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
   * otherwise they are assigned by reference. If `customizer` is provided it's
   * invoked to produce the cloned values. If `customizer` returns `undefined`
   * cloning is handled by the method instead. The `customizer` is bound to
   * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
   * The enumerable properties of `arguments` objects and objects created by
   * constructors other than `Object` are cloned to plain `Object` objects. An
   * empty object is returned for uncloneable values such as functions, DOM nodes,
   * Maps, Sets, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {Function} [customizer] The function to customize cloning values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {*} Returns the cloned value.
   * @example
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * var shallow = _.clone(users);
   * shallow[0] === users[0];
   * // => true
   *
   * var deep = _.clone(users, true);
   * deep[0] === users[0];
   * // => false
   *
   * // using a customizer callback
   * var el = _.clone(document.body, function(value) {
   *   if (_.isElement(value)) {
   *     return value.cloneNode(false);
   *   }
   * });
   *
   * el === document.body
   * // => false
   * el.nodeName
   * // => BODY
   * el.childNodes.length;
   * // => 0
   */


  function clone(value, isDeep, customizer, thisArg) {
    if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
      isDeep = false;
    } else if (typeof isDeep == 'function') {
      thisArg = customizer;
      customizer = isDeep;
      isDeep = false;
    }

    return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3)) : baseClone(value, isDeep);
  }
  /**
   * Creates a deep clone of `value`. If `customizer` is provided it's invoked
   * to produce the cloned values. If `customizer` returns `undefined` cloning
   * is handled by the method instead. The `customizer` is bound to `thisArg`
   * and invoked with up to three argument; (value [, index|key, object]).
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
   * The enumerable properties of `arguments` objects and objects created by
   * constructors other than `Object` are cloned to plain `Object` objects. An
   * empty object is returned for uncloneable values such as functions, DOM nodes,
   * Maps, Sets, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to deep clone.
   * @param {Function} [customizer] The function to customize cloning values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {*} Returns the deep cloned value.
   * @example
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * var deep = _.cloneDeep(users);
   * deep[0] === users[0];
   * // => false
   *
   * // using a customizer callback
   * var el = _.cloneDeep(document.body, function(value) {
   *   if (_.isElement(value)) {
   *     return value.cloneNode(true);
   *   }
   * });
   *
   * el === document.body
   * // => false
   * el.nodeName
   * // => BODY
   * el.childNodes.length;
   * // => 20
   */


  function cloneDeep(value, customizer, thisArg) {
    return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 3)) : baseClone(value, true);
  }
  /**
   * Checks if `value` is classified as an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */


  function isArguments(value) {
    return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  }
  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(function() { return arguments; }());
   * // => false
   */


  var isArray = nativeIsArray || function (value) {
    return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
  };
  /**
   * Checks if `value` is classified as a `Date` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   *
   * _.isDate('Mon April 23 2012');
   * // => false
   */


  function isDate(value) {
    return isObjectLike(value) && objToString.call(value) == dateTag;
  }
  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent. If `customizer` is provided it's invoked to compare values.
   * If `customizer` returns `undefined` comparisons are handled by the method
   * instead. The `customizer` is bound to `thisArg` and invoked with up to
   * three arguments: (value, other [, index|key]).
   *
   * **Note:** This method supports comparing arrays, booleans, `Date` objects,
   * numbers, `Object` objects, regexes, and strings. Objects are compared by
   * their own, not inherited, enumerable properties. Functions and DOM nodes
   * are **not** supported. Provide a customizer function to extend support
   * for comparing other values.
   *
   * @static
   * @memberOf _
   * @alias eq
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize value comparisons.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'user': 'fred' };
   * var other = { 'user': 'fred' };
   *
   * object == other;
   * // => false
   *
   * _.isEqual(object, other);
   * // => true
   *
   * // using a customizer callback
   * var array = ['hello', 'goodbye'];
   * var other = ['hi', 'goodbye'];
   *
   * _.isEqual(array, other, function(value, other) {
   *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
   *     return true;
   *   }
   * });
   * // => true
   */


  function isEqual(value, other, customizer, thisArg) {
    customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
    var result = customizer ? customizer(value, other) : undefined;
    return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
  }
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */


  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in older versions of Chrome and Safari which return 'function' for regexes
    // and Safari 8 which returns 'object' for typed array constructors.
    return isObject(value) && objToString.call(value) == funcTag;
  }
  /**
   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */


  function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = _typeof(value);

    return !!value && (type == 'object' || type == 'function');
  }
  /**
   * Checks if `value` is `NaN`.
   *
   * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
   * which returns `true` for `undefined` and other non-numeric values.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */


  function isNaN(value) {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
    return isNumber(value) && value != +value;
  }
  /**
   * Checks if `value` is a native function.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
   * @example
   *
   * _.isNative(Array.prototype.push);
   * // => true
   *
   * _.isNative(_);
   * // => false
   */


  function isNative(value) {
    if (value == null) {
      return false;
    }

    if (isFunction(value)) {
      return reIsNative.test(fnToString.call(value));
    }

    return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
  }
  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
   * as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isNumber(8.4);
   * // => true
   *
   * _.isNumber(NaN);
   * // => true
   *
   * _.isNumber('8.4');
   * // => false
   */


  function isNumber(value) {
    return typeof value == 'number' || isObjectLike(value) && objToString.call(value) == numberTag;
  }
  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */


  function isString(value) {
    return typeof value == 'string' || isObjectLike(value) && objToString.call(value) == stringTag;
  }
  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */


  function isTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
  }
  /*------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources overwrite property assignments of previous sources.
   * If `customizer` is provided it's invoked to produce the assigned values.
   * The `customizer` is bound to `thisArg` and invoked with five arguments:
   * (objectValue, sourceValue, key, object, source).
   *
   * **Note:** This method mutates `object` and is based on
   * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
   *
   * @static
   * @memberOf _
   * @alias extend
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
   * // => { 'user': 'fred', 'age': 40 }
   *
   * // using a customizer callback
   * var defaults = _.partialRight(_.assign, function(value, other) {
   *   return _.isUndefined(value) ? other : value;
   * });
   *
   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */


  var assign = createAssigner(function (object, source, customizer) {
    return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
  });
  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */

  var keys = !nativeKeys ? shimKeys : function (object) {
    var Ctor = object == null ? undefined : object.constructor;

    if (typeof Ctor == 'function' && Ctor.prototype === object || (typeof object == 'function' ? lodash.support.enumPrototypes : isArrayLike(object))) {
      return shimKeys(object);
    }

    return isObject(object) ? nativeKeys(object) : [];
  };
  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */

  function keysIn(object) {
    if (object == null) {
      return [];
    }

    if (!isObject(object)) {
      object = Object(object);
    }

    var length = object.length,
        support = lodash.support;
    length = length && isLength(length) && (isArray(object) || isArguments(object) || isString(object)) && length || 0;
    var Ctor = object.constructor,
        index = -1,
        proto = isFunction(Ctor) && Ctor.prototype || objectProto,
        isProto = proto === object,
        result = Array(length),
        skipIndexes = length > 0,
        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
        skipProto = support.enumPrototypes && isFunction(object);

    while (++index < length) {
      result[index] = index + '';
    } // lodash skips the `constructor` property when it infers it's iterating
    // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
    // attribute of an existing property and the `constructor` property of a
    // prototype defaults to non-enumerable.


    for (var key in object) {
      if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name')) && !(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }

    if (support.nonEnumShadows && object !== objectProto) {
      var tag = object === stringProto ? stringTag : object === errorProto ? errorTag : objToString.call(object),
          nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

      if (tag == objectTag) {
        proto = objectProto;
      }

      length = shadowProps.length;

      while (length--) {
        key = shadowProps[length];
        var nonEnum = nonEnums[key];

        if (!(isProto && nonEnum) && (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
          result.push(key);
        }
      }
    }

    return result;
  }
  /**
   * The opposite of `_.pick`; this method creates an object composed of the
   * own and inherited enumerable properties of `object` that are not omitted.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function invoked per
   *  iteration or property names to omit, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.omit(object, 'age');
   * // => { 'user': 'fred' }
   *
   * _.omit(object, _.isNumber);
   * // => { 'user': 'fred' }
   */


  var omit = restParam(function (object, props) {
    if (object == null) {
      return {};
    }

    if (typeof props[0] != 'function') {
      var props = arrayMap(baseFlatten(props), String);
      return pickByArray(object, baseDifference(keysIn(object), props));
    }

    var predicate = bindCallback(props[0], props[1], 3);
    return pickByCallback(object, function (value, key, object) {
      return !predicate(value, key, object);
    });
  });
  /**
   * Creates a two dimensional array of the key-value pairs for `object`,
   * e.g. `[[key1, value1], [key2, value2]]`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the new array of key-value pairs.
   * @example
   *
   * _.pairs({ 'barney': 36, 'fred': 40 });
   * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
   */

  function pairs(object) {
    object = toObject(object);
    var index = -1,
        props = keys(object),
        length = props.length,
        result = Array(length);

    while (++index < length) {
      var key = props[index];
      result[index] = [key, object[key]];
    }

    return result;
  }
  /**
   * Creates an object composed of the picked `object` properties. Property
   * names may be specified as individual arguments or as arrays of property
   * names. If `predicate` is provided it's invoked for each property of `object`
   * picking the properties `predicate` returns truthy for. The predicate is
   * bound to `thisArg` and invoked with three arguments: (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function invoked per
   *  iteration or property names to pick, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.pick(object, 'user');
   * // => { 'user': 'fred' }
   *
   * _.pick(object, _.isString);
   * // => { 'user': 'fred' }
   */


  var pick = restParam(function (object, props) {
    if (object == null) {
      return {};
    }

    return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
  });
  /**
   * Creates an array of the own enumerable property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */

  function values(object) {
    return baseValues(object, keys(object));
  }
  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and arguments of the created function. If `func` is a property name the
   * created callback returns the property value for a given element. If `func`
   * is an object the created callback returns `true` for elements that contain
   * the equivalent object properties, otherwise it returns `false`.
   *
   * @static
   * @memberOf _
   * @alias iteratee
   * @category Utility
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 }
   * ];
   *
   * // wrap to create custom callback shorthands
   * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
   *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
   *   if (!match) {
   *     return callback(func, thisArg);
   *   }
   *   return function(object) {
   *     return match[2] == 'gt'
   *       ? object[match[1]] > match[3]
   *       : object[match[1]] < match[3];
   *   };
   * });
   *
   * _.filter(users, 'age__gt36');
   * // => [{ 'user': 'fred', 'age': 40 }]
   */


  function callback(func, thisArg, guard) {
    if (guard && isIterateeCall(func, thisArg, guard)) {
      thisArg = undefined;
    }

    return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
  }
  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.identity(object) === object;
   * // => true
   */


  function identity(value) {
    return value;
  }
  /**
   * Creates a function that performs a deep comparison between a given object
   * and `source`, returning `true` if the given object has equivalent property
   * values, else `false`.
   *
   * **Note:** This method supports comparing arrays, booleans, `Date` objects,
   * numbers, `Object` objects, regexes, and strings. Objects are compared by
   * their own, not inherited, enumerable properties. For comparing a single
   * own or inherited property value see `_.matchesProperty`.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, _.matches({ 'age': 40, 'active': false }));
   * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
   */


  function matches(source) {
    return baseMatches(baseClone(source, true));
  }
  /**
   * Creates a function that returns the property value at `path` on a
   * given object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': { 'c': 2 } } },
   *   { 'a': { 'b': { 'c': 1 } } }
   * ];
   *
   * _.map(objects, _.property('a.b.c'));
   * // => [2, 1]
   *
   * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
   * // => [1, 2]
   */


  function property(path) {
    return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
  }
  /*------------------------------------------------------------------------*/
  // Add functions to the `Set` cache.


  SetCache.prototype.push = cachePush; // Add functions that return wrapped values when chaining.

  lodash.assign = assign;
  lodash.callback = callback;
  lodash.compact = compact;
  lodash.debounce = debounce;
  lodash.drop = drop;
  lodash.filter = filter;
  lodash.forEach = forEach;
  lodash.keys = keys;
  lodash.keysIn = keysIn;
  lodash.map = map;
  lodash.matches = matches;
  lodash.omit = omit;
  lodash.pairs = pairs;
  lodash.pick = pick;
  lodash.property = property;
  lodash.remove = remove;
  lodash.rest = rest;
  lodash.restParam = restParam;
  lodash.throttle = throttle;
  lodash.uniq = uniq;
  lodash.values = values; // Add aliases.

  lodash.collect = map;
  lodash.each = forEach;
  lodash.extend = assign;
  lodash.iteratee = callback;
  lodash.select = filter;
  lodash.tail = rest;
  lodash.unique = uniq;
  /*------------------------------------------------------------------------*/
  // Add functions that return unwrapped values when chaining.

  lodash.clone = clone;
  lodash.cloneDeep = cloneDeep;
  lodash.every = every;
  lodash.identity = identity;
  lodash.includes = includes;
  lodash.indexOf = indexOf;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isDate = isDate;
  lodash.isEqual = isEqual;
  lodash.isFunction = isFunction;
  lodash.isNaN = isNaN;
  lodash.isNative = isNative;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isString = isString;
  lodash.isTypedArray = isTypedArray;
  lodash.last = last;
  lodash.now = now;
  lodash.reduce = reduce;
  lodash.some = some; // Add aliases.

  lodash.all = every;
  lodash.any = some;
  lodash.contains = includes;
  lodash.eq = isEqual;
  lodash.foldl = reduce;
  lodash.include = includes;
  lodash.inject = reduce;
  /*------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */

  lodash.VERSION = VERSION;
  /*--------------------------------------------------------------------------*/
  // Some AMD build optimizers like r.js check for condition patterns like the following:

  if (false && _typeof(define.amd) == 'object' && define.amd) {
    // Expose lodash to the global object when an AMD loader is present to avoid
    // errors in cases where lodash is loaded by a script tag and not intended
    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
    // more details.
    module.exports = lodash; // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.

    define(function () {
      return lodash;
    });
  } // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
      // Export for Node.js or RingoJS.
      if (moduleExports) {
        (freeModule.exports = lodash)._ = lodash;
      } // Export for Rhino with CommonJS support.
      else {
          freeExports._ = lodash;
        }
    } else {
      // Export for a browser or Rhino.
      module.exports = lodash;
    }
}).call(void 0);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var nonse;

module.exports = require('./packages/core-v1/src/bootstrap.web');

nonse = 0;


},{"./packages/core-v1/src/bootstrap.web":31}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],4:[function(require,module,exports){
(function (global,Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"base64-js":3,"buffer":4,"ieee754":10,"isarray":11}],5:[function(require,module,exports){

/**
 * Module dependencies.
 */

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function (name, value, options) {
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options['max-age'] = -1;

  if (options['max-age']) {
    options.expires = new Date(+new Date + options['max-age']);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  return parse(document.cookie);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');

    // karteに関係するcookieのみデコードする
    if (isKarteRelatedCookieKey(pair[0])) {
      try {
        obj[decode(pair[0])] = decode(pair[1]);
      } catch (e) {
        console.warn('error `parse(' + value + ')` - ' + e)
      }
    }
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value) {
  try {
    return encodeURIComponent(value);
  } catch (e) {
    console.warn('error `encode(' + value + ')` - ' + e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    console.warn('error `decode(' + value + ')` - ' + e)
  }
}

/**
 * Returns whether a cookie key related to karte or not.
 *
 * @param {String} cookieKey
 * @return {Boolean} 
 * @api private
 */

function isKarteRelatedCookieKey(cookieKey) {
  if (!cookieKey) {
    return false;
  }

  if (cookieKey.substr(0, 'krt'.length) === 'krt' ||
    cookieKey.substr(0, 'ktid'.length) === 'ktid' ||
    cookieKey.substr(0, '__pck__'.length) === '__pck__' ||
    cookieKey.substr(0, 'test'.length) === 'test') {

    return true;
  }
  return false;
}

},{}],6:[function(require,module,exports){
// unique callback number

var _keys = require('lodash.keys');

var callbackId = 0;

function getCallbackName(callback_header) {
  callback_header = callback_header || '__jspcb__';
  callbackId += 1;
  return callback_header + callbackId;
}

function _map(array, func) {
  var results = [];
  for (var i=0; i<array.length; i++) {
    results.push(func(array[i]))
  }
  return results;
}

function prepareUrl(url, params) {
  return url + '?' + _map(_keys(params), function(key) {
      return key + '=' + encodeURIComponent(params[key]);
    })
    .join('&');
}

module.exports = function jsonp(url, fn) {
  var self, my = {
    url: url,
    callback_param: 'callback',
    callback_header: '__jspcb__',
    query: {}
  };

  function query(q) {
    var key;
    for (key in q) {
      my.query[key] = q[key];
    }
    return self;
  }

  // change options
  function options(opts) {
    if(opts.callback_param)
      my.callback_param = opts.callback_param;
    if(opts.callback_header)
      my.callback_header = opts.callback_header;
    return self;
  }

  function end(fn) {
    var js, fjs, fnName = getCallbackName(my.callback_header);
    window[fnName] = function(json) {
      // cleanup after the call
      window[fnName] = undefined;
      js.parentNode.removeChild(js);
      // execute provided callback
      fn(json);
    };
    my.query[my.callback_param] = fnName;
    js = document.createElement('script');
    js.src = prepareUrl(my.url, my.query);
    js.async = true;
    fjs = document.getElementsByTagName('script')[0];
    fjs.parentNode.insertBefore(js, fjs);
  }

  if (typeof fn === 'function') {
    return end(fn);
  }

  self = {
    query: query,
    options: options,
    end: end
  };

  return self;
};

},{"lodash.keys":12}],7:[function(require,module,exports){
var parse = require('url').parse,
    tld = require('tld.js');
    

module.exports = function (url) {
  if(typeof url === 'string') url = parse(url);
  if(!url.hostname) return '';
  var domain = url.hostname.match(new RegExp('([a-zA-Z0-9\-]*?.' + tld(url) + ')$'));
  if(domain) return domain[1];
  else return '';
}

},{"tld.js":19,"url":21}],8:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],9:[function(require,module,exports){
// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// keys with brackets for hash keys
var object_brackets_regex = /\[(.+?)\]/g;
var array_brackets_regex = /\[\]$/;
var brackeks_prefix_regex = /^(.+?)\[/;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
function serialize(form, options) {
    if (typeof options != 'object') {
        options = { hash: !!options };
    }
    else if (options.hash === undefined) {
        options.hash = true;
    }

    var result = (options.hash) ? {} : '';
    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

    var elements = form.elements || [];

    //Object store each radio and set if it's empty or not
    var radio_store = Object.create(null);

    for (var i=0 ; i<elements.length ; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if ((!options.disabled && element.disabled) || !element.name) {
            continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) ||
            k_r_submitter.test(element.type)) {
            continue;
        }

        if (options.ignore_password && element.type.toLowerCase() === 'password') {
            continue;
        }

        var key = element.name;
        var val = element.value;

        // we can't just use element.value for checkboxes cause some browsers lie to us
        // they say "on" for value when the box isn't checked
        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
            val = undefined;
        }
        
        // If we want empty elements
        if (options.empty) {
            // for checkbox
            if (element.type === 'checkbox' && !element.checked) {
                val = '';
            }

            // for radio
            if (element.type === 'radio') {
                if (!radio_store[element.name] && !element.checked) {
                    radio_store[element.name] = false
                }
                else if (element.checked) {
                    radio_store[element.name] = true
                }
            }

            // if options empty is true, continue only if its radio
            if (!val && element.type == 'radio') {
                continue;
            }
        }
        else {
            // value-less fields are ignored unless options.empty is true
            if (!val) {
                continue;
            }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
            val = [];

            var selectOptions = element.options;
            var isSelectedOptions = false;
            for (var j=0 ; j<selectOptions.length ; ++j) {
                var option = selectOptions[j];
                if (option.selected) {
                    isSelectedOptions = true
                    result = serializer(result, key, option.value);
                }
            }

            // Serialize if no selected options and options.empty is true
            if (!isSelectedOptions && options.empty) {
                result = serializer(result, key, '');
            }
            
            continue;
        }
        result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
        for (var key in radio_store) {
            if (!radio_store[key]) {
                result = serializer(result, key, '');
            }
        }
    }

    return result;
}

// obj/hash encoding serializer
function hash_serializer(result, key, value) {
    var is_array_key = has_array_brackets(key);
    if (is_array_key) {
        key = key.replace(array_brackets_regex, '');
    }

    if (key in result) {
        var existing = result[key];
        if (!Array.isArray(existing)) {
            result[key] = [existing];
        }
        result[key].push(value);
    }
    else {
        if (has_object_brackets(key)) {
          extract_from_brackets(result, key, value);
        }
        else {
          result[key] = is_array_key ? [value] : value;
        }
    }

    return result;
};

// urlform encoding serializer
function str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
};

function has_object_brackets(string) {
  return string.match(object_brackets_regex);
};

function has_array_brackets(string) {
    return string.match(array_brackets_regex);
}

function matches_between_brackets(string) {
    // Make sure to isolate object_brackets_regex from .exec() calls
    var regex = new RegExp(object_brackets_regex);
    var matches = [];
    var match;

    while (match = regex.exec(string)) {
      matches.push(match[1]);
    }

    return matches;
};

function extract_from_brackets(result, key, value) {
    var prefix = key.match(brackeks_prefix_regex)[1];

    // Set the key if it doesn't exist
    if (! result[prefix]) result[prefix] = {};

    var parent = result[prefix];
    var matches_between = matches_between_brackets(key);
    var length = matches_between.length;

    for (var i = 0; i < length; i++) {
        var child = matches_between[i];
        var isLast = (length === i + 1);

        if (isLast) {
            var existing = parent[child];

            if (existing) {
                if (! Array.isArray(existing)) {
                    parent[child] = [ existing ];
                }

                parent[child].push(value);
            }
            else {
                // Finally make the assignment
                parent[child] = value;
            }

        }
        else {
            // This is a nested key, set it properly for the next iteration
            parent[child] = parent[child] || {};
            parent = parent[child];
        }
    }

    parent = value;
};

module.exports = serialize;

},{}],10:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],11:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],12:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{}],13:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],15:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],16:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":14,"./encode":15}],17:[function(require,module,exports){
/* eslint-disable no-use-before-define */
'use strict';

module.exports = function eachAsync(arr, parallelLimit, iteratorFn, cb) {
  var pending = 0;
  var index = 0;
  var lastIndex = arr.length - 1;
  var called = false;
  var limit;
  var callback;
  var iterate;

  if (typeof parallelLimit === 'number') {
    limit = parallelLimit;
    iterate = iteratorFn;
    callback = cb || function noop() {};
  } else {
    iterate = parallelLimit;
    callback = iteratorFn || function noop() {};
    limit = arr.length;
  }

  if (!arr.length) { return callback(); }

  var iteratorLength = iterate.length;

  var shouldCallNextIterator = function shouldCallNextIterator() {
    return (!called && (pending < limit) && (index < lastIndex));
  };

  var iteratorCallback = function iteratorCallback(err) {
    if (called) { return; }

    pending--;

    if (err || (index === lastIndex && !pending)) {
      called = true;

      callback(err);
    } else if (shouldCallNextIterator()) {
      processIterator(++index);
    }
  };

  var processIterator = function processIterator() {
    pending++;

    var args = (iteratorLength === 2) ? [arr[index], iteratorCallback]
                                      : [arr[index], index, iteratorCallback];

    iterate.apply(null, args);

    if (shouldCallNextIterator()) {
      processIterator(++index);
    }
  };

  processIterator();
};

},{}],18:[function(require,module,exports){
//Copyright (c) 2011 medialize
module.exports = /\.(((com|gov|mil|net|org).ac)|((ac|co|gov|mil|name|net|org|pro|sch).ae)|((com|edu|gov|net|org).af)|((com|edu|gov|mil|net|org).al)|((co|ed|gv|it|og|pb).ao)|((com|edu|gob|gov|int|mil|net|org|tur).ar)|((ac|co|gv|or).at)|((asn|com|csiro|edu|gov|id|net|org).au)|((co|com|edu|gov|mil|net|org|rs|unbi|unmo|unsa|untz|unze).ba)|((biz|co|com|edu|gov|info|net|org|store|tv).bb)|((biz|cc|com|edu|gov|info|net|org).bh)|((com|edu|gov|net|org).bn)|((com|edu|gob|gov|int|mil|net|org|tv).bo)|((adm|adv|agr|am|arq|art|ato|b|bio|blog|bmd|cim|cng|cnt|com|coop|ecn|edu|eng|esp|etc|eti|far|flog|fm|fnd|fot|fst|g12|ggf|gov|imb|ind|inf|jor|jus|lel|mat|med|mil|mus|net|nom|not|ntr|odo|org|ppg|pro|psc|psi|qsl|rec|slg|srv|tmp|trd|tur|tv|vet|vlog|wiki|zlg).br)|((com|edu|gov|net|org).bs)|((du|et|om|ov|rg).bz)|((ab|bc|mb|nb|nf|nl|ns|nt|nu|on|pe|qc|sk|yk).ca)|((biz|co|edu|gen|gov|info|net|org).ck)|((ac|ah|bj|com|cq|edu|fj|gd|gov|gs|gx|gz|ha|hb|he|hi|hl|hn|jl|js|jx|ln|mil|net|nm|nx|org|qh|sc|sd|sh|sn|sx|tj|tw|xj|xz|yn|zj).cn)|((com|edu|gov|mil|net|nom|org).co)|((ac|c|co|ed|fi|go|or|sa).cr)|((ac|biz|com|ekloges|gov|ltd|name|net|org|parliament|press|pro|tm).cy)|((art|com|edu|gob|gov|mil|net|org|sld|web).do)|((art|asso|com|edu|gov|net|org|pol).dz)|((com|edu|fin|gov|info|med|mil|net|org|pro).ec)|((com|edu|eun|gov|mil|name|net|org|sci).eg)|((com|edu|gov|ind|mil|net|org|rochest|w).er)|((com|edu|gob|nom|org).es)|((biz|com|edu|gov|info|name|net|org).et)|((ac|biz|com|info|mil|name|net|org|pro).fj)|((ac|co|gov|net|nom|org).fk)|((asso|com|f|gouv|nom|prd|presse|tm).fr)|((co|net|org).gg)|((com|edu|gov|mil|org).gh)|((ac|com|gov|net|org).gn)|((com|edu|gov|mil|net|org).gr)|((com|edu|gob|ind|mil|net|org).gt)|((com|edu|gov|net|org).gu)|((com|edu|gov|idv|net|org).hk)|((ac|co|go|mil|net|or|sch|web).id)|((ac|co|gov|idf|k12|muni|net|org).il)|((ac|co|edu|ernet|firm|gen|gov|i|ind|mil|net|nic|org|res).in)|((com|edu|gov|i|mil|net|org).iq)|((ac|co|dnssec|gov|i|id|net|org|sch).ir)|((edu|gov).it)|((co|net|org).je)|((com|edu|gov|mil|name|net|org|sch).jo)|((ac|ad|co|ed|go|gr|lg|ne|or).jp)|((ac|co|go|info|me|mobi|ne|or|sc).ke)|((com|edu|gov|mil|net|org|per).kh)|((biz|com|de|edu|gov|info|mob|net|org|tel).ki)|((asso|com|coop|edu|gouv|k|medecin|mil|nom|notaires|pharmaciens|presse|tm|veterinaire).km)|((edu|gov|net|org).kn)|((ac|busan|chungbuk|chungnam|co|daegu|daejeon|es|gangwon|go|gwangju|gyeongbuk|gyeonggi|gyeongnam|hs|incheon|jeju|jeonbuk|jeonnam|k|kg|mil|ms|ne|or|pe|re|sc|seoul|ulsan).kr)|((com|edu|gov|net|org).kw)|((com|edu|gov|net|org).ky)|((com|edu|gov|mil|net|org).kz)|((com|edu|gov|net|org).lb)|((assn|com|edu|gov|grp|hotel|int|ltd|net|ngo|org|sch|soc|web).lk)|((com|edu|gov|net|org).lr)|((asn|com|conf|edu|gov|id|mil|net|org).lv)|((com|edu|gov|id|med|net|org|plc|sch).ly)|((ac|co|gov|m|net|org|press).ma)|((asso|tm).mc)|((ac|co|edu|gov|its|net|org|priv).me)|((com|edu|gov|mil|nom|org|prd|tm).mg)|((com|edu|gov|inf|name|net|org|pro).mk)|((com|edu|gov|net|org|presse).ml)|((edu|gov|org).mn)|((com|edu|gov|net|org).mo)|((com|edu|gov|net|org).mt)|((aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro).mv)|((ac|co|com|coop|edu|gov|int|museum|net|org).mw)|((com|edu|gob|net|org).mx)|((com|edu|gov|mil|name|net|org|sch).my)|((arts|com|firm|info|net|other|per|rec|store|web).nf)|((biz|com|edu|gov|mil|mobi|name|net|org|sch).ng)|((ac|co|com|edu|gob|mil|net|nom|org).ni)|((com|edu|gov|mil|net|org).np)|((biz|com|edu|gov|info|net|org).nr)|((ac|biz|co|com|edu|gov|med|mil|museum|net|org|pro|sch).om)|((com|edu|gob|mil|net|nom|org|sld).pe)|((com|edu|gov|i|mil|net|ngo|org).ph)|((biz|com|edu|fam|gob|gok|gon|gop|gos|gov|net|org|web).pk)|((art|bialystok|biz|com|edu|gda|gdansk|gorzow|gov|info|katowice|krakow|lodz|lublin|mil|net|ngo|olsztyn|org|poznan|pwr|radom|slupsk|szczecin|torun|warszawa|waw|wroc|wroclaw|zgora).pl)|((ac|biz|com|edu|est|gov|info|isla|name|net|org|pro|prof).pr)|((com|edu|gov|net|org|plo|sec).ps)|((belau|co|ed|go|ne|or).pw)|((arts|com|firm|info|nom|nt|org|rec|store|tm|www).ro)|((ac|co|edu|gov|in|org).rs)|((com|edu|gov|net|org).sb)|((com|edu|gov|net|org).sc)|((co|com|edu|gov|net|nom|org).sh)|((com|edu|gov|net|org).sl)|((co|com|consulado|edu|embaixada|gov|mil|net|org|principe|saotome|store).st)|((com|edu|gob|org|red).sv)|((ac|co|org).sz)|((av|bbs|bel|biz|com|dr|edu|gen|gov|info|k12|name|net|org|pol|tel|tsk|tv|web).tr)|((aero|biz|cat|co|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel).tt)|((club|com|ebiz|edu|game|gov|idv|mil|net|org).tw)|((ac|co|com|gov|net|or|org).mu)|((ac|co|edu|gov|org).mz)|((co|com).na)|((ac|co|cri|geek|gen|govt|health|iwi|maori|mil|net|org|parliament|school).nz)|((abo|ac|com|edu|gob|ing|med|net|nom|org|sld).pa)|((com|edu|gov|int|net|nome|org|publ).pt)|((com|edu|gov|mil|net|org).py)|((com|edu|gov|mil|net|org).qa)|((asso|com|nom).re)|((ac|adygeya|altai|amur|arkhangelsk|astrakhan|bashkiria|belgorod|bir|bryansk|buryatia|cbg|chel|chelyabinsk|chita|chukotka|chuvashia|com|dagestan|e-burg|edu|gov|grozny|int|irkutsk|ivanovo|izhevsk|jar|joshkar-ola|kalmykia|kaluga|kamchatka|karelia|kazan|kchr|kemerovo|khabarovsk|khakassia|khv|kirov|koenig|komi|kostroma|kranoyarsk|kuban|kurgan|kursk|lipetsk|magadan|mari|mari-el|marine|mil|mordovia|mosreg|msk|murmansk|nalchik|net|nnov|nov|novosibirsk|nsk|omsk|orenburg|org|oryol|penza|perm|pp|pskov|ptz|rnd|ryazan|sakhalin|samara|saratov|simbirsk|smolensk|spb|stavropol|stv|surgut|tambov|tatarstan|tom|tomsk|tsaritsyn|tsk|tula|tuva|tver|tyumen|udm|udmurtia|ulan-ude|vladikavkaz|vladimir|vladivostok|volgograd|vologda|voronezh|vrn|vyatka|yakutia|yamal|yekaterinburg|yuzhno-sakhalinsk).ru)|((ac|co|com|edu|gouv|gov|int|mil|net).rw)|((com|edu|gov|med|net|org|pub|sch).sa)|((com|edu|gov|info|med|net|org|tv).sd)|((a|ac|b|bd|c|d|e|f|g|h|i|k|l|m|n|o|org|p|parti|pp|press|r|s|t|tm|u|w|x|y|z).se)|((com|edu|gov|idn|net|org|per).sg)|((art|com|edu|gouv|org|perso|univ).sn)|((com|edu|gov|mil|net|news|org).sy)|((ac|co|go|in|mi|net|or).th)|((ac|biz|co|com|edu|go|gov|info|int|mil|name|net|nic|org|test|web).tj)|((agrinet|com|defense|edunet|ens|fin|gov|ind|info|intl|mincom|nat|net|org|perso|rnrt|rns|rnu|tourism).tn)|((ac|co|go|ne|or).tz)|((biz|cherkassy|chernigov|chernovtsy|ck|cn|co|com|crimea|cv|dn|dnepropetrovsk|donetsk|dp|edu|gov|if|in|ivano-frankivsk|kh|kharkov|kherson|khmelnitskiy|kiev|kirovograd|km|kr|ks|kv|lg|lugansk|lutsk|lviv|me|mk|net|nikolaev|od|odessa|org|pl|poltava|pp|rovno|rv|sebastopol|sumy|te|ternopil|uzhgorod|vinnica|vn|zaporizhzhe|zhitomir|zp|zt).ua)|((ac|co|go|ne|or|org|sc).ug)|((ac|bl|british-library|co|cym|gov|govt|icnet|jet|lea|ltd|me|mil|mod|national-library-scotland|nel|net|nhs|nic|nls|org|orgn|parliament|plc|police|sch|scot|soc).uk)|((dni|fed|isa|kids|nsn).us)|((com|edu|gub|mil|net|org).uy)|((co|com|edu|gob|info|mil|net|org|web).ve)|((co|com|k12|net|org).vi)|((ac|biz|com|edu|gov|health|info|int|name|net|org|pro).vn)|((co|com|gov|ltd|me|net|org|plc).ye)|((ac|co|edu|gov|org).yu)|((ac|agric|alt|bourse|city|co|cybernet|db|edu|gov|grondar|iaccess|imt|inca|landesign|law|mil|net|ngo|nis|nom|olivetti|org|pix|school|tm|web).za)|((ac|co|com|edu|gov|net|org|sch).zm))$/i;
},{}],19:[function(require,module,exports){
var parse = require('url').parse,
    sld = require('./sld');

module.exports = function (url) {
  if(typeof url === 'string') url = parse(url);
  if(!url.hostname) return '';
  var tld = url.hostname.match(/\.([a-zA-Z]*?)$/);
  var msdl = url.hostname.match(sld);
  if(msdl) return msdl[1];
  else if(tld) return tld[1];
  else return '';
}
},{"./sld":18,"url":21}],20:[function(require,module,exports){
/*!
 * UAParser.js v0.7.18
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.18',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var margedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    margedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    margedRegexes[i] = regexes[i];
                }
            }
            return margedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            //var result = {},
            var i = 0, j, k, p, q, matches, match;//, args = arguments;

            /*// construct object barebones
            for (p = 0; p < args[1].length; p++) {
                q = args[1][p];
                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
            }*/

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
            // console.log(this);
            //return this;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
            ], [NAME, VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i                             // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
                                                                                // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(BIDUBrowser)[\/\s]?([\w\.]+)/i                                    // Baidu Browser
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
            ], [NAME, VERSION], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]

            /* /////////////////////
            // Media players BEGIN
            ////////////////////////

            , [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION]

            //////////////////////
            // Media players END
            ////////////////////*/

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
            /android.+aft([bms])\sbuild/i                                       // Fire TV
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p)/i                                                      // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)\s/i                                          // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel [xl2]{1,2}|pixel)\s/i                           // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})\s+build/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]


        /*//////////////////////////
            // TODO: move to string map
            ////////////////////////////

            /(C6603)/i                                                          // Sony Xperia Z C6603
            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
            /(C6903)/i                                                          // Sony Xperia Z 1
            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

            /(T3C)/i                                                            // Advan Vandroid T3C
            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

            /(V972M)/i                                                          // ZTE V972M
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

            /////////////
            // END TODO
            ///////////*/

        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
            /linux;.+(sailfish);/i                                              // Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    /*
    var Browser = function (name, version) {
        this[NAME] = name;
        this[VERSION] = version;
    };
    var CPU = function (arch) {
        this[ARCHITECTURE] = arch;
    };
    var Device = function (vendor, model, type) {
        this[VENDOR] = vendor;
        this[MODEL] = model;
        this[TYPE] = type;
    };
    var Engine = Browser;
    var OS = Browser;
    */
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
        //var browser = new Browser();
        //var cpu = new CPU();
        //var device = new Device();
        //var engine = new Engine();
        //var os = new OS();

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            //browser = new Browser();
            //cpu = new CPU();
            //device = new Device();
            //engine = new Engine();
            //os = new OS();
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };
    //UAParser.Utils = util;

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        // TODO: test!!!!!!!!
        /*
        if (require && require.main === module && process) {
            // cli
            var jsonize = function (arr) {
                var res = [];
                for (var i in arr) {
                    res.push(new UAParser(arr[i]).getResult());
                }
                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
            };
            if (process.stdin.isTTY) {
                // via args
                jsonize(process.argv.slice(2));
            } else {
                // via pipe
                var str = '';
                process.stdin.on('readable', function() {
                    var read = process.stdin.read();
                    if (read !== null) {
                        str += read;
                    }
                });
                process.stdin.on('end', function () {
                    jsonize(str.replace(/\n$/, '').split('\n'));
                });
            }
        }
        */
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (typeof(define) === FUNC_TYPE && define.amd) {
            define(function () {
                return UAParser;
            });
        } else if (window) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if (typeof $ !== UNDEF_TYPE && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);

},{}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":22,"punycode":13,"querystring":16}],22:[function(require,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],23:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;

},{}],24:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],25:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":23,"./lib/rng":24}],26:[function(require,module,exports){
var XPath = module.exports = {}

// ************************************************************************************************
// XPath

/**
 * Gets an XPath for an element which describes its hierarchical location.
 */
XPath.getElementXPath = function(element)
{
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return XPath.getElementTreeXPath(element);
};

XPath.getElementTreeXPath = function(element, strict)
{
    var paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var index = 0;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
        {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;

            if (sibling.nodeName == element.nodeName)
                ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (strict || index ? "[" + (index+1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};

XPath.getElementCSSPath = function(element)
{
    var paths = [];

    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var selector = XPath.getElementCSSSelector(element);
        paths.splice(0, 0, selector);
    }

    return paths.length ? paths.join(" > ") : null;
};

XPath.cssToXPath = function(rule)
{
    var regElement = /^([#.]?)([a-z0-9\\*_-]*)((\|)([a-z0-9\\*_-]*))?/i;
    var regAttr1 = /^\[([^\]]*)\]/i;
    var regAttr2 = /^\[\s*([^~=\s]+)\s*(~?=)\s*"([^"]+)"\s*\]/i;
    var regPseudo = /^:([a-z_-])+/i;
    var regCombinator = /^(\s*[>+\s])?/i;
    var regComma = /^\s*,/i;

    var index = 1;
    var parts = ["//", "*"];
    var lastRule = null;

    while (rule.length && rule != lastRule)
    {
        lastRule = rule;

        // Trim leading whitespace
        rule = XPath.trim(rule);
        if (!rule.length)
            break;

        // Match the element identifier
        var m = regElement.exec(rule);
        if (m)
        {
            if (!m[1])
            {
                // XXXjoe Namespace ignored for now
                if (m[5])
                    parts[index] = m[5];
                else
                    parts[index] = m[2];
            }
            else if (m[1] == '#')
                parts.push("[@id='" + m[2] + "']");
            else if (m[1] == '.')
                parts.push("[contains(concat(' ',normalize-space(@class),' '), ' " + m[2] + " ')]");

            rule = rule.substr(m[0].length);
        }

        // Match attribute selectors
        m = regAttr2.exec(rule);
        if (m)
        {
            if (m[2] == "~=")
                parts.push("[contains(@" + m[1] + ", '" + m[3] + "')]");
            else
                parts.push("[@" + m[1] + "='" + m[3] + "']");

            rule = rule.substr(m[0].length);
        }
        else
        {
            m = regAttr1.exec(rule);
            if (m)
            {
                parts.push("[@" + m[1] + "]");
                rule = rule.substr(m[0].length);
            }
        }

        // Skip over pseudo-classes and pseudo-elements, which are of no use to us
        m = regPseudo.exec(rule);
        while (m)
        {
            rule = rule.substr(m[0].length);
            m = regPseudo.exec(rule);
        }

        // Match combinators
        m = regCombinator.exec(rule);
        if (m && m[0].length)
        {
            if (m[0].indexOf(">") != -1)
                parts.push("/");
            else if (m[0].indexOf("+") != -1)
                parts.push("/following-sibling::");
            else
                parts.push("//");

            index = parts.length;
            parts.push("*");
            rule = rule.substr(m[0].length);
        }

        m = regComma.exec(rule);
        if (m)
        {
            parts.push(" | ", "//", "*");
            index = parts.length-1;
            rule = rule.substr(m[0].length);
        }
    }

    var xpath = parts.join("");
    return xpath;
};

XPath.getElementsBySelector = function(doc, css)
{
    var xpath = XPath.cssToXPath(css);
    return XPath.getElementsByXPath(doc, xpath);
};

XPath.getElementsByXPath = function(doc, xpath)
{
    var nodes = [];

    try {
        var result = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
        for (var item = result.iterateNext(); item; item = result.iterateNext())
            nodes.push(item);
    }
    catch (exc)
    {
        // Invalid xpath expressions make their way here sometimes.  If that happens,
        // we still want to return an empty set without an exception.
    }

    return nodes;
};

XPath.getRuleMatchingElements = function(rule, doc)
{
    var css = rule.selectorText;
    var xpath = XPath.cssToXPath(css);
    return XPath.getElementsByXPath(doc, xpath);
};

XPath.getElementCSSSelector = function(element)
{
    if (!element || !element.localName)
        return "null";

    var label = element.localName.toLowerCase();
    if (element.id)
        label += "#" + element.id;

    if (element.classList && element.classList.length > 0)
        label += "." + element.classList.item(0);

    return label;
};


},{}],27:[function(require,module,exports){
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';var n=void 0,w=!0,aa=this;function ba(f,d){var c=f.split("."),e=aa;!(c[0]in e)&&e.execScript&&e.execScript("var "+c[0]);for(var b;c.length&&(b=c.shift());)!c.length&&d!==n?e[b]=d:e=e[b]?e[b]:e[b]={}};var C="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function K(f,d){this.index="number"===typeof d?d:0;this.e=0;this.buffer=f instanceof(C?Uint8Array:Array)?f:new (C?Uint8Array:Array)(32768);if(2*this.buffer.length<=this.index)throw Error("invalid index");this.buffer.length<=this.index&&ca(this)}function ca(f){var d=f.buffer,c,e=d.length,b=new (C?Uint8Array:Array)(e<<1);if(C)b.set(d);else for(c=0;c<e;++c)b[c]=d[c];return f.buffer=b}
K.prototype.b=function(f,d,c){var e=this.buffer,b=this.index,a=this.e,g=e[b],m;c&&1<d&&(f=8<d?(L[f&255]<<24|L[f>>>8&255]<<16|L[f>>>16&255]<<8|L[f>>>24&255])>>32-d:L[f]>>8-d);if(8>d+a)g=g<<d|f,a+=d;else for(m=0;m<d;++m)g=g<<1|f>>d-m-1&1,8===++a&&(a=0,e[b++]=L[g],g=0,b===e.length&&(e=ca(this)));e[b]=g;this.buffer=e;this.e=a;this.index=b};K.prototype.finish=function(){var f=this.buffer,d=this.index,c;0<this.e&&(f[d]<<=8-this.e,f[d]=L[f[d]],d++);C?c=f.subarray(0,d):(f.length=d,c=f);return c};
var da=new (C?Uint8Array:Array)(256),M;for(M=0;256>M;++M){for(var N=M,S=N,ea=7,N=N>>>1;N;N>>>=1)S<<=1,S|=N&1,--ea;da[M]=(S<<ea&255)>>>0}var L=da;function ia(f){this.buffer=new (C?Uint16Array:Array)(2*f);this.length=0}ia.prototype.getParent=function(f){return 2*((f-2)/4|0)};ia.prototype.push=function(f,d){var c,e,b=this.buffer,a;c=this.length;b[this.length++]=d;for(b[this.length++]=f;0<c;)if(e=this.getParent(c),b[c]>b[e])a=b[c],b[c]=b[e],b[e]=a,a=b[c+1],b[c+1]=b[e+1],b[e+1]=a,c=e;else break;return this.length};
ia.prototype.pop=function(){var f,d,c=this.buffer,e,b,a;d=c[0];f=c[1];this.length-=2;c[0]=c[this.length];c[1]=c[this.length+1];for(a=0;;){b=2*a+2;if(b>=this.length)break;b+2<this.length&&c[b+2]>c[b]&&(b+=2);if(c[b]>c[a])e=c[a],c[a]=c[b],c[b]=e,e=c[a+1],c[a+1]=c[b+1],c[b+1]=e;else break;a=b}return{index:f,value:d,length:this.length}};function ka(f,d){this.d=la;this.i=0;this.input=C&&f instanceof Array?new Uint8Array(f):f;this.c=0;d&&(d.lazy&&(this.i=d.lazy),"number"===typeof d.compressionType&&(this.d=d.compressionType),d.outputBuffer&&(this.a=C&&d.outputBuffer instanceof Array?new Uint8Array(d.outputBuffer):d.outputBuffer),"number"===typeof d.outputIndex&&(this.c=d.outputIndex));this.a||(this.a=new (C?Uint8Array:Array)(32768))}var la=2,na={NONE:0,h:1,g:la,n:3},T=[],U;
for(U=0;288>U;U++)switch(w){case 143>=U:T.push([U+48,8]);break;case 255>=U:T.push([U-144+400,9]);break;case 279>=U:T.push([U-256+0,7]);break;case 287>=U:T.push([U-280+192,8]);break;default:throw"invalid literal: "+U;}
ka.prototype.f=function(){var f,d,c,e,b=this.input;switch(this.d){case 0:c=0;for(e=b.length;c<e;){d=C?b.subarray(c,c+65535):b.slice(c,c+65535);c+=d.length;var a=d,g=c===e,m=n,k=n,p=n,t=n,u=n,l=this.a,h=this.c;if(C){for(l=new Uint8Array(this.a.buffer);l.length<=h+a.length+5;)l=new Uint8Array(l.length<<1);l.set(this.a)}m=g?1:0;l[h++]=m|0;k=a.length;p=~k+65536&65535;l[h++]=k&255;l[h++]=k>>>8&255;l[h++]=p&255;l[h++]=p>>>8&255;if(C)l.set(a,h),h+=a.length,l=l.subarray(0,h);else{t=0;for(u=a.length;t<u;++t)l[h++]=
a[t];l.length=h}this.c=h;this.a=l}break;case 1:var q=new K(C?new Uint8Array(this.a.buffer):this.a,this.c);q.b(1,1,w);q.b(1,2,w);var s=oa(this,b),x,fa,z;x=0;for(fa=s.length;x<fa;x++)if(z=s[x],K.prototype.b.apply(q,T[z]),256<z)q.b(s[++x],s[++x],w),q.b(s[++x],5),q.b(s[++x],s[++x],w);else if(256===z)break;this.a=q.finish();this.c=this.a.length;break;case la:var B=new K(C?new Uint8Array(this.a.buffer):this.a,this.c),ta,J,O,P,Q,La=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],X,ua,Y,va,ga,ja=Array(19),
wa,R,ha,y,xa;ta=la;B.b(1,1,w);B.b(ta,2,w);J=oa(this,b);X=pa(this.m,15);ua=qa(X);Y=pa(this.l,7);va=qa(Y);for(O=286;257<O&&0===X[O-1];O--);for(P=30;1<P&&0===Y[P-1];P--);var ya=O,za=P,F=new (C?Uint32Array:Array)(ya+za),r,G,v,Z,E=new (C?Uint32Array:Array)(316),D,A,H=new (C?Uint8Array:Array)(19);for(r=G=0;r<ya;r++)F[G++]=X[r];for(r=0;r<za;r++)F[G++]=Y[r];if(!C){r=0;for(Z=H.length;r<Z;++r)H[r]=0}r=D=0;for(Z=F.length;r<Z;r+=G){for(G=1;r+G<Z&&F[r+G]===F[r];++G);v=G;if(0===F[r])if(3>v)for(;0<v--;)E[D++]=0,
H[0]++;else for(;0<v;)A=138>v?v:138,A>v-3&&A<v&&(A=v-3),10>=A?(E[D++]=17,E[D++]=A-3,H[17]++):(E[D++]=18,E[D++]=A-11,H[18]++),v-=A;else if(E[D++]=F[r],H[F[r]]++,v--,3>v)for(;0<v--;)E[D++]=F[r],H[F[r]]++;else for(;0<v;)A=6>v?v:6,A>v-3&&A<v&&(A=v-3),E[D++]=16,E[D++]=A-3,H[16]++,v-=A}f=C?E.subarray(0,D):E.slice(0,D);ga=pa(H,7);for(y=0;19>y;y++)ja[y]=ga[La[y]];for(Q=19;4<Q&&0===ja[Q-1];Q--);wa=qa(ga);B.b(O-257,5,w);B.b(P-1,5,w);B.b(Q-4,4,w);for(y=0;y<Q;y++)B.b(ja[y],3,w);y=0;for(xa=f.length;y<xa;y++)if(R=
f[y],B.b(wa[R],ga[R],w),16<=R){y++;switch(R){case 16:ha=2;break;case 17:ha=3;break;case 18:ha=7;break;default:throw"invalid code: "+R;}B.b(f[y],ha,w)}var Aa=[ua,X],Ba=[va,Y],I,Ca,$,ma,Da,Ea,Fa,Ga;Da=Aa[0];Ea=Aa[1];Fa=Ba[0];Ga=Ba[1];I=0;for(Ca=J.length;I<Ca;++I)if($=J[I],B.b(Da[$],Ea[$],w),256<$)B.b(J[++I],J[++I],w),ma=J[++I],B.b(Fa[ma],Ga[ma],w),B.b(J[++I],J[++I],w);else if(256===$)break;this.a=B.finish();this.c=this.a.length;break;default:throw"invalid compression type";}return this.a};
function ra(f,d){this.length=f;this.k=d}
var sa=function(){function f(b){switch(w){case 3===b:return[257,b-3,0];case 4===b:return[258,b-4,0];case 5===b:return[259,b-5,0];case 6===b:return[260,b-6,0];case 7===b:return[261,b-7,0];case 8===b:return[262,b-8,0];case 9===b:return[263,b-9,0];case 10===b:return[264,b-10,0];case 12>=b:return[265,b-11,1];case 14>=b:return[266,b-13,1];case 16>=b:return[267,b-15,1];case 18>=b:return[268,b-17,1];case 22>=b:return[269,b-19,2];case 26>=b:return[270,b-23,2];case 30>=b:return[271,b-27,2];case 34>=b:return[272,
b-31,2];case 42>=b:return[273,b-35,3];case 50>=b:return[274,b-43,3];case 58>=b:return[275,b-51,3];case 66>=b:return[276,b-59,3];case 82>=b:return[277,b-67,4];case 98>=b:return[278,b-83,4];case 114>=b:return[279,b-99,4];case 130>=b:return[280,b-115,4];case 162>=b:return[281,b-131,5];case 194>=b:return[282,b-163,5];case 226>=b:return[283,b-195,5];case 257>=b:return[284,b-227,5];case 258===b:return[285,b-258,0];default:throw"invalid length: "+b;}}var d=[],c,e;for(c=3;258>=c;c++)e=f(c),d[c]=e[2]<<24|
e[1]<<16|e[0];return d}(),Ha=C?new Uint32Array(sa):sa;
function oa(f,d){function c(b,c){var a=b.k,d=[],e=0,f;f=Ha[b.length];d[e++]=f&65535;d[e++]=f>>16&255;d[e++]=f>>24;var g;switch(w){case 1===a:g=[0,a-1,0];break;case 2===a:g=[1,a-2,0];break;case 3===a:g=[2,a-3,0];break;case 4===a:g=[3,a-4,0];break;case 6>=a:g=[4,a-5,1];break;case 8>=a:g=[5,a-7,1];break;case 12>=a:g=[6,a-9,2];break;case 16>=a:g=[7,a-13,2];break;case 24>=a:g=[8,a-17,3];break;case 32>=a:g=[9,a-25,3];break;case 48>=a:g=[10,a-33,4];break;case 64>=a:g=[11,a-49,4];break;case 96>=a:g=[12,a-
65,5];break;case 128>=a:g=[13,a-97,5];break;case 192>=a:g=[14,a-129,6];break;case 256>=a:g=[15,a-193,6];break;case 384>=a:g=[16,a-257,7];break;case 512>=a:g=[17,a-385,7];break;case 768>=a:g=[18,a-513,8];break;case 1024>=a:g=[19,a-769,8];break;case 1536>=a:g=[20,a-1025,9];break;case 2048>=a:g=[21,a-1537,9];break;case 3072>=a:g=[22,a-2049,10];break;case 4096>=a:g=[23,a-3073,10];break;case 6144>=a:g=[24,a-4097,11];break;case 8192>=a:g=[25,a-6145,11];break;case 12288>=a:g=[26,a-8193,12];break;case 16384>=
a:g=[27,a-12289,12];break;case 24576>=a:g=[28,a-16385,13];break;case 32768>=a:g=[29,a-24577,13];break;default:throw"invalid distance";}f=g;d[e++]=f[0];d[e++]=f[1];d[e++]=f[2];var k,m;k=0;for(m=d.length;k<m;++k)l[h++]=d[k];s[d[0]]++;x[d[3]]++;q=b.length+c-1;u=null}var e,b,a,g,m,k={},p,t,u,l=C?new Uint16Array(2*d.length):[],h=0,q=0,s=new (C?Uint32Array:Array)(286),x=new (C?Uint32Array:Array)(30),fa=f.i,z;if(!C){for(a=0;285>=a;)s[a++]=0;for(a=0;29>=a;)x[a++]=0}s[256]=1;e=0;for(b=d.length;e<b;++e){a=
m=0;for(g=3;a<g&&e+a!==b;++a)m=m<<8|d[e+a];k[m]===n&&(k[m]=[]);p=k[m];if(!(0<q--)){for(;0<p.length&&32768<e-p[0];)p.shift();if(e+3>=b){u&&c(u,-1);a=0;for(g=b-e;a<g;++a)z=d[e+a],l[h++]=z,++s[z];break}0<p.length?(t=Ia(d,e,p),u?u.length<t.length?(z=d[e-1],l[h++]=z,++s[z],c(t,0)):c(u,-1):t.length<fa?u=t:c(t,0)):u?c(u,-1):(z=d[e],l[h++]=z,++s[z])}p.push(e)}l[h++]=256;s[256]++;f.m=s;f.l=x;return C?l.subarray(0,h):l}
function Ia(f,d,c){var e,b,a=0,g,m,k,p,t=f.length;m=0;p=c.length;a:for(;m<p;m++){e=c[p-m-1];g=3;if(3<a){for(k=a;3<k;k--)if(f[e+k-1]!==f[d+k-1])continue a;g=a}for(;258>g&&d+g<t&&f[e+g]===f[d+g];)++g;g>a&&(b=e,a=g);if(258===g)break}return new ra(a,d-b)}
function pa(f,d){var c=f.length,e=new ia(572),b=new (C?Uint8Array:Array)(c),a,g,m,k,p;if(!C)for(k=0;k<c;k++)b[k]=0;for(k=0;k<c;++k)0<f[k]&&e.push(k,f[k]);a=Array(e.length/2);g=new (C?Uint32Array:Array)(e.length/2);if(1===a.length)return b[e.pop().index]=1,b;k=0;for(p=e.length/2;k<p;++k)a[k]=e.pop(),g[k]=a[k].value;m=Ja(g,g.length,d);k=0;for(p=a.length;k<p;++k)b[a[k].index]=m[k];return b}
function Ja(f,d,c){function e(a){var b=k[a][p[a]];b===d?(e(a+1),e(a+1)):--g[b];++p[a]}var b=new (C?Uint16Array:Array)(c),a=new (C?Uint8Array:Array)(c),g=new (C?Uint8Array:Array)(d),m=Array(c),k=Array(c),p=Array(c),t=(1<<c)-d,u=1<<c-1,l,h,q,s,x;b[c-1]=d;for(h=0;h<c;++h)t<u?a[h]=0:(a[h]=1,t-=u),t<<=1,b[c-2-h]=(b[c-1-h]/2|0)+d;b[0]=a[0];m[0]=Array(b[0]);k[0]=Array(b[0]);for(h=1;h<c;++h)b[h]>2*b[h-1]+a[h]&&(b[h]=2*b[h-1]+a[h]),m[h]=Array(b[h]),k[h]=Array(b[h]);for(l=0;l<d;++l)g[l]=c;for(q=0;q<b[c-1];++q)m[c-
1][q]=f[q],k[c-1][q]=q;for(l=0;l<c;++l)p[l]=0;1===a[c-1]&&(--g[0],++p[c-1]);for(h=c-2;0<=h;--h){s=l=0;x=p[h+1];for(q=0;q<b[h];q++)s=m[h+1][x]+m[h+1][x+1],s>f[l]?(m[h][q]=s,k[h][q]=d,x+=2):(m[h][q]=f[l],k[h][q]=l,++l);p[h]=0;1===a[h]&&e(h)}return g}
function qa(f){var d=new (C?Uint16Array:Array)(f.length),c=[],e=[],b=0,a,g,m,k;a=0;for(g=f.length;a<g;a++)c[f[a]]=(c[f[a]]|0)+1;a=1;for(g=16;a<=g;a++)e[a]=b,b+=c[a]|0,b<<=1;a=0;for(g=f.length;a<g;a++){b=e[f[a]];e[f[a]]+=1;m=d[a]=0;for(k=f[a];m<k;m++)d[a]=d[a]<<1|b&1,b>>>=1}return d};function Ka(f,d){this.input=f;this.a=new (C?Uint8Array:Array)(32768);this.d=V.g;var c={},e;if((d||!(d={}))&&"number"===typeof d.compressionType)this.d=d.compressionType;for(e in d)c[e]=d[e];c.outputBuffer=this.a;this.j=new ka(this.input,c)}var V=na;
Ka.prototype.f=function(){var f,d,c,e,b,a,g=0;a=this.a;switch(8){case 8:f=Math.LOG2E*Math.log(32768)-8;break;default:throw Error("invalid compression method");}d=f<<4|8;a[g++]=d;switch(8){case 8:switch(this.d){case V.NONE:e=0;break;case V.h:e=1;break;case V.g:e=2;break;default:throw Error("unsupported compression type");}break;default:throw Error("invalid compression method");}c=e<<6|0;a[g++]=c|31-(256*d+c)%31;var m=this.input;if("string"===typeof m){var k=m.split(""),p,t;p=0;for(t=k.length;p<t;p++)k[p]=
(k[p].charCodeAt(0)&255)>>>0;m=k}for(var u=1,l=0,h=m.length,q,s=0;0<h;){q=1024<h?1024:h;h-=q;do u+=m[s++],l+=u;while(--q);u%=65521;l%=65521}b=(l<<16|u)>>>0;this.j.c=g;a=this.j.f();g=a.length;C&&(a=new Uint8Array(a.buffer),a.length<=g+4&&(this.a=new Uint8Array(a.length+4),this.a.set(a),a=this.a),a=a.subarray(0,g+4));a[g++]=b>>24&255;a[g++]=b>>16&255;a[g++]=b>>8&255;a[g++]=b&255;return a};ba("Zlib.Deflate",Ka);ba("Zlib.Deflate.compress",function(f,d){return(new Ka(f,d)).f()});ba("Zlib.Deflate.prototype.compress",Ka.prototype.f);var Ma={NONE:V.NONE,FIXED:V.h,DYNAMIC:V.g},Na,Oa,W,Pa;if(Object.keys)Na=Object.keys(Ma);else for(Oa in Na=[],W=0,Ma)Na[W++]=Oa;W=0;for(Pa=Na.length;W<Pa;++W)Oa=Na[W],ba("Zlib.Deflate.CompressionType."+Oa,Ma[Oa]);}).call(this);

},{}],28:[function(require,module,exports){
"use strict";

var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

(function (exports) {
  'use strict';

  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var PLUS = '+'.charCodeAt(0);
  var SLASH = '/'.charCodeAt(0);
  var NUMBER = '0'.charCodeAt(0);
  var LOWER = 'a'.charCodeAt(0);
  var UPPER = 'A'.charCodeAt(0);
  var PLUS_URL_SAFE = '-'.charCodeAt(0);
  var SLASH_URL_SAFE = '_'.charCodeAt(0);

  function decode(elt) {
    var code = elt.charCodeAt(0);
    if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'

    if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'

    if (code < NUMBER) return -1; // no match

    if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
    if (code < UPPER + 26) return code - UPPER;
    if (code < LOWER + 26) return code - LOWER + 26;
  }

  function b64ToByteArray(b64) {
    var i, j, l, tmp, placeHolders, arr;

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4');
    } // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice


    var len = b64.length;
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0; // base64 is 4/3 + up to two characters of the original data

    arr = new Arr(b64.length * 3 / 4 - placeHolders); // if there are placeholders, only get up to the last complete 4 chars

    l = placeHolders > 0 ? b64.length - 4 : b64.length;
    var L = 0;

    function push(v) {
      arr[L++] = v;
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
      push((tmp & 0xFF0000) >> 16);
      push((tmp & 0xFF00) >> 8);
      push(tmp & 0xFF);
    }

    if (placeHolders === 2) {
      tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
      push(tmp & 0xFF);
    } else if (placeHolders === 1) {
      tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
      push(tmp >> 8 & 0xFF);
      push(tmp & 0xFF);
    }

    return arr;
  }

  function uint8ToBase64(uint8) {
    var i;
    var extraBytes = uint8.length % 3; // if we have 1 byte left, pad 2 bytes

    var output = '';
    var temp, length;

    function encode(num) {
      return lookup.charAt(num);
    }

    function tripletToBase64(num) {
      return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
    } // go through the array every three bytes, we'll deal with trailing stuff later


    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
      output += tripletToBase64(temp);
    } // pad the end with zeros, but make sure to not forget the extra bytes


    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1];
        output += encode(temp >> 2);
        output += encode(temp << 4 & 0x3F);
        output += '==';
        break;

      case 2:
        temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
        output += encode(temp >> 10);
        output += encode(temp >> 4 & 0x3F);
        output += encode(temp << 2 & 0x3F);
        output += '=';
        break;

      default:
        break;
    }

    return output;
  }

  exports.toByteArray = b64ToByteArray;
  exports.fromByteArray = uint8ToBase64;
})(typeof exports === 'undefined' ? (void 0).base64js = {} : exports);

},{}],29:[function(require,module,exports){
"use strict";

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
function parseUri(str) {
  var o = parseUri.options,
      m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
      uri = {},
      i = 14;

  while (i--) {
    uri[o.key[i]] = m[i] || "";
  }

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });
  return uri;
}

;
parseUri.options = {
  strictMode: false,
  key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
  q: {
    name: "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};
module.exports = parseUri;

},{}],30:[function(require,module,exports){
(function (Buffer){
var COOKIE_KEY_NATIVE_APP_SYNC, DEFAULT_TRACKER_URL, Deflate, FREQUENCY_TYPES, IRREGAL_USER_ID_REGEXP, MAXAGE_TYPES, NATIVE_APP_SYNC_PARAMS_EXPIRE_TIME, Tracker, Visitor, _, __crawl, __log, __plugin, __protocols, _cookie, _localStorage, _request, access, base64, comma_cookie, compress, converter, form, generate_event_transaction_id, global_emitter, jsonStringify, json_cookie, jsonp, jsonpApi, ktid_get, link, merge_query, openUrl, origin, pusher_subscriber, ref, third, tracker_version, updateAccess, uuid, valid_api_key_for_default_form, valid_api_key_for_form, valid_for_create_container,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('lodash-custom');

jsonp = require('component-jsonp');

_request = require('./common/_request');

base64 = require('../external/b64');

Deflate = require('zlibjs/bin/deflate.min').Zlib.Deflate;

uuid = require('./common/uuid');

ref = require('@plaidev/tracker-helpers/platforms/access.web'), access = ref.access, updateAccess = ref.updateAccess;

Visitor = require('@plaidev/tracker-user-detector/src/visitor');

converter = require('./common/converter');

compress = require('./common/compress/index');

openUrl = require('@plaidev/tracker-helpers/platforms/openUrl.web');

MAXAGE_TYPES = require('@plaidev/tracker-helpers/config').MAXAGE_TYPES;

jsonStringify = require('@plaidev/tracker-helpers/stringify');

form = require('./track/form');

link = require('./track/link');

generate_event_transaction_id = require('./protocols/event_transaction_id');

merge_query = require('./common/merge_query');

json_cookie = require('@plaidev/tracker-user-detector/src/cookie/json_cookie');

comma_cookie = require('@plaidev/tracker-user-detector/src/cookie/comma_cookie');

third = require('@plaidev/tracker-user-detector/src/third');

ktid_get = require('@plaidev/tracker-user-detector/src/ktid').get;

__crawl = require('@plaidev/tracker-helpers/__crawl');

jsonpApi = require('./common/jsonp_api').jsonpApi;

valid_api_key_for_form = require('./common/valid_api_key_for_form');

valid_api_key_for_default_form = require('./common/valid_api_key_for_default_form');

valid_for_create_container = require('./common/valid_for_create_container');

tracker_version = require('./version');

_cookie = require('@plaidev/tracker-user-detector/src/cookie/cookie');

_localStorage = require('@plaidev/tracker-helpers/_localStorage');

origin = require('./common/origin');

__log = require('@plaidev/tracker-helpers/__log');

__plugin = require('@plaidev/tracker-plugin-loader');

__protocols = {
  chat: require('./protocols/ChatProtocol'),
  collection: require('./protocols/collection'),
  general: require('./protocols/GeneralProtocol')
};

pusher_subscriber = require('@plaidev/tracker-helpers/platforms/pusher_subscriber.web');

global_emitter = require('./common/global_emitter');

DEFAULT_TRACKER_URL = 'https://static.karte.io/libs/tracker.js';

IRREGAL_USER_ID_REGEXP = /undefined|none|null|nil/i;

COOKIE_KEY_NATIVE_APP_SYNC = 'ntvsync';

NATIVE_APP_SYNC_PARAMS_EXPIRE_TIME = 60;

FREQUENCY_TYPES = {
  ACCESS: 'access',
  SESSION: 'session',
  USER: 'user'
};

Tracker = (function() {
  var stub_jsonp;

  function Tracker() {
    this.__post = bind(this.__post, this);
    this._post = bind(this._post, this);
    this._is_duplicated_transaction = bind(this._is_duplicated_transaction, this);
    this.track = bind(this.track, this);
    this.get_session_info = bind(this.get_session_info, this);
    this.exec_force_action = bind(this.exec_force_action, this);
    this.action = bind(this.action, this);
    this.goal = bind(this.goal, this);
    this.page = bind(this.page, this);
    this.buy = bind(this.buy, this);
    this.identify = bind(this.identify, this);
    this.optout = bind(this.optout, this);
    this.user = bind(this.user, this);
    this.option = bind(this.option, this);
    this.init = bind(this.init, this);
    console.log('hoge');
    this.tracker_initialized = false;
    this._action_plugins = {};
    this._events = [];
    this._enceds = [];
    this._enced_action_ids = [];
    this.access = access;
    this.logined = true;
    this.did_view_event = false;
    this.is_user_checked = false;
    this.box = false;
    this.__user = void 0;
    this.custome_view_data = false;
    this.initialized = false;
    this.post_timer = false;
    this.post_force = false;
    this.post_waiting = false;
    this.protocols = {};
    this._page_loaded = false;
    this._onload_queue = [];
    this._already_message_ready = {};
    this._cg_messages = {};
    this._exclusive_message_runned = false;
    this.pv_id = uuid();
    this.original_pv_id = this.pv_id;
    this._session_info = null;
    this.use_xhr = false;
    this.use_polling = false;
    this.polling_timeout = false;
    this.polling_interval = false;
    this.httponly_cookie = false;
  }

  stub_jsonp = {
    query: function() {
      return this;
    },
    options: function() {
      return this;
    },
    end: function(cb) {
      return cb({
        status: 200,
        success: false
      });
    }
  };

  Tracker.prototype.request = _request;

  Tracker.prototype.jsonp = function(url) {
    if (this.is_preview && !(url.match(new RegExp(this.admin_url))) && !(url.match(new RegExp(this.collection_url)))) {
      return stub_jsonp;
    }
    return jsonp(url);
  };

  Tracker.prototype.ktid_get = ktid_get;

  Tracker.prototype.third = third;

  Tracker.prototype.__crawl = function(val, cb) {
    return __crawl(this, val, cb);
  };

  Tracker.prototype.message_cookie_add = function(campaign_id) {
    if (campaign_id) {
      return this.very_short_cookie.addToSet('message', campaign_id);
    }
  };

  Tracker.prototype.check_fr = function(min_pv, min_time) {
    var pv, time;
    if (min_pv == null) {
      min_pv = 0;
    }
    if (min_time == null) {
      min_time = 0;
    }
    pv = this.short_cookie.get('pv');
    time = this.short_cookie.get('time');
    if (pv != null) {
      pv = ~~pv;
    }
    if (time != null) {
      time = ~~time;
    }
    pv = +pv;
    min_pv = +min_pv;
    time = +time;
    min_time = +min_time;
    if (pv == null) {
      return true;
    }
    if ((min_pv !== 0) && (pv <= min_pv)) {
      return false;
    }
    if ((min_time !== 0) && (time <= min_time)) {
      return false;
    }
    return true;
  };

  Tracker.prototype.update_fr = function(initialize, update) {
    var _date, _pv, _time, date, pv, time;
    if (initialize == null) {
      initialize = false;
    }
    if (update == null) {
      update = true;
    }
    _pv = this.short_cookie.get('pv');
    _time = this.short_cookie.get('time');
    _date = this.short_cookie.get('date');
    if (_pv != null) {
      _pv = ~~_pv;
    }
    if (_time != null) {
      _time = ~~_time;
    }
    if (_date != null) {
      _date = ~~_date;
    }
    pv = 0;
    time = 0;
    date = ~~((new Date()).getTime() / 1000);
    if (!initialize && (_pv == null)) {
      return;
    }
    if (update) {
      pv = _pv != null ? _pv + 1 : 0;
      time = _date ? date - _date : 0;
    } else {
      this.short_cookie.set('date', date);
    }
    this.short_cookie.set('pv', pv);
    return this.short_cookie.set('time', time);
  };

  Tracker.prototype.form_save = function(name, data) {
    if (name == null) {
      name = 'form';
    }
    return _localStorage.set(this.tiny_cookie_key, data, MAXAGE_TYPES.TINY);
  };

  Tracker.prototype.form_remove = function(name) {
    if (name == null) {
      name = 'form';
    }
    return _localStorage.remove(this.tiny_cookie_key);
  };

  Tracker.prototype.form_send = function(name) {
    var data, ref1;
    if (name == null) {
      name = 'form';
    }
    if (this.disable_form_track) {
      return;
    }
    data = _localStorage.get(this.tiny_cookie_key);
    if (!data) {
      return;
    }
    if (data.event_name === 'identify') {
      if (IRREGAL_USER_ID_REGEXP.test((ref1 = data.values) != null ? ref1.user_id : void 0)) {
        delete data.values.user_id;
      }
      this._user = data.values;
    }
    console.log(data);
    this._events.push(data);
    return this.send();
  };

  Tracker.prototype.view = function(data, options) {
    if (options == null) {
      options = {};
    }
    if (this.did_view_event) {
      this.pv_id = uuid();
      this.access = updateAccess();
      if (this.short_cookie != null) {
        this.update_fr();
      }
      if (this._spa_mode) {
        this._reset(options);
      }
      return this.track('view', data);
    } else {
      return this.custome_view_data = data;
    }
  };

  Tracker.prototype.jsonp_option = function() {
    var rand, timestamp;
    timestamp = (new Date()).getTime();
    rand = ~~(Math.random() * 1000000000);
    return {
      callback_header: '__krt_jsonp__' + timestamp + '_' + rand
    };
  };

  Tracker.prototype._save_message_open = function(data) {
    var events, exists, ref1;
    if (!(data != null ? (ref1 = data.values) != null ? ref1.transaction_id : void 0 : void 0)) {
      return;
    }
    if (!data.values.message_pv_id) {
      data.values.message_pv_id = this.pv_id;
    }
    events = _localStorage.get(this.retry_cookie_key) || [];
    exists = _.some(events, function(evt) {
      return evt.values.transaction_id === data.values.transaction_id;
    });
    if (!exists) {
      events.push(data);
      return _localStorage.set(this.retry_cookie_key, events, MAXAGE_TYPES.TINY);
    }
  };

  Tracker.prototype._remove_message_opens = function(transaction_ids) {
    var events;
    if (!((transaction_ids != null ? transaction_ids.length : void 0) > 0)) {
      return;
    }
    events = _localStorage.get(this.retry_cookie_key);
    if (!events) {
      return;
    }
    events = _.filter(events, function(evt) {
      return !_.includes(transaction_ids, evt.values.transaction_id);
    });
    if (events.length > 0) {
      return _localStorage.set(this.retry_cookie_key, events, MAXAGE_TYPES.TINY);
    } else {
      return _localStorage.remove(this.retry_cookie_key);
    }
  };

  Tracker.prototype._resend_message_opens = function() {
    var events;
    events = _localStorage.get(this.retry_cookie_key);
    if (!events) {
      return;
    }
    this._events = this._events.concat(events);
    return this.send();
  };

  Tracker.prototype.check_admin = function(arg, cb) {
    var api_key, q, using_action_viewer;
    api_key = arg.api_key, using_action_viewer = arg.using_action_viewer;
    q = {
      api_key: api_key
    };
    if (using_action_viewer != null) {
      q.using_action_viewer = using_action_viewer;
    }
    return this.jsonp(this.admin_url + '/check_login').query(q).options(this.jsonp_option()).end((function(_this) {
      return function(data) {
        if (!data.success) {
          return;
        }
        data.user_id = _this._user_id();
        if (cb) {
          return cb(data);
        }
        if (_this.is_preview && _this.preview_id) {
          return _this._preview();
        }
      };
    })(this));
  };

  Tracker.prototype._preview = function() {
    if (!(this.is_preview && this.preview_id)) {
      return;
    }
    return this.jsonp(this.admin_url + '/_preview/' + this.preview_id).query(this.preview_token ? {
      preview_token: this.preview_token,
      api_key: this.api_key
    } : {
      api_key: this.api_key
    }).options(this.jsonp_option()).end((function(_this) {
      return function(data) {
        var action;
        if ((!data) || (!(data != null ? data.action : void 0))) {
          return;
        }
        if (data.error) {
          return;
        }
        action = data.action;
        return _this._run([action], {
          style: data.style
        });
      };
    })(this));
  };

  Tracker.prototype.admin = function() {};

  Tracker.prototype.init = function(api_key, options) {
    var _origin, app_name, err, key, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, ref_user_id, ref_visitor_id, reg, syncparam, vals;
    if (options == null) {
      options = {};
    }
    this.__opts = (ref1 = this.access.uri) != null ? (ref2 = ref1.queryKey) != null ? ref2.__karte_opts : void 0 : void 0;
    if (this.__opts != null) {
      try {
        this.__opts = decodeURIComponent(this.__opts);
        this.__opts = JSON.parse(this.__opts);
      } catch (error) {
        err = error;
        __log(err, this.__opts);
      }
    }
    if ((ref3 = this.__opts) != null ? ref3.cancel : void 0) {
      return;
    }
    this.api_key = api_key || ((ref4 = this.__opts) != null ? ref4.api_key : void 0);
    if (!this.api_key) {
      return;
    }
    this._parse_options(options);
    this.adm_on = ((ref5 = this.__opts) != null ? ref5.adm_on : void 0) || false;
    this.is_preview = ((ref6 = this.__opts) != null ? ref6.is_preview : void 0) || false;
    this.preview_id = ((ref7 = this.__opts) != null ? ref7.preview_id : void 0) || false;
    this.preview_token = ((ref8 = this.__opts) != null ? ref8.preview_token : void 0) || false;
    this.use_xhr = options.use_xhr || false;
    this.use_polling = options.use_polling || false;
    this.polling_timeout = options.polling_timeout || false;
    this.polling_interval = options.polling_interval || false;
    this.httponly_cookie = options.httponly_cookie || false;
    this.disable_form_track = (ref9 = options.disable_form_track) != null ? ref9 : false;
    if (valid_api_key_for_default_form(this.api_key)) {
      this.default_form = this._form();
      if (options.disable_form_track) {
        this.default_form.destroy();
      }
    } else {
      this.default_form = null;
    }
    this._init_cookies();
    this.update_fr();
    this.visitor = new Visitor(this._cookie, this._old_cookie);
    this._watch_readystate_and_body();
    if (this.is_preview && this.preview_id && this.preview_token) {
      setTimeout((function(_this) {
        return function() {
          return _this._preview();
        };
      })(this), 1000);
    }
    ref_user_id = (ref10 = this.access.uri) != null ? (ref11 = ref10.queryKey) != null ? ref11._k_uid : void 0 : void 0;
    ref_visitor_id = (ref12 = this.access.uri) != null ? (ref13 = ref12.queryKey) != null ? ref13._k_vid : void 0 : void 0;
    if (ref_user_id || ref_visitor_id) {
      return this._init(ref_user_id, ref_visitor_id);
    }
    syncparam = this._retrieve_available_native_app_sync_parameter();
    if (syncparam) {
      this._cookie.set(COOKIE_KEY_NATIVE_APP_SYNC, encodeURIComponent(JSON.stringify(syncparam)));
      return this._init(null, syncparam.visitor_id);
    }
    ref15 = (ref14 = this.access.uri) != null ? ref14.queryKey : void 0;
    for (key in ref15) {
      vals = ref15[key];
      reg = /\_k\_(\S+)\_uid/;
      if (key.match(reg)) {
        app_name = key.match(reg)[1];
        if (vals) {
          this.track("plugin_" + app_name + "_identify", {
            encrypted_user_id: vals
          });
        }
      }
    }
    this.ktid = this._cookie.get('ktid');
    if ((!this.ktid_check) || this.ktid) {
      return this._pcheck();
    }
    if (this.ktid_check && (!this.ktid)) {
      _origin = origin(this.ktid_url);
      return this.ktid_get(_origin, this.ktid_url, (function(_this) {
        return function(err, arg) {
          var ktid;
          ktid = arg.ktid;
          if (!ktid) {
            _this._pcheck();
          }
          _this.ktid = ktid;
          _this._cookie.set('ktid', ktid);
          if (ktid) {
            _this.track('get_ktid', {
              ktid: ktid
            });
          }
          return _this._init(void 0, ktid, void 0);
        };
      })(this));
    }
  };

  Tracker.prototype._watch_readystate_and_body = function() {
    var ref1;
    if (((ref1 = document.readyState.toLowerCase()) === 'interactive' || ref1 === 'complete') && document.body) {
      return this._page_loaded = true;
    } else {
      return typeof document.addEventListener === "function" ? document.addEventListener('readystatechange', (function(_this) {
        return function() {
          var i, len, onload, ref2, ref3;
          if ((ref2 = document.readyState.toLowerCase()) === 'interactive' || ref2 === 'complete') {
            if (!document.body) {
              return;
            }
            _this._page_loaded = true;
            ref3 = _this._onload_queue;
            for (i = 0, len = ref3.length; i < len; i++) {
              onload = ref3[i];
              onload();
            }
            return _this._onload_queue = [];
          }
        };
      })(this), false) : void 0;
    }
  };

  Tracker.prototype._init_cookies = function() {
    var form_cookie, frq_cookie, long_message_cookie, message_cookie, temp_cookie;
    this._old_cookie = _cookie.create(this._domain, this._site_id, this._subdomain);
    this._cookie = _cookie.create(this._domain, this._site_id, this._subdomain, true, true);
    this._cookie_no_dot = _cookie.create(this._domain, this._site_id, this._subdomain, true);
    this._cookie_no_dot2 = _cookie.create(this._domain, this._site_id, this._subdomain, true, true);
    this.tiny_cookie_key = 'krt.i';
    this.retry_cookie_key = 'krt.r';
    if (this._site_id) {
      this.tiny_cookie_key += "." + this._site_id;
      this.retry_cookie_key += "." + this._site_id;
    }
    this.tiny_cookie = comma_cookie(this._cookie_no_dot2, 't', MAXAGE_TYPES.TINY, true);
    this.very_short_cookie = comma_cookie(this._cookie_no_dot2, 'v', MAXAGE_TYPES.VERY_SHORT, true);
    this.short_cookie = comma_cookie(this._cookie_no_dot2, 's', MAXAGE_TYPES.SHORT, true);
    long_message_cookie = json_cookie(this._cookie_no_dot, 'lmsg', MAXAGE_TYPES.LONG);
    long_message_cookie.clear();
    message_cookie = json_cookie(this._cookie_no_dot, 'msg', MAXAGE_TYPES.SHORT);
    message_cookie.clear();
    form_cookie = json_cookie(this._cookie_no_dot, 'frm', MAXAGE_TYPES.TINY);
    form_cookie.clear();
    frq_cookie = json_cookie(this._cookie_no_dot, 'frq', MAXAGE_TYPES.SHORT);
    frq_cookie.clear();
    temp_cookie = json_cookie(this._cookie_no_dot, 'tmc', MAXAGE_TYPES.TINY);
    temp_cookie.clear();
    return this.short_cookie.update();
  };

  Tracker.prototype._parse_options = function(options) {
    var ref1, ref2, ref3;
    this.pusher_api_key = options.pusher_api_key || "488ab97e6f00b1032012";
    this.pusher_cluster = options.pusher_cluster || "mt1";
    this.track_url = options.track_url || 'https://t.karte.io/track';
    this.chat_url = options.chat_url || 'https://t.karte.io/chat';
    this.collection_url = options.collection_url || 'https://t.karte.io/collection';
    this.general_url = options.general_url || 'https://t.karte.io/general';
    this.ktid_url = options.ktid_url || 'https://t.karte.io/empt';
    this.admin_url = options.admin_url || 'https://admin.karte.io';
    this.manual_send = (ref1 = options.manual_send) != null ? ref1 : false;
    this._domain = options.domain || false;
    this._subdomain = (ref2 = options.subdomain) != null ? ref2 : true;
    this._site_id = options.site_id || '';
    this.ktid_check = (ref3 = options.ktid_check) != null ? ref3 : false;
    this.nonce = options.nonce;
    this.token = options.token;
    this.timestamp = options.timestamp;
    this.disable_create_container = options.disable_create_container || false;
    this._spa_mode = options.spa_mode || false;
    this._tracker_url = options.tracker_url || DEFAULT_TRACKER_URL;
    this._save_segments = options.save_segments || false;
    return this._webview_only = options.webview_only || false;
  };

  Tracker.prototype._pcheck = function() {
    return this._init();
  };

  Tracker.prototype._init = function(uid, vid) {
    var err;
    this._update_ids(uid, vid);
    this.visitor.init();
    if (valid_api_key_for_form(this.api_key)) {
      this.form_send('form');
    }
    this.form_send('link');
    this._resend_message_opens();
    this.protocols.chat = new __protocols.chat(this);
    this.protocols.collection = __protocols.collection;
    this.protocols.general = __protocols.general;
    __plugin.init({
      tracker_url: this._tracker_url
    });
    try {
      if (window.__karte_preload_plugins) {
        window.__karte_preload_plugins();
        delete window.__karte_preload_plugins;
      }
    } catch (error) {
      err = error;
      __log(err);
    }
    this.collection = this.protocols.collection.init({
      get: (function(_this) {
        return function(q, cb) {
          q.api_key = _this.api_key;
          return jsonpApi(_this, _this.collection_url, 'get', q, cb);
        };
      })(this),
      set: (function(_this) {
        return function(q, cb) {
          q.api_key = _this.api_key;
          return jsonpApi(_this, _this.collection_url, 'post', q, cb);
        };
      })(this),
      "delete": (function(_this) {
        return function(q, cb) {
          q.api_key = _this.api_key;
          return jsonpApi(_this, _this.collection_url, 'delete', q, cb);
        };
      })(this),
      getByFilters: (function(_this) {
        return function(q, cb) {
          q.api_key = _this.api_key;
          return jsonpApi(_this, _this.collection_url, 'get', q, cb);
        };
      })(this)
    }, this._user_id());
    this.general = this.protocols.general.init({
      post: (function(_this) {
        return function(q, cb) {
          q.api_key = _this.api_key;
          return jsonpApi(_this, _this.general_url, 'post', q, cb);
        };
      })(this)
    }, this._user_id());
    this.initialized = true;
    this._post();
    return setTimeout((function(_this) {
      return function() {
        var findmyself, ref1, ref2;
        findmyself = require('@plaidev/tracker-user-detector/src/findmyself');
        return findmyself((ref1 = _this.__user) != null ? ref1.user_id : void 0, (ref2 = _this.visitor) != null ? ref2.visitor_id : void 0, _this.admin_url);
      };
    })(this), 2000);
  };

  Tracker.prototype._update_ids = function(user_id, visitor_id) {
    var old_visitor_id;
    old_visitor_id = this.visitor.getVisitorId();
    if (visitor_id != null) {
      this.visitor.visitor_id = visitor_id;
    }
    if ((old_visitor_id && visitor_id) && (old_visitor_id !== visitor_id)) {
      return this._set_old_visitor_id(old_visitor_id);
    }
  };

  Tracker.prototype._set_old_visitor_id = function(old_visitor_id) {
    return this.tiny_cookie.set('ovid', old_visitor_id);
  };

  Tracker.prototype._get_old_visitor_id = function() {
    return this.tiny_cookie.get('ovid');
  };

  Tracker.prototype.option = function(options) {
    if (options == null) {
      options = {};
    }
    this.track_url = options.track_url || 'https://t.karte.io/track';
    this.admin_url = options.admin_url || 'https://admin.karte.io';
    this.chat_url = options.chat_url || 'https://t.karte.io/chat';
    this.collection_url = options.collection_url || 'https://t.karte.io/collection';
    this.general_url = options.general_url || 'https://t.karte.io/general';
    return __plugin.init({
      tracker_url: options.tracker_url != null ? options.tracker_url : void 0
    });
  };

  Tracker.prototype.convert_url = function(host, url) {
    var err, q, ref1;
    if ((!host) || (document.domain === host)) {
      return url;
    }
    try {
      q = {
        _k_vid: this.visitor.visitor_id
      };
      if (((ref1 = this._user) != null ? ref1.user_id : void 0) != null) {
        q._k_uid = this._user.user_id;
      }
      url = merge_query(url, q);
    } catch (error) {
      err = error;
    }
    return url;
  };

  Tracker.prototype._form = function(selector, event_name, send_data, track_domain, data) {
    var frm;
    if (!valid_api_key_for_form(this.api_key)) {
      return;
    }
    frm = form.create(selector, event_name, this, {
      send_data: send_data,
      track_domain: track_domain,
      data: data
    });
    frm.on('form', (function(_this) {
      return function(data) {
        _this.form_save('form', data);
        return _this.form_send('form');
      };
    })(this));
    return frm;
  };

  Tracker.prototype.form = function(selector, options) {
    var data, frm;
    if (options == null) {
      options = {};
    }
    if (!valid_api_key_for_form(this.api_key)) {
      return;
    }
    data = _.omit(options, 'event_name', 'send_data', 'track_domain');
    frm = this._form(selector, options.event_name, options.send_data, options.track_domain, data);
    if (this.default_form) {
      this.default_form.destroy();
    }
    return frm;
  };

  Tracker.prototype._link = function(selector, options) {
    var lnk;
    if (options == null) {
      options = {};
    }
    console.log('_link');
    lnk = link.create(selector, options.event_name, this, options);
    console.log(lnk);
    window._lnk = lnk;
    lnk.on('link', (function(_this) {
      return function(data) {
        console.log('link.on');
        _this.form_save('link', data);
        return _this.form_send('link');
      };
    })(this));
    return lnk;
  };

  Tracker.prototype.link = function(selector, options) {
    if (options == null) {
      options = {};
    }
    console.log('link');
    return this._link(selector, options);
  };

  Tracker.prototype.user = function(values, cb) {
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.identify(values, cb);
  };

  Tracker.prototype.optout = function(values, cb) {
    var expire;
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    expire = new Date();
    expire.setTime(expire.getTime() + (3600 * 24 * 1000 * 365 * 2));
    return document.cookie = "krt_oo=1;expires=" + expire.toGMTString() + ";path=/";
  };

  Tracker.prototype.identify = function(values, cb) {
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.track('identify', values, cb);
  };

  Tracker.prototype.buy = function(values, cb) {
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.track('buy', values, cb);
  };

  Tracker.prototype.page = function(values, cb) {
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.track('page', values, cb);
  };

  Tracker.prototype.goal = function(values, cb) {
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.track('goal', values, cb);
  };

  Tracker.prototype.action = function(values, cb) {
    if (values == null) {
      values = {};
    }
    if (cb == null) {
      cb = null;
    }
    return this.track('action', values, cb);
  };

  Tracker.prototype.chat = function(operation_name, options, cb) {
    if (operation_name == null) {
      operation_name = 'open';
    }
    if (options == null) {
      options = {};
    }
    return this.protocols.chat.operation(operation_name, options, cb);
  };

  Tracker.prototype.exec_force_action = function(values, options, cb) {
    if (options == null) {
      options = {};
    }
    if (cb == null) {
      cb = null;
    }
    this._enced_action_ids.push(values);
    this._track_options = options;
    if (this.tracker_initialized) {
      return this._post(true);
    }
  };

  Tracker.prototype.get_session_info = function() {
    return this._session_info;
  };

  Tracker.prototype.get_user_id = function() {
    var ref1;
    return ((ref1 = this._session_info) != null ? ref1.user_id : void 0) || this._user_id();
  };

  Tracker.prototype.track = function(event_name, values, has_session, options, cb) {
    var evt, key, message_shorten_id, msg, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, ref_user_id, shorten_id;
    if (values == null) {
      values = {};
    }
    if (has_session == null) {
      has_session = false;
    }
    if (options == null) {
      options = {};
    }
    if (cb == null) {
      cb = null;
    }
    if (!_.isString(event_name)) {
      __log(new Error("Invalid event_name: " + (JSON.stringify(event_name)) + ". event_name must be string."));
      if (cb) {
        return cb(null);
      }
      return;
    }
    if (_.isFunction(has_session)) {
      cb = has_session;
      has_session = false;
    }
    if (event_name === 'identify') {
      if (IRREGAL_USER_ID_REGEXP.test(values.user_id)) {
        delete values.user_id;
      }
      this._user = values;
    }
    if (this._is_duplicated_transaction(values)) {
      if (this.tracker_initialized) {
        this._post();
      }
      if (cb) {
        return cb(null);
      }
      return;
    }
    if (has_session) {
      if (this.did_view_event && cb) {
        return cb(null);
      }
      if (this.did_view_event) {
        return;
      }
      this.did_view_event = true;
      if (this.custome_view_data) {
        ref1 = this.custome_view_data;
        for (key in ref1) {
          if (!hasProp.call(ref1, key)) continue;
          values[key] = this.custome_view_data[key];
        }
      }
      ref_user_id = (ref2 = this.access.uri) != null ? (ref3 = ref2.queryKey) != null ? ref3._k_uid : void 0 : void 0;
      if (ref_user_id != null) {
        message_shorten_id = (ref4 = this.access.uri) != null ? (ref5 = ref4.queryKey) != null ? ref5._k_mid : void 0 : void 0;
        this._events.push({
          event_name: 'message_clicked',
          values: {
            message: {
              shorten_id: message_shorten_id
            }
          }
        });
      }
      shorten_id = (ref6 = this.access.uri) != null ? (ref7 = ref6.queryKey) != null ? ref7._k_sid : void 0 : void 0;
      if (shorten_id != null) {
        this._events.push({
          event_name: 'personal_url_accessed',
          values: {
            shorten_id: shorten_id
          }
        });
      }
    }
    if (event_name === 'enced') {
      this._enceds.push(values);
    } else {
      evt = {
        event_name: event_name,
        values: values,
        cb: cb
      };
      if (this.source_message) {
        msg = _.pick(this.source_message, ['shorten_id', 'campaign_id', 'response_timestamp']);
        msg.title = (ref8 = this.source_message) != null ? (ref9 = ref8.content) != null ? ref9.title : void 0 : void 0;
        evt.values._system = {};
        evt.values._system.message = msg;
      }
      this._events.push(evt);
    }
    this._track_options = options;
    if (this.tracker_initialized) {
      return this._post(false);
    }
  };

  Tracker.prototype._is_duplicated_transaction = function(values) {
    var last_transaction_id, transaction_id;
    transaction_id = values.transaction_id;
    if (transaction_id == null) {
      return false;
    }
    last_transaction_id = this.tiny_cookie.get('ltr');
    this.tiny_cookie.set('ltr', transaction_id);
    return transaction_id === last_transaction_id;
  };

  Tracker.prototype._check_user = function() {
    var ref1, ref2, user_id;
    if (this.is_user_checked) {
      return;
    }
    this.is_user_checked = true;
    if (this._user == null) {
      if (typeof user_id === "undefined" || user_id === null) {
        user_id = (ref1 = this.access.uri) != null ? (ref2 = ref1.queryKey) != null ? ref2._k_uid : void 0 : void 0;
        if (user_id) {
          user_id = decodeURIComponent(user_id);
        }
      }
      if (user_id != null) {
        this._user = {
          user_id: user_id
        };
      }
      return this.logined = false;
    } else {
      return this.logined = true;
    }
  };

  Tracker.prototype.send = function() {
    return this._post(true);
  };

  Tracker.prototype.collection = function() {
    return void 0;
  };

  Tracker.prototype.cmd = function() {
    var args, cmd;
    cmd = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    switch (cmd) {
      case 'collection':
        return this.collection.apply(this, args);
    }
  };

  Tracker.prototype._user_id = function() {
    var ref1, user_id;
    if ((ref1 = this._user) != null ? ref1.user_id : void 0) {
      user_id = this._user.user_id;
    } else {
      user_id = 'vis-' + this.visitor.visitor_id;
    }
    return user_id;
  };

  Tracker.prototype.initSubscriber = function() {
    return pusher_subscriber.init(this);
  };

  Tracker.prototype._reset = function(options) {
    var close_actions, close_exclusive_action, hasExclusive, ref1, reset_exclusive_action, reset_past_actions;
    ref1 = _.extend({
      reset_exclusive_action: true,
      reset_past_actions: false,
      close_actions: false,
      close_exclusive_action: false
    }, this._spa_mode, options), reset_exclusive_action = ref1.reset_exclusive_action, reset_past_actions = ref1.reset_past_actions, close_actions = ref1.close_actions, close_exclusive_action = ref1.close_exclusive_action;
    this._reset_plugins({
      close_actions: close_actions,
      close_exclusive_action: close_exclusive_action,
      reset_past_actions: reset_past_actions
    });
    if (reset_past_actions) {
      this._cg_messages = {};
      this._already_message_ready = {};
    }
    if (reset_exclusive_action) {
      hasExclusive = false;
      if (!close_actions) {
        hasExclusive = _.some(_.values(this._action_plugins), (function(_this) {
          return function(plugin) {
            return (plugin != null ? typeof plugin.hasExclusive === "function" ? plugin.hasExclusive(_this._exclusive_message_runned) : void 0 : void 0) || false;
          };
        })(this));
      }
      if (!hasExclusive) {
        return this._exclusive_message_runned = false;
      }
    }
  };

  Tracker.prototype._reset_plugins = function(options) {
    var name, plugin, ref1, results;
    ref1 = this._action_plugins;
    results = [];
    for (name in ref1) {
      plugin = ref1[name];
      results.push(typeof plugin.reset === "function" ? plugin.reset(options) : void 0);
    }
    return results;
  };

  Tracker.prototype._action_plugin_initialize = function(plugin) {
    var err;
    try {
      if (typeof plugin.init === "function") {
        plugin.init(this);
      }
    } catch (error) {
      err = error;
      __log(err);
    }
    if (plugin.on) {
      plugin.on('event', (function(_this) {
        return function(data) {
          var ref1, ref2, ref3, ref4, target, url;
          if (data.event_name === 'message_open') {
            _this.message_cookie_add((ref1 = data.values.message) != null ? ref1.campaign_id : void 0);
            if (((ref2 = data.values.message) != null ? ref2.frequency_type : void 0) !== FREQUENCY_TYPES.ACCESS) {
              _this.update_fr(true, false);
            }
          }
          if (data.event_name === 'message_click') {
            if (((ref3 = _this.__user) != null ? ref3.is_admin : void 0) || _this.is_preview) {
              ref4 = data.values || {}, url = ref4.url, target = ref4.target;
              openUrl(url, target, true);
              return;
            }
          }
          return _this.track(data.event_name, data.values);
        };
      })(this));
    }
    return plugin;
  };

  Tracker.prototype._filterExclusiveMessages = function(msgs) {
    var _getCoexistPolicy;
    _getCoexistPolicy = function(msg) {
      var ref1, ref2;
      if ((ref1 = msg.coexist_policy) === 'always' || ref1 === 'exclusive') {
        return msg.coexist_policy;
      }
      if (msg.type === 'control') {
        return 'always';
      }
      if ((ref2 = msg.view_type) === 'webchat' || ref2 === 'script') {
        return 'always';
      }
      if (msg.view_type === 'widget' && msg.widget_display_policy !== 'exclusive') {
        return 'always';
      }
      return 'exclusive';
    };
    return _.filter(msgs, (function(_this) {
      return function(msg) {
        var policy, ref1;
        policy = _getCoexistPolicy(msg);
        if (policy === 'exclusive') {
          if (_this._exclusive_message_runned) {
            _this._track_message_suppressed(msg, "suppressed by coexist_policy");
            return false;
          }
          _this._exclusive_message_runned = (ref1 = msg._id) != null ? ref1 : true;
          return true;
        } else {
          return true;
        }
      };
    })(this));
  };

  Tracker.prototype._run = function(msgs, project) {
    var _msgs, i, len, msg, no_run, plugin_name, requiredModules;
    if (project == null) {
      project = {};
    }
    msgs = this._filterExclusiveMessages(msgs);
    requiredModules = [];
    _msgs = {};
    for (i = 0, len = msgs.length; i < len; i++) {
      msg = msgs[i];
      no_run = this._push_events_of_actions(msg);
      if (no_run) {
        continue;
      }
      plugin_name = this._get_plugin_name(msg);
      requiredModules = requiredModules.concat(this._get_required_modules(msg, requiredModules, plugin_name));
      if (plugin_name in _msgs) {
        _msgs[plugin_name].push(msg);
      } else {
        _msgs[plugin_name] = [msg];
      }
    }
    requiredModules = _.uniq(requiredModules);
    return __plugin.loadPlugins(requiredModules, (function(_this) {
      return function(err, _modules) {
        if (err) {
          __log(new Error('plugin not found'));
          return;
        }
        if (indexOf.call(requiredModules, 'webchat') >= 0) {
          _this._action_plugins['webchat'] = _this._action_plugin_initialize(_modules['webchat']);
        }
        if (_this._page_loaded) {
          return _this.__run(_msgs, _modules, project);
        } else {
          return _this._onload_queue.push(function() {
            return _this.__run(_msgs, _modules, project);
          });
        }
      };
    })(this));
  };

  Tracker.prototype.__run = function(_msgs, _modules, project) {
    return _.map(_.keys(_msgs), (function(_this) {
      return function(plugin_name) {
        var err, plugin;
        plugin = _modules[plugin_name];
        if (!plugin) {
          return;
        }
        if (!(plugin_name in _this._action_plugins)) {
          _this._action_plugins[plugin_name] = _this._action_plugin_initialize(plugin);
        }
        try {
          if (plugin_name === 'webpopup') {
            if (valid_for_create_container(_this.api_key, _this.disable_create_container)) {
              plugin.create_container();
            }
          }
          return plugin.run(_msgs[plugin_name], project, _modules);
        } catch (error) {
          err = error;
          return __log(err);
        }
      };
    })(this));
  };

  Tracker.prototype._push_events_of_actions = function(msg) {
    var eventData, ref1, ref2, ref3;
    if ((!this._already_message_ready[msg.shorten_id]) && (!((ref1 = this.__user) != null ? ref1.is_admin : void 0))) {
      this._already_message_ready[msg.shorten_id] = true;
      eventData = {
        event_name: '_message_ready',
        values: {
          message: {
            shorten_id: msg.shorten_id,
            campaign_id: msg.campaign_id
          },
          no_action: (ref2 = msg.no_action) != null ? ref2 : false
        }
      };
      if (msg.no_action && msg.reason) {
        eventData.values.reason = msg.reason;
      }
      if (msg.encrypted_trigger) {
        eventData.values.message.encrypted_trigger = msg.encrypted_trigger;
      }
      this._events.push(eventData);
    }
    if (msg.no_action) {
      return true;
    }
    if (msg.type === 'control') {
      if (this._cg_messages[msg.campaign_id]) {
        return true;
      }
      this._cg_messages[msg.campaign_id] = true;
      if ((ref3 = this.__user) != null ? ref3.is_admin : void 0) {
        return true;
      }
      eventData = {
        event_name: 'message_open',
        values: {
          message: {
            title: 'コントロール',
            shorten_id: msg.shorten_id,
            campaign_id: msg.campaign_id,
            response_timestamp: msg.response_timestamp
          }
        }
      };
      if (msg.encrypted_trigger) {
        eventData.values.message.encrypted_trigger = msg.encrypted_trigger;
      }
      this._events.push(eventData);
      if (msg.frequency_type !== FREQUENCY_TYPES.ACCESS) {
        this.update_fr(true, false);
      }
      this.message_cookie_add(msg.campaign_id);
      return true;
    }
    return false;
  };

  Tracker.prototype._get_plugin_name = function(msg) {
    var plugin_name;
    if (msg.view_type === 'widget') {
      switch (msg.widget_version) {
        case 'v1':
          return plugin_name = 'widget-v1';
        default:
          return plugin_name = 'widget';
      }
    } else if (msg.view_type === 'webchat') {
      return plugin_name = 'webchat';
    } else if (msg.view_type === 'script') {
      return plugin_name = 'script';
    } else {
      return plugin_name = msg.plugin_type || 'webpopup';
    }
  };

  Tracker.prototype._get_required_modules = function(msg, requiredModules, plugin_name) {
    var _module, i, j, len, len1, ref1, ref2, ref3, ref4, ret;
    ret = [];
    if (((ref1 = msg.content) != null ? (ref2 = ref1.script) != null ? ref2.indexOf('chat.open') : void 0 : void 0) !== -1) {
      this.last_chat_message = msg;
      if (!(indexOf.call(requiredModules, 'webchat') >= 0)) {
        ret.push('webchat');
      }
    }
    if (!(indexOf.call(requiredModules, plugin_name) >= 0)) {
      ret.push(plugin_name);
    }
    if (msg.required_modules != null) {
      ref3 = msg.required_modules;
      for (i = 0, len = ref3.length; i < len; i++) {
        _module = ref3[i];
        if (!(indexOf.call(requiredModules, _module) >= 0)) {
          ret.push(_module);
        }
      }
    } else if (msg.view_type === 'widget' && msg.widget_version === 'v2') {
      ref4 = ['jquery', 'moment', 'lodash'];
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        _module = ref4[j];
        if (!(indexOf.call(requiredModules, _module) >= 0)) {
          ret.push(_module);
        }
      }
    }
    return ret;
  };

  Tracker.prototype._csync_url_check = function(urls) {
    var d, i, image, key, len, long_cookie, n, results;
    long_cookie = json_cookie(this._cookie_no_dot, 'lng', MAXAGE_TYPES.LONG);
    results = [];
    for (i = 0, len = urls.length; i < len; i++) {
      d = urls[i];
      if ((!d.name) || (!d.url)) {
        continue;
      }
      key = 'cs:' + d.name;
      if (long_cookie.get(key)) {
        continue;
      }
      image = document.createElement("img");
      image.src = d.url;
      n = document.getElementsByTagName("body")[0];
      n.appendChild(image);
      results.push(long_cookie.set(key, 1));
    }
    return results;
  };

  Tracker.prototype._check_link = function(events, callFromAsyncMethod) {
    var evt, i, isOpenCurrentWindow, len, ref1, target, url;
    for (i = 0, len = events.length; i < len; i++) {
      evt = events[i];
      if (evt.event_name === 'message_click') {
        ref1 = evt.values || {}, url = ref1.url, target = ref1.target;
        isOpenCurrentWindow = openUrl(url, target, callFromAsyncMethod);
        if (isOpenCurrentWindow) {
          return true;
        }
      }
    }
  };

  Tracker.prototype._gzip = function(d) {
    var deflate;
    deflate = new Deflate(new Buffer(jsonStringify(d)));
    return base64.fromByteArray(deflate.compress());
  };

  Tracker.prototype._post = function(force) {
    if (force == null) {
      force = false;
    }
    if (force) {
      this.post_force = force;
    }
    if (this.post_waiting) {
      return;
    }
    this.post_waiting = true;
    return setTimeout((function(_this) {
      return function() {
        _this.__post(_this.post_force);
        return _this.post_waiting = false;
      };
    })(this), 100);
  };

  Tracker.prototype.__post = function(force) {
    var enced_action_ids, enceds, events, options, override_user_id, q, track_id, transaction_ids;
    if (force == null) {
      force = false;
    }
    if ((!force) && this.manual_send) {
      return;
    }
    if (!this.initialized) {
      return;
    }
    if (this.is_preview) {
      return;
    }
    if (this._webview_only && this._is_disabled_native_app_sync()) {
      return;
    }
    this._check_user();
    options = this._track_options;
    override_user_id = options != null ? options.user_id : void 0;
    this._track_options = false;
    if (override_user_id == null) {
      this.track('view', {}, true);
    }
    events = this._events;
    enceds = this._enceds;
    enced_action_ids = this._enced_action_ids;
    this._events = [];
    this._enceds = [];
    this._enced_action_ids = [];
    if ((events.length === 0) && (enceds.length === 0) && (enced_action_ids.length === 0)) {
      return;
    }
    transaction_ids = _.map(events, (function(_this) {
      return function(evt) {
        var tid;
        if (evt.event_name !== 'message_open') {
          return null;
        }
        if (!evt.values.transaction_id) {
          tid = generate_event_transaction_id(Date.now());
          evt.values = _.extend({
            transaction_id: tid
          }, evt.values);
        }
        _this._save_message_open(evt);
        return evt.values.transaction_id;
      };
    })(this));
    transaction_ids = _.compact(transaction_ids);
    track_id = uuid();
    q = this._createQuery(events, enceds, enced_action_ids, override_user_id, track_id);
    return this.request({
      url: this.track_url,
      query: q,
      jsonp_option: this.jsonp_option(),
      use_xhr: this.use_xhr,
      use_polling: this.use_polling,
      polling_timeout: this.polling_timeout,
      polling_interval: this.polling_interval,
      jsonp: this.jsonp,
      pocky: this
    }, (function(_this) {
      return function(data) {
        var breaks, isOpenCurrentWindow, ref1, ref2, ref3, ref4, sessionInfo;
        events.forEach(function(evt) {
          if (evt.cb) {
            return evt.cb(data.status);
          }
        });
        _this.form_remove('form');
        _this.form_remove('link');
        _this._remove_message_opens(transaction_ids);
        if (data.status === 200) {
          if ((ref1 = data.user) != null ? ref1.session_id : void 0) {
            _this._session_info = {
              user_id: data.user.user_id,
              pv_id: _this.pv_id,
              original_pv_id: _this.original_pv_id,
              session_id: data.user.session_id
            };
          }
          if (window.__karte_recorder && ((ref2 = data.user) != null ? ref2.session_id : void 0)) {
            sessionInfo = {
              pv_id: _this.pv_id,
              original_pv_id: _this.original_pv_id,
              session_id: data.user.session_id
            };
            if ((ref3 = window.__karte_recorder) != null) {
              if (typeof ref3.setSessionInfo === "function") {
                ref3.setSessionInfo(sessionInfo);
              }
            }
          }
          if (data.need_for_page_crawl) {
            _this.__crawl();
          }
          if (_this._save_segments) {
            _this._saveSegments((ref4 = data.user) != null ? ref4.segments : void 0);
          }
          breaks = _this._action(data, events);
          if (breaks) {
            return;
          }
        }
        isOpenCurrentWindow = _this._check_link(events, true);
        return _this._post();
      };
    })(this));
  };

  Tracker.prototype._saveSegments = function(segments) {
    return _localStorage.set('segments', segments);
  };

  Tracker.prototype._createQuery = function(events, enceds, enced_action_ids, another_user_id, track_id) {
    var d, keys, syncparam;
    keys = this._createKeys();
    if (another_user_id) {
      keys.user_id = another_user_id;
    }
    events = _.map(events, (function(_this) {
      return function(evt) {
        return _.omit(evt, 'cb');
      };
    })(this));
    d = {
      access: this.access,
      is_login: this.logined,
      api_key: this.api_key,
      keys: keys,
      events: events,
      tracker_version: tracker_version,
      enceds: enceds,
      enced: enceds[0]
    };
    if (enced_action_ids) {
      d.enced_action_ids = enced_action_ids;
    }
    if (this._save_segments) {
      d.get_segments = this._save_segments;
    }
    syncparam = this._cookie.get(COOKIE_KEY_NATIVE_APP_SYNC);
    if (syncparam) {
      syncparam = JSON.parse(decodeURIComponent(syncparam));
      d.app_info = syncparam.app_info;
    }
    if (another_user_id) {
      delete d['access'];
      delete d['app_info'];
      delete d['is_login'];
      delete d.keys['visitor_id'];
      delete d.keys['path'];
      delete d.keys['host'];
      delete d.keys['old_visitor_id'];
    }
    if (this.token) {
      d.token = this.token;
    }
    if (this.nonce) {
      d.nonce = this.nonce;
    }
    if (this.timestamp) {
      d.timestamp = this.timestamp;
    }
    if (track_id) {
      d.track_id = track_id;
    }
    if (this.use_polling) {
      d.use_polling = this.use_polling;
    }
    if (this.httponly_cookie) {
      d.httponly_cookie = this.httponly_cookie;
    }
    console.log(d);
    d = converter(d, 'date');
    d = compress.pack(d);
    return {
      d: this._gzip(d),
      v: tracker_version
    };
  };

  Tracker.prototype._createKeys = function() {
    var keys, old_visitor_id, ref1;
    keys = {
      visitor_id: this.visitor.visitor_id,
      path: this.access.uri.path,
      host: this.access.uri.host,
      pv_id: this.pv_id,
      original_pv_id: this.original_pv_id
    };
    if (((ref1 = this._user) != null ? ref1.user_id : void 0) != null) {
      keys.user_id = this._user.user_id;
    }
    if (this.ktid) {
      keys.ktid = this.ktid;
    }
    old_visitor_id = this._get_old_visitor_id();
    if (old_visitor_id) {
      keys.old_visitor_id = old_visitor_id;
    }
    return keys;
  };

  Tracker.prototype._action = function(data, events) {
    var campaign, e, i, j, len, len1, msg, msg_and_campaign, msg_and_campaigns, msgs, opens, ref1, ref2, ref3;
    if (data.csync_urls && (data.csync_urls.length > 0)) {
      this._csync_url_check(data.csync_urls);
    }
    this.__user = data.user;
    msg_and_campaigns = [];
    if (!this.check_fr(data.project.fr_pv, data.project.fr_time)) {
      ref1 = data.messages;
      for (i = 0, len = ref1.length; i < len; i++) {
        msg_and_campaign = ref1[i];
        if (!(msg_and_campaign != null ? msg_and_campaign.campaign : void 0)) {
          continue;
        }
        if (msg_and_campaign.campaign.display_frequency === 'any') {
          msg_and_campaigns.push(msg_and_campaign);
        } else {
          this._track_message_suppressed(msg_and_campaign.action, "suppressed by project frequency");
        }
      }
      if (msg_and_campaigns.length === 0) {
        this._check_link(events, true);
        return true;
      }
    } else {
      msg_and_campaigns = data.messages;
    }
    opens = ((ref2 = data.user) != null ? ref2.opens : void 0) || [];
    msgs = [];
    for (j = 0, len1 = msg_and_campaigns.length; j < len1; j++) {
      msg_and_campaign = msg_and_campaigns[j];
      msg = msg_and_campaign.action;
      campaign = msg_and_campaign.campaign;
      msg.campaign_id = campaign._id;
      msg.coexist_policy = (ref3 = campaign.coexist_policy) != null ? ref3 : 'exclusive';
      msg.service_action_type = campaign.service_action_type;
      if (msg_and_campaign.encrypted_trigger) {
        msg.encrypted_trigger = msg_and_campaign.encrypted_trigger;
      }
      if (campaign.is_session) {
        msg.frequency_type = FREQUENCY_TYPES.SESSION;
      } else if (campaign.display_frequency === 'any') {
        msg.frequency_type = FREQUENCY_TYPES.ACCESS;
      } else {
        msg.frequency_type = FREQUENCY_TYPES.USER;
      }
      this._handle_message_and_campaign(msgs, msg, campaign, opens, data.project.is_test);
    }
    if (msgs.length > 0) {
      try {
        this._run(msgs, {
          style: data.style
        });
      } catch (error) {
        e = error;
        __log(e);
      }
    }
    return false;
  };

  Tracker.prototype._handle_message_and_campaign = function(msgs, msg, campaign, opens, is_test) {
    var is_unread;
    is_unread = this._is_unread(msg, campaign, opens);
    if (is_test || is_unread) {
      msg.opened = false;
    } else {
      msg.opened = true;
    }
    if (!msg.opened) {
      return msgs.push(msg);
    } else {
      return this._track_message_suppressed(msg, "already open");
    }
  };

  Tracker.prototype._is_unread = function(msg, campaign, opens) {
    var __is_unread, is_unread;
    __is_unread = !this.very_short_cookie.has('message', campaign._id);
    if ((msg.is_unread != null) || (msg.is_unread_cg != null)) {
      is_unread = msg.is_unread;
      if (msg.is_unread_cg != null) {
        is_unread = msg.is_unread_cg;
      }
      if (campaign.is_session || (campaign.display_frequency === 'once')) {
        return is_unread && __is_unread;
      }
      return is_unread;
    }
    if (campaign.is_session) {
      return __is_unread;
    } else if ((campaign.display_frequency === 'any') && (msg.type === 'control')) {
      return true;
    } else {
      is_unread = _.indexOf(opens, campaign._id) === -1;
      return is_unread && __is_unread;
    }
  };

  Tracker.prototype._track_message_suppressed = function(message, reason) {
    var eventData, ref1;
    eventData = {
      message: {
        title: (ref1 = message.content) != null ? ref1.title : void 0,
        campaign_id: message.campaign_id,
        shorten_id: message.shorten_id
      },
      reason: reason
    };
    if (message.encrypted_trigger) {
      eventData.message.encrypted_trigger = message.encrypted_trigger;
    }
    return this.track('_message_suppressed', eventData);
  };

  Tracker.prototype._is_disabled_native_app_sync = function() {
    var syncparam;
    syncparam = this._cookie.get(COOKIE_KEY_NATIVE_APP_SYNC);
    return syncparam == null;
  };

  Tracker.prototype._retrieve_available_native_app_sync_parameter = function() {
    var expire, now, syncparam;
    syncparam = this._retrieve_native_app_sync_parameter();
    if ((syncparam != null ? syncparam.ts : void 0) != null) {
      expire = syncparam.ts + NATIVE_APP_SYNC_PARAMS_EXPIRE_TIME;
      now = (new Date()).getTime() / 1000;
      if (now > expire) {
        __log(new Error('_k_ntvsync parameter is expired.'));
        return null;
      } else {
        return syncparam;
      }
    } else {
      return syncparam;
    }
  };

  Tracker.prototype._retrieve_native_app_sync_parameter = function() {
    var b64_syncparam, ref1, ref2, ref3, ref4, syncparam, urlencoded_b64_syncparam, urlencoded_syncparam;
    if (window.__karte_ntvsync) {
      delete window.__karte_ntvsync['ts'];
      return window.__karte_ntvsync;
    }
    urlencoded_b64_syncparam = (ref1 = this.access.uri) != null ? (ref2 = ref1.queryKey) != null ? ref2._k_ntvsync_b : void 0 : void 0;
    if (urlencoded_b64_syncparam) {
      b64_syncparam = decodeURIComponent(urlencoded_b64_syncparam);
      syncparam = new Buffer(base64.toByteArray(b64_syncparam)).toString();
      return JSON.parse(syncparam);
    }
    urlencoded_syncparam = (ref3 = this.access.uri) != null ? (ref4 = ref3.queryKey) != null ? ref4._k_ntvsync : void 0 : void 0;
    if (urlencoded_syncparam) {
      syncparam = decodeURIComponent(urlencoded_syncparam);
      return JSON.parse(syncparam);
    }
    return null;
  };

  return Tracker;

})();

module.exports = Tracker;


}).call(this,require("buffer").Buffer)
},{"../external/b64":28,"./common/_request":34,"./common/compress/index":36,"./common/converter":37,"./common/global_emitter":38,"./common/jsonp_api":39,"./common/merge_query":40,"./common/origin":41,"./common/uuid":43,"./common/valid_api_key_for_default_form":44,"./common/valid_api_key_for_form":45,"./common/valid_for_create_container":46,"./protocols/ChatProtocol":47,"./protocols/GeneralProtocol":48,"./protocols/collection":49,"./protocols/event_transaction_id":50,"./track/form":51,"./track/link":52,"./version":53,"@plaidev/tracker-helpers/__crawl":55,"@plaidev/tracker-helpers/__log":57,"@plaidev/tracker-helpers/_localStorage":58,"@plaidev/tracker-helpers/config":59,"@plaidev/tracker-helpers/platforms/access.web":62,"@plaidev/tracker-helpers/platforms/openUrl.web":64,"@plaidev/tracker-helpers/platforms/pusher_subscriber.web":66,"@plaidev/tracker-helpers/stringify":67,"@plaidev/tracker-plugin-loader":68,"@plaidev/tracker-user-detector/src/cookie/comma_cookie":72,"@plaidev/tracker-user-detector/src/cookie/cookie":73,"@plaidev/tracker-user-detector/src/cookie/json_cookie":74,"@plaidev/tracker-user-detector/src/findmyself":75,"@plaidev/tracker-user-detector/src/ktid":76,"@plaidev/tracker-user-detector/src/third":77,"@plaidev/tracker-user-detector/src/visitor":78,"buffer":4,"component-jsonp":6,"lodash-custom":1,"zlibjs/bin/deflate.min":27}],31:[function(require,module,exports){
var _init, state;

_init = function() {
  var OPTOUT_FULLKEY, OPTOUT_KEY, _cookie, _localStorage, check, cookie, krt_oo, tracker_names, useragent;
  if (window.__karte_loaded) {
    return;
  }
  window.__karte_loaded = true;
  useragent = require('@plaidev/tracker-helpers/platforms/access.web').useragent;
  check = require('@plaidev/tracker-user-detector/src/check');
  if (window.__karte_uncheck) {
    console.log('ブラウザチェックをスルー');
  }
  cookie = require('component-cookie');
  _cookie = require('@plaidev/tracker-user-detector/src/cookie/cookie');
  _localStorage = require('@plaidev/tracker-helpers/_localStorage');
  OPTOUT_KEY = 'oo';
  OPTOUT_FULLKEY = 'krt_' + OPTOUT_KEY;
  krt_oo = cookie(OPTOUT_FULLKEY);
  if (krt_oo == null) {
    krt_oo = _localStorage.get(OPTOUT_KEY);
    cookie(OPTOUT_FULLKEY, krt_oo);
  } else {
    _localStorage.set(OPTOUT_KEY, krt_oo);
  }
  if (window.__karte_uncheck || ((krt_oo == null) && check(useragent))) {
    tracker_names = window.karte_tracker_names || ['tracker'];
    return tracker_names.map(function(tracker_name) {
      return require('./buildTracker.web')(tracker_name);
    });
  }
};

state = document.readyState.toLowerCase();

setTimeout(_init, 0);


},{"./buildTracker.web":32,"@plaidev/tracker-helpers/_localStorage":58,"@plaidev/tracker-helpers/platforms/access.web":62,"@plaidev/tracker-user-detector/src/check":71,"@plaidev/tracker-user-detector/src/cookie/cookie":73,"component-cookie":5}],32:[function(require,module,exports){
var API, Pocky, _, __log, _localStorage, _tryCatchWrap, deactivateIfNeeded, parseuri;

Pocky = require('./Tracker.web');

_ = require('lodash-custom');

__log = require('@plaidev/tracker-helpers/__log');

parseuri = require('./common/parseuri');

_localStorage = require('@plaidev/tracker-helpers/_localStorage');

API = require('@plaidev/tracker-helpers/ApiList');

module.exports = function(_tracker_name) {
  var args, err, i, j, len, len1, method, method_and_arguments, method_name, pocky, results, tracker;
  if (_tracker_name == null) {
    _tracker_name = 'tracker';
  }
  tracker = window[_tracker_name];
  if (tracker == null) {
    __log('tracker is not initialized.');
    return;
  }
  if (tracker.api_key == null) {
    __log('tracker api_key is not defined. please specify the api_key.');
    return;
  }
  if (deactivateIfNeeded(tracker, parseuri(location.href).queryKey)) {
    return;
  }
  try {
    pocky = new Pocky();
    pocky.init(tracker.api_key, tracker.options);
    for (i = 0, len = tracker.length; i < len; i++) {
      method_and_arguments = tracker[i];
      if (method_and_arguments.length === 1) {
        pocky[method_and_arguments[0]].apply(pocky);
      } else {
        args = _.rest(method_and_arguments);
        pocky[method_and_arguments[0]].apply(pocky, args);
      }
    }
    pocky.tracker_initialized = true;
  } catch (error) {
    err = error;
    __log('[krt] initialization failed: ' + err);
    return;
  }
  pocky._post();
  results = [];
  for (j = 0, len1 = API.length; j < len1; j++) {
    method_name = API[j];
    if (pocky[method_name] && _.isFunction(pocky[method_name].bind)) {
      method = pocky[method_name].bind(pocky);
      results.push(tracker[method_name] = _tryCatchWrap(pocky, method));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

_tryCatchWrap = function(parent, f) {
  return function() {
    var err;
    try {
      return f.apply(parent, arguments);
    } catch (error) {
      err = error;
      __log('[krt] failed: ' + err);
    }
  };
};

deactivateIfNeeded = function(tracker, query) {
  var deactivate, i, keyName, len, method_name;
  deactivate = query['_karte_tracker_deactivate'];
  keyName = 'tracker_deactivate';
  if (deactivate === "false") {
    _localStorage.remove(keyName);
    return false;
  }
  if (deactivate === "true" || _localStorage.get(keyName)) {
    __log("deactivate karte");
    _localStorage.set(keyName, true);
    for (i = 0, len = API.length; i < len; i++) {
      method_name = API[i];
      tracker[method_name] = function() {};
    }
    return true;
  }
  return false;
};


},{"./Tracker.web":30,"./common/parseuri":42,"@plaidev/tracker-helpers/ApiList":54,"@plaidev/tracker-helpers/__log":57,"@plaidev/tracker-helpers/_localStorage":58,"lodash-custom":1}],33:[function(require,module,exports){
var MAGNIFICATION, STATUS_TIMEOUT, poll;

STATUS_TIMEOUT = 408;

MAGNIFICATION = 1.75;

poll = function(fn, timeout, interval, cb) {
  var check, end, start;
  end = Date.now() + timeout;
  start = Date.now();
  check = function(prev) {
    return fn(prev, function(err, cond, data) {
      if (err) {
        return cb(err, data);
      }
      if (cond) {
        return cb(null, data);
      }
      if (Date.now() + interval > end) {
        err = new Error('Timeout');
        err.status = STATUS_TIMEOUT;
        cb(err, data);
        return;
      }
      setTimeout(check, interval, data);
      return interval *= MAGNIFICATION;
    });
  };
  return check();
};

module.exports = poll;


},{}],34:[function(require,module,exports){
var ERROR, PROCESSING, STATUS_TIMEOUT, SUCCESS, call, poll;

poll = require('./_poll');

STATUS_TIMEOUT = 408;

SUCCESS = 200;

PROCESSING = 202;

ERROR = 500;

module.exports = function(arg, cb) {
  var jsonp, jsonp_option, pocky, polling_interval, polling_timeout, query, url, use_polling, use_xhr;
  url = arg.url, query = arg.query, jsonp_option = arg.jsonp_option, use_xhr = arg.use_xhr, jsonp = arg.jsonp, pocky = arg.pocky, use_polling = arg.use_polling, polling_timeout = arg.polling_timeout, polling_interval = arg.polling_interval;
  if (!use_polling) {
    return call({
      url: url,
      query: query,
      jsonp_option: jsonp_option,
      use_xhr: use_xhr,
      jsonp: jsonp,
      pocky: pocky
    }, cb);
  }
  polling_timeout = polling_timeout || 10 * 1000;
  polling_interval = polling_interval || 300;
  return poll(function(prev_data, cb) {
    if (prev_data != null) {
      query.request_token = prev_data.request_token || 'invalid_token';
    }
    return call({
      url: url,
      query: query,
      jsonp_option: jsonp_option,
      use_xhr: use_xhr,
      jsonp: jsonp,
      pocky: pocky
    }, function(data) {
      var finished;
      finished = (data.status === SUCCESS) || (data.status !== PROCESSING);
      return cb(null, finished, data);
    });
  }, polling_timeout, polling_interval, function(err, data) {
    if ((err != null ? err.message : void 0) === 'Timeout') {
      return cb({
        status: STATUS_TIMEOUT
      });
    }
    if (err) {
      return cb({
        status: ERROR
      });
    }
    return cb(data);
  });
};

call = function(arg, cb) {
  var body, jsonp, jsonp_option, pocky, query, url, use_xhr, xhr;
  url = arg.url, query = arg.query, jsonp_option = arg.jsonp_option, use_xhr = arg.use_xhr, jsonp = arg.jsonp, pocky = arg.pocky;
  if (!use_xhr) {
    jsonp.call(pocky, url).query(query).options(jsonp_option).end(cb);
    return;
  }
  if (!XMLHttpRequest) {
    jsonp.call(pocky, url).query(query).options(jsonp_option).end(cb);
    return;
  }
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    var data, err;
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== SUCCESS) {
      return cb({
        status: xhr.status
      });
    }
    try {
      data = JSON.parse(xhr.responseText);
      return cb(data);
    } catch (error) {
      err = error;
      return cb({
        status: ERROR
      });
    }
  };
  body = JSON.stringify(query);
  xhr.open("POST", url);
  return xhr.send(body);
};


},{"./_poll":33}],35:[function(require,module,exports){
module.exports = {
  date: '2',
  api_token: '3',
  user_id: '4',
  email: '5',
  visitor_id: '6',
  session_id: '7',
  path: '8',
  host: '9',
  'access.os.name': 'a',
  'access.os.version': 'b',
  'access.os.all': 'c',
  'access.engine.name': 'd',
  'access.engine.version': 'e',
  'access.browser.name': 'f',
  'access.browser.version': 'g',
  'access.browser.major': 'h',
  'access.browser.all': 'i',
  'access.language': 'j',
  'access.screen.availWidth': 'k',
  'access.screen.availHeight': 'l',
  'access.screen.availTop': 'm',
  'access.screen.availLeft': 'n',
  'access.screen.pixelDepth': 'o',
  'access.screen.colorDepth': 'p',
  'access.screen.width': 'q',
  'access.screen.height': 'r',
  'access.referrer.protocol': 's',
  'access.referrer.host': 't',
  'access.referrer.path': 'u',
  'access.referrer.anchor': 'v',
  'access.in_referrer.protocol': 'w',
  'access.in_referrer.host': 'x',
  'access.in_referrer.path': 'y',
  'access.in_referrer.anchor': 'z',
  'access.land_uri.protocol': 'A',
  'access.land_uri.host': 'B',
  'access.land_uri.path': 'C',
  'access.land_uri.anchor': 'D',
  'access.uri.protocol': 'E',
  'access.uri.host': 'F',
  'access.uri.path': 'G',
  'access.uri.anchor': 'H',
  'access.title': 'I'
};


},{}],36:[function(require,module,exports){
var _schema, convert_keys, from_dot, pack, schema_reverse, to_dot, unpack,
  hasProp = {}.hasOwnProperty;

_schema = require('./_schema');

exports.to_dot = to_dot = (function(_this) {
  return function(obj, initial_key) {
    var k, key, ret, temp, tk, val;
    if (initial_key == null) {
      initial_key = "";
    }
    ret = {};
    for (k in obj) {
      if (!hasProp.call(obj, k)) continue;
      key = initial_key;
      if (key.length > 0) {
        key += "." + k;
      } else {
        key += k;
      }
      val = obj[k];
      if (Array.isArray(val)) {
        ret[key] = val;
      } else if (val !== null && typeof val === 'object') {
        if (val._bsontype === 'ObjectID') {
          ret[key] = val;
        } else if (Object.keys(val).length === 0) {
          ret[key] = {};
        } else {
          temp = to_dot(val, key);
          for (tk in temp) {
            if (!hasProp.call(temp, tk)) continue;
            ret[tk] = temp[tk];
          }
        }
      } else {
        ret[key] = val;
      }
    }
    return ret;
  };
})(this);

exports.from_dot = from_dot = function(dots) {
  var dot, i, key, keys, last, len, nret, ret;
  ret = {};
  for (dot in dots) {
    if (!hasProp.call(dots, dot)) continue;
    keys = dot.split('.');
    nret = ret;
    last = keys[keys.length - 1];
    if (keys.length > 1) {
      keys = keys.slice(0, +(keys.length - 2) + 1 || 9e9);
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        if (!(key in nret)) {
          nret[key] = {};
        }
        nret = nret[key];
      }
    }
    nret[last] = dots[dot];
  }
  return ret;
};

exports.schema_reverse = schema_reverse = function(sch) {
  var key, ret;
  if (sch == null) {
    sch = _schema;
  }
  ret = {};
  for (key in sch) {
    if (!hasProp.call(sch, key)) continue;
    ret[sch[key]] = key;
  }
  return ret;
};

exports.convert_keys = convert_keys = function(dots, sch) {
  var key, ret;
  if (sch == null) {
    sch = _schema;
  }
  ret = {};
  for (key in dots) {
    if (!hasProp.call(dots, key)) continue;
    if (key in sch) {
      ret[sch[key]] = dots[key];
    } else {
      ret[key] = dots[key];
    }
  }
  return ret;
};

exports.pack = pack = function(json, sch) {
  var dots;
  dots = to_dot(json);
  return convert_keys(dots, sch);
};

exports.unpack = unpack = function(dots, r_sch) {
  var ret;
  dots = convert_keys(dots, r_sch);
  ret = from_dot(dots);
  return ret;
};


},{"./_schema":35}],37:[function(require,module,exports){
var _, converter,
  hasProp = {}.hasOwnProperty;

_ = require('lodash-custom');

converter = (function(_this) {
  return function(obj_or_arr, type) {
    var key, nobj, oldkey;
    if (type === 'string') {
      if (_.isString(obj_or_arr)) {
        obj_or_arr = obj_or_arr.toString().toLowerCase();
      }
    }
    if (_.isObject(obj_or_arr)) {
      if (type === 'date') {
        if (_.isDate(obj_or_arr)) {
          return Math.round(obj_or_arr.getTime() / 1000);
        }
      }
      for (key in obj_or_arr) {
        if (!hasProp.call(obj_or_arr, key)) continue;
        nobj = obj_or_arr[key];
        if (key.indexOf('.') !== -1) {
          oldkey = key;
          key = key.replace(/\./g, '_');
          delete obj_or_arr[oldkey];
        }
        obj_or_arr[key] = converter(nobj, type);
      }
    }
    return obj_or_arr;
  };
})(this);

module.exports = converter;


},{"lodash-custom":1}],38:[function(require,module,exports){
var EventEmitter, emitter;

EventEmitter = require('events').EventEmitter;

emitter = new EventEmitter();

module.exports = emitter;


},{"events":8}],39:[function(require,module,exports){
var _, compress, converter, tracker_version,
  slice = [].slice;

_ = require('lodash-custom');

tracker_version = require('../version');

converter = require('./converter');

compress = require('./compress');

exports.jsonpApi = function() {
  var cb, d, i, method, options, pocky, query, ref, responseType, url, useCompress;
  pocky = arguments[0], url = arguments[1], method = arguments[2], query = arguments[3], options = 6 <= arguments.length ? slice.call(arguments, 4, i = arguments.length - 1) : (i = 4, []), cb = arguments[i++];
  ref = _.extend.apply(_, [{
    responseType: null,
    useCompress: true
  }].concat(slice.call(options))), responseType = ref.responseType, useCompress = ref.useCompress;
  d = _.clone(query);
  if (method != null) {
    d.method = method;
  }
  if (pocky.token) {
    d.token = pocky.token;
  }
  if (pocky.nonce) {
    d.nonce = pocky.nonce;
  }
  if (pocky.timestamp) {
    d.timestamp = pocky.timestamp;
  }
  d = converter(d, 'date');
  if (useCompress) {
    d = compress.pack(d);
  }
  query = {
    d: pocky._gzip(d),
    v: tracker_version
  };
  if (responseType != null) {
    query.response_type = responseType;
  }
  return pocky.jsonp(url).query(query).options(pocky.jsonp_option()).end(function(data) {
    if ((data != null ? data.status : void 0) === 500) {
      return cb(new Error('return error status'), data);
    }
    return cb(null, data);
  });
};


},{"../version":53,"./compress":36,"./converter":37,"lodash-custom":1}],40:[function(require,module,exports){
var _, querystring, url;

_ = require('lodash-custom');

querystring = require('querystring');

url = require('url');

module.exports = function(base_url, q) {
  var parsed, query, target;
  if (q == null) {
    q = {};
  }
  parsed = url.parse(base_url);
  query = querystring.parse(parsed.query);
  query = _.extend(query, q);
  target = parsed.protocol + '//' + parsed.host + (parsed.pathname || '') + '?' + querystring.stringify(query) + (parsed.hash || '');
  return target;
};


},{"lodash-custom":1,"querystring":16,"url":21}],41:[function(require,module,exports){
var _, url;

_ = require('lodash-custom');

url = require('url');

module.exports = function(base_url) {
  var parsed, target;
  parsed = url.parse(base_url);
  return target = parsed.protocol + '//' + parsed.hostname;
};


},{"lodash-custom":1,"url":21}],42:[function(require,module,exports){
var _, parseuri, pickupKeys;

parseuri = require('../../external/parseuri.js');

pickupKeys = ['url', 'protocol', 'host', 'path', 'anchor', 'query', 'queryKey'];

_ = require('lodash-custom');

module.exports = function(uri) {
  var encoded_query, query, ref, ref1;
  if ((-1 < (ref = uri != null ? uri.indexOf('?') : void 0) && ref < (uri != null ? uri.indexOf('@') : void 0))) {
    query = uri.substr(uri.indexOf('?') + 1);
    encoded_query = query.replace(/@/g, '%40');
    uri = uri.replace(/\?.*/g, '?' + encoded_query);
  }
  uri = parseuri(uri);
  uri.url = (ref1 = uri.source) != null ? ref1.replace(/[?#].*$/, '') : void 0;
  uri = _.pick(uri, pickupKeys);
  return uri;
};


},{"../../external/parseuri.js":29,"lodash-custom":1}],43:[function(require,module,exports){
"use strict";

module.exports = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

},{}],44:[function(require,module,exports){
var _, __VALID_API_KEYS__;

__VALID_API_KEYS__ = ['f6092410db90d76ab16e93cb345f05df', 'e710e2ad4894746bc95b1075b18ae7c7', 'b6ab1ba4a17ff9c2b3b0b064cd97af0b', '42629ec7694dac572fe7c9445d146957', 'fb6f0ee01e947def17090b172bc6e5da', 'dcee37a6f85b49d9c3ffc8e3db502e1f', '9c8a37dcd3899452cbf36718d42c09db', '7d8ba7b4ee32398874f2a263a34248e7', '73836f0a7f9b2161cb78d5295dfc21c7', '6d7146d101765bc130bd297ee296236e', '5cbd9849972dc9aa5934f9eeb4a6a52c', '53b98777c84768e39dd7737af74dce8c', '2ed8fbfde6923619820d066c6cf767a3', '1c221fad4b4c4a57f60b7c03c0e34152', '5d8bd62251e637bdacf5376f352aa011', 'd3eec234e39f631ee9f9999966adfdf5', 'test_valid_api_key_for_default_form'];

_ = require('lodash-custom');

module.exports = function(api_key) {
  if (_.indexOf(__VALID_API_KEYS__, api_key) > -1) {
    return true;
  }
  return false;
};


},{"lodash-custom":1}],45:[function(require,module,exports){
var _, __INVALID_API_KEYS__;

__INVALID_API_KEYS__ = ['3aa1bf59425d74a493a4a0a780bd805f', '0d168cf5a520430049b269f318f84aab', '492df4a94d445e5085f805c9033d65a3', '8fc41b1410d1ede135ccb7e437169ff3', 'fdd2a2d55e43ddff26c4da66f1040a0f', '04a4d342744eea0996ddc2c4bf802698', '3a02da83c1bff5ff03e33e82d8f72448', '6630fd3dca3675052b4896cea8fd9891', 'invalid_api_key_for_form'];

_ = require('lodash-custom');

module.exports = function(api_key) {
  if (_.indexOf(__INVALID_API_KEYS__, api_key) > -1) {
    return false;
  }
  return true;
};


},{"lodash-custom":1}],46:[function(require,module,exports){
var _, __INVALID_API_KEYS__, __INVALID_URL__;

_ = require('lodash-custom');

__INVALID_API_KEYS__ = [];

__INVALID_URL__ = [];

module.exports = function(api_key, disable_create_container) {
  var is_valid_page;
  if (disable_create_container == null) {
    disable_create_container = false;
  }
  if (disable_create_container) {
    return false;
  }
  if (_.indexOf(__INVALID_API_KEYS__, api_key) > -1) {
    return false;
  }
  is_valid_page = true;
  _.each(__INVALID_URL__, function(url) {
    var exp;
    exp = new RegExp(url);
    if (exp.test(location.href)) {
      return is_valid_page = false;
    }
  });
  return is_valid_page;
};


},{"lodash-custom":1}],47:[function(require,module,exports){
var COOKIE_KEY_NATIVE_APP_SYNC, ChatProtocol, DEFAULT_KEY, EVENT_SOURCES, _, access, base64, cookie, is_native_app, is_web, no_operation_check_interval, no_operation_check_span, ref, tracker_version,
  slice = [].slice;

_ = require('lodash-custom');

base64 = require('../../external/b64');

cookie = require('component-cookie');

tracker_version = require('../version');

access = require('@plaidev/tracker-helpers/platforms/access').access;

EVENT_SOURCES = require('@plaidev/tracker-helpers/platforms/event_sources').EVENT_SOURCES;

ref = require('@plaidev/tracker-helpers/platforms/platform_def'), is_native_app = ref.is_native_app, is_web = ref.is_web;

COOKIE_KEY_NATIVE_APP_SYNC = "ntvsync";

DEFAULT_KEY = 'default';

no_operation_check_span = 3 * 60 * 1000;

no_operation_check_interval = 1 * 60 * 1000;

ChatProtocol = (function() {
  function ChatProtocol(pocky) {
    this.pocky = pocky;
    this.chats = {};
    this.last_operation_time = null;
  }

  ChatProtocol.prototype.init = function(instance, key) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    if (this.chats[key]) {
      return;
    }
    this.chats[key] = instance;
    this.trackAdapter = {
      track: (function(_this) {
        return function() {
          var args, ref1;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return (ref1 = _this.pocky).track.apply(ref1, args);
        };
      })(this)
    };
    this.chats[key].emitter.on('subscribe', (function(_this) {
      return function(options) {
        return _this._subscribe(key, options);
      };
    })(this));
    this.chats[key].emitter.on('pull_messages', (function(_this) {
      return function(options) {
        return _this._pull_messages(key, options);
      };
    })(this));
    this.chats[key].emitter.on('push_message', (function(_this) {
      return function(options) {
        return _this._message(key, options);
      };
    })(this));
    this.chats[key].emitter.on('read_message', (function(_this) {
      return function(options) {
        return _this._read_message(key, options);
      };
    })(this));
    this.chats[key].emitter.on('get_status', (function(_this) {
      return function(options) {
        return _this._get_status(key, options);
      };
    })(this));
    this.chats[key].emitter.on('change_status', (function(_this) {
      return function(options) {
        return _this._change_status(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_message_click', (function(_this) {
      return function(options) {
        return _this._send_message_click(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_message_reply', (function(_this) {
      return function(options) {
        return _this._send_message_reply(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_track', (function(_this) {
      return function(options) {
        return _this._send_track(key, options);
      };
    })(this));
    this.chats[key].emitter.on('message_link_click', (function(_this) {
      return function(options) {
        return _this._send_message_link_click(key, options);
      };
    })(this));
    this.chats[key].emitter.on('set_cookie', (function(_this) {
      return function(options) {
        return _this._set_cookie(key, options);
      };
    })(this));
    this.chats[key].emitter.on('unset_cookie', (function(_this) {
      return function(options) {
        return _this._unset_cookie(key, options);
      };
    })(this));
    this.chats[key].emitter.on('register_notification_email', (function(_this) {
      return function(options) {
        return _this._register_notification_email(key, options);
      };
    })(this));
    this.chats[key].emitter.on('unregister_notification_email', (function(_this) {
      return function(options) {
        return _this._unregister_notification_email(key, options);
      };
    })(this));
    this.chats[key].emitter.on('get_user_data', (function(_this) {
      return function(options) {
        return _this._get_user_data(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_chat_open', (function(_this) {
      return function(options) {
        return _this._send_chat_open(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_chat_close', (function(_this) {
      return function(options) {
        return _this._send_chat_close(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_chat_activate', (function(_this) {
      return function(options) {
        return _this._send_chat_activate(key, options);
      };
    })(this));
    this.chats[key].emitter.on('send_chat_deactivate', (function(_this) {
      return function(options) {
        return _this._send_chat_deactivate(key, options);
      };
    })(this));
    this.chats[key].emitter.on('finish_conversation', (function(_this) {
      return function(options) {
        return _this._finish_conversation(key, options);
      };
    })(this));
    return this.chats[key].emitter.on('push_user_log', (function(_this) {
      return function(options) {
        return _this._user_log(key, options);
      };
    })(this));
  };

  ChatProtocol.prototype.post = function(method, app_name, args, cb) {
    var q, ref1;
    if (method == null) {
      method = 'get';
    }
    if (app_name == null) {
      app_name = 'webchat';
    }
    q = this._createQuery(method, app_name, args);
    if (args != null ? (ref1 = args.content) != null ? ref1.image_data : void 0 : void 0) {
      q.data = q.d;
      delete q.d;
      return this._postImage(this.pocky.chat_url, q, function(err, res) {
        return cb(err, res);
      });
    } else {
      return this.pocky.jsonp(this.pocky.chat_url).query(q).end((function(_this) {
        return function(data) {
          if ((data != null ? data.status : void 0) === 500) {
            return cb(new Error('return error status'), data);
          }
          return cb(null, data);
        };
      })(this));
    }
  };

  ChatProtocol.prototype._createQuery = function(method, app_name, args) {
    var base, d, session_info, syncparam;
    d = _.extend({}, args, {
      api_key: this.pocky.api_key,
      user_id: this.pocky._user_id(),
      visitor_id: this.pocky.visitor.visitor_id,
      method: method
    });
    if (this.pocky.token) {
      d.token = this.pocky.token;
    }
    if (this.pocky.nonce) {
      d.nonce = this.pocky.nonce;
    }
    if (this.pocky.timestamp) {
      d.timestamp = this.pocky.timestamp;
    }
    if (is_web) {
      session_info = typeof (base = this.pocky).get_session_info === "function" ? base.get_session_info() : void 0;
      if (session_info) {
        d.pv_id = session_info.original_pv_id;
        d.session_id = session_info.session_id;
      }
      d.access = access;
      syncparam = this.pocky._cookie.get(COOKIE_KEY_NATIVE_APP_SYNC);
      if (syncparam) {
        syncparam = JSON.parse(decodeURIComponent(syncparam));
        d.app_info = syncparam.app_info;
      }
    } else {
      d.app_info = access.app_info;
    }
    d._source = this._get_event_source(d);
    return {
      app_name: app_name,
      response_type: 'jsonp',
      d: this.pocky._gzip(d),
      v: tracker_version,
      _: (new Date()).getTime()
    };
  };

  ChatProtocol.prototype._postImage = function(url, data, cb) {
    var isAsync, xhr;
    xhr = new XMLHttpRequest();
    isAsync = true;
    xhr.open('POST', url, isAsync);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onloadend = function() {
      var err, res;
      if (xhr.status === 200) {
        res = JSON.parse(xhr.response);
        return cb(null, res);
      } else {
        if (xhr.statusText) {
          err = new Error("xhr response: statusCode is " + xhr.statusText);
        } else {
          err = new Error("xhr request failed");
        }
        return cb(err, null);
      }
    };
    return xhr.send(JSON.stringify(data));
  };

  ChatProtocol.prototype._subscribe = function(key, options) {
    var _onSubscriptionSucceeded, _succeeded, subscriber;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    subscriber = this.pocky.initSubscriber();
    subscriber.subscribe('refresh', (function(_this) {
      return function(data) {
        return _this.operation('refresh', key, {});
      };
    })(this));
    subscriber.subscribe('message', (function(_this) {
      return function(data) {
        if (data.messages) {
          data.messages.some(function(message) {
            if (message.app_name && message.app_name === 'webchat') {
              _this.operation('open', key, {});
              return true;
            }
            return false;
          });
        }
        return _this.operation('message_for_user', key, {
          data: data
        });
      };
    })(this));
    subscriber.subscribe('status__user', (function(_this) {
      return function(data) {
        return _this.operation('message_for_user', key, {
          data: data
        });
      };
    })(this));
    subscriber.subscribe('status__project', (function(_this) {
      return function(data) {
        var ref1;
        _this.pocky.operator_active = (ref1 = data.status) != null ? ref1.operator_active : void 0;
        return _this.operation('message_for_user', key, {
          data: data
        });
      };
    })(this));
    _succeeded = {
      userChannel: false,
      projectChannel: false
    };
    _onSubscriptionSucceeded = (function(_this) {
      return function() {
        if (_.every(_succeeded)) {
          return _this.operation('subscription_succeeded', key, {});
        }
      };
    })(this);
    subscriber.subscribe('subscription_succeeded__user', function() {
      _succeeded['userChannel'] = true;
      return _onSubscriptionSucceeded();
    });
    subscriber.subscribe('talk_chat_status_changed', (function(_this) {
      return function(data) {
        return _this.operation('talk_chat_status_changed', key, data);
      };
    })(this));
    subscriber.subscribe('subscription_succeeded__project', function() {
      _succeeded['projectChannel'] = true;
      return _onSubscriptionSucceeded();
    });
    this.connection_connected = true;
    subscriber.subscribe('connection_connected', (function(_this) {
      return function() {
        if (!_this.connection_connected) {
          _this._change_connection_status(true, key);
          return _this.operation('refresh', key, {});
        }
      };
    })(this));
    subscriber.subscribe('connection_connecting', (function(_this) {
      return function() {
        return _this._change_connection_status(false, key);
      };
    })(this));
    subscriber.subscribe('connection_unavailable', (function(_this) {
      return function() {
        return _this._change_connection_status(false, key);
      };
    })(this));
    subscriber.subscribe('connection_failed', (function(_this) {
      return function() {
        return _this._change_connection_status(false, key);
      };
    })(this));
    subscriber.subscribe('connection_disconnected', (function(_this) {
      return function() {
        return _this._change_connection_status(false, key);
      };
    })(this));
    return this._start_interval_check(key);
  };

  ChatProtocol.prototype._change_connection_status = function(connected, key) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    if (this.connection_connected !== connected) {
      this._send_pusher_connect_status({
        connected: this.connection_connected
      });
    }
    this.connection_connected = connected;
    return this.operation('change_connection_status', key, connected);
  };

  ChatProtocol.prototype._set_disconnect = function(key) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    this.connection_connected = false;
    return this.operation('change_connection_status', key, false);
  };

  ChatProtocol.prototype._start_interval_check = function(key) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return setInterval((function(_this) {
      return function() {
        var interval;
        interval = 0;
        if (_this.last_operation_time) {
          interval = new Date().getTime() - _this.last_operation_time;
        }
        if (interval > no_operation_check_span) {
          return _this.operation('reflesh', key, {});
        }
      };
    })(this), no_operation_check_interval);
  };

  ChatProtocol.prototype._pull_messages = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.post('get', 'webchat', options, (function(_this) {
      return function(err, data) {
        if (err) {
          return;
        }
        return _this.operation('run', key, data);
      };
    })(this));
  };

  ChatProtocol.prototype._message = function(key, content, retry) {
    var ref1, ref2, ref3, ref4, values;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    if (retry == null) {
      retry = 3;
    }
    values = {
      message: {
        shorten_id: (ref1 = this.pocky.last_chat_message) != null ? ref1.shorten_id : void 0,
        campaign_id: (ref2 = this.pocky.last_chat_message) != null ? ref2.campaign_id : void 0,
        title: (ref3 = this.pocky.last_chat_message) != null ? ref3.title : void 0
      }
    };
    if ((ref4 = this.pocky.last_chat_message) != null ? ref4.encrypted_trigger : void 0) {
      values.message.encrypted_trigger = this.pocky.last_chat_message.encrypted_trigger;
    }
    content = _.extend({}, content, values);
    return this.post('push', 'webchat', content, (function(_this) {
      return function(err, message) {
        var options, ref5, ref6, ref7, success;
        if (err) {
          console.log('send error', err);
          options = {
            status: 'ERROR',
            request_content: content
          };
          _this._send_chat_message_failed(options);
          _this.operation('push_message_done', key, {
            success: false,
            message: content
          });
          return;
        }
        if ((message != null ? message.status : void 0) === 'RETRIABLE_ERROR') {
          options = {
            status: 'RETRIABLE_ERROR',
            request_content: content,
            message_result: message
          };
          _this._send_chat_message_failed(options);
          console.log('retry...', message);
          setTimeout(function() {
            return _this._message(key, content, retry - 1);
          }, message.retry_interval || 1 * 1000);
          return;
        }
        if ((message != null ? message.status : void 0) === 'DOUBLED_ERROR') {
          options = {
            status: 'DOUBLED_ERROR',
            request_content: content,
            message_result: message
          };
          return _this._send_chat_message_failed(options);
        }
        success = true;
        if (!((message != null ? (ref5 = message.content) != null ? ref5.text : void 0 : void 0) || (message != null ? (ref6 = message.content) != null ? ref6.image : void 0 : void 0) || (message != null ? (ref7 = message.content) != null ? ref7.client_log : void 0 : void 0))) {
          success = false;
        }
        if (message.status === 'CANCELED') {
          success = false;
        }
        return _this.operation('push_message_done', key, {
          success: success,
          message: message
        });
      };
    })(this));
  };

  ChatProtocol.prototype._read_message = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.post('read', 'webchat', {
      content: options.content
    }, (function(_this) {
      return function(err, message) {
        if (err) {
          return;
        }
        return _this.operation('read_done', key, {
          success: true,
          content: options.content
        });
      };
    })(this));
  };

  ChatProtocol.prototype._get_status = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.post('status.get', 'webchat', {}, (function(_this) {
      return function(err, data) {
        if (err) {
          data.err = err;
          data.project_status = {};
        }
        return _this.operation('run', key, data);
      };
    })(this));
  };

  ChatProtocol.prototype._change_status = function(key, content) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.post('status.change', 'webchat', {
      content: content
    }, (function(_this) {
      return function(err) {
        if (err) {

        }
      };
    })(this));
  };

  ChatProtocol.prototype._send_track = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.trackAdapter.track(options.event_name, options.values);
  };

  ChatProtocol.prototype._send_message_reply = function(key, options) {
    var ref1, ref2, ref3;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.trackAdapter.track('message_reply', _.extend(options, {
      message: {
        shorten_id: (ref1 = this.pocky.last_chat_message) != null ? ref1.shorten_id : void 0,
        campaign_id: (ref2 = this.pocky.last_chat_message) != null ? ref2.campaign_id : void 0,
        title: (ref3 = this.pocky.last_chat_message) != null ? ref3.title : void 0
      }
    }));
  };

  ChatProtocol.prototype._send_message_click = function(key, options) {
    var ref1, ref2, ref3, ref4, values;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    values = {
      message: {
        shorten_id: (ref1 = this.pocky.last_chat_message) != null ? ref1.shorten_id : void 0,
        campaign_id: (ref2 = this.pocky.last_chat_message) != null ? ref2.campaign_id : void 0,
        title: (ref3 = this.pocky.last_chat_message) != null ? ref3.titles : void 0
      }
    };
    if ((ref4 = this.pocky.last_chat_message) != null ? ref4.encrypted_trigger : void 0) {
      values.message.encrypted_trigger = this.pocky.last_chat_message.encrypted_trigger;
    }
    return this.trackAdapter.track('message_click', values);
  };

  ChatProtocol.prototype._send_message_link_click = function(key, options) {
    var ref1, ref2, ref3, ref4, ref5, values;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    this.trackAdapter.track('message_link_click', options);
    this.post('message_link_click', 'webchat', options, function(err, message) {
      if (err) {

      }
    });
    if ((((ref1 = options.app_options) != null ? ref1.shorten_id : void 0) != null) && (((ref2 = options.app_options) != null ? ref2.campaign_id : void 0) != null)) {
      values = {
        message: {
          shorten_id: (ref3 = options.app_options) != null ? ref3.shorten_id : void 0,
          campaign_id: (ref4 = options.app_options) != null ? ref4.campaign_id : void 0
        }
      };
      if ((ref5 = options.app_options) != null ? ref5.encrypted_trigger : void 0) {
        values.message.encrypted_trigger = options.app_options.encrypted_trigger;
      }
      return this.trackAdapter.track('message_click', values);
    }
  };

  ChatProtocol.prototype._set_cookie = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.pocky.short_cookie.set('message', true);
  };

  ChatProtocol.prototype._unset_cookie = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.pocky.short_cookie.clear('message');
  };

  ChatProtocol.prototype._register_notification_email = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.trackAdapter.track('identify', {
      notification_email: options.notification_email,
      notification_email_subscription: true
    });
  };

  ChatProtocol.prototype._unregister_notification_email = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    return this.trackAdapter.track('identify', {
      notification_email: '',
      notification_email_subscription: false
    });
  };

  ChatProtocol.prototype._get_user_data = function(key, options) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    if (options == null) {
      options = {};
    }
    return this.post('get.user', 'webchat', options, (function(_this) {
      return function(err, data) {
        var user_id;
        if (err) {
          return;
        }
        if (!data) {
          data = {};
        }
        user_id = _this.pocky.get_user_id();
        data.user_id = user_id;
        return _this.operation('run', key, {
          user: data
        });
      };
    })(this));
  };

  ChatProtocol.prototype._get_event_source = function(d) {
    if (is_native_app) {
      return EVENT_SOURCES.NATIVE_APP_SDK;
    } else if (d.app_info != null) {
      return EVENT_SOURCES.NATIVE_APP_WEBVIEW;
    } else {
      return EVENT_SOURCES.WEB;
    }
  };

  ChatProtocol.prototype.operation = function(operation_name, key, options) {
    if (operation_name == null) {
      operation_name = 'open';
    }
    if (key == null) {
      key = DEFAULT_KEY;
    }
    if (options == null) {
      options = {};
    }
    if (!this.chats[key]) {
      console.log('chat instance not initialized');
      return;
    }
    this.last_operation_time = new Date().getTime();
    return this.chats[key].operation(operation_name, _.cloneDeep(options));
  };

  ChatProtocol.prototype._send_chat_open = function(key, hide_launcher) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    this.__send_chat_event('_chat_open');
    if ((hide_launcher != null) && !hide_launcher) {
      return this._changedChatIsVisible(true);
    }
  };

  ChatProtocol.prototype._send_chat_close = function(key, hide_launcher) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    this.__send_chat_event('_chat_close');
    return this._changedChatIsVisible(false);
  };

  ChatProtocol.prototype._send_chat_activate = function(key, hide_launcher) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    this.__send_chat_event('_chat_activate');
    if ((hide_launcher != null) && hide_launcher) {
      return this._changedChatIsVisible(true);
    }
  };

  ChatProtocol.prototype._send_chat_deactivate = function(key, hide_launcher) {
    if (key == null) {
      key = DEFAULT_KEY;
    }
    this.__send_chat_event('_chat_deactivate');
    if ((hide_launcher != null) && hide_launcher) {
      return this._changedChatIsVisible(false);
    }
  };

  ChatProtocol.prototype.__send_chat_event = function(event_name) {
    var ref1, ref2, ref3, ref4, values;
    values = {
      message: {
        shorten_id: (ref1 = this.pocky.last_chat_message) != null ? ref1.shorten_id : void 0,
        campaign_id: (ref2 = this.pocky.last_chat_message) != null ? ref2.campaign_id : void 0,
        title: (ref3 = this.pocky.last_chat_message) != null ? ref3.titles : void 0
      }
    };
    if ((ref4 = this.pocky.last_chat_message) != null ? ref4.encrypted_trigger : void 0) {
      values.message.encrypted_trigger = this.pocky.last_chat_message.encrypted_trigger;
    }
    return this.trackAdapter.track(event_name, values);
  };

  ChatProtocol.prototype._send_pusher_connect_status = function(options) {
    return this.trackAdapter.track('_chat_connection_status_changed', options);
  };

  ChatProtocol.prototype._send_chat_message_failed = function(options) {
    return this.trackAdapter.track('_chat_message_reply_failed', options);
  };

  ChatProtocol.prototype._changedChatIsVisible = function(isVisible) {
    if (!this.pocky.changedChatIsVisible) {
      return;
    }
    return this.pocky.changedChatIsVisible(isVisible);
  };

  ChatProtocol.prototype._finish_conversation = function(key, options) {
    var ref1, ref2, ref3, ref4, values;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    values = {
      message: {
        shorten_id: (ref1 = this.pocky.last_chat_message) != null ? ref1.shorten_id : void 0,
        campaign_id: (ref2 = this.pocky.last_chat_message) != null ? ref2.campaign_id : void 0,
        title: (ref3 = this.pocky.last_chat_message) != null ? ref3.title : void 0
      }
    };
    if ((ref4 = this.pocky.last_chat_message) != null ? ref4.encrypted_trigger : void 0) {
      values.message.encrypted_trigger = this.pocky.last_chat_message.encrypted_trigger;
    }
    options = _.extend({}, options, values);
    return this.post('finish', 'webchat', options, (function(_this) {
      return function(err, res) {
        var event_name, ref5;
        if (res.status === 200) {
          ref5 = options.event, event_name = ref5.event_name, values = ref5.values;
          _this.trackAdapter.track(event_name, values);
          _this.operation('run', key, {
            messages: res.messages
          });
        }
        if (res.status === 500) {
          console.error('fail to finish a conversation');
          values = {
            status: 'ERROR',
            request_content: options
          };
          return _this.trackAdapter.track('_chat_finish_conversation_failed', values);
        }
      };
    })(this));
  };

  ChatProtocol.prototype._user_log = function(key, options) {
    var ref1, ref2, ref3;
    if (key == null) {
      key = DEFAULT_KEY;
    }
    options = _.extend({}, options, {
      message: {
        shorten_id: (ref1 = this.pocky.last_chat_message) != null ? ref1.shorten_id : void 0,
        campaign_id: (ref2 = this.pocky.last_chat_message) != null ? ref2.campaign_id : void 0,
        title: (ref3 = this.pocky.last_chat_message) != null ? ref3.title : void 0
      }
    });
    return this.post('push', 'user_log', options, (function(_this) {
      return function(err, message) {
        if (err) {
          return;
        }
        return _this.operation('push_message_done', key, {
          success: true,
          message: message
        });
      };
    })(this));
  };

  return ChatProtocol;

})();

module.exports = ChatProtocol;


},{"../../external/b64":28,"../version":53,"@plaidev/tracker-helpers/platforms/access":60,"@plaidev/tracker-helpers/platforms/event_sources":63,"@plaidev/tracker-helpers/platforms/platform_def":65,"component-cookie":5,"lodash-custom":1}],48:[function(require,module,exports){
var GeneralProtocol;

GeneralProtocol = (function() {
  function GeneralProtocol(app_name1, delegates1) {
    this.app_name = app_name1;
    this.delegates = delegates1;
  }

  GeneralProtocol.prototype.post = function(q, cb) {
    if (cb == null) {
      cb = function() {};
    }
    if (!q.function_name) {
      return cb(new Error('no function_name'));
    } else {
      q.app_name = this.app_name;
      return this.delegates.post(q, cb);
    }
  };

  return GeneralProtocol;

})();

module.exports = {
  init: function(delegates) {
    return function(app_name) {
      return new GeneralProtocol(app_name, delegates);
    };
  }
};


},{}],49:[function(require,module,exports){
var Collection, Cursor, _,
  slice = [].slice;

_ = require('lodash-custom');

Cursor = (function() {
  function Cursor(_collectionName, _delegates) {
    this._collectionName = _collectionName;
    this._delegates = _delegates;
    this._filters = [];
  }

  Cursor.prototype.get = function(cb) {
    var q;
    if (cb == null) {
      cb = function() {};
    }
    q = {
      name: this._collectionName,
      field: this._field
    };
    if (this._key) {
      q.key = this._key;
    } else if (this._keys) {
      q = _.extend(q, {
        keys: this._keys
      });
    } else {
      q = _.extend(q, {
        filters: this._filters,
        order: this._order,
        limit: this._limit
      });
    }
    this._delegates.get(q, cb);
    return this;
  };

  Cursor.prototype.getByFilters = function(cb) {
    var q;
    if (cb == null) {
      cb = function() {};
    }
    q = {
      name: this._collectionName,
      filters: this._con.filters,
      order: this._con.order,
      field: this._field,
      limit: this._con.limit
    };
    this._delegates.getByFilters(q, cb);
    return this;
  };

  Cursor.prototype.getByQuery = function(query_name, params, options, cb) {
    var q;
    if (cb == null) {
      cb = function() {};
    }
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    q = {
      name: this._collectionName,
      query_name: query_name,
      params: params,
      options: options
    };
    this._delegates.get(q, cb);
    return this;
  };

  Cursor.prototype.getByRecommendation = function(type, user_id, options, cb) {
    var _options, q;
    if (cb == null) {
      cb = function() {};
    }
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    _options = _.clone(options);
    if (user_id) {
      _options.user_id = user_id;
    }
    q = {
      name: this._collectionName,
      type: type,
      options: _options
    };
    this._delegates.get(q, cb);
    return this;
  };

  Cursor.prototype.set = function(value, cb) {
    var q;
    if (cb == null) {
      cb = function() {};
    }
    q = {
      name: this._collectionName,
      key: this._key,
      field: this._field,
      value: value
    };
    this._delegates.set(q, cb);
    return this;
  };

  Cursor.prototype["delete"] = function(cb) {
    var q;
    if (cb == null) {
      cb = function() {};
    }
    q = {
      name: this._collectionName,
      key: this._key
    };
    this._delegates["delete"](q, cb);
    return this;
  };

  Cursor.prototype.filter = function(property, operator, value) {
    var filter;
    filter = {
      property: property,
      operator: operator,
      value: value
    };
    this._filters.push(filter);
    return this;
  };

  Cursor.prototype.order = function(property, options) {
    var order;
    order = {
      property: property,
      descending: options != null ? options.descending : void 0
    };
    this._order = order;
    return this;
  };

  Cursor.prototype.limit = function(_limit) {
    this._limit = _limit;
    return this;
  };

  Cursor.prototype.field = function(_field) {
    this._field = _field;
    return this;
  };

  Cursor.prototype.key = function(key) {
    if (_.isString(key) || _.isNumber(key)) {
      this._key = key;
    } else if (Array.isArray(key)) {
      this._keys = key;
    } else {
      this._con = key;
    }
    return this;
  };

  return Cursor;

})();

Collection = (function() {
  function Collection(_collectionName, _delegates, user_id1) {
    this._collectionName = _collectionName;
    this._delegates = _delegates;
    this.user_id = user_id1;
  }

  Collection.prototype.query = function(query) {
    return (new Cursor(this._collectionName, this._delegates)).key(query);
  };

  Collection.prototype.get = function() {
    var args, key, ref;
    key = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (ref = this.query(key)).get.apply(ref, args);
  };

  Collection.prototype.getByFilters = function() {
    var args, con, ref;
    con = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (ref = this.query(con)).getByFilters.apply(ref, args);
  };

  Collection.prototype.set = function() {
    var args, key, ref;
    key = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (ref = this.query(key)).set.apply(ref, args);
  };

  Collection.prototype["delete"] = function() {
    var args, key, ref;
    key = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (ref = this.query(key))["delete"].apply(ref, args);
  };

  Collection.prototype.filter = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = new Cursor(this._collectionName, this._delegates)).filter.apply(ref, args);
  };

  Collection.prototype.order = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = new Cursor(this._collectionName, this._delegates)).order.apply(ref, args);
  };

  Collection.prototype.limit = function(limit) {
    return (new Cursor(this._collectionName, this._delegates)).limit(limit);
  };

  Collection.prototype.field = function(field) {
    return (new Cursor(this._collectionName, this._delegates)).field(field);
  };

  Collection.prototype.getByQuery = function() {
    var args, query_name, ref;
    query_name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (ref = new Cursor(this._collectionName, this._delegates)).getByQuery.apply(ref, [query_name].concat(slice.call(args)));
  };

  Collection.prototype.getByRecommendation = function() {
    var args, ref, type;
    type = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (ref = new Cursor(this._collectionName, this._delegates)).getByRecommendation.apply(ref, [type, this.user_id].concat(slice.call(args)));
  };

  return Collection;

})();

module.exports = {
  init: function(delegates, user_id) {
    var method;
    if (user_id == null) {
      user_id = null;
    }
    method = function(collectionName) {
      return new Collection(collectionName, delegates, user_id);
    };
    if (user_id) {
      method.user = method('users').query(user_id);
    }
    return method;
  }
};


},{"lodash-custom":1}],50:[function(require,module,exports){
var _used_ids;

_used_ids = {};

module.exports = function(timestamp) {
  var id, id_base, suffix;
  id_base = timestamp;
  suffix = 1;
  while (_used_ids[id_base + "_" + suffix]) {
    suffix += 1;
  }
  id = id_base + "_" + suffix;
  _used_ids[id] = true;
  return id;
};


},{}],51:[function(require,module,exports){
var EventEmitter, Form, _, __forms__, parseuri, serialize, xPath,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

serialize = require('form-serialize');

parseuri = require('../common/parseuri');

_ = require('lodash-custom');

xPath = require('xpath');

EventEmitter = require('events').EventEmitter;

Form = (function(superClass) {
  extend(Form, superClass);

  function Form(selector1, event_name1, delegate1, options1) {
    var self;
    this.selector = selector1 != null ? selector1 : void 0;
    this.event_name = event_name1 != null ? event_name1 : 'form';
    this.delegate = delegate1;
    this.options = options1 != null ? options1 : {};
    Form.__super__.constructor.call(this);
    self = this;
    this.init();
    this._destroyed = false;
  }

  Form.prototype.init = function() {
    var forms, self;
    self = this;
    forms = document.querySelectorAll(this.selector || 'form');
    if (forms.length === 0) {
      return;
    }
    return Array.prototype.forEach.call(forms, function(_form) {
      return _form.addEventListener('submit', function(event) {
        var action, data, err, event_data, form, method, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, values, xpath;
        if (self._destroyed) {
          return;
        }
        form = this;
        data = {};
        if (self.options.send_data) {
          data = serialize(form, {
            hash: true,
            ignore_password: true
          });
        }
        if (((ref = self.options) != null ? (ref1 = ref.data) != null ? ref1.stop_words : void 0 : void 0) && ((ref2 = self.options) != null ? (ref3 = ref2.data) != null ? ref3.stop_words.length : void 0 : void 0) > 0) {
          self.options.data.stop_words.map(function(stop_word) {
            if (typeof stop_word === 'string') {
              return delete data[stop_word];
            }
          });
        }
        if (_.isFunction((ref4 = self.options) != null ? (ref5 = ref4.data) != null ? ref5.pre : void 0 : void 0)) {
          data = self.options.data.pre(data);
        }
        action = parseuri(form.action);
        self.change_target(action.host, form);
        method = form.getAttribute('method') + '';
        method = method.toLowerCase() === 'post' ? 'post' : 'get';
        values = {
          action: action,
          method: method
        };
        if (((ref6 = self.options) != null ? ref6.data : void 0) != null) {
          values = _.extend(values, self.options.data);
        }
        try {
          xpath = xPath.getElementXPath(form);
          values.xpath = xpath;
        } catch (error) {
          err = error;
        }
        data = self.add_suffix_if_need(data, values);
        values = _.extend(values, data);
        event_data = {
          event_name: self.event_name,
          values: values
        };
        self.emit("form", event_data);
        if ((ref7 = self.options) != null ? (ref8 = ref7.data) != null ? ref8.debug : void 0 : void 0) {
          console.log('form debug preventDefault', event_data);
          return event.preventDefault();
        }
      });
    });
  };

  Form.prototype.change_target = function(host, form) {
    var ref;
    console.log('change_target');
    if (this.options.track_domain) {
      if ((ref = this.delegate) != null ? ref.convert_url : void 0) {
        console.log(this.delegate.convert_url(host, form.action));
        return;
        return form.setAttribute('action', this.delegate.convert_url(host, form.action));
      }
    }
  };

  Form.prototype.add_suffix_if_need = function(data, values) {
    var key, value;
    for (key in data) {
      value = data[key];
      if (indexOf.call(_.keys(values), key) >= 0) {
        data[key + '_'] = value;
        delete data[key];
      }
    }
    return data;
  };

  Form.prototype.destroy = function() {
    return this._destroyed = true;
  };

  return Form;

})(EventEmitter);

__forms__ = {};

module.exports.create = function(selector, event_name, delegate, options) {
  var form, name;
  if (event_name == null) {
    event_name = 'form';
  }
  if (options == null) {
    options = {};
  }
  name = selector + "::" + event_name;
  form = __forms__[name];
  if (form) {
    form.destroy();
  }
  form = new Form(selector, event_name, delegate, options);
  __forms__[name] = form;
  return form;
};


},{"../common/parseuri":42,"events":8,"form-serialize":9,"lodash-custom":1,"xpath":26}],52:[function(require,module,exports){
var EventEmitter, Link, _, parseuri, xPath,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash-custom');

parseuri = require('../common/parseuri');

xPath = require('xpath');

EventEmitter = require('events').EventEmitter;

Link = (function(superClass) {
  extend(Link, superClass);

  function Link(selector1, event_name1, delegate1, options1) {
    var self;
    this.selector = selector1 != null ? selector1 : void 0;
    this.event_name = event_name1 != null ? event_name1 : 'link';
    this.delegate = delegate1;
    this.options = options1 != null ? options1 : {};
    console.log('const');
    Link.__super__.constructor.call(this);
    self = this;
    this.init();
    this._destroyed = false;
  }

  Link.prototype.init = function() {
    var links, self;
    self = this;
    links = document.querySelectorAll(this.selector || 'a');
    if (links.length === 0) {
      return;
    }
    console.log('asdfasdfadsf');
    return Array.prototype.forEach.call(links, function(link) {
      return link.addEventListener('click', function(event) {
        var err, event_data, href, target, uri, values, xpath;
        if (self._destroyed) {
          return;
        }
        link = this;
        href = link.getAttribute('href');
        values = {};
        values = _.extend(values, self.options);
        if (href) {
          uri = parseuri(href);
          target = link.getAttribute('target') || '_self';
          self.change_target(uri.host, href, link);
          values = _.extend(values, {
            href: href,
            uri: uri,
            target: target
          });
        }
        try {
          xpath = xPath.getElementXPath(link);
          values.xpath = xpath;
        } catch (error) {
          err = error;
        }
        event_data = {
          event_name: self.event_name,
          values: values
        };
        self.emit('link', event_data);
        return console.log('aaaa');
      });
    });
  };

  Link.prototype.change_target = function(host, href, link) {
    var ref;
    if (this.options.track_domain) {
      if ((ref = this.delegate) != null ? ref.convert_url : void 0) {
        console.log(this.delegate.convert_url(host, href));
        return link.setAttribute('href', this.delegate.convert_url(host, href));
      }
    }
  };

  Link.prototype.destroy = function() {
    return this._destroyed = true;
  };

  return Link;

})(EventEmitter);

module.exports.create = function(selector, event_name, delegate, options) {
  var link;
  if (event_name == null) {
    event_name = 'link';
  }
  if (options == null) {
    options = {};
  }
  link = new Link(selector, event_name, delegate, options);
  return link;
};


},{"../common/parseuri":42,"events":8,"lodash-custom":1,"xpath":26}],53:[function(require,module,exports){
module.exports = "0.6";


},{}],54:[function(require,module,exports){
module.exports=[
  "init",
  "start",
  "stop",
  "user",
  "optout",
  "track",
  "action",
  "event",
  "goal",
  "chat",
  "exec_force_action",
  "buy",
  "page",
  "view",
  "admin",
  "group",
  "alias",
  "ready",
  "link",
  "form",
  "click",
  "submit",
  "cmd",
  "emit",
  "on",
  "send",
  "css",
  "js",
  "style",
  "option",
  "get",
  "set",
  "collection",
  "check_admin",
  "get_session_info",
  "identify"
]

},{}],55:[function(require,module,exports){

/*
crawling用util
とりあえず、ogpを取り出す
 */
var _, __get_ogp;

__get_ogp = require('./__get_ogp');

_ = require('../../external/lodash.custom.js');

module.exports = function(tracker, value, cb) {
  var ogp;
  if (value == null) {
    value = {};
  }
  if (cb == null) {
    cb = function() {};
  }
  ogp = __get_ogp(false);
  ogp = _.extend(value, ogp);
  return tracker.track('___page', ogp);
};


},{"../../external/lodash.custom.js":1,"./__get_ogp":56}],56:[function(require,module,exports){

/*
ページのogpを取り出す
only_url: urlのみ取り出す
 */
module.exports = function(only_url) {
  var _metatags, i, len, metatags, name, tag;
  if (only_url == null) {
    only_url = true;
  }
  metatags = document.getElementsByTagName("meta");
  _metatags = {};
  for (i = 0, len = metatags.length; i < len; i++) {
    tag = metatags[i];
    name = tag.getAttribute("name");
    if (!name) {
      name = tag.getAttribute("property");
    }
    if (!name) {
      continue;
    }
    _metatags[name] = tag.content;
  }
  if (only_url) {
    return {
      og_url: _metatags['og:url']
    };
  }
  return {
    title: _metatags['title'] || _metatags['og:title'],
    description: _metatags['description'] || _metatags['og:description'],
    keywords: _metatags['keywords'] || _metatags['og:keywords'],
    og_title: _metatags['og:title'],
    og_description: _metatags['og:description'],
    og_type: _metatags['og:type'],
    og_image: _metatags['og:image'],
    og_url: _metatags['og:url'],
    og_keywords: _metatags['og:keywords'],
    og_site_name: _metatags['og:site_name']
  };
};


},{}],57:[function(require,module,exports){
var _logs;

_logs = [];

module.exports = (function(_this) {
  return function() {
    _logs.push(arguments);
  };
})(this);

window._karte_logs = _logs;


},{}],58:[function(require,module,exports){
var MAXAGE_TYPES, _get, existLocalStorage, get, jsonStringify, keyName, keyOptout, remove, set;

jsonStringify = require('./stringify');

MAXAGE_TYPES = require('./config').MAXAGE_TYPES;

keyOptout = 'oo';

keyName = function(key) {
  return 'krt___' + key;
};

_get = function(key) {
  var err, expire, item, now, obj;
  key = keyName(key);
  item = localStorage.getItem(key);
  if (!item) {
    return void 0;
  }
  try {
    obj = JSON.parse(item);
  } catch (error) {
    err = error;
    return void 0;
  }
  if (obj.val == null) {
    localStorage.removeItem(key);
    return void 0;
  }
  if (key !== keyName(keyOptout)) {
    now = (new Date()).getTime();
    expire = Math.max(obj.expire || 0, MAXAGE_TYPES.LONG);
    if ((now - obj.last) > expire) {
      localStorage.removeItem(key);
      return void 0;
    }
  }
  return obj;
};

existLocalStorage = function() {
  var date, e, localStorage;
  date = +(new Date);
  try {
    localStorage = window.localStorage;
    localStorage.setItem(date, date);
    localStorage.removeItem(date);
    return true;
  } catch (error) {
    e = error;
    return false;
  }
};

remove = function(key) {
  if (!existLocalStorage()) {
    return;
  }
  key = keyName(key);
  return localStorage.removeItem(key);
};

get = function(key) {
  var obj;
  if (!existLocalStorage()) {
    return void 0;
  }
  obj = _get(key);
  if (obj == null) {
    return void 0;
  }
  return obj.val;
};

set = function(key, val, expire) {
  var err, last, obj;
  if (expire == null) {
    expire = false;
  }
  if (!existLocalStorage()) {
    return;
  }
  obj = _get(key);
  key = keyName(key);
  last = (new Date()).getTime();
  if (obj) {
    obj.val = val;
    if (expire) {
      obj.expire = expire;
    }
    obj.last = last;
  } else {
    obj = {
      val: val,
      expire: expire,
      last: last
    };
  }
  try {
    obj = jsonStringify(obj);
    return localStorage.setItem(key, obj);
  } catch (error) {
    err = error;
    console.log(err);
  }
  return null;
};

module.exports = {
  get: get,
  set: set,
  remove: remove
};


},{"./config":59,"./stringify":67}],59:[function(require,module,exports){
exports.PERSISTENT_DATA_NAMES = ['vis', 'oo'];

exports.MAXAGE_TYPES = {
  TINY: 3 * 60 * 1000,
  VERY_SHORT: 5 * 60 * 1000,
  SHORT: 30 * 60 * 1000,
  LONG: 2 * 365 * 24 * 60 * 60 * 1000
};


},{}],60:[function(require,module,exports){
if ("web" === "web") {
  module.exports = require("./access.web");
} else {
  module.exports = require("./access.native");
}

},{"./access.native":61,"./access.web":62}],61:[function(require,module,exports){
var access, parseuri, return_screen_obj, uri;

parseuri = require('../../core-v1/src/common/parseuri');

return_screen_obj = function() {
  var i, key, len, screen_keys, temp;
  screen_keys = ["availTop", "availLeft", "availHeight", "availWidth", "colorDepth", "height", "left", "pixelDepth", "top", "width"];
  temp = {};
  for (i = 0, len = screen_keys.length; i < len; i++) {
    key = screen_keys[i];
    temp[key] = screen[key];
  }
  return temp;
};

uri = parseuri(location.href);

access = {
  screen: return_screen_obj(),
  uri: uri
};

exports.updateAccess = function(uri) {
  var app_info, err, ref, ref1, ref2, ref3, ref4;
  access.uri = uri = parseuri(uri || location.href);
  app_info = uri != null ? (ref = uri.queryKey) != null ? ref._k_app_prof : void 0 : void 0;
  if (app_info != null) {
    try {
      app_info = decodeURIComponent(app_info);
      access.app_info = JSON.parse(app_info);
    } catch (error) {
      err = error;
      try {
        app_info = decodeURIComponent(app_info);
        access.app_info = JSON.parse(app_info);
      } catch (error) {
        err = error;
        console.error("failed to parse app_information:" + err + "," + app_info);
      }
    }
  }
  access.is_android = ((ref1 = access.app_info) != null ? (ref2 = ref1.system_info) != null ? ref2.os : void 0 : void 0) === "Android";
  access.is_ios = ((ref3 = access.app_info) != null ? (ref4 = ref3.system_info) != null ? ref4.os : void 0 : void 0) === "iOS";
  access.screen = return_screen_obj();
  return access;
};

exports.updateAccess();

exports.access = access;


},{"../../core-v1/src/common/parseuri":42}],62:[function(require,module,exports){
var UAParser, __get_ogp, access, language, og_url, parseuri, ref, referrer, return_screen_obj, ua_parser, uri, useragent;

UAParser = require('ua-parser-js');

ua_parser = new UAParser();

parseuri = require('../../core-v1/src/common/parseuri');

__get_ogp = require('../__get_ogp');

useragent = ua_parser.getResult();

if (useragent.browser && useragent.browser.name && useragent.browser.version) {
  useragent.browser.all = useragent.browser.name + '/' + useragent.browser.version;
}

if (useragent.os && useragent.os.name && useragent.os.version) {
  useragent.os.all = useragent.os.name + '/' + useragent.os.version;
}

language = navigator.language ? navigator.language : navigator.userLanguage;

language = language != null ? (ref = language.toString()) != null ? ref.toLowerCase() : void 0 : void 0;

return_screen_obj = function() {
  var i, key, len, screen_keys, temp;
  screen_keys = ["availTop", "availLeft", "availHeight", "availWidth", "colorDepth", "height", "left", "pixelDepth", "top", "width"];
  temp = {};
  for (i = 0, len = screen_keys.length; i < len; i++) {
    key = screen_keys[i];
    temp[key] = screen[key];
  }
  return temp;
};

uri = parseuri(location.href);

referrer = parseuri(document.referrer);

access = {
  device: useragent.device,
  os: useragent.os,
  engine: useragent.engine,
  browser: useragent.browser,
  "user-agent": navigator.userAgent,
  language: language,
  screen: return_screen_obj(),
  uri: uri,
  'title': document.title
};

if (referrer.host !== uri.host) {
  if (referrer.host) {
    access.referrer = referrer;
    access.land_uri = uri;
  }
} else {
  access.in_referrer = referrer;
}

og_url = __get_ogp(true).og_url;

access.og_url = og_url;

exports.useragent = useragent;

exports.access = access;

exports.updateAccess = function() {
  var ref1;
  access.uri = uri = parseuri(location.href);
  referrer = parseuri(document.referrer);
  if (referrer.host !== uri.host) {
    if (referrer.host) {
      access.referrer = referrer;
      access.land_uri = uri;
    }
  } else {
    access.in_referrer = referrer;
  }
  access.screen = return_screen_obj();
  language = navigator.language ? navigator.language : navigator.userLanguage;
  access.language = language != null ? (ref1 = language.toString()) != null ? ref1.toLowerCase() : void 0 : void 0;
  access.title = document.title;
  return access;
};


},{"../../core-v1/src/common/parseuri":42,"../__get_ogp":56,"ua-parser-js":20}],63:[function(require,module,exports){
exports.EVENT_SOURCES = {
  WEB: "web",
  NATIVE_APP_SDK: "native_app_sdk",
  NATIVE_APP_WEBVIEW: "native_app_webview"
};


},{}],64:[function(require,module,exports){
module.exports = function(url, target, callFromAsyncMethod) {
  var isNewWindow;
  if (callFromAsyncMethod == null) {
    callFromAsyncMethod = false;
  }
  if (url == null) {
    return false;
  }
  isNewWindow = (target != null) && target !== '_self';
  if (!isNewWindow) {
    if (callFromAsyncMethod) {
      setTimeout(function() {
        return window.location.href = url;
      }, 0);
    } else {
      window.location.href = url;
    }
    return true;
  } else if (!callFromAsyncMethod) {
    if (target === '_blank') {
      target = void 0;
    }
    window.open(url, target);
  }
  return false;
};


},{}],65:[function(require,module,exports){
var platform;

platform = "web" || "web";

module.exports = {
  platform: platform,
  is_web: platform === "web",
  is_native_app: platform === "native-app"
};


},{}],66:[function(require,module,exports){
var PusherSubscriber, loadPlugin;

loadPlugin = require('../../plugin-loader').loadPlugin;

PusherSubscriber = (function() {
  function PusherSubscriber() {
    this.pusher = null;
    this.pocky = null;
    this.methods = [];
    this.channel = null;
    this.channel_project = null;
  }

  PusherSubscriber.prototype.init = function(pocky) {
    if (this.pusher) {
      return this;
    }
    this.pocky = pocky;
    loadPlugin('pusher', (function(_this) {
      return function(err, Pusher) {
        _this.pusher = new Pusher(pocky.pusher_api_key, {
          cluster: pocky.pusher_cluster,
          encrypted: true
        });
        _this.channel = _this.pusher.subscribe(pocky.api_key + '---' + 'vis-' + pocky.visitor.visitor_id);
        _this.channel_project = _this.pusher.subscribe(pocky.api_key);
        return _this.subscribeAll();
      };
    })(this));
    return this;
  };

  PusherSubscriber.prototype._subscribe = function(arg) {
    var eventName, method;
    eventName = arg.eventName, method = arg.method;
    switch (eventName) {
      case 'message':
        return this.channel.bind('message', method);
      case 'status__user':
        return this.channel.bind('status', method);
      case 'status__project':
        return this.channel_project.bind('status', method);
      case 'subscription_succeeded__user':
        return this.channel.bind('pusher:subscription_succeeded', method);
      case 'subscription_succeeded__project':
        return this.channel_project.bind('pusher:subscription_succeeded', method);
      case 'connection_connected':
        return this.pusher.connection.bind('connected', method);
      case 'connection_connecting':
        return this.pusher.connection.bind('connecting', method);
      case 'connection_unavailable':
        return this.pusher.connection.bind('unavailable', method);
      case 'connection_failed':
        return this.pusher.connection.bind('failed', method);
      case 'connection_disconnected':
        return this.pusher.connection.bind('disconnected', method);
      case 'talk_chat_status_changed':
        return this.channel.bind('talk_chat_status_changed', method);
      case 'letter':
        return this.channel.bind('letter', method);
    }
  };

  PusherSubscriber.prototype.subscribe = function(eventName, method) {
    if (!this.pusher) {
      this.methods.push({
        eventName: eventName,
        method: method
      });
      return;
    }
    return this._subscribe({
      eventName: eventName,
      method: method
    });
  };

  PusherSubscriber.prototype.subscribeAll = function() {
    var eventName, i, len, method, ref, ref1;
    ref = this.methods;
    for (i = 0, len = ref.length; i < len; i++) {
      ref1 = ref[i], eventName = ref1.eventName, method = ref1.method;
      this._subscribe({
        eventName: eventName,
        method: method
      });
    }
    return this.methods = [];
  };

  return PusherSubscriber;

})();

module.exports = new PusherSubscriber();


},{"../../plugin-loader":68}],67:[function(require,module,exports){
var jsonStringify;

module.exports = jsonStringify = function(value) {
  var _array_tojson, r;
  if (window.Prototype) {
    if (Array.prototype.toJSON != null) {
      _array_tojson = Array.prototype.toJSON;
      delete Array.prototype.toJSON;
    }
    r = JSON.stringify(value);
    if (_array_tojson != null) {
      Array.prototype.toJSON = _array_tojson;
    }
    return r;
  } else {
    return JSON.stringify(value);
  }
};


},{}],68:[function(require,module,exports){
var __included_modules, __resolver, _renameWithTrackerUrl, dependencies, eachAsync, loader, regex, to;

eachAsync = require('tiny-each-async');

loader = require('./tiny-load-async');

__included_modules = {};

dependencies = {
  webpopup: 'webpopup',
  script: 'legacy',
  'widget-v1': 'legacy',
  widget: 'widget',
  webchat: 'chat',
  pusher: 'chat',
  jquery: 'jquery',
  moment: 'moment',
  lodash: 'lodash'
};

exports._setIncludedModule = function(name, module) {
  return __included_modules[name] = module;
};

exports.loadPlugins = function(plugins, cb) {
  var _modules;
  _modules = {};
  return eachAsync(plugins, function(name, idx, next) {
    return exports.loadPlugin(name, function(err, _module) {
      if (err) {
        return next(err);
      }
      _modules[name] = _module;
      return next();
    });
  }, function(err) {
    return cb(err, _modules);
  });
};

__resolver = function(path) {
  return path;
};

regex = /(\.core|\.embed)?(\.beauty)?(\.min)?(\.js)?(\?.*)?$/;

to = '$2$3$4$5';

_renameWithTrackerUrl = function(tracker_url, moduleName) {
  return tracker_url.replace(regex, '.' + moduleName + '$2$3$4$5');
};

exports.init = function(arg) {
  var tracker_url;
  tracker_url = arg.tracker_url;
  if (tracker_url) {
    return __resolver = function(moduleName) {
      return _renameWithTrackerUrl(tracker_url, moduleName);
    };
  }
};

exports._renameWithTrackerUrl = _renameWithTrackerUrl;

exports.loadPlugin = function(name, cb) {
  var moduleName, path;
  if (cb == null) {
    cb = function(err, plugin) {};
  }
  moduleName = dependencies[name];
  if (!moduleName) {
    return cb(new Error('module not found by plugin', name));
  }
  if (__included_modules[moduleName] != null) {
    if (__included_modules[moduleName][name] == null) {
      return cb(new Error("plugin not found, " + moduleName + ": " + name));
    }
    return cb(null, __included_modules[moduleName][name]);
  }
  path = __resolver(moduleName);
  return loader.loadAsync(path, function(err, _exports) {
    if (err) {
      return cb(err);
    }
    if (!_exports) {
      return cb(new Error('module not found'));
    }
    if (!(name in _exports)) {
      return cb(new Error('plugin not found'));
    }
    return cb(null, _exports[name]);
  });
};


},{"./tiny-load-async":69,"tiny-each-async":17}],69:[function(require,module,exports){
var __loader_context__, fetchDeps, getModule;

__loader_context__ = {
  cache: {},
  callbacks: {}
};

exports.__loader_context__ = __loader_context__;

fetchDeps = function(name, cb) {
  var req;
  req = new XMLHttpRequest();
  req.addEventListener('load', function() {
    if (req.status < 400) {
      return cb(null, req.responseText);
    } else {
      return cb(req.status);
    }
  }, false);
  req.addEventListener('error', function() {
    return cb(req.status);
  }, false);
  req.open('GET', name, true);
  return req.send(null);
};

getModule = function(code) {
  var _module;
  _module = {
    exports: null,
    exported: false
  };
  new Function('module', 'exports', 'require', code)(_module, _module.exports, void 0);
  return _module;
};

exports.getModule = getModule;

exports.loadAsync = function(url, cb) {
  var _callback, _module, cache, callbacks;
  _module = null;
  cache = __loader_context__.cache, callbacks = __loader_context__.callbacks;
  if (url in cache) {
    return cb(null, cache[url]);
  }
  _callback = function(err, _exports) {
    var callback, i, len, ref;
    ref = callbacks[url];
    for (i = 0, len = ref.length; i < len; i++) {
      callback = ref[i];
      callback(err, _exports);
    }
    return callbacks[url] = null;
  };
  if (callbacks[url] == null) {
    callbacks[url] = [];
  }
  callbacks[url].push(cb);
  if (callbacks[url].length > 1) {
    return;
  }
  return fetchDeps(url, function(err, code) {
    if (err) {
      return _callback(err);
    }
    try {
      _module = getModule(code);
    } catch (error) {
      err = error;
      return _callback(err);
    }
    cache[url] = _module.exports;
    return _callback(null, _module.exports);
  });
};


},{}],70:[function(require,module,exports){
(function (window, document, location, setTimeout, decodeURIComponent, encodeURIComponent) {
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global JSON, XMLHttpRequest, window, escape, unescape, ActiveXObject */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

var global = this;
var channelId = Math.floor(Math.random() * 10000); // randomize the initial id in case of multiple closures loaded 
var emptyFn = Function.prototype;
var reURI = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/; // returns groups for protocol (2), domain (3) and port (4) 
var reParent = /[\-\w]+\/\.\.\//; // matches a foo/../ expression 
var reDoubleSlash = /([^:])\/\//g; // matches // anywhere but in the protocol
var namespace = ""; // stores namespace under which easyXDM object is stored on the page (empty if object is global)
var easyXDM = {};
var _easyXDM = window.easyXDM; // map over global easyXDM in case of overwrite
var IFRAME_PREFIX = "easyXDM_";
var HAS_NAME_PROPERTY_BUG;
var useHash = false; // whether to use the hash over the query
var flashVersion; // will be set if using flash
var HAS_FLASH_THROTTLED_BUG;


// http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
function isHostMethod(object, property){
    var t = typeof object[property];
    return t == 'function' ||
    (!!(t == 'object' && object[property])) ||
    t == 'unknown';
}

function isHostObject(object, property){
    return !!(typeof(object[property]) == 'object' && object[property]);
}

// end

// http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
function isArray(o){
    return Object.prototype.toString.call(o) === '[object Array]';
}

// end
function hasFlash(){
    var name = "Shockwave Flash", mimeType = "application/x-shockwave-flash";
    
    if (!undef(navigator.plugins) && typeof navigator.plugins[name] == "object") {
        // adapted from the swfobject code
        var description = navigator.plugins[name].description;
        if (description && !undef(navigator.mimeTypes) && navigator.mimeTypes[mimeType] && navigator.mimeTypes[mimeType].enabledPlugin) {
            flashVersion = description.match(/\d+/g);
        }
    }
    if (!flashVersion) {
        var flash;
        try {
            flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            flashVersion = Array.prototype.slice.call(flash.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1);
            flash = null;
        } 
        catch (notSupportedException) {
        }
    }
    if (!flashVersion) {
        return false;
    }
    var major = parseInt(flashVersion[0], 10), minor = parseInt(flashVersion[1], 10);
    HAS_FLASH_THROTTLED_BUG = major > 9 && minor > 0;
    return true;
}

/*
 * Cross Browser implementation for adding and removing event listeners.
 */
var on, un;
if (isHostMethod(window, "addEventListener")) {
    on = function(target, type, listener){
        target.addEventListener(type, listener, false);
    };
    un = function(target, type, listener){
        target.removeEventListener(type, listener, false);
    };
}
else if (isHostMethod(window, "attachEvent")) {
    on = function(object, sEvent, fpNotify){
        object.attachEvent("on" + sEvent, fpNotify);
    };
    un = function(object, sEvent, fpNotify){
        object.detachEvent("on" + sEvent, fpNotify);
    };
}
else {
    throw new Error("Browser not supported");
}

/*
 * Cross Browser implementation of DOMContentLoaded.
 */
var domIsReady = false, domReadyQueue = [], readyState;
if ("readyState" in document) {
    // If browser is WebKit-powered, check for both 'loaded' (legacy browsers) and
    // 'interactive' (HTML5 specs, recent WebKit builds) states.
    // https://bugs.webkit.org/show_bug.cgi?id=45119
    readyState = document.readyState;
    domIsReady = readyState == "complete" || (~ navigator.userAgent.indexOf('AppleWebKit/') && (readyState == "loaded" || readyState == "interactive"));
}
else {
    // If readyState is not supported in the browser, then in order to be able to fire whenReady functions apropriately
    // when added dynamically _after_ DOM load, we have to deduce wether the DOM is ready or not.
    // We only need a body to add elements to, so the existence of document.body is enough for us.
    domIsReady = !!document.body;
}

function dom_onReady(){
    if (domIsReady) {
        return;
    }
    domIsReady = true;
    for (var i = 0; i < domReadyQueue.length; i++) {
        domReadyQueue[i]();
    }
    domReadyQueue.length = 0;
}


if (!domIsReady) {
    if (isHostMethod(window, "addEventListener")) {
        on(document, "DOMContentLoaded", dom_onReady);
    }
    else {
        on(document, "readystatechange", function(){
            if (document.readyState == "complete") {
                dom_onReady();
            }
        });
        if (document.documentElement.doScroll && window === top) {
            var doScrollCheck = function(){
                if (domIsReady) {
                    return;
                }
                // http://javascript.nwbox.com/IEContentLoaded/
                try {
                    document.documentElement.doScroll("left");
                } 
                catch (e) {
                    setTimeout(doScrollCheck, 1);
                    return;
                }
                dom_onReady();
            };
            doScrollCheck();
        }
    }
    
    // A fallback to window.onload, that will always work
    on(window, "load", dom_onReady);
}
/**
 * This will add a function to the queue of functions to be run once the DOM reaches a ready state.
 * If functions are added after this event then they will be executed immediately.
 * @param {function} fn The function to add
 * @param {Object} scope An optional scope for the function to be called with.
 */
function whenReady(fn, scope){
    if (domIsReady) {
        fn.call(scope);
        return;
    }
    domReadyQueue.push(function(){
        fn.call(scope);
    });
}

/**
 * Returns an instance of easyXDM from the parent window with
 * respect to the namespace.
 *
 * @return An instance of easyXDM (in the parent window)
 */
function getParentObject(){
    var obj = parent;
    if (namespace !== "") {
        for (var i = 0, ii = namespace.split("."); i < ii.length; i++) {
            obj = obj[ii[i]];
        }
    }
    return obj.easyXDM;
}

/**
 * Removes easyXDM variable from the global scope. It also returns control
 * of the easyXDM variable to whatever code used it before.
 *
 * @param {String} ns A string representation of an object that will hold
 *                    an instance of easyXDM.
 * @return An instance of easyXDM
 */
function noConflict(ns){
    
    window.easyXDM = _easyXDM;
    namespace = ns;
    if (namespace) {
        IFRAME_PREFIX = "easyXDM_" + namespace.replace(".", "_") + "_";
    }
    return easyXDM;
}

/*
 * Methods for working with URLs
 */
/**
 * Get the domain name from a url.
 * @param {String} url The url to extract the domain from.
 * @return The domain part of the url.
 * @type {String}
 */
function getDomainName(url){
    return url.match(reURI)[3];
}

/**
 * Get the port for a given URL, or "" if none
 * @param {String} url The url to extract the port from.
 * @return The port part of the url.
 * @type {String}
 */
function getPort(url){
    return url.match(reURI)[4] || "";
}

/**
 * Returns  a string containing the schema, domain and if present the port
 * @param {String} url The url to extract the location from
 * @return {String} The location part of the url
 */
function getLocation(url){
    var m = url.toLowerCase().match(reURI);
    var proto = m[2], domain = m[3], port = m[4] || "";
    if ((proto == "http:" && port == ":80") || (proto == "https:" && port == ":443")) {
        port = "";
    }
    return proto + "//" + domain + port;
}

/**
 * Resolves a relative url into an absolute one.
 * @param {String} url The path to resolve.
 * @return {String} The resolved url.
 */
function resolveUrl(url){
    
    // replace all // except the one in proto with /
    url = url.replace(reDoubleSlash, "$1/");
    
    // If the url is a valid url we do nothing
    if (!url.match(/^(http||https):\/\//)) {
        // If this is a relative path
        var path = (url.substring(0, 1) === "/") ? "" : location.pathname;
        if (path.substring(path.length - 1) !== "/") {
            path = path.substring(0, path.lastIndexOf("/") + 1);
        }
        
        url = location.protocol + "//" + location.host + path + url;
    }
    
    // reduce all 'xyz/../' to just '' 
    while (reParent.test(url)) {
        url = url.replace(reParent, "");
    }
    
    return url;
}

/**
 * Appends the parameters to the given url.<br/>
 * The base url can contain existing query parameters.
 * @param {String} url The base url.
 * @param {Object} parameters The parameters to add.
 * @return {String} A new valid url with the parameters appended.
 */
function appendQueryParameters(url, parameters){
    
    var hash = "", indexOf = url.indexOf("#");
    if (indexOf !== -1) {
        hash = url.substring(indexOf);
        url = url.substring(0, indexOf);
    }
    var q = [];
    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            q.push(key + "=" + encodeURIComponent(parameters[key]));
        }
    }
    return url + (useHash ? "#" : (url.indexOf("?") == -1 ? "?" : "&")) + q.join("&") + hash;
}


// build the query object either from location.query, if it contains the xdm_e argument, or from location.hash
var query = (function(input){
    input = input.substring(1).split("&");
    var data = {}, pair, i = input.length;
    while (i--) {
        pair = input[i].split("=");
        data[pair[0]] = decodeURIComponent(pair[1]);
    }
    return data;
}(/xdm_e=/.test(location.search) ? location.search : location.hash));

/*
 * Helper methods
 */
/**
 * Helper for checking if a variable/property is undefined
 * @param {Object} v The variable to test
 * @return {Boolean} True if the passed variable is undefined
 */
function undef(v){
    return typeof v === "undefined";
}

/**
 * A safe implementation of HTML5 JSON. Feature testing is used to make sure the implementation works.
 * @return {JSON} A valid JSON conforming object, or null if not found.
 */
var getJSON = function(){
    var cached = {};
    var obj = {
        a: [1, 2, 3]
    }, json = "{\"a\":[1,2,3]}";
    
    if (typeof JSON != "undefined" && typeof JSON.stringify === "function" && JSON.stringify(obj).replace((/\s/g), "") === json) {
        // this is a working JSON instance
        return JSON;
    }
    if (Object.toJSON) {
        if (Object.toJSON(obj).replace((/\s/g), "") === json) {
            // this is a working stringify method
            cached.stringify = Object.toJSON;
        }
    }
    
    if (typeof String.prototype.evalJSON === "function") {
        obj = json.evalJSON();
        if (obj.a && obj.a.length === 3 && obj.a[2] === 3) {
            // this is a working parse method           
            cached.parse = function(str){
                return str.evalJSON();
            };
        }
    }
    
    if (cached.stringify && cached.parse) {
        // Only memoize the result if we have valid instance
        getJSON = function(){
            return cached;
        };
        return cached;
    }
    return null;
};

/**
 * Applies properties from the source object to the target object.<br/>
 * @param {Object} target The target of the properties.
 * @param {Object} source The source of the properties.
 * @param {Boolean} noOverwrite Set to True to only set non-existing properties.
 */
function apply(destination, source, noOverwrite){
    var member;
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            if (prop in destination) {
                member = source[prop];
                if (typeof member === "object") {
                    apply(destination[prop], member, noOverwrite);
                }
                else if (!noOverwrite) {
                    destination[prop] = source[prop];
                }
            }
            else {
                destination[prop] = source[prop];
            }
        }
    }
    return destination;
}

// This tests for the bug in IE where setting the [name] property using javascript causes the value to be redirected into [submitName].
function testForNamePropertyBug(){
    var form = document.body.appendChild(document.createElement("form")), input = form.appendChild(document.createElement("input"));
    input.name = IFRAME_PREFIX + "TEST" + channelId; // append channelId in order to avoid caching issues
    HAS_NAME_PROPERTY_BUG = input !== form.elements[input.name];
    document.body.removeChild(form);
}

/**
 * Creates a frame and appends it to the DOM.
 * @param config {object} This object can have the following properties
 * <ul>
 * <li> {object} prop The properties that should be set on the frame. This should include the 'src' property.</li>
 * <li> {object} attr The attributes that should be set on the frame.</li>
 * <li> {DOMElement} container Its parent element (Optional).</li>
 * <li> {function} onLoad A method that should be called with the frames contentWindow as argument when the frame is fully loaded. (Optional)</li>
 * </ul>
 * @return The frames DOMElement
 * @type DOMElement
 */
function createFrame(config){
    if (undef(HAS_NAME_PROPERTY_BUG)) {
        testForNamePropertyBug();
    }
    var frame;
    // This is to work around the problems in IE6/7 with setting the name property. 
    // Internally this is set as 'submitName' instead when using 'iframe.name = ...'
    // This is not required by easyXDM itself, but is to facilitate other use cases 
    if (HAS_NAME_PROPERTY_BUG) {
        frame = document.createElement("<iframe name=\"" + config.props.name + "\"/>");
    }
    else {
        frame = document.createElement("IFRAME");
        frame.name = config.props.name;
    }
    
    frame.id = frame.name = config.props.name;
    delete config.props.name;
    
    if (typeof config.container == "string") {
        config.container = document.getElementById(config.container);
    }
    
    if (!config.container) {
        // This needs to be hidden like this, simply setting display:none and the like will cause failures in some browsers.
        apply(frame.style, {
            position: "absolute",
            top: "-2000px",
            // Avoid potential horizontal scrollbar
            left: "0px"
        });
        config.container = document.body;
    }
    
    // HACK: IE cannot have the src attribute set when the frame is appended
    //       into the container, so we set it to "javascript:false" as a
    //       placeholder for now.  If we left the src undefined, it would
    //       instead default to "about:blank", which causes SSL mixed-content
    //       warnings in IE6 when on an SSL parent page.
    var src = config.props.src;
    config.props.src = "javascript:false";
    
    // transfer properties to the frame
    apply(frame, config.props);
    
    frame.border = frame.frameBorder = 0;
    frame.allowTransparency = true;
    config.container.appendChild(frame);
    
    if (config.onLoad) {
        on(frame, "load", config.onLoad);
    }
    
    // set the frame URL to the proper value (we previously set it to
    // "javascript:false" to work around the IE issue mentioned above)
    if(config.usePost) {
        var form = config.container.appendChild(document.createElement('form')), input;
        form.target = frame.name;
        form.action = src;
        form.method = 'POST';
        if (typeof(config.usePost) === 'object') {
            for (var i in config.usePost) {
                if (config.usePost.hasOwnProperty(i)) {
                    if (HAS_NAME_PROPERTY_BUG) {
                        input = document.createElement('<input name="' + i + '"/>');
                    } else {
                        input = document.createElement("INPUT");
                        input.name = i;
                    }
                    input.value = config.usePost[i];
                    form.appendChild(input);
                }
            }
        }
        form.submit();
        form.parentNode.removeChild(form);
    } else {
        frame.src = src;
    }
    config.props.src = src;
    
    return frame;
}

/**
 * Check whether a domain is allowed using an Access Control List.
 * The ACL can contain * and ? as wildcards, or can be regular expressions.
 * If regular expressions they need to begin with ^ and end with $.
 * @param {Array/String} acl The list of allowed domains
 * @param {String} domain The domain to test.
 * @return {Boolean} True if the domain is allowed, false if not.
 */
function checkAcl(acl, domain){
    // normalize into an array
    if (typeof acl == "string") {
        acl = [acl];
    }
    var re, i = acl.length;
    while (i--) {
        re = acl[i];
        re = new RegExp(re.substr(0, 1) == "^" ? re : ("^" + re.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"));
        if (re.test(domain)) {
            return true;
        }
    }
    return false;
}

/*
 * Functions related to stacks
 */
/**
 * Prepares an array of stack-elements suitable for the current configuration
 * @param {Object} config The Transports configuration. See easyXDM.Socket for more.
 * @return {Array} An array of stack-elements with the TransportElement at index 0.
 */
function prepareTransportStack(config){
    var protocol = config.protocol, stackEls;
    config.isHost = config.isHost || undef(query.xdm_p);
    useHash = config.hash || false;
    
    if (!config.props) {
        config.props = {};
    }
    if (!config.isHost) {
        config.channel = query.xdm_c.replace(/["'<>\\]/g, "");
        config.secret = query.xdm_s;
        config.remote = query.xdm_e.replace(/["'<>\\]/g, "");
        ;
        protocol = query.xdm_p;
        if (config.acl && !checkAcl(config.acl, config.remote)) {
            throw new Error("Access denied for " + config.remote);
        }
    }
    else {
        config.remote = resolveUrl(config.remote);
        config.channel = config.channel || "default" + channelId++;
        config.secret = Math.random().toString(16).substring(2);
        if (undef(protocol)) {
            if (getLocation(location.href) == getLocation(config.remote)) {
                /*
                 * Both documents has the same origin, lets use direct access.
                 */
                protocol = "4";
            }
            else if (isHostMethod(window, "postMessage") || isHostMethod(document, "postMessage")) {
                /*
                 * This is supported in IE8+, Firefox 3+, Opera 9+, Chrome 2+ and Safari 4+
                 */
                protocol = "1";
            }
            else if (config.swf && isHostMethod(window, "ActiveXObject") && hasFlash()) {
                /*
                 * The Flash transport superseedes the NixTransport as the NixTransport has been blocked by MS
                 */
                protocol = "6";
            }
            else if (navigator.product === "Gecko" && "frameElement" in window && navigator.userAgent.indexOf('WebKit') == -1) {
                /*
                 * This is supported in Gecko (Firefox 1+)
                 */
                protocol = "5";
            }
            else if (config.remoteHelper) {
                /*
                 * This is supported in all browsers that retains the value of window.name when
                 * navigating from one domain to another, and where parent.frames[foo] can be used
                 * to get access to a frame from the same domain
                 */
                protocol = "2";
            }
            else {
                /*
                 * This is supported in all browsers where [window].location is writable for all
                 * The resize event will be used if resize is supported and the iframe is not put
                 * into a container, else polling will be used.
                 */
                protocol = "0";
            }
        }
    }
    config.protocol = protocol; // for conditional branching
    switch (protocol) {
        case "0":// 0 = HashTransport
            apply(config, {
                interval: 100,
                delay: 2000,
                useResize: true,
                useParent: false,
                usePolling: false
            }, true);
            if (config.isHost) {
                if (!config.local) {
                    // If no local is set then we need to find an image hosted on the current domain
                    var domain = location.protocol + "//" + location.host, images = document.body.getElementsByTagName("img"), image;
                    var i = images.length;
                    while (i--) {
                        image = images[i];
                        if (image.src.substring(0, domain.length) === domain) {
                            config.local = image.src;
                            break;
                        }
                    }
                    if (!config.local) {
                        // If no local was set, and we are unable to find a suitable file, then we resort to using the current window 
                        config.local = window;
                    }
                }
                
                var parameters = {
                    xdm_c: config.channel,
                    xdm_p: 0
                };
                
                if (config.local === window) {
                    // We are using the current window to listen to
                    config.usePolling = true;
                    config.useParent = true;
                    config.local = location.protocol + "//" + location.host + location.pathname + location.search;
                    parameters.xdm_e = config.local;
                    parameters.xdm_pa = 1; // use parent
                }
                else {
                    parameters.xdm_e = resolveUrl(config.local);
                }
                
                if (config.container) {
                    config.useResize = false;
                    parameters.xdm_po = 1; // use polling
                }
                config.remote = appendQueryParameters(config.remote, parameters);
            }
            else {
                apply(config, {
                    channel: query.xdm_c,
                    remote: query.xdm_e,
                    useParent: !undef(query.xdm_pa),
                    usePolling: !undef(query.xdm_po),
                    useResize: config.useParent ? false : config.useResize
                });
            }
            stackEls = [new easyXDM.stack.HashTransport(config), new easyXDM.stack.ReliableBehavior({}), new easyXDM.stack.QueueBehavior({
                encode: true,
                maxLength: 4000 - config.remote.length
            }), new easyXDM.stack.VerifyBehavior({
                initiate: config.isHost
            })];
            break;
        case "1":
            stackEls = [new easyXDM.stack.PostMessageTransport(config)];
            break;
        case "2":
            if (config.isHost) {
                config.remoteHelper = resolveUrl(config.remoteHelper);
            }
            stackEls = [new easyXDM.stack.NameTransport(config), new easyXDM.stack.QueueBehavior(), new easyXDM.stack.VerifyBehavior({
                initiate: config.isHost
            })];
            break;
        case "3":
            stackEls = [new easyXDM.stack.NixTransport(config)];
            break;
        case "4":
            stackEls = [new easyXDM.stack.SameOriginTransport(config)];
            break;
        case "5":
            stackEls = [new easyXDM.stack.FrameElementTransport(config)];
            break;
        case "6":
            if (!flashVersion) {
                hasFlash();
            }
            stackEls = [new easyXDM.stack.FlashTransport(config)];
            break;
    }
    // this behavior is responsible for buffering outgoing messages, and for performing lazy initialization
    stackEls.push(new easyXDM.stack.QueueBehavior({
        lazy: config.lazy,
        remove: true
    }));
    return stackEls;
}

/**
 * Chains all the separate stack elements into a single usable stack.<br/>
 * If an element is missing a necessary method then it will have a pass-through method applied.
 * @param {Array} stackElements An array of stack elements to be linked.
 * @return {easyXDM.stack.StackElement} The last element in the chain.
 */
function chainStack(stackElements){
    var stackEl, defaults = {
        incoming: function(message, origin){
            this.up.incoming(message, origin);
        },
        outgoing: function(message, recipient){
            this.down.outgoing(message, recipient);
        },
        callback: function(success){
            this.up.callback(success);
        },
        init: function(){
            this.down.init();
        },
        destroy: function(){
            this.down.destroy();
        }
    };
    for (var i = 0, len = stackElements.length; i < len; i++) {
        stackEl = stackElements[i];
        apply(stackEl, defaults, true);
        if (i !== 0) {
            stackEl.down = stackElements[i - 1];
        }
        if (i !== len - 1) {
            stackEl.up = stackElements[i + 1];
        }
    }
    return stackEl;
}

/**
 * This will remove a stackelement from its stack while leaving the stack functional.
 * @param {Object} element The elment to remove from the stack.
 */
function removeFromStack(element){
    element.up.down = element.down;
    element.down.up = element.up;
    element.up = element.down = null;
}

/*
 * Export the main object and any other methods applicable
 */
/** 
 * @class easyXDM
 * A javascript library providing cross-browser, cross-domain messaging/RPC.
 * @version 2.4.19
 * @singleton
 */
apply(easyXDM, {
    /**
     * The version of the library
     * @type {string}
     */
    version: "2.4.19",
    /**
     * This is a map containing all the query parameters passed to the document.
     * All the values has been decoded using decodeURIComponent.
     * @type {object}
     */
    query: query,
    /**
     * @private
     */
    stack: {},
    /**
     * Applies properties from the source object to the target object.<br/>
     * @param {object} target The target of the properties.
     * @param {object} source The source of the properties.
     * @param {boolean} noOverwrite Set to True to only set non-existing properties.
     */
    apply: apply,
    
    /**
     * A safe implementation of HTML5 JSON. Feature testing is used to make sure the implementation works.
     * @return {JSON} A valid JSON conforming object, or null if not found.
     */
    getJSONObject: getJSON,
    /**
     * This will add a function to the queue of functions to be run once the DOM reaches a ready state.
     * If functions are added after this event then they will be executed immediately.
     * @param {function} fn The function to add
     * @param {object} scope An optional scope for the function to be called with.
     */
    whenReady: whenReady,
    /**
     * Removes easyXDM variable from the global scope. It also returns control
     * of the easyXDM variable to whatever code used it before.
     *
     * @param {String} ns A string representation of an object that will hold
     *                    an instance of easyXDM.
     * @return An instance of easyXDM
     */
    noConflict: noConflict
});

/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global console, _FirebugCommandLine,  easyXDM, window, escape, unescape, isHostObject, undef, _trace, domIsReady, emptyFn, namespace */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, isHostObject, isHostMethod, un, on, createFrame, debug */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/** 
 * @class easyXDM.DomHelper
 * Contains methods for dealing with the DOM
 * @singleton
 */
easyXDM.DomHelper = {
    /**
     * Provides a consistent interface for adding eventhandlers
     * @param {Object} target The target to add the event to
     * @param {String} type The name of the event
     * @param {Function} listener The listener
     */
    on: on,
    /**
     * Provides a consistent interface for removing eventhandlers
     * @param {Object} target The target to remove the event from
     * @param {String} type The name of the event
     * @param {Function} listener The listener
     */
    un: un,
    /**
     * Checks for the presence of the JSON object.
     * If it is not present it will use the supplied path to load the JSON2 library.
     * This should be called in the documents head right after the easyXDM script tag.
     * http://json.org/json2.js
     * @param {String} path A valid path to json2.js
     */
    requiresJSON: function(path){
        if (!isHostObject(window, "JSON")) {
            // we need to encode the < in order to avoid an illegal token error
            // when the script is inlined in a document.
            document.write('<' + 'script type="text/javascript" src="' + path + '"><' + '/script>');
        }
    }
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, debug */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

(function(){
    // The map containing the stored functions
    var _map = {};
    
    /**
     * @class easyXDM.Fn
     * This contains methods related to function handling, such as storing callbacks.
     * @singleton
     * @namespace easyXDM
     */
    easyXDM.Fn = {
        /**
         * Stores a function using the given name for reference
         * @param {String} name The name that the function should be referred by
         * @param {Function} fn The function to store
         * @namespace easyXDM.fn
         */
        set: function(name, fn){
            _map[name] = fn;
        },
        /**
         * Retrieves the function referred to by the given name
         * @param {String} name The name of the function to retrieve
         * @param {Boolean} del If the function should be deleted after retrieval
         * @return {Function} The stored function
         * @namespace easyXDM.fn
         */
        get: function(name, del){
            if (!_map.hasOwnProperty(name)) {
                return;
            }
            var fn = _map[name];
            
            if (del) {
                delete _map[name];
            }
            return fn;
        }
    };
    
}());
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, chainStack, prepareTransportStack, getLocation, debug */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.Socket
 * This class creates a transport channel between two domains that is usable for sending and receiving string-based messages.<br/>
 * The channel is reliable, supports queueing, and ensures that the message originates from the expected domain.<br/>
 * Internally different stacks will be used depending on the browsers features and the available parameters.
 * <h2>How to set up</h2>
 * Setting up the provider:
 * <pre><code>
 * var socket = new easyXDM.Socket({
 * &nbsp; local: "name.html",
 * &nbsp; onReady: function(){
 * &nbsp; &nbsp; &#47;&#47; you need to wait for the onReady callback before using the socket
 * &nbsp; &nbsp; socket.postMessage("foo-message");
 * &nbsp; },
 * &nbsp; onMessage: function(message, origin) {
 * &nbsp;&nbsp; alert("received " + message + " from " + origin);
 * &nbsp; }
 * });
 * </code></pre>
 * Setting up the consumer:
 * <pre><code>
 * var socket = new easyXDM.Socket({
 * &nbsp; remote: "http:&#47;&#47;remotedomain/page.html",
 * &nbsp; remoteHelper: "http:&#47;&#47;remotedomain/name.html",
 * &nbsp; onReady: function(){
 * &nbsp; &nbsp; &#47;&#47; you need to wait for the onReady callback before using the socket
 * &nbsp; &nbsp; socket.postMessage("foo-message");
 * &nbsp; },
 * &nbsp; onMessage: function(message, origin) {
 * &nbsp;&nbsp; alert("received " + message + " from " + origin);
 * &nbsp; }
 * });
 * </code></pre>
 * If you are unable to upload the <code>name.html</code> file to the consumers domain then remove the <code>remoteHelper</code> property
 * and easyXDM will fall back to using the HashTransport instead of the NameTransport when not able to use any of the primary transports.
 * @namespace easyXDM
 * @constructor
 * @cfg {String/Window} local The url to the local name.html document, a local static file, or a reference to the local window.
 * @cfg {Boolean} lazy (Consumer only) Set this to true if you want easyXDM to defer creating the transport until really needed. 
 * @cfg {String} remote (Consumer only) The url to the providers document.
 * @cfg {String} remoteHelper (Consumer only) The url to the remote name.html file. This is to support NameTransport as a fallback. Optional.
 * @cfg {Number} delay The number of milliseconds easyXDM should try to get a reference to the local window.  Optional, defaults to 2000.
 * @cfg {Number} interval The interval used when polling for messages. Optional, defaults to 300.
 * @cfg {String} channel (Consumer only) The name of the channel to use. Can be used to set consistent iframe names. Must be unique. Optional.
 * @cfg {Function} onMessage The method that should handle incoming messages.<br/> This method should accept two arguments, the message as a string, and the origin as a string. Optional.
 * @cfg {Function} onReady A method that should be called when the transport is ready. Optional.
 * @cfg {DOMElement|String} container (Consumer only) The element, or the id of the element that the primary iframe should be inserted into. If not set then the iframe will be positioned off-screen. Optional.
 * @cfg {Array/String} acl (Provider only) Here you can specify which '[protocol]://[domain]' patterns that should be allowed to act as the consumer towards this provider.<br/>
 * This can contain the wildcards ? and *.  Examples are 'http://example.com', '*.foo.com' and '*dom?.com'. If you want to use reqular expressions then you pattern needs to start with ^ and end with $.
 * If none of the patterns match an Error will be thrown.  
 * @cfg {Object} props (Consumer only) Additional properties that should be applied to the iframe. This can also contain nested objects e.g: <code>{style:{width:"100px", height:"100px"}}</code>. 
 * Properties such as 'name' and 'src' will be overrided. Optional.
 */
easyXDM.Socket = function(config){
    
    // create the stack
    var stack = chainStack(prepareTransportStack(config).concat([{
        incoming: function(message, origin){
            config.onMessage(message, origin);
        },
        callback: function(success){
            if (config.onReady) {
                config.onReady(success);
            }
        }
    }])), recipient = getLocation(config.remote);
    
    // set the origin
    this.origin = getLocation(config.remote);
	
    /**
     * Initiates the destruction of the stack.
     */
    this.destroy = function(){
        stack.destroy();
    };
    
    /**
     * Posts a message to the remote end of the channel
     * @param {String} message The message to send
     */
    this.postMessage = function(message){
        stack.outgoing(message, recipient);
    };
    
    stack.init();
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, undef,, chainStack, prepareTransportStack, debug, getLocation */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/** 
 * @class easyXDM.Rpc
 * Creates a proxy object that can be used to call methods implemented on the remote end of the channel, and also to provide the implementation
 * of methods to be called from the remote end.<br/>
 * The instantiated object will have methods matching those specified in <code>config.remote</code>.<br/>
 * This requires the JSON object present in the document, either natively, using json.org's json2 or as a wrapper around library spesific methods.
 * <h2>How to set up</h2>
 * <pre><code>
 * var rpc = new easyXDM.Rpc({
 * &nbsp; &#47;&#47; this configuration is equal to that used by the Socket.
 * &nbsp; remote: "http:&#47;&#47;remotedomain/...",
 * &nbsp; onReady: function(){
 * &nbsp; &nbsp; &#47;&#47; you need to wait for the onReady callback before using the proxy
 * &nbsp; &nbsp; rpc.foo(...
 * &nbsp; }
 * },{
 * &nbsp; local: {..},
 * &nbsp; remote: {..}
 * });
 * </code></pre>
 * 
 * <h2>Exposing functions (procedures)</h2>
 * <pre><code>
 * var rpc = new easyXDM.Rpc({
 * &nbsp; ...
 * },{
 * &nbsp; local: {
 * &nbsp; &nbsp; nameOfMethod: {
 * &nbsp; &nbsp; &nbsp; method: function(arg1, arg2, success, error){
 * &nbsp; &nbsp; &nbsp; &nbsp; ...
 * &nbsp; &nbsp; &nbsp; }
 * &nbsp; &nbsp; },
 * &nbsp; &nbsp; &#47;&#47; with shorthand notation 
 * &nbsp; &nbsp; nameOfAnotherMethod:  function(arg1, arg2, success, error){
 * &nbsp; &nbsp; }
 * &nbsp; },
 * &nbsp; remote: {...}
 * });
 * </code></pre>

 * The function referenced by  [method] will receive the passed arguments followed by the callback functions <code>success</code> and <code>error</code>.<br/>
 * To send a successfull result back you can use
 *     <pre><code>
 *     return foo;
 *     </pre></code>
 * or
 *     <pre><code>
 *     success(foo);
 *     </pre></code>
 *  To return an error you can use
 *     <pre><code>
 *     throw new Error("foo error");
 *     </code></pre>
 * or
 *     <pre><code>
 *     error("foo error");
 *     </code></pre>
 *
 * <h2>Defining remotely exposed methods (procedures/notifications)</h2>
 * The definition of the remote end is quite similar:
 * <pre><code>
 * var rpc = new easyXDM.Rpc({
 * &nbsp; ...
 * },{
 * &nbsp; local: {...},
 * &nbsp; remote: {
 * &nbsp; &nbsp; nameOfMethod: {}
 * &nbsp; }
 * });
 * </code></pre>
 * To call a remote method use
 * <pre><code>
 * rpc.nameOfMethod("arg1", "arg2", function(value) {
 * &nbsp; alert("success: " + value);
 * }, function(message) {
 * &nbsp; alert("error: " + message + );
 * });
 * </code></pre>
 * Both the <code>success</code> and <code>errror</code> callbacks are optional.<br/>
 * When called with no callback a JSON-RPC 2.0 notification will be executed.
 * Be aware that you will not be notified of any errors with this method.
 * <br/>
 * <h2>Specifying a custom serializer</h2>
 * If you do not want to use the JSON2 library for non-native JSON support, but instead capabilities provided by some other library
 * then you can specify a custom serializer using <code>serializer: foo</code>
 * <pre><code>
 * var rpc = new easyXDM.Rpc({
 * &nbsp; ...
 * },{
 * &nbsp; local: {...},
 * &nbsp; remote: {...},
 * &nbsp; serializer : {
 * &nbsp; &nbsp; parse: function(string){ ... },
 * &nbsp; &nbsp; stringify: function(object) {...}
 * &nbsp; }
 * });
 * </code></pre>
 * If <code>serializer</code> is set then the class will not attempt to use the native implementation.
 * @namespace easyXDM
 * @constructor
 * @param {Object} config The underlying transports configuration. See easyXDM.Socket for available parameters.
 * @param {Object} jsonRpcConfig The description of the interface to implement.
 */
easyXDM.Rpc = function(config, jsonRpcConfig){
    
    // expand shorthand notation
    if (jsonRpcConfig.local) {
        for (var method in jsonRpcConfig.local) {
            if (jsonRpcConfig.local.hasOwnProperty(method)) {
                var member = jsonRpcConfig.local[method];
                if (typeof member === "function") {
                    jsonRpcConfig.local[method] = {
                        method: member
                    };
                }
            }
        }
    }
	
    // create the stack
    var stack = chainStack(prepareTransportStack(config).concat([new easyXDM.stack.RpcBehavior(this, jsonRpcConfig), {
        callback: function(success){
            if (config.onReady) {
                config.onReady(success);
            }
        }
    }]));
	
    // set the origin 
    this.origin = getLocation(config.remote);
	
    
    /**
     * Initiates the destruction of the stack.
     */
    this.destroy = function(){
        stack.destroy();
    };
    
    stack.init();
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, getLocation, appendQueryParameters, createFrame, debug, un, on, apply, whenReady, getParentObject, IFRAME_PREFIX*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.SameOriginTransport
 * SameOriginTransport is a transport class that can be used when both domains have the same origin.<br/>
 * This can be useful for testing and for when the main application supports both internal and external sources.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The transports configuration.
 * @cfg {String} remote The remote document to communicate with.
 */
easyXDM.stack.SameOriginTransport = function(config){
    var pub, frame, send, targetOrigin;
    
    return (pub = {
        outgoing: function(message, domain, fn){
            send(message);
            if (fn) {
                fn();
            }
        },
        destroy: function(){
            if (frame) {
                frame.parentNode.removeChild(frame);
                frame = null;
            }
        },
        onDOMReady: function(){
            targetOrigin = getLocation(config.remote);
            
            if (config.isHost) {
                // set up the iframe
                apply(config.props, {
                    src: appendQueryParameters(config.remote, {
                        xdm_e: location.protocol + "//" + location.host + location.pathname,
                        xdm_c: config.channel,
                        xdm_p: 4 // 4 = SameOriginTransport
                    }),
                    name: IFRAME_PREFIX + config.channel + "_provider"
                });
                frame = createFrame(config);
                easyXDM.Fn.set(config.channel, function(sendFn){
                    send = sendFn;
                    setTimeout(function(){
                        pub.up.callback(true);
                    }, 0);
                    return function(msg){
                        pub.up.incoming(msg, targetOrigin);
                    };
                });
            }
            else {
                send = getParentObject().Fn.get(config.channel, true)(function(msg){
                    pub.up.incoming(msg, targetOrigin);
                });
                setTimeout(function(){
                    pub.up.callback(true);
                }, 0);
            }
        },
        init: function(){
            whenReady(pub.onDOMReady, pub);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global global, easyXDM, window, getLocation, appendQueryParameters, createFrame, debug, apply, whenReady, IFRAME_PREFIX, namespace, resolveUrl, getDomainName, HAS_FLASH_THROTTLED_BUG, getPort, query*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.FlashTransport
 * FlashTransport is a transport class that uses an SWF with LocalConnection to pass messages back and forth.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The transports configuration.
 * @cfg {String} remote The remote domain to communicate with.
 * @cfg {String} secret the pre-shared secret used to secure the communication.
 * @cfg {String} swf The path to the swf file
 * @cfg {Boolean} swfNoThrottle Set this to true if you want to take steps to avoid beeing throttled when hidden.
 * @cfg {String || DOMElement} swfContainer Set this if you want to control where the swf is placed
 */
easyXDM.stack.FlashTransport = function(config){
    var pub, // the public interface
 frame, send, targetOrigin, swf, swfContainer;
    
    function onMessage(message, origin){
        setTimeout(function(){
            pub.up.incoming(message, targetOrigin);
        }, 0);
    }
    
    /**
     * This method adds the SWF to the DOM and prepares the initialization of the channel
     */
    function addSwf(domain){
        // the differentiating query argument is needed in Flash9 to avoid a caching issue where LocalConnection would throw an error.
        var url = config.swf + "?host=" + config.isHost;
        var id = "easyXDM_swf_" + Math.floor(Math.random() * 10000);
        
        // prepare the init function that will fire once the swf is ready
        easyXDM.Fn.set("flash_loaded" + domain.replace(/[\-.]/g, "_"), function(){
            easyXDM.stack.FlashTransport[domain].swf = swf = swfContainer.firstChild;
            var queue = easyXDM.stack.FlashTransport[domain].queue;
            for (var i = 0; i < queue.length; i++) {
                queue[i]();
            }
            queue.length = 0;
        });
        
        if (config.swfContainer) {
            swfContainer = (typeof config.swfContainer == "string") ? document.getElementById(config.swfContainer) : config.swfContainer;
        }
        else {
            // create the container that will hold the swf
            swfContainer = document.createElement('div');
            
            // http://bugs.adobe.com/jira/browse/FP-4796
            // http://tech.groups.yahoo.com/group/flexcoders/message/162365
            // https://groups.google.com/forum/#!topic/easyxdm/mJZJhWagoLc
            apply(swfContainer.style, HAS_FLASH_THROTTLED_BUG && config.swfNoThrottle ? {
                height: "20px",
                width: "20px",
                position: "fixed",
                right: 0,
                top: 0
            } : {
                height: "1px",
                width: "1px",
                position: "absolute",
                overflow: "hidden",
                right: 0,
                top: 0
            });
            document.body.appendChild(swfContainer);
        }
        
        // create the object/embed
        var flashVars = "callback=flash_loaded" + encodeURIComponent(domain.replace(/[\-.]/g, "_"))
            + "&proto=" + global.location.protocol
            + "&domain=" + encodeURIComponent(getDomainName(global.location.href))
            + "&port=" + encodeURIComponent(getPort(global.location.href))
            + "&ns=" + encodeURIComponent(namespace);
        swfContainer.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + id + "' data='" + url + "'>" +
        "<param name='allowScriptAccess' value='always'></param>" +
        "<param name='wmode' value='transparent'>" +
        "<param name='movie' value='" +
        url +
        "'></param>" +
        "<param name='flashvars' value='" +
        flashVars +
        "'></param>" +
        "<embed type='application/x-shockwave-flash' FlashVars='" +
        flashVars +
        "' allowScriptAccess='always' wmode='transparent' src='" +
        url +
        "' height='1' width='1'></embed>" +
        "</object>";
    }
    
    return (pub = {
        outgoing: function(message, domain, fn){
            swf.postMessage(config.channel, message.toString());
            if (fn) {
                fn();
            }
        },
        destroy: function(){
            try {
                swf.destroyChannel(config.channel);
            } 
            catch (e) {
            }
            swf = null;
            if (frame) {
                frame.parentNode.removeChild(frame);
                frame = null;
            }
        },
        onDOMReady: function(){
            
            targetOrigin = config.remote;
            
            // Prepare the code that will be run after the swf has been intialized
            easyXDM.Fn.set("flash_" + config.channel + "_init", function(){
                setTimeout(function(){
                    pub.up.callback(true);
                });
            });
            
            // set up the omMessage handler
            easyXDM.Fn.set("flash_" + config.channel + "_onMessage", onMessage);
            
            config.swf = resolveUrl(config.swf); // reports have been made of requests gone rogue when using relative paths
            var swfdomain = getDomainName(config.swf);
            var fn = function(){
                // set init to true in case the fn was called was invoked from a separate instance
                easyXDM.stack.FlashTransport[swfdomain].init = true;
                swf = easyXDM.stack.FlashTransport[swfdomain].swf;
                // create the channel
                swf.createChannel(config.channel, config.secret, getLocation(config.remote), config.isHost);
                
                if (config.isHost) {
                    // if Flash is going to be throttled and we want to avoid this
                    if (HAS_FLASH_THROTTLED_BUG && config.swfNoThrottle) {
                        apply(config.props, {
                            position: "fixed",
                            right: 0,
                            top: 0,
                            height: "20px",
                            width: "20px"
                        });
                    }
                    // set up the iframe
                    apply(config.props, {
                        src: appendQueryParameters(config.remote, {
                            xdm_e: getLocation(location.href),
                            xdm_c: config.channel,
                            xdm_p: 6, // 6 = FlashTransport
                            xdm_s: config.secret
                        }),
                        name: IFRAME_PREFIX + config.channel + "_provider"
                    });
                    frame = createFrame(config);
                }
            };
            
            if (easyXDM.stack.FlashTransport[swfdomain] && easyXDM.stack.FlashTransport[swfdomain].init) {
                // if the swf is in place and we are the consumer
                fn();
            }
            else {
                // if the swf does not yet exist
                if (!easyXDM.stack.FlashTransport[swfdomain]) {
                    // add the queue to hold the init fn's
                    easyXDM.stack.FlashTransport[swfdomain] = {
                        queue: [fn]
                    };
                    addSwf(swfdomain);
                }
                else {
                    easyXDM.stack.FlashTransport[swfdomain].queue.push(fn);
                }
            }
        },
        init: function(){
            whenReady(pub.onDOMReady, pub);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, getLocation, appendQueryParameters, createFrame, debug, un, on, apply, whenReady, IFRAME_PREFIX*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.PostMessageTransport
 * PostMessageTransport is a transport class that uses HTML5 postMessage for communication.<br/>
 * <a href="http://msdn.microsoft.com/en-us/library/ms644944(VS.85).aspx">http://msdn.microsoft.com/en-us/library/ms644944(VS.85).aspx</a><br/>
 * <a href="https://developer.mozilla.org/en/DOM/window.postMessage">https://developer.mozilla.org/en/DOM/window.postMessage</a>
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The transports configuration.
 * @cfg {String} remote The remote domain to communicate with.
 */
easyXDM.stack.PostMessageTransport = function(config){
    var pub, // the public interface
 frame, // the remote frame, if any
 callerWindow, // the window that we will call with
 targetOrigin; // the domain to communicate with
    /**
     * Resolves the origin from the event object
     * @private
     * @param {Object} event The messageevent
     * @return {String} The scheme, host and port of the origin
     */
    function _getOrigin(event){
        if (event.origin) {
            // This is the HTML5 property
            return getLocation(event.origin);
        }
        if (event.uri) {
            // From earlier implementations 
            return getLocation(event.uri);
        }
        if (event.domain) {
            // This is the last option and will fail if the 
            // origin is not using the same schema as we are
            return location.protocol + "//" + event.domain;
        }
        throw "Unable to retrieve the origin of the event";
    }
    
    /**
     * This is the main implementation for the onMessage event.<br/>
     * It checks the validity of the origin and passes the message on if appropriate.
     * @private
     * @param {Object} event The messageevent
     */
    function _window_onMessage(event){
        var origin = _getOrigin(event);
        if (origin == targetOrigin && event.data.substring(0, config.channel.length + 1) == config.channel + " ") {
            pub.up.incoming(event.data.substring(config.channel.length + 1), origin);
        }
    }
    
    return (pub = {
        outgoing: function(message, domain, fn){
            callerWindow.postMessage(config.channel + " " + message, domain || targetOrigin);
            if (fn) {
                fn();
            }
        },
        destroy: function(){
            un(window, "message", _window_onMessage);
            if (frame) {
                callerWindow = null;
                frame.parentNode.removeChild(frame);
                frame = null;
            }
        },
        onDOMReady: function(){
            targetOrigin = getLocation(config.remote);
            if (config.isHost) {
                // add the event handler for listening
                var waitForReady = function(event){  
                    if (event.data == config.channel + "-ready") {
                        // replace the eventlistener
                        callerWindow = ("postMessage" in frame.contentWindow) ? frame.contentWindow : frame.contentWindow.document;
                        un(window, "message", waitForReady);
                        on(window, "message", _window_onMessage);
                        setTimeout(function(){
                            pub.up.callback(true);
                        }, 0);
                    }
                };
                on(window, "message", waitForReady);
                
                // set up the iframe
                apply(config.props, {
                    src: appendQueryParameters(config.remote, {
                        xdm_e: getLocation(location.href),
                        xdm_c: config.channel,
                        xdm_p: 1 // 1 = PostMessage
                    }),
                    name: IFRAME_PREFIX + config.channel + "_provider"
                });
                frame = createFrame(config);
            }
            else {
                // add the event handler for listening
                on(window, "message", _window_onMessage);
                callerWindow = ("postMessage" in window.parent) ? window.parent : window.parent.document;
                callerWindow.postMessage(config.channel + "-ready", targetOrigin);
                
                setTimeout(function(){
                    pub.up.callback(true);
                }, 0);
            }
        },
        init: function(){
            whenReady(pub.onDOMReady, pub);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, getLocation, appendQueryParameters, createFrame, debug, apply, query, whenReady, IFRAME_PREFIX*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.FrameElementTransport
 * FrameElementTransport is a transport class that can be used with Gecko-browser as these allow passing variables using the frameElement property.<br/>
 * Security is maintained as Gecho uses Lexical Authorization to determine under which scope a function is running.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The transports configuration.
 * @cfg {String} remote The remote document to communicate with.
 */
easyXDM.stack.FrameElementTransport = function(config){
    var pub, frame, send, targetOrigin;
    
    return (pub = {
        outgoing: function(message, domain, fn){
            send.call(this, message);
            if (fn) {
                fn();
            }
        },
        destroy: function(){
            if (frame) {
                frame.parentNode.removeChild(frame);
                frame = null;
            }
        },
        onDOMReady: function(){
            targetOrigin = getLocation(config.remote);
            
            if (config.isHost) {
                // set up the iframe
                apply(config.props, {
                    src: appendQueryParameters(config.remote, {
                        xdm_e: getLocation(location.href),
                        xdm_c: config.channel,
                        xdm_p: 5 // 5 = FrameElementTransport
                    }),
                    name: IFRAME_PREFIX + config.channel + "_provider"
                });
                frame = createFrame(config);
                frame.fn = function(sendFn){
                    delete frame.fn;
                    send = sendFn;
                    setTimeout(function(){
                        pub.up.callback(true);
                    }, 0);
                    // remove the function so that it cannot be used to overwrite the send function later on
                    return function(msg){
                        pub.up.incoming(msg, targetOrigin);
                    };
                };
            }
            else {
                // This is to mitigate origin-spoofing
                if (document.referrer && getLocation(document.referrer) != query.xdm_e) {
                    window.top.location = query.xdm_e;
                }
                send = window.frameElement.fn(function(msg){
                    pub.up.incoming(msg, targetOrigin);
                });
                pub.up.callback(true);
            }
        },
        init: function(){
            whenReady(pub.onDOMReady, pub);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, undef, getLocation, appendQueryParameters, resolveUrl, createFrame, debug, un, apply, whenReady, IFRAME_PREFIX*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.NameTransport
 * NameTransport uses the window.name property to relay data.
 * The <code>local</code> parameter needs to be set on both the consumer and provider,<br/>
 * and the <code>remoteHelper</code> parameter needs to be set on the consumer.
 * @constructor
 * @param {Object} config The transports configuration.
 * @cfg {String} remoteHelper The url to the remote instance of hash.html - this is only needed for the host.
 * @namespace easyXDM.stack
 */
easyXDM.stack.NameTransport = function(config){
    
    var pub; // the public interface
    var isHost, callerWindow, remoteWindow, readyCount, callback, remoteOrigin, remoteUrl;
    
    function _sendMessage(message){
        var url = config.remoteHelper + (isHost ? "#_3" : "#_2") + config.channel;
        callerWindow.contentWindow.sendMessage(message, url);
    }
    
    function _onReady(){
        if (isHost) {
            if (++readyCount === 2 || !isHost) {
                pub.up.callback(true);
            }
        }
        else {
            _sendMessage("ready");
            pub.up.callback(true);
        }
    }
    
    function _onMessage(message){
        pub.up.incoming(message, remoteOrigin);
    }
    
    function _onLoad(){
        if (callback) {
            setTimeout(function(){
                callback(true);
            }, 0);
        }
    }
    
    return (pub = {
        outgoing: function(message, domain, fn){
            callback = fn;
            _sendMessage(message);
        },
        destroy: function(){
            callerWindow.parentNode.removeChild(callerWindow);
            callerWindow = null;
            if (isHost) {
                remoteWindow.parentNode.removeChild(remoteWindow);
                remoteWindow = null;
            }
        },
        onDOMReady: function(){
            isHost = config.isHost;
            readyCount = 0;
            remoteOrigin = getLocation(config.remote);
            config.local = resolveUrl(config.local);
            
            if (isHost) {
                // Register the callback
                easyXDM.Fn.set(config.channel, function(message){
                    if (isHost && message === "ready") {
                        // Replace the handler
                        easyXDM.Fn.set(config.channel, _onMessage);
                        _onReady();
                    }
                });
                
                // Set up the frame that points to the remote instance
                remoteUrl = appendQueryParameters(config.remote, {
                    xdm_e: config.local,
                    xdm_c: config.channel,
                    xdm_p: 2
                });
                apply(config.props, {
                    src: remoteUrl + '#' + config.channel,
                    name: IFRAME_PREFIX + config.channel + "_provider"
                });
                remoteWindow = createFrame(config);
            }
            else {
                config.remoteHelper = config.remote;
                easyXDM.Fn.set(config.channel, _onMessage);
            }
            
            // Set up the iframe that will be used for the transport
            var onLoad = function(){
                // Remove the handler
                var w = callerWindow || this;
                un(w, "load", onLoad);
                easyXDM.Fn.set(config.channel + "_load", _onLoad);
                (function test(){
                    if (typeof w.contentWindow.sendMessage == "function") {
                        _onReady();
                    }
                    else {
                        setTimeout(test, 50);
                    }
                }());
            };
            
            callerWindow = createFrame({
                props: {
                    src: config.local + "#_4" + config.channel
                },
                onLoad: onLoad
            });
        },
        init: function(){
            whenReady(pub.onDOMReady, pub);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, getLocation, createFrame, debug, un, on, apply, whenReady, IFRAME_PREFIX*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.HashTransport
 * HashTransport is a transport class that uses the IFrame URL Technique for communication.<br/>
 * <a href="http://msdn.microsoft.com/en-us/library/bb735305.aspx">http://msdn.microsoft.com/en-us/library/bb735305.aspx</a><br/>
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The transports configuration.
 * @cfg {String/Window} local The url to the local file used for proxying messages, or the local window.
 * @cfg {Number} delay The number of milliseconds easyXDM should try to get a reference to the local window.
 * @cfg {Number} interval The interval used when polling for messages.
 */
easyXDM.stack.HashTransport = function(config){
    var pub;
    var me = this, isHost, _timer, pollInterval, _lastMsg, _msgNr, _listenerWindow, _callerWindow;
    var useParent, _remoteOrigin;
    
    function _sendMessage(message){
        if (!_callerWindow) {
            return;
        }
        var url = config.remote + "#" + (_msgNr++) + "_" + message;
        ((isHost || !useParent) ? _callerWindow.contentWindow : _callerWindow).location = url;
    }
    
    function _handleHash(hash){
        _lastMsg = hash;
        pub.up.incoming(_lastMsg.substring(_lastMsg.indexOf("_") + 1), _remoteOrigin);
    }
    
    /**
     * Checks location.hash for a new message and relays this to the receiver.
     * @private
     */
    function _pollHash(){
        if (!_listenerWindow) {
            return;
        }
        var href = _listenerWindow.location.href, hash = "", indexOf = href.indexOf("#");
        if (indexOf != -1) {
            hash = href.substring(indexOf);
        }
        if (hash && hash != _lastMsg) {
            _handleHash(hash);
        }
    }
    
    function _attachListeners(){
        _timer = setInterval(_pollHash, pollInterval);
    }
    
    return (pub = {
        outgoing: function(message, domain){
            _sendMessage(message);
        },
        destroy: function(){
            window.clearInterval(_timer);
            if (isHost || !useParent) {
                _callerWindow.parentNode.removeChild(_callerWindow);
            }
            _callerWindow = null;
        },
        onDOMReady: function(){
            isHost = config.isHost;
            pollInterval = config.interval;
            _lastMsg = "#" + config.channel;
            _msgNr = 0;
            useParent = config.useParent;
            _remoteOrigin = getLocation(config.remote);
            if (isHost) {
                apply(config.props, {
                    src: config.remote,
                    name: IFRAME_PREFIX + config.channel + "_provider"
                });
                if (useParent) {
                    config.onLoad = function(){
                        _listenerWindow = window;
                        _attachListeners();
                        pub.up.callback(true);
                    };
                }
                else {
                    var tries = 0, max = config.delay / 50;
                    (function getRef(){
                        if (++tries > max) {
                            throw new Error("Unable to reference listenerwindow");
                        }
                        try {
                            _listenerWindow = _callerWindow.contentWindow.frames[IFRAME_PREFIX + config.channel + "_consumer"];
                        } 
                        catch (ex) {
                        }
                        if (_listenerWindow) {
                            _attachListeners();
                            pub.up.callback(true);
                        }
                        else {
                            setTimeout(getRef, 50);
                        }
                    }());
                }
                _callerWindow = createFrame(config);
            }
            else {
                _listenerWindow = window;
                _attachListeners();
                if (useParent) {
                    _callerWindow = parent;
                    pub.up.callback(true);
                }
                else {
                    apply(config, {
                        props: {
                            src: config.remote + "#" + config.channel + new Date(),
                            name: IFRAME_PREFIX + config.channel + "_consumer"
                        },
                        onLoad: function(){
                            pub.up.callback(true);
                        }
                    });
                    _callerWindow = createFrame(config);
                }
            }
        },
        init: function(){
            whenReady(pub.onDOMReady, pub);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, debug */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.ReliableBehavior
 * This is a behavior that tries to make the underlying transport reliable by using acknowledgements.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The behaviors configuration.
 */
easyXDM.stack.ReliableBehavior = function(config){
    var pub, // the public interface
 callback; // the callback to execute when we have a confirmed success/failure
    var idOut = 0, idIn = 0, currentMessage = "";
    
    return (pub = {
        incoming: function(message, origin){
            var indexOf = message.indexOf("_"), ack = message.substring(0, indexOf).split(",");
            message = message.substring(indexOf + 1);
            
            if (ack[0] == idOut) {
                currentMessage = "";
                if (callback) {
                    callback(true);
                }
            }
            if (message.length > 0) {
                pub.down.outgoing(ack[1] + "," + idOut + "_" + currentMessage, origin);
                if (idIn != ack[1]) {
                    idIn = ack[1];
                    pub.up.incoming(message, origin);
                }
            }
            
        },
        outgoing: function(message, origin, fn){
            currentMessage = message;
            callback = fn;
            pub.down.outgoing(idIn + "," + (++idOut) + "_" + message, origin);
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, debug, undef, removeFromStack*/
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.QueueBehavior
 * This is a behavior that enables queueing of messages. <br/>
 * It will buffer incoming messages and dispach these as fast as the underlying transport allows.
 * This will also fragment/defragment messages so that the outgoing message is never bigger than the
 * set length.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The behaviors configuration. Optional.
 * @cfg {Number} maxLength The maximum length of each outgoing message. Set this to enable fragmentation.
 */
easyXDM.stack.QueueBehavior = function(config){
    var pub, queue = [], waiting = true, incoming = "", destroying, maxLength = 0, lazy = false, doFragment = false;
    
    function dispatch(){
        if (config.remove && queue.length === 0) {
            removeFromStack(pub);
            return;
        }
        if (waiting || queue.length === 0 || destroying) {
            return;
        }
        waiting = true;
        var message = queue.shift();
        
        pub.down.outgoing(message.data, message.origin, function(success){
            waiting = false;
            if (message.callback) {
                setTimeout(function(){
                    message.callback(success);
                }, 0);
            }
            dispatch();
        });
    }
    return (pub = {
        init: function(){
            if (undef(config)) {
                config = {};
            }
            if (config.maxLength) {
                maxLength = config.maxLength;
                doFragment = true;
            }
            if (config.lazy) {
                lazy = true;
            }
            else {
                pub.down.init();
            }
        },
        callback: function(success){
            waiting = false;
            var up = pub.up; // in case dispatch calls removeFromStack
            dispatch();
            up.callback(success);
        },
        incoming: function(message, origin){
            if (doFragment) {
                var indexOf = message.indexOf("_"), seq = parseInt(message.substring(0, indexOf), 10);
                incoming += message.substring(indexOf + 1);
                if (seq === 0) {
                    if (config.encode) {
                        incoming = decodeURIComponent(incoming);
                    }
                    pub.up.incoming(incoming, origin);
                    incoming = "";
                }
            }
            else {
                pub.up.incoming(message, origin);
            }
        },
        outgoing: function(message, origin, fn){
            if (config.encode) {
                message = encodeURIComponent(message);
            }
            var fragments = [], fragment;
            if (doFragment) {
                // fragment into chunks
                while (message.length !== 0) {
                    fragment = message.substring(0, maxLength);
                    message = message.substring(fragment.length);
                    fragments.push(fragment);
                }
                // enqueue the chunks
                while ((fragment = fragments.shift())) {
                    queue.push({
                        data: fragments.length + "_" + fragment,
                        origin: origin,
                        callback: fragments.length === 0 ? fn : null
                    });
                }
            }
            else {
                queue.push({
                    data: message,
                    origin: origin,
                    callback: fn
                });
            }
            if (lazy) {
                pub.down.init();
            }
            else {
                dispatch();
            }
        },
        destroy: function(){
            destroying = true;
            pub.down.destroy();
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, undef, debug */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.VerifyBehavior
 * This behavior will verify that communication with the remote end is possible, and will also sign all outgoing,
 * and verify all incoming messages. This removes the risk of someone hijacking the iframe to send malicious messages.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} config The behaviors configuration.
 * @cfg {Boolean} initiate If the verification should be initiated from this end.
 */
easyXDM.stack.VerifyBehavior = function(config){
    var pub, mySecret, theirSecret, verified = false;
    
    function startVerification(){
        mySecret = Math.random().toString(16).substring(2);
        pub.down.outgoing(mySecret);
    }
    
    return (pub = {
        incoming: function(message, origin){
            var indexOf = message.indexOf("_");
            if (indexOf === -1) {
                if (message === mySecret) {
                    pub.up.callback(true);
                }
                else if (!theirSecret) {
                    theirSecret = message;
                    if (!config.initiate) {
                        startVerification();
                    }
                    pub.down.outgoing(message);
                }
            }
            else {
                if (message.substring(0, indexOf) === theirSecret) {
                    pub.up.incoming(message.substring(indexOf + 1), origin);
                }
            }
        },
        outgoing: function(message, origin, fn){
            pub.down.outgoing(mySecret + "_" + message, origin, fn);
        },
        callback: function(success){
            if (config.initiate) {
                startVerification();
            }
        }
    });
};
/*jslint evil: true, browser: true, immed: true, passfail: true, undef: true, newcap: true*/
/*global easyXDM, window, escape, unescape, undef, getJSON, debug, emptyFn, isArray */
//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

/**
 * @class easyXDM.stack.RpcBehavior
 * This uses JSON-RPC 2.0 to expose local methods and to invoke remote methods and have responses returned over the the string based transport stack.<br/>
 * Exposed methods can return values synchronous, asyncronous, or bet set up to not return anything.
 * @namespace easyXDM.stack
 * @constructor
 * @param {Object} proxy The object to apply the methods to.
 * @param {Object} config The definition of the local and remote interface to implement.
 * @cfg {Object} local The local interface to expose.
 * @cfg {Object} remote The remote methods to expose through the proxy.
 * @cfg {Object} serializer The serializer to use for serializing and deserializing the JSON. Should be compatible with the HTML5 JSON object. Optional, will default to JSON.
 */
easyXDM.stack.RpcBehavior = function(proxy, config){
    var pub, serializer = config.serializer || getJSON();
    var _callbackCounter = 0, _callbacks = {};
    
    /**
     * Serializes and sends the message
     * @private
     * @param {Object} data The JSON-RPC message to be sent. The jsonrpc property will be added.
     */
    function _send(data){
        data.jsonrpc = "2.0";
        pub.down.outgoing(serializer.stringify(data));
    }
    
    /**
     * Creates a method that implements the given definition
     * @private
     * @param {Object} The method configuration
     * @param {String} method The name of the method
     * @return {Function} A stub capable of proxying the requested method call
     */
    function _createMethod(definition, method){
        var slice = Array.prototype.slice;
        
        return function(){
            var l = arguments.length, callback, message = {
                method: method
            };
            
            if (l > 0 && typeof arguments[l - 1] === "function") {
                //with callback, procedure
                if (l > 1 && typeof arguments[l - 2] === "function") {
                    // two callbacks, success and error
                    callback = {
                        success: arguments[l - 2],
                        error: arguments[l - 1]
                    };
                    message.params = slice.call(arguments, 0, l - 2);
                }
                else {
                    // single callback, success
                    callback = {
                        success: arguments[l - 1]
                    };
                    message.params = slice.call(arguments, 0, l - 1);
                }
                _callbacks["" + (++_callbackCounter)] = callback;
                message.id = _callbackCounter;
            }
            else {
                // no callbacks, a notification
                message.params = slice.call(arguments, 0);
            }
            if (definition.namedParams && message.params.length === 1) {
                message.params = message.params[0];
            }
            // Send the method request
            _send(message);
        };
    }
    
    /**
     * Executes the exposed method
     * @private
     * @param {String} method The name of the method
     * @param {Number} id The callback id to use
     * @param {Function} method The exposed implementation
     * @param {Array} params The parameters supplied by the remote end
     */
    function _executeMethod(method, id, fn, params){
        if (!fn) {
            if (id) {
                _send({
                    id: id,
                    error: {
                        code: -32601,
                        message: "Procedure not found."
                    }
                });
            }
            return;
        }
        
        var success, error;
        if (id) {
            success = function(result){
                success = emptyFn;
                _send({
                    id: id,
                    result: result
                });
            };
            error = function(message, data){
                error = emptyFn;
                var msg = {
                    id: id,
                    error: {
                        code: -32099,
                        message: message
                    }
                };
                if (data) {
                    msg.error.data = data;
                }
                _send(msg);
            };
        }
        else {
            success = error = emptyFn;
        }
        // Call local method
        if (!isArray(params)) {
            params = [params];
        }
        try {
            var result = fn.method.apply(fn.scope, params.concat([success, error]));
            if (!undef(result)) {
                success(result);
            }
        } 
        catch (ex1) {
            error(ex1.message);
        }
    }
    
    return (pub = {
        incoming: function(message, origin){
            var data = serializer.parse(message);
            if (data.method) {
                // A method call from the remote end
                if (config.handle) {
                    config.handle(data, _send);
                }
                else {
                    _executeMethod(data.method, data.id, config.local[data.method], data.params);
                }
            }
            else {
                // A method response from the other end
                var callback = _callbacks[data.id];
                if (data.error) {
                    if (callback.error) {
                        callback.error(data.error);
                    }
                }
                else if (callback.success) {
                    callback.success(data.result);
                }
                delete _callbacks[data.id];
            }
        },
        init: function(){
            if (config.remote) {
                // Implement the remote sides exposed methods
                for (var method in config.remote) {
                    if (config.remote.hasOwnProperty(method)) {
                        proxy[method] = _createMethod(config.remote[method], method);
                    }
                }
            }
            pub.down.init();
        },
        destroy: function(){
            for (var method in config.remote) {
                if (config.remote.hasOwnProperty(method) && proxy.hasOwnProperty(method)) {
                    delete proxy[method];
                }
            }
            pub.down.destroy();
        }
    });
};
module.exports = easyXDM;
})(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent);

},{}],71:[function(require,module,exports){
var cookie, str_find;

cookie = require('component-cookie');

str_find = function(a, b) {
  if (a.indexOf(b) === -1) {
    return false;
  }
  return true;
};

module.exports = function(useragent) {
  var browser_major_version, browser_name, browser_passed, os_major_version, os_minor_version, os_name, os_passed, ref, ref1, ref2, ref3;
  if (((ref = useragent.browser) != null ? ref.all : void 0) == null) {
    return false;
  }
  if (((ref1 = useragent.browser) != null ? ref1.major : void 0) == null) {
    return false;
  }
  if (((ref2 = useragent.os) != null ? ref2.name : void 0) == null) {
    return false;
  }
  if (!navigator.cookieEnabled) {
    return false;
  } else {
    cookie('test', 'test_data');
    if (cookie('test') !== 'test_data') {
      return false;
    }
    cookie('test', null);
  }
  os_passed = false;
  os_name = useragent.os.name.toLowerCase();
  os_major_version = useragent.os.version.split('.')[0].toLowerCase();
  os_minor_version = (ref3 = useragent.os.version.split('.')[1]) != null ? ref3.toLowerCase() : void 0;
  if (str_find(os_name, 'ios')) {
    if (Number(os_major_version) > 7) {
      os_passed = true;
    }
  }
  if (str_find(os_name, 'mac')) {
    if (Number(os_minor_version) >= 9) {
      os_passed = true;
    }
  }
  if (str_find(os_name, 'windows')) {
    if (os_major_version !== 'xp' && os_major_version !== 'vista' && os_major_version !== '2000') {
      os_passed = true;
    }
  }
  if (str_find(os_name, 'android')) {
    if (Number(os_major_version) > 4) {
      os_passed = true;
    } else if ((Number(os_major_version) === 4) && (Number(os_minor_version) > 3)) {
      os_passed = true;
    }
  }
  if (!os_passed) {
    return false;
  }
  browser_passed = false;
  browser_name = useragent.browser.all.toLowerCase();
  browser_major_version = +useragent.browser.major;
  if (str_find(browser_name, 'webkit')) {
    browser_passed = true;
  }
  if (str_find(browser_name, 'safari')) {
    if (!str_find(os_name, 'windows') && browser_major_version > 7) {
      browser_passed = true;
    }
  }
  if (str_find(browser_name, 'chrome')) {
    browser_passed = true;
  }
  if (str_find(browser_name, 'firefox')) {
    browser_passed = true;
  }
  if (str_find(browser_name, 'ie')) {
    if (browser_major_version > 10) {
      browser_passed = true;
    }
  }
  if (str_find(browser_name, 'edge')) {
    browser_passed = true;
  }
  if (str_find(browser_name, 'facebook')) {
    browser_passed = true;
  }
  if (str_find(browser_name, 'line')) {
    browser_passed = true;
  }
  if (os_passed && browser_passed) {
    return true;
  }
  return false;
};


},{"component-cookie":5}],72:[function(require,module,exports){
var CommaCookie, _, default_maxage, domainjs, jsonStringify, obj,
  hasProp = {}.hasOwnProperty;

_ = require('lodash-custom');

jsonStringify = require('@plaidev/tracker-helpers/stringify');

domainjs = require('domain.js');

default_maxage = 30 * 60 * 1000 + 30 * 1000;

CommaCookie = (function() {
  function CommaCookie(cookie1, head_key1, maxage1) {
    this.cookie = cookie1;
    this.head_key = head_key1;
    this.maxage = maxage1;
    this._val = false;
  }

  CommaCookie.prototype.default_key = function() {
    return this.head_key;
  };

  CommaCookie.prototype.clear = function() {
    return this.cookie.clear(this.default_key());
  };

  CommaCookie.prototype._get = function() {
    var _vs, ans, txt;
    txt = this.cookie.get(this.default_key());
    if (!txt) {
      this.cookie.clear(this.default_key());
      return {};
    }
    _vs = txt.split(';');
    if (_vs.length === 0) {
      this.cookie.clear(this.default_key());
      return {};
    }
    ans = {};
    _vs.map(function(_v) {
      if (!_v) {
        return;
      }
      _v = _v.split(':');
      if (_v.length === 2) {
        ans[_v[0]] = _v[1];
      }
    });
    return ans;
  };

  CommaCookie.prototype._set = function(v) {
    var _val, ans, key, txt;
    if (!v || (_.keys(v).length === 0)) {
      this.cookie.clear(this.default_key());
      return;
    }
    ans = [];
    for (key in v) {
      if (!hasProp.call(v, key)) continue;
      _val = v[key];
      if (key && (_val != null)) {
        _val = key + ':' + _val;
        ans.push(_val);
      }
    }
    txt = ans.join(';');
    return this.cookie.set(this.default_key(), txt, this.maxage);
  };

  CommaCookie.prototype.get = function(key) {
    var val;
    val = this._get();
    return val[key];
  };

  CommaCookie.prototype.set = function(key, v) {
    var val;
    val = this._get();
    val[key] = v;
    return this._set(val);
  };

  CommaCookie.prototype.remove = function(key) {
    var val;
    val = this._get();
    delete val[key];
    return this._set(val);
  };

  CommaCookie.prototype.update = function() {
    var val;
    val = this._get();
    return this._set(val);
  };

  CommaCookie.prototype.add = function(key, v) {
    var _v, val;
    if (!v) {
      return;
    }
    val = this._get();
    _v = val[key];
    if (!_v) {
      _v = [];
    } else {
      _v = _v.split('|');
    }
    _v.push(v);
    val[key] = _v.join('|');
    return this._set(val);
  };

  CommaCookie.prototype.addToSet = function(key, v) {
    if (this.has(key, v)) {
      return;
    }
    return this.add(key, v);
  };

  CommaCookie.prototype.has = function(key, v) {
    var __v, _v, i, len, val;
    val = this._get();
    _v = val[key];
    if (!_v) {
      return false;
    }
    _v = _v.split('|');
    if (!_v || (_v.length === 0)) {
      return false;
    }
    for (i = 0, len = _v.length; i < len; i++) {
      __v = _v[i];
      if (__v === v) {
        return true;
      }
    }
    return false;
  };

  CommaCookie.prototype.merge = function(val) {
    var key, results, v;
    if (val == null) {
      val = {};
    }
    results = [];
    for (key in val) {
      if (!hasProp.call(val, key)) continue;
      if (!val[key]) {
        continue;
      }
      if (Array.isArray(val[key])) {
        results.push((function() {
          var i, len, ref, results1;
          ref = val[key];
          results1 = [];
          for (i = 0, len = ref.length; i < len; i++) {
            v = ref[i];
            results1.push(this.addToSet(key, v));
          }
          return results1;
        }).call(this));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return CommaCookie;

})();

obj = {};

module.exports = function(cookie, head_key, maxage) {
  if (head_key == null) {
    head_key = 'head';
  }
  if (maxage == null) {
    maxage = default_maxage;
  }
  if (!(head_key in obj)) {
    obj[head_key] = new CommaCookie(cookie, head_key, maxage);
  }
  return obj[head_key];
};


},{"@plaidev/tracker-helpers/stringify":67,"domain.js":7,"lodash-custom":1}],73:[function(require,module,exports){
var COOKIEAGE_LIMIT, Cookie, MAXAGE_TYPES, PERSISTENT_DATA_NAMES, _localStorage, app_name, cookie, cookiePath, domainjs, ref, short_app_name;

cookie = require('component-cookie');

cookiePath = '/';

app_name = '__pck__';

short_app_name = 'krt';

domainjs = require('domain.js');

ref = require('@plaidev/tracker-helpers/config'), PERSISTENT_DATA_NAMES = ref.PERSISTENT_DATA_NAMES, MAXAGE_TYPES = ref.MAXAGE_TYPES;

_localStorage = require('@plaidev/tracker-helpers/_localStorage');

exports.MAXAGE_TYPES = MAXAGE_TYPES;

exports.COOKIEAGE_LIMIT = COOKIEAGE_LIMIT = 7 * 24 * 60 * 60 * 1000;

Cookie = (function() {
  function Cookie(_domain, site_id1, subdomain1, no_dot1, short1) {
    var __domain;
    if (_domain == null) {
      _domain = false;
    }
    this.site_id = site_id1 != null ? site_id1 : '';
    this.subdomain = subdomain1 != null ? subdomain1 : true;
    this.no_dot = no_dot1 != null ? no_dot1 : false;
    this.short = short1 != null ? short1 : false;
    if (_domain) {
      this.domain = _domain;
    } else if (this.subdomain) {
      __domain = domainjs(location.href);
      if (!__domain.match(/^\d{1,3}$/)) {
        this.domain = __domain;
      } else {
        this.domain = false;
      }
    } else {
      this.domain = false;
    }
  }

  Cookie.prototype.clear = function(name) {
    cookie(this.key(name), null, this.options());
    cookie(this.key(name), null);
    return _localStorage.remove(this.key(name));
  };

  Cookie.prototype.key = function(name) {
    var _app_name;
    _app_name = app_name;
    if (this.short) {
      _app_name = short_app_name;
    }
    if (this.no_dot && (!this.site_id)) {
      return _app_name + "." + name;
    }
    return _app_name + "." + name + "." + this.site_id;
  };

  Cookie.prototype.get = function(name) {
    var cVal, lVal;
    cVal = cookie(this.key(name));
    lVal = _localStorage.get(this.key(name));
    if (!cVal && lVal) {
      cookie(this.key(name), lVal);
    }
    if (cVal && !lVal && PERSISTENT_DATA_NAMES.indexOf(name) >= 0) {
      _localStorage.set(this.key(name), cVal);
    }
    return cVal != null ? cVal : lVal;
  };

  Cookie.prototype.options = function(maxage) {
    var options;
    options = {
      'path': cookiePath
    };
    if (maxage) {
      options['max-age'] = maxage;
    }
    if (this.domain && (this.domain !== 'localhost')) {
      options.domain = this.domain;
    }
    return options;
  };

  Cookie.prototype.set = function(name, val, maxage) {
    var options;
    if (maxage == null) {
      maxage = MAXAGE_TYPES.LONG;
    }
    options = this.options(maxage);
    cookie(this.key(name), val, options);
    if (cookie(this.key(name)) && PERSISTENT_DATA_NAMES.indexOf(name) >= 0) {
      return _localStorage.set(this.key(name), val);
    }
  };

  Cookie.prototype.update = function(name, maxage) {
    var options;
    options = this.options(maxage);
    if (cookie(this.key(name)) != null) {
      cookie(this.key(name), cookie(this.key(name)), options);
    }
    if (maxage <= COOKIEAGE_LIMIT) {
      return _localStorage.remove(this.key(name));
    }
  };

  return Cookie;

})();

exports.create = function(domain, site_id, subdomain, no_dot, short) {
  if (domain == null) {
    domain = false;
  }
  if (no_dot == null) {
    no_dot = false;
  }
  if (short == null) {
    short = false;
  }
  return new Cookie(domain, site_id, subdomain, no_dot, short);
};


},{"@plaidev/tracker-helpers/_localStorage":58,"@plaidev/tracker-helpers/config":59,"component-cookie":5,"domain.js":7}],74:[function(require,module,exports){
var JSONCookie, _, default_key, default_maxage, domainjs, jsonStringify, obj,
  hasProp = {}.hasOwnProperty;

_ = require('lodash-custom');

jsonStringify = require('@plaidev/tracker-helpers/stringify');

domainjs = require('domain.js');

default_key = 'jsck';

default_maxage = 30 * 60 * 1000 + 30 * 1000;

JSONCookie = (function() {
  function JSONCookie(cookie1, head_key1, maxage1) {
    this.cookie = cookie1;
    this.head_key = head_key1;
    this.maxage = maxage1;
    this._val = false;
  }

  JSONCookie.prototype.default_key = function() {
    return default_key + '.' + this.head_key;
  };

  JSONCookie.prototype.clear = function() {
    return this.cookie.clear(this.default_key());
  };

  JSONCookie.prototype._get = function() {
    var err, txt;
    if (this._val) {
      return this._val;
    }
    txt = this.cookie.get(this.default_key());
    if (txt == null) {
      this._val = {};
    } else {
      try {
        this._val = JSON.parse(txt) || {};
      } catch (error) {
        err = error;
        console.log('krt: json parse error', txt);
        this._val = {};
      }
    }
    if (!this._val || (_.keys(this._val).length === 0)) {
      this.cookie.clear(this.default_key());
      return {};
    }
    return this._val;
  };

  JSONCookie.prototype._set = function(v) {
    var txt;
    if (!v || (_.keys(v).length === 0)) {
      this.cookie.clear(this.default_key());
      return;
    }
    txt = jsonStringify(v);
    return this.cookie.set(this.default_key(), txt, this.maxage);
  };

  JSONCookie.prototype.get = function(key) {
    var val;
    val = this._get();
    return val[key];
  };

  JSONCookie.prototype.set = function(key, v) {
    var val;
    val = this._get();
    val[key] = v;
    return this._set(val);
  };

  JSONCookie.prototype.remove = function(key) {
    var val;
    val = this._get();
    delete val[key];
    return this._set(val);
  };

  JSONCookie.prototype.update = function() {
    var val;
    val = this._get();
    return this._set(val);
  };

  JSONCookie.prototype.add = function(key, v) {
    var val;
    val = this._get();
    if (val[key] == null) {
      val[key] = [];
    }
    val[key].push(v);
    return this._set(val);
  };

  JSONCookie.prototype.addToSet = function(key, v) {
    if (this.has(key, v)) {
      return;
    }
    return this.add(key, v);
  };

  JSONCookie.prototype.has = function(key, v) {
    var idx, val;
    val = this._get();
    if (val[key] == null) {
      val[key] = [];
    }
    idx = _.indexOf(val[key], v);
    if (idx > -1) {
      return true;
    }
    return false;
  };

  JSONCookie.prototype.merge = function(val) {
    var key, results, v;
    if (val == null) {
      val = {};
    }
    results = [];
    for (key in val) {
      if (!hasProp.call(val, key)) continue;
      results.push((function() {
        var i, len, ref, results1;
        ref = val[key];
        results1 = [];
        for (i = 0, len = ref.length; i < len; i++) {
          v = ref[i];
          results1.push(this.addToSet(key, v));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  return JSONCookie;

})();

obj = {};

module.exports = function(cookie, head_key, maxage) {
  if (head_key == null) {
    head_key = 'head';
  }
  if (maxage == null) {
    maxage = default_maxage;
  }
  if (!(head_key in obj)) {
    obj[head_key] = new JSONCookie(cookie, head_key, maxage);
  }
  return obj[head_key];
};


},{"@plaidev/tracker-helpers/stringify":67,"domain.js":7,"lodash-custom":1}],75:[function(require,module,exports){
var __log, url;

url = require('url');

__log = require('@plaidev/tracker-helpers/__log');

module.exports = function(user_id, visitor_id, admin_url) {
  var _api_key, _id, api_key, err, i, len, options, parsedURI, project_id, redirect_url, ref, ref1, ref2, ref3, ref4, referrer, tracker_name;
  if (!(user_id || visitor_id)) {
    return;
  }
  referrer = window.document.referrer;
  if (!referrer) {
    return;
  }
  try {
    parsedURI = url.parse(referrer, true);
  } catch (error) {
    err = error;
    if (!window._karte_logs) {
      window._karte_logs = [];
    }
    window._karte_logs.push(err);
    return;
  }
  if (admin_url !== (parsedURI != null ? parsedURI.protocol : void 0) + '//' + (parsedURI != null ? parsedURI.host : void 0)) {
    return;
  }
  if ((referrer != null) && ((parsedURI != null ? (ref = parsedURI.query) != null ? ref.__karte_opts : void 0 : void 0) != null)) {
    try {
      options = JSON.parse(parsedURI != null ? (ref1 = parsedURI.query) != null ? ref1.__karte_opts : void 0 : void 0);
    } catch (error) {
      err = error;
      console.log(err);
      return;
    }
    api_key = options.api_key, project_id = options.project_id, redirect_url = options.redirect_url;
    if (!redirect_url) {
      return;
    }
    _api_key = '';
    if (window.karte_tracker_names != null) {
      ref2 = window.karte_tracker_names;
      for (i = 0, len = ref2.length; i < len; i++) {
        tracker_name = ref2[i];
        if (((ref3 = window[tracker_name]) != null ? ref3.api_key : void 0) === api_key) {
          _api_key = api_key;
        }
      }
    } else {
      _api_key = (ref4 = window.tracker) != null ? ref4.api_key : void 0;
    }
    if (_api_key === api_key) {
      if (user_id) {
        _id = user_id;
      } else {
        _id = 'vis-' + visitor_id;
      }
      window.location.href = admin_url + '/p/' + project_id + '/user/' + _id;
    }
    return;
  }
};


},{"@plaidev/tracker-helpers/__log":57,"url":21}],76:[function(require,module,exports){
var easyXDM;

easyXDM = require('../external/easyXDM');

exports.get = function(origin, target_url, cb) {
  var socket;
  return socket = new easyXDM.Socket({
    remote: target_url,
    onMessage: function(message, _origin) {
      var data;
      if (_origin !== origin) {
        return;
      }
      data = JSON.parse(message);
      if (data.name === 'karte_ktid') {
        return cb(null, data.options);
      }
    }
  });
};


},{"../external/easyXDM":70}],77:[function(require,module,exports){
var easyXDM;

easyXDM = require('../external/easyXDM');

exports.consumer = function(origin, target_origin, target_url, cb) {
  var cl, socket;
  socket = new easyXDM.Socket({
    remote: target_url,
    onMessage: function(message, _origin) {
      var data;
      if (_origin !== origin) {
        return;
      }
      data = JSON.parse(message);
      if (data.name === 'karte_third') {
        return cb(null, data.options);
      }
    }
  });
  cl = function(name, options) {
    if (name == null) {
      name = 'merge';
    }
    return socket.postMessage(JSON.stringify({
      name: name,
      options: options
    }));
  };
  return cl;
};

exports.primary = function(origin, options, cb) {
  var data, socket;
  socket = new easyXDM.Socket({
    onMessage: function(message, _origin) {
      var data;
      if (_origin !== origin) {
        return;
      }
      data = JSON.parse(message);
      if (cb) {
        return cb(data.name, data.options);
      }
    }
  });
  data = JSON.stringify({
    name: 'karte_third',
    options: options
  });
  return socket.postMessage(data);
};


},{"../external/easyXDM":70}],78:[function(require,module,exports){
var MAXAGE_TYPES, SESSION_KEY_NAME, USER_KEY_NAME, VISITOR_KEY_NAME, VISITOR_MAXAGE, Visitor, uuid;

uuid = require("uuid/v4");

VISITOR_KEY_NAME = "vis";

USER_KEY_NAME = "usr";

SESSION_KEY_NAME = "ses";

MAXAGE_TYPES = require('@plaidev/tracker-helpers/config').MAXAGE_TYPES;

VISITOR_MAXAGE = MAXAGE_TYPES.LONG;

Visitor = (function() {
  function Visitor(cookie, old_cookie) {
    this.cookie = cookie;
    this.old_cookie = old_cookie;
    this.visitor_id = false;
  }

  Visitor.prototype.init = function() {
    var old_val, tmp, val;
    if (!this.visitor_id) {
      val = this.cookie.get(VISITOR_KEY_NAME);
      if (!val) {
        old_val = this.old_cookie.get(VISITOR_KEY_NAME);
        if (old_val) {
          old_val = old_val.split('.');
          this.visitor_id = old_val[0];
        } else {
          this.visitor_id = this._create_visitor_id();
        }
      } else {
        tmp = val.split('.');
        this.visitor_id = this.visitor_id || tmp[0];
      }
    }
    this.cookie.set(VISITOR_KEY_NAME, this.visitor_id, VISITOR_MAXAGE);
    this.old_cookie.clear(VISITOR_KEY_NAME);
    this.old_cookie.clear(USER_KEY_NAME);
    return this.old_cookie.clear(SESSION_KEY_NAME);
  };

  Visitor.prototype.getVisitorId = function() {
    var tmp, val;
    val = this.cookie.get(VISITOR_KEY_NAME);
    if (!val) {
      return false;
    }
    tmp = val.split('.');
    return tmp[0];
  };

  Visitor.prototype._create_visitor_id = function() {
    return uuid();
  };

  return Visitor;

})();

module.exports = Visitor;


},{"@plaidev/tracker-helpers/config":59,"uuid/v4":25}]},{},[2])(2)
});
