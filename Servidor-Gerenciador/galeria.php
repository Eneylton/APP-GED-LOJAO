<?php
 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/json; charset=utf-8");


include "Connect/connect.php";

$postjson = json_decode(file_get_contents('php://input'),true);


if($postjson['crud'] == "adicionar"){

    $reduce = substr(date('YmdHis', time()), 2);
    $arr_date = str_split($reduce);
    $arr1 = str_split("cdefgab");
    $uid = "";
    for($i = 0; $i<12; $i++){
        $uid .= $arr1[rand(0, 6)];
        $uid .= $arr_date[$i];
    }
   
    $data = array();

    $radom     = date('Y-m-d_H_i_s');

    $entry     = base64_decode($postjson['foto']);

    $img       = imagecreatefromstring($entry);

    $directory = "./imgs/img_user".$uid."1234".$radom.".jpg";

    imagejpeg($img, $directory);

    imagedestroy($img);


    $query   = mysqli_query($mysqli, "INSERT INTO galeria SET
               
               nota_id          = '$postjson[nota_id]',
               foto             = '$directory'");

    $idadd = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success' => true, 'idadd' => $idadd));
    else $result = json_encode(array('success'=> false));
    echo $result;

}

elseif($postjson['crud'] == "listar-fotos"){

    $data = array();
    
    $query = mysqli_query($mysqli, "SELECT * FROM galeria as g ORDER BY id DESC");

    while($row = mysqli_fetch_array($query)){
        $data[] = array(
            'id'                => $row['id'],
            'nota_id'           => $row['nota_id'],
            'foto'              => $row['foto']
            
        );
    }

    if($query) $result = json_encode(array('success' => true,'result' =>$data));
    else $result = json_encode(array('success'=> false));
    echo $result;

}

elseif($postjson['crud'] == "listar-documentos"){

    $data = array();
    
    $query = mysqli_query($mysqli, "SELECT * FROM galeria as g  WHERE g.nota_id = $postjson[nota_id]");

    while($row = mysqli_fetch_array($query)){
        $data[] = array(
            'id'                => $row['id'],
            'nota_id'           => $row['nota_id'],
            'foto'              => $row['foto']
            
        );
    }

    if($query) $result = json_encode(array('success' => true,'result' =>$data));
    else $result = json_encode(array('success'=> false));
    echo $result;

}


?>