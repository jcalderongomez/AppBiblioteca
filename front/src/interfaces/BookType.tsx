// Interfaz para el libro
export interface Book {
  id: number;
  titulo: string;
  autorId: number; // ID del autor, puede ser una relación con la interfaz Author
  fechaPublicacion: string;
  categoria: string;
  descripcion: string;
  precio: number;
  disponible: boolean; // Estado de disponibilidad del libro
}
