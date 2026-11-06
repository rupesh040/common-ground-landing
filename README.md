# Common Ground Landing

A responsive Next.js website based on the supplied Common Ground references. It includes Home, About Us, Our Causes, Our Team, Gallery, Blog, FAQs, Contact Us, and Privacy pages.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. To create a production build:

```sh
npm run typecheck
npm run build
```

The project uses Next.js App Router with a static export. The generated `out/` directory can be hosted on any static host. After building, `npm start` serves it at `http://localhost:4173`. Set the `PORT` environment variable to change that port.

## Content architecture

```text
src/
  app/
    layout.tsx                 Shared site shell and metadata
    [[...slug]]/page.tsx        Routes generated from the JSON configuration
    globals.css                Responsive design and local fonts
  data/
    content.json               All site content and page composition
    content.types.ts           One shared file for content types
    index.ts                   Typed exports and data resolvers
  components/
    page-renderer.tsx          JSON component-name → React component registry
    navbar.tsx                 Desktop/mobile navigation
    footer.tsx                 Shared footer
    ui.tsx                     Headings, buttons, icons, motion primitives
    sections.tsx               Reusable page sections and cards
    interactive.tsx            FAQs, gallery, dialogs, forms
    interactive.css            Interactive component styles
public/
  images/                      Local photographs and credits
  fonts/                       Local fonts, credits, and licenses
```

The JSON follows the supplied template/variant pattern:

```json
{
  "CommonGround": {
    "templateComponents": {
      "template-1": {
        "shared": {
          "Header": "CommonGroundHeader1",
          "Footer": "CommonGroundFooter1"
        },
        "pages": {
          "home": {
            "title": "Common Ground",
            "description": "...",
            "components": [{ "key": "Hero", "component": "CommonGroundHero1" }]
          }
        }
      }
    },
    "sections": {
      "Hero": {
        "variants": {
          "CommonGroundHero1": {
            "title": "A better world",
            "accent": "starts with us."
          }
        }
      }
    }
  }
}
```

To change content, edit `content.json`. Reorder a page's `components` array to reorder its sections. Each component receives a typed `SectionContent` object through `getPageSections()` in `data/index.ts`. To add a new component, add its content variant in JSON and its React component to the registry in `page-renderer.tsx`. Home and inner pages reuse cause cards and journal cards; homepage heading overrides also live in the JSON labels.

## Interactions

- Framer Motion section reveals, accordion transitions, gallery filters, and modal entrance animations.
- Reduced-motion preferences respected throughout.
- Gallery category filters, counts, lightbox navigation, and keyboard controls.
- Readable story and cause detail dialogs.
- Contact form validates input and prepares a downloadable text draft. It does not send email or save submissions.
- Donate dialog prepares a sample pledge download. It does not collect payments.
- Accessible native dialogs with focus handling, Escape to close, and body scroll restoration.

Common Ground is an illustrative NGO concept. Replace demonstration copy, sample roles, privacy wording, and form/payment behavior when adapting this project for an operating organization. Photo and font credits are included alongside the assets.
