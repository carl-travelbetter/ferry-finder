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
    console.log("Search By Route 20:49");
    let route = document.getElementById("ferryRoute").value;
    console.log("Route Selected "+route);
    const matchingFerries = ferryRoutes.filter(ferry => 
     ferry.route.includes(route)
     );
    
     matchingFerries.forEach(ferry => {
         console.log("Ferry Crossing "+ferry.route);
         
         const card = document.createElement("div");
         card.classList.add("ferryCard");
         
         //add route title
         const routeName = document.createElement('h2');
         routeName.textContent = ferry.route;
         card.appendChild(routeName);
         
         //add crossing time
         const crossingTime = document.createElement('p');
         crossingTime.textContent = `Crossing Time: ${ferry.crossing_time}`;
         card.appendChild(crossingTime);
         
         const operatorLabel = document.createElement('h3');
         operatorLabel.textContent = `Route Operators`;
         card.appendChild(operatorLabel);
         
         //Operator list
         const operatorList = document.createElement('ul');
         ferry.operators.forEach(operator => {
             const operatorItem = document.createElement('li');
             operatorItem.textContent = operator;
             operatorList.appendChild(operatorItem);
         });
         card.appendChild(operatorList);
         
         //foot passenger
         const footPassenger = document.createElement('p');
         if (ferry.foot_passenger == "Yes")
         {
            footPassenger.textContent = `Foot Passengers: ✅` ;
         }
         else
         {
             footPassenger.textContent = `Foot Passengers: ❌`;
         }
         card.appendChild(footPassenger);
         
         //Dog Friendly
         const dogFriendly = document.createElement('p');
         if (ferry.dog_friendly == "Yes")
         {
             dogFriendly.textContent = `Dog Friendly: ✅`;
         }
         else
         {
             dogFriendly.textContent = `Dog Friendly: ❌`;
         }
         card.appendChild(dogFriendly);
         
         //ND Rating
         const rating = document.createElement('p');
         rating.textContent = `Travelbetter Rating: ${ferry.nd_rating}`;
         card.appendChild(rating);
         
         //Notes 
         const notes = document.createElement('p');
         notes.textContent = `Notes: ${ferry.notes}`;
         card.appendChild(notes);
         
    results.appendChild(card);
         
     });
}



