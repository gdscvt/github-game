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

function captureAllAnimation(){
    createCanvas(384, 256);
    capturePlayer();
}