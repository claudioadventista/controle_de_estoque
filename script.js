// ***** codigo javascript, que cadastra o produto no banco em php e atualiza a tabela sem refresh 
document.getElementById('form-produto').addEventListener('submit', (e) =>{
e.preventDefault();
    const nome = document.getElementById('nome').value;
    const codigoBarras = document.getElementById('codigo_barras').value;
    const precoCusto = document.getElementById('preco_custo').value;
    const precoVenda = document.getElementById('preco_venda').value;
    const quantidade = document.getElementById('quantidade').value;
    const selec = document.getElementById('cadastrarCategoria');
    const categoria  = selec.options[selec.selectedIndex].text;
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataValidade = document.getElementById('dataValidade').value;
    const fabricante = document.getElementById('fabricante').value;
    const prateleira = document.getElementById('prateleira').value;
    const outros = document.getElementById('outros').value;
    const qtdInicial = document.getElementById('qtdInicial').value;
    const minimo = document.getElementById('minimo').value;
    const maximo = document.getElementById('maximo').value;
    const fornecedor = document.getElementById('fornecedor').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const observacao = document.getElementById('observacao').value;

    // valida o campo telefone antes de cadastrar
    if(telefone != '' && telefone.length < 14){
        alert("O campo telefone está incompleto!");
        telefone = document.getElementById('telefone').value = '';
        exit();
    }

    if(email != ''){

        if(!validarEmail(email)){
            alert("O email digitado é inválido!");
            exit();
        }

    }

    try{
        fetch('cadastrar-produto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                codigoBarras,
                precoCusto,
                precoVenda,
                quantidade,
                categoria,
                dataEntrada,
                dataValidade,
                fabricante,
                prateleira,
                outros,
                qtdInicial,
                minimo,
                maximo,
                fornecedor,
                endereco,
                telefone,
                email,
                observacao
            })
        })
        .then((response) =>response.json())
        .then((data) => {
            if(data.resultado === 'Produto já cadastrado!'){
            alert('Produto já cadastrado!'); 
                document.getElementById('nome').value ='';
                document.getElementById('nome').focus();
            }else if(data.resultado === 'Produto cadastrado com sucesso!'){
                alert('Produto cadastrado com sucesso!'); 

                // reabilita o campo pesquisa produto
                document.getElementById('pesquisarProduto').disabled = false;
                // reabilita os botoes desabilitados e volta a classe ativa do botoes
                document.querySelectorAll('button').forEach(button => {
                    if(button.classList.contains('desabilita')){
                        button.classList.remove('ativo');
                        button.removeAttribute('disabled');
                    }
                })

                document.getElementById('btn-pesquisa').click();

                document.getElementById('form-produto').reset();
                document.getElementById('nome').focus();
            }else{
                alert('Erro ao cadastrado produto!');
            }    
        })
        .catch((error) => console.error(error));
    } catch (error) {
        console.error('Erro: ',error);
    }
});



// ***** codigo em javascript, que cadastrar nova categoria em php e atualiza a select sem refresh
document.getElementById('cadastrar-nova-Categoria').addEventListener('click', (e) =>{
e.preventDefault();
    const cadNovaCat = document.getElementById('novaCate').value.trim();
    if(cadNovaCat.length < 3){
        alert('Erro ao cadastrar categoria!\nMenos de três caracteres');
        exit();
    }
    try{
        fetch('cadastrar-categoria.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cadNovaCat
            })
        })
        .then((response) =>response.json())
        .then((data) => {
            if(data.resultado === 'Categoria já cadastrada!'){
            alert('Categoria já cadastrada!'); 
                document.getElementById('nome').value ='';
                document.getElementById('nome').focus();
            }else if(data.resultado === 'Categoria cadastrada com sucesso!'){
                document.getElementById('novaCat').value ='';
                document.getElementById('cadastrarCategoria').innerHTML = '';
                document.getElementById('alterarCategoria').innerHTML = '';
                alert('Categoria cadastrada com sucesso!'); 
                document.getElementById('mais-cat').click();
                document.getElementById('novaCate').focus();
            }else{
                alert('Erro ao cadastrado categoria!');
            }    
        })
        .catch((error) => console.error(error));
    } catch (error) {
        console.error('Erro: ',error);
    }
});




// ***** funcao em javascript que diminui produto no banco em php ao dar baixa
function darBaixa(idProduto, quantidade, quant){
    document.getElementById('form-baixar-mais').style.display = 'none';
    document.getElementById('baixarMais').value = '';
    document.getElementById('inputBaixarMais').value = '';
     document.getElementById('mascara').style.display = 'none'; 
    desmarcar();
     // primeira validacao se ha produto em estoque
    if(quant < 1){
        alert('Quantidade insuficiente em estoque!\nValidação antes do json'); 
        exit();
    } 
    fetch('verificar-quantidade.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProduto
        })
    })
    .then((response) => response.json())
    .then((data) => {
        // segunda validacao em json se ha produto em estoque
        if (quantidade > data.quantidade) {
            alert('Quantidade insuficiente em estoque!\nValidação em json'); 
        }else{
            // havendo quantidade suficiente, passa para a etapa de baixar o produto
            fetch('dar-baixa.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idProduto,
                    quantidade
                })
            })
            .then((response) => response.json())
            .then((data) => {
                alert(data.mensagem);
                // atualiza a tabela
                document.getElementById('btn-pesquisa').click();
            })
            .catch((error) => console.error(error));  
        }
    })
    .catch((error) => console.error(error)); 
}




// ***** funcao em javascript que altera o produto no banco em php, e atualiza na tabela sem refresh
function alterarProduto(idProduto, nome, codigoBarras, precoCusto, precoVenda, quantidade, minimo, maximo, categoria, dataEntrada, dataValidade, dataReposicao, reposicao, fabricante, prateleira, outros, quantidade_inicial, fornecedor, endereco, telefone, email, observacao, alterarCategoria){
   
    // valida o campo telefone antes de cadastrar
    if(telefone != '' && telefone.length < 14){
        alert("O campo telefone está incompleto!");
        telefone = document.getElementById('telefone').value = '';
        exit();
    }
    // valida o campo email antes de alterar
    if(email != ''){
        if(!validarEmail(email)){
            alert("O email digitado é inválido!");
            exit();
        }
    }

    fetch('alterar-produto.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idProduto,
        nome,
        codigoBarras,
        precoCusto,
        precoVenda,
        quantidade,
        minimo,
        maximo,
        categoria,
        dataEntrada,
        dataValidade,
        dataReposicao,
        reposicao,
        fabricante,
        prateleira,
        outros,
        quantidade_inicial,
        fornecedor,
        endereco,
        telefone,
        email,
        observacao,
        alterarCategoria
    })
})
    .then((response) =>response.json())
    .then((data) => {
        alert(data.mensagem);
        // reabilita o campo pesquisa produto
        document.getElementById('pesquisarProduto').disabled = false;
        // reabilita os botoes desabilitados e volta a classe ativa do botoes
        document.querySelectorAll('button').forEach(button => {
            if(button.classList.contains('desabilita')){
                button.classList.remove('ativo');
                button.removeAttribute('disabled');
            }
        })
        // atualiza as alteracoes do produto na tabela
        document.getElementById('btn-pesquisa').click();
        cancelar();
    })
    .catch((error) => console.error(error));
}




// ***** funcao em javascript que altera a categoria no banco em php, e atualiza na tabela sem refresh
function alterarCategoria(idCategoria, categoria){
    fetch('alterar-categoria.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idCategoria,
        categoria
    })
})
    .then((response) =>response.json())
    .then((data) => {
        alert(data.mensagem);
        document.getElementById('alterarCat').style.display = 'none';
        document.getElementById('mais-cat').click();
    })
    .catch((error) => console.error(error));
}




// ***** funcao que abre o formulario alterar produto e carrega os campos a ser alterado
function abrirFormularioAlterar(idProduto, nome, codigoBarras, precoCusto, precoVenda, custoTotal, quantidade, minimo, maximo, categoria, dataEntrada, dataValidade, dataReposicao, dataSaida, fabricante, prateleira, outros, quantidade_inicial, fornecedor, endereco, telefone, email, observacao){
    // esconde o formulario de cadastro
    document.getElementById('form-produto').style.display = 'none';
    document.getElementById('tabela').style.display = 'none';
    document.getElementById('rodape-tabela').style.display = 'none';

    const butDesabilitado = document.querySelectorAll('.desabilita');

    // desabilita o campo pesquisa
    document.getElementById('pesquisarProduto').disabled = true;
    // desativa os botoes e muda a classe
    document.querySelectorAll('button').forEach(button => {
        if(button.classList.contains('desabilita')){
            button.classList.add('ativo');
            button.setAttribute('disabled','true');
        }
    })

    desmarcar();
    // mostra o formulario de alteracao
    const formulario = document.getElementById('form-alterar-produto');
    formulario.style.opacity = '0';
    formulario.style.display = 'block';
    formulario.style.transition = 'opacity 0.5s, transform 0.5s';
    
    requestAnimationFrame(() => {
        formulario.style.opacity = '1';
     });
    
    document.getElementById('novoNome').value = nome;
    document.getElementById('novoCodigo_barras').value = codigoBarras;
    document.getElementById('novoPreco_custo').value = precoCusto.toString().replace('.',',');// em caso de valores com ponto, troca por virgula para apresentar no formulario
    document.getElementById('novoPreco_venda').value = precoVenda.toString().replace('.',',');
    document.getElementById('novoCustoTotal').value = custoTotal.toString().replace('.',',');
    document.getElementById('novaQuantidade').value = quantidade;
    document.getElementById('novoMinimo').value = minimo;
    document.getElementById('novoMaximo').value = maximo;
    document.getElementById('novaCategoria').value = categoria;
    document.getElementById('novaDataEntrada').value = dataEntrada;
    document.getElementById('novaDataValidade').value = dataValidade;
    document.getElementById('novaDataReposicao').value = dataReposicao;
    document.getElementById('novaDataSaida').value = dataSaida;
    document.getElementById('novoFabricante').value = fabricante;
    document.getElementById('novaPrateleira').value = prateleira;
    document.getElementById('novoOutros').value = outros;
    document.getElementById('novaQuantidade_inicial').value = quantidade_inicial;
    document.getElementById('novoFornecedor').value = fornecedor;
    document.getElementById('novoEndereco').value = endereco;
    document.getElementById('novoTelefone').value = telefone;
    document.getElementById('novoEmail').value = email;
    document.getElementById('novaObservacao').value = observacao;

    formulario.onsubmit = function(event){
        event.preventDefault();
        const novoNome = document.getElementById('novoNome').value;
        const novoCodigoBarras = document.getElementById('novoCodigo_barras').value;
        const novoPrecoCusto = document.getElementById('novoPreco_custo').value;
        const novoPrecoVenda = document.getElementById('novoPreco_venda').value;
        const novaQuantidade = document.getElementById('novaQuantidade').value;   
        const novoMinimo = document.getElementById('novoMinimo').value;   
        const novoMaximo = document.getElementById('novoMaximo').value;   
        const novaDataEntrada = document.getElementById('novaDataEntrada').value;
         const novaDataValidade = document.getElementById('novaDataValidade').value;
        const dataNovaReposicao = document.getElementById('dataNovaReposicao').value;
        const novaReposicao = document.getElementById('novaReposicao').value;
        const novoFabricante =  document.getElementById('novoFabricante').value;
        const novaPrateleira = document.getElementById('novaPrateleira').value;
        const novoOutros = document.getElementById('novoOutros').value;
        const novaQuantidade_inicial = document.getElementById('novaQuantidade_inicial').value;
        const novoFornecedor = document.getElementById('novoFornecedor').value;
        const novoEndereco = document.getElementById('novoEndereco').value;
        const novoTelefone = document.getElementById('novoTelefone').value;
        const novoEmail = document.getElementById('novoEmail').value;
        const novaObservacao = document.getElementById('novaObservacao').value;
        const novaCategoria = document.getElementById('novaCategoria').value; 
        const selectAlterarCat = document.getElementById('alterarCategoria');
        const alterarCategoria = selectAlterarCat.options[selectAlterarCat.selectedIndex].text;

        alterarProduto(idProduto, novoNome, novoCodigoBarras, novoPrecoCusto, novoPrecoVenda, novaQuantidade, novoMinimo, novoMaximo, novaCategoria, novaDataEntrada, novaDataValidade, dataNovaReposicao, novaReposicao, novoFabricante, novaPrateleira, novoOutros, novaQuantidade_inicial, novoFornecedor, novoEndereco, novoTelefone, novoEmail, novaObservacao, alterarCategoria);
    }
};




// ***** funcao que abre o formulario e carrega a categoria a ser alterada
function abrirFormularioAlterarCategoria(idCategoria, categoria){
    const formulario = document.getElementById('alterarCat');
    const novaCat = document.getElementById('novaCat');
    novaCat.style.display = 'none';

    const form = document.getElementById('alterarCat');
    form.style.opacity = '0';
    form.style.display = 'block';
    form.style.transition = 'opacity 0.5s, transform 0.5s';
    form.style.transform = 'translateY(-20px';
    requestAnimationFrame(() => {
        form.style.opacity = '1';
        form.style.transform = 'translatey(0)';
     });


    document.getElementById('alterarCate').value = categoria;
    
    formulario.onsubmit = function(event){
        event.preventDefault();
        const altCategoria = document.getElementById('alterarCate').value;       
        alterarCategoria(idCategoria, altCategoria);
    }
};




// ***** funcao do botao cancelar no formulario de alteracao 
function cancelar(){
    document.getElementById('form-alterar-produto').reset();
    document.getElementById('form-alterar-produto').style.display = 'none';
    document.getElementById('form-produto').reset();
    document.getElementById('form-produto').style.display = 'none';
    document.getElementById('tabela').style.display = 'block';
    document.getElementById('rodape-tabela').style.display = 'block';
    document.getElementById('mascara').style.display = 'none';
    document.getElementById('novoCadastro').disabled = false;
    document.getElementById('marcar').disabled = false;
    document.getElementById('desmarcar').disabled = false;
    document.getElementById('btn-pesquisa').disabled = false;
    // reabilita o campo pesquisa produto
    document.getElementById('pesquisarProduto').disabled = false;
    // reabilita os botoes desabilitados e volta a classe ativa do botoes
    document.querySelectorAll('button').forEach(button => {
        if(button.classList.contains('desabilita')){
            button.classList.remove('ativo');
            button.removeAttribute('disabled');
        }
    })

    desmarcar();
}




// ***** codigo que carrega os produtos na tabela ao dar refresh
// e pesquisa o produto no banco
document.getElementById('btn-pesquisa').addEventListener('click', function() {
    let tot = 0;
    const pesquisa = document.getElementById('pesquisarProduto').value;
    fetch('pesquisar-produto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pesquisa
        })
    })  
    .then((response) =>response.json())
    .then((data) => {  
        // valida a busca se nao encontrar nada 
        if(data == 0){
            alert("Nenhum produto\n" + pesquisa + "\nfoi encontrado!");
            document.getElementById('clearBtn').click();
            exit;
        }
        document.getElementById("imprimir").classList.add('ativo');
        document.getElementById("imprimir").disabled = true;
        const tabela = document.getElementById('tabela-produtos');
        tabela.innerHTML = '';
        data.forEach((produto) => {
            if(tot > 0){
                document.getElementById('marcar').disabled = false;
                document.getElementById('desmarcar').disabled = false;
            }else{
                document.getElementById('marcar').disabled = true;
                document.getElementById('desmarcar').disabled = true;
            }
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td><input class="checkImprimi" type=checkbox name="numeros[]" value="${produto.id}"  onclick="verifica();" ></center></dt>
            <td class="tdQuantidade">${tot = tot+1}</dt>
            <td class="tdQuantidade">${produto.id}</td>
            <td><button class="button but_tres_mais alterar" onclick="abrirFormularioAlterar(${produto.id}, '${produto.nome}', '${produto.codigo_barras}', '${produto.preco_custo}', '${produto.preco_venda}', '${produto.custo_total}', '${produto.quantidade}', '${produto.minimo}', '${produto.maximo}', '${produto.categoria}', '${produto.data_entrada}', '${produto.data_validade}', '${produto.dataReposicao}', '${produto.data_saida}', '${produto.fabricante}', '${produto.prateleira}', '${produto.outros}', '${produto.quantidade_inicial}', '${produto.fornecedor}', '${produto.endereco}', '${produto.telefone}', '${produto.email}', '${produto.obs}')">+</button>${produto.nome}</td>
            <td>R$ ${produto.preco_venda.toString().replace('.',',')}</td><!-- troca o ponto pela virgula  -->
            <td class="tdQuantidade">${produto.quantidade}</td>
            <td>${produto.prateleira}</td>
            <td>${produto.categoria}</td>
            <td>
                <button class="button baixar1" 
                    onclick="if(${produto.quantidade} < 1) {alert('Quantidade insuficiente em estoque!\\nValidação no botão');exit();};
                    if(confirm('Confira, e clique em OK para dar 1 baixa em: \\nNome : ${produto.nome}\\nLinha : ${tot}\\nCategoria : ${produto.categoria}\\nQuantidade : ${produto.quantidade}')){darBaixa(${produto.id}, 1,'${produto.quantidade}');}">Baixa 1
                </button>
                 
                <button class="button baixarM" onclick="darBaixaMais(${produto.id}, '${tot}', '${produto.nome}', '${produto.categoria}', '${produto.quantidade}')">Baixa +</button>
                <button class="button but_tres alterar" onclick="abrirFormularioAlterar(${produto.id}, '${produto.nome}', '${produto.codigo_barras}', '${produto.preco_custo}', '${produto.preco_venda}', '${produto.custo_total}', '${produto.quantidade}', '${produto.minimo}', '${produto.maximo}', '${produto.categoria}', '${produto.data_entrada}', '${produto.data_validade}','${produto.dataReposicao}', '${produto.data_saida}', '${produto.fabricante}', '${produto.prateleira}', '${produto.outros}', '${produto.quantidade_inicial}', '${produto.fornecedor}', '${produto.endereco}', '${produto.telefone}', '${produto.email}', '${produto.obs}')">Alt</button>
                <button class="button but_tres baixar1" onclick="imprimirUm(${produto.id})">Imp</button>
                <button class="button but_tres but_excluir" onclick="excluirProduto(${produto.id}, '${tot}','${produto.nome}')">Exc</button>
                </td>
            `;
            tabela.appendChild(linha);
            document.getElementById('total').innerHTML = tot;

        });
    })
    .catch((error) => console.error(error));
});




// ***** funcao javascript que exclui o produto no banco em php
function excluirProduto(id, linha, nome){
    if(confirm('Tem certeza que deseja excluir este produto?\n'+ 'Linha : '+ linha +'\nNome : '+ nome)){
      fetch('excluir-produto.php?id='+id , {
                method: 'DELETE'
            })
        .then((response) =>response.json())
        .then((data) => {
            if(data.resultado === 'Sucesso!'){
                alert('Produto excluido com sucesso! Javascript');
                document.getElementById('btn-pesquisa').click();
            }else{
                alert('Erro ao excluir o produto! Javascript');
            }
        })
           .catch((error) => console.error(error));

    }
}




// ***** funcao javascript que exclui a categoria no banco em php
function excluirCategoria(id, categoria){
    if(confirm('Tem certeza que deseja excluir esta categoria?\n'+ categoria)){
      fetch('excluir-categoria.php?id='+id , {
                method: 'DELETE'
            })
        .then((response) =>response.json())
        .then((data) => {
            if(data.resultado === 'Sucesso!'){
                alert('Categoria excluida com sucesso! Javascript');
                 //document.getElementById('mascara').style.display = 'none'; 
                 document.getElementById('mais-cat').click();
                document.getElementById('pesquisarCategoria').value='';
                //document.getElementById('novaCat').style.display='none';
            }else{
                alert('Erro ao excluir a categoria! Javascript');
            }
        })
           .catch((error) => console.error(error));
    }
}




// ***** codigo que limpa o campo pesquisa ao clicar no x de dentro, 
//       limpa o formulario e atualiza a tabela
document.getElementById('clearBtn').addEventListener('click', function(){
    let input = document.getElementById('pesquisarProduto');
    input.value ='';
    input.focus();
    document.getElementById('btn-pesquisa').click();
})




//       limpa o formulario e atualiza a tabela
document.getElementById('clearBtnCat').addEventListener('click', function(){
    let input = document.getElementById('pesquisarCategoria');
    input.value ='';
    input.focus();
    document.getElementById('btn-pesquisaCat').click();
})




// ***** codigo que carrega o select do formulario cadastrar produto ao clicar nele
const selectProduto = document.getElementById('cadastrarCategoria');
selectProduto.addEventListener('click', () =>{
    
    if(selectProduto.length === 0){
        fetch('listar-categoria.php')
        .then((response) =>response.json())
        .then((data) => {
            // inverte a ordem para desc no select cadastrar produto
            data.sort((a,b) => b.id - a.id);
            // cria a primeira option vazia
            const optionVazia = document.createElement('option');
            optionVazia.value = '';
            selectProduto.add(optionVazia);
            data.forEach((produto) => {
                const option = document.createElement('option');
                option.value = produto.id;
                option.text = produto.categoria;
                selectProduto.appendChild(option);
            });
        })
        .catch((error) => console.error(error));
    }

});




// ***** codigo que carrega o select do formulario alterar produto ao clicar nele
const selectProdutoAlt = document.getElementById('alterarCategoria');
selectProdutoAlt.addEventListener('click', () =>{
    if(selectProdutoAlt.length === 0){
        fetch('listar-categoria.php')
        .then((response) =>response.json())
        .then((data) => {
            // inverte a ordem para desc no select alterar produto
            data.sort((a,b) => b.id - a.id);
            // cria a primeira option vazia
            const optionVazia = document.createElement('option');
            optionVazia.value = '';
            selectProdutoAlt.add(optionVazia);
            data.forEach((produto) => {
                const option = document.createElement('option');
                option.value = produto.id;
                option.text = produto.categoria;
                selectProdutoAlt.appendChild(option);
            });
        })
        .catch((error) => console.error(error));
    }
});




// ***** codigo para mostrar o formulario com as categorias na tabela categoria
document.getElementById('mais-cat').addEventListener('click', (event) =>{
event.preventDefault();
    document.getElementById('btn-pesquisaCat').click();
    document.getElementById('mascara').style.display = 'block';

    const form = document.getElementById('novaCat');
    form.style.opacity = '0';
    form.style.display = 'block';
    form.style.transition = 'opacity 0.5s, transform 0.5s';
    form.style.transform = 'translateY(-20px';
    
    requestAnimationFrame(() => {
        form.style.opacity = '1';
        form.style.transform = 'translatey(0)';
     });

    document.getElementById('novaCate').value = '';
    document.getElementById('novaCate').focus();

});




// ***** codigo que esconde a tabela e mostra o formulario novo cadastro
document.getElementById('novoCadastro').addEventListener('click', (event) =>{
event.preventDefault();
    
    //document.getElementById('marcar').style.visibility ='hidden';
    //document.getElementById('desmarcar').style.visibility ='hidden';
    document.getElementById('tabela').style.display ='none';
    document.getElementById('rodape-tabela').style.display ='none';
    document.getElementById('form-alterar-produto').style.display = 'none';
   
    // pega o id do produto
    const form = document.getElementById('form-produto');
    // mostra suavemente
    form.style.opacity = '0';
    form.style.display = 'block';
    form.style.transition = 'opacity 0.5s, transform 0.5s';
    requestAnimationFrame(() => {
        form.style.opacity = '1';
     });

    // desabilita o campo pesquisa
    document.getElementById('pesquisarProduto').disabled = true;
    // desativa os botoes e muda a classe
    document.querySelectorAll('button').forEach(button => {
        if(button.classList.contains('desabilita')){
            button.classList.add('ativo');
            button.setAttribute('disabled','true');
        }
    })
     
    desmarcar();
});




// ***** funcao em javascript que da baixa do produto no banco em php e atualiza a tabela sem refresh
function darBaixaMais(idBaixa, produtoNumero, produtoNome, produtoCategoria, produtoQuantidade){
    // valida a opcao de dar baixa no produto
    if(produtoQuantidade < 1){
        alert('Quantidade insuficiente em estoque!\nValidação antes do json'); 
        exit();
    }  

    document.getElementById('mascara').style.display = 'block'; 
    const form = document.getElementById('form-baixar-mais');
    form.style.opacity = '0';
    form.style.display = 'block';
    form.style.transition = 'opacity 0.5s, transform 0.5s';
    form.style.transform = 'translateY(-20px';
    
    requestAnimationFrame(() => {
        form.style.opacity = '1';
        form.style.transform = 'translatey(0)';
     });

    document.getElementById('inputBaixarMais').value = idBaixa;
    document.getElementById('baixaNumero').innerHTML = produtoNumero ;
    document.getElementById('baixaNome').innerHTML = produtoNome;
    document.getElementById('baixaCategoria').innerHTML = produtoCategoria;
    document.getElementById('baixaQuantidade').innerHTML = produtoQuantidade;  
    document.getElementById('baixarMais').focus();
}




// ***** codigo para o botao cancelar baixa, no formulario baixar mais
document.getElementById('cancelarBaixaMais').addEventListener('click', (event) =>{
event.preventDefault();
    document.getElementById('form-baixar-mais').style.display ='none';
    document.getElementById('baixarMais').value = '';
    document.getElementById('inputBaixarMais').value = '';   
    document.getElementById('mascara').style.display = 'none'; 
});




// ***** pesquisa a categoria no banco, e carrega a tabela
document.getElementById('btn-pesquisaCat').addEventListener('click', function() {
    let tot = 0;
    const pesquisa = document.getElementById('pesquisarCategoria').value;
    fetch('pesquisar-categoria.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pesquisa
        })
    })  
    .then((response) =>response.json())
    .then((data) => {  
         data.sort((a,b) => b.id - a.id);
        // valida a busca se nao encontrar nada 
        if(data == 0){
            alert("Nenhuma categoria\n" + pesquisa + "\nfoi encontrado!");
            document.getElementById('clearBtn').click();
            exit;
        }
        const tabela = document.getElementById('tabela-categoria');
        tabela.innerHTML = '';
        data.forEach((produto) => {
            tot = tot+1;
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td class="td-categoria-produto">${produto.categoria}</td>
            <td class="td-categoria-botao">  
                <button class="button but_tres alterar" onclick="abrirFormularioAlterarCategoria(${produto.id}, '${produto.categoria}')">Alt</button>
            </td>
            <td class="td-categoria-botao">
                <button class="button but_tres but_excluir"  onclick="excluirCategoria(${produto.id},'${produto.categoria}')">Exc</button>
            </td>
            `;
            tabela.appendChild(linha);
            document.getElementById('total-categoria').innerHTML = tot;
        });
    })
    .catch((error) => console.error(error));
});




// ***** mascara do campo telefone
function mascaraTelefone(telefone){
    let valor = telefone.value;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
    telefone.value = valor;
 }




 // ***** impedi iniciar o campo quantidade com zero
function impedirZeroNoInicio(event){
    if(event.target.value.length === 0 && event.key === '0'){
        event.preventDefault();
    }
};




// ***** maximo de caracteres no campo, para input type number
// acrescentar no input oninput="limitarDigitos(this,6)"
function limitarDigitos(input,maxLength){
    if(input.value.length > maxLength){
        input.value = input.value.slice(0, maxLength);
    }
};




// ***** formata o campo preco de custo no formulario de cadastro
const campoPrecoCusto = document.getElementById('preco_custo');
campoPrecoCusto.addEventListener('input', (e) => {
    let valor = e.target.value;
    // exclui tudo que nao seja numero e virgula
    valor = valor.replace(/[^0-9,]/g, '');
    const partes = valor.split(',');
    if(valor === '0'){
        valor = '0,';
    }
    // limita o uso da virgula a apenas uma vez no campo
    if(partes.length > 2) {
        valor = partes[0] + ',' + partes.slice(1).join('');
    }
    // limita os caracteres a apenas dois depois da virgula
    if(valor.includes(',')){
        const partes = valor.split(',');
        if(partes[1].length > 2) {
            valor = partes[0] + ',' + partes[1].slice(0, 2);
        }
    };
    e.target.value = valor;
});




// ***** formata o campo novo preco de custo no formulario de alteracao 
const campoNovoCusto = document.getElementById('novoPreco_custo');
campoNovoCusto.addEventListener('input', (e) => {
    let valor = e.target.value;
    // exclui tudo que nao seja numero e virgula
    valor = valor.replace(/[^0-9,]/g, '');
    const partes = valor.split(',');
    if(valor === '0'){
        valor = '0,';
    }
    // limita o uso da virgula a apenas uma vez no campo
    if(partes.length > 2) {
        valor = partes[0] + ',' + partes.slice(1).join('');
    }
    // limita os caracteres a apenas dois depois da virgula
    if(valor.includes(',')){
        const partes = valor.split(',');
        if(partes[1].length > 2) {
            valor = partes[0] + ',' + partes[1].slice(0, 2);
        }
    };
    e.target.value = valor;
});




// ***** formata o campo preco de venda no formulario de cadastro
const campoPrecoVenda = document.getElementById('preco_venda');
campoPrecoVenda.addEventListener('input', (e) => {
    let valor = e.target.value;
    // exclui tudo que nao seja numero e virgula
    valor = valor.replace(/[^0-9,]/g, '');
    const partes = valor.split(',');
    if(valor === '0'){
        valor = '0,';
    }
    // limita o uso da virgula a apenas uma vez no campo
    if(partes.length > 2) {
        valor = partes[0] + ',' + partes.slice(1).join('');
    }
    // limita os caracteres a apenas dois depois da virgula
    if(valor.includes(',')){
        const partes = valor.split(',');
        if(partes[1].length > 2) {
            valor = partes[0] + ',' + partes[1].slice(0, 2);
        }
    };    
    e.target.value = valor;
});




// ***** formata o campo novo preco de venda no formulario de alteracao
const campoNovoVenda = document.getElementById('novoPreco_venda');
campoNovoVenda.addEventListener('input', (e) => {
    let valor = e.target.value;
    // exclui tudo que nao seja numero e virgula
    valor = valor.replace(/[^0-9,]/g, '');
    const partes = valor.split(',');
    if(valor === '0'){
        valor = '0,';
    }
    // limita o uso da virgula a apenas uma vez no campo
    if(partes.length > 2) {
        valor = partes[0] + ',' + partes.slice(1).join('');
    }
    // limita os caracteres a apenas dois depois da virgula
    if(valor.includes(',')){
        const partes = valor.split(',');
        if(partes[1].length > 2) {
            valor = partes[0] + ',' + partes[1].slice(0, 2);
        }
    };    
    e.target.value = valor;
});




// ***** funcao que valida o email
function validarEmail(email){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};





// ***** funcao que pega o valor do botao Imp na tabela, e manda para a pagina de imprissao
   function imprimirUm(impUm){
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'imprimir-produto.php';
    //form.target = '_blank';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'impUm';
    input.value = impUm;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
};





// ***** funcao que pega o valor dos checkboxes marcados e manda para imprimir
document.getElementById('imprimir').addEventListener('click', function() {
    const ids = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        ids.push(checkbox.value);
    });

    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'imprimir-produto.php';
    //form.target = '_blank';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'ids';
    input.value = ids.join(',');
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
});




// ***** funcao que verifica quantidade de checkbox marcados e habilita o botao de imprimir varios
function verifica(){
    // conta a quantidade de checkbox marcados e coloca na variável checado
    let checado = document.querySelectorAll('input[class="checkImprimi"]:checked').length;
    if(checado > 1){
        document.getElementById("imprimir").disabled = false;
        document.getElementById("imprimir").classList.remove('ativo');

    }else{
        document.getElementById("imprimir").disabled = true;
        document.getElementById("imprimir").classList.add('ativo');
    };
};	




// ***** carrega a imagem se ela existir
const logoDiv  = document.getElementById('logo');
fetch('logo.jpg')
.then(response => {
    if (response.ok){
        const img = document.createElement('img');
        img.src = 'logo.jpg';
        img.width = 100;
        img.height = 45;
        img.style.cursor = 'pointer';
        logoDiv.appendChild(img);
    }
})
.catch(error => {
    console.error(error);
});




// ***** amplia a logomarca ao clicar 
const img = document.createElement('img');
img.src = 'logo.jpg';
logoDiv.addEventListener('click',() =>{
    const expandedDiv = document.createElement('div');
    expandedDiv.style.position = 'fixed';
    expandedDiv.style.top = '0';
    expandedDiv.style.left = '0';
    expandedDiv.style.width = '100%';
    expandedDiv.style.height = '100%';
    expandedDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    expandedDiv.style.display = 'flex';
    expandedDiv.style.justifyContent = 'center';
    expandedDiv.style.alignItems = 'center';
    expandedDiv.style.zIndex = '5';
    expandedDiv.style.opacity = '0';
    expandedDiv.style.transition = 'opacity 0.5s';

    const expandedImg = new Image();
    expandedImg.src = img.src;
    expandedImg.onload = () => {
        expandedImg.style.width = 'auto';
        expandedImg.style.height = 'auto';
        expandedImg.style.maxWidth = '90%';
        expandedImg.style.maxHeight = '90%';
        expandedImg.style.opacity = '0';
        expandedImg.style.transition = 'opacity 0.5s';
        expandedImg.style.cursor = 'pointer';
        expandedDiv.appendChild(expandedImg);

        setTimeout(() => {
            expandedDiv.style.opacity = '1';
            expandedImg.style.opacity = '1';
        }, 100);
    };
    
    expandedDiv.appendChild(expandedImg);
    document.body.appendChild(expandedDiv);

    expandedDiv.addEventListener('click', () => {
        expandedDiv.style.opacity = '0';

        setTimeout(() => {
             document.body.removeChild(expandedDiv);
        }, 500);
    });
});





// ***** funcao que marca todos os checkbox para imprimir
function marcar(){
    document.getElementById("imprimir").classList.remove('ativo');
    document.getElementById("imprimir").disabled = false;
    var boxes = document.getElementsByName("numeros[]");
    for(var i = 0; i < boxes.length; i++)
        boxes[i].checked = true;
}





// ***** funcao que desmarca todos os checkbox para imprimir
function desmarcar(){
    document.getElementById("imprimir").classList.add('ativo');
    document.getElementById("imprimir").disabled = true;   
    var boxes = document.getElementsByName("numeros[]");
    for(var i = 0; i < boxes.length; i++)
        boxes[i].checked = false;
}




// ***** funcao que formata os campos text para nao iniciar com espaco, ou dar mais de um espaco entre as palavras
function formataCampo(input){
    let valor = input.value.replace(/^\s+/g, '');
    valor = valor.replace(/\s+/g, ' ');
    input.value = valor;
};




// ***** codigo que carrega a tabela ao iniciar a página
document.getElementById('btn-pesquisa').click();