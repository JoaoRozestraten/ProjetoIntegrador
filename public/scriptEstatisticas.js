document.addEventListener('DOMContentLoaded', () => {
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const waterCtx = document.getElementById('waterChart').getContext('2d');

    // Função para obter o histórico do usuário
    function loadHistory() {
        fetch('/history')
            .then(response => response.json())
            .then(data => {
                const labels = data.map((_, index) => `Dia ${index + 1}`);
                const weights = data.map(entry => entry.weight);
                const waterIntake = data.map(entry => entry.water);

                // Gráfico de Peso
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
                            fill: true
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Peso (kg)'
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

                // Gráfico de Hidratação
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
                            fill: true
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Litros'
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
