'use strict';

// Return a Silly Name
function sillyname() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    // First Name
    return ["Runny","Buttercup","Dinky","Stinky","Crusty",
    "Greasy","Gidget","Cheesypoof","Lumpy","Wacky","Tiny","Flunky",
    "Fluffy","Zippy","Doofus","Gobsmacked","Slimy","Grimy","Salamander",
    "Dr","Burrito","Bumpy","Loopy",
    "Snotty","Irving","Egbert"][rnd(25)] +

    // Last Name
    ["Waffer","Lilly","Bubblegum","Sand","Fuzzy","Kitty",
    "Puppy","Snuggles","SpacePrincess","Stinky","Lulu",
    "Lala","Sparkle","Glitter",
    "Silver","Golden","Rainbow","Cloud",
    "Rain","Stormy","Wink","Sugar",
    "Twinkle","Star","Halo","Angel"][rnd(25)];
}
