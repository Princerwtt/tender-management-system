import React, { useState, useEffect } from "react";
import QuotationForm from "./QuotationForm";
import { Link } from "react-router-dom";

const UserView = () => {
  // State variables to manage tenders and notifications
  const [tenders, setTenders] = useState([]);
  const [newTenderNotification, setNewTenderNotification] = useState(false);
  const [selectedTender, setSelectedTender] = useState(null);

  // Function to fetch tenders from the API
  const fetchTenders = () => {
    fetch("https://665749159f970b3b36c8b179.mockapi.io/tenders")
      .then(response => response.json())
      .then(data => {
        const now = new Date();
        const recentTenders = data.filter(
          (tender) => (now - new Date(tender.createdAt)) / 60000 < 5
        );

        if (recentTenders.length > 0) {
          setNewTenderNotification(true);
          setTimeout(() => {
            setNewTenderNotification(false);
          }, 5000);
        }

        setTenders(data);
      })
      .catch(error => console.error("Error fetching tenders:", error));
  };

  // useEffect to fetch tenders when the component mounts and set an interval
  useEffect(() => {
    fetchTenders();
    const intervalId = setInterval(fetchTenders, 60000); // Fetch tenders every minute
    return () => clearInterval(intervalId);
  }, []);

  // Handle the click event for submitting a quotation
  const handleQuotationClick = (tender) => {
    setSelectedTender(tender);
  };

  // Handle form submission
  const handleFormSubmit = () => {
    setSelectedTender(null);
  };

  return (
    <div className="userViewContainer">
      {/* Notification for new tenders */}
      {newTenderNotification && (
        <div className="notification">
          A new tender has been created within the last 5 minutes!
        </div>
      )}

      <div className="user">
        <div>
          <Link to="/" className="link">
            Home
          </Link>
        </div>

        <div>
          <h2>Available Tenders</h2>
        </div>
      </div>

      <table className="tenderTable">
        <thead>
          <tr>
            <th>Tender Name</th>
            <th>Tender Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.name}</td>
              <td>{tender.description}</td>
              <td>{tender.starttime}</td>
              <td>{tender.endtime}</td>
              <td>
                <button
                  onClick={() => handleQuotationClick(tender)}
                  className="userViewButton"
                >
                  Submit Quotation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Show QuotationForm if a tender is selected */}
      {selectedTender && (
        <QuotationForm
          tenderId={selectedTender.id}
          tenderName={selectedTender.name}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default UserView;
