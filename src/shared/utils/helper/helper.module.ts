import { Module } from '@nestjs/common';
import { StringHelperService } from './string.helper.service';

@Module({
  imports: [],
  exports: [StringHelperService],
  providers: [StringHelperService],
})
export class HelperModule {}
