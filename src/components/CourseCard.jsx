import './CourseCard.css';

const CourseCard = ({course, selectedCourses, toggleSelectedCourse, unavailibleCourses}) => (
  <div className="card m-1 p-2" key='{course.title}' onClick={() => !unavailibleCourses.includes(course) ? toggleSelectedCourse(course): ""}>
    <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : ''}`}>
        <div className={`card-body ${unavailibleCourses.includes(course) ? 'unavailible' : ''}`}>
            <h5 className="card-title">{course.term} CS {course.number}</h5>
            <div style={{height:100}}><p className="card-text">{course.title}</p></div>
            <hr className="solid"></hr>
            <p className="card-text">{course.meets}</p>
        </div>
    </div>
  </div>
);

export default CourseCard;