import { ObjectID } from 'mongodb';
import db from './connection';

const collection = (async () => (await db).collection('comments'))();

export default class Comments {
    static getAllComments() {
        return new Promise(async resolve => (await collection).find({}).toArray(( err, comments ) => resolve(comments)));
    }

    static async createComment( comment ) {
        const res = await (await collection).insertOne(comment);
        return res.insertedId.toString();
    }

    static async deleteComment( id ) {
        await (await collection).deleteOne({_id: ObjectID(id)});
        return true;
    }

    static async updateComment( id, comment ) {
        await (await collection).updateOne(
            {_id: ObjectID(id)},
            {$set: comment}
        );
        return true;
    }

    static async incLikesComment( id ) {
        await (await collection).updateOne(
            {_id: ObjectID(id)},
            {$inc: {likes: 1}}
        );
        return true;
    }
}