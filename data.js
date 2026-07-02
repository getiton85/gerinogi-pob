const DB = {
  "version": "0.0004-formula-v2-skill-damage",
  "classes": [
    {
      "id": "swordsman",
      "name": "검술사",
      "passives": [
        {
          "id": "focus",
          "name": "집중",
          "effects": {
            "critChancePct": 40,
            "critDamagePct": 30
          },
          "note": "치명타 확률 +40%, 치명타 피해 +30%"
        },
        {
          "id": "battle_training_threat",
          "name": "전투 숙련: 위협",
          "effects": {
            "critDamagePct": 5
          },
          "note": "치명타 피해 +5%"
        },
        {
          "id": "combo_sword_plus",
          "name": "연계 검술+",
          "effects": {
            "strongHitDamagePct": 5,
            "multiHitDamagePct": 5,
            "critDamagePct": 5,
            "flyingSwordDamagePct": 25
          },
          "note": "비검/강타/연타/치명 보정"
        },
        {
          "id": "sharp_eye",
          "name": "날카로운 눈",
          "effects": {
            "critDamagePct": 30
          },
          "note": "최대 중첩 기준 치명타 피해 +30%"
        },
        {
          "id": "first_strike",
          "name": "선수필승",
          "effects": {
            "attackPct": 30
          },
          "directDps": 1128,
          "note": "공격력 +30%, 추가 피해 평균 환산"
        },
        {
          "id": "night_blessing",
          "name": "밤의 축복",
          "effects": {
            "attackPct": 15
          },
          "note": "밤의 축복 최대 버프값"
        },
        {
          "id": "black_blade",
          "name": "검은 칼날",
          "effects": {
            "multiHitLinkedDamagePct": 8
          },
          "note": "연타 강화 비례 추가 피해"
        },
        {
          "id": "flying_sword",
          "name": "비검 +28",
          "effects": {
            "skillDamagePct": 120
          },
          "note": "검술사 스킬 피해 +120%"
        },
        {
          "id": "rising_gale",
          "name": "거센 바람",
          "effects": {
            "galePostureDamagePerStackPct": 60
          },
          "note": "질풍태세 중첩당 +60%"
        },
        {
          "id": "deepening_darkness",
          "name": "깊어지는 어둠",
          "effects": {
            "nightTraceFinalDamage": 1
          },
          "note": "밤의 흔적 Lv45=1.7% 기준"
        }
      ]
    }
  ],
  "skills": {
    "swordsman": [
      {"id":"steel_spike","name":"강철 쐐기","form":"기본","tags":["스킬","강타"],"damage":11700,"cooldownSec":4,"rangeM":1.65,"note":"비검/쾌검 연계 기초 스킬","source":"user_screenshot_2026_07_03"},
      {"id":"steel_spike_piercing","name":"강철 쐐기","form":"관통의 각인","tags":["스킬","강타","광역"],"damage":13325,"cooldownSec":4,"rangeM":1.65,"areaM":3,"note":"범위 피해를 주는 쾌검 연계 변화형","source":"user_screenshot_2026_07_03"},
      {"id":"scabbard_strike","name":"칼집 치기","form":"기본","tags":["스킬","강타","브레이크"],"damageParts":[{"label":"1타","damage":4550},{"label":"2타","damage":13650}],"cooldownSec":12,"breakGauge":1,"rangeM":1.65,"source":"user_screenshot_2026_07_03"},
      {"id":"gale_slash","name":"질풍 베기","form":"기본","tags":["스킬","연타"],"damageParts":[{"label":"연타","damage":4680,"hits":5}],"cooldownSec":10,"focusCooldownSec":5,"rangeM":1.65,"source":"user_screenshot_2026_07_03"},
      {"id":"flying_sword_steel","name":"비검: 강철 쐐기","form":"관통의 각인","tags":["스킬","비검","강타","광역"],"damage":33955,"cooldownSec":10,"focusGain":30,"rangeM":4,"areaM":4,"source":"user_screenshot_2026_07_03"},
      {"id":"flying_sword_scabbard","name":"비검: 칼집 치기","form":"칼집 연계","tags":["스킬","비검","강타","브레이크","광역"],"damageParts":[{"label":"1타","damage":12612},{"label":"2타","damage":37836}],"cooldownSec":10,"breakGauge":1,"rangeM":4,"areaM":4,"source":"user_screenshot_2026_07_03"},
      {"id":"flying_sword_gale","name":"비검: 질풍 베기","form":"질풍 연계","tags":["스킬","비검","연타","광역"],"damageParts":[{"label":"연타","damage":6985,"hits":5},{"label":"마무리","damage":34925}],"cooldownSec":10,"rangeM":4,"areaM":4,"source":"user_screenshot_2026_07_03"},
      {"id":"ganpa","name":"간파","form":"일섬의 각인","tags":["스킬","광역"],"damage":69851,"cooldownSec":18,"focusGain":35,"rangeM":12,"areaM":6,"note":"밤의 축복 발동 트리거. 밤의 축복 기본 유지율은 15/60=25%로 계산한다.","source":"user_screenshot_2026_07_03"},
      {"id":"ultimate_flash","name":"일섬","form":"궁극기","tags":["스킬","궁극기","광역"],"damage":194032,"ultimateCost":300,"cooldownSec":75,"rangeM":10,"areaM":15,"note":"사용자 체감 60~90초 주기. 기본값은 75초.","source":"user_screenshot_2026_07_03"}
    ]
  },
  "runes": {
    "emblem": [
      {
        "id": "emblem_gogyeol",
        "name": "고결함",
        "tag": "빛",
        "effects": {
          "skillSpeedPct": 15,
          "cooldownRecoveryPct": 10
        },
        "nightBlessing": {
          "damagePct": 48
        },
        "memo": "속도/쿨회복은 기대딜 점수에서 직접 가산하지 않되, 밤의 축복 피해 증가 48%는 고유지율 조건부 딜축으로 평가한다.",
        "rawOption": {
          "rawName": "엠블럼 룬: 고결함",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "스킬 사용 속도가 15%, 재사용 대기 시간 회복 속도가 10% 증가한다. 밤의 축복 스킬 활성화 시, 15초 동안 적에게 주는 피해가 48% 증가한다.",
          "always": {
            "skillSpeedPct": 15,
            "cooldownRecoveryPct": 10
          },
          "conditional": [
            {
              "type": "nightBlessingBuff",
              "trigger": "밤의 축복 활성화",
              "durationSec": 15,
              "effects": {
                "enemyDamagePct": 48
              }
            }
          ],
          "damageRelevance": "밤의 축복 피해 증가가 핵심이다. 사용자가 밤의 축복을 거의 상시 발동으로 보므로 실전 기대 유지율을 높게 본다.",
          "playFriction": "low",
          "expectedUptimeHint": "veryHigh",
          "valueAdjustmentHint": "속도/쿨회복은 기대딜 점수에서 직접 가산하지 않되, 밤의 축복 피해 증가 48%는 고유지율 조건부 딜축으로 평가한다."
        }
      },
      {
        "id": "emblem_baekgeum",
        "name": "백금 천칭",
        "tag": "빛",
        "effects": {},
        "conditionalAlways": {
          "extraHitChancePct": 21,
          "damagePct": 21
        },
        "memo": "두 효과 1.5배는 매우 강하지만 플레이 패턴 의존도가 있어 보수적 유지율 모델이 필요하다.",
        "rawOption": {
          "rawName": "엠블럼 룬: 백금 천칭",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "스킬 사용 시, 기본 공격의 추가타 확률이 10초 동안 21% 증가한다. 기본 공격 사용 시, 적에게 주는 피해가 10초 동안 21% 증가한다. 두 효과가 모두 활성화될 경우, 증가량이 1.5배가 된다.",
          "always": {},
          "conditional": [
            {
              "type": "skillUseBuff",
              "trigger": "스킬 사용",
              "durationSec": 10,
              "effects": {
                "extraHitChancePct": 21
              }
            },
            {
              "type": "basicAttackBuff",
              "trigger": "기본 공격 사용",
              "durationSec": 10,
              "effects": {
                "enemyDamagePct": 21
              }
            },
            {
              "type": "dualBuffBonus",
              "trigger": "두 효과 동시 활성화",
              "multiplier": 1.5
            }
          ],
          "damageRelevance": "추가타 확률과 적에게 주는 피해가 번갈아 유지되는 구조라 기본 공격을 섞는 플레이에서 기대값이 높다.",
          "playFriction": "medium",
          "expectedUptimeHint": "high",
          "valueAdjustmentHint": "두 효과 1.5배는 매우 강하지만 플레이 패턴 의존도가 있어 보수적 유지율 모델이 필요하다."
        }
      },
      {
        "id": "emblem_chowol",
        "name": "초월",
        "tag": "빛",
        "effects": {
          "damagePct": 15,
          "critDamagePct": 15
        },
        "directDps": 11558,
        "memo": "치명/추가타 확률에 따라 유지율이 달라지는 카운터형 조건부로 계산해야 한다.",
        "rawOption": {
          "rawName": "엠블럼 룬: 초월",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "추가타를 5회 적중시킬 경우, 다음 공격 적중 시 19932의 피해를 주고, 적에게 주는 피해가 10초 동안 15% 증가한다. 치명타를 5회 적중시킬 경우, 다음 공격 적중 시 19932의 피해를 주고, 치명타 피해가 10초 동안 15% 증가한다. 재사용 대기 시간은 각각 4초이다.",
          "always": {},
          "conditional": [
            {
              "type": "extraHitCounter",
              "trigger": "추가타 5회 적중",
              "cooldownSec": 4,
              "nextHitDamage": 19932,
              "durationSec": 10,
              "effects": {
                "enemyDamagePct": 15
              }
            },
            {
              "type": "criticalCounter",
              "trigger": "치명타 5회 적중",
              "cooldownSec": 4,
              "nextHitDamage": 19932,
              "durationSec": 10,
              "effects": {
                "critDamagePct": 15
              }
            }
          ],
          "damageRelevance": "추가타/치명타가 충분히 높은 세팅에서 발동률이 올라가며, 직접 피해와 피해/치피 축을 동시에 제공한다.",
          "playFriction": "medium",
          "expectedUptimeHint": "mediumHigh",
          "valueAdjustmentHint": "치명/추가타 확률에 따라 유지율이 달라지는 카운터형 조건부로 계산해야 한다."
        }
      },
      {
        "id": "emblem_chimmuk",
        "name": "침묵",
        "tag": "어둠",
        "effects": {
          "enemyDamagePct": 33
        },
        "directDps": 14622,
        "memo": "조건 없는 피해 증가를 핵심 밸류로 보고, 밤의 축복 직접 피해는 발동 주기 기반 DPS로 따로 환산한다.",
        "rawOption": {
          "rawName": "엠블럼 룬: 침묵",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "적에게 주는 피해가 33% 증가한다. 밤의 축복 스킬 활성화 시, 자신 주변 12m 범위 내의 모든 적에게 189112의 피해를 준다.",
          "always": {
            "enemyDamagePct": 33
          },
          "conditional": [
            {
              "type": "nightBlessingBurst",
              "trigger": "밤의 축복 활성화",
              "radiusM": 12,
              "directDamage": 189112
            }
          ],
          "damageRelevance": "조건 없는 적 피해 33%가 매우 강하고, 밤의 축복 광역 직접 피해가 추가된다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysPlusNightBlessing",
          "valueAdjustmentHint": "조건 없는 피해 증가를 핵심 밸류로 보고, 밤의 축복 직접 피해는 발동 주기 기반 DPS로 따로 환산한다."
        }
      },
      {
        "id": "emblem_haebang",
        "name": "해방",
        "tag": "어둠",
        "effects": {
          "multiHitDamagePct": 25
        },
        "nightBlessing": {
          "multiHitDamagePct": 40
        },
        "directDps": 5582,
        "rawOption": {
          "rawName": "엠블럼 룬: 해방",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "연타 피해가 25% 증가한다. 밤의 축복 스킬 활성화 시, 15초 동안 연타 피해가 40% 추가로 증가하며, 공격 적중 시 타겟에게 10695의 피해를 준다. 재사용 대기 시간은 1초이다.",
          "always": {
            "multiHitDamagePct": 25
          },
          "conditional": [
            {
              "type": "nightBlessingBuffAndProc",
              "trigger": "밤의 축복 활성화",
              "durationSec": 15,
              "cooldownSec": 1,
              "directDamage": 10695,
              "effects": {
                "multiHitDamagePct": 40
              }
            }
          ],
          "damageRelevance": "연타 중심 세팅에서 강하며, 밤의 축복이 거의 상시라면 연타 추가 피해와 1초 주기 직접 피해가 큰 축이 된다.",
          "playFriction": "low",
          "expectedUptimeHint": "veryHighWhenNightBlessing",
          "valueAdjustmentHint": "연타 태그 비중과 밤의 축복 유지율을 함께 곱해 평가해야 한다."
        },
        "memo": "연타 태그 비중과 밤의 축복 유지율을 함께 곱해 평가해야 한다."
      },
      {
        "id": "emblem_eternal",
        "name": "영원한 밤",
        "tag": "어둠",
        "effects": {
          "attackPct": 7,
          "strongHitDamagePct": 7,
          "multiHitDamagePct": 7,
          "critChancePct": 7,
          "extraHitChancePct": 7
        },
        "memo": "오염 지속시간 감소는 콘텐츠별 손익을 따로 모델링하고, 기본 밸류는 다축 상승으로 평가한다.",
        "rawOption": {
          "rawName": "엠블럼 룬: 영원한 밤",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "공격력이 7%, 강타 피해, 연타 피해, 치명타 확률, 추가타 확률이 7% 증가한다. 오염의 지속 시간이 33% 감소한다.",
          "always": {
            "attackPct": 7,
            "strongHitDamagePct": 7,
            "multiHitDamagePct": 7,
            "critChancePct": 7,
            "extraHitChancePct": 7
          },
          "conditional": [
            {
              "type": "drawback",
              "trigger": "항상 적용",
              "effects": {
                "contaminationDurationReductionPct": 33
              }
            }
          ],
          "damageRelevance": "공격력, 강타, 연타, 치명, 추가타를 동시에 올리는 균형형 곱연산 룬이다.",
          "playFriction": "low",
          "expectedUptimeHint": "always",
          "valueAdjustmentHint": "오염 지속시간 감소는 콘텐츠별 손익을 따로 모델링하고, 기본 밸류는 다축 상승으로 평가한다."
        }
      },
      {
        "id": "emblem_taecho",
        "name": "태초",
        "tag": "용",
        "effects": {
          "skillDamagePct": 20
        },
        "memo": "쿨 초기화는 스킬 계산기/사이클 모델이 생긴 뒤 반영하고, 현재는 스킬 피해 20% 중심으로 평가한다.",
        "rawOption": {
          "rawName": "엠블럼 룬: 태초",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "스킬 피해가 20% 증가한다. 밤의 축복 스킬 활성화 시, 모든 스킬의 재사용 대기 시간이 초기화된다.",
          "always": {
            "skillDamagePct": 20
          },
          "conditional": [
            {
              "type": "nightBlessingCooldownReset",
              "trigger": "밤의 축복 활성화",
              "effects": {
                "resetAllSkillCooldowns": true
              }
            }
          ],
          "damageRelevance": "스킬 피해 20%는 직접 딜축이며, 쿨 초기화는 폭딜 사이클에서 강하지만 현재 기대딜 공식에는 직접 반영하지 않는다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysPlusNightBlessing",
          "valueAdjustmentHint": "쿨 초기화는 스킬 계산기/사이클 모델이 생긴 뒤 반영하고, 현재는 스킬 피해 20% 중심으로 평가한다."
        }
      },
      {
        "id": "emblem_faded_star",
        "name": "빛바랜 별",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 31,
          "unarmoredDamagePct": 31
        },
        "rawOption": {
          "rawName": "엠블럼 룬: 빛바랜 별",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 31% 증가한다. 무방비 피해가 31% 증가한다.",
          "always": {
            "enemyDamagePct": 31,
            "unarmoredDamagePct": 31
          },
          "conditional": [],
          "damageRelevance": "조건 없는 적 피해와 무방비 피해가 동시에 오른다. 사용자는 무방비를 브레이크 추가 데미지/브레이크 익스텐드 추가 데미지에 합산되는 핵심 딜축으로 보며, 치명타 피해/치명타 확률과 거의 같은 급의 밸류로 평가한다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysForStat, dependsOnBreakWindowForUnarmored",
          "valueAdjustmentHint": "무방비 피해는 단순 조건부가 아니라 브레이크 구간의 핵심 곱연산 축으로 별도 높은 가중치를 둬야 한다."
        },
        "memo": "무방비 피해는 단순 조건부가 아니라 브레이크 구간의 핵심 곱연산 축으로 별도 높은 가중치를 둬야 한다."
      },
      {
        "id": "emblem_greatness",
        "name": "위대함",
        "tag": "용",
        "effects": {
          "strongHitDamagePct": 25
        },
        "nightBlessing": {
          "strongHitDamagePct": 40
        },
        "directDps": 4313,
        "rawOption": {
          "rawName": "엠블럼 룬: 위대함",
          "slot": "emblem",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "강타 피해가 25% 증가한다. 밤의 축복 스킬 활성화 시, 15초 동안 강타 피해가 40% 추가로 증가하며, 공격 적중 시 타겟 주변 3m 범위 내의 적들에게 8264의 피해를 준다. 재사용 대기 시간은 1초이다.",
          "always": {
            "strongHitDamagePct": 25
          },
          "conditional": [
            {
              "type": "nightBlessingBuffAndProc",
              "trigger": "밤의 축복 활성화",
              "durationSec": 15,
              "cooldownSec": 1,
              "radiusM": 3,
              "directDamage": 8264,
              "effects": {
                "strongHitDamagePct": 40
              }
            }
          ],
          "damageRelevance": "강타 중심 세팅에서 강하며, 밤의 축복이 거의 상시라면 강타 추가 피해와 1초 주기 직접 피해까지 기대할 수 있다.",
          "playFriction": "low",
          "expectedUptimeHint": "veryHighWhenNightBlessing",
          "valueAdjustmentHint": "강타 태그 비중과 밤의 축복 유지율을 함께 곱해 평가해야 한다."
        },
        "memo": "강타 태그 비중과 밤의 축복 유지율을 함께 곱해 평가해야 한다."
      }
    ],
    "weapon": [
      {
        "id": "weapon_janyeong",
        "name": "눈부신 잔영",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038
        },
        "directDamage": {
          "damage": 82885,
          "intervalFormula": "skill_plus_basic"
        },
        "memo": "추가 피해는 스킬+평타 주기 기반으로 반영하고, 공격속도 10%는 비딜/유틸 축으로 분리한다.",
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "고정 공격력과 스킬 후 기본 공격 직접 피해가 있어 실전 추가타형 기여가 있다. 다만 공격력/치명/추가타 복합 축은 부족해 최상위는 아니다.",
        "rawOption": {
          "rawName": "무기 룬: 눈부신 잔영",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "스킬 사용 시, 다음 기본 공격 적중 시 타겟 주변 3m 범위 내의 적들에게 71464의 피해를 추가로 입히고, 다음 1회의 공격 속도가 10% 증가한다.",
          "always": {
            "flatAttack": 1038
          },
          "conditional": {
            "type": "afterSkillNextBasicAttack",
            "trigger": "스킬 사용 후 다음 기본 공격 적중",
            "radiusM": 3,
            "hits": 1,
            "extraDamage": 71464,
            "nextAttackSpeedPct": 10,
            "maxStacks": 1,
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "directDamage": true,
            "tagLimited": false,
            "utilityOnly": false,
            "speedOnlyPart": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 0.75,
          "valueAdjustmentHint": "추가 피해는 스킬+평타 주기 기반으로 반영하고, 공격속도 10%는 비딜/유틸 축으로 분리한다."
        }
      },
      {
        "id": "weapon_haetsal",
        "name": "햇살+",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 16,
          "cooldownRecoveryPct": 15
        },
        "communityTier": "C",
        "communityTierScore": 48,
        "communityTierReason": "공격력 16%는 유효하지만 쿨타임 회복은 밸류 제외 축이라 실제 딜 기여가 제한된다.",
        "rawOption": {
          "rawName": "무기 룬: 햇살+",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 16% 증가하고, 재사용 대기 시간 회복 속도가 15% 증가한다. 전설 희귀도 효과 부여: 모든 스킬 1강화, 임의 3개 스킬 2강화.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 16,
            "cooldownRecoveryPct": 15
          },
          "conditional": {
            "type": "always",
            "uptimeRisk": "low"
          },
          "skillEnhancement": {
            "allSkills": 1,
            "randomSkills": {
              "count": 3,
              "level": 2
            }
          },
          "damageRelevance": {
            "directDamage": false,
            "utilityOnlyPart": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "공격력은 반영, 쿨타임 회복은 밸류 제외. 스킬 강화는 스킬 DB 이후 별도 반영."
        },
        "memo": "공격력은 반영, 쿨타임 회복은 밸류 제외. 스킬 강화는 스킬 DB 이후 별도 반영."
      },
      {
        "id": "weapon_geshi",
        "name": "계시+",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 24,
          "castingSpeedPct": 25,
          "chargeSpeedPct": 25
        },
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "공격력 24%가 강한 핵심 축이다. 시전/차지 속도는 제외되므로 공격력 단일 고효율 룬으로 본다.",
        "rawOption": {
          "rawName": "무기 룬: 계시+",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 24% 증가하고, 캐스팅 및 차지 속도가 25% 증가한다. 전설 희귀도 효과 부여: 모든 스킬 1강화, 임의 3개 스킬 2강화.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 24,
            "castingSpeedPct": 25,
            "chargeSpeedPct": 25
          },
          "conditional": {
            "type": "always",
            "uptimeRisk": "low"
          },
          "skillEnhancement": {
            "allSkills": 1,
            "randomSkills": {
              "count": 3,
              "level": 2
            }
          },
          "damageRelevance": {
            "directDamage": false,
            "utilityOnlyPart": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "공격력만 기대딜에 직접 반영하고 캐스팅/차지 속도는 제외한다."
        },
        "memo": "공격력만 기대딜에 직접 반영하고 캐스팅/차지 속도는 제외한다."
      },
      {
        "id": "weapon_gwangchae",
        "name": "광채+",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038,
          "enemyDamagePct": 20
        },
        "conditionalAlways": {
          "critDamagePct": 15
        },
        "memo": "치명타 피해 15%는 상시가 아니라 상태이상 유지율을 곱해 반영해야 한다.",
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해 20%와 조건부 치명 피해 15%가 함께 있어 방어구 고평가 기준의 복합 딜 축과 맞다.",
        "rawOption": {
          "rawName": "무기 룬: 광채+",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 20% 증가한다. 지속 피해: 화상, 빙결, 감전, 심판을 보유한 적 공격 시, 15초 동안 치명타 피해가 15% 증가한다.",
          "always": {
            "flatAttack": 1038,
            "enemyDamagePct": 20
          },
          "conditional": {
            "type": "targetHasStatus",
            "statuses": [
              "화상",
              "빙결",
              "감전",
              "심판"
            ],
            "durationSec": 15,
            "effects": {
              "critDamagePct": 15
            },
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "directDamage": false,
            "statusDependent": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 0.65,
          "valueAdjustmentHint": "치명타 피해 15%는 상시가 아니라 상태이상 유지율을 곱해 반영해야 한다."
        }
      },
      {
        "id": "weapon_glory",
        "name": "타오르는 영광",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 23.5
        },
        "memo": "불씨 공격력은 궁극기 주기와 소모 중첩 기반으로 별도 평균화해야 하며 상시 공격력으로 보면 과대평가된다.",
        "communityTier": "A+",
        "communityTierScore": 78,
        "communityTierReason": "공격력 23.5%가 높고 범용성이 좋다. 다만 궁극기 불씨 평균화가 아직 없어 추가 고평가는 보류한다.",
        "rawOption": {
          "rawName": "무기 룬: 타오르는 영광",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 23.5% 증가한다. 전투 시, 5초마다 불씨를 얻는다. 이 효과는 최대 12회까지 중첩된다. 궁극기 사용 시, 모든 불씨를 소모하여 15초 동안 공격력이 소모한 중첩 당 3.5% 증가한다.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 23.5
          },
          "conditional": {
            "type": "stackSpendOnUltimate",
            "stackName": "불씨",
            "gainIntervalSec": 5,
            "maxStacks": 12,
            "consumeOn": "ultimate",
            "durationSec": 15,
            "effectsPerStack": {
              "attackPct": 3.5
            },
            "uptimeRisk": "high"
          },
          "damageRelevance": {
            "ultimateCycleDependent": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 0.35,
          "valueAdjustmentHint": "불씨 공격력은 궁극기 주기와 소모 중첩 기반으로 별도 평균화해야 하며 상시 공격력으로 보면 과대평가된다."
        }
      },
      {
        "id": "weapon_curse_a",
        "name": "오랜 광기",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "enemyDamagePct": 20,
          "attackSpeedPct": 10,
          "castingSpeedPct": 10,
          "chargeSpeedPct": 10,
          "skillSpeedPct": 10
        },
        "periodicDps": 20000,
        "memo": "적 피해 20%만 딜 밸류에 반영하고 속도류는 제외. 자해 패널티는 생존/피로도 감점 후보.",
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "적 피해 20%와 주기 피해 20000이 있어 실전 기대딜 축이 강하다. 속도 옵션은 제외되지만 직접/주기 피해가 남는다.",
        "rawOption": {
          "rawName": "무기 룬: 오랜 광기",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "적에게 주는 피해가 20% 증가하며 공격 속도, 캐스팅 및 차지 속도, 스킬 사용 속도가 10% 증가한다. 전투 중, 5초마다 최대 체력의 10% 만큼 피해를 입는다.",
          "always": {
            "flatAttack": 1038,
            "enemyDamagePct": 20,
            "attackSpeedPct": 10,
            "castingSpeedPct": 10,
            "chargeSpeedPct": 10,
            "skillSpeedPct": 10
          },
          "conditional": {
            "type": "selfDamagePeriodic",
            "intervalSec": 5,
            "selfMaxHpDamagePct": 10,
            "uptimeRisk": "low"
          },
          "damageRelevance": {
            "utilityOnlyPart": true,
            "drawback": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "적 피해 20%만 딜 밸류에 반영하고 속도류는 제외. 자해 패널티는 생존/피로도 감점 후보."
        }
      },
      {
        "id": "weapon_curse_b",
        "name": "억눌린 충동",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 30,
          "critDamagePct": 5,
          "moveSpeedPct": -15
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 30%와 치명 피해 5%의 강한 복합 축이다. 이동속도 감소는 딜 밸류와 무관하다.",
        "rawOption": {
          "rawName": "무기 룬: 억눌린 충동",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "공격력이 30% 증가하며, 치명타 피해가 5% 증가한다. 이동 속도가 15% 감소한다.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 30,
            "critDamagePct": 5,
            "moveSpeedPct": -15
          },
          "conditional": {
            "type": "always",
            "uptimeRisk": "low"
          },
          "damageRelevance": {
            "directDamage": false,
            "movementPenalty": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "공격력/치명피해는 상시 반영. 이동속도 감소는 딜 밸류보다는 플레이 피로도/패턴 대응 감점."
        },
        "memo": "공격력/치명피해는 상시 반영. 이동속도 감소는 딜 밸류보다는 플레이 피로도/패턴 대응 감점."
      },
      {
        "id": "weapon_dot_poison",
        "name": "암운+",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "strongHitDamagePct": 15
        },
        "directDps": 4849,
        "communityTier": "B",
        "communityTierScore": 62,
        "communityTierReason": "강타 피해 15%와 직접 DPS가 있으나 총량이 낮아 특정 강타 세팅용 중위권으로 본다.",
        "rawOption": {
          "rawName": "무기 룬: 암운+",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "강타 피해가 15% 증가한다. 지속 피해: 중독, 상처, 두려움, 절망이 부여된 적 공격 시, 타겟 주변 3m 내의 적들에게 20904의 피해를 주고 15초 동안 스킬 피해가 10% 증가한다. 재사용 대기 시간 5초.",
          "always": {
            "flatAttack": 1038,
            "strongHitDamagePct": 15
          },
          "conditional": {
            "type": "targetHasStatusDamageProc",
            "statuses": [
              "중독",
              "상처",
              "두려움",
              "절망"
            ],
            "radiusM": 3,
            "damage": 20904,
            "cooldownSec": 5,
            "durationSec": 15,
            "effects": {
              "skillDamagePct": 10
            },
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "directDamage": true,
            "statusDependent": true,
            "tagLimited": true,
            "affectedTags": [
              "strongHit"
            ]
          },
          "playFriction": "medium",
          "expectedUptimeHint": 0.65,
          "valueAdjustmentHint": "강타 피해는 강타 비중만큼, 조건부 스킬 피해는 상태이상 유지율과 쿨타임 기반으로 반영."
        },
        "memo": "강타 피해는 강타 비중만큼, 조건부 스킬 피해는 상태이상 유지율과 쿨타임 기반으로 반영."
      },
      {
        "id": "weapon_bupae",
        "name": "부패+",
        "tag": "어둠",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 15
        },
        "directDps": 18137,
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "공격력 15%와 직접 DPS 18137이 함께 있어 단순 수치 이상의 실전 기여가 있다.",
        "rawOption": {
          "rawName": "무기 룬: 부패+",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "공격력이 15% 증가한다. 전투 중 6초마다 1개씩, 최대 2개까지 충전되는 맹독의 정수를 얻는다. 공격 적중 시 맹독의 정수를 1개 소모하여 타겟 주변 4m 범위 내의 적들에게 37433의 피해와 56393의 지속 피해: 중독을 준다. 재사용 대기 시간 0.5초.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 15
          },
          "conditional": {
            "type": "chargeSpendOnHit",
            "chargeName": "맹독의 정수",
            "chargeIntervalSec": 6,
            "maxCharges": 2,
            "trigger": "attackHit",
            "cooldownSec": 0.5,
            "radiusM": 4,
            "damage": 37433,
            "dotDamage": 56393,
            "dotType": "중독",
            "uptimeRisk": "low"
          },
          "damageRelevance": {
            "directDamage": true,
            "dotDamage": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 0.85,
          "valueAdjustmentHint": "공격력은 상시, 직접/중독 피해는 충전 주기 기반 평균 DPS로 반영."
        },
        "memo": "공격력은 상시, 직접/중독 피해는 충전 주기 기반 평균 DPS로 반영."
      },
      {
        "id": "weapon_changbaek",
        "name": "창백한 기수",
        "tag": "어둠",
        "effects": {
          "flatAttack": 1038,
          "ultimateDamagePct": 20,
          "ultimateGaugeGainPct": -20,
          "attackPct": 17,
          "enemyDamagePct": 17
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력, 적 피해, 궁극기 피해가 함께 있는 고품질 복합 딜 구조다. 궁극기 게이지 감소는 세팅별 주의 요소다.",
        "rawOption": {
          "rawName": "무기 룬: 창백한 기수",
          "slot": "weapon",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "궁극기 스킬로 주는 피해가 20% 증가하고, 궁극기 게이지 회복량이 20% 감소한다. 공격력이 17%, 적에게 주는 피해가 17% 증가한다.",
          "always": {
            "flatAttack": 1038,
            "ultimateDamagePct": 20,
            "ultimateGaugeGainPct": -20,
            "attackPct": 17,
            "enemyDamagePct": 17
          },
          "conditional": {
            "type": "always",
            "uptimeRisk": "low"
          },
          "damageRelevance": {
            "ultimateDependent": true,
            "gaugePenalty": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "공격력/적 피해는 상시. 궁극기 피해와 게이지 감소는 궁극기 비중과 주기 계산이 들어온 뒤 보정."
        },
        "memo": "공격력/적 피해는 상시. 궁극기 피해와 게이지 감소는 궁극기 비중과 주기 계산이 들어온 뒤 보정."
      },
      {
        "id": "weapon_great_rage",
        "name": "거대한 분노",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "enemyDamagePct": 21,
          "skillDamagePct": 12
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해 21%와 스킬 피해 12%가 함께 있어 범용 스킬 기대딜이 안정적으로 오른다.",
        "rawOption": {
          "rawName": "무기 룬: 거대한 분노",
          "slot": "weapon",
          "rarity": "dragon",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 21% 증가한다. 강타 적중 시, 스킬 피해가 3% 증가하며 해당 효과는 최대 4회까지 중첩된다. 강타가 아닌 공격 적중 시, 효과가 즉시 해제된다.",
          "always": {
            "flatAttack": 1038,
            "enemyDamagePct": 21
          },
          "conditional": {
            "type": "strongHitStackResetOnNonStrong",
            "trigger": "strongHit",
            "effectsPerStack": {
              "skillDamagePct": 3
            },
            "maxStacks": 4,
            "resetOn": "nonStrongAttackHit",
            "uptimeRisk": "high"
          },
          "damageRelevance": {
            "tagLimited": true,
            "affectedTags": [
              "strongHit"
            ],
            "rotationDependent": true
          },
          "playFriction": "high",
          "expectedUptimeHint": 0.35,
          "valueAdjustmentHint": "강타 연속 운용이 아니면 스킬 피해 중첩은 낮은 유지율로 반영해야 한다."
        },
        "memo": "강타 연속 운용이 아니면 스킬 피해 중첩은 낮은 유지율로 반영해야 한다."
      },
      {
        "id": "weapon_rock_blade",
        "name": "바위 칼날",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 21,
          "critChancePct": 15
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 21%와 치명 확률 15%가 함께 있어 치명 기대값 축이 강하게 오른다.",
        "rawOption": {
          "rawName": "무기 룬: 바위 칼날",
          "slot": "weapon",
          "rarity": "dragon",
          "element": "dragon",
          "rawDescription": "공격이 적중할 때마다 10초 동안 공격력이 0.7%, 치명타 확률이 0.5% 증가한다. 해당 효과는 최대 30회까지 중첩되며 지속 시간은 스택마다 개별로 가진다.",
          "always": {
            "flatAttack": 1038
          },
          "conditional": {
            "type": "stackOnHit",
            "trigger": "attackHit",
            "durationSec": 10,
            "maxStacks": 30,
            "effectsPerStack": {
              "attackPct": 0.7,
              "critChancePct": 0.5
            },
            "independentStackDuration": true,
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "hitFrequencyDependent": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 0.7,
          "valueAdjustmentHint": "30중첩 상시가 아니라 타수/공격 빈도 기반 평균 스택으로 반영해야 한다."
        },
        "memo": "30중첩 상시가 아니라 타수/공격 빈도 기반 평균 스택으로 반영해야 한다."
      },
      {
        "id": "weapon_two_horn",
        "name": "두 갈래 뿔",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 16,
          "skillSpeedPct": 15,
          "attackSpeedPct": 15
        },
        "communityTier": "B",
        "communityTierScore": 62,
        "communityTierReason": "공격력 16%는 유효하지만 공격속도와 스킬속도는 제외되어 남는 딜 축이 적다.",
        "rawOption": {
          "rawName": "무기 룬: 두 갈래 뿔",
          "slot": "weapon",
          "rarity": "dragon",
          "element": "dragon",
          "rawDescription": "공격력이 16% 증가한다. 기본 공격 사용 시, 스킬 사용 속도가 5초 동안 15% 증가한다. 스킬 사용 시, 공격 속도가 5초 동안 15% 증가한다.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 16
          },
          "conditional": {
            "type": "alternatingBasicSkillSpeedBuff",
            "basicAttackBuff": {
              "skillSpeedPct": 15,
              "durationSec": 5
            },
            "skillUseBuff": {
              "attackSpeedPct": 15,
              "durationSec": 5
            },
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "utilityOnlyPart": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 0.8,
          "valueAdjustmentHint": "공격력만 기대딜 반영. 속도 버프는 현재 밸류 제외."
        },
        "memo": "공격력만 기대딜 반영. 속도 버프는 현재 밸류 제외."
      },
      {
        "id": "weapon_tracker",
        "name": "추적자",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "strongHitDamagePct": 35
        },
        "directDps": 3299,
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "강타 피해 35%와 직접 DPS가 있어 강타 중심 세팅에서는 좋지만 범용 복합 축은 부족하다.",
        "rawOption": {
          "rawName": "무기 룬: 추적자",
          "slot": "weapon",
          "rarity": "dragon",
          "element": "dragon",
          "rawDescription": "강타 피해가 35% 증가한다. 스킬 8회 사용 시 주변 10m 범위 내의 적들에게 56879의 피해를 주고, 강타 피해가 6초 동안 20% 감소한다.",
          "always": {
            "flatAttack": 1038,
            "strongHitDamagePct": 35
          },
          "conditional": {
            "type": "skillCountProcWithDebuff",
            "trigger": "skillUse",
            "skillUseCount": 8,
            "radiusM": 10,
            "damage": 56879,
            "debuff": {
              "strongHitDamagePct": -20,
              "durationSec": 6
            },
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "directDamage": true,
            "tagLimited": true,
            "affectedTags": [
              "strongHit"
            ],
            "drawback": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 0.65,
          "valueAdjustmentHint": "강타 피해는 강타 비중만큼 반영하고, 8스킬마다 발생하는 피해/강타 감소 디버프를 평균화해야 한다."
        },
        "memo": "강타 피해는 강타 비중만큼 반영하고, 8스킬마다 발생하는 피해/강타 감소 디버프를 평균화해야 한다."
      },
      {
        "id": "weapon_lord",
        "name": "대군주+",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "ultimateDamagePct": 20,
          "ultimateGaugeGainPct": 20,
          "attackPct": 16
        },
        "communityTier": "A+",
        "communityTierScore": 78,
        "communityTierReason": "공격력 16%와 궁극기 피해, 궁극기 게이지 증가가 있어 궁극기 세팅에서 가치가 있다.",
        "rawOption": {
          "rawName": "무기 룬: 대군주+",
          "slot": "weapon",
          "rarity": "dragon",
          "element": "dragon",
          "rawDescription": "궁극기 스킬로 주는 피해가 20% 증가한다. 궁극기 게이지 회복량이 20% 증가한다. 공격력이 16% 증가한다.",
          "always": {
            "flatAttack": 1038,
            "ultimateDamagePct": 20,
            "ultimateGaugeGainPct": 20,
            "attackPct": 16
          },
          "conditional": {
            "type": "always",
            "uptimeRisk": "low"
          },
          "damageRelevance": {
            "ultimateDependent": true,
            "gaugePositive": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "공격력은 상시. 궁극기 피해/게이지 증가는 궁극기 비중 계산 이후 정확도 상승."
        },
        "memo": "공격력은 상시. 궁극기 피해/게이지 증가는 궁극기 비중 계산 이후 정확도 상승."
      },
      {
        "id": "weapon_fire_script",
        "name": "불꽃으로 새긴 문장",
        "tag": "신화",
        "effects": {
          "flatAttack": 1038,
          "enemyDamagePct": 20,
          "cooldownRecoveryPct": 15
        },
        "directDps": 3007,
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "적 피해 20%와 직접 DPS가 있다. 쿨타임 회복은 제외되지만 기본 딜 축은 안정적이다.",
        "rawOption": {
          "rawName": "무기 룬: 불꽃으로 새긴 문장",
          "slot": "weapon",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "전투 시작 시, 3분 동안 불의 인장을 활성화해 적에게 주는 피해가 20%, 재사용 대기 시간 회복 속도가 15% 증가한다. 밤의 흔적이 45레벨 이상일 경우 불의 인장이 사라지는 대신 강화되어 공격 적중 시 전방의 적들에게 7778의 피해를 주는 불길을 내뿜는다. 재사용 대기 시간 3초.",
          "always": {
            "flatAttack": 1038
          },
          "conditional": {
            "type": "combatStartBuffAndNightTraceUpgrade",
            "durationSec": 180,
            "effects": {
              "enemyDamagePct": 20,
              "cooldownRecoveryPct": 15
            },
            "upgradedCondition": {
              "nightTraceLevelAtLeast": 45,
              "replacesExpiry": true,
              "frontalDamage": 7778,
              "cooldownSec": 3
            },
            "uptimeRisk": "low"
          },
          "damageRelevance": {
            "directDamage": true,
            "utilityOnlyPart": true
          },
          "playFriction": "low",
          "expectedUptimeHint": 0.95,
          "valueAdjustmentHint": "적 피해는 3분/밤의 흔적 조건으로 반영. 쿨타임 회복은 제외. 불길 피해는 쿨타임 기반 직접 DPS."
        },
        "memo": "적 피해는 3분/밤의 흔적 조건으로 반영. 쿨타임 회복은 제외. 불길 피해는 쿨타임 기반 직접 DPS."
      },
      {
        "id": "weapon_death",
        "name": "죽음",
        "tag": "신화",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 20,
          "critDamagePct": 20
        },
        "memo": "상시 공격력/치피는 반영. 행동불능 패널티는 생존 리스크 감점으로 별도 표기.",
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 20%와 치명 피해 20% 조합으로 방어구 고평가 기준의 핵심 복합 축에 정확히 맞는다.",
        "rawOption": {
          "rawName": "무기 룬: 죽음",
          "slot": "weapon",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "공격력이 20%, 치명타 피해가 20% 증가한다. 행동 불능을 방지하는 룬의 효과를 받을 수 없게 된다. 행동 불능 상태가 될 경우, 30초 동안 공격력이 10% 감소한다.",
          "always": {
            "flatAttack": 1038,
            "attackPct": 20,
            "critDamagePct": 20
          },
          "conditional": {
            "type": "deathPenalty",
            "preventsIncapacitationSave": true,
            "onIncapacitated": {
              "attackPct": -10,
              "durationSec": 30
            },
            "uptimeRisk": "medium"
          },
          "damageRelevance": {
            "deathRiskPenalty": true
          },
          "playFriction": "medium",
          "expectedUptimeHint": 1,
          "valueAdjustmentHint": "상시 공격력/치피는 반영. 행동불능 패널티는 생존 리스크 감점으로 별도 표기."
        }
      }
    ],
    "armor": [
      {
        "id": "armor_basic",
        "name": "기본기+",
        "tag": "없음",
        "effects": {
          "enemyDamagePct": 20
        },
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "단일 적 피해 20%만 있어 같은 슬롯의 복합 딜 옵션보다 확장성이 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 기본기+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "none",
          "rawDescription": "적에게 주는 피해가 20% 증가한다.",
          "always": {
            "enemyDamagePct": 20
          },
          "conditional": [],
          "damageRelevance": "조건 없는 적 피해 20%라 안정적이지만 단일 축이다.",
          "playFriction": "low",
          "expectedUptimeHint": "always",
          "valueAdjustmentHint": "상시 적 피해 20%만 반영한다. 단일 축이라 복합 룬보다 낮게 평가한다."
        },
        "memo": "상시 적 피해 20%만 반영한다. 단일 축이라 복합 룬보다 낮게 평가한다."
      },
      {
        "id": "armor_first_oath",
        "name": "첫 번째 서약",
        "tag": "빛",
        "effects": {
          "attackPct": 15
        },
        "nightBlessing": {
          "strongHitDamagePct": 11,
          "critChancePct": 11,
          "attackPct": 11
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력과 밤의 축복 조건에서 강타, 치명 확률, 공격력을 동시에 올려 곱연산 축이 좋다.",
        "rawOption": {
          "rawName": "방어구 룬: 첫 번째 서약",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 15% 증가한다. 밤의 축복 스킬 활성화 시, 강타 피해와 치명타 확률, 공격력이 11% 증가한다.",
          "always": {
            "attackPct": 15
          },
          "conditional": [
            {
              "type": "nightBlessingBuff",
              "trigger": "밤의 축복 활성화",
              "effects": {
                "strongHitDamagePct": 11,
                "critChancePct": 11,
                "attackPct": 11
              }
            }
          ],
          "damageRelevance": "공격력, 강타 피해, 치명타 확률이 함께 올라 곱연산 축이 고르게 열린다. 밤의 축복은 사용자 기준 거의 상시로 본다.",
          "playFriction": "low",
          "expectedUptimeHint": "veryHighWhenNightBlessing",
          "valueAdjustmentHint": "상시 공격력 15%와 밤의 축복 고유지율 복합 딜축으로 평가한다."
        },
        "memo": "상시 공격력 15%와 밤의 축복 고유지율 복합 딜축으로 평가한다."
      },
      {
        "id": "armor_rusted_shield",
        "name": "녹슨 방패",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 22
        },
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "적 피해 22% 단일 축이지만 범용성이 높아 중상위권이다.",
        "rawOption": {
          "rawName": "방어구 룬: 녹슨 방패",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 22% 증가한다. 행동 불능에 이르는 공격을 1회 막아주고 체력을 대량 회복한다. 이후 3초 동안 받는 피해가 80% 감소한다. 동일한 행동 불능에 저항하는 효과와 재사용 대기 시간을 공유한다. 재사용 대기 시간은 180초이다.",
          "always": {
            "enemyDamagePct": 22
          },
          "conditional": [
            {
              "type": "incapacitationProtection",
              "cooldownSec": 180,
              "effects": {
                "largeHeal": true,
                "damageTakenReductionPct": 80,
                "durationSec": 3
              },
              "sharedCooldownWithSimilarEffects": true
            }
          ],
          "damageRelevance": "딜은 조건 없는 적 피해 22%가 전부이고, 생존 효과는 직접 기대딜에 넣지 않는다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysForDamage",
          "valueAdjustmentHint": "적 피해 22%만 기대딜 반영. 행동불능 방어는 생존 가치로 별도 표시한다."
        },
        "memo": "적 피해 22%만 기대딜 반영. 행동불능 방어는 생존 가치로 별도 표시한다."
      },
      {
        "id": "armor_pride",
        "name": "긍지",
        "tag": "빛",
        "effects": {
          "attackPct": 25,
          "recoveryPct": 10,
          "targetIncomingDamageIncreasePct": 10
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 25%와 받는 피해 증가 10%가 함께 있어 실전 기대딜 축이 강하다. 회복은 밸류 제외 대상이다.",
        "rawOption": {
          "rawName": "방어구 룬: 긍지",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "전투 숙련: 지원 보유 시 공격력이 25%, 회복량이 10% 증가한다. 공격 시, 약화 효과: 방어구 파괴를 부여해 10초 동안 받는 피해를 10% 증가시킨다. 방어구 파괴는 중복 적용되지 않는다. 재사용 대기 시간은 1초이다.",
          "always": {},
          "conditional": [
            {
              "type": "passiveOwnedBuff",
              "trigger": "전투 숙련: 지원 보유",
              "effects": {
                "attackPct": 25,
                "recoveryPct": 10
              }
            },
            {
              "type": "onAttackDebuff",
              "trigger": "공격",
              "cooldownSec": 1,
              "durationSec": 10,
              "stackable": false,
              "effects": {
                "armorBreak": true,
                "targetIncomingDamageIncreasePct": 10
              }
            }
          ],
          "damageRelevance": "공격력 25%는 강하지만 방어구 파괴 기재는 일부 직업, 특히 탱커 쪽 활용도가 높아 범용 딜러 밸류는 낮게 본다. 회복량은 기대딜 제외 대상이다.",
          "playFriction": "medium",
          "expectedUptimeHint": "passiveAndClassDependent",
          "valueAdjustmentHint": "공격력 25%는 반영하되 방어구 파괴 기반 받피증은 직업 의존 저밸류 조건으로 낮은 가중치를 둬야 한다."
        },
        "memo": "공격력 25%는 반영하되 방어구 파괴 기반 받피증은 직업 의존 저밸류 조건으로 낮은 가중치를 둬야 한다."
      },
      {
        "id": "armor_crescent",
        "name": "그믐달",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 15,
          "attackPct": 10
        },
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "공격력과 적 피해가 함께 있으나 총량이 낮아 상위 복합 룬 대비 밀린다.",
        "rawOption": {
          "rawName": "방어구 룬: 그믐달",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 15% 증가한다. 보유한 자원이 50% 미만일 경우, 공격력이 10% 증가한다.",
          "always": {
            "enemyDamagePct": 15
          },
          "conditional": [
            {
              "type": "resourceThresholdBuff",
              "thresholdPct": 50,
              "effects": {
                "attackPct": 10
              }
            }
          ],
          "damageRelevance": "상시 적 피해는 낮고, 공격력은 자원 50% 미만 조건이라 유지율 의존이 있다.",
          "playFriction": "medium",
          "expectedUptimeHint": "resourceDependent",
          "valueAdjustmentHint": "적 피해 15%는 반영. 자원 50% 미만 공격력은 직업/사이클별 유지율을 곱해야 한다."
        },
        "memo": "적 피해 15%는 반영. 자원 50% 미만 공격력은 직업/사이클별 유지율을 곱해야 한다."
      },
      {
        "id": "armor_dignity",
        "name": "위엄",
        "tag": "빛",
        "effects": {
          "attackPct": 16,
          "unarmoredDamagePct": 32
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 16%와 무방비 피해 32%의 복합 축으로 조건 충족 시 상승폭이 크다.",
        "rawOption": {
          "rawName": "방어구 룬: 위엄",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "전투 숙련: 수호 보유 시 공격력이 16%, 무방비 피해가 32% 증가하며 적에게 받는 피해가 5% 감소한다.",
          "always": {},
          "conditional": [
            {
              "type": "passiveOwnedBuff",
              "trigger": "전투 숙련: 수호 보유",
              "effects": {
                "attackPct": 16,
                "unarmoredDamagePct": 32,
                "damageTakenReductionPct": 5
              }
            }
          ],
          "damageRelevance": "공격력과 무방비 피해가 동시에 오르는 고밸류 룬이다. 사용자 기준 무방비는 치명/치피급 핵심 딜축이다.",
          "playFriction": "low",
          "expectedUptimeHint": "highIfPassiveOwned",
          "valueAdjustmentHint": "전투 숙련 조건 충족 시 공격력 16%와 무방비 피해 32%를 핵심 딜축으로 평가한다."
        },
        "memo": "전투 숙련 조건 충족 시 공격력 16%와 무방비 피해 32%를 핵심 딜축으로 평가한다."
      },
      {
        "id": "armor_offense",
        "name": "공세+",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 27.5
        },
        "communityTier": "C",
        "communityTierScore": 48,
        "communityTierReason": "적 피해 27.5%는 나쁘지 않지만 단일 합연산 축이라 고평가되기 어렵다.",
        "rawOption": {
          "rawName": "방어구 룬: 공세+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "스킬 사용 시, 6초 동안 적에게 주는 피해가 5.5% 증가한다. 해당 효과는 최대 5회까지 중첩되며 지속 시간은 스택마다 개별로 가진다.",
          "always": {},
          "conditional": [
            {
              "type": "stackOnSkillUse",
              "durationSec": 6,
              "maxStacks": 5,
              "independentStackDuration": true,
              "effectsPerStack": {
                "enemyDamagePct": 5.5
              }
            }
          ],
          "damageRelevance": "스킬 사용 빈도에 따라 최대 27.5% 적 피해가 되지만 평균 스택 산정이 필요하다.",
          "playFriction": "medium",
          "expectedUptimeHint": "skillFrequencyDependent",
          "valueAdjustmentHint": "최대 중첩 상시가 아니라 스킬 사용 빈도 기반 평균 스택으로 반영해야 한다."
        },
        "memo": "최대 중첩 상시가 아니라 스킬 사용 빈도 기반 평균 스택으로 반영해야 한다."
      },
      {
        "id": "armor_conqueror",
        "name": "정복자+",
        "tag": "빛",
        "effects": {
          "attackPct": 5,
          "enemyDamagePct": 9
        },
        "killBonus": {
          "enemyDamagePct": 12
        },
        "communityTier": "B",
        "communityTierScore": 62,
        "communityTierReason": "처치 조건까지 포함하면 적 피해가 늘지만 보스/레이드 안정성이 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 정복자+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 5%, 적에게 주는 피해가 9% 증가한다. 주위에서 적이 5/10/20명 처치될 경우, 적에게 주는 피해가 3%/6%/12% 증가한다.",
          "always": {
            "attackPct": 5,
            "enemyDamagePct": 9
          },
          "conditional": [
            {
              "type": "nearbyKillCountBuff",
              "killThresholds": [
                5,
                10,
                20
              ],
              "effectsByThreshold": [
                {
                  "enemyDamagePct": 3
                },
                {
                  "enemyDamagePct": 6
                },
                {
                  "enemyDamagePct": 12
                }
              ]
            }
          ],
          "damageRelevance": "상시 공격력/적 피해는 낮고, 처치 조건은 잡몹 콘텐츠에서만 안정적이다.",
          "playFriction": "high",
          "expectedUptimeHint": "contentDependent",
          "valueAdjustmentHint": "보스 단일전에서는 처치 조건을 낮게 보고, 잡몹 콘텐츠에서만 추가 적 피해를 반영한다."
        },
        "memo": "보스 단일전에서는 처치 조건을 낮게 보고, 잡몹 콘텐츠에서만 추가 적 피해를 반영한다."
      },
      {
        "id": "armor_silver_chant",
        "name": "은빛 찬가",
        "tag": "빛",
        "effects": {
          "attackPct": 5,
          "cooldownRecoveryPct": 6
        },
        "killBonus": {
          "cooldownRecoveryPct": 12
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "쿨타임 회복 중심 옵션이라 현재 기대딜 밸류에서는 제외된다.",
        "rawOption": {
          "rawName": "방어구 룬: 은빛 찬가",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 5%, 재사용 대기 시간 회복 속도가 6% 증가한다. 주위에서 적이 5/10/20명 처치될 경우, 재사용 대기 시간 회복 속도가 3%/6%/12% 증가한다.",
          "always": {
            "attackPct": 5,
            "cooldownRecoveryPct": 6
          },
          "conditional": [
            {
              "type": "nearbyKillCountBuff",
              "killThresholds": [
                5,
                10,
                20
              ],
              "effectsByThreshold": [
                {
                  "cooldownRecoveryPct": 3
                },
                {
                  "cooldownRecoveryPct": 6
                },
                {
                  "cooldownRecoveryPct": 12
                }
              ]
            }
          ],
          "damageRelevance": "공격력 5% 외에는 쿨회복 중심이라 현재 기대딜 점수에서 대부분 제외된다.",
          "playFriction": "high",
          "expectedUptimeHint": "contentDependent",
          "valueAdjustmentHint": "공격력 5%만 기대딜 반영. 쿨회복과 처치 조건은 사이클 모델 전까지 보류한다."
        },
        "memo": "공격력 5%만 기대딜 반영. 쿨회복과 처치 조건은 사이클 모델 전까지 보류한다."
      },
      {
        "id": "armor_knight",
        "name": "기사단장",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 5,
          "attackSpeedPct": 6,
          "skillSpeedPct": 6
        },
        "killBonus": {
          "attackSpeedPct": 12,
          "skillSpeedPct": 12
        },
        "communityTier": "A+",
        "communityTierScore": 78,
        "communityTierReason": "적 피해와 속도 옵션 조합이다. 속도는 제외되지만 적 피해 기본값과 처치 조건 범용성이 남는다.",
        "rawOption": {
          "rawName": "방어구 룬: 기사단장",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 5%, 공격 속도 및 스킬 사용 속도가 6% 증가한다. 주위에서 적이 5/10/20명 처치될 경우, 공격 속도 및 스킬 사용 속도가 3%/6%/12% 증가한다.",
          "always": {
            "enemyDamagePct": 5,
            "attackSpeedPct": 6,
            "skillSpeedPct": 6
          },
          "conditional": [
            {
              "type": "nearbyKillCountBuff",
              "killThresholds": [
                5,
                10,
                20
              ],
              "effectsByThreshold": [
                {
                  "attackSpeedPct": 3,
                  "skillSpeedPct": 3
                },
                {
                  "attackSpeedPct": 6,
                  "skillSpeedPct": 6
                },
                {
                  "attackSpeedPct": 12,
                  "skillSpeedPct": 12
                }
              ]
            }
          ],
          "damageRelevance": "적 피해 5% 외에는 속도 중심이라 현재 기대딜 공식에서는 직접 가치가 낮다.",
          "playFriction": "high",
          "expectedUptimeHint": "contentDependent",
          "valueAdjustmentHint": "적 피해 5%만 기대딜 반영. 속도 옵션은 현재 밸류 제외."
        },
        "memo": "적 피해 5%만 기대딜 반영. 속도 옵션은 현재 밸류 제외."
      },
      {
        "id": "armor_victory",
        "name": "승전",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 5,
          "critDamagePct": 10
        },
        "killBonus": {
          "critDamagePct": 12
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해와 치명 피해, 처치 보너스 치명 피해가 있어 유효 딜 축이 좋다.",
        "rawOption": {
          "rawName": "방어구 룬: 승전",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 5%, 치명타 피해가 10% 증가한다. 주위에서 적이 5/10/20명 처치될 경우, 치명타 피해가 3%/6%/12% 증가한다.",
          "always": {
            "enemyDamagePct": 5,
            "critDamagePct": 10
          },
          "conditional": [
            {
              "type": "nearbyKillCountBuff",
              "killThresholds": [
                5,
                10,
                20
              ],
              "effectsByThreshold": [
                {
                  "critDamagePct": 3
                },
                {
                  "critDamagePct": 6
                },
                {
                  "critDamagePct": 12
                }
              ]
            }
          ],
          "damageRelevance": "상시 적 피해와 치명타 피해가 있고, 처치 조건 치명타 피해가 추가된다.",
          "playFriction": "mediumHigh",
          "expectedUptimeHint": "contentDependent",
          "valueAdjustmentHint": "상시 적 피해/치피는 반영. 처치 조건 치피는 콘텐츠별 유지율을 곱한다."
        },
        "memo": "상시 적 피해/치피는 반영. 처치 조건 치피는 콘텐츠별 유지율을 곱한다."
      },
      {
        "id": "armor_zeal",
        "name": "열의+",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 7,
          "attackSpeedPct": 30,
          "basicAttackDamagePct": 30
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "공격속도와 기본공격 피해 중심이라 검술사 기대딜 핵심 축과 맞지 않는다.",
        "rawOption": {
          "rawName": "방어구 룬: 열의+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 7% 증가한다. 공격 속도가 30% 증가하며, 기본 공격으로 주는 피해가 30% 증가한다.",
          "always": {
            "enemyDamagePct": 7,
            "attackSpeedPct": 30,
            "basicAttackDamagePct": 30
          },
          "conditional": [],
          "damageRelevance": "적 피해는 낮고, 공격 속도/기본 공격 피해 중심이라 스킬 중심 기대딜에서는 제한적이다.",
          "playFriction": "low",
          "expectedUptimeHint": "always",
          "valueAdjustmentHint": "적 피해 7%만 일반 기대딜 반영. 기본공격 피해는 기본공격 비중 모델 이후 반영한다."
        },
        "memo": "적 피해 7%만 일반 기대딜 반영. 기본공격 피해는 기본공격 비중 모델 이후 반영한다."
      },
      {
        "id": "armor_guardian",
        "name": "수호자",
        "tag": "빛",
        "effects": {
          "ultimateGaugeGainPct": -20,
          "attackPct": 24,
          "ultimateSkillDamagePct": 20
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 24%와 궁극기 피해 20%가 같이 있어 공격 축과 스킬 축을 동시에 민다.",
        "rawOption": {
          "rawName": "방어구 룬: 수호자",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "궁극기 게이지 획득량이 20% 감소한다. 공격력이 24% 증가한다. 궁극기 스킬로 주는 피해가 20% 증가한다.",
          "always": {
            "ultimateGaugeGainPct": -20,
            "attackPct": 24,
            "ultimateSkillDamagePct": 20
          },
          "conditional": [
            {
              "type": "drawback",
              "effects": {
                "ultimateGaugeGainPct": -20
              }
            }
          ],
          "damageRelevance": "공격력 24%는 강력한 상시 딜축이고, 궁극기 피해는 궁극기 비중에 따라 반영한다. 게이지 감소는 감점 요소다.",
          "playFriction": "low",
          "expectedUptimeHint": "always",
          "valueAdjustmentHint": "공격력 24%는 상시 반영. 궁극기 피해/게이지 감소는 궁극기 사이클 모델에서 정밀 반영한다."
        },
        "memo": "공격력 24%는 상시 반영. 궁극기 피해/게이지 감소는 궁극기 사이클 모델에서 정밀 반영한다."
      },
      {
        "id": "armor_oath_plus",
        "name": "맹세+",
        "tag": "빛",
        "effects": {
          "attackPct": 10,
          "enemyDamagePct": 15
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "공격력과 적 피해 총량은 있으나 같은 계열 상위 룬 대비 경쟁력이 낮다는 평가다.",
        "rawOption": {
          "rawName": "방어구 룬: 맹세+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 10% 증가한다. 체력이 50% 이하일 경우 받는 피해가 10% 감소하며, 2초마다 맹세 효과를 얻어 12초 동안 적에게 주는 피해가 3% 증가한다. 이 효과는 최대 5회까지 중첩된다.",
          "always": {
            "attackPct": 10
          },
          "conditional": [
            {
              "type": "lowHpStackBuff",
              "thresholdPct": 50,
              "tickSec": 2,
              "durationSec": 12,
              "maxStacks": 5,
              "effectsPerStack": {
                "enemyDamagePct": 3
              },
              "effects": {
                "damageTakenReductionPct": 10
              }
            }
          ],
          "damageRelevance": "상시 공격력은 있지만 핵심 피해 증가는 저체력 유지가 필요해 실전 마찰이 크다.",
          "playFriction": "high",
          "expectedUptimeHint": "lowHpDependent",
          "valueAdjustmentHint": "공격력 10%만 기본 반영. 저체력 중첩 피해는 위험 조건으로 낮은 유지율을 적용해야 한다."
        },
        "memo": "공격력 10%만 기본 반영. 저체력 중첩 피해는 위험 조건으로 낮은 유지율을 적용해야 한다."
      },
      {
        "id": "armor_dawn",
        "name": "서광",
        "tag": "빛",
        "effects": {
          "attackPct": 20,
          "enemyDamagePct": 20
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력 20%와 적 피해 20%의 깔끔한 복합 곱연산 구조라 범용성이 높다.",
        "rawOption": {
          "rawName": "방어구 룬: 서광",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "공격력이 20% 증가한다. 브레이크 익스텐드 스킬 사용 시, 10초 동안 적에게 주는 피해가 20% 증가한다.",
          "always": {
            "attackPct": 20
          },
          "conditional": [
            {
              "type": "breakExtendBuff",
              "durationSec": 10,
              "effects": {
                "enemyDamagePct": 20
              }
            }
          ],
          "damageRelevance": "상시 공격력 20%에 브레이크 익스텐드 구간 피해 20%가 더해져 브레이크 운영에서 강하다.",
          "playFriction": "medium",
          "expectedUptimeHint": "breakWindowDependent",
          "valueAdjustmentHint": "공격력 20%는 상시 반영. 브레이크 익스텐드 피해는 브레이크 구간 가중치와 함께 반영한다."
        },
        "memo": "공격력 20%는 상시 반영. 브레이크 익스텐드 피해는 브레이크 구간 가중치와 함께 반영한다."
      },
      {
        "id": "armor_lighthouse",
        "name": "등대지기",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 24,
          "targetIncomingDamageIncreasePct": 10
        },
        "communityTier": "A+",
        "communityTierScore": 78,
        "communityTierReason": "적 피해 24%와 받는 피해 증가 10%로 파티/대상 피해 증가 축이 강하다.",
        "rawOption": {
          "rawName": "방어구 룬: 등대지기",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 24% 증가한다. 무방비 공격 적중 시, 약화 효과: 방어구 파괴를 부여해 10초 동안 받는 피해를 10% 증가시킨다. 방어구 파괴는 중복 적용되지 않는다. 재사용 대기 시간은 1초이다.",
          "always": {
            "enemyDamagePct": 24
          },
          "conditional": [
            {
              "type": "unarmoredHitDebuff",
              "trigger": "무방비 공격 적중",
              "cooldownSec": 1,
              "durationSec": 10,
              "stackable": false,
              "effects": {
                "armorBreak": true,
                "targetIncomingDamageIncreasePct": 10
              }
            }
          ],
          "damageRelevance": "상시 적 피해는 좋지만 방어구 파괴 기재는 일부 직업/탱커 활용도가 높아 범용 딜러 밸류는 낮게 본다.",
          "playFriction": "medium",
          "expectedUptimeHint": "classDependent",
          "valueAdjustmentHint": "적 피해 24%는 반영. 방어구 파괴 기반 받피증은 직업 의존 저밸류 조건으로 낮은 가중치를 둔다."
        },
        "memo": "적 피해 24%는 반영. 방어구 파괴 기반 받피증은 직업 의존 저밸류 조건으로 낮은 가중치를 둔다."
      },
      {
        "id": "armor_light_ray",
        "name": "빛살+",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 5.5,
          "castingSpeedPct": 25,
          "chargeSpeedPct": 25,
          "skillSpeedPct": 25
        },
        "communityTier": "C",
        "communityTierScore": 48,
        "communityTierReason": "시전, 차지, 스킬 속도는 밸류 제외 대상이고 남는 적 피해가 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 빛살+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "light",
          "rawDescription": "적에게 주는 피해가 5.5%, 캐스팅 및 차지 속도와 스킬 사용 속도가 5% 증가한다. 무방비 공격 적중 시, 10초 동안 캐스팅 및 차지 속도와 스킬 사용 속도가 추가로 20% 증가한다.",
          "always": {
            "enemyDamagePct": 5.5,
            "castingSpeedPct": 5,
            "chargeSpeedPct": 5,
            "skillSpeedPct": 5
          },
          "conditional": [
            {
              "type": "unarmoredHitSpeedBuff",
              "durationSec": 10,
              "effects": {
                "castingSpeedPct": 20,
                "chargeSpeedPct": 20,
                "skillSpeedPct": 20
              }
            }
          ],
          "damageRelevance": "피해 수치가 낮고 대부분 속도 옵션이라 현재 기대딜 밸류에서는 낮다.",
          "playFriction": "medium",
          "expectedUptimeHint": "unarmoredAndUtilityDependent",
          "valueAdjustmentHint": "적 피해 5.5%만 기대딜 반영. 속도 옵션은 현재 밸류 제외."
        },
        "memo": "적 피해 5.5%만 기대딜 반영. 속도 옵션은 현재 밸류 제외."
      },
      {
        "id": "armor_chain",
        "name": "교차하는 사슬",
        "tag": "어둠",
        "effects": {
          "attackPct": 15
        },
        "nightBlessing": {
          "multiHitDamagePct": 11,
          "extraHitChancePct": 11,
          "attackPct": 11
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "공격력과 밤의 축복 조건의 연타, 추가타, 공격력이 붙어 핵심 딜 축이 고르게 오른다.",
        "rawOption": {
          "rawName": "방어구 룬: 교차하는 사슬",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "공격력이 15% 증가한다. 밤의 축복 스킬 활성화 시, 연타 피해와 추가타 확률, 공격력이 11% 증가한다.",
          "always": {
            "attackPct": 15
          },
          "conditional": [
            {
              "type": "nightBlessingBuff",
              "effects": {
                "multiHitDamagePct": 11,
                "extraHitChancePct": 11,
                "attackPct": 11
              }
            }
          ],
          "damageRelevance": "공격력, 연타, 추가타가 함께 올라 핵심 딜축이 고르게 오른다. 밤의 축복은 거의 상시로 본다.",
          "playFriction": "low",
          "expectedUptimeHint": "veryHighWhenNightBlessing",
          "valueAdjustmentHint": "상시 공격력 15%와 밤의 축복 고유지율 복합 딜축으로 평가한다."
        },
        "memo": "상시 공격력 15%와 밤의 축복 고유지율 복합 딜축으로 평가한다."
      },
      {
        "id": "armor_nightmare",
        "name": "악몽",
        "tag": "어둠",
        "directDps": 15786,
        "communityTier": "C",
        "communityTierScore": 48,
        "communityTierReason": "직접 DPS는 있으나 주력 곱연산 스탯이 없어 상위권까지는 어렵다.",
        "rawOption": {
          "rawName": "방어구 룬: 악몽",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 중 4초마다 1개씩, 최대 3개까지 충전되는 불의 정수를 얻는다. 스킬 사용 시, 불의 정수를 1개 소모하여 타겟의 위치에 화염 지대를 소환한다. 화염 지대는 3초 동안 주변 2m 범위 내의 적들에게 0.5초마다 6806의 화염 피해를 준다. 재사용 대기 시간은 0.5초이다. 전투 시작 시, 3중첩을 즉시 획득한다.",
          "always": {},
          "conditional": [
            {
              "type": "combatResourceAreaDamage",
              "resource": "불의 정수",
              "gainIntervalSec": 4,
              "maxStacks": 3,
              "startsFull": true,
              "onSkillUseCost": 1,
              "area": {
                "radiusM": 2,
                "durationSec": 3,
                "tickSec": 0.5,
                "damagePerTick": 6806
              },
              "cooldownSec": 0.5
            }
          ],
          "damageRelevance": "직접 피해형이며 스킬 사용 빈도, 적 위치 고정, 범위 적중률에 따라 가치가 달라진다.",
          "playFriction": "medium",
          "expectedUptimeHint": "skillAndAreaHitDependent",
          "valueAdjustmentHint": "직접 피해는 스킬 빈도와 범위 적중률 기반 DPS로 환산한다."
        },
        "memo": "직접 피해는 스킬 빈도와 범위 적중률 기반 DPS로 환산한다."
      },
      {
        "id": "armor_boiling",
        "name": "끓는 피",
        "tag": "어둠",
        "effects": {
          "skillDamagePct": 24
        },
        "communityTier": "B",
        "communityTierScore": 62,
        "communityTierReason": "스킬 피해 24% 단일 축이라 유효하지만 공격/치명/추가타 복합 룬보다 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 끓는 피",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "스킬 사용 시, 최대 체력의 4% 만큼 피해를 입고 5초 동안 스킬 피해가 24% 증가한다. 이 효과는 남은 체력이 30% 이상일 때만 발동한다.",
          "always": {
            "skillDamagePct": 24
          },
          "conditional": [
            {
              "type": "selfDamageSkillBuff",
              "trigger": "스킬 사용",
              "selfHpCostPct": 4,
              "durationSec": 5,
              "requiredHpAbovePct": 30,
              "effects": {
                "skillDamagePct": 24
              }
            }
          ],
          "damageRelevance": "스킬 피해는 유효하지만 자해와 체력 조건이 있어 안정성이 낮다.",
          "playFriction": "high",
          "expectedUptimeHint": "hpAndSkillFrequencyDependent",
          "valueAdjustmentHint": "스킬 피해는 스킬 비중만큼 반영하고, 자해/체력 조건으로 유지율 감점이 필요하다."
        },
        "memo": "스킬 피해는 스킬 비중만큼 반영하고, 자해/체력 조건으로 유지율 감점이 필요하다."
      },
      {
        "id": "armor_sharp",
        "name": "날 선 적의",
        "tag": "어둠",
        "effects": {
          "attackPct": 6,
          "critChancePct": 6,
          "extraHitChancePct": 6,
          "enemyDamagePct": 6,
          "moveSpeedPct": -15
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "공격, 치명, 추가타, 적 피해가 골고루 올라 좋은 분산 밸류를 가진다. 이동속도 감소는 딜 밸류와 무관하다.",
        "rawOption": {
          "rawName": "방어구 룬: 날 선 적의",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "공격력이 6%, 치명타 확률, 추가타 확률, 적에게 주는 피해가 6% 증가한다. 이동 속도가 15% 감소한다.",
          "always": {
            "attackPct": 6,
            "critChancePct": 6,
            "extraHitChancePct": 6,
            "enemyDamagePct": 6,
            "moveSpeedPct": -15
          },
          "conditional": [
            {
              "type": "drawback",
              "effects": {
                "moveSpeedPct": -15
              }
            }
          ],
          "damageRelevance": "여러 핵심 딜축이 동시에 오르지만 이동 속도 감소가 플레이 마찰을 만든다.",
          "playFriction": "medium",
          "expectedUptimeHint": "always",
          "valueAdjustmentHint": "공격력/치명/추가타/적 피해는 반영. 이동속도 감소는 실전 마찰 감점으로 별도 처리한다."
        },
        "memo": "공격력/치명/추가타/적 피해는 반영. 이동속도 감소는 실전 마찰 감점으로 별도 처리한다."
      },
      {
        "id": "armor_gravekeeper",
        "name": "무덤지기+",
        "tag": "어둠",
        "effects": {
          "attackPct": 16
        },
        "killBonus": {
          "healFlat": 9757
        },
        "communityTier": "C",
        "communityTierScore": 48,
        "communityTierReason": "공격력은 있으나 처치 보너스가 회복이라 딜 밸류 기여가 제한된다.",
        "rawOption": {
          "rawName": "방어구 룬: 무덤지기+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "공격력이 16% 증가한다. 자신과 전투 중인 적이 처치되었을 경우, 자신의 체력을 13983만큼 회복한다.",
          "always": {
            "attackPct": 16
          },
          "conditional": [
            {
              "type": "onEngagedEnemyKilledHeal",
              "healFlat": 13983
            }
          ],
          "damageRelevance": "상시 공격력은 유효하지만 회복과 처치 조건은 기대딜 기여가 낮다.",
          "playFriction": "medium",
          "expectedUptimeHint": "alwaysForAttack",
          "valueAdjustmentHint": "공격력 16%만 기대딜 반영. 처치 회복은 생존 가치로 별도 표시한다."
        },
        "memo": "공격력 16%만 기대딜 반영. 처치 회복은 생존 가치로 별도 표시한다."
      },
      {
        "id": "armor_revenge",
        "name": "복수+",
        "tag": "어둠",
        "effects": {
          "attackPct": 25,
          "healingReceivedPct": 10
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "공격력 25%는 있지만 받는 회복량 중심의 유틸 성격이 강하고 평가상 경쟁력이 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 복수+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "피해를 입을 경우 12초 동안 공격력이 5%, 받는 회복량이 2% 증가한다. 이 효과는 최대 5회까지 중첩된다.",
          "always": {},
          "conditional": [
            {
              "type": "stackOnDamageTaken",
              "durationSec": 12,
              "maxStacks": 5,
              "effectsPerStack": {
                "attackPct": 5,
                "healingReceivedPct": 2
              }
            }
          ],
          "damageRelevance": "맞아야 발동하는 구조라 고난도에서 위험하고, 회복량은 기대딜 제외 대상이다.",
          "playFriction": "high",
          "expectedUptimeHint": "damageTakenDependent",
          "valueAdjustmentHint": "피격 중첩 공격력은 위험 조건으로 낮은 유지율을 적용한다. 회복량은 제외."
        },
        "memo": "피격 중첩 공격력은 위험 조건으로 낮은 유지율을 적용한다. 회복량은 제외."
      },
      {
        "id": "armor_blurred",
        "name": "흐릿한 형상",
        "tag": "어둠",
        "erosion": {
          "strongHitDamagePct": 36
        },
        "communityTier": "SS",
        "communityTierScore": 95,
        "communityTierReason": "침식 조건에서 강타 피해 36%를 크게 올려 태그 특화 기대딜이 매우 높다.",
        "rawOption": {
          "rawName": "방어구 룬: 흐릿한 형상",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 시, 1초마다 침식 수치가 5 증가한다. 침식이 부여된 동안 강타 피해가 18% 증가한다. 침식 수치가 100 이상일 경우, 효과가 두 배로 증가한다. 침식 수치가 300에 도달하면 오염되며, 15초 동안 모든 효과를 잃는다. 침식과 오염은 전투 중에만 진행된다.",
          "always": {},
          "conditional": [
            {
              "type": "erosionScalingBuff",
              "tickSec": 1,
              "erosionGain": 5,
              "thresholds": [
                {
                  "erosion": 0,
                  "effects": {
                    "strongHitDamagePct": 18
                  }
                },
                {
                  "erosion": 100,
                  "multiplier": 2
                },
                {
                  "erosion": 300,
                  "status": "polluted",
                  "loseEffectsSec": 15
                }
              ]
            }
          ],
          "damageRelevance": "침식 기재는 현재 최상위 밸류로 본다. 강타 피해가 침식에 따라 크게 오르지만 300 오염 구간의 손실을 평균화해야 한다.",
          "playFriction": "medium",
          "expectedUptimeHint": "erosionCycleDependent",
          "valueAdjustmentHint": "침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다."
        },
        "memo": "침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다."
      },
      {
        "id": "armor_ash",
        "name": "잿빛 장막",
        "tag": "어둠",
        "erosion": {
          "multiHitDamagePct": 36
        },
        "communityTier": "SS",
        "communityTierScore": 95,
        "communityTierReason": "침식 조건에서 연타 피해 36%를 크게 올려 핵심 태그와 맞으면 폭발력이 크다.",
        "rawOption": {
          "rawName": "방어구 룬: 잿빛 장막",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 시, 1초마다 침식 수치가 5 증가한다. 침식이 부여된 동안 연타 피해가 18% 증가한다. 침식 수치가 100 이상일 경우, 효과가 두 배로 증가한다. 침식 수치가 300에 도달하면 오염되며, 15초 동안 모든 효과를 잃는다. 침식과 오염은 전투 중에만 진행된다.",
          "always": {},
          "conditional": [
            {
              "type": "erosionScalingBuff",
              "tickSec": 1,
              "erosionGain": 5,
              "thresholds": [
                {
                  "erosion": 0,
                  "effects": {
                    "multiHitDamagePct": 18
                  }
                },
                {
                  "erosion": 100,
                  "multiplier": 2
                },
                {
                  "erosion": 300,
                  "status": "polluted",
                  "loseEffectsSec": 15
                }
              ]
            }
          ],
          "damageRelevance": "침식 기재는 현재 최상위 밸류로 본다. 연타 피해가 침식에 따라 크게 오른다.",
          "playFriction": "medium",
          "expectedUptimeHint": "erosionCycleDependent",
          "valueAdjustmentHint": "침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다."
        },
        "memo": "침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다."
      },
      {
        "id": "armor_boundary",
        "name": "무너진 경계",
        "tag": "어둠",
        "erosion": {
          "extraHitChancePct": 33
        },
        "communityTier": "SS",
        "communityTierScore": 95,
        "communityTierReason": "침식 조건에서 추가타 확률 16.5%가 시작되고 침식 100 이상에서 2배가 되어 기대값 상승 축이 매우 강하다. 단, 침식 300 오염 페널티는 장기전 리스크다.",
        "rawOption": {
          "rawName": "방어구 룬: 무너진 경계",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 시, 1초마다 침식 수치가 5 증가한다. 침식이 부여된 동안 추가타 확률이 16.5% 증가한다. 침식 수치가 100 이상일 경우, 효과가 두 배로 증가한다. 침식 수치가 300에 도달하면 오염되며, 15초 동안 모든 효과를 잃는다. 침식과 오염은 전투 중에만 진행된다.",
          "always": {},
          "conditional": [
            {
              "type": "erosionStack",
              "stackGainPerSec": 5,
              "extraHitChancePct": 16.5,
              "doubleAtStack": 100,
              "effectiveExtraHitChancePct": 33,
              "contaminateAtStack": 300,
              "contaminationDurationSec": 15,
              "combatOnly": true
            }
          ],
          "damageRelevance": "침식 100 이상에서 추가타 확률 33%로 계산되어 기대딜 상승 영향이 크다.",
          "playFriction": "medium",
          "expectedUptimeHint": "rampUpWithContaminationPenalty",
          "valueAdjustmentHint": "침식 100 이상 구간은 고밸류로 보되, 침식 300 오염 15초 페널티는 장기전에서 감산한다."
        },
        "memo": "침식 100 이상 추가타 확률 33%는 반영. 오염 페널티는 장기전 감산 리스크로 추적한다."
      },
      {
        "id": "armor_agwi",
        "name": "아귀",
        "tag": "어둠",
        "effects": {
          "attackPct": 15,
          "unarmoredDamagePct": 12
        },
        "directDps": 8345,
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "공격력, 무방비 피해, 직접 DPS가 함께 있어 안정적인 중상위 딜 룬이다.",
        "rawOption": {
          "rawName": "방어구 룬: 아귀",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "매 5초마다, 다음 공격 시 10209의 피해와 25765의 지속 피해: 상처를 추가로 준다. 공격력이 15%, 무방비 피해가 12% 증가한다.",
          "always": {
            "attackPct": 15,
            "unarmoredDamagePct": 12
          },
          "conditional": [
            {
              "type": "periodicNextAttackWound",
              "intervalSec": 5,
              "directDamage": 10209,
              "dot": {
                "type": "wound",
                "damage": 25765
              }
            }
          ],
          "damageRelevance": "공격력과 무방비가 유효하고 주기 피해가 붙는다. 무방비는 사용자 기준 핵심 딜축이다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysPlusPeriodic",
          "valueAdjustmentHint": "공격력/무방비는 반영. 5초 주기 직접 피해와 상처 피해는 DPS로 환산한다."
        },
        "memo": "공격력/무방비는 반영. 5초 주기 직접 피해와 상처 피해는 DPS로 환산한다."
      },
      {
        "id": "armor_broken_crown",
        "name": "부서진 왕관",
        "tag": "어둠",
        "effects": {
          "attackPct": 12,
          "strongHitDamagePct": 13.5
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "공격력과 강타 피해가 있지만 총량과 조건 경쟁력이 낮다는 평가다.",
        "rawOption": {
          "rawName": "방어구 룬: 부서진 왕관",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 중, 5초마다 자신 주위 5m 범위 내에 15초 동안 지속되는 마력의 원을 생성한다. 마력의 원에 올라설 경우, 15초 동안 공격력이 4%, 강타 피해가 4.5% 증가한다. 최대 3회까지 중첩된다.",
          "always": {},
          "conditional": [
            {
              "type": "groundZoneStackBuff",
              "intervalSec": 5,
              "radiusM": 5,
              "zoneDurationSec": 15,
              "buffDurationSec": 15,
              "maxStacks": 3,
              "effectsPerStack": {
                "attackPct": 4,
                "strongHitDamagePct": 4.5
              },
              "requiresStandingInZone": true
            }
          ],
          "damageRelevance": "장판 위에 올라서야 하는 위치 조건 때문에 실전 마찰이 크다. 현재처럼 최대 중첩을 상시로 보면 과대평가된다.",
          "playFriction": "high",
          "expectedUptimeHint": "positionDependent",
          "valueAdjustmentHint": "장판 탑승/유지 조건으로 낮은 유지율을 적용해야 한다. 최대 3중첩 상시 반영 금지."
        },
        "memo": "장판 탑승/유지 조건으로 낮은 유지율을 적용해야 한다. 최대 3중첩 상시 반영 금지."
      },
      {
        "id": "armor_reaping_hand",
        "name": "거두는 손길",
        "tag": "어둠",
        "effects": {
          "damagePct": 26
        },
        "killRefresh": true,
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "피해 26%와 처치 갱신 성격이라 보스 기준 안정적인 고밸류로 보기 어렵다.",
        "rawOption": {
          "rawName": "방어구 룬: 거두는 손길",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 시작 시, 15초 동안 적에게 주는 피해가 26% 증가한다. 자신과 전투 중인 적이 처치되었을 경우 재발동한다.",
          "always": {},
          "conditional": [
            {
              "type": "combatStartAndKillRefreshBuff",
              "durationSec": 15,
              "effects": {
                "enemyDamagePct": 26
              },
              "refreshTrigger": "자신과 전투 중인 적 처치"
            }
          ],
          "damageRelevance": "시작 15초 폭딜과 처치 갱신 구조라 보스 장기전에서는 유지율이 낮고, 잡몹 콘텐츠에서 가치가 오른다.",
          "playFriction": "mediumHigh",
          "expectedUptimeHint": "contentDependent",
          "valueAdjustmentHint": "전투 시작 15초와 처치 갱신 유지율을 콘텐츠별로 나눠 반영한다."
        },
        "memo": "전투 시작 15초와 처치 갱신 유지율을 콘텐츠별로 나눠 반영한다."
      },
      {
        "id": "armor_cracked",
        "name": "금 간 봉인",
        "tag": "어둠",
        "erosion": {
          "critChancePct": 33
        },
        "communityTier": "SS",
        "communityTierScore": 95,
        "communityTierReason": "침식 조건에서 치명 확률 33%를 제공해 치명 기대값 축을 크게 올린다.",
        "rawOption": {
          "rawName": "방어구 룬: 금 간 봉인",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "전투 시, 1초마다 침식 수치가 5 증가한다. 침식이 부여된 동안 치명타 확률이 16.5% 증가한다. 침식 수치가 100 이상일 경우, 효과가 두 배로 증가한다. 침식 수치가 300에 도달하면 오염되며, 15초 동안 모든 효과를 잃는다. 침식과 오염은 전투 중에만 진행된다.",
          "always": {},
          "conditional": [
            {
              "type": "erosionScalingBuff",
              "tickSec": 1,
              "erosionGain": 5,
              "thresholds": [
                {
                  "erosion": 0,
                  "effects": {
                    "critChancePct": 16.5
                  }
                },
                {
                  "erosion": 100,
                  "multiplier": 2
                },
                {
                  "erosion": 300,
                  "status": "polluted",
                  "loseEffectsSec": 15
                }
              ]
            }
          ],
          "damageRelevance": "침식 기재는 현재 최상위 밸류로 본다. 치명타 확률 상승이라 기대값 기여가 크다.",
          "playFriction": "medium",
          "expectedUptimeHint": "erosionCycleDependent",
          "valueAdjustmentHint": "침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다."
        },
        "memo": "침식은 고밸류 기재로 높은 가중치를 주되, 300 오염 손실 구간을 주기 평균으로 반영한다."
      },
      {
        "id": "armor_greed",
        "name": "무한한 탐욕",
        "tag": "어둠",
        "effects": {
          "resourceConsumingSkillDamagePct": 38,
          "cooldownRecoveryPct": -10
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "자원 소모 스킬 피해 38%라는 큰 스킬 특화 축이 있고 쿨감 감소는 밸류 제외 축이다.",
        "rawOption": {
          "rawName": "방어구 룬: 무한한 탐욕",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "스킬 자원을 소모하는 스킬로 주는 피해가 38% 증가한다. 재사용 대기 시간 회복 속도가 10% 감소한다.",
          "always": {
            "resourceConsumingSkillDamagePct": 38,
            "cooldownRecoveryPct": -10
          },
          "conditional": [
            {
              "type": "drawback",
              "effects": {
                "cooldownRecoveryPct": -10
              }
            }
          ],
          "damageRelevance": "자원 소모 스킬 비중이 높으면 매우 강한 태그 피해 룬이다. 쿨회복 감소는 사이클 감점 요소다.",
          "playFriction": "low",
          "expectedUptimeHint": "buildDependent",
          "valueAdjustmentHint": "자원 소모 스킬 비중만큼 반영하고, 쿨회복 감소는 사이클 모델에서 감점한다."
        },
        "memo": "자원 소모 스킬 비중만큼 반영하고, 쿨회복 감소는 사이클 모델에서 감점한다."
      },
      {
        "id": "armor_bone",
        "name": "뼈 인장",
        "tag": "어둠",
        "effects": {
          "activeSlot3SkillDamagePct": 53
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "3번 슬롯 스킬 피해 53%로 특정 핵심 스킬 세팅에서 매우 높은 특화 밸류를 가진다.",
        "rawOption": {
          "rawName": "방어구 룬: 뼈 인장",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "액티브 3번 슬롯 스킬로 주는 피해가 53% 증가한다.",
          "always": {
            "activeSlot3SkillDamagePct": 53
          },
          "conditional": [],
          "damageRelevance": "특정 액티브 슬롯 하나에 큰 피해 증가가 몰린 구조다. 주력기를 3번 슬롯에 둘 수 있으면 고밸류다.",
          "playFriction": "low",
          "expectedUptimeHint": "slotBuildDependent",
          "valueAdjustmentHint": "액티브 3번 슬롯이 실제 주력기인지에 따라 스킬 비중 가중치를 적용해야 한다."
        },
        "memo": "액티브 3번 슬롯이 실제 주력기인지에 따라 스킬 비중 가중치를 적용해야 한다."
      },
      {
        "id": "armor_skill8",
        "name": "공허",
        "tag": "어둠",
        "effects": {
          "attackPct": 5,
          "allSkillCooldownReductionSec": 3
        },
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "쿨타임 감소 계열은 현재 기대딜 밸류에서 제외되므로 낮게 평가된다.",
        "rawOption": {
          "rawName": "방어구 룬: 공허",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dark",
          "rawDescription": "스킬 8회 사용 시, 모든 스킬의 재사용 대기 시간이 3초 감소한다. 공격력이 5% 증가한다.",
          "always": {
            "attackPct": 5,
            "allSkillCooldownReductionSec": 3
          },
          "conditional": [
            {
              "type": "skillUseCountCooldownReduction",
              "skillUseCount": 8,
              "effects": {
                "allSkillCooldownReductionSec": 3
              }
            }
          ],
          "damageRelevance": "공격력은 낮고 핵심은 쿨감이다. 현재 기대딜 공식은 쿨감을 직접 가산하지 않으므로 낮게 본다.",
          "playFriction": "medium",
          "expectedUptimeHint": "cycleDependent",
          "valueAdjustmentHint": "공격력 5%만 현재 기대딜에 반영. 8스킬마다 쿨감은 스킬 사이클 모델 이후 반영한다."
        },
        "memo": "공격력 5%만 현재 기대딜에 반영. 8스킬마다 쿨감은 스킬 사이클 모델 이후 반영한다."
      },
      {
        "id": "armor_forgotten",
        "name": "잊힌 맹약",
        "tag": "용",
        "effects": {
          "attackPct": 15
        },
        "nightBlessing": {
          "skillSpeedPct": 13,
          "castingSpeedPct": 13,
          "chargeSpeedPct": 13,
          "cooldownRecoveryPct": 13
        },
        "communityTier": "B",
        "communityTierScore": 62,
        "communityTierReason": "공격력은 유효하나 밤의 축복 보너스가 속도/쿨감 중심이라 대부분 밸류 제외된다.",
        "rawOption": {
          "rawName": "방어구 룬: 잊힌 맹약",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "공격력이 15% 증가한다. 밤의 축복 스킬 활성화 시, 스킬 사용 속도와 캐스팅 및 차지 속도, 재사용 대기 시간 회복 속도가 13% 증가한다.",
          "always": {
            "attackPct": 15
          },
          "conditional": [
            {
              "type": "nightBlessingUtilityBuff",
              "trigger": "밤의 축복 활성화",
              "effects": {
                "skillSpeedPct": 13,
                "castingSpeedPct": 13,
                "chargeSpeedPct": 13,
                "cooldownRecoveryPct": 13
              }
            }
          ],
          "damageRelevance": "상시 공격력은 유효하지만 밤의 축복 보너스가 속도/쿨회복 중심이라 현재 기대딜 직접 가치는 낮다.",
          "playFriction": "low",
          "expectedUptimeHint": "veryHighWhenNightBlessingButUtility",
          "valueAdjustmentHint": "공격력 15%만 현재 기대딜 반영. 밤축 속도/쿨회복은 사이클 모델 전까지 보류한다."
        },
        "memo": "공격력 15%만 현재 기대딜 반영. 밤축 속도/쿨회복은 사이클 모델 전까지 보류한다."
      },
      {
        "id": "armor_galebaram",
        "name": "칼바람",
        "tag": "용",
        "effects": {
          "breakSkillDamagePct": 29,
          "critDamagePct": 10
        },
        "communityTier": "B",
        "communityTierScore": 62,
        "communityTierReason": "브레이크 스킬 피해와 치명 피해 조합으로 특정 상황에서는 유효하나 범용성은 중간이다.",
        "rawOption": {
          "rawName": "방어구 룬: 칼바람",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "브레이크 스킬로 주는 피해가 29% 증가한다. 브레이크 스킬 사용 시, 7초 동안 치명타 피해가 10% 증가한다.",
          "always": {
            "breakSkillDamagePct": 29
          },
          "conditional": [
            {
              "type": "breakSkillUseBuff",
              "trigger": "브레이크 스킬 사용",
              "durationSec": 7,
              "effects": {
                "critDamagePct": 10
              }
            }
          ],
          "damageRelevance": "브레이크 스킬 비중이 높을 때 유효하지만 범용 상시 딜축은 아니다.",
          "playFriction": "medium",
          "expectedUptimeHint": "breakSkillDependent",
          "valueAdjustmentHint": "브레이크 스킬 피해와 7초 치피는 브레이크/스킬 비중에 따라 제한 반영한다."
        },
        "memo": "브레이크 스킬 피해와 7초 치피는 브레이크/스킬 비중에 따라 제한 반영한다."
      },
      {
        "id": "armor_sealmaster",
        "name": "봉인술사",
        "tag": "용",
        "effects": {
          "castingSpeedPct": 15,
          "chargeSpeedPct": 15,
          "castingSkillDamagePct": 25,
          "chargeSkillDamagePct": 25
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "시전/차지 속도는 제외되지만 시전/차지 스킬 피해 25%씩이 특정 스킬 구조에서 강하다.",
        "rawOption": {
          "rawName": "방어구 룬: 봉인술사",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "캐스팅 및 차지 속도가 15% 증가한다. 캐스팅 및 차지 스킬로 주는 피해가 25% 증가한다.",
          "always": {
            "castingSpeedPct": 15,
            "chargeSpeedPct": 15,
            "castingSkillDamagePct": 25,
            "chargeSkillDamagePct": 25
          },
          "conditional": [],
          "damageRelevance": "캐스팅/차지 스킬 비중이 높으면 강하다. 속도는 현재 밸류 제외지만 스킬 피해 25%는 태그 비중에 따라 유효하다.",
          "playFriction": "low",
          "expectedUptimeHint": "tagBuildDependent",
          "valueAdjustmentHint": "캐스팅/차지 피해는 해당 스킬 비중만큼 반영. 캐스팅/차지 속도는 현재 직접 가산하지 않는다."
        },
        "memo": "캐스팅/차지 피해는 해당 스킬 비중만큼 반영. 캐스팅/차지 속도는 현재 직접 가산하지 않는다."
      },
      {
        "id": "armor_flame",
        "name": "폭염+",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 5
        },
        "directDps": 18606,
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해와 직접 DPS가 있어 단순하지만 실전 기여가 높다.",
        "rawOption": {
          "rawName": "방어구 룬: 폭염+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 5% 증가한다. 전투 시, 2초마다 자신 주변 4m 범위 내의 모든 적에게 21825의 피해와 10185의 지속 피해: 화상을 준다.",
          "always": {
            "enemyDamagePct": 5
          },
          "conditional": [
            {
              "type": "periodicAreaBurn",
              "intervalSec": 2,
              "radiusM": 4,
              "directDamage": 21825,
              "dot": {
                "type": "burn",
                "damage": 10185
              }
            }
          ],
          "damageRelevance": "상시 적 피해는 낮지만 2초 주기 광역 직접 피해와 화상이 있어 다수전에서 가치가 오른다.",
          "playFriction": "low",
          "expectedUptimeHint": "periodicAreaHitDependent",
          "valueAdjustmentHint": "적 피해 5%는 반영. 2초 주기 광역/화상 피해는 적중 대상 수와 위치 기반 DPS로 환산한다."
        },
        "memo": "적 피해 5%는 반영. 2초 주기 광역/화상 피해는 적중 대상 수와 위치 기반 DPS로 환산한다."
      },
      {
        "id": "armor_star",
        "name": "별바라기",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "dragonSeal": {
          "attackPct": 14
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해 기본값과 용의 인장 공격력 14%가 함께 있어 조건부 상승이 좋다.",
        "rawOption": {
          "rawName": "방어구 룬: 별바라기",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 공격 시, 10초 동안 용의 문장을 활성화한다. 재사용 대기 시간은 20초이다. 용의 문장이 활성화된 동안 공격력이 14% 증가한다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkOnAttack",
              "trigger": "공격",
              "durationSec": 10,
              "cooldownSec": 20,
              "maxActiveDragonMarks": 2,
              "effects": {
                "attackPct": 14
              }
            }
          ],
          "damageRelevance": "용의 문장 기반 공격력 버프다. 기본 10초/20초 구조라 유지율은 약 50%이며, 최대 2개 제한을 공유한다.",
          "playFriction": "low",
          "expectedUptimeHint": "dragonMarkCycleDependent",
          "valueAdjustmentHint": "적 피해 10%는 상시 반영. 용의 문장 공격력 14%는 10/20초 유지율과 최대 2개 제한을 적용한다."
        },
        "memo": "적 피해 10%는 상시 반영. 용의 문장 공격력 14%는 10/20초 유지율과 최대 2개 제한을 적용한다."
      },
      {
        "id": "armor_wing",
        "name": "황동 날개",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "dragonSeal": {
          "enemyDamagePct": 14
        },
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "용의 인장 적 피해 14%는 합연산 축이라 상위 조건부 공격/치명 룬보다 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 황동 날개",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 궁극기 사용 시, 10초 동안 용의 문장을 활성화한다. 재사용 대기 시간은 20초이다. 용의 문장이 활성화된 동안 적에게 주는 피해가 14% 증가한다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkOnUltimate",
              "trigger": "궁극기 사용",
              "durationSec": 10,
              "cooldownSec": 20,
              "maxActiveDragonMarks": 2,
              "effects": {
                "enemyDamagePct": 14
              }
            }
          ],
          "damageRelevance": "궁극기 사용 조건이라 일반 공격 발동보다 유지율이 낮을 수 있다. 용의 문장 최대 2개 제한도 받는다.",
          "playFriction": "mediumHigh",
          "expectedUptimeHint": "ultimateAndDragonMarkDependent",
          "valueAdjustmentHint": "적 피해 10%는 상시 반영. 용의 문장 적 피해 14%는 궁극기 주기와 최대 2개 제한을 적용한다."
        },
        "memo": "적 피해 10%는 상시 반영. 용의 문장 적 피해 14%는 궁극기 주기와 최대 2개 제한을 적용한다."
      },
      {
        "id": "armor_neverfire",
        "name": "잠들지 않는 불",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "dragonSeal": {
          "critChancePct": 12.5
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해와 용의 인장 치명 확률 12.5%가 있어 기대값 축이 좋다.",
        "rawOption": {
          "rawName": "방어구 룬: 잠들지 않는 불",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 용의 문장의 지속 시간이 10초만큼 증가한다. 용의 문장이 활성화된 동안 치명타 확률이 12.5% 증가한다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkEnhancer",
              "durationBonusSec": 10,
              "maxActiveDragonMarks": 2,
              "effectsWhileActive": {
                "critChancePct": 12.5
              }
            }
          ],
          "damageRelevance": "용의 문장 지속시간을 늘리고 치명타 확률을 준다. 다른 용의 문장 발동 룬과 조합될 때 가치가 커진다.",
          "playFriction": "low",
          "expectedUptimeHint": "dragonMarkSynergyDependent",
          "valueAdjustmentHint": "적 피해 10%는 반영. 용의 문장 치명 확률은 활성 시간과 최대 2개 제한을 적용한다."
        },
        "memo": "적 피해 10%는 반영. 용의 문장 치명 확률은 활성 시간과 최대 2개 제한을 적용한다."
      },
      {
        "id": "armor_lightning",
        "name": "번개 숨결",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "dragonSeal": {
          "skillSpeedPct": 17,
          "castingSpeedPct": 17,
          "chargeSpeedPct": 17,
          "strongHitDamagePct": 18
        },
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "용의 인장에 강타 피해가 있으나 속도 옵션 비중이 커 평가가 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 번개 숨결",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 용의 문장이 활성화된 동안 스킬 사용 속도와 캐스팅 및 차지 속도가 17%, 강타 피해가 18% 증가한다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkWhileActiveBuff",
              "maxActiveDragonMarks": 2,
              "effects": {
                "skillSpeedPct": 17,
                "castingSpeedPct": 17,
                "chargeSpeedPct": 17,
                "strongHitDamagePct": 18
              }
            }
          ],
          "damageRelevance": "용의 문장 활성 중 강타 피해가 오른다. 속도는 현재 제외지만 강타 축은 유효하다.",
          "playFriction": "medium",
          "expectedUptimeHint": "dragonMarkDependent",
          "valueAdjustmentHint": "적 피해 10%는 반영. 강타 피해 18%는 용의 문장 활성 시간과 강타 비중을 곱한다. 속도는 제외."
        },
        "memo": "적 피해 10%는 반영. 강타 피해 18%는 용의 문장 활성 시간과 강타 비중을 곱한다. 속도는 제외."
      },
      {
        "id": "armor_stone",
        "name": "돌 심장",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "dragonSeal": {
          "cooldownRecoveryPct": 20,
          "multiHitDamagePct": 18
        },
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "쿨타임 회복이 제외되고 남는 연타 피해 조건부만으로는 낮게 평가된다.",
        "rawOption": {
          "rawName": "방어구 룬: 돌 심장",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 용의 문장이 활성화된 동안 재사용 대기 시간 회복 속도가 20%, 연타 피해가 18% 증가한다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkWhileActiveBuff",
              "maxActiveDragonMarks": 2,
              "effects": {
                "cooldownRecoveryPct": 20,
                "multiHitDamagePct": 18
              }
            }
          ],
          "damageRelevance": "용의 문장 활성 중 연타 피해가 오른다. 쿨회복은 현재 기대딜 직접 가산 제외다.",
          "playFriction": "medium",
          "expectedUptimeHint": "dragonMarkDependent",
          "valueAdjustmentHint": "적 피해 10%는 반영. 연타 피해 18%는 용의 문장 활성 시간과 연타 비중을 곱한다. 쿨회복은 보류."
        },
        "memo": "적 피해 10%는 반영. 연타 피해 18%는 용의 문장 활성 시간과 연타 비중을 곱한다. 쿨회복은 보류."
      },
      {
        "id": "armor_dragon_scale",
        "name": "용암 비늘",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "directDps": 5638,
        "communityTier": "D",
        "communityTierScore": 35,
        "communityTierReason": "적 피해와 직접 DPS만으로는 상위 복합 조건부 룬을 따라가기 어렵다.",
        "rawOption": {
          "rawName": "방어구 룬: 용암 비늘",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 공격 시, 10초 동안 용의 문장을 활성화한다. 재사용 대기 시간은 20초이다. 용의 문장이 활성화된 동안 1초마다 가장 가까운 적에게 4850의 피해를 준다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkOnAttackPeriodicDamage",
              "trigger": "공격",
              "durationSec": 10,
              "cooldownSec": 20,
              "maxActiveDragonMarks": 2,
              "periodic": {
                "intervalSec": 1,
                "target": "nearestEnemy",
                "damage": 4850
              }
            }
          ],
          "damageRelevance": "용의 문장 활성 중 단일 주기 피해가 생긴다. 피해량이 낮아 고평가되기 어렵다.",
          "playFriction": "low",
          "expectedUptimeHint": "dragonMarkCycleDependent",
          "valueAdjustmentHint": "적 피해 10%는 반영. 1초 주기 피해는 용의 문장 유지율 기반 직접 DPS로 환산한다."
        },
        "memo": "적 피해 10%는 반영. 1초 주기 피해는 용의 문장 유지율 기반 직접 DPS로 환산한다."
      },
      {
        "id": "armor_iceclaw",
        "name": "얼음 발톱",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "dragonSeal": {
          "extraHitChancePct": 12.5
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "적 피해와 용의 인장 추가타 확률 12.5%가 있어 기대값 축이 좋다.",
        "rawOption": {
          "rawName": "방어구 룬: 얼음 발톱",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 용의 문장의 지속 시간이 10초만큼 증가한다. 용의 문장이 활성화된 동안 추가타 확률이 12.5% 증가한다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "dragonMarkEnhancer",
              "durationBonusSec": 10,
              "maxActiveDragonMarks": 2,
              "effectsWhileActive": {
                "extraHitChancePct": 12.5
              }
            }
          ],
          "damageRelevance": "용의 문장 지속시간을 늘리고 추가타 확률을 준다. 다른 용의 문장 발동 룬과 조합될 때 가치가 커진다.",
          "playFriction": "low",
          "expectedUptimeHint": "dragonMarkSynergyDependent",
          "valueAdjustmentHint": "적 피해 10%는 반영. 용의 문장 추가타 확률은 활성 시간과 최대 2개 제한을 적용한다."
        },
        "memo": "적 피해 10%는 반영. 용의 문장 추가타 확률은 활성 시간과 최대 2개 제한을 적용한다."
      },
      {
        "id": "armor_forest",
        "name": "숲 길잡이",
        "tag": "용",
        "effects": {
          "moveSpeedPct": 15,
          "enemyDamagePct": 21
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "적 피해 21%가 유효하고 이동속도는 딜 밸류와 무관해 실질 손해가 적다.",
        "rawOption": {
          "rawName": "방어구 룬: 숲 길잡이",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "이동 속도가 10% 증가한다. 공격 10회 적중 혹은 5m를 이동할 경우, 10초 동안 이동 속도를 추가로 5%, 적에게 주는 피해를 21% 증가시킨다.",
          "always": {
            "moveSpeedPct": 10
          },
          "conditional": [
            {
              "type": "hitOrMoveBuff",
              "trigger": [
                "공격 10회 적중",
                "5m 이동"
              ],
              "durationSec": 10,
              "effects": {
                "moveSpeedPct": 5,
                "enemyDamagePct": 21
              }
            }
          ],
          "damageRelevance": "공격 적중이나 이동만으로 피해 21%가 켜져 실전 유지율이 높다. 이동 속도는 기대딜 제외지만 조건 충족을 쉽게 만든다.",
          "playFriction": "low",
          "expectedUptimeHint": "high",
          "valueAdjustmentHint": "피해 21%는 공격/이동 조건의 높은 유지율로 반영한다. 이동 속도는 직접 기대딜 제외."
        },
        "memo": "피해 21%는 공격/이동 조건의 높은 유지율로 반영한다. 이동 속도는 직접 기대딜 제외."
      },
      {
        "id": "armor_badabam",
        "name": "바다뱀+",
        "tag": "용",
        "effects": {
          "attackPct": 5,
          "skillSpeedPct": 5,
          "channelingSkillDamagePct": 31
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "공격력과 채널링 피해가 있지만 스킬 구조 의존도가 높고 속도 옵션 비중이 있어 낮게 평가된다.",
        "rawOption": {
          "rawName": "방어구 룬: 바다뱀+",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "공격력이 5%, 스킬 사용 속도가 5% 증가한다. 채널링 스킬로 주는 피해가 31% 증가한다.",
          "always": {
            "attackPct": 5,
            "skillSpeedPct": 5,
            "channelingSkillDamagePct": 31
          },
          "conditional": [],
          "damageRelevance": "채널링 스킬 비중이 높은 직업이면 유효하지만 검술사 기준 범용성이 낮다. 속도는 현재 직접 밸류 제외다.",
          "playFriction": "low",
          "expectedUptimeHint": "tagBuildDependent",
          "valueAdjustmentHint": "공격력 5%와 채널링 스킬 비중만큼 반영. 스킬 속도는 보류한다."
        },
        "memo": "공격력 5%와 채널링 스킬 비중만큼 반영. 스킬 속도는 보류한다."
      },
      {
        "id": "armor_successor",
        "name": "계승자",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 13,
          "skillDamagePct": 32.5
        },
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "적 피해와 스킬 피해가 같이 있어 안정적인 상위권이나 S급 복합 룬보다는 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 계승자",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "적에게 주는 피해가 13% 증가한다. 스킬 사용 시, 스킬 피해가 6.5% 증가한다. 이 효과는 최대 5회까지 중첩되며, 최대 중첩을 초과하여 발동 시 효과가 초기화된다.",
          "always": {
            "enemyDamagePct": 13
          },
          "conditional": [
            {
              "type": "skillUseStackResetBuff",
              "trigger": "스킬 사용",
              "maxStacks": 5,
              "effectsPerStack": {
                "skillDamagePct": 6.5
              },
              "onOverflow": "reset"
            }
          ],
          "damageRelevance": "스킬 피해 최대 32.5% 구조지만 5중첩 초과 시 초기화되어 평균 유지율 계산이 필요하다.",
          "playFriction": "medium",
          "expectedUptimeHint": "skillFrequencyStackCycle",
          "valueAdjustmentHint": "적 피해 13%는 반영. 스킬 피해는 5중첩 후 초기화 주기를 평균화한다."
        },
        "memo": "적 피해 13%는 반영. 스킬 피해는 5중첩 후 초기화 주기를 평균화한다."
      },
      {
        "id": "armor_sleeping",
        "name": "잠든 땅",
        "tag": "용",
        "effects": {
          "multiHitDamagePct": 13,
          "strongHitDamagePct": 13,
          "healingReceivedPct": -60
        },
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "강타와 연타 피해가 동시에 올라 태그 기반 세팅에서 안정적이다. 회복 감소는 딜 밸류와 무관하다.",
        "rawOption": {
          "rawName": "방어구 룬: 잠든 땅",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "받는 회복량이 60% 감소한다. 연타 피해가 13%, 강타 피해가 13% 증가한다.",
          "always": {
            "healingReceivedPct": -60,
            "multiHitDamagePct": 13,
            "strongHitDamagePct": 13
          },
          "conditional": [
            {
              "type": "drawback",
              "effects": {
                "healingReceivedPct": -60
              }
            }
          ],
          "damageRelevance": "강타와 연타가 동시에 오르지만 회복량 감소 패널티가 매우 크다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysWithSurvivalPenalty",
          "valueAdjustmentHint": "강타/연타는 태그 비중만큼 반영하고, 회복량 감소는 생존 감점으로 별도 처리한다."
        },
        "memo": "강타/연타는 태그 비중만큼 반영하고, 회복량 감소는 생존 감점으로 별도 처리한다."
      },
      {
        "id": "armor_healer_orb",
        "name": "비늘 덮인 현자",
        "tag": "용",
        "effects": {
          "attackPct": 25
        },
        "communityTier": "F",
        "communityTierScore": 10,
        "communityTierReason": "공격력 25% 단일 축으로는 같은 슬롯 고밸류 복합 룬보다 밀린다.",
        "rawOption": {
          "rawName": "방어구 룬: 비늘 덮인 현자",
          "slot": "armor",
          "rarity": "legendary",
          "element": "dragon",
          "rawDescription": "아군 치유 시, 15초 동안 자신의 공격력이 20% 증가한다. 추가로 회복된 아군 근처에 10초 동안 지속되는 회복 구슬을 생성한다. 재사용 대기 시간은 5초이다. 회복 구슬을 획득한 대상의 최대 체력을 2% 회복시키고, 15초 동안 공격력을 5%만큼 증가시킨다.",
          "always": {},
          "conditional": [
            {
              "type": "allyHealSupportBuff",
              "trigger": "아군 치유",
              "durationSec": 15,
              "cooldownSec": 5,
              "effects": {
                "selfAttackPct": 20
              },
              "orb": {
                "durationSec": 10,
                "targetMaxHpHealPct": 2,
                "attackPct": 5,
                "buffDurationSec": 15
              }
            }
          ],
          "damageRelevance": "아군 치유 기재라 딜러 단독 기준 활용도가 낮고 서포트/힐러 성향이다.",
          "playFriction": "high",
          "expectedUptimeHint": "allyHealDependent",
          "valueAdjustmentHint": "아군 치유 조건이 가능한 직업에서만 공격력 버프를 반영한다. 범용 딜러 기준 낮은 유지율."
        },
        "memo": "아군 치유 조건이 가능한 직업에서만 공격력 버프를 반영한다. 범용 딜러 기준 낮은 유지율."
      },
      {
        "id": "armor_yonghunter",
        "name": "용 사냥꾼",
        "tag": "신화",
        "effects": {
          "critChancePct": 10,
          "critDamagePct": 10,
          "enemyDamagePct": 5
        },
        "directDps": 5450,
        "communityTier": "SSS",
        "communityTierScore": 100,
        "communityTierReason": "치명 확률, 치명 피해, 적 피해, 직접 DPS가 모두 있어 가장 강한 복합 기대딜 구조다.",
        "rawOption": {
          "rawName": "방어구 룬: 용 사냥꾼",
          "slot": "armor",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "치명타 확률이 10%, 치명타 피해가 10% 증가한다. 퀵슬롯의 회복 물약 개수가 2개 증가하며, 붕대 개수가 2개 증가한다. 퀵슬롯 아이템 사용 시, 마력탄을 발사해 타겟 방향의 적들에게 14065의 피해를 주고 60초 동안 적에게 주는 피해가 5% 증가한다. 재사용 대기 시간은 3초이다.",
          "always": {
            "critChancePct": 10,
            "critDamagePct": 10
          },
          "conditional": [
            {
              "type": "quickSlotItemProc",
              "trigger": "퀵슬롯 아이템 사용",
              "cooldownSec": 3,
              "directDamage": 14065,
              "effects": {
                "enemyDamagePct": 5,
                "durationSec": 60
              },
              "utility": {
                "potionSlotBonus": 2,
                "bandageSlotBonus": 2
              }
            }
          ],
          "damageRelevance": "치명 확률과 치명 피해가 동시에 오르는 최상급 핵심 딜축이다. 퀵슬롯 발동 피해/적 피해도 추가된다.",
          "playFriction": "low",
          "expectedUptimeHint": "high",
          "valueAdjustmentHint": "치명/치피는 상시 고밸류로 반영. 퀵슬롯 발동 피해와 60초 적 피해는 사용 빈도 기반으로 반영한다."
        },
        "memo": "치명/치피는 상시 고밸류로 반영. 퀵슬롯 발동 피해와 60초 적 피해는 사용 빈도 기반으로 반영한다."
      },
      {
        "id": "armor_darkness",
        "name": "유폐된 어둠",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 10,
          "targetIncomingDamageIncreasePct": 10
        },
        "directDps": 3947,
        "communityTier": "A",
        "communityTierScore": 72,
        "communityTierReason": "적 피해와 받는 피해 증가, 직접 DPS가 있어 안정적이지만 최상위 복합 룬보다는 낮다.",
        "rawOption": {
          "rawName": "방어구 룬: 유폐된 어둠",
          "slot": "armor",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "적에게 주는 피해가 10% 증가한다. 3초마다 타겟 주변 적 최대 3명에게 어둠의 화살을 발사하여 10185의 피해를 주고 약화 효과: 방어구 파괴를 부여해 10초 동안 받는 피해를 10% 증가시킨다. 밤의 축복 스킬이 활성화된 동안 발사 횟수가 2배로 증가한다. 방어구 파괴는 중복 적용되지 않는다.",
          "always": {
            "enemyDamagePct": 10
          },
          "conditional": [
            {
              "type": "periodicDarkArrowArmorBreak",
              "intervalSec": 3,
              "maxTargets": 3,
              "directDamage": 10185,
              "effects": {
                "armorBreak": true,
                "targetIncomingDamageIncreasePct": 10,
                "durationSec": 10
              },
              "nightBlessingMultiplier": 2,
              "stackable": false
            }
          ],
          "damageRelevance": "상시 적 피해와 주기 피해가 있지만 방어구 파괴 기재는 직업 의존 저밸류 조건이다. 밤의 축복 중 발사 2배는 고유지율로 본다.",
          "playFriction": "medium",
          "expectedUptimeHint": "periodicNightBlessingDependent",
          "valueAdjustmentHint": "적 피해 10%와 직접 피해는 반영. 방어구 파괴 받피증은 직업 의존 낮은 가중치로 반영한다."
        },
        "memo": "적 피해 10%와 직접 피해는 반영. 방어구 파괴 받피증은 직업 의존 낮은 가중치로 반영한다."
      },
      {
        "id": "armor_goddess",
        "name": "여신",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 29
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "적 피해 29%의 높은 범용 딜 축으로 조건을 타지 않는다.",
        "rawOption": {
          "rawName": "방어구 룬: 여신",
          "slot": "armor",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "적에게 주는 피해가 29% 증가한다. 적색, 청색, 녹색, 무색, 황금색 팔라딘 아티팩트를 모두 1개 이상 장착했을 경우, 받는 피해가 10% 감소한다. 행동 불능에 이르는 공격을 1회 막아주고 체력을 대량 회복한다. 이후 3초 동안 받는 피해가 80% 감소한다. 동일한 행동 불능에 저항하는 효과와 재사용 대기 시간을 공유한다. 재사용 대기 시간은 180초이다.",
          "always": {
            "enemyDamagePct": 29
          },
          "conditional": [
            {
              "type": "paladinArtifactSetSurvival",
              "requiresAllArtifacts": [
                "red",
                "blue",
                "green",
                "colorless",
                "gold"
              ],
              "effects": {
                "damageTakenReductionPct": 10
              }
            },
            {
              "type": "incapacitationProtection",
              "cooldownSec": 180,
              "effects": {
                "largeHeal": true,
                "damageTakenReductionPct": 80,
                "durationSec": 3
              },
              "sharedCooldownWithSimilarEffects": true
            }
          ],
          "damageRelevance": "상시 적 피해 29%가 강하고 생존 보너스가 붙는다. 생존 효과는 기대딜 직접 가산은 아니다.",
          "playFriction": "low",
          "expectedUptimeHint": "alwaysForDamage",
          "valueAdjustmentHint": "적 피해 29%는 상시 반영. 팔라딘/행동불능 방어는 생존 가치로 별도 처리한다."
        },
        "memo": "적 피해 29%는 상시 반영. 팔라딘/행동불능 방어는 생존 가치로 별도 처리한다."
      },
      {
        "id": "armor_muhyeong",
        "name": "무형",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 30,
          "skillDamagePct": 27,
          "attackPct": 29
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "적 피해, 스킬 피해, 공격력이 모두 높은 복합 축으로 매우 강하다.",
        "rawOption": {
          "rawName": "방어구 룬: 무형",
          "slot": "armor",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "저주 룬 착용 시, 적에게 주는 피해와 받는 피해가 30% 증가하고 이동 속도 감소 효과가 사라진다. 침식 룬 착용 시, 5초마다 타겟 방향의 적들에게 76148의 피해를 준다. 용의 문장 룬 착용 시, 스킬 피해가 27% 증가한다. 순서대로 하나의 효과만 적용되며, 활성화되지 않은 경우 공격력이 29% 증가한다.",
          "always": {},
          "conditional": [
            {
              "type": "exclusiveRuneFamilyBonus",
              "priority": [
                "curse",
                "erosion",
                "dragonMark",
                "fallbackAttack"
              ],
              "effectsByFamily": {
                "curse": {
                  "enemyDamagePct": 30,
                  "damageTakenIncreasePct": 30,
                  "removeMoveSpeedReduction": true
                },
                "erosion": {
                  "intervalSec": 5,
                  "directionalDamage": 76148
                },
                "dragonMark": {
                  "skillDamagePct": 27
                },
                "fallback": {
                  "attackPct": 29
                }
              }
            }
          ],
          "damageRelevance": "착용 룬 계열에 따라 효과가 완전히 달라지는 고난도 조건부다. 침식/용의 문장/저주 빌드별 별도 계산이 필요하다.",
          "playFriction": "medium",
          "expectedUptimeHint": "runeFamilyDependent",
          "valueAdjustmentHint": "동시에 합산하지 말고 우선순위에 따라 하나만 적용한다. 빌드 계열별로 별도 밸류를 계산한다."
        },
        "memo": "동시에 합산하지 말고 우선순위에 따라 하나만 적용한다. 빌드 계열별로 별도 밸류를 계산한다."
      },
      {
        "id": "armor_lawbook",
        "name": "사슬로 묶은 법전",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 29
        },
        "communityTier": "S+",
        "communityTierScore": 90,
        "communityTierReason": "높은 적 피해 단일 축이지만 수치가 커 범용성이 좋다.",
        "rawOption": {
          "rawName": "방어구 룬: 사슬로 묶은 법전",
          "slot": "armor",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "도발 시, 적에게 주는 피해가 26%, 무방비 피해가 16% 증가한다. 아군 치유 시, 공격력이 25%, 재사용 대기 시간 회복 속도가 4% 증가한다. 하나의 효과만 적용되며, 활성화되지 않은 경우 적에게 주는 피해가 29% 증가한다.",
          "always": {},
          "conditional": [
            {
              "type": "exclusiveTriggerBonus",
              "effectsByTrigger": {
                "taunt": {
                  "enemyDamagePct": 26,
                  "unarmoredDamagePct": 16
                },
                "allyHeal": {
                  "attackPct": 25,
                  "cooldownRecoveryPct": 4
                },
                "fallback": {
                  "enemyDamagePct": 29
                }
              }
            }
          ],
          "damageRelevance": "도발/아군 치유는 일부 직업 의존이 크다. 미활성 기본 적 피해 29%가 범용 딜러 기준 핵심이다.",
          "playFriction": "medium",
          "expectedUptimeHint": "classOrFallbackDependent",
          "valueAdjustmentHint": "도발/힐 조건은 직업별로만 반영하고, 일반 딜러는 기본 적 피해 29%를 반영한다."
        },
        "memo": "도발/힐 조건은 직업별로만 반영하고, 일반 딜러는 기본 적 피해 29%를 반영한다."
      },
      {
        "id": "armor_kingdom",
        "name": "가라앉은 왕국",
        "tag": "신화",
        "effects": {
          "attackPct": 15,
          "ultimateSkillDamagePct": 10,
          "cooldownRecoveryPct": 8
        },
        "communityTier": "S",
        "communityTierScore": 85,
        "communityTierReason": "공격력과 궁극기 피해가 유효하고 쿨타임 회복은 밸류 제외 대상이다.",
        "rawOption": {
          "rawName": "방어구 룬: 가라앉은 왕국",
          "slot": "armor",
          "rarity": "mythic",
          "element": "mythic",
          "rawDescription": "공격력이 15%, 궁극기 스킬로 주는 피해가 10% 증가한다. 궁극기 사용 시, 30초 동안 재사용 대기 시간 회복 속도가 8% 증가하며, 10초 동안 속박 상태가 된다.",
          "always": {
            "attackPct": 15,
            "ultimateSkillDamagePct": 10
          },
          "conditional": [
            {
              "type": "ultimateUseBuffAndRoot",
              "trigger": "궁극기 사용",
              "durationSec": 30,
              "effects": {
                "cooldownRecoveryPct": 8
              },
              "drawback": {
                "rootedSec": 10
              }
            }
          ],
          "damageRelevance": "공격력과 궁극기 피해는 유효하지만 궁극기 후 10초 속박이 큰 플레이 마찰이다.",
          "playFriction": "high",
          "expectedUptimeHint": "ultimateCycleWithRootPenalty",
          "valueAdjustmentHint": "공격력/궁극기 피해는 반영. 쿨회복은 보류하고 10초 속박은 실전 감점으로 처리한다."
        },
        "memo": "공격력/궁극기 피해는 반영. 쿨회복은 보류하고 10초 속박은 실전 감점으로 처리한다."
      }
    ],
    "accessory": []
  },
  "communityEvaluation": {
    "source": "user_armor_rune_tier_2026_07_02",
    "target": "armor",
    "purpose": "community tier metadata for future season tuning and UI reference",
    "rule": "subjective tiers are displayed and analyzed, but they do not directly override expected-damage value calculation",
    "tierScore": {
      "SSS": 100,
      "SS": 95,
      "S+": 90,
      "S": 85,
      "A+": 78,
      "A": 72,
      "B": 62,
      "C": 48,
      "D": 35,
      "F": 10
    },
    "weaponSource": "inferred_from_armor_tier_principles_2026_07_02",
    "weaponRule": "weapon tiers are inferred from armor community principles and are displayed as tuning metadata, not direct score multipliers"
  },
  "weaponConditionModel": {
    "source": "user_weapon_rune_screenshots_2026_07_02",
    "rule": "원문 옵션과 조건부 발동 정보를 rawOption에 저장한다. 계산식 직접 변경은 스킬/유지율 모델 검수 후 적용한다.",
    "uptimeHintScale": "0~1 rough prior"
  },
  "emblemConditionModel": {
    "version": "27.2",
    "rule": "엠블럼 원문 옵션과 조건부 발동 정보를 rawOption에 저장한다. 계산식 직접 변경은 밤의 축복/무방비/스킬 사이클 모델 검수 후 적용한다.",
    "assumptions": {
      "nightBlessing": "사용자 제보 기준 거의 상시 발동으로 취급한다. 밤의 축복 조건부 피해 옵션은 낮은 마찰의 고유지율 조건부로 분류한다.",
      "unarmored": "무방비 피해는 브레이크로 기절시킨 구간의 브레이크 추가 데미지와 브레이크 익스텐드 특수 추가 데미지에 더해지는 핵심 딜축이다. 치명타 피해/치명타 확률과 거의 같은 등급의 밸류로 본다.",
      "speedAndCooldown": "스킬 사용 속도, 재사용 대기 시간 회복 속도는 현재 기대딜 점수에 직접 가산하지 않고 사이클 모델의 별도 입력으로 보류한다."
    },
    "nextFormulaTargets": [
      "밤의 축복 유지율 계수",
      "무방비 피해의 브레이크 구간 가중치",
      "강타/연타/스킬 피해의 실제 스킬 태그 비중",
      "직접 피해의 발동 주기와 다수 타겟 보정"
    ]
  },
  "armorConditionModel": {
    "version": "27.5",
    "rule": "방어구 원문 옵션과 조건부 발동 정보를 rawOption에 저장한다. 계산식 직접 변경은 밤의 축복, 무방비, 브레이크, 침식, 용의 문장, 직업별 기재, 처치 조건, 저체력 조건 모델 검수 후 적용한다.",
    "assumptions": {
      "nightBlessing": "사용자 제보 기준 거의 상시 발동으로 취급한다.",
      "unarmored": "무방비 피해는 브레이크 구간 핵심 딜축으로 치명타 피해/치명타 확률급 밸류로 본다.",
      "armorBreak": "방어구 파괴 기재는 특정 일부 직업, 특히 탱커 쪽 활용도가 높아 범용 딜러 기준 저밸류 조건으로 본다.",
      "erosion": "침식 기재는 현재 가장 고밸류 조건부 축으로 본다. 다만 300 오염 손실 구간은 평균화해야 한다.",
      "killCondition": "주위 적 처치 조건은 보스 단일전에서 낮게, 잡몹 콘텐츠에서 높게 본다.",
      "speedAndCooldown": "공격 속도, 스킬 사용 속도, 재사용 대기 시간 회복 속도는 현재 기대딜 점수에 직접 가산하지 않는다.",
      "dragonMark": "용의 문장은 최대 2개 활성 제한을 공유한다. 발동형, 지속시간 증가형, 활성 중 보너스형을 분리해 유지율과 중복 제한을 계산해야 한다.",
      "activeSlot": "액티브 슬롯 피해 증가는 해당 슬롯에 실제 주력기가 들어가는지에 따라 스킬 비중 가중치가 필요하다.",
      "classMechanic": "도발, 아군 치유, 방어구 파괴처럼 특정 직업 기재에 기대는 옵션은 범용 딜러 기준 낮은 가중치를 적용한다.",
      "exclusiveEffects": "무형, 사슬로 묶은 법전처럼 하나의 효과만 적용되는 룬은 효과를 합산하지 않고 조건 우선순위별로 별도 평가한다."
    },
    "appliedBatches": [
      {
        "batch": 1,
        "count": 15,
        "range": "기본기+부터 서광까지"
      },
      {
        "batch": 2,
        "count": 15,
        "range": "등대지기부터 거두는 손길 및 무한한 탐욕까지"
      },
      {
        "batch": 3,
        "count": 15,
        "range": "무한한 탐욕 재대조 및 뼈 인장부터 숲 길잡이까지"
      },
      {
        "batch": 4,
        "count": 10,
        "range": "바다뱀+부터 가라앉은 왕국까지, 여신 중복 제외"
      }
    ],
    "status": "사용자가 제공한 방어구 스크린샷 54개 반영. 무너진 경계 1개는 원문 스크린샷 대기."
  }
};
