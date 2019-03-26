// https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
// ================================================================================
/* var s = Snap("#svg1");
var svg1 = document.getElementById('svg1');
var w = svg1.clientWidth, h = svg1.clientHeight;
var border = 0;
var xmin = -2, xmax = 9;
var ymin = -1, ymax = 9;
var x0 = 0, y0 = 0;
var xscale = 1, yscale = 1;
var xorg = 0, yorg = 80;

xscale = (w - 2 * border)/(xmax - xmin + 2);
yscale = (h - 2 * border)/(ymax - ymin + 2);
xorg = (-xmin + 1) * xscale;
yorg = (-ymin + 1) * yscale;
*/
// ================================================================================
function Drawing( svgContext, svgString, transformString, timeBetweenDraws ) {
    this.fragment = Snap.parse( svgString );
    this.pathArray = this.fragment.selectAll('path');
    this.group = svgContext.g().transform( transformString ).drag();
    this.timeBetweenDraws = timeBetweenDraws;
};
// ================================================================================
Drawing.prototype.init = function( svgString, transformString ) {
      this.group.clear();
      this.currentPathIndex = 0;
};
// ================================================================================
Drawing.prototype.endReached = function() {
    if( this.currentPathIndex >= this.pathArray.length ) {
        return true;
    };
};
// ================================================================================
Drawing.prototype.callOnFinished = function() {
}
// ================================================================================
Drawing.prototype.initDraw = function() {
    this.init();
    this.draw();
};
// ================================================================================
Drawing.prototype.quickDraw = function() {
    this.init();
    this.timeBetweenDraws = 0;
    this.draw();
};
// ================================================================================
Drawing.prototype.draw = function() {         // this is the main animation bit
    if( this.endReached() ) {
        if( this.callOnFinished ) {
            this.callOnFinished();
            return
        };
    };
    var myPath = this.pathArray[ this.currentPathIndex ] ;

    this.leng = myPath.getTotalLength();

    this.group.append( myPath );

     myPath.attr({
       fill: 'none',
       "stroke-dasharray": this.leng + " " + this.leng,
       "stroke-dashoffset": this.leng
     });

     this.currentPathIndex++;

     myPath.animate({"stroke-dashoffset": 0}, this.timeBetweenDraws, mina.easeout, this.draw.bind( this ) );

};
// ================================================================================
function drawGraphPaper(svgContext, dims) {
  var i, s1, x, y;
  var l, t;

  svgContext.clear();
  var rect = svgContext.rect(dims[2], dims[2], dims[0] - 2 * dims[2], dims[1] - 2 * dims[2]);
  rect.attr({
    fill: "#808080",
    stroke: "#FFF",
    strokeWidth: 1
  });

  // Draw vertical lines
  i = dims[3];
  while(i <= dims[4]) {
    x = parseInt(i++ * dims[7] + dims[2] + dims[9]);
    s1 = "M" + x + " " + dims[2] + "L" + x + " " + (dims[1] - dims[2]);
    l = svgContext.path(s1);
    if(i == 1) {
      l.attr({ fill: "#808080", stroke: "#000", strokeWidth: 2 });    
    } else {
      l.attr({ fill: "#808080", stroke: "#FFF", strokeWidth: 1 });    
    }
  }

  // Draw horizontal lines
  i = dims[5];
  while(i <= dims[6]) {
    y = parseInt(dims[1] - (i++ * dims[8] + dims[2] + dims[10]));
    s1 = "M" + dims[2] + " " + y + "L" + (dims[0] - dims[2]) + " " + y;
    l = svgContext.path(s1);
    if(i == 1) {
      l.attr({ fill: "#808080", stroke: "#000", strokeWidth: 2 });    
    } else {
      l.attr({ fill: "#808080", stroke: "#FFF", strokeWidth: 1 });    
    }
  }  

/*  // Write x values
  i = xmin;
  x = parseInt(i * xscale + border + xorg);
  while(i <= xmax) {
    t = svgContext.text(x - 10, y0 + 16, i.toString());  // Tweak the text position
    t.attr({ fill: "#808080", stroke: "#000", strokeWidth: 2 });    
    x = parseInt(++i * xscale + border + xorg);
  }

  // Write y values
  i = ymin;
  y = parseInt(h - (i * yscale + border + yorg));
  while(i <= ymax) {
    if(i != 0) {
      if(i < 0) {
        t = svgContext.text(x0 - 15, y + 12, i.toString());  // Tweak the text position
      } else {
        t = svgContext.text(x0 - 11, y + 12, i.toString());  // Tweak the text position        
      }
      t.attr({ fill: "#808080", stroke: "#000", strokeWidth: 2 });    
    }
    y = parseInt(h - ( ++i * yscale + border + yorg));
  } */
}
// ================================================================================
// 0: w, 1: h, 2: border, 3: xmin, 4: xmax, 5: ymin, 6: ymax, 
// 7: xscale, 8: yscale, 9: xorg, 10: yorg

function drawSimpleGraphPaper(svgContext, dims) {
  var i, s1, x, y;
  var l, t;

  s.clear();
  var rect = s.rect(border, border, w - 2 * border, h - 2 * border);
  rect.attr({
    fill: "#808080",
    stroke: "#FFF",
    strokeWidth: 1
  });

  // Draw vertical lines
  x = parseInt(border + xorg);
  s1 = "M" + x + " " + border + "L" + x + " " + (h - border);
  l = s.path(s1);
  l.attr({ fill: "#808080", stroke: "#000", strokeWidth: 2 });    

  // Draw horizontal lines
  y = parseInt(h - (border + yorg));
  s1 = "M" + border + " " + y + "L" + (w - border) + " " + y;
  l = s.path(s1);
  l.attr({ fill: "#808080", stroke: "#000", strokeWidth: 2 });    
}
// ================================================================================
// 0: w, 1: h, 2: border, 3: xmin, 4: xmax, 5: ymin, 6: ymax, 
// 7: xscale, 8: yscale, 9: xorg, 10: yorg

function graphCross(svgContext, dims, inX, inY, inColour) {
  var s1, x, y;

  x = parseInt(inX * dims[7] + dims[2] + dims[9]);
  y = parseInt(dims[1] - (inY * dims[8] + dims[2] + dims[10]));

  s1 = "M" + (x - 5) + " " +  (y - 5) + "L" + (x + 5) + " " + (y + 5);
  s1 += " M" + (x + 5) + " " +  (y - 5) + "L" + (x - 5) + " " + (y + 5);
  l = svgContext.path(s1);
  l.attr( { fill: "#808080", stroke: "#0F0", strokeWidth: 2 });    
}
// ================================================================================
function graphLine(inM, inC, inColour) {
  var s1, x, x1, y1, x2, y2;

  x = 2 * xmin;
  x1 = parseInt(x * xscale + border + xorg);
  y1 = parseInt(h - ((x * inM + inC) * yscale + border + yorg));
  x = 2 * xmax;
  x2 = parseInt(x * xscale + border + xorg);
  y2 = parseInt(h - ((x * inM + inC) * yscale + border + yorg));

  s1 = "M" + x1 + " " +  y1 + "L" + x2 + " " + y2;
  l = s.path(s1);
  l.attr( { fill: "#808080", stroke: "#0F0", strokeWidth: 2 });    
}
// ================================================================================
// 0: w, 1: h, 2: border, 3: xmin, 4: xmax, 5: ymin, 6: ymax, 
// 7: xscale, 8: yscale, 9: xorg, 10: yorg
function getLine(svgContext, dims, inM, inC, xmin, xmax, inColour) {
  var s1, x, x1, y1, x2, y2;

  x = 2 * xmin;
  x1 = parseInt(x * dims[7] + dims[2] + dims[9]);
  y1 = parseInt(dims[1] - ((x * inM + inC) * dims[8] + dims[2] + dims[10]));
  x = 2 * xmax;
  x2 = parseInt(x * dims[7] + dims[2] + dims[9]);
  y2 = parseInt(dims[1] - ((x * inM + inC) * dims[8] + dims[2] + dims[10]));

  s1 = '<path d="M' + x1 + ',' +  y1 + ' L' + x2 + ',' + y2 + '"';
  s1 += ' stroke-width="2" stroke="' + inColour + '" />';
//  console.log(s1);  
  return s1;
}
// ================================================================================
// 0: w, 1: h, 2: border, 3: xmin, 4: xmax, 5: ymin, 6: ymax, 7: xscale, 8: yscale, 9: xorg, 10: yorg
function graphQuadratic(svgContext, dims, aCoef, bCoef, cCoef, xmin, xmax, inColour) {
  var s1 = "", q, x, xstep = 0.2, x1, y1, x2, y2;

  s1 = "";
  x = xmin;
  x1 = parseInt(x * dims[7] + dims[2] + dims[9]);
  y1 = parseInt(dims[1] - (((aCoef * x + bCoef) * x + cCoef) * dims[8] + dims[2] + dims[10]));
  while(x < xmax) {
    x += xstep;
    x2 = parseInt(x * dims[7] + dims[2] + dims[9]);
    y2 = parseInt(dims[1] - (((aCoef * x + bCoef) * x + cCoef) * dims[8] + dims[2] + dims[10]));

    s1 = " M" + x1 + " " +  y1 + "L" + x2 + " " + y2;
    q = svgContext.path(s1);
    q.attr( { fill: "#808080", stroke: "#00F", strokeWidth: 2 }); 

    x1 = x2;
    y1 = y2;
  }
}
// ================================================================================
function getQuadratic(svgContext, dims, aCoef, bCoef, cCoef, xmin, xmax, inColour) {
  var s1 = "", x, xstep = 0.2, x1, y1, x2, y2;

  x = xmin;
  while(x <= (xmax + xstep)) {
    x1 = parseInt(x * dims[7] + dims[2] + dims[9]);
    y1 = parseInt(dims[1] - (((aCoef * x + bCoef) * x + cCoef) * dims[8] + dims[2] + dims[10]));
    if(s1) {
      s1 += x1 + "," +  y1 + " ";
    } else {
      s1 = '<path d="M' + x1 + "," +  y1 + " L";
    }
    x += xstep;
  }
  s1 += '" stroke-width="2" stroke="' + inColour + '" />';  
  return s1;
}
// ================================================================================
// http://www.pshkvsky.com/gif2code/sine-animation-tutorial-three-js/
// returns asin(bx)
function getSineWave(dims, aCoef, bCoef, xmin, xmax, inColour) {
  var s1 = "", x, xstep = 0.147, x1, y1, x2, y2;

  x = xmin;
  while(x <= (xmax + xstep)) {
    x1 = parseInt(x * dims[7] + dims[2] + dims[9]);
    y1 = parseInt(dims[1] - (aCoef * Math.sin(bCoef * x) * dims[8] + dims[2] + dims[10]));
    if(s1) {
      s1 += x1 + "," +  y1 + " ";
    } else {
      s1 = '<path d="M' + x1 + "," +  y1 + " L";
    }
    x += xstep;
  }

  s1 += '" stroke-width="2" stroke="' + inColour + '" />';  
  return s1;
}
// ================================================================================
// returns acos(bx)
function getCosineWave(dims, aCoef, bCoef, xmin, xmax, inColour) {
  var s1 = "", x, xstep = 0.147, x1, y1, x2, y2;

  x = xmin;
  while(x <= (xmax + xstep)) {
    x1 = parseInt(x * dims[7] + dims[2] + dims[9]);
    y1 = parseInt(dims[1] - (aCoef * Math.cos(bCoef * x) * dims[8] + dims[2] + dims[10]));
    if(s1) {
      s1 += x1 + "," +  y1 + " ";
    } else {
      s1 = '<path d="M' + x1 + "," +  y1 + " L";
    }
    x += xstep;
  }

  s1 += '" stroke-width="2" stroke="' + inColour + '" />';  
  return s1;
}
// ================================================================================
// returns acos(cx) + bsin(cx) + d
function getCombinedWave(dims, aCoef, bCoef, cCoef, dCoef,  xmin, xmax, inColour) {
  var s1 = "", x, xstep = 0.147, x1, y1, x2, y2;

  x = xmin;
  while(x <= (xmax + xstep)) {
    x1 = parseInt(x * dims[7] + dims[2] + dims[9]);
//    console.log(x + ", " + (aCoef * Math.cos(cCoef * x)+bCoef * Math.sin(cCoef * x)));
    y1 = parseInt(dims[1] - ((aCoef * Math.cos(cCoef * x)+bCoef * Math.sin(cCoef * x)+dCoef) * dims[8] + dims[2] + dims[10]));
    if(s1) {
      s1 += x1 + "," +  y1 + " ";
    } else {
      s1 = '<path d="M' + x1 + "," +  y1 + " L";
    }
    x += xstep;
  }

  s1 += '" stroke-width="2" stroke="' + inColour + '" />';  
  return s1;
}
// ================================================================================