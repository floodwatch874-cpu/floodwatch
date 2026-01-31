'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { IconUpload } from '@tabler/icons-react';

interface FileWithPreview extends File {
  preview: string;
}

function Dropzone() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(
        Object.assign(uploadedFile, {
          preview: URL.createObjectURL(uploadedFile),
        }) as FileWithPreview,
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <div className="relative w-full h-[20vh] rounded-lg overflow-hidden hover:cursor-pointer">
          <Image
            src={file.preview}
            alt="Uploaded file preview"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : isDragActive ? (
        <div
          className="flex items-center border-2 border-dashed h-[20vh] border-[#0066CC] 
        rounded-xl p-6 text-center"
        >
          <p className="text-blue-500">Drop the file here ...</p>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg 
          cursor-pointer gap-2 h-[20vh] hover:border-[#0066CC] text-gray-600"
        >
          <IconUpload />
          Upload or drag and drop file here
        </div>
      )}
    </div>
  );
}
export default Dropzone;
