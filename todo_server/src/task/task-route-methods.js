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
        _getLkpUsers: _getLkpUsers,
        _create,
        _update,
        _deleteById
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

//get lookup users
async function _getLkpUsers(req, res) {
    //get messages from Message class
    let messages = new Messages();

    try {
        //get the lookup search text
        let lkptext = req.params.lkp_text;
        let lkptxt = {lkp_text: lkptext};

        const {error} = validateLkptext(lkptxt);
        if (error) {
            res.status(200).send(error.details[0].message);
            return;
        }

        //store resuls from db call
        let result = null;
        result = await dbHelper._getLkpUsers(lkptext);

        //null result - no user found
        if (result.length == 0) {
            res.status(200).send(messages.no_user_found);
            return;
        }

        //send result
        res.status(200).send(result);
    } catch (err) {
        console.log('Error:', err);
        //error result - user not found
        res.status(200).send(messages.no_user_found);
        return;
    }
}

//create user
async function _create(req, res) {
    let messages = new Messages()
    let vldMsg = ""

    let validationError = validateCreateUser(req.body)
    let ui_data = req.body;
    var er = ''

    if (!validationError.error) {
        try {
            var authHeader = req.body.authorization
            delete req.body.authorization
            if (authHeader == null || authHeader == "") {
                res.status(200).send("Unauthorized access");
                return
            }

            //check for duplicate
            let result = await dbHelper._validateUser(req.body);
            if (result.length > 0) {
                if (result[0].user_code === 1) {
                    vldMsg = messages.dup_user_code;
                } else if (result[0].user_name === 1) {
                    vldMsg = messages.dup_user_name;
                } else if (result[0].site_id === 0) {
                    vldMsg = messages.invalid_site;
                } else if (req.body.clinical_trial === 1 && result[0].clinical_trial_id === 0) {
                    vldMsg = messages.invalid_clinical_trial;
                } else if (result[0].department_id === 0) {
                    vldMsg = messages.invalid_department;
                }
            } else {
                vldMsg = messages.validation_error;
            }
            if (vldMsg !== "") {
                res.status(200).send(vldMsg);
                return;
            }

            let data = JSON.stringify({
                "username": ui_data.username,
                "email": ui_data.email,
                "firstName": ui_data.code,
                "lastName": ui_data.name,
                "mobileNo": ui_data.phone_primary
            });

            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                }
            };
            // get a connection from the connection pool
            let conn = await dbHelper._getConnection();

            // initiate the transaction for the connection
            await dbHelper._beginTransaction(conn);

            await dbHelper._create(req.body, conn)

            try {
                const response = await axios.post(SERVICE_URL + '/users', data, config);

                if (response.status === 200) {
                    // commit the db changes
                    await dbHelper._commit(conn);
                    res.status(200).send({
                        message: messages.user_created
                    })
                    return
                } else {
                    await dbHelper._rollback(conn);
                    res.status(200).send(er)
                    return;
                }
                return
            }
            catch (err){
                await dbHelper._rollback(conn);
                if(err.message.includes('500')){
                    res.status(200).send("Server error")
                }
                else{
                    res.status(200).send(err.message)
                }
                return
            }


        } catch (error) {

            console.log('User Service _create :', error.message);
            res.status(200).send(error.message)
            return
        }
    } else {
        res.status(200).send(validationError.error.details[0].message)
        return
    }
}

//update user record by id
async function _update(req, res) {
    let messages = new Messages()
    let vldMsg = "";
    let validationResult = validateUserUpdate(req.body, req.params.id)

    if (req.params.id != req.body.id) {
        res.status(200).send(messages.invalid_entry);
        return;
    }

    if (!validationResult.error) {
        try {
            delete req.body['id']

            //check for duplicate
            let result = await dbHelper._validateUserUpdate(req.body, req.params.id);

            if (result.length > 0) {
                if (result[0].user_code === 1) {
                    vldMsg = messages.dup_entry;
                } else if (result[0].site_id === 0) {
                    vldMsg = messages.invalid_site;
                } else if (req.body.clinical_trial === 1 && result[0].clinical_trial_id === 0) {
                    vldMsg = messages.invalid_clinical_trial;
                } else if (result[0].department_id === 0) {
                    vldMsg = messages.invalid_department;
                }
            } else {
                vldMsg = messages.validation_error;
            }

            if (vldMsg != "") {
                res.status(200).send(vldMsg);
                return;
            }

            result = await dbHelper._update(req.body, req.params.id)
            if (result.affectedRows > 0) {
                res.status(200).send({
                    message: messages.user_updated
                })
            } else
                res.status(200).send(messages.no_user_found)
        } catch (error) {
            console.log('User Module _update', error);
            res.status(200).send(error.sqlMessage)
        }
    } else res.status(200).send(validationResult.error.details[0].message)
}

//delete the user
async function _deleteById(req, res) {
    let validationResult = validateId(req.params)
    let messages = new Messages()
    if (!validationResult.error) {
        try {
            let result = await dbHelper._deleteById(req.params.id)
            if (result.affectedRows > 0) {
                res.status(200).send({
                    message: messages.user_deleted
                })
            } else {
                res.status(200).send(messages.no_user_found)
            }
        } catch (err) {
            if (err?.sqlMessage.includes('fk_section_user_id')) {
                res.status(200).send(messages.fkc_user_have_section);
            } else {
                //error result - area not found
                res.status(200).send(err.sqlMessage);
            }
        }
    } else res.status(200).send(validationResult.error.details[0].message)
}

//validate user
function validateQueryParams(param) {
    return Joi.object({
        id: Joi.number().integer().positive().allow(''),
        code: Joi.string().alphanum(),
        name: Joi.string().allow(''),

    }).validate({
        id: param.id,
        code: param.code,
        name: param.name
    })
}

// validate function for lookup text inputs
function validateLkptext(lkptext) {
    const schema = Joi.object({
        lkp_text: Joi.string().required()
    });

    return schema.validate(lkptext);
}

//validate user create input
function validateCreateUser(inp) {
    let clinical_trial = inp.clinical_trial;

    return Joi.object({
        code: Joi.string().alphanum().required().label("User Code"),
        name: Joi.string().required().label("Name of the user"),
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
        usertype: Joi.number().integer().positive().required().label("User Type"),
        phone_primary: Joi.string().required().label("Primary Phone Number"),
        phone_secondary: Joi.string().label("Secondary Phone Number"),
        email: Joi.string().required().label("Email"),
        user_image: Joi.string().label("User Image"),
        site_id: Joi.number().integer().positive().label("Site"),
        department_id: Joi.number().integer().positive().label("Department"),
        clinical_trial_id: clinical_trial === 0 ? Joi.number().label("Clinical Trial").allow(null) : Joi.number().integer().positive().required().label("Clinical Trial"),
        user_role_id: Joi.number().integer().positive().label("User Role"),
        clinical_trial: Joi.number().integer().required().label("Clinical trial"),
        authorization: Joi.string().required().label("Authorization Token"),
    }).validate(inp)
}

//validate user update request body
function validateUserUpdate(inp, id) {
    let clinical_trial = inp.clinical_trial;
    return Joi.object({
        user_id: Joi.number().integer().positive().required().label("User"),
        id: Joi.number().integer().positive().required().label("User"),
        code: Joi.string().alphanum().label("User Code"),
        name: Joi.string().label("Name of the user"),
        username: Joi.string().label("User Name"),
        // password: Joi.string().label("Password"),
        usertype: Joi.number().integer().positive().label("User Type"),
        phone_primary: Joi.string().label("Primary Phone Number"),
        phone_secondary: Joi.string().label("Secondary Phone Number").allow(""),
        email: Joi.string().label("Email"),
        user_image: Joi.string().label("User Image").allow(""),
        site_id: Joi.number().integer().positive().label("Site"),
        department_id: Joi.number().integer().positive().label("Department").allow(null),
        clinical_trial_id: clinical_trial === 0 ? Joi.number().label("Clinical Trial").allow(null) : Joi.number().integer().positive().label("Clinical Trial"),
        user_role_id: Joi.number().integer().positive().label("User Role"),
        clinical_trial: Joi.number().integer().label("Clinical trial")
    }).validate({
        ...inp,
        user_id: id
    })
}

// validate - Integer
function validateId(id) {
    const schema = Joi.object({
        id: Joi.number().positive().integer().label("User")
    });

    return schema.validate(id);
}
