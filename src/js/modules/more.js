import courseLoad from './filter/courseLoad';

export default class More{
    constructor(container,elem,courses, start){
        this.container = container;
        this.elem = document.querySelector(elem);
        this.courses = courses;
        this.start = start;
    }
    init(){
        if(!this.elem) return;
        const btn =  this.elem.cloneNode(true);
        this.elem.remove();
        this.elem = btn;  
        document.querySelector(this.container).firstChild.appendChild(this.elem);
        this.elem.style.opacity = 1;
        this.elem.style.pointerEvents = 'auto';
        this.elem.addEventListener('click', e => {
            new courseLoad(this.container,this.courses).show(this.start);
        this.elem.style.opacity = 0;
        this.elem.style.pointerEvents = 'none';
        })
    }
}