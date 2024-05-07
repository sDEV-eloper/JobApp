import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Feed from "./components/Feed";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading]=useState(true)
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar setResults={setResults} results={results} setLoading={setLoading} />
      <Feed results={results} loading={loading} />

    </Box>
  );
}

export default App;
