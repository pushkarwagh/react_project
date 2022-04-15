import React, { useState }  from 'react';
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../operation/operations';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [ user, setUser ] = useState({
      email:'',
      password:''
  });
  
  const onChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setUser({ ...user, [name] :value })
     console.log("onchange-->", user);
  };

  const onSubmit = (e) =>{
    e.preventDefault();

    if(user.email !== '' && user.password !== '') {
        dispatch(loginUser(user))
        navigate('/user')
    }
    else{
        alert("fields can't be empty")
    }
    setUser({
        email:'',
        password:''
    });
  }

  return (
        <div className='container border border-radius'>
            <div className='header text-center text-secondary'> Log_IN </div>
                <form className='form-wrapper my-2 w-50 m-auto ' onSubmit={onSubmit}> 
                    <div className='email'>
                        <div className='label'>
                           <label>Email:</label>
                        </div>
                        <input className='input'
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={user.email}
                            onChange={onChange}
                        />

                    </div>

                    <div className='password'>
                        <div className='label'>
                          <label>Password:</label>
                        </div>
                        <input className='input'
                            type='password'
                            placeholder='Pasword'
                            name='password'
                            value={user.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='button my-2'>
                        <button 
                            className='submit btn-warning'
                            type='submit' 
                        >
                             <FaSignInAlt/> LOGIN
                        </button>
                    </div>
                   
                </form>
            
        </div>
    );
}

export default Login;