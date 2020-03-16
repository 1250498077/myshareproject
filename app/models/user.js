const bcrypt = require('bcryptjs')

const {sequelize} = require('../../core/db');
const {Sequelize, Model} = require('sequelize');

// 定义用户模型
class User extends Model {

    // 获取token
    static async getToken (obj) {
        const user = await User.create({
            username: obj.username,
            password: obj.password
        })
        return user;
    }

    // 创建新用户
    static async createNewUser (obj) {
        const user = await User.create({
            username: obj.username,
            password: obj.password
        })
        return user;
    }

    // 根据账号查询用户是否存在
    static async queryUserByUserName (obj) {
        const user = await User.findOne({
            where: {
                username: obj.username
            }
        })
        return user;
    }

}

// 初始用户模型
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    password: {
        // 扩展 设计模式 观察者模式
        // ES6 Reflect Vue3.0
        type: Sequelize.STRING,
        set(val) {
            // 加密
            const salt = bcrypt.genSaltSync(10)
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue("password", psw)
        }
    }
}, {
    sequelize,
    tableName: 'user'
})


module.exports = {
    User
}
