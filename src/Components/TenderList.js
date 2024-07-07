import React from "react";

// The TenderList component takes a 'tenders' prop, which is an array of tender objects.
const TenderList = ({ tenders }) => {
  return (
    <div className="tenderList">
      {/* Header for the tender list */}
      <h2>Previous Tenders</h2>
      
      {/* Table to display the tenders */}
      <table className="tenderTableList">``
        <thead>
          <tr>
            {/* Table headers */}
            <th>Tender Name</th>
            <th>Tender Description</th>
            <th>Tender Start Date</th>
            <th>Tender End Date</th>
            <th>Buffer Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the tenders array and create a table row for each tender */}
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.name}</td>
              <td>{tender.description}</td>
              <td>{tender.starttime}</td>
              <td>{tender.endtime}</td>
              <td>{tender.bufferTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenderList;
