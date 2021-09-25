mapboxgl.accessToken = 'pk.eyJ1Ijoic292aW5pbjQ4IiwiYSI6ImNrdHp0MG83eDNncDMycG8zdTk4bzNtMTkifQ.29HdXDPxiJKo5xU4-B1edw'
const map = new mapboxgl.Map({
  container: 'map',
  minZoom: window.innerHeight / 750,
  zoom: window.innerHeight / 650,
  style: 'mapbox://styles/mapbox/dark-v10'
})
map.addControl(new mapboxgl.NavigationControl());

// Fetch the location markers for the map
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5600/forms/location-markers')
xhr.onreadystatechange = function() {
  if (xhr.readyState !== 4) return
  if (xhr.status !== 200) return console.error(new Error('Unable to load data'))
  const markers = JSON.parse(xhr.responseText)
  markers.items.forEach(m => {
    const container = document.createElement('div')
    container.classList.add('marker-container')
    container.title = m.location || 'Approximate Participant School Location'
    const img = document.createElement('img')
    img.width = img.width = 48
    img.src = 'marker.png'
    container.appendChild(img)
    new mapboxgl.Marker(container).setLngLat([ m.lng, m.lat]).addTo(map);
  })
}
xhr.send()
