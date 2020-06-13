import './styles.css';
import { Accumulator } from '__lib/';

const acc = new Accumulator();

const btnAdd = document.getElementById('btn-add');
const btnClear = document.getElementById('btn-clear');
const inputAdd = document.getElementById('input-add');
const log = document.getElementById('log');

const addLog = msg => {
  const p = document.createElement('p');
  p.innerText = msg;
  log.appendChild(p);
};

btnAdd.onclick = () => {
  const val = inputAdd.value;
  acc.add(val);
  addLog(`added ${val} accumulating ${acc.value()}`);
};

btnClear.onclick = () => {
  acc.clear();
  log.innerHTML = '';
  addLog(`acc returned to ${acc.value()}`);
};
