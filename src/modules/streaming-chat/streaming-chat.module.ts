import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StreamingChatController } from './streaming-chat.controller';
import { StreamingChatService } from './streaming-chat.service';

/**
 * Module for streaming chat functionality
 */
@Module({
  imports: [HttpModule],
  controllers: [StreamingChatController],
  providers: [StreamingChatService],
  exports: [StreamingChatService],
})
export class StreamingChatModule {}
