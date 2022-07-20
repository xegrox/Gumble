const times = function(n: number, block: any) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
};

const defaultVal = (value: any, defaultVal: any) => value || defaultVal;
const arr = (...objs: any[]) => objs.slice(0, -1);
const inc = (value: any) => parseInt(value) + 1;
const eq = (a: any, b: any) => a == b;

export default { times, defaultVal, arr, inc, eq }