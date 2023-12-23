import { GlobalResources } from "./GlobalResources";
import { ResourceValue } from "./ResourceValue";

 const resourcesInternal =
{
  UnableToConnectToServer: new ResourceValue('Unable to connect to server'),
  PageNotFound: new ResourceValue('Page Not Found'),
  Error: new ResourceValue('Error'),
  Start: new ResourceValue('Start'),
  sourcePath: new ResourceValue('sourcePath'),
  sourceQuery: new ResourceValue('sourceQuery'),
  Settings: new ResourceValue('Settings'),
  Areas: new ResourceValue('Areas'),
  Login: new ResourceValue('Login'),
  AWESUM: new ResourceValue('AWESUM'),
  Test: new ResourceValue('TestUS'),
  Home: new ResourceValue('Home'),
  ShowUnits: new ResourceValue('Show Units'),
  ToggleFullscreen: new ResourceValue('Toggle Fullscreen'),
  Fullscreen: new ResourceValue('Fullscreen'),
  Spelling: new ResourceValue('Spelling'),
  GoToSpellingSettings: new ResourceValue('Go To Spelling Settings'),
  TypeSettings: new ResourceValue('Type Settings'),
  homepageImage: new ResourceValue('homepageImage'),
  userName: new ResourceValue('userName'),
  Save: new ResourceValue('Save'),
  Name: new ResourceValue('Name'),
  Units: new ResourceValue('Units'),
  LetsGo: new ResourceValue('Lets Go'),
  UserNameColon: new ResourceValue('Name:'),
  AddPairing: new ResourceValue('Add Pairing'),
  UserNameCannotBeBlank: new ResourceValue('User Name Cannot Be Blank'),
  YouMustBeLoggedIn: new ResourceValue('You must be logged in to participate in pairing'),
  NoErrorFound: new ResourceValue('No Error Found')
}

GlobalResources.addKeysToResources(resourcesInternal);
export const resourcesEnGB = resourcesInternal
