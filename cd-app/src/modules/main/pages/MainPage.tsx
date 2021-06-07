import { Typography, Container, Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import React from "react";
import Image from '../../../images/mainPagePaperBackground.png';

export interface MainPageProps {}

const styles = {
   paperContainer: {
       backgroundImage: `url(${Image})`,
       backgroundPosition: 'center',
       minHeight: "400px",
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
       color: "white",  
       Text: "center",
       margin: "0 !important",
       padding: "0 !important"
   },
};

const MainPage = () => {
   return (
      <Container>
         <Paper style={styles.paperContainer}>
            <Grid container alignContent="center" justify="center" alignItems="center">
               <Typography variant="h1">Witaj na stronie głównej!</Typography>
            </Grid>          
         </Paper>
      </Container>
   );
};

export default MainPage;
