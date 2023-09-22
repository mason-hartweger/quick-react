const CourseCart = ({selected}) => (
  <div className="cart">
    {
      selected.length === 0
      ? <h2>No courses selected. Select courses in previous screen to add them to your Course Cart.</h2>
      : Object.entries(selected).map(([id,course]) => (
          <div key={id}>
            CS {course.number} ({course.term}) -- {course.title} [{course.meets}]
          </div>
        ))
    }
  </div>
);

export default CourseCart;