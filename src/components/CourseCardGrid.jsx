import CourseCard from './CourseCard';
import './CourseCardGrid.css';

const CourseCardGrid = ({courses}) => (
  <div className="course-card-grid">
      { courses.map(([id,course]) => 
      <div key={id}><CourseCard course={course} /></div>)
    }
  </div>
);

export default CourseCardGrid;