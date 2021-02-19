// Import deep cloning function
import cloneDeep from 'clone-deep';

// Create a scenario entry based on the inputted regionDict, date string, event description string
export default function createScenarioEntry(regionDict, date="", event="") {
    return {
        date: date,
        event: event,
        regionDict: cloneDeep(regionDict), // Necessary as it appears for such complicated objects simply setting equal to regionDict would not be pass by value enough, and so you end up with entries sharing state
    }
}