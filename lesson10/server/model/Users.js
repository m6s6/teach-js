import db from './connection';
import crypto from 'crypto';

const collection = (async () => (await db).collection('users'))();

export default class UsersModel {
    static async createUser( user ) {
        const salt = crypto.randomBytes(16).toString('hex');
        const password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');
        const res = await (await collection).insertOne({...user, salt, password});
        return res.insertedId.toString();
    }

    static async getUser( login, password ) {
        const user = await (await collection).findOne({login});
        if (user) {
            const checkPass = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
            if(user.password === checkPass){
                return {
                    name: user.name,
                    login: user.login
                };
            }
            throw new Error('Password incorrect!');
        }
        throw new Error('User not found!');
    }
}