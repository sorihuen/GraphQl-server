// src/graphql/typeDefs/userTypeDefs.ts
import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  """
  Consultas disponibles para usuarios
  """
  type Query {
    """
    Obtiene todos los usuarios registrados en el sistema
    Returns: Lista no nula de usuarios
    """
    users: [AppUser!]!

    """
    Busca un usuario por su correo electrónico
    Params:
      email: Correo electrónico del usuario a buscar
    Returns: Usuario encontrado o null si no existe
    """
    userByEmail(email: String!): AppUser
  }

  """
  Mutaciones disponibles para usuarios
  """
  type Mutation {
    """
    Registra un nuevo usuario en el sistema
    Params:
      input: Datos necesarios para el registro del usuario
    Returns: Respuesta con el estado del registro
    """
    registerUser(input: RegisterUserInput!): RegisterResponse!
  }

  """
  Tipo de entrada para el registro de usuarios
  Contiene todos los campos requeridos para crear un nuevo usuario
  """
  input RegisterUserInput {
    username: String!      # Nombre de usuario único
    email: String!         # Correo electrónico único
    password: String!      # Contraseña del usuario
    name: String!          # Nombre(s) del usuario
    lastName: String!      # Apellido(s) del usuario
    isMilitar: Boolean!    # Indica si el usuario es militar
    isTemporal: Boolean!   # Indica si es un usuario temporal
    document: DocumentInput!  # Información del documento de identidad
    contact: ContactInput!    # Información de contacto
  }

  """
  Tipo de entrada para la información del documento de identidad
  Contiene los detalles del documento oficial del usuario
  """
  input DocumentInput {
    document: String!         # Número del documento
    typeDocumentID: Int!      # ID del tipo de documento (referencia a TypeDocument_TB)
    placeExpedition: String!  # Lugar de expedición del documento
    dateExpedition: String!   # Fecha de expedición del documento
  }

  """
  Tipo de entrada para la información de contacto
  Contiene los detalles de contacto y ubicación del usuario
  """
  input ContactInput {
    address: String!          # Dirección física
    city: String!             # Ciudad de residencia
    phone: String!            # Teléfono fijo
    cellPhone: String!        # Teléfono móvil
    emergencyName: String!    # Nombre del contacto de emergencia
    emergencyPhone: String!   # Teléfono del contacto de emergencia
    countryID: Int!           # ID del país (referencia a Country_TB)
  }

  """
  Tipo de respuesta para la mutación de registro
  Indica el resultado de la operación de registro
  """
  type RegisterResponse {
    success: Boolean!         # Indica si el registro fue exitoso
    message: String!          # Mensaje descriptivo del resultado
  }

  """
  Tipo que representa un usuario en el sistema
  Contiene la información principal del usuario
  """
  type AppUser {
    id: Int!
    username: String!
    email: String!
    name: String!
    lastName: String!
    isMilitar: Boolean!
    isTemporal: Boolean!
    timeCreate: String!
    emailVerified: Boolean!
    document: UserDocument
    contactInfo: ContactInfo
  }

  """
  Tipo que representa el documento de identidad de un usuario
  Contiene la información detallada del documento
  """
  type UserDocument {
    document: String!          # Número del documento
    placeExpedition: String!   # Lugar de expedición
    dateExpedition: String!    # Fecha de expedición
    typeDocument: TypeDocument!# Tipo de documento asociado
  }

  """
  Tipo que representa los diferentes tipos de documentos
  disponibles en el sistema
  """
  type TypeDocument {
    nameTypeDocument: String!  # Nombre del tipo de documento (ej: DNI, Pasaporte)
  }

  """
  Tipo que representa la información de contacto de un usuario
  Incluye dirección, teléfonos y contacto de emergencia
  """
  type ContactInfo {
    address: String!          # Dirección física
    city: String!             # Ciudad de residencia
    phone: String!            # Teléfono fijo
    cellPhone: String!        # Teléfono móvil
    emergencyName: String!    # Nombre del contacto de emergencia
    emergencyPhone: String!   # Teléfono del contacto de emergencia
    country: Country!         # País de residencia
  }

  """
  Tipo que representa un país en el sistema
  Contiene el código y nombre del país
  """
  type Country {
    countryCode: String!      # Código del país (ej: PE, CO, MX)
    countryName: String!      # Nombre completo del país
  }
`;
