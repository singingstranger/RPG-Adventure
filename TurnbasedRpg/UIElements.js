function UpdateCarryingOrbUI(string){
    const inventoryImage = document.querySelector("#inventoryImage");
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