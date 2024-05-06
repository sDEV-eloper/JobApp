import { Box, Stack, Skeleton } from "@mui/material";
import Post from "./Post";
import DataNotFound from "./DataNotFound";
import { useEffect, useState } from "react";

const Feed = ({ results }) => {
  const [jobPost, setJobPost] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setJobPost((prev) => [...prev, ...results]);
  };

  useEffect(() => {
    getData();
    setLoading(false);
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
  return (
<Box flex={4} p={{ xs: 0, md: 2 }} marginTop={{ xs: 20, md: 10 }}>
  {loading ? (
 
    <Stack
      spacing={1}
      marginLeft={{ xs: 0, md: 10 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80vw",
      }}
    >
      <Skeleton variant="text" height={100} width={1100} />
      <Skeleton variant="text" height={20} width={1100} />
      <Skeleton variant="text" height={20} width={1100} />
      <Skeleton variant="rectangular" height={300} width={1100} />
    </Stack>
  ) : results.length > 0 ? (
    // Display results
    <>
      {results.map((jobPost, index) => (
        <Post key={index} jobPost={jobPost} />
      ))}
    </>
  ) : (
  
    <DataNotFound />
  )}
</Box>


  );
};

export default Feed;
