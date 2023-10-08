import { createContext, useContext, useState } from 'react';
import './App.css';
import Layout from './components/Layout';

const context = createContext()

function App() {

  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || { img: "", name: "" })
  const [camera, setCamera] = useState();
  const [cameraMode, setCameraMode] = useState(false);
  const handleCameraMode = () => {
    setCameraMode(!cameraMode)
    localStorage.setItem("data", JSON.stringify(data))
  }

  // to handle changes in data
  const handleData = (key, value) => {
    setData(() => { return { ...data, [key]: value } })
    localStorage.setItem("data", JSON.stringify(data))
  }

  return (
    <context.Provider value={{ data, handleData, setCamera, camera, cameraMode, handleCameraMode }}>
      <Layout />
    </context.Provider>
  );
}

export default App;

export const GetContext = () => {
  return useContext(context)
}
