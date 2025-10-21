// Local bird data referencing audio files under bird_song_game/audio/
// This file intentionally defines `allBirds` in the global scope so bird_song_game.html can use it.

const allBirds = [
  {
    name: "American Robin",
    scientific: "Turdus migratorius",
    info: "Common songbird with cheerful, caroling song",
    audioUrl: "audio/XC134898-LS100612_Turdus_migratorius.mp3",
    recordist: "Paul Driver",
    xcId: "134898"
  },
  {
    name: "Northern Cardinal",
    scientific: "Cardinalis cardinalis",
    info: "Bright red bird with loud, clear whistles",
    audioUrl: "audio/XC413729-NOCA.mp3",
    recordist: "Andrew Spencer",
    xcId: "413729"
  },
  {
    name: "Blue Jay",
    scientific: "Cyanocitta cristata",
    info: "Bold corvid with harsh, jay-jay calls",
    audioUrl: "audio/XC51630-Blue_Jay.mp3",
    recordist: "Greg Irving",
    xcId: "51630"
  },
  {
    name: "Black-capped Chickadee",
    scientific: "Poecile atricapillus",
    info: "Small bird with distinctive chick-a-dee-dee-dee",
    audioUrl: "audio/XC51188-Chickadee__Black-capped.mp3",
    recordist: "Paul Driver",
    xcId: "51188"
  },
  {
    name: "Song Sparrow",
    scientific: "Melospiza melodia",
    info: "Brown streaked sparrow with complex melodious song",
    audioUrl: "audio/XC420595-SOSP.mp3",
    recordist: "Andrew Spencer",
    xcId: "420595"
  },
  {
    name: "Wood Thrush",
    scientific: "Hylocichla mustelina",
    info: "Forest bird with flutelike, ethereal song",
    audioUrl: "audio/XC413686-WOTH.mp3",
    recordist: "Andrew Spencer",
    xcId: "413686"
  },
  {
    name: "Eastern Meadowlark",
    scientific: "Sturnella magna",
    info: "Grassland bird with clear, whistled spring-of-the-year",
    audioUrl: "audio/XC83562-Meadowlark__Eastern.mp3",
    recordist: "Paul Driver",
    xcId: "83562"
  },
  {
    name: "Baltimore Oriole",
    scientific: "Icterus galbula",
    info: "Orange and black songbird with rich, whistling notes",
    audioUrl: "audio/XC344942-baltimore_oriole_song.mp3",
    recordist: "Paul Marvin",
    xcId: "344942"
  },
  {
    name: "House Wren",
    scientific: "Troglodytes aedon",
    info: "Small brown bird with bubbling, cascading song",
    audioUrl: "audio/XC413697-HOWR.mp3",
    recordist: "Andrew Spencer",
    xcId: "413697"
  },
  {
    name: "Red-winged Blackbird",
    scientific: "Agelaius phoeniceus",
    info: "Marsh bird with conk-la-ree call",
    audioUrl: "audio/XC420591-RWBL.mp3",
    recordist: "Andrew Spencer",
    xcId: "420591"
  },
  {
    name: "White-throated Sparrow",
    scientific: "Zonotrichia albicollis",
    info: "Sparrow with pure, whistled oh-sweet-canada song",
    audioUrl: "audio/XC420585-WTSP.mp3",
    recordist: "Andrew Spencer",
    xcId: "420585"
  },
  {
    name: "Common Yellowthroat",
    scientific: "Geothlypis trichas",
    info: "Warbler with witchity-witchity-witchity song",
    audioUrl: "audio/XC420588-COYE.mp3",
    recordist: "Andrew Spencer",
    xcId: "420588"
  }
];
// keep global binding (no export) so the existing HTML can use `allBirds` as before
