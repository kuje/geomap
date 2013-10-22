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
  console.log("geomap click", this.geomap)
  //containerPointToLatLng
});

// MAP level click event
// TODO: make e map engine independent
geomap.geomap.on("click", function(latlng, e) {
  console.log("BOOM", latlng, e);
  var marker = {
    id: "click"+latlng,
    text: "CLICK marker",
    latlng: latlng,
    fill: "purple"
  }
  d3marker(marker)
});


markertulee = function(el) {
	var s = document.createElement("marker")
	s.setAttribute("lat", 60.2497278)
	s.setAttribute("lon", 24.1)
	s.setAttribute("fill", "blue")
	s.textContent = "MOI UUS marker"

	// LEAFLET KAAPPAA
	s.addEventListener("click", function(e) {
		console.log("smurfi click", e)
	})

	document.querySelector("geomap").appendChild(s)
}

buttonmarker = function(lol) {
  var marker = {
    id: "button1",
    text: "MOI UUS marker",
    latlng: [ 60.2497278, 24.1],
    fill: "blue"
  }

  updateMarkers([marker])
}

d3marker = function(marker) {
  // TODO: remember old smurffee
  updateMarkers([marker])
}

smurrffiliikkuu = function() {
  globaalidata[0].latlng[0] += 0.001;

  updateMarkers(globaalidata);
}

updateMarkers = function(data) {

  d3map = d3.select("geomap")
  // console.log("d3map", d3map)

  var markers = d3map.selectAll("marker")
  .data(data, function(d) { return d ? d.id : null } )

  markers
  .enter()
  .append("marker")

  markers
  .text(function(d, i) { return d.text + i })
  .attr("lat", function(d) {
    return d.latlng[0];
  })
  .attr("lon", function(d) {
     return d.latlng[1];
   })

}


window.addEventListener("DOMContentLoaded", function() {

  // updateMarkers(globaalidata);

});
