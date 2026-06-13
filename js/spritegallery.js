const gallery=document.getElementById('gallery');
const defaultColors=[
  '00000000',
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
function hexToRgb(hex) {
  let r=0,g=0,b=0,a=255;
  if (hex.length===3||hex.length===4) {
    r=parseInt(hex[0]+hex[0],16);
    g=parseInt(hex[1]+hex[1],16);
    b=parseInt(hex[2]+hex[2],16);
    if (hex.length===4) {
      a=parseInt(hex[3]+hex[3],16)
    }
  } else if (hex.length===6||hex.length===8) {
    r=parseInt(hex[0]+hex[1],16);
    g=parseInt(hex[2]+hex[3],16);
    b=parseInt(hex[4]+hex[5],16);
    if (hex.length===8) {
      a=parseInt(hex[6]+hex[7],16)
    }
  }
  return {r,g,b,a};
}
const hexKeys='0123456789abcdef';
let palette=[]
defaultColors.forEach(function(c) {
  clr=hexToRgb(c);
  palette.push({hex:c,r:clr.r,g:clr.g,b:clr.b,a:clr.a});
});

function createCanvas(pixelInfo) {
  const container=document.createElement('div');
  container.classList.add('canvas-container');
  const label=document.createElement('div');
  label.classList.add('canvas-label');
  label.textContent=(pixelInfo.label||'Untitled')+`\n(${pixelInfo.width}×${pixelInfo.height})`;
  const canvas=document.createElement('canvas');
  canvas.width=parseInt(pixelInfo.width);
  canvas.height=parseInt(pixelInfo.height);
  const ctx=canvas.getContext('2d');
  let compressedString=pixelInfo.string.replace(/\s/g,'')
  const pixels=new Uint8ClampedArray(compressedString.length*4);
  for (let i=0;i<compressedString.length;i++) {
    const c=compressedString.charAt(i); 
    let index=hexKeys.indexOf(c);
    if (index===-1) {
      index=0;
    }
    const color=palette[index];
    pixels[i*4]=color.r;
    pixels[i*4+1]=color.g;
    pixels[i*4+2]=color.b;
    pixels[i*4+3]=color.a;
  }
  ctx.imageSmoothingEnabled=false;
  const imgData=new ImageData(pixels,canvas.width);
  ctx.putImageData(imgData,0,0);
  container.appendChild(label);
  container.appendChild(canvas);
  gallery.appendChild(container);
  container.addEventListener('click',function() {
    let copyTarget=document.createElement('textarea');
    copyTarget.textContent=`img\`${pixelInfo.string}\``;
    console.log(copyTarget.textContent);
    gallery.appendChild(copyTarget);
    copyTarget.focus({preventScroll:true});
    copyTarget.select();
    copyTarget.setSelectionRange(0,0);
    document.execCommand('copy');
    copyTarget.remove();
    label.textContent='Copied!';
    setTimeout(function() {
      label.textContent=(pixelInfo.label||'Untitled')+`\n(${pixelInfo.width}×${pixelInfo.height})`;
    },3000);
  });
}

function sortCanvases() {
  const children=Array.from(gallery.children);
  children.sort(function(a,b) {
    const textA=a.querySelector('.canvas-label')?.textContent.trim()??'';
    const textB=b.querySelector('.canvas-label')?.textContent.trim()??'';
    return textA.localeCompare(textB);
  });
  children.forEach(function(child) {
    gallery.appendChild(child);
  });
}

/*
document.addEventListener('DOMContentLoaded',function() {
  fetch('/spritegallery/get')
  .then(response=>response.json())
  .then(data=>{
    gallery.innerHTML='';
    if (data&&data.length) {
      data.forEach(function(image) {
        createCanvas(image);
      });
      sortCanvases();
    } else {
      gallery.innerHTML='<p>No images found.</p>';
    }
  })
  .catch(function(error) {
    console.error('Error fetching images:',error);
    gallery.innerHTML='<p>Error fetching images.</p>';
  });
});
*/
data=[
  {
    "height": 40,
    "label": "[DELTARUNE] Jevil Dance",
    "string": ".............................fff.............\n....................fff...fffffff............\n..................ff666f.fffffffff...........\n.................f666666fffffffffff..........\n................fff66666ffffffffffff.........\n...............f5f..f666ffffffffffff.........\n................f....f66fffffffffffff........\n.....................fffffffffffffffff.......\n....................ff999996ffffff.fff.......\n................ff.f9f9999999ffff9f.f5f......\n................f6ff9ff999f999ff99f..f.......\n................f6f9ffff99ff99ff99f..........\n.ff...ff........f6f99ff99ffff99f6f...........\nf66ff.f6f........ff9f99999f99f9fff...........\nf6666ff6f.........f9f9999999f99fff...........\nf6666666f.........f9f5f99f5ff9fff............\n.f666666f..........f99ffffff99ff.............\n..ff6666ffff....fff5f99ffff99ffffff..........\n...ffffffffffff.f555ff999996ff55f55f.........\n.......ffffffffffff5f5fffff555f5fff..........\n.........ffffffffffff555f55ffffff............\n...........fffffffffffffffffffffff...........\n.............fffffffff6fffffffffff...........\n................ffff66fffffffffffff.fffffffff\n................fff6666ffffffffffff.f6666666f\n................ff666fff66fffffffff.ffff6ffff\n................f6666ff6666fffffffff....f6f..\n................f666ff666666ffffffff....f6f..\n...........ffff..f66fff666666ffffffff...f6f..\n..........f555ff..f6ff6666666fcfffffff..f6f..\n..........f5555ff.fffffffffffffffcff...f66f..\n...........f555ffffffffffffffffffcfffff66f...\n............f55f99fffff...fffff..f666666f....\n.............f5f9999ff.....ffff...ffffff.....\n..............fff999f......f96ff.............\n...............ff99f.......f9999ff...........\n................fff........fffff55fff........\n...........................fffff55555f.......\n..............................ffff555f.......\n..................................fff........",
    "width": 45
  },
  {
    "height": 40,
    "label": "[DELTARUNE] Jevil Idle",
    "string": ".........................fff..............\n.......................ffffff.............\n................fff...ffffffff............\n...............f666f.ffffffffff...........\n..............f66666ffffffffffff..........\n.............f666666ffffffffffff..........\n............fff.f666fffffffffffff.........\n...........f5f...f66fffffffffffff.........\n............f....fffffffffffffffff........\n................ff999996ffffff..f5f.......\n............ff.f699999f99ffff9f..f........\n............f6ff9f9999ff99ff99f...........\n............f6f99ff99ffff9ff99f...........\n............f6f9ffff9ff9999f6f............\n.............ff99f9999f99f9fff............\n..............f9f999999ff99fff............\n..............f965f99f5ff9fff.............\n...............f99ff5fff99ff..............\n.............ff5f99ffff99ffffff...........\n............f555ff999996ff55f55f..........\n............fff5f5fffff555f5fff...........\n.ffff...ff.ffffff555f55ffffff.............\nf6666f.f6f.fffffffffffffffffff............\nf66666f66f.6ffffff6fffffffffff............\n.f6666666f.fffff66fffffffffffff..fffffffff\n..ff6666fffffff6666ffffffffffff..f6666666f\n....fffffffffff66ffff6fffffffff..ffff6ffff\n.......ffffff6f666fff66fffffffff....f6f...\n.........fff.6f6666ff666ffffffff....f6f...\n..............6f66fff6666ffffffff...f6f...\n...............6ff66ff666fafffffff..f6f...\n................fffffffffffffaff...f66f...\n................fffffffffffffafffff66f....\n.................ffffffffff..f666666f.....\n..................ffff.ffff...ffffff......\n..................f69f.f96ff..............\n.............fffff999f.f9999fffff.........\n............f55555ffff.fffff55555f........\n............f55555ffff.fffff55555f........\n............ffffff........fffffff.........",
    "width": 42
  },
  {
    "height": 40,
    "label": "[DELTARUNE] Jevil Teleport",
    "string": ".........................fff..............\n.......................ffffff.............\n................fff...ffffffff............\n...............f666f.ffffffffff...........\n..............f66666ffffffffffff..........\n.............f666666ffffffffffff..........\n............fff6f666fffffffffffff.........\n...........f5f..ff66fffffffffffff.........\n...........ff....fffffffffffffffff........\n............f...ff999996fffffffff5f.......\n............ff.f69f999f99ffff9f.fff.......\n............f6ff9f5f9fff99ff99f...........\n............f6f9ffff9f5ff9ff99f......fff..\n............f6f99ff999ff999f6f......f666f.\n.ff...ff.....ff9f999999f9f9fff.....f6666f.\nf66ff.f6f.....f95f599f5f599fff..ffff666f..\nf6666ff6f.....f9ff5f5f5ff9fff...f666666f..\nf6666666f.....f9fffffffff9ff.....f6666f...\n.f666666f.....f9fff6f6fff9f......fff6f....\n..ff6666ff..ffff9ff666ff9ffffffffffff.....\n...ffffffff.f555f9f666f9ff55f55fffff......\n......fffffffff5fff666ff55f5fffffff.......\n.......ffffffffff5f666ffffffffffff.fff....\n........fffffffffff666ffffffffff..f666ff..\n.........ffffffffff666fffffffff....ff666ff\n...........fffff66ff6ffff66ffff.....f6ff6f\n............fff6666fff666666ffff....f6f.ff\n............fff66ffff6666666ffff...f6ff...\n............f6f666fff6666666ffffffff6f....\n.............6f6666ff6666666ffff6666f.....\n..............6f66fff666666fffffffff......\n........ffff...6ff66ff6666affff...........\n.......f5555f..fffffffffffffffff.ffff.....\n........f5555ffffffffffffffffffff5555f....\n.........f555f99fffff...fffff99f5555f.....\n..........f55f999ff.......ff999f555f......\n...........f5ff9ff.........f9fff55f.......\n............fffff...........ffff5f........\n.............ff..............ffff.........\n..............................ff..........",
    "width": 42
  },
  {
    "height": 34,
    "label": "[DELTARUNE] Lancer",
    "string": "..............fff.............\n.............ff6ff............\n............ff666ff...........\n...........ff66666ff..........\n..........ff666f666ff.........\n.........ff6666ff666ff........\n........ff6666ffff666ff.......\n........f6666ffffff666ff......\n.......ff666ffffffff666f......\n.......f666ffffffffff66ff.....\n.......f66ffffffffffff66f.....\n.......f66ffffffffffff66ff....\n.......f6cfffff1f1fff1c6cf....\n.......fc11fff1ff111111cff....\n.......fc1111111111f111cf.....\n.......ffc111f111ff111cff.....\n.fffff..ffc111fff6611cff......\nff666ff.ffff11116661fffff.....\nf66611fff111ffffffff1111ff....\nffff111f11111cccccc111111ff...\n...f111111cccc6ccccccc1111ff..\n...ff1111cccc666ccccccf1111ff.\n....fffffccc66666ccccccf1111f.\n........fcc6666666cccccff111ff\n........fcc6666666cccccfff166f\n........fcccc6cc66cccccf.f666f\n........ffccc6ccccccccff.ff66f\n........f1ccccccccc111ff..ffff\n........f11cccccc111111ff.....\n........f11111ffff111111f.....\n.......ffcc11ff..fff111cfff...\n......ff66ccff.....ffcc666ff..\n......f66666f.......ff66666f..\n......fffffff........fffffff..",
    "width": 30
  },
  {
    "height": 42,
    "label": "[DELTARUNE] Papyrus",
    "string": "........fffffffff........\n.......ff1111111ff.......\n.......f111111111f.......\n.......f111111111f.......\n.......f11f111111f.......\n.......f11f111f11f.......\n.......f11f111f11f.......\n.......ff1f111f1ff.......\n........f111f111f........\n........fff111fff........\n.........f1fff1f.........\n...fffff.f1f1f1f.fffff...\n..ff222fff1f1f1fff222ff..\nfff1ff22f1fffff1f22ff1fff\nf11111f22f11111f22f11111f\nf11111ff22fffff22ff11111f\nffffff11f2222222f11ffffff\n.f555ff11f22f22f11ff555f.\n.ffffff111f2f2f111ffffff.\n..fffff1111f1f1441fffff..\n..ffffff111111111ffffff..\n..ffff.fff11111fff.ffff..\n..ffff...fffffff...ffff..\n..ffff...f5f5f5f...ffff..\n..f55f...fffffff...f55f..\n..ffff...fffffff...ffff..\n..f22ff..fffffff..ff22f..\n..f222ffff5fff5ffff222f..\n..f22f2ff6f555f6ff2f22f..\n..ff2fffff6fff6fffff2ff..\n...f2ff.fff666fff.ff2f...\n...ff2f.fffffffff.f2ff...\n....fff.fffffffff.fff....\n........fffffffff........\n........f22fff22f........\n........fffffffff........\n........f22fff22f........\n........fffffffff........\n.....ffff22fff22ffff.....\n.....f222f2fff2f222f.....\n.....f22222fff22222f.....\n.....fffffffffffffff.....",
    "width": 25
  },
  {
    "height": 40,
    "label": "[DELTARUNE] Ralsei",
    "string": ".....fff.....fff.....\n....ff3f.....f3ff....\n...ff3fffffffff3ff...\n...f33ff3111fff33f...\n...f33ff11111ff33f...\n...f3313131111133f...\n..ff3113331311111ff..\n..f311111331111113ff.\n.ff111111111111111ff.\n.f111116ff1ff611111f.\n.f1111fff111fff1111f.\n.f116611f161f116611f.\n.f111611f161f116111f.\n.f11116116161161111f.\n.f111f366111663f111f.\n.f111f111111111f111f.\n.f1111f1f11f11f1111f.\n.ff111331ff1133111ff.\n..f111133333331111f..\n.fff3113333331113fff.\nffcff3f333333fffffcff\nfcff333ffffffcccfffcf\ncfff333f66f666ccffffc\ncff333f6fffff66cffffc\ncff333f6fffff66ccfffc\nfcffff666fff6666cffcf\nfffccc6666f66666ccfff\n.ffcc66666666666ccff.\nffcc6666666666666ccff\nfcc666666666666666ccf\nfff666666666666666fff\n..fffc666666666cfff..\n....fffffffffffff....\n.....fc333c333cf.....\n.....fc111c111cf.....\n...fffc111c111cfff...\n..ffcc1111c1111ccff..\n..fc111111c111111cf..\n..fc1c1c1cfc1c1c1cf..\n..ffcccccfffcccccff..",
    "width": 21
  },
  {
    "height": 43,
    "label": "[DELTARUNE] Ralsei Hat",
    "string": ".........fff...........\n........ff7ff..........\n........f777f..........\n.......ff777ff.........\n.......f77777f.........\n....ffff77777ffff......\n....f76f77777f67f......\n...ff77677777677ff.....\nffff7777777777777fffff.\nf7777777fff7f77777777f.\nff77777ffffff7777776ff.\n.ff666666ffff666666ff..\n..f6ffff6ffff6fffff6f..\n.ff6fffffffffffffff6ff.\n.f6ffff66fffff66ffff6f.\n.f6fff6ff6fff6ff6fff6ff\nff6ff6ff1f666f1ff6fff6f\nf6fff6ff1f6f6f1ff6fff6f\n6fffff6ff6fff6ff6fffff6\nf6fffff66fffff66fffff6f\n6fffffffffffffffffffff6\nf66f6ffff6fff6ffff6f66f\nfff6f6f333333333f6f6fff\n..fff633333333333ffff..\n....ff33333333333f.....\n.....ff333333333ff.....\n....ff3ff33333666f.....\n....f333666666666f.....\n....f333777677766ff....\n...ff3337ff7ff7666f....\n...f33367fffff7666ff...\n...f333777fff777666f...\n..ff3337777f7777666ff..\n.ff66677777777777666ff.\nff6667777777777777666ff\nf666777777777777777666f\nfff77767677777767777fff\n..fffff77f766f667ffff..\n......ffffffffffff.....\n....fff6ff6f6ff6fff....\n...ff66fff6f6fff66ff...\n...f6fffff6f6fffff6f...\n...f666666fff666666f...",
    "width": 23
  },
  {
    "height": 57,
    "label": "[DELTARUNE] Rouxls Kaard",
    "string": "......................888......................\n.....................81118.....................\n....................8111118....................\n...................811111118...................\n..................81118111118..................\n..................81188111118..................\n.................811188811118..................\n.................8118888811118.................\n................81118888888118.................\n................811181888181118................\n................811818181818118................\n................818118888811818................\n...............81118888888881118...............\n...............81118888888881118...............\n..............8111188188818811118..............\n.............811111881118188111118.............\n..............8811118811888111188..............\n.............881181118818811181188.............\n............81118111118881111181118............\n.............888811188181881118888.............\n...............81188888188888118...............\n..8.8.........8818888188818888188.........8.8..\n.81818.88....818888118888811888818....88.81818.\n8181818118..81881118888888881118818..8118181818\n8181811818..81118888888888888881118..8181181818\n8188881818..88888881188888118888888..8181888818\n.818888818.8188818888811188888188818.818888818.\n..8188888181888818888888888888188881818888818..\n...81888881888881881888888818818888818888818...\n....818888888888188881181188881888888888818....\n.....8188888881881888888888881881888888818.....\n......818888818.818188888881818.818888818......\n.......8188818..818881818188818..8188818.......\n........81818...818888888888818...81818........\n.........818.....8188888888818.....818.........\n..........8......8188811188818......8..........\n.................8118888888818.................\n................818818888888818................\n................818881888888818................\n................818888188888818................\n................818888818888818................\n.................8188888188818.................\n.................8188881818818.................\n.................8188881881818.................\n.................8188881888118.................\n.................8188881888818.................\n..................81888188818..................\n..................81888188818..................\n..................81888188818..................\n..................81888188818..................\n..................81888188818..................\n..................81888188818..................\n..................81888188818..................\n.................8188881888818.................\n................818881181188818................\n................8111188.8811118................\n.................8888.....8888.................",
    "width": 47
  },
  {
    "height": 30,
    "label": "[DELTARUNE] Sans",
    "string": "......fffffffffff......\n....fff111111111fff....\n....f1111111111111f....\n...ff1111111111111ff...\n...f111111111111111f...\n...f11fff11111fff11f...\n...f11fff11111fff11f...\n...f11fff11f11fff11f...\n...ff11111fff11111ff...\n...ff1f111111111f1ff...\n...f11fffffffffff11f...\n...f111f1f1f1f1f111f...\n...fff11fffffff11fff...\n..ffffff1111111ffffff..\n..f6fffffffffffffff6f..\n.ff6fddf111f111fddf6ff.\nff666fddfff1fffddf666ff\nf66ff6fff11f11fff6ff66f\nf6666f66f11111f66f6666f\nf66666f6ff111ff6f66666f\nff666f66f11111f66f666ff\n.fff6f66fffffff66f6fff.\n...fff66fffffff66fff...\n....fffffffffffffff....\n.....ffffff.ffffff.....\n.....fffff...fffff.....\n....ffffff...ffffff....\n..fff1111f...f1111fff..\n..f11111ff...ff11111f..\n..fffffff.....fffffff..",
    "width": 23
  },
  {
    "height": 34,
    "label": "[DELTARUNE] Spamton",
    "string": ".........bbbbbbb.......bb\n.......bbfffffffbbbbbbbfb\n......bffffffffffffffffb.\n.....bfffffffffffffffbbbb\n.....bffffffffffffffffffb\n......bff11111111fffffbb.\n.......fb111111111fffbb..\n.......ffff1ffff111ffffb.\n......f3333f5555f11ffbb..\n......f3333f5555ffffb....\n......f3333f5555f11f.....\n.......ffff1ffff1111.....\n......b2ff1111122111..bb.\n....bb111111111f2111.bffb\n.bbb1111111111ff111ffffbb\nbbbbbbfffffffff111ffffb..\n......b11f1111f111fffb...\n........11ffff111ffbb....\n.......bf1f11f111fb......\n......bff1ffff11fffb.....\n.....bfff1111111fffb.....\n.....bffffffffffffffb....\n....bfffffb111bfffffb....\n...bfffffffb1bfffbfffb...\n..bfffbfffffbffffbbffb...\nbb1bfb.bfffffffffb.bffb..\nb11fb..bffffffffb..bfb1b.\n.bbb....bfffffffb...bf11b\n........bfffffffb....bbbb\n.........bfffffb.........\n.........bf1111b.........\n..........b1f11b.........\n..........b1f1b..........\n...........bbbb..........",
    "width": 25
  },
  {
    "height": 43,
    "label": "[DELTARUNE] Water Cooler",
    "string": "....ccccccccccc............\n...c66666666666c...........\n..c6699999999966c..........\n.c669999999999966c.........\n.c666999999999666c.........\n.c666666666666666c.........\n..c6666666666666c..........\n..c6966666666696c..........\n..c6699999999966c..........\n..c6666666666666c..........\n..c6666666666666c..........\n..c6666666666666c.....cccc.\n..c6666666666666c.....c99c.\n.c669666666666966c....c66c.\n.c666999999999666c....c99c.\n.c666666666666666c....c66c.\n..c6666666666666c.....c99c.\n.c669666666666966c....c66c.\n.c666999999999666c....c66c.\n.c666666666666666c...cddddc\ncdc6666666666666cdc..cddddc\ncddcc666666666ccddc.ccddddc\ncddddcccccccccddddccdcddddc\ncdddddddddddddddddcddcddddc\ncdddddddddddddddddcddcddddc\ncdddddddddddddddddcddcddddc\ncdddddddddddddddddcddcddddc\ncdddddddddddddddddcddcddddc\ncdddddddddddddddddcddcddddc\ncdddcccccccccccdddcddcddddc\ncddcdddddddddddcddccdcddddc\ncddcdddddddddddcddc.ccddddc\ncddcdd22ddd66ddcddc..cddddc\ncddcddccdddccddcddc..cddddc\ncddcddccdddccddcddc..cccccc\ncddcdddcdddcdddcddc...c66c.\ncddcdddddddddddcddc...c66c.\ncddcdddddddddddcddc....cc..\ncddcdddddddddddcddc........\n.cdcccccccccccccdc.........\n.cdcdddddddddddcdc.........\n..cdddddddddddddc..........\n...ccccccccccccc...........",
    "width": 27
  },
  {
    "height": 16,
    "label": "[Galaga] Boss Galaga (1/2)",
    "string": "......6.6......\n......6.6......\n...664464466...\n....6446446....\n.....66666.....\n....6556556....\n..66655555666..\n666665555566666\n.6666555556666.\n.6466.4.4.6646.\n6646..4.4..6466\n6466.......6646\n6446.......6446\n6446.......6446\n6666.......6666\n.66.........66.",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Boss Galaga (2/2)",
    "string": "......6.6......\n......6.6......\n...664464466...\n....6446446....\n.....66666.....\n....6556556....\n..66655555666..\n666665555566666\n.6666555556666.\n..66..4.4..66..\n..66..4.4..66..\n..666.....666..\n...66.....66...\n....66...66....\n.....66.66.....\n......6.6......",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Enterprise",
    "string": ".....66166.....\n....6661666....\n...666616666...\n...666222666...\n...662212266...\n...666222666...\n.1.666626666.1.\n.66.6666666.66.\n.66..66266..66.\n.662...2...266.\n.6622.626.2266.\n.6622262622266.\n.66.2266622.66.\n.66..26662..66.\n......161......\n......161......",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Galaxian Flagship",
    "string": "...............\n...............\n.......e.......\n..8...eee...8..\n..8..eeeee..8..\n..85ee5e5ee58..\n..85555e55558..\n..88555555588..\n...885.5.588...\n....88.5.88....\n.....8.5.8.....\n.......5.......\n.......5.......\n...............\n...............\n...............",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Goei (1/2)",
    "string": "...............\n...............\n...............\n...2.......2...\n.222..8.8..222.\n.222.12121.222.\n.222.11111.222.\n..22221112222..\n...222888222...\n..22228882222..\n.2222211122222.\n..222.888.222..\n....2..8..2....\n...............\n...............\n...............",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Goei (2/2)",
    "string": "...............\n...............\n...............\n...2.......2...\n...2..8.8..2...\n...2.12121.2...\n...2.11111.2...\n...222111222...\n.....28882.....\n...222888222...\n...222111222...\n...22.888.22...\n...22..8..22...\n...............\n...............\n...............",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Gyaraga",
    "string": ".......1.......\n.......1.......\n.......1.......\n......111......\n......111......\n...2..111..2...\n...2..111..2...\n...1.11111.1...\n2..181121181..2\n2..811222118..2\n1..111212111..1\n1.11111111111.1\n111112111211111\n111.2211122.111\n11..22.1.22..11\n1......1......1",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Midori",
    "string": "...............\n...............\n.......7.......\n.......7.......\n.....33733.....\n....3377733....\n....3772773....\n...777727777...\n...777222777...\n..77777777777..\n..77..777..77..\n..7....7....7..\n..7....7....7..\n.......7.......\n...............\n...............",
    "width": 15
  },
  {
    "height": 15,
    "label": "[Galaga] Momiji (1/3)",
    "string": "....22..........\n.....22....61...\n.....222..611...\n.....2226611....\n2222..266111....\n.2222266611.....\n..22222611122...\n.....2211112222.\n.....61222..2222\n.....611222.....\n....6...222.....\n.6.6....2222....\n..6......222....\n.6.6.....2222...\n6..........22...",
    "width": 16
  },
  {
    "height": 15,
    "label": "[Galaga] Momiji (2/3)",
    "string": ".........22.....\n.........2261...\n........22611...\n22222...2611....\n.222222.6611....\n..222226611.....\n....222611122...\n......661112222.\n.....61222122222\n.....62222......\n....6.2222......\n.6.6..2222......\n..6...2222......\n.6.6..222.......\n6......22.......",
    "width": 16
  },
  {
    "height": 15,
    "label": "[Galaga] Momiji (3/3)",
    "string": "................\n..222......61...\n...2222...6112..\n....2222.61122..\n.....22266112...\n.......66611....\n......2266122...\n.....222212222..\n....222221.2222.\n...22222....2222\n...2222......22.\n.6.222..........\n..6.............\n.6.6............\n6...............",
    "width": 16
  },
  {
    "height": 16,
    "label": "[Galaga] Scorpion",
    "string": "...............\n...............\n...............\n......2.2......\n..9.9.2.2.9.9..\n..999..4..999..\n...99.444.99...\n...99.444.99...\n....9944499....\n......444......\n......444......\n...4...4.......\n....4..4.......\n.....44........\n...............\n...............",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Tombow",
    "string": "...............\n...............\n.....22.22.....\n......262......\n.......6.......\n666666.6.666666\n.6666666666666.\n.1111116111111.\n...111.6.111...\n.......6.......\n.......6.......\n.......6.......\n.......6.......\n.......6.......\n...............\n...............",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Zako (1/2)",
    "string": "...............\n...............\n...............\n..8....5....8..\n...8.52525.8...\n....8225228....\n.....55555.....\n....8855588....\n...888222888...\n..888.222.888..\n.8888.555.8888.\n.888..222..888.\n.888...2...888.\n...............\n...............\n...............",
    "width": 15
  },
  {
    "height": 16,
    "label": "[Galaga] Zako (2/2)",
    "string": "...............\n...............\n...............\n...8...5...8...\n...8.52525.8...\n....8225228....\n.....55555.....\n....8855588....\n....8822288....\n...88.222.88...\n...88.555.88...\n...88.222.88...\n...88..2..88...\n...............\n...............\n...............",
    "width": 15
  },
  {
    "height": 25,
    "label": "[PKMN] Absol Back",
    "string": "..........fff......\n...........fccf....\n............fcbc...\n......ccccc..ccbc..\n....cc11111cc3cbbc.\n...fb1111111bf3cbc.\n..fd111111111f3cbcc\n..fd111111111dfcccc\n.fdddd11111dddfcccc\n.fddddddddddddbcccc\ncccbdddddddddddfcc.\n.ccccdbbbbbddbf.cc.\n..fcbc11111bbcc....\n.ccfbbcbbbd111cc...\n.c1fbbcc11bbd11c...\n..cdfbcc1111bdc....\n..ccfbccc111bcc....\n...cffccf1111c.....\n...cd11ff1111c.....\n...cd11dd111dc.....\n....cd1ccc1dc......\n....ccdc.cdcc......\n...cbcdf.fdcbc.....\n...ccbbf.fbbcc.....\n....cfff.fffc......",
    "width": 19
  },
  {
    "height": 25,
    "label": "[PKMN] Absol Front",
    "string": "......fff.........\n....fccf..........\n...cbcf...........\n..cbcc..ccccc.....\n.cbbc3cc11111cc...\n.cbc3fb11111111c..\nccbc3f111111111dc.\nccccfd111dcd111dc.\nccccfddd1cbc1ddddb\ncccccbdddcbcdddddc\n.fcccfdddcccdddddc\n.ff.fccddbcbddbddf\n....cfffdddddfcddf\n...cddf1fcccf1fdc.\n....cbfdecccedcdfc\n...cdddcccccccdfbc\n...ccddddfffdffddc\n....cdddddddddddc.\n....ffbdbdddbdbfc.\n.....cfcbdddbcfc..\n......cdfcdcfdc...\n.....cdddcccdddc..\n.....ccdcc.ccdcc..\n.....cccff.ffccc..\n.......ff...ff....",
    "width": 18
  },
  {
    "height": 23,
    "label": "[PKMN] Absol Side",
    "string": "...................ccc....\n.................cccf.....\n................cbcf......\n...............fbbcfff....\n..............fbbc1111cc..\n..............cbc111111dc.\nccc..........fcbc111111cbc\n.cccc........fccc111111ccc\n..fcbc.......fcccc11111dcc\n...fbbc.....ccccccd11111c.\n...fbbcc...fddfccccfdb1cc.\n....fbcc....cdcfdccccdfccf\n....fbccc..cdddddffcc1eccc\n....ffccfccbcfddddddccccc.\n.......ffd1dd1cddddccccc..\n.......cf11111ccddddbf....\n.......c1111111dcdddc.....\n......cdd11d11dddccdf.....\n.....ccddddbccddddfc......\n.....cddbccc..ccddc.......\n.....cdbf.......cdbf......\n.....fddcf......fbdcf.....\n......ffff.......ffff.....",
    "width": 26
  },
  {
    "height": 39,
    "label": "[PKMN] Arceus Back",
    "string": "............cc............\n...........c11c...........\n...........c11c...........\n..........c1111c..........\n..........c1dd1c..........\n..........c1bb1c..........\n.........f1dbbd1f.........\n......cf.f1dbbd1f.fc......\n......c1f1dbbbbd1f1c......\n......c1f1dbbbbd1f1c......\n......c1bdbbbbbbdb1c......\n......fdbdbbbbbbdbdf......\n......fdbbbbbbbbbbdf......\n......fbcbbbbbbbbcbf......\n.......cbcbbbbbbcbc.......\n.......fbcbbbbbbcbf.......\n.....ee.fcbdbbdbcf.ee.....\nfe..e5e.c11d11d11c.e5e..ef\nf5ee5f...fcd11dcf...f5ee5f\n.f545f..fbbb11bbbf..f545f.\n..e545f.fbbeeeebbf.f545e..\n..e5f54f.be5555eb.f45f5e..\n.e54.f55fe5ffff5ef55f.45e.\n.f5e..e554fb11bf455e..e5f.\n.f5eeee55ebd11dbe55eeee5f.\n.f54444ffbcd11dcbff44445f.\n.f44ffef1dcbbbbcd1feff44f.\n..f4f..bb1ccddcc1bb..f4f..\n..f44e.cbddc11cddbc.e44f..\n.f44eecdcbbf11fbbcdcee44f.\nf4ef44cdbcbcffcbcbdc44fe4f\nfe..fcbddbf.cc.fbddbcf..ef\n.....fbddbf....fbddbf.....\n......bbbb......bbbb......\n......cbbf......fbbc......\n.......cbf......fbc.......\n.......c4f......f4c.......\n.......f4f......f4f.......\n.......ff........ff.......",
    "width": 26
  },
  {
    "height": 39,
    "label": "[PKMN] Arceus Front",
    "string": "............cc............\n...........c11c...........\n...........c11c...........\n..........cbddbc..........\n..........cbddbc..........\n..........cbbbbc..........\n.........fbbbbbbf.........\n......cf.fb1111bf.fc......\n......c1fb111111bf1c......\n......c1fb111111bf1c......\n......c1b111cc111b1c......\n......fdb11c54c11bdf......\n......fdcb1c54c1bcdf......\n......fbccbc54cbccbf......\n.....efcc7cc54cc7ccfe.....\nfe..e5efb62bccb26bfe5e..ef\nf5ee5f..fb6cccc6bf..f5ee5f\n.f545f...fcbccbcf...f545f.\n..e575f...ffccff...f575e..\n..e5f54ffffcffcffff45f5e..\n.e54.f5f111cccc111f5f.45e.\n.f5f..eef1cb11bc1fee..f5f.\n.f5ffeef11c1111c11feeff5f.\n.f544444f1c1111c1f444445f.\n.f44ffeebfcb11bcfbeeff44f.\n..f4f.effcbbccbbcffe.f4f..\n..f47efd1dbcbbcbd1dfe74f..\n.f44ef1111bbbbbb1111fe44f.\nf4ef44fbdbbbbbbbbdbf44fe4f\nfe..f4efcbbbbbbbbcfe4f..ef\n.....ffdcbbccccbbcdff.....\n......fdbbbfccfbbbdf......\n......cdddbffffbdddc......\n.......cddbf..fbddc.......\n.......cbbf....fbbc.......\n........cbf....fbc........\n........c4f....f4c........\n........f4f....f4f........\n........ff......ff........",
    "width": 26
  },
  {
    "height": 33,
    "label": "[PKMN] Arceus Side",
    "string": "..........................bc.......\n....................ccccccbbb......\n................ccccb11111ccc......\n......ccc...ccccbdd1111111111cc....\n.....c11dcccbbdddddd11111111111c...\n......cfb11111dbbbbd11111cc11144c..\n........fcbdbbbbbbbbb1111c1cd1455b.\n.........ffcbbbbfffcbbd11c1bcd4455c\n...........fffc.....fbbbdc11dddcc4c\n.....................fbbbcb1cccccf.\n................ee....fbbbfbc72cf..\n................ee.....cbbfbbb6bf..\n.ccc........ffe.eeee...fbbcfbbbf...\nc111ccc.....f5eee4ee...fbbbcffff...\n.cc1111bbc..f4545ee..ffbdbbc.......\n...ff111dbbb.f574eee.f111b1bc......\n.....fb11ddbbbf44555bbfb1b11c......\n......cbddddbbf54eeedf11dc11f......\n......fbbdddddf5ebdddbf11cc1f......\n.......fbbbd11f5ebdddbfbbcccf......\n........ccbb11f54eeeddbfbcccf......\n.........cb111f5e455edbcbcfbc......\n..........f111f4effebbc1dbff.......\n........ffbddbf4ecbbbcc11dff.......\n........f1bddcef4eccc..cbbdf.......\n........c11bbc.f474e...bc11f.......\n.......cb1bfc..ef4e....cdb1c.......\n.......fbbdf..f4f4e....fddbbb......\n.......fbbc...ff.f4f....cdbbc......\n.......fbbc.......ff.....fbbc......\n.......f4e...............fe4c......\n.......f4f................f4f......\n.......ff..................ff......",
    "width": 35
  },
  {
    "height": 24,
    "label": "[PKMN] Blastoise Back",
    "string": "...........cccc...........\n.........ccbbbbcc.........\n.......ffcb6666bcff.......\n......f666666666666f......\n......fb6666666666bf......\n..cf..fc6666666666cf..fc..\n.c1df.ff6666666666ff.fd1c.\nf61ddcfbb66666666bbfcdd16f\nf1dddcfbb66666666bbfcddd1f\n.fddc6cfbbb6666bbbfc6cddf.\n..ffc6ffdd111111ddff6cff..\n...cffeeeeddddddeeeeff....\n...cfeeeeeeeeeeeeeeeefc...\n..cbfeeeeeeeeeeeeeeeefc...\n..c6bfeeeeeeeeeeeeeefb6c..\n..cc6f1eeeeeeeeeeee1f6cc..\n...ccf1eeeeeffeeeee1fccc..\n.....f1eeeef66feeee1ffc...\n....fcdeeeef66feeeedcf....\n....fccdeefb66bfeedccf....\n....fcccdfcbbbbcfdcccf....\n.....fcccccbbbbcccccf.....\n.....fcccf.ffff.fcccf.....\n......fff........fff......",
    "width": 26
  },
  {
    "height": 23,
    "label": "[PKMN] Blastoise Front",
    "string": "..........cccccc..........\n.......ccc666666ccc.......\n......c666b6666b666c......\n..cf..cc6666666666cc..fc..\n.c1df.cf6666666666fc.fd1c.\nf61ddcfb6666666666bfcdd16f\nf1dddcfbb66666666bbfcddd1f\n.fddc6fb1e6b66b6e1bf6cddf.\n..ffc6fb1efb66bfe1bc6cff..\n....cfbfbbb6666bbbfbfc....\n....c66f4bb6666bb4f66c....\n...c6661f44fbbf44f1666c...\n...c6661eff4444ffe1b66bc..\n..cb66bd444ffff444dfbb1c..\n..c1bbfe4444444444ecdfc...\n...cffbc4444444444cbff....\n....fc6e4444444444e6c.....\n....c666eeeeeeeeee666c....\n....c666be444444eb666c....\n....cb66bbfeeeefbb66bc....\n.....cbbbbcffffcbbbbc.....\n.....fd1bf......fb1df.....\n......fff........fff......",
    "width": 26
  },
  {
    "height": 22,
    "label": "[PKMN] Blastoise Side",
    "string": "................ccc......\n.............fccbb6cc....\n........cc..f66bc6666cc..\n.......c6dc.fcb6666666bc.\n.......cfff.fcbb6666666c.\n.......feeefbbbbb66b66bc.\n......fc11cece4bb666c6bc.\n......f1cfdec444bd6bc666c\n.....fe6ff6ebc44b1ef6b66c\n....feef66febfe4bbbbbbbbc\n....feecffc1bcfe444bbbcbc\n....feeeccd66bcff4444ccc.\n...fefeeedb66bfeefffcc...\n...feefeedb666bf4eec.....\n...feeffdcbb661c444c.....\n.ffffefdbbfbb6cc444c.....\nf66bfffdb66ffdfeeef......\n.f66bffdb666ffc444f......\n..ffbbcfcbb66bc44f.......\n....ffffcbbbbfeff........\n.......fbdbd1bf..........\n........ffffff...........",
    "width": 25
  },
  {
    "height": 15,
    "label": "[PKMN] Bulbasaur Back",
    "string": "..cc.....cc..\n.c77ccccc77c.\n.c766ccc667c.\n.c66c7c7c66c.\n.cff77777ffc.\n.f777777777f.\nf77777777777f\nf77777777777f\nc77777777777c\n.c777777777c.\n.cc7777777cc.\nc66ccccccc66c\nf66666666666f\nf666fffff666f\n.fff.....fff.",
    "width": 13
  },
  {
    "height": 16,
    "label": "[PKMN] Bulbasaur Front",
    "string": "......ccc......\n.....c7c7c.....\n...ff77777ff...\n..f777777777f..\n.f77777777777f.\n.f7cc77777cc7f.\nc6f76ccccc67f6c\nc6f777776777f6c\n.cc777667777cc.\n.f67776677776f.\n.f61e67776e16f.\n.f6de77777ed6f.\n.cf667777766fc.\n.c6ff66766ff6c.\n.f66cfffffc66f.\n..ff.......ff..",
    "width": 15
  },
  {
    "height": 15,
    "label": "[PKMN] Bulbasaur Side",
    "string": ".....cccc..........\n..ffc7777c.ccc.....\n.f77777777ff67cc...\n.f777777cf677766c..\n.c77777c777777667c.\nc777777c677777777c.\nc777777c6677777767c\nc777777f6777777777c\n.c7777f7767771e777c\n..ffff777c777de676c\n...f677777c77777cf.\n...f6677766ccfff...\n..f6666ff666cc.....\n..f66ffcccf66f.....\n...ff......ff......",
    "width": 19
  },
  {
    "height": 24,
    "label": "[PKMN] Charizard Back",
    "string": "............eeee............\n..........eeeeeeee..........\n.........eeee44eeee.........\n........f4ee4444ee4f........\n.......f4ef444444fe4f.......\n.......ffee444444eeff.......\n........eeee4444eeee........\n........eeeeeee2eeee........\n......ff.eeee522eee.ff......\n....ef4f.eee522eeee.f4fe....\n...e4e4ef.e2522eee.fe4e4e...\n..e444e4f.e25522ee.f4e444e..\n.e444eeeeee25552eeeeeee444e.\n.e444eeeeeee255feeeeeee444e.\nf444eeeeeeeee22feeeeeeee444f\nf4e4eeeeeeeef4feeeeeeeee4e4f\nfffeeeeeeeef44feeeeeeeeeefff\n....ffe.eeef44eeeeee.eff....\n........eef444eeeeeee.......\n.......eeefe44eeeeeee.......\n.......eeefeeeeeeeeee.......\n.......eeefeeeeeeeeee.......\n........feefeeeeeeef........\n.........ff.ffff.ff.........",
    "width": 28
  },
  {
    "height": 24,
    "label": "[PKMN] Charizard Front",
    "string": "..........e......e..........\n.........e4e....e4e.........\n.........f4e....e4f.........\n.........f4eeeeee4f.........\n.........f44e44e44f.........\n.........fe4e44e4ef.........\n......ee.ee4e44e4ee.ee......\n....eeee.ee444444ee.eeee....\n...eeeeefe44444444efeeeee...\n..ee66eefed444444defee66ee..\n.ee666cef4d644446d4fec666ee.\n.ee66ccef44ce44ec44fecc66ee.\neee6ccccee44444444eecccc6eee\neecccccccfe444444efcccccccee\nee...cccfef4e44e4fefccc...ee\n........e4eebeebee4e........\n.......f4ee4effe4ee4f.......\n......ffee4d4444d4eef.......\n......feee4dddddd4eeef......\n......feee44dddd44eeef......\n......feeef444444feeef......\n.......feeef4444feeef.......\n.......fbebfeeeefbebf.......\n........fff......fff........",
    "width": 28
  },
  {
    "height": 23,
    "label": "[PKMN] Charizard Side",
    "string": "............eee.............\n............eeeee...........\n.............eeeeeee........\n...........ffeeeee44ee......\n..........ef444eee4444e.....\n.........eeeeee44444444eeee.\n........eeeffeeeee44444e444e\n.2......eff44feeeeebe444444e\n..22....f44eeefee4eddce44e4f\n...22..f4ecefefee44ed64444ef\n..222.f4e6ceffeeee444444ebf.\n.2522.f466cceeeeeee444eeff..\n25222f4e66ccceeeeeeeeff.....\n25222f46c6cccceeee4e........\n2552.f4f.cc.ceee4e4e........\n2252.ff...ceeeeee4ede.......\n.22ee.....eeee44e4ede.......\n..eeeeeeeeeee4444eede.......\n...eeeeeeeeee4444ed4e.......\n....eeeeeeeeee44ee4e........\n.....eeeeeefeeeeeee.........\n........eeefeebfe...........\n............fff.............",
    "width": 28
  },
  {
    "height": 17,
    "label": "[PKMN] Charmander Back",
    "string": "...eeeee...\n..e44444e..\n.ee44444ee.\n.e4444444e.\n.e4442444e.\nee4442444ee\nfe4442244ef\nfee42224eef\n.fe42d24ef.\n..f44dd4f..\n.f4442de4f.\n.f444e4e4f.\nee444e4e4ee\nee44e44f4ee\neee4eeefeee\n.eeeeffeef.\n..ff...ff..",
    "width": 11
  },
  {
    "height": 16,
    "label": "[PKMN] Charmander Front",
    "string": "...eeeee...\n..e44444e..\n.ee44444ee.\n.e4444444e.\n.e4e444e4e.\nee1444441ee\neec44444cee\nfec44444cef\n.fee444eef.\n.efeeeeefe.\n.fefffffef.\n.fee4d4eef.\neeffdddffee\neee4ddd4eee\neeefeeefeee\n.ff.....ff.",
    "width": 11
  },
  {
    "height": 16,
    "label": "[PKMN] Charmander Side",
    "string": "..........eeee....\n..2......e4444e...\n..2.....e444444e..\n.22.....e444444e..\n.222...e444444e4e.\n22d2...e444441e4e.\n2dd2...e44444c444e\ned2...e444444c444f\nfee...e444ee444ef.\nfeeeee444e4eeffe..\n.fee44444e44ee....\n.feeee4444ffff....\n..ffeeee44e4e.....\n....ffeeeeeee.....\n.......efeee......\n.........fff......",
    "width": 18
  },
  {
    "height": 16,
    "label": "[PKMN] Eevee Back",
    "string": "fff....ff.ff..fff\nfe4ff.f4ff4fff4ef\n.f444fe4e4ef444f.\n.fe444e444e444ef.\n..fe444444444ef..\n...fee44444eef...\n...fefffffffef...\n...ffebdddbeff...\n..febdbfffbdbef..\n..fbefffdfffebf..\n..fefefbdbfefef..\n...ffefebefeff...\n....fefeeefef....\n....feefefef.....\n.....fefffef.....\n......ff.ff......",
    "width": 17
  },
  {
    "height": 16,
    "label": "[PKMN] Eevee Front",
    "string": "........ff.......\nfff..ff.f4f...fff\nfe4fff4fe4efff4ef\n.ff44fe444ef44ff.\n.fff444444444fff.\n..fff4444444fff..\n...fee44444eef...\n...fef14441fef...\n...feffeeeffef...\n..fbfefeeefefbf..\n..fbdffefeffdbf..\n..feddbfffbddef..\n...fbbdddddbbf...\n....ffbbebbff....\n.....ffefeff.....\n......ff.ff......",
    "width": 17
  },
  {
    "height": 16,
    "label": "[PKMN] Eevee Side",
    "string": ".....fff..........\n.....feeff.f.ff...\n......feeef4f4f...\n.....fffff44e4ef..\n.....f444ff44e4ef.\n......fff44f4444f.\n.......ffff44ee44f\n..fff...feeeef1eef\nff444ffffeeeeffeef\nfdd444ffbfeeeeeef.\n.fbb4efefbfeeeff..\n..ffffeefbbfffdf..\n...feeeeefbbdddf..\n...feeeffeffbdf...\n...feff..fefff....\n....ff....ff......",
    "width": 18
  },
  {
    "height": 21,
    "label": "[PKMN] Espeon Back",
    "string": "cc.................cc\nfdcff...........ffcdf\nfddddff.......ffddddf\n.cdddddf.fff.fdddddc.\n.fddddddfdddfddddddf.\n..fddddd3ddd3dddddf..\n...f3ddddddddddd3f...\n....fcdddddddddcf....\n...cd3ddddcccdd3dc...\n..cddc3ddcdddc3cddc..\n..fdcfb3bdbbccbfcdf..\n..ff..fbdbddcbf..ff..\n......ccddffdfc......\n......cfdc33ffdc.....\n.....cdfdfb3dddc.....\n.....cddcdcbdddc.....\n.....c3d3cdb3d3c.....\n......f333b333f......\n......f33cfc33f......\n.......c3c.c3c.......\n........ff.ff........",
    "width": 21
  },
  {
    "height": 26,
    "label": "[PKMN] Espeon Front",
    "string": "..........ccc........\n.........cdddc.......\n........cdbbcc.......\n.......cdbddf........\n.......cddffdf.......\n.......fdc..fc.......\n.......fdc...........\n.......c3dc..........\n........f3c..........\ncc......cc3c.......cc\nfdcff...cdddc...ffcdf\nfddddfccdddddccfddddf\n.c63dddf3ccc3fddd36c.\n.f666dddcdddcddd666f.\n..f663d3ddddd3d366f..\n...c66ddddddddd66c...\n....ccddd3e3dddcc....\n...cd3ddde1eddd3dc...\n..cdd3c3d3e3d3c3ddc..\n..fdf3c1ddddd1c3fdf..\n..fc.f3cbdddbc3f.cf..\n.....cf33dbd33fc.....\n......cff333ffc......\n......cbbfffbbc......\n......c3c...c3c......\n.......ff...ff.......",
    "width": 21
  },
  {
    "height": 22,
    "label": "[PKMN] Espeon Side",
    "string": "..............cc.......\n.............cdc.......\n.............cdc.......\n.............cddc......\n............c3dddc.....\n...ccc..cc..c3dddc.....\n..cdddc.cdccccddddcc...\n.cdbbcc.cdddddccddddc..\ncdbddf...c63ddddcdd3ec.\ncddffdf..f666dddddde1f.\nfdc..fc...f666ddddd3ef.\nfdc........fffcddbcdddf\nfbdc........ccdddcf1ddf\n.fdc.....ccccdddddffddf\n.fbdc..ccdddfddcddddcc.\n..f33ccdddddfccddcff...\n...fb33ddddddddd3c.....\n....ffc3ddddddd3bc.....\n......fbddbccb33c......\n.....fbbbff..c33c......\n.....fbff.....fbf......\n......ff.......ff......",
    "width": 23
  },
  {
    "height": 20,
    "label": "[PKMN] Flareon Back",
    "string": "ff.....cdc.....ff\nc4cf..c44dc..fc4c\nc444f.ce44c.f444c\n.f444cecccec444f.\n.f444ce444ec444f.\n..f44e4cccce44f..\n...fe4c4ddc4ef...\n...eccdd4c4cfe...\n...cdcddddc44f...\n..ccdddddddc4ec..\n..cddddddddce4c..\n.ccddddddddedcec.\n.ce4ddd4dddddcec.\n.cecddd4ddd4dfec.\n..fc4ddd4d444fc..\n..cef4444444efc..\n...cef444444fc...\n...ceffeeecff....\n....fecccccef....\n.....ff...ff.....",
    "width": 17
  },
  {
    "height": 23,
    "label": "[PKMN] Flareon Front",
    "string": ".......cccc......\n......c4ddc......\n....ccdd4c.......\n...cdcddddc......\n...cdddddddc.....\n..c4dddddd4c.....\nffc44dd4ff44c..ff\nc4cf44cfdfcecfc4c\nc4e4fc44dc4cf4e4c\n.c44f4cdddc4f44c.\n.fc44ecddddc44cf.\n.fcc4f4ddddf4ccf.\n..fc4f4ddd4f4cf..\n..cf4f44d44f4fc..\n.cf4ccf444fcc4fc.\n.ce4fdeffcedf4ec.\n.c4f4f44444f4f4c.\n.c44f4444444f44c.\n..cd4ff4e4ff4dc..\n..c4dd4fff4dd4c..\n...cedd444ddec...\n....feeccceef....\n.....ff...ff.....",
    "width": 17
  },
  {
    "height": 20,
    "label": "[PKMN] Flareon Side",
    "string": ".........................\n............ccc....ce....\n............ceecc.cde....\n....ccccc....ceeeccddec..\n...cdddd4cc..ceeeecddd4c.\n....cdd444ffffceeec4ddddc\n...cc4ddddf4444ff44eddddc\n..c4dddddd4fcc444c44edddc\ncccddddddddfeccc44444eec.\nc44dddddddd4feccc444444e.\n.c4ddddddd44efe4444ec444c\n..c44dddd444e4fce44cf144c\n...cc444444c44ce4444cf44c\n.....f44444c444ccc4444cc.\n......ffffcec44ddccffc...\n........ceeecf444ddd4e...\n........ceeeeefeed4d4c...\n.......ceeeeeccccec4c....\n.......cecfcc....cef.....\n........ff........ff.....",
    "width": 25
  },
  {
    "height": 24,
    "label": "[PKMN] Furret Back",
    "string": "ff...........ff\nfdf.........fdf\nfddf.......fddf\n.fdef.ccc.fedf.\n.feeeceeeceeef.\n..feeeeeeeeef..\n..cfeeeeeeefc..\n.fceeeeeeeeecf.\n.feeeeeeeeeeef.\n.feeeeeeeeeeef.\n.feeeeeeeffeef.\n..feeeeef1fef..\n..fdeeff1efdf..\n..fddf1e1e1ef..\n.feedf11111fef.\n.feefd11111def.\n.fdefdd111ddff.\n.fdfeddddddeff.\n.fcfeeddddeeff.\n..ceeeeeeeefc..\n..cfdeeeeedfc..\n..ccfdddddfcc..\n..fecfcccfcef..\n...ff.....ff...",
    "width": 15
  },
  {
    "height": 26,
    "label": "[PKMN] Furret Front",
    "string": "........ff.....\n......ec1f.....\n.....fe1ef.....\n....c1e1e1c....\n....f11111f....\n...f1111111f...\n...f1eeeee1f...\n...feeeeeeef...\n...cedddddec...\n..fedeeeeedef..\n..fdeeeeeeedf..\n..feedddddeef..\nfffedeeeeedefff\nfdfeeeeeeeeefdf\nfddfecccccefddf\n.fdefeeeeefedf.\n.feeefeeefeeef.\n.eceeeeeeeeece.\n.ceeeeeeeeeeec.\n.fee1deeed1eef.\n.fe1111e1111ef.\n..cd1111111dc..\n..fedf111fdef..\n..ceedd1ddeec..\n..feeceeeceef..\n...ff.....ff...",
    "width": 15
  },
  {
    "height": 19,
    "label": "[PKMN] Furret Side",
    "string": ".....ccc..................\n...cc11c..................\n..f1c1c.......ccc.........\n.f1111c.......cddcc.......\n.f1111c........cddeff.....\nf11111c......fffffeeeff...\nf11111ec.....f11deffeeef..\nf11111ec......feeeeeeeeef.\nfd111eeeec.....feeeeeeeee.\nfd111ee1eeeeeeeeeeeeeeeeee\nfdd1eee1ee1ee1eeeeeeee11ee\n.fdeee11ee1ee1eeeeeee11d1e\n.feeed1ee11ee1eeeeeee11f1e\n..feedeee1eee1eeeeee11e1e.\n...fddeeedee1deeeeddddee..\n....ffeeddeedeeedddeee....\n......feffffdeeeeee.......\n.......fddfffffdef........\n........fff....ff.........",
    "width": 26
  },
  {
    "height": 25,
    "label": "[PKMN] Gliscor Back",
    "string": "......fcc...........ccf......\n......fbbcc..ccc..ccbbf......\n...ff.fbbbbccbbbccbbbbf.ff...\n..fbf.fbbbbbbbbbbbbbbbf.fbf..\n.fbbc..fbbbbbbbbbbbbbf..cbbf.\n.cbbbf.fbbbbbbbbbbbbbf.fbbbc.\nfbbbbc.fbbbbbbbbbbbbbf.cbbbbf\ncbbbcbf.fbbbbbbbbbbbf.fbcbbbc\ncbfffff..fcbbbbbbbcf..fffffbc\ncbfbbbbffffccbbbccffffbbbbfbc\n.cfffffbbfbbbbbbbbbfbbfffffc.\n..cfbbbfffbbbbbbbbbfffbbbfc..\n...fbbbbbffbcbbbcbffbbbbbf...\n....fbbffbfbcfbfcbfbffbbf....\n....fffbbbffffbffffbbbfff....\n....fffbbfffffffffffbbfff....\n......fffffffffffffffff......\n........fffffffffffff........\n.........ff...cbc.ff.........\n.............cbc.............\n............cbbbc............\n...........cbbbbbc...........\n...........cbbbbbc...........\n............cbcbc............\n.............c.c.............",
    "width": 29
  },
  {
    "height": 25,
    "label": "[PKMN] Gliscor Front",
    "string": "......fcc...........ccf......\n......fbbcc.......ccbbf......\n......febbbc.ccc.cbbbef......\n...cf.feebbbcbbbcbbbeef.fc...\n..cbf..feebbbbbbbbbeef..fbc..\n.cbbc..fbbbbbbbbbbbbbf..cbbc.\n.cbbcf..fbbbbbbbbbbbf..fcbbc.\nfbbbcbfffb54bcbcb45bfffbcbbbf\nfbbcbbfbcb545cbc545bcbfbbcbbf\nfbbbcbfcffbbbbbbbbbffcfbcbbbf\nfbbcbbfefbfcdcccdcfbfefbbcbbf\n.fbbcfffffbbbbbbbbbfffffcbbf.\n..fffffbfffbbbbbbbfffbfffff..\n...fffbbcbbffeeeffbbcbbfff...\n...ffbbbcbbcbbebbcbbcbbbff...\n.....ffbffffcbbbcffffbff.....\n......fffbbfffffffbbfff......\n........fffffcbcfffff........\n.........ff.cbc...ff.........\n............ccbc.............\n............cbbbc............\n...........cbbbbbc...........\n...........cbbbbbc...........\n............cbcbc............\n.............c.c.............",
    "width": 29
  },
  {
    "height": 23,
    "label": "[PKMN] Gliscor Side",
    "string": "........ccc........\n........cbbc.......\n.......fffbbc......\n.......fbbfbbbc....\n.......feebbbbbbc..\n...cc.fbeeebbbbbbc.\n..cbc.fbeeebbbbbbb.\n.cbbc.fbbbbbbbbbbbc\n.cbbcfbfbbbbb54bcbf\nfbbcbfbbbbbbb545bf.\nfbbcbbfbbbcbbcdcf..\nfbbbcbcffbbffff....\nfbbcbbceccbbc......\n.fbcbccefbebc......\n.fffcfbfbbbc.......\n.ffffbbfbbbc.......\n.fffbbbfbbf........\n...fbbffffc........\n....fff.ffc.ccc....\n.....ff.cbbcbbbc...\n.........cbbbbc....\n..........ccbbbc...\n............ccc....",
    "width": 19
  },
  {
    "height": 24,
    "label": "[PKMN] Houndoom Back",
    "string": "..ccc.......ccc..\n.fbbbc.....cbbbf.\nf11bbbf...fbbb11f\nf1fcbbbfffbbbcf1f\nf1f.cbbcccbbc.f1f\n.f..fffcccfff..f.\n...fcccccccccf...\n...fcccccccccf...\n...fcccccccccf...\n....ccccccccc....\n....c1bcffffc....\n...c1bbfffff1c...\n...cbccffffcbc...\n....fbffffbbf....\n...fbcffccccbf...\n...fcbbfffbbcf...\n..fcbcccfffcbcf..\n..fccccccffcccf..\n..fcccccffccccf..\n...fcccfffccccf..\n...ffccfefcccf...\n...fbbf..fccff...\n...ffcf...fbbf...\n....fff...fcff...",
    "width": 17
  },
  {
    "height": 22,
    "label": "[PKMN] Houndoom Front",
    "string": "..ccc.......ccc..\n.fbbbc.....cbbbf.\nfbbb11fffff11bbbf\nfbcf11ccccc11fcbf\nfbc.c11ccc11c.cbf\n.f..f11fcf11f..f.\n...fcffcccffcf...\n...fcccccccccf...\n...fcccedecccf...\n...fc1cbdbc1cf...\n...cf12ddd21fc...\n..cbfcdddddcfbc..\n.f1fccfdcdfccf1f.\n.f1fccfebefccf1f.\n.fbbfccfffccfbbf.\n..fbbfcbbbcfbbf..\n...fffbcbcbfff...\n...fccfcbcbfff...\n....ffccbcfccf...\n....fbbfcccff....\n....ffcf.fbbf....\n.....fff.fcff....",
    "width": 17
  },
  {
    "height": 22,
    "label": "[PKMN] Houndoom Side",
    "string": "..............ccc........\n.............cbbbc.......\n............fffbbbc......\n...........fbbbccbc......\n..........fbbbb11ccf.....\n..........fbcff111fcf....\n...ff.....fbc.ff11fccf...\n..fcf......f.fccccccdf...\n.fccf........fccccccddee.\n.ffcf.......cfcccc1cddddc\n..fff......c1fccce12bddbf\n.ff....fcfcc1fcccbbbbecc.\nff..fff1f1cc11fcceeff....\nfcfffcf1f1ccb1fcccf......\n.fff.fcbfbcccb1fcbf......\n.....fccbcbccfffbcf......\n....fcccccceccccbf.......\n....fccccfeefcccf........\n...fcccff....fccf........\n...fbbf.......cbf........\n...fccf.......fccf.......\n....fff........fff.......",
    "width": 25
  },
  {
    "height": 22,
    "label": "[PKMN] Jolteon Back",
    "string": ".cc......cc.....cc.\ncc5c...ccc5c...c5cc\nc555c.c5c55cc.c555c\n.c455c5555555c554c.\n.f5555c55555c5555f.\n..f5554555554555f..\n...f55555555555f...\n...cf5cc5c5cc5fc...\n...f5ccdcdcdcc5f...\n....cdbbbdbbbdc....\n..ccbbdbcccbdbbcc..\n..cddbcc555ccbddc..\n...cbc5555555ccc...\n....c555555555c....\n...c55555c55555c...\n....c5c5cec5c5c....\n...c55c5cec5c55c...\n...c5ceceeecec5c...\n...cce4eccce4ecc...\n.....f4ec.ce4f.....\n.....fef...fef.....\n......ff...ff......",
    "width": 19
  },
  {
    "height": 22,
    "label": "[PKMN] Jolteon Front",
    "string": ".....cc...cc.....\n.....c5c.c5c.....\n...cce5ece5ec....\n...c5e55e55e5c...\n.cfc545545545cfc.\n.c5f455cc5554f5c.\n.f5fc5c5ccc5cf5f.\ncc55fcc55c5cf55cc\nf4c5f5555555f5c4f\n.cc45c55555c54cc.\n.fcc5e55555e5ccf.\n..fc555555555cf..\n..ce555555555ec..\n..f4ce55555ec4f..\n.cf4c1455541c4fc.\n.cbc5fe555ef5cbc.\n..cbf5555555fbc..\n..cbbff5e5ffbbc..\n...cdbbfffbbdc...\n...cccdbdbdccc...\n....f44ccc44f....\n.....ff...ff.....",
    "width": 17
  },
  {
    "height": 18,
    "label": "[PKMN] Jolteon Side",
    "string": ".........cccc...........\n.........c444ccc........\n...cc.....c44444cff.....\n.ccc4c..fffff4cc555cf...\n.c5544c.f5555ff455555f..\nccce555ccfe5555e455554..\nf555e4554efccc55545555c.\n.ff55555554fcccc555555c.\nfce44555554effc5555e555c\nf455555554cbbbcc454c155f\n.ce44555554cbcf4555cf54f\n..ccc55554cbbbbfc5545cc.\n...c54c5ce4fddbbbc4cf...\n...cccec444cffdbbbcf....\n.....ce444ee44ffdcdc....\n....ceeecfcce44cc.c.....\n....ceff....cf4c........\n.....ff.......ff........",
    "width": 24
  },
  {
    "height": 23,
    "label": "[PKMN] Lucario Back",
    "string": ".....c.....c.....\n....c9c...c9c....\n....c9c...c9c....\n...c999fcf999c...\n...f999fcf999f...\n...f996fcf699f...\n...f696ccc696f...\n...ff66fcf66ff...\n..ffcffcccffcff..\n.fccffcccccffccf.\nfccfccfcccfccfccf\nfcfccff666ffccfcf\n.fccfcc666ccfccf.\n..cffeececeeffc..\n..f6fe4eee4ef6ff.\n.f66ffe4e4eff66df\nfd6c.feeceef.ccf.\n.fccceec6ceeccff.\n.ff.ccf666fcc....\n...f66fc6cf66f...\n...fc6cf6fc6cf...\n....fcff6ffcf....\n....ff..f..ff....",
    "width": 17
  },
  {
    "height": 23,
    "label": "[PKMN] Lucario Front",
    "string": ".....c.....c.....\n....c9c...c9c....\n....c9c...c9c....\n...c999f.f999c...\n...f9c9fcf9c9f...\n...f6c6fcf6c6f...\n...fc66fcf66cf...\n..fcc99ccc99ccf..\n.fcfc99ccc99cfcf.\nfcff1c9ccc9c1ffcf\nffcfdecccccedfcff\nfccf6fdcccdf6fccf\n.ff.f66ccc66f.ff.\n...ccff6c6ffcc...\n.f66ffefffefc6c..\nfd6cffe4d4eff66f.\n.fcf.fed1def.f6df\n.ff.ceee1eeecfcf.\n....cceeeeecc.ff.\n...f66ccccc66f...\n...fc66ccc66cf...\n....fcf...fcf....\n....ff.....ff....",
    "width": 17
  },
  {
    "height": 25,
    "label": "[PKMN] Lucario Side",
    "string": ".........c.........\n........c6c........\n........c6c........\n.......cf66c.......\n.......c9f6c.......\n.......c9f6c.......\n......c696fcf......\n......c699f66ff....\n......f69ccccccf...\n.....ff66c99ccccff.\n.....fcc6669996cccf\n....fcfccccd1efcccf\n...fccfcccccde666c.\n..fccfffccccc66ff..\n..fcffffff666ff....\n...ffcf.feffeeee...\n....ff..ffccfed1f..\n..cc....fc6cfedf...\n.c66cc.cf6fceef....\nc66666cfccfcccc....\nccccc66fcdfc66c....\n.....cccffc66f.....\n.......cfccff......\n........cfccf......\n..........ff.......",
    "width": 19
  },
  {
    "height": 40,
    "label": "[PKMN] Lugia Back 1",
    "string": ".....ff..............................ff.....\n....f11f............................f11f....\n...f111f.............ff.............f111f...\n..ff111f............f11f............f111ff..\n.f11c11f............f11f............f11c11f.\n.f11c11f...........f1111f...........f11c11f.\n.cd11c11f..........f1dd1f..........f11c11dc.\n.cc11c11f......cf.f1dddd1f.fc......f11c11cc.\nc11c1111f......c8ffddddddff8c......f1111c11c\nf11cd1111f.....c8fddddddddf8c.....f1111dc11f\nfd11c1111f.....c88dddddddd88c.....f1111c11df\n.c1111111bf.....c8dddddddd8c.....fb1111111c.\ncdc1111111f......cddddddddc......f1111111cdc\nfddcdd11111f.....cddd11dddc.....f11111ddcddf\nfddddddd1111c.....cdd11ddc.....c1111dddddddf\n.fdddddddd111c....cc1111cc....c111ddddddddf.\n..fcdddddddd11c....c1111c....c11ddddddddcf..\n....ccddddddd11ff..c1111c..ff11dddddddcc....\n......cddddddd111fcb1111bcf111dddddddc......\n.......ccdddddd111f111111f111ddddddcc.......\n.........ccdddd1111c8118c1111ddddcc.........\n...........cffdd11ddb11bdd11ddffc...........\n..............ffdddc8118cdddff..............\n................fdddd11ddddf................\n...............cdcdc8118cdcdc...............\n...............cddd111111dddc...............\n..............cddddc8118cddddc..............\n..............cddddd1111dddddc..............\n..............cbddc111111cddbc..............\n...............cddf111111fddc...............\n................cdf111111fdc................\n................cbbf1111fbbc................\n...............cbbcf1111fcbbc...............\n...............cbbcfd111fcbbc...............\n...............cccbfb11bfbccc...............\n..................f8c11c8f..................\n.................f88c11c88f.................\n.................ffc.f1fcff.................\n.....................f1f....................\n......................ff....................",
    "width": 44
  },
  {
    "height": 39,
    "label": "[PKMN] Lugia Back 2",
    "string": "...............ff...............\n..............f11f..............\n..............f11f..............\n.............f1111f.............\n.............f1dd1f.............\n.........cf.f1dddd1f.fc.........\n.........c8ffddddddff8c.........\n.........c8fddddddddf8c.........\n.........c88dddddddd88c.........\n..........c8dddddddd8c..........\n...........cddddddddc...........\n...........cddd11dddc...........\n............cdd11ddc............\n............ccd11dcc............\n.............c1111c.............\n.............c1111c.............\n............cb1111bc............\n...........ff111111ff...........\n.........fc11c8118c11cf.........\n........cd1111b11b1111dc........\n.......c11111c8118c11111c.......\n......cd111cddd11dddc111dc......\n.....cddd1fddc8118cddf1dddc.....\n....cdddddfdd111111ddfdddddc....\n...cbddddfdddc8118cdddfddddbc...\n...cdddddfdddd1111ddddcdddddc...\n..cdddddcbddc111111cddbcdddddc..\n..cdddddfcddf111111fddcfdddddc..\n.cddddddfbcdf111111fdcbfddddddc.\n.cddddddfbcbbc1111cbbcbfddddddc.\ncddddddc.cbbcf1111fcbbc.cddddddc\ncddddddf.cbbcfd111fcbbc.fddddddc\nfddddddf.cccbfb11bfbccc.fddddddf\nfdbddddf....f8c11c8f....fddddbdf\n.fbddddf...f88c11c88f...fddddbf.\n..cdbddf...ffc.f1fcff...fddbdc..\n..fdcddf.......f1f......fddcdf..\n...ffddf........ff......fddff...\n.....ff..................ff.....",
    "width": 32
  },
  {
    "height": 34,
    "label": "[PKMN] Lugia Front 1",
    "string": ".....ff..............................ff.....\n....f11f............................f11f....\n...f111f............................f111f...\n..cf111f............................f111fc..\n.c1c111f.............ff.............f111c1c.\n.c1db1ff............f1f.............ff1bd1c.\n.f11bf11f.......ffc.f1fcff.........f11fb11f.\n.f11f111f.......f88c11c88f.........f111f11f.\nc1c1f111f........f8c11c8f..........f111f1c1c\nf1cddf111f........c8118f..........f111fddc1f\nf11bdc111f.........c11c...........f111cdb11f\ncf1dddc111f.......c111c..........f111cddd1fc\ncfddddb111f.......c11ff..........f111bddddfc\nfdcddddd111f......c1f11f........f111dddddcdf\nfdddddddd11dc....c11f11f.......cd11ddddddddf\n.fddddddddddf....c1f1111f......fddddddddddf.\n..fcdddddddddf...c1f1111f.....fdddddddddcf..\n....ccdddddddf.ffcf111111f.ff.fdddddddcc....\n......cdddddddcf8fb111111bf8fcdddddddc......\n.......ccdddddcf8f11111111f8fcdddddcc.......\n.........cdddddf88c111111c88fdddddc.........\n..........cfdddf81c111111c18fdddfc..........\n............ffdc818811118818cdff............\n..............fbfbf811118fbfbf..............\n...............cfbfc1111cfbfc...............\n...............cdfdc1111cdfdc...............\n..............cbddfbddddbfddbc..............\n..............cbbd6ffddff6dbbc..............\n..............cbb6666ff6666bbc..............\n..............cbbc66666666cbbc..............\n...............cbbff6666ffbbc...............\n................ffbcffffcbff................\n................cbbc....cbbc................\n................ccc......ccc................",
    "width": 44
  },
  {
    "height": 37,
    "label": "[PKMN] Lugia Front 2",
    "string": "..............ff..............\n.............f1f..............\n.........ffc.f1fcff...........\n.........f88c11c88f...........\n..........f8c11c8f............\n...........c8118f.............\n............c11c..............\n...........c111c..............\n...........c11ff..............\n...........c1f11f.............\n..........c11f11f.............\n..........c1f1111f............\n..........c1f1111f............\n........ffcf111111f.ff........\n........f8fb111111bf8f........\n........f8f11111111f8f........\n........f88c111111c88f........\n.......cf81c111111c18fc.......\n......c1c818811118818c1c......\n.....c111fbf811118fbf111c.....\n.....c111fbfc1111cfbf111c.....\n....cd111cfdc1111cdfc111dc....\n....cdd11cdfbddddbfdc11ddc....\n...fddd1fbd6ffddff6dbf1dddf...\n...cddddfb6666ff6666bfddddc...\n..fdddddfbc66666666cbfdddddf..\n..cdddddcbbff6666ffbbcdddddc..\n.fdddddf.ffbcffffcbff.fdddddf.\n.fdddddf.cbbc....cbbc.fdddddf.\ncddddddf.ccc......ccc.fddddddc\nfddddddc..............cddddddf\nfdbdddddc............cdddddbdf\nfdbdddbdc............cdbdddbdf\n.ffdbdcbf............fbcdbdff.\n..fdcddf..............fddcdf..\n...ffddf..............fddff...\n.....ff................ff.....",
    "width": 30
  },
  {
    "height": 35,
    "label": "[PKMN] Lugia Side 1",
    "string": "...................cc.......................\n..................cddcc.....................\n................cccdcddc....................\n...............cddcdcddc....................\n...............cdbddbddc....................\n..............ffdbdddddc......cffffff.......\n...........ffc11fddddddc...ccc1111111bcc....\n..........f11f11fddddddc..c111111111111bc...\n.........cf11f111cdddddc...cc111111111111c..\n........f1f11dc11ffddddc.....c111111111111c.\n........f1fdddbdf11fdddc....cfffffff111111c.\n........fddcddddc11fdddc.....c888888ff11111c\n........cfdcddddd11cddddc.....ffc88811f1b11c\n........ccddbddddd11cdddc.....c11ccc8dfcddfc\n........cbbddddddd11cdddc....c11ddbbcdddff..\n.........cddddddddd11cdddc.cc111ddddbcff....\n..........cddddddddd1cddbccb1111ddfcc.......\n...........cddddddddd1cbb811111ddf..........\n............fddddddddd1cc11111ddf...........\n.............fcdddddddd11cb111ddf...........\n...............ffddddddd11c81ddf............\n....ff...........fffdddd111bdddf............\nccc.f8f........cc118fcddd11dddf.............\nf11ccc8c....ccc118b18bcbddddddf.............\n.fd1111bcccc1111118b11ddddddddc.............\n..ff8bd111111111111db11ddbdd6c..............\n..c888fddddddddddddc111ddcd66c..............\n.c88cfcccdddddddddcdd1dddc66c...............\n.ccf.....ffffdddddcdddddbc6c................\n.............fffccbdddddfcc.................\n.................cbcdddfc...................\n................cbbbccc.....................\n................cbbc........................\n................cbbc........................\n................ccc.........................",
    "width": 44
  },
  {
    "height": 37,
    "label": "[PKMN] Lugia Side 2",
    "string": "..............................cffffff.......\n...........................ccc1111111bcc....\n..........................c111111111111bc...\n...........................cc111111111111c..\n.............................c111111111111c.\n............................cfffffff111111c.\n.............................c888888ff11111c\n..............................ffc88811f1b11c\n..............................c11ccc8dfcddfc\n.............................c11ddbbcdddff..\n...........................cc111ddddbcff....\n.......................ccccb1111ddfcc.......\n.....................ccbbd11111ddf..........\n....................cbb8111111ddf...........\n...................cc811111111ddf...........\n..................cb1118b1111ddf............\n....ff...........c1118b18b11dddf............\nccc.f8f........cc118b18b111dddf.............\nf11ccc8c....ccc118b18b11111bddf.............\n.fd1111bcccc1111118b111b111cddc.............\n..ff8bd1111111111111b11b111c6c..............\n..c888fddddddddd111c11b1111f6c..............\n.c88cfcccdddddddddcd11c1111fc...............\n.ccf.....ffffdddddcdd1c1111f................\n.............fffccbdddc1111dc...............\n.................cbcdf11111dc...............\n................cbbbcfd111ddf...............\n................cbbcbfddddddf...............\n................cbbcbcddddddf...............\n................ccc.fddddddddc..............\n....................cddddddddc..............\n...................cdddddddddf..............\n...................cddbddddbdf..............\n..................fdddbdbddcdf..............\n..................fddcddcddcc...............\n...................ffcddcddf................\n......................ff.ff.................",
    "width": 44
  },
  {
    "height": 27,
    "label": "[PKMN] Mewtwo Back",
    "string": ".......cf.......fc.......\n......c11f.....f11c......\n......c11fcccccf11c......\n......cd1cd111dc1dc......\n.......c11c111c11c.......\n.......cd1d111d1dc.......\n.......cd1111111dc.......\n......cdd1111111ddc......\n......cddd11111dddc......\n......fddd11111dddf......\n......fbdddddddddbf......\n.......cddddbddddc.......\n.......fbddcbcddbf.......\n..cc..cdfcbfbfbcfdc......\n.ccdcccddbcfdfcbddc..cc..\ncbbbdbdbcbbbfbbbcbdccdcc.\nccbbbffc.ccbbbcc.cbbdbbbc\n.fbff....cbcccbcc.ffbbbcc\n..ff....cbcfcfcbdc..ffbf.\n.......cdbfaaafbddf..ff..\n......fddccaaaccdbf......\n......fbdfccaccfdbf......\n......fbbfcccccfbbf......\n.......fbbfcccfbbf.......\n.......cccbfffbccc.......\n.......cbbc...cbbc.......\n........ff.....ff........",
    "width": 25
  },
  {
    "height": 27,
    "label": "[PKMN] Mewtwo Front",
    "string": "......cf.......fc......\n.....c11f.....f11c.....\n.....c11fcccccf11c.....\n.....cd1cd111dc1dc.....\n......c11c111c11c......\n......cd1d111d1dc......\n......cd1111111dc......\n.....cdd1111111ddc.....\n.....cddd11111dddc.....\n.....fddd11111dddf.....\n.....fb1ddbdbdd1bf.....\n......c1cdbdbdc1c......\n.....cfbf1ddd1fbf......\n...ccddfbdddddbfdc.....\n.ccbdbcdffbdbffdddcc...\ncdbbbc.cbbfffbbccbdbcc.\nccbdf..fbbbbbbbf.cbbbdc\nfbbcf...fbbcbbfc..fdbcc\nfdc....cbccbccbbc.fcbbf\n.ff...cbbbcccbbbbc..cdf\n.....fbbccaaaccbbf..ff.\n.....fdbcaaaaacbdf.....\n.....fddbfaaafbddf.....\n......fddbfcfbddf......\n......cffc...cffc......\n......cbbc...cbbc......\n.......cc.....cc.......",
    "width": 23
  },
  {
    "height": 26,
    "label": "[PKMN] Mewtwo Side",
    "string": ".........cc..........\n........cd1c.........\n........cffdccc......\n........fd1cdd1cc....\n........fd11c1111c...\n........cfd11cd111c..\n.......cddf11dd111c..\n.......cdddc111111bc.\n.......fddddd1111ddc.\n.......fbddddddddbdbc\n........cdddddd1cdbdc\n........fbddddd1f1bbc\n..ccc....fbbddddbbcc.\n.caaac...cffbbbccc...\ncaaccac..cbcfffbbbc..\ncaf.fac...cbbdccbcc..\ncac.fcac...cdcf.cc...\ncaacfcccc..fbcc......\ncaacfcccccccbbfff....\n.cc..ccccccccbbbdf...\n.....fccccfbdffdff...\n......fcccfbddcff....\n.......ffccfbbbf.....\n.........ffcfffc.....\n............cbbc.....\n.............cc......",
    "width": 21
  },
  {
    "height": 18,
    "label": "[PKMN] Mew Back",
    "string": "....cccc....\n.ccc3dd3ccc.\ncdd3dddd3ddc\nf33dddddd33f\nfbdcccddddbf\ncbfdddcdddbc\nc3f3dddcdd3c\nc33fffd3c33c\n.f3333fdc3f.\n..fc3ccdbf..\n..cbccdbbc..\n..f3cdb33f..\n.c33cdb333c.\n.c33bcdb33c.\n.fb3bc3b3bf.\n..f3cbbc3f..\n..c3c..c3c..\n...cc..cc...",
    "width": 12
  },
  {
    "height": 22,
    "label": "[PKMN] Mew Front",
    "string": "........ccc.\n.......cdddf\n......bddd3f\n.....bd3ccf.\n...cffffc...\n.cc333333cc.\ncdd3dddd3ddc\nfb3dddddd3bf\nfbddddddddbf\nc31d3dd3d13c\nc161dddd161c\ncd6fddddf6dc\n.f33dddd33f.\n..fc3333cf..\n..c3ffff3c..\n..fdbbbbdf..\n.c3f3333f3c.\n.c3b3333b3c.\n.fcbb33bbcf.\n..fccccccc..\n..cbc..cbc..\n...cc..cc...",
    "width": 12
  },
  {
    "height": 19,
    "label": "[PKMN] Mew Side",
    "string": "............cf......\n...........f3df.....\n..........cbb3dcc...\n.ccc.....cb3dddd3c..\nfdddc....c3dccddd3c.\nf3dddc..c3dfddbdddc.\n.fffd3c.c3dfb3dddd3c\n....fdc.c33bbbd13ddc\n....cdb.f33ddd1613dc\n...cdb...f33ddd6f33c\n..cdb.....fc33333cc.\n..cdb.....cbccffc...\n...cdb...cb3b3c.....\n...c33bccb33fdc.....\n....fc33b3333ff.....\n......ffcb33bc......\n........cbcfc.......\n........c3c.........\n........cc..........",
    "width": 20
  },
  {
    "height": 23,
    "label": "[PKMN] Mightyena Back",
    "string": "..c........c..\n.cbc......cbc.\n.cbf.cccc.fbc.\ncbbbcbbbbcbbbc\nfbbbfbbbbfbbbf\nfbbbcbbbbcbbbf\n.cbcccbbcccbc.\n.cccccbbccccc.\n.cccccbbccccc.\nccccccbbcccccc\nccccccbbcccccc\n.fccffffccccf.\n.ccfccccfcccc.\n.cffcccccfccc.\nccfccccfcfcccc\nfccfccfccfcccf\nfccfffcccfcccf\ncccfcccccfccc.\nfcccfcccfcccf.\nfccccfffccccf.\n.ccccc..cccc..\n.fccc...cccf..\n.fff.....fff..",
    "width": 14
  },
  {
    "height": 26,
    "label": "[PKMN] Mightyena Front",
    "string": "..........ffcc....\n........ffcccc....\n.......fccccc.....\n.......fcccccc....\n......fcccccc.....\n......fcccc.......\n......ccffcfc.....\n...f..fcccfcc.f...\n..fbccccccccccbf..\n..fbfccccccccfbf..\n.fcbfccbbbbccfbcf.\n.fcbbfbbbbbbfbbcf.\n.fccbfcbbbbcfbccf.\n..fcbcccbbcccbcf..\n..cfbbccbbccbbfc..\n..cccbbcbbcbbccc..\n.cccb5bbbbbb5bccc.\n.cccb2ebbbbe2bccc.\nccccfbfbbbbfbfcccc\n..fccfbbbbbbfccf..\n...cbfcbeebcfbc...\n...cbbffbbffccc...\n...ccccffffcccc...\n...ccccc..ccccc...\n...fbcdf..fdcbf...\n....fff....fff....",
    "width": 18
  },
  {
    "height": 22,
    "label": "[PKMN] Mightyena Side",
    "string": "...............cc..........\n...............cbc.........\n...............cbbc........\n...............cbbc........\n..............fffbbcc......\n...cfc........fbbfbbbbc....\n.cccccc......cfbcbfcbbbc...\ncccccccc.....cfbccfccbbc...\n.ccccccf....fccbbccbbcbbcc.\nccccfccf..ccccccbbbbbbbbb2e\nccffcccfccbbccccccbb52bbbee\n...cccccfbbcccccfbbb5efbbbc\n..ccfcccccfcccccfcbbcbbbbf.\n...ccfffcccffccfcfcbbbffc..\n..fccccccccccfccffccff.....\n..ffcfccccccccfccccc.......\n...ffccfccfffcfcbbf........\n...cffcbffcccfcbbf.........\n...ccccccc...ccccc.........\n...ccccc......cccc.........\n...fcdf.......cccdc........\n....ff.........fff.........",
    "width": 27
  },
  {
    "height": 16,
    "label": "[PKMN] Pikachu (F) Back",
    "string": "fff........fff.\nfccf.eeee.fccf.\nfcc5f5555f5ccf.\n.f555e55e555f..\n.f4555555554f..\n.ef45555554fe..\n.e55555555ffffe\n.f5555555f5555f\n..e555555f444fe\n..e5ee5efe4444e\n.e445eef444fffe\n.e44ee4f4ffe...\n.f444efeefef...\n.fe444fefeef...\n..f44ccc44f....\n...ff...ff.....",
    "width": 15
  },
  {
    "height": 18,
    "label": "[PKMN] Pikachu (F) Front",
    "string": "fff..........fff\nfccf........fccf\nfcc5f......f5ccf\n.f555feeeef555f.\n.f455e4554e554f.\n..f4555555555f..\n...c45555554c...\n..f5555555555f..\nccf5515555155f..\nfefe5f5555f5ef..\neceee55ee55ee...\nceecfc4444cfc...\n.cee4ecccce4ee..\n..ef45e44e54fe..\n..e4ff4444ff4e..\n...e44444444e...\n...fe4cccc4ef...\n....ff....ff....",
    "width": 16
  },
  {
    "height": 17,
    "label": "[PKMN] Pikachu (F) Side",
    "string": "....ffff.........\n....fcccff.......\n.....fcce4f......\n...fffff444fc....\n...fcce5ff555ee..\n....fc5555e5555e.\n.....ff555555555e\neccc..cfe5555555e\nf44c.c4445555155c\nef44cee444555f54c\ne444c4ee444ee54c.\n.ef4ce44444eeff..\n..fecee444ecce...\n..ffe4444444c....\n...fef44444ee....\n....eefffe44f....\n.........eff.....",
    "width": 17
  },
  {
    "height": 16,
    "label": "[PKMN] Pikachu (M) Back",
    "string": "fff........fff.\nfccf.eeee.fccf.\nfcc5f5555f5ccf.\n.f555e55e555f..\n.f4555555554f..\n.ef45555554fe..\n.e55555555fffff\n.f5555555f5555f\n..e555555f4444f\n..e5ee5efe4444f\n.e445eef444fff.\n.e44ee4f4ffe...\n.f444efeefef...\n.fe444fefeef...\n..f44ccc44f....\n...ff...ff.....",
    "width": 15
  },
  {
    "height": 18,
    "label": "[PKMN] Pikachu (M) Front",
    "string": "fff..........fff\nfccf........fccf\nfcc5f......f5ccf\n.f555feeeef555f.\n.f455e4554e554f.\n..f4555555555f..\n...c45555554c...\n..f5555555555f..\nccf5515555155f..\ncefe5f5555f5ef..\nceeee55ee55ee...\nceecfc4444cfc...\n.cee4ecccce4ee..\n..ef45e44e54fe..\n..e4ff4444ff4e..\n...e44444444e...\n...fe4cccc4ef...\n....ff....ff....",
    "width": 16
  },
  {
    "height": 17,
    "label": "[PKMN] Pikachu (M) Side",
    "string": "....ffff.........\n....fcccff.......\n.....fcce4f......\n...fffff444fc....\n...fcce5ff555ee..\n....fc5555e5555e.\n.....ff555555555e\nfccc..cfe5555555e\nf44c.ce445555155c\nf444c4ee44555f54c\nf444ce44444ee54c.\n.cf4cee4444eeff..\n..fec44444eff....\n..ffe444444ee....\n...fec4444ee.....\n....feefe44f.....\n........eff......",
    "width": 17
  },
  {
    "height": 41,
    "label": "[PKMN] Rayquaza Back",
    "string": "......ff.........................ff........\n......f7f.......................f7f........\n......f77f.....................f77f........\n......f677f...................f776f........\n......f6777f.................f7776f........\n.......f6777f.....66666.....f7776f.........\n........f6776f...f67776f...f6776f..........\n.........fff66f.f4577754f.f66fff...........\n............f66f674555476f66f..............\n.............f66776646677f6f...............\n..............f67666466676f................\n..............ff666646666ff................\n.............f6f666646666f6f...............\n............f766666464666f67f.......22.....\n............ff66ffffff6666fff.......222.fff\n..............ff222222f66ff.........26ff66f\n...........fff6f266662f66f..........ff666f.\n.........ff56ff22666622fffff6...fffff6662f.\n.......ff6656f626666662f6656ffff6666f66662f\n......f466566f666666666f4565664ff6666f2222f\n.....f6645666f666666666f66664466f66666fffff\n....f6646666fff2ffffff2f6666666fffff.......\n...ffff6666ffff2ffffff2ffffffff............\n..ff666ff6ff...f222222ff664ff..............\n.f2f66466fff..ffffffff6f64f6ff..f..........\nf26f64466ff4ff6f6ff4ffff46f6f6ffbf.........\n26f664466f2ffffffffffff666fffff666f........\n26f664666f62f6f..ffffffff6f..f6ff6bf.......\n26f66466f662ff....ffffff4ff...f6f6f........\n26f66466f662f....ffffff4fff....fff.........\nf2f6fff6f62f.22222fff664ff.................\n.ffffffff2f.26666f2f66644f.................\n..f66666ff..26667766f646f..................\n..f456666ffff77744446f46f..................\n...f656666fff44444466f6f...................\n...f65666666f44666666ff....................\n....f46666666f666666ff.....................\n.....f455566644ffff42f.....................\n......f66656624ffff42......................\n........ffffff244442.......................\n...............2222........................",
    "width": 43
  },
  {
    "height": 40,
    "label": "[PKMN] Rayquaza Front",
    "string": "............22..........................\n............222.fff.....................\n.......fffff26ff66f............fffff....\n.......f7776ff666f............f6777f....\n........f7776f662f...........f6777f.....\n.........f7776f662f.........f6777f......\n........fff777f222f66666....f777f.......\n......ff666f77fffff45554f...f77f........\n.....f6466fff66f.f4577754f.f66f.........\n....f6446ff..f66f657777756f66f..........\n...f646ff.....f6665777775666f...........\n...f666f.......f6f5777775f6f............\n..f6ffff.......67f5577755f76..ff........\n..fff6f222....f7776555556777ff22ff......\n.f64666f62f...ff77675557677ff26622f.....\n.f64466f66f...ff47667776674ffff6662f....\n.f664466f64..f7f4f7677767f4f7f7ff62f....\n2f6664466ffff776f5f76767f5f677f776ff....\n22f66646f66f776ff667777766ff677f777ff...\n226f666f44f76ffffff67776fff6ff67f766f...\n2266f6f466fff66ff2bf676fb2f666fff6f55f..\n.f266ff466466fffff2bf6fb2ffff6666f7576f.\n..f22fff446ffffffff2bbb2ff2ffff6f66577f.\n...ffffffffffff6ffff222f..f222fff665776f\n........fffffff66ffffffff..fff..f666554f\n...........ff6f66666ffff6fff.....f66665f\n........fff6f6ff666666ff6f6fff...f66646f\n.......f61fff6fff6666fff6fff16f..f66466f\n......f66ffffff6ff66ff6ffffff66ff666466f\n......ff1fbf..f66ffff66f..fbf1ffff66466f\n.......ff.ff..f666ff666f..ff.fff46f664f.\n...............f66ff66ff....266f666f66f.\n...............ff6ff6ffff..266f66662ff..\n...............fffffff46fff26f6666f62f..\n................ffffff46646ff6666f662f..\n................fffff66444666f66f662f...\n.................fff6666644446ff662f....\n..................fff666666666f222f.....\n....................ffff66666fff........\n.......................fffffff..........",
    "width": 40
  },
  {
    "height": 37,
    "label": "[PKMN] Rayquaza Side",
    "string": "........................................ff....\n...............................fff.....f6f....\n...............................f6f....f66f....\n...............................f66f...f66f....\n...............................f66f..f666f....\n...............................f666f.f666f....\n...............................f666f..f66f....\n....................ff........ff6666f.f66f....\n..................ff22ff...fff66fff6f..f6f....\n.................f22662f.ff6664556f66fff6f....\n................f266ff2ff6655566666f6f6f6ff...\n....22..........f26ff6ff64466666666f6f46ffff..\nff.222..........f2f6666f46666666666f66f45fff..\n66ff62..........ff66666ff666fffff66f66f566ff..\nf666ff......f22.f66ffffff6ffffffff6666ff666f..\nf2666f.....f2222f6f676ff6fffffffff666667f65f..\n266666ff..f2fffff6f677f666ff...ff6666667f546f.\n2222fffffff2fffffff666f666f...ff666666f67f66f.\nfff2ff64ff6666fffffffff66f.44ff6666f66ff7f66f.\n....ff4ff6666fff4f6ff666fff4ff666ff666f467f67f\n......ffff666ff4ff6fffffff6ff777fff666f4f7677f\n.........f22fff4fff666661f66f77ff.ff666f56667f\n..........fffff4f4ffff6fff67fff44..f6ff2f466f.\n............ff664ffff.1fb6f6776444.f6f332f66f.\n............ff64646f..fff66f776ff4..f62ff2f6f.\n............ff65656f...f4444fff6f4..f662ffbf..\n.............f65656fff..ffff677ff....fff..f...\n.............f6656f22f....f66776f.............\n..............f66f2662ff..f66766f.............\n..............fffff66626ff666666f.............\n...............ffffff6626f66666f..............\n...............266ffff626f66666f..............\n...............2666ffff26f6444f...............\n...............f26666fffff4fff................\n................f22666ffffff..................\n.................2f222fff.....................\n...................2fff.......................",
    "width": 46
  },
  {
    "height": 24,
    "label": "[PKMN] Seviper Back",
    "string": ".........ff.....\n........fbbf....\n.......fbbbbf...\n......fbbbbbbf..\n.....fcbbbbbbcf.\n.....fbbccccbbf.\nff..fccccccccccf\n22fffccccccccccf\n.22cffcccccccccf\n.222ccffcccccccf\n..222cccfccccc2f\n..2222cffccccc2f\n..f222cfcffffcf.\n..fffcccf442cff.\n.....fcfc442ccf.\n....ffafc22cccf.\n....fccfcffffccf\n...fccccff44ffcf\n...fccccf2442fff\n...fcccccf22cfff\n....fccccccccff.\n....ffcccccccff.\n.....ffcccccff..\n.......fffff....",
    "width": 16
  },
  {
    "height": 25,
    "label": "[PKMN] Seviper Front",
    "string": "..............22\n............cc22\n.....ff...fcc22.\n....fbbf.fcc222.\n...fbbbbffc222..\n..fcbbbbcfc222..\n.fcbbbbbbcf22f..\n.fbbbbbbbbffff..\nfcbbb44bbbcf....\nfcbb2552bbcf....\nfcb254452bcf....\nf5525445255ff...\nf2552552552ff...\n.2f524425f22cf..\n.f25ccaa52fccf..\n.f2cccaaa2fccf..\n.ff2ccaa2ffccf..\nfcf22ff22cffcf..\nfcc22aa22ccff...\nfccc2ca2cccf....\n.fccccacccf.....\n.fcccaacccf.....\n.ffccacccff.....\n..ffcaccff......\n...ffffff.......",
    "width": 16
  },
  {
    "height": 18,
    "label": "[PKMN] Seviper Side 1",
    "string": ".....222.....ffffff......\n...22222...ffb24555ff....\n..f22cf...fbbb2554442f...\n.f22cf...fbbbbb2554445f..\nf222cf...fcccbbb2225552f.\nf22ccf....fccccb555222bf.\n.f2cf......fcccc4555bbbbf\n..fccf....ffccccc2254bcbf\n..fcff...f2fcc22c2f24bbcf\n.faf33fff24fccf2cc22cc2f.\n.fcf3f24f242fccff222ff2..\n.fccff24fc22fcccffff.22..\n..fccfc2fccccfcccf...22..\n..fcccfccfccccccccf..2...\n...fcccccccccccccaf......\n....fcccccfcccccaff......\n.....ffccccffcccff.......\n.......ffff..fff.........",
    "width": 25
  },
  {
    "height": 18,
    "label": "[PKMN] Seviper Side 2",
    "string": "................ffffff......\n.....222......ffb24555ff....\n...22222.....fbbb2554442f...\n..f22cf.....fbbbbb2554445f..\n.f22cf......fcccbbb2225552f.\nf222cf.......fccccb555222bf.\nf22ccf........fcccc4555bbbbf\n.f2cf.........fccccc2254bcbf\n..fccf......ffffc22c2f24bbcf\n..fcff.....f22ffcf2cc22cc2f.\n.faf...ffff242ffccff222ff2..\n.fcf..f242f242fccccffff.22..\n.fccf.f242fc22fccccf....22..\n..fccffc2ccfcccccccf....2...\n..fcccccccccccccccaf........\n...fcccccccffccccaf.........\n....fccccff..fcccff.........\n.....ffff.....fff...........",
    "width": 28
  },
  {
    "height": 15,
    "label": "[PKMN] Squirtle Back",
    "string": "....ccc....\n..cc999cc..\n.c9999999c.\n.c9999999c.\nc699999996c\nc699999996c\nc669999966c\nf666111666f\n.f6d444d6f.\nc6d44664d6c\nc6d4699cd6c\n.cd4c96cdc.\n.c6dc6cd6c.\n.f66fff66f.\n..ff...ff..",
    "width": 11
  },
  {
    "height": 15,
    "label": "[PKMN] Squirtle Front",
    "string": "....ccc....\n..cc999cc..\n.c9999999c.\n.c9999999c.\nc999999999c\nc996999699c\nc619999916c\nf6e99999e6f\n.f6999996f.\nc6f66666f6c\nc99cfffc99c\n.cc4ddd4cc.\n.c6644466c.\n.f66fff66f.\n..ff...ff..",
    "width": 11
  },
  {
    "height": 15,
    "label": "[PKMN] Squirtle Side",
    "string": ".......ccccc...\n......c69999c..\n.....c6999999c.\n.....c9999999c.\n....c699999699c\n....f699999199c\n....f669999e96c\n....cf6669996c.\n...c44ffc6cff..\n.ffc4444fc6c...\nf99f4444dc99c..\nf966f44dd9ccc..\n.f666ffc99c....\n..fff.f66c.....\n.......fff.....",
    "width": 15
  },
  {
    "height": 22,
    "label": "[PKMN] Umbreon Back",
    "string": "ff...............ff\nfcff...........ffcf\nfcccf.........fcccf\nfcc54f.......f45ccf\n.f44cf..fff..fc44f.\n.fccccff555ffccccf.\n..fcccfcccccfcccf..\n...ffcccccccccff...\n...fcccccccccccf...\n...fcccffccccccf...\n...fcccfcfcccccf...\n....fccfccfcccf....\n....fcfcccfcccf....\n.....ff5cc5fcf.....\n.....fcf55cfcf.....\n....fccfccfcccf....\n....fcccfcfcc5f....\n....f5ccccccccf....\n....fccccccccf.....\n.....fccfffccf.....\n.....fcf...fcf.....\n......ff...ff......",
    "width": 19
  },
  {
    "height": 24,
    "label": "[PKMN] Umbreon Front",
    "string": "..........ff.......\n.........fcf.......\n........fccf.......\n........f55cf......\n.......f5cc5f......\n.......fcccf.......\nff......fccf.....ff\nfcff....fcf....ffcf\nfcccf..fffff..fcccf\nfcc44ffcccccff44ccf\n.f45cfccfffccfc54f.\n.fccccffcccffccccf.\n..fcccfcccccfcccf..\n...fcccccccccccf...\n....fccc545cccf....\n...fcccc4c4ccccf...\n...fceec4c4ceecf...\n...fc21c545c12cf...\n....fcfecccefcf....\n....ffcccccccff....\n....feffcccffef....\n.....fccfffccf.....\n.....fcf...fcf.....\n......ff...ff......",
    "width": 19
  },
  {
    "height": 20,
    "label": "[PKMN] Umbreon Side",
    "string": "...........fff..........\n...........fccff........\n............fcc5f.......\n.........fffff55cf......\n.........fcccffccfff....\n..........fcc55ffcccff..\n..........fcc4ccfcccccf.\nfffff......f4cccccccc5e.\nfccc5ef.....ffcccfccc4cf\n.fc5cccf......ffcccccc4f\n..f5ccccffff..fccceecccc\n...fccccccccffcccce21ccf\n....fffccccccccccccefccf\n.......fcccccccccccccff.\n.......fccccccccccfff...\n.......fc55ccc55ccf.....\n......fc5c5fff5c5cf.....\n......fc5fff..fc5f......\n......fcf......fcf......\n.......ff.......ff......",
    "width": 24
  },
  {
    "height": 24,
    "label": "[PKMN] Vaporeon Back",
    "string": ".........f.........\n........f6f........\n........f6f........\n.......f646f.......\nfff...fffffff...fff\nf66fcc6666666cff66f\n.c46c666666666c64c.\n.c4c6fcc666ccf6c4c.\n..cc6f96c6c96f6cc..\n..c66c666c666c66c..\n..c666c66666f666c..\n..c6666f666f6666c..\n...c6666c6c6666c...\n...c6666c6c6666c...\n....cc6c666c6cc....\n....c666666666c....\n....c666666666c....\n....c666666666c....\n....c666666666c....\n....c666666666c....\n.....f666c666f.....\n.....f66c.c66f.....\n......f6f.f6f......\n......ff...ff......",
    "width": 19
  },
  {
    "height": 27,
    "label": "[PKMN] Vaporeon Front",
    "string": ".....fcc...ccf.....\n.....f966.696f.....\n.....c6666666c.....\n......f66666c......\n.......f666f.......\n........c6c........\n.......c666c.......\n.......c666c.......\n.......c666c.......\n......c66f66c......\n......ccf6fcc......\n.....ccdf6fdcc.....\n....cbdff6cfdbc....\nfffcdbf6c6c6fbdcfff\nf66fff6666666fff66f\n.c666666666666666c.\n.cd6666666666666dc.\n..cd666c666c666dc..\n..c46c69c6c96c64c..\n..cc6c169c961c6cc..\n..cdf6f69996f6fdc..\n..cbdf6999996fdbc..\n...cdbff666ffbdc...\n....cddbfffbddc....\n.....ccddbddcc.....\n......f6cc66f......\n.......ff.ff.......",
    "width": 19
  },
  {
    "height": 20,
    "label": "[PKMN] Vaporeon Side",
    "string": "..............fff..........\n..............f66ff........\n..cc...........f666ff......\n..c9c.........cd66666f6....\nfcc66c.......cc4dd66666f...\nf9666c......cbcd44dd6666f..\nc6666c......cffff4466666f..\n.c666.......cc66666666966f.\n..f6c.......cdc6666669996f.\n...c6c.....ccdcdd66699999c.\n...c66c...c6cdbc4d6696c996c\n...c6666c666cbdcd4499cc199f\n....c66c6c666cdccc6999ff96c\n....c66666666cddbbcc6666cc.\n.....c666c6666cbbddbcccc...\n......cc6c666c6cbddbdbc....\n........f6666cccccbbcc.....\n........f66cc...c6cc.......\n........f6f......c6f.......\n.........fc.......ff.......",
    "width": 27
  },
  {
    "height": 22,
    "label": "[PKMN] Venusaur (F) Back",
    "string": "........eeeee.eeeee........\n.......ebbd3beb3dbbe.......\n.....eeee33bbbbb33eeee.....\n....eb333eeb454bee3ddbe....\n....eb3dd3b54545b3333be....\n....ebbbeee35453eeebbbe....\n....ffeeb333bbb3d3beeff....\n..cccfbb3dd3bfbdd33bbfccc..\n.c777fbdb3dbfefb33bdbf777c.\nc777ccfbbbbfe4efbbbbfcc777c\nc777777fbbfc444cfbbf777777c\n.c7777fcff77ccc77ffcf7777c.\n..cccf6c77777c77777c6fccc..\n....f69c77777c77777c96c....\n....f999f7777c7777f999f....\n....f999f77777c777f999f....\n...f69999fc77777cf99996f...\n...f699996ccc7ccc699996f...\n...f66996666ccc66669966f...\n...f6666fc6666666cf6666f...\n....f666c.fffffff.c666f....\n.....fff...........fff.....",
    "width": 27
  },
  {
    "height": 24,
    "label": "[PKMN] Venusaur (F) Front",
    "string": ".......eeeee.eeeee.......\n......ebbd3beb3dbbe......\n....eeee3bbbebbb3eeee....\n...eb333eee454eee3ddbe...\n...eb3dd3b54545b3333be...\n...fbbbeee35453eeebbbf...\n....feeb333bbb3d3beef....\n....fbb3dd3bfbdd33bbf....\n..ccfbdb3dbfefb33bdbfcc..\n.c777fbbbbfe4efbbbbf777c.\nc777ccfbbfc444cfbbfcc777c\nf777777ff77ccc77ff777777f\n.f777cf77777c77777fc777f.\n.cfff99f7777c7777f99fffc.\n.cbcfe9f77777c777f9efcbc.\n..ccfe99fc77777cf99efcc..\n...f66699ccc7ccc99666f...\n...f6699999ccc9999966f...\n...c69196999999969196c...\n..fcf61e999999999e16fcf..\n..f6cf6699999999966fc6f..\n..f66ffb699696996bff66f..\n..fb6bffff66666ffffb6bf..\n...fff....fffff....fff...",
    "width": 25
  },
  {
    "height": 23,
    "label": "[PKMN] Venusaur (F) Side",
    "string": ".....eeeee.eeeee..........\n....ebbd3beb3dbbe.........\n..eeee3bbbebbb3eeee.......\n.ebdd3eee454eee333be......\n.eb3333b54545b3dd3be......\n.fbbbeee35453eeebbbf......\n..feeb3d3bbb333beef.......\n..fbb33ddbfb3dd3bbf.......\n..fbdb33bfefbd3bdbfc......\n...fbbbbfe4efbbbbf77c.....\n..ccfbbfc444ceeefc777cc...\n.c77cff77ccc7c7777777f6c..\nc77c7c7777c777ff7777f996c.\nf7777f7777c77f99ffff9999c.\nf777cf777c777fee999999999c\n.fff6cfc77777ce9999969999c\n...c699ccc7cc699991969999c\n...f99999ccc9999991e9999c.\n...f99999999999999999996f.\n..f69999999999969996b6ff..\n..f669996cc69996ccffff....\n..c6b6bff..f6b9bf.........\n...ffff.....ffff..........",
    "width": 26
  },
  {
    "height": 22,
    "label": "[PKMN] Venusaur (M) Back",
    "string": "........eeeee.eeeee........\n.......ebbd3beb3dbbe.......\n.....eeee33bbbbb33eeee.....\n....eb333eeb545bee3ddbe....\n....eb3dd3b54445b3333be....\n....ebbbeee35453eeebbbe....\n....ffeeb333bbb3d3beeff....\n..cccfbb3dd3bfbdd33bbfccc..\n.c777fbdb3dbfefb33bdbf777c.\nc777ccfbbbbfe4efbbbbfcc777c\nc777777fbbfc444cfbbf777777c\n.c7777fcff77ccc77ffcf7777c.\n..cccf6c77777c77777c6fccc..\n....f69c77777c77777c96c....\n....f999f7777c7777f999f....\n....f999f77777c777f999f....\n...f69999fc77777cf99996f...\n...f699996ccc7ccc699996f...\n...f66996666ccc66669966f...\n...f6666fc6666666cf6666f...\n....f666c.fffffff.c666f....\n.....fff...........fff.....",
    "width": 27
  },
  {
    "height": 24,
    "label": "[PKMN] Venusaur (M) Front",
    "string": ".......eeeee.eeeee.......\n......ebbd3beb3dbbe......\n....eeee3bbbebbb3eeee....\n...eb333eee545eee3ddbe...\n...eb3dd3b54445b3333be...\n...fbbbeee35453eeebbbf...\n....feeb333bbb3d3beef....\n....fbb3dd3bfbdd33bbf....\n..ccfbdb3dbfefb33bdbfcc..\n.c777fbbbbfe4efbbbbf777c.\nc777ccfbbfc444cfbbfcc777c\nf777777ff77ccc77ff777777f\n.f777cf77777c77777fc777f.\n.cfff99f7777c7777f99fffc.\n.cbcfe9f77777c777f9efcbc.\n..ccfe99fc77777cf99efcc..\n...f66699ccc7ccc99666f...\n...f6699999ccc9999966f...\n...c69196999999969196c...\n..fcf61e999999999e16fcf..\n..f6cf6699999999966fc6f..\n..f66ffb699696996bff66f..\n..fb6bffff66666ffffb6bf..\n...fff....fffff....fff...",
    "width": 25
  },
  {
    "height": 23,
    "label": "[PKMN] Venusaur (M) Side",
    "string": ".....eeeee.eeeee..........\n....ebbd3beb3dbbe.........\n..eeee3bbbebbb3eeee.......\n.ebdd3eee545eee333be......\n.eb3333b54445b3dd3be......\n.fbbbeee35453eeebbbf......\n..feeb3d3bbb333beef.......\n..fbb33ddbfb3dd3bbf.......\n..fbdb33bfefbd3bdbfc......\n...fbbbbfe4efbbbbf77c.....\n..ccfbbfc444ceeefc777cc...\n.c77cff77ccc7c7777777f6c..\nc77c7c7777c777ff7777f996c.\nf7777f7777c77f99ffff9999c.\nf777cf777c777fee999999999c\n.fff6cfc77777ce9999969999c\n...c699ccc7cc699991969999c\n...f99999ccc9999991e9999c.\n...f99999999999999999996f.\n..f69999999999969996b6ff..\n..f669996cc69996ccffff....\n..c6b6bff..f6b9bf.........\n...ffff.....ffff..........",
    "width": 26
  },
  {
    "height": 21,
    "label": "[PKMN] Zangoose Back",
    "string": "....ee.........cc.....\n...fe2e.......c1bf....\n...f2e2f.....f1b1f....\n....f222f...f111f.....\n....f2222ebcb111f.....\n.....f21321b111f......\n.....f211111111f......\n.....e111111111f...ff.\n....f21111111111f.f1f.\n....f11111111111ff1fff\n....f111111111ff11bbbf\n...ffc11111fff11bb1bf.\n...c11c11cc1111b11bbf.\n..f1b11bcb11111111bfe.\ne22221fbc11111111ffe..\n.e2ffbbbb11111111ff...\n.cfffcbbb1111111bff...\n..ff.cbbbb11111bff....\n...f.ccbbfbbbbff......\n.....fbbbcffccbf......\n......fff...fff.......",
    "width": 22
  },
  {
    "height": 21,
    "label": "[PKMN] Zangoose Front",
    "string": "....ff.........ee....\n...ff1f.......e2ef...\n...f1b1f.....f2e2f...\n....f111f...f222f....\n....f111bfbe2222f....\n.....f111b12312f.....\n.ff..f111111112f.....\n.f1f.f111111111e.....\nfff1f11111111212f....\nf11bf12111111222f....\n.f11fbaf21112fafff...\n.f1fff1a11211af11f...\n..ff11f11b1b1111b1f..\n..f1b111111121f12222e\ne22221f11212221f2f2e.\n.e2ff11122221211ffff.\n.ffff11221211111.ff..\n..ff.f121111111f.f...\n...f.ff11fff11ff.....\n.....fbbff.ffbbf.....\n......fff...fff......",
    "width": 21
  },
  {
    "height": 21,
    "label": "[PKMN] Zangoose Left",
    "string": ".........cc...........\n........b1cc..........\n.......c1b1c..........\n.......bbbff..........\n......cbbe2eff........\n....fcbbe2e22f........\n...fb1122222f.........\n..f11132222f..........\n.f11111122f...........\nea11211222f.......cc..\nf111ee12211f.ccccb1c..\nf11efa3211bfcb11111bcc\n.f11a221111cb1111bbb1c\n..f1121bbc11c1111111c.\n..2fb11c11c1c11111cc..\n..22111e22f1c1111c....\n..f11bbe2ffbc111bc....\n...bbbbfcfbcbbbbc.....\n...fbbbbfbc..ccc......\n....cbbfff............\n....fff...............",
    "width": 22
  },
  {
    "height": 21,
    "label": "[PKMN] Zangoose Right",
    "string": "...........ee.........\n..........ee2e........\n..........e222e.......\n..........ff222.......\n........ffc1c22e......\n........f11c1cbbcf....\n.........f1111111bf...\n..........f11111111f..\n..cc.......fbb111111f.\n..c1ccc....fb1111111ae\nccb1111bc.f11111ee111f\nc1bbb1111cfb1111afe11f\n.c1111111bc111111a11f.\n..c111111c111cbb111f..\n...c11111c11c11cbbfe..\n....c1111c1bf22e222e..\n....cb111cbbff2e22bf..\n.....cbbbbcbcfcf2bb...\n......ccc..cbbfbbbf...\n............fbbcff....\n.............fff......",
    "width": 22
  },
  {
    "height": 16,
    "label": "[SMB1] Mario Idle",
    "string": ".....22222......\n....222222222...\n....eee44e4.....\n...e4e444e444...\n...e4ee444e444..\n...ee4444eeee...\n.....4444444....\n....ee2eee......\n...eee2ee2eee...\n..eeee2222eeee..\n..44e242242e44..\n..444222222444..\n..442222222244..\n....222..222....\n...eee....eee...\n..eeee....eeee..",
    "width": 16
  },
  {
    "height": 32,
    "label": "[SMB1] Super Mario Idle",
    "string": "......22222.....\n....2222224.....\n...22222244.....\n...22222222222..\n...eee44e444....\n..e44e44ee4444..\n..e44ee44444444.\n.ee44ee444e4444.\n.ee44444eeeeee..\n.eee44444eeeee..\n...ee44444444...\n....244444e.....\n....e2eeee2e....\n...ee2eeee2ee...\n..eee2eeee2eee..\n.eeee2eeee2eeee.\n.eee22eeee22eee.\neeee22eeee22eeee\neeee22222222eeee\neeee24222242eeee\n4444222222224444\n4444222222224444\n.44422222222444.\n.44222222222244.\n..22222..22222..\n.22222....22222.\n.22222....22222.\n.22222....22222.\n..eeee....eeee..\n..eeee....eeee..\neeeeee....eeeeee\neeeeee....eeeeee",
    "width": 16
  },
  {
    "height": 20,
    "label": "[SMBW] Mario Idle",
    "string": "......ccccc...\n....cc22252c..\n...c2222551c..\n..c2222ffffff.\n.c222fffffffff\n.cdfff4f4f4...\ncdedf4dfdfdee.\nc4edffddddddde\ncf4dfddf44444e\n.ff44dfffffff.\n..fee444ffff..\n...c2eeee8....\n..c22266998...\n..ceee611918..\n..e111e11918..\n..e11e666998..\n..e11e66868...\n...eeeefef....\n...feee4f4f...\n...ffffffff...",
    "width": 14
  },
  {
    "height": 28,
    "label": "[SMBW] Super Mario Idle",
    "string": ".......ccccc...\n.....cc22522c..\n....c2225512c..\n...c222fffffff.\n..c22ffffffffff\n.c22fffffffffff\n.c22ff411411ff.\n.4dff441fdf1...\n4edff4d1fdf1de.\n4e4fffdd44ddde.\n.444fddfe4444e.\n.ff444fffffffff\n..ff44ddffffff.\n...fe4444444e..\n....c22cceee...\n...c22c2e111e..\n..c2222e11111e.\n..c2222e11111e.\n..8c2222e111e..\n..88c22cceee1..\n..868ccc99968..\n..86669999968..\n...866699868...\n...866666868...\n....8888888....\n....eeeeefef...\n....feeee4f4f..\n....fffffffff..",
    "width": 15
  },
  {
    "height": 15,
    "label": "[SBM1] Boo",
    "string": "......fffff.....\n....ff11111ff...\n...fdd1111111f..\n..fd1111111111f.\n..fd111111f1f1f.\n.fd1ff1111f1f11f\n.fdf11f11111111f\n.fdf11111212121f\nfd11f1111222221f\nfd1111111222221f\nfdd11111222221f.\n.fdddd11212121f.\n..fffddd11111f..\n.....ffdddfff...\n.......fff......",
    "width": 16
  },
  {
    "height": 25,
    "label": "[PKMN] Luxray Back",
    "string": ".......ff........\n.......fcf.......\n..ff..fcccf..ff..\n..fcf.fcccf.fcf..\n..fccfccfccfccf..\n.f9fcfcfffcfcf9f.\n.f9fcfffffffcf9f.\n.f6fffffffffff6f.\nff6fffcfffcfff6ff\nfffffcccccccfffff\n.ff5ffccccccffff.\n.fe5effccccffff..\nf55544fffffff....\nffe4efffffff.....\n..f4ffcffffff....\n...ffffcffcfff...\n...ffcfcfffcff...\n....ffffcfffff...\n....fffffffff....\n....ffffffffff...\n...ff6fffff6ff...\n...fff6f.f6fff...\n....f66f.f66f....\n....f66f.f66f....\n.....ff...ff.....",
    "width": 17
  },
  {
    "height": 29,
    "label": "[PKMN] Luxray Front",
    "string": "............ee...\n...........e5e...\n.........eee5ee..\n.........e55544e.\n........fcce4eee.\n.......fccfe4e...\n......fcc..ee....\n......fc.........\n.....ffcc.ff.....\n....fcffcffcf....\n.....fcfffcf.....\n.....fffcfff.....\n....fffcccfff....\n...fcffcccffcf...\n...ffcfcccfcff...\n..ffffcccccffff..\nff69ffcccccff96ff\nfc999fcccccf999cf\nfc949fcccccf949cf\n.f646fcccccf646f.\n.ff6effcccffe6ff.\n..ffe5fffff5eff..\n...f94fcccf49ff..\n..fff66ccc66fff..\n..ffcff6e6ffcff..\n...fffffffffff...\n....ffff.ffff....\n....fccf.fccf....\n.....ff...ff.....",
    "width": 17
  },
  {
    "height": 22,
    "label": "[PKMN] Luxray Side",
    "string": "............fffff........\n............fcccccf......\n.............fcccccf.....\n..............fcccccff...\n...ee......fffffccccccf..\n..e5e......fffffffccccc..\neee5ee....fffff66fcccccf.\ne55544e...fcccf996fccccf.\n.ee4eee....fccf9e6fcccccf\n..e4ff......fcf9e6fcccccf\n..eef.....ffccf6966e5ccce\n...ffc.ff..fffffff694f96f\n....ffcfcffc6fffffff69ff.\n.....ffcfcc666fccfffff...\n.......fccc66fccccf......\n......fcccc666fcccf......\n......f66ccf6fcccf.......\n.....ff66ffffff6cf.......\n.....f66fff..ffecff......\n.....fc6ff.....f6cff.....\n......f66f......fccf.....\n.......ff........ff......",
    "width": 25
  },
  {
    "height": 24,
    "label": "[SMB1] Blooper 1",
    "string": "......deed......\n.....dedded.....\n....dedddded....\n...ddeddddedd...\n..ddeddddddedd..\n.dddeddddddeddd.\ndddeddddddddeddd\n...edddddddde...\n...dddddddddd...\n...dffffffffd...\n...fddffffddf...\n...dffdffdffd...\n...dffdffdffd...\n..dfddffffddfd..\n..ddeeddddeedd..\n..edddddddddde..\n..dd.dddddd.dd..\n..ed.ed..de.de..\n..dd.dd..dd.dd..\n..ed.ed..de.de..\n...d.dd..dd.d...\n...d.ed..de.d...\n...d..d..d..d...\n......d..d......",
    "width": 16
  },
  {
    "height": 16,
    "label": "[SMB1] Blooper 2",
    "string": "......deed......\n.....dedded.....\n....dedddded....\n...ddeddddedd...\n..ddeddddddedd..\n.dddeddddddeddd.\ndddeddddddddeddd\n...edddddddde...\n...dffffffffd...\n.edddddffddddde.\ndddddddddddddddd\nedddeddddddeddde\ndddd.dd..dd.dddd\n.edd.ed..de.dde.\n..ddd.d..d.ddd..\n...dd.d..d.dd...",
    "width": 16
  },
  {
    "height": 32,
    "label": "[SMB1] Bowser 1",
    "string": "............111.................\n........661114..................\n.......6661144..................\n.....116666446..................\n.4..6116666666..................\n4f4661166666666.................\n444111666466666.................\n444416664446666.................\n144466441646666116661...........\n.1.44446664666611661146.........\n.1.116166146666116111446111.....\n....1...6446661116614466114.....\n........144661116666666664461...\n........446611166666666666661...\n......14446611166666611166666...\n.......44..6611111166114666111..\n.............66444116644666114..\n.........444..1f44411666666644..\n........441f444f144616666666661.\n........44ff4444ff66166611166641\n........41f4444441661166114666..\n........4ff44444666611666446611.\n.........1f444446666116666666111\n..........f1444.666661666611644.\n................666661166646646.\n.................66666116666666.\n..................6666611116666.\n...................6666661111111\n...................4466444411111\n..................44444444444411\n.................11441144114444.\n................1114111411144444",
    "width": 32
  },
  {
    "height": 32,
    "label": "[SMB1] Bowser 2",
    "string": "............111.................\n........661114..................\n.......6661144..................\n.....116666446..................\n.4..6116666666..................\n4.4661166666666.................\n444111666466666.................\n444416664446666.................\n114466441646666116661...........\n.1.44446644666611661146.........\n.1.1.6.64466666116111446111.....\n.44444444466661116614466114.....\n..444444466661116666666664461...\n....6666666611166666666666661...\n.......6666611166666611166666...\n...........6611111166114666111..\n.............66444116644666114..\n.........444..1f44411666666644..\n........441f444f144616666666661.\n........44ff4444ff66166611166641\n........41f4444441661166114666..\n........4ff44444666611666446611.\n.........1f444446666116666666111\n..........f1444.666661666611644.\n................666661166646646.\n.................66666116666666.\n..................6666611116666.\n...................6666661111111\n...................4466444411111\n..................44444444444411\n.................11441144114444.\n................1114111411144444",
    "width": 32
  },
  {
    "height": 16,
    "label": "[SMB1] Goomba",
    "string": "......eeee......\n.....eeeeee.....\n....eeeeeeee....\n...eeeeeeeeee...\n..effeeeeeeffe..\n.eeedfeeeefdeee.\n.eeedffffffdeee.\neeeedfdeedfdeeee\neeeedddeedddeeee\neeeeeeeeeeeeeeee\n.eeeeddddddeeee.\n....dddddddd....\n....ddddddddff..\n...ffdddddfffff.\n...fffdddffffff.\n....fff..fffff..",
    "width": 16
  },
  {
    "height": 23,
    "label": "[SMB1] Piranha Plant 1",
    "string": "..6..........6..\n.6411......1146.\n.661........166.\n.46611....11664.\n66641......14666\n4666611..1166664\n664661....166466\n66666......66666\n6466661..1666646\n6666461..1646666\n.466666..666664.\n.664666..666466.\n..66664..46666..\n...6466666646...\n.....646646.....\n44.....44.....44\n4644...44...4464\n.4644..44..4464.\n.44644.44.44644.\n..4464.44.4644..\n..444644446444..\n...4444444444...\n......4444......",
    "width": 16
  },
  {
    "height": 24,
    "label": "[SMB1] Piranha Plant 2",
    "string": "......6..6......\n.....64..46.....\n....666..666....\n....466..664....\n...6664..4666...\n...6666..6666...\n..46466..66464..\n..66666..66666..\n..66646..64666..\n..64666..66646..\n..66664..46666..\n..64666..66646..\n...6646..6466...\n...6666..6666...\n....464..464....\n......6..6......\n44.....44.....44\n4644...44...4464\n.4644..44..4464.\n.44644.44.44644.\n..4464.44.4644..\n..444644446444..\n...4444444444...\n......4444......",
    "width": 16
  }
]
gallery.innerHTML='';
if (data&&data.length) {
  data.forEach(function(image) {
    createCanvas(image);
  });
  sortCanvases();
} else {
  gallery.innerHTML='<p>No images found.</p>';
}
