<?php
    include('conexion.php')

    $search = $_POST['search'];

    if(!empty($search)){
        $query = "SELECT * FROM municipios WHERE mpio_cnmbr Like '$search%'";
        $resultado = pg_query($conexion, $query);

        if(!$resultado){
            die('Query Error' .pg_last_error($conexion));
        }

        $json = array();
        while($row = pg_fetch_array($resultado)){
            $json[] = array(
                'name'=> $row['mpio_cnmbr'],
                'description'=> $row['sub_region'],
                'ID' => $row['gid']
            );
        }
        $jsonstring = json_encode($json)
        echo $jsonstring;
    }

?>