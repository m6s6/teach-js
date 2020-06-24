import {ObjectID} from 'mongodb';
import db from './connection';
import Comments from "./Comments";

const collection = (async () => (await db).collection('tasks'))();

export default class TasksModel {
    static getAllTasks() {
        return new Promise(async resolve => (await collection).find({}).toArray((err, tasks) => resolve(tasks)));
    }

    static async getAllTasksWithComments() {
        const [tasks, comments] = await Promise.all([
            this.getAllTasks(),
            Comments.getAllComments()
        ]);
        return {tasks, comments};
    }

    static async createTask(task){
        const res = await collection.insertOne(task);
        return res.insertedId.toString();
    }

    static async updateTask(id, task){
        await collection.updateOne(
            {_id: ObjectID(id)},
            {$set: task}
        );
        return true;
    }

    static async deleteTask(id) {
        await collection.deleteOne({_id: ObjectID(id)});
        return true;
    }
}