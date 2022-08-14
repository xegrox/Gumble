import { Bimap } from 'simple-bimap'
import { promisify } from 'util'
import { randomBytes } from 'crypto'

let table_uids = new Bimap<string, string>()
export const getTableNo = (table_uid: string) => table_uids.getByValue(table_uid)
export const clearTableNo = (table_no: string) => table_uids.delete(table_no)
export const hasTableUid = (table_no: string) => table_uids.hasValue(table_no)
export const getTableUid = async (table_no: string) => {
  if (!table_uids.has(table_no)) {
    let uid = (await promisify(randomBytes)(8)).toString('base64')
    table_uids.set(table_no, uid)
  }
  return table_uids.get(table_no)
}