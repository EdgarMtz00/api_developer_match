exports.okIfNotNull = (data, error_msg, res) => {
    if (data == null) {
        res.status(400).json({"error": error_msg});
        return;
    }
    res.json({
        "message": "success",
        "data": data
    })
}

exports.okIfTrue = (data, error_msg, res) => {
    if (data) {
        res.json({
            "message": "success",
            "data": data
        })
    } else {
        res.status(400).json({"error": error_msg});
    }
}
