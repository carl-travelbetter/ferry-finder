//let ferryData = [];
let ferryOperators = [];
let ferryRoutes = [];

fetch('ferryOperators.json')
  .then(response => response.json())
  .then(data => {
    ferryOperators = data;
    console.log("Ferry Operators loaded:", ferryOperators);
  })
  .catch(error => console.error("Error loading ferry data:", error));

fetch('ferryRoutes.json')
  .then(response => response.json())
  .then(data => {
    ferryRoutes = data;
    console.log("Ferry routes loaded:", ferryRoutes);
  })
  .catch(error => console.error("Error loading ferry data:", error));

function searchByCrossing() {
    const results = document.getElementById("crossingResults");
    results.innerHTML = "";
    console.log("Search By Crossing");
    let route = document.getElementById("ferryRoute").value;
    console.log("Route Selected "+route);
    const matchingFerries = ferryRoutes.filter(ferry => 
     ferry.route.includes(route)
     );
    
     matchingFerries.forEach(ferry => {
         console.log("Ferry Operator "+ferry.crossing_time);
         const card = document.createElement("div");
         card.classList.add("ferryCard");
         card.innerHTML = `
        <h3>${ferry.crossing_time}</h3>
        <p><strong>Notes:</strong> ${ferry.notes}</p>
    `;
    results.appendChild(card);
         
     });
}

function searchByProvider() {

    const selectedProvider = document.getElementById("ferryProvider").value;
    const results = document.getElementById("providerResults");
    results.innerHTML = `<h3>Provider Result</h3>`;

    const matching = ferryOperators.find(ferry => ferry.operator === selectedProvider);

    if (matching) {
        const card = document.createElement("div");
        card.classList.add("ferryCard");
        card.innerHTML = `
            <h3>${matching.operator}</h3>
            <p><strong>Amendments:</strong> ${matching.amendments}</p>
            <p><strong>Cancellations:</strong> ${matching.cancellations}</p>
            <p><a href="${matching.link}" target="_blank" rel="noopener noreferrer">Book with ${matching.operator} today</a></p>
            <p>Travelbetter Rating * ${matching.travelbetterRating} / 5 </p>
        `;
        results.appendChild(card);
    } else {
        results.innerHTML += `<p>No info available for this provider.</p>`;
    }
}

