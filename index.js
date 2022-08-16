const express = require('express')
const scrapingbee = require('scrapingbee'); // Importing SPB's SDK
const app = express()
const port = 3000

async function getMovieDetails(url) {
    var client = new scrapingbee.ScrapingBeeClient('YOUR API KEY'); // Initialize the client with your API Key
    var response = await client.get({
      url: url,
      params: {
        'extract_rules': {
                            "title": ".sc-b73cd867-0",
                            "year": ".sc-8c396aa2-2",
                            "genre": ".ipc-chip__text",
                            "description": ".sc-16ede01-0",
                            "rating": ".sc-7ab21ed2-1",
                            "meta_score": ".score-meta",
                          }
      },
    })
    return response;
  }

app.get('/', async (req, res) => {
    my_request = await getMovieDetails("https://m.imdb.com/title/tt9419884/");

    console.log("Status Code:", my_request.status)
    var decoder = new TextDecoder()
    var text = decoder.decode(my_request.data)
    console.log(text)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})