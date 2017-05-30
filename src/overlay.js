"use strict";
const $ = require("jquery");
const autoScrollWidth = 150;
const maxScrollV = 1;

module.exports = function init() {
    let isTransitioning = false;
    $(".overlay-link[data-overlay]").each((i, overlayLink) => {
        const $overlayLink = $(overlayLink);
        const $overlay = $("#" + $overlayLink.data("overlay"));

        let scrollV = 0;

        $overlayLink.on("click", () => {
            if (isTransitioning) return;
            isTransitioning = true;
            $("#main-content").fadeOut(500, () => {
                scrollV = 0;
                $overlay.scrollLeft(0);
                $overlay.fadeIn(500, () => {
                    isTransitioning = false;
                });
            });
        });

        (function scrollLoop(t) {
            if (scrollV != 0) {
                t /= 1000;
                $overlay.scrollLeft($overlay.scrollLeft() + scrollV * t);
            }
            requestAnimationFrame(scrollLoop);
        })(0);

        $overlay.on("mousemove", (e) => {
            const clientWidth = $overlay.innerWidth();
            if (e.clientX <= autoScrollWidth || e.clientX >= clientWidth - autoScrollWidth) {
                if(e.clientX > clientWidth / 2){
                    scrollV = (1 - (clientWidth - e.clientX) / autoScrollWidth) * maxScrollV;
                }else{
                    scrollV = (1 - e.clientX / autoScrollWidth) * -maxScrollV;
                }
            }else{
                scrollV = 0;
            }
        });

        $overlay.on("mouseleave", () => {
            scrollV = 0;
        });
    });

    $(".overlay-close-button").on("click", function() {
        const $this = $(this);
        $this.hide();
        $this.parent().fadeOut(500, () => {
            $(".overlay-container").hide();
            $this.show();
            $("#main-content").fadeIn(500);
        });
    });
};
