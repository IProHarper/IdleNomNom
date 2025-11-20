import "./break_infinity.js";

export var dotList = [];
export var squareList = [];
export var roboList = [];
export var mousePos = {
    x: 0,
    y: 0
}

export var mouseNom = {
    x: 0,
    y: 0,
    radius: 20,
    open: true,
    mouthAngle: 0,
    chompSpeed: 60,
    color: "yellow"
}

export const gameStages = [
    {
        name: "Beginning",
        progressText: "Unlock Nomscension",
        statType: "score",
        requirement: new Decimal(50000)
    },
    {
        name: "Nomcension",
        progressText: "Nomscend 10 times",
        statType: "nomscend",
        requirement: new Decimal(10)
    },
    {
        name: "Next level",
        progressText: "Reach Score Goa... Well I haven't implemented this yet actually",
        statType: "cap",
        requirement: new Decimal(10000000000000000000000000)
    }
]


export var gameState = {
    gameVersion: 0.9,
    score: new Decimal(0),
    liftimeScore: new Decimal(0),
    dotValue: new Decimal(1),
    dotMulti: new Decimal(1),
    dotSpeed: new Decimal(4),
    dotsEaten: new Decimal(0),
    dotMaxCount: 10,
    dotSpawnCount: 1,
    dotSpawnInterval: 5,
    nomscensionCount: new Decimal(0),
    nomScoreBoostAmount: new Decimal(1),
    stage: 0,
    stageReached: false,
    nomsecScoreReq: new Decimal(100000),
    nomscensionCount: new Decimal(0),
    nomscendDotVal: new Decimal(0),
    nomCoins: new Decimal(0),
    lifetimeNomCoins: new Decimal(0),
    nomscendScore: new Decimal(0),
    nomscentionUnlocked: false,
    nomCoinMulti: new Decimal(1),
    nomCoinBestGain: new Decimal(0),
    dotIntervalID: 99919,
    //Squares
    squares: new Decimal(0),
    squareValue : new Decimal(1),
    squareMulti : new Decimal(1),
    squaresEaten: new Decimal(0),
    squareMaxCount: 5,
    squareSpawnCount: 1,
    squareSpawnInterval: 10,
    squareSpawnIntervalID: 999,
    lifetimeSquares: new Decimal(0),
}


export var upgrades = {
    //Standard Upgrades
    increaseDotValue : {
        id: "upgradeDotValue",
        name: "Dot Value",
        desc: "Dot Value + 1.",
        type: "score",
        increase: new Decimal(1),
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.05,
        level: 1,
        minlevel: 1,
        maxlevel: 100,
        resetTier: 0
    },
     increaseDotMulti : {
        id: "upgradeDotMulti",
        name: "Dot Multiplier X",
        desc: "Multi + 2",
        type: "score",
        increase: new Decimal(2),
        baseCost: new Decimal(1000),
        cost: new Decimal(1000),
        upgradeScale: 2,
        level: 1,
        minlevel: 1,
        maxlevel: 5,
        resetTier: 0
    },
    increaseDotSpawnRate : {
        id: "upgradeDotSpawnRate",
        name: "Spawn Rate +",
        desc: "Increase the spawn rate by 0.5s",
        type: "score",
        increase: 0.5,
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.36,
        level: 1,
        minlevel: 1,
        maxlevel: 10,
        resetTier: 0
    },
    increaseDotSpawnCount : {
        id: "upgradeDotSpawnCount",
        name: "Dots Spawn Count",
        desc: "Increase the amount of dots that spawn by 1",
        type: "score",
        increase: 1,
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.36,
        level: 1,
        minlevel: 1,
        maxlevel: 50,
        resetTier: 0
    },
    increaseMaxDotCount : {
        id: "upgradeMaxDotCount",
        name: "Max Dots",
        desc: "Increase the amount of dots that can exist at the same time",
        type: "score",
        increase: 5,
        baseCost: new Decimal(50),
        cost: new Decimal(50),
        upgradeScale: 2.1,
        level: 1,
        minlevel: 1,
        maxlevel: 50,
        resetTier: 0
    },
    autoFeed : {
        id: "upgradeAutoFeedSpeed",
        name: "Auto Feed Speed",
        desc: "Increase the frequency at which dots are send automatically!",
        type: "score",
        enabled: false,
        increase: new Decimal(0.5),
        baseSpeed: new Decimal(9.95),
        speed: new Decimal(10),
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.25,
        level: 1,
        minlevel: 1,
        maxlevel: 19,
        resetTier: 0
    },
    increaseDotSpeed : {
        id: "upgradeDotSpeed",
        name: "Dot Speed +",
        desc: "Send those dots faster and faster!",
        type: "score",
        increase: new Decimal(0.2),
        baseSpeed: new Decimal(4),
        baseCost: new Decimal(50),
        cost: new Decimal(100),
        upgradeScale: 1.5,
        level: 1,
        minlevel: 1,
        maxlevel: 16,
        resetTier: 0
    },
    //Nom Upgrades
    increaseNomDotVal : {
        id: "upgradeNomDotVal",
        name: "Permanent Dot Base Value",
        desc: "Increase the base dot value permanently",
        type: "nomCoins",
        increase: new Decimal(10),
        baseCost: new Decimal(1),
        cost: new Decimal(1),
        upgradeScale: 1.21,
        level: 1,
        maxlevel: 100,
        resetTier: 1
    },
    increaseDotMultiMax : {
        id: "upgradeDotMultiMax",
        name: "Dot Multi Max Level+",
        desc: "Increase the max number of upgrades purchaseable for Dot Multiplier X",
        type: "nomCoins",
        increase: new Decimal(3),
        baseCost: new Decimal(2),
        cost: new Decimal(2),
        upgradeScale: 1.82,
        level: 1,
        maxlevel: 10,
        resetTier: 1
    },
    increaseDotValMax : {
        id: "upgradeDotValMax",
        name: "Dot Value Max Level+",
        desc: "Increase the max number of upgrades purchaseable for base upgrade Dot Value",
        type: "nomCoins",
        increase: new Decimal(25),
        baseCost: new Decimal(2),
        cost: new Decimal(2),
        upgradeScale: 2.52,
        level: 1,
        maxlevel: 20,
        resetTier: 1
    },
    increaseAutoFeedMax : {
        id: "upgradeAutoFeedMax",
        name: "Auto Feed Speed +",
        desc: "Increase the auto feeding speed even more!",
        type: "nomCoins",
        increase: new Decimal(0.1),
        baseCost: new Decimal(10),
        cost: new Decimal(10),
        upgradeScale: 1.82,
        level: 1,
        maxlevel: 5,
        resetTier: 1
    },
    increaseDotSpeedBase : {
        id: "upgradeDotSpeedBase",
        name: "Base Dot Speed+",
        desc: "Send those dots just that bit quicker!",
        type: "nomCoins",
        increase: new Decimal(0.1),
        baseCost: new Decimal(10),
        cost: new Decimal(10),
        upgradeScale: 1.82,
        level: 1,
        maxlevel: 7,
        resetTier: 1
    },
    increaseNomCoinMulti : {
        id: "upgradeNomCoinMulti",
        name: "Nom Coin x2",
        desc: "Nom coin gain x2 per level!",
        type: "nomCoins",
        increase: 2,
        baseCost: new Decimal(20),
        cost: new Decimal(20),
        upgradeScale: 1.26,
        level: 1,
        maxlevel: 10,
        resetTier: 1
    },
    increaseStartDotSpeedLevel : {
        id: "upgradeStartDotSpeedLevel",
        name: "Starting Dot Speed Level+",
        desc: "Increase the starting level of the base upgrade Dot Speed on Nomscension",
        type: "nomCoins",
        increase: 1,
        baseCost: new Decimal(20),
        cost: new Decimal(20),
        upgradeScale: 1.12,
        level: 1,
        maxlevel: 16,
        resetTier: 1
    },
    increaseStartDotMultiLevel : {
        id: "upgradeStartDotMultiLevel",
        name: "Starting Multi Level+",
        desc: "Increase the starting level of the base upgrade Dot Multiplier on Nomscension",
        type: "nomCoins",
        increase: 1,
        baseCost: new Decimal(20),
        cost: new Decimal(20),
        upgradeScale: 1.12,
        level: 1,
        maxlevel: 17,
        resetTier: 1
    },
    keepAutoFeed : {
        id: "keepAutoFeed",
        name: "Permanent Auto Feed",
        desc: "Keep auto feeding upgrades on Nomscension.",
        bought: false,
        type: "nomCoins",
        baseCost: new Decimal(200),
        cost: new Decimal(200),
        upgradeScale: 1,
        level: 1,
        maxlevel: 2,
        resetTier: 1
    },
    unlockSquares : {
        id: "unlockSquare",
        name: "Unlock Squares",
        desc: "Unlock squares which give you access to more upgrades!",
        bought: false,
        type: "nomCoins",
        baseCost: new Decimal(1e+6),
        cost: new Decimal(1e+6),
        upgradeScale: 1,
        level: 1,
        maxlevel: 2,
        resetTier: 1
    },
    increaseSquareValue : {
        id: "upgradeSquareValue",
        name: "Square Value",
        desc: "Square Value + 1.",
        type: "square",
        increase: new Decimal(1),
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.05,
        level: 1,
        minlevel: 1,
        maxlevel: 100,
        resetTier: 0
    },
     increaseSquareMulti : {
        id: "upgradeSquareMulti",
        name: "Square Multiplier X",
        desc: "Multi + 2",
        type: "square",
        increase: new Decimal(2),
        baseCost: new Decimal(1000),
        cost: new Decimal(1000),
        upgradeScale: 2,
        level: 1,
        minlevel: 1,
        maxlevel: 5,
        resetTier: 0
    },
    increaseSquareSpawnRate : {
        id: "upgradeSquareSpawnRate",
        name: "Spawn Rate +",
        desc: "Increase the spawn rate by 0.5s",
        type: "square",
        increase: 0.5,
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.36,
        level: 1,
        minlevel: 1,
        maxlevel: 10,
        resetTier: 0
    },
    increaseSquareSpawnCount : {
        id: "upgradeSquareSpawnCount",
        name: "Square Spawn Count",
        desc: "Increase the amount of squares that spawn by 1",
        type: "square",
        increase: 1,
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.36,
        level: 1,
        minlevel: 1,
        maxlevel: 50,
        resetTier: 0
    },
    increaseMaxSquareCount : {
        id: "upgradeMaxSquareCount",
        name: "Max Square",
        desc: "Increase the amount of square that can exist at the same time",
        type: "square",
        increase: 5,
        baseCost: new Decimal(50),
        cost: new Decimal(50),
        upgradeScale: 2.1,
        level: 1,
        minlevel: 1,
        maxlevel: 50,
        resetTier: 0
    },
    moreShopUpgrades : {
        id: "unlockMoreShopUpgrades",
        name: "More Shop Upgrades",
        desc: "Unlock some more shop upgrades to help boost your score!",
        bought: false,
        type: "nomCoins",
        baseCost: new Decimal(10),
        cost: new Decimal(10),
        upgradeScale: 1,
        level: 1,
        maxlevel: 2,
        resetTier: 1
    },
    nomCoinScoreBoost : {
        id: "unlockNomCoinScoreBoost",
        name: "Score Boost",
        desc: "Your score is now boosted by your lifetime NomCoin's! /100",
        bought: false,
        type: "nomCoins",
        baseCost: new Decimal(1),
        cost: new Decimal(1),
        upgradeScale: 1,
        level: 1,
        maxlevel: 2,
        resetTier: 1
    },
    unlockRoboNom : {
        id: "unlockRoboNoms",
        name: "Unlock Robo-Noms!",
        desc: "Unlock mini Robo-Nom that roams around for you eating dots",
        type: "nomCoins",
        increase: 1,
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1,
        level: 1,
        maxlevel: 2,
        resetTier: 1
    },
    addRoboNom : {
        id: "addRoboNom",
        name: "Spawn a Robo-Nom",
        desc: "Spawn some Robo-Noms to collect for you!",
        type: "score",
        increase: 1,
        baseCost: new Decimal(50),
        cost: new Decimal(50),
        upgradeScale: 1.75,
        level: 1,
        minlevel: 1,
        maxlevel: 4,
        resetTier: 0
    },
    increaseBigDotChance : {
        id: "upgradeBigDotChance",
        name: "Big Dot Spawn Chance",
        desc: "Adds a chance to send a mega dot woth 10x!",
        type: "nomCoins",
        increase: 1,
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.05,
        level: 1,
        maxlevel: 20,
        resetTier: 1
    }
}


export var shopUpgrades = {
    unlockAutoFeed : {
        id: "unlockAutoFeed",
        type: "score",
        bought: false,
        cost: new Decimal(200),
        resetTier: 0
    },
    unlockBigDots : {
        id: "unlockBigDots",
        bought: false,
        cost: new Decimal(10000),
        resetTier: 1
    }
}

