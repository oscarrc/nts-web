module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "NTS-web"
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
      config: {
          // Config here
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Oscar R.C.',
          homepage: 'https://oscarrc.me'
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Oscar R.C.',
          homepage: 'https://oscarrc.me'
        }
      }
    },
  ],
};
