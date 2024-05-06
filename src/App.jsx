import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Feed from "./components/Feed";

function App() {
  const [results, setResults] = useState([]);
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar setResults={setResults} results={results} />
      <Feed results={results} />

    </Box>
  );
}

export default App;
