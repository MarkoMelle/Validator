export default function luhnAlgorithmValidation(value) {
  let sum = 0;
  if (value.length % 2 === 0) {
    for (let i = 0; i < value.length; i += 2) {
      if (value[i] * 2 > 9) {
        sum += value[i] * 2 - 9;
      } else {
        sum += value[i] * 2;
      }
      sum += value[i + 1];
    }
    if (sum % 10 === 0) {
      return true;
    }
    return false;
  }
  for (let i = 1; i < value.length; i += 2) {
    if (value[i] * 2 > 9) {
      sum += value[i] * 2 - 9;
    } else {
      sum += value[i] * 2;
    }
    sum += value[i - 1];
  }
  sum += value[value.length - 1];
  if (sum % 10 === 0) {
    return true;
  }
  return false;
}
