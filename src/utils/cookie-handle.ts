export const getCookies = (cname: string) => {{
    const cookies: string[] = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie : string = cookies[i];
        const name : string = cookie.slice(0, cookie.indexOf('='));
        const value : string = cookie.slice(cookie.indexOf('=') + 1);
        if (name.trim() === cname) return value;
    }
    return "";
}}