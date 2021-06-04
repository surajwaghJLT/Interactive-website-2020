function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }

function displaySpecialityContent($source) {
    if ($(".specialty__item.is-active").length) {
        if ($source) {
            var target = $source.data("target-id");;
        } else {
            var target = $(".specialty__item.is-active").data("target-id");
        }
        
        if (window.matchMedia("(min-width: 992px)").matches) {
            var $targetEl = $(".specialty__content[data-id='" + target + "']:not(.is-m)");
            if ($targetEl.length) {
                $(".specialty__content").addClass("d-none");
                $targetEl.removeClass("d-none");
            }
        } else {
            var $targetEl = $(".specialty__content.is-m[data-id='" + target + "']");
            if ($targetEl.length && $targetEl.hasClass("d-none")) {
                $targetEl.hide().removeClass("d-none").slideDown();
            } else if ($targetEl.length && !$targetEl.hasClass("d-none") && $source) {
                $targetEl.slideUp(400, function() { $targetEl.removeAttr("style").addClass("d-none"); });
                $source.removeClass("is-active");
            }
        }        
    } else {
        $(".specialty__item:first-child .specialty__box").click();
    }
}

function toggleGlobalReachSliderArrows() {
    if ($(".global-reach__facts").scrollLeft() === 0) {
        $(".global-reach__facts-la").prop("disabled", true).addClass("is-disabled");
    } else {
        $(".global-reach__facts-la").prop("disabled", false).removeClass("is-disabled");
    }

    if (parseInt($(".global-reach__facts").get(0).scrollWidth - $(".global-reach__facts").scrollLeft()) === parseInt($(".global-reach__facts").outerWidth())) {
        $(".global-reach__facts-ra").prop("disabled", true).addClass("is-disabled");
    } else {
        $(".global-reach__facts-ra").prop("disabled", false).removeClass("is-disabled");
    }
}

$(function () {
    if ($(".global-reach__facts").length) {
        toggleGlobalReachSliderArrows();

        var slider = document.querySelector(".global-reach__facts"),
        isDown = false,
        startX,
        scrollLeft;

        if (!isTouchDevice()) {
            $(".global-reach__facts").removeClass("is-touch");

            slider.addEventListener("mousedown", function(e) {
                if (!window.matchMedia("(min-width: 992px)").matches) {
                    isDown = true;
                    slider.classList.add("on-press");
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                }
            });

            slider.addEventListener("mouseleave", function(e) {
                if (!window.matchMedia("(min-width: 992px)").matches) {
                    isDown = false;
                    slider.classList.remove("on-press");
                }
            });

            slider.addEventListener("mouseup", function() {
                if (!window.matchMedia("(min-width: 992px)").matches) {
                    isDown = false;
                    slider.classList.remove("on-press");
                }
            });

            slider.addEventListener("mousemove", function(e) {
                if (!window.matchMedia("(min-width: 992px)").matches) {
                    if (!isDown) return;

                    e.preventDefault();
                    
                    var x = e.pageX - slider.offsetLeft;
                    var walk = (x - startX) * 1.5;
                    slider.scrollLeft = scrollLeft - walk;

                    toggleGlobalReachSliderArrows();
                }
            });
        } else {
            $(".global-reach__facts").addClass("is-touch");
        }

        $(".global-reach__facts-ra").on("click", function() {
            $(".global-reach__facts").animate({scrollLeft: $(".global-reach__facts").scrollLeft() + 100}, "500", "swing", toggleGlobalReachSliderArrows);
        });

        $(".global-reach__facts-la").on("click", function() {
            $(".global-reach__facts").animate({scrollLeft: $(".global-reach__facts").scrollLeft() - 100}, "500", "swing", toggleGlobalReachSliderArrows);
        });

        $(".global-reach__facts").scroll(function() {
            toggleGlobalReachSliderArrows();
        });
    }

    $(".specialty__box").hover(
        function () {
            $(this).find(".specialty__icon").addClass("animate__heartBeat");
        }, function () {
            $(this).find(".specialty__icon").removeClass("animate__heartBeat");
        }
    );

    $(".nav-link").click(function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();

            var link = $(this).attr("href");

            $("#navbarSupportedContent .navbar-toggler").click(); // close nav menu
            setTimeout(function() {
                window.location.href = link;
            }, 200);
        }
    });

    displaySpecialityContent();

    $(".specialty__box").on("click", function() {
        var $clickedParentItem = $(this).parent(".specialty__item");

        if (window.matchMedia("(min-width: 992px)").matches) {
            if (!$clickedParentItem.hasClass("is-active")) {
                $(".specialty__item").removeClass("is-active");
                $clickedParentItem.addClass("is-active");
                displaySpecialityContent($clickedParentItem);
            }
        } else {
            $clickedParentItem.addClass("is-active");
            displaySpecialityContent($clickedParentItem);
        }
    });

    $(window).resize(function() {
        displaySpecialityContent();

        if ($(".global-reach__facts").length && isTouchDevice()) {
            $(".global-reach__facts").removeClass("is-touch");
        } else if ($(".global-reach__facts").length && !isTouchDevice()) {
            $(".global-reach__facts").removeClass("is-touch");
        }
    });

    var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});
