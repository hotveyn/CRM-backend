import { ValueProvider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prismaServiceInstanse = new PrismaClient();
export type TPrismaService = typeof prismaServiceInstanse;
export const PrismaServiceToken = Symbol('PrismaService');
export const PrismaService = {
  provide: PrismaServiceToken,
  useValue: (() => {
    return prismaServiceInstanse;
  })(),
} as ValueProvider;
