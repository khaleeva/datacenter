
let map_containers = document.querySelectorAll('.map_container');
let options_map = {
    once: true,
    passive: true,
    capture: true
};

if (map_containers) {
    for (let map_container of map_containers) {
        map_container.addEventListener('click', start_lazy_map, options_map);
        map_container.addEventListener('mouseover', start_lazy_map, options_map);
        map_container.addEventListener('touchstart', start_lazy_map, options_map);
        map_container.addEventListener('touchmove', start_lazy_map, options_map);
    }

}

let map_loaded = false;
function start_lazy_map() {
    if (!map_loaded) {
        let map_blocks = document.querySelectorAll('.ymap_lazy');
        for (let map_block of map_blocks) {
            map_loaded = true;
            map_block.setAttribute('src', map_block.getAttribute('data-src'));
            map_block.removeAttribute('data-src');
        }

    }
}


