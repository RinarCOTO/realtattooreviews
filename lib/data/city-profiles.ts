export type CityProviderProfile = {
    name: string
    href?: string
    body: string
    bestFor: string[]
    lessIdealFor: string[]
}

const PROFILES: Record<string, CityProviderProfile[]> = {
    austin: [
        {
            name: "MEDermis Laser Clinic (South Austin)",
            href: "/reviews/medermis-laser-clinic",
            body: "MEDermis Laser Clinic is at 2111 Dickson Dr in South Austin. The clinic has been in the Austin and San Antonio market since 2006, making it one of the longest-established tattoo removal operations in the metro. MEDermis uses a Spectra Q-switched Nd:YAG laser system and reports a 98% ink clearance rate across more than 300,000 treatments. The clinic offers a session guarantee that continues treatment at no additional cost for one year if a tattoo requires more than 10 sessions to clear, with limitations on green and blue tattoos.",
            bestFor: [
                "Users who want a long-established Texas operator with a session guarantee",
                "Users with straightforward black or dark-blue tattoos",
            ],
            lessIdealFor: [
                "Users with heavily colored tattoos in green or blue, where the guarantee does not apply",
            ],
        },
        {
            name: "Removery (South Congress)",
            href: "/reviews/removery/south-congress",
            body: "Removery's South Congress location is at 1400 S Congress Ave. Removery is a national tattoo-removal-only chain that uses Candela PicoWay, a picosecond laser that handles most ink colors and skin types. Removery offers a Complete Removal Package model that caps the total cost regardless of session count. The brand also operates a Round Rock location at 2541 N IH-35 with similar service.",
            bestFor: [
                "Users who want package pricing with unlimited sessions",
                "Users planning to relocate or travel during their removal series",
                "Users who prefer a national-chain experience with consistent protocols",
            ],
            lessIdealFor: [
                "Users seeking a smaller, owner-operated studio",
                "Users who specifically want non-laser options",
            ],
        },
        {
            name: "inkOUT (West Austin)",
            href: "/reviews/inkout/austin",
            body: "inkOUT's Austin location is at 7101 State Hwy 71 in West Austin. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. It is the non-laser option currently tracked by RealTattooReviews in the Austin metro; users should still compare it against laser providers by tattoo type, skin response, pricing, and consultation fit.",
            bestFor: [
                "Users who want a non-laser method",
                "Users with cosmetic tattoos like microblading or lip blush",
                "Users with concerns about laser interaction with darker skin tones",
                "Users comparing non-laser removal for colors that may be difficult for wavelength-based systems",
            ],
            lessIdealFor: [
                "Users with very large tattoos who prefer the per-session speed of laser",
                "Users who are price-sensitive on a single small tattoo",
            ],
        },
        {
            name: "LaserAway (Austin)",
            href: "/reviews/laseraway/austin",
            body: "LaserAway's Austin East Side location is part of the national chain's Texas expansion. LaserAway uses Cynosure PicoSure picosecond technology alongside Nd:YAG systems and operates across more than 150 locations nationally. The brand emphasizes standardized protocols, medical oversight, and consistent staff training. Financing is available through CareCredit and Alphaeon Credit.",
            bestFor: [
                "Users who want a large national chain with high review volume",
                "Users who may need to continue treatment while traveling",
                "Users with multicolor tattoos benefiting from PicoSure wavelength coverage",
            ],
            lessIdealFor: [
                "Users who prefer an owner-operated specialist studio",
                "Users seeking non-laser options",
            ],
        },
        {
            name: "Clean Slate Ink (Round Rock)",
            href: "/reviews/clean-slate-ink",
            body: "Clean Slate Ink is in Round Rock at 600 Round Rock W Dr. The clinic offers both tattoo removal and other laser services, with an established lifetime review base in the North Austin suburbs.",
            bestFor: [
                "Users in Round Rock or North Austin suburbs who want a closer option than central Austin specialists",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist focus",
            ],
        },
        {
            name: "Unbranded ATX (North Austin)",
            href: "/reviews/unbranded-atx",
            body: "UNBRANDED is an owner-operated specialist studio in North Austin at 5511 Parkcrest Dr, near Mopac and 2222. Founder Alan personally performs treatments. Pricing is size-based and the clinic offers free consultations.",
            bestFor: [
                "Users who want a single experienced provider across their entire treatment series",
                "Users with complex or sensitive cases",
                "Users prioritizing scarring-risk minimization",
            ],
            lessIdealFor: [
                "Users who need extended evening or weekend hours",
            ],
        },
        {
            name: "Pigment Tattoo & Laser Removal (North Austin)",
            body: "Pigment is a combined tattoo studio and laser removal clinic on Ranch Road 620 in North Austin. The location handles both ends of the cover-up workflow. Laser fading happens on one side; cover-up tattoo work on the other. Pricing is published in size brackets, ranging from about $150 for postage-stamp-sized tattoos to $500 to $600 for half-sleeve outer-arm work.",
            bestFor: [
                "Users planning a cover-up who want fading and the new tattoo coordinated under one roof",
                "Users who want transparent published pricing before consultation",
            ],
            lessIdealFor: [
                "Users who specifically want a laser-only specialist with no tattooing services",
            ],
        },
        {
            name: "Think Again Tattoo Removal (South Austin)",
            href: "/reviews/think-again-tattoo-removal",
            body: "Think Again is a tattoo-removal-only specialist on South Congress at 3801 S Congress. The clinic uses the Quanta Discovery Pico Plus, an FDA-cleared picosecond system. Think Again offers a Complete Care Commitment package model, with per-session pricing starting around $90 for very small tattoos.",
            bestFor: [
                "Users who want a tattoo-removal-only specialist",
                "Users with stubborn blue or green ink that benefits from picosecond technology",
                "Users who want a clear package guarantee",
            ],
            lessIdealFor: [
                "Users who prefer a Texas-headquartered company with a longer local history",
            ],
        },
        {
            name: "Austin Laser Solutions (Bee Cave)",
            body: "Austin Laser Solutions is in the Hill Country Galleria area at 12700 Hill Country Blvd. The clinic offers both tattoo removal and hair removal and runs periodic promotional pricing.",
            bestFor: [
                "Users in Bee Cave, Lakeway, or Westlake who want a closer option than central Austin specialists",
            ],
            lessIdealFor: [
                "Users seeking the largest sample size of public reviews to evaluate against",
            ],
        },
    ],

    chicago: [
        {
            name: "Removery (Bucktown)",
            href: "/reviews/removery/bucktown",
            body: "Removery's Bucktown location is at 1864 N Damen Ave. Removery is a national tattoo-removal-only chain. The clinic uses Candela PicoWay, a picosecond laser that handles most ink colors. Removery offers a Complete Removal Package model that caps total cost regardless of session count.",
            bestFor: [
                "Users who want package pricing with unlimited sessions",
                "Users planning complete removal",
                "Users who prefer a national-chain experience with consistent protocols",
            ],
            lessIdealFor: [
                "Users seeking an owner-operated studio",
                "Users who specifically want non-laser options",
            ],
        },
        {
            name: "Removery (Lincoln Square)",
            href: "/reviews/removery/lincoln-square",
            body: "Removery's Lincoln Square location is at 4347 N Lincoln Ave. Same chain, same PicoWay laser, same package pricing model as the Bucktown studio. The two locations operate independently for scheduling but share Removery's national protocols.",
            bestFor: [
                "Users in the North Side who prefer Lincoln Square over Bucktown",
                "Users with cosmetic tattoo removal needs, including microblading cases",
            ],
            lessIdealFor: [
                "Users who want a tattoo-removal-only specialist studio rather than a chain location",
            ],
        },
        {
            name: "Kovak Cosmetic Center (South Loop)",
            href: "/reviews/kovak-cosmetic-center",
            body: "Kovak Cosmetic Center is at 850 S Wabash Ave in the South Loop. The clinic is an established med spa offering tattoo removal alongside other aesthetic services. Kovak uses Q-Switch laser technology, which is well-established for black and dark-blue ink.",
            bestFor: [
                "Users in the South Loop or Loop area who prefer a longer-established med spa",
                "Users with straightforward black-ink tattoos",
            ],
            lessIdealFor: [
                "Users with complex color tattoos that benefit from picosecond technology",
            ],
        },
        {
            name: "Enfuse Medical Spa",
            href: "/reviews/enfuse-medical-spa",
            body: "Enfuse Medical Spa is a Chicago med spa that offers tattoo removal alongside other aesthetic services. The clinic uses PicoWay, a picosecond laser system, and handles cosmetic and microblading cases alongside body tattoos.",
            bestFor: [
                "Users who want a med spa experience that handles cosmetic and microblading cases alongside body tattoos",
            ],
            lessIdealFor: [
                "Users who specifically want a tattoo-removal-only specialist focus",
            ],
        },
        {
            name: "inkOUT (Lincoln Park)",
            href: "/reviews/inkout/chicago",
            body: "inkOUT's Chicago location is at 2724 N Lincoln Ave Suite 6 in Lincoln Park. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin rather than shattering it with light. It is the non-laser option currently tracked by RealTattooReviews in Chicago; users should still compare method fit, review depth, and consultation-specific risk against local laser providers.",
            bestFor: [
                "Users who want a non-laser method",
                "Users with cosmetic tattoos like microblading or lip blush",
                "Users with darker skin tones comparing non-laser options against conservative laser protocols",
                "Users comparing non-laser removal for colors that may be difficult for wavelength-based systems",
            ],
            lessIdealFor: [
                "Users with very large tattoos who prefer the per-session speed of laser",
                "Users who want a deep public review history before committing",
            ],
        },
        {
            name: "LaserAway (Lincoln Park, River North, Bucktown)",
            href: "/reviews/laseraway/chicago",
            body: "LaserAway operates three Chicago locations: Lincoln Park (2032 N Halsted St), River North (666 N Wells St), and Bucktown (1953 W Wabansia Ave). LaserAway is a national aesthetic chain where tattoo removal is one service among many. The brand uses the PicoSure laser.",
            bestFor: [
                "Users who already use LaserAway for hair removal or other aesthetic services",
                "Users who want extended evening and weekend hours",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist",
                "Users with complex color or cover-up cases that benefit from a specialist's narrower focus",
            ],
        },
        {
            name: "Advanced Laser Aesthetics (Edgebrook)",
            body: "Advanced Laser Aesthetics is at 5906 N Milwaukee Ave on the city's far Northwest Side. It is a smaller clinic that handles tattoo removal alongside other laser services.",
            bestFor: [
                "Users on the Northwest Side or near Edgebrook who want a closer option than central Chicago specialists",
            ],
            lessIdealFor: [
                "Users with complex multi-color cases, where higher-volume specialists may have more pattern-matched experience",
            ],
        },
    ],

    houston: [
        {
            name: "InkFree, MD Laser Clinic (NW Houston / Cypress)",
            href: "/reviews/inkfree-md",
            body: "InkFree, MD is at 11240 FM 1960 W #401 in NW Houston, on the corridor toward Cypress. The clinic is owner-operated and family-run, with an MD on staff. InkFree, MD treats tattoo removal as a primary service alongside related procedures like skin tag removal, scarring treatment, and microblading or eyebrow embroidery removal. The clinic offers free consultations and same-day starts when scheduling allows.",
            bestFor: [
                "Users in NW Houston, Cypress, Spring, or The Woodlands who want a closer option than central Houston specialists",
                "Users with cosmetic tattoo or microblading removal needs",
                "Users who want an owner-operated clinic with continuity of care",
            ],
            lessIdealFor: [
                "Users in central Houston, the Galleria, or Pearland who would face a longer drive than a closer chain location",
            ],
        },
        {
            name: "inkOUT (Heights)",
            href: "/reviews/inkout/houston",
            body: "inkOUT's Houston location is at 2200 Edwards St Suite 107, near the Heights and convenient to River Oaks, the Galleria, and central Houston. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. It is the non-laser option currently tracked by RealTattooReviews in the Houston metro; users should compare it with laser specialists by skin type, ink color, price quote, and review evidence.",
            bestFor: [
                "Users seeking complete removal rather than fading",
                "Users comparing the pain profile of non-laser treatment against laser",
                "Users who want to discuss scarring risk outside a laser-based protocol",
                "Users with cosmetic tattoos like microblading or lip blush",
                "Users with darker skin tones comparing non-laser options against conservative laser protocols",
            ],
            lessIdealFor: [
                "Users with very large tattoos who prefer the per-session speed of laser",
                "Users who want a deep public review history before committing (the Houston location is newer than the laser providers)",
            ],
        },
        {
            name: "DermSurgery Associates (Bellaire / W Loop)",
            href: "/reviews/dermsurgery-associates",
            body: "DermSurgery Associates is a Houston-area dermatology and laser surgery group. The Bellaire main office is at 6700 W Loop S Suite 500, with additional satellite locations across the metro. The group offers tattoo removal as one service among broader dermatologic care including Mohs surgery, skin cancer treatment, and cosmetic dermatology. Tattoo removal is performed using Q-switched laser technology under physician supervision.",
            bestFor: [
                "Users who want tattoo removal in a full dermatology practice setting",
                "Users who are already DermSurgery patients for other care",
                "Users with elevated medical-history risk who want physician-led treatment",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist focus",
            ],
        },
        {
            name: "Removery (Energy Corridor, Spring Branch, Rice Village)",
            body: "Removery operates three Houston locations: Energy Corridor at 19859 Katy Fwy Suite A, Spring Branch at 9930 Katy Fwy Suite 400, and Rice Village at 2530 Rice Blvd near Rice University. Removery is a national tattoo-removal-only chain that uses Candela PicoWay, a picosecond laser handling most ink colors and skin types. Removery offers a Complete Removal Package model that caps the total cost regardless of session count, with internal payment plans available.",
            bestFor: [
                "Users who want package pricing with unlimited sessions",
                "Users who want to spread cost over a payment plan",
                "Users who prefer a national-chain experience with consistent protocols",
                "Users in the West Houston, Memorial, or Rice Village corridors",
            ],
            lessIdealFor: [
                "Users seeking a smaller, owner-operated studio",
                "Users seeking a non-laser method",
                "Users who are uncomfortable with consultation-only pricing rather than published per-session rates",
            ],
        },
        {
            name: "LaserAway (Galleria, Heights, Pearland)",
            href: "/reviews/laseraway/houston",
            body: "LaserAway operates three Houston locations: Galleria at 5385 Westheimer Rd, Heights at 246 W 19th St, and Pearland at 11200 Broadway St Suite 760. LaserAway is a national aesthetic chain where tattoo removal is one service among many. The brand uses the PicoSure laser, a picosecond system, and emphasizes financing options, package bundles, and seasonal promotional pricing.",
            bestFor: [
                "Users who already use LaserAway for hair removal or other aesthetic services",
                "Users who want extended evening and weekend hours",
                "Users in Pearland or other south-of-Houston suburbs",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist",
                "Users with complex color or cover-up cases that benefit from a specialist's narrower focus",
            ],
        },
    ],

    draper: [
        {
            name: "Rejuvatek Aesthetics providing inkOUT (Draper)",
            href: "/reviews/inkout/draper",
            body: "This is the Draper location for inkOUT, the non-laser tattoo removal brand operated by Rejuvatek Medical. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. Because TEPR is not light-based, its risk profile differs from wavelength-based laser systems; scarring, pigment change, healing, and aftercare still need case-specific assessment. This is the only non-laser tattoo removal option currently tracked by RealTattooReviews in the Draper and south Salt Lake Valley area, not necessarily the only option available in the market.",
            bestFor: [
                "Users seeking complete removal rather than fading",
                "Users who want a non-laser method",
                "Users with cosmetic tattoos like microblading, powder brows, or lip blush",
                "Users with darker skin tones comparing non-laser options against conservative laser protocols",
                "Users whose tattoo contains colors that may be difficult for wavelength-based systems",
            ],
            lessIdealFor: [
                "Users with very large tattoos who prefer the per-session speed of laser",
                "Users who want a multi-service med spa experience alongside their removal",
            ],
        },
        {
            name: "Clarity Skin (Draper)",
            href: "/reviews/clarity-skin",
            body: "Clarity Skin is a full-service medical spa in Draper owned and led by four board-certified plastic surgeons. The practice offers tattoo removal alongside cosmetic injectables, laser hair removal, body contouring, facials, and other aesthetic services, with an on-site surgery center. Tattoo removal is performed using Candela PicoWay, a picosecond laser with multiple wavelengths (1064 nm, 532 nm, 785 nm) that handles most ink colors and skin types. Clarity Skin has a large overall review base, though many reviews cover services other than tattoo removal. Treatments are delivered by licensed laser technicians under physician oversight.",
            bestFor: [
                "Users who want tattoo removal in a physician-led, full-service medical setting",
                "Users who already visit Clarity Skin for other services and want to add removal at the same provider",
                "Users with straightforward black or dark-blue tattoos that respond well to picosecond laser",
                "Users who want access to a broader aesthetic service menu at the same practice",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist where the procedure is the clinic's primary focus",
                "Users who specifically want a non-laser option",
            ],
        },
    ],

    tampa: [
        {
            name: "Arviv Medical Aesthetics (Westchase / NW Tampa)",
            href: "/reviews/arviv-medical-aesthetics",
            body: "Arviv Medical Aesthetics is at 11329 Countryway Blvd in the Westchase area of NW Tampa. The clinic is a medical aesthetics practice led by Dr. Yael Arviv that handles tattoo removal alongside CoolSculpting, hair removal, microneedling, injectables, and other dermatologic procedures. Arviv uses Candela PicoWay, a picosecond laser that handles most ink colors, and offers free consultations.",
            bestFor: [
                "Users in NW Tampa, Westchase, or the bay's western edge who want a medical practice with deep aesthetics service depth",
                "Users with cosmetic or eyebrow-area tattoo removal cases",
                "Users who prefer a long-tenured Tampa practice",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist where the procedure is a primary service rather than one offering among many",
            ],
        },
        {
            name: "Erasable Med Spa (West Tampa / Armenia)",
            href: "/reviews/erasable-med-spa",
            body: "Erasable Med Spa is at 4103 N Armenia Ave in West Tampa, near the West Tampa neighborhood and accessible to South Tampa, Hyde Park, and Westshore. The clinic offers tattoo removal alongside MOXI laser, scar treatment, HydraFacial, Botox, and other med spa services. Erasable uses Candela PicoWay, a picosecond laser that handles most ink colors and skin types. The clinic emphasizes patient comfort and runs a Teal program with discounts and savings.",
            bestFor: [
                "Users in central or West Tampa who want a comfortable med spa setting",
                "Users with sensitive skin or eczema who want a methodical consultation",
                "Users with cosmetic tattoo or microblading removal needs",
            ],
            lessIdealFor: [
                "Users seeking a tattoo-removal-only specialist focus",
                "Users in St. Petersburg or Clearwater who would face a longer drive than a closer option",
            ],
        },
        {
            name: "inkOUT (Tampa Bay Metro)",
            href: "/reviews/inkout/tampa",
            body: "inkOUT serves the Tampa Bay metro as a non-laser TEPR brand. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. It is the non-laser option currently tracked by RealTattooReviews in the Tampa Bay area; users should compare consultation quotes, healing expectations, and review evidence against local laser providers.",
            bestFor: [
                "Users seeking complete removal rather than fading",
                "Users comparing the pain profile of non-laser treatment against laser",
                "Users who want to discuss scarring risk outside a laser-based protocol",
                "Users with cosmetic tattoos like microblading or lip blush",
                "Users with darker skin tones comparing non-laser options against conservative laser protocols",
                "Users comparing non-laser removal for colors that may be difficult for wavelength-based systems",
            ],
            lessIdealFor: [
                "Users with very large tattoos who prefer the per-session speed of laser",
                "Users who want a long-established public review history at a fixed Tampa Bay address",
            ],
        },
        {
            name: "ReversaTatt Tattoo Removal (South Tampa / Henderson Blvd)",
            href: "/reviews/reversatatt",
            body: "ReversaTatt is a tattoo-removal-only specialist at 3202 Henderson Blvd Suite 100A in South Tampa, near Hyde Park and Westshore. The clinic emphasizes upfront, realistic timeline expectations and a quick session model. ReversaTatt offers free consultations and per-session pricing.",
            bestFor: [
                "Users in South Tampa, Hyde Park, or downtown Tampa who want a tattoo-removal-only specialist",
                "Users who want quick session scheduling and short appointment times",
            ],
            lessIdealFor: [
                "Users in St. Petersburg or Clearwater who would face a cross-bay drive",
                "Users who want a med spa with multiple service options",
            ],
        },
        {
            name: "Removery (Westshore)",
            href: "/reviews/removery/westshore",
            body: "Removery's Westshore Tampa location is at 130 S Westshore Blvd Suite 2B. Removery is a national tattoo-removal-only chain that uses Candela PicoWay, a picosecond laser handling most ink colors and skin types. Removery offers a Complete Removal Package model that caps the total cost regardless of session count, with internal payment plans available.",
            bestFor: [
                "Users who want package pricing with unlimited sessions",
                "Users planning to relocate or travel during their removal series",
                "Users who prefer a national-chain experience with consistent protocols",
                "Users in Westshore, downtown Tampa, or the airport corridor",
            ],
            lessIdealFor: [
                "Users seeking a smaller, owner-operated studio",
                "Users who specifically want non-laser options",
            ],
        },
        {
            name: "Tampa Bay Tattoo Removal (Clearwater)",
            body: "Tampa Bay Tattoo Removal is at 2561 Nursery Rd Suite C in Clearwater. The clinic is owner-operated by a husband-wife team and serves the Pinellas County side of the metro. The clinic emphasizes upfront pricing and consultations that set realistic session-count expectations.",
            bestFor: [
                "Users in Clearwater, Largo, Pinellas Park, or western Pinellas County",
                "Users who prefer an owner-operated specialist with continuity across the treatment series",
                "Users who want fair pricing without a chain markup",
            ],
            lessIdealFor: [
                "Users on the Tampa side of the bay, where multiple closer options exist",
            ],
        },
        {
            name: "St Pete Tattoo Removal (Pinellas Park)",
            body: "St Pete Tattoo Removal is at 8130 66th St N Suite 9 in Pinellas Park, between St. Petersburg and Clearwater. The clinic is owner-operated and known for cosmetic tattoo work, including powder brows and microblading removal. The clinic emphasizes patient education and honest pre-treatment expectations.",
            bestFor: [
                "Users in St. Petersburg, Pinellas Park, or central Pinellas County",
                "Users with cosmetic tattoo cases like powder brows, microblading, or lip blush",
                "Users who want an honest, non-pushy consultation",
            ],
            lessIdealFor: [
                "Users on the Tampa side of the bay seeking a closer central-Tampa option",
            ],
        },
        {
            name: "EradiTatt Tattoo Removal of St. Petersburg",
            href: "/reviews/eraditatt",
            body: "EradiTatt is at 9210 4th St N Suite A in St. Petersburg. The clinic is a tattoo-removal-only specialist with newer market presence in St. Pete proper.",
            bestFor: [
                "Users in St. Petersburg or northern Pinellas who want a tattoo-removal-only specialist closer to home than the Tampa-side providers",
            ],
            lessIdealFor: [
                "Users seeking the largest sample size of public reviews to evaluate against, since the location has a smaller lifetime review base than longer-established metro providers",
            ],
        },
    ],
}

export function getCityProfiles(city: string): CityProviderProfile[] {
    return PROFILES[city.toLowerCase()] ?? []
}
