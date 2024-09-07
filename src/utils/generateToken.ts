import crypto from 'crypto'

export default ():string => {
  return crypto.randomBytes(30).toString('hex')
}