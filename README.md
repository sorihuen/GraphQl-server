# 🚀 GraphQL User Registration API

Una API robusta y escalable construida con GraphQL, Apollo Server, Prisma ORM y TypeScript que permite registrar usuarios completos con información personal, documentos de identidad y datos de contacto, implementando validaciones avanzadas y prevención de duplicidad.

![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo_Server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 📋 Tabla de contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Documentación API](#-documentación-api)
- [Ejemplos de consultas](#-ejemplos-de-consultas)
- [Pruebas](#-pruebas)
- [Despliegue](#-despliegue)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

## ✨ Características

- ✅ Registro completo de usuarios con datos personales, documentos y contacto
- ✅ Soporte para usuarios militares y temporales
- ✅ Almacenamiento seguro de contraseñas con hashing bcrypt
- ✅ Sistema de verificación de email mediante tokens
- 

## 🧩 Tecnologías Utilizadas

- [TypeScript](https://www.typescriptlang.org/) - Lenguaje tipado que compila a JavaScript
- [Prisma ORM](https://www.prisma.io/) - ORM de próxima generación para Node.js y TypeScript
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Servidor GraphQL con excelente rendimiento
- [PostgreSQL (Neon)](https://neon.tech/) - Base de datos PostgreSQL serverless
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Librería para hash seguro de contraseñas
- [dotenv](https://www.npmjs.com/package/dotenv) - Gestión de variables de entorno
- [nodemon](https://www.npmjs.com/package/nodemon) - Reinicio automático del servidor durante desarrollo

## 🗂 Estructura del Proyecto

```
GraphQL-server/
│
├── prisma/
│   ├── schema.prisma     # Esquema de modelos Prisma
│   ├── seed.ts           # Script de población inicial de datos
│   └── migrations/       # Migraciones generadas por Prisma
│
├── src/
│   ├── index.ts          # Punto de entrada del servidor GraphQL
│   ├── resolvers/        # Resolvers de GraphQL organizados por dominio
│   │   ├── index.ts      # Exporta todos los resolvers
│   │   └── user.ts       # Resolvers específicos para usuarios
│   │
│   ├── schema/           # Definiciones del schema GraphQL
│   │   ├── index.ts      # Combina todos los schemas
│   │   └── user.ts       # Tipos y queries/mutations para usuarios
│   │
│   └── utils/            # Utilidades y funciones auxiliares
│       ├── validation.ts # Funciones de validación
│       └── auth.ts       # Funciones relacionadas con autenticación
│
├── .env                  # Variables de entorno (no incluido en el repositorio)
├── .env.example          # Ejemplo de variables de entorno necesarias
├── package.json
├── tsconfig.json
└── README.md
```

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/sorihuen/GraphQl-server.git
cd GraphQl-server
```

2. Instala las dependencias:

```bash
npm install
```

## ⚙️ Configuración

1. Crea un archivo `.env` en la raíz del proyecto:

2. Actualiza las variables de entorno en el archivo `.env`:

```
DATABASE_URL=postgresql://neondb_owner:tu_contraseña@tu_url_de_neon.tech/neondb?sslmode=require
PORT=4000
```

3. Aplica las migraciones de la base de datos:

```bash
npx prisma migrate dev
```

4. (Opcional) Ejecuta el script seed para poblar la base de datos con datos iniciales:

```bash
npm run seed
```

## 🚀 Uso

### Desarrollo

Para iniciar el servidor en modo desarrollo con recarga automática:

```bash
npm run dev
```


El servidor GraphQL estará disponible en `http://localhost:4000/graphql`.

## 📚 Documentación API

La documentación completa de la API está disponible a través del explorador GraphQL integrado. Una vez que el servidor esté en funcionamiento, puedes acceder a:

- **GraphQL Playground**: `http://localhost:4000/graphql`

Allí encontrarás la documentación interactiva de todos los tipos, queries y mutations disponibles.

## 🔍 Ejemplos de Consultas

### Registrar un nuevo usuario

```graphql
mutation RegisterNewUser {
  registerUser(
    input: {
      username: "andres2025"
      email: "andres.perez@example.com"
      password: "Secreta123!"
      name: "Andrés"
      lastName: "Pérez"
      isMilitar: false
      isTemporal: true
      document: {
        document: "11223344"
        typeDocumentID: 2
        placeExpedition: "Medellín"
        dateExpedition: "2019-03-10"
      }
      contact: {
        address: "Calle 45 #12-34"
        city: "Medellín"
        phone: "604-5551212"
        cellPhone: "310-1234567"
        emergencyName: "Laura Gómez"
        emergencyPhone: "310-7654321"
        countryID: 3
      }
    }
  ) {
    success
    message
  }
}


```

### Buscar todos los usuarios

```graphql
query ListAllUsers {
  users {
    id
    username
    email
    name
    lastName
    isMilitar
    isTemporal
    timeCreate
    emailVerified
    document {
      document
      placeExpedition
      dateExpedition
      typeDocument {
        nameTypeDocument
      }
    }
    contactInfo {
      address
      city
      phone
      cellPhone
      emergencyName
      emergencyPhone
      country {
        countryName
        countryCode
      }
    }
  }
}
```

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

Hecho con ❤️ por [Suyin Orihuen](https://github.com/sorihuen)