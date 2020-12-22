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

function displaySpecialityContent() {
    if ($(".speciality-item.is-active").length) {
        var target = $(".speciality-item.is-active").data("target-id");

        if (window.matchMedia("(min-width: 992px)").matches) {
            var $targetEl = $(".speciality-content[data-id='" + target + "']:not(.is-m)")
            if ($targetEl.length) {
                $(".speciality-content").addClass("d-none");
                $targetEl.removeClass("d-none");
            }
        } else {
            var $targetEl = $(".speciality-content.is-m[data-id='" + target + "']")
            if ($targetEl.length && $targetEl.hasClass("d-none")) {
                $(".speciality-content").addClass("d-none");
                $targetEl.hide().removeClass("d-none").slideDown();
            }
        }        
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

    $(".speciality-item").on("click", function() {
        if (!$(this).hasClass("is-active")) {
            $(".speciality-item").removeClass("is-active");
            $(this).addClass("is-active");
            displaySpecialityContent();
        }
    });

    $(window).resize(function() {
        displaySpecialityContent();
    });
});
