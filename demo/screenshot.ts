import { chromium } from 'playwright-core'
import { createHctPalette, createOklchPalette } from './palettes.ts'

const palettes = { hct: createHctPalette(), oklch: createOklchPalette() }
const page = await chromium
  .launch({ executablePath: '/usr/bin/helium-browser' })
  .then(browser => browser.newPage({ viewport: { width: 1280, height: 520 }, deviceScaleFactor: 2 }))

await page.goto(Bun.pathToFileURL(`${import.meta.dir}/index.html`).href)

for (const [name, palette] of Object.entries(palettes)) {
  await page.evaluate(palette => {
    for (const [key, value] of Object.entries(palette))
      document.documentElement.style.setProperty(`--${key.replace(/[A-Z]/g, char => '-' + char.toLowerCase())}`, value)
  }, palette)
  await page.screenshot({ path: `${import.meta.dir}/../assets/${name}.png` })
  console.log(name)
}

await page.context().browser()!.close()
