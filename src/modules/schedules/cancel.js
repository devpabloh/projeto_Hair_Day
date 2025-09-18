import { deleteSchedule } from "../../services/schedule-delete.js";
import { schedulesDay } from "./load.js";

export async function cancelSchedule(scheduleId) {
  try {
    // Confirma com o usuário antes de cancelar
    const confirmed = confirm("Tem certeza que deseja cancelar este agendamento?");
    if (!confirmed) {
      return;
    }

    // Chama o serviço para deletar o agendamento
    await deleteSchedule(scheduleId);
    
    // Recarrega a lista de agendamentos
    await schedulesDay();
    
    alert("Agendamento cancelado com sucesso!");
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    alert("Não foi possível cancelar o agendamento.");
  }
}