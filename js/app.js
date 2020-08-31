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
});

$(window).on("load", function () {
    $(".flexslider").flexslider({
        animation: "slide"
    });
});