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


function renderAllRoutes()
{
  console.log("Render All Routes");
}
