// Dados de exemplo para a linha do tempo
const eventos = [
    {
        ano: '2015',
        titulo: 'Fundação da Escola',
        conteudo: 'A Escola Estadual Liberdade de Castro foi fundada em 2015.',
        midias: ['img/fundacao.jpg'],
        entrevistas: ['Vídeo com a diretora fundadora'],
    },
    {
        ano: '2018',
        titulo: 'Primeira Feira Técnica',
        conteudo: 'Realização da primeira feira técnica com participação dos alunos.',
        midias: ['img/feira2018.jpg'],
        entrevistas: ['Entrevista com alunos participantes'],
    },
    // Adicione mais eventos conforme necessário
];

function renderTimeline() {
    const container = document.querySelector('.timeline-container');
    eventos.forEach(evento => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerHTML = `
            <div class="event-year">${evento.ano}</div>
            <div class="event-content">
                <h3>${evento.titulo}</h3>
                <p>${evento.conteudo}</p>
                <div class="midias">
                    ${evento.midias.map(midia => `<img src="${midia}" alt="${evento.titulo}" style="max-width:200px;">`).join('')}
                </div>
                <div class="entrevistas">
                    ${evento.entrevistas.map(ent => `<p><strong>Entrevista:</strong> ${ent}</p>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(eventDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderTimeline);
