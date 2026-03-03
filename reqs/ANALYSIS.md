# David O'Connell -- Requirements Analysis

## The Big Picture: What David Needs

David O'Connell is a movement coach who co-owns a boutique health and wellness center in western Massachusetts. He needs **two things that converge into one platform**:

1. **A subscription-based online video platform** for streaming/downloading movement and exercise classes
2. **An AI-powered content engine** that can synthesize multiple movement methodologies into novel exercise programs while maintaining strict fidelity to biomechanical principles

His ideal app is a **Netflix-meets-interactive-anatomy-atlas for somatic movement**, where subscribers follow structured courses AND explore personalized exercise plans through an interactive body map -- all powered by AI that deeply understands his proprietary methodology.

---

## 1. BUSINESS REQUIREMENTS

### Business Model
- **Subscription-based video platform** -- users pay recurring fees to stream or download content
- **Two distinct product lines** serving different audiences from one platform:
  - **Online Stretch Platform** (local) -- supports the brick-and-mortar wellness center, targeting 2-4 towns in western MA
  - **8-Week Course + Synthesized Movement Systems** (broad) -- targets a national/global audience, women 35-60 with chronic pain, emotional fatigue, or body disconnection

### Revenue
- Subscription fees are the primary monetization mechanism
- Content is the moat -- David's proprietary methodology of synthesizing movement systems creates unique value "that just nobody out there has"

### Team & Constraints
- Small team: David (content/methodology), 2+ business partners (own the wellness center), a hired videographer
- No technical staff -- needs a turnkey solution
- Budget-conscious -- Clayton offered a free POC before any paid engagement
- David is near burnout from months of fighting ChatGPT -- needs this to work

### Competitive Advantage
- The synthesis of multiple movement systems (Original Strength, Active Isolated Stretching, NASM corrective exercise, martial arts, somatic movement) into novel methodologies
- Deep expertise in muscle firing sequences, joint complex balancing, and neurodevelopmental movement
- Specific, precise instructions that produce 7-9 benefits from a single exercise system

---

## 2. TECHNICAL REQUIREMENTS

### Platform
- **Web application** (responsive) -- no native mobile app mentioned
- Cloud-hosted, initially low-scale
- Subscription/payment integration (Stripe or similar) -- mocked in POC

### Video Infrastructure
- Video hosting with streaming AND download capability
- Videos produced externally (David + videographer + model)
- Videos tagged by: muscle groups, movement patterns, posture deviations, equipment, intensity, type

### AI/LLM Integration (Core Differentiator)
Four distinct AI use cases:
1. **Movement Methodology Synthesis** -- Combine disparate systems (e.g., 17th-century martial art + modern strength training) into novel programs. Requires processing millions of words across 11+ governance files while maintaining 94-97% fidelity.
2. **Dynamic User-Facing Program Generation** -- End users generate personalized regimens via simple one-button interactions, powered by agent orchestration across multiple AI providers.
3. **Book/Document Transcription** -- Digitize a 27-page photographed book at 94-97% character-level fidelity.
4. **Interactive Exercise Recommendation Engine** -- Rule-based + AI-powered exercise selection from anatomical chart interactions.

### Multi-Provider AI Strategy
- **ChatGPT**: Rejected -- too much hallucination, context drift
- **Gemini**: Strong for single complex prompts with many documents/images
- **Claude**: Limited upload size but excels at extended reasoning (up to 7 hours)
- **Architecture**: Agent orchestration mixing providers per-task

### Data Model (Core Entities)
- **Muscle**: name, region, layer, actions, overactive/underactive patterns, antagonists, synergists
- **Exercise**: type, dosage, intensity, contraindications, muscle tags, movement patterns, equipment, role-per-muscle
- **PosturalDeviation**: visual markers, drivers, muscle imbalances, sequencing templates, time-based plan templates
- **User**: authentication, subscription tier, access level
- **Course**: 8-week structure, sessions, weeks, progression
- **Session**: ordered exercises with timing
- **MovementSystem**: source methodology documentation for AI synthesis

---

## 3. USER EXPERIENCE REQUIREMENTS

### Target Users
- **Primary persona**: Women ages 35-60 experiencing chronic pain (back, neck, joints), emotional fatigue, anxiety, menopausal/autoimmune symptoms, or feeling "disconnected from their bodies"
- **Local persona**: Existing clients of the western MA wellness center
- **These are NOT fitness enthusiasts** -- they're people who have "tried the stretches, the yoga classes, even the massage" and are still stuck

### Key UX Features (Priority Order)

**P0 -- MVP:**
- Subscription-based video streaming/download
- 8-week structured course (2x/week, 16 sessions total covering neck, shoulders, spine, hips, knees, ankles)
- Professional video content with David guiding a model through exercises

**P1 -- Core Differentiators:**
- **Interactive Anatomical Click-Map** -- SVG front/back body diagram with 3 layers:
  - Layer 1: Body regions (neck, shoulder, thorax, lumbar, hip, etc.)
  - Layer 2: Individual muscles (zoom/toggle)
  - Layer 3: Functional lines (posterior chain, anterior chain, lateral, spiral)
  - Hover shows muscle name + function; click opens exercise panel
- **Postural Deviation Library** -- 9 supported deviations with auto-generated corrective sessions
- **Session Builder** -- "Add to Session" workflow + auto-build by duration (6/10/12/20/30 min)
- **Filters**: Equipment (none/band/wall/chair/dumbbell), time, intensity (1-5)

**P2 -- Future:**
- AI-powered personalized program generation (user-facing)
- NASM Overhead Squat Assessment integration
- Agonist/antagonist muscle balance mapping

### Design Principles (Derived from David's Somatic Philosophy)
The platform's UX should mirror the movement philosophy it teaches:
1. **Safety over performance** -- non-judgmental, unhurried, calming
2. **Simplicity over complexity** -- minimize friction, one-click session building
3. **Sensation over appearance** -- warm, calming aesthetic, NOT flashy fitness-influencer style
4. **Progressive, not overwhelming** -- guided entry points, scalable difficulty
5. **"Good / Better / Best"** -- even far from ideal is still progress

### Content Consumption Patterns
- Video-first (3-5 min educational intros, 30 min guided sessions)
- Structured sequential progression (8-week course)
- On-demand interactive exploration (click-map, deviation library)
- Equipment-adaptive (exercises scale from no equipment to dumbbells)

---

## 4. USE CASES

### End User Use Cases
| # | Use Case | Priority |
|---|----------|----------|
| UC-1 | Subscribe and stream/download course content | P0 |
| UC-2 | Follow the 8-week restorative flexibility course (2x/week, full body) | P0 |
| UC-3 | Click anatomical chart to discover and build custom exercise sessions | P1 |
| UC-4 | Select a postural deviation and receive auto-generated corrective plan (6/12/20 min) | P1 |
| UC-5 | AI-generate a personalized movement program (future, user-facing) | P2 |
| UC-9 | Subscribe and pay for access | P2 (mocked in POC) |
| UC-10 | Watch somatic movement educational/intro videos | P2 |
| UC-11 | Filter exercises by equipment | P1 |
| UC-12 | Build sessions constrained to specific time durations | P1 |

### Admin / Creator Use Cases (David)
| # | Use Case | Priority |
|---|----------|----------|
| UC-6 | Upload, tag, and organize video course content | P2 (manual initially) |
| UC-7 | Use AI to synthesize novel movement methodologies from multiple systems | P1 |
| UC-8 | Transcribe/digitize physical books at 94-97% fidelity | P3 |

### Critical Constraints on All AI Use Cases
- **Open Kinetic Chain ONLY** -- no closed kinetic chain movements allowed
- **Permission gate** -- AI must analyze and explain but NOT recommend exercises without user permission
- **Fidelity** -- 94-97% accuracy to source methodology principles; zero tolerance for drift
- **Governing principles preserved**: reciprocal innervation, reciprocal inhibition, specific muscle firing sequences

---

## 5. THE IDEAL APP -- SYNTHESIZED VISION

David's ideal platform is a **three-layer product**:

### Layer 1: Video Course Platform (Foundation)
A clean, calming subscription site where users follow structured courses. The 8-week restorative flexibility course is the launch product. Professional video with David guiding a model. Stream or download. Simple, warm, non-intimidating.

### Layer 2: Interactive Movement Intelligence (Differentiator)
The anatomical click-map + postural deviation library transforms the platform from "another online course" into an interactive movement encyclopedia. Users don't just watch -- they explore their own body, discover what's overactive/underactive, and build personalized corrective sessions. This is where the deep kinesiology knowledge becomes accessible to non-experts.

### Layer 3: AI-Powered Movement Synthesis (Moonshot)
The long-term vision: an AI engine that can take David's expertise in Original Strength, Active Isolated Stretching, somatic movement, martial arts, NASM corrective exercise, and neurodevelopmental movement -- and synthesize entirely new exercise systems from them. Initially for David as a creator tool. Eventually, for end users to generate personalized programs with one button press.

### What Makes This Different
Most online fitness platforms are video libraries. David's platform would be a **movement intelligence system** -- one that understands the biomechanical relationships between muscles, the neurological principles behind movement patterns, and can dynamically compose exercise programs that address the root causes of pain and dysfunction, not just the symptoms.

---

## 6. POC SCOPE (Immediate Next Step)

Clayton committed to building a proof of concept that:
- Is a hosted web application (not a mockup or slide deck)
- Shows the platform's potential with real content
- Has some functional elements and some "smoke and mirrors" (e.g., non-functional subscribe button)
- Can be delivered within ~2 business days
- Is free -- intended to demonstrate value before any contractual engagement
- Will be followed by an extended hands-on evaluation period for David

---

## 7. KEY RISKS

1. **AI Fidelity** -- The #1 technical and business risk. David's entire methodology depends on precise biomechanical instructions. AI drift could produce exercises that are ineffective or harmful.
2. **Corpus Scale** -- Synthesizing millions of words across multiple movement systems while maintaining context is architecturally challenging.
3. **Anatomical Chart Complexity** -- The interactive SVG with 3 layers, hover/click interactions, and rule engine is a significant frontend engineering effort.
4. **David's Burnout** -- He's been fighting ChatGPT for months. The solution must be dramatically better, not incrementally better.
5. **Two-Audience Tension** -- The local wellness center audience and the broader national audience may have conflicting feature priorities.
