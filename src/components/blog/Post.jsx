import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import styles from './Posts.module.scss';
import PostControls from './PostControls';

export default function Post() {
  const user = useSelector(s => s.user);
  const { postId } = useParams();

  const { data: post, isLoading } = useFetch(process.env.REACT_APP_API_URL + `/blog/post/${postId}`);

  return (
    <div className='container'>
      {isLoading && <div>loading...</div>}

      {(!isLoading && !!post?._id)
        ?
        <>
          <div className='page-title-wrapper'>
            <h1 className='page-title'>{post.title}</h1>
            {(user.id === post.author._id) &&
              <PostControls postId={postId} />
            }
          </div>

          <div className={styles.info}>
            <small>Author: {post.author.name}</small>
            <small>Date: {new Date(post.updatedAt).toLocaleDateString()}</small>
          </div>

          <p>{post.body}</p>
        </>
        :
        <div>Oops, post not found!! <Link to="/blog/posts" className='hyperlink'>back to posts</Link></div>
      }
    </div>
  )
}