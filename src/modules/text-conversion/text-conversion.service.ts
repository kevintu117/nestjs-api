import { Injectable } from '@nestjs/common';
import { Converter } from 'opencc-js';
import { ConvertTextResponseDto } from './convert-text-response.dto';
import { ConvertTextDto } from './convert-text.dto';

/**
 * Service for converting simplified Chinese to traditional Chinese
 */
@Injectable()
export class TextConversionService {
  private readonly converter: (text: string) => string;

  constructor() {
    this.converter = Converter({ from: 'cn', to: 'tw' });
  }

  /**
   * Convert simplified Chinese text to traditional Chinese
   * @param convertTextDto The text conversion request
   * @returns The converted text response
   */
  convertText(convertTextDto: ConvertTextDto): ConvertTextResponseDto {
    const { text } = convertTextDto;
    const convertedText = this.converter(text);
    return new ConvertTextResponseDto(text, convertedText);
  }
}
