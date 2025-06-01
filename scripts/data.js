import "./break_infinity.js";


export function formatNum(num){
        if (num.greaterThan(1000000)) {
            return num.toExponential(2);
        } else {
            return num.toFixed();
        }
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
    }
]


export var gameState = {
    score: new Decimal(0),
    liftimeScore: new Decimal(0),
    dotValue: new Decimal(1),
    dotMulti: new Decimal(1),
    dotSpeed: new Decimal(4),
    dotsEaten: new Decimal(0),
    nomscensionCount: new Decimal(0),
    stage: 0,
    stageReached: false,
    nomsecScoreReq: new Decimal(100000),
    nomscensionCount: new Decimal(0),
    nomscendMultiValue: new Decimal(0),
    nomCoins: new Decimal(0),
    nomscendScore: new Decimal(0),
    nomscentionUnlocked: false,
    dotIntervalID: 99919
}


export var upgrades = {
    //Standard Upgrades
    autoFeed : {
        id: "upgradeAutoFeedSpeed",
        type: "score",
        enabled: false,
        increase: new Decimal(0.5),
        speed: new Decimal(10),
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.25,
        level: 0,
        maxlevel: 19,
        resetTier: 0
    },
    increaseDotValue : {
        id: "upgradeDotValue",
        type: "score",
        increase: new Decimal(1),
        baseCost: new Decimal(50),
        cost: new Decimal(50),
        upgradeScale: 1.1,
        level: 0,
        maxlevel: 100,
        resetTier: 0
    },
    increaseDotSpeed : {
        id: "upgradeDotSpeed",
        type: "score",
        increase: new Decimal(0.2),
        baseCost: new Decimal(100),
        cost: new Decimal(100),
        upgradeScale: 1.5,
        level: 0,
        maxlevel: 16,
        resetTier: 0
    },
    increaseDotMulti : {
        id: "upgradeDotMulti",
        type: "score",
        increase: new Decimal(2),
        baseCost: new Decimal(1000),
        cost: new Decimal(1000),
        upgradeScale: 2,
        level: 0,
        maxlevel: 5,
        resetTier: 0
    },
    //Nom Upgrades
    increaseNomDotMulti : {
        id: "upgradeNomDotMulti",
        type: "nomCoins",
        increase: new Decimal(10),
        baseCost: new Decimal(5),
        cost: new Decimal(5),
        upgradeScale: 5.12,
        level: 1,
        maxlevel: 100,
        resetTier: 1
    },
    increaseDotMultiMax : {
        id: "upgradeDotMultiMax",
        type: "nomCoins",
        increase: new Decimal(1),
        baseCost: new Decimal(5),
        cost: new Decimal(5),
        upgradeScale: 5.52,
        level: 1,
        maxlevel: 10,
        resetTier: 1
    }
}


export var shopUpgrades = {
    unlockAutoFeed : {
        id: "unlockAutoFeed",
        bought: false,
        cost: new Decimal(200),
        resetTier: 0
    }
}

