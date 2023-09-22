import { useState } from "react";
import CourseCardGrid from './CourseCardGrid';
import TermSelector from './TermSelector';

const terms = {
  Fall: '',
  Winter: '',
  Spring: ''
};

const TermMenu = ({data, selectedCourses, toggleSelectedCourse, selection}) => (
    <CourseCardGrid courses={data} selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} selection={selection}/>
);

const TermSelectorPage = ({data}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const reduced_data = Object.entries(data).filter((course) => course[1].term === selection);

  const toggleSelectedCourse = (item) => setSelectedCourses(
    selectedCourses.includes(item)
    ? selectedCourses.filter(x => x !== item)
    : [...selectedCourses, item]
  );
  console.log(selectedCourses);
  return (
    <div>
      <TermSelector terms={terms} selection={selection} setSelection={setSelection} />
      <TermMenu selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} selection={selection} data={reduced_data}/>
    </div>
  );
}

export default TermSelectorPage;