import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import { Provider } from "react-redux";
import store from "./store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Provider store={store}>
          <ToastContainer />
   <Home/>
      </Provider>
  );
}

export default App;
