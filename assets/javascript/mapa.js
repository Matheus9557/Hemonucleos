let map;
let marker;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
      map: map,
      position: center,
      draggable: true
  });
  carregarMapa();
  marker = new google.maps.Marker({
    map: map,
    position: center,
    draggable: true
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>{
      map.setCenter(marker.position);
  });

}

function addMarker(evt){
    marker.setPosition(evt.latLng);
}

function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        cep: document.getElementById('cep').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };

    fetch("http://localhost:3000/pontos",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Salvo com sucesso')})
    .catch(error => alert('Falha ao salvar!'));    

}
async function carregarMapa() {
  fetch('http://localhost:3000/pontomapa').
  then(
    (resultado) => resultado.json()).
  then(
    (json) => {
      json.map((geometria) => {
        marker = new google.maps.Marker({
          map: map,
          position: {lat: +geometria.lat, lng: +geometria.lng},
          draggable: false,
        });
      })
  })
}



