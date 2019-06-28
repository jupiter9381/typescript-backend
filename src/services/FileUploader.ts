const fs = require("fs");

export default class FileUploader {
    public static create(path: string, sampleFile) {
        let fileUploaded = false;
        fs.mkdir( path, {recursive: true}, (err) => {
            if (err) throw err;
            sampleFile.mv( path + sampleFile.name, (err) => {
                if (err) throw err;
                fileUploaded = true;
                return;
            });
        });
        return fileUploaded;
    }
}