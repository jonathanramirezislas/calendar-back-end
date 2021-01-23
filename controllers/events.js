const { response } = require('express');
const Event = require('../models/Event');

//get events
const getEventos = async( req, res = response ) => {

    //called populate(), which lets you reference documents in other collections.
    const events = await Event.find()    //ref , fields
                                .populate('user','name');
    res.json({
        ok: true,
        eventos: events
    });
}

//create events
const crearEvento = async ( req, res = response ) => {
    const event = new Event( req.body );
    try {
        //add user to event (who is created the note) 
        event.user = req.uid;//this uid is added in JWT 
        
        const saveEvent = await event.save();

        res.json({
            ok: true,
            evento: saveEvent
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
//update event
const actualizarEvento = async( req, res = response ) => {
    
    const eventoId = req.params.id;
    const uid = req.uid; 

    try {

        const event = await Event.findById( eventoId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }
        //CHECK if the owner is who will update the event
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
//delete event
const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid; 

    try {

        const event = await Event.findById( eventoId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Event.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}