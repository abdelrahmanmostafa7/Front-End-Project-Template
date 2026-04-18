import client from '@/lib/client';
import { IFileSystem } from '@/types/system-item-types';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { toast } from 'react-toastify';

type PresignedPayload = {
  name: string;
  type: string;
  size: number;
};

export function useCreatePresignedUrl() {
  return useMutation<IFileSystem, ApiError, PresignedPayload>({
    mutationFn: async (payload) => {
      const res = await client.post<IFileSystem>('/api/v1/upload/presigned-url', payload);

      return res.data;
    },

    retry: 2,

    onError: (error) => {
      console.error('Presigned URL Error:', error);

      toast.error(error.message || 'Upload initialization failed');
    },

    onSuccess: (data) => {
      console.info('Presigned URL created:', data.id);
    },
  });
}
