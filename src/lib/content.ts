/**
 * Editorial content: FAQs, testimonials, service area and the removal process.
 * Kept out of components so copy can be edited without touching layout code.
 */

export type Faq = { question: string; answer: string[] };

export const faqs: Faq[] = [
  {
    question: "How does bee removal work?",
    answer: [
      "We use humane methods to safely relocate a colony without harming it. A removal typically takes two to four hours, depending on where the bees have settled and how much comb they have built.",
      "It starts with a phone call and, ideally, a photo, so we can work out whether you have a swarm resting in the open or an established colony inside a structure. A swarm is usually quick. An established colony means opening a controlled access point, taking the comb out by hand, and gathering the bees so the colony survives the move.",
      "We also seal the entry points before we leave, so the same spot does not get re-colonised later.",
      "The colony travels back to More Chaos Farm in Alva, where it is set up in a proper hive. Nothing is exterminated.",
    ],
  },
  {
    question: "When do you operate?",
    answer: [
      "We provide bee removal seven days a week, and emergency calls are available.",
      "The best times are early morning or late afternoon, when the bees are less active and the removal goes more smoothly for everyone.",
      "If bees are inside your home, near a doorway, or someone in the household has a sting allergy, call 239-600-1058 and say it is urgent.",
    ],
  },
  {
    question: "Is your honey really raw?",
    answer: [
      "Yes. Our honey is never heated above 95°F, and it is only lightly strained to remove wax particles. That preserves all the natural enzymes and nutrients.",
      "Commercial honey is often pasteurised and finely filtered so it looks uniform on a shelf and never crystallises, but that process strips out the pollen and enzymes. Ours keeps them.",
      "That is also why our honey crystallises over time and why colour and flavour shift between batches. Crystallisation is proof of raw honey, not a fault — stand the jar in warm water and it liquefies again.",
    ],
  },
  {
    question: "Do you ship products?",
    answer: [
      "Not yet. Right now we offer local pickup and delivery within 30 miles of Alva, Florida.",
      "Pickup from the farm is free, and we will email you to arrange a time once your order is confirmed. Local delivery covers most of the Fort Myers and Cape Coral area.",
      "Shipping options are coming soon — join the newsletter and we will let you know the moment they open up.",
    ],
  },
  {
    question: "Are your products all-natural?",
    answer: [
      "Absolutely. Every product is made with ingredients from our own farm or from trusted local sources — no synthetic additives and no fillers.",
      "The beeswax in our salves and balm comes from our own hives, much of it from colonies we rescued. The honey is ours too.",
      "Full ingredient lists are printed on every label. If something is not listed, it is not in there.",
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
      "Ashley saved the day when we had a huge colony in our oak tree. She relocated them safely and even gave us a jar of their honey!",
    name: "Sarah Johnson",
    location: "Fort Myers, FL",
    service: "Live bee removal — oak tree",
  },
  {
    quote:
      "The raw honey is incredible — you can taste the difference. And the herbal salves work wonders on my dry skin.",
    name: "Mike Rodriguez",
    location: "Cape Coral, FL",
    service: "Raw honey & herbal salves",
  },
  {
    quote:
      "Professional, knowledgeable, and truly cares about the bees. Ashley is the only person I trust for bee removal in our area.",
    name: "Jennifer Smith",
    location: "Alva, FL",
    service: "Live bee removal",
  },
];

export type ProcessStep = { title: string; detail: string };

export const removalProcess: ProcessStep[] = [
  {
    title: "Call and describe the situation",
    detail:
      "Ring 239-600-1058 or send the request form with a photo. We work out whether you have a swarm passing through or an established colony that needs a full extraction, and give you an honest estimate before anyone drives anywhere.",
  },
  {
    title: "On-site assessment",
    detail:
      "We locate the colony and work out how to reach it with the least disruption to your property. You get told exactly what has to be opened before we open anything.",
  },
  {
    title: "Careful live extraction",
    detail:
      "We open a controlled access point and remove the comb by hand, gathering the bees so the colony survives the move. Most removals take two to four hours.",
  },
  {
    title: "Clean-out and seal",
    detail:
      "Leftover honey and comb are removed so nothing is left to ferment or attract pests, and the entry points are sealed so the same spot does not get re-colonised later.",
  },
  {
    title: "Relocation to More Chaos Farm",
    detail:
      "Your bees ride back to Alva and go into a proper hive on the farm. No extermination, no exceptions.",
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
      "Ingredients from our own farm or trusted local sources, printed in full on every label. No synthetic additives, no fillers.",
  },
  {
    title: "Farm to family",
    detail:
      "Every jar and tin is filled, capped and labelled by hand in Alva. You are buying from the person who did the work, and she answers the phone.",
  },
];
