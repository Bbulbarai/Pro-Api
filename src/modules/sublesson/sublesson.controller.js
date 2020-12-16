import messages from '../../utils/messages';
import HTTPStatus from 'http-status';
import Sublesson from './sublesson.model';
import { ROLES } from "../../utils/enum";

export async function getSublessonList(req, res) {
    const response = {
            success: messages.FAILED,
            data: null,
            message: null
    }
    try {
        const sublesson = await Sublesson.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
        if (!sublesson){
            response.status = messages.FAILED;
            return res.status(200).json(response)
        }
        response.data = sublesson;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        response.message = e.message;
        return res. status(200).json(response)
    }
 }


export async function addSublesson(req, res){
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const { lessonid, name, level } = req.body;
        const sublessonModel = new Sublesson({
            lessonid,
            name,
            level
        });

        await sublessonModel.save({ runValidators: true, new: true }, (err, doc) =>{
            if(!err) {
                response.success = messages.SUCCESS;
                response.data = doc;
                return res.status(200).json(response);
            } else {
                return res.status(200).json(response)
            }
        })
    }
    catch (e) {
        response.status = messages.ERROR;
        return res.status(200).json(response)
    }
}

export async function deleteSublesson(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Sublesson.findByIdAndDelete(req.params.id, (err, doc) => {
            if(!err) {
                response.success = messages.SUCCESS;
                response.data = doc;
                return res.status(200).json(response);
            } else {
                return res.status(200).json(response)
            }
        })
    }
    catch (error) {
        response.status = messages.ERROR;
        return res.status(200).json(response)
    }
};

export async function updateSublesson(req, res) {
    const {name, level} = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Sublesson.findByIdAndUpdate(req.params.id, { name, level }, {new: true, runValidators: true}, (err, doc) => {
            if(!err) {
                response.success = messages.SUCCESS;
                response.data = doc;
                return res.status(200).json(response)
            } else{
                return res.status(200).json(response)
            }
        })
    }
    catch (error) {
        response.status = messages.ERROR;
        return res.status(200).json(response)
    }
};


