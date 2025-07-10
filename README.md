# 📦 @rsales/vue-vwo-abtest

> **Vue 3 composable for detecting VWO A/B test variations.**  
> Lightweight, fast, and compatible with VWO SmartCode.

---

## ✨ Features

- 📡 Detects variation via `VWO.push(['onVariationApplied', ...])`
- 🍪 Cookie-based fallback detection using `_vwo_uuid`
- 🧠 Smart variation hash fallback (supports multiple variations)
- 🧩 Simple integration using Vue 3 Composition API
- 🔌 Optional plugin support (coming soon)

---

## 📦 Installation

```bash
yarn add @rsales/vue-vwo-abtest
# or
npm install @rsales/vue-vwo-abtest
```

---

## 🚀 Usage

### Basic Composable Usage

```ts
import { useVwoVariation } from '@rsales/vue-vwo-abtest';

export default {
  setup() {
    const { variation, isLoaded } = useVwoVariation(123); // replace with your campaign ID
    return { variation, isLoaded };
  }
}
```

### Vue Template Example

```html
<template>
  <div v-if="isLoaded">
    <div v-if="variation === 1">Control</div>
    <div v-else-if="variation === 2">Variation A</div>
    <div v-else>Other Variation</div>
  </div>
</template>
```

---

## 🔧 Plugin Usage (Optional)

```ts
// plugins/vwo.js
import VwoPlugin from '@rsales/vue-vwo-abtest';

export default {
  install(app, options) {
    app.use(VwoPlugin, options); // plugin mode coming soon
  }
}
```

---

## ⚙️ How it Works

1. Uses VWO SmartCode event: `VWO.push(['onVariationApplied', ...])`
2. If not available, reads the `_vwo_uuid` cookie
3. Hashes part of the cookie to estimate variation using modulo
4. Defaults to 3 variations if not specified in `window._vwo_exp`

---

## 📁 Project Structure

```
src/
├── index.js       # Main composable
vite.config.js     # Build config
package.json
README.md
```

---

## 🚀 Release & Publish

```bash
git commit -am "feat: add support for 4+ variations"
npm version patch
npm publish --access public
```

---

## 🧑‍💻 Contributing

Pull requests are welcome!

```bash
git clone https://github.com/rsalesdev/vue-vwo-abtest
cd vue-vwo-abtest
yarn install
yarn dev
```

---

## 📃 License

MIT © [Rafael Sales](https://github.com/rsales)
