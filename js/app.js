function initMap() {
    mapA = new google.maps.Map(document.getElementById('g-map'), {
        zoom: 16,
        center: new google.maps.LatLng(1.2783134, 103.8509185),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    marker = new google.maps.Marker({
        map: mapA,
        position: new google.maps.LatLng(1.2783134, 103.8509185)
    });
}

function displaySpecialityContent($source) {
    if ($(".specialty__item.is-active").length) {
        if ($source) {
            var target = $source.data("target-id");
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

$(function () {
    $(".specialty__box").hover(
        function () {
            $(this).find(".specialty__icon").addClass("animate__heartBeat");
        }, function () {
            $(this).find(".specialty__icon").removeClass("animate__heartBeat");
        }
    );

    $(".global-reach__facts").scroll(
        function () {
            $(".global-reach__facts-ra").addClass("d-none");
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
    });
});
