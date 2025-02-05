import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UpdateBook from './components/UpdateBook';

function App() {

  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="updateBook/:id" element={ <UpdateBook />} />
        </Routes>
      </BrowserRouter>
    </>
  )

};

export default App;