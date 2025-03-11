const API_URL = `${API_URL}`;

const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      console.log("🔹 Token recibido:", data.token); // 👈 Verifica que el token es recibido
      localStorage.setItem("token", data.token); // Guarda el token
      return data;
    } catch (error) {
      console.error("❌ Error en authService:", error);
      throw error;
    }
  },

  getProtectedData: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No hay token en localStorage");
      throw new Error("No hay token disponible");
    }

    console.log("🔸 Enviando token:", token); // 👈 Verifica que el token se envía correctamente

    try {
      const response = await fetch(`${API_URL}/protected`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al obtener datos");

      return await response.text();
    } catch (error) {
      console.error("❌ Error en authService:", error);
      throw error;
    }
  },
};

export default authService;
