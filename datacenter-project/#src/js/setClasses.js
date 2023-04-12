function setClass(elem, className, fnName) {

    for (let i = 0; i < elem.length; i++) {
        elem[i].classList[fnName](className);
    }
}

// function setClass(elem, className, action) {
//     elem.forEach(el => el.classList[action](className));
// }
