'use server';

import { revalidatePath } from 'next/cache';
import { apiFetchServer } from '../api-fetch-server';

export async function verifyReport(reportId: string) {
  try {
    await apiFetchServer(`/reports/${reportId}`, {
      method: 'PATCH',
    });

    revalidatePath('/(admin)/admin/reports');

    return { status: 'success' };
  } catch (error) {
    console.error('Error verifying report:', error);
    return { status: 'error', message: 'Failed to verify report' };
  }
}

export async function deleteReport(reportId: string) {
  try {
    await apiFetchServer(`/reports/${reportId}`, {
      method: 'DELETE',
    });

    revalidatePath('/(admin)/admin/reports');

    return { status: 'success' };
  } catch (error) {
    console.error('Error deleting report:', error);
    return { status: 'error', message: 'Failed to delete report' };
  }
}
