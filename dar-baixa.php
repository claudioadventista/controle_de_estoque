<?php
date_default_timezone_set('America/Fortaleza');
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);

$idProduto = $dados['idProduto'];
$quantidade = $dados['quantidade'];
$dataBaixada = date('Y-m-d');


// validacao em php para quantidade insuficiente
$sql = "SELECT quantidade FROM produtos WHERE id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $idProduto);
$stmt->execute();

$resultado = $stmt->get_result();
$produto = $resultado->fetch_assoc();

if($quantidade > $produto['quantidade']){
    echo json_encode(['mensagem' => "Quantidade insuficiente em estoque!\nValidação em php"]);
    exit;
};
// fim da validacao em php para quantidade insuficiente em estoque

$sql = "UPDATE produtos SET quantidade = quantidade - ?, data_saida = ? WHERE id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("isi", $quantidade, $dataBaixada, $idProduto);
$stmt->execute();

if ($stmt->affected_rows > 0){
    echo json_encode(['mensagem' => 'Baixa realizada com sucesso']);
}else{
    //echo json_encode(['mensagem' => 'Erro ao dar baixa!', 'erro' => $conexao->error]);
    echo json_encode(['mensagem' => 'Erro ao dar baixa!']);
}
$conexao->close();