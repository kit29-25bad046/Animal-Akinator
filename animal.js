// ==========================================
// Animal Akinator - Animal & Question Database
// ==========================================

const QUESTIONS = [
  {
    id: "has_fur",
    text: "Does it have fur or hair?",
    emoji: "🦁",
    hint: "Think about whether its body is covered in soft fur or hair."
  },
  {
    id: "has_four_legs",
    text: "Does it have four legs?",
    emoji: "🐾",
    hint: "Does it walk or stand on four legs?"
  },
  {
    id: "is_wild",
    text: "Is it a wild animal?",
    emoji: "🌿",
    hint: "Does it live freely in nature, jungles, oceans, or forests?"
  },
  {
    id: "lives_in_water",
    text: "Does it live in water or spend most of its time swimming?",
    emoji: "🌊",
    hint: "Think lakes, rivers, seas, or oceans."
  },
  {
    id: "has_wings",
    text: "Does it have wings?",
    emoji: "🪶",
    hint: "Does it possess feathered or scaled wings?"
  },
  {
    id: "can_fly",
    text: "Can it fly in the sky?",
    emoji: "🕊️",
    hint: "Can it soar or fly through the air?"
  },
  {
    id: "is_domestic",
    text: "Is it a domestic animal, farm animal, or common pet?",
    emoji: "🏡",
    hint: "Do humans frequently keep, raise, or live with it?"
  },
  {
    id: "is_carnivore",
    text: "Is it a carnivore (does it eat meat or hunt other animals)?",
    emoji: "🥩",
    hint: "Is meat, fish, or insects a major part of its diet?"
  },
  {
    id: "is_very_large",
    text: "Is it exceptionally large or heavy (like a giant animal)?",
    emoji: "🐘",
    hint: "Is it much heavier than an average human?"
  },
  {
    id: "has_stripes",
    text: "Does it have distinct stripes on its body?",
    emoji: "🦓",
    hint: "Patterned stripes on its fur, skin, or scales."
  },
  {
    id: "has_scales",
    text: "Does it have scales or cold-blooded reptilian/fish skin?",
    emoji: "🐍",
    hint: "Think of reptiles, snakes, or scaled fish."
  },
  {
    id: "barks_or_howls",
    text: "Does it bark, howl, or belong to the canine family?",
    emoji: "🐕",
    hint: "Known for barking, wagging its tail, or howling."
  },
  {
    id: "climbs_trees",
    text: "Is it known for climbing trees, swinging on branches, or leaping high?",
    emoji: "🐒",
    hint: "Agile tree-climber or forest acrobat."
  },
  {
    id: "hops_or_jumps",
    text: "Does it move primarily by hopping or jumping with strong legs?",
    emoji: "🐇",
    hint: "Bounces or hops across the ground."
  },
  {
    id: "has_long_ears",
    text: "Does it have noticeably long ears?",
    emoji: "🐰",
    hint: "Tall, floppy, or perky long ears."
  },
  {
    id: "has_mane",
    text: "Does it have a prominent, majestic mane around its neck?",
    emoji: "👑",
    hint: "A thick collar of hair around its head or neck."
  },
  {
    id: "has_trunk_tusks",
    text: "Does it have a long flexible trunk and large tusks?",
    emoji: "🐘",
    hint: "Famous for an elongated nose/trunk."
  },
  {
    id: "has_long_neck",
    text: "Does it have an unusually long neck to reach high trees?",
    emoji: "🦒",
    hint: "The tallest creature around."
  },
  {
    id: "can_mimic_speech",
    text: "Can it mimic human speech, words, or whistle bright tunes?",
    emoji: "🦜",
    hint: "Known for colorful feathers and repeating phrases."
  },
  {
    id: "breathes_air",
    text: "Does it breathe air directly using lungs (like mammals and birds)?",
    emoji: "💨",
    hint: "Unlike fish that breathe underwater using gills."
  },
  {
    id: "no_legs",
    text: "Does it have no legs at all and slithers along the ground?",
    emoji: "🐍",
    hint: "Legless body that glides or coils."
  },
  {
    id: "sharp_predator_teeth",
    text: "Is it famous for rows of razor-sharp predator teeth or a dangerous bite?",
    emoji: "🦈",
    hint: "Apex predator known for fearsome teeth or venom."
  },
  {
    id: "is_nocturnal",
    text: "Is it primarily nocturnal (active at night with night vision)?",
    emoji: "🦉",
    hint: "Hunts or stays awake while the world sleeps."
  },
  {
    id: "gives_milk_farm",
    text: "Is it a gentle farm animal known for providing milk and saying 'moo'?",
    emoji: "🐄",
    hint: "Classic dairy farm animal with horns or spots."
  },
  {
    id: "can_be_ridden",
    text: "Is it a swift, noble animal that humans ride on saddles or race?",
    emoji: "🐎",
    hint: "Equipped with hooves, gallops fast, and neighs."
  },
  {
    id: "has_pouch",
    text: "Does it have a pouch on its belly to carry its baby (joey)?",
    emoji: "🦘",
    hint: "Famous marsupial from Australia."
  },
  {
    id: "waddles_in_cold",
    text: "Does it waddle on ice/snow and wear a tuxedo-like feather coat?",
    emoji: "🐧",
    hint: "Flightless bird that loves icy waters and slides on its tummy."
  }
];

export const ANIMALS = [
  // 1. Lion
  {
    id: "lion",
    name: "Lion",
    emoji: "🦁",
    category: "Mammal / Big Cat",
    funFact: "Known as the 'King of the Jungle', a male lion's roar can be heard up to 8 kilometers (5 miles) away!",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: true,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: true,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: true,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 2. Tiger
  {
    id: "tiger",
    name: "Tiger",
    emoji: "🐅",
    category: "Mammal / Big Cat",
    funFact: "Tigers are the largest wild cats in the world, and every tiger has a unique pattern of dark stripes on its fur—and even on its skin!",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: true,
      has_stripes: true,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: true,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 3. Dog
  {
    id: "dog",
    name: "Dog",
    emoji: "🐕",
    category: "Mammal / Companion",
    funFact: "Dogs are humankind's best friends! Their sense of smell is up to 100,000 times more sensitive than a human's.",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: false,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: true,
      is_carnivore: true,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: true,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 4. Cat
  {
    id: "cat",
    name: "Cat",
    emoji: "🐈",
    category: "Mammal / Companion",
    funFact: "Cats can rotate their ears 180 degrees and spend about 70% of their lives sleeping and purring comfortably.",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: false,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: true,
      is_carnivore: true,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: true,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 5. Elephant
  {
    id: "elephant",
    name: "Elephant",
    emoji: "🐘",
    category: "Mammal / Herbivore",
    funFact: "Elephants are the world's largest land animals. Their trunks contain over 40,000 individual muscles!",
    traits: {
      has_fur: false,
      has_four_legs: true,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: false,
      is_very_large: true,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: true,
      has_mane: false,
      has_trunk_tusks: true,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 6. Monkey
  {
    id: "monkey",
    name: "Monkey",
    emoji: "🐒",
    category: "Mammal / Primate",
    funFact: "Monkeys are incredibly clever and use their agile hands, feet, and sometimes even their tails to swing across the jungle canopy.",
    traits: {
      has_fur: true,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: false,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: true,
      hops_or_jumps: true,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 7. Cow
  {
    id: "cow",
    name: "Cow",
    emoji: "🐄",
    category: "Mammal / Farm Animal",
    funFact: "Cows have almost 360-degree panoramic vision and produce fresh milk while enjoying peaceful grazing in green pastures.",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: false,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: true,
      is_carnivore: false,
      is_very_large: true,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: true,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 8. Horse
  {
    id: "horse",
    name: "Horse",
    emoji: "🐎",
    category: "Mammal / Equine",
    funFact: "Horses can sleep both standing up and lying down, and they have been loyal companions to humans for thousands of years.",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: false,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: true,
      is_carnivore: false,
      is_very_large: true,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: true,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: true,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 9. Rabbit
  {
    id: "rabbit",
    name: "Rabbit",
    emoji: "🐇",
    category: "Mammal / Small Herbivore",
    funFact: "When rabbits are feeling joyful, they perform an adorable athletic leap and twist called a 'binky'!",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: false,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: true,
      is_carnivore: false,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: true,
      has_long_ears: true,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 10. Fish
  {
    id: "fish",
    name: "Fish",
    emoji: "🐠",
    category: "Aquatic / Gill-breather",
    funFact: "Fish communicate with each other using underwater sounds, clicks, and color displays, breathing effortlessly through gills.",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: false,
      lives_in_water: true,
      has_wings: false,
      can_fly: false,
      is_domestic: true,
      is_carnivore: false,
      is_very_large: false,
      has_stripes: false,
      has_scales: true,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: false,
      no_legs: true,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 11. Dolphin
  {
    id: "dolphin",
    name: "Dolphin",
    emoji: "🐬",
    category: "Marine Mammal",
    funFact: "Dolphins are mammals that breathe air through blowholes! They are highly intelligent, use echolocation, and love surfing ocean waves.",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: true,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: true,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: true,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: true,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 12. Shark
  {
    id: "shark",
    name: "Shark",
    emoji: "🦈",
    category: "Aquatic / Apex Predator",
    funFact: "Sharks have skeletons made entirely of flexible cartilage instead of bone, and they can replace thousands of teeth during their lifetime!",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: true,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: true,
      has_stripes: false,
      has_scales: true,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: false,
      no_legs: true,
      sharp_predator_teeth: true,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 13. Eagle
  {
    id: "eagle",
    name: "Eagle",
    emoji: "🦅",
    category: "Bird of Prey",
    funFact: "Eagles have razor-sharp eyesight that can spot a small rabbit from over 3 kilometers (nearly 2 miles) up in the clouds!",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: false,
      has_wings: true,
      can_fly: true,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 14. Parrot
  {
    id: "parrot",
    name: "Parrot",
    emoji: "🦜",
    category: "Avian / Companion",
    funFact: "Parrots are famous for their colorful plumage, high intelligence, and incredible ability to imitate human words and melodies!",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: false,
      lives_in_water: false,
      has_wings: true,
      can_fly: true,
      is_domestic: true,
      is_carnivore: false,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: true,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: true,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // 15. Snake
  {
    id: "snake",
    name: "Snake",
    emoji: "🐍",
    category: "Reptile",
    funFact: "Snakes smell the air using their forked tongues, collect scent molecules, and have flexible jaws that can swallow prey whole!",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: false,
      has_stripes: false,
      has_scales: true,
      barks_or_howls: false,
      climbs_trees: true,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: true,
      sharp_predator_teeth: true,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // Bonus 16: Giraffe
  {
    id: "giraffe",
    name: "Giraffe",
    emoji: "🦒",
    category: "Mammal / Herbivore",
    funFact: "Giraffes are the tallest mammals on Earth. Their tongues alone can be up to 45 centimeters (18 inches) long!",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: false,
      is_very_large: true,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: true,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // Bonus 17: Kangaroo
  {
    id: "kangaroo",
    name: "Kangaroo",
    emoji: "🦘",
    category: "Marsupial",
    funFact: "Kangaroos use their large tails for balance and can leap over 8 meters (25 feet) in a single jump!",
    traits: {
      has_fur: true,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: false,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: true,
      has_long_ears: true,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: true,
      waddles_in_cold: false
    }
  },

  // Bonus 18: Penguin
  {
    id: "penguin",
    name: "Penguin",
    emoji: "🐧",
    category: "Aquatic Flightless Bird",
    funFact: "Penguins cannot fly in the sky, but underwater their wings turn into high-speed flippers propelling them up to 36 km/h!",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: true,
      has_wings: true,
      can_fly: false,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: true
    }
  },

  // Bonus 19: Owl
  {
    id: "owl",
    name: "Owl",
    emoji: "🦉",
    category: "Avian / Raptor",
    funFact: "Owls can rotate their heads an astounding 270 degrees and fly completely silently to catch prey in dark forests!",
    traits: {
      has_fur: false,
      has_four_legs: false,
      is_wild: true,
      lives_in_water: false,
      has_wings: true,
      can_fly: true,
      is_domestic: false,
      is_carnivore: true,
      is_very_large: false,
      has_stripes: false,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: true,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: false,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: true,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  },

  // Bonus 20: Zebra
  {
    id: "zebra",
    name: "Zebra",
    emoji: "🦓",
    category: "Mammal / Equine",
    funFact: "Zebras' black and white striped coats work as natural insect repellents and camouflage to confuse predators in the African savannah!",
    traits: {
      has_fur: true,
      has_four_legs: true,
      is_wild: true,
      lives_in_water: false,
      has_wings: false,
      can_fly: false,
      is_domestic: false,
      is_carnivore: false,
      is_very_large: true,
      has_stripes: true,
      has_scales: false,
      barks_or_howls: false,
      climbs_trees: false,
      hops_or_jumps: false,
      has_long_ears: false,
      has_mane: true,
      has_trunk_tusks: false,
      has_long_neck: false,
      can_mimic_speech: false,
      breathes_air: true,
      no_legs: false,
      sharp_predator_teeth: false,
      is_nocturnal: false,
      gives_milk_farm: false,
      can_be_ridden: false,
      has_pouch: false,
      waddles_in_cold: false
    }
  }
];

if (typeof window !== "undefined") {
  window.AkinatorData = { QUESTIONS, ANIMALS };
}
