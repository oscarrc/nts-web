const channelList = [
    "all",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16"
]

const defaultDevices = {
    inputDevices: [],
    outputDevices: [],
    passthroughDevices: [],
    input: null,
    output: null,
    passthrough: null
}

const defaultChannels = {
    input: 0,
    output: 0,
    passthrough: 0
}

const sysex = {
    sysexVendor: 66,
    sysexChannel: 0,
    sysexDevice: 87
}

export { channelList, defaultChannels, defaultDevices, sysex }
