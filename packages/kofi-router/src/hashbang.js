import router from "./router.js";

//Get the current hash 
let getHash = function () {
    //Decode the current hash
    let hash window.decodeURIComponent(window.location.hash.substring(1));
    //check for empty hash
    if (hash.trim() === "") {
        hash = "!/";
    }
    //Check for no hashbang hash
    if (hash.charAt(0) !== "!") {
        return null;
    }
    //Return the hash
    return hash;
};

//Hash router
export default function hashRouter () {
    //Generates the new router
    let hashRouter = router();
    //Delete the load method 
    //delete hashRouter.load;
    //Add hash listener
    window.addEventListener("hashchange", function () {
        //Get the current hash
        let hash = getHash();
        //Check for valid hashbasn
        if (hash !== null) {
            //Open this url 
            hashRouter._open(hash.substring(1));
        }
    });
    //Get the current hash 
    let currentHash = getHash();
    if (currentHash !== null) {
        //Save the current hash as the current url
        hashRouter._currentUrl = currentHash.substring(1);
    }
    //Return the hash router
    return hashRouter();
}

//Redirect to a hash
export default function hashRedirect (url) {
    //Change the current hash location
    window.location.hash = "#!" + url;
}

