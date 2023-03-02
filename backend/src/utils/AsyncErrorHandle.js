
export const wrapAsyncErrors = (fn) => {
    return function (req, res, next) {
        console.dir(fn)
        fn(req, res, next).catch((err) => next(err));
    };
}


export default wrapAsyncErrors;
