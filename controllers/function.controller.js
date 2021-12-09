var fs = require('fs');
const { decode } = require('node-base64-image');

class functionsController {
       
    filehandle(data, upload_path){
        if (data.length) {
            for (let index = 0; index < data.length; index++) {
    
                var rawData = fs.readFileSync(data[index].path);
                var newPath = upload_path
                    + '/' + data[index].name
    
    
                fs.writeFileSync(newPath, rawData, function (err) {
                    if (err) console.log(err);
                });
                fs.unlinkSync(data[index].path);
    
            };
        } else {
            var rawData = fs.readFileSync(data.path);
            var newPath = upload_path
                + '/' + data.name
    
    
            fs.writeFileSync(newPath, rawData, function (err) {
                if (err) console.log(err);
            });
            fs.unlinkSync(data.path);
        }
    
    }
    generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async uploadbase64image(image, directory){

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        //console.log(image, "image");
        var file;
        if (image && image != '') {
           
            file = directory + this.generateRandomString(10);
            console.log(file);
            await decode(image, { fname: file, ext: 'jpg' });
            file += '.jpg';
            console.log(file);
            return file;
        };
        return undefined;
    }
}

module.exports = (options)=> new functionsController(options);