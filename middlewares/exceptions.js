const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    // console.log('经过错误处理中间件', ctx);
    try {
        await next();
    } catch (error) {
        // 开发环境
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment === 'dev';
            
        if (isDev) {
            throw error
        }
    
        if (isDev && !HttpException) {
            throw error
        }

        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: "未知错误",
                error_code: 500,
                request: 'xxxx'
            }
            ctx.status = 500
        }

    }
}
module.exports = catchError;












