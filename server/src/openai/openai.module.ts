import { Module } from '@nestjs/common';
import { GroqService } from './openai.service';
// import { OpenaiService } from './openai.service';

@Module({
  providers: [GroqService],
  exports: [GroqService],
})
export class OpenaiModule {}
