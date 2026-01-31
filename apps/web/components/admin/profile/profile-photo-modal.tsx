import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { IconCamera, IconTrash, IconUpload } from '@tabler/icons-react';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { Separator } from '@/components/ui/separator';

export function ProfilePhotoModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="absolute bottom-1.5 right-1.5 bg-[#0066CC] text-white rounded-full p-2">
            <IconCamera />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-poppins text-xl font-semibold">
              Change{' '}
              <span className="text-[#0066CC] font-bold">Profile Picture!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-8 w-full">
              <UIAvatar className="size-32">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <Avatar name="John Doe" variant="beam" />
                </AvatarFallback>
              </UIAvatar>

              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex gap-2 items-center w-full border-[#0066CC] text-[#0066CC] 
                hover:bg-[#0066CC]/10 hover:text-[#0066CC] text-base py-5"
                >
                  <IconUpload className="w-[1em]! h-[1em]!" />
                  Upload
                </Button>
                <Button
                  variant="ghost"
                  className="flex gap-2 items-center w-full text-base py-5 hover:bg-[#FB2C36]/10 hover:text-[#FB2C36]"
                >
                  <IconTrash className="w-[1em]! h-[1em]!" />
                  Remove
                </Button>
              </div>
            </div>

            <Separator />

            <DialogClose asChild>
              <Button variant="outline" className="w-full text-base py-5">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
