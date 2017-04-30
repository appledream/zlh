const $ = require("jquery");
const galleryLazyLoad = require("./gallery_lazy_load.js");

window.jQuery = $;
window.$ = $;

$(() => {
    galleryLazyLoad("images/image_placeholder.png");
});
