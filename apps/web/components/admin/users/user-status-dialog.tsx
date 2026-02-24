'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useUserStatusDialog } from '@/contexts/user-status-dialog-context';
import { blockUser, unblockUser } from '@/lib/actions/update-user-status';
import { useState } from 'react';

export default function UserStatusDialog() {
  const { userId, action, open, closeDialog } = useUserStatusDialog();
  const [isPending, setIsPending] = useState(false);

  const isBlocking = action === 'block';

  const handleConfirm = async () => {
    if (!userId || !action) return;
    setIsPending(true);
    try {
      if (isBlocking) {
        await blockUser(userId);
      } else {
        await unblockUser(userId);
      }
      closeDialog();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isBlocking ? 'Block User' : 'Unblock User'}
          </DialogTitle>
          <DialogDescription>
            {isBlocking
              ? 'Are you sure you want to block this user? They will no longer be able to log in or use the app.'
              : 'Are you sure you want to unblock this user? They will regain access to the app.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleConfirm}
            className="flex items-center gap-2"
          >
            {isPending ? (
              isBlocking ? (
                <>
                  <span>Blocking...</span>
                  <Spinner />
                </>
              ) : (
                <>
                  <span>Unblocking...</span>
                  <Spinner />
                </>
              )
            ) : isBlocking ? (
              'Block User'
            ) : (
              'Unblock User'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
