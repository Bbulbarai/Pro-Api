export const emailReg = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
export const phoneNumberReg = /^[0-9]{8}$/;
export const nameReg = /^[А-Я|Ү|Ө|а-я|ү|ө|\-| |ё|Ё]+$/;
export const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{8,}$/;
export const textReg = /^[0-9|A-Z|a-z|А-Я|Ү|Ө|а-я|ү|ө|\-|_|ё|Ё|.|&| |,]+$/;
export const idReg = /^[0-9a-fA-F]{24}$/;
export const engTextReg = /^[A-Z|a-z|0-9|\-| |_|,|.]+$/;
