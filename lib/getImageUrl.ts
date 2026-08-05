export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const LOCAL_IMAGE_MAP: { [key: string]: string } = {
  'es teh': '/es teh.jpeg',
  'batagor': '/batagor.jpeg',
  'baso ikan': '/baso ikan.jpeg',
  'baso tahu': '/baso tahu.jpeg',
  'basreng': '/basreng.jpeg',
  'bola': '/bola2 aci.jpeg',
  'bubur': '/bubur ayam.jpg',
  'camilan': '/camilan.jpeg',
  'cilok': '/cilok.jpeg',
  'gorengan': '/gorengan.jpeg',
  'jus': '/jus buah.jpeg',
  'ketang': '/ketang.jpeg',
  'korean': '/korean food.jpg',
  'kue': '/kue basah.jpeg',
  'lontong': '/lontong sayur.jpg',
  'lotek': '/lotek.jpeg',
  'marimas': '/marimas.jpeg',
  'masakan': '/masakan.jpeg',
  'mie bakso': '/Mie Bakso.jpg',
  'mie campur': '/mie campur.jpeg',
  'mie goreng': '/mie goreng.jpeg',
  'mie kuah': '/mie kuah.jpeg',
  'mie ramen': '/mie ramen.jpeg',
  'pop ice': '/pop ice.jpeg',
  'roti': '/roti goreng.jpeg',
  'rujak': '/rujak coel.jpg',
  'salad': '/salad jeli.jpeg',
  'seblak': '/seblak.jpg',
  'snack': '/snack.jpeg',
  'spaghetti': '/spaghetti.jpg',
  'stup': '/stup roti.jpeg',
  'tahu': '/tahu crispi.jpeg',
  'tea jus': '/tea jus.jpeg',
  'mas arjo': '/kantin mas arjo.jpeg',
  'bi nani': '/kantin bi nani.jpeg',
  'bu joe': '/kantin bu joe.jpeg',
  'lies': '/kantin lies.jpeg',
  'teh enci': '/kantin teh enci.jpeg',
  'mas echo': '/kantin mas echo.jpeg',
  'apih': '/kantin apih.jpeg',
  'hampura': '/kantin hampura.jpeg',
  'pa zaenal': '/kanten pa zaenal.jpeg',
  'kantin': '/kantin.jpeg',
};

export function getImageUrl(item: any): string {
  if (!item) return '/placeholder.jpeg';

  // Jika item bertipe string (misal path URL langsung)
  if (typeof item === 'string') {
    if (item.startsWith('http://') || item.startsWith('https://') || item.startsWith('/')) {
      return item;
    }
    return `${STRAPI_URL}${item.startsWith('/') ? '' : '/'}${item}`;
  }

  const dataObj = item.attributes || item;

  const media =
    dataObj.banner ||
    dataObj.benner ||
    dataObj.image ||
    dataObj.foto ||
    dataObj.gambar ||
    dataObj.cover;

  if (media) {
    const target = Array.isArray(media) ? media[0] : media;
    const nestedTarget = target?.data?.attributes || target?.data || target;

    const rawUrl =
      nestedTarget?.url ||
      nestedTarget?.formats?.medium?.url ||
      nestedTarget?.formats?.small?.url ||
      nestedTarget?.formats?.thumbnail?.url ||
      (typeof media === 'string' ? media : null);

    if (rawUrl) {
      if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
        return rawUrl;
      }
      return `${STRAPI_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
    }
  }

  // Smart fallback ke gambar lokal di public/ berdasarkan nama menu / toko
  const name = (dataObj.name || dataObj.nama || dataObj.title || '').toLowerCase();
  if (name) {
    for (const [key, localPath] of Object.entries(LOCAL_IMAGE_MAP)) {
      if (name.includes(key)) {
        return localPath;
      }
    }
  }

  return '/placeholder.jpeg';
}
