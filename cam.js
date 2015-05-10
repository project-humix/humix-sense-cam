var fs = require('fs');



function readFile (){

    fs.readFile('./test.jpg', function read(err, data) {
        if (err) {
            throw err;
        }

        var base64Image = new Buffer(data, 'binary').toString('base64');

	var output_image = { 'image': base64Image};        
        console.log(JSON.stringify(output_image));
        
    });

    
}

readFile();
