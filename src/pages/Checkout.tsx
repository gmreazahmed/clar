import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { UserAPI } from "../api";

const CheckoutPage = () => {
  const cart = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!token) return alert("Please login first!");
    setLoading(true);
    try {
      await UserAPI.checkout({ items: cart });
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="border p-2 mb-2 rounded">
                {item.title} - {item.quantity} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: ${total.toFixed(2)}</p>
          <button onClick={handlePlaceOrder} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
