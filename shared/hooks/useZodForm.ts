import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const useZodForm = <T extends FieldValues>(
  schema: ZodType<T>,
  options?: Omit<UseFormProps<T>, 'resolver'>,
): UseFormReturn<T> => {
  return useForm<T>({
    resolver: zodResolver(schema),
    ...options,
  });
};
