import axios from 'axios';

type UploadProps = {
  fileUrl: string;
  file: File;
  onProgress?: (percent: number) => void;
};

export async function uploadToS3({ fileUrl, file, onProgress }: UploadProps): Promise<void> {
  try {
    await axios.put(fileUrl, file, {
      headers: {
        'Content-Type': file.type,
      },

      timeout: 60_000,

      onUploadProgress: (event) => {
        if (!event.total || !onProgress) {
          return;
        }

        const percent = Math.round((event.loaded * 100) / event.total);

        onProgress(percent);
      },
    });
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn('Upload cancelled');
      return;
    }

    console.error('S3 upload failed:', error);

    throw new Error('File upload failed');
  }
}
