<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);
$pesquisa = $dados['pesquisa'];


$sql = "SELECT id, categoria FROM categoria WHERE categoria LIKE ? ";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("s", $pesquisaLike);
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