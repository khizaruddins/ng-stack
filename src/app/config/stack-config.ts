export const stackConfig = {
  OAUTH_DIALOG: 'https://stackoverflow.com/oauth/dialog',
  clientId: '19487',
  clientSecret: 'sY7swjNzlmSlPGEDRKSV*w((',
  API_KEY: 'v4F0tKHUXWkBnH3LLJy)YA((',
  baseUrl: 'https://api.stackexchange.com/',
  ADVANCED_SEARCH: '2.2/search/advanced',
  QUESTION_DETAIL: '2.2/questions/',
}

export const stackCredsParams = {
  key: stackConfig.API_KEY,
  access_token: localStorage.getItem('token'),
  site: 'stackoverflow',
}


export const firebaseConfig = {
  apiKey: "AIzaSyAjeKKYarzCniT5CjkYwbf9C_sVfF0wyh4",
  authDomain: "ng-stack.firebaseapp.com",
  databaseURL: "https://ng-stack-default-rtdb.firebaseio.com",
  projectId: "ng-stack",
  storageBucket: "ng-stack.appspot.com",
  messagingSenderId: "374565795703",
  appId: "1:374565795703:web:a467c2a9863df361169372"
};

export const firebaseEndpoint = {
  api: 'https://ng-stack-default-rtdb.firebaseio.com/',
}