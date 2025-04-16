import React, { useState, useEffect } from "react";

export const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    department: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [dept, setDept] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://localhost:7082/api/Doctor");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchDept = async () => {
      try {
        const response = await fetch("https://localhost:7082/api/Department");
        if (!response.ok) {
          throw new Error("Failed to fetch Departments");
        }
        const data = await response.json();
        setDept(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoctors();
    fetchDept();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("FOrm data:", formData);
    try {
      const response = await fetch("https://localhost:7082/api/Patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.patientName,
          doct_name: formData.doctorName,
          dept_name: formData.department,
          appointment: formData.appointmentDate,
          status: 1,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        window.location.reload();
        // Reset the form
        setFormData({
          patientName: "",
          doctorName: "",
          appointmentDate: "",
          department: "",
        });
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <div>
          <label>Patient Name: </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            style={{ padding: "8px" }}
            required
          />
        </div>

        <div>
          <label>Doctor Name:</label>
          <select
            id="doctorId"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            style={{ padding: "8px" }}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.doctor_name}>
                {doctor.doctor_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            style={{ padding: "8px" }}
            required
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <div>
          <label>Department Name:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            style={{ padding: "8px" }}
            required
          >
            <option value="">Select Department</option>
            {dept.map((dept) => (
              <option key={dept.id} value={dept.dept_name}>
                {dept.dept_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ padding: "8px", borderRadius: "10px" }}>
          Create
        </button>
      </div>
    </form>
  );
};
