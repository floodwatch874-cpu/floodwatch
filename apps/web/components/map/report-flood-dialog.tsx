'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InteractiveMap from './interactive-map';
import { Textarea } from '@/components/ui/textarea';
import Dropzone from '@/components/admin/map/dropzone';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

type ReportFloodAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReportFloodAlertDialog({
  open,
  onOpenChange,
}: ReportFloodAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[60vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid col-span-2">
            <InteractiveMap mapId='report-map'/>
          </div>

          <div className="grid col-span-1 gap-y-6">
            <DialogTitle className="font-poppins text-xl font-semibold">
              Create Flood Alert Report
            </DialogTitle>

            <ScrollArea className="flex-1 min-h-0 max-h-[80vh] overflow-hidden">
              <div className="flex flex-col pr-4 gap-y-6 ms-1">
                {/* Location name */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location Name</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Enter the location"
                  />
                </div>

                {/* Severity Level */}
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select name="severity">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Severity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Severity Level</SelectLabel>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Range */}
                <div className="space-y-2">
                  <Label htmlFor="range">Range</Label>
                  <Input
                    id="range"
                    name="range"
                    type="text"
                    placeholder="Enter range of flood"
                  />
                </div>

                {/* Upload image */}
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <Dropzone />
                </div>

                <Button className="py-6">Post Flood Report</Button>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
