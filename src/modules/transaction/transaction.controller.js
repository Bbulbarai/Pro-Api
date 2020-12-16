import messages from '../../utils/messages';
import Transaction from './transaction.model';

export async function getTransactiontList(req, res) {
    const response = {
            success: messages.FAILED,
            data: null,
            message: null
    }
    try {
        const transaction = await Transaction.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
        if (!transaction){
            response.status = messages.FAILED;
            return res.status(200).json(response)
        }
        response.data = transaction;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        response.message = e.message;
        return res. status(200).json(response)
    }
 }


export async function addTransaction(req, res){
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const { student, sublesson, amount, value } = req.body;
        const transactionModel = new Student({
            student,
            sublesson,
            amount,
            value
        });

        await transactionModel.save({ runValidators: true, new: true }, (err, doc) =>{
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

export async function deleteTransaction(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Transaction.findByIdAndDelete(req.params.id, (err, doc) => {
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

export async function updateTransaction(req, res) {
    const {student, sublesson, amount, value } = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Transaction.findByIdAndUpdate(req.params.id, { student, sublesson, amount,value }, {new: true, runValidators: true}, (err, doc) => {
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




