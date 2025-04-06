// project.js - purpose and description here
// Author: Hunter Kingsley
// Date: 04/06/2025

const fillers = {
  thirdPerson: ["bro", "dude", "my man", "homie", "girl", "queen"],
  place: ["West City", "The Arctic", "Planet Namek", "Beerus's Planet", "The world of the Kais", "The Otherworld", "The Demon Realm", "Universe 6", "Universe 11", "Planet Cereal"],
  enemy: ["Frieza", "Cell", "Kid Buu", "Broly", "Cooler", "Bojack", "Garlic Jr.", "Janemba", "Lord Slug", "Turles", "Metal Cooler", "Goku Black", "Zamasu", "Gas", "Moro", "Nappa"],
  dragonBalls: ["the dragon balls", "the namekian dragon balls", "the super dragon balls", "the demon world dragon balls", "the cerealian dragon balls"],
  CharA: ["Master Roshi", "Whis", "King Kai", "Kami", "Korin", "Beerus", "Merus", "Mr Popo"],
  CharB: ["Goku", "Gohan", "Goten", "Vegeta", "Trunks", "Future Trunks", "Piccolo", "Pan", "Krillin", "Tien", "Yamcha", "Chiaotzu"],
  technique: ["the Afterimage Technique", "the Kamehameha", "the Galick Gun", "the Final Flash", "the Destructo Disc", "Instant Transmission", "the Kaio-ken", "the Masenko", "the Spirit Bomb", "the Special Beam Cannon", "Time-Skip", "Dragon Fist", "the Evil Containment Wave"],
  modifier: ["Super", "Ultra", "Evil", "Golden", "Super Saiyan God Super", "Great", "Orange", "Final", "Ultimate", "Black", "Full Power", "Legendary Super"],
  transformation: ["Saiyan", "Instinct", "Ego", "Kaio-ken"],
  number: ["1", "2", "3", "4", "5"],
  adverb: ["really", "kinda", "absolute", "total", "a little"],
  verb: ["peak fiction", "ass", "mid", "meh", "peak"]
};

const template = `Ayo $thirdPerson, did you hear about what happened in the latest arc of the Dragon Ball Super Manga?

The Z-Fighters have to travel to $place because $enemy was revived using $dragonBalls. $CharA teaches $CharB how to use $technique, and at the end $CharB unlocks $modifier $transformation $number to save the day.

Honestly I thought it was $adverb $verb.`;


// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  box.innerText = story;
}

/* global clicker */
clicker.onclick = generate;

generate();
