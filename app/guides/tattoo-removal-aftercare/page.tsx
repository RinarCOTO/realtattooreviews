import type { Metadata } from "next";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideSection from "@/components/guide/GuideSection";
import GuideTable from "@/components/guide/GuideTable";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";

export const metadata: Metadata = {
  title: "Tattoo Removal Aftercare | RealTattooReviews",
  description:
    "Learn tattoo removal aftercare for laser and saline methods, including what to do in the first 24 hours, what to avoid, saniderm removal timing, and warning signs to watch for.",
  openGraph: {
    title: "Tattoo Removal Aftercare",
    description:
      "Learn tattoo removal aftercare for laser and saline methods, including what to do in the first 24 hours, what to avoid, saniderm removal timing, and warning signs to watch for.",
  },
};

const faqs = [
  {
    question: "What should I do after tattoo removal?",
    answer:
      "Keep the area clean and covered, avoid sun, do not pick blisters or scabs, and use only approved products. In the first 24 hours: leave the dressing in place, stay out of the sun, and avoid getting the area wet.",
  },
  {
    question: "What should I not do after tattoo removal?",
    answer:
      "Do not pick, scratch, or peel blisters or scabs. Do not expose to direct sunlight. Do not swim or soak. Do not apply unapproved products. Do not exercise heavily for 48 hours. Do not re-treat before the full interval.",
  },
  {
    question: "When should I remove Saniderm after tattoo removal?",
    answer:
      "Within 24 to 48 hours after laser removal. Remove slowly in the direction of hair growth. For TEPR, follow your provider's specific instructions.",
  },
  {
    question: "What cream should I use after tattoo removal?",
    answer:
      "Thin layer of petroleum-based ointment (Aquaphor) in early healing. Unscented moisturiser once blistering has settled. SPF 30 or higher on fully healed skin. Avoid fragrance, alcohol, retinol, and active ingredients during healing.",
  },
  {
    question: "When can I shower after tattoo removal?",
    answer:
      "Avoid getting the area wet for 24 hours. After that, brief showers with mild pressure are acceptable. Pat dry gently. Avoid hot water and high pressure on the treated area.",
  },
  {
    question: "When can I exercise after tattoo removal?",
    answer:
      "Light activity after 24 hours. Heavy exercise and significant sweating: avoid for 48 hours.",
  },
  {
    question: "How long does tattoo removal take to heal between sessions?",
    answer:
      "Surface healing after laser: 1 to 2 weeks. Full cellular healing: 6 to 8 weeks (the standard session interval). TEPR and saline: 2 to 4 week scabbing phase, 8 to 10 weeks between sessions for some providers.",
  },
  {
    question: "Is it normal for the area to look worse before it looks better?",
    answer:
      "Yes. Redness, swelling, and blistering are expected in the first days. With TEPR and saline, scabbing makes the area look disrupted before it heals. If the area looks worse specifically after day 3, contact your provider.",
  },
];

export default function TattooRemovalAftercarePage() {
  return (
    <GuideLayout
      breadcrumb="Tattoo Removal Aftercare"
      h1="Tattoo Removal Aftercare"
      description="What to do in the first 24 hours, what to avoid, when to remove Saniderm, and warning signs to watch for after laser, TEPR, and saline tattoo removal."
      faqs={faqs}
    >
      {/* Intro card */}
      <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Good aftercare does not erase a bad treatment decision, but poor
          aftercare can undo a good one. The most common avoidable problems
          after tattoo removal are infection from picking, sun damage during
          healing, and irritation from using the wrong products. Most
          complications are preventable.
        </p>
      </div>

      {/* Section 1 */}
      <GuideSection heading="What to Do in the First 24 Hours">
        <ol className="space-y-3">
          {[
            "Keep the dressing your provider applied in place for the time they specified. Do not remove it early.",
            "If the area feels warm or swollen, apply a cold pack wrapped in a clean cloth for 10 to 15 minutes. Do not apply ice directly.",
            "Avoid touching the area with unwashed hands.",
            "Do not shower or get the area wet for at least 24 hours.",
            "Avoid tight or rough clothing over the treated area.",
            "Do not apply any unapproved topical products.",
            "Stay out of the sun.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[12px] font-bold text-white">
                {i + 1}
              </span>
              <p className="pt-0.5 text-[15px] leading-relaxed text-(--muted)">
                {step}
              </p>
            </li>
          ))}
        </ol>
        <GuideCallout>
          Blistering in the first 24 hours is a normal and expected reaction
          after laser. Do not pop blisters. Allow them to drain or rupture on
          their own.
        </GuideCallout>
      </GuideSection>

      {/* Section 2 */}
      <GuideSection heading="Laser vs TEPR Aftercare">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[14px] font-semibold text-(--ink)">
              Laser
            </p>
            <p className="mb-3 text-[14px] leading-relaxed text-(--muted)">
              Most patients have minimal visible wound. Skin may blister. Active
              healing settles within 1 to 2 weeks. Most patients return to
              normal activity same day.
            </p>
            <GuideBulletList
              items={[
                "Keep blisters intact",
                "Avoid sun exposure",
                "Do not pick scabs",
                "Moisturise once blistering settles",
                "Wait the full 6 to 8 weeks before next session",
              ]}
            />
          </div>
          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[14px] font-semibold text-(--ink)">
              TEPR (e.g. inkOUT)
            </p>
            <p className="mb-3 text-[14px] leading-relaxed text-(--muted)">
              Creates a controlled wound. Area will scab, weep, and heal over 2
              to 4 weeks per session. The scab is the mechanism: ink bonds to it
              and lifts out.
            </p>
            <GuideBulletList
              items={[
                "Do not disturb the scab under any circumstances",
                "Picking is the most common cause of scarring",
                "Plan session timing around the 2 to 4 week healing window",
              ]}
            />
          </div>
        </div>
      </GuideSection>

      {/* Section 3 */}
      <GuideSection heading="When to Remove Saniderm After Tattoo Removal">
        <GuideTable
          headers={["Timing", "Guidance"]}
          rows={[
            [
              "0 to 24 hrs",
              "Leave the dressing in place. Some redness and fluid under the film is normal.",
            ],
            [
              "24 to 48 hrs",
              "Remove Saniderm within this window after laser treatment. Remove slowly in the direction of hair growth.",
            ],
            [
              "After removal",
              "Wash gently with mild unscented soap. Pat dry. Apply thin layer of approved ointment if recommended.",
            ],
            [
              "TEPR method",
              "Follow provider's specific instructions. Do not apply second-skin products to TEPR healing areas without approval.",
            ],
          ]}
        />
        <GuideCallout>
          If Saniderm becomes saturated or leaks, remove earlier than planned.
          A saturated dressing no longer protects the area.
        </GuideCallout>
      </GuideSection>

      {/* Section 4 */}
      <GuideSection heading="What to Avoid After Tattoo Removal">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-(--muted)">
              Do
            </p>
            <GuideBulletList
              items={[
                "Apply approved healing ointment thinly once or twice daily",
                "Wear SPF 30 or higher on the area once healing is complete",
                "Keep the area clean with mild, unscented soap",
                "Wear loose, breathable clothing",
                "Contact your provider if anything looks unusual",
                "Wait the full interval between sessions",
              ]}
            />
          </div>
          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-(--muted)">
              Avoid
            </p>
            <GuideBulletList
              variant="warning"
              items={[
                "Picking, scratching, or peeling scabs or blisters",
                "Direct sun exposure during healing",
                "Swimming, hot tubs, ocean, or soaking",
                "Heavy exercise for 48 hours",
                "Makeup, perfume, or unapproved products",
                "Tight clothing that rubs the area",
                "Shaving over the area until fully healed",
                "Alcohol-based products or active ingredients",
              ]}
            />
          </div>
        </div>
        <div className="space-y-3">
          {[
            {
              title: "Sun exposure",
              body: "Melanin production is disrupted during healing. Avoid direct sun throughout the full course of treatment. Apply SPF 30 or higher as standard once healing is complete.",
            },
            {
              title: "Swimming and soaking",
              body: "Avoid all soaking until fully healed. Typically 2 weeks after laser and up to 4 weeks after TEPR.",
            },
            {
              title: "Exercise",
              body: "Avoid heavy sweating for 48 hours. Light activity that does not cause sweating is acceptable.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-(--line) bg-(--surface) p-5"
            >
              <p className="mb-1 text-[14px] font-semibold text-(--ink)">
                {card.title}
              </p>
              <p className="text-[14px] leading-relaxed text-(--muted)">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </GuideSection>

      {/* Section 5 */}
      <GuideSection heading="Products and Ointments">
        <GuideTable
          headers={["Product", "Recommendation", "Notes"]}
          rows={[
            [
              "Aquaphor / petroleum ointment",
              <Badge key="a" type="positive">Recommended</Badge>,
              "Thin layer, 1 to 2 times daily during early healing",
            ],
            [
              "Unscented moisturiser (Cetaphil, CeraVe)",
              <Badge key="b" type="positive">Recommended</Badge>,
              "Once blistering has settled",
            ],
            [
              "SPF 30 or higher sunscreen",
              <Badge key="c" type="positive">Recommended</Badge>,
              "On fully healed skin before sun exposure. Mineral SPF preferred.",
            ],
            [
              "Antibiotic ointment (Neosporin)",
              <Badge key="d" type="caution">Use with caution</Badge>,
              "Only if recommended by provider. Some patients react to neomycin.",
            ],
            [
              "Vitamin C or brightening serums",
              <Badge key="e" type="negative">Avoid during healing</Badge>,
              "Active ingredients irritate healing skin",
            ],
            [
              "Retinol / retinoids",
              <Badge key="f" type="negative">Avoid during healing</Badge>,
              "Can delay healing and increase irritation",
            ],
            [
              "Fragrance or alcohol-based products",
              <Badge key="g" type="negative">Avoid</Badge>,
              "Irritate healing skin and increase infection risk",
            ],
          ]}
        />
      </GuideSection>

      {/* Section 6 */}
      <GuideSection heading="Aftercare Instructions for Saline Tattoo Removal">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Saline removal creates a controlled wound similar to TEPR. The area
          will scab and heal over several weeks. Do not disturb the scab. The
          scab is the vehicle through which ink leaves the skin.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          For PMU and microblading saline removal: avoid moisture, makeup, or
          skincare products until fully healed. Follow your technician's
          instructions exactly.
        </p>
      </GuideSection>

      {/* Section 7 */}
      <GuideSection heading="Tattoo Removal Healing Time Between Sessions">
        <GuideTable
          headers={["Phase", "Timeline"]}
          rows={[
            [
              "Active inflammation",
              "Days 1 to 3: redness, swelling, blistering (laser), wound phase begins (TEPR/saline)",
            ],
            [
              "Scabbing and crusting",
              "Days 4 to 14: scabs form and begin to separate. Do not pick.",
            ],
            [
              "Surface healing",
              "Weeks 2 to 4: settles for most laser patients. TEPR/saline may still be in late scabbing phase.",
            ],
            [
              "Full cellular healing",
              "6 to 8 weeks: standard interval before next session",
            ],
            [
              "TEPR/saline interval",
              "Some providers recommend 8 to 10 weeks between sessions",
            ],
          ]}
        />
      </GuideSection>

      {/* Section 8 */}
      <GuideSection heading="Warning Signs: When to Call Your Provider">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Contact your provider if you notice:
        </p>
        <GuideBulletList
          variant="warning"
          items={[
            "Worsening redness or swelling after day 3, not improving",
            "Discharge that is yellow, green, or foul-smelling",
            "Increasing pain rather than decreasing over the first week",
            "Fever or feeling unwell after treatment",
            "Raised, thickened tissue that grows rather than flattens",
            "Skin that has not healed at the expected time",
            "Pigmentation change still present and unchanged at 6 months",
            "Any reaction you are uncertain about",
          ]}
        />
        <GuideCallout>
          Normal healing produces decreasing redness over the first week.
          Infection produces increasing redness, warmth, swelling, or discharge
          that worsens after day 3.
        </GuideCallout>
      </GuideSection>

      {/* Section 9 */}
      <GuideSection heading="Aftercare for Eyebrow Tattoo Removal and Permanent Makeup">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Keep the area completely dry for the first 7 days. No makeup,
          skincare, or unapproved products.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          For microblading and PMU saline removal: the scab phase is critical.
          Do not touch, peel, or apply unapproved products. Any interference
          disrupts the removal process and can cause scarring or incomplete
          removal.
        </p>
      </GuideSection>

      <GuideRelatedLinks
        links={[
          {
            href: "/guides/tattoo-removal-scarring",
            title: "Tattoo Removal Scarring",
            desc: "When scarring happens, why it happens, and how to evaluate your risk before and after treatment.",
          },
          {
            href: "/guides/tattoo-removal-healing-process",
            title: "The Tattoo Removal Healing Process",
            desc: "A timeline of what to expect after each session: blistering, scabbing, fading, and how long full healing takes.",
          },
        ]}
      />
    </GuideLayout>
  );
}

function Badge({
  type,
  children,
}: {
  type: "positive" | "negative" | "caution";
  children: React.ReactNode;
}) {
  const styles = {
    positive: "bg-green-100 text-green-700",
    negative: "bg-red-100 text-red-700",
    caution: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
}
