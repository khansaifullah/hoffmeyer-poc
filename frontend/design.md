# Hoffmeyer Storefront — Design System Reference

**Read this file before making any UI change.**

This document describes the current visual design of the Hoffmeyer POC storefront. It exists so future work stays consistent and **only changes what was explicitly requested**.

---

## Rules for AI Agents and Contributors

### 1. Surgical changes only
- Change **only** the files, components, and styles directly related to the task.
- Do **not** refactor, “improve,” or unify unrelated UI while completing a task.
- Do **not** adjust spacing, colors, typography, or layout on components that were not mentioned — **not a single pixel**.
- Do **not** swap heading styles, hero variants, button styles, or card layouts unless the task explicitly asks for it.

### 2. Reuse before reinventing
- Use existing shared components (`Breadcrumbs`, `SectionHeading`, `StockBadge`, `BrandLogo`, etc.).
- Use shared presets from `lib/ui-presets.js` and `lib/motion-presets.js` instead of hardcoding radius or animation values.
- Extend a component with a prop rather than duplicating markup.
- Match surrounding code’s patterns (Tailwind arbitrary values, hex colors, file structure).

### 3. Do not “fix” known inconsistencies
Several patterns intentionally differ between pages (see [Known Intentional Differences](#known-intentional-differences)). Do not harmonize them unless the user asks.

**Exception:** border radius is unified site-wide via `ui-presets.js`. Do not revert cards, buttons, or inputs to sharp corners.

### 4. shadcn/ui scope
shadcn is used **only where already adopted**. Do not migrate native controls to shadcn unless asked.

Currently on shadcn:
- `Button` — product detail CTA, products dropdown trigger
- `DropdownMenu` — header Products menu
- `Checkbox` — product listing filters and compare checkboxes
- `Select` — product listing sort control

Everything else uses custom markup and Tailwind classes.

### 5. Scroll-lock on popups
All floating UI must avoid hiding the page scrollbar:
- `DropdownMenu`: always `modal={false}`
- `Select`: always `modal={false}` **and** `alignItemWithTrigger={false}` on `SelectContent`

---

## Tech Stack (UI)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Font | Poppins (Google Fonts, weights 300–800) |
| Animation | Motion (`motion/react`) on landing page sections |
| Component library | shadcn/ui (Base UI / “base-nova” style) |
| Icons | Inline SVG + Lucide (shadcn components only) |

Global styles: `app/globals.css`  
Root layout: `app/layout.jsx`

Shared presets:
- `lib/ui-presets.js` — border radius tokens
- `lib/motion-presets.js` — scroll-reveal animation presets

---

## Border Radius (`lib/ui-presets.js`)

Use these exports instead of inventing new radius classes.

| Export | Classes | Usage |
|--------|---------|-------|
| `squareCardRadius` | `rounded-2xl md:rounded-xl` | Home category cards, home featured product cards |
| `cardRadius` | `rounded-xl` | Brand cards, listing cards, PDP gallery, static page cards |
| `buttonRadius` | `rounded-lg md:rounded-md` | Buttons, view toggles, qty steppers |
| `inputRadius` | `rounded-lg md:rounded-md` | Text inputs, search fields, sort triggers |
| `pillRadius` | `rounded-lg` | Subcategory pills |
| `menuRadius` | `rounded-lg` | Search results dropdown, filter/sort menus |

**Keep `rounded-full` for:** avatars, stock badge dots, PDP “In Stock” pill, trust icon circles.

**Intentionally sharp:** Products dropdown trigger text button (`rounded-none`) — it reads as nav text, not a button.

---

## Color Palette

Use these **exact hex values**. Do not substitute Tailwind `blue-*` scales unless matching an existing class.

| Token | Hex | Usage |
|-------|-----|--------|
| Primary blue | `#16568D` | Header nav bar, section underlines, primary buttons, links, focus rings, brand accents |
| Primary blue hover | `#124570` | Hover state for filled `#16568D` buttons |
| Action blue | `#004b87` | Product titles, list CTAs, login, search accents, mobile nav hover |
| Action blue hover | `#003a63` | Hover for `#004b87` buttons |
| Hero blue | `#40A8F3` | Inner-page heroes (category, brand, listing, compare, static pages) |
| Landing CTA blue | `#0062B6` | Landing hero “Shop Products” button text |
| Dark bar | `#333333` | Top promo banner, newsletter footer |
| Section gray | `#f2f2f2` | Brand grids, info sections |
| Page off-white | `#fcfcfc` | Home “Shop by Category” background |
| Card image bg | `#fafafa` | Product/brand card image wells |
| Product gallery bg | `#f5f5f5` | Product detail main image |
| Body text | `#222`, `#333` | Headings and body |
| Muted text | `gray-400`–`gray-600` | Descriptions, labels |
| Borders | `border-gray-200`, `border-gray-300` | Cards, inputs, dividers |
| In stock | `green-500` / `green-600` | Stock badge |
| Factory order | `orange-500` / `orange-600` | Stock badge |
| Product detail stock pill | `#22a06b` | Rounded pill on PDP only |
| White | `#ffffff` | Page background, cards |

### shadcn CSS variables
`:root` in `globals.css` maps `--primary` to Hoffmeyer blue (~oklch). shadcn components inherit these. Custom storefront sections mostly use hardcoded hex above.

---

## Typography

**Font family:** Poppins everywhere (`font-sans` / `--font-poppins`).

### Heading patterns (do not mix without being asked)

| Pattern | Classes | Used on |
|---------|---------|---------|
| **Centered landing title** | `text-center text-[24px] font-bold text-[#004b87] md:text-[32px]` | Home: Shop by Category, Featured Products |
| **SectionHeading** | `text-[20px] font-black uppercase md:text-[24px]`, accent word with `h-[3px] bg-[#16568D]` underline | Inner pages: Featured Products, Shop by Brand, subcategories |
| **Hero H1 (category)** | `text-[32px] font-extrabold md:text-[44px]` white on `#40A8F3` | CategoryHero, BrandHero |
| **Hero H1 (listing)** | `text-[28px] font-black uppercase md:text-[36px]` + white underline bar `h-[3px] w-16` | ListingHero |
| **Landing hero H1** | `text-[35px] md:text-[56px] font-bold` white on image | Home Hero only |
| **Product title (listing)** | `text-[18px] font-bold text-[#004b87]` (list) / `text-[16px]` (grid) | CategoryProductListing |
| **Product title (PDP)** | `text-[30px] font-bold md:text-[34px] text-[#222]` | ProductDetail |
| **Price (featured card)** | `text-[22px] font-bold text-[#111]` | CategoryFeaturedProducts |
| **Price (PDP)** | `text-[34px] font-bold text-[#16568D] md:text-[38px]` | ProductDetail |
| **Price (listing list)** | `text-[28px] font-bold text-[#111]` | CategoryProductListing list view |

### Labels & meta
- Breadcrumbs: `text-[12px] font-bold uppercase tracking-widest`
- SKU / field labels: `text-[12px] font-bold uppercase tracking-wide`
- Item numbers: `text-[11px] font-medium uppercase tracking-wide text-gray-400`
- Filter group labels: `text-[12px] font-bold uppercase tracking-wide text-gray-400`

---

## Layout

### Container
- Max width: `max-w-7xl mx-auto`
- Horizontal padding: `px-4 md:px-8` (inner pages) or `px-4` / `px-6 md:px-20` (landing hero)
- Page shell: `<main className="flex min-h-screen flex-col bg-white">`

### Section vertical rhythm
| Context | Padding |
|---------|---------|
| Standard inner section | `py-10 md:py-14` |
| Listing section | `py-8 md:py-10` |
| Home category grid | `py-12 md:py-20` |
| Home featured products | `py-7 md:py-16` |
| Newsletter | `py-10 md:py-8` |

### Section backgrounds
| Background | Sections |
|------------|----------|
| `bg-white` | Featured products (category), subcategories, product listing, PDP |
| `bg-[#f2f2f2]` | Shop by Brand, Featured Brands, InfoSections |
| `bg-[#fcfcfc]` | Home Shop by Category |
| `bg-[#40A8F3]` | CategoryHero, BrandHero, ListingHero, compare hero, StaticPageShell hero |
| Image banner | Home Hero **only** |

---

## Motion (`lib/motion-presets.js`)

Landing page sections use Motion scroll-reveal animations:
- `ShopByCategory`, `FeaturedProducts`, `FeaturedBrands`, `InfoSections`, `Newsletter`
- `Hero.jsx` — load animation on banner and CTA

Presets:
- `fadeUpVariant` / `fadeUpTransition` — fade up on scroll into view
- `staggerContainerVariant` — stagger children in grids
- `cardHoverMotion` — subtle lift on card hover
- `inViewViewport` — `once: true`, partial visibility threshold

**Hero hydration rule:** do not branch `initial` animation props on `useReducedMotion()`. Use fixed `initial` values; gate reduced motion only for transitions and hover effects after mount.

Do not add Motion to inner catalog pages unless asked.

---

## Header (`app/_components/Header.jsx`)

Three stacked bands on desktop:

1. **Top promo** — `bg-[#333333]`, `text-[12px]`, centered “Request a Quote!”
2. **Middle bar** — white, logo + tagline + utility links + phone `(800) 350-2358` in `text-[28px] font-extrabold text-[#16568D]`
3. **Nav bar** — `bg-[#16568D]`, Products dropdown + search + Quick Order + cart

### Scroll behavior
- Header is **fixed** at the top with a height spacer to prevent layout jump.
- **Hides** when scrolling down (after ~80px).
- **Reappears** when scrolling up.
- Always visible near the top of the page and when the mobile menu is open.
- Uses `translate3d` for hide/show; blue bar overlaps white section by 1px to avoid subpixel seam lines.

### Navigation links (desktop + mobile)
| Label | Route |
|-------|-------|
| Locations | `/locations` |
| Resources | `/resources` |
| About Us | `/about` |
| Login | `/login` |
| Register | `/register` |

Mobile: hamburger sidebar (`w-[80%] max-w-sm`), collapsible categories, Login/Register CTAs at bottom.

**Products dropdown:** `ProductsDropdown.jsx` — shadcn `DropdownMenu` with `modal={false}`.

**Global search:** `GlobalSearchBar.jsx` — desktop (white input in blue bar) and mobile (`bg-[#E7E7E7]`) variants. Results dropdown uses `menuRadius`.

**Auth label:** “Login” (not “Sign In”), links to `/login`.

---

## Heroes

### Landing Hero (`Hero.jsx`) — DO NOT change to `#40A8F3`
- Full-width **photographic banner**
  - Desktop: `/images/banners/desktop-ban.jpg`
  - Mobile: `/images/banners/mobile-banner.jpg`
- Height: `h-[350px]` mobile; desktop uses `md:aspect-[2560/900]` (not a fixed pixel height)
- Mobile image: `object-cover object-bottom`
- Desktop image: `object-cover object-center`
- White text overlay, CTA button: white bg, `text-[#0062B6]`, `buttonRadius`
- Load animation via Motion; this is the **only** hero that uses an image background

### Inner-page heroes — `#40A8F3` background, white text

| Component | File | Notes |
|-----------|------|-------|
| CategoryHero | `CategoryHero.jsx` | Breadcrumbs + capitalized category name |
| BrandHero | `BrandHero.jsx` | Breadcrumbs + uppercase brand name + logo panel on right (`cardRadius`, `border-white/30 bg-white`) |
| ListingHero | `ListingHero.jsx` | Breadcrumbs + uppercase title with white underline accent + functional “Read more” / “Read less” expand |
| StaticPageShell | `StaticPageShell.jsx` | Blue hero band for About, Locations, Resources, Register |

Padding: Category/Brand `py-10 md:py-14`; Listing `py-8 md:py-10`.

---

## Breadcrumbs (`app/_components/Breadcrumbs.jsx`)

**Always use this component.** Never inline breadcrumb markup.

| Variant | When | Colors |
|---------|------|--------|
| `hero` (default) | On blue heroes | Links `text-white/60 hover:text-white`, current `text-white`, separator `/` in `text-white/40` |
| `light` | Product detail (white bg) | Links `text-[#16568D]/70`, current `text-[#16568D]` |

**Trail pattern:** `Home / Categories / …`  
- “Categories” always links to `/#categories`
- Separator is always `/` (never `>`)

---

## SectionHeading (`app/_components/SectionHeading.jsx`)

```jsx
<SectionHeading accent="Featured" rest="Products" />
```

Renders: `{accent}` with blue underline + `{rest}` appended. Used on **inner catalog pages**, not on home landing sections.

---

## Cards & Grids

Apply radius via `ui-presets.js` exports (see [Border Radius](#border-radius-libui-presetsjs)).

### Home category cards (`ShopByCategory.jsx`)
- `aspect-square`, `squareCardRadius`, `border-gray-200`
- Hover: `border-[#16568D] shadow-lg`, image `scale-105`
- 2-col mobile → 6-col desktop
- “View All Categories” uses outline button style (see [Buttons](#buttons))

### Home featured product cards (`FeaturedProducts.jsx`)
- Same card shape as category cards (`squareCardRadius`)
- Image + product name only (no price, no stock badge)

### Category featured product cards (`CategoryFeaturedProducts.jsx`)
- `cardRadius`, `border border-gray-200 p-4`, 5-column grid on large screens
- Image well: `aspect-square bg-[#fafafa]`
- Brand + MFR number, description, item #, `StockBadge`, price
- Hover: `border-[#16568D]`

### Brand logo cards (`ShopByBrand.jsx`, `FeaturedBrands.jsx`)
- `cardRadius`, `h-24 md:h-28`, white bg, `border-gray-200`
- Hover: `border-[#16568D]`
- Grid: 2-col → 4-col
- Uses `BrandLogo` component

### Subcategory pills (`CategorySubcategories.jsx`)
- Horizontal pills: `pillRadius`, `h-14 md:h-16`, thumbnail left + label right
- `border-gray-200`, hover `border-[#16568D]`

### Product listing — list view (`CategoryProductListing.jsx`)
- Full-width rows, image `h-28 w-28`, title in `#004b87`
- Price `text-[28px]`, `StockBadge`, qty input, “Add to Cart” button
- Compare checkbox footer row

### Product listing — grid view
- Card layout similar to featured but with qty + “Add to Cart”
- Uses `StockBadge` (same as featured cards)

**CTA text on listing:** still “Add to Cart” (not “Request a Quote”). PDP uses “Request a Quote”.

---

## Compare Flow

| Piece | Path | Notes |
|-------|------|-------|
| Storage helper | `lib/product-compare.js` | sessionStorage, max 4 products |
| Compare bar | `app/_components/CompareBar.jsx` | Sticky bottom bar on listing pages when items selected |
| Compare page | `app/compare/page.jsx` | Side-by-side table; reads `?slugs=` query param |
| Listing integration | `CategoryProductListing.jsx` | Compare checkboxes in list and grid views |

Compare bar buttons use `buttonRadius`.

---

## Stock Badge (`app/_components/StockBadge.jsx`)

Shared component for **featured cards and listing views**.

| State | Style |
|-------|-------|
| In stock | Green circle + check SVG + “In stock” `text-[12px] font-semibold text-green-600` |
| Factory order | Orange circle + check + “Factory Order” |

**Product detail page** uses a **different** pattern — green rounded pill `bg-[#22a06b]` uppercase “In Stock”. Do not replace one with the other unless asked.

---

## Buttons

Use `buttonRadius` from `ui-presets.js` unless noted.

| Style | Classes | Where |
|-------|---------|-------|
| Primary filled | `bg-[#16568D] hover:bg-[#124570] text-white font-bold` | Newsletter subscribe, mobile register, compare actions |
| Primary action | `bg-[#004b87] hover:bg-[#003a63] text-white font-bold` | Listing Add to Cart, login submit |
| Outline | `border border-[#16568D] bg-white text-[#16568D] hover:bg-[#16568D] hover:text-white` | View All Categories, View All Brands, static page secondary CTAs |
| Landing hero CTA | `bg-white text-[#0062B6] font-semibold` + `buttonRadius` | Hero.jsx only |
| shadcn Button | `bg-[#16568D] hover:bg-[#124570] h-14 w-full` + `buttonRadius` | ProductDetail “Request a Quote” |
| View toggle | Active: `bg-[#004b87] text-white`; inactive: `bg-white text-[#333]` | List/Grid toggle |

Do not consolidate button styles globally beyond the shared radius preset.

---

## Forms & Inputs

Use `inputRadius` from `ui-presets.js` for native inputs.

### Native inputs (most of site)
- Height: `h-10` or `h-11`
- Border: `border-gray-300`
- Focus: `focus:border-[#004b87]` or `focus:border-[#16568D]`
- Text: `text-[14px]`–`text-[16px]`

### Header search (`GlobalSearchBar.jsx`)
- Desktop: white input inside blue bar, `inputRadius`
- Mobile: `bg-[#E7E7E7]`, `inputRadius`
- Results dropdown: `menuRadius`

### Login (`app/(auth)/login/page.jsx`)
- Card: `cardRadius`, `border-gray-200 p-8 shadow-sm`
- Labels: uppercase tracking-wide
- Password show/hide toggle (eye icon)

### Register (`app/register/page.jsx`)
- Uses `StaticPageShell`
- Client-side form with success state only (no backend yet)
- Inputs and submit button use `inputRadius` / `buttonRadius`

---

## shadcn/ui Customization

When adding or styling shadcn components, match existing overrides:

### Checkbox (filters + compare)
```jsx
className="data-checked:border-[#16568D] data-checked:bg-[#16568D] data-checked:text-white"
```

### Select (sort)
```jsx
<Select modal={false} ...>
  <SelectTrigger className={`h-10 min-w-[220px] border-gray-300 ... ${buttonRadius}`} />
  <SelectContent alignItemWithTrigger={false} className={`${menuRadius} border border-gray-200 bg-white shadow-md`}>
    <SelectItem className="... focus:bg-[#16568D]/12 focus:text-[#16568D]" />
  </SelectContent>
</Select>
```

### DropdownMenu (products)
- `modal={false}`
- Trigger: ghost text style, `rounded-none` (nav link appearance)
- Content: `rounded-lg border border-[#d9e0e8] shadow-[0_8px_20px_rgba(0,0,0,0.12)]`
- Items: `focus:bg-[#16568D]/12 focus:text-[#16568D]`

---

## Newsletter (`app/_components/Newsletter.jsx`)

- `bg-[#333333]` with `border-b-8 border-[#16568D]`
- White italic heading, email input (`inputRadius`) + Subscribe button (`buttonRadius`)
- Motion scroll-reveal animation
- Present at bottom of **every storefront page**

---

## Page Templates

### Home (`app/page.jsx`)
```
Header → Hero (image) → ShopByCategory → FeaturedBrands → FeaturedProducts → InfoSections → Newsletter
```

Homepage sections are **static** (not wired to the API). Do not connect homepage grids to the catalog API unless explicitly asked.

### Category (`app/category/[slug]/page.jsx`)
```
Header → CategoryHero → CategorySubcategories → ShopByBrand → CategoryFeaturedProducts → Newsletter
```

### Brand (`app/category/[slug]/brand/[brandSlug]/page.jsx`)
```
Header → BrandHero → CategorySubcategories → CategoryFeaturedProducts → Newsletter
```

### Subcategory listing (`app/category/[slug]/[subSlug]/page.jsx`)
```
Header → ListingHero → ProductListingSection (+ CompareBar) → Newsletter
```

### Product detail (`app/product/[slug]/page.jsx`)
```
Header → Breadcrumbs (light variant) → ProductDetail → Technical Specs table → Newsletter
```

### Compare (`app/compare/page.jsx`)
```
Header → blue hero → comparison table → Newsletter
```

### Static pages (About, Locations, Resources, Register)
```
Header → StaticPageShell (blue hero + content) → Newsletter
```

---

## Product Detail (`ProductDetail.jsx`)

- Two-column grid on large screens
- Gallery: main image + 4 thumbnail buttons (`cardRadius`)
- Active thumbnail: `border-[#16568D] ring-1 ring-[#16568D]`
- Size selector pills: selected = filled `#16568D`, `buttonRadius`
- Qty stepper: bordered box with − / + buttons, `inputRadius`
- Primary CTA: shadcn `Button`, full width mobile `h-14`
- Trust badges: shield + truck icons in `bg-[#16568D]/10` circles (`rounded-full`)

---

## Brand Logo (`app/_components/BrandLogo.jsx`)

- Uses Next.js `Image`
- Sizes: `sm` (h-6/8), `default` (h-8/10), `lg` (h-9/14)
- SVG/wordmark files in `public/images/brands/`

---

## Known Intentional Differences

Do **not** “fix” these unless explicitly requested:

| Area | Difference |
|------|------------|
| Home vs inner headings | Home uses centered `#004b87` titles; inner pages use `SectionHeading` |
| Home vs category category display | Home = large square cards; category page = compact horizontal pills |
| Stock display | `StockBadge` (cards/list) vs green pill (PDP) |
| CTA copy | “Add to Cart” on listing vs “Request a Quote” on PDP |
| Hero backgrounds | Landing = photo; all other pages = `#40A8F3` |
| Button implementations | Mix of native `<button>`, `<Link>`, and shadcn `Button` |
| Featured products home vs category | Home = image + name only; category = full commerce card with price/stock |
| Homepage data | Static hardcoded content; catalog pages use API |
| Motion | Landing page only; inner catalog pages are static on scroll |

---

## Component Index

| Component | Path |
|-----------|------|
| Header | `app/_components/Header.jsx` |
| ProductsDropdown | `app/_components/ProductsDropdown.jsx` |
| GlobalSearchBar | `app/_components/GlobalSearchBar.jsx` |
| Hero (landing) | `app/_components/Hero.jsx` |
| CategoryHero | `app/_components/CategoryHero.jsx` |
| BrandHero | `app/_components/BrandHero.jsx` |
| ListingHero | `app/_components/ListingHero.jsx` |
| StaticPageShell | `app/_components/StaticPageShell.jsx` |
| Breadcrumbs | `app/_components/Breadcrumbs.jsx` |
| SectionHeading | `app/_components/SectionHeading.jsx` |
| ShopByCategory | `app/_components/ShopByCategory.jsx` |
| FeaturedProducts | `app/_components/FeaturedProducts.jsx` |
| FeaturedBrands | `app/_components/FeaturedBrands.jsx` |
| ShopByBrand | `app/_components/ShopByBrand.jsx` |
| CategorySubcategories | `app/_components/CategorySubcategories.jsx` |
| CategoryFeaturedProducts | `app/_components/CategoryFeaturedProducts.jsx` |
| CategoryProductListing | `app/_components/CategoryProductListing.jsx` |
| ProductListingSection | `app/_components/ProductListingSection.jsx` |
| ProductDetail | `app/_components/ProductDetail.jsx` |
| CompareBar | `app/_components/CompareBar.jsx` |
| StockBadge | `app/_components/StockBadge.jsx` |
| BrandLogo | `app/_components/BrandLogo.jsx` |
| Newsletter | `app/_components/Newsletter.jsx` |
| InfoSections | `app/_components/InfoSections.jsx` |
| UI presets | `lib/ui-presets.js` |
| Motion presets | `lib/motion-presets.js` |
| Compare storage | `lib/product-compare.js` |
| shadcn ui | `components/ui/` |

---

## Checklist Before Submitting UI Changes

- [ ] Only touched files required by the task
- [ ] Reused existing shared components where applicable
- [ ] Used exact hex colors from this doc
- [ ] Used `ui-presets.js` for border radius on new cards, buttons, inputs, and menus
- [ ] Did not change landing Hero to solid blue
- [ ] Did not change homepage section order unless asked
- [ ] Did not wire homepage to the API unless asked
- [ ] Did not unify heading/button/card styles across pages (except shared radius preset)
- [ ] Floating UI uses `modal={false}` (+ `alignItemWithTrigger={false}` for Select)
- [ ] Breadcrumbs use `/` separator and `Breadcrumbs` component
- [ ] Newsletter remains at page bottom unless task says otherwise
- [ ] Hero Motion animations use fixed `initial` props (no hydration mismatch)
