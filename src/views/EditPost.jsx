import { useParams } from "react-router-dom";
import PostForm from "../components/blog/PostForm";
import { useFetch } from "../hooks/useFetch";

export default function EditPost() {
  const { postId } = useParams();
  const { data: post } = useFetch(process.env.REACT_APP_API_URL + '/blog/post/' + postId);

  return (
    <>
      <PostForm {...{ method: 'UPDATE', hash: `/post/update/${postId}`, postTitle: post?.title, postBody: post?.body, postId: postId }} />
    </>
  )
}