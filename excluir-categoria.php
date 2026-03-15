<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$id = $_GET['id'];

$sql = "DELETE FROM categoria WHERE id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

if($stmt->execute()){
    echo json_encode(array('resultado' => 'Sucesso!'));
 } else {
    echo json_encode(array('resultado' => 'Erro ao deletar o produt! PHP'));
}
$conexao->close();