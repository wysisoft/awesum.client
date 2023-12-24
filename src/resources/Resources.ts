import { ResourceValue } from "./ResourceValue";
import { GlobalResources } from "./GlobalResources";

const resourcesInternal =
{
  Unable_To_Connect_To_Server: new ResourceValue('Unable to connect to server'),
  Page_Not_Found: new ResourceValue('Page Not Found'),
  Error: new ResourceValue('Error'),
  Start: new ResourceValue('Begin'),
  Database_Not_Found:new ResourceValue('Database not found'),
  Database_$needle$_Not_Found:new ResourceValue('Database {database} not found'),
  DatabaseNotFound:new ResourceValue('DatabaseNotFound'),
  sourcePath: new ResourceValue('sourcePath'),
  sourceQuery: new ResourceValue('sourceQuery'),
  Settings: new ResourceValue('Settings'),
  Areas: new ResourceValue('Areas'),
  Login: new ResourceValue('Login'),
  AWESUM: new ResourceValue('AWESUM'),
  Test: new ResourceValue('Test'),
  Home: new ResourceValue('Home'),
  ShowUnits: new ResourceValue('Show Units'),
  Toggle_Fullscreen: new ResourceValue('Toggle Fullscreen'),
  Fullscreen: new ResourceValue('Fullscreen'),
  Spelling: new ResourceValue('Spelling'),
  Go_To_Spelling_Settings: new ResourceValue('Go To Spelling Settings'),
  Type_Settings: new ResourceValue('Type Settings'),
  homepageImage: new ResourceValue('homepageImage'),
  userName: new ResourceValue('userName'),
  Save: new ResourceValue('Save'),
  Name: new ResourceValue('Name'),
  Units: new ResourceValue('Units'),
  Lets_Go: new ResourceValue('Lets Go'),
  UserNameColon: new ResourceValue('Name:'),
  Add_Pairing: new ResourceValue('Add Pairing'),
  User_Name_Cannot_Be_Blank: new ResourceValue('User Name Cannot Be Blank'),
  You_Must_Be_Logged_In: new ResourceValue('You must be logged in to participate in pairing'),
  No_Error_Found: new ResourceValue('No Error Found'),
  Name_Cannot_Be_Settings: new ResourceValue('Name Cannot Be Settings'),
}


GlobalResources.addKeysToResources(resourcesInternal);
export const resources = resourcesInternal
