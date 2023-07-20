import './App.css';
import { ToastContainer } from "react-toastify";
import { Header, Footer } from "./Components";
import { Router } from "./Config/Router";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />

    <div className='w-full max-w-[1100px] mx-auto px-2 mt-5 min-h-[80vh]'>
      <Header/>
      <Router/>
    </div>

    <Footer/>
    </>
  );
}

export default App;
