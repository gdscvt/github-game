function capturePlayer(){
    playerCapture['up'] = [];
    playerCapture['down'] = [];
    playerCapture['left'] = [];
    playerCapture['right'] = [];

    push();
    image(playerSprite,0,0);
    let numOfFrames = 6;
    for(let i = 0; i < numOfFrames; i++){
        playerCapture['down'].push(get(i * 32, 0, 32, 32));
    }

    for(let i = 0; i < numOfFrames; i++){
        playerCapture['left'].push(get(i * 32, 32, 32, 33));
    }

    for(let i = 0; i < numOfFrames; i++){
        playerCapture['right'].push(get(i * 32, 32*2 + 1, 32, 33));
    }

    for(let i = 0; i < numOfFrames; i++){
        playerCapture['up'].push(get(i * 32, 32 * 3, 32, 32)); 
    } 
        
    pop();
}

function captureEnv1(){
    
    envCapture = [];
    push();
        image(env1Sprite, 0, 0);
        envCapture.push(get(129, 33, 352, 63));
        envCapture.push(get(320, 193, 64, 32));
        envCapture.push(get(192, 256, 32, 32));

        desk1Hcapture= get(224, 32, 64, 64); // front
        desk2Hcapture = get(288, 32, 64, 64); // front
        desk3Hcapture = get(352, 32, 64, 64); // back
        desk4Hcapture = get(416, 32, 64, 64); // back
        desk5Hcapture = get(160, 32, 64, 64); 
        
        desk1Vcapture = get(384, 128, 32, 64);
        desk2Vcapture = get(448, 128, 32, 64);

        chair = get(100, 133, 24, 24);
    pop();
}

function captureEnv2(){
    push();
        image(doorSprite, 0, 0);

        doors.push(get(34 + 2, 12, 38, 52));
        doors.push(get(34 + 2, 52 * 1 + 12 * 2, 38, 52));
        doors.push(get(34 + 2, 52 * 2 + 12 * 3, 38, 52));
        doors.push(get(34 + 2, 52 * 3 + 12 * 4, 38, 52));
    pop();
}

function captureAllAnimation(){
    createCanvas(384, 256);
    capturePlayer();
    createCanvas(512, 512);
    captureEnv1();
    createCanvas(456, 512);
    captureEnv2();
}