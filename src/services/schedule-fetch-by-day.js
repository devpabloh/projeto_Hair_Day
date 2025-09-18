import dayjs from "dayjs";
import api from "./api-config";

export async function scheduleFetchByDay({date}) {
  try {
    // Formata a data para ISO string para garantir compatibilidade
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    
    // Faz a requisição usando a data formatada
    const response = await fetch(`${api.baseURL}/schedules?when_like=${formattedDate}`);

    if (!response.ok) {
      throw new Error('Failed to fetch schedules');
    }

    const data = await response.json();
    
    // Filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter(schedule => 
      dayjs(date).isSame(dayjs(schedule.when), "day")
    );

    return dailySchedules;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
    return [];
  }
}