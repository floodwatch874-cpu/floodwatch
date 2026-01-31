import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InteractiveMap from './interactive-map';
import { Textarea } from '@/components/ui/textarea';
import Dropzone from '@/components/admin/map/dropzone';

export default function CreateSafeZoneModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-6">Create Safe Zone</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid col-span-2">
            <InteractiveMap />
          </div>
          <div className="grid col-span-1 gap-y-6">
            <DialogTitle className="font-poppins text-xl font-semibold">
              Create Safe Zone
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

            <Button className="py-6">Post Safe Zone</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
