import { Module } from '@nestjs/common';
import { TextConversionController } from './controllers/text-conversion.controller';
import { TextConversionService } from './services/text-conversion.service';

/**
 * Module for text conversion functionality
 */
@Module({
  controllers: [TextConversionController],
  providers: [TextConversionService],
  exports: [TextConversionService],
})
export class TextConversionModule {}
