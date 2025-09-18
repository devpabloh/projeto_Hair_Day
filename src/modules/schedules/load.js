import dayjs from "dayjs";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { setupCancelEvents } from "./cancel-events.js";
import { hoursLoad } from "../form/hours-load.js";
import {schedulesShow} from "../schedules/show.js"

// Seleciona o input de data 
const selectedDate = document.getElementById("date")

export async function schedulesDay(){
  try {
    // Obtém a data do input
    const date = selectedDate.value

    // Busca na API os agendamentos
    const dailySchedules = await scheduleFetchByDay({date})
    
    // Exibe os agendamentos
    schedulesShow({dailySchedules})

    // Renderiza as horas disponíveis
    hoursLoad({date, dailySchedules})

    // Limpa as listas antes de renderizar
    document.querySelectorAll(".period ul").forEach(ul => ul.innerHTML = "");

    // Renderiza os agendamentos
    dailySchedules.forEach(schedule => {
      const when = dayjs(schedule.when);
      const hour = when.hour();
      
      // Define em qual período o agendamento pertence
      let periodClass;
      if (hour >= 8 && hour < 12) periodClass = "morning";
      else if (hour >= 12 && hour < 18) periodClass = "afternoon";
      else periodClass = "night";

      // Seleciona a lista do período
      const list = document.querySelector(`.${periodClass} ul`);
      
      // Cria o elemento do agendamento
      const li = document.createElement("li");
      li.dataset.id = schedule.id;
      li.innerHTML = `
        <div>
          <strong>${when.format("HH:mm")}</strong>
          <span>${schedule.name}</span>
        </div>
        <img src="src/assets/cancel.svg" alt="Ícone de cancelamento" class="cancel-icon">
      `;
      
      // Adiciona à lista
      list.appendChild(li);
    });

    // Configura os eventos de cancelamento
    setupCancelEvents();
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
    alert("Não foi possível carregar os agendamentos.");
  }
}
