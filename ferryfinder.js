//let ferryData = [];
let ferryOperators = [];
let ferryRoutes = [];
let ferryTags = [];

fetch('ferry-operators.json')
  .then(response => response.json())
  .then(data => {
    ferryOperators = data;
    console.log("Ferry Operators loaded:", ferryOperators);
  })
  .catch(error => console.error("Error loading ferry data:", error));

fetch('ferry-routes.json')
  .then(response => response.json())
  .then(data => {
    ferryRoutes = data;
    console.log("Ferry Routes loaded:", ferryRoutes);
  })
  .catch(error => console.error("Error loading ferry data:", error));

fetch('ferry-tags.json')
  .then(response => response.json())
  .then(data => {
    ferryTags = data;
    console.log("Ferry Tags loaded:", ferryTags);
  })
  .catch(error => console.error("Error loading ferry data:", error));

function searchByCrossing() {
    const results = document.getElementById("crossingResults");
    results.innerHTML = "";
    console.log("Search By Route 16:17");
    let route = document.getElementById("ferryRoute").value;
    console.log("Route Selected "+route);
    const matchingFerries = ferryRoutes.filter(ferry => 
     ferry.route.includes(route)
     );
    
     matchingFerries.forEach(ferry => {
         console.log("Ferry Crossing "+ferry.route);
         
         const card = document.createElement("div");
         card.classList.add("ferryCard");
         card.classList.add('fade-in');
         
         //add route title
         const routeName = document.createElement('h2');
         routeName.textContent = ferry.route;
         card.appendChild(routeName);
         
         
         //Notes 
         const notes = document.createElement('p');
         notes.classList.add('note-text');
         if (ferry.notes)
         {
             notes.textContent = `${ferry.notes}`;
         }
         else
         {
             notes.textContent = "No notes for this route";
         }
         card.appendChild(notes);
         
         //add crossing time
         const crossingTime = document.createElement('p');
         crossingTime.textContent = `Crossing Time: ${ferry.dayCrossingTimeMins} mins`;
         card.appendChild(crossingTime);
         
         const operatorSection = document.createElement('div');
         operatorSection.classList.add('operator-section');
         
         const operatorHeading = document.createElement('strong');
         operatorHeading.textContent = 'Route Operators:';
         operatorSection.appendChild(operatorHeading);

         const emoji = document.createElement('span');
         emoji.classList.add('emoji');
         emoji.textContent = '🚢';
         
       
         //Operator list
         const operatorList = document.createElement('ul');
         operatorList.classList.add('operator-list');

         //Lets add just one operator for now
         const operatorItem1 = document.createElement('li');
         operatorItem1.classList.add('operator-item');
         //const operator1 = ferry.operator1;
         const operator1 = ferryOperators.filter(operator1 => 
         operator1.operatorName.includes(ferry.operator1));

       
       
         operatorItem1.appendChild(emoji);  
         const operator1Link = document.createElement('a');
         operator1Link.classList.add('operator-link');
         operator1Link.textContent = ` Operator ${operator1.operatorName}`;
         operatorItem1.appendChild(operator1Link);
         operatorList.appendChild(operatorItem1);

         //Load Ferry Operator 2 if present
         if (ferry.operator2)
         {
           const operatorItem2 = document.createElement('li');
           operatorItem2.classList.add('operator-item');
           operatorItem2.textContent = ferry.operator2;
           operatorList.appendChild(operatorItem2);
         }
         else
         {
           console.log("No Operator 2");
         }

         //Load Ferry Operator 3 if present
         if (ferry.operator3)
         {
           const operatorItem3 = document.createElement('li');
           operatorItem3.classList.add('operator-item');
           operatorItem3.textContent = ferry.operator3;
           operatorList.appendChild(operatorItem3);
         }
         else
         {
           console.log("No Operator 3");
         }                               
         operatorSection.appendChild(operatorList);
         
         //add the operators to the ferry card
         card.appendChild(operatorSection);
       
       /*
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
         */
         /*
         //foot passenger
         const footPassenger = document.createElement('p');
         footPassenger.textContent = `Foot Passengers: ${ferry.foot_passenger ? '✅' : '❌'}`;


         card.appendChild(footPassenger);
         
         //Dog Friendly
         const dogFriendly = document.createElement('p');
         dogFriendly.textContent = `Dog Friendly: ${ferry.dog_friendly ? '✅' : '❌'}`;
         card.appendChild(dogFriendly);*/
         
         //ND Rating
         const rating = document.createElement('p');
         rating.textContent = `Travelbetter Rating: ${ferry.rating}`;
         card.appendChild(rating);
         
         
         
    results.appendChild(card);
         
     });
}



