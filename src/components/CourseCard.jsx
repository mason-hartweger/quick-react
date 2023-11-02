import { useState } from "react";
import './CourseCard.css';
import UserEditor from './UserEditor';
import Modal from './Modal'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";



const CourseCard = ({course, selectedCourses, toggleSelectedCourse, unavailibleCourses}) => {

    const [openForm, setOpenForm] = useState(false);

    const openModalForm = () => setOpenForm(true);
    const closeModalForm = () => setOpenForm(false);

    const [user] = useAuthState();
    const [profile, profileLoading, profileError] = useProfile();
    const isAdmin = profile.isAdmin;

    let isLoggedIn = false;
    if (user != null) {
        isLoggedIn = true;
    };

    for (let i = 0; i < selectedCourses.length;i++) {
        if (selectedCourses[i].number === course.number && openForm) {
                selectedCourses.splice(i,1);
        }
    }

    return (
  <div className="card m-1 p-2" data-cy="course" key='{course.title}' onClick={() => !unavailibleCourses.includes(course) ? toggleSelectedCourse(course): ""}>
    <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : ''}`}>
        {(isLoggedIn && isAdmin) ?
            (<button onClick={openModalForm} style={{float: 'right'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>) : "" }
        <div className={`card-body ${unavailibleCourses.includes(course) ? 'unavailible' : ''}`}>
                <h5 className="card-title">{course.term} CS {course.number}</h5>
            <div style={{height:100}}><p className="card-text">{course.title}</p></div>
            <hr className="solid"></hr>
            <p className="card-text">{course.meets}</p>
        </div>
    </div>
    <Modal open={openForm} close={closeModalForm} titleText={'Modify Course'} showX={false}>
            <UserEditor course={course} onCancel={closeModalForm}/>
    </Modal>
  </div>
    );
};

export default CourseCard;