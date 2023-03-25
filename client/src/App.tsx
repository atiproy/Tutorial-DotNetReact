import { useEffect, useState } from "react";
import { Product } from "./product";

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
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={AddProduct}>Add Product</button>
    </div>
  );
}

export default App;
