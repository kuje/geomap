var geomap = document.querySelector("geomap")
var maplatlng = [ parseFloat(geomap.getAttribute("lat")), parseFloat(geomap.getAttribute("lon")) ]
var markerID = 0

globaalidata = [
  {
    id: "globaali1",
    latlng: [ maplatlng[0]+0.001, maplatlng[1] ]
  },
  {
    id: "globaali2",
    latlng: [ maplatlng[0]+0.003, maplatlng[1] ]
  },
  {
    id: "globaali3",
    latlng: [ maplatlng[0]+0.002, maplatlng[1] ]
  }
];

// DOM level click event
geomap.addEventListener("click", function(e) {
  console.log("geomap click", this._geomap)
});

// MAP level click event
// TODO: make e map engine independent, now it's leaflet
geomap._geomap.on("click", function(latlng, e) {
  console.log("geomap innerclick", e);
  var marker = {
    id: "click-marker-" + ++markerID,
    latlng: latlng,
    text: document.querySelector("#disruptive-template").innerHTML.replace("%ID%", "click-form-"+markerID)
  }
  // TODO: actuaally control the marker stream with d3
  updateMarkers([marker])
});


updateMarkers = function(data) {
  d3map = d3.select("geomap")
  // console.log("d3map", d3map)

  var markers = d3map.selectAll("marker")
  .data(data, function(d) { return d ? d.id : null } )

  markers
  .enter()
  .append("marker")
  .html(function(d, i) { return d.text })
  .attr("id", function(d) { return d.id })
  .attr("lat", function(d) { return d.latlng[0] })
  .attr("lon", function(d) { return d.latlng[1] })
}

disruptiveOK = function(el) {
  // SORRY WE RUSHED IN SOME HACKINESS
  var input = el.parentNode.querySelector("input[type=text]")
  var id = el.parentNode.id
  var marker = geomap.querySelector("#"+id.replace("form", "marker"))
  console.log(el, input, marker)
  el.parentNode.innerHTML = input.value
  marker.innerHTML = input.value
  marker._geomap.obj.setPopupContent(input.value) // YES THIS IS LEAFLET CODE, sorry we hacked it
}

window.addEventListener("DOMContentLoaded", function() {

  // updateMarkers(globaalidata);

});
