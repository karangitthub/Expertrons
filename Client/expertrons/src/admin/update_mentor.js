import React , { useState , useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Footer from '../common_components/footer';
import Header from './../common_components/header'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import ButtonMaterial from '@material-ui/core/Button';
import queryString from 'query-string';
import { useSelector} from 'react-redux'
import SignIn from './sign_in'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  rootButton: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function UpdateMentor(props){
  const loggedIn = useSelector(state => state.login);

  const { emailId } = queryString.parse(props.location.search);

  return (
    <div>
      {loggedIn ? <UpdateMentorTemp emailId={emailId}/>: <SignIn/>}
    </div>
  );
  
}

const UpdateMentorTemp = (props) => {
  const classes = useStyles();

  const [taskList, setTaskList] = useState([{ taskName: "", startDate: "" ,endDate: ""}]);

  const [mentor, setMentor] = useState( { name: "" , email: "" , tasks : []} )

  

  useEffect( () => {
      const url = `http://localhost:3001/Mentor/${props.emailId}`;
        axios.get(url)
        .then(repos => {
            console.log('Single Fetch:'+repos.data);
            setMentor(repos.data);
            if(repos.data.tasks && repos.data.tasks.length !== 0){
                setTaskList(repos.data.tasks);
            }
        })
  },[]);

  const handleMentorInputChange = (e) => {
    var newState = {...mentor}; 
    newState[e.target.name] = e.target.value;
    setMentor(newState);
  };

  // handle input change
const handleInputChange = (event, index) => {
    event.preventDefault();
    const { name, value } = event.target;
    const list = [...taskList];
    list[index][name] = value;
    setTaskList(list);
  };
   
  // handle click event of the Remove button
  const handleRemoveClick = (event, index) => {
    event.preventDefault();
    const list = [...taskList];
    list.splice(index, 1);
    setTaskList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    setTaskList([...taskList, { taskName: "", startDate: "" ,endDate: ""}]);
  };

  const updateMentor = (event) => {

    event.preventDefault();
    const url = `http://localhost:3001/Mentor/${props.emailId}`;
    const repBodyMentor = {...mentor,tasks : taskList};
    axios.put(url, repBodyMentor).
    then( (repos) =>{
      if(repos.status == 200){
        console.log('Created successfully!');
        alert('User Updated Successfully');
      }
    }) ;

  }

    

  return (
    <React.Fragment>
    <Header/>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper} >
      <Typography component="h1" variant="h5" >
        Please Enter required details 
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="Name"
        id="name"
        autoComplete="name"
        onChange={e => handleMentorInputChange(e)}
        value={mentor.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => handleMentorInputChange(e)}
          value={mentor.email}
        />

        <div className="App">
      {taskList && taskList.map((x, i,index) => {
        return (
          <div className="box">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="taskName"
              label="Task Name"
              required
              value={x.taskName}
              onChange={e => handleInputChange(e, i)}
            />
            <TextField
            variant="outlined"
            margin="normal"
              className="ml10"
              name="startDate"
              label="Start Date"
              required
              value={x.startDate}
              onChange={e => handleInputChange(e, i)}
            />
            <TextField
            variant="outlined"
            margin="normal"
              name="endDate"
              label="End Date"
              required
              value={x.endDate}
              onChange={e => handleInputChange(e, i)}
            />
            <div className={classes.rootButton}>
            {taskList.length !== 1 && 
                <ButtonMaterial variant="contained" onClick={(e) => handleRemoveClick(e, i)}>
                    Remove Task
                </ButtonMaterial>}
            {taskList.length -1 === i && 
                <ButtonMaterial variant="contained" onClick={(e) => handleAddClick(e)}>
                    Add Task
                </ButtonMaterial>}
          </div>
          </div>
        );
      })}
 </div>
        <Button
          type="submit"
          fullWidth
          onClick={e => updateMentor(e)}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Mentor
        </Button>
      </form>
    </div>
  </Container>
  </React.Fragment>
  );
}
