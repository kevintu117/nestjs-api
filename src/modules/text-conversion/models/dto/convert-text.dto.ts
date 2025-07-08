import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

/**
 * DTO for text conversion request
 */
export class ConvertTextDto {
  /**
   * The simplified Chinese text to be converted
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  readonly text: string;
}
