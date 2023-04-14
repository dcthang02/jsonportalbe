require('dotenv').config();

const port = process.env.PORT;
const MONGO_URL = process.env.MONGODB_URL;

const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const localConfigRoute = require('./routes/localconfig');

app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/localconfig', localConfigRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({ error: error.message });
});

const jsonString = `{
  "name": "underwriting",
  "logs": [
    {
      "logEvent": "告知ページ遷移/Underwriting-entry",
      "action": "load",
      "type": "ecom"
    },
    {
      "logEvent": "保険料率変更表示/Display price change",
      "action": "displayPriceChane",
      "type": "ecom"
    },
    {
      "logEvent": "問合せフォーム表示/Display lead form",
      "action": "showLeadGen",
      "type": "ecom"
    },
    {
      "logEvent": "問合せフォーム送信/Lead submitted",
      "action": "leadGenSubmited",
      "type": "ecom"
    },
    {
      "logEvent": "保険料率変更承認/Accept price change",
      "action": "acceptPriceChange",
      "type": "ecom"
    },
    {
      "logEvent": "consent",
      "action": "underwritingConsent",
      "additionalInfo": {
        "event_action": "underwriting_consent",
        "component_name": "consent btn"
      },
      "type": "ga"
    },
    {
      "logEvent": "yourHealthStatus",
      "action": "underwritingHealthStatus",
      "type": "ga"
    },
    {
      "logEvent": "yourHealthInformation",
      "action": "underwritingHealthInformation",
      "additionalInfo": {
        "event_action": "underwriting_health_information_q_bmi"
      },
      "type": "ga"
    },
    {
      "logEvent": "next",
      "action": "underwritingNext",
      "additionalInfo": {
        "event_action": "underwriting_next",
        "component_name": "underwriting next btn"
      },
      "type": "ga"
    },
    {
      "logEvent": "begin_checkout",
      "action": "underwritingBeginCheckout",
      "type": "ga"
    },
    {
      "logEvent": "pop-up",
      "action": "popupImpression",
      "additionalInfo": {
        "event_action": "pop-up_impression",
        "error_message": "Price change from preferred to standard",
        "application_step": "underwriting"
      },
      "type": "ga"
    },
    {
      "logEvent": "pop-up",
      "action": "popupClick",
      "additionalInfo": {
        "event_action": "pop-up_click",
        "button_title": "ok, got it",
        "error_message": "Price change from preferred to standard",
        "application_step": "underwriting"
      },
      "type": "ga"
    }
  ],
  "step": "underwriting",
  "nextStep": "/application",
  "seo_title": "underwriting_seo_title",
  "pathname": [
    "/underwriting"
  ],
  "backPage": "/",
  "components": [
    {
      "type": "headlines",
      "properties": {
        "main": "underwriting_layout_title",
        "secondary": "underwriting_layout_description",
        "description": "translation.step1.headline.description"
      }
    },
    {
      "type": "sectionContainer",
      "key": "sectionContainer",
      "properties": {
        "isFullWidth": true,
        "title": {
          "label": {
            "MYSELF": "underwriting_notes_title"
          },
          "editButtonVisible": false,
          "editAction": {}
        },
        "helpText": "",
        "icon": "documentSignSvg",
        "hasBorder": false,
        "components": [
          {
            "type": "declaration",
            "main": "underwriting_notes_main_body",
            "component": [
              {
                "type": "declarationText",
                "key": "declarationText1",
                "properties": {
                  "content": "underwriting_notes_body"
                }
              },
              {
                "type": "switchGroup",
                "key": "declarationAccept",
                "properties": {
                  "name": "declarationAccept",
                  "defaultValue": "yes",
                  "label": "btn_accept",
                  "isFullWidth": true
                },
                "validation": {
                  "rules": [
                    {
                      "key": "required",
                      "action": {
                        "rejectHandling": [
                          {
                            "type": "validate",
                            "errorText": "mandatory_field_error"
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    },
    {
      "type": "sectionContainer",
      "key": "sectionContainer1",
      "properties": {
        "isFullWidth": true,
        "title": {
          "label": {
            "MYSELF": "underwriting_section_title",
            "MY_CHILD": "underwriting_section_title_child",
            "MY_PARENT": "underwriting_section_title_parent",
            "MY_SPOUSE": "underwriting_section_title_spouse"
          },
          "editButtonVisible": false,
          "editAction": {}
        },
        "helpText": "",
        "description": "",
        "background": "",
        "icon": "personOrangeSvg",
        "hasBorder": false,
        "components": [
          {
            "type": "uwCheckbox",
            "key": "uw1",
            "properties": {
              "name": "uw1",
              "question": "最近3か月以内に、医師の診察・検査・治療・投薬(薬の処方を含みます)をうけたことがありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no"
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider2"
          },
          {
            "type": "uwCheckbox",
            "key": "uw2",
            "properties": {
              "name": "uw2",
              "question": "過去2年以内に、以下に該当したことはありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "subQuestion": {
                "style": {
                  "padding": "15px",
                  "listStyle": "disc"
                },
                "list": [
                  {
                    "title": "",
                    "content": "病気またはけがで、継続して7日間以上の入院をしたこと。（女性の場合は正常分娩による入院を除きます。）"
                  },
                  {
                    "title": "",
                    "content": "病気またはけがで、手術をうけたこと。（手術について「帝王切開」「内視鏡手術」「レーザー手術」「体外衝撃波による結石破砕術」も含みます。）"
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider3"
          },
          {
            "type": "uwCheckbox",
            "key": "uw3",
            "properties": {
              "name": "uw3",
              "question": "過去5年以内に、以下の病気や症状またはそれらの疑いで医師の診察・検査・ 治療・投薬(薬の処方を含みます)をうけたことがありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "subQuestion": {
                "style": {
                  "padding": "15px",
                  "listStyle": "lower-alpha"
                },
                "list": [
                  {
                    "title": "心臓・血圧の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■狭心症　■心筋こうそく　■心臓弁膜症　■不整脈　■高血圧症</div>"
                  },
                  {
                    "title": "脳の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■脳卒中　■脳出血　■脳こうそく　■くも膜下出血</div>"
                  },
                  {
                    "title": "精神・神経の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■自律神経失調症　■うつ病　■神経症　■統合失調症　■てんかん　■知的障害　■認知症</div>"
                  },
                  {
                    "title": "呼吸器の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■ぜんそく　■慢性閉塞性肺疾患(COPD)　■肺気腫　■慢性気管支炎</div>"
                  },
                  {
                    "title": "消化器の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■かいよう性大腸炎　■クローン病　■すい炎</div>"
                  },
                  {
                    "title": "肝臓の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■肝炎(ウイルスキャリアを含む)　■肝硬変　■肝機能障害</div>"
                  },
                  {
                    "title": "腎臓の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■腎炎　■ネフローゼ　■腎不全</div>"
                  },
                  {
                    "title": "眼の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■白内障　■緑内障　■網膜の病気</div>"
                  },
                  {
                    "title": "その他の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■がん　■しゅよう　■ポリープ　■異形成　■異型上皮　■糖尿病　■リウマチ　■こうげん病　■甲状腺の病気</div>"
                  },
                  {
                    "title": "男性の病気",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■前立腺の病気</div>"
                  },
                  {
                    "title": "女性の病気・症状",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■乳房の異常(しこり・しゅりゅう・異常分泌・マンモグラフィーやエコー検査における異常)　■子宮けい部異形成</div>"
                  }
                ]
              },
              "validation": {
                "rules": [],
                "expected": [
                  {
                    "value": "yes",
                    "action": {
                      "rejectHandling": [
                        {
                          "type": "LeadMarketingModal",
                          "code": "ZHS-RA-U",
                          "message": "rejectApplication"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider4"
          },
          {
            "type": "uwCheckbox",
            "key": "uw4",
            "properties": {
              "name": "uw4",
              "question": "過去5年以内に、上記3項以外の病気・症状またはそれらの疑いやけがで、医師の診察・検査・治療・投薬(薬の処方を含みます)を開始してから治る(全治・経過観察終了)までの期間が、14日間以上(薬の合計14日分や経過観察14日間を含みます)になったことがありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "validation": {
                "rules": [],
                "expected": [
                  {
                    "value": "yes",
                    "action": {
                      "rejectHandling": [
                        {
                          "type": "LeadMarketingModal",
                          "code": "ZHS-RA-U",
                          "message": "rejectApplication"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider5"
          },
          {
            "type": "uwCheckbox",
            "key": "uw5",
            "properties": {
              "name": "uw5",
              "question": "今までに、がんまたは上皮内がんにかかったことがありますか。（がんには、白血病、肉腫、骨髄異形成症候群、真性多血症、本態性血小板血症、悪性リンパ腫などを含みます。）",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "validation": {
                "rules": [],
                "expected": [
                  {
                    "value": "yes",
                    "action": {
                      "rejectHandling": [
                        {
                          "type": "LeadMarketingModal",
                          "code": "ZHS-RA-U",
                          "message": "rejectApplication"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider6"
          },
          {
            "type": "uwCheckbox",
            "key": "uw6-ア",
            "properties": {
              "name": "uw6-ア",
              "question": "過去2年以内に健康診断・人間ドックをうけたことがありますか。<BR>健康診断・人間ドックとは健康維持・病気の早期発見のための診察・検査をいい、「定期健康診断（診査）」および自発的にうけた「がん検診」「脳ドック」「ＰＥＴ検診」「生活習慣病予防検診」などの診査や検査を含みます。",
              "viewMore": "",
              "yesLabel": "btn_received",
              "noLabel": "btn_not_received",
              "accept": "no_yes",
              "validation": {
                "rules": []
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "expected": [
                {
                  "field": "uw6",
                  "condition": [
                    {
                      "equal": "yes",
                      "subCondition": [
                        {
                          "field": "healthCheckDate",
                          "condition": [
                            {
                              "greaterThan": 2
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "action": {
                    "successHandling": [
                      {
                        "type": "validate",
                        "dataSource": "translation",
                        "errorText": "err_not_consistent_with_health_checkup_date"
                      }
                    ]
                  }
                },
                {
                  "field": "uw6",
                  "condition": [
                    {
                      "equal": "no",
                      "subCondition": [
                        {
                          "field": "healthCheckDate",
                          "condition": [
                            {
                              "lessThanOrEqual": 2
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "action": {
                    "successHandling": [
                      {
                        "type": "validate",
                        "dataSource": "translation",
                        "errorText": "err_not_consistent_with_health_checkup_date"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider7"
          },
          {
            "type": "uwCheckbox",
            "key": "uw6-イ",
            "properties": {
              "name": "uw6-イ",
              "question": "以下の臓器や検査の異常を指摘されたことがありますか。（要再検査・要精密検査・要治療を含みます。なお、再検査等の結果で異常がなかった場合も含みます。）",
              "viewMore": "",
              "dataSource": "session",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "subQuestion": {
                "style": {
                  "padding": 0,
                  "listStyle": "none"
                },
                "list": [
                  {
                    "title": "",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■心臓　■肺　■胃腸　■肝臓　■腎臓　■すい臓　■胆のう　■子宮　■乳房　■診察　■血圧測定　■尿検査　■血液検査　■肝炎ウイルス検査　■便潜血検査　■眼底検査　■胸部レントゲン検査　■上部消化管レントゲン検査　■内視鏡検査　■細胞診　■組織診　■認知機能検査　■腹部超音波検査　■CT検査　■MRI検査　■PET検診　■しゅようマーカー（CEA・AFP・CA19-9・PSA等）</div>"
                  }
                ]
              },
              "visibilityCondition": [
                {
                  "dataSource": "session",
                  "uw6": "yes"
                }
              ],
              "validation": {
                "rules": [],
                "expected": [
                  {
                    "value": "yes",
                    "action": {
                      "rejectHandling": [
                        {
                          "type": "LeadMarketingModal",
                          "code": "ZHS-RA-U",
                          "message": "rejectApplication"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "uw6-ア",
                  "check": [
                    "yes"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider8",
            "properties": {
              "visibilityCondition": [
                {
                  "dataSource": "session",
                  "uw6": "yes"
                }
              ]
            }
          },
          {
            "type": "uwCheckbox",
            "key": "uw7",
            "properties": {
              "name": "uw7",
              "question": "聴力・言語・そしゃく機能に障害がありますか。また、矯正しても左右いずれかの視力が0.3以下ですか。手・足・指について欠損または機能に障害がありますか。また、背骨（脊柱）に変形や障害がありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "validation": {
                "rules": [],
                "expected": [
                  {
                    "value": "yes",
                    "action": {
                      "rejectHandling": [
                        {
                          "type": "LeadMarketingModal",
                          "code": "ZHS-RA-U",
                          "message": "rejectApplication"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider9"
          },
          {
            "type": "uwCheckbox",
            "key": "uw8",
            "properties": {
              "name": "uw8",
              "question": "過去5年以内に、以下の病気またはその疑いで医師の診察・検査・治療・投薬（薬の処方を含みます）をうけたことがありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "subQuestion": {
                "style": {
                  "padding": 0,
                  "listStyle": "none"
                },
                "list": [
                  {
                    "title": "",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■椎間板ヘルニア　■変形性関節症　■不妊症　■腎結石　■尿管結石　■子宮筋腫　■卵巣のう腫　■胃かいよう　■十二指腸かいよう</div>"
                  }
                ]
              },
              "visibilityCondition": [
                {
                  "gender": "male"
                }
              ],
              "validation": {
                "rules": [],
                "expected": [
                  {
                    "value": "yes",
                    "action": {
                      "rejectHandling": [
                        {
                          "type": "LeadMarketingModal",
                          "code": "ZHS-RA-U",
                          "message": "rejectApplication"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "gender",
                  "check": [
                    "male"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "uwCheckbox",
            "key": "uw8b",
            "properties": {
              "name": "uw8b",
              "question": "現在、妊娠していますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "visibilityCondition": [
                {
                  "gender": "female"
                }
              ],
              "validation": {
                "rules": [],
                "expected": []
              }
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "gender",
                  "check": [
                    "female"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider10"
          },
          {
            "type": "uwCheckbox",
            "key": "uw9",
            "properties": {
              "name": "uw9",
              "question": "過去5年以内に、以下の病気またはその疑いで医師の診察・検査・治療・投薬（薬の処方を含みます）をうけたことがありますか。",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no",
              "subQuestion": {
                "style": {
                  "padding": 0,
                  "listStyle": "none"
                },
                "list": [
                  {
                    "title": "",
                    "content": "<div style='background-color:#EDEFF0; padding: 5px 10px; border-radius: 5px;'>■椎間板ヘルニア　■変形性関節症　■不妊症　■腎結石　■尿管結石　■子宮筋腫　■卵巣のう腫　■胃かいよう　■十二指腸かいよう</div>"
                  }
                ]
              },
              "visibilityCondition": [
                {
                  "gender": "female"
                }
              ]
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "gender",
                  "check": [
                    "female"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider11",
            "properties": {
              "visibilityCondition": [
                {
                  "gender": "female"
                }
              ]
            }
          },
          {
            "type": "uwCheckbox",
            "key": "uw10",
            "properties": {
              "name": "uw10",
              "question": "過去1年以内に喫煙したことがありますか？",
              "viewMore": "",
              "yesLabel": "btn_yes",
              "noLabel": "btn_no",
              "accept": "no_yes"
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "divider",
            "key": "divider12"
          }
        ]
      }
    },
    {
      "type": "sectionContainer",
      "key": "sectionContainer2",
      "properties": {
        "isFullWidth": true,
        "visibilityCondition": [
          {
            "dataSource": "leadDataSession.quote.quoteDetails.premiumType",
            "value": "preferred"
          }
        ],
        "title": {
          "label": {
            "MYSELF": "enter_health_checkup"
          },
          "editButtonVisible": false,
          "editAction": {}
        },
        "icon": "personOrangeSvg",
        "hasBorder": false,
        "components": [
          {
            "type": "datePicker",
            "key": "health_checkup_date",
            "properties": {
              "name": "healthCheckDate",
              "label": "health_checkup_date",
              "visibilityCondition": [],
              "isFullWidth": true
            },
            "validation": {
              "depend": "unableToAnswerHeathCheck",
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "unableToAnswerHeathCheck",
                  "check": [
                    "no"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "input",
            "key": "medical_institution_doctor",
            "properties": {
              "name": "healthCheckBy",
              "label": "medical_institution_doctor",
              "visibilityCondition": [],
              "isFullWidth": true
            },
            "validation": {
              "depend": "unableToAnswerHeathCheck",
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                },
                {
                  "key": "maxLength",
                  "rule": 30,
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "unableToAnswerHeathCheck",
                  "check": [
                    "no"
                  ],
                  "then": {
                    "required": true,
                    "max": 30
                  }
                }
              ]
            }
          },
          {
            "type": "checkbox",
            "key": "unableToAnswerHeathCheck",
            "properties": {
              "name": "unableToAnswerHeathCheck",
              "defaultValue": "yes",
              "label": "unable_to_answer",
              "isFullWidth": true
            },
            "validation": {
              "rules": []
            }
          },
          {
            "type": "divider",
            "key": "divider12"
          }
        ]
      }
    },
    {
      "type": "sectionContainer",
      "key": "sectionContainer3",
      "properties": {
        "isFullWidth": true,
        "visibilityCondition": [
          {
            "dataSource": "leadDataSession.quote.quoteDetails.premiumType",
            "value": "preferred"
          }
        ],
        "title": {
          "label": {
            "MYSELF": "enter_blood_pressure"
          },
          "editButtonVisible": false,
          "editAction": {}
        },
        "icon": "personOrangeSvg",
        "hasBorder": false,
        "description": "※上記で入力した健康診断・人間ドックの結果を入力ください。<br>※複数回測定されている場合は、いずれか低い測定回の数値をご記入ください。",
        "components": [
          {
            "type": "input",
            "key": "input-high-blood",
            "properties": {
              "name": "highBloodPressure",
              "rule": "^[1-9][0-9]*$",
              "label": "high_blood_pressure",
              "suffix": {
                "text": "mmHg"
              },
              "visibilityCondition": [],
              "isFullWidth": true,
              "inputType": "tel"
            },
            "validation": {
              "depend": "unableToAnswerBloodPressure",
              "rules": [
                {
                  "key": "pattern",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "unableToAnswerBloodPressure",
                  "check": [
                    "no"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "input",
            "key": "input-low-blood",
            "properties": {
              "name": "lowBloodPressure",
              "rule": "^[1-9][0-9]*$",
              "label": "low_blood_pressure",
              "suffix": {
                "text": "mmHg"
              },
              "visibilityCondition": [],
              "isFullWidth": true,
              "inputType": "tel"
            },
            "validation": {
              "depend": "unableToAnswerBloodPressure",
              "rules": [
                {
                  "key": "pattern",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "unableToAnswerBloodPressure",
                  "check": [
                    "no"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "checkbox",
            "key": "unableToAnswerBloodPressure",
            "properties": {
              "name": "unableToAnswerBloodPressure",
              "defaultValue": "yes",
              "label": "unable_to_answer",
              "isFullWidth": true
            },
            "validation": {
              "rules": []
            }
          },
          {
            "type": "divider",
            "key": "divider13"
          }
        ]
      }
    },
    {
      "type": "sectionContainer",
      "key": "sectionContainer4",
      "properties": {
        "isFullWidth": true,
        "visibilityCondition": [
          {
            "dataSource": "leadDataSession.quote.quoteDetails.premiumType",
            "value": "preferred"
          }
        ],
        "title": {
          "label": {
            "MYSELF": "enter_liver_function"
          },
          "editButtonVisible": false,
          "editAction": {}
        },
        "icon": "personOrangeSvg",
        "hasBorder": false,
        "description": "enter_liver_function_note",
        "components": [
          {
            "type": "input",
            "key": "input-liver-function",
            "properties": {
              "name": "liverFunction",
              "rule": "^[1-9][0-9]*$",
              "label": "liver_function",
              "suffix": {
                "text": "IU/L"
              },
              "visibilityCondition": [],
              "isFullWidth": true,
              "inputType": "tel"
            },
            "validation": {
              "depend": "unableToAnswerLiveFunction",
              "rules": [
                {
                  "key": "pattern",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ],
              "when": [
                {
                  "key": "unableToAnswerLiveFunction",
                  "check": [
                    "no"
                  ],
                  "then": {
                    "required": true
                  }
                }
              ]
            }
          },
          {
            "type": "checkbox",
            "key": "unableToAnswerLiveFunction",
            "properties": {
              "name": "unableToAnswerLiveFunction",
              "defaultValue": "yes",
              "label": "unable_to_answer",
              "isFullWidth": true
            },
            "validation": {
              "rules": []
            }
          },
          {
            "type": "divider",
            "key": "divider14"
          }
        ]
      }
    },
    {
      "type": "sectionContainer",
      "key": "sectionContainer5",
      "properties": {
        "isFullWidth": true,
        "title": {
          "label": {
            "MYSELF": "height_weight_title"
          },
          "editButtonVisible": false,
          "editAction": {}
        },
        "icon": "appleSvg",
        "hasBorder": false,
        "components": [
          {
            "type": "input",
            "key": "input-height",
            "dataType": "number",
            "properties": {
              "name": "height",
              "label": "height",
              "suffix": {
                "text": "cm"
              },
              "visibilityCondition": [],
              "isFullWidth": true,
              "inputType": "tel"
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                },
                {
                  "key": "matches",
                  "rule": "(^[5-9]{1}[0-9]{1}$)|((^[1-2]{1}[0-9]{2}$)|(^[1-2]{1}[1-4]{1}[0-9]{1}$)|(^300$))",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "please_enter_valid_height"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "input",
            "key": "input-weight",
            "properties": {
              "name": "weight",
              "label": "weight",
              "suffix": {
                "text": "kg"
              },
              "visibilityCondition": [],
              "isFullWidth": true,
              "inputType": "tel"
            },
            "validation": {
              "rules": [
                {
                  "key": "required",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                },
                {
                  "key": "matches",
                  "rule": "(^[2-9]{1}[0-9]{1}$)|(^[1-2]{1}[0-9]{2})$",
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                },
                {
                  "key": "maxValue",
                  "rule": 250,
                  "action": {
                    "rejectHandling": [
                      {
                        "type": "validate",
                        "errorText": "mandatory_field_error"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "submit",
      "key": "submit-uw",
      "properties": {
        "label": "btn_submit_uw"
      },
      "tasks": [
        {
          "type": "async",
          "queues": [
            {
              "properties": {
                "name": "updateLead"
              },
              "expected": [
                {
                  "field": "isPassed",
                  "value": "yes",
                  "action": {
                    "successHandling": [
                      {
                        "type": "nextStep"
                      }
                    ],
                    "rejectHandling": [
                      {
                        "checkField": "code",
                        "checkValue": "BAD_USER_INPUT",
                        "type": "LeadMarketingModal",
                        "value": "ZHS-RA-U",
                        "message": "rejectApplication"
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ],
      "successHandling": [
        {
          "checkField": "",
          "checkValue": "",
          "type": "nextStep",
          "value": "",
          "message": ""
        }
      ]
    }
  ],
  "payload": [
    "uw1",
    "uw2"
  ]
}`;

const comps = [];

function generateCompVali(component) {
  if (Array.isArray(component)) {
    component.forEach(comp => generateCompVali(comp));
  } else {
    if (component.validation) {
      comps.push(component);
    } else {
      if (component.properties?.components) {
        if (component.properties.components.length !== 0) {
          generateCompVali(component.properties.components);
        } else return;
      } else if (component.components) {
        if (component.components.length !== 0) {
          generateCompVali(component.components);
        } else return;
      } else return;
    }
  }
}

const mySchema = {
  title: 'Form',
  type: 'object',
  properties: {},
};

generateCompVali(JSON.parse(jsonString).components);
comps.forEach(comp => {
  mySchema[comp.properties.name] = {};
  mySchema[comp.properties.name] = {
    type: comp.type === 'input' ? 'string' : 'boolean',
  };
  comp.validation.rules.forEach(rule => {
    if (rule.key === 'required') mySchema[comp.properties.name].required = true;
    else if (rule.key === 'maxLength')
      mySchema[comp.properties.name].maxLength = Number(rule.rule);
    else if (rule.key === 'pattern')
      mySchema[comp.properties.name].regex = comp.properties.rule;
  });
});

console.log(mySchema);

mongoose
  .connect(MONGO_URL)
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
