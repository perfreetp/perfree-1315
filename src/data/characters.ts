import type { CharacterData } from '@/types'

export const characters: CharacterData[] = [
  {
    id: 'lin-xueqing',
    name: '林雪晴',
    title: '旧书店老板',
    description: '三十出头的女子，眉目温和却目光敏锐。继承了祖母的书店，对雾港的旧事如数家珍。看似安静寡言，实则心思细腻，总在不经意间透露关键信息。',
    color: '#e8a87c',
    dialogues: [
      {
        id: 'lxq-d1',
        text: '你是外地来的吧？这间书店开了快一百年了，什么人都来过——作家、水手、甚至还有侦探。你是来找什么的？',
        options: [
          {
            text: '我收到一封信，信上让我来这里。',
            next: 'lxq-d1a',
            affinityChange: 1,
            isKey: true,
            clueId: 'anonymous-letter-content'
          },
          {
            text: '只是路过，想看看旧书。',
            next: 'lxq-d1b',
            affinityChange: 0
          },
          {
            text: '我在找陈守谦，你知道他吗？',
            next: 'lxq-d1c',
            affinityChange: -1
          }
        ]
      },
      {
        id: 'lxq-d1a',
        text: '匿名信？让我看看……这字迹，我见过。守谦以前常来我店里，他总坐在靠窗那桌写东西，一写就是一整天。失踪前一周，他告诉我他发现了什么了不起的东西，说等写完会给所有人一个交代。',
        next: 'lxq-d1a2',
        affinityChange: 1,
        clueId: 'lin-xueqing-testimony',
        itemId: 'old-bookmark'
      },
      {
        id: 'lxq-d1a2',
        text: '这枚书签是他留下的。他说过，"真相藏于墨迹之下"——如果你能读懂这句话，也许就能找到他。',
        options: [
          {
            text: '他有没有提过其他线索？',
            next: 'lxq-d2',
            affinityChange: 1,
            itemId: 'manuscript-fragment-a'
          },
          {
            text: '谢谢你的帮助，我先去别处看看。',
            next: 'lxq-d-end',
            affinityChange: 0
          }
        ]
      },
      {
        id: 'lxq-d1b',
        text: '随便看看也好。不过你眼神不像随便看看的人——你眼底有追寻什么东西时的那种光。守谦以前也是这种眼神。',
        next: 'lxq-d1a2',
        affinityChange: 0
      },
      {
        id: 'lxq-d1c',
        text: '……你认识守谦？还是有人派你来的？抱歉，我不能随便把他的事告诉陌生人。除非你能证明你是他信任的人。',
        next: 'lxq-d-end',
        affinityChange: -1
      },
      {
        id: 'lxq-d-end',
        text: '书店随时欢迎你。有什么想看的，自己翻就好。',
        affinityChange: 0
      },
      {
        id: 'lxq-d2',
        text: '守谦最后一次来店里时，在角落的书架上抽走了一本旧书，书里夹着一页手稿。他说那是他最重要的作品，可惜只完成了一半。另一半……他说藏在了"海上的老人"那里。',
        options: [
          {
            text: '海上的老人？是码头上的人吗？',
            next: 'lxq-d2a',
            affinityChange: 1,
            clueId: 'early-manuscript'
          },
          {
            text: '你店里还有他留下的其他东西吗？',
            next: 'lxq-d2b',
            affinityChange: 1,
            itemId: 'manuscript-fragment-a'
          }
        ]
      },
      {
        id: 'lxq-d2a',
        text: '码头上有个老水手叫赵鹤年，常年待在那里。守谦失踪前去见过他，回来时手里多了张泛黄的纸——也许就是你说的手稿残页。你去码头找他时，提一下守谦的名字，他可能会帮你。',
        next: 'lxq-d3',
        affinityChange: 2,
        itemId: 'dock-pass'
      },
      {
        id: 'lxq-d2b',
        text: '让我想想……对了，他在我这里寄存了一个信封，说如果有人拿着他的书签来，就把信封交给那人。你拿着——里面是手稿的前半部分。他说另一半在海上的老人那里。',
        next: 'lxq-d3',
        affinityChange: 2,
        itemId: 'manuscript-fragment-a'
      },
      {
        id: 'lxq-d3',
        text: '你让我想起守谦。他也是这样，一旦找到线索就绝不放手。不过有件事我一直没说——他失踪前的最后一个晚上，我在书店门口看到一个人影。那人穿着风衣，往旅馆方向去了。',
        options: [
          {
            text: '风衣人影？会不会是侦探何振邦？',
            next: 'lxq-d3a',
            affinityChange: 2,
            isKey: true,
            clueId: 'inn-register-info'
          },
          {
            text: '谢谢你，雪晴。这些信息非常重要。',
            next: 'lxq-d3b',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'lxq-d3a',
        text: '何振邦？那个住在旅馆的侦探？有可能。但那个人影走路的样子……不像在追踪什么，倒像是在赴约。守谦失踪那晚，有人在旅馆等他。',
        next: 'lxq-d-end2',
        affinityChange: 2,
        itemId: 'inn-key'
      },
      {
        id: 'lxq-d3b',
        text: '不客气。如果你找到守谦……请告诉他，他借我的那本《灯塔守望者》还没还呢。我一直给他留着书签的位置。',
        next: 'lxq-d-end2',
        affinityChange: 1
      },
      {
        id: 'lxq-d-end2',
        text: '保重。雾港的夜路不好走，记得带上灯。',
        affinityChange: 0
      }
    ]
  },
  {
    id: 'zhao-henian',
    name: '赵鹤年',
    title: '码头老水手',
    description: '年逾六旬的老水手，常年在码头独坐。满脸沟壑般的皱纹记录着大海的故事，浑浊的双眼偶尔闪过精明之光。他知道的远比说出来的多。',
    color: '#7ec8e3',
    dialogues: [
      {
        id: 'zhn-d1',
        text: '码头不是游客该来的地方。潮水涨起来的时候，连本地人都未必找得到回家的路。你有什么事？',
        options: [
          {
            text: '林雪晴让我来找你，她说你认识陈守谦。',
            next: 'zhn-d1a',
            affinityChange: 1,
            isKey: true
          },
          {
            text: '我想了解码头上有没有什么异常。',
            next: 'zhn-d1b',
            affinityChange: 0
          },
          {
            text: '你看起来经历过很多，愿意聊聊吗？',
            next: 'zhn-d1c',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'zhn-d1a',
        text: '雪晴让你来的？那你是值得信任的人。守谦……他是我见过的最执着的作家。他来码头找我问过灯塔的事——不是游客那种问法，是真正想了解灯塔秘密的人。',
        next: 'zhn-d2',
        affinityChange: 1,
        clueId: 'zhao-henian-memory',
        itemId: 'logbook-fragment'
      },
      {
        id: 'zhn-d1b',
        text: '异常？码头每天都异常。雾气、潮汐、还有那些来路不明的船。你要是问有没有特别的事——那晚的灯光算一件。',
        next: 'zhn-d2',
        affinityChange: 0,
        clueId: 'zhao-henian-memory'
      },
      {
        id: 'zhn-d1c',
        text: '我在这码头坐了四十年，什么风浪没见过。但那年台风夜看到的事，到今天还让我心里发毛——灯塔上有人在发信号。',
        next: 'zhn-d2',
        affinityChange: 2,
        clueId: 'zhao-henian-memory'
      },
      {
        id: 'zhn-d2',
        text: '那是三年前的台风夜，我的船被风浪逼回港口。深夜我看到灯塔顶上有灯光闪——三短一长，反反复复。第二天灯塔看守人就不见了。但我跟谁说都没人信。',
        options: [
          {
            text: '三短一长？这像是某种信号。你有航海日志吗？',
            next: 'zhn-d2a',
            affinityChange: 2,
            isKey: true,
            itemId: 'logbook-fragment',
            clueId: 'dock-knot-mark'
          },
          {
            text: '灯塔看守人后来找到了吗？',
            next: 'zhn-d2b',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'zhn-d2a',
        text: '日志我有，那晚的记录还在。三短一长——在航海信号里意味着"安全，可以靠近"。但那晚风浪那么大，谁能靠近灯塔？除非……那信号不是给船上的人看的。',
        next: 'zhn-d3',
        affinityChange: 2
      },
      {
        id: 'zhn-d2b',
        text: '官方说看守人辞职走了，但我认识他三十年，他不是会不辞而别的人。那些系船柱上的绳结也是他留下的——他走之前打的，用的是我们渔民才懂的记事结绳。',
        next: 'zhn-d3',
        affinityChange: 1,
        clueId: 'dock-knot-mark'
      },
      {
        id: 'zhn-d3',
        text: '守谦后来也问过我这些事。我把航海日志给他看了，他还拿走了暗号手册——说是要破译灯塔的信号。后来他再也没来过码头。',
        options: [
          {
            text: '暗号手册？现在在哪里？',
            next: 'zhn-d3a',
            affinityChange: 1,
            itemId: 'codebook'
          },
          {
            text: '你觉得守谦的失踪和灯塔有关吗？',
            next: 'zhn-d3b',
            affinityChange: 2,
            isKey: true
          }
        ]
      },
      {
        id: 'zhn-d3a',
        text: '守谦还回来过一次，把手册放在我的船舱里。他说如果有人来问灯塔的事，就把手册给那人。看来你就是这样的人。拿去吧——也许你能读懂我们没读懂的东西。',
        next: 'zhn-d-end',
        affinityChange: 2,
        itemId: 'codebook'
      },
      {
        id: 'zhn-d3b',
        text: '我不只是觉得。我知道。守谦失踪前去灯塔见过看守人，回来时整个人都变了——像是找到了什么，又像是被什么吓到了。他把手册还给我时手都在抖，只说了一句话："灯塔还在等。"我到现在也没明白。',
        next: 'zhn-d3a',
        affinityChange: 2,
        itemId: 'codebook'
      },
      {
        id: 'zhn-d-end',
        text: '年轻人，记住一件事：在海上，信号就是生命。灯塔从不骗人，骗人的只有雾。',
        affinityChange: 0
      }
    ]
  },
  {
    id: 'su-minhua',
    name: '苏敏华',
    title: '图书馆馆长',
    description: '五十余岁的女性，仪态端庄，言辞精准。作为图书馆馆长，她对馆内一切了如指掌。表面上公事公办，但对真正热爱书籍的人会流露罕见的温情。',
    color: '#c3aed6',
    dialogues: [
      {
        id: 'smh-d1',
        text: '图书馆五点闭馆，还有二十分钟。如果你是来看书的，请快些。如果是来闲聊的——我没有那个时间。',
        options: [
          {
            text: '我想查一个人的借阅记录，姓陈，是常来的读者。',
            next: 'smh-d1a',
            affinityChange: 1,
            isKey: true
          },
          {
            text: '这座图书馆的历史很悠久吧？',
            next: 'smh-d1b',
            affinityChange: 0
          },
          {
            text: '请问有没有关于灯塔的资料？',
            next: 'smh-d1c',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'smh-d1a',
        text: '陈先生？你是说陈守谦？他是这里的常客——每周至少来三次。但借阅记录属于读者隐私，我不能随便……等等，你手里拿的是什么？那是他的书签？也许我破例一次。',
        next: 'smh-d2',
        affinityChange: 2,
        itemId: 'borrow-record',
        clueId: 'borrow-record-summary'
      },
      {
        id: 'smh-d1b',
        text: '建馆近百年了。如果你对历史感兴趣，我建议你去旧墨书店——林雪晴那边的资料比我还全。不过如果你是来找人的，还是直说吧。',
        next: 'smh-d1a',
        affinityChange: 0
      },
      {
        id: 'smh-d1c',
        text: '灯塔？有意思。最近问灯塔的人可真多——先是陈守谦，然后是那个住在旅馆的侦探，现在是你。你们到底在找什么？',
        next: 'smh-d2',
        affinityChange: 1
      },
      {
        id: 'smh-d2',
        text: '陈先生借阅的书籍组合很奇怪——灯塔建造史、密码学入门、本地航运志、还有印刷术发展史。我原以为他在写新小说，现在想来或许另有深意。最后一次借阅是在他失踪前三天。',
        options: [
          {
            text: '能让我看看禁书区吗？也许他在那里找过什么。',
            next: 'smh-d2a',
            affinityChange: 2,
            itemId: 'manuscript-fragment-b'
          },
          {
            text: '有没有其他人也借过这些书？',
            next: 'smh-d2b',
            affinityChange: 1,
            clueId: 'su-minhua-statement'
          }
        ]
      },
      {
        id: 'smh-d2a',
        text: '禁书区……你倒是胆子大。罢了，看在守谦的份上。他失踪前一天来过禁书区，待了整整一个下午。管理员说他在翻一本一九二三年建馆时的老档案。你可以去看看，但只有三十分钟。',
        next: 'smh-d3',
        affinityChange: 2,
        itemId: 'manuscript-fragment-b'
      },
      {
        id: 'smh-d2b',
        text: '我查过了，只有陈先生借过这个组合。但有件事很蹊跷——有个借阅卡上登记的姓名被水渍模糊了，借书时间就在陈先生之前一个月。而且那人借的书目几乎一模一样。',
        next: 'smh-d3',
        affinityChange: 1,
        clueId: 'su-minhua-statement'
      },
      {
        id: 'smh-d3',
        text: '我再多告诉你一件事。陈先生失踪那晚，图书馆的警报响过一次。监控坏了，但保安说看到有人从侧门离开，手里抱着什么东西。我没有告诉过任何人——因为你是我见过的第一个真正想找到守谦的人。',
        options: [
          {
            text: '侧门？那通向哪里？',
            next: 'smh-d3a',
            affinityChange: 2,
            isKey: true,
            clueId: 'secret-letter-content'
          },
          {
            text: '苏馆长，你为什么愿意帮我？',
            next: 'smh-d3b',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'smh-d3a',
        text: '侧门外是印刷厂方向——那座废弃多年的印刷厂。守谦那晚带着手稿从图书馆侧门出去，往印刷厂方向走了。他从禁书区的档案里找到了某样东西，也许是印制密函的方法。',
        next: 'smh-d-end',
        affinityChange: 2,
        clueId: 'press-ink-trace'
      },
      {
        id: 'smh-d3b',
        text: '因为守谦是我见过的最认真的读者。他每次还书都比我要求的还要仔细，从不折角，从不沾水。这样的读者……值得有人去找他。',
        next: 'smh-d-end',
        affinityChange: 1
      },
      {
        id: 'smh-d-end',
        text: '天色不早了。闭馆时间已到，但你可以从侧门走——那边的路灯会为你亮着。',
        affinityChange: 0
      }
    ]
  },
  {
    id: 'he-zhenbang',
    name: '何振邦',
    title: '侦探',
    description: '四十岁上下的男子，风衣下摆永远沾着烟灰，眼神锐利如刀。在雾港旅馆已住半月，对外声称受委托调查失踪案，但委托人的身份始终成谜。',
    color: '#d4a574',
    dialogues: [
      {
        id: 'hzb-d1',
        text: '又一个对失踪案感兴趣的人？我这半个月见过太多这样的——好奇者、猎奇者、还有几个明显是被派来监视我的。你是哪一种？',
        options: [
          {
            text: '我是被一封匿名信引来的。我只想找到真相。',
            next: 'hzb-d1a',
            affinityChange: 2,
            isKey: true
          },
          {
            text: '你是受谁委托的？能告诉我吗？',
            next: 'hzb-d1b',
            affinityChange: 0
          },
          {
            text: '我掌握了些线索，也许可以交换信息。',
            next: 'hzb-d1c',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'hzb-d1a',
        text: '匿名信？给我看看……这信纸，和我在陈守谦房间里找到的一模一样。看来他确实在引导人来找他——但只有"对的人"。你已经通过了第一道考验。',
        next: 'hzb-d2',
        affinityChange: 2,
        clueId: 'he-zhenbang-notes',
        itemId: 'inn-key'
      },
      {
        id: 'hzb-d1b',
        text: '委托人身份保密，这是行规。不过我可以告诉你，委托人和陈守谦关系匪浅。此案绝非普通失踪——守谦失踪前有预谋地清理了住所，但刻意留下了线索。',
        next: 'hzb-d2',
        affinityChange: 0,
        clueId: 'he-zhenbang-notes'
      },
      {
        id: 'hzb-d1c',
        text: '有意思，你是第一个提出交换条件的人。好吧，先说说你有什么。',
        next: 'hzb-d2',
        affinityChange: 1,
        clueId: 'he-zhenbang-notes'
      },
      {
        id: 'hzb-d2',
        text: '我的调查笔记你大概已经看到了——此案绝非普通失踪。守谦的手稿被人拆分藏匿在不同地点，他是在设局。他在考验后来者的耐心和智慧，只有通过全部考验的人才能找到他。',
        options: [
          {
            text: '你找到印刷厂了吗？苏敏华说守谦那晚往印刷厂方向去了。',
            next: 'hzb-d2a',
            affinityChange: 2,
            clueId: 'press-ink-trace'
          },
          {
            text: '你觉得守谦还活着吗？',
            next: 'hzb-d2b',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'hzb-d2a',
        text: '印刷厂！我之前一直从旅馆方向追查，没想到图书馆那边也有线索。苏馆长告诉你侧门通向印刷厂？那就对了——守谦在那座废弃的印刷厂里印制了密函。密函里藏着找到他的关键。',
        next: 'hzb-d3',
        affinityChange: 2,
        itemId: 'printing-plate'
      },
      {
        id: 'hzb-d2b',
        text: '活着？……我调查过太多失踪案，大多数结局都不好。但这个案子不同。守谦留下的线索太精密了，一个死去的人不会留下这样的谜题。他一定还活着，在某个地方等着。',
        next: 'hzb-d3',
        affinityChange: 1
      },
      {
        id: 'hzb-d3',
        text: '我在旅馆207房间的地板下发现了一个暗格，里面有半块印刷模板。守谦在手稿里提到过"墨与火"——墨是手稿，火是印刷。他把真相藏在了文字与印刷的交汇处。',
        options: [
          {
            text: '墨与火……手稿加上印刷模板，就能揭示密函。',
            next: 'hzb-d3a',
            affinityChange: 2,
            isKey: true,
            itemId: 'printing-plate'
          },
          {
            text: '旅馆207房间——就是守谦住过的那间？',
            next: 'hzb-d3b',
            affinityChange: 1,
            itemId: 'inn-key'
          }
        ]
      },
      {
        id: 'hzb-d3a',
        text: '没错。手稿和印刷模板——这就是他设的最后一道谜题。密函一旦揭示，再配合灯塔密码，就能找到他的藏身之处。我查了半个月才走到这一步，你倒是一点就通。',
        next: 'hzb-d-end',
        affinityChange: 2
      },
      {
        id: 'hzb-d3b',
        text: '对，他用假名登记的，但笔迹我认得。房间里的东西都被清理了，唯独地板下的暗格里有这块模板——他刻意留下的。钥匙我给你，你自己去看看。',
        next: 'hzb-d-end',
        affinityChange: 1,
        itemId: 'inn-key'
      },
      {
        id: 'hzb-d-end',
        text: '此案接近尾声了。无论结局如何——找到他也好，找不到也好——真相总该有个交代。这是我做侦探二十年来最特别的一案。',
        affinityChange: 0
      }
    ]
  },
  {
    id: 'chen-shouqian',
    name: '陈守谦',
    title: '失踪作家',
    description: '雾港本土作家，以描写海上生活的小说闻名。三年前突然失踪，留下一部未完成的手稿。此刻以记忆或幻觉的形式出现，他的话语如雾般飘渺，真假难辨。',
    color: '#95a5a6',
    dialogues: [
      {
        id: 'csq-d1',
        text: '你终于来了。我等了很久……也许是一年，也许是更久。在灯塔的顶端，时间变得不再清晰。你知道我为什么留下那些线索吗？',
        options: [
          {
            text: '你想让人找到真相——但只有值得信任的人。',
            next: 'csq-d1a',
            affinityChange: 3,
            isKey: true,
            clueId: 'writer-hermit-mystery'
          },
          {
            text: '你在害怕什么？是谁让你不得不藏起来？',
            next: 'csq-d1b',
            affinityChange: 2
          },
          {
            text: '这一切……你真的在这里，还是我的幻觉？',
            next: 'csq-d1c',
            affinityChange: 1
          }
        ]
      },
      {
        id: 'csq-d1a',
        text: '你读到了我的遗稿。雾港的雾不是天生的——它被人刻意维持着，为了掩盖某些不该被遗忘的事。灯塔下面的洞穴里，藏着这座城市最黑暗的秘密。我发现了它，然后不得不躲起来。',
        next: 'csq-d2',
        affinityChange: 3,
        clueId: 'manuscript-disappearance-truth'
      },
      {
        id: 'csq-d1b',
        text: '害怕？……也许吧。但更多的是责任。我发现了一个真相，它关乎许多人的命运。如果我直接说出来，没有人会信——一个小说家的话能有多重？所以我选择了另一种方式：把真相写进故事里，让读者自己去找。',
        next: 'csq-d2',
        affinityChange: 2,
        clueId: 'manuscript-disappearance-truth'
      },
      {
        id: 'csq-d1c',
        text: '幻觉？也许在这个被雾笼罩的城市里，真实与虚幻本就没有明确的界限。你在旧书店摸到的书页，在码头闻到的海风，在图书馆翻到的档案——那些是真实的。而我现在对你说的这些话……你说呢？',
        next: 'csq-d2',
        affinityChange: 1
      },
      {
        id: 'csq-d2',
        text: '我把手稿拆成两半，分别藏在不同的人那里。我研究了灯塔的信号系统，用闪光向外界传递信息。我在印刷厂制作了密函——只有同时拥有手稿和模板的人才能看到隐藏的文字。',
        options: [
          {
            text: '你已经证明了真相的价值。跟我回去吧，雾港需要你。',
            next: 'csq-d2a',
            affinityChange: 3,
            isKey: true
          },
          {
            text: '你的遗稿会公之于世，真相不会再被埋没。',
            next: 'csq-d2b',
            affinityChange: 2
          }
        ]
      },
      {
        id: 'csq-d2a',
        text: '……回去？我离开太久了。但你说得对，雾终归要散的。我选择守望这座灯塔，是因为我害怕。但现在有人来了——你来了。也许守灯塔的不一定要是我。',
        affinityChange: 3,
        itemId: 'author-legacy'
      },
      {
        id: 'csq-d2b',
        text: '谢谢你。一个作家的作品能被认真对待，这是最大的安慰。我的遗稿在灯塔密室里——把它带出去吧。让所有人读到那个被掩埋的故事。',
        affinityChange: 2,
        itemId: 'author-legacy'
      }
    ]
  }
]
