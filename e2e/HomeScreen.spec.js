describe('Home Screen', () => {
  
  /**
   * We'll reset the UI state before every test.
   */
  beforeEach(async () => {
    await device.reloadReactNative()
  })
  
  /**
   * Should display an instance of the HomeScreen
   * component on launch.
   */
  it('HomeScreenTest', async () => {
    await expect(element(by.id('HomeScreenTest'))).toBeVisible()
  })

  /**
   * Should navigate to a Detail Screen (after a short animation
   * delay) after the button on the home screen is tapped.
   */
  it('DetailScreenTest', async () => {
    await expect(element(by.id('HomeScreenButton'))).toBeVisible()
    await element(by.id('HomeScreenButton')).tap()
    await waitFor(element(by.id('DetailScreen'))).toBeVisible().withTimeout(2000)
  })
  
})
