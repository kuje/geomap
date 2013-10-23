var geomap = document.querySelector("geomap")
var maplatlng = [ parseFloat(geomap.getAttribute("lat")), parseFloat(geomap.getAttribute("lon")) ]

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
    id: "click-TODO-"+latlng,
    latlng: latlng,
    text: document.querySelector("#disruptive-template").innerHTML
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
  .attr("lat", function(d) { return d.latlng[0] })
  .attr("lon", function(d) { return d.latlng[1] })
}

disruptiveOK = function(el) {
  var input = el.previousElementSibling
  console.log(el, input)
  el.parentNode.innerHTML = input.value
}

window.addEventListener("DOMContentLoaded", function() {

  // updateMarkers(globaalidata);

});
