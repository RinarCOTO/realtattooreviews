/**
 * seed-pages.ts
 * Seeds all static guide and category pages into Sanity CMS.
 *
 * Run from the project root:
 *   npx tsx --env-file=.env.local scripts/seed-pages.ts
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_WRITE_TOKEN=...  (create a write token in sanity.io/manage)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── PortableText helpers ────────────────────────────────────────────────────

let keyCounter = 0
function key() { return `k${++keyCounter}` }

function para(text: string) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

function h3(text: string) {
  return {
    _type: 'block',
    _key: key(),
    style: 'h3',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

function bullet(text: string) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

function paras(...texts: string[]) { return texts.map(para) }
function bullets(...items: string[]) { return items.map(bullet) }
function section(heading: string, ...body: ReturnType<typeof para | typeof bullet | typeof h3>[]) {
  return { _key: key(), heading, body }
}

// ─── Upsert helper ───────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsert(id: string, doc: any) {
  await client.createOrReplace({ _id: id, ...doc })
  console.log(`✓  ${id}`)
}

// ─── GUIDES ──────────────────────────────────────────────────────────────────

const guides = [
  {
    _id: 'guide-saline-tattoo-removal',
    _type: 'guide',
    title: 'Saline Tattoo Removal',
    slug: { _type: 'slug', current: 'saline-tattoo-removal' },
    description: 'How saline solution tattoo removal works, which cases it handles best, what it costs, and what to expect across the healing process.',
    seoTitle: 'Saline Tattoo Removal: How It Works, Safety, Cost & Results | RealTattooReviews',
    seoDescription: 'How saline tattoo removal works, whether it is safe, what it costs, and which cases it handles best. Covers microblading, PMU, Li-FT, A+Ocean, Rejuvi, and Botched Ink.',
    intro: 'Saline tattoo removal is a non-laser method that uses a salt-based solution to lift tattoo pigment out of the skin. A trained technician implants a high-concentration saline solution into the tattooed area using a tattoo machine or manual tool. The solution creates an osmotic gradient. Water and pigment are drawn upward from the dermis through the epidermis. The area forms a controlled scab. When the scab falls off naturally, lifted pigment comes with it.\n\nSaline removal is most commonly used on cosmetic tattoos: microblading, powder brows, lip liner, eyeliner, and other permanent makeup (PMU). It is also used on small body tattoos, typically two square inches or less. Products like Li-FT, A+Ocean, Rejuvi, and Botched Ink have established themselves as the most widely used professional saline removal brands.',
    faqItems: [
      { _key: key(), question: 'What is saline tattoo removal?', answer: 'Saline tattoo removal is a non-laser method that uses a high-concentration salt solution to lift tattoo pigment out of the skin through osmosis. A trained technician implants the solution into the tattooed area using a tattoo machine or manual tool. The treated area forms a scab that carries lifted pigment out of the skin when it sheds naturally. The method is most commonly used for cosmetic tattoos like microblading, powder brows, lip liner, and eyeliner.' },
      { _key: key(), question: 'Is saline tattoo removal safe?', answer: 'Yes, when performed by a trained technician using a professional-grade solution such as Li-FT, A+Ocean, Rejuvi, or Botched Ink. The main risks are scarring from overworking the skin and infection from improper aftercare. Both are manageable with proper technique and post-treatment care. It is not recommended for users who are pregnant, breastfeeding, on blood thinners or immunosuppressants, or who have active skin infections or a history of keloid scarring.' },
      { _key: key(), question: 'Does saline tattoo removal work?', answer: 'Yes. Saline removal is effective at lightening and removing cosmetic tattoos and small body tattoos. It works best on shallower pigment such as microblading and PMU. Results are progressive across sessions. Limitations include large body tattoos and very deep or multi-layered ink where internal fragmentation is more efficient.' },
      { _key: key(), question: 'How does saline tattoo removal work?', answer: 'The technician implants a hypertonic saline solution into the tattooed skin. The solution has a higher salt concentration than the surrounding tissue, which creates an osmotic pressure gradient. Water is drawn from dermal cells upward toward the more concentrated solution, and pigment particles travel with it. A scab forms and contains the lifted pigment. When the scab sheds naturally, pigment comes with it.' },
      { _key: key(), question: 'Does saline tattoo removal hurt?', answer: 'Most clients describe the sensation as similar to getting a tattoo. A tattoo machine or manual tool implants the solution into the skin, producing a similar feeling to the original application. Most practitioners apply topical numbing cream before the session. Clients generally report saline as less painful than laser.' },
      { _key: key(), question: 'How long does saline tattoo removal take?', answer: 'Most cosmetic tattoo cases take 2 to 6 sessions. Heavily saturated or older work may need up to 10. Sessions are spaced 6 to 8 weeks apart to allow full healing between treatments. A 3-session microblading removal typically spans 4 to 5 months from first session to completion.' },
      { _key: key(), question: 'How much does saline tattoo removal cost?', answer: 'Per-session pricing typically runs $100 to $350, with most sessions falling in the $150 to $250 range. Total cost for microblading removal generally runs $300 to $1,200 depending on the number of sessions needed. Lip liner and eyeliner removal typically runs $300 to $1,400 total.' },
      { _key: key(), question: 'What is saline tattoo removal healing time?', answer: 'The scab typically forms within 24 to 72 hours and sheds naturally within 7 to 14 days. Full healing between sessions takes 6 to 8 weeks. During the scab phase, the area should be kept dry and the scab must not be picked, peeled, or pulled.' },
      { _key: key(), question: 'Is saline better than laser for microblading removal?', answer: 'For microblading and other cosmetic tattoos containing iron-oxide or titanium-dioxide pigments, saline is generally the lower-risk starting point. Laser can cause paradoxical darkening of iron-oxide pigments, turning them gray or black. Saline avoids this risk entirely because it does not use light energy.' },
      { _key: key(), question: 'Can you do saline tattoo removal at home?', answer: 'No. DIY saline tattoo removal using household salt or non-professional solutions is not safe and is not effective. Professional saline solutions are formulated specifically for dermal implantation. Applying salt or saline to the skin surface has no removal effect. Always see a trained, certified technician.' },
    ],
    sections: [
      section('How the Saline Removal Process Works',
        ...paras(
          'The process follows a predictable sequence. A trained technician assesses your tattoo during consultation, evaluating pigment depth, saturation, color, skin type, and the age of the work. A topical anesthetic is then applied for 15 to 30 minutes.',
          'The technician uses a tattoo machine or manual tool to implant the hypertonic saline solution into the tattooed skin. Osmosis draws water from the dermal cells upward toward the more concentrated solution. Pigment particles travel with the water, moving from the dermis through the epidermis.',
          'Over the next 24 to 72 hours, the treated area forms a controlled scab containing lifted pigment. The scab appearing dark is expected and is a sign the process is working. The scab falls off naturally within 7 to 14 days. Do not pick, peel, or pull the scab. Full healing between sessions takes 6 to 8 weeks. Most cases require 2 to 6 sessions for cosmetic tattoos.',
        ),
      ),
      section('Is Saline Tattoo Removal Safe?',
        ...paras(
          'Saline tattoo removal is considered safe when performed by a trained technician using a professional-grade solution. The saline solutions used in professional removal (Li-FT, A+Ocean, Rejuvi, Botched Ink) are formulated with purified water, salt, and natural additives. They are designed specifically for dermal implantation at safe concentrations.',
          'Saline tattoo removal is not recommended for users who are pregnant or breastfeeding, have active skin infections in or near the treatment area, are on blood thinners or immunosuppressant medications, have a history of keloid scarring, or have uncontrolled diabetes.',
          'The biggest safety variable is the technician. Always verify training certification, ask to see documented before-and-after results, and confirm the brand of solution being used.',
        ),
      ),
      section('Common Side Effects and Risks',
        ...paras(
          'Expected reactions include redness and swelling in the first 24 to 48 hours, dark scab formation (expected and desired), mild tenderness during healing, and temporary hyperpigmentation or hypopigmentation that typically resolves.',
          'Less common but avoidable risks include scarring from overworking the skin or picking scabs, infection from poor aftercare or unclean tools, incomplete removal from sessions spaced too close together, and allergic reaction to the saline solution (rare).',
        ),
      ),
      section('Saline Tattoo Removal Scarring: What to Know',
        ...paras(
          'Scarring risk is low with proper technique and aftercare. Most scarring from saline removal is practitioner-caused or client-caused, not method-caused.',
          'Causes of scarring: overworking the skin during the session (too many passes, going too deep), picking or peeling the scab before it falls off naturally, and booking sessions too close together before the skin has fully healed.',
          'Saline removal does not use heat or light energy. Thermal scarring (the risk category associated with aggressive laser settings) is not a saline removal risk. This is one structural advantage saline has over laser modalities for skin-sensitive users.',
        ),
      ),
      section('Saline Removal for Microblading and Cosmetic Tattoos',
        ...paras(
          'Saline removal for microblading is the most common use case. Most PMU pigments contain iron oxides. Under laser energy, iron oxide can oxidize and darken, a phenomenon called paradoxical darkening. The treated area turns gray or black instead of fading. Saline does not use light, so no oxidation occurs. Iron oxide pigment lifts out intact through osmosis.',
          'Many PMU pigments also contain titanium dioxide as a white base or brightening agent. Laser energy can cause titanium dioxide to turn dark on contact. Saline avoids this entirely. Titanium dioxide lifts out along with other pigment particles through the osmotic mechanism.',
          'Cosmetic tattoos are generally implanted at a shallower depth than body tattoos. Saline\'s osmotic lift is most effective on shallower pigment. Saline eyebrow tattoo removal works across all brow styles: microblading strokes, powder brows, combination brows, and older faded brow tattoos. Most eyebrow cases complete in 2 to 4 sessions.',
        ),
      ),
      section('Saline Tattoo Removal Cost',
        ...paras(
          'Saline tattoo removal is generally cheaper per session than laser, and cheaper in total for most cosmetic tattoo cases because fewer sessions are needed.',
          'Per session (typical): $100 to $350 (most fall in the $150 to $250 range). Microblading removal total: $300 to $1,200. Lip liner removal total: $300 to $1,000. Eyeliner removal total: $400 to $1,400. Small body tattoo total: $450 to $1,800.',
          'Pricing varies by provider, location, and tattoo size. Most saline practitioners offer free consultations where session-count estimates and total cost quotes are provided.',
        ),
      ),
      section('Saline Tattoo Removal Aftercare and Healing',
        ...paras(
          'Aftercare directly affects both the result of each session and the risk of scarring. The scab is the vehicle for pigment removal. Protecting it is the most important aftercare task.',
          'In the first 24 to 48 hours: keep the area clean and dry. Do not apply makeup, sunscreen, or skincare products to the treated area. Avoid touching or rubbing the area.',
          'During the scab phase (days 3 to 14): do not pick, peel, or pull the scab. Apply only the aftercare product recommended by your technician. Avoid sun exposure, swimming, saunas, and sweating. Keep the area dry where possible.',
          'Post-scab (weeks 3 to 8): moisturize gently once the skin has fully closed. Continue to avoid direct sun exposure on the treated area. Wait the full 6 to 8 weeks before your next session.',
          'A 3-session microblading removal, spaced 6 to 8 weeks apart, takes roughly 4 to 5 months from first session to completion.',
        ),
      ),
      section('Does Saline Tattoo Removal Work?',
        ...paras(
          'Yes. Saline tattoo removal is an effective, established method with documented results. It is not a fringe technique. Products like Li-FT (Li Pigments), A+Ocean, Botched Ink, and Rejuvi are used by trained PMU professionals worldwide.',
          'It works well on microblading and powder brow removal, lip liner, lip blush, and full lip color, eyeliner tattoo removal, small body tattoos (roughly 2 sq in or less), and cases where prior laser treatment caused paradoxical darkening.',
          'Limitations include large body tattoos (saline covers a small area per session), deep or multi-layered ink where internal fragmentation is more efficient, and cases where speed of coverage across a large surface area is the priority.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/comparisons/saline-vs-laser-tattoo-removal', title: 'Saline vs Laser Tattoo Removal', desc: 'Full head-to-head comparison across PMU, microblading, dark skin, scarring risk, and cost.' },
      { _key: key(), href: '/categories/microblading-removal', title: 'Microblading Removal', desc: 'Category page covering microblading and PMU removal options, provider fit, and session expectations.' },
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring', desc: 'Scarring risk by method, skin type, and provider, and what to do if scarring occurs.' },
      { _key: key(), href: '/cost', title: 'Tattoo Removal Cost', desc: 'National pricing breakdown by method, size, and provider type.' },
    ],
  },

  {
    _id: 'guide-tattoo-removal-aftercare',
    _type: 'guide',
    title: 'Tattoo Removal Aftercare',
    slug: { _type: 'slug', current: 'tattoo-removal-aftercare' },
    description: 'A practical aftercare guide for laser and saline tattoo removal. Covers first 24 hours, Saniderm removal, blistering, products, and warning signs.',
    seoTitle: 'Tattoo Removal Aftercare: Step-by-Step Post-Treatment Care Guide | RealTattooReviews',
    seoDescription: 'A practical aftercare guide for laser and saline tattoo removal. Covers first 24 hours, Saniderm removal, blistering, products, and warning signs.',
    intro: 'Good tattoo removal aftercare protects your results and reduces the risk of scarring, infection, and delayed healing. What you do in the hours and days after a session matters as much as the treatment itself.\n\nThis guide covers post tattoo removal care step by step. It includes laser tattoo removal aftercare and saline tattoo removal aftercare in separate sections, because the two methods heal differently. Always follow your provider\'s specific instructions first. This guide covers general consensus across dermatology and tattoo removal practice.',
    faqItems: [
      { _key: key(), question: 'When should you remove Saniderm after tattoo removal?', answer: 'Remove Saniderm 24 to 48 hours after application, or up to 72 hours if your provider specified. Remove earlier if you see excessive fluid pooling. Peel slowly and flat against the skin. Warm water loosens the adhesive.' },
      { _key: key(), question: 'How long does tattoo removal take to heal?', answer: 'Surface healing (closed skin, no scabs) takes two to three weeks. Full healing between sessions takes six to eight weeks. The deeper skin layers need the full recovery window before the next session.' },
      { _key: key(), question: 'Is blistering normal after tattoo removal?', answer: 'Yes. Blistering is one of the most common reactions after laser tattoo removal. Blisters can appear within hours or up to 48 hours. Do not pop them. They protect the healing skin underneath and typically resolve within one to two weeks.' },
      { _key: key(), question: 'What cream should you use after tattoo removal?', answer: 'Aquaphor Healing Ointment is the most widely recommended aftercare product. Fragrance-free moisturizers like CeraVe, Eucerin, or Vanicream also work well. Apply a thin layer. Avoid Neosporin, hydrogen peroxide, and anything fragranced.' },
      { _key: key(), question: 'When can you shower after tattoo removal?', answer: 'You can shower after removing the initial bandage or Saniderm. Keep the treated area out of direct high-pressure water. Do not soak in baths, pools, or hot tubs until the skin is fully closed.' },
      { _key: key(), question: 'When can you exercise after tattoo removal?', answer: 'Avoid heavy exercise for 24 to 48 hours after treatment. Sweat and friction irritate freshly treated skin. Light activity is fine after the first day. Resume normal exercise once the area is no longer tender or actively healing.' },
    ],
    sections: [
      section('What to Do in the First 24 Hours After Tattoo Removal',
        ...paras(
          'The first 24 hours are the highest-risk window for contamination and unnecessary irritation. Leave the bandage or dressing on for the time your provider specified. This is usually two to four hours for a standard bandage, or up to 24 hours if your provider applied Saniderm or Tegaderm.',
          'After removing the bandage, clean the area gently with lukewarm water and a mild, fragrance-free soap. Pat dry with a clean paper towel. Do not rub.',
          'Apply a thin layer of the aftercare product your provider recommended. Aquaphor Healing Ointment is the most commonly recommended option. Apply a thin layer, not a thick coat. The skin needs to breathe.',
          'Use ice packs wrapped in a clean cloth for 10 to 15 minutes at a time to reduce swelling. Do not apply ice directly to the skin. Wear loose clothing over the treated area. Avoid anything that creates friction or traps heat against the skin.',
        ),
      ),
      section('Laser Tattoo Removal Aftercare',
        ...paras(
          'Laser tattoo removal aftercare follows the general steps above with a few laser-specific additions.',
          'Blistering is common after laser sessions. Blisters can appear within hours or up to 48 hours after treatment. Do not pop or pick blisters. They are part of the healing process. Popping them introduces bacteria and increases scarring risk.',
          'Frosting is a white, chalky appearance on the treated skin that happens immediately after a laser session. It fades within 10 to 30 minutes and requires no action.',
          'Scabs will form as blisters dry and the skin begins to repair. Do not pick scabs. Let them fall off naturally over 7 to 14 days.',
          'Once the area has healed enough that the skin is intact, apply SPF 30 or higher sunscreen before sun exposure. UV exposure on healing skin increases hyperpigmentation risk. Between sessions, keep the area moisturized and protected. Wait the full six to eight weeks before the next session.',
        ),
      ),
      section('Saline Tattoo Removal Aftercare',
        ...paras(
          'Aftercare instructions for saline tattoo removal differ from laser, especially in the scab phase.',
          'Dry healing is recommended for the first three to five days by most saline removal technicians. This means keeping the area dry and avoiding ointments or moisturizers during the initial scab formation. The scab that forms contains the lifted pigment. Keeping it dry allows the scab to form properly and lift the maximum amount of ink.',
          'The scab will be darker than a typical wound scab because it contains tattoo pigment. This is normal and expected. Do not pick the scab. The scab is carrying pigment out. Removing it prematurely reduces the amount of ink lifted and increases scarring risk.',
          'For aftercare on eyebrow tattoo removal and other cosmetic tattoo cases treated with saline, avoid applying makeup, brow products, tinted sunscreen, or any product directly on the scab until it has shed completely. This typically takes 7 to 14 days.',
          'After the scab sheds, you can resume gentle moisturizing with Aquaphor or a fragrance-free lotion. Wait six to eight weeks between saline sessions.',
        ),
      ),
      section('When to Remove Saniderm After Tattoo Removal',
        ...paras(
          'Saniderm (or Tegaderm, or similar transparent adhesive bandages sometimes called "second skin") is applied by some providers immediately after treatment. It creates a sealed healing environment.',
          'General guidance is to remove Saniderm 24 to 48 hours after application. Some providers recommend up to 72 hours. Follow your provider\'s specific instruction.',
          'Remove Saniderm earlier if you see excessive fluid pooling underneath. A small amount of fluid is normal. A large pocket of dark or cloudy fluid suggests the seal should be broken sooner.',
          'Peel Saniderm slowly and flat against the skin. Do not rip it off at a sharp angle. Running warm water over the edge loosens the adhesive. After removal, clean gently with lukewarm water and mild soap. Pat dry. Apply a thin layer of Aquaphor or your provider\'s recommended aftercare product.',
        ),
      ),
      section('What to Avoid After Tattoo Removal',
        ...paras(
          'These apply to both laser and saline methods unless otherwise noted.',
          'Do not pick blisters or scabs. This is the number one aftercare mistake and the most common avoidable cause of scarring.',
          'Avoid direct sun exposure on the treated area for at least two weeks. After that, apply SPF 30+ sunscreen whenever the area will be exposed.',
          'Do not soak the treated area. Avoid swimming pools, hot tubs, baths, saunas, and steam rooms until the skin is fully closed.',
          'Avoid heavy exercise for 24 to 48 hours after treatment. Do not apply makeup, fragranced lotions, perfume, or scented products to the treated area during healing.',
          'Avoid hydrogen peroxide, rubbing alcohol, and Neosporin on the treatment site. Stick with Aquaphor or the fragrance-free moisturizer your provider recommended.',
        ),
      ),
      section('Warning Signs: When to Call Your Provider',
        ...paras(
          'Contact your provider or a doctor if you notice any of the following after treatment.',
          'Increasing pain after 48 hours. Yellow or green discharge from the treated area. Red streaks spreading outward from the treated area. Fever or chills within 48 hours of treatment. Excessive swelling that worsens after 48 hours. Blisters that continue growing after 72 hours rather than stabilizing. Allergic reaction to aftercare products (spreading rash, intense itching, hives beyond the treated area).',
          'Do not wait on infection signs. Early treatment with antibiotics resolves most infections quickly. Delayed treatment allows scarring and complications.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/tattoo-removal-healing-process', title: 'Tattoo Removal Healing Process', desc: 'Stage-by-stage breakdown of what happens after each session, from frosting to full recovery.' },
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring', desc: 'Scarring risk by method and skin type, normal vs scar healing, and treatment options.' },
      { _key: key(), href: '/guides/tattoo-removal-side-effects', title: 'Tattoo Removal Side Effects', desc: 'Common and uncommon reactions: blistering, pigment changes, and when something is not normal.' },
      { _key: key(), href: '/guides/saline-tattoo-removal', title: 'Saline Tattoo Removal', desc: 'How saline removal works, healing differences from laser, and what to expect.' },
    ],
  },

  {
    _id: 'guide-tattoo-removal-healing-process',
    _type: 'guide',
    title: 'Tattoo Removal Healing Process',
    slug: { _type: 'slug', current: 'tattoo-removal-healing-process' },
    description: 'Stage-by-stage breakdown of what happens to your skin after each session, from frosting and blistering through full recovery, and how to tell normal healing from warning signs.',
    seoTitle: 'Tattoo Removal Healing Process (2026): Stages, Timeline, and What to Expect | RealTattooReviews',
    seoDescription: 'What does tattoo removal healing look like? Stage-by-stage timeline from frosting to full recovery, normal vs abnormal signs, and how long each phase lasts.',
    intro: 'Tattoo removal healing is a staged process. The skin moves through a predictable sequence of reactions after each treatment session: an immediate reaction (frosting, redness, swelling), a wound-healing phase (blistering, scabbing, crusting), and a recovery phase (peeling, fading, skin normalization). The full cycle from one session to readiness for the next takes 6 to 8 weeks.\n\nThe healing process is driven by the body\'s immune response. Laser energy shatters ink particles. Macrophages (immune cells) then clear the fragmented ink through the lymphatic system over weeks. The visible healing on the skin surface is the wound-repair layer of this process. The invisible ink clearance continues underneath even after the skin looks healed.',
    faqItems: [
      { _key: key(), question: 'How long does tattoo removal take to heal?', answer: 'Full healing per session takes 6 to 8 weeks. Visible healing (frosting through scab shedding) completes within 2 to 3 weeks. Deeper recovery continues through week 6 to 8.' },
      { _key: key(), question: 'How does tattoo removal heal?', answer: 'The body heals in stages: frosting (minutes), redness and swelling (hours to days), blistering (days 1 to 7), scabbing (days 5 to 14), peeling and recovery (weeks 2 to 8). Underneath, macrophages clear fragmented ink through the lymphatic system.' },
      { _key: key(), question: 'Does skin heal after tattoo removal?', answer: 'Yes. Skin heals after tattoo removal. Most people\'s skin returns to near-normal appearance after completed treatment. Slight textural or pigment differences are possible but usually subtle.' },
      { _key: key(), question: 'What does a healed tattoo removal look like?', answer: 'Fully healed skin after complete removal typically looks close to normal. Slight textural smoothness or mild pigment variation may be visible in certain lighting.' },
      { _key: key(), question: 'How long for blisters to heal after tattoo removal?', answer: 'Blisters typically form within 72 hours and dry within 7 days. Do not pop them. Let them heal naturally.' },
      { _key: key(), question: 'How to heal faster after laser tattoo removal?', answer: 'Follow aftercare instructions exactly. Keep the area clean and dry. Avoid sun exposure. Do not pick blisters or scabs. Stay hydrated and eat well. Do not rush the healing interval.' },
    ],
    sections: [
      section('Tattoo Removal Healing Stages',
        ...paras(
          'Each stage has a normal duration and a set of expected reactions.',
          'Stage 1: Frosting and Immediate Reaction (minutes 0 to 60). Immediately after laser treatment, the treated skin turns white or grayish. This is caused by gas bubbles released when the laser interacts with ink particles. Frosting is temporary and typically fades within 10 to 30 minutes.',
          'Stage 2: Redness, Swelling, and Inflammation (hours 1 to 48). Redness and swelling begin within the first hour and typically peak within 24 hours. The treated area will look red, feel warm, and may be mildly swollen. This is a standard inflammatory response.',
          'Stage 3: Blistering (days 1 to 7). Blisters form when fluid collects between skin layers in response to treatment energy. They may appear as small, clear or blood-tinged bubbles. Do not pop blisters. Let them heal naturally.',
          'Stage 4: Scabbing and Crusting (days 5 to 14). The treated area forms a crust or scab over the healing skin. Scabs may appear dark because they contain residual ink lifted toward the surface. Do not pick scabs.',
          'Stage 5: Peeling and Skin Recovery (weeks 2 to 8). After scabs shed, the underlying skin may appear pink, dry, or slightly textured. The skin continues to heal and normalize over the following weeks.',
        ),
      ),
      section('How Long Does Tattoo Removal Take to Heal?',
        ...paras(
          'Tattoo removal healing time per session is typically 6 to 8 weeks for full skin recovery. The visible healing stages (frosting through peeling) complete within 2 to 3 weeks. The deeper recovery continues for the remaining weeks.',
          'Timeline summary: Frosting fades within 30 minutes. Redness and swelling peak at 24 hours and resolve within 48 hours. Blistering forms within 72 hours and dries within 7 days. Scabbing forms by day 5 and sheds by day 14. Peeling and recovery spans weeks 2 through 4. Full recovery (next session readiness): 6 to 8 weeks.',
          'Healing time varies by method, skin type, tattoo location, and individual biology. Picosecond laser healing is typically faster than Q-switched because of lower thermal damage. Areas with more blood flow (upper arms, chest) tend to heal faster. Areas with less blood flow (ankles, fingers, feet) heal slower.',
        ),
      ),
      section('What Does Healed Tattoo Removal Look Like?',
        ...paras(
          'After one session: the tattoo will look lighter. Some areas may have faded more than others. The treated skin may have mild residual pinkness or slight texture difference.',
          'After multiple sessions: cumulative fading becomes clearly visible. Dark inks fade fastest. Color inks may take longer depending on the laser wavelengths used.',
          'After completed treatment: fully healed skin after complete tattoo removal often looks close to normal. Some users report slight textural difference in the treated area. Mild pigment variation may be visible in certain lighting.',
        ),
      ),
      section('When Healing Is Not Normal',
        ...paras(
          'Most tattoo removal healing follows the stages above without complications. Knowing the warning signs lets you act early.',
          'Warning signs: infection signs (increasing pain after 48 hours, yellow or green discharge, warmth spreading beyond the treatment area, red streaks, fever) require immediate attention. Excessive blistering: blisters continuing to grow beyond 72 hours or covering a much larger area than the treated tattoo.',
          'Scarring signs: raised, firm tissue persisting beyond 8 to 12 weeks. Prolonged pigment changes: hyperpigmentation or hypopigmentation that has not begun to improve after 3 to 6 months.',
          'Contact your tattoo removal provider first. They can assess whether the reaction is within expected range or needs medical attention. If you suspect infection, do not wait. Seek medical care promptly.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring', desc: 'Scarring risk by method and skin type, normal vs scar healing, and treatment options.' },
      { _key: key(), href: '/guides/tattoo-removal-aftercare', title: 'Tattoo Removal Aftercare', desc: 'Session-by-session aftercare instructions for laser and non-laser methods.' },
      { _key: key(), href: '/guides/saline-tattoo-removal', title: 'Saline Tattoo Removal', desc: 'How saline removal works, healing differences from laser, and what to expect.' },
      { _key: key(), href: '/comparisons/saline-vs-laser-tattoo-removal', title: 'Saline vs Laser Tattoo Removal', desc: 'Full head-to-head comparison across healing, scarring risk, cost, and use cases.' },
    ],
  },

  {
    _id: 'guide-tattoo-removal-scarring',
    _type: 'guide',
    title: 'Tattoo Removal Scarring',
    slug: { _type: 'slug', current: 'tattoo-removal-scarring' },
    description: 'Whether tattoo removal leaves scars, what causes them, how to tell normal healing from scar formation, and what to do if scarring occurs.',
    seoTitle: 'Tattoo Removal Scarring (2026): Does It Scar, What Causes It, How to Prevent It | RealTattooReviews',
    seoDescription: 'Does tattoo removal leave scars? What causes scarring, how to tell normal healing from scar formation, prevention steps, and when to see a dermatologist.',
    intro: 'Tattoo removal can leave scars, but it usually does not when performed correctly by an experienced provider with proper aftercare. Scarring is a real risk, not a guaranteed outcome. Most people who complete tattoo removal with an experienced provider and follow aftercare instructions do not develop permanent scars.\n\nNormal healing reactions (redness, blistering, scabbing, temporary pigment changes) are often mistaken for scarring. This guide separates normal healing from actual scarring, explains what causes it, what increases risk, how to prevent it, and what to do if scarring occurs.',
    faqItems: [
      { _key: key(), question: 'Does tattoo removal leave scars?', answer: 'Tattoo removal can leave scars but usually does not when performed by an experienced provider with proper aftercare. Most healing reactions (redness, blistering, pigment changes) are temporary and not scars.' },
      { _key: key(), question: 'Does laser tattoo removal leave scars?', answer: 'Laser tattoo removal carries a scarring risk. Laser tattoo removal scars are most often caused by aggressive settings, overtreatment, or poor aftercare. The risk is lower with picosecond lasers (PicoWay, PicoSure) than with Q-switched lasers at aggressive settings.' },
      { _key: key(), question: 'How do I prevent scarring after tattoo removal?', answer: 'Choose an experienced provider. Follow aftercare instructions exactly. Avoid sun exposure. Wait the full 6 to 8 weeks between sessions. Do not pick blisters or scabs. Start with conservative laser settings.' },
      { _key: key(), question: 'Is blistering normal after tattoo removal?', answer: 'Yes. Blistering is a common and usually normal healing response. Small blisters are expected, especially with Q-switched lasers. Do not pop or pick blisters. Let them heal naturally.' },
      { _key: key(), question: 'Can you treat scars from tattoo removal?', answer: 'Yes. Treatments include silicone sheeting, corticosteroid injections, fractional laser resurfacing, microneedling, pressure therapy, and surgical revision for severe cases. Consult a dermatologist.' },
      { _key: key(), question: 'When should I see a dermatologist?', answer: 'See a dermatologist if the treated area remains raised or textually changed for more than 8 to 12 weeks, if you suspect infection, if a keloid develops, or if pigment changes have not improved after 6 months.' },
    ],
    sections: [
      section('What Causes Tattoo Removal Scarring?',
        ...paras(
          'Tattoo removal scarring results from excessive tissue damage during treatment. The skin responds to damage by producing collagen to repair the wound. When the damage exceeds what the skin can repair normally, excess collagen forms scar tissue.',
          'Excessive thermal energy: Q-switched lasers deliver longer pulses that transfer more heat than picosecond lasers. Aggressive fluence settings on any laser can cause thermal burns. Burns trigger scar formation.',
          'Overtreatment: too many passes in a single session, or sessions spaced too closely together, overwhelm the skin\'s healing capacity. Six to eight weeks between sessions is the standard interval for a reason.',
          'Infection: open blisters or treated skin exposed to bacteria can become infected. Infection delays healing and increases scar risk.',
          'Patient behavior: picking blisters, peeling scabs, or exposing treated skin to sun are the most common patient-side causes of scarring. These are preventable.',
          'Pre-existing scar tissue: if the original tattoo was applied over scar tissue, the skin in that area is already compromised. Tattoo removal in scarred skin carries elevated risk.',
        ),
      ),
      section('Normal Healing vs Scarring: How to Tell the Difference',
        ...paras(
          'Normal healing includes: redness and mild swelling for 24 to 48 hours, frosting (whitening) immediately after treatment, blistering within 24 to 72 hours (common with Q-switched lasers), scabbing as blisters dry, temporary darkening or lightening of skin (resolves within weeks to months), and mild itching during healing.',
          'Signs of actual scarring include: raised, firm tissue that persists beyond 3 months (hypertrophic scarring), thickened, raised tissue extending beyond the original treatment area (keloid scarring), depressed (sunken) skin texture in the treated area (atrophic scarring), and persistent textural change that does not improve with time.',
          'If the treated area remains raised, hard, or textually different from surrounding skin for more than 8 to 12 weeks after the last session, consult your provider or a dermatologist.',
        ),
      ),
      section('Hyperpigmentation and Hypopigmentation After Tattoo Removal',
        ...paras(
          'Tattoo removal hyperpigmentation and hypopigmentation are the most common non-scar side effects. They are pigment responses, not permanent damage in most cases.',
          'Hyperpigmentation: darkening of the skin in the treated area. Occurs when the laser stimulates excess melanin production. More common in darker Fitzpatrick skin types (IV through VI). Usually resolves within 3 to 6 months. Avoiding sun exposure during healing is the single best prevention step.',
          'Hypopigmentation: lightening of the skin in the treated area. Occurs when the laser damages melanocytes. More common after aggressive treatment. Takes longer to resolve than hyperpigmentation, sometimes 6 to 12 months or more. In rare cases it can be permanent.',
          'Both are pigment changes, not texture changes. A scar involves altered collagen structure. Pigment changes involve altered melanin production.',
        ),
      ),
      section('How to Prevent Scarring After Tattoo Removal',
        ...paras(
          'Tattoo removal scar prevention starts before the first session and continues through every healing cycle.',
          'Choose an experienced provider: provider skill is the single biggest variable in scarring risk. Ask about their experience level, the laser platform they use, their protocol for adjusting settings by skin type, and their scarring rate.',
          'Follow aftercare instructions exactly: do not pick blisters or scabs. Keep the treated area clean and dry. Apply only the products your provider recommends. Avoid heavy sweating, swimming, and submerging the area in water during healing.',
          'Avoid sun exposure: keep the treated area out of direct sun between sessions and for at least 4 to 6 weeks after each session.',
          'Wait the full healing interval: six to eight weeks between sessions is the standard. If the skin has not fully healed, postpone the next session.',
          'Start conservative: a good provider starts with lower energy settings and increases gradually based on how your skin responds.',
        ),
      ),
      section('How to Treat Scars After Tattoo Removal',
        ...paras(
          'If scarring does occur, treatment options exist. Consult a dermatologist for any persistent scar.',
          'Silicone-based products: silicone sheeting and silicone gel are first-line treatments for hypertrophic scars. They flatten and soften raised scar tissue over time. Apply consistently for 8 to 12 weeks for best results.',
          'Corticosteroid injections: intralesional corticosteroid injections (typically triamcinolone) can flatten hypertrophic and keloid scars. Administered by a dermatologist. Multiple sessions may be needed.',
          'Fractional laser resurfacing and microneedling can improve scar texture by stimulating controlled collagen remodeling. Surgical revision is a last-resort option for severe keloid scars.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/saline-tattoo-removal', title: 'Saline Tattoo Removal', desc: 'How saline removal works, which cases it handles best, cost, and what to expect during healing.' },
      { _key: key(), href: '/comparisons/saline-vs-laser-tattoo-removal', title: 'Saline vs Laser Tattoo Removal', desc: 'Full head-to-head comparison across PMU, microblading, dark skin, scarring risk, and cost.' },
      { _key: key(), href: '/guides/tattoo-removal-aftercare', title: 'Tattoo Removal Aftercare', desc: 'Session-by-session aftercare instructions for laser and non-laser methods.' },
      { _key: key(), href: '/comparisons/best-tattoo-removal-method', title: 'Best Tattoo Removal Method', desc: 'Which method fits your case: laser, saline, or TEPR, compared across skin type, use case, and cost.' },
    ],
  },

  {
    _id: 'guide-tattoo-removal-side-effects',
    _type: 'guide',
    title: 'Tattoo Removal Side Effects',
    slug: { _type: 'slug', current: 'tattoo-removal-side-effects' },
    description: 'What to expect after each session, which reactions are normal, which are warning signs, and how side effects differ between laser and non-laser methods.',
    seoTitle: 'Tattoo Removal Side Effects: What to Expect and What Is Not Normal | RealTattooReviews',
    seoDescription: 'Common and uncommon side effects of tattoo removal. Blistering, swelling, pigment changes, scarring risk, and when a side effect means something is wrong.',
    intro: 'Every tattoo removal method produces side effects. Most are temporary and expected. Some are signs of a problem. The most common mistake after a session is mistaking a normal side effect for a complication. Blistering is normal. Redness is normal. Temporary pigment changes are normal.\n\nThis page covers side effects for both laser and non-laser methods.',
    faqItems: [
      { _key: key(), question: 'What are the most common side effects of tattoo removal?', answer: 'Redness, swelling, blistering, scabbing, tenderness, and mild itching. These are expected and temporary. They are part of the normal healing process.' },
      { _key: key(), question: 'Is blistering after tattoo removal normal?', answer: 'Yes. Blistering is common, especially after laser sessions. Small clear blisters within 72 hours are normal. Do not pop them. Contact your provider if blisters fill with yellow or green fluid or continue growing.' },
      { _key: key(), question: 'Does tattoo removal cause permanent skin damage?', answer: 'In most cases, no. The majority of side effects are temporary. Permanent changes (scarring, persistent hypopigmentation) are uncommon with experienced providers and proper aftercare.' },
      { _key: key(), question: 'Can tattoo removal cause hyperpigmentation?', answer: 'Yes. Temporary hyperpigmentation is more common in darker skin types. It usually resolves within 3 to 6 months. Sun avoidance during healing is the best prevention.' },
      { _key: key(), question: 'When should I call my provider about a side effect?', answer: 'Call if you notice increasing pain after 48 hours, yellow or green discharge, red streaks spreading from the area, fever, blisters growing after 72 hours, or any reaction that does not match what your provider described as expected.' },
    ],
    sections: [
      section('Common Side Effects (Expected)',
        ...paras(
          'These side effects occur in most patients after most sessions. They are part of the normal healing process.',
          'Redness and swelling: mild to moderate redness confined to the treatment area, slight puffiness, warmth to the touch. Peaks within 24 hours, resolves within 48 hours.',
          'Blistering: small to moderate clear or slightly pink blisters forming within 24 to 72 hours, flattening and drying within 3 to 7 days. Do not pop blisters. Let them heal naturally.',
          'Scabbing and crusting: dark or brownish scabs forming by day 5, shedding naturally within 7 to 14 days. Do not pick scabs. Premature removal disrupts healing and significantly increases scarring risk.',
          'Frosting (laser only): immediate white or grayish discoloration over the treatment site, fading within 10 to 30 minutes. No treatment required.',
          'Tenderness and itching: the treated area will feel tender for several days after treatment. Mild itching is common and expected. Do not scratch the treated area.',
        ),
      ),
      section('Less Common Side Effects',
        ...paras(
          'These side effects occur in a smaller percentage of patients. They are usually temporary but may require attention.',
          'Hyperpigmentation: darkening of the skin in the treated area. More common in darker Fitzpatrick skin types (IV through VI). Usually resolves within 3 to 6 months. Sun avoidance during healing is the best prevention.',
          'Hypopigmentation: lightening of the skin in the treated area. More common after aggressive laser settings. May take 6 to 12 months to normalize. In rare cases it can be permanent.',
          'Texture changes: some patients notice a slight change in skin texture during healing. Most texture changes are temporary and normalize over weeks to months. Persistent texture changes beyond 3 months may indicate early scar formation.',
          'Ink darkening (cosmetic tattoos only): some cosmetic tattoo pigments, particularly those containing iron oxides or titanium dioxide, can darken when exposed to laser energy. This is called paradoxical darkening. Avoidable by using non-laser methods for cosmetic tattoos.',
        ),
      ),
      section('Rare but Serious Side Effects',
        ...paras(
          'These side effects are uncommon when treatment is performed by an experienced provider. They require prompt attention.',
          'Infection: occurs when bacteria enter the treated skin through open blisters or wounds. Signs include increasing pain after 48 hours, yellow or green discharge, warmth spreading beyond the treatment area, red streaks radiating outward, and fever. If you suspect infection, seek medical attention promptly.',
          'Scarring: uncommon with modern picosecond lasers and experienced providers. More common with Q-switched lasers at aggressive settings or overtreatment. Three types: hypertrophic (raised, stays within treatment area), keloid (raised, extends beyond treatment area), and atrophic (depressed).',
          'Allergic reaction: rarely, the treatment process can release ink particles that trigger an allergic response. More common with certain ink colors (particularly red and yellow pigments). Contact your provider if you experience signs of allergic reaction.',
        ),
      ),
      section('Side Effects by Method',
        ...paras(
          'Different methods produce different side-effect profiles.',
          'Picosecond laser (PicoWay, PicoSure, PiQo4): lower thermal profile than Q-switched. Less blistering, less scarring risk, faster healing between sessions. Frosting occurs. Hypopigmentation risk exists but is reduced.',
          'Q-switched laser (Nd:YAG): higher thermal profile. More blistering, more redness, longer healing time per session. Higher scarring risk at aggressive settings. Effective but produces more pronounced side effects per session.',
          'Saline removal: non-laser. Produces a controlled scab that is part of the removal mechanism. No laser-style blistering. Main risk is scarring from overworking the skin or picking the scab. No melanin interaction. No paradoxical darkening.',
        ),
      ),
      section('How to Reduce Side Effects',
        ...paras(
          'Most side effects are reduced by proper technique and aftercare. Choose an experienced provider. Follow aftercare instructions. Wait the full healing interval (six to eight weeks between sessions). Disclose your medical history (medications, skin conditions, allergies, keloid history). Avoid sun before and after treatment.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/tattoo-removal-healing-process', title: 'Tattoo Removal Healing Process', desc: 'Stage-by-stage timeline from frosting through full recovery. Normal vs abnormal at each phase.' },
      { _key: key(), href: '/guides/tattoo-removal-aftercare', title: 'Tattoo Removal Aftercare', desc: 'Session-by-session aftercare instructions for laser and non-laser methods.' },
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring', desc: 'Scarring risk by method and skin type. Prevention, treatment, and when to see a dermatologist.' },
      { _key: key(), href: '/comparisons/best-tattoo-removal-method', title: 'Best Tattoo Removal Method', desc: 'Compare methods across side-effect profiles, effectiveness, and use-case fit.' },
    ],
  },
]

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

const categories = [
  {
    _id: 'category-color-ink-removal',
    _type: 'category',
    title: 'Color Ink Removal',
    slug: { _type: 'slug', current: 'color-ink-removal' },
    description: 'Not all colors respond the same way. A color-by-color guide to which inks are hardest, which wavelengths match which pigments, and what complete removal realistically looks like.',
    seoTitle: 'Color Tattoo Removal: Hardest Colors, Best Lasers, and Real Expectations | RealTattooReviews',
    seoDescription: 'A color-by-color guide to removing colored tattoos. Learn which ink colors are hardest, which lasers match which pigments, and what complete removal realistically looks like.',
    intro: 'Color tattoos can be removed, but not all colors respond the same way. Black and dark blue clear well. Red and orange usually clear with the right wavelength. Green often takes more sessions than black. Yellow and white are the hardest, and white can darken instead of fading.\n\nThis page breaks down what to expect by color, which laser wavelengths match which pigments, why multi-color work is harder than single-color work, and when near-complete removal is the honest end state.',
    faqItems: [
      { _key: key(), question: 'Are multi-colored tattoos harder to remove?', answer: 'Yes. Multi-color tattoos need multiple laser wavelengths to treat effectively. A single-wavelength laser can fade multi-color work but rarely achieves complete clearance. Expect eight to fifteen sessions for professional multi-color tattoos, compared to six to ten for comparable black ink work.' },
      { _key: key(), question: 'Which tattoo colors are hardest to remove?', answer: 'White is hardest and riskiest due to titanium dioxide oxidation. Yellow often leaves trace pigment even with the correct wavelength. Green and teal are moderate to hard. Red and orange are moderate. Dark blue and navy are easier. Black is easiest.' },
      { _key: key(), question: 'What is the best laser for color tattoo removal?', answer: 'A multi-wavelength picosecond laser (PicoSure, PicoWay, Enlighten) typically offers the best color results. These systems combine multiple wavelengths in one machine, which allows wavelength-to-pigment matching in a single session.' },
      { _key: key(), question: 'How many sessions does color tattoo removal take?', answer: 'Six to ten sessions for single-color red or orange. Eight to twelve for green. Six to twelve for blue depending on shade. Eight to fifteen for multi-color professional work. Amateur work often clears in three to six sessions.' },
    ],
    sections: [
      section('Are Multi-Colored Tattoos Harder to Remove?',
        ...paras(
          'Yes. Multi-color tattoos are harder to remove than single-color work, for two reasons.',
          'First, different colors absorb different laser wavelengths. A 1064 nm Nd:YAG laser targets black well but does little for red or yellow. A 532 nm KTP laser targets red and orange but does little for blue or green. Removing a multi-color tattoo usually means treating with multiple wavelengths over the course of the full treatment plan.',
          'Second, multi-color tattoos often involve layered pigment. Colors mixed to achieve specific shades can contain ink blends that react unpredictably. Multi-color removal takes more sessions than black ink removal. Eight to fifteen sessions is a typical range for professional multi-color work, compared to six to ten for black.',
        ),
      ),
      section('Which Tattoo Colors Are Hardest to Remove?',
        ...paras(
          'Ranked from hardest to easiest: White is hardest (titanium dioxide can oxidize under laser and turn gray or black, many providers will not treat it). Yellow is very difficult (leaves trace pigment even after extensive treatment). Bright green and teal are hard (needs 755 nm Alexandrite or 694 nm Ruby). Light blue and turquoise are moderate. Red and orange are moderate (respond to 532 nm KTP). Dark blue and navy are easier. Black is easiest (absorbs nearly every wavelength).',
        ),
      ),
      section('Best Lasers for Color Tattoo Removal',
        ...paras(
          'No single laser wavelength covers every tattoo color. Color tattoo removal often requires a multi-wavelength laser system, or access to multiple laser types.',
          'Wavelength-to-color matching: 1064 nm Nd:YAG targets black, dark blue, dark green. 532 nm KTP targets red, orange, some yellows. 755 nm Alexandrite targets green, teal, some light blues. 694 nm Ruby targets blue, green. 785 nm picosecond targets blue and green on some platforms.',
          'Picosecond lasers (PicoSure, PicoWay, Enlighten) typically offer better color results than older Q-switched Nd:YAG systems. Many picosecond platforms include multiple wavelengths in one machine. For any color tattoo, ask which wavelengths they will use and which wavelengths are available on their equipment.',
        ),
      ),
      section('How Many Sessions Does Color Tattoo Removal Take?',
        ...paras(
          'Typical session ranges by tattoo type: Single-color red or orange: 6 to 10 sessions. Single-color green: 8 to 12 sessions. Single-color blue: 6 to 12 sessions (depends on shade). Multi-color professional work: 8 to 15 sessions. Heavily saturated multi-color: 15 or more sessions. Amateur color tattoos: often 3 to 6 sessions.',
          'The Kirby-Desai scale assigns points based on six factors: Fitzpatrick skin type, tattoo location, ink color, amount of ink, scarring, and layering. It gives a more accurate session estimate than a clinic\'s default package count.',
        ),
      ),
      section('Complete vs Partial Color Tattoo Removal',
        ...paras(
          'For many color tattoos, especially multi-color pieces with yellow or white, complete removal is genuinely difficult and may not be achievable. Fifteen sessions in, if residual yellow is still present, more sessions often produce diminishing returns.',
          'Partial removal or significant fading is a legitimate outcome. A tattoo that is 80 to 90 percent faded is dramatically less visible than the original and opens the door to effective cover-up work if desired.',
          'Complete removal is usually not the goal for cover-up prep. Three to five sessions of fading often creates a clean enough base for a new tattoo to hide the original.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/categories/complete-removal', title: 'Complete Removal', desc: 'What complete removal realistically looks like, and which cases achieve it.' },
      { _key: key(), href: '/categories/dark-skin-tattoo-removal', title: 'Dark Skin Tattoo Removal', desc: 'Safe laser choices, wavelengths, and providers for Fitzpatrick IV through VI.' },
      { _key: key(), href: '/comparisons/best-tattoo-removal-method', title: 'Best Tattoo Removal Method', desc: 'Compare laser, TEPR, and saline across effectiveness, skin type, and use case.' },
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring', desc: 'Scarring risk by method, skin type, and provider. Prevention and treatment.' },
    ],
  },

  {
    _id: 'category-dark-skin-tattoo-removal',
    _type: 'category',
    title: 'Dark Skin Removal',
    slug: { _type: 'slug', current: 'dark-skin-tattoo-removal' },
    description: 'A practical guide to tattoo removal on dark skin. Understand laser wavelength choice, hyperpigmentation risk, and how to find a provider experienced with Fitzpatrick IV-VI skin.',
    seoTitle: 'Tattoo Removal on Dark Skin: Safe Laser, Wavelengths, and Provider Guide | RealTattooReviews',
    seoDescription: 'A practical guide to tattoo removal on dark skin. Understand laser wavelength choice, hyperpigmentation risk, and how to find a provider experienced with Fitzpatrick IV-VI skin.',
    intro: 'Tattoo removal works on dark skin. What changes is the margin for error. Melanin absorbs laser energy along with the tattoo pigment. So the wrong wavelength, the wrong settings, or an inexperienced provider can cause hyperpigmentation, hypopigmentation, or burns. With the right laser, the right settings, and a provider experienced in treating Fitzpatrick IV, V, and VI skin, outcomes are safe and effective.',
    faqItems: [
      { _key: key(), question: 'Can Black people get tattoo removal?', answer: 'Yes. Laser tattoo removal on black skin, including Fitzpatrick V and VI skin tones, is safe with the right laser and provider. Avoid clinics that treat all skin tones with the same settings and wavelengths. Ask directly about their experience with darker skin before booking.' },
      { _key: key(), question: 'Is tattoo removal safe for dark skin?', answer: 'It can be, with the right setup. Safety depends on wavelength choice (1064 nm for most dark-skin cases), appropriate fluence, careful session spacing, patch testing, and real provider experience.' },
      { _key: key(), question: 'Can tattoo removal cause hyperpigmentation on dark skin?', answer: 'Yes, it can. Hyperpigmentation is the most common side effect on darker skin. Thermal injury triggers extra melanin production. It usually fades in three to twelve months. Risk is reduced with lower fluence, correct wavelength, and longer session spacing.' },
      { _key: key(), question: 'Does tattoo removal leave scars on dark skin?', answer: 'Scarring is uncommon with experienced providers using appropriate settings. People with a keloid or hypertrophic scarring tendency have a higher baseline risk. Most pigment change after treatment is not scarring and usually resolves.' },
    ],
    sections: [
      section('Does Tattoo Removal Work on Dark Skin?',
        ...paras(
          'Yes. Tattoo removal is safe and effective on dark skin in the right setup. The laser and settings have to be chosen correctly. The provider has to have real experience treating melanated skin.',
          'Modern picosecond and Q-switched Nd:YAG lasers at the 1064 nm wavelength are well-suited for darker skin. That wavelength bypasses most melanin absorption. Alexandrite lasers (755 nm) and KTP lasers (532 nm) are higher-risk on darker skin.',
        ),
      ),
      section('Best Lasers for Dark Skin Tattoo Removal',
        ...paras(
          'The safest choice for most dark skin tattoo removal is a Q-switched or picosecond Nd:YAG laser operating at 1064 nm. Melanin absorbs light strongly at shorter wavelengths (532 nm and 755 nm) and weakly at 1064 nm. A 1064 nm laser can pass through melanin-rich skin and target black tattoo ink with minimal competing absorption.',
          'Picosecond lasers (PicoWay, PicoSure, Enlighten) with a 1064 nm option are a step up from older Q-switched Nd:YAG. Shorter pulse widths mean less heat per pulse, which means lower thermal injury risk.',
          'Lasers to approach carefully: Alexandrite lasers (755 nm) are aggressively absorbed by melanin and carry higher risk on darker skin. KTP lasers (532 nm) are absorbed by melanin at the surface and are risky for dark skin. IPL is not a tattoo removal laser and should never be used for tattoo removal.',
        ),
      ),
      section('Hyperpigmentation, Hypopigmentation, and Scarring Risks',
        ...paras(
          'Hyperpigmentation: the skin producing extra melanin in response to thermal injury from the laser. It can be noticeable on dark skin and can take three to twelve months to fade. Usually not permanent.',
          'Hypopigmentation: the skin losing melanin and becoming lighter than the surrounding skin. Less common than hyperpigmentation but more concerning because it is more often permanent. Risk rises with aggressive settings or too-close session spacing.',
          'True scarring: textural change, raised or indented skin. Scarring on dark skin carries a higher baseline risk of keloid and hypertrophic scarring for people with that predisposition. Scarring is rare with experienced providers using appropriate settings.',
          'The risk ranking for darker skin, from most common to least common: hyperpigmentation first, then hypopigmentation, then textural scarring or keloids.',
        ),
      ),
      section('How to Reduce Risk During Tattoo Removal on Dark Skin',
        ...paras(
          'Confirm the laser wavelength. Ask the provider directly: what wavelength is the laser treating my tattoo? 1064 nm Nd:YAG is standard for dark skin.',
          'Ask for a patch test. Six to eight weeks before the full session, the provider tests a small area. If pigment change or healing issues appear, you know before the whole tattoo is treated.',
          'Accept lower fluence. Less energy per pulse means a slower treatment but lower thermal injury risk.',
          'Space sessions eight to twelve weeks apart. Dark skin typically needs more healing time between sessions than the standard six to eight weeks.',
          'Follow aftercare closely. Sun avoidance, consistent sunscreen use, no picking of scabs, and immediate contact with the provider at any sign of infection.',
          'Pause if pigment change appears. If you see hyperpigmentation or hypopigmentation after a session, stop and let the skin recover before the next session.',
        ),
      ),
      section('What to Look for in a Provider',
        ...paras(
          'The single most important variable for safe dark skin tattoo removal is provider experience. Questions to ask before booking: What wavelength will you use and why for my skin tone? How many patients with Fitzpatrick V or VI skin have you personally treated? Can you show me before-and-after photos of patients with skin similar to mine? Do you offer a patch test before the full first session? What is your protocol if hyperpigmentation appears after a session?',
          'A provider who answers all these questions confidently and specifically is a fit. Medical credentials also matter. A dermatology practice or physician-supervised laser clinic is usually safer than a medspa chain with rotating technicians.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring', desc: 'A full guide to scarring risk during tattoo removal: causes, prevention, and what to do if it happens.' },
      { _key: key(), href: '/categories/color-ink-removal', title: 'Color Ink Removal', desc: 'Color-by-color guide to wavelength matching, session counts, and what to expect.' },
      { _key: key(), href: '/comparisons/best-tattoo-removal-method', title: 'Best Tattoo Removal Method', desc: 'Compare methods across skin type, use case, and cost.' },
    ],
  },

  {
    _id: 'category-scarring-concerns',
    _type: 'category',
    title: 'Scarring Concerns',
    slug: { _type: 'slug', current: 'scarring-concerns' },
    description: 'A practical risk-assessment guide to tattoo removal scarring. Learn which methods, providers, and skin types carry lower risk, and how to reduce scarring likelihood before and during treatment.',
    seoTitle: 'Tattoo Removal Scarring: Risk by Method, Skin Type, and Provider | RealTattooReviews',
    seoDescription: 'A practical risk-assessment guide to tattoo removal scarring. Learn which methods, providers, and skin types carry lower risk, and how to reduce scarring likelihood before and during treatment.',
    intro: 'Tattoo removal scarring is real. It is much less common than most people assume. A large peer-reviewed study of 1,041 laser tattoo removal patients found hypertrophic scarring in 0.28% of cases and zero cases of keloid scarring.\n\nWhat raises scarring risk above that baseline is predictable. Four things drive it: the wrong method for your case, the wrong settings for your skin, an inexperienced provider, and aftercare failures.',
    faqItems: [
      { _key: key(), question: 'Does tattoo removal cause scarring?', answer: 'Rarely. A 2016 peer-reviewed study of 1,041 laser tattoo removal patients found hypertrophic scarring in 0.28% of cases. It found zero cases of keloid scarring. Most post-treatment skin changes are pigment changes or normal healing, not true scars.' },
      { _key: key(), question: 'Can laser tattoo removal leave scars?', answer: 'Yes, but at a low rate. The FDA lists scarring as a possible risk. Published rates are under 1% for hypertrophic scarring when treatment is done at protocol settings by a trained provider.' },
      { _key: key(), question: 'Which tattoo removal methods have lower scarring risk?', answer: 'From lowest to highest risk for body tattoos: picosecond laser, Q-switched Nd:YAG laser, saline removal (for PMU or small tattoos only), chemical or acid removal, ablative lasers or dermabrasion, surgical excision.' },
      { _key: key(), question: 'How do I reduce scarring risk after tattoo removal?', answer: 'Follow aftercare exactly. Keep the area clean. Do not pick scabs or blisters. Avoid sun exposure. Apply sunscreen daily once healed. Space sessions at the recommended interval. Pause treatment if pigment or texture changes appear.' },
    ],
    sections: [
      section('Does Tattoo Removal Cause Scarring?',
        ...paras(
          'Rarely, when done well. The most-cited data comes from a 2016 retrospective review of 1,041 laser tattoo removal patients published in the Journal of Clinical and Aesthetic Dermatology. The study reported 0.28% hypertrophic scarring and 0.00% keloid incidence.',
          'A separate prospective study reported total adverse effect incidence at 6.2%. Hyperpigmentation was the most common finding at 4.8%. Hyperpigmentation is skin darkening, not true scarring. Most post-treatment changes that patients call scars are actually pigment changes or textural changes that resolve over months.',
        ),
      ),
      section('Normal Healing vs True Scarring',
        ...paras(
          'Normal and expected after laser sessions: redness, swelling, and pinpoint bleeding (first 24-72 hours), blistering (first 1-3 days), scabbing (days 3-10), temporary lightening or darkening in the treated area (weeks 1-12), and faint ghost outline where the tattoo was.',
          'Not normal (contact the provider): raised, thickened skin forming a firm ridge or bump. Indented, pitted skin that persists past three months. Skin that looks significantly different from the surrounding tissue six or more months after treatment. Any sign of infection.',
          'Hypertrophic scars are raised and firm. Keloid scars extend beyond the original treatment boundary. Both are true scarring and need medical evaluation. Textural ghost outlines usually are not true scars and often improve over 12-24 months.',
        ),
      ),
      section('Which Tattoo Removal Methods Have Lower Scarring Risk?',
        ...paras(
          'Q-switched Nd:YAG laser: lowest-risk category when used at protocol settings. 0.28% hypertrophic scarring incidence per the 2016 JCAD study.',
          'Picosecond lasers (PicoSure, PicoWay, Enlighten): lower thermal load than Q-switched due to shorter pulse widths. Clinical data suggests less blistering, fewer pigmentary changes, and lower scarring risk. Best option when available, especially for darker skin or color work.',
          'Chemical or acid removal: significantly higher scarring risk than laser. A 2022 retrospective study documented hypertrophic and atrophic scarring from chemical removal methods.',
          'Dermabrasion, ablative lasers, surgical excision: the FDA notes these methods have higher scarring potential than Q-switched laser.',
          'Risk ranking from lowest to highest for most body tattoos: picosecond laser, Q-switched Nd:YAG laser, saline (PMU and small tattoos only), chemical removal, ablative lasers or dermabrasion, surgical excision.',
        ),
      ),
      section('Provider Selection for Lower Scarring Risk',
        ...paras(
          'The single biggest variable in tattoo removal scarring risk is provider skill, not the specific laser model.',
          'Board-certified dermatologists and physician-supervised clinics with dedicated laser technicians produce lower complication rates. Providers who patch-test new patients six to eight weeks before the full session catch pigment and scarring issues early. Ask directly what happens if hyperpigmentation, blistering, or unexpected healing appears.',
          'Additional signals of provider quality: uses the Kirby-Desai scale or similar structured assessment. Offers multiple laser wavelengths. Spaces sessions at least six weeks apart. Documents each session with photographs.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/tattoo-removal-scarring', title: 'Tattoo Removal Scarring Guide', desc: 'What causes tattoo removal scars, how to prevent them, and treatment options.' },
      { _key: key(), href: '/categories/dark-skin-tattoo-removal', title: 'Dark Skin Tattoo Removal', desc: 'Specific guidance on pigment change and scarring risk for Fitzpatrick IV-VI skin.' },
      { _key: key(), href: '/guides/tattoo-removal-aftercare', title: 'Tattoo Removal Aftercare', desc: 'Session-by-session aftercare instructions that reduce scarring risk.' },
    ],
  },

  {
    _id: 'category-complete-removal',
    _type: 'category',
    title: 'Complete Removal',
    slug: { _type: 'slug', current: 'complete-removal' },
    description: 'What complete tattoo removal realistically looks like, which cases achieve it, and how to set honest expectations before starting treatment.',
    intro: 'Complete tattoo removal is achievable in many cases. It is not guaranteed in all cases. The difference comes down to ink type, tattoo age, skin type, provider skill, and the definition of "complete." This page covers the realistic end state for different tattoo types, and what factors shift outcomes toward or away from full clearance.',
    sections: [
      section('What Does Complete Removal Mean?',
        ...paras(
          'Complete removal means no visible trace of the tattoo at normal viewing distance under normal lighting. Not invisible under a magnifying glass. Not zero trace molecules of pigment. Visible clearance from a standing distance.',
          'Complete clearance is achievable for most black and dark ink tattoos, older tattoos with naturally faded ink, amateur tattoos (shallower pigment), smaller tattoos, and tattoos on skin with good blood flow.',
          'Full clearance is more difficult or may not be achievable for multi-color professional work (especially with yellow or white), heavily saturated large tattoos, cosmetic tattoos with titanium dioxide or specific pigment blends, and tattoos in low blood-flow areas.',
        ),
      ),
      section('How Many Sessions Does Complete Removal Take?',
        ...paras(
          'Black ink professional tattoos typically need 6 to 10 sessions. Amateur tattoos often clear in 3 to 6 sessions. Multi-color professional work needs 8 to 15 sessions or more.',
          'Session counts are estimates. The Kirby-Desai scale provides a structured way to estimate sessions before starting treatment. Variables include Fitzpatrick skin type, tattoo location, ink color, amount of ink, scarring, and layering. A provider using Kirby-Desai is doing a methodical assessment.',
          'Fading continues between sessions as macrophages clear ink particles through the lymphatic system. The gap between sessions is not wasted time. It is part of the removal process.',
        ),
      ),
      section('When Is Partial Removal the Right Goal?',
        ...paras(
          'Partial removal (significant fading) is often the right end goal. A tattoo that is 80 to 90 percent faded is dramatically less visible than the original.',
          'Cover-up prep is the most common case where partial removal is preferred. Three to five sessions of fading typically creates a light enough base for a skilled cover-up artist to fully conceal the original work.',
          'Diminishing returns: after 10 to 12 sessions on a stubborn color tattoo, additional sessions often produce less fading per session than earlier sessions. At that point, the cost-benefit calculation shifts toward accepting the remaining trace.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/categories/color-ink-removal', title: 'Color Ink Removal', desc: 'Which colors are hardest to remove and what complete removal looks like by color.' },
      { _key: key(), href: '/categories/cover-up-prep', title: 'Cover-Up Prep', desc: 'How much fading you need before a cover-up, and what to expect.' },
      { _key: key(), href: '/comparisons/best-tattoo-removal-method', title: 'Best Tattoo Removal Method', desc: 'Method comparison across use case, skin type, and completeness of removal.' },
    ],
  },

  {
    _id: 'category-cover-up-prep',
    _type: 'category',
    title: 'Cover-Up Prep',
    slug: { _type: 'slug', current: 'cover-up-prep' },
    description: 'How to use tattoo removal to prepare for a cover-up tattoo. Covers how much fading is needed, session count, and what to look for in a cover-up artist.',
    intro: 'Cover-up prep is the most common reason people start tattoo removal without intending to remove the tattoo entirely. The goal is not complete clearance. The goal is enough fading for a skilled cover-up artist to work over the original. This page covers how much fading is enough, how many sessions that typically takes, and what to look for in a cover-up artist.',
    sections: [
      section('How Much Fading Do You Need for a Cover-Up?',
        ...paras(
          'Most cover-up artists want the original tattoo at least 50 to 70 percent faded before starting the new work. A lighter base gives the artist more design freedom, allows for a larger range of colors and styles, and produces a cleaner final result.',
          'Heavily saturated or dark tattoos that have not been faded tend to show through cover-up work over time, especially as the cover-up tattoo settles. Fading first eliminates that risk.',
          'For very dark or saturated tattoos, 3 to 5 fading sessions is often enough for a skilled cover-up artist. For complex multi-color work, 5 to 8 sessions may be needed. Ask your cover-up artist specifically what they want to see before they start.',
        ),
      ),
      section('Cover-Up Prep vs Full Removal',
        ...paras(
          'Full removal takes more sessions and more cost. Cover-up prep requires significantly less treatment: usually 3 to 6 sessions versus 8 to 15 for full removal.',
          'The optimal sequence: start removal sessions to fade the tattoo, consult with the cover-up artist after session 3 or 4, get their assessment of whether the base is light enough, proceed with the cover-up when the artist confirms readiness.',
          'Timing matters. Wait the full healing period (6 to 8 weeks) after the last removal session before getting the cover-up tattoo.',
        ),
      ),
      section('What to Tell Your Cover-Up Artist',
        ...paras(
          'Tell the cover-up artist the full history of the tattoo: original colors, age, any prior removal sessions, the products used. This helps them plan the design, color selection, and technique.',
          'Ask them to show before-and-after examples of cover-up work they have done over previously removed or faded tattoos. This is specialized work. Not every talented tattoo artist excels at cover-ups over faded tattoos.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/categories/complete-removal', title: 'Complete Removal', desc: 'When complete removal is achievable and when partial fading is the right end state.' },
      { _key: key(), href: '/categories/color-ink-removal', title: 'Color Ink Removal', desc: 'Which colors respond to fading and what to expect by ink type.' },
      { _key: key(), href: '/guides/tattoo-removal-healing-process', title: 'Healing Process', desc: 'How long to wait between sessions and before getting a cover-up tattoo.' },
    ],
  },

  {
    _id: 'category-microblading-removal',
    _type: 'category',
    title: 'Microblading Removal',
    slug: { _type: 'slug', current: 'microblading-removal' },
    description: 'How to remove microblading and powder brow tattoos. Covers saline vs laser for PMU removal, session expectations, and what to expect at each stage.',
    intro: 'Microblading removal is one of the most common reasons people seek tattoo removal. Most microblading can be removed or significantly faded with the right method and provider. The method choice matters more for PMU than for body tattoos, because the pigments used in cosmetic tattoos behave differently under laser energy.',
    sections: [
      section('Saline vs Laser for Microblading Removal',
        ...paras(
          'Saline removal is the standard recommendation for most microblading and PMU removal cases. Cosmetic tattoo pigments often contain iron oxides and titanium dioxide. Under laser energy, iron oxide can oxidize and darken (paradoxical darkening). The treated brows turn gray or black instead of fading. Saline does not use light energy, so no oxidation occurs.',
          'Laser removal is used for some microblading cases, particularly when the pigment is known to be iron-oxide-free, or when saline has failed to produce adequate fading. When laser is used on PMU, a conservative patch test is essential before full treatment.',
          'For microblading and PMU specifically, saline is generally the lower-risk first option. See the saline tattoo removal guide for full details on the mechanism and process.',
        ),
      ),
      section('How Many Sessions Does Microblading Removal Take?',
        ...paras(
          'Most microblading cases take 2 to 6 saline sessions for full removal. Older or more faded work may clear in fewer sessions. Heavily saturated powder brows or layered PMU may take up to 8 to 10 sessions.',
          'Sessions are spaced 6 to 8 weeks apart to allow full healing. A 3-session microblading removal spans roughly 4 to 5 months from first session to completion.',
          'After each session, the treated area goes through a scab phase. The scab contains lifted pigment. Protect the scab. Do not pick it. Premature scab removal reduces the amount of pigment that leaves and can increase scarring risk.',
        ),
      ),
      section('Microblading Removal for Color Correction',
        ...paras(
          'Color correction is a common reason for microblading removal. PMU that has healed to a blue, gray, or orange tone needs to be lightened before new pigment is implanted. Partial removal (2 to 4 sessions) often provides enough lightening for a PMU artist to correct the color.',
          'Discuss the color correction plan with your PMU artist before starting removal. The artist should specify the target lightness before the correction appointment. Over-removing can leave the skin texture-changed, which affects how new pigment holds.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/guides/saline-tattoo-removal', title: 'Saline Tattoo Removal', desc: 'How saline removal works, process steps, cost, and what to expect.' },
      { _key: key(), href: '/comparisons/saline-vs-laser-tattoo-removal', title: 'Saline vs Laser Tattoo Removal', desc: 'Full head-to-head comparison including PMU and microblading use cases.' },
      { _key: key(), href: '/categories/permanent-makeup-removal', title: 'Permanent Makeup Removal', desc: 'Broader PMU removal guide covering lip liner, eyeliner, and other cosmetic tattoos.' },
    ],
  },

  {
    _id: 'category-permanent-makeup-removal',
    _type: 'category',
    title: 'Permanent Makeup Removal',
    slug: { _type: 'slug', current: 'permanent-makeup-removal' },
    description: 'How to remove permanent makeup tattoos including microblading, powder brows, lip liner, and eyeliner. Covers method choice, session expectations, and risks by PMU type.',
    intro: 'Permanent makeup removal covers a range of cosmetic tattoo types: microblading, powder brows, lip liner, lip blush, eyeliner, and full-coverage cosmetic tattooing. Each type has specific considerations based on the area, pigment used, and depth of implantation. This page covers method choice, session expectations, and key risks by PMU type.',
    sections: [
      section('PMU Removal: Why Method Choice Matters',
        ...paras(
          'Permanent makeup pigments are formulated differently from body tattoo inks. Most PMU pigments contain iron oxides and titanium dioxide. Under laser energy, these pigments can undergo paradoxical darkening, turning gray or black instead of fading.',
          'Saline removal avoids this risk entirely because it does not use light energy. The saline solution works through osmosis, drawing pigment upward without interacting chemically with iron oxide or titanium dioxide.',
          'For most PMU removal cases, saline is the lower-risk first option. Laser can be used on PMU cases where paradoxical darkening risk is assessed to be low, or after a conservative patch test.',
        ),
      ),
      section('Removal by PMU Type',
        ...paras(
          'Microblading and powder brows: most cases clear in 2 to 6 saline sessions. More heavily layered or saturated work may need 8 to 10. The face heals quickly, which helps. Protect the scab after each session.',
          'Lip liner and lip blush: the lip area is sensitive and vascular. It heals well. Saline works effectively on lip PMU. Most lip liner cases clear in 3 to 6 sessions. Full lip blush may take more sessions due to saturation. Avoid heat, spicy food, and aggressive lip products during the healing phase after each session.',
          'Eyeliner tattoo: eyeliner removal requires a technician experienced in working near the eye. Most eyeliner cases need 3 to 6 sessions. Saline is the standard choice for eyeliner removal. Session spacing is important. Do not rush eyeliner removal sessions.',
        ),
      ),
      section('How to Find a PMU Removal Specialist',
        ...paras(
          'PMU removal is specialized work. Not every tattoo removal provider is experienced with cosmetic tattoo pigments. Look specifically for technicians certified in saline removal (Li-FT, A+Ocean, Botched Ink, or Rejuvi certification). Ask to see before-and-after examples specifically on PMU, not body tattoos.',
          'A provider who offers both saline and laser options and explains which is appropriate for your case is demonstrating relevant knowledge. A provider who only uses laser for all PMU removal without discussing paradoxical darkening risk may not have current knowledge of the relevant risks.',
        ),
      ),
    ],
    relatedLinks: [
      { _key: key(), href: '/categories/microblading-removal', title: 'Microblading Removal', desc: 'Specific guide to microblading and powder brow removal by saline and laser.' },
      { _key: key(), href: '/guides/saline-tattoo-removal', title: 'Saline Tattoo Removal', desc: 'How saline removal works, session process, cost, and healing.' },
      { _key: key(), href: '/comparisons/saline-vs-laser-tattoo-removal', title: 'Saline vs Laser', desc: 'Full comparison covering PMU-specific risks and use cases.' },
    ],
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\nSeeding guides...')
  for (const guide of guides) {
    const { _id, ...doc } = guide
    await upsert(_id, doc)
  }

  console.log('\nSeeding categories...')
  for (const cat of categories) {
    const { _id, ...doc } = cat
    await upsert(_id, doc)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
