import './CourseCard.css';

const CourseCard = ({course, selectedCourses, toggleSelectedCourse}) => (
  <div className="card m-1 p-2" key='{course.title}' onClick={() => toggleSelectedCourse(course)}>
    <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : ''}`}>
      <h5 className="card-title">{course.term} CS {course.number}</h5>
      <div style={{height:100}}><p className="card-text">{course.title}</p></div>
      <hr className="solid"></hr>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default CourseCard;