//include validator for JavaScript objects & input parameters
const Joi = require('joi');

//declare variable for common functions
var dbHelper;
var Messages;
var helpers;


module.exports = (injectedDBHelper, InjectedMessages, injectedHelpers) => {
    dbHelper = injectedDBHelper;
    Messages = InjectedMessages;
    helpers = injectedHelpers;

    //returning methods required for user maintenance
    return {
        _getTaskList: _getTaskList,
        _createTask: _createTask,
        _updateTask: _updateTask,
        _deleteTask: _deleteTask
    }
}


//get all user list
async function _getTaskList(req, res) {
    //get messages from Message class
    let messages = new Messages();

    try {
        //get query parameters
        let id = (req.query.id) ? req.query.id : "";
        let content = (req.query.content) ? req.query.content : "";


        // //validate id if given for the filter
        // let {error} = validateQueryParams(req.query);
        // if (error) {
        //     res.status(200).send(error.details[0].message);
        //     return;
        // }

        //store resuls from db call
        let result = null;
        result = await dbHelper._getTaskList(id, content);

        //null result - no user found
        if (result.length == 0) {
            res.status(404).send(messages.fail);
            return;
        }

        //send result
        res.status(200).send(result);
    } catch (err) {
        console.log('Error:', err);
        //error result - user not found
        res.status(500).send(messages.fail);
        return;
    }
}

//create new task
async function _createTask(req, res) {
    //get messages from Message class
    let messages = new Messages();
    let conn = await dbHelper._getConnection();
    try {
        //get the body data
        let data = req.body


        if (typeof data == null) {
            res.status(400).send(messages.fail);
            return;
        }
        const {error} = validateTask(data);
        if (error) {
            res.status(200).send(error.details[0].message);
            return;
        }
        //store results from db call
        let result = null;
        result = await dbHelper._createTask(data, conn);

        //null result - no user found
        if (result.length == 0) {
            res.status(200).send(messages.not_found);
            return;
        }

        await dbHelper._commit(conn);

        //send result
        res.status(200).send(result);
        return
    } catch (err) {
        console.log('Error:', err);
        //error result - user not found
        res.status(200).send(messages.fail);
        return;
    }
}

//update a task
async function _updateTask(req, res) {
    //get messages from Message class
    let messages = new Messages();
    try {
        //get the body data
        let data = req.body

        if (data?.content === "" && data?.completed === null ) {
            res.status(400).send(messages.fail);
            return;
        }

        const {error} = validateTask(data);
        if (error) {
            res.status(200).send(error.details[0].message);
            return;
        }

        data.id = req.params.t_id

        //store results from db call
        let result = null;
        result = await dbHelper._updateTask(data);

        //null result - no user found
        if (result.length == 0) {
            res.status(200).send(messages.fail);
            return;
        }

        if (result.affectedRows == 0) {
            res.status(404).send(messages.not_found);
            return;
        }

        //send result
        res.status(200).send(result);
        return
    } catch (err) {
        console.log('Error:', err);
        //error result - user not found
        res.status(200).send(messages.fail);
        return;
    }
}

//delete a task
async function _deleteTask(req, res) {
    //get messages from Message class
    let messages = new Messages();
    try {
        //get the body data
        let data = {}

        data.t_id = req.params.t_id

        //store results from db call
        let result = null;
        result = await dbHelper._deleteTask(data);

        //null result - no user found
        if (result.length == 0) {
            res.status(200).send(messages.fail);
            return;
        }

        if (result.affectedRows == 0) {
            res.status(404).send(messages.not_found);
            return;
        }
        //send result
        res.status(200).send(result);
        return
    } catch (err) {
        console.log('Error:', err);
        //error result - user not found
        res.status(200).send(messages.fail);
        return;
    }
}

//validate input
function validateTask(attn) {
    const schema = Joi.object({
        content: Joi.string().label("Content"),
        completed: Joi.boolean().allow(0,1).label("IsCompleted?")
    });

    return schema.validate(attn);
}
