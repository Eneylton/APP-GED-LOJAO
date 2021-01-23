<?php
 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'),true);


if($postjson['crud'] == "listar-usuarios"){

        $data = array();
       
        $query = mysqli_query($mysqli, "SELECT * FROM
         usuario AS u order by u.nome ASC LIMIT $postjson[start], $postjson[limit]");

        while($row = mysqli_fetch_array($query)){
            $data[] = array(
				'id'           => $row['id'],
				'nome'         => $row['nome'],
				'email'        => $row['email'],
				'usuario'      => $row['usuario'],
				'senha'        => $row['senha'],
				'sobrenome'    => $row['sobrenome'],
				'telefone'     => $row['telefone'],
				'cep'          => $row['cep'],
				'endereco'     => $row['endereco'],
				'numero'       => $row['numero'],
				'bairro'       => $row['bairro'],
				'cidade'       => $row['cidade'],
				'estado'       => $row['estado'],
				'complemento'  => $row['complemento'],
				'nivel'        => $row['nivel'],
				'genero'       => $row['genero']
				
            );
        }

        if($query) $result = json_encode(array('success' => true,'result' =>$data));
        else $result = json_encode(array('success'=> false));
        echo $result;

    }

    elseif($postjson['crud'] == "adicionar-usuario"){
       
        $senha = md5($postjson['senha']);
        $data = array();
    
        $query   = mysqli_query($mysqli, "INSERT INTO usuario SET
                   
                   nome           = '$postjson[nome]',
                   email          = '$postjson[email]',
                   usuario        = '$postjson[usuario]',
                   senha          = '$senha',
                   sobrenome      = '$postjson[sobrenome]',
                   telefone       = '$postjson[telefone]',
                   cep            = '$postjson[cep]',
                   endereco       = '$postjson[endereco]',
                   numero         = '$postjson[numero]',
                   bairro         = '$postjson[bairro]',
                   cidade         = '$postjson[cidade]',
                   estado         = '$postjson[estado]',
                   complemento    = '$postjson[complemento]',
                   nivel          = '$postjson[nivel]',
                   genero         = '$postjson[genero]'
                   
                   ");
    
        $idadd = mysqli_insert_id($mysqli);
    
        if($query) $result = json_encode(array('success' => true, 'idadd' => $idadd));
        else $result = json_encode(array('success'=> false));
        echo $result;
    }

    elseif($postjson['crud'] == "usuario-editar"){
   
        $senha = md5($postjson['senha']);

        $query   = mysqli_query($mysqli, "UPDATE usuario SET
	           
         
                    nome           =  '$postjson[nome]',
                    email          =  '$postjson[email]', 
                    usuario        =  '$postjson[usuario]',  
                    senha          =  '$senha',
                    sobrenome      =  '$postjson[sobrenome]',
                    telefone       =  '$postjson[telefone]',
                    cep            =  '$postjson[cep]',
                    endereco       =  '$postjson[endereco]',
                    numero         =  '$postjson[numero]',
                    bairro         =  '$postjson[bairro]',
                    cidade         =  '$postjson[cidade]',
                    estado         =  '$postjson[estado]',
                    complemento    =  '$postjson[complemento]',
                    nivel          =  '$postjson[nivel]',
                    genero         =  '$postjson[genero]' WHERE id  = '$postjson[id]'");
    

        if($query) $result = json_encode(array('success'=>true));
        else $result = json_encode(array('success'=>false));
        echo $result;
    }

    elseif($postjson['crud'] == "deletar"){
  
        $query   = mysqli_query($mysqli, "DELETE FROM usuario WHERE id  = '$postjson[id]'");
      
    
        if($query) $result = json_encode(array('success'=>true));
        else $result = json_encode(array('success'=>false, 'msg'=>'error, Por favor, tente novamente... '));
        echo $result;
    }


?>