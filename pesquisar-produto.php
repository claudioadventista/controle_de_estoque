<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);
$pesquisa = $dados['pesquisa'];


$sql = "SELECT * FROM produtos WHERE nome LIKE ? OR codigo_barras LIKE ? OR categoria LIKE ? OR fabricante LIKE ? OR outros LIKE ? OR prateleira LIKE ? OR fornecedor LIKE ? OR endereco LIKE ? OR telefone LIKE ? OR email LIKE ? OR obs LIKE ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("sssssssssss", $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike, $pesquisaLike);
$pesquisaLike = "%$pesquisa%";
$stmt->execute();

$resultado = $stmt->get_result();

$produtos = array();

 if($resultado->num_rows > 0){
    while ($linha = $resultado->fetch_assoc()){
        $produtos[] = $linha;
    }
 }

 echo json_encode($produtos);
 $conexao->close();