const API_URL = `${API_URL}`; // Asegúrate de que la URL sea correcta

const login = async (email, password) => {
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

    return await response.json();
  } catch (error) {
    console.error("❌ Error en authService:", error);
    throw error;
  }
};

export default { login };
