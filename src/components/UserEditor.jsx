import { useDbUpdate } from '../utilities/firebase.js';
import { useFormData } from '../utilities/useFormData.js';
import { useNavigate } from "react-router-dom";

const validateMeeting = (val) => {
    if (val === '') {
        return true;
    } else {
        let times = val.slice(-11,val.length);
        let days = val.slice(0,-12);
        if (parseInt(times[0]) != (0 || 1 || 2) || parseInt(times[6]) != (0 || 1 || 2) ||
            parseInt(times[3]) >= 6 || parseInt(times[9]) >= 6 || times[2] != ':' ||
            times[8] != ':' || times[5] != '-') {
                return false;
        } else if (parseInt(times[0]) > parseInt(times[6]) || 
        (parseInt(times[0]) == parseInt(times[6]) && parseInt(times.slice(3,4)) > parseInt(times.slice(9,10)))) {
            return false;
        } else if (isNaN((times.slice(0,2)+times.slice(3,5)+times.slice(6,8)+times.slice(9,11)))) {
            return false;
        } else {
            let daysArray = [];
            var daysDict = {
                "M":0,"Tu":1,"W":2,"Th":3,"F":4
            };
            for (let i = 0; i < days.length; i++) {
                if (days[i] === 'M') {
                    daysArray.push('M');
                } else if (days.slice(i,i+2) === 'Tu') {
                    i = i + 1;
                    daysArray.push('Tu');
                } else if (days[i] === 'W') {
                    daysArray.push('W');
                } else if (days.slice(i,i+2) === 'Th') {
                    i = i + 1;
                    daysArray.push('Th');
                } else if (days[i] === 'F') {
                    daysArray.push('F');
                } else {
                    return false;
                }
            }
            for (let ii = 0; ii < daysArray.length; ii++) {
                if (daysArray.indexOf(daysArray[ii]) != daysArray.lastIndexOf(daysArray[ii])) {
                    return false;
                }
                if (daysDict[daysArray[ii]] > daysDict[daysArray[ii+1]]) {
                    return false;
                }
            }
            if (daysArray.length > 5 || daysArray.length == 0) {
                return false;
            }
            return true;
        }
    }
}

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      return validateMeeting(val) ? '' : 'must be empty string or have valid dates/times';
    default: return '';
  }
};

const InputField = ({name, text, state, change, makeUneditable}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input readOnly={makeUneditable} className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled, onCancel}) => {
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => onCancel()}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const UserEditor = ({course,onCancel}) => {
  const courseId = course.term[0] + course.number;

  const [update, result] = useDbUpdate(`/courses/${courseId}`);
  const [state, change] = useFormData(validateUserData, course);

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors && (course.meets != state.values.meets || course.title != state.values.title)) {
      update(state.values);
    }
  };

  return (
    <form pointerEvents='none' onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField makeUneditable={true} name="term" text="Quarter Offered" state={state} change={change} />
      <InputField makeUneditable={true} name="number" text="Course Number" state={state} change={change} />
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Dates / Times (ex: 'MTuWThF 10:00-10:50')" state={state} change={change} />
      <ButtonBar message={result?.message} onCancel={onCancel} />
    </form>
  )
};

export default UserEditor;