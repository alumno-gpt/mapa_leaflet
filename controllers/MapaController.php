<?php

namespace Controllers;
use Exception;
use Model\Mapa;
use MVC\Router;


class MapaController{
    public static function index(Router $router){
        $router->render('mapas/index', []);
    } 


    public static function buscarAPI(){
        $map_nombre = $_GET['map_nombre'] ?? '';
        $sql = "SELECT * FROM mapa WHERE mapa_situacion = '1' ";
    
        if (!empty($map_nombre)) {
            $map_nombre = strtolower($map_nombre);
            $sql .= " AND LOWER(map_nombre) LIKE '%$map_nombre%' ";
        }
    
        try {
            $mapas = Mapa::fetchArray($sql); 
            echo json_encode($mapas);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
    }
}
}
