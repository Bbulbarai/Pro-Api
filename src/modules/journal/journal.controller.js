import messages from '../../utils/messages';
import Journal from './journal.model';

export async function getJournalList(req, res) {
    const response = {
            success: messages.FAILED,
            data: null,
            message: null
    }
    try {
        const journal = await Journal.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
   
        response.data = journal;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        response.message = e.message;
        return res. status(200).json(response)
    }
 }


export async function addJournal(req, res){
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const { schedule, student, teacher, isActive, result } = req.body;
        const journalModel = new Journal({
            schedule,
            student,
            teacher,
            isActive,
            result,
        });

        await journalModel.save({ runValidators: true, new: true }, (err, doc) =>{
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

export async function deleteJournal(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Journal.findByIdAndDelete(req.params.id, (err, doc) => {
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

export async function updateJournal(req, res) {
    const {schedule, student, teacher, isActive, result} = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Journal.findByIdAndUpdate(req.params.id, { schedule,student,teacher, isActive, result}, {new: true, runValidators: true}, (err, doc) => {
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


