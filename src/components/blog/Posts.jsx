import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostControls from './PostControls';
import styles from './Posts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function Posts({ filterByUser }) {
  const user = useSelector(s => s.user);

  let fetchURL = process.env.REACT_APP_API_URL + `/blog/posts`;

  if (filterByUser) {
    fetchURL += `/${user.id}`
  }

  const { data: posts, isLoading } = useFetch(fetchURL);

  function snipString(string, qty) {
    return string.split(' ').slice(0, qty).join(' ') + '...' || '';
  }

  return (
    <div className="container">
      <div className="page-title-wrapper">
        <h2 className="page-title">{filterByUser ? 'My Posts' : 'All posts'}</h2>
        {user.email && <Link to={`/blog/post/create`} className="btn btn-primary"><FontAwesomeIcon icon={faFileCirclePlus} />Create new post</Link>}
      </div>


      {isLoading
        ? <div>loading...</div>
        : <>
          {!posts?.length
            ? <div>No posts found! {!!user.email && 'Please, create one!'}</div>
            : <div className={styles.posts}>
              {posts?.map(({ _id, title, body, updatedAt, author }) => {
                return (
                  <div className={styles.post} key={_id}>
                    <Link to={`/blog/post/${_id}`}>
                      <h3>{title}</h3>
                      <p><i>{snipString(body, 10)}</i></p>
                    </Link>

                    <div className={styles.footer}>
                      <small>Author: {author.name}</small>
                      <small>Date: {new Date(updatedAt).toLocaleDateString()}</small>
                      {(user.id === author._id) &&
                        <PostControls postId={_id} />
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          }

        </>
      }
    </div>
  )
}