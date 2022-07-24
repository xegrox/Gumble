import { Date as sDate } from 'sugar'

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
const lt = (a: any, b: any) => a < b
const lte = (a: any, b: any) => a <= b
const mt = (a: any, b: any) => a > b
const mte = (a: any, b: any) => a >= b
const ne = (a: any, b: any) => a != b
const elapsedMin = (a: Date) => Math.floor(((new Date()).getTime() - a.getTime()) / 60000)
const assign = (name: string, value: any, opts: any) => opts.data.root[name] = value
const relDate = (date_str: string) => new sDate(date_str).relative()
const shortDate = (date_str: string) => new sDate(date_str).short()

export default { times, defaultVal, arr, inc, eq, lt, lte, mt, mte, ne, elapsedMin, assign, relDate, shortDate }