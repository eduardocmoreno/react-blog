import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* 
* Blog Formulary to add/update posts
* @param  {string} props - {method ["CREATE", "UPDATE"], hash, postTitle, postBody, postId}
*/
export default function PostForm(props) {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const isUpdating = props.method === 'UPDATE';

  const [formFields, setFormFields] = useState({ title: '', body: '' });

  useEffect(() => {
    if (isUpdating) {
      setFormFields({
        title: props.postTitle,
        body: props.postBody
      })
    }
  }, [isUpdating, props]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/blog' + props.hash, {
        method: 'POST',
        body: JSON.stringify({ ...formFields, user: user.id }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const result = await response.json();

      console.log(result);

      if (result.errors) throw new Error('Something went wrong!', { cause: result.errors });

      navigate('/blog');
    }

    catch (err) {
      console.error(err.cause);
    }
  }

  return (
    <form className="container form form-frame" onSubmit={handleSubmit}>

      <h2 className="page-title">{isUpdating ? 'Edit post' : 'Create new post'}</h2>

      <div className="form-field">
        <label htmlFor="name">Title:</label>
        <input className="form-input" id="title" type="text" name="title" defaultValue={formFields.title} required onChange={e => setFormFields(prev => ({ ...prev, title: e.target.value }))} />
      </div>

      <div className="form-field">
        <label htmlFor="email">Content:</label>
        <textarea className="form-input" id="email" name="email" defaultValue={formFields.body} required onChange={e => setFormFields(prev => ({ ...prev, body: e.target.value }))} />
      </div>

      <button className='btn btn-primary btn-big'>SAVE</button>
    </form>
  )
}