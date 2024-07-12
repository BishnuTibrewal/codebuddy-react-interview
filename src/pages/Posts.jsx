import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./../index.css";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    fetch("https://codebuddy.review/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPostData(data.data);
      });
  }, []);

  return (
    <>
      <Typography className="propsHeader" variant="h6">
        Lets see what people posted recently !
      </Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {postData?.map((data) => (
          <Grid item key={data.id} xs={12} md={6} lg={4}>
            <Card>
              <CardContent className="cardContect">
                <img src={data?.image} width={"100%"}></img>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {data?.writeup}
                </Typography>
                <Grid className="authorGrid">
                  <Grid className="avatarGrid">
                    <Avatar alt="Remy Sharp" src={data?.avatar} />
                  </Grid>
                  <Grid>
                    <Typography variant="h5" component="div">
                      {data?.firstName} {" " + data?.lastName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {data?.id}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
