import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Checkout from './components/Checkout/Checkout'
import Cart from './components/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartContextProvider } from './context/CartContext'

import { NotificationProvider} from './notification/Notification'

function App() {
  return (
    <div className="App">
      <NotificationProvider>

          <CartContextProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path='/' element={<ItemListContainer greeting="Todos nuestros productos" />}/>
                <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos de nuestra categoria" />} />
                <Route path='/detail/:productId' element={<ItemDetailContainer />} />
                <Route path='/cart' element={<Cart />}/>
                <Route path='/checkout' element={<Checkout />}/>
                <Route path='*' element={<h1>PAGE NOT FOUND 404</h1>} />
              </Routes>
            </BrowserRouter>
          </CartContextProvider>

      </NotificationProvider>
    </div>
  );
}

export default App;
