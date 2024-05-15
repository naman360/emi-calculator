import { useEffect, useState } from "react";
import { tenure as loanTenure } from "../util/constant";

const defaultStyles = {
  marginTop: "20px",
  fontWeight: "bold",
};

type OtherCharges = "interest_rate" | "processing_fee";
type RangeValues = "emi" | "down_payment";

function EMICalculator() {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [processingFee, setProcessingFee] = useState<number>(1);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [emi, setEmi] = useState<number>(0);

  const handleTotalCostChange = (value: string) => {
    const parsedValue = Number(value);
    if (parsedValue < 0) return;
    setTotalCost(parsedValue);
  };

  const handleExtraCharges = (value: string, type: OtherCharges) => {
    const parsedValue = Number(value);

    if (parsedValue < 0 || parsedValue > 100) return;
    switch (type) {
      case "interest_rate":
        setInterestRate(parsedValue);
        break;
      case "processing_fee":
        setProcessingFee(parsedValue);
        break;
    }
  };

  const calculateEmi = (dp: number, str?: string) => {
    if (!totalCost) return 0;
    // console.log(str);
    const loanAmount = totalCost - dp;

    const rateOfInterest = interestRate / 100;
    const numOfYears = selectedTenure / 12;

    console.log(loanAmount, rateOfInterest, selectedTenure / 12, dp, str);
    const emiAmount =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number((emiAmount / 12).toFixed(0));
  };

  const calculateDownPayment = (emi: number) => {
    if (!totalCost) return 0;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;
    return Number(((downPaymentPercent / 100) * totalCost).toFixed(0));
  };

  const updateEmi = (value: string) => {
    if (!totalCost) return;
    const parsedValue = Number(value);

    if (parsedValue < 0) return;

    setDownPayment(parsedValue);

    const emiAmount = calculateEmi(parsedValue);
    setEmi(emiAmount);
  };

  const updateDownPayment = (value: string) => {
    if (!totalCost) return;
    const parsedValue = Number(value);

    if (parsedValue < 0) return;

    setEmi(parsedValue);
    const dp = calculateDownPayment(parsedValue);
    setDownPayment(dp);
  };

  useEffect(() => {
    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [selectedTenure, totalCost]);

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
        <input
          type="number"
          value={totalCost}
          onChange={(e) => handleTotalCostChange(e.target.value)}
        />

        <span style={defaultStyles}>Interest Rate (in %)</span>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => handleExtraCharges(e.target.value, "interest_rate")}
        />

        <span style={defaultStyles}>Processing Fee (in %)</span>
        <input
          type="number"
          value={processingFee}
          onChange={(e) => handleExtraCharges(e.target.value, "processing_fee")}
        />

        <span style={defaultStyles}>Down Payment</span>
        <input
          type="range"
          min={0}
          max={totalCost}
          value={downPayment}
          onChange={(e) => updateEmi(e.target.value)}
          step={1}
        />
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>0%</span>
          <span>{downPayment}</span>
          <span>100%</span>
        </span>

        <span style={defaultStyles}>EMI</span>
        <input
          type="range"
          min={calculateEmi(totalCost, "hello")}
          max={calculateEmi(0)}
          value={emi}
          onChange={(e) => updateDownPayment(e.target.value)}
          name=""
          id=""
        />
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{calculateEmi(totalCost)}</span>
          <span>{emi}</span>
          <span>{calculateEmi(0)}</span>
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
              onClick={() => setSelectedTenure(tenure)}
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
