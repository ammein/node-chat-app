var generateMessage = (from , text) =>{
    // return object
    return {
        from , 
        text,
        createdAt : new Date().getTime()
    };
};


module.exports = {
    generateMessage
};