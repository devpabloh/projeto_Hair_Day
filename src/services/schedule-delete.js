import api from './api-config';

export async function deleteSchedule(id) {
  try {
    console.log('Deleting schedule:', id);
    
    const response = await fetch(`${api.baseURL}/schedules/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Failed to delete schedule: ${errorText}`);
    }

    console.log('Schedule deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
}
