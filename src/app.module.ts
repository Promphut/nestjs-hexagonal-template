import { Module } from '@nestjs/common';

import { AdapterModule } from './adapter/adapter.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { loggerModule } from './loggerModule';

@Module({
  imports: [AdapterModule, DomainModule, ApplicationModule, loggerModule],
})
export class AppModule {}
