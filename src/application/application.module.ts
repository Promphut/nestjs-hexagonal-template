import { Global, Module } from '@nestjs/common';
import { AdapterModule } from 'src/adapter/adapter.module';

import { DomainModule } from '../domain/domain.module';
import { UserFactory } from './factories/user.factory';
import { HealthModule } from './healths/health.module';

import { CreateUserUseCase } from './usecases/createUser.usecase';

@Global()
@Module({
  imports: [AdapterModule, DomainModule, HealthModule],
  providers: [CreateUserUseCase, UserFactory],
  exports: [CreateUserUseCase],
})
export class ApplicationModule {}
