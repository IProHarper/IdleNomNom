const map = ["", "K", "M", "B", "T", "Quad", "Quint", "Sext", "Sept", "Oct", "Nov", "Dec"];

const formatNumber = (number) => {
  if (number < 1000) return number.toString();

  let log = Math.log10(number);
  let div = log - log % 3;
  let index = div / 3;
  while (index >= map.length) {
    // ran out of map elements
    index -= 1;
    div -= 3;
  }
  
  return (number / Math.pow(10, div)).toPrecision(6) + " " + map[index];
};