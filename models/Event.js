const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    //user is who create the note (is the id)
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

//we modife the toJason as toString() the java 
EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject(); //we extract _id in order to change its name ( pass from _id to id)
    object.id = _id;
    return object;
});



module.exports = model('Event', EventSchema );