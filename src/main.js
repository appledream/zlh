const $ = require("jquery");
const gallery = require("./gallery.js");

window.jQuery = $;
window.$ = $;

$(() => {
    gallery();
});
