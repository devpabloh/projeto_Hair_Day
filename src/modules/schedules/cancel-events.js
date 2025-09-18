import { cancelSchedule } from "./cancel.js";

// Adiciona os event listeners para os botões de cancelamento
export function setupCancelEvents() {
  const periods = document.querySelectorAll(".period");

  // Gerar evento de click para cada lista (manhã, tarde e noite)
  periods.forEach((period) => {
    // Captura o evento de clique na lista
    period.addEventListener("click", async (event) => {
      if (event.target.classList.contains("cancel-icon")) {
        // Obtém a li pai do elemento clicado
        const item = event.target.closest("li");
        // Pega o id do item que queremos remover
        const { id } = item.dataset;

        if (id) {
          await cancelSchedule(id);
        }
      }
    });
  });
}
