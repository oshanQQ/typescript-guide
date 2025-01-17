describe("Post show page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/signin`);
      await page.type("[data-test=input-email]", "9@prog-8.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.click("[data-test=submit]"),
        page.waitForNavigation(),
      ]);
      await Promise.all([
        page.goto(`${global.URL}/posts/14`),
        page.waitForSelector("[data-test=submit-like]"),
      ]);
    });
    test("display post info [GUUuuP7QHN8O2VpecYkij]", async () => {
      const name = await page.$eval(
        "[data-test=user-name]",
        el => (el as HTMLElement).innerText
      );
      const content = await page.$eval(
        "[data-test=post-content]",
        el => (el as HTMLElement).innerText
      );
      const time = await page.$eval(
        "[data-test=post-time]",
        el => (el as HTMLElement).innerText
      );
      const userImage = await page.$eval(
        "[data-test=user-image]",
        el => (el as HTMLImageElement).src
      );
      expect(name).toBe("for post show");
      expect(content).toBe("show post");
      expect(time).toBe("2021/06/01 02:32");
      expect(userImage).toBe(`${global.URL}/image/users/default_user.jpg`);
      expect(await page.$("[data-test=post-image]")).toBeNull();
    });
    test("display post's like info [lnfUMRoEWSSmTvq4yzrnf]", async () => {
      const likeAction = await page.$eval(
        "[data-test=form-like]",
        el => (el as HTMLFormElement).action
      );
      const unLikedicon = await page.$eval(
        "[data-test=favorite-icon]",
        el => (el as HTMLElement).innerText
      );
      const likeCount = await page.$eval(
        "[data-test=like-count]",
        el => (el as HTMLElement).innerText
      );
      const unLikediconStyleFontFamily = await page.$eval(
        "[data-test=favorite-icon]",
        el => window.getComputedStyle(el).getPropertyValue("font-family")
      );
      expect(likeAction).toBe(`${global.URL}/likes/14/create`);
      expect(unLikedicon).toBe("favorite_border");
      expect(unLikediconStyleFontFamily).toBe('"Material Icons"');
      expect(likeCount).toBe("0");
      await Promise.all([
        page.goto(`${global.URL}/posts/15`),
        page.waitForSelector("[data-test=submit-like]"),
      ]);
      const unLikeAction = await page.$eval(
        "[data-test=form-like]",
        el => (el as HTMLFormElement).action
      );
      const likedIcon = await page.$eval(
        "[data-test=favorite-icon]",
        el => (el as HTMLElement).innerText
      );
      expect(unLikeAction).toBe(`${global.URL}/likes/15/delete`);
      expect(likedIcon).toBe("favorite");
    });
    afterAll(async () => {
      await Promise.all([
        page.click("[data-test=header-link-signout]"),
        page.waitForNavigation(),
      ]);
    });
  });
  describe("before sign in", () => {
    beforeAll(async () => {
      await page.goto(`${global.URL}/posts/1`);
    });
    test("display sign in required error [ZANEuqr6wSZravaSbBnTI]", async () => {
      const message = await page.$eval(
        "[data-test=dialog]",
        el => (el as HTMLElement).innerText
      );
      expect(page.url()).toBe(`${global.URL}/signin`);
      expect(message).toBe("ログインが必要です");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
});
