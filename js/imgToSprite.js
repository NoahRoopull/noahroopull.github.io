const imageUpload=document.getElementById('image-upload');
const widthRange=document.getElementById('width');
const heightRange=document.getElementById('height');
const lockAspectRatio=document.getElementById('lock-aspect-ratio');
const widthValue=document.getElementById('width-value');
const heightValue=document.getElementById('height-value');
const resetPaletteButton=document.getElementById('reset-palette');
const outputText=document.getElementById('output-text');
const copyButton=document.getElementById('copy-output');
const paletteTable=document.querySelector('#palette tbody');
const image=document.getElementById('uploaded-image');
const imageCont=document.getElementById('uploaded-container');
const cropXSlider=document.getElementById('cropx');
const cropXValue=document.getElementById('cropx-value');
const cropYSlider=document.getElementById('cropy');
const cropYValue=document.getElementById('cropy-value');
const cropWSlider=document.getElementById('cropw');
const cropWValue=document.getElementById('cropw-value');
const cropHSlider=document.getElementById('croph');
const cropHValue=document.getElementById('croph-value');
let aspectRatioLocked=false;
const defaultColors=[
  'ffffff',
  'ff2121',
  'ff93c4',
  'ff8135',
  'fff609',
  '249ca3',
  '78dc52',
  '003fad',
  '87f2ff',
  '8e2ec4',
  'a4839f',
  '5c406c',
  'e5cdc4',
  '91463d',
  '000000'
]
const hexKeys='0123456789abcdef';
let palette=[]
defaultColors.forEach(function(c) {
  clr=hexToRgb(c);
  palette.push({hex:c,r:clr.r,g:clr.g,b:clr.b});
});
for (let i=0;i<15;i++) {
  const color=palette[i];
  const row=document.createElement('tr');
  row.innerHTML=`
    <td><span>${hexKeys.slice(i+1,i+2)}</span></td>
    <td>#<input type="text" value="${color.hex}" data-index="${i}" class="hexInput"></td>
    <td><input type="number" value="${color.r}" min="0" max="255" data-index="${i}" class="rInput"></td>
    <td><input type="number" value="${color.g}" min="0" max="255" data-index="${i}" class="gInput"></td>
    <td><input type="number" value="${color.b}" min="0" max="255" data-index="${i}" class="bInput"></td>
  `;
  row.querySelectorAll('td').forEach(function(e) {
    const inputEl=e.querySelector('input');
    if (inputEl) {
      inputEl.addEventListener('input',onColorChange);
    }
  });
  paletteTable.appendChild(row);
}

function updateCrop() {
  const x=cropXSlider.value;
  const y=cropYSlider.value;
  const w=cropWSlider.value;
  const h=cropHSlider.value;
  image.style.objectViewBox=`xywh(${x}px ${y}px ${w}px ${h}px)`;
  if (image.width<imageCont.clientWidth&&image.height<imageCont.clientHeight) {
    const xs=imageCont.clientWidth/image.width;
    const ys=imageCont.clientHeight/image.height;
    image.style.scale=Math.min(xs,ys);
  }
  updateCropText();
}
function updateCropText() {
  cropXValue.textContent=cropXSlider.value;
  cropYValue.textContent=cropYSlider.value;
  cropWValue.textContent=cropWSlider.value;
  cropHValue.textContent=cropHSlider.value;
}
function resetCrop() {
  cropXSlider.min=0;
  cropXSlider.max=image.naturalWidth-8;
  cropXSlider.value=0;
  cropYSlider.min=0;
  cropYSlider.max=image.naturalHeight-8;
  cropYSlider.value=0;
  cropWSlider.min=8;
  cropWSlider.max=image.naturalWidth;
  cropWSlider.value=image.naturalWidth;
  cropHSlider.min=8;
  cropHSlider.max=image.naturalHeight;
  cropHSlider.value=image.naturalHeight;
  updateCrop();
}
cropXSlider.addEventListener('input',function() {
  const widthWasMax=cropWSlider.value==cropWSlider.max;
  cropWSlider.max=image.naturalWidth-cropXSlider.value;
  if (widthWasMax) {
    cropWSlider.value=cropWSlider.max;
  }
  updateCrop();
});
cropYSlider.addEventListener('input',function() {
  const heightWasMax=cropHSlider.value==cropHSlider.max;
  cropHSlider.max=image.naturalHeight-cropYSlider.value;
  if (heightWasMax) {
    cropHSlider.value=cropHSlider.max;
  }
  updateCrop();
});
cropWSlider.addEventListener('input',function() {
  updateCrop();
});
cropHSlider.addEventListener('input',function() {
  updateCrop();
});
[cropXSlider,cropYSlider,cropWSlider,cropHSlider].forEach(function(e) {
  e.addEventListener('change',updateImageCanvas);
});
let offscreenCanvas=document.getElementById('offscreen-canvas');
let quantizedCanvas=document.getElementById('quantized-canvas');
let ctx=quantizedCanvas.getContext('2d');

function updatePalette(forceUpd=false) {
  let index=0;
  let upd=forceUpd;
  paletteTable.querySelectorAll('tr').forEach(function(tr) {
    const [keyTd,hexTd,rTd,gTd,bTd]=tr.querySelectorAll('td');
    const hexIn=hexTd.querySelector('input');
    const rIn=rTd.querySelector('input');
    const gIn=gTd.querySelector('input');
    const bIn=bTd.querySelector('input');
    const color=palette[index];
    const activeEl=document.activeElement;
    let updMinor=forceUpd;
    if (hexIn==activeEl) {
      rIn.value=color.r;
      gIn.value=color.g;
      bIn.value=color.b;
      updMinor=true;
    } else if (rIn==activeEl||gIn==activeEl||bIn==activeEl) {
      hexIn.value=color.hex;
      updMinor=true;
    }
    if (updMinor) {
      [keyTd,hexTd,rTd,gTd,bTd].forEach(function(e) {
        e.style.backgroundColor='#'+hexIn.value;
      });
      upd=true;
    }
    index++;
  });
  if (upd) {
    updateImageCanvas();
  }
}
  
// Passed to table inputs
function onColorChange(event) {
  const index=event.target.getAttribute('data-index');
  if (event.target.classList.contains('hexInput')) {
    palette[index].hex=event.target.value;
    const rgb=hexToRgb(event.target.value);
    palette[index].r=rgb.r;
    palette[index].g=rgb.g;
    palette[index].b=rgb.b;
  } else if (event.target.classList.contains('rInput')||event.target.classList.contains('gInput')||event.target.classList.contains('bInput')) {
    const r=document.querySelector(`.rInput[data-index="${index}"]`).value;
    const g=document.querySelector(`.gInput[data-index="${index}"]`).value;
    const b=document.querySelector(`.bInput[data-index="${index}"]`).value;
    palette[index].r=parseInt(r);
    palette[index].g=parseInt(g);
    palette[index].b=parseInt(b);
    palette[index].hex=rgbToHex(parseInt(r),parseInt(g),parseInt(b));
  }
  updatePalette();
}

function hexToRgb(hex) {
  let r=0,g=0,b=0;
  if (hex.length===3) {
    r=parseInt(hex[0]+hex[0],16);
    g=parseInt(hex[1]+hex[1],16);
    b=parseInt(hex[2]+hex[2],16);
  } else if (hex.length===6) {
    r=parseInt(hex[0]+hex[1],16);
    g=parseInt(hex[2]+hex[3],16);
    b=parseInt(hex[4]+hex[5],16);
  }
  return {r,g,b};
}

function rgbToHex(r,g,b) {
  return `${((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1).toUpperCase()}`;
}


function updateImageCanvas() {
  if (!image.src) {
    return;
  }
  const width=widthRange.value;
  const height=heightRange.value;
  const cropx=cropXSlider.value;
  const cropy=cropYSlider.value;
  const cropw=cropWSlider.value;
  const croph=cropHSlider.value;
  console.log(cropx,cropy,cropw,croph);
  offscreenCanvas.width=width;
  offscreenCanvas.height=height;
  const offscreenCtx=offscreenCanvas.getContext('2d');
  offscreenCtx.clearRect(0,0,offscreenCanvas.width,offscreenCanvas.height);
  offscreenCtx.drawImage(image,cropx,cropy,cropw,croph,0,0,offscreenCanvas.width,offscreenCanvas.height);
  quantizeImage();
}

function defaultOutputRes() {
  if (image.width<160&&image.height<120) {
    widthRange.value=image.width;
    heightRange.value=image.height;
  } else {
    widthRange.value=160;
    heightRange.value=120;
  }
  heightValue.textContent=heightRange.value;
  widthValue.textContent=widthRange.value;
}

function quantizeImage() {
  const width=widthRange.value;
  const height=heightRange.value;
  quantizedCanvas.width=width;
  quantizedCanvas.height=height;

  const imageData=offscreenCanvas.getContext('2d').getImageData(0,0,offscreenCanvas.width,offscreenCanvas.height);
  const data=imageData.data;
  const quantizedData=new Uint8ClampedArray(width*height*4); // RGBA data

  for (let i=0;i<data.length;i+=4) {
    const r=data[i];
    const g=data[i+1];
    const b=data[i+2];
    const a=data[i+3];
    // Find the nearest color in the palette
    if (a==0) {
      quantizedData[i]=0;
      quantizedData[i+1]=0;
      quantizedData[i+2]=0;
      quantizedData[i+3]=0;
      continue;
    }
    const closestColor=findClosestPaletteColor(r,g,b);

    // Set the pixel in the quantized data array
    quantizedData[i]=closestColor.r;
    quantizedData[i+1]=closestColor.g;
    quantizedData[i+2]=closestColor.b;
    quantizedData[i+3]=255; // Full opacity
  }

  // Draw the quantized image to the canvas
  const quantizedImageData=new ImageData(quantizedData,width,height);
  ctx.imageSmoothingEnabled=false;
  //ctx.scale(4,4);
  ctx.putImageData(quantizedImageData,0,0);
  // Update the text output area with the pixel data
  updateTextOutput();
}

// Find the closest color in the palette
function findClosestPaletteColor(r,g,b) {
  let minDistance=Infinity;
  let closestColor=palette[0];
  palette.forEach(function(color) {
    const distance=Math.sqrt(
      Math.pow(r-color.r,2)+Math.pow(g-color.g,2)+Math.pow(b-color.b,2)
    );
    if (distance<minDistance) {
      minDistance=distance;
      closestColor=color;
    }
  });
  return closestColor;
}

function updateTextOutput() {
  const width=widthRange.value;
  const height=heightRange.value;
  const imageData=offscreenCanvas.getContext('2d').getImageData(0,0,offscreenCanvas.width,offscreenCanvas.height);
  const data=imageData.data;

  let output='';
  for (let y=0;y<height;y++) {
    for (let x=0;x<width;x++) {
      const index=(y*width+x)*4;
      const r=data[index];
      const g=data[index+1];
      const b=data[index+2];
      const a=data[index+3];
      if (a==0) {
        output+='.';
        continue;
      }
      const closestColor=findClosestPaletteColor(r,g,b);
      const colorIndex=palette.indexOf(closestColor)+1;
      output+=colorIndex.toString(16);
    }
    output+='\n';
  }
  outputText.rows=Math.min(40,height+2);
  outputText.cols=Math.min(40,width);
  outputText.textContent='img`\n'+output+'`';
}

copyButton.addEventListener('click',function() {
  outputText.focus();
  outputText.select();
  document.execCommand('copy');
  outputText.setSelectionRange(0,0);
  copyButton.textContent='Copied!';
  setTimeout(function() {
    copyButton.textContent='Copy';
  },3000);
});

resetPaletteButton.addEventListener('click',function() {
  let palette=[]
  defaultColors.forEach(function(c) {
    clr=hexToRgb(c);
    palette.push({hex:c,r:clr.r,g:clr.g,b:clr.b});
  });
  updatePalette();
  quantizeImage();
});

imageUpload.addEventListener('change',(e)=>{
  const file=e.target.files[0];
  if (file) {
    const reader=new FileReader();
    reader.onload=function(event) {
      image.src=event.target.result;
      image.addEventListener('load',function() {
        widthRange.max=160;
        heightRange.max=120;
        defaultOutputRes();
        resetCrop();
        updateImageCanvas();
        updateLockAspectRatio();
      });
    };
    reader.readAsDataURL(file);
  }
});

widthRange.addEventListener('change',function() {
  updateImageCanvas();
});

heightRange.addEventListener('change',function() {
  updateImageCanvas();
});


heightRange.addEventListener('input',function() {
  if (aspectRatioLocked) {
    const aspectRatio=image.width/image.height;
    widthRange.value=Math.round(heightRange.value*aspectRatio);
    widthValue.textContent=widthRange.value;
  }
  heightValue.textContent=heightRange.value;
});
widthRange.addEventListener('input',function() {
  if (aspectRatioLocked) {
    const aspectRatio=image.width/image.height;
    heightRange.value=Math.round(widthRange.value/aspectRatio);
    heightValue.textContent=heightRange.value;
  }
  widthValue.textContent=widthRange.value;
});

function updateLockAspectRatio() {
  aspectRatioLocked=lockAspectRatio.checked;
  if (aspectRatioLocked) {
    const aspectRatio=image.width/image.height;
    if (aspectRatio>4/3) {
      widthRange.max=160;
      heightRange.max=Math.round(widthRange.max/aspectRatio);
      if (image.naturalWidth<160&&image.naturalHeight<120) {
        heightRange.value=image.naturalHeight;
      } else {
        heightRange.value=16;
      }
      widthRange.value=Math.round(heightRange.value*aspectRatio);
    } else {
      heightRange.max=120;
      widthRange.max=Math.round(heightRange.max*aspectRatio);
      if (image.naturalWidth<160&&image.naturalHeight<120) {
        widthRange.value=image.naturalWidth;
      } else {
        widthRange.value=16;
      }
      heightRange.value=Math.round(widthRange.value/aspectRatio);
    }
  } else {
    widthRange.max=160;
    heightRange.max=120;
    defaultOutputRes();
  }
  widthValue.textContent=widthRange.value;
  heightValue.textContent=heightRange.value;
  updateImageCanvas();
}
lockAspectRatio.addEventListener('change',updateLockAspectRatio);

// Initialize the Palette
updatePalette(true);
