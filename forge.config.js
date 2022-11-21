module.exports = {
  packagerConfig: {
    name: "NTS-web",
    asar: true,
    ignore: ["^/android$", "^/build$", "^/public$"]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Oscar R.C.',
          homepage: 'https://oscarrc.me'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Oscar R.C.',
          homepage: 'https://oscarrc.me'
        }
      },
    },
  ],
};
