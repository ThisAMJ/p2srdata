/*!
    FileSaver
    A saveAs() FileSaver implementation.

    By Eli Grey, http://eligrey.com

    License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
    Source  : http://github.com/eligrey/FileSaver.js

    Compressed using https://jscompress.com
*/

!function(e,t){"function"==typeof define&&define.amd?define([],t):"undefined"!=typeof exports?t():(t(),e.FileSaver={})}(this,function(){"use strict";var l="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0;function s(e,t,o){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){a(n.response,t,o)},n.onerror=function(){console.error("could not download file")},n.send()}function i(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&t.status<=299}function r(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){var o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(o)}}var d=/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),a=l.saveAs||("object"!=typeof window||window!==l?function(){}:"download"in HTMLAnchorElement.prototype&&!d?function(e,t,o){var n=l.URL||l.webkitURL,a=document.createElement("a");t=t||e.name||"download",a.download=t,a.rel="noopener","string"==typeof e?(a.href=e,a.origin!==location.origin?i(a.href)?s(e,t,o):r(a,a.target="_blank"):r(a)):(a.href=n.createObjectURL(e),setTimeout(function(){n.revokeObjectURL(a.href)},4e4),setTimeout(function(){r(a)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,o){var n;t=t||e.name||"download","string"==typeof e?i(e)?s(e,t,o):((n=document.createElement("a")).href=e,n.target="_blank",setTimeout(function(){r(n)})):navigator.msSaveOrOpenBlob((e=e,void 0===(o=o)?o={autoBom:!1}:"object"!=typeof o&&(console.warn("Deprecated: Expected third argument to be a object"),o={autoBom:!o}),o.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e),t)}:function(e,t,o,n){if((n=n||open("","_blank"))&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof e)return s(e,t,o);var a,i,r,t="application/octet-stream"===e.type,o=/constructor/i.test(l.HTMLElement)||l.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);(c||t&&o||d)&&"undefined"!=typeof FileReader?((a=new FileReader).onloadend=function(){var e=a.result,e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;");n?n.location.href=e:location=e,n=null},a.readAsDataURL(e)):(i=l.URL||l.webkitURL,r=i.createObjectURL(e),n?n.location=r:location.href=r,n=null,setTimeout(function(){i.revokeObjectURL(r)},4e4))});l.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});