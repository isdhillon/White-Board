//Declarations
let canvas=document.querySelector(".canvas");
let context=canvas.getContext("2d");
let plusBtn=document.querySelector(".plus");
let minusBtn=document.querySelector(".minus")
let display=document.querySelector(".display")
let colorBtn=document.querySelector(".color-btn")
let clearBtn=document.querySelector(".clear");
let eraser=document.querySelector(".eraser")
let downloadBtn=document.querySelector(".download")
let sticker=document.querySelector(".sticker")
let mainContainer=document.querySelector(".main-container")
let imageBtn=document.querySelector(".image-btn")
let uploadBtn=document.querySelector(".upload-btn")
let imageContainer=document.querySelector(".image-container")
let upload=document.querySelector(".upload")
//canvas declarations
let size=10;
let color = "black";
let isPressed=false;
let x=undefined;
let y=undefined;
//when we press the mouse
canvas.addEventListener("mousedown",function(e){
    //pressed is true
    isPressed=true;
    //get the x and y coordinate
    x=e.offsetX;
    y=e.offsetY;
})
//when the mouse is released
canvas.addEventListener("mouseup",function(e){
    //pressed false reset x and y
    isPressed=false;
    x=undefined;
    y=undefined;
})
//if mouse if moved
canvas.addEventListener("mousemove",function(e){
    //mouse is pressed
    if(isPressed){
        //get the x2 and y2 values
        let x2=e.offsetX;
        let y2=e.offsetY;
        //draw circle
        drawCircle(x2,y2)
        //draw line
        drawLine(x,y,x2,y2)
    //update the value of x and y
        x=x2;
        y=y2;
    }
})

//draw circle
function drawCircle(x,y){
    //begin to draw
    context.beginPath();
    //draw circle
    context.arc(x,y,size,0,Math.PI*2);
    //color to be filled
    context.fillStyle=color;
    //fill the color
    context.fill();
}

//draw line
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    //move from x1 to x2 
    context.moveTo(x1,y1)
    //draw line
    context.lineTo(x2,y2)
    //line color
    context.strokeStyle=color;
    //line width
    context.lineWidth=size*2;
    //draw line
    context.stroke();
}
//plus btn
plusBtn.addEventListener("click",function(){
    //increase size by 5
    size+=5;
    if(size>50){
        size=50
    }
    //update it on screen
    updateSizeOnScreen();
})
//minus btn
minusBtn.addEventListener("click",function(){
    //decrease size by 5
    size-=5;
    if(size<5){
        size=5;
    }
    //update it 
    updateSizeOnScreen()
})
//updating it on the screen
function updateSizeOnScreen(){
    display.innerText=`${size}`;
}
//changing the color of the pencil
colorBtn.addEventListener("change",function(e){
    color=e.target.value;
})
//clearing the canvas
clearBtn.addEventListener("click",function(){
    context.clearRect(0,0,canvas.width,canvas.height);
})
//eraser
let rubberClicked=false;
eraser.addEventListener("click",function(){
    if(!rubberClicked){
        color="white"
        eraser.classList.add("active")
    }
    else{
        eraser.classList.remove("active")
        color=colorBtn.value;
    }
    rubberClicked=!rubberClicked
})
//download btn
downloadBtn.addEventListener("click",function(){
    //convert url from canvas
    let url=canvas.toDataURL();
    //create anchor
    let a=document.createElement('a');
    //file name
    a.download="file.png";
    //anchor to url
    a.href=url;
    //click on the anchor
    a.click();
    a.remove();
})
//sticker btn
sticker.addEventListener("click",function(){
    //make ticket
    let ticketSticker=document.createElement("div");
    //assigning class
    ticketSticker.setAttribute("class","ticket")
    //making the ticket
    ticketSticker.innerHTML=`<div class="header">
        <div class="minimise">
        </div>
        <div class="delete"></div>
        </div>
    <div class="content"> <textarea name="" id="" cols="30" rows="10" class="input"></textarea></div>`
    //delete btn of sticker
    let deletebtn=ticketSticker.querySelector(".delete");
    deletebtn.addEventListener("click",function(){
        ticketSticker.remove()
    })
    //minimise btn
    let isOpen=true;
    let minimise=ticketSticker.querySelector(".minimise");
    minimise.addEventListener("click",function(){
        if(isOpen){
            content.style.display="none"
        }
        else{
            content.style.display="block"
        }
        isOpen=!isOpen

    })
    //adding drag property to the sticker
    let content=ticketSticker.querySelector(".content")
    let header=ticketSticker.querySelector(".header");
    //sticker is not clicked
    let stickerDown=false;
    // x and y values
    let initialX = null, initialY = null;
    //if mouse is clicked get the values of x and y and assign stickerdown true
    header.addEventListener( "mousedown", function(e){
        initialX = e.clientX;
        initialY = e.clientY;
        stickerDown = true;
    } );
    //if the mouse is moved
    header.addEventListener( "mousemove", function(e){
        //mouse is clicked
        if(stickerDown)
        {   //get the values of x and y
            let finalX = e.clientX; 
            let finalY = e.clientY;
            //find final position
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            //get the bounding of the element
            let { top, left } = ticketSticker.getBoundingClientRect();
            //setting the top and left 
            ticketSticker.style.top = top + dy + "px";
            ticketSticker.style.left = left + dx + "px";
            //replacing x and y intial values
            initialX = finalX;
            initialY = finalY;
        }
    } );
    //if mouse is released
   header.addEventListener("mouseup", function(){
        stickerDown = false;
    })
    //mouse leave the container
    header.addEventListener("mouseleave", function(){
        stickerDown = false;
    })
    mainContainer.appendChild(ticketSticker)

})
//image upload container appears
imageBtn.addEventListener("click",function(){
    imageContainer.style.display="block"

})

uploadBtn.addEventListener("click",function(){
    //getting the array of file uploaded
    let filesArray=upload.files;
    //getting the first element
    let file=filesArray[0];
    //creating the url of the image and passing it to src
    let fileUrl=URL.createObjectURL(file)
    //same as sticker
    let ticketImage=document.createElement("div");
    ticketImage.setAttribute("class","image-right")
    ticketImage.innerHTML=`<div class="header">
    <div class="minimise">
    </div>
    <div class="delete"></div>
    </div>
    <div class="content">
    <img class="image" src=${fileUrl} alt="">
    </div>`
    let deletebtn=ticketImage.querySelector(".delete");
    deletebtn.addEventListener("click",function(){
        ticketImage.remove()
    })
    let isOpen=true;
    let stickerDown=false;
    let initialX = null, initialY = null;
    let minimise=ticketImage.querySelector(".minimise");
    let content=ticketImage.querySelector(".content")
    let header=ticketImage.querySelector(".header");
    minimise.addEventListener("click",function(){
        if(isOpen){
            content.style.display="none"
        }
        else{
            content.style.display="block"
        }
        isOpen=!isOpen

    })
    header.addEventListener( "mousedown", function(e){
        initialX = e.clientX;
        initialY = e.clientY;
        stickerDown = true;
    } );
    
    header.addEventListener( "mousemove", function(e){
        if(stickerDown)
        {
            let finalX = e.clientX; 
            let finalY = e.clientY;
            
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            
            let { top, left } = ticketImage.getBoundingClientRect();
            
            ticketImage.style.top = top + dy + "px";
            ticketImage.style.left = left + dx + "px";
    
            initialX = finalX;
            initialY = finalY;
        }
    } );
    
   header.addEventListener("mouseup", function(){
        stickerDown = false;
    })
    
    header.addEventListener("mouseleave", function(){
        stickerDown = false;
    })
    mainContainer.appendChild(ticketImage)
    imageContainer.style.display="none"
    
})