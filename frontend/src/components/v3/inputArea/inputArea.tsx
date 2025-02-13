import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import validationSchema from '@/utils/validationSchema';

type InputArg = {
  name: string,
  labelName: string,
  defaultValue?: string,
  supportingText?: string,
}

export default function InputArea({ name, labelName, defaultValue, supportingText }: Readonly<InputArg>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  })
  return (
    <div className="inputArea" >
      <label htmlFor={name} className="inputArea__label">{labelName}</label>
      <input defaultValue={defaultValue} {...register(name)} />
      {errors.name?.message && <p className="inputArea__error-message">{ errors.name?.message as string}</p>}
      <p className="inputArea__supporting-text">{supportingText}</p>
    </div>
  );
}