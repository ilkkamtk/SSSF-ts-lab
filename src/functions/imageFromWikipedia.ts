// function to get image from wikipedia

export default async (query: string) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&origin=*&titles=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    const image = page.original.source;
    return image;
  } catch (error) {
    return 'https://via.placeholder.com/640x480?text=No+image+found';
  }
};
