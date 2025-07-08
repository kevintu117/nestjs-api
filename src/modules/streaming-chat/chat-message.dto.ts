import { IsString, IsIn } from 'class-validator';

/**
 * DTO for a single chat message
 */
export class ChatMessageDto {
  /**
   * The content of the message
   */
  @IsString()
  readonly content: string;

  /**
   * The role of the message sender
   */
  @IsString()
  @IsIn(['user', 'assistant', 'system'])
  readonly role: 'user' | 'assistant' | 'system';
}
