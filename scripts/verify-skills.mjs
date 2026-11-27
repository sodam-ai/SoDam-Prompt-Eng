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
function fmField(fm, key) {
  const m = fm && fm.match(new RegExp("^" + key + ":\\s*(.*)$", "m"));
  return m ? m[1].trim() : null;
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

  const name = fmField(s.fm, "name");
  const desc = fmField(s.fm, "description");
  // Claude 앱 업로드(Agent Skills 규격)가 받는 최상위 항목만 허용한다. 다른 항목이 있으면 업로드가 거부된다.
  const UPLOAD_KEYS = ["name", "description", "license", "allowed-tools", "metadata", "compatibility"];
  const extraKeys = [...(s.fm || "").matchAll(/^([A-Za-z0-9_-]+)\s*:/gm)].map((m) => m[1]).filter((k) => !UPLOAD_KEYS.includes(k));
  // 번호 자리표시는 도구마다 시작 번호가 달라 금지. 본문(명령 파일 포함)은 $ARGUMENTS를 정확히 한 번 쓴다.
  const numbered = s.body.match(/\$\d|\$ARGUMENTS\[/g) || [];
  const argCount = (s.body.match(/\$ARGUMENTS(?!\[)/g) || []).length;

  const nameOk = name === d;
  const descOk = Boolean(desc);
  const keysOk = extraKeys.length === 0;
  const varsOk = numbered.length === 0 && argCount === 1;
  // 로컬 체크아웃에서 commands/*.md만 CRLF로 정규화되는 경우가 있어(git index는 둘 다 LF —
  // `git ls-files --eol`로 확인됨) 줄바꿈 차이를 무시하고 실제 내용만 비교한다.
  const norm = (t) => t.replace(/\r\n/g, "\n").trim();
  const bodySame = cExists && norm(s.body) === norm(c.body);

  if (!nameOk || !descOk || !keysOk || !varsOk) { fmIssues++; ok = false; }
  if (!cExists || !bodySame) { bodyMismatch++; ok = false; }

  rows.push({
    skill: d,
    "name==폴더": nameOk ? "OK" : `X(${name})`,
    description: descOk ? "OK" : "MISSING",
    "업로드 허용 항목만": keysOk ? "OK" : `X(${extraKeys.join(",")})`,
    입력자리: varsOk ? "OK" : (numbered.length ? `번호금지(${[...new Set(numbered)].join(",")})` : `$ARGUMENTS ${argCount}번`),
    "commands/*.md": cExists ? "OK" : "MISSING",
    본문일치: cExists ? (bodySame ? "OK" : "DIFF") : "-",
  });
}
console.table(rows);
console.log(`\nfrontmatter 이슈: ${fmIssues}건 / commands 누락·불일치: ${bodyMismatch}건`);

console.log("\n=== 안전 스캔 (SEC-A1~A4: 셸/코드실행/훅/인젝션/시크릿) ===");
const danger = [
  [/^\s*!/m, "shell(!cmd)"],
  [/\bexec\s*\(|\bspawn\s*\(|child_process/, "exec/spawn"],
  [/```(bash|sh|powershell|python|js|javascript)/i, "exec-codeblock"],
  [/ignore (all )?(previous |prior )?instructions/i, "injection-phrase"],
  [/allowed-tools|mcp__|tool_use/i, "mcp-tool-call"],
  [/(sk-|ghp_|xoxb-|AKIA)[A-Za-z0-9_-]{8,}/, "secret-pattern"],
];
let hits = 0;
for (const d of skillDirs) {
  const files = [path.join(skillsDir, d, "SKILL.md")];
  const cmdPath = path.join(commandsDir, `${d}.md`);
  if (fs.existsSync(cmdPath)) files.push(cmdPath);
  for (const f of files) {
    const t = fs.readFileSync(f, "utf8");
    for (const [re, label] of danger) {
      if (re.test(t)) {
        console.log(`  HIT [${label}] ${path.relative(ROOT, f)}`);
        hits++;
        ok = false;
      }
    }
  }
}
console.log(hits === 0 ? "  위험 패턴 0건 (SEC-A1~A4 통과)" : `  총 ${hits}건 — 위 항목 수정 후 재검사 필요`);

console.log(`\n=== 최종 판정: ${ok ? "✅ PASS — 병합 가능" : "❌ FAIL — 병합 전 수정 필요"} ===`);
process.exit(ok ? 0 : 1);
