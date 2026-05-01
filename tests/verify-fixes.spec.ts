import { test, expect } from '@playwright/test';

test.describe('Portfolio UI Fixes Verification', () => {
  test('all sections should be visible after scrolling', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for loading screen to complete
    await page.waitForTimeout(3500);

    // Check hero section is visible
    const hero = page.locator('#home');
    await expect(hero).toBeVisible();

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('#projects')).toBeVisible();

    // Scroll to about section
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(page.locator('#about')).toBeVisible();

    // Check about section content is visible
    const aboutGrid = page.locator('.about-grid');
    await expect(aboutGrid).toBeVisible();

    // Check stats section
    const statsSection = page.locator('.stats-section');
    await statsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(statsSection).toBeVisible();

    const statCards = page.locator('.stat-card');
    const statCount = await statCards.count();
    expect(statCount).toBeGreaterThan(0);
    await expect(statCards.first()).toBeVisible();

    // Scroll to journal section
    await page.locator('#journal').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(page.locator('#journal')).toBeVisible();

    const journalCards = page.locator('.journal-card');
    const journalCount = await journalCards.count();
    expect(journalCount).toBeGreaterThan(0);
    await expect(journalCards.first()).toBeVisible();

    // Scroll to explorations section
    const explorationsSection = page.locator('.explorations-section');
    await explorationsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(explorationsSection).toBeVisible();

    const explorationTiles = page.locator('.exploration-tile');
    const explorationCount = await explorationTiles.count();
    expect(explorationCount).toBeGreaterThan(0);
    await expect(explorationTiles.first()).toBeVisible();

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await expect(page.locator('#contact')).toBeVisible();

    const contactInner = page.locator('.contact-redesign-inner');
    await expect(contactInner).toBeVisible();

    console.log('✓ All sections are visible after scrolling');
  });

  test('project card hover should show description', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for loading screen
    await page.waitForTimeout(3500);

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Get first project card
    const firstCard = page.locator('.bento-card').first();
    await expect(firstCard).toBeVisible();

    // Check overlay exists
    const overlay = firstCard.locator('.bento-card-overlay');
    await expect(overlay).toBeAttached();

    // Check description exists in overlay
    const desc = overlay.locator('.bento-card-desc');
    await expect(desc).toBeAttached();

    const descText = await desc.textContent();
    expect(descText).toBeTruthy();
    expect(descText!.length).toBeGreaterThan(10);

    console.log(`✓ Description found: "${descText?.substring(0, 50)}..."`);

    // Hover over the card
    await firstCard.hover();
    await page.waitForTimeout(500);

    // Check if overlay becomes visible on hover (desktop)
    const overlayOpacity = await overlay.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    console.log(`✓ Overlay opacity on hover: ${overlayOpacity}`);

    // On desktop, opacity should be 1 on hover
    // On mobile (width < 560px), opacity is always 1
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width > 560) {
      expect(parseFloat(overlayOpacity)).toBeGreaterThan(0.5);
    }

    // Verify description is visible
    await expect(desc).toBeVisible();

    console.log('✓ Project card hover description is working');
  });

  test('take screenshot of full page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3500);

    // Scroll through all sections
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.locator('#journal').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Take full page screenshot
    await page.screenshot({
      path: '/tmp/portfolio-fixed.png',
      fullPage: true
    });

    console.log('✓ Screenshot saved to /tmp/portfolio-fixed.png');
  });
});
