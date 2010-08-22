function getContext(id) {
  var canvas = document.getElementById(id);
  if (canvas.getContext) return canvas.getContext("2d");
  return null;
}

function recting() {
  var ctx = getContext('rect');
  drawRect(ctx);
}

function drawRect(ctx) {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 55, 50);
  return ctx;
}

function scaling() {
  var ctx = getContext('scaling');
  $('#scaling').mouseover(function() {grow(ctx); });
  $('#scaling').mouseout(function() { shrink(ctx); });
  drawRect(ctx);
}

function grow(ctx) {
  ctx.scale(1.5,1.5);
  drawRect(ctx);
}

function shrink(ctx) {
  ctx.scale(.5,.5);
  drawRect(ctx);
}