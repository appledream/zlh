const $ = require("jquery");
const overlay = require("./overlay.js");

window.jQuery = $;
window.$ = $;

$(() => {
    overlay();
});
