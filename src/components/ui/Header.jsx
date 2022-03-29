import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUserPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.scss';

export default function Header() {
  const user = useSelector(state => state.user);
  const { logout } = useAuth();

  return (
    <header className={styles.root}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logo}>
          <FontAwesomeIcon icon={faReact} className={styles.icon} /> MERN Project
        </Link>
        <nav>
          <Link to="/counter">counter</Link>
          <Link to="/todo">todo</Link>
          <Link to="/blog">blog</Link>
          {!user.name ?
            <>
              <Link to="/signup" className={styles.login}><FontAwesomeIcon icon={faUserPlus} /> signup</Link>
              <Link to="/login" className={styles.login}><FontAwesomeIcon icon={faRightToBracket} /> login</Link>
            </>
            :
            <>
              <Link to="/blog/my-posts">my posts</Link>
              Hi, {user.name}
              <button className="btn btn-error" onClick={() => logout()}><FontAwesomeIcon icon={faRightFromBracket} /> logout</button>
            </>
          }
        </nav>
      </div>
    </header>
  )
}