import { Module } from '@nestjs/common';
import { DataBeneficiarioController } from './data-beneficiario.controller';
import { DataBeneficiarioService } from './data-beneficiario.service';
import { databaseProviders } from '../database/database.providers';
import { DataBeneficiarioRepository } from './repositories/data-beneficiario.repository';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [...databaseProviders, DataBeneficiarioService,DataBeneficiarioRepository],
  controllers: [DataBeneficiarioController],
})
export class DataBeneficiarioModule {}
