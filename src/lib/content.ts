/**
 * Editorial content: FAQs, testimonials, service area and the removal process.
 * Kept out of components so copy can be edited without touching layout code.
 */

export type Faq = { question: string; answer: string[] };

export const faqs: Faq[] = [
  {
    question: "How does live bee removal actually work?",
    answer: [
      "It starts with a phone call and, ideally, a photo. We ask where the bees are, how long they have been there, and how they are getting in — that tells us whether we are looking at a swarm resting on a branch or an established colony inside a structure.",
      "A swarm is usually straightforward: the bees have no comb yet, so we hive them on site and carry them away, often in under an hour. An established colony inside a wall, soffit or tree cavity is real work. We open a small access point, remove the comb by hand, gather the brood into frames so the colony survives the move, and locate the queen. Where the queen goes, the colony goes.",
      "Once the bees and comb are out, we clean the cavity so leftover honey does not ferment, stain or attract ants, roaches and future swarms. We then seal the entry point so the same spot does not get re-colonised next spring.",
      "The colony travels back to More Chaos Farm in Alva, where it is set up in a proper hive and monitored while it settles. Weeks later, the same bees are producing the honey we bottle.",
    ],
  },
  {
    question: "When do you operate, and can you come out same day?",
    answer: [
      "We take calls seven days a week. Bees do not keep business hours and neither do we.",
      "Same-day service is often possible for urgent situations — bees inside a home, a swarm near a doorway or playground, someone in the household with a sting allergy, or a colony in a vehicle. Call 239-600-1058 and say it is urgent; you will speak to a person, not a queue.",
      "Non-urgent jobs are usually scheduled within a few days. Removals go best in daylight and dry weather, so we may move an appointment around Florida's afternoon storms.",
    ],
  },
  {
    question: "Is your honey really raw?",
    answer: [
      "Yes — genuinely raw, with nothing done to it after it leaves the hive except straining out wax chunks and pouring it into a jar.",
      "We never heat it. Commercial honey is often pasteurised and micro-filtered so it looks uniform on a shelf and never crystallises, but that process strips the pollen and the enzymes. Ours keeps them.",
      "That is why our honey crystallises over time, and why the colour and flavour change from batch to batch. Crystallisation is proof of raw honey, not a fault. Stand the jar in warm water and it liquefies again.",
    ],
  },
  {
    question: "Do you ship your products?",
    answer: [
      "Yes. We ship honey, salves and tallow skin care anywhere in the continental United States. Orders usually go out within two to three business days.",
      "Honey ships double-boxed with protective padding. Salves and balms ship with an insulating sleeve in the warm months so they arrive solid rather than as a puddle.",
      "Local to Alva, Fort Myers or Cape Coral? Choose local pickup in your order notes and skip shipping entirely — we will arrange a time.",
    ],
  },
  {
    question: "Are your products all-natural?",
    answer: [
      "Every product is made by hand at More Chaos Farm from ingredients we can name. No synthetic fragrance oils, no petroleum jelly, no parabens, no fillers bulking out a tin.",
      "The beeswax in our salves and balms comes from our own hives — much of it from colonies we rescued. The honey is ours. The tallow is grass-fed and rendered in our own kitchen.",
      "Full ingredient lists are printed on every label and published on each product page. If something is not listed, it is not in there.",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We had a huge colony living in the old oak in our backyard and every company we called wanted to spray it. Ashley came out, took the whole hive out alive, and relocated it to her farm. She even left us a jar of honey. You can tell she genuinely cares about the bees.",
    name: "Sarah Johnson",
    location: "Fort Myers, FL",
    service: "Live bee removal — oak tree",
  },
  {
    quote:
      "The raw honey is on another level compared to anything from the grocery store — you can actually taste the difference. My wife started using the herbal salves for her dry skin and now we order both every couple of months.",
    name: "Mike Rodriguez",
    location: "Cape Coral, FL",
    service: "Raw honey & herbal salves",
  },
  {
    quote:
      "Professional, knowledgeable, and she explained every step of what she was doing and why. She sealed the entry point so they could not come back. Ashley is the only person I would call for bee removal, and I have sent three neighbours her way.",
    name: "Jennifer Smith",
    location: "Alva, FL",
    service: "Live bee removal — wall cavity",
  },
];

export type ProcessStep = { title: string; detail: string };

export const removalProcess: ProcessStep[] = [
  {
    title: "Call and describe the situation",
    detail:
      "Ring 239-600-1058 or send the request form with a photo. We work out fast whether you have a swarm passing through or an established colony that needs a full extraction, and give you an honest estimate before anyone drives anywhere.",
  },
  {
    title: "On-site assessment",
    detail:
      "We locate the colony precisely — thermal and acoustic checks find comb behind drywall or stucco without opening the whole wall. You get told exactly what has to be opened and what it will take to put it back.",
  },
  {
    title: "Careful live extraction",
    detail:
      "We open a controlled access point and remove the comb by hand. Brood comb is tied into frames so developing bees survive the trip, and the queen is found and secured — the rest of the colony follows her willingly.",
  },
  {
    title: "Clean-out and seal",
    detail:
      "Leftover honey is removed so it cannot ferment, stain your ceiling or draw ants and roaches. The cavity is cleaned and the entry point sealed, because an unsealed cavity still smelling of beeswax is an open invitation to next season's swarm.",
  },
  {
    title: "Relocation to More Chaos Farm",
    detail:
      "Your bees ride back to Alva and go into a proper hive, where they are fed and monitored until they are settled and thriving. No extermination, no exceptions.",
  },
];

/** Cities and communities covered, grouped by county. */
export const serviceArea = [
  {
    county: "Lee County",
    cities: [
      "Alva",
      "Fort Myers",
      "Cape Coral",
      "North Fort Myers",
      "Lehigh Acres",
      "Estero",
      "Bonita Springs",
      "Fort Myers Beach",
      "Sanibel",
      "Captiva",
      "Buckingham",
      "Olga",
      "Tice",
      "San Carlos Park",
    ],
  },
  {
    county: "Charlotte County",
    cities: [
      "Punta Gorda",
      "Port Charlotte",
      "Charlotte Harbor",
      "Rotonda West",
      "Englewood",
      "Placida",
      "Babcock Ranch",
      "Solana",
    ],
  },
  {
    county: "Hendry County",
    cities: [
      "LaBelle",
      "Clewiston",
      "Felda",
      "Harlem",
      "Montura",
      "Port LaBelle",
      "Pioneer",
    ],
  },
];

/** Places bees commonly set up shop — used in the "got bees" callout. */
export const removalLocations = [
  "Walls and wall cavities",
  "Attics and crawl spaces",
  "Soffits, eaves and roof lines",
  "Trees and fallen limbs",
  "Sheds, barns and outbuildings",
  "Chimneys and vents",
  "Water meter and irrigation boxes",
  "Vehicles, campers and boats",
  "Fence posts and playsets",
  "Swarms clustered in the open",
];

export const values = [
  {
    title: "Humane treatment, always",
    detail:
      "No colony we are called to gets exterminated. Not the awkward ones, not the ones three storeys up. Bees get relocated or we do not take the job.",
  },
  {
    title: "Sustainability that is actually local",
    detail:
      "Rescued colonies become working hives on the farm. Their wax goes into salves, their honey into jars. Nothing about the operation depends on shipping something in from elsewhere.",
  },
  {
    title: "Ingredients you can read",
    detail:
      "Short ingredient lists, printed in full. If we would not use it on our own family, it does not get poured into a tin.",
  },
  {
    title: "Farm to family",
    detail:
      "Every jar and tin is filled, capped and labelled by hand in Alva. You are buying from the person who did the work, and she answers the phone.",
  },
];
