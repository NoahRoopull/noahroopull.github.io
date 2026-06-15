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

--CUSTOMIZE:
-- Damage per tick. The player has 100 health by default.
local damage=30
-- Cooldown between damaging the character, in seconds. Should be at least 0.1.
local cooldown=1

debounce=false
script.Parent.Touched:Connect(function(part)
  local humanoid=part.Parent:FindFirstChild("Humanoid")
  if not debounce and humanoid then
    debounce=true
    humanoid.Health=humanoid.Health-damage
    wait(math.max(0.1,cooldown))
    debounce=false 
  end
end)`
  },
  {
    "label": "Jump Pad",
    "script":`
--JumpPad.lua
--Attached to a part

--CUSTOMIZE:
-- Height of bounce in studs. Normally, the player can jump 7.2 studs.
local jumpDistance=50
-- Cooldown between bounces in seconds. Should be at least 0.5.
local cooldown=3

debounce=false
script.Parent.Touched:Connect(function(part)
  local humanoid=part.Parent:FindFirstChild("Humanoid")
  if not debounce and humanoid then
    debounce=true
    humanoid.JumpHeight=jumpDistance
    humanoid.Jump=true
    wait(0.5)
    humanoid.JumpHeight=7.2
    wait(math.max(cooldown-0.5,0))
    debounce=false 
  end
end)`
  },
  {
    "label": "Speed Boost",
    "script":`
--SpeedBoost.lua
--Attached to a part

--CUSTOMIZE:
-- How much faster the player should move after stepping on the speed boost.
local speedMultiplier = 3
-- How long the player should be boosted for, in seconds. Should be less than 60.
local speedDuration = 5

debounce=false
script.Parent.Touched:Connect(function(part)
  local humanoid=part.Parent:FindFirstChild("Humanoid")
  if not debounce and humanoid then
    debounce=true
    humanoid.WalkSpeed=16*speedMultiplier
    wait(math.min(speedDuration,60))
    humanoid.WalkSpeed=16
    debounce=false 
  end
end)`
  },
  {
    "label": "Door (No sound)",
    "script":`
--Door.lua
--Attached to the Door part itself
--Door should have a ProximityPrompt and two parts named OpenPosition and ClosedPosition respectively

--CUSTOMIZE:
-- How long it takes for the door to open/close, in seconds.
local doorMoveTime=1

local door=script.Parent
local proxPrompt=door.ProximityPrompt
local openCFrame=door.OpenPosition.CFrame
local closedCFrame=door.ClosedPosition.CFrame

local open=false
local TweenService=game:GetService("TweenService")
local TweenInfo=TweenInfo.new(doorMoveTime)

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
  },
  {
    "label": "Door (With sound)",
    "script":`
--Door.lua
--Attached to the Door part itself
--Door should have a ProximityPrompt and two parts named OpenPosition and ClosedPosition respectively
--Door should now also have 3 sounds titled TriggerSound, OpenSound, and CloseSound.

--CUSTOMIZE:
-- How long it takes for the door to open/close, in seconds.
local doorMoveTime=1

local door=script.Parent
local proxPrompt=door.ProximityPrompt
local openCFrame=door.OpenPosition.CFrame
local closedCFrame=door.ClosedPosition.CFrame
local openSound=door:FindFirstChild("OpenSound")
local closeSound=door:FindFirstChild("CloseSound")
local triggerSound=door:FindFirstChild("TriggerSound")

local open=false
local TweenService=game:GetService("TweenService")
local TweenInfo=TweenInfo.new(doorMoveTime)

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
    if triggerSound then
	  triggerSound:Play()
	end
	if closeSound then
	  closeSound:Play()
	end
    tweenClose:Play()
    proxPrompt.ObjectText='Open Door'
  else
    if triggerSound then
	  triggerSound:Play()
	end
	if openSound then
	  openSound:Play()
	end
    tweenOpen:Play()
    proxPrompt.ObjectText='Close Door'
  end
  open=not open
end)`
  },
  {
    "label": "NPC Walking",
    "script":`
--Walk.lua
--Attached to the Rig model, in the same level as the Humanoid
--Workspace should have a Folder named Waypoints with parts labelled as numbers.
--Waypoints must be accessible.

--CUSTOMIZE:
-- How long the NPC waits after reaching each waypoint, in seconds. Should be positive or 0.
local waitTime=0


local waypoints=game.Workspace.Waypoints
local npc=script.Parent:WaitForChild("Humanoid")

while true do
  for wp=1,#waypoints:GetChildren()-1 do
    npc:MoveTo(waypoints[wp].Position)
    npc.MoveToFinished:Wait()
    wait(math.max(0,waitTime))
  end
end`
  },
  {
    "label": "NPC Talking (Random)",
    "script":`
--Talk.lua
--Attached to the Rig model, in the same level as the Humanoid
--The Rig must have a ProximityPrompt
--Workspace should have a Folder named Waypoints with parts labelled as numbers.
--Waypoints must be accessible.

--CUSTOMIZE:
-- Chat lines. Every line should be in quotes, and all except the last should have a comma afterward.
local chatList={
  "Hello!",
  "My name is Joe",
  "Hi-yah!"
}


local ChatService=game:GetService("Chat")
local head=script.Parent.Head
local prompt=head.ProximityPrompt

prompt.Triggered:Connect(function()
  ChatService:Chat(head,chatList[math.random(1,#chatList)])
end)`
  },
  {
    "label": "NPC Talking (Ordered)",
    "script":`
--Talk.lua
--Attached to the Rig model, in the same level as the Humanoid
--The Rig must have a ProximityPrompt
--Workspace should have a Folder named Waypoints with parts labelled as numbers.
--Waypoints must be accessible.

--CUSTOMIZE:
-- Chat lines. Every line should be in quotes, and all except the last should have a comma afterward.
local chatList={
  "Hello!",
  "My name is Joe",
  "Hi-yah!"
}


local ChatService=game:GetService("Chat")
local head=script.Parent.Head
local prompt=head.ProximityPrompt
local index=1

prompt.Triggered:Connect(function()
  ChatService:Chat(head,chatList[index])
  index=index+1
  if index>#chatList then
    index=1
  end
end)`
  },
  {
    "label": "Jumping Part",
    "script":`
--Jump.lua
--Attached to the Part that should jump
--The part must not be anchored

--CUSTOMIZE:
-- Horizontal force. Default is 10.
local horizontalForce=10
-- Vertical force. Default is 50.
local verticalForce=50
-- Duration of jumps, in seconds. Default is 3. Must be positive.
local jumpTime=3
-- Minimum time between jumps, in seconds. Default is 0.5. Must be positive.
local minWaitTime=0.5
-- Maximum time between jumps, in seconds. Default is 1. Must be positive.
local maxWaitTime=1
-- Does the part change color as it jumps?
local changeColor=false

local part=script.Parent
while true do
  part.Velocity=Vector3.new(math.random(-horizontalForce,horizontalForce),verticalForce,math.random(-horizontalForce,horizontalForce))
  if changeColor then
    part.BrickColor=BrickColor.random()
  end
  wait(jumpTime)
  part.Velocity=Vector3.new(0,0,0)
  wait(math.random(minJumpTime,maxJumpTime))
end`
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
