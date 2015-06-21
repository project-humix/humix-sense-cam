var nats = require('nats').connect();
var log = require('logule').init(module, 'cam');

var fs = require('fs');
var path = require('path');
 
var child = require('child_process');
var proc;

var uid =0;


nats.subscribe('humix.sense.cam.command', function(msg){

    log.info('received cam command:'+msg);

    var command = JSON.parse(msg);

    if(command && command.action === 'takePic'){

        // taking a picture..

        uid++;
        var path = "./controls/humix-sense-cam/pics/"+uid+".jpg";
        log.info('file path:'+path);
        //proc = child.exec("raspistill -w 640 -h 480 -o ./controls/humix-sense-cam/pics/image.jpg",function(err,data){
        proc = child.exec("raspistill -w 860 -h 540 -o "+path,function(err,data){
            
	        if(!err){
                log.info('done taking picture');



                fs.readFile(path, function read(err, data) {

                    if (err) {
                        log.error("error reading cam image. abort.")
                        throw err;
                    }

                    var base64Image = new Buffer(data, 'binary').toString('base64');

	                var output_image = { 'image': base64Image};        
                    nats.publish('humix.sense.cam.event', JSON.stringify(output_image));

                    // PRINT THE PHOTO
                    var cmd = "/bin/bash ./controls/humix-sense-cam/print.sh " + uid;
                    //proc = child.exec("lp -d Canon_CP910_ipp ./controls/humix-sense-cam/pics/image.jpg ",function(err,data){
                    proc = child.exec(cmd,function(err,data){

                        if(err){

                            log.info("failed to print image");
                        }else{

                            log.info("print image succeeded");
                        }
                    })
                    
                });

                
            }
        })

        
    }
    
});


