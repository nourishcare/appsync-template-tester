"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/prefer-default-export */
const uuid_1 = require("uuid");
function qr() {
    return '';
}
exports.qr = qr;
function quiet() {
    return '';
}
exports.quiet = quiet;
function escapeJavaScript(code) {
    // Appsync actually has it's own escape functionality which handles some characters differently
    return encodeURI(code);
}
exports.escapeJavaScript = escapeJavaScript;
function urlEncode(url) {
    // Appsync also encodes the / character
    return escape(url).replace('/', '%2F');
}
exports.urlEncode = urlEncode;
function urlDecode(url) {
    // Appsync also decodes the / character
    const urlWithSlash = url.replace('%2F', '/');
    return unescape(urlWithSlash);
}
exports.urlDecode = urlDecode;
function base64Encode(data) {
    return Buffer.from(data).toString('base64');
}
exports.base64Encode = base64Encode;
function base64Decode(buffer) {
    return Buffer.from(buffer, 'base64').toString('ascii');
}
exports.base64Decode = base64Decode;
function parseJson(json) {
    return JSON.parse(json);
}
exports.parseJson = parseJson;
function toJson(obj) {
    return JSON.stringify(obj);
}
exports.toJson = toJson;
function autoId() {
    return uuid_1.v4();
}
exports.autoId = autoId;
function unauthorized() {
    throw Error('Unauthorized');
}
exports.unauthorized = unauthorized;
function error(message) {
    // Whilst this function takes up to 4 inputs, it only throws the first input in the AWS AppSync resolver tester
    if (message) {
        throw Error(message);
    }
}
exports.error = error;
function appendError() {
    // Does nothing as side-effects can't be handled by velocityjs - in practice this would add items to the errors array
}
exports.appendError = appendError;
function validate(bool, message) {
    if (!bool) {
        throw new Error(message);
    }
}
exports.validate = validate;
function isNull(input) {
    // Technically undefined returns null, however the javascript VTL tool then gets confused when this is used in
    // conditionals (the most common use case) so we'll keep the simple approach here.
    return input === null || typeof input === 'undefined';
}
exports.isNull = isNull;
function isNullOrEmpty(input) {
    return !input;
}
exports.isNullOrEmpty = isNullOrEmpty;
function isNullOrBlank(input) {
    if (!input) {
        return true;
    }
    if (typeof input === 'string' && input.match(/^[\n\t\r\s]*$/)) {
        return true;
    }
    return false;
}
exports.isNullOrBlank = isNullOrBlank;
function defaultIfNull(obj, defaultObj) {
    if (obj === null || typeof obj === 'undefined') {
        return defaultObj;
    }
    return obj;
}
exports.defaultIfNull = defaultIfNull;
function defaultIfNullOrEmpty(obj, defaultObj) {
    if (!obj) {
        return defaultObj;
    }
    return obj;
}
exports.defaultIfNullOrEmpty = defaultIfNullOrEmpty;
function defaultIfNullOrBlank(obj, defaultObj) {
    if (!obj) {
        return defaultObj;
    }
    if (typeof obj === 'string' && obj.match(/^[\n\t\r\s]*$/)) {
        return defaultObj;
    }
    return obj;
}
exports.defaultIfNullOrBlank = defaultIfNullOrBlank;
function isString(i) {
    return typeof i === 'string';
}
exports.isString = isString;
function isNumber(i) {
    return typeof i === 'number';
}
exports.isNumber = isNumber;
function isBoolean(i) {
    return typeof i === 'boolean';
}
exports.isBoolean = isBoolean;
function isList(i) {
    return Array.isArray(i);
}
exports.isList = isList;
function isMap(i) {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object for details as to why
    // this works
    return i === Object(i) && !Array.isArray(i) && typeof i === 'object';
}
exports.isMap = isMap;
function typeOf(i) {
    if (isNull(i)) {
        return 'Null';
    }
    if (isNumber(i)) {
        return 'Number';
    }
    if (isString(i)) {
        return 'String';
    }
    if (isMap(i)) {
        return 'Map';
    }
    if (isList(i)) {
        return 'List';
    }
    if (isBoolean(i)) {
        return 'Boolean';
    }
    return 'Object';
}
exports.typeOf = typeOf;
function matches(patternString, str) {
    const pattern = new RegExp(patternString);
    return !!str.match(pattern);
}
exports.matches = matches;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWlEO0FBQ2pELCtCQUEwQjtBQUUxQixTQUFnQixFQUFFO0lBQ2hCLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUZELGdCQUVDO0FBRUQsU0FBZ0IsS0FBSztJQUNuQixPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFGRCxzQkFFQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLElBQVk7SUFDM0MsK0ZBQStGO0lBQy9GLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFIRCw0Q0FHQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxHQUFXO0lBQ25DLHVDQUF1QztJQUN2QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFIRCw4QkFHQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxHQUFXO0lBQ25DLHVDQUF1QztJQUN2QyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QyxPQUFPLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBSkQsOEJBSUM7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBWTtJQUN2QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLFlBQVksQ0FBQyxNQUFjO0lBQ3pDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLFNBQVMs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KiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5pbXBvcnQgeyB2NCB9IGZyb20gJ3V1aWQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcXIoKSB7XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1aWV0KCkge1xuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVKYXZhU2NyaXB0KGNvZGU6IHN0cmluZykge1xuICAvLyBBcHBzeW5jIGFjdHVhbGx5IGhhcyBpdCdzIG93biBlc2NhcGUgZnVuY3Rpb25hbGl0eSB3aGljaCBoYW5kbGVzIHNvbWUgY2hhcmFjdGVycyBkaWZmZXJlbnRseVxuICByZXR1cm4gZW5jb2RlVVJJKGNvZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsRW5jb2RlKHVybDogc3RyaW5nKSB7XG4gIC8vIEFwcHN5bmMgYWxzbyBlbmNvZGVzIHRoZSAvIGNoYXJhY3RlclxuICByZXR1cm4gZXNjYXBlKHVybCkucmVwbGFjZSgnLycsICclMkYnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVybERlY29kZSh1cmw6IHN0cmluZykge1xuICAvLyBBcHBzeW5jIGFsc28gZGVjb2RlcyB0aGUgLyBjaGFyYWN0ZXJcbiAgY29uc3QgdXJsV2l0aFNsYXNoID0gdXJsLnJlcGxhY2UoJyUyRicsICcvJyk7XG4gIHJldHVybiB1bmVzY2FwZSh1cmxXaXRoU2xhc2gpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZTY0RW5jb2RlKGRhdGE6IHN0cmluZykge1xuICByZXR1cm4gQnVmZmVyLmZyb20oZGF0YSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZTY0RGVjb2RlKGJ1ZmZlcjogc3RyaW5nKSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShidWZmZXIsICdiYXNlNjQnKS50b1N0cmluZygnYXNjaWknKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSnNvbihqc29uOiBzdHJpbmcpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoanNvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pzb24ob2JqOiBPYmplY3QpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvSWQoKSB7XG4gIHJldHVybiB2NCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5hdXRob3JpemVkKCkge1xuICB0aHJvdyBFcnJvcignVW5hdXRob3JpemVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvcihtZXNzYWdlPzogc3RyaW5nKSB7XG4gIC8vIFdoaWxzdCB0aGlzIGZ1bmN0aW9uIHRha2VzIHVwIHRvIDQgaW5wdXRzLCBpdCBvbmx5IHRocm93cyB0aGUgZmlyc3QgaW5wdXQgaW4gdGhlIEFXUyBBcHBTeW5jIHJlc29sdmVyIHRlc3RlclxuICBpZiAobWVzc2FnZSkge1xuICAgIHRocm93IEVycm9yKG1lc3NhZ2UpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRFcnJvcigpIHtcbiAgLy8gRG9lcyBub3RoaW5nIGFzIHNpZGUtZWZmZWN0cyBjYW4ndCBiZSBoYW5kbGVkIGJ5IHZlbG9jaXR5anMgLSBpbiBwcmFjdGljZSB0aGlzIHdvdWxkIGFkZCBpdGVtcyB0byB0aGUgZXJyb3JzIGFycmF5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZShib29sOiBCb29sZWFuLCBtZXNzYWdlPzogc3RyaW5nKSB7XG4gIGlmICghYm9vbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsKGlucHV0PzogYW55KSB7XG4gIC8vIFRlY2huaWNhbGx5IHVuZGVmaW5lZCByZXR1cm5zIG51bGwsIGhvd2V2ZXIgdGhlIGphdmFzY3JpcHQgVlRMIHRvb2wgdGhlbiBnZXRzIGNvbmZ1c2VkIHdoZW4gdGhpcyBpcyB1c2VkIGluXG4gIC8vIGNvbmRpdGlvbmFscyAodGhlIG1vc3QgY29tbW9uIHVzZSBjYXNlKSBzbyB3ZSdsbCBrZWVwIHRoZSBzaW1wbGUgYXBwcm9hY2ggaGVyZS5cbiAgcmV0dXJuIGlucHV0ID09PSBudWxsIHx8IHR5cGVvZiBpbnB1dCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGxPckVtcHR5KGlucHV0PzogYW55KSB7XG4gIHJldHVybiAhaW5wdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGxPckJsYW5rKGlucHV0PzogYW55KSB7XG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyAmJiBpbnB1dC5tYXRjaCgvXltcXG5cXHRcXHJcXHNdKiQvKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZk51bGwob2JqOiBhbnksIGRlZmF1bHRPYmo6IGFueSkge1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRPYmo7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRJZk51bGxPckVtcHR5KG9iajogYW55LCBkZWZhdWx0T2JqOiBhbnkpIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gZGVmYXVsdE9iajtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmTnVsbE9yQmxhbmsob2JqOiBhbnksIGRlZmF1bHRPYmo6IGFueSkge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBkZWZhdWx0T2JqO1xuICB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubWF0Y2goL15bXFxuXFx0XFxyXFxzXSokLykpIHtcbiAgICByZXR1cm4gZGVmYXVsdE9iajtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcoaTogYW55KSB7XG4gIHJldHVybiB0eXBlb2YgaSA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihpOiBhbnkpIHtcbiAgcmV0dXJuIHR5cGVvZiBpID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbihpOiBhbnkpIHtcbiAgcmV0dXJuIHR5cGVvZiBpID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpc3QoaTogYW55KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNYXAoaTogYW55KSB7XG4gIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QgZm9yIGRldGFpbHMgYXMgdG8gd2h5XG4gIC8vIHRoaXMgd29ya3NcbiAgcmV0dXJuIGkgPT09IE9iamVjdChpKSAmJiAhQXJyYXkuaXNBcnJheShpKSAmJiB0eXBlb2YgaSA9PT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlT2YoaTogYW55KSB7XG4gIGlmIChpc051bGwoaSkpIHtcbiAgICByZXR1cm4gJ051bGwnO1xuICB9XG4gIGlmIChpc051bWJlcihpKSkge1xuICAgIHJldHVybiAnTnVtYmVyJztcbiAgfVxuICBpZiAoaXNTdHJpbmcoaSkpIHtcbiAgICByZXR1cm4gJ1N0cmluZyc7XG4gIH1cbiAgaWYgKGlzTWFwKGkpKSB7XG4gICAgcmV0dXJuICdNYXAnO1xuICB9XG4gIGlmIChpc0xpc3QoaSkpIHtcbiAgICByZXR1cm4gJ0xpc3QnO1xuICB9XG4gIGlmIChpc0Jvb2xlYW4oaSkpIHtcbiAgICByZXR1cm4gJ0Jvb2xlYW4nO1xuICB9XG4gIHJldHVybiAnT2JqZWN0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXMocGF0dGVyblN0cmluZzogc3RyaW5nLCBzdHI6IHN0cmluZykge1xuICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cChwYXR0ZXJuU3RyaW5nKTtcbiAgcmV0dXJuICEhc3RyLm1hdGNoKHBhdHRlcm4pO1xufVxuIl19