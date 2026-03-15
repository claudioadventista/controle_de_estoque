<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$sql = "SELECT * FROM categoria";
$stmt = $conexao->prepare($sql);

$stmt->execute();
$resultado = $stmt->get_result();

$produtos = array();

while ($linha = $resultado->fetch_assoc()){
    $produtos[] = $linha;
}


    echo json_encode($produtos);
