import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import Form1 from "./Form1";

const steps = ["Email & Password", "Basic Details", "Consent"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (data) => {
    console.log(data, "final Data");
    fetch("https://codebuddy.review/submit", {
      method: "Post",
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      if (res.status >= 200 && res.status <= 300) {
        navigate("/posts");
      } else alert("Something went wrong, Please try again !");
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        <Form1
          handleSubmit={handleSubmit}
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
        ></Form1>
      </React.Fragment>
    </Box>
  );
}
