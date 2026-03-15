<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);

$idProduto = $dados['idProduto'];

$sql = "SELECT quantidade FROM produtos WHERE id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $idProduto);
$stmt->execute();

$resultado = $stmt->get_result();
$produto = $resultado->fetch_assoc();

echo json_encode(['quantidade' => $produto['quantidade']]);
$conexao->close();