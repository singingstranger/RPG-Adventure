function IsAlive(monster) {
    return monster.health.current > 0;
}

if (typeof module === 'object') {
    module.exports = IsAlive;
}