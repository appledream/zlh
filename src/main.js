"use strict";
require("babel-polyfill");
const $ = require("jquery");
const overlay = require("./overlay.js");
const loadDeferredImages = require("./load_deferred_images.js");

window.jQuery = $;
window.$ = $;

$(() => {
    overlay();
});

$(window).on("load", () => {
    loadDeferredImages();
});
