export default class slider{
    constructor(inputLeft,inputRight,thumbLeft,thumbRight,range,from,to){
        this.inputLeft = document.getElementById(inputLeft);
        this.inputRight = document.getElementById(inputRight);
        this.thumbLeft = document.querySelector(thumbLeft);
        this.thumbRight = document.querySelector(thumbRight);
        this.range = document.querySelector(range);
        this.from = document.getElementById(from);
        this.to = document.getElementById(to);
    }
    setLeftValue(){
        const min = parseInt(this.inputLeft.min);
        const max = parseInt(this.inputLeft.max);

        this.inputLeft.value = Math.min(parseInt(this.inputLeft.value), parseInt(this.inputRight.value) - 1);

        const percent = ((this.inputLeft.value - min) / (max - min)) * 100;

        this.thumbLeft.style.left = percent + "%";
        this.range.style.left = percent + "%";
        this.from.innerHTML =  this.inputLeft.value;
    }
    setRightValue(){
        const min = parseInt(this.inputRight.min);
        const max = parseInt(this.inputRight.max);
        this.inputRight.value = Math.max(parseInt(this.inputRight.value), parseInt(this.inputLeft.value) + 1);

        const percent = ((this.inputRight.value - min) / (max - min)) * 100;

        this.thumbRight.style.right = (100 - percent) + "%";
        this.range.style.right = (100 - percent) + "%";
        this.to.innerHTML =  this.inputRight.value;
    }
    reset(){
        this.inputRight.value = this.inputRight.max;
        this.inputLeft.value = this.inputLeft.min;
        this.setLeftValue();
        this.setRightValue();
    }
    init(){
        if(!this.inputLeft) return;
        this.setLeftValue();
        this.setRightValue();
        this.inputLeft.addEventListener("input", this.setLeftValue.bind(this));
        this.inputRight.addEventListener("input", this.setRightValue.bind(this));
    }

}