<?php
date_default_timezone_set('America/Fortaleza');
$conexao = new mysqli('localhost', 'root', '', 'estoque');
if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);



$nome = trim(mb_strtoupper($dados['nome'], 'UTF-8'));
$codigoBarras = trim($dados['codigoBarras']);
$precoCusto = str_replace(',','.', $dados['precoCusto']);// em caso de valores com virgula, troca por ponto para cadastrar no banco
$precoVenda = str_replace(',','.', $dados['precoVenda']);
$quantidade = $dados['quantidade'];

$qtdInicial = $dados['qtdInicial'];
$custoTotal = $precoCusto * $qtdInicial;

//echo "total".$precoCusto; exit;

if($quantidade ==''){
    $quantidade = $qtdInicial;
}

$categoria = trim(mb_strtoupper($dados['categoria'], 'UTF-8'));
$dataEntrada = $dados['dataEntrada'];
$dataValidade = $dados['dataValidade'];

if(empty($dataEntrada)){
    $dataEntrada=date('Y-m-d');
}
$minimo = $dados['minimo'];
$maximo = $dados['maximo'];
$fabricante =  trim(mb_strtoupper($dados['fabricante'], 'UTF-8'));
$prateleira =  trim(mb_strtoupper($dados['prateleira'], 'UTF-8'));
$outros =  trim(mb_strtoupper($dados['outros'], 'UTF-8'));

$fornecedor =  trim(mb_strtoupper($dados['fornecedor'], 'UTF-8'));

$endereco =  trim(mb_strtoupper($dados['endereco'], 'UTF-8'));
$telefone = $dados['telefone'];
$email = trim($dados['email']);
$obs = trim(mb_strtoupper($dados['observacao'], 'UTF-8'));


// busca por nome ja cadastrado no banco
$sql = "SELECT nome FROM produtos WHERE nome = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("s", $nome);
$stmt->execute();
$resultado = $stmt->get_result();

// valida o produto ja cadastrado
if($resultado->num_rows > 0){
    echo json_encode(array('resultado' => 'Produto já cadastrado!'));
}else{
    $sql ="INSERT INTO produtos (nome, codigo_barras, preco_custo, preco_venda, custo_total, quantidade, minimo, maximo, categoria, data_entrada, data_validade, fabricante, prateleira, outros, quantidade_inicial, fornecedor, endereco, telefone, email, obs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("ssdddiiissssssisssss", $nome, $codigoBarras, $precoCusto, $precoVenda, $custoTotal, $quantidade, $minimo, $maximo, $categoria, $dataEntrada, $dataValidade, $fabricante, $prateleira,  $outros, $qtdInicial, $fornecedor, $endereco, $telefone, $email, $obs);
    if($stmt->execute()){
        echo json_encode(array('resultado' => 'Produto cadastrado com sucesso!')); 
    }else{
         echo json_encode(array('resultado' => 'Erro ao cadastrado produto!'));
    };
}