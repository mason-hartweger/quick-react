import { useState } from "react";
import CourseCardGrid from './CourseCardGrid';
import CourseCart from './CourseCart'
import Modal from './Modal';
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

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <TermSelector terms={terms} selection={selection} setSelection={setSelection} />
      <button className="btn btn-outline-dark" onClick={openModal}><i className="bi bi-cart4">CourseCart</i></button>
      <TermMenu selectedCourses={selectedCourses} toggleSelectedCourse={toggleSelectedCourse} selection={selection} data={reduced_data}/>
      <Modal open={open} close={closeModal}>
        <CourseCart selected={selectedCourses}/>
      </Modal>
    </div>
  );
}

export default TermSelectorPage;