import type { DetailedComparisonPage } from "@/types/comparison";

export const comparisonPages: Record<string, DetailedComparisonPage> = {
  "inkout-vs-laseraway": {
    metaTitle: "inkOUT vs LaserAway | RealTattooReviews",
    metaDescription:
      "Compare inkOUT and LaserAway side by side, including TEPR vs PicoSure, pricing, results, pain, scarring risk, and which option fits your tattoo and skin type best.",
    eyebrow: "Provider comparison",
    intentSummary:
      "This page is built as a neutral decision page for users comparing inkOUT's TEPR method against LaserAway's PicoSure laser before they book.",
    keywordSummary:
      "Primary ownership is the direct head-to-head query 'inkout vs laseraway', with supporting coverage for TEPR vs PicoSure and related provider evaluation language.",
    verdict:
      "inkOUT is the stronger choice for darker skin tones, PMU removal, color ink, and patients who want a non-laser specialist. LaserAway suits standard dark-ink tattoos, wide location access, and patients who prefer a mainstream laser chain.",
    summary:
      "The choice is not really about which brand is better. It is about which method fits your tattoo, your skin type, and what you need from the outcome.",
    intro: [
      "inkOUT and LaserAway represent two different approaches to tattoo removal. LaserAway is a multi-location aesthetics chain that uses PicoSure picosecond laser technology. inkOUT is a tattoo-removal specialist that uses TEPR, a non-laser method.",
      "Laser fragments ink particles and lets the body's immune system clear them over weeks. TEPR introduces a solution into the dermis that creates a controlled wound, drawing ink out through the skin surface as the scab separates naturally.",
      "The practical difference shows up most clearly in three cases: darker skin tones, PMU and cosmetic tattoo removal, and color ink that resists laser wavelengths. In each of these, the method choice is clinically relevant, not just a matter of brand preference.",
    ],
    choiceCards: [
      {
        title: "Choose inkOUT if",
        body: "The method difference is clinically relevant for your specific case.",
        bullets: [
          "You have Fitzpatrick V or VI skin and want to avoid laser hypopigmentation risk.",
          "You are removing PMU, microblading, or a cosmetic tattoo with iron oxide pigments.",
          "Your tattoo has color ink that laser struggles with (light blue, green, yellow).",
        ],
      },
      {
        title: "Choose LaserAway if",
        body: "You have a standard tattoo and want a widely available, accessible option.",
        bullets: [
          "Your tattoo is standard dark-ink on lighter skin where laser risk is lower.",
          "Location availability matters and inkOUT does not operate near you.",
          "You want the financial certainty of an unlimited treatment package.",
        ],
      },
      {
        title: "Do not decide by brand alone",
        body: "The method underneath the brand is what determines your outcome.",
        bullets: [
          "Ask about your specific ink colors, skin tone, and expected session count.",
          "Ask how the provider handles PMU or color ink if that applies to you.",
          "Ask about healing expectations and aftercare requirements before booking.",
        ],
      },
    ],
    tableRows: [
      {
        criterion: "Method",
        left: "TEPR (Trans-Epidermal Pigment Release), non-laser",
        right: "PicoSure picosecond laser (Cynosure)",
        takeaway: "Fundamentally different removal mechanisms, not two versions of the same thing.",
      },
      {
        criterion: "How it works",
        left: "Solution introduced into dermis creates a controlled wound. Ink bonds to healing scab and lifts out.",
        right: "Ultra-short laser pulses shatter ink into fragments. Body's immune system clears fragments over weeks.",
        takeaway: "TEPR physically draws ink out. Laser fragments it for immune clearance.",
      },
      {
        criterion: "Dark skin (Fitzpatrick V/VI)",
        left: "Low hypopigmentation risk. Does not interact with melanin.",
        right: "Moderate risk. Laser energy is partially absorbed by melanin and can damage pigment-producing cells.",
        takeaway: "For darker skin, inkOUT is the more conservative clinical choice.",
      },
      {
        criterion: "PMU and microblading",
        left: "Strong fit. No oxidation risk for iron oxide or titanium dioxide pigments.",
        right: "Oxidation risk. Laser can trigger paradoxical darkening with iron oxide pigments.",
        takeaway: "inkOUT is the safer default for cosmetic tattoo removal.",
      },
      {
        criterion: "Color ink",
        left: "Physical mechanism. Does not rely on ink absorbing a specific wavelength.",
        right: "Wavelength-dependent. Light blue, green, and yellow can resist laser removal.",
        takeaway: "TEPR may be more reliable per session for difficult color profiles.",
      },
      {
        criterion: "Typical sessions",
        left: "3 to 6 sessions per area",
        right: "6 to 15 sessions depending on tattoo",
        takeaway: "Fewer sessions per course can offset comparable per-session pricing.",
      },
      {
        criterion: "Healing window",
        left: "Visible 2 to 4 week scabbing phase per session. The scab is the removal mechanism.",
        right: "Surface healing within 1 to 2 weeks. Less visible wound phase.",
        takeaway: "TEPR requires planning around the healing window. Session timing matters.",
      },
      {
        criterion: "Provider type",
        left: "Tattoo removal specialist. Singular focus.",
        right: "Multi-service aesthetics chain. Tattoo removal is one of many services.",
        takeaway: "Specialisation matters most for complex cases.",
      },
      {
        criterion: "Location footprint",
        left: "Select markets",
        right: "Broad chain footprint across the US",
        takeaway: "Availability depends on your location.",
      },
      {
        criterion: "Pricing model",
        left: "Per session or package. Fewer sessions can lower total spend.",
        right: "Per session or unlimited package. Flat fee reduces financial uncertainty.",
        takeaway: "Compare total treatment cost, not just per-session price.",
      },
    ],
    criteriaTitle: "What matters more than the brand name",
    criteriaPoints: [
      "Skin tone and melanin risk. For Fitzpatrick V and VI, the method difference is not cosmetic. Laser carries documented hypopigmentation risk that TEPR does not.",
      "Pigment type for PMU. Iron oxide and titanium dioxide in cosmetic tattoos can oxidise under laser energy. This is a known clinical risk that TEPR avoids entirely.",
      "Color ink composition. Laser works by wavelength matching. Colors that do not absorb the available wavelengths resist clearance. TEPR removes ink physically regardless of color.",
      "Total treatment cost. Fewer sessions at comparable per-session pricing can produce meaningfully lower total spend. Do the full course math before comparing invoices.",
    ],
    consultQuestions: [
      "What is my expected session count and what factors could change that estimate?",
      "For my skin tone: what is the hypopigmentation risk and how does your protocol manage it?",
      "If I have PMU or cosmetic tattooing: what is the oxidation risk and how do you assess it?",
      "What does the healing window look like per session, and what does aftercare require?",
      "Can you show before-and-after examples that match my ink colors, placement, and skin tone?",
    ],
    prosCons: [
      {
        label: "inkOUT",
        pros: [
          "Non-laser method with consistent risk profile across skin tones",
          "No melanin interaction, lower hypopigmentation risk for darker skin",
          "No oxidation risk for PMU and cosmetic tattoo pigments",
          "Typically fewer sessions for complete removal in the right cases",
          "Specialist focus on tattoo removal",
        ],
        cons: [
          "Smaller location footprint than a national chain",
          "Visible 2 to 4 week healing window per session",
          "Not suited for very large body tattoos where wound surface area is impractical",
          "Less brand familiarity for patients used to mainstream aesthetics chains",
        ],
      },
      {
        label: "LaserAway",
        pros: [
          "Widely available locations across the US",
          "PicoSure is a capable picosecond laser technology",
          "Unlimited package pricing reduces financial risk for longer treatments",
          "Works well on black and dark body ink",
          "Familiar, accessible brand",
        ],
        cons: [
          "Documented hypopigmentation risk for Fitzpatrick V and VI skin tones",
          "Oxidation risk for PMU and iron oxide pigments",
          "Treatment-resistant colors (light blue, green, yellow) can be challenging",
          "Multi-service chain model rather than specialist focus",
          "Potentially more sessions required compared to TEPR for the right cases",
        ],
      },
    ],
    sourceNote:
      "This comparison is based on publicly available information about each provider's methods and service model. Pricing and session estimates are approximate and vary by location, tattoo, and individual assessment. RealTattooReviews does not receive payment from either provider. See our methodology and editorial policy for full details.",
    faqs: [
      {
        question: "Is inkOUT better than LaserAway?",
        answer:
          "Neither is universally better. inkOUT is the stronger choice for darker skin tones, PMU removal, color ink, and patients who want a non-laser specialist. LaserAway is the stronger choice for standard dark-ink tattoos, wide location access, and patients who prefer a mainstream laser chain.",
      },
      {
        question: "What laser does LaserAway use?",
        answer:
          "LaserAway uses PicoSure, a picosecond laser made by Cynosure. Picosecond lasers fire in ultra-short pulses that shatter ink particles with less thermal damage than older Q-switched nanosecond devices.",
      },
      {
        question: "Is TEPR better than PicoSure?",
        answer:
          "TEPR and PicoSure are not directly comparable technologies. TEPR is a non-laser method that physically draws ink out through the skin. PicoSure is a laser that fragments ink for immune system clearance. TEPR is the more appropriate method for darker skin, PMU pigments, and color ink. PicoSure performs well on standard dark-ink body tattoos in patients with lighter skin.",
      },
      {
        question: "Is inkOUT cheaper than LaserAway?",
        answer:
          "Per-session prices vary and neither provider is consistently cheaper at that level. The more relevant comparison is total cost across the full treatment course. TEPR typically requires fewer sessions for the right cases, which can result in lower total spend even at comparable per-session prices.",
      },
      {
        question: "How many sessions does inkOUT take vs LaserAway?",
        answer:
          "inkOUT typically requires 3 to 6 TEPR sessions depending on the tattoo. LaserAway typically requires 6 to 15 laser sessions for the same tattoo. Session counts vary by ink density, color, skin type, and individual response.",
      },
      {
        question: "Which is better for dark skin?",
        answer:
          "inkOUT is the more conservative clinical choice for Fitzpatrick V and VI skin tones. TEPR does not use laser energy and does not interact with melanin, avoiding the documented hypopigmentation risk that laser carries for darker skin.",
      },
      {
        question: "Which is better for PMU and microblading removal?",
        answer:
          "inkOUT is the safer default for PMU and microblading. Laser energy can trigger oxidation in iron oxide and titanium dioxide pigments, causing cosmetic tattoos to darken or change color. TEPR works mechanically and does not trigger this reaction.",
      },
      {
        question: "Is LaserAway legit?",
        answer:
          "Yes. LaserAway is a legitimate multi-location aesthetics chain with a significant US footprint. PicoSure is a clinically established picosecond laser. The relevant question is not whether LaserAway is legitimate but whether its method and service model are the right fit for your specific removal case.",
      },
    ],
    relatedLinks: [
      {
        href: "/comparisons/inkout-vs-removery",
        label: "inkOUT vs Removery",
        description: "TEPR vs laser removal compared across another national chain. Useful if you are deciding between multiple laser providers alongside inkOUT.",
        meta: "Comparison",
      },
      {
        href: "/comparisons/best-tattoo-removal-method",
        label: "Best Tattoo Removal Method",
        description: "Broader method hub for patients comparing laser, saline, and non-laser options before choosing a provider.",
        meta: "Comparison hub",
      },
      {
        href: "/guides/saline-tattoo-removal",
        label: "Saline Tattoo Removal Guide",
        description: "How saline and TEPR-style methods work, who they suit, and what healing looks like across sessions.",
        meta: "Guide",
      },
      {
        href: "/guides/tattoo-removal-scarring",
        label: "Tattoo Removal Scarring",
        description: "Understand scarring risk across methods before you book, including dark skin and PMU considerations.",
        meta: "Guide",
      },
      {
        href: "/reviews",
        label: "Tattoo Removal Reviews",
        description: "Move from method research into provider-level review evidence when you are ready to evaluate specific clinics.",
        meta: "Reviews hub",
      },
    ],
  },

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
