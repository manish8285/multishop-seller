import logo from './logo.svg';
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'
import LoginSignup from './pages/LoginSignup';
import AllOrders from './pages/AllOrders';
import DashBoard from './pages/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import Order from './pages/Order';
import ProductUpdate from './pages/ProductUpdate';
import MyProducts from './pages/MyProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Categories from './pages/Categories';
import NewProduct from './pages/NewProduct';
import Users from './pages/Users';
import Customers from './pages/Customers';

function App() {
  return (
    <HashRouter>
      <ToastContainer position='bottom-center' />
      <Routes>
      <Route path='/' element={<DashBoard />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/allorders' element={< AllOrders />} />
      <Route path='/products' element={< MyProducts />} />
      <Route path='/order/:orderId' element={<Order />} />
      <Route path='/product-edit/:productId' element={<ProductUpdate />} />
      <Route path='/login' element={< LoginSignup />} />
      <Route path='/categories' element={< Categories />} />
      <Route path='/users' element={< Users />} />
      <Route path='/customers' element={< Customers />} />
      <Route path='/newProduct' element={< NewProduct />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
