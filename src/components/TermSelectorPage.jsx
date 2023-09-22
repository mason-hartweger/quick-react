import { useState } from "react";
import CourseCardGrid from './CourseCardGrid';
import TermSelector from './TermSelector';

const terms = {
  Fall: '',
  Winter: '',
  Spring: ''
};

const TermMenu = ({data}) => (
    <CourseCardGrid courses={data}/>
);

const TermSelectorPage = ({data}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const reduced_data = Object.entries(data).filter((course) => course[1].term === selection);
  return (
    <div>
      <TermSelector terms={terms} selection={selection} setSelection={setSelection} />
      <TermMenu selection={selection} data={reduced_data}/>
    </div>
  );
}

export default TermSelectorPage;