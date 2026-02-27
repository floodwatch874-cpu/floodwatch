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
import { useReportDialog } from '@/contexts/report-dialog-context';
import { deleteReport } from '@/lib/actions/report-actions';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

export default function DeleteReportDialog() {
  const { report, isOpen, closeDialog } = useReportDialog();
  const [isPending, setIsPending] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    if (!report) return;
    setIsPending(true);
    try {
      await deleteReport(report.id);
      mutate(SWR_KEYS.reports);
      mutate((key) => Array.isArray(key) && key[0] === SWR_KEYS.reportsAdmin);
      closeDialog();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen('delete')} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Report</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this report? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            {isPending ? (
              <>
                Deleting... <Spinner />
              </>
            ) : (
              'Delete Report'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
