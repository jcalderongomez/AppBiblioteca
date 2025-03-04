
CREATE TABLE users_app(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'usuario', -- Puede ser 'admin' o 'usuario'
    creado_en TIMESTAMP DEFAULT NOW()
);

INSERT INTO users_app (nombre, email, password_hash, rol) 
VALUES ('Admin', 'admin@example.com', '$2a$10$tYsmzZ5UbfOLQMHxfjkU8emFzbtOewkVMg6vARZiA4st7kfOE6zly', 'admin');



-- Crear tabla de Carreras con descripción
CREATE TABLE carreras (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);
-- Insertar carreras con descripción
INSERT INTO carreras (nombre, descripcion) VALUES
('Ingeniería de Software', 'Estudio de desarrollo de aplicaciones y sistemas informáticos.'),
('Medicina', 'Formación en diagnóstico, tratamiento y prevención de enfermedades.'),
('Derecho', 'Estudio de las leyes y su aplicación en la sociedad.');

-- Crear tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_carrera INT REFERENCES carreras(id) ON DELETE SET NULL
);

-- Insertar usuarios con su carrera asociada
INSERT INTO usuarios (nombre, email, telefono, id_carrera) VALUES
('Juan Pérez', 'juan@example.com', '123456789', 1),
('María Gómez', 'maria@example.com', '987654321', 2);
    
-- Crear tabla de Autores
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50),
    fecha_nacimiento DATE
);

INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES
('Gabriel García Márquez', 'Colombiano', '1927-03-06'),
('J.K. Rowling', 'Británica', '1965-07-31');


-- Crear tabla de Libros
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    id_autor INT REFERENCES autores(id) ON DELETE SET NULL,
    anio_publicacion INT,
    genero VARCHAR(50),
    cantidad_disponible INT CHECK (cantidad_disponible >= 0)
);

INSERT INTO libros (titulo, id_autor, anio_publicacion, genero, cantidad_disponible) VALUES
('Cien años de soledad', 1, 1967, 'Realismo mágico', 5),
('Harry Potter y la piedra filosofal', 2, 1997, 'Fantasía', 3);


-- Crear tabla de Préstamos
CREATE TABLE prestamos (
    id SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE,
    id_libro INT REFERENCES libros(id) ON DELETE CASCADE,
    fecha_prestamo DATE DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    estado VARCHAR(20) DEFAULT 'Prestado' CHECK (estado IN ('Prestado', 'Devuelto'))
);

INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado) VALUES
(1, 1, '2025-03-01', NULL, 'Prestado'),
(2, 2, '2025-03-02', '2025-03-10', 'Devuelto');	