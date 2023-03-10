
export const wrapAsyncErrors = (fn) => {
    return function (req, res, next) {
        // console.dir(fn)
        fn(req, res, next).catch((next));
    };
}


export default wrapAsyncErrors;

// module.exports = func => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     }
// }
