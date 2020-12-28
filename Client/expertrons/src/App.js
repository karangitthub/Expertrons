import React , { Suspense } from 'react';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';
import MainPage from './main_page';
import HomePage from './admin/home_page'
import SignIn from './admin/sign_in'
import CreateMentor from './admin/create_mentor'
import FetchMentor from './admin/fetch_mentor'
import UpdateMentor from './admin/update_mentor'

function App() {
  return (
      <div className="App">
        <header className="App-header">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact component={MainPage}/>
            <Route path="/HomePage" exact component={HomePage}/>
            <Route path="/Login" component={SignIn}/>
            <Route path="/Mentor/Create" component={CreateMentor}/>
            <Route path="/Mentor/Fetch" component={FetchMentor}/>
            <Route path="/Mentor/Update" component={UpdateMentor}/>
          </Suspense>
        </Router>
        </header>
      </div>
  );
}

export default App;
