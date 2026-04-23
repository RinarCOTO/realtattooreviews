# Provider Enrich Prompt

Copy everything below the line and paste it into Claude.ai.
Replace [PROVIDER WEBSITE URL] with the real URL before sending.

---

I am building a tattoo removal review site and I need you to visit a provider's website and extract structured information about them.

Please visit this URL: [PROVIDER WEBSITE URL]

Also check these subpages if they exist:
- /about or /about-us
- /services or /treatments
- /technology or /our-technology
- /locations

Based on what you find, return a JSON object with exactly these fields:

```json
{
  "website": "the URL you visited",
  "summary": "1 to 2 sentence factual description of who they are and what they do. No hype. No em dashes. Write like an editorial site describing a clinic, not like the clinic describing itself.",
  "specialty": "one of: Laser Tattoo Removal, Non-Laser Tattoo Removal, Mixed Tattoo Removal",
  "tags": ["array of tags that apply, chosen only from the list below"],
  "yearsActive": 0,
  "webSummary": "2 to 3 sentence neutral description based on their own site content. Describe their treatment approach, clinic setup, and any technology claims. No em dashes. Do not copy their marketing language directly."
}
```

Tags must come only from this list. Do not invent new ones:
- "Laser" - if they use laser removal
- "Non-Laser" - if they use non-laser methods
- "TEPR" - if they use Trans Epidermal Pigment Release or similar saline/acid-based methods
- "PicoWay" - if they mention PicoWay laser
- "PicoSure" - if they mention PicoSure laser
- "Q-Switch" - if they mention Q-Switch laser
- "Spectra" - if they mention Spectra laser
- "Fotona" - if they mention Fotona laser
- "Medical" - if the clinic is run by or under supervision of licensed medical professionals
- "Medical Spa" - if they describe themselves as a medical spa or medspa
- "Affordable" - if they explicitly position on price or affordability
- "National Chain" - if they operate in multiple states or have many locations nationwide

For `yearsActive`: use the number of years they have been in business if you can find it on the site. If you cannot find it, use null.

Return only the JSON block. No explanation before or after it.
