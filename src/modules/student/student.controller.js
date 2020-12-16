import messages from '../../utils/messages';
import HTTPStatus from 'http-status';
import Student from './student.model';
import { ROLES } from "../../utils/enum";

export async function getStudentList(req, res) {
    const response = {
            success: messages.FAILED,
            data: null,
            message: null
    }
    try {
        const student = await Student.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
        if (!student){
            response.status = messages.FAILED;
            return res.status(200).json(response)
        }
        response.data = student;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
    }
    catch (e) {
        response.status = messages.ERROR;
        response.message = e.message;
        return res. status(200).json(response)
    }
 }


export async function addStudent(req, res){
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const { lastname, firstname, classid, accountid, birth, email, password, img } = req.body;
        const studentModel = new Student({
            lastname,
            firstname,
            classid,
            accountid,
            birth,
            email,
            password,
            img,
        });

        await studentModel.save({ runValidators: true, new: true }, (err, doc) =>{
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

export async function deleteStudent(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Student.findByIdAndDelete(req.params.id, (err, doc) => {
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

export async function updateStudent(req, res) {
    const {lastname, firstname, email} = req.body;
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Student.findByIdAndUpdate(req.params.id, { lastname,firstname,email}, {new: true, runValidators: true}, (err, doc) => {
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


export async function addLesson(req, res) {
  const response = {
      success: messages.FAILED,
      data: null,
      message: null
  };

  try {
    var student = await Student.findById(req.params.id);
    if(student) {
      student.chosenLessons.push(req.params.lessonid)
      return res.status(200).json(response)
      student.save()
    }
    
      return res.status(200).json(response)
  }
  catch (error) {
      response.status = messages.ERROR;
      response.message = error.message;
      return res.status(200).json(response)
  }
};

