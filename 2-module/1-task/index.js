function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    if (isNaN(salaries[key]) || !isFinite(salaries[key])) {
      continue;
    }

    if (typeof salaries[key] === 'number') {
      sum += salaries[key];
    }
  }

  return sum;
}
