/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route,
} from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import UserRegister from './components/UserRegister';
import NewJob from './components/NewJob';
import LogIn from './components/LogIn';
import Index from './components/Index';
import MyJobs from './components/MyJobs';
import UpdateJob from './components/UpdateJob';
import Navbar from './components/Nav';
import brutalityTheme from './themes/brutalitytheme';

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || null);

  return (
    <Grommet
      theme={brutalityTheme}
    >
      <Router>
        <Navbar />
        <Box
          background={{
            size: 'cover',
            height: 'small',
          }}
          height="large"
        >
          <Route exact path="/" component={() => <Index userEmail={userEmail} userToken={userToken} />} />
          <Route path="/register" component={() => <UserRegister setUserEmail={setUserEmail} setUserToken={setUserToken} />} />
          <Route path="/myjobs" component={() => <MyJobs />} />
          <Route path="/updatejob/:id" component={() => <UpdateJob />} />
          <Route path="/newjob" component={NewJob} />
          <Route path="/login" component={() => <LogIn setUserEmail={setUserEmail} setUserToken={setUserToken} />} />
        </Box>
      </Router>
    </Grommet>
  );
}

export default App;
