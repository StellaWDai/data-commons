async function loadDataCommonsbyId(apiKey, fdcid) {
    try {
      const url = `https://api.nal.usda.gov/fdc/v1/food/${fdcid}?api_key=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  }

async function loadDataCommons_list(apiKey) 
{ 
      const url = `https://api.nal.usda.gov/fdc/v1/foods/list?dataType=Foundation,SR%20Legacy&pageSize=100&pageNumber=1&api_key=${apiKey}`;
      const response = await fetch(url);
      return await response.json();
}

// Get a list of food that matched search keywords
async function loadDataCommons_search(apiKey,keyword) 
{ 
      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${keyword}`;
      const response = await fetch(url);
      return await response.json();
}

function loadDataFood() {
    //console.log("read data")
    //loadDataCommonsbyId('bLecediTVa2sWd8AegmUZ9o7DxYFSYoef9B4i1Ml', '2015943').then(data => {
    loadDataCommons_list('bLecediTVa2sWd8AegmUZ9o7DxYFSYoef9B4i1Ml').then(data => {
    //loadDataCommons_search('bLecediTVa2sWd8AegmUZ9o7DxYFSYoef9B4i1Ml','turkey sandwich').then(data => {
        //console.log("new step");
        //console.log(data);
        //document.getElementById('resultContainer').innerText = JSON.stringify(data, null, 2);
        //displayJsonData(data)
        const ids = data.map(item => item.fdcId);
        const food_name = data.map(item => item.description);
        const foodNutrients = data.map(item => item.foodNutrients);
      // Log the list of fdcId values
        console.log(ids);
        console.log(food_name);
        console.log(foodNutrients);

        $("#resultJson").html(JSON.stringify(foodNutrients));
        console.log("---------")
      }).catch(error => {
        console.error('Error loading data:', error);
    });
}

function transformData(foodData) {
    return {
      showServingUnitQuantity: false,
      itemName: foodData.description,
      ingredientList: foodData.ingredients,
      decimalPlacesForQuantityTextbox: 2,
      valueServingUnitQuantity: 1,
      allowFDARounding: true,
      decimalPlacesForNutrition: 2,
      showPolyFat: false,
      showMonoFat: false,
      valueCalories: foodData.labelNutrients.calories?.value || 0,
      valueFatCalories: foodData.labelNutrients.fatCalories?.value || 0,
      valueTotalFat: foodData.labelNutrients.fat?.value || 0,
      valueSatFat: foodData.labelNutrients.saturatedFat?.value || 0,
      valueTransFat: foodData.labelNutrients.transFat?.value || 0,
      valueCholesterol: foodData.labelNutrients.cholesterol?.value || 0,
      valueSodium: foodData.labelNutrients.sodium?.value || 0,
      valueTotalCarb: foodData.labelNutrients.carbohydrates?.value || 0,
      valueFibers: foodData.labelNutrients.fiber?.value || 0,
      valueSugars: foodData.labelNutrients.sugars?.value || 0,
      valueProteins: foodData.labelNutrients.protein?.value || 0,
      valueVitaminD: foodData.labelNutrients.vitaminD?.value || 0,
      valuePotassium_2018: foodData.labelNutrients.potassium?.value || 0,
      valueCalcium: foodData.labelNutrients.calcium?.value || 0,
      valueIron: foodData.labelNutrients.iron?.value || 0,
      valueAddedSugars: foodData.labelNutrients.addedSugars?.value || 0,
      valueCaffeine: foodData.labelNutrients.caffeine?.value || 0,
      showLegacyVersion: false
    };
  }
  
  async function initializeNutritionLabel(apiKey, fdcid) {
    const foodData = await loadDataCommonsbyId(apiKey, fdcid);
    if (foodData) {
      const nutritionLabelData = transformData(foodData);
      $('#test').nutritionLabel(nutritionLabelData);
    }
  }

  loadDataFood();