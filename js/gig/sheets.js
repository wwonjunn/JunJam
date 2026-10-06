/* Gig: the built-in lead sheets. Chord changes only: no melodies, no lyrics.
   Each chart is plain text in the same format you can paste in yourself (see GIG_FORMAT_HELP in session.js):
   a few "name: value" lines, then [Section] headings with bars between | bars |. Two chords in a bar share it;
   % repeats the bar before. "form:" says the order the sections are played in (default: as written).
   check: 1 marks a chart written from memory that's worth checking against a chart you trust (Edit fixes it).
   Standards are the common jam-session changes; your band's chart may differ in places. */
const GIG_SHEETS=[
/* ---------------- Jazz standards ---------------- */
`title: Autumn Leaves
by: Joseph Kosma
genre: Jazz
feel: Medium swing
tempo: 132
key: Gm
form: A A B
[A]
Cm7 | F7 | B♭maj7 | E♭maj7 |
Am7♭5 | D7 | Gm6 | Gm6 |
[B]
Am7♭5 | D7 | Gm6 | Gm6 |
Cm7 | F7 | B♭maj7 | E♭maj7 |
Am7♭5 | D7 | Gm7 C7 | Fm7 B♭7 |
Am7♭5 | D7 | Gm6 | Gm6 |`,

`title: Take the A Train
by: Billy Strayhorn
genre: Jazz
feel: Medium-up swing
tempo: 160
key: C
form: A A B A
[A]
C6 | C6 | D7♯11 | D7♯11 |
Dm7 | G7 | C6 | Dm7 G7 |
[B]
Fmaj7 | Fmaj7 | Fmaj7 | Fmaj7 |
D7 | D7 | Dm7 | G7 |`,

`title: Satin Doll
by: Duke Ellington, Billy Strayhorn
genre: Jazz
feel: Medium swing
tempo: 120
key: C
form: A A B A
[A]
Dm7 G7 | Dm7 G7 | Em7 A7 | Em7 A7 |
Am7 D7 | A♭m7 D♭7 | C6 | C6 |
[B]
Gm7 | C7 | Fmaj7 | Fmaj7 |
Am7 | D7 | Dm7 | G7 |`,

`title: All the Things You Are
by: Jerome Kern
genre: Jazz
feel: Medium swing
tempo: 144
key: A♭
[A1]
Fm7 | B♭m7 | E♭7 | A♭maj7 |
D♭maj7 | Dm7 G7 | Cmaj7 | Cmaj7 |
[A2]
Cm7 | Fm7 | B♭7 | E♭maj7 |
A♭maj7 | Am7 D7 | Gmaj7 | Gmaj7 |
[B]
Am7 | D7 | Gmaj7 | Gmaj7 |
F♯m7 | B7 | Emaj7 | C7♯5 |
[A3]
Fm7 | B♭m7 | E♭7 | A♭maj7 |
D♭maj7 | D♭m7 | Cm7 | B°7 |
B♭m7 | E♭7 | A♭maj7 | Gm7♭5 C7 |`,

`title: Fly Me to the Moon
by: Bart Howard
genre: Jazz
feel: Medium swing
tempo: 120
key: C
check: 1
form: A A
[A]
Am7 | Dm7 | G7 | Cmaj7 C7 |
Fmaj7 | Bm7♭5 | E7 | Am7 A7 |
Dm7 | G7 | Cmaj7 | Am7 |
Dm7 | G7 | Cmaj7 | Bm7♭5 E7 |`,

`title: So What
by: Miles Davis
genre: Jazz
feel: Modal, medium-up
tempo: 136
key: Dm
tags: Impressions uses the same form
form: A A B A
[A]
Dm7 | % | % | % |
% | % | % | % |
[B]
E♭m7 | % | % | % |
% | % | % | % |`,

`title: Solar
by: Miles Davis
genre: Jazz
feel: Medium swing
tempo: 160
key: Cm
[A]
Cm(maj7) | Cm7 | Gm7 | C7 |
Fmaj7 | Fmaj7 | Fm7 | B♭7 |
E♭maj7 | E♭m7 A♭7 | D♭maj7 | Dm7♭5 G7 |`,

`title: Lady Bird
by: Tadd Dameron
genre: Jazz
feel: Medium swing
tempo: 160
key: C
[A]
Cmaj7 | Cmaj7 | Fm7 | B♭7 |
Cmaj7 | Cmaj7 | B♭m7 | E♭7 |
A♭maj7 | A♭maj7 | Am7 | D7 |
Dm7 | G7 | Cmaj7 E♭7 | A♭maj7 D♭7 |`,

`title: Giant Steps
by: John Coltrane
genre: Jazz
feel: Up tempo (take it slow first)
tempo: 140
key: B
[A]
Bmaj7 D7 | Gmaj7 B♭7 | E♭maj7 | Am7 D7 |
Gmaj7 B♭7 | E♭maj7 F♯7 | Bmaj7 | Fm7 B♭7 |
E♭maj7 | Am7 D7 | Gmaj7 | C♯m7 F♯7 |
Bmaj7 | Fm7 B♭7 | E♭maj7 | C♯m7 F♯7 |`,

`title: Stella by Starlight
by: Victor Young
genre: Jazz
feel: Medium swing
tempo: 120
key: B♭
[A]
Em7♭5 | A7 | Cm7 | F7 |
Fm7 | B♭7 | E♭maj7 | A♭7 |
B♭maj7 | Em7♭5 A7 | Dm7 | B♭m7 E♭7 |
Fmaj7 | Em7♭5 A7 | Am7♭5 | D7 |
[B]
G7♯5 | G7 | Cm7 | Cm7 |
A♭7 | A♭7 | B♭maj7 | B♭maj7 |
Em7♭5 | A7 | Dm7♭5 | G7 |
Cm7♭5 | F7 | B♭maj7 | B♭maj7 |`,

`title: Misty
by: Erroll Garner
genre: Jazz
feel: Ballad
tempo: 66
key: E♭
form: A A B A
[A]
E♭maj7 | B♭m7 E♭7 | A♭maj7 | A♭m7 D♭7 |
E♭maj7 Cm7 | Fm7 B♭7 | Gm7 C7 | Fm7 B♭7 |
[B]
B♭m7 | E♭7 | A♭maj7 | A♭maj7 |
Am7 D7 | Gm7 C7 | Fm7 | B♭7 |`,

`title: Summertime
by: George Gershwin
genre: Jazz
feel: Slow swing
tempo: 84
key: Am
check: 1
[A]
Am6 | E7 | Am6 | Am6 |
Dm7 | Dm7 | E7 | E7 |
Am6 | E7 | Am6 | A7 |
Dm7 G7 | Cmaj7 F7 | Bm7♭5 E7 | Am6 E7 |`,

`title: Rhythm changes in B♭
by: The "I Got Rhythm" form (Oleo, Anthropology…)
genre: Jazz
feel: Up swing
tempo: 200
key: B♭
form: A A B A
[A]
B♭6 Gm7 | Cm7 F7 | Dm7 G7 | Cm7 F7 |
Fm7 B♭7 | E♭maj7 A♭7 | Dm7 G7 | Cm7 F7 |
[B]
D7 | D7 | G7 | G7 |
C7 | C7 | F7 | F7 |`,

/* ---------------- Blues ---------------- */
`title: Jazz blues in F
by: The form behind Now's the Time, Billie's Bounce, Tenor Madness…
genre: Blues
feel: Medium swing
tempo: 126
key: F
[Blues]
F7 | B♭7 | F7 | Cm7 F7 |
B♭7 | B°7 | F7 | D7 |
Gm7 | C7 | F7 D7 | Gm7 C7 |`,

`title: Bird blues in F
by: Charlie Parker's "Blues for Alice" changes
genre: Blues
feel: Medium-up swing
tempo: 160
key: F
[Blues]
Fmaj7 | Em7♭5 A7 | Dm7 G7 | Cm7 F7 |
B♭7 | B♭m7 E♭7 | Am7 D7 | A♭m7 D♭7 |
Gm7 | C7 | Fmaj7 D7 | Gm7 C7 |`,

`title: Minor blues in C
by: The form of Mr. P.C. (John Coltrane)
genre: Blues
feel: Up swing
tempo: 180
key: Cm
[Blues]
Cm7 | Fm7 | Cm7 | Cm7 |
Fm7 | Fm7 | Cm7 | Cm7 |
A♭7 | G7 | Cm7 | Dm7♭5 G7 |`,

`title: Slow blues in G
by: 12/8 shuffle, the slow gospel-blues feel
genre: Blues
feel: Slow 12/8
tempo: 60
key: G
[Blues]
G7 | C7 | G7 | G7 |
C7 | C♯°7 | G7 | E7 |
Am7 | D7 | G7 E7 | Am7 D7 |`,

/* ---------------- Latin ---------------- */
`title: Blue Bossa
by: Kenny Dorham
genre: Latin
feel: Bossa nova
tempo: 150
key: Cm
[A]
Cm7 | Cm7 | Fm7 | Fm7 |
Dm7♭5 | G7 | Cm7 | Cm7 |
E♭m7 | A♭7 | D♭maj7 | D♭maj7 |
Dm7♭5 | G7 | Cm7 | Dm7♭5 G7 |`,

`title: The Girl from Ipanema
by: Antônio Carlos Jobim
genre: Latin
feel: Bossa nova
tempo: 130
key: F
form: A A B A
[A]
Fmaj7 | Fmaj7 | G7 | G7 |
Gm7 | G♭7 | Fmaj7 | G♭7 |
[B]
G♭maj7 | G♭maj7 | B7 | B7 |
F♯m7 | F♯m7 | D7 | D7 |
Gm7 | Gm7 | E♭7 | E♭7 |
Am7 | D7♭9 | Gm7 | C7♭9 |`,

`title: Spain (solo changes)
by: Chick Corea
genre: Latin
feel: Fast samba / fusion
tempo: 150
key: Bm
check: 1
[Solos]
Gmaj7 | % | F♯7 | % |
Em7 | % | A7 | % |
Dmaj7 | % | Gmaj7 | % |
C♯7 | % | F♯7 | % |
Bm7 | % | B7 | % |`,

`title: Song for My Father
by: Horace Silver
genre: Latin
feel: Bossa
tempo: 120
key: Fm
check: 1
form: A A B
[A]
Fm7 | Fm7 | E♭7 | E♭7 |
D♭7 | C7 | Fm7 | Fm7 |
[B]
E♭7 | E♭7 | Fm7 | Fm7 |
E♭7 | D♭7 C7 | Fm7 | Fm7 |`,

`title: Oye Como Va (vamp)
by: Tito Puente
genre: Latin
feel: Cha-cha-chá
tempo: 120
key: Am
[Vamp]
Am7 | D9 | Am7 | D9 |`,

`title: Salsa montuno in A minor
by: The i – iv – V montuno under countless salsa tunes
genre: Latin
feel: Salsa (2-3 clave)
tempo: 180
key: Am
[Montuno]
Am | Dm | E7 | Am |
Am | Dm | E7 | E7 |`,

`title: Samba ii–V workout in F
by: A practice form: ii–V–I in three keys
genre: Latin
feel: Samba
tempo: 170
key: F
[A]
Gm7 | C7 | Fmaj7 | Fmaj7 |
Cm7 | F7 | B♭maj7 | B♭maj7 |
Am7♭5 | D7♭9 | Gm7 | Gm7 |
Gm7 | C7 | Fmaj7 | Gm7 C7 |`,

/* ---------------- Funk & fusion ---------------- */
`title: Cantaloupe Island
by: Herbie Hancock
genre: Funk
feel: Funky straight 8ths
tempo: 112
key: Fm
[A]
Fm7 | Fm7 | Fm7 | Fm7 |
D♭7 | D♭7 | D♭7 | D♭7 |
Dm7 | Dm7 | Dm7 | Dm7 |
Fm7 | Fm7 | Fm7 | Fm7 |`,

`title: Chameleon (vamp)
by: Herbie Hancock
genre: Funk
feel: Funk 16ths
tempo: 96
key: B♭m
[Vamp]
B♭m7 | E♭7 | B♭m7 | E♭7 |`,

`title: Neo-soul loop
by: Ninth chords that slide, the D'Angelo / Robert Glasper colour
genre: Funk
feel: Laid-back 16ths
tempo: 82
key: D
[Loop]
Gmaj9 | F♯m7 | Em9 | A13 |
Gmaj9 | F♯m7 B7 | Em9 | Em9 A13 |`,

/* ---------------- J-pop & city pop (progression charts, the moves those songs are built from) ---------------- */
`title: Royal Road ballad
by: 王道進行 (IVmaj7 – V7 – IIIm7 – VIm): all over J-pop and anime
genre: J-pop
feel: Ballad 8ths
tempo: 76
key: D
[Verse]
D | A/C♯ | Bm7 | Bm7/A |
Gmaj7 | F♯m7 | Em7 | A7 |
[Chorus]
Gmaj7 | A7 | F♯m7 | Bm7 |
Gmaj7 | A7 | F♯m7 B7 | Em7 A7 |
Gmaj7 | A7 | F♯m7 | Bm7 |
Em7 | F♯m7 | Gmaj7 | Gmaj7 A7 |`,

`title: City pop drive
by: 丸サ進行 (Just the Two of Us): IVmaj7 – III7 – VIm7 – Vm7 I7
genre: J-pop
feel: 16th-note groove
tempo: 104
key: C
[Verse]
Fmaj7 | E7 | Am7 | Gm7 C7 |
Fmaj7 | E7 | Am7 | Gm7 C7 |
[Chorus]
Fmaj7 | G7 | Em7 | Am7 |
Dm7 | G7 | Cmaj7 | A7 |
Dm7 | E7 | Am7 | Gm7 C7 |
Fmaj7 | Fm6 | Em7 A7 | Dm7 G7 |`,

`title: Anime opening
by: Komuro verse, a 4-5-3-6 build, a Royal Road chorus, and a last chorus up a half step
genre: J-pop
feel: Fast rock 8ths
tempo: 178
key: E♭
form: Verse Pre Chorus Verse Pre Chorus Bridge Last
[Verse]
Cm | A♭ | B♭ | E♭ |
Cm | A♭ | B♭sus4 | B♭ |
[Pre]
A♭maj7 | B♭ | Gm7 | Cm7 |
A♭maj7 | B♭ | Fm7 | B♭sus4 B♭ |
[Chorus]
A♭maj7 | B♭7 | Gm7 | Cm7 |
A♭maj7 | B♭7 | Gm7 C7 | Fm7 B♭7 |
A♭maj7 | B♭7 | Gm7 | Cm7 |
Fm7 | Gm7 | A♭maj7 | B♭sus4 B♭ |
[Bridge]
Fm7 | Gm7 | A♭maj7 | B♭ |
Fm7 | Gm7 | A♭maj7 | B7 |
[Last]
Amaj7 | B7 | G♯m7 | C♯m7 |
Amaj7 | B7 | G♯m7 C♯7 | F♯m7 B7 |
Amaj7 | B7 | G♯m7 | C♯m7 |
F♯m7 | G♯m7 | Amaj7 | E |`,

`title: Canon ballad
by: カノン進行: the descending bass line of Pachelbel's Canon
genre: J-pop
feel: Ballad
tempo: 72
key: D
[A]
D | A/C♯ | Bm | F♯m/A |
G | D/F♯ | Em7 | A7 |
[B]
D | A/C♯ | Bm | Bm/A |
G | D/F♯ | G | A |`,

`title: Vocaloid rock
by: 4-5-3-6 at full speed, minor-key verse
genre: J-pop
feel: Fast rock 8ths
tempo: 190
key: Fm
[Verse]
Fm | D♭ | E♭ | Cm |
Fm | D♭ | E♭ | C7 |
[Chorus]
D♭maj7 | E♭ | Cm7 | Fm |
D♭maj7 | E♭ | Cm7 | Fm |
B♭m7 | Cm7 | D♭maj7 | E♭ |
D♭maj7 | E♭ | C7 | C7 |`,

`title: Piano-pop band
by: Secondary dominants, a passing diminished and the minor iv: the bright piano-band sound
genre: J-pop
feel: Bouncy 8ths
tempo: 132
key: E♭
[Verse]
E♭ | G7/D | Cm7 | B♭m7 E♭7 |
A♭maj7 | A°7 | E♭/B♭ | Cm7 |
Fm7 | B♭7 | Gm7 | C7 |
Fm7 | A♭m6 | B♭sus4 | B♭7 |
[Chorus]
A♭maj7 | B♭7 | Gm7 | C7 |
Fm7 | B♭7 | E♭maj7 | E♭7 |
A♭maj7 | A♭m6 | Gm7 | C7 |
Fm7 | B♭7 | E♭ | E♭ |`,

`title: Passing diminished ballad
by: 経過ディミニッシュ: IVmaj7 – ♯IV°7 – I/V – VIm7
genre: J-pop
feel: Ballad
tempo: 70
key: G
[A]
Cmaj7 | C♯°7 | G/D | Em7 |
Am7 | D7 | Gmaj7 | G7 |
Cmaj7 | Cm6 | Bm7 | E7 |
Am7 | D7sus4 D7 | G6/9 | G6/9 |`,

/* ---------------- Pop ---------------- */
`title: Four-chord pop
by: I – V – VIm – IV, the most-used loop in pop
genre: Pop
feel: Straight 8ths
tempo: 112
key: G
[Verse]
G | D | Em | C |
G | D | Em | C |
[Chorus]
C | G | D | Em |
C | G | D | D |`,

`title: Sad pop
by: VIm – IV – I – V
genre: Pop
feel: Half-time
tempo: 84
key: C
[Verse]
Am | F | C | G |
Am | F | C | G |
[Chorus]
F | G | Am | C |
F | G | Am | G |`,

`title: Fifties doo-wop
by: I – VIm – IV – V
genre: Pop
feel: 12/8 doo-wop
tempo: 72
key: C
form: A A Bridge A
[A]
C | Am | F | G |
C | Am | F | G |
[Bridge]
F | Fm | C | A7 |
D7 | % | G | G7 |`,

`title: Gospel pop
by: The 1 – 4 with passing chords and a minor iv: church piano under a pop song
genre: Pop
feel: Gospel 12/8
tempo: 68
key: A♭
[A]
A♭ | D♭/A♭ | A♭ | A♭7 |
D♭maj7 | D°7 | A♭/E♭ | Fm7 |
B♭m7 | E♭7 | A♭ Fm7 | B♭m7 E♭7 |
[B]
D♭maj7 | D♭m6 | Cm7 | Fm7 |
B♭m7 | E♭7sus4 E♭7 | A♭ | A♭ |`,
];
