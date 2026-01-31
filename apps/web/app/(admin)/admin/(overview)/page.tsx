import ActiveFloodAlertsCard from '@/components/admin/dashboard/active-flood-alerts-card';
import SafetyLocationsCard from '@/components/admin/dashboard/safety-locations-card';
import StatCard from '@/components/admin/dashboard/stat-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  IconAlertTriangle,
  IconBell,
  IconFileText,
  IconShield,
} from '@tabler/icons-react';

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-poppins text-3xl font-bold">Hello, John Doe</h1>
        <p>Here&apos;s what is happening with FloodWatch today</p>
      </div>

      <ScrollArea className="flex-1 h-0">
        <div className="space-y-8 pr-4">
          {/* Stat Card */}
          <div className="grid grid-cols-2 gap-8">
            <StatCard
              icon={IconBell}
              color="#0066CC"
              label="Flood Alerts"
              count={1}
            />
            <StatCard
              icon={IconFileText}
              color="#D08700"
              label="Total Reports"
              count={42}
            />
          </div>

          {/* Active Flood Reports */}
          <div className="grid rounded-2xl border shadow-md p-6 gap-6">
            <div className="flex gap-2 items-center text-xl font-semibold">
              <IconAlertTriangle className="w-[1.5em]! h-[1.5em]!" />
              <h3>Active Flood Alerts</h3>
            </div>
            <div className="grid gap-4">
              <ActiveFloodAlertsCard
                severity="critical"
                location="Barangay 176"
                message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ut quaerat a ipsa maxime omnis facilis impedit! Vero aut modi possimus sapiente illo dolores corporis ipsum, perspiciatis placeat enim iure?"
                reportedAt="2026-01-28T10:30:00Z"
              />
              <ActiveFloodAlertsCard
                severity="high"
                location="Barangay 42"
                message="Floodwaters reaching waist level, residents advised to evacuate immediately."
                reportedAt="2026-01-27T08:15:00Z"
              />
              <ActiveFloodAlertsCard
                severity="moderate"
                location="Barangay 89"
                message="Rising floodwaters, residents urged to stay alert and monitor updates."
                reportedAt="2026-01-26T14:45:00Z"
              />
              <ActiveFloodAlertsCard
                severity="low"
                location="Barangay 23"
                message="Minor flooding reported, residents advised to exercise caution."
                reportedAt="2026-01-25T09:00:00Z"
              />
            </div>
          </div>

          {/* Safety Locations */}
          <div className="grid rounded-2xl border shadow-md p-6 gap-6">
            <div className="flex gap-2 items-center text-xl font-semibold">
              <IconShield className="w-[1.5em]! h-[1.5em]!" />
              <h3>Safety Locations</h3>
            </div>
            <div className="grid gap-4">
              <SafetyLocationsCard
                name="Community Safe Haven"
                address="123 Safety St, Safeville"
                availability="Open 24/7"
              />
              <SafetyLocationsCard
                name="Central Evacuation Center"
                address="456 Rescue Ave, Sheltertown"
                availability="Open 24/7"
              />
              <SafetyLocationsCard
                name="District Emergency Hub"
                address="789 Protection Blvd, Refugeville"
                availability="Open 24/7"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
