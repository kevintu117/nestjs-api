import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamingChatModule } from './modules/streaming-chat/streaming-chat.module';
import { TextConversionModule } from './modules/text-conversion/text-conversion.module';

@Module({
  imports: [TextConversionModule, StreamingChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
