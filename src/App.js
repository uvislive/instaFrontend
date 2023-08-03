import './App.css';
import Navbar from "../src/components/Navbar"
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from "../src/reducer/userReducer"
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const Routing = () => {

  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (user) {
      dispatch({ type: "USER", payload: user })
      // navigate("/")
    }
    else {
      navigate("/signin")
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/home' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/createpost' element={<CreatePost />} />

    </Routes>
  )
}



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1 className=" this text-black text-5xl">Welcome to the uvgram.com</h1>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
