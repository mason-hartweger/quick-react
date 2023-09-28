import { useDbUpdate } from '../utilities/firebase.js';
import { useFormData } from '../utilities/useFormData.js';
import { useNavigate } from "react-router-dom";

const validateUserData = (key, val) => {
  switch (key) {
    case 'quarter': case 'lastName':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'number':
      return /^\w+@\w+[.]\w+/.test(val) ? '' : 'must contain name@domain.top-level-domain';
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
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => onCancel()}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const UserEditor = ({course,onCancel}) => {
  const [update, result] = useDbUpdate(`/users/${course.id}`);
  const [state, change] = useFormData(validateUserData, course);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
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