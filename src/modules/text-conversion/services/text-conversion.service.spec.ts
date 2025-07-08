import { Test, TestingModule } from '@nestjs/testing';
import { TextConversionService } from './text-conversion.service';
import { ConvertTextDto } from '../models/dto/convert-text.dto';

describe('TextConversionService', () => {
  let service: TextConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextConversionService],
    }).compile();

    service = module.get<TextConversionService>(TextConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertText', () => {
    it('should convert simplified Chinese to traditional Chinese', () => {
      const inputDto: ConvertTextDto = { text: '简体中文' };
      const expectedOriginalText = '简体中文';
      const actualResult = service.convertText(inputDto);
      expect(actualResult.originalText).toBe(expectedOriginalText);
      expect(actualResult.convertedText).toBeDefined();
      expect(actualResult.convertedText).not.toBe(expectedOriginalText);
      expect(actualResult.timestamp).toBeInstanceOf(Date);
    });

    it('should handle empty string', () => {
      const inputDto: ConvertTextDto = { text: '' };
      const actualResult = service.convertText(inputDto);
      expect(actualResult.originalText).toBe('');
      expect(actualResult.convertedText).toBe('');
      expect(actualResult.timestamp).toBeInstanceOf(Date);
    });

    it('should handle text with no conversion needed', () => {
      const inputDto: ConvertTextDto = { text: 'Hello World' };
      const actualResult = service.convertText(inputDto);
      expect(actualResult.originalText).toBe('Hello World');
      expect(actualResult.convertedText).toBe('Hello World');
      expect(actualResult.timestamp).toBeInstanceOf(Date);
    });
  });
});
