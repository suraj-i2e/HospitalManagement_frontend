import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { PiPencilBold } from "react-icons/pi";

export const PatientList = () => {
  const [appointment, setAppointment] = useState([]);

  const statusList = [
    <h4 style={{ color: "green" }}>Completed</h4>,
    <h4 style={{ color: "red" }}>Cancelled</h4>,
    <h4 style={{ color: "orange" }}>Scheduled</h4>,
    <h4 style={{ color: "blue" }}>Emergency</h4>,
  ];

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7082/api/Patient/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Departments");
      } else {
        window.location.reload();
        console.log("Patient Entery Deleted.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch("https://localhost:7082/api/Patient");
        if (!response.ok) {
          throw new Error("Failed to fetch Appointments");
        }
        const data = await response.json();
        setAppointment(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointment();
  }, []);

  const handleEdit = async (appointment) => {
    const name = prompt("Update Patient Name", appointment.name);
    const doct_name = prompt("Update Doctor Name", appointment.doct_name);
    const dept_name = prompt("Update Department", appointment.dept_name);

    if (!name || !doct_name || !dept_name) {
      alert("Update cancelled. All fields are required.");
      return;
    }

    const updatedData = {
      ...appointment,
      name,
      doct_name,
      dept_name,
    };

    try {
      const response = await fetch(
        `https://localhost:7082/api/Patient/${appointment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update patient");

      alert("Patient updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong during update.");
    }
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyle}>Patient Name</th>
          <th style={thStyle}>Doctor Name</th>
          <th style={thStyle}>Department</th>
          <th style={thStyle}>Appointment Date</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointment.map((appointment) => (
          <React.Fragment key={appointment.id}>
            <tr style={trStyle}>
              <td style={tdStyle}>{appointment.name}</td>
              <td style={tdStyle}>{appointment.doct_name}</td>
              <td style={tdStyle}>{appointment.dept_name}</td>
              <td style={tdStyle}>{appointment.appointment}</td>
              <td>
                {statusList[Math.floor(Math.random() * statusList.length)]}
              </td>
              <td style={{ textAlign: "center" }}>
                <PiPencilBold
                  size={20}
                  style={{ marginRight: "20px" }}
                  onClick={() => handleEdit(appointment)}
                />
                <MdDelete
                  onClick={() => handleDelete(appointment.id)}
                  size={20}
                />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const trStyle = {
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
};

const tdStyle = {
  padding: "8px",
};

const expandedTdStyle = {
  padding: "8px",
  backgroundColor: "#f9f9f9",
};
