const CourseCard = ({course}) => (
  <div className="card m-1 p-2" key='{course.title}'>
    <div className="card-body">
      <h5 className="card-title">{course.term} CS {course.number}</h5>
      <div style={{height:100}}><p className="card-text">{course.title}</p></div>
      <hr className="solid"></hr>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default CourseCard;