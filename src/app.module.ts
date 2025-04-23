import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DerivacionesModule } from './modules/derivaciones/derivaciones.module';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from './modules/shared/shared.module';
import { DataBeneficiarioModule } from './modules/data-beneficiario/data-beneficiario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DerivacionesModule,
    SharedModule,
    DataBeneficiarioModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
