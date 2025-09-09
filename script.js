// Aguarda o conteúdo da página carregar (DOMContentLoaded) antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
    
    // Objeto que armazena o conteúdo HTML para cada ano
    const contentData = {
        1974: `<h2>1974</h2><div class="box">Fundação da escola.<br>Entrevista com fundadores (em breve).</div>`,
        1985: `<h2>1985</h2><div class="box">Primeira feira técnica.<br>Vídeo dos organizadores (em breve).</div>`,
        2000: `<h2>2000</h2><div class="box">Expansão dos cursos.<br>Depoimentos de alunos (em breve).</div>`,
        2020: `<h2>2020</h2><div class="box">Feira digital.<br>Entrevistas e vídeos (em breve).</div>`
    };

    // Seleciona todos os elementos de ano e o container de conteúdo
    const yearButtons = document.querySelectorAll('.year');
    const contentDisplay = document.getElementById('year-content');
    
    // Variável para rastrear qual ano está atualmente aberto
    let currentlyOpenYear = null;

    // Adiciona um evento de clique para cada botão de ano
    yearButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedYear = this.dataset.year; // Pega o ano do atributo 'data-year'

            // Se o ano clicado for o mesmo que já está aberto, fecha-o
            if (currentlyOpenYear === selectedYear) {
                contentDisplay.classList.remove('active');
                this.classList.remove('active');
                currentlyOpenYear = null;
                return; // Encerra a execução da função
            }

            // Remove a classe 'active' de todos os outros botões
            yearButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe 'active' ao botão que foi clicado
            this.classList.add('active');

            // Atualiza o HTML dentro da área de conteúdo e a exibe
            contentDisplay.innerHTML = contentData[selectedYear];
            contentDisplay.classList.add('active');
            
            // Atualiza a variável para o ano que acabou de ser aberto
            currentlyOpenYear = selectedYear;
        });
    });
});
