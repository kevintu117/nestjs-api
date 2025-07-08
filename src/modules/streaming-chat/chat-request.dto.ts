import { Type } from 'class-transformer';
import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { ChatMessageDto } from './chat-message.dto';

/**
 * DTO for chat request containing messages array
 */
export class ChatRequestDto {
  /**
   * Array of chat messages
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  readonly messages: ChatMessageDto[];
}
