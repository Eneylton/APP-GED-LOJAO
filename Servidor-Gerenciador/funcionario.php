<?php
 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'),true);


if($postjson['crud'] == "listar-funcionarios"){

    $data = array();
    
    $query = mysqli_query($mysqli, "SELECT * FROM funcionario as c ORDER BY c.nome ASC LIMIT $postjson[start], $postjson[limit]");

    while($row = mysqli_fetch_array($query)){
        $data[] = array(
            'id'                      => $row['id'],
            'nome'                    => $row['nome'],
            'cpf'                     => $row['cpf'],
            'fornecedor_id'           => $row['fornecedor_id']
            
            
        );
    }

    if($query) $result = json_encode(array('success' => true,'result' =>$data));
    else $result = json_encode(array('success'=> false));
    echo $result;

}

elseif($postjson['crud'] == "listar-funcionarios2"){

    $data = array();
    
    $query = mysqli_query($mysqli, "SELECT * FROM funcionario as c WHERE c.fornecedor_id = $postjson[fornecedor_id] ORDER BY c.nome ASC");

    while($row = mysqli_fetch_array($query)){
        $data[] = array(
            'id'            => $row['id'],
            'nome'          => $row['nome'],
            
        );
    }

    if($query) $result = json_encode(array('success' => true,'result' =>$data));
    else $result = json_encode(array('success'=> false));
    echo $result;

}


elseif($postjson['crud'] == "adicionar"){
   
    $data = array();

    $query   = mysqli_query($mysqli, "INSERT INTO funcionario SET
               
               nome                        = '$postjson[nome]',
               cpf                         = '$postjson[cpf]',
               fornecedor_id               = '$postjson[fornecedor_id]'");

    $idadd = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success' => true, 'idadd' => $idadd));
    else $result = json_encode(array('success'=> false));
    echo $result;

}

elseif($postjson['crud'] == "editar"){

    $data = array();

    $query   = mysqli_query($mysqli, "UPDATE funcionario SET
           
     
    nome                     =  '$postjson[nome]',
    cpf                      =  '$postjson[cpf]',
    fornecedor_id            =  '$postjson[fornecedor_id]' WHERE id  = '$postjson[id]'");


    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}

elseif($postjson['crud'] == "deletar"){

    $query   = mysqli_query($mysqli, "DELETE FROM funcionario WHERE id  = '$postjson[id]'");
  

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'error, Por favor, tente novamente... '));
    echo $result;
}

?>