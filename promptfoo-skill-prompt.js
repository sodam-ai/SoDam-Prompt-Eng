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

  const rendered = vars.arg2 !== undefined
    ? body.split("$1").join(vars.arg1).split("$2").join(vars.arg2)
    : body.split("$ARGUMENTS").join(vars.arg1);

  // vars가 이 스킬의 실제 입력 방식($1/$2 vs $ARGUMENTS)과 안 맞으면 치환이 안 된 채
  // 조용히 반환되던 결함을 막는다 — 깨진 프롬프트를 그대로 API에 보내는 대신 즉시 실패시킨다.
  if (/\$1|\$2|\$ARGUMENTS/.test(rendered)) {
    throw new Error(
      `${vars.skill}: 변수 치환 실패 — vars(${JSON.stringify(vars)})가 이 스킬의 입력 방식과 맞지 않습니다.`
    );
  }
  return rendered;
};
