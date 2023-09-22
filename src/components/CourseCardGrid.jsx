import CourseCard from './CourseCard';
import './CourseCardGrid.css';

const CourseCardGrid = ({courses,selectedCourses,toggleSelectedCourse}) => (
  <div className="course-card-grid">
      { courses.map(([id,course]) => 
      <div key={id}><CourseCard course={course} selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} /></div>)
    }
  </div>
);

export default CourseCardGrid;