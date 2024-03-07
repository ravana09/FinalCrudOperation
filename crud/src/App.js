import {BrowserRouter, Routes , Route} from "react-router-dom";
import Home from "./components/home";
import Add from "./components/add";
import Update from "./components/update";
import NavBar from "./components/navBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
     <BrowserRouter>
     <Routes>

      <Route  path="/" element={<Home />}/>
      <Route  path="/add" element={<Add />}/>
      <Route  path="/update" element={<Update />}/>

     </Routes>
     </BrowserRouter>
     
    </div> 
  );
}

export default App;
