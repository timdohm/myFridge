# Getting started

## How to Build

The generated SDK requires AngularJS framework to work. If you do not already have angular downloaded, please go ahead and do it from [here](https://angularjs.org/)

## How to Use

The following section describes how to use the generated SDK in an existing/new project.

### 1. Configure Angular and Generated SDK
Perform the following steps to configure angular and the SDK:
+ Make a `scripts` folder inside the root folder of the project. If you already have a `scripts` folder, skip to the next step.
+ Move the `angular.min.js` file inside the scripts folder. 
+ Move the `spoonacularapilib` folder inside the scripts folder.

![folder-structure-image](https://apidocs.io/illustration/angularjs?step=folderStructure&workspaceFolder=spoonacular%20API-Angular&projectName=SpoonacularAPILib)

### 2. Open Project Folder
Open an IDE/Text Editor for JavaScript like Sublime Text. The basic workflow presented here is also applicable if you prefer using a different editor or IDE.  
Click on `File` and select `Open Folder`

Select the folder of your SDK and click on `Select Folder` to open it up in Sublime Text. The folder will become visible in the bar on the left.

![open-folder-image](https://apidocs.io/illustration/angularjs?step=openFolder&workspaceFolder=spoonacular%20API-Angular)

### 3. Create an Angular Application
Since Angular JS is used for client-side web development, in order to use the generated library, you will have to develop an application first.
If you already have an angular application, [skip to Step 6](#6-include-sdk-references-in-html-file). Otherwise, follow these steps to create one:

+ In the IDE, click on `File` and choose `New File` to create a new file.
+ Add the following starting code in the file:
```js
    var app = angular.module('myApp', []);
    app.controller('testController', function($scope) 
    {

    });
```
+ Save it with the name `app.js` in the `scripts` folder.


### 4. Create HTML File
Skip to the next step if you are working with an existing project and already have an html file. Otherwise follow the steps to create one:
+ Inside the IDE, right click on the project folder name and select the `New File` option to create a new test file.
+ Save it with an appropriate name such as `index.html` in the root of your project folder.
`index.html` should look like this:
```html
	<!DOCTYPE html>
	<html>
	<head>
		<title>Angular Project</title>
		<script></script>
	</head>

	<body>
	</body>

	</html>
```

![initial-html-code-image](https://apidocs.io/illustration/angularjs?step=initialCode&workspaceFolder=spoonacular%20API-Angular)

### 5. Including links to Angular in HTML file
Your HTML file needs to have a link to `angular.min.js` file to use Angular-JS. Add the link using `script` tags inside the `head` section of `index.html` like:
```html
	<script src="scripts/angular.min.js" ></script>
```

### 6. Include SDK references in HTML file
Import the reference to the generated SDK files inside your html file like:
```html
	<head>
		...
		<!-- Helper files -->
		<script src="scripts/spoonacularapilib/Configuration.js"></script>
		<script src="scripts/spoonacularapilib/APIHelper.js"></script>
		<script src="scripts/spoonacularapilib/Http/Client/HttpContext.js"></script>
		<script src="scripts/spoonacularapilib/Http/Client/RequestClient.js"></script>
		<script src="scripts/spoonacularapilib/Http/Request/HttpRequest.js"></script>
		<script src="scripts/spoonacularapilib/Http/Response/HttpResponse.js"></script>

		<!-- API Controllers -->
        <script src="scripts/spoonacularapilib/Controllers/APIController.js"></script>


		<!-- Models -->
        <script src="scripts/spoonacularapilib/Models/BaseModel.js"></script>
        <script src="scripts/spoonacularapilib/Models/Productjson.js"></script>
        <script src="scripts/spoonacularapilib/Models/Classifiedproduct.js"></script>
        <script src="scripts/spoonacularapilib/Models/Productjsonarray.js"></script>
        <script src="scripts/spoonacularapilib/Models/FindByIngredientsModel.js"></script>

		...
	</head>
```
> The Configuration.js file should be imported before the other files.

### 7. Including link to `app.js` in HTML file
Link your `app.js` file to your `index.html` file like:
```html
	<head>
		...
		<script src="scripts/app.js"></script>
	</head>
```
> The link to app.js needs to be included at the very end of the head tag, after the SDK references have been added

### 8. Initializing the Angular App
You need to initialize your app and the controller associated with your view inside your `index.html` file. Do so like:
+ Add ng-app directive to initialize your app inside the `body` tag.
```html
	<body ng-app="myApp">
```
+ Add ng-controller directive to initialize your controller and bind it with your view (`index.html` file).
```html
	...
	<body ng-app="myApp">
		<div ng-controller="testController">
			...
		</div>
		...
	</body>
	...
```

### 9. Consuming the SDK 
In order to use the generated SDK's modules, controllers and factories, the project needs to be added as a dependency in your angular app's module. This will be done inside the `app.js` file.
Add the dependency like this:

```js
    var app = angular.module('myApp', ['SpoonacularAPILib']);
```
At this point, the SDK has been successfully included in your project. Further steps include using a service/factory from the generated SDK. To see working example of this, please head on [over here](#list-of-controllers) and choose any class to see its functions and example usage.  

### 10. Running The App
To run the app, simply open up the `index.html` file in a browser.

![app-running](https://apidocs.io/illustration/angularjs?step=appRunning)

## Class Reference

### <a name="list_of_controllers"></a>List of Controllers

* [APIController](#api_controller)

### <a name="api_controller"></a>![Class: ](https://apidocs.io/img/class.png ".APIController") APIController

#### Get singleton instance

The singleton instance of the ``` APIController ``` class can be accessed via Dependency Injection.

```js
	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	});
```

#### <a name="get_product_information"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getProductInformation") getProductInformation

> *Tags:*  ``` Skips Authentication ``` 

> Get information about a packaged food product.


```javascript
function getProductInformation(id)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  ``` DefaultValue ```  | The id of the packaged food product. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var id = 131;


		var result = APIController.getProductInformation(id);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="find_similar_recipes"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.findSimilarRecipes") findSimilarRecipes

> *Tags:*  ``` Skips Authentication ``` 

> Find recipes which are similar to the given one.


```javascript
function findSimilarRecipes(id)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  ``` DefaultValue ```  | The id of the source recipe to which similar recipes should be found. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var id = 131;


		var result = APIController.findSimilarRecipes(id);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="get_autocomplete_ingredient_search"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getAutocompleteIngredientSearch") getAutocompleteIngredientSearch

> *Tags:*  ``` Skips Authentication ``` 

> Autocomplete a search for an ingredient.


```javascript
function getAutocompleteIngredientSearch(query)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| query |  ``` Required ```  ``` DefaultValue ```  | The query - a partial or full ingredient name. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var query = "query";


		var result = APIController.getAutocompleteIngredientSearch(query);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_visualize_price_breakdown"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVisualizePriceBreakdown") createVisualizePriceBreakdown

> *Tags:*  ``` Skips Authentication ``` 

> Visualize the price breakdown of a recipe.


```javascript
function createVisualizePriceBreakdown(ingredientList, servings, defaultCss, mode, formParams)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredientList |  ``` Required ```  ``` DefaultValue ```  | The ingredient list of the recipe, one ingredient per line. |
| servings |  ``` Required ```  ``` DefaultValue ```  | The number of servings. |
| defaultCss |  ``` Optional ```  ``` DefaultValue ```  | Whether the widget should be styled with the default css. |
| mode |  ``` Optional ```  ``` DefaultValue ```  | The mode in which the widget should be delivered. 1 = separate views (compact), 2 = all in one view (full). |
| fieldParameters | ``` Optional ``` | Additional optional form parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredientList = "ingredientList";
    var servings = 131;
    var defaultCss = "defaultCss";
    var mode = 131;
    // key-value map for optional form parameters
    var formParams = [];


		var result = APIController.createVisualizePriceBreakdown(ingredientList, servings, defaultCss, mode, formParams);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_visualize_nutrition"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVisualizeNutrition") createVisualizeNutrition

> *Tags:*  ``` Skips Authentication ``` 

> Visualize a recipe's nutritional information.


```javascript
function createVisualizeNutrition(ingredientList, servings, defaultCss, formParams)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredientList |  ``` Required ```  ``` DefaultValue ```  | The ingredient list of the recipe, one ingredient per line. |
| servings |  ``` Required ```  ``` DefaultValue ```  | The number of servings. |
| defaultCss |  ``` Optional ```  ``` DefaultValue ```  | Whether the ingredient list should be styled with the default css. |
| fieldParameters | ``` Optional ``` | Additional optional form parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredientList = "ingredientList";
    var servings = 131;
    var defaultCss = "defaultCss";
    // key-value map for optional form parameters
    var formParams = [];


		var result = APIController.createVisualizeNutrition(ingredientList, servings, defaultCss, formParams);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_visualize_ingredients"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVisualizeIngredients") createVisualizeIngredients

> *Tags:*  ``` Skips Authentication ``` 

> Visualize ingredients of a recipe.


```javascript
function createVisualizeIngredients(ingredientList, servings, defaultCss, measure, view, formParams)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredientList |  ``` Required ```  ``` DefaultValue ```  | The ingredient list of the recipe, one ingredient per line. |
| servings |  ``` Required ```  ``` DefaultValue ```  | The initial number of servings. |
| defaultCss |  ``` Optional ```  ``` DefaultValue ```  | Whether the ingredient list should be styled with the default css. |
| measure |  ``` Optional ```  ``` DefaultValue ```  | The initial measure, either "metric" or "us". |
| view |  ``` Optional ```  ``` DefaultValue ```  | The initial view, either "grid" or "list". |
| fieldParameters | ``` Optional ``` | Additional optional form parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredientList = "ingredientList";
    var servings = 131;
    var defaultCss = "defaultCss";
    var measure = "measure";
    var view = "view";
    // key-value map for optional form parameters
    var formParams = [];


		var result = APIController.createVisualizeIngredients(ingredientList, servings, defaultCss, measure, view, formParams);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="get_summarize_recipe"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getSummarizeRecipe") getSummarizeRecipe

> *Tags:*  ``` Skips Authentication ``` 

> Summarize the recipe in a short text.


```javascript
function getSummarizeRecipe(id)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  ``` DefaultValue ```  | The id of the recipe that should be summarized. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var id = 131;


		var result = APIController.getSummarizeRecipe(id);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="search_grocery_products"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.searchGroceryProducts") searchGroceryProducts

> *Tags:*  ``` Skips Authentication ``` 

> Search packaged food products like frozen pizza and snickers bars.


```javascript
function searchGroceryProducts(query, number, offset, queryParameters)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| query |  ``` Required ```  ``` DefaultValue ```  | The search query. |
| number |  ``` Optional ```  ``` DefaultValue ```  | The number of results to retrieve, defaults to 10. |
| offset |  ``` Optional ```  ``` DefaultValue ```  | The number of results to skip, defaults to 0. |
| queryParameters | ``` Optional ``` | Additional optional query parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var query = "query";
    var number = 131;
    var offset = 131;

        // key-value map for optional query parameters
        var queryParameters = [];


		var result = APIController.searchGroceryProducts(query, number, offset, queryParameters);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="get_quick_answer"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getQuickAnswer") getQuickAnswer

> *Tags:*  ``` Skips Authentication ``` 

> Answer a nutrition related natural language question.


```javascript
function getQuickAnswer(q)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| q |  ``` Required ```  ``` DefaultValue ```  | The nutrition-related question. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var q = "q";


		var result = APIController.getQuickAnswer(q);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="get_recipe_information"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getRecipeInformation") getRecipeInformation

> *Tags:*  ``` Skips Authentication ``` 

> Get information about a recipe.


```javascript
function getRecipeInformation(id)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  ``` DefaultValue ```  | The id of the recipe. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var id = 131;


		var result = APIController.getRecipeInformation(id);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_parse_ingredients"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createParseIngredients") createParseIngredients

> *Tags:*  ``` Skips Authentication ``` 

> Extract an ingredient from plain text.


```javascript
function createParseIngredients(ingredientList, servings)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredientList |  ``` Required ```  ``` DefaultValue ```  | The ingredient list of the recipe, one ingredient per line. |
| servings |  ``` Required ```  ``` DefaultValue ```  | The number of servings that you can make from the ingredients. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredientList = "ingredientList";
    var servings = 131;


		var result = APIController.createParseIngredients(ingredientList, servings);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_map_ingredients"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createMapIngredients") createMapIngredients

> *Tags:*  ``` Skips Authentication ``` 

> Map ingredients to food products.


```javascript
function createMapIngredients(ingredientList, servings)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredientList |  ``` Required ```  ``` DefaultValue ```  | A new line-separated list of ingredients. |
| servings |  ``` Required ```  ``` DefaultValue ```  | The number of servings this recipe makes. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredientList = "ingredientList";
    var servings = 131;


		var result = APIController.createMapIngredients(ingredientList, servings);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="get_extract_recipe_from_website"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getExtractRecipeFromWebsite") getExtractRecipeFromWebsite

> *Tags:*  ``` Skips Authentication ``` 

> Extract recipe data from a recipe blog or Web page.


```javascript
function getExtractRecipeFromWebsite(url, forceExtraction, queryParameters)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| url |  ``` Required ```  ``` DefaultValue ```  | The URL of the recipe page. |
| forceExtraction |  ``` Optional ```  ``` DefaultValue ```  | If true, the extraction will be triggered no matter whether we know the recipe already. Use that only if information is missing as this operation is slower. |
| queryParameters | ``` Optional ``` | Additional optional query parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var url = "url";
    var forceExtraction = true;

        // key-value map for optional query parameters
        var queryParameters = [];


		var result = APIController.getExtractRecipeFromWebsite(url, forceExtraction, queryParameters);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="get_compute_daily_meal_plan"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getComputeDailyMealPlan") getComputeDailyMealPlan

> *Tags:*  ``` Skips Authentication ``` 

> Compute a meal plan for a day.


```javascript
function getComputeDailyMealPlan(targetCalories, timeFrame)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| targetCalories |  ``` Required ```  ``` DefaultValue ```  | The target number of calories per day. |
| timeFrame |  ``` Required ```  ``` DefaultValue ```  | For one day or a complete week, allowed values are "day" and "week". |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var targetCalories = 131;
    var timeFrame = "timeFrame";


		var result = APIController.getComputeDailyMealPlan(targetCalories, timeFrame);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_classify_grocery_products_batch"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createClassifyGroceryProductsBatch") createClassifyGroceryProductsBatch

> *Tags:*  ``` Skips Authentication ``` 

> Given a set of product jsons, get back classified products.


```javascript
function createClassifyGroceryProductsBatch(productJsonArray)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| productJsonArray |  ``` Required ```  ``` Collection ```  | A JSON Array of products. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var productJsonArray = [{"key":"value"}].map(function(elem) {
        return new productjsonarray(elem);
    });


		var result = APIController.createClassifyGroceryProductsBatch(productJsonArray);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_classify_cuisine"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createClassifyCuisine") createClassifyCuisine

> *Tags:*  ``` Skips Authentication ``` 

> Classify the recipe's cuisine.


```javascript
function createClassifyCuisine(ingredientList, title)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredientList |  ``` Required ```  ``` DefaultValue ```  | The ingredient list of the recipe, one ingredient per line. |
| title |  ``` Required ```  ``` DefaultValue ```  | The title of the recipe. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredientList = "ingredientList";
    var title = "title";


		var result = APIController.createClassifyCuisine(ingredientList, title);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_classify_a_grocery_product"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createClassifyAGroceryProduct") createClassifyAGroceryProduct

> *Tags:*  ``` Skips Authentication ``` 

> Given a grocery product title, this endpoint allows you to detect what basic ingredient it is.


```javascript
function createClassifyAGroceryProduct(productJson)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| productJson |  ``` Required ```  | The json representation of a product. |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var productJson = new Productjson({"key":"value"});


		var result = APIController.createClassifyAGroceryProduct(productJson);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="search_recipes"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.searchRecipes") searchRecipes

> *Tags:*  ``` Skips Authentication ``` 

> Search recipes in natural language.


```javascript
function searchRecipes(query, cuisine, diet, excludeIngredients, intolerances, limitLicense, number, offset, type, queryParameters)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| query |  ``` Required ```  ``` DefaultValue ```  | The (natural language) recipe search query. |
| cuisine |  ``` Optional ```  ``` DefaultValue ```  | The cuisine(s) of the recipes. One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american. |
| diet |  ``` Optional ```  ``` DefaultValue ```  | The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian. |
| excludeIngredients |  ``` Optional ```  ``` DefaultValue ```  | An comma-separated list of ingredients or ingredient types that must not be contained in the recipes. |
| intolerances |  ``` Optional ```  ``` DefaultValue ```  | A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat. |
| limitLicense |  ``` Optional ```  ``` DefaultValue ```  | Whether the recipes should have an open license that allows for displaying with proper attribution. |
| number |  ``` Optional ```  ``` DefaultValue ```  | The number of results to return (between 0 and 100). |
| offset |  ``` Optional ```  ``` DefaultValue ```  | The number of results to skip (between 0 and 900). |
| type |  ``` Optional ```  ``` DefaultValue ```  | The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink. |
| queryParameters | ``` Optional ``` | Additional optional query parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var query = "query";
    var cuisine = "cuisine";
    var diet = "diet";
    var excludeIngredients = "excludeIngredients";
    var intolerances = "intolerances";
    var limitLicense = true;
    var number = 131;
    var offset = 131;
    var type = "type";

        // key-value map for optional query parameters
        var queryParameters = [];


		var result = APIController.searchRecipes(query, cuisine, diet, excludeIngredients, intolerances, limitLicense, number, offset, type, queryParameters);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="find_by_nutrients"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.findByNutrients") findByNutrients

> *Tags:*  ``` Skips Authentication ``` 

> Find a set of recipes that adhere to the given nutrient limits. All the found recipes will have macro nutrients within the calories, protein, fat, and carbohydrate limits.


```javascript
function findByNutrients(maxcalories, maxcarbs, maxfat, maxprotein, mincalories, minCarbs, minfat, minProtein, queryParameters)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| maxcalories |  ``` Optional ```  ``` DefaultValue ```  | The maximum number of calories the recipe can have. |
| maxcarbs |  ``` Optional ```  ``` DefaultValue ```  | The maximum number of carbohydrates in grams the recipe can have. |
| maxfat |  ``` Optional ```  ``` DefaultValue ```  | The maximum number of fat in grams the recipe can have. |
| maxprotein |  ``` Optional ```  ``` DefaultValue ```  | The maximum number of protein in grams the recipe can have. |
| mincalories |  ``` Optional ```  ``` DefaultValue ```  | The minimum number of calories the recipe must have. |
| minCarbs |  ``` Optional ```  ``` DefaultValue ```  | The minimum number of carbohydrates in grams the recipe must have. |
| minfat |  ``` Optional ```  ``` DefaultValue ```  | The minimum number of fat in grams the recipe must have. |
| minProtein |  ``` Optional ```  ``` DefaultValue ```  | The minimum number of protein in grams the recipe must have. |
| queryParameters | ``` Optional ``` | Additional optional query parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var maxcalories = 131;
    var maxcarbs = 131;
    var maxfat = 131;
    var maxprotein = 131;
    var mincalories = 131;
    var minCarbs = 131;
    var minfat = 131;
    var minProtein = 131;

        // key-value map for optional query parameters
        var queryParameters = [];


		var result = APIController.findByNutrients(maxcalories, maxcarbs, maxfat, maxprotein, mincalories, minCarbs, minfat, minProtein, queryParameters);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="find_by_ingredients"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.findByIngredients") findByIngredients

> *Tags:*  ``` Skips Authentication ``` 

> Find recipes that use as many of the given ingredients as possible and have as little as possible missing ingredients. This is a whats in your fridge API endpoint.


```javascript
function findByIngredients(ingredients, limitLicense, number, ranking, queryParameters)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| ingredients |  ``` Required ```  ``` DefaultValue ```  | A comma-separated list of ingredients that the recipes should contain. |
| limitLicense |  ``` Optional ```  ``` DefaultValue ```  | Whether to only show recipes with an attribution license. |
| number |  ``` Optional ```  ``` DefaultValue ```  | The maximal number of recipes to return (default = 5). |
| ranking |  ``` Optional ```  ``` DefaultValue ```  | Whether to maximize used ingredients (1) or minimize missing ingredients (2) first. |
| queryParameters | ``` Optional ``` | Additional optional query parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var ingredients = "ingredients";
    var limitLicense = true;
    var number = 131;
    var ranking = 131;

        // key-value map for optional query parameters
        var queryParameters = [];


		var result = APIController.findByIngredients(ingredients, limitLicense, number, ranking, queryParameters);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



#### <a name="create_recipe_card"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createRecipeCard") createRecipeCard

> *Tags:*  ``` Skips Authentication ``` 

> Create a recipe card given a recipe.


```javascript
function createRecipeCard(backgroundImage, image, ingredients, instructions, mask, readyInMinutes, servings, title, author, backgroundColor, fontColor, source, formParams)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| backgroundImage |  ``` Required ```  ``` DefaultValue ```  | The background image ("none","background1", or "background2"). |
| image |  ``` Required ```  ``` DefaultValue ```  | The binary image of the recipe as jpg. |
| ingredients |  ``` Required ```  ``` DefaultValue ```  | The ingredient list of the recipe, one ingredient per line. |
| instructions |  ``` Required ```  ``` DefaultValue ```  | The instructions to make the recipe. One step per line. |
| mask |  ``` Required ```  ``` DefaultValue ```  | The mask to put over the recipe image ("ellipseMask", "diamondMask", "diamondMask", "starMask", "heartMask", "potMask", "fishMask"). |
| readyInMinutes |  ``` Required ```  ``` DefaultValue ```  | The number of minutes it takes to get the recipe on the table. |
| servings |  ``` Required ```  ``` DefaultValue ```  | The number of servings that you can make from the ingredients. |
| title |  ``` Required ```  ``` DefaultValue ```  | The title of the recipe. |
| author |  ``` Optional ```  ``` DefaultValue ```  | The author of the recipe. |
| backgroundColor |  ``` Optional ```  ``` DefaultValue ```  | The background color on the recipe card as a hex-string. |
| fontColor |  ``` Optional ```  ``` DefaultValue ```  | The font color on the recipe card as a hex-string. |
| source |  ``` Optional ```  ``` DefaultValue ```  | The source of the recipe. |
| fieldParameters | ``` Optional ``` | Additional optional form parameters are supported by this method |



#### Example Usage

```javascript


	app.controller("testController", function($scope, APIController,Productjson,Classifiedproduct,Productjsonarray,FindByIngredientsModel){
	    var backgroundImage = "backgroundImage";
    var image = "";
    var ingredients = "ingredients";
    var instructions = "instructions";
    var mask = "mask";
    var readyInMinutes = 131;
    var servings = 131;
    var title = "title";
    var author = "author";
    var backgroundColor = "backgroundColor";
    var fontColor = "fontColor";
    var source = "source";
    // key-value map for optional form parameters
    var formParams = [];


		var result = APIController.createRecipeCard(backgroundImage, image, ingredients, instructions, mask, readyInMinutes, servings, title, author, backgroundColor, fontColor, source, formParams);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



[Back to List of Controllers](#list_of_controllers)



