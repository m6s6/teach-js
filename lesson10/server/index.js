const https = require('https');
const port = 5000;

// const server = http.createServer((req,res)=>{
//     res.statusCode=200;
//     res.end('hello');

// });

// server.listen(port, ()=>{
//     console.log(`Server running at port ${port}`)
// });


const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(cors({
    origin:'*',
    methods:'*'
}));

app.use(bodyParser.urlencoded({
    limit:'500mb',
    extended:true
}));

app.use (bodyParser.json({
    limit:'500mb'
}));

app.get('/api/photos', ( req, res ) => {
    // const ar = [];
    // ar.length = 10;
    Promise.all(
        Array(10).fill(0).map((item, id) => new Promise( resolve => {
            https.get(`https://jsonplaceholder.typicode.com/photos/${id + 1}`, resp => {
                let data = '';
                resp.on('data', chunk => data += chunk);
                resp.on('end', () => resolve(JSON.parse(data)));
            });
        })
    )).then(items => res.send(JSON.stringify(items))).catch(err=>console.log(err));
});



let tasks = [
    {
        id: 100,
        name: 'Сделать первый проект',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 200,
        name: 'Сделать первый проект1',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 300,
        name: 'Сделать первый проект2',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 400,
        name: 'Сделать первый проект3',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 500,
        name: 'Сделать первый проект4',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 600,
        name: 'Сделать первый проект5',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 700,
        name: 'Сделать первый проект6',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 800,
        name: 'Сделать первый проект7',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    },
    {
        id: 900,
        name: 'Сделать первый проект8',
        deadline: '2020-04-30',
        description: 'Первый проект по теме React',
        status: 'todo'
    }
];

// app.get('/api/tasks',(req,res)=>{
//     res.send(JSON.stringify({tasks}));
// });
// app.post('/api/tasks', (req, res) => {
//     tasks.push(req.body.task);
//     res.sendStatus(200);
// });

// app.delete('/api/tasks/:id', (req, res) => {
//     tasks.splice(tasks.findIndex(i => i.id === req.params.id), 1);
//     res.sendStatus(200);
// });
//bash - стандартная Линуксовая оболочка которая позволяет запускать скрипты

const url ='mongodb://localhost:27017';
const db = 'local';
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;




app.use('/auth', (req, res) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('users').findOne({login: req.body.login, password: req.body.password}).then(user => {
            const token = {
                token: Math.random().toString(36).substring(2, 20),
                user: user._id
            };
            client.db(db).collection('tokens').insertOne(token).then(() => {
                res.send(JSON.stringify({
                    name: user.name,
                    token: token.token
                }));
            });
        });
    });
});

app.use('/registration', (req, res) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('users').insertOne(req.body).then(user => {
            const token = {
                token: Math.random().toString(36).substring(2, 20),
                user: user.insertedId.toString()
            };
            client.db(db).collection('tokens').insertOne(token).then(() => {
                res.send(JSON.stringify({
                    name: req.body.name,
                    token: token.token
                }));
            });
        });
    });
});

// GET /api/tasks/comments/ --> deprecated
// POST /api/tasks/comments/
app.post('/api/tasks/comments', (req, res) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('comments').insertOne(req.body.comment).then(( comment ) => {
            res.send(JSON.stringify({_id: comment.insertedId.toString()}));
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }).catch(err => {
        console.log(err)
    });
});
// PUT /api/tasks/comments/:id
app.put('/api/tasks/comments/:id', ( req, res ) => {
    /**
     * comments
     * @param text - String
     * @param likes - Number
     * @param taskId - String
     */
    mongoClient.connect(url).then(client => {
        client.db(db).collection('comments').updateOne(
            {_id: ObjectID(req.params.id)},
            // {$set:{likes: req.body.likes}}
            {$inc:{likes: 1}}
        ).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    });
});
// DELETE /api/tasks/comments/:id
app.delete('/api/tasks/comments/:id', ( req, res ) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('comments').deleteOne({_id: ObjectID(req.params.id)}).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    });
});

// GET /api/tasks/ -> Array<task>
app.get('/api/tasks', ( req, res ) => {
    mongoClient.connect(url).then(client => {
        Promise.all([
            new Promise(resolve => client.db(db).collection('tasks').find({}).toArray((err, tasks) => resolve(tasks))),
            new Promise(resolve => client.db(db).collection('comments').find({}).toArray((err, comments) => resolve(comments)))
        ]).then(([tasks, comments]) => {
            res.send(JSON.stringify({tasks, comments}));
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
        // client.db(db).collection('tasks').find({}).toArray(( err, tasks ) => {
        //     res.send(JSON.stringify({tasks}));
        // });
    });
});
// POST /api/tasks/
app.post('/api/tasks', ( req, res ) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('tasks').insertOne(req.body.task).then(( task ) => {
            res.send(JSON.stringify({_id: task.insertedId.toString()}));
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }).catch(err => {
        console.log(err)
    });
});
// PUT /api/tasks/
app.put('/api/tasks/:id', ( req, res ) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('tasks').updateOne(
            {_id: ObjectID(req.params.id)},
            {$set: req.body.task}
        ).then(( task, err ) => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    });
});
// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', ( req, res ) => {
    mongoClient.connect(url).then(client => {
        client.db(db).collection('tasks').deleteOne({_id: ObjectID(req.params.id)}).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    });
});


app.use('/', express.static(__dirname+'/public'));

app.use('*',(req,res,next)=>{
    res.sendFile('/public/index.html');
});

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
});