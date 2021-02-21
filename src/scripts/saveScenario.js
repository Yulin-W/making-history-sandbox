import { saveAs } from 'file-saver';

// Expects an generic javascript object, one that is compatible with JSON.stringify and reading
export default function saveScenario(obj) {
    const blob = new Blob([JSON.stringify(obj)], {type: "application/json;charset=utf-8"});
    saveAs(blob, "save.json");
};