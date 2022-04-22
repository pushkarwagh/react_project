import { object, string } from 'joi';

const registerValidation = data => {
    const schema = object({
        name: string().min(3).required(),
        email: string().min(6).required().email(),
        password: string().min(6).required()
    })
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = object({
        email: string().min(6).required().email(),
        password: string().min(6).required()
    })
    return schema.validate(data);
}


export default { registerValidation, loginValidation }