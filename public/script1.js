document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('questionnaire-form');
    const historyContainer = document.getElementById('history-container');
    const addNewButton = document.getElementById('add-new');

    // Função para salvar os dados no servidor
    function saveHistoryEntry(entry) {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        })
        .then(response => response.json())
        .then(data => {
            displayHistory(data.history);
        })
        .catch(error => console.error('Erro ao salvar os dados:', error));
    }

    // Função para exibir os dados na página
    function displayHistory(history) {
        historyContainer.innerHTML = '';
        history.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('history-entry');
            entryDiv.innerHTML = `
                <p>Dia ${index + 1}</p>
                <p>Peso: ${entry.weight} kg</p>
                <p>Altura: ${entry.height} cm</p>
                <p>Cintura: ${entry.waist} cm</p>
                <p>Água: ${entry.water} litros</p>
            `;
            historyContainer.appendChild(entryDiv);
        });
    }

    // Carrega o histórico do servidor ao carregar a página
    function loadHistory() {
        fetch('/history')
        .then(response => response.json())
        .then(data => {
            displayHistory(data);
        })
        .catch(error => console.error('Erro ao carregar o histórico:', error));
    }

    // Listener para o botão "+" que abre o formulário
    addNewButton.addEventListener('click', () => {
        form.style.display = 'block';
        addNewButton.style.display = 'none';
    });

    // Listener para o formulário de questionário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = {
            weight: form.weight.value,
            height: form.height.value,
            waist: form.waist.value,
            water: form.water.value,
        };
        saveHistoryEntry(entry);
        form.reset();
        form.style.display = 'none';
        addNewButton.style.display = 'block';
    });

    // Carrega o histórico ao iniciar
    loadHistory();
});