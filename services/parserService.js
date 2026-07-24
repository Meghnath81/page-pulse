const axios = require('axios');
const cheerio = require('cheerio');

async function parseUrl(targetUrl) {
  // Validate URL string format
  try {
    new URL(targetUrl);
  } catch {
    const error = new Error('Invalid URL format. Please include http:// or https://');
    error.statusCode = 400;
    throw error;
  }

  const startTime = Date.now();
  let response;

  try {
    // 8-second timeout safeguard
    response = await axios.get(targetUrl, {
      timeout: 8000,
      headers: { 'User-Agent': 'PagePulseAuditor/1.0' }
    });
  } catch (err) {
    const error = new Error();
    if (err.code === 'ECONNABORTED') {
      error.message = 'Target URL request timed out.';
      error.statusCode = 408;
    } else if (err.response) {
      error.message = `Target site responded with status ${err.response.status}.`;
      error.statusCode = 502;
    } else {
      error.message = 'Target site is unreachable or domain does not exist.';
      error.statusCode = 502;
    }
    throw error;
  }

  const responseTimeMs = Date.now() - startTime;
  const contentType = response.headers['content-type'] || '';

  if (!contentType.includes('text/html')) {
    const error = new Error('URL did not return an HTML document.');
    error.statusCode = 415;
    throw error;
  }

  const $ = cheerio.load(response.data);

  const title = $('title').text().trim() || 'No title found';
  const metaDescription = $('meta[name="description"]').attr('content') || 'No meta description found';
  const h1Count = $('h1').length;

  const imagesMissingAlt = $('img').filter((i, img) => {
    const alt = $(img).attr('alt');
    return alt === undefined || alt.trim() === '';
  }).length;
  
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText ? bodyText.split(' ').length : 0;

  return {
    status: response.status,
    responseTimeMs,
    title,
    metaDescription,
    h1Count,
    imagesMissingAlt,
    wordCount
  };
}

module.exports = { parseUrl };