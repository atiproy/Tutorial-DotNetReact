import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5262/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  function AddProduct() {
    setProducts(prevstate => [...prevstate, {
      id: prevstate.length + 101,
      name: 'product' + (prevstate.length + 1),
      price: (prevstate.length * 11),
      brand: 'some brand',
      description: 'some description',
      pictureUrl: 'http://picsum.photos/200'
    }])
  }

  return (
    <div className="App">
      <h1>Re-store</h1>
      <Catalog products={products} addProduct={AddProduct} />
      
    </div>
  );
}

export default App;
