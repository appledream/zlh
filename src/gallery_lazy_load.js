"use strict";
const $ = require("jquery");
const placeHolderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAAADElEQVQYV2PYunUrAARCAiDlC6VdAAAAAElFTkSuQmCC"

module.exports = function init(){
    const $galleryImages = $(".gallery-item img");
        $galleryImages.each((i, galleryImage) => {
            const $galleryImage = $(galleryImage);
            const imagePath = $galleryImage.attr("src");
            const img = new Image();
            img.onload = function(){
                $galleryImage.attr("src", imagePath);
                $(".gallery").masonry();
            };
            $galleryImage.attr("src", placeHolderImage);
            $(img).attr("src", imagePath);
        });
        $(".gallery").masonry();
};