import React, { useContext, useState } from 'react';
import { db } from '../firebase';
import { ref as refDatabase, onValue} from 'firebase/database'; 
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {userObj, setUserObj} = useContext(UserContext);

  const handleChangeEmail = ((e) => {
    setEmail(e.target.value);
  });

  const handleChangePassword = ((e) => {
    setPassword(e.target.value);
  });

  const checkInputs =  () => {
    //DONT continue
    if (email === '' || password === '') {
      alert('Please enter all fields');
      return false;
    }
    // continue
    else {
      return true;
    }
  }

  const checkEmail =  () => {

    onValue(refDatabase(db), snapshot => {
      let data = snapshot.val();
      let emailAddress = encodeURIComponent(email).replaceAll('.','%2E')
      
      // continue
      if(data[emailAddress].email === email && data[emailAddress].password === password) {
        setUserObj( {email: email, password: password, url: data[emailAddress].url} );
        navigate('/auth');
      }
      // DONT continue
      else {
        alert('Either your email or password was incorrect. Please try again')
      }
    })
    
  }

  const handleSignIn = () => {
    if ( checkInputs() === true) {
      checkEmail();
    }
  }

  return (
    <div>
      <div>
        <h4>Sign In</h4>
      </div>
      <div>
        <input type="email" placeholder='Email' value={email} onChange={handleChangeEmail}/>
        <input type="password" placeholder='Password' value={password} onChange={handleChangePassword}/>
        <button onClick={handleSignIn}>Login</button>
      </div>
      <div style={{paddingTop:'100px'}}>
        <button onClick={() => navigate('/')} >Create Account Instead?</button>
      </div>
    </div>
  )
}

export default SignIn