import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { z } from 'zod';

import type { IApiResError } from '@/types/api-res-error';

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('validation.email-invalid')).min(1, t('validation.email-required')),
    password: z
      .string()
      .nonempty(t('validation.password-required'))
      .min(5, t('validation.password-min-length-8')),
  });

export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;

export interface LoginResult {
  ok: boolean;
  error?: string | null;
}

export const useLogin = () => {
  const router = useRouter();
  const t = useTranslations('auth');
  const [isPending, setIsPending] = useState(false);

  const mutate = async (loginData: LoginInput): Promise<LoginResult> => {
    setIsPending(true);
    try {
      const result = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });
      // Check for successful authentication
      if (result?.ok && !result?.error) {
        toast.success(t('login-successful'));
        router.push('/home');
        return { ok: true };
      } else {
        // Handle authentication failure
        const errorMessage = t('login-failed');
        toast.error(errorMessage);
        return { ok: false, error: errorMessage };
      }
    } catch (error) {
      const axiosError = error as AxiosError<IApiResError>;
      const errMessage = axiosError?.response?.data?.message || t('login-failed');
      toast.error(errMessage);
      return { ok: false, error: errMessage };
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
