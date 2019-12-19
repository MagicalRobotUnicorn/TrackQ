import { isNumber } from "util";

function assertThrow(func, x, y){
  var threw = false;


}
function assertThrows(func, x, y) {

  try {
    func();
  } catch (err) {
    console.log(err);
  }

  return returnVar;
}



function multiply(one, two) {

  if (isNumber(one) && isNumber(two)) {
    return (Number(one) * Number(two));
  }
  else {
    throw "Both variables must be numbers.";
  }
}

