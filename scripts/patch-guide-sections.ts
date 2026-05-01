/**
 * scripts/patch-guide-sections.ts
 *
 * Patches intro + sections into each guide document in Sanity.
 * Uses content sourced from Notion. Non-destructive: only sets intro
 * and sections, leaving faqItems and all other fields untouched.
 *
 * Run with:
 *   npx tsx scripts/patch-guide-sections.ts
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const nanoid = () => randomBytes(6).toString("hex");

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([^#=][^=]*)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, "");
    });
}

const client = createClient({
  projectId: "oh7z8b59",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ── Portable Text helpers ────────────────────────────────────────────────────
function block(text: string): object {
  return {
    _type: "block",
    _key: nanoid(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: nanoid(), text, marks: [] }],
  };
}

function section(heading: string, paragraphs: string[]): object {
  return {
    _type: "guideSection",
    _key: nanoid(),
    heading,
    body: paragraphs.map(block),
  };
}

// ── Guide content (from Notion) ──────────────────────────────────────────────
const guides: Record<string, { intro: string; sections: object[] }> = {
  "saline-tattoo-removal": {
    intro:
      "Saline tattoo removal is a non-laser method that uses a salt-based solution to lift tattoo pigment out of the skin. This guide covers how it works, who it is best for, safety, scarring risk, healing, cost, sessions, and what to expect from results.",
    sections: [
      section("What Is Saline Tattoo Removal?", [
        "Saline tattoo removal is a non-laser method that uses a salt-based solution to lift tattoo pigment out of the skin. The method is also called saline solution tattoo removal because the active agent is a professional-grade saline solution implanted into the treatment area. A trained technician implants a high-concentration saline solution into the tattooed area using a tattoo machine or manual tool. The solution creates an osmotic gradient. Water and pigment are drawn upward from the dermis through the epidermis. The area forms a controlled scab. When the scab falls off naturally, lifted pigment comes with it.",
        "Saline tattoo removal is most commonly used on cosmetic tattoos: microblading, powder brows, lip liner, eyeliner, and other permanent makeup (PMU). It is also used on small body tattoos, typically two square inches or less. The method is sometimes called saline tattoo lightening because full removal may take multiple sessions and the visible result after each session is progressive lightening.",
        "Products like Li-FT, A+Ocean, Rejuvi, and Botched Ink have established themselves as the most widely used saline removal brands. Each has a slightly different formulation, but the core mechanism is the same: saline solution, osmotic lift, scab formation, pigment removal.",
      ]),
      section("How the Saline Removal Process Works", [
        "Step 1: Consultation. A trained technician assesses your tattoo or cosmetic tattoo. They evaluate pigment depth, saturation, color, skin type, and the age of the work.",
        "Step 2: Numbing. A topical anesthetic is applied. Most technicians use a lidocaine-based numbing cream. The area sits for 15 to 30 minutes.",
        "Step 3: Saline implantation. The technician uses a tattoo machine or manual tool to implant the saline solution into the tattooed skin. The saline solution is hypertonic (higher salt concentration than surrounding tissue), which creates the osmotic gradient.",
        "Step 4: Osmotic lift. Once implanted, osmosis draws water from the dermal cells upward toward the more concentrated solution. Pigment particles travel with the water.",
        "Step 5: Scab formation. Over the next 24 to 72 hours, the treated area forms a controlled scab containing lifted pigment.",
        "Step 6: Scab shedding. The scab falls off naturally within 7 to 14 days. Do not pick, peel, or pull the scab.",
        "Step 7: Healing. Full healing between sessions takes 6 to 8 weeks.",
        "Step 8: Repeat. Most cases require 2 to 6 sessions for cosmetic tattoos. Heavily saturated work may need up to 10.",
      ]),
      section("Is Saline Tattoo Removal Safe?", [
        "Saline tattoo removal is considered safe when performed by a trained technician using a professional-grade solution. The saline solutions used in professional removal (Li-FT, A+Ocean, Rejuvi, Botched Ink) are formulated with purified water, salt, and natural additives.",
        "Contraindications: Not recommended for users who are pregnant or breastfeeding, have active skin infections, are on blood thinners or immunosuppressants, have keloid scarring history, or have uncontrolled diabetes.",
        "Practitioner quality matters. The biggest safety variable is the technician. Always verify training and documented before-and-after results.",
      ]),
      section("Common Side Effects and Risks", [
        "Common: redness, swelling (24–48 hrs), dark scab formation (desired), mild tenderness, temporary hyper/hypopigmentation.",
        "Less common: scarring from overworking or picking, infection from poor aftercare, incomplete removal from rushed sessions, allergic reaction (rare).",
      ]),
      section("Saline Tattoo Removal Scarring", [
        "Scarring risk is low with proper technique and aftercare. Causes: overworking skin, picking scabs, sessions too close together. Minimize by following aftercare, choosing a conservative technician, waiting the full 6–8 weeks between sessions.",
        "Saline does not involve heat, eliminating thermal scarring risk. See the tattoo removal scarring guide for a full comparison.",
      ]),
      section("Saline Removal for Microblading and Cosmetic Tattoos", [
        "Saline removal for microblading is the most common use case. Iron oxide pigment is safe (no paradoxical darkening risk), titanium dioxide is safe (no blackening), and shallow pigment depth makes it ideal for saline.",
        "Saline eyebrow tattoo removal works on all brow styles: microblading, powder, combination, and older tattoos. Most eyebrow cases complete in 2–4 sessions. Lip liner and eyeliner are also commonly treated.",
      ]),
      section("Saline Tattoo Removal Before and After", [
        "Results are progressive across sessions. After session 1: the area looks darker while the scab sits, then lighter after shedding. Sessions 2–3: cumulative lightening becomes visible. Sessions 4–6: many cosmetic tattoos are fully removed or ready for correction.",
        "'Lightening' is more accurate than 'removal' for early sessions. Managing expectations helps patients stay committed to the full treatment plan.",
      ]),
      section("Saline Tattoo Removal Cost", [
        "$100–$350 per session, with most falling between $150–$250. Total cost estimates: microblading $300–$1,200; lip liner $300–$1,000; eyeliner $400–$1,400; small body tattoo $450–$1,800.",
        "Saline removal is generally cheaper than laser for cosmetic tattoos because fewer passes are needed per session.",
      ]),
      section("Saline Tattoo Removal Aftercare and Healing", [
        "First 24–48 hours: keep the area clean and dry. No makeup or sunscreen directly on the treated area.",
        "Scab phase (days 3–14): do not pick the scab. Apply only the recommended aftercare product. Avoid sun exposure and swimming.",
        "Post-scab (weeks 3–8): moisturize gently, avoid sun, and wait the full 6–8 weeks before the next session. Total timeline for a 3-session microblading removal is roughly 4–5 months.",
      ]),
      section("Does Saline Tattoo Removal Work?", [
        "Yes. Saline removal works well on microblading, powder brows, lip liner, eyeliner, small body tattoos, and cases where prior laser sessions have darkened cosmetic pigment.",
        "Limitations: large body tattoos (impractical at scale), deep multi-layer ink (laser is better), full lip color (sensitive tissue), and speed on large tattoos (laser covers more area per session).",
      ]),
    ],
  },

  "tattoo-removal-aftercare": {
    intro:
      "Good tattoo removal aftercare protects your results and reduces the risk of scarring, infection, and delayed healing. This guide covers post-treatment care step by step for both laser and saline methods.",
    sections: [
      section("Tattoo Removal Aftercare", [
        "Good tattoo removal aftercare protects your results and reduces the risk of scarring, infection, and delayed healing. It applies to laser tattoo removal aftercare and saline tattoo removal aftercare, with method-specific sections where instructions differ.",
        "Always follow your provider's specific instructions. This guide covers general consensus.",
      ]),
      section("What to Do in the First 24 Hours After Tattoo Removal", [
        "Leave the bandage or dressing on for the specified time (2–4 hours, or up to 24 hours for Saniderm or Tegaderm). After removal: gently clean with lukewarm water and mild fragrance-free soap, apply a thin layer of the recommended aftercare product (Aquaphor or unscented moisturizer), and use ice packs for swelling.",
        "Wear loose clothing over the area, and elevate the treated area if possible.",
      ]),
      section("Laser Tattoo Removal Aftercare", [
        "Blistering management: do not pop or pick blisters. Frosting (white discoloration immediately after treatment) requires no action — it fades within minutes.",
        "Scab care: do not pick scabs, let them fall off naturally within 7–14 days. Apply SPF 30+ once healed enough. Between sessions, wait the full 6–8 weeks.",
      ]),
      section("Saline Tattoo Removal Aftercare", [
        "Aftercare instructions for saline tattoo removal differ in the scab phase. Many technicians recommend dry healing for the first 3–5 days. A dark scab is normal — it contains lifted pigment. Do not pick it.",
        "Aftercare for eyebrow tattoo removal: avoid makeup and brow products on the scab until it has shed. Wait 6–8 weeks between sessions.",
      ]),
      section("When to Remove Saniderm After Tattoo Removal", [
        "General guideline: 24–48 hours. Some providers recommend up to 72 hours. Remove earlier if you notice excessive fluid pooling under the dressing.",
        "Peel slowly and flat against the skin. Use warm water to loosen the adhesive if needed. After removal: clean gently, apply aftercare product, and resume standard aftercare instructions.",
      ]),
      section("Tattoo Removal Healing Time", [
        "6–8 weeks per session. Visible healing takes 2–3 weeks. Full recovery before the next session requires 6–8 weeks minimum.",
        "See the healing process guide for a full stage-by-stage timeline.",
      ]),
      section("What to Avoid After Tattoo Removal", [
        "Do not pick blisters or scabs. Avoid sun exposure, soaking (pools, hot tubs, baths), heavy exercise for 24–48 hours, makeup or fragranced products on the area, shaving over the area, and tight clothing.",
        "Do not use hydrogen peroxide, rubbing alcohol, or Neosporin on the treated area.",
      ]),
      section("Tattoo Removal Aftercare Tips", [
        "Stay hydrated and eat well — protein, vitamins C and E, and zinc support healing. Sleep with the area elevated if possible. Keep the area clean.",
        "Recommended products: Aquaphor or unscented moisturizers (CeraVe, Eucerin, Vanicream). Photograph your progress between sessions. Follow your provider's instructions above all else.",
      ]),
      section("Warning Signs: When to Call Your Provider", [
        "Seek attention for: increasing pain after 48 hours, yellow or green discharge, red streaks spreading outward, fever or chills, excessive swelling beyond 48 hours, growing blisters beyond 72 hours, or allergic reaction to aftercare products.",
        "Do not wait if you notice infection signs. Early treatment prevents serious complications.",
      ]),
    ],
  },

  "tattoo-removal-healing-process": {
    intro:
      "Tattoo removal healing is a staged biological process that occurs after every session. The treated skin moves through an immediate reaction phase, a wound-healing phase, and a recovery phase before the next session can be scheduled. Most modern clinical protocols allow 6 to 8 weeks between sessions, which gives the immune system time to clear fragmented ink particles and the skin time to fully recover.",
    sections: [
      section("How Tattoo Removal Healing Works", [
        "Tattoo removal healing is driven by two parallel processes: surface skin repair and immune clearance of ink. After a laser session, the body's macrophages (a type of immune cell) engulf the fragmented ink particles created by the laser pulse and transport them through the lymphatic system for excretion. This is why the tattoo continues fading for weeks after a single session, not just immediately.",
        "Surface healing follows the standard wound-healing pathway: hemostasis, inflammation, proliferation, and remodeling. The visible stages (redness, blistering, scabbing, peeling) reflect this pathway. Surface healing typically completes within 2 to 3 weeks per session, but full cellular recovery, including immune clearance, takes the full 6 to 8 week interval. Treating the skin again before that interval increases the risk of overlap injury and scarring.",
        "For non-laser methods such as TEPR (used by inkOUT) and saline removal, the surface healing follows a controlled wound model: a scab forms intentionally over 2 to 4 weeks and lifts ink with it as it sheds. The immune component is smaller because most of the ink leaves through the scab itself rather than via the lymphatic system.",
        "For step-by-step aftercare instructions, see the aftercare guide. For scarring concerns, see the scarring guide.",
      ]),
      section("Laser Tattoo Removal Healing Stages", [
        "Stage 1. Frosting and immediate reaction (minutes 0 to 60). Frosting is a white or gray discoloration caused by gas bubbles released when the laser interacts with ink particles. It fades within 10 to 30 minutes. Normal reactions also include mild pinpoint bleeding and a warm or stinging sensation. Frosting does not occur with non-laser methods.",
        "Stage 2. Redness, swelling, and inflammation (hours 1 to 48). The treated area becomes inflamed and feels warm. Swelling peaks at around 24 hours and typically resolves within 48 hours. Cool compresses (not ice) and elevation reduce discomfort.",
        "Stage 3. Blistering (days 1 to 7). Blisters are common after laser sessions, especially with Q-switched systems. They are small to moderate, clear or slightly pink, and flatten within 3 to 7 days. Do not pop blisters. Allow them to drain naturally if they rupture, then keep the area clean and covered.",
        "Stage 4. Scabbing and crusting (days 5 to 14). Dark scabs form as blisters dry. Scabs may contain residual ink and look darker than the surrounding skin. They shed naturally within 7 to 14 days. Picking scabs significantly raises scarring risk and is the most common preventable cause of poor outcomes.",
        "Stage 5. Peeling and skin recovery (weeks 2 to 8). The final visible phase. Dry, flaky skin replaces the scab. Gradual fading of the underlying tattoo becomes visible. By the end of week 8, the skin should look settled at the surface even though immune clearance continues underneath. Persistent raised tissue beyond 8 weeks warrants a dermatology review.",
      ]),
      section("How Healing Differs Between Methods", [
        "Picosecond laser (used at clinics including LaserAway, Removery, MEDermis Laser Clinic, and other picosecond-equipped specialists). Lower thermal profile and shorter pulse duration tend to produce less blistering and faster surface healing per session compared to Q-switched. Frosting still occurs. The 6 to 8 week interval still applies because immune clearance is the rate-limiting step, not surface repair.",
        "Q-switched laser (older devices including Astanza Trinity, RevLite, and MedLite). Longer pulse duration delivers more thermal energy per pulse, which produces more blistering, more redness, and longer surface healing time per session. Standard interval is also 6 to 8 weeks. Outcomes can be excellent in skilled hands, particularly for solid black ink.",
        "TEPR, the non-laser mechanical method used by inkOUT. Treatment introduces a proprietary solution into the dermis to bind ink to a controlled scab. The scab forms over 5 to 10 days and sheds over 2 to 4 weeks, lifting ink with it. Recommended interval between sessions is generally 8 to 10 weeks. Healing is more visually disruptive during the scab phase but typically more predictable in timing because there is no immune-clearance variability.",
        "Saline removal (offered by specialty studios, often within tattoo or PMU studios). Mechanism is similar to TEPR: hypertonic saline draws ink toward the surface through osmosis, and a scab carries ink out as it heals. Scab phase is typically 2 to 4 weeks per session. Best clinical fit is cosmetic ink and small body tattoos.",
      ]),
      section("How Long Does Tattoo Removal Take to Heal?", [
        "Per-session healing breaks down roughly as follows. Surface inflammation: 24 to 48 hours. Blistering and scabbing: 5 to 14 days. Surface recovery: 2 to 3 weeks. Full cellular recovery and immune clearance: 6 to 8 weeks. The 6 to 8 week interval is the standard between sessions because that is when the body has cleared enough fragmented ink to make the next pulse useful.",
        "Total treatment course depends on the method. Picosecond laser typically completes professional tattoos in 6 to 10 sessions, or roughly 9 to 18 months. Q-switched laser typically takes 8 to 15 sessions, or 12 to 24 months. TEPR typically completes most cases in 3 to 5 sessions over 10 to 15 months. Saline depends on tattoo size and ink type and can extend longer for body tattoos.",
        "Healing speed varies by individual factors: tattoo size, skin type, age, immune function, smoking status, hydration, and aftercare adherence. Smokers and patients with poorly controlled diabetes typically heal slower at every stage.",
      ]),
      section("How Body Location Affects Healing", [
        "Tattoo location strongly influences both healing speed and total session count, because both depend on local lymphatic drainage. Areas with strong lymphatic drainage clear ink faster and heal more cleanly. Areas with weak drainage do the opposite.",
        "Faster healing and clearance: chest, upper back, neck, upper arms, shoulders. These areas sit close to major lymph node clusters and recover quickly per session.",
        "Average healing: thighs, abdomen, forearms.",
        "Slower healing and clearance: hands, fingers, lower legs, ankles, feet. These areas are farthest from major lymph clusters and have thinner skin with reduced perfusion. Total session count for tattoos in these locations is often 30 to 50 percent higher than the same tattoo on the upper body.",
        "Face and cosmetic ink locations (eyebrows, lip line, eyeliner): require extra healing precautions because of higher visibility, thinner skin, and higher risk of paradoxical ink darkening with laser. Non-laser methods such as saline or TEPR are often the safer first-line option for these areas.",
      ]),
      section("What Does Healed Tattoo Removal Look Like?", [
        "After one session, expect mild fading and a lighter overall appearance, with possible pinkness or temporary pigment change in the treated area. Most patients are surprised by how subtle the first-session result looks. This is normal. Cumulative fading does the work, not single sessions.",
        "Mid-treatment (sessions 4 to 6 for most patients), the tattoo appears noticeably faded. Edges typically clear before the densest ink in the center. Some color inks (red, orange, yellow) may persist while black and dark blue clear earlier.",
        "After completed treatment, most patients have skin that returns to near-normal appearance, with possible subtle pigment variation or texture difference visible only on close inspection. Complete clearance to indistinguishable skin is the typical outcome with picosecond laser on suitable cases. Some residual ghost ink can persist permanently in certain ink types or in patients whose immune systems do not fully clear fragments. Realistic expectation is meaningful clearance, not guaranteed invisibility.",
      ]),
      section("When Healing Is Not Normal", [
        "Signs of infection. Increasing pain after 48 hours rather than improving, yellow or green discharge, warmth or red streaks spreading beyond the treatment area, or fever. Contact your provider promptly. Untreated infection raises scarring risk substantially.",
        "Signs of scarring. Raised or thickened tissue persisting 8 to 12 weeks after the last session, keloid formation extending beyond the treatment area, or depressed skin texture. Prolonged pigment changes beyond 3 to 6 months also warrant evaluation.",
        "Signs of paradoxical darkening (cosmetic tattoos only). If a microblading, lip blush, or eyeliner tattoo darkens or shifts color after a laser session, contact your provider before scheduling another session. This is a known reaction with iron oxide and titanium dioxide pigments and is best avoided by using non-laser methods.",
        "Allergic reaction. Rare but possible, particularly with red and yellow inks. Symptoms include itching beyond normal healing, raised welts, or a spreading rash. Seek medical attention.",
      ]),
      section("How to Support Healing Between Sessions", [
        "Wait the full provider-recommended interval (usually 6 to 8 weeks for laser, 8 to 10 weeks for TEPR, and at least 6 weeks for saline). Faster intervals raise risk without improving total clearance.",
        "Protect the treated area from sun. Use SPF 30 or higher once the skin has fully closed, and physically cover the area when possible during direct exposure.",
        "Stay hydrated and eat well. Adequate protein, vitamin C, vitamin E, and zinc all support wound healing.",
        "Do not pick scabs or drain blisters. The scab is part of the healing structure. Premature removal is the most common cause of preventable scarring.",
        "Avoid smoking and minimize alcohol. Both reduce dermal perfusion and slow every stage of healing.",
        "See the aftercare guide for the full step-by-step protocol.",
      ]),
    ],
  },

  "tattoo-removal-scarring": {
    intro:
      "Tattoo removal can leave scars, but it usually does not when performed correctly by an experienced provider with proper aftercare. This guide separates normal healing from actual scarring, explains causes and risk factors, and covers prevention and treatment.",
    sections: [
      section("Does Tattoo Removal Leave Scars?", [
        "Tattoo removal can leave scars, but it usually does not when performed correctly by an experienced provider with proper aftercare. The honest answer is: scarring is a real risk, not a guaranteed outcome. Most people who complete tattoo removal with an experienced provider and follow aftercare instructions do not develop permanent scars.",
        "The confusion around tattoo removal scars comes from three sources: normal healing reactions (redness, blistering, scabbing, temporary pigment changes) being mistaken for scarring; low-quality providers using aggressive settings producing more scar cases; and poor patient aftercare (picking blisters, sun exposure, skipping healing time) causing preventable scarring.",
      ]),
      section("What Causes Tattoo Removal Scarring?", [
        "Tattoo removal scarring results from excessive tissue damage during treatment. The skin responds by producing collagen to repair the wound. When the damage exceeds what the skin can repair normally, excess collagen forms scar tissue.",
        "Main causes: excessive thermal energy (aggressive fluence settings causing burns), overtreatment (too many passes or sessions spaced too closely), infection (open blisters exposed to bacteria), patient behavior (picking blisters, peeling scabs, sun exposure), pre-existing scar tissue, and skin type (darker Fitzpatrick types are more prone to keloid formation).",
      ]),
      section("Normal Healing vs Scarring: How to Tell the Difference", [
        "Normal healing: redness and swelling (24–48 hrs), frosting (minutes), blistering (24–72 hrs), scabbing (days to 2 weeks), temporary hyper or hypopigmentation, mild itching.",
        "Signs of actual scarring: raised, firm tissue persisting beyond 3 months (hypertrophic); thickened tissue extending beyond the treatment area (keloid); depressed skin texture (atrophic); persistent textural change.",
        "When to be concerned: if the treated area remains raised, hard, or texturally different for more than 8–12 weeks after the last session.",
      ]),
      section("Blisters, Scabs, and Skin Changes: What Is Normal?", [
        "Tattoo removal blistering is common and usually normal. Do not pop blisters. Scabs form as blisters dry. Dark scabs may contain residual ink — do not pick them.",
        "Temporary hyperpigmentation and hypopigmentation are common, especially on darker skin types, and resolve within weeks to months. These are pigment changes, not scars.",
      ]),
      section("Hyperpigmentation and Hypopigmentation After Tattoo Removal", [
        "Hyperpigmentation (darkening) occurs from excess melanin production. More common in Fitzpatrick IV–VI skin types. Resolves within 3–6 months.",
        "Hypopigmentation (lightening) occurs when the treatment damages melanocytes. Takes 6–12 months to normalize. Rarely permanent. Neither hyperpigmentation nor hypopigmentation is a scar — they are pigment changes, not texture changes.",
      ]),
      section("Keloid and Hypertrophic Scars From Tattoo Removal", [
        "Hypertrophic scars are raised and firm but stay within the treatment area. They often improve over 6–12 months.",
        "Keloids extend beyond the treatment area. More common in darker skin types. Keloid-prone patients require conservative settings and close monitoring. Treatment options include silicone sheeting, corticosteroid injections, and pressure therapy.",
      ]),
      section("How to Prevent Scarring After Tattoo Removal", [
        "Choose an experienced provider. Follow aftercare instructions exactly. Avoid sun exposure during healing. Wait the full 6–8 weeks between sessions. Disclose your full medical history before treatment. Request conservative settings for the first session.",
        "See the aftercare guide for detailed instructions.",
      ]),
      section("How to Treat Scars After Tattoo Removal", [
        "Treatment options: silicone products (first-line), corticosteroid injections, fractional laser resurfacing, microneedling, pressure therapy, and surgical revision (last resort).",
        "Consult a dermatologist if scarring develops. Early treatment improves outcomes.",
      ]),
      section("When to See a Dermatologist", [
        "See a dermatologist if: a raised or textured area persists for 8–12 weeks; you suspect infection; a keloid is forming; or pigment changes have not improved after 6 months.",
      ]),
    ],
  },

  "tattoo-removal-side-effects": {
    intro:
      "Every tattoo removal method produces side effects. Most are temporary and expected. This guide covers the full list — common, less common, and rare — so you know what is normal and what is not before your first session.",
    sections: [
      section("What Side Effects to Expect", [
        "Every tattoo removal method produces side effects. Most are temporary and expected. Some are signs of a problem. The difference between the two is what this page covers.",
        "The most common mistake people make after a tattoo removal session is mistaking a normal side effect for a complication. Blistering is normal. Redness is normal. Temporary pigment changes are normal. Understanding the full list of expected side effects before your first session prevents unnecessary panic.",
        "This page covers side effects for both laser and non-laser methods. For the stage-by-stage healing timeline, see the healing process guide. For aftercare instructions, see the aftercare guide. For scarring specifically, see the scarring guide.",
      ]),
      section("Common Side Effects (Expected)", [
        "Redness and swelling appear within the first hour after treatment. They peak within 24 hours and typically resolve within 48 hours. The treated area will look inflamed and feel warm. This is the body's standard inflammatory response. When to be concerned: redness that spreads significantly beyond the treatment area, or swelling that worsens after 48 hours.",
        "Blistering is most common after laser sessions, especially with Q-switched systems. Small, clear or slightly pink blisters appearing within 24 to 72 hours are normal. Do not pop blisters. When to be concerned: blisters filled with yellow or green fluid, blisters continuing to grow after 72 hours, or significant pain or odor.",
        "Scabbing forms as blisters dry. Dark scabs are common because they may contain residual ink. Scabs typically form by day 5 and shed naturally within 7 to 14 days. Do not pick scabs — premature removal significantly increases scarring risk.",
        "Frosting (laser only) is the immediate white or gray discoloration from gas bubbles released when the laser interacts with ink particles. It fades within 10 to 30 minutes and requires no treatment.",
        "Tenderness and sensitivity are normal for several days after treatment. Most tenderness resolves within 3 to 5 days.",
        "Mild itching during the healing phase is common and indicates that the skin is repairing. Do not scratch the treated area.",
      ]),
      section("Less Common Side Effects", [
        "Hyperpigmentation (skin darkening) occurs when the treatment stimulates excess melanin production. More common in darker Fitzpatrick skin types (IV through VI) and in patients who expose the area to sun during healing. Usually resolves within 3 to 6 months.",
        "Hypopigmentation (skin lightening) occurs when the treatment damages melanocytes. More common after aggressive settings or multiple sessions on the same area. May take 6 to 12 months to normalize. In rare cases it can be permanent.",
        "Texture changes are usually temporary. Persistent texture changes beyond 3 months may indicate early scar formation. See the scarring guide.",
        "Ink darkening (cosmetic tattoos only): Some cosmetic tattoo pigments containing iron oxides or titanium dioxide can darken when exposed to laser energy — called paradoxical darkening. This is avoidable by using non-laser methods (saline) for cosmetic tattoos.",
        "Pinpoint bleeding at the treatment site is normal immediately after both laser and non-laser sessions and typically stops within minutes.",
      ]),
      section("Rare but Serious Side Effects", [
        "Infection occurs when bacteria enter the treated skin through open blisters or wounds. Signs include increasing pain after 48 hours, yellow or green discharge, warmth spreading beyond the treatment area, red streaks radiating outward, and fever. Seek medical attention promptly if you suspect infection.",
        "Scarring is uncommon with modern picosecond lasers and experienced providers. Three types: hypertrophic (raised, stays within treatment area), keloid (raised, extends beyond), and atrophic (depressed). See the scarring guide for full coverage.",
        "Allergic reaction: Rarely, the treatment process can release ink particles that trigger an allergic response. More common with certain ink colors, particularly red and yellow pigments.",
      ]),
      section("Side Effects by Method", [
        "Picosecond laser: Lower thermal profile than Q-switched. Less blistering, less scarring risk, faster healing. Frosting occurs. Hypopigmentation risk exists but is reduced.",
        "Q-switched laser: Higher thermal profile. More blistering, more redness, longer healing time per session. Higher scarring risk at aggressive settings.",
        "Saline removal: Non-laser. Produces a controlled scab that is part of the removal mechanism. No blistering in the laser sense. Main risk is scarring from overworking the skin or picking the scab.",
      ]),
      section("How to Reduce Side Effects", [
        "Choose an experienced provider. Follow aftercare instructions. Wait the full 6 to 8 weeks between sessions. Disclose your medical history. Avoid sun before and after treatment.",
        "See the aftercare guide for detailed post-treatment care instructions.",
      ]),
    ],
  },
};

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  for (const [slug, content] of Object.entries(guides)) {
    console.log(`\nPatching: ${slug}`);

    // Find the document by slug
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_type == "guide" && slug.current == $slug][0]{ _id }`,
      { slug }
    );

    if (!doc) {
      console.log(`  ⚠️  No Sanity document found for slug: ${slug}`);
      continue;
    }

    console.log(`  Found document: ${doc._id}`);

    await client
      .patch(doc._id)
      .set({ intro: content.intro, sections: content.sections })
      .commit();

    console.log(`  ✅ Patched intro + ${(content.sections as object[]).length} sections`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
