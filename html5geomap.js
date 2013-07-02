HTML5Geomap = {};
HTML5Geomap.engine = "leaflet";
HTML5Geomap.maps = {};


HTML5Geomap.Smurffi = function(elem) {
  this.elem = elem;
  var initLat = elem.getAttribute("lat")
  var initLon = elem.getAttribute("lon")

  this.lolcircle = L.circle([initLat, initLon], 500, {
    // TODO: css???
    color: elem.getAttribute("stroke") || "red",
    weight: elem.getAttribute("strokeWidth") || 2,
    opacity: elem.getAttribute("strokeOpacity") || 0.6,
    fillColor: elem.getAttribute("fill") || "red",
    fillOpacity: elem.getAttribute("fillOpacity") || 0.4
  }).bindPopup(elem.innerHTML)
}

HTML5Geomap.Geomap = function(elem) {
  this.elem = elem;
  this.map = null;

  this.mapElems = [];

  var initLat = elem.getAttribute("lat")
  var initLon = elem.getAttribute("lon")
  var initZoomlevel = elem.getAttribute("zoomlevel")


  var elems = elem.querySelectorAll("*")

  for (var i=0; i<elems.length; i++) {
    console.log("elem", elems[i])

    var elemClass = null;
    var mapElem = null;

    switch(elems[i].nodeName) {
      case "SMURFFI":
        elemClass = HTML5Geomap.Smurffi;
        break;
      default:
        console.log("unsupported geomap element: ", mapElem[i].nodeName)
        break;
    }

    mapElem = new elemClass(elems[i]);
    this.mapElems.push(mapElem)
  }

  console.log("all sub map elems:", this.mapElems)


  switch (HTML5Geomap.engine) {
    case "leaflet":
      this.map = new HTML5Geomap.LeafletMap(elem, [initLat, initLon], initZoomlevel)
      break;
    default:
      console.log("HTML5Geomap.engine not supported")
  }


  for (var i=0; i<this.mapElems.length; i++) {
    console.log("watlol", this.mapElems[i])
    this.mapElems[i].lolcircle.addTo(this.map.map);
  }

  HTML5Geomap.maps[this.elem] = this
}


HTML5Geomap.initialize = function(rootElem) {

  var html5geomapElems = rootElem.querySelectorAll("geomap")

  for (var i=0; i<html5geomapElems.length; i++) {
    var geomap = new HTML5Geomap.Geomap(html5geomapElems[i])
  }

}

HTML5Geomap.LeafletMap = function(elem, initView, initZoomlevel) {

  this.map = L.map(elem)
  this.map.setView(initView, initZoomlevel)

  this.tileLayer = L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
       attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
       maxZoom: 18
   })

  this.tileLayer.addTo(this.map)
}



HTML5Geomap.initialize(document)