// * Array Extension
//------------------------------------------------------------------------------
Array.prototype.delete = function () {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
Array.prototype.max = function () {
    return Math.max.apply(null, this);
};
Array.prototype.min = function () {
    return Math.min.apply(null, this);
};
Array.prototype.sample = function () {
    if (this.length === 0) {
        return [];
    }
    return this[SDK.rand(0, this.length - 1)];
};
Array.prototype.first = function () {
    return this[0];
};
Array.prototype.last = function () {
    return this[this.length - 1];
};
Array.prototype.shuffle = function () {
    var k, n, v;
    n = this.length;
    while (n > 1) {
        n--;
        k = SDK.rand(0, n + 1);
        v = this[k];
        this[k] = this[n];
        this[n] = v;
    }
};
Array.prototype.count = function () {
    return this.length;
};
Array.prototype.isEmpty = function () {
    return this.length === 0;
};

/**
 * Checks whether the array contains a given element.
 *
 * @memberof JsExtensions
 * @param {any} element - The element to search for.
 * @returns {boolean} True if the array contains a given element.
 * @deprecated includes() should be used instead.
 */
Array.prototype.contains = function(element) {
    return this.includes(element);
};

// * Number Extension
//------------------------------------------------------------------------------
Number.prototype.do = function (method) {
    return SDK.times(this, method);
};

Number.prototype.any = function (number) {
    return (number != null) && number > 0;
};
/**
 * Returns a number whose value is limited to the given range.
 *
 * @memberof JsExtensions
 * @param {number} min - The lower boundary.
 * @param {number} max - The upper boundary.
 * @returns {number} A number in the range (min, max).
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

/**
 * Returns a modulo value which is always positive.
 *
 * @memberof JsExtensions
 * @param {number} n - The divisor.
 * @returns {number} A modulo value.
 */
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

/**
 * Makes a number string with leading zeros.
 *
 * @memberof JsExtensions
 * @param {number} length - The length of the output string.
 * @returns {string} A string with leading zeros.
 */
Number.prototype.padZero = function(length) {
    return String(this).padZero(length);
};

// * String Extension
//------------------------------------------------------------------------------
String.prototype.toCss = function () {
    return KDCore.Color.FromHex(this).CSS;
};
String.prototype.toCSS = function () {
    return this.toCss();
};
String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
};
String.isNullOrEmpty = function (str) {
    return (str == null) || str.isEmpty();
};
String.any = function (str) {
    return !String.isNullOrEmpty(str);
};
/**
 * Replaces %1, %2 and so on in the string to the arguments.
 *
 * @memberof JsExtensions
 * @param {any} ...args The objects to format.
 * @returns {string} A formatted string.
 */
String.prototype.format = function () {
    return this.replace(/%([0-9]+)/g, (s, n) => arguments[Number(n) - 1]);
};

/**
 * Checks whether the string contains a given string.
 *
 * @memberof JsExtensions
 * @param {string} string - The string to search for.
 * @returns {boolean} True if the string contains a given string.
 * @deprecated includes() should be used instead.
 */
String.prototype.contains = function(string) {
    return this.includes(string);
};

// * Вывести себя в console.log
String.prototype.p = function () {
    console.log(this.toString().format(...arguments));
};

// * Math Extension
//------------------------------------------------------------------------------

/**
 * Generates a random integer in the range (0, max-1).
 *
 * @memberof JsExtensions
 * @param {number} max - The upper boundary (excluded).
 * @returns {number} A random integer.
 */
Math.randomInt = function(max) {
    return Math.floor(max * Math.random());
};



