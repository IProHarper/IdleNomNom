import "./break_infinity.js";
import { keepAutofeed } from "./Upgrades/nomupgrades.js";



// class upgrade {
//     constructor(id,type){
    //     this.id = id;
    //     this.type = type
    // }
// }


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
    gameVersion: 0.8,
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
    nomscendDotVal: new Decimal(0),
    nomCoins: new Decimal(0),
    lifetimeNomCoins: new Decimal(0),
    nomscendScore: new Decimal(0),
    nomscentionUnlocked: false,
    nomCoinMulti: new Decimal(1),
    nomCoinBestGain: new Decimal(0),
    dotIntervalID: 99919
}


export var upgrades = {
    //Standard Upgrades
    autoFeed : {
        id: "upgradeAutoFeedSpeed",
        desc: "Send some dots automatically to Mr Nom Nom. Starts slow but a new upgrade is unlocked!",
        type: "score",
        enabled: false,
        increase: new Decimal(0.5),
        baseSpeed: new Decimal(10),
        speed: new Decimal(10),
        baseCost: new Decimal(25),
        cost: new Decimal(25),
        upgradeScale: 1.25,
        level: 1,
        minlevel: 1,
        maxlevel: 19,
        resetTier: 0
    },
    increaseDotValue : {
        id: "upgradeDotValue",
        desc: "Increase the base dot value.",
        type: "score",
        increase: new Decimal(1),
        baseCost: new Decimal(50),
        cost: new Decimal(50),
        upgradeScale: 1.05,
        level: 1,
        minlevel: 1,
        maxlevel: 100,
        resetTier: 0
    },
    increaseDotSpeed : {
        id: "upgradeDotSpeed",
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
    increaseDotMulti : {
        id: "upgradeDotMulti",
        desc: "Did someone say multiplication?",
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
    //Nom Upgrades
    increaseNomDotMulti : {
        id: "upgradeNomDotMulti",
        desc: "",
        type: "nomCoins",
        increase: new Decimal(10),
        baseCost: new Decimal(3),
        cost: new Decimal(3),
        upgradeScale: 5.12,
        level: 1,
        maxlevel: 100,
        resetTier: 1
    },
    increaseNomDotVal : {
        id: "upgradeNomDotVal",
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
        desc: "Increase the auto feeding max speed!",
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
    increaseBigDotChance : {
        id: "upgradeBigDotChance",
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
    },
    scoreBoost : {
        id : "scoreBoostNomCoins",
        type: "nomCoins",
        bought: false,
        cost: new Decimal(10000),
        resetTier: 1
    }
}

