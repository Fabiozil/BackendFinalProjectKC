export const trimValidator = (param: string) => {
    try {
        return param == null ? "" : param.trim ? param.trim() : param;
    } catch (err) {
        console.log(param);
        console.error(err);
        throw err;
    }
};
