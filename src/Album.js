import React, {useEffect, useState, useCallback, Component} from 'react';
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
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import * as firebase from "firebase";
import firebaseConfig from './firebase.config';
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Person from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
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
  footer: {
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
     backgroundColor: '#121212',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3];


export default function Album() {
  const classes = useStyles();
  const history = useHistory();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const user = firebase.auth();
    firebase.auth().onAuthStateChanged(user => {
      history.push(user ? '/dashboard' : '/');
    })
  }, []);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },  
      }),
    [prefersDarkMode],
  );


  function onClick() {
    setTimeout(
        function() {
            try {
                firebase.auth().signOut();
                history.push('/');
            } 
            catch (e) {
                console.log(e);
            }
        }, 2000);
  }
  return (

    <ThemeProvider theme={theme}>
        <React.Fragment >
      <CssBaseline />
      <AppBar position="relative">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Microblog
                </Typography>
                <IconButton edge="start" className={classes.menuButtonProfile} color="inherit" aria-label="menu">
                    <Person />
                </IconButton>&nbsp;&nbsp;
                <Button onClick={onClick} variant="contained" color="secondary">
                    Logout
                </Button>
            </Toolbar>
     </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Book Tickets
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Write post</DialogTitle>
            <DialogContent>
            <DialogContentText>
                What's on your mind? Write a blog on something that excites you.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="content"
                label="Content"
                type="paragraph"
                fullWidth
                multiline
                rows={4}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
                Post
            </Button>
            </DialogActions>
        </Dialog>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    </ThemeProvider>
    
  );
}