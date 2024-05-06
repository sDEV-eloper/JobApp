import  { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

const Post = ({jobPost}) => {
  const {companyName, jdLink, jobRole, location, logoUrl, minExp, minJdSalary, maxJdSalary, maxExp}=jobPost;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

const convertAndFormatSalary = (salaryUSD) => {
    const salaryINR = salaryUSD * 1000 ;
    const formattedSalary = ` ${salaryINR} USD`;

    return formattedSalary;
  };

  let salary = '';
  if (minJdSalary && maxJdSalary) {
    salary = `${convertAndFormatSalary(minJdSalary)} - ${convertAndFormatSalary(maxJdSalary)}`;
  } else if (minJdSalary) {
    salary = convertAndFormatSalary(minJdSalary);
  } else if (maxJdSalary) {
    salary = convertAndFormatSalary(maxJdSalary);
  }

  const convertAndFormatExperience = (experience) => {
    let formattedExperience = '';
  
    if (experience) {
      formattedExperience = `${Math.round(experience)} `;
    }
  
    return formattedExperience;
  };
  
  let experience = '';
  
  if (minExp && maxExp) {
    experience = `${convertAndFormatExperience(minExp)} - ${convertAndFormatExperience(maxExp)}  yrs`;
  } else if (minExp) {
    experience = convertAndFormatExperience(minExp);
  } else if (maxExp) {
    experience = convertAndFormatExperience(maxExp);
  }else{
    experience="Not mentioned"
  }
  

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red", marginTop: "0", marginRight: "0.5rem", border:"1px solid gray" }} variant="rounded" src={logoUrl}     />
        }
        title={companyName}
        subheader={
          <div style={{ display: 'flex', alignItems:'center'}}>
            <Typography variant="subtitle1" component="div" color="black">
             {capitalizeFirstLetter(jobRole)}
            </Typography>
            <Typography variant="subtitle1" component="div" color="black" sx={{display:"flex", alignItems:"center", marginLeft:1, marginRight:1, color:"gray"}}>
              <CircleIcon  sx={{width:4}}/>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              {location.toUpperCase()}
            </Typography>
          </div>
        }
      />
      <Typography variant="p"  component="p"  sx={{marginLeft:2, fontWeight:"medium", color:"#464646", fontSize:14 }}>
        Base Pay : {salary} 
      </Typography>


      <Typography variant="p"  component="p"  sx={{marginLeft:2, fontWeight:600,  fontSize:14,color:"#5D5D5D", }}>
        Experience Required : {experience}
      </Typography>
      <CardContent>
        <Typography variant="p"  component="p"  sx={{ fontWeight:700, color:"black", }}>
          About Us
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: expanded ? 'none' : 100, overflow: 'hidden' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint laudantium error aperiam earum, vel ratione possimus blanditiis rerum optio quaerat ab cum excepturi quae harum. Nesciunt magni eum animi excepturi, porro totam labore quia accusamus amet at veniam mollitia, saepe ut dolore dolorum, eos cumque eaque ea quas perferendis pariatur nihil. Doloribus minus explicabo dicta veniam deleniti cum expedita ex doloremque, delectus veritatis iusto odit quo eos ut optio atque. Optio perspiciatis cum molestiae earum laboriosam temporibus cumque atque mollitia reprehenderit, molestias illum architecto nam provident fugit ipsum iste soluta porro minima repudiandae, ipsam ipsa nesciunt dolor enim debitis. Repudiandae officiis facilis aliquam. Soluta nam qui ipsam delectus necessitatibus placeat, repellendus illum sequi obcaecati recusandae vero distinctio optio eius eaque veniam repudiandae odio non aliquid cum omnis. Voluptatem cumque officia velit. Accusantium alias quas quidem nostrum aut eveniet est, repellat ea aliquid id! Ducimus temporibus commodi nostrum autem. Aliquid, assumenda! Asperiores debitis, aspernatur sapiente voluptatem commodi dolores quod nobis reiciendis voluptatum repellendus ducimus odio quae, quis quia minima perspiciatis, non dolore placeat explicabo voluptas ipsum? Magni mollitia aliquam suscipit, odit nesciunt alias incidunt eius nisi quos delectus fugit officiis aut iste quasi consectetur? Porro impedit enim error dignissimos a hic dolore reprehenderit obcaecati eligendi vero placeat ipsum soluta suscipit tempore sit repudiandae molestiae minus ex illo itaque, vel unde accusantium. Optio, nam debitis? Voluptas aliquid ad optio assumenda odio perferendis maxime ipsum, explicabo voluptatibus consequuntur reprehenderit, doloremque sit? Vel aut at totam voluptates hic nisi, porro veniam incidunt magni corporis ex ipsa ut quae ducimus suscipit exercitationem voluptatum recusandae sequi quibusdam tenetur distinctio? Libero nam dolorem reiciendis, dolor veritatis sit corrupti corporis quasi! Odio pariatur quas animi ipsa reiciendis fugit voluptatem at veritatis excepturi quia accusamus ea omnis atque sed, libero quo nostrum facere sit incidunt, dolores ad doloremque nemo!
        </Typography>
        {!expanded && (
          <Typography variant="body2" >
            <span onClick={handleExpandClick} style={{  cursor: 'pointer', marginTop:6, color:"#388EFC", backdropFilter: blur(5)}}>Show more...</span>
          </Typography>
        )}


      </CardContent>
      <CardActions disableSpacing>
        <Link href={jdLink}>
        <Button   variant="contained"  sx={{margin:1, width:1}}>Apply Now</Button>
        </Link>
      </CardActions>
    </Card>
  

  
  );
};

export default Post;
