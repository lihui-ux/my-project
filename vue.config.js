module.exports = {
    //  取消eslint提示
    lintOnSave: false,
    devServer: {
        open: true,
        proxy: {
            "/api": {
                target: "http://182.92.128.115",
            }
        }
    }
}