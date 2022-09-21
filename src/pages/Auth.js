import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const {userObj} = useContext(UserContext);
  const navigate = useNavigate();

  if(userObj === undefined) {
    return (
    <div>
      <p>Access denied ... Nothing to see here</p> 
      <button onClick={() => navigate('/signin')}>Try Signing in?</button>
    </div>
    )
  }

  return (
    <div>
      <div>
        <h4>Authenticated</h4>
      </div>
      <div>
        <p>{userObj.email}</p>
        <img style={{width:'100px', height: '100px'}} src={userObj.url} alt="" />
      </div>
    </div>
  )
}

export default Auth