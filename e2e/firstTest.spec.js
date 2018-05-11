describe('Home Screen', () => {
  
  beforeEach(async () => {
    await device.reloadReactNative();
  })
  
  it('HomeScreenTest', async () => {
    await expect(element(by.id('HomeScreenTest'))).toBeVisible();
  })
  
})