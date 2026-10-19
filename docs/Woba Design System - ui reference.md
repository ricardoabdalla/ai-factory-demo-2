# Woba Design System — UI Reference

Oct 18, 2026 · @Ricardo Abdalla

## Overview

Woba's UI is editorial and minimal: a warm off-white canvas, white cards with near-invisible borders, bold Host Grotesk headings and one signature yellow accent (#F9E10D) used sparingly. Everything below comes from the Figma file "Global Tokens Woba" as published in the [Woba Design System](https://claude.ai/artifact/Dsqm6WEHTqZFfZ9d8vfoRx) artifact and the [wobabr/woba-ds](https://github.com/wobabr/woba-ds) component library. Where the two disagree, this doc follows the code tokens (synced from Figma and Supernova in Aug 2026).

**Core rules for any new project**

- Yellow #F9E10D is the only accent: primary CTAs, small highlights, logo backgrounds. Never a large surface or text color.
- Pages sit on white or grey 50 (#FAFAFA); cards are white with a 1px rgba(0,0,0,0.08) border and 24px radius; nested or highlighted blocks use warm sand #F6F2E7.
- No gradients, patterns, emoji or decorative illustrations; generous whitespace.
- Buttons, inputs, chips and tabs are always pill-shaped.
- UI copy is pt-BR, direct and friendly, addressing the user as "você", no exclamation points. Sentence case in UI, Title Case for marketing section titles, UPPERCASE overlines.
- Formats: 24h time (14:00–15:30), currency R$ 120/h, capacity 6pax or 6 pessoas. Use · for metadata (Sala Amarela · 6pax) and — for secondary info (Pinheiros — 2º andar).

## Color palette

Build UI with the semantic roles below; reach for raw primitives only when no role fits. Values are the light theme from `@woba/ds-tokens` (a dark theme exists under `color.dark.*`; there is no automatic theme switch).

### Semantic roles — surfaces and text

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Page background | background.default | #FFFFFF | Default page |
| Page background, subtle | background.subtle | #FAFAFA (grey 50) | Alternate page / app shell |
| Brand accent | surface.accent.primary | #F9E10D (yellow 500) | Primary CTA, small highlights, logo tile |
| Warm accent surface | surface.accent.secondarySubtle | #F6F2E7 (sand 100) | Nested cards, filter bars, notes |
| Warm accent, stronger | surface.accent.secondary | #F2EDDE (sand 200) | Selected header cells, hover on sand |
| Surface | surface.default | #FFFFFF | Cards, sheets, inputs |
| Surface subtle | surface.subtle | #F2F2F2 (grey 100) | Wells, disabled fields |
| Surface subtle on subtle | surface.subtleOnSubtle | #E5E5E5 (grey 200) | Nested wells, loading |
| Inverse surface | surface.inverse | #000000 | Dark buttons, selected chips |
| Hover overlay | surface.common.hover | rgba(0,0,0,0.08) | Hover tint on any surface |
| Pressed overlay | surface.common.pressed | rgba(0,0,0,0.16) | Pressed tint |
| Scrim | surface.common.overlay | rgba(0,0,0,0.48) | Behind modals and sheets |
| Text | content.default | #000000 | Primary text and icons |
| Text subtle | content.subtle | rgba(0,0,0,0.64) | Secondary text, meta |
| Text disabled | content.common.disabled | rgba(0,0,0,0.32) | Disabled text, placeholders |
| Text on yellow | content.accent.primary | #272302 (yellow 1000) | Labels on the brand yellow |
| Text inverse | content.inverse | #FFFFFF | Text on black |
| Visited link | content.visited | #8F00D6 (violet 700) | Visited links |
| Star rating | content.starRating | #8D7535 (sand 800) | Rating stars |
| Border | stroke.default | rgba(0,0,0,0.08) | Card and input borders |
| Border selected | stroke.common.selected | #000000 | Selected / active controls |
| Focus ring | elevation.focusRing.01 / 02 | #FFFFFF 1px + #000000 3px | Keyboard focus |

### Feedback

| Status | Strong (surface + text) | Subtle surface | Subtle on subtle |
| --- | --- | --- | --- |
| Neutral | #4A3E1C (sand 900) | #F6F2E7 | #F2EDDE |
| Info | #006BB2 (blue 700) | #E5F5FF | #CCEBFF |
| Success | #207C0E (green 700) | #EFFDED | #D8FAD1 |
| Warning | #A84600 (orange 700) | #FFF0E5 | #FFE1CC |
| Critical | #CC1800 (red 700); text #991200 (red 800) | #FFEDEB | #FFD2CC |

Strokes for success, warning and critical use the same 700 shade as the strong color.

### Decorative — space types

Use these to tag content by space type: the subtle shade as a chip or card background, the 700 shade for its label.

| Slot | Space type | Family | Subtle | Subtle on subtle | Text |
| --- | --- | --- | --- | --- | --- |
| 01 | Shared space | Lime | #F9FBEE | #F1F5D6 | #6A7335 |
| 02 | Meeting room | Lavender | #F4F1FA | #E1D8F3 | #5D36AB |
| 03 | Event | Amber | #FBF6EF | #F5E9D6 | #835B21 |
| 04 | Private office | Rose | #F9EFF1 | #F2D9DD | #AC394F |
| 05 | Exclusive office | Steel | #EFF3FA | #D9E3F3 | #335CA3 |

### Intelligence — AI agents

| Slot | Agent | Family | Surface | Subtle | Selected bg | Text / selected stroke |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Strategy | Violet | #CF70FF | #F6E5FF | #FCF5FF | #A300F5 |
| 02 | Operation | Indigo | #7279F3 | #E8E9FD | #F6F6FE | #2731EC |
| 03 | Experience | Pink | #F17EB8 | #FDE8F2 | #FEF6FA | #CA1670 |

### Primitive ramps (light)

| Family | 50 | 100 | 200 | 300 | 400 | 500 |
| --- | --- | --- | --- | --- | --- | --- |
| Grey | #FAFAFA | #F2F2F2 | #E5E5E5 | #CCCCCC | #B8B8B8 | #999999 |
| Yellow | #FCFBF8 | #F9F8F0 | #FEF9CD | #FCF39C | #FAE94C | #F9E10D |
| Sand | #FCFBF9 | #F6F2E7 | #F2EDDE | #EBE1CB | #E3D7B5 | #D8C797 |
| Green | #F7FEF6 | #EFFDED | #D8FAD1 | #B1F5A3 | #92F17E | #4FE830 |
| Red | #FFF6F5 | #FFEDEB | #FFD2CC | #FFA599 | #FF8170 | #FF5D47 |
| Orange | #FFF9F5 | #FFF0E5 | #FFE1CC | #FFC499 | #FFAC70 | #FF9447 |
| Blue | #F5FBFF | #E5F5FF | #CCEBFF | #94D4FF | #66C2FF | #2EABFF |
| Violet | #FCF5FF | #F6E5FF | #EECCFF | #DD99FF | #CF70FF | #C247FF |
| Indigo | #F6F6FE | #E8E9FD | #D0D2FB | #A1A5F7 | #7279F3 | #4D54EF |
| Pink | #FEF6FA | #FDE8F2 | #FAD1E5 | #F5A3CC | #F17EB8 | #EB4999 |
| Lime | #FCFDF7 | #F9FBEE | #F1F5D6 | #E2EBAD | #D7E48C | #CADB66 |
| Lavender | #FAF8FD | #F4F1FA | #E1D8F3 | #C7B7E8 | #AB92DD | #9374D3 |
| Amber | #FDFBF7 | #FBF6EF | #F5E9D6 | #EBD2AD | #E2C08D | #D4A053 |
| Rose | #FCF7F8 | #F9EFF1 | #F2D9DD | #EBC2C9 | #E3ABB5 | #D98C9A |
| Steel | #F7F9FD | #EFF3FA | #D9E3F3 | #B9CBE9 | #9FB7E1 | #6C91D0 |

| Family | 600 | 700 | 800 | 900 | 1000 |
| --- | --- | --- | --- | --- | --- |
| Grey | #7A7A7A | #5C5C5C | #454545 | #2E2E2E | #141414 |
| Yellow | #C9B50A | #AA9909 | #7A6E06 | #5C5404 | #272302 |
| Sand | #CDB67A | #B99A46 | #8D7535 | #4A3E1C | #2C2411 |
| Green | #2BA112 | #207C0E | #1A650B | #114908 | #0B2E05 |
| Red | #F51D00 | #CC1800 | #991200 | #610B00 | #3D0700 |
| Orange | #F56600 | #A84600 | #8A3900 | #5C2600 | #3D1A00 |
| Blue | #008DEB | #006BB2 | #00568F | #00375C | #002238 |
| Violet | #A300F5 | #8F00D6 | #660099 | #410061 | #1B0637 |
| Indigo | #2731EC | #1019BC | #0C1288 | #090E67 | #050738 |
| Pink | #CA1670 | #B81465 | #770D41 | #53092D | #32061C |
| Lime | #9BA74D | #6A7335 | #535A2A | #3A3F1D | #232612 |
| Lavender | #6F45C4 | #5D36AB | #43277C | #29184C | #180E2D |
| Amber | #BC832F | #835B21 | #6A4A1B | #4E3613 | #31220C |
| Rose | #CF6E80 | #AC394F | #8A2E3F | #541C26 | #361218 |
| Steel | #3D6DC2 | #335CA3 | #254275 | #172948 | #0F1A2E |

Black and white alpha ramps run 0.08, 0.16, 0.24, 0.32, 0.40, 0.48, 0.64, 0.72, 0.80, 0.88, 1 (steps 50 to 1000).

**Earlier brand values still seen in mockups.** The April 2026 Figma export used a warm off-white canvas #F1F1ED, warm borders #E3E2DC and warm dark greys (#2F2E29 to #B8B8B5). The synced code tokens replace these with neutral greys and an 8% black border; use the code tokens in new projects.

## Typography

Three families, each with one job: Noticia Text for expressive display lines, Host Grotesk for headings, Manrope for everything else (body, labels, captions). All three are on Google Fonts; `@woba/ds-tokens` publishes only the family names, so load the files yourself.

| Role | Family | Token | Weights used |
| --- | --- | --- | --- |
| Display | Noticia Text (serif) | typography.fontFamily.display | 700 italic |
| Heading | Host Grotesk | typography.fontFamily.heading | 400, 600 |
| Base | Manrope | typography.fontFamily.base | 500, 600, 700 |

```html
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&family=Manrope:wght@200..800&family=Noticia+Text:ital,wght@1,700&display=swap" rel="stylesheet">
```

### Type styles

| Style | Family | Weight | Size / line height (px) | Typical use |
| --- | --- | --- | --- | --- |
| display.large | Noticia Text | 700 italic | 48 / 52 | Hero line |
| display.medium | Noticia Text | 700 italic | 24 / 28 | Section highlight |
| display.small | Noticia Text | 700 italic | 20 / 24 | Inline highlight |
| heading.xlarge | Host Grotesk | 600 | 40 / 44 | Page title |
| heading.large | Host Grotesk | 600 | 32 / 36 | Section title |
| heading.medium | Host Grotesk | 600 | 24 / 28 | Block title |
| heading.small | Host Grotesk | 600 | 20 / 24 | Card and dialog title |
| heading.xsmall | Host Grotesk | 600 | 16 / 20 | Alert title, small headers |
| subheading.medium | Host Grotesk | 400 | 16 / 20 | Subtitle under a heading |
| paragraph.medium | Manrope | 500 | 16 / 24 | Body text |
| label.xlarge | Manrope | 700 | 32 / 32 | Big numbers |
| label.large | Manrope | 700 | 24 / 24 | Prices, stats |
| label.medium | Manrope | 700 | 20 / 20 | Emphasised values |
| label.small | Manrope | 700 | 16 / 16 | Large links, header titles |
| label.xsmall | Manrope | 700 | 14 / 14 | Buttons, nav items, field labels |
| label.2xsmall | Manrope | 700 | 12 / 12 | Badges, small buttons |
| label.inputXsmall | Manrope | 500 | 14 / 20 | Text inside inputs |
| caption.medium | Manrope | 500 | 14 / 20 | Descriptions, toasts |
| caption.small | Manrope | 500 | 12 / 16 | Helper text, tooltips |
| overline.medium | Manrope | 600 | 12 / 12, +1px tracking, UPPERCASE | Eyebrows above titles |

Letter spacing is 0 everywhere except overlines. The token source omits font sizes for heading.xlarge and heading.large; 40 and 32px are inferred from their line heights. Font-size primitives: 12, 14, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80.

**Larger marketing sizes.** The earlier Figma scale adds Host Grotesk Bold display sizes of 80, 72 and 64px (line height 1.2, letter spacing -3%) and headings of 56 and 48px (-1%). Use them only for landing pages and covers.

## Layout and spacing

Everything sits on a 4px grid. Layouts use a 4-column grid on phones, 8 on tablets and 12 on desktop, with 32px gutters from tablet up.

### Grid

| Grid | Columns | Margin or column width | Gutter | Content width (12 col) |
| --- | --- | --- | --- | --- |
| small | 4 | 16px side margins | 16px | Fluid |
| medium | 8 | 32px side margins | 32px | Fluid |
| large | 12 | 48px columns | 32px | 928px |
| xlarge | 12 | 72px columns | 32px | 1216px |
| 2xlarge | 12 | 80px columns | 32px | 1312px |

Breakpoint widths are not published in the tokens, so choose them per project and switch grids where the content width fits.

### Spacing scale

| Step | 0 | half | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| px | 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 |

| Semantic gap | px | Semantic padding | px |
| --- | --- | --- | --- |
| gap.nano | 2 | padding.quarck | 2 |
| gap.xsmall | 4 | padding.nano | 4 |
| gap.small | 8 | padding.2xsmall | 8 |
| gap.medium | 12 | padding.xsmall | 12 |
| gap.large | 16 | padding.small | 16 |
| gap.xlarge | 20 | padding.medium | 20 |
| gap.jumbo | 32 | padding.large | 24 |
| — | — | padding.xlarge | 32 |
| — | — | padding.2xlarge | 48 |
| — | — | padding.jumbo | 64 |

### Common dimensions

| Element | Size |
| --- | --- |
| Icons | 16 (small), 20 (medium), 32 (large) |
| Buttons | 48 large, 40 medium, 36 small |
| Input | 40 min height |
| List item | 76 with description, 68 without |
| Table header, row, footer | 48 |
| Mobile header | 64 |
| Tab bar | 48 (items 36) |
| Sidebar | 256 expanded, 64 collapsed |
| Dialog | 480 wide, 16 minimum screen margin |
| Toast | 343 × 64 |
| Minimum touch target (native) | 44–48 |

Containers typically use 24–40px internal padding with generous whitespace between sections.

## Shape, elevation and motion

Interactive controls are pills; containers (cards, dialogs, alerts, toasts) use 24px corners. Borders are a 1px 8% black hairline, and shadows stay short and light.

### Corner radius

| Token | px | Used on |
| --- | --- | --- |
| borderRadius.sharp | 0 | Full-bleed media, tables |
| borderRadius.nano | 4 | Badges, inner chip controls |
| borderRadius.xsmall | 8 | Checkbox, tooltip, small avatar |
| borderRadius.small | 12 | Medium avatar |
| borderRadius.medium | 16 | Large avatar, popovers |
| borderRadius.large | 24 | Cards, dialogs, alerts, toasts, sidebar right edge |
| borderRadius.jumbo | 32 | Large hero panels |
| borderRadius.pill | 999 | Buttons, inputs, chips, nav items, tabs, switches |

### Borders

Stroke widths: none 0, small 1px, medium 2px, large 4px. The default border is `1px solid rgba(0,0,0,0.08)`; selected and active controls switch to a solid black 1px border.

### Shadows

| Elevation | CSS box-shadow | Used on |
| --- | --- | --- |
| focusRing | 0 0 0 1px #FFFFFF, 0 0 0 3px #000000 | Keyboard focus, every component (`:focus-visible`) |
| hover | 0 1px 1px 0 rgba(0,0,0,0.24), 0 0 1px 0 rgba(0,0,0,0.32) | Hovered buttons, cards, radios |
| overflow | 0 1px 8px 0 rgba(0,0,0,0.16), 0 1px 4px 0 rgba(0,0,0,0.16) | Sticky bars, scrolled content edges |
| overlay | 0 20px 24px -4px rgba(0,0,0,0.08), 0 8px 8px -4px rgba(0,0,0,0.08) | Toasts, popovers, menus |
| sheet | 0 12px 64px 0 rgba(0,0,0,0.08) | Dialogs, bottom sheets |
| floating | 0 0 24px -12px (color not defined) | Floating action button |

### Opacity and glass

| Semantic opacity | Value | Used for |
| --- | --- | --- |
| solid | 1 | Default |
| heavy | 0.8 | Link hover, glass light |
| intense | 0.64 | Link pressed |
| moderate | 0.48 | Scrims |
| soft | 0.32 | Disabled media |
| subtle | 0.16 | Faint tints |
| transparent | 0 | Hidden |

Glass surfaces (sticky headers, overlays) use a `rgba(255,255,255,0.64)` fill with a 4px frost blur; the earlier Figma file used 50% white with a 20px blur.

### Motion

- Easing: standard `cubic-bezier(0.2, 0, 0, 1)`, emphasized `cubic-bezier(0.3, 0, 0, 1)`.
- Durations: fast 120ms, base 200ms, slow 320ms. Fades and subtle scale only, no bounce.
- Hover darkens or tints (`rgba(0,0,0,0.08)` overlay); press adds a 16% overlay and may scale to 0.98. Hover never changes radius.
- Motion tokens come from the earlier Figma file; `@woba/ds-tokens` does not publish them yet.

## Components

Specs below come from the `@woba/ds-web` implementation and the component docs in woba-ds; 50+ components are documented there, these are the ones most projects need first. All interactive states share one recipe: hover adds an 8% black overlay plus the hover shadow, pressed a 16% overlay, focus the two-layer ring, and disabled switches to grey 100 with 32% black text.

### Button

Pill shape, Manrope 700 14px label (label.xsmall), 8px gap between icon and label.

| Size | Height | Padding (V / H) | Icon |
| --- | --- | --- | --- |
| large (default) | 48 | 12 / 16 | 20 |
| medium | 40 | 8 / 16 | 20 |
| small | 36 | 8 / 12 | 16 |

| Appearance | Background | Text | Border |
| --- | --- | --- | --- |
| primary | #F9E10D | #272302 | — |
| secondary | #F2EDDE | #000000 | — |
| tertiary | transparent | rgba(0,0,0,0.64) | 1px rgba(0,0,0,0.08) |
| ghost | transparent | rgba(0,0,0,0.64) | — |
| on-color | #FFFFFF | #272302 | — |
| tertiary-on-color | transparent | rgba(255,255,255,0.64) | 1px rgba(255,255,255,0.24) |
| ghost-on-color | transparent | rgba(255,255,255,0.64) | — |
| critical | #CC1800 | #FFFFFF | — |
| critical-ghost | transparent | #991200 | — |
| success | #207C0E | #FFFFFF | — |
| success-ghost | transparent | #207C0E | — |

Icon-only buttons are square pills at the same heights. Loading shows a spinner at a fixed 69px width. The Intelligence button family (AI features only) adds a static violet–indigo–pink mesh background.

### Form controls

| Control | Spec |
| --- | --- |
| Input | Pill, min height 40, padding 8 / 16, white fill, 1px rgba(0,0,0,0.08) border. Value Manrope 500 14/20; placeholder rgba(0,0,0,0.64). Label above in Manrope 700 14; helper and "Opcional" below in Manrope 500 12/16. Focus: black border + focus ring. Error #CC1800, success #207C0E, warning #A84600 border and text, with a status icon. |
| Checkbox | 24px box, 8px radius, 16px check icon, 1px border. Checked: black fill, white check. Indeterminate shows a dash. |
| Radio | 24px circle, 12px inner dot, 1px border; selected border black. |
| Switch | Track 52 × 32 pill. Off #F2F2F2, on #000000. Knob 16 (or 24 when showing x / check icons). |
| Chips | 36px pill (44px touch target on native), Manrope 700 14. Selected: black fill, white text. Types: suggestion, filter (single, multiple, dropdown), input. Don't mix intents in one row. |

### Badges

| Badge | Spec |
| --- | --- |
| Badge | Min height 24, radius 4, padding 4 / 8 (4 / 8 / 4 with a 16px icon), Manrope 700 12. Status variants use the "subtle on subtle" surface with the strong text color (e.g. success #D8FAD1 / #207C0E). Accent: #F9E10D / #272302. Space-type variants use the decorative palette. Not interactive. |
| BadgeStatus | Same colors with an 8px status dot instead of an icon. Layouts: default (24 high), inline (20, no fill), dot only (16 circle). |

### Card and list

| Component | Spec |
| --- | --- |
| Card | Full width, 24 radius, white with a 1px rgba(0,0,0,0.08) border, 16 padding, 16:9 media on top. Overline (Manrope 600 12, uppercase) + heading.small title + paragraph.medium text. Optional 4px pill stripe in a feedback color. Hover: overlay + hover shadow. |
| ListItem | 76 high with description, 68 without; 16 padding and gap. Primary text Manrope 700 14; description Manrope 500 14/20. Selected row #F2F2F2. 1px divider. |
| Avatar | 36 / 48 / 60. Circle for people, otherwise 8 / 12 / 16 radius. Fill #F2EDDE, initials in Manrope 700. |
| DataTable | Header, rows and footer 48 high; checkbox column 56. Header text rgba(0,0,0,0.64); sorted header #F2EDDE; selected row #F2F2F2; row hover 8% overlay. Page sizes 15 / 25 / 50. |

### Navigation

| Component | Spec |
| --- | --- |
| NavBar (web) | White bar, padding 8 / 32, bottom border rgba(0,0,0,0.08). Pill items, padding 12 / 16, Manrope 700 14 in rgba(0,0,0,0.64); active item black. CTA is a regular Button. |
| Sidebar | 256 wide (64 collapsed), 24 radius on the right edge. Header 56, items 36 high pills with 20 icons, padding 12, gap 8. Highlight surface #EBE1CB (sand 300). |
| TabBar | 48 high with a 1px bottom divider. Tabs 36 high pills, padding 8 / 12, 20 icon. Selected: black fill, white text. 2–8 tabs. |
| Header (mobile) | 64 high, white, centered Manrope 700 16 title, 48px ghost icon buttons. |
| Link | Large 16, medium 14, small 12 (Manrope 700). Default black, subtle 64% black, visited #8F00D6. Hover: 0.8 opacity + underline; pressed 0.64. |

### Overlays and feedback

| Component | Spec |
| --- | --- |
| Dialog | 480 wide, 24 radius, white, 1px border, sheet shadow, 48% black scrim. Title Host Grotesk 600 20/24; body Manrope 500 16/24 in 64% black. Footer right-aligned medium buttons: ghost secondary, then primary. No close button. |
| Alert | Fluid (ref. 344), 16 padding, 1px border, 24 radius, 20 icons. Title Host Grotesk 600 16/20; description Manrope 500 14/20. Variants: default (white), secondary (sand), info / success / warning / critical (subtle feedback fill + strong text). |
| Toast | 343 × 64, 24 radius, padding 8 / 8 / 8 / 16, Manrope 500 14/20, overlay shadow, 5 s default. Subtle (white + colored icon) or strong (feedback fill + white text). |
| Tooltip | Black fill, white Manrope 500 12/16, 8 radius, padding 4 / 8, 8 from target, 200 max width when multiline. |

### Focus and accessibility

- Focus ring shows only on `:focus-visible`: `0 0 0 1px #FFFFFF, 0 0 0 3px #000000`.
- Never signal a state by color alone; pair it with an icon, text or border.
- Icons are decorative (`aria-hidden`); the text carries the meaning.

## Iconography, logo and imagery

Icons are custom SVGs exported from the Woba Figma file, not a public icon library; they inherit `currentColor` and come in three sizes.

| Size token | px | Where |
| --- | --- | --- |
| iconSize.small | 16 | Small buttons, badges, dense UI |
| iconSize.medium | 20 | Buttons, inputs, nav, alerts, toasts |
| iconSize.large | 32 | Large avatars, empty states |

Until the icon set is published, Lucide (1.5px stroke) is the closest stand-in and is what the earlier Figma prototypes used.

**Logo.** The Woba W-mark is a single path that takes `currentColor`. Use black on yellow and on light surfaces, white on black.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 307.724 205.425" fill="none" aria-label="Woba">
  <path fill="currentColor" d="M 0 8.491 L 0 0 L 34.766 0 L 72.289 182.493 C 72.68 184.469 73.484 185.664 76.632 185.664 C 79.781 185.664 80.584 184.469 80.975 182.493 L 120.084 0 L 187.64 0 L 226.748 182.493 C 227.14 184.469 227.943 185.664 231.092 185.664 C 234.24 185.664 235.044 184.469 235.434 182.493 L 272.958 0 L 307.724 0 L 307.724 7.905 L 266.053 205.425 L 196.521 205.425 L 157.413 22.931 C 157.021 20.955 156.218 19.761 153.851 19.761 C 151.484 19.761 150.68 20.955 150.29 22.931 L 111.181 205.425 L 41.671 205.425 L 0 8.491 Z"/>
</svg>
```

**Imagery.** Warm, naturalistic daylight photos of real workspaces; no heavy filters or black-and-white. No gradients (except the AI mesh), patterns, emoji or decorative illustration in UI.

## Design tokens for a new project

The best path is to install the official packages; the CSS below is a standalone fallback that uses the same variable names, so switching later is a one-line import.

**Option 1 — official packages** (private npm; ask engineering for an access token):

```bash
npm i @woba/ds-tokens @woba/ds-web   # or @woba/ds-native for React Native
```

```css
@import '@woba/ds-tokens/css';   /* --woba-* custom properties */
```

```javascript
// tailwind.config.js
import wobaPreset from '@woba/ds-tokens/tailwind';
export default { presets: [wobaPreset], content: ['./src/**/*.{ts,tsx}'] };
```

**Option 2 — standalone CSS variables** (light theme, core subset):

```css
:root {
  /* Fonts */
  --woba-font-display: "Noticia Text", Georgia, serif;
  --woba-font-heading: "Host Grotesk", system-ui, sans-serif;
  --woba-font-base: "Manrope", system-ui, sans-serif;

  /* Backgrounds and surfaces */
  --woba-color-background-default: #FFFFFF;
  --woba-color-background-subtle: #FAFAFA;
  --woba-color-surface-default: #FFFFFF;
  --woba-color-surface-subtle: #F2F2F2;
  --woba-color-surface-subtle-on-subtle: #E5E5E5;
  --woba-color-surface-inverse: #000000;
  --woba-color-surface-accent-primary: #F9E10D;
  --woba-color-surface-accent-secondary: #F2EDDE;
  --woba-color-surface-accent-secondary-subtle: #F6F2E7;
  --woba-color-surface-common-hover: rgba(0,0,0,0.08);
  --woba-color-surface-common-pressed: rgba(0,0,0,0.16);
  --woba-color-surface-common-disabled: #F2F2F2;
  --woba-color-surface-common-overlay: rgba(0,0,0,0.48);

  /* Content */
  --woba-color-content-default: #000000;
  --woba-color-content-subtle: rgba(0,0,0,0.64);
  --woba-color-content-common-disabled: rgba(0,0,0,0.32);
  --woba-color-content-inverse: #FFFFFF;
  --woba-color-content-accent-primary: #272302;
  --woba-color-content-visited: #8F00D6;

  /* Strokes */
  --woba-color-stroke-default: rgba(0,0,0,0.08);
  --woba-color-stroke-common-selected: #000000;

  /* Feedback: strong / subtle */
  --woba-color-surface-feedback-info: #006BB2;     --woba-color-surface-feedback-info-subtle: #E5F5FF;
  --woba-color-surface-feedback-success: #207C0E;  --woba-color-surface-feedback-success-subtle: #EFFDED;
  --woba-color-surface-feedback-warning: #A84600;  --woba-color-surface-feedback-warning-subtle: #FFF0E5;
  --woba-color-surface-feedback-critical: #CC1800; --woba-color-surface-feedback-critical-subtle: #FFEDEB;
  --woba-color-content-feedback-critical: #991200;

  /* Spacing */
  --woba-spacing-gap-xsmall: 4px;  --woba-spacing-gap-small: 8px;   --woba-spacing-gap-medium: 12px;
  --woba-spacing-gap-large: 16px;  --woba-spacing-gap-xlarge: 20px; --woba-spacing-gap-jumbo: 32px;
  --woba-spacing-padding-nano: 4px;   --woba-spacing-padding-2xsmall: 8px; --woba-spacing-padding-xsmall: 12px;
  --woba-spacing-padding-small: 16px; --woba-spacing-padding-medium: 20px; --woba-spacing-padding-large: 24px;
  --woba-spacing-padding-xlarge: 32px; --woba-spacing-padding-2xlarge: 48px; --woba-spacing-padding-jumbo: 64px;

  /* Radius and stroke */
  --woba-border-radius-nano: 4px;   --woba-border-radius-xsmall: 8px; --woba-border-radius-small: 12px;
  --woba-border-radius-medium: 16px; --woba-border-radius-large: 24px; --woba-border-radius-jumbo: 32px;
  --woba-border-radius-pill: 999px;
  --woba-stroke-small: 1px;

  /* Elevation */
  --woba-shadow-focus-ring: 0 0 0 1px #FFFFFF, 0 0 0 3px #000000;
  --woba-shadow-hover: 0 1px 1px 0 rgba(0,0,0,0.24), 0 0 1px 0 rgba(0,0,0,0.32);
  --woba-shadow-overlay: 0 20px 24px -4px rgba(0,0,0,0.08), 0 8px 8px -4px rgba(0,0,0,0.08);
  --woba-shadow-sheet: 0 12px 64px 0 rgba(0,0,0,0.08);

  /* Motion */
  --woba-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --woba-duration-fast: 120ms; --woba-duration-base: 200ms; --woba-duration-slow: 320ms;
}
```

The shadow and motion variables are shorthands for this doc; the package splits shadows into x, y, blur, spread and color tokens and does not ship motion tokens.

## Sources

- [wobabr/woba-ds](https://github.com/wobabr/woba-ds) — `packages/ds-tokens` (Figma + Supernova sync, Aug 2026), `packages/ds-web`, `docs/components`
- [Woba Design System](https://claude.ai/artifact/Dsqm6WEHTqZFfZ9d8vfoRx) artifact — brand rules, voice, motion and the earlier Figma "Global Tokens Woba" values
