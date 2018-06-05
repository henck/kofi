//Get the current hashbang 
export function getHashbang () {
    //Decode the current hash
    //let hash = window.decodeURIComponent(window.location.hash.substring(1));
    let hash = window.location.hash.substring(1);
    //Check for empty hash
    if (hash.trim() === "") {
        hash = "!/";
    }
    //Check for no hashbang hash
    if (hash.charAt(0) !== "!") {
        return null;
    }
    //Remove the last hash
    hash = hash.replace(/\/$/, "");
    //Return the hash
    return hash;
}

//Hashbang change listener
export function hashbangChange (listener) {
    //Add hash listener
    window.addEventListener("hashchange", function () {
        //Get the current hash
        let hash = getHashbang();
        //Check for valid hashbang
        if (hash !== null) {
            //Call the listener with this url
            return listener.call(null, hash);
        }
    });
}

//Change the hashbang url
export function setHashbang (url) {
    //Replace the starting hash and the excalamtion
    let parsedUrl = url.replace("#", "").replace("!", "");
    //Check for emptu url 
    if (parsedUrl === "") {
        parsedUrl = "/";
    }
    //Change the current hash location
    window.location.hash = "#!" + parsedUrl;
}

