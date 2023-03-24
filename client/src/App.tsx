import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { name: "p1", price: 1.00 },
    { name: "p1", price: 11.00 }
  ])

  useEffect(()=>{
    fetch('https://localhost:7235/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])

  function AddProduct() {
    setProducts(prevstate => [...prevstate, { name: "p" + (prevstate.length + 1), price: (prevstate.length * 11) }])
  }

  return (
    <div className="App">
      <h1>Re-store</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={AddProduct}>Add Product</button>
    </div>
  );
}

export default App;
