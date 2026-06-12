import type { ChapterData } from '@/types'

export const chapter3: ChapterData = {
  id: 'chapter-3',
  name: '第三章：真相之光',
  description: '迷雾即将散尽，灯塔的秘密即将揭晓。每一个选择都将决定雾港命运的最终走向。',
  startScene: 'ch3-s1',
  scenes: [
    {
      id: 'ch3-s1',
      locationId: 'old-bookstore',
      chapter: 'chapter-3',
      title: '最后的准备',
      text: [
        '清晨的旧墨书店格外安静，林雪晴正在擦拭一只旧铜壶。看到你来，她放下手中的活计，目光中带着某种不言而喻的期许。',
        '"你决定要去了吗？"她轻声问。你点了点头。她从书架最深处取出一本皮面笔记本，递给你——"这是守谦放在我这里的最后一样东西。他说，当你准备登上灯塔时，就把它给你。"',
        '笔记本里是陈守谦的手写日记，记录了他从发现灯塔秘密到决定隐居的全过程。最后一页写着："如果你读到这里，说明你通过了所有考验。灯塔顶层的灯室里，有我留给这个世界的最后一份礼物。"'
      ],
      onEnter: [
        { type: 'addDiary', target: '守谦的日记揭示了一切——他选择隐居灯塔，是因为发现了真相后不得不躲藏。他一直在等一个能读懂他信号的人。' }
      ],
      dialogue: 'lxq-d3',
      choices: [
        {
          id: 'ch3-s1-c1',
          text: '带着日记前往灯塔',
          nextScene: 'ch3-s3',
          isKey: true,
          effects: [
            { type: 'changeAffinity', target: 'lin-xueqing', value: 2 },
            { type: 'addDiary', target: '雪晴交出了守谦的最后遗物。她的眼中含着泪光——她一直在等这一天。' }
          ]
        },
        {
          id: 'ch3-s1-c2',
          text: '先去确认其他角色是否还有未说的信息',
          nextScene: 'ch3-s2',
          effects: [
            { type: 'addDiary', target: '在出发前，我需要确保所有线索都已到位。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s2',
      locationId: 'harbor-dock',
      chapter: 'chapter-3',
      title: '码头诀别',
      text: [
        '你来到码头，赵鹤年已经不在老位置了。在系船柱旁，你发现了一张叠好的纸条，上面是老人颤抖的字迹："灯塔的潮汐只在月圆之夜退去，石阶会从海面下显露。今晚就是月圆。我在码头尽头等你回来。"',
        '你抬头望向灯塔的方向。在晨光中，那座灰白色的建筑显得不再那么遥远——它一直在那里，像一根永不熄灭的蜡烛，守望着这片被浓雾笼罩的海域。今晚，你将踏入它的怀抱。'
      ],
      onEnter: [
        { type: 'changeAffinity', target: 'zhao-henian', value: 2 },
        { type: 'addDiary', target: '赵鹤年留下了指引——月圆之夜潮汐退去，石阶显露。今晚就是时候了。' }
      ],
      choices: [
        {
          id: 'ch3-s2-c1',
          text: '等待夜幕降临，然后出发',
          nextScene: 'ch3-s3',
          isKey: true,
          effects: [
            { type: 'advanceTime', target: 'night' },
            { type: 'addDiary', target: '夜幕降临了。灯塔的信号在雾中闪烁——三短一长。是时候了。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s3',
      locationId: 'lighthouse-cliff',
      chapter: 'chapter-3',
      title: '月圆之路',
      text: [
        '通往灯塔的悬崖小径在月光下如银蛇般蜿蜒。海风比往日更加猛烈，却带着一种奇异的清新——雾气正在缓缓散去，露出脚下翻涌的黑色海面。当你抵达崖岸时，潮水正如赵鹤年所说开始退去，一道被海水遮蔽了不知多少年的石阶从崖壁下缓缓显露。',
        '石阶湿滑而陡峭，每一级都长满了藤壶与海草，但脚下的岩石坚实可靠。你一步一步向下，海浪在身侧拍击崖壁，发出沉闷的回响。灯塔就在头顶，它的光芒如巨柱般刺入夜空，为你的每一步照亮前方。'
      ],
      onEnter: [
        { type: 'addDiary', target: '月圆之夜，潮汐退去，石阶显露。我正走向灯塔——雾港最后的秘密就在那里。' }
      ],
      choices: [
        {
          id: 'ch3-s3-c1',
          text: '沿石阶登上灯塔',
          nextScene: 'ch3-s4',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '石阶湿滑而漫长，但灯塔的光指引着方向。每一步都让我更接近真相。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s4',
      locationId: 'lighthouse-cliff',
      chapter: 'chapter-3',
      title: '灯室之内',
      text: [
        '灯塔内部的螺旋楼梯向上延伸，墙壁上的石灰已经斑驳脱落，但楼梯本身依然坚固。每一层都空无一物，只有海风穿过破损的窗棂发出呜咽般的声响。你的脚步声在空旷的塔身内回荡，如同心跳。',
        '终于，你推开了灯室的门。巨大的透镜组静静地矗立在房间中央，月光穿过玻璃折射出无数道彩虹般的光芒。透镜下方的操作台上，有人留下了一盏煤油灯和一本摊开的笔记本。笔记本的封面写着："致后来者——陈守谦"。'
      ],
      onEnter: [
        { type: 'addClue', target: 'manuscript-disappearance-truth' },
        { type: 'addDiary', target: '灯室里找到了陈守谦的笔记本——"致后来者"。他确实来过这里，而且在这里留下了什么。' }
      ],
      choices: [
        {
          id: 'ch3-s4-c1',
          text: '翻阅笔记本',
          nextScene: 'ch3-s5',
          isKey: true,
          effects: [
            { type: 'addClue', target: 'writer-hermit-mystery' },
            { type: 'addDiary', target: '守谦的笔记记录了一切——他发现灯塔下的洞穴中藏着被掩盖的历史，因此不得不隐姓埋名。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s5',
      locationId: 'lighthouse-cliff',
      chapter: 'chapter-3',
      title: '真相碎片',
      text: [
        '笔记本中的内容令人震惊。陈守谦在调查灯塔历史时，无意中发现了灯塔下方海蚀洞穴里的秘密——那里存放着一批上世纪中叶被刻意销毁的文件，记录了雾港某些当权者的不法行为。他本想公之于世，但遭到了警告与威胁。',
        '于是他选择了一种独特的抗争方式：将真相写进小说，用手稿和印刷术制作密函，用灯塔的闪光传递信号。他把自己变成了一座灯塔——在黑暗中为真相守夜，等待有人读懂他的光。',
        '笔记本的最后一页写着一个地址——灯塔下海蚀洞穴的入口位置。但那里需要同时拥有密函和灯塔密码才能打开。'
      ],
      onEnter: [
        { type: 'addDiary', target: '守谦的真相令人动容——他不是失踪，而是选择了守望。他用文字、印刷和灯光编织了一张网，等待捕鱼人来收网。' }
      ],
      choices: [
        {
          id: 'ch3-s5-c1',
          text: '带着密函和密码前往海蚀洞穴',
          nextScene: 'ch3-s7',
          isKey: true,
          condition: 'hasItem:secret-letter&&hasItem:lighthouse-code',
          effects: [
            { type: 'addItem', target: 'author-legacy' },
            { type: 'addDiary', target: '密函与灯塔密码交叉验证，洞穴的入口向我敞开。守谦的遗稿就在里面。' }
          ]
        },
        {
          id: 'ch3-s5-c2',
          text: '我还需要更多线索才能继续',
          nextScene: 'ch3-s6',
          effects: [
            { type: 'addDiary', target: '我还没有收集足够的线索。也许旅馆或书店还有我遗漏的东西。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s6',
      locationId: 'fog-harbor-inn',
      chapter: 'chapter-3',
      title: '旅馆整理',
      text: [
        '你回到雾港旅馆，何振邦正坐在大堂的角落里等你。"我猜你会回来，"他递过一杯热咖啡，"出发前的犹豫是侦探最珍贵的品质——鲁莽的人活不过第一个案子。"',
        '你在旅馆的房间里将所有线索重新梳理。何振邦在一旁时而补充、时而质疑，像一个严格的考官在检验你的推理。最终，你们达成了共识——密函与灯塔密码是打开海蚀洞穴的钥匙，而洞穴中藏着陈守谦留给这个世界的最后真相。'
      ],
      onEnter: [
        { type: 'changeAffinity', target: 'he-zhenbang', value: 2 },
        { type: 'addDiary', target: '何振邦帮我理清了最后的思路。密函加灯塔密码，就能打开海蚀洞穴——守谦的遗稿就在那里。' }
      ],
      dialogue: 'hzb-d3',
      choices: [
        {
          id: 'ch3-s6-c1',
          text: '返回灯塔',
          nextScene: 'ch3-s5',
          effects: [
            { type: 'addDiary', target: '线索已经够了。我必须回到灯塔，找到海蚀洞穴的入口。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s7',
      locationId: 'abandoned-press',
      chapter: 'chapter-3',
      title: '遗稿现世',
      text: [
        '你站在灯塔下方海蚀洞穴的入口前。密函上的暗语与灯塔密码交叉印证，石壁上的机关应声而开。洞穴内潮湿而阴冷，但有人在这里生活过的痕迹——一张简陋的行军床、一盏煤油灯、还有堆叠如山的稿纸。',
        '那是陈守谦的遗稿。三年的隐居生活中，他从未停止写作。稿纸上记录了雾港那段被掩埋的往事，每一个名字、每一桩事件都经过了反复考证。他用自己的方式守护了真相——将它写成文字，等待有人来取。',
        '遗稿的最后一页写着："若你读到这里，说明雾终于散了。请将这些文字带出灯塔，交给那些需要真相的人。一个作家的笔，不应该被沉默折断。"'
      ],
      onEnter: [
        { type: 'addItem', target: 'author-legacy' },
        { type: 'addClue', target: 'manuscript-disappearance-truth' },
        { type: 'addDiary', target: '遗稿现世！守谦三年隐居从未停笔，他用文字守护了真相。最后一句话刺穿了我的心——"一个作家的笔，不应该被沉默折断。"' }
      ],
      choices: [
        {
          id: 'ch3-s7-c1',
          text: '带着遗稿回到灯室',
          nextScene: 'ch3-s8',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '遗稿沉重得像整座灯塔。我必须将它带出去——这是守谦三年的心血，也是雾港被掩盖的真相。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s8',
      locationId: 'lighthouse-cliff',
      chapter: 'chapter-3',
      title: '灯塔守望者',
      text: [
        '当你抱着遗稿回到灯室时，煤油灯忽然亮了起来。一个身影从透镜的阴影中走出——消瘦、苍白、眼窝深陷，但目光中仍有写作者特有的执拗与光。陈守谦站在你面前，如同从他的文字中走出的幽灵。',
        '"你终于来了，"他的声音沙哑而平静，像是在确认一件早已注定的事，"我就知道，总有一天会有读者找到这里。"他看向你手中的遗稿，嘴角浮起一丝微笑——那是一个作家看到作品终于有人阅读时的满足。'
      ],
      onEnter: [
        { type: 'addDiary', target: '陈守谦——他真的在这里。三年的守望，三年的等待，此刻终于结束。' }
      ],
      dialogue: 'csq-d1',
      choices: [
        {
          id: 'ch3-s8-c1',
          text: '你的遗稿会公之于世，真相不会再被埋没',
          nextScene: 'ch3-s9',
          isKey: true,
          effects: [
            { type: 'changeAffinity', target: 'chen-shouqian', value: 3 },
            { type: 'addDiary', target: '我向守谦承诺——他的文字会被世界读到。三年的隐居不会白费。' }
          ]
        },
        {
          id: 'ch3-s8-c2',
          text: '你已经证明了真相的价值，跟我回去吧',
          nextScene: 'ch3-s9',
          effects: [
            { type: 'changeAffinity', target: 'chen-shouqian', value: 2 },
            { type: 'addDiary', target: '我劝守谦离开灯塔。他已经守了太久——是时候让真相自己说话了。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s9',
      locationId: 'lighthouse-cliff',
      chapter: 'chapter-3',
      title: '最终抉择',
      text: [
        '陈守谦沉默了很久，窗外的海风呼啸而过，灯塔的光芒在夜空中旋转。他终于开口了："你可以带着遗稿离开，将它交给任何你想交的人。但还有一个选择——留在这里，成为新的守望者。"',
        '"灯塔需要有人守着，"他的目光投向远方雾气渐散的海面，"不是为了照亮自己，而是为了让迷失的人知道方向。我守了三年，已经够了。但灯光不能灭——总要有人接棒。"',
        '你望着手中厚厚的遗稿，又望向窗外那片正在苏醒的海港。雾气在消散，晨光在东方的海平线上渐渐亮起。这是一个关于选择的故事——关于如何在黑暗中点灯，关于如何在迷雾中前行。'
      ],
      onEnter: [
        { type: 'addDiary', target: '最终的抉择摆在面前——带走遗稿揭露真相，还是留下成为新的守望者？无论哪种选择，灯都不会灭。' }
      ],
      choices: [
        {
          id: 'ch3-s9-trust-writer',
          text: '相信守谦的选择，带着遗稿回到雾港',
          nextScene: 'ch3-s10',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '我选择相信守谦——带着遗稿回到雾港，让真相重见天日。他守护了三年，现在轮到我来传递火种。' }
          ]
        },
        {
          id: 'ch3-s9-stay',
          text: '留下来，成为新的灯塔守望者',
          nextScene: 'ch3-s10',
          effects: [
            { type: 'triggerEvent', target: 'become-watchman' },
            { type: 'addDiary', target: '我选择留下——灯塔需要有人守着。守谦可以走了，而我会继续守望这片海域。' }
          ]
        }
      ]
    },
    {
      id: 'ch3-s10',
      locationId: 'harbor-dock',
      chapter: 'chapter-3',
      title: '雾散之后',
      text: [
        '当第一缕阳光刺破海平面上的最后一缕薄雾时，你站在码头栈道上。赵鹤年果然在码头尽头等着，烟斗里的烟丝终于重新点着了。林雪晴不知何时也来了，站在书店门口远远望着。何振邦倚在旅馆的门廊下，风衣在晨风中猎猎作响。苏敏华则站在图书馆的台阶上，手中捧着一本摊开的书。',
        '雾港的雾终于散了。阳光照在每一个人的脸上，照在码头的系船柱上，照在旧墨书店斑驳的招牌上，照在灯塔白色的塔身上。这座城市在晨光中苏醒，如同一本被翻开的书——每一页都写满了故事，每一个故事都值得被铭记。',
        '你低头看着手中的遗稿，陈守谦的笔迹在阳光下清晰可辨。一个作家的笔不会被沉默折断——只要有人在读，故事就永远不会结束。'
      ],
      onEnter: [
        { type: 'addDiary', target: '雾散了。阳光照在雾港的每一个角落。守谦的遗稿将被世界读到——这就是他三年守望的意义。' },
        { type: 'advanceTime', target: 'dawn' }
      ],
      choices: [
        {
          id: 'ch3-s10-c1',
          text: '翻开遗稿的第一页',
          nextScene: 'ending-determination',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '我翻开了遗稿。故事从这一刻起，由我来讲述。' }
          ]
        }
      ]
    }
  ]
}
