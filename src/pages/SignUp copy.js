import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { set, ref as refDatabase, onValue} from 'firebase/database'; 
import { uid } from 'uid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

  // USE MODULE LEVEL SCOPE SO WE CAN ACCESS AFTER FUNC
  let data;


const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();
  const [allUsers, setAllUsers] = useState();
  const navigate = useNavigate();
  const [dbEmpty, setDbEmpty] = useState();
  const [shouldCreateUser, setShouldCreateUser] = useState();
  const [userObj, setUserObj] = useState();

  const handleChangeImage = ((e) => {
    setImage(e.target.files[0])
  });

  const handleChangeEmail = ((e) => {
    setEmail(e.target.value);
  });

  const handleChangePassword = ((e) => {
    setPassword(e.target.value);
  });


  const handleCreateUser = (e) => {

    // does this email address alrady exist? if so store values and modify flag
    onValue(refDatabase(db), snapshot => {
      data = snapshot.val();
      let emailAddress = encodeURIComponent(email).replaceAll('.','%2E')
      console.log(emailAddress)
      
      if(data[emailAddress] === undefined) {
        console.log('creating new user')
        setUserObj(data[emailAddress]);
        setShouldCreateUser(true);
      }
      else {
        console.log('user already exists')
        setShouldCreateUser(false);
      }
    })

    // are the inputs filled out?
    if (email === '' || password === '' || image === null ) {
      alert('Please enter all fields');
      // console.log('NO!');
      return;
    }

    
  


    // should user be created based on what we got back from database?
    if (shouldCreateUser === false) {
      console.log('i just excecuted', shouldCreateUser)
      alert('User with this email address already exists');
      return;
    }

    
    
    // if the first two coniditons were not hit, proceed.
    const uuidImg = uid();
    // const uuidUser = uid();

    const imgRef = refStorage(storage, uuidImg);
    uploadBytes(imgRef, image)
      .then(() => {
        getDownloadURL(imgRef)
          .then((url) => {

            setUrl(url);
            set(refDatabase(db, `/${encodeURIComponent(email).replaceAll('.','%2E')}`), {
              email: email,
              password: password,
              url: url
            });
            
            // move to auth screen
            // navigate('/auth');
          })
          .catch(error =>{
            console.log(error.message, 'error for url')
          });
      })
      .catch(error =>{
        console.log(error.message)
      });
  };    
        
    
 

  return (
    <div>
      <input type="email" placeholder='Email' value={email} onChange={handleChangeEmail}/>
      <input type="password" placeholder='Password' value={password} onChange={handleChangePassword}/>
      <input type="file" name="submitFile" onChange={handleChangeImage}/>
      <button onClick={handleCreateUser}>Create</button>
      <img src={url} style={{width:'100px', height:'100px'}} alt=""/>
    </div>
  )
}

export default SignUp