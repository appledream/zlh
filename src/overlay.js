"use strict";
const $ = require("jquery");

module.exports = function init() {
    let isTransitioning = false;
    $(".overlay-link").each((i, overlayLink) => {
        const $overlayLink = $(overlayLink);
        const $overlay = $("#" + $overlayLink.data("overlay"));
        $overlayLink.on("click", () => {
            if(isTransitioning) return;
            isTransitioning = true;
            $("#main-content").fadeOut(500, () => {
               $overlay.fadeIn(750, () => {
                   isTransitioning = false;
               }); 
            });
        });
    });

    $(".overlay-close-button").on("click", () => {
        $(".overlay-container").each((i, overlayContainer) => {
            $(overlayContainer).css("display", "none");
        });
        $("#main-content").css("display", "block");
    });
};
