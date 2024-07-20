import { ResourceValue } from "./ResourceValue";
import { GlobalResources } from "./GlobalResources";

const resourcesInternal =
{
  Unable_To_Connect_To_Server: new ResourceValue('Unable to connect to server'),
  Page_Not_Found: new ResourceValue('Page Not Found'),
  Error: new ResourceValue('Error'),
  Start: new ResourceValue('Begin'),
  Apps: new ResourceValue('Apps'),
  PairedApps: new ResourceValue('Paired Apps'),
  About: new ResourceValue('About'),
  Delete: new ResourceValue('Delete'),
  AddReading:new ResourceValue('Add Reading'),
  AddSpelling:new ResourceValue('Add Spelling'),
  Database_Not_Found:new ResourceValue('Database not found'),
  Database_$needle$_Not_Found:new ResourceValue('Database {database} not found'),
  Databases:new ResourceValue('Databases'),
  Types:new ResourceValue('Types'),
  DatabaseNotFound:new ResourceValue('DatabaseNotFound'),
  sourcePath: new ResourceValue('sourcePath'),
  sourceQuery: new ResourceValue('sourceQuery'),
  Settings: new ResourceValue('Settings'),
  Edit: new ResourceValue('Edit'),
  Areas: new ResourceValue('Areas'),
  Login: new ResourceValue('Login'),
  AWESUM: new ResourceValue('AWESUM'),
  Awesum: new ResourceValue('Awesum'),
  Test: new ResourceValue('Test'),
  Home: new ResourceValue('Home'),
  ShowUnits: new ResourceValue('Show Units'),
  Toggle_Fullscreen: new ResourceValue('Toggle Fullscreen'),
  Fullscreen: new ResourceValue('Fullscreen'),
  Spelling: new ResourceValue('Spelling'),
  Items: new ResourceValue('Items'),
  Go_To_Spelling_Settings: new ResourceValue('Go To Spelling Settings'),
  Type_Settings: new ResourceValue('Type Settings'),
  homepageImage: new ResourceValue('homepageImage'),
  userName: new ResourceValue('userName'),
  Save: new ResourceValue('Save'),
  Play: new ResourceValue('Play'),
  Refresh: new ResourceValue('Refresh'),
  Name: new ResourceValue('Name'),
  InvalidResponse: new ResourceValue('InvalidResponse'),
  Units: new ResourceValue('Units'),
  Lets_Go: new ResourceValue('Lets Go'),
  AboutAwesum: new ResourceValue('About Awesum'),
  UserNameColon: new ResourceValue('Name:'),
  Add_Pairing: new ResourceValue('Add Pairing'),
  Add_Database: new ResourceValue('Add Database'),
  Add_Type: new ResourceValue('Add Type'),
  Add_Unit: new ResourceValue('Add Unit'),

  User_Name_Cannot_Be_Blank: new ResourceValue('User Name Cannot Be Blank'),
  You_Must_Be_Logged_In: new ResourceValue('You must be logged in to participate in pairing'),
  No_Error_Found: new ResourceValue('No Error Found'),
  Name_Cannot_Be_Settings: new ResourceValue('Name Cannot Be Settings'),
  Required: new ResourceValue('Required'),
  Must_be_less_than_100: new ResourceValue('Must be less than 100'),
  Cannot_Contain_Slash: new ResourceValue('Cannot contain slash'),
  
  Invalid_Name: new ResourceValue('Invalid name'),
  
}


GlobalResources.addKeysToResources(resourcesInternal);
export const resources = resourcesInternal
