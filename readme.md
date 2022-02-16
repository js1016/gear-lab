# Prerequisites:

1. [NodeJS](https://nodejs.org/en/) is installed
2. [git](https://git-scm.com/) is installed

# Run the application:

1. Clone the repo
2. Open command prompt and run `start.bat`
3. After seeing message `App is running, you can access http://localhost:3000/ in browser`, you can access `http://localhost:3000/` in browser.

# Background

This lab is built on the issue described in ericlaw's [Debugging Compatibility in Edge](https://textslashplain.com/2022/01/20/debugging-compatibility-in-edge/) where the issue occurs in Edge only, but not Chrome.

Chrome behavior:

![](https://joji.blob.core.windows.net/images/chrome-gear-working.gif)

Edge behavior:

![](https://joji.blob.core.windows.net/images/edge-gear-not-working.gif)

The root cause is due to an Edge-specific throttle. Microsoft Edge uses a throttle to implement our [Tracking Prevention feature](https://docs.microsoft.com/en-us/microsoft-edge/web-platform/tracking-prevention). We can use command `msedge.exe --disable-features=msEnhancedTrackingPreventionEnabled` to disable this feature and then Edge will behaves as Chrome.
