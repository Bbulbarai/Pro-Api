import Joi from 'joi';
import { passwordReg, emailReg } from '../../utils/validation';

export default {
    login: {
      password: Joi.string().regex(passwordReg).required(),
      email: Joi.string().regex(emailReg).required()
    }
}
