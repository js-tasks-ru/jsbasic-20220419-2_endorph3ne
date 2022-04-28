let calculator = {
  firstArg: 0,
  secondArg: 0,

  read(a, b) {
    this.firstArg = a;
    this.secondArg = b;
  },
  mul() {
    return this.firstArg * this.secondArg;
  },
  sum() {
    return this.firstArg + this.secondArg;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
