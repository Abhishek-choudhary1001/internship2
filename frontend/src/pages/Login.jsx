import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = currentState === "Login" ? "login" : "register";
      const payload = currentState === "Login"
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(
          `Expected JSON, got ${contentType}. Response: ${text.slice(0, 100)}...`
        );
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Store token and user data (adjust based on your backend response)
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("userName", data.user.name || data.user.email);
      }

      alert(`${currentState === "Login" ? "Login" : "Signup"} successful!`);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(
        err.message.includes("Expected JSON")
          ? "Backend returned an error page. Check if the API endpoint exists."
          : err.message
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          required
        />
      )}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      {error && (
        <div className="w-full p-2 text-red-600 text-sm">
          {error}
        </div>
      )}
      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="px-8 py-2 mt-4 font-light text-white bg-black disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : (currentState === "Login" ? "Sign In" : "Sign Up")}
      </button>
    </form>
  );
};

export default Login;
