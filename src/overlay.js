"use strict";
const $ = require("jquery");

module.exports = function init() {
    $(".overlay-link").each((i, overlayLink) => {
        const $overlayLink = $(overlayLink);
        $overlayLink.on("click", () => {
            $("#" + $overlayLink.data("overlay")).fadeIn(1000);
            $("#main-content").css("display", "none");
        });
    });

    $(".overlay-close-button").on("click", () => {
        $(".overlay-container").each((i, overlayContainer) => {
            $(overlayContainer).css("display", "none");
        });
        $("#main-content").css("display", "block");
    });
};
