import ReportStatCards from '@/components/admin/reports/report-stat-cards';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { ReportQuery } from '@/lib/types/report-query';
import { getReportsData } from '@/lib/actions/get-reports-data';
import PagePagination from '@/components/page-pagination';
import ReportStatCardSkeleton from '@/components/admin/reports/skeleton/report-stat-card-skeleton';
import FloodReportsDataTableWrapper from '@/components/admin/reports/flood-reports-data-table-wrapper';
import FloodReportsClient from '@/components/admin/reports/flood-reports-client';

export default async function FloodReportsPage({
  searchParams,
}: {
  searchParams: ReportQuery;
}) {
  const params = await searchParams;
  const data = await getReportsData(params);

  return (
    <FloodReportsClient>
      <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
        {/* Header */}
        <h1 className="font-poppins text-3xl font-bold">Flood Reports</h1>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <SearchBar placeholder="Search flood reports..." />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 gap-4">
          <Suspense fallback={<ReportStatCardSkeleton />}>
            <ReportStatCards
              totalCount={data?.stats?.totalCount ?? 0}
              verifiedCount={data?.stats?.verifiedCount ?? 0}
              unverifiedCount={data?.stats?.unverifiedCount ?? 0}
            />
          </Suspense>

          <FloodReportsDataTableWrapper>
            <DataTable columns={columns} data={data?.data ?? []} />
          </FloodReportsDataTableWrapper>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing {data?.data?.length ?? 0} of{' '}
              {data?.stats?.totalCount ?? 0} reports
            </span>

            <div>
              <PagePagination
                currentPage={data?.meta?.page ?? 1}
                totalPages={data?.meta?.totalPages ?? 1}
                hasNextPage={data?.meta?.hasNextPage ?? false}
                hasPrevPage={data?.meta?.hasPrevPage ?? false}
              />
            </div>
          </div>
        </div>
      </div>
    </FloodReportsClient>
  );
}
