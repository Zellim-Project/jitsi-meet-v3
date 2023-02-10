function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function getRoomName(): string {
    const [roomName] = window.location.hostname.split('.');
    return roomName;
  }

export function getIframeSource(): string {
    const accessToken = getSession();
    return `https://app.zellim.com/conference/${getRoomName()}${
        accessToken ? `?accessToken=${accessToken}` : ''
    }`;
}

const USER_SESSION_KEY = 'zellim_user';

export function saveSession(accessToken: string): void {
    localStorage.setItem(USER_SESSION_KEY, accessToken);
}

export function getSession(): string {
    return localStorage.getItem(USER_SESSION_KEY);
}

export * as ZellimUtils from './zellim-utils';