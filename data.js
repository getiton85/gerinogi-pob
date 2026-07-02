const DB = {
  "version": "12.0-trusted",
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
        "memo": "밤의 축복 활성화 시 피해 48%"
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
        "memo": "스킬 사용/기본공격 효과. 동시 활성 1.5배는 보수적으로 미반영"
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
        "memo": "추가타/치명타 5회 조건 직접피해 환산"
      },
      {
        "id": "emblem_chimmuk",
        "name": "침묵",
        "tag": "어둠",
        "effects": {
          "enemyDamagePct": 33
        },
        "directDps": 14622,
        "memo": "밤의 축복 광역 피해 환산"
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
        "directDps": 5582
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
        "memo": "오염 지속시간 감소 패널티는 점수에 미반영"
      },
      {
        "id": "emblem_taecho",
        "name": "태초",
        "tag": "용",
        "effects": {
          "skillDamagePct": 20
        },
        "memo": "밤의 축복 시 스킬 쿨 초기화는 보수적으로 점수 미반영"
      },
      {
        "id": "emblem_faded_star",
        "name": "빛바랜 별",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 31,
          "unarmoredDamagePct": 31
        }
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
        "directDps": 4313
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
        "memo": "스킬 사용 후 다음 기본 공격"
      },
      {
        "id": "weapon_haetsal",
        "name": "햇살+",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 16,
          "cooldownRecoveryPct": 15
        }
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
        }
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
        "memo": "상태이상 적 공격 시 치명피해"
      },
      {
        "id": "weapon_glory",
        "name": "타오르는 영광",
        "tag": "빛",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 23.5
        },
        "memo": "궁극기 불씨 중첩은 별도 평균화 필요"
      },
      {
        "id": "weapon_curse_a",
        "name": "저주의 룬: 억압",
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
        "memo": "5초마다 최대체력 비례 피해는 임시 DPS"
      },
      {
        "id": "weapon_curse_b",
        "name": "저주의 룬: 파멸",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 30,
          "critDamagePct": 5,
          "moveSpeedPct": -15
        }
      },
      {
        "id": "weapon_dot_poison",
        "name": "지속 피해: 중독",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "strongHitDamagePct": 15
        },
        "directDps": 4849
      },
      {
        "id": "weapon_bupae",
        "name": "부패+",
        "tag": "어둠",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 15
        },
        "directDps": 18137
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
        }
      },
      {
        "id": "weapon_great_rage",
        "name": "거대한 분노",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "enemyDamagePct": 21,
          "skillDamagePct": 12
        }
      },
      {
        "id": "weapon_rock_blade",
        "name": "바위 칼날",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "attackPct": 21,
          "critChancePct": 15
        }
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
        }
      },
      {
        "id": "weapon_tracker",
        "name": "추적자",
        "tag": "용",
        "effects": {
          "flatAttack": 1038,
          "strongHitDamagePct": 35
        },
        "directDps": 3299
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
        }
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
        "directDps": 3007
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
        "memo": "행동불능 방지 무효/사망 패널티는 점수 미반영"
      }
    ],
    "armor": [
      {
        "id": "armor_basic",
        "name": "기본기+",
        "tag": "없음",
        "effects": {
          "enemyDamagePct": 20
        }
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
        }
      },
      {
        "id": "armor_rusted_shield",
        "name": "녹슨 방패",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 22
        }
      },
      {
        "id": "armor_pride",
        "name": "긍지",
        "tag": "빛",
        "effects": {
          "attackPct": 25,
          "recoveryPct": 10,
          "targetIncomingDamageIncreasePct": 10
        }
      },
      {
        "id": "armor_crescent",
        "name": "그믐달",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 15,
          "attackPct": 10
        }
      },
      {
        "id": "armor_dignity",
        "name": "위엄",
        "tag": "빛",
        "effects": {
          "attackPct": 16,
          "unarmoredDamagePct": 32
        }
      },
      {
        "id": "armor_offense",
        "name": "공세+",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 27.5
        }
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
        }
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
        }
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
        }
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
        }
      },
      {
        "id": "armor_zeal",
        "name": "열의+",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 7,
          "attackSpeedPct": 30,
          "basicAttackDamagePct": 30
        }
      },
      {
        "id": "armor_guardian",
        "name": "수호자",
        "tag": "빛",
        "effects": {
          "ultimateGaugeGainPct": -20,
          "attackPct": 24,
          "ultimateSkillDamagePct": 20
        }
      },
      {
        "id": "armor_oath_plus",
        "name": "맹세+",
        "tag": "빛",
        "effects": {
          "attackPct": 10,
          "enemyDamagePct": 15
        }
      },
      {
        "id": "armor_dawn",
        "name": "서광",
        "tag": "빛",
        "effects": {
          "attackPct": 20,
          "enemyDamagePct": 20
        }
      },
      {
        "id": "armor_lighthouse",
        "name": "등대지기",
        "tag": "빛",
        "effects": {
          "enemyDamagePct": 24,
          "targetIncomingDamageIncreasePct": 10
        }
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
        }
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
        }
      },
      {
        "id": "armor_nightmare",
        "name": "악몽",
        "tag": "어둠",
        "directDps": 15786
      },
      {
        "id": "armor_boiling",
        "name": "끓는 피",
        "tag": "어둠",
        "effects": {
          "skillDamagePct": 24
        }
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
        }
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
        }
      },
      {
        "id": "armor_revenge",
        "name": "복수+",
        "tag": "어둠",
        "effects": {
          "attackPct": 25,
          "healingReceivedPct": 10
        }
      },
      {
        "id": "armor_blurred",
        "name": "흐릿한 형상",
        "tag": "어둠",
        "erosion": {
          "strongHitDamagePct": 36
        }
      },
      {
        "id": "armor_ash",
        "name": "잿빛 장막",
        "tag": "어둠",
        "erosion": {
          "multiHitDamagePct": 36
        }
      },
      {
        "id": "armor_boundary",
        "name": "무너진 경계",
        "tag": "어둠",
        "erosion": {
          "extraHitChancePct": 33
        }
      },
      {
        "id": "armor_agwi",
        "name": "아귀",
        "tag": "어둠",
        "effects": {
          "attackPct": 15,
          "unarmoredDamagePct": 12
        },
        "directDps": 8345
      },
      {
        "id": "armor_broken_crown",
        "name": "부서진 왕관",
        "tag": "어둠",
        "effects": {
          "attackPct": 12,
          "strongHitDamagePct": 13.5
        }
      },
      {
        "id": "armor_reaping_hand",
        "name": "거두는 손길",
        "tag": "어둠",
        "effects": {
          "damagePct": 26
        },
        "killRefresh": true
      },
      {
        "id": "armor_cracked",
        "name": "금 간 봉인",
        "tag": "어둠",
        "erosion": {
          "critChancePct": 33
        }
      },
      {
        "id": "armor_greed",
        "name": "무한한 탐욕",
        "tag": "어둠",
        "effects": {
          "resourceConsumingSkillDamagePct": 38,
          "cooldownRecoveryPct": -10
        }
      },
      {
        "id": "armor_bone",
        "name": "뼈 인장",
        "tag": "어둠",
        "effects": {
          "activeSlot3SkillDamagePct": 53
        }
      },
      {
        "id": "armor_skill8",
        "name": "스킬 8회 쿨감 룬",
        "tag": "어둠",
        "effects": {
          "attackPct": 5,
          "allSkillCooldownReductionSec": 3
        }
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
        }
      },
      {
        "id": "armor_galebaram",
        "name": "칼바람",
        "tag": "용",
        "effects": {
          "breakSkillDamagePct": 29,
          "critDamagePct": 10
        }
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
        }
      },
      {
        "id": "armor_flame",
        "name": "폭염+",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 5
        },
        "directDps": 18606
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
        }
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
        }
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
        }
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
        }
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
        }
      },
      {
        "id": "armor_dragon_scale",
        "name": "용암 비늘",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 10
        },
        "directDps": 5638
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
        }
      },
      {
        "id": "armor_forest",
        "name": "숲 길잡이",
        "tag": "용",
        "effects": {
          "moveSpeedPct": 15,
          "enemyDamagePct": 21
        }
      },
      {
        "id": "armor_badabam",
        "name": "바다뱀+",
        "tag": "용",
        "effects": {
          "attackPct": 5,
          "skillSpeedPct": 5,
          "channelingSkillDamagePct": 31
        }
      },
      {
        "id": "armor_successor",
        "name": "계승자",
        "tag": "용",
        "effects": {
          "enemyDamagePct": 13,
          "skillDamagePct": 32.5
        }
      },
      {
        "id": "armor_sleeping",
        "name": "잠든 땅",
        "tag": "용",
        "effects": {
          "multiHitDamagePct": 13,
          "strongHitDamagePct": 13,
          "healingReceivedPct": -60
        }
      },
      {
        "id": "armor_healer_orb",
        "name": "비늘 덮인 현자",
        "tag": "용",
        "effects": {
          "attackPct": 25
        }
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
        "directDps": 5450
      },
      {
        "id": "armor_darkness",
        "name": "유폐된 어둠",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 10,
          "targetIncomingDamageIncreasePct": 10
        },
        "directDps": 3947
      },
      {
        "id": "armor_goddess",
        "name": "여신",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 29
        }
      },
      {
        "id": "armor_muhyeong",
        "name": "무형",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 30,
          "skillDamagePct": 27,
          "attackPct": 29
        }
      },
      {
        "id": "armor_lawbook",
        "name": "사슬로 묶은 법전",
        "tag": "신화",
        "effects": {
          "enemyDamagePct": 29
        }
      },
      {
        "id": "armor_kingdom",
        "name": "가라앉은 왕국",
        "tag": "신화",
        "effects": {
          "attackPct": 15,
          "ultimateSkillDamagePct": 10,
          "cooldownRecoveryPct": 8
        }
      }
    ],
    "accessory": []
  }
};