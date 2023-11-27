import { HttpModule } from '@nestjs/axios';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { httpConfig, mongoUri } from '../configs/config.env';
import { AppController } from './inbound/controllers/user.controller';
import { UserSchema } from './outbound/repositories/schemas/user.schema';
import { UserRepositoryMongo } from './outbound/repositories/user.repository.mongo';
import { SkillGatewayInternal } from './outbound/gateways/skill.gateway.internal';

@Global()
@Module({
  imports: [
    HttpModule.register({ timeout: httpConfig.timeout, maxRedirects: httpConfig.maxRedirects }),
    JwtModule,
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: mongoUri,
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryMongo,
    },
    {
      provide: 'SkillGateway',
      useClass: SkillGatewayInternal,
    },
  ],
  exports: ['UserRepository', 'SkillGateway'],
})
export class AdapterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
