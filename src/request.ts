import * as https from "node:https";

type User = {
  username: string;
  email: string;
}

type NpmSuggestions = {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords?: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  author: {
    name: string;
  };
  publisher: User;
  maintainers: User[];
}

export const suggestionURL = 'https://www.npmjs.com/search/suggestions';

export function searchNpm(pkgName: string): Promise<NpmSuggestions[]> {
  return new Promise((resolve, reject) => {

    const req = https.get(`${ suggestionURL }?q=${ pkgName }`, res => {
      if (res.statusCode !== 200) reject(res);

      let data: string = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', reject);
    req.end()
  })
}
