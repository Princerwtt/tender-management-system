import React, { useState } from "react";

const QuotationForm = ({ tenderId, tenderName, onSubmit }) => {
  const [quotation, setQuotation] = useState({
    name: "",
    bidtime: "",
    bidcost: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    bidtime: "",
    bidcost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotation({ ...quotation, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!quotation.name) {
      newErrors.name = "Company Name is required.";
      isValid = false;
    }
    if (!quotation.bidtime) {
      newErrors.bidtime = "Bid Time is required.";
      isValid = false;
    }
    if (!quotation.bidcost) {
      newErrors.bidcost = "Bid Cost is required.";
      isValid = false;
    } else if (isNaN(quotation.bidcost)) {
      newErrors.bidcost = "Bid Cost must be a number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("https://665749159f970b3b36c8b179.mockapi.io/task1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...quotation, tenderId, tenderName }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          onSubmit();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quotationFormContainer">
      <table>
        <tbody>
          <tr>
            <td>
              <label>
                <h4>Company Name</h4>
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={quotation.name}
                onChange={handleChange}
                className="quotationFormInput"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <h4>Bid Time</h4>
              </label>
            </td>
            <td>
              <input
                type="datetime-local"
                name="bidtime"
                value={quotation.bidtime}
                onChange={handleChange}
                className="quotationFormInput"
              />
              {errors.bidtime && <p className="error">{errors.bidtime}</p>}
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <h4>Bid Cost</h4>
              </label>
            </td>
            <td>
              <input
                type="text"
                name="bidcost"
                placeholder="Bid Cost"
                value={quotation.bidcost}
                onChange={handleChange}
                className="quotationFormInput"
              />
              {errors.bidcost && <p className="error">{errors.bidcost}</p>}
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <button type="submit" className="quotationFormButton">
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default QuotationForm;
