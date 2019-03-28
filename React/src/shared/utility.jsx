export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isvalid = true;
    
    if(!rules) {
        return true;
    }

    if(rules.required) {
        isvalid = value.trim() !== '' && isvalid;
    }

    if(rules.minLength) {
        isvalid = value.length >= rules.minLength && isvalid;  
    }

    if(rules.maxLength) {
        isvalid = value.length <= rules.maxLength && isvalid;  
    }

    return isvalid;
}