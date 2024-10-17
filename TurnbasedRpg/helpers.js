function RectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

function Restart(){
    location.reload();
}

function GetRandomInt(min, max){
    let minCeiling = Math.ceil(min);
    let maxFloor = Math.floor(max);
    let rounded = Math.floor(Math.random()*(maxFloor-minCeiling)+minCeiling);
    return rounded;
}
