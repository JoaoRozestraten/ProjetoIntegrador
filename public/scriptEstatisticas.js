document.addEventListener('DOMContentLoaded', () => {
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const waterCtx = document.getElementById('waterChart').getContext('2d');
    const setGoalButton = document.getElementById('set-goal-button');
    const goalDisplay = document.getElementById('goal-display');

    const progressMessage = document.createElement('div');
    progressMessage.id = 'progress-message';
    progressMessage.classList.add('goal-text');
    document.body.appendChild(progressMessage); // Adiciona a mensagem abaixo dos gráficos

    function displayGoal(data) {
        if (data && data.goal) {
            goalDisplay.innerHTML = `<h2>Meta Selecionada: ${data.goal} kg</h2>`;
            checkProgress(data.goal);
        } else {
            goalDisplay.innerHTML = '';
            progressMessage.textContent = '';  // Limpa mensagem de progresso
        }
    }

    // Função para verificar o progresso em relação à meta
    function checkProgress(goalWeight) {
        fetch('/history')
            .then(response => response.json())
            .then(history => {
                if (history.length < 2) {
                    progressMessage.textContent = "Não há dados suficientes para avaliar a meta.";
                    return;
                }
                const currentWeight = history[history.length - 1].weight;

                if (currentWeight <= goalWeight) {
                    progressMessage.textContent = "Parabéns! Você atingiu a meta!";
                    progressMessage.style.color = "green";
                } else {
                    progressMessage.textContent = "Ainda não atingiu a meta, continue tentando!";
                    progressMessage.style.color = "red";
                }
            })
            .catch(error => console.error("Erro ao verificar progresso:", error));
    }

    function loadHistory() {
        fetch('/history')
            .then(response => response.json())
            .then(data => {
                const labels = data.map((_, index) => `Dia ${index + 1}`);
                const weights = data.map(entry => entry.weight);
                const waterIntake = data.map(entry => entry.water);

                new Chart(weightCtx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Peso (kg)',
                            data: weights,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: true,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Peso (kg)',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Dias',
                                },
                            },
                        },
                    },
                });

                new Chart(waterCtx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Hidratação (litros)',
                            data: waterIntake,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            fill: true,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Litros',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Dias',
                                },
                            },
                        },
                    },
                });
            })
            .catch(error => console.error("Erro ao carregar o histórico:", error));

        fetch('/current-goal')
            .then(response => response.json())
            .then(displayGoal)
            .catch(error => console.error("Erro ao carregar meta:", error));
    }

    setGoalButton.addEventListener('click', () => {
        const goalWeight = parseFloat(prompt("Digite sua meta de peso (entre 60 e 100 kg):"));

        if (goalWeight && goalWeight >= 60 && goalWeight <= 100) {
            fetch('/set-goal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal: goalWeight }),
            })
            .then(response => response.json())
            .then(displayGoal)
            .catch(error => console.error("Erro ao definir a meta:", error));
        } else {
            alert("Peso inválido! Insira um valor entre 60 e 100 kg.");
        }
    });

    loadHistory();
});
