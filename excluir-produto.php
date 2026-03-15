<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$id = $_GET['id'];

$sql = "DELETE FROM produtos WHERE id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

if($stmt->execute()){
    echo json_encode(array('resultado' => 'Sucesso!'));
 } else {
    echo json_encode(array('resultado' => 'Erro ao deletar o produt! PHP'));
}
$conexao->close();

/*
//$dados = json_decode(file_get_contents('php://input'),true);

$id = $dados['idProduto'];

$sql = "DELETE FROM produtos WHERE id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("ss", $id);
$stmt->execute();

if ($stmt->affected_rows > 0){
    echo json_encode(['mensagem' => 'Baixa realizada com sucesso']);
}else{
    //echo json_encode(['mensagem' => 'Erro ao dar baixa!', 'erro' => $conexao->error]);
    echo json_encode(['mensagem' => 'Erro ao dar baixa!']);
}

//echo json_encode(['mensagem' => 'Excluido com sucesso']);
$conexao->close();
*/