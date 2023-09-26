import { useState } from "react";
import CourseCardGrid from './CourseCardGrid';
import CourseCart from './CourseCart'
import Modal from './Modal';
import TermSelector from './TermSelector';
import {containsSameMeetingDays,containsSameTerm,containsOverlappingMeetingTimes} from '../utilities/conflict.js';

const terms = {
  Fall: '',
  Winter: '',
  Spring: ''
};

const TermMenu = ({data, selectedCourses, toggleSelectedCourse, selection, unavailibleCourses}) => (
    <CourseCardGrid courses={data} selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} selection={selection} unavailibleCourses={unavailibleCourses}/>
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

  //console.log(selectedCourses);
  let unavailibleCourses = [];
  for (let i = 0; i < selectedCourses.length; i++) {
    let c1 = selectedCourses[i];
    for (let ii = 0; ii < reduced_data.length; ii++) {
        let c2 = reduced_data[ii];
        if (!(c1 === c2[1])) {
          if (containsSameMeetingDays(c1.meets,c2[1].meets) &&
          containsSameTerm(c1.term,c2[1].term) &&
          containsOverlappingMeetingTimes(c1.meets,c2[1].meets)) {
            unavailibleCourses.push(c2[1]);
        }
      }
    }
  }

  //console.log(unavailibleCourses);

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <div flexdirection='row'>
        <TermSelector terms={terms} selection={selection} setSelection={setSelection} />
        <button style={{float: 'right'}} className="btn btn-outline-dark" onClick={openModal}><i className="bi bi-cart4">CourseCart</i></button>
      </div>
      <TermMenu selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} selection={selection} data={reduced_data} unavailibleCourses={unavailibleCourses}/>
      <Modal open={open} close={closeModal}>
        <CourseCart selected={selectedCourses}/>
      </Modal>
    </div>
  );
}

export default TermSelectorPage;