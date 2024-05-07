import { Box, Stack, Skeleton } from "@mui/material";
import Post from "./Post";
import DataNotFound from "./DataNotFound";

const Feed = ({ results, loading }) => {

  return (
<Box flex={4} p={{ xs: 0, md: 2 }} marginTop={{ xs: 20, md: 10 }}>
  {console.log(loading, results.length)}
  {loading && (results && results.length === 0) ? (
 
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
