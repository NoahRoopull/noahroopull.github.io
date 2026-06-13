const repo=document.getElementById('repo');

function createScript(scriptInfo) {
  const container=document.createElement('div');
  container.classList.add('script-container');
  const label=document.createElement('div');
  label.classList.add('script-label');
  label.textContent=scriptInfo.label||'Untitled';
  container.appendChild(label);
  repo.appendChild(container);
  container.addEventListener('click',function() {
    let copyTarget=document.createElement('textarea');
    copyTarget.textContent=scriptInfo.script;
    console.log(copyTarget.textContent);
    repo.appendChild(copyTarget);
    copyTarget.focus({preventScroll:true});
    copyTarget.select();
    document.execCommand('copy');
    copyTarget.setSelectionRange(0,0);
    copyTarget.remove();
    label.textContent='Copied!';
    setTimeout(function() {
      label.textContent=scriptInfo.label||'Untitled';
    },3000);
  });
}

function sortScripts() {
  const children=Array.from(repo.children);
  children.sort(function(a,b) {
    const textA=a.querySelector('.script-label')?.textContent.trim()??'';
    const textB=b.querySelector('.script-label')?.textContent.trim()??'';
    return textA.localeCompare(textB);
  });
  children.forEach(function(child) {
    repo.appendChild(child);
  });
}


data=[
  {
    "label": "Kill Brick",
    "script":`
--KillBrick.lua
--Attached to a part

script.Parent.Touched:Connect(function(part)
	if part.Parent:FindFirstChild("Humanoid") then
		part.Parent.Humanoid.Health = 0
	end
end)`
  },
  {
    "label": "Damage Brick",
    "script":`
--DamageBrick.lua
--Attached to a part

debounce=false
script.Parent.Touched:Connect(function(part)
  local humanoid=part.Parent:FindFirstChild("Humanoid")
  if not debounce and humanoid then
    debounce=true
    humanoid.Health=humanoid.Health-30
    wait(1)
    debounce=false 
  end
end)`
  },
  {
    "label": "Jump Pad",
    "script":`
--JumpPad.lua
--Attached to a part

debounce=false
script.Parent.Touched:Connect(function(part)
  local humanoid=part.Parent:FindFirstChild("Humanoid")
  if not debounce and humanoid then
    debounce=true
    humanoid.JumpHeight=50
    humanoid.Jump=true
    wait(0.5)
    humanoid.JumpHeight=7.2
    wait(2.5)
    debounce=false 
  end
end)`
  },
  {
    "label": "Speed Boost",
    "script":`
--SpeedBoost.lua
--Attached to a part

debounce=false
script.Parent.Touched:Connect(function(part)
  local humanoid=part.Parent:FindFirstChild("Humanoid")
  if not debounce and humanoid then
    debounce=true
    humanoid.WalkSpeed=48
    wait(5)
    humanoid.WalkSpeed=16
    debounce=false 
  end
end)`
  },
  {
    "label": "Door",
    "script":`
--Door.lua
--Attached to the Door part itself
--Door should have a ProximityPrompt and two parts named OpenPosition and ClosedPosition respectively

local door=script.Parent
local proxPrompt=door.ProximityPrompt
local openCFrame=door.OpenPosition.CFrame
local closedCFrame=door.ClosedPosition.CFrame

local open=false
local TweenService=game:GetService("TweenService")
local TweenInfo=TweenInfo.new(1)

local tweenOpen=TweenService:Create(door,TweenInfo,{CFrame=openCFrame})
local tweenClose=TweenService:Create(door,TweenInfo,{CFrame=closedCFrame})

tweenOpen.Completed:Connect(function(pbState)
  proxPrompt.Enabled=true
end)
tweenClose.Completed:Connect(function(pbState)
  proxPrompt.Enabled=true
end)

proxPrompt.Triggered:Connect(function(player)
  proxPrompt.Enabled=false
  if open then
    tweenClose:Play()
    proxPrompt.ObjectText='Open Door'
  else
    tweenOpen:Play()  
    proxPrompt.ObjectText='Close Door'
  end
  open=not open
end)`
  }
]
repo.innerHTML='';
console.log(data)
if (data&&data.length) {
  data.forEach(function(script) {
    createScript(script);
  });
  sortScripts();
} else {
  repo.innerHTML='<p>No scripts found.</p>';
}