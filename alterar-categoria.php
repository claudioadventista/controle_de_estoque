<?php
$conexao = new mysqli('localhost', 'root', '', 'estoque');

if ($conexao->connect_error){
    die('Erro de conexão: '.$conexao->connect_error);
};

$dados = json_decode(file_get_contents('php://input'),true);

$idCategoria = $dados['idCategoria'];
$categoria = trim(mb_strtoupper($dados['categoria'], 'UTF-8'));


// busca por nome ja cadastrado no banco
$sql = "SELECT categoria, id FROM categoria WHERE categoria = ? AND id != ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("si", $categoria, $idCategoria);
$stmt->execute();
$resultado = $stmt->get_result();

// se for mudar o nome do produto, valida o nome solicitado se ja foi cadastrado
if($resultado->num_rows > 0){
    echo json_encode(array('mensagem' => 'Essa categoria já esta cadastrada!'));
}else{
    

    $sql = "UPDATE categoria SET categoria = ? WHERE id = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("si", $categoria, $idCategoria);
    $stmt->execute();

    if ($stmt->affected_rows > 0){
        echo json_encode(['mensagem' => 'Categoria alterado com sucesso!']);
    }else{
        echo json_encode(['mensagem' => 'Erro ao alterar categoria!', 'erro' => $conexao->error]);
    }
}