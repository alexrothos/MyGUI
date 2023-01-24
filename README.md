# BIDS Monitoring UI v0.9.2

BIDS Monitoring user interface is a sipmle web application for monitoring and
handling the monitors and media player that are installed in BHS halls.

Main functionality is to provide a direct and fast way of the current condition
of any single set of monitor and media player pc. The informations are transfer 
through serial port from LG monitor to media player pc and describe the current 
status of the LG monitor and only the monitor. They don't provide any information
about the media player pc.

Information provided are the following:
- Power status (on / off)
- Temperature level (in Celcius)
- Volume level
- Serial number

### Monitoring and commands

At the 'Monitors' page, we have the table with all the monitors and their current
status. Colors in status and temperature are relative to the values that represent.

On the right of every row there are 3 buttons with actions. These actions are 
power on/status, power off and volume control. The user could send any of these 
commands to the monitor. The answer will be passed through the REST api to DB 
and after the page is updated, the user will have the current status again.

### Managing users

The 'Uses Management' page is available only for admin users. A user with no admin
privilages can't access this page. The admin could create a new user, update an 
existing one and delete a user.

When admin updating a user could change all the users details. Could change the 
username, email, password or privilages (user/admin).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Main Monitoring Table 
![BIDS Monitoring UI](https://github.com/lassolutions/bids_monitoring_ui/blob/main/src/assets/bids_monitoring_9.png)

### URL of the web app

The web app is set to run at port 8081. This is set at the "package.json" file. 
Under the log 'script' --> 'serve'. It could be changed at will.


### Languages and Tools:

![badge](https://img.shields.io/badge/made%20with-Vue.js_&_Vuetify-blue.svg?style=flat-square)
