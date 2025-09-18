import api from './api-config';

export async function cancelSchedule(scheduleId) {
  try {
    const response = await fetch(`${api.baseURL}/schedules/${scheduleId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to cancel schedule');
    }

    return true;
  } catch (error) {
    console.error('Error canceling schedule:', error);
    throw error;
  }
}
