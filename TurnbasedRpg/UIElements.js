const dialogueBox = document.querySelector("#dialogueBox");
const inventoryButton = document.querySelector("#inventoryButton");
const battleInterface = document.querySelector("#battleInterface");
const manaDisplay = document.querySelector("#manaDisplay");
const playerCurrentHealthbar =  document.querySelector("#playerCurrentHealthbar");
const enemyCurrentHealthBar = document.querySelector("#enemyCurrentHealthbar");
const attackType = document.querySelector("#attackType");
const attacksBox = document.querySelector("#attacksBox");
const inventoryPanel = document.querySelector("#inventoryPanel");
const inventoryImage = document.querySelector("#inventoryImage");

function UpdateCarryingOrbUI(string){
    inventoryImage.src = string;
}

function InitInventoryUI(inventoryPanel){
    _orbClassInstances.forEach((orb)=>{
        const orbButton = document.createElement("itemButton");
        orbButton.innerHTML = orb[0]+"</br>";
        orbButton.addEventListener("click", (e)=>{
            EquipNewOrb(orb[1]);
            UpdateCarryingOrbUI(orb[1].image.src);
        })
        inventoryPanel.append(orbButton);
    })
    _isInventoryInit = true;
}
function ToggleInventory(inventoryPanel){
    if (_isInventoryOpen)
    {
        CloseInventory(inventoryPanel);
        return;
    }
    OpenInventory(inventoryPanel);
}
function OpenInventory(inventoryPanel){
    if (!_isInventoryInit)
        InitInventoryUI(inventoryPanel);
    UpdateInventory();
    inventoryPanel.style.display="flex";
    _isInventoryOpen = true;
}
function CloseInventory(inventoryPanel){
    inventoryPanel.style.display = "none";
    _isInventoryOpen = false;
}

function ShowDialogueMessage(message) {
    dialogueBox.innerHt = message;
}
function SetManaDisplay(message) {
    manaDisplay.innerHTML = "Mana: " + message;
}
