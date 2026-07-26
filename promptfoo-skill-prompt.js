// Phase 1.5 로컬 전용 promptfoo 프롬프트 로더.
// skills/<name>/SKILL.md 원본을 그대로 읽어 frontmatter만 벗기고 $1/$2/$ARGUMENTS를 치환한다.
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

  // vars가 이 스킬의 실제 입력 방식($1/$2 vs $ARGUMENTS)과 안 맞으면 치환이 안 된 채
  // 조용히 반환되던 결함을 막는다 — 깨진 프롬프트를 그대로 API에 보내는 대신 즉시 실패시킨다.
  // 치환 "결과물"이 아니라 원본 body에 기대 플레이스홀더가 있는지로 판정한다 — 그래야
  // 사용자 입력값(arg1/arg2)에 우연히 "$1"/"$2" 문자열이 들어있어도 오탐하지 않는다.
  const expectedPlaceholder = vars.arg2 !== undefined ? /\$1|\$2/ : /\$ARGUMENTS/;
  if (!expectedPlaceholder.test(body)) {
    throw new Error(
      `${vars.skill}: 변수 치환 실패 — vars(${JSON.stringify(vars)})가 이 스킬의 입력 방식과 맞지 않습니다.`
    );
  }

  return vars.arg2 !== undefined
    ? body.split("$1").join(vars.arg1).split("$2").join(vars.arg2)
    : body.split("$ARGUMENTS").join(vars.arg1);
};
