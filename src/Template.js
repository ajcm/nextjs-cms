import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Footer from '../src/Footer';
import Header from '../src/Header';
import SideBar from './Sidebar';



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(1),
  },
  container:{
    marginTop: '0px',
    paddingTop: '0px'
  }
}));

const sections = [
  { title: 'Home', url: '/' },
  { title: 'CMS', url: '/cms' },

];


export default function Template(props) {
  const classes = useStyles();
  const {children,posts} = props

  return (
  
    <React.Fragment>
      <CssBaseline />
      <Container  maxWidth="md">
        <Header sections={sections}  className={classes.container}  />
        <main>  
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8} sm={9}>
             {children}
            </Grid>
            <Grid item xs={12} md={4} sm={3}>
            <SideBar posts={posts} />   
            </Grid>        
          </Grid>
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}




