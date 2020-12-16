import messages from '../../utils/messages';
import HTTPStatus from 'http-status';
import Teacher from './teacher.model';
import { ROLES } from "../../utils/enum";

export async function getTeacherList(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const teacher = await Teacher.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
        if (!teacher) {
            response.status = messages.FAILED;
            return res.status(200).json(response)
        }
        response.data = teacher;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        return res.status(200).json(response)
    }
}

export async function addTeacher(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
       const { lastname, firstname, email, img, password } = req.body;
       const teacherModel = new Teacher({
           lastname,
           firstname,
           email,
           img, 
           password,
       });

       await teacherModel.save({ runValidators: true, new: true }, (err, doc) => {
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

export async function deleteTeacher(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Teacher.findByIdAndDelete(req.params.id, (err, doc) => {
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

export async function updateTeacher(req, res) {
    const { lastname, firstname, email, img } = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Teacher.findByIdAndUpdate(req.params.id, { lastname, firstname, email, img }, {new: true, runValidators: true}, (err, doc) => {
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
