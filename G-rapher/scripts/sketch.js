var nodes = [];
var debug;

var hash;
var hash_input;
var hash_text, block_text;
var r = 50;

var colours = ['Chartreuse', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Cyan','DarkCyan','DarkGoldenRod',
'DarkGrey','DarkGreen','DarkKhaki ',  'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon','HotPink','Yellow'];

//00000000387d715cd2cc44cd8f206568e9c478728613f0413579daa271eb81b2



function setup() {
  canvas = createCanvas(800, 1000);
  hash_input = createInput("0123456789abcdef");
  hash_input.position(20, 120);
  var text = createElement('h2', "Insert Hex (hash), Min length 16");
  text.position(20, 20);
  var button = createButton('Read');
  button.position(hash_input.x + hash_input.width + 20, 120);
  button.mousePressed(get_hash);
  hash_text = createElement('div', "Current Hash: ");
  hash_text.position(hash_input.x + hash_input.width + 200, 120);
  block_text = createElement('div', "00000000387d715cd2cc44cd8f206568e9c478728613f0413579daa271eb81b2");
  block_text.position(hash_input.x + hash_input.width + 200, 20);

}

function get_hash() {
  canvas.background(255);
    canvas.fill(255);
    for (var i = 0; i < nodes.length; i++) {
      if(nodes[i].text){
         nodes[i].text.remove();
      }
  }
  nodes = [];
  var seed1 = 0;
  var seed2 = 1;

  hash = hash_input.value();
  
  for (var i = 0; i < hash.length; i++) {
  	var v =hash.charAt(i);
    nodes.push(new Node(i, v)); 
    seed1 = seed1 + parseInt(v, 16);
    seed2 = (seed2 * (parseInt(v, 16) + 1))%(17);
  }

  for (var i = 0; i < nodes.length; i++) {
    
    
    var n = (parseInt(hash.charAt(i), 16) + seed2)%(nodes.length);
    for (var j = 0; j <= n; j++) {
      var m = (seed1 * j)%(nodes.length);
      console.log(i, m, nodes.length);
      if(i != m && nodes[i].connections.indexOf(m) == -1 && nodes[m].connections.indexOf(i) == -1) {
         nodes[i].connections.push(m);
         nodes[m].connections.push(i);
         
      }
   }
  }

var max_degree = 0;
for (var i = 0; i < nodes.length; i++) {

    if(nodes[i].connections.length > max_degree) {
    	max_degree = nodes[i].connections.length;
    }
  }

  draw_graph();
  var edges = 0;
  for (var i = 0; i < nodes.length; i++) {
      edges = edges + nodes[i].connections.length;
  }
  edges = 0.5 * edges;
  hash_text.html("Current Hash: " + hash + "  Seeds: " + seed1 + " " + seed2 + "  Max Degree = " + max_degree  + "  Edges = " + edges + " X_max = " + Math.ceil(0.5 + 0.5 * Math.sqrt(1+8*m)));
  
}
function draw_graph() {

  for (var i = 0; i < nodes.length; i++) {
  	console.log(nodes[i].connections);
  	for (var j = 0; j < nodes[i].connections.length; j++) {
      var x1 = nodes[i].x;
      var y1 = nodes[i].y;
      var x2 = nodes[nodes[i].connections[j]].x;
      var y2 = nodes[nodes[i].connections[j]].y;
      line(x1, y1, x2, y2);
   }
}
  for (var i = 0; i < nodes.length; i++) {
      nodes[i].show();
  }


}

function Node(i, value) {
   this.colour = (255, 255, 255);
   this.value = value;
   this.index = int(i);
   this.x = 400 + 5*r * Math.cos(1.0*int(i) * TWO_PI/hash.length);
   this.y = 500 + 5*r * Math.sin(int(i) * TWO_PI/hash.length);
   this.connections = [];
   
   this.show = function() {
      this.text = createElement('h2', this.value);
      this.text.position(this.x-0.17*r, this.y-0.7*r);
      push();
      strokeWeight(6);
      fill(colours[parseInt(this.value, 16)]);
      //stroke(255 - weigth, 255 - weigth, 255);
      ellipse(this.x, this.y , r, r);

      pop();
   }

} 



