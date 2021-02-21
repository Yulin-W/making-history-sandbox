// Expects a single file object, one that is compatible with JSON.stringify after processing
// Returns the JSON object
export default function loadScenario(file, onload=null) {
    file.text().then(text => {
        const obj = JSON.parse(text);
        if (onload) {
            onload(obj);
        }
    });
}