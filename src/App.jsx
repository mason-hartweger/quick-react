const schedule = {
  title: "CS Courses for 2018-2019"
};

const Heading = ({title}) => (
  <h1>
    { title }
  </h1>
);

const App = () => (
  
  <div>
      <Heading title={schedule.title}/>
  </div>
);

export default App;