import messages from '../../utils/messages';
import HTTPStatus from 'http-status';
import Lesson from './lesson.model';
import { ROLES } from "../../utils/enum";

export async function getLessonList(req, res) {
    const response = {
            success: messages.FAILED,
            data: null,
            message: null
    }
    try {
        const lesson = await Lesson.find();
        if (!lesson){
            response.status = messages.FAILED;
            return res.status(200).json(response)
        }
        response.data = lesson;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        response.message = e.message;
        return res. status(200).json(response)
    }
 }


export async function addlesson(req, res){
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const { name } = req.body;
        const lessonModel = new Lesson({
            name
        });

        await lessonModel.save({ runValidators: true, new: true }, (err, doc) =>{
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

export async function deletelesson(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Lesson.findByIdAndDelete(req.params.id, (err, doc) => {
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

export async function updatelesson(req, res) {
    const {name} = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Lesson.findByIdAndUpdate(req.params.id, { name}, {new: true, runValidators: true}, (err, doc) => {
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


