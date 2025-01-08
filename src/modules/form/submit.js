import dayjs from "dayjs"

import {scheduleNew} from "../../services/schedule-new.js"
import {schedulesDay} from "../schedules/load.js"


const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual
selectedDate.value = inputToday

// Definindo a data minima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de recarregar a página.
  event.preventDefault()

  try {
    // Recuperando o nome do cliente.
    const name = clientName.value.trim()
    // verifica se o nome do cliente foi colocado.
    if(!name){
      return alert("Informe o nome do cliente!")
    }
    // Recupera o horário selecionado.
    const hourSelected = document.querySelector(".hour-selected")
    // Verifica se o horário foi selecionado ou não, caso não seja retorna um mensagem de alerta.
    if(!hourSelected){
      return alert("Selecione um horário.")
    }

    //Recupera apenas a hora.
    const [hour] = hourSelected.innerText.split(":")
    
    // Insere a hora na data do agendamento
    const when = dayjs(selectedDate.value).add(hour, "hour")

    // Gera um ID
    const id = new Date().getTime()
    
    // Faz o agendamento.
    await scheduleNew({
      id,
      name,
      when,
    })
    
    // Recarrega os agendamentos.
    await schedulesDay()

    // Limpa o input de nome do cliente.
    clientName.value = ""

  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}