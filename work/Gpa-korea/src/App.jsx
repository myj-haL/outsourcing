import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import OrderForm from './pages/OrderForm';
import OrderList from './pages/OrderList';
import PointCharge from './pages/PointCharge';
import Faq from './pages/Faq';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<OrderForm />} />
      <Route path="/orderlist" element={<OrderList />} />
      <Route path="/pointcharge" element={<PointCharge />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  )
}

export default App
