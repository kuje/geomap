HTML5Geomap.DOMObserver = {}

HTML5Geomap.DOMObserver.observer = function(mutations) {
	mutations.forEach(function(mutation) {
		// TODO: mysteriously no muttaionRecord from leaflet's div elements?
		console.log("MUTATION", mutation.type, mutation)

		switch (mutation.target.nodeName) {
			case "GEOMAP":
				var geomap = HTML5Geomap.maps[mutation.target]

				for (var i = 0; i < mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i]

					switch (node.nodeName) {
						case "MARKER":
							var marker = new HTML5Geomap.Marker(node)
							geomap.add(marker)
							console.log("ADD MARKER", node, marker)
							break

						default:
							console.log("UNSUPPORTED", node)
					}
				}

				for (var i = 0; i < mutation.removedNodes.length; i++) {
					var node = mutation.removedNodes[i]

					switch (node.nodeName) {
						case "MARKER":
							var marker = node._geomap
							geomap.remove(marker)
							console.log("REMOVE MARKER", node, marker)
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
