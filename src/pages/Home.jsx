import { Icon } from "@iconify/react";
//import { Link } from "react-router-dom";
import HorizontalLinearStepper from "../components/Stepper";
import { Box, Paper } from "@mui/material";
import "./../index.css";

const Home = () => {
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-4 flex items-center text-4xl font-bold">
        <Icon icon="mdi:home" className="mr-2" />
        Home
      </h1>

      <h2 className="mb-3 text-2xl">Kindly Register Yourself </h2>
      <Box className="StepperBox">
        <Paper className="StepperPaper">
          <HorizontalLinearStepper></HorizontalLinearStepper>
        </Paper>
      </Box>

      {/* <Link to="/posts" className="flex items-center text-blue-600 hover:underline">
        Posts
        <Icon icon="mdi:arrow-right" className="ml-2" />
      </Link> */}
    </div>
  );
};

export default Home;
