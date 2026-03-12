import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      host: configService.get<string>('DB_HOST') || 'localhost',
      port: parseInt(configService.get<string>('DB_PORT') || '5432'),
      username: configService.get<string>('DB_USERNAME') || 'postgres',
      password: configService.get<string>('DB_PASSWORD') || '123',
      database: configService.get<string>('DB_NAME') || 'job_portal',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false ,
      ssl: { rejectUnauthorized: false },
      logging: false,
    }),
    // inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    JobsModule,
    ApplicationsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
