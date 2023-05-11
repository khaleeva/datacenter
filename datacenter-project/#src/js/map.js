document.addEventListener("DOMContentLoaded", function () {
    lazyLoadMaps()
});


function lazyLoadMaps(){
    let maps = document.querySelectorAll('.map__card');
    let options_map = {
        once: true,
        passive: true,
        capture: true
    };

    maps.forEach(map => {
        map.addEventListener('click', start_lazy_map, options_map);
        map.addEventListener('mouseover', start_lazy_map, options_map);
        map.addEventListener('touchstart', start_lazy_map, options_map);
        map.addEventListener('touchmove', start_lazy_map, options_map);
    });

    let map_loaded = false;
    function start_lazy_map() {
        if (!map_loaded) {
            let ymaps_lazy = document.querySelectorAll('.ymap_lazy');
            ymaps_lazy.forEach(ymap_lazy => {
                map_loaded = true;
                ymap_lazy.setAttribute('src', ymap_lazy.getAttribute('data-src'));
                ymap_lazy.removeAttribute('data-src');
            })
        }
    }
};




