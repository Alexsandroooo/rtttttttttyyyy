export default class courseLoad{
    constructor(container,courses){
        this.container = document.querySelector(container);
        this.courses = courses;
    }
    bindGoCurse(trigger,id){
        //console.log(trigger);
        trigger.addEventListener('click', _ => {
            window.open('course.html?&'+id);
        })       
    }
    addCourse(id,course, pos){
        let coursesList = this.container.firstChild;
        //console.log(coursesList);
        let newCourse = document.createElement('div');
        
        newCourse.className = "courses__item";
        newCourse.dataset["ID"] = id;
        newCourse.innerHTML = `
        <div class="wrapper">
            <div>
                <h2 class="courses__item__name">${course.name}</h2>
                <div class="courses__item__author">Организатор: ${course.org}</div>
            </div>
            <div class="courses__item__longer">${course.longer} месяцев(а)</div>
        </div>   `;
        var first=coursesList.childNodes[pos];
        coursesList.insertBefore(newCourse,first); 
        this.bindGoCurse(newCourse.childNodes[1],id);
    }

    show(count = 4){
        for(var course in this.courses){
            if(count > 0) {
                count--; 
                continue;
            }
            this.addCourse(course,this.courses[course],4);
                      
        }
    }
    remove(){
        let coursesItems = document.querySelectorAll('.courses__item');
        coursesItems.forEach(function(elem){
            elem.parentNode.removeChild(elem);
          });
    }
    init(count = 4, coursePos = 0){
        if(!this.container) return;
        this.remove();
        for(var course in this.courses){
            if(count === 0) return;
            this.addCourse(course,this.courses[course],coursePos++);
            count--;
        }
    }
}