import L from "leaflet"

const map = L.map('map', {
    center: [15.525158, -90.32959],
    zoom: 7,
})

const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Colaboradores de OpenStreetMap</a>'
}).addTo(map)

const markerLayer = L.layerGroup(); 

const icon = L.icon({
    iconUrl : './images/cit.png',
    iconSize : [35, 35]
})

const marker = L.marker([15.525158, -90.32959],{
    icon
}).addTo(markerLayer)

var tooltip = L.tooltip()
    .setLatLng([15.525158, -90.32959])
    .setContent('¡Hola mundo!<br>Este es el CIT.')
    .addTo(map);

L.circle([15.525158, -90.32959], { radius: 5000 }).addTo(map); // Agregamos un círculo en las mismas coordenadas que el marcador
markerLayer.addTo(map)



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
                        .setContent(`<p>Nombre: ${registro.map_nombre}</p>`);

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


buscar();
    
    
    
    // const map = L.map('map', {
    //     center: [15.52, -90.32],
    //     zoom: 10,  
    // })
    // const mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',{
    //     maxZoom: 19,
    //     attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map)
    
    // var popup = L.popup()
    // .setLatLng([15.525158, -90.32959])
    // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    // marker.bindPopup(popup)
    // const coordenadas = [
    //     [14.1, -90.5],
    //     [14.3, -90.8],
    //     [14.6, -90.9],
    //     [15.0, -90.6],
    //     [15.3, -90.7]
    //   ];
// var polygon = L.polygon(coordenadas, {color: 'red'}).addTo(map);