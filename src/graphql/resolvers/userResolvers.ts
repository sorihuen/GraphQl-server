/**
 * @file userResolvers.ts
 * @description Implementación de los resolvers de GraphQL para el manejo de usuarios.
 * Incluye queries para consulta y mutaciones para registro de usuarios.
 */

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

/**
 * Interface que define la estructura de datos requerida para registrar un nuevo usuario.
 * Incluye información personal, credenciales, documento de identidad y contacto.
 */
interface RegisterInput {
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  isMilitar: boolean;
  isTemporal: boolean;
  document: {
    document: string;
    typeDocumentID: number;
    placeExpedition: string;
    dateExpedition: string;
  };
  contact: {
    address: string;
    city: string;
    phone: string;
    cellPhone: string;
    emergencyName: string;
    emergencyPhone: string;
    countryID: number;
  };
}

/**
 * Resolvers para el manejo de usuarios en el sistema.
 * @namespace UserResolvers
 * @category GraphQL
 */

export const userResolvers = {
  Query: {
    /**
     * Obtiene todos los usuarios registrados en el sistema junto con sus relaciones.
     * @param _root - Valor raíz de GraphQL (no utilizado)
     * @param _args - Argumentos de la consulta (no utilizado)
     * @param context - Contexto de la aplicación
     * @param context.prisma - Instancia del cliente Prisma para acceso a BD
     * @returns Promise que resuelve a un array de usuarios con sus documentos y contactos
     * @throws {PrismaClientKnownRequestError} Si hay un error en la consulta a la BD
     */
    users: async (_: any, __: any, { prisma }: { prisma: PrismaClient }) => {
      return prisma.appUser_TB.findMany({
        include: {
          document: { include: { typeDocument: true } },
          contactInfo: { include: { country: true } }
        }
      });
    },
    /**
     * Busca un usuario específico por su dirección de correo electrónico.
     * @param _root - Valor raíz de GraphQL (no utilizado)
     * @param args - Argumentos de la consulta
     * @param args.email - Correo electrónico a buscar
     * @param context - Contexto de la aplicación
     * @param context.prisma - Instancia del cliente Prisma para acceso a BD
     * @returns Promise que resuelve al usuario encontrado o null si no existe
     * @throws {PrismaClientKnownRequestError} Si hay un error en la consulta a la BD
     */
    userByEmail: async (_: any, { email }: { email: string }, { prisma }: { prisma: PrismaClient }) => {
      return prisma.appUser_TB.findUnique({
        where: { email },
        include: {
          document: { include: { typeDocument: true } },
          contactInfo: { include: { country: true } }
        }
      });
    }
  },

  Mutation: {
    /**
     * Registra un nuevo usuario en el sistema con toda su información relacionada.
     * El proceso incluye:
     * 1. Verificación de duplicidad de username y email
     * 2. Encriptación de la contraseña usando bcrypt
     * 3. Creación del usuario principal
     * 4. Creación del documento de identidad asociado
     * 5. Creación de la información de contacto
     *
     * @param _root - Valor raíz de GraphQL (no utilizado)
     * @param args - Argumentos de la mutación
     * @param args.input - Datos completos del usuario a registrar
     * @param context - Contexto de la aplicación
     * @param context.prisma - Instancia del cliente Prisma para acceso a BD
     * @returns Promise que resuelve a un objeto con el estado del registro
     * @throws {PrismaClientKnownRequestError} Si hay error al crear registros en BD
     * @throws {Error} Si hay error al hashear la contraseña
     */
    registerUser: async (_: any, { input }: { input: RegisterInput }, { prisma }: { prisma: PrismaClient }) => {
      const {
        username, email, password,
        name, lastName, isMilitar, isTemporal,
        document, contact
      } = input;

      // 1) Check duplicidad de usuario o email
  
      const exists = await prisma.appUser_TB.findFirst({
        where: { OR: [{ username }, { email }] }
      });
      if (exists) {
        return { success: false, message: 'Usuario o correo ya registrado' };
      }

      // 2) Hash de la contraseña
      const hashed = await bcrypt.hash(password, 10);

      // 3) Creación del usuario principal
      const newUser = await prisma.appUser_TB.create({
        data: {
          username,
          email,
          password: hashed,
          name,
          lastName,
          isMilitar,
          isTemporal
        }
      });

       // 4) Creación del documento de identidad
      await prisma.userDocument_TB.create({
        data: {
          userID: newUser.id,               
          document: document.document,
          typeDocumentID: document.typeDocumentID,
          placeExpedition: document.placeExpedition,
          dateExpedition: new Date(document.dateExpedition)
        }
      });

      // 5) Creación del contacto
      await prisma.contactInfo_TB.create({
        data: {
          userID: newUser.id,              
          address: contact.address,
          city: contact.city,
          phone: contact.phone,
          cellPhone: contact.cellPhone,
          emergencyName: contact.emergencyName,
          emergencyPhone: contact.emergencyPhone,
          countryID: contact.countryID
        }
      });

      return { success: true, message: 'Usuario registrado exitosamente' };
    }
  }
};
