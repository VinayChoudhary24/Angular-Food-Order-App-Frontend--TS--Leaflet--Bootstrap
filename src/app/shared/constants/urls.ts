//# This Will Manage all the URL for the Application
//# This File Connects the Backend Api's to Frontend

// the Base Address for All API -For Development Mode
const BASE_URL = 'http://localhost:5000'
// the Base Address for All API -For Production Mode
// const BASE_URL = 'AppName.heroku.c'

//# Define All API's Required
// This will Connect the Backend foods Api to Frontend
// This will GIVE All the Food Data by URL from sampleFoods-- getFoodData
export const FOODS_URL = BASE_URL + '/api/foods';

// This will Connect the Backend search Api to Frontend
// this will Give FoodBySearch by URL-- getAllFoodsBySearchTerm
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';

// This will Connect the Backend tags Api to Frontend
// this will GIVE the FoodByTags by URL-- getAllTags
export const FOODS_TAGS_URL = FOODS_URL + '/tags';

// This will Connect the Backend single tag Api to Frontend
// This will give foodByTag-- getAllFoodByTag
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';

// This will Connect the Backend searchById Api to Frontend
// This will Give FoodById-- getFoodById
export const FOODS_BY_ID_URL = FOODS_URL + '/';

// This will Connect the Backend Login Api to Frontend
// This will Give the user Login Page
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

// This will Connect the Backend Register Api to Frontend
// This Will Register a New User
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

// This will Connect the Backend Order Api to Frontend
//  This Will Place the order for User
export const ORDER_URL = BASE_URL + '/api/orders';

// This will Connect the Backend Order Api to Frontend
// This Will Create a New Order
export const ORDER_CREATE_URL = ORDER_URL + '/create';

// This will Connect the Backend Order Api to Frontend
// This Will get the Order Details From Checkout Page=> Payment Page
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDER_URL + '/newOrderForCurrentUser';

// This will Connect the Backend Payment Api to Frontend
// This Will get the Payment Details From Payment Page
export const ORDER_PAY_URL = ORDER_URL + '/pay';

// This will Connect the Backend Track Order Api to Frontend
// This Will get the OrderId From Payment Page
export const ORDER_TRACK_URL = ORDER_URL + '/track/';
