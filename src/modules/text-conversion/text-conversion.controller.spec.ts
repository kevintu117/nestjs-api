import { Test, TestingModule } from '@nestjs/testing';
import { ConvertTextResponseDto } from './convert-text-response.dto';
import { ConvertTextDto } from './convert-text.dto';
import { TextConversionController } from './text-conversion.controller';
import { TextConversionService } from './text-conversion.service';

describe('TextConversionController', () => {
  let controller: TextConversionController;
  let service: TextConversionService;

  beforeEach(async () => {
    const mockService = {
      convertText: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextConversionController],
      providers: [
        {
          provide: TextConversionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TextConversionController>(TextConversionController);
    service = module.get<TextConversionService>(TextConversionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('convertText', () => {
    it('should convert text successfully', () => {
      const inputDto: ConvertTextDto = { text: '简体中文' };
      const expectedResponse = new ConvertTextResponseDto(
        '简体中文',
        '簡體中文',
      );

      const mockConvertText = jest.fn().mockReturnValue(expectedResponse);
      service.convertText = mockConvertText;

      const actualResult = controller.convertText(inputDto);

      expect(mockConvertText).toHaveBeenCalledWith(inputDto);
      expect(actualResult).toBe(expectedResponse);
    });
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const expectedResult = {
        status: 'ok',
        message: 'Text conversion service is running',
      };

      const actualResult = controller.getHealth();

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
