import courseLoad from './courseLoad';
import More from '../more';
import slider from './slider';
export default class Filter{
    constructor(container,courses){
        this.container = document.querySelector(container);
        this.courses = courses;
        this.trigger = null;
        this.slider = null;
    }
    categoryBinding(course){
        let checkState = true;
        let filter = course.querySelector('input[name=filter__type__category_cb]');
        filter.addEventListener('change', _ => {
            checkState = filter.checked?true:false;
            for ( var cb of course.querySelectorAll('input[name=filter__type__item]') ) {
                cb.checked = checkState;  
            }
        });

    }
    resetBinding(){
        const resetBtn = document.querySelector('.filter__reset');
        resetBtn.addEventListener('click', _ => {
            const inputs = document.querySelectorAll('.filter input');
            for (const input of inputs)  {
                input.checked=false;
            }
            const inputlvl = document.querySelector('.filter__type__lvl input');
            inputlvl.checked=true;
            this.slider.reset();
            this.trigger.click();
           
        });
    }
    addSubDirection(container,course){
        let newSubDirection = document.createElement('label');
        newSubDirection.innerHTML = `
        <input type="checkbox" name="filter__type__item" id="">${course.subdirection}  `;         
        container.appendChild(newSubDirection);  
    }
    subDirectionBinding(container){
        container.querySelector('h4').addEventListener('click', _ =>{
            const subDirection = container.querySelector('.filter__type__items');
            subDirection.hidden = !subDirection.hidden;
        })

    }
    addDirection(course){
        const newDirection = document.createElement('div');
        newDirection.className = "filter__type";
        newDirection.innerHTML = `
        <div class="filter__type__category">
            <input type="checkbox" name="filter__type__category_cb" id="">
            <h4>${course.direction}</h4>
        </div>
        <div class="filter__type__items">
        </div>`;    
            const first=this.container.children[2];       
            this.container.insertBefore(newDirection,first); 
            this.subDirectionBinding(newDirection);           
            return newDirection;
    }
    filter(trig,content,moretrig,allCourses,from,to){
        if(!this.container) return;
        this.trigger =  this.container.querySelector(trig);
        const subdir =[];
        const lvl =[];
        this.trigger.addEventListener('click', _ => {
            const fromstart = +document.getElementById(from).textContent;
            const toend = +document.getElementById(to).textContent;
            subdir.length = 0;
            lvl.length = 0;
            const checkedInputsDir = this.container.querySelectorAll('.filter__type input[name="filter__type__item"]:checked');
            for(var checkedInput of checkedInputsDir){
                subdir.push(checkedInput.parentNode.innerText.trim());               
            }
            const checkedLvls = this.container.querySelectorAll('.filter__type__lvl input[name="filter__type__item"]:checked');
            for(var checkedLvl of checkedLvls){
                lvl.push(checkedLvl.parentNode.innerText.toLowerCase()); 
                if(checkedLvl.parentNode.innerText==='любой')
                   break;               
            }            
            this.courses = {};
            if(subdir.length===0){
                for(var courseKey in allCourses){
                    const longer=allCourses[courseKey].longer;
                    console.log(fromstart);
                    if (longer>=fromstart&&
                        longer<=toend&&
                        (lvl[0] =='любой' || lvl.includes(allCourses[courseKey].lvl))){
                        this.courses[courseKey] = allCourses[courseKey];
                    }
                }
            } 
            else{
                console.log('false');
                console.log(subdir);
                for(var courseKey in allCourses){
                    if (subdir.includes(allCourses[courseKey].subdirection)&&
                       (lvl[0] =='любой' || lvl.includes(allCourses[courseKey].lvl))&&
                       allCourses[courseKey].longer>=fromstart&&
                       allCourses[courseKey].longer<=toend){
                        this.courses[courseKey] = allCourses[courseKey];
                    }
                }
            }

            new courseLoad(content,this.courses).init();
            new More(content,moretrig,this.courses,4).init();
        });
    }
    init(){
        if(!this.container) return;
        this.container = this.container.children[0]
        let currDirection = null; 
        for(var courseKey in this.courses){
            let course = this.courses[courseKey];
            //ищем нужное направление
            let direction = Array.from(this.container.querySelectorAll('h4')).find(el => {
                return el.innerText == course.direction;
                
            });
            if(direction)
            {             
                currDirection= direction.parentNode.nextElementSibling;
                //ищем поднаправление
                const thissubdirection = Array.from(this.container.querySelectorAll('label')).find(el => {
                    return el.innerText == course.subdirection;
                });
                if(!thissubdirection){
                    this.addSubDirection(currDirection,course);  
                }
            }
            else{
                
                currDirection= this.addDirection(course);                 
                this.addSubDirection(currDirection.querySelector('.filter__type__items'),course);
                this.categoryBinding(currDirection);
                //currDirection.querySelector('input[name=filter__type__category_cb]').checked = true;
                this.container.querySelector('.filter__type__lvl input[name=filter__type__item]').checked = true;
            }
        }  
        this.slider = new slider('input-left','input-right','.slider>.thumb.left','.slider>.thumb.right','.slider>.range','startfrom','endto');
        this.slider.init();
        this.resetBinding();
    }
}