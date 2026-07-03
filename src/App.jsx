import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AddPlace from './components/AddPlace'
import Visited from './components/visited'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPlace />} />
        <Route path="/visited" element={<Visited />} />
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
