"use strict";
const $ = require("jquery");

module.exports = function init() {
    const $mainbar = $("#main-bar");
    if ($mainbar.length > 0) {
        $(window).on("resize", function() {
            const vh = $(window).height();
            const ot = $mainbar.offset().top;
            $mainbar.height(vh-ot);
        });
        
        const vh = $(window).height();
        const ot = $mainbar.offset().top;
        $mainbar.height(vh-ot);
    }
};
