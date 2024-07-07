import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BidsManagement = () => {
  const [bids, setBids] = useState([]);
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    // Fetch bids
    fetch("https://665749159f970b3b36c8b179.mockapi.io/task1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Bids Response:", data);
        setBids(data.sort((a, b) => a.bidcost - b.bidcost));
      })
      .catch((error) => console.error(error));

    // Fetch tenders
    fetch("https://665749159f970b3b36c8b179.mockapi.io/tenders")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tenders Response:", data);
        setTenders(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const updateTenderEndTime = (tender) => {
      console.log(
        `Updating tender ${tender.id} with new end time: ${tender.endtime}`
      );
      fetch(
        `https://665749159f970b3b36c8b179.mockapi.io/tenders/${tender.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endtime: tender.endtime }),
        }
      ).catch((error) => console.error(error));
    };

    const processBids = () => {
      const updatedBids = bids.map((bid) => {
        const tender = tenders.find((tender) => tender.id === bid.tenderId);
        if (tender) {
          const tenderEndTime = new Date(tender.endtime);
          const bidTime = new Date(bid.bidtime);
          const timeDiff = (tenderEndTime - bidTime) / 60000;

          if (timeDiff <= 5 && timeDiff >= 0) {
            bid.flag = true;

            const bufferTime = tender.bufferTime || 0;
            const newEndTime = new Date(
              tenderEndTime.getTime() + bufferTime * 60000
            );
            tender.endtime = newEndTime.toISOString();

            updateTenderEndTime(tender);
          }
        }
        return bid;
      });

      setBids(updatedBids);
    };

    if (bids.length > 0 && tenders.length > 0) {
      processBids();
    }
  }, [bids, tenders]);

  return (
    <div className="bidsManagementContainer">
      <div className="header">
        <Link to="/admin" className="link">
          back
        </Link>
        <h2 className="headerTitle">Bids Management</h2>
      </div>
      <table className="bidsTable">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Bid Time</th>
            <th>Bid Cost</th>
            <th>Tender Id</th>
            <th>Tender Name</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td>{bid.companyname}</td>
              <td>{new Date(bid.bidtime).toLocaleString()}</td>
              <td>{bid.bidcost}</td>
              <td>{bid.id}</td>
              <td>{bid.tenderName}</td>
              <td>{bid.flag ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidsManagement;
