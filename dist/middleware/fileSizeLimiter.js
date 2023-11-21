"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSizeLimiter = void 0;
const MB = 512; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;
const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const filesOverLimit = []; // Which files are over the limit?
    Object.keys(files).forEach((key) => {
        if (files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name);
        }
    });
    if (filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? "are" : "is";
        const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replace(/,/g, ", ");
        const message = filesOverLimit.length < 3
            ? sentence.replace(",", " and")
            : sentence.replace(/,(?=[^,]*$)/, " and");
        return res.status(413).json({ status: "error", message });
    }
    next();
};
exports.fileSizeLimiter = fileSizeLimiter;
//# sourceMappingURL=fileSizeLimiter.js.map