export type SupportedLanguage = 'en' | 'hi' | 'ko' | 'zh' | 'sa';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speechCode: 'en-US' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', speechCode: 'ko-KR' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', speechCode: 'zh-CN' },
  sa: { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🕉️', speechCode: 'hi-IN' }, // Fallback to Indian phonetic voice
};

export interface LocalizedInstruction {
  title: string;
  subtitle: string;
  steps: Array<{ stepNumber: number; title: string; description: string }>;
  audioScript: string;
  voiceGuideButton: string;
  stopVoiceButton: string;
  tipsTitle: string;
  tips: string[];
}

export const MULTILINGUAL_GUIDES: Record<SupportedLanguage, LocalizedInstruction> = {
  en: {
    title: 'NEXUS AI — Master Studio Guidance',
    subtitle: 'Autonomous software engineering powered by 10 specialized AI agents.',
    voiceGuideButton: 'Listen to Voice Instructions',
    stopVoiceButton: 'Stop Voice Narration',
    steps: [
      {
        stepNumber: 1,
        title: 'Formulate Your Vision',
        description: 'Type any idea into the central prompt composer — from Subway Surfers 3D games to Uber/Rapido mobility aggregators and WhatsApp Web clones.',
      },
      {
        stepNumber: 2,
        title: 'Autonomous Multi-Agent DAG',
        description: 'Watch the 10 specialized agent roles orchestrate: Product Planner architects specifications, Designer compiles tokens, Database Engineer creates Supabase PostgreSQL schemas, and Frontend/Backend developers build working code.',
      },
      {
        stepNumber: 3,
        title: 'Live Interactive Preview & Gaming',
        description: 'Interact with your live application inside the sandbox. Play games directly with arrow keys, book simulated rides, test audio/video players, or inspect UI components.',
      },
      {
        stepNumber: 4,
        title: 'Monaco Editor & VFS Code Tweaks',
        description: 'Switch seamlessly to Code or Split view to review synthesized TypeScript & React 19 source code, edit live files, or create checkpoints.',
      },
      {
        stepNumber: 5,
        title: 'One-Click Production Export & Deployment',
        description: 'Download full project ZIP archives or deploy your verified application to Vercel and Render cloud infrastructure.',
      },
    ],
    audioScript:
      'Welcome to NEXUS AI Studio. I am your autonomous AI guide. To create an application, simply describe your vision in the prompt composer below. You can build playable 3D games like Subway Surfers, multi-modal transit systems like Uber, Rapido, and Ola, or WhatsApp Web with live video calling. The 10 specialized agents will plan, design, write code, sync Supabase database tables, and run synthetic tests. You can interact with the live preview, edit code in Monaco, and export production ZIP bundles anytime.',
    tipsTitle: 'Pro Developer Tips',
    tips: [
      'Press Command+Enter or Ctrl+Enter to quickly dispatch your prompt.',
      'Use the Viewport toggles (Desktop, Tablet, Mobile) to inspect responsive layouts.',
      'Click "Inspect" to click on any element inside the preview and live-edit styles.',
      'Use the .env Vars modal to configure Supabase and API credentials safely.',
    ],
  },
  hi: {
    title: 'नेक्सस एआई — मास्टर स्टूडियो मार्गदर्शन',
    subtitle: '10 स्वायत्त एआई एजेंटों द्वारा संचालित आधुनिक सॉफ्टवेयर निर्माण मंच।',
    voiceGuideButton: 'आवाज़ में निर्देश सुनें',
    stopVoiceButton: 'आवाज़ बंद करें',
    steps: [
      {
        stepNumber: 1,
        title: 'अपने विचार का वर्णन करें',
        description: 'प्रॉम्प्ट बॉक्स में कोई भी विचार लिखें — जैसे कि सबवे सर्फर्स 3डी गेम, उबर/रैपिडो राइड-हेलिंग प्लेटफॉर्म, या व्हाट्सऐप वेब चैट।',
      },
      {
        stepNumber: 2,
        title: 'स्वायत्त मल्टी-एजेंट आर्केस्ट्रेशन',
        description: '10 विशेषज्ञ एजेंट मिलकर काम करते हैं: योजनाकार रूपरेखा तैयार करता है, डेटाबेस इंजीनियर सुपाबेस स्कीमा बनाता है, और डेवलपर्स कोड लिखते हैं।',
      },
      {
        stepNumber: 3,
        title: 'लाइव इंटरैक्टिव पूर्वावलोकन और गेमप्ले',
        description: 'सैंडबॉक्स में अपनी वेबसाइट चलाएं। तीर कुंजियों के साथ गेम खेलें, सवारी बुक करें, या वीडियो चलाएं।',
      },
      {
        stepNumber: 4,
        title: 'मोनाको कोड संपादक और संपादन',
        description: 'रिएक्ट 19 और टाइपस्क्रिप्ट कोड की समीक्षा करने या सीधे संपादन करने के लिए कोड या स्प्लिट मोड पर जाएं।',
      },
      {
        stepNumber: 5,
        title: 'एक-क्लिक ज़िप निर्यात और परिनियोजन',
        description: 'पूर्ण प्रोजेक्ट ज़िप डाउनलोड करें या सीधे वर्सेल और रेंडर क्लाउड पर तैनात करें।',
      },
    ],
    audioScript:
      'नेक्सस एआई स्टूडियो में आपका स्वागत है। मैं आपका स्वायत्त एआई सहायक हूँ। कोई भी ऐप्लिकेशन बनाने के लिए नीचे प्रॉम्प्ट बॉक्स में अपना विचार लिखें। आप सबवे सर्फर्स गेम, उबर और रैपिडो कैब बुकिंग, या व्हाट्सऐप वेब जैसी ऐप्लिकेशन तुरंत बना सकते हैं। हमारे 10 विशेषज्ञ एजेंट योजना बनाएंगे, कोड लिखेंगे, और डेटाबेस कनेक्ट करेंगे। आप लाइव गेम खेल सकते हैं और पूरा कोड डाउनलोड कर सकते हैं।',
    tipsTitle: 'डेवलपर टिप्स',
    tips: [
      'प्रॉम्प्ट भेजने के लिए Ctrl+Enter दबाएं।',
      'डेस्कटॉप, टैबलेट और मोबाइल दृश्यों के बीच स्विच करें।',
      'तत्वों का रंग बदलने के लिए इंस्पेक्टर टूल का उपयोग करें।',
    ],
  },
  ko: {
    title: 'NEXUS AI — 마스터 스튜디오 가이드',
    subtitle: '10개의 특화된 자율 AI 에이전트가 주도하는 소프트웨어 개발 플랫폼.',
    voiceGuideButton: '음성 안내 듣기',
    stopVoiceButton: '음성 안내 중지',
    steps: [
      {
        stepNumber: 1,
        title: '아이디어 입력하기',
        description: '프롬프트 입력창에 원하는 앱을 자유롭게 작성하세요 — 서브웨이 서퍼 3D 게임, 우버/라피도 차량 호출, 왓츠앱 웹 클론 등.',
      },
      {
        stepNumber: 2,
        title: '자율 멀티 에이전트 워크플로우',
        description: '10개의 AI 에이전트가 요구사항 명세, UI/UX 토큰 생성, 수파베이스 데이터베이스 스키마 생성 및 React 19 코드를 자동 생성합니다.',
      },
      {
        stepNumber: 3,
        title: '실시간 인터랙티브 프리뷰 및 게임 플레이',
        description: '샌드박스 내부에서 방향키로 게임을 직접 플레이하거나 차량 호출, 영상 스트리밍을 실시간으로 테스트하세요.',
      },
      {
        stepNumber: 4,
        title: '모나코 코드 에디터 및 소스 제어',
        description: '코드 모드로 전환하여 TypeScript 소스 코드를 확인하고 직접 수정하거나 체크포인트를 저장하세요.',
      },
      {
        stepNumber: 5,
        title: '원클릭 ZIP 다운로드 및 배포',
        description: '완성된 프로젝트를 ZIP 파일로 다운로드하거나 Vercel로 즉시 배포할 수 있습니다.',
      },
    ],
    audioScript:
      '넥서스 에이아이 스튜디오에 오신 것을 환영합니다. 원하는 애플리케이션에 대한 설명을 프롬프트 창에 입력하기만 하면 10개의 특화된 인공지능 에이전트가 기획부터 디자인, 데이터베이스 연동 및 리액트 코드 구현까지 자동으로 완성합니다. 실시간 3D 러닝 게임이나 차량 호출 시스템 등 다양한 풀스택 앱을 즉시 실행하고 소스코드를 다운로드해보세요.',
    tipsTitle: '개발자 팁',
    tips: [
      'Ctrl + Enter로 빠르게 프롬프트를 실행할 수 있습니다.',
      '데스크톱, 태블릿, 모바일 뷰포트로 반응형 디자인을 검증하세요.',
      '인스펙터 도구로 프리뷰 화면의 스타일을 실시간으로 수정할 수 있습니다.',
    ],
  },
  zh: {
    title: 'NEXUS AI — 全能工作区指南',
    subtitle: '由10个自主AI智能体驱动的新一代全栈软件开发平台。',
    voiceGuideButton: '播放语音指导',
    stopVoiceButton: '停止语音播报',
    steps: [
      {
        stepNumber: 1,
        title: '输入您的创意愿景',
        description: '在中央提示词输入框中描述应用 — 无论是地铁跑酷3D游戏、网约车调度平台，还是微信网页版实时通讯。',
      },
      {
        stepNumber: 2,
        title: '自主多智能体全流程协同',
        description: '10个专业AI智能体自动规划架构、编写React 19组件、同步Supabase PostgreSQL数据库并执行安全测试。',
      },
      {
        stepNumber: 3,
        title: '实时交互预览与试玩',
        description: '在安全沙箱内直接用键盘方向键试玩跑酷游戏，操作网约车行程预估，测试视频音频播放。',
      },
      {
        stepNumber: 4,
        title: 'Monaco编辑器与代码同步',
        description: '随时切换到代码视图，查看由AI生成的干净TypeScript源码，直接在线编辑或保存快照。',
      },
      {
        stepNumber: 5,
        title: '一键导出ZIP与云端部署',
        description: '完整下载项目源码压缩包，或一键无缝部署到Vercel和Render云端服务器。',
      },
    ],
    audioScript:
      '欢迎使用 NEXUS AI 智能体开发工作区。在下方输入框中描述您的应用构想，10个专业AI智能体将协同完成产品规划、界面设计、数据库建表以及前端代码合成。无论是即开即玩的3D小游戏，还是全功能的网约车调度系统，都能即时生成并在浏览器中直接运行，支持随时导出全部源码。',
    tipsTitle: '效率技巧',
    tips: [
      '使用 Ctrl+Enter 快捷键快速发送指令。',
      '可在桌面、平板与移动端多种尺寸之间一键切换。',
      '利用检查器（Inspect）功能实时点击微调预览界面的样式与文字。',
    ],
  },
  sa: {
    title: 'नेक्सस् एआई — मुख्य स्टूडियो मार्गदर्शनम्',
    subtitle: 'दश स्वायत्त-कृत्रिमबुद्धि-एजेण्टैः सञ्चालितं आधुनिक-तन्त्रांश-निर्माण-मञ्चम्।',
    voiceGuideButton: 'संस्कृत-ध्वन्या निर्देशान् शृणोतु',
    stopVoiceButton: 'ध्वनिं स्थगयतु',
    steps: [
      {
        stepNumber: 1,
        title: 'स्वसङ्कल्पं वर्णयतु',
        description: 'प्रॉम्प्ट्-पेटिकायां स्वविचारं लिखतु — सब्वे-सर्फ़र्-क्रीडा, उबर्-यान-सेवा, अथवा संलाप-माध्यमम्।',
      },
      {
        stepNumber: 2,
        title: 'स्वायत्त-मल्टी-एजेण्ट्-सञ्चालनम्',
        description: 'दश कुशलाः एजेण्टाः कार्यं कुर्वन्ति: योजनाकारः, प्रारूपकारः, दत्तांशकोश-निर्माता च संहितारचनाकाराः।',
      },
      {
        stepNumber: 3,
        title: 'प्रत्यक्ष-क्रीडनं पूर्वावलोकनं च',
        description: 'सद्यः एव क्रीडतु, यानं निर्धारयतु, चलच्चित्रं पश्यतु च।',
      },
      {
        stepNumber: 4,
        title: 'मोनाको-संहिता-संशोधकम्',
        description: 'टाइपस्क्रिप्ट्-संहितां परिशीलयतु, परिवर्त्यतां च।',
      },
      {
        stepNumber: 5,
        title: 'एक-क्लिकेन सम्पुट-निर्यातम्',
        description: 'सम्पूर्ण-प्रकल्पस्य ZIP-सञ्चिकां डाउनलोड् करोतु क्लाउड्-मध्ये च स्थापयतु।',
      },
    ],
    audioScript:
      'नेक्सस् एआई स्टूडियो मध्ये भवतः स्वागतम् अस्ति। अत्र स्वकल्पनानुसारं तन्त्रांशं रचयितुं शक्नोति। सब्वे सर्फर् क्रीडा, उबर् यानप्रणाली, संवादपटलम् च दश स्वायत्त एजेण्टैः सद्यः निर्मान्ते। सद्यः संहितां डाउनलोड् कुर्वन्तु प्रत्यक्षं च क्रीडन्तु।',
    tipsTitle: 'विशेष-सूत्राणि',
    tips: [
      'शीघ्र-प्रेषणाय Ctrl+Enter कुञ्जीं नुदतु।',
      'दूरवाणी, फलक, सङ्गणक-दृश्येषु परीक्षणं कुर्वन्तु।',
      'निरीक्षक-साधनेन वर्णं परिवर्तयन्तु।',
    ],
  },
};
