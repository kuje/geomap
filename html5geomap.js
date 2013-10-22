HTML5Geomap = {};
HTML5Geomap.engine = "leaflet";
HTML5Geomap.maps = {};


HTML5Geomap.Smurffi = function(elem) {
  this.elem = elem;
  var initLat = elem.getAttribute("lat")
  var initLon = elem.getAttribute("lon")

  var computedStyle = getComputedStyle(this.elem)
  // console.log("PEN", this.elem.style)

  switch (HTML5Geomap.engine) {
    case "leaflet":

      this.obj = L.circle([initLat, initLon], 500, {
        // TODO: css???
        color: computedStyle["stroke"] || "red",
        weight: elem.getAttribute("strokeWidth") || 2,
        opacity: elem.getAttribute("strokeOpacity") || 0.6,
        fillColor: computedStyle["fill"] || "red",
        fillOpacity: elem.getAttribute("fillOpacity") || 0.4
      }).bindPopup(elem.innerHTML)

      break;
    default:
      console.log("HTML5Geomap.engine not supported")
  }
}

HTML5Geomap.Geomap = function(elem) {
  this.elem = elem;
  this.mapDiv = null;
  this.map = null;

  this.mapElems = [];

  var initLat = elem.getAttribute("lat")
  var initLon = elem.getAttribute("lon")
  var initZoomlevel = elem.getAttribute("zoomlevel")


  var elems = elem.querySelectorAll("*")

  for (var i=0; i<elems.length; i++) {
    console.log("esidom smurffi", elems[i])

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


  switch (HTML5Geomap.engine) {
    case "leaflet":
      var shadow = elem.webkitCreateShadowRoot();
      var template = document.querySelector("#geomapDivTemplate");
      shadow.appendChild(template.content);
      shadow.applyAuthorStyles = true; // leak css from the host
      mapDiv = shadow.querySelector("div")

      this.map = L.map(mapDiv)
      this.map.setView([initLat, initLon], initZoomlevel)

      // this.map.on('click', function(e) {
      //     console.log(e.latlng);
      // });

      // TODO: geolocate if asked

      var tileLayer = L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
           attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
           maxZoom: 18
       })

      tileLayer.addTo(this.map)
      // this.map = new HTML5Geomap.LeafletMap(elem, [initLat, initLon], initZoomlevel)
      break;
    default:
      console.log("HTML5Geomap.engine not supported")
  }


  for (var i=0; i<this.mapElems.length; i++) {
    console.log("watlol", this.mapElems[i])
    this.mapElems[i].obj.addTo(this.map);
  }

  // calls func(latlng[lat, lng], originalEvent)
  this.on = function(eventType, func) {
    this.map.on(eventType, function(e) {
      latlng = null
      switch (HTML5Geomap.engine) {
        case "leaflet":
          latlng = [e.latlng.lat, e.latlng.lng]
          break
        default:
          console.log("HTML5Geomap.engine not supported")
      }
      func(latlng, e)
    })
  }

  this.add = function(obj) {

    switch (HTML5Geomap.engine) {
      case "leaflet":
        obj.obj.addTo(this.map)
        break;
      default:
        console.log("HTML5Geomap.engine not supported")
    }
  }
}


HTML5Geomap.initialize = function(rootElem) {

  var html5geomapElems = rootElem.querySelectorAll("geomap")

  for (var i=0; i<html5geomapElems.length; i++) {
    var geomap = new HTML5Geomap.Geomap(html5geomapElems[i])
    HTML5Geomap.maps[geomap.elem] = geomap
    // harshly save the Geomap for client usage purposes
    html5geomapElems[i].geomap = geomap
  }

}

HTML5Geomap.LeafletMap = function(elem, initView, initZoomlevel) {


}



HTML5Geomap.initialize(document)