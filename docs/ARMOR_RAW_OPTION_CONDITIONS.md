# 방어구 원문 옵션 조건부 정리

사용자가 제공한 방어구 룬 스크린샷을 기반으로 원문 옵션, 발동 조건, 유지율 위험도, 계산 반영 주의점을 `data.js`의 `rawOption` 메타데이터에 반영했습니다.

현재 반영 상태: 54/55개. `무너진 경계` 1개는 원문 스크린샷 대기입니다.

## 확정 기준

1. 밤의 축복은 거의 상시 발동으로 본다.
2. 무방비 피해는 브레이크 구간 핵심 딜축이며 치명타 피해, 치명타 확률과 거의 같은 급의 밸류로 본다.
3. 방어구 파괴 기재는 특정 일부 직업, 특히 탱커 쪽 활용도가 높아 범용 딜러 기준 저밸류 조건으로 본다.
4. 침식 기재는 현재 가장 고밸류 조건부 축으로 본다. 다만 침식 300 도달 후 오염으로 효과를 잃는 구간은 주기 평균으로 계산해야 한다.
5. 공격 속도, 스킬 사용 속도, 재사용 대기 시간 회복 속도는 현재 기대딜 점수에 직접 가산하지 않는다.
6. 용의 문장은 최대 2개 제한을 공유하므로 발동형, 지속시간 증가형, 활성 중 보너스형을 분리해서 계산해야 한다.
7. 도발, 아군 치유, 방어구 파괴처럼 특정 직업 기재에 기대는 옵션은 범용 딜러 기준 낮은 가중치를 적용한다.
8. 무형, 사슬로 묶은 법전처럼 하나의 효과만 적용되는 룬은 효과를 합산하지 않고 조건 우선순위별로 별도 평가한다.

## 미반영 대기

- 무너진 경계: 원문 스크린샷 수신 후 rawOption 반영 필요

## 룬별 구조화 요약

| 룬 | 커뮤니티 등급 | 마찰 | 유지율 힌트 | 계산 반영 주의점 |
|---|---:|---:|---:|---|
| 기본기+ | D | low | always | 상시 적 피해 20%만 반영한다. 단일 축이라 복합 룬보다 낮게 평가한다. |
| 첫 번째 서약 | S+ | low | veryHighWhenNightBlessing | 상시 공격력 15%와 밤의 축복 고유지율 복합 딜축으로 평가한다. |
| 녹슨 방패 | A | low | alwaysForDamage | 적 피해 22%만 기대딜 반영. 행동불능 방어는 생존 가치로 별도 표시한다. |
| 긍지 | S+ | medium | passiveAndClassDependent | 공격력 25%는 반영하되 방어구 파괴 기반 받피증은 직업 의존 저밸류 조건으로 낮은 가중치를 둬야 한다. |
| 그믐달 | D | medium | resourceDependent | 적 피해 15%는 반영. 자원 50% 미만 공격력은 직업/사이클별 유지율을 곱해야 한다. |
| 위엄 | S+ | low | highIfPassiveOwned | 전투 숙련 조건 충족 시 공격력 16%와 무방비 피해 32%를 핵심 딜축으로 평가한다. |
| 공세+ | C | medium | skillFrequencyDependent | 최대 중첩 상시가 아니라 스킬 사용 빈도 기반 평균 스택으로 반영해야 한다. |
| 정복자+ | B | high | contentDependent | 보스 단일전에서는 처치 조건을 낮게 보고, 잡몹 콘텐츠에서만 추가 적 피해를 반영한다. |
| 은빛 찬가 | F | high | contentDependent | 공격력 5%만 기대딜 반영. 쿨회복과 처치 조건은 사이클 모델 전까지 보류한다. |
| 기사단장 | A+ | high | contentDependent | 적 피해 5%만 기대딜 반영. 속도 옵션은 현재 밸류 제외. |
| 승전 | S | mediumHigh | contentDependent | 상시 적 피해/치피는 반영. 처치 조건 치피는 콘텐츠별 유지율을 곱한다. |
| 열의+ | F | low | always | 적 피해 7%만 일반 기대딜 반영. 기본공격 피해는 기본공격 비중 모델 이후 반영한다. |
| 수호자 | S+ | low | always | 공격력 24%는 상시 반영. 궁극기 피해/게이지 감소는 궁극기 사이클 모델에서 정밀 반영한다. |
| 맹세+ | F | high | lowHpDependent | 공격력 10%만 기본 반영. 저체력 중첩 피해는 위험 조건으로 낮은 유지율을 적용해야 한다. |
| 서광 | S+ | medium | breakWindowDependent | 공격력 20%는 상시 반영. 브레이크 익스텐드 피해는 브레이크 구간 가중치와 함께 반영한다. |
| 등대지기 | A+ | medium | classDependent | 적 피해 24%는 반영. 방어구 파괴 기반 받피증은 직업 의존 저밸류 조건으로 낮은 가중치를 둔다. |
| 빛살+ | C | medium | unarmoredAndUtilityDependent | 적 피해 5.5%만 기대딜 반영. 속도 옵션은 현재 밸류 제외. |
| 교차하는 사슬 | S+ | low | veryHighWhenNightBlessing | 상시 공격력 15%와 밤의 축복 고유지율 복합 딜축으로 평가한다. |
| 악몽 | C | medium | skillAndAreaHitDependent | 직접 피해는 스킬 빈도와 범위 적중률 기반 DPS로 환산한다. |
| 끓는 피 | B | high | hpAndSkillFrequencyDependent | 스킬 피해는 스킬 비중만큼 반영하고, 자해/체력 조건으로 유지율 감점이 필요하다. |
| 날 선 적의 | S | medium | always | 공격력/치명/추가타/적 피해는 반영. 이동속도 감소는 실전 마찰 감점으로 별도 처리한다. |
| 무덤지기+ | C | medium | alwaysForAttack | 공격력 16%만 기대딜 반영. 처치 회복은 생존 가치로 별도 표시한다. |
| 복수+ | F | high | damageTakenDependent | 피격 중첩 공격력은 위험 조건으로 낮은 유지율을 적용한다. 회복량은 제외. |
| 흐릿한 형상 | SS | medium | erosionCycleDependent | 침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다. |
| 잿빛 장막 | SS | medium | erosionCycleDependent | 침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다. |
| 무너진 경계 | SS | 원문 대기 | 원문 대기 | 스크린샷 수신 후 반영 |
| 아귀 | A | low | alwaysPlusPeriodic | 공격력/무방비는 반영. 5초 주기 직접 피해와 상처 피해는 DPS로 환산한다. |
| 부서진 왕관 | F | high | positionDependent | 장판 탑승/유지 조건으로 낮은 유지율을 적용해야 한다. 최대 3중첩 상시 반영 금지. |
| 거두는 손길 | D | mediumHigh | contentDependent | 전투 시작 15초와 처치 갱신 유지율을 콘텐츠별로 나눠 반영한다. |
| 금 간 봉인 | SS | medium | erosionCycleDependent | 침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다. |
| 무한한 탐욕 | S+ | low | buildDependent | 자원 소모 스킬 비중만큼 반영하고, 쿨회복 감소는 사이클 모델에서 감점한다. |
| 뼈 인장 | S+ | low | slotBuildDependent | 액티브 3번 슬롯이 실제 주력기인지에 따라 스킬 비중 가중치를 적용해야 한다. |
| 공허 | D | medium | cycleDependent | 공격력 5%만 현재 기대딜에 반영. 8스킬마다 쿨감은 스킬 사이클 모델 이후 반영한다. |
| 잊힌 맹약 | B | low | veryHighWhenNightBlessingButUtility | 공격력 15%만 현재 기대딜 반영. 밤축 속도/쿨회복은 사이클 모델 전까지 보류한다. |
| 칼바람 | B | medium | breakSkillDependent | 브레이크 스킬 피해와 7초 치피는 브레이크/스킬 비중에 따라 제한 반영한다. |
| 봉인술사 | S+ | low | tagBuildDependent | 캐스팅/차지 피해는 해당 스킬 비중만큼 반영. 캐스팅/차지 속도는 현재 직접 가산하지 않는다. |
| 폭염+ | S | low | periodicAreaHitDependent | 적 피해 5%는 반영. 2초 주기 광역/화상 피해는 적중 대상 수와 위치 기반 DPS로 환산한다. |
| 별바라기 | S | low | dragonMarkCycleDependent | 적 피해 10%는 상시 반영. 용의 문장 공격력 14%는 10/20초 유지율과 최대 2개 제한을 적용한다. |
| 황동 날개 | D | mediumHigh | ultimateAndDragonMarkDependent | 적 피해 10%는 상시 반영. 용의 문장 적 피해 14%는 궁극기 주기와 최대 2개 제한을 적용한다. |
| 잠들지 않는 불 | S | low | dragonMarkSynergyDependent | 적 피해 10%는 반영. 용의 문장 치명 확률은 활성 시간과 최대 2개 제한을 적용한다. |
| 번개 숨결 | D | medium | dragonMarkDependent | 적 피해 10%는 반영. 강타 피해 18%는 용의 문장 활성 시간과 강타 비중을 곱한다. 속도는 제외. |
| 돌 심장 | D | medium | dragonMarkDependent | 적 피해 10%는 반영. 연타 피해 18%는 용의 문장 활성 시간과 연타 비중을 곱한다. 쿨회복은 보류. |
| 용암 비늘 | D | low | dragonMarkCycleDependent | 적 피해 10%는 반영. 1초 주기 피해는 용의 문장 유지율 기반 직접 DPS로 환산한다. |
| 얼음 발톱 | S | low | dragonMarkSynergyDependent | 적 피해 10%는 반영. 용의 문장 추가타 확률은 활성 시간과 최대 2개 제한을 적용한다. |
| 숲 길잡이 | S+ | low | high | 피해 21%는 공격/이동 조건의 높은 유지율로 반영한다. 이동 속도는 직접 기대딜 제외. |
| 바다뱀+ | F | low | tagBuildDependent | 공격력 5%와 채널링 스킬 비중만큼 반영. 스킬 속도는 보류한다. |
| 계승자 | A | medium | skillFrequencyStackCycle | 적 피해 13%는 반영. 스킬 피해는 5중첩 후 초기화 주기를 평균화한다. |
| 잠든 땅 | A | low | alwaysWithSurvivalPenalty | 강타/연타는 태그 비중만큼 반영하고, 회복량 감소는 생존 감점으로 별도 처리한다. |
| 비늘 덮인 현자 | F | high | allyHealDependent | 아군 치유 조건이 가능한 직업에서만 공격력 버프를 반영한다. 범용 딜러 기준 낮은 유지율. |
| 용 사냥꾼 | SSS | low | high | 치명/치피는 상시 고밸류로 반영. 퀵슬롯 발동 피해와 60초 적 피해는 사용 빈도 기반으로 반영한다. |
| 유폐된 어둠 | A | medium | periodicNightBlessingDependent | 적 피해 10%와 직접 피해는 반영. 방어구 파괴 받피증은 직업 의존 낮은 가중치로 반영한다. |
| 여신 | S+ | low | alwaysForDamage | 적 피해 29%는 상시 반영. 팔라딘/행동불능 방어는 생존 가치로 별도 처리한다. |
| 무형 | S+ | medium | runeFamilyDependent | 동시에 합산하지 말고 우선순위에 따라 하나만 적용한다. 빌드 계열별로 별도 밸류를 계산한다. |
| 사슬로 묶은 법전 | S+ | medium | classOrFallbackDependent | 도발/힐 조건은 직업별로만 반영하고, 일반 딜러는 기본 적 피해 29%를 반영한다. |
| 가라앉은 왕국 | S | high | ultimateCycleWithRootPenalty | 공격력/궁극기 피해는 반영. 쿨회복은 보류하고 10초 속박은 실전 감점으로 처리한다. |
