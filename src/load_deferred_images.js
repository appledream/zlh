"use strict";
const $ = require("jquery");

module.exports = function() {
    $('img[data-src]').each((i, img) => {
        const $img = $(img);
        $img.attr("src", $img.data("src"));
    });
};
