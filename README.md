# next-slate-defaults
> Defaults for slate.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-slate-defaults
```

## apis
| api      | params                  | description       |
| -------- | ----------------------- | ----------------- |
| children | -                       | Void children.    |
| importer | (inElement, inChildren) | Default importer. |
| exporter | (inNode, inChildren)    | Default exporter. |

## usage
```js
import NxSlateDefaults from '@jswork/next-slate-defaults';

// code goes here:
NxSlateDefaults.children();
NxSlateDefaults.importer(el, children);
NxSlateDefaults.exporter(nodes, children);
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-slate-defaults/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-slate-defaults
[version-url]: https://npmjs.org/package/@jswork/next-slate-defaults

[license-image]: https://img.shields.io/npm/l/@jswork/next-slate-defaults
[license-url]: https://github.com/afeiship/next-slate-defaults/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-slate-defaults
[size-url]: https://github.com/afeiship/next-slate-defaults/blob/master/dist/next-slate-defaults.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-slate-defaults
[download-url]: https://www.npmjs.com/package/@jswork/next-slate-defaults
