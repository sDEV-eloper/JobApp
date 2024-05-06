
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function DataNotFound() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  width:"80vw" }} m={{ xs: 0, md: 2 }} margin={{xs:20, md:10}}>
      <Card sx={{ bgcolor:"#FFDFDF"}}>
        <CardContent>
          <Typography sx={{ fontSize: 48, fontWeight:"bold" }} color="text.secondary" gutterBottom>
            Job Not Found!
          </Typography>
          
          <Typography variant="body2" sx={{textAlign:'center'}}>
            Search for another one!
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
