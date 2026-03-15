<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');
if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);


$cadNovaCat = trim(mb_strtoupper($dados['cadNovaCat'], 'UTF-8'));


$sql = "SELECT categoria FROM categoria WHERE categoria = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("s", $cadNovaCat);
$stmt->execute();
$resultado = $stmt->get_result();

// valida o produto ja cadastrado
if($resultado->num_rows > 0){
    echo json_encode(array('resultado' => 'Categoria já cadastrada!'));
}else{
    $sql ="INSERT INTO categoria (categoria) VALUES (?)";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("s", $cadNovaCat);
    if($stmt->execute()){
        echo json_encode(array('resultado' => 'Categoria cadastrada com sucesso!')); 
    }else{
         echo json_encode(array('resultado' => 'Erro ao cadastrado categoria!'));
    };
}