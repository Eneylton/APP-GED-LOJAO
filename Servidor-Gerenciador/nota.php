<?php
 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'),true);


if($postjson['crud'] == "listar-notas"){

    $data = array();
    
    $query = mysqli_query($mysqli, "SELECT * FROM nota as c ORDER BY c.data_recebimento DESC LIMIT $postjson[start], $postjson[limit]");

    while($row = mysqli_fetch_array($query)){
        $data[] = array(
            'id'                      => $row['id'],
            'numero'                  => $row['numero'],
            'data_recebimento'        => $row['data_recebimento'],
            'fornecedor_id'           => $row['fornecedor_id'],
            'funcionario_id'          => $row['funcionario_id'],
            'usuario_id'              => $row['usuario_id']
            
            
        );
    }

    if($query) $result = json_encode(array('success' => true,'result' =>$data));
    else $result = json_encode(array('success'=> false));
    echo $result;

}


elseif($postjson['crud'] == "adicionar"){
   
    $data = array();

    $query   = mysqli_query($mysqli, "INSERT INTO nota SET
               
               numero           = '$postjson[numero]',
               usuario_id       = '$postjson[usuario_id]',
               fornecedor_id    = '$postjson[fornecedor_id]',
               funcionario_id   = '$postjson[funcionario_id]'");

    $idadd = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success' => true, 'idadd' => $idadd));
    else $result = json_encode(array('success'=> false));
    echo $result;

}

elseif($postjson['crud'] == "editar"){

    $data = array();

    $query   = mysqli_query($mysqli, "UPDATE nota SET
           
     
    numero             =  '$postjson[numero]',
    fornecedor_id      =  '$postjson[fornecedor_id]',
    funcionario_id     =  '$postjson[funcionario_id]' WHERE id  = '$postjson[id]'");


    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}

elseif($postjson['crud'] == "editar2"){

    $data = array();

    $query   = mysqli_query($mysqli, "UPDATE nota SET
        
    numero            =  '$postjson[numero]',
    fornecedor_id     =  '$postjson[fornecedor_id]',
    funcionario_id    =  '$postjson[funcionario_id]' WHERE id  = '$postjson[id]'");


    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false));
    echo $result;
}

    elseif($postjson['crud'] == "deletar"){

    $query   = mysqli_query($mysqli, "DELETE FROM nota WHERE id  = '$postjson[id]'");
  

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'error, Por favor, tente novamente... '));
    echo $result;
}

?>