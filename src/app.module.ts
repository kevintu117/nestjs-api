import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextConversionModule } from './modules/text-conversion/text-conversion.module';

@Module({
  imports: [TextConversionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
