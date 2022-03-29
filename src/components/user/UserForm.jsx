import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import styles from './UserForm.module.scss';

const formFieldsInit = { name: '', email: '', password: '' };

export default function UserForm() {
  const { auth, errors } = useAuth();
  const location = useLocation();
  const userActionType = location.pathname.toLowerCase().slice(1);
  const [formFields, setFormFields] = useState(formFieldsInit);

  function handleSubmit(e) {
    e.preventDefault();
    auth(userActionType, formFields);
  }

  useEffect(() => {
    let localStoredUser = JSON.parse(localStorage.getItem('user'));
    !!localStoredUser && setFormFields(prev => ({ ...prev, email: localStoredUser.email }));

    return () => {
      setFormFields(formFieldsInit);
    }
  }, [location]);

  return (
    <form className={`form form-frame ${styles.form}`} onSubmit={handleSubmit}>

      <h2 className="page-title">
        {userActionType === 'login' ? 'Login' : 'Sign Up'}
      </h2>

      {userActionType === 'signup' &&
        <div className="form-field">
          <label htmlFor="name">Full Name:</label>
          <input className="form-input" id="name" type="text" name="name" value={formFields.name} required onChange={e => setFormFields(prev => ({ ...prev, name: e.target.value }))} />
        </div>
      }

      <div className="form-field">
        <label htmlFor="email">E-mail:</label>
        <input className="form-input" id="email" type="email" name="email" value={formFields.email} required onChange={e => setFormFields(prev => ({ ...prev, email: e.target.value }))} />
        {errors?.email && !!formFields.email &&
          <div className="form-input-error">{errors.email}</div>
        }
      </div>

      <div className="form-field">
        <label htmlFor="email">Password:</label>
        <input className="form-input" id="password" type="password" name="password" value={formFields.password} required onChange={e => setFormFields(prev => ({ ...prev, password: e.target.value }))} />
        {errors?.password && !!formFields.password &&
          <div className="form-input-error">{errors.password}</div>
        }
      </div>

      <button className='btn btn-primary btn-big'>ok</button>

      <div className={styles.question}>
        {userActionType === 'login'
          ? <>Don`t have an account? <NavLink to="/signup" className="hyperlink">Sign up now</NavLink></>
          : <>Do you have an account? <NavLink to="/login" className="hyperlink">Login here</NavLink></>
        }

      </div>
    </form>
  )
}