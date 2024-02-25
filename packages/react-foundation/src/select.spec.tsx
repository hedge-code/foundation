import { expect, test } from "@playwright/experimental-ct-react";
import Select from "./select";

test.describe("select", () => {
  test("default shows", async ({ page, mount }) => {
    const component = await mount(<Select label="Example"><option>Option 1</option><option>Option 2</option><option>Option 3</option></Select>);
    await expect(component).toBeVisible();
    await page.screenshot({
      path: "./playwright-screens/presentation-select.test.png",
    });
  });

  test("multi value shows", async ({ page, mount }) => {
    const component = await mount(<Select label="Example" multiple><option>Option 1</option><option>Option 2</option><option>Option 3</option></Select>);
    await expect(component).toBeVisible();
    await page.screenshot({
      path: "./playwright-screens/presentation-multiselect.test.png",
    });
  });
});
