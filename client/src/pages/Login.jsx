import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ email: "", password: "", role: "student" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, role, name } = res.data;

      if (!token || !role || !name) {
        console.error("Invalid response");
        return setMsg("❌ Invalid login. Try again.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      setMsg("✅ Login Successful!");

      setTimeout(() => {
        if (role === "student") navigate("/student/dashboard");
        else if (role === "faculty") navigate("/faculty/dashboard");
        else if (role === "clubhead") navigate("/club/dashboard");
        else if (role === "admin") navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
      setMsg("❌ Login failed. Check credentials.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
          animation: "slideUp 0.5s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "1.5rem",
            color: "#1e3a8a",
          }}
        >
          Welcome Back 👋
        </h2>

        {msg && (
          <div
            style={{
              color: msg.includes("✅") ? "green" : "red",
              textAlign: "center",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {msg}
          </div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />

        {/* Role dropdown */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1.2rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
          }}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="clubhead">Club Head</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: "bold",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register
          </span>
        </p>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
