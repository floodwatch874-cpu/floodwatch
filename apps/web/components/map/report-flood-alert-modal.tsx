import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InteractiveMapCurrentLocation from '@/components/map/interactive-map-current-location';
import { Textarea } from '@/components/ui/textarea';
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
import { IconWaterpolo } from '@tabler/icons-react';
import { useState } from 'react';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { apiFetchClient } from '@/lib/api-fetch-client';
import { Spinner } from '@/components/ui/spinner';
import { reportFloodAlertSchema } from '@repo/schemas';
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ReportFloodAlertModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { user } = useUser();

  const [radius, setRadius] = useState(0); // range
  const [severityValue, setSeverity] = useState<
    'critical' | 'high' | 'moderate' | 'low'
  >('low');
  const [descriptionValue, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [location, setLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const resetForm = () => {
    setRadius(0);
    setSeverity('low');
    setDescription('');
    setImage(null);
    setLocation(null);
    setState({ status: null, errors: null });
  };

  const [state, setState] = useState<{
    status: 'error' | 'success' | null;
    errors: Record<string, string[]> | null;
  }>({
    status: null,
    errors: null,
  });

  const handleOpenChange = async (isOpen: boolean) => {
    if (isOpen && !user) {
      toast.error('You must be logged in to report a flood alert.');
      return;
    }

    setOpen(isOpen);

    if (isOpen) {
      setLocation(null); // Reset location when opening the dialog

      try {
        const coords = await getUserLocation();
        setLocation(coords);
      } catch (err) {
        console.error('Failed to get location:', err);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage(null);
      return;
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.warning('Please select a valid image file.');
      e.target.value = ''; // reset input
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.warning('File size must be less than 5MB.');
      e.target.value = ''; // reset input
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!location)
      return toast.error('Location is required to submit the report.');

    const parsedData = reportFloodAlertSchema.safeParse({
      latitude: location!.latitude,
      longitude: location!.longitude,
      range: radius,
      description: descriptionValue,
      severity: severityValue,
    });

    if (!parsedData.success) {
      setState({
        status: 'error',
        errors: z.flattenError(parsedData.error).fieldErrors,
      });
      return;
    }

    const { latitude, longitude, range, description, severity } =
      parsedData.data;

    const formData = new FormData();
    formData.append('latitude', latitude.toString());
    formData.append('longitude', longitude.toString());
    formData.append('severity', severity);
    formData.append('range', range.toString());
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      setIsPending(true);
      await apiFetchClient('/reports/create', {
        method: 'POST',
        body: formData,
      });
      setState({ status: 'success', errors: null });
      toast.success('Flood alert reported successfully!');
      onSuccess?.();
      setOpen(false);
    } catch (err) {
      console.error('Failed to submit report:', err);
    } finally {
      setIsPending(false);
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 justify-start"
        >
          <IconWaterpolo className="w-[1.5em]! h-[1.5em]! text-[#3182FF]" />
          <span>Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid col-span-2">
              <InteractiveMapCurrentLocation
                longitude={location?.longitude ?? null}
                latitude={location?.latitude ?? null}
                range={radius}
                severity={severityValue}
              />
            </div>

            <div className="grid col-span-1 gap-y-6">
              <DialogTitle className="font-poppins text-xl font-semibold">
                Report Flood Alert
              </DialogTitle>

              <ScrollArea className="flex-1 min-h-0 max-h-[80vh] overflow-hidden">
                <div className="flex flex-col pr-4 gap-y-6 ms-1">
                  {/* Severity Level */}
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select
                      name="severity"
                      defaultValue={severityValue}
                      onValueChange={(value) =>
                        setSeverity(
                          value as 'critical' | 'high' | 'moderate' | 'low',
                        )
                      }
                    >
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
                    {state.errors?.severity && (
                      <p className="text-red-500 text-sm">
                        {state.errors.severity[0]}
                      </p>
                    )}
                  </div>

                  {/* Range */}
                  <div className="space-y-2">
                    <Label htmlFor="range">Range (m)</Label>
                    <Input
                      id="range"
                      name="range"
                      type="number"
                      placeholder="Enter the range"
                      min={1}
                      value={radius}
                      onChange={(e) => setRadius(Number(e.target.value))}
                    />
                    {state.errors?.range && (
                      <p className="text-red-500 text-sm">
                        {state.errors.range[0]}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center">
                      Additional Details{' '}
                      <span className="text-gray-600 text-xs">(Optional)</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter the description"
                      className="min-h-[120px] max-h-[120px]"
                      style={{ wordBreak: 'break-word' }}
                      value={descriptionValue}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {state.errors?.description && (
                      <p className="text-red-500 text-sm">
                        {state.errors.description[0]}
                      </p>
                    )}
                  </div>

                  {/* Upload image */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="flex items-center">
                      Upload Image{' '}
                      <span className="text-gray-600 text-xs">(Optional)</span>
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>

                  <Button
                    className="flex items-center gap-2 py-6"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span>Submitting...</span>
                        <Spinner />
                      </>
                    ) : (
                      'Submit Report'
                    )}
                  </Button>
                </div>
              </ScrollArea>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
