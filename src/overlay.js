"use strict";
const $ = require("jquery");
const autoScrollWidth = 200;
const maxScrollV = 800;
const isMobile = require("./is_mobile.js");

module.exports = function init() {
    let isTransitioning = false;
    $(".overlay-link[data-overlay]").each((i, overlayLink) => {
        const $overlayLink = $(overlayLink);
        const $overlay = $("#" + $overlayLink.data("overlay"));
        console.log($overlay);

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

        if (!isMobile) {
            $(window).bind("mousewheel DOMMouseScroll", function(event) {
                if(!$overlay.is(":visible")) return;
                let delta = event.originalEvent.wheelDelta || event.originalEvent.detail;
                if(!delta) delta = 0;
                $overlay.scrollLeft($overlay.scrollLeft() - delta);
            });

            let lastTime = 0;
            (function scrollLoop(t) {
                const deltaT = (t - lastTime) / 1000;
                lastTime = t;
                if (scrollV != 0) {
                    $overlay.scrollLeft($overlay.scrollLeft() + scrollV * deltaT);
                }
                requestAnimationFrame(scrollLoop);
            })(0);

            $overlay.on("mousemove", (e) => {
                const clientWidth = $overlay.innerWidth();
                if (e.clientX <= autoScrollWidth || e.clientX >= clientWidth - autoScrollWidth) {
                    if (e.clientX > clientWidth / 2) {
                        scrollV = (1 - (clientWidth - e.clientX) / autoScrollWidth) * maxScrollV;
                    }
                    else {
                        scrollV = (1 - e.clientX / autoScrollWidth) * -maxScrollV;
                    }
                }
                else {
                    scrollV = 0;
                }
            });

            $overlay.on("mouseleave", () => {
                scrollV = 0;
            });
        }
    });

    $(".overlay-close-button").on("click", function() {
        const $this = $(this);
        $this.hide();
        $this.parent().fadeOut(500, () => {
            $(".overlay-container").not("#main-bar").hide();
            $this.show();
            $("#main-content").fadeIn(500);
        });
    });
};
