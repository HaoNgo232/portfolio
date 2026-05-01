import { test, expect } from '@playwright/test';

test.describe('Portfolio UI Issues Investigation', () => {
  test('should check visibility of all sections', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for loading screen to complete
    await page.waitForTimeout(3000);

    // Check if sections exist in DOM
    const sections = [
      { id: 'home', name: 'Hero' },
      { id: 'projects', name: 'Projects' },
      { id: 'about', name: 'About' },
      { id: 'journal', name: 'Journal' },
      { id: 'contact', name: 'Contact' },
    ];

    console.log('\n=== SECTION VISIBILITY CHECK ===\n');

    for (const section of sections) {
      const element = page.locator(`#${section.id}`);
      const exists = await element.count() > 0;
      const visible = exists ? await element.isVisible() : false;
      const boundingBox = exists ? await element.boundingBox() : null;

      console.log(`${section.name} (#${section.id}):`);
      console.log(`  - Exists: ${exists}`);
      console.log(`  - Visible: ${visible}`);
      console.log(`  - BoundingBox: ${JSON.stringify(boundingBox)}`);
      console.log('');
    }

    // Check stats section (no id)
    const statsSection = page.locator('.stats-section');
    const statsExists = await statsSection.count() > 0;
    const statsVisible = statsExists ? await statsSection.isVisible() : false;
    console.log(`Stats Section (.stats-section):`);
    console.log(`  - Exists: ${statsExists}`);
    console.log(`  - Visible: ${statsVisible}`);
    console.log('');

    // Check explorations section (no id)
    const explorationsSection = page.locator('.explorations-section');
    const explorationsExists = await explorationsSection.count() > 0;
    const explorationsVisible = explorationsExists ? await explorationsSection.isVisible() : false;
    console.log(`Explorations Section (.explorations-section):`);
    console.log(`  - Exists: ${explorationsExists}`);
    console.log(`  - Visible: ${explorationsVisible}`);
    console.log('');

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check project cards
    const projectCards = page.locator('.bento-card');
    const cardCount = await projectCards.count();
    console.log(`\n=== PROJECT CARDS ===`);
    console.log(`Total cards: ${cardCount}\n`);

    if (cardCount > 0) {
      // Hover over first card
      await projectCards.first().hover();
      await page.waitForTimeout(500);

      // Check overlay visibility
      const overlay = projectCards.first().locator('.bento-card-overlay');
      const overlayVisible = await overlay.isVisible();
      const overlayOpacity = await overlay.evaluate((el) => {
        return window.getComputedStyle(el).opacity;
      });

      console.log(`First card hover state:`);
      console.log(`  - Overlay visible: ${overlayVisible}`);
      console.log(`  - Overlay opacity: ${overlayOpacity}`);

      // Check if description exists
      const desc = projectCards.first().locator('.bento-card-desc');
      const descExists = await desc.count() > 0;
      const descVisible = descExists ? await desc.isVisible() : false;
      const descText = descExists ? await desc.textContent() : '';

      console.log(`  - Description exists: ${descExists}`);
      console.log(`  - Description visible: ${descVisible}`);
      console.log(`  - Description text: "${descText}"`);
    }

    // Scroll down to check sections below projects
    console.log(`\n=== SCROLLING TO CHECK SECTIONS ===\n`);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Re-check visibility after scroll
    for (const section of sections) {
      const element = page.locator(`#${section.id}`);
      const exists = await element.count() > 0;
      const visible = exists ? await element.isVisible() : false;

      if (exists) {
        const opacity = await element.evaluate((el) => {
          return window.getComputedStyle(el).opacity;
        });
        const display = await element.evaluate((el) => {
          return window.getComputedStyle(el).display;
        });

        console.log(`${section.name} after scroll:`);
        console.log(`  - Visible: ${visible}`);
        console.log(`  - Opacity: ${opacity}`);
        console.log(`  - Display: ${display}`);
        console.log('');
      }
    }

    // Take screenshot
    await page.screenshot({ path: '/tmp/portfolio-full-page.png', fullPage: true });
    console.log('\nScreenshot saved to /tmp/portfolio-full-page.png');
  });
});
