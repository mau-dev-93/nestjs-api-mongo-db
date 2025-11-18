import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
	imports: [
		//mongodb://admin:8120136619@localhost:27017/
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true,
			envFilePath: `./env/${process.env.NODE_ENV}.env`,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: `mongodb://${configService.get('mongo.user')}:${configService.get('mongo.password')}@${configService.get('mongo.host')}:${configService.get('mongo.port')}/${configService.get('mongo.database')}?authSource=admin`,
			}),
		}),
		// modules
		PermissionsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
