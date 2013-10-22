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
  var smurffi = {
    id: "click"+latlng,
    text: "CLICK SMURFFI",
    latlng: latlng,
    fill: "purple"
  }
  d3smurffi(smurffi)
});


smurffitulee = function(el) {
	var s = document.createElement("smurffi")
	s.setAttribute("lat", 60.2497278)
	s.setAttribute("lon", 24.1)
	s.setAttribute("fill", "blue")
	s.textContent = "MOI UUS SMURFFI"

	// LEAFLET KAAPPAA
	s.addEventListener("click", function(e) {
		console.log("smurfi click", e)
	})

	document.querySelector("geomap").appendChild(s)
}

buttonsmurffi = function(lol) {
  var smurffi = {
    id: "button1",
    text: "MOI UUS SMURFFI",
    latlng: [ 60.2497278, 24.1],
    fill: "blue"
  }

  paivitaSmurffit([smurffi])
}

d3smurffi = function(smurffi) {
  // TODO: remember old smurffee
  paivitaSmurffit([smurffi])
}

smurrffiliikkuu = function() {
  globaalidata[0].latlng[0] += 0.001;

  paivitaSmurffit(globaalidata);
}

paivitaSmurffit = function(data) {

  d3map = d3.select("geomap")
  // console.log("d3map", d3map)

  var smurffit = d3map.selectAll("smurffi")
  .data(data, function(d) { return d ? d.id : null } )

  smurffit
  .enter()
  .append("smurffi")
  // .each(angular.element(document.querySelector("map")).scope().compileri);

  smurffit
  .text(function(d, i) { return d.text + i })
  .attr("lat", function(d) {
    return d.latlng[0];
  })
  .attr("lon", function(d) {
     return d.latlng[1];
   })
  // .each(angular.element(document.querySelector("map")).scope().updateri);

}


window.addEventListener("DOMContentLoaded", function() {

  // paivitaSmurffit(globaalidata);

});
