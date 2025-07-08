/**
 * Response DTO for text conversion
 */
export class ConvertTextResponseDto {
  /**
   * The original simplified Chinese text
   */
  readonly originalText: string;

  /**
   * The converted traditional Chinese text
   */
  readonly convertedText: string;

  /**
   * The timestamp when the conversion was performed
   */
  readonly timestamp: Date;

  constructor(originalText: string, convertedText: string) {
    this.originalText = originalText;
    this.convertedText = convertedText;
    this.timestamp = new Date();
  }
}
