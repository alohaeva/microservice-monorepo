import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const {  success, error, data } = this.schema.safeParse(value);

    if (success) {
      return data;
    } else {
      throw new BadRequestException({
        success: false,
        errors: error.errors.map(issue => {
          return {
            path: issue.path,
            message: issue.message,
          }
        })
      })
    }
  }
}
