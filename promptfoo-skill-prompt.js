// Phase 1.5 로컬 전용 promptfoo 프롬프트 로더.
// skills/<name>/SKILL.md 원본을 그대로 읽어 frontmatter만 벗기고 $1/$2/$ARGUMENTS를 치환한다.
// 별도 사본을 유지하지 않는 이유: SKILL.md가 수정돼도 이 파일을 따로 손댈 필요가 없어야
// CHECKPOINT.md에서 이미 겪은 문서-실제 드리프트(수치 모순)와 같은 문제가 재발하지 않는다.
const fs = require("fs");
const path = require("path");

module.exports = function loadSkillPrompt({ vars }) {
  const skillPath = path.join(__dirname, "skills", vars.skill, "SKILL.md");
  const raw = fs.readFileSync(skillPath, "utf-8");
  const body = raw.replace(/^---[\s\S]*?---\n/, ""); // frontmatter 제거

  if (vars.arg2 !== undefined) {
    return body.split("$1").join(vars.arg1).split("$2").join(vars.arg2);
  }
  return body.split("$ARGUMENTS").join(vars.arg1);
};
