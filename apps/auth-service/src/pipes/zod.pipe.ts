import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { fromError } from 'zod-validation-error';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    } else {
      const validationErrors = fromError(result.error);

      throw new Error(validationErrors.toString());
    }
  }
}
