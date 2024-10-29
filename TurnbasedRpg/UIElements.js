const UI = {
    dialogueBox: document.querySelector("#dialogueBox"),
    inventoryButton: document.querySelector("#inventoryButton"),
    battleInterface: document.querySelector("#battleInterface"),
    manaDisplay: document.querySelector("#manaDisplay"),
    playerCurrentHealthbar:  document.querySelector("#playerCurrentHealthbar"),
    enemyCurrentHealthbar: document.querySelector("#enemyCurrentHealthbar"),
    attackType: document.querySelector("#attackType"),
    attacksBox: document.querySelector("#attacksBox"),
    inventoryPanel: document.querySelector("#inventoryPanel"),
    inventoryImage: document.querySelector("#inventoryImage"),
    attackButtons: document.querySelectorAll("attackButton"),
}

function UpdateCarryingOrbUI(string){
    UI.inventoryImage.src = string;
}

function InitInventoryUI(){
    _orbClassInstances.forEach((orb)=>{
        const orbButton = document.createElement("itemButton");
        orbButton.innerHTML = orb[0]+"</br>";
        orbButton.addEventListener("click", (e)=>{
            EquipNewOrb(orb[1]);
            UpdateCarryingOrbUI(orb[1].image.src);
        })
        UI.inventoryPanel.append(orbButton);
    })
    _isInventoryInit = true;
}
function ToggleInventory(){
    if (_isInventoryOpen)
    {
        CloseInventory();
        return;
    }
    OpenInventory();
}
function OpenInventory(){
    if (!_isInventoryInit)
        InitInventoryUI();
    UpdateInventory();
    UI.inventoryPanel.style.display="flex";
    _isInventoryOpen = true;
}
function CloseInventory(){
    UI.inventoryPanel.style.display = "none";
    _isInventoryOpen = false;
}

function ShowDialogueMessage(message) {
    UI.dialogueBox.innerHTML = message;
}
function SetManaDisplay(message) {
    UI.manaDisplay.innerHTML = "Mana: " + message;
}
