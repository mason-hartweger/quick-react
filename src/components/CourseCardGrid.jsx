import CourseCard from './CourseCard';
import './CourseCardGrid.css';

const CourseCardGrid = ({courses,selectedCourses,toggleSelectedCourse,unavailibleCourses}) => (
  <div className="course-card-grid">
      { courses.map(([id,course]) => 
      <div key={id}><CourseCard course={course} selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} unavailibleCourses={unavailibleCourses} /></div>)
    }
  </div>
);

export default CourseCardGrid;