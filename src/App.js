import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './component/Header';
import SignInForm from './component/SignInForm';
import SignUpForm from './component/SignUpForm';


function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <SignInForm />
      <SignUpForm />
      </Router>
    </div>
  );
}

export default App;
