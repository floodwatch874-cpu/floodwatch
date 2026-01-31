import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InteractiveMap from '@/components/admin/map/interactive-map';
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

export default function CreateFloodAlertModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-6">Create Flood Alert</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid col-span-2">
            <InteractiveMap />
          </div>
          <div className="grid col-span-1 gap-y-6">
            <DialogTitle className="font-poppins text-xl font-semibold">
              Create Flood Alert
            </DialogTitle>

            {/* Location name */}
            <div className="space-y-2">
              <Label htmlFor="location">Location name</Label>
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

            {/* Latitude */}
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="text"
                placeholder="Enter the latitude"
              />
            </div>

            {/* Longitude */}
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="text"
                placeholder="Enter the longitude"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter the description"
                className="min-h-[120px] max-h-[120px]"
                style={{ wordBreak: 'break-word' }}
              />
            </div>

            {/* Upload image */}
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <Dropzone />
            </div>

            <Button className="py-6">Post Flood Alert</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
