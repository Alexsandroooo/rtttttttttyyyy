import courseLoad from './modules/filter/courseLoad';
import More from './modules/more';
import Filter from './modules/filter/filter';
import Courses from '../data/courses';
import CourseItem from './modules/filter/CourseItem';
import addStar from './modules/addStars';
window.addEventListener('DOMContentLoaded', _ => {
  'use strict';
  const coursesCopy ={};
  for(var key in Courses){
    coursesCopy[key] = Courses[key];
  }
  new courseLoad('.courses__container',coursesCopy).init();
  new More('.courses__container','.more',coursesCopy,4).init();
  const filter = new Filter('.filter',coursesCopy);
  filter.init();
  filter.filter('.find','.courses__container','.more',Courses,'startfrom','endto');
  new CourseItem('.course',Courses).init();

  let favorID =JSON.parse(localStorage.getItem('favorites'));
  if(!favorID) return;
  const favorCourses ={};
  for(var key in Courses){
    if(favorID.includes(key)) {
      favorCourses[key] = Courses[key];
    }   
  }
  new courseLoad('.favorite_courses',favorCourses).init();
  addStar('.favorite_courses',favorID);
});