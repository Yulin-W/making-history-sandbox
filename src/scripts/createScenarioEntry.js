// Create a scenario entry based on the inputted regionDict, date string, event description string
export default function createScenarioEntry(regionDict, date="", event="") {
    return {
        date: date,
        event: event,
        regionDict: regionDict
    }
}