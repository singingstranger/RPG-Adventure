Object.keys(_orbs).forEach(key =>{
    const newImage = new Image();
    newImage.src = _orbs[key].src;
    const newOrb = new Orb({
        position: [0,0],
        rotation: 0,
        image: newImage, 
        frames: {max: 1, hold: 10}, 
        sprites: newImage, 
        animate: false,

        name: _orbs[key].name,
        description: _orbs[key].name,
        count: 0,

        type: _orbs[key].type
    });
    _orbClassInstances.push([_orbs[key].name, newOrb]);
})

function UpdateInventory(itemToUpdateName, numberChange, inventoryPanel){
    _itemsInInventory.forEach((item)=>{
        inventoryPanel.append(item);
    })
}

function AddToInventory(){
    UpdateInventory();
}

function EquipNewOrb(orb){
    _battlePlayer.attacks.pop();
    //console.log(_battlePlayer.attacks);
    _playerElementalAttacks.forEach((attack)=>{
        if (attack.type == orb.type.type){
            _battlePlayer.attacks.push(attack);
        }
    })
}