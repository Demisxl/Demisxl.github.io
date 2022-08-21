const frame = new Frame("full", null, null, black, black);
frame.on("ready", () => {// ES6 Arrow Function - similar to function(){}
  zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

  // often need below - so consider it part of the template
  let stage = frame.stage;
  let stageW = frame.width;
  let stageH = frame.height;

  // REFERENCES for ZIM at http://zimjs.com
  // see http://zimjs.com/learn.html for video and code tutorials
  // see http://zimjs.com/docs.html for documentation
  // see https://www.youtube.com/watch?v=pUjHFptXspM for INTRO to ZIM
  // see https://www.youtube.com/watch?v=v7OT0YrDWiY for INTRO to CODE

  // CODE HERE

  const s = 16; // square size
  const m = 3; // margin
  const rectangle = new Rectangle(s, s, darker, null, null, 2);
  const t = new Tile(rectangle, 100, 50, m, m).loc(m, m).cache();
  // we could calculate new cols and rows for tile and run the remake() method 
  // to handle responsive like the CSS FlexBox 
  // or... in ZIM LEV (11) we are launching a Wrapper class to handle wrapping content 
  // but with the Canvas automatic overflow - it did not matter so much for this feature 

  // we could also use the simpler mouseover and mouseout events 
  // but on canvas, these are pixel color tests and are not optimal for 5000 objects 
  // so we use ZIM hitTestGrid() made for things like pixel drawing, etc.
  // we have decided to not over-draw a color if there already is one - just a design decision 
  // so we will store the index of active boxes 	
  const active = [];
  const colors = [red, green, yellow, orange, blue, pink, brown, grey];
  // emitter is a little extra not counted in the code size comparison
  const emitter = new Emitter({
    obj: new Rectangle(w, w, null, light),
    force: 0,
    shrink: false,
    startPaused: true });

  stage.on("stagemousemove", () => {
    // hitTestGrid() is an equation so as fast as we can get for grid structures
    let data = t.hitTestGrid(t.width, t.height, t.cols, t.rows, frame.mouseX, frame.mouseY, 0, 0, 0, 0, null, "array");
    if (data != null) {
      let [index, col, row] = data; // ES6 destructuring
      if (active[index]) return; // already has a color
      active[index] = 1;
      let rect = rectangle.clone().loc(m + col * (s + m), m + row * (s + m)); // position based on col and row data
      rect.index = index; // store the index on the rect for ease of removing from active array later
      rect.color = Pick.choose(colors); // or shuffle(colors)[0];
      emitter.loc(rect.x + w / 2, rect.y + h / 2).top().spurt(10);
      rect.sha(rect.color, 0, 0, 10).animate({
        props: { alpha: 0 },
        time: 40000,
        call: target => {
          active[target.index] = 0;
          target.removeFrom();
          target = null;
        } });

    }
  });

  stage.update(); // this is needed to show any changes

  // DOCS FOR ITEMS USED
  // https://zimjs.com/docs.html?item=Frame
  // https://zimjs.com/docs.html?item=Rectangle
  // https://zimjs.com/docs.html?item=Tile
  // https://zimjs.com/docs.html?item=hitTestGrid
  // https://zimjs.com/docs.html?item=animate
  // https://zimjs.com/docs.html?item=sha
  // https://zimjs.com/docs.html?item=loc
  // https://zimjs.com/docs.html?item=removeFrom
  // https://zimjs.com/docs.html?item=Emitter
  // https://zimjs.com/docs.html?item=zog




}); // end of ready