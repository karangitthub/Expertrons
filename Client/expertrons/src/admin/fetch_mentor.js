import axios from 'axios';
import React , { useState , useEffect } from 'react';
import Footer from '../common_components/footer';
import Header from './../common_components/header'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector} from 'react-redux'
import SignIn from './sign_in'
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { mentorDetails } from './../actions/mentorAction'

const useStyles = makeStyles((theme) => ({
    rootButton: {
      "& > *": {
        margin: theme.spacing(1)
      }
    }
  }));

  export default function FetchMentor(){
    const loggedIn = useSelector(state => state.login);
  
    return (
      <div>
        {loggedIn ? <FetchMentorTemp/>: <SignIn/>}
      </div>
    );
    
  }

const FetchMentorTemp = () => {

    const classes = useStyles();
    const [mentorList, setMentorList] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>{
            const url = `http://localhost:3001/Mentor`;
            axios.get(url).then( (repos) =>{
            console.log('Response:'+ repos.data);
            if(repos.status == 200){
                console.log('Fetched successfully!');
                var result = [];
                for(var i in repos.data)
                    result.push(repos.data[i]);
                console.log(result);
                setMentorList(result);
                dispatch(mentorDetails(result));
                
            }
        });
    },[]);


    const handleDeleteMentor = (email,index,event) => {
        event.preventDefault();
        const url = `http://localhost:3001/Mentor/${email}`;
            axios.delete(url).then( (repos) =>{
            console.log('Response:'+ repos.data);
            if(repos.status == 200){
                console.log('Deleted successfully!');
                const list = [...mentorList];
                list.splice(index, 1);
                setMentorList(list);
            }
        })
      };

      const handleUpdateMentor = (email) => {
        history.push(`/Mentor/Update?emailId=${email}`);
      };

    return (
        <div>
            <Header/>

            
            {  
                mentorList &&  mentorList.map((mentor, index) => {
                        return (<div className={classes.rootButton}>
                            <Typography variant="h5"  paragraph>
                                {index+1}. Email : {mentor.email} 
                            </Typography>
                            <Typography variant="h5" paragraph>
                                Name : {mentor.name}
                            </Typography>
                            {
                                mentor.tasks && mentor.tasks.length > 0 &&
                                    <Typography variant="h5" paragraph>
                                        Tasks:
                                    </Typography>
                            }
                            <ul>
                            {   
                                mentor.tasks && mentor.tasks.map( (task, index) => {
                                    return ( 
                                            <li> 
                                                {task.taskName && <Typography variant="h5" paragraph>
                                                    Task Name : {task.taskName}
                                                </Typography>}
                                                {task.startDate && <Typography variant="h5" paragraph>
                                                    Start Date :{task.startDate}
                                                </Typography>}
                                            {task.startDate && <Typography variant="h5" paragraph>
                                                End Date : {task.startDate}
                                            </Typography>}
                                            </li>
                                        );
                                })
                            }
                            </ul>
                            <Button variant="contained" onClick={e => handleDeleteMentor(mentor.email,index,e)}>Delete</Button>
                            <Button variant="contained" onClick={() => handleUpdateMentor(mentor.email)}>Update</Button>
                        </div>);
                    }
                )
            }
        </div>
    )
}

