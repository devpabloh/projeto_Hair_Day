import dayjs from 'dayjs';
import {schedulesDay} from "./schedules/load"

document.addEventListener("DOMContentLoaded", function(){
  // Define a data atual como valor inicial do input
  const dateInput = document.getElementById("date");
  const today = dayjs().format("YYYY-MM-DD");
  dateInput.value = today;
  
  // Carrega os agendamentos do dia
  schedulesDay();
})