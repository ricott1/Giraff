var verteces = [];
var debug;

var hash;
var hash_input;
var hash_text, block_text;
var r = 50;

var colours = ['Chartreuse', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Cyan','DarkCyan','DarkGoldenRod',
'DarkGrey','DarkGreen','DarkKhaki ', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon','HotPink','Yellow', ];

//00000000387d715cd2cc44cd8f206568e9c478728613f0413579daa271eb81b2



function setup() {

  canvas = createCanvas(1600, 1200);
  hash_input = createInput("0123456789abcdef");
  hash_input.position(20, 120);
  key_input = createInput("Pericles Philippopoulos is gay");
  key_input.position(hash_input.x + hash_input.width + 20, 120);
  var text = createElement('h2', "Insert Hex (hash), Min length 16");
  text.position(20, 20);
  var button = createButton('Read');
  button.position(hash_input.x + hash_input.width + 300, 120);
  button.mousePressed(get_hash);
  hash_text = createElement('div', "Current Hash: ");
  hash_text.position(hash_input.x + hash_input.width + 400, 120);
  block_text = createElement('div', "00000000387d715cd2cc44cd8f206568e9c478728613f0413579daa271eb81b2");
  block_text.position(hash_input.x + hash_input.width + 200, 20);

}

function get_hash() {
  canvas.background(255);
    canvas.fill(255);
    for (var i = 0; i < verteces.length; i++) {
      if(verteces[i].text){
         verteces[i].text.remove();
      }
  }
  verteces = [];
  var seed1 = 0;
  var seed2 = 1;

  hash = SHA1(hash_input.value() + key_input.value());
  var key_hash = SHA1(key_input.value());
  for (var i = 0; i < hash.length; i++) {
  	var v = hash.charAt(i);
    verteces.push(new Vertex(i, v)); 
    seed1 = seed1 + parseInt(v, 16);
    seed2 = (seed2 * (parseInt(v, 16) + 1))%(17);
  }

  for (var i = 0; i < verteces.length; i++) {
    
    
    var n = (parseInt(hash.charAt(i), 16) + seed2)%(verteces.length);
    for (var j = 0; j <= n; j++) {
      var m = (seed1 * j)%(verteces.length);
      if(i != m && verteces[i].connections.indexOf(m) == -1 && verteces[m].connections.indexOf(i) == -1) {
         verteces[i].connections.push(m);
         verteces[m].connections.push(i);
         
      }
   }
  }

var max_degree = 0;
for (var i = 0; i < verteces.length; i++) {

    if(verteces[i].connections.length > max_degree) {
    	max_degree = verteces[i].connections.length;
    }
  }
  var color_list = color_graph(verteces);
  draw_graph(color_list);
  var edges = 0;
  for (var i = 0; i < verteces.length; i++) {
      edges = edges + verteces[i].connections.length;
  }
  edges = 0.5 * edges;
  hash_text.html("Current Hash: " + hash + " Hash: " + hash_input.value() + " Key Hash: " + key_hash   +"  Seeds: " + seed1 + " " + seed2 + "<br><br>  Max Degree = " + max_degree  + "  Edges = " + edges + " X_max = " + Math.ceil(0.5 + 0.5 * Math.sqrt(1+8*edges)) + "  Colors: " + (Math.max(...color_list) + 1) );
  
}
function draw_graph(color_list) {

  for (var i = 0; i < verteces.length; i++) {

  	for (var j = 0; j < verteces[i].connections.length; j++) {
      var x1 = verteces[i].x;
      var y1 = verteces[i].y;
      var x2 = verteces[verteces[i].connections[j]].x;
      var y2 = verteces[verteces[i].connections[j]].y;
      line(x1, y1, x2, y2);
   }
}
  for (var i = 0; i < verteces.length; i++) {
      verteces[i].show(color_list);
  }


}

function Vertex(i, value) {
   this.color = -1;
   this.value = value;
   this.index = int(i);
   this.x = 800 + 10*r * Math.cos(1.0*int(i) * TWO_PI/hash.length);
   this.y = 600 + 10*r * Math.sin(int(i) * TWO_PI/hash.length);
   this.connections = [];
   
   this.show = function(color_list) {
      this.text = createElement('h2', this.value);
      this.text.position(this.x-0.17*r, this.y-0.7*r);
      push();
      strokeWeight(5);
      fill(colours[color_list[this.index]]);
      //stroke(255 - weigth, 255 - weigth, 255);
      ellipse(this.x, this.y , r, r);

      pop();
   }

} 



