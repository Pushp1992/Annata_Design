const localStorage = window && window.localStorage;

export const getlocalKey = (key) => {
    let value = localStorage && localStorage.getItem(key);
    return value;
};

// Set any key with the value
export const setlocalKey = (key, value) => {
    localStorage && localStorage.setItem(key, value);
};

// Remove an item from the localStorage
export const deletelocalKey = (key) => {
    localStorage && localStorage.removeItem(key);
};