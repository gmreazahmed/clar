import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, removeItem, increment, decrement } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center border p-2 mb-2 rounded">
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => decrement(item.id)} className="px-2 bg-gray-300 rounded">-</button>
                  <button onClick={() => increment(item.id)} className="px-2 bg-gray-300 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="px-2 bg-red-500 text-white rounded">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4">Total: ${total.toFixed(2)}</p>
          <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 mt-4 inline-block rounded">
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
