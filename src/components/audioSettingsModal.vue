<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Audio settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="playerData.filename" class="ion-padding">
      <ion-item>
        <ion-label>Audio track</ion-label>
        <ion-select
          :value="activeAudioTrackId"
          @ionChange="onSwitchAudioClicked"
          v-model="selectedTrack"
        >
          <ion-select-option
            :value="audio.id"
            v-for="audio in audioTracks"
            :key="audio.id"
          >
            {{ audio.lang || `unknown${audio.id}` }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item class="audioDelay">
        <ion-label>Delay</ion-label>
        <ion-button @click="onAudioDelayChanged('decrease')"> - </ion-button>
        {{ playerData["audio-delay"] }}
        <ion-button @click="onAudioDelayChanged('increase')"> + </ion-button>
      </ion-item>
    </ion-content>
    <ion-content class="ion-padding" v-else>
      <p>No playback.</p>
    </ion-content>
    <ion-footer>
      <ion-button @click="onCancelClicked">Close</ion-button>
    </ion-footer>
  </ion-page>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonFooter,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from "@ionic/vue";
import { apiInstance } from "../api";

export default {
  props: ["modalController"],
  setup(props) {
    const selectedTrack = ref();
    const store = useStore();
    const playerData = computed(() => store.state.simpleapi.playerData);
    // Get audio tracks from store
    const audioTracks = computed(() => {
      if (playerData.value["track-list"].length > 0)
        return playerData.value["track-list"].filter(
          (el) => el.type == "audio"
        );
      else return [];
    });
    const activeAudioTrackId = computed(() => {
      if (audioTracks.value.length > 0) {
        return audioTracks.value.find((el) => el.selected).id;
      }
      return null;
    });
    selectedTrack.value = activeAudioTrackId.value;
    const onCancelClicked = () => {
      props.modalController.dismiss();
    };

    const onSwitchAudioClicked = () => {
      apiInstance.post(`/tracks/audio/reload/${selectedTrack.value}`);
    };

    const onAudioDelayChanged = (order) => {
      let newDelay = 0;
      switch (order) {
        case "increase":
          newDelay = playerData.value["audio-delay"] + 1;
          apiInstance.post(`tracks/audio/timing/${newDelay}`).then(() => {
            store.commit("simpleapi/setPlayerDataProperty", {
              key: "audio-delay",
              value: newDelay,
            });
          });
          break;
        case "decrease":
          newDelay = playerData.value["audio-delay"] - 1;
          apiInstance.post(`tracks/audio/timing/${newDelay}`).then(() => {
            store.commit("simpleapi/setPlayerDataProperty", {
              key: "audio-delay",
              value: newDelay,
            });
          });
          break;
      }
    };

    return {
      audioTracks,
      activeAudioTrackId,
      selectedTrack,
      onCancelClicked,
      onSwitchAudioClicked,
      playerData,
      onAudioDelayChanged,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonFooter,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonLabel,
  },
};
</script>

<style scoped>
ion-footer {
  padding: 10px;
  text-align: right;
}

ion-footer ion-button {
  width: 120px;
}

.audioDelay ion-button {
  width: 26px;
  height: 26px;
  margin: 10px;
}
</style>
