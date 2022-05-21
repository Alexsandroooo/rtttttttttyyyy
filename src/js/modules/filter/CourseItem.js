import changeFavorite from '../setFavorite';
import setRecomendation from '../recomendation';
export default class courseItem{
    constructor(container,courses){
        this.container = document.querySelector(container);
        this.course = this.getCourse(courses);
        this.courses = courses;
    }
    getCourse(courses){
        try{
            let id = decodeURIComponent(location.search).split('&')[1];
            this.id = id;
            
            return courses[id];
        }
        catch{
            return null;
        }
    }
    showInfo(){
        this.container.querySelector('.course__name').innerHTML = this.course.name; 
        this.container.querySelector('.course__descr').innerHTML = this.course.about.descr;
        //console.log(this.container.about.facts);
        for(var fact of this.course.about.facts)
        {
            
            let aboutItem = document.createElement('div');
            let subData = fact.sub.slice(fact.sub.indexOf(" " ));          
            let subNumb = +fact.sub.slice(0, fact.sub.indexOf(" "));
            if(!subNumb){
                subData = fact.sub;
                subNumb = '';
            } 
            
            aboutItem.className = "course__about__item";
            aboutItem.innerHTML = `
            <div class="course__about__item__theme">${fact.theme}</div>
            <div class="course__about__item__main">${fact.main}</div>
            <div class="course__about__item__sub"><span>${subNumb}</span>${subData}</div>   `;
            this.container.querySelector('.course__about').appendChild(aboutItem);
        }
        
    }
    bindingCourseBtn(){
        const btn = this.container.querySelector('.course__plan');
        btn.addEventListener('click', _ => {
            window.open(this.course.course_link);
        })
    }
    showForInfo(){        
        for(var forFact of this.course.about.for)
        {            
            let aboutItem = document.createElement('div');
            aboutItem.className = "course__for__item";
            aboutItem.innerHTML = `
            <div class="course__for__item__main">${forFact.main}</div>
            <div class="course__for__item__sub">${forFact.sub}</div>   `;
            this.container.querySelector('.course__for__items').appendChild(aboutItem);
        }
    }
    showPrice() {
        this.container.querySelector('.price').innerHTML = this.course.price; 
    }
    showOrg(){
        document.querySelector('.course__org__name').innerHTML = this.course.org; 
        const link = document.querySelector('.course__org__site a'); 
        link.href = this.course.org_link;
        link.innerHTML = this.course.org_link;
    }
    toggleRec() {
        changeFavorite(this.id,'.favorite');
    }
    init(){
        if(!this.container) return;
        this.showInfo();
        this.bindingCourseBtn();
        this.showForInfo();
        this.showOrg();
        this.showPrice();
        this.toggleRec();
       // setRecomendation(decodeURIComponent(location.search).split('&')[1],'.course__rec__items', this.courses);
       setRecomendation('.course__rec__items', this.courses);
    }
}