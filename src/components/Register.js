import React, { useState }  from 'react';
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../operation/operations';

function Register() {
  const dispatch = useDispatch();
  
  const [ user, setUser ] = useState({
      name:'',
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
    if(user.name !== '' || user.email !== '' || user.password !== '') {
       console.log("register_user--",user);
        dispatch(register(user))
    }
    else{
        alert("fields can't be empty")
    }
    setUser('');
  }

  return (
        <div className='container my-2 border'>
             <div className='header text-center text-secondary'> Register_User </div>
                <form className='form-wrapper my-2 w-50 m-auto' onSubmit={onSubmit}>
                <div className='name'>
                    <div className='label'>
                      <label>Name:</label>
                    </div>
                        <input className='input'
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={user.name}
                            onChange={onChange}
                        />

                    </div>

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
                          // onClick={() => onSubmit(user)} 
                        >
                          <FaSignInAlt/> Register
                        </button>
                    </div>

                    <div className='link' >
                        <p> Have an account? then   
                        <Link 
                          to='/login' 
                          className='text-info ms-1' 
                          style={{textDecoration:'none'}}
                        > 
                          log_IN 
                        </Link>
                        </p>
                    </div>

                </form>
            
        </div>
    );
}

export default Register;