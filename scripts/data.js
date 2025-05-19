import "./break_infinity.js";

let gameStages = [
    {
        name: "Begining",
        progressText: "Unlock Nomscension",
        requiredScore: new Decimal(10000)
    }
]

export var gameState = {
    score: new Decimal(0),
    liftimeScore: new Decimal(0),
    dotValue: new Decimal(1),
    dotMulti: new Decimal(5),
    dotSpeed: new Decimal(4),
    gameStage: {
        stage: 0,
        data: gameStages
    }
}
export var upgrades = {
    autoFeed : {
        id: "unlockAutoFeed",
        enabled: false,
        increase: new Decimal(0.1),
        speed: new Decimal(1.5),
        cost: new Decimal(25),
        level: 0,
        upgradeScale: 1.25
    },
    increaseDotValue : {
        id: "upgradeDotValue",
        increase: new Decimal(1),
        cost: new Decimal(50),
        upgradeScale: 1.1,
        owned: 0
    }
}


