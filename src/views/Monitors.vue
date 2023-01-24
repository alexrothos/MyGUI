<template>
    <v-app>
        <v-card class="pa-3 elevation-10 ma-2" rounded>
            <v-card-title>
                <v-subheader>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-subheader>
                <v-subheader>
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="multiAction('power_on')"
                        ><v-icon>mdi-power</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="multiAction('power_off')"
                        ><v-icon>mdi-power-plug-off</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="multiAction('lock_on')"
                        ><v-icon>mdi-controller</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="multiAction('lock_off')"
                        ><v-icon>mdi-controller-off</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="multiAction('mute')"
                        ><v-icon>mdi-volume-mute</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="multiAction('unmute')"
                        ><v-icon>mdi-volume-high</v-icon></v-btn
                    ></v-subheader
                >
            </v-card-title>
            <v-data-table
                id="monitorTable"
                v-model="selected"
                :headers="headers"
                :items="monitors"
                :item-class="itemRowBackground"
                :search="search"
                :custom-filter="filterText"
                sort-by="player_id"
                show-select
                show-expand
            >
                <template v-slot:[`item.last_heartbeat`]="{ item }">
                    <v-chip
                        :color="
                            lifesign(item.last_heartbeat) > 30
                                ? 'purple'
                                : 'cyan'
                        "
                        dark
                        class="tempChip"
                    >
                        <div>{{ lifesign(item.last_heartbeat) }}</div>
                    </v-chip>
                </template>
                <template v-slot:[`item.mon_status`]="{ item }">
                    <v-chip :color="getColor(item.mon_status)" dark>
                        <em v-if="item.mon_status === 0">Off</em>
                        <strong v-else-if="item.mon_status === 1">On</strong>
                        <strong v-else>--</strong>
                    </v-chip>
                </template>
                <template v-slot:[`item.temperature`]="{ item }">
                    <v-chip
                        :color="getColorTemp(item.temperature)"
                        dark
                        class="tempChip"
                    >
                        <strong v-if="item.temperature">{{ item.temperature }}</strong>
                        <strong v-else>--</strong>
                    </v-chip>
                </template>
                <template v-slot:[`item.brightness`]="{ item }">
                    <v-chip :color="'cyan lighten-3'" dark class="tempChip">
                        <strong v-if="item.brightness">{{ item.brightness }}</strong>
                        <strong v-else>--</strong>
                    </v-chip>
                </template>
                <template v-slot:[`item.contrast`]="{ item }">
                    <v-chip :color="'cyan lighten-2'" dark class="tempChip">
                        <strong v-if="item.contrast">{{ item.contrast }}</strong>
                        <strong v-else>--</strong>
                    </v-chip>
                </template>
                <template v-slot:[`item.vol_level`]="{ item }">
                    <v-chip
                        :color="item.mute ? 'purple' : 'cyan'"
                        dark
                        class="tempChip"
                    >
                        <em v-if="item.mute">Mute ({{ item.vol_level }})</em>
                        <strong v-else-if="item.vol_level">{{ item.vol_level }}</strong>
                        <strong v-else>--</strong>
                    </v-chip>
                </template>
                <template v-slot:[`item.lock`]="{ item }">
                    <v-chip
                        :color="item.lock ? 'blue' : 'orange'"
                        dark
                        class="tempChip"
                    >
                        <div v-if="item.lock">Locked</div>
                        <div v-else>Unlocked</div>
                    </v-chip>
                </template>
                
                <template v-slot:expanded-item="{ headers, item }" >
                    <td :colspan="headers.length">
                    <div>
                        <strong>Player ID: </strong><em> {{ item.last_known_player_id }} </em>  | 
                        <strong>Monitor serial number: </strong><em> {{ item.mon_serial }} </em>  | 
                        <strong>Prefix ip: </strong><em> {{ item.fixed_ip }} </em>  | 
                        <strong>Last known ip: </strong><em> {{  item.last_known_ip }} </em>  
                    </div>
                    <div>
                    <v-btn
                        v-if="item.mon_status === 0"
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="power(item, 1)"
                        ><v-icon>mdi-power</v-icon></v-btn
                    >
                    <v-btn
                        v-if="item.mon_status === 1"
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="power(item, 0)"
                        ><v-icon>mdi-power-plug-off</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="
                            currentPlayer = JSON.parse(JSON.stringify(item))
                            dialog_b = true
                        "
                        ><v-icon>mdi-brightness-percent</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="
                            currentPlayer = JSON.parse(JSON.stringify(item))
                            dialog_c = true
                        "
                        ><v-icon>mdi-contrast-circle</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="
                            currentPlayer = JSON.parse(JSON.stringify(item))
                            dialog = true
                        "
                        ><v-icon>mdi-volume-equal</v-icon></v-btn
                    >
                    <v-btn
                        v-if="item.mute"
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="mute(item, 1)"
                        ><v-icon>mdi-volume-high</v-icon></v-btn
                    >
                    <v-btn
                        v-if="!item.mute"
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="mute(item, 0)"
                        ><v-icon>mdi-volume-mute</v-icon></v-btn
                    >
                    <v-btn
                        v-if="item.lock"
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="mute(item, 2)"
                        ><v-icon>mdi-controller</v-icon></v-btn
                    >
                    <v-btn
                        v-if="!item.lock"
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="mute(item, 3)"
                        ><v-icon>mdi-controller-off</v-icon></v-btn
                    >
                    <v-btn
                        color="secondary"
                        elevation="2"
                        icon
                        x-small
                        @click="changeServer(item)"
                        ><v-icon>mdi-swap-horizontal</v-icon></v-btn
                    >              
                </div>
                </td>
                </template>
            </v-data-table>
            <v-btn class="mx-2 elevation-4" icon @click="get_mpData()" x-small>
                <v-icon dark> mdi-refresh </v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="500">
                <v-card>
                    <v-card-title class="text-h6 ma-2 pa-2">
                        Set Volume:
                    </v-card-title>
                    <v-card-subtitle class="ma-2 pa-2"
                        >for player
                        {{ currentPlayer.player_name }}</v-card-subtitle
                    >
                    <v-slider
                        v-model="currentPlayer.vol_level"
                        :label="slider.label"
                        :thumb-color="slider.color"
                        thumb-label="always"
                        class="pa-5"
                    ></v-slider>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="
                            dialog = false
                            setVBC(currentPlayer, currentPlayer.vol_level, 0)
                        "
                    >
                        Set Volume
                    </v-btn>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog_b" max-width="500">
                <v-card>
                    <v-card-title class="text-h6 ma-2 pa-2">
                        Set Brightness:
                    </v-card-title>
                    <v-card-subtitle class="ma-2 pa-2"
                        >for player
                        {{ currentPlayer.player_name }}</v-card-subtitle
                    >
                    <v-slider
                        v-model="currentPlayer.brightness"
                        :label="slider.label"
                        :thumb-color="slider.color"
                        thumb-label="always"
                        class="pa-5"
                    ></v-slider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog_b = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="
                            dialog_b = false
                            setVBC(currentPlayer, currentPlayer.brightness, 1)
                        "
                    >
                        Set Brightness
                    </v-btn>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog_c" max-width="500">
                <v-card>
                    <v-card-title class="text-h6 ma-2 pa-2">
                        Set Contrast:
                    </v-card-title>
                    <v-card-subtitle class="ma-2 pa-2"
                        >for player
                        {{ currentPlayer.player_name }}</v-card-subtitle
                    >
                    <v-slider
                        v-model="currentPlayer.contrast"
                        :label="slider.label"
                        :thumb-color="slider.color"
                        thumb-label="always"
                        class="pa-5"
                    ></v-slider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog_c = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="
                            dialog_c = false
                            setVBC(currentPlayer, currentPlayer.contrast, 2)
                        "
                    >
                        Set Contrast
                    </v-btn>
                </v-card>
            </v-dialog>
        </v-card>
    </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import { DateTime } from 'luxon'

export default {
    data() {
        return {
            selected: [],
            user: this.$store.state['user'],
            intervalId: 0,
            dialog: false,
            dialog_b: false,
            dialog_c: false,
            vol: 1,
            currentPlayer: {},
            slider: { label: 'Volume', val: 0, color: 'blue' },
            selected: [],
            search: '',
            colors: {},
            headers: [
                {
                    text: 'Monitor',
                    align: 'start',
                    sortable: true,
                    value: 'player_id',
                },
                {
                    text: 'Lifesign',
                    value: 'last_heartbeat',
                },
                { text: 'Hall', value: 'hall' },
                { text: 'Location', value: 'location' },
                { text: 'On Server', value: 'current_server' },
                { text: 'Monitor status', value: 'mon_status' },
                { text: 'Temperature', value: 'temperature' },
                { text: 'Brightness', value: 'brightness' },
                { text: 'Contrast', value: 'contrast' },
                { text: 'Volume level', value: 'vol_level' },
                { text: 'IR/Keys', value: 'lock' },
            ],
            monitors: [],
        }
    },
    mounted: function () {
        // The get_tempColorData function MUST be before any other function
        // because is async and must load before others to work properly.
        this.get_tempColorData()
        this.get_mpData()

        this.intervalId = setInterval(async () => {
            console.log('refreshing data')
            await this.get_mpData()
        }, 5000)
    },
    beforeDestroy: function () {
        if (this.intervalId !== 0) {
            console.log('clearing timer')
            clearInterval(this.intervalId)
        }
    },
    methods: {
        multiAction(action) {
            console.log('These are the selected items: ')
            for (let i = 0; i < this.selected.length; i++) {
                console.log(this.selected[i].player_id)
                if (action === 'power_on') {
                    this.power(this.selected[i], 1)
                } else if (action === 'power_off') {
                    this.power(this.selected[i], 0)
                } else if (action === 'lock_on') {
                    this.mute(this.selected[i], 3)
                } else if (action === 'lock_off') {
                    this.mute(this.selected[i], 2)
                } else if (action === 'mute') {
                    this.mute(this.selected[i], 0)
                } else if (action === 'unmute') {
                    this.mute(this.selected[i], 1)
                }
            }
        },
        getColor(status) {
            if (status === 0) return 'red'
            else if (status === 1) return 'green'
            else return 'orange'
        },
        getColorTemp(temp) {
            if (temp > this.colors['red']) return 'red'
            else if (temp > this.colors['orange']) return 'orange'
            else if (temp >= this.colors['green']) return 'green'
            else if (temp < this.colors['blue'] && temp > 0) return 'blue'
            else return 'black'
        },
        async get_mpData() {
            try {
                let response = await Vue.axios.post(`media_db`, { mpId: '' })
                this.monitors = response.data
            } catch (ex) {
                console.log('Exception: ' + ex)
            }
        },
        async get_tempColorData() {
            try {
                let response = await Vue.axios.get(`colors`)
                let data = response.data
                for (let i = 0; i < data.length; i++) {
                    this.colors[data[i]['color']] = data[i]['temperature']
                }
            } catch (ex) {
                console.log('Exception: ' + ex)
            }
        },
        filterText(value, search, item) {
            return (
                value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().indexOf(search) !== -1
            )
        },
        async power(item, x) {
            const choice = ['close', 'open']
            await Vue.axios.post(`command`, {
                command: choice[x],
                param: null,
                mp: {
                    player_id: item.player_id,
                    player_name: item.player_name,
                    hall: item.hall,
                    location: item.location,
                },
                username: this.user.username,
            })
        },
        async mute(item, x) {
            const choice = [
                'vol_mute_off',
                'vol_mute_on',
                'lock_off',
                'lock_on',
            ]
            await Vue.axios.post(`command`, {
                command: choice[x],
                param: null,
                mp: {
                    player_id: item.player_id,
                    player_name: item.player_name,
                    hall: item.hall,
                    location: item.location,
                },
                username: this.user.username,
            })
        },
        async setVBC(item, x = 0, i) {
            const choice = ['vol_set', 'bright', 'contrast']
            if (i == 0) {
                this.mute(item, 1)
            }
            await Vue.axios.post(`command`, {
                param: x,
                command: choice[i],
                mp: {
                    player_id: item.player_id,
                    player_name: item.player_name,
                    hall: item.hall,
                    location: item.location,
                },
                username: this.user.username,
            })
        },
        async refreshData(item) {
            let coms = ['status', 'temp', 'vol_level', 'serial_number']
            for (let i = 0; i < coms.length; i++) {
                await Vue.axios.post(`command`, {
                    command: coms[i],
                    param: null,
                    mp: {
                        player_id: item.player_id,
                        player_name: item.player_name,
                        hall: item.hall,
                        location: item.location,
                    },
                    username: this.user.username,
                })
            }
        },
        lifesign(item) {
            const lastDate = DateTime.fromISO(item)
            const currentDate = DateTime.now()
            let lfs = currentDate.diff(lastDate, 'seconds')
            return Math.round(lfs.seconds)
        },
        itemRowBackground(item) {
            if (this.lifesign(item.last_heartbeat) > 3600) {
                return 'red'
            } else if (this.lifesign(item.last_heartbeat) > 600) {
                return 'red lighten-2'
            } else if (this.lifesign(item.last_heartbeat) > 100) {
                return 'red lighten-3'
            } else if (this.lifesign(item.last_heartbeat) > 30) {
                return 'red lighten-5'
            }
        },
        async changeServer(item) {
            let current = item.current_server
            let other = 'server1'
            if (current === 'server1'){
                other = 'server2'
            }

            await Vue.axios.post(`command`, {
                command: 'change_server',
                param: other,
                mp: {
                    player_id: item.player_id,
                    player_name: item.player_name,
                    hall: item.hall,
                    location: item.location,
                },
                username: this.user.username,
            })
        },
    },
}
</script>

<style></style>
