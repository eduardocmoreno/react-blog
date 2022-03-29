import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "./Posts.module.scss";

export default function PostControls({ postId }) {
  const user = useSelector(s => s.user);
  const navigate = useNavigate()
  const location = useLocation()
  

  function deletePost() {
    fetch(process.env.REACT_APP_API_URL + `/blog/post/delete/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ user: user.id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(result => {
        console.log(result);
        navigate('/blog', { replace: true });
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={styles.controls}>
      <Link to={`/blog/post/update/${postId}`} className="btn btn-primary">
        <FontAwesomeIcon icon={faEdit} />
      </Link>
      <button className="btn btn-error" title="Delete post! ARE YOU SURE?" onClick={deletePost}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}