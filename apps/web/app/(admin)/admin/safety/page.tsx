import SafetyLocationsClient from '@/components/admin/safety/safety-locations-client';
import SafetyLocationsView from '@/components/admin/safety/safety-locations-view';

export default async function SafetyLocationsPage() {
  return (
    <SafetyLocationsClient>
      <SafetyLocationsView />
    </SafetyLocationsClient>
  );
}
