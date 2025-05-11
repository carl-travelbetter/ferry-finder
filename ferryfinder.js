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
    createTagButtons(); // load tag buttons
  })
  .catch(error => console.error("Error loading ferry data:", error));

function createTagButtons() {
  const container = document.getElementById("tagFilters");
  if (!ferryTags.length) return;

  ferryTags.forEach(tag => {
    const button = document.createElement("button");
    button.className = "tag-btn";
    button.setAttribute("data-tag", tag.Id);
    button.innerHTML = `${tag.Icon} ${tag.Label}`;
    
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      updateNeedSearch();
    });

    container.appendChild(button);
  });
}

function updateNeedSearch() {
  const selected = Array.from(document.querySelectorAll('.tag-btn.active'))
    .map(btn => btn.dataset.tag);

  const results = document.getElementById("needResults");
  results.innerHTML = "";

  if (selected.length === 0) {
    results.innerHTML = "<p>Please select one or more travel needs to see matching routes.</p>";
    return;
  }
  
  const matchingRoutes = ferryRoutes.filter(route => 
    selected.every(tag => route.tags.includes(tag))
  );

  if (matchingRoutes.length === 0) {
    results.innerHTML = "<p>No matching routes found. Try adjusting your filters.</p>";
    return;
  }

  matchingRoutes.forEach(ferry => {
    const card = document.createElement("div");
    card.className = "ferryCard fade-in";
    
    const routeTitle = document.createElement("h2");
    routeTitle.textContent = ferry.route;
    card.appendChild(routeTitle);

    const tagList = document.createElement("div");
    ferry.tags.forEach(tag => {
      const match = ferryTags.find(t => t.Id === tag);
      if (match) {
        const tagP = document.createElement("p");
        tagP.textContent = `${match.Icon} ${match.Label}`;
        tagList.appendChild(tagP);
      }
    });

    card.appendChild(tagList);
    results.appendChild(card);
  });
}


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

         const sailings = document.createElement('p');
         sailings.textContent = `Salings: ${ferry.sailings}`;
         card.appendChild(sailings);

         const priceFrom = document.createElement('p');
         priceFrom.textContent = `Prices From: ${ferry.pricesFrom}`;
         card.appendChild(priceFrom);
                                                 
       
         const operatorSection = document.createElement('div');
         operatorSection.classList.add('operator-section');
         
         const operatorHeading = document.createElement('strong');
         operatorHeading.textContent = 'Route Operators:';
         operatorSection.appendChild(operatorHeading);

         
       
         //Operator list
         const operatorList = document.createElement('ul');
         operatorList.classList.add('operator-list');

         //Find Operator 1
         const operatorItem1 = document.createElement('li');
         operatorItem1.classList.add('operator-item');
         const operator1 = ferry.operator1;
        if (operator1)
        {
           const matchingOperators = ferryOperators.filter(operator => 
           operator.operatorName.includes(operator1));

            matchingOperators.forEach(operator => {
               console.log("Matching Opeartor "+operator.operatorName);
               const emoji = document.createElement('span');
               emoji.classList.add('emoji');
               emoji.textContent = '🚢';
         
              
               operatorItem1.appendChild(emoji);  
               const operator1Link = document.createElement('a');
               operator1Link.classList.add('operator-link');
               operator1Link.href = operator.link;
               operator1Link.textContent = ` ${operator.operatorName} (Rating: ${operator.travelbetterRating})`;
               operatorItem1.appendChild(operator1Link);
               operatorList.appendChild(operatorItem1);
    
               
          });
        }
        else
        {
          console.log("No Operator 1");
        }
          



         //Load Ferry Operator 2 if present
         if (ferry.operator2)
         {
           console.log("Operator 2 "+ferry.operator2);
           const operatorItem2 = document.createElement('li');
           const operatorLookup = ferry.operator2;
           const matchingOperators = ferryOperators.filter(operator => 
           operator.operatorName.includes(operatorLookup));

           matchingOperators.forEach(operator => {
           console.log("Matching Operator "+operator.operatorName);
             const emoji = document.createElement('span');
             emoji.classList.add('emoji');
             emoji.textContent = '🚢';
         
            
             operatorItem2.appendChild(emoji);  
             const operatorLink = document.createElement('a');
             operatorLink.classList.add('operator-link');
             operatorLink.href = operator.link;
             operatorLink.textContent = ` ${operator.operatorName} (Rating: ${operator.travelbetterRating})`;
             operatorItem2.appendChild(operatorLink);
             operatorList.appendChild(operatorItem2);
    
               
        });    
           
         }
         else
         {
           console.log("No Operator 2");
         }

         //Load Ferry Operator 3 if present
         if (ferry.operator3)
         {
           console.log("Operator 3 "+ferry.operator3);
           const operatorItem3 = document.createElement('li');
           const operatorLookup = ferry.operator3;
           const matchingOperators = ferryOperators.filter(operator => 
           operator.operatorName.includes(operatorLookup));

           matchingOperators.forEach(operator => {
           console.log("Matching Operator "+operator.operatorName);

             const emoji = document.createElement('span');
             emoji.classList.add('emoji');
             emoji.textContent = '🚢';
  
             operatorItem3.appendChild(emoji);  
             const operatorLink = document.createElement('a');
             operatorLink.classList.add('operator-link');
             operatorLink.href = operator.link;
             operatorLink.textContent = ` ${operator.operatorName} (Rating: ${operator.travelbetterRating})`;
             operatorItem3.appendChild(operatorLink);
             operatorList.appendChild(operatorItem3);
    
               
        });    
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


         //Load up the tags-features
         const featureList = document.createElement('h2');
         featureList.textContent = `Route Features`;
         card.appendChild(featureList);
       
         //const featureTags = 
         ferry.tags.forEach(featureTag => {
           console.log("Feature "+featureTag);
           const matchingTag = ferryTags.find(tag => tag.Id === featureTag);
           if (matchingTag)
           {
             console.log("Matching Tag "+matchingTag.Icon);
             const tagP = document.createElement('p');
             tagP.textContent = `${matchingTag.Icon} ${matchingTag.Label}`;
             card.appendChild(tagP);
           }
           else 
           { 
             console.log("No Matching Tag Found");
           }
         });

           
         //ND Rating
         const rating = document.createElement('p');
         rating.textContent = `Travelbetter Rating: ${ferry.rating}`;
         card.appendChild(rating);
         
         
         
    results.appendChild(card);
         
     });
}

function searchByOperator() {
  const selectedOperator = document.getElementById("ferryProvider").value;
  const resultsContainer = document.getElementById("providerResults");
  resultsContainer.innerHTML = "";

  if (!selectedOperator) {
    resultsContainer.innerHTML = "<p>Please select an operator to search routes.</p>";
    return;
  }

  const matchingRoutes = ferryRoutes.filter(route =>
    route.operator1 === selectedOperator ||
    route.operator2 === selectedOperator ||
    route.operator3 === selectedOperator
  );

  if (matchingRoutes.length === 0) {
    resultsContainer.innerHTML = "<p>No routes found for that operator.</p>";
    return;
  }

  matchingRoutes.forEach(ferry => {
    const card = document.createElement("div");
    card.className = "ferryCard fade-in";

    const title = document.createElement("h2");
    title.textContent = ferry.route;
    card.appendChild(title);

    const notes = document.createElement("p");
    notes.classList.add('note-text');
    notes.textContent = ferry.notes || "No notes for this route";
    card.appendChild(notes);

    const crossingTime = document.createElement("p");
    crossingTime.textContent = `Crossing Time: ${ferry.dayCrossingTimeMins || "N/A"} mins`;
    card.appendChild(crossingTime);

    const sailings = document.createElement("p");
    sailings.textContent = `Sailings: ${ferry.sailings}`;
    card.appendChild(sailings);

    const price = document.createElement("p");
    price.textContent = `Prices From: ${ferry.pricesFrom}`;
    card.appendChild(price);

    const tagsHeading = document.createElement("h3");
    tagsHeading.textContent = "Route Features";
    card.appendChild(tagsHeading);

    ferry.tags.forEach(tagId => {
      const tag = ferryTags.find(t => t.Id === tagId);
      if (tag) {
        const tagEl = document.createElement("p");
        tagEl.textContent = `${tag.Icon} ${tag.Label}`;
        card.appendChild(tagEl);
      }
    });

    const rating = document.createElement("p");
    rating.textContent = `Travelbetter Rating: ${ferry.rating}`;
    card.appendChild(rating);

    resultsContainer.appendChild(card);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.getElementById('clearFilters');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      document.querySelectorAll('.tag-btn.active').forEach(btn => {
        btn.classList.remove('active');
      });
      updateNeedSearch(); // Refresh the results (likely clears them)
    });
  }
});


