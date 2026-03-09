// Konfiguracja Twojego projektu
const TOKEN_CONFIG = {
    address: "0xDDD9610E8E96e9341001DE7F0e13bB8E189b1ABc", // Twój zweryfikowany kontrakt na Base
    maxSupply: 2000000,
    rpc: "https://mainnet.base.org", // ZMIENIONE: Oficjalny punkt dostępowy sieci Base
    decimals: 9 // UWAGA: Standard ERC-20 to zazwyczaj 18. Sprawdź, czy w kodzie Solidity nie masz 9.
};

const minAbi = [
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)"
];

async function updateMiningProgress() {
    const circleBar = document.getElementById('circleBar');
    const percentText = document.getElementById('percentVal');
	const nagrodaText = document.getElementById('percentVal1');

    if (!circleBar || !percentText) return; // Zabezpieczenie przed błędami

    try {
        const provider = new ethers.JsonRpcProvider(TOKEN_CONFIG.rpc);
        const contract = new ethers.Contract(TOKEN_CONFIG.address, minAbi, provider);

        const rawSupply = await contract.totalSupply();
        const currentSupply = parseFloat(ethers.formatUnits(rawSupply, TOKEN_CONFIG.decimals));
		console.log(currentSupply);
        let nagroda = TOKEN_CONFIG.maxSupply - currentSupply;
		nagroda = nagroda / 400000;
        let percentage = (currentSupply / TOKEN_CONFIG.maxSupply) * 100;
        if (percentage > 100) percentage = 100;

        // Obliczanie animacji SVG
        const radius = 90;
        const circumference = 2 * Math.PI * radius; 
        const offset = circumference - (percentage / 100 * circumference);
        
        circleBar.style.strokeDasharray = `${circumference}`;
        circleBar.style.strokeDashoffset = offset;

        // Wyświetlanie tekstu
        percentText.innerText = percentage.toFixed(2) + "%";
		nagrodaText.innerText = "+" + nagroda.toFixed(3) + " ZDC";
		document.getElementById('supplyDetailed').innerText = currentSupply.toLocaleString('pl-PL', { maximumFractionDigits: 0 });

    } catch (error) {
        console.error("UFO Connection Error:", error);
        percentText.innerText = "OFFLINE";
    }
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    updateMiningProgress();
    // Odświeżaj co 60 sekund
    setInterval(updateMiningProgress, 60000);
});