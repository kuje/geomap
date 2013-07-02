HTML5Geomap.DOMObserver = {}

HTML5Geomap.DOMObserver.observer = function(mutations) {
	mutations.forEach(function(mutation) {
		// TODO: mysteriously no muttaionRecord from leaflet's div elements?
		console.log(mutation)

		switch (mutation.target.nodeName) {
			case "GEOMAP":
				for (var i = 0; i < mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i]
					var geomap = HTML5Geomap.maps[mutation.target]

					switch (node.nodeName) {
						case "SMURFFI":
							var smurffi = new HTML5Geomap.Smurffi(node)
							smurffi.lolcircle.addTo(geomap.map.map)
							console.log("SMURFFI", node, smurffi)

							// observe attribute changes
							// globaaliObserver.observe(node, { attributes: true })
							break
						default:
							console.log("UNSUPPORTED", node)
					}
				}
			break

		case "SMURFFI":
			console.log("JUMMI")
			if (mutation.type == "attributes") {
				console.log(mutation.attributeName, mutation.target.getAttribute(mutation.attributeName))
			}
		}
	})
}

HTML5Geomap.DOMObserver.initialize = function(rootElem) {
	globaaliObserver = new MutationObserver(HTML5Geomap.DOMObserver.observer)

	// NOTE: not observing subtree
	// TODO: filter out leaflet crap from subtree MutationRecords
	var config = {
		subtree: true,
		attributes: true,
		attributeOldValue: true,
		childList: true,
		characterData: true
	}

	globaaliObserver.observe(rootElem, config)
}

// OLETETAAN ET ON YKS
HTML5Geomap.DOMObserver.initialize(document.querySelector("geomap"))
