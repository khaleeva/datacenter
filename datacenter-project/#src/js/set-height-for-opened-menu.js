function setHeightForOpenedMenu(isOpen = false) {
    const swipe_block = document.querySelector(".swipe-menu__container");
    const heightDevice = window.innerHeight;
    if(isOpen){
        let minHeightBottomMenu = heightDevice * 0.9
        let topPoint = heightDevice * 0.1
        swipe_block.style.minHeight = `${minHeightBottomMenu}px`
        swipe_block.style.top = `${topPoint}px`
    } else {
        swipe_block.style.minHeight = `0px`
        swipe_block.style.top = `100%`
    }
};
