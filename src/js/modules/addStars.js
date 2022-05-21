export default function addStar(content, ids) {
    const favorContent = document.querySelector(content);
    if(!favorContent || ids.length == 0){
        return;
    } 
    const courses = favorContent.querySelectorAll('.courses__item');
    for(var course of courses){
        const id = course.dataset["ID"];
        console.log(id);
        const star = document.createElement('div');
        star.className = "favorite favorite_check";
        star.innerHTML = `
        <i class="fa fa-star" aria-hidden="true"></i> `;
        
        course.appendChild(star); 

        star.addEventListener('click', _ => {       
            if(star.classList.contains("favorite_check")) {
                star.classList.remove("favorite_check");
                ids = ids.filter((n) => {return n != id})
            }
            else {
                star.classList.add("favorite_check");           
                ids.push(id);
            }
            
            localStorage.setItem('favorites', JSON.stringify(ids));
        })

    }


    
    
}
