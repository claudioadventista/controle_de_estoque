<?php
date_default_timezone_set('America/Fortaleza');
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
}; 

$dados = json_decode(file_get_contents('php://input'),true);

$idProduto = $dados['idProduto'];
$nome = mb_strtoupper($dados['nome'], 'UTF-8');
$codigoBarras = $dados['codigoBarras'];
$precoCusto = str_replace(',','.', $dados['precoCusto']);// em caso de valores com virgula, troca por ponto para cadastrar no banco
$precoVenda = str_replace(',','.', $dados['precoVenda']);
$quantidade = $dados['quantidade'];// vai baixando
$minimo = $dados['minimo'];
$maximo = $dados['maximo'];
$categoria = mb_strtoupper($dados['categoria'], 'UTF-8');
$dataEntrada = $dados['dataEntrada'];
$dataValidade = $dados['dataValidade'];
$dataNovaReposicao = $dados['dataReposicao'];
$acrescentar = $dados['reposicao'];
$fabricante =  mb_strtoupper($dados['fabricante'], 'UTF-8');
$prateleira =  mb_strtoupper($dados['prateleira'], 'UTF-8');
$outros =  mb_strtoupper($dados['outros'], 'UTF-8');
$quantidade_inicial = $dados['quantidade_inicial'];// fixo



if((isset($acrescentar) AND ($acrescentar != ''))){
    if($quantidade == 0){
        
        $quantidade_inicial = $acrescentar;
        $quantidade = $quantidade + $acrescentar;

    }else{
        
        $quantidade_inicial = $quantidade_inicial + $acrescentar;
        $quantidade = $quantidade + $acrescentar;
    }

    if($dataNovaReposicao == ''){
        
        $dataReposicao =  date('Y-m-d');    
    }else{
        $dataReposicao = $dataNovaReposicao;
    }
} 

$custoTotal = $precoCusto * $quantidade_inicial;

$fornecedor =  mb_strtoupper($dados['fornecedor'], 'UTF-8');
$endereco =  mb_strtoupper($dados['endereco'], 'UTF-8');
$telefone = $dados['telefone'];
$email = $dados['email'];
$obs =  mb_strtoupper($dados['observacao'], 'UTF-8');


// busca por nome ja cadastrado no banco
$sql = "SELECT nome, id FROM produtos WHERE nome = ? AND id != ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("si", $nome, $idProduto);
$stmt->execute();
$resultado = $stmt->get_result();

// se for mudar o nome do produto, valida o nome solicitado se ja foi cadastrado
if($resultado->num_rows > 0){
    echo json_encode(array('mensagem' => 'Esse nome já esta cadastrado!'));
}else{
    
    if($dados['alterarCategoria'] == ''){
       $categoria = mb_strtoupper($dados['categoria'], 'UTF-8');
    }else{
        // muda a categoria se for solicitado essa mudanca
        $categoria =  mb_strtoupper($dados['alterarCategoria'], 'UTF-8');
    }

    $sql = "UPDATE produtos SET nome = ?, codigo_barras = ?, preco_custo = ?, preco_venda = ?, custo_total = ?, quantidade = ?, minimo = ?, maximo = ?, categoria = ?, data_entrada = ?, data_validade = ?, dataReposicao = ?, fabricante = ?, prateleira = ?, outros = ?, quantidade_inicial = ?, fornecedor = ?, endereco = ?, telefone = ?, email = ?, obs = ? WHERE id = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("ssdddiiisssssssisssssi", $nome, $codigoBarras, $precoCusto, $precoVenda, $custoTotal, $quantidade, $minimo, $maximo, $categoria, $dataEntrada, $dataValidade, $dataReposicao, $fabricante, $prateleira,  $outros, $quantidade_inicial, $fornecedor, $endereco, $telefone, $email, $obs, $idProduto);
    $stmt->execute();

    if ($stmt->affected_rows > 0){
        echo json_encode(['mensagem' => 'Produto alterado com sucesso!']);
    }else{
        echo json_encode(['mensagem' => 'Erro ao alterar produto!', 'erro' => $conexao->error]);
    }
}