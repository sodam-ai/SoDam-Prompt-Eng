# SoDam Prompt — Absolute Beginner Guide (For Those New to Computers/AI)

> This document is for people who have **never used a computer, smartphone, messenger app, or AI before.**
> No jargon — we explain exactly where to click on the screen, step by step.
>
> For **more technical detail** (full command list, security architecture, developer-facing structure),
> see [README_EN.md](./README_EN.md) (the complete reference) in the same folder. This document and
> README_EN.md never contradict each other — GUIDE_EN.md is the "easy summary," README_EN.md is the
> "full detail."

License: Apache-2.0 | Language: English (한국어: [GUIDE.md](./GUIDE.md))

---

## Table of Contents

1. [What Is This, Exactly?](#1-what-is-this-exactly)
2. [What You Need Before You Start](#2-what-you-need-before-you-start)
3. [Installing Required Programs](#3-installing-required-programs)
4. [How to Download the Files](#4-how-to-download-the-files)
5. [Your First Result in 5 Minutes (Quick Start)](#5-your-first-result-in-5-minutes-quick-start)
6. [How to Run It — Step by Step, No Screenshots Needed](#6-how-to-run-it--step-by-step-no-screenshots-needed)
7. [How to Use It — Just Say This](#7-how-to-use-it--just-say-this)
8. [Full List of 10 Commands (Skills)](#8-full-list-of-10-commands-skills)
9. [Update History Summary](#9-update-history-summary)
10. [Where Are My Files Stored?](#10-where-are-my-files-stored)
11. [The Full Workflow (Simple Diagram)](#11-the-full-workflow-simple-diagram)
12. [Is This Safe? (Plain-Language Explanation)](#12-is-this-safe-plain-language-explanation)
13. [What to Do If Something Goes Wrong](#13-what-to-do-if-something-goes-wrong)
14. [Frequently Asked Questions (FAQ)](#14-frequently-asked-questions-faq)
15. [Copyright, License, and Can I Make Money From This?](#15-copyright-license-and-can-i-make-money-from-this)
16. [Getting Help](#16-getting-help)

---

## 1. What Is This, Exactly?

**SoDam Prompt** is a set of **10 pre-made "question templates"** you give to an AI (artificial intelligence) when you want it to write something for you.

Think of it like a fill-in-the-blank worksheet from school:
- The worksheet has 2–3 blanks
- You fill in the blanks and hand it to the "teacher" (the AI)
- The teacher writes a finished piece (a book report, a message, etc.) and hands it back

**Does it cost money?** The templates (skill files) themselves are completely free. To actually use an AI, you need an account with an AI service (like Claude), and that service's own pricing is set by the AI company, not by this project.

**Do I need to know how to code?** Not at all. Just follow this document from start to finish.

---

## 2. What You Need Before You Start

Check that you have these 3 things before beginning.

| What you need | Why | Don't have it? |
|---|---|---|
| A computer or laptop with internet | You need to install software and download files | Some methods (the Claude.ai app) also work on a smartphone alone |
| An AI service account (e.g. Claude, ChatGPT) | The AI is what actually writes the text | Sign up free at `claude.ai` |
| An email address | Required to sign up for an AI service | Create one first (e.g. Gmail) if you don't have one |

> **Terms explained**
> - **"Computer"**: the device you're reading this on right now (Windows PC, MacBook, etc.)
> - **"AI (Artificial Intelligence)"**: a computer program that understands and writes text like a human (Claude, ChatGPT, etc.)
> - **"Account (login)"**: your personal online ID, made with an email and password

---

## 3. Installing Required Programs

**The easiest path installs nothing at all.** Just follow "Method A" below and you won't need to install anything.

### Method A — Install Nothing (Recommended, ★Easiest)

1. Open your web browser (Chrome, Edge, etc.).
2. Type `claude.ai` into the address bar and press Enter.
3. Follow the on-screen instructions to sign up (or log in) with your email.

That's it. No installation required.

### Method B — Using the Developer Tool (Claude Code) (Optional, More Advanced)

Recommended only if you have some prior computer experience. If this is your first time, **Method A alone is enough.**

1. In your browser, go to `nodejs.org` → click the button labeled **LTS** → download it
2. Double-click the downloaded file → keep clicking "Next" to install
3. Open a "black window" (terminal): on Windows search "cmd" in the Start menu; on Mac, search "Terminal"
4. Type the following exactly and press Enter:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
5. When installation finishes, confirm it worked by typing:
   ```
   claude --version
   ```
   If a version number appears, it succeeded.

---

## 4. How to Download the Files

1. In your browser, go to this project's GitHub page.
2. Click the **green "Code" button** near the top of the page.
3. From the menu that appears, click **"Download ZIP."**
4. Find the downloaded ZIP file (usually in your "Downloads" folder) and **double-click to unzip it.**
5. Unzipping creates a folder named `SoDam-Prompt-Eng-main`. If it contains a `skills` folder inside, you're done.

> **What does "unzip" mean?** A ZIP file bundles many files into one, like a gift box. Double-clicking it "unpacks" the box so you can see the folders and files inside.

---

## 5. Your First Result in 5 Minutes (Quick Start)

**If you used Method A (no install)**, follow these steps for your first result in about 5 minutes.

**Step 1**: Log in to `claude.ai` → click your profile icon (top right) → click **"Customize"**

**Step 2**: In the left menu, click **"Skills"** → click **"+ Create skill"**

**Step 3**: Open the `skills` folder from the folder you downloaded in Step 4 above, and upload one entire skill folder (e.g., `book-report-helper` — Book Report Helper).

**Step 4**: Turn the toggle switch next to the uploaded skill **ON**.

**Step 5**: In the chat box, type something like:
```
Write a book report about The Little Prince. I was moved by the fox scene.
```

If the AI writes a 3-paragraph book report, it worked!

---

## 6. How to Run It — Step by Step, No Screenshots Needed

There is only one way to "use" this project: **ask the AI in plain, natural language.**

No buttons to press, no commands to memorize. Just talk to it like you'd ask a human assistant.

Examples:
- "Write a polite message asking my manager for a day off next week" → the "Polite Message" skill responds automatically
- "Summarize this long text in 3 lines" (+ paste the long text) → the "3-Line Summary" skill responds

**Why does this work?** Each skill file contains a description of "when to use me," so the AI automatically picks the right one.

---

## 7. How to Use It — Just Say This

To try all 10 skills, type the following sentences directly into your AI chat window.

```
Write a book report about The Little Prince. It was touching.
Write a polite message to my manager requesting a day off next week.
Summarize this text in 3 lines. (+ paste a long text)
Explain what artificial intelligence is, simply, for an elementary schooler.
Make me a 2-week study plan for math.
Polish my self-introduction for a club application. (+ paste your notes)
Write an SNS caption for a picnic photo by the river, upbeat mood.
Rewrite this sentence in natural English: I'm so tired today.
Write a 5-minute presentation script about climate change.
Write an apology message to my teacher for turning in homework late.
```

---

## 8. Full List of 10 Commands (Skills)

| # | Name | What to Fill In | What You Get |
|---|---|---|---|
| 1 | 독후감-도우미 (Book Report Helper) | Book title, one-line impression | 3-paragraph book report |
| 2 | 정중한-메시지 (Polite Message) | Recipient, purpose | Subject + body message |
| 3 | 긴글-3줄요약 (3-Line Summary) | The long text to summarize | 3-line key summary |
| 4 | 쉽게-설명해줘 (Explain Simply) | Topic, listener's age | 1 analogy + simple explanation |
| 5 | 공부-계획표 (Study Planner) | Subject/goal, time period | Weekly study table |
| 6 | 자기소개-다듬기 (Polish Self-Intro) | Your draft, its purpose | Polished self-introduction |
| 7 | sns-캡션 (SNS Caption) | Situation, mood | 2 captions + hashtags |
| 8 | 영어-자연스럽게 (Natural English) | A Korean sentence | Natural English + explanation |
| 9 | 발표-대본 (Presentation Script) | Topic, time limit | Presentation script |
| 10 | 부탁-사과-메시지 (Request/Apology Message) | Situation, relationship | 2 tone versions |

**"Do I need to memorize the commands?"** No. As explained in Section 6, just ask in natural language and the AI picks the right skill automatically. This table is just for browsing.

> If you want the repository-name-prefixed form (`/sodam-prompt:book-report-helper`), the exact steps depend on how you installed it — see the "Claude Code — Official Plugin Install" section in README_EN.md for the exact commands.

---

## 9. Update History Summary

<details>
<summary><strong>2026-07-14~15 — All 10 skills confirmed working + human verification passed (click to expand)</strong></summary>

- Actually ran the remaining 6 skills too — **all 10 skills now confirmed to work correctly**
- Directly tried to trick 3 of the skills into leaking personal info or breaking their own rules — every attempt was blocked
- The item marked "still unconfirmed" in the 2026-07-13 entry below (whether skills actually get called automatically from natural language) has now been **confirmed by the user through direct, hands-on use**
- Added a tool (`promptfoo`) for re-checking that all 10 skills still work correctly after future changes. It doesn't run automatically — the user has to run it manually whenever they want to check (see `PROMPTFOO_로컬_가이드.md`, developer-facing)

</details>

<details>
<summary><strong>2026-07-13 — Official plugin registration + skill folder names switched to English (click to expand)</strong></summary>

- This tool is now formally registered as a Claude Code "plugin" (previously, natural-language calling didn't always work reliably)
- Renamed all 10 skill folders from Korean to English (e.g., 독후감-도우미 → book-report-helper). How you use the skills and what you say to trigger them hasn't changed
- Reviewed and corrected the guide documents (including this one) to match the current actual state
- Ran real attack tests trying to trick the AI into leaking personal info or breaking its own rules — all were successfully blocked
- **Still unconfirmed**: whether this change actually fixed the natural-language auto-recognition issue needs to be confirmed by a human opening a brand-new chat session and testing it directly

</details>

<details>
<summary><strong>2026-07-11 — Finished the transition cleanup (click to expand)</strong></summary>

- Fully cleaned up the earlier "login website" plan (now only these 10 files are needed)
- Reviewed all 10 skills carefully and fixed 3 small defects (e.g. long text being truncated on input)
- Added a "trust only the official source" safety notice to the install instructions
- Created this beginner guide (GUIDE_EN.md)

</details>

<details>
<summary><strong>2026-06-29 — First public release of the 10 skills</strong></summary>

- Released 10 skills for the first time: book report, message, summary, explanation, study plan, self-intro, SNS caption, English translation, presentation script, apology message
- Distributed under the free Apache-2.0 license

</details>

> New updates will keep being added here. (Click the toggles to expand or collapse them.)

---

## 10. Where Are My Files Stored?

- **The original downloaded folder**: wherever you unzipped it (e.g., `Downloads\SoDam-Prompt-Eng-main`)
- **Skills uploaded to the Claude.ai app**: stored on Claude.ai's servers, not on your computer (like any online account)
- **Skills copied for Claude Code**: in your computer's `~/.claude/skills/` folder (a hidden folder)

**Important**: This project has no server that stores your personal information. Whatever you type is sent only to the AI company's servers (e.g., Anthropic).

---

## 11. The Full Workflow (Simple Diagram)

```
① Discover it on GitHub
      ↓
② Download the ZIP (see Section 4)
      ↓
③ Upload it to the Claude.ai app, or copy it into your local AI program
      ↓
④ Ask in plain language in the chat box
      ↓
⑤ The AI writes the finished text
      ↓
⑥ Copy and use it (repeat from step ④ anytime)
```

> For a **more technical explanation** (developer-facing architecture, file structure), see [README_EN.md Sections 9 and 11](./README_EN.md#9-workflow--internal-mechanics).

---

## 12. Is This Safe? (Plain-Language Explanation)

**Yes, it's safe.** Here's why, in 3 points:

1. **These skill files are pure "question templates."** They contain no code that runs programs, deletes files, or secretly connects anywhere.
2. **They never ask for personal information** (name, phone number, address). All 10 skills were checked for this.
3. **They are designed to avoid risky or sensitive topics** (medical, legal, financial, self-harm, adult content).

**But please keep these rules in mind:**
- Never type real personal information (phone number, home address, passwords) into an AI chat window.
- Only download from the official GitHub repository (`sodam-ai/SoDam-Prompt-Eng`). Files from other sources may have been altered.

> For a **deeper security explanation**, see [README_EN.md Section 10](./README_EN.md#10-security--data-flow).

---

## 13. What to Do If Something Goes Wrong

| Symptom | Cause | Fix |
|---|---|---|
| The AI doesn't recognize the skill | The skill hasn't been uploaded/installed yet | Re-check Section 5 (Quick Start) |
| Korean text shows as broken characters | A text-encoding setting in the app you're using | Try opening the file with a different editor instead of Notepad |
| The ZIP file won't unzip | The download was interrupted | Try downloading it again |
| The Claude Code install command doesn't work | Node.js isn't installed | Re-check Section 3, "Method B," starting from step 1 |
| The output doesn't match what you wanted | The blanks were too vague or incomplete | Be more specific, like the example sentences in Section 7 |

**Still stuck?** See Section 16, "Getting Help."

---

## 14. Frequently Asked Questions (FAQ)

**Q: Is this completely free?**
A: The 10 skill files themselves are completely free. However, the AI service's own pricing (free/paid tiers) is set by the AI company (e.g., Anthropic), not by this project.

**Q: Do I need to sign up for anything?**
A: This project itself requires no sign-up. But to use an AI (like Claude), you'll need an account with that service.

**Q: Is my personal data stored anywhere?**
A: No. This project has no server, so nothing is stored. Whatever you type is sent only to the AI company's servers.

**Q: Does this work on a smartphone?**
A: Yes, via the Claude.ai mobile app. However, uploading skills is easier from a computer browser.

**Q: If the result looks wrong, is it my fault?**
A: No. AI isn't perfect. Get in the habit of double-checking results rather than trusting them blindly.

**Q: Can I make money using these skills?**
A: Please read Section 15 carefully — it's allowed under certain conditions.

---

## 15. Copyright, License, and Can I Make Money From This?

This is legally important, so **the authoritative text is [README_EN.md Section 15](./README_EN.md#15-legal--copyright--license--commercial-use) and this project's `LICENSE` and `NOTICE` files.** The summary below is simplified for easy reading; if it ever conflicts with the original text, **the original (LICENSE/NOTICE/README_EN.md) always takes precedence.**

### Plain-Language Summary (Apache License 2.0)

| You May | You Must | You May Not |
|---|---|---|
| Use it freely for personal purposes | Keep the copyright notice (`Copyright 2026 SoDam AI Studio`) | Use the "SoDam" name/logo as your own without permission |
| Use it commercially (include it in a product/service) | State that it's licensed under Apache-2.0 | Falsely claim this software guarantees any specific result |
| Modify and redistribute it | Include the NOTICE file when you distribute it | Impersonate the original author |

### About the Text the AI Generates for You

- The **copyright of the output text** (book reports, messages, etc.) generated by running a skill is governed by **the terms of service of the AI service you used**, not by this project.
- If you used Claude, check Anthropic's terms. If you used Codex, check OpenAI's terms.
- **Do not rely on AI output as-is for important decisions** (medical, legal, financial, etc.). This software and any AI-generated output are provided "as is," with no warranty of any kind.

### Protection of Minors

- Users under 14 are recommended to use this with a guardian's consent and guidance.
- The skills are designed to avoid encouraging dangerous or sexual content, but final output moderation is handled by the AI service itself.

---

## 16. Getting Help

- **Bug reports / suggestions**: Open a new issue on the GitHub Issues tab (Korean is fine too)
- **Official repository**: `github.com/sodam-ai/SoDam-Prompt-Eng` — always verify this exact address before downloading

```
Copyright 2026 SoDam AI Studio
Licensed under the Apache License, Version 2.0
Full terms: see the LICENSE file
```
