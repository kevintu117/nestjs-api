import { Readable } from 'stream';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Observable, of } from 'rxjs';
import { ChatRequestDto } from './chat-request.dto';
import { StreamingChatService } from './streaming-chat.service';

describe('StreamingChatService', () => {
  let service: StreamingChatService;
  let httpService: HttpService;

  beforeEach(async () => {
    const mockHttpService = {
      request: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamingChatService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<StreamingChatService>(StreamingChatService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('streamChat', () => {
    it('should create observable for streaming chat', (done) => {
      const inputRequest: ChatRequestDto = {
        messages: [{ content: 'Hello', role: 'user' }],
      };

      const mockStream = new Readable({
        read: () => {
          mockStream.push('Hello ');
          mockStream.push('World!');
          mockStream.push(null); // End stream
        },
      });

      const mockResponse: AxiosResponse = {
        data: mockStream,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const requestSpy = jest
        .spyOn(httpService, 'request')
        .mockReturnValue(of(mockResponse));

      const result$ = service.streamChat(inputRequest);
      const chunks: string[] = [];

      result$.subscribe({
        next: (chunk) => {
          chunks.push(chunk);
        },
        complete: () => {
          expect(chunks).toEqual(['Hello ', 'World!']);
          expect(requestSpy).toHaveBeenCalledWith({
            method: 'POST',
            url: 'http://192.168.0.82:8000/streaming/test',
            data: inputRequest,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            responseType: 'stream',
            timeout: 30000,
          });
          done();
        },
      });
    });

    it('should handle HTTP request errors', (done) => {
      const inputRequest: ChatRequestDto = {
        messages: [{ content: 'Hello', role: 'user' }],
      };

      const mockError = new Error('Network error');
      jest
        .spyOn(httpService, 'request')
        .mockReturnValue(
          new Observable((observer) => observer.error(mockError)),
        );

      const result$ = service.streamChat(inputRequest);

      result$.subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });
});
