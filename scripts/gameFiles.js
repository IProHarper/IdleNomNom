export function saveGame(){
    localStorage.setItem("idleFishingData-IProHarper", JSON.stringify(gameData));
    const savePopup = document.getElementById('savePopup');
            savePopup.classList.add('show');
            // Auto disappear after 1 second
            setTimeout(() => {
                savePopup.classList.remove('show');
            }, 2000);
}


export function checkSaveFile(){
    if (localStorage.getItem("idleFishingData-IProHarper")){
        let data = JSON.parse(localStorage.getItem("idleFishingData-IProHarper"));
        loadSaveFile(data);
    }
}

export function loadSaveFile(data){
    gameData = data;
    gameData.gamestage = 0;
    //updateDisplay();
}