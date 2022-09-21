import React, { useContext, useState } from 'react';
import { storage, db } from '../firebase';
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { set, ref as refDatabase, onValue} from 'firebase/database'; 
import { uid } from 'uid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

  // USE MODULE LEVEL SCOPE SO WE CAN ACCESS AFTER FUNC
  let data;


const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();
  // const [allUsers, setAllUsers] = useState();
  const navigate = useNavigate();
  // const [dbEmpty, setDbEmpty] = useState();
  const [shouldCreateUser, setShouldCreateUser] = useState();
  // const [userObj, setUserObj] = useState();

  const {userObj, setUserObj} = useContext(UserContext);

  const handleChangeImage = ((e) => {
    if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/webp') {
      setImage(e.target.files[0])
    }
    else {
      e.target.value = null;
      alert('Please try again. Only jpeg, jpg, png, and webp file types are allowed.')
      
    }
  });

  const handleChangeEmail = ((e) => {
    setEmail(e.target.value);
  });

  const handleChangePassword = ((e) => {
    setPassword(e.target.value);
  });

  const handleTotalUser = () => {
    if ( checkInputs() === true) {
      checkEmail();
    }
  }

  const checkInputs =  () => {
    
    //DONT continue
    if (email === '' || password === '' || image === null ) {
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
      data = snapshot.val();
      let emailAddress = encodeURIComponent(email).replaceAll('.','%2E')
      
      // continue
      if(data[emailAddress] === undefined) {
        setShouldCreateUser(true);
      }
      // DONT continue
      else {
        setShouldCreateUser(false);
      }
    })
  }

  useEffect(() => {

    const storageDatabase = () => {
      const uuidImg = uid();
      const imgRef = refStorage(storage, uuidImg);
      uploadBytes(imgRef, image)
        .then(() => {
          getDownloadURL(imgRef)
            .then((url) => {
              
              setUrl(url);
              setUserObj( {email: email, password: password, url: url} );
              set(refDatabase(db, `/${encodeURIComponent(email).replaceAll('.','%2E')}`), {
                email: email,
                password: password,
                url: url 
              });
              // move to auth screen
              navigate('/auth');
            })
            .catch(error =>{
              console.log(error.message, 'error for url')
            });
        })
        .catch(error =>{
          console.log(error.message)
        });
    };

    if(shouldCreateUser === true) {
      storageDatabase();
    }
    else if (shouldCreateUser === false) {
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCreateUser])

  return (
    <div>
      <div>
        <h4>Sign Up</h4>
      </div>
      <div>
        <input type="email" placeholder='Email' value={email} onChange={handleChangeEmail}/>
        <input type="password" placeholder='Password' value={password} onChange={handleChangePassword}/>
        <input type="file" name="submitFile" onChange={handleChangeImage} accept=".jpg,.jpeg,.png,.webp" />
        <button onClick={handleTotalUser}>Create Account</button>
      </div>
      <div style={{paddingTop:'100px'}}>
        <button onClick={() => navigate('/signin')} >Signin Instead?</button>
      </div>
    </div>
  )
}

export default SignUp