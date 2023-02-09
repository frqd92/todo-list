export let loggedIn = false;
export let savedTheme = "light-theme";
export let isHome = true;
export function isSignedIn(bool){
    loggedIn = bool?true:false;
}

export function themeFunc(theme){
    savedTheme = theme;
}

export function isHomeFunc(bool){
    isHome = bool?true:false;
}