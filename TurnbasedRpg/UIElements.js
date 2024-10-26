function UpdateCarryingOrb(string){
    const inventoryImage = document.querySelector("#inventoryImage");
    inventoryImage.src = string;
}

function UpdateInventory(itemToUpdateName, numberChange, inventoryPanel){
    _itemsInInventory.forEach((item)=>{
        inventoryPanel.append(item);
    })
}
function InitInventory(inventoryPanel){
    _orbImages.forEach((orb)=>{
        const orbButton = document.createElement("itemButton");
        orbButton.innerHTML = orb[0]+"</br>";
        orbButton.addEventListener("click", (e)=>{
            UpdateCarryingOrb(orb[1].src);
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
        InitInventory(inventoryPanel);
    UpdateInventory();
    inventoryPanel.style.display="flex";
    _isInventoryOpen = true;
}
function CloseInventory(inventoryPanel){
    inventoryPanel.style.display = "none";
    _isInventoryOpen = false;
}