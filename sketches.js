const dim = 400;

var slideshow = remark.create({
  ratio: '16:9',
  highlightStyle: 'tomorrow-night-eighties',
  highlightLines: true,
  navigation: {
    scroll: false
  }
});
slideshow.on('showSlide', function(slide) {
  const n = slide.properties.name;
  console.log(n);
  if (n === 'setup') {
    // ----- SETUP

    let sketch = function(p) {
      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        p.background(0);
      };
    };

    new p5(sketch);
  } else if (n === 'draw') {
    // ----- DRAW

    let sketch = function(p) {
      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        p.background(0);
        p.ellipse(p.width / 2, p.width / 2, 30, 30);
      };
    };

    new p5(sketch);
  } else if (n === 'animate') {
    // ----- ANIMATE

    let sketch = function(p) {
      let x;
      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        p.background(0);
        p.noStroke();
        x = 0;
      };

      p.draw = function() {
        p.ellipse(x++, p.width / 2, 30, 30);
      };
    };

    new p5(sketch);
  } else if (n === 'animate2') {
    // ----- ANIMATE 2

    let sketch = function(p) {
      let x = 0;
      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        p.noStroke();
      };

      p.draw = function() {
        p.background(0);
        p.ellipse(x, p.width / 2, 30, 30);
        x = (x + 1) % p.width;
      };
    };

    new p5(sketch);
  } else if (n === 'random') {
    // ----- RANDOM

    let sketch = function(p) {
      let x, y;
      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        cnv.mousePressed(reset);
        p.noStroke();

        reset();
      };

      p.draw = function() {
        p.background(0);
        p.ellipse(x, y, 30, 30);
      };

      function reset() {
        x = Math.random() * p.width;
        y = Math.random() * p.height;
      }
    };

    new p5(sketch);
  } else if (n === 'random2') {
    // ----- RANDOM 2

    let sketch = function(p) {
      let pos;

      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        cnv.mousePressed(reset);
        p.noStroke();

        reset();
      };

      p.draw = function() {
        p.background(0);
        for (let i = 0; i < 20; i++) {
          p.ellipse(pos[i][0], pos[i][1], 30, 30);
        }
      };

      function reset() {
        pos = [];
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * p.width;
          const y = Math.random() * p.height;
          pos.push([x, y]);
        }
      }
    };

    new p5(sketch);
  } else if (n === 'random3') {
    // ----- RANDOM 3

    let sketch = function(p) {
      let pnts;

      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        cnv.mousePressed(reset);
        p.noStroke();
        p.noLoop();

        reset();
      };

      p.draw = function() {
        p.background(0);
        for (let i = 0; i < 500; i++) {
          p.fill(255, pnts[i].o);
          p.ellipse(pnts[i].x, pnts[i].y, pnts[i].d, pnts[i].d);
        }
      };

      function reset() {
        pnts = [];
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * p.width;
          const y = Math.random() * p.height;
          const d = p.random(5, 30);
          const o = p.random(255);
          pnts.push({ x, y, d, o });
        }
        p.draw();
      }
    };

    new p5(sketch);
  } else if (n === 'random4') {
    // ----- RANDOM 4

    let sketch = function(p) {
      let pnts;

      p.setup = function() {
        let cnv = p.createCanvas(dim, dim);
        cnv.parent('ex_' + n);
        cnv.mousePressed(reset);
        p.noStroke();
        p.noLoop();

        reset();
      };

      p.draw = function() {
        p.background(0);
        for (let i = 0; i < 500; i++) {
          p.fill(255, pnts[i].o);
          p.ellipse(pnts[i].x, pnts[i].y, pnts[i].d, pnts[i].d);
        }
      };

      function reset() {
        pnts = [];
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * p.width;
          const y = Math.random() * p.height;
          const d = p.noise(x / 50, y / 50) * 30;
          const o = p.noise(x / 50, y / 50) * 255;
          pnts.push({ x, y, d, o });
        }
        p.draw();
      }
    };

    new p5(sketch);
  }
});

slideshow.on('hideSlide', function(slide) {
  const n = slide.properties.name;
  const exn = document.getElementById('ex_' + n);
  if (exn === null || exn === undefined) return;
  console.log('cleaning up ' + n);
  while (exn.firstChild) {
    exn.removeChild(exn.firstChild);
  }
});
