import type { ChapterData } from '@/types'

export const chapter1: ChapterData = {
  id: 'chapter-1',
  name: '第一章：匿名来信',
  description: '一封来历不明的信件将你引向雾港，这座被浓雾笼罩的港口城市隐藏着不为人知的秘密。',
  startScene: 'ch1-s1',
  scenes: [
    {
      id: 'ch1-s1',
      locationId: 'harbor-dock',
      chapter: 'chapter-1',
      title: '雾中抵港',
      text: [
        '渡轮在浓雾中缓缓靠岸，汽笛声被水汽吞没得只剩下沉闷的余响。你踏上码头的木栈道，脚下传来腐朽木板吱呀的声响，海风中夹杂着鱼腥与机油的混合气味。雾港——这个名字直到此刻才变得名副其实，浓雾几乎将整座港口吞没，五步之外便只剩下模糊的轮廓。',
        '你摸了摸大衣口袋里那封信——一封没有署名、没有邮戳的信件，信上只有寥寥数语："雾港之下，沉睡着一个作家的秘密。他的笔从未停下，只是换了一种方式书写。"信纸泛黄，墨迹却很新，仿佛寄件人刚刚落笔便寄了出去。正是这封信将你从千里之外引到了这里。',
        '码头上几乎看不到人影，只有远处一个佝偻的身影坐在系船柱旁，烟斗中升起袅袅青烟，在雾气中盘旋不散。栈道尽头有一条狭窄的街道伸入雾中，两侧是灰暗的渔屋与商铺。你的雾港之旅，就从这里开始。'
      ],
      onEnter: [
        { type: 'addItem', target: 'anonymous-letter' },
        { type: 'addDiary', target: '抵达雾港码头，浓雾笼罩一切。那封匿名信把我引到了这里——一个作家的秘密正等着我去揭开。' },
        { type: 'advanceTime', target: 'afternoon' }
      ],
      choices: [
        {
          id: 'ch1-s1-c1',
          text: '走向那个抽烟斗的老人',
          nextScene: 'ch1-s4',
          effects: [
            { type: 'changeAffinity', target: 'zhao-henian', value: 1 },
            { type: 'addDiary', target: '在码头上遇到了一个抽烟斗的老人，他的眼神比雾更深。' }
          ]
        },
        {
          id: 'ch1-s1-c2',
          text: '沿着街道深入雾港',
          nextScene: 'ch1-s2',
          effects: [
            { type: 'addDiary', target: '离开码头，沿着街道走进了雾港的深处。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s2',
      locationId: 'fisherman-alley',
      chapter: 'chapter-1',
      title: '港城初探',
      text: [
        '雾港的街道狭窄而曲折，像是被某位醉汉随意铺就。晾晒的渔网从两侧窗台伸出，在风中飘荡如鬼魅的帷幔。空气中弥漫着咸湿的海风与某种难以名状的旧日气息——仿佛这座城市本身就在缓慢地腐烂。',
        '一扇褪色的木牌吸引了你的注意："旧墨书店——古籍与珍本"。书店的橱窗里陈列着泛黄的地图与皮面烫金的老书，灯光昏黄却温暖，在整条灰暗的街道上如同一座孤岛。另一个方向，一栋维多利亚风格的三层建筑矗立在街角，门廊上挂着"雾港旅馆"的铜牌，油漆斑驳却仍能辨认。',
        '你想起信中的话——"去旧墨书店，寻找第一把钥匙。"但在做决定之前，你注意到小巷深处有一道幽暗的岔路，潮湿的石板路上似乎有新鲜的脚印。'
      ],
      onEnter: [
        { type: 'addClue', target: 'anonymous-letter-content' },
        { type: 'addDiary', target: '漫步雾港街头，这里的一切都笼罩在灰蒙蒙的雾气中。旧墨书店的名字和信中的提示吻合。' }
      ],
      choices: [
        {
          id: 'ch1-s2-c1',
          text: '走进旧墨书店',
          nextScene: 'ch1-s3',
          effects: [
            { type: 'addDiary', target: '信中提到了旧墨书店——我应该先去那里看看。' }
          ]
        },
        {
          id: 'ch1-s2-c2',
          text: '去雾港旅馆打探消息',
          nextScene: 'ch1-s5',
          effects: [
            { type: 'addDiary', target: '旅馆也许是搜集情报的好去处。' }
          ]
        },
        {
          id: 'ch1-s2-c3',
          text: '沿小巷深处的脚印追踪',
          nextScene: 'ch1-s6',
          effects: [
            { type: 'addDiary', target: '雾气中的脚印引起了我的注意——有人在我之前来过这里。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s3',
      locationId: 'old-bookstore',
      chapter: 'chapter-1',
      title: '旧墨书香',
      text: [
        '推开书店的木门，铜铃发出清脆的响声。空气瞬间变得不同——陈旧纸张、皮革与墨水的混合气味扑面而来，如同打开了一本封存百年的书籍。木质书架从地板延伸至天花板，每层都塞满了各种尺寸的旧书，有些书脊上的烫金字迹已经模糊得无法辨认。',
        '柜台后站着一位三十出头的女子，正用细毛刷轻轻拂去一本古籍上的灰尘。她抬起头看了你一眼，目光温和却带着一丝审视——像是在辨别你属于哪一类读者。'
      ],
      dialogue: 'lxq-d1',
      choices: [
        {
          id: 'ch1-s3-c1',
          text: '继续与林雪晴交谈',
          nextScene: 'ch1-s7',
          effects: [
            { type: 'changeAffinity', target: 'lin-xueqing', value: 1 },
            { type: 'addDiary', target: '旧墨书店的林雪晴似乎知道很多关于陈守谦的事，她的每一句话都像在引导我走向某个方向。' }
          ]
        },
        {
          id: 'ch1-s3-c2',
          text: '在书架上寻找线索',
          nextScene: 'ch1-s7',
          effects: [
            { type: 'addItem', target: 'old-bookmark' },
            { type: 'addDiary', target: '书架之间似乎藏着什么——一枚旧书签，背面刻着奇怪的文字。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s4',
      locationId: 'harbor-dock',
      chapter: 'chapter-1',
      title: '码头老人',
      text: [
        '你走近那个佝偻的身影。老人坐在系船柱上，烟斗中的烟丝已经燃尽，但他似乎并未察觉。海风将他花白的头发吹得凌乱，脸上沟壑般的皱纹像是被大海雕刻而成。他浑浊的双眼望向远方的海面，目光穿透了浓雾，仿佛能看到别人看不到的东西。',
        '你的脚步声让他回过神来。他没有转头，只是用沙哑的嗓音说道："码头上很久没有陌生人来了。你是被什么引来的？风？潮水？还是……某封信？"'
      ],
      dialogue: 'zhn-d1',
      choices: [
        {
          id: 'ch1-s4-c1',
          text: '继续与赵鹤年交谈',
          nextScene: 'ch1-s7',
          effects: [
            { type: 'changeAffinity', target: 'zhao-henian', value: 1 },
            { type: 'addDiary', target: '赵鹤年提到了三年前的台风夜和灯塔上的闪光。这个码头的秘密比我想象的更深。' }
          ]
        },
        {
          id: 'ch1-s4-c2',
          text: '检查系船柱上的绳结',
          nextScene: 'ch1-s7',
          effects: [
            { type: 'addClue', target: 'dock-knot-mark' },
            { type: 'addDiary', target: '系船柱上的绳结并非寻常打法，而是一种古老的记事方式——有人在码头上留下了消息。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s5',
      locationId: 'fog-harbor-inn',
      chapter: 'chapter-1',
      title: '旅馆夜话',
      text: [
        '雾港旅馆的大堂昏暗而安静，煤气灯在墙壁上投下摇曳的影子。前台的老板娘百无聊赖地翻着报纸，对你的到来只是抬了抬眼皮。走廊尽头的休息区里，一个穿着风衣的中年男人正对着一杯冷掉的咖啡出神，桌上散落着几页写满笔记的纸张。',
        '他察觉到了你的目光，抬起头——那是一双侦探特有的锐利眼睛，仿佛能穿透表象直抵核心。他微微侧头打量了你片刻，然后将桌上的笔记合拢，露出一个意味不明的微笑。'
      ],
      dialogue: 'hzb-d1',
      choices: [
        {
          id: 'ch1-s5-c1',
          text: '与何振邦深入交谈',
          nextScene: 'ch1-s7',
          effects: [
            { type: 'changeAffinity', target: 'he-zhenbang', value: 1 },
            { type: 'addDiary', target: '旅馆里的侦探何振邦已经在此调查半月。他说守谦是主动消失的——这改变了我的方向。' }
          ]
        },
        {
          id: 'ch1-s5-c2',
          text: '查看旅馆登记簿',
          nextScene: 'ch1-s7',
          effects: [
            { type: 'addClue', target: 'inn-register-info' },
            { type: 'addDiary', target: '登记簿上的信息令人在意——陈守谦曾住207号房，但退房记录为空。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s6',
      locationId: 'fisherman-alley',
      chapter: 'chapter-1',
      title: '巷弄幽影',
      text: [
        '你沿着潮湿的石板路走入巷弄深处。两侧的墙壁上爬满了青苔，头顶的晾衣绳上挂满了滴水的渔网，将本就昏暗的光线遮挡得更加稀薄。脚步声在狭窄的巷道中回荡，像是有人在身后跟随着你。',
        '在小巷尽头，一扇锈迹斑斑的铁门挡住了去路。门上的锁早已锈死，但你注意到门框上有人用油性笔写了一串数字——看起来像是某种编号或日期。门缝中飘出一股奇特的气味，是油墨与陈旧纸张混合的味道。这种气味你不陌生——那是印刷厂特有的味道。',
        '脚印在铁门前消失了。似乎有人来过这里，又转身离开了。你记下了门上的数字，也许它们会在之后的调查中派上用场。'
      ],
      onEnter: [
        { type: 'addDiary', target: '渔人小巷深处有一扇锈迹斑斑的铁门，门框上写着奇怪的数字。飘出的油墨气味暗示着——那里曾经是一座印刷厂。' }
      ],
      choices: [
        {
          id: 'ch1-s6-c1',
          text: '回到街上，去旧墨书店',
          nextScene: 'ch1-s3',
          effects: [
            { type: 'addDiary', target: '铁门打不开，但我记住了门上的数字。先去书店收集更多信息吧。' }
          ]
        },
        {
          id: 'ch1-s6-c2',
          text: '回到街上，去旅馆',
          nextScene: 'ch1-s5',
          effects: [
            { type: 'addDiary', target: '铁门打不开，也许旅馆里有人知道这扇门通向哪里。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s7',
      locationId: 'old-bookstore',
      chapter: 'chapter-1',
      title: '线索初聚',
      text: [
        '夜幕降临，雾港的街道上亮起了稀疏的煤气灯，灯光在浓雾中晕染成一团团昏黄的光斑。你回到旧墨书店，林雪晴正在整理一天的营业。她看到你时，微微点了点头，似乎对你的归来并不意外。',
        '"找到什么了吗？"她将一杯热茶推到你面前。你将今天的发现逐一梳理：码头上赵鹤年提到的灯塔闪光、旅馆里何振邦的调查笔记、渔人小巷尽头铁门上的编号。这些碎片看似零散，却隐隐指向同一个方向——灯塔。',
        '林雪晴听完沉默了片刻，然后从柜台下取出一把旧钥匙。"这是守谦留在我这里的另一件东西。他说过，当所有线索都指向灯塔时，就是用这把钥匙的时候。"你接过钥匙，感到它的重量——不仅仅是铜铁的重量，更是一个承诺的重量。'
      ],
      onEnter: [
        { type: 'addClue', target: 'early-manuscript' },
        { type: 'addItem', target: 'manuscript-fragment-a' },
        { type: 'addDiary', target: '所有线索都指向灯塔。林雪晴交给我一把旧钥匙——守谦说，当一切指向灯塔时，就该用它了。' },
        { type: 'advanceTime', target: 'night' }
      ],
      choices: [
        {
          id: 'ch1-s7-c1',
          text: '在书店过夜，整理思绪',
          nextScene: 'ch1-s8',
          effects: [
            { type: 'changeAffinity', target: 'lin-xueqing', value: 1 },
            { type: 'addDiary', target: '在旧墨书店度过抵达雾港的第一个夜晚。窗外的雾气似乎永远不会散去。' }
          ]
        },
        {
          id: 'ch1-s7-c2',
          text: '趁夜色前往旅馆，看看何振邦还有什么没说的',
          nextScene: 'ch1-s8',
          effects: [
            { type: 'changeAffinity', target: 'he-zhenbang', value: 1 },
            { type: 'addDiary', target: '夜晚的雾港更加诡异。我决定去找何振邦，也许他还有什么关键信息没透露。' }
          ]
        }
      ]
    },
    {
      id: 'ch1-s8',
      locationId: 'fog-harbor-inn',
      chapter: 'chapter-1',
      title: '首日终章',
      text: [
        '在雾港的第一个夜晚，你翻来覆去无法入眠。窗外是港口方向传来的阵阵汽笛声，偶尔夹杂着海鸥的哀鸣。你将被子裹紧，脑海里反复回放着今天的发现——每一句话、每一个眼神、每一条线索都在黑暗中浮现，如拼图般等待被拼合。',
        '匿名信、旧书签、赵鹤年的灯塔记忆、何振邦的调查笔记、渔人小巷的铁门……所有的一切都指向同一个问题：陈守谦去了哪里？他为什么消失？他在保护什么？',
        '你坐起身来，借着床头微弱的灯光翻开笔记本。第一天的调查虽然零散，但方向已经渐渐清晰。明天，你需要更深入地了解这座城市和它的居民。雾港的秘密，正在一层层地被揭开。'
      ],
      onEnter: [
        { type: 'addDiary', target: '抵达雾港的第一天结束了。我手中有了手稿残页、旧书签和码头通行证。明天要去图书馆和更远的地方。' },
        { type: 'advanceTime', target: 'dawn' }
      ],
      choices: [
        {
          id: 'ch1-s8-c1',
          text: '前往市立图书馆继续调查',
          nextScene: 'ch2-s1',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '新的一天开始了。图书馆也许是下一个突破口——陈守谦失踪前频繁借阅书籍，那里一定有他留下的痕迹。' }
          ]
        },
        {
          id: 'ch1-s8-c2',
          text: '先去码头找赵鹤年追问灯塔的事',
          nextScene: 'ch2-s5',
          effects: [
            { type: 'changeAffinity', target: 'zhao-henian', value: 1 },
            { type: 'addDiary', target: '灯塔的闪光信号困扰着我。先去找赵鹤年，问清三年前那晚的细节。' }
          ]
        }
      ]
    }
  ]
}
