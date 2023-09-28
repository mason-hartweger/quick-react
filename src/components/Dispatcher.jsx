import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserEditor from "./UserEditor";

const Dispatcher = ({course}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/course" element={<UserEditor course={course} />} />
    </Routes>
  </BrowserRouter>
);

export default Dispatcher;