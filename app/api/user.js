const Koa = require('koa');
const Router = require('koa-router')
const router = new Router();
const {ParameterException} = require('../../core/http-exception.js');

const testMiddleware = async (ctx, next) => {
    console.log('测试组件', ctx);
    next()

}

router.post('/user/:id', testMiddleware, async (ctx, next) => {

    console.log('路由中间件', ctx);

    // 获取路径的参数，必须配合上面的:id一起
    const path = ctx.params
    
    // ? 后面的参数
    const query = ctx.request.query
    
    // 获取header里面的参数
    const headers = ctx.request.header
    
    // 获取body的参数要借助 koa-bodyparser 模块
    const body = ctx.request.body


    // ctx.response.body = `<h5>Hello, ${name}!</h5>`;
    if (body.id && ''+body.id === '1') {
        throw new ParameterException();
    } else {
        ctx.body = {
            userID: ctx.params.id ? ctx.params.id : ''
        }
    }
});





module.exports =  router;

