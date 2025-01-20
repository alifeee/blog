# Moratorium of a book club

For a short time I ran a book club with my friends. After a couple of years, I stopped being so active in organising the meeting, and as such, the book club slowed and stopped.

This is fine, all things pass. More importantly, this was during an era where I loved writing stuff down. So, I ended up with several *facts* and *statistics*. Here they are.

1. [The data](#the-data)
   1. [Books](#books)
   2. [Meetings](#meetings)
   3. [Reading list](#reading-list)
2. [We read 14 books](#we-read-14-books)

## The data

First, the data. I was keeping track of stuff using [Notion](https://www.notion.com/), with all sorts of funky database structures. They were not worth the hassle. I now use [Obsidian](https://blog.alifeee.co.uk/notes/tagged/obsidian/).

### Books

First, a table of the books that we read, from [`books.csv`](./books.csv). It has the books, the reading date, and a review score if the person gave it one. Each book has about 4 or 5 reviews, meaning about 4 or 5 people read (some of) it or turned up to a book club and rated it from the Wikipedia summary.

I made the markdown for this from the CSV using a command, which prints the CSV as a TSV (Tab-Separated Values), and then replaces tabs with pipes `|`, and then adds the second row which is needed by markdown.

```bash
cols=$(csvtool width books.csv)
cat books.csv | csvtool paste -u TAB - | sed 's/\t/ | /g' | sed 's/^/| /' | sed 's/$/ |/' | awk 'NR==2 { for (i=1;i<='"${cols}"';i++) {printf "| --- "}; print " |" } {print}'
```

| Name | Author | Genre | Status | Reading Date | Suggestor | alifeee | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | Total review count | Total review points | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---  |
| I Have No Mouth and I Must Scream | Harlan Ellison | Fiction | Read | September 27, 2022 → October 25, 2022 | P4 |  |  |  |  |  |  |  |  |  |  |  | 0 | 0 |  |
| Quichotte | Salman Rushdie | Fiction | Read | October 25, 2022 → November 29, 2022 | P7 | 7.5 | 8.5 |  |  |  |  |  |  |  |  | 8 | 3 | 24 | 8 |
| Around the World in 80 Days | Jules Verne | Fiction | Read | November 29, 2022 → January 31, 2023 | alifeee | 9 | 9 | 5 |  | 6 |  | 8 | 6 |  |  |  | 6 | 43 | 7.17 |
| Freakonomics | Steven Levitt & Stephen J Dubner | Non-fiction | Read | January 31, 2023 → February 28, 2023 | P2 | 3 | 5 | 6.5 |  |  |  |  | 5 |  |  |  | 4 | 19.5 | 4.88 |
| Flowers for Algernon | Daniel Keyes | Fiction | Read | February 28, 2023 → March 28, 2023 | alifeee | 8 |  |  |  | 7 |  | 9 | 9 |  |  |  | 4 | 33 | 8.25 |
| The Hitchhiker's Guide to the Galaxy | Douglas Adams | Fiction | Read | March 29, 2023 → May 31, 2023 | alifeee | 8 | 8.5 |  | 7.5 |  | 7 |  | 8.8 |  | 7 |  | 6 | 46.8 | 7.8 |
| The Spy Who Came In From The Cold | John Le Carre | Fiction | Read | May 31, 2023 → June 28, 2023 | P7 | 4 |  |  | 4 |  |  |  | 6 |  | 4.5 |  | 4 | 18.5 | 4.63 |
| And Then We Grew Up | Rachel Friedman | Non-fiction | Read | July 26, 2023 → August 2, 2023 | alifeee | 4 |  |  | 4 |  | 3.5 | 3 |  |  | 4.5 |  | 5 | 19 | 3.8 |
| The Time Machine | H G Wells | Fiction | Read | August 2, 2023 → August 30, 2023 | alifeee | 4 | 5 |  |  |  | 5 |  | 6.5 |  | 7.5 | 8.75 | 6 | 36.75 | 6.13 |
| Invisible Women- Exposing Data Bias in a World Designed for Men | Caroline Criado-Perez | Non-fiction | Read | August 30, 2023 → October 27, 2023 | alifeee | 9 | 9.5 |  | 8 |  |  |  | 8 |  | 6 | 8 | 6 | 48.5 | 8.08 |
| Normal People | Sally Rooney | Fiction | Read | October 27, 2023 → November 29, 2023 | alifeee | 1 |  |  |  |  |  |  | 5 | 3.4 | 2.5 |  | 4 | 11.9 | 2.98 |
| Four Lost Cities- A Secret History of the Urban Age | Annalee Newitz | Fiction | Read | January 3, 2024 → January 31, 2024 | alifeee |  |  |  | 8.5 |  | 8.5 |  |  | 8.5 |  |  | 3 | 25.5 | 8.5 |
| bad karma | Paul Wilson | Non-fiction | Reading | February 1, 2024 → … | P4 |  |  |  |  |  |  |  |  |  |  |  | 0 | 0 |  |

### Meetings

From [`meetings.csv`](./meetings.csv); not very interesting.

| Name | Date | 📕 Book |
| --- | --- | ---  |
| Initial | September 27, 2022 |  |
| October | October 25, 2022 | I Have No Mouth and I Must Scream |
| November | November 29, 2022 | Quichotte |
| Christmas | January 3, 2023 |  |
| January | February 1, 2023 | Around the World in 80 Days |
| February | February 28, 2023 | Ode to Tomatoes, Every Day You Play, I Explain Some Things, and others |
| March | March 29, 2023 | Flowers for Algernon |
| May | May 31, 2023 | The Hitchhiker's Guide to the Galaxy |
| June | June 28, 2023 | The Spy Who Came In From The Cold/The Spy Who Came In From The Cold |
| July | August 2, 2023 | And Then We Grew Up |
| August | September 4, 2023 | The Time Machine/The Time Machine |
| October | October 27, 2023 | Invisible Women- Exposing Data Bias in a World Designed for Men |
| November | November 29, 2023 | Normal People |
| January | January 31, 2024 | Four Lost Cities- A Secret History of the Urban Age |

### Reading list

From [`book_suggestions.csv`](./book_suggestions.csv). Mostly, we would take the next book to read off of this list. Sometimes, it would come from thin air.

As you can see, this is somewhat of "alifeee's personal reading list", as I had suggested a lot of titles. My new "I want to read this" book list lies offline, on my Obsidian, but you can see a snapshot [here](./to_read_2025-01-20.txt). Other people suggested some other things, they are labelled the same as in the above books table.

| Name | Author | Genre | Suggestor |
| --- | --- | --- | ---  |
| Cannery Row | John Steinbeck | Fiction | P6 |
| Chavs- The Demonisation of the Working Class | Owen Jones | Non-fiction | alifeee |
| The Count of Monte Cristo | Alexandre Dumas | Fiction | P6 |
| Inglorious Empire- What the British Did to India | Shashi Tharoor | Non-fiction | alifeee |
| How To Do Nothing- Resisting the Attention Economy | Jenny Odell | Non-fiction | alifeee |
| Slaughterhouse 5 | Kurt Vonnegut | Fiction | alifeee |
| Your Head is a Houseboat- A Chaotic Guide to Mental Clarity | Campbell Walker | Non-fiction | alifeee |
| There Are No Accidents- The Deadly Rise of Injury and Disaster--Who Profits and Who Pays the Price | Jessie Singer | Non-fiction | alifeee |
| Harlem Shuffle | Colson Whitehead | Fiction | P1 |
| What's Our Problem | Tim Urban | Non-fiction | alifeee |
| One Hundred Years of Solitude | Gabriel García Márquez | Fiction | alifeee |
| Finntopia- What We Can Learn From the World's Happiest Country | Danny Dorling | Non-fiction | alifeee |
| Children of Time | Adrian Tchaikovsky | Fiction | alifeee |
| Sapiens | Yuval Noah Harari | Non-fiction | P7 |
| Metamorphosis | Franz Kafka | Fiction | alifeee |
| Dante's Inferno | Dante? | Fiction | alifeee |
| Beautiful world where are you | Sally Rooney | Fiction | alifeee |
| How to be an anticapitalist in the twenty-first century | Erik Olin Wright | Non-fiction | alifeee |
| The Third Door- The Wild Quest to Uncover How the World's Most Successful People Launched Their Careers | Alex Banayan | Non-fiction | alifeee |
| Vagabonding- An Uncommon Guide to the Art of Long-Term World Travel | Rolf Potts | Non-fiction | alifeee |
| All About Love 2 | Bell Hooks | Non-fiction | alifeee |
| The Bell Jar | Sylvia Plath | Fiction | alifeee |
| East West Street | Philippe Sands | Non-fiction | P3 |
| Ayoade on Top | Richard Ayoade | Non-fiction | P3 |
| Stepford Wives | Ira Levin | Fiction | P3 |
| The Intellectual Life of the British Working Classes | Jonathan Rose | Non-fiction | alifeee |
| Jillian | Halle Butler | Fiction | alifeee |
| 20,000 Leagues Under the Sea | Jules Verne | Fiction | alifeee |
| The Metamorphosis | Franz Kafka | Fiction | alifeee |
| Name of Author by Title of Book | Tom Murphy 7 | Fiction | alifeee |
| Blood in the Machine | Brian Merchant | Non-fiction | alifeee |
| Bullshit Jobs 2 | David Graeber | Non-fiction | alifeee |
| Sometimes a Great Notion | Ken Kesey | Fiction | alifeee |
| The Situtation is Hopeless But Not Serious | Paul Watzlawick | Non-fiction | alifeee |
| All About Love | Bell Hooks | Non-fiction | alifeee |
| Mutual Aid- Building Solidarity During this Crisis (and the Next) | Dean Spade | Non-fiction | P8 |
| Ronia, the Robber’s Daughter | Astrid Lindgren | Fiction | P8 |
| What is Life | Addy Pross | Non-fiction | P8 |
| Ringworld | Larry Niven | Fiction | alifeee |
| The Psychopath Test | Jon Ronson | Non-fiction | alifeee |
| Pastoralia | George Saunders | Fiction | P7 |
| Tomorrow, and Tomorrow, and Tomorrow | Gabrielle Zevin | Fiction | P7 |
| Bullshit Jobs | David Graeber | Non-fiction | alifeee |

## We read 14 books

Well, that's how many unique books that at least one person read. Personally, I read 11 of the books.

Counting everyone

<div class="books">
    <ul>
        <li>

        </li>
    </ul>
</div>