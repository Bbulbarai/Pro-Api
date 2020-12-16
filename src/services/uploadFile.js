const fs = require('fs');

export function upload(img) {
    console.log("gjkdsrbheuiguierui");
    var base64Data = img.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("uploads/out.jpg", base64Data, 'base64', function(err) {
        if(!err){
            return false;
        }
        return true
    });
}