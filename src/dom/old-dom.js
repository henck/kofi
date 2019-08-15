//
//OLD DOM MANAGER: PLEASE DO NOT USE!!
//

//Dom selector
export default function dom(selector) {
    //Hack to remove the new operator
    if(!(this instanceof dom)) {
        return new dom(selector);
    }
    //Initialize the nodes list
    this.nodes = [];
    //Save the selector
    //this.selector = selector;
    //Check if the selector is a instance of html elements or node list
    if(selector instanceof HTMLElement || selector instanceof NodeList) {
        //Save as an array
        this.nodes = selector.length > 1 ? [].slice.call(selector) : [selector];
    }
    //If selector is an string
    else if(typeof selector === "string") {
        //Parse the selector
        selector = selector.trim();
        //Check if the selector is an html code
        if(selector[0] === "<" && selector[selector.length - 1] === ">") {
            //Create the new div element
            let div = document.createElement("div");
            div.innerHTML = selector;
            //Save as an array with only one element
            this.nodes = [div.firstChild];
        }
        else {
            //Run the query selector
            this.nodes = [].slice.call(document.querySelectorAll(selector));
        }
    }
    //Save the number of nodes
    this.length = this.nodes.length;
    return this;
}

//Each method
dom.prototype.each = function (callback) {
    for(let i = 0; i < this.length; i++) {
        //Execute the callback with the node element
        let result = callback.call(this.nodes[i], this, i);
        //Check the result value
        if(typeof result === "boolean" && result === false) {
            return this;
        }
    }
    return this;
};

//Add a class name in each node
dom.prototype.addClass = function (className) {
    return this.each(function () {
        this.classList.add(className); 
    });
};

//Remove a class name in each node
dom.prototype.removeClass = function (className) {
    return this.each(function () { 
        this.classList.remove(className); 
    });
};

//Check if any node has the provided class name
dom.prototype.hasClass = function (className) {
    //Has the class
    let hasClass = false;
    this.each(function () {
        //Check if this node has the class
        if(this.classList.has(className) === true) {
            hasClass = true;
            return false;
        }
    });
    //Return if has the class
    return hasClass;
};

//Change the style of the element
dom.prototype.style = function (key, value) {
    //Convert the property to camel case
    key = key.replace(/^([A-Z])|[\s-_](\w)/g, function (match, reg1, reg2) { 
        if (typeof reg2 !== "undefined" && reg2) {
            return reg2.toUpperCase();
        } else {
            return reg1.toLowerCase();
        }
    });
    //Check for undefined assigned value
    if(typeof value === "undefined") {
        if (this.length) {
            //Return the COMPUTED VALUE
            //return window.getComputedStyle(el).getPropertyValue(prop);
            //Return the CURRENT VALUE
            return this.nodes[0].style[key];
        }
        return null;
    }
    else {
        //Update the style for each element
        return this.each(function () { 
            this.style[key] = value; 
        });
    }
};

//Get or set the attribute value
dom.prototype.attribute = function (name, value) {
    if (typeof value !== "string") {
        if (this.length) {
            //Return the attribute value of the first element
            return this.nodes[0].getAttribute(name);
        }
        return null;
    }
    else {
        //Set the attribute vale for each node
        return this.each(function () { 
            this.setAttribute(name, value); 
        });
    }
};

//Get or set the value
dom.prototype.value = function (value) {
    if (typeof value !== "string") {
        if (this.length) {
            //Return the value of the first element
            return this.nodes[0].value;
        }
        return null;
    }
    else {
        //Set the value attribute for each node
        return this.each(function () {
            this.value = value; 
        });
    }
};

//Attach an event listener to all nodes
dom.prototype.on = function (name, handler) {
    return this.each(function () { 
        this.addEventListener(name, handler, false); 
    });
};

//Get or set the inner html content
dom.prototype.html = function (value) {
    if (typeof value !== "string") {
        //Check the number of nodes
        if (this.length) {
            //Return the innerHTML of the first element
            return this.nodes[0].innerHTML;
        }
        return null;
    }
    else {
        //Set the innerHTML value for each node
        return this.each(function () { 
            this.innerHTML = value; 
        });
    }
};

//Get the inner text value
dom.prototype.text = function (value) {
    //Check the value
    if (typeof value !== "string") {
        if (this.length) {
            //Return the innerText of the first element
            return this.nodes[0].innerText;
        }
        return null;
    }
    else {
        //Set the innerText value for each node
        return this.each(function () { 
            this.innerText = value; 
        });
    }
};

//Empty all the content for each node
dom.prototype.empty = function () {
    //For each node
    return this.each(function () { 
        this.innerHTML = ""; 
    });
};

//Append html code
dom.prototype.append = function (element) {
    /*
    //Check the position value
    if(typeof position !== 'string'){ position = 'begin'; }
    //Parse the position value
    position = (position === 'end') ? 'beforeend' : 'afterbegin';
    //Insert in each element
    return this.each(function(){ this.insertAdjacentHTML(position, content); });
    */
    if (this.length) {
        //Create the new element
        let node = document.createElement(element.toUpperCase().trim());
        //Insert the new node
        this.nodes[0].appendChild(node);
        //Return the new dom element for this node
        return new dom(node);
    }
    return null;
};

//Manage the width and the height of the element
["width", "height"].forEach(function (type) {
    dom.prototype[type] = function (value) {
        if (typeof value === "undefined") {
            //Check the number of nodes
            if (this.length) {
                //Get the custom style
                //Read: http://stackoverflow.com/a/11453715/2328955
                //var custom_style = window.getComputedStyle(this.nodes[0], null);
                let custom_style = document.defaultView ? document.defaultView.getComputedStyle(this.nodes[0], null) : this.nodes[0].currentStyle;
                return parseInt(custom_style.getPropertyValue(type));
            }
            return null;
        }
        else {
            //Parse the value
            if (typeof value !== "string") { 
                value = value + ""; 
            }
            //Check for % or px
            if (value.indexOf("%") === -1 && value.indexOf("px") === -1) {
                //Add the px at the end of the dimension value
                value = value + "px";
            }
            //Set the dimension for each node
            return this.each(function () { 
                this.style[type] = value; 
            });
        }
    };
});

//Get the client width of the first element
//Only includes the padding of the element
dom.prototype.clientWidth = function () {
    if (this.length) {
        //Return the client width value
        return this.nodes[0].clientWidth;
    }
    return null;
};

//Get the client height of the first element
//Only includes the padding of the element
dom.prototype.clientHeight = function () {
    if (this.length) {
        //Return the client height value
        return this.nodes[0].clientHeight;
    }
    return null;
};

//Get the offset width of the first element
//Includes the padding, border and scroll
dom.prototype.offsetWidth = function () {
    if (this.length) { 
        //Return the offset width value
        return this.nodes[0].offsetWidth;
    }
    return null;
};

//Get the offset height of the first element
//Includes the padding, border and scroll
dom.prototype.offsetHeight = function () {
    if (this.length) {
        //Return the offset height value
        return this.nodes[0].offsetHeight;
    }
    return null;
};

//Get the full width of the element
//Includes the padding, border, scroll and margin
dom.prototype.fullWidth = function () {
    if (this.length) { 
        //Get the computed style
        let style = getComputedStyle(this.nodes[0]);
        //Get the full width
        return this.nodes[0].offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    }
    return null;
};

//Get the full height of the element
//Includes the padding, border, scroll and margin
dom.prototype.fullHeight = function () {
    if (this.length) {
        //Get the computed style
        let style = getComputedStyle(this.nodes[0]);
        //Get the full height
        return this.nodes[0].offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
    }
    return null;
};

//Get the current coordinates of the first element relative to the document
dom.prototype.offset = function () {
    if (this.length) {
        //Get the size of an element and its position relative to the viewport
        let rect = this.nodes[0].getBoundingClientRect();
        //Return the current coordinates
        return { 
            "top": rect.top + document.body.scrollTop, 
            "left": rect.left + document.body.scrollLeft
        };
    }
    return null;
};

//Get the current coordinates of the first element relative to the offset parent
dom.prototype.position = function() {
    if (this.length) {
        //Return the position of the element
        return {
            "left": this.nodes[0].offsetLeft, 
            "top": this.nodes[0].offsetTop 
        };
    }
    return null;
};

//Remove the selected elements
dom.prototype.remove = function () {
    return this.each(function () { 
        this.parentNode.removeChild(this); 
    });
};

//Get or set the scroll position
["scrollTop", "scrollLeft"].forEach(function (type) {
    //Get or set the scroll position
    dom.prototype[type] = function (value) {
        //Check the value
        if(typeof value === "undefined") {
            //Check the number of nodes
            if(!this.length) { 
                return; 
            }
            //Get the scroll position of the first element
            return this.nodes[0][type];
        }
        else {
            //Set the scroll position of all the elements
            return this.each(function () {
                this[type] = value; 
            });
        }
    };
});

//Attach a listener to the scroll event
dom.prototype.scroll = function (listener) {
    //Attach the scroll event to all nodes
    return this.each( function() {
        this.addEventListener("wheel", listener, false);
    });
};

//Mouse and touch events hablders
let mouseTouchHandler = function (el, listener, touch_event, mouse_event) {
    //Register the mouse event listener
    el.addEventListener(mouse_event, function (e) {
        e.preventDefault();
        return listener(event);
    });
    //Register the touch event listener
    el.addEventListener(touch_event, function (e) {
        e.stopPropagation();
        e.preventDefault();
        return listener(e);
    });
};

//Register the mouse/touch down event listener
dom.prototype.onDown = function (listener) {
    return this.each(function () {
        return mouseTouchHandler(this, listener, "touchstart", "mousedown");
    });
};

//Register the mouse/touch move event listener
dom.prototype.onMove = function (listener) {
    return this.each(function () {
        return mouseTouchHandler(this, listener, "touchmove", "mousemove");
    });
};

//Register the mouse/touch up event listener
dom.prototype.onUp = function (listener) {
    return this.each(function () {
        return mouseTouchHandler(this, listener, "touchend", "mouseup");
    });
};

