import { Module } from '@nestjs/common';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { CoreModule } from '@/core/core.module';

@Module({
	imports: [CoreModule],
	providers: [AppService],
	controllers: [AppController],
})
export class AppModule {}
