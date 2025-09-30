export default function StoreManager({ name, price, status }) {
  return (
    <div className="Online store">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
}