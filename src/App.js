import { createContext, useCallback, useContext, useState } from 'react';
import './App.css';
import Layout from './components/Layout';

const context = createContext()

function App() {

  const [data, setData] = useState({ img: "", name: "" })
  const [err, setError] = useState(false)
  const [cameraMode, setCameraMode] = useState(false);
  const handleCameraMode = () => {
    setCameraMode(!cameraMode)
  }
  // to handle changes in data
  const handleData = useCallback((key, value) => {
    if (key === "name") {
      setError(true);
      return
    }
    setData({ ...data, [key]: value })
  }, [data])

  return (
    <div className="App">
      <context.Provider value={{ data, handleData, err, cameraMode, handleCameraMode }}>
        <Layout />
      </context.Provider>
    </div>
  );
}

export default App;

export const GetContext = () => {
  return useContext(context)
}
