import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddNewAdminModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="py-6">Add New Admin</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-poppins text-xl font-semibold">
              Add <span className="text-[#0066CC] font-bold">New Admin!</span>
            </DialogTitle>
            <DialogDescription>Please enter the details.</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="first_name">Full name</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="First name"
                  className="rounded-full px-4 shadow-sm"
                />
              </div>
              <div>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Last name"
                  className="rounded-full px-4 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-full px-4 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="home_address">Home Address</Label>
            <Input
              id="home_address"
              name="home_address"
              placeholder="Enter your home address"
              className="rounded-full px-4 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="rounded-full px-4 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Re-enter your password"
              className="rounded-full px-4 shadow-sm"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
