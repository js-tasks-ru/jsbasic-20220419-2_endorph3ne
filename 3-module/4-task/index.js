function showSalary(users, age) {
  let result = "";

  for (let current of users) {
    if (current.age <= age)
      result += `${current.name}, ${current.balance}\n`;
  }

  return result.slice(0, result.length - 1);
}
