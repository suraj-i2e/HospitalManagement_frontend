import React from "react";
import { PatientForm } from "./Components/PatientForm";
import { PatientList } from "./Components/PatientList";

const App = () => {
  return (
    <div>
      <PatientForm />
      <PatientList />
    </div>
  );
};

export default App;
