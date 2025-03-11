import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Clave123");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("📤 Enviando credenciales:", { email, password });
      const response = await authService.login(email, password);

      if (!response || !response.token) {
        throw new Error("Respuesta inválida del servidor");
      }

      console.log("📡 Respuesta del servidor:", response);

      // Guardar token en localStorage
      localStorage.setItem("token", response.token);

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error en login:", error);
      setError(error.message || "Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              //value="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"  // 🔹 Corregido de "text" a "password"
              className="form-control"
              value={password}
              //value="Clave123"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
