/* CONTENTS
getRandomArray = function(count, minNum, maxNum, probNegative) {
getRandomPrimes = function(count, minNum, maxNum, probNegative) {
getNumber = function(minNum, maxNum, probNegative) {
insertCoefficient = function(inNum, leading, justanumber) {
insertNumericalExponent = function(inBase, inExponent) {
getBinomial = function() {
getArithmetic = function() {
getFractions = function() {
getPowers = function() {
getPowers1 = function() {
getBinDecHex = function() {
getBracketExpression = function() {
getAlgebraicDivision = function() {
getCubic = function() {
getCubic1 = function() {
getLinearEquation = function() {
getLinearEquation1 = function() {
getLinearExpansion = function() {
getQuadratic = function() {
getQuadratic1 = function() {
getQuadratic2 = function() {
getQuadratic3 = function() {
getSimultaneousEqns = function() {
getLine = function() {
// Fisher-Yates Shuffle see http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
getCommonFactor = function(inN1, inN2) {
simplify = function(inObj) {
factorise = function(inNum) {
getFractionQuestion = function(inOp) {
getConvertQuestion = function(inOp) {
getPercentageQuestion1 = function() {
getPercentageQuestion2 = function() {
getPercentageQuestion3 = function() {
getPercentageQuestion4 = function() {
getPercentageQuestion5 = function() {
getRootsQuestion = function() {
getPartialFraction = function() {
*/
// ========================================================
getRandomArray = function(count, minNum, maxNum, probNegative) {
  var arr = [], i, j, k, max, n = 0, r = 0;
 
  if(minNum > maxNum) {
    i = minNum;
    minNum = maxNum;
    maxNum = i;
  }
  maxNum -= minNum;

  if(count > maxNum) {
    max = count;
  } else {
    max = maxNum;
  }

  j = 0;  k = 0;
  while(j < max) {
    arr[j] = k + minNum;
    if(probNegative > Math.random()) arr[j] = -arr[j];
    j++;
    if(j === maxNum) {
      k = 0;
    } else {
      k++;
    } 
  } 
  arr = shuffle(arr);
  arr = arr.slice(0, (count+1));
  return arr;
}
// ========================================================
getRandomPrimes = function(count, minNum, maxNum, probNegative) {
  var arr = [], i, j, k, n = 0, r = 0;
  var mink = 0, maxk = 0;
  var p = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
 
  if(minNum > maxNum) {
    i = minNum;
    minNum = maxNum;
    maxNum = i;
  }

  for(i = 0; i < p.length; i++) {
    if(minNum > p[mink]) {
      mink = i;
    }
    if(maxNum > p[maxk]) {
      maxk = i;
    }
  }

  j = 0;  k = mink;
  while(j < count) {
    arr[j] = p[k];
    if(probNegative > Math.random()) arr[j] = -arr[j];
    j++;  k++;
    if(k > maxk) {
      k = mink;
    } else {
      k++;
    } 
  } 
  arr = shuffle(arr);
  return arr;
}
// ========================================================
getNumber = function(minNum, maxNum, probNegative) {
  var arr = [], i, j, n = 0, r = 0;
 
  if(minNum > maxNum) {
    i = minNum;
    minNum = maxNum;
    maxNum = i;
  }
  maxNum -= minNum;
  j = 0;
  while(j < maxNum) {
    arr[j] = j + minNum;
    j++;
  } 
  arr = shuffle(arr);
  n = arr[0];
  
  if(probNegative > Math.random()) n = -n;
  return n;
}
// ========================================================
insertCoefficient = function(inNum, leading, justanumber) {
  var s = "";
  if(leading) {
    if(inNum > 0) {
      if(inNum > 1) {
        s = inNum;
      } else {
        if(justanumber) {
          s = "1";
        }
      }
    } else {
      if(inNum < -1) {
        s = "-" + Math.abs(inNum);
      } else {
        if(justanumber) {
          s = "-1";
        } else {
          s = "-";
        }
      }
    }
  } else {
    if(inNum > 0) {
      if(inNum > 1) {
        s = " + " + inNum;
      } else {
        if(justanumber) {
          s = " + 1";
        } else {
          s = " + ";
        }
      }
    } else {
      if(inNum < -1) {
        s = " - " + Math.abs(inNum);
      } else {
        if(justanumber) {
          s = " - 1";
        } else {
          s = " - ";
        }
      }
    }    
  }
  return s;
}
// ========================================================
insertNumericalExponent = function(inBase, inExponent, inBracket) {
  var s = "";

  if(inBracket == "") {
    if(inExponent == 0) {
      s = "";
    } else if(inExponent == 1) {
      s = inBase;
    } else  if(inExponent < 0) {
      s = inBase + "^{" + insertCoefficient(inExponent, true, true) + "}"; // Use {} for Latex
    } else {
      s = inBase + "^" + insertCoefficient(inExponent, true, true);
    }
  } else {
    if(inExponent == 0) {
      s = "";
    } else if(inExponent == 1) {
      s = inBase;
    } else {
      if(inBracket == "(") {
        s = inBase + "^(" + insertCoefficient(inExponent, true, true) + ")"; 
      } else if(inBracket == "{") {
        s = inBase + "^{" + insertCoefficient(inExponent, true, true) + "}"; // Use {} for Latex        
      } else if(inBracket == "[") {
        s = inBase + "^[" + insertCoefficient(inExponent, true, true) + "]";         
      }
    }    
  }
  return removeAllSpaces(s);
}
// ========================================================
getBinomial = function() {
  var a, s, n;
  
  a = getNumber(0, 4, 0);
  if(a === 0) {
    s = "(" + getNumber(2, 20, 0.5) + "+" + insertCoefficient(getNumber(2, 20, 0), true, true) + ")";
  } else   if(a === 1) {
    s = "(" + getNumber(2, 20, 0.5) + "-" + insertCoefficient(getNumber(2, 20, 0), true, true) + ")";
  }  else if(a === 2) {
    s = "(" + getNumber(2, 20, 0.5) + "*" + insertCoefficient(getNumber(2, 20, 0), true, true) + ")";
  } else {
    s = "(" + getNumber(2, 20, 0.5) + "/" + insertCoefficient(getNumber(2, 20, 0), true, true) + ")";
  }
  return s;
}
// ========================================================
getArithmetic = function() {
  var i, n = [], s, s1, obj = {};
  
  for(i = 0; i < 6; i++) {
    n[i] = getNumber(1, 20, 0.49);
  }

  s = getBinomial();
  
/*  s = "(" + n[0] + insertOperator(op[0]) + "(" + n[1];
  s += insertCoefficient(n[2], false, true);
  s += ") " + insertCoefficient(n[3], false, true);
  s += " * ( " + insertCoefficient(n[4], true, true);
  s += insertCoefficient(n[5], false, true) + "))";

  s = insertCoefficient(n[0], true, true) + insertOperator(op[0]);
  s += insertCoefficient(n[1], false, true) + insertOperator(op[1]);
  s += insertCoefficient(n[2], false, true) + insertOperator(op[2]);
  s += insertCoefficient(n[3], false, true) + insertOperator(op[3]);
  s += insertCoefficient(n[4], false, true) + insertOperator(op[4]);
  s += insertCoefficient(n[5], false, true);
*/  
  s1 = "\\(" + s + "\\)";

  obj = {"question": s1, "answer": ""};
  return obj;
}
// ========================================================
getFractions = function() {
  var i, n = [], s, s1, obj = {};
  
  for(i = 0; i < 6; i++) {
    n[i] = getNumber(6, 20, 0);
  }

  if(Math.random() > 0.5) {
    s = "(" + insertCoefficient(n[0], true, true) + " / " + insertCoefficient(n[1], true, true);
    if(Math.random() > 0.5) {
      s += ")*(" + insertCoefficient(n[2], true, true) + " / " + insertCoefficient(n[3], true, true);
      if(Math.random() > 0.5) {
        s += ")+(" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true) + ")";
      } else {
        s += ")-(" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);      
      }
    } else {
      s += "/" + insertCoefficient(n[2], true, true) + " / " + insertCoefficient(n[3], true, true);      
      if(Math.random() > 0.5) {
        s += "+" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);
      } else {
        s += "-" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);      
      }
    } 
  }  else {
    s = insertCoefficient(n[0], true, true) + " / " + insertCoefficient(n[1], true, true);
    if(Math.random() > 0.5) {
      s += "+" + insertCoefficient(n[2], true, true) + " / " + insertCoefficient(n[3], true, true);
      if(Math.random() > 0.5) {
        s += "*" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);
      } else {
        s += "/" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);      
      }
    } else {
      s += "-" + insertCoefficient(n[2], true, true) + " / " + insertCoefficient(n[3], true, true);      
      if(Math.random() > 0.5) {
        s += "*" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);
      } else {
        s += "/" + insertCoefficient(n[4], true, true) + " / " + insertCoefficient(n[5], true, true);      
      }
    }  
  }
  console.log(s);
  i = math.eval(s);
  s = "\\(" + s + "\\)"

  obj = {"question": s, "answer": i};
  return obj;
}
// ========================================================
getPowers = function() {
  var b, i, n = [], s, s1, obj = {};
  
  b =  getNumber(4, 8, 0);
  for(i = 0; i < 4; i++) {
    n[i] =  getNumber(2, 5, 0.3);
  }
  s = "(" + b + "^{" + n[0] + "} * " + b + "^{" + n[1] + "}) / (";
  s += b + "^{" + n[2] + "} * " + b + "^{" + n[3] + "})";
  
  s1 = "\\(" + s + "\\)"

  i = n[0] + n[1] - n[2] - n[3];
  s = b + "^{" + i + "}";
  obj = {"question": s1, "answer": s};
  return obj;
}
// ========================================================
getPowers1 = function() {
  var b, i, m = [], n = [], s, s1, obj = {};
  
  for(i = 0; i < 4; i++) {
    m[i] =  getNumber(2, 10, 0);    // bases
    n[i] =  getNumber(2, 10, 0.4);  // coefficients
  }
  s = "( " + m[0] + "^" + n[0] + " * " + m[1] + "^" + n[1] + ") / (";
  s += m[2] + "^" + n[2] + " * " + m[3] + "^" + n[3] + ")";
  
  i = eval(s);

  s = "( " + m[0] + "^{" + n[0] + "} * " + m[1] + "^{" + n[1] + "}) / (";
  s += m[2] + "^{" + n[2] + "} * " + m[3] + "^{" + n[3] + "})";
  
  s1 = "\\(" + s + "\\)";
  obj = {"question": s1, "answer": i};
  return obj;
}
// ========================================================
getBinDecHex = function() {
  var  n, s, obj = {};

  n = getNumber(10, 256, 0);
  s = {"bin": n.toString(2) + "|", "dec": n + "|", "hex": n.toString(16)};
  
  obj = {"question": n, "answer": s};
  return obj;  
}
// ========================================================
getBracketExpression = function() {
  var a, b, c, d, e, i, n = [], s, obj = {};
  
  e = getNumber(1, 4, 0);
  if(e === 1) {
    for(i = 0; i < 2; i++) {
      n[i] =  getNumber(2, 10, 0.4);
    }
    s = "(" + n[0] + "x ";
    s += insertCoefficient(n[1], false, true) + ")^3";

    a = n[0] * n[0] * n[0];
    b = 3 * n[0] * n[0] * n[1];
    c = 3 * n[0] * n[1] * n[1]; 
    d = n[1] * n[1] * n[1];
    s1 = insertCoefficient(a, true, true) + "x^3" + insertCoefficient(b, false, true)
    s1 += "x^2" + insertCoefficient(c, false, true) + "x" + insertCoefficient(d, false, true);
  } else if(e === 2) {
    for(i = 0; i < 4; i++) {
      n[i] =  getNumber(0, 10, 0.4);
    }
    s = "(" + n[0] + "x ";
    s += insertCoefficient(n[1], false, true) + ")(";

    s += n[2] + "x ";
    s += insertCoefficient(n[2], false, true) + ")^2";
    
    a = n[0] * n[0] * n[2];
    b = n[0] * n[0] * n[3] + 2 * n[0] * n[1] * n[2];
    c = n[1] * n[1] * n[2] + 2 * n[0] * n[1] * n[2]; 
    d = n[1] * n[1] * n[3];
    s1 = insertCoefficient(a, true, true) + "x^3" + insertCoefficient(b, false, true)
    s1 += "x^2" + insertCoefficient(c, false, true) + "x" + insertCoefficient(d, false, true);
  } else {
    for(i = 0; i < 6; i++) {
      n[i] =  getNumber(2, 10, 0.4);
    }
    s = "(" + n[0] + "x ";
    s += insertCoefficient(n[1], false, true) + ")(";

    s += insertCoefficient(n[2], true, true) + "x ";
    s += insertCoefficient(n[3], false, true) + ")(";
    
    s += insertCoefficient(n[4], true, true) + "x ";
    s += insertCoefficient(n[5], false, true) + ")";

    a = n[0] * n[2] * n[4];
    b = n[0] * n[2] * n[5] + n[0] * n[3] * n[4] + n[1] * n[2] * n[4];
    c = n[1] * n[3] * n[4] + n[0] * n[3] * n[5] + n[1] * n[2] * n[5]; 
    d = n[1] * n[3] * n[5];
    s1 = insertCoefficient(a, true, true) + "x^3" + insertCoefficient(b, false, true)
    s1 += "x^2" + insertCoefficient(c, false, true) + "x" + insertCoefficient(d, false, true);
  }
  
  s = "\\(" + s + "\\)";
  s1 = "\\(" + s1 + "\\)";
  
  obj = {"question": s, "answer": s1};
  return obj;
};
// ========================================================
getAlgebraicDivision = function() {
  var a, b, c, d, i, m = [], n = [], s, s1, obj = {};
  
  for(i = 0; i < 3; i++) {
    m[i] =  getNumber(1, 2, 0.4);
    n[i] =  getNumber(1, 8, 0.4);
  }
  
  a = m[0] * m[1] * m[2];
  b = m[0] * m[1] * n[2] + m[0] * n[1] * m[2] + n[0] * m[1] * m[2];
  c = n[0] * n[1] * m[2] + m[0] * n[1] * n[2] + n[0] * m[1] * n[2];
  d = n[0] * n[1] * n[2];
  
  s = insertCoefficient(a, true, false) + "x^3";
  s += insertCoefficient(b, false, false) + "x^2";
  s += insertCoefficient(c, false, false) + "x";
  s += insertCoefficient(d, false, true);
  
  s += "|" +   insertCoefficient(m[0], true, false) + "x";
  s += insertCoefficient(n[0], false, true);
    
  a = m[1] * m[2];
  b = m[1] * n[2] + n[1] * m[2];
  c = n[1] * m[2];

  s1 = insertCoefficient(a, true, false) + "x^2";
  s1 += insertCoefficient(b, false, false) + "x";
  s1 += insertCoefficient(c, false, true);
  
  s = "\\(" + s + "\\)";
  s1 = "\\(" + s1 + "\\)";

  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ========================================================
getCubic = function() {
  var a, b, c, d, i, m = [], n = [], s, s1, obj = {};
  
  m =  getRandomArray(3, 1, 3, 0.4);
  n =  getRandomArray(3, 1, 6, 0.4);
  
  a = m[0] * m[1] * m[2];
  b = m[0] * m[1] * n[2] + m[0] * n[1] * m[2] + n[0] * m[1] * m[2];
  c = n[0] * n[1] * m[2] + m[0] * n[1] * n[2] + n[0] * m[1] * n[2];
  d = n[0] * n[1] * n[2];
  
  s = insertCoefficient(a, true, false) + "x^3";
  s += insertCoefficient(b, false, false) + "x^2";
  s += insertCoefficient(c, false, false) + "x";
  s += insertCoefficient(d, false, true);
  
  s1 = "(" + insertCoefficient(m[0], true, false) + "x";
  s1 += insertCoefficient(n[0], false, true) + ")(";
  s1 += insertCoefficient(m[1], true, false) + "x";
  s1 += insertCoefficient(n[1], false, true) + ")(";
  s1 += insertCoefficient(m[2], true, false) + "x";
  s1 += insertCoefficient(n[2], false, true) + ")";

  s = "$ " + s + " $";

  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ==================================================================== 
getCubic1 = function() {
  var i, n = [], s, s1, obj = {};
  
  n =  getRandomArray(8, 1, 6, 0.4);
  
  s = "$ (" + insertCoefficient(n[0], true, false) + "x^3";
  s += insertCoefficient(n[1], false, false) + "x^2";
  s += insertCoefficient(n[2], false, false) + "x";
  s += insertCoefficient(n[3], false, true);

  if(Math.random() < 0.5) {
    s += ") + (" + insertCoefficient(n[4], true, false) + "x^3";
    s += insertCoefficient(n[5], false, false) + "x^2";
    s += insertCoefficient(n[6], false, false) + "x";
    s += insertCoefficient(n[7], false, true) + ") $";
  
    s1 = insertCoefficient((n[0] + n[4]), true, false) + "x^3";
    s1 += insertCoefficient((n[1] + n[5]), false, false) + "x^2";
    s1 += insertCoefficient((n[2] + n[6]), false, false) + "x";
    s1 += insertCoefficient((n[3] + n[7]), false, true);
  } else {
    s += ") - (" + insertCoefficient(n[4], true, false) + "x^3";
    s += insertCoefficient(n[5], false, false) + "x^2";
    s += insertCoefficient(n[6], false, false) + "x";
    s += insertCoefficient(n[7], false, true) + ") $";
  
    s1 = insertCoefficient((n[0] - n[4]), true, false) + "x^3";
    s1 += insertCoefficient((n[1] - n[5]), false, false) + "x^2";
    s1 += insertCoefficient((n[2] - n[6]), false, false) + "x";
    s1 += insertCoefficient((n[3] - n[7]), false, true);
  }

  s = "Simplify the expression " + s + " ordering the powers from the largest to the smallest.";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ==================================================================== 
getLinearEquation = function() {
  var i, n = [], s, s1, obj = {};
  
  n =  getRandomArray(3, 1, 6, 0.4);
  
  s = "$ " + insertCoefficient(n[0], true, false) + "x";
  s += insertCoefficient(n[2], false, true);
  s += " = " + insertCoefficient((n[0] * n[1] + n[2]), true, true) + " $";
  
  s1 = "x=" + n[1];

  s = "Solve the equation " + s;
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ==================================================================== 
getLinearEquation1 = function() {
  var i, n = [], s, s1, obj = {};
  
  n =  getRandomArray(9, 1, 6, 0.4);
  
  s = "$ " + insertCoefficient(n[0], true, false) + "(";
  s += insertCoefficient(n[1], true, false) + "x";
  s += insertCoefficient(n[2], false, true) + ")";
  s += insertCoefficient(n[3], false, false) + "(";
  s += insertCoefficient(n[4], true, false) + "x";
  s += insertCoefficient(n[5], false, true) + ")";
  s += " = " + insertCoefficient(n[6], true, false) + "(";
  s += insertCoefficient(n[7], true, false) + "x";
  s += insertCoefficient(n[8], false, true) + ") $";
  
  s1 = "x=" + (n[6]*n[8]-n[0]*n[2]-n[3]*n[5])/(n[0]*n[1]+n[3]*n[4]-n[6]*n[7]);

  s = "Evaluate " + s;
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ==================================================================== 
getLinearExpansion = function() {
  var i, n = [], s, s1, obj = {};
  
  n =  getRandomArray(4, 1, 6, 0.4);
  
  if(Math.random() < 0.5) {
    s = "$ (" + insertCoefficient(n[0], true, false) + "y";
    s += insertCoefficient(n[1], false, true);
    s += ")(" + insertCoefficient(n[2], true, false) + "y";
    s += insertCoefficient(n[3], false, true) + ") $";
  
    s1 = insertCoefficient((n[0]*n[2]), true, false) + "y^2";
    s1 += insertCoefficient((n[0]*n[3]+n[1]*n[2]), false, false) + "x";
    s1 += insertCoefficient((n[1]*n[3]), false, true);    
  } else {
    s = "$ (" + insertCoefficient(n[0], true, true);
    s += insertCoefficient(n[1], false, false) + "y)(";
    s += insertCoefficient(n[2], true, true);
    s += insertCoefficient(n[3], false, false) + "y) $";
  
    s1 = insertCoefficient((n[1]*n[3]), true, false) + "y^2";
    s1 += insertCoefficient((n[0]*n[3]+n[1]*n[2]), false, false) + "x";
    s1 += insertCoefficient((n[0]*n[2]), false, true);
  }

  s = "Expand and simplify " + s + " giving your answer in the standard form.";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ==================================================================== 
getQuadratic = function() {
  var i, n = [], s, s1, obj = {};
  
  n =  getRandomArray(4, 1, 6, 0.4);
  
  s = "$ " + insertCoefficient((n[0]*n[2]), true, false) + "x^2";
  s += insertCoefficient((n[0]*n[3]+n[1]*n[2]), false, false) + "x";
  s += insertCoefficient((n[1]*n[3]), false, true) + " = 0 $";
  
  s1 = "x=" + (-n[1]/n[0]) + " or "  + (-n[3]/n[2]);

  s = "Find the roots of " + s + ". Give your answer in the form x = value1 or value2.";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ====================================================================
getQuadratic1 = function() {
  var i, n = [], s, s1, obj = {}, x1, x2;
  
  n =  getRandomArray(4, 1, 6, 0.4);
  
  s = "$ y = " + insertCoefficient((n[0] * n[2]), true, false) + "x^2";
  s += insertCoefficient((n[0] * n[3] + n[1] * n[2]), false, false) + "x";
  s += insertCoefficient((n[1] * n[3]), false, true) + " $";
  
  s1 = "x=" + (-n[1]/n[0]) + " or "  + (-n[3]/n[2]);

  s = "Find the roots of the equation " + s + ". Give your answer in the form x = value1 or value2.";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ====================================================================
getQuadratic2 = function() {
  var i, n = [], s, s1, obj = {}, x1, x2;
  
  n =  getRandomArray(4, 1, 6, 0.4);
  
  s = "$ y = " + insertCoefficient((n[0] * n[2]), true, false) + "x^2";
  s += insertCoefficient((n[0] * n[3] + n[1] * n[2]), false, false) + "x";
  s += insertCoefficient((n[1] * n[3]), false, true) + " $";
  
  s1 = "y=" + (n[1] * n[3]);

  s = "Find the y intercept of the equation " + s + ". Give your answer in the form y = value.";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ====================================================================
getQuadratic3 = function() {
  var i, n = [], s, s1, obj = {}, x, y;
  
  n =  getRandomArray(3, 1, 6, 0.4);
  
  s = "$ y = " + insertCoefficient(n[0], true, false) + "x^2";
  s += insertCoefficient(n[1], false, false) + "x";
  s += insertCoefficient(n[2], false, true) + " $";

  x = -n[1] / (2*n[0]);
  y = (n[0]*x+n[1])*x+n[2]
  
  s1 = "(" + x + ", " + y + ")";

  s = "Find the coordinates of the turning point of the equation " + s;
  s += ". Give your answer in the form (x, y).";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ====================================================================
getSimultaneousEqns = function() {
  var i, n = [], s, s1, obj = {}, x, y;
  
  n =  getRandomArray(6, 1, 8, 0.4);
  
  s = "<br /> $ " + insertCoefficient(n[0], true, false) + "x";
  s += insertCoefficient(n[1], false, false) + "y = ";
  s += insertCoefficient(n[2], true, true) + "$ <br />";
  s += "$ " + insertCoefficient(n[3], true, false) + "x";
  s += insertCoefficient(n[4], false, false) + "y = ";
  s += insertCoefficient(n[5], true, true) + "$ <br />";
  
  x = n[1]*n[3] - n[0]*n[4];
  if(x !== 0) {
    x = (n[1]*n[5]-n[2]*n[4]) / x;  
    y = (n[2] - n[0] * x) / n[1];
    s1 = "x=" + x + ", y="  + y;
  } else {
    s1 = "There is no point of intersection.";
  }

  s = "Solve the simultaneous equations " + s + "Give your answer in the form x = value1, y = value2.";
  obj = {"question": s, "answer": s1};
  return obj;
  
}; 
// ==================================================================== 
getLine = function() {
  var i, n = [], s, s1, obj = {};
  
  n =  getRandomArray(4, 1, 6, 0.4);
  
  s = "$ (" + insertCoefficient(n[0], true, true) + ", ";
  s += insertCoefficient(n[1], false, true) + ") $ and $ (";
  s += insertCoefficient(n[2], true, true) + ", ";
  s += insertCoefficient(n[3], false, true) + ") $";
  
  s1 = "x=" + (-n[1]/n[0]) + " or "  + (-n[3]/n[2]);

  s = "Find the equation of the line connecting the points " + s;
  s += ". Give your answer in the form y = mx + c.";
  obj = {"question": s, "answer": s1};
  return obj;
  
};
// ==================================================================== 
// Fisher-Yates Shuffle see http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
// ==================================================================== 
getCommonFactor = function(inN1, inN2) {
  var arr1 = [], arr2 = [], i, j, f = 1;

  arr1 = factorise(inN1);
  arr2 = factorise(inN2);

  for(i = 0; i < arr1.length; i++) {
    for(j = 0; j < arr2.length; j++) {
      if(arr1[i] === arr2[j]) {
        f *= arr1[i];
        arr1[i] = 1;
        arr2[j] = 1;
      }
    }
  }

  if((inN1 < 0) && (inN2 < 0)) { f = -f; }
  return f;
}
// ==================================================================== 
simplify = function(inObj) {
  var arr1 = [], arr2 = [], i, j, sign = 1;

  if(inObj["denominator"] == 0) {
    inObj["numerator"] = 0;
    return inObj;
  }

  if(inObj["numerator"] < 0) {
    sign = -1;
    inObj["numerator"] = -inObj["numerator"];
  }

  if(inObj["denominator"] < 0) {
    sign = -sign;
    inObj["denominator"] = -inObj["denominator"];
  }

  arr1 = factorise(inObj["numerator"]);
  arr2 = factorise(inObj["denominator"]);

  for(i = 0; i < arr1.length; i++) {
    for(j = 0; j < arr2.length; j++) {
      if(arr1[i] === arr2[j]) {
        arr1[i] = 1;
        arr2[j] = 1;
      }
    }
  }

  inObj["numerator"] = sign;
  for(i = 0; i < arr1.length; i++) {
    inObj["numerator"] *= arr1[i];
  }

  inObj["denominator"] = 1;
  for(i = 0; i < arr2.length; i++) {
    inObj["denominator"] *= arr2[i];
  }
  return inObj;
};
// ==================================================================== 
factorise = function(inNum) {
  var arr = [], i = 0;
  var p = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  if(inNum == 0) {
    arr[0] = 0;
  } else {
    inNum = Math.abs(inNum);
    while(inNum > 1) {
      if(inNum % p[i] < 1) {
        arr.push(p[i]);
        inNum /= p[i];
      } else {
        i++;
        if(i >= p.length) {
          arr.push(inNum);
          inNum = 1;
        }
      }
    }
  }

  return arr;
};
// ==================================================================== 
function removeAllSpaces(inStr) {
  inStr = inStr.replace(/\s+|\s+$/g, "");  // Remove leading and trailing spaces and double spaces
  return inStr;
}
// ================================================================================
function logObject(inObj) {

  var property, s = "";

  for (property in inObj) {
    s += property + ':' + inObj[property]+'; ';
  }
  console.log("Object = " + s);
}
// ================================================================================
getFractionQuestion = function(inOp) {
  var n = [], s, s1, o = {}, obj = {};

  n =  getRandomPrimes(5, 1, 11, 0.4);
  
  s = "$  \\frac{" + insertCoefficient(n[0], true, true) + "}{";
  s += insertCoefficient((n[1] * n[2]), true, true) + "} "; 
  if(inOp === 0 ) {
    s += " + \\frac{" + insertCoefficient(n[3], true, true) + "}{";
    s += insertCoefficient((n[4] * n[2]), true, true) + "} $";
    o = {"numerator": (n[0] * n[4] + n[1] * n[3]), "denominator": (n[1] * n[2] * n[4])};
  } else if(inOp === 1) {
    s += " - \\frac{" + insertCoefficient(n[3], true, true) + "}{";    
    s += insertCoefficient((n[4] * n[2]), true, true) + "} $";
    o = {"numerator": (n[0] * n[4] - n[1] * n[3]), "denominator": (n[1] * n[2] * n[4])};
  } else if(inOp === 2) {
    s += " \\times \\frac{" + insertCoefficient((n[2] * n[3]), true, true) + "}{";    
    s += insertCoefficient(n[4], true, true) + "} $";
    o = {"numerator": (n[0] * n[2] * n[3]), "denominator": (n[1] * n[2] * n[4])};
  } else if(inOp === 3) {
    s += " \\div \\frac{" + insertCoefficient(n[3], true, true) + "}{";    
    s += insertCoefficient((n[2] * n[4]), true, true) + "} $";
    o = {"numerator": (n[0] * n[4]), "denominator": (n[1] * n[3])};
  }

//  console.log("before: " + o["numerator"] + ", " + o["denominator"]);
  simplify(o);
//  console.log("after: " + o["numerator"] + ", " + o["denominator"]);
  s1 = o["numerator"] + "/" + o["denominator"];

  s = "Simplify the following " + s;
  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getConvertQuestion = function(inOp) {
  var a, n = [], s, s1, obj = {};

  n =  getRandomArray(2, 5, 40, 0.4);
  
  s = "$ \\frac{" + insertCoefficient(n[0], true, true) + "}{";
  s += insertCoefficient(n[1], true, true) + "} $"; 

  a = n[0] / n[1];
  s1 = a.toFixed(2);

  s = "Convert " + s + " into a decimal.";
  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPercentageQuestion1 = function() {
  var a, b, c, s, s1, obj = {};

  a = getNumber(12, 95, 0);
  b = getNumber(110, 500, 0);

  s = "What is " + a + "% of " + b + ".";

  a = a * b / 100;
  s1 = a.toFixed(2);

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPercentageQuestion2 = function() {
  var a, b, i, s, s1, obj = {};

  a = getNumber(5, 15, 0);
  b = getNumber(10, 20, 0);

  s = "Convert $ \\frac{" + a + "} {" + b + "} $ to a percentage.";

  a = (a * 100) / b;
  s1 = a.toFixed(2) + "%";

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPercentageQuestion3 = function() {
  var a, s, s1, obj = {};

  a = Math.random();

  s = "Give " + a.toFixed(3) + " as a percentage.";
  s1 = (a * 100).toFixed(1) + "%";

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPercentageQuestion4 = function() {
  var a, i, s, s1, o = {}, obj = {};

  a = Math.random() * 100;

  s = "Convert " + a.toFixed(1) + "% into a fraction. Give your answer in the form a/b as above.";
  o = {"numerator": parseInt(a * 10), "denominator": 1000};
  simplify(o);

  s1 = o["numerator"] + "/" + o["denominator"];

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPercentageQuestion5 = function() {
  var a, i, s, s1, obj = {};

  a = Math.random() * 100;

  s = "Convert " + a.toFixed(1) + "% into a decimal.";
  s1 = (a / 100).toFixed(2);

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getRootsQuestion = function() {
  var a, n = [], s, s1, obj = {};

  n =  getRandomArray(10, 3, 10, 0);
  a = n[0] * n[0] * n[1];

  s = "Simplify $ \\sqrt{" + a.toFixed(0) + "} $ to the form $ a\\sqrt{b} $. ";
  s += "Give your answer like this <strong>a.sqrt(b)</strong>."
  s1 = n[0] + ".sqrt(" + n[1] + ")";

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPartialFraction = function() {
  var a, n = [], s, s1, obj = {};

  n =  getRandomArray(6, 2, 6, 0);

  s = "Separate into partial fractions $ \\frac{" + insertCoefficient((n[0]*n[4]+n[1]*n[3]), true, false);
  s += "x" + insertCoefficient((n[0]*n[5]+n[2]*n[3]), false, true) + "}{";
  s += insertCoefficient((n[1]*n[4]), true, false) + "x^2";
  s += insertCoefficient((n[1]*n[5]+n[2]*n[4]), false, false) + "x";
  s += insertCoefficient((n[2]*n[5]), false, true) + "} $";

  s1 = n[0] + "/(" + insertCoefficient(n[1], false, true) + "x" + insertCoefficient(n[2], false, true);
  s1 += ") + " + insertCoefficient(n[3], false, true);
  s1 += "/(" + n[4] + "x" + insertCoefficient(n[5], false, true) + ")";

  obj = {"question": s, "answer": s1};
  return obj; 
};
// ==================================================================== 
getPolynomialDifferentiation = function(inOrder) {
  var i, j, n = [], s = "", s1 = "", s2, obj = {};

  n =  getRandomArray((inOrder + 1), 0, 6, 0.5);

  i = 0;  j = inOrder;
  while(j > 0) {
    if(n[i]) { 
      if(s) {
        s += insertCoefficient(n[i], false, false) + insertNumericalExponent("x", j, ""); 
      } else {
        s = insertCoefficient(n[i], true, false) + insertNumericalExponent("x", j, ""); 
      }
    }
    j--;  i++;
  }
  if(n[inOrder]) { 
    s += insertCoefficient(n[inOrder], false, true); 
  } 
  s = "Differentiate the following expression with respect to x:<br /> $ y = " + s + " $";

  i = 0;  j = inOrder;
  while(j > 1) {
    if(n[i]) { 
      if(s1) {
        s1 += insertCoefficient(j*n[i], false, false) + insertNumericalExponent("x", j - 1, ""); 
      } else {
        s1 = insertCoefficient(j*n[i], true, false) + insertNumericalExponent("x", j - 1, ""); 
      }
    }
    j--;  i++;
  }
  if(n[inOrder - 1]) { 
    s1 += insertCoefficient(n[inOrder - 1], false, true); 
  } 
  s1 = removeAllSpaces(s1);

  // type 1: containing string, type 2: exact string, type 10 approx number, type 11 exact number 
  s2 = "2";

  obj = {"qid":"0","q": s, "a": s1, "t": s2};
  return obj; 
};
// ================================================================================
// ax^b sin(cx-d) or ax^b cos(cx-d)
getProductDifferentiation1 = function(inOrder) {
  var n = [], s = "", s1 = "", s2, obj = {};

  n =  getRandomArray(4, 2, 8, 0.4);
  n[1] =Math.abs(n[1]); // The x exponent needs to be +ive

  if(Math.random() > 0.5) {
    s = insertCoefficient(n[0], true, false) + insertNumericalExponent("x", n[1], ""); 
    s += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, false) + ")";
    s = "Differentiate the following expression with respect to x:<br /> $ y = " + s + " $";

    s1 = insertCoefficient(n[0]*n[1], true, false) + insertNumericalExponent("x", n[1] - 1, "");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient(n[0]*n[2], false, false) + insertNumericalExponent("x", n[1], "");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";

    s1 += "(or)" + insertCoefficient(n[0]*n[1], true, false) + insertNumericalExponent("x", n[1] - 1, "(");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient(n[0]*n[2], false, false) + insertNumericalExponent("x", n[1], "(");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";

    s1 += "(or)" + insertCoefficient(n[0]*n[2], true, false) + insertNumericalExponent("x", n[1], "");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient(n[0]*n[1], false, false) + insertNumericalExponent("x", n[1] - 1, "");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";

    s1 += "(or)" + insertCoefficient(n[0]*n[2], true, false) + insertNumericalExponent("x", n[1], "(");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient(n[0]*n[1], false, false) + insertNumericalExponent("x", n[1] - 1, "(");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
  } else {
    s = insertCoefficient(n[0], true, false) + insertNumericalExponent("x", n[1], ""); 
    s += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, false) + ")";
    s = "Differentiate the following expression with respect to x:<br /> $ y = " + s + " $";

    s1 = insertCoefficient(n[0]*n[1], true, false) + insertNumericalExponent("x", n[1] - 1, "");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient(-n[0]*n[2], false, false) + insertNumericalExponent("x", n[1], "");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";

    s1 += "(or)" + insertCoefficient(n[0]*n[1], true, false) + insertNumericalExponent("x", n[1] - 1, "(");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient(-n[0]*n[2], false, false) + insertNumericalExponent("x", n[1], "(");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";

    s1 += "(or)" + insertCoefficient(-n[0]*n[2], true, false) + insertNumericalExponent("x", n[1], "");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient(n[0]*n[1], false, false) + insertNumericalExponent("x", n[1] - 1, "");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";

    s1 += "(or)" + insertCoefficient(-n[0]*n[2], true, false) + insertNumericalExponent("x", n[1], "(");
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient(n[0]*n[1], false, false) + insertNumericalExponent("x", n[1] - 1, "(");
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
  }
  s1 = removeAllSpaces(s1);    

  // type 1: containing string, type 2: exact string, type 10 approx number, type 11 exact number 
  s2 = "2";

  obj = {"qid":"0","q": s, "a": s1, "t": s2};
  return obj; 

};
// ================================================================================
// ae^bx sin(cx-d) or ae^bx cos(cx-d)
getProductDifferentiation2 = function(inOrder) {
  var f, n = [], s = "", s1 = "", s2, obj = {};

  n =  getRandomArray(4, 2, 8, 0.4);
  n[1] =Math.abs(n[1]); // The x exponent needs to be +ive

  if(Math.random() > 0.5) {
    // sine question
    s = insertCoefficient(n[0], true, false) + "e^{" + n[1] + "x}";   
    s += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, false) + ")";
    s = "Differentiate the following expression with respect to x:<br /> $ y = " + s + " $";

    f = getCommonFactor(n[1], n[2]);
    console.log("f = " + f);
    s1 = insertCoefficient(n[0]*f, true, false) +  "e^(" + n[1] + "x)(";
    s1 += insertCoefficient((n[1] / f), true, false) + "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient((n[2] / f), false, false) + "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +"))";

    s1 += "(or)" + insertCoefficient(n[0]*f, true, false) +  "e^(" + n[1] + "x)(";
    s1 += insertCoefficient((n[2] / f), true, false) + "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient((n[1] / f), false, false) + "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";

    s1 += "(or)" + insertCoefficient(n[0] * n[1], true, false) +  "e^(" + n[1] + "x)";
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient(n[0] * n[2], false, false) +  "e^(" + n[1] + "x)";    
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";

    s1 += "(or)" + insertCoefficient(n[0] * n[2], true, false) +  "e^(" + n[1] + "x)";    
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient(n[0] * n[1], false, false) +  "e^(" + n[1] + "x)";
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";

  } else {
    // cosine question
    s = insertCoefficient(n[0], true, false) + "e^{" + n[1] + "x}"; 
    s += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, false) + ")";
    s = "Differentiate the following expression with respect to x:<br /> $ y = " + s + " $";

    f = getCommonFactor(n[1], n[2]);
    console.log("f = " + f);
    s1 = insertCoefficient(n[0]*f, true, false) +  "e^(" + n[1] + "x)(";
    s1 += insertCoefficient((n[1] / f), true, false) + "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient((-n[2]/f), false, false) + "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +"))";

    s1 += "(or)" + insertCoefficient(n[0]*f, true, false) +  "e^(" + n[1] + "x)(";
    s1 += insertCoefficient((-n[2]/f), true, false) + "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient((n[1] / f), false, false) + "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + "))";

    s1 += "(or)" + insertCoefficient(-n[0]*n[2], true, false) +  "e^(" + n[1] + "x)";
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
    s1 += insertCoefficient(n[0]*n[1], false, false) +  "e^(" + n[1] + "x)";
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";

    s1 += "(or)" + insertCoefficient(n[0]*n[1], true, false) +  "e^(" + n[1] + "x)";
    s1 += "cos(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) + ")";
    s1 += insertCoefficient(-n[0]*n[2], false, false) +  "e^(" + n[1] + "x)";
    s1 += "sin(" + insertCoefficient(n[2], true, false) + "x" + insertCoefficient(n[3], false, true) +")";
  }
  s1 = removeAllSpaces(s1);    

  // type 1: containing string, type 2: exact string, type 10 approx number, type 11 exact number 
  s2 = "2";

  obj = {"qid":"0","q": s, "a": s1, "t": s2};
  return obj; 

};
// ================================================================================
getIntegrationByPartialFractions = function() {
  var a, b, f, n = [], s = "", s1 = "", s2, obj = {};

  n = getRandomArray(6, 1, 3, 0.4);
  
  a = n[0] * n[4] + n[1] * n[3];
  b = n[0] * n[5] + n[2] * n[3];
  s = " \\int {\\frac{" + insertCoefficient(a, true, false) + "x";
  s += insertCoefficient(b, false, true) + "}{";

  a = n[1] * n[4];
  b = n[1] * n[5] + n[2] * n[4];
  s += insertCoefficient(a, true, false) + "x^2";
  s += insertCoefficient(b, false, false) + "x";
  a = n[2] * n[5];
  s += insertCoefficient(a, false, true) + "}dx}";

  s = "Integrate the following expression with respect to x:<br /> $ I = " + s + " $";

  var o1 = {"numerator": n[0], "denominator": n[1]};
  var o2 = {"numerator": n[3], "denominator": n[4]};
  console.log("1 before: " + o1["numerator"] + ", " + o1["denominator"]);
  console.log("2 before: " + o2["numerator"] + ", " + o2["denominator"]);
  simplify(o1);
  simplify(o2);
  console.log("1 after: " + o1["numerator"] + ", " + o1["denominator"]);
  console.log("2 after: " + o2["numerator"] + ", " + o2["denominator"]);

  if(o1["denominator"] == 1) {
    s1 = insertCoefficient(o1["numerator"], true, false) +  "ln(" + insertCoefficient(n[1], true, false);
    s1 += "x" + insertCoefficient(n[2], false, true) + ")";
  } else {
    s1 = insertCoefficient(o1["numerator"], true, false) +  "ln(" + insertCoefficient(n[1], true, false);
    s1 += "x" +insertCoefficient(n[2], false, true) + ")/" + insertCoefficient(o1["denominator"], true, true);
  }
  if(o2["denominator"] == 1) {
    s1 += insertCoefficient(o2["numerator"], false, false) + "ln(" + insertCoefficient(n[4], true, false);
    s1 += "x" + insertCoefficient(n[5], false, true) + ")";
  } else {
    s1 += insertCoefficient(o2["numerator"], false, false) + "ln(" + insertCoefficient(n[4], true, false);
    s1 += "x" + insertCoefficient(n[5], false, true) + ")/" + insertCoefficient(o2["denominator"], true, true);
  }

  if(o2["denominator"] == 1) {
    s2 = insertCoefficient(o2["numerator"], true, false) + "ln(" + insertCoefficient(n[4], true, false);
    s2 += "x" + insertCoefficient(n[5], false, true) + ")";
  } else {
    s2 = insertCoefficient(o2["numerator"], true, false) + "ln(" + insertCoefficient(n[4], true, false);
    s2 += "x" + insertCoefficient(n[5], false, true) + ")/" + insertCoefficient(o2["denominator"], true, true);
  }
  if(o1["denominator"] == 1) {
    s2 += insertCoefficient(o1["numerator"], false, false) + "ln(" + insertCoefficient(n[4], true, false);
    s2 += "x" + insertCoefficient(n[5], false, true) + ")";
  } else {
    s2 += insertCoefficient(o1["numerator"], false, false) + "ln(" + insertCoefficient(n[4], true, false);
    s2 += "x" + insertCoefficient(n[5], false, true) + ")/" + insertCoefficient(o1["denominator"], true, true);
  }
  s1 = s1 + "+C(or)" + s2 + "+C";
  s1 = removeAllSpaces(s1);    

  // type 1: containing string, type 2: exact string, type 10 approx number, type 11 exact number 
  s2 = "2";

  obj = {"qid":"0","q": s, "a": s1, "t": s2};
  return obj; 

}

// qid:0; q:Integrate the following expression with respect to x:<br />
// $ I =  \int {\frac{-5x + 6}{-3x^2 + 10x - 8}dx} $;
// a:ln(-3x+4)/-3+2ln(+x-2)+C; t:2; 
// ================================================================================
// if m < 0.25 I= int(ax^b sin(cx)) or if m < 0.5 I= int(ax^b cos(cx))
// if m < 0.75 I= int(ae^bx sin(cx)) or if m < 1 I= int(ae^bx cos(cx))
getIntegrationByParts = function() {
  var a, b, c, m, s = "", s1 = "", s2, obj = {};

  m = Math.random(); // Gives a number between 0 and 1
  a = Math.floor((Math.random() * 4) + 1);  // Gives 1, 2, 3 or 4
  b = Math.floor((Math.random() * 2) + 1);  // Gives 1 or 2
  c = Math.floor((Math.random() * 4) + 1);  // Gives 1, 2, 3 or 4

  m = 0.2;
  if(m < 0.25) {
    s = "\\int " + insertCoefficient(a, true, false);
    if(b == 1) {
      s += "xsin(" + insertCoefficient(c, true, false) + "x)dx"; 
    } else {
      s += "x^" + insertCoefficient(b, true, true);
      s += " sin(" + insertCoefficient(c, true, false) + "x)dx"; 
    }
  } else if(m < 0.5) {
    s = "\\int " + insertCoefficient(a, true, false);
    if(b == 1) {
      s += "xcos(" + insertCoefficient(c, true, false) + "x)dx"; 
    } else {
      s += "x^" + insertCoefficient(b, true, false);
      s += " cos(" + insertCoefficient(c, true, false) + "x)dx"; 
    }
  } else if(m < 0.75) {
    s = "\\int " + insertCoefficient(a, true, false);
    s += "e^{" + insertCoefficient(b, true, true);
    s += "x} sin(" + insertCoefficient(c, true, false) + "x)dx"; 
  } else {
    s = "\\int " + insertCoefficient(a, true, false);
    s += "e^{" + insertCoefficient(b, true, true);
    s += "x} cos(" + insertCoefficient(c, true, false) + "x)dx"; 
  }

  s = "Integrate the following expression with respect to x:<br /> $ I = " + s + " $";

  var o = {"numerator": a, "denominator": c};
  console.log("before: " + o["numerator"] + ", " + o["denominator"]);
  simplify(o);
  console.log("after: " + o["numerator"] + ", " + o["denominator"]);

  if(m < 0.25) {
    if(b == 1) {
      if(c == 1) {
        if(o["numerator"] == 1) {
          s1 = "sin(x)-xcos(x)+C";
        } else {
          s1 = insertCoefficient(o["numerator"], true, false) + "(sin(x)-xcos(x))+C";          
          s1 += "(or)" + insertCoefficient(o["numerator"], true, false) + "sin(x)";
          s1 += insertCoefficient(-o["numerator"], false, false) + "xcos(x))+C";          
        }
      } else {
//        if(o["numerator"] == 1) {
          s1 = insertCoefficient(o["numerator"], true, false) + "(sin(";
          s1 += insertCoefficient(c, true, false) + "x)/" + insertCoefficient(c, true, false);
          s1 += "-xcos(" + insertCoefficient(c, true, false) + "x))";
          if(o["denominator"] == 1) {
            s1 += "+C";
          } else {
            s1 += "/" + insertCoefficient(o["denominator"], true, true) + "+C";
          }
//        }
      }
    } else {
      if(c == 1) {
        s1 = insertCoefficient(o["numerator"], true, false) + "(x^2cos(x)-2xsin(x)-2cos(x))+C";
      } else {
        s1 = insertCoefficient(o["numerator"], true, false) + "(x^2cos(";
        s1 += insertCoefficient(c, true, false) + "x)-2xsin(" + insertCoefficient(c, true, false);
        s1 += "x)/" + insertCoefficient(c, true, false) + "-2cos(" + insertCoefficient(c, true, false);
        s1 += "x)/" + insertCoefficient((c * c), true, true) + ")+C";
      }
    }
  } else if(m < 0.5) {
    s1 = "answer 2";
  } else if(m < 0.75) {
    s1 = "answer 3";
  } else {
    s1 = "answer 4";   
  }
  s1 = removeAllSpaces(s1);    

  // type 1: containing string, type 2: exact string, type 10 approx number, type 11 exact number 
  s2 = "2";

  obj = {"qid":"0","q": s, "a": s1, "t": s2};
  return obj; 

}
// ================================================================================
function formatJSONTutorialQuestion(index, inQ) {
  var i, r = 1, row = 1, s = "", s1;
  var iw; // input width
  var tut = $("#tnum").html();
console.log(index + ", " + inQ);
  // Replace any special characters
/*  for(i = 0; i < qa.length; i++) {
    qa[i] = qa[i].split("{bar").join("|");
   */

//  console.log("R: " + index + ": " + inQ.rubric + ", " + inQ.QID);
  s = '<tr><td valign="top">' + (parseInt(index+1)) + '.&nbsp;&nbsp;</td>';  // Number column
  s += '<td>' + inQ.rubric + '</td>';   
  s += '<td>&nbsp;</td></tr>'; // Tick column
//  s += '<tr><td colspan="3">&nbsp;</td></tr>'; // blank line

//  console.log("qParts len = " + inQ.qParts.length);

  $.each(inQ.qParts, function(subindex, subpart) {
    console.log(subpart.part);
    if(inQ.qParts.length > 1) {
      s += '<tr><td>&nbsp;</td><td>' + String.fromCharCode(97 + subindex) + '. ';
    } else {
      s += '<tr><td>&nbsp;</td><td>'; // Only 1 part so don't want a. b. etc
    }

    // The subpart.part.question may be blank in which case don't insert empty line
    if(subpart.part.question) {
      s += subpart.part.question + '</td></tr><tr><td>&nbsp;</td><td>';
    }

    $.each(subpart.part.element, function(subsubindex, subsubpart) {
      iw = 0; // default input width
      if(subsubpart.width) { iw = subsubpart.width; }

      if(subsubpart.pos) {
        r = parseInt(subsubpart.pos.charAt(0));
        if(r != row) {
          s += "</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>";
          row = r;
        }
      }
      
      s += '<div class="col-xs-4">';  // Bootstrap width

//      console.log("num subsubparts = " + subpart.part.element.length);
      console.log(subsubindex + ". subsubpart.pos = " + subsubpart.pos + ", " + subsubpart.label);
      if(subsubindex == 0) { s += "i. "; }
      else if(subsubindex == 1) { s += "ii. "; }
      else if(subsubindex == 2) { s += "iii. "; }
      else if(subsubindex == 3) { s += "iv. "; }
      else if(subsubindex == 4) { s += "v. "; }
      else if(subsubindex == 5) { s += "vi. "; }
      else if(subsubindex == 6) { s += "vii. "; }
      else if(subsubindex == 7) { s += "viii. "; }
      else if(subsubindex == 8) { s += "ix. "; }
      else if(subsubindex == 9) { s += "x. "; }

      s += subsubpart.label + '&nbsp;';
      s1 = 'Pr' + inQ.QID + "_P" + subindex + "_S" + subsubindex + "_C" + qcount;
      //TQPS: Tutorial, question, part, subpart followed by qcount
//      s1 = 'T' + tut + '_Q' + inQ.QID + "_P" + subindex + "_S" + subsubindex + "_C" + qcount;
//      console.log("s1 = " + s1);

      if(qcount < 1) {
        if(iw > 0) {
          s += '<input type="text" width="' + iw;
          s += '" name="' + s1 + '" id="' + s1 + '" class="form-control" autofocus >';
        } else if(iw < 0) {
          if(iw == -10) {
            s += '<textarea style="display: none;" id="' + s1 + '" autofocus ></textarea>';
            s += 'Draw your diagram on paper then compare it with the diagram in <b>My Progress</b>.';
          } else {
            s += '<br /><textarea name="' + s1 + '" id="' + s1 + '" autofocus ></textarea>';            
          }
        } else {
          s += '<input type="text" name="' + s1 + '" id="' + s1 + '" class="form-control" autofocus >';          
        }
      } else {
        if(iw > 0) {
          s += '<input type="text" width="' + iw;
          s += '" name="' + s1 + '" id="' + s1 + '" class="form-control" >';
        } else if(iw < 0) {
          if(iw == -10) {
            s += '<textarea style="display: none;" id="' + s1 + '" ></textarea>';
            s += 'Draw your diagram on paper then compare it with the diagram in <b>My Progress</b>.';
          } else {
            s += '<br /><textarea name="' + s1 + '" id="' + s1 + '" cols="50"></textarea>';           
          }
        } else {
          s += '<input type="text" name="' + s1 + '" id="' + s1 + '" class="form-control" >';          
        }
      }
/*      if(subpart.part.element.length > 1) {
        s += '</div>';
      } */
      s += '</div>&nbsp;&nbsp;';
      qcount++;
    });
//    s += '</td><td style="display:none;"><div id="qid' + qcount + '">' + inQ.QN + '</div>';
//    s += '</td><td><div id="tick' + qcount + '">&nbsp;</div></td>';  // For the tick or cross
    s += '</td><td>&nbsp;</td>';  // For the tick or cross
    s += '</tr><tr><td colspan="3">&nbsp;</td></tr>'; // blank line
  });  
//console.log(s);
  return s;
}
// ================================================================================
// http://www.derivative-calculator.net/