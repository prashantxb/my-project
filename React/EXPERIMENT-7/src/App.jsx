import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StoreManager from './components/StoreManager'

export default function App() {
  const products = [
    { name: "sugar", price: 25.99, status: "In Stock" },
    { name: "ice-cream", price: 45.5, status: "Out of Stock" },
    { name: "choclate", price: 199.99, status: "In Stock" },
  ];

  return (
    <div className="app-container">
      <h2>Online store</h2>
      <div className="Online store">
        {products.map((p, idx) => (
          <StoreManager
            key={idx}
            name={p.name}
            price={p.price}
            status={p.status}
          />
        ))}
      </div>
    </div>
  );
}