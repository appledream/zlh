"use strict";
require("babel-polyfill");
const $ = require("jquery");
const overlay = require("./overlay.js");
const loadDeferredImages = require("./load_deferred_images.js");
const mainBarHeight = require("./main_bar_height.js");

window.jQuery = $;
window.$ = $;

$(() => {
    overlay();
    mainBarHeight();
});

$(window).on("load", () => {
    loadDeferredImages();
});
