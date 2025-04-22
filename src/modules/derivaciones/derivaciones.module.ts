// src/derivaciones/derivaciones.module.ts
import { Module } from '@nestjs/common';
import { DerivacionesController } from './derivaciones.controller';
import { DerivacionesService } from './derivaciones.service';
import { databaseProviders } from '../database/database.providers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [...databaseProviders, DerivacionesService],
  controllers: [DerivacionesController],
})
export class DerivacionesModule {}