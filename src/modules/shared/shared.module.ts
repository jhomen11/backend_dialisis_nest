import { Module } from '@nestjs/common';
import { ApiClienteService } from './services/api-cliente/api-cliente.service';
import { HttpModule } from '@nestjs/axios';
import { OhiRepository } from './repositories/ohiRepository';
import { databaseProviders } from '../database/database.providers';

@Module({
  imports: [HttpModule],
  providers: [...databaseProviders,ApiClienteService, OhiRepository],
  exports: [...databaseProviders,ApiClienteService, OhiRepository],
})
export class SharedModule {}
