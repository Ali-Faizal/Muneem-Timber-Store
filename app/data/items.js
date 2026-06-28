const items = [
  // ⚡ Power Tools
  {
    id: 1,
    name: "Drill Machine",
    slug: "drill-machine",
    icon: "🔌",
    desc: "Trowel aur concrete drilling ke liye powerful electrical drill machine.",
    price: "₹50 per day",
    dailyRate: 50
  },
  {
    id: 2,
    name: "Hammer Drill",
    slug: "hammer-drill",
    icon: "🔨",
    desc: "Heavy concrete aur pathar me surakh karne ke liye high impact hammer drill.",
    price: "₹80 per day",
    dailyRate: 80
  },
  {
    id: 3,
    name: "Impact Drill",
    slug: "impact-drill",
    icon: "⚡",
    desc: "Tez screwdriving aur metal drilling ke liye variable speed impact drill.",
    price: "₹90 per day",
    dailyRate: 90
  },
  {
    id: 4,
    name: "Angle Grinder",
    slug: "angle-grinder",
    icon: "🪚",
    desc: "Loha, sariya aur tiles cutting aur grinding ke liye safety-guarded angle grinder.",
    price: "₹60 per day",
    dailyRate: 60
  },
  {
    id: 5,
    name: "Circular Saw",
    slug: "circular-saw",
    icon: "⚙️",
    desc: "Lakdi aur plywood ko seedhi line me kaatne ke liye circular saw machine.",
    price: "₹120 per day",
    dailyRate: 120
  },
  {
    id: 6,
    name: "Marble Cutter",
    slug: "marble-cutter",
    icon: "📐",
    desc: "Marble, tiles aur granite ko smooth finished way me cutting ke liye cutter.",
    price: "₹100 per day",
    dailyRate: 100
  },
  {
    id: 7,
    name: "Concrete Cutter",
    slug: "concrete-cutter",
    icon: "🧱",
    desc: "Lantar aur concrete floor slabs ko deep cut karne ke liye heavy duty concrete cutter.",
    price: "₹250 per day",
    dailyRate: 250
  },
  {
    id: 8,
    name: "Jigsaw Machine",
    slug: "jigsaw-machine",
    icon: "✂️",
    desc: "Lakdi aur sheet metal me curved shape me designs cutting ke liye jigsaw.",
    price: "₹70 per day",
    dailyRate: 70
  },
  {
    id: 9,
    name: "Demolition Hammer (Breaker Machine)",
    slug: "demolition-hammer",
    icon: "💥",
    desc: "Chhat, beam aur concrete structures ko todne ke liye high power breaking hammer.",
    price: "₹350 per day",
    dailyRate: 350
  },

  // 🏗️ Construction Machines
  {
    id: 10,
    name: "Concrete Mixer Machine",
    slug: "concrete-mixer-machine",
    icon: "🏗️",
    desc: "Construction site par cement, balu aur gitte ka professional mixture banane ke liye machine.",
    price: "₹500 per day",
    dailyRate: 500
  },
  {
    id: 11,
    name: "Cement Mixer",
    slug: "cement-mixer",
    icon: "🔄",
    desc: "Plaster aur chhota kaam ke liye highly portable electrical cement mixer.",
    price: "₹400 per day",
    dailyRate: 400
  },
  {
    id: 12,
    name: "Vibrator Machine (Concrete Vibrator)",
    slug: "vibrator-machine",
    icon: "📳",
    desc: "Lantar daalte samay air bubbles nikalne aur concrete ko compact karne ke liye vibrator.",
    price: "₹150 per day",
    dailyRate: 150
  },
  {
    id: 13,
    name: "Water Pump",
    slug: "water-pump",
    icon: "💧",
    desc: "Curing aur paani supply ke liye high discharge petrol/diesel run water pump.",
    price: "₹120 per day",
    dailyRate: 120
  },
  {
    id: 14,
    name: "Mini Excavator (JCB)",
    slug: "mini-excavator",
    icon: "🚜",
    desc: "Chhoti jagah me mitti khodne aur site clearance ke liye mini excavator loader.",
    price: "₹1500 per day",
    dailyRate: 1500
  },
  {
    id: 15,
    name: "Road Roller",
    slug: "road-roller",
    icon: "🛣️",
    desc: "Kharanja aur floor base ki compacting ke liye mechanical road roller.",
    price: "₹2000 per day",
    dailyRate: 2000
  },
  {
    id: 16,
    name: "Concrete Pump",
    slug: "concrete-pump",
    icon: "🚛",
    desc: "Concrete mix ko chhat ya height par transfer karne ke liye engine-powered concrete pump.",
    price: "₹1800 per day",
    dailyRate: 1800
  },

  // 🧱 Masonry Tools
  {
    id: 17,
    name: "Trowel (Karni)",
    slug: "trowel",
    icon: "🥄",
    desc: "Mili-juli cement lagane aur plaster finish karne ke liye expert masonry karni.",
    price: "₹10 per day",
    dailyRate: 10
  },
  {
    id: 18,
    name: "Putty Knife",
    slug: "putty-knife",
    icon: "🔪",
    desc: "Wall putty aur cracks filler lagane ke liye stainless steel flexible blade.",
    price: "₹5 per day",
    dailyRate: 5
  },
  {
    id: 19,
    name: "Plumb Bob (Sahul)",
    slug: "plumb-bob",
    icon: "⚓",
    desc: "Deewar ko seedh me rakhne aur vertical alignment check karne ke liye brass sahul.",
    price: "₹8 per day",
    dailyRate: 8
  },
  {
    id: 20,
    name: "Spirit Level",
    slug: "spirit-level",
    icon: "📏",
    desc: "Tiles aur masonry tiles ka horizontal floor level accurate check karne ke liye bubble level ruler.",
    price: "₹12 per day",
    dailyRate: 12
  },
  {
    id: 21,
    name: "Measuring Tape",
    slug: "measuring-tape",
    icon: "📏",
    desc: "5 Meter flexible steel tape marking aur measurements ke liye.",
    price: "₹5 per day",
    dailyRate: 5
  },
  {
    id: 22,
    name: "Brick Hammer",
    slug: "brick-hammer",
    icon: "🔨",
    desc: "Eent cutting aur adjustments ke liye specific masonry brick hammer.",
    price: "₹15 per day",
    dailyRate: 15
  },
  {
    id: 23,
    name: "Chisel",
    slug: "chisel",
    icon: "⛏️",
    desc: "Stone aur wood chipping/carving ke liye hardened steel chisel tool.",
    price: "₹10 per day",
    dailyRate: 10
  },

  // 🎨 Painting Tools
  {
    id: 24,
    name: "Paint Spray Machine",
    slug: "paint-spray-machine",
    icon: "💨",
    desc: "Tez aur accurate smooth finishing paint ke liye dynamic spray gun machine.",
    price: "₹150 per day",
    dailyRate: 150
  },
  {
    id: 25,
    name: "Paint Roller",
    slug: "paint-roller",
    icon: "🖌️",
    desc: "Deewar par uniform wall paint aur primer application ke liye soft roller roller.",
    price: "₹10 per day",
    dailyRate: 10
  },
  {
    id: 26,
    name: "Paint Brush",
    slug: "paint-brush",
    icon: "🎨",
    desc: "Corners aur detailing walls ke liye premium quality bristle brush.",
    price: "₹5 per day",
    dailyRate: 5
  },
  {
    id: 27,
    name: "Sanding Machine",
    slug: "sanding-machine",
    icon: "🪵",
    desc: "Deewar ya lakdi ko smooth karne ke liye high RPM mechanical sander orbital.",
    price: "₹60 per day",
    dailyRate: 60
  },

  // ⚡ Electrical Tools
  {
    id: 28,
    name: "Wire Stripper",
    slug: "wire-stripper",
    icon: "✂️",
    desc: "Copper/Aluminium cables ka protective outer jacket utaarne ke liye cutter tool.",
    price: "₹15 per day",
    dailyRate: 15
  },
  {
    id: 29,
    name: "Multimeter",
    slug: "multimeter",
    icon: "📟",
    desc: "Voltage, current aur testing testing check karne ke liye digital multimeter device.",
    price: "₹30 per day",
    dailyRate: 30
  },
  {
    id: 30,
    name: "Crimping Tool",
    slug: "crimping-tool",
    icon: "🔧",
    desc: "Electric lugs, thimbles aur RJ45 connections punch karne ke liye crimping tool.",
    price: "₹25 per day",
    dailyRate: 25
  },
  {
    id: 31,
    name: "Cable Cutter",
    slug: "cable-cutter",
    icon: "✂️",
    desc: "Mote armored wires aur conduits ko clean kaatne ke liye heavy cable cutter.",
    price: "₹20 per day",
    dailyRate: 20
  },
  {
    id: 32,
    name: "Electric Tester",
    slug: "electric-tester",
    icon: "⚡",
    desc: "Phase current verification ke liye digital LCD display led electric tester pin.",
    price: "₹5 per day",
    dailyRate: 5
  },

  // 🚿 Plumbing Tools
  {
    id: 33,
    name: "Pipe Wrench",
    slug: "pipe-wrench",
    icon: "🔧",
    desc: "GI pipes, heavy valves aur nuts ko tight karne ke liye heavy duty adjustable pipe wrench.",
    price: "₹20 per day",
    dailyRate: 20
  },
  {
    id: 34,
    name: "Pipe Cutter",
    slug: "pipe-cutter",
    icon: "✂️",
    desc: "PVC aur CPVC pipes ko bina cross-cuts ke perfectly round katne ke liye cutter.",
    price: "₹15 per day",
    dailyRate: 15
  },
  {
    id: 35,
    name: "Threading Machine",
    slug: "threading-machine",
    icon: "⚙️",
    desc: "GI and steel pipes par automatic external threading choori banane ke liye manual/auto machine.",
    price: "₹150 per day",
    dailyRate: 150
  },
  {
    id: 36,
    name: "PVC Pipe Welding Machine",
    slug: "pvc-pipe-welding-machine",
    icon: "🔥",
    desc: "Hot melt heating plate machine PPR and CPVC fittings pipe welding connection joiner.",
    price: "₹80 per day",
    dailyRate: 80
  },

  // 🪵 Timber/Wood Work Tools
  {
    id: 37,
    name: "Wood Cutter Machine",
    slug: "wood-cutter-machine",
    icon: "🪚",
    desc: "Timber logs aur boards cutting ke liye heavy motor wood circular saw cutter.",
    price: "₹100 per day",
    dailyRate: 100
  },
  {
    id: 38,
    name: "Router Machine",
    slug: "router-machine",
    icon: "🌀",
    desc: "Lakdi ke corners me patterns aur moulding design groove cut karne ke liye machine.",
    price: "₹120 per day",
    dailyRate: 120
  },
  {
    id: 39,
    name: "Planer Machine",
    slug: "planer-machine",
    icon: "🪵",
    desc: "Randa machine lakdi ke ruff surfaces ko perfectly plane aur smooth karne ke liye.",
    price: "₹90 per day",
    dailyRate: 90
  },
  {
    id: 40,
    name: "Belt Sander",
    slug: "belt-sander",
    icon: "🛹",
    desc: "Wood surfaces par dynamic fast sanding kar ke smooth finish dene ke liye sander.",
    price: "₹70 per day",
    dailyRate: 70
  },
  {
    id: 41,
    name: "Nail Gun",
    slug: "nail-gun",
    icon: "🔫",
    desc: "Pneumatic powered wood pin nailer for fast modular wooden framing.",
    price: "₹80 per day",
    dailyRate: 80
  },
  {
    id: 42,
    name: "Air Compressor",
    slug: "air-compressor",
    icon: "💨",
    desc: "Nail gun aur paint spray ke liye high-pressure dynamic air compressor tank.",
    price: "₹200 per day",
    dailyRate: 200
  },

  // 🏠 Building Materials
  {
    id: 43,
    name: "Cement",
    slug: "cement",
    icon: "🧱",
    desc: "Premium quality UltraTech/Birla OPC 43 Grade construction cement.",
    price: "₹420 per bag",
    dailyRate: 420
  },
  {
    id: 44,
    name: "Sand (Ret)",
    slug: "sand-ret",
    icon: "⏳",
    desc: "Fine quality red/gray sand for plastering and concrete mix.",
    price: "₹3500 per trolley",
    dailyRate: 3500
  },
  {
    id: 45,
    name: "Bricks (Eent)",
    slug: "bricks-eent",
    icon: "🧱",
    desc: "Premium quality red clay bricks (1st class A-Grade) for load walls.",
    price: "₹8 per piece",
    dailyRate: 8
  },
  {
    id: 46,
    name: "Steel Rod (Sariya)",
    slug: "steel-rod-sariya",
    icon: "⛓️",
    desc: "TATA Tiscon TMT Steel bars sariya (8mm to 25mm) for structural building.",
    price: "₹75 per kg",
    dailyRate: 75
  },
  {
    id: 47,
    name: "Tiles",
    slug: "tiles",
    icon: "⬜",
    desc: "Kajaria double charged vitrified floor and bathroom wall tiles catalog.",
    price: "₹45 per sqft",
    dailyRate: 45
  },
  {
    id: 48,
    name: "Plywood",
    slug: "plywood",
    icon: "🪵",
    desc: "Waterproof Gurjan wood plywood sheets (12mm to 19mm) for furniture and shuttering.",
    price: "₹150 per sheet",
    dailyRate: 150
  },
  {
    id: 49,
    name: "Timber/Wood",
    slug: "timber-wood",
    icon: "🪵",
    desc: "Premium Teak wood (Sagon), Sal wood, and Eucalyptus logs for frames and doors.",
    price: "₹400 per cft",
    dailyRate: 400
  },
  {
    id: 50,
    name: "Paint",
    slug: "paint",
    icon: "🎨",
    desc: "Asian Paints Apex weatherproof exterior wall emulsion and tractor distemper.",
    price: "₹250 per litre",
    dailyRate: 250
  },
  {
    id: 51,
    name: "Putty",
    slug: "putty",
    icon: "⬜",
    desc: "Birla White wall care putty for super smooth internal wall surfaces.",
    price: "₹800 per bag",
    dailyRate: 800
  },
  {
    id: 52,
    name: "POP (Plaster of Paris)",
    slug: "pop",
    icon: "⬜",
    desc: "JK Super Fine POP plaster of Paris for false ceilings and cornices designs.",
    price: "₹350 per bag",
    dailyRate: 350
  },

  // 🪵 Original Timber Rental Items (Pushed to bottom)
  {
    id: 53,
    name: "Balli",
    slug: "balli",
    icon: "🪵",
    desc: "Mazboot bamboo support jo ghar construction me support aur staging ke liye use hota hai.",
    price: "₹5 per piece/day",
    dailyRate: 5
  },
  {
    id: 54,
    name: "Patra",
    slug: "patra",
    icon: "🪵",
    desc: "Strong wooden planks jo shuttering aur support ke liye use hote hain.",
    price: "₹0.50 per piece/day",
    dailyRate: 0.5
  },
  {
    id: 55,
    name: "Chali",
    slug: "chali",
    icon: "🪜",
    desc: "Construction ke dauran labor support ke liye use hone wala iron/wood frame.",
    price: "₹10 per piece/day",
    dailyRate: 10
  },
  {
    id: 56,
    name: "Bans",
    slug: "bans",
    icon: "🎋",
    desc: "Lambi aur mazboot bans scaffold structures banane ke liye.",
    price: "₹4 per piece/day",
    dailyRate: 4
  },
  {
    id: 57,
    name: "Gater (Girders)",
    slug: "gater",
    icon: "⛓️",
    desc: "Heavy load support ke liye structural steel iron girders.",
    price: "₹25 per piece/day",
    dailyRate: 25
  },
  {
    id: 58,
    name: "Teen ki Chadar",
    slug: "teen-ki-chadar",
    icon: "⬜",
    desc: "Temporary safety shed aur boundary covering ke liye metal sheet.",
    price: "₹15 per piece/day",
    dailyRate: 15
  },
  {
    id: 59,
    name: "Sidi (Ladder)",
    slug: "sidi",
    icon: "🪜",
    desc: "Unchaai par plaster, light fitting aur paint ke liye double-sided iron ladder.",
    price: "₹20 per piece/day",
    dailyRate: 20
  },
  {
    id: 60,
    name: "Stool / Platform",
    slug: "stool",
    icon: "🪑",
    desc: "Chhote ceiling aur height work ke liye stable staging stool.",
    price: "₹10 per piece/day",
    dailyRate: 10
  },
  {
    id: 61,
    name: "Centering Plate",
    slug: "centering-plate",
    icon: "⬜",
    desc: "Slab structure lintel/lantar layout shuttering ke liye iron steel plates.",
    price: "₹15 per piece/day",
    dailyRate: 15
  }
];

export default items;