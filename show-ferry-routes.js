let ferryOperators = [];
let ferryRoutes = [];
let ferryTags = [];
let activeTags = [];

fetch('ferry-tags.json')
  .then(response => response.json())
  .then(data => {
    ferryTags = data;
    console.log("Ferry Tags loaded:", ferryTags);
   // createTagButtons(); // load tag buttons
  })
  .catch(error => console.error("Error loading ferry data:", error));

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
    createRoutePills()
  })
  .catch(error => console.error("Error loading ferry data:", error));

//load route options for user
/*function populateRouteDropdown() {
  console.log("Populating Route Drop Down");
  const dropdown = document.getElementById("routeFilter");
  const routeNames = [...new Set(ferryRoutes.map(route => route.route))];

  routeNames.sort().forEach(route => {
    const option = document.createElement("option");
    option.value = route;
    option.textContent = route;
    dropdown.appendChild(option);
  });
}*/

function createRoutePills() {
  console.log("Creating Route Pill Buttons...");
  const container = document.getElementById("routePills");
  const uniqueRoutes = [...new Set(ferryRoutes.map(route => route.route))];

  uniqueRoutes.forEach(routeName => {
    const btn = document.createElement("button");
    btn.textContent = routeName;
    btn.setAttribute("data-route", routeName);
    btn.addEventListener("click", function () {
      btn.classList.toggle("active");
    });
    container.appendChild(btn);
  });
}


//show route cards 
function renderRoutes(selectedRoutes) {
  
  
  const container = document.getElementById("routeResults");
  container.innerHTML = "";

  /*const matchingRoutes = selectedRoutes.filter(route =>
    activeTags.length === 0 || activeTags.every(tag => route.tags.includes(tag))
  );*/

  if (selectedRoutes.length === 0) {
    container.innerHTML = "<p>No routes selected</p>";
    return;
  }

  selectedRoutes.forEach(ferry => {
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
} //End of Render All Routes


//Shows an individual route
function showSelectedRoutes(routeChoice)
{
  console.log("Show Selected Routes");
  console.log("Route Choice = "+routeChoice);

  const container = document.getElementById("routeResults");
  container.innerHTML = "";
  
  const matchingRoute = ferryRoutes.filter(route => 
           route.route.includes(routeChoice));
  matchingRoute.forEach(route => {
               console.log("Matching route "+route.id);

    const card = document.createElement("div");
    card.className = "ferryCard routeCard fade-in";

    const title = document.createElement("h2");
    title.textContent = route.route;
    card.appendChild(title);

    const notes = document.createElement("p");
    notes.textContent = route.notes || "No notes for this route";
    card.appendChild(notes);

    const crossing = document.createElement("p");
    crossing.textContent = `Crossing Time: ${route.dayCrossingTimeMins || "N/A"} mins`;
    card.appendChild(crossing);

    const price = document.createElement("p");
    price.textContent = `Prices From: ${route.pricesFrom || "Unknown"}`;
    card.appendChild(price);

    const tagList = document.createElement("div");
    route.tags.forEach(tagId => {
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
         const operator1 = route.operator1;
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
         const operator2 = route.operator2;
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
         const operator3 = route.operator3;
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

function getSelectedRoutes() {
  const activeButtons = document.querySelectorAll("#routePills button.active");
  return Array.from(activeButtons).map(btn => btn.getAttribute("data-route"));
}

function showRoutes() {
  console.log("Show Routes Functions...");
  const selectedRoutes = getSelectedRoutes();

  let filteredRoutes = ferryRoutes;

  if (selectedRoutes.length > 0) {
    filteredRoutes = ferryRoutes.filter(route =>
      selectedRoutes.includes(route.route)
    );
  }

  renderRoutes(filteredRoutes); // or whatever your render function is
}

function showAllRoutes() {
  console.log("Show All Routes...");
  renderRoutes(ferryRoutes);
}

//clear selections
function clearSelections() {
  const routeButtons = document.querySelectorAll("#routePills button.active");
  routeButtons.forEach(btn => btn.classList.remove("active"));

  const container = document.getElementById("routeResults");
  container.innerHTML = "";
}

/*function showRoutes()
{
  console.log("Getting Route Selected...");
  const selectedRoute = document.getElementById("routeFilter");
  const routeChoice = selectedRoute.value;
  //console.log("Route Choice = "+routeChoice);
  if (routeChoice == "all")
  {
    renderAllRoutes();
  }
  else
  {
    showSelectedRoutes(routeChoice);
  }
  
}*/

