class Accumulator {
  constructor () {
    this.clear();
  }

  clear () {
    this.state = 0;
  }

  add (value) {
    const number = parseInt(value);
    this.state += number;
  }

  value () {
    return this.state;
  }
}

export { Accumulator };
