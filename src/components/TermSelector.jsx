const TermButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
      <label className="btn btn-success mb-1 p-2" htmlFor={term} data-cy={term}>
      { term }
      </label>
    </div>
);

const TermSelector = ({terms, selection, setSelection}) => (
    <div className="btn-group">
      { 
        Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
      }
    </div>
  );

export default TermSelector;