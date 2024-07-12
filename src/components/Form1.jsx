import {
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import "./components.css";
import { useState } from "react";
import Toast from "./Toast";

export default function Form1(props) {
  const [inputs, setInputs] = useState({});
  const [stepperValue, setStepperValue] = useState(props.activeStep);
  const [emailData, setEmailData] = useState({
    isEmailError: false,
    emailHelperText: "",
    emailValue: "",
  });
  const [passwordData, setPasswordData] = useState({
    isPasswordError: false,
    passwordHelperText: "",
    passwordValue: "",
  });
  const [firstNameData, setFirstNameData] = useState({
    isFirstNameError: false,
    firstNameHelperText: "",
    firstNameValue: "",
  });
  const [lastNameData, setLastNameData] = useState({
    isLastNameError: false,
    lastNameHelperText: "",
    lastNameValue: "",
  });
  const [addressData, setAddressData] = useState({
    isAddressError: false,
    addressHelperText: "",
    addressValue: "",
  });
  const [isNumberError, setIsNumberError] = useState(false);
  const [numberHelperText, setNumberHelperText] = useState("");
  const [numberValue, setNumberValue] = useState(inputs?.phoneNumber ?? "");
  const [pincodeValue, setPincodeValue] = useState(inputs?.countryCode ?? "");
  const [tCAccepted, setTCAccepted] = useState(false);
  const [toastResponse, settoastResponse] = useState({ show: false, message: "" });

  //FUNCTION TO HANDLE CHANGE FOR ALL VALUES
  const handleChange = (event, data) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs, "inputs");
    if (data == "email") validateEmail(value);
    else if (data == "password") validatePassword(value);
    else if (data == "first") validateFirstName(value);
    else if (data == "last") validateLastName(value);
    else if (data == "number") validateNumber(value);
    else if (data == "address") validateAddress(value);
    else if (data == "countryCode") {
      setPincodeValue(value);
    }
  };

  //Separate functions to validate different values
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailData({
        isEmailError: true,
        emailHelperText: "Enter a valid email",
        emailValue: email,
      });
    } else {
      setEmailData({ isEmailError: false, emailHelperText: "", emailValue: email });
    }
  };

  const validatePassword = (password) => {
    const passRegex =
      "^(?=.*?[A-Z]{2,})(?=.*?[a-z]{2,})(?=.*?[0-9]{2,})(?=.*?[#?!@$%^&*-]{2,}).{8,}$";
    if (!password.match(passRegex)) {
      setPasswordData({
        isPasswordError: true,
        passwordHelperText:
          "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters. Sample:'AAbb@@11'",
        passwordValue: password,
      });
    } else {
      setPasswordData({
        isPasswordError: false,
        passwordHelperText: "",
        passwordValue: password,
      });
    }
  };

  const validateFirstName = (name) => {
    const Regex = /^[a-zA-Z]{2,50}$/;
    if (!Regex.test(name)) {
      setFirstNameData({
        isFirstNameError: true,
        firstNameHelperText:
          "First Name must contain only Alphabets,minimum of 2 and maximum 50 character",
        firstNameValue: name,
      });
    } else {
      setFirstNameData({
        isFirstNameError: false,
        firstNameHelperText: "",
        firstNameValue: name,
      });
    }
  };

  const validateLastName = (name) => {
    const Regex = /^[a-zA-Z]*$/;
    if (!Regex.test(name)) {
      setLastNameData({
        isLastNameError: true,
        lastNameHelperText: "Last Name must contain only Alphabets",
        lastNameValue: name,
      });
    } else {
      setLastNameData({
        isLastNameError: false,
        lastNameHelperText: "",
        lastNameValue: name,
      });
    }
  };

  const validateAddress = (address) => {
    const Regex = /^.{10,}$/;
    if (!Regex.test(address)) {
      setAddressData({
        isAddressError: true,
        addressHelperText: "Address must have atleast 10 characters",
        addressValue: address,
      });
    } else {
      setAddressData({
        isAddressError: false,
        addressHelperText: "",
        addressValue: address,
      });
    }
  };
  const validateNumber = (number) => {
    console.log(number);
    setNumberValue(number);
    const Regex = /^\d{10}$/;
    if (!Regex.test(number)) {
      setIsNumberError(true);
      setNumberHelperText("Enter valid mobile number");
    } else {
      setIsNumberError(false);
      setNumberHelperText("");
    }
  };

  const handleCheckbox = (event) => {
    setTCAccepted(event.target.checked);
  };

  return (
    <>
      {stepperValue == 0 && (
        <form>
          <Box className="FormBox">
            <Grid className="FormGrid" sx={{ flexDirection: "column" }}>
              <TextField
                error={emailData.isEmailError}
                required
                placeholder="email@yopmail.com"
                label="Email Id"
                my={2}
                name="emailId"
                value={emailData.emailValue}
                onChange={(event) => {
                  handleChange(event, "email");
                }}
                helperText={emailData.emailHelperText}
              ></TextField>
              <TextField
                error={passwordData.isPasswordError}
                required
                placeholder="xxxxxxx"
                label="Password"
                name="password"
                value={passwordData.passwordValue}
                helperText={passwordData.passwordHelperText}
                onChange={(event) => {
                  handleChange(event, "password");
                }}
                my={2}
              ></TextField>
              <Grid className="buttonGrid">
                <Button
                  disabled
                  variant="contained"
                  onClick={() => {
                    props.handleBack();
                    setStepperValue(stepperValue - 1);
                  }}
                >
                  Back
                </Button>
                <Button variant="contained">Save</Button>
                <Button
                  onClick={() => {
                    if (
                      !emailData.isEmailError &&
                      !passwordData.isPasswordError &&
                      emailData.emailValue &&
                      passwordData.passwordValue
                    ) {
                      props.handleNext();
                      setStepperValue(stepperValue + 1);
                    } else {
                      settoastResponse({
                        show: true,
                        message: "Incorrect Form Data, Please rectify to proceed",
                        severity: "error",
                      });
                    }
                  }}
                  variant="contained"
                >
                  Save & Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
      {stepperValue == 1 && (
        <form>
          <Box className="FormBox">
            <Grid className="FormGrid" sx={{ flexDirection: "column" }}>
              <TextField
                error={firstNameData.isFirstNameError}
                required
                placeholder="Bishnu"
                label="First Name"
                name="firstName"
                my={2}
                value={firstNameData.firstNameValue}
                onChange={(event) => {
                  handleChange(event, "first");
                }}
                helperText={firstNameData.firstNameHelperText}
              ></TextField>
              <TextField
                error={lastNameData.isLastNameError}
                placeholder="Tibrewal"
                label="Last Name"
                name="lastName"
                my={2}
                value={lastNameData.lastNameValue}
                onChange={(event) => {
                  handleChange(event, "last");
                }}
                helperText={lastNameData.lastNameHelperText}
              ></TextField>
              <TextField
                error={addressData.isAddressError}
                required
                placeholder="1, Tollygunge Phari"
                label="Address"
                my={2}
                name="address"
                value={addressData.addressValue}
                onChange={(event) => {
                  handleChange(event, "address");
                }}
                helperText={addressData.addressHelperText}
              ></TextField>
              <Grid className="buttonGrid">
                <Button
                  variant="contained"
                  onClick={() => {
                    props.handleBack();
                    setStepperValue(stepperValue - 1);
                  }}
                >
                  Back
                </Button>
                <Button variant="contained">Save</Button>
                <Button
                  onClick={() => {
                    if (
                      !firstNameData.isFirstNameError &&
                      !lastNameData.isLastNameError &&
                      !addressData.isAddressError &&
                      firstNameData.firstNameValue &&
                      addressData.addressValue
                    ) {
                      props.handleNext();
                      setStepperValue(stepperValue + 1);
                    } else {
                      settoastResponse({
                        show: true,
                        message: "Incorrect Form Data, Please rectify to proceed",
                        severity: "error",
                      });
                    }
                  }}
                  variant="contained"
                >
                  Save & Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
      {stepperValue == 2 && (
        <form>
          <Box className="FormBox">
            <Grid className="FormGrid" sx={{ flexDirection: "column" }}>
              <Grid className="telephone">
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Country Code"
                  name="countryCode"
                  value={pincodeValue}
                  onChange={(event) => {
                    handleChange(event, "countryCode");
                  }}
                >
                  <MenuItem value={"+91"}>+91</MenuItem>
                  <MenuItem value={"+1"}>+1</MenuItem>
                </Select>
                <TextField
                  error={isNumberError}
                  required
                  label="Phone number"
                  my={2}
                  onChange={(event) => {
                    handleChange(event, "number");
                  }}
                  value={numberValue}
                  name="phoneNumber"
                  helperText={numberHelperText}
                ></TextField>
              </Grid>
              <FormControlLabel
                required
                checked={tCAccepted}
                control={<Checkbox onChange={handleCheckbox} />}
                label="Accept terms&conditions to proceed. You wont be allowed to progress otherwise"
              />
              <Grid className="buttonGrid">
                <Button
                  variant="contained"
                  onClick={() => {
                    props.handleBack();
                    setStepperValue(stepperValue - 1);
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (tCAccepted && !isNumberError && numberValue && pincodeValue)
                      props.handleSubmit(inputs);
                    else {
                      if (!tCAccepted)
                        settoastResponse({
                          show: true,
                          message: "Terms & Conditions must be accepted",
                          severity: "error",
                        });
                      else
                        settoastResponse({
                          show: true,
                          message: "Incorrect Form Data, Please rectify to submit",
                          severity: "error",
                        });
                    }
                  }}
                >
                  Save
                </Button>
                <Button disabled variant="contained">
                  Save & Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
      {toastResponse.show && (
        <Toast
          show={toastResponse.show}
          severity={toastResponse?.severity}
          message={toastResponse.message}
          onClose={() => {
            settoastResponse({ show: false, message: "" });
          }}
        ></Toast>
      )}
    </>
  );
}

Form1.propTypes = {
  activeStep: PropTypes.number,
  handleSubmit: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
