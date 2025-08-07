import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMsg("✅ Registered Successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px",
          transition: "transform 0.3s ease",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "15px",
          }}
        >
          Create Account 🚀
        </h2>

        {msg && (
          <div
            style={{
              color: "#16a34a",
              textAlign: "center",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            {msg}
          </div>
        )}

        <input
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="student">🎓 Student</option>
          <option value="faculty">📘 Faculty</option>
          <option value="clubhead">🎯 Club Head</option>
          <option value="admin">🛡️ Admin</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "12px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#2563eb",
              fontWeight: "500",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

// 👇 Reusable input styling
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  transition: "box-shadow 0.2s ease",
  boxSizing: "border-box",
};

export default Register;
