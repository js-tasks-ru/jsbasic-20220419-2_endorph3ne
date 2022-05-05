function getMinMax(str) {
  let arr = str.split(' ');
  let numberArr = arr.filter(x => +x);

  let result = {
    min: Math.min(...numberArr),
    max: Math.max(...numberArr),
  };

  return result;
}
