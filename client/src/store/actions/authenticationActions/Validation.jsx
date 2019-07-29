import {UsernameRegex, NamesRegex, PasswordRegex, EmailRegex} from '../../dataMapping/regexValidate';
import {EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, USERNAME} from "../../dataMapping/user";

export const validate = (type ,value)=>{
    let valid;
    if(value === "")
        return true;
    if(type === FIRST_NAME){
        valid = NamesRegex.test(value);
    }
    if(type === LAST_NAME){
        valid = NamesRegex.test(value);
    }
    if(type === USERNAME){
        valid = UsernameRegex.test(value);
    }
    if(type === PASSWORD){
        valid = PasswordRegex.test(value);

    }if(type === EMAIL){
        valid = EmailRegex.test(value);
    }
    return valid;
};

export const confirmPassword = (value1, value2)=>{
    return value1 === value2;
};