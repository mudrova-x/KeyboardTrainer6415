// class LocalErrors extends Error{
//     constructor(status, message) {
//         super();
//         this.status = status
//         this.message = message
//     }

//     static badRequest(message) {
//         return new LocalErrors(404, message)
//     }

//     static internal(message) {
//         return new LocalErrors(500, message)
//     }

//     static forbidden(message) {
//         return new LocalErrors(403, message)
//     }
// }

// module.exports = LocalErrors