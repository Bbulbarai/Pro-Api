import messages from '../../utils/messages';
import HTTPStatus from 'http-status';
import Schedule from './schedule.model';
import { ROLES } from "../../utils/enum";

export async function getScheduleList(req, res) {
    const response = {
            success: messages.FAILED,
            data: null,
            message: null
    }
    try {
        const schedule = await Schedule.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
        if (!schedule){
            response.status = messages.FAILED;
            return res.status(200).json(response)
        }
        response.data = schedule;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        response.message = e.message;
        return res. status(200).json(response)
    }
 }


export async function addSchedule(req, res){
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const { day, starttime, endtime, lessonid } = req.body;
        const scheduleModel = new Schedule({
         day,
         starttime,
         endtime,
         lessonid
        });

        await scheduleModel.save({ runValidators: true, new: true }, (err, doc) =>{
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

export async function deleteSchedule(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Schedule.findByIdAndDelete(req.params.id, (err, doc) => {
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

export async function updateSchedule(req, res) {
    const {day, starttime, endtime, lessonid} = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Schedule.findByIdAndUpdate(req.params.id, { day, starttime, endtime, lessonid}, {new: true, runValidators: true}, (err, doc) => {
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


