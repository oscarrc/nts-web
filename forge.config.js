module.exports = {
  packagerConfig: {
    icon: 'src/assets/icons/icon'
  },
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
      platforms: ['darwin', 'linux']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Oscar R.C.',
          homepage: 'https://oscarrc.me',
          icon: 'src/assets/icons/icon.png'
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Oscar R.C.',
          homepage: 'https://oscarrc.me',
          icon: 'src/assets/icons/icon.png'
        }
      }
    },
  ],
};
