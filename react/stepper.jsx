import React, { useContext, useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  return <Stepper list={["Step 1", "Step 2", "Step 3"]} />;
}

const Stepper = ({ list }) => {
  console.log("list", list);
  const [currentStep, setCurrentStep] = useState(1);

  const Step = () => {
    return (
      <>
        {list &&
          list.map((el, idx) => (
            <div className={`circle ${idx <= currentStep ? "active" : ""}`}>
              {el}{" "}
            </div>
          ))}
      </>
    );
  };

  const onPrev = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    if (currentStep !== list.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const progressLineWidth = (100 / (list.length - 1)) * currentStep;

  const StepComponent = list[currentStep];
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div className="wrapper">
        <Step />
      </div>
      <div
        className="progress-line"
        style={{ width: `${progressLineWidth}%` }}
      ></div>

      <StepComponent />
    </div>
  );
};

/*
.App {
  font-family: sans-serif;
  text-align: center;
}

.box {
  border: 1px solid black;
  padding: 10px;
  width: 40px;
  height: 40px;
}

.row {
  display: flex;
  flex-direction: row;
}

.wrapper {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 2;
}

.circle {
  width: 60px;
  height: 60px;
  border: 1px solid black;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  background-color: red;
}

.progress-line {
  height: 4px;
  background-color: #007bff;
  position: absolute;
  top: 50%;
  left: 60px; /* Start from center of first circle */
  right: 60px; /* End at center of last circle */
  /* transform: translateY(-50%); */
  z-index: 1;
  transition: width 0.3s ease;
  transform-origin: left;
}

.progress-line::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ddd;
  width: 100%;
  z-index: -1;
}
*/
