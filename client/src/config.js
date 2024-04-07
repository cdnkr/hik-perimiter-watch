// Camera indexes to show in grid
export const cameraIndexes = [7, 3, 4];

// Object classes to capture clips for
export const captureClasses = [
    {
        name: "person",
        minProbability: 0.75,
        hours: "*"
    },
    {
        name: "car",
        minProbability: 0.5,
        hours: "00:00 - 04:30"
    }
]