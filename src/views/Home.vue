<template>
    <div class="Home pa-6">
        <h1>BIDS Monitoring Application by LAS Solutions</h1>
        <h4><p>This is a user friendly interface for monitoring the status of the BIDS BTRS monitors.</p></h4><br>
        <p><b>Disclaimer : </b><i>Action icons explained</i></p>
        <p><v-icon>mdi-power</v-icon> - Power on : Turns the monitor on (appears only if monitor is off)</p>
        <p><v-icon>mdi-power-plug-off</v-icon> - Power off : Turns the monitor off (appears only if monitor if on)</p>
        <p><v-icon>mdi-brightness-percent</v-icon> - Brightness : Open a dialog box to set the desired value for brightness</p>
        <p><v-icon>mdi-contrast-circle</v-icon> - Contrast : Open a dialog box to set the desired value for contrast</p>
        <p><v-icon>mdi-volume-equal</v-icon> - Volume : Open a dialog box to set the desired value for volume (if mute is on, also unmute)</p>
        <p><v-icon>mdi-volume-high</v-icon> - Unmute : The volume is back on the last value</p>
        <p><v-icon>mdi-volume-mute</v-icon> - Mute : The volume is off but the last value is visible</p>
        <p><v-icon>mdi-controller</v-icon> - Monitor controls on : Buttons on the monitor & IR remote are functional (appears only if functionality is locked)</p>
        <p><v-icon>mdi-controller-off</v-icon> - Monitor controls off : Buttons on the monitor & IR remote are locked (appears only if functionality is unlocked)</p>
        <p><v-icon>mdi-swap-horizontal</v-icon> - Server change : Swap between DeviceOn servers for the remote access</p>
        <p><br><br>
            <v-container fluid>
                <v-row class="pa-2 elevation-10">
                    <v-col cols="5">
                        <h3>Build for:</h3> 
                        <v-img
                            contain
                            width="100"
                            src="../assets/aia.png"
                        ></v-img>
                    </v-col>
                    <v-col cols="5">
                        <h3>Build by:</h3>
                        <v-img
                            contain
                            width="200"
                            src="../assets/logo_lass1.png"
                        ></v-img>
                    </v-col>
                </v-row>
            </v-container>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data: () => {
        return {

        }
    },
}
</script>

<style></style>
