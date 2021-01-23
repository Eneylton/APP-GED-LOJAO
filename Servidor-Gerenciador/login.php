<?php
 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'),true);


if($postjson['crud'] == "acessar"){
	 
    $senha = md5($postjson['senha']);

    $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE senha = '$senha' AND usuario = '$postjson[usuario]'");
    $check = mysqli_num_rows($query);

    if($check > 0){
    $data = mysqli_fetch_array($query);
    $datauser = array(
       
       'id'                 => $data['id'],
       'nome'               => $data['nome'],
       'sobrenome'          => $data['sobrenome'],
       'telefone'           => $data['telefone'],
       'email'              => $data['email'],
       'cep'                => $data['cep'],
       'endereco'           => $data['endereco'],
       'numero'             => $data['numero'],
       'bairro'             => $data['bairro'],
       'cidade'             => $data['cidade'],
       'estado'             => $data['estado'],
       'complemento'        => $data['complemento'],
       'usuario'            => $data['usuario'],
       'senha'              => $data['senha'],
       'nivel'              => $data['nivel'],
       'genero'             => $data['genero']
    
    );
    
    if($query) $result = json_encode(array('success'=>true, 'result'=> $datauser));
    else $result = json_encode(array('success'=>false, 'msg'=>'Error, Login Efetuado com sucesso... '));
    
    }else{

    $result = json_encode(array('success'=>false, 'msg'=>'Senha ou Usuarios Inválidos... '));
       
    }	

    echo $result;
}



