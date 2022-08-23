export const displayMap = (locations) => {

    mapboxgl.accessToken =
        'pk.eyJ1IjoiZGV2LXZhbiIsImEiOiJjbDVxcXpmdjIxOWliM2puejJsamdpeDZ6In0.O9gCsikWDAaQwkFRCKaFLg';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dev-van/cl5s4u5k7000814mycruuoh1x',
        scrollZoom: false
            // center: [-118.113491, 34.111745],
            // zoom: 10,
            // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();
    // Create marker
    locations.forEach(loc => {
        // Add marker
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);

        // Add popup
        new mapboxgl.Popup({
                offset: 30
            })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extends map bounds to include current location
        bounds.extend(loc.coordinates);

    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100

        }
    })

}