import React, { useState, useEffect } from "react";
import { UserAPI } from "../api";
import { useAuthStore } from "../store/authStore";

interface Address {
  id: string;
  line1: string;
  city: string;
  country: string;
  phone: string;
}

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({ line1: "", city: "", country: "", phone: "" });
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) return;
      try {
        const res = await UserAPI.addresses();
        setAddresses(res.data.data || []);
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchAddresses();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const res = await UserAPI.addAddress(newAddress);
      setAddresses(res.data.data || []);
      setNewAddress({ line1: "", city: "", country: "", phone: "" });
      alert("Address added successfully");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Shipping Addresses</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <input type="text" name="line1" placeholder="Address Line 1" value={newAddress.line1} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="phone" placeholder="Phone" value={newAddress.phone} onChange={handleChange} className="border p-2 rounded" />
        <button onClick={handleAdd} className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
      </div>

      <ul>
        {addresses.map((addr) => (
          <li key={addr.id} className="border p-2 mb-2 rounded">
            {addr.line1}, {addr.city}, {addr.country} - {addr.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressPage;
