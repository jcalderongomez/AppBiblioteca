PGDMP  #                     }            appBiblioteca    17rc1    17rc1 6    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            3           1262    184159    appBiblioteca    DATABASE     �   CREATE DATABASE "appBiblioteca" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Latin America.1252';
    DROP DATABASE "appBiblioteca";
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            4           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            �            1259    184213    autores    TABLE     1  CREATE TABLE public.autores (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    biografia text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);
    DROP TABLE public.autores;
       public         heap r       postgres    false    4            �            1259    184212    autores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.autores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.autores_id_seq;
       public               postgres    false    222    4            5           0    0    autores_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.autores_id_seq OWNED BY public.autores.id;
          public               postgres    false    221            �            1259    184187    carreras    TABLE     |   CREATE TABLE public.carreras (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text
);
    DROP TABLE public.carreras;
       public         heap r       postgres    false    4            �            1259    184186    carreras_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carreras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.carreras_id_seq;
       public               postgres    false    220    4            6           0    0    carreras_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.carreras_id_seq OWNED BY public.carreras.id;
          public               postgres    false    219            �            1259    184237    estudiantes    TABLE     �   CREATE TABLE public.estudiantes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    carrera_id integer NOT NULL
);
    DROP TABLE public.estudiantes;
       public         heap r       postgres    false    4            �            1259    184236    estudiantes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estudiantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estudiantes_id_seq;
       public               postgres    false    226    4            7           0    0    estudiantes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.estudiantes_id_seq OWNED BY public.estudiantes.id;
          public               postgres    false    225            �            1259    184222    libros    TABLE     �   CREATE TABLE public.libros (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion text,
    autor_id integer NOT NULL,
    fecha_publicacion date
);
    DROP TABLE public.libros;
       public         heap r       postgres    false    4            �            1259    184221    libros_id_seq    SEQUENCE     �   CREATE SEQUENCE public.libros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.libros_id_seq;
       public               postgres    false    224    4            8           0    0    libros_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.libros_id_seq OWNED BY public.libros.id;
          public               postgres    false    223            �            1259    184252 	   prestamos    TABLE     B  CREATE TABLE public.prestamos (
    id integer NOT NULL,
    estudiante_id integer NOT NULL,
    libro_id integer NOT NULL,
    fecha_prestamo timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion timestamp without time zone,
    estado character varying(50) DEFAULT 'Prestado'::character varying
);
    DROP TABLE public.prestamos;
       public         heap r       postgres    false    4            �            1259    184251    prestamos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.prestamos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.prestamos_id_seq;
       public               postgres    false    228    4            9           0    0    prestamos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.prestamos_id_seq OWNED BY public.prestamos.id;
          public               postgres    false    227            �            1259    184174    usuarios    TABLE     8  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash text NOT NULL,
    rol character varying(50) DEFAULT 'usuario'::character varying NOT NULL,
    creado_en timestamp without time zone DEFAULT now()
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false    4            �            1259    184173    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    4    218            :           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    217            t           2604    184216 
   autores id    DEFAULT     h   ALTER TABLE ONLY public.autores ALTER COLUMN id SET DEFAULT nextval('public.autores_id_seq'::regclass);
 9   ALTER TABLE public.autores ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            s           2604    184190    carreras id    DEFAULT     j   ALTER TABLE ONLY public.carreras ALTER COLUMN id SET DEFAULT nextval('public.carreras_id_seq'::regclass);
 :   ALTER TABLE public.carreras ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            x           2604    184240    estudiantes id    DEFAULT     p   ALTER TABLE ONLY public.estudiantes ALTER COLUMN id SET DEFAULT nextval('public.estudiantes_id_seq'::regclass);
 =   ALTER TABLE public.estudiantes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            w           2604    184225 	   libros id    DEFAULT     f   ALTER TABLE ONLY public.libros ALTER COLUMN id SET DEFAULT nextval('public.libros_id_seq'::regclass);
 8   ALTER TABLE public.libros ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            z           2604    184255    prestamos id    DEFAULT     l   ALTER TABLE ONLY public.prestamos ALTER COLUMN id SET DEFAULT nextval('public.prestamos_id_seq'::regclass);
 ;   ALTER TABLE public.prestamos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            p           2604    184177    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            '          0    184213    autores 
   TABLE DATA           \   COPY public.autores (id, nombre, biografia, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    222   6>       %          0    184187    carreras 
   TABLE DATA           ;   COPY public.carreras (id, nombre, descripcion) FROM stdin;
    public               postgres    false    220   6@       +          0    184237    estudiantes 
   TABLE DATA           T   COPY public.estudiantes (id, nombre, email, fecha_registro, carrera_id) FROM stdin;
    public               postgres    false    226   )A       )          0    184222    libros 
   TABLE DATA           V   COPY public.libros (id, titulo, descripcion, autor_id, fecha_publicacion) FROM stdin;
    public               postgres    false    224   �A       -          0    184252 	   prestamos 
   TABLE DATA           j   COPY public.prestamos (id, estudiante_id, libro_id, fecha_prestamo, fecha_devolucion, estado) FROM stdin;
    public               postgres    false    228   �A       #          0    184174    usuarios 
   TABLE DATA           T   COPY public.usuarios (id, nombre, email, password_hash, rol, creado_en) FROM stdin;
    public               postgres    false    218   �A       ;           0    0    autores_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.autores_id_seq', 42, true);
          public               postgres    false    221            <           0    0    carreras_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.carreras_id_seq', 14, true);
          public               postgres    false    219            =           0    0    estudiantes_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.estudiantes_id_seq', 22, true);
          public               postgres    false    225            >           0    0    libros_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.libros_id_seq', 6, true);
          public               postgres    false    223            ?           0    0    prestamos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.prestamos_id_seq', 8, true);
          public               postgres    false    227            @           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);
          public               postgres    false    217            �           2606    184220    autores autores_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.autores
    ADD CONSTRAINT autores_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.autores DROP CONSTRAINT autores_pkey;
       public                 postgres    false    222            �           2606    184196    carreras carreras_nombre_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.carreras
    ADD CONSTRAINT carreras_nombre_key UNIQUE (nombre);
 F   ALTER TABLE ONLY public.carreras DROP CONSTRAINT carreras_nombre_key;
       public                 postgres    false    220            �           2606    184194    carreras carreras_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.carreras
    ADD CONSTRAINT carreras_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.carreras DROP CONSTRAINT carreras_pkey;
       public                 postgres    false    220            �           2606    184243    estudiantes estudiantes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_pkey;
       public                 postgres    false    226            �           2606    184229    libros libros_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.libros DROP CONSTRAINT libros_pkey;
       public                 postgres    false    224            �           2606    184259    prestamos prestamos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.prestamos DROP CONSTRAINT prestamos_pkey;
       public                 postgres    false    228            ~           2606    184185    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public                 postgres    false    218            �           2606    184183    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            �           2606    184246 '   estudiantes estudiantes_carrera_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES public.carreras(id);
 Q   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_carrera_id_fkey;
       public               postgres    false    4740    220    226            �           2606    184230    libros libros_autor_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.autores(id);
 E   ALTER TABLE ONLY public.libros DROP CONSTRAINT libros_autor_id_fkey;
       public               postgres    false    4742    224    222            �           2606    184260 &   prestamos prestamos_estudiante_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id);
 P   ALTER TABLE ONLY public.prestamos DROP CONSTRAINT prestamos_estudiante_id_fkey;
       public               postgres    false    4746    228    226            �           2606    184265 !   prestamos prestamos_libro_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_libro_id_fkey FOREIGN KEY (libro_id) REFERENCES public.libros(id);
 K   ALTER TABLE ONLY public.prestamos DROP CONSTRAINT prestamos_libro_id_fkey;
       public               postgres    false    4744    228    224            '   �  x��TYn�0��N���&.>K��?E�b��~��hGN�dУ�G��˾�mݷ��y<�<!A\Ėa �yHc� rF��ٔ��o>��d��/�`fd������NX�t���bA&u'\b��Xn�Q�ه:$�Y�U)��	��C���x���@�����h��l'y���q���P�:-�u��Z��rhgfQdf���E��1l��ߊ�^�~�"�ب�*r�ҟS)f\�۶���<FT�'��Bů<�E����e�^���r�Yl׳����A$[NE��Jcx�����W�;�p��@�d���H��WN��CRZS�%�x�/�7�����Ǡ�T�Gc.�,�3Gwnk�UZ���2�,�	�S�+�F	E�ֿ�������A�zu�[2o�ٔ��Jp��&���m��W�z���?U_L�P;����������u���N<�A@c���������W��<�]      %   �   x�m�1N1E��>�j$`/��قИ���$�8B{��s1�PLCc}����M8�W*L�]Ne��n_�	��� �5��2��lPs���E?Q� B6�4nJ+6�V�o�͜���*LE���(���O1�
*�>g�1y&�܅GJo�_AÜ{����tJfMg�d]���0�c����JI��b��/��F�w5L������hV��8s�h�h���y�1����      +   �   x�m�;! ��)�K�{*l�<�Q�]�Ǭ��7�^L��j�����}=��c��n��r��V����jD����Brd�#��aIg�_�{�Z��W��J��%��2ϱ��aj�����,���1��I!�w�.�      )      x������ � �      -      x������ � �      #   ~   x�3�tL����L����9�z����*F�*�*�������a٦%��>�Nf�IUz�y�����i)�)���9�I�!9.��8��Lu�uͬ����̌��-�b���� ��$0     