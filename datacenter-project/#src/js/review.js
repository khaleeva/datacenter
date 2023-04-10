

const reviewLinks = document.querySelectorAll('.read-more-button');
const parents = document.querySelectorAll('.review__card-inner');
const limiters = document.querySelectorAll('.limiter');


for (let link of reviewLinks) {
      
    if(link.parentElement.classList.contains("review__card-inner_active")){
        link.parentElement.classList.remove("active-section");
      }

     link.addEventListener('click', function() {
        let setClasses = !this.classList.contains('active');
         setClass(reviewLinks, 'active', 'remove');
         setClass(parents, 'review__card-inner_active', 'remove');
         setClass(limiters,'active-limiter', 'remove');
         setInner(reviewLinks);

           if (setClasses) {
             this.classList.add("active");
             this.parentNode.classList.add("review__card-inner_active");
             this.previousSibling.previousSibling.classList.add("active-limiter");
            link.innerHTML = 'Свернуть';


          } else{
            this.classList.remove("active");
            this.parentNode.classList.remove("review__card-inner_active");
            this.previousSibling.previousSibling.classList.remove("active-limiter");
            link.innerHTML = 'Развернуть';

          }

     })
    }





  function setInner(elem){
     for(let i = 0; i < elem.length; i++){
        if(elem[i].classList.contains('active')){
           elem[i].innerHTML = 'Свернуть';
        } else {
         elem[i].innerHTML = 'Развернуть'
        }
     }
  }






   
    

    

       


      
    



