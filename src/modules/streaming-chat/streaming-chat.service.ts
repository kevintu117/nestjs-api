import { Readable } from 'stream';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatRequestDto } from './chat-request.dto';

/**
 * Service for handling streaming chat requests to external AI API
 */
@Injectable()
export class StreamingChatService {
  private readonly logger = new Logger(StreamingChatService.name);
  private readonly externalApiUrl = 'http://192.168.0.82:8000/streaming/test';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Stream chat response from external AI API
   * @param chatRequest The chat request with messages
   * @returns Observable that emits chunks of the streaming response
   */
  streamChat(chatRequest: ChatRequestDto): Observable<string> {
    return new Observable((observer) => {
      this.logger.log('Starting streaming chat request');

      const axiosConfig = {
        method: 'POST',
        url: this.externalApiUrl,
        data: chatRequest,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'stream' as const,
        timeout: 30000, // 30 seconds timeout
      };

      this.httpService.request(axiosConfig).subscribe({
        next: (response) => {
          const stream = response.data as Readable;

          stream.on('data', (chunk: Buffer) => {
            const text = chunk.toString('utf-8');
            this.logger.debug(`Received chunk: ${text.substring(0, 50)}...`);
            observer.next(text);
          });

          stream.on('end', () => {
            this.logger.log('Stream ended');
            observer.complete();
          });

          stream.on('error', (error) => {
            this.logger.error('Stream error:', error);
            observer.error(error);
          });
        },
        error: (error) => {
          this.logger.error('HTTP request error:', error);
          observer.error(error);
        },
      });

      // Cleanup function
      return () => {
        this.logger.log('Observable subscription cleanup');
      };
    });
  }
}
