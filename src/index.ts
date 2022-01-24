import type { ScriptFilter, ScriptFilterItem } from 'alfred-types';
import * as process from "process";
import { searchNpm } from "./request";

const input = process.argv[2];
const output: ScriptFilter = { items: [] };

const fallback: ScriptFilterItem = {
  title: '0 Packages Found',
  subtitle: `Search Google for ${ input }`,
  valid: true,
  icon: { path: 'google.png' },
  arg: input,
  variables: {
    google: 'true'
  }
};

(async function () {

  const suggestions = await searchNpm(input);

  output.items = suggestions.map(suggest => {
    return {
      title: suggest.name,
      subtitle: suggest.description,
      valid: true,
      arg: suggest.links.npm,
      quicklookurl: suggest.links.npm,
      mods: {
        cmd: {
          title: suggest.name,
          subtitle: 'Open Repository',
          icon: { path: 'github.png' },
          arg: suggest.links.repository
        }
      }
    }
  })

  !output.items.length && output.items.push(fallback);

  console.log(JSON.stringify(output, undefined, 2));

})();
