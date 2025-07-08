import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { of } from 'rxjs';
import { ChatRequestDto } from './chat-request.dto';
import { StreamingChatController } from './streaming-chat.controller';
import { StreamingChatService } from './streaming-chat.service';

describe('StreamingChatController', () => {
  let controller: StreamingChatController;
  let service: StreamingChatService;

  beforeEach(async () => {
    const mockService = {
      streamChat: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingChatController],
      providers: [
        {
          provide: StreamingChatService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<StreamingChatController>(StreamingChatController);
    service = module.get<StreamingChatService>(StreamingChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const result = controller.getHealth();
      expect(result).toEqual({
        status: 'ok',
        message: 'Streaming chat service is running',
      });
    });
  });

  describe('streamChat', () => {
    it('should handle streaming chat request', () => {
      const inputRequest: ChatRequestDto = {
        messages: [{ content: 'Hello', role: 'user' }],
      };

      const mockResponse = {
        setHeader: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
        headersSent: false,
      } as unknown as Response;

      const mockStream = of('Hello ', 'World!');
      const streamChatSpy = jest
        .spyOn(service, 'streamChat')
        .mockReturnValue(mockStream);
      const setHeaderSpy = jest.spyOn(mockResponse, 'setHeader');

      controller.streamChat(inputRequest, mockResponse);

      expect(streamChatSpy).toHaveBeenCalledWith(inputRequest);
      expect(setHeaderSpy).toHaveBeenCalledWith(
        'Content-Type',
        'text/plain; charset=utf-8',
      );
      expect(setHeaderSpy).toHaveBeenCalledWith('Transfer-Encoding', 'chunked');
    });
  });
});
