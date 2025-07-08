import {
  Controller,
  Post,
  Body,
  Res,
  Logger,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { ChatRequestDto } from './chat-request.dto';
import { StreamingChatService } from './streaming-chat.service';

/**
 * Controller for streaming chat operations
 */
@Controller('streaming-chat')
export class StreamingChatController {
  private readonly logger = new Logger(StreamingChatController.name);

  constructor(private readonly streamingChatService: StreamingChatService) {}

  /**
   * Stream chat response from external AI API
   * @param chatRequest The chat request with messages
   * @param response Express response object for streaming
   */
  @Post('stream')
  streamChat(
    @Body(ValidationPipe) chatRequest: ChatRequestDto,
    @Res() response: Response,
  ): void {
    this.logger.log('Received streaming chat request');

    // Set headers for streaming response
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.setHeader('Transfer-Encoding', 'chunked');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    try {
      const stream$ = this.streamingChatService.streamChat(chatRequest);

      stream$.subscribe({
        next: (chunk: string) => {
          // Write chunk to response stream
          response.write(chunk);
        },
        error: (error) => {
          this.logger.error('Stream error:', error);
          if (!response.headersSent) {
            response.status(500).json({ error: 'Streaming failed' });
          } else {
            response.end();
          }
        },
        complete: () => {
          this.logger.log('Stream completed');
          response.end();
        },
      });
    } catch (error) {
      this.logger.error('Streaming chat error:', error);
      if (!response.headersSent) {
        response.status(500).json({ error: 'Failed to start streaming' });
      }
    }
  }

  /**
   * Health check endpoint for testing
   * @returns Simple health check response
   */
  @Get('health')
  getHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Streaming chat service is running',
    };
  }
}
