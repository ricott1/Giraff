var nodes = [];
var links = [];
var debug;

var hash;
var hash_input;
var hash_text;
var r = 50;

//00000000387d715cd2cc44cd8f206568e9c478728613f0413579daa271eb81b2



function setup() {
  canvas = createCanvas(800, 800);
  hash_input = createInput("daa271eb81b2123412");
  hash_input.position(20, 120);
  var text = createElement('h2', "Insert Hex (hash), Min length 16");
  text.position(20, 20);
  var button = createButton('Read');
  button.position(hash_input.x + hash_input.width + 20, 120);
  button.mousePressed(get_hash);
  hash_text = createElement('h2', "Current Hash: ");
  hash_text.position(hash_input.x + hash_input.width + 200, 120);

}

function get_hash() {
  canvas.background(255);
    canvas.fill(255);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].text.remove();
  }
  nodes = [];
   links = [];
  hash = hash_input.value();
  hash_text.html("Current Hash: " + hash);
  for (var i = 0; i < hash.length; i++) {
    nodes.push(new Node(i, hash.charAt(i)));
    links.push(new Array(i, parseInt(hash.charAt(i), 16)));
  }
  draw_graph();
  
}
function draw_graph() {

  for (var i = 0; i < links.length; i++) {
      var x1 = nodes[links[i][0]].x;
      var y1 = nodes[links[i][0]].y;
      var x2 = nodes[links[i][1]].x;
      var y2 = nodes[links[i][1]].y;
      console.log(x1, y1, x2, y2);
      line(x1, y1, x2, y2);
   }
  for (var i = 0; i < nodes.length; i++) {
      nodes[i].show();
  }


}

function Node(i, value) {
   this.colour = (255, 255, 255);
   this.value = value;
   this.index = int(i);
   this.x = 250 + 4*r * Math.cos(1.0*int(i) * TWO_PI/hash.length);
   this.y = 400 + 4*r * Math.sin(int(i) * TWO_PI/hash.length);
   
   
   this.show = function() {
      this.text = createElement('h2', this.value);
      this.text.position(this.x-0.17*r, this.y-0.7*r);
      push();
      strokeWeight(6);
      fill(255, 255, 255);
      //stroke(255 - weigth, 255 - weigth, 255);
      ellipse(this.x, this.y , r, r);

      pop();
   }

} 



