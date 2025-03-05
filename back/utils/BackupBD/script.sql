
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
('Derecho', 'Estudio de las leyes y su aplicación en la sociedad.'),
('Arquitectura', 'Carrera dedicada al diseño y construcción de edificios y espacios urbanos.'),  
('Administración de Empresas', 'Carrera enfocada en la gestión, planificación y organización de empresas y negocios.'),  
('Psicología', 'Carrera que estudia el comportamiento humano y los procesos mentales.'),  
('Ingeniería Civil', 'Carrera centrada en la planificación, diseño y construcción de infraestructuras.'),  
('Contaduría Pública', 'Carrera enfocada en la gestión financiera, auditoría y contabilidad de organizaciones.'),  
('Ingeniería Mecánica', 'Carrera dedicada al diseño, desarrollo y mantenimiento de sistemas mecánicos y térmicos.'),  
('Biología', 'Carrera que estudia los seres vivos, su evolución y su relación con el entorno.'),  
('Comunicación Social', 'Carrera enfocada en los medios de comunicación, periodismo y relaciones públicas.'),  
('Diseño Gráfico', 'Carrera centrada en la creación visual, ilustración y diseño publicitario.'),  
('Ingeniería Electrónica', 'Carrera orientada al diseño y desarrollo de circuitos electrónicos y sistemas automatizados.');  

-- Crear tabla de Usuarios (estudiantes)
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

INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES
('Gabriel García Márquez', 'Colombiana', '1927-03-06'),
('Mario Vargas Llosa', 'Peruana', '1936-03-28'),
('Julio Cortázar', 'Argentina', '1914-08-26'),
('Jorge Luis Borges', 'Argentina', '1899-08-24'),
('Isabel Allende', 'Chilena', '1942-08-02'),
('Pablo Neruda', 'Chilena', '1904-07-12'),
('Carlos Fuentes', 'Mexicana', '1928-11-11'),
('Octavio Paz', 'Mexicana', '1914-03-31'),
('Miguel de Cervantes', 'Española', '1547-09-29'),
('Federico García Lorca', 'Española', '1898-06-05'),
('Rubén Darío', 'Nicaragüense', '1867-01-18'),
('Ernesto Sábato', 'Argentina', '1911-06-24'),
('Horacio Quiroga', 'Uruguaya', '1878-12-31'),
('Rómulo Gallegos', 'Venezolana', '1884-08-02'),
('Juan Rulfo', 'Mexicana', '1917-05-16'),
('Eduardo Galeano', 'Uruguaya', '1940-09-03'),
('Gabriela Mistral', 'Chilena', '1889-04-07'),
('Leopoldo Lugones', 'Argentina', '1874-06-13'),
('César Vallejo', 'Peruana', '1892-03-16'),
('José Martí', 'Cubana', '1853-01-28');


-- Crear tabla de Categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar 10 categorías de libros
INSERT INTO categorias (nombre) VALUES
('Ficción'),
('Ciencia Ficción'),
('Fantasía'),
('Historia'),
('Biografía'),
('Ciencia'),
('Negocios'),
('Autoayuda'),
('Misterio'),
('Romance');

-- Crear tabla de Libros
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    id_categoria INT NOT NULL,
    id_autor INT NOT NULL,
    anio_publicacion VARCHAR(5) NOT NULL,
    cantidad_disponible INT CHECK (cantidad_disponible >= 0),
    foreign key(id_autor) references autores(id),
    foreign key(id_categoria) references categorias(id)
);



INSERT INTO libros (titulo, id_categoria, anio_publicacion, cantidad_disponible, id_autor) VALUES 
('Cien años de soledad', 2, 1967, 5, 19),
('Harry Potter y la piedra filosofal', 3, 1997, 8, 20),
('1984', 4, 1949, 6, 21),
('Orgullo y prejuicio', 5, 1813, 4, 22),
('Don Quijote de la Mancha', 7, 1605, 3, 3),
('Las aventuras de Tom Sawyer', 2, 1876, 7, 19),
('La casa de los espíritus', 3, 1982, 5, 20),
('Kafka en la orilla', 4, 2002, 2, 21),
('El viejo y el mar', 5, 1952, 6, 22),
('La metamorfosis', 7, 1915, 4, 3);

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