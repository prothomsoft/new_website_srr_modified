import Validator from "validator";
import isEmpty from "../client/is-empty";

export const validateEducationInput = data => {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.from = !isEmpty(data.from) ? data.from : "";

    if (Validator.isEmpty(data.school)) {
        errors.school = " School Field Is Required";
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = " DegreeField Is Required";
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = " Field Of Study Is Required";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = " From Date Field Is Required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
