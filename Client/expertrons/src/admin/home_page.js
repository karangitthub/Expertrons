import React from 'react';
import { NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector} from 'react-redux'
import SignIn from './sign_in'

import Header from './../common_components/header'
import Footer from  './../common_components/footer'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardContentDesc: {
    textAlign: 'left'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {type:"Create",desc:"Create mentor and add tasks."},
  {type:"Fetch",desc:"Fetch/Delete/Update details of the mentor."}];

export default function HomePage(){
  const loggedIn = useSelector(state => state.login);

  return (
    <div>
      {loggedIn ? <HomePageTemp/>: <SignIn/>}
    </div>
  );
  
}

const HomePageTemp = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header/>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Aspirants – Looking For Growth
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Boost your career by interacting with AI video bots of experts recommended for you anytime and 
            landing your dream job, internship, top B-school and international university. 
            Get assistance for interview preparation, industry-specific resume, career hacks and much more.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={6} sm={3}>
                <Card className={classes.card}>
                <NavLink to={'/Mentor/' + card.type} style={{ textDecoration: 'none' }}>
                    <Button>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.type}
                        </Typography>
                          {card.desc}
                      </CardContent>
                    </Button>
                  </NavLink>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Footer />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}