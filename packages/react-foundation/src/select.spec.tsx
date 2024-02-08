import { expect, test } from "@playwright/experimental-ct-react";
import Select from "./select";

test("input shows", async ({ page, mount }) => {
  const component = await mount(<Select label="Example" />);
  await expect(component).toBeVisible();
  await page.screenshot({
    path: "./playwright-screens/presentation-select.test.png",
  });
});

test("multi value shows", async ({ page, mount }) => {
  const component = await mount(<Select multiple label="Example" />);
  await expect(component).toBeVisible();
  await page.screenshot({
    path: "./playwright-screens/presentation-multiselect.test.png",
  });
});
