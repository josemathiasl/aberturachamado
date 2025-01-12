document.addEventListener('DOMContentLoaded', () => {
    // Elementos para os botões
    const gerarChamadoButton = document.getElementById('gerarChamadoButton');
    const limparFormularioButton = document.getElementById('limparFormularioButton');
    const saidaCampo = document.getElementById('saida');
    const saidaChamado = document.getElementById('saidaChamado');

    // Função para remover acentos e caracteres especiais
    function removerAcentos(texto) {
        const mapaAcentos = {
            'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a', 'å': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
            'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i', 'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o', 'ú': 'u',
            'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'ñ': 'n', 'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A',
            'Å': 'A', 'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E', 'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I', 'Ó': 'O',
            'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O', 'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ç': 'C', 'Ñ': 'N'
        };

        return texto.replace(/[áàãâäåéèêëíìîïóòõôöúùûüçñÁÀÃÂÄÅÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇÑ]/g, (match) => mapaAcentos[match]);
    }

    // Função para gerar e exibir o chamado
    gerarChamadoButton.addEventListener('click', () => {
        // Coleta de informações do formulário
        const nomeCliente = removerAcentos(document.getElementById('nomeCliente').value.toUpperCase());
        const contato = removerAcentos(document.getElementById('contato').value.toUpperCase());
        const endereco = removerAcentos(document.getElementById('endereco').value.toUpperCase());
        const pontoReferencia = removerAcentos(document.getElementById('pontoReferencia').value.toUpperCase());
        const periodo = removerAcentos(document.getElementById('periodo').value.toUpperCase());

        // Coleta dos serviços extras selecionados
        const pontoExtraSelecionado = document.getElementById('instalacaoPontoExtra').value;
        const isencaoOS = document.getElementById('isençãoOS').checked;
        const nomeSupervisorIsencao = removerAcentos(document.getElementById('nomeSupervisorIsencao').value.toUpperCase());

        // Coleta dos alarmes selecionados
        const alarmes = Array.from(document.querySelectorAll('input[name="alarmes"]:checked')).map(checkbox => checkbox.value);

        // Coleta dos custos adicionais selecionados
        const custos = Array.from(document.querySelectorAll('input[name="custos"]:checked')).map(checkbox => checkbox.value);

        // Coleta das observações
        const observacoes = removerAcentos(document.getElementById('observacoes').value.toUpperCase());

        // Mensagem final condicional para isenção de OS
        let mensagemFinal = '';
        if (!isencaoOS) {
            mensagemFinal = `CLIENTE CIENTE DOS CUSTOS DE R$ 50,00 HORA TÉCNICA + MATERIAIS NECESSÁRIOS (VARIÁVEIS) CASO CONSTATADO DANOS A ESTRUTURA OU AOS EQUIPAMENTOS, OU SE CONSTATADO QUE O PROBLEMA FOI CAUSADO PELO CLIENTE.\n\nCLIENTE CIENTE DO PRAZO MÁXIMO DE ATENDIMENTO DE ATÉ 48 HORAS.`;
        }

        // Gerar o conteúdo do chamado
        let chamadoTexto = ` 
       \n        ________________INFORMACOES CLIENTE_______________
        CLIENTE: ${nomeCliente}__ 
        CONTATO: ${contato}__ 
        ENDERECO: ${endereco}__ 
        PONTO DE REFERENCIA: ${pontoReferencia}__ 
        PERIODO: ${periodo}__ 
        
       _______________INFORMACOES TECNICAS_______________ 
        CTO/FTTA: ${removerAcentos(document.getElementById('ctoFtta').value.toUpperCase())}__ 
        ID: ${removerAcentos(document.getElementById('id').value.toUpperCase())}__ 
        PPPoE: ${document.getElementById('pppoe').value}__ 
        POTENCIA: ${removerAcentos(document.getElementById('potencia').value.toUpperCase())}__ 
        
        ___________________OBSERVACOES___________________ 
        ${observacoes ? observacoes : 'Nenhuma observação fornecida.'}
        _____________________ALARMES_____________________ 
        ${alarmes.length > 0 ? alarmes.join('\n        ') : 'Nenhum alarme selecionado.'} 
        
        ________________CUSTOS ADICIONAIS________________ 
        ${custos.length > 0 ? custos.join('\n        ') : 'Nenhum custo adicional selecionado.'} 
        
        _____________________SERVICOS____________________ 
        ${pontoExtraSelecionado ? `Ponto Extra: ${pontoExtraSelecionado}` : 'Nenhum serviço extra selecionado.'} 
        ${isencaoOS ? `ORDEM DE SERVIÇO ISENTA CONFORME ACORDADO COM (Supervisor: ${nomeSupervisorIsencao})` : ''} 
        
        ${mensagemFinal} 
        `;
        
        // Exibe a saída gerada
        saidaChamado.textContent = chamadoTexto;
        saidaCampo.style.display = 'none';

        // Copiar a saída gerada para a área de transferência
        navigator.clipboard.writeText(chamadoTexto).then(() => {
            alert('Chamado gerado e copiado para a área de transferência!');
        }).catch(err => {
            alert('Erro ao copiar o chamado: ' + err);
        });
    });

    // Função para limpar o formulário
    limparFormularioButton.addEventListener('click', () => {
        document.getElementById('formulario').reset(); // Reseta todos os campos do formulário
        saidaCampo.style.display = 'none'; // Esconde a área de saída
        saidaChamado.textContent = ''; // Limpa o texto da saída
    });

    // Exibe a área de saída
    saidaCampo.style.display = 'block';
});

// Função para alternar a visibilidade das seções de Instalação/Troca de Endereço e Serviços Extras
function toggleSection(sectionId) {
    const sectionContent = document.getElementById(sectionId);
    if (sectionContent.style.display === 'none' || sectionContent.style.display === '') {
        sectionContent.style.display = 'block';
    } else {
        sectionContent.style.display = 'none';
    }
}
