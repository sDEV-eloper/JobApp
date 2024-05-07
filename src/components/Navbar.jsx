import {
  AppBar,
  Autocomplete,
  styled,
  TextField,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 4,
});

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: 150,
  borderRadius: 1,
  bgcolor: "white",
  "& .MuiInputBase-input": {
    fontSize: "0.8rem",
  },
}));

const Navbar = ({ setResults, results, setLoading }) => {
  const [allData, setAllData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBasePay, setSelectedBasePay] = useState(null);
  const [job, setJob] = useState();
  const [location, setLocation] = useState();
  const [company, setCompany] = useState();
  const [experience, setExperience] = useState();
  const [pay, setPay] = useState();

  const [page, setPage] = useState(1);
  const perPage = 500;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
          limit: perPage,
          offset: (page - 1) * perPage,
          ...results,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body,
        };

        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const data = await response.json();
        setLoading(false);
        setResults((prevJobLists) =>
          page === 1 ? data?.jdList : [...prevJobLists, ...results]
        );
        setAllData(data?.jdList);

        const uniqueJobRoles = [
          ...new Set(data?.jdList?.map((job) => job?.jobRole)),
        ];
        const uniqueJobLocations = [
          ...new Set(data?.jdList?.map((job) => job?.location)),
        ];
        const uniqueCompany = [
          ...new Set(data?.jdList?.map((job) => job?.companyName)),
        ];
        const uniqueExperience = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const uniquePay = [
          ...new Set(data?.jdList?.map((job) => job?.minJdSalary)),
        ];
        const uniquePayUSD = uniquePay
          ?.filter((salaryINR) => salaryINR !== null)
          .map((salaryINR) => `${salaryINR * 1000} USD`);

        setJob(uniqueJobRoles);
        setLocation(uniqueJobLocations);
        setCompany(uniqueCompany);
        setExperience(uniqueExperience);
        setPay(uniquePayUSD);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    console.log("ad", allData);
    const filteredResults = allData.filter((result) => {
      const basePayInUSD = result.minJdSalary * 1000 + " USD";

      return (
        (result.jobRole === selectedJob || !selectedJob) &&
        (result.location === selectedLocation || !selectedLocation) &&
        (result.minExp === selectedExperience || !selectedExperience) &&
        (basePayInUSD === selectedBasePay || !selectedBasePay) &&
        (result.companyName === selectedCompany || !selectedCompany)
      );
    });

    // Update filtered results
    setResults(filteredResults);
  }, [
    selectedJob,
    selectedExperience,
    selectedCompany,
    selectedLocation,
    selectedBasePay,
  ]);

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#F1F1F1" }}>
      <StyledToolbar sx={{ padding: 2 }}>
        <StyledAutocomplete
          id="combo-box-demo"
          options={job}
          value={selectedJob}
          onChange={(event, newValue) => {
            setSelectedJob(newValue);
          }}
          sx={{
            bgcolor: selectedJob !== null ? "#bbdefb" : "white",
          }}
          renderInput={(params) => (
            <TextField {...params} label="Job" size="small" />
          )}
        />

        <StyledAutocomplete
          id="combo-box-demo"
          options={experience}
          onChange={(event, newValue) => {
            setSelectedExperience(newValue);
          }}
          sx={{
            bgcolor: selectedExperience !== null ? "#bbdefb" : "white",
          }}
          renderInput={(params) => (
            <TextField {...params} label="Experience" size="small" />
          )}
        />
        <StyledAutocomplete
          id="combo-box-demo"
          options={company}
          onChange={(event, newValue) => {
            setSelectedCompany(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Company" size="small" />
          )}
        />
        <StyledAutocomplete
          id="combo-box-demo"
          options={location}
          onChange={(event, newValue) => {
            setSelectedLocation(newValue);
          }}
          sx={{
            bgcolor: selectedLocation !== null ? "#bbdefb" : "white",
          }}
          renderInput={(params) => (
            <TextField {...params} label="Location" size="small" />
          )}
        />

        <StyledAutocomplete
          id="combo-box-demo"
          options={pay}
          onChange={(event, newValue) => {
            setSelectedBasePay(newValue);
          }}
          sx={{
            bgcolor: selectedBasePay !== null ? "#bbdefb" : "white",
          }}
          renderInput={(params) => (
            <TextField {...params} label="Minimum Base Pay" size="small" />
          )}
        />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
