import dayjs from "dayjs"


const form = document.querySelector("form")
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

  console.log("Enviando!")
}