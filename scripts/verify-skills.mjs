// Phase 3 커뮤니티 기여용 안전·구조 검수 스크립트 (CONTRIBUTING.md STEP 3에서 안내).
// 의존성 없음(node 내장 fs/path만 사용) — 이 저장소의 "서버·빌드 없음" 원칙(NFR-비용1)과 동일하게 유지.
// 실행: node scripts/verify-skills.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(ROOT, "skills");
const commandsDir = path.join(ROOT, "commands");

function splitFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { fm: null, body: md };
  return { fm: m[1], body: m[2] };
}
// 머리말 검사: 의존성 없이 YAML 전체를 해석할 수는 없으므로, 이 저장소는 더 좁은 규칙만 허용한다.
// "한 줄에 `이름: 값` 하나, 이름은 따옴표 없이, 값은 올바르게 닫힌 따옴표 값이거나 안전한 평문".
// 여러 줄 값·중첩 항목은 올바른 YAML이어도 거부한다.
// 빈 값·공백뿐인 값·null도 거부한다. 큰따옴표 안의 이스케이프는 \" \\ \n \t \uXXXX 만 허용한다.
function simpleScalarOk(v) {
  if (/^(~|null|Null|NULL)$/.test(v) || /^(["'])\s*\1$/.test(v)) return false;
  // 따옴표 없는 참/거짓·숫자는 YAML에서 글이 아닌 값으로 읽힌다.
  if (/^(true|false|yes|no|on|off|[-+]?(\d[\d_]*)(\.\d*)?(e[-+]?\d+)?)$/i.test(v)) return false;
  if (v.startsWith('"')) {
    if (!/^"(?:[^"\\]|\\["\\nt]|\\u[0-9A-Fa-f]{4})*"$/.test(v)) return false;
    return JSON.parse(v.replace(/\t/g, " ")).trim().length > 0;
  }
  if (v.startsWith("'")) return /^'(?:[^']|'')*'$/.test(v);
  return !/^[\[\]{}&*!|>%@`#,]/.test(v) && !/^[-?:](\s|$)/.test(v) && !/:\s|\s#|:$/.test(v);
}
function parseFrontmatter(fm) {
  const fields = new Map();
  const errors = [];
  if (fm === null) return { fields, errors: ["머리말 없음"] };
  for (const line of fm.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const m = line.match(/^([A-Za-z0-9_-]+): +(\S.*?)\s*$/);
    if (!m) { errors.push(`줄 형식(${line.slice(0, 24)})`); continue; }
    const [, key, value] = m;
    if (fields.has(key)) errors.push(`중복(${key})`);
    if (!simpleScalarOk(value)) errors.push(`값(${key})`);
    fields.set(key, value);
  }
  return { fields, errors };
}
// $ARGUMENTS는 정확히 이 모양으로 한 번만. 뒤에 글자·숫자·밑줄·대괄호가 붙으면 다른 이름이다.
function argumentSlotOk(body) {
  const all = body.match(/\$ARGUMENTS/g) || [];
  const exact = body.match(/\$ARGUMENTS(?![A-Za-z0-9_\[])/g) || [];
  return all.length === 1 && exact.length === 1;
}
// 폴더 안의 모든 파일(숨김 폴더·하위 폴더 포함). 스킬 폴더를 손으로 ZIP으로 만들면 숨김 폴더도 들어갈 수 있다.
function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? listFiles(full) : [full];
  });
}

let ok = true;

const allEntries = fs.readdirSync(skillsDir).sort();
const skillDirs = allEntries.filter((d) => fs.existsSync(path.join(skillsDir, d, "SKILL.md")));
const extras = allEntries.filter((d) => !skillDirs.includes(d));
if (extras.length) {
  console.log(`!! skills/ 안에 SKILL.md 없는 항목: ${extras.join(", ")} (스킬 폴더가 아니면 무시 가능)`);
}

console.log(`=== 스킬 ${skillDirs.length}개: frontmatter + commands/ 대조 ===\n`);

const rows = [];
let fmIssues = 0;
let bodyMismatch = 0;

for (const d of skillDirs) {
  const skillPath = path.join(skillsDir, d, "SKILL.md");
  const cmdPath = path.join(commandsDir, `${d}.md`);
  const s = splitFrontmatter(fs.readFileSync(skillPath, "utf8"));
  const cExists = fs.existsSync(cmdPath);
  const c = cExists ? splitFrontmatter(fs.readFileSync(cmdPath, "utf8")) : null;

  const sf = parseFrontmatter(s.fm);
  const cf = c ? parseFrontmatter(c.fm) : null;
  const name = sf.fields.get("name");
  const desc = sf.fields.get("description");
  // Claude 앱 업로드(Agent Skills 규격)가 받는 최상위 항목만 허용한다. 다른 항목이 있으면 업로드가 거부된다.
  const UPLOAD_KEYS = ["name", "description", "license", "allowed-tools", "metadata", "compatibility"];
  const extraKeys = [...sf.fields.keys()].filter((k) => !UPLOAD_KEYS.includes(k));
  // 명령 파일의 머리말은 description 하나만 둔다.
  const cmdFmErrors = cf
    ? [...cf.errors, ...[...cf.fields.keys()].filter((k) => k !== "description").map((k) => `항목(${k})`),
       ...(cf.fields.has("description") ? [] : ["description 없음"])]
    : [];
  // 번호 자리표시는 도구마다 시작 번호가 달라 금지. 본문(명령 파일 포함)은 $ARGUMENTS를 정확히 한 번 쓴다.
  const numbered = s.body.match(/\$\d|\$ARGUMENTS\[/g) || [];

  const nameOk = name === d;
  const descOk = Boolean(desc);
  const fmErrors = [...sf.errors, ...cmdFmErrors.map((e) => `명령:${e}`)];
  const keysOk = extraKeys.length === 0;
  const varsOk = numbered.length === 0 && argumentSlotOk(s.body);
  // 로컬 체크아웃에서 commands/*.md만 CRLF로 정규화되는 경우가 있어(git index는 둘 다 LF —
  // `git ls-files --eol`로 확인됨) 줄바꿈 차이를 무시하고 실제 내용만 비교한다.
  const norm = (t) => t.replace(/\r\n/g, "\n").trim();
  const bodySame = cExists && norm(s.body) === norm(c.body);

  if (!nameOk || !descOk || fmErrors.length || !keysOk || !varsOk) { fmIssues++; ok = false; }
  if (!cExists || !bodySame) { bodyMismatch++; ok = false; }

  rows.push({
    skill: d,
    "name==폴더": nameOk ? "OK" : `X(${name})`,
    description: descOk ? "OK" : "MISSING",
    머리말형식: fmErrors.length ? `X(${fmErrors.join(",")})` : "OK",
    "업로드 허용 항목만": keysOk ? "OK" : `X(${extraKeys.join(",")})`,
    입력자리: varsOk ? "OK" : (numbered.length ? `번호금지(${[...new Set(numbered)].join(",")})` : "$ARGUMENTS가 정확히 1번이 아님"),
    "commands/*.md": cExists ? "OK" : "MISSING",
    본문일치: cExists ? (bodySame ? "OK" : "DIFF") : "-",
  });
}
console.table(rows);
// 짝이 되는 스킬이 없는 명령 파일도 플러그인과 함께 배포되므로 실패로 본다.
const orphans = fs.readdirSync(commandsDir).filter((f) => !skillDirs.includes(f.replace(/\.md$/, "")) || !f.endsWith(".md"));
if (orphans.length) {
  console.log(`!! commands/ 안에 짝이 되는 스킬이 없는 항목: ${orphans.join(", ")}`);
  ok = false;
}
console.log(`\nfrontmatter 이슈: ${fmIssues}건 / commands 누락·불일치: ${bodyMismatch}건`);

console.log("\n=== 안전 스캔 (기계 패턴: 셸/코드실행/훅/도구호출/인젝션/비밀값) ===");
const danger = [
  [/^\s*!/m, "shell(!cmd)"],
  [/\bexec\s*\(|\bspawn\s*\(|child_process/, "exec/spawn"],
  [/```(bash|sh|powershell|python|js|javascript)/i, "exec-codeblock"],
  [/ignore (all )?(previous |prior )?instructions/i, "injection-phrase"],
  [/allowed-tools|mcp__|tool_use/i, "mcp-tool-call"],
  [/(sk-|ghp_|xoxb-|AKIA)[A-Za-z0-9_-]{8,}/, "secret-pattern"],
];
let hits = 0;
// 배포되는 파일 전부를 검사한다: commands/ 전체 + 각 스킬 폴더 전체.
const scanTargets = [...listFiles(commandsDir), ...skillDirs.flatMap((d) => listFiles(path.join(skillsDir, d)))];
for (const f of scanTargets) {
  const t = fs.readFileSync(f, "utf8");
  for (const [re, label] of danger) {
    if (re.test(t)) {
      console.log(`  HIT [${label}] ${path.relative(ROOT, f)}`);
      hits++;
      ok = false;
    }
  }
}
console.log(hits === 0 ? "  위험 패턴 0건 (SEC-A1·A2·A4와 비밀값 패턴 기준)" : `  총 ${hits}건 — 위 항목 수정 후 재검사 필요`);
console.log("  ※ SEC-A3(개인정보 유도)는 이 검사가 판별하지 못합니다. 사람이 본문을 읽고 확인하세요.");

console.log(`\n=== 최종 판정: ${ok ? "✅ PASS — 병합 가능" : "❌ FAIL — 병합 전 수정 필요"} ===`);
process.exit(ok ? 0 : 1);
