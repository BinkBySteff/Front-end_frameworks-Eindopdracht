<template>
  <ion-page>
    <AppHeader :title="headerTitle" />

    <ion-content class="recare-bg" fullscreen>
      <div class="page-wrapper">
        <div class="card">
          <div class="step-header">
            <div class="step-title">{{ stepTitle }}</div>
            <div class="step-subtitle">Stap {{ step + 1 }} van {{ steps.length }}</div>
          </div>

          <div class="form-area">
            <!-- Stap 1: -->
            <template v-if="stepKey === 'basis'">
              <ion-item>
                <ion-label position="stacked">Locatie</ion-label>
                <ion-input v-model="form.location" placeholder="Bijv. Rotterdam, gebouw A" />
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Datum</ion-label>
                <ion-datetime v-model="form.date" presentation="date" />
              </ion-item>

              <ion-item>
                <ion-label>Acute actie vereist</ion-label>
                <ion-toggle v-model="form.urgent" />
              </ion-item>
            </template>

            <!-- Stap 2:-->
            <template v-else-if="stepKey === 'specifiek'">
              <!-- SCHADE -->
              <template v-if="type === 'schade'">
                <ion-item>
                  <ion-label position="stacked">Nieuwe schade</ion-label>
                  <ion-segment v-model="form.damageNew">
                    <ion-segment-button value="ja"><ion-label>Ja</ion-label></ion-segment-button>
                    <ion-segment-button value="nee"><ion-label>Nee</ion-label></ion-segment-button>
                  </ion-segment>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Soort schade</ion-label>
                  <ion-select v-model="form.damageType" interface="popover" placeholder="Kies">
                    <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                    <ion-select-option value="slijtage">Slijtage</ion-select-option>
                    <ion-select-option value="geweld">Geweld</ion-select-option>
                    <ion-select-option value="normaal">Normaal gebruik</ion-select-option>
                    <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                    <ion-select-option value="anders">Anders</ion-select-option>
                  </ion-select>
                </ion-item>
              </template>

              <!-- ONDERHOUD -->
              <template v-else-if="type === 'onderhoud'">
                <ion-item>
                  <ion-label position="stacked">Soort onderhoud</ion-label>
                  <ion-select v-model="form.maintenanceType" interface="popover" placeholder="Kies">
                    <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                    <ion-select-option value="houtrot">Houtrot</ion-select-option>
                    <ion-select-option value="elektra">Elektra</ion-select-option>
                    <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                    <ion-select-option value="beglazing">Beglazing</ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Kostenindicatie</ion-label>
                  <ion-select v-model="form.costRange" interface="popover" placeholder="Kies">
                    <ion-select-option value="0-500">0 - 500</ion-select-option>
                    <ion-select-option value="500-1500">500 - 1.500</ion-select-option>
                    <ion-select-option value="1500+">1.500+</ion-select-option>
                  </ion-select>
                </ion-item>
              </template>

              <!-- INSTALLATIES -->
              <template v-else-if="type === 'installaties'">
                <ion-item>
                  <ion-label position="stacked">Soort installatie</ion-label>
                  <ion-select
                    v-model="form.installationType"
                    interface="popover"
                    placeholder="Kies"
                  >
                    <ion-select-option value="koeling">Koeling</ion-select-option>
                    <ion-select-option value="verwarming">Verwarming</ion-select-option>
                    <ion-select-option value="luchtverversing">Luchtverversing</ion-select-option>
                    <ion-select-option value="elektra">Elektra</ion-select-option>
                    <ion-select-option value="beveiliging">Beveiliging</ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Gemelde storingen</ion-label>
                  <ion-textarea
                    v-model="form.failures"
                    placeholder="Beschrijf kort de storing(en)"
                    auto-grow
                  />
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Goedgekeurd</ion-label>
                  <ion-segment v-model="form.approved">
                    <ion-segment-button value="ja"><ion-label>Ja</ion-label></ion-segment-button>
                    <ion-segment-button value="nee"><ion-label>Nee</ion-label></ion-segment-button>
                  </ion-segment>
                </ion-item>
              </template>

              <!-- MODIFICATIES -->
              <template v-else-if="type === 'modificaties'">
                <ion-item>
                  <ion-label position="stacked">Uitgevoerd door</ion-label>
                  <ion-select v-model="form.performedBy" interface="popover" placeholder="Kies">
                    <ion-select-option value="huurder">Huurder</ion-select-option>
                    <ion-select-option value="aannemer">Aannemer</ion-select-option>
                    <ion-select-option value="onbekend">Onbekend</ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Beschrijving modificatie</ion-label>
                  <ion-textarea
                    v-model="form.modificationDesc"
                    placeholder="Wat is er aangepast?"
                    auto-grow
                  />
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Te ondernemen actie</ion-label>
                  <ion-select v-model="form.action" interface="popover" placeholder="Kies">
                    <ion-select-option value="accepteren">Accepteren</ion-select-option>
                    <ion-select-option value="keuren">Laten keuren</ion-select-option>
                    <ion-select-option value="verwijderen">Laten verwijderen</ion-select-option>
                    <ion-select-option value="aanpassen">Laten aanpassen</ion-select-option>
                  </ion-select>
                </ion-item>
              </template>
            </template>

            <!-- Stap 3: omschrijving + fotos -->
            <template v-else-if="stepKey === 'omschrijving'">
              <ion-item>
                <ion-label position="stacked">Omschrijving</ion-label>
                <ion-textarea
                  v-model="form.description"
                  placeholder="Extra toelichting"
                  auto-grow
                />
              </ion-item>

              <div class="photo-row">
                <ion-button expand="block" fill="outline" @click="addPhoto">
                  Foto toevoegen (placeholder)
                </ion-button>
                <div v-if="form.photos.length" class="photo-hint">
                  {{ form.photos.length }} foto('s) toegevoegd (placeholder)
                </div>
              </div>
            </template>

            <!-- Stap 4: review -->
            <template v-else-if="stepKey === 'review'">
              <div class="review">
                <div class="review-line">
                  <span>Type</span><span>{{ headerTitle }}</span>
                </div>
                <div class="review-line">
                  <span>Locatie</span><span>{{ form.location || '-' }}</span>
                </div>
                <div class="review-line">
                  <span>Datum</span><span>{{ form.date || '-' }}</span>
                </div>
                <div class="review-line">
                  <span>Acuut</span><span>{{ form.urgent ? 'Ja' : 'Nee' }}</span>
                </div>
                <div class="review-line">
                  <span>Omschrijving</span><span>{{ form.description || '-' }}</span>
                </div>
                <div class="review-line">
                  <span>Foto’s</span><span>{{ form.photos.length }}</span>
                </div>
              </div>
            </template>
          </div>

          <div class="actions">
            <ion-button fill="clear" @click="prevStep" :disabled="step === 0">Vorige</ion-button>
            <ion-button v-if="step < steps.length - 1" @click="nextStep">Volgende</ion-button>
            <ion-button v-else color="success" @click="submit">Opslaan</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
} from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'

type ReportType = 'schade' | 'onderhoud' | 'installaties' | 'modificaties'

const route = useRoute()
const router = useRouter()

const type = computed(() => route.params.type as ReportType)

const headerTitle = computed(() => {
  const map: Record<ReportType, string> = {
    schade: 'Schade opnemen',
    onderhoud: 'Achterstallig onderhoud',
    installaties: 'Technische installaties',
    modificaties: 'Modificaties',
  }
  return map[type.value] ?? 'Rapportage'
})

const steps = computed(
  () =>
    [
      { key: 'basis', title: 'Basisgegevens' },
      { key: 'specifiek', title: 'Details' },
      { key: 'omschrijving', title: 'Omschrijving en foto’s' },
      { key: 'review', title: 'Controle' },
    ] as const,
)

type StepKey = (typeof steps.value)[number]['key']

const step = ref(0)
const stepKey = computed<StepKey>(() => steps.value[step.value]?.key ?? 'basis')
const stepTitle = computed(() => steps.value[step.value]?.title ?? 'Basisgegevens')

const form = reactive({
  location: '',
  date: '',
  urgent: false,

  damageNew: 'ja',
  damageType: '',

  maintenanceType: '',
  costRange: '',

  installationType: '',
  failures: '',
  approved: 'ja',

  performedBy: '',
  modificationDesc: '',
  action: '',

  description: '',
  photos: [] as string[],
})

function nextStep() {
  if (step.value < steps.value.length - 1) step.value++
}

function prevStep() {
  if (step.value > 0) step.value--
}

function addPhoto() {
  form.photos.push(`photo-${Date.now()}`)
}

function submit() {
  console.log('SUBMIT', { type: type.value, ...form })
  router.push('/tabs/assigned')
}
</script>

<style scoped>
.page-wrapper {
  padding: 20px 16px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow:
    0 10px 26px rgba(20, 27, 31, 0.08),
    0 2px 8px rgba(20, 27, 31, 0.06);
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.step-subtitle {
  font-size: 12px;
  color: rgba(20, 27, 31, 0.6);
}

.form-area {
  margin-top: 6px;
}

.photo-row {
  margin-top: 12px;
}

.photo-hint {
  margin-top: 8px;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.65);
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
}

.review {
  display: grid;
  gap: 10px;
  margin-top: 6px;
}

.review-line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.8);
}

.review-line span:first-child {
  color: rgba(20, 27, 31, 0.6);
}
</style>
