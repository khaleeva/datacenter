




const burgerMenu = document.querySelector(".menu-btn");
const wrapper = document.querySelector(".wrapper-burger-menu");
const menuBox = document.querySelector(".menu-section-mob");
const headerMenu = document.querySelectorAll(".header-nav-list");
const accHeaders = document.querySelectorAll(".accordeon-header");
const accPanel = document.querySelectorAll('.accordeon-panel');

const iconMenu = document.querySelector('.menu-icon');
if (iconMenu){
   
   iconMenu.addEventListener('click', function(e){
      iconMenu.classList.toggle("active");
      wrapper.classList.toggle("active-wrapper");
      menuBox.classList.toggle('active-block');
      document.body.classList.toggle('active-body');
      menuClick();
   })
}


// Burger-menu

   const menuClick = () =>{

      for (let accHeader of accHeaders) {
        
        if(accHeader.nextElementSibling.classList.contains("show-panel")){
         accHeader.nextElementSibling.classList.remove("show-panel");
         menuBox.style.minHeight = 790 + 'px';
        }

         accHeader.addEventListener('click', function() {
            let setClasses = !this.classList.contains('active-panel');
             setClass(accHeaders, 'active-panel', 'remove');
             setClass(accPanel, 'show-panel', 'remove');
             
               if (setClasses) {
                 this.classList.toggle("active-panel");
                 this.nextElementSibling.classList.toggle("show-panel");
                 menuBox.style.minHeight = 790 + 136 + 'px';
             } 
         })
        }
   }


      function setClass(elem, className, fnName) {
         for (let i = 0; i < elem.length; i++) {
            elem[i].classList[fnName](className);
         }
      }



// let menuBtns= document.querySelectorAll(".menu-link");
//    if (menuBtns.length > 0){
//       for (let i = 0; i < menuBtns.length; i++){
//          const menuBtn = menuBtns[i];
//          menuBtn.addEventListener('click', function(e){
//             e.target.classList.toggle('active-link');
//          })
//       }
//    }





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

// const accordeonClick = function(e){
    
  

//    accordeon.forEach(function(section){
      
//       section.querySelector(".accordeon-panel").style.maxHeight = "0px";
   
//     })


//       let insideElHeight = e.target.closest(".accordeon-section")
//       .querySelector(".accordeon-panel").scrollHeight;
    
//          e.target.closest(".accordeon-section").querySelector(".accordeon-panel")
//          .style.maxHeight = insideElHeight + "px" ;
//          menuBox.style.minHeight = 790 + insideElHeight + 'px';
//       }



// accordeon.forEach(function(section){
//    section.addEventListener("click", accordeonClick) 
// })
































