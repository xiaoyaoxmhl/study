const fs = require('fs')
const zlib = require('zlib')

// let rs = fs.createReadStream('./log.txt')
// let wr = fs.createWriteStream('./log.txt.tar')
// let gzip = zlib.createGzip();

// rs.pipe(gzip).pipe(wr)

let gunzip = zlib.createGunzip();
let rs = fs.createReadStream('./log.txt.tt')
let ws = fs.createWriteStream('./log1.txt')

rs.pipe(gunzip).pipe(ws)