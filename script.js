// Importa conteúdo do HTML para o objeto contentData
function getContentDataFromHTML() {
    return {
        1974: document.querySelector('.doc74')?.innerHTML || '',
        1985: document.querySelector('.doc85')?.innerHTML || '',
        2000: document.querySelector('.doc00')?.innerHTML || '',
        2020: document.querySelector('.doc20')?.innerHTML || ''
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const yearButtons = document.querySelectorAll('.year');
    const contentDisplay = document.getElementById('year-content');
    const timelineContainer = document.querySelector('.timeline-container');
    const bannerFixo = document.getElementById('banner-fixo');
    const bannerTituloFixo = document.getElementById('banner-titulo-fixo');
    const bannerImgFixo = document.getElementById('banner-img-fixo');
    let currentlyOpenYear = null;

    // Imagens e títulos por documento (substitua os src depois)
    const bannerData = {
        '1974': { titulo: '1974 - Paisagem histórica', img: 'paisagem-placeholder.jpg' },
        '1985': { titulo: '1985 - Paisagem dos anos 80', img: 'paisagem-placeholder.jpg' },
        '2000': { titulo: '2000 - Paisagem do novo milênio', img: 'paisagem-placeholder.jpg' },
        '2020': { titulo: '2020 - Paisagem atual', img: 'paisagem-placeholder.jpg' }
    };

    yearButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedYear = this.dataset.year;

            if (currentlyOpenYear === selectedYear) {
                contentDisplay.classList.remove('active');
                timelineContainer.classList.remove('active');
                this.classList.remove('active');
                // Oculta todas as sessões
                contentDisplay.querySelectorAll('section').forEach(sec => {
                    sec.style.display = 'none';
                    sec.classList.remove('active');
                });
                // Banner volta ao estado inicial
                bannerTituloFixo.textContent = 'Selecione um ano';
                bannerImgFixo.src = 'paisagem-placeholder.jpg';
                currentlyOpenYear = null;
                return;
            }

            yearButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            contentDisplay.classList.add('active');
            timelineContainer.classList.add('active');
            // Oculta todas as sessões
            contentDisplay.querySelectorAll('section').forEach(sec => {
                sec.style.display = 'none';
                sec.classList.remove('active');
            });
            // Exibe apenas a sessão do ano selecionado
            const activeSection = contentDisplay.querySelector(`.doc${selectedYear.slice(-2)}`);
            if (activeSection) {
                activeSection.style.display = 'block';
                activeSection.classList.add('active');
            }
            // Atualiza banner fixo
            bannerTituloFixo.textContent = bannerData[selectedYear].titulo;
            bannerImgFixo.src = bannerData[selectedYear].img;
            currentlyOpenYear = selectedYear;
        });
    });

    // Inicialmente, oculta todas as sessões
    contentDisplay.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });
    // Banner inicial
    bannerTituloFixo.textContent = 'Selecione um ano';
    bannerImgFixo.src = 'assets/placeholder.jpg';
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

const professoresData = {
    '1974': {
        'prof1-1974': {
            nome: 'Ana Souza',
            nasc: '10/03/1945',
            sobre: 'Professora de Matemática, atuou na fundação da escola.',
            extra: 'Participou da primeira feira técnica.',
            img: 'assets/prof-ana-souza.jpg'
        },
        'prof2-1974': {
            nome: 'Carlos Silva',
            nasc: '22/07/1942',
            sobre: 'Professor de História, referência em projetos culturais.',
            extra: 'Organizador do jornal escolar.',
            img: 'assets/prof-carlos-silva.jpg'
        },
        'prof3-1974': {
            nome: 'Maria Oliveira',
            nasc: '15/11/1948',
            sobre: 'Professora de Português, destaque em literatura.',
            extra: 'Idealizadora do clube de leitura.',
            img: 'assets/prof-maria-oliveira.jpg'
        },
        'prof4-1974': {
            nome: 'João Pereira',
            nasc: '05/02/1944',
            sobre: 'Professor de Ciências, pioneiro em laboratórios.',
            extra: 'Responsável pelo laboratório de química.',
            img: 'assets/prof-joao-pereira.jpg'
        },
        'prof5-1974': {
            nome: 'Fernanda Lima',
            nasc: '30/09/1950',
            sobre: 'Professora de Geografia, envolvida em projetos ambientais.',
            extra: 'Criadora da horta escolar.',
            img: 'assets/prof-fernanda-lima.jpg'
        }
    },
    '1985': {
        'prof1-1985': {
            nome: 'Paulo Mendes',
            nasc: '12/01/1952',
            sobre: 'Professor de Física, inovador em ensino experimental.',
            extra: 'Premiado em olimpíadas científicas.',
            img: 'assets/prof-paulo-mendes.jpg'
        },
        'prof2-1985': {
            nome: 'Luciana Costa',
            nasc: '18/06/1955',
            sobre: 'Professora de Inglês, fundadora do grupo de teatro.',
            extra: 'Coordenadora de intercâmbios.',
            img: 'assets/prof-luciana-costa.jpg'
        },
        'prof3-1985': {
            nome: 'Roberto Dias',
            nasc: '27/03/1950',
            sobre: 'Professor de Artes, mentor de exposições estudantis.',
            extra: 'Idealizador do mural da escola.',
            img: 'assets/prof-roberto-dias.jpg'
        },
        'prof4-1985': {
            nome: 'Juliana Ramos',
            nasc: '09/12/1957',
            sobre: 'Professora de Química, destaque em iniciação científica.',
            extra: 'Orientadora de projetos premiados.',
            img: 'assets/prof-juliana-ramos.jpg'
        },
        'prof5-1985': {
            nome: 'Sérgio Martins',
            nasc: '03/05/1953',
            sobre: 'Professor de Educação Física, referência em esportes escolares.',
            extra: 'Treinador do time campeão regional.',
            img: 'assets/prof-sergio-martins.jpg'
        }
    }
    // Adicione outros anos conforme necessário
};

function setupProfessores(ano) {
    const profBtns = document.querySelectorAll(`#sessao-${ano}-professores .prof-btn`);
    const profName = document.getElementById(`prof-name-${ano}`);
    const profNasc = document.getElementById(`prof-nasc-${ano}`);
    const profSobre = document.getElementById(`prof-sobre-${ano}`);
    const profExtra = document.getElementById(`prof-extra-${ano}`);
    const profImg = document.getElementById(`prof-img-${ano}`);

    profBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            profBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const profId = btn.getAttribute('data-prof');
            const data = professoresData[ano][profId];
            if (data) {
                profName.textContent = data.nome;
                profNasc.textContent = 'Nascimento: ' + data.nasc;
                profSobre.textContent = data.sobre;
                profExtra.textContent = data.extra;
                profImg.src = data.img;
                profImg.style.display = 'block';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // ...existing code...
    setupProfessores('1974');
    setupProfessores('1985');
    // Adicione outros anos conforme necessário
});
