/* Gig: the built-in lead sheets. Chord changes only: no melodies, no lyrics.
   Each chart is plain text in the same format you can paste in yourself (see GIG_FORMAT_HELP in session.js):
   a few "name: value" lines, then [Section] headings with bars between | bars |. Two chords in a bar share it;
   % repeats the bar before. "form:" says the order the sections are played in (default: as written).
   Where they come from (the "source:" line): jazz, Latin and classic pop/soul from iReal Pro's free community
   playlists; J-pop and recent pop from the chord charts on U-FRET and Ultimate Guitar. Those sites don't mark bar
   lines, so on those charts how long each chord lasts is approximate (two chords to a bar, a phrase at a time);
   keys are the recordings' keys. Edit a copy to fix anything. Tempos are approximate. */
const GIG_SHEETS=[
`title: IRIS OUT
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Driving 8ths
source: U-FRET chord chart
tempo: 140
key: G♯m
form: Verse Hook Bridge Verse Hook Bridge
[Verse]
C♯m7 G♯m | D♯7/G G♯m | C♯m7 G♯m | D♯7/G G♯m |
C♯m7 G♯m | D♯7/G G♯m | C♯m7 | G♯m D♯7/G |
G♯m |
[Hook]
C♯m7 | G♯m | D♯7/G | G♯m |
C♯m7 | G♯m | D♯7 | G♯m D♯/G |
G♯m |
[Bridge]
Fmaj7 E7 | Am | E7 Am | E7 |
Fmaj7 E7 | Am G | Am | Fmaj7 E7 |
Am | Dm E | Am | E7/G♯ |
Am |`,

`title: lulu.
by: Mrs. GREEN APPLE
genre: J-pop
feel: Bright rock
source: U-FRET chord chart
tempo: 148
key: G
[Intro]
C G | Em D | C G | Em G/B |
C G | Em D | Am Bm | C D |
[Verse]
Em | C G | D/F♯ | Em |
D | C G | B7 | Em D |
C G | D/F♯ | Em D/F♯ | G Bm |
C Am | G |
[Pre]
C D | Em D/F♯ | G | C D |
G Bm | C Bm | Am D/F♯ | B7 Em |
D♯° Am | D |
[Chorus]
G | Am G/B | C D | G Em |
D/F♯ G | G/B C | A/C♯ D | G Am |
G/B | C B7 | Em | Am |
Bm | C D | Em G/B |`,

`title: AIZO
by: King Gnu
genre: J-pop
feel: Fast, heavy
source: U-FRET chord chart
tempo: 186
key: Am
[Verse]
Am G | F♯m7♭5 F | Em | Am G |
F♯m7♭5 F | Em | Am G | F♯m7♭5 F |
Em | Am G | F♯m7♭5 F | Em |
[Pre]
Am | Gm F♯m7♭5 | F | Bm7♭5 |
Am | Gm F♯m7♭5 | F | Bm7♭5 |
E7 |
[Chorus]
Dm7 G7 | Am7 C | Fmaj7 E7 | Am A♯/C |
Dm7 G7 | Am7 Gm | C7 | Fmaj7 E7 |
F/G E7 |`,

`title: JANE DOE
by: 米津玄師, 宇多田ヒカル (Kenshi Yonezu, Hikaru Utada)
genre: J-pop
feel: Slow, dark
source: U-FRET chord chart
tempo: 96
key: Bm
[Intro]
Em Gm | G♯m7♭5 Gm | Em Gm | G♯m7♭5 Gm |
[Verse]
Em Gm | G♯m7♭5 Gm | Em Gm | G♯m7♭5 Gm |
Em Gm | G♯m7♭5 A♯° | G F♯7 | Bm A♯° |
Em Dmaj7 | Bm | A G | F♯7 Bm |
[Chorus]
G A | Bm | G A | F♯7 Bm |
F♯m G | A♯° Bm | G A | Bm |
[Bridge]
Em A | Dmaj7 G | C♯m7♭5 F♯7 | Bm B7 |
Em A | Dmaj7 G | C♯m7♭5 F♯7 |`,

`title: 革命道中 (Kakumei Dōchū)
by: アイナ・ジ・エンド (Aina the End)
genre: J-pop
feel: Rock 8ths
source: U-FRET chord chart
tempo: 160
key: Em
[Intro]
C B7 | Em G | C B7 | Em D♯m |
Dm C♯m7♭5 | C B7 | Em A | Am Bm |
C D |
[Verse]
Bm | Bm | Bm | Bm |
C B7 | Em G | C B7 | Em G |
Bm | Bm | Bm | Bm |
[Chorus]
C B7 | Em G | C D | Em D♯m |
Dm C♯m7♭5 | C B7 | Em A | Am Bm |
C D |`,

`title: Pretender
by: Official髭男dism
genre: J-pop
feel: Pop ballad
source: U-FRET chord chart
tempo: 92
key: A♭
form: Intro Verse Pre Chorus Verse Pre Chorus
[Intro]
A♭ E♭ | C7 Fm | B♭m E♭ | A♭ E♭ |
C7 Fm | B♭m E♭ |
[Verse]
A♭ E♭ | C7 Fm | B♭ | B♭m |
D♭ E♭ | A♭ E♭ | C7 Fm | B♭ |
B♭m E♭ | A♭ |
[Pre]
D♭maj7 C7 | Fm E♭m7 | A♭ | D♭maj7 C7 |
Fm Em7 | E♭m7 D° | D♭maj7 C7 | Fm E♭m7 |
A♭ | D♭maj7 C7 | Fm D° | B♭m E♭ |
[Chorus]
A♭ E♭ | C7 | Fm E♭m7 | A♭ D♭maj7 |
Cm7 B♭m | E♭ | A♭ E♭ | C7 |
Fm E♭m7 | A♭ D♭maj7 | Cm7 B♭m | E♭ |
A♭ |`,

`title: Subtitle
by: Official髭男dism
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 81
key: B
[Verse]
B A♯m | D♯m | G♯m D° | D♯ |
B A♯m | D♯m G♯m | D° D♯m | B |
A♯m D♯m | G♯m B/C♯ | F♯ |
[Pre]
B F♯/A♯ | G♯m | D♯ B | F♯/A♯ G♯m |
A♯ D♯m | F♯ D♯m | Cm7♭5 B | C♯ D♯sus4 |
A♯m B | C♯ F♯ |
[Chorus]
B C♯ | A♯m D♯ | G♯m | C♯ F♯ |
F♯7 | C7♭5 B | C♯ | A♯m D♯ |
G♯m A♯m | Bm | C♯ C7♭5 | B |`,

`title: ミックスナッツ (Mixed Nuts)
by: Official髭男dism
genre: J-pop
feel: Swing-pop shuffle
source: U-FRET chord chart
tempo: 175
key: F♯
[Verse]
F♯ D° | A♯ D♯m | C♯m F♯ | B C♯ |
A♯m D♯m | B C♯ | Bm C♯ | F♯ D° |
A♯ D♯m | C♯m F♯ | B C♯ | A♯m D♯m |
G♯m D♯m | A♯ |
[Pre]
B E | A D | G♯m C♯ | F♯ |
Em A | D G | F♯m A | B E7 |
A C♯ |
[Chorus]
F♯ D° | A♯ D♯m | C♯m F♯ | B A♯ |
D♯m G♯ | G♯m C♯ | F♯ D° | A♯ D♯m |
C♯m F♯ | B A♯ | D♯m G♯ | G♯m C♯ |
B | F♯/A♯ G♯m | C♯7 F♯ |`,

`title: 夜に駆ける (Yoru ni Kakeru)
by: YOASOBI
genre: J-pop
feel: Fast pop, 16ths
source: U-FRET chord chart
tempo: 130
key: Cm
form: Intro Verse Pre Chorus Intro Verse Pre Chorus
[Intro]
A♭ G7 | Cm7 B♭m7 | A♭ G7 | Cm7 B♭m7 |
E♭7 | A♭ G7 | Cm7 B♭m7 | A♭ G7 |
Cm7 |
[Verse]
A♭ G7 | Cm7 E♭ | A♭ G7 | Cm7 B♭m7 |
E♭7 | A♭ B♭ | Gm7 Cm7 | A♭ G7 |
Cm7 |
[Pre]
A♭ B♭ | Gm7 Cm7 | A♭ G7 | Cm7 B♭m7 |
E♭7 | A♭ B♭ | G7/B Cm7 | A♭ G7 |
[Chorus]
A♭ B♭ | Gm7 Cm7 | A♭ G7 | Cm7 B♭m7 |
E♭7 | A♭ B♭ | Gm7 Cm7 | A♭ G7 |
A♭ B♭ | Gm7 Cm7 | A♭ G7 | Cm7 B♭m7 |
E♭7 | A♭ B♭ | G7/B Cm7 | A♭ B♭ |`,

`title: アイドル (Idol)
by: YOASOBI
genre: J-pop
feel: Fast idol pop
source: U-FRET chord chart
tempo: 166
key: G♯m
[Verse]
G♯m | G♯m | E D♯ | G♯m |
G♯m | E | D♯ | G♯m |
G♯mmaj7 G♯m7 | Fm7♭5 E | D♯ A♯7 | D♯ |
G♯m | G♯mmaj7 G♯m7 | Fm7♭5 E | D♯ |
A♯7 D♯ |
[Pre]
Emaj7 D♯7 | G♯m F♯m | B C♯m7 | D♯7 G♯m |
G♯mmaj7 G♯m7 | Emaj7 D♯7 | G♯m F♯m | B C♯m7 |
D♯ | E D♯ |
[Chorus]
Fmaj7 E7 | Am C | Dm7 E7 | Am |
Fmaj7 E7 | Am C | Dm7 E7 | Am |
Fmaj7 E7 | Am Dm7 | E7 Am | G♯m Gm |
C Fmaj7 | E7 Am | G♯m Gm | C |
Dm7 E7 | A |`,

`title: 群青 (Gunjō)
by: YOASOBI
genre: J-pop
feel: Mid-tempo pop
source: U-FRET chord chart
tempo: 92
key: Gm
[Verse]
E♭ | D Gm | E♭ D | Gm Fm |
B♭ | E♭ F | E♭ D | D/G♭ Gm |
B♭ E♭ | F | F |
[Pre]
E♭ | B♭ | E♭ F | B♭ D |
[Chorus]
E♭ F | E♭ | Dm Gm | F |
E♭ D | Gm Fm | B♭ | E♭ F |
D D/G♭ | Gm | F E♭ | F |`,

`title: 紅蓮華 (Gurenge)
by: LiSA
genre: J-pop
feel: Fast rock
source: U-FRET chord chart
tempo: 135
key: Em
form: Verse Pre Chorus Verse Pre Chorus
[Verse]
Em D | C | D Em | D |
C | D | Em D | C D |
Em D | C | D |
[Pre]
C D | Em Bm | C D | Em |
[Chorus]
C D | Em Bm | C | D♯° Em |
D Em | D | Bm A | Bm A |
C D | D♯° Em | C | D |`,

`title: 廻廻奇譚 (Kaikai Kitan)
by: Eve
genre: J-pop
feel: Fast, syncopated
source: U-FRET chord chart
tempo: 185
key: Gm
[Intro]
E♭maj7 Am7 | A♭m7 | Gm7 E♭maj7 | F |
Gm7 E♭maj7 | F | E♭maj7 |
[Verse]
Gm7 | Gm7 E♭maj7 | F | Gm7 |
E♭maj7 F | Gm7 | E♭maj7 F | Gm7 |
E♭maj7 F | E♭maj7 |
[Pre]
B♭/D | D♭maj7 | E♭ D7 |
[Chorus]
Gm7 | Fm7 B♭7 | E♭maj7 | Dsus4 D |
Gm7 | Fm7 B♭7 | E♭maj7 | D Gm7 |
F/A B♭ | C | Cm7 Dm7 | E♭maj7 D♭maj7 |`,

`title: 死ぬのがいいわ (Shinunoga E-Wa)
by: 藤井風 (Fujii Kaze)
genre: J-pop
feel: Slinky groove
source: U-FRET chord chart
tempo: 123
key: E
form: Verse Chorus Verse Chorus
[Verse]
E | G♯m | F♯m | D |
E | G♯m | F♯m | D |
[Chorus]
Em | Am | F | B |
Em | Am | F | B |`,

`title: 怪獣の花唄 (Kaijū no Hanauta)
by: Vaundy
genre: J-pop
feel: Upbeat rock
source: U-FRET chord chart
tempo: 176
key: D
[Verse]
G | G | D/F♯ | Dm/F |
D/F♯ | G | D/F♯ | Dm/F |
D/F♯ |
[Pre]
Em | D/F♯ | G | A |
A |
[Chorus]
G A Bm | D/F♯ | G A Bm | D |
G A Bm | D/F♯ | G A D |`,

`title: 残響散歌 (Zankyō Sanka)
by: Aimer
genre: J-pop
feel: Fast rock
source: U-FRET chord chart
tempo: 180
key: G♯m
[Intro]
G♯m E | F♯ | G♯m E | F♯ |
G♯m E | F♯ | G♯m E | F♯ D♯7 |
[Verse]
G♯m E | C♯m F♯ | D♯/G | G♯m E |
C♯m F♯ | D♯/G |
[Pre]
E B | F♯ D♯7 | G♯m G♯ | Fm |
C♯m D♯m | Emaj7 Fm7♭5 | D♯7 |
[Chorus]
G♯m E | F♯ Bsus4 | B | C♯m D♯m |
Emaj7 F♯ | D♯/G | G♯m E | F♯ Bsus4 |
B | C♯m D♯7 | G♯m Fm7♭5 | E D♯/G |`,

`title: ただ君に晴れ (Tada Kimi ni Hare)
by: ヨルシカ (Yorushika)
genre: J-pop
feel: Bright guitar rock
source: U-FRET chord chart
tempo: 112
key: F
[Verse]
B♭ F C Dm | B♭ F C C/E | B♭ F C Dm | B♭ F C F |
[Chorus]
Dm B♭ C F | Dm B♭ C F | Dm B♭ C F | Dm B♭ C F |
B♭ C F |`,

`title: Lemon
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 87
key: B
[Verse]
G♯m F♯ | E B | E B | D° D♯ |
G♯m F♯ | E B | E B | F♯ B |
[Pre]
C♯m7 G♯m | F♯ B | C♯m7 G♯m | E F♯ |
B |
[Chorus]
E B | F♯ G♯m | E B | F♯ D♯ |
E B | A♯m7♭5 D♯ | G♯m | C♯m7 G♯m |
E F♯ | Fm7♭5 | C♯m7 G♯m | E F♯ |
B |`,

`title: さよーならまたいつか！ (Sayonara Mata Itsuka!)
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Swinging pop
source: U-FRET chord chart
tempo: 122
key: Em
[Intro]
Cmaj7 Gmaj7 | B Em7 |
[Verse]
Cmaj7 Gmaj7 | B Em7 | Dm C♯° | Cm D |
Cmaj7 Gmaj7 | B Em7 | Dm C♯° | Cm D |
[Pre]
Am B | Em Am | B E7 | Am B/D♯ |
Em D♯+ | Dm7 | G Am | D7 G |
[Chorus]
C D | Em7 G | C Bm | Em7 E7 |
D♯+ Dm | C♯° G° | Cm D | C D |
Em7 G | C B | Em7 G | G♯° Am |
C♯° G° | Cm D |`,

`title: ライラック (Lilac)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Fast pop rock
source: U-FRET chord chart
tempo: 136
key: B♭
[Intro]
Gm7 Dm7 | E♭ B♭ | F/A | Gm7 Dm7 |
E♭ B♭ | Gm7 Dm7 | E♭ B♭ | F/A |
Gm7 Dm7 | E♭ G♭ | F |
[Verse]
B♭ Cm | Dm | E♭ F | B♭ |
F/A Gm | B♭/D E♭ | E♭ F | G♭ F |
B♭ Cm | Dm | E♭ F | B♭ |
Gm Dm | E♭ | Cm F | B♭ |
[Pre]
B° | C | C | G/B |
Am | G/B | Cm G♭ | A♭ |
[Chorus]
B♭ | E♭ F | B♭ F/A | Gm E° |
Cm Dm | E♭m G♭ | B♭ E♭ | F G♭° |
Gm F | E° | C E♭ | F Gm |
E♭ D | Gm F | E♭ D | Gm |
C7 Cm | Dm F | B♭ |`,

`title: 青と夏 (Ao to Natsu)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Fast summer rock
source: U-FRET chord chart
tempo: 182
key: E
[Intro]
E/G♯ A | B C♯m | E/G♯ A | F♯m7 B |
E | A E/G♯ | F♯m7 B | E G♯7 |
C♯m F♯7 | A B | C D |
[Verse]
E/G♯ A | B C♯m | E/G♯ A | B C° |
C♯m | E/G♯ A | B C♯m | E/G♯ A |
B | C D |
[Chorus]
E B/D♯ | C♯m B | A B | E |
A B | C♯m G♯m7 | A B | E |
E B/D♯ | C♯m B | A C° | C♯m G♯m7 |
A B | C♯m E | A B | E G♯7 |
A E | F♯m7 B | E |`,

`title: ケセラセラ (Que Sera Sera)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Bouncy pop
source: U-FRET chord chart
tempo: 157
key: A
[Verse]
A Bm | A/C♯ D | A | F♯m E/G♯ |
A D | Dm | A Bm | A/C♯ D |
A | E/G♯ F♯m | A/C♯ Bm | E |
[Pre]
F♯m | F♯m7/E Dm | A/C♯ | Bm C♯m |
D | Esus4 E | F♯sus4 F♯ |
[Chorus]
B E | F♯ D♯/G | G♯m Fm7♭5 | E Em |
B/D♯ E | F♯ D♯/G | G♯m Fm7♭5 | E Fm7♭5 |
F♯ |`,

`title: 白日 (Hakujitsu)
by: King Gnu
genre: J-pop
feel: Ballad, half-time
source: U-FRET chord chart
tempo: 87
key: B♭m
[Intro]
D♭ Cm7♭5 | F7 | B♭m A♭ | G♭ A♭ |
D♭ Cm7♭5 | F7 B♭m | A♭ G♭ | A♭ D♭ |
[Verse]
B♭m | G♭ | A♭ | A° B♭m |
E♭7 | G♭ | A♭ A° | B♭m |
G♭ | A♭ | A° | B♭m E♭7 |
G♭ | Gm7♭5 A♭ | F7 |
[Chorus]
B♭m G♭ | A♭ D♭ | F7 G♭ | Gm7♭5 A° |
B♭m G♭ | A♭ | D♭ F7 | G♭ |
Gm7♭5 A♭ |`,

`title: マリーゴールド (Marigold)
by: あいみょん (Aimyon)
genre: J-pop
feel: Folk-pop
source: U-FRET chord chart
tempo: 85
key: D
[Intro]
D | D A/C♯ | Bm F♯m7 | G D/F♯ |
G A |
[Verse]
D A/C♯ | Bm A | G D/F♯ | G A |
D A/C♯ | Bm A | G D/F♯ | G A |
[Pre]
Bm F♯m7 | G A |
[Chorus]
D A/C♯ | Bm A | G D/F♯ | Bm |
G A | D A/C♯ | Bm A | G D/F♯ |
Bm | G A |`,

`title: プラスティック・ラブ (Plastic Love)
by: 竹内まりや (Mariya Takeuchi)
genre: J-pop
feel: City pop, 16ths
source: U-FRET chord chart
tempo: 105
key: Dm
[Verse]
Gm7 B♭° Am7 Dm7 | Gm7 B♭° Am7 Dm7 | Gm7 E♭ Dm7 G7 | Gm7 B♭° Dm7 Am |
[Chorus]
B♭maj7 C6 B♭maj7 C6 | Em7 A Dm7 | B♭maj7 C6 Am7 Dm7 | B♭maj7 C6 B♭maj7 C6 |
B♭maj7 Am7 D | Gm7 Gm7♭5 Dm7 G7 | Gm7 B♭° Dm7 Am7 | Dm7 Cm7♭5 |`,

`title: 真夜中のドア〜Stay With Me (Mayonaka no Door)
by: 松原みき (Miki Matsubara)
genre: J-pop
feel: City pop, 16ths
source: U-FRET chord chart
tempo: 105
key: Dm
[Intro]
B♭maj7 A7 | Am7 | Dm7 Gm7 | Gm7/C |
F F6 | F F7 | F6 |
[Verse]
Gm Fmaj7 | Gm Fmaj7 | Gm A | Dm |
B♭maj7 F/A | Gm B♭/C | Gm A | Dm |
B♭maj7 F/A | Gm B♭/C |
[Chorus]
B♭maj7 Am | A Dm | Dmmaj7 Dm7 | Dm6 |
Gm B♭/C | B♭maj7 Am | A Dm | Dmmaj7 Dm7 |
Dm6 | Gm B♭/C |`,

`title: Still Into You
by: Paramore
genre: Pop
feel: Pop-punk 8ths
source: Ultimate Guitar chord chart
tempo: 136
key: F
[Verse]
F | F | Dm | Dm |
F | F | Dm | Dm |
B♭ | C F |
[Chorus]
B♭ C | F | B♭ C | F |
B♭ C | Dm F | B♭ | C F |
[Bridge]
F | F | Dm C | F |
F | Dm C | B♭ C | F |
B♭ | C F |`,

`title: Misery Business
by: Paramore
genre: Pop
feel: Fast pop-punk
source: Ultimate Guitar chord chart
tempo: 172
key: Fm
[Intro]
Fm E♭ | Fm D♭ | Fm E♭ | Fm D♭ |
[Verse]
Fm E♭ | Fm D♭ | Fm E♭ | Fm D♭ |
Fm E♭ | Fm D♭ | Fm E♭ | Fm D♭ |
[Chorus]
D♭maj7 A♭ | E♭ | Fm E♭ | D♭maj7 A♭ |
E♭ | Fm E♭ | D♭maj7 E♭ | D♭maj7 E♭ |
Fm E♭ | Fm D♭ |`,

`title: Ain't It Fun
by: Paramore
genre: Pop
feel: Funky pop-rock
source: Ultimate Guitar chord chart
tempo: 104
key: C♯m
[Verse]
Amaj7 | C♯m E | Amaj7 | C♯m E |
Amaj7 | C♯m E | Amaj7 | C♯m E |
[Chorus]
A | C♯m E | A C♯m | E |
A | C♯m E | A C♯m | E |
[Post-chorus]
A | E B | A | E B |
A | C♯m E | A C♯m | E |`,

`title: The Only Exception
by: Paramore
genre: Pop
feel: Slow 6/8
source: U-FRET chord chart
tempo: 72
key: B
time: 6/8
[Verse]
B F♯m Emaj7 | B F♯m Emaj7 | B F♯m Emaj7 | B F♯m |
Emaj7 |
[Chorus]
B | F♯m Emaj7 | B | F♯m Emaj7 |
C♯m B F♯ | C♯m B F♯ |
[Bridge]
C♯m | B F♯ | C♯m | B F♯ Emaj7 |`,

`title: drivers license
by: Olivia Rodrigo
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 72
key: B♭
[Verse]
B♭ | Gm | E♭ | B♭ |
E♭ | B♭ | E♭ | B♭ |
Gm | F | B♭ | Dm7 |
E♭ | E♭6 | F | B♭ |
[Bridge]
Gm | E♭ | B♭ | F |
Gm | E♭ | B♭ | F |
Gm | E♭ | B♭ | F |
E♭ | B♭ | E♭ | B♭ |
Gm | F | Dm7 | F |
E♭ | E♭6 | F | B♭ |`,

`title: vampire
by: Olivia Rodrigo
genre: Pop
feel: Piano ballad into rock
source: U-FRET chord chart
tempo: 138
key: F
[Verse]
F A7 | B♭ | B♭ | B♭m |
F A7 | B♭ | B♭ | B♭m |
[Chorus]
Gm | C | F | A7 |
B♭ | B♭m | F | A7 |
B♭ B♭m |
[Bridge]
B♭ | B♭m | F | C |
B♭ | B♭m | F C | B♭ B♭m |
F |`,

`title: BIRDS OF A FEATHER
by: Billie Eilish
genre: Pop
feel: Laid-back pop
source: Ultimate Guitar chord chart
tempo: 105
key: D
[Verse]
D | Bm | Em | A |
D | Bm | Em | A |
[Chorus]
D | Bm | Em | A |`,

`title: Die With A Smile
by: Lady Gaga, Bruno Mars
genre: Pop
feel: Soul ballad
source: Ultimate Guitar chord chart
tempo: 79
key: A
[Verse]
Amaj7 Dmaj7 | Amaj7 | Dmaj7 | Dmaj7 |
[Pre]
Amaj7 | C♯m7 | F♯sus4 | F♯ |
[Chorus]
Bm7 Bm7/E | C♯m7 F♯m | Bm7 Bm7/E | C♯m7 F♯m |
Bm7 Bm7/E | A E/G♯ | F♯m C♯m7 | Bm7 E9sus4 |
Amaj7 Dmaj7 |
[Bridge]
C♯m7 F♯m | Bm7 Bm7/E | C♯m7 F♯m | Bm9 E13 |
C♯m7 F♯m | Bm9 E13 | C♯m7 F♯m |`,

`title: Good Luck, Babe!
by: Chappell Roan
genre: Pop
feel: Synth-pop
source: Ultimate Guitar chord chart
tempo: 117
key: D
[Verse]
G A | D Bm | G A | D Bm |
[Pre]
Em9 | Em | Em9 Em |
[Chorus]
G A | D Bm | G A | D Bm |
G A | D Bm | G A | D Bm |`,

`title: Espresso
by: Sabrina Carpenter
genre: Pop
feel: Disco-funk pop
source: Ultimate Guitar chord chart
tempo: 104
key: Am
[Loop]
Dm9 Em7 Am9 | Dm9 Em7 Am9 |`,

`title: Beautiful Things
by: Benson Boone
genre: Pop
feel: Ballad into rock
source: U-FRET chord chart
tempo: 105
key: B♭
[Verse]
E♭ B♭ | F Gm | E♭ B♭ | F |
E♭ B♭ | F Gm | E♭ B♭ | F |
[Chorus]
B♭ Gm | F E♭ | B♭ Gm | F E♭ |`,

`title: Golden
by: HUNTR/X (KPop Demon Hunters)
genre: Pop
feel: Anthem pop
source: U-FRET chord chart
tempo: 123
key: G
[Verse]
C G | D Em | C G | D |
Em | C G | D Em | C G |
D Em |
[Pre]
C | D | G | D/F♯ Em |
C | D | G | D/F♯ Em |
[Chorus]
C D | G D/F♯ | Em | C D |
G D/F♯ | Em |`,

`title: Lose Control
by: Teddy Swims
genre: Pop
feel: Soul ballad 6/8
source: Ultimate Guitar chord chart
tempo: 80
key: F♯m
time: 6/8
[Verse]
F♯m A/E | D C♯/F | F♯m A/E | D C♯/F |
[Chorus]
F♯m A/E | D C♯sus4 | C♯/F | F♯m A/E |
D C♯sus4 | C♯/F |`,

`title: Billie Jean
by: Michael Jackson
genre: Pop
feel: Funk-pop
source: iReal Pro community chart
tempo: 117
key: F♯m
form: Intro Intro A A2 B C
[Intro]
F♯m7 | % | F♯m7 | % |
[A]
F♯m F♯m9 | % | F♯m F♯m9 | % |
Bm | % | F♯m F♯m9 | % |
Bm | % | F♯m F♯m9 | % |
[A2]
F♯m F♯m9 | % | F♯m F♯m9 | % |
Bm | % | F♯m F♯m9 | % |
[B]
D | F♯m | D | F♯m |
D | F♯m | D | C♯7sus |
[C]
F♯m F♯m9 | % | F♯m F♯m9 | % |
Bm | % | F♯m F♯m9 | % |
Bm | % | F♯m F♯m9 | % |
F♯m | % | F♯m | % |
Bm | % | F♯m | % |
Bm | % | F♯m | % |
F♯m | % | F♯m | % |
F♯m | % | F♯m | % |
Bm | % | F♯m | % |`,

`title: Let It Be
by: The Beatles
genre: Pop
feel: Piano ballad
source: iReal Pro community chart
tempo: 72
key: C
form: Intro A B A B2 A B A B3
[Intro]
C G | Am Fmaj7 F6 | C G | F C |
[A]
C G | Am Fmaj7 F6 | C G | F C |
C G | Am Fmaj7 F6 | C G | F C |
[B]
Am C/G | F C | C G7 | F C |
[B2]
Am C/G | F C | C G7 | F C |
Am C/G | F C | C G7 | F C |
F C | G F C | F C | G F C |
[B3]
Am C/G | F C | C G7 | F C |
Am C/G | F C | C G7 | F C |
Am C/G | F C | C G7 | F C |
F C | G F C |`,

`title: Your Song
by: Elton John
genre: Pop
feel: Piano ballad
source: iReal Pro community chart
tempo: 64
key: E♭
time: 2/4
[Intro]
E♭ A♭/E♭ | B♭/E♭ A♭/E♭ |
[A]
E♭ A♭maj7 | B♭/D Gm | Cm Cm/B♭ | Cm/A A♭ |
E♭/B♭ B♭ | G/B Cm | E♭ Fm | A♭ |
B♭ B♭sus B♭ |
[A2]
E♭ A♭maj7 | B♭/D Gm | Cm Cm/B♭ | Cm/A A♭ |
E♭/B♭ B♭ | G/B Cm | E♭ Fm | A♭ |
E♭ A♭/E♭ E♭ |
[B]
B♭/D Cm | Fm A♭ | B♭/D Cm | Fm A♭ |
Cm Cm/B♭ | Cm/A A♭6 | A♭6 | E♭/G A♭ |
A♭ | B♭ B♭sus B♭ | E♭ A♭/E♭ | B♭/E♭ A♭/E♭ |
Cm Cm/B♭ | Cm/A A♭6 | A♭6 | E♭/G A♭ |
A♭ | E♭ A♭/E♭ | B♭/E♭ A♭/E♭ | E♭ |`,

`title: Yellow
by: Coldplay
genre: Pop
feel: Rock ballad
source: iReal Pro community chart
tempo: 88
key: B
form: Intro Intro2 A A A2 B C D D2
[Intro]
B | B Bsus |
[Intro2]
B | B Bsus | B | Bsus |
F♯ | Fadd9 | E6 | E5 |
B5 | Bsus |
[A]
B | % | F♯sus | % |
Emaj7 | % |
[A2]
B | % | F♯sus | % |
Emaj7 | % | B | Bsus B |
[B]
E5 E5/F♯ E5/B | G♯m7 F♯sus F♯ | E5 E5/F♯ E5/B | G♯m7 F♯sus F♯ |
E5 E5/F♯ E5/B | G♯m7 F♯sus F♯ | Emaj7 | % |
[C]
B | Bsus | F♯ | F♯add9 |
E6 | E5 | B5 | Bsus |
[D]
B | Bsus | F♯ | F♯add9 |
E6 | E5 |
[D2]
B | Bsus | F♯ | F♯add9 |
E6 | E5 | B | % |
F♯m7 | % | Emaj7 | % |`,

`title: Fix You
by: Coldplay
genre: Pop
feel: Piano ballad
source: iReal Pro community chart
tempo: 69
key: E♭
form: Intro A A B
[Intro]
E♭ Gm Gm/B♭ | Cm B♭ | E♭ Gm Gm/B♭ | Cm B♭ |
[A]
E♭ Gm Gm/B♭ | Cm B♭ | E♭ Gm Gm/B♭ | Cm B♭ |
E♭ Gm Gm/B♭ | Cm B♭ | E♭ Gm Gm/B♭ | Cm B♭ |
[B]
A♭ A♭/G | B♭sus B♭ | A♭ A♭/G | B♭sus B♭ |
A♭ A♭/G | B♭sus B♭ | E♭ Gm Gm/B♭ | Cm B♭ |
E♭ Gm Gm/B♭ | Cm B♭ | E♭5 | A♭ A♭2 |
E♭5 | B♭sus B♭ | Cm | A♭ A♭2 |
E♭5 | B♭sus B♭ | E♭5 | A♭ A♭2 |
E♭5 | B♭sus B♭ | Cm | A♭ A♭2 |
E♭5 | B♭sus B♭ | A♭ A♭/G | B♭sus B♭ |
A♭ A♭/G | B♭sus B♭ | E♭ |`,

`title: The Scientist
by: Coldplay
genre: Pop
feel: Piano ballad
source: iReal Pro community chart
tempo: 74
key: Dm
form: A B A B2 C C2
[A]
Dm7 | B♭ | F | Fadd9 C/E |
Dm7 | B♭ | F | Fadd9 C/E |
Dm7 | B♭ | F | Fadd9 C/E |
Dm7 | B♭ | F | Fadd9 C/E |
[B]
B♭ | % | F | Fadd9 F/A |
B♭ | % | F | Fmaj9 F6 |
C | % | F | B♭ |
F | Fadd9 C/E |
[B2]
B♭ | % | F | Fadd9 F/A |
B♭ | % | F | Fmaj9 F6 |
C | % | F | B♭ |
F | % |
[C]
Dm | B♭ | F | % |
[C2]
Dm | B♭ | F | % |
Dm | B♭ | F |`,

`title: Rolling in the Deep
by: Adele
genre: Pop
feel: Driving soul-pop
source: iReal Pro community chart
tempo: 105
key: Cm
form: Intro A A2 B C C D C C2
[Intro]
C5 | % |
[A]
C5 | G5 | B♭5 | G5 B♭5 |
[A2]
C5 | G5 | B♭5 | G5 B♭5 |
C5 | G5 | B♭5 | G5 B♭5 |
C5 | G5 | B♭5 | G5 B♭5 |
[B]
A♭ | B♭ | Gm | A♭ B♭ |
A♭ | B♭ | Gm | G7 |
[C]
Cm | B♭ | A♭maj7 | A♭maj7 B♭ |
[D]
A♭maj7 | B♭ | Cm | B♭ |
A♭maj7 | % | B♭ | % |
Cm N.C. | N.C. | N.C. | N.C. |
Cm N.C. | N.C. | N.C. | N.C. |
[C2]
Cm | B♭ | A♭maj7 | A♭maj7 B♭ |
Cm N.C. |`,

`title: If I Ain't Got You
by: Alicia Keys
genre: Pop
feel: Soul ballad 12/8
source: iReal Pro community chart
tempo: 60
key: G
time: 6/8
form: Intro A B A B B B
[Intro]
Cmaj7 | Bm7 | Am7 | Gmaj7 |
Cmaj7 | Bm7 | Am7 | Gmaj7 |
[A]
Gmaj7 | Em7 | Am7 | D7 |
Gmaj7 | G♯°7 | Am7 | D7 |
Gmaj7 Am7 | Bm7 Am7 | Gmaj7 Am7 | Bm7 |
Gmaj7 Am7 | Bm7 Am7 | Gmaj7 Am7 | Bm7 |
[B]
Cmaj9 | Bm7 | Am7 | Gmaj7 |
Cmaj9 | Bm7 | Am7 | Gmaj7 |`,

`title: Don't Stop Me Now
by: Queen
genre: Pop
feel: Piano rock
source: iReal Pro community chart
tempo: 156
key: F
[Intro]
F | Am | Dm | Gm |
C | F | F7/A | B♭ |
Gm7 | D7 | Gm F C | Gm |
Gm F C | Gm | C |
[A]
F | Am | Dm | Gm7 |
C | F | Am | Dm |
Gm7 | C | F | F7/E♭ |
B♭ | Gm7 | D7/F♯ | Gm |
D7/F♯ | Gm | Gm Gm/A Gm/B♭ Gm/B | C |
[B]
F Gm Am | Dm | Gm | C |
F Gm Am | Dm | Gm | D/F♯ |
Gm F C | Gm | Gm F C | Gm |
C | A♭/B♭ | % |
[A2]
F | Am | Dm | Gm7 |
C | F | Am | Dm |
Gm7 | C | F | F7/E♭ |
B♭ | Gm7 | D7/F♯ | Gm |
D7/F♯ | Gm | Gm Gm/A Gm/B♭ Gm/B | C N.C. |
N.C. | % | N.C. | % |
N.C. | % | N.C. | % |
% | F | Am | Dm |
Gm | C | F | F7 |
B♭ | Gm7 | C | F |`,

`title: Autumn Leaves
by: Joseph Kosma
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 132
key: Gm
form: A A B C
[A]
Cm7 | F7 | B♭maj7 | E♭maj7 |
Am7♭5 | D7♭13 | Gm6 | % |
[B]
Am7♭5 | D7♭13 | Gm6 | % |
Cm7 | F7 | B♭maj7 | E♭maj7 |
[C]
Am7♭5 | D7♭13 | Gm7 G♭7 | Fm7 E7 |
Am7♭5 | D7♭13 | Gm6 | % |`,

`title: Take the A Train
by: Billy Strayhorn
genre: Jazz
feel: Medium-up swing
source: iReal Pro community chart
tempo: 160
key: C
form: A A2 B A
[A]
C6 | % | D7♯11 | % |
Dm7 | G7 | C6 | Dm7 G7 |
[A2]
C6 | % | D7♯11 | % |
Dm7 | G7 | C6 | Gm7 C7 |
[B]
Fmaj7 | % | % | % |
D7 | % | Dm7 | G7 G7♭9 |`,

`title: Satin Doll
by: Duke Ellington, Billy Strayhorn
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 120
key: C
form: A A2 B A
[A]
Dm7 G7 | Dm7 G7 | Em7 A7 | Em7 A7 |
Am7 D7 | A♭m7 D♭7 | Cmaj7 F7 | Em7 A7 |
[A2]
Dm7 G7 | Dm7 G7 | Em7 A7 | Em7 A7 |
Am7 D7 | A♭m7 D♭7 | Cmaj7 | % |
[B]
Gm7 C7 | Gm7 C7 | Fmaj7 | % |
Am7 D7 | Am7 D7 | G7 | % |`,

`title: All the Things You Are
by: Jerome Kern
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 144
key: A♭
[A]
Fm7 | B♭m7 | E♭7 | A♭maj7 |
D♭maj7 | Dm7 G7 | Cmaj7 | % |
[B]
Cm7 | Fm7 | B♭7 | E♭maj7 |
A♭maj7 | Am7 D7 | Gmaj7 | % |
[C]
Am7 | D7 | Gmaj7 | % |
F♯m7♭5 | B7♭9 | Emaj7 | C7♭13 |
[D]
Fm7 | B♭m7 | E♭7 | A♭maj7 |
D♭maj7 | D♭m(maj7) | Cm7 | B°7 |
B♭m7 | E♭7 | A♭maj7 | Gm7♭5 C7♭9 |`,

`title: Fly Me to the Moon
by: Bart Howard
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 120
key: C
[A]
Am7 | Dm7 | G7 | Cmaj7 |
Fmaj7 | Bm7♭5 | E7♭9 | Am7 A7 |
Dm7 | G7 | Cmaj7 F7 | Em7 A7 |
Dm7 | G7 | Cmaj7 | Bm7♭5 E7♭9 |
[B]
Am7 | Dm7 | G7 | Cmaj7 |
Fmaj7 | Bm7♭5 | E7♭9 | Am7 A7 |
Dm7 | G7 | Em7 | A7 |
Dm7 | G7 | C6 | Bm7♭5 E7♭9 |`,

`title: So What
by: Miles Davis
genre: Jazz
feel: Modal, medium-up
source: iReal Pro community chart
tempo: 136
key: Dm
form: A A B A
[A]
Dm11 | % | % | % |
Dm11 | % | % | % |
[B]
E♭m11 | % | % | % |
E♭m11 | % | % | % |`,

`title: Solar
by: Miles Davis
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 160
key: Cm
[A]
Cm6 | % | Gm7 | C7 |
Fmaj7 | % | Fm7 | B♭7 |
E♭maj7 | E♭m7 A♭7 | D♭maj7 | Dm7♭5 G7♭9 |`,

`title: Lady Bird
by: Tadd Dameron
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 160
key: C
[A]
Cmaj7 | % | Fm7 | B♭7 |
Cmaj7 | % | B♭m7 | E♭7 |
A♭maj7 | % | Am7 | D7 |
Dm7 | G7 | Cmaj7 E♭maj7 | A♭maj7 D♭maj7 |`,

`title: Giant Steps
by: John Coltrane
genre: Jazz
feel: Up tempo (take it slow first)
source: iReal Pro community chart
tempo: 140
key: E♭
[A]
Bmaj7 D7 | Gmaj7 B♭7 | E♭maj7 | Am7 D7 |
Gmaj7 B♭7 | E♭maj7 F♯7 | Bmaj7 | Fm7 B♭7 |
E♭maj7 | Am7 D7 | Gmaj7 | C♯m7 F♯7 |
Bmaj7 | Fm7 B♭7 | E♭maj7 | C♯m7 F♯7 |`,

`title: Stella by Starlight
by: Victor Young
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 120
key: B♭
[A]
Em7♭5 | A7♭9 | Cm7 | F7 |
Fm7 | B♭7 | E♭maj7 | A♭7 |
B♭maj7 | Em7♭5 A7♭9 | Dm7 | B♭m7 E♭7 |
Fmaj7 | Em7♭5 | E♭maj7♯11 | D7♭9 |
[B]
G7♭13 | % | Cm7 | % |
A♭7♯11 | % | B♭maj7 | % |
[C]
Em7♭5 | A7♭9 | Dm7♭5 | G7♭9 |
Cm7♭5 | F7♭9 | B♭maj7 | % |`,

`title: Misty
by: Erroll Garner
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
E♭maj7 Cm7 | Fm7 B♭7 | Gm7 C7 | Fm7 B♭7 |
[A2]
E♭maj7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
E♭maj7 Cm7 | Fm7 B♭7 | E♭6 | % |
[B]
B♭m7 | E♭7♭9 | A♭maj7 | % |
Am7 | D7 F7 | Gm7 C7 | Fm7 B♭7 |
[A3]
E♭maj7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
E♭maj7 Cm7 | Fm7 B♭7 | E♭6 | Fm7 B♭7 |`,

`title: Summertime
by: George Gershwin
genre: Jazz
feel: Slow swing
source: iReal Pro community chart
tempo: 84
key: Am
[A]
Am7 | Bm7♭5 E7♭13 | Am7 | A7♭9 |
Dm7 | F7 | Bm7♭5 | E7♭13 |
Am7 | Bm7♭5 E7♭13 | Am7 | D7 G7 |
Cmaj7 Am7 | Bm7♭5 E7♭13 | Am7 | Bm7♭5 E7♭13 |`,

`title: Oleo
by: Sonny Rollins (Rhythm changes)
genre: Jazz
feel: Up swing
source: iReal Pro community chart
tempo: 200
key: B♭
form: A A2 B A2
[A]
B♭maj7 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
Fm7 B♭7 | E♭7 A♭7 | Dm7 G7 | Cm7 F7 |
[A2]
B♭maj7 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
Fm7 B♭7 | E♭7 A♭7 | Cm7 F7 | B♭6 |
[B]
D7 | % | G7 | % |
C7 | % | F7 | % |`,

`title: Moanin'
by: Bobby Timmons (Art Blakey & the Jazz Messengers)
genre: Jazz
feel: Medium gospel swing
source: iReal Pro community chart, solo changes
tempo: 126
key: Fm
form: A A B A
[A]
Fm7 A♭7 | G7 C7♭9 | Fm7 A♭7 | G7 C7♭9 |
Fm7 A♭7 | G7 C7♭9 | Fm7 A♭7 | G7 C7♭9 |
[B]
B♭m7 A♭7 | G7♭9 C7♯9 | Fm7 | F7♭9 B7♯11 |
B♭m7 A♭7 | G7♭9 | Gm7♭5 | C7♭9 |`,

`title: Footprints
by: Wayne Shorter
genre: Jazz
feel: Modal jazz waltz
source: iReal Pro community chart
tempo: 150
key: Cm
time: 3/4
[A]
Cm11 | % | % | % |
Cm11 | % | % | % |
Fm11 | % | % | % |
Cm11 | % | % | % |
F♯m7♭5 | F7♯11 | E7alt | A7alt |
Cm11 | % | % | % |`,

`title: Maiden Voyage
by: Herbie Hancock
genre: Jazz
feel: Even 8ths, modal
source: iReal Pro community chart
tempo: 120
key: D
form: A A B A
[A]
D9sus | % | % | % |
F9sus | % | % | % |
[B]
E♭9sus | % | % | % |
C♯m9 | % | % | % |`,

`title: Day by Day
by: Axel Stordahl, Paul Weston, Sammy Cahn
genre: Jazz
feel: Medium swing
source: iReal Pro community chart
tempo: 140
key: G
[A]
Am7 | % | % | D7 |
Gmaj7 | C7 | Bm7 | E9♯5 |
[B]
Am7 | B7 | Em7 | A7 |
Em7 | A7 | Am7 | Bm7 E9♯5 |
[A2]
Am7 | % | % | D7 |
Gmaj7 | C7 | Bm7♭5 | E7♭9 |
[B2]
Am7 | Cm7 F7 | Gmaj7 F7♯11 | E7 |
Am7 | D7 | Gmaj7 | Bm7 E9♯5 |`,

`title: Blues for Alice
by: Charlie Parker
genre: Blues
feel: Medium-up swing
source: iReal Pro community chart
tempo: 160
key: F
[A]
Fmaj7 | Em7♭5 A7♭9 | Dm7 G7 | Cm7 F7 |
B♭7 | B♭m7 E♭7 | Am7 D7 | A♭m7 D♭7 |
Gm7 | C7 | Am7 Dm7 | Gm7 C7 |`,

`title: Mr. P.C.
by: John Coltrane
genre: Blues
feel: Up swing, minor blues
source: iReal Pro community chart
tempo: 200
key: Cm
[A]
Cm7 | % | % | % |
Fm7 | % | Cm7 | % |
A♭7 | G7♭13 | Cm7 | % |`,

`title: Now's the Time
by: Charlie Parker
genre: Blues
feel: Medium swing
source: iReal Pro community chart
tempo: 126
key: F
[A]
F7 | B♭7 | F7 | Cm7 F7 |
B♭7 | B°7 | F7 | Am7 D7 |
Gm7 | C7 | F7 D7 | Gm7 C7 |`,

`title: Billie's Bounce
by: Charlie Parker
genre: Blues
feel: Medium-up swing
source: iReal Pro community chart
tempo: 160
key: F
[A]
F7 | B♭7 | F7 | Cm7 F7 |
B♭7 | B°7 | F7 | Am7 D7 |
Gm7 | C7 | F7 D7 | Gm7 C7 |`,

`title: Blue Monk
by: Thelonious Monk
genre: Blues
feel: Medium swing
source: iReal Pro community chart
tempo: 120
key: B♭
[A]
B♭7 | E♭7 | B♭7 | % |
E♭7 | % | B♭7 | % |
F7 | % | B♭7 | % |`,

`title: Straight, No Chaser
by: Thelonious Monk
genre: Blues
feel: Medium-up swing
source: iReal Pro community chart
tempo: 160
key: B♭
[A]
B♭7 | E♭7 | B♭7 | % |
E♭7 | % | B♭7 | % |
F7 | % | B♭7 | F7 |`,

`title: All Blues
by: Miles Davis
genre: Blues
feel: Jazz waltz, 6/8 feel
source: iReal Pro community chart
tempo: 150
key: G
time: 3/4
[A]
G7 | % | % | % |
G7 | % | % | % |
C7/G | % | % | % |
G7 | % | % | % |
D7♯9 | % | E♭7♯9 | D7♯9 |
G7 | % | % | % |`,

`title: Freddie Freeloader
by: Miles Davis
genre: Blues
feel: Medium swing
source: iReal Pro community chart
tempo: 120
key: B♭
[A]
B♭7 | % | % | % |
E♭7 | % | B♭7 | % |
F7 | E♭7 | A♭7 | % |
B♭7 | % | % | % |
E♭7 | % | B♭7 | % |
F7 | E♭7 | B♭7 | % |`,

`title: Blue Bossa
by: Kenny Dorham
genre: Latin
feel: Bossa nova
source: iReal Pro community chart
tempo: 150
key: Cm
[A]
Cm7 | % | Fm7 | % |
Dm7♭5 | G7♭9 | Cm7 | % |
E♭m7 | A♭7 | D♭maj7 | % |
Dm7♭5 | G7♭9 | Cm7 | Dm7♭5 G7♭9 |`,

`title: Recorda Me
by: Joe Henderson
genre: Latin
feel: Bossa / Latin
source: iReal Pro community chart
tempo: 160
key: Am
[A]
Am | % | % | % |
Cm | % | % | Cm7 F7 |
B♭maj7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
G♭maj7 | Gm7 C7 | Fmaj7 | E7♯9 |`,

`title: A Night in Tunisia
by: Dizzy Gillespie
genre: Latin
feel: Afro-Cuban into swing
source: iReal Pro community chart
tempo: 180
key: Dm
form: A A B A2
[A]
E♭7 | Dm6 | E♭7 | Dm6 |
E♭7 | Dm6 | Em7♭5 A7♭9 | Dm |
[B]
Am7♭5 | D7♭9 | Gm7 | % |
Gm7♭5 | C7♭9 | Fmaj7 | Em7♭5 A7♭9 |
[A2]
E♭7 | Dm6 | E♭7 | Dm6 |
E♭7 | Dm6 | Em7♭5 A7♭9 | Dm |
Em7♭5 | % | E♭7♯11 | % |
Dm7 | % | G7♯11 | % |
Gm(maj7) | Gm7 | G♭7♯9 | % |
Fmaj7 | % | Em7♭5 | A7♭9 |`,

`title: Spain
by: Chick Corea
genre: Latin
feel: Fast samba / fusion
source: iReal Pro community chart
tempo: 150
key: Bm
[A]
Gmaj7♯11 | % | % | % |
F♯7♭13 | % | % | % |
Em7 | % | A7 | % |
Dmaj7 | % | Gmaj7♯11 | % |
C♯7alt | % | F♯7♭13 | % |
Bm7 | % | B7 | % |`,

`title: Song for My Father
by: Horace Silver
genre: Latin
feel: Bossa
source: iReal Pro community chart
tempo: 120
key: Fm
form: A A B
[A]
Fm7 | % | E♭7 | % |
D♭7 | C7sus | Fm7 | % |
[B]
E♭7 | % | Fm7 | % |
E♭7 D♭7 | C7 | Fm7 | % |`,

`title: The Girl from Ipanema
by: Antônio Carlos Jobim
genre: Latin
feel: Bossa nova
source: iReal Pro community chart
tempo: 130
key: F
form: A A2 B A
[A]
Fmaj7 | % | G7♯11 | % |
Gm7 | G♭7♯11 | Fmaj7 | G♭7 |
[A2]
Fmaj7 | % | G7♯11 | % |
Gm7 | G♭7♯11 | Fmaj7 | % |
[B]
F♯maj7 | % | B7 | % |
F♯m7 | % | D7 | % |
Gm7 | % | E♭7 | % |
Am7 | D7♭9♭5 | Gm7 | C7♭9♭5 |`,

`title: Corcovado (Quiet Nights)
by: Antônio Carlos Jobim
genre: Latin
feel: Bossa nova
source: iReal Pro community chart
tempo: 120
key: C
form: A B A C
[A]
D7/A | % | A♭°7 | % |
Gm7 | C7 | F°7 Fmaj7 | Fmaj7 |
[B]
Fm7 | B♭7 | Em7 | A7♭13 |
D7 | % | Dm7 | A♭°7 |
[C]
Fm7 | B♭7♯11 | Em7 | Am7 |
Dm7 | G7 | Em7 | A7♭13 |
Dm7 | G7 | C6 |`,

`title: Wave
by: Antônio Carlos Jobim
genre: Latin
feel: Bossa nova
source: iReal Pro community chart
tempo: 130
key: D
form: A A B A
[A]
Dmaj7 | B♭°7 | Am7 | D7♭9 |
Gmaj7 | Gm6 | F♯13 F♯7♭13 | B9 B7♭9 |
E9 | B♭7 A7 | Dm7 G7 | Dm7 G7 |
[B]
Gm7/B♭ | C7/B♭ | Fmaj7/A | % |
Fm7/A♭ | B♭7/A♭ | E♭maj7/G | A7♭9 |`,

`title: Desafinado
by: Antônio Carlos Jobim
genre: Latin
feel: Bossa nova
source: iReal Pro community chart
tempo: 140
key: F
[A]
Fmaj7 | % | G7♯11 | % |
Gm7 | C7 | Am7♭5 | D7♭9 |
Gm7 | A7♭9 | D7 | D7♭9 |
G7♭9 | % | G♭maj7 | % |
[A2]
Fmaj7 | % | G7♯11 | % |
Gm7 | C7 | Am7♭5 | D7♭9 |
Gm7 | B♭m6 | Fmaj7 | E7♯9 |
Amaj7 | B♭°7 | Bm7 | E7 |
[B]
Amaj7 | B♭°7 | Bm7 | E7 |
Amaj7 | F♯m7 | Bm7 | E7 |
Cmaj7 | C♯°7 | Dm7 | G7 |
Gm7 | E♭m6 | G7 | C7♭9 |
[A3]
Fmaj7 | % | G7♯11 | % |
Gm7 | C7 | Am7♭5 | D7♭9 |
Gm7 | B♭m6 | Fmaj7 | Dm7 |
G7 | % | E♭7 | % |
G7 | Gm7 C7 | F6 | C7 |`,

`title: How Insensitive
by: Antônio Carlos Jobim
genre: Latin
feel: Slow bossa
source: iReal Pro community chart
tempo: 110
key: Dm
[A]
Dm | % | C♯°7 | % |
Cm6 | % | G7/B | % |
B♭maj7 | % | E♭maj7♯11 | % |
Em7♭5 | A7♭9 | Dm | D♭7 |
[B]
Cm6 | % | B°7 | % |
B♭maj7 | Em7♭5 A7♭9 | Dm | D♭7 |
Cm7 | F7 | Bm7 | E7♭9 |
B♭maj7 | A7♭9 | Dm | % |`,

`title: Black Orpheus (Manhã de Carnaval)
by: Luiz Bonfá
genre: Latin
feel: Bossa nova
source: iReal Pro community chart
tempo: 130
key: Am
[A]
Am | Bm7♭5 E7♭9 | Am | Bm7♭5 E7♭9 |
Am | Dm7 G7 | Cmaj7 | A7♭9 |
Dm7 | G7 | Cmaj7 | Fmaj7 |
Bm7♭5 | E7♭9 | Am | Bm7♭5 E7♭9 |
[B]
Am | Bm7♭5 E7♭9 | Am | % |
Em7♭5 | A7♭9 | Dm | % |
Dm7 Dm7/C | Bm7♭5 E7♭9 | Am Am7/G | Fmaj7 |
Bm7♭5 | E7♭9 | Am | Bm7♭5 E7♭9 |
Am | Dm7 Am7 | Dm7 Am7 | Dm7 Em7 |
Am |`,

`title: Mas Que Nada
by: Jorge Ben Jor
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 120
key: Fm
[A]
Fm7 B♭7 | % | B♭m7 | E♭7 |
Fm7 | C7sus | Fm7 B♭7 | % |
Fm7 B♭7 | Fm7 Cm Bm | B♭m7 | E♭7 |
Fm7 | C7sus | Fm7 | C7♯9 |
[B]
Fm7 | C7♯9 | Fm7 | C7♯9 |
Fm7 | C7♯5 | Fm7 B♭7 | % |
[C]
B♭m7 | E♭7 | A♭6 | % |
B♭7/D | E♭7/D♭ C7♯9 | Fm7 | C7♯9 |
[D]
Fm7 | C7♯9 | Fm7 | C7♯9 |
Fm7 | C7♯5 | Fm7 B♭7 | % |`,

`title: Bésame Mucho
by: Consuelo Velázquez
genre: Latin
feel: Bolero / bossa
source: iReal Pro community chart
tempo: 110
key: Dm
form: A B A
[A]
Dm6 | % | Gm6 | % |
Gm6 D7♭9 | Em7♭5 A7♭9 | Dm6 | % |
Am7♭5 | D7♭9 | Gm6 | % |
Dm6 Bm7♭5 | E7♭9 A7♭9 | Dm6 | % |
[B]
Gm6 | Dm6 | Em7♭5 A7♭9 | Dm6 D7♭9 |
Gm6 | Dm6 | E7 B♭7♭9 | A7♭9 |`,

`title: St. Thomas
by: Sonny Rollins
genre: Latin
feel: Calypso
source: iReal Pro community chart
tempo: 180
key: C
[A]
Cmaj7 F7 | Em7 A7 | Dm7 G7 | C6 |
Cmaj7 F7 | Em7 A7 | Dm7 G7 | C6 |
Em7♭5 | A7♭9 | Dm7 | G7 |
Cmaj7 C7/E | Fmaj7 F♯°7 | G7 | C6 |`,

`title: Caravan
by: Juan Tizol, Duke Ellington
genre: Latin
feel: Latin into swing
source: iReal Pro community chart
tempo: 200
key: Fm
form: A A B
[A]
C7♭9 | % | % | % |
C7♭9 | % | % | % |
C7♭9 | % | % | % |
Fm | % | % | % |
[B]
F7 | % | % | % |
B♭7 | % | % | % |
E♭7 | % | % | % |
A♭6 | % | G7 | D♭7 |`,

`title: Watermelon Man
by: Herbie Hancock
genre: Funk
feel: Funky 8ths
source: iReal Pro community chart
tempo: 120
key: F
[A]
F7♯9 | % | % | % |
B♭9 | % | F7♯9 | % |
C9 | B♭9 | C9 | B♭9 |
C9 | B♭9 | F7♯9 | % |`,

`title: Cantaloupe Island
by: Herbie Hancock
genre: Funk
feel: Funky straight 8ths
source: iReal Pro community chart
tempo: 112
key: Fm
[A]
Fm11 | % | % | % |
D♭7♯11 | % | % | % |
Dm11 | % | % | % |
Fm11 | % | % | % |`,

`title: Chameleon
by: Herbie Hancock
genre: Funk
feel: Funk 16ths
source: iReal Pro community chart
tempo: 96
key: B♭m
form: Intro A A B B
[Intro]
B♭m7 | E♭7 | B♭m7 | E♭7 |
[A]
B♭m7 | E♭7 | B♭m7 | E♭7 |
[B]
B♭m7 | E♭7 | B♭m7 | E♭7 |`,

`title: Red Clay
by: Freddie Hubbard
genre: Funk
feel: Funky jazz
source: iReal Pro community chart
tempo: 112
key: C♯m
[A]
C♯m11 | Bm11 | D7sus E7sus | F♯7sus G♯7sus |
C♯m11 | Bm11 | D7sus E7sus | F♯7sus G♯7sus |
C♯m7 | Bm7 E7 | Amaj7 | D♯m7♭5 G♯7♭9 |
C♯m7 | Bm7 E7 | Amaj7 | D♯m7♭5 G♯7♭9 |`,

`title: Just the Two of Us
by: Grover Washington Jr., Bill Withers
genre: Funk
feel: Smooth R&B
source: iReal Pro community chart
tempo: 96
key: Fm
form: Intro Intro A B A B C C2 D
[Intro]
D♭maj7 C7 C7/E | Fm7 E♭m7 A♭7 | D♭maj7 C7 C7/E | Fm7 |
[A]
D♭maj7 C7 C7/E | Fm7 E♭m7 A♭7 | D♭maj7 C7 C7/E | Fm7 |
D♭maj7 C7 C7/E | Fm7 E♭m7 A♭7 | D♭maj7 C7 C7/E | Fm7 |
[B]
D♭maj7 C7 | Fm7 Em7 E♭m7 A♭13 | D♭maj7 C7 | Fm7 |
D♭maj7 C7 | Fm7 Em7 E♭m7 A♭13 | D♭maj7 C7 | Fm7 |
[C]
D♭maj7 C7 | Bmaj7 B♭7 | Amaj7 A♭7 | D♭maj7 G♭9 |
[C2]
D♭maj7 C7 | Bmaj7 B♭7 | Amaj7 A♭7 | D♭maj7 G♭9 |
G♭9 |
[D]
D♭maj7 C7 C7/E | Fm7 E♭m7 A♭7 | D♭maj7 C7 C7/E | Fm7 |
D♭maj7 C7 | Fm7 Em7 E♭m7 A♭13 | D♭maj7 C7 | Fm7 |
D♭maj7 C7 | Fm7 Em7 E♭m7 A♭13 | D♭maj7 C7 | Fm7 |`,

`title: Isn't She Lovely
by: Stevie Wonder
genre: Funk
feel: Soul shuffle
source: iReal Pro community chart
tempo: 118
key: E
form: Intro A B A B
[Intro]
C♯m7 | F♯9 | A/B | E6 E6/G♯ E6/B |
[A]
C♯m7 | F♯7 | A/B | E6 |
C♯m7 C♯m7/G♯ C♯m7/G | F♯7 | A/B | E6 |
[B]
Amaj7 | G♯7♭13 | C♯m7 | F♯9 |
A/B | % | E6 | % |`,

`title: Sir Duke
by: Stevie Wonder
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 105
key: B
form: Intro Intro A A2 B C C D C C D C C D
[Intro]
B | G♯m7 | G | F♯7 |
[A]
B | G♯m7 | G | F♯7 |
[A2]
B | G♯m7 | G | F♯7 F7 |
[B]
E7 E♭7 D7 C♯7 | D7 E♭7 E7 | E7 E♭7 D7 C♯7 | D7 E7 F♯7 |
[C]
B | Fm7 | E B/D♯ | C♯m7 F♯7sus |
[D]
B N.C. | N.C. | % | N.C. |
% | N.C. | % | N.C. F♯ |`,

`title: Superstition
by: Stevie Wonder
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 100
key: E♭m
form: Intro A A2 B A A2 B B2
[Intro]
N.C. | % | N.C. | % |
E♭m7 | % | E♭m7 | % |
E♭m7 | % | E♭m7 | % |
[A]
E♭m7 | % | E♭m7 | % |
E♭m7 | % | E♭m7 | % |
[A2]
E♭m7 E♭m7/G♭ E♭m7/B♭ | E♭m7 E♭m7/B♭ E♭m7/G♭ | E♭m7 E♭m7/G♭ E♭m7/B♭ | E♭m7 E♭m7/B♭ E♭m7/G♭ |
E♭m7 E♭m7/G♭ E♭m7/B♭ | E♭m7 E♭m7/B♭ E♭m7/G♭ | E♭m7 E♭m7/G♭ E♭m7/B♭ | E♭m7 E♭m7/B♭ E♭m7/G♭ |
[B]
B♭7 B7♭5 | B♭7 A7♭5 | A♭7 | B♭7♯5 |
E♭m7 | % | E♭m7 | % |
[B2]
B♭7 B7♭5 | B♭7 A7♭5 | A♭7 | B♭7♯5 |
E♭m7 | E♭m7 E♭m7/G♭ E♭m7/B♭ | E♭m7 | % |
E♭m7 | % | E♭m7 | % |
E♭m7 | % | E♭m7 | % |`,

`title: September
by: Earth, Wind & Fire
genre: Funk
feel: Disco-funk
source: iReal Pro community chart
tempo: 126
key: D
form: Intro A A B A B B
[Intro]
Dmaj7 C♯m7 Bm7 | C♯m7 F♯m7 | Dmaj7 C♯m7 Bm7 | C♯m7 F♯m7 |
Dmaj7 C♯m7 Bm7 | C♯7♭9 F♯m7 | A7sus | % |
A7sus | % |
[A]
Dmaj7 C♯m7 Bm7 | C♯m7 F♯m7 | Dmaj7 C♯m7 Bm7 | C♯m7 F♯m7 |
Dmaj7 C♯m7 Bm7 | C♯7♭9 F♯m7 | A7sus | % |
[B]
Bm9 E7 | C♯m7 F♯m7 | Bm9 E7 | C♯m7 F♯m7 |
Bm9 E7 | C♯m7 F♯m7 | A7sus | % |`,

`title: Virtual Insanity
by: Jamiroquai
genre: Funk
feel: Acid-jazz funk
source: iReal Pro community chart
tempo: 92
key: E♭m
form: Intro A A2 B B C C B B D D2 B B2
[Intro]
E♭m7 Fm7♭5 | G♭maj9 B B | Cm7♭5 Bmaj7 | B♭7♯5 |
E♭m7 A♭9 | D♭9 G♭maj7 | Cm7♭5 B | B♭7♯5 |
[A]
E♭m7 A♭9 | D♭9 G♭maj7 | Cm7♭5 Bmaj7 | B♭7♯5 E♭m7 |
[A2]
E♭m7 A♭9 | D♭9 G♭maj7 | Cm7♭5 Bmaj7 | B♭7♯5 E♭m7 |
A♭7 D9sus | G♭maj7 Cm7♭5 | Bmaj7 B♭7♯5 | E♭m7 |
E♭m7 A♭9 | D♭9 G♭maj7 | Cm7♭5 B | B♭7♯5 |
[B]
Bmaj7 B♭7/D | E♭m7 E♭m7/G♭ A♭m11 A♭m11/B♭ | Bmaj13 B♭7/D | E♭m7 E♭m7/G♭ A♭m11 A♭m11/B♭ |
[C]
E♭m7 A♭9 | D♭9 G♭maj7 | Cm7♭5 B | B♭7♯5 E♭m7 |
A♭9 C♭/D♭ | G♭maj7 Cm7♭5 | B B♭7 |
[D]
E♭m7 | B♭7 | Bmaj7 | A♭m7 B♭7 |
[D2]
E♭m7 | B♭7 | Bmaj7 | A♭m7 B♭7 |
D♭m7 | A♭7 | Amaj7 | G♭m7 A♭7 |
D♭m7 | A♭7 | Amaj7 | G♭m7 A♭7 |
E♭m9 | B♭7 | Bmaj7 | A♭m7 B♭7 |
E♭m9 | B♭7 | Bmaj7 | A♭m7 B♭7 |
[B2]
Bmaj7 B♭7/D | E♭m7 E♭m7/G♭ A♭m11 A♭m11/B♭ | Bmaj13 B♭7/D | E♭m7 E♭m7/G♭ A♭m11 A♭m11/B♭ |
Bmaj7 B♭/D | E♭m7 Fm7♭5 | G♭maj9 B B | Cm7♭5 B |
B♭7♯5 |`
];
