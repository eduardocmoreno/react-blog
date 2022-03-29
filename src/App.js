import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Counter from './views/Counter';
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import Home from "./views/Home";
import Todo from "./views/Todo";
import UserForm from "./components/user/UserForm";
import Posts from "./components/blog/Posts";
import Post from "./components/blog/Post";
import CreatePost from "./views/CreatePost";
import EditPost from "./views/EditPost";

import './styles/globals.scss';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/signup" element={<UserForm />} />
          <Route exact path="/login" element={<UserForm />} />

          <Route exact path="/counter" element={<Counter />} />

          <Route exact path="/todo" element={<Todo />} />

          <Route exact path="/blog" element={<Posts />} />
          <Route exact path="/blog/my-posts" element={<Posts filterByUser={true} />} />
          <Route path="/blog/post/:postId" element={<Post />} />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/blog/post/create" element={<CreatePost />} />
            <Route path="/blog/post/update/:postId" element={<EditPost />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
