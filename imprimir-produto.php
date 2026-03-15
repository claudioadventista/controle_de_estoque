<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<title>Estoque</title>
	<link rel="shortcut icon" href="favicon.ico" >
	<meta name="viewport" content="widhth=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=10,  minimum-scale=1.0" />
	<meta name="referrer" content="default" id="meta_referrer" />
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<link rel="stylesheet" type="text/css" href="../estilo/index.css" />
	<style>
	.conteudo{
		width:98%;
		height:100%;
		background:#fff;
		padding:1%;
		font-size:12px;
		overflow-y: auto;
	}
    a{
        text-decoration: none;
        color:#000;
    }
	</style>
</head>
<body>
    <a href="index.html" title="Clique para voltar">
	<div class="conteudo">
		<?php
         $conexao = new mysqli('localhost', 'root', '', 'estoque');
        if ($conexao->connect_error){
            die('Erro de conexão: '.$conexao->connect_error);
        };

        // imprime um produto individual
        if(isset($_POST['impUm'])){
            
            $id_individual = $_POST['impUm'];

            $sql = "SELECT * FROM produtos WHERE id = ?";
            $stmt = $conexao->prepare($sql);
            $stmt->bind_param("i",$id_individual);
            $stmt->execute();
            $resultado = $stmt->get_result();

            while ($linha = $resultado->fetch_assoc()){
                echo "<strong>ID: </strong>".$linha['id'].' - ';
                echo "<strong>Produto: </strong>".$linha['nome'].' - ';
                echo "<strong>Categoria: </strong>".$linha['categoria'].' - ';
                echo "<strong>Data de Cadastro: </strong>".date('d/m/Y', strtotime($linha['data_entrada'])).' - ';
                echo "<strong>Quantidade Inicial: </strong>".$linha['quantidade_inicial']." - ";
                echo "<strong>Quantidade Atual: </strong>".$linha['quantidade']." - ";
                if($linha['preco_custo']<>""){
                    echo "<strong>Preço de custo: </strong>".$linha['preco_custo'].' - ';
                };
                 if($linha['preco_venda']<>""){
                    echo "<strong>Preço de venda: </strong>".$linha['preco_venda'].' - ';
                };
                if($linha['codigo_barras']<>""){
                    echo "<strong>Código de Barras: </strong>".$linha['codigo_barras'].' - ';
                };
                if($linha['fabricante']<>""){
                    echo "<strong>Fabricante: </strong>".$linha['fabricante'].' - ';
                };
                if($linha['prateleira']<>""){
                    echo "<strong>Prateleira: </strong>".$linha['prateleira'].' - ';
                };
                 if($linha['outros']<>""){
                    echo "<strong>Preço de custo: </strong>".$linha['outros'].' - ';
                };
                if($linha['fornecedor']<>""){
                    echo "<strong>Fornecedor: </strong>".$linha['fornecedor'].' - ';
                };
                if($linha['endereco']<>""){
                    echo "<strong>Endereço: </strong>".$linha['endereco'].' - ';
                };
                if($linha['telefone']<>""){
                    echo "<strong>Telefone: </strong>".$linha['telefone'].' - ';
                };
                if($linha['email']<>""){
                    echo "<strong>Email: </strong>".$linha['email'].' - ';
                };
                if($linha['obs']<>""){
                    echo "<strong>Obs: </strong>".$linha['obs'];
                };     	
            };
        }





        // imprime produtos marcados com checkbox
        if(isset($_POST['ids'])){

            $ids = explode(',', $_POST['ids']);

            $ids_placeholders = implode(',', array_fill(0, count($ids), '?'));
            $sql = "SELECT * FROM produtos WHERE id IN ($ids_placeholders)";
            $stm = $conexao->prepare($sql);
            $types = str_repeat('i', count($ids));
            $stm->bind_param($types, ...$ids);
            $stm->execute();

            $resultado = $stm->get_result();

            while ($produto = $resultado->fetch_assoc()){
                echo "<strong>ID: </strong>".$produto['id']." - ";
                echo "<strong>Produto: </strong>".$produto['nome']." - ";
                echo "<strong>Categoria: </strong>".$produto['categoria']." - ";
                echo "<strong>Data de Cadastro: </strong>".$produto['data_entrada']." - ";
                echo "<strong>Quantidade Inicial: </strong>".$produto['quantidade_inicial']." - ";
                echo "<strong>Quantidade Atual: </strong>".$produto['quantidade']." - ";
                echo "<strong>Preço de custo: </strong>".$produto['preco_custo']." - ";
                echo "<strong>Preço de venda: </strong>".$produto['preco_venda']." - ";
                if($produto['codigo_barras']<>""){
                    echo "<strong>Codigo de Barras: </strong>".$produto['codigo_barras'].' - ';
                };
                if($produto['fabricante']<>""){
                    echo "<strong>Fabricante: </strong>".$produto['fabricante'].' - ';
                };
                if($produto['prateleira']<>""){
                    echo "<strong>Prateleira: </strong>".$produto['prateleira'].' - ';
                };
                if($produto['outros']<>""){
                    echo "<strong>Outros: </strong>".$produto['outros'].' - ';
                };
                if($produto['fornecedor']<>""){
                    echo "<strong>Fornecedor: </strong>".$produto['fornecedor'].' - ';
                };
                if($produto['endereco']<>""){
                    echo "<strong>Endereço: </strong>".$produto['endereco'].' - ';
                };
                if($produto['telefone']<>""){
                    echo "<strong>Telefone: </strong>".$produto['telefone'].' - ';
                };
                if($produto['email']<>""){
                    echo "<strong>Email: </strong>".$produto['email'].' - ';
                };
                if($produto['obs']<>""){
                    echo "<strong>Obs: </strong>".$produto['obs'].' - ';
                };
                
                echo '<br><br>';
            }
        }

        echo"<script>window.print();</script>";
		?>
	</div>
    </a>
</body>
</html>