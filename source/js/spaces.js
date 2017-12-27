const spaces = [
    {
        id: 0,
        name: 'Kitchen (Floor 2)',
        adjacentSpaces: {
            1: true
        },
        floor: 2
    },
    {
        id: 1,
        name: 'Dining Room (Floor 2)',
        adjacentSpaces: [0,2,3,5],
        floor: 2
    },
    {
        id: 2,
        name: 'Living Room (Floor 2)',
        adjacentSpaces: [1,3,4,5],
        floor: 2
    },
    {
        id: 3,
        name: 'Front Door (Floor 2)',
        adjacentSpaces: [1,2,11],
        floor: 2
    },
    {
        id: 4,
        name: 'Patio (Floor 2)',
        adjacentSpaces: [2,8],
        floor: 2
    },
    {
        id: 5,
        name: 'Hallway (Floor 2)',
        adjacentSpaces: [1,2,6,7,8],
        floor: 2
    },
    {
        id: 6,
        name: 'Bedroom 1 (Floor 2)',
        adjacentSpaces: [5],
        floor: 2
    },
    {
        id: 7,
        name: 'Bathroom 1 (Floor 2)',
        adjacentSpaces: [5],
        floor: 2
    },
    {
        id: 8,
        name: 'Bedroom 2 (Floor 2)',
        adjacentSpaces: [5,9,4],
        floor: 2
    },
    {
        id: 9,
        name: 'Bedroom 2 Hallway (Floor 2)',
        adjacentSpaces: [8,10],
        floor: 2
    },
    {
        id: 10,
        name: 'Bathroom 2 (Floor 2)',
        adjacentSpaces: [9],
        floor: 2
    },
    {
        id: 11,
        name: 'Apartment Hallway (Floor 2)',
        adjacentSpaces: [3,12,13],
        floor: 2
    },
    {
        id: 12,
        name: 'Stairs',
        adjacentSpaces: [11,25],
        floor: 0
    },
    {
        id: 13,
        name: 'Elevator',
        adjacentSpaces: [11,25],
        floor: 0
    },
    {
        id: 14,
        name: 'Kitchen (Floor 1)',
        adjacentSpaces: [15],
        floor: 1
    },
    {
        id: 15,
        name: 'Dining Room (Floor 1)',
        adjacentSpaces: [14,16,17,19],
        floor: 1
    },
    {
        id: 16,
        name: 'Living Room (Floor 1)',
        adjacentSpaces: [15,17,18,19],
        floor: 1
    },
    {
        id: 17,
        name: 'Front Door (Floor 1)',
        adjacentSpaces: [15,16,25],
        floor: 1
    },
    {
        id: 18,
        name: 'Patio (Floor 1)',
        adjacentSpaces: [16,22],
        floor: 1
    },
    {
        id: 19,
        name: 'Hallway (Floor 1)',
        adjacentSpaces: [15,16,20,21,22],
        floor: 1
    },
    {
        id: 20,
        name: 'Bedroom 1 (Floor 1)',
        adjacentSpaces: [19],
        floor: 1
    },
    {
        id: 21,
        name: 'Bathroom 1 (Floor 1)',
        adjacentSpaces: [19],
        floor: 1
    },
    {
        id: 22,
        name: 'Bedroom 2 (Floor 1)',
        adjacentSpaces: [19,23,18],
        floor: 1
    },
    {
        id: 23,
        name: 'Bedroom 2 Hallway (Floor 1)',
        adjacentSpaces: [22,24],
        floor: 1
    },
    {
        id: 24,
        name: 'Bathroom 2 (Floor 1)',
        adjacentSpaces: [23],
        floor: 1
    },
    {
        id: 25,
        name: 'Apartment Hallway (Floor 1)',
        adjacentSpaces: [17,12,13],
        floor: 1
    }
    
];

export default spaces;