import { makeStyles } from "@mui/styles";



// Definir los estilos
export const useStyles = makeStyles((theme) => ({
  body: {
    marginBottom: '16px', // Estilo para el campo de texto
    padding: '8px',
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px", // Estilo para el formulario
  },
  button: {
    marginTop: "16px", // Estilo para el botón
  },
}));
