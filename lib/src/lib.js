class Accumulator {
  constructor () {
    this.clear();
  }

  clear () {
    this.state = 0;
  }

  add (value) {
    const number = parseInt(value);

    if (isNaN(number)) throw new TypeError('The value passed to add method is not a number');

    this.state += number;
  }

  value () {
    return this.state;
  }
}

export { Accumulator };
