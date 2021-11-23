
// "use strict"

const accordeon = document.querySelectorAll(".accordeon-section");

const burgerMenu = document.querySelector(".menu-btn");
const wrapper = document.querySelector(".wrapper-burger-menu");
const menuBox = document.querySelector(".menu-burger-section");
const headerMenu = document.querySelectorAll(".header-nav-list");



// переделать красивиие

// document.querySelector('#jjj').addEventListener('click', function(){

//    document.querySelector("#fff").style.color= '#FFFFFF';
//    document.querySelector("#jjj").style.color= '#FFFFFF';
//    document.querySelector("#fff").style.position= 'absolute';
//    document.querySelector("#fff").style.background= '#3E77BB';
//    document.querySelector('.limiter').style.maxHeight = "none";
// })


// document.querySelectorAll('.read-more-button').forEach(function(button){
//    button.addEventListener('click', function(e){

//       this.parentNode.classList.toggle('active-review');
      

//       if( this.parentNode.classList.contains('active-review')){
//          this.parentNode.style.background = '#3E77BB';
//          this.previousSibling.previousSibling.style.maxHeight = 'none';
//          this.previousSibling.previousSibling.style.zIndex = '100000';
//          this.parentNode.style.position = 'absolute';
//          button.innerHTML = "Свернуть";
//          button.style.color = "white";
//       } else {

//          this.previousSibling.previousSibling.style.maxHeight = 145 + 'px';
//          this.parentNode.style.background = '#FFFFFF';
//          button.innerHTML = "Развернуть";
//          button.style.color = "#3E77BB";
//       }
      
      
    


     
     
//    })
// })








headerMenu.forEach(function(item){
   item.addEventListener('click', function(e){
      document.querySelectorAll('.inner-nav-items').forEach(function(elem){
            elem.classList.remove('active-block')
      })
      e.target.closest("li").querySelector('.inner-nav-items').classList.toggle('active-block');
      

   
   })
})



burgerMenu.addEventListener('click', function(){
   menuBox.classList.toggle('active-block');
   wrapper.classList.toggle('active-wrapper');
   document.body.style.overflow = 'hidden';
})

const accordeonClick = function(e){
    
   accordeon.forEach(function(section){
      section.querySelector(".accordeon-panel").style.maxHeight = "0px";
   
    })


      let insideElHeight = e.target.closest(".accordeon-section").querySelector(".accordeon-panel").scrollHeight;
      e.target.closest(".accordeon-section").querySelector(".accordeon-panel").style.maxHeight = insideElHeight + "px" ;
      menuBox.style.minHeight = 790 + insideElHeight + 'px';
}

accordeon.forEach(function(section){
   section.addEventListener("click", accordeonClick) 
})



















