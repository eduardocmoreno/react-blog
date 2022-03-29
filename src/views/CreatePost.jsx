import PostForm from "../components/blog/PostForm";

export default function CreatePost() {
  return (
    <>
      <PostForm {...{ method: 'CREATE', hash: '/add' }} />
    </>
  )
}