import React, { useState, useEffect } from "react";
import TenderForm from "./TenderForm";
import TenderList from "./TenderList";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    fetch("https://665749159f970b3b36c8b179.mockapi.io/tenders")
      .then((response) => response.json())
      .then((data) => setTenders(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="adminPanel">
        <div className="add3">
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        <div className="add">Admin Panel</div>
        <div className="add2">
          <Link to="/bids" className="link">
            View Bids
          </Link>
        </div>
      </div>

      <TenderForm />
      <TenderList tenders={tenders} />
    </div>
  );
};

export default AdminPanel;
