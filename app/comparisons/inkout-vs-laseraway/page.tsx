
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import MonoLabel from "@/components/reviews/MonoLabel";
import GuideFAQSection from "@/components/guide/GuideFAQSection";
import BrandComparisonEvidence from "@/components/comparison/BrandComparisonEvidence";
import ContentCard from "@/components/comparison/ContentCard";
import BrandTableHeader from "@/components/comparison/BrandTableHeader";
import ComparisonHero from "@/components/comparison/ComparisonHero";
import PageSection from "@/components/reviews/PageSection";
import SectionHeading from "@/components/guide/SectionHeading";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "inkOUT vs LaserAway: TEPR vs PicoSure Compared (2026) | RealTattooReviews",
  description:
    "Compare inkOUT and LaserAway side by side. TEPR vs PicoSure, specialist vs chain, pricing, pain, scarring risk, and which provider fits your tattoo removal needs.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/inkout-vs-laseraway",
  },
  openGraph: {
    title: "inkOUT vs LaserAway: TEPR vs PicoSure Compared (2026)",
    description:
      "Compare inkOUT and LaserAway side by side. TEPR vs PicoSure, specialist vs chain, pricing, pain, scarring risk, and which provider fits your tattoo removal needs.",
  },
};

const faqs = [
  {
    question: "Is inkOUT better than LaserAway?",
    answer:
      "Neither is universally better. inkOUT is better suited for non-laser preference, cosmetic tattoo removal, darker skin tones avoiding laser-melanin interaction, and users wanting a specialist provider. LaserAway is better suited for users wanting a mainstream aesthetics chain with wide access and the ability to bundle services. Match the provider to your case.",
  },
  {
    question: "Is inkOUT cheaper than LaserAway?",
    answer:
      "Neither publishes pricing online. A real comparison requires quotes at both providers. Total cost depends on session count, which depends on the tattoo. inkOUT offers free consultations. LaserAway consultation policies vary by location. Two consultations produce two comparable quotes.",
  },
  {
    question: "Which has better tattoo removal results, inkOUT or LaserAway?",
    answer:
      "Both target clearance. Results depend on the tattoo, the ink, the skin, and the provider's protocol more than the brand name. PicoSure has peer-reviewed evidence showing strong clearance rates. TEPR targets complete removal as the default goal. The cross-city evidence table on this page will show outcome data for both brands once LaserAway review data enters our dataset.",
  },
  {
    question: "What laser does LaserAway use?",
    answer:
      "LaserAway uses Cynosure PicoSure, a picosecond laser. The primary wavelength is 755nm (alexandrite). PicoSure Pro adds optional 532nm and 1064nm wavelengths for broader color and skin-type coverage.",
  },
  {
    question: "What type of laser does LaserAway use for tattoo removal?",
    answer:
      "LaserAway uses a picosecond laser, specifically the Cynosure PicoSure. Picosecond lasers deliver pulses in trillionths of a second. They shatter ink particles more efficiently than older Q-switched nanosecond lasers. PicoSure was the first picosecond aesthetic laser to receive FDA clearance.",
  },
  {
    question: "Is LaserAway worth it?",
    answer:
      "For users with standard body tattoos in markets where LaserAway is conveniently located, it is a reasonable mainstream option. PicoSure has strong clinical evidence. The chain's broad service mix means tattoo removal is one of many offerings. For edge cases, a specialist may be a better fit. See /reviews/laseraway for the full picture.",
  },
  {
    question: "Is LaserAway legit?",
    answer:
      "Yes. LaserAway is a legitimate, established national aesthetics chain. It uses FDA-cleared Cynosure PicoSure technology. The brand operates in major metros across the US. LaserAway reviews on Google reflect the full service mix, not just tattoo removal.",
  },
  {
    question: "Is TEPR better than PicoSure?",
    answer:
      "TEPR and PicoSure are different categories of treatment. TEPR is non-laser. PicoSure is laser. TEPR is not bound by ink-color or melanin interaction. PicoSure has strong evidence on blue, green, red, and black inks with its multi-wavelength platform. The right question is which mechanism fits your case, not which is universally better.",
  },
  {
    question: "Which is better for dark skin?",
    answer:
      "For darker Fitzpatrick skin types prioritizing avoidance of laser-pigment-change risk, TEPR (inkOUT) is structurally lower-risk. PicoSure's 755nm has a higher melanin absorption ratio than 1064nm. The optional 1064nm handpiece is safer for darker skin. Availability and clinician expertise vary by LaserAway location.",
  },
  {
    question: "Which is better for color ink?",
    answer:
      "PicoSure handles blue and green well at 755nm. Optional 532nm covers red, orange, and yellow. TEPR is not wavelength-bound. For mixed-color tattoos, both are reasonable starting points. Consultation-specific ink assessment is the better guide.",
  },
  {
    question: "Which is better for complete removal?",
    answer:
      "Both can deliver complete removal. inkOUT positions TEPR around complete removal as the default outcome. LaserAway frames tattoo removal as one service within a broader aesthetics platform. The positioning difference matters for how the provider sets expectations and designs the treatment plan.",
  },
  {
    question: "How many sessions does inkOUT take vs LaserAway?",
    answer:
      "Session counts vary by case. PicoSure evidence shows greater than 75% clearance in an average of four to five sessions for standard cases. More sessions may be needed for complete removal. TEPR session counts vary by tattoo size, ink density, and skin response. Both methods require sessions spaced weeks apart. Get estimates at the free consultation.",
  },
];

const PAGE_PATH = "/comparisons/inkout-vs-laseraway";
const SITE_URL = "https://realtattooreviews.com";

const GLANCE_ROWS: [string, string, string][] = [
  ["Method", "TEPR (Trans-Epidermal Pigment Release)", "Cynosure PicoSure (picosecond laser)"],
  ["Modality category", "Non-laser", "Laser"],
  ["Primary wavelength dependency", "None (mechanism is not light-based)", "755nm alexandrite primary; optional 532nm and 1064nm"],
  ["Business model", "Tattoo removal specialist", "Multi-service aesthetics chain"],
  ["Service focus", "Tattoo removal only", "Tattoo removal, laser hair removal, body contouring, injectables, skin rejuvenation"],
  ["Footprint", "Smaller, focused locations", "Large national chain with locations across major metros"],
  ["Pricing model", "Per-session and package options", "Per-session pricing; varies by location"],
  ["Best fit category", "Complete removal, cosmetic tattoos, non-laser preference, difficult cases", "Mainstream laser removal, broad aesthetics access, convenience"],
  ["Less ideal for", "Users wanting wide geographic access, service bundling, or a large public review base", "Edge cases (cosmetic tattoo, dark skin, stubborn ink) where specialist depth matters most"],
  ["Free consultation", "Yes", "Varies by location"],
];

export default function InkoutVsLaserawayPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "inkOUT vs LaserAway", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "inkOUT vs LaserAway: TEPR vs PicoSure Compared (2026)",
    description:
      "Compare inkOUT and LaserAway side by side. TEPR vs PicoSure, specialist vs chain, pricing, pain, scarring risk, and which provider fits your tattoo removal needs.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["inkOUT vs LaserAway", "TEPR vs PicoSure", "Tattoo removal comparison"],
  };

  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <ComparisonHero
        label={
          <>
            <Link href="/comparisons" className="hover:text-(--ink) transition-colors">
              Comparisons
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              inkOUT vs LaserAway
            </span>
          </>
        }
        title={
          <>
            inkOUT vs <span className="text-(--accent)">LaserAway</span>
          </>
        }
        subtitle="Compare TEPR and PicoSure tattoo removal, including specialist vs chain, pricing, pain, scarring risk, and which provider fits different use cases."
      />

      {/* Intro */}
      <PageSection bg="surface">
        <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl m-0">
            inkOUT and LaserAway represent two fundamentally different approaches to tattoo
            removal. LaserAway is a large multi-service aesthetics chain. It offers tattoo
            removal alongside laser hair removal, body contouring, injectables, and other
            cosmetic procedures. LaserAway uses Cynosure PicoSure, a picosecond laser built
            around a 755nm alexandrite wavelength. inkOUT is a non-laser brand. It uses TEPR
            (Trans-Epidermal Pigment Release). TEPR tattoo removal lifts ink out through the
            skin surface rather than shattering it with light.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl m-0 mt-4">
            The inkOUT vs LaserAway decision sits on two axes. The first is TEPR vs PicoSure:
            non-laser versus laser, two different mechanisms with different strengths. The
            laser vs non-laser distinction is the foundation of this comparison. The second is
            specialist vs chain: a focused tattoo removal brand versus a broad-service
            aesthetics platform where tattoo removal is one of many offerings. Both axes
            matter. LaserAway vs inkOUT, inkOUT or LaserAway, and inkout vs laseraway tattoo
            removal all come back to the same two-layer comparison.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl m-0 mt-4">
            This page does not force a universal winner. It explains the real differences on
            both axes. Then it maps those differences onto who each provider actually serves
            best.
          </p>
      </PageSection>

      {/* At a glance */}
      <PageSection bg="bg">
        <SectionHeading>inkOUT vs LaserAway at a Glance</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            The structural comparison between inkOUT and LaserAway spans method, business model,
            and specialization focus. The table below captures the categorical differences.
            Quantitative review evidence appears in the cross-city evidence section further down.
          </p>
          <GuideTable
            headers={[
              "",
              <BrandTableHeader key="inkout" name="inkOUT" logoSrc="/images/providers/logos/inkout-logo.jpg" />,
              <BrandTableHeader key="laseraway" name="LaserAway" initials="LA" />,
            ]}
            rows={GLANCE_ROWS.map(([feature, a, b]) => [feature, a, b])}
            winners={[null, null, 1, 1, null, 2, null, null, null, 1]}
          />
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            The structural comparison sets the frame. The specialist-vs-chain section and the
            use-case section translate these differences into practical guidance.
          </p>
        </div>
      </PageSection>

      {/* TEPR vs PicoSure */}
      <PageSection bg="surface">
        <SectionHeading label="Key Difference">The Key Difference: TEPR vs PicoSure</SectionHeading>
        <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              TEPR vs PicoSure is the core technology difference underneath the inkOUT vs
              LaserAway comparison.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "PicoSure",
                  body: "PicoSure is a picosecond laser manufactured by Cynosure (now Cynosure Lutronic). It was the first picosecond aesthetic laser to receive FDA clearance, in December 2012. PicoSure's primary wavelength is 755nm (alexandrite). This wavelength is effective on black, blue, and green inks. PicoSure Pro, the current-generation platform, adds optional 532nm and 1064nm wavelengths. These extend coverage to red, orange, yellow, and darker-skin-type treatment. PicoSure uses Cynosure's patented PressureWave technology to deliver ultra-short pulses that shatter ink particles for lymphatic clearance.",
                },
                {
                  title: "TEPR",
                  body: "TEPR (Trans-Epidermal Pigment Release) is not a laser. It does not use light wavelengths. TEPR works by lifting ink upward through the epidermis. The skin then sheds the ink naturally over the weeks following each session. TEPR is not bound by the wavelength-versus-color limitations that affect all laser modalities. It does not interact with melanin the way laser wavelengths do.",
                },
              ].map((item) => (
                <ContentCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              Key implications of this difference:
            </p>
            <GuideBulletList
              items={[
                "Color range. PicoSure's 755nm handles blue and green well. Optional 532nm and 1064nm extend to red, orange, yellow, and black. TEPR is not wavelength-bound. Its color range does not depend on laser absorption.",
                "Skin tone. Laser methods carry a wavelength-versus-melanin interaction. PicoSure's 755nm has a higher melanin absorption ratio than 1064nm. Provider experience with darker skin tones matters. TEPR does not interact with melanin by mechanism.",
                "Pain profile. PicoSure is typically described as a rubber band snapping against the skin. TEPR is typically described as moderate, similar to a tattoo session.",
                "Session counts. Peer-reviewed evidence indicates PicoSure achieves greater than 75% clearance in an average of four to five sessions for standard cases. TEPR session counts vary by ink density and tattoo size. Both methods require multiple sessions spaced weeks apart.",
              ]}
            />
          </div>
      </PageSection>

      {/* Specialist vs Chain */}
      <PageSection bg="bg">
        <SectionHeading>Specialist vs Chain: What Type of Provider Fits Your Needs?</SectionHeading>
        <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              The specialist-vs-chain axis is unique to the inkOUT vs LaserAway comparison. It
              does not appear in the inkOUT vs Removery comparison because Removery is also a
              specialist. LaserAway is explicitly a chain where tattoo removal is one offering
              among many.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "What specialist focus means for tattoo removal",
                  body: "inkOUT's entire clinical focus is tattoo removal. The brand's staff, training, and protocol development revolve around one procedure. Specialization typically means deeper expertise in edge cases. This includes cosmetic tattoo removal, stubborn inks, darker skin types, and scarring-sensitive users. When tattoo removal is the only thing a provider does, the provider accumulates more treatment-specific reps per clinician.",
                },
                {
                  title: "What chain breadth means for tattoo removal",
                  body: "LaserAway operates a national aesthetics platform. Tattoo removal is one service among laser hair removal, CoolSculpting, injectables, skin rejuvenation, and other cosmetic procedures. This breadth means wide geographic access and brand familiarity. It also means that tattoo removal volume per clinician is diluted across multiple service lines. The best LaserAway clinicians may have deep tattoo removal experience. The average LaserAway clinician has split focus.",
                },
                {
                  title: "When specialist matters most",
                  body: "Specialist focus matters most on cases at the difficulty edges. These include cosmetic tattoos with iron-oxide pigments, multi-color tattoos, darker Fitzpatrick skin types, and scarring-sensitive users. These cases benefit from the additional reps and narrower protocol focus that a specialist brings.",
                },
                {
                  title: "When chain breadth matters most",
                  body: "Chain breadth matters most for users prioritizing convenience, access, and familiarity. If you live near a LaserAway location and have a standard body tattoo with dark ink, a chain with mainstream protocols may serve you well. Chain access also matters if you want to bundle tattoo removal with other aesthetic treatments at the same provider.",
                },
                {
                  title: "What each side gives up",
                  body: "Specialist providers like inkOUT trade geographic reach and brand recognition for protocol depth. Fewer locations means fewer users can access the provider without travel. Chain providers like LaserAway trade per-clinician tattoo removal depth for breadth of service and access. More locations means wider access but more variable clinician experience on tattoo removal specifically.",
                },
              ].map((item) => (
                <ContentCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </div>
      </PageSection>

      {/* Pricing */}
      <PageSection bg="surface">
        <SectionHeading>inkOUT vs LaserAway: Pricing and Cost Comparison</SectionHeading>
        <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              inkOUT vs LaserAway cost decisions depend on pricing model and per-session cost.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "LaserAway pricing",
                  body: "LaserAway uses per-session pricing. LaserAway tattoo removal cost varies by location, tattoo size, and treatment complexity. LaserAway does not publish pricing online. Users get a quote at consultation. LaserAway does not offer a formal unlimited-sessions package model like Removery. Financing options are typically available through third-party providers.",
                },
                {
                  title: "inkOUT pricing",
                  body: "inkOUT uses a per-session pricing model with package options. Per-session pricing is set at consultation. inkOUT positions packages around expected complete-removal session counts.",
                },
              ].map((item) => (
                <ContentCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              Cost comparison framing:
            </p>
            <GuideBulletList
              items={[
                "Per-session price. Both brands set pricing at consultation. Direct comparison requires quotes at both.",
                "Total cost visibility. Neither brand publishes pricing online. Both require a consultation.",
                "Session efficiency. Fewer sessions to completion means lower total cost. Session counts depend on the tattoo, not the brand name.",
                "Consultation cost. inkOUT offers free consultations. LaserAway consultation policy varies by location. Confirm whether the consultation is free before booking.",
              ]}
            />
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              For national pricing context across all methods and sizes, see the{" "}
              <Link href="/cost" className="text-(--accent) hover:underline">
                cost guide
              </Link>
              .
            </p>
          </div>
      </PageSection>

      {/* Results, scarring, pain */}
      <PageSection bg="bg">
        <SectionHeading>inkOUT vs LaserAway: Results, Scarring, and Pain</SectionHeading>
        <div className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  title: "Results",
                  body: "Both brands target tattoo clearance. PicoSure has peer-reviewed evidence showing strong clearance rates on multicolor tattoos. TEPR targets complete removal as the primary outcome. Neither brand controls ink composition, depth, or skin response. Results are case-specific.",
                },
                {
                  title: "Scarring risk",
                  body: "Scarring depends on treatment intensity, provider skill, and skin type. PicoSure's picosecond pulse width reduces thermal damage compared to nanosecond Q-switched lasers, placing it on the lower-risk side of the laser spectrum. TEPR avoids the wavelength-versus-melanin interaction by mechanism. This is relevant to scarring risk for darker skin tones. Ask both providers about scarring rates and protocols at consultation.",
                },
                {
                  title: "Pain",
                  body: "PicoSure sessions are typically described as a rubber band snapping against the skin. Sessions are short. TEPR is typically described as moderate, similar to the sensation of getting a tattoo. Pain tolerance is personal. Neither method is painless.",
                },
              ].map((item) => (
                <ContentCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              For deeper context on scarring, see{" "}
              <Link
                href="/guides/tattoo-removal-scarring"
                className="text-(--accent) hover:underline"
              >
                tattoo removal scarring
              </Link>
              .
            </p>
          </div>
      </PageSection>

      {/* Use cases */}
      <PageSection bg="surface">
        <SectionHeading>inkOUT vs LaserAway: Best for Dark Skin, Color Ink, and Complete Removal</SectionHeading>
        <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              Three high-stakes use cases shape most inkout vs laseraway decisions.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "Dark skin",
                  body: "PicoSure's primary 755nm alexandrite wavelength has a higher melanin absorption ratio than 1064nm. This means aggressive settings on darker Fitzpatrick skin types carry elevated risk. PicoSure Pro's optional 1064nm handpiece is safer for darker skin. Not every LaserAway location may stock all handpieces. TEPR (inkOUT) avoids melanin interaction entirely. For users prioritizing avoidance of any laser-pigment-change risk, TEPR is structurally lower-risk.",
                },
                {
                  title: "Color ink",
                  body: "PicoSure's 755nm wavelength handles blue and green ink well. The optional 532nm covers red, orange, and yellow. This gives PicoSure strong color coverage when all handpieces are available. TEPR is not wavelength-bound. Its color performance does not depend on ink absorption. For mixed-color tattoos, both approaches are viable starting points.",
                },
                {
                  title: "Complete removal",
                  body: "inkOUT positions TEPR around complete removal as the primary outcome. LaserAway targets clearance across multiple sessions. Both can deliver complete removal. inkOUT frames complete removal as the default goal. LaserAway frames tattoo removal as one among several aesthetics services.",
                },
                {
                  title: "PMU and microblading removal",
                  body: "Cosmetic tattoo inks often contain iron oxides. These can darken paradoxically under laser. This is a known consideration for any laser treatment of microblading, powder brows, lip blush, or eyeliner tattoos. TEPR avoids this risk. It does not use light. inkOUT is structurally well-suited to PMU and microblading cases. If you have cosmetic tattooing to remove, this is one of the strongest arguments for consulting inkOUT first.",
                },
              ].map((item) => (
                <ContentCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </div>
      </PageSection>

      {/* Cross-city evidence */}
      <PageSection bg="bg">
        <SectionHeading>Cross-City Review Evidence</SectionHeading>
        <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              The evidence below shows how inkOUT and LaserAway compare across cities where we
              have direct review-sample data. LaserAway review data is pending in our current
              dataset. The component will render LaserAway evidence once scrape backfill captures
              their confirmed locations. inkOUT evidence spans the markets where we currently
              have review-sample data.
            </p>
            <Suspense
              fallback={
                <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                  <p className="font-sans text-[14px] text-(--muted) m-0">
                    Loading evidence table&hellip;
                  </p>
                </div>
              }
            >
              <BrandComparisonEvidence
                brandA="inkOUT"
                brandB="LaserAway"
              />
            </Suspense>
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              Use the cross-city evidence as a reference once both brands populate. Consult each
              provider's Google business listing for the most current lifetime review counts.
            </p>
          </div>
      </PageSection>

      {/* Pros and cons of inkOUT */}
      <PageSection bg="surface">
        <SectionHeading>Pros and Cons of inkOUT</SectionHeading>
        <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <ContentCard title="Pros" titleSize="sm">
                <GuideBulletList
                  items={[
                    "Only major non-laser tattoo removal brand at scale in the US market",
                    "Mechanism is not bound by wavelength-versus-color limitations on any ink color",
                    "Mechanism does not interact with melanin, lowering structural pigment-change risk for darker skin tones",
                    "Positioned around complete removal as the primary outcome",
                    "Well-suited to cosmetic tattoo removal cases where iron-oxide pigments darken paradoxically under laser",
                    "Specialist focus on tattoo removal means deeper per-clinician expertise",
                    "Free consultations at all locations",
                  ]}
                />
              </ContentCard>
              <ContentCard title="Cons" titleSize="sm">
                <GuideBulletList
                  variant="warning"
                  items={[
                    "Smaller national footprint than mainstream aesthetics chains",
                    "Newer market presence means smaller public review history in many cities",
                    "Per-session experience differs from laser; adjust expectations accordingly",
                    "No ability to bundle tattoo removal with other aesthetic services at the same provider",
                  ]}
                />
              </ContentCard>
            </div>
          </div>
      </PageSection>

      {/* Pros and cons of LaserAway */}
      <PageSection bg="bg">
        <SectionHeading>Pros and Cons of LaserAway</SectionHeading>
        <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <ContentCard title="Pros" titleSize="sm">
                <GuideBulletList
                  items={[
                    "Large national footprint with locations across major metros",
                    "Uses Cynosure PicoSure, the first FDA-cleared picosecond laser with strong evidence on blue and green inks",
                    "Multi-service platform lets users bundle tattoo removal with other aesthetic treatments",
                    "Strong brand recognition and mainstream consumer trust",
                    "PicoSure Pro offers multi-wavelength coverage (755nm, 532nm, 1064nm) when all handpieces are available",
                  ]}
                />
              </ContentCard>
              <ContentCard title="Cons" titleSize="sm">
                <GuideBulletList
                  variant="warning"
                  items={[
                    "Tattoo removal is one service among many; per-clinician tattoo removal reps are diluted across service lines",
                    "Not a tattoo-removal-only specialist; edge cases may not get the same depth of protocol focus",
                    "Pricing is not published online; consultation is required for a quote",
                    "LaserAway reviews on Google reflect the full aesthetics service mix, not tattoo removal specifically",
                    "PicoSure's 755nm primary wavelength has a higher melanin absorption ratio than 1064nm; darker skin types require careful clinician judgment",
                  ]}
                />
              </ContentCard>
            </div>
          </div>
      </PageSection>

      {/* Verdict */}
      <PageSection bg="bg" className="verdict-bg">
        <SectionHeading label="Verdict">Our Verdict: inkOUT or LaserAway?</SectionHeading>
        <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              There is no universal winner. The honest verdict depends on your tattoo, your skin,
              and what kind of provider experience you want.
            </p>

            <div className="space-y-4">
              <ContentCard title="Choose LaserAway when:">
                <GuideBulletList
                  items={[
                    "You want a nationally recognized aesthetics brand with wide geographic access",
                    "You have a standard body tattoo with dark ink and no unusual skin-tone or pigment concerns",
                    "You want to combine tattoo removal with other aesthetic treatments at the same provider",
                    "A LaserAway location is closer or more convenient than the nearest inkOUT location",
                    "You are comfortable with mainstream laser protocols and want a familiar brand experience",
                  ]}
                />
              </ContentCard>

              <ContentCard title="Choose inkOUT when:">
                <GuideBulletList
                  items={[
                    "You specifically want a non-laser method, by preference or by medical reason",
                    "You have microblading, powder brows, lip blush, or another cosmetic tattoo and want to avoid laser-iron-oxide darkening risk",
                    "You have darker skin and want to avoid any laser-melanin interaction",
                    "You are prioritizing complete removal as the primary outcome",
                    "You want a specialist provider whose entire clinical focus is tattoo removal",
                    "You are scarring-sensitive and want a structurally different mechanism than laser",
                  ]}
                />
              </ContentCard>

              <ContentCard title="Get consultations at both when:">
                <GuideBulletList
                  items={[
                    "Both brands have a location near you",
                    "You want to compare quotes, session-count estimates, and provider judgment before committing",
                    "You are uncertain whether specialist focus or chain access matters more for your case",
                  ]}
                />
              </ContentCard>
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
              The decision often narrows on geography before method preference. If only one brand
              operates near you, that is the starting point. Use the{" "}
              <Link href="/cities/austin" className="text-(--accent) hover:underline">
                city comparison pages
              </Link>{" "}
              to see which brands operate in your market. See{" "}
              <Link href="/reviews/inkout" className="text-(--accent) hover:underline">
                /reviews/inkout
              </Link>{" "}
              and{" "}
              <Link href="/reviews/laseraway" className="text-(--accent) hover:underline">
                /reviews/laseraway
              </Link>{" "}
              for deeper brand-level coverage.
            </p>
          </div>
      </PageSection>

      {/* Editorial note */}
      <PageSection bg="bg">
        <div className="space-y-4">
          <GuideCallout label="Editorial note">
              PicoSure details are drawn from Cynosure Lutronic product documentation and
              PMC4859414 (Torbeck et al, JCAD 2016). LaserAway review data is pending scrape
              backfill; the evidence table will populate as confirmed locations are captured.
              inkOUT is a current advertising client of RealTattooReviews and is evaluated under
              the same framework as every other provider. Individual outcomes vary by tattoo,
              skin type, ink density, and provider skill. Consult both providers before deciding.
              See our{" "}
              <Link href="/methodology" className="text-(--accent) hover:underline">
                methodology
              </Link>{" "}
              and{" "}
              <Link href="/editorial-policy" className="text-(--accent) hover:underline">
                editorial policy
              </Link>{" "}
              for full details.
            </GuideCallout>
        </div>
      </PageSection>

      {/* Related links */}
      <PageSection bg="surface">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-(--muted) mb-4">
          Related Pages
        </p>
        <div className="space-y-2">
          {[
            { href: "/comparisons/best-tattoo-removal-method", title: "Best Tattoo Removal Method" },
            { href: "/comparisons/inkout-vs-removery", title: "inkOUT vs Removery" },
            { href: "/comparisons/removery-vs-laseraway", title: "Removery vs LaserAway" },
            { href: "/reviews/inkout", title: "inkOUT Reviews" },
            { href: "/reviews/laseraway", title: "LaserAway Reviews" },
          ].map((link) => (
            <div key={link.href}>
              <Link href={link.href} className="font-sans text-[14px] text-(--accent) hover:underline">
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </PageSection>

      <GuideFAQSection faqs={faqs} />
    </div>
  );
}
