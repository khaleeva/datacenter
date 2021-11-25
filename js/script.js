

const iconMenu = document.querySelector('.menu-icon');
const wrapper = document.querySelector(".wrapper-burger-menu");
const menuBox = document.querySelector(".menu-section-mob");
const accHeaders = document.querySelectorAll(".accordeon-header");
const accPanel = document.querySelectorAll('.accordeon-panel');


function menuClick(){
   if (iconMenu){
   
         iconMenu.addEventListener('click', function(e){
         iconMenu.classList.toggle("active");
         wrapper.classList.toggle("active-wrapper");
         menuBox.classList.toggle('active-block');
         document.body.classList.toggle('active-body');
         menuAccClick();
         
      })
   }
}

menuClick();




 function menuAccClick(){
    for (let accHeader of accHeaders) {
      
      if(accHeader.nextElementSibling.classList.contains("show-panel")){
         accHeader.nextElementSibling.classList.remove("show-panel");
         menuBox.classList.remove("active-height");
        }
      

       accHeader.addEventListener('click', function() {
          let setClasses = !this.classList.contains('active-panel');
           setClass(accHeaders, 'active-panel', 'remove');
           setClass(accPanel, 'show-panel', 'remove');
           
           
             if (setClasses) {
               this.classList.toggle("active-panel");
               this.nextElementSibling.classList.toggle("show-panel");
               
            } 

            if(accHeader.nextElementSibling.classList.contains("show-panel")){
               menuBox.classList.add("active-height");
            } else {
               menuBox.classList.remove("active-height");
            }

            
       })
      }
 }



    function setClass(elem, className, fnName) {
       for (let i = 0; i < elem.length; i++) {
          elem[i].classList[fnName](className);
       }

    }


   
    let touchstartY = 0;
    let touchendY = 0;
    
    const gestureZone = document.querySelector('.div-line-swipe');
    
    gestureZone.addEventListener('touchstart', function(event) {
      
        touchstartY = event.changedTouches[0].screenY;
    }, false);
    
    gestureZone.addEventListener('touchend', function(event) {
      
        touchendY = event.changedTouches[0].screenY;
        handleGesture();
    }, false); 
    
    function handleGesture() {
  
        
        if (touchendY >= touchstartY) {
                  iconMenu.classList.remove("active");
                  wrapper.classList.remove("active-wrapper");
                  menuBox.classList.remove('active-block');
                  document.body.classList.remove('active-body'); 
                  menuAccClick();

                  
        }
        
       
    }




    
;






