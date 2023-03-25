//Exploring router methods
module.exports = (router, expressApp, passedRouteMethods) => {

    // Route to get list of all and filtered user records
    router.get('/task', passedRouteMethods._getTaskList);
    router.post('/task', passedRouteMethods._createTask);

    return router;
}
