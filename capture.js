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
    pop();
}

function captureAllAnimation(){
    createCanvas(384, 256);
    capturePlayer();
    createCanvas(512, 512);
    captureEnv1();
}