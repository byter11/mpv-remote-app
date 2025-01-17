<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="#fff"></ion-menu-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-label position="stacked">Server IP</ion-label>
          <ion-input
            v-model="server_ip"
            @ionBlur="setSetting('server_ip')"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Server Port</ion-label>
          <ion-input
            v-model="server_port"
            @ionBlur="setSetting('server_port')"
            type="number"
          ></ion-input>
        </ion-item>

        <ion-item
          :disabled="!connectedState || !uselocaldb"
          :router-link="{ name: 'folder.settings.collections' }"
        >
          <ion-label>Media collections</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import { configureInstance } from "../api";
export default {
  setup() {
    const store = useStore();
    const connectedState = computed(() => store.state.simpleapi.connected);
    const currentSettings = computed(() => store.state.settings.server);
    const uselocaldb = computed(
      () => store.state.simpleapi.MPVInfo.mpvremoteConfig.uselocaldb
    );
    const server_ip = ref(store.state.settings.settings.server.server_ip);
    const server_port = ref(store.state.settings.settings.server.server_port);
    const setSetting = async (key) => {
      let value = null;
      let shouldReconnect = false;
      switch (key) {
        case "server_ip":
          value = server_ip.value;
          console.log(value);
          shouldReconnect = true;
          break;
        case "server_port":
          value = server_port.value;
          shouldReconnect = true;
          break;
      }
      if (value) {
        await store.dispatch("settings/setSetting", { key, value });
        if (shouldReconnect) {
          await store.dispatch("settings/cleanFilemanHistory");
          store.commit("simpleapi/clearPlaybackRefreshInterval");
          await configureInstance(
            store.state.settings.settings.server.server_ip,
            store.state.settings.settings.server.server_port
          );
          store.dispatch("simpleapi/setPlaybackRefreshInterval");
        }
      }
    };

    return {
      currentSettings,
      setSetting,
      server_ip,
      server_port,
      connectedState,
      uselocaldb,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
  },
};
</script>
