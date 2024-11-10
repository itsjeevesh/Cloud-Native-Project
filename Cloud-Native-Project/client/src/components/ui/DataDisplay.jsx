import React from "react";

const DataDisplay = ({ data }) => {
  console.log(data);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="data-display-grid">
      <div className="data-display-header">ID</div>
      <div className="data-display-header">Name</div>
      <div className="data-display-header">Email</div>
      <div className="data-display-header">Location</div>
      <div className="data-display-header">Department</div>
      <div className="data-display-header">DOB</div>

      {Array.isArray(data) ? (
        data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="data-display-data">{item.id}</div>
            <div className="data-display-data">{item.name}</div>
            <div className="data-display-data">{item.email}</div>
            <div className="data-display-data">{item.location}</div>
            <div className="data-display-data">{item.department}</div>
            <div className="data-display-data">{formatDate(item.dob)}</div>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <div className="data-display-data">{data.id}</div>
          <div className="data-display-data">{data.name}</div>
          <div className="data-display-data">{data.email}</div>
          <div className="data-display-data">{data.location}</div>
          <div className="data-display-data">{data.department}</div>
          <div className="data-display-data">{formatDate(data.dob)}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default DataDisplay;
