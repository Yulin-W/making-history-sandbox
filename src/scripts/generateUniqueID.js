function generateUniqueID(obj) {
    let id = Math.floor(Math.random() * 10000).toString();
    if (id in obj) {
        return generateUniqueID(obj);
    } else {
        return id;
    }
}

export default generateUniqueID;