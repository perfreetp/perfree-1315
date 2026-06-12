import type { ChapterData } from '@/types'

export const chapter2: ChapterData = {
  id: 'chapter-2',
  name: '第二章：迷雾深处',
  description: '调查逐渐深入，雾港的层层迷雾之下，真相的轮廓若隐若现。每一个角色都藏着自己的秘密。',
  startScene: 'ch2-s1',
  scenes: [
    {
      id: 'ch2-s1',
      locationId: 'city-library',
      chapter: 'chapter-2',
      title: '书阁寻踪',
      text: [
        '市立图书馆矗立在晨雾中，廊柱上的刻字显示它建于一九二三年——恰好是灯塔建造的同一年。推开沉重的铜门，一阵凉爽的空气迎面而来，混合着旧书与木蜡的气味。大厅中央矗立着一座大理石雕像，是一位手捧书卷的女性——建馆者的纪念碑。',
        '图书馆安静得近乎肃穆，唯有翻页的沙沙声和远处某处钟表的嘀嗒声打破寂静。在借阅台后方，一位仪态端庄的中年女性正低头处理文件。她的桌牌上写着"馆长 苏敏华"。'
      ],
      onEnter: [
        { type: 'addDiary', target: '市立图书馆，建于一九二三年——和灯塔同年。苏敏华馆长看起来一丝不苟。' }
      ],
      dialogue: 'smh-d1',
      choices: [
        {
          id: 'ch2-s1-c1',
          text: '继续深入调查图书馆',
          nextScene: 'ch2-s3',
          effects: [
            { type: 'changeAffinity', target: 'su-minhua', value: 1 },
            { type: 'addDiary', target: '苏馆长终于愿意透露借阅记录。陈守谦借阅的书籍组合非常特别——灯塔、密码、印刷术。' }
          ]
        },
        {
          id: 'ch2-s1-c2',
          text: '先去其他地方调查',
          nextScene: 'ch2-s2',
          effects: [
            { type: 'addDiary', target: '图书馆的调查不急于一时，先去书店看看有没有新线索。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s2',
      locationId: 'old-bookstore',
      chapter: 'chapter-2',
      title: '旧墨再访',
      text: [
        '再次踏入旧墨书店，你注意到角落的书架上有人动过——几本书的位置发生了微妙的变化。林雪晴正在整理一批新到的旧书，看到你时放下了手中的活计。',
        '"你来得正好，"她从柜台下取出一个牛皮纸袋，"昨晚有人在书店门口塞了这封信，信封上写着你的名字。"你接过信封，里面是一张手稿残页——正是你手中手稿的下半部分。信封里还夹着一张纸条："海上的老人手中有另一半。"'
      ],
      onEnter: [
        { type: 'addItem', target: 'manuscript-fragment-b' },
        { type: 'addDiary', target: '有人在书店门口留了手稿的下半部分。信上说"海上的老人"有另一半——赵鹤年？' }
      ],
      dialogue: 'lxq-d2',
      choices: [
        {
          id: 'ch2-s2-c1',
          text: '去码头找赵鹤年',
          nextScene: 'ch2-s5',
          effects: [
            { type: 'changeAffinity', target: 'zhao-henian', value: 1 },
            { type: 'addDiary', target: '手稿的另一半在赵鹤年那里。去码头找他是当务之急。' }
          ]
        },
        {
          id: 'ch2-s2-c2',
          text: '先去图书馆查借阅记录',
          nextScene: 'ch2-s3',
          effects: [
            { type: 'addDiary', target: '手稿暂时无法合拢，先去图书馆看看借阅记录也许能有新发现。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s3',
      locationId: 'city-library',
      chapter: 'chapter-2',
      title: '禁书区',
      text: [
        '苏敏华带你穿过几排书架，在图书馆最深处推开了一扇尘封的木门。门后是一间不大的密室，空气中弥漫着更为浓重的陈旧气息。书架上陈列着建馆以来的档案与孤本，有些书的封面上积着厚厚的灰尘。',
        '在一九二三年的建馆档案中，你发现了一份手写的工程报告——灯塔与图书馆竟是同一批人建造的。报告最后一页被撕去，但残留的纸边上有隐约的铅笔字迹："……灯塔之下，藏有……"'
      ],
      onEnter: [
        { type: 'addClue', target: 'borrow-record-summary' },
        { type: 'addItem', target: 'borrow-record' },
        { type: 'addDiary', target: '禁书区藏着一九二三年的建馆档案——灯塔和图书馆由同一批人建造。报告被撕去一页，上面提到灯塔下藏有什么东西。' }
      ],
      dialogue: 'smh-d2',
      choices: [
        {
          id: 'ch2-s3-c1',
          text: '追问苏馆长关于侧门的事',
          nextScene: 'ch2-s4',
          isKey: true,
          effects: [
            { type: 'changeAffinity', target: 'su-minhua', value: 2 },
            { type: 'addDiary', target: '苏馆长透露了关键信息：陈守谦失踪那晚从侧门离开，往印刷厂方向去了。' }
          ]
        },
        {
          id: 'ch2-s3-c2',
          text: '继续翻查禁书区的档案',
          nextScene: 'ch2-s4',
          effects: [
            { type: 'addClue', target: 'su-minhua-statement' },
            { type: 'addDiary', target: '借阅记录中有一张被水渍模糊的借阅卡，借书人不明，但借的书目和陈守谦几乎一模一样。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s4',
      locationId: 'city-library',
      chapter: 'chapter-2',
      title: '馆长之托',
      text: [
        '苏敏华站在禁书区的门口，目光中罕见地流露出一丝柔软。"陈先生失踪那晚，图书馆的警报响过。保安看到有人从侧门离开，手里抱着什么东西。侧门外就是废弃印刷厂的方向。"她顿了顿，从口袋里取出一张泛黄的借阅卡。',
        '"这张卡上的名字被水渍模糊了，但借阅时间就在陈先生之前一个月。最令人不安的是——借的书目和陈先生几乎一模一样。仿佛有人在他之前走过同样的路。"'
      ],
      dialogue: 'smh-d3',
      choices: [
        {
          id: 'ch2-s4-c1',
          text: '前往码头找赵鹤年',
          nextScene: 'ch2-s5',
          effects: [
            { type: 'changeAffinity', target: 'zhao-henian', value: 1 },
            { type: 'addDiary', target: '苏馆长的信息印证了赵鹤年的说法——有人从图书馆往印刷厂方向走了。' }
          ]
        },
        {
          id: 'ch2-s4-c2',
          text: '赶往废弃印刷厂',
          nextScene: 'ch2-s11',
          condition: 'hasClue:press-ink-trace',
          effects: [
            { type: 'addDiary', target: '直接去印刷厂——陈守谦失踪那晚从图书馆侧门走向那里，一定有原因。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s5',
      locationId: 'harbor-dock',
      chapter: 'chapter-2',
      title: '海上往事',
      text: [
        '码头上的雾气比昨日更浓。赵鹤年照旧坐在系船柱旁，但今天他的神色有些不同——眉头微蹙，像是在等什么人。看到你走近，他缓缓站起身来，向码头尽头走去，示意你跟上。',
        '在码头最远端的系船柱旁，他蹲下身拨开了一堆缆绳，露出一个锈蚀的铁盒。"守谦让我把这个放在这里，说如果有人来找他，就交给那人。"铁盒里是一本航海日志的散页和一本袖珍的暗号对照手册。日志上记录着那晚灯塔信号的频率与模式。'
      ],
      onEnter: [
        { type: 'addItem', target: 'logbook-fragment' },
        { type: 'addItem', target: 'codebook' },
        { type: 'addDiary', target: '赵鹤年交出了守谦留下的铁盒——航海日志残页和暗号手册。灯塔的闪光不再是谜了，只待解读。' }
      ],
      dialogue: 'zhn-d2',
      choices: [
        {
          id: 'ch2-s5-c1',
          text: '仔细研究日志和暗号手册',
          nextScene: 'ch2-s9',
          isKey: true,
          effects: [
            { type: 'addClue', target: 'zhao-henian-memory' },
            { type: 'addDiary', target: '三短一长的闪光是摩尔斯密码，意为"安全，可靠近"。灯塔在召唤——但召唤的是谁？' }
          ]
        },
        {
          id: 'ch2-s5-c2',
          text: '追问赵鹤年关于灯塔看守人的事',
          nextScene: 'ch2-s6',
          effects: [
            { type: 'changeAffinity', target: 'zhao-henian', value: 2 },
            { type: 'addDiary', target: '赵鹤年说灯塔看守人走了，但系船柱上的绳结是他临走前留下的——用的是渔民才懂的记事结绳。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s6',
      locationId: 'fog-harbor-inn',
      chapter: 'chapter-2',
      title: '侦探的底牌',
      text: [
        '你在旅馆找到了何振邦。他正站在窗前凝视雾中的灯塔，手中握着一杯威士忌。看到你来，他将桌上的一个信封推到你面前。',
        '"我查到了一些东西，但需要你来确认。"信封里是几张照片——印刷厂内部的景象。照片上，一台残破的印刷机旁散落着铅字，而地面的油墨痕迹呈现出奇特的几何图案。"这不是普通的印刷痕迹，"何振邦的声音低沉，"这是密码。"'
      ],
      onEnter: [
        { type: 'addDiary', target: '何振邦展示了印刷厂内部的照片——地面的油墨痕迹是某种密码。守谦在那里做了什么？' }
      ],
      dialogue: 'hzb-d2',
      choices: [
        {
          id: 'ch2-s6-c1',
          text: '和他一起分析印刷厂的线索',
          nextScene: 'ch2-s8',
          isKey: true,
          effects: [
            { type: 'changeAffinity', target: 'he-zhenbang', value: 2 },
            { type: 'addClue', target: 'he-zhenbang-notes' },
            { type: 'addDiary', target: '何振邦认为守谦是主动设局——他在考验后来者。印刷厂的油墨密码是谜题的一部分。' }
          ]
        },
        {
          id: 'ch2-s6-c2',
          text: '先去渔人小巷看看铁门的情况',
          nextScene: 'ch2-s7',
          effects: [
            { type: 'addDiary', target: '印刷厂的线索还需要更多佐证。先去渔人小巷看看那扇铁门。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s7',
      locationId: 'fisherman-alley',
      chapter: 'chapter-2',
      title: '巷弄深处',
      text: [
        '你再次来到渔人小巷深处。白天看去，铁门上的数字更加清晰——"1947-10-15"。这是一个日期。门缝中飘出的油墨气味比上次更浓，似乎有人在里面待过。',
        '你蹲下身仔细观察地面，发现门槛旁的灰尘中有新鲜的鞋印——不止一种。至少有两个人在近期来过这里。其中一组脚印向巷子深处延伸，消失在一堵爬满常春藤的墙壁前。',
        '你拨开常春藤，发现墙壁上刻着一个箭头，指向巷子另一端的方向。那里隐约可见一座建筑的轮廓——废弃的印刷厂。原来渔人小巷的铁门是印刷厂的后门。'
      ],
      onEnter: [
        { type: 'addClue', target: 'press-ink-trace' },
        { type: 'addDiary', target: '渔人小巷的铁门就是印刷厂后门！门上的日期和脚印说明最近有人来过——不止一个人。' }
      ],
      choices: [
        {
          id: 'ch2-s7-c1',
          text: '从后门进入废弃印刷厂',
          nextScene: 'ch2-s11',
          effects: [
            { type: 'addDiary', target: '铁门上的日期是线索，常春藤后的箭头指引方向——我找到了进入印刷厂的路径。' }
          ]
        },
        {
          id: 'ch2-s7-c2',
          text: '回去找何振邦分享发现',
          nextScene: 'ch2-s6',
          effects: [
            { type: 'changeAffinity', target: 'he-zhenbang', value: 1 },
            { type: 'addDiary', target: '印刷厂后门的发现很重要，也许何振邦能帮我分析那些脚印。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s8',
      locationId: 'city-library',
      chapter: 'chapter-2',
      title: '文字与火焰',
      text: [
        '何振邦带你回到图书馆——他说那里有一份和印刷厂相关的档案，需要苏敏华的首肯才能查阅。苏馆长看了看何振邦，又看了看你，叹了口气，打开了禁书区更深处的另一扇门。',
        '门后的房间里存放着本地印刷行业的历史档案。你翻到了一九四七年的记录——正是铁门上刻的年份。那一年，雾港印刷厂承接了一批特殊订单：为灯塔管理局印制加密通信文件。而订单的签署人，正是当时的图书馆馆长——苏敏华的前任。'
      ],
      onEnter: [
        { type: 'addClue', target: 'secret-letter-content' },
        { type: 'addDiary', target: '一九四七年，印刷厂为灯塔管理局印制了加密通信文件。图书馆馆长和灯塔管理者是一伙的——这条线索串联起了所有地方。' }
      ],
      dialogue: 'smh-d3',
      choices: [
        {
          id: 'ch2-s8-c1',
          text: '前往废弃印刷厂寻找印刷模板',
          nextScene: 'ch2-s11',
          isKey: true,
          effects: [
            { type: 'addItem', target: 'printing-plate' },
            { type: 'addDiary', target: '印刷厂一定还留着当年的印刷模板。手稿加模板就能揭示密函——这是守谦设的最后一道谜题。' }
          ]
        },
        {
          id: 'ch2-s8-c2',
          text: '先去灯塔崖岸查看',
          nextScene: 'ch2-s10',
          effects: [
            { type: 'addDiary', target: '也许直接去灯塔能发现更多线索，印刷厂的探索可以稍后进行。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s9',
      locationId: 'harbor-dock',
      chapter: 'chapter-2',
      title: '密码解读',
      text: [
        '你坐在码头的栈道上，将航海日志残页和暗号手册并排铺开。海风不断翻动纸页，仿佛在催促你尽快解开这个谜团。赵鹤年默默坐在一旁，偶尔用烟斗指点某个符号。',
        '三短一长——在暗号手册的对照表中，这个信号对应着"安全通道开启"。而日志中记录的信号频率，恰好对应灯塔旋转的节奏。灯塔不是在发故障信号，而是一套精密的密码系统。有人在用灯塔与外界通信。',
        '"我早说过，灯塔不骗人。"赵鹤年的声音在海风中显得格外苍老，"现在你信了吗？"'
      ],
      onEnter: [
        { type: 'addItem', target: 'lighthouse-code' },
        { type: 'addClue', target: 'lighthouse-code-interpretation' },
        { type: 'addDiary', target: '灯塔密码破译了！"安全通道开启"——有人在用灯塔发信号。守谦？还是灯塔看守人？' }
      ],
      choices: [
        {
          id: 'ch2-s9-c1',
          text: '趁夜色去灯塔崖岸',
          nextScene: 'ch2-s10',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '有了灯塔密码，是时候去灯塔了。夜晚的信号也许更容易观察到。' },
            { type: 'advanceTime', target: 'night' }
          ]
        },
        {
          id: 'ch2-s9-c2',
          text: '先去印刷厂寻找更多线索',
          nextScene: 'ch2-s11',
          effects: [
            { type: 'addDiary', target: '密码到手了，但还需要更多信息来拼凑完整的故事。印刷厂是下一步。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s10',
      locationId: 'lighthouse-cliff',
      chapter: 'chapter-2',
      title: '灯塔之下',
      text: [
        '通往灯塔崖岸的路陡峭而荒凉，两侧是嶙峋的礁石与枯萎的海草。海风在悬崖边呼啸而过，将你的衣角吹得猎猎作响。当你终于站在灯塔脚下时，那座灰白色的建筑比想象中更为高大——它像一根沉默的手指，直指被浓雾遮蔽的天空。',
        '灯塔的门上了锁，但你注意到锁是新的——这意味着有人近期来过。夜幕中，你仰头望去，塔顶的灯室漆黑一片，但某种直觉告诉你，这盏灯随时可能亮起。海风送来了远处码头的汽笛声，还有……一阵若有若无的灯光。',
        '三短一长。三短一长。信号在夜空中反复闪烁，如同一颗跳动的心脏。灯塔在说话——而你，终于听懂了它的语言。'
      ],
      onEnter: [
        { type: 'addDiary', target: '站在灯塔脚下，亲眼见证了那个信号——三短一长。灯塔在召唤，有人在等待。' },
        { type: 'triggerEvent', target: 'lighthouse-night-event' },
        { type: 'advanceTime', target: 'night' }
      ],
      choices: [
        {
          id: 'ch2-s10-enter-lighthouse',
          text: '用钥匙打开灯塔的门',
          nextScene: 'ch3-s8',
          isKey: true,
          condition: 'hasItem:lighthouse-code',
          effects: [
            { type: 'addDiary', target: '我打开了灯塔的门。这里藏着雾港最深的秘密——我要进去看看。' }
          ]
        },
        {
          id: 'ch2-s10-c2',
          text: '先回去整理线索，做好准备再来',
          nextScene: 'ch2-s12',
          effects: [
            { type: 'addDiary', target: '灯塔的门上了新锁，贸然进入也许会有危险。先回去把所有线索理清。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s11',
      locationId: 'abandoned-press',
      chapter: 'chapter-2',
      title: '印刷厂探秘',
      text: [
        '废弃的印刷厂比你想象的更加庞大。铁皮屋顶千疮百孔，月光透过缝隙洒落，在地面上画出一道道银白色的光柱。残存的印刷机如巨兽遗骸般蛰伏在黑暗中，散落的铅字在脚下发出清脆的金属声响。',
        '你注意到一台印刷机的操作台上有人近期整理过的痕迹——铅字被重新排列过，形成了一段看似无意义的文字。但当你将手稿残页的内容与这些铅字对照时，一个惊人的发现浮出水面：铅字的排列暗含了手稿中的关键词，而那些多余的铅字拼出了另一段隐藏的信息——密函的印制方法。',
        '在印刷机旁的地面上，你找到了那块印刷模板——表面的凹凸纹路不仅是文字，还包含了一层只有在特定角度下才能看到的暗纹。手稿的文字与模板的暗纹重叠，便能揭示密函的全文。'
      ],
      onEnter: [
        { type: 'addItem', target: 'printing-plate' },
        { type: 'addClue', target: 'press-ink-trace' },
        { type: 'addDiary', target: '印刷厂里的发现超出预期——印刷模板的暗纹与手稿重叠就能揭示密函。守谦在这里制作了他的终极谜题。' }
      ],
      choices: [
        {
          id: 'ch2-s11-c1',
          text: '将手稿与模板结合，揭示密函',
          nextScene: 'ch2-s12',
          isKey: true,
          condition: 'hasItem:complete-manuscript',
          effects: [
            { type: 'addItem', target: 'secret-letter' },
            { type: 'addClue', target: 'secret-letter-content' },
            { type: 'addDiary', target: '密函终于揭示——内容指向灯塔："月圆之夜，三短一长，守望者将归来。"署名是一只振翅的鹤。' }
          ]
        },
        {
          id: 'ch2-s11-c2',
          text: '带着模板回去，等手稿完整后再来',
          nextScene: 'ch2-s12',
          effects: [
            { type: 'addDiary', target: '模板到手了，但手稿还不完整。我需要先把手稿残页合拢，再来揭开密函。' }
          ]
        }
      ]
    },
    {
      id: 'ch2-s12',
      locationId: 'fog-harbor-inn',
      chapter: 'chapter-2',
      title: '迷雾将散',
      text: [
        '回到旅馆，你将所有线索铺在何振邦的桌上。两页手稿残页、航海日志、暗号手册、印刷模板、借阅记录——每一条线索都是陈守谦精心留下的路标，引导后来者走向真相。何振邦逐条审视，最终长叹一声。',
        '"他比我们所有人想象的都要聪明，"侦探的语气中罕见地流露出敬佩，"手稿是故事，模板是钥匙，灯塔是终点。他把真相藏在故事与印刷的交汇处，又在灯塔上设了最后一道门——只有读懂信号的人才能进入。"',
        '你望向窗外。夜雾中的灯塔依然在闪烁，三短一长的信号如呼吸般规律。明天，你将登上那座灯塔，去见那个在雾中守望了三年的人。无论结局如何，雾港的秘密终将大白于天下。'
      ],
      onEnter: [
        { type: 'addDiary', target: '所有线索汇聚——手稿是故事，模板是钥匙，灯塔是终点。明天，我将登上灯塔。' },
        { type: 'advanceTime', target: 'night' }
      ],
      choices: [
        {
          id: 'ch2-s12-c1',
          text: '准备就绪，前往灯塔',
          nextScene: 'ch3-s1',
          isKey: true,
          effects: [
            { type: 'addDiary', target: '一切准备就绪。真相比任何时候都更近——灯塔在等我。' }
          ]
        },
        {
          id: 'ch2-s12-c2',
          text: '再去拜访某个角色，确保没有遗漏',
          nextScene: 'ch3-s1',
          effects: [
            { type: 'addDiary', target: '在去灯塔之前，我需要确认没有遗漏任何线索。' }
          ]
        }
      ]
    }
  ]
}
