
exports.rowsHandler = (resolve, reject) => {
    return (err, rows) => {
        if (err) {
            console.log(err);
            reject(err);
        }
        resolve(rows)
    }
}

exports.successHandler = (resolve, reject) => {
    return (err) => {
        if (err) {
            console.log(err);
            reject(err);
        }
        resolve(true);
    }
}
