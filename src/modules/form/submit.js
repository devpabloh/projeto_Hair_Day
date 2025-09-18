import dayjs from "dayjs";
import { createNewSchedule } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual
selectedDate.value = inputToday

// Definindo a data minima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault();

  try {
    // Recupera o nome do cliente
    const name = clientName.value.trim();
    if (!name) {
      return alert("Informe o nome do cliente!");
    }

    // Recupera o horário selecionado
    const hourSelected = document.querySelector(".hour-selected");
    if (!hourSelected) {
      return alert("Selecione um horário.");
    }

    // Recupera a hora e minuto do horário selecionado
    const [hours, minutes] = hourSelected.innerText.split(":");
    
    // Cria a data do agendamento
    const when = dayjs(selectedDate.value)
      .hour(parseInt(hours))
      .minute(parseInt(minutes || 0));

    // Gera um ID único
    const id = Date.now();

    console.log('Criando agendamento:', {
      id,
      name,
      when: when.toISOString()
    });
    
    // Faz o agendamento
    await createNewSchedule({
      id,
      name,
      when: when.toDate()
    });

    console.log('Agendamento criado com sucesso');
    
    // Recarrega os agendamentos
    await schedulesDay();

    // Limpa o formulário
    clientName.value = "";
    hourSelected.classList.remove("hour-selected");

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    alert("Não foi possível realizar o agendamento. Por favor, tente novamente.");
  }
};