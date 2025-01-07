import dayjs from "dayjs"


const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual
selectedDate.value = inputToday

// Definindo a data minima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = (event) => {
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
    
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}