function color_graph(verteces) {
	var color_list = [];
	for (var i = verteces.length - 1; i >= 0; i--) {
		color_list.push(-1);
	}

	for (var i = verteces.length - 1; i >= 0; i--) {
		var c = 0;
		//console.log("con1   " + verteces[i].connections);
		verteces[i].connections.sort(function(a, b){return color_list[a]-color_list[b]});
		//console.log("con2   " + verteces[i].connections);
		for (var  j = 0; j < verteces[i].connections.length; j++) {	
			//console.log(color_list[verteces[i].connections[j]], c);
			if(color_list[verteces[i].connections[j]] == c) {
				c++
			}
		}
		color_list[i] = c;
		
	}
	console.log(color_list, Math.max(...color_list));
	return color_list;
}