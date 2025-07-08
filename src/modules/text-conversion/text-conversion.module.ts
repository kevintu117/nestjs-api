import { Module } from '@nestjs/common';
import { TextConversionController } from './text-conversion.controller';
import { TextConversionService } from './text-conversion.service';

/**
 * Module for text conversion functionality
 */
@Module({
  controllers: [TextConversionController],
  providers: [TextConversionService],
  exports: [TextConversionService],
})
export class TextConversionModule {}
