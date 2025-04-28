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
         
         const operatorSection = document.createElement('div');
         operatorSection.classList.add('operator-section');
         
         const operatorHeading = document.createElement('strong');
         operatorHeading.textContent = 'Operators:';
         operatorSection.appendChild(operatorHeading);
        
         //Operator list
         const operatorList = document.createElement('ul');
         operatorList.classList.add('operator-list');
         ferry.operators.forEach(operatorName => {
             const operatorItem = document.createElement('li');
             operatorItem.classList.add('operator-item');
             
             const emoji = document.createElement('span');
             emoji.classList.add('emoji');
             emoji.textContent = '🚢';
             operatorItem.appendChild(emoji);
             
             const matchingOperator = ferryOperators.find(op => op.operator === operatorName);
             
             if (matchingOperator) {
                 const link = document.createElement('a');
                 link.classList.add('operator-link');
                 link.href = matchingOperator.link;
                 link.textContent = `${matchingOperator.operator} (Rating: ${matchingOperator.travelbetterRating})`;
                 link.target = "_blank";
                 operatorItem.appendChild(link);
             } else {
                 operatorItem.textContent = operatorName;
             }

             operatorList.appendChild(operatorItem);
         });
         
         //Add the operator list to the operator sector
         operatorSection.appendChild(operatorList);
         
         //add the operators to the ferry card
         card.appendChild(operatorSection);
         
         //foot passenger
         const footPassenger = document.createElement('p');
         footPassenger.textContent = `Foot Passengers: ${ferry.foot_passenger ? '✅' : '❌'}`;


         card.appendChild(footPassenger);
         
         //Dog Friendly
         const dogFriendly = document.createElement('p');
         dogFriendly.textContent = `Dog Friendly: ${ferry.dog_friendly ? '✅' : '❌'}`;
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



