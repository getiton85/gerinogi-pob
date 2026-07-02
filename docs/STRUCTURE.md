# 구조 정리

## 폴더 권장 구조

현재 버전은 정적 파일 기반이므로 루트 실행을 유지합니다. 이후 기능이 커질 때는 아래 구조로 점진 분리합니다.

```text
/
├─ index.html
├─ style.css
├─ app.js
├─ core.js
├─ data.js
├─ docs/
│  ├─ STRUCTURE.md
│  └─ ROADMAP.md
└─ validation/
   └─ v27_value_audit.js
```

## DB 구조

현재 DB는 data.js의 DB 객체에 있습니다.

- classes: 직업과 패시브
- runes.emblem: 엠블럼 룬
- runes.weapon: 무기 룬
- runes.armor: 방어구 룬
- runes.accessory: 장신구 룬, 현재 확장 예정

향후 스킬과 장신구가 추가되면 skills, accessories, effectRules를 별도 DB 축으로 분리합니다.

## 계산 구조

core.js는 다음 순서로 계산합니다.

1. 기본 스탯 환산
2. 장착 룬 효과 합산
3. 패시브 효과 합산
4. 조건부 효과 적용
5. 기대딜 축 계산
6. 기준 세팅 대비 변화율 계산

속도, 쿨타임, 회복 계열은 유틸 정보로만 취급하고 기대딜 밸류에는 반영하지 않습니다.

## UI 구조

app.js는 장착창, 스탯 입력, 대시보드, 추천 순위를 렌더링합니다. 장비 슬롯에서 룬 선택창을 열면 현재 장착 세팅 대비 기대딜 변화율이 높은 순서로 정렬됩니다.
