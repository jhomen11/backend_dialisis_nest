// src/derivaciones/derivaciones.module.ts
import { Module } from '@nestjs/common';
import { DerivacionesController } from './derivaciones.controller';
import { DerivacionesService } from './derivaciones.service';
import { databaseProviders } from '../database/database.providers';
import { HttpModule } from '@nestjs/axios';
import { DerivacionesRepository } from './repositories/derivaciones.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [...databaseProviders, DerivacionesService, DerivacionesRepository],
  controllers: [DerivacionesController],
})
export class DerivacionesModule {}