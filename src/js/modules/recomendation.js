import recData from '../../data/reccdata';
import DataFrame from 'dataframe-js';
export default function setRec(container,courses) {

    const dataFrame = {
        header:[],
        datas:[]
    }
    const index = setHeaders(dataFrame,getCourse(courses));
    setDatas(dataFrame);
    clearData(dataFrame,index);
    const favoriteCourses = getMax(dataFrame,3);
    renderCourses(favoriteCourses);
    
    function getCourse(courses){
        try{
            let id = decodeURIComponent(location.search).split('&')[1];          
            return id;
        }
        catch{
            return null;
        }
    }
    function setHeaders(dataFrame, curr = null){
        let index = -1;
        let i = 0;
        for(let header in recData[0]) {
            if(header == curr) {
                index = i;
            }
            dataFrame.header.push(header);
            i++;
        }
        return index;
    }
    function setDatas(dataFrame){
        for(let i = 0; i< recData.length;i++){
            dataFrame.datas[i] = [];
             for(let frame in recData[i]){
                dataFrame.datas[i].push(recData[i][frame]); 
             }
         }
    }
    function clearData(dataFrame,index){
        if(index < 0) return;
        const newData =[];
        let i = 0;
        for (let data of dataFrame.datas){
            if( data[index] != 0){
                newData[i] = data;
                i++;
            }          
        }
        dataFrame.datas = newData;
    }
    function sumData(dataFrame){
        let result = [];
        for (let data of dataFrame.datas){
            for(let i = 0; i < data.length;i++){
                if(isNaN(result[i])) {
                    result[i]=0;
                }
                result[i] += data[i];                 
            }            
        }
        return result;
    }
    function getMax(dataFrame,count){
        const result = sumData(dataFrame);
        let i =0;
        const summs ={};
        for(let header of dataFrame.header){
            summs[`${header}`]=result[i];
            i++;
        }
        console.log(summs);
        const summsKeys = Object.keys(summs).sort(function(a,b){return summs[a]-summs[b]});
        console.log(summsKeys);
        return summsKeys.slice(summsKeys.length-(count+1),summsKeys.length-1)
    }
    function renderCourses(coursesKeys){
        for(let id of coursesKeys){
            const selCourse = courses[id];
            const curid =  id;    
            const aboutItem = document.createElement('div');
            aboutItem.className = "course__rec__item";
            aboutItem.innerHTML = `
            <div class="course__rec__item__name">${selCourse.name}</div>
            <div class="course__rec__item__org">Организатор: ${selCourse.org}</div>
            <div class="course__rec__item__longer">${selCourse.longer} месяцев(а)</div>  `;
            document.querySelector(container).appendChild(aboutItem);        
            aboutItem.addEventListener('click', e => {
                window.open('course.html?&'+curid);
            } );
        }
    }
}
