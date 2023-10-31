import BlogPage from "./Components/BlogPage";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";
function App() {
  const isSignedIn = useSelector((state)=> state.user.isSignedIn)
  return (
    <div className="App">
      <Navbar/>
     <HomePage/>
     {isSignedIn && <BlogPage/>}
    </div>
  );
}

export default App;
