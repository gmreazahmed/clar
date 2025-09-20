import { useState } from "react";
import { AuthAPI } from "../api";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await AuthAPI.login(email, password);
      const token = res.data?.data?.token;
      if (token) {
        setToken(token);
        alert("Login successful");
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
