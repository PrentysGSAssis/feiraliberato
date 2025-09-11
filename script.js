document.addEventListener('DOMContentLoaded', function () {
    const contentData = {
        1974: `<h2>1974</h2><div class="box">Fundação da escola.<br>Entrevista com fundadores (em breve).</div>`,
        1985: `<h2>1985</h2><div class="box">Primeira feira técnica.<br>Vídeo dos organizadores (em breve).</div>`,
        2000: `<h2>2000</h2><div class="box">Expansão dos cursos.<br>Depoimentos de alunos (em breve).</div>`,
        2020: `<h2>2020</h2><div class="box">Feira digital.<br>Entrevistas e vídeos (em breve).</div>`
    };

    const yearButtons = document.querySelectorAll('.year');
    const contentDisplay = document.getElementById('year-content');
    let currentlyOpenYear = null;

    yearButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedYear = this.dataset.year;

            // Fecha o conteúdo se o mesmo ano for clicado novamente
            if (currentlyOpenYear === selectedYear) {
                contentDisplay.classList.remove('active');
                this.classList.remove('active');
                currentlyOpenYear = null;
                return;
            }

            yearButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            contentDisplay.innerHTML = contentData[selectedYear];
            contentDisplay.classList.add('active');
            currentlyOpenYear = selectedYear;
        });
    });
});
// Dados da linha do tempo
const eventos = [
    { ano: '1962', titulo: 'MARCO ZERO', conteudo: 'Criação da escola Santo Tomás de Aquino.' },
    { ano: '1966', titulo: 'Autorização de Funcionamento', conteudo: 'Ano em que a escola recebeu autorização oficial para funcionamento.' },
    { ano: '1968', titulo: 'Alteração de Nome e 1ª Turma do Magistério', conteudo: 'Alteração do nome para Liberto de Castro e formatura da primeira turma do magistério.' },
    { ano: '1998', titulo: 'Última Turma de Magistério', conteudo: 'Formatura da última turma do magistério.' },
    { ano: '2015', titulo: 'Fundação da Escola', conteudo: 'A Escola Estadual Liberdade de Castro foi fundada em 2015.' },
    { ano: '2018', titulo: 'Primeira Feira Técnica', conteudo: 'Realização da primeira feira técnica com participação dos alunos.' },
    { ano: '2020', titulo: 'Placeholder', conteudo: 'Conteúdo placeholder para futuros eventos.' }
];

let activeIndex = null;

function renderTimelineHorizontal() {
    const container = document.querySelector('.timeline-horizontal');
    container.innerHTML = '';
    eventos.forEach((ev, idx) => {
        const btn = document.createElement('button');
        btn.className = 'year-btn';
        btn.type = 'button';
        btn.textContent = ev.ano;
        btn.setAttribute('data-idx', idx);
        btn.onclick = () => expandEvent(idx);
        container.appendChild(btn);
    });
}

function expandEvent(idx) {
    activeIndex = idx;
    document.querySelectorAll('.year-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
    });
    const evento = eventos[idx];
    const details = document.getElementById('event-details');
    details.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p>${evento.conteudo}</p>
        <div class="midias"><p><em>Imagem/Vídeo placeholder</em></p></div>
        <div class="entrevistas"><p><em>Entrevista placeholder</em></p></div>
    `;
    details.classList.add('open');
    drawConnector(idx);
}

function drawConnector(idx) {
    const btns = document.querySelectorAll('.year-btn');
    const svg = document.getElementById('connector-svg');
    svg.innerHTML = '';
    if (activeIndex === null) return;
    const activeBtn = btns[idx];
    const details = document.getElementById('event-details');
    if (!activeBtn || !details.classList.contains('open')) return;
    const container = svg.parentElement;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const detailsRect = details.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2 - containerRect.left;
    const startY = btnRect.bottom - containerRect.top;
    const endX = detailsRect.left + detailsRect.width / 2 - containerRect.left;
    const endY = detailsRect.top - containerRect.top;
    const midY = (startY + endY) / 2;
    const path = `M${startX},${startY} C${startX},${midY} ${endX},${midY} ${endX},${endY}`;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', path);
    line.setAttribute('stroke', '#00c6fb');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('fill', 'none');
    svg.setAttribute('width', container.offsetWidth);
    svg.setAttribute('height', container.offsetHeight);
    svg.appendChild(line);
}

document.addEventListener('DOMContentLoaded', renderTimelineHorizontal);

// Abre o evento idx
function openEvent(idx) {
    const btns = document.querySelectorAll('.year-btn');
    const details = document.getElementById('event-details');
    const svg = document.getElementById('connector-svg');

    activeIndex = idx;
    isAnimating = true;

    // marcar botões
    btns.forEach((b, i) => {
        b.classList.toggle('active', i === idx);
        b.classList.toggle('active-expand', i === idx);
        b.setAttribute('aria-pressed', i === idx ? 'true' : 'false');
    });

    // preencher detalhes
    const ev = eventos[idx];
    details.innerHTML = `
        <button id="close-details" aria-label="Fechar detalhes" title="Fechar">✕</button>
        <h3>${ev.titulo}</h3>
        <p>${ev.conteudo}</p>
        <div class="midias"><p><em>Imagem/Vídeo placeholder</em></p></div>
        <div class="entrevistas"><p><em>Entrevista placeholder</em></p></div>
    `;
    // binding fechar
    const closeBtn = document.getElementById('close-details');
    closeBtn && closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeDetails(); });

    // abrir com animação (remove hidden state)
    details.classList.add('open');
    details.setAttribute('aria-hidden','false');

    // centralizar botão no carrossel horizontal
    const activeBtn = document.querySelector(`.year-btn[data-idx="${idx}"]`);
    activeBtn && activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

    // desenhar conector após alguns ms para garantir layout finalizado
    setTimeout(() => drawConnectorForActive(), 70);

    // escutar fim da animação de abertura para liberar clique
    const onOpenEnd = (ev) => {
        if (ev.propertyName === 'opacity' || ev.propertyName === 'max-height') {
            details.removeEventListener('transitionend', onOpenEnd);
            isAnimating = false;
        }
    };
    details.addEventListener('transitionend', onOpenEnd);

    // fallback
    setTimeout(() => { isAnimating = false; }, CLOSE_OPEN_TRANS_MS + 120);
}

// Fecha painel de detalhes
function closeDetails(silent = false) {
    const details = document.getElementById('event-details');
    const svg = document.getElementById('connector-svg');
    const btns = document.querySelectorAll('.year-btn');

    // remove classes nos botões
    btns.forEach(b => { b.classList.remove('active', 'active-expand'); b.setAttribute('aria-pressed','false'); });

    // iniciar animação de fechamento
    details.classList.remove('open');
    details.setAttribute('aria-hidden','true');

    // limpar o svg após a transição (de forma segura)
    const onCloseEnd = (ev) => {
        if (ev.propertyName === 'opacity' || ev.propertyName === 'max-height') {
            details.removeEventListener('transitionend', onCloseEnd);
            clearSVG(svg);
            if (!silent) isAnimating = false;
        }
    };
    details.addEventListener('transitionend', onCloseEnd);

    // fallback
    setTimeout(() => {
        clearSVG(svg);
        if (!silent) isAnimating = false;
    }, CLOSE_OPEN_TRANS_MS + 120);

    activeIndex = null;
}

// Desenha o conector SVG entre botão ativo e o painel
function drawConnectorForActive() {
    const svg = document.getElementById('connector-svg');
    clearSVG(svg);
    if (activeIndex === null) return;
    const btns = document.querySelectorAll('.year-btn');
    const activeBtn = btns[activeIndex];
    const details = document.getElementById('event-details');
    if (!activeBtn || !details.classList.contains('open')) return;
    const container = svg.parentElement;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const detailsRect = details.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2 - containerRect.left;
    const startY = btnRect.bottom - containerRect.top;
    const endX = detailsRect.left + detailsRect.width / 2 - containerRect.left;
    const endY = detailsRect.top - containerRect.top;
    const midY = (startY + endY) / 2;
    const path = `M${startX},${startY} C${startX},${midY} ${endX},${midY} ${endX},${endY}`;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', path);
    line.setAttribute('stroke', '#00c6fb');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('fill', 'none');
    line.setAttribute('filter', 'drop-shadow(0 2px 8px #00c6fb)');
    svg.setAttribute('width', container.offsetWidth);
    svg.setAttribute('height', container.offsetHeight);
    svg.appendChild(line);
}
