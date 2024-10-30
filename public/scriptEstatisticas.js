document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('statsChart').getContext('2d');

    // Função para obter o histórico do usuário
    function loadHistory() {
        fetch('/history')
            .then(response => response.json())
            .then(data => {
                // Extrai os dados para os rótulos e cada variável
                const labels = data.map((_, index) => `Dia ${index + 1}`);
                const weights = data.map(entry => entry.weight);
                const waterIntake = data.map(entry => entry.water);

                // Cria o gráfico usando Chart.js
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Peso (kg)',
                                data: weights,
                                backgroundColor: 'rgba(255, 159, 64, 0.2)', // Fundo laranja claro
                                borderColor: 'rgba(255, 159, 64, 1)',      // Borda laranja
                                borderWidth: 1,
                                fill: true
                            },
                            {
                                label: 'Água Bebida (litros)',
                                data: waterIntake,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fundo azul claro
                                borderColor: 'rgba(54, 162, 235, 1)',       // Borda azul
                                borderWidth: 1,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Valores'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Dias'
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Erro ao carregar o histórico:', error));
    }

    // Carrega o histórico ao carregar a página
    loadHistory();
});
