'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { IconCheck, IconTrash, IconUpload } from '@tabler/icons-react';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/use-user';
import { useState, useRef } from 'react';
import {
  removeProfilePhoto,
  updateProfilePhoto,
} from '@/lib/actions/profile-photo-actions';
import { Spinner } from '@/components/ui/spinner';

interface FileWithPreview extends File {
  preview: string;
}

export function AccountProfilePhotoModal() {
  const { user, mutateUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [open, setOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        return alert('Please select an image file');
      }

      // Validate file size (e.g., max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        return alert('File size must be less than 5MB');
      }

      const preview = URL.createObjectURL(selectedFile);
      const fileWithPreview = Object.assign(selectedFile, { preview });
      setFile(fileWithPreview);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    if (!user?.profilePicture) return;

    setIsRemoving(true);
    setError(null);

    try {
      const result = await removeProfilePhoto();
      if (result.status === 'success') {
        await mutateUser();
        setOpen(false);
      } else {
        setError(result.errors?.file?.[0] || 'Failed to remove profile photo.');
      }
    } catch (err) {
      setError('Failed to remove profile photo. Please try again.');
      console.error('Remove error:', err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await updateProfilePhoto(formData);

      if (result.status === 'success') {
        await mutateUser();
        setOpen(false);

        URL.revokeObjectURL(file.preview);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else if (result.errors?.file) {
        setError(result.errors.file[0]);
      } else {
        setError('Failed to upload profile photo. Please try again.');
      }
    } catch (err) {
      setError('Failed to upload profile photo. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    if (!newOpen && file) {
      setTimeout(() => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group"
          title="Click to change profile photo"
          aria-label="Open change profile photo modal"
        >
          <UIAvatar className="size-8 border transition group-hover:opacity-90 group-hover:ring-2 group-hover:ring-[#0066CC]/40">
            <AvatarImage src={user?.profilePicture ?? ''} />
            <AvatarFallback>
              <Avatar
                name={`${user?.name ?? 'User'} ${user?.id ?? ''}`}
                variant="beam"
                className="size-8"
              />
            </AvatarFallback>
          </UIAvatar>
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader>
            <DialogTitle className="font-poppins text-xl font-semibold">
              Change{' '}
              <span className="text-[#0066CC] font-bold">Profile Picture!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-8 w-full">
              {/* Show preview if file is selected, otherwise show current photo */}
              <UIAvatar className="size-32">
                <AvatarImage
                  src={file?.preview || user?.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback>
                  <Avatar
                    name={`${user?.name} ${user?.id}`}
                    variant="beam"
                    className="size-32"
                  />
                </AvatarFallback>
              </UIAvatar>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="grid grid-cols-1 gap-4 w-full">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button
                    type="button"
                    onClick={handleUploadClick}
                    variant="outline"
                    className="flex gap-2 items-center w-full border-[#0066CC] text-[#0066CC] 
                hover:bg-[#0066CC]/10 hover:text-[#0066CC] text-base py-5"
                  >
                    <IconUpload className="w-[1em]! h-[1em]!" />
                    Upload
                  </Button>
                  <Button
                    type="button"
                    onClick={handleRemove}
                    disabled={
                      !user?.profilePicture || isUploading || isRemoving
                    }
                    variant="ghost"
                    className="flex gap-2 items-center w-full text-base py-5 hover:bg-[#FB2C36]/10 hover:text-[#FB2C36] disabled:opacity-50"
                  >
                    {isRemoving ? (
                      <>
                        <span>Removing...</span>
                        <Spinner />
                      </>
                    ) : (
                      <>
                        <IconTrash className="w-[1em]! h-[1em]!" />
                        <span>Remove</span>
                      </>
                    )}
                  </Button>
                </div>

                {file && (
                  <Button
                    type="submit"
                    disabled={!file || isUploading || isRemoving}
                    className="flex gap-2 items-center w-full text-base py-5 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <span>Applying...</span>
                        <Spinner className="size-4" />
                      </>
                    ) : (
                      <>
                        <IconCheck className="w-[1em]! h-[1em]!" />
                        <span>Apply Changes</span>
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Error display */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Separator />

            <DialogClose asChild>
              <Button variant="outline" className="w-full text-base py-5">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
