import { expect, test } from "@playwright/experimental-ct-react";

import Input from "./input";

test("input shows", async ({ page, mount }) => {
  const component = await mount(<Input label="Example" />);
  await expect(component).toBeVisible();
  await page.screenshot({
    path: "./playwright-screens/presentation-input.test.png",
  });
});

test("textarea shows", async ({ page, mount }) => {
  const component = await mount(<Input label="Example" type="textarea" />);
  await expect(component).toBeVisible();
  await page.screenshot({
    path: "./playwright-screens/presentation-textarea.test.png",
  });
});
