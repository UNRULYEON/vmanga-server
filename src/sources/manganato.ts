import axios from "axios";
import cheerio from "cheerio";

type Result = {
  name: string;
  thumbnail: string;
  id: string;
};

const BASE_URL = "https://manganato.com/";

const fetch = axios.create({
  baseURL: BASE_URL,
});

const search = async (query: string): Promise<Result[]> => {
  return fetch.get(`search?q=${query}`).then((r) => {
    const page = cheerio.load(r.data);

    const result: Result[] = [];

    page("body > div.body-site > div.container.container-main > div.container-main-left > div.panel-search-story").map(
      (_, e) => {
        const name = page(e).find("div > h3 > a");
        const thumbnail = page(e).find("a > img");
        const url = page(e).find("div > h3 > a");

        result.push({
          id: url.attr("href").split(`${BASE_URL}manga-`)[1],
          name: name.text(),
          thumbnail: thumbnail.attr("src"),
        });
      }
    );

    return result;
  });
};

type MangaChapters = {
  name: string;
  chapters: {
    title: string;
    chapter: string;
  }[];
};

const chapters = async (id: string): Promise<MangaChapters> => {
  return fetch.get(`search?q=${id}`).then((r) => {
    const page = cheerio.load(r.data);

    const mangaEl = page(
      "body > div.body-site > div.container.container-main > div.container-main-left > div.panel-search-story > div:nth-child(1) > div > h3 > a"
    );

    return axios.get(mangaEl.attr("href")).then((r) => {
      const page = cheerio.load(r.data);
      const nodes = page(
        "body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-chapter-list > ul"
      )
        .toArray()
        .reverse();

      const result: MangaChapters = {
        name: mangaEl.text(),
        chapters: [],
      };

      nodes.map((e) => {
        result.chapters.push({
          title: page(e).find("span").text().slice(3).trim(),
          chapter: page(e).find("a").text().split(" ").reverse()[0],
        });
      });

      return result;
    });
  });
};

type MangaChapter = {
  name: string;
  pages: {
    url: string;
  }[];
};

// const chapter = async (id: string, chapter: string): Promise<MangaChapter> => {
//   return fetch.get(`search?q=${id}`)
//     .then(r => {
//       const page = cheerio.load(r.data)

//       const sourceId = page('body > section > div.container.bgposition-relative > div.row > div.col-md-8 > div:nth-child(2) > div > div:nth-child(1) > div > div.media-body > a')
//         .attr('href')
//         .split('/')[3]

//       return axios.get(`http://mangastream.mobi/${sourceId}-chapter-${chapter}`)
//         .then(r => {

//         })
//     })
// }

const manganato = {
  search,
  chapters,
  // chapter
};

export default manganato;
