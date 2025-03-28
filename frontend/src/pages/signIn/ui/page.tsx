import {useForm, SubmitHandler} from 'react-hook-form';
import {z, ZodType} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useUnit} from 'effector-react';

import {Button} from '@shared/ui';
import {authModel} from '@features/auth';
import {ExternalLogin} from './ExternalLogin';

const fieldsNames = {
  login: 'login',
  password: 'password',
} as const;

interface IFormInput {
  login: string;
  password: string;
}

export const UserSchema: ZodType<IFormInput> = z.object({
  login: z.string(),
  password: z.string(),
});

export const SignIn = () => {
  const loginByCredentials = useUnit(authModel.loginByCredentials);

  const {register, handleSubmit} = useForm<IFormInput>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (credentials) => {
    loginByCredentials(credentials);
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="text-text-primary">Login</label>
          <input
            {...register(fieldsNames.login, {required: true})}
            className="inline-flex w-full items-center rounded-lg border"
          />
        </div>

        <div>
          <label className="text-text-primary">Password</label>
          <input
            {...register(fieldsNames.password, {required: true})}
            className="inline-flex w-full items-center rounded-lg border"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <ExternalLogin />
    </div>
  );
};
