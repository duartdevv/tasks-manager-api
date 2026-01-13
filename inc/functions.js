const { timeStamp } = require("node:console")

function response(status, message, aftrows, data = null) {
    return {
        status: status,
        message: message,
        affected_rows: aftrows,
        data: data,
        timeStamp: new Date().getTime()
    }
}
module.exports = {
    response
}