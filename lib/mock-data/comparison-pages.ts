import type { DetailedComparisonPage } from "@/types/comparison";

export const comparisonPages: Record<string, DetailedComparisonPage> = {
  "picoway-vs-q-switch": {
    metaTitle: "PicoWay vs Q-Switch Laser | Independent Comparison | RealTattooReviews",
    metaDescription:
      "Compare PicoWay and Q-switch tattoo removal lasers across ink colors, session count, heat profile, cost, and who each technology fits best.",
    eyebrow: "Technology comparison",
    intentSummary:
      "This page is built as a neutral decision page for users comparing two tattoo removal technologies before they book.",
    keywordSummary:
      "Primary ownership is the direct head-to-head query `picoway vs q switch`, with supporting coverage for comparison phrasing and technology-evaluation language.",
    verdict:
      "PicoWay usually wins on difficult color, faster clearance potential, and lower heat load. Q-switch still makes sense for simpler black-ink work, price-sensitive cases, and clinics with strong operator experience.",
    summary:
      "The real decision is not 'new laser good, old laser bad.' It is whether your tattoo, skin tone, budget, and provider skill make the pico premium worth paying.",
    intro: [
      "PicoWay is a picosecond platform, which means it delivers much shorter pulses than traditional Q-switch systems. In practical terms, that usually translates into stronger photoacoustic impact and less leftover heat in the surrounding skin.",
      "That does not mean Q-switch is obsolete. Q-switch lasers still clear a lot of black ink successfully, they are more widely available, and experienced operators can get solid outcomes when the tattoo is straightforward.",
      "The mistake patients make is treating the device label like the whole answer. Wavelength availability, test patches, skin-tone protocol, session spacing, and the clinician running the machine matter just as much as whether the laser is pico or nano.",
    ],
    choiceCards: [
      {
        title: "Choose PicoWay if",
        body:
          "You are paying for better odds on stubborn work, not just newer branding.",
        bullets: [
          "Your tattoo has blue, green, or mixed-color ink.",
          "You want to minimize heat-heavy treatment on reactive or pigment-prone skin.",
          "You care more about total sessions than cheapest per-session price.",
        ],
      },
      {
        title: "Choose Q-switch if",
        body:
          "The case is simple enough that the older platform may still be the more practical buy.",
        bullets: [
          "The tattoo is mostly black ink and not especially dense.",
          "The clinic has a strong long-term track record with your tattoo type.",
          "Budget matters more than chasing the newest hardware.",
        ],
      },
      {
        title: "Do not decide by device alone",
        body:
          "Bad settings on a premium laser are still bad treatment.",
        bullets: [
          "Ask what wavelength they will use for your colors and skin tone.",
          "Ask how many sessions they expect and why.",
          "Ask whether they test patch darker skin tones or difficult color work.",
        ],
      },
    ],
    tableRows: [
      {
        criterion: "Pulse speed",
        left: "Picosecond pulses measured in trillionths of a second.",
        right: "Nanosecond pulses measured in billionths of a second.",
        takeaway: "Shorter pulses usually mean more photoacoustic breakup and less heat spill.",
      },
      {
        criterion: "Best use case",
        left: "Harder removals, mixed colors, and patients trying to reduce total sessions.",
        right: "Straightforward black-ink work and budget-sensitive cases.",
        takeaway: "The more complex the tattoo, the more the pico advantage tends to matter.",
      },
      {
        criterion: "Color performance",
        left: "Usually stronger on stubborn blue and green when the clinic has the right wavelengths.",
        right: "Can struggle more on difficult colors depending on the platform and wavelength mix.",
        takeaway: "Color is one of the clearest reasons patients pay for pico technology.",
      },
      {
        criterion: "Black ink performance",
        left: "Very strong, often with faster visible clearance.",
        right: "Still effective for many black tattoos when treated well.",
        takeaway: "For simple black ink, the outcome gap can narrow a lot.",
      },
      {
        criterion: "Heat profile",
        left: "Typically lower thermal load and gentler surrounding-skin impact.",
        right: "More heat-driven, which can matter for sensitive or pigment-prone skin.",
        takeaway: "This is part of why pico is often preferred for tougher skin-and-ink combinations.",
      },
      {
        criterion: "Session expectations",
        left: "Often fewer sessions in strong candidates, but not guaranteed.",
        right: "Often more sessions, especially when fading plateaus or color is stubborn.",
        takeaway: "Do the math on total treatment cost, not just single-session price.",
      },
      {
        criterion: "Availability",
        left: "Less universal and more common at premium chains or specialty clinics.",
        right: "More widely available across older dermatology and med-spa setups.",
        takeaway: "Local market reality may narrow your options before performance does.",
      },
      {
        criterion: "Price",
        left: "Usually higher per session.",
        right: "Usually lower per session.",
        takeaway: "The cheaper device can become more expensive if it adds multiple extra sessions.",
      },
    ],
    criteriaTitle: "What actually matters more than the marketing",
    criteriaPoints: [
      "Wavelength fit. Device name matters less than whether the clinic has the right wavelength for your ink colors and skin tone.",
      "Operator judgment. A clinician who can explain fluence, spot size, session spacing, and test patches is usually more important than the logo on the machine.",
      "Tattoo complexity. Layered tattoos, scarred tattoos, cover-up work, and dense color saturation are where technology differences show up fastest.",
      "Total-treatment math. Paying less per session is not a real savings if you need two to four extra rounds to reach the same endpoint.",
    ],
    consultQuestions: [
      "What wavelength will you use on my tattoo colors, and why is that the right fit?",
      "How many sessions do you expect for my case, and what assumptions are behind that estimate?",
      "How do you change settings for darker skin tones or a history of pigmentation changes?",
      "Do you use test patches before treating difficult color work or higher-risk skin types?",
      "Can you show before-and-after examples that match my ink colors, placement, and skin tone?",
    ],
    prosCons: [
      {
        label: "PicoWay",
        pros: [
          "Usually stronger on stubborn multicolor tattoos.",
          "Often better session efficiency on difficult cases.",
          "Lower heat profile can be a meaningful safety advantage.",
        ],
        cons: [
          "Higher per-session pricing is common.",
          "Not every market has a strong PicoWay operator nearby.",
          "The premium is harder to justify for easy black-ink removals.",
        ],
      },
      {
        label: "Q-switch",
        pros: [
          "More available across local markets.",
          "Often cheaper per session.",
          "Still effective for many black-ink and lower-complexity tattoos.",
        ],
        cons: [
          "Can require more sessions on harder cases.",
          "Less forgiving on difficult color combinations.",
          "Heat-heavy treatment can be a bigger concern on reactive skin.",
        ],
      },
    ],
    sourceNote:
      "This comparison is framed as an evaluation page, not a medical recommendation. It pulls together common device characteristics, clinic disclosures, and the patterns patients usually care about most: color clearance, session count, price, and skin-safety trade-offs.",
    faqs: [
      {
        question: "Is PicoWay always better than Q-switch?",
        answer:
          "No. PicoWay usually has the edge on harder color work and on cases where reducing heat matters, but Q-switch can still be a perfectly reasonable choice for simpler black-ink tattoos and lower-budget treatment plans.",
      },
      {
        question: "Does PicoWay mean fewer sessions every time?",
        answer:
          "No. It can reduce sessions in the right case, but session count still depends on tattoo age, depth, color mix, skin tone, body location, and how aggressive or conservative the clinic's settings are.",
      },
      {
        question: "Is Q-switch riskier for dark skin?",
        answer:
          "The bigger issue is protocol, not just the machine name. Darker skin needs the right wavelength choice, careful settings, and usually longer spacing between sessions. Clinics that cannot explain that clearly are the bigger risk.",
      },
      {
        question: "Why is PicoWay more expensive?",
        answer:
          "Usually because the technology is newer, clinics position it as premium equipment, and they price around the possibility of faster or cleaner clearance. The important question is whether that premium lowers your total treatment cost, not just your first invoice.",
      },
      {
        question: "What should I ask before choosing either one?",
        answer:
          "Ask what wavelength they will use, how many sessions they expect, whether they test patch higher-risk cases, and whether they have before-and-after examples similar to your tattoo and skin tone. That conversation is often more revealing than the device brand.",
      },
    ],
    relatedLinks: [
      {
        href: "/comparisons/best-tattoo-removal-method",
        label: "Best Tattoo Removal Method",
        description: "Broader method hub for patients comparing laser, saline, and non-laser options.",
        meta: "Comparison hub",
      },
      {
        href: "/cost",
        label: "Tattoo Removal Cost Guide",
        description: "Use this after comparing devices so you can price the full treatment path, not just one visit.",
        meta: "Cost guide",
      },
      {
        href: "/before-and-after",
        label: "Before-and-After Results",
        description: "Visual follow-up for patients who want proof of likely fading quality and endpoint realism.",
        meta: "Results",
      },
      {
        href: "/guides/tattoo-removal-scarring",
        label: "Tattoo Removal Scarring",
        description: "Helpful if skin risk, blistering, or pigment change is part of your device decision.",
        meta: "Guide",
      },
      {
        href: "/reviews",
        label: "Tattoo Removal Reviews",
        description: "Move from technology research into provider-level review evidence when you are ready to compare clinics.",
        meta: "Reviews hub",
      },
      {
        href: "/blog/q-switch-vs-picosecond-lasers",
        label: "Q-Switch vs Picosecond Lasers",
        description: "Editorial research piece that goes deeper on the evidence behind pulse-duration claims.",
        meta: "Research article",
      },
    ],
  },
};
