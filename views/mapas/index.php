<h1 class="text-center">PRUEBA DE MAPAS</h1>
<div class="text-center">
    <div class="btn-group" role="group">
        <button class="btn btn-danger btn-sm" id="actualizar" name="actualizar">ACTUALIZAR</button>
        <a class="btn btn-primary btn-sm" href="/mapa_leaflet/mapas"><i class="bi bi-globe-americas me-2"></i> REINICIAR</a>
    </div>
</div>
<div class="row justify-content-center">
    <div class="col-lg-11 border rounded" id="map" style="height: 60vh; min-height:auto "></div>
</div>
<script src="<?= asset('./build/js/mapas/index.js')?>"></script>