import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout as logoutReducer } from "../features/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);

  async function auth(action, formFields) {
    try {
      const response = await fetch(`http://localhost:5000/${action}`, {
        method: 'POST',
        body: JSON.stringify(formFields),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const result = await response.json();

      if (result.errors) throw new Error('Something went wrong!', { cause: result.errors });

      dispatch(login(result));
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    }

    catch (err) {
      console.error(err.cause);
      setErrors(err.cause);
    }
  }

  function logout() {
    fetch(`http://localhost:5000/logout`, { credentials: 'include' })
      .then(() => {
        dispatch(logoutReducer());
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return { auth, logout, errors }
}