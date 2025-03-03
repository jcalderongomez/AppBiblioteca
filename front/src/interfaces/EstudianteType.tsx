import { CarreraType } from "./CarreraType";

export interface EstudianteType {
  ID: number | null;
  nombre: string;
  email: string;
  carrera: CarreraType | null; // Carrera ahora es del tipo CarreraType | null
}
