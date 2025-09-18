import api from './api-config';
import dayjs from 'dayjs';

export async function createNewSchedule({ id, name, when }) {
  try {
    // Formata a data para ISO string
    const formattedData = {
      id: id.toString(), // Garante que o ID é uma string
      name,
      when: dayjs(when).toISOString()
    };

    console.log('Enviando dados:', formattedData);

    const response = await fetch(`${api.baseURL}/schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    const responseText = await response.text();
    console.log('Resposta do servidor:', responseText);

    if (!response.ok) {
      throw new Error(`Erro ao criar agendamento: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Agendamento criado:', data);
    
    alert('Agendamento realizado com sucesso!');
    return data;
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
}