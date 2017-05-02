"use strict";
const $ = require("jquery");

module.exports = function init() {
    $(".gallery-item").each((i, galleryItem) => {
        const $galleryItem = $(galleryItem);
        $galleryItem.css("display", "hidden");
        const $galleryImage = $galleryItem.find("img");
        $galleryImage.on("load", reflowGalleries);
    });
    
    $(window).on("load", reflowGalleries);

    $(window).on("resize", () => setTimeout(reflowGalleries, 100));
};

function reflowGalleries() {
    const $galleries = $(".gallery");
    $galleries.each((i, gallery) => {
        const $gallery = $(gallery);
        const width = $gallery.width();
        const $items = $gallery.find(".gallery-item");
        $items.each((i, item) => {
            const $item = $(item);
            const $img = $item.find("img");
            const imageWidth = $img[0].naturalWidth;
            const targetWidth = 100 * (width >= imageWidth ? imageWidth / width : 1);
            $item.css("width", targetWidth + "%");
        });
        $gallery.masonry();
        $gallery.masonry();
    });
}
