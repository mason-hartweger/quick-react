import { useState } from "react";
import CourseCardGrid from './CourseCardGrid';

const terms = {
  Fall: '',
  Winter: '',
  Spring: ''
};

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const TermMenu = ({data}) => (
    <CourseCardGrid courses={data}/>
);

const TermSelectorPage = ({data}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const reduced_data = Object.entries(data).filter((course) => course[1].term === selection);
  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <TermMenu selection={selection} data={reduced_data}/>
    </div>
  );
}

export default TermSelectorPage;