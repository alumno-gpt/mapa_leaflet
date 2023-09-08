<?php

namespace Model;

class Mapa extends ActiveRecord {
    protected static $tabla = 'mapa';
    protected static $columnasDB = ['map_nombre', 'latitud', 'longitud', 'mapa_situacion'];
    protected static $idTabla = 'mapa_id';

    public $mapa_id;
    public $map_nombre;
    public $latitud;
    public $longitud;
    public $mapa_situacion;

    public function __construct($args = []) {
        $this->mapa_id = $args['mapa_id'] ?? null;
        $this->map_nombre = $args['map_nombre'] ?? '';
        $this->latitud = $args['latitud'] ?? '';
        $this->longitud = $args['longitud'] ?? '';
        $this->mapa_situacion = $args['mapa_situacion'] ?? '1';
    }
}
?>

