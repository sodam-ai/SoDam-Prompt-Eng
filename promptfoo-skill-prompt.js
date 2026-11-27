// Phase 1.5 로컬 전용 promptfoo 프롬프트 로더.
// skills/<name>/SKILL.md 원본을 그대로 읽어 frontmatter만 벗기고 $ARGUMENTS를 치환한다.
// 별도 사본을 유지하지 않는 이유: SKILL.md가 수정돼도 이 파일을 따로 손댈 필요가 없어야
// CHECKPOINT.md에서 이미 겪은 문서-실제 드리프트(수치 모순)와 같은 문제가 재발하지 않는다.
const fs = require("fs");
const path = require("path");

module.exports = function loadSkillPrompt({ vars }) {
  const skillsDir = path.join(__dirname, "skills");
  const skillPath = path.join(skillsDir, vars.skill, "SKILL.md");

  // vars.skill은 promptfooconfig.yaml(로컬 전용 설정)에서만 오지만, "../"로 skills/ 밖을
  // 벗어나는 경로를 방어 없이 그대로 읽던 결함을 막는다 — skills/ 하위가 아니면 즉시 실패.
  const relative = path.relative(skillsDir, skillPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${vars.skill}: skills/ 폴더를 벗어나는 경로는 허용되지 않습니다.`);
  }

  const raw = fs.readFileSync(skillPath, "utf-8");
  const body = raw.replace(/^---[\s\S]*?---\n/, ""); // frontmatter 제거

  // 스킬 본문은 $ARGUMENTS 하나만 쓴다. 도구마다 번호 인자($0, $1 …)의 시작이 달라서
  // 번호 자리표시는 금지한다(2026-11-27: Claude Code는 0부터라 $1이 두 번째 값이었고,
  // 이 로더는 1부터로 치환해 결함을 숨겼다).
  if (/\$\d|\$ARGUMENTS\[/.test(body) || body.split("$ARGUMENTS").length !== 2) {
    throw new Error(`${vars.skill}: 본문에는 $ARGUMENTS가 정확히 한 번 있어야 하고 번호 자리표시는 쓸 수 없습니다.`);
  }

  // 슬래시 호출에서 사람이 입력한 모양을 흉내 낸다: 값이 둘이면 각각 따옴표로 묶어 이어 붙인다.
  const input = vars.arg2 !== undefined ? `"${vars.arg1}" "${vars.arg2}"` : String(vars.arg1);

  // 함수형 치환: 입력값 안의 "$&" 같은 문자가 특수하게 해석되지 않게 한다.
  return body.replace("$ARGUMENTS", () => input);
};
