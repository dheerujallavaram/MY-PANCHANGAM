import React, { useState, useEffect } from 'react';
import { 
  Calendar, Sunrise, Sunset, Clock, ArrowLeft, ArrowRight, 
  CheckCircle, AlertTriangle, ShieldAlert, Star, Sparkles, 
  Moon, Info, Home, BookOpen, ChevronRight, User, Phone, Ban 
} from 'lucide-react';

const panchangamData = {
  "2026-10-21": {
    "teedi_varam": "21 అక్టోబర్ 2026, బుధవారం",
    "panchanga_vivaralu": {
      "samvatsaram": "శ్రీ పరాభవ నామ సంవత్సరం",
      "ayanam": "దక్షిణాయనం",
      "rutuvu": "శరదృతువు",
      "masam_paksham": "ఆశ్వయుజ మాసం, శుక్ల పక్షం",
      "tithi": "దశమి - సూర్యోదయం నుండి ఉదయం 10:19 AM వరకు (తదుపరి ఏకాదశి)",
      "nakshatram": "ధనిష్ఠ - సూర్యోదయం నుండి సాయంత్రం 05:21 PM వరకు (తదుపరి శతభిషం)",
      "yogam": "గండ యోగం",
      "karanam": "గరిజ కరణం"
    },
    "lagna_pramanalu": [
      { "lagnam": "తుల లగ్నం", "samayam": "ఉదయం 06:13 AM నుండి ఉదయం 08:11 AM వరకు" },
      { "lagnam": "వృశ్చిక లగ్నం", "samayam": "ఉదయం 08:11 AM నుండి ఉదయం 10:25 AM వరకు" },
      { "lagnam": "ధనుర్లగ్నం", "samayam": "ఉదయం 10:25 AM నుండి మధ్యాహ్నం 12:32 PM వరకు" },
      { "lagnam": "మకర లగ్నం", "samayam": "మధ్యాహ్నం 12:32 PM నుండి మధ్యాహ్నం 02:23 PM వరకు" },
      { "lagnam": "కుంభ లగ్నం", "samayam": "మధ్యాహ్నం 02:23 PM నుండి సాయంత్రం 04:01 PM వరకు" },
      { "lagnam": "మీన లగ్నం", "samayam": "సాయంత్రం 04:01 PM నుండి సాయంత్రం 05:36 PM వరకు" },
      { "lagnam": "మేష లగ్నం", "samayam": "సాయంత్రం 05:36 PM నుండి రాత్రి 07:20 PM వరకు" },
      { "lagnam": "వృషభ లగ్నం", "samayam": "రాత్రి 07:20 PM నుండి రాత్రి 09:20 PM వరకు" },
      { "lagnam": "మిథున లగ్నం", "samayam": "రాత్రి 09:20 PM నుండి రాత్రి 11:32 PM వరకు" },
      { "lagnam": "కర్కాటక లగ్నం", "samayam": "రాత్రి 11:32 PM నుండి అర్ధరాత్రి 01:45 AM వరకు" },
      { "lagnam": "సింహ లగ్నం", "samayam": "అర్ధరాత్రి 01:45 AM నుండి తెల్లవారుజామున 03:52 AM వరకు" },
      { "lagnam": "కన్యా లగ్నం", "samayam": "తెల్లవారుజామున 03:52 AM నుండి ఉదయం 05:57 AM వరకు" }
    ],
    "graha_sthiti": {
      "mesham": "", "vrushabham": "", "mithunam": "",
      "karkatakam": "కుజుడు", "simham": "గురుడు, కేతువు", "kanya": "శుక్రుడు",
      "tula": "సూర్యుడు, బుధుడు", "vruschikam": "", "dhanussu": "",
      "makaram": "", "kumbham": "చంద్రుడు, రాహువు", "meenam": "శని"
    },
    "shubha_samayalu": {
      "amrutha_ghadiyalu": "ఈ రోజు అమృత ఘడియలు లేవు",
      "abhijit_muhurtham": "బుధవారం కావున అభిజిత్ ముహూర్తం లేదు"
    },
    "ashubha_samayalu": {
      "rahukalam": "మధ్యాహ్నం 12:00 PM నుండి మధ్యాహ్నం 01:27 PM వరకు",
      "yamagandam": "ఉదయం 07:40 AM నుండి ఉదయం 09:07 AM వరకు",
      "durmuhurtham": "ఉదయం 11:37 AM నుండి మధ్యాహ్నం 12:23 PM వరకు",
      "varjyam": "అర్ధరాత్రి 12:55 AM నుండి రాత్రి 02:36 AM వరకు"
    },
    "chandra_navatara_balam": {
      "chandra_sancharam": "ఈ రోజు చంద్రుడు కుంభ రాశిలో సంచరిస్తున్నాడు. కావున మేష, వృషభ, సింహ, కన్యా, ధనుస్సు, కుంభ రాశుల వారికి చంద్రబలం అత్యంత అనుకూలంగా ఉండి శుభ ఫలితాలు కలుగుతాయి.",
      "chandrashtamam": "కర్కాటక రాశి వారికి ఈ రోజు చంద్రాష్టమం. కావున ఈ రాశి వారు ప్రయాణాలు, నూతన కార్యాలు మరియు కీలక నిర్ణయాలు వాయిదా వేసుకోవడం శుభప్రదం.",
      "navatara_balam": "ఈ రోజు ధనిష్ఠ నక్షత్రం కావున శతభిషం, ఆరుద్ర, స్వాతి (సంపత్తార), ఉత్తరాభాద్ర, పుష్యమి, అనురాధ (క్షేమతార), అశ్విని, మఖ, మూల (సాధక తార), కృత్తిక, ఉత్తర ఫల్గుణి, ఉత్తరాషాడ (మిత్ర తార), రోహిణి, హస్త, శ్రవణం (పరమ మిత్ర తార) నక్షత్రాల వారికి తారాబలం అనుకూలంగా ఉండి, చేపట్టిన పనులలో విజయం సిద్ధిస్తుంది."
    },
    "roju_pratyekata_pramanika_phalitham": "ఈ రోజు ఆశ్వయుజ శుక్ల దశమి మరియు ధనిష్ఠ నక్షత్రం. బుధవారం రోజున చర నక్షత్రమైన ధనిష్ఠ ఉండటం వలన నూతన వాహన కొనుగోళ్లు, ప్రయాణాలు, అకౌంటింగ్ మరియు వ్యాపార ఒప్పందాలకు ఇది చాలా అనుకూలమైన సమయం. విష్ణు సహస్రనామ పారాయణం మరియు బుధ గ్రహ ఆరాధన వలన వృత్తి వ్యాపారాలలో విశేషమైన లాభాలు కలుగుతాయి."
  },
  "2026-10-22": {
    "teedi_varam": "22 అక్టోబర్ 2026, గురువారం",
    "panchanga_vivaralu": {
      "samvatsaram": "శ్రీ పరాభవ నామ సంవత్సరం", "ayanam": "దక్షిణాయనం", "rutuvu": "శరదృతువు",
      "masam_paksham": "ఆశ్వయుజ మాసం, శుక్ల పక్షం",
      "tithi": "ఏకాదశి - సూర్యోదయం నుండి ఉదయం 11:08 AM వరకు (తదుపరి ద్వాదశి)",
      "nakshatram": "శతభిషం - సూర్యోదయం నుండి సాయంత్రం 06:36 PM వరకు (తదుపరి పూర్వాభాద్ర)",
      "yogam": "వృద్ధి యోగం", "karanam": "విష్టి కరణం"
    },
    "lagna_pramanalu": [
      { "lagnam": "తుల లగ్నం", "samayam": "ఉదయం 06:13 AM నుండి ఉదయం 08:07 AM వరకు" },
      { "lagnam": "వృశ్చిక లగ్నం", "samayam": "ఉదయం 08:07 AM నుండి ఉదయం 10:21 AM వరకు" },
      { "lagnam": "ధనుర్లగ్నం", "samayam": "ఉదయం 10:21 AM నుండి మధ్యాహ్నం 12:28 PM వరకు" },
      { "lagnam": "మకర లగ్నం", "samayam": "మధ్యాహ్నం 12:28 PM నుండి మధ్యాహ్నం 02:19 PM వరకు" },
      { "lagnam": "కుంభ లగ్నం", "samayam": "మధ్యాహ్నం 02:19 PM నుండి సాయంత్రం 03:57 PM వరకు" },
      { "lagnam": "మీన లగ్నం", "samayam": "సాయంత్రం 03:57 PM నుండి సాయంత్రం 05:32 PM వరకు" },
      { "lagnam": "మేష లగ్నం", "samayam": "సాయంత్రం 05:32 PM నుండి రాత్రి 07:16 PM వరకు" },
      { "lagnam": "వృషభ లగ్నం", "samayam": "రాత్రి 07:16 PM నుండి రాత్రి 09:16 PM వరకు" },
      { "lagnam": "మిథున లగ్నం", "samayam": "రాత్రి 09:16 PM నుండి రాత్రి 11:28 PM వరకు" },
      { "lagnam": "కర్కాటక లగ్నం", "samayam": "రాత్రి 11:28 PM నుండి అర్ధరాత్రి 01:41 AM వరకు" },
      { "lagnam": "సింహ లగ్నం", "samayam": "అర్ధరాత్రి 01:41 AM నుండి తెల్లవారుజామున 03:48 AM వరకు" },
      { "lagnam": "కన్యా లగ్నం", "samayam": "తెల్లవారుజామున 03:48 AM నుండి ఉదయం 05:53 AM వరకు" }
    ],
    "graha_sthiti": {
      "mesham": "", "vrushabham": "", "mithunam": "",
      "karkatakam": "కుజుడు", "simham": "గురుడు, కేతువు", "kanya": "శుక్రుడు",
      "tula": "సూర్యుడు, బుధుడు", "vruschikam": "", "dhanussu": "",
      "makaram": "", "kumbham": "చంద్రుడు, రాహువు", "meenam": "శని"
    },
    "shubha_samayalu": {
      "amrutha_ghadiyalu": "ఈ రోజు అమృత ఘడియలు లేవు",
      "abhijit_muhurtham": "ఉదయం 11:37 AM నుండి మధ్యాహ్నం 12:23 PM వరకు"
    },
    "ashubha_samayalu": {
      "rahukalam": "మధ్యాహ్నం 01:27 PM నుండి మధ్యాహ్నం 02:53 PM వరకు",
      "yamagandam": "ఉదయం 06:13 AM నుండి ఉదయం 07:40 AM వరకు",
      "durmuhurtham": "మధ్యాహ్నం 02:42 PM నుండి సాయంత్రం 04:14 PM వరకు",
      "varjyam": "అర్ధరాత్రి 01:12 AM నుండి రాత్రి 02:51 AM వరకు"
    },
    "chandra_navatara_balam": {
      "chandra_sancharam": "ఈ రోజు చంద్రుడు కుంభ రాశిలో సంచరిస్తున్నాడు.",
      "chandrashtamam": "కర్కాటక రాశి వారికి ఈ రోజు చంద్రాష్టమం.",
      "navatara_balam": "శతభిషం నక్షత్రం వారికి తారాబలం అనుకూలం."
    },
    "roju_pratyekata_pramanika_phalitham": "ఈ రోజు ఆశ్వయుజ శుక్ల ఏకాదశి. శ్రీ మహావిష్ణువు మరియు దత్తాత్రేయ ఆరాధన విశేషమైనది."
  },
  "2026-10-23": {
    "teedi_varam": "23 అక్టోబర్ 2026, శుక్రవారం",
    "panchanga_vivaralu": {
      "samvatsaram": "శ్రీ పరాభవ నామ సంవత్సరం", "ayanam": "దక్షిణాయనం", "rutuvu": "శరదృతువు",
      "masam_paksham": "ఆశ్వయుజ మాసం, శుక్ల పక్షం",
      "tithi": "ద్వాదశి - సూర్యోదయం నుండి ఉదయం 11:27 AM వరకు (తదుపరి త్రయోదశి)",
      "nakshatram": "పూర్వాభాద్ర - సూర్యోదయం నుండి రాత్రి 07:21 PM వరకు (తదుపరి ఉత్తరాభాద్ర)",
      "yogam": "ధృవ యోగం", "karanam": "బాలవ కరణం"
    },
    "lagna_pramanalu": [
      { "lagnam": "తుల లగ్నం", "samayam": "ఉదయం 06:13 AM నుండి ఉదయం 08:03 AM వరకు" },
      { "lagnam": "వృశ్చిక లగ్నం", "samayam": "ఉదయం 08:03 AM నుండి ఉదయం 10:17 AM వరకు" },
      { "lagnam": "ధనుర్లగ్నం", "samayam": "ఉదయం 10:17 AM నుండి మధ్యాహ్నం 12:24 PM వరకు" },
      { "lagnam": "మకర లగ్నం", "samayam": "మధ్యాహ్నం 12:24 PM నుండి మధ్యాహ్నం 02:15 PM వరకు" },
      { "lagnam": "కుంభ లగ్నం", "samayam": "మధ్యాహ్నం 02:15 PM నుండి సాయంత్రం 03:53 PM వరకు" },
      { "lagnam": "మీన లగ్నం", "samayam": "సాయంత్రం 03:53 PM నుండి సాయంత్రం 05:29 PM వరకు" },
      { "lagnam": "మేష లగ్నం", "samayam": "సాయంత్రం 05:29 PM నుండి రాత్రి 07:12 PM వరకు" },
      { "lagnam": "వృషభ లగ్నం", "samayam": "రాత్రి 07:12 PM నుండి రాత్రి 09:12 PM వరకు" },
      { "lagnam": "మిథున లగ్నం", "samayam": "రాత్రి 09:12 PM నుండి రాత్రి 11:24 PM వరకు" },
      { "lagnam": "కర్కాటక లగ్నం", "samayam": "రాత్రి 11:24 PM నుండి అర్ధరాత్రి 01:37 AM వరకు" },
      { "lagnam": "సింహ లగ్నం", "samayam": "అర్ధరాత్రి 01:37 AM నుండి తెల్లవారుజామున 03:44 AM వరకు" },
      { "lagnam": "కన్యా లగ్నం", "samayam": "తెల్లవారుజామున 03:44 AM నుండి ఉదయం 05:49 AM వరకు" }
    ],
    "graha_sthiti": {
      "mesham": "", "vrushabham": "", "mithunam": "",
      "karkatakam": "కుజుడు", "simham": "గురుడు, కేతువు", "kanya": "శుక్రుడు",
      "tula": "సూర్యుడు, బుధుడు", "vruschikam": "", "dhanussu": "",
      "makaram": "", "kumbham": "చంద్రుడు, రాహువు", "meenam": "శని"
    },
    "shubha_samayalu": {
      "amrutha_ghadiyalu": "ఈ రోజు అమృత ఘడియలు లేవు",
      "abhijit_muhurtham": "ఉదయం 11:37 AM నుండి మధ్యాహ్నం 12:23 PM వరకు"
    },
    "ashubha_samayalu": {
      "rahukalam": "ఉదయం 10:33 AM నుండి మధ్యాహ్నం 12:00 PM వరకు",
      "yamagandam": "మధ్యాహ్నం 02:53 PM నుండి సాయంత్రం 04:20 PM వరకు",
      "durmuhurtham": "ఉదయం 08:32 AM నుండి ఉదయం 09:18 AM వరకు మరియు మధ్యాహ్నం 12:23 PM నుండి మధ్యాహ్నం 01:09 PM వరకు",
      "varjyam": "ఈ రోజు వర్జ్యం లేదు"
    },
    "chandra_navatara_balam": {
      "chandra_sancharam": "ఈ రోజు చంద్రుడు కుంభ రాశి మరియు మీన రాశిలో సంచరిస్తున్నాడు.",
      "chandrashtamam": "సింహ రాశి వారికి ఈ రోజు చంద్రాష్టమం.",
      "navatara_balam": "పూర్వాభాద్ర నక్షత్రం వారికి తారాబలం అత్యంత శుభప్రదం."
    },
    "roju_pratyekata_pramanika_phalitham": "ఈ రోజు ఆశ్వయుజ శుక్ల ద్వాదశి మరియు పూర్వాభాద్ర నక్షత్రం. శుక్రవారం మరియు ద్వాదశి కలయిక వలన శ్రీ మహాలక్ష్మి పూజ శ్రేష్ఠమైనది."
  },
  "2026-12-07": {
    "teedi_varam": "7 డిసెంబర్ 2026, సోమవారం",
    "panchanga_vivaralu": {
      "samvatsaram": "శ్రీ పరాభవ నామ సంవత్సరం", "ayanam": "దక్షిణాయనం", "rutuvu": "హేమంత ఋతువు",
      "masam_paksham": "కార్తీక మాసం, కృష్ణ పక్షం",
      "tithi": "చతుర్దశి - సూర్యోదయం నుండి అర్ధరాత్రి 03:27 AM వరకు (తదుపరి అమావాస్య)",
      "nakshatram": "విశాఖ - సూర్యోదయం నుండి మధ్యాహ్నం 04:09 PM వరకు (తదుపరి అనురాధ)",
      "yogam": "అతిగండ యోగం", "karanam": "విష్టి కరణం"
    },
    "lagna_pramanalu": [
      { "lagnam": "వృశ్చిక లగ్నం", "samayam": "ఉదయం 06:37 AM నుండి ఉదయం 07:20 AM వరకు" },
      { "lagnam": "ధనుర్లగ్నం", "samayam": "ఉదయం 07:20 AM నుండి ఉదయం 09:27 AM వరకు" },
      { "lagnam": "మకర లగ్నం", "samayam": "ఉదయం 09:27 AM నుండి ఉదయం 11:18 AM వరకు" },
      { "lagnam": "కుంభ లగ్నం", "samayam": "ఉదయం 11:18 AM నుండి మధ్యాహ్నం 12:56 PM వరకు" },
      { "lagnam": "మీన లగ్నం", "samayam": "మధ్యాహ్నం 12:56 PM నుండి మధ్యాహ్నం 02:31 PM వరకు" },
      { "lagnam": "మేష లగ్నం", "samayam": "మధ్యాహ్నం 02:31 PM నుండి సాయంత్రం 04:15 PM వరకు" },
      { "lagnam": "వృషభ లగ్నం", "samayam": "సాయంత్రం 04:15 PM నుండి రాత్రి 06:15 PM వరకు" },
      { "lagnam": "మిథున లగ్నం", "samayam": "రాత్రి 06:15 PM నుండి రాత్రి 08:27 PM వరకు" },
      { "lagnam": "కర్కాటక లగ్నం", "samayam": "రాత్రి 08:27 PM నుండి రాత్రి 10:40 PM వరకు" },
      { "lagnam": "సింహ లగ్నం", "samayam": "రాత్రి 10:40 PM నుండి అర్ధరాత్రి 12:47 AM వరకు" },
      { "lagnam": "కన్యా లగ్నం", "samayam": "అర్ధరాత్రి 12:47 AM నుండి తెల్లవారుజామున 02:52 AM వరకు" },
      { "lagnam": "తుల లగ్నం", "samayam": "తెల్లవారుజామున 02:52 AM నుండి ఉదయం 05:02 AM వరకు" }
    ],
    "graha_sthiti": {
      "mesham": "", "vrushabham": "", "mithunam": "", "karkatakam": "",
      "simham": "కుజుడు, గురుడు, కేతువు", "kanya": "", "tula": "చంద్రుడు, శుక్రుడు",
      "vruschikam": "సూర్యుడు, బుధుడు", "dhanussu": "", "makaram": "",
      "kumbham": "రాహువు", "meenam": "శని"
    },
    "shubha_samayalu": {
      "amrutha_ghadiyalu": "ఈ రోజు అమృత ఘడియలు లేవు",
      "abhijit_muhurtham": "ఉదయం 11:45 AM నుండి మధ్యాహ్నం 12:29 PM వరకు"
    },
    "ashubha_samayalu": {
      "rahukalam": "ఉదయం 07:59 AM నుండి ఉదయం 09:22 AM వరకు",
      "yamagandam": "ఉదయం 10:44 AM నుండి మధ్యాహ్నం 12:07 PM వరకు",
      "durmuhurtham": "ఉదయం 11:45 AM నుండి మధ్యాహ్నం 12:29 PM వరకు మరియు మధ్యాహ్నం 02:40 PM నుండి మధ్యాహ్నం 03:24 PM వరకు",
      "varjyam": "రాత్రి 08:29 PM నుండి రాత్రి 10:13 PM వరకు"
    },
    "chandra_navatara_balam": {
      "chandra_sancharam": "చంద్రుడు తులా రాశిలో సంచరిస్తున్నాడు. కావున వృషభం, కర్కాటకం, కన్య, వృశ్చికం, మకరం, మీన రాశుల వారికి అనుకూలం.",
      "chandrashtamam": "మీన రాశి వారికి చంద్రాష్టమం. పనులు, ప్రయాణాలు వాయిదా వేసుకోవడం శుభప్రదం.",
      "navatara_balam": "విశాఖ నక్షత్రం వారికి అనుకూలం."
    },
    "roju_pratyekata_pramanika_phalitham": "ఈ రోజు కార్తీక మాసపు శివ చతుర్దశి. పరమ శివునికి మారేడు దళాలతో పూజ, రుద్రాభిషేకం చేయడం విశేష శుభకరం."
  },
  "2026-12-08": {
    "teedi_varam": "8 డిసెంబర్ 2026, మంగళవారం",
    "panchanga_vivaralu": {
      "samvatsaram": "శ్రీ పరాభవ నామ సంవత్సరం", "ayanam": "దక్షిణాయనం", "rutuvu": "హేమంత ఋతువు",
      "masam_paksham": "కార్తీక మాసం, కృష్ణ పక్షం",
      "tithi": "అమావాస్య - సూర్యోదయం నుండి తెల్లవారుజామున 05:04 AM వరకు (తదుపరి పాడ్యమి)",
      "nakshatram": "అనురాధ - సూర్యోదయం నుండి సాయంత్రం 06:06 PM వరకు (తదుపరి జ్యేష్ఠ)",
      "yogam": "సుకర్మణ యోగం", "karanam": "చతుష్పాద కరణం"
    },
    "lagna_pramanalu": [
      { "lagnam": "వృశ్చిక లగ్నం", "samayam": "ఉదయం 06:38 AM నుండి ఉదయం 07:16 AM వరకు" },
      { "lagnam": "ధనుర్లగ్నం", "samayam": "ఉదయం 07:16 AM నుండి ఉదయం 09:23 AM వరకు" },
      { "lagnam": "మకర లగ్నం", "samayam": "ఉదయం 09:23 AM నుండి ఉదయం 11:14 AM వరకు" },
      { "lagnam": "కుంభ లగ్నం", "samayam": "ఉదయం 11:14 AM నుండి మధ్యాహ్నం 12:52 PM వరకు" },
      { "lagnam": "మీన లగ్నం", "samayam": "మధ్యాహ్నం 12:52 PM నుండి మధ్యాహ్నం 02:28 PM వరకు" },
      { "lagnam": "మేష లగ్నం", "samayam": "మధ్యాహ్నం 02:28 PM నుండి సాయంత్రం 04:11 PM వరకు" },
      { "lagnam": "వృషభ లగ్నం", "samayam": "సాయంత్రం 04:11 PM నుండి రాత్రి 06:11 PM వరకు" },
      { "lagnam": "మిథున లగ్నం", "samayam": "రాత్రి 06:11 PM నుండి రాత్రి 08:23 PM వరకు" },
      { "lagnam": "కర్కాటక లగ్నం", "samayam": "రాత్రి 08:23 PM నుండి రాత్రి 10:36 PM వరకు" },
      { "lagnam": "సింహ లగ్నం", "samayam": "రాత్రి 10:36 PM నుండి అర్ధరాత్రి 12:43 AM వరకు" },
      { "lagnam": "కన్యా లగ్నం", "samayam": "అర్ధరాత్రి 12:43 AM నుండి తెల్లవారుజామున 02:48 AM వరకు" },
      { "lagnam": "తుల లగ్నం", "samayam": "తెల్లవారుజామున 02:48 AM నుండి ఉదయం 04:58 AM వరకు" }
    ],
    "graha_sthiti": {
      "mesham": "", "vrushabham": "", "mithunam": "", "karkatakam": "",
      "simham": "కుజుడు, గురుడు, కేతువు", "kanya": "", "tula": "శుక్రుడు",
      "vruschikam": "సూర్యుడు, చంద్రుడు, బుధుడు", "dhanussu": "", "makaram": "",
      "kumbham": "రాహువు", "meenam": "శని"
    },
    "shubha_samayalu": {
      "amrutha_ghadiyalu": "ఈ రోజు అమృత ఘడియలు లేవు",
      "abhijit_muhurtham": "ఉదయం 11:46 AM నుండి మధ్యాహ్నం 12:30 PM వరకు"
    },
    "ashubha_samayalu": {
      "rahukalam": "మధ్యాహ్నం 02:52 PM నుండి సాయంత్రం 04:14 PM వరకు",
      "yamagandam": "ఉదయం 09:22 AM నుండి ఉదయం 10:45 AM వరకు",
      "durmuhurtham": "ఉదయం 08:49 AM నుండి ఉదయం 09:33 AM వరకు మరియు మధ్యాహ్నం 01:57 PM నుండి మధ్యాహ్నం 02:41 PM వరకు",
      "varjyam": "అర్ధరాత్రి 12:14 AM నుండి రాత్రి 02:00 AM వరకు"
    },
    "chandra_navatara_balam": {
      "chandra_sancharam": "చంద్రుడు వృశ్చిక రాశిలో సంచరిస్తున్నాడు. కావున వృషభం, కర్కాటకం, కన్య, వృశ్చికం, మకరం, మీన రాశుల వారికి అనుకూలం.",
      "chandrashtamam": "మేష రాశి వారికి చంద్రాష్టమం. పనులు వాయిదా వేసుకోవడం శుభప్రదం.",
      "navatara_balam": "అనురాధ నక్షత్రం వారికి తారాబలం అనుకూలం."
    },
    "roju_pratyekata_pramanika_phalitham": "ఈ రోజు కార్తీక బహుళ అమావాస్య, పోలి స్వర్గం. ఈ పర్వదినాన నదీ స్నానం చేసి, దీప దానం లేదా వస్త్ర దానం చేయడం వలన పితృ దేవతల అనుగ్రహం కలుగుతుంది."
  }
};

const TimingRow = ({ icon, label, time }) => (
  <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-xl hover:bg-orange-100/50 transition-colors">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-semibold text-gray-700">{label}</span>
    </div>
    <span className="text-gray-900 font-medium text-right sm:text-left">{time}</span>
  </div>
);

const SouthIndianKundali = ({ planetsMap }) => {
  if (!planetsMap) return null;

  const rasiPositions = [
    { id: 'meenam', name: 'మీనం', gridArea: '1 / 1 / 2 / 2' },
    { id: 'mesham', name: 'మేషం', gridArea: '1 / 2 / 2 / 3' },
    { id: 'vrushabham', name: 'వృషభం', gridArea: '1 / 3 / 2 / 4' },
    { id: 'mithunam', name: 'మిథునం', gridArea: '1 / 4 / 2 / 5' },
    { id: 'kumbham', name: 'కుంభం', gridArea: '2 / 1 / 3 / 2' },
    { id: 'karkatakam', name: 'కర్కాటకం', gridArea: '2 / 4 / 3 / 5' },
    { id: 'makaram', name: 'మకరం', gridArea: '3 / 1 / 4 / 2' },
    { id: 'simham', name: 'సింహం', gridArea: '3 / 4 / 4 / 5' },
    { id: 'dhanussu', name: 'ధనుస్సు', gridArea: '4 / 1 / 5 / 2' },
    { id: 'vruschikam', name: 'వృశ్చికం', gridArea: '4 / 2 / 5 / 3' },
    { id: 'tula', name: 'తుల', gridArea: '4 / 3 / 5 / 4' },
    { id: 'kanya', name: 'కన్య', gridArea: '4 / 4 / 5 / 5' },
  ];

  return (
    <div className="w-full max-w-[320px] sm:max-w-[400px] mx-auto p-3 sm:p-5 bg-[#FFFBF5] rounded-[2rem] border border-orange-200 shadow-inner">
      <div className="w-full aspect-square grid grid-cols-4 grid-rows-4 gap-[2px] bg-orange-400 p-[2px] rounded-xl overflow-hidden shadow-sm">
        {rasiPositions.map((rasi) => {
          const planetsString = planetsMap[rasi.id] || "";
          const planetsList = planetsString.split(',').map(p => p.trim()).filter(Boolean);
          
          return (
            <div 
              key={rasi.id} 
              style={{ gridArea: rasi.gridArea }} 
              className="bg-white p-1 sm:p-2 flex flex-col justify-between hover:bg-orange-50 transition-colors"
            >
              <div className="text-[9px] sm:text-[11px] text-gray-500 font-bold text-right leading-none mb-1">{rasi.name}</div>
              <div className="flex-1 flex flex-col items-center justify-center gap-[2px] text-center overflow-hidden">
                {planetsList.map((planet, idx) => (
                  <span key={idx} className="text-[10px] sm:text-[12px] font-extrabold text-orange-900 leading-none">
                    {planet}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        
        <div style={{ gridArea: '2 / 2 / 4 / 4' }} className="bg-[#FFFBF5] flex items-center justify-center p-2 text-center shadow-inner relative">
            <div className="absolute inset-2 border-2 border-dashed border-orange-200 rounded-lg pointer-events-none"></div>
            <div>
              <h4 className="text-base sm:text-xl font-extrabold text-orange-800 drop-shadow-sm">రాశి చక్రం</h4>
              <p className="text-[10px] sm:text-sm text-orange-600 font-bold mt-1">గోచారం</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const WelcomePage = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center py-10 md:py-16">
        <div className="inline-flex items-center justify-center p-4 bg-orange-100 rounded-full mb-6 shadow-sm border border-orange-200">
          <Star className="w-10 h-10 text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-4 drop-shadow-sm tracking-tight leading-tight">
          శ్రీలక్ష్మి గణపతి జ్యోతిషాలయానికి <br className="md:hidden" /> స్వాగతం
        </h1>
        <p className="text-lg md:text-xl text-yellow-800 font-medium max-w-2xl mx-auto px-4">
          సనాతన ధర్మం మరియు వేద జ్యోతిష్య శాస్త్రం ఆధారంగా మీ జీవిత సమస్యలకు సరైన మరియు శాశ్వత పరిష్కారాలు ఇక్కడ లభించును.
        </p>
        
        <button 
          onClick={onNavigate}
          className="mt-8 group inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-orange-400 cursor-pointer"
        >
          <Calendar className="w-5 h-5 mr-2" />
          నేటి పంచాంగం చూడండి
          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border-t-4 border-orange-400 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-xl">
              <User className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">మా గురించి</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className="text-lg font-bold text-orange-900 border-b border-orange-100 pb-2">
               జల్లవరపు సాయి ధీరజ్ శర్మ
            </p>
            <p>
              ప్రముఖ వేద జ్యోతిష్య పండితులు. అనేక సంవత్సరాల అనుభవంతో, వేద జ్యోతిషం, వాస్తు శాస్త్రం, మరియు ముహూర్త నిర్ణయాలలో ఎంతో మందికి మార్గదర్శనం చేశారు.
            </p>
            <div className="pt-4 flex items-center text-orange-700 font-medium bg-orange-50 p-3 rounded-xl border border-orange-100">
              <Phone className="w-5 h-5 mr-3 text-orange-500" />
              <span>సంప్రదించండి: +91 99999 99999</span>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border-t-4 border-yellow-400 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Sparkles className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">మా సేవలు</h2>
          </div>
          
          <ul className="space-y-4">
            {[
              "జాతక చక్ర విశ్లేషణ (Horoscope Reading)",
              "వివాహ పొంతనలు (Marriage Compatibility)",
              "వాస్తు సలహాలు (Vastu Consultation)",
              "శుభ ముహూర్త నిర్ణయం (Auspicious Timings)",
              "దోష నివారణ పూజలు (Remedial Poojas)"
            ].map((service, idx) => (
              <li key={idx} className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border border-orange-50/50">
                <Star className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PanchangamView = () => {
  const datesAvailable = Object.keys(panchangamData).sort();
  const defaultDate = "2026-10-21";
  const [currentDate, setCurrentDate] = useState(defaultDate);
  const dayData = panchangamData[currentDate];

  const handlePrevDay = () => {
    const currentIndex = datesAvailable.indexOf(currentDate);
    if (currentIndex > 0) {
      setCurrentDate(datesAvailable[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextDay = () => {
    const currentIndex = datesAvailable.indexOf(currentDate);
    if (currentIndex < datesAvailable.length - 1) {
      setCurrentDate(datesAvailable[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!dayData) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-[60vh]">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border-t-4 border-orange-500">
          <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-orange-900 mb-2">డేటా అందుబాటులో లేదు</h2>
          <button onClick={() => setCurrentDate("2026-10-21")} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold cursor-pointer">
            మొదటి రోజుకి వెళ్లండి
          </button>
        </div>
      </div>
    );
  }

  const { panchanga_vivaralu, shubha_samayalu, ashubha_samayalu, lagna_pramanalu, chandra_navatara_balam, roju_pratyekata_pramanika_phalitham, graha_sthiti } = dayData;
  const isFirstDay = datesAvailable.indexOf(currentDate) === 0;
  const isLastDay = datesAvailable.indexOf(currentDate) === datesAvailable.length - 1;

  return (
    <div className="max-w-4xl mx-auto relative z-10 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Traditional Newspaper Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-4 tracking-tight">
          నిత్య పంచాంగం
        </h1>
        
        <div className="border-y-[6px] border-double border-orange-400 py-6 px-4 bg-gradient-to-r from-orange-50 via-white to-orange-50 shadow-md rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-4">
            {panchanga_vivaralu.samvatsaram}
          </h2>
          
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-4 text-orange-900 font-bold text-lg md:text-xl mb-4">
            {panchanga_vivaralu.ayanam && <span>{panchanga_vivaralu.ayanam}</span>}
            {panchanga_vivaralu.ayanam && <span className="text-orange-400 hidden md:inline">♦</span>}
            {panchanga_vivaralu.rutuvu && <span>{panchanga_vivaralu.rutuvu}</span>}
            {panchanga_vivaralu.rutuvu && <span className="text-orange-400 hidden md:inline">♦</span>}
            <span>{panchanga_vivaralu.masam_paksham}</span>
          </div>

          <div className="inline-flex items-center justify-center bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md border-2 border-orange-200">
            <Calendar className="w-5 h-5 mr-2" />
            {dayData.teedi_varam}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-xl border-t-8 border-orange-500 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 shadow-sm">
              <div className="flex items-center space-x-2 text-orange-700 mb-3">
                <Moon className="w-6 h-6" />
                <h3 className="font-bold text-lg">తిథి</h3>
              </div>
              <p className="text-lg text-gray-800 font-medium leading-relaxed">{panchanga_vivaralu.tithi}</p>
            </div>
            
            <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 shadow-sm">
              <div className="flex items-center space-x-2 text-orange-700 mb-3">
                <Star className="w-6 h-6" />
                <h3 className="font-bold text-lg">నక్షత్రం</h3>
              </div>
              <p className="text-lg text-gray-800 font-medium leading-relaxed">{panchanga_vivaralu.nakshatram}</p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-2">
               <div className="bg-orange-50/50 p-4 rounded-xl text-center border border-orange-100/50">
                 <span className="text-sm text-orange-600 font-bold block mb-1">యోగం</span>
                 <span className="text-gray-900 font-bold text-lg">{panchanga_vivaralu.yogam}</span>
               </div>
               <div className="bg-orange-50/50 p-4 rounded-xl text-center border border-orange-100/50">
                 <span className="text-sm text-orange-600 font-bold block mb-1">కరణం</span>
                 <span className="text-gray-900 font-bold text-lg">{panchanga_vivaralu.karanam}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/90 rounded-[2rem] shadow-lg border-t-4 border-green-500 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              శుభ సమయాలు
            </h3>
            <div className="space-y-4">
              <TimingRow icon={<Clock className="w-5 h-5 text-green-600" />} label="అమృత ఘడియలు" time={shubha_samayalu.amrutha_ghadiyalu} />
              <TimingRow icon={<Sunrise className="w-5 h-5 text-yellow-500" />} label="అభిజిత్ ముహూర్తం" time={shubha_samayalu.abhijit_muhurtham} />
            </div>
          </div>

          <div className="bg-white/90 rounded-[2rem] shadow-lg border-t-4 border-red-500 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
              <ShieldAlert className="w-6 h-6 text-red-500 mr-2" />
              అశుభ సమయాలు
            </h3>
            <div className="space-y-4">
              <TimingRow icon={<Clock className="w-5 h-5 text-red-500" />} label="రాహుకాలం" time={ashubha_samayalu.rahukalam} />
              <TimingRow icon={<AlertTriangle className="w-5 h-5 text-orange-500" />} label="యమగండం" time={ashubha_samayalu.yamagandam} />
              <TimingRow icon={<Clock className="w-5 h-5 text-yellow-600" />} label="దుర్ముహూర్తం" time={ashubha_samayalu.durmuhurtham} />
              <TimingRow icon={<AlertTriangle className="w-5 h-5 text-rose-500" />} label="వర్జ్యం" time={ashubha_samayalu.varjyam} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2rem] shadow-lg border border-indigo-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-indigo-900 flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-indigo-500 mr-2" />
              చంద్ర / తారా బలం మరియు విశేషాలు
            </h3>
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
              <p><strong className="text-indigo-800">చంద్ర సంచారం:</strong> {chandra_navatara_balam.chandra_sancharam}</p>
              <p><strong className="text-rose-700">చంద్రాష్టమం:</strong> {chandra_navatara_balam.chandrashtamam}</p>
              <p><strong className="text-indigo-800">నవతార బలం:</strong> {chandra_navatara_balam.navatara_balam}</p>
              <div className="bg-white/70 p-5 rounded-2xl border border-indigo-100/50 mt-6 shadow-sm">
                <p className="font-medium leading-relaxed"><strong className="text-purple-800">ఈ రోజు విశేషం:</strong> {roju_pratyekata_pramanika_phalitham}</p>
              </div>
            </div>
        </div>

        {graha_sthiti && (
          <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-lg border-t-4 border-yellow-500 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center mb-8">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
              గ్రహ స్థితులు (రాశి చక్రం)
            </h3>
            <SouthIndianKundali planetsMap={graha_sthiti} />
          </div>
        )}

        <div className="bg-white/95 rounded-[2rem] shadow-lg border-t-4 border-blue-400 p-6 md:p-8">
           <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
              <Info className="w-6 h-6 text-blue-500 mr-2" />
              లగ్న ప్రమాణాలు
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             {lagna_pramanalu.map((lagna, idx) => (
               <div key={idx} className="bg-blue-50/30 border border-blue-100 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                 <h4 className="text-sm font-bold text-blue-800 mb-2">{lagna.lagnam}</h4>
                 <p className="text-sm text-gray-700 font-medium">{lagna.samayam}</p>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <a 
          href={`https://wa.me/?text=${encodeURIComponent(`నేటి పంచాంగంతో పాటు మీ గ్రహస్థితి కూడా తెలుసుకోండి.\nతేదీ: ${dayData.teedi_varam}\nవెబ్సైటు: https://purohitham.co`)}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-green-200/50 transition-all hover:scale-105 active:scale-95 border-2 border-green-500/20 cursor-pointer"
        >
          <svg className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span>వాట్సాప్‌లో షేర్ చేయండి (Share)</span>
        </a>
      </div>

      <div className="flex justify-between items-center mt-12 bg-white p-4 rounded-3xl shadow-sm border border-orange-100">
        <button 
          onClick={handlePrevDay} 
          disabled={isFirstDay}
          className={`group flex items-center space-x-2 px-5 py-3 rounded-full transition-all ${isFirstDay ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-orange-700 bg-orange-50 hover:bg-orange-100 hover:text-orange-900 cursor-pointer shadow-sm'}`}
        >
          <ArrowLeft className={`w-5 h-5 ${!isFirstDay && 'group-hover:-translate-x-1'} transition-transform`} />
          <span className="font-semibold">మునుపటి రోజు</span>
        </button>
        
        <button 
          onClick={handleNextDay} 
          disabled={isLastDay}
          className={`group flex items-center space-x-2 px-5 py-3 rounded-full transition-all ${isLastDay ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-orange-700 bg-orange-50 hover:bg-orange-100 hover:text-orange-900 cursor-pointer shadow-sm'}`}
        >
          <span className="font-semibold">తర్వాతి రోజు</span>
          <ArrowRight className={`w-5 h-5 ${!isLastDay && 'group-hover:translate-x-1'} transition-transform`} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('welcome');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-[#FFFBF5] to-amber-100 font-sans selection:bg-orange-200 relative overflow-x-hidden flex flex-col">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none z-0"></div>
      <div className="fixed top-[40%] right-[-10%] w-[400px] h-[400px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none z-0"></div>
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => setCurrentView('welcome')}
          >
            <div className="bg-orange-100 p-2 rounded-xl group-hover:bg-orange-200 transition-colors shadow-sm">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
            <span className="font-extrabold text-orange-900 text-lg sm:text-xl tracking-wide">శ్రీలక్ష్మి గణపతి</span>
          </div>
          
          <div className="flex space-x-2 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/50">
            <button 
              onClick={() => setCurrentView('welcome')}
              className={`px-4 py-2 rounded-full font-bold transition-all text-sm sm:text-base flex items-center space-x-2 cursor-pointer ${currentView === 'welcome' ? 'bg-white text-orange-700 shadow-md ring-1 ring-orange-200' : 'text-gray-600 hover:text-orange-700 hover:bg-white/50'}`}
            >
              <Home className="w-4 h-4" />
              <span>ముఖచిత్రం</span>
            </button>
            <button 
              onClick={() => setCurrentView('panchangam')}
              className={`px-4 py-2 rounded-full font-bold transition-all text-sm sm:text-base flex items-center space-x-2 cursor-pointer ${currentView === 'panchangam' ? 'bg-white text-orange-700 shadow-md ring-1 ring-orange-200' : 'text-gray-600 hover:text-orange-700 hover:bg-white/50'}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>పంచాంగం</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-8 px-4 flex-grow">
        {currentView === 'welcome' ? (
          <WelcomePage onNavigate={() => setCurrentView('panchangam')} />
        ) : (
          <PanchangamView />
        )}
      </main>
      
      <footer className="relative z-10 text-center py-6 border-t border-orange-100/50 bg-white/30 backdrop-blur-sm mt-auto">
        <p className="text-sm text-gray-500 font-bold mb-1">
           సర్వేజనా సుఖినోభవంతు
        </p>
        <p className="text-xs text-orange-600 font-medium">
           సమర్పణ: జల్లవరపు సాయి ధీరజ్ శర్మ 
        </p>
      </footer>
    </div>
  );
}