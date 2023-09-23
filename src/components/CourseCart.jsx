const CourseCart = ({selected}) => (
  <div className="cart">
    {
      selected.length === 0
      ? <h2>No courses selected. Select courses from grid to add them to your Course Cart.</h2>
      : Object.entries(selected).map(([id,course]) => (
          <div key={id}>
            <div>CS {course.number} ({course.term})</div>
            <div>{course.title} </div>
            <div>[{course.meets}]</div>
            <hr className="solid"></hr>
          </div>
        ))
    }
  </div>
);

export default CourseCart;