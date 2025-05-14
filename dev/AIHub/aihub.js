/*! For license information please see gandi_ccw_aihub.07595257.js.LICENSE.txt */
(self.webpackChunkscratch_extensions = self.webpackChunkscratch_extensions || []).push([[6740], {
    97865: (e, t, n) => {
        "use strict";
        n.d(t, {
            U2: () => a,
            v_: () => r
        });
        var i = (0,
        n(7055).create)({
            timeout: 3e4,
            checkApiHostBasedPageRouting: !0,
            environment: "prod",
            apiVersion: "1.1",
            withCredentials: !0
        });
        i.use((function(e, t) {
            t.use((function(e) {
                if (200 != +e.data.status) {
                    var t = e.config
                      , n = t.skipErrorHandler
                      , i = t.skipErrorCodes;
                    n || (void 0 === i ? [] : i).includes(e.data.code) || function(e) {
                        var t = e.data
                          , n = t.code
                          , i = t.msg;
                        throw new Error("Request Error： code: ".concat(n, ", msg: ").concat(i))
                    }(e)
                }
                return e.config.skipTransformResponse ? e.data : e.data.body
            }
            ))
        }
        ));
        var a = i.get
          , r = (i.put,
        i.post);
        i.patch,
        i.delete
    }
    ,
    63177: (e, t, n) => {
        "use strict";
        n.r(t),
        n.d(t, {
            default: () => _
        });
        var i = n(80673)
          , a = n.n(i)
          , r = n(29122)
          , o = n.n(r)
          , s = n(2443)
          , u = {
            name: "AI Hub",
            document: "📖 Document",
            documentURL: "https://getgandi.com/extensions/ai-hub",
            divNotice: "📢 currently free, future charges possible.",
            divChatBot: "🤪 GPT Chatbot",
            maxCloner: "variable [MAX], sprites [SPRITES], list [LIST], variables [VARS]",
            menuLangFollowChat: "[Follow the Chat]",
            menuTraitsHonest: "🟢 Honest",
            menuTraitsLoyal: "🔒 Loyal",
            menuTraitsKind: "😊 Kind",
            menuTraitsAmbitious: "🚀 Ambitious",
            menuTraitsResponsible: "🤝 Responsible",
            menuTraitsConfident: "😎 Confident",
            menuTraitsCreative: "🎨 Creative",
            menuTraitsOptimistic: "😃 Optimistic",
            menuTraitsAdaptable: "🌊 Adaptable",
            menuTraitsPatient: "🕰️ Patient",
            menuTraitsMean: "😠 Mean",
            menuRolesGameNPC: "🧑‍🎤 Game NPC",
            menuRolesRobot: "🤖 Robot",
            menuRolesProgrammer: "🧑‍💻 Programmer",
            menuRolesPhilosopherPlato: "😈 Philosopher Plato",
            menuRolesAstronaut: "👨‍🚀 Astronaut",
            menuRolesArtist: "👩‍🎨 Artist",
            menuRolesScientist: "👩‍🔬 Scientist",
            menuRolesDoctor: "👨‍⚕️ Doctor",
            menuRolesChef: "👩‍🍳 Chef",
            menuRolesWriter: "👩‍💻 Writer",
            menuExpressionScientist: "🔬 Scientist, Communicates with a scientific mindset, employing evidence and reasoning to support ideas",
            menuExpressionActor: "🎭 Actor, Communicates with heightened expressiveness and empathy, embodying various emotions",
            menuExpressionComedian: "😄 Comedian, Communicates through humor, attempting to elicit laughter with witty remarks and jokes",
            menuExpressionPsychologist: "🧠 Psychologist, Communicates by focusing on emotions and analyzing thoughts, feelings, and behavior",
            menuExpressionDetective: "🔍 Detective, Communicates by prioritizing observations, evidence, and logical deductions to reach conclusions",
            menuExpressionJournalist: "🗞️ Journalist, Communicates by reporting news and current events, delivering information in an unbiased manner",
            menuExpressionTeacher: "👩‍🏫 Teacher, Communicates by imparting knowledge and instructing, using pedagogical techniques",
            menuExpressionEngineer: "🔧 Engineer, Communicates with a practical and technical approach, employing problem-solving strategies",
            menuExpressionEconomist: "💰 Economist, Communicates with a focus on economic principles, analyzing markets and financial trends",
            menuExpressionHistorian: "📜 Historian, Communicates by examining and interpreting past events, utilizing historical evidence",
            menuExpressionLawyer: "⚖️ Lawyer, Communicates through legal analysis, citing laws and precedents to build arguments",
            menuExpressionMusician: "🎵 Musician, Communicates through musical expression, using rhythm and melody to convey emotions",
            menuExpressionArchitect: "🏛️ Architect, Communicates through the design and construction of buildings, expressing ideas through structures",
            menuExpressionEntrepreneur: "💼 Entrepreneur, Communicates with a business-oriented mindset, focusing on innovation and opportunity",
            menuExpressionSocialActivist: "✊ Social Activist, Communicates with a passion for social change, advocating for justice and equality",
            menuExpressionBiologist: "🌱 Biologist, Communicates by studying living organisms and their interactions, delving into the wonders of life",
            menuExpressionLinguist: "🗣️ Linguist, Communicates by analyzing language structures and linguistic diversity, exploring the power of words",
            menuExpressionAthlete: "🏅 Athlete, Communicates through physical prowess, expressing actions and achievements in sports",
            menuExpressionAstronomer: "🌌 Astronomer, Communicates with a focus on celestial bodies and the universe, exploring cosmic phenomena",
            menuExpressionPoet: "📝 Poet, Communicates through rhyme and poetic language, expressing emotions and ideas poetically",
            menuExpressionStylist: "💇 Stylist, Communicates in terms of popular culture, utilizing trendy terminology",
            menuExpressionPhilosopher: "🤔 Philosopher, Communicates using abstract categories and engages in philosophical discourse",
            menuExpressionChef: "👨‍🍳 Chef, Communicates through culinary expertise, describing flavors, techniques, and food pairings",
            menuExpressionEnvironmentalist: "🌿 Environmentalist, Communicates with a focus on environmental factors, emphasizing impact on nature",
            menuExpressionPhysician: "👨‍⚕️ Physician, Communicates with medical expertise, explaining diagnoses, treatments, and healthcare practices",
            menuExpressionDiplomat: "🌍 Diplomat, Communicates through diplomatic negotiations and international relations, fostering dialogue between nations",
            menuExpressionFilmmaker: "🎥 Filmmaker, Communicates through visual storytelling, using film as a medium to evoke emotions and convey ideas",
            menuExpressionAnthropologist: "🌍 Anthropologist, Communicates by studying human cultures and societies, uncovering insights into diverse communities",
            menuTalkLikeNormalPeople: "😺 Normal People",
            menuTalkLikeGeek: "🧑‍💻 Geek",
            menuTalkLikeSteveJobs: "🍏 Steve Jobs",
            menuTalkLikeMarvinH2G2: "🤖 Marvin (H2G2)",
            menuTalkLikeDonkeyShrek: "🐴 Donkey (Shrek)",
            menuTalkLikeYoda: "🟢 Yoda",
            menuTalkLikeSherlockHolmes: "🔍 Sherlock Holmes",
            menuTalkLikeWinstonChurchill: "🇬🇧 Winston Churchill",
            menuTalkLikeDumbledore: "🧙‍♂️ Dumbledore",
            menuTalkLikeGandalf: "🧙‍♂️ Gandalf",
            menuTalkLikeDracula: "🧛‍♂️ Dracula",
            menuTalkLikeTonyStark: "🛡️ Tony Stark",
            menuTalkLikeMorganFreeman: "🎤 Morgan Freeman",
            menuTalkLikeWilliamShakespeare: "📜 William Shakespeare",
            menuTalkLikeOscarWilde: "📚 Oscar Wilde",
            menuTalkLikeDarthVader: "🌑 Darth Vader",
            menuTalkLikeBane: "💀 Bane",
            menuTalkLikeJoker: "🃏 Joker",
            menuTalkLikeBugsBunny: "🐰 Bugs Bunny",
            menuTalkLikeForrestGump: "🏃‍♂️ Forrest Gump",
            menuTalkLikeVoldemort: "🐍 Voldemort",
            menuTalkLikeElonMusk: "🚀 Elon Musk",
            menuTalkLikeMrBean: "🤪 Mr. Bean",
            menuTalkLikeCaptainJackSparrow: "🏴‍☠️ Captain Jack Sparrow",
            menuTalkLikeFerrisBueller: "😎 Ferris Bueller",
            menuTalkLikeAryaStark: "⚔️ Arya Stark",
            menuTalkLikeRonSwanson: "🥩 Ron Swanson",
            menuTalkLikeChandlerBing: "😅 Chandler Bing",
            menuTalkLikeWalterWhite: "🔬 Walter White",
            menuTalkLikeDeadpool: "🔴 Deadpool",
            menuTalkLikeDrHouse: "💊 Dr. House",
            menuTalkLikeHannibalLecter: "🍽️ Hannibal Lecter",
            menuTalkLikeAlbertEinstein: "🧠 Albert Einstein",
            menuTalkLikeMarieCurie: "🔬 Marie Curie",
            menuTalkLikeNeilDeGrasseTyson: "🌌 Neil deGrasse Tyson",
            menuTalkLikeMerylStreep: "🎭 Meryl Streep",
            menuTalkLikeLeonardoDiCaprio: "🌟 Leonardo DiCaprio",
            menuTalkLikeViolaDavis: "🎬 Viola Davis",
            menuTalkLikeEllenDeGeneres: "😄 Ellen DeGeneres",
            menuTalkLikeKevinHart: "🤣 Kevin Hart",
            menuTalkLikeAmySchumer: "😂 Amy Schumer",
            menuTalkLikeSigmundFreud: "🕵️‍♂️ Sigmund Freud",
            menuTalkLikeCarlJung: "🔮 Carl Jung",
            menuTalkLikeElizabethLoftus: "🧩 Elizabeth Loftus",
            menuTalkLikeHerculePoirot: "🔎 Hercule Poirot",
            menuTalkLikeVeronicaMars: "🕵️‍♀️ Veronica Mars",
            menuTalkLikeAndersonCooper: "🎙️ Anderson Cooper",
            menuTalkLikeChristianeAmanpour: "🗞️ Christiane Amanpour",
            menuTalkLikeRachelMaddow: "📺 Rachel Maddow",
            menuTalkLikeMichelleRhee: "👩‍🏫 Michelle Rhee",
            menuTalkLikeJaimeEscalante: "📚 Jaime Escalante",
            menuTalkLikeSirKenRobinson: "🌈 Sir Ken Robinson",
            menuTalkLikeNikolaTesla: "⚡ Nikola Tesla",
            menuTalkLikeThomasEdison: "💡 Thomas Edison",
            menuTalkLikeAdamSmith: "💵 Adam Smith",
            menuTalkLikeJohnMaynardKeynes: "💲 John Maynard Keynes",
            menuTalkLikeMiltonFriedman: "📈 Milton Friedman",
            menuTalkLikeHerodotus: "📜 Herodotus",
            menuTalkLikeEdwardGibbon: "🏛️ Edward Gibbon",
            menuTalkLikeHowardZinn: "📖 Howard Zinn",
            menuTalkLikeRuthBaderGinsburg: "⚖️ Ruth Bader Ginsburg",
            menuTalkLikeThurgoodMarshall: "🏛️ Thurgood Marshall",
            menuTalkLikeAlanDershowitz: "🎤 Alan Dershowitz",
            menuTalkLikeLudwigVanBeethoven: "🎶 Ludwig van Beethoven",
            menuTalkLikeBeyonce: "🎤 Beyoncé",
            menuTalkLikeBobDylan: "🎸 Bob Dylan",
            menuTalkLikeFrankLloydWright: "🏢 Frank Lloyd Wright",
            menuTalkLikeZahaHadid: "🏗️ Zaha Hadid",
            menuTalkLikeIMPei: "🏛️ I. M. Pei",
            menuTalkLikeOprahWinfrey: "📺 Oprah Winfrey",
            menuTalkLikeMartinLutherKingJr: "✊ Martin Luther King Jr.",
            menuTalkLikeMalalaYousafzai: "🎓 Malala Yousafzai",
            menuTalkLikeGretaThunberg: "🌍 Greta Thunberg",
            menuTalkLikeCharlesDarwin: "🐦 Charles Darwin",
            menuTalkLikeJaneGoodall: "🐒 Jane Goodall",
            menuTalkLikeGregorMendel: "🌱 Gregor Mendel",
            menuTalkLikeNoamChomsky: "🗣️ Noam Chomsky",
            menuTalkLikeFerdinandDeSaussure: "🔠 Ferdinand de Saussure",
            menuTalkLikeStevenPinker: "📚 Steven Pinker",
            menuTalkLikeSerenaWilliams: "🎾 Serena Williams",
            menuTalkLikeUsainBolt: "🏃 Usain Bolt",
            menuTalkLikeMichaelJordan: "🏀 Michael Jordan",
            menuTalkLikeGalileoGalilei: "🔭 Galileo Galilei",
            menuTalkLikeCarlSagan: "🌌 Carl Sagan",
            menuTalkLikeVeraRubin: "✨ Vera Rubin",
            menuTalkLikeEmilyDickinson: "📜 Emily Dickinson",
            menuTalkLikeMayaAngelou: "🖋️ Maya Angelou",
            menuTalkLikeAnnaWintour: "👠 Anna Wintour",
            menuTalkLikeEdwardEnninful: "🧥 Edward Enninful",
            menuTalkLikeRachelZoe: "👗 Rachel Zoe",
            menuTalkLikePlato: "🏛️ Plato",
            menuTalkLikeFriedrichNietzsche: "🔨 Friedrich Nietzsche",
            menuTalkLikeSimoneDeBeauvoir: "👁️‍🗨️ Simone de Beauvoir",
            menuTalkLikeJuliaChild: "🍳 Julia Child",
            menuTalkLikeGordonRamsay: "🍽️ Gordon Ramsay",
            menuTalkLikeAnthonyBourdain: "🌍 Anthony Bourdain",
            menuTalkLikeJaneGoodall2: "🐒 Jane Goodall",
            menuTalkLikeWangariMaathai: "🌳 Wangari Maathai",
            menuTalkLikeDrAnthonyFauci: "💉 Dr. Anthony Fauci",
            menuTalkLikeKofiAnnan: "🤝 Kofi Annan",
            menuTalkLikeMadeleineAlbright: "🌍 Madeleine Albright",
            menuTalkLikeBanKiMoon: "🇺🇳 Ban Ki-moon",
            menuTalkLikeStevenSpielberg: "🎥 Steven Spielberg",
            menuTalkLikeAvaDuVernay: "🎬 Ava DuVernay",
            menuTalkLikeMartinScorsese: "🎞️ Martin Scorsese",
            menuTalkLikeMargaretMead: "🌺 Margaret Mead",
            menuTalkLikeClaudeLeviStrauss: "📚 Claude Lévi-Strauss",
            menuTalkLikeFranzBoas: "👥 Franz Boas",
            menuTasksAnswerQuestions: "❓ Answer questions",
            menuTasksSaleUserSomething: "🛒 Sale user something",
            menuTasksProvideUserAdvice: "👨‍💼 Provide user advice",
            menuTasksCompleteChallenges: "🏆 Complete challenges",
            menuTasksTeachSkill: "👩‍🏫 Teach a skill",
            menuTasksCreateContent: "✍️ Create content",
            menuTasksSolveProblem: "💡 Solve a problem",
            menuTasksProvideEntertainment: "🎭 Provide entertainment",
            menuTasksOrganizeEvent: "🎉 Organize an event",
            menuTasksDevelopSoftware: "💻 Develop software",
            menuTasksRolePlay: "🎭 Role play",
            menuTasksMockUser: "😈 Mock user",
            menuTasksInspireUser: "💡 Inspire user",
            setChatLanguage: "set the chat language to [LANG]",
            setGameWorldBackground: "set the background of the game world: [TEXT]",
            buildPersona: "(❌DEPRECATED)create a [TRAITS][PERSONA], talk like a [TALK_LIKE], named [NAME]",
            buildPersonaInField: "create a [TRAITS][EXPRESSION], named [NAME]",
            setTone: "[NAME] will adopt the speaking style of [TALK_LIKE]",
            setSelfRole: "user/player plays [ROLE], called [NAME], background info [BG]",
            updateTask: "the task of [NAME] is [TASK]",
            setUserTask: "the task of user/player is [TASK]",
            updatePersona: "update [NAME] background info [BG]",
            resetContext: "reset context of [NAME]",
            setContextLength: "set context length of [NAME] to [LEN]",
            sendTextPrompt: "chat with [NAME]: [TEXT] and wait",
            sendTextPromptAsync: "chat with [NAME]: [TEXT] async, with an event ID [EVENT_ID]",
            dispatchWhenMessageReceived: "when [name] [respond], with [eventId]",
            divGlobal: "　🌎 Global",
            divAssistant: "　🤖 Assistant/AI",
            divUser: "　👤 Player/Hero",
            divChat: "　💬 Chat"
        }
          , l = {
            name: "AI Hub",
            document: "📖 文档",
            documentURL: "https://dev.ccw.site/extensions/aihub",
            divNotice: "📢 内测阶段免费，未来可能会产生费用",
            divChatBot: "🤪 GPT 聊天机器人",
            maxCloner: "variable [MAX], sprites [SPRITES], list [LIST], variables [VARS]",
            menuLangFollowChat: "[跟随聊天]",
            menuTraitsHonest: "🟢 诚实",
            menuTraitsLoyal: "🔒 忠诚",
            menuTraitsKind: "😊 善良",
            menuTraitsAmbitious: "🚀 有抱负",
            menuTraitsResponsible: "🤝 负责任",
            menuTraitsConfident: "😎 自信",
            menuTraitsCreative: "🎨 富有创造力",
            menuTraitsOptimistic: "😃 乐观",
            menuTraitsAdaptable: "🌊 适应力强",
            menuTraitsPatient: "🕰️ 耐心",
            menuTraitsMean: "😠 刻薄",
            menuRolesGameNPC: "🧑‍🎤 游戏 NPC",
            menuRolesRobot: "🤖 机器人",
            menuRolesProgrammer: "🧑‍💻 程序员",
            menuRolesPhilosopherPlato: "😈 哲学家柏拉图",
            menuRolesAstronaut: "👨‍🚀 宇航员",
            menuRolesArtist: "👩‍🎨 艺术家",
            menuRolesScientist: "👩‍🔬 科学家",
            menuRolesDoctor: "👨‍⚕️ 医生",
            menuRolesChef: "👩‍🍳 厨师",
            menuRolesWriter: "👩‍💻 作家",
            menuTalkLikeNormalPeople: "😺 普通人",
            menuTalkLikeGeek: "🧑‍💻 极客",
            menuTalkLikeSteveJobs: "🍏 史蒂夫·乔布斯",
            menuTalkLikeMarvinH2G2: "🤖 马文（银河系漫游指南）",
            menuTalkLikeDonkeyShrek: "🐴 驴子（怪物史瑞克）",
            menuTalkLikeYoda: "🟢 尤达",
            menuTalkLikeSherlockHolmes: "🔍 夏洛克·福尔摩斯",
            menuTalkLikeWinstonChurchill: "🇬🇧 温斯顿·丘吉尔",
            menuTalkLikeDumbledore: "🧙‍♂️ 邓布利多",
            menuTalkLikeGandalf: "🧙‍♂️ 甘道夫",
            menuTalkLikeDracula: "🧛‍♂️ 德古拉",
            menuTalkLikeTonyStark: "🛡️ 托尼·斯塔克",
            menuTalkLikeMorganFreeman: "🎤 摩根·弗里曼",
            menuTalkLikeWilliamShakespeare: "📜 威廉·莎士比亚",
            menuTalkLikeOscarWilde: "📚 奥斯卡·王尔德",
            menuTalkLikeDarthVader: "🌑 达斯·维达",
            menuTalkLikeBane: "💀 贝恩",
            menuTalkLikeJoker: "🃏 小丑",
            menuTalkLikeBugsBunny: "🐰 兔八哥",
            menuTalkLikeForrestGump: "🏃‍♂️ 阿甘",
            menuTalkLikeVoldemort: "🐍 伏地魔",
            menuTalkLikeElonMusk: "🚀 埃隆·马斯克",
            menuTalkLikeMrBean: "🤪 憨豆先生",
            menuTalkLikeCaptainJackSparrow: "🏴‍☠️ 杰克船长",
            menuTalkLikeFerrisBueller: "😎 费里斯·布里尔",
            menuTalkLikeAryaStark: "⚔️ 艾莉亚·史塔克",
            menuTalkLikeRonSwanson: "🥩 罗恩·斯旺森",
            menuTalkLikeChandlerBing: "😅 钱德勒·宾",
            menuTalkLikeWalterWhite: "🔬 沃尔特·怀特",
            menuTalkLikeDeadpool: "🔴 死侍",
            menuTalkLikeDrHouse: "💊 豪斯医生",
            menuTalkLikeHannibalLecter: "🍽️ 汉尼拔·莱克特",
            menuTalkLikeAlbertEinstein: "🧠 阿尔伯特·爱因斯坦",
            menuTalkLikeMarieCurie: "🔬 玛丽·居里",
            menuTalkLikeNeilDeGrasseTyson: "🌌 尼尔·德格拉斯·泰森",
            menuTalkLikeMerylStreep: "🎭 梅丽尔·斯特里普",
            menuTalkLikeLeonardoDiCaprio: "🌟 莱昂纳多·迪卡普里奥",
            menuTalkLikeViolaDavis: "🎬 维奥拉·戴维斯",
            menuTalkLikeEllenDeGeneres: "😄 艾伦·德杰尼勒斯",
            menuTalkLikeKevinHart: "🤣 凯文·哈特",
            menuTalkLikeAmySchumer: "😂 艾米·舒默",
            menuTalkLikeSigmundFreud: "🕵️‍♂️ 西格蒙德·弗洛伊德",
            menuTalkLikeCarlJung: "🔮 卡尔·荣格",
            menuTalkLikeElizabethLoftus: "🧩 伊丽莎白·洛夫特斯",
            menuTalkLikeHerculePoirot: "🔎 赫尔克勒·波洛",
            menuTalkLikeVeronicaMars: "🕵️‍♀️ 维罗尼卡·马尔斯",
            menuTalkLikeAndersonCooper: "🎙️ 安德森·库珀",
            menuTalkLikeChristianeAmanpour: "🗞️ 克里斯蒂安·阿曼普尔",
            menuTalkLikeRachelMaddow: "📺 瑞秋·马多",
            menuTalkLikeMichelleRhee: "👩‍🏫 米歇尔·里",
            menuTalkLikeJaimeEscalante: "📚 赫迈·埃斯卡兰特",
            menuTalkLikeSirKenRobinson: "🌈 肯·罗宾逊爵士",
            menuTalkLikeNikolaTesla: "⚡ 尼古拉·特斯拉",
            menuTalkLikeThomasEdison: "💡 托马斯·爱迪生",
            menuTalkLikeAdamSmith: "💵 亚当·斯密",
            menuTalkLikeJohnMaynardKeynes: "💲 约翰·梅纳德·凯恩斯",
            menuTalkLikeMiltonFriedman: "📈 弥尔顿·弗里德曼",
            menuTalkLikeHerodotus: "📜 赫罗多德",
            menuTalkLikeEdwardGibbon: "🏛️ 爱德华·吉本",
            menuTalkLikeHowardZinn: "📖 霍华德·津恩",
            menuTalkLikeRuthBaderGinsburg: "⚖️ 露丝·巴德·金斯伯格",
            menuTalkLikeThurgoodMarshall: "🏛️ 瑟古德·马歇尔",
            menuTalkLikeAlanDershowitz: "🎤 艾伦·德肖维茨",
            menuTalkLikeLudwigVanBeethoven: "🎶 路德维希·范·贝多芬",
            menuTalkLikeBeyonce: "🎤 碧昂丝",
            menuTalkLikeBobDylan: "🎸 鲍勃·迪伦",
            menuTalkLikeFrankLloydWright: "🏢 弗兰克·劳埃德·赖特",
            menuTalkLikeZahaHadid: "🏗️ 扎哈·哈迪德",
            menuTalkLikeIMPei: "🏛️ 贝聿铭",
            menuTalkLikeOprahWinfrey: "📺 奥普拉·温弗瑞",
            menuTalkLikeMartinLutherKingJr: "✊ 马丁·路德·金",
            menuTalkLikeMalalaYousafzai: "🎓 玛拉拉·优素福扎伊",
            menuTalkLikeGretaThunberg: "🌍 格蕾塔·桑伯格",
            menuTalkLikeCharlesDarwin: "🐦 查尔斯·达尔文",
            menuTalkLikeJaneGoodall: "🐒 简·古道尔",
            menuTalkLikeGregorMendel: "🌱 格雷戈尔·孟德尔",
            menuTalkLikeNoamChomsky: "🗣️ 诺姆·乔姆斯基",
            menuTalkLikeFerdinandDeSaussure: "🔠 费迪南德·索绪尔",
            menuTalkLikeStevenPinker: "📚 斯蒂芬·平克",
            menuTalkLikeSerenaWilliams: "🎾 塞雷娜·威廉姆斯",
            menuTalkLikeUsainBolt: "🏃 尤塞恩·博尔特",
            menuTalkLikeMichaelJordan: "🏀 迈克尔·乔丹",
            menuTalkLikeGalileoGalilei: "🔭 伽利略·伽利雷",
            menuTalkLikeCarlSagan: "🌌 卡尔·萨根",
            menuTalkLikeVeraRubin: "✨ 维拉·鲁宾",
            menuTalkLikeEmilyDickinson: "📜 艾米莉·狄金森",
            menuTalkLikeMayaAngelou: "🖋️ 玛雅·安杰洛",
            menuTalkLikeAnnaWintour: "👠 安娜·温图尔",
            menuTalkLikeEdwardEnninful: "🧥 爱德华·恩尼菲尔",
            menuTalkLikeRachelZoe: "👗 瑞秋·佐伊",
            menuTalkLikePlato: "🏛️ 柏拉图",
            menuTalkLikeFriedrichNietzsche: "🔨 弗里德里希·尼采",
            menuTalkLikeSimoneDeBeauvoir: "👁️‍🗨️ 西蒙娜·德·博伏瓦",
            menuTalkLikeJuliaChild: "🍳 朱莉娅·查尔德",
            menuTalkLikeGordonRamsay: "🍽️ 戈登·拉姆齐",
            menuTalkLikeAnthonyBourdain: "🌍 安东尼·波登",
            menuTalkLikeJaneGoodall2: "🐒 简·古道尔",
            menuTalkLikeWangariMaathai: "🌳 旺嘉丽·玛塔伊",
            menuTalkLikeDrAnthonyFauci: "💉 安东尼·福奇博士",
            menuTalkLikeKofiAnnan: "🤝 科菲·安南",
            menuTalkLikeMadeleineAlbright: "🌍 麦德琳·奥尔布赖特",
            menuTalkLikeBanKiMoon: "🇺🇳 潘基文",
            menuTalkLikeStevenSpielberg: "🎥 史蒂文·斯皮尔伯格",
            menuTalkLikeAvaDuVernay: "🎬 艾娃·杜鲁内",
            menuTalkLikeMartinScorsese: "🎞️ 马丁·斯科塞斯",
            menuTalkLikeMargaretMead: "🌺 玛格丽特·米德",
            menuTalkLikeClaudeLeviStrauss: "📚 克洛德·莱维-斯特劳斯",
            menuTalkLikeFranzBoas: "👥 弗朗茨·波亚斯",
            menuExpressionScientist: "🔬 科学家，以科学思维进行沟通，通过证据和推理支持观点",
            menuExpressionActor: "🎭 演员，以高度表现力和共情沟通，扮演各种情绪",
            menuExpressionComedian: "😄 喜剧演员，通过幽默来沟通，试图通过机智的言辞和笑话引发笑声",
            menuExpressionPsychologist: "🧠 心理学家，通过专注情绪和分析思维、情感和行为来沟通",
            menuExpressionDetective: "🔍 侦探，通过优先观察、证据和逻辑推断来沟通，以得出结论",
            menuExpressionJournalist: "🗞️ 记者，以中立的方式报道新闻和时事，传递信息",
            menuExpressionTeacher: "👩‍🏫 教师，通过传授知识和指导，使用教学技巧进行沟通",
            menuExpressionEngineer: "🔧 工程师，以实际和技术方法进行沟通，运用解决问题的策略",
            menuExpressionEconomist: "💰 经济学家，以经济原理为重点，分析市场和金融趋势",
            menuExpressionHistorian: "📜 历史学家，通过研究和解释过去的事件，利用历史证据进行沟通",
            menuExpressionLawyer: "⚖️ 律师，通过法律分析，引用法律和先例来构建论据",
            menuExpressionMusician: "🎵 音乐家，通过音乐表达来进行沟通，使用节奏和旋律传达情感",
            menuExpressionArchitect: "🏛️ 建筑师，通过设计和建造建筑物来进行沟通，通过结构表达思想",
            menuExpressionEntrepreneur: "💼 创业者，以商业导向的思维进行沟通，专注创新和机会",
            menuExpressionSocialActivist: "✊ 社会活动家，以推动社会变革的热情进行沟通，倡导正义和平等",
            menuExpressionBiologist: "🌱 生物学家，通过研究生物和它们的相互作用进行沟通，深入探索生命的奇迹",
            menuExpressionLinguist: "🗣️ 语言学家，通过分析语言结构和语言多样性进行沟通，探索词语的力量",
            menuExpressionAthlete: "🏅 运动员，通过身体的力量进行沟通，在体育中表达行动和成就",
            menuExpressionAstronomer: "🌌 天文学家，以天体和宇宙为重点进行沟通，探索宇宙现象",
            menuExpressionPoet: "📝 诗人，通过韵律和诗意的语言进行沟通，以诗歌形式表达情感和思想",
            menuExpressionStylist: "💇 造型师，以流行文化的术语进行沟通，利用时尚术语",
            menuExpressionPhilosopher: "🤔 哲学家，通过抽象的概念进行沟通，进行哲学论述",
            menuExpressionChef: "👨‍🍳 厨师，通过烹饪技巧进行沟通，描述口味、技术和食物搭配",
            menuExpressionEnvironmentalist: "🌿 环保主义者，以环境因素为重点进行沟通，强调对自然的影响",
            menuExpressionPhysician: "👨‍⚕️ 医生，以医学专业知识进行沟通，解释诊断、治疗和医疗实践",
            menuExpressionDiplomat: "🌍 外交官，通过外交谈判和国际关系进行沟通，促进国家间的对话",
            menuExpressionFilmmaker: "🎥 电影制片人，通过视觉叙事进行沟通，利用电影作为媒介引发情感和传达思想",
            menuExpressionAnthropologist: "🌍 人类学家，通过研究人类文化和社会进行沟通，揭示多样化社群的见解",
            menuTasksAnswerQuestions: "❓ 回答问题",
            menuTasksSaleUserSomething: "🛒 销售产品",
            menuTasksProvideUserAdvice: "👨‍💼 提供建议",
            menuTasksCompleteChallenges: "🏆 完成挑战",
            menuTasksTeachSkill: "👩‍🏫 教授技能",
            menuTasksCreateContent: "✍️ 创作内容",
            menuTasksSolveProblem: "💡 解决问题",
            menuTasksProvideEntertainment: "🎭 提供娱乐",
            menuTasksOrganizeEvent: "🎉 组织活动",
            menuTasksDevelopSoftware: "💻 开发软件",
            menuTasksRolePlay: "🎭 角色扮演",
            menuTasksMockUser: "😈 嘲讽用户",
            menuTasksInspireUser: "💡 激励用户",
            setChatLanguage: "设置聊天语言为 [LANG]",
            setGameWorldBackground: "设置游戏世界的背景为 [TEXT]",
            buildPersona: "(❌过时的用法)创建一个[TRAITS]的[PERSONA]，说话方式像[TALK_LIKE]，命名为 [NAME]",
            buildPersonaInField: "创建一个[TRAITS]的[EXPRESSION]，命名为 [NAME]",
            setTone: "让 [NAME] 模仿 [TALK_LIKE] 的语气说话",
            setSelfRole: "玩家/主角扮演 [ROLE] 的角色，名字叫做 [NAME]，背景信息为 [BG]",
            updateTask: "[NAME] 的任务是 [TASK]",
            setUserTask: "玩家/主角的任务是 [TASK]",
            updatePersona: "更新 [NAME] 的背景信息为 [BG]",
            resetContext: "重置 [NAME] 的上下文（重新对话）",
            setContextLength: "设置 [NAME] 的上下文长度为 [LEN]",
            sendTextPrompt: "与 [NAME] 聊天：[TEXT] 并等待",
            sendTextPromptAsync: "异步与 [NAME] 聊天：[TEXT]，事件 ID 为 [EVENT_ID]",
            dispatchWhenMessageReceived: "当 [name] 回复 [respond] 时，事件 ID 为 [eventId]",
            divGlobal: "　🌎 全局",
            divAssistant: "　🤖 AI助手",
            divUser: "　👤 玩家/主角",
            divChat: "　💬 聊天"
        }
          , m = n(49576)
          , c = n(74138)
          , h = n(81354)
          , k = n.n(h)
          , d = n(97865);
        function p(e) {
            return p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            p(e)
        }
        function f() {
            f = function() {
                return e
            }
            ;
            var e = {}
              , t = Object.prototype
              , n = t.hasOwnProperty
              , i = Object.defineProperty || function(e, t, n) {
                e[t] = n.value
            }
              , a = "function" == typeof Symbol ? Symbol : {}
              , r = a.iterator || "@@iterator"
              , o = a.asyncIterator || "@@asyncIterator"
              , s = a.toStringTag || "@@toStringTag";
            function u(e, t, n) {
                return Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }),
                e[t]
            }
            try {
                u({}, "")
            } catch (e) {
                u = function(e, t, n) {
                    return e[t] = n
                }
            }
            function l(e, t, n, a) {
                var r = t && t.prototype instanceof h ? t : h
                  , o = Object.create(r.prototype)
                  , s = new M(a || []);
                return i(o, "_invoke", {
                    value: E(e, n, s)
                }),
                o
            }
            function m(e, t, n) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, n)
                    }
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    }
                }
            }
            e.wrap = l;
            var c = {};
            function h() {}
            function k() {}
            function d() {}
            var v = {};
            u(v, r, (function() {
                return this
            }
            ));
            var g = Object.getPrototypeOf
              , T = g && g(g(w([])));
            T && T !== t && n.call(T, r) && (v = T);
            var y = d.prototype = h.prototype = Object.create(v);
            function L(e) {
                ["next", "throw", "return"].forEach((function(t) {
                    u(e, t, (function(e) {
                        return this._invoke(t, e)
                    }
                    ))
                }
                ))
            }
            function x(e, t) {
                function a(i, r, o, s) {
                    var u = m(e[i], e, r);
                    if ("throw" !== u.type) {
                        var l = u.arg
                          , c = l.value;
                        return c && "object" == p(c) && n.call(c, "__await") ? t.resolve(c.__await).then((function(e) {
                            a("next", e, o, s)
                        }
                        ), (function(e) {
                            a("throw", e, o, s)
                        }
                        )) : t.resolve(c).then((function(e) {
                            l.value = e,
                            o(l)
                        }
                        ), (function(e) {
                            return a("throw", e, o, s)
                        }
                        ))
                    }
                    s(u.arg)
                }
                var r;
                i(this, "_invoke", {
                    value: function(e, n) {
                        function i() {
                            return new t((function(t, i) {
                                a(e, n, t, i)
                            }
                            ))
                        }
                        return r = r ? r.then(i, i) : i()
                    }
                })
            }
            function E(e, t, n) {
                var i = "suspendedStart";
                return function(a, r) {
                    if ("executing" === i)
                        throw new Error("Generator is already running");
                    if ("completed" === i) {
                        if ("throw" === a)
                            throw r;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    for (n.method = a,
                    n.arg = r; ; ) {
                        var o = n.delegate;
                        if (o) {
                            var s = b(o, n);
                            if (s) {
                                if (s === c)
                                    continue;
                                return s
                            }
                        }
                        if ("next" === n.method)
                            n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if ("suspendedStart" === i)
                                throw i = "completed",
                                n.arg;
                            n.dispatchException(n.arg)
                        } else
                            "return" === n.method && n.abrupt("return", n.arg);
                        i = "executing";
                        var u = m(e, t, n);
                        if ("normal" === u.type) {
                            if (i = n.done ? "completed" : "suspendedYield",
                            u.arg === c)
                                continue;
                            return {
                                value: u.arg,
                                done: n.done
                            }
                        }
                        "throw" === u.type && (i = "completed",
                        n.method = "throw",
                        n.arg = u.arg)
                    }
                }
            }
            function b(e, t) {
                var n = e.iterator[t.method];
                if (void 0 === n) {
                    if (t.delegate = null,
                    "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return",
                        t.arg = void 0,
                        b(e, t),
                        "throw" === t.method))
                            return c;
                        t.method = "throw",
                        t.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return c
                }
                var i = m(n, e.iterator, t.arg);
                if ("throw" === i.type)
                    return t.method = "throw",
                    t.arg = i.arg,
                    t.delegate = null,
                    c;
                var a = i.arg;
                return a ? a.done ? (t[e.resultName] = a.value,
                t.next = e.nextLoc,
                "return" !== t.method && (t.method = "next",
                t.arg = void 0),
                t.delegate = null,
                c) : a : (t.method = "throw",
                t.arg = new TypeError("iterator result is not an object"),
                t.delegate = null,
                c)
            }
            function A(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]),
                2 in e && (t.finallyLoc = e[2],
                t.afterLoc = e[3]),
                this.tryEntries.push(t)
            }
            function S(e) {
                var t = e.completion || {};
                t.type = "normal",
                delete t.arg,
                e.completion = t
            }
            function M(e) {
                this.tryEntries = [{
                    tryLoc: "root"
                }],
                e.forEach(A, this),
                this.reset(!0)
            }
            function w(e) {
                if (e) {
                    var t = e[r];
                    if (t)
                        return t.call(e);
                    if ("function" == typeof e.next)
                        return e;
                    if (!isNaN(e.length)) {
                        var i = -1
                          , a = function t() {
                            for (; ++i < e.length; )
                                if (n.call(e, i))
                                    return t.value = e[i],
                                    t.done = !1,
                                    t;
                            return t.value = void 0,
                            t.done = !0,
                            t
                        };
                        return a.next = a
                    }
                }
                return {
                    next: C
                }
            }
            function C() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return k.prototype = d,
            i(y, "constructor", {
                value: d,
                configurable: !0
            }),
            i(d, "constructor", {
                value: k,
                configurable: !0
            }),
            k.displayName = u(d, s, "GeneratorFunction"),
            e.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === k || "GeneratorFunction" === (t.displayName || t.name))
            }
            ,
            e.mark = function(e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d,
                u(e, s, "GeneratorFunction")),
                e.prototype = Object.create(y),
                e
            }
            ,
            e.awrap = function(e) {
                return {
                    __await: e
                }
            }
            ,
            L(x.prototype),
            u(x.prototype, o, (function() {
                return this
            }
            )),
            e.AsyncIterator = x,
            e.async = function(t, n, i, a, r) {
                void 0 === r && (r = Promise);
                var o = new x(l(t, n, i, a),r);
                return e.isGeneratorFunction(n) ? o : o.next().then((function(e) {
                    return e.done ? e.value : o.next()
                }
                ))
            }
            ,
            L(y),
            u(y, s, "Generator"),
            u(y, r, (function() {
                return this
            }
            )),
            u(y, "toString", (function() {
                return "[object Generator]"
            }
            )),
            e.keys = function(e) {
                var t = Object(e)
                  , n = [];
                for (var i in t)
                    n.push(i);
                return n.reverse(),
                function e() {
                    for (; n.length; ) {
                        var i = n.pop();
                        if (i in t)
                            return e.value = i,
                            e.done = !1,
                            e
                    }
                    return e.done = !0,
                    e
                }
            }
            ,
            e.values = w,
            M.prototype = {
                constructor: M,
                reset: function(e) {
                    if (this.prev = 0,
                    this.next = 0,
                    this.sent = this._sent = void 0,
                    this.done = !1,
                    this.delegate = null,
                    this.method = "next",
                    this.arg = void 0,
                    this.tryEntries.forEach(S),
                    !e)
                        for (var t in this)
                            "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                },
                stop: function() {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type)
                        throw e.arg;
                    return this.rval
                },
                dispatchException: function(e) {
                    if (this.done)
                        throw e;
                    var t = this;
                    function i(n, i) {
                        return o.type = "throw",
                        o.arg = e,
                        t.next = n,
                        i && (t.method = "next",
                        t.arg = void 0),
                        !!i
                    }
                    for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                        var r = this.tryEntries[a]
                          , o = r.completion;
                        if ("root" === r.tryLoc)
                            return i("end");
                        if (r.tryLoc <= this.prev) {
                            var s = n.call(r, "catchLoc")
                              , u = n.call(r, "finallyLoc");
                            if (s && u) {
                                if (this.prev < r.catchLoc)
                                    return i(r.catchLoc, !0);
                                if (this.prev < r.finallyLoc)
                                    return i(r.finallyLoc)
                            } else if (s) {
                                if (this.prev < r.catchLoc)
                                    return i(r.catchLoc, !0)
                            } else {
                                if (!u)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < r.finallyLoc)
                                    return i(r.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(e, t) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var a = this.tryEntries[i];
                        if (a.tryLoc <= this.prev && n.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
                            var r = a;
                            break
                        }
                    }
                    r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                    var o = r ? r.completion : {};
                    return o.type = e,
                    o.arg = t,
                    r ? (this.method = "next",
                    this.next = r.finallyLoc,
                    c) : this.complete(o)
                },
                complete: function(e, t) {
                    if ("throw" === e.type)
                        throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                    this.method = "return",
                    this.next = "end") : "normal" === e.type && t && (this.next = t),
                    c
                },
                finish: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.finallyLoc === e)
                            return this.complete(n.completion, n.afterLoc),
                            S(n),
                            c
                    }
                },
                catch: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.tryLoc === e) {
                            var i = n.completion;
                            if ("throw" === i.type) {
                                var a = i.arg;
                                S(n)
                            }
                            return a
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(e, t, n) {
                    return this.delegate = {
                        iterator: w(e),
                        resultName: t,
                        nextLoc: n
                    },
                    "next" === this.method && (this.arg = void 0),
                    c
                }
            },
            e
        }
        function v(e, t, n, i, a, r, o) {
            try {
                var s = e[r](o)
                  , u = s.value
            } catch (e) {
                return void n(e)
            }
            s.done ? t(u) : Promise.resolve(u).then(i, a)
        }
        function g(e) {
            return function() {
                var t = this
                  , n = arguments;
                return new Promise((function(i, a) {
                    var r = e.apply(t, n);
                    function o(e) {
                        v(r, i, a, o, s, "next", e)
                    }
                    function s(e) {
                        v(r, i, a, o, s, "throw", e)
                    }
                    o(void 0)
                }
                ))
            }
        }
        var T = "/ai/hub/chat-with-game-assistant"
          , y = "/ai/hub/xigua/chat-with-game-assistant"
          , L = "3R5A^5WrN7yszj1v)1x>QztT7FD5_20H";
        var x = n(83392)
          , E = n.n(x);
        function b(e) {
            return b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            b(e)
        }
        function A() {
            A = function() {
                return e
            }
            ;
            var e = {}
              , t = Object.prototype
              , n = t.hasOwnProperty
              , i = Object.defineProperty || function(e, t, n) {
                e[t] = n.value
            }
              , a = "function" == typeof Symbol ? Symbol : {}
              , r = a.iterator || "@@iterator"
              , o = a.asyncIterator || "@@asyncIterator"
              , s = a.toStringTag || "@@toStringTag";
            function u(e, t, n) {
                return Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }),
                e[t]
            }
            try {
                u({}, "")
            } catch (e) {
                u = function(e, t, n) {
                    return e[t] = n
                }
            }
            function l(e, t, n, a) {
                var r = t && t.prototype instanceof h ? t : h
                  , o = Object.create(r.prototype)
                  , s = new M(a || []);
                return i(o, "_invoke", {
                    value: L(e, n, s)
                }),
                o
            }
            function m(e, t, n) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, n)
                    }
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    }
                }
            }
            e.wrap = l;
            var c = {};
            function h() {}
            function k() {}
            function d() {}
            var p = {};
            u(p, r, (function() {
                return this
            }
            ));
            var f = Object.getPrototypeOf
              , v = f && f(f(w([])));
            v && v !== t && n.call(v, r) && (p = v);
            var g = d.prototype = h.prototype = Object.create(p);
            function T(e) {
                ["next", "throw", "return"].forEach((function(t) {
                    u(e, t, (function(e) {
                        return this._invoke(t, e)
                    }
                    ))
                }
                ))
            }
            function y(e, t) {
                function a(i, r, o, s) {
                    var u = m(e[i], e, r);
                    if ("throw" !== u.type) {
                        var l = u.arg
                          , c = l.value;
                        return c && "object" == b(c) && n.call(c, "__await") ? t.resolve(c.__await).then((function(e) {
                            a("next", e, o, s)
                        }
                        ), (function(e) {
                            a("throw", e, o, s)
                        }
                        )) : t.resolve(c).then((function(e) {
                            l.value = e,
                            o(l)
                        }
                        ), (function(e) {
                            return a("throw", e, o, s)
                        }
                        ))
                    }
                    s(u.arg)
                }
                var r;
                i(this, "_invoke", {
                    value: function(e, n) {
                        function i() {
                            return new t((function(t, i) {
                                a(e, n, t, i)
                            }
                            ))
                        }
                        return r = r ? r.then(i, i) : i()
                    }
                })
            }
            function L(e, t, n) {
                var i = "suspendedStart";
                return function(a, r) {
                    if ("executing" === i)
                        throw new Error("Generator is already running");
                    if ("completed" === i) {
                        if ("throw" === a)
                            throw r;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    for (n.method = a,
                    n.arg = r; ; ) {
                        var o = n.delegate;
                        if (o) {
                            var s = x(o, n);
                            if (s) {
                                if (s === c)
                                    continue;
                                return s
                            }
                        }
                        if ("next" === n.method)
                            n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if ("suspendedStart" === i)
                                throw i = "completed",
                                n.arg;
                            n.dispatchException(n.arg)
                        } else
                            "return" === n.method && n.abrupt("return", n.arg);
                        i = "executing";
                        var u = m(e, t, n);
                        if ("normal" === u.type) {
                            if (i = n.done ? "completed" : "suspendedYield",
                            u.arg === c)
                                continue;
                            return {
                                value: u.arg,
                                done: n.done
                            }
                        }
                        "throw" === u.type && (i = "completed",
                        n.method = "throw",
                        n.arg = u.arg)
                    }
                }
            }
            function x(e, t) {
                var n = e.iterator[t.method];
                if (void 0 === n) {
                    if (t.delegate = null,
                    "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return",
                        t.arg = void 0,
                        x(e, t),
                        "throw" === t.method))
                            return c;
                        t.method = "throw",
                        t.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return c
                }
                var i = m(n, e.iterator, t.arg);
                if ("throw" === i.type)
                    return t.method = "throw",
                    t.arg = i.arg,
                    t.delegate = null,
                    c;
                var a = i.arg;
                return a ? a.done ? (t[e.resultName] = a.value,
                t.next = e.nextLoc,
                "return" !== t.method && (t.method = "next",
                t.arg = void 0),
                t.delegate = null,
                c) : a : (t.method = "throw",
                t.arg = new TypeError("iterator result is not an object"),
                t.delegate = null,
                c)
            }
            function E(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]),
                2 in e && (t.finallyLoc = e[2],
                t.afterLoc = e[3]),
                this.tryEntries.push(t)
            }
            function S(e) {
                var t = e.completion || {};
                t.type = "normal",
                delete t.arg,
                e.completion = t
            }
            function M(e) {
                this.tryEntries = [{
                    tryLoc: "root"
                }],
                e.forEach(E, this),
                this.reset(!0)
            }
            function w(e) {
                if (e) {
                    var t = e[r];
                    if (t)
                        return t.call(e);
                    if ("function" == typeof e.next)
                        return e;
                    if (!isNaN(e.length)) {
                        var i = -1
                          , a = function t() {
                            for (; ++i < e.length; )
                                if (n.call(e, i))
                                    return t.value = e[i],
                                    t.done = !1,
                                    t;
                            return t.value = void 0,
                            t.done = !0,
                            t
                        };
                        return a.next = a
                    }
                }
                return {
                    next: C
                }
            }
            function C() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return k.prototype = d,
            i(g, "constructor", {
                value: d,
                configurable: !0
            }),
            i(d, "constructor", {
                value: k,
                configurable: !0
            }),
            k.displayName = u(d, s, "GeneratorFunction"),
            e.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === k || "GeneratorFunction" === (t.displayName || t.name))
            }
            ,
            e.mark = function(e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d,
                u(e, s, "GeneratorFunction")),
                e.prototype = Object.create(g),
                e
            }
            ,
            e.awrap = function(e) {
                return {
                    __await: e
                }
            }
            ,
            T(y.prototype),
            u(y.prototype, o, (function() {
                return this
            }
            )),
            e.AsyncIterator = y,
            e.async = function(t, n, i, a, r) {
                void 0 === r && (r = Promise);
                var o = new y(l(t, n, i, a),r);
                return e.isGeneratorFunction(n) ? o : o.next().then((function(e) {
                    return e.done ? e.value : o.next()
                }
                ))
            }
            ,
            T(g),
            u(g, s, "Generator"),
            u(g, r, (function() {
                return this
            }
            )),
            u(g, "toString", (function() {
                return "[object Generator]"
            }
            )),
            e.keys = function(e) {
                var t = Object(e)
                  , n = [];
                for (var i in t)
                    n.push(i);
                return n.reverse(),
                function e() {
                    for (; n.length; ) {
                        var i = n.pop();
                        if (i in t)
                            return e.value = i,
                            e.done = !1,
                            e
                    }
                    return e.done = !0,
                    e
                }
            }
            ,
            e.values = w,
            M.prototype = {
                constructor: M,
                reset: function(e) {
                    if (this.prev = 0,
                    this.next = 0,
                    this.sent = this._sent = void 0,
                    this.done = !1,
                    this.delegate = null,
                    this.method = "next",
                    this.arg = void 0,
                    this.tryEntries.forEach(S),
                    !e)
                        for (var t in this)
                            "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                },
                stop: function() {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type)
                        throw e.arg;
                    return this.rval
                },
                dispatchException: function(e) {
                    if (this.done)
                        throw e;
                    var t = this;
                    function i(n, i) {
                        return o.type = "throw",
                        o.arg = e,
                        t.next = n,
                        i && (t.method = "next",
                        t.arg = void 0),
                        !!i
                    }
                    for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                        var r = this.tryEntries[a]
                          , o = r.completion;
                        if ("root" === r.tryLoc)
                            return i("end");
                        if (r.tryLoc <= this.prev) {
                            var s = n.call(r, "catchLoc")
                              , u = n.call(r, "finallyLoc");
                            if (s && u) {
                                if (this.prev < r.catchLoc)
                                    return i(r.catchLoc, !0);
                                if (this.prev < r.finallyLoc)
                                    return i(r.finallyLoc)
                            } else if (s) {
                                if (this.prev < r.catchLoc)
                                    return i(r.catchLoc, !0)
                            } else {
                                if (!u)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < r.finallyLoc)
                                    return i(r.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(e, t) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var a = this.tryEntries[i];
                        if (a.tryLoc <= this.prev && n.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
                            var r = a;
                            break
                        }
                    }
                    r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                    var o = r ? r.completion : {};
                    return o.type = e,
                    o.arg = t,
                    r ? (this.method = "next",
                    this.next = r.finallyLoc,
                    c) : this.complete(o)
                },
                complete: function(e, t) {
                    if ("throw" === e.type)
                        throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                    this.method = "return",
                    this.next = "end") : "normal" === e.type && t && (this.next = t),
                    c
                },
                finish: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.finallyLoc === e)
                            return this.complete(n.completion, n.afterLoc),
                            S(n),
                            c
                    }
                },
                catch: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.tryLoc === e) {
                            var i = n.completion;
                            if ("throw" === i.type) {
                                var a = i.arg;
                                S(n)
                            }
                            return a
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(e, t, n) {
                    return this.delegate = {
                        iterator: w(e),
                        resultName: t,
                        nextLoc: n
                    },
                    "next" === this.method && (this.arg = void 0),
                    c
                }
            },
            e
        }
        function S(e, t, n, i, a, r, o) {
            try {
                var s = e[r](o)
                  , u = s.value
            } catch (e) {
                return void n(e)
            }
            s.done ? t(u) : Promise.resolve(u).then(i, a)
        }
        function M(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function w(e, t) {
            return w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t,
                e
            }
            ,
            w(e, t)
        }
        function C(e, t) {
            if (t && ("object" === b(t) || "function" == typeof t))
                return t;
            if (void 0 !== t)
                throw new TypeError("Derived constructors may only return object or undefined");
            return function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e)
        }
        function R(e) {
            return R = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            ,
            R(e)
        }
        var N = "GandiAIHub"
          , P = s.Z
          , G = s.Z
          , D = "Default"
          , I = "__user__"
          , _ = function(e) {
            !function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
                t && w(e, t)
            }(v, e);
            var t, n, i, r, s, c, h, p = (c = v,
            h = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" == typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }(),
            function() {
                var e, t = R(c);
                if (h) {
                    var n = R(this).constructor;
                    e = Reflect.construct(t, arguments, n)
                } else
                    e = t.apply(this, arguments);
                return C(this, e)
            }
            );
            function v(e) {
                var t;
                if (function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, v),
                t = p.call(this, e, {
                    NS: N,
                    cn: l,
                    en: u
                }),
                e.ccwAPI && e.ccwAPI.getOnlineExtensionsConfig) {
                    var n = e.ccwAPI.getOnlineExtensionsConfig().hosts;
                    n && n.gandiMainHost && (t.gandiMainHost = n.gandiMainHost)
                }
                return t.gandiMainHost || (0,
                m.vU)("AIHub: host is not provided, AIHub not really to use"),
                t.lang = D,
                t.gameWorld = "",
                t.personae = {},
                t.sessions = {},
                t.reservedSessionLengthMap = {},
                t.hubApi = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                      , t = function() {
                        var t = g(f().mark((function t(n, i) {
                            var a, r, o, s;
                            return f().wrap((function(t) {
                                for (; ; )
                                    switch (t.prev = t.next) {
                                    case 0:
                                        return window.CryptoJS = k(),
                                        a = JSON.stringify(n),
                                        r = Date.now().toString(),
                                        o = k().HmacMD5("".concat(a, "\n").concat(r), L).toString(),
                                        t.next = 6,
                                        (0,
                                        d.v_)(e + i, a, {
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            params: {
                                                key: o,
                                                ts: r
                                            }
                                        });
                                    case 6:
                                        return s = t.sent,
                                        t.abrupt("return", s.text);
                                    case 8:
                                    case "end":
                                        return t.stop()
                                    }
                            }
                            ), t)
                        }
                        )));
                        return function(e, n) {
                            return t.apply(this, arguments)
                        }
                    }()
                      , n = function() {
                        var e = g(f().mark((function e(n) {
                            return f().wrap((function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        if (!window.location.host.endsWith("xiguacity.cn")) {
                                            e.next = 7;
                                            break
                                        }
                                        return e.next = 4,
                                        t(n, y);
                                    case 4:
                                    case 9:
                                        return e.abrupt("return", e.sent);
                                    case 7:
                                        return e.next = 9,
                                        t(n, T);
                                    case 10:
                                    case "end":
                                        return e.stop()
                                    }
                            }
                            ), e)
                        }
                        )));
                        return function(t) {
                            return e.apply(this, arguments)
                        }
                    }();
                    return {
                        chat: n
                    }
                }(t.gandiMainHost),
                t
            }
            return t = v,
            n = [{
                key: "getHats",
                value: function() {
                    return {
                        GandiAIHub_dispatchWhenMessageReceived: {}
                    }
                }
            }, {
                key: "getInfo",
                value: function() {
                    var e = {
                        opcode: "setLanguage",
                        blockType: o().COMMAND,
                        text: this.fm({
                            setChatLanguage: "set the chat language to [LANG]"
                        }),
                        arguments: {
                            LANG: {
                                type: a().STRING,
                                menu: "MENU_LANG"
                            }
                        }
                    }
                      , t = {
                        opcode: "setGameWorldBackground",
                        blockType: o().COMMAND,
                        text: this.fm({
                            setGameWorldBackground: "set the background of the game world: [TEXT]"
                        }),
                        arguments: {
                            TEXT: {
                                type: a().STRING,
                                defaultValue: "the game is about the hitchhiker's guide to the galaxy"
                            }
                        }
                    }
                      , n = {
                        opcode: "buildPersona",
                        blockType: o().COMMAND,
                        text: this.fm({
                            buildPersona: "create a [TRAITS][PERSONA], talk like a [TALK_LIKE], named [NAME]"
                        }),
                        arguments: {
                            TRAITS: {
                                type: a().STRING,
                                menu: "MENU_TRAITS"
                            },
                            PERSONA: {
                                type: a().STRING,
                                menu: "MENU_PERSONA"
                            },
                            TALK_LIKE: {
                                type: a().STRING,
                                menu: "MENU_TALK_LIKE"
                            },
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            }
                        }
                    }
                      , i = {
                        opcode: "buildPersonaInField",
                        blockType: o().COMMAND,
                        text: this.fm({
                            buildPersonaInField: "create a [TRAITS][EXPRESSION], named [NAME]"
                        }),
                        arguments: {
                            TRAITS: {
                                type: a().STRING,
                                menu: "MENU_TRAITS"
                            },
                            EXPRESSION: {
                                type: a().STRING,
                                menu: "MENU_EXPRESSION"
                            },
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            }
                        }
                    }
                      , r = {
                        opcode: "setTone",
                        blockType: o().COMMAND,
                        text: this.fm({
                            setTone: "[NAME] will adopt the speaking style of [TALK_LIKE]"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            },
                            TALK_LIKE: {
                                type: a().STRING,
                                menu: "MENU_TALK_LIKE"
                            }
                        }
                    }
                      , s = {
                        opcode: "setUserRole",
                        blockType: o().COMMAND,
                        text: this.fm({
                            setSelfRole: "user/player plays [ROLE], called [NAME], background info [BG]"
                        }),
                        arguments: {
                            ROLE: {
                                type: a().STRING,
                                defaultValue: "the hero"
                            },
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Arthur Dent"
                            },
                            BG: {
                                type: a().STRING,
                                defaultValue: "hero is a homeless"
                            }
                        }
                    }
                      , u = {
                        opcode: "updateTask",
                        blockType: o().COMMAND,
                        text: this.fm({
                            updateTask: "the task of [NAME] is [TASK]"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            },
                            TASK: {
                                type: a().STRING,
                                menu: "MENU_TASK"
                            }
                        }
                    }
                      , l = {
                        opcode: "setUserTask",
                        blockType: o().COMMAND,
                        text: this.fm({
                            setUserTask: "the task of user/player is [TASK]"
                        }),
                        arguments: {
                            TASK: {
                                type: a().STRING,
                                defaultValue: "to find the answer to the ultimate question"
                            }
                        }
                    }
                      , m = {
                        opcode: "updatePersona",
                        blockType: o().COMMAND,
                        text: this.fm({
                            updatePersona: "update [NAME] background info [BG]"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            },
                            BG: {
                                type: a().STRING,
                                defaultValue: "inventory is: mead(5 gold)"
                            }
                        }
                    }
                      , c = {
                        opcode: "setContextLength",
                        blockType: o().COMMAND,
                        text: this.fm({
                            setContextLength: "set context length of [NAME] to [LEN]"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            },
                            LEN: {
                                type: a().NUMBER,
                                defaultValue: 3
                            }
                        }
                    }
                      , h = {
                        opcode: "resetContext",
                        blockType: o().COMMAND,
                        text: this.fm({
                            resetContext: "reset context of [NAME]"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            }
                        }
                    }
                      , k = {
                        opcode: "sendTextPrompt",
                        blockType: o().REPORTER,
                        text: this.fm({
                            sendTextPrompt: "chat with [NAME]: [TEXT] and wait"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            },
                            TEXT: {
                                type: a().STRING,
                                defaultValue: "Hello"
                            }
                        }
                    }
                      , d = {
                        opcode: "sendTextPromptAsync",
                        blockType: o().COMMAND,
                        text: this.fm({
                            sendTextPromptAsync: "chat with [NAME]: [TEXT] async, with an event ID [EVENT_ID]"
                        }),
                        arguments: {
                            NAME: {
                                type: a().STRING,
                                defaultValue: "Marvin"
                            },
                            TEXT: {
                                type: a().STRING,
                                defaultValue: "Hello"
                            },
                            EVENT_ID: {
                                type: a().STRING,
                                defaultValue: "id:000"
                            }
                        }
                    }
                      , p = {
                        opcode: "dispatchWhenMessageReceived",
                        blockType: o().HAT,
                        text: this.fm({
                            dispatchWhenMessageReceived: "when [name] [respond], with [eventId]"
                        }),
                        isEdgeActivated: !1,
                        arguments: {
                            name: {
                                type: "ccw_hat_parameter"
                            },
                            respond: {
                                type: "ccw_hat_parameter"
                            },
                            eventId: {
                                type: "ccw_hat_parameter"
                            }
                        }
                    };
                    return this.__hideBlocks([n]),
                    {
                        id: N,
                        name: this.fm({
                            name: "AI Hub"
                        }),
                        color1: "#0260d5",
                        menuIconURI: P,
                        blockIconURI: G,
                        blocks: [this.documentBlock, this.div("divNotice", "NOTICE"), this.div("divChatBot", "GPT Chatbot"), this.div("divGlobal", " 🌍 Global"), e, t, this.div("divAssistant", " 🤖 Assistant/AI"), n, i, r, u, m, this.div("divUser", " 👤 Player/Hero"), s, l, this.div("divChat", " 💬 Chat"), c, h, k, d, p, "---"],
                        menus: {
                            MENU_LANG: {
                                acceptReporters: !0,
                                items: [{
                                    text: this.fm("menuLangFollowChat"),
                                    value: D
                                }, {
                                    text: "English",
                                    value: "English"
                                }, {
                                    text: "中文",
                                    value: "Chinese"
                                }]
                            },
                            MENU_SPRITE: {
                                acceptReporters: !0,
                                items: "__spriteList"
                            },
                            MENU_LIST: {
                                acceptReporters: !0,
                                items: "__listList"
                            },
                            MENU_VARS: {
                                acceptReporters: !1,
                                items: "__variableList"
                            },
                            MENU_TRAITS: {
                                acceptReporters: !0,
                                items: [{
                                    text: this.fm({
                                        menuTraitsHonest: "🟢 Honest"
                                    }),
                                    value: "Honest"
                                }, {
                                    text: this.fm({
                                        menuTraitsLoyal: "🔒 Loyal"
                                    }),
                                    value: "Loyal"
                                }, {
                                    text: this.fm({
                                        menuTraitsKind: "😊 Kind"
                                    }),
                                    value: "Kind"
                                }, {
                                    text: this.fm({
                                        menuTraitsAmbitious: "🚀 Ambitious"
                                    }),
                                    value: "Ambitious"
                                }, {
                                    text: this.fm({
                                        menuTraitsResponsible: "🤝 Responsible"
                                    }),
                                    value: "Responsible"
                                }, {
                                    text: this.fm({
                                        menuTraitsConfident: "😎 Confident"
                                    }),
                                    value: "Confident"
                                }, {
                                    text: this.fm({
                                        menuTraitsCreative: "🎨 Creative"
                                    }),
                                    value: "Creative"
                                }, {
                                    text: this.fm({
                                        menuTraitsOptimistic: "😃 Optimistic"
                                    }),
                                    value: "Optimistic"
                                }, {
                                    text: this.fm({
                                        menuTraitsAdaptable: "🌊 Adaptable"
                                    }),
                                    value: "Adaptable"
                                }, {
                                    text: this.fm({
                                        menuTraitsPatient: "🕰️ Patient"
                                    }),
                                    value: "Patient"
                                }, {
                                    text: this.fm({
                                        menuTraitsMean: "😠 Mean"
                                    }),
                                    value: "Mean"
                                }]
                            },
                            MENU_PERSONA: {
                                acceptReporters: !0,
                                items: [{
                                    text: this.fm({
                                        menuRolesGameNPC: "🧑‍🎤 Game NPC"
                                    }),
                                    value: "NPC"
                                }, {
                                    text: this.fm({
                                        menuRolesRobot: "🤖 Robot"
                                    }),
                                    value: "Robot"
                                }, {
                                    text: this.fm({
                                        menuRolesProgrammer: "🧑‍💻 Programmer"
                                    }),
                                    value: "Programmer"
                                }, {
                                    text: this.fm({
                                        menuRolesPhilosopherPlato: "😈 Philosopher Plato"
                                    }),
                                    value: "Plato"
                                }, {
                                    text: this.fm({
                                        menuRolesAstronaut: "👨‍🚀 Astronaut"
                                    }),
                                    value: "Astronaut"
                                }, {
                                    text: this.fm({
                                        menuRolesArtist: "👩‍🎨 Artist"
                                    }),
                                    value: "Artist"
                                }, {
                                    text: this.fm({
                                        menuRolesScientist: "👩‍🔬 Scientist"
                                    }),
                                    value: "Scientist"
                                }, {
                                    text: this.fm({
                                        menuRolesDoctor: "👨‍⚕️ Doctor"
                                    }),
                                    value: "Doctor"
                                }, {
                                    text: this.fm({
                                        menuRolesChef: "👩‍🍳 Chef"
                                    }),
                                    value: "Chef"
                                }, {
                                    text: this.fm({
                                        menuRolesWriter: "👩‍💻 Writer"
                                    }),
                                    value: "Writer"
                                }]
                            },
                            MENU_EXPRESSION: {
                                acceptReporters: !0,
                                items: [{
                                    text: this.fm({
                                        menuExpressionScientist: "🔬 Scientist, Communicates with a scientific mindset, employing evidence and reasoning to support ideas"
                                    }),
                                    value: "Scientist, Communicates with a scientific mindset, employing evidence and reasoning to support ideas"
                                }, {
                                    text: this.fm({
                                        menuExpressionActor: "🎭 Actor, Communicates with heightened expressiveness and empathy, embodying various emotions"
                                    }),
                                    value: "Actor, Communicates with heightened expressiveness and empathy, embodying various emotions"
                                }, {
                                    text: this.fm({
                                        menuExpressionComedian: "😄 Comedian, Communicates through humor, attempting to elicit laughter with witty remarks and jokes"
                                    }),
                                    value: "Comedian, Communicates through humor, attempting to elicit laughter with witty remarks and jokes"
                                }, {
                                    text: this.fm({
                                        menuExpressionPsychologist: "🧠 Psychologist, Communicates by focusing on emotions and analyzing thoughts, feelings, and behavior"
                                    }),
                                    value: "Psychologist, Communicates by focusing on emotions and analyzing thoughts, feelings, and behavior"
                                }, {
                                    text: this.fm({
                                        menuExpressionDetective: "🔍 Detective, Communicates by prioritizing observations, evidence, and logical deductions to reach conclusions"
                                    }),
                                    value: "Detective, Communicates by prioritizing observations, evidence, and logical deductions to reach conclusions"
                                }, {
                                    text: this.fm({
                                        menuExpressionJournalist: "🗞️ Journalist, Communicates by reporting news and current events, delivering information in an unbiased manner"
                                    }),
                                    value: "Journalist, Communicates by reporting news and current events, delivering information in an unbiased manner"
                                }, {
                                    text: this.fm({
                                        menuExpressionTeacher: "👩‍🏫 Teacher, Communicates by imparting knowledge and instructing, using pedagogical techniques"
                                    }),
                                    value: "Teacher, Communicates by imparting knowledge and instructing, using pedagogical techniques"
                                }, {
                                    text: this.fm({
                                        menuExpressionEngineer: "🔧 Engineer, Communicates with a practical and technical approach, employing problem-solving strategies"
                                    }),
                                    value: "Engineer, Communicates with a practical and technical approach, employing problem-solving strategies"
                                }, {
                                    text: this.fm({
                                        menuExpressionEconomist: "💰 Economist, Communicates with a focus on economic principles, analyzing markets and financial trends"
                                    }),
                                    value: "Economist, Communicates with a focus on economic principles, analyzing markets and financial trends"
                                }, {
                                    text: this.fm({
                                        menuExpressionHistorian: "📜 Historian, Communicates by examining and interpreting past events, utilizing historical evidence"
                                    }),
                                    value: "Historian, Communicates by examining and interpreting past events, utilizing historical evidence"
                                }, {
                                    text: this.fm({
                                        menuExpressionLawyer: "⚖️ Lawyer, Communicates through legal analysis, citing laws and precedents to build arguments"
                                    }),
                                    value: "Lawyer, Communicates through legal analysis, citing laws and precedents to build arguments"
                                }, {
                                    text: this.fm({
                                        menuExpressionMusician: "🎵 Musician, Communicates through musical expression, using rhythm and melody to convey emotions"
                                    }),
                                    value: "Musician, Communicates through musical expression, using rhythm and melody to convey emotions"
                                }, {
                                    text: this.fm({
                                        menuExpressionArchitect: "🏛️ Architect, Communicates through the design and construction of buildings, expressing ideas through structures"
                                    }),
                                    value: "Architect, Communicates through the design and construction of buildings, expressing ideas through structures"
                                }, {
                                    text: this.fm({
                                        menuExpressionEntrepreneur: "💼 Entrepreneur, Communicates with a business-oriented mindset, focusing on innovation and opportunity"
                                    }),
                                    value: "Entrepreneur, Communicates with a business-oriented mindset, focusing on innovation and opportunity"
                                }, {
                                    text: this.fm({
                                        menuExpressionSocialActivist: "✊ Social Activist, Communicates with a passion for social change, advocating for justice and equality"
                                    }),
                                    value: "Social Activist, Communicates with a passion for social change, advocating for justice and equality"
                                }, {
                                    text: this.fm({
                                        menuExpressionBiologist: "🌱 Biologist, Communicates by studying living organisms and their interactions, delving into the wonders of life"
                                    }),
                                    value: "Biologist, Communicates by studying living organisms and their interactions, delving into the wonders of life"
                                }, {
                                    text: this.fm({
                                        menuExpressionLinguist: "🗣️ Linguist, Communicates by analyzing language structures and linguistic diversity, exploring the power of words"
                                    }),
                                    value: "Linguist, Communicates by analyzing language structures and linguistic diversity, exploring the power of words"
                                }, {
                                    text: this.fm({
                                        menuExpressionAthlete: "🏅 Athlete, Communicates through physical prowess, expressing actions and achievements in sports"
                                    }),
                                    value: "Athlete, Communicates through physical prowess, expressing actions and achievements in sports"
                                }, {
                                    text: this.fm({
                                        menuExpressionAstronomer: "🌌 Astronomer, Communicates with a focus on celestial bodies and the universe, exploring cosmic phenomena"
                                    }),
                                    value: "Astronomer, Communicates with a focus on celestial bodies and the universe, exploring cosmic phenomena"
                                }, {
                                    text: this.fm({
                                        menuExpressionPoet: "📝 Poet, Communicates through rhyme and poetic language, expressing emotions and ideas poetically"
                                    }),
                                    value: "Poet, Communicates through rhyme and poetic language, expressing emotions and ideas poetically"
                                }, {
                                    text: this.fm({
                                        menuExpressionStylist: "💇 Stylist, Communicates in terms of popular culture, utilizing trendy terminology"
                                    }),
                                    value: "Stylist, Communicates in terms of popular culture, utilizing trendy terminology"
                                }, {
                                    text: this.fm({
                                        menuExpressionPhilosopher: "🤔 Philosopher, Communicates using abstract categories and engages in philosophical discourse"
                                    }),
                                    value: "Philosopher, Communicates using abstract categories and engages in philosophical discourse"
                                }, {
                                    text: this.fm({
                                        menuExpressionChef: "👨‍🍳 Chef, Communicates through culinary expertise, describing flavors, techniques, and food pairings"
                                    }),
                                    value: "Chef, Communicates through culinary expertise, describing flavors, techniques, and food pairings"
                                }, {
                                    text: this.fm({
                                        menuExpressionEnvironmentalist: "🌿 Environmentalist, Communicates with a focus on environmental factors, emphasizing impact on nature"
                                    }),
                                    value: "Environmentalist, Communicates with a focus on environmental factors, emphasizing impact on nature"
                                }, {
                                    text: this.fm({
                                        menuExpressionPhysician: "👨‍⚕️ Physician, Communicates with medical expertise, explaining diagnoses, treatments, and healthcare practices"
                                    }),
                                    value: "Physician, Communicates with medical expertise, explaining diagnoses, treatments, and healthcare practices"
                                }, {
                                    text: this.fm({
                                        menuExpressionDiplomat: "🌍 Diplomat, Communicates through diplomatic negotiations and international relations, fostering dialogue between nations"
                                    }),
                                    value: "Diplomat, Communicates through diplomatic negotiations and international relations, fostering dialogue between nations"
                                }, {
                                    text: this.fm({
                                        menuExpressionFilmmaker: "🎥 Filmmaker, Communicates through visual storytelling, using film as a medium to evoke emotions and convey ideas"
                                    }),
                                    value: "Filmmaker, Communicates through visual storytelling, using film as a medium to evoke emotions and convey ideas"
                                }, {
                                    text: this.fm({
                                        menuExpressionAnthropologist: "🌍 Anthropologist, Communicates by studying human cultures and societies, uncovering insights into diverse communities"
                                    }),
                                    value: "Anthropologist, Communicates by studying human cultures and societies, uncovering insights into diverse communities"
                                }]
                            },
                            MENU_TALK_LIKE: {
                                acceptReporters: !0,
                                items: [{
                                    text: this.fm({
                                        menuTalkLikeNormalPeople: "😺 Normal People"
                                    }),
                                    value: "Normal People"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeGeek: "🧑‍💻 Geek"
                                    }),
                                    value: "Geek"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSteveJobs: "🍏 Steve Jobs"
                                    }),
                                    value: "Steve Jobs"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMarvinH2G2: "🤖 Marvin (H2G2)"
                                    }),
                                    value: "Marvin (H2G2)"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDonkeyShrek: "🐴 Donkey (Shrek)"
                                    }),
                                    value: "Donkey (Shrek)"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeYoda: "🟢 Yoda"
                                    }),
                                    value: "Yoda"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSherlockHolmes: "🔍 Sherlock Holmes"
                                    }),
                                    value: "Sherlock Holmes"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeWinstonChurchill: "🇬🇧 Winston Churchill"
                                    }),
                                    value: "Winston Churchill"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDumbledore: "🧙‍♂️ Dumbledore"
                                    }),
                                    value: "Dumbledore"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeGandalf: "🧙‍♂️ Gandalf"
                                    }),
                                    value: "Gandalf"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDracula: "🧛‍♂️ Dracula"
                                    }),
                                    value: "Dracula"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeTonyStark: "🛡️ Tony Stark"
                                    }),
                                    value: "Tony Stark"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMorganFreeman: "🎤 Morgan Freeman"
                                    }),
                                    value: "Morgan Freeman"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeWilliamShakespeare: "📜 William Shakespeare"
                                    }),
                                    value: "William Shakespeare"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeOscarWilde: "📚 Oscar Wilde"
                                    }),
                                    value: "Oscar Wilde"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDarthVader: "🌑 Darth Vader"
                                    }),
                                    value: "Darth Vader"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeBane: "💀 Bane"
                                    }),
                                    value: "Bane"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeJoker: "🃏 Joker"
                                    }),
                                    value: "Joker"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeBugsBunny: "🐰 Bugs Bunny"
                                    }),
                                    value: "Bugs Bunny"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeForrestGump: "🏃‍♂️ Forrest Gump"
                                    }),
                                    value: "Forrest Gump"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeVoldemort: "🐍 Voldemort"
                                    }),
                                    value: "Voldemort"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeElonMusk: "🚀 Elon Musk"
                                    }),
                                    value: "Elon Musk"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMrBean: "🤪 Mr. Bean"
                                    }),
                                    value: "Mr. Bean"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeCaptainJackSparrow: "🏴‍☠️ Captain Jack Sparrow"
                                    }),
                                    value: "Captain Jack Sparrow"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeFerrisBueller: "😎 Ferris Bueller"
                                    }),
                                    value: "Ferris Bueller"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAryaStark: "⚔️ Arya Stark"
                                    }),
                                    value: "Arya Stark"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeRonSwanson: "🥩 Ron Swanson"
                                    }),
                                    value: "Ron Swanson"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeChandlerBing: "😅 Chandler Bing"
                                    }),
                                    value: "Chandler Bing"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeWalterWhite: "🔬 Walter White"
                                    }),
                                    value: "Walter White"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDeadpool: "🔴 Deadpool"
                                    }),
                                    value: "Deadpool"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDrHouse: "💊 Dr. House"
                                    }),
                                    value: "Dr. House"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeHannibalLecter: "🍽️ Hannibal Lecter"
                                    }),
                                    value: "Hannibal Lecter"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAlbertEinstein: "🧠 Albert Einstein"
                                    }),
                                    value: "Albert Einstein"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMarieCurie: "🔬 Marie Curie"
                                    }),
                                    value: "Marie Curie"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeNeilDeGrasseTyson: "🌌 Neil deGrasse Tyson"
                                    }),
                                    value: "Neil deGrasse Tyson"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMerylStreep: "🎭 Meryl Streep"
                                    }),
                                    value: "Meryl Streep"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeLeonardoDiCaprio: "🌟 Leonardo DiCaprio"
                                    }),
                                    value: "Leonardo DiCaprio"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeViolaDavis: "🎬 Viola Davis"
                                    }),
                                    value: "Viola Davis"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeEllenDeGeneres: "😄 Ellen DeGeneres"
                                    }),
                                    value: "Ellen DeGeneres"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeKevinHart: "🤣 Kevin Hart"
                                    }),
                                    value: "Kevin Hart"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAmySchumer: "😂 Amy Schumer"
                                    }),
                                    value: "Amy Schumer"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSigmundFreud: "🕵️‍♂️ Sigmund Freud"
                                    }),
                                    value: "Sigmund Freud"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeCarlJung: "🔮 Carl Jung"
                                    }),
                                    value: "Carl Jung"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeElizabethLoftus: "🧩 Elizabeth Loftus"
                                    }),
                                    value: "Elizabeth Loftus"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSherlockHolmes: "🔍 Sherlock Holmes"
                                    }),
                                    value: "Sherlock Holmes"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeHerculePoirot: "🔎 Hercule Poirot"
                                    }),
                                    value: "Hercule Poirot"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeVeronicaMars: "🕵️‍♀️ Veronica Mars"
                                    }),
                                    value: "Veronica Mars"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAndersonCooper: "🎙️ Anderson Cooper"
                                    }),
                                    value: "Anderson Cooper"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeChristianeAmanpour: "🗞️ Christiane Amanpour"
                                    }),
                                    value: "Christiane Amanpour"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeRachelMaddow: "📺 Rachel Maddow"
                                    }),
                                    value: "Rachel Maddow"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMichelleRhee: "👩‍🏫 Michelle Rhee"
                                    }),
                                    value: "Michelle Rhee"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeJaimeEscalante: "📚 Jaime Escalante"
                                    }),
                                    value: "Jaime Escalante"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSirKenRobinson: "🌈 Sir Ken Robinson"
                                    }),
                                    value: "Sir Ken Robinson"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeNikolaTesla: "⚡ Nikola Tesla"
                                    }),
                                    value: "Nikola Tesla"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeThomasEdison: "💡 Thomas Edison"
                                    }),
                                    value: "Thomas Edison"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeElonMusk: "🚀 Elon Musk"
                                    }),
                                    value: "Elon Musk"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAdamSmith: "💵 Adam Smith"
                                    }),
                                    value: "Adam Smith"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeJohnMaynardKeynes: "💲 John Maynard Keynes"
                                    }),
                                    value: "John Maynard Keynes"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMiltonFriedman: "📈 Milton Friedman"
                                    }),
                                    value: "Milton Friedman"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeHerodotus: "📜 Herodotus"
                                    }),
                                    value: "Herodotus"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeEdwardGibbon: "🏛️ Edward Gibbon"
                                    }),
                                    value: "Edward Gibbon"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeHowardZinn: "📖 Howard Zinn"
                                    }),
                                    value: "Howard Zinn"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeRuthBaderGinsburg: "⚖️ Ruth Bader Ginsburg"
                                    }),
                                    value: "Ruth Bader Ginsburg"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeThurgoodMarshall: "🏛️ Thurgood Marshall"
                                    }),
                                    value: "Thurgood Marshall"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAlanDershowitz: "🎤 Alan Dershowitz"
                                    }),
                                    value: "Alan Dershowitz"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeLudwigVanBeethoven: "🎶 Ludwig van Beethoven"
                                    }),
                                    value: "Ludwig van Beethoven"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeBeyonce: "🎤 Beyoncé"
                                    }),
                                    value: "Beyoncé"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeBobDylan: "🎸 Bob Dylan"
                                    }),
                                    value: "Bob Dylan"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeFrankLloydWright: "🏢 Frank Lloyd Wright"
                                    }),
                                    value: "Frank Lloyd Wright"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeZahaHadid: "🏗️ Zaha Hadid"
                                    }),
                                    value: "Zaha Hadid"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeIMPei: "🏛️ I. M. Pei"
                                    }),
                                    value: "I. M. Pei"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSteveJobs: "🍏 Steve Jobs"
                                    }),
                                    value: "Steve Jobs"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeOprahWinfrey: "📺 Oprah Winfrey"
                                    }),
                                    value: "Oprah Winfrey"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMartinLutherKingJr: "✊ Martin Luther King Jr."
                                    }),
                                    value: "Martin Luther King Jr."
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMalalaYousafzai: "🎓 Malala Yousafzai"
                                    }),
                                    value: "Malala Yousafzai"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeGretaThunberg: "🌍 Greta Thunberg"
                                    }),
                                    value: "Greta Thunberg"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeCharlesDarwin: "🐦 Charles Darwin"
                                    }),
                                    value: "Charles Darwin"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeJaneGoodall: "🐒 Jane Goodall"
                                    }),
                                    value: "Jane Goodall"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeGregorMendel: "🌱 Gregor Mendel"
                                    }),
                                    value: "Gregor Mendel"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeNoamChomsky: "🗣️ Noam Chomsky"
                                    }),
                                    value: "Noam Chomsky"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeFerdinandDeSaussure: "🔠 Ferdinand de Saussure"
                                    }),
                                    value: "Ferdinand de Saussure"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeStevenPinker: "📚 Steven Pinker"
                                    }),
                                    value: "Steven Pinker"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSerenaWilliams: "🎾 Serena Williams"
                                    }),
                                    value: "Serena Williams"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeUsainBolt: "🏃 Usain Bolt"
                                    }),
                                    value: "Usain Bolt"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMichaelJordan: "🏀 Michael Jordan"
                                    }),
                                    value: "Michael Jordan"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeGalileoGalilei: "🔭 Galileo Galilei"
                                    }),
                                    value: "Galileo Galilei"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeCarlSagan: "🌌 Carl Sagan"
                                    }),
                                    value: "Carl Sagan"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeVeraRubin: "✨ Vera Rubin"
                                    }),
                                    value: "Vera Rubin"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeWilliamShakespeare: "🎭 William Shakespeare"
                                    }),
                                    value: "William Shakespeare"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeEmilyDickinson: "📜 Emily Dickinson"
                                    }),
                                    value: "Emily Dickinson"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMayaAngelou: "🖋️ Maya Angelou"
                                    }),
                                    value: "Maya Angelou"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAnnaWintour: "👠 Anna Wintour"
                                    }),
                                    value: "Anna Wintour"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeEdwardEnninful: "🧥 Edward Enninful"
                                    }),
                                    value: "Edward Enninful"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeRachelZoe: "👗 Rachel Zoe"
                                    }),
                                    value: "Rachel Zoe"
                                }, {
                                    text: this.fm({
                                        menuTalkLikePlato: "🏛️ Plato"
                                    }),
                                    value: "Plato"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeFriedrichNietzsche: "🔨 Friedrich Nietzsche"
                                    }),
                                    value: "Friedrich Nietzsche"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeSimoneDeBeauvoir: "👁️‍🗨️ Simone de Beauvoir"
                                    }),
                                    value: "Simone de Beauvoir"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeJuliaChild: "🍳 Julia Child"
                                    }),
                                    value: "Julia Child"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeGordonRamsay: "🍽️ Gordon Ramsay"
                                    }),
                                    value: "Gordon Ramsay"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAnthonyBourdain: "🌍 Anthony Bourdain"
                                    }),
                                    value: "Anthony Bourdain"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeWangariMaathai: "🌳 Wangari Maathai"
                                    }),
                                    value: "Wangari Maathai"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeDrAnthonyFauci: "💉 Dr. Anthony Fauci"
                                    }),
                                    value: "Dr. Anthony Fauci"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeKofiAnnan: "🤝 Kofi Annan"
                                    }),
                                    value: "Kofi Annan"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMadeleineAlbright: "🌍 Madeleine Albright"
                                    }),
                                    value: "Madeleine Albright"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeBanKiMoon: "🇺🇳 Ban Ki-moon"
                                    }),
                                    value: "Ban Ki-moon"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeStevenSpielberg: "🎥 Steven Spielberg"
                                    }),
                                    value: "Steven Spielberg"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeAvaDuVernay: "🎬 Ava DuVernay"
                                    }),
                                    value: "Ava DuVernay"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMartinScorsese: "🎞️ Martin Scorsese"
                                    }),
                                    value: "Martin Scorsese"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeMargaretMead: "🌺 Margaret Mead"
                                    }),
                                    value: "Margaret Mead"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeClaudeLeviStrauss: "📚 Claude Lévi-Strauss"
                                    }),
                                    value: "Claude Lévi-Strauss"
                                }, {
                                    text: this.fm({
                                        menuTalkLikeFranzBoas: "👥 Franz Boas"
                                    }),
                                    value: "Franz Boas"
                                }]
                            },
                            MENU_TASK: {
                                acceptReporters: !0,
                                items: [{
                                    text: this.fm({
                                        menuTasksAnswerQuestions: "❓ Answer questions"
                                    }),
                                    value: "Answer questions"
                                }, {
                                    text: this.fm({
                                        menuTasksSaleUserSomething: "🛒 Sale user something"
                                    }),
                                    value: "Sale user something"
                                }, {
                                    text: this.fm({
                                        menuTasksProvideUserAdvice: "👨‍💼 Provide user advice"
                                    }),
                                    value: "Provide user advice"
                                }, {
                                    text: this.fm({
                                        menuTasksCompleteChallenges: "🏆 Complete challenges"
                                    }),
                                    value: "Complete challenges"
                                }, {
                                    text: this.fm({
                                        menuTasksTeachSkill: "👩‍🏫 Teach a skill"
                                    }),
                                    value: "Teach a skill"
                                }, {
                                    text: this.fm({
                                        menuTasksCreateContent: "✍️ Create content"
                                    }),
                                    value: "Create content"
                                }, {
                                    text: this.fm({
                                        menuTasksSolveProblem: "💡 Solve a problem"
                                    }),
                                    value: "Solve a problem"
                                }, {
                                    text: this.fm({
                                        menuTasksProvideEntertainment: "🎭 Provide entertainment"
                                    }),
                                    value: "Provide entertainment"
                                }, {
                                    text: this.fm({
                                        menuTasksOrganizeEvent: "🎉 Organize an event"
                                    }),
                                    value: "Organize an event"
                                }, {
                                    text: this.fm({
                                        menuTasksDevelopSoftware: "💻 Develop software"
                                    }),
                                    value: "Develop software"
                                }, {
                                    text: this.fm({
                                        menuTasksRolePlay: "🎭 Role play"
                                    }),
                                    value: "Role play"
                                }, {
                                    text: this.fm({
                                        menuTasksMockUser: "😈 Mock user"
                                    }),
                                    value: "Mock user"
                                }, {
                                    text: this.fm({
                                        menuTasksInspireUser: "💡 Inspire user"
                                    }),
                                    value: "Inspire user"
                                }]
                            }
                        }
                    }
                }
            }, {
                key: "setLanguage",
                value: function(e) {
                    var t = e.LANG;
                    this.lang = t
                }
            }, {
                key: "setGameWorldBackground",
                value: function(e) {
                    var t = e.TEXT;
                    this.gameWorld = t
                }
            }, {
                key: "buildPersona",
                value: function(e) {
                    var t = e.TRAITS
                      , n = e.PERSONA
                      , i = e.TALK_LIKE
                      , a = e.NAME;
                    this.personae[a] = {
                        name: a,
                        traits: t,
                        persona: n,
                        talkLike: i
                    }
                }
            }, {
                key: "buildPersonaInField",
                value: function(e) {
                    var t = e.TRAITS
                      , n = e.EXPRESSION
                      , i = e.NAME;
                    this.personae[i] = {
                        name: i,
                        traits: t,
                        persona: n
                    }
                }
            }, {
                key: "setTone",
                value: function(e) {
                    var t = e.NAME
                      , n = e.TALK_LIKE;
                    this.personae[t] && (this.personae[t].talkLike = n)
                }
            }, {
                key: "setUserRole",
                value: function(e) {
                    var t = e.ROLE
                      , n = e.BG
                      , i = e.NAME;
                    this.personae.__user__ = {
                        name: i,
                        persona: t,
                        bg: n
                    }
                }
            }, {
                key: "updateTask",
                value: function(e) {
                    var t = e.NAME
                      , n = e.TASK;
                    this.personae[t] && (this.personae[t].task = n)
                }
            }, {
                key: "setUserTask",
                value: function(e) {
                    var t = e.TASK;
                    this.updateTask({
                        NAME: I,
                        TASK: t
                    })
                }
            }, {
                key: "updatePersona",
                value: function(e) {
                    var t = e.NAME
                      , n = e.BG;
                    this.personae[t] && (this.personae[t].bg = n)
                }
            }, {
                key: "setContextLength",
                value: function(e) {
                    var t = e.NAME
                      , n = e.LEN
                      , i = "".concat(I, "-").concat(t);
                    this.reservedSessionLengthMap[i] = E().toNumber(n)
                }
            }, {
                key: "resetContext",
                value: function(e) {
                    var t = e.NAME
                      , n = "".concat(I, "-").concat(t);
                    delete this.sessions[n]
                }
            }, {
                key: "sendTextPrompt",
                value: (r = A().mark((function e(t) {
                    var n, i, a, r, o, s, u, l, c, h, k, d, p, f, v = this;
                    return A().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return u = t.NAME,
                                l = t.TEXT,
                                c = "".concat(I, "-").concat(u),
                                h = this.sessions[c],
                                k = null !== (n = this.reservedSessionLengthMap[c]) && void 0 !== n ? n : 3,
                                h && (d = Math.max(h.length - k, 0),
                                h = h.slice(d)),
                                e.next = 7,
                                this.hubApi.chat({
                                    projectId: this.runtime.ccwAPI.getProjectUUID(),
                                    gameWorld: {
                                        bg: this.gameWorld
                                    },
                                    assistantRole: {
                                        name: this.personae[u].name,
                                        traits: this.personae[u].traits,
                                        persona: this.personae[u].persona,
                                        talkLike: this.personae[u].talkLike,
                                        task: this.personae[u].task,
                                        bg: this.personae[u].bg
                                    },
                                    userRole: {
                                        name: null === (i = this.personae.__user__) || void 0 === i ? void 0 : i.name,
                                        persona: null === (a = this.personae.__user__) || void 0 === a ? void 0 : a.persona,
                                        bg: null === (r = this.personae.__user__) || void 0 === r ? void 0 : r.bg,
                                        task: null === (o = this.personae.__user__) || void 0 === o ? void 0 : o.task
                                    },
                                    histories: null !== (s = h) && void 0 !== s ? s : [],
                                    text: l,
                                    extra: {
                                        lang: this.lang
                                    }
                                }).catch((function(e) {
                                    v._logToTerminal({
                                        type: "error",
                                        msg: e
                                    })
                                }
                                ));
                            case 7:
                                return p = e.sent,
                                (0,
                                m.g4)("[sendTextPrompt]", "called", {
                                    NAME: u,
                                    TEXT: l
                                }, p),
                                (f = this.sessions[c]) || (f = []),
                                f.push({
                                    user: l,
                                    assistant: p
                                }),
                                this.sessions[c] = f.slice(-k),
                                e.abrupt("return", p);
                            case 14:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, this)
                }
                )),
                s = function() {
                    var e = this
                      , t = arguments;
                    return new Promise((function(n, i) {
                        var a = r.apply(e, t);
                        function o(e) {
                            S(a, n, i, o, s, "next", e)
                        }
                        function s(e) {
                            S(a, n, i, o, s, "throw", e)
                        }
                        o(void 0)
                    }
                    ))
                }
                ,
                function(e) {
                    return s.apply(this, arguments)
                }
                )
            }, {
                key: "sendTextPromptAsync",
                value: function(e, t) {
                    var n = e.NAME
                      , i = e.TEXT
                      , a = e.EVENT_ID;
                    this.sendTextPrompt({
                        NAME: n,
                        TEXT: i
                    }).then((function(e) {
                        (0,
                        m.g4)("[sendTextPromptAsync]", "called", {
                            NAME: n,
                            TEXT: i
                        }, e),
                        t.startHatsWithParams("GandiAIHub_dispatchWhenMessageReceived", {
                            parameters: {
                                name: n,
                                respond: e,
                                eventId: a
                            }
                        })
                    }
                    ))
                }
            }, {
                key: "dispatchWhenMessageReceived",
                value: function() {
                    return !0
                }
            }, {
                key: "_logToTerminal",
                value: function(e) {
                    var t, n, i, a, r, o = e.type, s = e.msg, u = null !== (t = null === (n = this.runtime.logSystem) || void 0 === n ? void 0 : n.info) && void 0 !== t ? t : m.g4, l = null !== (i = null === (a = this.runtime.logSystem) || void 0 === a ? void 0 : a.warn) && void 0 !== i ? i : m.ZK;
                    "error" === o ? (this.runtime.isPlayerOnly || null === (r = this.runtime.logSystem) || void 0 === r || r.show(),
                    l("[AIHub ERROR] ".concat(s))) : u("[AIHub INFO] ".concat(s))
                }
            }],
            i = [{
                key: "STATE_KEY",
                get: function() {
                    return N
                }
            }],
            n && M(t.prototype, n),
            i && M(t, i),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            v
        }(c.a)
    }
    ,
    42480: () => {}
}]);
