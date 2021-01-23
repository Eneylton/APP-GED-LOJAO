<?php
 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'),true);


if($postjson['crud'] == "listar-perfil"){
     
    $profile = array();
    $query = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM usuario WHERE id = '$postjson[id]'"));
    

    $profile = array(
       
       'id'          => $query['id'],
       'nome'        => $query['nome'],
       'sobrenome'   => $query['sobrenome'],
       'telefone'    => $query['telefone'],
       'email'       => $query['email'],
       'genero'      => $query['genero'],
       'cep'         => $query['cep'],
       'endereco'    => $query['endereco'],
       'numero'      => $query['numero'],
       'bairro'      => $query['bairro'],
       'cidade'      => $query['cidade'],
       'estado'      => $query['estado'],
       'nivel'      => $query['nivel']
    
    );
    
    if($query) $result = json_encode(array('success'=>true, 'profiles'=> $profile));
    else $result = json_encode(array('success'=>false));
    echo $result;
}


elseif($postjson['crud'] == "editar-perfil"){
     
    $query   = mysqli_query($mysqli, "UPDATE usuario SET
	           
    nome           =  '$postjson[nome]',
    email          =  '$postjson[email]' WHERE id  = '$postjson[id]'");
    
    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}


