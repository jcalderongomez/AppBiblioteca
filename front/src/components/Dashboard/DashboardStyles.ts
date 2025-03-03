import { makeStyles } from "@mui/styles";



// Definir los estilos
export const useStyles = makeStyles((theme) => ({
    dashboardContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', /* Ocupa toda la pantalla */
        textAlign: 'center',
        background: 'linear-gradient(to right, #4facfe, #00f2fe)', /* Degradado moderno */
        color: 'White',
        fontFamily: 'Arial, sans-serif'
    },
    dashboardTitle: {
        fontsize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)'
      },

      dashboardHeader: {
        background:' rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        textAlign: 'center',
        padding: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)'
      },

      dashboardContent: {
        flex: '1', /* Hace que ocupe todo el espacio disponible */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      },

      dashboardFooter: {
        background: 'rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        padding: '10px',
        fontSize: '0.9rem',
        backdropFilter: 'blur(5px)',
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)'
      }
      
}));
