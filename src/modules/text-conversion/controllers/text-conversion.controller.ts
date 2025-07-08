import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { ConvertTextResponseDto } from '../models/dto/convert-text-response.dto';
import { ConvertTextDto } from '../models/dto/convert-text.dto';
import { TextConversionService } from '../services/text-conversion.service';

/**
 * Controller for text conversion operations
 */
@Controller('text-conversion')
export class TextConversionController {
  constructor(private readonly textConversionService: TextConversionService) {}

  /**
   * Convert simplified Chinese text to traditional Chinese
   * @param convertTextDto The text conversion request
   * @returns The converted text response
   */
  @Post('convert')
  convertText(
    @Body(ValidationPipe) convertTextDto: ConvertTextDto,
  ): ConvertTextResponseDto {
    return this.textConversionService.convertText(convertTextDto);
  }

  /**
   * Health check endpoint for testing
   * @returns Simple health check response
   */
  @Get('health')
  getHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Text conversion service is running',
    };
  }
}
