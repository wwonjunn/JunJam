/* Gig: the built-in lead sheets. Chord changes only: no melodies, no lyrics.
   Each chart is plain text in the same format you can paste in yourself (see GIG_FORMAT_HELP in session.js):
   a few "name: value" lines, then [Section] headings with bars between | bars |. Two chords in a bar share it;
   % repeats the bar before. "form:" says the order the sections are played in (default: as written).
   Where they come from (the "source:" line): jazz standards, Brazilian and Latin tunes, blues and classic pop, rock and
   soul from iReal Pro's free community playlists; J-pop, anime and city pop from U-FRET; recent pop from Ultimate Guitar.
   The charts after the first hundred were converted by a script (chords only), so their sections are named from the
   site's labels (Ultimate Guitar) or from the song's shape (U-FRET: Intro, A, B, C...). Those sites don't mark bar
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
B♭7♯5 |`,

`title: ハルジオン (Harujion)
by: YOASOBI
genre: J-pop
feel: Driving pop
source: U-FRET chord chart
tempo: 130
key: Cm
[Intro]
A♭ B♭ | Gm Cm | A♭ Gm | Cm D♭ |
A♭ B♭ | Gm Cm | A♭ B♭ | Cm |
[A]
A♭ B♭ | Gm Cm | Fm B° | Cm D♭ |
A♭ B♭ | Gm Cm | Fm B° | Cm |
[B]
A♭ B♭/A♭ | Gm Cm | D♭ E♭ | A♭ B♭ |
G7 Csus4 | C |
[C]
A♭ B♭ | Gm Cm | A♭ G7 | B° Cm |
D♭ E♭ | A♭ B♭ | Gm B° | Cm D♭ |
A♭ G7 |
[Interlude]
Cm A♭ | G7 | Cm A♭ | G7 |
[D]
Cm A♭ | G7 | Cm | A♭ G7 |
[E]
A♭ B♭/A♭ | Gm Cm | D♭ E♭ | A♭ B♭/A♭ |
Gm Cm | D♭ E♭ |
[F]
A♭ B♭/A♭ | Gm Cm | D♭ E♭ | A♭ B♭ |
G7 Csus4 | C B♭ |
[G]
A♭ B♭ | Gm Cm | B♭ | A♭ G7 |
B° Cm | D♭ E♭ |
[H]
A♭ B♭ | Gm B° | Cm | A♭ G7 |
[I]
A B | A♭m D♭m | A A♭7 | C° D♭m |
D E | A B | A♭m C° | D♭m D |
E | A A♭7 | A B |
[Outro]
A B | A♭m D♭m | A B | E |`,

`title: 怪物 (Kaibutsu)
by: YOASOBI
genre: J-pop
feel: Fast pop
source: U-FRET chord chart
tempo: 184
key: E
[A]
G♯m | G♯m | E D♯ | G♯m |
G♯m | G♯m | E | D♯ G♯m |
[B]
E D♯ | G♯m | E D♯ | G♯m B |
E F♯ | G° G♯m | B | E D♯ |
[C]
A B | G♯m | C♯m A | G♯ G♯/C |
C♯m Bm | E | A B | G♯ G♯/C |
C♯m | A B |
[Interlude]
A B | G♯m C♯m | A G♯ |
[D]
G♯m | B | E C♯m | D♯ G♯m |
B | E C♯m | D♯ |
[Interlude 2]
G♯m B | E D♯ | G♯m B | E D♯ |
G♯m B | E D♯ | G♯m B | E D♯ |
[E]
G♯m | G♯m | E | D♯ |
G♯m | G♯m | E | D♯ |
G♯m B | E D♯ | G♯m B | E D♯ |
G♯m B | E D♯ |
[Interlude 3]
G♯m B |
[F]
F♯ G♯ | Fm | A♯m F♯ | F F/A |
A♯m | G♯m C♯ | F♯ G♯ | A° A♯m |
F♯ G♯ |
[G]
A♯ C | Am | Dm A♯ | A A/C♯ |
Dm Cm | F | A♯ C | A A/C♯ |
Dm | A♯ C |
[Interlude 4]
A♯ C | Am Dm | A♯ A | A/C♯ Dm |
Cm F |
[H]
Bm7♭5 Gm/A♯ | A A/C♯ | Dm | A♯ C |
[Outro]
Dm F | Gm A | Dm F | Gm A |
Dm F | Gm A | Dm F | Gm A |
Dm |`,

`title: 祝福 (Shukufuku)
by: YOASOBI
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 150
key: Am
[A]
F F♯ | G Em | Am | Dm E♭ |
E C | C/B♭ | F F♯ | G Em |
Am | Dm E | Am |
[Interlude]
B♭ Gm | Am B♭ | Gm | Am B♭ |
Gm | Am E♭ | Cm D |
[B]
Fmaj7 Em7 | Am7 Dm7 | E7 Am7 | Gm7 C |
Fmaj7 G | Em7 A | Dm7 G | C |
[C]
C/B♭ F | G | Em Am | Dm E |
C C/B♭ | F G | Em Am | Dm E |
[D]
C D | Bm E | Am B/E♭ | Em G |
D♭m7♭5 Am/C | Bm7♭5 E | Am | Bm Em |
[Interlude 2]
F Dm | Em F | Dm | Em F |
Dm |
[E]
Em F | Dm Em | F | Dm Em |
F | Dm Em | F | Dm Em |
Am |
[F]
Bm C | D Bm | Em | Am B7 |
G | G/F C | D Bm | Em |
Am B7 |
[G]
C D | Bm Em | Am B/E♭ | Em Dm7 |
G | C D | D/C Bm | E Am |
Am | B♭° B |
[H]
D♭ | Cm F | B♭m C/E | Fm E♭m |
A♭ Dm7♭5 | B♭m/D♭ | Cm7♭5 F | B♭m |
Cm D♭ |
[Interlude 3]
Cm F | B♭m C/E | Fm |
[I]
E♭m A♭ | Dm7♭5 | B♭m/D♭ Cm7♭5 | B° |
B♭m Cm7 | Fm E+ | E♭m | A♭ B♭m |
E♭ Fm |
[Outro]
F♯ E♭m | Fm F♯ | E♭m | Fm F♯ |
E♭m | Fm F♯ | E♭m |`,

`title: 勇者 (Yūsha)
by: YOASOBI
genre: J-pop
feel: Anime pop
source: U-FRET chord chart
tempo: 162
key: Gm
[A]
Gm7 F | Em7♭5 Am | D7 | Gm7 F |
Em7♭5 Am | D7 | Gm7 F | Em7♭5 Am |
D7 | Gm7 F | Em7♭5 Am | D7 |
[Interlude]
Gm7 E♭maj7 | D7 |
[B]
Gm7 | Gm7 | Gm7 E♭maj7 | D7 |
Gm7 | Gm7 | Gm7 E♭maj7 | D7 |
[C]
Gm7 | Gm7 | E♭maj7 D7 | D7 |
[D]
E♭maj7 | F Dm7 | Gm7 | Cm7 D♭° |
D7 Gm7 | Fm7 | B♭7 E♭maj7 | F |
Dm7 Gm7 | G Cm7 | D7 | D7 |
[Interlude 2]
Gm7 E♭maj7 | Dm7 |
[E]
Gm7 F | Em7♭5 | Am D7 | Gm7 F |
E♭maj7 D7 |
[F]
E♭maj7 D7 | Gm7 | Cm7 Dm7 | Gm7 G |
E♭maj7 D7 | Gm7 | Cm7 Dm7 | Gm7 |
E♭maj7 | Dm7 Gm7 | Cm7 Dm7 | Gm7 |
E♭maj7 Dm7 | Gm7 | E♭maj7 D7 |
[Interlude 3]
Gm7 F | Em7♭5 Am | D7 | Gm7 F |
Em7♭5 Am | D7 |
[G]
Gm7 F | Em7♭5 Am | D7 | Gm7 F |
Em7♭5 | Am D7 |
[H]
E♭maj7 | F | Dm7 Gm7 | G♭m7 Cm7 |
D7 Gm7 | G |
[I]
D7 E♭maj7 | F | Dm7 Gm7 | Cm7 D7 |
Gm7 Fm7 | B♭7 | Em7 | E♭maj7 |
Dm7 Gm7 | G Cm7 | D7 | E♭maj7 |
[Interlude 4]
F Dm7 | Gm7 | Cm7 D7 | Gm7 G♭m7 |
Fm7 B♭7 |
[J]
E♭maj7 F | G♭° Gm7 | Cm7 | Dm7 |
[Outro]
Gm7 F | Em7♭5 Am | D7 | Gm7 F |
Em7♭5 Am | D7 |`,

`title: たぶん (Tabun)
by: YOASOBI
genre: J-pop
feel: Mid pop
source: U-FRET chord chart
tempo: 100
key: Dm
form: A Interlude B C D Interlude 2 B E F D Interlude 3 G H I J Outro
[A]
B♭maj7 C | A7 Dm7 | Cm7 F7 | B♭maj7 C |
[Interlude]
B♭maj7 C | Am7 Dm7 |
[B]
B♭maj7 C | Am7 Dm7 | B♭maj7 A7 | Dm7 E♭ |
F |
[C]
B♭maj7 C | F | B♭maj7 C | F F7 |
[D]
B♭maj7 C | Am7 Dm7 | Gm7 A7 | Dm7 Cm7 |
F7 | B♭maj7 C | Am7 Dm7 | Gm7 C |
[Interlude 2]
B♭maj7 C | Am7 Dm7 | Gm7 C | F F7 |
[E]
B♭maj7 C | Am7 Dm7 | B♭maj7 C | F F7 |
[F]
B♭maj7 C | Am7 Dm7 | B♭maj7 A7 | Dm7 E♭ |
F | B♭maj7 C | Am7 Dm7 | B♭maj7 C |
F F7 |
[Interlude 3]
B♭maj7 C | Am7 Dm7 | Gm7 A7 | Dm7 Cm7 |
F7 | B♭maj7 C | Am7 Dm7 | Gm7 C |
[G]
B♭maj7 | Am7 Dm7 | Gm7 A7 | Dm7 Cm7 |
F7 | B♭maj7 | Am7 Dm7 | Gm7 A7 |
[H]
B♭maj7 C |
[I]
Bmaj7 D♭ | B♭m7 E♭m7 | A♭m7 B♭7 | E♭m7 D♭m7 |
G♭7 | Bmaj7 D♭ | B♭m7 E♭m7 | A♭m7 D♭ |
G♭ |
[J]
Bmaj7 D♭ | B♭m7 E♭m7 | A♭m7 B♭7 | E♭m7 D♭m7 |
G♭7 | Cm7♭5 Bmaj7 | B♭7 E♭m7 | A♭m7 D♭ |
G♭ | Bmaj7 D♭ |
[Outro]
Bmaj7 D♭ | B♭m7 E♭m7 | A♭m7 B♭7 | E♭m7 D♭m7 |
G♭7 | Bmaj7 D♭ | B♭m7 E♭m7 | A♭m7 D♭ |
Bmaj7 D♭ | B♭m7 E♭m7 | A♭m7 D♭ | G♭ |`,

`title: 感電 (Kanden)
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Funk
source: U-FRET chord chart
tempo: 137
key: B
form: Intro A B C D Interlude E B C D F F C C D
[Intro]
B B/D♯ | C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 |
A♯m7♭5 D♯7 | C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 |
D♯7 |
[A]
C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 | A♯m7♭5 D♯7 |
C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 | D♯7 G♯ |
[B]
C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 | A♯m7♭5 D♯7 |
C♯m7 D♯m7 | G♯m7 Gm7 | F♯m7 B7 | Fm7♭5 Emaj7 |
D♯m7 D° | C♯m7 C7 | B B/D♯ |
[C]
G♯m7 C♯7 | F♯7 B7 | Fm7♭5 Emaj7 | D♯7 G♯m7 |
G♯m7 C♯7 | F♯7 B7 | Fm7♭5 Emaj7 | F♯7 B7 |
[D]
Emaj7 F♯7 | D♯m7 G♯m7 | A♯m7♭5 D♯7 | G♯m7 |
C♯m7 B7 | F♯/A♯ G♯m7 |
[Interlude]
C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 | D♯7 |
[E]
C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 | A D♯7 |
C♯m7 D♯m7 | G♯m7 B7 | Fm7♭5 Emaj7 | D♯7 G♯ |
[F]
G♯ Bm7 | E Amaj7 | Emaj7 D♯7 | G♯m7 |
G♯ Bm7 | E Amaj7 | Emaj7 D♯7 | G♯m7 |`,

`title: KICK BACK
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Punk
source: U-FRET chord chart
tempo: 185
key: B♭m
form: Intro A B C D E A F G H I D E A
[Intro]
B♭m F | B♭m F | B♭m F | B♭m F |
[A]
B♭m F | B♭m F | B♭m F | B♭m F |
[B]
B♭m F | B♭m F | B♭m F | B♭m F |
Gm A | Dm G | B♭ E♭ | G |
[C]
E G♭ | A♭m | D♭m E♭m | A♭m |
A B | A♭ | G♭m A♭ |
[D]
D♭m G♭m | A♭ D♭m | G♭m E | A B |
C° | D♭m G♭m | A♭ D♭m |
[E]
A A♭ | D♭m | A A♭ | D♭m |
A A♭ | D♭m |
[F]
B♭m F | B♭m F | B♭m F | B♭m F |
Gm Am | Dm G | B♭ E♭ | G |
[G]
A♭ Gm7♭5 | C Fm | A♭/E♭ A♭ | D♭m E♭ |
A♭ Gm7♭5 | C Fm | E♭m A♭ | D♭ E♭ |
Fm Gm7♭5 | C Fm | G♭m A♭sus4 | A♭ |
[H]
D♭m G♭m | A♭ D♭m | G♭m E | A B |
D♭m C+ | E/B | B♭m7♭5 |
[I]
A A♭ | D♭m | A A♭/C | D♭m |
D♭m C+ | E/B B♭m7♭5 | A A♭ | Gm G♭m |
Fm Em | E♭m A♭ |`,

`title: ピースサイン (Peace Sign)
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 143
key: Cm
form: Intro Interlude A B C Interlude A B D Interlude 2 E Interlude 3 F
[Intro]
A♭ B♭ | B° Cm | E♭ |
[Interlude]
A♭ B♭ | Cm E♭ | G7 B° | Cm |
A♭ B♭ | Cm E♭ | G7 B° | Cm |
[A]
Cm Fm7 | B♭ Cm | Cm Fm7 | B♭ Cm |
Cm Fm7 | B♭ Cm | Cm Fm7 | B♭ Cm |
[B]
Fm7 Cm | A♭ B♭ | Fm7 Cm | Fm7 Gm7 |
A♭ B♭ |
[C]
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | B° Cm | B D♭ | E♭ |
[D]
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | G7 Cm | B D♭ | E♭ |
[Interlude 2]
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
[E]
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
[Interlude 3]
A♭ B♭ | B° Cm | E♭ | A♭ B♭ |
B° Cm | E♭ |
[F]
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | Cm E♭ | A♭ B° | Cm E♭ |
A♭ B♭ | G7 Cm | B D♭ | E♭ |
A♭ B♭ | G7 Cm | B D♭ | E♭ |`,

`title: 馬と鹿 (Uma to Shika)
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Anthem
source: U-FRET chord chart
tempo: 75
key: Cm
form: A B C Interlude A D E Interlude F C G
[A]
Cm A♭ | B♭ E♭ | B♭/D | Cm F7 |
B♭ E♭ | Cm A♭ | B♭ E♭ | B♭/D |
Cm F7 | B♭ E♭ |
[B]
A♭ E♭ | G7 Cm | D♭ E♭ | Fm |
B♭m A♭ | G7 Cm | Fm7 B♭ | E♭ E♭7 |
[C]
A♭ B♭ | Cm F7 | Dm7♭5 G7 | Cm C7 |
A♭ B♭ | Cm F7 | A♭ | B♭ Cm |
E♭ | A♭ B♭ | Cm A♭7 | A♭ B♭ |
Cm E♭ | A♭ B♭ | Cm G7 | A♭ B♭ |
E♭ |
[Interlude]
A♭ B♭ | Cm Gm7 | A♭ B♭ | Cm E♭ |
A♭ B♭ | Cm Gm7 | B♭ G7 | Cm |
[D]
A♭ E♭ | Dm7♭5 G7 | Cm | D♭ E♭ |
Fm E♭ | B♭m A♭ | G7 Cm | Fm7 B♭ |
E♭ E♭7 |
[E]
A♭ B♭ | Cm F7 | Dm7♭5 G7 | Cm C7 |
A♭ B♭ | Cm F7 | A♭ | B♭ Cm |
E♭ | A♭ B♭ | Cm G7 | A♭ B♭ |
Cm E♭ | A♭ B♭ | Cm | G7 A♭ |
B♭ E♭ |
[F]
E♭m B♭m7 | B G♭ | Fm7 G7 | Cm D7 |
Gm C7 | F B♭ | Dm7♭5 G7 | Cm |
E♭m B♭m7 | B G♭ | Fm7 G7 | Cm |
A♭ B♭ | Cm Gm | A♭ B♭ | E♭ |
[G]
A♭ B♭ | Cm G7 | A♭ B♭ | Cm E♭ |
A♭ B♭ | Cm G7 | A♭ B♭ | E♭ |`,

`title: 打上花火 (Uchiage Hanabi)
by: DAOKO × 米津玄師
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 95
key: E♭m
form: Intro A B C Interlude D E F Interlude 2 C G Interlude 3 H C Interlude 4 Interlude 4 Outro
[Intro]
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
[A]
B D♭ | E♭m D♭ | B D♭ | E♭m G♭ |
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
[B]
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
B D♭ | E♭m G♭ | B D♭ | G♭ |
[C]
B D♭ | E♭m B♭m7 | B D♭ | E♭m G♭ |
B D♭ | E♭m B♭m7 | B D♭ | B D♭ |
E♭m |
[Interlude]
B D♭ | E♭m G♭ | B D♭ | E♭m |
[D]
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
[E]
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
[F]
B D♭ | E♭m G♭ | B D♭ |
[Interlude 2]
B D♭ |
[G]
B | D♭ | E♭m | D♭/F D♭ |
[Interlude 3]
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
[H]
B D♭ | E♭m G♭ | B D♭ | E♭m G♭ |
B D♭ | E♭m G♭ | B D♭ |
[Interlude 4]
B D♭ | E♭m B♭m7 | B D♭ | E♭m G♭ |
B D♭ | E♭m B♭m7 | B D♭ | B D♭ |
E♭m |
[Outro]
B D♭ | E♭m G♭ | B D♭ | E♭m |`,

`title: 灰色と青 (Haiiro to Ao)
by: 米津玄師 + 菅田将暉
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: E
form: Intro A A B C Interlude Interlude 2 D A E C Interlude F G C Interlude H I Outro
[Intro]
E/G♯ A | B C♯m | E A | B E |
[A]
E/G♯ A | B C♯m | E/G♯ A | B C° |
C♯m A | B E |
[B]
A B | C♯m | A | B C♯m |
A B | C° C♯m | F♯7 B | A E |
[C]
C♯m A | B E | C♯m A | B E |
C♯m A | B E | A B | C♯m |
[Interlude]
A B | E |
[Interlude 2]
E/G♯ A | B C♯m | E/G♯ A | B E |
[D]
E/G♯ A | B C♯m | E/G♯ A | B |
C° | C♯m A | B E |
[E]
A B | C♯m | A B | C♯m E |
A B | C° C♯m | F♯7 B | A E |
[F]
F♯m7 C♯m | C° C♯m | A B | C♯m |
F♯m7 C♯m | C° C♯m | F♯m7 G♯m7 | A C |
B Am7 |
[G]
C♯m A | B E | C♯m A | B E |
E/G♯ A | B E | C♯m A | B |
[H]
F♯m7 C♯m | C° C♯m | A B | C♯m B |
[I]
F♯m7 C♯m | C° C♯m | A B | E |
[Outro]
E A | B E |`,

`title: 地球儀 (Chikyūgi)
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 76
key: B♭
form: Intro A B Interlude C Interlude 2 D Interlude C Interlude E Interlude 3 F Outro
[Intro]
F Gm7 | E♭maj7 | F Gm7 | E♭maj7 |
[A]
B♭ B♭sus4 | B♭ | Gm7 B♭/F | E♭maj7 B♭/D |
Cm7 Gm7 | E♭maj7 G♭° | Gm7 | Fsus4 B♭ |
[B]
B♭ B♭sus4 | B♭ | Gm7 B♭/F | E♭maj7 B♭/D |
Cm7 Gm7 | E♭maj7 G♭° | Gm7 | Fsus4 |
[Interlude]
B♭ |
[C]
B♭/D E♭maj7 | F Gm7 | E♭maj7 F | Gm7 F/A |
B♭ | B♭/D E♭maj7 | F E♭maj7 | G♭° Gm7 |
Cm7 F | Dm7 Gm7 | E♭maj7 F | Gm7 |
Cm7 F | Dm7 Gm7 | E♭maj7 F | B♭ |
[Interlude 2]
F Gm7 | E♭maj7 | F Gm7 | E♭maj7 |
[D]
B♭ B♭sus4 | B♭ | Gm7 B♭/F | E♭maj7 B♭ |
Cm7 Gm7 | E♭maj7 F | Gm7 F/A | B♭ Fsus4 |
[E]
Gm7 F | E♭maj7 F | E♭maj7 F | Gm7 |
Cm7 Gm7 | E♭maj7 |
[Interlude 3]
Fsus4 |
[F]
E♭maj7 F | Gm7 | E♭maj7 F | Gm7 F/A |
B♭ | B♭/D E♭maj7 | F E♭maj7 | G♭° Gm7 |
Cm7 F | Dm7 Gm7 | E♭maj7 F | Gm7 |
Cm7 F | Dm7 Gm7 | E♭maj7 G♭° | Gm7 |
Cm7 F | Dm7 Gm7 | E♭maj7 F | B♭ |
[Outro]
F Gm7 | E♭maj7 | F Gm7 | E♭maj7 |`,

`title: アイネクライネ (Eine Kleine)
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 84
key: D♭
form: A B C D B C E F G
[A]
G♭ D♭ | A♭ B♭m7 | G♭ D♭ | F F7 |
B♭m7 | G♭ D♭ | F F7 | B♭m7 |
G♭ D♭ | A♭ G♭ | G♭ |
[B]
G♭ D♭ | A♭ B♭m7 | G♭ D♭ | F F7 |
B♭m7 | G♭ D♭ | F F7 | B♭m7 |
G♭ D♭ | A♭ D♭ | A♭ D♭ |
[C]
E♭m7 Fm7 | G♭ A♭ | E♭m7 Fm7 | G♭ A♭ |
D♭ | E♭m7 Fm7 | G♭ A♭ | G♭ |
D♭ A♭ | G♭ | G♭ |
[D]
B♭m7 E♭m7 | G♭ A♭ | D♭ | B♭m7 E♭m7 |
G♭ A♭ | D♭ | B♭m7 E♭m7 | G♭ A♭ |
D♭ | F7 B♭m7 | G♭ A♭ | D♭ |
F7 B♭m7 | D♭ D♭sus4 | D♭ D♭sus4 | D♭ |
[E]
B♭m7 E♭m7 | G♭ A♭ | D♭ | B♭m7 E♭m7 |
G♭ A♭ | D♭ | B♭m7 E♭m7 | G♭ A♭ |
D♭ | F7 B♭m7 | G♭ A♭ | D♭ |
F7 B♭m7 | D♭ D♭sus4 | D♭ D♭sus4 | D♭ |
E♭m7 Fm7 | G♭ A♭ | E♭m7 Fm7 | G♭ A♭ |
D♭ | E♭m7 Fm7 | G♭ A♭ | G♭ D♭ |
A♭ |
[F]
E♭m7 Fm7 | G♭ A♭ | E♭m7 Fm7 | G♭ A♭ |
D♭ | E♭m7 Fm7 | G♭ A♭ | G♭ D♭ |
G♭ |
[G]
B♭m7 E♭m7 | G♭ A♭ | D♭ | B♭m7 E♭m7 |
G♭ A♭ | D♭ | B♭m7 E♭m7 | G♭ A♭ |
D♭ | F7 B♭m7 | G♭ A♭ | D♭ |
F7 B♭m7 | G♭ A♭ | D♭ | F F7 |
B♭m7 G♭ | A♭ D♭ |`,

`title: LOSER
by: 米津玄師 (Kenshi Yonezu)
genre: J-pop
feel: Dance rock
source: U-FRET chord chart
tempo: 100
key: F♯
form: Intro A B C Interlude A D B C E C F Outro
[Intro]
Bm7 | F♯m A | Bm C♯ | F♯m A |
Bm C♯ |
[A]
F♯m A | Bm C♯ | F♯m A | Bm C♯ |
[B]
Dmaj7 E | F♯m | A Bm | C♯m F♯m |
Dmaj7 E | F♯m | A Bm | C♯ |
[C]
D♯m B | C♯ F♯ | D♯m B | C♯ F♯ |
D♯m B | C♯ F♯ | D♯m B | C♯ F♯ |
[Interlude]
F♯m A | Bm C♯ |
[D]
F♯m Aadd9/E | Bm C♯ | F♯m Aadd9/E | Bm C♯ |
F♯m A | Bm C♯ | F♯m A | Bm C♯ |
[E]
D♯m B | F♯ C♯ | D♯m B | F♯ C♯ |
D♯m B | F♯ C♯ | D♯m B | F♯ C♯ |
B C♯ | D♯m F♯ | B C♯ | D♯m F♯ |
B C♯ | D♯m F♯ | B C♯ |
[F]
D♯m B | C♯ F♯ | D♯m B | C♯ F♯ |
D♯m B | C♯ F♯ |
[Outro]
D♯m B | C♯ F♯ | F♯m A | Bm C♯ |
F♯m |`,

`title: I LOVE...
by: Official髭男dism
genre: J-pop
feel: Pop ballad
source: U-FRET chord chart
tempo: 104
key: A
form: Intro A B C Interlude D E F G H Interlude I
[Intro]
D A/C♯ | Bm7 F♯m | E/G♯ A | A/C♯ E |
D A/C♯ | Bm7 F♯m | E/G♯ A | A/C♯ E |
[A]
D C♯7 | F♯m Em7 | A D | C♯7 F♯m |
Em7 A | D C♯7 | F♯m Em | A D |
C♯7 F♯m | Em A |
[B]
D C♯7 | F♯m Em | A | D C♯7 |
Bm E | A |
[C]
D E | C♯m F° | F♯m | Bm D/E |
A A7 | D E | C♯m F° | F♯m |
Bm A/C♯ | Dm Esus4 |
[Interlude]
Dmaj7 C♯m7 | Dmaj7 F♯m |
[D]
D E | Amaj7 F♯m | D C♯7 | F♯m |
E D♯m7♭5 | Dm A/C♯ | Am/C | Bm D/E |
[E]
Dmaj7 C♯7 | F♯m Em | A | Dmaj7 C♯7 |
F♯m Em | D♯m7♭5 | Dmaj7 C♯7 | F♯m Em |
A | Dmaj7 C♯7 | Bm E | A |
[F]
D E | C♯m F° | F♯m | Bm A/C♯ |
Dm Esus4 | A A7 |
[G]
D E | F° F♯m | Bm C♯m | D E |
F♯m Dm | Em F | Esus4 |
[H]
E D | E C♯7 | F° F♯m | Bm D/E |
A | D E | C♯m F° | F♯m |
Bm A/C♯ | Dm Esus4 | E |
[I]
D Esus4 | E A |`,

`title: ノーダウト (No Doubt)
by: Official髭男dism
genre: J-pop
feel: Funk pop
source: U-FRET chord chart
tempo: 119
key: A
form: Intro A A B Interlude A A C D B Outro
[Intro]
F♯7 | Bm E7 | A D | Bm E7 |
A D |
[A]
Bm E7 | A D | Bm E7 | A D |
[B]
Bm E7 | A D | Bm E7 | A D |
G F♯7 | Bm E7 | Em7 A | D |
[Interlude]
Bm E7 | A D | Bm E7 | A D |
[C]
Bm E7 | A D | Bm E7 | A D |
A D | G | Bm E7 | Em7 F♯7 |
[D]
A D | G F♯7 | Bm E7 | A |
G F♯7 | Bm E7 | Em7 A | D |
[Outro]
Bm E7 | A D | Bm E7 | A D |
Bm |`,

`title: 115万キロのフィルム (115 Man Kilo no Film)
by: Official髭男dism
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 95
key: E♭
[A]
A♭ Gm7 | Fm7 | E♭ D♭ | Dm7♭5 G7 |
Cm B♭ | Am7♭5 | Fm7 B♭ | E♭ A♭m7 |
D♭ | E♭ A♭m7 | B♭ | E♭ Dm7♭5 |
G7 | Cm Bm7 | B♭m7 E♭ | Dm7♭5 G7 |
Cm B♭ | Am7♭5 | Fm7 B♭ | Gm7 Cm |
Fm7 B♭ | E♭ E♭7 | Dm7♭5 G7 | Cm B♭ |
Am7♭5 | Fm7 B♭ | E♭ Dm7♭5 | G7 |
Cm B° | B♭ C7 | Fm7 Fmmaj7 | B♭ |
E♭ Dm7♭5 | G7 | Cm B° | B♭ C7 |
A♭ B♭/A♭ | Gm7 C7 | Fm7 B♭ | E♭ |
E♭ Dm7♭5 | G7 | Cm B♭m | E♭ |
Dm7♭5 G7 | Cm B♭ | Am7♭5 | Fm7 B♭ |
Gm7 Cm | Fm7 B♭ | E♭ E♭7 | Dm7♭5 G7 |
Cm B♭ | Am7♭5 | Fm7 B♭ | E♭ Dm7♭5 |
G7 | Cm B° | B♭ C7 | Fm7 Fmmaj7 |
B♭ | E♭ Dm7♭5 | G7 | Cm B° |
B♭ C7 | A♭ B♭/A♭ | Gm7 C7 | Fm7 B♭ |
E♭ | G7 Cm | A♭m7 D♭ | E♭ |
E♭ Dm7♭5 | G7 Cm | B° | E♭/B♭ Am7♭5 |
Fm7 B♭ | E♭ B♭ | E♭ Dm7♭5 | G7 |
Cm B° | B♭ C7 | Fm7 Fmmaj7 | B♭ |
E♭ Dm7♭5 | G7 | Cm B° | B♭ C7 |
A♭ B♭/A♭ | Gm7 C7 | Fm7 B♭ | E♭ Dm7♭5 |
G7 | Cm B° | E♭/B♭ Am7♭5 | A♭ B♭/A♭ |
Gm7 C7 | Fm7 B♭ | E♭ | Fm7 B♭ |
B D♭ | E♭maj7 |`,

`title: Cry Baby
by: Official髭男dism
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 133
key: D♭
[A]
Fm Dm7♭5 | D♭ | Gm7♭5 E° | Fm Dm7♭5 |
D♭ Gm7♭5 | C Dm |
[B]
C/E F | F/A Gm | A D | Dm C/E |
F Bm7♭5 | Gm A♭° | A |
[C]
D D♭m7♭5 | G♭ Bm | D♭° D | D♭/E♭ F7 |
G♭ Fm | B♭m | E♭m Fm | B♭m D♭/A♭ |
Gm7♭5 | G♭ Fm | A° B♭m | A+ D♭/A♭ |
Gm7♭5 | G♭ Fm | B♭ E♭m | Fm B♭m |
D♭/A♭ G♭ | A♭ B♭m | D♭/F G♭ | A♭ B♭ |
C |
[D]
Fm Dm7♭5 | D♭ | Gm7♭5 E° | Fm Dm7♭5 |
D♭ Gm7♭5 | E° C |
[Interlude]
Fm | Fm Cm | B♭m C | D♭ A♭ |
Fm E° | Fm Cm | B♭m C | D♭ A♭ |
Fm E° |
[E]
Dm C/E | F F/A | Gm A | D |
Dm C/E | F Bm7♭5 | Gm C7 | Am7♭5 D |
Gm A | Dsus4 D |
[F]
D D♭m7♭5 | G♭ Bm | D♭° D | D♭/E♭ F7 |
G♭ Fm | B♭m | E♭m Fm | B♭m D♭/A♭ |
Gm7♭5 | G♭ Fm | A° B♭m | A+ D♭/A♭ |
Gm7♭5 | G♭ Fm | B♭ E♭m | Fm B♭m |
D♭/A♭ E♭m | Fm G♭ | A♭ A | B D♭m |
E/A♭ A | B | Bm G♭/A♭ | G♭ A♭ |
B♭m D♭/F | G♭ A♭ | B♭ |`,

`title: 宿命 (Shukumei)
by: Official髭男dism
genre: J-pop
feel: Brass pop
source: U-FRET chord chart
tempo: 105
key: F
form: Intro A B C A D E F C Interlude G
[Intro]
F B♭ | C D♭° | Dm7 | B♭ F |
Gm7 C7 |
[A]
F Am7 | B♭ C | D♭° Dm7 | Dm7 C |
Bm7♭5 Gm7 | Bm7♭5 C7 | F Am7 | B♭ C |
D♭° Dm7 | Dm7 C | Bm7♭5 Gm7 | G♭7 F |
[B]
F B♭ | C D♭° | Dm7 | F B♭ |
C D♭° | Dm7 | F B♭ | C D♭° |
Dm7 | Gm7 Am7 | B♭ Bm7♭5 | C |
[C]
F D♭° | Dm7 E♭ | B♭ F | Gm7 D♭° |
F D♭° | Dm7 E♭ | B♭ F | Gm7 B♭m7 |
F |
[D]
F B♭ | C D♭° | Dm7 | F B♭ |
C D♭° | Dm7 | F B♭ | C D♭° |
Dm7 | Gm7 Am7 | B♭ Bm7♭5 | C D♭° |
[E]
F D♭° | Dm7 E♭ | B♭ F | Gm7 D♭° |
F D♭° | Dm7 E♭ | B♭ F | Gm7 B♭m7 |
F | F B♭ | C D♭° | Dm7 |
B♭ F | Gm7 C7 | F B♭ | C D♭° |
Dm7 | B♭ F | Gm7 C7 |
[F]
F Am7 | B♭ C | D♭° Dm7 | Dm7 C |
Bm7♭5 Gm7 | Bm7♭5 C7 | F C | Dm Em7♭5 |
D♭° | A7 Dm7 | C7 Bm7♭5 | Gm7 B♭m7 |
C |
[Interlude]
F D♭° | Dm7 E♭ | B♭ F | Gm7 D♭° |
F D♭° | Dm7 E♭ |
[G]
Gm7 B♭m7 | F |`,

`title: SOULSOUP
by: Official髭男dism
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 160
key: D
[Intro]
Em7 Asus4 | F♯m7/B B | Em7 Asus4 | F♯m7/B B |
[A]
Em7 Asus4 | Dmaj7 G | D/F♯ Em7 | F♯7 Bsus4 |
B | Em7 Asus4 | Dmaj7 G | D/F♯ Em7 |
F♯7 G | D/F♯ Em7 | F♯7 |
[Interlude]
Em7 Asus4 | F♯m7/B B |
[B]
Em7 Asus4 | Dmaj7 G | D/F♯ Em7 | F♯7 Bsus4 |
B | Em7 Asus4 | Dmaj7 G | D/F♯ Em7 |
F♯m7 Gm7 | Asus4 A |
[C]
D D7 | G C9 | Bm7 E7 | Em7 C9 |
D D+ | G D/F♯ | Em7 F♯m7 | G A |
Bm F♯ |
[D]
G A | Bm7 B | Em7 F♯7 | Bm7 D |
G A | Bm7 B | Em7 F♯m7 | Bsus4 B |
Em7 Asus4 |
[Interlude 2]
F♯m7/B B | Em7 Asus4 | F♯m7/B B |
[E]
Am D7 | Gmaj7 C9 | F♯m7 | F♯7 Bsus4 |
B | Am D7 | Gmaj7 D/F♯ | Em7 |
D/F♯ Gmaj7 | D/F♯ Em7 | A D |
[Interlude 3]
Dmaj7 D7 | G C9 | Bm7 E7 | Em7 C9 |
D D+ | G D/F♯ |
[F]
Em7 F♯m7 | G F♯m7 | Em7 F♯m7 | Gmaj7 Bm |
F♯ |
[Interlude 4]
C♯m7/F♯ F♯ |
[G]
G A | Bm7 B | Em7 F♯7 | Bm7 D |
G A | Bm7 B | Em7 F♯m7 | Gmaj7 F♯sus4 |
F♯ |
[H]
Em7 A | D G | Em7 F♯7 | Bm Am7 |
D | G A/G | Bm7 B | Em7 F♯m7 |
Gmaj7 F♯m7 | Em7 | F♯m7 Gmaj7 | D/F♯ |
Em7 F♯m7 | Bsus4 B |
[Outro]
Em7 Asus4 | F♯m7/B B | Em7 Asus4 | F♯m7/B B |
Em7 F♯m7 | G |`,

`title: 一途 (Ichizu)
by: King Gnu
genre: J-pop
feel: Fast rock
source: U-FRET chord chart
tempo: 190
key: A
form: Intro A A A B C Interlude D A C E Interlude 2 A F Outro
[Intro]
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
[A]
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
[B]
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D | C♯ | D A7 |
B♭ G |
[C]
G♯m B♭ | D♯m C♯m | Cm7♭5 B | B♭ A |
G♯m B♭ | D♯m C♯m | Cm7♭5 B | B♭ A |
[Interlude]
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
[D]
F♯m Bm | E A | D B | E C♯ |
F♯m Bm | E A | D B | E |
[E]
G♯m B♭ | D♯m C♯ | Cm7♭5 B | B♭ A |
G♯m B♭ | D♯m C♯ | Cm7♭5 B | B♭ A |
[Interlude 2]
F♯m A7 | D C♯ | D A7 | B♭ G |
[F]
F♯m A | D C♯ | D A7 | B♭ G |
F♯m A7 | D C♯ | D A7 | B♭ G |
[Outro]
F♯m |`,

`title: 逆夢 (Sakayume)
by: King Gnu
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 70
key: F♯
form: Intro A B Interlude C D E F G Interlude H D I F J Interlude 2 K J L Interlude 3 M M Interlude 4 N Outro
[Intro]
Em7 F♯m/A | D C♯m7♭5 | F♯ | Bm D/A |
G♯m7♭5 | G D/F♯ | Em A |
[A]
Dm Gm | C F | A♯ Bm7♭5 | C C♯° |
[B]
Dm Gm | C F | A♯ Bm7♭5 | C C♯° |
Dm D♯m |
[Interlude]
F♯ A♯ | D♯m | B Bm |
[C]
F♯ A♯ | D♯m | B Bm | F♯ A♯ |
D♯m | B Bm |
[D]
D E | F♯m | A C♯ | F♯m |
Bm F | G |
[E]
D E | F♯m A | C♯ F♯m | Bm |
[F]
C♯ D♯m | G♯m | C♯ F♯ | B G♯ |
C♯ A♯ |
[G]
D♯m | G♯m C♯ | F♯ | B G♯ |
C♯ A♯ |
[H]
F♯ A♯ | D♯m | B | Bm |
[I]
D E | F♯m | A C♯ | F♯m |
Bm |
[J]
D♯m G♯m | C♯ F♯ | B G♯ | C♯ A♯ |
[Interlude 2]
D♯m G♯m | C♯ F♯ | B G♯ | C♯ A♯ |
[K]
D♯m G♯m | C♯ F♯ | B G♯ | C♯ A♯ |
D♯m G♯m | C♯ A♯ | B G♯ | C♯ A♯ |
[L]
D♯m G♯m | C♯ F♯ | B G♯ | C♯ |
A♯ |
[Interlude 3]
G B | Em | C Cm |
[M]
G B | Em | C | Cm |
[Interlude 4]
G B | Em |
[N]
D C | Cm F |
[Outro]
G B | Em | C Cm | G |`,

`title: カメレオン (Kamereon)
by: King Gnu
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: C
form: A B Interlude C D E F Interlude D G H I J
[A]
C F | G | E/A♭ Am | C/G D/F♯ |
G |
[B]
C F | G | E Am | C/G D/F♯ |
G | F/A G/B |
[Interlude]
Dm C | B♭ | Gm Am | A G/B |
A/D♭ |
[C]
Dm C | G/B | C G/B | Am |
F♯m7♭5 F | Gsus4 G |
[D]
Dm C | G/B | C G/B | Am |
Fmaj7 | G |
[E]
C F | G | E/A♭ | Am C/G |
D/F♯ | G |
[F]
C F | G F | E E/A♭ | Am C/G |
D/F♯ | G | F/A G/B |
[G]
C C/E | F | Dm | F E |
E/A♭ | Am C/G | D/F♯ | F/G G |
[H]
C F | G | F E | E/A♭ Am |
C/G D/F♯ | F/G G | Dm C/E | Fm |
[I]
F B♭ | C | B♭ A | A/D♭ Dm |
F/C G/B | B♭/C |
[J]
F C/E | Dm G/B | C | B♭ A |
A/D♭ Dm | C G/B | B♭/C | B♭/D C/E |`,

`title: 飛行艇 (Hikōtei)
by: King Gnu
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 84
key: F♯m
form: Intro A B C D A B C C E E E E F F G H
[Intro]
F♯m | F♯m E | D Bm | C♯ |
[A]
F♯m E | D Bm7 | C♯m7 |
[B]
F♯m E | D | Bm7 C♯m7 |
[C]
F♯m | E | D | Bm7 C♯m7 |
[D]
F♯m | E | D | Bm7 C♯m7 |
F♯m | F♯m E | D Bm | C♯ |
[E]
F♯m G | A B♭° | Bm | Em7 C |
Cm G | C♯7 |
[F]
Gm | F | D♯ | Cm7 Dm7 |
[G]
Gm F | Em7♭5 D♯ | Dm7 C♯ | Cm7 B♭ |
Am7♭5 D7 |
[H]
Gm F | Em7♭5 D♯ | Dm7 C♯ | Cm7 B♭ |
Am7♭5 D7 | Gm |`,

`title: SPECIALZ
by: King Gnu
genre: J-pop
feel: Fast rock
source: U-FRET chord chart
tempo: 192
key: F♯m
form: Interlude Interlude 2 B C D E F G Interlude 2 B C H H I J Interlude J Interlude K F G C J Outro
[Interlude]
F♯m |
[Interlude 2]
F♯m A | D C♯ |
[B]
F♯m A | D C♯ |
[C]
F♯m A | D C♯ | F♯m A | D C♯ |
F♯m A | D C♯ | F♯m A | D C♯ |
[D]
F♯m A | D C♯ | F♯m A | D C♯ |
F♯m | A D | C♯ F♯m | A D |
[E]
C♯ |
[F]
F♯m A | D C♯ | F♯m A | D C♯ |
F♯m A | D C♯ | F♯m A | D |
C♯ |
[G]
F♯m A | D C♯ | F♯m A | D C♯ |
F♯m A | D C♯ | F♯m A |
[H]
D | F♯m E | D |
[I]
C♯ | C♯ | C♯ | C♯ |
[J]
F♯m |
[K]
F♯m | F♯m | F♯m | F♯m |
[Outro]
F♯m |`,

`title: 点描の唄 (Tenbyō no Uta)
by: Mrs. GREEN APPLE feat. 井上苑子
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 72
key: C
[A]
C Am | Fm C | Am F | C Am7 |
Fm C | Am7 F | G |
[B]
C F | G C | E7 Am7 | Gm7 F |
Fm | C F | G C | G |
Am Am7 | F F/G | C |
[C]
F F/G | Am Am7 | F F/G | Am Am7 |
F G | C G | Am Am7 | F G |
C |
[D]
Am F | G C | G E7 | Am F |
G | A♭° Am | F G | C G |
B♭ Am | F G | C F | B♭ |
[E]
C F | G C | G | E7 Am |
Gm7 F | Fm | C F | G C |
G | Am Am7 | C F | F/G C |
Am7/F Am7 | Am7/F Am7 |
[F]
Am F | G C | G E7 | Am Am7 |
F G | A♭° Am | F G | C |
G B♭ | Am F | A♭° Am | B♭ Am |
F G | C |
[G]
C F | G Am | F G | Am |
F G | Am Em | F G | C |
F Em | Dm G | C | F Em |
Dm G | C |
[H]
C F | G Am | C | F G |
A♭° Am | C F | A♭° Am | G B♭ |
Am | G A♭° |
[I]
Am F | G C | G E7 | Am Am7/G |
F G | A♭° Am | F G | C G |
B♭ Am | F G | C |
[J]
C F | G Am | F G | C |
F G | Am Em | F G | C |
[K]
F G | Am F | G C | F G |
Am | Em F | G C | C Am |
Fm C | Am F | G C |`,

`title: 僕のこと (Boku no Koto)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: G
form: A B C D Interlude E F G H I J Interlude K
[A]
G A/C♯ | C G | D/F♯ | Em A/C♯ |
C G | B7 Em | Bm7 C | G |
D/F♯ C | F G |
[B]
G A/C♯ | C G | Em A/C♯ | Am7 D |
G | B7 C | Am7 D | E♭° |
Am7 D |
[C]
G D | Em Bm7 | C G | Am7 D |
E♭° | Em Bm7 | Am7 D | E♭° |
C D | Em Bm7 | Am7 D |
[D]
G D | Em Bm7 | C G/B | Am7 D |
G F | Em A7 | C D | Em |
Bm7 Am7 | D Cm7 |
[Interlude]
G E♭° | Em C | G/B C | D E♭° |
Em A7 | E♭ F | B♭ D7 |
[E]
G A/C♯ | C D | G | Em A/C♯ |
C G | E♭° Em | Bm7 C | G |
C A/C♯ | D E♭° | Em Bm7 | C G |
Am7 D | B7 |
[F]
Em Bm7 | C D | G D/F♯ | Em Bm7 |
C D | G D/F♯ | Em Bm7 | C E♭° |
C D | Em Bm7 | Am7 D | G F/A |
B♭ | B♭ Cm7 | Dm7 E♭ | F |
[G]
B♭ F/A | Gm Dm7 | E♭ F♯° | Gm |
Dm7 E♭ | F B♭ | D7 | Gm Dm7 |
E♭ D7 | E♭ F♯° | Gm Dm7 | Cm7 F |
B♭ D7 | E♭ E♭° | Gm Dm7 | Cm7 F |
C♯ A♭/C | Dm7♭5 E♭ | D7 |
[H]
G D | Em Bm7 | C G/B | Am7 D |
G | F | Em A7 | G/B C |
Em | Bm7 C | D Cm7 | D |
[I]
G D/F♯ | Em Bm7 | C G/B | Am7 D |
E♭° | Em Bm7 | C D | G |
B7 C | D Em |
[J]
Bm7 Am7 | D Cm7 |
[K]
G A/C♯ | C G | D/F♯ | Em A/C♯ |
C G | B7 Em | Bm7 C | G |
Am7 D |`,

`title: インフェルノ (Inferno)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 180
key: E
form: Intro A A B C A E C F G
[Intro]
C♯m7 B | A E | B | C♯m7 B |
A E | C♯m7 B | A E | B |
C♯m7 B | A E | G♯7 |
[A]
C♯m7 A | B C° | C♯m7 A | B E |
C♯m7 A | B C° | C♯m7 A | B E |
[B]
A E | D♯m7♭5 E | A E | B |
[C]
C♯m7 F♯m7 | B E | B | C♯m7 A |
B E | G♯7 | C♯m7 F♯m7 | B E |
B | C♯m7 A | B E | C° C♯m7 |
A B | E |
[E]
A E | D♯m7♭5 E | A E | B E |
A E | D♯m7♭5 E | A E | B G♯7 |
[F]
C♯m7 D | E B | C♯m7 D | A B |
F♯m7 G♯m7 | A C° |
[G]
E A | B C° | C♯m7 A | B E |
G♯7 | C♯m7 D♯m7♭5 | E G♯m7 | A C° |
E B | C♯m7 A | B C° | D♯m7♭5 C♯m7 |
A Amaj7 | Amaj7 B | C♯m7 E | Amaj7 C° |
C♯m7 E | Amaj7 B | C♯m7 E | Amaj7 C° |
D♯m7♭5 E |`,

`title: ダンスホール (Dance Hall)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Bright pop
source: U-FRET chord chart
tempo: 140
key: A
form: A Interlude B C D E Interlude 2 F G D H Interlude 3 I J K L
[A]
G A | Bm | G G♯° | D |
D/A B♭+ | Bm Em7 | A D | G A |
D A |
[Interlude]
D/F♯ G | A B♭° | Bm Am | D |
Gmaj7 C | A |
[B]
D G | A D | A/C♯ Bm | E7 |
A C | D |
[C]
A/C♯ Bm | E7 | A B♭° | Bm |
E7 | A D |
[D]
G A | Bm | G G♯° | D |
F♯m B♭° | Bm Em7 | A D |
[E]
G A | Bm | G G♯° | D |
A B♭° | Bm | Em7 A | D |
[Interlude 2]
G A |
[F]
D G | A B♭° | Bm E7 | A D |
[G]
A/C♯ Bm | E7 | A F♯ | Bm |
E7 | A D |
[H]
G A | Bm | G G♯° | D |
A B♭° | Bm Em7 | A D |
[Interlude 3]
G A | D | Bm A | D |
Bm A | D | E D | G A |
Bm | G A | Bm | A B♭° |
Bm | D/A D♯/B♭ |
[I]
G♯ B♭ | Cm | G♯ A° | D♯ |
Gm Cm | Fm B♭ | D♯ |
[J]
G♯ B♭ | Cm | G♯ A° | D♯ |
B♭ B° | Cm |
[K]
A B | C♯m A | B♭° | E G♯m |
C° | C♯m F♯m | B E |
[L]
A B | C♯m A | B♭° E | F♯m |
B C° | C♯m F♯m | B E | F♯m B |
E |`,

`title: Soranji
by: Mrs. GREEN APPLE
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 70
key: F
form: A Interlude B C D E F G Interlude 2 H I E J K L Interlude 3 M N Z Z 2 Interlude 4 Z 3 Z 4 Interlude 5 Z 5 Outro
[A]
F F/A | B♭ | C D♭° | Dm |
F/A B♭ | C F | B♭ | F B♭ |
F B♭ |
[Interlude]
Csus4 C |
[B]
F/A B♭ | F Csus4 | C | F/A B♭ |
C/E F | F/A B♭ | F/C D♭° | Dm F/A |
Gm C | F |
[C]
F/A B♭ | F Csus4 | C | F/A B♭ |
C/E F | F/A B♭ | F/C D♭° | B♭ F/A |
Gm C | F |
[D]
Dm C | B♭ | F/A Gm | F/A |
B♭ B♭m | C |
[E]
F/A B♭ | C D♭° | Dm F/A | Gm7 C |
[F]
A Dm | F/A | B♭ C | A7 |
Dm F/A | Gm F/A | B♭ C | F |
[G]
F C | Dm | F/A B♭ | C Dm |
F/A B♭ | C Dm | F/A B♭ | C F |
[Interlude 2]
B♭ F/A | Fm/A♭ C |
[H]
F/A B♭ | F C | F/A B♭ | C/E F |
F/A B♭ | F/C D♭° | B♭ F/A | Gm C |
[I]
F Dm | C | B♭ F/A | Gm F/A |
B♭ B♭m | C |
[J]
A Dm | F/A | B♭ C | A7 Dm |
F/A Gm | F/A | B♭ C | F |
[K]
C F | C Dm | F/A B♭ | C Dm |
F/A B♭ | C Dm | F/A B♭ | C F |
[L]
F A/D♭ | Dm | F/A B♭ | A7 Dm |
G♭° Gm | A/D♭ Dm | F/A B♭ | C E♭ |
[Interlude 3]
C/E F | B♭ | F/A B♭ | D♭° Dm |
E♭ C | D♭ |
[M]
G♭ B | D♭ D° | E♭m G♭/B♭ | A♭m D♭ |
[N]
B♭ E♭m | G♭/B♭ | B D♭ | B♭ |
E♭m A♭m | B D♭ | G♭ |
[Z]
D♭ G♭ | D♭ E♭m | G♭/B♭ B | D♭ E♭m |
G♭/B♭ A♭m | B♭/D E♭m | G♭/B♭ B | D♭ G♭ |
[Z 2]
B♭/D G♭/E | E♭m7 | B♭/D G♭/D♭ | Cm7♭5 B |
D♭ E♭m | G♭/B♭ | G♭ D♭ | E♭m G♭/B♭ |
[Interlude 4]
B D♭ | E♭m G♭/B♭ |
[Z 3]
B B♭/D | E♭m G♭/B♭ | B D♭ | G♭ B♭/D |
[Z 4]
G♭/E E♭m7 |
[Interlude 5]
B♭/D G♭/D♭ | Cm7♭5 |
[Z 5]
B D♭ | E♭m G♭/B♭ | B D♭ | G♭ |
[Outro]
B D♭ | E♭m G♭/B♭ | B D♭ | E♭m G♭/B♭ |
B D♭ | E♭m G♭/B♭ | B D♭ | G♭ |`,

`title: 春愁 (Shunshū)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 156
key: B♭
form: A B C D A B E F G
[A]
E♭ B♭ | F Gm | Dm | E♭ B♭ |
F Gm |
[B]
E♭ B♭ | F G♭° | Gm Dm | E♭ B♭ |
F Gm |
[C]
B♭ F | Gm | E♭ F | B♭ |
B♭ F | Gm | Dm Cm | F B♭ |
[D]
E♭ F | Gm Dm | E♭ F | Gm |
E♭ F | Gm Dm | E♭ F | B♭ |
E♭ F | Gm Dm | E♭ F | B♭ |
E♭ B♭ | Gm C | F B♭ | B♭ |
[E]
B♭ F | Gm | E♭ F | B♭ |
B♭ F | Gm Dm | Cm F | B♭ |
[F]
E♭ F | Gm Dm | E♭ F | Gm |
E♭ F | Gm Dm | E♭ F | B♭ |
E♭ F | Gm Dm | E♭ G♭° | Gm |
E♭ B♭ | Gm C | F | E♭ F |
Gm Dm | E♭ F | Gm | E♭ F |
Gm Dm | E♭ F | B♭ |
[G]
B♭ F | Gm | E♭ F | B♭ |
B♭ F | G | Dm |`,

`title: 天国 (Tengoku)
by: Mrs. GREEN APPLE
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: B
[A]
E D♯m | G♯m F♯ | E F♯ | G♯m |
A E | F♯ | G♯m F♯ | E F♯ |
B |
[B]
A G♯m | G B | F♯/A♯ G♯m | F♯ A |
E C♯/F | F♯ |
[C]
G♯m F♯ | E B | F♯/A♯ G♯m | D♯7 E |
F♯ B | D♯7 G♯m | B/D♯ E | F♯ B |
D♯7 G♯m | D♯7 E | F♯ B |
[Interlude]
G♯m B/D♯ | E B | F♯/A♯ | G♯m B/D♯ |
[D]
E F♯ | G♯m F♯ | E F♯ | G♯m |
A E | F♯ | G♯m F♯ | E |
F♯ B |
[E]
G♯m B/D♯ | E | B F♯/A♯ | G♯m D♯7 |
E F♯ | B F♯/A♯ | G♯m B/D♯ | E B |
F♯/A♯ | G♯m D♯7 | E G° | B D♯7 |
[F]
G♯m | F♯ | E B | F♯/A♯ |
G♯m | D♯7 | C♯m F♯ | B |
[G]
G♯m | F♯/A♯ | B C♯ | C♯m D♯m |
Em F♯ |
[H]
G♯m B/D♯ | E F♯ | B | F♯/A♯ G♯m |
G° E | G° B | F♯/A♯ G♯m | B/D♯ E |
F♯ B | D♯7 G♯m | D♯7 E | F♯ B |
[I]
C G | G♯° | Am Em | F C |
Dm D/F♯ | G | C♯ G♯ | F/A A♯m |
C♯/F | G D | Em A | D |
[J]
D♯ A♯ | B° | Cm D♯/G | G♯ D♯ |
Fm F/A | A♯ | E B | G♯/C Dm |
Am | B F♯ | G♯m C♯ | F♯ |
[Outro]
G D/F♯ | Em G/B | C D |`,

`title: 踊り子 (Odoriko)
by: Vaundy
genre: J-pop
feel: Groovy pop
source: U-FRET chord chart
tempo: 120
key: G
form: Intro A B C D B E B C D C D B F F C D
[Intro]
G B7 | Em C |
[A]
G B7 | Em C | G B7 | Em C |
[B]
G B7 | Em C | Cm | G B7 |
Em C | Cm |
[C]
G | B7 |
[D]
Em | C Cm |
[E]
G | G | B7 | Em |
Em | C |
[F]
G | B7 | Em | C Cm |`,

`title: 不可幸力 (Fukakōryoku)
by: Vaundy
genre: J-pop
feel: Funk
source: U-FRET chord chart
tempo: 100
key: B♭
form: Intro A A B C Interlude B D E B E C
[Intro]
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
[A]
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
[B]
Dm Cm | B♭ A7 | Dm Cm | B♭ A7 |
E♭maj7 |
[C]
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
[Interlude]
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
[D]
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
Dm B♭ | Gm A7 | Dm B♭ | Gm A7 |
E♭maj7 |
[E]
B♭ A7 | Dm Cm | F | B♭ A7 |
Dm Cm | F | B♭ A7 | Dm Cm |
F | B♭ A7 | E♭maj7 |`,

`title: 東京フラッシュ (Tokyo Flash)
by: Vaundy
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 102
key: D
form: Intro A B C Interlude A B C Interlude 2 D C E Outro
[Intro]
Dmaj7 C♯7 | F♯m Gmaj7 | Dmaj7 C♯7 | F♯m Gmaj7 |
[A]
Dmaj7 C♯7 | F♯m | Gmaj7 | Dmaj7 C♯7 |
F♯m | Gmaj7 |
[B]
Dmaj7 C♯7 | F♯m Gmaj7 | Dmaj7 C♯7 | F♯m Gmaj7 |
[C]
Dmaj7 | C♯7 | F♯m | Gmaj7 |
Dmaj7 | C♯7 | F♯m | Gmaj7 |
Dmaj7 |
[Interlude]
C♯7 F♯m | Gmaj7 | Dmaj7 C♯7 | F♯m Gmaj7 |
[Interlude 2]
C♯7 F♯m | Gmaj7 |
[D]
Dmaj7 C♯7 | F♯m | Gmaj7 | Dmaj7 C♯7 |
F♯m Gmaj7 |
[E]
C♯7 | F♯m | Gmaj7 | Dmaj7 |
C♯7 | F♯m | Gmaj7 | Dmaj7 |
[Outro]
C♯7 F♯m | Gmaj7 | Dmaj7 C♯7 | F♯m Gmaj7 |`,

`title: 花占い (Hanauranai)
by: Vaundy
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 143
key: Gm
form: A Interlude B C D Interlude 2 E C D Interlude 2 C F
[A]
E♭maj7 F | Dm7 Gm7 | Gm7/F | E♭maj7 F |
Dm7 Gm7 |
[Interlude]
E♭maj7 F | Dm7 Gm7 | Gm7/F | E♭maj7 F |
Dm7 Gm7 |
[B]
E♭maj7 F | Dm7 Gm7 | Gm7/F | E♭maj7 F |
Dm7 Gm7 | E♭maj7 F | Dm7 Gm7 | Gm7/F |
E♭maj7 F | Dm7 Gm7 | Gm7/F |
[C]
E♭maj7 F | Dm7 Gm7 | Gm7/F | Cm7 Dm7 |
G♭maj7 D |
[D]
E♭maj7 F | Dm7 Gm7 | Gm7/F | E♭maj7 F |
Dm7 Gm7 | B♭ |
[Interlude 2]
E♭maj7 F | Dm7 Gm7 | Gm7/F |
[E]
E♭maj7 F | Dm7 Gm7 | Gm7/F | E♭maj7 F |
Dm7 | E♭maj7 F | Dm7 Gm7 | Gm7/F |
E♭maj7 F | Dm7 Gm7 | Gm7/F |
[F]
E♭maj7 F | Dm7 Gm7 | Gm7/F | E♭maj7 F |
Dm7 Gm7 | E♭maj7 F | Dm7 Gm7 | Gm7/F |
E♭maj7 F | Dm7 Gm7 | B♭ | E♭maj7 |`,

`title: 恋風邪にのせて (Koikaze ni Nosete)
by: Vaundy
genre: J-pop
feel: Pop
source: U-FRET chord chart
tempo: 152
key: E
form: Intro A B C D Interlude E B C F C D Outro
[Intro]
A E | A E |
[A]
A | A G♯m | C♯m |
[B]
C♯m | E | F♯m | G♯m C♯ |
[C]
A | E | G♯ | G♯/C C♯m |
C+ B | E A | E | G♯ |
G♯/C C♯m | C+ B | F♯m | G♯m C♯ |
[D]
A |
[Interlude]
E A | E |
[E]
A | G♯m | C♯m |
[F]
A G♯m | C♯m | E | F♯m |
G♯m C♯ |
[Outro]
E A | E |`,

`title: うっせぇわ (Usseewa)
by: Ado
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 178
key: Bm
form: A Interlude B B C Interlude D Interlude B E F G Interlude 2 H I Outro
[A]
Bm | F♯ Bm |
[Interlude]
Bm |
[B]
Bm |
[C]
Bm | Em D | F♯/C♯ Bm |
[D]
G F♯ | Bm Bm/D | G F♯ | Bm Bm/D |
G F♯ | Bm Bm/D | F♯ Bm | G |
F♯ D | F♯ Bm | G F♯/B♭ | Bm B/E♭ |
F♯/C♯ F♯/B♭ | Bm A | Bm |
[E]
Bm F♯ | Bm |
[F]
Bm | B♭m Bm | B♭m Bm | B♭m Bm |
B♭m Bm | B♭m Bm | B♭m Bm | Em Bm/D |
F♯/C♯ Bm |
[G]
G F♯ | Bm Bm/D | G F♯ | Bm Bm/D |
G F♯ | Bm D | F♯/C♯ F♯/B♭ | Bm Em |
F♯/C♯ Bm/D | F♯/C♯ Bm | G F♯ | Bm B/E♭ |
F♯/C♯ F♯/B♭ | Bm A | Bm A | Bm |
[Interlude 2]
G F♯ | Bm D | G F♯ | Bm |
G F♯ | Bm D | G F♯ | Bm |
[H]
Bm | A | G |
[I]
G♯ G | Cm Cm/E♭ | G♯ G | Cm Cm/E♭ |
G♯ G | Cm Cm/E♭ | G/D G/B | Cm Cm/E♭ |
G/D | E♭ G/D | Cm | G♯ G |
Cm C/E | G/D G/B | Cm B♭ | Cm |
B♭ Cm | B♭ Cm |
[Outro]
Cm |`,

`title: 新時代 (Shin Jidai)
by: Ado
genre: J-pop
feel: Dance pop
source: U-FRET chord chart
tempo: 140
key: Em
form: A Interlude B C D E Interlude 2 F C D E Interlude 3 G
[A]
C | G/B Em7 | Em9 |
[Interlude]
Em | G A | Em7 D | G A |
Em7 A |
[B]
Em7 G | A B | Em7 G | A B |
[C]
Em7 G | A B | Em7 | G A |
B |
[D]
C D | Am7 Em7 | C D | Am7 G |
C | D Am7 | Em7 C | D F |
[E]
Am7 C | Em7 Am7 | C Em7 | Am7 C |
Em7 | Am7 C | Em7 |
[Interlude 2]
C D | Am7 G | C D | Am7 Bm7 |
G Em7 | D | G Em7 | D |
[F]
Em7 | A B | Em7 G | A B |
[Interlude 3]
C D | Am7 G | C D | Am7 Em7 |
C D | Am7 Em7 | C D | Am7 |
[G]
Em7 |`,

`title: 唱 (Show)
by: Ado
genre: J-pop
feel: Electro swing
source: U-FRET chord chart
tempo: 156
key: E♭m
form: A Interlude B C D E G H I A J G
[A]
Bmaj7 A♭m | E♭m | Bmaj7 D♭ | E♭m B♭ |
[Interlude]
B♭ |
[B]
B♭ | B♭ | B♭ | B♭ |
B♭ |
[C]
B♭ | B♭ | B♭ | B♭ |
[D]
E♭m | E♭m | E♭m D♭ | Bmaj7 E♭m |
D♭ | B |
[E]
E♭m D♭ | Bmaj7 | E♭m D♭ | Bmaj7 |
E♭m D♭ | Bmaj7 | E♭m D♭ |
[G]
E♭m | E♭m | E♭m | E♭m |
E♭m |
[H]
E♭m | E♭m | E♭m | E♭m E♭ |
[I]
Bmaj7 A♭m | E♭m | Bmaj7 D♭ | E♭m |
[J]
E♭m D♭ | Bmaj7 | E♭m D♭ | Bmaj7 |
E♭m D♭ | Bmaj7 | E♭m D♭ | Bmaj7 |
E♭m D♭ |`,

`title: 私は最強 (Watashi wa Saikyō)
by: Ado
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 150
key: E
form: Intro A Interlude B C D Interlude E F G H Interlude 2 I J K Interlude 3 L
[Intro]
Bsus4 |
[A]
E A | B C♯m | G♯m A | B E |
E/G♯ A | G♯ C♯m | F♯ A | E/G♯ |
[Interlude]
A B | C♯m | E/G♯ A | B/F♯ E |
E/G♯ A | B C♯m | E/G♯ A | C B |
[B]
E/G♯ A | E/G♯ A | E/G♯ A | C♯m B |
E/G♯ A | E/G♯ A | E/G♯ A | F♯m B |
G♯/C |
[C]
C♯m G♯m | A E | B/D♯ | C♯m G♯m |
A | Am/C D |
[D]
E A | B C♯m | G♯m A | B |
E E/G♯ | A G♯/C | C♯m | F♯ A |
E/G♯ |
[E]
E/G♯ A | E/G♯ A | E/G♯ A | C♯m C |
D |
[F]
G D/F♯ | Em G7 | C G/B | A D |
B/D♯ Em | Emmaj7 Em7 | A | C D |
E |
[G]
C♯m G♯m | A B | C♯m G♯m | A E |
C♯m G♯m | A B | C♯m G♯m | A |
Am/C D |
[H]
E A | B C♯m | G♯m A | Am E |
E/G♯ A | G♯/C C♯m | F♯ A | F♯m |
[Interlude 2]
G♯m A | G♯m | F♯m G♯m | A B |
F♯m G♯m | A G♯m | A B | Am/C D |
[I]
E A | B C♯m | G♯m A | B E |
E/G♯ A | G♯/C C♯m | F♯ A | D |
[J]
E F♯m | G♯m | G♯/C C♯m | G♯m A |
B C♯m | B A | E/G♯ F♯m | G♯m |
A E |
[K]
F♯m G♯m | A E |
[Interlude 3]
F♯m G♯m | A | E F♯m | G♯m A |
[L]
E F♯m | G♯m A | E |`,

`title: 逆光 (Gyakkō)
by: Ado
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 176
key: D♭
[Intro]
G♭ G | G♭ G | G♭ G | G♭ G |
B♭m G♭ | D♭ F | B♭m G♭ | D♭ A♭ |
B♭m G♭ | D♭ F | B♭m G♭ | D♭ A♭ |
[A]
B♭m G♭ | D♭ F | B♭m G♭ | D♭ A♭ |
B♭m G♭ | D♭ F | B♭m G♭ | D♭ A♭ |
B♭m |
[B]
G♭ D♭ | F B♭m | G♭ D♭ | A♭ |
[C]
B♭m | D♭ | D♭ | E♭m |
E♭m | E° | F | F |
B♭m | D♭ | D♭ | E♭m |
E♭m | E° | F | B♭m |
[Interlude]
D♭ | E♭m E° | F |
[D]
B♭m D♭ | A♭ | G♭ F | B♭m D♭ |
A♭ | G♭ F |
[E]
B♭m A♭ | G♭ | F B♭m | A♭ |
G♭ |
[F]
B♭m | D♭ | D♭ | E♭m |
E♭m | E° | F | F |
B♭m | D♭ | D♭ | E♭m |
E♭m | E° | F | D♭° |
[Interlude 2]
D♭° |
[G]
B♭m D♭ | D♭ | A♭ F7/A | G♭ |
B♭m D♭ | D♭ | G♭ F |
[H]
Bm | D | D | Em |
Em | F° | G♭ | G♭ |
Bm | D | D | Em |
Em | F° | G♭ | Bm |
[Outro]
D | Em F° | G♭ | Bm |`,

`title: カタオモイ (Kataomoi)
by: Aimer
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: D♭
form: A B A B Interlude A C D
[A]
D♭ D♭/F | B♭m | G♭ Fm7 | E♭m7 A♭ |
D♭ D♭/F | B♭m | G♭ Fm7 | E♭m7 A♭ |
D♭ D♭/F | B♭m | G♭ Fm7 | E♭m7 A♭ |
D♭ D♭/F | B♭m | G♭ Fm7 | E♭m7 A♭ |
[B]
G♭ A♭ | B♭m | G♭ A♭ | B♭m |
G♭ A♭ | B♭m | G♭ A♭ |
[Interlude]
D♭ Fm7 | G♭ G♭m7 | D♭ Fm7 | G♭ G♭m7 |
A♭ |
[C]
G♭ A♭ | B♭m | G♭ A♭ | B♭m |
G♭ A♭ | B♭m |
[D]
G♭ D♭/F | E♭m7 A♭ |`,

`title: 蝶々結び (Chōchō Musubi)
by: Aimer
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 72
key: C
[A]
C G | A♭° | Am C/G | F G |
C F/C | C G/B | Am C/G | F G |
C |
[B]
Dm C | Am G | C/E F | Gsus4 G |
D♭ |
[C]
F♯m7 D♭m7 | D A | F♯m7 D♭m7 | B7/E♭ E |
F° | F♯m7 D♭m7 | D A | F♯m7 E |
D A | D A |
[Interlude]
C |
[D]
C Csus4 | C G/B | Am D7 | F G |
C Csus4 | C G/B | Am C/G | F G |
C |
[E]
Dm C | Am G | C/E F | G D♭ |
[F]
F♯m7 D♭m7 | D A | F♯m7 D♭m7 | B7/E♭ E |
F° | F♯m7 D♭m7 | D A | F♯m7 E |
D E | F° |
[G]
F♯m7 D♭m7 | D A | F♯m7 D♭m7 | D A |
[Interlude 2]
F♯m7 D♭m7 | D A | F♯m7 E | D G |
[H]
F C | G Am7 | F C | G Am7 |
F C | G Am7 | F C | G Am7 |
[I]
F C | G Am7 | F C | G Am7 |`,

`title: 茜さす (Akane Sasu)
by: Aimer
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 78
key: F♯
form: Intro A B C D Interlude B C D E F Interlude 2 G Outro
[Intro]
D♯m C♯/F | F♯sus4 F♯ | D♯m B | F♯/C♯ C♯ |
C♯sus4 C♯ |
[A]
F♯ Bm | F♯ | C♯/F D♯m | C♯ B |
C♯ D♯m | B C♯ |
[B]
F♯ Bm | F♯ | C♯/F D♯m | C♯ B |
C♯ D° | D♯m C♯ | Cm7♭5 | B C♯ |
B |
[C]
C♯/B | A♯m7 D♯7 | G♯m7 F♯ | E C♯ |
[D]
A♯7 D♯m | C♯/F F♯sus4 | F♯ | C♯/F D♯m |
B C♯sus4 | C♯ D♯m | C♯/F F♯ | A♯7 |
D♯m B | C♯sus4 C♯ | B C♯ | B C♯sus4 |
C♯ D♯m |
[Interlude]
C♯/F F♯ | B C♯ |
[E]
C♯ G♯m7 | F♯/A♯ | B C♯ | A♯7 |
[F]
D♯m C♯/F | F♯sus4 F♯ | C♯/F D♯m | B C♯sus4 |
C♯ D♯m | C♯/F F♯ | A♯7 | D♯m B |
C♯sus4 C♯ | B C♯ | B C♯sus4 | C♯ D♯m |
[Interlude 2]
C♯ Cm7♭5 |
[G]
B C♯ | B C♯sus4 | C♯ |
[Outro]
D♯m C♯/F | F♯sus4 F♯ | D♯m B | F♯/C♯ C♯ |
C♯sus4 C♯ | Badd9 |`,

`title: 炎 (Homura)
by: LiSA
genre: J-pop
feel: Anime ballad
source: U-FRET chord chart
tempo: 74
key: A
form: Intro A B C A D E F
[Intro]
Bm A | G D | Bm A | G D |
[A]
Bm G | A D | A/C♯ | Bm G |
A D | A/C♯ | Bm G | A D |
A/C♯ | Bm G | A Bm |
[B]
A G | F♯m | Bm C♯m7♭5 | F♯ Bm |
Bm7/A | Gm Am | B♭ B° | C A/C♯ |
[C]
C♯m A | B E | B/D♯ | C♯m A |
B G♯ | C♯m A | B G♯ | A |
E/G♯ C♯m | D♯m7♭5 G♯ | C♯m B | A B |
C♯m B | A E | Bm A | G D |
[D]
A G | F♯m | Bm C♯m7♭5 | F♯ Bm |
Bm7/A | Gm Am | B♭ B° | C A/C♯ |
Em C | D G | D/F♯ | Em C |
D G | D/F♯ |
[E]
Em C | D Em | D | D♯ Cm |
Dm Gsus4 | G | Em D | C G |
B |
[F]
C♯m A | B E | B/D♯ | C♯m A |
B G♯ | C♯m A | B G♯ | A |
E/G♯ C♯m | D♯m7♭5 G♯ | C♯m B | A E/G♯ |
G♯ C♯m | B | A E/G♯ | G♯ C♯m |
B A | B C♯m | B A | E |
C♯m B | A E | Bm A | G D |`,

`title: 明け星 (Akeboshi)
by: LiSA
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 150
key: E♭m
form: Intro A B C D Interlude E A Interlude 2 F C D Interlude 3 G H Outro
[Intro]
Cm |
[A]
Cm | Cm A♭ | B♭ |
[B]
A♭ Fm | G |
[C]
E♭m D♭/F | G♭ | A♭m B♭ | E♭m E♭m7/D♭ |
B B♭ | E♭m D♭ | Cm7♭5 | B A♭m |
B♭ |
[D]
E♭m D♭/F | G♭ | A♭m D♭ | G♭ E♭m |
A♭m B♭ | E♭m D♭ | Cm7♭5 | Fm7♭5 B♭ |
B |
[Interlude]
B B♭ | A♭m B♭ | Cm |
[E]
Cm | Cm | A♭ B♭ | Fm Gm |
Cm |
[Interlude 2]
Cm A♭ | G |
[F]
Fm | A♭ G |
[Interlude 3]
E♭m |
[G]
E♭m | E♭m |
[H]
E♭m D♭ | G♭ E♭m | A♭m B♭m | Bmaj7 B♭ |
[Outro]
E♭m |`,

`title: 高嶺の花子さん (Takane no Hanako-san)
by: back number
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 127
key: A
[A]
Dmaj7 Eadd9 | C♯m7 F♯m | Bm7 E | C♯m7 F♯7 |
Dmaj7 E | C♯m7 F♯m | Bm7 E6 | C♯m7 F♯sus4 |
F♯sus4 Dmaj7 | A B | C♯sus4 E | Dmaj7 A |
Bm7 Esus4 | A | Dmaj7 A | Bm7 Esus4 |
A |
[B]
Bm7 F♯m | D E | A | Bm F♯m |
Dmaj7 E | A C♯ |
[C]
Dmaj7 E | C♯m7 F♯ | Bm7 E | A |
Dmaj7 E | C♯m F♯m | Bm7 | E A |
C♯ | Dmaj7 E | C♯m7 F♯m | Bm E |
C♯m7 F♯m | Dmaj7 E | C♯m7 F♯m | Bm E |
C♯m7 F♯ |
[D]
Dmaj7 A | Bm7 Esus4 | A | Dmaj7 A |
Bm7 Esus4 | A |
[E]
Bm7 F♯m | D E | A | Bm7 F♯m |
Dmaj7 E | A C♯ |
[F]
Dmaj7 E | C♯m7 F♯ | Bm7 E | A |
Dmaj7 E | C♯m7 F♯m | Bm7 | E A |
C♯ |
[G]
Bm7 E | A F♯m | Bm7 C♯ | F♯m F♯ |
Bm7 E | A F♯m | Dmaj7 E | A C♯ |
[H]
Dmaj7 E | C♯m7 F♯ | Bm7 E | A |
[I]
Dmaj7 E | C♯m7 F♯ | Bm7 E | A |
Dmaj7 E | C♯m7 F♯m | Bm7 | E A |
C♯ | Dmaj7 E | C♯m7 F♯m | Bm E |
C♯m7 F♯m | Dmaj7 E | C♯m7 F♯m | Bm E |
C♯m7 F♯ | F♯sus4 F♯7sus4 |`,

`title: クリスマスソング (Christmas Song)
by: back number
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: B
form: Intro A B C D A B E Interlude F C G H Outro
[Intro]
E B/D♯ | D C♯ | F♯m B | E F♯ |
A E/G♯ | F♯ B | E F♯ | A E/G♯ |
F♯ B |
[A]
A E | A E | A E | F♯ |
A B | E |
[B]
C♯m B | A E | C♯m F♯ | A B |
[C]
E | B | C♯m F♯ | A E |
F♯ | A B |
[D]
E | B | C♯m F♯ | A E |
F♯ | A | B | E F♯ |
A E/G♯ | F♯ B | E |
[E]
E | B | C♯m F♯ | A E |
F♯ | A | B E |
[Interlude]
C♯m F♯ | A B | C° |
[F]
C♯m | F♯ | A B | A E/G♯ |
F♯ |
[G]
E | B | C♯m F♯ | A E |
F♯ | A | B C♯m | F♯ |
[H]
A | B |
[Outro]
E F♯ | A E/G♯ | F♯ B | E F♯ |
A E/G♯ | F♯ B | E |`,

`title: 水平線 (Suiheisen)
by: back number
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 73
key: B♭
form: Intro A B C Interlude A B C Interlude 2 D E Outro
[Intro]
B♭ F | E♭ B♭ | D/A | Gm Dm |
E♭ Fsus4 | F Fsus4 | F |
[A]
B♭ E♭ | F B♭ | Gm Dm | E♭ Fsus4 |
F | B♭ E♭ | F B♭ | Gm Dm |
E♭ Fsus4 | F |
[B]
Cm F | B♭ Gm | Cm Dm | E♭ Fsus4 |
F |
[C]
B♭ E♭ | F G♭° | Gm Dm | E♭ F |
B♭ E♭ | F G♭° | Gm Dm | E♭ F |
[Interlude]
B♭ Fsus4 | F E♭ | Fsus4 F |
[Interlude 2]
Gm Dm | E♭ B♭ | D/A | Gm Dm |
E♭ Fsus4 | F Fsus4 | F |
[D]
B♭ E♭ | F G♭° | Gm Dm | E♭ |
[E]
C F | G A♭° | Am Em | F G |
C F | G A♭° | Am Em | F G |
Am Em | F G |
[Outro]
C Gsus4 | G F | C E/B | Am Em |
F Gsus4 | G Gsus4 | G C |`,

`title: ハッピーエンド (Happy End)
by: back number
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: F♯m
form: Intro A B C D A B E F G C H Outro
[Intro]
D C♯7 | F♯m B7 | D E |
[A]
D A | Bm7 F♯m | D A | Bm7 F♯m |
[B]
D C♯7 | F♯m A | Bm7 C♯7 |
[C]
D | E/D C♯m7 | F° F♯m | Bm7 E |
F♯m C♯7 |
[D]
D | E/D C♯m7 | F° F♯m | Bm7 E |
A Dm7 |
[E]
D | E/D C♯m7 | F° F♯m | Bm7 E |
A | G F♯m | F E | D♯m7♭5 D |
E | F G |
[F]
D A | Bm7 F♯m | E |
[G]
D | E/D C♯m7 | F° F♯m | Bm7 |
E |
[H]
D | E/D C♯m7 | F° F♯m | Bm7 E |
[Outro]
D C♯7 | F♯m B7 | D E | D C♯7 |
F♯m B7 | D E |`,

`title: 瞬き (Mabataki)
by: back number
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 84
key: E♭
form: A Interlude B C D B C E Interlude 2 F
[A]
A♭ B♭/A♭ | Gm7 Cm | Fm7 B♭ | E♭ E♭7 |
[Interlude]
A♭ B♭ | Gm7 Cm | Fm7 B♭ | E♭ |
[B]
A♭ Gm7 | G♭ | Fm7 B♭ | B° Cm |
B♭m7 | A♭ Gm7 | G♭ | Fm7 B♭ |
E♭ E♭7 |
[C]
Cm Gm7 | A♭ B♭ | E♭ | A♭ B |
D♭ E♭ |
[D]
G A♭ | B♭ | Gm7 Cm | Fm7 B♭ |
E♭ E♭7 | G | A♭ B♭ | Gm7 Cm |
Fm7 B♭ | E♭ E♭7 |
[E]
G A♭ | B♭ | Gm7 Cm | Fm7 B♭ |
E♭ E♭7 | G | A♭ B♭ | Gm7 Cm |
Fm7 B♭ | E♭ |
[Interlude 2]
Gm7 Cm | Fm7 B♭ | E♭ |
[F]
G A♭ | B♭ | Gm7 Cm | Fm7 B♭ |
E♭ E♭7 | G | A♭ B♭ | Gm7 Cm |
Fm7 B♭ | A♭ B♭ | Gm7 Cm | Fm7 B♭ |
E♭ |`,

`title: 裸の心 (Hadaka no Kokoro)
by: あいみょん (Aimyon)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: A♭
form: Intro A B C Interlude D B C Interlude 2 E C Outro
[Intro]
A♭ E♭ | D♭ C | B♭m D♭/E♭ | E♭ A♭ |
A♭sus4 A♭ |
[A]
A♭ E♭ | D♭ A♭ | D♭ A♭ | B♭m D♭/E♭ |
E♭ | A♭ E♭ | D♭ A♭ | D♭ A♭ |
B♭m D♭/E♭ | A♭ |
[B]
Cm Fm | A♭/E♭ | D♭ A♭ | A♭sus4 A♭ |
Cm C/E | Fm A♭/E♭ | B♭/D B♭ | D♭/E♭ E♭ |
[C]
A♭ E♭ | D♭ A♭ | D♭ A♭/C | B♭m E♭ |
A♭ E♭ | D♭ C | B♭m D♭/E♭ | A♭ A♭sus4 |
A♭ |
[Interlude]
A♭ E♭ | D♭ C | B♭m D♭/E♭ |
[D]
A♭ E♭ | D♭ A♭ | D♭ A♭ | B♭m D♭/E♭ |
E♭ | A♭ E♭ | D♭ A♭ | D♭ A♭ |
B♭m D♭/E♭ | A♭ A♭sus4 | A♭ |
[Interlude 2]
A♭ E♭ | Fm Cm | D♭ E♭ | A♭ E♭ |
Fm Cm | D♭ E♭sus4 | E♭ |
[E]
A♭ E♭ | D♭ A♭ | D♭ A♭/C | B♭m E♭ |
A♭ E♭ | D♭ C | B♭m D♭/E♭ | E♭ |
[Outro]
A♭ E♭ | D♭ C | B♭m D♭/E♭ | A♭ A♭sus4 |
A♭ |`,

`title: 君はロックを聴かない (Kimi wa Rock wo Kikanai)
by: あいみょん (Aimyon)
genre: J-pop
feel: Folk rock
source: U-FRET chord chart
tempo: 80
key: G
form: Intro A B C D B C E Interlude F D Outro
[Intro]
C D | Bm7 Em | Am7 B7 | Em |
C D | Bm7 Em | Am7 D |
[A]
G D | C D | G | C D |
Bm7 Em | C D |
[B]
G D | C D | G | C D |
Bm7 Em | C D | G |
[C]
C D | G Em | C D |
[D]
C D | Bm7 Em | C D | E♭° Em |
C D | G D/F♯ | Em | C G |
C D | G |
[E]
C D | Bm7 Em | C D | E♭° Em |
C D | G D/F♯ | Em | C G |
C D |
[Interlude]
C D | Bm7 Em | C D | Bm7 Em |
C D | Bm7 Em | Am7 D |
[F]
C D | G Em | C D | Bm7 Em |
C D | G Em | C G | C G |
C D |
[Outro]
C D | Bm7 Em | Am7 B7 | Em |
C D | Bm7 Em | Am7 D | Cmaj7 |`,

`title: ハルノヒ (Haru no Hi)
by: あいみょん (Aimyon)
genre: J-pop
feel: Folk pop
source: U-FRET chord chart
tempo: 90
key: A
form: Intro A B A C D A E F G H I Interlude J
[Intro]
A C♯m7 | D Bm7 | E | A C♯m7 |
D Bm7 | A E |
[A]
A C♯m7 | D | Bm7 E | A C♯m7 |
D | Bm7 E |
[B]
D E | F♯m | D E | A E |
[C]
D E | F♯m | D E | A |
D E | A | D E | A A7 |
D E | C♯m7 F♯m | D E |
[D]
A C♯m7 | D E | A | D C♯m7 |
D | E | A C♯m7 | D E |
A | D C♯m7 | F♯m | D E |
A E |
[E]
D E | F♯m | D E | A |
[F]
D E | A | D E | A A7 |
D E | C♯m7 F♯m | D E |
[G]
A C♯m7 | D E | A | D C♯m7 |
A | D E | A C♯m7 | D E |
A | D C♯m7 | F♯m | D E |
F♯m E | D E | F♯m E | D E |
[H]
D E | F♯m | D E | A |
D E | F♯m | D E | A E |
[I]
A C♯m7 | D E | A | D C♯m7 |
D | E | A C♯m7 | D C♯7 |
F♯m | D E | C♯m7 F♯m | D |
E |
[Interlude]
A C♯m7 | D E |
[J]
A C♯m7 | D | Bm7 E | A C♯m7 |
D Bm7 | E A |`,

`title: 愛を伝えたいだとか (Ai wo Tsutaetai da to ka)
by: あいみょん (Aimyon)
genre: J-pop
feel: Groove
source: U-FRET chord chart
tempo: 82
key: A
form: Intro A A B A A C D B Outro
[Intro]
Em Cm | Bm A |
[A]
Dmaj7 C♯7 | F♯m7 B7 | Dmaj7 C♯7 | F♯m7 A |
[B]
Dmaj7 C♯7 | F♯m7 | Dmaj7 C♯7 | F♯m7 A |
Dmaj7 C♯7 | F♯m7 A | Dmaj7 C♯7 | F♯m7 A |
Dmaj7 C♯7 | F♯m7 A | Dmaj7 C♯7 | F♯m7 A |
[C]
Dmaj7 C♯7 | F♯m7 | Dmaj7 C♯7 | F♯m7 A |
Dmaj7 C♯7 | F♯m7 A | Dmaj7 C♯7 | F♯m7 A |
Dmaj7 C♯7 | F♯m7 A | Dmaj7 C♯7 | F♯m7 |
[D]
D | C♯7 | F♯m7 D | C♯7 |
D C♯7 | D C♯7 |
[Outro]
Dmaj7 C♯7 | F♯m7 | Dmaj7 C♯7 | F♯m7 A |
Dmaj7 C♯7 | F♯m7 A | Dmaj7 C♯7 | F♯m7 A |
Dmaj7 C♯7 | F♯m7 A | Dmaj7 C♯7 | F♯m7 A |`,

`title: チェリー (Cherry)
by: スピッツ (Spitz)
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 134
key: C
form: Intro A B A C D Interlude E F
[Intro]
C G | Am F | C G | Am F |
C G | Am F | C G | Am F |
[A]
C G | Am Em | F C | F G |
C G | Am Em | F G | C Am |
F G | Cadd9 |
[B]
G Am | Em F | C | Am Em |
F C | Am Em | F C | Am Em |
F G | C |
[C]
G Am | Em F | C | Am Em |
F C | Am Em | F C | Am Em |
F G | C | B♭add9 Am |
[D]
F Am | F | Am G | F Fmaj7 |
[Interlude]
C G | Am F | C G | Am F |
C G | Am F | C G | Am F |
[E]
C G | Am Em | F G | C Am |
F G | C |
[F]
G Am | Em F | C | Am Em |
F C | Am Em | F C | Am Em |
F G | C | Am Em | F C |
Am Em | F C | Am Em | F C |
Am Em | F G | C |`,

`title: ロビンソン (Robinson)
by: スピッツ (Spitz)
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 127
key: F♯m
form: A B C D E B F G H
[A]
Dmaj7 C♯m7 | F♯sus4 F♯m | Dmaj7 C♯m7 | F♯sus4 F♯m |
Dmaj7 C♯m7 | F♯sus4 F♯m | Dmaj7 C♯m7 | F♯sus4 F♯m |
A Bm7 | E F♯m | D A | D E |
[B]
A Bm7 | E F♯m | D A | D Esus4 |
E |
[C]
C♯m7 F♯m | Bm7 | E7 C♯m7 | F♯7 Bm7 |
E7sus4 E7 | C♯7sus4 C♯7 |
[D]
D E/D | C♯7 F♯m | D E | C♯m7 |
D E/D | C♯7 F♯m | Dmaj7 E | F♯m |
Dmaj7 C♯m7 | F♯sus4 F♯m | Dmaj7 C♯m7 | F♯sus4 F♯m |
[E]
A Bm7 | E F♯m | D A | D E |
[F]
C♯m7 F♯m7 | Bm7 | E7 C♯m7 | F♯7 Bm7 |
E7sus4 E7 | C♯7sus4 C♯7 |
[G]
D E/D | C♯7 F♯m | D E | C♯m7 |
D E/D | C♯7 F♯m | Dmaj7 E | F♯m |
[H]
D E/D | C♯7 F♯m | Dmaj7 E | F♯m |
Bm7 C♯m7 | F♯sus4 F♯ |`,

`title: 空も飛べるはず (Sora mo Toberu Hazu)
by: スピッツ (Spitz)
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 130
key: C
[A]
C G | Am | C G | Am |
C G | Am | Fmaj7 | C Dm |
G Am | F C | D7 G | C Dm |
G Am | F C | D7 G | Am Fmaj7 |
Dm7 Em7 | Fmaj7 G7 |
[B]
C G | Am | F G | C |
F G | Em7 Am | D7 G7 | C G |
Am F | G C | F G | Em7 Am |
F G7 | C G | Am | C G |
Am | C G | Am | Fmaj7 |
[C]
C Dm | G Am | F C | D7 G |
Am Fmaj7 | Dm7 Em7 | Fmaj7 G |
[D]
C G | Am | F G | C |
F G | Em7 Am | D7 G7 | C G |
Am | F G | C | F G |
Em7 Am | F G7 | Am7 Fmaj7 | Am7 Fmaj7 |
Dm7 Em7 | Fmaj7 G |
[E]
C G | Am | F G | C |
F G | Em7 Am | D7 G7 | C G |
Am F | G C | F G | Em7 Am |
F G7 | C G | Am | C G |
Am | C G | Am | Fmaj7 |
G C |`,

`title: 楓 (Kaede)
by: スピッツ (Spitz)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 78
key: A♭
form: A B C D E B F G F H
[A]
D♭ E♭ | A♭ Fm | D♭ E♭ | A♭ |
A♭ Cm | Fm B♭ | D♭ E♭ | A♭ Cm |
Fm B♭ | D♭ E♭ | A♭ |
[B]
D♭ E♭ | A♭ Fm | D♭ E♭ | A♭ |
D♭ E♭ | A♭ Fm | B♭m C7 |
[C]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
[D]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
D♭ D♭sus4 | D♭ |
[E]
A♭ Cm | Fm B♭ | D♭ E♭ | A♭ Cm |
Fm B♭ | D♭ E♭ | A♭ |
[F]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
[G]
G♭ A♭ | G♭ Fm | E♭ | D♭ E♭ |
A♭ Fm | D♭ E♭ | A♭ | D♭ E♭ |
A♭ Fm | B♭m C7 |
[H]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |`,

`title: Tomorrow never knows
by: Mr.Children
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: C
[A]
C G | Am G | D/F♯ F | E/C |
F/A G | F Em | Dm C | B♭ |
[Interlude]
Fmaj7 G/F | Em Fmaj7 | Fmaj7 G/F | Em Fmaj7 |
[B]
Fmaj7 G/F | Em7 Fmaj7 | Fmaj7 G/F | Am9 |
Fmaj7 G/F | Em7 Fmaj7 | Fmaj7 G | Am9 |
Fmaj7 G/F | Em7 Fmaj7 | Fmaj7 G/F | Am9 |
Fmaj7 G/F | Em7 Fmaj7 | Fmaj7 G | Am9 |
[C]
Fmaj7 G/F | Em7 Am7 | Dm9 Cadd9 | Fmaj7 C |
G |
[D]
C F | G E7 | Am F | G E7 |
C F | G E7 | Am F | D |
F G/F | F G | C | C G |
Am G | D/F♯ F | E/C | F/A G |
F Em | Dm C | B♭ G |
[E]
Fmaj7 G/F | Em7 Fmaj7 | Fmaj7 G/F | Am9 |
Fmaj7 G/F | Em7 Fmaj7 | Fmaj7 G/F | Am9 |
[F]
Fmaj7 G/F | Em7 Am7 | Dm6 Cadd9 | Fmaj7 C |
G |
[G]
C F | G E7 | Am F | G E7 |
C F | G E7 | Am F | D |
F G/F | F G | B♭ | B♭ F |
A♭ Gsus4 | G | B♭ F | A♭ Gsus4 |
G |
[H]
F G/F | F G/F | F G/F | F G |
A |
[I]
D G | A F♯7 | Bm G | A F♯7 |
D G | A F♯7 | Bm G | E |
D G | A F♯7 | Bm G | A F♯7 |
D G | A F♯7 | Bm G | E |
G A/G | G A | D | D A |
Bm A | E/A♭ G | D/F♯ | G/B A |
G D/F♯ | Em D | C A | G |
G D/F♯ | Em D |`,

`title: innocent world
by: Mr.Children
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 142
key: E
[A]
E A | C♯m Dadd9 | E A | C♯m Dadd9 |
A/B |
[B]
E C♯m | G♯m C♯m | E F♯m | B7 E |
C♯m G♯m | C♯m E | F♯m B7 | E |
G♯m A | F♯m C° | C♯m | E F♯m |
G♯m | A G♯m | F♯ B7 |
[C]
G♯7 A | E | F♯ B7 | G♯7 |
A E | C♯7 | F♯m G♯m | Am E |
A C♯m | Dadd9 |
[Interlude]
E A | C♯m Dadd9 | A/B |
[D]
E C♯m | G♯m C♯m | E F♯m | B7 E |
C♯m G♯m | C♯m E | F♯m B7 | E |
[E]
G♯m A | F♯m C° | C♯m | E F♯m |
G♯m | A G♯m | F♯ B7 | G♯7 |
[F]
A E |
[G]
F♯ B7 | G♯7 | A E | C♯7 |
[H]
F♯m G♯m | Am Amaj7 | B7 Amaj7 | B7 |
[Interlude 2]
G♯m C♯m | Dadd9 |
[I]
B7 G♯m | A F♯m | C° | C♯m E |
F♯m7 G♯m7 | A G♯m | F♯ B7 | G♯7 |
[J]
A E | F♯ B7 | G♯7 | A E |
C♯7 | F♯m G♯m | A | F♯m G♯m |
Am F♯m | G♯m Am | C♯m E | A♯° A |
Dadd9 G♯m | A♯° Am | Esus4 E |`,

`title: HANABI
by: Mr.Children
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 120
key: D♭
form: A B C D E F G H I F J K L M
[A]
B♭m7 E♭m7 | A♭ D♭ | G♭maj7 E♭7 | A♭sus4 F7 |
B♭m7 E♭m7 | A♭ D♭ | G♭maj7 E♭7 | A♭sus4 A♭ |
[B]
D♭add9 A♭/D♭ | B♭m7 G♭maj7 | A♭ | Fm7 B♭m7 |
Fm7 B♭m7 | E♭m7 A♭sus4 | A♭ |
[C]
D♭add9 A♭/D♭ | B♭m7 G♭maj7 | A♭ | Fm7 B♭m7 |
Fm7 B♭m7 | E♭m7 A♭ | F7 |
[D]
B♭m7 G♭ | A♭ D♭ | G♭maj7 E♭7 | A♭sus4 F7 |
B♭m7 G♭ | A♭ D♭ | G♭maj7 E♭7 | A♭ |
[E]
D♭add9 A♭/D♭ | B♭m7 G♭maj7 | A♭ | Fm7 B♭m7 |
Fm7 B♭m7 | E♭m7 E♭m7/A♭ | A♭ D♭sus4 | D♭ D♭sus4 |
D♭ | D♭sus4 D♭ |
[F]
G♭maj7 A♭/G♭ | Fm7 B♭m7 | E♭m7 A♭7 | Fm7 B♭m7 |
E♭m7 E♭m7/A♭ | F |
[G]
G♭maj7 A♭/G♭ | Fm7 B♭m7 | E♭m7 A♭ | A♭/G♭ Fm7 |
F7 B♭m7 | E♭m7 E♭m7/A♭ | G♭maj7 |
[H]
D♭add9 A♭/D♭ | B♭m7 G♭maj7 | A♭ | Fm7 B♭m7 |
Fm7 B♭m7 | E♭m7 | A♭ F7 |
[I]
B♭m7 G♭ | A♭ D♭ | G♭maj7 E♭7 | A♭sus4 F7 |
B♭m7 G♭ | A♭ D♭ | G♭maj7 E♭7 | A♭ D♭sus4 |
D♭ D♭sus4 | D♭ | D♭sus4 D♭ |
[J]
G♭maj7 A♭/G♭ | Fm7 B♭m7 | E♭m7 A♭ | A♭/G♭ Fm7 |
F7 B♭m7 | E♭m7 E♭m7/A♭ | D♭ |
[K]
A♭ B♭m7 | A♭m7 D♭ | G♭ | Fm7 B♭m7 |
E♭m7 E♭m7/A♭ | Em7/A |
[L]
Gmaj7 A/G | G♭m7 Bm7 | Em7 Em7/A | G♭m7 Bm7 |
Em7 Em7/A | G♭ |
[M]
Gmaj7 A/G | G♭m7 Bm7 | Em7 A | A/G G♭m7 |
G♭/A Bm7 | Em7 Em7/A | Bm7 | D Gmaj7 |
Bm7 Em7 | Asus4 A | Bm7 G | A D |
Gmaj7 E7 | Asus4 G♭7 | Bm7 G | A D |
Gmaj7 E7 | Asus4 A | Gmaj7 |`,

`title: しるし (Shirushi)
by: Mr.Children
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 70
key: D♭
form: A B C D B E F G H
[A]
D♭ Cm7♭5 | F B♭m | B♭m7 G♭ | G♭/A♭ G♭m/A♭ |
[B]
D♭ F7sus4 | F7 B♭m7 | E♭sus4 E♭ | G♭ G♭/A♭ |
A♭ D♭ | G♭m | D♭ F7sus4 | F7 B♭m |
B♭m7 E♭sus4 | E♭ | G♭ G♭/A♭ | A♭ D♭ |
D♭maj7 D♭ |
[C]
E♭m7 A♭ | A♭7 F7 | B♭m7 | E♭m7 A♭sus4 |
A♭ |
[D]
D♭sus4 D♭ | F7sus4 F7 | B♭m B♭m7 | E♭7 |
E♭m7 Fm7 | G♭ E♭ | A♭ | D♭sus4 D♭ |
F7sus4 F7 | B♭m B♭m7 | E♭7 | D♭ G♭ |
G♭/A♭ D♭ | G♭m |
[E]
E♭m7 A♭ | A♭7 F7 | B♭m | B♭m7 E♭m7 |
A♭sus4 A♭ |
[F]
D♭sus4 D♭ | F7sus4 F7 | B♭m B♭m7 | E♭7 |
E♭m7 Fm7 | G♭ E♭ | A♭ | D♭sus4 D♭ |
F7sus4 F7 | B♭m B♭m7 | E♭7 | D♭ G♭ |
G♭/A♭ D♭ | Cm7♭5 B♭m | B♭m7 G♭ | G♭/A♭ |
D♭ Cm7♭5 | F B♭m | B♭m7 G♭ | G♭/A♭ |
[G]
D♭sus4 D♭ | F7sus4 F7 | B♭m7 E♭7 | E♭m7 Fm7 |
G♭ E♭add9 | G♭/A♭ G/A |
[H]
Dsus4 D | G♭7sus4 G♭7 | Bm Bm7 | E7 |
Em7 G♭m7 | G E | A | Dsus4 D |
G♭7sus4 G♭7 | Bm Bm7 | E7 | D G |
G/A D | G | G/A D | D♭m7♭5 G♭7 |
Bm Bm7 | G G/A | D D♭m7♭5 | G♭7 Bm |
Bm7 G | G/A | D D♭m7♭5 | G♭7 Bm |
Bm7 G | G/A | D D♭m7♭5 | G♭7 Bm |
Bm7 G | G/A |`,

`title: 名もなき詩 (Na mo Naki Uta)
by: Mr.Children
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 140
key: G
form: A B B C D E B C D E F G H I
[A]
G |
[B]
G | Am7 G |
[C]
C D | B7 Em | Em7 | Am7 Bm7 |
C D |
[D]
G | Am7 Cadd9 |
[E]
G Bm7 | C B7sus4 | B7 Em | A7 C |
Dsus4 D | G Bm7 | C B7sus4 | B7 Em |
A7 C | D G |
[F]
Am7 Em | E♭6 D | G Em | C E♭ |
G Em | C D |
[G]
C | D | B7 Em | Em7 |
Am7 Bm7 | C D | C/D C♯/E♭ |
[H]
A♭ Cm | C♯ C7sus4 | C7 Fm | B♭7 C♯ |
E♭sus4 E♭ | A♭ Cm | C♯ C7sus4 | C7 Fm |
B♭7 C♯ | E | F♯ A♭ |
[I]
A♭ | B♭m7 | C♯ A♭ | B♭m7 E♭ |
A♭6 |`,

`title: First Love
by: 宇多田ヒカル (Hikaru Utada)
genre: J-pop
feel: R&B ballad
source: U-FRET chord chart
tempo: 85
key: G
form: A A B C A B D E
[A]
G D | Em7 G | Cmaj7 Am7/D | G C |
G |
[B]
Em D | C D | Em Bm7 | Cmaj7 |
[C]
G D | Em Gmaj7 | Cmaj7 Am7/D | G |
D | Em Gmaj7 | Cmaj7 Am7/D | G |
D C | G Cmaj7 | Am7 |
[D]
G D | Em Gmaj7 | Cmaj7 Am7/D | G D |
Em Gmaj7 | Cmaj7 Am7/D | G Am7/D | B♭m7/E♭ |
[E]
A♭ E♭ | Fm A♭ | C♯maj7 B♭m7/E♭ | A♭ |
E♭ | Fm7 B♭m7 | F♯/A♭ | C♯maj7 B♭m7/E♭ |
A♭ C♯ | A♭ | A♭ E♭ | Fm A♭ |
C♯maj7 B♭m7/E♭ | A♭ C♯ | A♭ |`,

`title: Automatic
by: 宇多田ヒカル (Hikaru Utada)
genre: J-pop
feel: R&B
source: U-FRET chord chart
tempo: 105
key: Fm
form: A B C D E B C D F G H
[A]
D♭maj7 Cm7 | B♭m7 B♭m7/E♭ | Fm7 Cm7 | B♭m7 B♭m7/E♭ |
D♭maj7 Cm7 | B♭m7 B♭m7/E♭ | Fm7 Cm7 | B♭m7 B♭m7/E♭ |
Fm A♭ | D♭maj7 Cm7 | Fm/B♭ B♭m | Cm7 C7 |
[B]
Fm A♭ | D♭maj7 Cm7 | Fm/B♭ B♭m | Cm7 C7 |
[C]
D♭maj7 Cm7 | A♭ | D♭maj7 Cm7 | A♭ |
D♭maj7 Cm7 | A♭ | G♭maj7 A♭ |
[D]
D♭maj7 C7 | Fm | Cm7 Fm | Cm7 Fm |
Cm7 Fm | F | Fm/B♭ C7 | Fm Fm/E♭ |
Dm7♭5 D♭ |
[E]
Csus4 C | Fm | Cm7 Fm | Cm7 Fm |
Cm7 Fm | F | Fm/B♭ C7 | Fm Dm7♭5 |
D♭ | C C7 | D♭maj7 | Cm7 B♭m7 |
Fm7 Cm7 | D♭ |
[F]
Csus4 C | Fm | Cm7 Fm | Cm7 Fm |
Cm7 Fm | F | Fm/B♭ C7 | Fm Dm7♭5 |
D♭ |
[G]
D♭maj7 C7 | Fm | Cm Fm | Cm7 Fm |
Cm7 Fm | F | Fm/B♭ C7 | Fm Fm/E♭ |
Dm7♭5 D♭ |
[H]
Csus4 C | Fm | Cm7 Fm | Cm7 Fm |
Cm7 Fm | F | Fm/B♭ C7 | Fm Dm7♭5 |
D♭ | C C7 | Fm | Cm7 Fm |
Cm7 Fm | Cm7 Fm | F | Fm/B♭ C7 |
Fm Fm/E♭ | Dm7♭5 D♭ | Csus4 C | Fm Cm7 |
Fm Cm7 | Fm Cm7 | Fm F | Fm/B♭ C7 |
Fm Fm/E♭ | Dm7♭5 D♭ | Csus4 C | Fm Cm7 |
Fm Cm7 | Fm Cm7 |`,

`title: 花束を君に (Hanataba wo Kimi ni)
by: 宇多田ヒカル (Hikaru Utada)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 90
key: E
form: A B Interlude C D Interlude 2 E D B Outro
[A]
E G♯m7 | A | F♯m7 B | E |
E G♯m7 | A | F♯m7 A | B |
[B]
E G♯m7 | A E | A E | A E |
E G♯m7 | G♯7 C♯m7 | A G♯7 | A G♯7 |
A E | A E | D B |
[Interlude]
E C♯m7 | G♯m7 | E C♯m7 | B |
[C]
E G♯m7 | A | F♯m7 B | E G♯m7 |
A F♯m7 | A B |
[D]
E G♯m7 | A E | A E | A E |
E G♯m7 | G♯7 C♯m | A G♯7 | A G♯7 |
A E | A E | D B |
[Interlude 2]
E G♯m7 | A | F♯m7 B | E |
[E]
E | G♯7 C♯m | F♯m7 G♯7 |
[Outro]
E C♯m7 | G♯m7 | E C♯m7 | B |
E C♯m7 | G♯m7 | E C♯m7 | B |`,

`title: One Last Kiss
by: 宇多田ヒカル (Hikaru Utada)
genre: J-pop
feel: Electro pop
source: U-FRET chord chart
tempo: 125
key: G♯m
form: Intro A B C Interlude A D C Interlude 2 D E Interlude 2 C Outro
[Intro]
C♯m7 Emaj7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ Bmaj7 |
F♯/A♯ |
[A]
C♯m7 Emaj7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ D♯m7 |
[B]
Emaj7 B/D♯ | C♯m7 G♯m7 | Emaj7 B/D♯ | C♯m7 F♯ |
D♯7 |
[C]
C♯m7 G♯m7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ D♯m7 |
[Interlude]
C♯m7 G♯m7 | F♯ D♯m7 |
[D]
Emaj7 B/D♯ | C♯m7 G♯m7 | D♯m7 | Emaj7 B/D♯ |
C♯m7 F♯ | D♯7 |
[Interlude 2]
C♯m7 G♯m7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ D♯m7 |
[E]
C♯m7 G♯m7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ D♯m7 |
C♯m7 G♯m7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ D♯m7 |
[Outro]
C♯m7 G♯m7 | F♯ D♯m7 | C♯m7 Emaj7 | F♯ D♯m7 |`,

`title: 初恋 (Hatsukoi)
by: 宇多田ヒカル (Hikaru Utada)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 70
key: G
form: A A B C A D E F A
[A]
C Em | Am7 G | C Em | Am7 G |
[B]
C G/B | C G/B | Em C | G/B C |
Em D | C D | Em G | C D |
Em |
[C]
D C | Em | Am7 G | C Em |
Am7 | G |
[D]
C G/B | C | G/B Em | C |
G/B | C Em | D |
[E]
C D | Em G | C D | Em |
C Em | Am7 G | C Em | Am7 G |
C D | Em | G C | D Em |
[F]
C Em | Am7 G | C Em | Am7 G |
C Em | Am7 G | C Em | Am7 |
G |`,

`title: きらり (Kirari)
by: 藤井風 (Fujii Kaze)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 123
key: D
form: A B C B D E Interlude F G H Interlude 2 I E
[A]
G F♯m | Em D | Em F♯m | G F♯m |
Em D |
[B]
Em F♯m | Gm B♭/C | F | Dm Gm |
B♭/C F | B♭ Em | F♯ |
[C]
G F♯m | B Em | A D | Em F♯m |
G F♯m | B Em | A D |
[D]
G F♯m | B | Em A | D G♯m7♭5 |
G Gm | F♯m B | Em A | D G♯m7♭5 |
[E]
G F♯m | B Em | A D | G♯m7♭5 |
G F♯m | Em F♯ | B |
[Interlude]
G F♯m | Em D | G♯m7♭5 | G F♯m |
Em D | G♯m7♭5 |
[F]
G F♯m | Em D | Em F♯m | G F♯m |
Em D | G | F♯m B | Em A |
D G♯m7♭5 | G | F♯m B | Em A |
D G♯m7♭5 |
[G]
G F♯m | B Em | A | D G♯m7♭5 |
G F♯m | B Em | A | D G♯m7♭5 |
[H]
Gm B♭/C | F | Dm Gm | B♭/C F |
B♭ Em | F♯ |
[Interlude 2]
Gm Am | B♭m Cm | C♯ Am7 |
[I]
Em F♯m | D Em | A F♯m | Bm C |
A/C♯ D | G Gm | F♯m B | Em A |
D G♯m7♭5 |`,

`title: 何なんw (Nan-Nan)
by: 藤井風 (Fujii Kaze)
genre: J-pop
feel: R&B
source: U-FRET chord chart
tempo: 96
key: Bm
form: Intro Interlude A B C D E C D F G H I Outro
[Intro]
Gmaj7 F♯m7 | Fm7 | Gmaj7 F♯7 | Am7 D |
Gmaj7 F♯m7 | Bm7 | Em7 Gm7 | Am7 G♯m7♭5 |
[Interlude]
Gmaj7 F♯m7 | Bm7 | Em7 F♯m7 | Bm7 Am7 |
D | G♯m7♭5 C | F♯m7 Bm7 | Em7 Am7 |
D G♯m7♭5 |
[A]
Gmaj7 F♯m7 | Bm7 | Gmaj7 F♯m7 | Bm7 A |
G♯m7♭5 | Gmaj7 C | F♯m7 Bm7 | Em7 F♯m7 |
Bm7 F♯m7 | Fm7 |
[B]
Em7 F♯m7 | Bm7 | Em7 F♯m7 | Bm7 A |
G♯m7♭5 | Gmaj7 C | F♯m7 Bm7 | Em7 F♯m7 |
Bm7 |
[C]
Gm7 C | F Dm7 | G♯m7 | Gm7 C |
F B♭ | Em7 F♯7 |
[D]
Gmaj7 | F♯m7 Bm7 | Gmaj7 | F♯m7 Am7 |
D | Gmaj7 | F♯m7 Bm7 | Em7 |
Am7 D |
[E]
G♯m7♭5 C♯7 | F♯m7 Em7 | D | G♯m7♭5 C♯7 |
F♯m7 Em7 | D |
[F]
G♯m7♭5 C♯7 | F♯m7 | Em7 D | G♯m7♭5 C♯7 |
F♯m7 | Am7 E♭ |
[G]
Gm7 C | F Dm7 | Gm7 C | F Dm7 |
F♯7 |
[H]
Gmaj7 | F♯m7 Bm7 | A | Gmaj7 |
F♯m7 Am7 | D | Gmaj7 F♯m7 | Bm7 |
Em7 | Am7 D |
[I]
Gmaj7 F♯m7 | Bm7 | Gmaj7 F♯m7 | Am7 D |
Gmaj7 F♯m7 | Bm7 | Em7 Gm7 | Am7 D |
[Outro]
Gmaj7 F♯m7 | Bm7 | Gmaj7 F♯m7 | Am7 D |
Gmaj7 F♯m7 | Fm7 | Em7 Gm7 | Am7 D |
G♯m7♭5 |`,

`title: 帰ろう (Kaerou)
by: 藤井風 (Fujii Kaze)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 76
key: A
form: Intro A B C D E B F G H
[Intro]
Dmaj7 C♯m7 | Bm7 Bm7/E | Dmaj7 C♯m7 | Bm7 Bm7/E |
F° |
[A]
Amaj7 Dmaj7 | C♯m7 F♯m | Em | Dmaj7 C♯m7 |
Cm7 Bm7 | C♯m7 Dm7 | E |
[B]
Amaj7 Dmaj7 | C♯m7 C♯7 | F♯m Em | Dmaj7 C♯m7 |
Cm7 Bm7 | E |
[C]
Fmaj7 Em7 | Am7 Dm7 | G7 Cmaj7 | C7 Fmaj7 |
Em7 | Am7 Dm7 | Dm7/C Bm7♭5 | E |
[D]
Dmaj7 C♯m7 | F♯7 | Bm7 E | Amaj7 D♯m7♭5 |
Dmaj7 C♯m7 | F♯7 | Bm7 B7 | Em Em/A |
Dmaj7 C♯m7 | F♯7 | Bm7 E | Amaj7 D♯m7♭5 |
Dmaj7 C♯m7 | C♯7 F♯m | Bm7 E | D♯9 Dmaj7 |
C♯m7 Bm7 | Bm7/E | Fmaj7 Em7 | D♯maj7 Dm7 |
G E |
[E]
Amaj7 Dmaj7 | C♯m7 C♯7 | F♯m Em | Dmaj7 C♯m7 |
Cm7 Bm7 | C♯m7 Dm7 | E |
[F]
Fmaj7 Em7 | Am7 Dm7 | G7 Cmaj7 | C7 Fmaj7 |
Em7 | D♯m7 Dm7 | Dm7/C Bm7♭5 | E |
[G]
Dmaj7 C♯m7 | F♯7 | Bm7 E | Amaj7 D♯m7♭5 |
Dmaj7 C♯m7 | F♯7 | Bm7 B7 | Em Em/A |
Dmaj7 C♯m7 | F♯7 | Bm7 E | Amaj7 D♯m7♭5 |
Dmaj7 C♯m7 | C♯7 F♯m | Bm7 Em | Em/A |
Dmaj7 Dm7/G | C♯m7 C♯7 | F♯m | Bm7 E |
D♯9 Dmaj7 | Dm6 C♯m7 | C♯7 F♯m |
[H]
Bm7 E | D♯9 Dmaj7 | C♯m7 Bm7 | Bm7/E |
Dmaj7 C♯m7 | Bm7 Bm7/E | F° Amaj7 |`,

`title: まつり (Matsuri)
by: 藤井風 (Fujii Kaze)
genre: J-pop
feel: Groove
source: U-FRET chord chart
tempo: 110
key: E
form: Intro A A B C D E F G H H I
[Intro]
F♯m7 G♯m | G♯m7/C♯ C♯7-9 | F♯m7 G♯7+5 | G♯m/C♯ C♯7-9 |
F♯m7 B | Emaj7 A♯m7♭5 | A G♯7+5 | G♯m7/C♯ C♯9 |
[A]
F♯m7 G♯m | G♯m7/C♯ C♯7-9 | F♯m7 G♯7+5 | G♯m7/C♯ C♯7-9 |
F♯m7 B | Emaj7 | A♯m7♭5 A | G♯7+5 G♯m7/C♯ |
C♯7-9 |
[B]
F♯m7 G♯7 | G♯7-9 | G♯m7/C♯ | A♯m7♭5 |
F♯m7 D9 | G♯m7/C♯ C♯7-9 | C♯7-9 |
[C]
F♯m7 G♯m | G♯m7/C♯ C♯7-9 | F♯m7 G♯7+5 | G♯m7/C♯ C♯7-9 |
F♯m7 B | Emaj7 A♯m7♭5 | A G♯m | F♯m7 |
[D]
F♯m7 G♯m | G♯m7/C♯ C♯7-9 | F♯m7 G♯7+5 | G♯m7/C♯ C♯7-9 |
F♯m7 B | Emaj7 A♯m7♭5 | A G♯7+5 | G♯m7/C♯ C♯7-9 |
[E]
F♯m7 G♯m7/C♯ | C♯m G♯m7/C♯ | F♯m7 G♯m7/C♯ | C♯m |
[F]
F♯m7 G♯m | C♯m | F♯m7 G♯m | C♯m |
[G]
F♯m7 G♯7 | G♯7-9 | G♯m7/C♯ | A♯m7♭5 |
F♯m7 D9 | C♯m C♯7-9 |
[H]
F♯m7 G♯m | G♯m7/C♯ C♯7-9 | F♯m7 G♯7+5 | G♯m7/C♯ C♯7-9 |
F♯m7 B | Emaj7 A♯m7♭5 | A | G♯m F♯m7 |
[I]
F♯m7 G♯m7 | C♯m C♯7-9 | F♯m7 G♯7+5 | C♯m C♯7-9 |
F♯m7 B | Emaj7 A♯m7♭5 | A G♯7+5 | G♯m7/C♯ C♯7-9 |`,

`title: 満ちてゆく (Michite Yuku)
by: 藤井風 (Fujii Kaze)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 78
key: A
form: Intro A B C D Interlude E Interlude 2 A F G H I Interlude 3 J K L Outro
[Intro]
A C♯m | Dmaj7 F♯7 | Bm E7 | Amaj7 B♭maj7 |
A C♯m | Dmaj7 F♯7 | Bm E7 | Amaj7 B♭maj7 |
[A]
A | C♯m | Em7 A | Dmaj7 |
[B]
E/F♯ A | C♯m | Em7 A | Dmaj7 |
[C]
A/C♯ Bm | A/C♯ F♯m | G Em7 | A |
[D]
Dmaj7 C♯m7 | Am/C | Bm7 E | A |
E D♯ | Dmaj7 C♯m7 | C♯ F♯m | Am/C |
Bm7 E | A C♯m | Dmaj7 F♯7 |
[Interlude]
Bm E7 | Amaj7 |
[E]
B♭maj7 A | C♯m Dmaj7 | F♯7 |
[Interlude 2]
Bm E | Amaj7 B♭maj7 |
[F]
A C♯m | Em7 A | Dmaj7 |
[G]
Bm | A/C♯ F♯m | G Em7 | A |
[H]
Dmaj7 C♯m7 | Am/C | Bm7 E | A |
E D♯ | Dmaj7 C♯m7 | C♯ F♯m | Am/C |
Bm7 E7 | Dmaj7 |
[I]
Dmmaj7 F♯m7 | Em7 A | Dm7 Cmaj7 |
[Interlude 3]
B♭maj7 A |
[J]
Dmaj7 C♯m7 | Am/C Bm7 | F° F♯m7 | Em7 A |
Dmaj7 C♯m7 | F♯m7 Bm7 | E F |
[K]
D♯maj7 Dm7 | B♭m/C♯ | Cm7 Fm7 | B♭ |
Fm E° | D♯maj7 Dm7 | D Gm | D° |
Cm7 F7 |
[L]
B♭ Dm7 | D♯maj7 Gm7 | Cm7 F7 | B♭maj7 Bmaj7 |
B♭ Dm7 | D♯maj7 Gm7 | Cm7 F7 | B♭maj7 Bmaj7 |
[Outro]
B♭ Dm7 | D♯maj7 Gm7 | Cm7 F7 | B♭maj7 Bmaj7 |`,

`title: だから僕は音楽を辞めた (Dakara Boku wa Ongaku wo Yameta)
by: ヨルシカ (Yorushika)
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 110
key: C♯m
form: A Interlude A B C Interlude A D C Interlude E F G Interlude 2 H I
[A]
A B | C♯m | A B | C♯m |
A B | C♯m | A B | C♯m |
[Interlude]
A B | C♯m G♯m7 | A B | C♯m |
A B | C♯m G♯m7 | A B | C♯m |
[B]
E/G♯ A | B C♯m | F♯m7 G♯m7 | A G♯7 |
[C]
A B | G♯m7 C♯m | F♯m7 B | E C♯m |
A B | G♯m7 C♯m | A B |
[D]
E/G♯ A | B C♯m | F♯m7 | G♯m7 A |
B G♯7 |
[E]
A B | C♯m | A B | C♯m |
A B | C♯m A | B C♯m |
[F]
A B | C♯m | A B | C♯m |
A B | C♯m | A B | C♯m |
F♯ E | D♯ C♯ | B A | G♯ |
D C♯ |
[G]
A♯ C | Am7 Dm | Gm7 C | F Dm |
A♯ C | Am7 Dm | A♯ C | Dm |
[Interlude 2]
A♯ C | Dm Am7 | A♯ C | Dm |
A♯ C | Dm Am7 | A♯ C | Dm |
[H]
A♯ C | Dm Am7 | A♯ C | Dm |
A♯ C | Dm Am7 | A♯ C | Dm |
[I]
A♯ C | Dm Am7 | A♯ C | Dm |`,

`title: 晴る (Haru)
by: ヨルシカ (Yorushika)
genre: J-pop
feel: Bright rock
source: U-FRET chord chart
tempo: 160
key: Bm
form: Intro A Interlude B Interlude 2 C C Interlude 3 A Interlude B Interlude 2 C D Interlude 4 E C C
[Intro]
Bm F♯m | G D | Bm F♯m | G D |
[A]
Bm F♯m | G | D Bm | F♯m G |
D Bm | F♯m G | D |
[Interlude]
Bm F♯m | G D |
[B]
Bm F♯m | G | D Bm | F♯m G |
D Bm | F♯m G | A |
[Interlude 2]
D | F♯m Gm7 | Am7 A/C♯ | A |
[C]
G A | F♯m Bm | G A | Bm A/C♯ |
D G | A F♯7 | Bm G | A Bm |
[Interlude 3]
F♯m G | D | Bm F♯m | G D |
[D]
G A | F♯m Bm | G A | Bm A/C♯ |
D G | A F♯7 | Bm G | A G |
[Interlude 4]
A Bm | G A | Bm | G A |
Bm | G A | Bm |
[E]
G A | Bm | G A | Bm |
G A | Bm | G A | Bm |`,

`title: 言って。 (Itte.)
by: ヨルシカ (Yorushika)
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 145
key: Am
[A]
F G | Em7 Am | F G | Am A♭° |
C/G F♯m7♭5 |
[B]
F G | Em7 | Am A♭° | G |
[C]
F G | C | Dm Em | F F♯m7♭5 |
[D]
G A♭° | Am Em7 | F F♯m7♭5 | G C |
[E]
F G | Em7 A♭° | Am | F G |
Am Em7 | F G | Em7 A♭° | Am |
F G | Am C | F G |
[Interlude]
F G | Em7 Am | F G | Am A♭° |
C/G F♯m7♭5 |
[F]
F G | Em7 | Am A♭° | G |
F G | Em7 Am |
[Interlude 2]
F G | Am A♭° | C/G F♯m7♭5 | F G |
Am |
[H]
F G | Em7 | Am | F G |
C Am |
[I]
F | G | Em7 Am |
[J]
F | G | Am A♭° | C/G F♯m7♭5 |
A7 |
[K]
F G | Em7 A♭° | Am B♭m |
[L]
F♯ A♭ | Fm7 A° | B♭m | F♯ A♭ |
B♭m Fm7 |
[M]
F♯ A♭ | Fm7 A° | B♭m | F♯ A♭ |
[N]
F♯ A♭ | Fm7 B♭m | F♯ A♭ | B♭m D♭ |
F♯ A♭ | B♭m D♭ |
[Z]
F♯ A♭ | D♭ |`,

`title: 花に亡霊 (Hana ni Bōrei)
by: ヨルシカ (Yorushika)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 87
key: E
form: A A B C Interlude A A B C Interlude B C D A
[A]
F♯m7 B | E B/D♯ | F♯m7 G♯m7 | A B |
E |
[B]
F♯m7 G♯m7 | A | F♯m7 G♯m7 | A |
A B |
[C]
C♯m7 A | B E | C♯m7 A | B E |
C♯m7 A | B E | A B |
[Interlude]
C♯m7 A | B E | C♯m7 A | B E |
C♯m7 A | B E | A Bsus4 |
[D]
C♯m7 A | B E | C♯m7 A | B E |
C♯m7 A | B E | A Bsus4 |`,

`title: 秒針を噛む (Byōshin wo Kamu)
by: ずっと真夜中でいいのに。(ZUTOMAYO)
genre: J-pop
feel: Funk rock
source: U-FRET chord chart
tempo: 140
key: C♯m
form: Intro Interlude A B C D Interlude E F C D Interlude 2 G Interlude 3 H I J
[Intro]
A B | C♯m G♯m7 | A B | C♯m G♯m7 |
A B | C♯m G♯m7 | A B | C♯m |
[Interlude]
A G♯ | C♯m G♯m7 | A G♯ | C♯m G♯m7 |
A G♯ | C♯m G♯m7 | A G♯ | C♯m |
[A]
A C° | C♯m E | A C° | C♯m G♯m7 |
A C° | C♯m E | G♯ C° | C♯m C♯ |
[B]
A C° | C♯m E | A C° | C♯m G♯m7 |
A C° | C♯m E | G♯ C° | C♯m |
[C]
A G♯ | C♯m E | A G♯ | C♯m E |
A G♯ | C♯m C° | E/B A♯m7♭5 | F♯m7 D♯/G |
G♯ |
[D]
A B | C♯m Bm | E | A G♯ |
C♯m F♯ | A Am7 | G♯m7 C° | C♯m |
F♯m7 G♯m7 | A |
[E]
A C° | C♯m E | A C° | C♯m G♯m |
A C° | C♯m E | G♯ C° | C♯m |
[F]
A B | G♯ C♯m | C♯ | F♯m7 G♯m7 |
A A♯m7♭5 | B |
[Interlude 2]
C♯m |
[G]
A | G♯ | C♯m | Bm |
A | G♯ | A A♯m7♭5 | B |
A A♯m7♭5 | B G♯ |
[Interlude 3]
A G♯ | C♯m G♯m7 | A G♯ | C♯m G♯m7 |
A B | G♯ C♯m | F♯m7 G♯m7 | A C° |
[H]
A Am7 | G♯m7 C♯m | A Am7 | G♯m C♯m |
A Am7 | G♯m7 C♯m | F♯m7 G♯m7 | A B |
[I]
A B | C♯m Bm | E | A G♯ |
C♯m F♯ | A Am7 | G♯m7 C° | C♯m |
F♯m7 G♯m7 | A G♯m7 | F♯m7 G♯m7 | A |
[J]
A G♯ | C♯m G♯m7 | A G♯ | C♯m G♯m7 |
A G♯ | C♯m G♯m7 | A G♯ | C♯m |`,

`title: 残機 (Zanki)
by: ずっと真夜中でいいのに。(ZUTOMAYO)
genre: J-pop
feel: Fast funk
source: U-FRET chord chart
tempo: 180
key: C
form: Intro A B C D E F G H I C J K L
[Intro]
Dm7 Em7 | Am | Dm7 Em7 | Am |
Dm7 Em7 | Am | Dm7 Em7 | Am |
[A]
Dm7 Em7 | Am | Dm7 Em7 | Am |
Dm7 Em7 | Am | Dm7 Em7 | Am |
Dm7 Em7 | Am | Dm7 Em7 | Am |
Dm7 Em7 | Am | Dm7 Em7 | Am |
[B]
Dm7 Em7 | Am | Dm7 Em7 | G Am |
Dm7 Em7 | Am | Dm7 Em7 | Am |
Bm |
[C]
Cmaj7 B7 | Em7 Cmaj7 | B7 Em7 | G7 |
Cmaj7 B7 | Em7 Cmaj7 | B7 Em7 |
[D]
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 G |
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 G |
[E]
Am G | F E | Am G | F E |
Dm Em | Am |
[F]
Dm7 Em7 | Am | Dm7 Em7 | G Am |
Dm7 Em7 | Am | Dm7 Em7 | Am D |
E♭ |
[G]
E Cmaj7 | B7 | Em7 Cmaj7 | B7 Em7 |
G7 | Cmaj7 B7 | Em7 Cmaj7 | B7 Em7 |
[H]
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 G |
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 G |
Cmaj7 B7 | Em Em7/D | D♭m7♭5 | Cmaj7 B7 |
Em B7+5 |
[I]
Cmaj7 G | Cmaj7 D | G F♯m7♭5 | B7 Em |
Em7/D | D♭m7♭5 Cmaj7 | B7 Em | Em |
[J]
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 D♭m7♭5 |
Cmaj7 B7 | Em7 Cmaj7 | B7 Em7 |
[K]
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 G |
Cmaj7 B7 | Em7 | Cmaj7 B7 | Em7 |
[L]
G | Em |`,

`title: ドライフラワー (Dry Flower)
by: 優里 (Yuuri)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 73
key: G
form: Intro A B C Interlude A D C Interlude 2 E F Outro
[Intro]
C G | Dsus4 Em7 | C G | Dsus4 Em7 |
[A]
C G | Dsus4 Em7 | C G | Dsus4 Em7 |
C G | Dsus4 Em7 | C G | D |
[B]
Em7 C | D G | D/F♯ | Em7 C |
D G | D/F♯ | Em7 C | Bm7 B7 |
Em7 | Am7 C | B7 |
[C]
C G | D B7 | Em7 | C G |
D E♭° | Em7 | C G | B7 Em7 |
Am7 Cm | D |
[Interlude]
C G | Dsus4 Em7 | C G | Dsus4 Em7 |
[D]
Em7 C | D G | D/F♯ | Em7 C |
D G | B7 | Em7 C | Bm7 B7 |
Em7 | Am7 C | B7 |
[Interlude 2]
Cmaj7 Em7 | Bm7 |
[E]
C D | Em7 Bm7 | C D | C D |
B7 |
[F]
C G | D B7 | Em7 | C G |
B7 Em7 | C G | B7 Em7 | Am7 Cm |
D |
[Outro]
C G | Dsus4 Em7 | C G | Dsus4 Em7 |
C G | Dsus4 Em7 | C G | D C |`,

`title: ベテルギウス (Betelgeuse)
by: 優里 (Yuuri)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 84
key: F
form: A B C D E F G H I D J
[A]
F B♭ | C Dm | F B♭ | C Dm |
F B♭ | C Dm | F B♭ | C |
[B]
B♭ F/A | C Dm7 | B♭ F/A | A/D♭ Dm7 |
B♭ C | A Dm7 | B♭ C |
[C]
B♭ F/A | C | Dm B♭ | F/A A/D♭ |
Dm | B♭ F/A | A Dm | E♭ C |
[D]
B♭ F/A | C Dm | C B♭ | F/A A/D♭ |
Dm | B♭ F/A | A/D♭ Dm | E♭ C |
B♭ |
[E]
F/A B♭ | C Dm | F/A B♭ | C Dm |
F/A B♭ | C Dm | F/A B♭ | C |
[F]
B♭ F/A | C Dm7 | B♭ F/A | A/D♭ Dm7 |
B♭ F/A | A Dm7 | B♭ C |
[G]
B♭ F/A | C | Dm B♭ | F/A A/D♭ |
Dm | B♭ F/A | A/D♭ Dm | E♭ C |
[H]
B♭ C | Dm F/A | B♭ C | A/D♭ Dm |
B♭ C | A/D♭ | Dm E♭ | C |
[I]
B♭ F | C | Dm B♭ | F A/D♭ |
Dm | B♭ F | A Dm | B♭ C |
[J]
F/A B♭ | C Dm | F/A B♭ |`,

`title: Bling-Bang-Bang-Born
by: Creepy Nuts
genre: J-pop
feel: Jersey club
source: U-FRET chord chart
tempo: 160
key: Am
form: A Interlude B C D E E F D E E
[A]
Am | Am | Am | Am |
Am | Am | Am | Am |
[Interlude]
Am E7 | Am E7 |
[B]
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 |
[C]
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 |
[D]
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am |
[E]
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am E7 |
[F]
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am | E7 Am |
E7 Am | E7 Am | E7 Am | E7 Am |
E7 | Am E7 | Am E7 | Am E7 |
Am E7 | Am E7 | Am E7 | Am E7 |
Am |`,

`title: オトノケ (Otonoke)
by: Creepy Nuts
genre: J-pop
feel: Hip-hop rock
source: U-FRET chord chart
tempo: 170
key: A♭
form: B C D E F G F G H C D E Interlude F G F G
[B]
A♭ | A♭ | A♭ | A♭ |
A♭ | A♭ | A♭ | A♭ |
A♭ |
[C]
D♭ C7 | Fm G♭ | D♭ C7 | Fm E♭m |
A♭7 | D♭ C7 | Fm G♭ | B♭m Cm |
D♭ |
[D]
Fm | D♭ | E♭ A♭ | Fm D♭ |
E♭ A♭ |
[E]
Fm | D♭ | E♭ A♭ | Fm D♭ |
E♭ | A♭ Fm | D♭ | E♭ A♭ |
Fm D♭ | E♭ A♭ |
[F]
Fm | D♭ |
[G]
E♭ | A♭ |
[H]
A♭ | A♭ | A♭ | A♭ |
A♭ | A♭ | A♭ | A♭ |
A♭ | A♭ |
[Interlude]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |`,

`title: 晩餐歌 (Bansanka)
by: tuki.
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: A♭
form: Intro A B C Interlude A B C D E F Interlude 2 Outro
[Intro]
A♭/C D♭ | E♭ Fm | A♭/C D♭ | E♭ Fm |
[A]
A♭/C D♭ | E♭ Fm | A♭/C D♭ | E♭ Fm |
A♭/C D♭ | E♭ Fm | A♭/C D♭ | E♭ Fm |
[B]
D♭ E♭ | A♭/C Fm | D♭ E° | Fm E♭ |
D♭ E♭ | A♭/C Fm | B♭m A♭/C | D♭ E° |
[C]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ E° | Fm D♭ | E♭ A♭ |
[Interlude]
A♭/C D♭ | E♭ Fm | A♭/C D♭ | E♭ Fm |
[D]
D♭ E♭ | A♭/C Fm | D♭ E♭ | A♭/C Fm |
D♭ E♭ | E° Fm | G♭ E♭ |
[E]
Fm D♭ | E♭ A♭ | Fm D♭ | E♭ A♭ |
Fm D♭ | E♭ E° | Fm D♭ |
[F]
G♭m D | E A | G♭m D | E A |
G♭m D | E F° | G♭m D | E A |
[Interlude 2]
G♭m D | E A | G♭m D | E A |
G♭m D | E F° | G♭m D | E A |
[Outro]
A/D♭ D | E G♭m | A/D♭ D | E G♭m |`,

`title: シンデレラボーイ (Cinderella Boy)
by: Saucy Dog
genre: J-pop
feel: Rock ballad
source: U-FRET chord chart
tempo: 73
key: A
form: Intro A A B C Interlude A A D Interlude 2 E F C Outro
[Intro]
A Bm7 | C♯m7 D | A Bm7 | C♯m7 D |
[A]
A Bm7 | C♯m7 D | A Bm7 | C♯m7 D |
E F♯m7 | Gmaj7 E |
[B]
F♯m7 E | D | F♯m7 E | D A |
[C]
D E | A | C♯7 F♯m7 | D E |
A | D E |
[Interlude]
A Bm7 | C G | A Bm7 | C G |
[D]
F♯m7 E | D | F♯m7 E | G |
[Interlude 2]
A7 | A Bm7 | C G |
[E]
A Bm7 | C♯m7 D | A Bm7 | C/D G |
A Bm7 | C♯m7 D | A Bm7 | C/D E |
[F]
D E | A | C♯7 F♯m7 | D E |
A | D E | A |
[Outro]
A Bm7 | C♯m7 D | A Bm7 | C♯m7 D |
A Bm7 | C♯m7 D | A Bm7 | C♯m7 D |
A |`,

`title: Mela!
by: 緑黄色社会 (Ryokuoushoku Shakai)
genre: J-pop
feel: Bright pop
source: U-FRET chord chart
tempo: 160
key: A♭
form: A Interlude B C D Interlude E F Interlude 2 G Interlude 3 H Outro
[A]
D♭ | D♭m | Cm E° | Fm E+ |
A♭/E♭ Dm7♭5 | B♭m D♭ | D♭/E♭ A♭ |
[Interlude]
B♭m E♭ | A♭ | B♭m E♭ | A♭ Fm |
[B]
B♭m E♭ | Fm | B♭m | E♭ Fm |
C7 |
[C]
B♭m E♭ | A♭ C7 | B♭m Cm | D♭ D♭/E♭ |
[D]
Dm7♭5 D♭ | D♭m | Cm Fm | D♭ D♭m |
Gm7♭5 C7 | Fm | A♭ D♭ | D♭m Cm |
E° Fm | B♭m D♭m | A♭ |
[E]
B♭m B♭° | A♭ Cm | B♭m C7 | A♭ C7 |
[F]
B♭m E♭ | A♭ C7 | B♭m Cm | D♭ E♭ |
D♭ E° | Fm |
[Interlude 2]
D♭ E° | Fm | D♭ E° | Fm |
B♭m Cm | D♭m G♭ | G♭7 |
[G]
E Em | B♭m7♭5 E♭ | A♭m | D♭m G♭ |
B G♭m | B Em | A | D E♭m7♭5 |
Em E | A |
[Interlude 3]
E♭sus4 E♭ |
[H]
D♭ | D♭m | Cm Fm | D♭ D♭m |
Gm7♭5 C7 | Fm E+ | A♭/E♭ | Dm7♭5 |
D♭ D♭m | Gm7♭5 C7 | Fm | B♭m D♭m |
A♭ | B♭m D♭m | A♭ |
[Outro]
B♭m E♭ | A♭ | B♭m E♭ | A♭ Fm |
B♭m E♭ | Gm7♭5 C7 | Fm | B♭m Cm |
D♭m E♭ | A♭ |`,

`title: 心予報 (Kokoro Yohō)
by: Eve
genre: J-pop
feel: Pop rock
source: U-FRET chord chart
tempo: 140
key: E♭
form: Intro A B C D E A F G C H Interlude I J Outro
[Intro]
Fm7 B♭ | E♭maj7 Cm7 | Fm7 G | B♭m7 E♭ |
Fm7 B♭ | E♭maj7 Cm7 | Fm7 G | B♭m7 E♭ |
[A]
Fm7 B♭ | E♭maj7 Cm7 | Fm7 B♭ | E♭maj7 Cm7 |
[B]
Fm7 | B♭ | E♭maj7 | Cm7 |
Fm7 | B♭ | E♭maj7 Cm7 |
[C]
D♭ G♭ | Bmaj7 Emaj7 | B♭ |
[D]
Fm7 B♭ | E♭maj7 Cm7 | Fm7 G | B♭m7 E♭ |
[E]
A♭ Gm7 | Fm7 Cm7 | A♭ Am7♭5 | Fm7 Gm7 |
A♭ B♭ | A♭ Gm7 | Fm7 B♭ |
[F]
Fm7 | B♭ | E♭maj7 | Cm7 |
[G]
Fm7 | B♭ | E♭maj7 Cm7 |
[H]
A♭ Gm7 | Fm7 Cm7 | A♭ Am7♭5 |
[Interlude]
Fm7 Gm7 | A♭ B♭ | A♭ B♭ | B |
[I]
G♭m7 B | Emaj7 D♭m7 | G♭m7 A♭ | Bm7 E |
[J]
A A♭m7 | G♭m7 D♭m7 | A B♭m7♭5 | G♭m7 A♭m7 |
A B | A A♭m7 | G♭m7 |
[Outro]
G♭m7 B | Emaj7 D♭m7 | G♭m7 A♭ | Bm7 E |`,

`title: ドラマツルギー (Dramaturgy)
by: Eve
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 150
key: E♭m
form: Intro A B A B C D E F A G H G C I J K L L M N I J Z Z 2
[Intro]
A♭m D° | E♭m A♭m | D° E♭m | A♭m D° |
E♭m A♭m | D° E♭m | A♭m D° | E♭m A♭m |
D° E♭m | A♭m D° | E♭m A♭m | D° E♭m |
[A]
Bmaj7 | Bmaj7 | E♭7sus4 | E♭7sus4 |
[B]
A♭m7 B♭7 | E♭7sus4 E♭m7 |
[C]
Emaj7 E♭m7 | Dmaj7 D♭m7 | A♭m7 B♭m7 | E♭sus4 E♭ |
[D]
A♭m | D♭ | E♭m | G♭ A♭m |
[E]
B♭ E♭m | E♭ |
[F]
A♭m | D♭ | E♭m | G♭ A♭m |
B♭ E♭m | E♭ | Bmaj7 B♭7 | A♭m D° |
E♭m A♭m | D° E♭m |
[G]
A♭m7 B♭7 | E♭m7 |
[H]
Bmaj7 | Bmaj7 | E♭7sus4 |
[I]
A♭m | D♭ | E♭m | G♭ |
[J]
A♭m B♭ | E♭m E♭ |
[K]
A♭m | D♭ | E♭m | G♭ |
A♭m B♭ | E♭m E♭ | B B♭ |
[L]
A♭m D° | E♭m | A♭m D° | E♭m |
A♭m D° | E♭m | A♭m D° |
[M]
A♭m D° | E♭m | A♭m D° | E♭m |
A♭m D° | E♭m | A♭m D° | E♭m |
[N]
A♭m B♭m | E♭sus4 E♭ |
[Z]
A♭m | D♭ | E♭m | G♭ A♭m |
B♭ E♭m | E♭ |
[Z 2]
Bmaj7 B♭7 |`,

`title: 前前前世 (Zenzenzense)
by: RADWIMPS
genre: J-pop
feel: Fast rock
source: U-FRET chord chart
tempo: 190
key: B
form: Intro A B C D E Interlude F C D E G Interlude 2 D E Outro
[Intro]
B E | B E | B E | B E |
G♯m7 E | F♯ | G♯m7 E | F♯ |
G♯m7 E | F♯ | E |
[A]
B E | G♯m7 F♯ | E | B E |
G♯m7 F♯ | E |
[B]
G♯m7 F♯ | E |
[C]
G♯m7 E | B F♯ | G♯m7 E | B F♯ |
B/D♯ E | F♯ G♯m7 | C♯/F E | F♯ |
[D]
G♯m7 E | B F♯ | G♯m7 E | F♯ |
[E]
B G♯m7 | E B | F♯ | G♯m7 E |
B | G♯m7 F♯/A♯ | B |
[Interlude]
G♯m7 E | F♯ | G♯m7 E | F♯ |
G♯m7 E | F♯ | E B/D♯ | E B/D♯ |
E F♯ |
[F]
B E | G♯m7 F♯ | E | B E |
G♯m7 F♯ | E | G♯m7 F♯ | E |
[G]
G♯m7 F♯/A♯ | B | B/D♯ E | B/D♯ E |
G♯m7 F♯ | E | G♯m7 F♯/A♯ |
[Interlude 2]
E |
[Outro]
G♯m7 E | F♯ | G♯m7 E | F♯ |
G♯m7 E | F♯ | E B/D♯ | F♯ |
E F♯/A♯ | B |`,

`title: スパークル (Supākuru)
by: RADWIMPS
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 74
key: B
form: Intro A B C D E B A F D G H I J K
[Intro]
B | B E | F♯ | B E |
F♯ |
[A]
B E | F♯ G♯m7 | F♯ | B E |
F♯ B |
[B]
B E | F♯ G♯m7 | F♯ | B E |
F♯ | B E | F♯ | B E |
F♯ |
[C]
B E | F♯ G♯m7 | F♯ | B E |
F♯ B | B E | F♯ G♯m7 | F♯ |
B E | F♯ |
[D]
F♯ G♯m | E F♯ | F♯ G♯m | E D♯ |
G♯m E | B F♯ | G♯m E | B F♯ |
A F♯ |
[E]
B E | F♯ D♯ | G♯m F♯ | E B |
C♯ C♯m7 | F♯ | B E | F♯ D♯ |
G♯m F♯ | C♯m7 B | E | F♯ B |
B |
[F]
B E | F♯ G♯m7 | F♯ | B E |
F♯ |
[G]
B E | F♯ D♯ | G♯m F♯ | C♯m7 B |
E F♯ | B |
[H]
F♯ G♯m7 | E B |
[I]
F♯ G♯m7 | E | F♯ | B |
F♯ |
[J]
B E | F♯ D♯ | G♯m F♯ | E B |
C♯ C♯m7 | F♯ | B E | F♯ D♯ |
G♯m F♯ | C♯m7 B | E |
[K]
F♯ | B E | F♯ D♯ | G♯m F♯ |
E B | C♯ F♯ | B E | F♯ D♯ |
G♯m F♯ | C♯m7 B | E | F♯ |
B E | F♯ |`,

`title: なんでもないや (Nandemonaiya)
by: RADWIMPS
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 76
key: F♯
form: Interlude Interlude A B A B Interlude 2 C C C D Interlude 3 Outro
[Interlude]
B C♯ | D♯m F♯ | B C♯ | D♯m F♯ |
B C♯ | D♯m F♯ | B C♯ | D♯m F♯ |
[A]
F♯/A♯ B | C♯ D♯m | F♯/A♯ B | F♯ |
[B]
F♯/A♯ B | C♯ D♯m | G♯m7 A♯m7 | B F♯ |
[Interlude 2]
F♯ |
[C]
B C♯ | D♯m | B C♯ | F♯ E |
Cm7♭5 |
[D]
B C♯ | D♯m | B C♯ |
[Interlude 3]
B C♯ | D♯m C♯/F | F♯ A♯m | B |
B C♯ | D♯m C♯/F | F♯ A♯m | B |
[Outro]
C♯ D♯m | F♯ | B C♯ | D♯m F♯ |
B C♯ | D♯m F♯ |`,

`title: すずめ (Suzume)
by: RADWIMPS feat. 十明
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: Dm
form: Intro Interlude A B C D Interlude 2 E F Interlude 3 C G
[Intro]
Dm |
[Interlude]
Dm C | B♭ Am | Dm C | Gm Am |
[A]
Dm C | B♭ Am | Dm C | Gm Am |
Dm | Dm C | B♭ Am | Dm C |
Gm Am | Dm |
[B]
Bm7♭5 B♭maj7 | Am Asus4 | A |
[C]
Dm B♭ | F C | Dm B♭ | F C |
Gm Dm | B♭ Asus4 | A |
[D]
Dm B♭ | F C | Dm B♭ | F C |
Gm Dm | B♭ Dm | Gm Am | Bm7♭5 C |
Dm7 |
[Interlude 2]
C B♭maj7 | Dm7 C | B♭maj7 |
[E]
Dm C | B♭ F | Am Dm | B♭ C |
Dm Am | Gm F | Gm Dm | Gm Am |
Dm |
[F]
Dm C | Gm F | Gm Dm | Gm Am |
Dm |
[Interlude 3]
Dm |
[G]
Dm B♭ | F C | Dm B♭ | F C |
Gm Dm | B♭ Dm | Gm Am | Bm7♭5 C |
Dm |`,

`title: 恋 (Koi)
by: 星野源 (Gen Hoshino)
genre: J-pop
feel: Pop
source: U-FRET chord chart
tempo: 170
key: A
form: Intro Interlude A B C D Interlude 2 E C D Interlude 3 F G H Interlude 3 Outro
[Intro]
D G | F♯m A | D G | F♯m A |
D G | F♯m A |
[Interlude]
Bm7 C♯m7 | D E |
[A]
A C♯7 | F♯m B♭m7♭5 | D C♯m7 | Bm7 E |
A C♯7 | F♯m7 B♭m7♭5 | D C♯m7 | E A |
D7 |
[B]
A C♯7 | F♯m B♭m7♭5 | D C♯m7 | Bm7 E |
A C♯7 | F♯m B♭m7♭5 | D C♯m7 | E A |
E7 |
[C]
D A/C♯ | F° F♯m | D A/C♯ | F° F♯m |
D A/C♯ | E F° | F♯m | Bm7 C♯m7 |
D E |
[D]
A C♯m7 | F♯m A/C♯ | D C♯m7 | Bm7 E |
A C♯m7 | F♯m A | Bm7 E | A C♯m7 |
F♯m A/C♯ | D C♯m7 | Bm7 E | A C♯m7 |
F♯m A | Bm7 C♯m7 | Bm7 E | A Bm7 |
Cm7 C♯m7 |
[Interlude 2]
D G | F♯m A | D G | F♯m A |
D G | F♯m A | Bm7 C♯m7 | D E |
[E]
A C♯m7 | F♯m A | D C♯m7 | Bm7 E |
A C♯7 | F♯m A | D C♯m7 | E A |
E7 |
[Interlude 3]
A C° | D C♯m7 | C° Bm7 | A |
A C° | D C♯m7 | C° Bm7 | A |
A C° | D C♯m7 | C° Bm7 | A |
A C° | D C♯m7 | C° Bm7 | A |
[F]
F♯m Em7 | A7 D | C♯7 F♯m | B7 |
E |
[G]
A C♯m7 | F♯m A/C♯ | D C♯m7 | Bm7 E |
A C♯m7 | F♯m A | Bm7 E | A C♯m7 |
F♯m A/C♯ | D C♯m7 | Bm7 E | A C♯m7 |
F♯m A | Bm7 C♯m7 | Bm7 E | A F♯m |
[H]
Bm7 E | A F♯m | Bm7 E |
[Outro]
A C° | D C♯m7 | C° Bm7 | A |
A C° | D C♯m7 | C° Bm7 | A |
A C° | D C♯m7 | C° Bm7 | A |
A C° | D C♯m7 | C° Bm7 | A |`,

`title: SUN
by: 星野源 (Gen Hoshino)
genre: J-pop
feel: Funk pop
source: U-FRET chord chart
tempo: 120
key: A♭
form: Interlude Interlude 2 Interlude Interlude 2 B C D E Interlude 3 Interlude 3 Interlude 2 B C F G H I J Interlude 4 Interlude 5 Interlude 4 Outro
[Interlude]
D♭maj7 Cm7 | B♭m7 D♭/E♭ | D♭maj7 Cm7 | B♭m7 D♭/E♭ |
[Interlude 2]
D♭maj7 Cm7 | B♭m7 D♭/E♭ | G♭7♭5 |
[B]
A♭ Gm7♭5 | C7 Fm7 | E♭m7 A♭7 | Cm7 Fm7 |
B♭m7 E♭ | A♭ Gm7♭5 | C7 Fm7 | E♭m7 A♭7 |
Cm7 Fm7 | B♭m7 E♭ |
[C]
D♭maj7 Cm7 | B♭m7 A♭maj7 | A♭7 D♭maj7 | Cm7 B♭m7 |
E♭sus4 E♭ |
[D]
A♭maj7 D♭maj7 | E♭ E° | Fm7 B♭m7 | Cm7 B♭m7 |
E♭ | A♭maj7 D♭maj7 | E♭ Fm7 | B♭m7 Cm7 |
B♭m7 Cm7 | D♭maj7 Cm7 | B♭m7 E♭ | Fm7 |
[E]
Fm7 B♭7 | D♭/E♭ A♭ | G♭ | Fm7 B♭7 |
D♭/E♭ A♭ | G♭ | Fm7 B♭7 | D♭/E♭ A♭ |
G♭ | Fm7 B♭7 | D♭/E♭ A♭ |
[Interlude 3]
D♭maj7 Cm7 | B♭m7 D♭/E♭ |
[F]
A♭maj7 D♭maj7 | E♭ E° | Fm7 B♭m7 | Cm7 B♭m7 |
E♭ | A♭maj7 D♭maj7 | E♭ Fm7 | B♭m7 Cm7 |
B♭m7 Cm7 | D♭maj7 Cm7 | B♭m7 E♭ |
[G]
B♭m7 G° | Fm7 E♭m7 | A♭7 D♭maj7 | B♭m7 Cm7 |
D♭maj7 Fm7 | Em7 E♭m7 | A♭7 | B♭m7 G° |
Fm7 E♭m7 | A♭7 D♭maj7 | B♭m7 Cmaj7 | D♭maj7 E♭sus4 |
Esus4 |
[H]
Amaj7 Dmaj7 | E F° | G♭m7 Bm7 | D♭m7 Bm7 |
E | Amaj7 Dmaj7 | E G♭m7 | Bm7 D♭m7 |
Dmaj7 D♭m7 | E |
[I]
Amaj7 Dmaj7 | E F° | G♭m7 Bm7 | D♭m7 Bm7 |
E | Amaj7 Dmaj7 | E G♭m7 | Bm7 D♭m7 |
Bm7 D♭m7 | Dmaj7 D♭m7 | Bm7 E | G♭m7 |
[J]
G♭m7 B7 | D/E A | G | G♭m7 B7 |
D/E A | G | G♭m7 B7 | D/E A |
G | G♭m7 B7 | D/E A |
[Interlude 4]
Dmaj7 D♭m7 | Bm7 D/E | Dmaj7 D♭m7 | Bm7 D/E |
[Interlude 5]
Dmaj7 D♭m7 | Bm7 D/E | G7♭5 |
[Outro]
Dmaj7 D♭m7 | Bm7 D/E | G7♭5 |`,

`title: アイデア (Idea)
by: 星野源 (Gen Hoshino)
genre: J-pop
feel: Pop
source: U-FRET chord chart
tempo: 140
key: F
form: Intro A B C D E Interlude A B C F Interlude 2 Interlude 2 G D H E Interlude Outro
[Intro]
B♭ Am7 | C D♭° | Dm E♭ | B♭ Am7 |
Dm C | B♭ Dm | Gm F |
[A]
F B♭ | D♭° Dm | B♭ Am7 | B♭ C |
[B]
F B♭ | D♭° Dm | B♭ Am7 | B♭ C |
F |
[C]
B♭ Am7 | Gm7 C | D♭° Dm | Cm7 F |
Gm7 Am7 | B♭ C |
[D]
F C/E | Cm7 F | Dm Cm7 | F |
B♭ Am7 | Gm7 Am7 | B♭ C | D♭° |
Dm Cm7 | F B♭ | Am7 | Gm7 Am7 |
B♭ C | F |
[E]
B♭ Am7 | C D♭° | Dm | Gm7 Am7 |
B♭ C |
[Interlude]
B♭ Am7 | C D♭° | Dm E♭ | B♭ Am7 |
Dm C | B♭ A | Dm B♭ | C F |
[F]
F C/E | Cm7 F | Dm Cm7 | F |
B♭ Am7 | Gm7 Am7 | B♭ C | D♭° |
Dm Cm7 | F B♭ | Am7 | Gm7 Am7 |
B♭ C |
[Interlude 2]
B♭ Am7 | Gm7 | B♭ D♭° | Dm |
B♭ Am7 | Gm7 | B♭ D♭° | Dm F |
[G]
F C/E | Cm7 F | B♭ Am7 | Gm7 Am7 |
B♭ D♭° | F C/E | Cm7 F | B♭ Am7 |
D♭° Dm | Cm7 B♭ | Am7 Gm7 | B♭m7 |
[H]
C/E Cm7 | F | Dm Cm7 | F |
B♭ Am7 | Gm7 Am7 | B♭ C | D♭° |
Dm Cm7 | F B♭ | Am7 | Gm7 Am7 |
B♭ C | F |
[Outro]
B♭ Am7 | C D♭° | Dm E♭ | B♭ Am7 |
Dm C | B♭ Dm | B♭ C | F |
B♭ A | Dm B♭ | C F | E♭ |`,

`title: 不思議 (Fushigi)
by: 星野源 (Gen Hoshino)
genre: J-pop
feel: Soul ballad
source: U-FRET chord chart
tempo: 76
key: E♭
[A]
E♭add9 E♭7♭5 | A♭maj7 B♭ | E♭maj7 | G7 B° |
Cm7 B♭sus4 | A♭maj7 B♭/A♭ | Gm7 E♭7 | Fm7 B♭sus4 |
[B]
E♭maj7 E♭7♭5 | A♭maj7 B♭ | E♭maj7 | Dm7♭5 G7 |
Cm7 B♭sus4 | A♭maj7 B♭/A♭ | E♭ E♭7 | Fm7 |
[Interlude]
E♭/B♭ B° | Cm7 D♭maj7 | Cm7 B♭ | A♭maj7 B♭ |
Gm7 B° | E♭/B♭ G7 | Cm7 B♭sus4 | A♭maj7 B♭ |
[C]
E♭maj7 B+ | A♭maj7 B♭ | E♭maj7 G7 | B° |
Cm7 B♭ | A♭maj7 B♭/A♭ | Gm7 E♭7 | Fm7 B♭sus4 |
B♭ |
[D]
Fm7 Gm7 | Fm7 | Cm7 E♭maj7 | B♭m7 |
A♭m7 D♭ | Fm7 B° | B♭m7 Am7♭5 | A♭maj7 B♭ |
Am7♭5 | Fm7 Gm7 | Cm7 E♭maj7 | B♭m7 |
A♭m7 A♭ | B♭ |
[E]
E♭ A♭ | D° Gm7 | Cm7 B° | E♭/B♭ A♭ |
Gm7 | F/E♭ Dm7 | F/A Gm7 | D G♭° |
E♭7 Gm7 | Am7♭5 E♭/B♭ | A♭maj7 D7 | B♭maj7 |
E♭maj7 B♭ | A♭ E♭/B♭ | B° |
[Interlude 2]
Cm7 D♭maj7 | Cm7 B♭ | A♭maj7 B♭ | Gm7 B° |
E♭/B♭ G7 | Cm7 B♭sus4 | A♭maj7 B♭ |
[F]
E♭maj7 B+ | A♭maj7 B♭ | E♭maj7 G7 | B° |
Cm7 B♭ | A♭maj7 B♭/A♭ | Gm7 Cm7 | E♭7 Fm7 |
[G]
Fm7 Gm7 | Fm7 | Cm7 E♭maj7 | B♭m7 |
A♭m7 D♭ | Fm7 B° | B♭m7 Am7♭5 | A♭ B♭ |
Am7♭5 | Fm7 Gm7 | Cm7 E♭maj7 | B♭m7 |
A♭m7 A♭ | B♭ |
[H]
E♭ A♭ | D° Gm7 | Cm7 B° | E♭/B♭ A♭ |
Gm7 | F/E♭ Dm7 | F/A Gm7 | D G♭° |
E♭7 Gm7 | Am7♭5 E♭/B♭ | A♭maj7 D7 | B♭maj7 |
[I]
B♭maj7 B♭7 | Gm7 Fm7 | Em7 | E♭maj7 F/E♭ |
[J]
E♭ A♭ | D° Gm7 | Cm7 B° | E♭/B♭ A♭ |
Gm7 | F/E♭ Dm7 | F/A Gm7 | D G♭° |
E♭7 Gm7 | Am7♭5 E♭/B♭ | A♭maj7 D7 | B♭maj7 A♭m7 |
[K]
E♭ A♭ | D° Gm7 | Cm7 B° | E♭/B♭ A♭ |
Gm7 | F/E♭ Dm7 | F/A Gm7 | D G♭° |
E♭7 Gm7 | Am7♭5 E♭/B♭ | A♭maj7 D7 | B♭maj7 |
E♭maj7 B♭ | A♭ B♭maj7 |`,

`title: Habit
by: SEKAI NO OWARI
genre: J-pop
feel: Dance pop
source: U-FRET chord chart
tempo: 114
key: B♭m
form: Intro A B C D D E D D Interlude F G D H D D E D D Interlude 2 D D Outro
[Intro]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
[A]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
[B]
B♭m | A♭ G♭ | F | B♭m A♭ |
G♭ F |
[C]
B♭m F | B♭m F |
[D]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
[E]
B♭m F | B♭m F | B♭m D♭ | G♭ F |
B♭m D♭ | G♭ F |
[Interlude]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
[F]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
B♭m |
[G]
A♭ | G♭ F | B♭m A♭ | G♭ |
[H]
B♭m | F | B♭m | F |
[Interlude 2]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
B♭m D♭ | G♭ F | B♭m D♭ |
[Outro]
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |
B♭m A♭ | G♭ F | B♭m A♭ | G♭ F |`,

`title: RPG
by: SEKAI NO OWARI
genre: J-pop
feel: Pop
source: U-FRET chord chart
tempo: 144
key: E
form: A B C D E F G H I A J
[A]
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |
[B]
E B | C♯m A | E B | E G♯7 |
C♯m F♯ | A B | E |
[C]
E B | C♯m A | E B | E G♯ |
C♯m F♯ | A B | E |
[D]
A B | E B | C♯m | A E |
F♯m G♯m | A B | C D |
[E]
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |
E B | C♯m E | A F♯ | Bsus4 B |
E B | C♯m E | A F♯ | Bsus4 B |
G♯ C♯m | F♯ B | E A | Bsus4 E |
E A | Bsus4 E |
[F]
E B | C♯m A | E B | E G♯7 |
C♯m F♯ | A B | E | E B |
C♯m A | E B | E G♯ | C♯m F♯ |
A B | E |
[G]
A B | E C♯m | A E | F♯m G♯m |
A B | C D |
[H]
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |
A E | F♯m7 F♯6 | F♯7 B |
[I]
A B | E B | C♯m | A E |
F♯m G♯m | A B |
[J]
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |
A B | E A | B E | G♯7 |
C♯m C+ | E A♯m7♭5 | A B | E |`,

`title: Dragon Night
by: SEKAI NO OWARI
genre: J-pop
feel: EDM pop
source: U-FRET chord chart
tempo: 89
key: B♭
form: A B Interlude B C Interlude 2 B Interlude D C Interlude 3 C Outro
[A]
B♭ |
[B]
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ |
[Interlude]
B♭ |
[C]
B♭ F | Gm | F E♭ | B♭ E♭ |
F | B♭ F | Gm | F E♭ |
B♭ E♭ |
[Interlude 2]
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ F | Gm F | E♭ B♭ |
[D]
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ F | Gm F | E♭ B♭ | E♭ |
[Interlude 3]
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ F | Gm F | E♭ B♭ | B♭ F |
Gm F | E♭ B♭ | E♭ F | B♭ F |
Gm F | E♭ |
[Outro]
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ F | Gm F | E♭ B♭ | E♭ |
B♭ F | Gm F | E♭ B♭ | E♭ F |
B♭ F | Gm F | E♭ B♭ | E♭ B♭ |`,

`title: The Beginning
by: ONE OK ROCK
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 122
key: C
form: A B C D E F D G H I J K
[A]
Am F | C G | Am | F C |
G |
[B]
Am F | C G | Am F | C G |
Am F | C G | F G |
[C]
Am F | C | G | Am F |
C | G |
[D]
F | G | F Em |
[E]
Am | F | C G | Am F |
C G | E Am | F C | G |
Am F | C G | Am F | C G |
F G |
[F]
Am F | C | G | Am F |
C G |
[G]
Am F | C G | Am F | C G |
[H]
E Am | F | C G | E |
Am F | C | G | E |
F Em | Am | G | F Em |
Am | E |
[I]
Am F | C G | Am F | C |
G |
[J]
Am | F | C G | Am F |
C G |
[K]
F♯ F | G | C Am | G |
F G | Em | F |`,

`title: クリスマス・イブ (Christmas Eve)
by: 山下達郎 (Tatsuro Yamashita)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 122
key: A
form: Intro A B C D E A A F
[Intro]
Esus4 E | Esus4 E | Esus4 E | Dadd9 E |
A E | F♯m7 E | Dmaj7 C♯m7 | Bm7 Bm7/E |
E7 |
[A]
A E | F♯m7 E6 | Dmaj7 C♯m7 | Bm7 D/E |
E |
[B]
A E | F♯m7 E6 | Dmaj7 C♯m7 | Bm7 D/E |
D♯m7♭5 |
[C]
Dmaj7 E/D | Dmaj7 C♯m | F♯m7 | Bm7 D/E |
E D/E | Bm7/E E |
[D]
A E | F♯m7 E6 | Dmaj7 C♯m7 | Bm7 D/E |
A E | F♯m7 E6 | Dmaj7 C♯m7 | Bm7 D/E |
E7 | A E | F♯m C♯m | D A |
D E | A E | F♯m C♯m | D A |
D E |
[E]
Dmaj7 C♯m7 | Dmaj7 C♯m | F♯m7 | Bm7 D/E |
E D/E | Bm7/E E |
[F]
A E | F♯m7 E6 | Dmaj7 C♯m7 | Bm7 D/E |
E | A E | F♯m7 E | Dmaj7 C♯m7 |
Bm7 Esus4 | E | A E | F♯m7 E |
Dmaj7 C♯m7 | Bm7 Esus4 | E | A E |
F♯m7 E | Dmaj7 C♯m7 | Bm7 Esus4 | E |
A |`,

`title: SPARKLE
by: 山下達郎 (Tatsuro Yamashita)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 137
key: A
form: Intro A A Interlude B Interlude 2 C C C
[Intro]
Amaj7 E | Amaj7 E | Amaj7 E | Amaj7 E |
[A]
Amaj7 E | Amaj7 E | F♯/B♭ A° | E/G♯ Am6 |
E/B B♭m7♭5 | F♯m7 A/B |
[Interlude]
Amaj7 E | Amaj7 E | Amaj7 E | Amaj7 E |
Amaj7 E | Amaj7 E |
[B]
F♯/B♭ A° | E/G♯ Am6 | E/B B♭m7♭5 | F♯m7 A/B |
[Interlude 2]
F♯m7 |
[C]
E/B | F♯m7 | E/B | F♯m7 |`,

`title: RIDE ON TIME
by: 山下達郎 (Tatsuro Yamashita)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 124
key: D
[A]
Gmaj7 A | Gmaj7 A | Gmaj7 | F♯m7 D |
Bm Em7 | Asus4 | Gmaj7 A | Gmaj7 A |
Gmaj7 | F♯m7 D | Bm Em7 | Asus4 |
Gmaj7 F♯m7 | Dmaj7 | Bm7 Gmaj7 | D G♯m7 |
G D | Bm | B7 Gmaj7 | F♯m7 Dmaj7 |
Bm7 Gmaj7 | Asus4 D | D6 |
[B]
Bmaj7 A6 | Gmaj7 A6 | Gmaj7 | F♯m7 D |
Bm Em7 | Asus4 | Gmaj7 A6 | Gmaj7 A6 |
Gmaj7 | F♯m7 D | Bm Em7 | Asus4 |
Gmaj7 F♯m7 | Dmaj7 | Bm7 Gmaj7 | D G♯m7 |
Em D | Bsus4 | B7 Gmaj7 | F♯m7 Dmaj7 |
Bm7 Gmaj7 | Asus4 D6 | G♯m7 | G6 D |
Bsus4 B7 | Em7 Asus4 | Em7 Asus4 | Em7 Asus4 |
[C]
Em7 Asus4 | D Bm7 | Em7 Asus4 | Gmaj7 F♯m7 |
Dmaj7 | Bm7 Gmaj7 | D G♯m7 | Em D |
Bsus4 | B7 Gmaj7 | F♯m7 Dmaj7 | Bm7 Gmaj7 |
Asus4 D6 | Gmaj7 F♯m7 | Dmaj7 | Bm7 Gmaj7 |
D G♯m7 | Em D | Bsus4 | B7 Gmaj7 |
F♯m7 Dmaj7 | Bm7 Gmaj7 | Asus4 D6 | Gmaj7 Asus4 |
Dmaj7 Bm7 |`,

`title: 駅 (Eki)
by: 竹内まりや (Mariya Takeuchi)
genre: J-pop
feel: City pop ballad
source: U-FRET chord chart
tempo: 76
key: E
form: A B C B C Interlude C Outro
[A]
C♯m7 F♯m7 | G♯7 G♯m7/C♯ |
[B]
F♯m7 F♯m7/B | Emaj7 C♯7 | F♯m7 D♯m7♭5 | D♯7 G♯7 |
C♯m7 | F♯m7 F♯m7/B | Emaj7 C♯7 | F♯m7 D♯m7♭5 |
G♯7 B/C♯ | C♯m7 C♯7 |
[C]
B C♯7 | F♯m7 B7 | Emaj7 Amaj7 | D♯m7 G♯7 |
B/C♯ C♯m7 | C♯7 | B C♯7 | F♯m7 B7 |
Emaj7 Amaj7 | D♯m7♭5 G♯7 | B/C♯ C♯m7 |
[Interlude]
F♯m7 B7 | Emaj7 Amaj7 | D♯m7♭5 G♯7 | B/C♯ C♯m7 |
C♯7 |
[Outro]
C♯7 B | C♯7 F♯m7 | B7 Emaj7 | Amaj7 |
D♯m7♭5 G♯7 | B/C♯ C♯m7 | C♯7 B | C♯7 |`,

`title: 元気を出して (Genki wo Dashite)
by: 竹内まりや (Mariya Takeuchi)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: C
form: Intro A B C D E F G G H
[Intro]
C Fmaj7 | G Am | G | Fmaj7 G7sus4 |
C G |
[A]
C Fmaj7 | G C | G Am7 | D7 G |
C Fmaj7 | E Am7 | G | Fmaj7 Em7 |
Dm7 G | E♭maj7 Dm7 | F/G | G7 Cm7 |
F7 B♭maj7 | Bm7♭5 E7 | Am7 | D F/G |
G G7sus4 |
[B]
C Fmaj7 | G C | G Am7 | D7 G |
C Fmaj7 | E Am7 | G | F♯m7♭5 Am/G |
C B♭/C | C |
[C]
F G/F | Em7 Am7 | Dm7 G7 | C C7 |
C | Fm B♭ | E♭ Cm | Dm7 F/G |
G F/G | G |
[D]
C Fmaj7 | G C | G Am7 | D7 G |
C Fmaj7 | E Am7 | G | Fmaj7 G7sus4 |
C F/G | G | C Fmaj7 | G Am |
G | Fmaj7 G7sus4 | C G | C Fmaj7 |
G C | G | Am7 D7 | G |
C Fmaj7 | E Am7 | G | F♯m7♭5 F/G |
C C7 | C |
[E]
F G/F | Em7 Am7 | Dm7 G | C C7 |
C | Fm B♭ | E♭ Cm | Dm7 F/G |
G F/G | G A♭sus4 |
[F]
D♭ F♯maj7 | A♭ D♭ | A♭ | B♭m E♭7 |
A♭7sus4 A♭ | D♭ F♯maj7 | F B♭m | A♭ Gm7♭5 |
A♭ D♭ | A♭7sus4 A♭ |
[G]
D♭ F♯maj7 | A♭ D♭ | A♭ B♭m | E♭7 A♭7sus4 |
A♭ | D♭ F♯maj7 | F B♭m | A♭ |
Gm7♭5 A♭ | D♭ A♭7sus4 | A♭ |
[H]
D♭ F♯maj7 | A♭ D♭ | A♭ B♭m | E♭7 A♭7sus4 |
A♭ | D♭ F♯maj7 | F B♭m | A♭ |
Gm7♭5 A♭ | D♭ A♭7sus4 | A♭ | D♭ F♯maj7 |
A♭ D♭ | A♭ B♭m | E♭7 A♭7sus4 | A♭ |
D♭ F♯maj7 | F B♭m | A♭ Gm7♭5 | A♭ D♭ |
A♭7sus4 A♭ | D♭ F♯maj7 | A♭ D♭ |`,

`title: 都会 (Tokai)
by: 大貫妙子 (Taeko Ohnuki)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 110
key: B♭
form: A Interlude B C Interlude 2 D Interlude 3 Interlude 3 C Interlude 2 E E E E E
[A]
E♭maj7 E♭m7 | A♭m7 A♭m7/D♭ |
[Interlude]
E♭maj7 E♭m7 | A♭m7 G7 |
[B]
E♭maj7 D7 | Gm7 B♭m7 | E♭7 | A♭maj7 G7 |
Cm7 Bm7 | B♭7 | E♭maj7 D7 | Gm7 B♭m7 |
E♭7 | A♭maj7 G7 | Cm7 Bm7 | B♭7 |
[C]
D♭7 | C7 | Fm7 | B♭7 E♭maj7 |
B♭7 Gm7 | G♭m7 |
[Interlude 2]
Fm7 B7 | Gm7 G♭m7 | Fm7 B♭7 |
[D]
E♭maj7 D7 | Gm7 B♭m7 | E♭7 | A♭maj7 G7 |
Cm7 Bm7 | E♭maj7 D7 | Gm7 B♭m7 | E♭7 |
A♭maj7 G7 | Cm7 Bm7 | B♭7 |
[Interlude 3]
E♭maj7 D7 | Gm7 B♭m7 | E♭7 A♭maj7 | G7 Cm7 |
Bm7 B♭7 |
[E]
Fmaj7 E7 | Am7 Cm7 | F7 | B♭maj7 A7 |
Dm7 D♭m7 | C7 |`,

`title: 悲しみがとまらない (Kanashimi ga Tomaranai)
by: 杏里 (Anri)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 124
key: F♯m
form: A Interlude Interlude 2 B Interlude 3 C D E C D F Interlude 4 G
[A]
Asus4 A | G♯7sus4 G♯m7 | C♯7 |
[Interlude]
F♯7sus4 F♯m7 | D/E |
[Interlude 2]
F♯m Bm | F♯m Bm | Dmaj7 C♯m7 | Bm7 Dmaj7/E |
[B]
Bm7 E7 | C♯m7 F♯m7 | Bm7 C♯7 | F♯m |
Bm7 E7 | C♯m7 F♯m7 | Bm7 C♯7 | F♯m E7 |
[Interlude 3]
F♯m E7 |
[C]
A E7 | C♯m7♭5 F♯7 | Bm7 G | D/E E7 |
A E7 | F♯m7 E7 | D C♯m7 | Bm7 C♯7 |
[D]
F♯m F♯mmaj7 | F♯m7 B7 | D A | Bm7 D/E |
[E]
Bm7 E7 | C♯m7 F♯m7 | Bm7 C♯7 | F♯m Bm7/E |
[F]
Bm7 E7 | C♯m7 F♯m7 | Bm7 C♯7 | F♯m |
[Interlude 4]
Bm7 E7 | C♯m7 F♯m7 | Dmaj7 C♯m7 | Bm7 E7 |
F7 |
[G]
Cm7 F7 | Dm7 Gm7 | Cm7 D7 | Gm F7 |
Cm7 F7 | Dm7 Gm7 | Cm7 D7 | Gm |
Cm7 F7 | Dm7 Gm7 | Cm7 D7 | Gm |`,

`title: CAT'S EYE
by: 杏里 (Anri)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 128
key: Em
form: A B C A B C C C
[A]
Em D/E | Em B7 | Em D/E | B7 Em |
D/E Em |
[B]
Am G | F B7sus4 | B7 | Am G |
F B7 |
[C]
Em | D | Em B7 | Em |
D | Em B7 | Em | Em |`,

`title: Last Summer Whisper
by: 杏里 (Anri)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 106
key: E
form: Intro Interlude A B Interlude 2 A C Interlude 3 D E F Interlude 4 Interlude 4 Interlude 4 Outro
[Intro]
F♯m B7 | E C♯ |
[Interlude]
F♯m Am7 | D C♯7 | Gm |
[A]
F♯m B | E C♯ | F♯m B | E C♯ |
A Am | D C♯m | F♯m B | E C♯ |
A Am | D C♯m | F♯m B | E C♯ |
[B]
F♯m B | E C♯m | F♯m B | E Gm |
F♯m B | E C♯ | F♯m B | E |
[Interlude 2]
F♯m E | D Gm |
[C]
F♯m B | E C♯m | F♯m B | E Gm |
F♯m B | E C♯ | F♯m B | E Gm |
[Interlude 3]
F♯m B | E Gm | F♯m B | E E7♭5 |
[D]
A Am | D C♯m | F♯m B | E C♯ |
A Am | D C♯m | F♯m B | E C♯ |
[E]
F♯m B | E C♯m | F♯m B | E Gm |
F♯m B | E C♯ | F♯m B | E C♯ |
[F]
F♯m B | E |
[Interlude 4]
F♯m B | E C♯ |
[Outro]
F♯m B | E C♯ |`,

`title: ドラマティック・レイン (Dramatic Rain)
by: 稲垣潤一 (Junichi Inagaki)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 120
key: Am
form: A Interlude B B C Interlude 2 D E F Outro
[A]
Am Fmaj7 |
[Interlude]
Am Fmaj7 | Am |
[B]
Am Dm7 | E7 Am | Dm7 G7 | Cmaj7 A7 |
Dm7 Bm7♭5 | E7 |
[C]
Am E7 | C A7 | Dm7 | G7 Cmaj7 |
E7 | Am E7 | C A7 | Dm7 |
G7 Cmaj7 | E7 Dm7 | C6 B7 | E7 |
[Interlude 2]
Am Dm7 | E7 Am |
[D]
Dm7 G7 | Cmaj7 A7 | Dm7 Bm7♭5 | E7 |
[E]
Am E7 | C A7 | Dm7 | G7 Cmaj7 |
E7 | Am E7 | C A7 | Dm7 |
G7 Cmaj7 | E7 Dm7 | C6 | B7 E7 |
[F]
Am | Dm7 E7 | Am E7 |
[Outro]
Am Dm7 | E7 |`,

`title: やさしさに包まれたなら (Yasashisa ni Tsutsumareta nara)
by: 荒井由実 (Yumi Arai)
genre: J-pop
feel: Pop
source: U-FRET chord chart
tempo: 118
key: F♯
[A]
F♯ G♯m7 | F♯ G♯m7 | F♯ G♯ | Fm7 A♯m7 |
D♯m7 | B G♯m7 | G♯m7/C♯ | F♯ G♯ |
Fm7 A♯m7 | D♯m7 | B G♯m7 | G♯m7/C♯ A♯m7 |
A♯7 |
[B]
D♯m B | D♯m B | G♯m7 A♯m7 | D♯m |
B G♯m7 | G♯m7/C♯ C♯sus4 | C♯7 | F♯ G♯m7 |
F♯ G♯m7 |
[C]
F♯ G♯ | Fm7 A♯m7 | D♯m7 | B G♯m7 |
G♯m7/C♯ | F♯ G♯ | Fm7 A♯m7 | D♯m7 |
B G♯m7 | G♯m7/C♯ A♯m7 | A♯7 |
[D]
D♯m B | D♯m B | G♯m7 A♯m7 | D♯m |
B G♯m7 | G♯m7/C♯ C♯sus4 |
[E]
D♯m B | D♯m B | G♯m7 A♯m7 | D♯m |
B G♯m7 | G♯m7/C♯ C♯sus4 | F♯ G♯m7 | F♯ G♯m7 |
F♯ |`,

`title: ルージュの伝言 (Rouge no Dengon)
by: 荒井由実 (Yumi Arai)
genre: J-pop
feel: Oldies pop
source: U-FRET chord chart
tempo: 148
key: E♭
form: A B C B D
[A]
E♭ Cm | E♭ Cm | E♭ Cm | E♭ Cm |
A♭ B♭ | E♭ E♭/D | Cm | A♭ B♭ |
E♭ B♭ |
[B]
E♭ Cm | E♭ Cm | A♭ B♭ | E♭ E♭/D |
Cm | A♭ B♭ | E♭ |
[C]
E♭ Cm | A♭ B♭ | E♭ Cm | A♭ B♭ |
E♭ | E♭ Cm | A♭ B♭7 |
[D]
E♭ Cm | A♭ B♭ | E♭ Cm | A♭ B♭ |
E♭ B♭ | Cm | A♭ B♭ | E♭ Cm |
E♭ Cm | E♭ Cm |`,

`title: 春よ、来い (Haru yo, Koi)
by: 松任谷由実 (Yumi Matsutoya)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: B♭m
form: A B C A Interlude B C A D A A A A
[A]
G♭6 A♭ | B♭m | G♭6 A♭ | B♭m |
G♭6 A♭ | B♭m | G♭6 A♭ | B♭m |
[B]
B♭m G♭6 | A♭ D♭maj7 | G♭ A♭ | D♭ A♭ |
Fsus4 F | B♭m G♭6 | A♭ D♭maj7 | A♭ |
B♭m Fm7 | G♭ A♭ | B♭m |
[C]
G♭maj7 A♭/G♭ | G♭maj7 D♭/F | E♭m6 E♭m7/A♭ | D♭maj7 D♭7 |
[Interlude]
G♭6 A♭ | B♭m | G♭6 A♭ | B♭m |
[D]
G♭6 A♭ | B♭m | G♭6 A♭ | B♭m |
G♭6 A♭ | B♭m | G♭6 A♭ | B♭m |
G♭6 A♭ | B♭m | G♭6 A♭ | B♭m |`,

`title: 中央フリーウェイ (Chūō Freeway)
by: 荒井由実 (Yumi Arai)
genre: J-pop
feel: City pop
source: U-FRET chord chart
tempo: 125
key: A♭
[A]
B♭/C Fmaj7 | G♭° D7 | Gm7 E° | C7 Fm |
B♭m7 E♭7 | A♭ Gm7♭5 | B♭/C | Fmaj7 |
G♭° D7 | Gm7 E° | C7 Fm | B♭m7 E♭7 |
A♭ | B♭m7 B♭m/E♭ | A♭ Cm7 |
[B]
D♭maj7 A♭maj7 | D♭maj7 B♭m7 | E♭7 | B♭/C Fmaj7 |
G♭° D7 | Gm7 E° | C7 Fm7 | B♭m7 D♭/E♭ |
A♭ | B♭m7 B♭m/E♭ | A♭ | D♭maj7 A♭maj7 |
A♭ D♭maj7 | A♭ E♭ |
[C]
Fsus4 Fmaj7 | G♭° D7 | Gm7 E° | C7 Fm |
B♭m7 E♭7 | A♭ | B♭m7 A♭sus4 | A♭ Cm7 |
[D]
D♭maj7 A♭maj7 | D♭maj7 B♭m7 | E♭7 | Fsus4 Fmaj7 |
G♭° D7 | Gm7 E° | C7 Fm7 | B♭m7 A♭sus4 |
A♭ | B♭m7 A♭sus4 | A♭ |
[E]
B♭m7 A♭sus4 | A♭ B♭m7 | A♭sus4 G♭sus4 |`,

`title: ひこうき雲 (Hikōki Gumo)
by: 荒井由実 (Yumi Arai)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 75
key: E♭
form: A B C D E C F
[A]
E♭ A♭ | Gm7 A♭maj7 | A♭ | E♭ E♭/D |
Gm7 A♭ | A♭/G Fm | B♭ B♭/A♭ | Gm7 A♭maj7 |
B♭7 |
[B]
E♭ E♭/D | Gm7 | A♭ A♭/G | Fm |
B♭ B♭/A♭ | Gm7 A♭maj7 | B♭7 |
[C]
E♭ Gm7 | Cm7 | Gm7 B♭m7 | A♭maj7 |
Gm7 A♭maj7 | B♭7 B♭7sus4 | B♭7 |
[D]
E♭ E♭/D | Gm7 A♭ | A♭maj7 Fm7 | B♭ B♭/A♭ |
Gm7 A♭maj7 | B♭7 |
[E]
E♭ E♭/D | Gm7 | A♭ A♭/G | Fm7 B♭ |
B♭/A♭ Gm7 | A♭maj7 B♭7 |
[F]
E♭ Gm7 | Cm7 | Gm7 B♭m7 | A♭maj7 |
Gm7 A♭maj7 | B♭7 | A♭maj7 B♭m7 |`,

`title: 糸 (Ito)
by: 中島みゆき (Miyuki Nakajima)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 78
key: Gm
form: Intro A B C Interlude A B C Interlude 2 C Outro
[Intro]
Gm7 Dm7 | E♭maj7 | Gm7 Dm7 | E♭maj7 |
Gm7 Dm7 | E♭maj7 | Gm7 Dm7 | E♭maj7 |
B♭ E♭ | B♭ E♭ |
[A]
B♭ E♭maj7 | B♭ | F/A Gm | Dm7 Cm |
Cm7/F F | B♭ E♭maj7 | B♭ | F/A Gm |
Dm7 Cm | F |
[B]
G♭° Gm | Dm E♭ | B♭ | F/A Gm |
Dm Cm | Cm7/F F |
[C]
B♭ F/A | Gm Gm7/F | E♭ Dm | Cm F |
G♭° Gm | Gmmaj7 Gm7 | Em7♭5 | Cm7 F |
B♭ |
[Interlude]
E♭ B♭ | E♭ |
[Interlude 2]
F7sus4 F7 |
[Outro]
F/A Gm | Gm7/F E♭ | Dm Csus4 | C |
B♭ F/A | Gm Gm7/F | E♭ Dm | Csus4 C |
B♭ F/A | Gm Gm7/F | E♭ Dm | Csus4 C |
B♭ F/A | Gm Gm7/F | E♭ Dm | Csus4 C |
B♭ F/A | Gm Gm7/F | E♭ Dm | Csus4 C |
B♭ F/A | Gm Gm7/F | E♭ Dm | Csus4 C |
B♭ F/A | Gm Gm7/F | E♭ Dm | Csus4 C |`,

`title: 時代 (Jidai)
by: 中島みゆき (Miyuki Nakajima)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 72
key: B
form: A Interlude Interlude B C D Interlude 2 B E D F Interlude Interlude B E D F Interlude 3 G
[A]
B F♯ | G♯m E | C♯m F♯sus4 | F♯7 |
B F♯ | G♯m E | E/F♯ B |
[Interlude]
B Bmaj7 | C♯m/B E |
[B]
B F♯ | G♯m B | E C♯m | F♯sus4 F♯ |
B F♯ | G♯m B | E E/F♯ | B |
[C]
G B | G♯m G | Em Em/F♯ | F♯7 E/F♯ |
F♯7 |
[D]
B F♯ | G♯m B | E E/F♯ | B |
[Interlude 2]
Bmaj7 C♯m/B | E |
[E]
G Em | B G♯m | G Em | Em/F♯ F♯7 |
E/F♯ F♯7 |
[F]
E D♯m | C♯m B | E D♯m | F♯ B |
E D♯m | C♯m B | E D♯m | F♯ G♯m |
[Interlude 3]
G Em |
[G]
F Em | Dm C | F Em | G C |
F Em | Dm C | F Em | G C |`,

`title: 真夏の果実 (Manatsu no Kajitsu)
by: サザンオールスターズ (Southern All Stars)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 74
key: D
form: A B C D E B C F G H
[A]
D A | Bm7 F♯m7 | Gadd9 D | Em7 A7 |
[B]
D A | Bm7 F♯m7 | Gadd9 D | Em7 A7 |
D A | Bm7 F♯m7 | Gadd9 D | Em7 A7 |
D D/E | D |
[C]
G A7 | F♯m7 B7 | Em Emmaj7 | Em7 Gmmaj7/A |
A7 |
[D]
D Dmaj7 | Bm7 D7 | Gmaj7 F♯7 | Bm7 |
Em7 Gm | A7 |
[E]
D Dmaj7 | Bm7 D7 | Gmaj7 F♯7 | Bm7 |
Em7 Gm6 | A7 D | A Bm7 | F♯m7 Gadd9 |
D Em7 | A7 |
[F]
D Dmaj7 | Bm7 D7 | Gmaj7 F♯7 | Bm7 |
Em7 Gm6 | A7 |
[G]
D Dmaj7 | Bm7 D7 | Gmaj7 F♯7 | Bm7 |
Em7 Gm6 | A7 Bm7 | A7 |
[H]
D Dmaj7 | Bm7 D7 | Gmaj7 F♯7 | Bm7 |
Em7 Gm6 | A7 D | A Bm7 | F♯m7 Gadd9 |
Gm D |`,

`title: いとしのエリー (Itoshi no Ellie)
by: サザンオールスターズ (Southern All Stars)
genre: J-pop
feel: Soul ballad
source: U-FRET chord chart
tempo: 70
key: D
form: A B C D C E F
[A]
D E9 | G | D Em7/A | A7 |
[B]
D F♯m | D7 G | Em A7 | D E9 |
G A7 | D |
[C]
D F♯m | D7 G | Em A7 | D E9 |
G A7 | D B7 |
[D]
Em9 A7 | F♯m7 Bm | Em9 A7 | F♯m7 Bm |
G A | A7 F♯m7 | B7 | Gmaj7 A7 |
D E9 | Gmaj7 A7 | D | D E9 |
G D | Em7 | D E9 | G D |
Em7/A |
[E]
Em9 A7 | F♯m7 Bm | Em9 A7 | F♯m7 Bm |
G A | A7 F♯m7 | B7 | Gmaj7 A7 |
D E9 | Gmaj7 A7 | D B7 |
[F]
Em9 A7 | F♯m7 Bm | Em9 A7 | F♯m7 Bm |
G A | A7 F♯m7 | B7 | Gmaj7 A7 |
D E9 | Gmaj7 A7 | D E9 | Gmaj7 A7 |
D | E9 G | D Em7 | Em7/A |`,

`title: TSUNAMI
by: サザンオールスターズ (Southern All Stars)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: D
form: A B C D E F D G D H I J
[A]
D A | Bm7 | D G | A F♯m |
F♯m7 Bm7 | G A | F♯m F♯m7 | Bm7 Em7 |
G A | G G/A |
[B]
D A | Bm7 | D G | A F♯m |
F♯m7 Bm7 | G A | F♯m F♯m7 | Bm7 Em7 |
A7 D |
[C]
Gm7 C7 | Fmaj7 Dm | Gm7 A7 | D Dsus4 |
D | A Bm7 | G D | E E7 |
A7 |
[D]
Dsus4 D | F♯ F♯7 | Bm7 D7 | G A |
F♯7 Bm7 | E7 A7 |
[E]
Dsus4 D | F♯ F♯7 | Bm7 D7 | G A |
F♯7 Bm7 | Gmaj7 F♯m7 | Em7 Em7/A | D A |
Bm7 D | G D | A G | G/A |
[F]
D A | Bm7 | D G | A F♯m |
F♯m7 Bm7 | G A | F♯m F♯m7 | Bm7 Em7 |
A7 D | Dsus4 D | Gm7 C7 | Fmaj7 Dm |
Gm7 A7 | D Dsus4 | D | A Bm7 |
G D | E E7 | A7 |
[G]
Dsus4 D | F♯ F♯7 | Bm7 D7 | G A |
F♯7 Bm7 | Gmaj7 F♯m7 | Em7 Em7/A | D |
F G | D F | G D | A |
Bm7 G | Bm7 E7 | A |
[H]
Dsus4 D | F♯ F♯7 | Bm7 D7 | G A |
F♯7 Bm7 | Gmaj7 F♯m7 | Em7 Em7/A | D |
[I]
Gmaj7 F♯m7 | Em7 Em7/A | D |
[J]
Gmaj7 F♯m7 | Em7 Em7/A | D A | Bm7 D |
G D | Em7 G/A | D |`,

`title: LA・LA・LA LOVE SONG
by: 久保田利伸 (Toshinobu Kubota)
genre: J-pop
feel: R&B
source: U-FRET chord chart
tempo: 98
key: G♯m
form: A B B C D E F G H I J
[A]
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯ G♯ |
Emaj7 F♯ | D♯m7 | G♯m Emaj7 | F♯ G♯ |
C♯m7 F♯ | G♯ C♯m7 | F♯ |
[B]
C♯m7 G♯m/F♯ | D♯m7 G♯m | Emaj7 Em6 | C♯m7 F♯ |
[C]
Gmaj7 A6 | Badd9 G♯m | Gmaj7 A6 | Badd9 G♯ |
[D]
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯m7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯m7 | G♯ |
C♯m7 F♯ | G♯ C♯m7 | F♯ |
[E]
C♯m7 D♯m7 | G♯m | Emaj7 Em6 | C♯m7 F♯ |
[F]
Gmaj7 A6 | Badd9 | G♯m Gmaj7 | A6 Badd9 |
G♯ |
[G]
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯7 G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯m7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯m7 | G♯ E |
[H]
C♯m7 D♯m7 | E G♯ |
[I]
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯m7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯7 | G♯ |
Emaj7 F♯ | D♯m7 G♯m | C♯m7 D♯m7 | G♯ |
[J]
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯7 G♯ |
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯m7 G♯ |
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯7 G♯ |
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯m7 G♯ |
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯7 G♯ |
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯m7 G♯ |
Emaj7 F♯ | D♯m7 | G♯m C♯m7 | D♯m7 G♯ |
Emaj7 F♯ |`,

`title: 愛をこめて花束を (Ai wo Komete Hanataba wo)
by: Superfly
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 72
key: G
form: A B C D B C E F G H I
[A]
G Dm7 | C Cm | Am7/D | G Dm7 |
C Cm | Am7/D | G D | Em7 Bm7 |
C Am7 | F Am7/D | D | G D |
Em7 Bm7 | C Cm | G Am7/D |
[B]
G D | Em7 Bm7 | C Am7 | F Am7/D |
D | G D | Em7 Bm7 | C Cm |
G |
[C]
Cmaj7 D/C | Bm7 B7 | Em7 E | Am7 Bm7 |
C Bm7 | Am7 A7 | Am7/D D |
[D]
G D | Em7 Bm7 | C | G Am7 |
Am7/D | G D | Em7 Dm7 | G7 |
C Cm | G Dm7 | C Cm | G Dm7 |
C Cm | Am7/D |
[E]
G D | Em7 Bm7 | C | G Am7 |
Am7/D | G D | Em7 Dm7 | G7 |
C Cm | G7 |
[F]
C7 | G7 | C7 | Am7/D E♭ |
F |
[G]
G D | Em7 Bm7 | C | G Am7 |
Am7/D | G D | Em7 | Dm7 G7 |
C Am7/D |
[H]
A E | F♯m7 C♯m7 | D | A Bm7 |
Bm7/E E7 | A D | E C♯7 | D E |
A B |
[I]
Bm7/E | A Em7 | D Dm | A Em7 |
D Dm | A Em7 | D Dm | A Em7 |
D Dm | A |`,

`title: 丸の内サディスティック (Marunouchi Sadistic)
by: 椎名林檎 (Ringo Sheena)
genre: J-pop
feel: Jazzy rock
source: U-FRET chord chart
tempo: 92
key: E♭
form: Intro A B C Interlude D B C Interlude 2 E C F Outro
[Intro]
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 E♭7 |
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 |
[A]
E♭ E♭7 | A♭maj7 G7 | Cm7 | E♭ E♭7 |
A♭maj7 G7 | Cm7 |
[B]
E♭6 E♭maj7 | A♭maj7 B♭ | E♭maj7 | Gm A♭maj7 |
B♭ E♭maj7 | G |
[C]
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 E♭7 |
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 E♭7 |
[Interlude]
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 E♭7 |
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 |
[D]
E♭7 A♭maj7 | G7 Cm7 | E♭ E♭7 | A♭maj7 G7 |
Cm7 |
[Interlude 2]
Cm7 Cm7/B♭ | Gm A♭maj7 | Cm7 Cm7/B♭ | Gm A♭maj7 |
[E]
Fm7 G | A♭maj7 B♭ | E♭maj7 | Gm A♭maj7 |
B♭ E♭maj7 | G7 |
[F]
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 E♭7 |
A♭maj7 G7 | Cm7 E♭7 | A♭maj7 G7 | Cm7 |
E♭7 A♭maj7 | G7 Cm7 | E♭7 |
[Outro]
A♭maj7 G7 | Cm7 E♭7 |`,

`title: 本能 (Honnō)
by: 椎名林檎 (Ringo Sheena)
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 135
key: Dm
form: A B C D B E F G
[A]
Dm Gm7 | B♭maj7 C | D♭° | Dm Gm7 |
B♭maj7 C | D♭° | Dm Gm7 | B♭maj7 C |
D♭° | Dm Gm7 | B♭maj7 C | D♭° |
Dm7 |
[B]
Gm7 B♭maj7 | Gm7/C D♭° | Dm7 Gm7 | B♭maj7 Gm7/C |
D♭° |
[C]
Gm7 C | Fmaj7 F6 | Gm7 C | Dm Am |
Gm7 Csus4 | Fmaj7 F6 | Gm7 Csus4 | Dm C |
A7/F A7-9 |
[D]
Dm Gm | B♭ C | D♭° | Dm Gm |
B♭ C | D♭° | Dm Gm7 | B♭maj7 C |
D♭° | Dm Gm7 | B♭maj7 Dm7 |
[E]
Gm7 C | Fmaj7 | Gm7 C | Dm Am |
Csus4 Gm7 | Fmaj7 F6 | Gm7 Csus4 | Dm C |
A7/F A7-9 |
[F]
Dm Gm | B♭ C | D♭° | Dm Gm |
B♭ C | D♭° Em |
[G]
Am7 | Cmaj7 D | E♭° | Em Am7 |
Cmaj7 D | E♭° | Em Am7 | Cmaj7 D |
E♭° | Em Am7 | Cmaj7 D | E♭° |
Em Am7 | Cmaj7 D | E♭° | Em Am7 |
Cmaj7 D | E♭° | Em |`,

`title: 群青日和 (Gunjō Biyori)
by: 東京事変 (Tokyo Jihen)
genre: J-pop
feel: Rock
source: U-FRET chord chart
tempo: 160
key: E♭
[A]
E♭ G | A♭ G7 | Cm | F Fm |
B♭ | E♭ Gm | A♭ G7 | Cm |
F7 Fm7 | B♭ | E♭ |
[B]
E♭ A♭ | E♭ A♭m | E♭ Gm | Cm E♭ |
F Fm7/B♭ | B♭ | E♭ A♭ | E♭ A♭m |
E♭ Gm | Cm E♭ | F A♭/B♭ | B♭ |
Cm Gm | A♭ B♭ | Cm Gm | A♭ E♭ |
F B♭ |
[C]
E♭ Gm | A♭ | G7 Cm | F7 |
Fm B♭ | E♭ Gm | A♭ | G7 Cm |
F7 | Fm7 B♭ | Emaj7 | E♭ G7 |
A♭ D♭ | Cm F/A | A♭ D♭ |
[D]
A♭ A♭m | Gm7 G | Cm | F Fm7 |
B♭ B7sus4 |
[E]
E A♭ | A A♭ | D♭m | G♭7 G♭m |
G♭m7 B7 | E A♭m | A A♭7 | D♭m G♭7 |
G♭m7 B7 | E |
[Outro]
E A♭m | D♭m Bm | E | A A♭7 |
D♭m G♭m | B | E A♭m | D♭m Bm |
E | A A♭7 | D♭m G♭m | B |`,

`title: ひまわりの約束 (Himawari no Yakusoku)
by: 秦基博 (Motohiro Hata)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 87
key: B♭
form: Intro A B C Interlude D B E Interlude 2 C Outro
[Intro]
B♭ F/A | E♭ B♭ | F/A | Gm Dm |
E♭ |
[A]
B♭ F/A | E♭ B♭ | F/A Gm | Dm Cm7 |
F | B♭ F/A | E♭ B♭ | F/A Gm |
Dm E♭ | F B♭ |
[B]
F/E♭ Dm | Gm | C7 C7/E | Fsus4 F |
[C]
B♭ E♭ | F G♭° | Gm Gm7 | Fm7 B♭7 |
E♭maj7 Em7♭5 | F G♭° | Gm Em7♭5 | Fsus4 F |
B♭ E♭ | F G♭° | Gm | Gm7 Fm7 |
B♭7 | E♭ D7 | Gm Em7♭5 | E♭maj7 E♭m |
F |
[Interlude]
B♭ F/A | E♭ B♭ | F/A | Gm Dm |
E♭ |
[D]
B♭ F/A | E♭ B♭ | F/A Gm | Dm E♭ |
F | B♭ F/A | E♭ B♭ | F/A Gm |
Dm E♭ | F B♭ |
[E]
B♭ E♭ | F G♭° | Gm | Gm7 Fm7 |
B♭7 | E♭maj7 Em7♭5 | F G♭° | Gm Em7♭5 |
Fsus4 F | B♭ E♭ | F G♭° | Gm |
Gm7 Fm7 | B♭7 | E♭ D7 | Gm Em7♭5 |
E♭maj7 E♭m | F |
[Interlude 2]
Gm F/A | E♭ B♭ | F/A | Gm Dm |
E♭ Fsus4 | F |
[Outro]
B♭ F/A | E♭ B♭ | F/A | Gm Dm |
E♭ B♭/D | Cm7 | B♭ |`,

`title: ありがとう (Arigatō)
by: いきものがかり (Ikimonogakari)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 80
key: C
form: Intro A Interlude B C D E F Interlude C D G Interlude 2 E H Outro
[Intro]
Bm7♭5 E7 | Am G | F♯m7♭5 | Em7 Am |
Dm7 G7 |
[A]
C E7 | Am7 Gm7 | C7 | Bm7♭5 E7 |
Am7 D7 | Dm7 Fm | F/G |
[Interlude]
C G7 |
[B]
C G/B | Am7 Gm7 | C Fmaj7 | E7 Am7 |
D7 | Dm7 F/G | G7 |
[C]
C G/B | Am7 Gm7 | C Fmaj7 | E7 Am7 |
D7 | Dm7 F/G | C |
[D]
F Fmmaj7 | C/E A7sus4 | A7 | Dm7 Fm |
Gsus4 | Gsus4 G | Am7 G/B | C G/D |
[E]
G7 C | E7 | Am7 Gm7 | C7 |
Bm7♭5 E7 | Am7 D7 | Dm7 Fm | F/G |
[F]
C E7 | Am7 Gm7 | C7 | Bm7♭5 E7 |
Am7 D7 | Dm7 Fm6 | F/G |
[G]
F/G C | E7 | Am7 Gm7 | C7 |
Bm7♭5 E7 | Am7 D7 | Dm7 Fm6 | F/G |
[Interlude 2]
A♭maj7 D♭maj7 | A♭maj7 D♭maj7 | C Fmaj7 | Gsus4 |
G Am7 | G/B C | G/D |
[H]
C E7 | Am7 Gm7 | C7 | Bm7♭5 E7 |
Am7 D7 | Dm7 Fm | F/G C |
[Outro]
Bm7♭5 E7 | Am G | F♯m7♭5 | Em7 Am |
Dm7 G7 | C |`,

`title: YELL
by: いきものがかり (Ikimonogakari)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 82
key: Dm
form: A B C D Interlude E F G Interlude 2 H I D Outro
[A]
Dm C6 | B♭ F/A | Gm7 B♭ | Asus4 A7 |
Dm C6 | B♭ F/A | Gm7 B♭ | Asus4 A7 |
[B]
Dm C6 | B♭ F/A | Gm7 F | Gm7 A7 |
Dm C6 | B♭ F/A | Gm7 F | Gm7 A |
Dm |
[C]
B♭maj7 F/A | Gm7 A | Dm Dm7 | B♭maj7 F/A |
Gm7 Am7 | B♭ Asus4 | A7 |
[D]
Dm Gm7 | C F | C/E | Dm Gm7 |
C Asus4 | A7 | Dm B♭ | C F |
C/E | Dm Gm7 | C A/D♭ | Dm C6 |
[Interlude]
B♭ F/A | Gm7 B♭ | Asus4 A7 |
[E]
Dm7 C6 | B♭maj7 F/A | Gm7 F | Gm7 A |
Dm7 C6 | B♭maj7 F/A | Gm7 F | Gm7 A |
Dm7 |
[F]
B♭maj7 F/A | Gm7 A | Dm | B♭maj7 F/A |
Gm7 Am7 | B♭maj7 Asus4 | A7 |
[G]
Dm Gm7 | C F | C/E | Dm Gm7 |
C Asus4 | A7 | Dm B♭ | C F |
C/E | Dm Gm7 | C A/D♭ | Dm7 C6 |
[Interlude 2]
B♭maj7 Am7 | B♭maj7 Am7 | Dsus4 D |
[H]
B♭add9 | B♭add9 | F | B♭add9 |
B♭add9 | F | C Dm7 | B♭maj7 |
C | B♭ A7 |
[I]
Dm Gm7 | C F | C/E | Dm Gm7 |
C Asus4 | A7 | Dm B♭maj7 | C F |
C/E | Dm Gm7 | C A7 |
[Outro]
B♭ F/A | Gm7 B♭ | A7 | Dm C6 |
B♭ F/A | Gm7 B♭ | Asus4 A7 | Dm |`,

`title: 瞳をとじて (Hitomi wo Tojite)
by: 平井堅 (Ken Hirai)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 68
key: E♭
form: A B C D Interlude E C D Interlude 2 F Outro
[A]
E♭ A♭/E♭ | Dm7♭5 G7/B | Cm7 Cm7/B♭ | A♭maj7 A♭/B♭ |
B♭7 |
[B]
E♭ B♭ | Cm7 E♭ | A♭ Gm7 | Fm7 A♭/B♭ |
B♭7 | E♭ B♭ | B♭m | C7 Fm7 |
A♭/B♭ B♭7 | E♭ A♭/B♭ | E♭ B♭ | Cm7 E♭ |
A♭ Gm7 | Fm7 A♭/B♭ | B♭7 | E♭ B♭ |
B♭m C7 | Fm7 A♭/B♭ | B♭7 E♭ |
[C]
E♭7 A♭maj7 | B♭/A♭ Gm7 | Cm7 | A♭maj7 Fm7 |
B♭7 E♭ | E♭7 | A♭maj7 B♭/A♭ | G7 Cm7 |
Fm7 F7 | A♭/B♭ B♭7 | G7 |
[D]
A♭maj7 B♭/A♭ | Gm7 Cm7 | Fm7 G7sus4 | G7 Cm7 |
B♭m7/E♭ E♭7 | A♭maj7 B♭/A♭ | G7sus4 G7 | Cm7 |
Fm7 A♭/B♭ | E♭ |
[Interlude]
E♭ A♭/E♭ | Dm7♭5 G7/B | Cm7 Cm7/B♭ | A♭maj7 A♭/B♭ |
B♭7 |
[E]
E♭ B♭ | Cm7 E♭ | A♭ Gm7 | Fm7 A♭/B♭ |
B♭7 | E♭ B♭ | B♭m C7 | Fm7 A♭/B♭ |
B♭7 E♭ |
[Interlude 2]
C G/B | Am7 C/G | F Em7 | Dm7 G7 |
C G/B | B♭ A7 | Dm7 Dm7/G | G7 Fm7 |
A♭/B♭ |
[F]
G7sus4 G7 | A♭maj7 B♭/A♭ | Gm7 Cm7 | Fm7 G7sus4 |
G7 Cm7 | B♭m7/E♭ E♭7 | A♭maj7 B♭/A♭ | G7sus4 G7 |
Cm7 | Fm7 B♭/A♭ | E♭ B♭m7 | A7 |
A♭maj7 B♭/A♭ | Gm7 Cm7 | Fm7 G7sus4 | G7 Cm7 |
B♭m7/E♭ E♭7 | A♭maj7 B♭/A♭ | G7sus4 G7 | Cm7 |
Fm7 A♭/B♭ | E♭ F7 | Fm7 A♭/B♭ |
[Outro]
E♭ A♭/E♭ | Dm7♭5 G7/B | Cm7 Cm7/B♭ | A♭maj7 A♭/B♭ |
B♭7 | E♭ |`,

`title: 未来予想図II (Mirai Yosōzu II)
by: DREAMS COME TRUE
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 76
key: F♯
[A]
D E | F♯ D | E F♯ | G♯m A♯m |
G♯m A♯m | G♯m7/C♯ | F♯ G♯m/F♯ | G♯m7/C♯ F♯ |
B A♯m7 | G♯m7 C♯7 | F♯ G♯m/F♯ | G♯m7/C♯ F♯ |
B A♯m7 | G♯m7 G♯m7/C♯ | F♯ G♯7 |
[B]
Bmaj7 C♯/B | B C♯/B | A♯m7 D♯7 | G♯m7 C♯7 |
A♯m7 D♯m7 | B | G♯7 G♯m7/C♯ |
[C]
F♯ Fm7♭5 | A♯7 | D♯m D♯m7 | B G♯m7/C♯ |
F♯ Fm7♭5 | A♯7 D♯m | D♯mmaj7 D♯m7 | Cm7♭5 |
B C♯/B | A♯m7 D♯7 | G♯m7 G♯m7/C♯ | A♯m7 |
D♯7 Bmaj7 | A♯m7 D♯m7 | G♯m7 C♯7 | D E |
F♯ D | E F♯ |
[D]
G♯m/F♯ G♯m7/C♯ | F♯ | B A♯m7 | G♯m7 C♯7 |
F♯ G♯m/F♯ | G♯m7/C♯ F♯ | B A♯m7 | G♯m7 G♯m7/C♯ |
F♯ G♯7 |
[E]
B C♯/B | B C♯/B | A♯m7 D♯7 | G♯m7 C♯7 |
A♯m7 D♯m7 | B | G♯7 G♯m7/C♯ |
[F]
F♯ Fm7♭5 | A♯7 | D♯m D♯m7 | B G♯m7/C♯ |
F♯ Fm7♭5 | A♯7 D♯m | D♯mmaj7 D♯m7 | Cm7♭5 |
B C♯/B | A♯m7 D♯7 | G♯m7 G♯m7/C♯ | A♯m7 |
D♯7 Bmaj7 | A♯m7 D♯m7 | G♯m7 G♯m7/C♯ | F♯ |
[G]
Bmaj7 A♯m7 | D♯m7 | G♯m7 G♯m7/C♯ | B G♯m7 |
D C♯ | D E | F♯ D | E F♯ |`,

`title: LOVE LOVE LOVE
by: DREAMS COME TRUE
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 70
key: D♭
form: A B B C D E F G
[A]
G♭ A♭ | D♭ A♭ | D♭ A♭ | D♭ |
G♭ A♭ | D♭ A♭ | D♭ E♭m7 |
[B]
D♭ Fm | D♭/B B♭7 | E♭m D+ | G♭ C° |
B♭m A+ | B♭m E♭ | G♭ A♭ | D♭ Fm |
B♭m A♭ |
[C]
D♭ Fm | D♭/B B♭7 | E♭m D+ | G♭ C° |
B♭m A+ | B♭m E♭ | G♭ A♭ | D♭sus4 D♭ |
G♭ |
[D]
G♭ Fm | A E♭m7/A♭ | A♭ D♭ | Fm |
[E]
D♭/B B♭ | E♭m D+ | G♭ C° | B♭m A+ |
B♭m E♭ | G♭ A♭ | B♭m B♭mmaj7 | B♭m7 E♭7 |
[F]
G♭ E♭m | E♭m7/A♭ D♭ |
[G]
D♭ D♭add9 | D♭ D♭add9 | D♭ A♭/D♭ | D♭ D♭add9 |
D♭ D♭add9 | D♭ D♭add9 | D♭ A♭/D♭ | D♭ D♭add9 |
D♭ D♭add9 | D♭ D♭add9 | D♭ A♭/D♭ | D♭ D♭add9 |
D♭ D♭add9 | D♭ D♭add9 | D♭ A♭/D♭ | D♭ |`,

`title: 世界に一つだけの花 (Sekai ni Hitotsu Dake no Hana)
by: SMAP (槇原敬之)
genre: J-pop
feel: Pop
source: U-FRET chord chart
tempo: 96
key: A
form: Intro A B C A B D E F
[Intro]
A D | E F♯m | A D | E F♯m |
A D | E F♯m | A D | E F♯m |
A D | E Dadd9 |
[A]
A D | E C♯ | F♯m7 D | B E |
E/D | A D | E C♯ | F♯m7 D |
E7 A | A D | E C♯ | F♯m7 D |
B E | E/D | A D | E C♯ |
F♯m7 D | E7 A |
[B]
G D | G D | E E/D | A B |
E7sus4 |
[C]
Bm7/E C♯m7 | D/E | A D | E C♯ |
F♯m B7 | E7sus4 | A D | E C♯ |
F♯m B7 | Bm7/E E7 | E/D A | A D |
E F♯m | A D | E F♯m | A D |
E F♯m | A D | E Dadd9 |
[D]
Bm7/E C♯m7 | D/E | A D | E C♯ |
F♯m B7 | E7sus4 | A D | E C♯ |
F♯m B7 | Bm7/E E7 | E/D A |
[E]
A E | C♯ F♯m | B E7sus4 | A D |
E C♯ | F♯m B7 | Bm7/E E7 | E/D A |
A D | E F♯m |
[F]
A D | E F♯m | A D | E F♯m |
A D | E F♯m | A D | E |
Asus4 |`,

`title: もう恋なんてしない (Mō Koi Nante Shinai)
by: 槇原敬之 (Noriyuki Makihara)
genre: J-pop
feel: Pop ballad
source: U-FRET chord chart
tempo: 96
key: E
form: Intro A B C D Interlude A B C E F Outro
[Intro]
E F♯m7 | G♯m G♯7 | C♯m7 | F♯m7 B |
Esus4 E | E F♯m7 | G♯m G♯7 | C♯m7 |
F♯m7 B | E Esus4 | E | E F♯m7 |
G♯m G♯7 | C♯m7 | F♯m7 B | Esus4 E |
B/D♯ |
[A]
C♯m7 G♯m7 | F♯m7 F♯m7/B | E | Amaj7 G♯7 |
C♯m7 | F♯m7 E | A F♯m7/B |
[B]
C♯m7 G♯m7 | F♯m7 F♯m7/B | E | Amaj7 G♯7 |
C♯m7 | F♯m7 F♯m7/B | A E | B/D♯ |
[C]
C♯m7 F♯7 | B | E D♯m7♭5 | G♯7 C♯m7 |
G♯m7 C♯m7 | F♯7 B | E D♯m7♭5 | G♯7 |
[D]
Amaj7 B/A | G♯m7 C♯m7 | F♯m7 B7 | E E7 |
Amaj7 G♯7 | C♯m7 C♯m/B | F♯m7 F♯m7/B | A♯7 |
Amaj7 B/A | G♯m7 C♯m7 | F♯m7 B7 | E E7 |
Amaj7 G♯7 | C♯m7 A♯m7♭5 | F♯m7 F♯m7/B | Esus4 E |
[Interlude]
E F♯m7 | G♯m G♯7 | C♯m7 | F♯m7 B |
E Esus4 | E | E F♯m7 | G♯m G♯7 |
C♯m7 | F♯m7 B | Esus4 E | B/D♯ |
[E]
Amaj7 B/A | G♯m7 C♯m7 | F♯m7 B7 | E E7 |
Amaj7 G♯7 | C♯m7 C♯m | F♯m7 F♯m7/B | A♯7 |
Amaj7 B/A | G♯m7 C♯m7 | F♯m7 B7 | E E7 |
Amaj7 G♯7 | C♯m7 A♯m7♭5 | F♯m7 F♯m7/B | Esus4 E |
[F]
Amaj7 B/A | G♯m7 C♯m7 | F♯m7 B7 | Emaj7 E7 |
Amaj7 G♯7 | C♯m7 A♯m7♭5 | F♯m7 F♯m7/B |
[Outro]
E F♯m7 | G♯m G♯7 | C♯m7 | F♯m7 B |
E Esus4 | E | E F♯m7 | G♯m G♯7 |
C♯m7 | F♯m7 B | Esus4 E |`,

`title: 残酷な天使のテーゼ (A Cruel Angel's Thesis)
by: 高橋洋子 (Yoko Takahashi)
genre: J-pop
feel: Anime pop
source: U-FRET chord chart
tempo: 128
key: Cm
form: A B C D B C E C F
[A]
Cm Fm | B♭ E♭ | Cm Fm | Gm7 A♭maj7 |
Cm Fm | B♭ E♭ | Cm Fm | B♭ Cm |
[B]
E♭ B♭ | Cm B♭ | A♭maj7 | B♭sus4 B♭ |
E♭sus4 Cm7 | Dm7 Gsus4 | G | E♭ B♭ |
Cm B♭ | A♭maj7 | B♭sus4 B♭ | E♭sus4 Cm7 |
Dm7 Gsus4 | G Gsus4 | G |
[C]
A♭maj7 Gm7 | Cm Fm7 | B♭7 B♭m7 | E♭7 |
A♭maj7 Gm7 | Cm Dm7 | G Gsus4 | G |
[D]
Cm Fm | B♭ E♭ | Cm Fm | B♭ E♭ |
Cm Fm | B♭ E♭ | Cm Fm | B♭ Cm |
Fm B♭ | E♭ Cm | Fm | B♭ Gm |
B♭ Cm | Cm A♭ | Cm A♭ | Fm7 Gm7 |
A♭maj7 Gm7 | Fm7 Gm7 | A♭maj7 B♭ | G |
Cm Fm | B♭ E♭ | Cm Fm | B♭ Cm |
Cm Fm | B♭ E♭ | Cm Fm | B♭ Cm |
[E]
Cm Fm | B♭ E♭ | Cm Fm | B♭ E♭ |
Cm Fm | B♭ E♭ | Cm Fm | B♭ Cm |
Fm B♭ | E♭ Cm | Fm7 Fm | Gm A♭ |
B♭ |
[F]
Cm Fm | B♭ E♭ | Cm Fm | B♭ E♭ |
Cm Fm | B♭ E♭ | Cm Fm | B♭ Cm |
Fm B♭ | E♭ Cm | Fm | B♭ Gm |
B♭ Cm |`,

`title: 君の知らない物語 (Kimi no Shiranai Monogatari)
by: supercell
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 164
key: A
[A]
Aadd9 D6 | Esus4 F♯m7 | Aadd9 D6 | E D/E |
E Dmaj7 | E F♯m7 | A Dmaj7 | E C♯ |
F♯m B | A Dm | A D | A E/A |
A Dm | A |
[B]
A Esus4 | Dmaj7 A | E | F♯m7 B7 |
Dadd9 E | A E | F° | F♯m F♯m7 |
B | Dadd9 A | Dadd9 E | Asus4 A |
E |
[C]
F♯m7 Bm7 | E A | D E | F♯m7 E |
A |
[D]
A E | Dmaj7 | F♯m E | A Dm6 |
E7sus4 E | A | Dadd9 E | F° F♯m |
E Dmaj7 | A Bm7 | C♯m7 Dadd9 | E F |
G A | D A | E/A A | Dm A |
[E]
A E | Dmaj7 A | E | F♯m7 B |
D E | A E | F° | F♯m F♯m7 |
B | D A | D E | Asus4 A |
E |
[F]
F♯m7 Bm7 | E A | D E | F♯m7 A |
E A |
[G]
A E | Dmaj7 | F♯m E | A Dm6 |
E7sus4 E | A | Dadd9 E | F° F♯m |
E Dmaj7 | A Bm7 | C♯m7 Dadd9 | E F |
G A | F G/A | F G/A | E F♯m7 |
E A | D E | B |
[H]
E | D F♯m7 | E D | C♯m7 D |
E F♯m7 | C♯m7 Dadd9 | Esus4 E | Dmaj7 E |
F♯m7 Dadd9 | E F♯m7 | E/F♯ F♯m7 | A D |
E F♯m7 | A Dadd9 | Esus4 E | Esus4 E |
[I]
Aadd9 D6 | Esus4 F♯m7 | Aadd9 D6 | Esus4 F♯m7 |
Aadd9 D6 | Esus4 F♯m7 | Aadd9 E |
[J]
F♯m7 E | D | E F♯m7 | A E |
A |
[K]
A E | Dmaj7 | F♯m E | A Dm6 |
E A | A E | F♯m7 | F♯m7 E |
D | D A | D | D E |
E7 E6 | A D | E | F° F♯m |
E Dmaj7 | A Bm7 | C♯m7 Dadd9 | E A |
D A | E/A A | D A | E/A A |
Dm A | E/A | F♯m7 E | A |`,

`title: only my railgun
by: fripSide
genre: J-pop
feel: Anime trance
source: U-FRET chord chart
tempo: 150
key: G♯m
form: Intro A B C D E B C F E Interlude Interlude 2 G H F E
[Intro]
G♯m |
[A]
G♯m E | F♯7 B | G♯m F♯ | E D♯m |
C♯m | D♯m E | F♯ G♯sus4 | G♯ |
[B]
Fm7 D♯ | C♯ D♯ | G♯ D♯ | Fm7 C♯ |
D♯ Cm7 | A♯m7 Cm7 | Cm7/F |
[C]
C♯ D♯ | Cm Fm | E F♯ | C♯ D♯ |
[D]
G♯m E | F♯7 B | G♯m G♯m/F♯ | E E/D♯ |
C♯m7 | D♯m7 |
[E]
G♯m E | F♯7 B | G♯m G♯m/F♯ | E E/D♯ |
C♯m7 | D♯m7 E | F♯ G♯sus4 | G♯ |
[F]
G♯m7 E | F♯7 B | G♯m G♯m/F♯ | E E/D♯ |
C♯m7 | D♯m7 |
[Interlude]
G♯m |
[Interlude 2]
E F♯ | D♯m G♯m | E F♯ | C♯ D♯7 |
[G]
Gm D♯ | F A♯ | F/A Gm | D♯ Cm |
Dm |
[H]
Gm7 D♯add9 | F7 A♯ | F/A Gm7 | D♯add9 Cm7 |
Dm7 |`,

`title: God knows...
by: 涼宮ハルヒ (平野綾)
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 170
key: C♯m
form: Intro A B C A B D E F
[Intro]
Amaj7 B | G♯m C♯m | Amaj7 B | C♯m |
Amaj7 B | G♯m C♯m | Amaj7 B | C♯sus4 C♯ |
[A]
C♯m B | A B | E D♯m7 | G♯7 |
C♯m B | A B | E |
[B]
Amaj7 G♯m | F♯m A | G♯sus4 G♯ |
[C]
Amaj7 | B G♯m | C♯m | F♯m G♯m |
C♯m Bm7 | E7 Amaj7 | B G♯m | C♯m |
F♯m G♯m | A B | C♯sus4 C♯ | Amaj7 B |
G♯m C♯m | Amaj7 B | C♯m | Amaj7 B |
G♯m C♯m | Amaj7 B | C♯sus4 C♯ |
[D]
Amaj7 B | G♯m C♯m | F♯m | G♯m C♯m |
Bm7 | E7 Amaj7 | B G♯m | C♯m |
F♯m G♯m | A | B C♯sus4 | C♯ |
[E]
Amaj7 G♯m | F♯m G♯m | C♯m B | Amaj7 G♯m |
F♯m | A G♯sus4 | G♯ |
[F]
A♯ Bmaj7 | C♯ A♯m | D♯m | G♯m A♯m |
D♯m C♯m7 | F♯7 Bmaj7 | C♯ A♯m | D♯m |
G♯m A♯m | B C♯ | D♯sus4 D♯ | Bmaj7 C♯ |
A♯m D♯m | Bmaj7 C♯ | D♯sus4 D♯ | Bmaj7 C♯ |
A♯m D♯m | Bmaj7 C♯ | D♯sus4 D♯ |`,

`title: シルエット (Silhouette)
by: KANA-BOON
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 180
key: Bm
form: A B C D B E F G H I
[A]
Bm A | G A | Bm A | G A |
Bm A | G A | Bm A | G A |
D G6 | A B♭° | Bm7 F♯m7 | G A |
[B]
D G | A B♭° | Bm7 F♯m7 | G A |
D G | A B♭° | Bm7 Cadd9 | G A |
[C]
Bm B♭° | D Eadd9 | G A |
[D]
D Gmaj7 | A B♭° | Bm7 | F♯m7 Gmaj7 |
A | D Gmaj7 | A B♭° | Bm7 |
F♯m7 Gmaj7 | A | F♯m7 Gmaj7 | A7 Bm7 |
[E]
Bm B♭° | D Eadd9 | G A6 | A7 Amaj7 |
A |
[F]
D Gmaj7 | A B♭° | Bm7 | F♯m7 Gmaj7 |
A | D Gmaj7 | A B♭° | Bm7 |
F♯m7 Gmaj7 | A | Bm A | G A |
Bm A | G A | Bm A | G A |
Bm A | G A |
[G]
G B♭° | Bsus4 Dadd9 | D | Em F♯m |
G A |
[H]
Gmaj7 A | B♭° Bm7 | F♯m7 Gmaj7 | A |
D Gmaj7 | A B♭° | Bm7 | F♯m7 Gmaj7 |
A | D Gmaj7 | A B♭° | Bm7 |
F♯m7 Gmaj7 | A | D Gmaj7 | A B♭° |
Bm7 | F♯m7 Gmaj7 | A |
[I]
G B♭° | Bsus4 Dsus4 | D | G A |
D | G A | B♭° Bm7 | F♯m7 G |
A | D G | A B♭° | Bm7 F♯m7 |
G A | Bm A | G A | Bm A |
G A | Bm A | G A | Bm A |
G A |`,

`title: unravel
by: TK from 凛として時雨
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 135
key: Gm
[A]
E♭maj7 Cm7 | F Gm7 | E♭maj7 Gm7 | F Gm7 |
E♭maj7 Cm7 | F Gm7 | Gm F | E♭ Dm |
Gm F | E♭ Dm | Gm |
[B]
Gm E♭maj7 | F B♭ | Gm E♭maj7 | F B♭ |
Gm7 | Gm7 |
[C]
E♭ F | Gm Dm | E♭ Fsus4 | F Gm |
B♭ | E♭ F | Gm Dm | E♭ Fsus4 |
F |
[D]
E♭maj7 Gm | F Gm | E♭maj7 Gm | F Gm |
[E]
E♭maj7 Gm7 | F Gm7 | E♭maj7 Gm7 | F |
E♭maj7 |
[Interlude]
E♭maj7 F | Gm7 B♭ | E♭maj7 F | Gm |
E♭maj7 F | Gm7 B♭ | E♭maj7 F | Gm B♭ |
[F]
Gm E♭maj7 | F Gm | E♭maj7 | F Gm |
[G]
E♭ F | Gm Dm | E♭ Fsus4 | F Gm |
Dm | E♭ F | Gm Dm | E♭ Fsus4 |
F E♭maj7 | F Gm | Dm |
[H]
E♭ F | Gm Dm |
[I]
E♭ F | Gm Dm | E♭ Fsus4 | F |
[Interlude 2]
E♭maj7 Gm | F Gm |
[J]
E♭maj7 Gm | F Gm | E♭maj7 Gm |`,

`title: Butter-Fly
by: 和田光司 (Kōji Wada)
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 150
key: E
form: Intro A B C Interlude A B D E F
[Intro]
E | E D/E | E/A | E D/E |
E/A | E D/E | E/A | E D |
A/C♯ A |
[A]
E G♯m | A C | D E | E G♯m |
A C | D E |
[B]
C♯m G♯m | A E | C♯m G♯m | A B |
C D | Bsus4 B |
[C]
E B | C♯m G♯m | A | E C♯m |
A B | E B | G♯ C♯m | G♯m A |
G♯m C♯m | C D | E |
[Interlude]
E D/E | E/A | E D/E | E/A |
E D/E | E/A | E D | A/C♯ A |
[D]
E B | C♯m G♯m | A | E C♯m |
A B | E B | G♯ C♯m | G♯m A |
G♯m C♯m | C D | E | E |
C D | E | C D | E |
F♯m G♯m | A F♯ | B |
[E]
E B | C♯m G♯m | A | E C♯m |
A B | E B | G♯ C♯m | G♯m A |
G♯m C♯m | C D |
[F]
E B | C♯m G♯m | A | E C♯m |
A B | E B | G♯ C♯m | G♯m A |
G♯m C♯m | C D | E | E D/E |
E/A | E D/E | E/A | E D/E |
E/A | E D | A/C♯ A | G♯ A |
B E |`,

`title: ブルーバード (Blue Bird)
by: いきものがかり (Ikimonogakari)
genre: J-pop
feel: Anime rock
source: U-FRET chord chart
tempo: 184
key: F♯m
form: A Interlude B C D E Interlude 2 B C D F Interlude 3 G D E Outro
[A]
Dmaj7 C♯m7 | F♯m | Bm7 Bm7/E | A |
Dmaj7 C♯7 | F♯m | Bm7 Bm7/E | F♯m7 |
[Interlude]
Dmaj7 E/D | C♯m7 F♯m | Bm7 G♯m7♭5 | C♯7 |
Dmaj7 E/D | C♯m7 F♯m | Bm7 Dmaj7 | C♯7 |
[B]
F♯m7 E | Dmaj7 A/C♯ | Bm7 A | G♯m7♭5 C♯7 |
F♯m7 E | Dmaj7 A/C♯ | Bm7 Bm7/E | F♯m7 |
[C]
Dmaj7 E/D | C♯m7 F♯m7 | Bm7 C♯7 |
[D]
Dmaj7 C♯m7 | F♯m7 | Bm7 Bm7/E | A |
Dmaj7 C♯7 | F♯m7 | Bm7 Bm7/E | F♯m7 |
[E]
Dmaj7 C♯7 | F♯m7 | Bm7 Bm7/E | A |
Dmaj7 C♯7 | F♯m7 | Bm7 E | F♯m7 |
Bm7 E | F♯m7 | Bm7 C♯7 | F♯m7 |
[Interlude 2]
Dmaj7 E/D | C♯m7 F♯m | Bm7 C♯7 |
[F]
Dmaj7 C♯7 | F♯m7 | Bm7 Bm7/E | A |
Dmaj7 C♯7 | F♯m7 | Bm7 C♯7 | F♯m7 |
[Interlude 3]
D♯m7♭5 Dmaj7 | C♯m7 Cmaj7 | Bm7 E |
[G]
Dmaj7 C♯m7 | Bm7 C♯m7 | Dmaj7 C♯7 |
[Outro]
Dmaj7 E/D | C♯m7 F♯m | Bm7 C♯7 | E F♯m |`,

`title: アイノカタチ (Ai no Katachi)
by: MISIA feat. HIDE
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 76
key: F♯
[Intro]
B C♯ | D♯m A♯m | G♯m7 A♯m7 | Bm7 C♯ |
[A]
F♯ C♯/F | E | D♯7 |
[B]
G♯m7 G+ | F♯ | C♯ A♯7 |
[C]
D♯m G♯m7 | C♯ B | F♯/A♯ | D♯m G♯m7 |
B C♯ | A♯7 D♯m | G♯m7 | C♯ B |
F♯/A♯ | G♯m7 C♯ | D E |
[D]
F♯ B | C♯ F♯ | C♯/F | D♯m A♯m7 |
B C♯ |
[Interlude]
B C♯ | D♯m A♯m | G♯m7 A♯m7 | Bm7 C♯ |
[E]
F♯ C♯/F | E | D♯7 | G♯m7 G+ |
B C♯ | A♯7 |
[F]
D♯m G♯m7 | C♯ B | F♯/A♯ | G♯m7 |
C♯ D | E |
[G]
F♯ B | C♯ F♯ | C♯/F | D♯m A♯m7 |
B | C♯ |
[Interlude 2]
B C♯/B | B C♯/B | A♯m7 D♯m | A♯m7 D♯m |
B C♯/B | B C♯/B | D C♯ |
[H]
F♯ B | C♯ F♯ | C♯/F | D♯m A♯m7 |
B | C♯ D |
[I]
G C | D G | D/F♯ | Em B7 |
C C♯m7♭5 | D |
[J]
G/B C | D | D♯° Em | D/F♯ |
Em Bm7 | C | D |
[K]
C D | Em Bm7 |
[L]
C D | G B7 | C D | Em Bm7 |
Am7 Bm7 | C |`,

`title: Everything
by: MISIA
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 72
key: D♭
form: Intro A B C D Interlude B C E F Interlude 2 Interlude 3 G H
[Intro]
D♭maj7 C7 | Fm7 B♭7 | E♭m7 G♭maj7 | B A |
A♭sus4 A♭ |
[A]
D♭ G♭maj7 | E7 | B♭m7/E♭ E♭7 | A♭7 G♭° |
Fm7 Fm7/B♭ | A♭° | Gm7♭5 G♭m6 | Fm7 B♭7 |
B♭m7/E♭ E♭7 | Amaj7 E♭m7/A♭ |
[B]
D♭ G♭maj7 | E7 | B♭m7/E♭ E♭7 | A♭7 G♭° |
Fm7 Fm7/B♭ | A♭° | Gm7♭5 G♭m6 | Fm7 B♭7 |
B♭m7/E♭ E♭7 | G♭m7 G♭m7/B | B7 D♭ | B♭m7 Amaj7 |
[C]
E♭m7/A♭ G♭° | Fm7 B♭m7 | E♭m7 E♭m7/A♭ | G♭° Fm7 |
B♭m7 | Cm7♭5 F7 | B♭m7 E♭7 | E♭m7 D♭ |
G♭maj7 Gm7♭5 | E♭m7/A♭ A+ |
[D]
D♭ A♭ | B♭m7 A♭m6 | D♭7 G♭maj7 | A♭/G♭ Fm7 |
E7/B♭ B♭7 | E♭m7 A° | A♭7 Fm7 | B♭m7 |
E♭m7 E♭m7♭5 | A♭7 |
[Interlude]
D♭ E♭m7/A♭ | A° | B♭m7 E♭7 | E♭m7/A♭ |
[E]
D♭ A♭ | B♭m7 A♭m6 | D♭7 G♭maj7 | A♭/G♭ Fm7 |
E7/B♭ B♭7 | E♭m7 E♭m7/A♭ | G♭° Fm7 | Fm7/B♭ A♭° |
Gm7♭5 G♭maj7 | E♭m7♭5 E♭m7/A♭ |
[F]
D♭ A♭ | B♭m7 A♭m6 | D♭7 G♭maj7 | A♭/G♭ Fm7 |
E7/B♭ B♭7 | E♭m7 A° | Fm7 B♭7 | E♭m7 E♭m7♭5 |
[Interlude 2]
D♭ E♭7 | E♭m7/A♭ D♭ | B♭m7 E♭7 | A♭ A° |
B♭m7 E♭7 | A♭m7 A♭m7/D♭ | G♭maj7 B7 |
[Interlude 3]
D♭/A♭ E♭m7/A♭ | Fm7/B♭ | G♭m7/B E♭m7/A♭ | Em7/A |
[G]
D A | Bm7 Am6 | D7 Gmaj7 | A7 G♭m7 |
F/B B7 | Em7 Em7/A | G° G♭m7 | G♭m7/B A° |
A♭m7♭5 Gmaj7 | Gm/B♭ Em7/A |
[H]
D A | G♭7 Bm7 | B♭m7 Am7 | D7 A♭m7♭5 |
A7 G♭m7 | F/B B7 | Em7 B♭° | A7 G♭m7 |
B7 | Em7 Gm | Em7♭5/A D | B7 |
Em7♭5 | Gm Em7♭5/A | D A/B | B♭+ Gm |
A7 | Dadd9 |`,

`title: ハナミズキ (Hanamizuki)
by: 一青窈 (Yo Hitoto)
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 84
key: E
[A]
E B | C♯m E | A E | F♯m7 B |
E | E B | C♯m7 E | A E |
F♯m7 F♯m7/B | B | E B | C♯m E |
A E | F♯m7 B | E A | E |
Eadd9 Eadd9/A | B C° | C♯m C♯m/B | Eadd9 Eadd9/A |
B A | B E | F♯m7/B |
[B]
E D♯m7♭5 | G♯7 C♯m7 | Bm7 E7 | Aadd9 E |
F♯m7 F♯m7/B | B E | D♯m7♭5 G♯7 | C♯m7 |
Bm7 E7 | Aadd9 E | F♯m7 F♯m7/B | E |
[C]
E B | C♯m7 E | A E | F♯m7 F♯m7/B |
B | E B | C♯m7 E | A E |
F♯m7 B | E A | E | Eadd9 Eadd9/A |
B C° | C♯m C♯m7 | Eadd9 Eadd9/A | B A |
B E | F♯m7/B |
[D]
E D♯m7♭5 | G♯7 C♯m7 | Bm7 E7 | Amaj7 E |
F♯m7 F♯m7/B | B E | D♯m7♭5 G♯7 | C♯m7 |
Bm7 E7 | Amaj7 E | F♯m7 F♯m7/B | B Aadd9 |
E F♯m7 | F♯m7/B | E B | C♯m7 E |
Aadd9 E | F♯m7 F♯m7/B | B | E B |
C♯m7 E | Aadd9 E | F♯m7 B | E A |
E |
[E]
E B | C♯m E | A E | F♯m7 F♯m7/B |
B | E B | C♯m7 E | A E |
F♯m7 B | E A | E | Eadd9 Eadd9/A |
B C° | C♯m B | Eadd9 Eadd9/A | B E/C♯ |
B E | F♯m7/B |
[F]
E D♯m7♭5 | G♯7 C♯m7 | Bm7 E7 | Amaj7 E |
F♯m7 F♯m7/B | B E | D♯m7♭5 G♯7 | C♯m7 |
Bm7 E7 | Amaj7 E | F♯m7 F♯m7/B | B E |
[G]
D♯m7♭5 G♯7 | C♯m7 Bm7 | E7 Amaj7 | E |
F♯m7 F♯m7/B | B E | D♯m7♭5 G♯7 | C♯m7 |
Bm7 E7 | Amaj7 E | F♯m7 F♯m7/B | B E |
D♯m7♭5 G♯7 | C♯m |
[H]
Bm7 E7 | Aadd9 E | F♯m7 F♯m7/B | E B |
C♯m E | A E | F♯m7 B | Eadd9 |`,

`title: 366日 (366 Nichi)
by: HY
genre: J-pop
feel: Ballad
source: U-FRET chord chart
tempo: 76
key: A♭
[A]
A♭ D♭ | E♭sus4 Fm7 | A♭ D♭ | E♭sus4 Fm7 |
A♭add9 D♭add9 | E♭sus4 Fm7 | A♭add9 D♭add9 | E♭sus4 Fm7 |
A♭add9 D♭add9 | E♭sus4 Fm7 | A♭add9 D♭add9 | E♭sus4 Fm7 |
A♭add9 D♭ | E♭ A♭ | Fm7 B♭ | B♭m7 B♭m7/E♭ |
E♭ | A♭add9 D♭ | E♭m7 A♭7 | D♭ A♭ |
B♭m7 B♭m7/E♭ | E♭ |
[B]
A♭ D♭ | E♭ A♭ | A♭/G | Fm7 B♭ |
B♭m7 B♭m7/E♭ | E♭ | A♭add9 D♭ | E♭m7 A♭7 |
D♭ A♭ | B♭m7 B♭m7/E♭ | E♭ |
[C]
B♭m7 Fm7 | Cm7 D♭ | B♭m7 E♭m7 | D♭ Fm7 |
E♭ | B♭m7 Fm7 | Cm7 D♭ | B♭m7 B♭m7/E♭ |
E♭ | A♭ D♭ | E♭sus4 Fm7 | A♭ D♭ |
E♭sus4 Fm7 |
[D]
A♭add9 D♭ | E♭ A♭ | A♭/G | Fm7 B♭ |
B♭m7 B♭m7/E♭ | E♭ | A♭ D♭ | E♭m7 A♭7 |
D♭ A♭ | B♭m7 B♭m7/E♭ | E♭ |
[E]
B♭m7 Fm7 | Cm7 D♭ | B♭m7 E♭m7 | D♭ Fm7 |
E♭ | B♭m7 Fm7 | Cm7 D♭ | B♭m7 B♭m7/E♭ |
E♭ |
[F]
A♭ E♭ | Fm7 Cm7 | B♭m7 A♭add9 | D♭ B♭m7/E♭ |
E♭ | A♭ E♭ | Fm7 Cm7 | E♭m7 E♭m7/A♭ |
D♭ A♭add9 | B♭m7 A♭ | D♭ E♭ | A♭ |
[G]
B♭ D♭ | A♭ Fm7 | E♭m7 A♭ | D♭ A♭add9 |
B♭m7 Cm7 | C D♭ | A♭add9 B♭m7 | A♭ |
D♭ A♭add9 | B♭m7 A♭ | D♭ A♭add9 | B♭m7 A♭ |
D♭ A♭add9 | B♭m7 A♭add9 | D♭ E♭ | D♭/E♭ |
[H]
A♭ E♭ | Fm7 Cm7 | B♭m7 A♭add9 | D♭ B♭m7/E♭ |
E♭ | A♭ E♭ | Fm7 Cm7 | E♭m7 E♭m7/A♭ |
D♭ A♭ | B♭m7 A♭add9 | D♭ E♭ |
[I]
A♭ E♭ | Fm7 Cm7 | B♭m7 A♭add9 | D♭ B♭m7/E♭ |
E♭ | A♭ E♭ | Fm7 Cm7 | E♭m7 E♭m7/A♭ |
D♭ A♭add9 | B♭m7 A♭ | D♭ E♭ | B♭m7 |
A♭add9 D♭ | D♭/E♭ A♭add9 | D♭ E♭ | Fm7 A♭add9 |
D♭ E♭sus4 | E♭ Fm7 | A♭ D♭ | E♭sus4 Fm7 |
A♭ D♭ | E♭sus4 A♭add9 |`,

`title: Perfect
by: Ed Sheeran
genre: Pop
feel: Slow 6/8 ballad
source: Ultimate Guitar chord chart
tempo: 63
key: A♭
form: Intro Verse Pre Chorus Verse Pre 2 Chorus 2 Interlude Chorus 3 Outro
[Intro]
A♭ |
[Verse]
A♭ Fm | D♭ E♭ | A♭ Fm | D♭ E♭ |
[Pre]
A♭ | Fm D♭ | A♭ E♭ | A♭ Fm |
D♭ E♭ |
[Chorus]
Fm D♭ | A♭ E♭ | Fm | D♭ A♭ |
E♭ Fm | D♭ A♭ | E♭ Fm | D♭ A♭ |
E♭ A♭ | A♭ E♭/G | Fm E♭ | D♭ E♭ |
[Pre 2]
A♭ Fm | D♭ A♭ | E♭ | A♭ Fm |
D♭ E♭ |
[Chorus 2]
Fm D♭ | A♭ E♭ | Fm | D♭ A♭ |
E♭ Fm | D♭ A♭ | E♭ | Fm D♭ |
A♭ E♭ | A♭ |
[Interlude]
A♭ Fm | D♭ E♭ |
[Chorus 3]
Fm D♭ | A♭ E♭ | Fm | D♭ A♭ |
E♭ Fm | D♭ A♭ | E♭ Fm | D♭ A♭ |
E♭ |
[Outro]
A♭/C D♭ | E♭sus4 E♭ | A♭ | A♭ E♭/G |
Fm E♭ | D♭ E♭ | A♭ |`,

`title: Shape of You
by: Ed Sheeran
genre: Pop
feel: Tropical pop
source: Ultimate Guitar chord chart
tempo: 96
key: C♯m
form: Intro Verse Pre Chorus Verse Pre Chorus Bridge Chorus 2 Bridge 2
[Intro]
C♯m F♯m | A B | C♯m F♯m | A B |
[Verse]
C♯m F♯m | A B | C♯m F♯m | A B |
C♯m F♯m | A B | C♯m F♯m | A B |
[Pre]
C♯m F♯m | A B | C♯m | F♯m |
A B | C♯m F♯m | A B | C♯m |
F♯m |
[Chorus]
C♯m F♯m | A | B C♯m | F♯m A |
B C♯m | F♯m A | B C♯m | F♯m A |
B C♯m | F♯m A | B C♯m | F♯m A |
B C♯m | F♯m A | B C♯m | F♯m A |
B |
[Bridge]
C♯m F♯m | A B | C♯m F♯m |
[Chorus 2]
C♯m F♯m | A | B C♯m | F♯m A |
B C♯m | F♯m A | B C♯m | F♯m A |
B C♯m |
[Bridge 2]
F♯m | A B | C♯m F♯m | A B |
C♯m F♯m | A B | C♯m F♯m | A |`,

`title: Thinking Out Loud
by: Ed Sheeran
genre: Pop
feel: Soul ballad
source: Ultimate Guitar chord chart
tempo: 79
key: D
form: Verse Pre Chorus Verse Pre Chorus Interlude Chorus 2 Outro
[Verse]
D D/F♯ | G A | D D/F♯ | G A |
D D/F♯ | G A | D D/F♯ | G A |
D D/F♯ | G A | D D/F♯ | G A |
D D/F♯ | G A | D D/F♯ | G A |
[Pre]
Em A | D | Em A | Em A |
Bm | Em A | D D/F♯ |
[Chorus]
G A | D D/F♯ | G A | D D/F♯ |
G A | D D/F♯ | G A | Bm A |
G D/F♯ | Em A | D |
[Interlude]
D D/F♯ | G A | D D/F♯ | G A |
D D/F♯ | G A | D D/F♯ | G A |
[Chorus 2]
D D/F♯ | G A | D D/F♯ | G A |
D D/F♯ | G A | D D/F♯ | G A |
[Outro]
Bm A | G D/F♯ | Em A | D |
Bm A | G D/F♯ | Em A | D |
Bm A | G D/F♯ | Em A | D |`,

`title: Photograph
by: Ed Sheeran
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 108
key: E
form: Intro Verse Pre Chorus Verse Pre Chorus 2 Bridge Chorus 2 Outro
[Intro]
E C♯m | B A |
[Verse]
E | C♯m | B A | E |
C♯m | B A |
[Pre]
C♯m A | E B | C♯m | A |
E B |
[Chorus]
E | B | C♯m A | E |
[Chorus 2]
E | B | C♯m A | E |
B | C♯m A |
[Bridge]
C♯m | A | E | B |
[Outro]
E | B C♯m | A | A |`,

`title: Just The Way You Are
by: Bruno Mars
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 109
key: F
form: Intro Verse Chorus Verse Chorus Interlude Chorus
[Intro]
F Dm7 | B♭ F |
[Verse]
F | Dm7 | B♭ F | F |
Dm7 | B♭ F |
[Chorus]
F Dm7 | B♭ F | F Dm7 | B♭ F |
[Interlude]
F Dm7 | B♭ F |`,

`title: When I Was Your Man
by: Bruno Mars
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 73
key: C
form: Intro Verse Pre Chorus Verse Pre Chorus 2 Bridge Chorus 3
[Intro]
D7 Dm7 | C | D7 Dm7 | C G/B |
[Verse]
Am C | Dm | G G7 | C Em/B |
Am C | Dm | G C |
[Pre]
Em/B Am | Em | B♭ C/G |
[Chorus]
G F | G C | F G | C |
F G | Am | D7 F | Fm C |
F C | Em/B |
[Chorus 2]
G F | G C | F G | C |
F G | Am | D7 F | Fm C |
[Bridge]
F G | C G/B | Am Em/G | D7 |
Dm7 | G |
[Chorus 3]
F G | C | F G | C |
F G | Am | D7 F | Fm C |
D7 F | Fm C |`,

`title: Uptown Funk
by: Mark Ronson ft. Bruno Mars
genre: Pop
feel: Funk
source: Ultimate Guitar chord chart
tempo: 115
key: C
form: Intro Verse Pre Chorus Verse 2 Pre Chorus Bridge Chorus Outro
[Intro]
Dm G7 | Dm G7 | Dm G7 | Dm |
[Verse]
Dm G7 | Dm | G7 | Dm |
G7 | Dm | G7 | Dm |
G7 | Dm | G7 | Dm |
G7 | Dm | G7 |
[Pre]
Dm | Dm | Dm | Dm |
D5 E♭5 | E5 F5 | F♯5 G5 | A♭5 A5 |
B♭5 B5 | C5 D♭5 | Dm |
[Chorus]
Dm G7 | Dm G7 | Dm G7 | Dm G7 |
Dm | Dm | Dm | G7 |
[Verse 2]
Dm | G7 | Dm | G7 |
Dm G7 | Dm | G7 | Dm |
G7 | Dm | G7 | Dm |
G7 | Dm | G7 |
[Bridge]
Dm G7 | Dm | G7 | Dm G7 |
Dm G7 | Dm G7 | Dm G7 | Dm |
G7 | Dm | G7 | Dm |
G7 | Dm | G7 |
[Outro]
Dm G7 | Dm G7 | Dm G7 | Dm G7 |`,

`title: That's What I Like
by: Bruno Mars
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 134
key: B♭m
form: Intro Verse Verse 2 Pre Chorus Verse 3 Verse 4 Pre Chorus Bridge Chorus 2
[Intro]
E♭m9 |
[Verse]
E♭m9 | E♭m9 | G♭M7/A♭ A♭7 | A♭7 |
Fm7 | Fm7 | A♭6/B♭ | A♭6/B♭ B♭7 |
[Verse 2]
E♭m9 | E♭m7 | G♭M7/A♭ A♭7 | A♭7 |
Fm7 | Fm7 | A♭6/B♭ | A♭6/B♭ B♭7 |
[Pre]
E♭m9 Fm7 | A♭m7 | G♭M7 | E♭m9 Fm7 |
B♭m7 A♭ | F7♯5♯9 |
[Chorus]
E♭m9 | G♭M7/A♭ A♭7 | Fm7 | A♭6/B♭ |
E♭m9 | G♭M7/A♭ A♭7 | Fm7 | B♭m7 A♭ |
G♭ Fm7 |
[Verse 3]
E♭m9 | E♭m9 | G♭M7/A♭ A♭7 | A♭7 Fm7 |
Fm7 | A♭6/B♭ E♭m9 |
[Verse 4]
E♭m9 | E♭m7 | G♭M7/A♭ A♭7 | A♭7 |
Fm7 | A♭6/B♭ B♭7 |
[Bridge]
G♭M7 G♭M7/E♭ | G♭M9 | Fm7 A♭6/B♭ | G♭M7 G♭M7/E♭ |
Fm7 A♭m7 | D♭ | G♭M7 F7 | F G° |
A° B♭m7 | E♭m9 F7♯5♯9 | B♭m A♭ | F7♯5♯9 |
[Chorus 2]
E♭m9 | G♭M7/A♭ A♭7 | Fm7 | A♭6/B♭ |
E♭m9 | G♭M7/A♭ A♭7 | Fm7 | B♭m A♭ |
F7♯5♯9 |`,

`title: Locked Out of Heaven
by: Bruno Mars
genre: Pop
feel: Reggae-rock
source: Ultimate Guitar chord chart
tempo: 144
key: F
form: Intro Verse Pre Chorus Interlude Verse Pre Chorus Bridge Chorus Outro
[Intro]
C Dm | C B♭ | F Gm |
[Verse]
C Dm | C B♭ | F Gm | C Dm |
C B♭ | F Gm | C Dm | C B♭ |
F Gm | C Dm | C B♭ | F Gm |
[Pre]
C Dm | C B♭ | F Gm | F A |
[Chorus]
B♭ | Gm | F | C |
B♭ | Gm | F | C |
[Interlude]
C Dm | C B♭ | F Gm | C Dm |
C B♭ | F Gm |
[Bridge]
B♭ Gm | F | C | B♭ Gm |
F | C |
[Outro]
C Dm | C B♭ | F Gm | C Dm |
C B♭ | F Gm | C Dm |`,

`title: Leave The Door Open
by: Silk Sonic
genre: Pop
feel: 70s soul
source: Ultimate Guitar chord chart
tempo: 74
key: Am
form: Verse Intro Verse 2 Verse 2 Pre Chorus Verse 3 Pre Chorus Bridge Chorus 2 Outro
[Verse]
Fmaj7 G/F | Em7 Am7 | E7 | E♭maj7 A♭add9 |
A♭maj7 Gm7 | Fm7 G7sus4 | Cmaj7 A7 | F♯add9 F7sus4 |
F♯ A♭ | A♭7sus4 | F♯maj7 A♭7 | Fm7 B♭m7 |
D♭maj7 B♭7 | A |
[Intro]
Fmaj7 G/F | Em7 Am7 |
[Verse 2]
Fmaj7 | G/F | Em7 | Am7 |
[Pre]
E♭maj7 | A♭add9 | A♭maj7 Gm7 | Fm7 G7sus4 |
[Chorus]
Fmaj7 | G/F | Em7 | Am7 |
Fmaj7 | G7sus4 | Cmaj7 A7 |
[Verse 3]
Fmaj7 | G/F | Em7 | Am7 |
Fmaj7 | G/F | Em7 E7 | Am7 |
[Bridge]
A♭add9 G7sus4 | A♭add9 G7sus4 | F♯add9 F7sus4 | F♯ A♭ |
A♭7sus4 A♭ |
[Chorus 2]
A♭ F♯maj7 | A♭/F♯ | Fm7 B♭m7 | F♯maj7 |
A♭7sus4 | D♭maj7 B♭7 |
[Outro]
A A♭ | D♭maj7 B♭7 | A A♭ | D♭maj7 |
B♭7 | A A♭ | D♭maj7 | B♭7 |
A |`,

`title: Grenade
by: Bruno Mars
genre: Pop
feel: Pop ballad
source: Ultimate Guitar chord chart
tempo: 110
key: Dm
form: Verse Chorus Chorus 2 Interlude Verse 2 Chorus Chorus 2 Bridge Chorus 2 Outro
[Verse]
Dm | Dm | Am | Am |
Dm | Dm | Am | A7 |
[Chorus]
Dm | Am | Dm | B♭ A |
[Chorus 2]
Dm B♭ | F | C Dm | B♭ F |
C Dm | B♭ F | C Dm | B♭ F |
C B♭ | C | F A | Dm |
C B♭ | A |
[Interlude]
Dm Am |
[Verse 2]
Dm | Am | Dm | Am A7 |
[Bridge]
Gm | Dm | Gm | A |
Dm B♭ | A |
[Outro]
Dm | Am | Dm | Am |`,

`title: Someone Like You
by: Adele
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 67
key: A
[Intro]
A C♯m/G♯ | F♯m D |
[Verse]
A C♯m/G♯ | F♯m D | A C♯m/G♯ | F♯m D |
A C♯m/G♯ | F♯m D |
[Pre]
Eadd9 F♯m7 | D | Eadd9 F♯m7 | D Eadd9/D |
D |
[Chorus]
A E | F♯m D | A E | F♯m D |
A E | F♯m D | A E | F♯m D |
A E | F♯m D |
[Verse 2]
A C♯m/G♯ | F♯m D | A C♯m/G♯ | F♯m D |
[Pre 2]
Eadd9 F♯m7 | D | Eadd9 F♯m7 | D Eadd9/D |
D Bm6/D |
[Chorus 2]
A E | F♯m D | A E | F♯m D |
A E | F♯m D | A E | F♯m D |
[Bridge]
E | F♯m | D Bm | A D |
E |
[Chorus 3]
A E/G♯ | F♯m D | A E/G♯ | F♯m D |
A E | F♯m D | A E/G♯ | F♯m D |
[Chorus 4]
A E | F♯m D | A E/G♯ | F♯m D |
A E | F♯m D | A E | F♯m D |
A E | F♯m D |
[Outro]
E A |`,

`title: Hello
by: Adele
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 79
key: A♭
form: Verse Intro Verse 2 Verse 3 Pre Chorus Verse 3 Pre Chorus 2 Bridge Chorus 3
[Verse]
Fm A♭ | E♭ D♭ | Cm |
[Intro]
Fm A♭ | E♭ D♭ |
[Verse 2]
Fm A♭ | E♭ D♭ | Fm A♭ | E♭ |
D♭ Fm | A♭ E♭ | D♭ | Fm A♭ |
E♭ D♭ |
[Verse 3]
Fm A♭ | E♭ D♭ | Fm A♭ | E♭ D♭ |
Fm A♭ | E♭ D♭ | Fm A♭ | E♭ D♭ |
[Pre]
Fm E♭ | Cm D♭ | Fm E♭ | D♭ |
[Chorus]
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm A♭ | E♭ D♭ |
[Chorus 2]
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ |
[Bridge]
E♭ A♭ | Fm D♭ | E♭ A♭ | Fm D♭ |
E♭ A♭ | Fm D♭ | E♭ A♭ |
[Chorus 3]
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |
Fm A♭ | E♭ D♭ | Fm |`,

`title: Easy On Me
by: Adele
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 71
key: F
[Verse]
F Dm7 | Am B♭maj7 | C F | Dm7 |
Am | B♭maj7 B♭ | B♭maj7 |
[Chorus]
C F | Dm7 C | Am Gm7 | F B♭maj7 |
C | F Dm7 | C | Am Gm7 |
F B♭maj7 | F Dm7 | Am B♭maj7 |
[Verse 2]
C F | Dm7 | Am | B♭maj7 |
C F | Dm7 | Am | B♭maj7 |
B♭maj7 |
[Chorus 2]
C F | Dm7 C | Am Gm7 | F B♭maj7 |
F Dm7 | C | Am Gm7 | F B♭maj7 |
F Dm7 | Am B♭maj7 |
[Bridge]
F Dm7 | Am | B♭maj7 | B♭maj7 |
[Outro]
C F | Dm7 C | Am Gm7 | F B♭maj7 |
F Dm7 | C | Am Gm7 | F B♭maj7 |
F Dm7 | Am B♭maj7 |`,

`title: Set Fire to the Rain
by: Adele
genre: Pop
feel: Pop ballad
source: Ultimate Guitar chord chart
tempo: 108
key: Dm
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Bridge Chorus 2 Outro
[Intro]
Dm F | C Gm |
[Verse]
Dm F | C Gm | Dm F | C Gm |
Dm F | C Gm | Dm F | C |
[Pre]
B♭ Gm | Dm | B♭ C |
[Chorus]
Dm Dm/E | Dm | C C/D | C |
Gm | Gm B♭ | Dm C |
[Verse 2]
Dm F | C Gm | Dm F | C |
[Chorus 2]
Dm Dm/E | Dm | C C/D | C |
Gm | Gm B♭ | Dm C | Dm Dm/E |
Dm | C C/D | C | Gm |
Gm B♭ | Dm C |
[Bridge]
B♭ F/A | Am C | B♭ F/A | Am C |
[Outro]
Dm C | Gm Dm | C | Dm C |
Gm B♭ | C |`,

`title: Skyfall
by: Adele
genre: Pop
feel: Orchestral ballad
source: Ultimate Guitar chord chart
tempo: 76
key: Cm
form: Verse Intro Verse 2 Verse 2 Chorus Verse 3 Chorus 2 Bridge Chorus 3
[Verse]
Cm | Cm/B♭ | A♭ | A♭/G |
G | Gsus | F | F/E♭ |
Fm | Fm7/C | Csus2/E♭ | Dm7♭5 |
Gsus/D |
[Intro]
Cm A♭ | F Fm | Csus2/E♭ Gsus | G |
[Verse 2]
Cm A♭ | F7 | Fm7 Cm | A♭ F7 |
Fm7 Cm | A♭ F7 | Fm7 Csus2/E♭ | Gsus G |
[Chorus]
Cm | Cm/B♭ A♭ | A♭/G F | F/E♭ Dm7♭5 |
Gsus G | Cm | Cm/B♭ A♭ | A♭/G F |
F/E♭ Dm7♭5 | Gsus G | Cm A♭ | F |
Fm Cm | A♭ F | Fm |
[Verse 3]
Cm A♭ | F7 | Fm7 Cm | A♭ F7 |
Fm7 Cm | A♭ | F7 Fm7 | Csus2/E♭ Gsus |
G |
[Chorus 2]
Cm | Cm/B♭ A♭ | A♭/G F | F/E♭ Dm7♭5 |
Gsus G | Cm | Cm/B♭ A♭ | A♭/G F |
F/E♭ Dm7♭5 | Gsus G | Cm |
[Bridge]
Fm7/C | Gsus/D Csus2/E♭ | F Cm | Cm/B♭ A♭ |
A♭/G F | F/E♭ Dm7♭5 | G |
[Chorus 3]
Cm | Cm/B♭ A♭ | A♭/G F | F/E♭ Dm7♭5 |
Gsus G | Cm | Cm/B♭ A♭ | A♭/G F |
F/E♭ Dm7♭5 | Gsus G | Cm | Cm/B♭ A♭ |
A♭/G F | F/E♭ Dm7♭5 | Gsus G | Cm Cm/B♭ |
A♭ A♭/G | F G/E♭ | Csus2 |`,

`title: Love Story
by: Taylor Swift
genre: Pop
feel: Country pop
source: Ultimate Guitar chord chart
tempo: 119
key: D
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Interlude Bridge Chorus 3 Outro
[Intro]
D A | Bm G |
[Verse]
D | G | Bm G | D |
G | Bm | A |
[Pre]
G A | Bm D | G | A Bm |
G A |
[Chorus]
D | A | Bm | G A |
D |
[Verse 2]
D | G | Bm | A |
[Chorus 2]
D | A | Bm | G A |
D | A | Bm | G A |
[Interlude]
D A | Bm G | A |
[Bridge]
Bm G | D A | Bm G | D A |
[Chorus 3]
D | A | Bm | G A |
E | B | C♯m | A B |
E |
[Outro]
B C♯m | A E |`,

`title: Shake It Off
by: Taylor Swift
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 160
key: G
form: Intro Verse Pre Chorus Verse Pre 2 Chorus Post Bridge Chorus Post 2
[Intro]
G |
[Verse]
Am | C | G | Am |
C | G |
[Pre]
Am | C | G | G |
[Chorus]
Am | C | G | Am |
C | G |
[Pre 2]
Am | C | G |
[Post]
Am | C | G |
[Bridge]
Am C | G | G | Am C |
G |
[Post 2]
Am | C | G | Am |
C | G | Am | C |
G |`,

`title: Blank Space
by: Taylor Swift
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 96
key: F
[Verse]
C7sus4 |
[Verse 2]
F | Dm | B♭ | C7sus4 C |
F | Dm | B♭ | C |
B♭ C |
[Chorus]
F Dm | Gm | B♭ | F |
F | Dm | Gm | B♭ |
B♭ F |
[Verse 3]
F | Dm | B♭ | C7sus4 C |
F | Dm | B♭ | C |
B♭ |
[Chorus 2]
F Dm | Gm | B♭ | F |
F | Dm | Gm | B♭ |
B♭ |
[Bridge]
F | F | F |
[Chorus 3]
F Dm | Gm | B♭ | F |
Dm | Gm | B♭ | B♭ |`,

`title: Anti-Hero
by: Taylor Swift
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 97
key: E
form: Verse Pre Chorus Interlude Verse 2 Pre 2 Chorus Interlude Bridge Chorus Outro
[Verse]
A E | B C♯m | A E | B C♯m |
A E | B | C♯m A | E B |
C♯m |
[Pre]
A E | B | C♯m A | E B |
C♯m | A E | B | C♯m A |
E B | C♯m |
[Chorus]
A E | B C♯m | A E | B C♯m |
A E | B | C♯m | A E |
B C♯m |
[Interlude]
A E | B C♯m |
[Verse 2]
A E | B C♯m | A E | B C♯m |
A E | B C♯m | A E | B C♯m |
[Pre 2]
A E | B C♯m | A | E B |
C♯m | A E | B | C♯m A |
E B | C♯m |
[Bridge]
A E | B C♯m | A E | B C♯m |
A E | B C♯m | A E | B C♯m |
A E | B C♯m | A E | B C♯m |
A E | B C♯m | A E | B C♯m |
[Outro]
A E | B C♯m |`,

`title: Cruel Summer
by: Taylor Swift
genre: Pop
feel: Synth pop
source: Ultimate Guitar chord chart
tempo: 170
key: A
form: Verse Intro Verse 2 Pre Chorus Verse 3 Pre Chorus Bridge Chorus Outro
[Verse]
D A | E C♯m | C♯m F♯m | F♯m D |
[Intro]
A |
[Verse 2]
D E | C♯m F♯m | D E | C♯m F♯m |
[Pre]
D E | C♯m F♯m | D | E |
[Chorus]
A | C♯m | F♯m | D |
A | C♯m | F♯m | D A |
[Verse 3]
D E | C♯m | F♯m | D E |
C♯m | F♯m |
[Bridge]
A | C♯m | F♯m | D |
A | C♯m | F♯m | D |
[Outro]
A | C♯m | F♯m | D |
A | C♯m | F♯m | D A |`,

`title: All Too Well
by: Taylor Swift
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 93
key: C
form: Intro Verse Interlude Verse Pre Chorus Verse Pre Chorus Interlude 2 Bridge Interlude Verse 2 Chorus 2
[Intro]
C G | Am F | C G | Am F |
[Verse]
C G | Am F | C G | Am F |
[Interlude]
C G | Am F |
[Pre]
C G | Am G | F G | Am F |
[Chorus]
C G | Am F | C G | Am F |
[Interlude 2]
C G | Am F | G |
[Bridge]
C G | Am F | C G | Am F |
C G | Am F | C G | Am F |
[Verse 2]
C G | Am F | C G | Am F |
C G | Am F | C G | Am F |
[Chorus 2]
C G | Am F | C G | Am F |
C G | Am F | C G | Am F |`,

`title: cardigan
by: Taylor Swift
genre: Pop
feel: Indie folk
source: Ultimate Guitar chord chart
tempo: 130
key: E♭
form: Verse Pre Chorus Verse 2 Pre 2 Chorus 2 Interlude Verse 3 Bridge Chorus 2 Intro
[Verse]
Fm B♭ | A♭ | B♭ | Fm B♭ |
A♭ | B♭ |
[Pre]
E♭ B♭ | A♭ | B♭ |
[Chorus]
Fm B♭ | A♭ | B♭ |
[Verse 2]
Fm B♭ | A♭ | B♭ |
[Pre 2]
E♭ | B♭ | A♭ | B♭ |
[Chorus 2]
A♭ Cm | E♭ | A♭ |
[Interlude]
A♭ Cm | B♭ A♭ |
[Verse 3]
A♭ | Cm | B♭ | A♭ |
E♭ | B♭ | A♭ | B♭ |
E♭ | B♭ A♭ | B♭ |
[Bridge]
E♭ | B♭ | A♭ | B♭ |
E♭ | B♭ | A♭ | B♭ |
Fm | B♭ | A♭ | B♭ |
[Intro]
Fm B♭ | A♭ B♭ | E♭ B♭ | A♭ B♭ |
A♭ Cm | E♭ A♭ | A♭ Cm | E♭ A♭ |
A♭ Cm | E♭ A♭ | Fm B♭ | A♭ B♭ |`,

`title: Lover
by: Taylor Swift
genre: Pop
feel: Waltz-time ballad
source: Ultimate Guitar chord chart
tempo: 69
key: G
form: Intro Verse Chorus Verse Chorus 2 Bridge Chorus 3
[Intro]
G D/F♯ | C | G D/F♯ | Em D |
C |
[Verse]
G D | C | G D | C |
G D | C | G D | C |
[Chorus]
G D | C | G D | C |
G D | C | G D/F♯ | Em D |
C | G D/F♯ | C |
[Chorus 2]
G D | C | G D | C |
G D | C | G D/F♯ | Em D |
C |
[Bridge]
G D/F♯ | Em G7/F | C Em/B | Am D |
G D/F♯ | Em G7/F | C Em/B | Am D |
G G7/F | C | Am D |
[Chorus 3]
G D | C | G D | C |
G D | C | G D/F♯ | Em D |
C | G D/F♯ | Em D | C |
G D/F♯ | Em D | C |`,

`title: Ocean Eyes
by: Billie Eilish
genre: Pop
feel: Dream pop
source: Ultimate Guitar chord chart
tempo: 145
key: G
form: Intro Verse Chorus Verse Chorus Interlude Chorus
[Intro]
C Dsus2 | Em | G G/B | C |
[Verse]
C Dsus2 | Em C | Dsus2 Em | C Dsus2 |
Em G | G/B C | C Dsus2 | Em C |
Dsus2 Em | C Dsus2 | Em G | G/B C |
G G/B | C |
[Chorus]
C Dsus2 | Em C | Dsus2 Em | C Dsus2 |
Em | G G/B | C | C Dsus2 |
Em C | Dsus2 Em | C Dsus2 | Em |
G G/B | C | G G/B | C |
[Interlude]
C Dsus2 | Em | G G/B | C |
C Dsus2 | Em | G G/B | C G |
G/B C |`,

`title: everything i wanted
by: Billie Eilish
genre: Pop
feel: Slow pop
source: Ultimate Guitar chord chart
tempo: 120
key: A
form: Intro Verse Pre Chorus Verse 2 Pre Chorus Bridge
[Intro]
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
[Verse]
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
[Pre]
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
Dmaj7 |
[Chorus]
E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
Dmaj7 E | C♯7 Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
[Verse 2]
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |
Dmaj7 E | C♯m Dmaj7 |
[Bridge]
Dmaj7 E | C♯m | Dmaj7 | Dmaj7 E |
C♯m | Dmaj7 | Dmaj7 E | C♯7 |
Dmaj7 | Dmaj7 E | C♯m | Dmaj7 |
Dmaj7 E | C♯m Dmaj7 | Dmaj7 E | C♯m Dmaj7 |`,

`title: Happier Than Ever
by: Billie Eilish
genre: Pop
feel: Ballad into rock
source: Ultimate Guitar chord chart
tempo: 81
key: C
[Verse]
G G6 | G7 |
[Verse 2]
C C/G | C C/G | E7 | Am Am/E |
Am Am/E | Dm7♭5 |
[Chorus]
Cadd9 | E7 | Am | Dm7 G |
Cadd9 | E7 | Am | Dm7 G |
[Verse 3]
C | E7 | Am | Dm7♭5 |
C | E7 | Am | Dm7♭5 |
E7 | Am Am/G | D/F♯ | Dm7 G7 |
[Chorus 2]
Cadd9 | E7 | Am | Dm7 G |
C |
[Interlude]
C E7 | Am F | Fm |
[Verse 4]
C E7 | Am | F Fm | C E7 |
Am | F Fm | C E7 | Am F |
C E7 | Am F |
[Bridge]
C E7 | Am F | C E7 | Am F |
C E7 | Am F | C E7 | Am F |
C E7 | Am F |
[Outro]
C E7 | Am F | C E7 | Am F |
C E7 | Am F | C E7 | Am F |
Fm C |`,

`title: lovely
by: Billie Eilish, Khalid
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 115
key: Em
form: Intro Verse Pre Chorus Verse Pre Chorus 2 Outro
[Intro]
Em | C Em | Bm | C Em |
Bm |
[Verse]
C | Em Bm | C | Em Bm |
[Pre]
C Em | Bm | C Em | Bm |
C Em | Bm | C Em | Bm |
[Chorus]
C | Em Bm | C | Em Bm |
C |
[Chorus 2]
C | Em Bm | C | Em Bm |
[Outro]
C Em | Bm | C Em | Bm |
C Em | Bm | C Em | Bm Cmaj7/E |`,

`title: bad guy
by: Billie Eilish
genre: Pop
feel: Dark pop
source: Ultimate Guitar chord chart
tempo: 135
key: Gm
form: Verse Intro Verse 2 Chorus Post Verse 3 Chorus Post 2 Interlude Outro
[Verse]
Gm | Cm | D7 |
[Intro]
Gm Cm | D7 |
[Verse 2]
Gm | Cm D7 | Gm | Cm D7 |
[Chorus]
Gm | Cm | D7 |
[Post]
Gm Cm | D7 |
[Verse 3]
Gm | Cm D7 |
[Post 2]
Gm Cm | D7 | Gm Cm | D7 |
[Interlude]
Gm | Gm | Gm |
[Outro]
Gm | Gm | Gm |`,

`title: good 4 u
by: Olivia Rodrigo
genre: Pop
feel: Pop punk
source: Ultimate Guitar chord chart
tempo: 167
key: E
form: Intro Verse Chorus Interlude Verse 2 Chorus Interlude 2 Bridge Chorus 2 Interlude Outro
[Intro]
F♯m E | F♯m E |
[Verse]
F♯m E | F♯m E | F♯m E | D C♯7 |
F♯m E | F♯m E | F♯m E | D C♯7 |
[Chorus]
D A | E | F♯m E | D |
A | E | F♯m E | D |
A | E | F♯m E | D |
A E | F♯m E |
[Interlude]
F♯m E | B | F♯m E | B |
[Verse 2]
E | F♯m E | F♯m E | D C♯7 |
F♯m E | F♯m E | F♯m | E |
D C♯7 |
[Interlude 2]
F♯m E | B | F♯m E | B |
D A | E F♯m | E | D A |
E F♯m | E |
[Bridge]
F♯m E | B | F♯m E | B |
F♯m E | B | F♯m E | B |
F♯m E | B | F♯m E | B |
F♯m E | B | F♯m E | B |
[Chorus 2]
D A | E | F♯m E | D |
A | E | D | A |
E | F♯m E | D | A E |
F♯m E |
[Outro]
F♯m E | B F♯m |`,

`title: traitor
by: Olivia Rodrigo
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 101
key: E♭
form: Verse Intro Verse 2 Pre Chorus Verse 3 Pre Chorus Bridge Chorus 2 Outro
[Verse]
E♭ | B♭ | Cm | A♭maj7 |
A♭m |
[Intro]
E♭ B♭ | Cm A♭maj7 | E♭ D° | Cm A♭maj7 |
[Verse 2]
E♭ Gm | Cm A♭maj7 | E♭ Gm | Cm A♭maj7 |
[Pre]
E♭ | Gm | Cm A♭maj7 | E♭ |
Gm | Cm A♭maj7 |
[Chorus]
E♭ | Gm Cm | A♭maj7 | E♭ |
Gm | Cm | A♭maj7 | E♭ |
Gm | Cm |
[Verse 3]
E♭ | Gm | Cm A♭maj7 | E♭ |
Gm | Cm A♭maj7 |
[Bridge]
E♭ Gm | Cm | A♭maj7 | E♭ Gm |
Cm | A♭maj7 |
[Chorus 2]
E♭ | Gm Cm | A♭maj7 | E♭ |
Gm | Cm | A♭maj7 | E♭ |
Gm | Cm | A♭maj7 E♭ | Gm Cm |
A♭maj7 |
[Outro]
E♭ Gm | Cm | A♭m |`,

`title: Blinding Lights
by: The Weeknd
genre: Pop
feel: Synthwave
source: Ultimate Guitar chord chart
tempo: 171
key: E♭
form: Verse Intro Verse 2 Pre Chorus Interlude Verse 3 Pre Chorus 2 Bridge Chorus 3 Interlude 2 Outro
[Verse]
Fm | Cm | E♭ | B♭ |
[Intro]
Fm Cm | E♭ B♭ |
[Verse 2]
B♭ B♭/A♭ | B♭/G Fm | Cm | E♭ B♭ |
Fm | Cm | E♭ B♭ |
[Pre]
Fm Cm | E♭ |
[Chorus]
Fm Cm | E♭ B♭ | B♭/A♭ B♭/G | Fm Cm |
E♭ B♭ | B♭/A♭ B♭/G |
[Interlude]
Fm Cm | E♭ B♭ |
[Verse 3]
B♭ B♭/A♭ | B♭/G Fm | Cm | E♭ B♭ |
[Chorus 2]
Fm Cm | E♭ B♭ | B♭/A♭ B♭/G | Fm Cm |
E♭ B♭ | B♭/A♭ |
[Bridge]
B♭/G Fm | Cm | E♭ B♭ |
[Chorus 3]
B♭/A♭ B♭/G | Fm Cm | E♭ B♭ |
[Interlude 2]
Fm Cm | E♭ B♭ | B♭/A♭ B♭/G | Fm Cm |
E♭ B♭ |
[Outro]
B♭/A♭ B♭/G | Fm Cm | E♭ B♭ |`,

`title: Save Your Tears
by: The Weeknd
genre: Pop
feel: 80s pop
source: Ultimate Guitar chord chart
tempo: 118
key: C
form: Intro Verse Pre Verse Pre Chorus Verse Pre Chorus 2 Pre Chorus 3 Outro
[Intro]
C |
[Verse]
C Am | Em | G | C Am |
Em | G |
[Pre]
C Am | Em G | C Am | Em G |
[Chorus]
Dm Am | F | G | C Am |
Em G | C Am | Em G |
[Chorus 2]
Dm Am | F | G | Dm Am |
F | G | C Am | Em G |
C Am | Em G |
[Chorus 3]
C Am | Em G | C Am | Em G |
[Outro]
C Am | Em G | C Am | Em G |`,

`title: Die For You
by: The Weeknd
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 134
key: C♯m
form: Verse Intro Verse 2 Pre Chorus Verse 2 Pre 2 Chorus Bridge Chorus 2
[Verse]
A G♯m | C♯m F♯m |
[Intro]
A G♯m | C♯m F♯m | A G♯m | C♯m F♯m |
[Verse 2]
A | G♯m | C♯m | F♯m |
A | G♯m | C♯m | F♯m |
[Pre]
A | G♯m | C♯m | F♯m |
A | G♯m | C♯m | F♯m |
[Chorus]
A | G♯m | C♯m | F♯m |
A | G♯m | C♯m | F♯m |
[Pre 2]
A | G♯m | C♯m | F♯m |
[Bridge]
A | F♯m | G♯m | C♯m |
F♯m | A | F♯m | G♯m |
C♯m | F♯m |
[Chorus 2]
A | G♯m | C♯m | F♯m |
A | G♯m | C♯m | F♯m |
A G♯m | C♯m F♯m |`,

`title: Levitating
by: Dua Lipa
genre: Pop
feel: Disco pop
source: Ultimate Guitar chord chart
tempo: 103
key: Bm
form: Intro Verse Pre Chorus Verse Pre Chorus 2 Post Bridge Pre 2 Chorus 3 Post 2 Chorus 2
[Intro]
Bm F♯m | Em Bm |
[Verse]
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
[Pre]
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
[Chorus]
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
Bm F♯m | Em Bm |
[Chorus 2]
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
[Post]
Bm F♯m | Em | Bm | Bm F♯m |
Em Bm | Bm F♯m | Em | Bm |
Bm F♯m | Em | Bm |
[Bridge]
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
[Pre 2]
Bm F♯m | Em Bm | Bm F♯m |
[Chorus 3]
Bm F♯m | Em Bm | Bm F♯m | Em Bm |
[Post 2]
Bm F♯m | Em | Bm | Bm F♯m |
Em | Bm | Bm F♯m | Em |
Bm | Bm F♯m | Em |`,

`title: Don't Start Now
by: Dua Lipa
genre: Pop
feel: Nu-disco
source: Ultimate Guitar chord chart
tempo: 124
key: D
form: Verse Intro Verse 2 Pre Chorus Verse 3 Pre Chorus Bridge Pre 2 Chorus 2 Outro
[Verse]
Bm D | Gmaj7 Em | D Gmaj7 | A |
[Intro]
Bm D | Em |
[Verse 2]
Em Bm | Gmaj7 D | A Em | Bm |
Gmaj7 D | A | Em Bm | Gmaj7 D |
A |
[Pre]
Bm D | Em F♯m7 | Gmaj7 | Bm D |
Em F♯m7 | Gmaj7 |
[Chorus]
Em Bm | Gmaj7 D | A | Em Bm |
Gmaj7 D |
[Verse 3]
Em Bm | Gmaj7 D | A Em | Bm |
Gmaj7 D | Em Bm | Gmaj7 D | A |
[Bridge]
Em Bm | Gmaj7 | D A | Em Bm |
Gmaj7 D | A |
[Pre 2]
Bm D | Em F♯m7 | Gmaj7 | Bm D |
Em F♯m | Gmaj7 |
[Chorus 2]
Bm D | Em Gmaj7 | Bm D | Em Gmaj7 |
[Outro]
Bm D | Em | Gmaj7 | Bm D |
Em | Gmaj7 |`,

`title: Houdini
by: Dua Lipa
genre: Pop
feel: Dance pop
source: Ultimate Guitar chord chart
tempo: 117
key: Dm
form: Intro Chorus Verse Chorus Post Verse Chorus Post 2 Bridge Chorus 2 Outro
[Intro]
Dm Am | Dm | Dm Am | Dm Am |
[Chorus]
Dm Gm | Am | Dm Gm | Am Dm |
Dm Gm | Am Dm | Dm Gm | Am Dm |
[Verse]
Dm | Dm | Dm | Dm |
[Post]
Dm Gm | Am Dm | Dm Gm | Am Dm |
Gm Am | Dm | Dm Gm |
[Post 2]
Dm Gm | Am Dm | Dm Gm | Am Dm |
Gm Am | Dm | Dm Gm | B♭ C |
Am |
[Bridge]
B♭ | C Am | C |
[Chorus 2]
B♭ | C | Am | B♭ |
C | Am | C Dm |
[Outro]
Dm | Dm |`,

`title: As It Was
by: Harry Styles
genre: Pop
feel: Synth pop
source: Ultimate Guitar chord chart
tempo: 174
key: A
form: Intro Verse Chorus Verse Chorus Bridge Outro
[Intro]
Bm E | A |
[Verse]
D | Bm | E | A |
D | Bm | E | A |
[Chorus]
D Bm | E | A D | Bm E |
A D | Bm E | A |
[Bridge]
D | Bm | E | A |
[Outro]
Bm E | A | D Bm | E A |`,

`title: Watermelon Sugar
by: Harry Styles
genre: Pop
feel: Pop rock
source: Ultimate Guitar chord chart
tempo: 95
key: C
form: Verse Pre Chorus Verse Pre 2 Chorus 2 Pre 3 Bridge Chorus 2 Outro
[Verse]
Dm7 | Am7 | C G | Dm7 |
Am7 | C G |
[Pre]
Dm7 Am7 | C G | Dm7 Am7 | C G |
[Chorus]
Dm7 | Am7 | C |
[Pre 2]
Dm7 Am7 | C G |
[Chorus 2]
Dm7 | Am7 | C | G |
Dm7 | Am7 | C | G |
[Pre 3]
Dm7 | Am7 | C G |
[Bridge]
Dm7 | Am7 | C G | Dm7 |
Am7 |
[Outro]
Dm7 | Am7 | C G | Dm7 |
Am7 | C G |`,

`title: Adore You
by: Harry Styles
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 99
key: E♭
form: Verse Intro Verse 2 Pre Chorus Verse 3 Pre Chorus Bridge Chorus 2 Outro
[Verse]
Cm7 E♭ | A♭maj7 B♭ |
[Intro]
Cm7 E♭ | A♭maj7 B♭ |
[Verse 2]
Cm7 E♭ | A♭maj7 B♭ | Cm7 E♭ | A♭maj7 B♭ |
Cm7 E♭ | A♭maj7 | B♭ |
[Pre]
Cm7 | E♭ | A♭maj7 B♭ |
[Chorus]
Cm7 E♭ | A♭maj7 | B♭ | Cm7 E♭ |
A♭maj7 | B♭ Cm7 | E♭ | A♭maj7 B♭ |
[Verse 3]
Cm7 E♭ | A♭maj7 B♭ | Cm7 E♭ | A♭maj7 |
B♭ |
[Bridge]
Cm7 | E♭ | A♭maj7 | B♭ |
Cm7 | E♭ | A♭maj7 | B♭ |
[Chorus 2]
Cm7 E♭ | A♭maj7 | B♭ | Cm7 E♭ |
A♭maj7 | Cm7 | E♭ | A♭maj7 |
B♭ | Cm7 E♭ | A♭maj7 | B♭ |
[Outro]
Cm7 | E♭ | A♭maj7 |`,

`title: Sign of the Times
by: Harry Styles
genre: Pop
feel: Power ballad
source: Ultimate Guitar chord chart
tempo: 120
key: F
form: Verse Intro Verse 2 Pre Chorus Verse 3 Pre Chorus 2 Pre Bridge Outro
[Verse]
F Dm | C C7 | B♭ | C Am |
G G7 | F |
[Intro]
F Dm | C |
[Verse 2]
F | Dm | C | F |
Dm | C |
[Pre]
F | Dm | C | C7 |
F | Dm | C | C7 |
[Chorus]
F | Dm | C | C7 |
F | Dm | C | C7 |
[Verse 3]
F | Dm | C | F Dm |
C |
[Chorus 2]
F | Dm | C | F |
Dm | C | C7 |
[Bridge]
F | Dm | C B♭ | F |
Dm | C B♭ |
[Outro]
F | Dm | C | B♭ |
F | Dm | C | C7 |
F | Dm | C B♭ | F |`,

`title: Someone You Loved
by: Lewis Capaldi
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 110
key: D♭
form: Intro Verse Chorus Verse Chorus Bridge Chorus 2 Outro
[Intro]
D♭ A♭ | B♭m G♭ |
[Verse]
D♭ A♭ | B♭m G♭ | D♭ A♭ | B♭m G♭ |
D♭ A♭ | B♭m G♭ | D♭ A♭ | B♭m G♭ |
[Chorus]
D♭ A♭ | B♭m G♭ | D♭ A♭ | B♭m G♭ |
[Bridge]
E♭m B♭m | A♭ | E♭m7 | B♭m7 A♭ |
[Chorus 2]
D♭ A♭ | B♭m G♭ | D♭ A♭ | B♭m G♭ |
D♭ A♭ | B♭m G♭ | D♭ A♭ | B♭m G♭ |
[Outro]
D♭ A♭ | B♭m G♭ | D♭ |`,

`title: Before You Go
by: Lewis Capaldi
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 112
key: E♭
form: Intro Verse Pre Chorus Verse Pre Chorus 2 Bridge Chorus 3
[Intro]
E♭ |
[Verse]
E♭ | Cm | A♭ | B♭sus4 B♭ |
[Pre]
E♭ | Cm A♭ | B♭sus4 B♭ |
[Chorus]
E♭ | B♭ | Cm | A♭ |
E♭ | B♭ | Cm | A♭ |
B♭ | E♭ |
[Chorus 2]
E♭ | B♭ | Cm | A♭ |
E♭ | B♭ | Cm | A♭ |
B♭ | Cm |
[Bridge]
Cm A♭ | E♭ | B♭ Cm | A♭ B♭ |
B♭ E♭ |
[Chorus 3]
B♭ | Cm | A♭ | E♭ |
B♭ | Cm | A♭ | B♭ |
E♭ |`,

`title: All of Me
by: John Legend
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 120
key: A♭
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Pre 2 Chorus Outro
[Intro]
Fm D♭ | A♭ E♭ |
[Verse]
Fm D♭maj7 | A♭ | E♭ Fm | D♭ A♭ |
E♭ Fm | D♭maj7 A♭ | E♭ Fm | D♭add9 A♭ |
E♭ B♭madd9 |
[Pre]
B♭m A♭ | E♭ B♭madd9 | A♭ E♭ |
[Chorus]
A♭ | Fmadd9 | B♭m/D♭ | D♭/E♭ E♭ |
A♭ | Fmadd9 | B♭m/D♭ | D♭/E♭ E♭ |
Fm D♭ | A♭ E♭add9 | Fm D♭ | A♭ E♭add9 |
[Verse 2]
Fm D♭ | A♭ | E♭ Fm | D♭ A♭ |
E♭ Fm | D♭ A♭ | E♭ Fm | D♭ A♭ |
E♭ B♭m |
[Chorus 2]
A♭ | Fmadd9 | B♭m/D♭ | D♭/E♭ E♭ |
A♭ | Fmadd9 | B♭m/D♭ | D♭/E♭ E♭ |
Fm D♭ | A♭ E♭add9 | Fm D♭ | A♭ E♭add9 |
B♭m |
[Pre 2]
B♭m A♭ | E♭ B♭madd9 | B♭m A♭ | E♭ |
[Outro]
Fm D♭ | A♭ E♭ | Fm D♭ | A♭ E♭ |`,

`title: Stay With Me
by: Sam Smith
genre: Pop
feel: Gospel ballad
source: Ultimate Guitar chord chart
tempo: 84
key: C
form: Intro Verse Chorus Verse Chorus Bridge Chorus 2
[Intro]
Am7 F | C | Am7 F | C |
[Verse]
Am7 F | C | Am7 F | C |
Am7 F | C | Am7 Gsus | C |
[Chorus]
Am F | C | Am F | C |
G Am | F C | A♭° Am | F C |
[Bridge]
Am F | C | Am F | C |
G Am | F C | A♭° Am | F C |
[Chorus 2]
Am F | C | Am F | C |
G Am | F C | A♭° Am | F C |
Am F | C | Am F | C |
G Am | F C | A♭° Am | F C |`,

`title: I'm Not The Only One
by: Sam Smith
genre: Pop
feel: Soul ballad
source: Ultimate Guitar chord chart
tempo: 82
key: F
form: Intro Verse Verse Chorus Verse Chorus Bridge Chorus 2 Outro
[Intro]
F A | Dm B♭ | F A | Dm B♭ |
F A | Dm B♭ | F C | F |
[Verse]
F A | Dm B♭ | F A | Dm B♭ |
F A | Dm B♭ | F C | F |
[Chorus]
F A | Dm B♭ | F A | Dm B♭ |
F A | Dm C | B♭ | F C |
F B♭ |
[Bridge]
B♭ F | A Dm | C | B♭ F |
B♭/C |
[Chorus 2]
F A | Dm B♭ | F A | Dm B♭ |
F A | Dm C | B♭ | F C |
F | F A | Dm B♭ | F A |
Dm B♭ | F A | Dm C | B♭ |
F B♭ | F |
[Outro]
F A | Dm B♭ | F A | Dm B♭ |
F A | Dm C | B♭ | F C |
F |`,

`title: Treat You Better
by: Shawn Mendes
genre: Pop
feel: Pop rock
source: Ultimate Guitar chord chart
tempo: 82
key: B♭m
form: Intro Verse Chorus Verse 2 Chorus Interlude Bridge Chorus Outro
[Intro]
B♭m A♭ | G♭ |
[Verse]
B♭m A♭ | G♭ | B♭m A♭ | G♭ |
B♭m | A♭ | G♭ | B♭m |
A♭ | G♭ |
[Chorus]
B♭m A♭ | G♭ | D♭ | B♭m A♭ |
G♭ D♭ | B♭m | A♭ | G♭ D♭ |
B♭m A♭ | G♭ | D♭ |
[Verse 2]
B♭m A♭ | G♭ | B♭m A♭ | G♭ |
B♭m A♭ | G♭ | B♭m A♭ | G♭ |
[Interlude]
B♭m A♭ | G♭ D♭ | B♭m A♭ | G♭ D♭ |
[Bridge]
B♭m A♭ | D♭ G♭ | B♭m A♭ | G♭ |
B♭m A♭ | D♭ G♭ | B♭m A♭ | G♭ |
[Outro]
B♭m A♭ | G♭ D♭ | B♭m A♭ | G♭ D♭ |
B♭m A♭ | G♭ D♭ |`,

`title: Señorita
by: Shawn Mendes, Camila Cabello
genre: Pop
feel: Latin pop
source: Ultimate Guitar chord chart
tempo: 117
key: Am
form: Verse Intro Chorus Verse 2 Chorus 2 Verse 3 Chorus 2 Outro
[Verse]
Am Cmaj7 | Fmaj7 Em7 | G | Am Cmaj7 |
Fmaj7 Em7 | G |
[Intro]
Am Cmaj7 | Fmaj7 Em7 | G |
[Chorus]
Am | Cmaj7 | Fmaj7 | Em7 |
G Am |
[Verse 2]
Cmaj7 | Fmaj7 | Em7 G | Am Cmaj7 |
Fmaj7 | Em7 G |
[Chorus 2]
Am | Cmaj7 | Fmaj7 | Em7 |
G | Am | Cmaj7 | Fmaj7 |
Em7 | G Am |
[Verse 3]
Cmaj7 | Fmaj7 | Em7 G | Am |
Cmaj7 |
[Outro]
Cmaj7 | Fmaj7 | Em7 G | Am |
Cmaj7 | Fmaj7 | Em7 | G Am |`,

`title: Attention
by: Charlie Puth
genre: Pop
feel: Funk pop
source: Ultimate Guitar chord chart
tempo: 100
key: E♭m
form: Intro Verse Pre Chorus Verse Pre Chorus Bridge Pre Chorus Outro
[Intro]
E♭m D♭ | B♭m B |
[Verse]
E♭m D♭ | B♭m B | E♭m D♭ | B♭m B |
[Pre]
E♭m D♭ | B♭m B | E♭m D♭ | B♭m B |
[Chorus]
E♭m | D♭ | B♭m B | E♭m |
D♭ | B♭m B |
[Bridge]
E♭m D♭ | B♭m B | E♭m D♭ | B♭m B |
[Outro]
E♭m D♭ | B♭m B | E♭m D♭ | B♭m B |`,

`title: See You Again
by: Wiz Khalifa ft. Charlie Puth
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 80
key: B♭
form: Intro Chorus Verse Chorus 2 Verse Bridge Chorus 3
[Intro]
Gm B♭ | E♭ B♭ | F | Gm B♭ |
E♭ B♭ |
[Chorus]
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
E♭ B♭ |
[Verse]
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
[Chorus 2]
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
E♭ B♭ | Gm B♭ | E♭ B♭ | Gm B♭ |
E♭ B♭ |
[Bridge]
Cm B♭ | F | Cm B♭ | F |
Cm B♭ | B♭ Gm | E♭ B♭ | F E♭ |
F B♭ |
[Chorus 3]
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
Gm B♭ | E♭ B♭ | Gm B♭ | E♭ B♭ |
E♭ B♭ | Gm B♭ | E♭ B♭ | Gm B♭ |
E♭ B♭ | Gm B♭ | E♭ B♭ | Gm B♭ |
E♭ B♭ |`,

`title: We Don't Talk Anymore
by: Charlie Puth
genre: Pop
feel: Tropical pop
source: Ultimate Guitar chord chart
tempo: 100
key: C♯m
form: Chorus Verse Pre Chorus 2 Verse Pre 2 Chorus 2 Chorus 3 Bridge Chorus 2 Interlude
[Chorus]
A | B | C♯m | G♯m |
A | B | C♯m | B |
[Verse]
A | B | C♯m G♯m | A |
B | C♯m G♯m |
[Pre]
A | B | C♯m | G♯m |
A | B | C♯m |
[Chorus 2]
A | B | C♯m | G♯m |
A | B | C♯m | G♯m |
[Pre 2]
A | B | C♯m G♯m | A |
B | C♯m |
[Chorus 3]
A B | C♯m G♯m | A B | C♯m G♯m |
[Bridge]
A | B | C♯m | G♯m |
A | B | C♯m |
[Interlude]
A | B | C♯m | G♯m |
A | B | C♯m | G♯m |`,

`title: Viva La Vida
by: Coldplay
genre: Pop
feel: Anthem
source: Ultimate Guitar chord chart
tempo: 138
key: Fm
form: Intro Verse Interlude Verse 2 Chorus Interlude Verse 2 Chorus Interlude 2 Chorus Outro
[Intro]
D♭ E♭add11 | A♭ Fm |
[Verse]
D♭ E♭add11 | A♭ Fm | D♭ E♭add11 | A♭ Fm |
[Interlude]
D♭ E♭add11 | A♭ Fm |
[Verse 2]
D♭ E♭add11 | A♭ Fm | D♭ E♭add11 | A♭ Fm |
D♭ E♭add11 | A♭ Fm | D♭ E♭add11 | A♭ Fm |
[Chorus]
D♭ E♭add11 | A♭ Fm | D♭ E♭add11 | A♭ Fm |
D♭ E♭add11 | A♭ Fm | D♭ E♭add11 | Cm Fm |
[Interlude 2]
D♭ Fm | E♭add11 | D♭ E♭add11 | A♭ Fm |
D♭ E♭add11 | A♭ Fm |
[Outro]
D♭ E♭add11 | Cm Fm | D♭ E♭add11 | Cm Fm |`,

`title: Paradise
by: Coldplay
genre: Pop
feel: Anthem
source: Ultimate Guitar chord chart
tempo: 140
key: F
form: Intro Verse Chorus Interlude Verse 2 Pre Chorus 2 Interlude 2 Bridge Chorus 2 Interlude 3 Chorus 3 Outro
[Intro]
Gm C | Dm F | Gm C | Dm F |
Gm C | Dm F | B♭ F | C |
B♭ F | C | Gm B♭ | F C |
Gm B♭ | F C | Gm B♭ | F C |
Gm B♭ | F C |
[Verse]
Dm B♭ | F C/E | Dm B♭ | F C/E |
[Chorus]
Gm B♭ | F C/E | Gm B♭ | F C/E |
[Interlude]
Dm B♭ | F C | Dm B♭ | F C |
[Verse 2]
B♭ F/A | C | B♭ F/A | C |
Gm B♭ | F C | B♭ F |
[Pre]
B♭ F | C | B♭ F | C |
[Chorus 2]
Gm B♭ | F C | Gm B♭ | F C |
Gm B♭ | F C | Gm B♭ | F C |
[Interlude 2]
Gm C | Dm F | Gm C | Dm F |
Gm C | Dm F |
[Bridge]
B♭ F | C/E | B♭ F | C/E |
[Interlude 3]
Gm B♭ | F C | Gm B♭ | F C |
[Chorus 3]
Gm B♭ | F C | Gm B♭ | F C |
[Outro]
B♭ C | Dm | B° B♭ |`,

`title: A Sky Full of Stars
by: Coldplay
genre: Pop
feel: EDM pop
source: Ultimate Guitar chord chart
tempo: 125
key: F♯
form: Intro Verse Chorus Interlude Verse Chorus 2 Interlude 2 Outro
[Intro]
D♯m B | F♯ A♯m |
[Verse]
D♯m B | F♯ A♯m | D♯m B | F♯ A♯m |
D♯m B | F♯ A♯m | D♯m B | F♯ A♯m |
[Chorus]
D♯m B | F♯ A♯m | D♯m B | F♯ A♯m |
D♯m B | F♯ A♯m | D♯m B | F♯ A♯m |
[Interlude]
D♯m B | F♯ A♯m |
[Chorus 2]
D♯m B | F♯ A♯m | D♯m B | F♯ A♯m |
D♯m B | F♯ A♯m | D♯m B | F♯ A♯m |
D♯m B | A♯m |
[Interlude 2]
D♯m B | F♯ A♯m | B C♯ | D♯m F♯ |
[Outro]
B C♯ | D♯m F♯ | B C♯ | D♯m F♯ |
B C♯ | D♯m F♯ | B C♯ | D♯m F♯ |`,

`title: Something Just Like This
by: The Chainsmokers & Coldplay
genre: Pop
feel: EDM pop
source: Ultimate Guitar chord chart
tempo: 103
key: Bm
form: Verse Intro Verse 2 Pre Chorus Verse 2 Pre Chorus Pre 2 Interlude Outro
[Verse]
G | A | D/F♯ |
[Intro]
G A | Bm A | G A | Bm |
[Verse 2]
A G | A Bm | A G | A Bm |
A G | A Bm | A G | A Bm |
[Pre]
A G | A Bm | A G | A Bm |
A G | A Bm | A G | A Bm |
[Chorus]
A G | A Bm | A G | A Bm |
A G | A Bm | A G | A Bm |
A G | A Bm | A G | A Bm |
A G | A Bm | A G | A Bm |
[Pre 2]
D/F♯ G | A Bm | D/F♯ G | A Bm |
D/F♯ G | A Bm | D/F♯ G | A Bm |
D/F♯ G |
[Interlude]
G A | Bm Bsus4 | G D | A D |
A | D/F♯ A | Bm Bsus4 | G D |
A |
[Outro]
G A | Bm Dmaj7 | G A | Bm Dmaj7 |
G A | Bm Dmaj7 | G A | Bm |
A G | A Bm | Dmaj7 | G A |
Bm Dmaj7 | G A | Bm Dmaj7 | G A |
Bm | A G | A Bm | Dmaj7 |
G A | Bm Dmaj7 | G A | Bm A |
G A | Bm A | G A | Bm A |`,

`title: Believer
by: Imagine Dragons
genre: Pop
feel: Arena rock
source: Ultimate Guitar chord chart
tempo: 125
key: B♭m
form: Verse Verse Pre Chorus Verse Pre Chorus Verse Pre 2 Chorus 2
[Verse]
B♭m G♭ | F B♭m | G♭ F |
[Pre]
B♭m | G♭ F | B♭m | G♭ F |
[Chorus]
B♭m | G♭ F | B♭m | G♭ F |
B♭m | G♭ | F/A | B♭m |
G♭ F |
[Pre 2]
G♭ | A♭ F/A |
[Chorus 2]
B♭m | G♭ F7 | B♭m | G♭ F7 |
B♭m | G♭ | F7/A | B♭m |
G♭ F7 |`,

`title: Demons
by: Imagine Dragons
genre: Pop
feel: Pop rock
source: Ultimate Guitar chord chart
tempo: 90
key: E♭
form: Verse Pre Chorus Verse Pre Chorus Bridge Chorus
[Verse]
E♭ | B♭ | Cm | A♭ |
E♭ | B♭ | Cm | A♭ |
[Pre]
E♭ B♭ | Cm | A♭ | E♭ |
B♭ | Cm | A♭ | E♭ |
[Chorus]
E♭ B♭ | Cm | A♭ | E♭ |
B♭ | Cm | A♭ | E♭ |
[Bridge]
E♭ B♭ | Cm | A♭ | E♭ |
B♭ | Cm | E♭ |`,

`title: Counting Stars
by: OneRepublic
genre: Pop
feel: Pop rock
source: Ultimate Guitar chord chart
tempo: 122
key: E
form: Verse Intro Interlude Verse 2 Pre Chorus Interlude Verse 2 Pre 2 Chorus Bridge Chorus Outro
[Verse]
C♯m E | B | A | C♯m E |
B | A |
[Intro]
C♯m E | B A | C♯m E | B |
A |
[Interlude]
C♯m E | B A |
[Verse 2]
C♯m | E | B | A |
C♯m | E | B | A |
[Pre]
C♯m E | B | A | C♯m E |
B | A | A | A |
[Chorus]
C♯m E | B A | C♯m E | B |
A | C♯m E | B A | C♯m E |
B | A |
[Pre 2]
C♯m E | B | A | A |
A |
[Bridge]
C♯m | A F♯m |
[Outro]
C♯m | E | B | A |
C♯m | E | B | A |`,

`title: Sugar
by: Maroon 5
genre: Pop
feel: Funk pop
source: Ultimate Guitar chord chart
tempo: 120
key: D♭
form: Intro Verse Verse 2 Chorus Verse 3 Verse 2 Chorus Bridge Chorus 2 Chorus 3
[Intro]
D♭ B♭m | E♭m D♭ |
[Verse]
G♭ B♭m | E♭m D♭ | G♭ | B♭m |
E♭m D♭ |
[Verse 2]
G♭ B♭m | E♭m | D♭ | G♭ B♭m |
E♭m | D♭ |
[Chorus]
G♭ | B♭m | E♭m D♭ | G♭ B♭m |
E♭m D♭ | G♭ | B♭m | E♭m D♭ |
G♭ | B♭m | E♭m D♭ |
[Verse 3]
G♭ | B♭m | E♭m D♭ | G♭ |
B♭m | E♭m D♭ |
[Bridge]
G♭ | B♭m | E♭m | D♭ |
G♭ | B♭m | E♭m D♭ | G♭ |
B♭m | E♭m | D♭ |
[Chorus 2]
G♭ | B♭m | E♭m D♭ | G♭ |
B♭m | E♭m D♭ | G♭ | B♭m |
E♭m D♭ | G♭ | B♭m | E♭m D♭ |
[Chorus 3]
G♭ | B♭m | E♭m D♭ | G♭ |
B♭m | E♭m D♭ | G♭ | B♭m |
E♭m D♭ | G♭ | B♭m | E♭m D♭ |
G♭ B♭m | E♭m D♭ |`,

`title: Memories
by: Maroon 5
genre: Pop
feel: Pop ballad
source: Ultimate Guitar chord chart
tempo: 91
key: B
form: Verse Intro Verse 2 Pre Chorus Verse 2 Pre Chorus 2 Outro
[Verse]
B | G♯m | D♯m | E |
B F♯ | G♯m D♯m | E B | E F♯ |
[Intro]
B F♯ | G♯m D♯m | E B | E F♯ |
B F♯ | G♯m D♯m | E B | E F♯ |
[Verse 2]
B F♯ | G♯m D♯m | E B | E F♯ |
B F♯ | G♯m D♯m | E B | E F♯ |
[Pre]
B F♯ | G♯m D♯m | E B | E F♯ |
[Chorus]
B F♯ | G♯m D♯m | E B | E F♯ |
B F♯ | G♯m D♯m | E B | E F♯ |
B | F♯ | G♯m D♯m | E B |
E F♯ |
[Chorus 2]
B F♯ | G♯m D♯m | E B | E F♯ |
B F♯ | G♯m D♯m | E B | E F♯ |
B | F♯ | G♯m D♯m | E B |
E F♯ | B | F♯ | G♯m D♯m |
E B | E F♯ | B |
[Outro]
F♯ G♯m | D♯m | E B | E F♯ |`,

`title: Circles
by: Post Malone
genre: Pop
feel: Soft rock
source: Ultimate Guitar chord chart
tempo: 120
key: C
[Intro]
Cmaj7 Fmaj7 | Fm | Cmaj7 Fmaj7 | Cmaj7 |
Fmaj7 Fm | Cmaj7 | Fmaj7 Cmaj7 |
[Verse]
C F | C | F | Cmaj7 |
Fmaj7 Fm | Cmaj7 | Fmaj7 |
[Chorus]
Cmaj7 | F Fm | Cmaj7 | F Fm |
Cmaj7 | Fmaj7 Fm | Cmaj7 | F Fm |
[Verse 2]
C | F | C | F |
Cmaj7 | Fmaj7 Fm | Cmaj7 | Fmaj7 |
[Chorus 2]
Cmaj7 | F Fm | Cmaj7 | Fmaj7 Fm |
Cmaj7 | Fmaj7 Fm | Cmaj7 | Fmaj7 Fm |
[Bridge]
C C/B | F Fm | C C/B | F |
[Chorus 3]
Cmaj7 | F Fm | Cmaj7 | F Fm |
Cmaj7 Cmaj7/B | Fmaj7 Fm | C C/B | F Fm |
C |`,

`title: Sunflower
by: Post Malone, Swae Lee
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 90
key: D
[Intro]
D | G | Em | G |
[Verse]
D | G | Em | G |
D | G | Em | G |
[Chorus]
D | G | Em | G |
[Verse 2]
D | G Em | G | D |
G | D |
[Chorus 2]
G | Em | G |
[Outro]
D G |`,

`title: thank u, next
by: Ariana Grande
genre: Pop
feel: R&B pop
source: Ultimate Guitar chord chart
tempo: 107
key: D♭
form: Intro Verse Pre Chorus Verse Pre 2 Chorus 2 Post Bridge Pre Chorus 2 Post 2
[Intro]
G♭maj7 F7 | B♭m7 D♭7 |
[Verse]
G♭maj7 | F7 | B♭m7 | D♭7 |
G♭maj7 | F7 | B♭m7 | D♭7 |
[Pre]
G♭maj7 | F7 | B♭m7 | D♭7 |
G♭maj7 | F7 | B♭m7 | D♭7 |
G♭maj7 |
[Chorus]
F7 | B♭m7 | D♭7 G♭maj7 | F7 |
B♭m7 | D♭7 |
[Pre 2]
G♭maj7 | F7 | B♭m7 | D♭7 |
G♭maj7 | F7 | B♭m7 | D♭7 G♭maj7 |
[Chorus 2]
F7 | B♭m7 | D♭7 G♭maj7 | F7 |
B♭m7 | D♭7 G♭maj7 |
[Post]
F7 | B♭m7 | D♭7 |
[Bridge]
G♭maj7 | F7 | B♭m7 | D♭7 |
G♭maj7 | F7 | B♭m7 | D♭7 |
[Post 2]
F7 | B♭m7 | D♭ | G♭maj7 |
F7 | B♭m7 | D♭ | G♭maj7 F7 |
B♭m7 D♭7 |`,

`title: positions
by: Ariana Grande
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 144
key: Dm
form: Verse Intro Verse Pre Chorus Verse Pre Chorus 2 Bridge Chorus 3 Outro
[Verse]
Dm7 Am7 | B♭maj7 Gm7 | Dm7 Am7 | B♭maj7 Gm7 |
[Intro]
Dm7 Am7 | B♭maj7 Gm7 |
[Pre]
Dm7 Am7 | B♭maj7 Gm7 | Dm7 Am7 | B♭maj7 |
[Chorus]
Gm7 Dm7 | Am7 B♭maj7 | Gm7 Dm7 | Am7 B♭maj7 |
Gm7 |
[Chorus 2]
Gm7 Dm7 | Am7 B♭maj7 | Gm7 Dm7 | Am7 B♭maj7 |
Gm7 Dm7 | Am7 B♭maj7 | Gm7 Dm7 | Am7 B♭maj7 |
Gm7 Dm7 |
[Bridge]
Am7 B♭maj7 | Gm7 | Dm7 Am7 | B♭maj7 |
Gm7 Dm7 | Am7 B♭maj7 | Gm7 | Dm7 Am7 |
Gm7 |
[Chorus 3]
Dm7 | Am7 B♭maj7 | Gm7 Dm7 | Am7 B♭maj7 |
Gm7 Dm7 | Am7 B♭maj7 | Gm7 Dm7 | Am7 B♭maj7 |
Gm7 Dm7 |
[Outro]
Am7 B♭maj7 | Gm7 | Dm7 | Am7 B♭maj7 |
Gm7 | Dm7 Am7 |`,

`title: Shallow
by: Lady Gaga, Bradley Cooper
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 96
key: G
form: Verse Verse 2 Verse 3 Verse 2 Verse 4 Chorus Chorus Bridge Chorus Post
[Verse]
Em7 D/F♯ | G C | Cadd9 D | Am Em |
Bm A | Em7 D/F♯ | G C | Cadd9 G |
D | Em7 D/F♯ | G |
[Verse 2]
Em7 D/F♯ | G | C G | D |
Em7 D/F♯ | G | C G | D |
[Verse 3]
Em7 D/F♯ | G | C G | D Em7 |
D/F♯ G | C G | D Em7 | D/F♯ G |
Em7 D/F♯ | G |
[Verse 4]
Em7 D/F♯ | G | C G | D Em7 |
D/F♯ G | C G | D |
[Chorus]
Am D/F♯ | G D | Em | Am D/F♯ |
G D | Em |
[Bridge]
Bm D | A Em | Bm D | A |
[Post]
Am D/F♯ | G D | Em | Am D/F♯ |
G D | Em |`,

`title: Flowers
by: Miley Cyrus
genre: Pop
feel: Disco pop
source: Ultimate Guitar chord chart
tempo: 118
key: C
form: Intro Verse Pre Chorus Post Verse 2 Pre Chorus Post 2 Pre Chorus 2 Outro
[Intro]
Cmaj7 |
[Verse]
Am Dm | G C | Am Dm | G C |
[Pre]
Am Dm | E7 |
[Chorus]
Am Dm | G C | C/B | Am Dm |
G C | C/B | Am Dm | G C |
C/B | F E7 | Am |
[Post]
Dm | G C | C/B |
[Verse 2]
Am Dm | G C | Cmaj7 | Am Dm |
G C | Cmaj7 |
[Post 2]
Dm | G C | C/B | Am Dm |
G C |
[Chorus 2]
Am Dm | G C | C/B | Am Dm |
G C | C/B | Am Dm | G C |
C/B | F E7 | F E7 | Am |
[Outro]
Dm | G C | C/B | Am Dm |
G C | C/B Am |`,

`title: Please Please Please
by: Sabrina Carpenter
genre: Pop
feel: Retro pop
source: Ultimate Guitar chord chart
tempo: 107
key: A
form: Intro Verse Chorus Verse 2 Chorus Outro
[Intro]
A G♯m | F♯m | D C♯m | Bm A |
E |
[Verse]
A F♯7 | Bm | D C♯m | E |
A F♯7 | Bm | D C♯m | E |
[Chorus]
A C♯m/G♯ | F♯m | D C♯m | Bm |
A E | A C♯m/G♯ | F♯m | D C♯m |
Bm | A E |
[Verse 2]
C A7 | Dm | F Em | G |
[Outro]
D E | A C♯7 | D E | A C♯7 |
D E | A | A/G♯ F♯m | E |
D Dm | A |`,

`title: Taste
by: Sabrina Carpenter
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 113
key: E♭
form: Verse Pre Chorus Post Verse Pre Chorus Post 2 Bridge Chorus 2 Post 3
[Verse]
B♭ Cm | A♭ | B♭ E♭ | A♭ E♭ |
B♭ Cm | A♭ | B♭ E♭ | A♭ |
[Pre]
B♭ Cm | A♭ | Gm A♭ |
[Chorus]
B♭ Cm | A♭ | B♭ E♭ | A♭ |
B♭ Cm | A♭ | B♭ E♭ | A♭ |
[Post]
B♭ E♭ | A♭ E♭ |
[Post 2]
B♭ Cm | A♭ E♭ | B♭ E♭ | A♭ E♭ |
[Bridge]
B♭ Cm | A♭ | B♭ E♭ | A♭ |
B♭ Cm | A♭ | B♭ E♭ | A♭ B♭ |
Cm A♭ |
[Chorus 2]
B♭ Cm | A♭ | B♭ E♭ | B♭ Cm |
A♭ | B♭ E♭ | A♭ |
[Post 3]
B♭ Cm | A♭ | E♭ | B♭ E♭ |
A♭ | B♭ Cm | A♭ | E♭ |
B♭ E♭ | A♭ |`,

`title: Pink Pony Club
by: Chappell Roan
genre: Pop
feel: Synth pop
source: Ultimate Guitar chord chart
tempo: 116
key: F♯
form: Intro Verse Chorus Pre Chorus Verse Chorus Pre Chorus Interlude Bridge Pre Chorus Interlude
[Intro]
C♯ |
[Verse]
F♯ G♯m | D♯m B | F♯ G♯m | D♯m B |
[Chorus]
F♯ | G♯m | D♯m | B |
F♯ | G♯m | D♯m | B |
[Pre]
F♯ G♯m | D♯m | B | F♯ G♯m |
D♯m | B |
[Interlude]
F♯ G♯m | D♯m B |
[Bridge]
B C♯ | D♯m G♯m | B C♯ | D♯m G♯m |`,

`title: HOT TO GO
by: Chappell Roan
genre: Pop
feel: Synth pop
source: Ultimate Guitar chord chart
tempo: 111
key: F♯
form: Intro Verse Pre Chorus Post Verse Pre Chorus Post Bridge Chorus 2 Outro
[Intro]
F♯ Bmaj7 |
[Verse]
F♯ | F♯ | Bmaj7 | Bmaj7 |
[Pre]
F♯ | F♯ | Bmaj7 | Bmaj7 |
[Chorus]
F♯ | F♯ | Bmaj7 | Bmaj7 |
[Post]
F♯ | Bmaj7 |
[Bridge]
F♯ | F♯ | Bmaj7 | Bmaj7 F♯ |
[Chorus 2]
F♯ | Bmaj7 | F♯ | Bmaj7 |
[Outro]
F♯ | C♯ Bmaj7 | F♯ |`,

`title: Take Me To Church
by: Hozier
genre: Pop
feel: Gospel rock
source: Ultimate Guitar chord chart
tempo: 129
key: G
form: Verse Verse 2 Chorus Verse 3 Chorus Bridge Chorus 2
[Verse]
A5 | G5 | F♯5 | F5 |
[Verse 2]
Em Am | Em | Am G | Am Em |
Am Em | Am Em | Am G | Am Em |
Am D | C | Em Am | Em |
Am G | Am Em | Am D | C |
C | G C | G Cm | G Cm |
G G5 | F♯5 |
[Chorus]
F♯5 F5 | Em | B7 | G |
Am | Em A5 | G5 | G5 F♯5 |
Em | B7 | G | Am |
Em A5 | G5 F♯5 |
[Verse 3]
Em Am | Em | Am G | Am Em |
Am | D | C | Em Am |
Em | Am G | Am Em | Am |
D | C | C | G5 F♯5 |
[Bridge]
C/G G | B7 Em | C/G G | B7 Em |
C/G G | B7 Em | C/G G | B7 Em |
D C | G C | G Cm | G Cm |
G G5 | F♯5 |
[Chorus 2]
F♯5 F5 | Em | B7 | G |
Am | Em A5 | G5 | G5 F♯5 |
Em | B7 | G | Am |
Em A5 | G5 F♯5 | Em |`,

`title: Too Sweet
by: Hozier
genre: Pop
feel: Blues rock
source: Ultimate Guitar chord chart
tempo: 117
key: B♭
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Chorus 3
[Intro]
Gm F/A | B♭ Cm | E♭/D | E♭ F |
D7 |
[Verse]
Gm F/A | B♭ | Cm E♭/D | E♭ |
F | D7 | Gm | F/A B♭ |
Cm E♭/D | E♭ | B♭ | D7/A |
[Pre]
Gm | F/A B♭ | Cm E♭/D | E♭ |
F |
[Chorus]
D7 Gm | F/A B♭ | Cm E♭/D | E♭ |
B♭ | D7 Gm | F/A B♭ | Cm E♭/D |
E♭ | F D7 | Gm | F/A B♭ |
Cm E♭/D | E♭ | B♭ D7/A |
[Verse 2]
Gm | F/A B♭ | Cm E♭/D | E♭ |
F D7 | Gm | F/A B♭ | Cm E♭/D |
E♭ | B♭ D7/A |
[Chorus 2]
D7 Gm | F/A B♭ | Cm E♭/D | E♭ |
B♭ | D7 Gm | F/A B♭ | Cm E♭/D |
E♭ | F D7 | Gm | F/A B♭ |
Cm E♭/D | E♭ | B♭ D7/A | Gm |
F/A B♭ | Cm E♭/D | E♭ | F |
[Chorus 3]
D7 Gm | F/A B♭ | Cm E♭/D | E♭ |
B♭ D7/A |`,

`title: Kill Bill
by: SZA
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 89
key: A♭
form: Intro Verse Pre Chorus Verse 2 Pre Chorus Bridge Chorus 2
[Intro]
B♭m E♭ | A♭ F |
[Verse]
B♭m E♭ | A♭ | F |
[Pre]
B♭m | E♭ | A♭ | F B♭m |
[Chorus]
E♭ A♭ | F B♭m | E♭ A♭ | F |
[Verse 2]
B♭m | E♭ | A♭ | F |
B♭m | E♭ | A♭ | F |
[Bridge]
B♭m E♭ | A♭ | F | B♭m |
E♭ | A♭ |
[Chorus 2]
B♭m E♭ | A♭ | F B♭m | E♭ A♭ |`,

`title: Snooze
by: SZA
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 143
key: C
form: Intro Verse Chorus Verse 2 Chorus 2 Bridge Chorus Outro
[Intro]
Dm7 Em7 | Fmaj7 | Dm7 Em7 | Fmaj7 |
[Verse]
Dm7 | Em7 Fmaj7 | Fmaj7 | Dm7 Em7 |
Fmaj7 | Dm7 Em7 | Fmaj7 | Dm7 Em7 |
Fmaj7 |
[Chorus]
Dm7 Em7 | Fmaj7 | Dm7 | Em7 |
Fmaj7 | Dm7 Em7 | Fmaj7 | Dm7 |
Em7 | Fmaj7 Dm7 |
[Verse 2]
Em7 Fmaj7 | Dm7 | Em7 Fmaj7 | Dm7 |
Em7 Fmaj7 | Fmaj7 | Dm7 | Em7 |
Fmaj7 |
[Chorus 2]
Dm7 Em7 | Fmaj7 | Dm7 | Em7 |
Fmaj7 | Dm7 Em7 | Fmaj7 | Dm7 |
Em7 | Fmaj7 |
[Bridge]
Dm7 | Em7 Fmaj7 | Dm7 | Em7 Fmaj7 |
Fmaj7 | Dm7 | Em7 Fmaj7 | Dm7 |
Em7 Fmaj7 |
[Outro]
Em7 Fmaj7 | Dm7 Em7 | Fmaj7 | Dm7 Em7 |
Fmaj7 | Dm7 Em7 | Fmaj7 |`,

`title: greedy
by: Tate McRae
genre: Pop
feel: Dance pop
source: Ultimate Guitar chord chart
tempo: 111
key: F♯m
form: Intro Verse Chorus Verse 2 Chorus Bridge Chorus Outro
[Intro]
F♯m |
[Verse]
F♯m | F♯m | F♯m | F♯m |
[Chorus]
D | Bm | F♯m E | D |
Bm | F♯m | E |
[Verse 2]
D Bm | F♯m | E D | Bm F♯m |
E |
[Bridge]
D Bm | F♯m | E | D Bm |
F♯m | E |
[Outro]
D Bm | F♯m E | D | Bm |
F♯m E |`,

`title: Stick Season
by: Noah Kahan
genre: Pop
feel: Folk pop
source: Ultimate Guitar chord chart
tempo: 118
key: A
form: Verse Intro Verse 2 Verse 2 Chorus Verse 2 Chorus Bridge Chorus
[Verse]
A | E | F♯m | D |
A/E |
[Intro]
A |
[Verse 2]
A | E | F♯m | D |
[Chorus]
A/E E | F♯m | D | A |
E | F♯m | D E | A |
[Bridge]
A E | F♯m | D | E |`,

`title: End of Beginning
by: Djo
genre: Pop
feel: Synth rock
source: Ultimate Guitar chord chart
tempo: 159
key: D
[Verse]
D | Bm | A | D |
Bm | Em A | Em A |
[Chorus]
Gmaj7 D | A Gmaj7 | Bm A | Gmaj7 |
D A | G |
[Verse 2]
D | Bm | A | D Bm |
Em A |
[Chorus 2]
Gmaj7 D | A Gmaj7 | Bm A | Gmaj7 |
D A | G | G | G |
[Bridge]
A Bm | A Bm | A Bm |
[Chorus 3]
G D | A G | Bm A | F♯m7 G |
D A | G | G |`,

`title: That's So True
by: Gracie Abrams
genre: Pop
feel: Pop
source: Ultimate Guitar chord chart
tempo: 108
key: B♭m
form: Verse Verse 2 Pre Chorus Verse 3 Chorus 2 Bridge Chorus 2
[Verse]
G♭maj7 B♭m7 | A♭6add11 |
[Verse 2]
G♭maj7 | B♭m7 | A♭6add11 | G♭maj7 |
B♭m7 | A♭6add11 |
[Pre]
G♭maj7 | B♭m7 | A♭6add11 |
[Chorus]
G♭maj7 | B♭m7 | A♭6add11 G♭maj7 | B♭m7 |
A♭6add11 |
[Verse 3]
G♭maj7 | B♭m7 | A♭6add11 | G♭maj7 |
B♭m7 | A♭6add11 | G♭maj7 | B♭m7 |
A♭6add11 |
[Chorus 2]
G♭maj7 | B♭m7 | A♭6add11 G♭maj7 | B♭m7 A♭6add11 |
G♭maj7 | B♭m7 | A♭6add11 G♭maj7 | B♭m7 A♭6add11 |
[Bridge]
G♭maj7 | B♭m7 | D♭ | A♭6add11 |
G♭maj7 | B♭m7 | D♭ | A♭6add11 |`,

`title: APT
by: ROSÉ & Bruno Mars
genre: Pop
feel: Pop punk
source: Ultimate Guitar chord chart
tempo: 149
key: Cm
form: Verse Pre Chorus Verse 2 Pre Chorus 2 Bridge Pre 2 Chorus 3
[Verse]
Cm | B♭ | Cm | Cm |
B♭ | Cm |
[Pre]
A♭ B♭ | Cm E♭ | A♭ B♭ | Cm |
[Chorus]
Cm | B♭ | Cm | Cm |
B♭ | Cm |
[Verse 2]
Cm | B♭ | Cm | Cm B♭ |
Cm |
[Chorus 2]
A♭ | B♭ | Cm | E♭ |
A♭ | B♭ | Cm | E♭ |
[Bridge]
G7 | Cm B♭ | E♭ C | Cm B♭ |
E♭ C | Cm B♭ | E♭ C | Cm B♭ |
F |
[Pre 2]
A♭ B♭ | Cm E♭ | A♭ B♭ | Cm E♭ |
[Chorus 3]
A♭ | B♭ | Cm | E♭ |
A♭ | B♭ | Cm | E♭ |
A♭ | B♭ | Cm | E♭ |
A♭ | B♭ | Cm | E♭ |`,

`title: Ordinary
by: Alex Warren
genre: Pop
feel: Pop ballad
source: Ultimate Guitar chord chart
tempo: 84
key: D
[Intro]
Em D |
[Verse]
Em | D | Em | D |
[Pre]
Em | D |
[Chorus]
Em | D | Em | D |
Em D/F♯ | G | A Bm | A |
D/F♯ Em | D/F♯ G | A Bm | A |
[Verse 2]
Em D | Em | D | Em |
Em | D |
[Chorus 2]
Em D/F♯ | G | A Bm | A |
D/F♯ Em | D/F♯ G | A Bm | A |
Em D/F♯ | G | A Bm | A |
D/F♯ Em | D/F♯ G | A Bm | A |
[Bridge]
Em D/F♯ | G A | Bm | A D/F♯ |
Em D/F♯ | G A | Bm | A |
[Chorus 3]
Em | D | Em D/F♯ | G |
A Bm | A | Em F♯m | G A |
Bm A | D/F♯ Em | D/F♯ G | A Bm |
A |`,

`title: Love Yourself
by: Justin Bieber
genre: Pop
feel: Acoustic pop
source: Ultimate Guitar chord chart
tempo: 100
key: E
form: Verse Pre Chorus Verse Pre Chorus Interlude Verse 2 Chorus 2
[Verse]
E B/D♯ | C♯m | F♯m E | B/D♯ |
E B/D♯ | C♯m | F♯m E | B/D♯ |
E B/D♯ | C♯m | F♯m E | B/D♯ |
E B/D♯ | C♯m | F♯m E | B/D♯ |
[Pre]
C♯m A | E | C♯m A | E |
C♯m A | E B | C♯m A | B |
[Chorus]
E B | C♯m A | E A | E |
E B | C♯m A | E A | E |
[Interlude]
E B | C♯m A | E B | E |
E B | C♯m A | E B | E |
[Verse 2]
E B/D♯ | C♯m | F♯m E | B/D♯ |
E B/D♯ | C♯m | F♯m E | B/D♯ |
[Chorus 2]
E B | C♯m A | E A | E |
E B | C♯m A | E A | E |
E B | C♯m A | E A | E |
E B | C♯m A | E A | E |`,

`title: Peaches
by: Justin Bieber
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 90
key: C
form: Intro Chorus Verse Chorus Verse 2 Chorus Verse 3 Chorus 2 Outro
[Intro]
Fmaj7 Em7 | Dm7 Cmaj7 |
[Chorus]
Fmaj7 | Em7 | Dm7 | Cmaj7 |
[Verse]
Fmaj7 Em7 | Dm7 | Cmaj7 | Fmaj7 Em7 |
Dm7 | Cmaj7 |
[Verse 2]
Fmaj7 Em7 | Dm7 Cmaj7 | Fmaj7 | Em7 Dm7 |
Cmaj7 | Fmaj7 Em7 | Dm7 Cmaj7 | Fmaj7 Em7 |
Dm7 Cmaj7 |
[Verse 3]
Fmaj7 | Em7 | Dm7 | Cmaj7 |
Fmaj7 | Em7 | Dm7 | Cmaj7 |
[Chorus 2]
Fmaj7 | Em7 | Dm7 | Cmaj7 |
Fmaj7 | Em7 | Dm7 | Cmaj7 |
Fmaj7 | Em7 | Dm7 | Cmaj7 |
Fmaj7 | Em7 | Dm7 | Cmaj7 |
[Outro]
Fmaj7 Em7 | Dm7 Cmaj7 |`,

`title: Heat Waves
by: Glass Animals
genre: Pop
feel: Indie pop
source: Ultimate Guitar chord chart
tempo: 81
key: B
form: Verse Chorus Verse 2 Chorus 2 Verse 3 Chorus Bridge Chorus Outro
[Verse]
C♯m7 C♯m | B G♯m | F♯ | C♯m7 C♯m |
B G♯m | F♯ | C♯m B | G♯m F♯ |
C♯m B | G♯m F♯ | C♯m B | G♯m F♯ |
C♯m B | G♯m F♯ | E B | G♯m F♯ |
[Chorus]
C♯m B | G♯m F♯ | E B | G♯m F♯ |
C♯m B | G♯m F♯ | E B | G♯m F♯ |
[Verse 2]
C♯m B | G♯m F♯ | E B | G♯m F♯ |
E B | G♯m F♯ | E B | G♯m F♯ |
[Chorus 2]
C♯m B | G♯m F♯ | E B | G♯m F♯ |
[Verse 3]
C♯m B | G♯m F♯ | C♯m B | G♯m F♯ |
C♯m B | G♯m F♯ | E F♯ | G♯m F♯ |
[Bridge]
E | F♯ | G♯m | B |
E F♯ | G♯m D♯ | E F♯ | G♯m B |
[Outro]
C♯m B | G♯m F♯ | E B | G♯m F♯ |
C♯m B | G♯m F♯ | E B | G♯m F♯ |
C♯m B | G♯m F♯ | E G♯m | C♯m F♯ |`,

`title: Let Her Go
by: Passenger
genre: Pop
feel: Folk
source: Ultimate Guitar chord chart
tempo: 75
key: Em
form: Verse Chorus Interlude Verse 2 Chorus Verse 3 Chorus Bridge Interlude 2 Chorus 2
[Verse]
D Cmaj7 | D6 Em | D6 | Cmaj7 D6 |
Em D6 |
[Chorus]
C G | D Em | C G | D |
C G | D Em | C G | D |
[Interlude]
Em C | D Bm | Em C | D |
[Verse 2]
Em C | D Bm | Em C | D |
Em C | D Bm | Em C | D |
[Verse 3]
Em C | D Bm | Em C | D |
Em C | D Bm | Em | C D |
[Bridge]
Em | C D | Em | C D |
Em C | D Bm |
[Interlude 2]
Em C | D |
[Chorus 2]
C G | D Em | C G | D |
C G | D Em | C G | D |
C G | D Em | C G | D |`,

`title: Riptide
by: Vance Joy
genre: Pop
feel: Folk pop
source: Ultimate Guitar chord chart
tempo: 102
key: D♭
form: Intro Verse Chorus Verse Chorus 2 Bridge Chorus 3
[Intro]
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
[Verse]
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
[Chorus]
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
[Chorus 2]
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
D♭ |
[Bridge]
B♭m A♭ | D♭ G♭maj7 | B♭m A♭ | D♭ G♭maj7 |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
[Chorus 3]
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ | B♭m A♭ | D♭ |
B♭m A♭ | D♭ |`,

`title: Say You Won't Let Go
by: James Arthur
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 85
key: B♭
form: Intro Verse Pre Chorus Verse Pre Chorus Verse 2 Chorus 2 Outro
[Intro]
B♭ F | Gm E♭ |
[Verse]
B♭ | F | Gm | E♭ |
B♭ | F | Gm | E♭ |
[Pre]
B♭ | F | Gm E♭ | B♭ |
F | Gm E♭ |
[Chorus]
B♭ | F | Gm | E♭ |
B♭ | F | Gm | E♭ |
B♭ F | Gm E♭ |
[Verse 2]
B♭ | F | Gm | E♭ |
[Chorus 2]
B♭ | F | Gm | E♭ |
B♭ | F | Gm | E♭ |
[Outro]
B♭ F | Gm E♭ | B♭ F | Gm E♭ |
B♭ |`,

`title: Best Part
by: Daniel Caesar ft. H.E.R.
genre: Pop
feel: Slow R&B
source: Ultimate Guitar chord chart
tempo: 75
key: G
[Intro]
Dmaj7 Am7 | Gmaj7 B♭maj7 |
[Verse]
Dmaj7 | Am7 | Gmaj7 | B♭maj7 |
Dmaj7 | Am7 | Gmaj7 B♭maj7 |
[Pre]
Dmaj7 | Am7 | Gmaj7 | B♭maj7 |
[Chorus]
Dmaj7 | Am7 Gmaj7 | B♭maj7 | Dmaj7 |
Am7 | Gmaj7 | B♭maj7 | Dmaj7 Am7 |
Gmaj7 B♭maj7 | Dmaj7 |
[Verse 2]
Dmaj7 | Am7 | Gmaj7 B♭maj7 | Dmaj7 |
Am7 | Gmaj7 B♭maj7 |
[Pre 2]
Dmaj7 | Am7 | Gmaj7 B♭maj7 |
[Chorus 2]
Dmaj7 Am7 | Gmaj7 | B♭maj7 | Dmaj7 |
Am7 | Gmaj7 | B♭maj7 | Dmaj7 Am7 |
Gmaj7 B♭maj7 | Dmaj7 |
[Outro]
Dmaj7 | Am7 | Gmaj7 | B♭maj7 |
Dmaj7 | Am7 | Gmaj7 | B♭maj7 |
Dmaj7 | Am7 | Gmaj7 | B♭maj7 |`,

`title: Thinkin Bout You
by: Frank Ocean
genre: Pop
feel: R&B
source: Ultimate Guitar chord chart
tempo: 130
key: Am
form: Intro Verse Pre Chorus Verse 2 Pre Chorus Bridge Chorus
[Intro]
Fmaj7 Dm7 | Em7 Am |
[Verse]
Fmaj7 Dm7 | Em7 Am | Fmaj7 Em7 | B♭ Am |
[Pre]
Fmaj7 | Dm7 | Em7 | A7 |
Fmaj7 | Em7 Gm | F |
[Chorus]
Fmaj7 C | G Am | Fmaj7 C | G Am |
Fmaj7 C | G Am | Fmaj7 C | G Am |
[Verse 2]
Fmaj7 Dm7 | Em7 Am | Fmaj7 | Em7 |
B♭ Am |
[Bridge]
Dm7 C | G Am | Dm7 C | G Am |
Dm7 | C G | Am | Dm7 |
C G | Am |`,

`title: Halo
by: Beyoncé
genre: Pop
feel: Power ballad
source: Ultimate Guitar chord chart
tempo: 80
key: A
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Pre Chorus 3
[Intro]
A Bm | F♯m D | A Bm | F♯m D |
[Verse]
A Bm | F♯m | D | A |
Bm | F♯m | D | A |
Bm | F♯m | D | A |
[Pre]
A Bm | F♯m | D | A |
Bm | F♯m | D | A |
[Chorus]
Bm | F♯m | D | A |
A |
[Verse 2]
Bm | F♯m | D | A |
Bm | F♯m | D | A |
Bm | F♯m | D | A |
[Chorus 2]
Bm | F♯m | D | A |
Bm | F♯m | D | A |
Bm | F♯m D | A |
[Chorus 3]
Bm | F♯m | D | A |
Bm | F♯m | D | A |`,

`title: Stay
by: Rihanna ft. Mikky Ekko
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 112
key: Am
form: Intro Verse Pre Chorus Verse 2 Pre Chorus Bridge Chorus 2
[Intro]
C Dm | Am Am7/G | Am Am7/G | Am Am7/G |
C Dm | Am Am7/G | Am Am7/G | Am Am7/G |
[Verse]
C Dm | Am Am7/G | Am Am7/G | Am |
Am7/G C | Dm Am | Am7/G Am | Am7/G Am |
Am7/G C | Dm Am | Am7/G Am | Am7/G Am |
Am7/G C | Dm Am | Am7/G Am | Am7/G Am |
[Pre]
F Dm | Am | F Dm | G |
[Chorus]
C Dm | Am F | C Dm | Am F |
C Dm | Am Am7/G | Am Am7/G | Am Am7/G |
[Verse 2]
C Dm | Am Am7/G | Am Am7/G | Am |
Am7/G C | Dm Am | Am7/G Am | Am7/G Am |
Am7/G |
[Bridge]
F Am | Dm Em | F Am | Dm |
Dm | F Am | Dm | F G |
[Chorus 2]
C Dm | Am F | C Dm | Am F |
C Dm | Am F | C Dm | Am F |
C Dm | Am F |`,

`title: No One
by: Alicia Keys
genre: Pop
feel: Soul pop
source: Ultimate Guitar chord chart
tempo: 90
key: E
[Verse]
E B | C♯m | A E | B C♯m |
A E |
[Pre]
E B | C♯m | A E | B |
C♯m | A E |
[Chorus]
E B | C♯m | A E | E B |
C♯m | A E | B C♯m | A E |
[Verse 2]
B C♯m | A E | B C♯m | A E |
[Pre 2]
E B | C♯m | A E | E B |
C♯m | A E |
[Chorus 2]
E B | C♯m | A E | E B |
C♯m | A E | B C♯m | A B |
[Bridge]
F♯m G♯m | A C♯m | F♯m G♯m | A |
B | E |
[Chorus 3]
B C♯m | A E | E B | C♯m |
A E |
[Bridge 2]
B | C♯m | A | E B |
C♯m | A E |`,

`title: Fallin'
by: Alicia Keys
genre: Pop
feel: Soul
source: Ultimate Guitar chord chart
tempo: 96
key: Bm
form: Verse Chorus Verse Chorus Bridge Chorus 2
[Verse]
Em Bm7 | Em Bm7 | Em Bm7 | Em Bm7 |
Em Bm7 | Em Bm7 | Em Bm7 | Em |
[Chorus]
Bm7 Em | Bm7 | Em | Bm7 |
Em | Bm7 | Em | Bm7 |
[Bridge]
Bm7 | Em Bm7 | Em Bm7 | Em Bm7 |
Em Bm7 | Em Bm7 | Em Bm7 | Em Bm7 |
Em |
[Chorus 2]
Bm7 Em | Bm7 | Em | Bm7 |
Em | Bm7 | Em | Bm7 |
Bm7 Em | Bm7 | Em | Bm7 |
Em | Bm7 | Em | Bm7 |
Bm7 Em | Bm7 | Em | Bm7 |
Em | Bm7 | Em | Bm7 |`,

`title: Back to Black
by: Amy Winehouse
genre: Pop
feel: 60s soul
source: Ultimate Guitar chord chart
tempo: 123
key: Dm
form: Intro Verse Verse Chorus Verse Chorus 2 Bridge Chorus 3
[Intro]
Dm Gm | B♭ A |
[Verse]
Dm Gm | B♭ A | Dm Gm | B♭ A |
[Chorus]
Dm Gm | B♭ A | Dm |
[Chorus 2]
Dm Gm | B♭ A | Dm Gm | B♭ A |
[Bridge]
Dm B♭maj7 | F A | Dm B♭maj7 | F A |
A7 |
[Chorus 3]
Dm Gm | B♭ A | Dm Gm | B♭ A |
Dm |`,

`title: Valerie
by: Amy Winehouse
genre: Pop
feel: Motown
source: Ultimate Guitar chord chart
tempo: 106
key: E
form: Verse Verse 2 Chorus Verse 3 Chorus Verse 2 Chorus
[Verse]
Emaj7 F♯m7 | Amaj7 G♯m | B |
[Verse 2]
Emaj7 F♯m7 | Emaj7 | F♯m7 |
[Chorus]
Amaj7 G♯m | Amaj7 G♯m | Amaj7 G♯m | B |
Emaj7 F♯m7 |
[Verse 3]
Emaj7 F♯m7 | Emaj7 | F♯m7 | Emaj7 F♯m7 |
Emaj7 | F♯m7 | Emaj7 F♯m7 | Emaj7 F♯m7 |`,

`title: Do I Wanna Know
by: Arctic Monkeys
genre: Pop
feel: Slow rock
source: Ultimate Guitar chord chart
tempo: 85
key: Gm
form: Verse Verse 2 Pre Chorus Verse 3 Pre Chorus 2 Outro
[Verse]
Cm E♭m | D F |
[Verse 2]
Gm E♭ | Cm | Gm | Gm |
E♭ Cm | Gm | Gm | E♭ Cm |
Gm | Gm | E♭ Cm | D |
[Pre]
E♭ | Cm | Gm | Gm |
E♭ | Cm | Gm |
[Chorus]
Gm | E♭ Cm | Gm | Gm E♭ |
Cm | Gm | Gm |
[Verse 3]
E♭ Cm | Gm | Gm | E♭ Cm |
Gm | E♭ Cm | Gm | E♭ Cm |
D |
[Chorus 2]
Gm | E♭ Cm | Gm | Gm E♭ |
Cm | Gm | E♭ |
[Outro]
E♭ | Cm | Gm | Gm |
E♭ | Cm | Gm | E♭ |
Cm | Gm | F | E♭ |
Cm Gm |`,

`title: 505
by: Arctic Monkeys
genre: Pop
feel: Indie rock
source: Ultimate Guitar chord chart
tempo: 140
key: C
form: Verse Intro Chorus Verse 2 Interlude Verse 3 Chorus Interlude 2 Chorus Interlude 3 Outro
[Verse]
Dm Em | Dm Em | E |
[Intro]
Dm Em | Dm Em |
[Chorus]
Dm Em | Dm | Em Dm | Em Dm |
Em |
[Verse 2]
Dm Em | Dm Em | Dm Em |
[Interlude]
Dm Em |
[Verse 3]
Dm | Em Dm | Em Dm | Em Dm |
Em |
[Interlude 2]
Dm Em | Dm Em | Dm | Em Dm |
Em Dm | Em Dm | Em |
[Interlude 3]
Dm Em | Dm Em |
[Outro]
Dm Em | Dm Em |`,

`title: No Surprises
by: Radiohead
genre: Pop
feel: Slow rock
source: Ultimate Guitar chord chart
tempo: 76
key: F
form: Verse Verse 2 Chorus Bridge Chorus 2 Interlude Bridge Chorus 2 Outro
[Verse]
F B♭m |
[Verse 2]
F | B♭maj7/D | Gm C | Csus4 |
F B♭m | F | B♭maj7/D | Gm C |
Csus4 | F B♭m | F | B♭maj7/D |
[Chorus]
Gm C | Csus4 | Gm C | Csus4 |
Gm C | Csus4 | F B♭m | F B♭m |
[Bridge]
F | B♭maj7/D |
[Chorus 2]
Gm C | Csus4 | Gm C | Csus4 |
Gm C | Csus4 | F B♭m |
[Interlude]
C B♭m | C B♭m | Gm B♭m |
[Outro]
F B♭m | F |`,

`title: Karma Police
by: Radiohead
genre: Pop
feel: Rock ballad
source: Ultimate Guitar chord chart
tempo: 75
key: G
form: Intro Verse Verse Chorus Verse Chorus Bridge Interlude Bridge Outro
[Intro]
Am D/F♯ | Em G | Am Fadd9 | Em G |
Am D | G D/F♯ | C Bm | Am Bm |
D |
[Verse]
Am D/F♯ | Em G | Am | Fadd9 Em |
G Am | D G | D/F♯ C | Bm Am |
Bm D |
[Chorus]
C D | G F♯7 | C D | G F♯7 |
C D | G | Bm C | Bm D |
[Bridge]
Bm D | G | D G | D Eadd9 |
E7 | Bm D | G | D G |
D Eadd9 | E7 |
[Interlude]
Bm D | G D | G D | E7 |
[Outro]
Bm D | G D | G D | Eadd9 E7 |`,

`title: Don't Look Back in Anger
by: Oasis
genre: Pop
feel: Britpop
source: Ultimate Guitar chord chart
tempo: 82
key: C
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Interlude Chorus 3
[Intro]
C F | C F |
[Verse]
C G | Am | E7 F | G |
C Am | G | C G | Am |
E7 F | G | C Am | G |
[Pre]
F Fm6 | C | F Fm6 | C |
F Fm6 | C | G | E7/A♭ |
Am G | F G |
[Chorus]
C G | Am E7 | F | G C |
Am G | C G | Am E7 | F G |
C G | Am E7 | F G | C Am |
G |
[Verse 2]
C G | Am | E7 F | G C |
Am G | C G | Am | E7 F |
G C | Am G |
[Chorus 2]
C G | Am E7 | F | G C |
Am G | C G | Am E7 | F G |
C Am | G |
[Interlude]
F Fm6 | C | G E7/A♭ | Am G |
F G |
[Chorus 3]
C G | Am E7 | F | G C |
Am G | C G | Am E7 | F G |
C Am | G | C G | Am E7 |
F | G C | Am G | C G |
Am | F | Fm6 | C G |
Am E7 | F Fm6 | C |`,

`title: Mr. Brightside
by: The Killers
genre: Pop
feel: Rock
source: Ultimate Guitar chord chart
tempo: 148
key: D♭
form: Intro Verse Pre Chorus Interlude Verse Pre Chorus Interlude Outro
[Intro]
D♭ D♭/C | G♭ |
[Verse]
D♭ D♭/C | G♭ | D♭ D♭/C | G♭ |
D♭ D♭/C | G♭ | D♭ D♭/C | G♭ |
[Pre]
B♭m | A♭ | G♭ | B♭m |
A♭ | G♭ |
[Chorus]
D♭ | G♭ B♭m | A♭ D♭ | G♭ B♭m |
A♭ D♭ | G♭ B♭m | A♭ D♭ | G♭maj7 |
B♭m A♭ |
[Interlude]
D♭ G♭add9 | B♭m A♭ | D♭ G♭add9 | B♭m A♭ |
[Outro]
D♭ G♭ | B♭m A♭ | D♭ G♭ | B♭m A♭ |
D♭ G♭ | B♭m A♭ | D♭ G♭ | B♭m A♭ |`,

`title: Dreams
by: Fleetwood Mac
genre: Pop
feel: Soft rock
source: Ultimate Guitar chord chart
tempo: 120
key: Am
form: Verse Intro Verse 2 Chorus Interlude Verse 2 Chorus 2
[Verse]
Fmaj7 | F | G | G6 |
[Intro]
F G | F G |
[Verse 2]
F G | F G | F G | F G |
F G | F G | F G | F |
G F | G | F G | F G |
F G | F G | F G |
[Chorus]
Fmaj7 G6 | Fmaj7 G | Fmaj7 G6 | Fmaj7 G |
Fmaj7 G6 | Fmaj7 G | Fmaj7 G6 | Fmaj7 G |
Fmaj7 |
[Interlude]
Fmaj7 G | F | Am G | F |
[Chorus 2]
Fmaj7 G6 | Fmaj7 G | Fmaj7 G6 | Fmaj7 G |
Fmaj7 G6 | Fmaj7 G | Fmaj7 G6 | Fmaj7 G |
Fmaj7 G6 | Fmaj7 G | Fmaj7 G6 | Fmaj7 G |
Fmaj7 G6 | Fmaj7 G | Fmaj7 G6 | Fmaj7 G |
Fmaj7 G | Fmaj7 | G Fmaj7 |`,

`title: Bohemian Rhapsody
by: Queen
genre: Pop
feel: Rock opera
source: Ultimate Guitar chord chart
tempo: 72
key: E♭
[Intro]
Gm7 | C7 | F7 Cm7 | F7 |
B♭ | Gm | B♭7 E♭ | Cm F7 |
B B♭ | A B♭ | B B♭ | A B♭ |
E♭ B♭/D | D♭°7 F7/C | B♭ |
[Verse]
B♭ Gm | Cm | Cm F | B♭ Gm |
Cm Cm/B | Cm/B♭ Cm/A | Cm/A♭ Cm/G | E♭ B♭ |
Cm | Fm | B♭ E♭ | B♭ Cm |
A♭m E♭ | B♭ |
[Verse 2]
B♭ Gm | Cm | Cm F | B♭ Gm |
Cm Cm/B | Cm/B♭ Cm/A | Cm/A♭ Cm/G | E♭ B♭ |
Cm | Fm | B♭ E♭ |
[Interlude]
E♭ B♭ | Cm Fm | B♭ | E♭ B♭ |
Cm Fm | D♭ C | B B♭ | A |
[Interlude 2]
D A | A♭ A | D A | A♭ |
A D | A D | A A♭ | A D |
A | D♭ A♭ | C E | A |
B B♭ | A B♭ | B B♭ | A B♭ |
A♭ E♭ | E♭° E♭ | A♭ E♭ | E♭° E♭ |
A♭ E♭/G | F B♭ | A♭ E♭/G | G♭° Fm7 |
B B♭ | A B♭ | B B♭ | A B♭ |
E♭ B♭ | E♭ B♭ | E♭ B♭ | B♭ E♭ |
B♭ | B♭ G♭7 | Bm A | D D♭ |
G♭ B♭ | E♭ | E♭ B♭ | E♭ A♭ |
D Gm | B♭ |
[Interlude 3]
E♭ F |
[Interlude 4]
B♭ E♭ | B♭ D♭ | B♭ E♭ | A♭ |
Fm B♭ | Fm B♭ | Fm B♭ | Fm B♭ |
E♭ |
[Interlude 5]
E♭ F | B A♭ | B♭ | E♭ B♭ |
Cm G | Cm G | Cm B♭ | E♭ D |
Gm A♭ | E♭ |
[Outro]
Cm Gm | Cm Gm | Cm A♭m | A♭/B♭ E♭ |
[Interlude 6]
E♭ A♭/E♭ | E♭ E♭° | B♭/D B♭m/D♭ | C D♭° |
C C7 | F |
[Outro 2]
B♭ F/A | F°/A♭ Gm7 | F |`,

`title: I Will Always Love You
by: Whitney Houston
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 67
key: E
[Verse]
A Asus4 | A | A/G♯ F♯m | E |
D E | A Asus4 | A | A/G♯ F♯m |
E | D E |
[Chorus]
A F♯m | D E | A F♯m | D E |
A |
[Bridge]
D C♯m | Bm7 A |
[Verse 2]
A Asus4 | A | A/G♯ F♯m | E |
D E | A E/A | A | A/G♯ F♯m |
E | D E |
[Chorus 2]
A F♯m | D E | A F♯m | D E |
A D/A | A E |
[Interlude]
A A4 | A A/G♯ | F♯m E | D E |
A E/A | A C♯m | F♯m E | D E |
[Verse 3]
A Asus4 | A | A/G♯ F♯m | E |
D E | A E/A | A | C♯m7 F♯m |
E D | E |
[Chorus 3]
B G♯m | E F♯ | B G♯m | C♯m F♯ |
B | G♯m C♯m | F♯ B | G♯m C♯m |
F♯ B | G♯m E | F♯ B | G♯m E |
F♯ |
[Outro]
E D♯m | E F♯ | B |`,

`title: Golden Hour
by: JVKE
genre: Pop
feel: Piano pop
source: Ultimate Guitar chord chart
tempo: 94
key: E
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2
[Intro]
A E | F♯m E |
[Verse]
Amaj7 | E/G♯ | F♯m | F♯m |
Emaj7 | Emaj7 |
[Pre]
Amaj7 | G♯m | G♯m/G F♯m | G♯ |
[Chorus]
Amaj7 | Amaj7 Am | Emaj7 | Amaj7 |
Am Emaj7 | E7 |
[Verse 2]
Amaj7 | E/G♯ | F♯m | F♯m |
Emaj7 | Emaj7 | Amaj7 | G♯m |
F♯m | Emaj7 |
[Chorus 2]
Amaj7 | Amaj7 Am | Emaj7 | Amaj7 |
Am Emaj7 | E7 | Amaj7 Am | Emaj7 |
Amaj7 Am | Emaj7 E7 | Amaj7 G♯m7 | G Bm |
Am F♯7 |`,

`title: Until I Found You
by: Stephen Sanchez
genre: Pop
feel: 50s ballad 6/8
source: Ultimate Guitar chord chart
tempo: 101
key: B♭
form: Intro Verse Chorus Verse Chorus Interlude Chorus 2
[Intro]
B♭ Dm | E♭ E♭m |
[Verse]
B♭ Dm | E♭ E♭m | B♭ Dm | E♭ |
E♭m B♭ | Dm E♭ | E♭m B♭ | F F7 |
[Chorus]
E♭ F | B♭ Dm | E♭ F | B♭ B♭7 |
E♭ F | B♭ Dm | E♭ E♭m |
[Interlude]
B♭ Dm | E♭ E♭m |
[Chorus 2]
E♭ F | B♭ Dm | E♭ F | B♭ B♭7 |
E♭ F | B♭ Dm | E♭ E♭m | B♭ |`,

`title: Glimpse of Us
by: Joji
genre: Pop
feel: Piano ballad
source: Ultimate Guitar chord chart
tempo: 145
key: A♭
form: Intro Verse Pre Chorus Verse 2 Pre Chorus 2 Bridge Chorus 3 Outro
[Intro]
B♭m7 E♭7 | A♭ Fm |
[Verse]
Fm | B♭m7 | E♭7 | A♭ |
Fm | B♭m7 | E♭7 | A♭ Cm |
[Pre]
B♭m7 E♭7 |
[Chorus]
B♭m7 E♭7 | A♭ E♭/G | Fm | B♭m7 E♭7 |
A♭ E♭/G | Fm | B♭m7 E♭7 | A♭ E♭/G |
Fm | B♭m7 E♭7 | Fm7 |
[Verse 2]
Fm | B♭m7 | E♭7 | A♭ |
Fm | B♭m7 | E♭7 A♭ | E♭7 A♭ |
[Chorus 2]
B♭m7 E♭7 | A♭ E♭/G | Fm | B♭m7 E♭7 |
A♭ E♭/G | Fm | B♭m7 E♭7 | A♭ E♭/G |
Fm | B♭m7 E♭7 | B♭m7 |
[Bridge]
B♭m7 E♭7 | A♭ Fm | B♭m7 E♭7 | A♭ E♭/G |
F7 |
[Chorus 3]
B♭m7 E♭7 | A♭ E♭/G | Fm | B♭m7 E♭7 |
A♭ E♭/G | Fm | B♭m7 E♭7 | A♭ E♭/G |
Fm | B♭m7 E♭7 | A♭ |
[Outro]
B♭m7 E♭7 | A♭ E♭/G | Fm | B♭m7 E♭7 |`,

`title: Snowman
by: Sia
genre: Pop
feel: Christmas pop
source: Ultimate Guitar chord chart
tempo: 105
key: D♭
form: Verse Chorus Chorus 2 Verse 2 Chorus Chorus 2
[Verse]
D♭ E♭m | A♭ | D♭ | B♭m |
E♭m | A♭ | D♭ | B♭m |
[Chorus]
F7 B♭m | A♭ D♭ | F7 B♭m | G♭ A♭ |
D♭ F7 | B♭m G♭ | D♭ F7 | B♭m G♭ |
[Chorus 2]
D♭ F7 | B♭m G♭ | D♭ F7 | B♭m G♭ |
D♭ |
[Verse 2]
E♭m | A♭ | D♭ | B♭m |
E♭m | A♭ | D♭ | B♭m |`,

`title: Chandelier
by: Sia
genre: Pop
feel: Power pop
source: Ultimate Guitar chord chart
tempo: 117
key: D♭
form: Verse Pre Chorus Bridge Verse 2 Pre Chorus Bridge 2
[Verse]
B♭m | G♭ | A♭ Fm | B♭m |
G♭ | A♭ Fm |
[Pre]
G♭ | B♭m | A♭ | A♭ |
[Chorus]
G♭ A♭ | D♭/F G♭ | G♭ A♭ | D♭/F G♭ |
G♭ A♭ | D♭/F G♭ | G♭ A♭ | D♭/F G♭ |
[Bridge]
G♭ A♭ | D♭ G♭ | G♭ A♭ | D♭ G♭ |
G♭ |
[Verse 2]
B♭m | G♭ | A♭ Fm |
[Bridge 2]
G♭ A♭ | D♭ G♭ | G♭ A♭ | D♭ G♭ |
G♭ A♭ | D♭/F G♭ | G♭ A♭ | D♭/F G♭ |`,

`title: Perfect Night
by: LE SSERAFIM
genre: Pop
feel: K-pop
source: Ultimate Guitar chord chart
tempo: 105
key: G
form: Verse Verse 2 Pre Chorus Post Verse 3 Pre Chorus Post Interlude Pre Chorus Post 2
[Verse]
B♭M7 | Am7 | Gm7 | D7sus2 |
D7sus4 | D7 |
[Verse 2]
B♭M7 Am7 | Gm7 | Am7 D7sus2 | D7 |
B♭m7 Am7 | Gm7 | Am7 D7sus4 | D7 |
[Pre]
B♭M7 Am7 | Gm7 | Am7 D7sus2 | D7 |
[Chorus]
B♭M7 Am7 | Gm7 | Am7 D7sus2 | D7 |
B♭M7 Am7 | Gm7 | Am7 D7sus4 | D7 |
[Post]
B♭M7 Am7 | Gm7 | Am7 | D7sus2 D7 |
B♭M7 Am7 | Gm7 Am7 | D7sus4 D7 | B♭M7 |
[Verse 3]
Am7 Gm7 | Am7 D7sus2 | D7 | B♭M7 |
Am7 Gm7 | Am7 D7sus4 | D7 |
[Interlude]
Am7 Gm7 | Am7 D7sus2 | D7 |
[Post 2]
B♭M7 Am7 | Gm7 | Am7 | D7sus2 D7 |
B♭M7 Am7 | Gm7 Am7 | D7sus4 D7 |`,

`title: Dynamite
by: BTS
genre: Pop
feel: Disco pop
source: Ultimate Guitar chord chart
tempo: 114
key: E
form: Intro Verse Verse 2 Chorus Verse 3 Verse 2 Chorus Post Bridge Chorus 2 Post 2
[Intro]
C♯m F♯m | B E | C♯m F♯m | B E |
[Verse]
C♯m | F♯m | B | E |
C♯m | F♯m | B | E |
[Verse 2]
C♯m | F♯m | B | E |
C♯m F♯m | B | E |
[Chorus]
C♯m F♯m | B E | C♯m F♯m | B E |
C♯m F♯m | B E | C♯m F♯m | B E |
[Verse 3]
C♯m F♯m | B E | C♯m F♯m | B E |
[Post]
C♯m F♯m | B E | C♯m F♯m | B E |
C♯m F♯m | B E | C♯m F♯m | B E |
[Bridge]
C♯m F♯m | B E | C♯m F♯m | B E |
C♯m F♯m | B E | C♯m F♯m | B E |
[Chorus 2]
C♯m F♯m | B E | C♯m F♯m | B E |
C♯m F♯m | B E | C♯m F♯m | B E |
D♯m G♯m | C♯ F♯ | D♯m G♯m | C♯ F♯ |
D♯m G♯m | C♯ F♯ | D♯m G♯m | C♯ F♯ |
[Post 2]
D♯m G♯m | C♯ F♯ | D♯m G♯m | C♯ F♯ |
D♯m G♯m | C♯ F♯ | D♯m G♯m | C♯ F♯ |`,

`title: Spring Day
by: BTS
genre: Pop
feel: Ballad
source: Ultimate Guitar chord chart
tempo: 107
key: Cm
form: Intro Intro 2 Intro 3 Pre Chorus Chorus Interlude Interlude 2 Interlude 2 Pre 2 Chorus Chorus Bridge Chorus Chorus Interlude
[Intro]
E♭ Gm | Cm A♭ |
[Intro 2]
E♭ | Gm | Cm | A♭ |
E♭ | Gm | Cm | A♭ |
[Intro 3]
E♭ | Gm | Cm | A♭ |
E♭ | Gm | Cm | A♭ |
A♭ |
[Pre]
E♭ | Gm | Cm A♭ | E♭ Gm |
Cm | A♭ |
[Chorus]
E♭ Gm | Cm A♭ | Cm Gm | A♭ A♭m |
[Interlude]
E♭ Gm | Cm A♭ | Cm Gm | A♭ A♭m |
A♭m |
[Interlude 2]
E♭ | Gm | Cm | A♭ |
[Pre 2]
E♭ Gm | Cm A♭ | E♭ Gm | Cm A♭ |
[Bridge]
A♭ B♭ | Gm Cm | A♭ B♭ | Gm B♭ |`,

`title: Across the Universe
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 75
key: D
form: Intro A A2 B A3 A3 B A2 A3 B2
[Intro]
D | F♯m | A |
[A]
D Bm | F♯m | Em | A A7 |
[A2]
D Bm | F♯m | Em | Gm |
[B]
D | % | A | A7 |
% | G | D | A7 |
% | G | D |
[A3]
D Bm | F♯m | Em | A7 |
[B2]
D | % | A | A7 |
% | G | D | A7 |
% | G | D | D |
D |`,

`title: Africa
by: Toto
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 95
key: A
form: Intro Intro A A2 B B2 A A2 B B3 B B2
[Intro]
A C♯m | C♯m | A C♯m | C♯m |
[A]
B D♯m | G♯m G♯m/F♯ | A/E E/F♯ | G♯m |
A C♯m |
[A2]
B D♯m | G♯m G♯m/F♯ | A/E E/F♯ | G♯m |
A C♯m | B D♯m | G♯m | A C♯m |
C♯m |
[B]
F♯m D | A E |
[B2]
F♯m D | A E | F♯m D | A C♯m |
E F♯m | A C♯m | C♯m | A C♯m |
C♯m |
[B3]
F♯m D | A E | F♯m D | A C♯m |
E F♯m | A C♯m | C♯m | A C♯m |
C♯m | B D♯m | G♯m | A C♯m |
C♯m |`,

`title: Ain't Nobody
by: Rufus and Chaka Khan
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 105
key: E♭m
form: Intro Intro A A B B2 B3 B3 C C2 C2 B2 B3 B3
[Intro]
E♭m | % | % | % |
[A]
E♭m | % | B | % |
E♭m | % | B | % |
B♭m | B D♭ | E♭m | % |
[B]
E♭m G♭ | A♭m B | E♭m G♭ | A♭m B |
E♭m G♭ | A♭m B | E♭m | % |
E♭m | % |
[B2]
E♭m G♭ | A♭m B | E♭m G♭ |
[B3]
E♭m G♭ | A♭m B | E♭m G♭ | A♭m B |
[C]
E♭m9 | A♭m B♭m/D♭ | E♭m9 |
[C2]
E♭m9 | A♭m B♭m/D♭ | E♭m9 | A♭m B♭m/D♭ |`,

`title: All Day Music
by: War
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 105
key: E
form: Intro Intro A B C
[Intro]
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
[A]
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
[B]
Gmaj7 | % | E♭m9 | % |
Dm7 | % | % | N.C. |
[C]
Cm7 | Bm | B♭m7 | N.C. F♯m7 Fm |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |
Emaj9 | Dmaj9 | Emaj9 | Dmaj9 |`,

`title: All In Love Is Fair
by: Stevie Wonder
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 70
key: C♯m
form: Intro A B C A B C2
[Intro]
C♯m | C♯m/B | Amaj7 Gmaj7 | F♯7sus B7sus |
[A]
C♯m | C♯m/B | A♯m7♭5 | Amaj7 |
G♯m7♭5 | C♯7 | F♯7 | B7sus |
[B]
C♯m | C♯m/B | A♯m7♭5 | Amaj7 |
G♯m7♭5 | C♯7♯9 | F♯m7 | G♯7sus G♯7♭9 |
[C]
C♯m | C♯m/B | A♯m7♭5 | Am7 D7 |
E/B C♯7 | F♯7 B7sus | E | E G♯7/D♯ |
[C2]
C♯m | C♯m/B | A♯m7♭5 | Am7 D7 |
E/B C♯7 | F♯7 B7sus | E | Am7 D7 |
E/B C♯7 | F♯7 B7sus | E | E7/D |
A/C♯ G♯7/C G♯7 | C♯m |`,

`title: All My Loving
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 150
key: E
form: A A B C B2 B3
[A]
F♯m | B | E | C♯m |
A | F♯m | D | B7 |
F♯m | B | E | C♯m |
A | B | E | E N.C. |
[B]
C♯m | C+ | E | % |
C♯m | C+ | E | E N.C. |
[C]
A7 | % | E | % |
F♯m | B7 | E | E N.C. |
[B2]
C♯m | C+ | E | % |
[B3]
C♯m | C+ | E | % |
C♯m | % | E | % |
C♯m | % | E | % |`,

`title: All You Need Is Love
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 110
key: G
form: Intro A B B C D C D2
[Intro]
G D | G | C D |
[A]
G D | Em | G D | Em |
Am G | D/F♯ D/E | D D/C | D |
[B]
G D/F♯ | Em | G D/F♯ | Em |
D7/A G | D/F♯ D/E | D D/C | D/B D |
[C]
G A7 | D7 | G A7 | D7 |
G B7 | Em Em7/D | C D7 | G |
[D]
G D/F♯ | Em | G D/F♯ | Em |
D7/A G | D/F♯ D/E | D D/C | D/B D |
[D2]
G D/F♯ | Em | G D/F♯ | Em |
D7/A G | D/F♯ D/E | D D/C | D/B D |
G A7 | D7 | G A7 | D7 |
G B7 | Em Em7/D | C D7 | G |
G A7 | D7 | G A7 | D7 |
G B7 | Em Em7/D | C D7 | G |
G | G |`,

`title: Always and Forever
by: Heatwave
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 60
key: D
form: Intro A B A B2
[Intro]
Dmaj7 | G7 A7sus | Dmaj7 | G7 A7sus |
[A]
Dmaj7 | Bm7 | Gmaj7 Dmaj7 | Em7 A7sus |
Dmaj7 | Bm7 | Gmaj7 Dmaj7 | Em7 A7sus |
[B]
Dmaj7 | G D Em7 | A7sus | Dmaj7 F♯m7 |
G D Em7 | F♯m7 | G D Em7 Asus | Dmaj7 F♯m7 |
G D Em7 Asus | Dmaj7 | G7 A7sus |
[B2]
Dmaj7 | G D Em7 | A7sus | Dmaj7 F♯m7 |
G D Em7 | F♯m7 | G D Em7 Asus | Dmaj7 F♯m7 |
G D Em7 Asus | Dmaj7 | G7 A7sus | Dmaj7 |
G7 A7sus | Dmaj7 | G7 A7sus |`,

`title: Always On My Mind
by: Brenda Lee
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 115
key: D
[A]
D | A/C♯ | Bm D/A | G A |
D | A/C♯ | Bm D/A | G♯m7♭5 |
G | D | G D/F♯ | Em |
[B]
A Bm A/C♯ | D Em F♯m | G A7 | D G A |
[C]
D A/C♯ | Bm D/A | G D/F♯ | Em G/A A7 |
[C2]
D A/C♯ | Bm D/A | G D/F♯ | Em A7 |`,

`title: And I Love Her
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 115
key: E
form: Intro A A B C C D
[Intro]
F♯m | % | C♯m/E | % |
[A]
F♯m | C♯m | F♯m | C♯m |
F♯m | C♯m | A | B |
E | % |
[B]
C♯m | B | C♯m | G♯m |
C♯m | G♯m | B | B7 |
[C]
Gm | Dm | Gm | Dm |
Gm | Dm | B♭ | C |
F | % |
[D]
Gm | % | Dm/F | % |
Gm | % | Dm |`,

`title: Angel
by: Jimi Hendrix
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 70
key: E
form: Intro Intro A B
[Intro]
A♯m7/F♯ | % | G♯m7/F♯ | % |
[A]
F♯ C♯ | G♯m7 | B E/B | F♯ |
F♯ C♯ | G♯m7 | B E/B | F♯ |
B Dmaj9 | F♯ | G♯m7 A♯m7 | B |
E/B |
[B]
E Emaj7 | F♯m7 | C A/C♯ D D♯ | E |
E Emaj7 | F♯m7 | C A/C♯ D D♯ | E |
C A/C♯ D D♯ | E |`,

`title: Angels
by: Robbie Williams
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 75
key: E
form: Intro A A B C A A B2 C D D C
[Intro]
E | % | % | % |
[A]
E | % | A | B |
[B]
F♯m | A | C♯m | A |
D | A | E | D A/C♯ |
E |
[C]
B | C♯m | A | E |
B | C♯m | A | E/G♯ |
F♯m | D A/C♯ | E |
[B2]
D | A/C♯ | E | D |
A/C♯ | E | E |
[D]
Bm | A | E | % |`,

`title: Another One Bites The Dust
by: Queen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 110
key: Em
form: Intro Intro A B A2 A B A3
[Intro]
Em | Em Am | Em | Em Am |
[A]
Em | Em Am | Em | Em Am |
[B]
C G | % | % | Am B |
[A2]
Em | Em Am | Em | Em Am |
Em | Em Am | F♯m B | F♯m B |
Em | Em Am | Em | Em Am |
[A3]
Em | Em Am | Em | Em Am |
Em | Em Am | F♯m B | F♯m B |
Em N.C. | N.C. | N.C. | % |
N.C. | N.C. | % | N.C. |
N.C. | N.C. | % | N.C. |
N.C. | Em | Em Am | Em |
Em Am | C G | % | % |
Am B |`,

`title: Another Star
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 115
key: F♯m
form: Intro Intro A A B A A
[Intro]
F♯m9 | E7 | Dmaj7 | C♯m7 |
Bm7 | C♯7♯9 | F♯m9 | % |
[A]
F♯m7 | E7 | Dmaj7 | C♯m7 |
Bm7 | C♯7♯9 | F♯m9 | % |
[B]
Em7 | A7 | Dmaj7 | % |
Em7 | A7 | Dmaj7 | % |
F♯m7 | B7 | Emaj7 | C♯7 |
F♯m7 | G♯7 | C♯7sus | C♯7♭9 |`,

`title: As
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 100
key: B
[Intro]
Bmaj7 B7 | Emaj7 | Bmaj7 B7 | Emaj7 |
[A]
Bmaj7 B7 | Emaj7 | Bmaj7 | Amaj7 |
Bmaj7 B7 | Emaj7 | G♯m7 A♯m D♯7 | G♯m C♯7/G♯ C♯m F♯7 |
[A2]
Bmaj7 B7 | Emaj7 | Bmaj7 | Amaj7 |
Bmaj7 B7 | Emaj7 | G♯m7 A♯m D♯7 |
[B]
G♯m7 D♯7/A♯ | G♯m7/B C♯7 | G♯m7 D♯7/A♯ | G♯m7/B C♯7 |
G♯m7 D♯7/A♯ | G♯m7/B C♯7 | G♯m7 D♯7/A♯ | G♯m7/B F7♯11 |
[C]
Emaj7 | Bmaj7 | Emaj7 | Dmaj7 |
Emaj7 | Bmaj7 | C♯m7 | D♯sus D♯7 C♯m F♯7 |
G♯m7 D♯7/A♯ | G♯m7/B C♯7 | G♯m7 D♯7/A♯ | G♯m7/B C♯7 |`,

`title: Baker Street
by: Gerry Rafferty
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 110
key: D
form: Intro Intro Intro2 A A B B2 D D2
[Intro]
G/A | E♭/F | F/G | % |
[Intro2]
D5 | D5 D5/G | D5 | D5 D5/G |
C | A7 | G5 | % |
[A]
A Asus | A | A Asus | A |
Em | G | D Dsus | D |
[B]
Dm7 | Am7 | Dm7 | Am7 |
C | G | D | % |
[B2]
Dm7 | Am7 | Dm7 | Am7 |
C | G | A | F/G |
[D]
D5 | D5 D5/G | D5 | D5 D5/G |
C | A7 | G5 | % |
[D2]
D5 | D5 D5/G | D5 | D5 D5/G |
C | A7 | G5 | % |
D5 | D5 D5/G | D5 | D5 D5/G |
C | A7 | G5 | % |
D5 | D5 D5/G | D5 | D5 D5/G |
C | A7 | G5 | % |`,

`title: Ben
by: Michael Jackson
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 70
key: F
form: Intro A A2 B B C
[Intro]
F B♭/F | F B♭/F | F B♭/F | F B♭/F |
[A]
F | C7/E | F | C7/E |
F | A7sus A7/C♯ | E♭7 D7 | D♭7 C7 |
F B♭/F | F B♭/F |
[A2]
Fm Fm9 | C7/E | Fm9 Fm | C7/E |
F | A7sus A7/C♯ | E♭7 D7 | D♭7 C7 |
F B♭/F | F B♭/F |
[B]
Gm7 C7/E | Fmaj7 F6 | Gm7 C7/E | Fmaj7 |
[C]
F | C7/E | F | C7/E |
F | C7/E | E♭7 D7 | D♭7 C7 |
F B♭/F | F B♭/F | F B♭/F | F B♭/F |
F |`,

`title: Big Yellow Taxi
by: Joni Mitchell
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 160
key: E
form: Intro A B A B2
[Intro]
A A6 | % | B B6 | % |
E A/E D/E A/E | % | E A/E D/E A/E | % |
[A]
A Asus | % | E A/E D/E A/E | % |
A A6 | B B6 | E A/E D/E A/E | % |
[B]
E | Emaj7 | A/E | B/E E |
A A6 | B B6 | E A/E D/E A/E | % |
E A/E D/E A/E | % |
[B2]
E | Emaj7 | A/E | B/E E |
A A6 | B B6 | E A/E D/E A/E | % |
E A/E D/E A/E | % | E | Emaj7 |
A/E | B/E E | A A6 | B B6 |
E A/E D/E A/E | % | A A6 | B B6 |
E A/E D/E A/E | % | E |`,

`title: Black Velvet
by: Alannah Myles
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 90
key: E♭m
time: 1/2
form: Intro Intro A B C A B C2 D
[Intro]
E♭m | % | E♭m | % |
[A]
E♭m | % | E♭m | % |
E♭m | % | E♭m | % |
[B]
B♭sus B♭ | A♭sus A♭ | G♭sus G♭ | D♭add9 |
[C]
A♭m | D♭ | A♭m | E B |
A♭m | D♭ | B7 B♭7 | E♭m |
E♭m | % | E♭m |
[C2]
A♭m | D♭ | A♭m | E B |
A♭m | D♭ | B7 B♭7 | E♭m |
E♭m |
[D]
A♭m | B♭ | E♭m | % |
A♭m | E | B | B♭7 |
A♭m | D♭ | A♭m | E B |
A♭m | D♭ | B7 B♭7 | E♭m |
A♭m | D♭ | A♭m | E B |
A♭m | D♭ | B7 B♭7 | E♭m |
% | E♭m | % | E♭m |
% | E♭m | % |`,

`title: Blackbird
by: The Beatles
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 90
key: G
[Intro]
G Am G/B | G |
[A]
G Am G/B | G | C A7/C♯ D B7/D♯ | Em Em/D♯ |
D A7/C♯ | C Cm | G/B A7 | D7 G |
C G/B A7 | D7 G |
[A2]
G Am G/B | G | C A7/C♯ D B7/D♯ | Em Em/D♯ |
D A7/C♯ | C Cm | G/B A7 | D7 G |
F C/E Dm C | B♭6 C | F C/E Dm C | B♭6 A7 |
D7 |
[B]
F C/E Dm C | B♭6 C | F C/E Dm C | B♭6 A7 |
D7 | G Am G/B | G | % |
G | % | G Am G/B C | G/B A7 D7 |
[A3]
G Am G/B | G | C A7/C♯ D B7/D♯ | Em Em/D♯ |
D A7/C♯ | C Cm | G/B A7 | D7 G |
C G/B A7 | D7 G | C G/B A7 | D7 G |`,

`title: Blame It On The Sun
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 72
key: A♭
form: Intro A A B
[Intro]
A♭ A♭sus | % | A♭ A♭sus | % |
[A]
A♭ E♭/G | F7 | Cm7 G7/B | Cm7 |
Fm9 | B♭m9 | E♭sus | E♭7 |
[B]
B♭m7 Fm7 | B♭m Fm | Dm7♭5 G7♭13 | Cm7 |
B♭m7 Fm7 | B♭m Fm Fm/E♭ | Dm7♭5 G7♭13 | Cm7 |
D♭ Cm B♭m E♭sus | A♭ A♭sus | A♭ A♭sus | E♭sus |
A♭ B♭/A♭ | B♭/A♭ | D♭m/A♭ | A♭ |`,

`title: Blue
by: Joni Mitchell
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 78
key: Bm
form: A A B C A2
[A]
Bm B7sus | % | Gmaj7 Em | E7 |
E7sus | % | Bm Gmaj7 | E/A |
% |
[B]
Bm | Gmaj7 | E7sus | % |
Bm | Gmaj7 | E7sus | % |
Asus | % |
[C]
Bm | F♯m9 F♯m(maj7) | E7sus | % |
E7sus | % | Bm B7sus | % |
F♯m9 F♯m(maj7) | F♯m7 | E7sus | % |
A6 | % |
[A2]
Bm B7sus | % | E7sus | % |
E7 | Em11 | % | Em9 |
Bm | F♯m9 F♯m(maj7) | E7sus | % |
Bm | % | B7 |`,

`title: Blue Suede Shoes
by: Elvis Presley
genre: Pop
feel: Rock'n'Roll
source: iReal Pro community chart
tempo: 180
key: A
form: A B C B C2
[A]
A7 N.C. | A7 N.C. | A7 N.C. | A7 |
D7 | % | A7 | % |
E7 | % | A7 | % |
[B]
A7 N.C. | A7 N.C. | A7 N.C. | A7 N.C. |
A7 N.C. | A7 N.C. | A7 N.C. | A7 |
D7 | % | A7 | % |
E7 | % | A7 | % |
[C]
A7 | % | A7 | % |
D7 | % | A7 | % |
E7 | % | A7 | % |
[C2]
A7 | % | A7 | % |
D7 | % | A7 | % |
E7 | % | A7 | % |
A7 | % | A7 | % |
D7 | % | A7 | % |
E7 | % | A7 | % |`,

`title: Both Sides Now
by: Joni Mitchell
genre: Pop
feel: Folk
source: iReal Pro community chart
tempo: 97
key: G♭
form: Intro A A B A A B C
[Intro]
G♭ B/G♭ | % | G♭ B/G♭ | % |
[A]
G♭maj7 B/G♭ | B/G♭ D♭/G♭ G♭ | G♭ G♭maj9 | B/G♭ D♭/G♭ G♭ |
G♭ B/G♭ | D♭/G♭ | G♭maj7 B/G♭ | D♭sus/G♭ |
[B]
G♭maj7 B/G♭ | B/G♭ D♭/G♭ G♭ | G♭ B/G♭ | G♭ B/G♭ |
G♭maj7 B/G♭ | D♭/G♭ G♭ | G♭maj7 B/G♭ | D♭7sus |
% | G♭ B/G♭ | % | G♭ B/G♭ |
G♭ |
[C]
G♭maj7 B/G♭ | B/G♭ D♭/G♭ G♭ | G♭ B/G♭ | G♭ B/G♭ |
G♭maj7 B/G♭ | D♭/G♭ G♭ | G♭maj7 B/G♭ | D♭7sus |
% | G♭ B/G♭ | % | G♭ B/G♭ |
G♭ |`,

`title: Breakaway
by: Kelly Clarkson
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 150
key: C
time: 6/4
form: Intro Intro A A2 B B A A2 B C C2 B B2
[Intro]
Am G/B | C F | Am G/B | F |
[A]
Am G/B | C F | Am G/B | F |
[A2]
Am G/B | C F | Am G/B | F |
Am G | D | F G |
[B]
C | G | Am | F |
C | G | Am G | F |
[C]
G | C F | G | C F |
[C2]
G | C F | D | F G |
[B2]
C | G | Am | F |
C | G | Am G | F |
Am G | F |`,

`title: Breakdown
by: Tom Petty and the Heartbreakers
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 111
key: Am
form: Intro Intro A A B C
[Intro]
Am G | % | Am G | % |
[A]
Am G | % | Am G | % |
Am G | % | Am G | F G/F |
Fmaj7 G/F |
[B]
Am G | F G | Am G | F G |
Am G | F G | Am G | F G/F |
Fmaj7 G/F | F G/F | Fmaj7 G/F |
[C]
Am G | % | Am G | % |
Am G | % | Am G | % |
Am G | % | Am G | F G/F |
Fmaj7 G/F | Am G | % | Am G |
% | Am G | % | Am G |
% |`,

`title: Brown Eyed Girl
by: Van Morrison
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 135
key: G
form: Intro Intro A A B A A B2 C C2
[Intro]
G | C | G | D7 |
[A]
G | C | G | D7 |
G | C | G | D7 |
[B]
C | D7 | G | Em |
C | D7 | G | D7 |
[B2]
C | D7 | G | Em |
C | D7 | G | D7 |
% | % |
[C]
G | C | G | D7 |
[C2]
G | C | G | D7 |
G | % | G | % |
G | C | G | D7 |`,

`title: Can You Feel The Love Tonight
by: Elton John-Tim Rice
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B♭
form: Intro A B B2 B B3
[Intro]
B♭ F/A | E♭/G B♭/F | E♭ B♭/D | F/A B♭ Cm B♭/D |
[A]
E♭ B♭/D | E♭ B♭/D | E♭ B♭/D | Cm F/A |
E♭ B♭/D | E♭ B♭/D | E♭ Gm | A♭ F |
[B]
B♭ F/A | Gm E♭ | B♭ E♭ C/E | F |
E♭ B♭/D | Gm B♭maj7/F E♭ | Cm B♭/D E♭ C/E | F |
[B2]
B♭ F/A | Gm E♭ | B♭ E♭ C/E | F |
E♭ B♭/D | Gm B♭maj7/F E♭ | Cm B♭/D E♭ F7sus | E♭/B♭ B♭ |
A♭ F | F |
[B3]
B♭ F/A | Gm E♭ | B♭ E♭ C/E | F |
E♭ B♭/D | Gm B♭maj7/F E♭ | Cm B♭/D E♭ Fsus | E♭/B♭ B♭ |
E♭ B♭/D | Gm B♭maj7/F E♭ | Cm B♭/D E♭ Fsus | E♭/B♭ B♭ |`,

`title: Can't Buy Me Love
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 180
key: C
form: Intro A A B A2 A3
[Intro]
Em | Am | Em | Am |
Dm | G7 |
[A]
C7 | % | C7 | % |
F7 | % | C7 | % |
G7 | F7 | % | C |
[B]
Em | Am | C | % |
Em | Am | Dm | G7 |
[A2]
C7 | % | C7 | % |
F7 | % | C7 | % |
G7 | F7 | F | C |
% |
[A3]
C7 | % | C7 | % |
F7 | % | C7 | % |
G7 | F7 | C | % |
F7 | C | Em | Am |
Em | Am | Dm | G7 |
C7 | % |`,

`title: Can't Help Falling In Love
by: Elvis Presley
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 69
key: D
time: 6/8
form: Intro A A B A2 B A2 C
[Intro]
D | A7 | D | % |
[A]
D | F♯m7 | Bm7 | Bm7/A |
G | D/F♯ | A7/E | A7 |
G | A | Bm7 | G G/E |
D/A | A | D | % |
[B]
F♯m7 | C♯7 | F♯m7 | C♯7 |
F♯m7 | C♯7 | F♯m7 | B9 |
Em7 | A7 |
[A2]
D | F♯m7 | Bm7 | Bm7 Bm7/A |
G | D/F♯ | A7/E | A7 |
G | A | Bm7 | G G/E |
D/A | A | D | % |
[C]
G | A | Bm7 | G G/E |
D/A | A | D | % |`,

`title: Can't Take My Eyes Off You
by: Frankie Valli
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 110
key: E
form: Intro Intro A A B B2 C C2 D
[Intro]
F♯/E | Am6/E | E | % |
[A]
E | % | Emaj7 | % |
E7 | % | A | % |
Am6 | % | E | % |
F♯/E | Am6/E | E | % |
[B]
F♯m7♭5 F♯m7 F♯m7♭5 F♯m7 | B7♭9 B9 Bsus B7 | Am7/E Emaj13 Am7/E Emaj13 | Am7/E Emaj13 Am7/E Emaj13 |
[B2]
F♯m7♭5 F♯m7 F♯m7♭5 F♯m7 | B7♭9 B9 Bsus B7 | Am7/E Emaj13 Am7/E Emaj13 | C♯7 |
% |
[C]
F♯m7 | B7 | G♯m7 | C♯m7 |
F♯m7 | B7 | Emaj7 | C♯7 |
[C2]
F♯m7 | B7 | G♯m7 | C♯m7 |
F♯m7 | % | D9 | % |
[D]
G | % | Gmaj7 | % |
G7 | % | C | % |
Cm6 | % | G | % |
A/G | Cm6/G | G | % |
C♯7 | F♯m7 | B7 | G♯m7 |
C♯7 | F♯m7 | B7 | Emaj7 |
C♯7 | F♯m7 | B7 | G♯m7 |
C♯7 | F♯m7 | B7 | Emaj7 |
C♯7 | Emaj7 |`,

`title: Careless Whisper
by: George Michael
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 80
key: Dm
form: Intro Intro A B A B2
[Intro]
Dm7 | Gm7 Am7 | B♭maj7 | Am7 |
[A]
Dm7 | Gm7 Am7 | B♭maj7 | Am7 |
Dm7 | Gm7 Am7 | B♭maj7 | Am7 |
[B]
Dm7 | Gm7 | B♭maj7 | Am7 |
Dm7 | Gm7 | B♭maj7 | Am7 |
Dm7 | Gm7 | B♭maj7 | Am7 |
[B2]
Dm7 | Gm7 | B♭maj7 | Am7 |
Dm7 | Gm7 | B♭maj7 | Am7 |
Dm7 | Gm7 | B♭maj7 | Am7 |
Dm7 | Gm7 | B♭maj7 | Am7 |`,

`title: Caught Up In The Rapture
by: Anita Baker
genre: Pop
feel: R'n'B
source: iReal Pro community chart
tempo: 92
key: D
form: Intro Intro A B C A B C2
[Intro]
Dmaj7 | Gm7 Am7 | B♭/C | Gm7 A7sus |
[A]
Dmaj7 | F♯m7 | Gmaj7 | B♭/C |
Dmaj7 | F♯m7 | Gmaj7 | B♭/C |
[B]
C♯m11 F♯7♯5 | Bm9 E9 | Am11 D7 | Gmaj7 B♭/C |
C♯m11 F♯7♯5 | Bm9 E9 | A7sus | % |
[C]
B7sus | % | Gmaj7 | Em7 F♯7♯5 |
Bm11 | % | Gmaj7 | Em7 A7sus |
Dmaj7 | Gm7 Am7 | B♭/C | Gm7 A7sus |
[C2]
B7sus | % | Gmaj7 | Em7 F♯7♯5 |
Bm11 | % | Gmaj7 | Em7 F♯7♯5 |
Bm11 | % | Gmaj7 | Em7 A7sus |
Dmaj7 | Gm7 Am7 | B♭/C | Gm7 A7sus |
Dmaj7 | Gm7 Am7 | B♭/C | Gm7 A7sus |
Bm11 | % | Gmaj7 | Em7 F♯7♯5 |
Bm11 | % | Gmaj7 | Em7 F♯7♯5 |
Bm11 |`,

`title: Chain Lightning
by: Steely Dan
genre: Pop
feel: Pop-Shuffle
source: iReal Pro community chart
tempo: 95
key: A
form: Intro Intro A B B2
[Intro]
A13 A7 | % | A13 A7 | % |
[A]
A13 A7 | % | A13 A7 | % |
D/C | D/C C/D | Gmaj13 C/D | Gmaj7 C/D |
D C/D | D/E E7 | A13 A7 | % |
[B]
A13 A7 | % | A13 A7 | % |
D/C | D/C C/D | Gmaj13 C/D | Gmaj7 C/D |
D C/D | D/E E7 | A13 A7 | % |
[B2]
A13 A7 | % | A13 A7 | % |
D/C | D/C C/D | Gmaj13 C/D | Gmaj7 C/D |
D C/D | D/E E7 | A13 A7 | % |
A5 | % | A13 A7 | % |
A13 A7 | % | D/C | D/C C/D |
Gmaj13 C/D | Gmaj7 C/D | D C/D | D/E E7 |
A13 A7 | % |`,

`title: Change The World
by: Eric Clapton
genre: Pop
feel: Blues
source: iReal Pro community chart
tempo: 99
key: E
form: Intro A B A B2 C C2
[Intro]
E A2/F♯ | G | G A2/F♯ | E |
E A2/F♯ | G | G A2/F♯ | B11 |
[A]
E A2/E | E7 | E7 A2/E | E |
E A2/E | E7 | E7 A2/E | E |
A Bm/A | A7 | A7 Bm/A | A |
E A2/E | E7 | E7 A2/E | G♯7 |
[B]
F♯m7 G♯7 | C♯m7 | D♯m7♭5 G♯7 | C♯m7 |
D♯m7♭5 G♯7 | C♯m7 Cm7 Bm7 | A E/G♯ | E/G♯ E°/G F♯m7 |
B11 | E A2/F♯ | G | G A2/F♯ |
E |
[B2]
F♯m7 G♯7 | C♯m7 | D♯m7♭5 G♯7 | C♯m7 |
D♯m7♭5 G♯7 | C♯m7 Cm7 Bm7 | A E2/G♯ | E/G♯ E°/G F♯m7 |
E | A E2/G♯ | E/G♯ E°/G F♯m7 | B11 |
[C]
E A2/F♯ | G | G A2/F♯ | E |
[C2]
E A2/F♯ | G | G A2/F♯ | G♯7 |
A E/G♯ | E/G♯ E°/G F♯m7 | A E/G♯ | E/G♯ E°/G F♯m7 |
F♯m7 | B11 | E A2/F♯ | G |
G A2/F♯ | E |`,

`title: Cherish The Day
by: Sade
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 88
key: Cm
form: Intro Intro A A B C C B2 B2 D
[Intro]
Cm9 | C13sus | Fm7 | Gm7 |
[A]
Cm | C13sus | Fm7 | Gm7 |
[B]
Cm | Gm7 | Fm7 | Gm7 |
Cm | C13sus | Fm7 | Gm7 |
[C]
Cm | C13sus | Fm7 | Gm7 |
[B2]
Cm | C13sus | Fm7 | Gm7 |
[D]
Cm N.C. | % | Cm N.C. | % |
Cm | C13sus | Fm7/C | Gm7/C |
Cm | C13sus | Fm7/C | Gm7/C |
Cm | C13sus | Fm7/C | Gm7/C |
Cm | C13sus | Fm7/C | Gm7/C |
Cm |`,

`title: The Circle Game
by: Joni Mitchell
genre: Pop
feel: Folk
source: iReal Pro community chart
tempo: 111
key: B
form: Intro Intro2 A B A B2
[Intro]
Bmaj7/D♯ C♯m7 | Bmaj7/D♯ C♯m7 |
[Intro2]
Bmaj7/D♯ C♯m7 | B E/B | B |
[A]
B | E2/B | B | % |
B | E2/B | F♯7 | % |
B | E2/B | Bmaj7/D♯ | % |
Eadd9 | B D♯m C♯m | B E/B | B |
[B]
B | D♯m C♯m B | B | D♯m C♯m B |
E/B | % | B E/B | B |
E/B | % | Bmaj7/D♯ | Eadd9 |
B | Bmaj7/D♯ C♯m | B E/B | B |
[B2]
B | D♯m C♯m B | B | D♯m C♯m B |
E/B | % | B E/B | B |
E/B | % | Bmaj7/D♯ | Eadd9 |
B | Bmaj7/D♯ C♯m | B E/B | B |
Bmaj7/D♯ | C♯m | B E/B | B E/B |
B |`,

`title: Close To You (They Long To Be)
by: The Carpenters
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 95
key: C
[Intro]
Cadd9 C | % | Cadd9 C | % |
[A]
C69 | B7sus B7 | Bm7 | Em7 |
C69 | C6 | Gmaj7 D/G | Gmaj7 |
[A2]
C69 | B7sus B7 | Bm7 | Em7 |
C69 | C6 | Gmaj7 D/G | G7 |
[B]
C C6 Cmaj7 | % | Bm7 | Em7 |
C69 Cmaj7 | % | D | D9 |
[C]
D♭69 | C7sus C7 | Cm7 | Fm7 |
D♭69 | D♭6 | A♭maj7 E♭/A♭ | A♭maj7 |
[D]
D♭ D♭6 D♭maj7 | % | Cm7 | Fm7 |
D♭69 | D♭6 | E♭ | E♭9 |
[C2]
D♭69 | C7sus C7 | Cm7 | Fm7 |
D♭69 | D♭6 | A♭maj7 E♭/A♭ | A♭maj7 |
D♭69 | D♭6 | A♭69 | A♭6 |
A♭69 | A♭6 | D♭maj7 | % |
A♭69 | A♭6 | D♭maj7 | % |
A♭maj7 |`,

`title: Cocaine
by: Eric Clapton
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 105
key: E
form: Intro Intro A B A2 A B A2 C C2 C C
[Intro]
E7 | D | E7 | D |
[A]
E7 | D | E7 | D |
E7 | D | E7 | D |
[B]
E7 D7 | C B7 |
[A2]
E7 | D | E7 | D |
[C]
E7 | D | E7 | D |
[C2]
E7 | D | E7 | D |
E7 D7 | C B7 |`,

`title: Color My World
by: Chicago
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 54
key: F
time: 1/2
[Intro]
Fmaj7 |
[A]
Fmaj7 | Am | B♭ | E♭maj9 |
A♭maj7 | G♭maj7 | D9 D7 | Gmaj7 |
E♭9 | C7 | % | Fmaj7 B♭ C7 |
[A2]
Fmaj7 | Am | B♭ | E♭maj9 |
A♭maj7 | G♭maj7 | D9 D7 | Gmaj7 |
E♭9 | C7 | % | Fmaj7 B♭ C7 |
Fmaj7 |`,

`title: Come Away With Me
by: Norah Jones
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 74
key: C
time: 3/4
form: Intro Intro A A2 B A3
[Intro]
C | Am | C | Am |
[A]
C | Am | C | Am |
C | Am | Em | F |
C | G |
[A2]
C | Am | C | Am |
C | Am | Em | F |
C | % |
[B]
G | F | C | % |
G | F | C | G |
[A3]
C | Am | C | Am |
C | Am | Em | F |
C | G7 | C | G7 |
C |`,

`title: Come Together
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 85
key: Dm
form: Intro A A2 B A2 B2 C
[Intro]
Dm Dm7/F Dm7/D | % | Dm Dm7/F Dm7/D | % |
[A]
Dm Dm/F Dm/D | % | Dm Dm/F Dm/D | % |
A7 | % | G7 | % |
Dm Dm/F Dm/D | % | Dm Dm/F Dm/D | % |
[A2]
Dm Dm/F Dm/D | % | Dm Dm/F Dm/D | % |
A7 | % | G7 | % |
[B]
Bm Bm/A | G A7 | Dm Dm/F Dm/D | % |
Dm Dm/F Dm/D | % |
[B2]
Bm Bm/A | G A7 | Dm Dm/F Dm/D | % |
[C]
Dm | % | Dm | % |
A7 | % | A7 | % |
Dm Dm/F Dm/D | % | Dm | % |
Dm | % | Dm | % |
Dm | % |`,

`title: Could You Be Loved
by: Bob Marley
genre: Pop
feel: Reggae
source: iReal Pro community chart
tempo: 97
key: D
form: Intro Intro B B A A2 B B C C2 A3 A3 D D
[Intro]
Bm | % |
[B]
D | Bm7 | G | D |
[A]
Bm | % | Em | % |
[A2]
Bm | % | Em | % |
Bm | % | G F♯m | Em |
Bm | % | G F♯m | A |
[C]
Bm | % | Bm | % |
[C2]
Bm | % | Bm | % |
A |
[A3]
D | Bm7 | G | D |
[D]
Bm | % | Bm | % |`,

`title: Crazy (Gnarls Barkley)
by: Gnarls Barkley
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 110
key: Cm
form: A A B C A B C2
[A]
Cm | % | E♭maj7 | E♭maj7 E♭ |
A♭add9 | A♭ | Gsus | G |
[B]
Cm | % | E♭maj7 | % |
A♭add9 | A♭ | Gsus | G |
[C]
C | % | A♭add9 | A♭ |
E♭maj7 | % | Gsus | G |
[C2]
C | % | A♭add9 | A♭ |
E♭maj7 | % | Gsus | G |
C |`,

`title: Creep
by: Radiohead
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 100
key: G
form: Intro A A B C C D D2
[Intro]
G | % | B | Bsus B |
C | Csus C | Cm | Cm Cm/D Cm/E♭ Cm/F |
[A]
G | % | B | % |
C | % | Cm | Cm Cm/D Cm/E♭ Cm/F |
[B]
G | % | B | % |
C | % | Cm | % |
[C]
G | % | B | % |
C | % | Cm | % |
[D]
G | % | B | % |
C | % | Cm | Cm Cm/D Cm/E♭ Cm/F |
[D2]
G | % | B | % |
C | % | Cm | Cm Cm/D Cm/E♭ Cm/F |
G |`,

`title: Dancing In The Dark
by: Bruce Springsteen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 144
key: B
form: Intro Intro A B A B2 C D
[Intro]
B | Badd9 B6 | B | Badd9 B6 |
[A]
B | Badd9 B6 | B | Badd9 B6 |
B | Badd9 B6 | B | Badd9 B6 |
E | B/C♯ C♯m | E | B/C♯ C♯m |
B | G♯m11 G♯m | B | G♯m11 G♯m |
[B]
F♯ | B/F♯ F♯ | F♯ | B/F♯ F♯ |
E | C♯m C♯m9 | E | C♯m |
B | Badd9 B6 | B | Badd9 B6 |
[B2]
F♯ | B/F♯ F♯ | F♯ | B/F♯ F♯ |
E | C♯m C♯m9 | E | C♯m |
B | Badd9 B6 | B | Badd9 B6 |
B | Badd9 B6 | B | Badd9 B6 |
[C]
G♯m | B | E | F♯ |
G♯m | B | E | F♯ |
[D]
F♯ | B/F♯ F♯ | F♯ | B/F♯ F♯ |
E | C♯m | E | C♯m |
B | Badd9 B6 | B | Badd9 B6 |`,

`title: Daniel
by: Elton John
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 129
key: C
form: Intro A A2 B A2 B B2
[Intro]
C | % | F | % |
G7 | % | C Csus | % |
[A]
C | % | Dm7 | % |
G7 G9 | G7 | E7 | Am |
F | G7 | Am | % |
F | % | G7 | F/G |
C | % | G7 | % |
[A2]
C | % | Dm7 | % |
G7 G9 | G7 | E7 | Am |
F | G7 | Am | % |
F | % | G7 | F/G |
C | % |
[B]
F | % | C | % |
F | % | C | % |
Am | % | F | A♭ |
C | A7 | Dm | G7 |
[B2]
F | % | C | % |
F | % | C | % |
Am | % | F | A♭ |
C | A7 | Dm | G7 |
F | % | G7 | F/G |
C | % | F | % |
G7 | % | C Csus | C |`,

`title: Daydream Believer
by: The Monkees
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 125
key: G
form: Intro A B A B C C B B
[Intro]
G | D7sus | G | D7sus |
[A]
G | Am | Bm | C |
G | Em | A7 | D7 |
G | Am | Bm | C |
G Em | C D7 | G G/F♯ G | G/A G G/F♯ G/E |
[B]
C D7 | Bm | C D7 | Em C |
G | C | G Em | A7 |
D7 |
[C]
C D7 | Bm | C D7 | Em C |
G | C | G Em | A7 |
D7 | G | D7sus | G |
D7sus |`,

`title: Delilah
by: Tom Jones
genre: Pop
feel: Waltz
source: iReal Pro community chart
tempo: 67
key: Am
time: 6/8
form: Intro A B A B A B2
[Intro]
Am | % | Am | % |
[A]
Am | % | E7 | % |
Am | % | E7 | % |
A7 | % | Dm | % |
Am | E7 | Am | G7 |
[B]
C | % | G7 | % |
G7 | % | C | % |
C | C7 | F | Dm |
C | G7 | C | E7 |
[B2]
C | % | G7 | % |
G7 | % | C | % |
C | C7 | F | Dm |
C | G7 | C | E7 |
C | G7 | C | % |
Am | E7 | Am | D7 |
Am | % |`,

`title: Don't Go Breaking My Heart
by: Elton John and Kiki Dee
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 129
key: F
form: Intro A A B C A A B C2 C3 C4
[Intro]
F | Dm | B♭ C | F |
B♭/F | F | B♭/F |
[A]
F | B♭/F | F | B♭ |
F F/A | B♭ G/B | F/C | B♭ Am |
B♭ Am B♭ C |
[B]
Am7 | % | Cm7 | % |
B♭ F | C G | Am7 | % |
Cm7 | % | B♭ F | C G |
A♭ | C/E | B♭ Am | B♭ Am B♭ C |
[C]
F | Dm | B♭ C | F |
Dm | B♭ C | F | B♭/F |
F | B♭/F |
[C2]
F | Dm | B♭ C | F |
Dm | B♭ C | F | B♭/F |
F | B♭/F | B♭ F | C G |
B♭ F | C G | A♭ | C/E |
B♭ Am | B♭ Am B♭ C |
[C3]
F | Dm | B♭ C |
[C4]
F | Dm | B♭ C | F |`,

`title: Don't Know Why I Didn't Come
by: Norah Jones
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 93
key: B♭
form: Intro A A2 B A2 B A2 A3
[Intro]
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus |
[A]
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus B♭ |
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus B♭ |
Gm7 C7 | F7sus B♭ |
[A2]
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus B♭ |
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus B♭ |
[B]
Gm7 | C7 | F7 | % |
Gm7 | C7 | F7 F7/E♭ | B♭/D F7/C |
[A3]
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus B♭ |
B♭maj7 B♭7 | E♭maj7 D+ | Gm7 C7 | F7sus B♭ B♭7/A♭ |
Gm7 C7 | F7sus B♭ B♭7/A♭ | Gm7 C7 | F7sus B♭ |`,

`title: Don't Let The Sun Go Down On Me
by: Elton John
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 72
key: C
form: Intro A A A2 A3 B C
[Intro]
C | C/B♭ | F/A C/G | F |
[A]
G C/G | G7 | Csus C | C C/E |
F | % | G7 C/G | G7 |
[A2]
G C/G | G7 G/B | Csus C | C C/E |
F B♭/F | F F/A F/C | G7 C/G | G7 |
[A3]
G C/G | G7 G/B | Csus C | C C/E |
F B♭/F | F F/A F/C | C/G | G7 |
[B]
C | C/B♭ | Am Am/G | D/F♯ |
C/G | F/G G7 | C | C/B♭ |
F/A | Dm C/E Gsus | C | C/B♭ |
F/A C/G | F | F/A | A♭ B♭ |
[C]
C | C/B♭ | Am Am/G | D/F♯ |
C/G | F/G G7 | C | C/B♭ |
F/A | Dm C/E Gsus | C | C/B♭ |
F/A | A♭ B♭ | C |`,

`title: Don't Speak
by: No Doubt
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 81
key: Cm
form: Intro Intro A B C A2 B C2 D B2 B3
[Intro]
Cm7 |
[A]
Cm7 | Gm Fm | B♭ Gm | Fm B♭ |
Cm Gm | Fm B♭ | Gm Cm | Fm B♭ |
[B]
Cm Gm | Fm7 B♭ | E♭ B♭ | C |
[C]
Fm B♭m | E♭ C | B♭m C | Fm B♭m C |
Fm B♭m | E♭ C | B♭m C | Fm B♭m E♭ |
[A2]
Cm7 | Gm Fm | B♭ Gm | Fm B♭ |
[C2]
Fm B♭m | E♭ C | B♭m C | Fm B♭m C |
Fm B♭m | E♭ C | B♭m C | Fm Fm/E♭ Fm/C Fm/A♭ |
[D]
D♭ A♭2/C | B G♭2/B♭ | A A/C♯ A♭7♭9sus/E♭ | A♭7♭9sus/D♭ A♭7♭9sus/E♭ A♭ |
Cm Gm | Fm B♭ | Cm Gm | Fm B♭ |
Gm Cm | Fm | Cm Gm | Fm B♭ |
Fm B♭ |
[B2]
Fm B♭m | E♭ C | B♭m C | Fm B♭m C |
[B3]
Fm B♭m | E♭ C | B♭m C | Fm B♭m C |
Fm |`,

`title: Don't You Worry 'Bout A Thing
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 110
key: D♯m
form: Intro Intro A B A2 B2 C D A2 B2 C2 B3
[Intro]
D♯m D♯m(maj7) | D♯m7 D♯m6 |
[A]
D♯m D♯m(maj7) | D♯m7 G♯7 | C♯m7 F♯7sus | B69 E9♯11 |
D♯m D♯m(maj7) | D♯m7 G♯7 | C♯m7 F♯7sus | Bmaj9 |
E9♯11 |
[B]
F♯ | F♯7 | A♯m7 | Bmaj9 |
G♯maj9 | C♯7sus | F♯69 | A♯7♭13 |
[A2]
D♯m D♯m(maj7) | D♯m7 G♯7 | C♯m7 F♯7sus | B69 E7♯11 |
D♯m D♯m(maj7) | D♯m7 G♯7 | C♯m7 F♯7sus | Bmaj9 |
E7♯11 |
[B2]
F♯ | F♯7 | A♯m7 | Bmaj9 |
G♯add9 | C♯7sus |
[C]
F♯sus F♯ Fsus F | Esus E D♯sus D♯ | Dsus D C♯sus C♯ | F♯add9 |
F♯sus F♯ Fsus F | Esus E D♯sus D♯ | Dsus D C♯sus C♯ | F♯add9 A♯7♭13 |
[D]
D♯m | % | Emaj9 | % |
D♯m | % | Emaj9 | % |
[C2]
F♯sus F♯ Fsus F | Esus E D♯sus D♯ | Dsus D C♯sus C♯ | F♯add9 |
F♯sus F♯ Fsus F | Esus E D♯sus D♯ | Dsus D C♯sus C♯ | F♯add9 A♯7♭13 |
D♯m | D♯m7 G♯7 | C♯m7 F♯7 | B6 E7 |
D♯m | D♯m7 G♯7 | C♯m7 F♯7 | Bmaj9 |
E7♯11 |
[B3]
F♯ | F♯7 | A♯m7 | Bmaj9 |
G♯add9 | C♯7sus | F♯69 | A♯7♭13 |
D♯m | D♯m7 G♯7 | C♯m7 F♯7 | B6 E7 |
D♯m | D♯m7 G♯7 | C♯m7 F♯7 | B6 E7 |`,

`title: Drive My Car
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 110
key: A
form: A B A B2
[A]
D7 | G7 | D7 | G7 |
D7 | G7 | A7♯9 | % |
[B]
Bm7 | G7 | Bm7 | G7 |
Bm7 | G7 A7 | D7 | A7♯9 |
[B2]
Bm7 | G7 | Bm7 | G7 |
Bm7 | G7 A7 | D7 | A7♯9 |
D7 | A7♯9 | D7 | A7♯9 |
D7 |`,

`title: Easy
by: The Commodores
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
form: Intro A A2 B C A A B2 B3
[Intro]
A♭ Cm7 | B♭m7 B♭m/E♭ | A♭ Cm7 | B♭m7 B♭m/E♭ |
[A]
A♭ Cm7 | B♭m7 B♭m/E♭ | A♭ Cm7 | B♭m7 B♭m/E♭ |
[A2]
A♭ Cm7 | B♭m7 B♭m/E♭ | A♭ Cm7 | B♭m7 |
B♭m/E♭ |
[B]
A♭ Cm7 | B♭m7 B♭m/E♭ | A♭ Cm7 | B♭m7 B♭m/E♭ |
A♭ Cm7 | B♭m7 B♭m/E♭ | G♭ D♭/F | A♭ |
[C]
G♭maj7 Fm | E♭m7 | G♭maj7 Fm | E♭m7 |
G♭maj7 Fm | E♭m7 | B G♭ | E♭m |
D♭ |
[B2]
A♭ Cm7 | B♭m7 B♭m/E♭ | A♭ Cm7 | B♭m7 B♭m/E♭ |
[B3]
A♭ Cm7 | B♭m7 B♭m/E♭ | A♭ Cm7 | B♭m7 Bm7 |
A C♯m7 | Bm7 Bm/E | A C♯m7 | Bm7 Bm/E |
A C♯m7 | Bm7 Bm/E | A C♯m7 | Bm7 Bm/E |`,

`title: Eight Days A Week
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 145
key: D
form: Intro A B A B C A B C A B2
[Intro]
Dadd9 | E/D | G6/D | Dadd9 |
[A]
D | E7 | G | D |
D | E7 | G | D |
[B]
Bm | G6 | Bm | E7 |
D | E7 | G | D |
[C]
A7 | % | Bm | % |
E7 | % | G | A7 |
[B2]
Bm | G6 | Bm | E7 |
D | E7 | G | D |
G | D | G | D |`,

`title: Eleanor Rigby
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 130
key: Em
form: Intro Intro A B A B C C2
[Intro]
C | % | Em | % |
[A]
Em | % | Em | C |
C Em | Em | % | Em |
C | C Em |
[B]
Em7 | Em6 | C/E | Em |
Em7 | Em6 | C/E | Em |
[C]
C | % | Em | % |
[C2]
C | % | Em | % |
Em |`,

`title: Englishman In New York
by: Sting
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 101
key: Bm
form: Intro Intro A A B A B2 B3 D D2
[Intro]
Em A | Bm A | Em A | Bm A |
[A]
Em A | Bm A | Em A | Bm A |
Em A | Bm A | Em A | Bm |
[B]
Em A | Bm | Em A | Bm |
Em A | Bm | Em A | Bm A |
[B2]
Em A | Bm | Em A | Bm |
Em A | Bm | Em A | Bm A/C♯ |
[B3]
D | A | Bm | F♯7 |
G | A | F♯7/A♯ | Bm |
[D]
Em A7 | Bm7 |
[D2]
Em A7 | Bm7 | N.C. | % |
N.C. | % | Em A | Bm A |
Em Am | Bm | Em A | Bm A |
Em Am | Bm |`,

`title: Eternal Flame
by: The Bangles
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 83
key: G
form: Intro A A2 B B2 C C
[Intro]
G Gsus | % |
[A]
G Em7 | C D | G Em7 | C D |
Em7 B7 | Em7 A7 | D Bm | Am7 |
Am7 |
[A2]
G Em7 | C D | G Em7 | C D |
Em7 B7 | Em7 A7 | D Bm7 | Am7 |
% |
[B]
D Dm | G/D D | F G | C G/B Am7 C/G |
D Bm7 | F/C C | Dsus D | Em B7 |
Em A7 | D Bm7 | Am7 | % |
[B2]
D Dm | G/D D | F G | C G/B Am7 C/G |
D Bm7 | F/C C | D2 | D Bm7 |
Am7 | Am7 |
[C]
G Em7 | C D | G Em7 | C D |
Em B7 | Em7 A7 | D Bm7 | Am7 |
% |`,

`title: Every Breath You Take
by: The Police
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 110
key: A
form: Intro A A2 B A C C2
[Intro]
A Aadd9 | % | F♯m9 | % |
D Dadd9 | E Eadd9 | A Aadd9 | % |
[A]
A Aadd9 | % | F♯m9 | % |
D Dadd9 | E Eadd9 | F♯m9 | % |
[A2]
A Aadd9 | % | F♯m9 | % |
D Dadd9 | E Eadd9 | A | % |
[B]
Dadd9 | Cadd9 | A Aadd9 | % |
B Badd9 | % | E Eadd9 | % |
[C]
F | % | G | % |
[C2]
F | % | G | % |
F | % | D Dadd9 | E Eadd9 |
F♯m9 | % | F♯m9 | % |
A Aadd9 | % | F♯m9 | D Dadd9 |
A Aadd9 | % | F♯m9 | D Dadd9 |`,

`title: Every Little Thing She Does Is Magic
by: The Police
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 85
key: E♭
form: Intro A B A B2 C B3 B4 D D2
[Intro]
A♭add9 A♭add9/B♭ | A♭add9/C B♭/D | A♭add9 A♭add9/B♭ | A♭add9/C B♭/D |
[A]
A♭add9 A♭add9/B♭ | A♭add9/C B♭/D | A♭add9 A♭add9/B♭ | A♭add9/C B♭/D |
A♭add9 A♭add9/B♭ | A♭add9/C B♭/D | E♭ A♭ E♭ A♭ | E♭ A♭ E♭ |
[B]
B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D |
B D♭/G♭ | A♭add9 A♭add9/B♭ | A♭add9/C B♭/D |
[B2]
B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D |
B D♭/G♭ | B D♭/G♭ |
[C]
B B♭m7 | A♭m7 B♭m7 | A♭m7 B♭m7 | B B♭m7 |
B D♭ | B D♭ | B D♭ | B D♭ |
E♭ N.C. |
[B3]
B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D E♭ |
[B4]
B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D E♭ | B♭ B♭/D |
[D]
B D♭/G♭ | A♭m7 B♭m7 | B D♭/G♭ | E♭ |
[D2]
B D♭/G♭ | A♭m7 B♭m7 | B D♭/G♭ | E♭ |
E♭ | % | E♭ | % |`,

`title: Everybody Needs Somebody To Love
by: The Blues Brothers
genre: Pop
feel: Blues
source: iReal Pro community chart
tempo: 204
key: D♭
form: Intro Intro A A2 B C C B D D2 D D3
[Intro]
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
[A]
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
[A2]
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
D♭ G♭ | C♭ G♭ |
[B]
B♭m | % | G♭ | % |
B♭m | % | A♭ | % |
[C]
D♭ | G♭ | D♭ | G♭ |
[D]
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
[D2]
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
D♭ N.C. | N.C. | N.C. | N.C. |
D♭/A♭ D♭/B♭ | D♭/B D♭/B♭ | D♭/A♭ D♭/B♭ | D♭/B D♭/B♭ |
D♭/A♭ D♭/B♭ | D♭/B D♭/B♭ | D♭/A♭ D♭/B♭ | D♭/B D♭/B♭ |
[D3]
D♭ G♭ | C♭ G♭ | D♭ G♭ | C♭ G♭ |
D♭7 |`,

`title: Faith
by: George Michael
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 96
key: B
form: Intro A B A B
[Intro]
B | % |
[A]
B | % | E | B |
B | % | E | B |
[B]
E | B | E | B |
E | B G♯m | C♯m | F♯7 |
B | % | B | % |`,

`title: Falling
by: Jamiroquai
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 89
key: Am
form: Intro Intro A A B B C D D2
[Intro]
Am/C Am/C♯ Dm Dm/D♯ | E7 E7/G♯ Am Am/B | Am/C Am/C♯ Dm Dm/D♯ | E7 E7/G♯ Am Am/B |
[A]
Am/C Dm | E7 Am | Am/C Dm | E7 Am |
[B]
Am/C Dm | E7 Am | Am/C Dm | E7 Am |
[C]
F B♭ | Amaj7 C C/G | F E7 | Am |
F B♭ | Amaj7 C C/G | F E7 | Am |
[D]
F B♭ | Amaj7 C C/G | F E7 | Am |
[D2]
F B♭ | Amaj7 C C/G | F E7 | Am |
Am/C Dm | E7 Am | Am/C Dm | E7 Am |
Am/C Dm | E7 Am | Am/C Dm | E7 Am |`,

`title: Fast Car
by: Tracy Chapman
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 99
key: A
form: Intro Intro A A A A A2 B A3 B A3
[Intro]
D D A | F♯m Esus | D D A | F♯m Esus |
[A]
D D A | F♯m Esus | D D A | F♯m Esus |
[A2]
D D A | F♯m Esus | D D A | F♯m Esus |
D D A | F♯m Esus | D D A | F♯m Esus |
[B]
D | A | F♯m | Esus |
D F♯m | E | D F♯m | E |
D E | D D A | F♯m Esus | D D A |
F♯m Esus |
[A3]
D D A | F♯m Esus | D D A | F♯m Esus |
D D A | F♯m Esus | D D A | F♯m Esus |
D D A | F♯m Esus | D D A | F♯m Esus |`,

`title: Femme Fatale
by: The Velvet Underground
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 104
key: C
form: Intro A A B A A B2
[Intro]
Cmaj7 | Fmaj7 | Cmaj7 | Fmaj7 |
[A]
Cmaj7 | Fmaj7 | Cmaj7 | Fmaj7 |
Cmaj7 | F | Dm | G |
[B]
C5 | F5 | C5 | F5 |
C5 | F5 | Dm | % |
B♭/F | G |
[B2]
C5 | F5 | C5 | F5 |
C5 | F5 | Dm | % |
B♭/F | G | C5 | F5 |
C5 | F5 |`,

`title: Fields Of Gold
by: Sting
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 100
key: D
form: Intro A B A B C A2 A3
[Intro]
Bm7 | % | Bm11 | % |
Bm9 | % | Bm7 | % |
[A]
Bm7 | G | % | D |
Bm7 | G D | G/B A | Bm7 |
Bm7 G | D |
[B]
Bm7 | G | % | D |
Bm7 | G D | G/B A | D |
[C]
Gadd9 | D | Gadd9 | D |
Gadd9 | D | G/B A | D |
G/B A | D | % |
[A2]
Bm7 | G | % | D |
Bm7 | G D | G/B A | D |
[A3]
Bm7 | G | % | D |
Bm7 | G D | G/B A | D |
G/B A | D | G/B A | D G/D |
D G/D | % | D G/D | % |
D |`,

`title: Fifty Ways To Leave Your Lover
by: Paul Simon
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 99
key: Em
[Intro]
N.C. | % | N.C. | % |
[A]
Em/G D | Cmaj7 B7♭9♯11 | Em D♯° | B7/F♯ B7♯5 |
Em D6 | Cmaj7 B7♭9♯11 | Em Am7 | Em |
[A2]
Em/G D | Cmaj7 B7♭9♯11 | Em D♯° | B7/F♯ B7♯5 |
Em D6 | Cmaj7 B7♭9♯11 | Em Am7 | Em |
Em Am7 | Em |
[B]
G | B♭6 | C | G |
G | B♭6 | C | G |
[B2]
G | B♭6 | C | G |
G | B♭6 | C | G |
G | N.C. | % | N.C. |
% |`,

`title: Firework
by: Katy Perry
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 122
key: A♭
form: Intro A A B B A2 A2 B B C B B
[Intro]
A♭ | G♭ | Fm | D♭add9 |
[A]
A♭ | G♭ | Fm | D♭add9 |
A♭ | G♭ | Fm | D♭add9 |
[B]
A♭ | B♭m | Fm | D♭add9 |
A♭ | B♭m | Fm | D♭add9 |
[A2]
A♭ | G♭ | Fm | D♭add9 |
[C]
Fm | % | D♭add9 | % |
A♭ | % | E♭/G | % |`,

`title: The First Time Ever I Saw Your Face
by: Roberta Flack
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 65
key: C
form: Intro Intro A A2 A3 A4
[Intro]
C | Dm G7 | C | Dm G7 |
[A]
Dm | G7 | C | % |
Am | % | Em | F |
F | Fm/G G | G7 | C |
% | B♭ | % | C |
% | B♭ | % | C |
% |
[A2]
Dm | G7 | C | % |
Am | % | Em | F |
F | C/G G7 | G7 | C |
% | B♭ | % | C |
% | B♭ | B♭ | C |
% |
[A3]
Dm | G7 | C | % |
Am | % | Em | F |
F | C/G G7 | G7 | C |
% | B♭ | % | C |
% | B♭ | B♭ | C |
% | C/G G | G7 | C |
% | B♭ | % | C |
% | B♭ | % | C |
% |
[A4]
Dm | % | G7 | % |
C | B♭ | C | B♭ |
C |`,

`title: Fly Like An Eagle
by: Steve Miller
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 93
key: Am
form: Intro A B B C C B B2 B B2
[Intro]
N.C. | % | N.C. | % |
Am G Am7 | Am G Am7 | Am G Am7 | Am G Am7 |
[A]
Am7 D/A | Am7 | Am7 D/A | Am7 |
Am7 D/A | Am7 | Am7 D/A | Am7 |
[B]
Am7 D/A | F/A Am7 | Am7 D/A | F/A Am7 |
[C]
Am7 | D/A | F/A | Am7 |
[B2]
Am7 D/A | F/A Am7 | Am7 D/A | F/A Am7 |
Am7 | % | Am7 | % |`,

`title: The Fool On The Hill
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 76
key: D
form: Intro A B A B C C
[Intro]
D6 |
[A]
D6 | Em7/D | D6 | Em7/D |
Em7 A | D6 Bm | Em7 A7 |
[B]
Dm B♭/D Dm | B♭/D | Gm C7/G | Dm Dm6 Dm7 |
D6 |
[C]
D6 | Em7/D |`,

`title: For No One
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 145
key: B
form: A A B A A B
[A]
B | B/A♯ | G♯m | G♯m/F♯ |
E | A7 | B | % |
[B]
C♯m | G♯7 | C♯m C♯m/D♯ | C♯m/E F♯m C♯m/G♯ G♯7/B |
C♯m | G♯7 | C♯m C♯m/D♯ | C♯m/E F♯m C♯m/G♯ G♯7/B |
C♯m | F♯sus F♯7 |`,

`title: Fragile
by: Sting
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 160
key: Em
form: Intro A A B C C2 D
[Intro]
Em11 | A/B | Em9 | A/B |
Em7 | G/E | Am7 | % |
B7♭9♭13 | B7 | B7/E | Em |
Em7 | G/E | Am7 | % |
B7♭9♭13 | B7 | B7/E | Em |
[A]
Em7 | G/E | Am7 | % |
B7♭9♭13 | B7 | B7/E | Em |
[B]
C6 | % | B7♭9♭13 | % |
Em7 D/E | Em | Em7 D/E | Em |
C6 | % | B7♭9♭13 | % |
Em7 D/E | Em | Em7 D/E | Em |
[C]
Em7 | G/E | Am7 | % |
B7♭9♭13 | B7 | B7/E | Em |
Em | G/E | Am7 | % |
B7♭9♭13 | B7 | Em(maj7) | Em |
[C2]
Em7 | G/E | Am7 | % |
B7♭9♭13 | B7 | B7/E | Em |
Em | G/E | Am7 | % |
B7♭9♭13 | B7 | Em(maj7) | Em |
Em7 D/E | Em | Em7 D/E | Em |
[D]
Em11 | A/B | Em9 | A/B |
Em11 | A/B | Em |`,

`title: Free As A Bird
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 77
key: A
form: Intro A A B A2
[Intro]
A F♯m | Fmaj7 E7 | A F♯m | Dm E7 |
A F♯m | Dm G7 | C Am | Esus E7 |
[A]
A F♯m | Fmaj7 E7 | A F♯m | Dm E7 |
A F♯m | Dm G7 | C Am | Esus E7 |
[B]
F | F♯m | G7 | A A/G |
F | F♯m | G7 | Esus E7 |
Esus E7 | C Am | A♭maj7 G7 | C Am |
Fm G7 | C Am | Fm G7 |
[A2]
A F♯m | F E7 | A F♯m | Dm7 E7 |
A F♯m | Dm G7 | A F♯m | Dm G7 |
A F♯m | Dm G7 | A F♯m | Dm G7 |
A | A A/G | A A/G | A |`,

`title: The Game Of Love
by: Santana
genre: Pop
feel: Pop Rock
source: iReal Pro community chart
tempo: 116
key: Em
form: Intro Intro2 A B C A B C2 D C3 C4
[Intro]
Em9 | Dmaj7 |
[Intro2]
Em9 | Dmaj7 | Gmaj7 | G/A |
[A]
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Em9 | Dmaj7 |
[B]
Em9 | Dmaj7 | Gmaj7 | G/A |
Em9 | D/F♯ | Gmaj7 | G/A |
[C]
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Em9 | G/A |
[C2]
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Em9 | G/A |
Em9 | Dmaj7 | Gmaj7 | G/A |
[D]
Bm7 | F♯m | Gmaj7 | G/A |
Em | F♯m | Gmaj7 | G/A |
[C3]
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Gmaj7 | G/A |
[C4]
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Gmaj7 | G/A |
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Gmaj7 | G/A |
Em9 | Dmaj7 | Em9 | Dmaj7 |
Em9 | Dmaj7 | Gmaj7 | G/A |`,

`title: Get Back
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 123
key: A
form: Intro A B A B2 C C2 B3
[Intro]
A7 | % | A7 | A7 G/A D/A |
[A]
A7 | % | D7 | A7 |
A7 | % | D7 | A7 |
[B]
A7 A7♯9 | % | D7 | A7 G/A D/A |
A7 A7♯9 | % | D7 | A7 |
[B2]
A7 A7♯9 | % | D7 | A7 G/A D/A |
A7 A7♯9 | % | D7 C/D | G/D Am/D |
[C]
A7 | % | D7 | A7 G/A D/A |
[C2]
A7 | % | D7 | A7 G/A D/A |
A7 | % | D7 | A7 G/A D/A |
A7 | % | D7 | A7 G/A D/A |
[B3]
A7 A7♯9 | % | D7 | A7 |
A7 A7♯9 | % | D7 | % |`,

`title: Girl
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 97
key: Cm
form: A B A B C B2 D B B
[A]
Cm G7 | Cm E♭/C | Fm | E♭ G7 |
Cm G7 | Cm E♭/C | Fm | Cm |
[B]
E♭ Gm/D | Fm/C B♭7 | E♭ Gm/D | Fm/C B♭7 |
[C]
Fm | C | Fm | C |
Fm | C | Fm | A♭ |
[B2]
E♭ Gm/D | Fm/C B♭7 | E♭ Gm/D | Fm/C B♭7 |
E♭ Gm/D | Fm/C B♭7 | E♭ Gm/D | Fm/C B♭7 |
[D]
Cm G7 | Cm7 | Fm | E♭ G7 |
Cm G7 | Cm7 | Fm | Cm |`,

`title: Girls Just Wanna Have Fun
by: Cyndi Lauper
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 115
key: F♯
form: Intro Intro A A2 B C C2 A2 B2
[Intro]
F♯sus F♯ | F♯sus F♯/A♯ F♯/C♯ | D♯m | D♯m B C♯ |
[A]
F♯ | F♯ F♯/A♯ F♯/C♯ | D♯m | D♯m D♯m/C♯ |
Badd9 | % | D♯m C♯ | Badd9 |
D♯m C♯ | F♯sus F♯ | F♯sus F♯/A♯ F♯/C♯ | D♯m |
D♯m B C♯ |
[A2]
F♯ | F♯ F♯/A♯ F♯/C♯ | D♯m | D♯m D♯m/C♯ |
Badd9 | % | D♯m C♯ | Badd9 |
D♯m C♯ |
[B]
F♯ | % | D♯m | % |
F♯ | % | D♯m C♯ | Badd9 |
D♯m C♯ | F♯ | % | D♯m |
D♯m B C♯ |
[C]
F♯ | % | D♯m | % |
[C2]
F♯ | % | D♯m | D♯m B C♯ |
[B2]
F♯ | % | D♯m | % |
F♯ | % | D♯m C♯ | Badd9 |
D♯m C♯ | F♯ | % | D♯m |
D♯m B C♯ | F♯ | D♯m B C♯ | F♯ |
D♯m B C♯ | F♯ | D♯m B C♯ | F♯ |
D♯m B C♯ |`,

`title: Give A Little Bit
by: Supertramp
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 97
key: D
form: Intro Intro A A B A B2
[Intro]
D A | D G | A G | A G |
[A]
D A | D G | A G | A G |
D A | D G | A G | A G |
Bm | Esus E | G | Asus A |
Asus A |
[B]
F♯m7 | Bm7 | F♯m7 | Bm7 |
F♯m | G | C G | A D/A |
A7 D/A | A D/A | A7 D/A | A D/A |
A7 D/A |
[B2]
F♯m7 | Bm7 | F♯m7 | Bm7 |
F♯m | G | C G | A D/A |
A7 D/A | A D/A | A7 D/A | A D/A |
A7 D/A | Bm | Esus E | G |
C G | A D/A | A7 D/A | A D/A |
A7 D/A | A D/A | A7 D/A | D G/D |
A/D G/D D | C/D | G/D D | D G/D |
A/D G/D D | C/D | G/D D | C/D |
G/D D | C/D | G/D D | C |
G/B | Am7 Am7/G | Asus/F♯ Asus/E | D G/D |
A/D G/D D | D |`,

`title: Give Me Strength
by: Eric Clapton
genre: Pop
feel: Blues
source: iReal Pro community chart
tempo: 75
key: E
[Intro]
E | F♯7 B7 | E A | E B7 |
[Intro2]
E | E7 | F♯7 | Bsus B7 |
E | E7 | A A7 | F♯7 B7 |
E | F♯7 B7 | E A | E B7 |
[A]
E | F♯7 A | E A7 | E B7 |
E | E7 | F♯7 | Bsus B7 |
E | E7 | A | F♯7 A |
E | F♯7 B7 | E A7 | E E7 |
[B]
A | B7 E | A D | A E7 |
A | A7 | B7 | E E7 |
A | A7 | D | B7 D7 |
A | B7 D | D D/C♯ A A/G♯ | E7 |`,

`title: Golden Lady
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 104
key: E♭
form: Intro Intro A B A B A2
[Intro]
E♭maj7 | Fm9 | Gm7 | Am7 D7sus |
[A]
E♭maj7 | Fm9 | Gm7 | Am7 D7 |
E♭maj7 | Fm9 | Gm7 | Am7 D7 |
E♭maj7 | B♭maj7 | A♭m7 D♭7 | G♭maj7 |
F♯m7 | B9 | Am9 | D7sus |
[B]
Gm Gm(maj7) | Gm7 Gm6 | A♭maj7 | % |
Gm Gm(maj7) | Gm7 Gm6 | A♭maj7 | % |
Gmaj7 | % | Fm7 | B♭7sus |
[A2]
E♭maj7 | Fm9 | Gm7 | Am7 D7 |
E♭maj7 | Fm9 | Gm7 | Am7 D7 |
E♭maj7 | B♭maj7 | A♭m7 D♭7 | G♭maj7 |
F♯m7 | B9 | Am9 | D7 E♭7 |
A♭m A♭m(maj7) | A♭m7 A♭m6 | Amaj7 | % |
A♭m A♭m(maj7) | A♭m7 A♭m6 | Amaj7 | % |
Am Am(maj7) | Am7 Am6 | B♭maj7 | % |
Am Am(maj7) | Am7 Am6 | B♭maj7 | % |
B♭m B♭m(maj7) | B♭m7 B♭m6 | Bmaj7 | % |
B♭m B♭m(maj7) | B♭m7 B♭m6 | Bmaj7 | % |
Bm Bm(maj7) | Bm7 Bm6 | Cmaj7 | % |
Bm Bm(maj7) | Bm7 Bm6 | Cmaj7 | % |`,

`title: Good Day Sunshine
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 120
key: B
form: Intro B A B C B A B2 D
[Intro]
E | % | E | % |
[B]
B F♯ | F♯ | B F♯ | F♯ |
E7 | % |
[A]
A F♯7 | B7 | E7 | A |
A F♯7 | B7 | E7 | A |
[C]
A F♯7 | B7 | E7 | A |
D B7 | E7 | A7 | D |
[B2]
B F♯ | F♯ | B F♯ | F♯ |
E7 | E7 |
[D]
B F♯ | F♯ | B F♯ | F♯ |
E7 | E7 | F7 | % |
F7 | % |`,

`title: Good Times
by: Chic
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 110
key: Em
form: Intro Intro B B A A B B A A B B C C
[Intro]
Em7 | % | G/A | A9 |
[B]
Em7 | % | G/A | A9 |
Em7 | % | G/A | A9 |
[A]
Em7 | % | G/A | A9 |
Em7 | % | G/A | A9 |
[C]
Em7 | % | G/A | A9 |`,

`title: Goodbye Yellow Brick Road
by: Elton John
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 125
key: F
form: Intro A A B C B2
[Intro]
F C/E | Dm7 Dm7/C | B♭ Csus C7 | F |
[A]
Gm7 Gm7/B♭ | C7 C/E | F F/A | B♭ B♭/D |
E♭ E♭/B♭ | C7 | F F/G | F/A F/C |
[B]
B♭m7/D♭ D♭/F | E♭ E♭/G | A♭ A♭/C | D♭ D♭/C |
B♭m7 D♭/F | C7 C7/G |
[C]
F | A7 | B♭ | F F/E |
D7 | Gm7 | C7 | F |
Dm | A7 | B♭ | D♭ |
D♭ | F C/E | Dm Dm/C | B♭ C7 |
[B2]
B♭m7/D♭ D♭/F | E♭ E♭/G | A♭ A♭/C | D♭ D♭/C |
B♭m7 D♭/F | C7 C7/G | F | % |`,

`title: Gravity
by: John Mayer
genre: Pop
feel: Blues
source: iReal Pro community chart
tempo: 50
key: G
time: 6/8
form: Intro Intro A B A B C C A D D
[Intro]
G | % | Cadd9 | % |
[A]
G | % | Cadd9 | % |
G | % | Cadd9 | % |
[B]
Am7 | % | D7 | % |
B♭maj13 | E♭maj7 | D7 | % |
[C]
G | % | Cadd9 | % |
[D]
G | % | Cadd9 | % |`,

`title: The Greatest Love Of All
by: Whitney Houston
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 67
key: A
[Intro]
N.C. E E7/D | C♯m7 F♯m7 | Bm9 E E/D | C♯m7 F♯m7 |
Bm9 E7sus |
[A]
A A+ | A6 Em7/A A7 | D D+ | D6 D+ D |
C♯m7 F♯m7 | Bm E E/D | C♯m7 F♯m7 | Bm9 D/E |
[B]
A A+ | A6 A7 | D D+ | D6 D+ D |
C♯m7 F♯m7 | Bm9 D/E |
[C]
D A/C♯ | Bm7 Bm7/E |
[C2]
D A/C♯ | Bm7 Bm7/E | D A/C♯ | Bm7 D/E |
E7sus E/D |
[D]
C♯m7 F♯m7 | Bm7 D/E E/D | C♯m7 F♯m7 | Bm7 D/E E/D |
C♯m7 F♯m7 | Bm7 D/E | A G/A |
[D2]
F♯m7 Bm7 | Em7 G/A A/G |
[D3]
F♯m7 Bm7 | Em7 G/A A/G | F♯m7 Bm7 | Em7 G/A |
D |
[A2]
A A+ | A6 A7 | D D+ | D6 D+ D |
C♯m7 F♯m7 | Bm7 E E/D | C♯m7 F♯m7 | Bm7 D/E |
C♯m7 F♯m7 | Bm7 D/E E/D | C♯m7 F♯m7 | Bm7 D/E E/D |
D A/C♯ | Bm7 Bm7/E Aadd9 |`,

`title: Groovin'
by: The Young Rascals
genre: Pop
feel: R'n'B
source: iReal Pro community chart
tempo: 106
key: E♭
form: Intro B B A B B A B B2 A2 B B
[Intro]
E♭ | Fm7 Fm7/B♭ | E♭ | Fm7 Fm7/B♭ |
[B]
E♭ | Fm7 Fm7/B♭ | E♭ | Fm7 Fm7/B♭ |
[A]
Gm7 | Fm9 | Gm7 | Fm9 |
Gm7 | Fm7 A♭ B♭7 |
[B2]
E♭ | Fm7 Fm7/B♭ | E♭ | Fm7 Fm7/B♭ |
E♭ | Fm7 Fm7/B♭ |
[A2]
Gm7 | Fm9 | Gm7 | Fm9 |
Gm7 | Fm9 | A♭ Gm7 | Fm7 B♭7 |`,

`title: Hallelujah
by: Leonard Cohen
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 59
key: C
form: Intro A B A B A C C
[Intro]
C G7 |
[A]
C Am | C Am | F G | C G7 |
C F G | Am F | G E7 | Am |
[B]
F | Am | F | C G |
C G7 |
[C]
F | Am | F | C G7 |`,

`title: A Hard Day's Night
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 135
key: G
form: Intro A A B A A2
[Intro]
Gsus |
[A]
G Cadd9 | G | F | G |
G Cadd9 | G | F | G |
C | D | G C9 | G |
[B]
Bm | Em | Bm | % |
G | Em | C7 | D7 |
[A2]
G Cadd9 | G | F | G |
G Cadd9 | G | F | G |
C | D | G C9 | G |
G | G C9 | G Cadd9 | G Cadd9 |
Dm11 Dm7 | % | Dm11 Dm7 | % |`,

`title: Hard To Say I'm Sorry
by: Chicago
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 70
key: E
form: Intro A A B C A A B2 B3 D
[Intro]
E A/C♯ | B/D♯ B/C♯ G♯/C | C♯m C♯m/B F♯/A♯ | Bsus B |
E | E |
[A]
E | G♯m7 | A B | C♯m B |
[B]
C♯m F♯m7 | E/B A/E E | C♯m F♯m7 | Bsus B |
[C]
E A/C♯ | B/D♯ B/C♯ G♯/C | C♯m C♯m/B F♯/A♯ | E/B B C♯m7 B/D♯ |
E A/C♯ | B/D♯ B/C♯ G♯/C | C♯m C♯m/B F♯/A♯ | Bsus B |
% |
[B2]
C♯m F♯m7 | E/B A/E E/D♯ | C♯m F♯m7 | Bsus B |
[B3]
C♯m F♯m7 | E/B A/E E/D♯ | C♯m F♯m7 | Bsus B |
B B/A |
[D]
G C/E | D/F♯ D/E B/D♯ B | Em Em/D A/C♯ | G/D D |
G C/E | D/F♯ D/E B/D♯ | Em Em/D A/C♯ | G/D D |
G C/E | D/F♯ D/E B/D♯ | Em Em/D A/C♯ Cm | Bsus |
B | E |`,

`title: Have I Told You Lately
by: Rod Stewart
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 70
key: B♭
form: Intro Intro A A2 B A3
[Intro]
B♭ Dm7 | E♭ Fsus | B♭ Dm7 | E♭ Fsus |
[A]
B♭ Dm7 | E♭ Fsus | B♭ Dm7 | E♭ Fsus |
E♭maj7 | Dm7 | Cm7 F7 | B♭ Fsus |
[A2]
B♭ Dm7 | E♭ Fsus | B♭ Dm7 | E♭ Fsus |
E♭maj7 | Dm7 | Cm7 F7 | B♭ Cm Dm |
[B]
E♭maj7 | % | Dm7 | Dm Cm Dm |
E♭maj7 | % | Dm7 | Fsus |
[A3]
B♭ Dm7 | E♭ Fsus | B♭ Dm7 | E♭ Fsus |
E♭maj7 | Dm7 | Cm7 F7 | B♭ Cm Dm |
E♭maj7 | Dm7 | Cm7 F7 | B♭ Cm Dm |
E♭maj7 | Dm7 | Cm7 F7 | B♭ |`,

`title: Heart Of Glass
by: Blondie
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 120
key: E
form: Intro Intro A A2 B A3 B2 C C2 A4 A5
[Intro]
E | % | E | % |
[A]
E | C♯ | C♯m7 | E |
E | C♯ | C♯m7 | E |
E | % | E |
[A2]
E | C♯ | C♯m7 | E |
E | C♯ | C♯m7 | E |
E |
[B]
A | % | E | % |
A | % | F♯ | B |
E | % | E | % |
[A3]
E | C♯ | C♯m7 | E |
E | C♯ | C♯m7 | E |
% |
[B2]
A | % | E | % |
A | % | E |
[C]
A | A | E | E |
[C2]
A | A | E | % |
E | % | E | % |
[A4]
E | C♯ | C♯m7 | E |
[A5]
E | C♯ | C♯m7 | E |
E | % | E | % |`,

`title: The Heart of Rock and Roll
by: Huey Lewis and The News
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 147
key: C
form: Intro Intro A B A B C C2
[Intro]
C C6 C7 | % | C C6 C7 | % |
[A]
C C6 C7 | % | C C6 C7 | % |
C C6 C7 | % | C C6 C7 | % |
C | B♭ B♭6 B♭7 | % | B♭ B♭6 B♭7 |
% | F7 | % | F/C F |
C N.C. |
[B]
B♭ | F | B♭ | F |
E♭ | % | D | G7♭13 |
C5 | % | C5 | % |
[C]
F7 | % | B♭ | % |
[C2]
F7 | % | B♭ | % |
F7 | % | B♭ | D7 F/G |
C C6 C7 | % | C C6 C7 | % |
C C6 C7 | % | C C6 C7 | % |`,

`title: Heartbreak Hotel
by: Elvis Presley
genre: Pop
feel: Rock'n'Roll
source: iReal Pro community chart
tempo: 89
key: E
form: A A B
[A]
E7 N.C. E7 | % | E7 N.C. | E7 E7/D E7/C♯ E7/B |
A7 | % | B7 B7/A B7/G♯ B7/F♯ | E7 E7/G♯ E7/B E7/G♯ |
E7 N.C. E7 | % | E7 N.C. | E7 E7/D E7/C♯ E7/B |
A7 | % | B7 B7/A B7/G♯ B7/F♯ | E7 E7/G♯ E7/B E7/G♯ |
[B]
E7 | % | E7 | E7 E7/D E7/C♯ E7/B |
A7 | % | B7 | E7 |
E7 E7/D E7/C♯ E7/C | E7/B F7 E7 |`,

`title: Hello, Goodbye
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 101
key: C
form: A B A B A B A B2
[A]
F6 | C | G7 | Am |
G7 | Am | G7 | G G7sus |
Gsus |
[B]
C G/B | Am Am/G | F A♭ | C G/B |
Am Am7/G | F B♭ | C |
[B2]
C G/B | Am Am/G | F A♭ | C G/B |
Am Am7/G | F B♭ | C G/B | Am Am/G |
F A♭ | A♭ A♭/G | A♭7/F♯ F7 | C |
C | % | C | % |`,

`title: Here, There, And Everywhere
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 83
key: G
form: Intro A A2 B C B C2 D
[Intro]
G Bm | B♭ | Am7 D7 |
[A]
G Am | Bm C | G Am | Bm C |
F♯m7 B7 | F♯m7 B7 | Em A7 | Am D7 |
[A2]
G Am | Bm C | G Am | Bm C |
F♯m7 B7 | F♯m7 B7 | Em A7 | Am7 D7 F7 |
[B]
B♭ Gm | Cm D7 | Gm | Cm D7 |
[C]
G Am | Bm C | G Am | Bm C |
F♯m7 B7 | F♯m7 B7 | Em A7 | Am D7 F7 |
[C2]
G Am | Bm C | G Am | Bm C |
F♯m7 B7 | F♯m7 B7 | Em A7 | Am7 D7 |
[D]
G Am | Bm C | G Am | Bm C |
G |`,

`title: Hero
by: Mariah Carey
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 66
key: E
[Intro]
E E/D♯ | C♯m7 C♯m7/B | A A/G♯ | F♯m7 Bsus B |
[A]
E | D | C♯m7 | F♯m7 B7 |
E | D/F♯ | C | Bsus B7 |
[B]
E E/D♯ | C♯m7 C♯m7/B | A A/G♯ | F♯m7 B7 |
E E/D♯ | C♯m7 C♯m7/B | A A/G♯ | F♯m7 B7 |
E E/D♯ | C♯m7 Bsus |
[A2]
E | D | C♯m7 | Bsus B7 |
E | D/F♯ | C | Bsus B7 |
[B2]
E E/D♯ | C♯m7 C♯m7/B | A A/G♯ | F♯m7 B7 |
E E/D♯ | C♯m7 C♯m7/B | A A/G♯ | F♯m7 B7 |
E E/D♯ |
[C]
C G/B | G D | C G/B | G D |
C G/B | G D | C G/B | B7sus B7 |
A E/G♯ | F♯m7 B7 | E | C♯m7 |
A B7 | E |`,

`title: Hey Jude
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 78
key: F
form: A A B B2 A2 C C
[A]
F | C7 | % | F |
B♭ | F | C7 | F |
[B]
F7 | B♭ B♭/A | Gm7 Gm7/F | C7/E C7 |
F7 |
[B2]
F7 | B♭ B♭/A | Gm7 Gm7/F | C7/E C7 |
F7 | F7 | C7 | % |
[A2]
F | C7 | % | F |
B♭ | F | C7 | F |
F |
[C]
F | E♭ | B♭ | F |`,

`title: Highway To Hell
by: AC/DC
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 112
key: A
form: Intro Intro A A2 B A A2 B2 C C2
[Intro]
A D/F♯ | G D/F♯ | G D/F♯ G A | A |
[A]
A D/F♯ | G D/F♯ | G D/F♯ G A | A |
A D/F♯ | G D/F♯ | G D/F♯ G A | A |
[A2]
A D/F♯ | G D/F♯ | G D/F♯ G A | A |
A D/F♯ | G D/F♯ | G D/F♯ G | E |
% |
[B]
A | D/A G D/F♯ | A | D/A G D/F♯ |
A | D/A G D/F♯ | A | D |
% |
[B2]
A | D/A G D/F♯ | A | D/A G D/F♯ |
A | D/A G D/F♯ | A | D |
D Dsus D | D | D Dsus D | Dsus D |
[C]
A | D/A G D/F♯ | A | D/A G D/F♯ |
[C2]
A | D/A G D/F♯ | A | D/A G D/F♯ |
A | D/A G D/F♯ | A | D/A G D/F♯ |
A | D | A5 |`,

`title: Home Again
by: Carole King
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 71
key: A
[Intro]
A G/A D/A | A G/A D/A |
[A]
A E/A | E/A D/A A | D C♯m Bm | A D/A |
A E/A | E/A D/A A | D C♯m Bm | A A/G♯ |
[B]
F♯m | A7 | D C♯m | Bsus B7 Esus E7 |
A E/A | E/A D/A A | D C♯m Bm Esus | A G/A D/A |
A G/A D/A |
[C]
A E/A | E/A D/A A | D G/D D | A D/A |
A E/A | E/A D/A A | D G D | A |
A | D C♯m Bm Esus | A | D C♯m Bm Esus |
A G/A D/A | A G/A D/A | A G/A D/A | A |`,

`title: Home At Last
by: Steely Dan
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 119
key: Gm
form: Intro Intro A B C A B C2 D D2
[Intro]
Gm7 | Gm7 Am | Gm7 | Gm7 Am7 B♭ |
[A]
E♭maj7 | B♭maj7 | E♭maj7 | B♭maj7 |
E♭ D7 | Gm7 A♭7 | Gm7 | % |
E♭maj7 | B♭maj7 | E♭maj7 | B♭maj7 |
E♭ D7 | Gm7 A♭7 | Gm7 | % |
[B]
Cm7 | % | Gm9 | % |
Cm7 | % | Dm7 | % |
Cm7 | % | B♭maj7 | % |
E♭maj7 | % | E♭maj7 | % |
[C]
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
[C2]
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
F7sus | % | F7sus | % |
A7♭13 | Dm7 A♭7 | C♯7 | D7 |
[D]
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
[D2]
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |
Gm7 | Gm7 Am | Gm7 | Gm7 Am B♭ |`,

`title: Honesty
by: Billy Joel
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 70
key: B♭
form: Intro A B A B2 C A B2 C2
[Intro]
B♭m B♭m/A♭ | G♭maj7 F7 |
[A]
B♭6 E♭maj7 | F F/E♭ Dm7 | E♭maj7 Gm7 | Am7 Cm F7 |
B♭6 Csus C | F/C A7/C♯ Dm | E♭maj7 A7 | D7sus D7 |
[B]
E♭maj7 F7 | D/F♯ Gm Gm/F | E♭maj7 F7 | B♭ D7 |
E♭maj7 F7 | D/F♯ Gm Gm/F | E♭maj7 F7 | B♭ |
[B2]
E♭maj7 F7 | D/F♯ Gm Gm/F | E♭maj7 F7 | B♭ D7 |
E♭maj7 F7 | D/F♯ Gm Gm/F | E♭maj7 F7 | E♭/B♭ B♭ B♭m/A♭ |
G♭maj7 F7 |
[C]
Gm | D7/G | Fm6 | C/E |
E♭maj7 F7 | E♭/B♭ B♭ | C7sus C7 | F7 D/F♯ |
E♭maj7 F7 |
[C2]
Gm | D7/G | Fm6 | C/E |
E♭maj7 F7 | E♭/B♭ B♭ | C7sus C7 | F7 D/F♯ |
E♭maj7 F7 | E♭/B♭ B♭ B♭m/A♭ | G♭maj7 F7 | E♭m(maj7) F13 F |
B♭ |`,

`title: The House Of The Rising Sun
by: The Animals
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 75
key: Am
time: 1/2
form: Intro A A A2
[Intro]
C | D F7 | Am E7 | Am E7 |
[A]
Am C | D F7 | Am C | E7 |
Am C | D F7 | Am E7 | Am C |
D F7 | Am E7 | Am E7 |
[A2]
Am C | D F7 | Am C | E7 |
Am C | D F7 | Am E7 | Am C |
D F7 | Am E7 | Am Dm | % |
Am Dm | % | Am Dm | Am |`,

`title: How Can You Mend A Broken Heart
by: Bee Gees
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 72
key: E
form: Intro A B B2 A B B3
[Intro]
E | Esus E | E Esus E | E |
[A]
E | Emaj7 | B7sus | E |
G♯7 D♯m7 G♯7 | C♯m7 | F♯7 | B B7sus |
B |
[B]
Emaj7 | % | F♯m7 | % |
A B | % | F♯m7 B7 | E |
[B2]
Emaj7 | % | F♯m7 | % |
A B | % | F♯m7 B7 | E |
Esus E |
[B3]
Emaj7 | % | F♯m7 | % |
A B | % | F♯m7 B7 | E |
Esus E | E Emaj7 | Emaj7 |`,

`title: How Deep Is Your Love?
by: Bee Gees
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 103
key: E♭
form: Intro Intro A B C A B C2 C2 C2
[Intro]
E♭add9 | E♭maj9 | A♭maj7 | A♭/B♭ |
[A]
E♭maj9 G7 | Fm7 C7♯5 | Fm7 E♭2/G | B♭11 B♭7 |
E♭maj9 G7 | Cm7 | Fm7 | B♭11 |
[B]
A♭maj7 | Gm7 | Fm7 | D♭9 |
Gm7 | B♭7sus |
[C]
E♭maj7 | % | A♭maj7 | A♭m6 |
E♭maj9 | B♭m6/D♭ | Gm7♭5 | C7♭9 |
Fm7 | A♭m6 |
[C2]
E♭maj7 | % | A♭maj7 | A♭m6 |
E♭maj9 | B♭m6/D♭ | Gm7♭5 | C7♭9 |
Fm7 | A♭m6 | E♭maj9 G7 | B♭7sus |
% |`,

`title: Human
by: The Killers
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 130
key: B♭
form: Intro A B A B2 C D B3 B4
[Intro]
B♭ | % | B♭ | % |
[A]
B♭ | Dm | E♭ | B♭ |
F | Gm | E♭ | F |
B♭ | Dm | E♭ | Gm |
E♭ | % | F | % |
[B]
B♭ | Dm | E♭ | B♭ |
F | Gm | E♭ | F |
B♭ | Dm | Gm | % |
Cm7 | E♭ | B♭ | % |
B♭ | Dm | E♭ | B♭ |
F | Gm | E♭ | F |
[B2]
B♭ | Dm | E♭ | B♭ |
F | Gm | E♭ | F |
B♭ | Dm | Gm | % |
Cm7 | E♭ | B♭ | Dm |
[C]
E♭ | F | D/F♯ | Gm |
E♭ | % | F | % |
[D]
E♭ | F | Gm | % |
E♭ | F | Dm | E♭ |
B♭ | Dm | Gm | Gm |
% | Gm | % |
[B3]
B♭ | Dm | E♭ | B♭ |
F | Gm | E♭ | F |
B♭ | Dm | Gm | % |
Cm7 | E♭ | % |
[B4]
B♭ | Dm | E♭ | B♭ |
F | Gm | E♭ | F |
B♭ | Dm | E♭ | Gm |
E♭ | % | Gm | F |
E♭ | Cm7 | B♭ |`,

`title: I Can See Clearly Now
by: Johnny Nash
genre: Pop
feel: Reggae Pop
source: iReal Pro community chart
tempo: 122
key: D
[Intro]
D | % | D | % |
[A]
D | G | D | % |
D | G | A | % |
D | G | D | % |
C | G | D | % |
C | G | D | % |
[A2]
D | G | D | % |
D | G | A | % |
D | G | D | % |
C | G | D | % |
[B]
F | % | C | % |
F | % | A | % |
C♯m | G | C♯m | G |
C | Bm | A | % |
C | G | D | % |
C | G | D | % |`,

`title: I Can't Help It
by: Michael Jackson
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 102
key: A♭
form: Intro Intro A A2 B A A2 B A A2 B B2
[Intro]
A13♯11 | A♭maj9 | A13♯11 | A♭maj9 |
[A]
A13♯11 | A♭maj7 | A13♯11 | A♭maj7 |
Fm9 | B♭13 | D♭m9 E♭7♯9 | E F♯m7 G♯m7 A |
[A2]
A13♯11 | A♭maj7 | A13♯11 | A♭maj7 |
Fm9 | B♭13 | D♭m9 E♭7♯9 | A♭69 |
[B]
Fm9 | D♭m9 E♭m7 | Fm9 | D♭m9 E♭m7 |
Fm9 | D♭m9 E♭m7 | Fm9 | D♭m9 E♭7♯9 |
A13♯11 | A♭maj9 | A13♯11 | A♭maj9 |
[B2]
Fm9 | D♭m9 E♭m7 | Fm9 | D♭m9 E♭m7 |
Fm9 | D♭m9 E♭m7 | Fm9 | D♭m9 E♭7♯9 |
A13♯11 | A♭maj9 | A13♯11 | A♭maj9 |
A13♯11 | A♭maj9 | A13♯11 | A♭maj9 |`,

`title: I Can't Make You Love Me
by: Bonnie Raitt
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 63
key: E♭
form: Intro A B A B2
[Intro]
E♭ Gm | Gm E♭ | E♭ B♭/D | Gm Cm |
E♭ Gm | Gm E♭ | E♭ B♭/D | Cm7 |
[A]
E♭ Gm7 | Gm7 E♭ | E♭ B♭/D | Gm7 Cm7 |
E♭ Gm7 | Gm7 E♭ | E♭ B♭/D | Gm7 Cm7 |
Cm7 | B♭/F | F B♭/D |
[B]
E♭ B♭ | E♭ | E♭ B♭ | B♭/D E♭ |
Gm7 B♭/E♭ | F/A Gm7 | Gm7 B♭/E♭ | F/A Gm7 |
Cm7 | B♭/F F | E♭ B♭ | B♭/E♭ |
E♭ Gm7 | Gm7 E♭ | E♭ B♭/D | Cm7 |
[B2]
E♭ B♭ | E♭ | E♭ B♭ | B♭/D E♭ |
Gm7 B♭/E♭ | F/A Gm7 | Gm7 B♭/E♭ | F/A Gm7 |
Cm7 | B♭/F F | E♭ B♭ | B♭/E♭ |
E♭ Gm | Gm E♭ | E♭ B♭/D | E♭ |
% | A♭maj7 |`,

`title: I Feel The Earth
by: Carole King
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 110
key: Cm
[Intro]
E♭/C | Dm/C | E♭/C | Dm/C |
[A]
E♭/C | Dm/C | E♭/C | % |
F7 | % | E♭/C | Dm/C B♭sus |
[B]
E♭maj7 | A♭maj7 | Fm7 | B♭sus B♭7 |
E♭maj7 | A♭maj7 | Fm7 | A♭/B♭ G7 |
[A2]
E♭/C | Dm/C | E♭/C | % |
F7 | % | E♭/C | Dm/C |
Cm | Dm/C |
[C]
E♭/C | Dm/C | E♭/C | F7 |
[C2]
E♭/C | Dm/C | E♭/C | F7 |
E♭/C | F7 | E♭/C | F7 |
E♭/C | F7 | E♭/C | F7 B♭sus |
E♭/C | Dm/C | E♭/C | Dm/C |
E♭/C | F7 | E♭/C | F7 |
E♭/C | Dm/C | E♭/C | Dm/C |
Fm/C | B♭/C |`,

`title: I Left My Heart In San Francisco
by: Tony Bennett
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 68
key: C
[A]
Dm7 Cmaj7 G7/B Am7 | D9 Dm7 G13 |
[Intro]
Dm7 Cmaj7 | F F/G Cmaj7 | Bm7♭5 E7♭9/B | Am7 D9 |
Dm7 G13 | Dm7♭5 G7♭13 | A♭7 F♯7♭13 | Bm7♭5 E7♭9 |
Am7 D9 | Dm7 G13 |
[A2]
C6 Cmaj7 | Em7 E♭°7 | Dm7 G13 | % |
Dm Dm(maj7) | Dm7 G7♯5 | C Cmaj7 | C6 C6/E F A7/F♯ |
[B]
Em7 C6 | Cmaj7 B7♯5 | Em7 B7♯5 | Em7 Em6 |
Am7 | D7 | Dm7 A7/C♯ | Dm7 G13 |
[A3]
C6 Cmaj7 | Em7 E♭°7 | Dm7 G13 | % |
G7 | G7♯11 G7 | Bm7 | E7 |
A7♭13 | % | D9 | % |
Dm7 | G13♭9 | C6 Fm9 | C6 |`,

`title: I Saw Her Standing There
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 153
key: E
form: Intro A B A B C A2 B D
[Intro]
E7 | % | E7 | % |
[A]
E7 | % | A7 | E7 |
E7 | % | B7 | % |
[B]
E | E/G♯ | A7 | C |
E7 | B7 | E7 | % |
[C]
A7 | % | A7 | % |
A7 | % | B7 | % |
A7 |
[A2]
E7 | % | A7 | E7 |
% | E7 | B7 | % |
[D]
E7 | B7 | E7 | % |
E7 | B7 | A7 | E9 |`,

`title: I Say A Little Prayer For You
by: Dionne Warwick
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 141
key: G
form: Intro Intro2 A A2 B A A2 B C D D2
[Intro]
Gmaj7 | % | D7sus | % |
[Intro2]
Gmaj7 | % | D7sus | % |
Bmaj7 | Bsus |
[A]
Em7 | Am7 | Am7 | D9sus |
Gmaj7 | F♯m7 | B7 |
[A2]
Em7 | Am7 | % | D9sus |
Gmaj7 | F♯m7 | B7 |
[B]
C D/C | Bm7 Em7/B | G9 G9sus | C D/C |
Bm7 Em7/B | G9 G9sus | C D/C | Bm7 Em7/B |
G9 G9sus | C D/C | B7 | % |
[C]
Em7 | Am7 | % | D9sus |
D9sus | Gmaj7 | Gmaj7 D9sus |
[D]
Gmaj7 | D9sus |
[D2]
Gmaj7 | D9sus | Gmaj7 | % |
D9sus | % | Gmaj7 | % |
D9sus | % |`,

`title: I Shot The Sheriff
by: Bob Marley
genre: Pop
feel: Reggae
source: iReal Pro community chart
tempo: 97
key: Gm
time: 2/4
form: B A B A B A2 B A2 B A C C
[B]
Gm | Cm7 | Gm | % |
Gm | Cm7 | Gm | % |
[A]
E♭ Dm7 | Gm7 | E♭ Dm7 | Gm7 |
E♭ Dm7 | Gm7 | E♭ Dm7 | Gm7 |
E♭ Dm7 | Gm7 | N.C. | N.C. |
N.C. |
[A2]
E♭ Dm7 | Gm7 | E♭ Dm7 | Gm7 |
E♭ Dm7 | Gm7 | E♭ Dm7 | Gm7 |
E♭ Dm7 | Gm7 | N.C. | N.C. |
N.C. | N.C. | N.C. |
[C]
Gm | Cm7 | Gm | % |`,

`title: I Still Haven't Found What I'm Looking For
by: U2
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 103
key: D♭
form: Intro A B A B2 C
[Intro]
D♭5 | % | D♭5 | % |
[A]
D♭5 | % | D♭5 | % |
D♭sus/G♭ | % | D♭5 | % |
D♭5 | % | D♭5 | % |
D♭sus/G♭ | % | D♭5 | % |
[B]
A♭sus | D♭sus/G♭ | D♭ D♭sus | D♭ |
A♭sus | D♭/G♭ D♭sus/G♭ | D♭ D♭sus | D♭ |
[B2]
A♭sus | D♭sus/G♭ | D♭ D♭sus | D♭ |
A♭sus | D♭/G♭ D♭sus/G♭ | D♭ D♭sus | D♭5 |
[C]
D♭5 G♭ | % | D♭ G♭ | D♭5 G♭ |
% | D♭5 G♭ | G♭ | G♭ |
D♭ G♭ | D♭ | A♭sus | D♭sus/G♭ |
D♭ D♭sus | D♭ | A♭sus | D♭sus/G♭ |
D♭ D♭sus | D♭ D♭sus | D♭ D♭sus | D♭ D♭sus |`,

`title: I Want To Hold Your Hand
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 126
key: G
form: Intro A A B A B A2
[Intro]
D7 D7/E | % | D7 D7/E | D7 |
[A]
G | D7 | Em | B7 |
G | D7 | Em | B7 |
C D7 | G Em | C D7 | G |
[B]
Dm7 | G7 | C | Am |
Dm7 | G7 | C | D7 |
D7 | % | D7 |
[A2]
G | D7 | Em | B7 |
G | D7 | Em | B7 |
C D7 | G Em | C D7 | B7 |
C D7 | C | G |`,

`title: I Want You Back
by: The Jackson 5
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 101
key: A♭
time: 2/4
form: Intro Intro2 A A B
[Intro]
A♭ | D♭ | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
[Intro2]
A♭ | D♭ | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
A♭ A♭/G Fm Fm/E♭ | D♭ Cm B♭m E♭7 | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
[A]
A♭ | D♭ | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
[B]
A♭ A♭/G Fm Fm/E♭ | D♭ Cm B♭m E♭7 | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
A♭ A♭/G Fm Fm/E♭ | D♭ Cm B♭m E♭7 | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
A♭ | % | % | A♭ |
A♭ | % | A♭ | % |
A♭ | % | A♭ | % |
A♭ A♭/G Fm Fm/E♭ | D♭ Cm B♭m E♭7 | Fm Cm D♭ A♭ | B♭m E♭7 A♭ |
A♭ | A♭ | A♭ A♭/G Fm Fm/E♭ | D♭ Cm B♭m E♭7 |
Fm Cm D♭ A♭ | B♭m E♭7 A♭ | A♭ | A♭ |`,

`title: I'm A Believer
by: The Monkees
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 144
key: G
form: Intro A B C A B C2
[Intro]
G7 G13 | G7 | % |
[A]
G | D7 | G | % |
G | D7 | G | % |
[B]
C | G | C | G |
C | G | D7 | D7 N.C. |
[C]
G7 C | G C | G7 C | G C |
G7 C | G C | G7 C | G C |
G N.C. | C | G | F |
D7 | % |
[C2]
G7 C | G C | G7 C | G C |
G7 C | G C | G7 C | G C |
G N.C. | C | G | F |
D7 | % | G7 G13 | G |
G7 G13 | G |`,

`title: I'm Yours
by: Jason Mraz
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 78
key: B
form: Intro A B A2 B C A2 B C2 B2 B3 B2 B2
[Intro]
B | F♯ | G♯m | E |
[A]
B | F♯ | G♯m | E |
B | F♯ | G♯m | E |
[B]
B | F♯ | G♯m | E |
B | F♯ | G♯m | E |
[A2]
B | F♯ | G♯m | E |
B | F♯ | G♯m | E |
C♯7 |
[C]
B F♯/A♯ | G♯m F♯ | E | C♯ |
B F♯/A♯ | G♯m F♯ | E | C♯ |
[C2]
B F♯/A♯ | G♯m F♯ | E | C♯ |
B F♯/A♯ | G♯m F♯ | E | C♯ |
E |
[B2]
B | F♯ | G♯m | E |
[B3]
B | F♯ | G♯m | E |
C♯7 |`,

`title: If I Fell
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 111
key: D
[Intro]
E♭m | D | D♭ | B♭m7 |
E♭m | D | Em7 | A7 |
[A]
D Em | F♯m F♯m F♯m/F | Em7 | A7 |
D Em | F♯m F♯m F♯m/F | Em7 | A7 |
D | Gm A7 |
[A2]
D Em | F♯m F♯m F♯m/F | Em7 | A7 |
D Em | F♯m F♯m F♯m/F | Em7 | A7 |
D9 | % |
[B]
G | Gm | % | D |
A7 |
[A3]
D Em | F♯m F♯m F♯m/F | Em7 | A7 |
D Em | F♯m F♯m F♯m/F | Em7 | A7 |
D | Gm | D | Gm |
D |`,

`title: Imagine
by: John Lennon
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 75
key: C
form: Intro A B A B C
[Intro]
C C | F | C C | F |
[A]
C C | F | C C | F |
C C | F | C C | F |
[B]
F F/E | F/D F/C | G7 | % |
[C]
F G7 | C E7 | F G7 | C E7 |
F G7 | C E7 | F G7 | C |
F G7 | C E7 | F G7 | C E7 |
F G7 | C E7 | F G7 | C |`,

`title: Immigrant Song
by: Led Zeppelin
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 108
key: F♯m
form: Intro A B A B2 C
[Intro]
F♯5 | % | F♯5 | % |
F♯7♭5 | F♯5 | F♯7♭5 | F♯5 |
[A]
E | E E5 A5 | F♯5 | % |
F♯5 | % | F♯5 | F♯5 A5 |
E | E E5 A5 |
[B]
F♯5 | % | A | B |
C | % | F♯5 | % |
F♯7♭5 | F♯5 | F♯7♭5 | F♯5 |
[B2]
F♯5 | % | A | B |
C | % | F♯5 | % |
[C]
F♯5 | % | F♯5 | F♯5 C9 |
F♯5 | F♯5 C9 | F♯5 | F♯5 C9 |
F♯5 C9 | F♯5 C9 | F♯5 C9 | F♯5 C9 |
F♯5 C9 | F♯5 |`,

`title: In My Life
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 105
key: A
form: Intro A B A B2
[Intro]
A | E7 | A | E7 |
[A]
A E7 | F♯m A7/G | D Dm | A |
A E7 | F♯m A7/G | D Dm | A |
[B]
F♯m | D | G | A |
F♯m | B | Dm | A |
A | E7 |
[B2]
F♯m | D | G | A |
F♯m | B | Dm | A |
Dm | A | E7 | A |`,

`title: It's Too Late
by: Carole King
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 105
key: Am
form: Intro A B A B2 C C2
[Intro]
Am7 | D7 | Am7 | D7 |
[A]
Am7 | D7 | Am7 | D7 |
Am7 | Gm7 | Fmaj7 | % |
[B]
B♭maj7 | Fmaj7 | B♭maj7 | Fmaj7 |
B♭maj7 | Fmaj7 | Dm7 | E7sus E7 |
Am7 | D7 | Am7 | D7 |
[B2]
B♭maj7 | Fmaj7 | B♭maj7 | Fmaj7 |
B♭maj7 | Fmaj7 | Dm7 | F/G G7 |
[C]
Cmaj7 | Fmaj7 | B♭maj7 | Am7 |
Gm7 | Fmaj7 | Dm7 | E7sus E7 |
Am7 | D7 | Am7 | D7 |
F/G G7 |
[C2]
Cmaj7 | Fmaj7 | B♭maj7 | Am7 |
Gm7 | Fmaj7 | Dm7 | F/G G7 |
Cmaj7 | Fmaj7 | Cmaj7 | Fmaj7 |
Cmaj7 | % |`,

`title: Jealous Guy
by: John Lennon
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 68
key: G
form: Intro A B A B A B A B2
[Intro]
G Em | D | D7 | Em |
[A]
G Em | D | D7 D7/D♯ | Em |
Em6 | D7 | Em | C |
[B]
G G7/F | C D7sus | G Gsus/F | B♭ B♭/A |
G G/F♯ | Em Em/D | C | G |
[B2]
G G7/F | C D7sus | G Gsus/F | B♭ B♭/A |
G G/F♯ | Em Em/D | C | G C |
G C | G |`,

`title: Killer Queen
by: Queen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 113
key: Cm
form: A B A B2 C D
[A]
Cm | B♭7 | Cm | B♭7 Cm |
E♭ B♭/D | E♭7/D♭ A♭/C | A♭m/C♭ E♭/B♭ | B♭11 |
B♭11 | G7 Cm | B♭7 E♭ | D7 Gm7 F7 |
[B]
B♭ Dm | Gm Dm | Gm A7 Dm | G7 C |
C B♭ | A7 Dm | G7 C | C B♭ |
F B♭/F E♭/F | E♭/F B♭/F E♭/F | F B♭/F E♭/F | E♭/F B♭/F E♭/F |
[B2]
B♭ Dm | Gm Dm | Gm A7 Dm | G7 C |
C B♭ | A7 Dm | A7 Dm | G7 Cm |
G7 Cm Cm/F | Fsus | Fsus |
[C]
Cm | B♭7 | Cm | B♭7 |
E♭ B♭/D | E♭/D♭ A♭/C | A♭m/C♭ E♭/B♭ | B♭ |
B♭ | E♭/B♭ | B♭7 |
[D]
G7 Cm | G7 Cm | B♭7 E♭ | % |
D7 Gm F | B♭ F | B♭m F | F |
F B♭/F | F B♭ E♭/C | F B♭ E♭/G | F B♭ E♭ |
E♭ | % | E♭ | % |`,

`title: Killing Me Softly With His Song
by: Roberta Flack
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 122
key: A♭
form: Intro A B A B B B
[Intro]
Fm | B♭m7 | E♭7 | A♭ |
Fm | B♭/D | E♭7 | D♭ |
A♭ | D♭ | G♭maj7 | % |
F | E♭9sus | E♭9 | E♭9sus |
E♭9 |
[A]
B♭m7 | E♭7 | A♭ | D♭maj7 |
B♭m7 | E♭7 | Fm | % |
B♭m7 | E♭7 | A♭ | C7 |
[B]
Fm | B♭m7 | E♭7 | A♭ |
Fm | B♭/D | E♭ | D♭ |
A♭ | D♭ | G♭maj7 | % |
F | % |`,

`title: Knockin' On Heaven's Door
by: Bob Dylan
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 70
key: G
form: Intro Intro A B A B2
[Intro]
G D | Am | G D | C |
[A]
G D | Am | G D | C |
G D | Am | G D | C |
[B]
G D | Am | G D | C |
G D | Am | G D | C |
[B2]
G D | Am | G D | C |
G D | Am | G D | C |
G D | Am | G D | C |
G D | Am | G D | C |`,

`title: Knocks Me Off My Feet
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 97
key: C
[Intro]
Cmaj7 | Gm C7 | Fm B♭7 | Cmaj7 |
Cmaj7 Gsus | Cmaj7 | % |
[A]
Cmaj7 | Gm C7 | Fm B♭7 | Cmaj7 Gsus |
Cmaj7 | Gm C7 | Fm B♭7 | Cmaj7 Cmaj7/E Cmaj7/F |
[B]
G7sus | E9 E7♭9♭13 | Am Am/G | Fmaj9 |
B♭maj7 | A7 A7/C♯ Dm Em | F Em F/D Gsus | C |
B♭maj7 | A7 A7/C♯ Dm Em | F Em F/D | Gsus C |
F Em F/D Gsus | C Gsus |
[C]
C | E7♭9 E7 | Am7 Am7/G | Fmaj7 Gsus |
C | E7♭9 E7 | Am7 Am7/G | Fmaj7 F/E♭ |
D7sus D7 | F/G | C A♭sus | D♭ |
F7 | B♭m B♭m/A♭ | G♭ A♭sus | D♭ |
F7 | B♭m B♭m/A♭ | G♭ A♭sus |`,

`title: Kodachrome
by: Paul Simon
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 136
key: E
form: Intro A A2 B C A A2 D D
[Intro]
E | % | A | % |
F♯m | B7 | E | F♯m B7 |
[A]
E | E7 | A | % |
F♯m | B7 | E | F♯m B7 |
[A2]
E | E7 | A | % |
F♯m | B7 | E E7 |
[B]
A C♯7 | F♯ | Bm | E7 |
A | D | B7 | E7 |
A C♯7 | F♯ | Bm | E7 |
A | D | B7 | E7 |
[C]
A | C♯m | F♯m | B7 |
[D]
A | C♯m | F♯m | % |`,

`title: The Lady In My Life
by: Michael Jackson
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 77
key: Am
[Intro]
Amaj7 Dm7 | Dm7 Em7 | Amaj7 Dm7 | Dm7 Em7 |
Am7 Bm7/A | % |
[A]
Am7 Bm7/A | Am7 Em7 | Dm7 G/D | Em7 Dm7 G |
[A2]
Am7 Bm7/A | Am7 Em7 | Dm7 G/D | % |
[B]
G | Fmaj7 | G | D/E |
[C]
Amaj7 Dm7 | G7sus Cmaj7 | Fmaj7 Bm7 | D/E A Dm |
Amaj7 Dm7 | G7sus Cmaj7 | Fmaj7 Bm7 | D/E |
Amaj7 Dm7 | Dm7 Em7 |
[D]
Dm7 Em | Dm7 Em | Am7 | G |
Dm7 Em | Dm7 Em | Am7 | D/E E |
Amaj7 Dm7 | Dm7 Em7 | Amaj7 Dm7 | Dm7 Em7 |`,

`title: Lately
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 74
key: A♭
[Intro]
D♭maj9 | B♭m7 | G♭maj7 | A♭sus A♭7 |
[A]
D♭69 | B♭m7 | E♭m7 | A♭7 |
E♭m E♭m(maj7) | E♭m7 A♭7 | D♭maj9 | % |
[A2]
D♭69 | B♭m7 | E♭m7 | A♭7 |
E♭m E♭m(maj7) | E♭m7 A♭7 | D♭maj9 | D♭7 |
[B]
G♭6 | G♭m6 | Fm7 | B♭sus B♭sus/E♭ B♭sus/F |
E♭m7 Fm7 | G♭m7 A♭7 | D♭69 | B♭sus B♭sus/E♭ B♭sus/F |
E♭m7 Fm7 | G♭m7 A♭7 | D♭69 | B♭m7 |
G♭maj7 | A♭sus A♭7 | G♭m7 A♭m7 | Amaj7 Bm7 |
D♭m7 C9♯11 |
[B2]
B6 | Bm6 | B♭m7 | E♭sus E♭sus/A♭ E♭sus/B♭ |
A♭m7 B♭m7 | Bm7 D♭7♭9 | G♭69 | E♭sus E♭sus/A♭ E♭sus/B♭ |
A♭m7 B♭m7 | Bm7 D♭7♭9 | G♭69 | E♭m7 |
Bmaj7 | A♭m7 D♭sus D♭7 | E♭maj7 |`,

`title: Layla (Single)
by: Eric Clapton
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 120
key: Dm
form: Intro Intro2 A B A B A B2 C C
[Intro]
Dm B♭ | C Dm | Dm B♭ | C Dm |
[Intro2]
Dm B♭ | C Dm | Dm B♭ | C Dm |
Dm B♭ | C Dm | Dm B♭ | C |
[A]
C♯m | G♯m | C♯m C D7 | E7 |
F♯m B7 | E A | F♯m B7 | E A5 |
[B]
Dm B♭ | C Dm | Dm B♭ | C Dm |
Dm B♭ | C Dm | Dm B♭ | C |
[B2]
Dm B♭ | C Dm | Dm B♭ | C Dm |
Dm B♭ | C Dm | Dm B♭ | C |
Dm B♭ | C Dm |
[C]
Dm B♭ | C Dm | Dm B♭ | C Dm |`,

`title: The Letter
by: The Box Tops
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 137
key: Am
form: Intro A A2 B A2 B A3 C C
[Intro]
N.C. | E7 |
[A]
Am | F | G | D |
Am | F | E7 | Am |
[A2]
Am | F | G | D |
Am | F | E7 | Am |
Am |
[B]
C G | F C | G | % |
C G | F C | G | E7 |
[A3]
Am | F | G | D |
Am | F | E7 | Am |
E7 | Am |
[C]
D♭ A♭ | G♭ D♭ | A♭ | % |`,

`title: Life On Mars
by: David Bowie
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 58
key: E
form: A B A B2
[A]
E Emaj7/D♯ | E7/D D♭7 | F♯m F♯m7/E | B/D♯ B7 |
E Emaj7/D♯ | E7/D D♭7 | F♯m F♯m7/E | B/D♯ B7 |
G/D D♯+ | Em G7/F | C G♯+ | Am C7/B♭ |
[B]
A D | F♯m F+ | E Em | Bm7 Dm7 |
A D | F♯m F+ | E Em | Bm7 Dm7 |
F♯m F+ | A/E D♯m7♭5 | E F°7 | F♯m G°7 |
G♯m A | Am7 |
[B2]
A D | F♯m F+ | E Em | Bm7 Dm7 |
A D | F♯m F+ | E Em | Bm7 Dm7 |
F♯m F+ | A/E D♯m7♭5 | E F°7 | F♯m Esus |
Esus Esus | D Dm7 | A |`,

`title: Light My Fire
by: The Doors
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 122
key: Am
form: Intro A B A B C C A2
[Intro]
G D | F B♭ | E♭ A♭ | A |
% |
[A]
Am7 | F♯m7 | Am7 | F♯m7 |
Am7 | F♯m7 | Am7 | F♯m7 |
[B]
G A | D Dsus D | G A | D B |
G D | E | E7 |
[C]
Am7 Bm7 | % |
[A2]
Am7 | F♯m7 | Am7 | F♯m7 |
Am7 | F♯m7 | Am7 | F♯m7 |
G A | D | G A | D |
F C | D | F C | D |
F C | D | G D | F B♭ |
E♭ A♭ | A |`,

`title: Like A Rolling Stone
by: Bob Dylan
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 95
key: C
form: Intro A B A B2 A B3
[Intro]
C Fmaj7/C | % | C Fmaj7/C | % |
[A]
C Dm | Em F | G7 | % |
C Dm | Em F | G7 | % |
F | G7 | F | G7 |
F Em | Dm C | F Em | Dm C |
Dm | F | G7 | % |
[B]
C F | G7 | C F | G7 |
C F | G7 | C F | G7 |
C F | G7 | C F | G7 |
G7 |
[B2]
C F | G7 | C F | G7 |
C F | G7 | C F | G7 |
C F | G7 | C F | G7 |
C F | G7 | % |
[B3]
C F | G7 | C F | G7 |
C F | G7 | C F | G7 |
C F | G7 | C F | G7 |
C F | G7 | % | C F |
G7 | % | C F | G7 |
C F | G7 |`,

`title: Like A Star
by: Corinne Bailey Rae
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 65
key: Am
form: A B A B2 C A2 B3 B4
[A]
Dm7 | E7♭9 | Am7 | Am6 |
Dm7 | E7♭9 | Am7 | Gm9 C9 |
[B]
Fmaj7 | E7♭9 E7/G♯ | Am7 Am7/C | Gm7 C9 |
Fmaj7 | E7♭9 |
[B2]
Fmaj7 | E7♭9 E7/G♯ | Am7 Am7/C | Gm7 C9 |
Fmaj7 | E7♭9 E♭7♯11 |
[C]
Dm7 | E7♭9 | Am7 | Am6 |
[A2]
Dm9 | E7 | Am9 | Gm11 |
Dm9 | E7 | Am9 | Gm11 C9 |
Fmaj7 | E7♭9 | Am9 | Gm11 C9 |
[B3]
Fmaj7 | E7♭9 E7/G♯ | Am7 Am7/C | Gm7 C9 |
[B4]
Fmaj7 | E7♭9 E7/G♯ | Am7 Am7/C | Gm7 C9 |
Fmaj7 | E7♭9 | Dm7 | E7 |
Am9 | Am6 | Dm7 | E7♭9 |`,

`title: Like A Virgin
by: Madonna
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 118
key: F♯
form: Intro A B C A B C2
[Intro]
G♭6 | % | G♭6 | % |
[A]
G♭6 | % | G♭6 | % |
A♭m7 | % | G♭6 | % |
[B]
G♭6 | % | G♭6 | % |
A♭m7 | E♭m7 | A♭m7 | E♭m7 |
D♭sus D♭ | D♭add9 D♭ |
[C]
G♭6 | % | G♭6 | % |
A♭m7 | % | G♭6 | % |
[C2]
G♭6 | % | G♭6 | % |
A♭m7 | % | G♭6 | % |
E♭m7 | A♭ | E♭m7 | A♭ |
E♭m7 | A♭ | E♭m7 | A♭ |
G♭6 | % | G♭6 | % |
A♭m7 | % | G♭6 | % |
G♭6 | % | G♭6 | % |
A♭m7 | % | G♭6 | % |`,

`title: Little Green
by: Joni Mitchell
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 106
key: B
form: Intro A A B B2 C
[Intro]
Bmaj7 | Bmaj7/D♯ C♯m11 | Bsus | B |
[A]
Bmaj7 | Bmaj7/D♯ C♯m11 | Bsus B | B |
Bmaj7 | Bmaj7/D♯ C♯m11 | Bsus B | B7 |
C♯m C♯m11 | C♯m11 | E | % |
Bmaj7 | Bmaj7/D♯ C♯m11 | Bsus B | B |
[B]
E | D | B Bsus | Bsus B |
Bmaj7/D♯ | C♯m7 | Bsus B | B |
[B2]
E | D | B Bsus | Bsus B |
Bmaj7/D♯ | C♯m7 | Bmaj7/D♯ C♯m11 | Bsus B |
B |
[C]
B | % | B | % |
B | % | B | % |`,

`title: Little Wing
by: Jimi Hendrix
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 68
key: G♭
time: 2/4
form: Intro A A
[Intro]
E♭m G♭/B♭ C♭/E♭ | G♭ C♭/G♭ G♭ | A♭m A♭m7 | E♭m |
B♭m B♭m9 B♭m7 A | A♭m C♭ | G♭add9 Eadd9 | C♭69 D♭5 |
D♭ N.C. | N.C. |
[A]
E♭m | G♭ | A♭m A♭m7 | E♭m7 |
B♭m7 A | A♭m C♭ | G♭add9 Eadd9 | C♭69 D♭5 |
D♭ N.C. | N.C. |`,

`title: Long And Winding Road
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 70
key: E♭
form: A A B A2
[A]
Cm7 | A♭/B♭ | E♭ E♭/D♭ | A♭ A♭maj7 |
A♭ E♭/G | Cm7 | Fm7 B♭7 | E♭9sus E♭sus E♭7 |
A♭ E♭/G | Cm7 | Fm7 B♭7 | E♭ |
[B]
E♭/B♭ A♭ | E♭/G Fm B♭7 | E♭/B♭ A♭ | E♭/G Fm7 G7 |
[A2]
Cm7 | A♭/B♭ | E♭ E♭/D♭ | A♭ A♭maj7 |
A♭ E♭/G | Cm7 | Fm7 B♭7 | E♭9sus E♭sus E♭7 |
A♭ E♭/G | Cm7 | Fm7 B♭7 | E♭ |
Cm7 | A♭/B♭ | E♭ |`,

`title: The Longest Time
by: Billy Joel
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 167
key: E♭
form: Intro Intro A A B B A C A C A C2 C2
[Intro]
E♭ | B♭ Gm | A♭ | B♭7 |
[A]
E♭ B♭/D | Cm Cm/B♭ | A♭ | E♭ |
E♭ B♭/D | Cm Cm/B♭ | F/A | B♭7 |
G7 G7/B | Cm | B♭7/D | E♭ |
A♭ | Fm7 | B♭7 | E♭ |
[B]
E♭ | B♭ Gm | A♭ | B♭7 |
[C]
B♭ | % | Cm | % |
D7 | % | E♭ | % |
Gm | % | Cm | % |
F7 | % | B♭7 | % |
[C2]
E♭ | B♭ Gm | A♭ | B♭7 |`,

`title: Love
by: John Lennon
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 85
key: D
form: Intro A A B C
[Intro]
F♯m | C♯ | F♯m | D |
G | A | D | F♯m |
G | A | D | % |
[A]
F♯m | C♯7 | F♯m | D7 |
Gmaj7 | Asus A7 A9 A7 | D | F♯m |
Em7 | Asus A7 A9 A7 | D | % |
[B]
F | G | D | % |
Em | G | D | % |
D |
[C]
F♯m | C♯ | F♯m | D |
G | A | D |`,

`title: Love and Happiness
by: Al Green-Teenie Hodges
genre: Pop
feel: R'n'B
source: iReal Pro community chart
tempo: 100
key: G♯m
form: Intro A A2 B C C2 A2 B D D B D D
[Intro]
E7 D♯7 | G♯m7 | E7 D♯7 | G♯m7 |
[A]
B | B7/A | G♯m7 F♯ | G♯m7 F♯ |
G♯m7 F♯ | D C♯m B | % |
[A2]
B | B7/A | G♯m7 F♯ | G♯m7 F♯ |
G♯m7 F♯ | D C♯m B | % | D C♯m B |
[B]
E7 D♯7 | G♯m7 | E7 D♯7 | G♯m7 |
[C]
G♯m7 | % | G♯m7 | % |
[C2]
G♯m7 | % | G♯m7 | % |
E7 D♯7 | G♯m7 | E7 D♯7 | G♯m7 |
[D]
G♯m7 | % | G♯m7 | % |`,

`title: Love Is All Around
by: The Troggs
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 97
key: D
form: Intro A A B C C
[Intro]
D5 G5 | A5 G5 | D5 G5 | A5 G5 |
[A]
D Em | G A7 | D Em | G A7 |
D Em | G A7 | D Em | G A7 |
[B]
N.C. | G | Em | G |
D | G | Em | % |
A | A N.C. |
[C]
D Em | G A7 | D Em | G A7 |`,

`title: Love Me Tender
by: Elvis Presley
genre: Pop
feel: Country Ballad
source: iReal Pro community chart
tempo: 75
key: D
form: Intro A B A B2
[Intro]
D |
[A]
D | E7 | A7sus A7 | D |
D | E7 | A7sus A7 | D |
[B]
D F♯7/C♯ | Bm D7/A | G Gm | D |
D D7/A B+ B7 | E7 | A7sus A7 | D |
[B2]
D F♯7/C♯ | Bm D7/A | G Gm | D |
D D7/A B+ B7 | E7 | A7sus A7 | D |
D |`,

`title: Love's In Need Of LoveToday
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 96
key: E♭
form: Intro A A B B2 B B3
[Intro]
E♭ D♭6 C7 | Fm7 A♭m6 | E♭ D♭6 C7 | Fm7 A♭m6 |
E♭ | A♭/B♭ |
[A]
E♭ | A7/E | Fm7 | B♭7sus B♭7 |
Fm7 | B♭9 | A♭maj7 Gm7 | Fm7 B♭9 |
[B]
E♭ | Cm7 | Gm7 | % |
Fm7 | % | Cm7 | A♭/B♭ |
[B2]
E♭ | Cm7 | Gm7 | % |
Fm7 | % | Cm7 | A♭/B♭ |
E♭ D♭6 C7 | Fm7 A♭m(maj7) | E♭ D♭6 C7 | Fm7 A♭m(maj7) |
E♭ | A♭/B♭ |
[B3]
E♭ | Cm7 | Gm7 | % |
Fm7 | % | Cm7 | A♭/B♭ |
E♭ |`,

`title: Lovely Day
by: Bill Withers
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 98
key: E
form: Intro A B C A B C D D
[Intro]
E | C♯m7 | Amaj7 | Amaj7 C B7 |
E | C♯m7 | Amaj7 | Cmaj7 C B7 |
[A]
E | C♯m7 | Amaj7 | Amaj7 C B7 |
E | C♯m7 | Amaj7 | Cmaj7 |
[B]
C/D | D/E | Am7 | Bm7 |
C/D | D/E | Am7 | Bm7 |
[C]
E | C♯m7 | Amaj7 | Cmaj7 C B7 |
E | C♯m7 | Amaj7 | Cmaj7 C B7 |
[D]
E | C♯m7 | Amaj7 | Cmaj7 C B7 |`,

`title: Maggie May
by: Rod Stewart
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 124
key: D
form: Intro A B A B C
[Intro]
D D/F♯ | Dsus/E | G | D |
D D/F♯ | Dsus/E | G | D G/B G |
[A]
A | G | D | % |
A | G | D | % |
[B]
G | D | G | A |
Em | F♯m | Em | Em D/F♯ |
Em | A | Em | A |
Em | A G | D | % |
[C]
Em | A | D | G |
Em | G | D | % |
Em | A | D | G |
Em | G | D | % |
Em | A | D | G |
Em | G | D D/F♯ | Dsus/E |
G | D | D D/F♯ | Dsus/E |
G | D |`,

`title: Mary Jane's Last Dance
by: Tom Petty
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 88
key: Am
form: Intro Intro A A B C A2 A2 B D D2
[Intro]
Am G | D Am | Am G | D Am |
[A]
Am G | D Am | Am G | D Am |
Am G | D Am | Am G | D Am |
[B]
Em7 | % | A | % |
Em7 | % | A | G6 |
[C]
Am G | D Am | Am G | D Am |
[A2]
Am G | D Am | Am G | D Am |
[D]
Am G | D Am | Am G | D Am |
[D2]
Am G | D Am | Am G | D Am |
Am G | D Am | Am G | D Am |`,

`title: Massachusetts
by: Bee Gees
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 97
key: G
form: Intro A B A B A B2
[Intro]
G | % | G | % |
[A]
G | Am C | G | % |
G | Am C | G | % |
[B]
G | % | C | % |
G | D | G | D |
[B2]
G | % | C | % |
G | D | G | D |
D | G | Am C | G |
Am C |`,

`title: Me And Mrs. Jones
by: Billy Paul
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 67
key: E♭
form: Intro Intro A B A B2
[Intro]
E♭maj7 A♭maj7 | % | E♭maj7 A♭maj7 | % |
[A]
E♭maj9 B♭11 | % | Gm7 G♭m | Fm7 |
B♭11 | Fm9/B♭ | B♭13sus B♭7♭13 | E♭maj9 |
[B]
Gm7 G7 | Cm7 | Gm7 G♭m | Fm7 B♭13sus |
E♭maj7 G7 | Cm7 | Gm7 | F9 |
B♭13sus B♭7 N.C. | N.C. |
[B2]
Gm7 G7 | Cm7 | Gm7 G♭m | Fm7 B♭13sus |
E♭maj7 G7 | Cm7 | Gm7 | F9 |
B♭13sus B♭7 N.C. | N.C. | E♭maj7 A♭maj7 | % |
E♭maj7 A♭maj7 | % |`,

`title: Mercy
by: Duffy
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 129
key: Gm
form: Intro A B A B2
[Intro]
G5 | % | G5 | % |
G C/G | G7 C/G | G C/G | G7 C/G |
G C/G | G7 C/G | G C/G | G7 C/G |
Dsus | C7 | G C/G | G7 |
[A]
G5 | G F/G | G5 | G F/G |
G5 | G F/G | G5 | G F/G |
D7sus | C7 | G7 | % |
D7sus | C7 | G7 | % |
[B]
G C/G | G7 C/G | G C/G | G7 C/G |
C9 C7 | Csus C7 | G C/G | G7 C/G |
D7sus | C7 | G C/G | G7 |
[B2]
G C/G | G7 C/G | G C/G | G7 C/G |
C9 C7 | Csus C7 | G C/G | G7 C/G |
D7sus | C7 | G C/G | G7 |
N.C. | % | N.C. | % |
N.C. | % | N.C. | % |
N.C. | C7/G | G C/G | G7 C/G |
G C/G | G7 C/G | C9 C7 | Csus C7 |
G C/G | G7 C/G | D7sus | C7 |
G C/G | G7 | G5 | G5 |`,

`title: Michelle
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 120
key: F
form: Intro B B A B A C D D
[Intro]
Fm/C Fm(maj7)/C Fm(maj7)/E | Fm7 Fm6 | B♭m/F | C |
[B]
F | B♭7♯9 | E♭6 | D°7 D°7/B |
C B°7 | C |
[A]
Fm | % | A♭7 | D♭ |
C7 | Fm Fm/G Fm/A♭ Fm/B♭ | Fm/C Fm(maj7)/C | Fm7 Fm6 |
B♭m9/F | C |
[C]
F | B♭7♯9 | E♭6 | D°7 D°7/B |
C B°7 | C | Fm/C Fm(maj7)/C Fm(maj7)/E | Fm7 Fm6 |
B♭m/F | C |
[D]
F | B♭7♯9 | E♭6 | D°7 |
C B°7 | C |`,

`title: Midnight At The Oasis
by: Maria Muldaur
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 102
key: E♭
form: Intro A A B A A B A2
[Intro]
E/F♯ A/B B/C♯ | G♭/A♭ A♭/B♭ |
[A]
E♭maj7 | A♭maj7 D♭9 | E♭maj7 | A♭maj7 D♭9 |
E♭maj7 | A♭maj7 D♭9 | G♭maj7 B9 | G♭/A♭ A♭/B♭ |
[B]
E F♯ | A/B B/C♯ | E F♯ | A/B B/C♯ |
E F♯ | A/B B/C♯ | G♭/A♭ A♭/B♭ |
[A2]
E♭maj7 | A♭maj7 D♭9 | E♭maj7 | A♭maj7 D♭9 |
E♭maj7 | A♭maj7 D♭9 | G♭maj7 B9 | G♭/A♭ A♭/B♭ |
A♭/B♭ | A♭ A♭° | E♭ E♭7 | A♭ A♭° |
E♭ E♭7 |`,

`title: Moon Over Bourbon Street
by: Sting
genre: Pop
feel: Medium Swing
source: iReal Pro community chart
tempo: 118
key: Fm
form: A B A B C
[A]
Gm7♭5 | C7♭9♯11 | Fm7 | % |
Gm7♭5 | C7♭9♯11 | Fm Fm/E | Fm7/E♭ Fm/D |
D♭maj7 | C7 | Fm7 Fm7/G | Fm7/A♭ Fm7/C |
Dm7♭5 | G7 | D♭maj7 | C7 |
[B]
Gm7♭5 | C7♭9♯11 | Fm7 | % |
Gm7♭5 | C7♭9♯11 | Fm Fm/E | Fm7/E♭ Fm/D |
D♭maj7 | C7 | Fm Fm/E | Fm7/E♭ Fm/D |
D♭maj7 | C7 | Fm7 Fm7/A♭ | B♭m7 C7 |
Fm7 Fm7/A♭ | B♭m7 C7 | Fm7 Fm7/A♭ | B♭m7 C7 |
Fm7 Fm7/A♭ | B♭m7 C7 |
[C]
D♭ | E♭ Fm | G7 G7/B | Cm Cm/G |
Cm Fm | B♭ | A♭maj7 | G7/C |
C7 | B♭m/C | B♭/C | C7♯9 |
Fm/C | C7sus C7 | Fm |`,

`title: Moondance
by: Van Morrison
genre: Pop
feel: Medium Swing
source: iReal Pro community chart
tempo: 127
key: Am
form: Intro A A B C
[Intro]
Am7 Bm7 | % | Am7 Bm7 | % |
[A]
Am7 Bm7 | % | Am7 Bm7 | % |
Am7 Bm7 | % | Am7 Bm7 | % |
[B]
Dm7 | Am7 | Dm7 | Am7 |
Dm7 | Am7 | Dm7 | E7 |
[C]
Am7 Dm7 | % | Am7 Dm7 | % |
Am7 Dm7 | % | Am7 Dm7 | Am7 E7♭13 |
Am7 Bm7 | % | Am7 Bm7 | % |
Am7 Bm7 | % | Am7 Bm7 | % |
Am G | F Em | Dm | Am |`,

`title: Morning MorganTown
by: Joni Mitchell
genre: Pop
feel: Folk
source: iReal Pro community chart
tempo: 112
key: A
[Intro]
A | Dadd9/A | Dm9/A | A |
[A]
Amaj9/C♯ | C°7 | Bm7 | A |
D | Amaj9/C♯ | C♯m7 Bm7 | A Asus A |
[A2]
Amaj9/C♯ | C°7 | Bm7 | A |
D | Amaj9/C♯ | C♯m7 Bm7 | A Asus |
A |
[B]
E | D A | A | D/A A |
F | D A | C♯m7 Bm7 | A Asus |
A | C♯m7 | Cm Bm7 | A Asus |
% | A Asus | A | A |
D/A | Dm7/A | A |`,

`title: Mustang Sally
by: Wilson Pickett
genre: Pop
feel: R'n'B
source: iReal Pro community chart
tempo: 113
key: C
[Intro]
C7 | % | C7 | % |
[A]
C7 | % | C7 | % |
C7 | % | C7 | % |
F7 | % | F7 | % |
C7 | % | C7 | % |
G7 | % | F7 N.C. | N.C. |
C7 | % | C7 | % |
C7 | % | C7 | % |`,

`title: My Cherie Amour
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 105
key: D♭
[Intro]
G♭maj7 | Bmaj7♯11 | % | D♭maj7 |
[Intro2]
G♭maj7 | Bmaj7♯11 | % | D♭maj7 A♭7 |
[A]
D♭maj7 | G♭7sus G♭7 | Bmaj7 | A♭7sus A♭7 |
D♭maj7 | G♭7sus G♭7 | Bmaj7 | A♭7sus A♭7 |
G♭maj7 | A♭7sus A♭7 | B9♯11 | B♭7 |
E♭9 | A♭13 | D♭maj7 | D♭maj7 A♭7♭9 |
[A2]
D♭maj7 | G♭7sus G♭7 | Bmaj7 | A♭7sus A♭7 |
D♭maj7 | G♭7sus G♭7 | Bmaj7 | A♭7sus A♭7 |
G♭maj7 | A♭7sus A♭7 | B9♯11 | B♭7 |
E♭9 | A♭13 | D♭maj7 | D♭maj7 N.C. |
G♭maj7 | Bmaj7♯11 | % | D♭maj7 |
G♭maj7 | Bmaj7♯11 | % | D♭maj7 A7 |
[B]
Dmaj7 | G7sus G7 | Cmaj7 | A7sus A7 |
Dmaj7 | G7sus G7 | Cmaj7 | A7sus A7 |
Gmaj7 | A7sus A7 | C9♯11 | B7 |
E9 | A13 | Dmaj7 | Dmaj7 N.C. |
Gmaj7 | Cmaj7♯11 | % | Dmaj7 |
Gmaj7 | Cmaj7♯11 | % | Dmaj7 |`,

`title: My Immortal
by: Evanescence
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 80
key: A
form: Intro A B C Intro A B C D
[Intro]
A | C♯m | Aadd9 | C♯m |
[A]
A | C♯m | Aadd9 | C♯m |
A | C♯m | Aadd9 | C♯m |
[B]
F♯m C♯m | F♯m C♯m | F♯m C♯m | E Esus |
[C]
F♯m Dadd9 | E C♯m | F♯m Dadd9 | E C♯m |
F♯m Dadd9 | E C♯m | F♯m Dadd9 | E |
% |
[D]
D | F♯m | E | D |
Bm9 | A/C♯ | E/D D | E E7sus |
F♯m Dadd9 | E C♯m | F♯m Dadd9 | E C♯m |
A | C♯m | Aadd9 | C♯m |
A | C♯m | Aadd9 | C♯m |
A |`,

`title: Natural Woman (You Make Me Feel Like)
by: Aretha Franklin
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 100
key: C
time: 3/4
form: A A B C D D2 C C
[A]
C | % | G/B | % |
B♭ | % | F | % |
[B]
Am7/D | Em7 | Am7/D | Em7 |
Am7/D | Em7 | Am7/D | F/G |
[C]
C | F | C | F |
C | % | Dm7 | Gsus |
[D]
C | % | Gm/C | % |
[D2]
C | % | Gm/C | % |
Fmaj7 | % | Cm7 | % |
Fmaj7 | Em7 | Dm7 | Gsus |`,

`title: Never Dreamed You'd Leave In Summer
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 85
key: C
[Intro]
C Cmaj7 | Fmaj7 | C Cmaj7 | Fmaj7 |
[A]
C Cmaj7 | Fmaj7 Fmaj7♯11 | C Cmaj7 | Fmaj7 Fmaj7♯11 |
C Cmaj7 | Fmaj7 Fmaj7♯11 | D | D G/A |
Dm7 | A7♭13 | Dm7 | Dm Dm/D♭ Dm/C Dm/B |
B♭7 B♭7♯11 | A7 A7♭13 | A♭7♯11 | G9 |
[A2]
C Cmaj7 | Fmaj7 Fmaj7♯11 | C Cmaj7 | Fmaj7 Fmaj7♯11 |
C Cmaj7 | Fmaj7 Fmaj7♯11 | D | D G/A |
Dm7 | A7♭13 | Dm7 | Dm Dm/D♭ Dm/C Dm/B |
B♭7 B♭7♯11 | A7 A7♭13 | A♭7♯11 | G9 A7 |
[B]
D Dmaj7 | Gmaj9 | D Dmaj7 | Gmaj9 |
D Dmaj7 | Gmaj7 G/F♯ | E7 | E7 Bsus |
Em7 | B7 | Em7 | Em7 Em7/E♭ Em7/D Em7/D♭ |
C7 | B7 | B♭7♯11 | Asus |
D Dmaj7 | Gmaj7 | D Dmaj7 | Gmaj7 |
D Dmaj7 | Gmaj7 | D |`,

`title: New York State Of Mind
by: Billy Joel
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 61
key: C
form: Intro A A2 B A A2 B A C
[Intro]
C E7♯9 | Am7 Gm7 C9 | Fmaj7 A7 | Dm7 B♭7 |
C G/B Am7 Am7/G | F F/E D9 | Fmaj9 G9sus | Am7 D9 |
Am7 F/G |
[A]
C E7♯9 | Am7 Gm7 C9 | Fmaj7 A7 | Dm7 B♭7 |
C G/B Am7 Am7/G | F F/E D9 | Fmaj9 G9sus | Am7 D9 |
Am7 F/G |
[A2]
C E7♯9 | Am7 Gm7 C9 | Fmaj7 A7 | Dm7 B♭7 |
C G/B Am7 Am7/G | F F/E D9 | F G9 | Am7 D9 |
Am7 F/G E7 |
[B]
Am7 D9 | Gmaj7 | Gm7 C9 | Fmaj7 |
Bm7 E9sus | Amaj7 | Am7 D9sus | Gmaj7 |
Dm7 Gsus G7 |
[C]
C G/B Am7 Am7/G | F F/E D9 | Fmaj9 G9sus | C E7♯9 |
Am7 B♭7 | E♭maj7 A♭maj7 Dm11 D♭maj7♯11 | Cmaj7♯11 |`,

`title: Nikita
by: Elton John
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 91
key: G
form: A B C A B C2 D
[A]
G Bm7 | C F/C | C | G C/G |
G | D G/D | D7 | G C/G |
G7 G7/B |
[B]
C Dm/C C F/C | C | G C/G G Am/G | G |
D G/D | D7 | G C/G | G7 G7/B |
[C]
C Dm/G | C | G C/G | G |
D | D7 | G | G7 G7/B |
C | % | G | % |
D Em | D7/F♯ | G | Bm Bm7 |
C | C♯° C/D |
[C2]
C Dm/G | C | G C/G | G |
D Em | D7/F♯ | G | Bm Bm7 |
C | C♯° C/D |
[D]
G | Bm Bm7 | C | F/C C |
C | Gadd9/B G/B | F/A | F/A B♭ |
E♭ | A♭6/E♭ | G7/D | Cm |
A♭maj7 | % | D7sus | D7 |
Am7 D7 | G | Bm Bm7 | C |
Am7 D7 | G | Bm Bm7 | C |
Am7 D7 |`,

`title: No Woman, No Cry
by: Bob Marley
genre: Pop
feel: Reggae
source: iReal Pro community chart
tempo: 77
key: C
form: Intro Intro B A A B A A C C B2 B2 D D B3 B4
[Intro]
C G/B | Am F | C F | C G7 G7/B |
[B]
C G/B | Am F | C F | C G7 G7/B |
C G/B | Am F | C F | C G7 G7/B |
[A]
C G/B | Am F | C G/B | Am F |
C G/B | Am F | C G/B | Am F |
[C]
C G/B | Am F | C G/B | Am F |
[B2]
C G/B | Am F | C F | C G7 G7/B |
[D]
C G/B | Am F | C F | C G7 G7/B |
[B3]
C G/B | Am F | C F | C G7 |
[B4]
C G/B | Am F | C F | C G7 |
C G/B | Am F | C F | C |`,

`title: Norwegian Wood
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 158
key: E
time: 3/4
form: Intro A A B A A A A B A A C
[Intro]
E | E/B | E | E/B |
E | D | E | % |
[A]
E | E/B | E | E/B |
E | D | E | % |
[B]
Em | % | Em | % |
A | % | A | % |
Em | % | Em | % |
F♯m7 | % | B | % |
[C]
E | E/B | E | E/B |
E | D | E |`,

`title: Nowhere Man
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 110
key: E
form: A B C D B C D C D2
[A]
E | B | A | E |
A6 | Am6 | E | E9 E |
[B]
E | B | A | E |
A6 | Am6 | E | % |
[C]
G♯m | A | G♯m | A |
G♯m | F♯m/A | % | B7 |
[D]
E | B | A | E |
A6 | Am6 | E | % |
[D2]
E | B | A | E |
A6 | Am6 | E | % |
A6 | Am6 | E | % |`,

`title: Oh! Darling
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 61
key: A
time: 1/2
form: Intro A A2 B A2 B A3
[Intro]
E+ |
[A]
A | E7 | F♯m | D |
Bm7 E9 | % | A D | A E7 |
[A2]
A | E7 | F♯m | D |
Bm7 E9 | % | A D | A A7 |
[B]
D | F | A | A7 |
B | % | E F | E E+ |
[A3]
A | E7 | F♯m | D |
Bm7 E9 | % | A D | A B♭7 A7 |`,

`title: Old Love
by: Eric Clapton, Robert Cray
genre: Pop
feel: Blues
source: iReal Pro community chart
tempo: 75
key: Am
form: Intro Intro A B C A B C D D2
[Intro]
Am7 Dm7 | G7sus G7 | Am7 Dm7 | G7sus G7 |
[A]
Am7 Dm7/A | G7sus G7 | Am7 F | G7sus G7 |
Am7 Dm7/A | G7sus G7 | Am7 F | G7sus G7 |
[B]
F7 | E7 | Am Am/G♯ | Am7/G D7/F♯ |
F7 | E7 | F7 | E7 |
[C]
Am7 Dm7 | G7sus G7 | Am7 Dm7 | G7sus G7 |
Am7 Dm7 | G7sus G7 | Am7 Dm7 | G7sus G7 |
[D]
Am7 F | G7sus G7 | Am7 F | G7sus G7 |
[D2]
Am7 F | G7sus G7 | Am7 F | G7sus G7 |
Am7 Dm7 | G7sus G7 | Am7 Dm7 | G7sus G7 |`,

`title: One
by: U2
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 88
key: Am
form: Intro A B Intro A B C D D2
[Intro]
Am | D | Fmaj7 | G |
[A]
Am | D | Fmaj7 | G |
Am | D | Fmaj7 | G |
[B]
C | Am | Fmaj7 | C |
C | Am | Fmaj7 | C |
[C]
C | Am | C | Am |
C | G | % | F |
% |
[D]
C | Am | Fmaj7 | C |
[D2]
C | Am | Fmaj7 | C |
C |`,

`title: One Hundred Ways
by: James Ingram
genre: Pop
feel: R'n'B
source: iReal Pro community chart
tempo: 89
key: E♭
form: Intro A A2 B A2 B2 C D D
[Intro]
E♭ | A7♭5 | A♭maj7 | G7♯5 |
Cm9 | F13♯11 | B♭7sus | % |
[A]
E♭ | A7♭5 | A♭maj7 | G7♯5 |
Cm9 | F13♯11 | A♭/B♭ B♭7 | % |
E♭ | A7♭5 | A♭maj7 | D♭9 D♭9/C♭ |
E♭maj7/B♭ C13sus C7♯5 | Fm7 Gm7 A♭ A♭/B♭ | A♭add9 | E♭ A♭/B |
[A2]
E♭ | A7♭5 | A♭maj7 | G7♯5 |
Cm9 | F13♯11 | A♭/B♭ B♭7 | % |
E♭ | A7♭5 | A♭maj7 | D♭9 D♭9/C♭ |
E♭maj7/B♭ C13sus C7♯5 | Fm7 Gm7 A♭ A♭/B♭ | A♭ | E♭ |
[B]
Bmaj7 | B♭m7 | A♭m7 A♭m7/D♭ | G♭maj7 |
D♭/F | E♭m7 | A♭m7 | B♭7sus |
% |
[B2]
Bmaj7 | B♭m7 | A♭m7 A♭m7/D♭ | G♭maj7 |
D♭/F | E♭m7 | A♭m7 | B♭7sus |
% | A♭maj9 | E♭ A♭/B♭ |
[C]
E♭ | A7♭5 | A♭maj7 | G7♯5 |
Cm9 | F13♯11 | B♭7sus | % |
E♭ | A7♭5 | A♭maj7 | D♭9 D♭9/C♭ |
E♭maj7/B♭ C13sus C7♯5 | Fm Gm A♭ A♭/B♭ | A♭maj9 | E♭ Cm7 B7 |
[D]
E♭maj7/B♭ C13sus C7♯5 | Fm7 Gm7 A♭ A♭/B♭ | A♭maj9 | E♭ Cm7 B7 |`,

`title: Only the Lonely (Know the Way I Feel)
by: Roy Orbison
genre: Pop
feel: Rock'n'Roll
source: iReal Pro community chart
tempo: 116
key: F
form: Intro A B C Intro A B2
[Intro]
F | % | Gm | % |
B♭ | C7 | F | C7 |
F | F N.C. |
[A]
F | % | F | Gm |
Gm | C7 | Gm7 | C7 |
B♭ | F | % | F |
[B]
F N.C. F | F N.C. | N.C. F7 | F7 N.C. |
N.C. B♭ | B♭ N.C. | N.C. G7 | C7 N.C. |
[C]
F | F7 | B♭ | C7 |
% | F |
[B2]
F N.C. F | F N.C. | N.C. F7 | F7 N.C. |
N.C. B♭ | B♭ N.C. | N.C. G7 | C7 N.C. |
B♭ | C7 | C7 | F |
% |`,

`title: Ordinary People
by: John Legend
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 102
key: B♭
form: Intro Intro A A B B C B B D D2
[Intro]
B♭maj7 | E♭maj9 | % | Fmaj9 |
[A]
B♭maj7 | E♭maj9 | % | Fmaj9 |
B♭maj7 | E♭maj9 | % | Fmaj9 |
[B]
B♭maj7 | E♭maj9 | % | Fmaj9 |
B♭maj7 | E♭maj9 | % | Fmaj9 |
[C]
B♭m7 | E♭9 | Fmaj9 | % |
B♭m7 | E♭9 | Fmaj9 | % |
[D]
B♭maj7 | E♭maj9 | % | Fmaj9 |
[D2]
B♭maj7 | E♭maj9 | % | Fmaj9 |
Fmaj9 |`,

`title: Overjoyed
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 86
key: E♭
form: Intro A A B C D
[Intro]
D♭6 C7 | Bmaj7 C7 | D♭6 C7 | Bmaj7 B♭ |
[A]
E♭add9 | Cm7 | Fm7 | B♭ |
E♭add9 | Cm7 | F/A | G/B |
C | G/B | Cm7 F7 | B♭7 |
[B]
A♭maj7 | E♭/G | Fm7 B♭7 | D♭maj7 C7 |
B♭maj7 | F/A B♭/A♭ | Fm7 | B♭sus B♭7 |
A♭maj7 | E♭/G | Fm7 B♭7 | D♭maj7 C7 |
B♭maj7 | F/A B♭/A♭ | Fm7 | B♭sus B♭7 |
Csus | C7 |
[C]
B♭maj7 | F/A | Gm7 C7 | E♭maj7 D7 |
Cmaj7 | G/B C/B♭ | Gm7 | Csus C7 |
[D]
F | G♭maj7 | Emaj7 | F6 B♭7 |
E♭ |`,

`title: Pearls
by: Sade
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 58
key: Gm
form: Intro Intro2 A B B
[Intro]
Gm7 | F69 | E♭maj9 | D7sus D7 |
[Intro2]
Gm7 | F69 | E♭maj9 | Dm7 D7 |
[A]
Gm7 | F69 | E♭maj9 | D7sus D7 |
Gm9 Gm7 | F69 | E♭maj9 | D7sus |
[B]
Cm7 | Dm7 | Cm7 | Dm7 |
Cm7 | Dm7 | Cm7 | Dm7 D7 |
Gm7 | F69 | E♭maj9 | D7sus D7 |
Gm7 | F69 | E♭maj9 | D7sus D7 |`,

`title: Penny Lane
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 113
key: B
form: A A2 B A A2 B A A2 B2 C
[A]
B B/A♯ B/G♯ B/F♯ | E6 C♯m7 F♯7 | B B/A♯ B/G♯ B/F♯ | Bm7 |
G♯m7♭5 | Gmaj7 | F♯7sus F♯7 | % |
[A2]
B B/A♯ B/G♯ B/F♯ | E6 C♯m7 F♯7 | B B/A♯ B/G♯ B/F♯ | Bm7 |
G♯m7♭5 | Gmaj7 | F♯7sus F♯7 | E |
[B]
A | A/C♯ | D | D/A |
A | A/C♯ | D | F♯sus/C♯ F♯7 N.C. |
[B2]
A | A/C♯ | D | % |
A | A/C♯ | D | F♯sus/C♯ F♯7/A♯ F♯7 N.C. |
[C]
B | B/D♯ | E | % |
B | B/D♯ | E | E/B |
B |`,

`title: Pleasant Valley Sunday
by: The Monkees
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 170
key: A
form: Intro A A B C A A B C2 D
[Intro]
A | % | A | % |
[A]
A | % | A | % |
G/A | % |
[B]
C | F | C | F |
C | F | C | % |
[C]
E | A | D A | E |
D F♯m | Bm A | E | % |
[C2]
E | A | D A | E |
D F♯m | Bm A | E | % |
E7 | % | E7 | % |
E7 | % | E7 | % |
[D]
F | B♭ | F | B♭ |
F | B♭ | F | % |
A | % | A | % |
A | % | A | % |`,

`title: Please Send Me Someone To Love
by: Percy Mayfield
genre: Pop
feel: Blues
source: iReal Pro community chart
tempo: 71
key: G
[Intro]
G | G7 | C7 C♯°7 | D7 E♭7 D7 |
[A]
G | G7 | C | C♯°7 |
G/D C♯°7 | Am7 | D7 E♭7 | D7 |
[A2]
G | G7 | C | C♯°7 |
G/D C♯°7 | Am7 D7 | G Am7 | D7 G7 |
[B]
C6 Cm6 | G | Am7 D7♭13 | G G7 |
C6 Cm6 | G E7♭9 | Am7 | D7 |
[A3]
G | G7 | C | C♯°7 |
G/D C♯°7 | Am7 D7 | G Am7 | D7 G |
G | G7 | C7 D7 | G E♭7 D7 |
G/D C♯°7 | Am7 D7 | G | Am7 D7♯9 G |`,

`title: Poetry Man
by: Phoebe Snow
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 131
key: D
time: 2/2
form: Intro A A B C A A B C B2
[Intro]
D | Dmaj7 D7 | D6 D7 | A7sus A7 |
Am7 Em/A | Dmaj7 D7 | D6 D7 | A7sus A7 |
Am7 Em/A | Dmaj7 | % | Dmaj7 |
% |
[A]
Am7 | % | A7sus | % |
Dmaj7 D7 | D6 D7 | Dmaj7 D7 | D6 D7 |
[B]
C/D | % | Gmaj9 | % |
Dmaj7 D7 | A7sus | Dmaj7 D7 | D6 D7 |
[C]
A7sus A7 | Am7 Em/A | Dmaj7 D7 | D6 D7 |
A7sus A7 | Am7 Em/A | Dmaj7 | % |
Dmaj7 | % |
[B2]
C/D | % | Gmaj9 | % |
Dmaj7 D7 | A7sus | Dmaj7 D7 | D6 |`,

`title: Poker Face
by: Lady Gaga
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 118
key: G♯m
form: Intro Intro A A2 B A A2 B2
[Intro]
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
[A]
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
[A2]
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m N.C. |
[B]
G♯m | E5 | B | F♯/A♯ |
G♯m | E5 | B | F♯/A♯ |
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
[B2]
G♯m | E5 | B | F♯/A♯ |
G♯m | E5 | B | F♯/A♯ |
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
G♯m | G♯m E5 E5/F♯ | G♯m | G♯m E5 E5/F♯ |
G♯m | E5 | B | F♯/A♯ |
G♯m | E5 | B | F♯/A♯ |
G♯m | E5 | B | F♯/A♯ |
G♯m | E5 | B | F♯/A♯ |
G♯m N.C. |`,

`title: Put your records on
by: Corinne Bailey Rae
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 98
key: A
form: Intro A A B C C2 D C C3
[Intro]
A | F♯m/D♯ | E13sus |
[A]
A | F♯m6 | E13sus | A |
[B]
F♯m | D♭7/F | F♯m7 | B9 |
Dmaj7 | % | Dm(maj7) | % |
[C]
A | F♯m6 | E13sus | A |
[C2]
A | F♯m6 | E13sus | A |
Dmaj7 | Dm(maj7) | A |
[D]
Bm7 | % | F♯m7 | % |
Bm7 | Bm7 Bm7/D♭ | Dmaj7 Bm7 | D69 |
[C3]
A | F♯m6 | E13sus | A |
Dmaj7 | Dm(maj7) | Amaj7 |`,

`title: Rainbow Connection, The
by: P. Williams, K. Ascher
genre: Pop
feel: Waltz
source: iReal Pro community chart
tempo: 118
key: A
time: 3/4
[Intro]
A | D/A | A | D/A |
[A]
A | F♯m7 | Bm11 | E7sus |
A | F♯m7 | Dadd9 | E9sus |
[A2]
A | F♯m7 | Bm11 | E7sus |
A | F♯m7 | Dadd9 | Dadd9 |
[B]
Dmaj7 | % | Dmaj7 | % |
C♯m7 | % | F♯9sus | % |
Bm7 | E7 | C♯m7 | F♯7 |
Bm7 | E13 | A | E/G♯ |
F♯m7 | F♯m7/E | Dmaj9 | C♯m7 |
E7sus | F7sus | % |
[C]
B♭ | Gm7 | Cm11 | F7sus |
B♭ | Gm7 | E♭add9 | F9sus |
[C2]
B♭ | Gm7 | Cm11 | F7sus |
B♭ | Gm7 | E♭add9 |
[D]
E♭maj7 | % | E♭maj7 | % |
Dm7 | % | Dm7 | % |
Cm7 | F7 | Dm7 | G7 |
Cm7 | F13 | B♭ | F/A |
Gm7 | Gm7/F | E♭maj7 | F7sus F7 |
B♭ |`,

`title: Rehab
by: Amy Winehouse
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 138
key: C
form: A B C A B C A2 A2 A2 A3
[A]
C7 | % | C7 | % |
C7 | % | C7 | % |
G7 | % | F7 | % |
C7 | F7 | C7 | % |
[B]
Em7 | % | Am7 | % |
F | % | A♭ | % |
Em7 | % | Am7 | % |
F | % | A♭ | % |
[C]
G7 | % | G7 | % |
F7 | % | F7 | % |
[A2]
C7 | % | C7 | % |
[A3]
C7 | % | C7 | % |
G7 | % | F7 | % |
C7 | F7 | C7 | % |`,

`title: River
by: Joni Mitchell
genre: Pop
feel: Folk
source: iReal Pro community chart
tempo: 105
key: C
form: Intro A B A B2
[Intro]
C | Cmaj7 | Am | Am9 |
Fmaj7 | Fmaj9 | G7 C/G | G7 Gsus G |
[A]
G/C C | % | G/C C | % |
Am9 | % | G | % |
G/C C | % | G/C C | % |
Am9 | % | G | % |
[B]
F | G | C | F Em |
Dm Em/D | F/D G/D | C | G |
Fmaj7 | % | Fmaj7♯11 | G/C |
C | Am9 | % | G Gsus |
G |
[B2]
F | G | C | F Em |
Dm Em/D | F/D G/D | Em/D | Dm |
C | G | Fmaj7 | % |
Fmaj7♯11 | C | % | Am9 |
% | Gadd9 | Gsus G | G |
% | G | % | G G7 |
Gsus | F | G/F F | F |
% | Dm | % | Dm |
% | Dm | % |`,

`title: Rocket Love
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 79
key: G♯m
form: Intro Intro A B A B2 C D D2
[Intro]
C♯m6 | E13♯11 | B/A | F♯/G♯ |
C♯m6 | D♯7♭9sus D♯7♭9 | G♯m E/G♯ G♯m6 E/G♯ | G♯m E/G♯ G♯m6 |
[A]
G♯m E/G♯ G♯m6 E/G♯ | G♯m E/G♯ G♯m6 E/G♯ | F♯7sus | F♯7sus D♯7 |
G♯m E/G♯ G♯m6 E/G♯ | G♯m E/G♯ G♯m6 E/G♯ | F♯7sus | % |
[B]
Emaj9 | % | D♯m7♭5 | G♯7sus |
Emaj9 | % | D♯m7♭5 | G♯7sus |
G♯m E/G♯ G♯m6 E/G♯ | G♯m E/G♯ G♯m6 E/G♯ |
[B2]
Emaj9 | % | D♯m7♭5 | G♯7sus |
Emaj9 | % | D♯m7♭5 | G♯7sus |
C♯m6 | E13♯11 | B/A | F♯/G♯ |
C♯m6 | D♯7♭9 E+ |
[C]
Am F/A Am6 F/A | Am F/A Am6 F/A | G7sus | G7sus E7 |
Am F/A Am6 F/A | Am F/A Am6 F/A | G7sus | % |
[D]
Fmaj9 | % | Em7♭5 | A7sus |
[D2]
Fmaj9 | % | Em7♭5 | A7sus |
Fmaj9 |`,

`title: Rocket Man
by: Elton John
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 72
key: Gm
form: A A2 B B A3 A3 B B C C
[A]
Gm7 | C9 | Gm7 | C9 |
E♭ B♭/D | Cm Cm/B♭ | F/A | % |
[A2]
Gm7 | C9 | Gm7 | C9 |
E♭ B♭/D | Cm Cm/B♭ | F/A F/C | F7 Cm7/F |
[B]
B♭ B♭/D | E♭add9 E♭/G E♭/B♭ | B♭ B♭/D | E♭ B♭/D |
C7 B♭/D | E♭ | B♭ B♭sus B♭ | E♭ |
[A3]
Gm7 | C9 | Gm7 | C9 |
E♭ B♭/D | Cm Cm/B♭ | F/A F/C | F |
[C]
B♭ B♭/D B♭/F | E♭ E♭/G E♭/B♭ | B♭ B♭/D B♭/F | E♭ E♭/G E♭/B♭ |`,

`title: The Rose
by: Bette Midler
genre: Pop
feel: Country Ballad
source: iReal Pro community chart
tempo: 70
key: C
form: Intro A B C A2 B2 C2 A2 B3 C3
[Intro]
C5 | % |
[A]
C5 | G/B | F/A G | C5 |
C5 | G/B | F/A G | C5 |
[B]
Cmaj7/B | C/A | F | Gsus G |
[C]
C | G/B | F/A G | Cadd9 |
% |
[A2]
Cadd9 | G | F G | Cadd9 |
Cadd9 | G | F G | Cadd9 |
[B2]
Cmaj7/B | Am7 | F6 | G |
[C2]
Cadd9 | G | F G | Cadd9 |
Cadd9 |
[B3]
Em | Am9 | F | G |
[C3]
Cadd9 | G | F G | Cadd9 |
% | Cadd9 | % |`,

`title: Roxanne
by: The Police
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 132
key: Gm
form: Intro A A B B2 C
[Intro]
Gm | % | Gm | Dm/F |
E♭maj7 | Dm | Cm | Fsus |
Gsus | % |
[A]
Gm | Dm/F | E♭maj7 | Dm |
Cm | Fsus | Gsus | % |
[B]
Cm | Fsus | Gsus | % |
[B2]
Cm | Fsus | Gsus | G7sus C5 B♭ |
[C]
B♭5 | E♭ F | F5 | F Gm |
Gm | C5 B♭ | B♭5 | E♭ F |
F5 | Fsus Gsus | Gsus | % |
Gm | Gm/F | Gm | Gm/F |
B♭5 | E♭ F | F5 | F Gm |
Gm | C5 B♭ | B♭5 | E♭ F |
F5 | F Gm | Gm | C5 B♭ |`,

`title: Santeria
by: Sublime
genre: Pop
feel: Reggae
source: iReal Pro community chart
tempo: 90
key: E
form: Intro A B A B2
[Intro]
E | A♭ | C♯m7 | B |
[A]
E | A♭ | C♯m7 | B |
E | A♭ | C♯m7 | B |
[B]
A B | E D♯m7 C♯m7 | A B | E D♯m7 C♯m7 |
A B | E D♯m7 C♯m7 | A B |
[B2]
A B | E D♯m7 C♯m7 | A B | E D♯m7 C♯m7 |
A B | E D♯m7 C♯m7 | A B | E5 D♯5 C♯5 B5 |
A5 B5 E7 |`,

`title: Saturday In The Park
by: Chicago
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 114
key: C
form: Intro Intro A B A B2
[Intro]
Am7 Am11 | D9 D7 | G13sus G7sus | C6 |
[A]
Am7 | D7 | Fmaj7/G | C6 |
Am7 | D7 | Fmaj7/G | C6 |
Bm7 | Em9 | Dmaj9 | % |
C | Dsus D7 |
[B]
G | F/G | C/G | G |
Am7 | % | D7 | % |
G | % | C | % |
[B2]
G | F/G | C/G | G |
Am7 | % | D7 | % |
B♭/C | % | B♭/C | % |
D♭/E♭ | % | D♭/E♭ | % |
F/G | % | F/G | % |
Am7 | D7 | Fmaj7/G | C6 |
Am7 | D7 | Fmaj7/G | C6 |
G | % | C | % |
C | % |`,

`title: Save Me
by: Queen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 88
key: C
form: A B A B2 B3
[A]
G D/F♯ | Em7 G | C G/B | Am |
C D Dsus | G C | G C/G | D |
Am G | C | Am C G | D |
C D Dsus | G C | G/B C | G |
[B]
D A/C♯ | Gadd9/B D | D E | A G |
D A/C♯ | D/C G/B Gm/B♭ | D C G | D |
[B2]
D A/C♯ | Gadd9/B D | D E | A G |
D A/C♯ | D/C G/B Gm/B♭ | D C G | Am |
% | C D Dsus | G C | G/B C |
G |
[B3]
D A/C♯ | Gadd9/B D | D E | A G |
D A/C♯ | D/C G/B Gm/B♭ | D C G | D G |
D A/C♯ | D/C G/B Gm/B♭ | D C G | D |
C/D G Dadd9 |`,

`title: Saving All My Love For You
by: Whitney Houston
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 69
key: A
form: Intro A B A B2 C A B2 C2
[Intro]
Amaj7 F♯m7 | Bm7 Esus | Amaj7 F♯m7 | Bm7 Esus |
[A]
Amaj7 F♯m7 | Bm7 Esus | Amaj7 F♯m7 | Bm7 Esus |
[B]
F♯m7 B/F♯ | F♯m7 B/F♯ | A A/G♯ F♯m7 F♯m7/E | G♯m7 C♯7 |
Dmaj7 C♯m7 Bm7 Esus | Amaj7 F♯m7 | Bm7 Esus |
[B2]
F♯m7 B/F♯ | F♯m7 B/F♯ | A A/G♯ F♯m7 F♯m7/E | G♯m7 C♯7 |
Dmaj7 C♯m7 Bm7 Esus | Amaj7 |
[C]
G♯7 C♯7♭9 | F♯m7 | Bm7 Esus | Amaj7 |
D♯m7 G♯7 | C♯maj7 | F♯m7 Bsus | Esus |
[C2]
G♯7 C♯7♭9 | F♯m7 | Bm7 Esus | Amaj7 |
D♯m7 G♯7 | C♯maj7 | F♯m7 Bsus | Esus |
Dmaj7 C♯m7 Bm7 | Dmaj7 C♯m7 Bm7 Esus | Dmaj7 C♯m7 Bm7 | Dmaj7 C♯m7 Bm7 Esus |
Amaj7 F♯m7 | Bm7 Esus | Amaj7 F♯m7 | Bm7 Esus |`,

`title: Scarborough Fair
by: Simon and Garfunkel
genre: Pop
feel: Folk-Rock
source: iReal Pro community chart
tempo: 118
key: Em
time: 3/4
form: Intro A A
[Intro]
E13sus | E13sus/A | Gmaj7 Gmaj7/F♯ | E13sus |
E2 | E13sus | E2 |
[A]
E13sus | E2 | D | E13sus |
E2 | Gmaj7 G | Em7 | G A |
E13sus | E2 | E13sus | E2 |
Em | Gmaj7 G | G D/F♯ Em | D |
% | Em7 | D | % |
E13sus | E2 | E13sus | E2 |`,

`title: Seven Days
by: Sting
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 170
key: C
time: 5/4
form: Intro A A B C C2 B2
[Intro]
Cmaj9 | C69 | % | C69 |
C69 | Cmaj9 | C69 | Cmaj9 |
[A]
C69 | Cmaj9 | F/E♭ | B♭69 |
G | % | F | Fadd9 |
C69 | Cmaj9 | F/E♭ | B♭69 |
G | % | E | % |
[B]
Fmaj7 | F♯m7♭5 | G | E7/G♯ |
Am7 | F6 | G | E7/G♯ |
Am7 | B♭7♯11 | Am7 | B♭7♯11 |
Am7 | Fm6 | C69 | Cmaj9 |
C69 | Cmaj9 |
[C]
B♭7♯11 | % | Cmaj9 | % |
[C2]
B♭7♯11 | % | Cmaj9 | % |
B♭7♯11 | % | Fmaj7 | % |
B♭7♯11 | % | Cmaj9 | % |
B♭7♯11 | % | Cmaj9 | % |
Cmaj9 | % |
[B2]
Fmaj7 | F♯m7♭5 | G | E7/G♯ |
Am7 | F6 | G | E7/G♯ |
Am7 | B♭7♯11 | Am7 | B♭7♯11 |
Am7 | Fm6 | Cmaj9 | % |
B♭7♯11 | % | Cmaj9 | % |
B♭7♯11 | % | Cmaj9 |`,

`title: Sexy Sadie
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 80
key: G
form: Intro A A B A2 A2
[Intro]
Dsus | C D Dsus | G F♯ | F D D7 |
[A]
G F♯ | Bm | C D Dsus | G F♯ |
C D | G F♯ | F D7 |
[B]
G G7 Am7 | Bm7 Cmaj7 | G G7 Am7 | Bm7 C C7 |
A7 A♭7 |
[A2]
G F♯ | Bm | C D | G F♯ |
C D | G F♯ | F D7 |`,

`title: The Shoop Shoop Song (It's in His Kiss)
by: Betty Everett
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 117
key: D
[Intro]
A7 N.C. A7 | G7 N.C. G | A7 N.C. A7 | A7 N.C. |
[A]
Em7 A7 | % | Em7 A7 | % |
D Bm7 | Em7 A7 | D G | A7 |
[A2]
Em7 A7 | % | Em7 A7 | % |
D Bm7 | Em7 A7 | D G | A7 |
D G | D E F |
[B]
F♯7 | % | Bm | % |
E7 | % | A7 N.C. | N.C. |
[A3]
Em7 A7 | % | Em7 A7 | % |
D Bm7 | Em7 A7 | D G | A7 |
D G | A7 |
[C]
Em7 A7 | % | D D/A | % |
[C2]
Em7 A7 | % | D N.C. | N.C. D E F |
D G | A7 | D G | A7 |`,

`title: Shout
by: The Isley Brothers
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 132
key: F
form: A A B B C C A A2 D
[A]
F | Dm | F | Dm |
F | Dm | F | Dm |
[B]
F | % | Dm | % |
F | % | Dm | % |
[C]
F7 F7/G F7/A F7/B♭ | F7/C F7/B♭ F7/A F7/G | F7 F7/G F7/A F7/B♭ | F7/C F7/B♭ F7/A F7/G |
F7 F7/G F7/A F7/B♭ | F7/C F7/B♭ F7/A F7/G | F7 F7/G F7/A F7/B♭ | F7/C F7/B♭ F7/A F7/G |
[A2]
F | Dm | F | Dm |
F | Dm | F N.C. | N.C. |
[D]
F7 | B♭/F | F7 | B♭7 |
F | Dm | F | Dm |
F | Dm | F | Dm |
F N.C. |`,

`title: Sister Moon
by: Sting
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 69
key: F♯m
form: Intro A B A B C
[Intro]
F♯m(maj7)9 B13 | % | F♯m(maj7)9 B13 | % |
[A]
F♯m(maj7)9 B13 | % | F♯m(maj7)9 B13 | % |
F♯m(maj7)9 B13 | % | F♯m(maj7)9 B13 | F♯m(maj7)9 B13 B13/C |
[B]
C♯7 D7 | D♯m7♭5 F♯m7/E C♯7/F | D♯m7♭5 E/G♯ F♯m/C♯ C♯sus | F♯m(maj7)9 B13 |
D♯m7♭5 E/G♯ F♯m/C♯ C♯7sus | F♯m(maj7)9 B13 | % | F♯m(maj7)9 B13 |
% |
[C]
B♭m B♭m(maj7) | B♭m7 B♭m6 | B♭m B♭m(maj7) | B♭m7 B♭m6 |
E♭m7 Fm7 | G♭maj7 B13 | D♯m7♭5 E/G♯ F♯m/C♯ C♯7sus | D♯m7♭5 G♯7 |
Dmaj7 E/G♯ F♯m/C♯ C♯7sus | F♯m(maj7)9 B13 | F♯m(maj7)9 B13 | % |
F♯m(maj7)9 B13 | % |`,

`title: So Amazing
by: Luther Vandross
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 67
key: B
form: Intro A A B C
[Intro]
B6/D♯ B6/E | % | B6/D♯ B6/E | C♯/D♯ |
[A]
B G♯m7 | D♯m7 Emaj7 | D♯m7 C♯m7 | E/F♯ |
B G♯m7 | D♯m7 Emaj7 | D♯m7 C♯m7 | E/F♯ |
Emaj7 F♯7 E/F♯ | B G♯m7 | D♯m7 Emaj7 | D♯m7 C♯m7 |
C♯/D♯ |
[B]
D♯m7 Emaj9 | D♯m7 C♯m7 E/F♯ | Emaj9 D♯m7 | D♯m7 E C♯/D♯ |
D♯m7 Emaj9 | D♯m7 C♯m7 E/F♯ | Emaj9 D♯m7 | D♯m7 E C♯/D♯ |
[C]
D♭ B♭m7 | Fm7 G♭maj7 | Fm7 E♭m7 | G♭/A♭ |
G♭maj9 G♭/A♭ | D♭ B♭m7 | Fm7 G♭maj7 | G♭/A♭ |
G♭maj9 G♭/A♭ | D♭ B♭m7 | Fm7 G♭maj7 | G♭/A♭ |`,

`title: Somebody To Love
by: Queen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 73
key: A♭
time: 6/8
[Intro]
A♭ E♭/G Fm D♭ | E♭7sus | D♭ E♭ | A♭ |
A♭ E♭/G | Fm | D♭ | E♭ |
[A]
A♭ E♭/G | Fm | A♭ B♭ | E♭ |
A♭ E♭/G | Fm | B♭7 | E♭7 |
A♭ B♭7 | E♭ | E♭ B♭7 | E♭ D♭ |
A♭ | % | A♭ E♭/G | Fm D♭ |
E♭sus | A♭ | A♭/G | Fm7 |
D♭ | E♭ |
[A2]
A♭ E♭/G | Fm | A♭ B♭ | E♭ |
A♭ E♭/G | Fm | B♭7 | E♭7 |
A♭ B♭7 | E♭ | E♭ B♭7 | E♭ D♭ |
A♭ | % | A♭ E♭/G | Fm D♭ |
E♭sus |
[B]
A♭ | % | A♭7 | % |
D♭ | % | D♭7 | % |
G♭ | % | G♭m | B♭7 |
% | B♭7 | % | E♭ |
E♭ | E♭7 |
[A3]
A♭ E♭/G | Fm | A♭ B♭ | E♭ |
A♭ E♭/G | Fm | B♭7 | E♭7 |
A♭ B♭ | E♭ | E♭ B♭7 | E♭ D♭ |
A♭ | % | A♭ E♭/G | Fm D♭ |
E♭sus | A♭ | A♭/G | Fm7 |
D♭ | E♭ |
[A4]
A♭ E♭/G | Fm | A♭ B♭ | E♭ |
A♭ E♭/G | Fm | B♭7 | E♭7 |
A♭ B♭ | E♭ | E♭ B♭7 | E♭ D♭ |
D♭ | A♭ | A♭ | A♭ E♭/G |
Fm D♭ | E♭ | A♭ | A♭/G |
Fm7 | D♭ E♭ | A♭ | A♭/G |
Fm7 | D♭ E♭ | A♭ |`,

`title: Something
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 70
key: C
form: Intro A B A B2 C A B3
[Intro]
F E♭ G7/D |
[A]
C | Cmaj7 | C7 | F F/E |
D7 | G7 G7/A G7/B |
[B]
Am Am(maj7) | Am7/G D9 | F E♭ G7/D |
[B2]
Am Am(maj7) | Am7/G D9 | F E♭ G7/D | A |
[C]
A A/G♯ | A/F♯ A/E | D G | A |
A A/G♯ | A/F♯ A/E | D G | C |
[B3]
Am Am(maj7) | Am7/G D9 | F E♭ G7/D | A |
F E♭ G7/D | C |`,

`title: A Song For You
by: Leon Russell
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 63
key: Dm
[A]
Dm | A7/C♯ | F/C | Bm7♭5 |
B♭ Am7 | Gm7 Am7 | B♭ Am7 | B♭/C F F/E |
[A2]
Dm | A7/C♯ | F/C | Bm7♭5 |
B♭ Am7 | Gm7 Am7 | B♭ Am7 | B♭/C F |
[B]
Dm A7♯5/C♯ | F6/C Bm7♭5 | B♭ F/C C7 | B♭/F F F/E |
Dm A7♯5/C♯ | F6/C Bm7♭5 | B♭ Am11 | G7 B♭/C C7 |
[A3]
Dm | A7/C♯ | F/C | Bm7♭5 |
B♭ Am7 | Gm7 F/A Am | B♭ C6 | B♭/C F |
F/E♭ | % | B♭/D | Am7♭5 D7 |
Gm9 | Em7♭5 A7♯11 | B♭ Am/C | B♭/C F |
B♭ Am | E♭ | B♭ | B♭/F |
F | C |`,

`title: The Sound of Silence
by: Simon and Garfunkel
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 103
key: E♭m
form: Intro A A A2 A3
[Intro]
E♭m9 | % |
[A]
D♭ | % | E♭m9 | E♭m9 G♭ |
B | G♭ | G♭ B | G♭ |
B | B | G♭ | G♭ E♭m |
G♭ | D♭ | E♭m9 | % |
[A2]
D♭ | % | E♭m | % |
B | G♭ | G♭ B | G♭ |
G♭ | B | % | G♭ |
G♭ E♭m | G♭ | D♭ | E♭m |
% |
[A3]
D♭ | % | E♭m | % |
B | G♭ | G♭ B | G♭ |
B | % | G♭ | G♭ E♭m |
G♭ | D♭ | E♭m | % |
G♭ | D♭ | E♭m9 | E♭m |`,

`title: Summer In The City
by: The Lovin' Spoonful
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 107
key: Cm
form: Intro A B A B C C2 B2 B2
[Intro]
A♭ G | % | A♭ G |
[A]
Cm Cm7/B♭ | Cm/A Cm/A♭ G7 | Cm Cm7/B♭ | Cm/A Cm/A♭ G7 |
G G7/B | Cm C | C |
[B]
F B♭ | % | F B♭ | % |
Dm G | % | Dm G | % |
[C]
Cm | C° | Cm | C° |
C° | Cm Cm7/B♭ | Cm/A Cm/A♭ G7 | Cm Cm7/B♭ |
Cm/A Cm/A♭ G7 |
[C2]
Cm | C° | Cm | C° |
C° | Cm Cm7/B♭ | Cm/A Cm/A♭ G7 | Cm Cm7/B♭ |
Cm/A Cm/A♭ G7 | Cm Cm7/B♭ | Cm/A Cm/A♭ G7 | Cm Cm7/B♭ |
Cm/A Cm/A♭ G7 | G G7/B | Cm C | C |
[B2]
F B♭ | % | F B♭ | % |`,

`title: Summer Of '69
by: Bryan Adams
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 135
key: D
form: Intro A A B A B2 C
[Intro]
D5 | % |
[A]
Dadd9 | % | Aadd9 | % |
Dadd9 | % | Aadd9 | % |
[B]
Bm | A | D | G |
Bm | A | D | G |
Bm | A | Dadd9 D | Dsus D |
Aadd9 A | Asus A |
[B2]
Bm | A | D | G |
Bm | A | D | G |
Bm | A | Dadd9 D | Dsus D |
Aadd9 A | Asus A | Dadd9 D | Dsus D |
Aadd9 A | Asus A |
[C]
F | B♭ | C | B♭/D |
F | B♭ | C | Dadd9 D |
Dsus D | Aadd9 A | Asus A | Dadd9 D |
Dsus D | Aadd9 A | Asus A | Dadd9 D |
Dsus D | Aadd9 A | Asus A | Dadd9 D |
Dsus D | Aadd9 A | Asus A |`,

`title: The Sunshine Of Your Love
by: Cream
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 105
key: D
form: Intro Intro A B C A B C2 A B C3
[Intro]
D C D | D | D C D | D |
[A]
D C D | D | D C D | D |
D C D | D | D C D | D |
[B]
G F G | G | G F G | G |
D C D | D | D C D | D |
[C]
A | C G | A | C G |
A | C G | A | % |
D C D | D |
[C2]
A | C G | A | C G |
A | C G | A | % |
[C3]
A | C G | A | C G |
A | C G | A | % |
A | % | D C D | D |
C G | A | C G | A |
A | % | A | % |`,

`title: Superstar
by: The Carpenters
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 89
key: D♭
form: Intro A A B C
[Intro]
Fm9 | Fm/E♭ | D♭ | A♭/C |
B♭7 | D♭6 D♭ | Cm11 Cm | Fm |
% |
[A]
Fm9 | Fm/E♭ | D♭ | A♭/C |
B♭7 | D♭ | Cm7 | % |
[B]
D♭ Cm B♭m | A♭ | D♭ Cm B♭m | A♭ |
D♭ Cm B♭m | A♭ | G♭ | D♭maj7 |
A♭ |
[C]
D♭ Cm B♭m | A♭ | D♭ Cm B♭m | A♭ |
D♭ Cm B♭m | A♭ | G♭ | D♭maj7 |
Cm7 |`,

`title: Surfin' USA
by: The Beach Boys
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 160
key: E♭
form: Intro A B A B C D D
[Intro]
E♭7 E♭sus | E♭ N.C. |
[A]
B♭7 | B♭7 N.C. | E♭ E♭6 E♭7 | E♭ N.C. |
B♭7 | B♭7 N.C. | E♭ E♭6 E♭7 | E♭ N.C. |
A♭ | A♭ N.C. | E♭ E♭6 E♭7 | E♭ N.C. |
B♭7 | B♭7 N.C. | E♭ E♭6 E♭7 | E♭ N.C. |
[B]
B♭7 | % | E♭ E♭6 E♭7 | % |
B♭7 | % | E♭ E♭6 E♭7 | % |
A♭ | % | E♭ E♭6 E♭7 | % |
B♭7 | A♭ N.C. | E♭ | % |
[C]
B♭7 | % | E♭ | % |
B♭7 | % | E♭ | % |
A♭ | % | E♭ | % |
B♭7 | A♭ N.C. | E♭ | E♭ N.C. |
[D]
B♭7 | A♭ N.C. | E♭ E♭6 E♭7 | % |`,

`title: Sweet Caroline
by: Neil Diamond
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 123
key: B
form: Intro Intro2 A A B C C2 C C
[Intro]
F♯7 | % | F♯7 |
[Intro2]
F♯7 | % | F♯7 | F♯7 |
[A]
B | % | E | % |
B | % | F♯ | % |
[B]
B | % | B6 | % |
F♯7 | % | E | % |
F♯ |
[C]
B | E | % | E |
F♯7 | % |
[C2]
B | E | % | E |
F♯ E | D♯m7 C♯m7 | F♯ | % |
F♯7 | F♯ | % | F♯7 |
F♯7 |`,

`title: Sweet Love
by: Anita Baker
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 93
key: B♭
form: Intro A B A B C
[Intro]
B♭maj7 | G♭maj7 | E♭m9 | A♭11 F11 |
B♭maj7 | G♭maj7 | E♭m9 | A♭11 F11 |
[A]
B♭maj7 | E♭m9 | G♭maj7 | Fm7 A♭11 F11 |
B♭maj7 | E♭m9 | G♭maj7 | A♭11 F11 |
[B]
B♭maj7 | E♭m9 | G♭maj7 E♭m9 | A♭11 F11 |
B♭maj7 | E♭m9 | E♭m9 | A♭11 F11 |
[C]
E♭m9 | B♭11 B♭7 | E♭m9 | B♭11 B♭7 |
E♭m9 | B♭11 B♭7 | Bmaj7 B♭m7 | F11 |
B♭maj7 | E♭m9 | G♭maj7 E♭m9 | A♭11 F11 |
B♭maj7 | E♭m9 | E♭m9 | A♭11 F11 |
B♭maj7 | E♭m9 | G♭maj7 E♭m9 | A♭11 F11 |
B♭maj7 | E♭m9 | E♭m9 | A♭11 F11 |`,

`title: Tears In Heaven
by: Eric Clapton
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 80
key: A
form: Intro A B A B C
[Intro]
A E/G♯ | F♯m F♯m/E | D/F♯ Esus E7 | A |
[A]
A E/G♯ | F♯m F♯m/E | D/F♯ A/E | E E6 E7 |
A E/G♯ | F♯m F♯m/E | D/F♯ A/E | E E6 E7 |
[B]
F♯m | C♯/F | A7/E | F♯7 F♯7/G♯ F♯7/B |
Bm | Esus | A E/G♯ | F♯m F♯m/E |
D/F♯ D/E E7 | A |
[C]
C G/B | Am D/F♯ | G D/F♯ | Em D/F♯ G |
C G/B | Am D/F♯ | G D/F♯ | E E6 E7 |`,

`title: That's What Friends Are For
by: Dionne Warwick and Friends
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 66
key: E♭
form: Intro A B A B B B2
[Intro]
E♭add9 B♭6/D B♭/D | A♭add9/C | Gm7 Cm7 | Fm7 Fm7/B♭ |
[A]
E♭add9 Gm7 Cm | Fm7 | Dm7♭5 Gsus G7 | Cm7 A♭add9 |
Fm7/B♭ | E♭ Gm7 Cm | Fm7 | Dm7♭5 Gsus G7 |
Cm7 A♭maj9 | Fm7/B♭ |
[B]
E♭add9 B♭/D | A♭/C B♭/A♭ | Gm7 Cm7 | A♭maj9 Fm7/B♭ |
E♭add9 B♭/D | E♭/D♭ Csus C7 | Fm7♭5/B | A♭/B♭ |
% |
[B2]
E♭add9 B♭/D | A♭/C B♭/A♭ | Gm7 Cm7 | A♭maj9 Fm7/B♭ |
E♭add9 B♭/D | E♭/D♭ Csus C7 | Fm7♭5/B | A♭/B♭ |
% | E♭add9 B♭6/D B♭/D | A♭add9/C | Gm7 Cm7 |
Fm7 Fm7/B♭ | E♭add9 B♭6/D B♭/D | A♭add9/C | Gm7 Cm7 |
Fm7 Fm7/B♭ |`,

`title: Time After Time (Cyndi Lauper)
by: Cyndi Lauper
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 127
key: C
form: Intro Intro A B A B2 C C C C B2 C2 C3
[Intro]
F | G | Em | F |
[A]
Dm/C C | Dm/C C | Dm/C C | Dm/C C |
Dm/C C | Dm/C C | Dm/C C | Dm/C C |
[B]
F G | Em F | F G | Em |
F G | Em F | F Gsus |
[B2]
F G | Em F | F G | Em |
F G | Em F |
[C]
G | Am | F Gsus | C |
G | Am | F Gsus | C |
[C2]
Gsus | Am | F Gsus | C |
[C3]
Gsus | Am | F Gsus | C |
F Gsus | C | F Gsus | C |`,

`title: To Love Somebody
by: Bee Gees
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 93
key: A
form: Intro A A B Intro A A B2 B2 B2
[Intro]
A G | D A | A | % |
[A]
A | Bm | D | A |
G | A | E | D7 |
[B]
A | E | D | A N.C. |
E | D | A |
[B2]
A | E | D | A N.C. |
E | D | A | E |`,

`title: To Make You Feel My Love
by: Bob Dylan
genre: Pop
feel: Folk Ballad
source: iReal Pro community chart
tempo: 70
key: D♭
form: A A B A A B2 A A
[A]
D♭ | A♭/C | C♭6 | G♭/B♭ |
G♭m | D♭ | E♭9 A♭7sus | D♭ |
[B]
G♭ | D♭/A♭ | A+ B♭m | D♭ |
G♭ | D♭ | E♭m7 | A♭ |
[B2]
G♭ | D♭ | F7♯5 G♭ | D♭ |
G♭ | D♭ | E♭m7 | A♭7sus |`,

`title: Too Shy To Say
by: Stevie Wonder
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 65
key: D
form: Intro A B A B2
[Intro]
E | E+ | A G♭m | E D D♭7 |
C | A/B |
[A]
Eadd9 | E+ | Amaj7 A♭m7 | G♭m7 A/B |
Eadd9 | E+ | Amaj7 A♭m7 | G♭m7 |
[B]
Dmaj9 D69 | D♭7♭9 D♭7 | Cmaj7 C6 | B7♭9 B7 |
B♭maj7 B♭6 | A7 | Dadd9 | G♭m7 B7 |
[B2]
Dmaj9 D69 | D♭7♭9 D♭7 | Cmaj7 C6 | B7♭9 B7 |
B♭maj7 B♭6 | A7 | Dadd9 | D6 |
G♭m7 | G | D |`,

`title: Top Of The World
by: The Carpenters
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 180
key: B♭
form: Intro A A B
[Intro]
B♭ | % | E♭ | % |
B♭ | F7 | B♭ | % |
B♭ E♭ | B♭ E♭ | B♭ E♭ | B♭ F7 |
[A]
B♭ | F7 E♭ | B♭ | % |
Dm | Cm F7 | B♭ | % |
E♭ | F7 | Dm | G7 |
Cm | Cm7♭5 | F7 | % |
[B]
B♭ | B♭/C B♭/D | E♭ | % |
B♭ | Cm F7 | B♭ | % |
E♭ | F7 | B♭ | E♭ |
B♭ | Cm F7 | B♭ | % |
B♭ E♭ | B♭ E♭ | B♭ E♭ | B♭ F7 |
B♭ | B♭/C B♭/D | E♭ | % |
B♭ | Cm F7 | B♭ | % |
E♭ | F7 | B♭ | E♭ |
B♭ | Cm F7 | B♭ | % |
B♭ E♭ | B♭ E♭ | B♭ E♭ | B♭ |`,

`title: Twist and Shout
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 110
key: D
form: Intro A A B B C A A2
[Intro]
D G | A7 | D G | A7 |
[A]
D G | A7 | D G | A7 |
[B]
D G | A | D G | A |
[C]
A7 | % | A7 | % |
A7 | % |
[A2]
D G | A7 | D G | A7 |
D G | A | A7 | % |
A7 | % | D D7 |`,

`title: Umbrella
by: Rihanna
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 89
key: G♭
form: Intro A B C A B C D
[Intro]
N.C. | % | N.C. | % |
G♭maj7 | D♭/A♭ | F7♭13sus | B♭m |
G♭maj7 | D♭/A♭ | F7♭13sus | B♭m |
[A]
G♭maj7 | D♭/A♭ | F7♭13sus | B♭m |
G♭maj7 | D♭/A♭ | F7♭13sus | B♭m |
[B]
G♭maj7 | D♭ | A♭ | B♭m |
G♭maj7 | D♭ | A♭ | B♭m |
[C]
G♭maj7 | D♭/A♭ | F7♭13sus | B♭m |
G♭maj7 | D♭/A♭ | F7♭13sus | B♭m |
[D]
B | G♭ | D♭sus D♭ | D♭ |
B | G♭ | F | % |
G♭maj7 | D♭ | A♭ | B♭m |
G♭maj7 | D♭ | A♭ | B♭m |`,

`title: Un-Break My Heart
by: Toni Braxton
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 61
key: Bm
form: Intro A B A B2 C
[Intro]
N.C. F♯7 | Bm Gmaj7/E | A F♯7 | A/G |
F♯7 |
[A]
Bm Gmaj7/E | A | Bm Gmaj7/E | A F♯7 |
Bm Gmaj7/E | A | Bm Gmaj7/E | A |
[B]
Dm Gm | C A7 | Dm Gm | C A7 |
Dm Gm | C A7 | C/B♭ B♭ | A F♯7 |
[B2]
Dm Gm | C A7 | Dm Gm | C A7 |
Dm Gm | C A7 | C/B♭ B♭ | E♭ |
[C]
A♭m D♭m | G♭ E♭ | A♭m D♭m | G♭ |
Dm Gm | C A7 | Dm Gm | C A7 |`,

`title: Unchained Melody
by: The Righteous Brothers
genre: Pop
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
time: 1/2
form: A A B C
[A]
C | Am | F | G |
C | Am | G | % |
[B]
C | G | Am | Em |
F | G | C | C7 |
[C]
F G | F E♭ | F G | C |
F G | F E♭ | F G | C |
C | Am | F Fm | C |`,

`title: Uninvited
by: Alanis Morissette
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 68
key: D
form: Intro A A2 A3 B A3 B2 C
[Intro]
D5 | % |
[A]
D5 | % | Gm/D | D5 |
[A2]
D5 | % | Gm/D | D5 |
D7 | G | D5 | % |
D5 Gm/D D5 | % |
[A3]
D5 Gm/D D5 | % | Gm | D Gm/D D5 |
D5 Gm/D D5 | % | Gm | D Gm/D D5 |
[B]
D7 | G | D5 | Dmaj7 |
D5 | % | D5 | % |
[B2]
D7 | G | D5 | Dmaj7 |
D5 | % | D5 | % |
D5 |
[C]
D5 | % | Gm/D | D5 |
D5 Gm/D D5 | % | D5 Gm/D D5 | % |
D5 |`,

`title: Waiting On The World To Change
by: John Mayer
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 88
key: D
form: Intro A B A B C
[Intro]
D Bm | G D | A Bm | G D |
[A]
D Bm | G D | A Bm | G D |
D Bm | G D | A Bm | G D |
[B]
D Bm | G D | A Bm | G D |
D Em | Bm Em | A Bm | G D |
[C]
Gm9 | % | Gm7 | % |
Gm9 | % | Gm6 | Gm(maj7) C9/G D9/A |
A Bm | G D | A Bm | G D |
G D | % | G D |`,

`title: Wake Me Up Before You Go-Go
by: Wham!
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 161
key: C
form: Intro Intro A B A B2
[Intro]
C7 N.C. | N.C. | C7 N.C. | N.C. |
[A]
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | Dm7 | C Csus C |
Dm7 | Em7 | F | Em7 A11 |
Dm7 | Em7 | F | G |
G N.C. |
[B]
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | C7 Dm7 | C7 |
F/C | C7 | % | C7 |
F/C | C7 | % |
[B2]
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | Dm7 | C Csus C |
C | C Csus C | C7 Dm7 | C7 |
F/C | C7 | % | C7 |
F/C | C7 | % | C |
C Csus C | Dm7 | C Csus C | C |
C Csus C | Dm7 | C Csus C |`,

`title: Walk On By
by: Dionne Warwick
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 100
key: F
form: Intro A B C A B C2
[Intro]
Am7 | % |
[A]
Am7 | Am7 D | % | Am7 D |
[B]
Gm7 | Am7 | Gm7 | Am7 |
Dm7 | Am7 | B♭maj7 | C |
[C]
Fmaj7 | B♭maj9♯11 | Fmaj7 | B♭maj9♯11 |
Fmaj7 | B♭maj9♯11 | Fmaj7 | % |
[C2]
Fmaj7 | B♭maj9♯11 | Fmaj7 | B♭maj9♯11 |
Fmaj7 | B♭maj9♯11 | Fmaj7 | B♭maj9♯11 |
Am7 | Am7 D | Am7 D | % |
Am7 D | Am7 | Fmaj7 | B♭maj9♯11 |
Fmaj7 | B♭maj9♯11 | Fmaj7 | B♭maj9♯11 |
Fmaj7 | B♭maj9♯11 |`,

`title: Walking On Sunshine
by: Katrina And The Waves
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 216
key: B♭
form: Intro Intro2 A A A A B B2 B B3
[Intro]
N.C. | % | N.C. | % |
[Intro2]
N.C. | % | N.C. | % |
B♭ | E♭ | F7 | E♭ |
B♭ | E♭ | F7 | E♭ |
[A]
B♭ | E♭ | F7 | E♭ |
B♭ | E♭ | F7 | E♭ |
[B]
F6 | % | E♭6 | % |
[B2]
F6 | % | E♭6 | % |
F6 | % | E♭6 | % |
B♭ | E♭ | F7 | E♭ |
B♭ | E♭ | F7 | E♭ |
[B3]
F6 | % | E♭6 | % |
B♭ | E♭ | F7 | E♭ |
B♭ | E♭ | F7 | E♭ |`,

`title: We Are The Champions
by: Queen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 66
key: Cm
time: 6/8
[A]
Cm | B♭/C |
[A2]
Cm | B♭/C | E♭ | A♭/E♭ |
E♭ | A♭/E♭ | E♭ B♭/D | Cm F7 |
B♭ | B♭add9 | B♭ C5 |
[B]
F | Am7 | Dm7 | B♭5 C5 |
F | Am7 | B♭ | F♯m7♭5 |
Gm | C/G | B♭° | E° |
F | Gm9 | A♭6 | B♭7 |
C7sus | Fm | B♭/F | Fm |
B♭/F | Fm | C7sus |
[B2]
F | Am7 | Dm7 | B♭5 C5 |
F | Am7 | B♭ | F♯m7♭5 |
Gm | C/G | B♭° | E° |
F | Gm9 | A♭6 | B♭7 |
C7sus |`,

`title: We've Only Just Begun
by: The Carpenters
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 88
key: E
form: Intro A A2 B A2 B2
[Intro]
A | Dmaj7 | A | Dmaj7 |
[A]
A | Dmaj7 | C♯m7 | F♯m9 |
Bm7 | F♯m9 | Bm7 | Esus E7 |
[A2]
Amaj7 | Dmaj7 | C♯m7 | F♯m9 |
Bm7 | F♯m9 | Bm7 | Esus E7 |
A Dmaj7 | A D E7 |
[B]
F♯ Bmaj7 | % | F♯ Bmaj7 | % |
B♭maj7 E♭maj7 | % | B♭maj7 E♭maj7 | D/E |
D/E |
[B2]
F♯ Bmaj7 | % | F♯ Bmaj7 | % |
B♭maj7 E♭maj7 | % | B♭maj7 E♭maj7 | D/E |
D/E | % | A | Dmaj7 |
A | Dmaj7 | D♭ |`,

`title: What's Love Got To Do With It
by: Tina Turner
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 93
key: B
time: 2/4
form: Intro Intro A B A B C D B2 B2
[Intro]
G♯m11 | % | F♯/G♯ | % |
[A]
G♯m11 | % | F♯/G♯ | % |
G♯m11 | % | F♯/G♯ | E F♯ |
F♯ | E F♯ | F♯ | E |
F♯ |
[B]
B F♯/G♯ F♯ | E F♯ | B F♯ | E F♯ |
B F♯/G♯ F♯ | E F♯ | B F♯ | E F♯ |
[C]
D♭ A♭/B♭ A♭ | G♭ A♭ | D♭ A♭ | G♭ A♭ |
D♭ A♭/B♭ A♭ | G♭ A♭ | D♭ A♭ | G♭ |
[D]
C♭/D♭ | D♭ | C♭/D♭ | D♭ |
Aadd9 | B/A | A♭m7 | D♭ |
[B2]
D♭ A♭/B♭ A♭ | G♭ A♭ | D♭ A♭ | G♭ A♭ |
D♭ A♭/B♭ A♭ | G♭ A♭ | D♭ A♭ | G♭ |`,

`title: When I Give My Love To You
by: Michael Franks
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 84
key: E♭m
form: Intro Intro A B A B C D D D D
[Intro]
E♭m7 Bmaj7 | A♭m11 A♭/B♭ B♭7 | E♭m7 Bmaj7 | A♭m11 A♭/B♭ B♭7 |
[A]
E♭m7 Bmaj7 | Fm7 B♭/F A♭/B♭ B♭7 | E♭m7 Bmaj7 | Fm7 B♭/F A♭/B♭ B♭7 |
E♭m7 Bmaj7 | Fm7 B♭/F A♭/B♭ B♭7 |
[B]
E♭m7 Bmaj7 | A♭m11 B♭sus B♭7 | E♭m7 Bmaj7 | A♭m11 A♭/B♭ B♭7 |
[C]
Bmaj7 | % | B♭m7 | E♭7sus/E E♭sus E♭7 |
Bmaj7 | A♭m7 | B♭m7 | D♭11 B♭7♯5 |
[D]
E♭m7 Bmaj7 | A♭m11 A♭/B♭ B♭7 | E♭m7 Bmaj7 | A♭m11 A♭/B♭ B♭7 |`,

`title: When I'm 64
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 132
key: D♭
form: Intro A A2 B A A2 B2
[Intro]
D♭ | % | G♭ A♭ | D♭ A♭ D♭ N.C. |
D♭ | D♭ |
[A]
D♭ | % | D♭ | A♭7 |
A♭7 | % | A♭7 N.C. | D♭ N.C. |
[A2]
D♭ | % | D♭7 | G♭ |
G♭ G♭m | D♭/A♭ B♭7 | E♭m A♭7 | D♭ A♭ D♭ N.C. |
[B]
B♭m7 | % | A♭7 | B♭m7 |
B♭m7 | % | F7 | % |
B♭m7 | % | E♭m | % |
G♭ | A♭7 | D♭ | A♭ N.C. |
N.C. |
[B2]
B♭m7 | % | A♭7 | B♭m7 |
B♭m7 | % | F7 | % |
B♭m7 | % | E♭m | % |
G♭ | A♭7 | D♭ | A♭ N.C. |
N.C. | D♭ | % | G♭ A♭ |
D♭ A♭ D♭ N.C. |`,

`title: While My Guitar Gently Weeps
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 115
key: Am
form: Intro A A2 B B A A2 C C
[Intro]
Am | Am/G | Am/F♯ | F |
Am | G | D | E |
[A]
Am | Am/G | Am/F♯ | F G |
Am | G | D | E |
[A2]
Am | Am/G | Am/F♯ | F G |
Am | G | C | E |
[B]
A | C♯m7 | F♯m7 | C♯m7 |
Bm7 | % | E E/F♯ | E/G♯ E/A E/B |
[C]
Am | Am/G | Am/F♯ | F |
Am | G | D | E |
Am | Am/G | Am/F♯ | F |
Am | G | C | E |`,

`title: A Whiter Shade of Pale
by: Procol Harum
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 75
key: C
form: Intro A B Intro A B2
[Intro]
C C/B | C/A C/G | F F/E | Dm Dm/C |
G G/F | Em G7 | C F | G F/A G7/B |
[A]
C C/B | Am Am/G Am/F♯ | F F/E | Dm7 F/C |
G G/F | Em G7 | C C/B | Am C/G |
F F/E | Dm7 F/C | G G/F | Em G |
C C/B | Am C/G | F Dm/E | Dm7 G9 |
[B]
C C/B | Am Am/G Am/F♯ | F F/E | Dm Dm/C |
G G/F | Em G7 | C F | C G7 |
[B2]
C C/B | Am Am/G Am/F♯ | F F/E | Dm Dm/C |
G G/F | Em G7 | C F | C G7 |
C C/B | Am C/G | F F/E | Dm Dm7/C |
G G/F | Em G7 | C F | C G7 |`,

`title: Who Says
by: John Mayer
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 180
key: D
form: A A B B2 C A2 B B3
[A]
Dadd9 | G D/F♯ | Em7 | A F♯7/A♯ |
Bm7 | E7 | G A | Dadd9 |
% |
[B]
G | D/F♯ | A Asus | A |
[B2]
G | D/F♯ | A Asus | A |
G | D/F♯ | F♯7/A♯ | Bm7 |
Em7 | % | A Asus | Asus |
[C]
G | A | Dadd9 | G |
D/F♯ | A Asus | A | G |
D/F♯ | A Asus | A | G |
D/F♯ | F♯7/A♯ | Bm7 | Em7 |
% | A Asus | Asus |
[A2]
Dadd9 | G D/F♯ | Em7 | A F♯7/A♯ |
Bm7 | E7 | G A | Dadd9 |
% | Dadd9 | % |
[B3]
G | D/F♯ | A Asus | A |
G | D/F♯ | F♯7/A♯ | Bm7 |
Em7 | % | A7 Asus | A |
G | G/A A | D | G D/F♯ |
D | G D/F♯ | D | G D/F♯ |
D |`,

`title: Wild Thing
by: The Troggs
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 102
key: A
form: Intro B A B2 B A2 C C
[Intro]
A D | E |
[B]
A D | E D | A D | E D |
A D | E D | A D | E E G |
[A]
A N.C. | N.C. G | A N.C. | N.C. G |
A N.C. | N.C. G | A N.C. | N.C. |
A D | E D | A D | E D |
[B2]
A D | E D | A D | E D |
A D | E D | A D | E N.C. |
[A2]
A N.C. | N.C. G | A N.C. | N.C. G |
A N.C. | N.C. G | A N.C. | N.C. |
A D | E D | A D | E |
% | E | % |
[C]
A D | E D |`,

`title: Will You Still Love Me Tomorrow
by: Carole King
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 79
key: C
form: Intro A A B B2
[Intro]
C F6/C C | % | F F6 F | G7sus |
[A]
C F6/C C | % | F F6 F | Gsus G7 |
C F6/C C | % | G7sus | G7 |
Bm11 | E7 | Am | Am Am7/G |
Fadd9 | G7sus | F/C C | G7sus |
[B]
F | % | Em7 | % |
F | F/G | C | % |
[B2]
F | % | Em7 | % |
Am | D7 | G7sus | G7 N.C. |
F/C C | C | Fmaj7 | G7sus |
F/C Cmaj7 | C | Fmaj7 | G7sus |
Cmaj7 | % | Fmaj7 | G7sus |
Cmaj7 | % |`,

`title: Woman
by: John Lennon
genre: Pop
feel: Rock Ballad
source: iReal Pro community chart
tempo: 85
key: E♭
form: Intro A B A B C
[Intro]
E♭sus E♭ | B♭sus/E♭ E♭ | E♭sus E♭ | B♭sus/E♭ E♭ |
[A]
E♭ Fm7 | Gm7 Fm7 | E♭ Cm7 | Fm7 B♭sus B♭ |
A♭ Fm7 | Gm B♭sus B♭ | E♭ Fm7 | Gm7 Fm7 |
E♭ Cm7 | Fm7 B♭sus B♭ | A♭ Fm7 | Gm |
B♭sus | B♭ |
[B]
E♭maj9 | Cm7 | Fm7 | B♭6 |
E♭maj9 | Cm7 | Fm7 | B♭6 |
[C]
E F♯m7 | G♯m7 F♯m7 | E C♯m7 | F♯m7 Bsus B |
A F♯m7 | G♯m | Bsus | B |
Emaj9 | C♯m7 | F♯m7 | B6 |
Emaj9 | C♯m7 | F♯m7 | B6 |`,

`title: Woman In Love
by: Barbra Streisand
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 85
key: E♭m
form: Intro Intro2 A B C D D
[Intro]
E♭m | % | C♭maj7 | C♭maj7 D♭ |
[Intro2]
E♭m | % | C♭maj7 | C♭maj7 |
[A]
E♭m A♭m | % | C♭maj7 D♭7 | G♭ |
D♭m | C♭ E♭m | A♭m7 | B♭7 |
[B]
E♭m A♭m | % | C♭maj7 D♭7 | G♭ |
D♭m | G♭ C♭ | % | B♭7 |
[C]
E♭m B♭ | % | E♭m B♭ | % |
E♭m | D♭ | A♭m7 | % |
G♭ | E♭m | % | C♭maj7 |
% | B9 |
[D]
Em B | % | Em B | % |
Em | D | Am | % |
B7 |`,

`title: Wonderful Tonight
by: Eric Clapton
genre: Pop
feel: Pop Ballad
source: iReal Pro community chart
tempo: 96
key: G
form: Intro Intro A A2 B
[Intro]
G | D/F♯ | C | D Em F♯m7♭5 Am |
[A]
G | D/F♯ | C | D |
G | D/F♯ | C | D |
Cadd9 | D | G D/F♯ | Em |
C | D | G | D/F♯ |
C | D Em F♯m7♭5 Am |
[A2]
G | D/F♯ | C | D |
G | D/F♯ | C | D |
Cadd9 | D | G D/F♯ | Em |
C | D | G | % |
[B]
Cadd9 | D | G D/F♯ | Em |
Cadd9 | D | Cadd9 | D |
G | D/F♯ | C | D Em F♯m7♭5 Am |
G | D/F♯ | C | D Em F♯m7♭5 Am |
G D/F♯ | Em D | Cadd9 | D |
G | D/F♯ | C | D Em F♯m7♭5 Am |
G | D/F♯ | C | D Em F♯m7♭5 Am |
G |`,

`title: Wonderwall
by: Oasis
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 88
key: F♯m
form: Intro Intro A A2 B C C2
[Intro]
F♯m7 A | Esus Bsus | F♯m7 A | Esus Bsus |
[A]
F♯m7 A | Esus Bsus | F♯m7 A | Esus Bsus |
F♯m7 A | Esus Bsus | D E | Bsus |
[A2]
F♯m7 A | Esus Bsus | F♯m7 A | Esus Bsus |
F♯m7 A | Esus Bsus | F♯m7 A | Esus Bsus |
[B]
Dadd9 E | F♯m7 | Dadd9 E | F♯m7 |
Dadd9 E | A E/G♯ F♯m F♯m/A | B7 | % |
[C]
Dadd9 F♯m7 | A F♯m7 | Dadd9 F♯m7 | A F♯m7 |
[C2]
Dadd9 F♯m7 | A F♯m7 | Dadd9 F♯m7 | A F♯m7 |
N.C. | Dadd9 F♯m7 | A F♯m7 | Dadd9 F♯m7 |
A F♯m7 | Dadd9 F♯m7 | A F♯m7 | Dadd9 F♯m7 |
A F♯m7 | F♯m |`,

`title: Woodstock
by: Joni Mitchell
genre: Pop
feel: Folk
source: iReal Pro community chart
tempo: 98
key: E♭m
form: Intro A A B A A B2 C C2
[Intro]
E♭m7 | % | E♭m7 | % |
[A]
E♭m7 | % | A♭7sus | % |
A♭7sus | % | E♭m7 | % |
E♭m7 |
[B]
A♭7sus | % | A♭7sus | % |
E♭m7 | D♭add9 | G♭/B♭ | A♭9 |
E♭m7 | % | E♭m7 | % |
[B2]
A♭7sus | % | A♭7sus | % |
E♭m7 | D♭add9 | G♭/B♭ | A♭9 |
E♭m7 | % | E♭m7 | % |
A♭7sus | % | E♭m7 | % |
E♭m7 |
[C]
A♭7sus | % | A♭7sus | % |
[C2]
A♭7sus | % | A♭7sus | % |
E♭m7 | D♭add9 | A♭7sus | G♭6 |
E♭m7 | % | E♭m7 | G♭/B♭ |
A♭9 A♭7sus | E♭m7 | % | E♭m7 |
% | A♭9 | % | E♭m7 |
% | A♭9 | % | G♭add9/B♭ |
A♭7sus | G♭add9/B♭ | A♭7sus | E♭m7 |
% |`,

`title: The Word
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 116
key: D
form: Intro A B A B
[Intro]
D7♯9 | % |
[A]
D7♯9 | % | D7♯9 | % |
G7 | % | D7♯9 | % |
Asus A7 | Gsus G7 | D7♯9 | % |
[B]
D7 | Cadd9 | F6 | G7 |`,

`title: Yesterday
by: The Beatles
genre: Pop
feel: Rock Pop
source: iReal Pro community chart
tempo: 97
key: F
form: Intro A A B A B A2
[Intro]
F | % |
[A]
F | Em7 A7 | Dm Dm/C | B♭maj7 C7 |
F Em | Dm7 G7 | B♭ F |
[B]
Em7 A7 | Dm C B♭ Dm/A | Gm7 C7 | F |
Em7 A7 | Dm C B♭ Dm/A | Gm7 C7 | F |
[A2]
F | Em7 A7 | Dm Dm/C | B♭maj7 C7 |
F Em | Dm7 G7 | B♭ F | F/C G7/B |
B♭ F |`,

`title: Yesterday Once More
by: The Carpenters
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 86
key: E
form: A A2 B A A2 B2
[A]
E | E/E♭ | D♭m D♭m9 | D♭m/B |
Amaj7 | A♭m7 A♭m7/G♭ D♭7♭9/F | G♭m7 | B/D♯ B/C♯ A/B |
[A2]
E | E/E♭ | C♯m7 C♯m7/B | Amaj7 E♭m7♭5 A♭7 |
D♭m7 | D♭m7/B | Amaj7 G♭m7 | Bsus B7 |
[B]
E | D♭m7 | E | D♭m7 |
E | D♭m7 | G♭m7 | B Bsus B7 |
D♭m7 | A♭/C | E/B | B♭m7♭5 |
E/B | Bsus B7 | Emaj7 | A/E |
Emaj7 | A/E |
[B2]
E | D♭m7 | E | D♭m7 |
E | D♭m7 | G♭m7 | B Bsus B7 |
D♭m7 | A♭/C | E/B | B♭m7♭5 |
E/B | Bsus B7 | Emaj7 | A/E |
E | D♭m7 | E | D♭m7 |`,

`title: You Are So Beautiful
by: Joe Cocker
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 63
key: A♭
form: Intro A B A B2 A2
[Intro]
A♭add9 A♭add9/G♭ | D♭/F D♭ | A♭add9 A♭add9/G♭ | D♭/F D♭ |
[A]
A♭add9 A♭ A♭7 | D♭maj7 | G♭9 G♭7♯11 | A♭ A♭maj7 |
A♭7 A♭ A♭ A♭7 | D♭maj7 | G♭9 G♭7♯11 | A♭ A♭maj7 |
E♭m7 A♭7 |
[B]
D♭maj7 | C7 C+ C7 | Fm Fm(maj7) | B♭9 |
A♭ A♭ A♭7 | D♭maj7 G♭9 | A♭ A♭maj7 |
[B2]
D♭maj7 | C7 C+ C7 | Fm | B♭13♯11 |
[A2]
A♭add9 A♭ A♭7 | D♭maj7 G♭9 | A♭ A♭ A♭7 | D♭maj9 G♭9 |
A♭ |`,

`title: You Take My Breath Away
by: Queen
genre: Pop
feel: Rock
source: iReal Pro community chart
tempo: 82
key: Cm
form: Intro Intro A B A B C D C2
[Intro]
Cm7 Fm6/C | % | Cm7 |
[A]
Cm7 Fm/C | E♭/C Fm/C | Cm7 Fm6/C | Cm7 |
B°7 Cm | B°7 Cm | B♭ E♭ | E♭ |
[B]
B♭7sus | B♭9 | E♭/G | G♭°7 |
Fm7 | % | Cm7 Fm6/C | % |
Cm7 |
[C]
B♭ A♭/B♭ B♭ | % | B♭ A♭/B♭ B♭ | E♭ |
% | A♭ | C7 B♭m/C C7 | Fm7 Fm7/G |
A♭°7 | E♭/G | G♭°7 | Fm7 |
% | Cm7 Fm6/C | % | Cm7 |
[D]
Cm7 Fm/C | E♭/C Fm/C | Cm7 Fm/C | E♭/C Fm/C |
[C2]
B♭ A♭/B♭ B♭ | % | B♭ A♭/B♭ B♭ | E♭ |
% | A♭ | C7 B♭m/C C7 | Fm7 Fm7/G |
A♭°7 | E♭/G | G♭°7 | Fm7 |
% | Cm7 Fm6/C | % | Cm7 |
% |`,

`title: You've Got A Friend
by: Carole King
genre: Pop
feel: Folk Rock
source: iReal Pro community chart
tempo: 90
key: A♭
form: Intro A B C A B C2
[Intro]
A♭ | D♭/A♭ | A♭ | Gm C7 |
[A]
Fm | C7/G C7 | Fm C7/G | A♭ C7/G Fm Fm/C |
B♭m7 | B♭m7/E♭ | A♭ | A♭sus A♭ |
Gm7 | C7 Csus C7 | Fm C7/G | A♭ C7/G Fm Fm/C |
B♭m7 | Cm7 | E♭9sus E♭7 | E♭7sus E♭7 |
[B]
A♭ | % | D♭ | % |
A♭ | A♭add9 A♭ | E♭9sus | E♭7 |
[C]
A♭ | E♭/A♭ | D♭maj7 D♭6 | Fm A♭7/E♭ |
D♭maj7 Cm7 | B♭m7 E♭9sus | A♭ | D♭/A♭ |
A♭ | Gm C7 |
[C2]
A♭ | E♭/A♭ | D♭maj7 D♭6 | Fm A♭7/E♭ |
D♭maj7 Cm7 | B♭m7 E♭9sus | G♭ | D♭ |
A♭ | A♭maj7 | D♭ | G♭9 |
Fm | B♭7 | E♭9sus | E♭7 |
A♭ | D♭/A♭ | A♭ | D♭/A♭ |
A♭ |`,

`title: You've Lost That Lovin' Feelin'
by: The Righteous Brothers
genre: Pop
feel: Pop
source: iReal Pro community chart
tempo: 95
key: D♭
form: A B A B2 C C2 B B
[A]
C♭/D♭ | % | D♭ | % |
C♭/D♭ | % | D♭ | % |
E♭m7 | Fm7 | G♭ | G♭/A♭ A♭ |
[B]
D♭ | G♭/D♭ | A♭ | D♭ |
D♭ | G♭/D♭ | C♭/D♭ | % |
D♭ | % |
[B2]
D♭ | G♭/D♭ | A♭ | D♭ |
D♭ | G♭/D♭ | C♭/D♭ | % |
D♭ G♭ | A♭ G♭ G♭/E♭ |
[C]
D♭ G♭ | A♭ G♭ G♭/E♭ | D♭ G♭ | A♭ G♭ G♭/E♭ |
D♭ G♭ | A♭ G♭ G♭/E♭ | D♭ G♭ | A♭ G♭ G♭/E♭ |
[C2]
D♭ G♭ | A♭ G♭ G♭/E♭ | D♭ G♭ | A♭ G♭ G♭/E♭ |
D♭ G♭ | A♭ G♭ G♭/E♭ | D♭ G♭ | A♭ G♭ G♭/E♭ |
C♭/D♭ | % | D♭ G♭ | A♭ G♭ G♭/E♭ |`,

`title: 26-2
by: John Coltrane
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: F
form: A A2 B A2
[A]
Fmaj7 A♭7 | D♭maj7 E7 | Amaj7 C7 | Cm7 F7 |
B♭maj7 D♭7 | G♭maj7 A7 | Dm7 G7 | Gm7 C7 |
[A2]
Fmaj7 A♭7 | D♭maj7 E7 | Amaj7 C7 | Cm7 F7 |
B♭maj7 A♭7 | D♭maj7 E7 | Amaj7 C7 | Fmaj7 |
[B]
Cm7 F7 | Em7 A7 | Dmaj7 F7 | B♭maj7 |
E♭m7 | A♭7 | D♭maj7 | Gm7 C7 |`,

`title: 9.20 Special
by: Earl Warren
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A A2 B A2
[A]
D9 | Fm6 | D9 | Fm6 |
C | C7 B7 B♭7 A7 | D9 | G7 A♭7 G7 |
[A2]
D9 | Fm6 | D9 | Fm6 |
C | C7 B7 B♭7 A7 | D9 | G7 C6 |
[B]
C7 | % | F6 | % |
D7 | % | G7 | % |`,

`title: A Child Is Born
by: Thad Jones
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 3/4
[A]
B♭maj7 | E♭m/B♭ | B♭maj7 | E♭m/B♭ |
B♭maj7 | E♭m/B♭ | Am7♭5 | D7♯9 |
Gm7 | D7♯5 | Gm7 | D7♯5 |
Gm7 | C7 | F7sus | F7 |
[B]
B♭maj7 | E♭m/B♭ | B♭maj7 | E♭m/B♭ |
B♭maj7 | D7alt | E♭maj7 | A♭7 |
B♭/F | G♭6 | Gm7 | C7 |
F7sus | F7 |`,

`title: A Fine Romance
by: Jerome Kern
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A B A C
[A]
C6 | C♯°7 | Dm6 | D♯°7 |
Em7 | Am7 | Dm7 | G7 |
[B]
C6 | E♭°7 | Dm7 | G7 |
Em7 | A7 | D7 | G7 |
[C]
C6 | C7 | Fmaj7 | F♯m7♭5 B7♭9 |
Em7 A7 | Dm7 G7 | C6 | Dm7 G7 |`,

`title: A Foggy Day
by: George Gershwin
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: v A B A C
[v]
Fmaj7 | B♭69 | Fmaj7 | B♭69 |
Fmaj7 | E7 | Am | D13 |
Gm7 C7 | Fmaj7 | Am Am6 | Am7 D13♭9 |
Am9 D9 | Gm7 C7 | F6 D7 | Gm7 C7 |
[A]
Fmaj7 | D7♭9 | Gm7 | C7 |
F6 | A♭7 | G7 | C7 |
[B]
Fmaj7 | Cm7 F7 | B♭maj7 | E♭7 |
Am7 | D7 | G7 | C7 |
[C]
Cm7 | F7 | B♭maj7 | E♭7 |
Fmaj7/C Gm7/C | Fmaj7/C Gm7/C | Fmaj7/C Dm7 | Gm7 C7 |
F6 | Gm7 C7 |`,

`title: A Nightingale Sang In Berkeley Square
by: Manning Sherwin
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
form: A A2 B A
[A]
E♭maj7 Cm7 | Gm7 B♭m7 E♭7 | A♭maj7 Dm7♭5 G7 | Cm A♭m6 |
E♭maj7/B♭ Fm7 | E♭maj7/G A♭m7 D♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
E♭maj7 Cm7 | Fm7 B♭7 |
[A2]
E♭maj7 Cm7 | Gm7 B♭m7 E♭7 | A♭maj7 Dm7♭5 G7 | Cm A♭m6 |
E♭maj7/B♭ Fm7 | E♭maj7/G A♭m7 D♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
E♭maj7 | Am7♭5 D7 |
[B]
Gmaj7 Em7 | Am7 D7 | Bm7 B♭°7 | Am7 D7 |
Gmaj7 Em7 | Am7 D7 | Bm7 Em7 | Fm7 B♭7 |`,

`title: A Sleepin' Bee
by: Harold Arlen
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: A♭
form: A B A C
[A]
A♭maj7 E♭7sus | A♭maj7 E♭7sus | A♭maj7 D7 | D♭maj7 G♭7sus |
A♭maj7 D♭7 | C7 F7 | B♭m7 E7 | E♭7 D♭7 |
[B]
C9 C7♭9 | F13 F7♭13 | B♭13 B♭7♭13 | E♭9 E♭7♭9 |
A♭13 A♭7♭13 | D♭7 | B♭m7 Cm7 D♭6 D° | E♭7sus E♭7 |
[C]
C9 C7♭9 | F13 F7♭13 | B♭13 B♭7♭13 | E♭9 E♭7♭9 |
A♭maj7 D♭maj7 | C7 F7 | B♭7 E♭7 | C7 F7 |
B♭7 | E♭7sus E♭7 | A♭6 Bmaj7 | Emaj7 Amaj7 |`,

`title: A Time For Love
by: Johnny Mandel
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Fmaj7 | E♭7/F | F6 | G7 |
Gm7 | Gm7/F | Em7 A7 | Em7♭5/A A7♭9 |
[B]
Dm7 | E♭7/D♭ | F7/C | G7 |
Gm7 | Gm7/F | Em7 A7 | Em7♭5/A A7♭13 |
[C]
Dm7 A7 | Dm7 G7 | C6 E7♭13 | Am7 A7♭13 |
Dm7 Cm6 | Bm7♭5 E7 | C♯m7 F♯m7 | Gm7 C7 |
[D]
Fmaj7 | Em7♭5 A7♭9 | Dm7 | G7 |
Gm7 | Gm7/F | Em7 A7 | Em7♭5 A7♭9 |
Dm7 | G7 | Gm7 | C7 |
F6 | C7sus |`,

`title: Afro Blue
by: Mongo Santamaria
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Fm
time: 3/4
[A]
Fm7 | % | D♭7♯9/A♭ C7♯9/G | Fm7 |
Fm7 | % | D♭7♯9/A♭ C7♯9/G | Fm7 |
E♭ | % | D♭ E♭ | Fm7 |
E♭ | % | D♭ E♭ | Fm7 |`,

`title: Afternoon In Paris
by: John Lewis
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A A2 B A
[A]
Cmaj7 | Cm7 F7 | B♭maj7 | B♭m7 E♭7 |
A♭maj7 | Dm7 G7♯9 | Cmaj7 | Dm7 G7 |
[A2]
Cmaj7 | Cm7 F7 | B♭maj7 | B♭m7 E♭7 |
A♭maj7 | Dm7 G7♯9 | Cmaj7 | % |
[B]
Dm7 | G7 | Cmaj7/E | A7 |
Dm7 | G7 | Cmaj7 | Dm7 G7 |`,

`title: Ain't Misbehavin'
by: Fats Waller
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
C6 A7 | Dm7 G7 | C6 C7/E | F6 Fm6 |
C6/E A7 | Dm7 G7 | E7 A7 | D7 G7 |
[A2]
C6 A7 | Dm7 G7 | C6 C7/E | F6 Fm6 |
C6/E A7 | Dm7 G7 | C6 Fm6 | C6 E7 |
[B]
Am | F7 | D7 | A7 |
G6 E7 | Am7 D7 | G6 A7 | D7 G7 |
[A3]
C6 A7 | Dm7 G7 | C6 C7/E | F6 Fm6 |
C6/E A7 | Dm7 G7 | C6 Am7 | Dm7 G7 |`,

`title: Airegin
by: Sonny Rollins
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Fm
form: A B A C
[A]
Fm | C7♯9♭5 | Fm | F7 |
B♭m | F7♯9♭5 | B♭m | % |
[B]
D♭maj7 | Dm7 G7 | Cmaj7 | C♯m7 F♯7 |
Bmaj7 | Cm7 F7 | B♭maj7 | % |
B♭m7 | E♭7 | A♭maj7 | Gm7♭5 C7♭9 |
[C]
D♭maj7 | Dm7 G7 | Cm7♭5 | F7 |
B♭m7 | E♭7 | A♭maj7 | Gm7♭5 C7♭9 |`,

`title: Alfie
by: Burt Bacharach
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B♭
[A]
B♭maj7 | F7sus | B♭maj7 | Dm7 G7 |
Cm7 | Dm7 Gm7 | Cm7 F7sus | B♭°7 |
F7sus | F7 F7♯5 |
[A2]
B♭maj7 | F7sus | B♭maj7 | Dm7 G7 |
Cm7 | Dm7 Gm7 | Cm7 F7sus | B♭°7 |
[B]
Am7 | B♭m/C C7 | Am7 | C7sus |
Am7 | B♭m/C C7 | F7sus | F6 F7 |
[A3]
B♭maj7 | F7sus | Em7♭5 E♭7 | Dm7 Gm7 |
Em7♭5 E♭7 | Dm7 Gm7 | C7♯11 | Cm7 F7sus |
B♭°7 | F7sus | B°7 | Cm9 |
B°7 | B♭maj7 |`,

`title: Alice In Wonderland
by: Sammy Fain
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: C
time: 3/4
[A]
Dm7 | G7 | Cmaj7 | Fmaj7 |
Bm7♭5 | E7♭9 | Am7 | E♭7♯11 |
Dm7 | G7 | Em7 | Am7 |
Dm7 | G7 | Em7 | A7 |
[A2]
Dm7 | G7 | Cmaj7 | Fmaj7 |
Bm7♭5 | E7♭9 | Am7 | E♭7♯11 |
Dm7 | G7 | Em7 | Am7 |
Dm7 | G7 | Cmaj7 | % |
[B]
D7 | G7 | Em7 | Am7 |
Dm7 | G7 | Cmaj7 | Fmaj7 |
F♯m7♭5 | B7♭9 | Em7 | A7 |
Dm7 | A7 | Dm7 | G7 |`,

`title: All Of You
by: Cole Porter
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
[A]
A♭m6 | E♭maj7 | Fm7♭5 | B♭7 |
A♭m6 | E♭maj7 | Fm7♭5 | B♭7 |
[B]
E♭6/G | G♭°7 | Fm7 | B♭7 |
E♭maj7 D7 | D♭7 C7 | Fm7 | B♭7 |
[A2]
A♭m6 | E♭maj7 | Fm7♭5 | B♭7 |
A♭m6 | E♭maj7 | Gm7 | C7 |
[C]
A♭maj7 | Am7♭5 D7♭9 | Gm7 | C7 |
Fm7 | B♭7 | E♭6 | % |`,

`title: All Too Soon
by: Duke Ellington
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 C7 | Fmaj7 B♭7 |
Em7 A7♯9 | Dm7 G7 | Em7 A7 | Dm7 G7 |
[A2]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 C7 | Fmaj7 B♭7 |
Em7 A7♯9 | Dm7 G7 | C6 B♭7 | C6 G7♯5 |
[B]
C6/G G7♯5 | C7 | Gm7 C7♯5 | Fmaj7 |
B7 B♭7 | A7♭9 | D7 | G7♯5 |
[A3]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 C7 | Fmaj7 B♭7 |
Em7 A7♯9 | Dm7 G7 | C6 Am7 | Dm7 G7 |`,

`title: Alone Together
by: Arthur Schwartz
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Dm
form: A A B A2
[A]
Dm6 | Em7♭5 A7♭9 | Dm6 | Em7♭5 A7♭9 |
Dm6 | Am7♭5 D7♭9 | Gm7 | % |
Bm7 E7 | Gm7 C7 | Fmaj7 | Em7♭5 A7♭9 |
Dmaj7 | % |
[B]
Am7♭5 | D7♭9 | Gm6 | % |
Gm7♭5 | C7♭9 | Fmaj7 | Em7♭5 A7♭9 |
[A2]
Dm6 | Em7♭5 A7♭9 | Dm6 | Em7♭5 A7♭9 |
Dm6 Bm7♭5 | B♭7 A7♭9 | Dm6 | Em7♭5 A7♭9 |`,

`title: Along Came Betty
by: Benny Golson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: A♭
[A]
B♭m7 | Bm7 E7 | B♭m7 | Bm7 E7 |
Amaj7 | A♭7 | Gmaj7 | G♭7 |
F♯m7 | Gm7 C7 | F♯m7 | Gm7 C7 |
Fmaj7 | A7♭9 | Dm7 | G7 |
[B]
Cm7 | F7 | Am7♭5 D7♭9 | Gm7 Gm7/F |
Em7♭5 | A7♭9 | Fm7 | B♭7 |
[C]
B♭m7 | Bm7 E7 | B♭m7 | Bm7 E7 |
Cm7♭5 | F7♭13 | B♭m7♭5 | E♭7♯9 |
A♭maj7 | Bm7 E7 |`,

`title: Angel Eyes
by: Matt Dennis
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Cm
form: A A B A
[A]
Cm D7 D♭7 | Cm A♭7 | Cm Am7♭5 | Dm7♭5 G7♭9 |
Cm D7 D♭7 | Cm A7alt | A♭7 G7♭9 | Cm |
[B]
B♭m7 E♭7 | A♭maj7 F7 | B♭m7 E♭7 | A♭maj7 |
Am7 D7 | Gmaj7 | C♯m7 F♯7 | Dm7 G7 |`,

`title: Anthropology
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
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

`title: April In Paris
by: Vernon Duke
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
G7♭9sus | Cmaj7 | Dm7♭5 | G7♭9 |
Cmaj7 | % | Gm7 | C7 |
[B]
Fmaj7 | % | Bm7♭5 E7 | Am Am/G |
F♯m7♭5 | B7♭9 | Bm7 E7 | Em7♭5 A7♭9 |
[C]
F♯m7♭5 F°7 | C/E E♭°7 | Dm7♭5 G7♭9 | C6 |
Bm7♭5 E7 | Am Am/G | F♯m7♭5 B7♭9 | Emaj7 Dm7 G7 |
[D]
G7♭9sus | Cmaj7 | Em7♭5 | A7♭9 |
D7 | Dm7♭5 G7 | C6 | % |`,

`title: Ask Me Now
by: Thelonious Monk
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: D♭
[A]
Gm7 C7 F♯m7 B7 | Fm7 B♭7 Em7 A7 | E♭m7 A♭7♯5 | B7♯11 B♭7 |
E♭7 D7 | D♭maj7 E♭7 | E♭m7 A♭7 | B7 B♭7 A7 A♭7 |
[A2]
Gm7 C7 F♯m7 B7 | Fm7 B♭7 Em7 A7 | E♭m7 A♭7♯5 | B7♯11 B♭7 |
E♭7 D7 | D♭maj7 E♭7 | E♭m7 A♭7 | D♭maj7 |
[B]
E♭m7 A♭7 | D♭maj7 | E♭m7 D7♯11 | D♭maj7 |
E♭7 | % | E♭m7 A♭7 | G♭7♯11 |
[A3]
Gm7 C7 F♯m7 B7 | Fm7 B♭7 Em7 A7 | E♭m7 A♭7♯5 | B7♯11 B♭7 |
E♭7 D7 | D♭maj7 E♭7 | E♭m7 A♭7♯5 | D♭maj7 |`,

`title: Au Privave
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
F7 | B♭7 | F7 | Cm7 F7 |
B♭7 | B°7 | F7 | Am7 D7 |
Gm7 | C7 | F7 D7 | Gm7 C7 |`,

`title: Autumn In New York
by: Vernon Duke
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Gm7 Am7 | B♭6 C7 | Fmaj7 Gm7 | Am7 D7♭9 |
Gm7 Am7 | B♭6 C7 | Am7♭5 | D7♭9 |
[B]
Gm7 | B♭m7 E♭7 | A♭maj7 E♭7 | A♭maj7 G7♭9 |
Cm7 Am7♭5 | Dm7♭5 G7♭9 | Cmaj7 | Am7 D7 |
[C]
Gm7 Am7 | B♭6 C7 | Fmaj7 Gm7 | Am7 D7 D♭7 |
Cm7 Dm7 | E♭m6 F7♭13 | B♭m6 A♭m7 | Gm7♭5 C7 |
[D]
Fm7 C7♭9 | Fm7 E♭m7 A♭7 | D♭maj7 A♭7 | D♭maj7 D♭7 |
Gm7 Am7 | B♭m6 C7♭9 | Fm | D7♭9 |`,

`title: Bags' Groove
by: Milt Jackson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
F7 | B♭7 | F7 | % |
B♭7 | % | F7 | Am7 D7 |
Gm7 | C7 | F7 D7 | Gm7 C7 |`,

`title: Beatrice
by: Sam Rivers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | G♭maj7♯11 | Fmaj7 | E♭maj7♯11 |
Dm7 | E♭maj7♯11 | Dm7 Cm7 | B♭m7 |
Am7 | B♭maj7 | Em7♭5 A7♭9 | Dm7 |
Gm7 | G♭maj7♯11 | Fm7 | G♭maj7♯11 |`,

`title: Beautiful Love
by: Victor Young
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Dm
form: A B A C
[A]
Em7♭5 | A7♭9 | Dm | % |
Gm7 | C7 | Fmaj7 | Em7♭5 A7♭9 |
[B]
Dm | Gm7 | B♭7 | A7♭9 |
Dm | G7♯11 | Em7♭5 | A7♭9 |
[C]
Dm | Gm7 | B♭7 | A7♭9 |
Dm B7 | B♭7♯11 A7♭9 | Dm | % |`,

`title: Bemsha Swing
by: Thelonious Monk
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
C A7 | A♭7 D♭7 | C E♭7 | D7 D♭7 |
C A7 | A♭7 D♭7 | C B♭7 | A♭7 G♭7 |
F D7 | D♭7 G♭7 | F A♭7 | G7 D♭7 |
C A7 | A♭7 D♭7 | C D♭maj7 | D♭maj7 |`,

`title: Bernie's Tune
by: Bernie Miller
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Dm
[A]
Dm7 | % | B♭7♯11 | % |
Em7♭5 | A7♭9 | Dm7 | Em7♭5 A7♭9 |
[A2]
Dm7 | % | B♭7♯11 | % |
Em7♭5 | A7♭9 | Dm7 | Cm7 F7 |
[B]
B♭6 Gm7 | Cm7 F7 | B♭6 Gm7 | Cm7 F7 |
B♭6 Gm7 | Cm7 F7 | B♭6 | Em7♭5 A7♭9 |
[A3]
Dm7 | % | B♭7♯11 | % |
Em7♭5 | A7♭9 | Dm7 | % |`,

`title: Bessie's Blues
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
[A]
E♭7 | A♭7 | E♭7 | % |
A♭7 | % | E♭7 | % |
B♭7 | A♭7 | E♭7 | B♭7 |`,

`title: Bewitched
by: Richard Rodgers
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 C7♯5 | Fmaj7 F♯°7 |
C6/G Am7 | Dm7 G7 A7 | Dm7 | G7 |
[A2]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 C7♯5 | Fmaj7 F♯°7 |
C6/G Am7 | Dm7 Gm7 C7 | Fmaj7 | Em7♭5 A7♭9 |
[B]
Dm6 | % | Am7 | % |
Dm7 G7 | Dm7 G7 | Em7 E♭°7 | Dm7 G7 |
[A3]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 C7♯5 | Fmaj7 F♯°7 |
C6/G Am7 | Dm7 G7 | C6 Am7 | Dm7 G7 |`,

`title: Black Narcissus
by: Joe Henderson
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: G♯m
time: 3/4
[A]
A♭m7 | B♭m7/A♭ | A♭m7 | B♭m7/A♭ |
A♭m7 | B♭m7/A♭ | A♭m7 | C♭maj7♯11 |
[B]
F♯m7 | G♯m7/F♯ | F♯m7 | G♯m7/F♯ |
F♯m7 | G♯m7/F♯ | F♯m7 | Amaj7♯11 |
[C]
E♭maj7♯11 | Fmaj7♯11 | B♭maj7♯11 | Cmaj7♯11 |
E♭maj7♯11 | Fmaj7♯11 B♭maj7♯11 | Gmaj7♯11 A♭maj7♯11 | B♭ Cmaj7♯11 |`,

`title: Black Nile
by: Wayne Shorter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Dm
[Intro]
Fm7 | G♭maj7 | E♭m7 | Fm7 Dm7 |
B♭7 | E♭maj7 | Em7♭5 A7♭9 | A7♭9 |
[A]
Dm6 | E♭7 | Dm6 | Cm7 F7♯5 |
B♭maj7 | A7♭13 | Dm6 | E♭7 |
[A2]
Dm6 | E♭7 | Dm6 | Cm7 F7♯5 |
B♭maj7 | Gm7 C7 | A7♯9 | A♭7 |
[B]
Gm7 | C7 | Fm7 B♭7 | E♭maj7 |
Gm7 | C7 | Fm7 B♭7 | E♭maj7 A7♭9 |
[A3]
Dm6 | E♭7 | Dm6 | Cm7 F7 |
B♭maj7 | A7♭13 | Dm6 | E♭7 |`,

`title: Blue In Green
by: Miles Davis, Bill Evans
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Dm
[A]
Gm6 | A7♯9 | Dm7 D♭7 | Cm7 F7 |
B♭maj7♯11 | A7♯9 | Dm6 | E7♭13 |
Am7 | Dm7 | Gm6 | A7♯9 |
Dm6 | Dm6 |`,

`title: Blue Moon
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A A2 B A
[A]
E♭maj7 Cm7 | Fm7 B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
D♭7 C7 | B7 B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
[A2]
E♭maj7 Cm7 | Fm7 B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
D♭7 C7 | B7 B♭7 | E♭maj7 A♭7 | Gm7♭5 C7♭9 |
[B]
Fm7 B♭7 | E♭6 Cm7 | Fm7 B♭7 | E♭6 A7♯11 |
A♭m7 D♭7 | G♭maj7 | B♭/F F7 | Fm7 B♭7 |`,

`title: The Blue Room
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
F6 Dm7 | Gm7 C7 | Am7 Dm7 | Gm7 C7 |
Cm7 F7 | B♭maj7 E♭7 | Dm7 G7 | Gm7 C7 |
[A2]
F6 Dm7 | Gm7 C7 | Am7 Dm7 | Gm7 C7 |
Cm7 F7 | B♭maj7 E♭7 | F6/A A♭° Gm7 C7 | F6 |
[B]
Gm7 | C7 | F6 B♭7♯11 | Am7 A♭°7 |
Gm7 Gm7/F | Em7♭5 A7♯9 | Dm7 G7 | Gm7 C7 |
[C]
F6 Dm7 | Gm7 C7 | Am7 Dm7 | Gm7 C7 |
Cm7 F7 | B♭maj7 E♭7 | F6/A A♭° Gm7 C7 | F6 C7 |`,

`title: Body And Soul
by: Johnny Green
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: D♭
form: A A2 B A
[A]
E♭m7 B♭7♭13 | E♭m7 A♭7 | D♭maj7 G♭7 | Fm7 E°7 |
E♭m7 E♭m7/D♭ | Cm7♭5 F7♭9 | B♭m7 E♭m7 A♭7 | D♭6 G♭7 Fm7♭5 B♭7 |
[A2]
E♭m7 B♭7♭13 | E♭m7 A♭7 | D♭maj7 G♭7 | Fm7 E°7 |
E♭m7 E♭m7/D♭ | Cm7♭5 F7♭9 | B♭m7 E♭m7 A♭7 | D♭6 Em7 A7 |
[B]
Dmaj7 Em7 | Dmaj7/F♯ Gm7 C7 | F♯m7 Bm7 Em7 A7 | Dmaj7 |
Dm7 G7 | Em7 E♭°7 | Dm7 G7 | C7 B7 B♭7 |`,

`title: Bolivia
by: Cedar Walton
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: D
form: Intro Intro A B B
[Intro]
G7 | % | % | % |
% | % | % | % |
[A]
E♭maj7 | A13 | Dmaj7 | A♭13♭9 |
Gmaj7 | F♯7♭13 | Bm7 | Cmaj7♯11 |
Bm7 | Bm7/A | G♯m7♭5 | Gm7 C7 |
Fmaj7 | B7♭9 | B♭maj7 | A7♯9 |
[B]
G7 | % | % | % |
% | % | % | % |`,

`title: Boplicity
by: Cleo Henry
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: A A B A
[A]
Gm7 Fmaj7 | Gm7 C7 | Fmaj7 | Cm7 F7♯5 |
B♭maj7 | Gm7/C | Gm7/C C7sus | Fmaj7♯11 |
[B]
Cm7 F7♯5 | Cm7 B7 | B♭maj7 | % |
B♭m7 E♭7♯5 | B♭m7 A7 | A♭maj7 A♭m7 | Gm7 C7 |`,

`title: Born To Be Blue
by: Wells-Torme
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
C7 D♭7♯11 | C7 G♭7♯11 | F7 E♭7 | A♭maj7 G7♯5 |
Cm7 D♭7♯11 | Cm7 F7 | Fm7 D7♯9♯5 | Dm7♭5 G7 |
[A2]
C7 D♭7♯11 | C7 G♭7♯11 | F7 E♭7 | A♭maj7 G7♯5 |
Cm7 D♭7♯11 | Cm7 F7 | Fm7 A♭7 G7 | C6 |
[B]
A♭m7 D♭7 | A♭m7 D♭7 | A♭m7 D♭7 | G♭maj7 |
C♯m7 F♯7 | Bmaj7 G♯m7 | Fm7 B♭7 | E♭maj7 Dm7♭5 G7 |
[A3]
C7 D♭7♯11 | C7 G♭7♯11 | F7 E♭7 | A♭maj7 G7♯5 |
Cm7 D♭7♯11 | Cm7 F7 | Fm7 A♭7 G7 | C6 D♭7♯11 |`,

`title: Bright Size Life
by: Pat Metheny
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: D
form: A A2 B A2
[A]
Gmaj7 | % | B♭maj7♯11 | % |
D | D/C | B♭maj7 | G/A |
[A2]
Gmaj7 | % | B♭maj7♯11 | % |
D | D/C | G/B G/A | D |
[B]
G/A | % | F/G | % |
A7/E | % | D | G/A |`,

`title: But Beautiful
by: Jimmy Van Heusen
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
form: A B A C
[A]
Gmaj7 | Bm7♭5 E7♭9 | Am7 | C♯m7♭5 F♯7♭9 |
Gmaj7 | Bm7♭5 E7♭9 | A7 | % |
[B]
D7 D7/C | Bm7 Em7 | Am7 D7 | Gmaj7 |
Em7 | A7 | Am7 | D7 |
[C]
D7 D7/C | Bm7 Em7 | Am7 F♯m7♭5 B7 | Em7 F7 |
Bm7 E7 | Am7 D7 | G6 Em7 | Am7 D7 |`,

`title: But Not For Me
by: George Gershwin
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: E♭
form: A B A C
[A]
F7 | B♭7 | E♭maj7 A♭7 | Gm7 C7 |
F7 | B♭7 | E♭maj7 | B♭m7 E♭7 |
[B]
A♭maj7 | D♭7 | E♭maj7 | Cm7 |
Fm7 | % | Fm7 | B♭7 |
[C]
A♭maj7 | D♭7 | E♭maj7 A♭7 | Gm7 C7 |
Fm7 | B♭7 | E♭6 | % |`,

`title: Bye Bye Blackbird
by: Ray Henderson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | Gm7 C7 | Fmaj7 | Gm7 C7 |
Fmaj7 | Am7♭5 D7♭9 | Gm7 | C7 |
Gm7 | D7 | Gm7 | C7 |
Gm7 | C7 | F6 | % |
[B]
F7 | E7 | E♭7 | D7♭9 |
Gm7 | % | D♭7 | C7 |
Fmaj7 | Gm7 C7 | Fmaj7 | Am7♭5 D7♭9 |
Gm7 | C7 | F6 | Gm7 C7 |`,

`title: Cherokee
by: Ray Noble
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
[A]
B♭6 | % | Fm7 | B♭7 |
E♭maj7 | % | A♭7 | % |
B♭6 | % | C7 | % |
Cm7 | G7♭9 | Cm7 | F7♯5 |
[A2]
B♭6 | % | Fm7 | B♭7 |
E♭maj7 | % | A♭7 | % |
B♭6 | % | C7 | % |
Cm7 | F7 | B♭6 | % |
[B]
C♯m7 | F♯7 | Bmaj7 | % |
Bm7 | E7 | Amaj7 | % |
Am7 | D7 | Gmaj7 | % |
Gm7 | C7 | Cm7 | F7♯5 |`,

`title: Chelsea Bridge
by: Billy Strayhorn
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: D♭
form: A A B A
[A]
B♭m(maj7) | A♭m(maj7) | B♭m(maj7) A♭m(maj7) | B♭7 |
E♭m7 | A♭7 | D♭6 | D♭6 C7 B7 |
[B]
F♯m7 B7 | Emaj7 C♯m7 | F♯m7 B7alt | Bm7 E7 |
Amaj7 Am D7 | Gmaj7 | Gm7 C7 | D♭7 C7 B7 |`,

`title: Cheek To Cheek
by: Irving Berlin
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: C
form: A A2 B B C
[A]
Cmaj7 C♯°7 | Dm7 G7 | Cmaj7 C♯°7 | Dm7 G7 |
Cmaj7 Dm7 | E♭°7 Em7 | B♭7♯11 | A7 D7 |
G7 Dm7 | Em7 F7 | B♭7♯11 | A7 |
Dm7 | G7 | Em7 A7 | Dm7 G7 |
[A2]
Cmaj7 C♯°7 | Dm7 G7 | Cmaj7 C♯°7 | Dm7 G7 |
Cmaj7 Dm7 | E♭°7 Em7 | B♭7♯11 | A7 D7 |
G7 Dm7 | Em7 F7 | B♭7♯11 | A7 |
Dm7 | G7 | C6 | % |
[B]
Dm7 G7 | C6 A7 | Dm7 G7 | C6 A7 |
Dm7 G7 | C6 A7 | Dm7 G7 | C6 |
[C]
Cm7 | % | E♭m7 | A♭7 |
Dm7♭5 | G7 G♯°7 | Am7 | Dm7 G7 |`,

`title: Come Rain Or Come Shine
by: Harold Arlen
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | Em7♭5 A7♭9 | Dm7 | % |
G7 | C7 | Fmaj7 | Cm7 F7 |
B♭m7 | Fm7 | B♭m7 | Gm7 C7 |
Bm7♭5 E7♭9 | Am7♭5 D7♭9 | Am7♭5 D7♭9 | Gm7 C7 |
[B]
Fmaj7 | Em7♭5 A7♭9 | Dm7 | % |
Bm7 | E7 | A7 | % |
D7 | % | G7 | B♭7 A7♭9 |
Dm Bm7♭5 | Em7♭5 A7♭9 | Dm6 | Gm7 C7 |`,

`title: Confirmation
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
Fmaj7 | Em7♭5 A7♭9 | Dm7 G7 | Cm7 F7 |
B♭7 | Am7 D7 | G7 | C7♭9 |
[A2]
Fmaj7 | Em7♭5 A7♭9 | Dm7 G7 | Cm7 F7 |
B♭7 | Am7 D7 | Gm7 C7 | Fmaj7 |
[B]
Cm7 | F7 | B♭maj7 | % |
E♭m7 | A♭7 | D♭maj7 | Gm7 C7alt |
[A3]
Fmaj7 | Em7♭5 A7♭9 | Dm7 G7 | Cm7 F7 |
B♭7 | Am7 D7 | Gm7 C7 | Fmaj7 C7 |`,

`title: Cotton Tail
by: Duke Ellington
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
form: A A2 B A2
[A]
B♭6 Gm7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
B♭6 B♭7/D | E♭6 E°7 | B♭6/F Gm7 | Cm7 F7 |
[A2]
B♭6 Gm7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
B♭6 B♭7/D | E♭6 E°7 | B♭6/F Gm7 | F7 B♭6 |
[B]
D7 | % | G7 | % |
C7 | % | F7 | % |`,

`title: Countdown
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
[A]
Em7 F7 | B♭maj7 D♭7 | G♭maj7 A7 | Dmaj7 |
Dm7 E♭7 | A♭maj7 B7 | Emaj7 G7 | Cmaj7 |
Cm7 D♭7 | G♭maj7 A7 | Dmaj7 F7 | B♭maj7 |
Em7 | F7 | B♭maj7 | A7 |
Em7 F7 | B♭maj7 D♭7 | G♭maj7 F7 | B♭maj7 A7 |
Dmaj7 B♭maj7 | G♭maj7 Dmaj7 | B♭maj7 G♭maj7 | Dmaj7 |`,

`title: Crystal Silence
by: Chick Corea
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Am
form: A A2 B A
[A]
Am7 | Em7 | Fmaj7♯11 | Bm7 |
B♭maj7♯11 | Am9 | Bm C D7 E7 | Am7 |
B♭maj7♯11 |
[A2]
Am7 | Em7 | Fmaj7♯11 | Bm7 |
B♭maj7♯11 | Am9 | Dm9 | E7♯9 |
Dm9 | E7♯9 | Fmaj7♯11 | G7sus |
Am9 | % |
[B]
Dmaj7 | Am7 | B♭maj7 | Fm7 |
Cmaj7 | Gm7 | B7♭13 | E7sus E7♯9 |`,

`title: Cute
by: Neal Hefti
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[Intro]
B♭6 Am7 A♭7 | Gm7 C7 F6 | N.C. | % |
B♭6 Am7 A♭7 | Gm7 C7 F7 | N.C. | % |
B♭6 Am7 Gm7 B♭m | N.C. | F B♭6 A7 Dm7 | N.C. |
Dm6 Dm/C Bm7♭5 | Bm7 E7 A | N.C. | % |
[Intro2]
B♭6 Am7 A♭7 | Gm7 C7 F6 | N.C. | % |
B♭6 Am7 A♭7 | Gm7 C7 F7 | N.C. | % |
B♭6 Am7 Gm7 B♭m | N.C. | F B♭6 A7 Dm7 | N.C. |
B♭6 Am7 A♭7 | Gm7 C7 F6 | N.C. | % |
[A]
Gm7 | C7 | Am7 | D7 |
Gm7 | C7 | Cm7 | F7 |
B♭maj7 | E♭7 | Am7 | Dm7 |
Bm7♭5 | E7♭9 | Amaj7 | Am7♭5 A♭7 |
[A2]
Gm7 | C7 | Am7 | D7 |
Gm7 | C7 | Cm7 | F7 |
B♭maj7 | E♭7 | Am7 | Dm7 |
Gm7 | C7sus C7♭9 | Fmaj7 Gm7 | Am7 D7♭9 |`,

`title: Darn That Dream
by: Jimmy Van Heusen
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
[A]
G6 B♭m7 E♭7 | Am7 B7♯11 | Em Em/D A7/C♯ Cm7 | Bm7♭5 E7 |
Am7 F7 | Bm7 B♭m7 | Am7 D7 | Bm7 B♭7 Am7 D7 |
[A2]
G6 B♭m7 E♭7 | Am7 B7♯11 | Em Em/D A7/C♯ Cm7 | Bm7♭5 E7 |
Am7 F7 | Bm7 B♭m7 | Am7 D7 | G6 Fm7 B♭7 |
[B]
E♭maj7 Cm7 | Fm7 B♭7 | Gm7 F♯m7 B7 | Fm7 B♭7 |
E♭maj7 Cm7 | Gm | Am7 D7 | B♭m7 E♭7 Am7 D7 |
[A3]
G6 B♭m7 E♭7 | Am7 B7♯11 | Em Em/D A7/C♯ Cm7 | Bm7♭5 E7 |
Am7 F7 | Bm7 B♭m7 | Am7 D7 | G6 Am7 D7 |`,

`title: Daahoud
by: Clifford Brown
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
form: A A B A2
[A]
E♭m7 A♭7 | D♭m7 G♭7 | Bmaj7 | Fm7 B♭7 |
E♭m7 | B7 B♭7 | E♭maj7 | % |
[B]
B♭m7 | E♭7 | A♭maj7 | % |
A♭m7 | D♭7 | G♭maj7 | Fm7 B♭7 |
[A2]
E♭m7 A♭7 | D♭m7 G♭7 | Bmaj7 | Fm7 B♭7 |
E♭m7 | B7 B♭7 | E♭maj7 | % |
G♭maj7 | E♭m7 A♭7 | Cm7♭5 B7 | B♭7 |`,

`title: Days Of Wine And Roses
by: Henry Mancini
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | E♭7♯11 | Am7 | D7♭13 |
Gm7 | % | E♭7♯11 | % |
[B]
Am7 | Dm7 | Gm7 | Gm7/F |
Em7♭5 A7♭9 | Dm7 G7 | Gm7 | C7 |
[A2]
Fmaj7 | E♭7♯11 | Am7 | D7♭13 |
Gm7 | % | E♭9 | % |
[C]
Am7 | Dm7 Dm7/C | Bm7♭5 | E7♭9 |
Am7 Dm7 | Gm7 C7 | F6 | Gm7 C7 |`,

`title: Dear Old Stockholm
by: Traditional
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Dm
form: A A B C
[A]
Dm | Em7♭5 A7♭9 | Gm7 C7 | Fmaj7 |
Em7♭5 A7♭9 | Dm | Em7♭5 | A7♭9 |
Dm7 | Dm6 | Dm7 | Dm6 |
[B]
Fmaj7 | Gm7 C7 | Fmaj7 | Em7♭5 A7♭9 |
[C]
Dm | Em7♭5 A7♭9 | Gm7 C7 | Fmaj7 |
Em7♭5 A7♭9 | Dm | C7sus | % |
C7sus | % | % | % |
C7sus A7♭9 | Dm | % |`,

`title: Dearly Beloved
by: Jerome Kern
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A B A C
[A]
Dm7 | G7 | Dm7 | G7 |
Dm7 | G7 | Dm7 | G7 |
[B]
C6 | Am7 | Dm7 | G7 |
Em7 | Am7 | E♭m7 A♭7 | E♭m7 A♭7 |
[C]
C6 | Am7 | D7 | % |
Dm7 | G7 | C6 | Em7 A7 |`,

`title: Dexterity
by: Charlie Parker
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: B♭
form: A A2 B A2
[A]
B♭maj7 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
Fm7 B♭7 | E♭maj7 A♭7 | Dm7 G7 | Cm7 F7 |
[A2]
B♭maj7 G7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
Fm7 B♭7 | E♭maj7 A♭7 | Cm7 F7 | B♭6 |
[B]
D7 | % | G7 | % |
C7 | % | F7 | % |`,

`title: Dig
by: Miles Davis
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: A♭
[A]
F7 | % | % | % |
B♭7 | % | % | % |
E♭7 | % | % | % |
A♭maj7 | B♭m7 E♭7 | A♭maj7 | Gm7♭5 C7♭9 |
[A2]
F7 | % | % | % |
B♭7 | % | % | % |
Fm | Gm7♭5 C7♭9 | Fm | B♭m7 E♭7 |
A♭7 G7 | G♭7 F7 | B♭7 E♭7 | A♭6 |`,

`title: Dinah
by: Harry Akst
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: G
[A]
Gmaj7 Em7 | Am7 D7 | Gmaj7 Cmaj7 | G/B Em7 |
Am7 | D7 | G6 B♭°7 | Am7 D7 |
[A2]
Gmaj7 Em7 | Am7 D7 | Gmaj7 Cmaj7 | G/B Em7 |
Am7 | D7 | G6 | F♯m7♭5 B7♭9 |
[B]
Em | Em/D♯ | Em/D | A7/C♯ |
Em7 | A7 | Am7 | D7 |
[A3]
Gmaj7 Em7 | Am7 D7 | Gmaj7 Cmaj7 | G/B Em7 |
Am7 | D7 | G6 | Am7 D7 |`,

`title: Django
by: John Lewis
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Fm
[v]
Fm | B♭m | C7♭9 | Fm |
F7♭9 | B♭m | E♭7♭9 | A♭6 |
D♭maj7 | Gm7♭5 | G7♭9/F | C7♭13/E |
Fm | B♭m | C7♭9 | Fm |
Fm | B♭m | C7♭9 | Fm |
[A]
Fm7 Dm7♭5 | G7♭9 C7♭9 | F7♭9 B♭m7 | E♭7 A♭7 |
D♭7 G7♭9 | C7♭9 |
[A2]
Fm7 Dm7♭5 | G7♭9 C7♭9 | F7♭9 B♭m7 | E♭7 A♭7 |
D♭7 C7♭9 | Fm6 |
[B]
F7♭9 | B♭m6/F | F7♭9 | B♭m6/F |
F7♭9 | B♭m6/F | F7♭9 B♭°7/F | F7♭9 |
[C]
B♭m7 Gm7♭5 | C7♭9 F7♭9 | B♭7 E♭m7 | A♭7 D♭7 |
G♭7 | % | D♭7 | % |
G♭7 | % | D♭7 | C7♭9 |`,

`title: Dolphin Dance
by: Herbie Hancock
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
[Intro]
E♭maj7 | D♭maj7/E♭ | E♭maj7 | Dm7♭5 G7♭9 |
[A]
Cm7 | A♭maj7♯11 | Cm7 | Am7 D7 |
Gmaj7 | A♭m7 | Fm7 | G7♯5 |
Cm7 | % | Am7 | D7 |
[B]
Gmaj7 | G7sus | A/G | E♭maj7♯11/G |
F7sus | F13♭9 | F7sus | Em7 A7 |
[C]
E♭7 | Am7 D7 | Bm7 | E7 Dm7 |
C♯m7 | F♯7 |
[D]
Dmaj7/E | Cmaj7/E | Dmaj7/E | Cmaj7/E |
D♭maj7/E♭ | B♭13♭9/E♭ | A♭maj7♯5/E♭ | G7♯5 |`,

`title: Donna Lee
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: A♭
[A]
A♭maj7 | F7 | B♭7 | % |
B♭m7 | E♭7 | A♭maj7 | E♭m7 A♭7 |
D♭maj7 | G♭7 | A♭maj7 | F7 |
B♭7 | % | B♭m7 | E♭7 |
[B]
A♭maj7 | F7 | B♭7 | % |
Gm7♭5 | C7♭9 | Fm | C7♭9 |
Fm | C7♭9 | Fm | B°7 |
Cm7 F7 | B♭m7 E♭7 | A♭maj7 | B♭m7 E♭7 |`,

`title: Don't Blame Me
by: Jimmy McHugh
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 Em7♭5 | A7♭13 | Dm7♭5 G13♭9 | Cmaj7 Am7 |
Dm7♭5 G13♭9 | Em7♭5 A7♭13 | Dm7 G7 | Cmaj7 G7 |
[A2]
Cmaj7 Em7♭5 | A7♭13 | Dm7♭5 G13♭9 | Cmaj7 Am7 |
Dm7♭5 G13♭9 | Em7♭5 A7♭13 | Dm7 G7 | C6 C7 |
[B]
Fmaj7 | E7 | Am7 | % |
D7 | % | Dm7 A♭7♯11 | G7 |
[A3]
Cmaj7 Em7♭5 | A7♭13 | Dm7♭5 G13♭9 | Cmaj7 Am7 |
Dm7♭5 G13♭9 | Em7♭5 A7♭13 | Dm7 G7 | C6 G7 |`,

`title: Don't Get Around Much Anymore
by: Duke Ellington
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A A2 B A
[A]
C6 | % | A7 | % |
D7 | G7 | C6 | G7 |
[A2]
C6 | % | A7 | % |
D7 | G7 | C6 | Gm7 C7 |
[B]
F6 | F♯°7 | Cmaj7 | C7 |
F6 | F♯m7♭5 B7♭9 | Em7 E♭°7 | Dm7 G7 |`,

`title: Doxy
by: Sonny Rollins
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
[A]
B♭7 D7 | G7 | C7 F7 | B♭7 |
B♭7 D7 | G7 | C7 | F7 |
B♭7 | % | E♭7 | E°7 |
B♭7 D7 | G7 | C7 F7 | B♭7 F7 |`,

`title: Easy Living
by: Ralph Rainger
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Fmaj7 F♯°7 | Gm7 G♯°7 | Fmaj7/A Cm7 F7 | B♭maj7 E♭7 |
Fmaj7 Dm7 | Gm7 C7 | Am7 D7 | Gm7 C7 |
[A2]
Fmaj7 F♯°7 | Gm7 G♯°7 | Fmaj7/A Cm7 F7 | B♭maj7 E♭7 |
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 B♭7 | E♭m7 A♭7 |
[B]
D♭maj7 B♭m7 | E♭m7 A♭7 | Fm7 B♭7 | E♭m7 A♭7 |
D♭maj7 D♭maj7/C | B♭m7 B♭m7/A♭ | Gm7 | C7 C7♯5 |
[A3]
Fmaj7 F♯°7 | Gm7 G♯°7 | Fmaj7/A Cm7 F7 | B♭maj7 E♭7 |
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 C7 |`,

`title: Easy To Love
by: Cole Porter
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
form: A B A C
[A]
Am7 | Bm7♭5 E7♭9 | Am7 | D7 |
Gmaj7 | C7 | Bm7 | E7♭9 |
[B]
Am7 | D7 | Gmaj7 C7 | Bm7 E7♭9 |
Am7 | D7 | Gmaj7 C7 | Bm7 E7♭9 |
[C]
Am7 | Cm6 F7 | Gmaj7 C7 | Bm7 B♭°7 |
Am7 | D7 | G6 | Bm7 E7♭9 |`,

`title: East Of The Sun
by: Brooks Bowman
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
form: A B A C
[A]
Gmaj7 | % | Bm7 | E7 |
Am7 | % | Cm7 | F7 |
[B]
Am7 | D7 | F♯m7♭5 B7♭13 | Em7 |
Em7 | A7 | Am7 | D7 |
[C]
Am Am7/G | F♯m7♭5 B7♭9 | Em7 | A7 |
Am7 | F7 | Bm7 | B♭m7 E♭7 |
Am7 | D7 | G6 | % |`,

`title: Emily
by: Johnny Mandel
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: G
time: 3/4
[A]
Gmaj7 | Em7 | Am7 | D7 |
Gmaj7 | G7 | Cmaj7 | F7 |
[B]
Emaj7 | C♯m7 | F♯m7 | B7♭9 |
Em7 | A7 | Am7 | D7♯5 |
[A2]
Gmaj7 | Em7 | Am7 | D7 |
Gmaj7 | G7 | Cmaj7 | B7 |
[C]
Em7 | F♯7♭13 | Bm7 | E7 |
Am7 | D7 | Bm7♭5 | E7♭9 |
C♯m7♭5 | Cm6 | Bm7 | E7♭9 |
Am7 | D7 | Gmaj7 | D7 |`,

`title: Epistrophy
by: Thelonious Monk, Kenny Clarke
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D♭
form: A B C B
[A]
D♭7 D7 | % | % | % |
E♭7 E7 | % | % | % |
[B]
E♭7 E7 | % | % | % |
D♭7 D7 | % | % | % |
[C]
F♯m6 | % | % | % |
B7 | % | D♭7 | D7 |`,

`title: E.S.P.
by: Wayne Shorter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
E7alt | % | Fmaj7 | % |
E7alt | % | E♭maj7♯11 | % |
D7alt | E♭7♯11 | E7alt | Fmaj7 E♭maj7 |
Dm7 | G7 | Gm7 | G♭7 |
E7alt | % | Fmaj7 | % |
E7alt | % | E♭maj7♯11 | % |
D7alt | E♭7♯11 | E7alt | Fmaj7 E♭maj7 |
D♭7♯11 | Gm7 | D♭m7 G♭7 | Fmaj7 |`,

`title: Everything Happens To Me
by: Matt Dennis
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B♭
form: A A2 B A2
[A]
Cm7 F7 | Dm7 D♭°7 | Cm7 F7 | Dm7♭5 G7 |
B°7 Cm7 E♭m7 A♭7 | Dm7 G7 | Cm7 F7 | Dm7 G7 |
[A2]
Cm7 F7 | Dm7 D♭°7 | Cm7 F7 | Dm7♭5 G7 |
B°7 Cm7 E♭m7 A♭7 | Dm7 G7 | Cm7 F7 | B♭6 |
[B]
Fm7 B♭7♯9 | E♭maj7 Cm7 | Fm7 B♭7♭9 | E♭maj7 |
Em7 A7♯9 | Dmaj7 | Gm7 C7 | Cm7 F7 |`,

`title: Every Time We Say Goodbye
by: Cole Porter
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
form: A B A C
[A]
E♭maj7 Fm7 | Gm7 A♭maj7 | Gm7 C7 | Fm7 B♭7 |
Gm7 G♭7 | Bmaj7 Emaj7♯11 | B♭m7 E♭7 | A♭m7 D♭7 |
[B]
E♭maj7/G G♭°7 | Fm7 B♭7 | B♭m7 E♭7 | A♭maj7 |
A♭m7 D♭7 | Gm7 C7 | G♭7♯11 | Fm7 B♭7 |
[C]
Gm7 G♭°7 | Fm7 B♭7 | B♭m7 E♭7 | A♭maj7 A♭m6 |
G7 C7 | Fm7 B♭7 | E♭6 E♭6/B♭ | E♭6 E♭6/B♭ |`,

`title: Falling In Love With Love
by: Richard Rodgers
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 3/4
[A]
B♭maj7 | % | % | % |
Cm7 | % | F7 | % |
Cm7 | % | F7 | % |
B♭maj7 | % | % | % |
% | % | % | % |
Am7♭5 | % | D7♭9 | % |
Gm7 | % | C7 | % |
Cm7 | % | F7 | % |
B♭maj7 | % | % | % |
Cm7 | % | F7 | % |
Cm7 | % | F7 | % |
B♭maj7 | % | % | % |
% | % | % | % |
A♭7♯11 | % | G7♭9 | % |
Cm7 | B°7 | Cm7 | F7 |
B♭maj7 | Gm7 | Cm7 | F7 |`,

`title: Fee-Fi-Fo-Fum
by: Wayne Shorter
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
[A]
E♭7 D7♯9 | Gm7 A♭maj7 | Bmaj7 D7 | Dm7 G7 |
E♭7 D7♯9 | Gm7 A♭maj7 | C7 F7 | B♭7 |
[B]
E♭7 | % | B♭7 | % |
E♭7 | % | B♭m7 E♭7 | Am7 D7 |
[A2]
E♭7 D7♯9 | Gm7 A♭maj7 | Bmaj7 D7 | Dm7 G7 |
E♭7 D7♯9 | D♭maj7 C7 | Bmaj7 | % |`,

`title: Firm Roots
by: Cedar Walton
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
form: A A B
[A]
Fm7 | B♭7 | E♭maj7 | % |
Fm7 | B♭7 | E♭maj7 | % |
Dm7 | G7 | Cmaj7 | % |
Cm7 | F7 | B♭maj7 | % |
[B]
Fm7 | Gm7 | Am7 | B♭m7 |
A♭7sus | % | % | % |
F7sus | % | % | % |`,

`title: For All We Know
by: Fred Coots
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭6 | F7 | Fm7 | Fm7 B♭7 |
E♭maj7 A♭maj7 | Gm7♭5 C7♭13 | Fm7 | A♭m7 D♭7 |
E♭maj7 | G♭°7 | Fm7 | B♭7 |
Cm7 | F7 | Fm7 | B♭7 |
[B]
E♭6 | F7 | Fm7 | Fm7 B♭7 |
E♭maj7 A♭maj7 | Gm7♭5 C7♭13 | Fm7 | A♭m7 D♭7 |
E♭maj7 | Am7 D7 | G7 D♭7♯11 | C7sus C7 |
Fm7 B7♯11 | B♭7sus B♭7 | E♭6 Cm7 | Fm7 B♭7 |`,

`title: Four
by: Miles Davis
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
form: A B A C
[A]
E♭maj7 | % | E♭m7 | A♭7 |
Fm7 | % | A♭m7 | D♭7 |
[B]
E♭maj7/G | F♯m7 B7 | Fm7 | B♭7 |
E♭maj7/G | F♯m7 B7 | Fm7 | B♭7 |
[C]
E♭maj7/G | F♯m7 B7 | Fm7 | B♭7 |
Gm7 G♭m7 | Fm7 B♭7 | E♭maj7 | % |`,

`title: Four Brothers
by: Jimmy Giuffre
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: A♭
form: A A2 B A2
[A]
B♭7 | B♭m7 E♭7♯5 | A♭maj7 | F7 |
B♭m7 | Cm7 F7 | B♭m7 E♭7 | A♭maj7 F7 |
[A2]
B♭7 | B♭m7 E♭7♯5 | A♭maj7 | F7 |
B♭m7 | Cm7 F7 | B♭m7 E♭7 | A♭6 |
[B]
C♯m7 F♯7 | Bmaj7 | Em7 A7 | Dmaj7 |
Dm7 G7 | Cmaj7 C♯°7 | Dm7 G7 | Cm7 F7 |`,

`title: Georgia On My Mind
by: Hoagy Carmichael
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: F
[A]
Fmaj7 | Em7♭5 A7♭9 | Dm Dm/C | G/B B♭m7 E♭7 |
Am7 D7 | Gm7 C7 | Am7 D7 | Gm7 C7♯5 |
[A2]
Fmaj7 | Em7♭5 A7♭9 | Dm Dm/C | G/B B♭m7 E♭7 |
Am7 D7 | Gm7 C7 | F6 | Em7♭5 A7♭9 |
[B]
Dm A7♭9 | Dm B♭7 | Dm A7♭9 | Dm G7/B |
Dm A7♭9 | Dm Bm7♭5 E7 | Am7 D7 | Gm7 C7 |
[A3]
Fmaj7 | Em7♭5 A7♭9 | Dm Dm/C | G/B B♭m7 E♭7 |
Am7 D7 | Gm7 C7 | F6 | Gm7 C7 |`,

`title: A Ghost Of A Chance
by: Victor Young
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 | D♭7♯11 | Gm7 C7 | Fm7 B♭7 |
Em7 E♭°7 | Dm7 G7 | E7 A7 | Dm7 G7 |
[A2]
Cmaj7 | D♭7♯11 | Gm7 C7 | Fm7 B♭7 |
Em7 E♭°7 | Dm7 G7 | Cmaj7 | Em7♭5 A7♭9 |
[B]
Dm7 | G7♯5 | Cmaj7 G7 | Cmaj7 Am7 |
F♯m7♭5 | B7♭9 | Em7 A7 | Dm7 G7♯5 |
[A3]
Cmaj7 | D♭7♯11 | Gm7 C7 | Fm7 B♭7 |
Em7 E♭°7 | Dm7 G7 | Cmaj7 Am7 | Dm7 G7 |`,

`title: Gloria's Step
by: Scott LaFaro
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | E♭maj7 Dmaj7 | D♭maj7 | C7♯9 |
Fm7 | Fmaj7 | E♭maj7 Dmaj7 | D♭maj7 |
C7♯9 | Fm7 |
[B]
Em7 | Fmaj7 | Am7 | Em7♭5 |
Gm7♭5 | Dm7♭5 | Fm7♭5 | B♭m7♭5 |
E♭7♯9♯5 | % |`,

`title: God Bless The Child
by: Herzog-Holiday
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
form: A A2 B A
[A]
E♭ E♭7 A♭6 | E♭ E♭7 A♭6 | B♭m7 E♭7 | B♭m7 E♭7 |
A♭maj7 | A♭m6 | Gm7 C7♭9 | Fm7 B♭7 |
E♭6 | Fm7 B♭7 |
[A2]
E♭ E♭7 A♭6 | E♭ E♭7 A♭6 | B♭m7 E♭7 | B♭m7 E♭7 |
A♭maj7 | A♭m6 | Gm7 C7♭9 | Fm7 B♭7 |
E♭6 | Dm7♭5 G7♭9 |
[B]
Cm Cm(maj7) | Cm7 Cm6 | Gm7 | Dm7♭5 G7♭9 |
Cm Cm(maj7) | Cm7 Cm6 | Gm7 C7 | Fm7 B♭7 |`,

`title: Gone With The Wind
by: Allie Wrubel
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
[A]
Fm7 B♭7 | E♭maj7 C7 | Fm7 B♭7 | E♭maj7 |
Am7 D7 | G6 E7 | Am7 D7 | Gmaj7 |
Gm | F♯°7 | Fm7 | B♭7 |
E♭maj7 D7♯5 | D♭7 C7♭9 | Fm7 | B♭7 |
[B]
Fm7 B♭7 | E♭maj7 C7 | Fm7 B♭7 | E♭maj7 |
Am7 D7 | G6 E7 | Am7 D7 | Gmaj7 |
Fm7 | Cm7 | Fm7 B♭7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | E♭maj7 | Gm7♭5 C7 |`,

`title: Good Bait
by: Tadd Dameron
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
form: A A2 B A
[A]
B♭6 Gm7 | Cm7 F7 | B♭6 Gm7 | Cm7 F7 |
B♭maj7 B♭7 | E♭maj7 A♭7 | Dm D♭7 Cm B7 | B♭6 F7alt |
[A2]
B♭6 Gm7 | Cm7 F7 | B♭6 Gm7 | Cm7 F7 |
B♭maj7 B♭7 | E♭maj7 A♭7 | Dm D♭7 Cm B7 | B♭6 B♭7♯5 |
[B]
E♭6 Cm7 | Fm7 B♭7 | E♭6 Cm7 | Fm7 B♭7 |
E♭maj7 E♭7 | A♭maj7 D♭7 | Gm G♭7 Fm E7 | E♭6 F7 |`,

`title: Goodbye Pork Pie Hat
by: Charles Mingus
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
form: Intro Intro A A2
[Intro]
E♭7♯9 B13 | Emaj9 A7♯11 | D♭9sus B13 | D♭9sus E♭7 |
A♭m7 B13 | Fm7♭5 B♭7♯9♯5 | C13♯11 F13 | B7 Emaj7 |
A13 A♭7 | B♭7 D♭7 | E♭7♯9 B7 | Emaj7♯11 A9♯11 |
[A]
E♭m(maj7) A♭m7 | % | % | E♭m(maj7) A7♯5 |
A♭m A♭m6 | B7 B♭7♭13 | E♭m(maj7) A♭7 | % |
Cm7♭5 F7♯9♯5 | F♯m7 Bm7 B♭7 | E♭m(maj7) A♭7 | % |
[A2]
E♭m(maj7) A♭m7 | % | % | E♭m(maj7) A7♯5 |
A♭m A♭m6 | B7 B♭7♭13 | E♭m(maj7) A♭7 | % |
Cm7♭5 F7♯9♯5 | F♯m7 Bm7 B♭7 | E♭m(maj7) A♭7 | % |
Emaj7♯11 A7♯11 | E♭7♯9 Emaj7 | E♭m(maj7) |`,

`title: Groovin' High
by: Dizzy Gillespie
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
[A]
E♭maj7 | % | Am7 | D7 |
E♭maj7 | % | Gm7 | C7 |
F7 | % | Fm7 | B♭7 |
Gm7 | F♯m7 | Fm7 | B♭7 |
E♭maj7 | % | Am7 | D7 |
E♭maj7 | % | Gm7 | C7 |
F7 | % | Fm7 | B♭7 |
Fm7 | A♭m7 D♭7 | E♭6 | Fm7 B♭7 |`,

`title: Half Nelson
by: Miles Davis
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: C
[A]
Cmaj7 | % | Fm7 | B♭7 |
Cmaj7 | % | Bm7 E7 | B♭m7 E♭7 |
A♭maj7 | % | Am7 | D7 |
Dm7 | G7 | Cmaj7 E♭maj7 | A♭maj7 D♭maj7 |`,

`title: Have You Met Miss Jones?
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | D7 | Gm7 | C7 |
Am7 | Dm7 | Gm7 | C7 |
[A2]
Fmaj7 | D7 | Gm7 | C7 |
Am7 | Dm7 | Cm7 | F7 |
[B]
B♭maj7 | A♭m7 D♭7 | G♭maj7 | Em7 A7 |
Dmaj7 | A♭m7 D♭7 | G♭maj7 | Gm7 C7 |
[A3]
Fmaj7 B♭7 | Am7 D7 | Gm7 | C7 |
Am7 D7 | Gm7 C7 | F6 | Gm7 C7 |`,

`title: Here's That Rainy Day
by: Jimmy Van Heusen
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
form: A B A C
[A]
Gm Gm(maj7)/F♯ | Fm6 B♭7 | E♭maj7 | A♭maj7 |
Am7 | D7 | Gmaj7 | Dm7 G7 |
[B]
Cm7 | F7 | B♭maj7 | E♭maj7 |
Am7 | D7 | Gmaj7 Em7 | Am7 D7 |
[C]
Cmaj7 | Am7 D7 | Bm7 Em7 | A7 |
Am7 | D7 | G6 Em7 | Am7 D7 |`,

`title: Honeysuckle Rose
by: Fats Waller
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
form: A A2 B A
[A]
Gm7 C7 | Gm7 C7 | Gm7 C7 | Gm7 C7 |
F6 F7/A | B♭6 C7 | F6 B♭7 | Am7 D7 |
[A2]
Gm7 C7 | Gm7 C7 | Gm7 C7 | Gm7 C7 |
F6 F7/A | B♭6 C7 | F6 | % |
[B]
F7 | % | B♭6 | % |
G7 | % | C7 | % |`,

`title: Hot House
by: Tadd Dameron
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: C
form: A A B A
[A]
Gm7♭5 | C7♭9 | Fm(maj7) | % |
Dm7♭5 | G7♭9 | Cmaj7 | % |
[B]
Cm7 | F7♭9 | B♭maj7 | % |
A♭7♭9 | % | G7♭9 | % |`,

`title: House Of Jade
by: Wayne Shorter
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: Cm
form: A B A
[A]
Dm7♭5 D♭maj7 | Cm7 D♭7♯11 | E♭7 F7 | D♭7 Cm7 |
Dm7♭5 D♭maj7 | Cm7 F7 | E♭7 D9sus | D♭7 Cm7 |
[B]
E♭13sus | % | % | % |
D13sus | % | Em7 | E♭7♯11 |`,

`title: How Deep Is The Ocean
by: Irving Berlin
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A B A C
[A]
Cm7 | Dm7♭5 G7♭9 | Cm7 | Am7♭5 D7♭9 |
Gm7 | Am7♭5 D7♭9 | Gm7 G♭7 | Fm7 B♭7 |
[B]
E♭7 | % | A♭7 | % |
B7 | % | B♭7 | Dm7♭5 G7♭9 |
[C]
E♭maj7 | Gm7♭5 C7♭9 | Fm7 | A♭m7 D♭7 |
E♭maj7 G7 | Cm7 F7 | Fm7 B♭7 | E♭6 G7♭9 |`,

`title: How High The Moon
by: Morgan Lewis
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
form: A B A C
[A]
Gmaj7 | % | Gm7 | C7 |
Fmaj7 | % | Fm7 | B♭7 |
[B]
E♭maj7 | Am7♭5 D7♭9 | Gm7 | Am7♭5 D7♭9 |
Gmaj7 | Am7 D7 | Bm7 E7 | Am7 D7 |
[C]
E♭maj7 | Am7♭5 D7♭9 | Gmaj7 | Am7 D7 |
Bm7 E7 | Am7 D7 | G6 | Am7 D7 |`,

`title: How My Heart Sings
by: Earl Zindars
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: C
time: 3/4
[A]
Em7 | Am7 | Dm7 | G7 |
Cmaj7 | Fmaj7 | Bm7♭5 | E7♭9 |
Am7 | A♭°7 | Am7/G | F♯m7♭5 |
Emaj7 | G♯m7 C♯7 | F♯m7 | B7 |
Dmaj7/E | Amaj7/E | Dmaj7/E | Amaj7/E |
Cmaj7/D | Gmaj7/D | Cmaj7/D Cmaj7 | B7 |
Am7 | A♭°7 | Am7/G | D7/F♯ |
Em7 | Am7 | A♭7 | G7 |
C6 | Gm7 | F♯m7♭5 | B7♭9 |`,

`title: I Can't Get Started
by: Vernon Duke
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 Am7 | Dm7 G7 | Bm7 E7 B♭m7 E♭7 | Am7 D7 A♭m7 D♭7 |
Cmaj7 Am7 | Dm7 G7 | E7 A7 | D7 G7 |
[A2]
Cmaj7 Am7 | Dm7 G7 | Bm7 E7 B♭m7 E♭7 | Am7 D7 A♭m7 D♭7 |
Cmaj7 Am7 | Dm7 G7 | C6 B♭7 | C6 |
[B]
Em7 A7 | Em7 A7 | Dmaj7 Em7 A7 | Dmaj7 |
Dm7 G7 | Dm7 G7 | Em7 E♭°7 | Dm7 G7sus |
[A3]
Cmaj7 Am7 | Dm7 G7 | Bm7 E7 B♭m7 E♭7 | Am7 D7 A♭m7 D♭7 |
Cmaj7 A7♯5 | Dm7 G7 | C6 A7 | D7 G7 |`,

`title: I Could Write A Book
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A B A C
[A]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 Am7 | Dm7 G7 |
Cmaj7 Dm7 | Em7 A7♯9 | Dm7 | Bm7♭5 E7♭9 |
[B]
Am7 | A♭7 G7 | F♯m7♭5 B7♭9 | Em7 A7 |
Am7 | D7 | Dm7 | G7 |
[C]
Am7 | A♭7 | Gm7♭5 C7♭9 | Fmaj7 B♭7 |
Em7 A7 | Dm7 G7 | C6 | Dm7 G7 |`,

`title: I Fall In Love Too Easily
by: Jule Styne
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
Fm7 B♭7 | E♭maj7 A♭maj7 | Dm7♭5 G7♯9 | Cm A7♭5 |
Dm7♭5 G7♯9 | Cm7 Cm7/B♭ | Am7♭5 D7♭9 | Dm7♭5 G7♭9 |
Am7♭5 D7alt | G7♭9 | Gm7♭5 C7♭9 | Fm7 C7♭9 |
Fm7 A♭m7 D♭7 | G7alt C7♭9 | Fm7 B♭7 | E♭6 C7♭9 |`,

`title: I Got It Bad
by: Duke Ellington
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
form: A A2 B A
[A]
G° Gmaj7 | B7♭13 Em7 | A7 Em7 | A7 |
Am7 | B7 E7 A7 D7 | G6 Em7 | Am7 D7 |
[A2]
G° Gmaj7 | B7♭13 Em7 | A7 Em7 | A7 |
Am7 | B7 E7 A7 D7 | G6 C♯°7 | Dm7 G7 |
[B]
Cmaj7 | % | F7 | % |
Gmaj7 | Bm7 E7 | Am7 | D7 |`,

`title: I Got Rhythm
by: George Gershwin
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
[A]
B♭6 Gm7 | Cm7 F7 | Dm7 Gm7 | Cm7 F7 |
B♭7 B♭7/D | E♭7 E°7 | B♭6/F F7 | B♭6 F7 |
[A2]
B♭6 Gm7 | Cm7 F7 | Dm7 Gm7 | Cm7 F7 |
B♭7 B♭7/D | E♭7 E°7 | B♭6/F F7 | B♭6 |
[B]
D7 | % | G7 | % |
C7 | % | F7 | % |
[A3]
B♭6 Gm7 | Cm7 F7 | Dm7 Gm7 | Cm7 F7 |
B♭7 B♭7/D | E♭7 E°7 | B♭6/F F7 | B♭6 F7 |
B♭6/F E♭9 | Dm7 G7 | Cm7 F7 | B♭6 |`,

`title: I Hear A Rhapsody
by: Fragos-Baker-Gasparre
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A A2 B A
[A]
Cm7 | Fm7 B♭7 | E♭maj7 A♭7 | Gm7♭5 C7♭9 |
Fm7 A♭m7 | Bm7 B♭7 | E♭maj7 | Dm7♭5 G9♯5 |
[A2]
Cm7 | Fm7 B♭7 | E♭maj7 A♭7 | Gm7♭5 C7♭9 |
Fm7 A♭m7 | Bm7 B♭7 | E♭maj7 | Am7♭5 D7♭9 |
[B]
Gm7 | Am7♭5 D7♭9 | Gm7 | Cm7 F7 |
B♭maj7 | Fm7 | Dm7♭5 G7♭9 | G9♯5 |`,

`title: I Let A Song Go Out Of My Heart
by: Duke Ellington
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
[A]
E♭6 A♭7 | E♭maj7 Cm7 | Gm7 C7 | Gm7 C7 |
Fm/A♭ Gm7 Fm7 F♯° | E♭maj7/G A♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
[A2]
E♭6 A♭7 | E♭maj7 Cm7 | Gm7 C7 | Gm7 C7 |
Fm/A♭ Gm7 Fm7 F♯° | E♭maj7/G A♭7 | E♭6 | C7♭9 |
[B]
Fm7 | B♭7 | E♭maj7 | E♭6 G7 |
Cm7 | A♭m7 D♭7 G♭7 | B7 | B♭7♯5 |
[A3]
E♭6 A♭7 | E♭maj7 Cm7 | Gm7 C7 | Gm7 C7 |
Fm/A♭ Gm7 Fm7 F♯° | E♭maj7/G A♭7 | E♭maj7/B♭ B♭7 | E♭6 B♭7 |`,

`title: I Love You
by: Cole Porter
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: F
[A]
Gm7♭5 | C7♭9 | Fmaj7 | % |
Gm7 | C7 | Fmaj7 | % |
Gm7♭5 | C7♭9 | Fmaj7 | Bm7 E7 |
Amaj7 | Bm7 E7 | Amaj7 | % |
[B]
Gm7 | C7 | Fmaj7 | % |
Am7♭5 | D7♭9 | Gm7 | C7 |
Gm7♭5 | C7♭9 | Fmaj7 | Am7♭5 D7♭9 |
G7 | C7 | F6 | % |`,

`title: I Mean You
by: Thelonious Monk
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: Intro A A B A2
[Intro]
E♭7 | % | % | % |
[A]
F6 | % | D♭7 | D7 |
Gm7 | C7 | F6 | % |
[B]
E♭7 | % | F6 | % |
D♭7 | % | G♭7 | % |
[A2]
F6 | % | D♭7 | D7 |
Gm7 | C7 | F6 | % |
F6 | F6 | E♭7 | % |
% | % |`,

`title: I Remember Clifford
by: Benny Golson
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[Intro]
A♭maj7 | B♭7♭9 | G7♭9 G7♭9/B | Cm7 B♭m7 A♭m7 G♭m7 |
Fm7 | B♭7 |
[A]
E♭maj7 G7 | A♭maj7 A°7 | B♭7 B°7 | Cm7 Cm7/B♭ |
Am7♭5 D7♭9 | Gm7 Gm7/F | Em7♭5 A7♭9 | Fm7 B♭7♭9 |
[A2]
E♭maj7 G7 | A♭maj7 A°7 | B♭7 B°7 | Cm7 Cm7/B♭ |
Am7♭5 D7♭9 | Gm7♭5 C7♭9 | Fm7 B♭7♯5 | Gm7 A♭maj7 |
Am7♭5 D7♭9 | Gm7 C7♭9 | Fm7 B♭7alt | E♭maj7 |
[B]
Dm7♭5 G7♭9 | Cm7 Cm7/B♭ | Am7♭5 D7♭9 | Gm7 C7 Fm7 B♭7 |
[A3]
E♭maj7 G7 | A♭maj7 A°7 | B♭7 B°7 | Cm7 Cm7/B♭ |
Am7♭5 D7♭9 | Gm7♭5 C7♭9 | Fm7 B♭7alt | E♭6 Fm7 B♭7 |`,

`title: I Remember You
by: Victor Schertzinger
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | Bm7 E7 | Fmaj7 | Cm7 F7 |
B♭maj7 | B♭m7 E♭7 | Am7 D7 | Gm7 C7 |
[A2]
Fmaj7 | Bm7 E7 | Fmaj7 | Cm7 F7 |
B♭maj7 | B♭m7 E♭7 | Fmaj7 | Cm7 F7 |
[B]
B♭maj7 | Em7 A7 | Dmaj7 | Em7 A7 |
Dmaj7 | Dm7 G7 | Cmaj7 | Gm7 C7 |
[A3]
Fmaj7 | Bm7 E7 | Fmaj7 | Cm7 F7 |
B♭maj7 | B♭m7 E♭7 | Am7 D7 | Bm7♭5 B♭7 |
Am7 D7 | Gm7 C7 | F6 | Gm7 C7 |`,

`title: I Should Care
by: Cahn-Stordahl-Weston
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
Dm7 G7 | Em7 A7 | Dm7 G7 | Cmaj7 |
Em7♭5 | A7♭9 | Dm7 | Fm7 B♭7 |
[B]
Cmaj7 | Bm7♭5 E7♭9 | Gm7 C7 | Fmaj7 |
Bm7♭5 E7♭9 | Am7 | Am7 D7 | Dm7 G7 |
[A2]
F♯m7♭5 B7♭9 | Em7 A7 | Dm7 G7 | Cmaj7 |
Em7♭5 | A7♭9 | Dm7 | Fm7 B♭7 |
[C]
Cmaj7 | Bm7♭5 E7♭9 | Am7 | D7 |
Dm7 | G7 | C6 F7 | Em7 A7 |`,

`title: I Thought About You
by: Jimmy Van Heusen
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
form: A B A C
[A]
Bm7♭5 B♭7♯11 | A7 D7♭13 | G7 A♭7 | G7 |
Gm7 Gm7/F | Em7♭5 A7♭9 | Dm7 D♭7 | Cm7 F7 |
[B]
B♭maj7 | B♭m7 E♭7 | Fmaj7 C7 | Fmaj7 |
Bm7♭5 E7♭9 | Bm7♭5 E7♭9 | Am7 A♭7 | Gm7 C7 |
[C]
B♭maj7 | B♭m7 E♭7 | Fmaj7 Dm7 | Bm7♭5 B♭7♯11 |
Am7 D7 | Gm7 C7 | F6 | Gm7 C7 |`,

`title: I'll Remember April
by: Raye-DePaul
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
[A]
Gmaj7 | G6 | Gmaj7 | G6 |
Gm7 | Gm6 | Gm7 | Gm6 |
Am7♭5 | D7♭9 | Bm7♭5 | E7♭9 |
Am7 | D7 | Gmaj7 | % |
[B]
Cm7 | F7 | B♭maj7 | Gm7 |
Cm7 | F7 | B♭maj7 | % |
Am7 | D7 | Gmaj7 | % |
F♯m7 | B7 | Emaj7 | Am7 D7 |`,

`title: I'm Old Fashioned
by: Jerome Kern
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
F6 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 C7 |
B♭6/F | Fmaj7 | Em7♭5 | A7♭9 |
Dm7 | G7 | Dm7 | G7 |
Gm7 | % | Gm7 | C7 |
[B]
F6 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Bm7 E7 |
Amaj7 Bm7 | C♯m7 D7 | E7 F♯°7 | Gm7 C7 |
[C]
F6 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 C7 |
Cm7 F7 | B♭maj7 E♭7 | Am7 Dm7 | Bm7♭5 B♭m6 |
Am7 Dm7 | Gm7 C7 | F6 Dm7 | Gm7 C7 |`,

`title: I've Grown Accustomed To Her Face
by: Frederick Loewe
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 A♭7♯11 | Gm7 Cm7 | Fm7 | B♭7 |
Am7♭5 D7♭9 | Gm7 C7♭9 | Fm7 C7♭9 | Fm7 B♭7 |
[B]
E♭maj7 A♭7♯11 | Gm7 Cm7 | Fm7 | B♭7 |
Am7♭5 D7♭9 | Gm7 Cm7 | Fm7 B♭7 | D♭7♯11 C7♯9♯5 |
F7 A♭m6 | Gm7 C7♭9 | Fm7 Fm7/B♭ | E♭6 B♭7 |`,

`title: I've Never Been In Love Before
by: Frank Loesser
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
[A]
B♭6 Gm7 | Cm7 F7 | B♭maj7 E♭7 | Dm7 G7 |
Cm7 | F7 | Dm7 G7 | Cm7 F7 |
[A2]
B♭6 Gm7 | Cm7 F7 | B♭maj7 E♭7 | Dm7 G7 |
Cm7 | F7 | B♭maj7 | Fm7 B♭7 |
[B]
E♭maj7 | Cm7 F7 | B♭maj7 | Am7♭5 D7♭9 |
Gm7 Gm7/F | Em7♭5 A7 | Dmaj7 | Cm7 F7 |
[A3]
B♭6 Gm7 | Cm7 F7 | B♭maj7 E♭7 | Dm7 G7 |
Cm7 | F7 | B♭6 | Cm7 F7 |`,

`title: If I Should Lose You
by: Ralph Rainger
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
form: A B A C
[A]
Gm7 | Am7♭5 D7♭9 | Gm7 | Fm7 B♭7 |
E♭maj7 | Fm7 B♭7 | E♭maj7 | % |
[B]
Cm7 | F7 | B♭maj7 | Am7♭5 D7♭9 |
Gm7 | C7 | Cm7 | Am7♭5 D7♭9 |
[C]
Cm7 | F7 | Dm7 | G7 |
Cm7 | F7 | B♭6 | Am7♭5 D7♭9 |`,

`title: If I Were A Bell
by: Frank Loesser
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: F
form: A B A C
[A]
G7 | C7 | Fmaj7 | % |
Am7♭5 | D7 | G7 | C7 |
[B]
F6 F7/A | B♭6 C7 | F6 | Em7♭5 A7 |
Dm7 Dm7/C | Bm7♭5 E7 | Amaj7 | Gm7 C7 |
[C]
F6 F7/A | B♭6 B°7 | F6/C B♭7 | Am7♭5 D7 |
Gm7 | C7 | F6 | Am7♭5 D7 |`,

`title: Impressions
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Dm
form: A A B A
[A]
Dm11 | % | % | % |
Dm11 | % | % | % |
[B]
E♭m11 | % | % | % |
E♭m11 | % | % | % |`,

`title: In A Mellow Tone (In A Mellotone)
by: Duke Ellington
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: A♭
form: A B A C
[A]
B♭7 | E♭7 | A♭6 | % |
E♭m7 | A♭7 | D♭maj7 | % |
[B]
D♭6 | G♭7 | A♭6 | F7 |
B♭7 | % | E♭7 | F7 |
[C]
D♭7 | D°7 | A♭6/E♭ | F7 |
B♭7 | E♭7 | A♭6 | F7 |`,

`title: In a Sentimental Mood
by: Duke Ellington
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Dm
[A]
Dm Dm(maj7) | Dm7 Dm6 | Gm Gm(maj7) | Gm7 Em7♭5 A7 |
Dm | D7 | Gm7 C7♭9 | Fmaj7 Em7♭5 A7 |
[A2]
Dm Dm(maj7) | Dm7 Dm6 | Gm Gm(maj7) | Gm7 Em7♭5 A7 |
Dm | D7 | Gm7 C7♭9 | F6 E♭m7 A♭7 |
[B]
D♭maj7 B♭m7 | E♭m7 A♭7 | D♭6 B♭7♯5 | E♭7 A♭7 |
D♭maj7 B♭m7 | E♭m7 A♭7 | Gm7 | C7 |
[A3]
Dm Dm(maj7) | Dm7 Dm6 | Gm Gm(maj7) | Gm7 Em7♭5 A7 |
Dm | D7 | Gm7 C7♭9 | F6 Em7♭5 A7 |`,

`title: In Walked Bud
by: Thelonious Monk
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: A♭
form: A A2 B A
[A]
Fm | Fm(maj7) | Fm7 | B♭7 E♭7 |
A♭6 F7 | B♭m7 E♭7 | A♭6 | Gm7♭5 C7♭9 |
[A2]
Fm | Fm(maj7) | Fm7 | B♭7 E♭7 |
A♭6 F7 | B♭m7 E♭7 | A♭6 | A♭6 |
[B]
Fm7 | % | D♭7 | % |
Fm7 | % | D♭7 | % |`,

`title: In Your Own Sweet Way
by: Dave Brubeck
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A A B A C
[A]
Am7♭5 D7♭9 | Gm7 C7 | Cm7 F7 | B♭maj7 E♭maj7 |
A♭m7 D♭7 | G♭maj7 Bmaj7 | Cm7♭5 F7♭9 | B♭maj7 |
[B]
Em7 A7♯9 | Dmaj7 | Em7 A7 | Dmaj7 |
Dm7 G7 | Cmaj7 | E♭m7 A♭7 | Dm7 G7 |
[C]
A♭7sus | % | % | % |
A♭7sus | % | % | % |`,

`title: Indiana (Back Home Again In)
by: James Hanley
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
Fmaj7 E♭7 | D7 | G7 | % |
Gm7 | C7 | Fmaj7 | Cm7 F7 |
B♭maj7 | B♭m7 E♭7 | Fmaj7 | D7 |
G7 | % | Gm7 | C7 |
[B]
Fmaj7 E♭7 | D7 | G7 | % |
Em7♭5 | A7♭9 | Dm | Em7♭5 A7♭9 |
Dm | Em7♭5 A7 | Dm Dm7/C | B°7 |
Am7 D7 | Gm7 C7 | F6 F♯°7 | Gm7 C7 |`,

`title: Infant Eyes
by: Wayne Shorter
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
Gm7 | Fm7 | E♭maj7 | A13♭9 |
G♭maj7 | F7sus | E♭m7 | B♭7sus |
B♭7alt |
[B]
E♭maj7 | Emaj7/E♭ | E♭maj7♯11 | Emaj7 |
Bmaj7 | B♭7sus | A♭m7 | E♭7sus |
D7♭9 |
[A2]
Gm7 | Fm7 | E♭maj7 | A13♭9 |
G♭maj7 | F7sus | E♭m7 | B♭7sus |
% |`,

`title: Inner Urge
by: Joe Henderson
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: G
[A]
F♯m7♭5 | % | % | % |
Fmaj7♯11 | % | % | % |
E♭maj7♯11 | % | % | % |
D♭maj7♯11 | % | % | % |
Emaj7♯11 | D♭maj7♯11 | Dmaj7♯11 | Bmaj7♯11 |
Cmaj7 | Amaj7 | B♭7 | Gmaj7 |`,

`title: Invitation
by: Bronislau Kaper
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: Cm
[A]
Cm7 | % | % | % |
Cm7 | F7 | B♭7 | % |
E♭m7 | % | % | % |
E♭m7 | A♭7 | D♭7♯11 | % |
[B]
C♯m7 | F♯7 F♯7alt | Bm7 | % |
Bm7 | E7 E7alt | Am7 | % |
Am7 | D7 D7alt | Gm7 | % |
E♭7♯11 | % | D7♭9 | G7alt |
B7♯11 | % | Fm7♭5 | B♭7♯9 |
E♭m(maj7) | % |`,

`title: Isfahan
by: Strayhorn-Ellington
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D♭
[A]
D♭maj7 | B♭maj7 B♭7♯5 | E♭9 | % |
Amaj7 | A♭13♭9 | D♭maj7 | % |
[B]
Gm7♭5 C7♭9 | Fm6 | Am7♭5 D7♭9 | Gm6 |
Gm7♭5 | C7♭9 | Fmaj7 Emaj7 | E♭maj7 Dmaj7 |
[A2]
D♭maj7 | B♭maj7 B♭7♯5 | E♭9 | % |
Amaj7 | A♭13♭9 | D♭7♯11 | % |
[C]
G♭maj7 | C7♯9 | F7♯11 | B♭7 |
E♭13 | A♭13♭9 A♭9♯5 | D♭6 | E♭m7 A♭7 |`,

`title: Isn't It Romantic?
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A B A C
[A]
E♭6 Cm7 | Fm7 B♭7 | E♭maj7 E°7 | Fm7 B♭7 |
E♭6/G C7 | Fm7 B♭7 | E♭maj7 | B♭m7 E♭7 |
[B]
A♭maj7 | B♭7 G7 | Cm G7/B | B♭m7 E♭7 |
A♭maj7 C7/G | Fm Dm7♭5 G7 | Cm F7 | B♭7alt B♭7 |
[C]
Fm Fm/E♭ | Dm7♭5 G7♭9 | Cm Cm/B♭ | Cm/A A♭m6 |
Gm7 G♭7 | Fm7 B♭7 | E♭6 A♭m6 | E♭6 |`,

`title: Israel
by: John Carisi
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Dm
[A]
Dm | Dm♭6 | Dm6 | D7♯9 |
Gm Gm(maj7) | Gm7 Gm6 | Dm7 Em7 | Fmaj7 |
B♭7 | A7♭9 | Dm F7 | B♭7 A7♭13 |`,

`title: It Could Happen To You
by: Jimmy Van Heusen
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A B A C
[A]
E♭maj7 | E°7 | Fm7 | F♯°7 |
E♭maj7 | A♭maj7 | Gm7♭5 | C7♭9 |
[B]
Fm7 | B♭7 | E♭maj7 | Dm7♭5 G7♭9 |
Cm7 | F7 | Fm7 | B♭7 |
[C]
Fm7 | B♭7 | E♭maj7 A♭7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |`,

`title: It Don't Mean A Thing
by: Duke Ellington
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: B♭
[A]
Gm Gm/F♯ | Gm/F C7/E | E♭7 D7 | Gm |
C7 | C♯°7 | B♭6/D | D7♭5 |
[A2]
Gm Gm/F♯ | Gm/F C7/E | E♭7 D7 | Gm |
C7 | F7 | B♭6 | % |
[B]
Fm7 | B♭7 | E♭6 | % |
Gm7 | C7 | F7 | D7 |
[A3]
Gm Gm/F♯ | Gm/F C7/E | E♭7 D7 | Gm |
C7 | C♯°7 | B♭6 | % |`,

`title: It Might As Well Be Spring
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
[A]
Gmaj7 | Am7 | Bm7 E7 | Am7 D7 |
Gmaj7 | % | Dm7 | G7 |
Cmaj7 | C♯m7♭5 F♯7♭9 | Bm7 | E7 |
Am7 | D7 | Bm7 Em7 | Am7 D7 |
[A2]
Gmaj7 | Am7 | Bm7 E7 | Am7 D7 |
Gmaj7 | % | Dm7 | G7 |
Cmaj7 | C♯m7♭5 F♯7♭9 | Bm7 | E7 |
Am7 | D7 | Gmaj7 | Dm7 G7 |
[B]
Cmaj7 | Am7 | Dm7 | G7 |
Dm7 | G7 | Cmaj7 | Bm7♭5 E7 |
Am7 | Am7/G | F♯m7♭5 | B7♭9 |
Em7 | A7 | Am7 | D7 |
Bm7 | E7 | A7 | % |
Cm7 | F7 | Gmaj7 Gmaj7/F♯ | Em7 Em7/D |
C♯m7♭5 | Cm6 | Bm7 | E7 |
Am7 | D7 | Gmaj7 | % |
Am7 | D7 |`,

`title: It's All Right With Me
by: Cole Porter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Cm
[A]
Cm | Cm(maj7) | Cm7 | Cm6 |
Cm7 | % | Fm7 | % |
F♯°7 | % | Gm7♭5 | C7♭9 |
F7 | % | Dm7♭5 | G7♭9 |
[A2]
Cm | Cm(maj7) | Cm7 | Cm6 |
Cm7 | % | Fm7 | % |
F♯°7 | % | Gm7♭5 | C7♭9 |
Fm7 | B♭7 | E♭6 | % |
[B]
B♭m6/E♭ | % | E♭°7 | % |
A♭°7/E♭ | % | E♭maj7 | % |
B♭m6/E♭ | % | E♭°7 | % |
A♭°7/E♭ | % | Dm7♭5 | G7♭9 |
F7 | % | Fm7 | B♭7 |
E♭maj7 | E♭7/G | A♭maj7 | A°7 |
B♭7sus | B♭7 | E♭6 | G7♭9 |`,

`title: It's You Or No One
by: Jule Styne
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
Gm7 | C7 | Fmaj7 B♭7 | Am7 D7 |
Gm7 | C7 | Fmaj7 | % |
[B]
B♭m7 | E♭7 | A♭maj7 | % |
Cmaj7 Am7 | Dm7 G7 | Gm7 | C7 |
[A2]
Gm7 | C7 | Fmaj7 B♭7 | Am7 D7 |
Gm7 | C7 | Am7♭5 | D7♭9 |
[C]
Bm7♭5 | B♭m7 E♭7 | Am7 Dm7 | A♭m7 D♭7 |
Gm7 | C7 | F6 | Am7 D7 |`,

`title: Jitterbug Waltz
by: Fats Waller
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: E♭
time: 3/4
form: A B A B2
[A]
E♭maj7 | % | % | % |
A♭7 | % | % | % |
E♭maj7 | % | % | % |
Gm7 | C7 | Gm7 | C7 |
[B]
F7 | % | % | % |
A♭m7 | % | D♭7♯11 | % |
F7 | % | B♭7 | % |
Gm7 | C7 | Fm7 | B♭7 |
[B2]
F7 | % | % | % |
A♭m7 | % | D♭7♯11 | % |
F7 | % | B♭7 | % |
E♭6 | A♭7 | E♭6 | B♭7 |`,

`title: Joy Spring
by: Clifford Brown
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
Fmaj7 | Gm7 C7 | Fmaj7 | B♭m7 E♭7 |
Am7 A♭7 | Gm7 C7 | Fmaj7 | A♭m7 D♭7 |
[B]
G♭maj7 | A♭m7 D♭7 | G♭maj7 | Bm7 E7 |
B♭m7 A7 | A♭m7 D♭7 | G♭maj7 | Am7 D7 |
[C]
Gmaj7 | Gm7 C7 | Fmaj7 | Fm7 B♭7 |
E♭maj7 | A♭m7 D♭7 | G♭maj7 | Gm7 C7 |
[A2]
Fmaj7 | Gm7 C7 | Fmaj7 | B♭m7 E♭7 |
Am7 A♭7 | Gm7 C7 | Fmaj7 | Gm7 C7 |`,

`title: Juju
by: Wayne Shorter
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B
time: 3/4
[A]
B7♯5 | % | % | % |
B7♯5 | % | % | % |
B♭7♯5 | % | A7 | % |
A♭maj7 | % | Em7 | % |
Fmaj7 | % | Bm7 | % |
Fmaj7 | % | Bm7 | % |`,

`title: Just Friends
by: John Klenner
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
form: A B A C
[A]
Cmaj7 | % | Cm7 | F7 |
Gmaj7 | % | B♭m7 | E♭7 |
[B]
Am7 | D7 | Gmaj7 | Em7 |
A7 | % | Am7 D7 | Dm7 G7 |
[C]
Am7 | D7 | F♯m7♭5 B7♭9 | Em7 |
A7 | Am7 D7 | G6 | Dm7 G7 |`,

`title: Just In Time
by: Jule Styne
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
[A]
B♭maj7 | % | Am7♭5 | D7♭9 |
G7 | % | C7 | % |
F7 | % | B♭7 | % |
E♭maj7 | % | A♭maj7 | Am7♭5 D7♭9 |
[B]
Gm7 | Gm/F♯ | Gm/F | C7 C♯°7 |
B♭6 | % | A♭7 | G7 |
C7 | F7 | Dm7 | Gm7 |
C7 | Cm7 F7 | B♭6 | Cm7 F7 |`,

`title: Just One Of Those Things
by: Cole Porter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
Dm6 | % | Em7♭5 | A7♭9 |
F7 | % | Bm7♭5 | B♭m6 |
Am7 | A♭7 | Gm7 | C7 |
F6 | D7 | Gm7 Gm7/F | Em7♭5 A7♭9 |
[A2]
Dm6 | % | Em7♭5 | A7♭9 |
F7 | % | Bm7♭5 | B♭m6 |
Am7 | A♭7 | Gm7 | C7 |
F6 | % | Fm7 | B♭7 |
[B]
E♭6 | E°7 | Fm7 | B♭7 |
E♭6 | % | Dm7 | G7 |
C6 | Am7 | F♯m7♭5 | Fm6 |
Em7 | E♭7 | Gm7 C7 | Em7♭5 A7♭9 |
F6 | % | Em7♭5 | A7♭9 |`,

`title: Lament
by: J.J. Johnson
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Fm
[A]
Fm | E♭m7 A♭7 | D♭maj7 | Gm7♭5 C7♭9 |
Fmaj7 | Dm7 | Gm7 | Em7♭5 A7♭9 |
[B]
Dm Dm/C B♭ | Am7 Dm7 | Gm7 | Em7♭5 A7♭9 |
Dm | E♭m7 A♭7 | D♭maj7 | Gm7♭5 C7♭9 |
[A2]
Fm | E♭m7 A♭7 | D♭maj7 | Gm7♭5 C7 |
Fmaj7 | Dm7 | Gm7 | Em7♭5 A7♭9 |
[C]
Dm Dm/C B♭ | Am7 Dm7 | Bm7♭5 | B♭m7 E♭7 |
Fmaj7 Dm7 | D♭7 C7 | Fmaj7 | Gm7♭5 C7♭9 |`,

`title: Laura
by: David Raksin
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A B A C
[A]
Am9 | D7♭9 | G6 | % |
Gm9 | C7♭9 | Fmaj7 | % |
[B]
Fm7 | B♭7sus B♭7♭9 | E♭maj7 | Cm7 |
Am7♭5 D7♭5 | D7 | Gmaj7 | E7♭13 |
[C]
Fm7 Fm7/E♭ | Dm7♭5 G7♭9 | Cmaj7 F7 | Em7 Am7 |
D7♭9 | G7 | C6 | Bm7♭5 E7♭9 |`,

`title: Lazy Bird
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: G
[A]
Am7 D7 | Cm7 F7 | Fm7 | B♭7 |
E♭maj7 | Am7 D7 | Gmaj7 | A♭m7 D♭7 |
[A2]
Am7 D7 | Cm7 F7 | Fm7 | B♭7 |
E♭maj7 | Am7 D7 | Gmaj7 | % |
[B]
Bm7 | E7 | Amaj7 | B♭m7 E♭7 |
Am7 | D7 | Gmaj7 | A♭m7 D♭7 |
[A3]
Am7 D7 | Cm7 F7 | Fm7 | B♭7 |
E♭maj7 | Am7 D7 | Gmaj7 | % |
F7♯11 | E♭7 | Am7 | D7♭9 |
Gmaj7 | C7♭9 | Fmaj7 | B♭7♭9 |
E♭7 | A♭maj7 | D♭7♯11 |`,

`title: Like Someone In Love
by: Jimmy Van Heusen
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A B A C
[A]
E♭maj7 G7/D | Cm7 Cm7/B♭ | Am7♭5 A♭7 | Gm7 C7 |
Fm7 | Am7 D7 | E♭maj7 | B♭m7 E♭7 |
[B]
A♭maj7 | Dm7 G7 | Cmaj7 | % |
Cm7 | F7 | Fm7 | B♭7♯5 |
[C]
A♭maj7 | Dm7 G7 | Cmaj7 | F♯°7 |
Gm7 C7 | Fm7 B♭7 | E♭6 | Fm7 B♭7 |`,

`title: Limehouse Blues
by: Braham-Furber
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: A♭
[A]
D♭7 | % | % | % |
B♭7 | % | % | % |
A♭6 | % | C7 | Fm7 |
B♭7 | % | B♭m7 | E♭7 D7 |
[B]
D♭7 | % | % | % |
B♭7 | % | % | % |
A♭6 | F7 | B♭m7 | D♭m6 |
A♭6/C B°7 | B♭m7 E♭7 | A♭6 | % |`,

`title: Little Sunflower
by: Freddie Hubbard
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: Dm
form: A A B B A A
[A]
Dm7 | % | % | % |
% | % | % | % |
[B]
E♭maj7 | % | % | % |
Dmaj7 | % | % | % |`,

`title: Love For Sale
by: Cole Porter
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: B♭m
form: A A B
[A]
E♭maj7 | % | B♭m7 | % |
E♭maj7 | % | B♭m7 | % |
E♭m7 | A♭7 | D♭maj7 | G♭7 |
Cm7♭5 | F7♭13 | B♭m6 | % |
[B]
E♭m7 | A♭7 | D♭maj7 | B♭7 |
E♭m7 | A♭7 | D♭maj7 | % |
B♭7 | B7 B♭7 | E♭m6 | % |
Gm7♭5 C7♭9 | Gm7♭5 C7♭9 | F♯m7 B7 | Fm7♭5 B♭7 |`,

`title: Lover Man
by: Davis-Ramirez-Sherman
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Dm7 G7 | Dm7 G7 | Gm7 C7 | Gm7 C7 |
F7 | B♭7 | A♭m7 D♭7 Gm7 C7 | Fmaj7 Em7♭5 A7 |
[A2]
Dm7 G7 | Dm7 G7 | Gm7 C7 | Gm7 C7 |
F7 | B♭7 | A♭m7 D♭7 Gm7 C7 | Fmaj7 E7♭9 |
[B]
Am Am(maj7) | Am7 D7 | Gmaj7 Am7 | Bm7 Am7 D7 |
Gm Gm(maj7) | Gm7 C7 | Fmaj7 | Em7♭5 A7♭9 |
[A3]
Dm7 G7 | Dm7 G7 | Gm7 C7 | Gm7 C7 |
F7 | B♭7 | A♭m7 D♭7 Gm7 C7 | Fmaj7 |`,

`title: Lullaby Of Birdland
by: George Shearing
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: A♭
[A]
Fm Dm7♭5 | G7 C7 | Fm | B♭m7 E♭7 |
Cm7 Fm7 | B♭m7 E♭7 | A♭maj7 | Gm7♭5 C7♭9 |
[A2]
Fm Dm7♭5 | G7 C7 | Fm | B♭m7 E♭7 |
Cm7 Fm7 | B♭m7 E♭7 | A♭maj7 E♭7 | A♭6 |
[B]
Cm7♭5 F7♭9 | B♭m7 | B♭m7 E♭7♭9 | A♭maj7 |
Cm7♭5 F7♭9 | B♭m7 | B♭m7 E♭7♭9 | A♭maj7 C7♭9 |
[A3]
Fm Dm7♭5 | G7 C7 | Fm | B♭m7 E♭7 |
Cm7 Fm7 | B♭m7 E♭7 | A♭maj7 E♭7 | A♭6 Gm7♭5 C7 |`,

`title: Lush Life
by: Billy Strayhorn
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: D♭
[v]
D♭6 C♭9 | D♭maj7 C♭9 | D♭maj7 C♭9 | D♭ E♭m7 Fm7 G♭m7 |
A♭m7 D13♯11 | Fm7 D9♯11 | D♭m6 D13♯11 |
[v2]
D♭6 C♭9 | D♭maj7 C♭9 | D♭maj7 C♭9 | D♭ E♭m7 Fm7 G♭m7 |
A♭m7 D13♯11 | Fm7 D9♯11 | D♭m6 Gm7♭5 C7 | Fm6 |
% | % | Gm7♭5 C7 | Fm6 |
% | % | A♭13 | B9♯11 |
B♭9 | E♭m7 | A7♯11 | E♭m7 |
D7♯11 |
[A]
D♭maj7 D7♯11 | % | D♭6 F♯m7 B7 | Emaj7 D7♯11 |
D♭maj7 D7♯11 | % | D♭6 D♭7 C7 | Fmaj7 A7 |
A♭maj7 E♭7♭9 | A♭maj7 Em7 A7 | Dmaj7 Dm7 G7 | Cmaj7 A♭7 |
[B]
D♭maj7 D7♯11 | % | D♭6 C7 B7 | Fm7 B♭7 |
F♯m7 B7 | A7♯5 A♭7 | D♭maj7 G♭7 | Fm7 B♭7 |
F♯m7 B7 | A7♯5 A♭7 | A♭7 A7 B♭7 B7 | C7 D7 D♭ A♭7 |
D♭maj7 D7♯11 | D♭maj7 D7♯11 |`,

`title: Mack The Knife
by: Weill-Brecht
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
[A]
B♭6 | % | Cm7 | % |
F7 | % | B♭6 | % |
Gm7 | % | Cm7 | % |
Cm7 | Cm7 F7 | B♭6 | % |`,

`title: Mean To Me
by: Turk-Ahlert
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: A A2 B A
[A]
Fmaj7 F♯°7 | Gm7 C7 | Fmaj7 Cm7 F7 | B♭maj7 E♭7 |
Am7 D7 | Gm7 C7 | F6 Dm7 | G7 C7 |
[A2]
Fmaj7 F♯°7 | Gm7 C7 | Fmaj7 Cm7 F7 | B♭maj7 E♭7 |
Am7 D7 | Gm7 C7 | F6 Dm7 | F6 Cm7 F7 |
[B]
B♭maj7 Gm7 | Cm7 F7 | B♭6 | E♭7 D7 |
Gm7 | E♭7 D7 | G7 | C7 |`,

`title: Memories Of Tomorrow
by: Keith Jarrett
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: Am
[A]
Am | Am(maj7) | Am7 | Em7 |
F | C | G9sus | C |
[B]
D/F♯ | F | C | E♭maj7 A7 |
A♭maj7 Gm | Fm7 | B♭9sus | C |
E7sus E7 | Am Fm/A♭ | Cmaj7/G D/F♯ | Fmaj7 Fm |
C/G | G9sus | C | E7sus E7 |`,

`title: Milestones (New)
by: Miles Davis
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Gm
form: A A B A
[A]
Gm7 | % | % | % |
% | % | % | % |
[B]
Am | % | % | % |
% | % | % | % |
% | % | % | % |
% | % | % | % |`,

`title: Minority
by: Gigi Gryce
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Fm
[A]
Fm(maj7) | Fm6 | Gm9 | C13 |
Fm(maj7) | Fm6 | Cm9 | F13 |
B♭m9 | E♭13 | A♭m9 | D♭13 |
F♯m9 | B13 | Gm9 | C7♭13 |`,

`title: Moment's Notice
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
[A]
Em7 A7 | Fm7 B♭7 | E♭maj7 | A♭m7 D♭7 |
Dm7 G7 | E♭m7 A♭7 | D♭maj7 | Dm7 G7 |
Cm7 B7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
Gm7 C7 | A♭m7 D♭7 | G♭6 | Fm7 B♭7 |
Em7 A7 | Fm7 B♭7 | E♭maj7 | A♭m7 D♭7 |
Dm7 G7 | E♭m7 A♭7 | D♭maj7 | Dm7 G7 |
Cm7 B7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
Gm7 C7 | Fm7 B♭7 | E♭6/B♭ | Fm7/B♭ |
Gm7/B♭ | Fm7/B♭ | E♭6/B♭ Fm7/B♭ | Gm7/B♭ Fm7/B♭ |
E♭6 N.C. | N.C. |`,

`title: Monk's Dream
by: Thelonious Monk
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A A B A
[A]
Cmaj7 F7 | B♭7♯11 | Cmaj7 F7 | B♭7♯11 |
Cmaj7 F7 | Bm7 B♭7♯11 | A7♯11 A♭7♯11 | G7♯11 |
[B]
C7 | % | % | % |
C7 | % | % | % |`,

`title: Mood Indigo
by: Duke Ellington
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
[A]
A♭maj7 | B♭7 | E♭m7 E♭7♯5 | A♭maj7 |
A♭maj7 | B♭7 | E7 | E♭7 |
A♭maj7 | A♭7 | D♭6 | G♭7 |
A♭maj7 | B♭7 | E♭m7 E♭7♯5 | A♭maj7 |
[B]
A♭maj7 F7 | B♭7 | B♭m7 E♭7 | A♭maj7 E♭7 |
A♭maj7 F7 | B♭7 | E7 | E♭7 |
A♭maj7 | A♭7 | D♭6 | G♭7 |
A♭maj7 F7 | B♭7 | B♭m7 E♭7 | A♭6 E♭7 |`,

`title: Moonlight In Vermont
by: Karl Suessdorf
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
form: A A B A2
[A]
E♭6 Cm7 | Fm7 B♭7 | E♭6 Cm7 | D♭7 |
Fm7 B♭7sus | E♭6 |
[B]
Am7 D7 | Gmaj7 Em7 | Am7 D7 | Gmaj7 |
B♭m7 E♭7 | A♭maj7 Fm7 | B♭m7 E♭7 |
[A2]
A♭maj7 B♭7♭9 | E♭6 Cm7 | Fm7 B♭7 | E♭6 Cm7 |
D♭7 | Fm7 B♭7sus | E♭6 | F7 B♭7 E7 |
E♭6 |`,

`title: Moon River
by: Henry Mancini
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: C
time: 3/4
form: A B A C
[A]
Cmaj7 | Am7 | Fmaj7♯11 | Cmaj7/E |
Fmaj7♯11 | Cmaj7/E | Bm7♭5 | E7♭9 |
[B]
Am | Am7/G | Fmaj7 | B♭7♯11 |
Am Am/G | F♯m7♭5 B7♭9 | Em7 A7 | Dm7 G7 |
[C]
Am7 | Am7/G | F♯m7♭5 | Fmaj7♯11 |
Cmaj7/E | Fmaj7♯11 | Cmaj7/E | F7 |
Em7 | Am7 | Dm7 | G7 |
C6 | G7 |`,

`title: Moose The Mooche
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
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

`title: More Than You Know
by: Vincent Youmans
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
C6 G7♯5 | Gm7 C7 | Fmaj7 Em7 A7 | Dm7 Fm6 |
G7 A♭7♯11 | Dm7 G7 | Em7 A7 | Dm7 G7 |
[A2]
C6 G7♯5 | Gm7 C7 | Fmaj7 Em7 A7 | Dm7 Fm6 |
Em7 A7 | Dm7 G7 | C6 | F♯m7♭5 B7♭13 |
[B]
Em7 C♯m7♭5 | F♯m7♭5 B7♯9 | Em7 | Am7 D7 |
Gmaj7 Em7 | Am7 D7 | Dm7 | G7 |
[A3]
C6 G7♯5 | Gm7 C7 | Fmaj7 Em7 A7 | Dm7 Fm6 |
Em7 A7 | Dm7 G7 | C6 Am7 | Dm7 G7 |`,

`title: My Favorite Things
by: Richard Rodgers
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Em
time: 3/4
form: A A B C C2
[A]
Em7 | F♯m7 | Em7 | F♯m7 |
Cmaj7 | % | % | % |
Am7 | D7 | Gmaj7 | Cmaj7 |
Gmaj7 | Cmaj7 | F♯m7♭5 | B7♭9 |
[B]
Emaj7 | F♯m7 | Emaj7 | F♯m7 |
Amaj7 | % | % | % |
Am7 | D7 | Gmaj7 | Cmaj7 |
Gmaj7 | Cmaj7 | F♯m7♭5 | B7♭9 |
[C]
Em7 | % | F♯m7♭5 | B7♭9 |
Em7 | % | Cmaj7 | % |
Cmaj7 | % | A7 | % |
Gmaj7 | Cmaj7 | % | D7 |
[C2]
G6 | Cmaj7 | G6 | Cmaj7 |
Gmaj7 | Cmaj7 | F♯m7♭5 | B7♭9 |`,

`title: My Foolish Heart
by: Victor Young
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B♭
[A]
B♭maj7 E♭maj7 | Dm7 G7 | Cm7 | Em7 A7♭9 |
B♭maj7 D7♯9 | Gm7 | Cm7 | Cm7 F7♭9 |
[B]
B♭maj7 | Fm7 B♭7 | E♭6 | Am7♭5 D7♭9 |
Gm7 D7♭13 | Gm7 C7 | Cm7 G7 | Cm7 F7 |
[A2]
B♭maj7 E♭maj7 | Dm7 G7 | Cm7 | Em7 A7♭9 |
B♭maj7 D7♭9 | Gm7 | Cm7 Cm7/B♭ | Am7♭5 D7♭9 |
[C]
Gm7 | E♭m7 A♭7 | B♭maj7 E♭maj7 | A♭7 G7 |
Cm7 G7 | C7 F7 | B♭maj7 G7 | Cm7 F7sus |`,

`title: My Funny Valentine
by: Richard Rodgers
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
Cm6 | Dm7♭5 G7♭9 | Cm7 | F7 |
A♭maj7 | Fm7 | Dm7♭5 | G7♭9 |
[A2]
Cm6 | Dm7♭5 G7♭9 | Cm7 | F7 |
A♭maj7 | Fm7 | Fm7♭5 | B♭7 |
[B]
E♭maj7 Fm7 | Gm7 Fm7 | E♭maj7 Fm7 | Gm7 Fm7 |
E♭maj7 G7♭9 | Cm7 B7 B♭m7 A7 | A♭maj7 | Dm7♭5 G7♭9 |
[C]
Cm6 | Dm7♭5 G7♭9 | Cm7 | F7 |
A♭maj7 | Dm7♭5 G7♭9 | Cm7 B7 | B♭m7 E♭7 |
A♭maj7 | Fm7 B♭7 | E♭6 | Dm7♭5 G7♭9 |`,

`title: My One And Only Love
by: Wood-Mellin
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 Am7 | Dm7 G7 G♯° | Am7 Fmaj7 | Em7 A7 |
Dm7 G7 G♯° | Am7 D7 | Dm7 G7 | Em7 A7 Dm7 G7 |
[A2]
Cmaj7 Am7 | Dm7 G7 G♯° | Am7 Fmaj7 | Em7 A7 |
Dm7 G7 G♯° | Am7 D7 | Dm7 G7 | C6 F♯m7♭5 B7 |
[B]
Em7 | F♯m7♭5 B7♭9 | Em7 | F♯m7♭5 B7♭9 |
Em Em(maj7) | Em7 A7 | Dm7 A7 | Dm7 G7 |
[A3]
Cmaj7 Am7 | Dm7 G7 G♯° | Am7 Fmaj7 | Em7 A7 |
Dm7 G7 G♯° | Am7 D7 | Dm7 G7 | C6 G7 |`,

`title: My Romance
by: Richard Rodgers
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
form: A B A C
[A]
Cmaj7 Fmaj7 | Em7 E♭°7 | Dm7 G7 | Cmaj7 E7 |
Am7 E7 | Am7 A7 | Dm7 G7 | Cmaj7 C7 |
[B]
Fmaj7 B♭7 | Cmaj7 C7 | Fmaj7 B♭7 | Cmaj7 |
F♯m7♭5 B7♭9 | Em7 B♭7 | Am7 D7 | Dm7 G7 |
[C]
Fmaj7 A7 | Dm7 Dm7/C | Bm7♭5 E7♭9 | Am7 A♭7 |
Cmaj7/G Am7 | Dm7 G7 | C6 Am7 | Dm7 G7 |`,

`title: My Shining Hour
by: Harold Arlen
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
Cmaj7 | Am7 | Dm7 | G7 |
Cmaj7 | Am7 | Bm7♭5 | E7♭9 |
Am | % | Bm7♭5 | E7♭9 |
Am7 | D7 | Dm7 | G7 |
[B]
Gm7 | C7 | Fmaj7 | % |
Fm7 | B♭7 | C6/E E♭°7 | Dm7 G7 |
Cmaj7 | % | Cmaj7 Dm7 | Em7 E♭°7 |
Dm7 | G7 | C6 | Dm7 G7 |`,

`title: Naima
by: John Coltrane
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
form: A A B A2
[A]
B♭m7/E♭ | E♭m9 | Amaj7/E♭ Gmaj7/E♭ | A♭maj7/E♭ |
[B]
Bmaj7/B♭ | B♭13♭9 | Bmaj7/B♭ | B♭13♭9 |
E7♯11/B♭ | Bmaj7/B♭ | A♭maj7/B♭ | Emaj7♯11/B♭ |
[A2]
B♭m7/E♭ | E♭m9 | Amaj7/E♭ Gmaj7/E♭ | A♭maj7/E♭ |
Amaj7/E♭ Gmaj7/E♭ | A♭maj7/E♭ | Amaj7/E♭ Gmaj7/E♭ | A♭maj7/E♭ |
Amaj7/E♭ Gmaj7/E♭ | A♭maj7 D♭maj7 | A♭maj7 D♭maj7 | A♭maj7 D♭maj7 |
A♭maj7 |`,

`title: Nardis
by: Miles Davis
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Em
form: A A B A
[A]
Em7 | Fmaj7 | B7 | Cmaj7 |
Am7 | Fmaj7 | Emaj7 | Em7 |
[B]
Am7 | Fmaj7 | Am7 | Fmaj7 |
Dm7 | G7 | Cmaj7 | Fmaj7 |`,

`title: Night And Day
by: Cole Porter
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
A♭maj7 | G7 | Cmaj7 | % |
A♭maj7 | G7 | Cmaj7 | % |
F♯m7♭5 | Fm7 | Em7 | E♭°7 |
Dm7 | G7 | Cmaj7 | % |
[A2]
A♭maj7 | G7 | Cmaj7 | % |
A♭maj7 | G7 | Cmaj7 | % |
F♯m7♭5 | Fm7 | Em7 | E♭°7 |
Dm7 | G7 | Cmaj7 | B♭7 |
[B]
E♭maj7 | % | Cmaj7 | % |
E♭maj7 | % | Cmaj7 | % |
F♯m7♭5 | Fm7 | Em7 | E♭°7 |
Dm7 | G7 | C6 | % |`,

`title: Nostalgia In Times Square
by: Charles Mingus
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: F
[A]
F7 E♭7 | F7 E♭7 | F7 E♭7 | F7 E♭7 |
A♭m7 D♭7 | A♭m7 D♭7 | F7 E♭7 | F7 E♭7 |
Dm7 G7 | Cm7 F7 | B♭m7 E♭7 | F7 |`,

`title: Nuages
by: Django Reinhardt
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: G
[A]
B♭m6 | D7/A | G6 | % |
B♭m6 | D7/A | G6 D7/A | G6/B |
B7/F♯ | B7 | Em6 | % |
A7 A♭7 | A7 | D7 | % |
[B]
B♭m6 | D7/A | G6 | % |
A♭7 | G7 | C | % |
Cm6 | % | G6 | % |
B♭m6 | D7/A | G6 D7 | G6 |`,

`title: Old Devil Moon
by: Burton Lane
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
F6 | E♭6 | F6 | E♭6 |
F6 | E♭6 | F7sus | F7 |
B♭maj7 | % | B♭m7 | E♭7 |
A♭m7 D♭7 | G♭maj7 C7 | F6 | E♭6 |
F6 | E♭6 | Dmaj7 | % |
Dm7 | G7 | Gm7 | C7 |
F6 | E♭6 | F6 | E♭6 |
F6 | E♭6 | F7sus | F7 |
B♭maj7 | % | B♭m7 | E♭7 |
A♭m7 D♭7 | G♭maj7 C7 | F6 | E♭6 |
F6 | E♭6 | F6 | E♭6 |
Am7 D7 | Gm7 C7 | F6 | E♭6 |`,

`title: On A Clear Day
by: Burton Lane
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
[A]
Gmaj7 | % | C7♯11 | % |
Gmaj7 | % | Bm7 | E7♭9 |
Am7 | % | F7♯11 | % |
Bm7 | B♭°7 | Am7 | D7 |
[B]
Dm7 | G7 | Dm7 | G7 |
Cmaj7 | A7 | Am7 | D7 |
[C]
Gmaj7 | % | Bm7 | E7♭9 |
Am7 Bm7 | Cmaj7 Bm7 | Am7 | D7 |
G6 | Am7 D7 |`,

`title: On Green Dolphin Street
by: Bronislau Kaper
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
form: A B A C
[A]
E♭maj7 | % | E♭m7 | % |
F7/E♭ | Emaj7/E♭ | E♭maj7 | C7 |
[B]
Fm7 | B♭7alt | E♭maj7 | % |
A♭m7 | D♭7alt | G♭maj7 | Fm7 B♭7 |
[C]
Fm7 Fm7/E♭ | Dm7♭5 G7♭9 | Cm7 Cm7/B♭ | Am7♭5 D7♭9 |
Gm7 C7 | Fm7 B♭7 | E♭6 | Fm7 B♭7 |`,

`title: On The Sunny Side Of The Street
by: Jimmy McHugh
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
C6 | E7 | Fmaj7 | C6/G E7♭9/G♯ |
Am7 | D7 | Dm7 G7 | Em7 A7 Dm7 G7 |
[A2]
C6 | E7 | Fmaj7 | C6/G E7♭9/G♯ |
Am7 | D7 | Dm7 G7 | C6 |
[B]
Gm7 | C7 | Fmaj7 | % |
Am7 | D7 | Dm7 | G7 |
[A3]
C6 | E7 | Fmaj7 | C6/G E7♭9/G♯ |
Am7 | D7 | Dm7 G7 | C6 G7 |`,

`title: Ornithology
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: G
form: A B A C
[A]
Gmaj7 | % | Gm7 | C7 |
Fmaj7 | % | Fm7 | B♭7 |
[B]
E♭7 | Am7♭5 D7♭9 | Gm7 | Am7♭5 D7♭9 |
Bm7 | E7 | Am7 | D7 |
[C]
E♭7 | Am7♭5 D7♭9 | Gmaj7 | Am7 D7 |
Bm7 E7 | Am7 D7 | G6 | Am7 D7 |`,

`title: Our Love is Here to Stay
by: George Gershwin
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: A B A C
[A]
G7 | Gm7 C7 | F6 B♭7 | Am7 D7 |
G7 | Gm7 C7 | E♭7 D7 | Bm7 E7 |
[B]
Am7 D7 | Gm7 C7 | Fmaj7 B♭maj7 | Em7♭5 A7 |
Dm7 | G7 | Gm7 | C7 D7 |
[C]
Am7 D7 | Gm7 C7 | E♭7 D7 | Gm7 G♯°7 |
Am7 D7 | Gm7 C7 | F6 | D7 |`,

`title: Out Of Nowhere
by: Johnny Green
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
form: A B A C
[A]
Gmaj7 | % | B♭m7 | E♭7 |
Gmaj7 | % | Bm7 | E7♭9 |
[B]
Am7 | E7♭9 | Am7 | % |
E♭7 | % | Am7 | D7 |
[C]
Am7 | E7♭9 | Am7 | Cm6 |
Bm7 B♭°7 | Am7 D7 | G6 | Am7 D7 |`,

`title: Pannonica
by: Thelonious Monk
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A A B A2
[A]
Cmaj7 | E♭m7 A♭7 | Dm7 B♭7 | E♭maj7 A7♯11 |
A♭7 D♭7 | G♭maj7 F7♯5 | E♭m7 A♭7 G7 | D♭maj7 |
[B]
Gm7 C7 | Cm7 F7 | G♭7 | Bmaj7 |
Dm7 G7♭13 | Cmaj7 Gm7 C7 | Bm7 E7 | A7 D7 G7 |
[A2]
Cmaj7 | E♭m7 A♭7 | Dm7 B♭7 | E♭maj7 A7♯11 |
A♭7 D♭7 | G♭maj7 F7♯5 | E♭m7 A♭7 G7 | D7 Dm7 G7 |
D♭maj7 |`,

`title: Peace
by: Horace Silver
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B♭
[A]
Am7♭5 D7♭9 | Gm7 C7 | Bmaj7 Cm7♭5 F7 | B♭maj7 |
Bm7 E7 | Amaj7 F♯m7 | E♭m7♭5 A♭7 | D♭maj7 |
C7alt B7♯11 | B♭maj7 |`,

`title: Peri's Scope
by: Bill Evans
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
Dm7 G7 | Em7 A7 | Dm7 G7 | Cmaj7 A7 |
Dm7 G7 | Cmaj7 | E7♯5 | % |
Fmaj7 G7 | Em7 A7 | Dm7 G7 | Gm7 C7 |
Fmaj7 | B7♯11 | B♭7 | A7♯5 |
Dm7 G7 | Em7 A7 | Dm7 G7 | Em7♭5 A7♭9 |
Dm7 | G7 | Cmaj7 | Cmaj7 A7♯5 |`,

`title: Polkadots And Moonbeams
by: Jimmy Van Heusen
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 Em7♭5 A7 |
Dm7 D♭7 | F/C Am7 A♭m7 | Gm7 C7 | Am7 Dm7 Gm7 C7 |
[A2]
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 Em7♭5 A7 |
Dm7 D♭7 | F/C Am7 A♭m7 | Gm7 C7 | F6 Bm7♭5 E7 |
[B]
Amaj7 A♯°7 | Bm7 E7 | Amaj7 F♯m7 | Bm7 E7 |
Amaj7 A♯°7 | Bm7 E7 | A7 D7 | Gm7 C7 |
[A3]
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 Em7♭5 A7 |
Dm7 D♭7 | F/C Am7 A♭m7 | Gm7 C7 | F6 Gm7 C7 |`,

`title: Prelude To A Kiss
by: Duke Ellington
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A A2 B A
[A]
D9 G9 | C7 Fmaj7 | B9 E9 | A7 Dm7 |
Dm7 G7 G♯° | Am7 D13 | Dm7 G7♭9 | Cmaj7 Em7 A7 |
[A2]
D9 G9 | C7 Fmaj7 | B9 E9 | A7 Dm7 |
Dm7 G7 G♯° | Am7 D13 | Dm7 G7♭9 | Cmaj7 F♯m7♭5 B7 |
[B]
Emaj7 C♯m7 | F♯m7♭5 B7 | G♯m7 G°7 | F♯m7 B7 |
Emaj7 C♯m7 | F♯m7♭5 B7 | E7 A7 | Dm7 E♭m7 Em7 E♭7 |`,

`title: Reflections
by: Thelonious Monk
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
[A]
A♭ G♭7 F7 E7 | B♭m7 E♭7♭9 | A♭maj7 B♭m7 Bm7 | Cm7 F7♭9 |
Gm7♭5 | B♭m7 E♭7♭9 | A♭maj7 A°7 | B♭m7 F7 B♭m7 A7 |
[A2]
A♭ G♭7 F7 E7 | B♭m7 E♭7♭9 | A♭maj7 B♭m7 Bm7 | Cm7 F7♭9 |
Gm7♭5 | B♭m7 E♭7♭9 | A♭maj7 A°7 | Cm7♭5 F7♭5 |
[B]
B♭m7 E♭7♭9 | A♭7 D♭7 | Gm7 C7♭13 | Fm |
Fm7 | Fm7 B♭7♭9 | B♭m7 | B♭m7 E♭7♭9 |
[A3]
A♭ G♭7 F7 E7 | B♭m7 E♭7♭9 | A♭maj7 B♭m7 Bm7 | Cm7 F7♭9 |
Gm7♭5 | B♭m7 E♭7♭9 | A♭maj7 G♭7 | A♭maj7 |`,

`title: Rhythm-a-ning
by: Thelonious Monk
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: B♭
form: A A B A
[A]
B♭ G7 | Cm7 F7 | B♭ G7 | Cm7 F7 |
B♭7 B♭7/D | E♭7 E°7 | B♭7/F G7 | Cm7 F7 |
[B]
D7 | % | G7 | % |
C7 | % | F7 | % |`,

`title: Round Midnight
by: Thelonious Monk
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭m
[Intro]
Am7♭5 | D7♯9 | Gm7♭5 | C7♯9 |
Fm7♭5 | B♭7♯9 | E♭m7 A♭7 D♭7 | G♭7 B7 B♭7♯5 |
[A]
E♭m E♭m/D E♭m7/D♭ | C°7 A♭m7 D♭7 | E♭m6 | Bm7 E7 B♭m7 E♭7 |
A♭m7 D♭7 | E♭m7 A♭7 | Cm7♭5 B7♭5 | B♭7♭9♭5 |
[A2]
E♭m E♭m/D E♭m7/D♭ | C°7 A♭m7 D♭7 | E♭m6 | Bm7 E7 B♭m7 E♭7 |
A♭m7 D♭7 | E♭m7 A♭7 | Cm7♭5 B7 B♭7sus | E♭6 |
[B]
Cm7♭5 B7♭5 | B♭7♭5 | Cm7♭5 B7♭5 | B♭7♭5 |
A♭m7 Fm7 B♭7 | Cm7♭5 F7 | D♭9 B9 | A♭m7 Fm7 B♭7 |
Cm7♭5 F7♭9 | Cm7♭5 F7♭9 | F♯m7 B7 | F♯m7 B7 |
Bm7 E7 | Fm7♭5 B♭13♭9 | E♭7 B♭m7 E♭7 A♭m7 | D♭7 F♯m7 B7 E7 |
E♭maj7♯11 |`,

`title: Ruby, My Dear
by: Thelonious Monk
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
Fm9 B♭7♭9 | E♭maj7 | Gm7 C7♭9 | Fmaj7 |
B♭m7 E♭7♭9 | A♭maj7 | B♭m7 E13 | Bm7 B♭7♭5 B♭7♯5 |
[A2]
Fm9 B♭7♭9 | E♭maj7 | Gm7 C7♭9 | Fmaj7 |
B♭m7 E♭7♭9 | A♭maj7 | B♭m7 E13 | Bm11 B♭7♭5 |
[B]
Amaj7 | Bm7 E13♭9 | A69 | B♭6 B°7 |
Cm7 Cm(maj7) Cm7 | Cm(maj7) Dm7 | E♭m7 | A♭7♭5 E♭7♯9 |
[A3]
Fm9 B♭7♭9 | E♭maj7 | Gm7 C7♭9 | Fmaj7 |
B♭m7 E♭7♭9 | A♭maj7 | B♭m7 E13 | G♭69 B7♭9 B♭7♭9 |
G♭69 B7♭9 B♭7♭9 | A7♭5 | A♭7♭5 | D♭69 |`,

`title: Scrapple From The Apple
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
form: A A2 B A
[A]
Gm7 | C7 | Gm7 | C7 |
Fmaj7 F7/A | B♭maj7 B°7 | Fmaj7 Gm7 | Am7 D7 |
[A2]
Gm7 | C7 | Gm7 | C7 |
Fmaj7 F7/A | B♭maj7 B°7 | Fmaj7 C7 | Fmaj7 |
[B]
A7 | % | D7 | % |
G7 | % | C7 | % |`,

`title: Secret Love
by: Sammy Fain
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 B♭7sus | E♭maj7 B♭7sus | E♭7 A♭7 Gm7 C7 | Fm7 B♭7 |
Fm7 B♭7 | Fm7 B♭7 | Fm7 B♭7 | E♭6 B♭7 |
[A2]
E♭maj7 B♭7sus | E♭maj7 B♭7sus | E♭7 A♭7 Gm7 C7 | Fm7 B♭7 |
Fm7 B♭7 | Fm7 B♭7 | Fm7 B♭7 | E♭6 Dm7♭5 G7 |
[B]
Cm7 F7 | B♭maj7 | B♭m7 E♭7 | A♭maj7 D♭7 |
[A3]
E♭maj7 B♭7sus | Gm7♭5 C7♭9 | Fm7 B♭7 | E♭6 B♭7 |`,

`title: Seven Steps To Heaven
by: Victor Feldman
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
form: Intro A A B A
[Intro]
F13 | E♭13 | F13 | E♭13 |
F13 | E♭13 | F13 | % |
[A]
Fmaj7 B♭7 | Em7♭5 A7 | Dm7 A♭7 | G7 |
Gm7 | C7 | E♭6 E6 | F6 |
[B]
Cmaj7 | Dm7 | Em7 | Fm7 B♭7 |
E♭maj7 | A♭m7 D♭7 | G♭maj7 | Gm7 C7 |`,

`title: Shiny Stockings
by: Frank Foster
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: A B A C
[A]
Gm7 | C7 | Gm7 | C7 |
Fmaj7 | B♭7 | Am7 | A♭°7 |
[B]
Gm7 | C7 B♭7 | Am7 | D7 D7/C |
Bm7 | E7 | A6 | Am7♭5 D7♭9 |
[C]
Gm7 | C7 B♭7 | Am7 | D7 |
Gm7 | C7 | F6 | % |`,

`title: Sidewinder
by: Lee Morgan
genre: Jazz
feel: Funk
source: iReal Pro community chart
tempo: 110
key: E♭
[A]
N.C. D7 E♭7 | % | N.C. D7 E♭7 | N.C. D7 E♭7 |
N.C. D7 E♭7 | % | N.C. D7 E♭7 | N.C. D7 E♭7 |
N.C. G7 A♭7 | % | N.C. G7 A♭7 | N.C. G7 A♭7 |
N.C. D7 E♭7 | % | % | N.C. Gm7♭5 C7♭9 |
N.C. Fm7 B♭7 | % | N.C. Fm7 B♭7 | N.C. Fm7 B♭7 |
N.C. D7 E♭7 | % | E♭7 N.C. | N.C. |`,

`title: Silver's Serenade
by: Horace Silver
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: G
[A]
Em9 | % | B♭m9 | % |
Am9 | % | E♭m9 | % |
[B]
Am7 | % | Cm7 | B7 |
B♭maj7 Cm7 | Dm7 E♭maj7 | Am7 | D7♯11 |
D7♯11 | G69 | Gmaj7♯11 |`,

`title: Skylark
by: Hoagy Carmichael
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 Fm7 | E♭maj7/G A♭maj7 | E♭maj7 A7♯11 | A♭maj7 Gm7 C7 |
F7 | Fm7 B♭7 | E♭6 Cm7 | Fm7 B♭7 |
[A2]
E♭maj7 Fm7 | E♭maj7/G A♭maj7 | E♭maj7 A7♯11 | A♭maj7 Gm7 C7 |
F7 | Fm7 B♭7 | E♭6 B♭7♯9 | E♭6 |
[B]
Cm7 B7 | B♭m7 E♭7 | A♭maj7 | Gm7♭5 C7♭9 |
Fm D♭7 | B♭m7 E♭7 A♭maj7 | Gmaj7 Em7 | A7 D7 G6 B♭7 |
[A3]
E♭maj7 Fm7 | E♭maj7/G A♭maj7 | E♭maj7 A7♯11 | A♭maj7 Gm7 C7 |
F7 | Fm7 B♭7 | E♭6 B♭7♯9 | E♭6 B♭7 |`,

`title: Softly, As In A Morning Sunrise
by: Sigmund Romberg
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Cm
form: A A2 B A
[A]
Cm7 | Dm7♭5 G7♭9 | Cm7 | Dm7♭5 G7♭9 |
Cm7 | Dm7♭5 G7♭9 | Cm7 | Dm7♭5 G7♭9 |
[A2]
Cm7 | Dm7♭5 G7♭9 | Cm7 | Dm7♭5 G7♭9 |
Cm7 | Dm7♭5 G7♭9 | Cm7 | Fm7 B♭7 |
[B]
E♭maj7 | % | C7♭9 | % |
Fm7 | F♯°7 | Dm7♭5 | G7♭9 |`,

`title: Someday My Prince Will Come
by: Frank Churchill
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 3/4
form: A B A C
[A]
B♭maj7 | D7♯5 | E♭maj7 | G7♭9 |
Cm7 | G7♭9 | Cm7 | F7 |
[B]
Dm7 | C♯°7 | Cm7 | F7 |
Dm7 | C♯°7 | Cm7 | F7 |
[C]
Fm7 | B♭7 | E♭maj7 | E°7 |
B♭maj7/F | G7 | Cm7 | F7 |`,

`title: Some Other Time
by: Leonard Bernstein
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A A2 B A
[A]
Cmaj7 G7sus | % | % | C C/G F♯m7♭5 Fm7 |
Em7 A7 | Dm7 G7sus | Cmaj7 G7sus | % |
[A2]
Cmaj7 G7sus | % | % | C C/G F♯m7♭5 Fm7 |
Em7 A7 | Dm7 G7sus | Cmaj7 G7sus | Cmaj7 E♭7 |
[B]
A♭maj7 E♭7 | % | % | % |
A♭maj7 G7♭13 | C Em7 Am7 A7 | A♭7♯11 | Dm7 G7 |`,

`title: Someone To Watch Over Me
by: George Gershwin
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 E♭7 | A♭maj7 A♭°7 | E♭maj7/G G♭°7 | B♭7/F E°7 |
Fm7 G° A♭6 | Am7♭5 B♭7 | G7♯5 C7 | Fm7 B♭7 |
[A2]
E♭maj7 E♭7 | A♭maj7 A♭°7 | E♭maj7/G G♭°7 | B♭7/F E°7 |
Fm7 G° A♭6 | Am7♭5 B♭7 | E♭6 | E♭7 |
[B]
A♭maj7 | % | A♭m6 | E♭6/G |
Am7♭5 D7♭9 | G7♭13 | C7 | Fm7 B♭7 |
[A3]
E♭maj7 E♭7 | A♭maj7 A♭°7 | E♭maj7/G G♭°7 | B♭7/F E°7 |
Fm7 G° A♭6 | Am7♭5 B♭7 | E♭6 | Fm7 B♭7 |`,

`title: Sophisticated Lady
by: Duke Ellington
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
form: A A2 B A
[A]
B♭m7 | G♭7 F7 E7 E♭7 | A♭maj7 | A♭7 G7 G♭7 F7 |
B♭7 | B♭m7 E♭7 | A♭6 | Cm7♭5 F7♭9 |
[A2]
B♭m7 | G♭7 F7 E7 E♭7 | A♭maj7 | A♭7 G7 G♭7 F7 |
B♭7 | B♭m7 E♭7 | A♭6 | Am7♭5 D7 |
[B]
Gmaj7 Em7 | Am7 D7 | Bm7 E7♭9 | Am7 D7♭9 |
Gmaj7 Em7 | Am7 D7 | Gmaj7 Cm7 | B♭m7 Cm7♭5 F7 |`,

`title: Speak Low
by: Kurt Weill
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Gm7 | C7 | Gm7 | C7 |
Gm7 C7 | Gm7 C7 | Am7♭5 | D7 |
B♭m7 | E♭7 | B♭m7 | E♭7 |
Dm7 G7 | Gm7 C7 | F6 | Am7 D7 |
[A2]
Gm7 | C7 | Gm7 | C7 |
Gm7 C7 | Gm7 C7 | Am7♭5 | D7 |
B♭m7 | E♭7 | B♭m7 | E♭7 |
Dm7 G7 | Gm7 C7 | F6 | % |
[B]
Fm7 | % | D♭7 | % |
E♭maj7 | % | D♭7 | C7 |
Am7♭5 | D7 | Gm7 | C7 |
F6 | Am7 D7 |`,

`title: Speak No Evil
by: Wayne Shorter
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Cm
form: A A B A
[A]
Cm7 | D♭maj7 | Cm7 | D♭maj7 |
Cm7 | D♭maj7 | Cm7 | D♭maj7 E♭m7 |
Em7 Cm7 | Dm7 B♭m7 | A7alt | B♭m7 |
A7alt | B♭m7 |
[B]
Am7♭5 | A♭7 | Gm7 | G♭7♯11 |
Fm7 | B♭7♯11 | D/E♭ | D♭maj7♯11 |`,

`title: Spring Is Here
by: Richard Rodgers
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
form: A B A C
[A]
A♭°7 | A♭6 | A♭°7 | A♭6 |
Cm7♭5 F7♭9 | B♭m7 | Cm7 F7 | B♭m7 E♭7 |
[B]
A♭maj7 | Fm7 | B♭m7 | C7♭13 |
Fm6 | % | B♭7 | E♭7 |
[C]
A♭maj7 | Fm7 | Bm7 E7 | B♭m7 E♭7 |
Cm7 F7 | B♭m7 E♭7 | Cm7 F7 | Dm7♭5 D♭m6 |
Cm7 F7 | B♭m7 E♭7 | A♭6 D♭maj7 | A♭6 B♭m7 E♭7 |`,

`title: Stablemates
by: Benny Golson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D♭
[A]
Em7 A7 | E♭m7 A♭7 | D♭maj7 | C7♯5 |
A♭m7 | D♭7 | G♭maj7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | E♭m7 | A♭7♯5 |
D♭maj7 |
[B]
Fm7 | G♭7 | G7♯5 | C7 |
B7 | B♭7 | A7 | A♭7 |
[A2]
Em7 A7 | E♭m7 A♭7 | D♭maj7 | C7♯5 |
A♭m7 | D♭7 | G♭maj7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | E♭m7 | A♭7♯5 |
D♭maj7 | % |`,

`title: Star Eyes
by: Gene DePaul
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A A B A2
[A]
E♭maj7 | Fm7 B♭7 | E♭maj7 | E♭m7 A♭7 |
D♭maj7 | Gm7♭5 C7♭9 | Fmaj7 | B7 B♭7 |
[B]
A♭maj7 | % | A♭m7 | D♭7 |
G♭maj7 | % | Fm7 | B♭7sus B♭7 |
[A2]
E♭maj7 | Fm7 B♭7 | E♭maj7 | E♭m7 A♭7 |
D♭maj7 | Gm7♭5 C7♭9 | Fmaj7 | B7 B♭7 |
E♭7♯9 D7♭9 | D♭7♯9 C7♯9 | Fm7 B♭7sus | E♭6 Fm7 B♭7 |`,

`title: Star Dust
by: Hoagy Carmichael
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: D♭
[v]
D♭maj7 | G♭7♯11 | F7♭9 | B♭7 |
E♭m7 A♭7 | Fm7 B♭m7 | Gm7 C7 | E♭m7 A♭7 |
D♭maj7 | G♭7♯11 | F7♭9 | B♭7 |
E♭m7 A♭7 | Fm7 B♭m7 | E♭m7 A♭7 | D♭maj7 D♭7♯5 |
[A]
G♭maj7 | % | G♭m(maj7) | F♯m7 B7 |
D♭maj7 | Fm7 B♭7 | E♭m7 B♭7 | E♭m7 |
A♭7 | E♭m7 A♭7 | D♭maj7 E♭m7 E° | Fm7 B♭m7 |
E♭7 | B♭m7 E♭7 | A♭7 E♭m7 | A♭7 D♭7 |
[A2]
G♭maj7 | % | G♭m(maj7) | F♯m7 B7 |
D♭maj7 | Fm7 B♭7 | E♭m7 B♭7 | E♭m7 |
F♯m7 | B7 | D♭maj7 B♭m7 | Fm7 B♭7 |
E♭m7 | A♭7 | D♭maj7 | A♭m7 D♭7 |`,

`title: Stolen Moments
by: Oliver Nelson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Cm
form: Intro Intro A B
[Intro]
Cm7 | Dm7/C | E♭maj7/C | Dm7/C |
[A]
Cm7 | Cm6 | Cm7 | Cm6 |
Fm7 | Fm6 | Cm7 | Cm6 |
[B]
Dm D♯m | Em Fm | F♯m Fm | Em E♭m |
Dm7 D♯°7 | C7/E Fm | Cm | G7 |`,

`title: Stompin' At The Savoy
by: Webb-Goodman-Sampson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D♭
[A]
D♭maj7 | A♭7 | D♭maj7 | D°7 |
E♭m7 | A♭7 | D♭6 B♭m7 | E♭m7 A♭7 |
[A2]
D♭maj7 | A♭7 | D♭maj7 | D°7 |
E♭m7 | A♭7 | D♭6 | D♭7 |
[B]
G♭7 G7 | G♭7 | B7 C7 | B7 |
E7 F7 | E7 | A7 | A♭7 |
[A3]
D♭maj7 | A♭7 | D♭maj7 | D°7 |
E♭m7 | A♭7 | D♭6 | E♭m7 A♭7 |`,

`title: Strode Rode
by: Sonny Rollins
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Fm
form: A A2 B A
[A]
Fm7 | Gm7♭5 C7♭13 | Fm7 | Gm7♭5 C7♭13 |
Fm7 | Gm7♭5 C7♭13 | Fm7 | Gm7♭5 C7♭13 |
B♭m7 | D♭7 C7♭13 | Fm7 | Gm7♭5 C7♭13 |
[A2]
Fm7 | Gm7♭5 C7♭13 | Fm7 | Gm7♭5 C7♭13 |
Fm7 | Gm7♭5 C7♭13 | Fm7 | Gm7♭5 C7♭13 |
B♭m7 | D♭7 C7♭13 | Fm7 | Fm7 |
[B]
B♭m7 | E♭7 | A♭m7 | D♭7 C7♭13 |`,

`title: Sweet Georgia Brown
by: Pinkard-Casey-Bernie
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: A♭
[A]
F7 | % | % | % |
B♭7 | % | % | % |
E♭7 | % | % | % |
A♭maj7 | B♭m7 E♭7 | A♭maj7 | Gm7♭5 C7♭9 |
[A2]
F7 | % | % | % |
B♭7 | % | % | % |
Fm | Gm7♭5 C7♭9 | Fm | B♭m7 E♭7 |
A♭7 G7 | G♭7 F7 | B♭7 E♭7 | A♭6 |`,

`title: Take Five
by: Paul Desmond
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: E♭m
time: 5/4
form: A B A
[A]
E♭m B♭m7 | % | % | % |
E♭m B♭m7 | % | % | % |
[B]
Bmaj7 A♭m6 | B♭m7 E♭m7 | A♭m7 D♭7 | G♭maj7 |
Bmaj7 A♭m6 | B♭m7 E♭m7 | A♭m7 D♭7 | Fm7♭5 B♭7♭9 |`,

`title: Teach Me Tonight
by: Gene DePaul
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: E♭
[A]
E♭maj7 A♭7 | Gm7 C7♭13 | Fm7 B♭7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | Gm7 C7♭9 | Fm7 B♭7 |
[A2]
E♭maj7 A♭7 | Gm7 C7♭13 | Fm7 B♭7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | E♭6 A♭7 | E♭6 Gm7 G♭m7 |
[B]
Fm7 B♭7 | Gm7 C7♭9 | Fm7 B♭7 | E♭maj7 |
Am7♭5 D7♭9 | Gm7 C7 | Cm7 F7 | Fm7 B♭7 |
[A3]
E♭maj7 A♭7 | Gm7 C7♭13 | Fm7 B♭7 | Gm7♭5 C7♭9 |
Fm7 | B♭7 | E♭6 Cm7 | Fm7 B♭7 |`,

`title: Tenor Madness
by: Sonny Rollins
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: B♭
[A]
B♭7 | E♭7 | B♭7 | % |
E♭7 | % | B♭7 | % |
Cm7 | F7 | B♭7 | F7 |`,

`title: The Nearness Of You
by: Hoagy Carmichael
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Fmaj7 | Cm7 F7 | B♭maj7 | B♭°7 |
Am7 D7 | Gm7 C7 | Am7 D7 | Gm7 C7 |
[A2]
Fmaj7 | Cm7 F7 | B♭maj7 | B♭°7 |
Am7 D7 | Gm7 C7 | Fmaj7 E♭7 | F6 |
[B]
Gm7 | C7 | Fmaj7 | Cm7 F7 |
B♭maj7 | Am7♭5 D7♭9 | G7 | Gm7 C7 |
Am7♭5 | D7♭9 | Gm7 | C7 |
Fmaj7 Dm7 | Gm7 C7 |`,

`title: The Song Is You
by: Jerome Kern
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: C
[A]
Cmaj7 | E♭°7 | Dm7 | G7 |
Cmaj7 | A7 | Dm7 | G7 |
Em7 | A7 | Dm7 | G7 |
Fm7 | B♭7 | Em7 A7 | Dm7 G7 |
[A2]
Cmaj7 | E♭°7 | Dm7 | G7 |
Cmaj7 | A7 | Dm7 | G7 |
Em7 | A7 | Dm7 | G7 |
C6 | % | % | F♯m7♭5 B7 |
[B]
Emaj7 | % | F♯m7 | B7 |
Emaj7 | % | A♯m7♭5 | D♯7♭9 |
G♯m7 | % | C♯7 | % |
F♯7 | % | B7 | % |
[A3]
Cmaj7 | E♭°7 | Dm7 | G7 |
Gm7 | C7 | Fmaj7 | B♭7 |
Em7 | A7 | Dm7 | G7 |
C6 | A7 | Dm7 | G7 |`,

`title: The Way You Look Tonight
by: Jerome Kern
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
Fmaj7 | Dm7 | Gm7 | C7 |
Fmaj7 | D7 | Gm7 | C7 |
Cm7 | F7 | B♭maj7 | Gm7 C7 |
F6 Dm7 | Gm7 C7 | F6 Dm7 | Gm7 C7 |
[A2]
Fmaj7 | Dm7 | Gm7 | C7 |
Fmaj7 | D7 | Gm7 | C7 |
Cm7 | F7 | B♭maj7 | Gm7 C7 |
F6 Dm7 | Gm7 C7 | F6 Dm7 | B♭m7 E♭7 |
[B]
A♭maj7 | F7 | B♭m7 | E♭7 |
A♭maj7 | Fm7 | B♭m7 | E♭7 |
A♭maj7 | F7 | B♭m7 | E♭7 |
A♭maj7 | D♭maj7 | Gm7 | C7 |
Gm7 | C7 | F6 Dm7 | Gm7 C7 |`,

`title: There Is No Greater Love
by: Isham Jones
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
[A]
B♭maj7 | E♭7 | A♭7♯11 | G7 |
C7 | % | Cm7 | F7 |
[A2]
B♭maj7 | E♭7 | A♭7♯11 | G7 |
C7 | Cm7 F7 | B♭6 | % |
[B]
Am7♭5 D7♭9 | Gm6 | Am7♭5 D7♭9 | Gm6 |
Am7♭5 D7♭9 | Gm6 | C7 | F7 |
[A3]
B♭maj7 | E♭7 | A♭7♯11 | G7 |
C7 | Cm7 F7 | B♭6 | Cm7 F7 |`,

`title: There Will Never Be Another You
by: Harry Warren
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: E♭
form: A B A C
[A]
E♭maj7 | % | Dm7♭5 | G7♭9 |
Cm7 | % | B♭m7 | E♭7 |
[B]
A♭maj7 | D♭7♯11 | E♭maj7 | Cm7 |
F7 | % | Fm7 | B♭7 |
[C]
A♭maj7 | D♭7♯11 | E♭maj7 | Am7♭5 D7 |
E♭maj7 A♭7 | Gm7 C7 | Fm7 B♭7 | E♭6 B♭7 |`,

`title: These Foolish Things
by: Strachey-Link
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 Cm7 | Fm7 B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
B♭m7 E♭7 | A♭maj7 G7 C7 | F7 | Fm7 B♭7 |
[A2]
E♭maj7 Cm7 | Fm7 B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
B♭m7 E♭7 | A♭maj7 G7 C7 | F7 B♭7 | E♭6 Am7♭5 D7 |
[B]
Gm7 Em7♭5 | Am7♭5 D7♭9 | Gm7 | C7 F7 |
B♭maj7 Gm7 | Cm7 F7 | B♭7 E°7 | Fm7 B♭7 |
[A3]
E♭maj7 Cm7 | Fm7 B♭7 | E♭maj7 Cm7 | Fm7 B♭7 |
B♭m7 E♭7 | A♭maj7 G7 C7 | F7 B♭7 | E♭6 Fm7 B♭7 |`,

`title: They Can't Take That Away From Me
by: George Gershwin
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
[A]
E♭maj7 Fm7 | Gm7 G♭°7 | Fm7 | B♭7sus |
B♭m7 | E♭7 | A♭maj7 Gm7 C7 | Fm7 B♭7sus |
[A2]
E♭maj7 Fm7 | Gm7 G♭°7 | Fm7 | B♭7sus |
B♭m7 | E♭7 | A♭maj7 B♭7 | E♭6 Am7♭5 D7 |
[B]
Gm7 D7♭9 | Gm7 D7♭9 | Gm7 Em7♭5 | Am7♭5 D7♭9 |
Gm7 D7♭9 | Gm7 C7 | F7 | B♭7sus |
[A3]
E♭maj7 Fm7 | Gm7 G♭°7 | Fm7 | B♭7sus |
B♭m7 | E♭7 | A♭maj7 B♭7 | E♭6 A♭m6 |
G7 C7 | F7 B♭7 | E♭6 | B♭7sus |`,

`title: Things Ain't What They Used To Be
by: Duke Ellington
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D♭
[A]
D♭7 | G♭7 | D♭7 | % |
G♭7 | % | D♭7 | % |
E♭m7 | A♭7 | D♭7 B♭7 | E♭m7 A♭7 |`,

`title: Tune Up
by: Miles Davis
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
[A]
Em7 | A7 | Dmaj7 | % |
Dm7 | G7 | Cmaj7 | % |
Cm7 | F7 | B♭maj7 | Gm7 |
Em7 | F7 | B♭maj7 | A7 |
Em7 | A7 | Dmaj7 | % |
Dm7 | G7 | Cmaj7 | % |
Cm7 | F7 | B♭maj7 | Gm7 |
Em7 | A7 | Dmaj7 | % |`,

`title: Up Jumped Spring
by: Freddie Hubbard
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 3/4
[A]
B♭maj7 | G7♯5 | Cm7 | F7 F♯°7 |
Gm7 | Fm7 | Em7♭5 | A7♭9 |
Dm7 | E♭m7 | Dm7 | E♭m7 |
B7♯11 | E7 | Cm7♭5 | F7 |
[A2]
B♭maj7 | G7♯5 | Cm7 | F7 F♯°7 |
Gm7 | Fm7 | Em7♭5 | A7♭9 |
Dm7 | E♭m7 | Dm7 | E♭m7 |
Cm7 | F7 | B♭6 | Am7♭5 D7 |
[B]
Gm7 | C7 | Fmaj7 | Dm7 |
A♭m7 | E♭m7 | Cm7 | F7 |
Cm7 | F7 | Bmaj7 | B♭maj7 |`,

`title: Very Early
by: Bill Evans
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: C
time: 3/4
form: A A B
[A]
Cmaj7 | B♭7 | E♭maj7 | A♭7♭9 |
D♭maj7 | G7 | Cmaj7 | B♭7♯11 |
Dmaj7 | Am7 | F♯m7 | B13♭9 |
Em7 | A♭7 | D♭maj7 | G7 |
[B]
Bmaj7 | A♭7♭9 | D♭maj7 | B♭7 |
Bmaj7 | G7 | Cmaj7 | A♭7 |
D♭maj7 | G7 | Cmaj7 | A7alt |
Dm7 Em7 | Fmaj7 G7 | Cmaj7 | G7 |
Dm7 Em7 | Fmaj7 G7 | Cmaj7 A♭maj7 | B♭maj7 Gmaj7 |
Bmaj7 | % |`,

`title: Waltz For Debby
by: Bill Evans
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: F
time: 3/4
[A]
Fmaj7/A | Dm7 | Gm7 | C7 |
A7/G | D7/F♯ | G7/F | C7/E |
F7/E♭ | B♭6/D | Gm7♭5/D♭ | C7 |
Am7 | Dm7 | Gm7 | C7 |
Fmaj7/A | Dm7 | Gm7 | C7 |
A7/C♯ | D7/C | G7/B | C7/B♭ |
A7 | Dm7 | B7 | E7 |
Amaj7/C♯ | Amaj7/B | Amaj7 | Amaj7/G♯ |
[B]
Gm7 | C7 | Am7 | D7 |
Gm7 | A7 | Dm7 | Cm7 |
B♭maj7 | A7 | Dm7 | G7 |
A♭maj7 | D♭maj7 | Gm7 | C7 |
[A2]
Fmaj7/A | Dm7 | Gm7 | C7 |
A7/G | D7/F♯ | G7/F | C7/E |
F7/E♭ | B♭6/D | Gm7♭5/D♭ | C7 |
Am7 | Dm7 | Bm7 | E7 |
Am7 | F7 | B♭maj7 | A7alt |
Dm7 | % | G7 | G♯°7 |
Am7/C | A♭°7/C | Gm7/C | C7 |
F6 | Dm7 | Gm7 | C7 |`,

`title: Well You Needn't
by: Thelonious Monk
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
form: A A B A
[A]
F6 | G♭7 | F6 | G♭7 |
F6 | G♭7 | F6 | % |
[B]
D♭7 | % | D7 | % |
E♭7 E7 | E♭7 D7 | D♭7 C7 | B7 C7 |`,

`title: What A Wonderful World
by: Weiss-Thiele
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
F6 Am7 | B♭maj7 Am7 | Gm7 Fmaj7 | A7♭9 Dm7 |
D♭7 | Gm7 C7 | Fmaj7 F6 | Gm7 C7 |
[A2]
F6 Am7 | B♭maj7 Am7 | Gm7 Fmaj7 | A7♭9 Dm7 |
D♭7 | Gm7 C7 | F6 B♭7 | F6 |
[B]
Gm7 C7 | Fmaj7 | Gm7 C7 | Fmaj7 |
Dm7 Am7 | Dm7 Am7 | Dm7 D7♭9 | Gm7 F♯° Gm7 C7 |`,

`title: What Is This Thing Called Love
by: Cole Porter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: C
form: A A B A
[A]
Gm7♭5 | C7♭9 | Fm6 | % |
Dm7♭5 | G7♯5 | Cmaj7 | % |
[B]
Cm7 | F7 | B♭maj7 | % |
A♭7 | % | Dm7♭5 | G7 |`,

`title: When I Fall In Love
by: Victor Young
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
form: A B A C
[A]
E♭maj7 C7 | Fm7 B♭7 | E♭maj7 C7 | Fm7 B♭7 |
E♭maj7 A♭7 | G7♭9 C7♭9 | F7 | B♭7 |
[B]
E♭maj7 C7 | Fm7 B♭7 | E♭maj7 A♭7 | Gm7♭5 C7♭9 |
Fm7 D7alt | Gm7♭5 C7♭9 | Fm7 C7♭9 | Fm7 B♭7 |
[C]
E♭maj7 A7♯11 | A♭maj7 D7 | Gm7 C7♯9 | Fm7 B♭7 |
E♭maj7 C7 | Fm7 B♭7 | E♭6 | Fm7 B♭7 |`,

`title: When Sunny Gets Blue
by: Marvin Fisher
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Gm7 C7 | B♭m7 E♭7 | Fmaj7 Gm7 | Am7 D7 |
Bm7♭5 B♭m7 E♭7 | Fmaj7/A A♭m7 D♭7 | Gm7 C7 B♭7 | Am7 D7♭9 |
[A2]
Gm7 C7 | B♭m7 E♭7 | Fmaj7 Gm7 | Am7 D7 |
Bm7♭5 B♭m7 E♭7 | Fmaj7/A A♭m7 D♭7 | Gm7 C7 B♭7 | Em7 A7♭9 |
[B]
Dmaj7 Em7 | F♯m7 B7 | Em7 A7 | Dmaj7 |
Dm7 G7 | Cmaj7 Am7 | Fmaj7 Dm7 G7 | Gm7 C7 |
[A3]
Gm7 C7 | B♭m7 E♭7 | Fmaj7 Gm7 | Am7 D7 |
Bm7♭5 B♭m7 E♭7 | Fmaj7/A A♭m7 D♭7 | Gm7 C7 | Fmaj7 |`,

`title: Whisper Not
by: Benny Golson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Cm
form: A A2 B A
[A]
Cm7 Cm7/B♭ | Am7♭5 D7♭9 | Gm7 Gm7/F | Em7♭5 A7♭9 |
Dm7 Bm7♭5 | Em7♭5 A7♭9 | Dm7 Em7 | Fm7 G7♭9 |
[A2]
Cm7 Cm7/B♭ | Am7♭5 D7♭9 | Gm7 Gm7/F | Em7♭5 A7♭9 |
Dm7 Bm7♭5 | Em7♭5 A7♭9 | Dm7 Em7 | Fm7 B♭7 |
[B]
Am7♭5 | D7♭9 | Gm7 | Gm7/F |
Em7♭5 | A7♭9 | Dm7♭5 | G7♭9 |`,

`title: Willow Weep For Me
by: Ann Ronell
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: G
form: A A2 B A
[A]
G7 C7 | G7 C7 | G7 Am7 B♭° | G6/B Am7 Dm7 D♭7 |
C7 D♭7♯11 | C7 Am7 D7 | G7 C7 | G7 D7 |
[A2]
G7 C7 | G7 C7 | G7 Am7 B♭° | G6/B Am7 Dm7 D♭7 |
C7 D♭7♯11 | C7 Am7 D7 | G7 C7 | G7 |
[B]
Cm7 | Gm7 G7♭9 | Cm7 B♭7 | A♭7 G7♭9 |
Cm7 | Gm7 G7♭9 | Cm7 B♭7 | A♭7 Am7 D7 |`,

`title: Witch Hunt
by: Wayne Shorter
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: Cm
[A]
Cm7 | % | % | % |
Cm7 | % | % | % |
E♭7 | % | % | % |
Cm7 | % | % | % |
G♭maj7 | F7 | Emaj7 E♭7 | E♭7 |
A♭m7 | A/A♭ | A♭m7 | G7♭9♭13 |`,

`title: Woody'n You
by: Dizzy Gillespie
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: D♭
form: A A B A
[A]
Gm7♭5 | C7♭9 | Fm7♭5 | B♭7♭9 |
E♭m7♭5 | A♭7♭9 | D♭maj7 | % |
[B]
A♭m7 D♭7 | A♭m7 D♭7 | A♭m7 D♭7 | G♭maj7 |
B♭m7 E♭7 | B♭m7 E♭7 | B♭m7 E♭7 | A♭maj7 |`,

`title: Yardbird Suite
by: Charlie Parker
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: C
[A]
C6 | Fm7 B♭7 | C7 B♭7 | A7 |
D7 | G7 | Em7 A7 | Dm7 G7 |
[A2]
C6 | Fm7 B♭7 | C7 B♭7 | A7 |
D7 | G7 | C6 | F♯m7♭5 B7♭9 |
[B]
Em7 | F♯m7♭5 B7♭9 | Em7 | A7 |
Dm7 | Em7♭5 A7 | D7 | Dm7 G7 |
[A3]
C6 | Fm7 B♭7 | C7 B♭7 | A7 |
D7 | G7 | C6 | Dm7 G7 |`,

`title: Yesterdays
by: Jerome Kern
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Dm
[A]
Dm | Em7♭5 A7♭9 | Dm | Em7♭5 A7♭9 |
Dm Dm(maj7)/C♯ | Dm7/C | Bm7♭5 | E7 |
A7♯5 | D9 | G13 | C9 |
F13 | B♭maj7 | Em7♭5 | A7♭9 |`,

`title: You And The Night And The Music
by: Arthur Schwartz
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Cm
form: A A B A2
[A]
Cm | Dm7♭5 G7♭9 | Cm C7♭9 | Fm7 |
Dm7♭5 | G7♭9 | Cmaj7 | % |
[B]
A♭7 | % | G7 | % |
A♭7 | % | G7 A♭7 | G7 |
[A2]
Cm | Dm7♭5 G7♭9 | Cm C7♭9 | Fm7 |
Dm7♭5 G7♭9 | Cm Am7♭5 | Dm7♭5 G7♭9 | Cm |`,

`title: You Don't Know What Love Is
by: Raye-DePaul
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Fm
form: A A2 B A2
[A]
Fm7 | D♭7 C7♭9 | Fm7 C7♭9 | D♭7 |
Gm7♭5 C7♭9 | Fm7 E7 E♭m7 D7 | D♭7 | Gm7♭5 C7♭9 |
[A2]
Fm7 | D♭7 C7♭9 | Fm7 C7♭9 | D♭7 |
Gm7♭5 C7♭9 | Fm7 E7 E♭m7 D7 | D♭7 C7♭9 | Fm6 |
[B]
B♭m7 E♭7 | A♭maj7 | B♭m7 E♭7 | A♭maj7 |
Dm7 G7 | Cmaj7 | D♭7 | C7♭9 |`,

`title: You Go To My Head
by: Fred Coots
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 Gm7 | A♭m7 D♭7 | G♭maj7 | Fm7♭5 B♭7♭13 |
E♭m7 Cm7♭5 | Fm7♭5 B♭7♭13 | E♭6 Cm7 | Fm7 B♭7 |
[A2]
E♭maj7 Gm7 | A♭m7 D♭7 | G♭maj7 | Fm7♭5 B♭7♭13 |
E♭m7 Cm7♭5 | Fm7♭5 B♭7♭13 | E♭6 | B♭m7 E♭7 |
[B]
A♭maj7 | A°7 | E♭6/B♭ | E♭6 |
Am7 D7 | Bm7 E7♭9 | Am7 D7 | Gmaj7 B♭7 |
[A3]
E♭maj7 Gm7 | A♭m7 D♭7 | G♭maj7 | Fm7♭5 B♭7♭13 |
E♭m7 Cm7♭5 | Fm7♭5 B♭7♭13 | E♭maj7 | B♭m7 E♭7 |
[C]
A♭maj7 | D♭7 | E♭ E♭/D Cm7 Cm7/B♭ | Am7♭5 D7 |
Gm7 C7 | Fm7 B♭7 | E♭6 Cm7 | Fm7 B♭7 |`,

`title: You Stepped Out Of A Dream
by: Nacio Herb Brown
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
Cmaj7 | % | D♭maj7 | % |
B♭m7 | E♭7 | A♭maj7 | % |
[B]
Gm7 | C7 | Fmaj7 | % |
Am7 | D7 | E♭m7 A♭7 | Dm7 G7 |
[A2]
Cmaj7 | % | D♭maj7 | % |
B♭m7 | E♭7 | G♭7♯11 | F7 |
[C]
Dm7♭5 | G7 | Em7 | A7 |
Dm7 | G7 | Cmaj7 A7 | Dm7 G7 |`,

`title: Young And Foolish
by: Albert Hague
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A B A C
[A]
Cmaj7 Am7 | Dm7 G7 | Cmaj7 | Gm7 C7 |
Fmaj7 | Em7♭5 A7♭9 | Dm7 | G7sus G7 |
[B]
Cmaj7 | E♭°7 | C/E E7♭13 | Am7 |
Am7 | D7 | Dm7 | G7 |
[C]
Cmaj7 | E7♭13 | Am7 | D7 D♯°7 |
Cmaj7/E A7♭13 | Dm7 G7 | C6 | Dm7 G7 |`,

`title: Embraceable You
by: George Gershwin
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
[A]
Gmaj7 | B♭°7 | Am7 | D7 |
Am7 | Cm6 | Gmaj7 | F♯m7♭5 B7♭9 |
[B]
Em Em/D | C♯m7♭5 F♯7♯5 | Bm7 | Em7 A7 |
Dmaj7 Bm7 | Em7 A7 | Am7 | D7 |
[A2]
Gmaj7 | B♭°7 | Am7 | D7 |
Am7 | Cm6 | Gmaj7 | Dm7 G7 |
[C]
Cmaj7 | F♯m7♭5 B7♭9 | Em7 Em7/D | C♯m7♭5 Cm6 |
Bm7 E7 | Am7♭5 D7♭9 | Gmaj7 | Am7 D7 |`,

`title: I'm Getting Sentimental Over You
by: George Bassman
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Fmaj7 | Bm7♭5 E7♭9 | Am7♭5 | D7♭9 |
G7 | C7 | F6 D7 | Gm7 C7 |
[A2]
Fmaj7 | Bm7♭5 E7♭9 | Am7♭5 | D7♭9 |
G7 | C7 | F6 | Bm7♭5 E7♭9 |
[B]
Am7 | F♯m7♭5 | B7 | E7♭9 |
Bm7 | E7 | Am7 D7 | Gm7 C7 |
[A3]
Fmaj7 | Bm7♭5 E7♭9 | Am7♭5 | D7♭9 |
G7 | C7 | Am7 | D7 |
G7 | C7♭13 | F6 | Gm7 C7 |`,

`title: It Never Entered My Mind
by: Richard Rodgers
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
F F+ | F6 F+ | Fmaj7 Gm7 | Am7 Gm7 |
Fmaj7 B♭7 | Fmaj7/A D7 | G7sus G7 | Gm7 C7 |
[A2]
F F+ | F6 F+ | Fmaj7 Gm7 | Am7 Gm7 |
Fmaj7 B♭7 | Fmaj7/A D7 | G7sus G7 | C7sus C7 |
[B]
Fmaj7 | Gm7 C7 | Fmaj7 | Gm7 C7 |
Fmaj7 Gm7 | Am7 Bm7♭5 E7 | Am7 D7 | Gm7 C7 |
[A3]
Fmaj7 F+ | F6 F+ | Fmaj7 Gm7 | Am7 Gm7 |
Fmaj7 B♭7 | Am7♭5 D7♭9 | Gm7 C7 | Am7 D7 |
Gm7 C7 | F6 Gm7 C7 |`,

`title: Love Walked In
by: George Gershwin
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
form: A B A C
[A]
E♭maj7 | Cm7 | F7 | B♭7sus B♭7 |
E♭maj7 | Cm7 | F7 | B♭7 |
[B]
B♭m7 | E♭7 | A♭maj7 | Gm7 C7 |
Fm7 | A♭m7 D♭7 | Gm7 C7 | F7 B♭7 |
[C]
B♭m7 | E♭7 | A♭maj7 | A7 D7♭13 |
Gm7 C7 | Fm7 B♭7 | E♭6 | Fm7 B♭7 |`,

`title: Moonglow
by: Hudson-Lange-Mills
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
form: A A B A
[A]
Cmaj7 | F7♯11 | G6 | A7 |
Am7 | D7 | G6 E♭7 | Am7 E♭7 G6 |
[B]
G7 | G♭7 F7 | E7 | % |
A7 | % | D7 E♭7 | D7 G7 |`,

`title: My Old Flame
by: Johnson-Coslow
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Fmaj7 | Am7♭5 D7♭9 | Gm7 | B♭m7 E♭7 |
Fmaj7 B♭m7 E♭7 | A♭maj7 D♭7 | Gm7 | C7 |
[A2]
Fmaj7 | Am7♭5 D7♭9 | Gm7 | B♭m7 E♭7 |
Fmaj7 B♭m7 E♭7 | A♭maj7 D♭7 | Gm7 C7 | Fmaj7 B♭m7 E♭7 |
[B]
A♭maj7 Fm7 | B♭m7 E♭7 | G♭7 F7 | B♭7 |
B♭m7 E♭7 | Gm7♭5 C7 Fm7 | Dm7 G7 | Gm7 C7 |
[A3]
Fmaj7 | Am7♭5 D7♭9 | Gm7 | B♭m7 E♭7 |
Fmaj7 B♭m7 E♭7 | A♭maj7 D♭7 | Gm7 C7 | F6 |`,

`title: Nature Boy
by: Eden Ahbez
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Dm
form: A B A C
[A]
Dm | Em7♭5 A7♭9 | Dm | Em7♭5 A7♭9 |
Dm Dm(maj7) | Dm7 Dm6 | Gm6 Dm | Em7♭5 |
[B]
A7♭9 | % | Dm | % |
E7♭9 | % | A7♭9 | % |
[C]
A7♭9 | % | Dm | Bm7♭5 |
E7♭9 | A7♭9 | Dm | Em7♭5 A7♭9 |`,

`title: Smoke Gets In Your Eyes
by: Jerome Kern
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: E♭
[A]
E♭maj7 G♭°7 | Fm7 B♭7 | B♭m7 E♭7 | A♭maj7 A°7 |
Gm7 Cm7 | Fm7 B♭7 | Gm7 C7 | Fm7 B♭7 |
[A2]
E♭maj7 G♭°7 | Fm7 B♭7 | B♭m7 E♭7 | A♭maj7 A°7 |
Gm7 Cm7 | Fm7 B♭7 | E♭6 | D♭m7 G♭7 |
[B]
Bmaj7 | E7♯11 | E♭m7 A♭7 | D♭m7 G♭7 |
Bmaj7 | Fm7 B♭7 | E♭maj7 C7 | Fm7 B♭7 |
[A3]
E♭maj7 G♭°7 | Fm7 B♭7 | B♭m7 E♭7 | A♭maj7 A°7 |
Gm7 Cm7 | Fm7 B♭7 | E♭6 Cm7 | Fm7 B♭7 |`,

`title: Tangerine
by: Victor Schertzinger
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
Gm7 | C7 | F6 B♭7 | Am7 D7♯9 |
Gm7 C7 | % | Fmaj7 | D7♭9 |
[B]
Gm7 | C7 | F6 | Bm7♭5 E7♭9 |
Amaj7 F♯m7 | Bm7 E7 | A7 | D7♭9 |
[A2]
Gm7 | C7 | F6 B♭7 | Am7 D7♯9 |
Gm7 C7 | % | E♭7 | D7♭13 |
[C]
Gm7 | Em7♭5 A7♯9 | Dm7 | G7 |
Gm7 | C7 | F6 | D7♯9 |`,

`title: That Old Feeling
by: Brown-Fain
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
C6 | % | Em7♭5 | A7♭9 |
Dm7 A7♭9 | Dm7 | Dm7♭5 | G7 |
Am7 | E7♭13 | Em7♭5 | A7 |
D7 | % | Dm7♭5 | G7 |
[B]
C6 | % | Em7♭5 | A7♭9 |
Dm7 A7♭9 | Dm7 | Fm6 | E7 |
Em7♭5 | A7♭9 | Dm7 | Fm6 |
Cmaj7 | A7 | Dm7 G7 | C6 |`,

`title: The Very Thought Of You
by: Ray Noble
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: A♭
form: A B A C
[A]
A♭maj7 D♭maj7 | Cm7 E♭7sus | A♭6 D♭maj7 | Cm7 E♭7sus |
A♭6 B♭m7 | B°7 A♭6/C | B♭7 | % |
[B]
B♭m7 E♭7 | Gm7♭5 C7♭9 | Fm7 Fm7/E♭ | Dm7♭5 G7♭9 |
Cm7 Fm7♭5 | B♭7sus B♭7 | B♭m7 | E♭7 |
[C]
B♭m7 E♭7 | Gm7♭5 C7♭9 | Fm7 Fm7/E♭ | Dm7♭5 A°7 |
B♭m7 A°7 | B♭m7 E♭7 | A♭6 | B♭m7 E♭7 |`,

`title: Too Young To Go Steady
by: Jimmy McHugh
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
[A]
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 C7 |
Am7 D7 | Gm7 Em7♭5 A7 | Dm7 G7 | Gm7 C7 |
[A2]
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 C7 |
Am7 D7 | Gm7 C7 | F6 | Bm7♭5 E7♭9 |
[B]
Am7 | Bm7♭5 E7♭9 | Am7 | Bm7♭5 E7♭9 |
Am7 | Bm7♭5 E7♭9 | Am7 D7 | Gm7 C7 |
[A3]
Fmaj7 Dm7 | Gm7 C7 | Fmaj7 Dm7 | Gm7 C7 |
Am7 D7 | Gm7 C7 | F6 D7 | Gm7 C7 |`,

`title: Unforgettable
by: Gordon Irving
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G
form: A B A C
[A]
Gmaj7 | % | B♭°7 | % |
Cmaj7 | % | Em7 | A7 |
[B]
Fmaj7 | Fm7 | Cmaj7 F7 | Em7 A7 |
Am7 | % | D7 | % |
[C]
Fmaj7 | B♭7♯11 | Cmaj7 F7 | Em7 A7 |
Am7 D7 | Dm7 G7 | C6 | Am7 D7 |`,

`title: What's New
by: Bob Haggard
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A A2 B A
[A]
C6 | B♭m7 E♭7 | A♭maj7 | Dm7♭5 G7♭9 |
Cm7 Am7♭5 | Dm7♭5 G7♭9 | C6 Am7 | Dm7 G7 |
[A2]
C6 | B♭m7 E♭7 | A♭maj7 | Dm7♭5 G7♭9 |
Cm7 Am7♭5 | Dm7♭5 G7♭9 | C6 | Gm7 C7 |
[B]
F6 | E♭m7 A♭7 | D♭maj7 | Gm7♭5 C7♭9 |
Fm7 Dm7♭5 | Gm7♭5 C7♭9 | Fm6 | Dm7♭5 G7♭9 |`,

`title: Wives And Lovers
by: Burt Bacharach
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: E♭
time: 3/4
form: A B A B C
[A]
Fm7 | B♭6 | Fm7 | B♭6 |
Fm7 | B♭6 | Fm7 | B♭6 |
Gm7 | C7 | Gm7 | C7 |
Gm7 | C7 | Gm7 | C7 |
[B]
Cm7 | F7 | Am7♭5 | D7 |
E♭maj7 | % | Am7 | D7 |
D♭maj7 | Gm7 | C7 |
[C]
Fm7 | B♭6 | Fm7 | B♭6 |
Fm7 | B♭6 | E♭6 | E°7 |
Fm7 | B♭6 | Fm7 | B♭6 |
Fm7 | B♭6 | E♭maj7 | C7 |
Fm7 | B♭6 | Fm7 | B♭6 |
Fm7 | B♭6 | E♭6 | % |`,

`title: You Must Believe In Spring
by: Michel Legrand
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Cm
[A]
C♯m7♭5 F♯7♭9 | F♯7♭9/B Bm7 | Em7 A7 | A7♭9/D Dmaj7 |
G♯m7♭5 C♯7♭9 | F♯m7♭5 B7♭9 | Em7 A7 | Dmaj7 G♯7♯5 |
[B]
C♯m7♭5 F♯7♭9 | F♯7♭9/B Bm7 | Em7 A7 | A7♭9/D Dmaj7 |
G♯m7♭5 C♯7♭9 | Gm7♭5 C7♭9 | Fm7 B♭7 | E♭maj7 A7♯5 |
[C]
Dm7♭5 G7♭9 | G7♭9/C Cm7 | Fm7 B♭7 | B♭7♭9/E♭ E♭maj7 |
Am7♭5 D7♭9 | Gm7♭5 C7♭9 | Fm7 B♭7 | E♭maj7 A♭maj7♯11 |
Dm7♭5 G7♭9 | Cm6 |`,

`title: Bluesette
by: Toots Thielemans
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 3/4
[A]
B♭maj7 | % | Am7♭5 | D7♭9 |
Gm7 | C7 | Fm7 | B♭7 |
E♭maj7 | % | E♭m7 | A♭7 |
D♭maj7 | % | C♯m7 | F♯7 |
Bmaj7 | % | Cm7 | F7 |
Dm7 | G7 | Cm7 | F7 |`,

`title: Blues March
by: Benny Golson
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: B♭
form: A A B B2
[A]
B♭7 | E♭7 | B♭7 | % |
E♭7 A♭7 | D♭7 G♭7 | Gm7♭5 A♭7 | A7 B♭7 |
Cm7♭5 | F7 | B♭7 D♭7 | G♭7 B7 |
[B]
B♭7 | E♭7 | B♭7 | % |
E♭7 E7 | E♭7 E°7 | B♭7/F E♭7 | Dm7 G7 |
Cm7 | F7 | B♭7 G7 | Cm7 F7 |
[B2]
B♭7 | E♭7 | B♭7 | % |
E♭7 E7 | E♭7 E°7 | B♭7/F E♭7 | Dm7 G7 |
Cm7 | F7 | B♭7 G7 | Cm7 F7 |
B♭7 D♭7 | G♭7 B7 | B♭7 D♭7 | G♭7 B7 |`,

`title: Sister Sadie
by: Horace Silver
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: G
form: A A2 A2 B A2
[A]
G7 | % | G7 | G7 |
G7 | G7 | G7 |
[A2]
G7 | % | G7 | G7 |
G7 | G7 | G7 | G7 |
[B]
C7 | % | G7 | % |
C7 | B♭7 | A7 | A♭7 |`,

`title: The Preacher
by: Horace Silver
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
[A]
F6 | % | B♭9 B°7 | F6/C |
F6 | % | G7 | C7 |
F6 | F7 | B♭6 | A7 |
B♭maj7 B°7 | F/C D7 | Gm7 C7 | F6 |`,

`title: Nefertiti
by: Wayne Shorter
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: A♭
[A]
A♭maj7 | D♭maj7 | Gm7♭5 | C7♭9 |
Bmaj7 | Bmaj7♯11 | B♭m7♭5 | E♭7♭9♯11 |
Emaj7 | A9sus | D7alt/B♭ | G♭9sus |
E9sus | E♭7♯11 | B♭m(maj7) | E♭7♯11 |`,

`title: Pinocchio
by: Wayne Shorter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭m
[A]
G♭maj7♯11 | Am9 | D♭m69 | Am9 |
Dmaj7♯5 | Bm(maj7) | Gm(maj7) | % |
Gm6 | E♭maj7 Bm9 | G♭maj7♯11 | % |
C♯m9 | Em9 | E♭maj7♯5 | F♯13 |
F♯m9 | % |`,

`title: Fall
by: Wayne Shorter
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Em
[A]
F♯7susadd3 | B13♭9 | E7sus | E♭maj7♯11 |
F♯7susadd3 | B13♭9 | E7sus | E♭maj7♯11 |
Dmaj7 | D13♭9 | Gm7 | Bm7 A♭maj7♯11 |
F♯7susadd3 | B13♭9 | Em7 Cmaj7/B | % |`,

`title: Iris
by: Wayne Shorter
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Fm
time: 3/4
[A]
Fm11 | % | Emaj7♯11 | G♭maj7♯11 |
B♭7♯5 | D♭7♯11 | A♭maj7♯5 | % |
Cm7 | % | D♭7♯11 | Cm7 |
D♭7♯11 | D♭m♭6 | D♭7♯11 | % |`,

`title: Dance Cadaverous
by: Wayne Shorter
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: C
time: 3/4
[Intro]
A♭maj7 | % | % | % |
A7sus | % | A7♭9♯5 | % |
[A]
Bm(maj7) | % | Cm(maj7) | % |
C♯m7♭5 | % | F♯7♭9 | % |
Bm(maj7) | % | Cm(maj7) | % |
C♯m7 | % | F♯7sus | F♯7 |
Gmaj7 | % | C13♯11 | % |
C7alt | C7alt/A♭ | A♭m11 | % |
Fm7♭5 | % | B♭7♯9♯5 | % |
B♭m7 | % | C♯m7♭5 | F♯7♭9 |
[B]
Bm(maj7) | % | Cm(maj7) | % |
C♯m7♭5 | % | F♯7♭9 | % |
Bm(maj7)/D | % | Am7/D | D7 |
Gmaj7♯5 | Gmaj7♯5/F♯ | Em7 | Em7/D |
C♯m7♭5 | % | C13♯11 | % |
C7alt | C7alt/A♭ | A♭m11 | % |
G7sus | % | C♯m7♭5 | F♯7♭9 |
Cmaj7♯11 | % | % | % |`,

`title: Yes And No
by: Wayne Shorter
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: D
form: A A B
[A]
D7sus | % | % | % |
Dmaj7 | % | % | % |
Am7 D7 | Gmaj7 F7 | B♭maj7 | % |
Em7 | % |
[B]
Am7♭5 | % | D7♭9 | % |
Gm7 | % | C7 | % |
Fm7 | % | B♭7 | % |
E♭maj7 | % | Am7 | D7 |`,

`title: Ana Maria
by: Wayne Shorter
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: G
[A]
Gmaj7 | E♭maj7/G | G7sus | E♭maj7/G |
D♭maj7/F | G♭maj7♯11 | A♭m7 | B♭/A♭ |
Gm7 | C7sus | D/C | C7sus |
A♭/C B♭/C | A♭/C | G7♭9sus | E♭maj7/G |
G7♭9sus | E♭maj7/G |
[B]
Gmaj7 | G7sus | E♭/F E7alt | E♭7sus |
Dmaj7 F7♯5 | B♭m7 | A♭m7 | B♭/A♭ |
Gm7 | C7sus | B♭maj7 Am7 | Fm7 |
B♭7sus | % | D♭7sus |
[C]
Bm7 | % | E♭m7 | % |
Dmaj7 F7♯5 | B♭m7 | A♭m7 | B♭/A♭ |
Gm7 | C7sus | B♭maj7 Am7 | Fm7 Em7 |
G7♭9sus | E♭maj7/G | G7♭9sus | E♭maj7/G |`,

`title: Adam's Apple
by: Wayne Shorter
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: A♭
[A]
A♭7 | % | % | % |
% | % | % | % |
G♭7 | % | % | % |
A♭7 | % | % | % |
A♭m7 | D♭7 | B♭m7 | E♭7♯9 |
A♭7 | % | % | % |`,

`title: Wild Flower
by: Wayne Shorter
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 6/4
[A]
B♭maj7 | A♭m7 A7♯9♯5 | D7♭9sus | % |
B♭maj7 | A♭m7 A7♯9 | D7♯9 | % |
G7♭9sus | Cm7 F13 | B♭maj7♯5 A♭maj7♯11 | A♭maj7♯11 |
Gm11 | C13♭9 | Fm9 | E7♯9 |
[B]
E♭maj7 Cm7 | A♭m7 A7♯9 | D7♭9sus | % |
B♭maj7 | A♭m7 A7♯9 | D7♯9 | % |
G7♭9sus | Cm7 F13 | B♭maj7♯5 B♭m11 | B♭m11 E♭13 |
A♭maj7 D♭maj7 | A♭m7 E♭7♯11 | D7♯9 | % |`,

`title: One By One
by: Wayne Shorter
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Gm
form: Intro Intro A A B A
[Intro]
B♭maj7 | % | % | % |
[A]
Am7♭5 D7♭13 | Gm7 | Cm7 F7 | B♭maj7 |
A7♯9 A♭7 | Gm7 B♭7/F | Em7♭5 D7♭13 | Gm7 |
[B]
E7♯9 A7♯9 | Dm7 Bm7♭5 | Em7♭5 A7♭9 | Dm7 B♭7 |
A7♯9 A♭7 | Gm7 B♭7/F | Em7♭5 D7♭13 | Gm7 |`,

`title: Children Of The Night
by: Wayne Shorter
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Cm
[A]
Cm11 | % | A♭maj7 | % |
Cm11 | % | A♭maj7 | % |
Emaj7 | E♭m7 A♭7 | D♭maj7 | Cm7 F7 |
B♭maj7 | A♭maj7 | Gm7 G♭7 | Fm7 B♭7 |
E♭maj7 | Dm7 G7 | Cmaj7 | % |
E♭m7♭5 | % | % | Cm7♭5 F7 |
B♭m7 | D♭m7 G♭7 | Emaj7 | E♭7 |`,

`title: Ping Pong
by: Wayne Shorter
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: C
form: Intro Intro A A B
[Intro]
B♭13 | B13 | B♭13 | B13 |
[A]
B♭13 | B13 | B♭13 | B13 |
B♭13 | B13 | B♭13 | B13 |
D♭maj7 | Cm7 F7♯5 | B♭maj7 | A♭maj7 |
G7♭9 | G♭maj7 | Fm7 B♭7 | E♭maj7 |
D7♭9♯5 | D♭maj7 | Cm7 | F7 |
[B]
B♭m7 | E♭7 | A♭maj7 | G♭maj7♯11 |
Fm7 | B♭7 | F♯m7 | B7 |`,

`title: Jeannine
by: Duke Pearson
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: A♭
[A]
A♭m7 | % | % | % |
% | % | % | % |
F♯m7 | B7 | Emaj7 | A7 |
B♭m7 | E♭7♯9 | A♭maj7 | E♭7♯9 |
[A2]
A♭m7 | % | % | % |
% | % | % | % |
F♯m7 | B7 | Emaj7 | A7 |
B♭m7 | E♭7♯9 | A♭maj7 | E♭m7 A♭7 |
[B]
D♭maj7 | Gm7♭5 C7 | Fmaj7 | % |
Fm7 | B♭7 | B♭m7 | E♭7 |
[A3]
A♭m7 | % | % | % |
% | % | % | % |
F♯m7 | B7 | Emaj7 | A7 |
B♭m7 | E♭7♯9 | A♭maj7 | E♭7♭9 |`,

`title: Work Song
by: Nat Adderley
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Fm
[A]
Fm | % | % | % |
Fm | % | C7 | % |
Fm | % | % | % |
F7 | B♭7 | G7 C7 | Fm |`,

`title: Mercy Mercy Mercy
by: Joe Zawinul
genre: Jazz
feel: Funk
source: iReal Pro community chart
tempo: 110
key: B♭
[A]
B♭7 | E♭7 | B♭7 | E♭7 |
B♭7 | E♭7 | B♭7 | E♭7 |
[B]
B♭ E♭/B♭ | B♭7 E♭/B♭ | B♭ E♭/B♭ | B♭7 E♭/B♭ |
B♭ B♭/D E♭ | F7sus | B♭ B♭/D E♭ | F7sus |
Cm7 | Dm7 | Gm F Gm F | Gm |`,

`title: Dat Dere
by: Bobby Timmons
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: Cm
form: A A2 B A
[A]
Cm7 Cm7/B♭ | Am7♭5 A♭maj7 | Am7♭5 D7♯9 | Dm7♭5 G7♭9 |
Cm7 Cm7/B♭ | Am7♭5 A♭maj7 | Dm7♭5 G7♭13 | Cm7 G7♭13 |
[A2]
Cm7 Cm7/B♭ | Am7♭5 A♭maj7 | Am7♭5 D7♯9 | Dm7♭5 G7♭9 |
Cm7 Cm7/B♭ | Am7♭5 A♭maj7 | Dm7♭5 G7♭13 | Cm7 |
[B]
Dm7♭5 G7 Cm7 Cm/B♭ | Am7♭5 D7 Gm7 | Am7♭5 D7♯9 | Dm7♭5 G7♭9 |
Dm7♭5 G7 Cm7 Cm/B♭ | Am7♭5 D7 Gm7 | Dm7♭5 G7♭13 | Cm7 G7♭13 |`,

`title: Bohemia After Dark
by: Oscar Pettiford
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Gm
form: A A2 B A2
[A]
Gm7 | Am7♭5 D7♭9 | Gm7 | Am7♭5 D7♭9 |
Gm7 | Am7♭5 D7♭9 | Gm7 | D7♭9 Gm7 |
[A2]
Gm7 | Am7♭5 D7♭9 | Gm7 | Am7♭5 D7♭9 |
Gm7 | Am7♭5 D7♭9 | Gm7 | % |
[B]
C7sus | % | % | % |
C7sus | % | % | Am7♭5 D7♭9 |`,

`title: This Here
by: Bobby Timmons
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: F
time: 3/4
[A]
F7 | % | F7 | F7 |
F7 | % | F7 | F7 |
B♭7 | % | B♭7 | B♭7 |
F7 | % | F7 | F7 |
[B]
B♭7 | % | A7♭9 | % |
A♭7 | % | G7 | % |
A♭7 | % | A♭7 | A♭7 |
[C]
F7 | % | F7 | F7 |
F7 | % | F7 | F7 |`,

`title: Del Sasser
by: Sam Jones
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: E♭
form: A A B
[A]
Fm7 | B♭7 | E♭maj7 | % |
Fm7 | B♭7 | E♭maj7 | % |
E♭maj7 E♭maj7/D | Cm7 Cm7/B♭ | Am7♭5 | A♭m(maj7) |
Gm7 C7 | Fm7 B♭7 | E♭6 | % |
[B]
B♭m7 | E♭7 | A♭maj7 | % |
B♭m7 | E♭7 | A♭maj7 | % |
Gm7 | C7 | Fmaj7 | % |
Fm7 | B♭7 | Gm7 | C7 |`,

`title: Unit Seven
by: Sam Jones
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: C
form: A A2 B A
[A]
C7 | % | % | % |
F7 | % | C7 | A7♯9 |
A♭maj7 | G7♯9 | C7 A7 | D7 G7♯9 |
[A2]
C7 | % | % | % |
F7 | % | C7 | A7♯9 |
A♭maj7 | G7♯9 | C7 | A7♭13 |
[B]
Dm7 | G7 | Em7 | A7♭9 |
Dm7 | G7♭9 | E7 A7 | Dm7 G7 |`,

`title: Four On Six
by: Wes Montgomery
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Gm
[A]
Gm7 | % | % | % |
Cm7 F7 | B♭m7 E♭7 | Am7 D7 | E♭m7 A♭7 |
Gm7 | % | % | Cm7 F7 |
B♭maj7 Gm7 | E♭7 D7 | Gm7 | Am7♭5 D7♭9 |`,

`title: West Coast Blues
by: Wes Montgomery
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: B♭
time: 6/4
form: Intro Intro A
[Intro]
B♭7 | A♭7 | B♭7 | Bm7 E7 |
E♭7 | % | B♭7 | % |
F7 | E♭7 | B♭7 | % |
[A]
B♭7 | A♭7 | B♭7 | Bm7 E7 |
E♭7 | E♭m7 A♭7 | Dm7 G7 | C♯m7 F♯7 |
Cm7 | Cm7 F7 | B♭maj7 D♭7 | G♭maj7 F7 |`,

`title: Twisted Blues
by: Wes Montgomery
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: D♭
[A]
G♭7 | G7 | G♭7 | G7 |
G♭7 | G7 | G♭7 | G7 |
G♭7 | G°7 | D♭maj7 | Bm7 E7 |
B♭m7 E♭7 | Em7 A7 | E♭m7 A♭7 | Dm7 G7 |
B♭m7 E♭7 | A7 D7 | D♭7♯9 |`,

`title: Full House
by: Wes Montgomery
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Fm
time: 3/4
form: A A B A
[A]
Fm9 | B♭13 | Fm9 | B♭13 |
Fm9 | B♭13 | Fm9 | C7♯9 |
Fm9 | B♭13 | Fm9 | B♭13 |
Fm9 | B♭13 | Fm9 | % |
[B]
B♭m7 | E♭7 | A♭maj7 | D♭7 |
G♭maj7 | Bmaj7 | Gm7♭5 | C7♭9♭5 |`,

`title: Be-Bop
by: Dizzy Gillespie
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Fm
form: A A B A
[A]
Fm Gm7♭5 | Fm/A♭ B♭m6 | Fm/C | Gm7♭5 C7♭9 |
Fm Gm7♭5 | Fm/A♭ B♭m6 | Fm/C | Gm7♭5 C7 Fm |
[B]
Fm7 | B♭7♯9 | E♭maj7 | % |
E♭m7 | A♭7♯9 | D♭maj7 | Gm7♭5 C7♭9 |`,

`title: Salt Peanuts
by: Dizzy Gillespie
genre: Jazz
feel: Up Tempo Swing
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

`title: Shaw 'Nuff
by: Charlie Parker
genre: Jazz
feel: Up Tempo Swing
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

`title: Birk's Works
by: Dizzy Gillespie
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Fm
[A]
Fm6 | Gm7♭5 C7♭9 | Fm6 | Cm7♭5 F7♭9 |
B♭m7 | % | Fm6 | % |
A♭m7 D♭7 | Gm7♭5 C7♭9 | Fm6 | % |`,

`title: Sippin' At Bells
by: Miles Davis
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: F
[A]
Fmaj7 | Fm7 B♭7 | Am7 Gm7 | F♯m7 B7 |
B♭maj7 | B♭m7 E♭7 | Am7 | A♭m7 D♭7 |
Gm7 C7 | C♯m7 F♯7 | Am7 A♭7 | D♭maj7 G♭7 |
F6 | % |`,

`title: Walkin'
by: Miles Davis
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: F
[A]
F7 | B♭7 | F7 | Cm7 F7 |
B♭7 | B°7 | F7 | Am7 D7 |
Gm7 | C7 | F7 D7 | Gm7 C7 |`,

`title: Pent Up House
by: Sonny Rollins
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: G
[A]
Am7 | D7 | Gmaj7 | % |
Am7 | D7 | Gmaj7 | % |
Dm7 | G7 | Cm7 | F7 |
Am7 | D7 | Gmaj7 | % |`,

`title: Valse Hot
by: Sonny Rollins
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: A♭
time: 3/4
[Intro]
B♭m7 E♭7 A♭maj7 | % | % | A♭maj7 |
E♭m7 A♭7 D♭maj7 | % | % | D♭maj7 |
[A]
A♭maj7 | D♭maj7 | Cm7 | F7 |
B♭m7 | E♭7 | A♭maj7 | F7 |
B♭m7 | D♭m6 | Cm7 | F7 |
B♭m7 | E♭7 | A♭maj7 | E♭7 |`,

`title: Sonnymoon For Two
by: Sonny Rollins
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: B♭
[A]
B♭7 | E♭7 | B♭7 | % |
E♭7 | % | B♭7 | % |
Cm7 | F7 | B♭7 G7 | Cm7 F7 |`,

`title: Locomotion
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: B♭
form: A A B A2
[A]
B♭7 | % | % | % |
E♭7 | % | B♭7 | % |
Cm7 | F7 | B♭7 | % |
[B]
A♭7 | % | G7 | % |
G♭7 | % | F7 | % |
[A2]
B♭7 | % | % | % |
E♭7 | % | B♭7 | % |
Cm7 | F7 | B♭7 | % |
B♭7♭5 | % | A♭7♭5 | % |
G♭7♭5 | % | D7♭5 | % |
C7♭5 | % | B7/F | % |
B7/F | B7/F |`,

`title: Equinox
by: John Coltrane
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: C♯m
[A]
C♯m7 | % | % | % |
F♯m7 | % | C♯m7 | % |
A7♯11 | G♯7 | C♯m7 | % |`,

`title: Cousin Mary
by: John Coltrane
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: A♭
[A]
A♭7 | % | % | % |
D♭7 | % | A♭7 | % |
D7 | D♭7 | A♭7 | % |`,

`title: Central Park West
by: John Coltrane
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B
[A]
Bmaj7 Em7 A7 | Dmaj7 B♭m7 E♭7 | A♭maj7 Gm7 C7 | Fmaj7 C♯m7 F♯7 |
Bmaj7 Em7 A7 | Dmaj7 C♯m7 F♯7 | Bmaj7 | C♯m7/B |
Bmaj7 | C♯m7/B C♯m7 F♯7 |`,

`title: Satellite
by: John Coltrane
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: G
form: A B A C
[A]
Gmaj7 B♭7 | E♭maj7 F♯7 | Bmaj7 D7 | Gm7 C7 |
Fmaj7 A♭7 | D♭maj7 E7 | Amaj7 C7 | Fm7 B♭7 |
[B]
E♭maj7 | Am7♭5 D7♭9 | Gm7 | Am7♭5 D7♭9 |
Gmaj7 | Fm7 B♭7 | E♭maj7 G♭7 | Bmaj7 D7 |
[C]
E♭maj7 | Am7♭5 D7♭9 | Gmaj7 | Cm7 F7 |
D7sus | % | % | % |
D7sus | % | % | % |`,

`title: Lonnie's Lament
by: John Coltrane
genre: Jazz
feel: Slow Swing
source: iReal Pro community chart
tempo: 96
key: Cm
[A]
Cm7 Dm7 | E♭maj7 Dm7 | Cm7 Dm7 | E♭maj7 Dm7 |
Cm7 Dm7 | E♭maj7 Dm7 | Cm7 Dm7 | E♭maj7 Dm7 |
[B]
Cm7 B♭7 | E♭maj7 A♭maj7 | A♭7 A7 | A♭7 G7♭9 |
Cm7 Dm7 | E♭maj7 G7♯9 | Cm7 Dm7 | E♭maj7 Dm7 |`,

`title: Dear Lord
by: John Coltrane
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D
[A]
Dmaj7 | % | % | % |
Em7 | % | % | % |
Dmaj7 | % | % | % |
Bm | Bm(maj7) | Bm7 | Bm6 |
Bm | Bm(maj7) | Bm7 | Bm6 |
Em7 | % | A7sus | % |
A7sus | % | A7♯5 | % |
Dmaj7 | Bm7 | Em7 | A7 |
[B]
Dmaj7 | % | % | % |
Em7 | % | % | % |
Dmaj7 | % | % | % |
Gmaj7 | % | % | % |
Gmaj7 | % | % | % |
F♯m7 | % | Gmaj7 | % |
Em7 | F♯m7 | Gmaj7 | A7sus |
B♭maj7 | % | Dmaj7 | % |`,

`title: Once Upon A Summertime (La Valse Des Lilas)
by: Legrand-Barclay-Marnay-Mercer
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Fm
time: 3/4
[A]
Fm7 | A♭maj7 | Gm7♭5 | C7♭9 |
Fm7 | Dm7♭5 | G7♭13 | C7♭9 |
[B]
Cm7 | F7 | B♭6 | E♭7 |
Fmaj7 | Dm7 | Gm7 | C7 |
[C]
Fmaj7 | Dm7 | Gm7 | C7 |
F6 | Dm7 | Gm7 | C7 |
[D]
Cm7 | F7 | B♭6 | E♭7 |
Fmaj7 | Dm7 | G7 | Gm7 C7 |
F6 Dm7 | Gm7 C7♭9 |`,

`title: The Summer Knows
by: Michel Legrand
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Fm
[A]
Fm9 | C7♭9/E | Fm9/E♭ | Dm7♭5 |
B♭m9 | F7♭9/A | B♭m9/A♭ Gm7♭5 | C7♭9sus C7♭9 |
[B]
Fmaj7 | B♭m6/F | Fmaj7 | F9sus F7♭9 |
B♭maj7 | Bm7♭5 E7♭9 | Amaj7 E7♭9 | Amaj7 E♭7♭9 |
A♭maj7 E♭7♭9 | A♭maj7 D7♭9 | Gmaj7 | Gm7♭5 C7♭9 |
[C]
Fmaj7/C | B♭m6/C | Fmaj7/C | B♭m6/C |
Fm7/C F°7/C | C7♭9sus | Fm | % |`,

`title: Windows
by: Chick Corea
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Bm
time: 3/4
[A]
Bm7 | % | % | % |
G♯m7♭5 | % | % | C♯7 |
F♯m7 | % | % | % |
D7sus | % | % | % |
Emaj7♯11 | % | % | % |
% | % | % | % |
[B]
A♭7 | A7 | A♭7 | A7 |
A♭7 | A7 | A♭7 | A7 |
[C]
Emaj7 | Emaj7/D♯ | C♯m7 | C♯m7/B |
B♭m7♭5 | B♭m7♭5/A♭ | E♭7/G | E♭7 |
A♭m7 | A♭m7/G♭ | D♭7/F | D♭7 |
Emaj7 | D♯m7 | C♯m7 | C7♯11 |
Bmaj7 | % | C♯m7/B | % |
Bmaj7 | % | C♯m7/B | % |`,

`title: Litha
by: Chick Corea
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: D
[A]
Dmaj7 | C♯m7 | Bmaj7 | B♭m7 |
A♭maj7 | Gm7 | Fmaj7♯11 | % |
% | % | Dmaj7 | % |
% | % | E♭maj7 | % |
% | % | Cmaj7 | % |
% | % | F7sus | % |
% | % | B7♯9 | % |
% | % |
[B]
Em7 | % | % | % |
% | % | % | % |
B♭7sus | % | % | % |
% | % | % | % |
Am7 | % | % | % |
% | % | % | % |
E♭7sus | % | % | % |
% | % | % | % |`,

`title: Humpty Dumpty
by: Chick Corea
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: C
[A]
E♭maj7 | Dmaj7 | G♭maj7 | Fmaj7 |
A7alt | B♭maj7 | B♭m7 | % |
% | % | Dm7 | Bm7 |
A♭m7 | % | Fm7 | A♭m7 |
G♭maj7 | B♭7♯5 | A♭m7 G♭maj7 | Emaj7 |
D7 | C♯m7 F♯7 | Bmaj7 | B♭7 |
E♭m7 | Cm7 Am7 |`,

`title: Tones For Joan's Bones
by: Chick Corea
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: D
[Intro]
Em7 | % | % | % |
Em7♭5 | % | % | Em7♭5 E♭7 |
[A]
Dmaj7 | % | Gm7/D | % |
D7♯9 | F7♭9 | B♭maj7 A♭m7 | G♭maj7 F7 |
B♭m7♭5 | % | E♭7♯9 | % |
A♭m7 | A♭m7/G♭ | Fm7♭5 | Emaj7♯11 |
[B]
E♭maj7 | G♭maj7 | Fmaj7 | A♭maj7 |
Cmaj7 | E♭maj7 | D♭m(maj7) | A7♭9 |
[A2]
Dmaj7 | % | Gm7/D | % |
D7♯9 | F7♭9 | B♭maj7 | % |
Em7 | A7 B♭°7 | Bm7 | E7 |
Em7 F♯m7 | Fm7 B♭7 | E♭maj7 Dm7 | Cm7 F7 |
Em7 F♯m7 | Gmaj7 A7♭9 | E♭maj7♯11 | % |`,

`title: Sometime Ago
by: Sergio Mikanovich
genre: Jazz
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: C
time: 3/4
form: A B A C
[A]
Cmaj7 | G7sus | Cmaj7 | G7sus |
Cmaj7 | G7sus | Em7♭5 | A7 |
[B]
Dm7 | G7 | E7 | Am7 |
D7 | % | E♭m7 A♭7 | Dm7 G7 |
[C]
Dm7 | G7 | Em7 | A7♭13 |
Dm7 | G7 | B♭7 | A7 |
Dm7 | G7 | C6 | G7 |`,

`title: Bud Powell
by: Chick Corea
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: F
form: A A B C A2
[A]
Fmaj7 | Bm7♭5 B♭7 | Am7 | D7♭9 |
Gm7 | B♭m7 E♭7 | Dm7 | G7 G♯°7 |
Am7 D7 | Gm7 D♭7 C7 | B7 B♭7 A7 | A♭7 D♭ C7♯5 |
[B]
F7♭9 | % | B♭m B♭m♭6 | B♭m6 B♭m♭6 |
Gm7♭5 | C7♭9 | Em7 A7♭9 | C♯m7 F♯7♭9 |
[C]
Bmaj7 | Cmaj7/B | Bmaj7 | Cmaj7/B |
Bmaj7 | Cmaj7/B | B♭m7 E♭7 | Am7 D7 |
A♭m7 D♭m7 | Gm7 C7 |
[A2]
Fmaj7 | Bm7♭5 B♭7 | Am7 | D7♭9 |
Gm7 | B♭m7 E♭7 | Dm7 | G7 G♯°7 |
Am7 D7 | Gm7 D♭7 C7 | B7 B♭7 A7 | A♭7 D♭ C7♯5 |
F7♯11 |`,

`title: Eye of the Hurricane
by: Herbie Hancock
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: Fm
[A]
Fm6 B♭6 | E♭7sus A♭7sus | D♭maj7 C7 | N.C. |
G♭m7 B♭m | N.C. | E♭7♯9/F | % |
E♭7♯9/F | % | N.C. | Fm7 |
Fm7 |
[B]
Fm6 B♭6 | E♭7sus A♭7sus | D♭maj7 C7 | N.C. |
Amaj7♯11 Cmaj7 | N.C. | E♭7♯9/F | E♭7♯9/F |
% | % | N.C. | N.C. |
Fm7 | % |`,

`title: One Finger Snap
by: Herbie Hancock
genre: Jazz
feel: Up Tempo Swing
source: iReal Pro community chart
tempo: 200
key: E♭
[A]
C7sus | % | % | % |
E♭7sus | % | % | % |
A♭7sus | % | % | % |
Gm7♭5 | C7alt | Fm7♭5 | B♭7alt |
E♭maj7 | % | Dm7♭5 | G7alt |`,

`title: Oliloqui Valley
by: Herbie Hancock
genre: Jazz
feel: Even 8ths
source: iReal Pro community chart
tempo: 110
key: C
[A]
F7sus | % | % | % |
E♭7sus | % | % | % |
Em(maj7) | % | % | % |
F7sus | % | % | % |
E♭7sus | % | % | % |
Em7 | F♯m7/E | Em7 | F♯m7/E |
Em7 | F♯m7/E | Em7 | Gm7 G♭7 |`,

`title: Tell Me A Bedtime Story
by: Herbie Hancock
genre: Jazz
feel: Funk
source: iReal Pro community chart
tempo: 110
key: C
[Intro]
Gmaj7 | % | F♯m7 | % |
Gmaj7 | % | F♯m7 | F♯m7 |
[A]
Gmaj7 | % | F♯m7 | % |
Gmaj7 | F♯m7 | Cmaj7♯11 | % |
Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 | Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 |
[B]
B7sus | B7♯5 | Emaj7 E7♯9 | E♭7♯9 |
Dmaj7 | D♭7♯9 | Cmaj7♯11 | % |
Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 | Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 |
[C]
B7sus | A7sus | A♭m7 | Em7 |
[D]
D♭m7 | E♭m7 | Em7 | F♯m7 |
[A2]
Gmaj7♯11 | % | F♯m7 | % |
Em7 | A7 | Dmaj7 | Cmaj7♯11 |
Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 | Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 |
Emaj7 Cmaj7 | Bmaj7 Gmaj7 | Emaj7 Cmaj7♯11 | Bmaj7 Gmaj7 |
Emaj7 Cmaj7♯11 |`,

`title: Toys
by: Herbie Hancock
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Dm
[A]
B♭7 | % | F7 | % |
E7♯9 | D♭ | Cm7 | % |
[B]
E♭7 | % | Dm | B♭7 |
Dm | B♭7 | Dm | % |`,

`title: Driftin'
by: Herbie Hancock
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: E♭
[A]
E♭7 G7 | A♭7 G7 | Cm7 B♭m7 | Am7♭5 A♭7 |
Gm7 | C7 | Fm7 | B♭7♭9 |
[A2]
E♭7 G7 | A♭7 G7 | Cm7 B♭m7 | Am7♭5 A♭7 |
Gm7 | C7 | Fm7 B♭7 | E♭ A13♯11 |
[B]
A♭7 | % | E♭7 | % |
Cm7 Cm(maj7) | Cm7 F7 | Fm7 | B♭7 |
[A3]
E♭7 G7 | A♭7 G7 | Cm7 B♭m7 | Am7♭5 A♭7 |
Gm7 | C7 | Fm7 B♭7 | E♭ B♭7 |
E♭ C7 | Fm7 B♭7 | E♭7 C7 | Fm7 B♭7 |
E♭7 C7 |`,

`title: Time Remembered
by: Bill Evans
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Bm
[A]
Bm9 | Cmaj7♯11 | Fmaj7♯11 | Em9 |
Am9 Dm9 | Gm9 | E♭maj7♯11 | A♭maj7♯11 |
Am9 | Dm9 | Gm9 | Cm9 |
Fm11 | Em9 | Bm9 | % |
E♭m9 | Am9 | Cm9 | F♯m9 |
Bm9 | Gm9 | E♭maj7♯11 | Dm7 |
Cm9 | % |`,

`title: Turn Out The Stars
by: Bill Evans
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Am
[A]
Bm7♭5 E13 | Am A7♯5 | Dm7 G7♭9 | Cmaj7 Am7 |
Fm7 B♭7 | E♭maj7 Cm7 | Am7 D7 | Gmaj7 Em7 |
C♯m7 F♯7 | Bmaj7 G♯m7 | C♯m7 | B♭m7♭5 E♭7 |
A♭m7 | Fm7♭5 B♭7♯9♯5 | E♭m7 E♭m7/D♭ | Bmaj7 E♭m7/B♭ |
[B]
A7sus A13♭9 | Dmaj7/A | A7sus | Dmaj7/A |
G7sus G13♭9 | Cmaj7/G | G7sus G7 | Cmaj7/G C13 |
[C]
B7♯5 | Em7 B♭7♯11 | A7♯5 | Dm7 A♭7♯11 |
G7♯5 | Cm7 E♭9 | A♭maj7 C7♭9 | Fm9 |
Dm7♭5 G7♯9♯5 | Cm7 E♭7sus | A♭maj7 G7♭9 | Cmaj7 F♯7♯11 |
Bm7♭5 E13 | Am | A♭7sus A♭13♭9 | C♯m7 F♯7 |`,

`title: Funkallero
by: Bill Evans
genre: Jazz
feel: Medium Up Swing
source: iReal Pro community chart
tempo: 168
key: Cm
[A]
D7 | G7♭13 | Cm(maj7) | % |
D7 | G7♭13 | Cm(maj7) | % |
B♭m7 | E♭7 | A♭maj7 D♭7 | Cm7 |
D7 | G7♭13 | Cm(maj7) | % |`,

`title: Interplay
by: Bill Evans
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: Fm
[A]
Fm6 | % | % | F7♭9 |
B♭m7 | % | Fm6 | % |
D♭7 | C7♭9 | Fm6 | Gm7♭5 C7♭9 |`,

`title: Re: Person I Knew
by: Bill Evans
genre: Jazz
feel: Medium Swing
source: iReal Pro community chart
tempo: 132
key: C
[A]
C69 | C+ | F♯+/C | B♭maj7/C |
Fm7/C | % | Cm9 | % |
Fm(maj7)/C | Cm11 | Fm7/C | B♭maj7♯5/C |
Fm(maj7)/C | B♭maj7/C | Fm7/C | D♭/C |`,

`title: Laurie
by: Bill Evans
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: B♭
[A]
B♭maj7 | E7♭9sus E7♯9♯5 | Am7 | D7♯5 |
Gm9♭5 | C7♯9♯5 | Cm7 | F7♯5 |
Fm9 | B♭7♯9♯5 | E♭m7 | A♭7♯9 |
Dm7♭5 | D♭7sus D♭7 | C7sus C7 | B7sus B9♯11 |
B♭maj7 | E7♭9sus E7♯9♯5 | Am7 | D7♯5 |
Gm9♭5 | C7♯9♯5 | Cm7 | F7♯5 |
Fm9 | B♭7♯9♯5 | E♭m7 | A♭7♯9 |
Gm9 | Am9 | Bm9 | C♯m9 |
Cm7♭5 | F7♯9♯5 | B♭13sus | A♭13sus |
G♭13 | F13sus F7♯9 |`,

`title: Detour Ahead
by: Frigo - Carter - Ellis
genre: Jazz
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
[A]
Cmaj7 F♯7♭9 | B7alt | F Em7 Am7 | D7 Dm7 G7 |
Gm7 C7 | Fmaj7 B♭7 | Cmaj7 Am7 | A♭7 G7 |
[A2]
Cmaj7 F♯7♭9 | B7alt | F Em7 Am7 | D7 Dm7 G7 |
Gm7 C7 | Fmaj7 B♭7 | Cmaj7 Am7 | F♯m7♭5 B7♭9 |
[B]
Em | B7alt | Emaj7 | F♯m7♭5 B7♭9 |
Em | B7alt | Emaj7 | D♭7 |
[A3]
Cmaj7 F♯7♭9 | B7alt | F Em7 Am7 | D7 Dm7 G7 |
Gm7 C7 | Fmaj7 B♭7 | Cmaj7 E7♯9 | Am7 E♭7 |
D7 G7 | Cmaj7 G7♯5 |`,

`title: 500 Miles High
by: Chick Corea
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Em
[A]
Em7 | % | Gm7 | % |
B♭maj7 | % | Bm7♭5 | E7♯9 |
Am7 | % | F♯m7♭5 | % |
Fm7 | % | Cm7 | % |
B7♯9 | % | Cm7 | % |
A♭maj7 | % | Cm7 | % |
A♭maj7 | % |`,

`title: Armando's Rhumba
by: Chick Corea
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: Cm
[A]
Cm7 | D7♭9 | G7♭13 | Cm7 |
Cm7 | D7♭9 | G7♭13 | Cm7 |
[B]
C7♭9 | Fm7 | D7♭9/F♯ | Gm7 |
A♭°7 | D7♭9/A | B♭7sus | % |
B♭7♭9sus | % | E♭6 | G7♭13 |`,

`title: Manha De Carnaval (Black Orpheus)
by: Luiz Bonfa
genre: Latin
feel: Bossa Nova
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

`title: Chega De Saudade (No More Blues)
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Dm
[Intro]
Gm9 | A7♭9 | Dm7 | Dm7 Dm7/C |
B°7 | E♭/B♭ A7 | Dm7 | E♭7♯11 |
[A]
Dm | Dm7/C | E7♭9/B | % |
Em7♭5/B♭ | A7♭9 | Dm | Em7♭5 A7 |
Dm | Bm7♭5 E7 | Am | % |
B♭maj7 | % | Em7♭5 | A7♭9 |
[B]
Dm | Dm7/C | E7♭9/B | % |
Em7♭5/B♭ | A7♭9 | Dm | D7♭9 |
Gm | A7♭9 | Dm | Dm7/C |
E7♭9/B | A7♭9 | Dm | Em7 A7 |
[C]
Dmaj7 | B7/D♯ | Em7 | % |
A7sus | A7 | D°7 | Dmaj7 |
F♯m7 | F°7 | Em7 | % |
E7 | % | Em7♭5 | A7 |
[D]
Dmaj7 | Bm7 | E7 | % |
F♯7 | % | Bm7 B♭m7 | Am7 D7 |
Gmaj7 | Gm7 | F♯m7 | B7 |
E7 | A7 | F♯m7 | B7 |
E7 | A7 | D6 | A7 |`,

`title: Con Alma
by: Dizzy Gillespie
genre: Latin
feel: Afro
source: iReal Pro community chart
tempo: 110
key: C
form: A A B A
[A]
Emaj7 G♯7/D♯ | C♯m7 B7 | B♭7 | E♭maj7 E♭m7 A♭7 |
D♭maj7 F7/C | B♭m7 A♭7 | G7 | Cmaj7 |
[B]
Cm7♭5 | F7♭9 | F♯m7 | B7 |
Emaj7 | % | Fm7 | B♭7 |`,

`title: Estate
by: Bruno Martino
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Bm
form: A A B
[A]
Bm7 | % | Em7 | F♯7♭9 |
Bm7 | % | Em7 | A7 |
D7sus | D7 | Gmaj7 | % |
F♯7 | F♯7♯5 |
[B]
Bmaj7 | % | Fm7♭5 | B♭7♭9 |
E♭m7 | A♭7♭9 | Em7 | A7 |
D7sus | D7 | Gmaj7 | % |
F♯7 | F♯7♯5 |`,

`title: The Gentle Rain
by: Luiz Bonfa
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Am
[A]
Am6 | % | E7♭9/G♯ | % |
Gm6 | C7 | F6 | % |
F♯m7♭5 | B7♭9 | Em7♭5 | A7♭9 |
Dm7♭5 | Bm7♭5 E7♭9 | Am6 | B♭7♯11 |
[A2]
Am6 | % | E7♭9/G♯ | % |
Gm6 | C7 | F6 | % |
F♯m7♭5 | B7♭9 | Em7♭5 | A7♭9 |
Dm7♭5 | Bm7♭5 E7♭9 | Am7 D7 | Gm7 C7 |
F6 | C7 | F6 | Em7 |
Am6 | B♭7♯11 |`,

`title: Inútil Paisagem (If You Never Come To Me)
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: B♭
[A]
B♭maj7 | Amaj7 | A♭maj7♯11 | G7♭9 |
Cm11 | % | E♭m7 | A♭7 |
D7 | G7 | C7♯9 | F7 |
B♭7 | E♭7 | B♭maj7 | B7♯11 |`,

`title: Meditation
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
form: A A B
[A]
C6 | % | B7sus | B7 |
C6 | % | Em7 | A7♭13 |
Dm7 | % | Fm6 | % |
Em7 | A7♭13 | Dm7 | G7♯5 |
[B]
Fmaj7 | % | Fm6 | % |
Em7 | E♭°7 | Dm7 | G7♯5 |
Em7 A7♭13 | Dm7 G7 | C6 | Dm7 G7 |`,

`title: My Little Suede Shoes
by: Charlie Parker
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: E♭
form: A A B A
[A]
Fm7 B♭7 | E♭maj7 | Fm7 B♭7 | E♭maj7 |
Fm7 B♭7 | Gm7 C7 | Fm7 B♭7 | E♭maj7 |
[B]
A♭maj7 | Gm7 C7 | Fm7 B♭7 | E♭maj7 |
A♭maj7 | Gm7 C7 | Fm7 B♭7 | E♭maj7 |`,

`title: Nica's Dream
by: Horace Silver
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: B♭m
form: A A B
[A]
B♭m(maj7) | % | A♭m(maj7) | % |
B♭m(maj7) | % | A♭m7 | D♭7 |
A♭m7 | D♭7 | G♭maj7 | C7♯9♯5 |
F7♯5 | % | B♭m(maj7) | % |
[B]
A♭7sus | % | Fm7♭5 | B♭7♯5 |
E♭7 | A♭7 | D♭maj7 | Em7 A7 |
A♭7sus | % | Fm7♭5 | B♭7♯5 |
E♭7 | A♭7 | D♭maj7 | Cm7♭5 F7♭9 |
B♭m(maj7) | A♭m(maj7) | G♭7 | C7♯9♯5 |
F7♯5 | % | B♭m(maj7) N.C. | N.C. |`,

`title: The Night Has A Thousand Eyes (Coltrane Changes)
by: Jerry-Brainin
genre: Latin
feel: Latin-Swing
source: iReal Pro community chart
tempo: 132
key: G
[A]
Gmaj7/D | % | D7sus | % |
Gmaj7/D | % | D7sus | D7 |
Dm7 | G7 | Cmaj7 | F7 |
Gmaj7/D | D7sus | G/D | D7sus |
[A2]
Gmaj7/D | % | D7sus | % |
Gmaj7/D | % | D7sus | D7 |
Dm7 | G7 | Cmaj7 | F7 |
Gmaj7/D | D7sus | G/D | Gmaj7 |
[B]
Cm7 | F7 | Dmaj7 F7 | B♭maj7 |
B♭m7 | E♭7 | Cmaj7 E♭7 | A♭maj7 |
Am7 | D7sus | Gmaj7 | Em7 |
D7sus | % | Gmaj7/D | % |
D7sus | % | Gmaj7/D | Gmaj7 N.C. |`,

`title: Once I Loved (O Amor Em Paz)
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Dm
[A]
Gm7 | C7♯5 | Fmaj7 | F♯°7 |
Gm7 | G♯°7 | Am7 | Am7/G |
Fm7 | B♭7♯5 | E♭maj7 | % |
Em7♭5 | A7♭9 | Dmaj7 | D7♭9 |
Gm7 | C7♯5 | Fmaj7 | F♯°7 |
Gm7 | G♯°7 | Am7 | Am7/G |
Fm7 | B♭7♯5 | E♭maj7 | % |
Em7♭5 | A7♭9 | Dmaj7 | G7 |
Cmaj7 | F7 | B♭maj7 | % |
B°7 | B♭m6 | Am6 | A♭7♯11 |
G7 | Gm7 A7♭9 | Dm6 | % |`,

`title: One Note Samba
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: B♭
[A]
Dm7 | D♭7 | Cm7 | B7♯11 |
Dm7 | D♭7 | Cm7 | B7♯11 |
Fm7 | B♭7 | E♭maj7 | A♭7 |
Dm7 | D♭7 | Cm7 B7♯11 | B♭6 |
[B]
E♭m7 | A♭7 | D♭maj7 | % |
C♯m7 | F♯7 | Bmaj7 | Cm7♭5 F7 |
[A2]
Dm7 | D♭7 | Cm7 | B7♯11 |
Dm7 | D♭7 | Cm7 | B7♯11 |
Fm7 | B♭7 | E♭maj7 | A♭7 |
D♭6 | C7 | Bmaj7 | B♭6 |`,

`title: Perdido
by: Juan Tizol
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: B♭
form: A A2 B A
[A]
Cm7 | F7 | B♭6 | Dm7 G7 |
Cm7 | F7 | B♭6 | Dm7 G7 |
[A2]
Cm7 | F7 | B♭6 | Dm7 G7 |
Cm7 | F7 | B♭6 | % |
[B]
D7 | % | G7 | % |
C7 | % | F7 | % |`,

`title: Pensativa
by: Clare Fischer
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: G♭
[A]
G♭maj7 | G7♯11 | G♭maj7 | G7♯11 |
G♭maj7 | E♭7♯9 | Dmaj7 | A♭7 |
Gmaj7♯11 | F♯m7 B7 | Em7 A7 | Dmaj7 |
A♭m7 | G7 | G♭maj7 | F7 |
[A2]
G♭maj7 | G7♯11 | G♭maj7 | G7♯11 |
G♭maj7 | E♭7♯9 | Dmaj7 | A♭7 |
Gmaj7♯11 | F♯m7 B7 | Em7 A7 | Dmaj7 |
A♭m7 | G7 | G♭maj7 | D♭m7 G♭7 |
[B]
Cmaj7 | Am7 | Fmaj7 | E7♯9 |
Dm7 | G7 | Cmaj7 | Bm7 B♭7 |
Amaj7 Amaj7/G♯ | F♯m7 | Bm7 | E7♭9 |
Amaj7 | % | Dm7 | G7 |`,

`title: Poinciana
by: Nat Simon
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: D
form: Intro Intro A A B A2
[Intro]
A7sus | % | % | % |
A7sus | % | D6 | % |
[A]
D6 | % | Am/D | % |
Gm7 | Em7♭5 A7♭9 | D6 | % |
[B]
Gm7 | % | Amaj7 | % |
Gm7 | % | A7sus | % |
[A2]
D6 | % | Am/D | % |
Gm7 | Em7♭5 A7♭9 | D6 | A7sus |`,

`title: The Shadow Of Your Smile
by: Johnny Mandel
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: G
[A]
F♯m7 | B7♭9 | Em7 | A7 |
Am7 | D7 | Gmaj7 | Cmaj7 |
F♯m7♭5 | B7♭9 | Em7 | Em7/D |
C♯m7♭5 | F♯7♭9 | F♯m7♭5 | B7♭13 |
[B]
F♯m7 | B7♭9 | Em7 | A7 |
Am7 | D7 | Bm7♭5 | E7♭9 |
Am7 | Cm7 F7 | Bm7 | E7♭13 |
A7 | D7sus D7♭9 | G6 | % |`,

`title: Ceora
by: Lee Morgan
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: A♭
form: A B A C
[A]
A♭maj7 | B♭m7 E♭7 | A♭maj7 | E♭m7 A♭7 |
D♭maj7 | Dm7 G7 | Cm7 | F7♯9 |
[B]
B♭m7 | E♭7 | Cm7 | F7 |
Dm7 | G7 | Cm7 F7 | B♭m7 E♭7 |
[C]
B♭m7 | E♭7 | Cm7♭5 | F7♯9 |
B♭m7 | E♭7 | A♭maj7 | B♭m7 E♭7 |`,

`title: Señor Blues
by: Horace Silver
genre: Latin
feel: Afro
source: iReal Pro community chart
tempo: 110
key: E♭m
time: 1/2
[A]
E♭m69 | % | % | % |
B7♯11 | % | E♭m69 | % |
B♭9 | A♭9 | E♭m69 | % |`,

`title: Mahjong
by: Wayne Shorter
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: Fm
form: Intro Intro A B C A
[Intro]
Fm11 | E♭69 | Fm11 | E♭69 |
[A]
Fm11 | E♭69 | Fm11 | E♭69 |
Fm11 | E♭69 | Fm11 | E♭69 |
[B]
D♭maj9 | E♭69 | D♭maj9 | E♭69 |
D♭maj9 | E♭69 | D♭maj9 | E♭69 |
[C]
D7♯9 | E♭m7 A♭7 | D♭maj9 | D♭m7 G♭7 |`,

`title: Road Song
by: Wes Montgomery
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: Gm
form: A A B A
[A]
Gm7 | % | Am7♭5 | D7♭9 |
Gm7 Gm7/F | E♭maj7 | Em7♭5 Cm7 | D7♯9 Gm7 |
[B]
Cm7 | F7 | B♭maj7 | Bm7 E7 |
B♭m7 | E♭7 | A♭maj7 | Am7 D7 |`,

`title: Tin Tin Deo
by: Dizzy Gillespie
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: Fm
form: A B A B C B
[A]
Fm6 E♭m6 | D♭maj7 C7♯5 | Fm6 D7♯9 | Gm7♭5 G♭7 |
Fm6 E♭m6 | D♭maj7 C7♯5 | Fm7 B♭7 | E♭7 D7♯9♭5 |
[B]
C7♯9 | % | Fm6 | % |
C7♯9 | % | Fm6 | % |
[C]
B♭m7 | B♭m7 E♭7♭9 | A♭maj7 D♭7 | Cm7 F7♭9 |
B♭m7 | B♭m7 E♭7♭9 | A♭maj7 Dm7♭5 | G♭7♭9 Dm7♭5 |`,

`title: Manteca
by: Dizzy Gillespie
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: B♭
form: Intro Intro A A B A
[Intro]
B♭7 | % | % | % |
[A]
B♭7 | % | % | % |
B♭7 | % | B♭7 A♭7 | D♭7 G♭7 F7 |
[B]
A♭m7 | D7♭9 | G♭maj7 | B7♯11 |
B♭7 | E♭7 | A♭maj7 | % |
A♭m7 | D♭7 | G♭maj7 | F♯m7♭5 B7♭9 |
Fm7♭5 | B♭7♭9 | Cm7♭5 | F7♭9 |`,

`title: Like Sonny
by: John Coltrane
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: E♭
form: A B A
[A]
Dm7 | % | Fm7 | % |
A♭m7 | A♭m7 B♭7 | E♭maj7 | % |
[B]
Am7 | % | Fm7 | % |
C♯m7 | C♯m7 F♯7 | Bmaj7 | E♭m7 A♭7 |`,

`title: In A Silent Way
by: Josef Zawinul
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: C♯m
[A]
E | D6/E | % | Fmaj7♯11/E |
E | G♯m7 | Amaj7 | G♯m7 |
G♯m7 | Dmaj7/E | D C♯m7 | Bm7 E7 |
C♯m7 C/G♯ | A/F | Dmaj9 | B/C♯ |
B/C♯ Bm6/C♯ | Bm7/C♯ | % | C/C♯ |
C♯m7 | E G♯m7 | Amaj7 | G♯m7 |
G♯m7 | Dmaj7/E | D C♯m7 | Bm7 E7 |
C♯m7 C/G♯ | A/F | Dmaj9 | C♯m11 |`,

`title: Triste
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: A
[A]
Amaj7 | % | Fmaj7♯11 | % |
Amaj7 | % | C♯m7 | F♯7♭9 |
Bm7 | G♯m7♭5 C♯7♭9 | F♯m7 | G♯7♯9 |
C♯maj7 | D♯m7 G♯7 | C♯maj7 F♯7 | Bm7 E7 |
[B]
Amaj7 | % | Am7 | D7 |
Amaj7 | % | Em7 | A7 |
Dmaj7 | G7 | C♯m7 F♯7 | B7 |
Bm7 | E7 | Am7 D7 | Am7 D7 |
Am7 D7 | Am7 D7 |`,

`title: Dindi
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: E♭
form: v v A A2 B A3
[v]
E♭maj7 | D♭maj7 | E♭maj7 | D♭maj7 |
Cmaj7 | Am9 | Dm9 | G13 |
[A]
E♭maj7 | D♭maj7 | E♭maj7 | B♭m7 E♭7 |
A♭maj7 | A♭m(maj7) | E♭6 | B♭m7 |
[A2]
E♭maj7 | D♭maj7 | E♭maj7 | B♭m7 E♭7 |
A♭maj7 | A♭m(maj7) | E♭6 | Am7♭5 D7♭9 |
[B]
Gm | E♭m6 | Gm E♭m6 | Gm7 C7♭9 |
Fm | C♯m6 | Fm C♯m6 | Fm7 B♭7♭9 |
[A3]
E♭maj7 | D♭maj7 | E♭maj7 | B♭m7 E♭7 |
A♭maj7 | A♭m(maj7) | E♭6 | D♭7 |`,

`title: Insensatez
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Bm
[A]
Bm9 | % | B♭°7 | % |
Am6 | % | E7/G♯ | % |
G6 | % | Cmaj7 | % |
C♯m7♭5 | F♯7♭9♯5 | Bm(maj7) | Bm7 B♭13 |
[B]
D7/A | % | A♭°7 | % |
Gmaj7 | C♯m7♭5 F♯7♯5 | Bm7 | B♭7♯11 |
D7/A | % | G♯m7 | C♯7♭9 |
G6 | F♯7♯5 | Bm7 | % |`,

`title: Agua De Beber
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Dm
form: Intro Intro A B C
[Intro]
Dm7 | E7♯9 A7♭13 | Dm7 | E7♯9 A7♭13 |
Dm7 | B♭maj7 | Dm7 | % |
[A]
E7♭9 | A7alt | Dm7 | G7 |
Gm7 | C7 | Fmaj7 | % |
E7 E♭7 | Dm7 D♭°7 | F7/C | E7♯9/B |
E7♭9 | A7sus | Dm7 | D7♭9 |
[B]
G7 | Gm7 | Dm7 | D7♭9 |
G7 | Gm7 | Dm7 | A7♭13 |
[C]
Dm7 | E7♯9 A7♭13 | Dm7 | E7♯9 A7♭13 |
Dm7 | B♭maj7 | Dm7 | % |`,

`title: Look To The Sky
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: E♭
[A]
E♭maj7 | % | E♭m7 | A♭7 |
E♭maj7 | % | Gm7 | C7♭9 |
Fm7 | % | A♭m7 | D♭7 |
Gm7 | G♭°7 | Fm7 | B♭7♯5 |
[A2]
E♭maj7 | % | E♭m7 | A♭7 |
E♭maj7 | % | Gm7 | C7♭9 |
Fm7 | % | A♭m7 | D♭7 |
G♭maj7 | Emaj7♯11 | E♭maj7 | % |
E♭maj7 | Gm7 C7♭9 | Fm7 | Emaj7♯11 |
E♭maj7 | A♭m7 D♭7♭9 | G♭maj7 | Emaj7♯11 |
E♭maj7 | % |`,

`title: La Fiesta
by: Chick Corea
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: A
time: 6/4
form: Intro Intro A A2 B B2 C
[Intro]
E | F | G F | E |
[A]
E | F | G F | E |
[A2]
E | F | G F | E |
E | F | G F | E |
E | F | G F | E |
E | F | G F | E |
E | F | G F | E |
Amaj7 Dmaj7/A | % | % | % |
[B]
Amaj7 C♯7 | Dmaj7 D♯m7♭5 | Amaj7/E F°7 | F♯m7 B7 |
E7 Amaj7 | Dmaj7 | C♯m7 F♯7 | B7 |
E7 |
[B2]
Amaj7 C♯7 | Dmaj7 D♯m7♭5 | Amaj7/E F°7 | F♯m7 B7 |
E7 Amaj7 | Dmaj7 | C♯m7 F♯7 | B7 E7 |
[C]
Amaj7 Bm/A | Amaj7 Dm/A | Em/A F/A | G F |
E | F | G F | E |
E | F | G F | E |
Amaj7 Dmaj7/A | % | % | % |
Amaj7 Dmaj7/A | % | % | % |`,

`title: Captain Marvel
by: Chick Corea
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: C
[A]
Em7 | % | Bm7 | % |
F♯m7 | % | B♭m7 | B♭m7/A♭ |
Gm7♭5 | C7♭9 | D♭maj7 | G♭maj7♯11 |
Cm7/F | F7 | B♭maj7 | % |
E♭maj7♯11 | % | B♭maj7/D | D♭7 |
Cm7 | F7 F♯° | Gm7 | % |
A♭maj7 | % | Dm7 | E♭maj7 |
Em7♭5 | E♭maj7 | Dm7 | D♭7♯11 |
Cm7 | Cm7/F |
[B]
Gm F | E♭ F | Gm7 F | E♭ F |
[B2]
Gm F | E♭ F | Gm7 F | E♭ |
Gm7 | % | Fm(maj7)/G | % |
Dm7/G | % | Fmaj7 | % |
E♭maj7 | E♭maj7 Em | Em | Em Cm7/F |
Cm7/F | % | N.C. | F Gm |`,

`title: Speak Like A Child
by: Herbie Hancock
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Am
[A]
C♯7alt | % | G♯7alt | E9sus Am7 |
B♭13 | B♭7♯5 | B♭m9 | E♭13 |
A♭13sus | A♭13sus A♭13♭9 | G7alt | % |
G♭maj7♯11 | % | G♭°7 | % |
E♭9sus | E♭13 | E♭m9 | D7♯9 |
D♭7alt C7 | Fmaj7 B♭m9 | Am9 | E9sus |
Am9 | E9sus |
[B]
C♯7alt | % | G♯7alt | E9sus Am7♭5 |
B♭13 | B♭7♯5 | A7♯9♯5 | A13♭9 |
A♭13 | A♭13♭9 | G7alt | % |
G♭maj7♯11 | % | G♭°7 | G♭°7 Fm |
D♭maj7♯5/F | % | G♭maj7♯11 | % |
C/D♭ B♭/C | C/B B♭m7 | Am9 | E9sus |
Am9 | E9sus |`,

`title: A Felicidade
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Am
form: A A B C D
[A]
Cmaj7 | % | Cmaj7 | % |
Em7 | B7♭9 | Em7 A7 | Dm7 G7 |
[B]
Cmaj7 | % | Bm7♭5 | E7♭9 |
Am7 | % | Gm7 | C7 |
Fmaj7 | Dm7 | Am7 | D7 |
Am7 | Bm7♭5 E7♭9 | Am7 | G7 |
[C]
Cmaj7 | F7 | Cmaj7 | % |
Gm7 | C7 | Fmaj7 | % |
Dm7 | G7 | Cmaj7 | % |
F♯m7♭5 | B7♭9 | Em7 A7 | Dm7 G7 |
[D]
Am7 | Am7/G | D7/F♯ | Dm7/F |
Am7 | Bm7♭5 E7♭9 | Am7 | % |`,

`title: Aquarela Do Brasil (a.k.a. Brazil)
by: Ary Barroso
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: D
form: A A2 B C D C D2
[A]
A7♭9 |
[A2]
D6 | % | D6 | D6 |
Dm6 | % | % | Dm6 |
D6 | % | D6 | D6 |
B7♭9♯5 | B7♭9 |
[B]
Em9 | A9 | Em9 | A9 |
Em9 | A9 | Em9 | A9 |
Dmaj9 | % | Em7 | A9 |
Dmaj9 | % | Em7 | A9 |
[C]
Dmaj7 | % | Dmaj7 | Dmaj7 |
Em7 | % | A9 | % |
Em7 | % | A9 | % |
Dmaj7 | % | Em7 | A9 |
D D7 | D♭7 C7 |
[D]
B7 | F♯m7♭5 | B7♭9 | % |
B7 | F♯m7♭5 | B7♭9 | % |
B7 | F♯m7♭5 | B7♭9 | % |
Em | % | Em6 | Em |
Em7 | % | C9 | % |
F♯m7 | % | Bm7 | % |
E9 | % | Em7 | A7♭9 |
Dmaj9 | % | Em7 | A9 |
Dmaj9 | % | Em7 | A9 |
Dmaj9 | % | Em7 | A7♭9 |
[D2]
B7 | F♯m7♭5 | B7♭9 | % |
B7 | F♯m7♭5 | B7♭9 | % |
B7 | F♯m7♭5 | B7♭9 | % |
Em | % | Em6 | Em |
Em7 | % | C9 | % |
F♯m7 | % | Bm7 | % |
E9 | % | Em7 | A7♭9 |
Dmaj9 | % | Em7 | A9 |
Dmaj9 | % | Em7 | A9 |
Dmaj9 | % | Em7 | A7♭9 |
Em7 | A9 | Dmaj9 | % |
Em7 | A9 | Dmaj9 | % |
Em7 | A9 | Dmaj9 | % |
Em7 | A9 | Dmaj9 | % |`,

`title: Bim Bom
by: João Gilberto
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
[A]
Dm7 G7 | Dm7 G7 | Dm7 G7 | Dm7 G7 |
C6 | % | Dm7 G7 | Dm7 G7 |
Dm7 G7 | Dm7 G7 | Bm7 | E7♭9 |
Am | Bm7 E7♭9 | Am | Bm7 E7♭9 |
Am | Dm9 A7♭9 | Dm7 | G13♭9 |
Dm7 G7 | % | Dm7 G7 | Dm7 G7 |
% | Dm7 G7 | Dm7 G7 | Dm7 G7 |
% | Dm7 G7 | Dm7 G7 | Dm7 |
D♭9 | Cmaj9 | % |`,

`title: Caminhos Cruzados
by: Antonio Carlos Jobim
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: G♭
[A]
G♭maj7 | G♭7 | C♭69/G♭ | C♭m69/G♭ |
G♭maj7 | G♭7 | C♭69/G♭ | C♭m69/G♭ |
G♭maj7 | F7♯5 | D♭m6/E | % |
E♭7 | % | A♭7 | D♭7♭9 |
[B]
G♭maj7 | G♭7 | C♭69/G♭ | C♭m69/G♭ |
G♭maj7 | G♭7 | Fm7 | B♭7♭9 |
C♭maj7 | Cm7 F7 | B♭7 | E♭7♭13 |
A♭7 | A7 | A♭7 | D♭7 |
[B2]
G♭maj7 | G♭7 | C♭69/G♭ | C♭m69/G♭ |
G♭maj7 | G♭7 | Fm7 | B♭7♭9 |
C♭maj7 | Cm7 F7 | E7 | E♭7♭13 |
A♭7 | D♭7 | G♭maj7 | C♭7 |`,

`title: Canto De Ossanha
by: Vinicius de Moraes - Baden Powell
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Dm
form: Intro Intro A A B B2 C D
[Intro]
Dm | F6 | E7 | E♭maj7 |
[A]
Dm | F6 | E7 | E♭maj7 |
Dm | F6 | E7 | E♭maj7 |
[B]
D | % | D69 | % |
G6 | % | E9 | A7sus A13 |
[B2]
D | % | D69 | % |
G6 | A7sus A13 |
[C]
D11 | % | D11 | D11 |
Dm | F6 | E7 | E♭maj7 |
Dm | F6 | E7 | E♭maj7 |
E9 | A13 C13 |
[D]
F | % | Dm7 | % |
G9 | C13 | E7♭9/B | A7♭13 |
Dm | F6 | E7 | E♭maj7 |
Dm | F6 | E7 | E♭maj7 |
Dm |`,

`title: Carinhoso
by: Pixinguinha
genre: Latin
feel: Choro
source: iReal Pro community chart
tempo: 110
key: F
[A]
F/C F+/C♯ | F6/D F+/C♯ | F/C F+/C♯ | F6/D E7 |
Am/E Am♯5/F | Am6/F♯ Am♭6/F | Am/E Am♯5/F | Am6/F♯ A7 |
Dm7 G7 | C7 F7 | B♭ D7 | Gm7 |
G7 | B♭m6/D♭ C7 | F B♭m6/D♭ | F |
[A2]
F/C F+/C♯ | F6/D F+/C♯ | F/C F+/C♯ | F6/D E7 |
Am/E Am♯5/F | Am6/F♯ Am♭6/F | Am/E Am♯5/F | Am6/F♯ A7 |
Dm7 G7 | C7 F7 | B♭ D7 | Gm7 |
G7 | B♭m6/D♭ C7 | F B♭m6/D♭ | F E7 |
[B]
Am Am/C | Bm7♭5 E7 | Am E7 | Am A♭7 |
C/G A7 | Dm7 G7 | C C♯°7 | Dm7 F♯7 |
Bm7♭5 B♭m | A7 N.C. | E7 | E7/G♯ |
Gm7 | C7 | F | A7 |
Dm C♯°7 | Cm7 F7 | B♭ D7/F♯ | Gm7 B♭m/D♭ |
F/C Dm7 | Gm7 C7 | F N.C. | F F7/E♭ |
Dm7 B♭m/D♭ | F/C F/E♭ | Dm7 B♭m/D♭ | F |`,

`title: Chovendo Na Roseira
by: Antonio Carlos Jobim
genre: Latin
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: G♭
time: 3/4
[A]
F♯6 | F♯9sus | F♯6 | F♯9sus |
[A2]
F♯6 | F♯9sus | F♯6 | F♯9sus |
F♯6 | F♯9sus | D♯7sus | % |
D♯7sus | D♯7♭9 |
[B]
C♯m7 | % | F♯7 | Bmaj7 |
E/B | Bmaj7 | E/B | Bm7 |
Bm7 | E7 | Amaj7 | D/A |
Amaj7 | D/A |
[C]
G♯7sus | G♯7 | G♯m7 | G♯7sus |
G♯7♭9sus | G♯7 | A7/G♯ | G♯sus |
G♯6 | G6 | G♯7♭9sus | G♯7sus |
C♯7sus | % | C♯7♭9 | % |`,

`title: Doralice
by: João Gilberto
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: E♭
form: Intro A A2 A A2 B
[Intro]
Am7♭5 A♭m6 | Gm7 C7♭9 | Fm7 B♭13 | B♭m7 E♭9 |
A♭maj7 D7 | Gm7 C7♭9 | Fm7 E9 | E♭69 B♭7♯5 |
[A]
E♭maj7 E♭69 | F13 F7♭13 | B♭7sus B♭9 | E♭maj7 |
E♭maj7 F7 | B♭maj7 D♭°7 | Cm7 F13 | B♭7sus B♭7 |
[A2]
E♭maj7 E♭69 | F13 F7♭13 | B♭7sus B♭7 | E♭7sus E♭7♭9 |
A♭maj7 D♭7 | Gm7 C7♭9 | Fm7 B♭7 | E♭maj7 E♭69 |
[B]
Fm7 B♭7 | E♭maj7 E♭69 | Dm7 G7 | Cm7 |
Fm7 B♭7 | E♭maj7 G♭°7 | Fm7 B♭7 | E♭maj7 G♭°7 |
Fm7 B♭9 | E♭maj7 G♭°7 | Fm7 B♭7 | E♭7sus E♭7♭9 |
A♭maj7 D♭7 | Gm7 C7♭9 | Fm7 B♭7 | E♭69 E♭7♭9 |
Am7♭5 A♭m6 | Gm7 C7♭9 | Fm7 B♭13 | E♭maj7 |`,

`title: Ela É Carioca
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: E♭
form: Intro Intro A A2
[Intro]
F7/A | A♭m6 | E♭maj7/G | G♭°7 |
F13 F7♭13 | B♭7♭9 | E♭maj7♯5 | % |
[A]
E♭maj9 | Cm11 | F13 | % |
Fm9 | D♭m6 | F7 | B♭7♭9 |
E♭9 | % | F/A | A♭m6 |
E♭maj9 D7♯9 | D♭maj7 C7♯9 | Bmaj7 | B♭7♯9 |
[A2]
E♭maj9 | Cm11 | F13 | % |
Fm9 | D♭m6 | F7 | B♭7♭9 |
E♭9 | % | F/A | A♭m6 |
E♭maj9 D7♯9 | D♭maj7 D7 | E♭maj7♯5 | % |
F7/A | A♭m6 | E♭maj7/G | G♭°7 |
F13 F7♭13 | B♭7♭9 | E♭maj7♯5 | % |
F7/A | A♭m6 | E♭maj7/G | G♭°7 |
F13 F7♭13 | B♭7♭9 | E♭maj7♯5 | % |`,

`title: Estrada Branca (This Happy Madness)
by: Antonio Carlos Jobim - Vinicius de Moraes
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: B
[A]
Bmaj9 | C♯m7/B | Bmaj9 |
[A2]
Bmaj9 | C♯m7/B | Bmaj9 | C♯m7/B |
[A3]
Bmaj9 | C♯m7/B | Bmaj9 | C♯m7/B |
Bmaj9 | C♯m7/B | Bmaj9 | G♯m7 |
C♯13 C♯7♭13 | F♯7♯9 F♯7♭9 | Bmaj9 | F♯7sus |
[B]
Bmaj9 | C♯m7/B | Bmaj9 | E7 |
Amaj7 | % | G♯7♯9 | D7♭5 |
C♯m7 | Am7 | C♯m7 | Em7 |
D♯m7 G♯m9 | C♯m7 F♯7sus | Bmaj7 | F♯7sus Bmaj7 |
Fm7♭5 | B♭7♯9 | E♭m7♭5 | A♭7♯9 |
C♯m7♭5 | F♯7♯9 | Bmaj9 | % |
Fm7♭5 | B♭7♯9 | E♭maj7 | D13♭9 |
Fm7 | B♭7♭9 | E♭13 A♭9 | C♯13 F♯9 |
[B2]
Bmaj9 | C♯m7/B | Bmaj9 | E7 |
Amaj7 | % | G♯7♯9 | D7♭5 |
C♯m7 | Am7 | C♯m7 | Em7 |
D♯m7 G♯m9 | C♯m7 F♯7sus | Bmaj7 | F♯7sus Bmaj7 |
Fm7♭5 | B♭7♯9 | E♭m7♭5 | A♭7♯9 |
C♯m7♭5 | F♯7♯9 | Bmaj9 | % |
Fm7♭5 | B♭7♯9 | E♭maj7 | D13♭9 |
Fm7 | B♭7♭9 | E♭13 A♭9 | C♯13 F♯9 |
Bmaj9 | C♯m7/B | Bmaj9 | C♯m7/B |`,

`title: Eu Sei Que Vou Te Amar
by: Antonio Carlos Jobim - Vinicius de Moraes
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
form: A B A C
[A]
Cmaj7 | C°7 | Dm7 | G13 |
Gm7 | C7 | Fmaj7 | B♭7♯11 |
[B]
Em7 | E♭°7 | Dm7 | G7 |
E7 | A7♭9 | D7 | G7♭13 |
[C]
Em7 | E♭°7 | Em7♭5 | A7♭9 |
D7 | G7 | Cmaj7 | G♭13 |
A♭maj7 | D♭maj7 | Cmaj7 |`,

`title: Fotografia
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
[A]
Cmaj9 | % | F7sus | F13 |
Cmaj7 | % | Em7♭5 | A7♭13 |
Dm7 Dm7/C | Bm7♭5 E7♭13 | Am7 | D7♯11 |
Dm9 | G7♭9 | Cmaj9 | F13 |
[A2]
Cmaj9 | % | F7sus | F13 |
Cmaj7 | % | Em7♭5 | A7♭13 |
Dm7 Dm7/C | Bm7♭5 E7♭13 | Am7 | D7♯11 |
Dm9 | G7♭9 | Cmaj7 | F13 |
Cmaj7 | F13 | Cmaj7 | F13 |
Cmaj7 | F13 |`,

`title: Ligia
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: B
[A]
C♯m7 | F♯7♯5 | D♯m7 | D°7 |
C♯m7♭5 | F♯7sus F♯7 | A♯m7 | D♯7 |
Emaj7 | F°7 | Bmaj7 | G♯m7 |
Fm7 | B♭7 | D♯maj7 G♯7♯5 | C♯m7 |
C7sus | % |`,

`title: Little Boat (O Barquinho)
by: Roberto Menescal
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: B♭
[A]
B♭maj7 | % | Em7 A7 | % |
A♭maj7 | % | Dm7 G7 | % |
G♭maj7 | % | Cm7 F7 | % |
Dm7 | G7♭9 | Cm7 | F7♭9 |`,

`title: Luiza
by: Antonio Carlos Jobim
genre: Latin
feel: Waltz
source: iReal Pro community chart
tempo: 110
key: Cm
time: 3/4
[A]
Cm9 | F13 | Fm7 | G7♭9 |
Cm(maj7) Cm7 | F7 | Fm7 | C7♭9 |
Fm(maj7) Fm7 | B♭7sus B♭7 | E♭maj7♯5 | E♭maj7 |
Dm7♭5 | G7♭9 | Cmaj7 | Gm7♭5 C7♭9 |
[B]
Fm(maj7) | B♭7 | E♭maj7♯5 | E♭maj7 |
Am7♭5 | D7♭9 | Dm7 | G7 |
D♭7♯11 |
[A2]
Cm9 | F13 | Fm7 | G7♭9 |
Cm(maj7) Cm7 | F7 | Fm7 | C7♭9 |
Fm(maj7) Fm7 | B♭7sus B♭7 | B♭m7 | E♭7sus E♭7♭9 |
A♭maj7 | Fm7 Fm7/E♭ | D7♭9 | G7♭9♭13 |
A♭maj7 | D♭maj7 | Dm11 | G7♭9♭13 |`,

`title: Manhã De Carnaval (Black Orpheus)
by: Luiz Bonfa
genre: Latin
feel: Bossa Nova
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

`title: Modinha
by: Antonio Carlos Jobim
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Cm
[A]
Cm7 | % | D♭maj7 | % |
Dm7♭5 G7♭9 | Fm9 E7♯9 | E♭maj7 | Dm7♭5 D♭7 |
[A2]
Cm7 | % | D♭maj7 | % |
Dm7♭5 G7♭9 | Fm9 E7♯9 | E♭maj7 | E°7 |
[B]
A♭maj7 | Am7♭5 | E♭/B♭ G+/B | Cm7 G+/B E♭/B♭ Am7♭5 |
A♭m7 Fm7 | Cm7 | A♭m7 Fm7 | Cm7 |`,

`title: O Grande Amor
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Am
[A]
Am | A♭°7 | Gm7 | C7 |
Bm7♭5 | E7♭9 | Am | A7♭9 |
[B]
Dm7 | G7 | Cmaj7 | Fmaj7 |
B♭maj7 | % | Bm7♭5 | E7♭9 |
[A2]
Am | A♭°7 | Gm7 | C7 |
Bm7♭5 | E7♭9 | Em7♭5 | A7♭9 |
[C]
Dm7 | E♭°7 | C/E | Fmaj7 |
B♭maj7 | Bm7♭5 E7♭9 | Am | E7♭9 |`,

`title: O Pato
by: Jayme Silva - Neuza Texeira
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: D
form: A A B
[A]
D69 | % | E9 | % |
Em9 | A13 A7♯5 | D69 | % |
[B]
Am7 | D7♭9 | Gmaj7 | G6 |
E9 | A13 | Dmaj7 | Am7 D7♭9 |
Gmaj7 Gm6 | F♯m7 D7 | Gmaj7 Gm6 | F♯m7 D7 |
Gmaj7 Gm6 | F♯m7 F7 | E7 | A13 |
D69 | % | E9 | % |
Em9 | A13 |`,

`title: O Que Será
by: Chico Buarque
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: Dm
[A]
Dm Dm(maj7) | Dm7 Dm6 | Am Am(maj7) | Am7 B7/D♯ |
Gm Gm(maj7) | Gm7 Gm6 | B♭m B♭m(maj7) | Em7♭5 A7♭9 |
[A2]
Dm Dm(maj7) | Dm7 Dm6 | Am Am(maj7) | Am7 B7/D♯ |
Gm Gm(maj7) | Gm7 Gm6 | B♭m B♭m(maj7) | Em7♭5 A7♭9 |
Dm Dm(maj7) | Dm7 Dm6 | B♭m B♭m(maj7) | B♭m7 B♭m6 |
F/A C♯/G♯ | Gm7 A7 | Dm7 | G13 |
[A3]
Dm Dm(maj7) | Dm7 Dm6 | Am Am(maj7) | Am7 B7/D♯ |
Gm Gm(maj7) | Gm7 Gm6 | B♭m B♭m(maj7) | Em7♭5 A7♭9 |
Dm Dm(maj7) | Dm7 Dm6 | B♭m B♭m(maj7) | B♭m7 B♭m6 |
F/A C♯/G♯ | Gm7 A7 | Dm7 | D7♭5 |
[B]
Gm Gm(maj7) | Gm7 Gm6 | Dm Dm(maj7) | Dm7 E7/G♯ |
Cm Cm(maj7) | Cm7 Cm6 | E♭m E♭m(maj7) | Am7♭5 D7♭9 |
[B2]
Gm Gm(maj7) | Gm7 Gm6 | Dm Dm(maj7) | Dm7 E7/G♯ |
Cm Cm(maj7) | Cm7 Cm6 | E♭m E♭m(maj7) | Am7♭5 D7♭9 |
Gm Gm(maj7) | Gm7 Gm6 | E♭m E♭m(maj7) | E♭m7 E♭m6 |
B♭/D G♭/D♭ | Cm7 D7 | Gm7 | E7♯9♯11 |
[C]
Am Am(maj7) | Am7 Am6 | Em Em(maj7) | Em7 F♯7/A♯ |
Dm Dm(maj7) | Dm7 Dm6 | Fm Fm(maj7) | Bm7♭5 E7♭9 |
Am Am(maj7) | Am7 Am6 | Em Em(maj7) | Em7 Em6/C♯ |`,

`title: Outra Vez
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
[Intro]
Cmaj9 | D♭7♯9 | Cmaj9 | D♭7♯9 |
[A]
Cmaj9 | E♭°7 | Dm7 | G7 |
Em7 | E♭°7 | Dm7 | Gm7 C7 |
Fmaj9 | B♭9 | Em7 | E♭m7 |
Dm7 | A♭m9 D♭9 | Cmaj9 | D♭7♯9 |
[A2]
Cmaj9 | E♭°7 | Dm7 | G7 |
Em7 | E♭°7 | Dm7 | Gm7 C7 |
Fmaj9 | B♭9 | Em7 | E♭m7 |
Dm7 | A♭m9 D♭9 | Cmaj9 | F♯m7♭5 B7 |
[B]
Em7 | Em/D | C♯m7♭5 | Cm6 |
Gmaj9/B | B♭°7 | Am9 | D9 D♭9 |
Gmaj9 | Em7 A7 | Dm7 | G7♭9 |
Cmaj9 | B♭maj9 | A♭maj9 | % |
B♭maj9 | % | Dm9 | G♭9♯5 |
[C]
Cmaj9 | E♭°7 | Dm7 | G7 |
Em7 | E♭°7 | Dm7 | Gm7 C7 |
Fmaj9 | B♭9 | Em7 | E♭m7 |
Dm7 | A♭m9 D♭9 | Cmaj9 | D♭9♯11 |
Cmaj9 | A♭m9 D♭9♯11 | Cmaj7 | D♭7♯9 |
Cmaj9 | A♭m9 D♭9♯11 | Cmaj7 | D♭7♯9 |`,

`title: Pais Tropical
by: Sergio Mendes
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
form: Intro A A A2 B B2 A A3
[Intro]
C Em7 | F G7 | C Em7 | F G7 |
[A]
C Em7 | F G7 | C Em7 | F G7 |
Am7 Am7/G | F G7 | C Em7 | F G7 |
[A2]
C Em7 | F G7 | C Em7 | F G7 |
Am7 Am7/G | F G7 | Cm7 | % |
[B]
F9 | % | C7 | % |
[B2]
F9 | % | C7 | % |
F9 | % | G7sus | % |
[A3]
C Em7 | F G7 | C Em7 | F G7 |
Am7 Am7/G | F G7 | C Em7 | F G7 |
C Em7 | F G7 |`,

`title: Passarim
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Gm
[A]
D7sus | % | G7sus | Gm(maj7) |
Gm7 G♭7 | Fmaj7 E7 | E♭maj7 | % |
Am7♭5 | D7♭9 | Gm7 | Cm7 |
Gm7 | Cm7 | Gm7 | Cm7 |
Gm7 | Cm7 | Gm7 |
[B]
Gm7 C7 | Fmaj7 | Fm7 B♭13 | E♭maj7 |
D13♭9 | Gm7 | Em7/A A13 | Dmaj9 |
Em7 A7 | Dmaj7♯5 | Gm7 C7 | Fmaj7 |
B♭ Gm |
[C]
Dm7 E/D | E♭/D D | E♭maj7 | Em7♭5 |
A7♭13 | Dmaj7 | % | Dm7 E/D |
E♭/D D | Dm7 G7 | Cmaj7 | Cm7 F13 |
B♭maj7 | A7♭13 | Dm7 | Bm7 E13 |
Amaj9 | Bm7 E7 | Amaj7 | Dm7 G7 |
Cmaj7 | Fmaj7 | Dm7 | Am7 |
% | D7sus | % | G7 A7 |
B7 C♯7 | F♯ |`,

`title: Samba De Orfeu
by: Luiz Bonfa
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
[A]
Cmaj7 | % | % | % |
Cmaj7 F7♯11 | Em7 A7 | Dm7 | G7 |
Dm7 | G7 | Dm7 | G7 |
Dm7 | G7 | B♭7♯11 A7 | Dm7 G7 |
[A2]
Cmaj7 | % | % | % |
Cmaj7 F7♯11 | Em7 A7 | Dm7 | G7 |
Dm7 | G7 | Dm7 | G7 |
Dm7 | G7 | Cmaj7 | % |
[B]
Gm7 | C7 | Fmaj7 | % |
Fm7 | B♭7 | E♭maj7 | Dm7 G7 |`,

`title: Samba Do Avião
by: Antonio Carlos Jobim
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: D
form: A B A C
[A]
Dmaj7/F♯ | F°7 | Em9 | F°7 |
F♯m7 | F♯7♭13 | Gmaj7 | Gm7 |
[B]
Dmaj7/F♯ | F°7 | F♯m7♭5 | B7♭9 |
E13 | % | E♭7♯11 | % |
[C]
Gmaj7 | Gm6 | Dmaj7/F♯ | F°7 |
Gmaj7 | Gm6 | F♯m7 B7♭9♭13 | Em7 A13♭9 |
F♯m7 | B7♭9 | Em7 | % |
Em7 | % | E13 | % |
E♭7♯11 | % |`,

`title: So Nice (Summer Samba)
by: Marco Valles
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: F
form: A B A C
[A]
Fmaj7 | % | Bm7 | E7♭13 |
B♭maj7 | % | E♭7 | % |
[B]
Am7 | D7♭9 | Gm7 | Em7♭5 A7♭13 |
Dm7 | G7 | Gm7 | D♭7 C7 |
[C]
Am7 | D7♭9 | Gm7 | C7♭9 |
Fmaj7 | B♭7 | F6 | Gm7 C7 |`,

`title: Só Danço Samba
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
form: A A2 B A
[A]
C6 | F7 | D7 | % |
Dm7 | G7 | C6 | F7 |
[A2]
C6 | F7 | D7 | % |
Dm7 | G7 | C6 | % |
[B]
Gm7 | C7 | Fmaj7 | % |
Am7 | D7 | G7 | % |`,

`title: Tico-Tico No Fubá
by: Zequinha de Abreu
genre: Latin
feel: Choro
source: iReal Pro community chart
tempo: 110
key: Am
[A]
Am | E7 | % | Am |
Dm | Am | B7 | E7 |
[A2]
Am | E7 | % | Am |
Dm | Am | E7 | Am G7 |
[B]
C | G7 | % | C |
C | G7 | % | C |
C | G7 | % | C C7 |
F F♯°7 | C/G A7 | D7 G7 | C |
[C]
A | % | % | E7 |
E7 | % | % | A |
A | % | F♯7 | Bm |
D D♯°7 | A/E F♯7 | B7 E7 | A |`,

`title: Tristeza
by: Haroldo Lobo - Niltinho
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: D
[A]
Gmaj7 | G6 | Gm6 | % |
F♯13♭9 | F♯7♯5 | B9sus | B7♭9♯5 |
E13 | E7♯5 | A9sus | A7 |
Dmaj7 | D7 |
[A2]
Gmaj7 | G6 | Gm6 | % |
F♯13♭9 | F♯7♯5 | B9sus | B7♭9♯5 |
E13 | E7♯5 | A9sus | A7 |
Dmaj7 | A13 |
[B]
D | % | D+ | Bm/D |
Em | C/E | Em6 | Em7 |
F♯m7 | % | Em7 | A7 |
Dmaj7 | % | D7 | % |
[C]
Gmaj7 | G6 | Gm6 | % |
F♯13♭9 | F♯7♯5 | B9sus | B7♭9♯5 |
E13 | E7♯5 | A9sus | A7 |
Dmaj7 | D7 |`,

`title: Zingaro (Retrato Em Branco E Preto)
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Gm
[A]
Gm7 | % | D7♭9/F♯ | % |
Fm6 | Emaj7 | E♭maj7 | % |
Cm7 | D7♭9 | B♭maj7 | % |
A13♭9 | % | Dmaj7 | A♭7♯11 |
[B]
Gm7 | % | D7♭9/F♯ | % |
Fm6 | Emaj7 | E♭maj7 | % |
Cm7 | C♯°7 | Gm/D | E♭maj7 |
Cm7 | E♭m7 D7 | Gm7 | E♭m7 |`,

`title: Vivo Sonhando (Dreamer)
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: G
[A]
Gmaj7 | % | E♭maj7 | % |
Gmaj7 | Gmaj7 Gmaj7/C | Bm7 | E7♭9 |
Am7 | Cm7 Cm6 | Bm7 | E7♭9 |
Am7 | D7♭9 | Bm7 | Cm7 Cm7/D |
[A2]
Gmaj7 | % | E♭maj7 | % |
Gmaj7 | Gmaj7 Gmaj7/C | Bm7 | E7♭9 |
Am7 | Cm7 Cm6 | Bm7 | E7♭9 |
A13 A7♭13 | Am7 D7 | Gmaj7 | E♭maj7/G |`,

`title: Você Vai Ver
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: F
time: 2/2
[Intro]
Bm7♭5 | E♭7/B♭ | Am7 | A♭7 |
D♭maj7 | G♭maj7 | Fmaj7 | G♭7♯11 |
[A]
Fmaj7 | % | Bm7♭5 | E7 |
E♭maj7 | E♭6 | Am7♭5 | D7 |
Gm7 | C9 | F6 | % |
Bm7♭5 | E7 | Amaj7 A♭maj7 | Gm7 G♭7♯11 |
[A2]
Fmaj7 | % | Bm7♭5 | E7 |
E♭maj7 | E♭6 | Am7♭5 | D7 |
Gm7 | C9 | Am7 | D7 |
G13 | Gm7 C9 | A13 A7♭13 | Am7 D7♭9 |
G13 | C9 C7♭9 | Bm7♭5 | E♭7/B♭ |
Am7 | A♭7 | D♭maj7 | G♭maj7 |
Fmaj7 | % |`,

`title: Travessia
by: Milton Nascimento
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: A
form: Intro Intro A B C C2
[Intro]
A A/E | Bm7/E | A A/E | Bm7/E |
[A]
Amaj7 | D♯m7♭5 D6 | Amaj7 Bm7/E | Amaj7 Bm7/E |
Amaj7 G♯m7 | F♯m7 Bm7 | Em7 A7 | Dmaj7 Dmaj7/A |
Dmaj7 G7 | G♯m7 C♯7 | F♯m7 F♯m7/E | D♯m7♭5 Dmaj7 |
Amaj7 Bm7/A | Amaj7 F♯m7 | Bm7 E7 |
[B]
A A/E | Bm7/E | A A/E | Bm7/E |
[C]
Amaj7 | Em7/A A7 | F♯m7 | C♯m7 |
Dmaj7 | E7/D | F♯m7 Bm7 | E7 |
[C2]
Amaj7 | Em7/A A7 | F♯m7 | C♯m7 |
Dmaj7 | E7/D | Bm7 E7 | A A/E |
Bm7/E | A | Amaj7♯11 | A |
Amaj7♯11 |`,

`title: Maria Maria
by: Milton Nascimento
genre: Latin
feel: MPB
source: iReal Pro community chart
tempo: 110
key: A♭
form: A A2 A2 B B2
[A]
A♭ | E♭/A♭ B/A♭ | D♭/A♭ A/A♭ | A♭ E♭/G |
Fm7 Fm7/E♭ | D♭maj7 | G♭6 D♭/F | Emaj7 A♭ |
[A2]
A♭ | E♭/A♭ B/A♭ | D♭/A♭ A/A♭ | A♭ E♭/G |
Fm7 Fm7/E♭ | D♭maj7 | G♭6 D♭/F | Emaj7 A♭ |
A♭ | E♭/A♭ B/A♭ | D♭/A♭ A/A♭ | A♭ |
[B]
A♭m7 | % | A♭7sus | A/A♭ |
E/A♭ | A♭m7 | % |
[B2]
A♭m7 | % | A♭7sus | A/A♭ |
E/A♭ | B♭m7 | % | B♭m7 |
B♭m7 | B♭7sus | B/B♭ | F♯/B♭ |
B♭m7 | % | A♭ | E♭/A♭ B/A♭ |
D♭/A♭ A/A♭ | A♭ E♭/G | Fm7 Fm7/E♭ | D♭maj7 |
G♭6 D♭/F | Emaj7 A♭ | A♭ | E♭/A♭ B/A♭ |
D♭/A♭ A/A♭ | A♭ E♭/G | Fm7 Fm7/E♭ | D♭maj7 |
G♭6 D♭/F | Emaj7 A♭ |`,

`title: Sampa
by: Caetano Veloso
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
[A]
Cmaj7 | Bm7 E7 | Am7 A♭m7 | Gm7 G♭7 |
Fmaj7 | A7 | Dm7 | % |
G7 | G♯°7 | Am7 | % |
D9 | % | % | % |
Dm7 | G7 | Gm7 | C7 |
Fmaj7 | F♯°7 | C7 A7 | Dm7 G7 |
E7 | A7 | D7 | A♭m7 G7 |
C6 | G7 |`,

`title: O Leãozinho
by: Caetano Veloso
genre: Latin
feel: Xote
source: iReal Pro community chart
tempo: 110
key: C
[A]
C6 | G7 | Am | Em7 |
Fmaj7 | B♭maj7 | C6 | % |
C6 | G7 | Am | Em7 |
Fmaj7 | B♭maj7 | C6 | % |
[B]
Am | Am(maj7)/G♯ | Am7/G | Am6/F♯ |
Fmaj7 | Em7 | Dm7 | G7 |
Am | Am(maj7)/G♯ | Am7/G | Am6/F♯ |
Fmaj7 | Em7 | Dm7 | G7 |`,

`title: Odara
by: Caetano Veloso
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: Em
form: Intro Intro2 Intro2 A A2 A3
[Intro]
Em7 | % | Em7 |
[Intro2]
Em7 | % | Em7 | Em7 |
[A]
Am7 | D7 | Em7 | % |
Am7 | D7 | Em7 | % |
Am7 | D7 | C♯m7 | Cmaj7 |
Bm7 | E7♭9 | Am7 | D7 N.C. |
Em7 | % | Em7 |
[A2]
Am7 | D7 | Em7 | % |
Am7 | D7 | Em7 | % |
Am7 | D7 | C♯m7 | Cmaj7 |
Bm7 | E7♭9 | Am7 | D7 N.C. |
Em7 | % | Em7 | Em7 |
[A3]
Am7 | D7 | Em7 | % |
Am7 | D7 | Em7 | % |
Am7 | D7 | C♯m7 | Cmaj7 |
Bm7 | E7♭9 | Am7 | D7 N.C. |
Em7 | % | Em7 | Em7 |
Em7 | % | Em7 | % |
Am7 | D7 N.C. | Em7 | % |`,

`title: Começar De Novo (The Island)
by: Ivan Lins
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: Em
[A]
Em9 | % | A9 | A13 |
D9 | D7♭9 | Gmaj7 | Cmaj7 |
F♯m7♭5 | B7♭9♭13 | Fm7 | A♯7 |
D♯maj7 | Dm7 G7 | Cm7 | F9 |
A♯m7 | D♯7 | G♯ C7 | Fm C♯m |
Dm7 | G7♭9♭13 | Cmaj7 | F♯m7♭5 B7 |
[A2]
Em9 | % | A9 | A13 |
D9 | D7♭9 | Gmaj7 | Cmaj7 |
F♯m7♭5 | B7♭9♭13 | Fm7 | A♯7 |
D♯maj7 | Dm7 G7 | Cm7 | F9 |
A♯m7 | D♯7 | G♯ C7 | Fm C♯m |
Dm7 | G7♭9♭13 | C♯maj7 | Gm7 C7 |
[B]
Fm9 | % | A♯9 | A♯13 |
D♯9 | D♯7♭9 | G♯maj7 | C♯maj7 |
Gm7♭5 | C7♭9♭13 | F♯m7 | B7 |
Emaj7 | D♯m7 G♯7 | C♯m7 | F♯9 |
Bm7 | E7 | Amaj7 C♯7 | F♯m7 Dm7 |
D♯m7 | G♯7♭9♭13 | Dmaj7 | G♯m7 C♯7 |
[C]
G♭m9 | % | B9 | B13 |
E9 | E7♭9 | Amaj7 | Dmaj7 |
A♭m7♭5 D♭7♭9♭13 | G♭m9 | % | G♭m9 |
G♭m9 | % | G♭m9 | G♭m9 |
G♭m9 | % | G♭m9 | G♭m9 |`,

`title: Love Dance
by: Ivan Lins
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: D
form: Intro A A2 B A2 B2
[Intro]
E6/D Gm7/D | E6/D C11 | E6/D Gm7/D | E6/D C11 |
[A]
D Em F♯m G | C13sus C13 | F♯m7 Bm7 | E13sus E13 |
A13sus A/G | F♯13 F♯7♯5 | B9sus B7♯9♯5 | E13sus E13 |
A13sus A7♭9sus | E6/D Gm7/D | E6/D C13sus |
[A2]
D Em F♯m G | C13sus C13 | F♯m7 Bm7 | E13sus E13 |
A13sus A/G | F♯13 F♯7♯5 | B9sus B7♯9♯5 | E13sus E13 |
A13sus A7♭9sus | E6/D C11 G♯+ |
[B]
C♯m7♭5 F♯7♯5 | Bm11 Bm7/A | G♯m7♭5 C♯7alt | F♯maj7 |
Fm7♭5 B♭7♯5 | E♭m11 E♭m7/C♯ | E13sus E13 | A13sus A7♭9sus |
[B2]
C♯m7♭5 F♯7♯5 | Bm11 Bm7/A | G♯m7♭5 C♯7alt | F♯maj7 |
Fm7♭5 B♭7♯5 | E♭m11 E♭m7/C♯ | E13sus E13 | A13sus A7♭9sus |
E6/D Gm7/D | E6/D C13sus | E6/D Gm7/D | E6/D C11 G♯+ |
E6/D C13sus | B9sus B7♭9♯5 | E13sus E13 | A13sus A13♭9 |
C♯7♯9♯5 | E6/D | C♯7♯9♯5 | E6/D |
C♯7♯9♯5 | E6/D |`,

`title: Razão De Viver (A Little Tear)
by: Deodato-Valle
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: D♭
[A]
E♭9 | E♭m7 | D♭maj7 | % |
E♭m7 | % | D♭maj7 | B♭7♭9♭5 |
E♭9 | E♭m7 | D♭maj7 | % |
E♭m7 | % | D♭maj7 | % |
[B]
Fm9 | % | E♭maj7 | % |
Fm9 | % | B7sus | Fmaj7 |
E♭9sus E♭9 | A♭9sus A♭9 | Fm7♭5 | B♭7♭9sus B♭7♭9♯5 |
E♭m7 | A♭9sus A♭9 | D♭maj7 | A♭9sus |`,

`title: Recado Bossa Nova
by: Djalma Ferreira
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: Gm
[A]
Gm | % | D7♭9 | % |
Dm7♭5 | G7♭9 | Cm | % |
Am7♭5 | D7♭9 | Gm | % |
A7♭9 | % | D7♭9 | % |
[A2]
Gm | % | D7♭9 | % |
Dm7♭5 | G7♭9 | Cm | % |
Am7♭5 | D7♭9 | Gm | % |
A♭7♯11 | D7♭9 | Gm | % |
[B]
G7♭9 | % | Cm | % |
A7♭9 | % | Dm | D7♭9 |`,

`title: Samba De Orly
by: Buarque-Moraes-Toquinho
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: C
[Intro]
Dm9 | G13 | Dm9 | G13 |
[A]
Cmaj7 | % | F♯m7♭5 | B7 |
Em7 | A7 | Gm7 | C9 |
Fmaj7 | Fm6 | Am7 | Am/G |
D7 | % | Dm9 | G13♭9 |
[B]
Cmaj7 | % | F♯m7♭5 | B7 |
Em7 | A7 | Gm7 | C9 |
F♯m7♭5 | Fm6 | Em7 | A7♭13 |
D9 | G13 | Gm7 | C9 |
F♯m7♭5 | Fm6 | Em7 | A7♭13 |
D9 | G13 | Cmaj7 | % |`,

`title: Brigas Nunca Mais
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: B
[A]
B6 | A♯7 | A7 | G♯7♭13 |
C♯m7 | A6 | C♯m7 | F♯7 |
D♯m7 | D°7 | C♯m7 | G♭7 |
G♯m7 | C♯7 | C♯m7 | F♯7♯5 |
[A2]
B6 | A♯7 | A7 | G♯7♭13 |
C♯m7 | A6 | C♯m7 | F♯7 |
Bmaj7 | B7♯5 | Emaj7 | Em6 |
D♯m7 Bmaj7 | C♯m7 F♯7 | D♯m7 Bmaj7 | C♯m7 |
D♯m7 Bmaj7 | C♯m7 F♯7 | B6 | G9 |
Bmaj7 | B7♯5 | Emaj7 | Em6 |
D♯m7 Bmaj7 | C♯m7 F♯7 | D♯m7 Bmaj7 | C♯m7 |
D♯m7 Bmaj7 | C♯m7 F♯7 | A7 | % |
Cmaj7 | % | B6 |`,

`title: Este Seu Olhar
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: E
[Intro]
Emaj7 | G°7 | F♯m7 | F°7 |
F♯m7 | B69 | Emaj7 | B7 |
[A]
Emaj7 | F°7 | F♯m7 | G°7 |
G♯m7 | G♯7♯5 | Amaj7 | Am6 |
Emaj7/G♯ | G°7 | F♯m7 | B/A |
G♯m7 | C♯7♭9 | F♯m7 | B7♭9 |
[A2]
Emaj7 | F°7 | F♯m7 | G°7 |
G♯m7 | G♯7♯5 | Amaj7 | Am6 |
G♯m7 | G°7 | F♯m7 | F°7 |
F♯13 F♯7 | F♯m7 B7♭9 | Emaj7 | B7♯5 |
Emaj7 |`,

`title: Samba Em Preludio
by: Baden Powell - Vinicius de Moraes
genre: Latin
feel: Bossa
source: iReal Pro community chart
tempo: 130
key: Bm
[A]
Bm | % | C♯m7♭5 | F♯7♭9 |
C°7 | B7♭13 | Em | Em/D |
C♯m7♭5 | F♯7♭9 | Bm7 | Bm7/A |
G♯°7 | % | Em6/G | F♯7♭13 |
Bm | % | C♯m7♭5 | F♯7♭9 |
C°7 | B7♭13 | Em | Em/D |
C♯m7♭5 | F♯7♭9 | Bm7 | Bm7/A |
Dm7 G7 | C♯m7♭5 F♯7♭9 | Bm | C♯m7♭5 F♯7♭9 |`,

`title: Se Todos Fossem Iguais A Você
by: Antonio Carlos Jobim
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: A
[A]
E9 | % | F♯/E | % |
E9 | E9♯5 | Amaj13 | % |
G♯13 G♯7♯5 | C♯7 | F♯m7 | Am7 D9 |
Gmaj9 | G♯m7♭5 C♯7♭9 | F♯maj7 | Bm7 E7 |
[B]
Amaj7 | G♯m7♭5 C♯7♭9 | F♯m7 | Em7 A9 |
Dmaj7 | C♯m7♭5 F♯7♭13 | Bm7 | E7 |
E13 | % | Amaj7 | % |
D♯m7♭5 | G♯7 | C♯m7 Am6 | Em9 E7♭9 |
[C]
Amaj7 | G♯m7♭5 C♯7 | F♯m7 | Em7 A7 |
Dmaj7 | C♯m7♭5 F♯7♭13 | Dmaj7 | % |
D♯m7♭5 | Dm6 | A/C♯ | Cm6 |
B7 | Bm7 E7 | Amaj7 | % |`,

`title: Tema Jazz
by: Antonio Carlos Jobim
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: Dm
form: A B C A2 C C2
[A]
Dm Dm(maj7) | Dm7 Dm6 | Dm♭6 Dm | Dm7♭5 Gm7/D |
Dm Dm(maj7) | Dm7 Dm6 | Dm♭6 Dm | Dm7♭5 E7♭13 |
Am Am(maj7) | Am7 Am6 | Am♭6 Am | Am7♭5 Dm7/A |
Gm Gm(maj7) | Gm7 Gm6 | Gm♭6 Gm | Gm7♭5 A13♭9 |
[B]
E♭m6 | % | D♭maj7♯5 | Cm6 B7♯11 |
B♭7 B♭7/A♭ | Gm7 Gm7/F | Em7♭5 | E♭7♯11 |
[C]
Dm Dm(maj7) | Dm7 Dm6 | Dm♭6 | N.C. |
D7sus | % | G9 | % |
D9 | % | E♭9 | % |
B♭9 | % |
[A2]
Dm Dm(maj7) | Dm7 Dm6 | Dm♭6 Dm | Dm7♭5 Gm7/D |
Dm Dm(maj7) | Dm7 Dm6 | Dm♭6 Dm | Dm7♭5 E7♭13 |
Am Am(maj7) | Am7 Am6 | Gm Gm(maj7) | Gm7 Gm6 |
[C2]
Dm Dm(maj7) | Dm7 Dm6 | Dm♭6 | N.C. |
D7sus | % | G9 | % |
D9 | % | E♭9 | % |
B♭9 | % | G9 | % |
D9 | % | E♭9 | % |
B♭9 | % | G9 | % |
D9 | % | E♭9 | % |
B♭9 | % |`,

`title: The Dolphin
by: Luiz Eca
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: E
[Intro]
F♯maj7 | G7♯11 |
[Intro2]
F♯maj7 | G7♯11 | F♯maj7 | E7 |
[A]
Amaj7 | B7/A | A♭7alt | D♭7alt |
Cmaj7 | % | F♯m7♭5 | B7♭9 |
[B]
Em7 | A7sus | Dmaj7 | F7♭13 |
B♭m9 B♭m | B♭m(maj7) B♭m7 | B♭m6 | A7♭9♯9 |
[C]
Dmaj7 | Em7 A7 | C♯m7♭5 | F♯7♭13 |
Bm7♭5 | E7♭9 | Dm7 | G7 |
Bm7 | E7♭9sus | C♯m7♭5 | F♯7alt |
B7alt |
[A2]
E7alt | Amaj7 | B7/A | G♯7alt |
C♯7alt | F♯7 | B7 | Emaj7 |
C7/E | Emaj7 | C7/E | Bmaj7 |
Emaj7 |`,

`title: Flor De Lis
by: Djavan
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
form: Intro Intro A A2 B B2
[Intro]
Cmaj9 | % | Fm7 | % |
[A]
Cmaj9 | % | Bm9 | E7♯5 |
Am9 | D9 | Gm9 | C9 |
F♯m7 | B7♭9 | B♭maj7 | A7♭9♯5 |
F♯m7 | B7♭9 | Em9 | A7♭9♯5 |
D9 | G9 |
[A2]
Cmaj9 | % | Bm9 | E7♯5 |
Am9 | D9 | Gm9 | C9 |
F♯m7 | B7♭9 | B♭maj7 | A7♭9♯5 |
F♯m7 | B7♭9 | Em9 | A7♭9♯5 |
D9 | Fm7 | Cmaj9 | E7♭9 |
Am7 | A♭°7 | Gm7 | C9 |
[B]
Fmaj9 | B♭9 | Em9 | A9 |
D9 | G9sus | C9sus | C9 |
[B2]
Fmaj9 | B♭9 | Em9 | A9 |
D9 | G9sus | Cmaj9 | G7♭9♯5 |
Cmaj9 | % | Fm7 | % |
Cmaj9 | % | Fm7 | % |`,

`title: Oceano
by: Djavan
genre: Latin
feel: Slow Bossa
source: iReal Pro community chart
tempo: 96
key: D
time: 3/4
form: A A B B2
[A]
D | Gmaj7 | A7 | A♯°7 |
Bm7 | Bm(maj7) | Bm7 | Bm6 |
Am7 | D7 | Gm7 | C7 |
F♯m7 | B7♭9 | E9 | A9 |
[B]
Dm | C7 | Fmaj7 | Em7♭5 A7♭13 |
Dm | C7 | Fmaj7 | Gm7 |
Am7 | B♭maj7 | Em9 | A7♯5 |
[B2]
Dm | C7 | Fmaj7 | Em7♭5 A7♭13 |
Dm | C7 | Fmaj7 | Gm7 |
Am7 | B♭maj7 | Em9 | A7♯5 |
D | Fmaj7 | Gmaj7 | C7 |
D | Fmaj7 | Gmaj7 | C7 |`,

`title: Nada Sera Como Antes
by: Milton Nascimento
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: C
time: 3/4
form: Intro A B A B2
[Intro]
Dm7 | % |
[A]
Dm7 | % | % | Cm7 |
F7 | B♭maj7 | E♭maj7 | % |
[B]
Gm7 | % | Dm7 | % |
Dm7 | % | G/D | % |
G/D | G°7/D G♭°7/D | F°7/D E♭°7/D | E♭°7/D |
[B2]
Gm7 | % | Dm7 | % |
Dm7 | % | G/D | % |
G/D | G°7/D G♭°7/D | F°7/D E♭°7/D | E♭°7/D |
Dm7 | % | Cmaj7 | % |
Cm7 | % | Gmaj7 | % |
Gm7 | Fm7 | Fm7 Gm7 | Fm7 |
Fm7 Gm7 | Fm7 | Fm7 Gm7 | Fm7 |
Fm7 Gm7 | Gm7 | % |`,

`title: Ponta De Areia
by: Milton Nascimento
genre: Latin
feel: Ballad
source: iReal Pro community chart
tempo: 66
key: F
time: 5/4
[A]
Fmaj7 | F F/A B♭maj7 B♭maj7/A | Fmaj7 Gm | Gm Csus F |
[A2]
Fmaj7 | F F/A B♭maj7 B♭maj7/A | Fmaj7 Gm | Gm Csus F |
Fmaj7 | F F/A B♭maj7 B♭maj7/A | Fmaj7 Gm | Gm Csus F |
Fmaj7 | F F/A B♭maj7 B♭maj7/A | Fmaj7 Gm | Gm Csus F |`,

`title: As Rosas Nao Falam
by: Cartola
genre: Latin
feel: Bossa Nova
source: iReal Pro community chart
tempo: 130
key: C
[A]
Cm7 | Cm7/B♭ | D7 | D7♯5 |
G7♭9 | G7alt | Cm9 | G7♯5 |
Cm7 | Cm7/B♭ | D7♯5 | % |
G7♭9 | % | Cm7 | C7 |
[B]
Fm7 | Fm7/E♭ | Cm7 | Cm7/B♭ |
D7♭9 | % | G7♭9 | G7♭9♯5 |
[A2]
Cm7 | Cm7/B♭ | D7 | D7♯5 |
G7♭9 | G7alt | Cm9 | G7♯5 |
Cm7 | G7♭9 | Cmaj7 |`,

`title: Sei Lá (A Vida Tem Sempre Razão)
by: Vinicius de Moraes
genre: Latin
feel: Samba
source: iReal Pro community chart
tempo: 176
key: C
[A]
Am7 | D7 | Dm7 G7 | Cmaj7 |
Am7 D7 | Bm7 Em7 | Am7 Dm7 | G7 |
Cmaj7 Am7 | D7 | Dm7 G7 | Gm7 C7 |
[B]
F♯m7♭5 Fm6 | Em7 A7 | D7 G13 | C7 |
F♯m7♭5 Fm6 | Em7 A7 | D7 G13 | Cmaj7 |
F♯m7♭5 Fm6 | Em7 A7 | D7 G13 | C7 |
F♯m7♭5 Fm6 | Em7 A7 | D7 G13 | C69 |
G7sus | % |`,

`title: Oye Como Va
by: Tito Puente
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 110
key: Am
form: Intro Intro2 Intro3 A A2 A3 B B2 B3 A A2 A4 C C2
[Intro]
Am7 | D9 | Am7 |
[Intro2]
Am7 | D9 | Am7 | D9 |
[Intro3]
Am7 | D9 | Am7 | D9 |
Am7 | D9 | Am7 | Am7 |
D9 | Am7 | D9 | Am7 |
D9 | Am7 | D9 | Am |
Am D Am/E | Am | Am Am/E |
[A]
Am7 | D9 | Am7 |
[A2]
Am7 | D9 | Am7 | D9 |
[A3]
Am7 | D9 | Am7 | D9 |
Am | Am D Am/E |
[B]
Am7 | D9 | Am7 |
[B2]
Am7 | D9 | Am7 | D9 |
[B3]
Am7 | D9 | Am7 | D9 |
Am7 | D9 | Am7 | Am7 |
D9 | Am7 | D9 | Am7 |
D9 | Am7 | D9 | Am7 |
D9 | Am7 | Am7 | D9 |
Am7 | D9 | Am7 | D9 |
Am7 | D9 | Am | Am D Am/E |
[A4]
Am7 | D9 | Am7 | D9 |
E7 | % | E7 | % |
[C]
Am | D9 | Am7 | D9 |
[C2]
Am | D9 | Am7 | D9 |
Am | Am D Am/E | Am | Am Am/E |
Am |`,

`title: Perfidia
by: Alberto Dominguez
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: F
[Intro]
Fm F7 | B♭m | C7♭9 | Fm |
Fm F7 | B♭m | G7 | C7♭9 |
F Dm | Gm C7 | F Dm | Gm C7 |
[A]
F Dm | Gm C7 | F Dm | Gm C7 |
F Dm | Gm B♭ | A7 | A7 C7 |
[A2]
F Dm | Gm C7 | F Dm | Gm C7 |
F Dm | Gm B♭ | A7 | % |
[B]
Gm | % | A7 | % |
Gm | % | A7 | A7 C7 |
[C]
F Dm | Gm C7 | F Dm | Gm C7 |
F Dm | Gm C7 | F | Gm C7 |
F |`,

`title: Quizás, Quizás, Quizás
by: Osvaldo Farrés
genre: Latin
feel: Bolero-Cha
source: iReal Pro community chart
tempo: 110
key: Gm
form: A A2 B A2
[A]
Gm | Cm D7 | Gm | Cm D7 |
Gm | Am7♭5 D7 | Gm | Am7♭5 D7 |
[A2]
Gm | Cm D7 | Gm | Cm D7 |
Gm | Am7♭5 D7 | Gm | % |
[B]
Am7 D7 | % | G | G Bm7 B♭7 |
Am7 D7 | % | G | Am7♭5 D7 |`,

`title: Solamente Una Vez
by: Agustín Lara
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: E♭
form: A A2 B B2 A A2 B B3
[A]
E♭ | E♭ E°7 | B♭7/F | B♭7 |
Fm7 | B♭7 | E♭ | % |
[A2]
E♭ | E♭ E°7 | B♭7/F | B♭7 |
Fm7 | B♭7 | E♭ | B♭7 |
[B]
E♭ | E°7 | B♭7/F | B♭7 |
Fm7 | Fm7 B♭7 | E♭ | % |
[B2]
E♭ | E°7 | B♭7/F | B♭7 |
Fm7 | B♭7 | E♭ | B♭7 |
[B3]
E♭ | E°7 | B♭7/F | B♭7 |
Fm7 | B♭7 | E♭ | B♭7 |
Fm7 | B♭7 | E♭ | E♭ |`,

`title: Contigo En La Distancia
by: Cesar Portillo De La Luz
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: E♭
[Intro]
Fm7 B♭13 | E♭6 | Fm7 B♭7 | E♭6 |
Dm7♭5 G7♭9 | Cm6 | F13 | Fm7 |
B♭7 |
[A]
Fm7 | B♭7 | E♭maj9 | % |
Fm7 | B♭7 B♭7♭13 | E♭maj9 | E♭maj9 G7 |
[B]
Cm9 | D7♭9 A♭9♯11 | Gm7 | C9sus G♭7 |
Fm7 | B♭9 | E♭6 D♭7 | C7 |
[C]
Fm7 | B♭9sus B♭13 | Gm7♭5 | C7 |
Fm7 | B♭7 B♭7♭13 | E♭6 | % |`,

`title: Dos gardenias
by: Isolina Carrillo
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: Em
[Intro]
Em Em/G | C7 B7 | Em B7 | Em |
[A]
Em | Em B7 | Em | Em Em/G Em |
C B7 | B7 | F♯m7♭5 | B7 |
Em | C7 B7 | Em | Bm7♭5 E7 |
Am | Am Am/C Am/C♯ | Em Em/G | C7 B7 |
Em B7 | Em |
[B]
Em | % | F♯7 | % |
Am | B7 | Em | C7 B7 |
[C]
Em | Bm7♭5 E7 | Am | % |
Em | C7 B7 | Em B7 | Em |
[C2]
Em | Bm7♭5 E7 | Am | % |
Em | C7 B7 | Em B7 | Em |
Em E7 | Am Am/F♯ | Em/G Em | C B7 |
Em Em/D | F♯m7♭5 B7 | Em | % |`,

`title: Lágrimas Negras
by: Miguel Matamoros
genre: Latin
feel: Bolero-Son
source: iReal Pro community chart
tempo: 90
key: Bm
form: Intro A B C C
[Intro]
Bm | % | B7 | Em |
% | F♯7 | % | Bm |
[A]
Bm Bm/C♯ | D E♭°7 | Em Em/F♯ | G A♭°7 |
A7sus | A7 | D | F♯7 |
Bm | % | Em | F♯7 |
Bm | % | C♯7♭9 | F♯7 |
Bm | C♯m7♭5 F♯7 |
[B]
Bm Bm/C♯ | D E♭°7 | Em Em/F♯ | G A♭°7 |
A7sus | A7 | D | % |
C♯7 | % | F♯7 | Em |
Bm | % | C♯7 | F♯7 |
Bm |
[C]
Bm | % | C♯7 | F♯7 |
Em | Bm | F♯7 | Bm |`,

`title: Chan Chan
by: Compay Segundo
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: Dm
[A]
Dm7 F | Gm A7 | Dm7 F | Dm7 F |
Gm A7 | Dm7 F | Gm A7 | Dm7 F |
Gm A7 | Dm7 F | Gm A7 |`,

`title: Moliendo Café
by: Hugo Blanco
genre: Latin
feel: Son
source: iReal Pro community chart
tempo: 160
key: Bm
form: Intro Intro2 A A B
[Intro]
Bm A | G F♯7 | Bm A | G F♯7 |
[Intro2]
Bm A | G F♯7 | Bm | % |
[A]
Bm | % | Bm | Bm |
Bm7 | F♯m7♭5 B7♭9 | Em7 | % |
Em7 | C♯m7♭5 F♯7♭9 | Bm7 | % |
G9 | F♯7♭9 | Bm7 | % |
[B]
Em7 | A7 | D | Bm7 |
Em7 | A7 | D | % |
G9 | % | F♯7♭9 | % |
Bm7 | Bm A | G F♯7 | Bm A |
G F♯7 | Bm A | G F♯7 | Bm A |
G F♯7 | Bm7 |`,

`title: Historia de un amor
by: Luis Miguel
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 80
key: Am
form: Intro Intro A A2 B A3
[Intro]
Dm7 Bm7 | Cmaj7 Am7 | Bm7 A♭m7 | Am7 |
[A]
Bm7♭5 | E7♭9 | Am7 | % |
G7 | F7 B7 | Esus | Cmaj7 F |
[A2]
Bm7♭5 | E7♭9 | Am7 | Fmaj7 |
G7 | F7 E7 | Am Am♭6 | Am |
[B]
Bm7♭5 | E7♭9 | Cmaj7 | Fmaj7 |
Dm7 | G7 | Cmaj7 | Fmaj7 |
Dm7 | Bm7 F7 | Esus | Cmaj7 Fmaj7 |
[A3]
Bm7♭5 | E7♭9 | Am7 | Fmaj7 |
G7 | F7 E7 | Am7 Esus | Am7 |
E7 | Dm7 Bm7 | Cmaj7 Am7 | Bm7 A♭m7 |
Asus |`,

`title: Volver
by: Carlos Gardel
genre: Latin
feel: Tango
source: iReal Pro community chart
tempo: 130
key: Cm
[A]
Cm | % | Dm7♭5 G7 | Cm B♭7 |
E♭ | E♭ E°7 | Fm B♭7 | E♭ A♭7 |
G7 | Cm Cm/B♭ | A♭7 D7/F♯ | G7 |
Fm7 B♭7 | E♭ E♭/D Cm | A♭7 D7 | G7 A♭7 G7 |
Cm Fm/D | Cm/E♭ Fm | Cm/G A♭7 G7 | Cm |
[B]
C | Dm G7 | C Fm | C Dm G7 |
C B♭ Am C7/G | F | Fm | C B7 B♭7 |
A7 | Dm E♭°7 | Em F | Em Dm |
C | G7 | % | C Fm |
C Dm G7 | C |`,

`title: Uno
by: Mores-Discépolo
genre: Latin
feel: Tango
source: iReal Pro community chart
tempo: 130
key: G
[A]
G | B7 | Em | Bm7♭5 E7 |
Am | F | D7 | Am D7 |
G | C♯°7 | G F7 | E7 |
Am | D7 | G | C |
C♯°7 | G B7 | E7 | Am7 |
Am7 E♭7 | D7 | % |
[B]
G B7 | Em Em7 | Am Am♭6 | Am6 E7 |
Am | D7 | G Am Bm C | D7 |
Gmaj7 | B♭°7 | Am | D9 |
Am | D7 D9 | G G♯° Am A♯° | G/B D7 |
G B7 | Em E7 | Am Am♭6 | Am6 Am7 |
C | Cm | G F7 | E7 |
Am | A7 D7 | G |`,

`title: Nostalgias
by: Cobián-Cadícamo
genre: Latin
feel: Tango
source: iReal Pro community chart
tempo: 100
key: Am
[A]
Am Am(maj7) | Am7 Am6 | Dm E7 | Am F E7 |
Am | Dm | E7 | Am |
Am | Dm | G7 | C E7 |
Am Am(maj7) | Am7 Am6 | Dm E7 | Am F E7 |
[B]
Am E7 | Am E7 | Am E7 | Am |
Dm Dm(maj7) | Dm7 Dm6 | E | E7 |
Dm | E7 | Am | % |
A7 | % | A7 | A7 |
Dm E7 | Dm/F E7 | Am | % |
F7 E7 | Am |`,

`title: El Reloj
by: Roberto Cantoral
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: C
form: Intro A A2 A2 B B2
[Intro]
C Am | Dm G7sus | C Am | Dm G7sus |
[A]
C Am | Dm G7 | C Am | Dm G7 |
C Am | Dm G7 | C Am |
[A2]
C Am | Dm G7 | C Am | Dm G7 |
C Am | Dm G7 | C Am | Dm G7 |
[B]
C | Em7 | F F♯°7 | C/G Am7 |
Dm7 G7 | C Am | Dm G7 | C |
[B2]
C | Em7 | F F♯°7 | C/G Am7 |
Dm7 G7 | C Am | Dm G7 | C |
Dm7 G7 | C Am | Dm7 G7 | C |`,

`title: Somos Novios
by: Armando Manzanero
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: G
form: A B A B2
[A]
G6 | % | F♯m7♭5 | B7 |
Em7 | Gmaj7 | Bm7♭5 | E7♭9 |
[B]
Am7 | Cm | Bm7 | E7♭9 |
Am7 | A13 | D9 | D7 |
[B2]
Am7 | Cm | Bm7 | E7♭9 |
Am7 | D9 | G6 | % |`,

`title: Contigo Aprendi
by: Armando Manzanero
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: A
form: A B A B2
[A]
Amaj7 | % | G♯m11 | C♯7 C♯7♭9 |
F♯m7 | % | Em7 | A7 A7♭13 |
[B]
Dmaj7 | D/E | C♯m7 | C♯m7♭5/G F♯7♭13 |
Bm7 | F♯m7 B7 | Bm7 | E7 E7♭9 |
[B2]
Dmaj7 | D/E | C♯m7 | C♯m7♭5/G F♯7♭13 |
Bm7 | E7 E/D | C♯m7♭5 | F♯7 |
Bm7 | E7 Dm/E | A6 | % |`,

`title: Como Fue (as sang by Beny More)
by: Ernesto Duarte
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: F
[A]
F Fmaj7/E | F/E♭ F7♭9 | B♭ | E♭7♯11 |
Am7 A♭7♯11 | Gm C7 | Am A♭7♯11 | Gm G♭9 |
[A2]
F Fmaj7/E | F/E♭ F7♭9 | B♭ | E♭7♯11 |
Am7 A♭7 | Gm C7 | F7 Cm7 | F7 F7♭13 |
[B]
B♭6 | Bm7♭5 E7 | F6 | F7 F7♯9 |
B♭6 | Bm7♭5 E7 | A Bm D♭m | Gm C7 |
[A3]
F Fmaj7/E | F/E♭ F7♭9 | B♭ | E♭7♯11 |
Am7 A♭7♯11 | Gm C7 | F6 D7♭9/F♯ | Gm G♭7♯11 |
Am A♭7♯11 | Gm C7 | F Am A♭7 | Gm G♭7♯11 |
F | % |`,

`title: Tres Palabras
by: Osvaldo Farrés
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 90
key: Cm
form: A B A B2
[A]
Cm(maj7) | C7♭9 | Fm7 | % |
B♭9 | % | E♭maj7 | A♭maj7 G7 |
[B]
Cm E♭9 | A♭maj7 | D7 | % |
Fm6 | A♭7 | G7 | % |
[B2]
Cm E♭9 | A♭maj7 | D7 | % |
Dm7♭5 | G7 | Cm7 | Cm7 G7 |
Dm7♭5 | G7 | Cm7 D/C | D♭/C Cm7 |`,

`title: Obsesión
by: Pedro Flores
genre: Latin
feel: Bolero
source: iReal Pro community chart
tempo: 90
key: Dm
[A]
Dm7 | Em7♭5 A7♭9 | Dm7 | Em7♭5 A7♭9 |
Gm7 C7 | Fmaj7 B♭maj7 | E7♭9♭5 | A7♭9 |
Dm7 | Em7♭5 A7♭9 | Dm7 | Em7♭5 A7♭9 |
Gm7 C7 | Fmaj7 B♭maj7 | E7♭9 A7♭9 | Dm |
[B]
Gm7 C7 | Fmaj7 | Gm7 C7 | Fmaj7 F♯°7 |
Gm7 C7 | Fmaj7 | E7♭9♯5 | A7♭9 |
[C]
Dm7 | Em7♭5 A7♭9 | Dm7 | Em7♭5 A7♭9 |
Gm7 C7 | Fmaj7 B♭maj7 | E7♭9 A7♭9 | Dm |`,

`title: Copacabana
by: Barry Manilow
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 130
key: Gm
form: Intro A B C A B C2
[Intro]
Gm9 F♯m | Fm9 | Gm9 F♯m | Fm7 F♯m7 Gm7 |
[A]
Fm7 A♭/B♭ | E♭maj7 | Am7♭5 D7 | Gm |
Fm7 A♭/B♭ | E♭maj7 | Am7♭5 D7 | Gm7 |
[B]
C°7 Gm | C° D7 Gm | Cm7 D7 | Gm D7/F♯ B♭7/F |
[C]
Fm7 A♭/B♭ | E♭maj7 | Fm7 A♭/B♭ | E♭maj7 B♭/C C7 |
Fm7 A♭/B♭ | B♭/C C7 | Fm7 B♭7 | Gm7 C9 |
Fm7 | D7♭9 | Gm9 F♯m | Fm9 |
Gm9 F♯m | Fm9 F♯m9 Gm9 |
[C2]
Fm7 A♭/B♭ | E♭maj7 | Fm7 A♭/B♭ | E♭maj7 B♭/C C7 |
Fm7 A♭/B♭ | B♭/C C7 | Fm7 B♭7 | Gm7 C9 |
Fm7 | D7♭9 | Gm9 F♯m | Fm9 |
Gm9 F♯m | Fm9 | Gm9 | Gm9 A♭m Am |
B♭m9 | Bm Cm | D♭m9 | % |
D♭m9 | % | Dm9 | % |
Dm9 | % | E♭/D♭ | % |
E♭/D♭ | % | Fm/D | % |
Fm/D | % | B♭m9 | % |
Gm9 | G♭m9 | Fm9 N.C. | N.C. |
Fm9 | Gm9 | Fm9 | Gm9 |
Am9 | Gm9 | Fm9 | Gm9 |
D7♭9 | Gm9 | Fm9 | Gm9 |
Fm9 | Gm9 | Gm9 |`,

`title: Usted
by: Jose Feliciano
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 100
key: G
[Intro]
Cmaj7 | F7 | Gmaj7 | E7 |
Am7 | D7 | Gmaj7 | Gmaj7 D7 |
[A]
Gmaj7 | Bm7 B♭7 | Am7 D7 | Bm7 E7 |
Am7 | D7 | Gmaj7 | Gmaj7 D7 |
[A2]
Gmaj7 | Bm7 B♭7 | Am7 D7 | Bm7 E7 |
Am7 | D7 | Bm7 B♭7 | E♭maj7 D7 |
[A3]
Gmaj7 | Bm7 B♭7 | Am7 D7 | Bm7 E7 |
Am7 | Cm7 F7 | Bm7 | E7 |
Am7 | Cm7 F7 | Gmaj7 Fmaj7 | E7 |
Am7 | D7 | Gmaj7 | % |`,

`title: Tequila
by: The Champs
genre: Latin
feel: Latin
source: iReal Pro community chart
tempo: 174
key: F
form: Intro Intro A A B A C C2
[Intro]
F Cm7 | % | F Cm7 | % |
[A]
F Cm7 | % | F Cm7 | % |
F Cm7 | % | F Cm7 | % |
[B]
F°7 | F7 F5 | F°7 | F7 F5 |
F°7 | F7 | G5 | C7 N.C. |
[C]
F Cm7 | % | F Cm7 | % |
[C2]
F Cm7 | % | F Cm7 | % |
F Cm7 | % | F Cm7 | % |
F Cm7 | % | F Cm7 | % |
F Cm7 | % | F Cm7 | F Cm F |`,

`title: All Your Love
by: Otis Rush
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 80
key: Em
form: A A B
[A]
Em | % | % | % |
Am | % | Em | % |
B7 | Am | Em | % |
[B]
E | % | % | % |
A9 | A7 | E | % |
B7 | A7 | E | % |`,

`title: Baby Please Don't Go
by: Muddy Waters
genre: Blues
feel: Blues
source: iReal Pro community chart
tempo: 110
key: B♭
time: 2/4
[A]
B♭7 | % | % | % |
B♭7 | % | % | % |
F7 |`,

`title: Back Door Man
by: Howlin' Wolf
genre: Blues
feel: Blues Shuffle
source: iReal Pro community chart
tempo: 86
key: E
time: 1/2
form: A B A B
[A]
E7 | % | E7 | % |
E7 | % | E7 | % |
[B]
E7 | % | E7 | % |
E7 | % | E7 | % |`,

`title: Blow, Wind, Blow
by: Muddy Waters
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 102
key: G
form: A A
[A]
G | C7 | G | % |
C7 | % | G | % |
D7 | C7 | G | D7 |`,

`title: Blues and Booze
by: Ma Rainey
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 91
key: D
[A]
D | G7 | D | D7 |
G7 | % | D | % |
A7 | G | D7 | A7 |
D | G7 | D | D7 |
G7 | % | D | % |
A7 | G | D7 | D7 |`,

`title: Boogie Chillen No.2
by: John Lee Hooker-Bernard Besman
genre: Blues
feel: Electric Blues
source: iReal Pro community chart
tempo: 156
key: A
[A]
A7 | % | % | % |
A7 | % | % | % |
A7 | % | % | % |`,

`title: Boom Boom (1992)
by: John Lee Hooker
genre: Blues
feel: Blues
source: iReal Pro community chart
tempo: 166
key: E
[Intro]
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
A7 A7/C A7/D | A N.C. | E E/G E/A | E N.C. |
[A]
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
A7 A7/C A7/D | A N.C. | E E/G E/A | E N.C. |
B7 B7/D B7/E | A7 N.C. | E E/G E/A | E N.C. |
E E/G E/A | E N.C. | E E/G E/A |
[A2]
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
A7 A7/C A7/D | A N.C. | E E/G E/A | E N.C. |
B7 B7/D B7/E | A7 N.C. | E E/G E/A | E N.C. |
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
[A3]
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
A7 A7/C A7/D | A N.C. | E E/G E/A | E N.C. |
B7 B7/D B7/E | A7 N.C. | E E/G E/A | E N.C. |
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
A7 A7/C A7/D | A N.C. |
[B]
E E/G E/A | % | E E/G E/A |
[B2]
E E/G E/A | % | E E/G E/A | E E/G E/A |
[B3]
E E/G E/A | % | E E/G E/A | E E/G E/A |
E E/G E/A | E N.C. | E E/G E/A | E N.C. |
A7 A7/C A7/D | A N.C. | E E/G E/A | % |
E E/G E/A | % | E7 |`,

`title: Born Under A Bad Sign
by: Albert King
genre: Blues
feel: Rock Blues
source: iReal Pro community chart
tempo: 96
key: D♭
form: Intro A A B A2
[Intro]
D♭7 | % | % | % |
D♭7 | % | A♭7 | G♭7 |
D♭7 | % |
[A]
D♭7 | % | % | % |
D♭7 | % | % | % |
A♭7 | G♭7 | D♭ | % |
[B]
D♭7 | % | % | % |
A♭7 | G♭7 | A♭7 | G♭7 N.C. |
D♭ | % |
[A2]
D♭7 | % | % | % |
D♭7 | % | % | % |
A♭7 | G♭7 | D♭ | % |
D♭ | % |`,

`title: Come Back Baby
by: Ray Charles
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 96
key: E♭
time: 1/2
[A]
E♭7 | E♭7 | A♭9 G♭7 | F7 A♭9 A° |
E♭/B♭ E♭/B Cm7 | F7 B♭13 | E♭7 A♭ | E♭ B♭7♯5 |
E♭7 | E♭7 | A♭9 G♭7 | F7 A♭9 A° |
E♭/B♭ E♭/B Cm7 | F7 B♭13 | E♭7 A♭ | E♭ E9 E♭ |`,

`title: Come On In My Kitchen
by: Robert Johnson
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 74
key: B♭
[A]
B♭7 | % | % | % |
B♭7 | % | F7 | B♭7 F7 |
B♭7 | % | % | B♭7 |
% | % | % | B♭7 |
% | F7 | B♭7 F7 | B♭7 |
% | % |`,

`title: Confessin' The Blues
by: B.B. King
genre: Blues
feel: Medium Shuffle
source: iReal Pro community chart
tempo: 105
key: G
[A]
G7 | % | % | % |
C7 | % | G7 | % |
D7 | C7 | G7 | % |
G7 | % | % | % |
C7 | % | G7 | % |
D7 | C7 | G7 | % |`,

`title: Crazy Blues
by: Mamie Smith
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 100
key: E
form: A B C D D
[A]
E | % | % | % |
B7 | % | E | E7 |
A | Am | E | E7 |
B7 | % | E | B7 |
[B]
E | B7 | E | E7 |
A7 | B7 | E | F°7 |
F♯m7 B7 | E A Am | E C7 B7 |
[C]
E | E7 | A7 | E |
% | E7 | F♯7 | B7 |
E | Em | A | E |
C♯m C♯m(maj7) | C♯m7 F♯7 | F♯7 B7 | E |
[D]
E E/F♯ E/G E/A | E/B E/C♯ E/B E/G♯ | E | E7 |
A7 | B7 | E | % |
B7 | % | E | E E/B E/B♭ E/A |`,

`title: Crossroads (a.k.a. Cross Road Blues)
by: Eric Clapton
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 108
key: A
[A]
A7 | D7 | A7 | % |
D7 | % | A7 | % |
E7 | A7 | % | % |
A7 | D7 | A7 | % |
D7 | % | A7 | % |
E7 | A7 | % | % |`,

`title: Easy Rider
by: Leadbelly
genre: Blues
feel: Fast Blues
source: iReal Pro community chart
tempo: 139
key: C
[A]
C | % | C | % |
F | % | C | % |
F | % | C | % |
C | F7 | C | % |`,

`title: Everyday (I Have The Blues)
by: B.B. King
genre: Blues
feel: Medium Shuffle
source: iReal Pro community chart
tempo: 110
key: B♭
[A]
B♭7 | % | % | % |
E♭9 | % | B♭7 | % |
F7 | E♭7 | B♭7 | % |
B♭7 | % | % | % |
E♭9 | % | B♭7 | % |
F7 | E♭7 | B♭7 | % |`,

`title: Evil (Is Going On)
by: Howlin' Wolf
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 95
key: G
[A]
G7 | % | % | % |
C7 | % | G7 | % |
D7 | C7 | G | % |
G7 | % | % | % |
C7 | % | G7 | % |
D7 | C7 | G | % |`,

`title: Feel Like Going Home
by: Muddy Waters
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 80
key: G
[A]
G7 | % | % | % |
C7 | % | G7 | % |
D7 | C7 | G7 | % |
G7 | % | % | % |
C7 | % | G7 | % |
D7 | C7 | G7 | % |`,

`title: Five Long Years
by: Eddie Boyd
genre: Blues
feel: Slow Shuffle
source: iReal Pro community chart
tempo: 66
key: D
time: 1/2
[A]
D7 | G7 | D7 | % |
G7 | % | D7 | % |
A7 | G7 | D7 | % |
D7 | G7 | D7 | % |
G7 | % | D7 | % |
A7 | G7 | D7 | % |`,

`title: Folsom Prison Blues
by: Johnny Cash
genre: Blues
feel: Country Blues
source: iReal Pro community chart
tempo: 211
key: F
[A]
F | % | % | % |
F | % | F | F7 |
B♭ | % | % | % |
F | % | % | % |
C7 | % | % | % |
F | % |`,

`title: Forty Days And Forty Nights
by: Bernard Roth
genre: Blues
feel: Shuffle Blues
source: iReal Pro community chart
tempo: 95
key: A
time: 1/2
form: A B C D D
[A]
A7 | % | % | % |
D7 | % | A7 | % |
E7 | D7 | A7 | % |
[B]
A7 | % | A7 | A7 |
% | D7 | % | A7 |
% | E7 | D | A7 |
% |
[C]
A7 | % | A7 | A7 |
A7 | A7 | D7 | % |
A7 | % | E7 | D7 |
A7 | % |
[D]
A7 | % | % | % |
D7 | % | A7 | % |
E7 | D7 | A7 | % |`,

`title: Further On Up The Road
by: Joe Veasey-Don Robey
genre: Blues
feel: Bright Shuffle Blues
source: iReal Pro community chart
tempo: 110
key: G
time: 1/2
[A]
G | % | % | % |
C7 | % | G | % |
D7 | C7 | G | % |`,

`title: Going Down Slow
by: Eric Clapton
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 50
key: C
time: 1/2
[A]
C7 | F7 | C7 | % |
F7 | % | C7 | % |
G7 | F7 | C7 F7 | C7 G7 |
C7 | F7 | C7 | % |
F7 | % | C7 | % |
G7 | F7 | C7 F7 | C7 G7 |
C7 |`,

`title: Good Morning Little Schoolgirl
by: Sonny Boy Williamson
genre: Blues
feel: Fast Blues
source: iReal Pro community chart
tempo: 180
key: C
[A]
C7 | % | % | % |
F7 | % | % | C7 |
C7 | % | % | G7 |
G7 | F7 | % | C7 |
C7 | % | C7 | C7 |
% | % | % | F7 |
% | % | C7 | C7 |
% | % | G7 | G7 |
F7 | % | C7 | C7 |
% | C7 |`,

`title: Hellhound On My Trail
by: Eric Clapton
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 91
key: E
time: 2/4
form: Intro A A
[Intro]
E7 | E7 Am/E | E7 E7/D E7/C♯ E7/C | E7 E7/D E7/C♯ |
E7/D |
[A]
E7 | B7 | % | E7 E7/D E7/C♯ E7/C |
E7 | % | E7 | % |
E7 E7/D E7/C♯ E7/C | E7 | E7 | B7 |
% | E7 E7/D E7/C♯ E7/C | E7 E7/D E7/C♯ E7/C | E7 |
E7 |`,

`title: Honey Bee
by: Muddy Waters
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 60
key: F
time: 1/2
[A]
F7 | % | % | % |
B♭7 | % | F7 | % |
C7 | B♭7 | F7 | C7 |
F7 | % | % | % |
B♭7 | % | F7 | % |
C7 | B♭7 | F7 | C7 |
F6 F9 | F9 |`,

`title: I Ain't Superstitious
by: Howlin' Wolf
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 95
key: D
[A]
G7 | % | D | % |
G7 | % | D | % |
A7 | G7 | D | % |
G7 | % | D | % |
G7 | % | D | % |
A7 | G7 | D | % |`,

`title: I Can't Be Satisfied (1948)
by: Muddy Waters
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 200
key: G
[A]
G7 | % | % | % |
G7 | % | % | % |
G7 | % | G7 | % |
G7 | G7 | % | D7 |
% | C7 | % | G |
% | G7 | % | G7 |
% | % | % | G7 |
% | % | % | G7 |
% | G7 | % | G7 |
G7 | % | D7 | % |
C7 | % | G | % |
G7 | % |`,

`title: I Can't Quit You Baby
by: Willie Dixon
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 96
key: A
time: 1/2
[A]
A7 | D9 | A7 | % |
D7 | % | A7 | % |
E7 | D7 | A7 B♭ | A7 B♭ |
A7 | D9 | A7 | % |
D7 | % | A7 | % |
E7 | D7 | A7 B♭ | A7 B♭ |
A7 |`,

`title: I Just Want To Make Love To You
by: Willie Dixon
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 110
key: D
[A]
D7 | % | % | % |
D7 | % | % | % |
[A2]
D7 | % | % | % |
D7 | % | % | % |
D7 | % | % | % |`,

`title: I'm Ready
by: Muddy Waters
genre: Blues
feel: Shuffle Blues
source: iReal Pro community chart
tempo: 110
key: E♭
[A]
E♭7 | % | % | % |
A♭7 | % | E♭7 | % |
B♭7 | A♭7 | E♭7 | B♭7 |
[B]
E♭7 | % | % | % |
E♭7 | % | % | % |
A♭7 | % | E♭7 | % |
B♭7 | A♭7 | E♭7 | B♭7 |
[B2]
E♭7 | % | % | % |
E♭7 | % | % | % |
A♭7 | % | E♭7 | % |
B♭7 | A♭7 | E♭7 | B♭7 |
B♭7 E♭7 |`,

`title: I'm Tore Down
by: Eric Clapton
genre: Blues
feel: Shuffle Blues
source: iReal Pro community chart
tempo: 145
key: C
[Intro]
G7 | F7 | C7 | % |
[A]
C7 | % | % | % |
F7 | % | C7 | % |
G7 | F7 | C7 | % |
[B]
C7 N.C. G7 | C7 N.C. | C7 N.C. G7 | C7 N.C. G♭7 |
F7 | % | C7 | % |
G7 | F7 | C7 | % |
[C]
C7 N.C. | C7 N.C. D♭7 | C7 N.C. | C7 N.C. D♭7 |
[C2]
C7 N.C. | C7 N.C. D♭7 | C7 N.C. | C7 N.C. D♭7 |
F7 | % | C7 | % |
G7 | F7 | C7 | % |
[D]
C7 | % | % | % |
F7 | % | C7 | % |
G7 | F7 | C7 | % |
[D2]
C7 | % | % | % |
F7 | % | C7 | % |
G7 | F7 | C7 | % |
C7 | % | % | % |
F7 | % | C7 | % |
G7 | F7 | C7 | % |`,

`title: I'm Your Hoochie Coochie Man
by: Willie Dixon
genre: Blues
feel: Blues
source: iReal Pro community chart
tempo: 110
key: A
time: 1/2
[A]
A | % | % | % |
A | % | % | % |
[B]
D7 | % | A7 | % |
E7 | D7 | A7 | % |`,

`title: It's My Own Fault (Newport)
by: John Lee Hooker
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 57
key: E
time: 1/2
[A]
E7 | A7 | E7 | % |
A7 | % | E7 | % |
B7 | A7 | E7 | E7 B7 |`,

`title: Juke
by: Little Walter
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 110
key: E
[A]
E | % | % | % |
A7 | % | E | % |
B7 | A7 | E | B7 |
[B]
E | % | % | % |
A7 | % | E | % |
B7 | A7 | E | B7 |`,

`title: Kindhearted Woman Blues
by: Robert Johnson
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 96
key: B
[A]
B7 | % | % | % |
E7 | % | B7 | % |
F♯7 | E7 | B B/A B/G♯ B/G | F♯7 |
B7 | % | % | % |
E7 | % | B7 | % |
F♯7 | E7 | B B/A B/G♯ B/G | F♯7 |
B7 |`,

`title: Long Distance Call
by: Muddy Waters
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 60
key: F
[A]
F7 | % | % | % |
B♭7 | % | F7 | % |
C7 | B♭7 | F7 | % |
F7 | % | % | % |
B♭7 | % | F7 | % |
C7 | B♭7 | F7 | % |`,

`title: Love Struck Baby
by: Stevie Ray Vaughan
genre: Blues
feel: Fast Blues
source: iReal Pro community chart
tempo: 110
key: A♭
[A]
A♭7 | % | % | % |
D♭7 | % | A♭7 | % |
E♭7 | % | A♭7 | E♭7♯9 |
[B]
D♭7 | % | A♭7 | % |
D♭7 | % | E♭7 | % |
D♭7 | % | A♭7 | % |
D♭7 | % | E♭7 | % |
[C]
A♭7 | % | D♭7 | % |
A♭7 | % | E♭7 | % |
[D]
A♭7 | % | % | % |
D♭7 | % | A♭7 | % |
E♭7 | % | A♭7 | E♭7 |
[D2]
A♭7 | % | % | % |
D♭7 | % | A♭7 | % |
E♭7 | % | A♭7 | E♭7 |
E♭7 | D♭7 | A♭7 | % |
A♭7 |`,

`title: Nobody Knows You When You're Down and Out
by: Bessie Smith
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 87
key: C
form: A B B
[A]
C E7 | A7 | Dm A7 | Dm |
F B7 | C A7 | D7 | G7 |
C E7 | A7 | Dm A7 | Dm |
F B7 | C A7 | D7 | G7 |
[B]
C E7 | A7 | Dm A7 | Dm |
F B7 | C A7 | D7 | G7 |
C E7 | A7 | Dm A7 | Dm |
F B7 | C A7 | D7 | G7 C A7 |
D7 G7 | C |`,

`title: Pinetop's Blues
by: Pinetop Smith
genre: Blues
feel: Shuffle Blues
source: iReal Pro community chart
tempo: 110
key: F
[A]
F | B♭7 | F | F7 |
B♭7 | % | F7 | % |
C7 | B♭7 | F F/E♭ F/D D♭7 | C7 |
F | B♭7 | F | F7 |
B♭7 | % | F7 | % |
C7 | B♭7 | F F/E♭ F/D D♭7 | C7 |
F7 |`,

`title: Reconsider Baby
by: Lowell Fulson
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 105
key: G
form: A B A B2
[A]
G7 | C7 | G | % |
C7 | % | G | G G♯° |
Am7 | D7 | G | D7 |
[B]
G7 | C7 | G | % |
C7 | % | G | G G♯° |
Am7 | D7 | G | D7 |
[B2]
G7 | C7 | G | % |
C7 | % | G | G G♯° |
Am7 | D7 | G G7 C C♯m7♭5 | G/D A♭13 G7 |`,

`title: Red House
by: Jimi Hendrix
genre: Blues
feel: Shuffle
source: iReal Pro community chart
tempo: 68
key: B
time: 1/2
[A]
B7 | E7 | B7 | % |
E7 | % | B7 | % |
F♯7 | E7 | B7 | F♯7 |
B7 | E7 | B7 | % |
E7 | % | B7 | % |
F♯7 | E7 | B7 B7/D♯ B7/E B7/F | F♯7 C7 B7 |`,

`title: Rock Me Baby
by: Joe Josea-B.B. King
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 110
key: C
[A]
C7 | % | % | % |
F7 | % | C7 | % |
G7 | F7 | C7 | C7 G7♯9 |`,

`title: Rollin' And Tumblin' (1950)
by: Muddy Waters
genre: Blues
feel: Fast Blues
source: iReal Pro community chart
tempo: 110
key: A
form: Intro A B C A B C
[Intro]
A | % | A7/C A7/C♯ | A7/D A7/C |
A | % | A | % |
A | % | A7 |
[A]
A | % | A7/C A7/C♯ | A7/D A7/C |
A | % | A | % |
A | % | A7 |
[B]
D7 | % | % | % |
A | % | A | % |
A | % | A7 |
[C]
E7 | % | D7 | % |
A | % | A | % |
A | % | A7 |`,

`title: Rollin' Stone (Catfish Blues)
by: Muddy Waters
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 77
key: E
[A]
E7 | % | % | % |
E7 | % | % | % |
E7 | % | % | % |
E7 | % | E7 | % |
% | % | E7 | % |
% | % | E7 | % |
% | % | E7 | % |`,

`title: Smokestack Lightning
by: Chester Burnett
genre: Blues
feel: Blues
source: iReal Pro community chart
tempo: 130
key: Em
[A]
Em | % | % | % |
Em | % | % | % |
Em | % | % | % |`,

`title: Spoonful
by: Howlin' Wolf
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 119
key: E
[A]
E7♭5 E7sus | E7 | E7♭5 E7sus | E7 |
E7♭5 E7sus | E7 | E7♭5 E7sus | E7 |
E7♭5 E7sus | E7 | E7 | % |
E7♭5 E7sus | E7 | E7 | % |
E7 | % | % | % |`,

`title: Standing Around Crying
by: Muddy Waters
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 65
key: F
[A]
F | B♭7 | F | F7 |
B♭7 | % | F | % |
C7 | B♭7 | F | F C7 |
F | B♭7 | F | F7 |
B♭7 | % | F | % |
C7 | B♭7 | F | F C7 |
F7 |`,

`title: Stateboro Blues
by: The Allman Brothers
genre: Blues
feel: Medium Shuffle
source: iReal Pro community chart
tempo: 123
key: D
[A]
D7 | G7 | D7 | % |
G7 | % | D7 | % |
A7 | G7 | D7 | % |`,

`title: Still A Fool
by: Muddy Waters
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 66
key: F
time: 1/2
form: A B A B2
[A]
F7 | % | % | % |
F7 | % | % | % |
[B]
F7 | % | F7 | % |
F7 |
[B2]
F7 | % | F7 | % |
F7 | F7 | % | F7 |
% | F7 |`,

`title: Sweet Home Chicago
by: Robert Johnson
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 110
key: F
[A]
F7 | B♭7 | F7 | % |
B♭7 | % | F7 | % |
C7 | B♭7 | F7 | % |`,

`title: Texas Flood
by: Larry C. Davis, Joseph W. Scott
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 80
key: C
[A]
C7 | F7 | C7 | % |
F7 | % | C7 | % |
G7 | F7 | C7 | C7 G7♯5 |`,

`title: Three O'Clock Blues
by: B.B. King
genre: Blues
feel: Medium Blues
source: iReal Pro community chart
tempo: 70
key: B♭
time: 1/2
[A]
B♭7 | E♭7 | B♭ | B♭7 |
E♭7 | % | B♭7 | % |
F7 | E♭7 | B♭7 | F7 |
B♭7 | E♭7 | B♭ | B♭7 |
E♭7 | % | B♭7 | % |
F7 | E♭7 | B♭7 | F7 |
B♭7 |`,

`title: Worried Life Blues
by: Big Maceo
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 70
key: C
form: A B A B2
[A]
C | % | F7 | % |
C | G7 | C C7 F Fm7 | C G7 |
[B]
C | % | F7 | % |
C | G7 | C C7 F Fm7 | C G7 |
[B2]
C | % | F7 | % |
C | G7 | C C7 F Fm7 | C G7 |
C7 |`,

`title: You Gonna Need My Help
by: Muddy Waters
genre: Blues
feel: Slow Blues
source: iReal Pro community chart
tempo: 75
key: E♭
[A]
E♭7 | % | E♭7 | % |
A♭7 | % | E♭7 | % |
B♭7 | A♭7 | E♭7 E♭7/D♭ E♭7/C E♭7/B | B♭7 |
E♭7 | % | E♭7 | % |
A♭7 | % | E♭7 | % |
B♭7 | A♭7 | E♭7 E♭7/D♭ E♭7/C E♭7/B | B♭7 |
E♭7 |`,

`title: ABC
by: The Jackson 5
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 93
key: A♭
form: A B A B2 A B3
[A]
A♭ D♭/A♭ | % | A♭ D♭/A♭ | A♭ D♭/A♭ |
A♭ D♭/A♭ | % | A♭ D♭/A♭ | A♭ D♭/A♭ |
[B]
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ | % | A♭ |
[B2]
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ |
[B3]
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ | A♭ D♭ | % | A♭ D♭ |
A♭ D♭ | N.C. | % | N.C. |
N.C. | N.C. | N.C. | A♭ D♭ |
% | % | A♭ D♭ | % |
A♭ D♭ | A♭ D♭ | A♭ | % |
A♭ D♭ | % | A♭ D♭ | A♭ D♭ |
A♭ | % |`,

`title: Ain't No Mountain High Enough
by: Marvin Gaye-Tammi Terrell
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 130
key: Bm
form: Intro Intro A B A B2 A2 B3 B4 B3 B3
[Intro]
Bm/A | Bm/G♯ | Bm/G Bm/F♯ | Em F♯m G |
[A]
Bm/A | Bm/G♯ | Bm/G Bm/F♯ | Em F♯m G |
Bm/A | Bm/G♯ | Bm/G Bm/F♯ | Em F♯m |
[B]
Gmaj7 G6 | F♯m7 Bm | Gmaj7 G6 | F♯m7 Bm |
Gmaj7 G6 | F♯m7 Bm | E | G |
[B2]
Gmaj7 G6 | F♯m7 Bm | Gmaj7 G6 | F♯m7 Bm |
Gmaj7 G6 | F♯m7 Bm | E | G |
A7sus | A7 A7sus | A7sus | A7 |
E/F♯ F♯m | Bsus Bm | Gmaj7 Em7 | G |
A | % | B♭ | % |
[A2]
Cm/B♭ | Cm/A | Cm/A♭ Cm/G | Fm Gm A♭ |
Cm/B♭ | Cm/A | Cm/A♭ Cm/G | Fm Gm |
[B3]
A♭maj7 A♭6 | Gm7 Cm |
[B4]
A♭maj7 A♭6 | Gm7 Cm | F | A♭ |`,

`title: Ain't No Sunshine
by: Bill Withers
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 75
key: Am
[A]
Am Em Em/G | Am | Am Em Em/G | Am |
Em | Dm | Am Em Em/G | Am |
[A2]
Am Em Em/G | Am | Am Em Em/G | Am |
Em | Dm | Am Em Em/G | Am |
N.C. | N.C. |
[A3]
Am Em Em/G | Am | Am Em Em/G | Am |
Am Em Em/G | Am | Em | Dm |
Am Em Em/G | Am | Am Em Em/G | Am |`,

`title: Ain't Nothing Like The Real Thing
by: Marvin Gaye-Tammi Terrell
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 95
key: E♭
form: A Intro Intro2 A2 A2 B A2 C A3
[A]
E♭ |
[Intro]
E♭ E♭maj7 | A♭/E♭ E♭ Fm/E♭ E♭ | A♭maj7 | Fm7 Fm7/B♭ |
[Intro2]
E♭ E♭maj7 | A♭/E♭ E♭ Fm/E♭ E♭ | A♭maj7 | Fm7 Fm7/B♭ |
E♭ Gm/D Cm7 |
[A2]
E♭ Fm Gm | A♭maj7 Gsus G | Cm7 Bm7 | B♭m7 E♭7 Fm7 |
E♭ |
[B]
E♭ E♭maj7 | A♭/E♭ E♭ Fm/E♭ E♭ | A♭maj7 | Fm7 Fm7/B♭ |
[C]
Gm7 G7/B | Cm Bm7 B♭m7 E♭7 | A♭maj7 B♭7sus | A♭m/D♭ Fm7 |
B♭7sus |
[A3]
E♭ Fm Gm | A♭maj7 Gsus G | Cm7 Bm | B♭m7 E♭7 Fm7 |
E♭ | E♭ E♭maj7 | A♭/E♭ E♭ Fm/E♭ E♭ | A♭maj7 |
Fm7 Fm7/B♭ | E♭ E♭maj7 | A♭/E♭ E♭ Fm/E♭ E♭ | A♭maj7 |
Fm7 Fm7/B♭ |`,

`title: Aja
by: Steely Dan
genre: Funk
feel: Funk Rock
source: iReal Pro community chart
tempo: 115
key: C
form: Intro A B A B2 C C D C D2
[Intro]
Bmaj7 | % | % | Bmaj7 |
% | % | % |
[A]
Bmaj7 | % | B7sus | B E |
Bm11 | % | Cmaj7 | % |
D69 | % |
[B]
E7sus | % | G A/G | G |
G♭7 E♭7 | E♭7 | A♭7 | % |
E7sus | % | D/C | C |
F G | D♭maj7♯11 | Cmaj7♯11 | Bmaj7 |
% | % | % |
[B2]
E7sus | % | G A/G | G |
G♭7 E♭7 | E♭7 | A♭7 | % |
E7sus | % | D/C | C |
F G | D♭maj7♯11 | Cmaj7♯11 | Bsus Esus |
Esus | A G | A G | A G |
A G | A G | A G | A G |
A G | A G | A G | A G |
[C]
A G | % | % | A |
G F | % | F♯7sus | % |
[D]
G | % | C D/C | % |
% | Cmaj7 | E7sus | % |
F G A G | F♯7sus | G/F F | Am/F G/F |
A G | % | % | % |
[D2]
G | % | C D/C | % |
% | Cmaj7 | E7sus | % |
F G A G | F♯7sus | G/F F | Am/F G/F |
G/F F | C/G F | Cm11 | Cm11 |
B7sus | % | % | % |
% | % | % | % |
Csus C♯sus | F♯sus | Fsus Esus | E♭sus Dsus |
E♭sus F♯m7 | F♯m7 | C/G F | Cm11 |
B7sus | % | % | % |
% | % | % | % |
Csus C♯sus | F♯sus | Fsus Esus | E♭sus Dsus |
E♭sus F♯m7 | F♯m7 | D♭maj7♯11 | Cmaj7♯11 |
B7sus | % | B7sus | % |`,

`title: American Boy
by: Estelle - Kanye West
genre: Funk
feel: Disco
source: iReal Pro community chart
tempo: 120
key: E
form: Intro A A B B
[Intro]
G6/B | B/F♯ | Am9 | Am69 |
[A]
Emaj7 | Cmaj7 | Am | Am/D |
Emaj7 | Cmaj7 | Am7 | N.C. Fmaj7 |
[B]
Emaj7 | Cmaj7 | Am | Am/D |
Emaj7 | Cmaj7 | Am7 | Fmaj7 |`,

`title: Baby Love
by: The Supremes
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 140
key: C
[A]
C | C7/B♭ | A7 | Dm |
Dm | C | F | C |
F | C | F Em | Dm G7 |
[A2]
C | C7/B♭ | A7 | Dm |
Dm | C | F | C |
F | C | F Em | Dm G7 |
D♭ | % |
[A3]
D♭ | D♭7/C♭ | B♭7 | E♭m |
E♭m | D♭ | G♭ | D♭ |
G♭ | D♭ | G♭ Fm | E♭m A♭7 |
[A4]
D♭ | D♭7/C♭ | B♭7 | E♭m |
E♭m | D♭ | G♭ | D♭ |
G♭ | D♭ | G♭ Fm | E♭m A♭7 |
G♭ | D♭ | G♭ | D♭ |`,

`title: Babylon Sisters
by: Steely Dan
genre: Funk
feel: Funk Rock
source: iReal Pro community chart
tempo: 140
key: B♭m
[Intro]
F♯ | % | B | G♯7 |
E69 | G♯m7 | E♭sus | % |
F♯ | B | G♯ | B |
E69 | E A | E♭m | % |
E69 | E A | E♭sus | % |
B♭sus |
[A]
B♭m7 | Cm7 | E♭13 | % |
D♭maj7 | A♭13 | G♭69 | B♭m7 |
B♭m7 | Cm7 | Dm7 | B♭m7 |
% | Cm7 | E♭/F | B♭maj7 |
E7♯11 | E♭69 | A7♯5 | Dm |
Dm7 | E♭69 | % | Dm |
Dm7 | E♭69 | % | C9 |
F9 | B♭maj7 | B♭7 E♭ | Dm |
C9 | E♭69 | % | B/E F♯/E |
C♯/F♯ B♭7 | E♭m7 | D♭69 | Bmaj7 |
E A | E♭m | % | E♭m |
E♭m | B♭m |
[A2]
B♭m7 | Cm7 | E♭13 | % |
D♭maj7 | A♭13 | G♭69 | B♭m7 |
B♭m7 | Cm7 | Dm7 | B♭m7 |
% | Cm7 | E♭/F | B♭maj7 |
E7♯11 | E♭69 | A7♯5 | Dm |
Dm7 | E♭69 | % | Dm |
Dm7 | E♭69 | % | C9 |
F9 | B♭maj7 | B♭7 E♭ | Dm |
C9 | E♭69 | % | B/E F♯/E |
C♯/F♯ B♭7 | E♭m7 | D♭69 | Bmaj7 |
E F | Dm | Dm7 | G/F |
E♭ | Dm | Dm7 | E♭69 |
A♭ | Dm | Dm7 | G/F |
E♭ | Dm | Dm7 | E♭69 |
A♭ | Dm | Dm7 | G/F |
E♭ |`,

`title: Bring It On Home To Me
by: Sam Cooke
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 69
key: C
time: 6/8
[Intro]
C | G7 | F | G |
C | F | C | G7 |
[A]
C | % | G | G7 |
C | C7 | F | % |
C | G7 | F | G |
C | F | C | G7 |
[A2]
C | % | G | G7 |
C | C7 | F | % |
C | G7 | F | G |
C | F | C | G7 |
C |`,

`title: Can't Get Enough Of Your Love, Babe
by: Barry White
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 113
key: F
form: Intro Intro2 A A B B2 A2 C A A3
[Intro]
B♭maj9 | % | Am7 | % |
[Intro2]
B♭maj9 | % | Am7 | % |
B♭maj9 | B♭/C | % | B♭/C |
% |
[A]
F Fmaj7 | B♭maj7 B♭/C | F Fmaj7 | B♭maj7 B♭/C |
F Fmaj7 | B♭maj7 B♭/C | F Fmaj7 | B♭maj7 B♭/C |
[B]
B♭maj9 | % | Am7 | Dm7 |
[B2]
B♭maj9 | % | Am7 | Dm7 |
B♭maj9 | % | B♭maj7/C | % |
B♭maj7/C | % |
[A2]
F Fmaj7 | B♭maj7 B♭/C | F Fmaj7 | B♭maj7 B♭/C |
[C]
B♭maj9 | % | Am7 | % |
B♭maj9 | % | Am7 | Dm7 |
Gm7 | B♭/C | Gm7 | B♭/C |
Gm7 | B♭/C | Gm7 | B♭/C |
[A3]
F Fmaj7 | B♭maj7 B♭/C | F Fmaj7 | B♭maj7 B♭/C |
F Fmaj7 | B♭maj7 B♭/C | F Fmaj7 | B♭maj7 B♭/C |
F |`,

`title: Chain Of Fools
by: Aretha Franklin
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 110
key: Cm
form: Intro B B A A B A A C C2 B B A A B2 B2
[Intro]
C7 | % |
[B]
Cm Dm/C | Cm | Cm Dm/C | Cm |
[A]
Cm | % | Cm | % |
[C]
Cm N.C. | N.C. | N.C. | N.C. |
[C2]
Cm N.C. | N.C. | N.C. | N.C. |
Cm N.C. | N.C. |
[B2]
Cm Dm/G | Cm | Cm Dm/C | Cm |`,

`title: Change Is Gonna Come
by: Sam Cooke
genre: Funk
feel: Soul Ballad
source: iReal Pro community chart
tempo: 63
key: B♭
time: 1/2
form: A A B A2
[A]
B♭ | % | Cm7 | Gm7 |
B♭ | Cm E♭7 D7 | Gm7 | B♭ |
[B]
Cm7 | B♭ | Cm7 | Gm |
Cm7 | Gm | Cm9 | F7 |
[A2]
B♭ | % | Cm7 | Gm7 |
B♭ | Cm7 E♭7 D7 | Gm | B♭ |
B♭ |`,

`title: For Once In My Life
by: Stevie Wonder
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 110
key: F
form: Intro Intro A B A2 C A3 B2 A4 C2
[Intro]
F | % |
[A]
F F+ | F6 D7♭9/F♯ | Gm D7 | Gm D7 |
Gm Gm(maj7) | Gm7 C7 | F C7♯9 | F C7 |
[B]
F | F7♯5 | B♭maj7 | B♭6 |
Am7 | Dm7 | Gm Am | B♭ C7 |
[A2]
F F+ | F6 D7♭9/F♯ | Gm D7 | Gm D7 |
Gm Gm(maj7) | Gm7 C7 | Fmaj7 F6 | F7 |
[C]
F | F7♯5 | B♭maj7 | G7 |
F/C Dm7 | Gm7 C7 | F6 E♭ | D♭maj7 C13 |
G♭6 E | Dmaj7 D♭13 |
[A3]
G♭ G♭+ | G♭6 E♭7♭9/G | A♭m E♭7 | A♭m E♭7 |
A♭m A♭m(maj7) | A♭m7 D♭7 | G♭ D♭7♯9 | G♭ |
[B2]
G♭ | G♭+ | Bmaj7 | B6 |
B♭m | E♭m | A♭m B♭m | B D♭7 |
[A4]
G♭ G♭+ | G♭6 E♭7♭9/G | A♭m E♭7 | A♭m E♭7 |
A♭m A♭m(maj7) | A♭m7 D♭7 | G♭maj7 G♭6 | G♭7 |
[C2]
G♭ | G♭7♯5 | Bmaj7 | A♭7 |
G♭/D♭ E♭m | A♭m D♭7 | G♭6 E | Dmaj7 D♭13 |
G♭6 E | Dmaj7 D♭13 | G♭6 E | Dmaj7 D♭13 |
G♭6 E | Dmaj7 D♭13 |`,

`title: Give Me The Night
by: George Benson
genre: Funk
feel: Funk Jazz
source: iReal Pro community chart
tempo: 108
key: Fm
form: Intro Intro A B A B C B2 A B C B3 C2 C3 D D
[Intro]
Fm9 B♭m7 | Cm7 D♭maj7 | Fm9 B♭m7 | Cm7 D♭maj7 |
[A]
Fm9 B♭m7 | Cm7 D♭maj7 | Fm9 B♭m7 | Cm7 D♭maj7 |
Fm9 B♭m7 | Cm7 D♭maj7 | Fm9 B♭m7 | Cm7 D♭maj7 |
B♭m7 | E♭11 |
[B]
Fm7 B♭m7 | Cm7 D♭maj7 | Fm9 B♭m7 | Cm7 D♭maj7 |
[C]
A♭m7 G♭ | E♭m7 D♭ | A♭m7 G♭ | E♭m7 D♭ |
A♭m7 G♭ | E♭m7 D♭ | A♭m7 G♭ | Emaj7 |
D♭7 | Emaj7 | E♭11 |
[B2]
Fm7 B♭m7 | Cm7 D♭maj7 | Fm7 B♭m7 | Cm7 D♭maj7 |
[B3]
Fm7 B♭m7 | Cm7 D♭maj7 | Fm7 B♭m7 | Cm7 D♭maj7 |
Fm7 B♭m7 | Cm7 D♭maj7 |
[C2]
A♭m7 G♭ | E♭m7 D♭ |
[C3]
A♭m7 G♭ | E♭m7 D♭ | A♭m7 G♭ | Emaj7 |
D♭7 | Emaj7 | E♭11 | N.C. |
N.C. | N.C. | N.C. | N.C. |
N.C. | N.C. | N.C. |
[D]
Fm7 B♭m7 | Cm7 D♭maj7 | Fm9 B♭m7 | Cm7 D♭maj7 |`,

`title: Higher And Higher (Your Love Keeps Lifting Me)
by: Jackie Wilson
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 93
key: D
form: Intro A B A B C B B
[Intro]
D | % | D | G/D |
Em7/D | D |
[A]
D | G/D | Em7/D | D |
D | G/D | Em7/D | D |
[B]
D | G/D | Em7/D | D |
D | G/D | Em7/D | D |
[C]
D | G/D | Em7/D | D |
D | G/D | Em7/D | D |`,

`title: Hit The Road Jack
by: Ray Charles
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 168
key: G♯m
form: Intro B B A B B C
[Intro]
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
[B]
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
[A]
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
[C]
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
G♯m F♯ | E D♯7 | G♯m F♯ | E D♯7 |
C♯7 |`,

`title: Hot Stuff
by: Donna Summer
genre: Funk
feel: Disco
source: iReal Pro community chart
tempo: 119
key: Gm
form: Intro Intro A B C A B C2 D D2 B2 B2
[Intro]
Gm | % | F | Gm |
[A]
Gm | % | F | Gm |
Gm | % | F | Gm |
[B]
Cm D | Gm | Cm D | Gm |
Cm D | Gm | Cm | D5 |
[C]
Gm B♭ C | C5 D5 | Gm B♭ C | C5 D5 |
Gm B♭ C | C5 D5 | Gm B♭ C | C5 D5 |
Gm | % | F | Gm |
Gm | % | F | Gm |
[C2]
Gm B♭ C | C5 D5 | Gm B♭ C | C5 D5 |
Gm B♭ C | C5 D5 | Gm B♭ C | C5 D5 |
[D]
Gm | % | E♭/G | % |
F/G | % | Gm | % |
[D2]
Gm | % | E♭/G | % |
F/G | % | Gm | % |
Gm | Gm G♭m Gm | F | Gm |
Gm | Gm G♭m Gm | F | Gm |
[B2]
Cm D | Gm | Cm D | Gm |`,

`title: How Sweet It Is To Be Loved By You
by: Marvin Gaye
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 115
key: C
form: B A C B A C B2 B2 A2 C B2 A2 C B2 B2
[B]
F | G | C | % |
F | G | C | % |
[A]
C | Am | G7 | F7 |
C | Am | G7 | F7 |
[C]
C7 | F7 | C7 | F7 |
C7 | F7 | C7 | F7 |
[B2]
F | G | C | % |
[A2]
C | Am | G7 | F7 |`,

`title: I Believe I Can Fly
by: R. Kelly
genre: Funk
feel: Soul Ballad
source: iReal Pro community chart
tempo: 63
key: C
form: A B A B2 C
[A]
C | Fm6 | C | Fm6 |
C | Fm6 | C | Fm6 E7 |
Am7 | Fm6/A♭ | C/G | F/G G |
[B]
C | Am7 | Dm7 | Fmaj7/G E/G♯ |
Am7 | Fm6/A♭ | C/G | Fm6 |
Am7 | Fmaj7/G |
[B2]
C | Am7 | Dm7 | Fmaj7/G E/G♯ |
Am7 | Fm6/A♭ | C/G | Fm6 |
Am7 | Dm7 | C/E | F/G F7 |
[C]
B♭m7 | G♭m6/A | D♭/A♭ | G♭/A♭ A♭ |
D♭ | B♭m7 | E♭m7 | G♭maj7/A♭ F/A |
B♭m7 | G♭m6/A | D♭/A♭ | G♭m6/A |
D♭/A♭ | G♭m6/A | D♭/A♭ | D♭ |`,

`title: I Got A Woman
by: Ray Charles-Renald Richard
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 190
key: A
form: A B A2 A B A2 C D D2
[A]
A | % | E7 | % |
A | D7 | A | A7 |
[B]
D7 | % | D7 | % |
E7 | % | E7 | % |
A7 | % | A7 | % |
D7 | % | D7 | % |
[A2]
A | % | E7 | % |
A | D7 | A | E7 |
[C]
A6 | % | A6 | % |
A6 | % | E7 | % |
A | A7/G | D7/F♯ | F |
A/E A/F♯ | Bm7 E7 | A | A A/E A/F♯ A/G♯ |
[D]
A7 N.C. | N.C. B♭7 | A7 N.C. | N.C. B♭7 |
A7 N.C. | N.C. B♭7 | A7 N.C. | N.C. B♭7 |
[D2]
A7 N.C. | N.C. B♭7 | A7 N.C. | N.C. B♭7 |
A7 N.C. | N.C. B♭7 | A7 N.C. | N.C. B♭7 |
A | % | A | % |`,

`title: I Heard It Through The Grapevine
by: Marvin Gaye
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 117
key: E♭m
form: Intro Intro2 A B C A B C2
[Intro]
E♭5 E♭m7 E♭5 | E♭5 E♭m7 A♭/E♭ |
[Intro2]
E♭5 E♭m7 E♭5 | E♭5 E♭m7 A♭/E♭ | E♭m7 A♭/E♭ E♭m | E♭m7 A♭/E♭ |
E♭m7 A♭/E♭ E♭m | E♭m7 A♭/E♭ |
[A]
E♭m7 A♭/E♭ E♭m | E♭m7 A♭/E♭ | B♭7 | A♭9 |
E♭m7 A♭/E♭ E♭m | E♭m7 A♭/E♭ | B♭7 | A♭9 |
[B]
Cm7 | A♭7 | E♭7 | A♭7 |
[C]
E♭7 A♭7 E♭7 | E♭7 | A♭7 | % |
E♭7 A♭7 E♭7 | E♭7 | A♭7 | % |
E♭5 E♭m7 E♭5 | E♭5 E♭m7 A♭/E♭ | E♭5 E♭m7 E♭5 | E♭5 E♭m7 A♭/E♭ |
[C2]
E♭7 A♭7 E♭7 | E♭7 | A♭7 | % |
E♭7 A♭7 E♭7 | E♭7 | A♭7 | % |
E♭5 E♭m7 E♭5 | E♭5 E♭m7 A♭/E♭ | E♭5 E♭m7 E♭5 | E♭5 E♭m7 A♭/E♭ |
E♭m7 A♭/E♭ E♭m | E♭m7 A♭/E♭ | E♭m7 A♭/E♭ E♭m | E♭m7 A♭/E♭ |
E♭m E♭m/G♭ E♭m/E♭ | E♭m | E♭m E♭m/G♭ E♭m/E♭ | E♭m |`,

`title: I Will Survive
by: Gloria Gaynor
genre: Funk
feel: Disco
source: iReal Pro community chart
tempo: 117
key: Am
form: Intro A A B B C A A B B2 B B C A A B B2 B B C C B B
[Intro]
E7♭13 |
[A]
Am7 | Dm7 | G | Cmaj7 |
Fmaj7 | Dm/B | Esus | E |
[B]
Am7 | Dm7 | G | Cmaj7 |
Fmaj7 | Dm/B | Esus | E |
[C]
Am7 | Dm7 | G | Cmaj7 |
Fmaj7 | Dm/B | Esus | E |
[B2]
Am7 | Dm7 | G | Cmaj7 |
Fmaj7 | Dm/B | Esus | E |
Am7 | % | Am7 | % |`,

`title: I Wish
by: Stevie Wonder
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 97
key: E♭m
form: Intro Intro A B A B C
[Intro]
E♭m7 A♭ | % | E♭m7 A♭ | % |
[A]
E♭m7 A♭ | % | E♭m7 A♭ | % |
E♭m7 A♭ | % | E♭m7 A♭ | % |
[B]
B♭7 C7 | Fm7 A♭m6 | B♭7 C7 | Fm7 B♭7 |
[C]
E♭m7 A♭ | % | E♭m7 A♭ | % |
E♭m7 A♭ | % | E♭m7 A♭ | % |
E♭m7 | % | E♭m7 | % |
E♭m7 A♭ | % | E♭m7 A♭ | % |
E♭m7 A♭ | % | E♭m7 A♭ | % |`,

`title: The In Crowd
by: Dobie Gray
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 118
key: A
form: Intro A B A B C C
[Intro]
A | G/A | A | G/A |
[A]
A | G/A | A | G/A |
A | G/A | A | G/A |
[B]
D | % | D | A |
A | C♯7 | % | F♯m |
F♯m | Bm | % | E |
E G | G | % |
[C]
A | G/A | A | G/A |`,

`title: In The Midnight Hour
by: Wilson Pickett
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 114
key: E
form: Intro A B A B C D D
[Intro]
D7 | B7 | A7 | G7 |
E7 A7 | E7 A7 |
[A]
E7 A7 | E7 A7 | E7 A7 | E7 A7 |
E7 A7 | E7 A7 | E7 A7 | E7 A7 |
[B]
B7 | A7 | B7 | A7 |
E7 A7 | E7 A7 | E7 A7 | D7 |
B7 |
[C]
E7 A7 | E7 A7 | E7 D7 | B7 |
E7 A7 | E7 A7 | E7 A7 | B7 |
[D]
E7 A7 | E7 A7 |`,

`title: It's A Man's World
by: James Brown
genre: Funk
feel: Soul Ballad
source: iReal Pro community chart
tempo: 58
key: E♭m
time: 6/8
form: Intro B A C A C2
[Intro]
E♭m E♭m/F | G♭ G♭/A♭ | B♭7 | D♭ |
[B]
E♭m | B♭m7 | E♭m | B♭m7 |
A♭m7 | % | B♭7 | % |
E♭m | B♭m7 | E♭m | B♭m7 |
[A]
E♭m | B♭m7 | E♭m | B♭m7 |
E♭m | B♭m7 | E♭m | B♭m7 |
E♭m | B♭m7 | E♭m | B♭m7 |
E♭m | B♭m7 | E♭m | B♭m7 |
[C]
A♭m7 | % | B♭7 | % |
E♭m | B♭m7 | E♭m | B♭m7 |
[C2]
A♭m7 | % | B♭7 | % |
E♭m | B♭m7 | E♭m | B♭m7 |
E♭m7 | B♭m7 | E♭m7 | B♭m7 |
E♭m7 | B♭m7 | E♭m7 | B♭m7 |`,

`title: Knock On Wood
by: Eddie Floyd
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 108
key: E
form: Intro A Intro A B
[Intro]
E7 G | A7 | B7 D | B7 |
[A]
A7 | % | A7 | % |
E7 | % | E7 | % |
A7 | % | A7 | % |
E7 | A7 | E7 | A7 |
E7 |
[B]
E7 G | A7 | B7 D | B7 |
F♯7 | G♯7 | A7 | C7 B7 |
E7 G | A7 | B7 D | B A G |
E7 | A7 | E7 | A7 |
E7 | A7 | E7 | A7 |`,

`title: Let's Get It On
by: Marvin Gaye
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 87
key: E♭
form: Intro Intro B B A A C C D B B C C D A A
[Intro]
E♭ Gm | A♭ B♭7 | E♭ Gm | A♭ B♭7 |
[B]
E♭ Gm | A♭ B♭7 | E♭ Gm | A♭ B♭7 |
[A]
E♭ Gm | A♭ B♭7 | E♭ Gm | A♭ B♭7 |
[C]
A♭7 | % | E♭ Gm | A♭ B♭7 |
[D]
A♭7 | F7 | B♭7 | % |`,

`title: Let's Groove
by: Earth, Wind & Fire
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 120
key: Em
form: Intro Intro B B A A B B A A B B C D D
[Intro]
Em7 Em7/A Em7/G | F♯m7 Bm7 | Em7 Em7/A Em7/G | F♯m7 Bm7 |
[B]
Em7 Em7/A Em7/G | F♯m7 Bm7 | Em7 Em7/A Em7/G | F♯m7 Bm7 |
[A]
Em7 Em7/A Em7/G | F♯m7 Bm7 | Em7 Em7/A Em7/G | F♯m7 Bm7 |
[C]
Am7 | Bm7 Em7 | Am7 | Bm7 Em7 |
Cm7 | Dm7 Gm7 | F♯7♯9♭5 | B7♯9 |
[D]
Em7 Em7/A Em7/G | F♯m7 Bm7 | Em7 Em7/A Em7/G | F♯m7 Bm7 |`,

`title: Let's Stay Together
by: Al Green
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 97
key: F
form: Intro A A B C
[Intro]
Gm9 Am7 | Gm7 Am7 | Gm9 Am7 | Gm7 C7 |
[A]
F B♭/F | F | Am7 | % |
B♭ | % | B♭m9/D♭ | % |
Am7 Gm7 | Fmaj7 Em | Dm9 | D9 |
Am7 Gm7 | Fmaj7 Am7 | Dm9 | D9 |
[B]
Gm9 | % | Am7 | % |
Gm9 | % | B♭maj7 Am7 | Dm7 C |
[C]
Gm9 | Gm9 Gm | A♭maj7 | Gm9 |
A♭ | % | B♭maj7 Am7 | Dm7 C |
Gm9 | % | Am7 | % |
Gm9 | % | Gm9 Am7 | Gm7 C |
Gm9 | % | Am7 | % |
Gm9 | % | Gm9 Am7 | Gm7 C |`,

`title: Long Train Runnin'
by: The Doobie Brothers
genre: Funk
feel: Funk Rock
source: iReal Pro community chart
tempo: 115
key: Gm
form: Intro Intro A A B C B D
[Intro]
Gm7 | % | Gm7 | % |
[A]
Gm7 | % | Gm7 | % |
Cm7 | % | Gm7 | % |
E♭ | D7sus D7 | Gm7 | % |
[B]
Gm7 N.C. Gm | % | Gm7 N.C. Gm | Gm7 |
Cm7 | % | Gm7 | % |
E♭ | D7sus D7 | Gm7 | % |
[C]
Gm7 | % | Gm7 | % |
Cm7 | % | Gm7 | % |
E♭ | D7sus D7 | Gm7 | % |
[D]
Gm7 | % | Gm7 | % |
Cm7 | % | Gm7 | % |
E♭ | D7sus D7 | Cm7 | % |
Gm7 | % | Gm7 | % |
Gm7 | % | Gm7 | % |`,

`title: Midnight Train To Georgia
by: Gladys Knight and The Pips
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 92
key: D♭
form: Intro A A B C A A B C B2
[Intro]
D♭ A♭/C | G♭/B♭ G♭/A♭ | D♭ A♭/C | G♭/B♭ G♭/A♭ |
[A]
D♭ Fm7 | G♭/B♭ A♭sus | D♭ Fm7 | G♭/B♭ A♭ |
D♭ Fm7 | G♭/B♭ E♭9 | G♭/A♭ | % |
[B]
D♭ Fm | G♭/E♭ G♭/A♭ | D♭ Fm | G♭/E♭ G♭/A♭ |
D♭ Fm | B♭m7 B♭m7/E♭ | G♭/A♭ | % |
[C]
D♭ Fm | G♭/E♭ A♭7sus | B♭m7 | E♭9 |
G♭ | A♭7sus | D♭ A♭/C | G♭/B♭ G♭/A♭ |
[B2]
D♭ Fm | G♭/E♭ G♭/A♭ | D♭ Fm | G♭/E♭ G♭/A♭ |
D♭ Fm | B♭m7 B♭m7/E♭ | G♭/A♭ | % |
D♭ A♭/C | G♭/B♭ G♭/A♭ | D♭ Fm | G♭/E♭ G♭/A♭ |
D♭ A♭/C | G♭/B♭ G♭/A♭ | D♭ Fm | G♭/E♭ G♭/A♭ |`,

`title: My Girl
by: The Temptations
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 106
key: C
form: Intro A B A B2 C A2 A2 B3
[Intro]
C | % | C | % |
[A]
C | F | C | F |
C | F | C | F |
[B]
C Dm7 | F G7 | C Dm7 | F G7 |
C | % | Dm7 | Gsus G7 |
[B2]
C Dm7 | F G7 | C Dm7 | F G7 |
C | % | Dm7 | Gsus G7 |
C | % | C | % |
[C]
C | F | C | F |
Dm7 | G7 | Em7 | A7 |
[A2]
D | G | D | G |
[B3]
D Em7 | G A7 | D Em7 | G A7 |
D | % | Em7 | Asus A7 |
D | % | Em7 | Asus A7 |`,

`title: Night Fever
by: Bee Gees
genre: Funk
feel: Disco
source: iReal Pro community chart
tempo: 108
key: E
form: Intro Intro A B C C D C C2
[Intro]
C♯m7 | F♯m7 | Emaj7 | F♯m7 |
[A]
B | Aadd9 | E | B |
B | C♯m7 | E Aadd9 | B |
[B]
G♯m7 | A | G♯m7 | D♯m |
G♯m7 | C♯m7 G♯ |
[C]
C♯m7 | F♯m7 | Emaj7 | F♯m7 |
[D]
F♯ | C♯m | F♯ | C♯m |
F♯ C♯m | % | F♯ | C♯ |
[C2]
C♯m7 | F♯m7 | Emaj7 | F♯m7 |
C♯m7 | F♯m7 | Emaj7 | F♯m7 |
C♯m7 | F♯m7 | Emaj7 | F♯m7 |`,

`title: One Day I'll Fly Away
by: Randy Crawford
genre: Funk
feel: Soul Ballad
source: iReal Pro community chart
tempo: 77
key: D
form: Intro Intro A B A B2 C C2 B3
[Intro]
D Gm6/D | D | Gm6/D | D |
[A]
D Gm6/D | D | Gm6/D | D |
D Gm6/D | D | Gm6/D | D |
[B]
D Gm6/D | D | A/B Bm7 | Em7 A7 |
Dm7 Dm7/C | G9sus Gm7 | B♭/C C7 C°7 C7 | B♭m6/F F |
[B2]
D Gm6/D | D | A/B Bm7 | Em7 A7 |
Dm7 Dm7/C | G9sus Gm7 | B♭/C C7 C°7 C7 | B♭m6 B♭m6/C B♭m6/D♭ B♭m6/E♭ |
F A7/C♯ |
[C]
Dm | Gm11 C7 | C♯°7 Dm | B♭ A7 |
Dm Dm/C |
[C2]
B♭ E♭m6/B♭ | B♭6 B♭+ | Cm/B♭ E♭m6/G♭ | Gm |
D/F♯ E♭9 | F | B♭m6/F | B♭m6 B♭m6/C B♭m6/D♭ B♭m6/E♭ |
F A7/C♯ |
[B3]
D Gm6/D | D | A/B Bm7 | Em7 A7 |
Dm7 Dm7/C | G9sus Gm7 | B♭/C C7 C°7 C7 | B♭m6 B♭m6/C B♭m6/D♭ B♭m6/E♭ |
D Gm6/D | D | Gm6/D | D |
D Gm6/D | D | Gm6/D | D |`,

`title: Papa Was A Rollin' Stone
by: The Temptations
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 117
key: B♭m
form: Intro Intro A A B B C C2
[Intro]
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
[A]
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
[B]
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
[C]
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
[C2]
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |
B♭m | N.C. D♭5 D♭5/A♭ | B♭m | % |`,

`title: Papa's Got A Brand New Bag
by: James Brown
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 126
key: E
form: Intro A A B B A A2
[Intro]
N.C. B7 | B7 |
[A]
E7 E9 | E9 | E7 E9 | E9 |
A9 A13 | A9 | E7 E9 | E9 |
B7 | A7 N.C. | E7 E9 | N.C. B7 |
[B]
E9 | % | E9 | % |
[A2]
E7 E9 | E9 | E7 E9 | E9 |
A9 A13 | A9 | E7 E9 | E9 |
B7 | A7 N.C. | E7 E9 | N.C. B7 |
E9 | % | E9 | % |`,

`title: People Make The World Go Round
by: The Stylistics
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 84
key: Em
time: 5/4
form: Intro A B A B A B2
[Intro]
Em | % | Em11 | % |
[A]
Em9 | % | Dm7 Am7 | Em9 |
% | Em9 | % | Dm7 Am7 |
Em9 | % |
[B]
Am7 Bm | Am7 | Fmaj7 | Fmaj7 |
Am7 Bm | Am7 | F♯m7♭5 | B7 N.C. |
Am7 | Em9 | % |
[B2]
Am7 Bm | Am7 | Fmaj7 | Fmaj7 |
Am7 Bm | Am7 | F♯m7♭5 | B7 N.C. |
Am7 | Em9 | % | Em9 |
A7 Am | Em9 | A7 Am |`,

`title: Piece of my heart
by: Janis Joplin
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 85
key: E
form: Intro A B C A B C2 D D2
[Intro]
F♯m | A B7 | C♯m7 | B7 |
D | B | B7 | % |
[A]
E A | B7 A | E A | B7 A |
E A | B7 |
[B]
C♯m7 | B7 | D | B |
B7 | % |
[C]
E A | B7 A | E A | B7 A |
E A | B7 A♯ | A | A F♯m E |
E A | B7 A |
[C2]
E A | B7 A | E A | B7 A |
E A | B7 A♯ | A | A F♯m E |
F♯m | A B7 | F♯m | A B7 |
[D]
E A | B7 A | E A | B7 A |
E A | B7 A♯ | A | % |
[D2]
E A | B7 A | E A | B7 A |
E A | B7 A♯ | A | A F♯m E |
F♯m | A B7 | F♯m |`,

`title: Respect
by: Aretha Franklin
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 112
key: C
form: Intro A A B
[Intro]
C7 | F7 | C7 | F7 |
[A]
G7 | F7 | G7 | F7 |
G7 | F7 | C7 | F7 |
C7 | F7 |
[B]
F♯m7 | % | B7 | % |
F♯m7 | % | G7 | % |
C7 | F7 | C7 | F7 |
C7 | F7 | C7 | F7 |`,

`title: Ribbon In The Sky
by: Stevie Wonder
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 70
key: E♭m
form: Intro Intro2 A A2 B B2 C C2 C C3 D D D2 D3
[Intro]
E♭m7 | Fm7 B♭7sus | E♭m7 | Fm7 B♭7sus |
[Intro2]
E♭m7 | Fm7 B♭7sus | E♭m7 | Fm7 B♭7sus |
E♭m7 | Fm7 B♭7sus | E♭m7 E♭m7/G♭ A♭7sus | Bmaj9 A♭7sus |
[A]
E♭m7 | Fm7 B♭7sus | E♭m7 | Fm7 B♭7sus |
E♭m7 | Fm B♭sus | E♭m7 E♭m7/G♭ A♭7sus | Bmaj9 A♭7sus |
[A2]
E♭m7 | Fm7 B♭7sus | E♭m7 | Fm7 B♭7sus |
E♭m7 | Fm B♭sus | E♭m7 E♭m7/G♭ A♭7sus | D♭ |
A7♯11 A7sus |
[B]
Em7 | F♯m7 B7sus |
[B2]
Em7 | F♯m7 B7sus | Em7 Em7/G A7sus | A7sus B♭7sus |
[C]
Fm7 | Gm7 C7sus |
[C2]
Fm7 | Gm7 C7sus | Fm7 Fm7/A B♭7sus | Gm7♭5 C7 |
Fm7 Fm7/A B♭7sus |
[C3]
Fm7 | Gm7 C7sus | Fm7 Fm7/A B♭7sus | D♭maj9 B♭7sus |
[D]
Fm7 | Gm7 C7sus | Fm7 | Gm7 C7sus |
Fm7 | Gm7 C7sus | Fm7 Fm7/A B♭7sus | D♭maj9 B♭7sus |
[D2]
Fm7 | Gm7 C7sus |
[D3]
Fm7 | Gm7 C7sus | Fm7 Fm7/A B♭7sus | D♭maj9 |`,

`title: Rock With  You
by: Michael Jackson
genre: Funk
feel: Disco
source: iReal Pro community chart
tempo: 113
key: E♭m
form: A B B2 C A C2 D D
[A]
E♭m9 | A♭/B♭ B♭ | E♭m9 | A♭/B♭ B/C♯ |
E♭m9 | A♭/B♭ B♭ | G♭/A♭ A♭ | G♭/A♭ A♭ |
[B]
E♭m9 | G♭/A♭ | A♭/B♭ | % |
[B2]
E♭m9 | G♭/A♭ | A♭/B♭ | % |
G♭maj7 | Fm7 | Bmaj7 | G♭/A♭ |
[C]
E♭m7 Fm7 G♭maj7 | N.C. | E♭m7 Fm7 G♭maj7 E♭/G | A♭ |
[C2]
B♭m7 | % | E♭9 | % |
G♭maj7 | Fm7 | Bmaj7 | G♭/A♭ |
E♭m9 | A♭/B♭ B♭ | E♭m9 | A♭/B♭ B/C♯ |
E♭m9 | A♭/B♭ B♭/C B/C♯ | B/C♯ | C/D |
[D]
Em9 | A/B B | Em9 | A/B C/D |
Em9 | A/B B | G/A A | G/A A |`,

`title: Save The Last Dance For Me
by: The Drifters
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 136
key: E
form: Intro A A2 B A2 B2
[Intro]
E | % |
[A]
E | % | E | B7 |
B7 | % | B7 | % |
E | E7 | A | % |
E | % | B7 | % |
E |
[A2]
E | % | E | B7 |
% | B7 | B7 | % |
E | E7 | A | % |
E | % | B7 | % |
E | % |
[B]
B7 | % | E | % |
B7 | % | E | % |
[B2]
B7 | % | E | % |
B7 | % | E | E7 |
A | % | E | % |
B7 | % | E | % |
B7 | % |`,

`title: Sitting On The Dock Of The Bay
by: Otis Redding
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 100
key: G
form: Intro A B A B C
[Intro]
G | % | G | % |
[A]
G | B | C | A7 |
G | B | C | A7 |
[B]
G | Eadd9 | G | Eadd9 |
G | A | G | E7 |
[C]
G D | C C7 | G D | C C7 |
G D | C G | F | D7 |
G | % | % | E7 |
G | % | % | E7 |`,

`title: So High
by: John Legend
genre: Funk
feel: Soul Ballad
source: iReal Pro community chart
tempo: 72
key: D
form: Intro A B A B C C D D2
[Intro]
D | G/A | D/F♯ | Em7 |
[A]
D | G/A | D/F♯ | Em7 |
D | G/A | D/F♯ | Em7 |
[B]
D | G/A | D/F♯ | Em7 |
D | G/A | D/F♯ | Em7 |
D | G/A | D/F♯ | Em7 |
[C]
D | G/A | D/F♯ | Em7 |
[D]
D/C | G/B | Gm/B♭ | D/A |
[D2]
D/C | G/B | Gm/B♭ | D/A |
D/C | G/B | Gm/B♭ | D |
D/C | G/B | Gm/B♭ | Dmaj7 |`,

`title: Son Of A Preacher Man
by: Dusty Springfield
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 92
key: E
[Intro]
E7 | % | E7 | % |
[A]
E7 | A7 E7 | E7 | B7 |
B7 | % | B7 |
[B]
E7 | A7 E7 | E7 | A7 E7 |
E7 B7 | A7 | E7 | % |
[A2]
E7 | A7 E7 | E7 | B7 |
B7 |
[B2]
E7 | A7 E7 | E7 | A7 E7 |
E7 B7 | A7 |
[C]
D7 | % | A7 | % |
B7 | % | E7 | % |
[D]
A7 | D7 A7 | A7 | D7 A7 |
A7 E7 | D7 | A7 | D7 A7 |
A7 | D7 A7 |`,

`title: Stand By Me
by: Ben E. King
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 110
key: A
form: Intro A A B A A B C C B B
[Intro]
A | % | F♯m | % |
D | E7 | A | % |
[A]
A | % | F♯m | % |
D | E7 | A | % |
[B]
A | % | F♯m | % |
D | E7 | A | % |
[C]
A | % | F♯m | % |
D | E7 | A | % |`,

`title: Stayin' Alive
by: Bee Gees
genre: Funk
feel: Disco
source: iReal Pro community chart
tempo: 103
key: Fm
form: Intro A B A B C C2
[Intro]
Fm7 | % | B♭7 | % |
Fm | % |
[A]
Fm7 | E♭ Fm | Fm7 | E♭ Fm |
B♭7 | % | B♭7 | % |
[B]
Fm7 Fm7/A♭ Fm Fm/E♭ | Fm7 Fm7/C | Fm7 Fm7/A♭ Fm Fm/E♭ | Fm7 Fm7/C |
A♭/F Gm/F Fm E♭/F | Fm7 Fm7/C | A♭/F Gm/F Fm E♭/F | Fm |
E♭/F | Fm | Cm7 | Fm7 |
% |
[C]
B♭7 | % | B♭7 | Fm7 |
% | B♭7 | % | B♭7 |
Fm7 | % |
[C2]
B♭7 | % | B♭7 | Fm7 |
% | % | B♭7 | Fm7 |
% | Fm7 | % | B♭7 |
% | B♭7 | Fm7 | % |
B♭7 | % | Fm7 | % |
Fm7 | % | B♭7 | % |
Fm7 | % |`,

`title: Street Life
by: The Crusaders
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 112
key: A♭
form: A B C B C2 D
[A]
A♭maj7 E♭m6/G♭ | F7sus F7 | B♭m7 D♭m6/E | E♭7sus E♭7 |
A♭maj7 A♭/G♭ | Fsus F13♭9 B♭13 B♭7♯5 | B♭m7 Fm7 | B♭m7 Fm7 |
D♭maj7 Dm7♭5 E♭9sus | A♭7sus D♭maj7 G♭7sus C♭maj7 | B♭/C C♭/D♭ D♭/E♭ D/E | Fm7 |
B♭m7 | Fm7 | B♭m7 |
[B]
Fm7 | B♭m7 | Cm7 | Fm7 |
Fm7 | B♭m7 | Cm7 | Fm7 |
[C]
B♭m7 E♭9sus | Cm7 F7♯9 | B♭m7 E♭9sus | A♭maj7 |
A♭m7 D♭9sus | G♭ Gm7♭5 | B♭m E♭sus | A♭maj7 |
[C2]
B♭m7 E♭9sus | Cm7 F7♯9 | B♭m7 E♭9sus | A♭maj7 |
C♯m7 F♯sus Bmaj7 | Bm7 Esus Amaj7 | B♭m7 E♭9sus | A♭maj7 |
[D]
Emaj7 B7/D♯ | C♯m7 B13 | Emaj7 B7/D♯ | C♯m7 B13 |
Fmaj7 C7/E | Dm7 C13 | Fmaj7 C7/E | Dm7 |
B♭sus A♭ | B♭9sus | B♭sus A♭ | B♭9sus |
B♭sus A♭ | B♭9sus | B♭sus A♭ | B♭/C C♭/D♭ D♭/E♭ D/E |
F C7/E | Dm C7 | F C7/E | Dm C7 |
E B7/D♯ | C♯m B7 | E B7/D♯ | C♯m B7 |
F C7/E | Dm C7 | F C7/E | Dm7 |
B♭9sus A♭maj7 | B♭9sus | B♭9sus A♭maj7 | B♭9sus |
B♭9sus A♭maj7 | B♭9sus | B♭9sus A♭maj7 | B♭9sus |`,

`title: Sun Goddess
by: Earth, Wind and Fire-Ramsey Lewis
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 95
key: A
form: Intro Intro A A A2 B B A3
[Intro]
Dmaj7/E | % | Cmaj7/D | % |
[A]
Amaj7 | F♯m9 | G♯m11 | Amaj7/B B♭maj7/C |
E♭m11 G♯7♭9 | C♯m7 F♯7♭9 | Bm9 | F♯m9 |
Dmaj7/E | % |
[A2]
Amaj7 | F♯m9 | G♯m11 | Amaj7/B B♭maj7/C |
E♭m11 G♯7♭9 | C♯m7 F♯7♭9 | Bm9 | F♯m9 |
Dmaj7/E | % | Bm9 | F♯m9 |
Bm9 | F♯m9 | Dmaj7/E | % |
Dmaj7/E | % |
[B]
Dmaj7/E | % | Cmaj7/D | % |
[A3]
Amaj7 | F♯m9 | G♯m11 | Amaj7/B B♭maj7/C |
E♭m11 G♯7♭9 | C♯m7 F♯7♭9 | Bm9 | F♯m9 |
Bm9 | F♯m9 | Dmaj7/E | % |
Dmaj7/E | % | Dmaj7/E | % |
Cmaj7/D | % | Dmaj7/E | % |
Cmaj7/D | % |`,

`title: Tell Me Something Good
by: Rufus and Chaka Khan
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 75
key: A♭
form: Intro A A A B C C A A A B C C D D
[Intro]
A♭ G♭ Fm E♭m | D♭ B B♭m A♭ | G♭13 | % |
[A]
A♭ G♭ Fm E♭m | D♭ B B♭m A♭ | G♭13 | % |
[B]
B♭m Cm D♭ D♭/D | D♭/E♭ D♭/E D♭/F D♭/G♭ | A♭ N.C. | N.C. |
[C]
A♭ A♭/C Fm7 | B♭m7 D♭/E♭ | A♭ A♭/C Fm7 | B♭m7 D♭/E♭ |
[D]
A♭ A♭/C Fm7 | B♭m7 D♭/E♭ | A♭ A♭/C Fm7 | B♭m7 D♭/E♭ |`,

`title: That's The Way Of The World
by: Earth, Wind & Fire
genre: Funk
feel: Funk
source: iReal Pro community chart
tempo: 86
key: D♭
form: Intro Intro C C A A B D C2 C3
[Intro]
D♭maj7 | D♭11 | G♭6/D♭ | G♭m6/D♭ |
[C]
D♭maj7 | D♭11 | G♭6/D♭ | G♭m6/D♭ |
[A]
D♭maj7 | D♭11 | G♭6/D♭ | G♭m6/D♭ |
[B]
D♭maj7 | G7♭5 | G♭maj7 | Fm7 |
G♭maj7 | Fm7 | G♭maj7 | Fm7 B♭m7 |
E♭9 | A♭7sus |
[D]
D♭maj7 | G7♭5 | G♭maj13 | B9 B9/A |
D♭maj7/A♭ | D♭11 G7♭5 | G♭maj7 | Fm7 B♭m7 |
E♭m7 | A♭7sus | D♭maj7 | D♭11 |
G♭6/D♭ | G♭m6/D♭ |
[C2]
D♭maj7 | G7♭5 | G♭maj13 | B9 B9/A |
D♭maj7/A♭ | D♭11 G7♭5 | G♭maj7 | B9 B9/A |
D♭maj7/A♭ | D♭11 G7♭5 | G♭maj7 | B9 B9/A |
[C3]
D♭maj7 | G7♭5 | G♭maj13 | B9 B9/A |
D♭maj7/A♭ | D♭11 G7♭5 | G♭maj7 | B9 B9/A |
D♭maj7/A♭ | D♭11 G7♭5 | G♭maj7 | Fm7 B♭m7 |
E♭m7 | A♭7sus | D♭maj7/A♭ | D♭11 G7♭5 |
G♭maj13 | B9 B9/A | D♭maj7/A♭ | D♭11 G7♭5 |
G♭maj13 | B9 B9/A |`,

`title: Think
by: Aretha Franklin
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 106
key: B♭
form: Intro A A B A2 A2 C D D
[Intro]
B♭7♯9 B♭7 B♭sus | % | B♭7♯9 B♭7 B♭sus | % |
[A]
B♭7 | E♭7 B♭7 | B♭7 | E♭7 B♭7 |
B♭7 | E♭7 B♭7 | B♭7 | E♭7 B♭7 |
[B]
B♭7 | D♭7 | E♭7 | B♭7 |
B♭7 | D♭7 | E♭7 | B♭7 |
B7 Bsus | % |
[A2]
B7 | E7 B7 | B7 | E7 B7 |
B7 | E7 B7 | B7 | E7 B7 |
[C]
E7 | % | E7 | E7 A7 |
[D]
B7 | % | B7 | % |`,

`title: Warwick Avenue
by: Duffy
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 88
key: B♭
form: Intro A A2 B A A2 B2 C C2
[Intro]
B♭ | Dm7 | E♭ | G♭maj7 |
[A]
B♭ | Dm7 | E♭ | G♭maj7 |
B♭ | Dm7 | E♭ | G♭maj7 |
[A2]
B♭ | Dm7 | E♭ | G♭maj7 |
B♭ | Dm7 | A♭ | G♭ F |
[B]
B♭ Fm7 | D♭ E♭7 | Cm7 B♭7 | A♭ Gm7 |
Cm7 Gm7 | Fm7 | E♭ N.C. | Dm7 Dm7/C Gm7 |
Cm7 |
[B2]
B♭ Fm7 | D♭ E♭7 | Cm7 B♭7 | A♭ Gm7 |
Cm7 Gm7 | Fm7 | E♭ N.C. | Dm7 Dm7/C Gm7 |
Cm7 Fm7 | E♭ | B♭ |
[C]
Cm7 Cm7/B♭ | F/A | A♭maj7 Gm7 |
[C2]
Cm7 Cm7/B♭ | F/A | A♭maj7 Gm7 | Cm7 |
Fm7 | A♭ Gm7 | G♭ F | Cm7 Fm7 |
E♭ B♭ | Dm7 Dm7/C Gm7 | Cm7 Fm7 | E♭ B♭ |`,

`title: What'd I Say
by: Ray Charles
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 175
key: E
form: Intro A B B C A2 A2 B2
[Intro]
E7 | % | E7 | % |
A7/E | % | E7 | % |
B7/F♯ | A7/E | E7 | % |
[A]
E7 | % | E7 | % |
A7 | % | E7 | % |
B7 | A7 | E7 | E7 B7 |
[B]
E7 N.C. | N.C. | E7 N.C. | N.C. |
A7 | % | E7 | % |
B7 | A7 | E7 | E7 B7 |
[C]
N.C. | % | N.C. | % |
A7 | % | E7 | % |
B7 | A7 | E7 | E7 B7 |
[A2]
E7 N.C. | N.C. | E7 N.C. | N.C. |
A7 | % | E7 | % |
B7 | A7 | E7 | E7 B7 |
[B2]
E7 | % | E7 | % |
A7 | % | E7 | % |
B7 | A7 | E7 | E7 |`,

`title: What's Going On
by: Marvin Gaye
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 97
key: E
form: Intro A A B C C2 C C2
[Intro]
Emaj7 | % | Emaj7 | % |
[A]
Emaj7 | % | C♯m7 | % |
Emaj7 | % | C♯m7 | % |
F♯m7 | % | B7sus | B7 |
[B]
F♯m7 | B13 | F♯m7 | B13 |
F♯m7 | B13 | Emaj7 | C♯m7 |
Emaj7 | C♯m7 |
[C]
Am7 | % | Am7 | % |
[C2]
Am7 | % | Am7 | % |
B7sus | % | B7sus | % |`,

`title: Where Did Our Love Go
by: The Supremes
genre: Funk
feel: RnB
source: iReal Pro community chart
tempo: 138
key: C
form: A A A A B C
[A]
C | % | G | % |
Dm7 | % | G | Fadd9 |
[B]
C | % | G | % |
Dm7 | % | G | Fadd9 |
[C]
C | % | G | % |
Dm7 | % | G | Fadd9 |
C | % | G | % |
Dm7 | % | G | Fadd9 |
C | % | G | % |
Dm7 | % | G | Fadd9 |`,

`title: You Are The Sunshine Of My Life
by: Stevie Wonder
genre: Funk
feel: Soul
source: iReal Pro community chart
tempo: 127
key: B
form: Intro Intro A A B C C2 C2
[Intro]
Bmaj9 | % | F♯7♯5 | % |
[A]
B | F♯/E | D♯m7 | G♯13♭9 |
C♯m7 | F♯7sus | Badd9 | C♯m7 F♯7sus |
[B]
Bmaj9 | E6 F♯7sus | Bmaj9 | E6 F♯7sus |
Bmaj9 | E6 F♯7sus | A♯m7♭5 | D♯7alt |
[C]
G♯maj7 | C♯6 D♯7sus | G♯m7 | % |
C♯7 | C♯9 | F♯7sus | % |
F♯7sus | G7sus |
[C2]
C | G/F | Em7 | A13♭9 |
Dm7 | G7sus | Cadd9 | Dm7 G7sus |`
];
