HTML5Geomap.DOMObserver = {}

HTML5Geomap.DOMObserver.observer = function(mutations) {
	mutations.forEach(function(mutation) {
		// TODO: mysteriously no muttaionRecord from leaflet's div elements?
		console.log(mutation.type, mutation)

		switch (mutation.target.nodeName) {
			case "GEOMAP":
				for (var i = 0; i < mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i]
					var geomap = HTML5Geomap.maps[mutation.target]

					switch (node.nodeName) {
						case "MARKER":
							var marker = new HTML5Geomap.Marker(node)
							geomap.add(marker)

							console.log("MARKER", node, marker)

							break
						default:
							console.log("UNSUPPORTED", node)
					}
				}
			break

			case "MARKER":
				switch (mutation.type) {
					case "attributes":
						console.log("ATTR", mutation.attributeName, mutation.target.getAttribute(mutation.attributeName))
						break
				}
			}
	})
}

HTML5Geomap.DOMObserver.initialize = function(rootElem) {
	var observer = new MutationObserver(HTML5Geomap.DOMObserver.observer)

	// NOTE: not observing subtree
	// TODO: filter out leaflet crap from subtree MutationRecords
	var config = {
		subtree: true,
		attributes: true,
		attributeOldValue: true,
		childList: true,
		characterData: true
	}

	observer.observe(rootElem, config)
}

// OLETETAAN ET ON YKS


HTML5Geomap.DOMObserver.initialize(document.querySelector("geomap"))
