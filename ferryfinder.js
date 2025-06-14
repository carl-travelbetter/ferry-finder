//let ferryData = [];
let ferryOperators = [];
let ferryRoutes = [];
let ferryTags = [];
let activeTags = [];

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
     // ✅ Render routes after data is loaded and DOM is ready
    renderAllRoutes();
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





//New Onload functions with listeners fo each toggle button.
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document Loading...");
  // Toggle view buttons
  const showRoutesBtn = document.getElementById("showRoutesBtn");
  const showOperatorsBtn = document.getElementById("showOperatorsBtn");

  showRoutesBtn.addEventListener("click", () => {
    document.getElementById("routeResults").style.display = "block";
    document.getElementById("operatorResults").style.display = "none";
    showRoutesBtn.classList.add("active");
    showOperatorsBtn.classList.remove("active");
    renderAllRoutes(); // re-render in case filters changed
  });

  showOperatorsBtn.addEventListener("click", () => {
    document.getElementById("routeResults").style.display = "none";
    document.getElementById("operatorResults").style.display = "block";
    showOperatorsBtn.classList.add("active");
    showRoutesBtn.classList.remove("active");
    renderAllOperators(); // also filtered by tags
  });

   const clearButton = document.getElementById('clearFilters');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      document.querySelectorAll('.tag-btn.active').forEach(btn => {
        btn.classList.remove('active');
        activeTags = [];
      });
       renderAllRoutes(); 
    });
  }
 
});

function renderAllRoutes() {
  const container = document.getElementById("routeResults");
  container.innerHTML = "";

  const matchingRoutes = ferryRoutes.filter(route =>
    activeTags.length === 0 || activeTags.every(tag => route.tags.includes(tag))
  );

  if (matchingRoutes.length === 0) {
    container.innerHTML = "<p>No routes match your selected needs.</p>";
    return;
  }

  matchingRoutes.forEach(ferry => {
    const card = document.createElement("div");
    card.className = "ferryCard routeCard fade-in";

    const title = document.createElement("h2");
    title.textContent = ferry.route;
    card.appendChild(title);

    const notes = document.createElement("p");
    notes.textContent = ferry.notes || "No notes for this route";
    card.appendChild(notes);

    const crossing = document.createElement("p");
    crossing.textContent = `Crossing Time: ${ferry.dayCrossingTimeMins || "N/A"} mins`;
    card.appendChild(crossing);

    const price = document.createElement("p");
    price.textContent = `Prices From: ${ferry.pricesFrom || "Unknown"}`;
    card.appendChild(price);

    const tagList = document.createElement("div");
    ferry.tags.forEach(tagId => {
      const tag = ferryTags.find(t => t.Id === tagId);
      if (tag) {
        const tagEl = document.createElement("p");
        tagEl.textContent = `${tag.Icon} ${tag.Label}`;
        tagList.appendChild(tagEl);
      }
    });
    card.appendChild(tagList);
   
   //Operator list
         const operatorList = document.createElement('ul');
         operatorList.classList.add('operator-list');

         //Find Operator 1
         const operatorItem1 = document.createElement('li');
         operatorItem1.classList.add('operator-item');
         const operator1 = ferry.operator1;
         if (operator1)
         {
           const operatorSection = document.createElement("h3");
           operatorSection.textContent = "Ferry Options For This Route";
           card.appendChild(operatorSection);
           
           const matchingOperators = ferryOperators.filter(operator => 
           operator.operatorName.includes(operator1));

            matchingOperators.forEach(operator => {
               console.log("Matching Operator "+operator.operatorName);
               const emoji = document.createElement('span');
               emoji.classList.add('emoji');
               emoji.textContent = '🚢';
         
              
               operatorItem1.appendChild(emoji);  
               const operator1Link = document.createElement('a');
               operator1Link.classList.add('operator-link');
               operator1Link.href = operator.link;
               operator1Link.dataset.operatorname = operator.operatorName;
              operator1Link.target = "_blank";  // Open external link in new tab
              operator1Link.rel = "noopener noreferrer";
               operator1Link.textContent = ` ${operator.operatorName} (Rating: ${operator.travelbetterRating})`;
               operatorItem1.appendChild(operator1Link);
               operatorList.appendChild(operatorItem1);
    
               
          });
        }
        else
        {
          console.log("No Operator 1");
        }

         //Find Operator 2
         const operatorItem2 = document.createElement('li');
         operatorItem2.classList.add('operator-item');
         const operator2 = ferry.operator2;
         if (operator2)
         {
           const matchingOperators = ferryOperators.filter(operator => 
           operator.operatorName.includes(operator2));

            matchingOperators.forEach(operator => {
               console.log("Matching Operator "+operator.operatorName);
               const emoji = document.createElement('span');
               emoji.classList.add('emoji');
               emoji.textContent = '🚢';
         
              
               operatorItem2.appendChild(emoji);  
               const operatorLink = document.createElement('a');
               operatorLink.classList.add('operator-link');
               operatorLink.href = operator.link;
               operatorLink.dataset.operatorname = operator.operatorName;
              operatorLink.target = "_blank";  // Open external link in new tab
              operatorLink.rel = "noopener noreferrer";
               operatorLink.textContent = ` ${operator.operatorName} (Rating: ${operator.travelbetterRating})`;
               operatorItem2.appendChild(operatorLink);
               operatorList.appendChild(operatorItem2);
    
               
          });
        }
        else
        {
          console.log("No Operator 2");
        }

        //Find Operator 3
         const operatorItem3 = document.createElement('li');
         operatorItem3.classList.add('operator-item');
         const operator3 = ferry.operator3;
         if (operator3)
         {
           const matchingOperators = ferryOperators.filter(operator => 
           operator.operatorName.includes(operator3));

            matchingOperators.forEach(operator => {
               console.log("Matching Operator "+operator.operatorName);
               const emoji = document.createElement('span');
               emoji.classList.add('emoji');
               emoji.textContent = '🚢';
         
              
               operatorItem3.appendChild(emoji);  
               const operatorLink = document.createElement('a');
               operatorLink.classList.add('operator-link');
               operatorLink.href = operator.link;
               operatorLink.dataset.operatorname = operator.operatorName;
              operatorLink.target = "_blank";  // Open external link in new tab
              operatorLink.rel = "noopener noreferrer";
               operatorLink.textContent = ` ${operator.operatorName} (Rating: ${operator.travelbetterRating})`;
               operatorItem3.appendChild(operatorLink);
               operatorList.appendChild(operatorItem3);
    
               
          });
        }
        else
        {
          console.log("No Operator 3");
        }
    
    card.append(operatorList);
    container.appendChild(card);
  });
}

function renderAllOperators() {
  const container = document.getElementById("operatorResults");
  container.innerHTML = "";

  ferryOperators.forEach(operator => {
    const matchingRoutes = ferryRoutes.filter(route =>
      (route.operator1 === operator.operatorName ||
        route.operator2 === operator.operatorName ||
        route.operator3 === operator.operatorName) &&
      (activeTags.length === 0 || activeTags.every(tag => route.tags.includes(tag)))
    );

    if (matchingRoutes.length === 0) return;

    const operatorCard = document.createElement("div");
    operatorCard.className = "operatorCard fade-in";

    const title = document.createElement("h2");
    title.textContent = `🚢 ${operator.operatorName}`;
    operatorCard.appendChild(title);

    const rating = document.createElement("p");
    rating.textContent = `⭐ Travelbetter Rating: ${operator.travelbetterRating || "N/A"}`;
    operatorCard.appendChild(rating);

    const amend = document.createElement("p");
    amend.textContent = `🔁 Amendments: ${operator.amendmentPolicy}`;
    operatorCard.appendChild(amend);

    const cancel = document.createElement("p");
    cancel.textContent = `❌ Cancellations: ${operator.cancellationPolicy}`;
    operatorCard.appendChild(cancel);

    const flags = document.createElement("ul");
    [
      { label: "Foot Passengers", value: operator.footPassengers, icon: "👣" },
      { label: "Dog Friendly", value: operator.dogFriendly, icon: "🐶" },
      { label: "Accessibility", value: operator.accessibilitySupport, icon: "♿" }
    ].forEach(flag => {
      const li = document.createElement("li");
      li.textContent = `${flag.icon} ${flag.label}: ${flag.value ? "✅" : "❌"}`;
      flags.appendChild(li);
    });
    operatorCard.appendChild(flags);

    const bookLink = document.createElement("a");
    bookLink.href = operator.link;
    bookLink.className = "bookButton";
    bookLink.target = "_blank";
    bookLink.rel = "noopener noreferrer";
    bookLink.textContent = "Visit Website / Book Now";
    operatorCard.appendChild(bookLink);

    // Add their matching routes
    matchingRoutes.forEach(route => {
      const routeCard = document.createElement("div");
      routeCard.className = "ferryCard routeCard";

      const rTitle = document.createElement("h3");
      rTitle.textContent = route.route;
      routeCard.appendChild(rTitle);

      const rNotes = document.createElement("p");
      rNotes.textContent = route.notes || "No notes";
      routeCard.appendChild(rNotes);

      const rTime = document.createElement("p");
      rTime.textContent = `Crossing Time: ${route.dayCrossingTimeMins || "N/A"} mins`;
      routeCard.appendChild(rTime);

      const rPrice = document.createElement("p");
      rPrice.textContent = `Prices From: ${route.pricesFrom}`;
      routeCard.appendChild(rPrice);

      
      
      operatorCard.appendChild(routeCard);
    });

    container.appendChild(operatorCard);
  });
}



function createTagButtons() {
  const container = document.getElementById("tagFilters");
  const descriptions = document.getElementById("tagDescriptions");
  if (!ferryTags.length) return;

  ferryTags.forEach(tag => {
    const button = document.createElement("button");
    button.className = "tag-btn";
    button.setAttribute("data-tag", tag.Id);
    button.innerHTML = `${tag.Icon} ${tag.Label}`;

    //add to description
    const desP = document.createElement("p");
    desP.innerHTML = `${tag.icon} ${tag.label} ${tag.description}`;
    console.log("***Description***");
    
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    
      activeTags = Array.from(document.querySelectorAll('.tag-btn.active'))
        .map(btn => btn.dataset.tag);
    
      const isOperatorView = document.getElementById("operatorResults").style.display === "block";
      if (isOperatorView) {
        renderAllOperators();
      } else {
        renderAllRoutes();
      }
});
    
    descriptions.appendChild(desP);
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

  //copy select to activeTags
  //activeTags = selected;
  
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
               operator1Link.dataset.operatorname = operator.operatorName;
              operator1Link.target = "_blank";  // Open external link in new tab
              operator1Link.rel = "noopener noreferrer";
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
             operatorLink.dataset.operatorname = operator.operatorName;
              operatorLink.target = "_blank";  // Open external link in new tab
              operatorLink.rel = "noopener noreferrer";
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
              operatorLink.dataset.operatorname = operator.operatorName;
              operatorLink.target = "_blank";  // Open external link in new tab
              operatorLink.rel = "noopener noreferrer";
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
  console.log("Search By Operator");
  const selectedOperator = document.getElementById("ferryProvider").value;
  console.log("Operator Selected "+selectedOperator);
  const resultsContainer = document.getElementById("providerResults");
  resultsContainer.innerHTML = "";

  if (!selectedOperator) {
    resultsContainer.innerHTML = "<p>Please select an operator to search routes.</p>";
    return;
  }


  //Build the operator card
  const operatorData = ferryOperators.find(op =>
  op.operatorName.toLowerCase() === selectedOperator.toLowerCase()
);
  
if (operatorData) {
  const operatorCard = document.createElement("div");
  operatorCard.className = "operatorCard fade-in";

  const title = document.createElement("h2");
  title.textContent = `🚢 ${operatorData.operatorName}`;
  operatorCard.appendChild(title);

  const rating = document.createElement("p");
  rating.textContent = `⭐ Travelbetter Rating: ${operatorData.travelbetterRating || "N/A"}`;
  operatorCard.appendChild(rating);

  const amend = document.createElement("p");
  amend.textContent = `🔁 Amendments: ${operatorData.amendmentPolicy}`;
  operatorCard.appendChild(amend);

  const cancel = document.createElement("p");
  cancel.textContent = `❌ Cancellations: ${operatorData.cancellationPolicy}`;
  operatorCard.appendChild(cancel);

  const flags = document.createElement("ul");
  flags.className = "operator-flags";
  
  const flagItems = [
    { label: "Foot Passengers", value: operatorData.footPassengers, icon: "👣" },
    { label: "Dog Friendly", value: operatorData.dogFriendly, icon: "🐶" },
    { label: "Accessibility Support", value: operatorData.accessibilitySupport, icon: "♿" }
  ];

  flagItems.forEach(flag => {
    const li = document.createElement("li");
    li.textContent = `${flag.icon} ${flag.label}: ${flag.value ? "✅" : "❌"}`;
    flags.appendChild(li);
  });

  operatorCard.appendChild(flags);

  const bookLink = document.createElement("a");
  bookLink.href = operatorData.link;
  bookLink.textContent = "Visit Website / Book Now";
  bookLink.target = "_blank";
  bookLink.rel = "noopener noreferrer";
  bookLink.className = "bookButton";
  operatorCard.appendChild(bookLink);

  /*
  if (operatorData.moreInfoLink) {
    const tipsLink = document.createElement("a");
    tipsLink.href = operatorData.moreInfoLink;
    tipsLink.textContent = "🧭 View Travelbetter Tips";
    tipsLink.target = "_blank";
    tipsLink.rel = "noopener noreferrer";
    tipsLink.className = "infoButton";
    operatorCard.appendChild(tipsLink);
  }*/

  resultsContainer.appendChild(operatorCard);
}


  const routeTitle = document.createElement("h2");
  routeTitle.textContent = "Routes they offer that match your needs";
  resultsContainer.appendChild(routeTitle);

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

    //if passes needs test then create route card
    const needsTest = activeTags.length === 0 || activeTags.every(tag => ferry.tags.includes(tag));

    if (needsTest) {
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

    //look up the operator in the ferry operator file
    if (selectedOperator) {
      console.log("Search By Operator - Creating Book now Link...");
      const operatorData = ferryOperators.find(op =>
        op.operatorName.toLowerCase().includes(selectedOperator.toLowerCase())
      );

      if (operatorData && operatorData.link) {
        const bookNow = document.createElement("a");
        bookNow.href = operatorData.link;
        bookNow.textContent = "Book Now";
        bookNow.className = "bookButton";
        bookNow.target = "_blank";
        bookNow.rel = "noopener noreferrer";
        bookNow.title = "Affiliate link – opens in new tab";
        card.appendChild(bookNow);
      }
      
    }

    resultsContainer.appendChild(card);
    } //end of if needsTest
  });

}

/*
function refreshActiveSection() {
  const currentSection = document.querySelector(".search-section:where(:not([style*='display: none']))");

  if (currentSection) {
    if (currentSection.id.includes("crossing")) {
      searchByCrossing();
    } else if (currentSection.id.includes("operator")) {
      searchByOperator();
    } else {
      updateNeedSearch();
    }
  }
}*/


/*
document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.getElementById('clearFilters');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      document.querySelectorAll('.tag-btn.active').forEach(btn => {
        btn.classList.remove('active');
      });
       renderAllRoutes(); 
    });
  }
});*/


