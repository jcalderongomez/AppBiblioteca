const API_URL = "http://localhost:5000/api";

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

      // Verifica que la respuesta sea JSON
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return data;
      } catch (error) {
        throw new Error("Respuesta del servidor no es JSON válido: " + text);
      }

    } catch (error) {
      console.error("❌ Error en authService:", error);
      throw error;
    }
  },
};

export default authService;
