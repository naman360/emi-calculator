import { useState } from "react";
import { tenure as loanTenure } from "../util/constant";
function EMICalculator() {
  const [totalCost, setTotalCost] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [selectedTenure, setSelectedTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const defaultStyles = {
    marginTop: "20px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontWeight: "bold", textAlign: "center" }}>
          EMI Calculator
        </span>

        <span style={defaultStyles}>Total Cost of Asset</span>
        <input type="number" />

        <span style={defaultStyles}>Interest Rate (in %)</span>
        <input type="number" />

        <span style={defaultStyles}>Processing Fee (in %)</span>
        <input type="number" />

        <span style={defaultStyles}>Down Payment</span>
        <input type="range" name="" id="" />
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>0%</span>
          <span>{downPayment}</span>
          <span>100%</span>
        </span>

        <span style={defaultStyles}>EMI</span>
        <input type="range" name="" id="" />
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>0%</span>
          <span>{downPayment}</span>
          <span>100%</span>
        </span>

        <span style={defaultStyles}>Tenure</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {loanTenure.map((tenure) => (
            <button
              style={{
                borderRadius: "40px",
                outline: "none",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor:
                  selectedTenure === tenure ? "#009ad6" : "rgb(226,226,226)",
              }}
            >
              {tenure}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EMICalculator;
