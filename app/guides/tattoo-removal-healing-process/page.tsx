import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";

export const metadata: Metadata = {
  title: "Tattoo Removal Healing Process | RealTattooReviews",
  description:
    "Understand the tattoo removal healing process stage by stage, including what normal healing looks like, how long recovery takes, and when reactions may be off track.",
  openGraph: {
    title: "Tattoo Removal Healing Process",
    description:
      "Understand the tattoo removal healing process stage by stage, including what normal healing looks like, how long recovery takes, and when reactions may be off track.",
  },
};

const faqs = [
  {
    question: "How long does tattoo removal take to heal?",
    answer:
      "Surface healing after laser typically settles within 1 to 2 weeks per session. Full cellular recovery takes 6 to 8 weeks. TEPR and saline have a visible 2 to 4 week scabbing phase per session, with full recovery taking 6 to 10 weeks. The full treatment course takes 10 to 15 months for TEPR and 18 to 36 months or more for laser.",
  },
  {
    question: "What does tattoo removal healing look like?",
    answer:
      "In the first 72 hours: redness, warmth, swelling, and possibly frosting or blistering with laser. Over the following 2 weeks: blisters drain or rupture, scabs form and begin to separate. Weeks 2 to 4: peeling, flaking, itching, and gradual improvement. By weeks 4 to 8: the skin looks settled at the surface even as the immune system continues clearing ink beneath.",
  },
  {
    question: "How long does laser tattoo removal take to heal?",
    answer:
      "Visible surface healing settles within 1 to 2 weeks for most patients. Full cellular healing, including immune system clearing of fragmented ink, takes 6 to 8 weeks. This is why providers recommend that interval between sessions.",
  },
  {
    question: "Is redness after tattoo removal normal?",
    answer:
      "Yes. Redness is a normal inflammatory response in the first days after treatment. It should decrease day by day after the first 72 hours. Redness that increases after day 3 or persists unchanged past 2 weeks is worth discussing with your provider.",
  },
  {
    question: "How long does blistering last after tattoo removal?",
    answer:
      "Blisters from laser treatment typically develop within 24 hours and drain or rupture naturally within 1 to 2 weeks. Do not pop them. Once they open, keep the area clean and protected.",
  },
  {
    question: "What is frosting during tattoo removal?",
    answer:
      "Frosting is a temporary white discoloration that appears immediately after laser pulses. It results from rapid heating of ink particles releasing carbon dioxide gas in the skin. It typically fades within 20 to 30 minutes and is a normal treatment response, not a sign of a burn or complication.",
  },
  {
    question: "Why is my tattoo not fading between sessions?",
    answer:
      "Ink clearance is driven by the immune system and takes time. Most fading happens in the 4 to 8 week window after treatment, not immediately. If fading appears to have stalled after several sessions with appropriate spacing, discuss with your provider whether treatment parameters need adjustment.",
  },
  {
    question: "How long does tattoo removal scabbing last?",
    answer:
      "With laser, scabbing typically forms and resolves within 1 to 2 weeks. With TEPR and saline, the scabbing phase lasts 2 to 4 weeks per session. Do not interfere with scabs. They separate naturally when healing is complete.",
  },
];

const stages = [
  {
    label: "Stage 1",
    title: "Immediate reaction",
    timing: "0 to 72 hours",
    body: "In the first hours after treatment, the area will be red, warm, tender, and possibly swollen. With laser treatment, you may also see frosting, a temporary white discoloration caused by rapid heating of the ink particles releasing carbon dioxide gas. Frosting typically fades within 20 to 30 minutes and is a normal treatment response, not a burn. Blistering is common with laser treatment and usually develops within the first 24 hours. With TEPR and saline, the wound phase begins immediately and a controlled scab starts to form.",
  },
  {
    label: "Stage 2",
    title: "Blistering and scabbing",
    timing: "Days 2 to 14",
    body: "Blisters from laser treatment range from small to occasionally large. They are part of the body's normal wound response. The key instruction at this stage is consistent across methods: do not pop blisters, do not pick scabs. The tissue underneath is regenerating. Disturbing it interrupts the process and is one of the most common causes of avoidable scarring. With TEPR and saline, the scab is not a side effect. It is the mechanism. Ink bonds to the healing scab and lifts out as it separates naturally. Interfering with it prevents the treatment from working. Redness continues to fade. Swelling resolves. The treated area may look and feel dry.",
  },
  {
    label: "Stage 3",
    title: "Peeling and skin renewal",
    timing: "Weeks 2 to 4",
    body: "Scabs dry, harden, and begin to separate naturally. Peeling and flaking are normal at this stage. Some patients experience itching as new skin generates underneath. Avoid scratching. With laser, most patients reach a settled appearance within this window. With TEPR and saline, the scabbing phase may still be completing. Some residual redness or mild texture change is normal and typically improves with time.",
  },
  {
    label: "Stage 4",
    title: "Cellular recovery",
    timing: "Weeks 4 to 8",
    body: "Surface healing is largely complete for most patients. Underneath the surface, the immune system is still clearing fragmented ink through a process involving macrophages, the white blood cells that engulf and transport ink particles to lymph nodes. This is why fading continues for weeks after a session even after the skin looks settled. The full 6 to 8 week recovery window allows this process to complete before the area is treated again.",
  },
  {
    label: "Stage 5",
    title: "Fading and ink clearance",
    timing: "Ongoing between sessions",
    body: "Ink continues to fade between sessions. The immune response triggered by each session has a longer tail than most patients expect. Some patients see meaningful fading in the 4 to 8 week window after treatment even as the skin looks entirely healed at the surface.",
  },
];

export default function TattooRemovalHealingProcessPage() {
  return (
    <GuideLayout
      breadcrumb="Tattoo Removal Healing Process"
      h1={<>Tattoo Removal <span className="text-(--accent)">Healing Process</span></>}
      description="Understand the tattoo removal healing process stage by stage, including what normal healing looks like, how long recovery takes, and when reactions may be off track."
      faqs={faqs}
    >
      {/* Intro card */}
      <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Healing after tattoo removal is not instant, and it does not look the
          same for every person or method. Most patients go through a
          predictable sequence of reactions: redness and inflammation first,
          then blistering or scabbing depending on the method, then gradual
          skin recovery over several weeks. Understanding this sequence reduces
          anxiety and helps you tell the difference between normal healing and a
          sign that something needs attention.
        </p>
      </div>

      {/* Section 1 */}
      <GuideSection heading="How Long Does Tattoo Removal Take to Heal?">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          The honest answer depends on the removal method, the tattoo, and your
          skin.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          For laser tattoo removal, visible surface reactions including redness,
          swelling, and blistering typically settle within 1 to 2 weeks after
          each session. Full cellular healing, where the body has completely
          processed fragmented ink and regenerated the treated tissue, takes the
          6 to 8 weeks of spacing most providers recommend between sessions.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          For TEPR (non-laser) and saline methods, the surface healing phase is
          longer and more visible. A scabbing phase lasting 2 to 4 weeks is
          expected per session. Some providers recommend 8 to 10 weeks between
          sessions to allow complete recovery before re-wounding the area.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Neither method produces instant results. The overall treatment
          timeline across all sessions is typically 10 to 15 months for TEPR
          and 18 to 36 months or longer for laser, depending on the tattoo and
          individual response.
        </p>
        <GuideCallout>
          The healing window between sessions is not just waiting time. The
          body is actively processing fragmented ink through the lymphatic and
          immune systems during this period. Rushing re-treatment before this
          process completes reduces effectiveness and raises complication risk.
        </GuideCallout>
      </GuideSection>

      {/* Section 2 */}
      <GuideSection heading="Tattoo Removal Healing Stages">
        <div className="space-y-4">
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              className="rounded-xl border border-(--line) bg-(--surface) p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-(--ink)">
                    {stage.title}
                  </p>
                  <p className="text-[12px] text-(--muted)">{stage.timing}</p>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-(--muted)">
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </GuideSection>

      {/* Section 3 */}
      <GuideSection heading="What Normal Healing Looks Like">
        <div className="space-y-4">
          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[14px] font-semibold text-(--ink)">
              Laser tattoo removal healing
            </p>
            <div className="space-y-2">
              {[
                {
                  timing: "Days 1 to 3",
                  desc: "Redness, warmth, swelling, frosting (fades in minutes), blistering possible.",
                },
                {
                  timing: "Days 4 to 14",
                  desc: "Blisters drain or rupture naturally, scabbing forms, redness reduces, area begins to look drier.",
                },
                {
                  timing: "Weeks 2 to 4",
                  desc: "Scabs separate, skin peels, itching possible, redness and texture change continue to improve.",
                },
                {
                  timing: "Weeks 4 to 8",
                  desc: "Skin looks settled, some residual pinkness possible, ink continues to fade.",
                },
              ].map((row) => (
                <div key={row.timing} className="flex gap-3 text-[13px]">
                  <span className="w-24 shrink-0 font-medium text-(--ink)">
                    {row.timing}
                  </span>
                  <span className="leading-relaxed text-(--muted)">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[14px] font-semibold text-(--ink)">
              TEPR healing
            </p>
            <div className="space-y-2">
              {[
                {
                  timing: "Days 1 to 3",
                  desc: "Controlled wound phase begins, area is raw, redness and swelling present.",
                },
                {
                  timing: "Days 4 to 14",
                  desc: "Scab forms and develops across the treated area, weeping possible in early days.",
                },
                {
                  timing: "Weeks 2 to 4",
                  desc: "Scab dries, thickens, and begins to separate. Do not pull it. Let it lift naturally.",
                },
                {
                  timing: "Weeks 4 to 8",
                  desc: "Scab has separated, new skin present, some redness or texture change improving. Ink that bonded to the scab has been removed.",
                },
              ].map((row) => (
                <div key={row.timing} className="flex gap-3 text-[13px]">
                  <span className="w-24 shrink-0 font-medium text-(--ink)">
                    {row.timing}
                  </span>
                  <span className="leading-relaxed text-(--muted)">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
            <p className="mb-3 text-[14px] font-semibold text-(--ink)">
              Saline healing
            </p>
            <p className="text-[14px] leading-relaxed text-(--muted)">
              Follows a similar pattern to TEPR. Scab formation is the key
              phase. Healing timeline is similar: 2 to 4 weeks of visible
              scabbing, 6 to 8 weeks for full recovery before the next session.
            </p>
          </div>
        </div>
      </GuideSection>

      {/* Section 4 */}
      <GuideSection heading="What Affects Healing Speed and Quality">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Not everyone heals at the same rate. These are the main factors that
          affect how quickly and cleanly the skin recovers.
        </p>
        <div className="space-y-3">
          {[
            {
              title: "Removal method",
              body: "Laser leaves the skin surface relatively intact. TEPR and saline produce open wounds that require a longer, more visible healing phase. Neither is better overall, but the healing experiences are meaningfully different and should be factored into session timing decisions.",
            },
            {
              title: "Tattoo and session factors",
              body: "Larger tattoos and denser ink require more tissue disruption per session, which can extend the healing phase. Older tattoos may contain ink at varying depths, affecting how the skin responds.",
            },
            {
              title: "Skin type",
              body: "Patients with Fitzpatrick V and VI skin tones may experience more pronounced post-inflammatory pigmentation changes during healing. Proper settings for skin type reduce both treatment risk and recovery complications.",
            },
            {
              title: "Aftercare compliance",
              body: "Sun exposure, picking, swimming, and using unapproved products are the most common causes of extended healing and avoidable complications.",
            },
            {
              title: "Immune system and general health",
              body: "The immune system does the clearing work between sessions. Patients who are unwell, under significant stress, or have suppressed immune function may experience slower fading and longer recovery.",
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
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Full aftercare guidance is covered in the{" "}
          <Link
            href="/guides/tattoo-removal-aftercare"
            className="text-accent hover:underline"
          >
            tattoo removal aftercare guide
          </Link>
          .
        </p>
      </GuideSection>

      {/* Section 5 */}
      <GuideSection heading="When Healing Is Not Normal">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Most reactions after tattoo removal are expected. The following
          indicate the healing may be off track and warrant contacting your
          provider.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Contact your provider if you notice:
        </p>
        <GuideBulletList
          variant="warning"
          items={[
            "Redness, warmth, or swelling that increases rather than decreases after day 3",
            "Discharge that is yellow, green, or foul-smelling",
            "Increasing pain over the first week rather than decreasing pain",
            "Fever or feeling unwell in the days after treatment",
            "Raised tissue that grows rather than flattens over weeks",
            "Pigmentation change that is still present and unchanged at 6 months",
            "Skin that has not reached the expected healed state for your method and timeline",
          ]}
        />
        <GuideCallout>
          The clearest distinction between normal healing and infection is
          direction. Normal healing gets better day by day after the first 72
          hours. Infection gets worse. If redness, warmth, or swelling is still
          increasing after day 3, contact your provider the same day rather than
          waiting.
        </GuideCallout>
      </GuideSection>

      {/* Section 6 */}
      <GuideSection heading="Healing Differences by Body Area">
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Areas with better circulation, such as the upper chest and upper
          arms, tend to heal faster and show better fading results. Areas
          further from the heart, particularly the feet and ankles, have slower
          circulation, slower immune clearing, and slower healing overall.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Areas over bone with thin skin, such as ribs, shins, and knuckles,
          tend to produce more intense immediate reactions. Areas on the face
          and neck typically have excellent circulation and heal relatively
          quickly, but they are also more visible during the healing phase.
        </p>
        <p className="text-[15px] leading-relaxed text-(--muted)">
          Joint areas including knees, elbows, and wrists experience more
          friction and movement during healing. Extra care is needed to protect
          these areas from irritation between sessions.
        </p>
      </GuideSection>

      <GuideRelatedLinks
        links={[
          {
            href: "/guides/tattoo-removal-aftercare",
            title: "Tattoo Removal Aftercare",
            desc: "What to do between sessions to protect skin, reduce risk of scarring, and support fading.",
          },
          {
            href: "/guides/tattoo-removal-scarring",
            title: "Tattoo Removal Scarring",
            desc: "When scarring happens, why it happens, and how to evaluate your risk before and after treatment.",
          },
        ]}
      />
    </GuideLayout>
  );
}
