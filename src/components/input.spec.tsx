import React from "react";

import { expect, test } from "@playwright/experimental-ct-react";

import Input from "./input";

test("input shows", async ({ page, mount }) => {
  const component = await mount(<Input label='hello' />);
  await expect(component).toBeVisible();
  await page.screenshot({path: './playwright-screens/presentation.test.png'})
});
