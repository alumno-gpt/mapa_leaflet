import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario, Toast, confirmacion } from "../funciones";
import L from "leaflet";
const butonActualizar = document.getElementById("actualizar");

const map = L.map('map', {
    center: [15.52, -90.32],
    zoom: 5,
    maxZoom: 15,
    minZoom: 1,
})
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const carreteraLayer = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const markerLayer = L.layerGroup();
const icono = L.icon({
    iconUrl: './images/cit.png',
    iconSize: [35, 35]
})

L.circle([15.52, -90.32], { radius: 5000 }).addTo(markerLayer);
const popup = L.popup()
    .setLatLng([15.52, -90.32])
    .setContent('<p>Hello world!</p>')


var latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];

var polyline = L.polyline(latlngs, { color: 'red' }).addTo(markerLayer);


mapLayer.addTo(map)
carreteraLayer.addTo(map)
markerLayer.addTo(map)

map.on('click', (e) => {
    console.log(e);
    alert('diste click sobre el mapa')
})




const buscar = async () => {
    const url = `/mapa_leaflet/API/mapas/buscar?`;
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        console.log(data);

        if (data && data.length > 0) {
            data.forEach(registro => {
                const latitud = parseFloat(registro.latitud);
                const longitud = parseFloat(registro.longitud);

                if (!isNaN(latitud) && !isNaN(longitud)) {
                    const marcador = L.marker([latitud, longitud], {
                        icon: icono,
                        draggable: true
                    });

                    const popup = L.popup()
                        .setLatLng([latitud, longitud])
                        .setContent(`<p>Nombre: ${registro.map_nombre}</p>
                                    <p>Latitud: ${latitud}</p>
                                    <p>Longitud: ${longitud}</p>`).openOn(map);

                    marcador.bindPopup(popup);
                    marcador.addTo(markerLayer);
                }
            });
        } else {
            Toast.fire({
                title: 'No se encontraron registros',
                icon: 'info'
            });
        }

    } catch (error) {
        console.error('Error al cargar los datos desde la base de datos:', error);
    }
}

butonActualizar.addEventListener("click", () => {
    Toast.fire({
        title: 'Actualizando datos...',
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    buscar();
});


buscar();