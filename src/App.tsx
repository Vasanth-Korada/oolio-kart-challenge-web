import { CartProvider } from "./context/CartContext";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <header className="app-header">
          <h1>Oolio Kart</h1>
          <p>Order Food Online</p>
        </header>
        <main className="app-main">
          <ProductList />
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
