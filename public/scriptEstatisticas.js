//ver 0001 ver(atingir peso especifico)0002
document.addEventListener('DOMContentLoaded', () => { //CONTROLE DE VER (ERROS meta e display)
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const waterCtx = document.getElementById('waterChart').getContext('2d');
    const setGoalButton = document.getElementById('set-goal-button');
    const goalDisplay = document.getElementById('goal-display');

    const progressMessage = document.createElement('div');
    progressMessage.id = 'progress-message';
    progressMessage.classList.add('goal-text');
    document.body.appendChild(progressMessage);

    const plans = {
        A1: "Plano para ganhar peso até o intervalo [60, 70] kg",
        A2: "Plano para perder peso até o intervalo [60, 70] kg",
        B1: "Plano para ganhar peso até o intervalo [71, 80] kg",
        B2: "Plano para perder peso até o intervalo [71, 80] kg",
        C1: "Plano para ganhar peso até o intervalo [81, 90] kg",
        C2: "Plano para perder peso até o intervalo [81, 90] kg",
        D1: "Plano para ganhar peso até o intervalo [91, 100] kg",
        D2: "Plano para perder peso até o intervalo [91, 100] kg",
    };

    function displayGoal(data) {
        if (data && data.goal) {
            goalDisplay.innerHTML = `<h2>Meta Selecionada: ${data.goal} kg</h2>`;
            checkProgress(data.goal);
        } else {
            goalDisplay.innerHTML = '';
            progressMessage.textContent = '';
        }
    }
    

    function checkProgress(goalWeight) {
        fetch('/history')
            .then(response => response.json())
            .then(history => {
                if (history.length === 0) {
                    progressMessage.textContent = "Nenhum dado de histórico encontrado para avaliar a meta.";
                    return;
                }
    
                const currentWeight = parseFloat(history[history.length - 1].weight); // Converte o peso para número
                const goal = parseFloat(goalWeight); // Converte a meta para número
    
                // Verifica se o peso atual está exatamente igual à meta, com uma pequena margem para diferenças decimais
                if (Math.abs(currentWeight - goal) < 0.01) {
                    progressMessage.textContent = "Parabéns! Você atingiu a meta!";
                    progressMessage.style.color = "green";
                } else {
                    progressMessage.textContent = "Ainda não atingiu a meta, continue tentando!";
                    progressMessage.style.color = "red";
                }
    
                // Definir o plano com base no peso mais recente
                let plan = '';
                if (goal >= 60 && goal <= 70) {
                    plan = currentWeight < goal ? 'A1' : 'A2';
                } else if (goal >= 71 && goal <= 80) {
                    plan = currentWeight < goal ? 'B1' : 'B2';
                } else if (goal >= 81 && goal <= 90) {
                    plan = currentWeight < goal ? 'C1' : 'C2';
                } else if (goal >= 91 && goal <= 100) {
                    plan = currentWeight < goal ? 'D1' : 'D2';
                }
    
                // Exibir mensagem do plano, se aplicável
                if (plan) {
                    const planMessage = `Plano recomendado: ${plans[plan]}`;
                    goalDisplay.innerHTML += `<div class="goal-text">${planMessage}</div>`;
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
            .then(data => {
                if (data.success) {
                    // Atualiza diretamente o conteúdo de goalDisplay
                    goalDisplay.innerHTML = `<h2>Meta Selecionada: ${goalWeight} kg</h2>`;
                    displayGoal({ goal: goalWeight });
                } else {
                    alert("Erro ao definir meta. Tente novamente.");
                }
            })
            .catch(error => console.error("Erro ao definir a meta:", error));
        } else {
            alert("Peso inválido! Insira um valor entre 60 e 100 kg.");
        }
    });
    

    loadHistory();
});
