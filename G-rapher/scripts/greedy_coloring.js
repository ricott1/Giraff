function color_graph(verteces) {
	var color_list = [];
	for (var i = verteces.length - 1; i >= 0; i--) {
		color_list.push(-1);
	}

	for (var i = verteces.length - 1; i >= 0; i--) {
		var c = 0;
		verteces[i].connections.sort(function(a, b){return color_list[a]-color_list[b]});
		for (var  j = 0; j < verteces[i].connections.length; j++) {	
			if(color_list[verteces[i].connections[j]] == c) {
				c++
			}
		}
		color_list[i] = c;
		
	}
	return color_list;
}